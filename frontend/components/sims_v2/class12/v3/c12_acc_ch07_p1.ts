import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch07_p1: SimDef = {
    id: 'v3_c12_acc_ch07_p1',
    title: 'Financial Statements of a Company · Part 1/2',
    subtitle: 'Why does every Indian company\'s Balance Sheet look exactly the same?',
    classLevel: 12, subject: 'accountancy', topic: 'Financial Statements of a Company · Part 1/2',
    chapters: ['c12_acc_ch07'],
    nodeIds: ['c12_acc_cbse_07_001', 'c12_acc_cbse_07_002', 'c12_acc_cbse_07_003', 'c12_acc_cbse_07_004', 'c12_acc_cbse_07_005', 'c12_acc_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Reporting accountant preparing statutory statements', intro: 'A company\'s financial statements aren\'t just records — they\'re a regulated language every business must speak identically.', goal: 'Apply Schedule III classification to prepare a compliant company Balance Sheet.' },
    discovery: {
        question: 'You open the annual reports of Reliance, TCS and a small unlisted company — and find the Balance Sheet laid out identically in all three. Who forces this uniformity?',
        options: ['Schedule III of the Companies Act, 2013 — one prescribed format for every company', 'The company\'s auditor chooses the layout each year', 'SEBI dictates formats only to listed companies; others are free', 'Each board of directors designs its own Balance Sheet'],
        answer: 'Schedule III of the Companies Act, 2013 — one prescribed format for every company',
        hook: 'It feels like coincidence or convention — it\'s actually law. Schedule III standardises classification (current vs non-current, shareholders\' funds vs liabilities) so any investor can compare any two companies.',
    },
    teaching: [
        { title: 'Financial Statements of a Company: Meaning, Nature and Objectives', text: 'Financial Statements of a Company are the formal, structured summaries of a company\'s financial activities and position prepared at the end of an accounting period in accordance with Schedule III.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Build a company\'s Balance Sheet the Schedule III way: order the Equity & Liabilities blocks, split every item into current and non-current, and explain why the format exists at all.',
        labels: ['Financial Statements of', 'Balance Sheet of', 'Statement of Profit', 'Treatment of Specific Items', 'Treatment of Unclaimed Dividend', 'Underwriting Commission, Preliminary Expenses'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_acc_cbse_07_001', title: 'Financial Statements of a Company: Meaning, Nature and Objectives',
          caseStudy: { intro: 'Imagine you are an investor deciding whether to buy shares of Tata Motors or Reliance.',
            decisions: [{ prompt: 'What are the two primary financial statements mandated by Schedule III of the Companies Act, 2013 for a company, and what does each report?', options: [
                { text: 'The two primary statements are: (1) Balance Sheet', outcome: 'The two primary statements are: (1) Balance Sheet — reports the financial position (assets.' },
                { text: 'Trading Account', outcome: 'Not quite — Students often believe that **"Financial Statements of a Company = Balance Sheet + Profit & Loss.', reveals: 'financial-statements-of-a-company' },
                { text: 'Cash Flow Statement', outcome: 'Not quite — Students often believe that **"Financial Statements of a Company = Balance Sheet + Profit & Loss.', reveals: 'financial-statements-of-a-company' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_07_002', title: 'Balance Sheet of a Company: Format as per Schedule III, Part I',
          caseStudy: { intro: 'Imagine you\'re an investor looking at Reliance Industries\' annual report — you flip to the Balance Sheet and see a clean, standardized layout whether it\'s.',
            decisions: [{ prompt: 'A student prepares a Balance Sheet and places "10% Debentures (due in 3 years)" under Current Liabilities because "it\'s a liability.".', options: [
                { text: '**Incorrect.** 10% Debentures due in 3 years are **Non-Current Liabilities** (Long-term', outcome: '**Incorrect.** 10% Debentures due in 3 years are **Non-Current Liabilities** (Long-term.' },
                { text: 'liability', outcome: 'Not quite — **Misconception:** "Schedule III is just a formatting exercise — as long as totals match, the order.', reveals: 'misconception-schedule-iii-is-just' },
                { text: 'current liability', outcome: 'Not quite — **Misconception:** "Schedule III is just a formatting exercise — as long as totals match, the order.', reveals: 'misconception-schedule-iii-is-just' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_07_004', title: 'Treatment of Specific Items: Calls in Arrears and Calls in Advance',
          scaffold: { problem: 'A Ltd. issued 50,000 equity shares of ₹10 each at par, payable as ₹3 on application, ₹4 on allotment, ₹2 on first call, and ₹1 on final.',
            steps: [
            { text: 'Identify called-up capital per share = ₹3 + ₹4 + ₹2 + ₹1 = ₹10. Total called-up = 50,000 × ₹10 = ₹5,00,000.' },
            { text: 'Calculate Calls in Arrears: First call unpaid on 1,000 shares = 1,000 × ₹2 = ₹2,000.' },
            { text: 'Calculate Calls in Advance: 500 shares paid final call (₹1) early with first call. Advance = 500 × ₹1 = ₹500.' },
            { text: 'Interest on Calls in Arrears: On first call arrears (₹2,000) from 1 June 2023 to 31 March 2024 = 10 months.' },
            { text: 'Interest on Calls in Advance: On final call advance (₹500) from 1 June 2023 (when paid with first call) to 1 Dec 2023.', faded: true, blankAnswer: '(a) Calls in Arrears = ₹4,000; (b) Calls in Advance = ₹500.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_07_006', title: 'Underwriting Commission, Preliminary Expenses and Discount on Issue',
          scaffold: { problem: 'Himalaya Ltd. issues 2,00,000 equity shares of ₹10 each at a discount of 10%. The issue is fully subscribed.',
            steps: [
            { text: 'Calculate issue price per share = ₹10 - 10% discount = ₹9. Total proceeds = 2,00,000 × ₹9 = ₹18,00,000.' },
            { text: 'Underwriting commission = 4% of issue price = 4% × (2,00,000 × ₹10) = ₹80,000 (within 5% limit).' },
            { text: 'Journal entry for share allotment: Bank A/c Dr. 18,00,000; Discount on Issue of Shares A/c Dr.' },
            { text: 'Journal entry for underwriting commission: Underwriting Commission A/c Dr. 80,000; To Underwriters A/c 80,000.' },
            { text: 'Journal entry for preliminary expenses: Preliminary Expenses A/c Dr. 8,00,000; To Bank A/c 8,00,000.' },
            { text: 'Total capital losses = ₹2,00,000 + ₹80,000 + ₹8,00,000 = ₹10,80,000. Annual write-off = ₹10,80,000 / 4 = ₹2,70,000.', faded: true, blankAnswer: 'Journal entries as above. After first year, Balance Sheet.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a fintech internship, a student drafts the startup\'s first annual balance sheet in the old sole-proprietor style — horizontal layout, one merged \'Capital\' line. The founder waves it through: \'the totals match, that\'s what matters.\'',
            decisions: [{ prompt: 'Will this pass as the company\'s financial statements?', options: [
                { text: 'No — Section 129 read with Schedule III of the Companies Act, 2013 prescribes a vertical format with current/non-current splits and separate disclosure of share capital and each reserve; matching totals don\'t cure a wrong format.', outcome: 'Company statements are statutory documents for absentee shareholders, lenders and regulators — the mandated structure is what makes them comparable across firms.' },
                { text: 'Yes — a balance sheet is correct whenever assets equal liabilities plus capital, whatever the layout.', outcome: 'For a company, presentation is a legal requirement, not a style choice; aggregating \'Capital\' hides equity composition and liquidity.', reveals: 'format-optional-if-totals-match' },
                { text: 'Only add a Cash Flow Statement on top — the two Class 11-style statements plus cash flow make a complete set.', outcome: 'A complete set also needs the Statement of Changes in Equity and Notes to Accounts, all in Schedule III form — not just three proprietorship-era statements.', reveals: 'statements-are-just-two-plus-cashflow' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now navigate any Indian company\'s annual report without a guide. Schedule III formats are direct board marks — and the skeleton key to real financial analysis.',
            decisions: [{ prompt: 'What comes next? Financial Statements of a Company · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Financial Statements of a Company · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_001', difficulty: 'standard',
          question: 'Financial Statements of a Company are the formal, structured summaries of.',
          hint: 'If stuck, revisit **c11_acc_cbse_08_007** (Asset Classification) and.',
          misconception: 'Students often believe that **"Financial Statements of a Company = Balance Sheet + Profit & Loss Account (like in Class.',
          parts: [
                { id: 'a', prompt: 'What are the two primary financial statements mandated by Schedule III of the Companies Act, 2013 for a company, and what does each report?', answer: 'The two primary statements are: (1) Balance Sheet',
                  options: ['The two primary statements are: (1) Balance Sheet', 'Trading Account', 'Cash Flow Statement', 'Trading Account" or "Cash Flow Statement" as primary'],
                  hint: 'If stuck, revisit **c11_acc_cbse_08_007** (Asset Classification) and **c11_acc_cbse_08_008**.',
                  misconception: 'Students often believe that **"Financial Statements of a Company = Balance Sheet + Profit & Loss Account (like in Class 11), just with.' }
          ],
            remediations: { 'financial-statements-of-a-company': { steps: ['If the student holds the above misconception: 1.', '**Show side-by-side**: Place a Class 11 sole proprietorship Balance Sheet (horizontal format, no current/non-current.', 'Ask: "What *structural* differences do you see?" 2.', '**Map to law**: Read Section 129 of Companies Act, 2013 — "Financial statements shall give a true and fair view...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_002', difficulty: 'standard',
          question: 'The Balance Sheet of a Company as per Schedule III, Part I of the Companies Act.',
          hint: 'Revisit Class 11 nodes c11_acc_cbse_01_008 (Basic Terms), c11_acc_cbse_08_007 (Asset.',
          misconception: '**Misconception:** "Schedule III is just a formatting exercise — as long as totals match, the order of items doesn\'t.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Balance Sheet of a Company as per Schedule III, Part I of the Companies Act 2013 is a',
                  options: ['The Balance Sheet of a Company as per Schedule III, Part I of the Companies Act 2013 is a', 'Financial Statements of a Company are the formal, structured summaries of a company\'s', 'The Statement of Profit and Loss (as per Schedule III, Part II of the Companies Act,', 'Calls in Arrears refers to the amount of call money not paid by shareholders by the due'],
                  hint: 'Revisit Class 11 nodes c11_acc_cbse_01_008 (Basic Terms), c11_acc_cbse_08_007 (Asset.',
                  misconception: '**Misconception:** "Schedule III is just a formatting exercise — as long as totals match, the order of items doesn\'t matter." **Why.' }
          ],
            remediations: { 'misconception-schedule-iii-is-just': { steps: ['** Give them a "Classification Drill" — 30 mixed items (Debentures, Bank OD, Prepaid Expenses, Capital Reserve, etc.).', '** Review errors together using the **3-Question Test** for each item: (a) Is it owner\'s claim or outsider\'s claim?', '** Re-do the Zara Electronics mini B/S (Diagnostic Q6) from memory without notes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_003', difficulty: 'standard',
          question: 'The Statement of Profit and Loss (as per Schedule III, Part II of the Companies.',
          hint: 'If stuck on classifying an item, revisit **c11_acc_cbse_01_009** (Basic Accounting Terms.',
          misconception: 'Students treat the Statement of Profit and Loss as a mere "Profit & Loss Account" from Class 11 (horizontal T-format).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Statement of Profit and Loss (as per Schedule III, Part II of the Companies Act,',
                  options: ['The Statement of Profit and Loss (as per Schedule III, Part II of the Companies Act,', 'Financial Statements of a Company are the formal, structured summaries of a company\'s', 'The Balance Sheet of a Company as per Schedule III, Part I of the Companies Act 2013 is a', 'Calls in Arrears refers to the amount of call money not paid by shareholders by the due'],
                  hint: 'If stuck on classifying an item, revisit **c11_acc_cbse_01_009** (Basic Accounting Terms: Revenue.',
                  misconception: 'Students treat the Statement of Profit and Loss as a mere "Profit & Loss Account" from Class 11 (horizontal T-format) and simply list all.' }
          ],
            remediations: { 'students-treat-the-statement-of': { steps: ['Revisit **c11_acc_cbse_08_004** (Profit and Loss Account: Meaning and Preparation) to recall the horizontal format.', 'Place the horizontal format side-by-side with Schedule III vertical format; map each horizontal account to its vertical.', 'Practice classifying 15 mixed items (revenue, expense, exceptional, extraordinary) into the 16-line template using.', 'Re-attempt Diagnostic Question 3 without notes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_004', difficulty: 'standard',
          question: 'Calls in Arrears refers to the amount of call money not paid by shareholders.',
          hint: 'Revisit c12_acc_cbse_07_002 (Balance Sheet format) and c11_bs_cbse_07_007 (Capital.',
          misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect.',
          parts: [
                { id: 'a', prompt: 'A company issued 50,000 shares of ₹10 each at par, payable as ₹3 on application, ₹3 on allotment, ₹2 on first call, and ₹2 on final call.', answer: 'Calls in Arrears = 2,000 shares × ₹2 (final call) = ₹4,000',
                  options: ['Calls in Arrears = 2,000 shares × ₹2 (final call) = ₹4,000', 'amounts due from shareholders', 'trade receivables'],
                  hint: 'Revisit c12_acc_cbse_07_002 (Balance Sheet format) and c11_bs_cbse_07_007 (Capital subscription and.',
                  misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it later." They also net off.' },
                { id: 'b', prompt: 'A shareholder holding 500 shares of ₹100 each paid the first and final call of ₹20 per share along with the allotment money.', answer: 'Calls in Advance = 500 shares × ₹20 = ₹10,000',
                  options: ['Calls in Advance = 500 shares × ₹20 = ₹10,000', 'amounts due from shareholders', 'trade receivables'],
                  hint: 'Revisit c12_acc_cbse_07_002 (Balance Sheet format) and c11_bs_cbse_07_007 (Capital subscription and.',
                  misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it later." They also net off.' },
                { id: 'c', prompt: 'X Ltd. issued 20,000 shares of ₹10 each. The amount was payable as ₹3 on application, ₹4 on allotment, and ₹3 on first and final call.', answer: 'Call money due, (',
                  options: ['Call money due, (', 'amounts due from shareholders', 'trade receivables'],
                  hint: 'Revisit c12_acc_cbse_07_002 (Balance Sheet format) and c11_bs_cbse_07_007 (Capital subscription and.',
                  misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it later." They also net off.' },
                { id: 'd', prompt: 'Compare the Balance Sheet disclosure of Calls in Arrears and Calls in Advance as per Schedule III.', answer: 'The argument is INCORRECT',
                  options: ['The argument is INCORRECT', 'amounts due from shareholders', 'trade receivables'],
                  hint: 'Revisit c12_acc_cbse_07_002 (Balance Sheet format) and c11_bs_cbse_07_007 (Capital subscription and.',
                  misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it later." They also net off.' }
          ],
            remediations: { 'students-often-treat-calls-in': { steps: ['If a student shows Calls in Arrears as a Current Asset or nets it with Calls in Advance: (1) Revisit.', '(2) Use the "Shareholder\'s Claim" analogy: Unpaid call = shareholder\'s equity claim is reduced; Advance payment.', '(3) Practice: Take a trial balance with both items and force the student to place each in the correct Schedule III line.', '(4) Re-diagnostic: Give a fresh problem with both arrears and advance and ask for the Share Capital note and Current.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect.',
          parts: [
                { id: 'a', prompt: 'A company\'s Articles of Association are silent on interest on Calls in Arrears and Calls in Advance. The company charges 10% p.a. on arrears and pays 12% p.a.', answer: 'No, it is NOT permissible',
                  options: ['No, it is NOT permissible', 'not allowed because Articles are silent', 'any rate is allowed', 'amounts due from shareholders'],
                  hint: 'Revisit c12_acc_cbse_07_002 (Balance Sheet format) and c11_bs_cbse_07_007 (Capital subscription and.',
                  misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it later." They also net off.' },
                { id: 'b', prompt: 'Create a realistic scenario where a company has BOTH Calls in Arrears and Calls in Advance simultaneously.', answer: 'Scenario: Y Ltd',
                  options: ['Scenario: Y Ltd', 'amounts due from shareholders', 'trade receivables'],
                  hint: 'Revisit c12_acc_cbse_07_002 (Balance Sheet format) and c11_bs_cbse_07_007 (Capital subscription and.',
                  misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it later." They also net off.' }
          ],
            remediations: { 'students-often-treat-calls-in': { steps: ['If a student shows Calls in Arrears as a Current Asset or nets it with Calls in Advance: (1) Revisit.', '(2) Use the "Shareholder\'s Claim" analogy: Unpaid call = shareholder\'s equity claim is reduced; Advance payment.', '(3) Practice: Take a trial balance with both items and force the student to place each in the correct Schedule III line.', '(4) Re-diagnostic: Give a fresh problem with both arrears and advance and ask for the Share Capital note and Current.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_005', difficulty: 'standard',
          question: 'Unclaimed Dividend refers to the dividend declared by a company that remains.',
          hint: 'If stuck, revisit **c12_acc_cbse_07_002 (Balance Sheet Format)** and **c11_bs_cbse_08_004.',
          misconception: 'Students often treat **Unclaimed Dividend as a Provision** (like Provision for Tax) and show it under \'Short-term.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Unclaimed Dividend refers to the dividend declared by a company that remains unpaid or',
                  options: ['Unclaimed Dividend refers to the dividend declared by a company that remains unpaid or', 'Financial Statements of a Company are the formal, structured summaries of a company\'s', 'The Balance Sheet of a Company as per Schedule III, Part I of the Companies Act 2013 is a', 'The Statement of Profit and Loss (as per Schedule III, Part II of the Companies Act,'],
                  hint: 'If stuck, revisit **c12_acc_cbse_07_002 (Balance Sheet Format)** and **c11_bs_cbse_08_004 (Equity.',
                  misconception: 'Students often treat **Unclaimed Dividend as a Provision** (like Provision for Tax) and show it under \'Short-term Provisions\' because the.' }
          ],
            remediations: { 'students-often-treat-unclaimed-dividend': { steps: ['**Revisit the Schedule III format** (node c12_acc_cbse_07_002) and physically locate the two line items: \'Other Current.', '**Practice 5 journal-entry sets**: (a) declaration → payment → unpaid transfer, (b) forfeiture → reissue at discount →.', '**Do a side-by-side comparison table** with columns: \'Item\', \'Nature (Liability/Equity)\', \'Schedule III Head\'.', '**Re-attempt Diagnostic Questions 1, 2, and 5** until all are correct without notes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_006', difficulty: 'standard',
          question: 'Underwriting commission is the fee paid to underwriters for guaranteeing the.',
          hint: 'If stuck, review `c12_acc_cbse_07_002` (Balance Sheet format) and `c11_acc_cbse_08_006`.',
          misconception: 'Students often think **discount on issue of shares** is a "reduction from share capital" and show it as a negative item.',
          parts: [
                { id: 'a', prompt: 'Explain why preliminary expenses are not charged entirely to the Statement of Profit and Loss in the year they are incurred.', answer: 'Preliminary expenses are capital in nature',
                  options: ['Preliminary expenses are capital in nature', 'they are revenue expenses', 'they are assets', 'reduction from share capital'],
                  hint: 'If stuck, review `c12_acc_cbse_07_002` (Balance Sheet format) and `c11_acc_cbse_08_006` (Asset.',
                  misconception: 'Students often think **discount on issue of shares** is a "reduction from share capital" and show it as a negative item under Share Capital.' },
                { id: 'b', prompt: 'GreenEnergy Ltd. issues 1,00,000 equity shares of ₹10 each at a discount of 5%. The issue is fully subscribed.', answer: '**Journal Entry:** Bank A/c Dr',
                  options: ['**Journal Entry:** Bank A/c Dr', 'net proceeds', 'reduction from share capital'],
                  hint: 'If stuck, review `c12_acc_cbse_07_002` (Balance Sheet format) and `c11_acc_cbse_08_006` (Asset.',
                  misconception: 'Students often think **discount on issue of shares** is a "reduction from share capital" and show it as a negative item under Share Capital.' }
          ],
            remediations: { 'discount-on-issue-of-shares': { steps: ['If a student makes the above errors: 1.', '**Revisit the Balance Sheet format** in node `c12_acc_cbse_07_002` — focus on the "Other Non-Current Assets" and.', '**Re-do the journal entries** for each item separately using the worked examples below; highlight the account heads.', '**Practice a mini-case**: Take a company with all three items, prepare the "Notes to Accounts" for 3 years.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
