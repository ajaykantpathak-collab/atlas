import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch09_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch09_p2: SimDef = {
    id: 'v3_c12_bs_ch09_p2',
    title: 'Financial Management · Part 2/2',
    subtitle: 'Three questions decide every company\'s fate — where to invest, how to raise, what to pay out.',
    classLevel: 12, subject: 'business_studies', topic: 'Financial Management · Part 2/2',
    chapters: ['c12_bs_ch09'],
    nodeIds: ['c12_bs_cbse_09_007', 'c12_bs_cbse_09_008', 'c12_bs_cbse_09_009', 'c12_bs_cbse_09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Chief Financial Officer', intro: 'Financial management is scarce money meeting unlimited demands — three decisions settle the argument.', goal: 'Define financial management and analyse the investment, financing and dividend decisions.' },
    discovery: {
        question: 'A startup raises ₹5 crore. Buy the AI server or expand sales? Raise the next round as equity or loan? Pay dividends or reinvest? What do these three questions have in common?',
        options: ['They are the three financial decisions — investment, financing and dividend — that together determine shareholder wealth', 'They are operational decisions handled by middle management', 'They are marketing questions about revenue growth', 'They are legal decisions requiring board approval only'],
        answer: 'They are the three financial decisions — investment, financing and dividend — that together determine shareholder wealth',
        hook: 'Every rupee faces the same three forks — where to deploy it, how to raise it, whether to distribute it. Students memorise them separately; they\'re one connected triage aimed at a single goal: maximising wealth.',
    },
    teaching: [
        { title: 'Working Capital: Concept and Factors Affecting Working Capital', text: 'Working capital refers to the capital required for financing day-to-day operations of a business.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Act as CFO: allocate the ₹5 crore across competing investments, choose the debt-equity mix for the next raise, and decide the dividend — defending each call by its effect on shareholder wealth.',
        labels: ['Working Capital: Concept', 'Capital Structure: Meaning', 'Fixed Capital: Meaning', 'Financial Leverage: Concept'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_09_007', title: 'Working Capital: Concept and Factors Affecting Working Capital',
          scaffold: { problem: 'M/s Gupta Textiles (a trading firm) provides the following data as on 31st March 2024: Cash in hand ₹50,000; Cash at bank ₹2,00,000.',
            steps: [
            { text: 'Identify all current assets: Cash in hand, Cash at bank, Inventory, Debtors, Bills Receivable.' },
            { text: 'Sum current assets: 50,000 + 2,00,000 + 8,00,000 + 4,50,000 + 50,000 = ₹15,50,000 (Gross Working Capital).' },
            { text: 'Identify all current liabilities: Creditors, Bills Payable, Outstanding Wages.' },
            { text: 'Sum current liabilities: 6,00,000 + 1,00,000 + 50,000 = ₹7,50,000.' },
            { text: 'Apply formula: NWC = CA – CL = 15,50,000 – 7,50,000 = ₹8,00,000.', faded: true, blankAnswer: 'Gross Working Capital = ₹15,50,000; Net Working Capital.' }
            ] } },
        { type: 'case', nodeId: 'c12_bs_cbse_09_008', title: 'Capital Structure: Meaning and Factors Affecting Capital Structure',
          caseStudy: { intro: 'Imagine you are the CFO of a startup that needs ₹50 crore to build a new factory. You can raise this by issuing shares (equity) or taking a bank loan (debt).',
            decisions: [{ prompt: 'Define capital structure and state the two standard quantitative measures used to express it.', options: [
                { text: 'Capital structure is the proportion of owners\' funds (equity) and borrowed funds (debt)', outcome: 'Capital structure is the proportion of owners\' funds (equity) and borrowed funds (debt) in.' },
                { text: 'capital structure means only debt', outcome: 'Not quite — Students often believe: "Trading on equity means using debt to increase EPS, so companies should.', reveals: 'trading-on-equity-means-using' },
                { text: 'it\'s the same as working capital', outcome: 'Not quite — Students often believe: "Trading on equity means using debt to increase EPS, so companies should.', reveals: 'trading-on-equity-means-using' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_09_009', title: 'Fixed Capital: Meaning and Factors Affecting Fixed Capital Requirements',
          caseStudy: { intro: 'Imagine you are the CFO of a startup electric two-wheeler company planning to set up a manufacturing plant in Pune.',
            decisions: [{ prompt: 'A student writes: "Fixed capital means the money kept in the company\'s fixed deposit account." Is this correct?', options: [
                { text: 'No, this is incorrect', outcome: 'No, this is incorrect. Fixed capital refers to investment in long-term tangible assets (plant.' },
                { text: 'fixed asset', outcome: 'Not quite — Students consistently confuse "fixed capital" with "fixed assets" in the Balance Sheet sense.', reveals: 'students-consistently-confuse-fixed-capital' },
                { text: 'fixed deposit', outcome: 'Not quite — Students consistently confuse "fixed capital" with "fixed assets" in the Balance Sheet sense.', reveals: 'students-consistently-confuse-fixed-capital' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_09_010', title: 'Financial Leverage: Concept and Impact on Earnings',
          scaffold: { problem: 'Zest Ltd. has total capital of ₹60 lakh. It is evaluating three financing plans: Plan A (0% debt), Plan B (40% debt), Plan C (60% debt).',
            steps: [
            { text: 'Identify given data: Total Capital = ₹60,00,000; EBIT = ₹12,00,000; Kd = 10%; Tax = 30%; FV = ₹10.' },
            { text: 'For each plan, compute Debt, Equity, Interest, Number of Shares.' },
            { text: 'Build EBIT-EPS table. Plan A: EBIT=12L, Int=0, EBT=12L, Tax=3.6L, EAT=8.4L, EPS=8.4L/6L=₹1.40.' },
            { text: 'Compare EPS: ₹1.40 → ₹1.87 → ₹2.45. EPS increases with leverage.' },
            { text: 'Verify RoI (20%) > Kd (10%) condition holds → favourable financial leverage confirmed.', faded: true, blankAnswer: 'Plan A EPS = ₹1.40; Plan B EPS = ₹1.87; Plan C EPS = ₹2.45.' }
            ] } },
        { type: 'case', nodeId: 'c12_bs_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A newly appointed finance executive tells the board: \'Financial management simply means maximising this year\'s profit — so take the highest-profit project and the cheapest loan available.\'',
            decisions: [{ prompt: 'Is that the right objective?', options: [
                { text: 'No — the objective is wealth maximisation: judge decisions by their effect on share value, which accounts for the timing of cash flows and risk, not just the accounting profit figure.', outcome: 'Two projects with equal profit differ if one\'s cash arrives later or is riskier; profit is a manipulable accounting number, wealth is the market\'s discounted verdict.' },
                { text: 'Yes — more profit automatically means more shareholder wealth, so the terms are interchangeable.', outcome: 'Profit ignores when cash arrives and how risky it is; a high-profit, high-risk bet can lower the share price while a steadier project raises it.', reveals: 'profit-max-is-wealth-max' },
                { text: 'Yes — and procuring funds at the lowest possible cost is the whole job.', outcome: 'Cheap money badly deployed still destroys value: an 8% loan funding a 6% project loses wealth whatever the rate.', reveals: 'cheapest-funds-is-the-goal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_09_010', title: 'You made it',
          caseStudy: { intro: 'You now think in the three decisions every CFO lives inside. Investment-financing-dividend is a three-part board classic — and the actual architecture of corporate finance careers.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_007', difficulty: 'standard',
          question: 'Working capital refers to the capital required for financing day-to-day.',
          hint: 'Revisit Class 11 Accounting Chapter 8 nodes on Balance Sheet classification.',
          misconception: 'Students often believe that **an increase in current assets always increases working capital requirement**, ignoring.',
          parts: [
                { id: 'a', prompt: 'Define Net Working Capital and give its formula.', answer: 'Net Working Capital (NWC) = Current Assets – Current Liabilities',
                  options: ['Net Working Capital (NWC) = Current Assets – Current Liabilities', 'NWC = Current Assets only', 'NWC = Current Liabilities – Current Assets'],
                  hint: 'Revisit Class 11 Accounting Chapter 8 nodes on Balance Sheet classification (c11_acc_cbse_08_007.',
                  misconception: 'Students often believe that **an increase in current assets always increases working capital requirement**, ignoring that a simultaneous.' },
                { id: 'b', prompt: 'Explain the difference between Gross Working Capital and Net Working Capital. Why is Net Working Capital a better indicator of short-term financial health?', answer: 'Gross Working Capital = total current assets',
                  options: ['Gross Working Capital = total current assets', 'both are same', 'Gross WC is better'],
                  hint: 'Revisit Class 11 Accounting Chapter 8 nodes on Balance Sheet classification (c11_acc_cbse_08_007.',
                  misconception: 'Students often believe that **an increase in current assets always increases working capital requirement**, ignoring that a simultaneous.' },
                { id: 'c', prompt: 'A company has Current Assets: Cash ₹2,00,000; Inventory ₹5,00,000; Debtors ₹3,00,000. Current Liabilities: Creditors ₹4,00,000; Outstanding Expenses ₹1,00,000.', answer: 'Step 1: Total Current Assets = 2,00,000 + 5,00,000 + 3,00,000 = ₹10,00,000',
                  options: ['Step 1: Total Current Assets = 2,00,000 + 5,00,000 + 3,00,000 = ₹10,00,000', 'Credit Availed'],
                  hint: 'Revisit Class 11 Accounting Chapter 8 nodes on Balance Sheet classification (c11_acc_cbse_08_007.',
                  misconception: 'Students often believe that **an increase in current assets always increases working capital requirement**, ignoring that a simultaneous.' }
          ],
            remediations: { 'an-increase-in-current-assets': { steps: ['Revisit Class 11 Accounting nodes **c11_acc_cbse_08_007** (Current Assets classification) and **c11_acc_cbse_08_008**.', 'Practice 10 transactions (e.g., "purchased goods on credit", "paid creditors", "sold goods for cash") and for each.', 'Re-attempt Diagnostic Question 3 and 4, explicitly showing the dual effect on both sides of NWC formula.', 'If still stuck, watch a 10-minute video on "Working Capital Cycle" focusing on the operating cycle: Cash → Raw Material.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **an increase in current assets always increases working capital requirement**, ignoring.',
          parts: [
                { id: 'a', prompt: '"Higher working capital always means better financial health." Evaluate this statement with reference to the liquidity-profitability trade-off.', answer: 'The statement is false',
                  options: ['The statement is false', 'analyse'],
                  hint: 'Revisit Class 11 Accounting Chapter 8 nodes on Balance Sheet classification (c11_acc_cbse_08_007.',
                  misconception: 'Students often believe that **an increase in current assets always increases working capital requirement**, ignoring that a simultaneous.' }
          ],
            remediations: { 'an-increase-in-current-assets': { steps: ['Revisit Class 11 Accounting nodes **c11_acc_cbse_08_007** (Current Assets classification) and **c11_acc_cbse_08_008**.', 'Practice 10 transactions (e.g., "purchased goods on credit", "paid creditors", "sold goods for cash") and for each.', 'Re-attempt Diagnostic Question 3 and 4, explicitly showing the dual effect on both sides of NWC formula.', 'If still stuck, watch a 10-minute video on "Working Capital Cycle" focusing on the operating cycle: Cash → Raw Material.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_008', difficulty: 'standard',
          question: 'Capital structure refers to the mix between owners\' funds (equity share.',
          hint: 'Revisit Class 11 Business Studies Chapter 8 (Sources of Business Finance) nodes.',
          misconception: 'Students often believe: "Trading on equity means using debt to increase EPS, so companies should always maximise debt.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast Interest Coverage Ratio (ICR) and Debt Service Coverage Ratio (DSCR) as measures of debt capacity.', answer: 'ICR = EBIT/Interest',
                  options: ['ICR = EBIT/Interest', 'ICR and DSCR are the same', 'DSCR only adds depreciation'],
                  hint: 'Revisit Class 11 Business Studies Chapter 8 (Sources of Business Finance) nodes c11_bs_cbse_08_003.',
                  misconception: 'Students often believe: "Trading on equity means using debt to increase EPS, so companies should always maximise debt to maximise EPS.".' }
          ],
            remediations: { 'trading-on-equity-means-using': { steps: ['If the student holds this misconception: Step 1 — Re-work NCERT Example II (Company Y) step-by-step: RoI 6.67% < 10%.', 'Ask: "Why did EPS fall?" Guide them to see RoI < Cost of debt.', 'Step 2 — Explain the cost of equity rise: draw a graph (mental or paper) with X-axis = D/E, Y-axis = Cost; show Cost.', 'Step 3 — Re-read NCERT para: "A company cannot use debt beyond a point.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_009', difficulty: 'standard',
          question: 'Fixed capital refers to the investment made by a business in long-term assets.',
          hint: 'If stuck, revisit c11_bs_cbse_08_002 (Classification of Sources of Finance: Period Basis).',
          misconception: 'Students consistently confuse "fixed capital" with "fixed assets" in the Balance Sheet sense.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Fixed capital means the money kept in the company\'s fixed deposit account." Is this correct? Explain why or why not in one sentence.', answer: 'No, this is incorrect',
                  options: ['No, this is incorrect', 'fixed asset', 'fixed deposit', 'fixed capital'],
                  hint: 'If stuck, revisit c11_bs_cbse_08_002 (Classification of Sources of Finance: Period Basis) and.',
                  misconception: 'Students consistently confuse "fixed capital" with "fixed assets" in the Balance Sheet sense.' },
                { id: 'b', prompt: 'Compare the impact of "Technology Upgradation" and "Financing Alternatives (leasing)" on fixed capital requirements.', answer: 'Yes, they can oppose each other',
                  options: ['Yes, they can oppose each other', 'fixed capital', 'fixed assets'],
                  hint: 'If stuck, revisit c11_bs_cbse_08_002 (Classification of Sources of Finance: Period Basis) and.',
                  misconception: 'Students consistently confuse "fixed capital" with "fixed assets" in the Balance Sheet sense.' }
          ],
            remediations: { 'students-consistently-confuse-fixed-capital': { steps: ['Ask the student to define "fixed capital" without using the words "asset," "balance sheet," or "depreciation." If they.', 'Show the Tata Steel-Corus case from the NCERT chapter opener — ₹36,500 crores raised for *acquisition* (a fixed capital.', 'Have them re-read the NCERT lines: "Fixed capital refers to investment in long-term assets...', 'Give a 2-mark practice question: "State how \'technology upgradation\' affects fixed capital *requirements* (not book.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_010', difficulty: 'standard',
          question: 'Financial leverage is the proportion of debt in a company\'s capital structure.',
          hint: 'If stuck, revisit Class 11 Accountancy: "Profit and Loss Account: Calculation of Net.',
          misconception: 'Students believe "Financial Leverage = Trading on Equity" and use the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'A company has total capital of ₹100 lakh, of which ₹40 lakh is debt. Its EBIT is ₹20 lakh, interest rate on debt is 12%, and tax rate is 30%.', answer: 'RoI = EBIT/Total Capital = 20/100 = 20%',
                  options: ['RoI = EBIT/Total Capital = 20/100 = 20%', 'EPS will decrease', 'Financial Leverage = Trading on Equity', 'Trading on Equity is beneficial here'],
                  hint: 'If stuck, revisit Class 11 Accountancy: "Profit and Loss Account: Calculation of Net Profit".',
                  misconception: 'Students believe "Financial Leverage = Trading on Equity" and use the terms interchangeably.' },
                { id: 'b', prompt: 'Company P has EBIT = ₹10 lakh, Total Funds = ₹50 lakh, Tax = 30%. It considers three capital structures: (I) 0% debt, (II) 40% debt, (III) 60% debt.', answer: '**Situation I (0% debt):** Interest = 0',
                  options: ['**Situation I (0% debt):** Interest = 0', 'Financial Leverage = Trading on Equity', 'Trading on Equity is beneficial here', '"Financial Leverage = Trading on Equity" and use the terms interchangeably'],
                  hint: 'If stuck, revisit Class 11 Accountancy: "Profit and Loss Account: Calculation of Net Profit".',
                  misconception: 'Students believe "Financial Leverage = Trading on Equity" and use the terms interchangeably.' },
                { id: 'c', prompt: 'Compare Company A (EBIT = ₹15 lakh, Total Capital = ₹60 lakh, Debt = ₹20 lakh @ 12%) and Company B (EBIT = ₹8 lakh, Total Capital = ₹60 lakh, Debt = ₹20 lakh @.', answer: 'Company A: RoI = 15/60 = 25% > 12% → Current leverage is favourable',
                  options: ['Company A: RoI = 15/60 = 25% > 12% → Current leverage is favourable', 'both benefit equally', 'analyse', 'Financial Leverage = Trading on Equity'],
                  hint: 'If stuck, revisit Class 11 Accountancy: "Profit and Loss Account: Calculation of Net Profit".',
                  misconception: 'Students believe "Financial Leverage = Trading on Equity" and use the terms interchangeably.' }
          ],
            remediations: { 'financial-leverage-trading-on-equity': { steps: ['Revisit the NCERT Company X vs Company Y comparison (pages 228-229).', 'Explicitly write down the decision rule: "Favourable leverage ⇔ RoI > Cost of Debt; Unfavourable leverage ⇔ RoI < Cost.', 'Re-do Diagnostic Question 3 from scratch, verbalising *why* you subtract interest before tax, *why* shares decrease.', 'Create your own 2-scenario table where RoI = Cost of Debt (e.g., both 12%) and prove EPS remains constant — this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
