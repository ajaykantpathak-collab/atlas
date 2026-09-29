import type { SimDef } from '../../engine/types';
import C12_AccountancyPastAdjustmentsAfterSim from '../../../simulations/c6_12/C12_AccountancyPastAdjustmentsAfterSim';

/** v3 wrapped master — C12_AccountancyPastAdjustmentsAfterSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_accountancypastadjustmentsaftersim: SimDef = {
    id: 'v3w_c12_accountancypastadjustmentsaftersim',
    title: 'Profit and Loss Appropriation Account: Preparation and Format',
    subtitle: 'This node covers the format, preparation, and journal entries for the Profit and Loss.',
    classLevel: 12, subject: 'accountancy', topic: 'Profit and Loss Appropriation Account: Preparation and Format',
    chapters: [],
    nodeIds: ['c12_acc_cbse_01_005', 'c12_acc_cbse_01_008', 'c12_acc_cbse_02_003', 'c12_acc_cbse_01_007', 'c12_acc_cbse_01_010', 'c12_acc_cbse_01_011', 'c12_acc_cbse_02_008', 'c12_acc_cbse_02_009', 'c12_acc_cbse_02_010', 'c12_acc_cbse_02_011', 'c12_acc_cbse_07_010', 'c12_acc_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you and two friends run a bakery partnership. At year-end, your Profit & Loss Account shows ₹5,00,000.', goal: 'Master Profit and Loss Appropriation Account: Preparation and Format.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The Profit and Loss Appropriation Account is.', text: 'The Profit and Loss Appropriation Account is a nominal account prepared by partnership firms to show how the net profit (or loss) earned during an accounting period is distributed among partners.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_acc_cbse_01_005', title: 'The Profit and Loss Appropriation.',
          scaffold: { problem: 'P and Q are partners sharing profits 3:2. Their capitals: P ₹6,00,000, Q ₹4,00,000. Net profit from P&L Account: ₹3,50,000.',
            steps: [
            { text: 'Identify all appropriation items from the deed and classify each as debit (charge against profit) or credit (income to.' },
            { text: 'Compute each item: Interest on Capital: P = ₹6,00,000 × 10% = ₹60,000; Q = ₹4,00,000 × 10% = ₹40,000.' },
            { text: 'Compute commission first since it depends on divisible profit before reserve.' },
            { text: 'Profit before reserve = ₹1,79,000 − ₹8,524 = ₹1,70,476. Transfer to General Reserve = 10% × ₹1,70,476 = ₹17,048.' },
            { text: 'Distribute divisible profit: P (3/5) = ₹92,057; Q (2/5) = ₹61,371.', faded: true, blankAnswer: 'Divisible Profit = ₹1,53,428 (P: ₹92,057, Q: ₹61,371)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_01_008', title: 'Partner\'s Salary is a fixed periodic.',
          scaffold: { problem: 'Partners X and Y share profits 3:2. X gets a monthly salary of ₹15,000.',
            steps: [
            { text: 'Identify charges vs appropriations. Interest on Y\'s loan is a charge (deed silent → 6% p.a.).' },
            { text: 'Calculate Interest on Loan = ₹4,00,000 × 6% × 9/12 = ₹18,000. Debit to P&L Account.' },
            { text: 'Calculate X\'s Salary = ₹15,000 × 12 = ₹1,80,000. Debit to P&L Appropriation.' },
            { text: 'Profit before Y\'s commission = ₹5,82,000 – ₹1,80,000 = ₹4,02,000. Commission = ₹4,02,000 × 10/110 = ₹36,545 (rounded).' },
            { text: 'Divisible Profit = ₹4,02,000 – ₹36,545 = ₹3,65,455. Share: X = ₹3,65,455 × 3/5 = ₹2,19,273; Y = ₹1,46,182.' },
            { text: 'Prepare P&L Appropriation Account: Dr. side — Salary ₹1,80,000, Commission ₹36,545, Profit transferred to Capital: X.', faded: true, blankAnswer: 'Interest on Loan ₹18,000 (charge); X\'s Salary ₹1,80,000;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_02_003', title: 'Goodwill valuation under the **Average.',
          scaffold: { problem: 'A firm\'s profits for 3 years ended 31st March: 2022: ₹1,20,000; 2023: ₹1,50,000; 2024: ₹1,80,000.',
            steps: [
            { text: 'Adjust each year\'s profit for non-recurring items, partner salary, and depreciation error.' },
            { text: '2022: ₹1,20,000 − ₹24,000 (salary) − ₹6,000 (depreciation) = ₹90,000. 2023: ₹1,50,000 − ₹24,000 = ₹1,26,000.' },
            { text: 'Total adjusted profit = ₹90,000 + ₹1,26,000 + ₹1,26,000 = ₹3,42,000.' },
            { text: 'Average profit = ₹3,42,000 / 3 = ₹1,14,000.' },
            { text: 'Goodwill = ₹1,14,000 × 2 = ₹2,28,000.' },
            { text: 'Verify: All adjustments reduce profit to maintainable level; years\' purchase multiplies annual excess.', faded: true, blankAnswer: '₹2,28,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_01_007', title: 'Interest on Drawings is the charge.',
          scaffold: { problem: 'Partner A draws the following amounts during the year ended 31st March 2024: ₹20,000 on 1st May, ₹15,000 on 31st August, ₹10,000 on 30th.',
            steps: [
            { text: 'Determine months outstanding for each drawing from the month following the drawing to March (year-end).' },
            { text: 'Calculate product for each drawing: Amount × Months Outstanding. ₹20,000 × 10 = 2,00,000. ₹15,000 × 7 = 1,05,000.' },
            { text: 'Sum of Products = 2,00,000 + 1,05,000 + 40,000 + 5,000 = 3,50,000.' },
            { text: 'Apply formula: Interest = Sum of Products × Rate/100 × 1/12 = 3,50,000 × 12/100 × 1/12 = 3,50,000 × 0.01 = ₹3,500.' },
            { text: 'Verify: Equivalent to charging 1% per month on each product. ₹20,000 for 10 months @ 1%/month = ₹2,000.', faded: true, blankAnswer: '₹3,500' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_01_010', title: 'Past adjustments in partnership.',
          scaffold: { problem: 'Partners P and Q share profits 3:2. Their fixed capitals on 1st April 2022 were ₹4,00,000 and ₹2,00,000 respectively.',
            steps: [
            { text: 'Identify the error – Interest on capital was omitted for the year 2022-23.' },
            { text: 'Compute the interest due for each partner: P = ₹4,00,000 × 10% = ₹40,000; Q = ₹2,00,000 × 10% = ₹20,000.' },
            { text: 'Determine the accounts to be debited and credited. Since it\'s a prior period omission, debit Profit and Loss Adjustment.' },
            { text: 'Calculate the credit amounts: P = ₹60,000 × 3/5 = ₹36,000; Q = ₹60,000 × 2/5 = ₹24,000.' },
            { text: 'Pass the compound journal entry and verify that the net effect increases each partner\'s capital by the interest they.', faded: true, blankAnswer: 'Journal Entry (1st April 2023):' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_01_011', title: 'Maintenance of Partners\' Capital and.',
          scaffold: { problem: 'Simran and Tanya are partners in a firm with Fixed Capitals of ₹4,00,000 and ₹3,00,000 respectively.',
            steps: [
            { text: 'Identify method — Fixed Capital → two accounts per partner.' },
            { text: 'Compute appropriations: Interest on Capital (Simran: 10% × ₹4,00,000 = ₹40,000; Tanya: 10% × ₹3,00,000 = ₹30,000).' },
            { text: 'Prepare Capital Accounts — only opening balance, additional capital, permanent withdrawal.' },
            { text: 'Prepare Current Accounts — all recurring items.' },
            { text: 'Verify — Total Capital + Current = Simran ₹6,07,560; Tanya ₹2,86,640. Sum = ₹8,94,200.', faded: true, blankAnswer: 'Simran Capital A/c closing ₹5,00,000 Cr; Current A/c.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_acc_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'Profit and Loss Appropriation Account: Preparation and Format', spots: [
            { id: 's1', label: 'The Profit and Loss Appropriation', prompt: 'Which idea is this? — The Profit and Loss Appropriation Account is a nominal account prepared by partnership.', answer: 'The Profit and Loss Appropriation', options: ['The Profit and Loss Appropriation', 'Partners Salary is a fixed', 'Goodwill valuation under the Average', 'Interest on Drawings is the'] },
            { id: 's2', label: 'Partners Salary is a fixed', prompt: 'Which idea is this? — Partner\'s Salary is a fixed periodic payment to a working partner for active.', answer: 'Partners Salary is a fixed', options: ['Partners Salary is a fixed', 'The Profit and Loss Appropriation', 'Goodwill valuation under the Average', 'Interest on Drawings is the'] },
            { id: 's3', label: 'Goodwill valuation under the Average', prompt: 'Which idea is this? — Goodwill valuation under the **Average Profit Method** computes goodwill as the product.', answer: 'Goodwill valuation under the Average', options: ['Goodwill valuation under the Average', 'The Profit and Loss Appropriation', 'Partners Salary is a fixed', 'Interest on Drawings is the'] },
            { id: 's4', label: 'Interest on Drawings is the', prompt: 'Which idea is this? — Interest on Drawings is the charge levied by the partnership firm on amounts withdrawn by.', answer: 'Interest on Drawings is the', options: ['Interest on Drawings is the', 'The Profit and Loss Appropriation', 'Partners Salary is a fixed', 'Goodwill valuation under the Average'] },
            { id: 's5', label: 'Past adjustments in partnership accounts', prompt: 'Which idea is this? — Past adjustments in partnership accounts refer to the rectification entries passed to.', answer: 'Past adjustments in partnership accounts', options: ['Past adjustments in partnership accounts', 'The Profit and Loss Appropriation', 'Partners Salary is a fixed', 'Goodwill valuation under the Average'] },
            { id: 's6', label: 'Maintenance of Partners Capital and', prompt: 'Which idea is this? — Maintenance of Partners\' Capital and Current Accounts refers to the systematic recording.', answer: 'Maintenance of Partners Capital and', options: ['Maintenance of Partners Capital and', 'The Profit and Loss Appropriation', 'Partners Salary is a fixed', 'Goodwill valuation under the Average'] }
          ] } }
    ],
    explore: { component: C12_AccountancyPastAdjustmentsAfterSim, prompt: 'Explore the interactive — Profit and Loss Appropriation Account: Preparation and Format' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_005', difficulty: 'standard',
          question: 'The Profit and Loss Appropriation Account is a nominal account prepared by.',
          hint: 'Revisit c11_acc_cbse_08_004 (P&L Account Preparation) and c11_acc_cbse_03_005.',
          misconception: 'Students treat the Profit and Loss Appropriation Account as a continuation of the Profit and Loss Account and put *all*.',
          parts: [
                { id: 'a', prompt: 'Compare the treatment of "Interest on Capital" and "Interest on Drawings" in the Profit and Loss Appropriation Account.', answer: 'Interest on Capital is an *appropriation*',
                  options: ['Interest on Capital is an *appropriation*', 'capital = debit, drawings = credit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the Profit and Loss Appropriation Account as a continuation of the Profit and Loss Account and put *all* partner-related.' }
          ],
            remediations: { 'students-treat-the-profit-and': { steps: ['Have the student draw a two-column table: "Firm\'s Perspective" vs "Partner\'s Perspective" for each item (Interest on.', 'For each, ask: "Does the firm *pay* or *receive*?', 'Is it an *expense/appropriation* or *income*?" 3.', 'Firm pays interest on capital → appropriation → debit.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the Profit and Loss Appropriation Account as a continuation of the Profit and Loss Account and put *all*.',
          parts: [
                { id: 'a', prompt: 'A firm\'s net profit is ₹2,00,000. The deed provides: (i) Interest on capital @ 10% on ₹5,00,000 each for two partners, (ii) Salary to Partner A ₹2,000/month,.', answer: 'Total appropriations = Interest on Capital (₹1,00,000) + Salary to A (₹24,000) +',
                  options: ['Total appropriations = Interest on Capital (₹1,00,000) + Salary to A (₹24,000) +', 'show loss in P&L Appropriation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the Profit and Loss Appropriation Account as a continuation of the Profit and Loss Account and put *all* partner-related.' },
                { id: 'b', prompt: 'Design a scenario where a partnership firm has a net loss in the Profit and Loss Account but the Profit and Loss Appropriation Account still shows entries.', answer: 'Scenario: Net loss ₹50,000',
                  options: ['Scenario: Net loss ₹50,000', 'no appropriation account if loss'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the Profit and Loss Appropriation Account as a continuation of the Profit and Loss Account and put *all* partner-related.' },
                { id: 'c', prompt: 'Compare the treatment of "Interest on Capital" and "Interest on Drawings" in the Profit and Loss Appropriation Account.', answer: 'Interest on Capital is an *appropriation*',
                  options: ['Interest on Capital is an *appropriation*', 'capital = debit, drawings = credit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the Profit and Loss Appropriation Account as a continuation of the Profit and Loss Account and put *all* partner-related.' }
          ],
            remediations: { 'students-treat-the-profit-and': { steps: ['Have the student draw a two-column table: "Firm\'s Perspective" vs "Partner\'s Perspective" for each item (Interest on.', 'For each, ask: "Does the firm *pay* or *receive*?', 'Is it an *expense/appropriation* or *income*?" 3.', 'Firm pays interest on capital → appropriation → debit.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_008', difficulty: 'standard',
          question: 'Partner\'s Salary is a fixed periodic payment to a working partner for active.',
          hint: 'If stuck, review the format of Profit and Loss Appropriation Account.',
          misconception: '**Students treat Partner\'s Salary as an expense (charge) and debit it to Profit and Loss Account.** Why: They see.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Partner\'s Salary is a fixed periodic payment to a working partner for active',
                  options: ['Partner\'s Salary is a fixed periodic payment to a working partner for active', 'The Profit and Loss Appropriation Account is a nominal account prepared by partnership', 'Goodwill valuation under the **Average Profit Method** computes goodwill as the product', 'Interest on Drawings is the charge levied by the partnership firm on amounts withdrawn by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students treat Partner\'s Salary as an expense (charge) and debit it to Profit and Loss Account.** Why: They see "salary" and associate it.' }
          ],
            remediations: { 'students-treat-partner-s-salary': { steps: ['Revisit **c12_acc_cbse_01_005** (Profit and Loss Appropriation Account) to relearn the format and items.', 'Review **c11_acc_cbse_08_004** (Trading and Profit and Loss Account) to recall the difference between expenses.', 'Do a focused drill: Take 5 problems where you classify each item as Charge or Appropriation.', 'Say aloud: "Interest on loan → Charge → P&L A/c.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students treat Partner\'s Salary as an expense (charge) and debit it to Profit and Loss Account.** Why: They see.',
          parts: [
                { id: 'a', prompt: 'The partnership deed provides for a partner\'s commission of 12% on net profit **before** charging commission.', answer: 'Correct commission (before) = ₹5,00,000 × 12% = ₹60,000',
                  options: ['Correct commission (before) = ₹5,00,000 × 12% = ₹60,000', 'commission is a charge'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students treat Partner\'s Salary as an expense (charge) and debit it to Profit and Loss Account.** Why: They see "salary" and associate it.' }
          ],
            remediations: { 'students-treat-partner-s-salary': { steps: ['Revisit **c12_acc_cbse_01_005** (Profit and Loss Appropriation Account) to relearn the format and items.', 'Review **c11_acc_cbse_08_004** (Trading and Profit and Loss Account) to recall the difference between expenses.', 'Do a focused drill: Take 5 problems where you classify each item as Charge or Appropriation.', 'Say aloud: "Interest on loan → Charge → P&L A/c.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_003', difficulty: 'standard',
          question: 'Goodwill valuation under the **Average Profit Method** computes goodwill as the.',
          hint: 'If stuck on profit adjustments, revisit **c11_acc_cbse_09_003, c11_acc_cbse_09_005,.',
          misconception: 'Students often **forget to adjust profits for non-recurring items, partner remuneration, and depreciation policy.',
          parts: [
                { id: 'a', prompt: 'Compare Simple Average Profit Method and Weighted Average Profit Method. When is weighted average preferred?', answer: 'Simple average gives equal weight to all years',
                  options: ['Simple average gives equal weight to all years', 'weighted average is always better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often **forget to adjust profits for non-recurring items, partner remuneration, and depreciation policy changes** before computing.' }
          ],
            remediations: { 'students-often-forget-to-adjust': { steps: ['Revisit **c11_acc_cbse_09_003** (Outstanding/Prepaid Expenses), **c11_acc_cbse_09_005** (Depreciation Adjustment),.', 'Practice computing **capital employed** from a Balance Sheet: list all assets (at revalued amounts), subtract outside.', 'Use **c11_acc_cbse_08_006** (Balance Sheet classification).', 'Solve 5 problems where you must **identify and adjust** at least 3 items (non-recurring gain, partner salary,.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often **forget to adjust profits for non-recurring items, partner remuneration, and depreciation policy.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Super Profit Method is superior to Average Profit Method because it considers capital employed." Evaluate this statement with reference to a.', answer: 'The statement is **partially correct but incomplete**',
                  options: ['The statement is **partially correct but incomplete**', 'Super Profit is always better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often **forget to adjust profits for non-recurring items, partner remuneration, and depreciation policy changes** before computing.' },
                { id: 'b', prompt: 'Compare Simple Average Profit Method and Weighted Average Profit Method. When is weighted average preferred?', answer: 'Simple average gives equal weight to all years',
                  options: ['Simple average gives equal weight to all years', 'weighted average is always better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often **forget to adjust profits for non-recurring items, partner remuneration, and depreciation policy changes** before computing.' }
          ],
            remediations: { 'students-often-forget-to-adjust': { steps: ['Revisit **c11_acc_cbse_09_003** (Outstanding/Prepaid Expenses), **c11_acc_cbse_09_005** (Depreciation Adjustment),.', 'Practice computing **capital employed** from a Balance Sheet: list all assets (at revalued amounts), subtract outside.', 'Use **c11_acc_cbse_08_006** (Balance Sheet classification).', 'Solve 5 problems where you must **identify and adjust** at least 3 items (non-recurring gain, partner salary,.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_007', difficulty: 'standard',
          question: 'Interest on Drawings is the charge levied by the partnership firm on amounts.',
          hint: 'Revisit c11_acc_cbse_01_010 (Drawings meaning) and.',
          misconception: 'Students memorize average periods (6.5, 6, 5.5) but apply them blindly without checking if drawings are truly regular.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Interest on Drawings is the charge levied by the partnership firm on amounts withdrawn by',
                  options: ['Interest on Drawings is the charge levied by the partnership firm on amounts withdrawn by', 'The Profit and Loss Appropriation Account is a nominal account prepared by partnership', 'Partner\'s Salary is a fixed periodic payment to a working partner for active', 'Goodwill valuation under the **Average Profit Method** computes goodwill as the product'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorize average periods (6.5, 6, 5.5) but apply them blindly without checking if drawings are truly regular.' }
          ],
            remediations: { 'students-memorize-average-periods-6': { steps: ['If a student confuses the methods: Step 1 — Ask "Are specific dates given?" If YES → Product Method.', 'If NO, but frequency/timing given (e.g., "beginning of every month") → Average Period Method.', 'Step 2 — For Product Method errors: Practice month-counting with a calendar.', 'Draw a timeline: Accounting year Apr-Mar.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_010', difficulty: 'standard',
          question: 'Past adjustments in partnership accounts refer to the rectification entries.',
          hint: 'If stuck, revisit Class 11 rectification of errors (c11_acc_cbse_06_009,.',
          misconception: 'Students often believe that rectification entries for past adjustments should be routed through the current year\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Past adjustments in partnership accounts refer to the rectification entries passed to',
                  options: ['Past adjustments in partnership accounts refer to the rectification entries passed to', 'The Profit and Loss Appropriation Account is a nominal account prepared by partnership', 'Partner\'s Salary is a fixed periodic payment to a working partner for active', 'Goodwill valuation under the **Average Profit Method** computes goodwill as the product'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that rectification entries for past adjustments should be routed through the current year\'s Profit and Loss Account.' }
          ],
            remediations: { 'rectification-entries-for-past-adjustments': { steps: ['If the student confuses the account to be debited/credited, follow these steps: 1.', 'Revisit Class 11 rectification of errors (nodes c11_acc_cbse_06_009 and c11_acc_cbse_06_010) to master the "correct.', 'Review each partnership adjustment node (c12_acc_cbse_01_006 to c12_acc_cbse_01_009) to recall the original correct.', 'Practice the rule: "For any past omission, debit Profit and Loss Adjustment Account with the amount that should have.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_011', difficulty: 'standard',
          question: 'Maintenance of Partners\' Capital and Current Accounts refers to the systematic.',
          hint: 'If unsure about Fixed vs Fluctuating Capital, review c12_acc_cbse_01_004.',
          misconception: '**Misconception:** "Under Fixed Capital Method, the Capital Account never changes, so we only need to maintain the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Maintenance of Partners\' Capital and Current Accounts refers to the systematic recording',
                  options: ['Maintenance of Partners\' Capital and Current Accounts refers to the systematic recording', 'The Profit and Loss Appropriation Account is a nominal account prepared by partnership', 'Partner\'s Salary is a fixed periodic payment to a working partner for active', 'Goodwill valuation under the **Average Profit Method** computes goodwill as the product'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Under Fixed Capital Method, the Capital Account never changes, so we only need to maintain the Current Account." **Why.' }
          ],
            remediations: { 'misconception-under-fixed-capital-method': { steps: ['**Revisit the definition**: "Fixed Capital = Permanent Capital; Current Account = Fluctuating Account." Write it on a.', '**Do a card sort**: Take 10 transaction cards (e.g., "Additional capital ₹50,000", "Drawings ₹20,000", "Interest on.', 'Sort each into "Capital A/c" or "Current A/c" pile.', 'Check against NCERT rules.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Under Fixed Capital Method, the Capital Account never changes, so we only need to maintain the.',
          parts: [
                { id: 'a', prompt: 'A partnership deed provides for interest on capital @ 12% p.a. but is silent on interest on drawings.', answer: '**Correct Evaluation:** 1',
                  options: ['**Correct Evaluation:** 1', '6% avg, they err'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Under Fixed Capital Method, the Capital Account never changes, so we only need to maintain the Current Account." **Why.' }
          ],
            remediations: { 'misconception-under-fixed-capital-method': { steps: ['**Revisit the definition**: "Fixed Capital = Permanent Capital; Current Account = Fluctuating Account." Write it on a.', '**Do a card sort**: Take 10 transaction cards (e.g., "Additional capital ₹50,000", "Drawings ₹20,000", "Interest on.', 'Sort each into "Capital A/c" or "Current A/c" pile.', 'Check against NCERT rules.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
