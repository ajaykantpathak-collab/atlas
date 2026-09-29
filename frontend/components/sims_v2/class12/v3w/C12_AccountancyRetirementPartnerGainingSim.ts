import type { SimDef } from '../../engine/types';
import C12_AccountancyRetirementPartnerGainingSim from '../../../simulations/c6_12/C12_AccountancyRetirementPartnerGainingSim';

/** v3 wrapped master — C12_AccountancyRetirementPartnerGainingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_accountancyretirementpartnergainingsim: SimDef = {
    id: 'v3w_c12_accountancyretirementpartnergainingsim',
    title: 'New Profit Sharing Ratio and Gaining Ratio on Retirement of a Partner',
    subtitle: 'This node covers computation of new profit sharing ratio and gaining ratio on retirement.',
    classLevel: 12, subject: 'accountancy', topic: 'New Profit Sharing Ratio and Gaining Ratio on Retirement of a Partner',
    chapters: [],
    nodeIds: ['c12_acc_cbse_03_001', 'c12_acc_cbse_03_002', 'c12_acc_cbse_03_003', 'c12_acc_cbse_03_004', 'c12_acc_cbse_03_009', 'c12_acc_cbse_02_001', 'c12_acc_cbse_03_007', 'c12_acc_cbse_03_008', 'c12_acc_cbse_03_010', 'c12_acc_cbse_02_003', 'c12_acc_cbse_02_004', 'c12_acc_cbse_02_006', 'c12_acc_cbse_02_008', 'c12_acc_cbse_02_011', 'c12_acc_cbse_02_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine three friends — Aryan, Bhavya, and Chirag — run a café sharing profits 3:2:1.', goal: 'Master New Profit Sharing Ratio and Gaining Ratio on Retirement of a Partner.' },
    discovery: {
        question: 'X, Y, Z share profits 1/2, 1/3, 1/6. Z retires. X and Y agree to share future profits equally. A student calculates gaining ratio as 1:1.',
        options: ['**Correct Answer:** The student is WRONG', 'equal new sharing', 'equal gaining'],
        answer: '**Correct Answer:** The student is WRONG',
        hook: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.',
    },
    teaching: [
        { title: 'When a partner retires from a partnership.', text: 'When a partner retires from a partnership firm, the continuing partners acquire the retiring partner\'s share of profit in a specific ratio.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_acc_cbse_03_001', title: 'When a partner retires from a.',
          scaffold: { problem: 'A, B, and C are partners sharing profits in the ratio 5:3:2. C retires. A and B agree to share future profits in the ratio 3:2.',
            steps: [
            { text: 'Convert old ratio to fractions. Total parts = 5+3+2 = 10. A\'s old share = 5/10, B\'s old share = 3/10, C\'s old share =.' },
            { text: 'Convert new ratio to fractions. A and B new ratio = 3:2 → Total parts = 5. A\'s new share = 3/5, B\'s new share = 2/5.' },
            { text: 'Express new shares with denominator 10 for comparison. A\'s new share = 3/5 = 6/10. B\'s new share = 2/5 = 4/10.' },
            { text: 'Compute gain for each. Gain of A = New – Old = 6/10 – 5/10 = 1/10. Gain of B = 4/10 – 3/10 = 1/10.' },
            { text: 'Gaining ratio = Gain of A : Gain of B = 1/10 : 1/10 = 1:1.', faded: true, blankAnswer: 'Gaining Ratio = 1:1' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_03_002', title: 'Treatment of Goodwill on Retirement of.',
          scaffold: { problem: 'Partners X, Y, Z share profits 4:3:2. Z retires. Goodwill is valued at ₹2,70,000. The new profit-sharing ratio between X and Y is 5:3.',
            steps: [
            { text: 'Calculate Z\'s share of goodwill = ₹2,70,000 × 2/9 = ₹60,000 (old ratio 4:3:2 → total 9 parts, Z has 2).' },
            { text: 'Compute gaining ratio: X\'s gain = 5/8 − 4/9 = (45−32)/72 = 13/72; Y\'s gain = 3/8 − 3/9 = (27−24)/72 = 3/72.' },
            { text: 'Allocate Z\'s goodwill share (₹60,000) in gaining ratio 13:3 → X bears ₹60,000 × 13/16 = ₹48,750; Y bears ₹60,000 × 3/16.' },
            { text: 'Pass journal entry: X\'s Capital A/c Dr. ₹48,750; Y\'s Capital A/c Dr.' },
            { text: 'Verify: Z\'s capital increases by ₹60,000 (their entitlement); X and Y\'s capitals decrease by amounts proportional to.', faded: true, blankAnswer: 'Journal Entry: X\'s Capital A/c Dr. ₹48,750; Y\'s Capital A/c.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_03_003', title: 'Revaluation Account is a nominal.',
          scaffold: { problem: 'Partners P, Q, R share profits 5:3:2. R retires on 31st March 2024.',
            steps: [
            { text: 'Calculate each adjustment amount. Land appreciation = 30% of ₹20,00,000 = ₹6,00,000 (Gain → Credit).' },
            { text: 'Open Revaluation Account. Debit side (Losses): Building ₹1,50,000 + Stock ₹80,000 + Provision ₹30,000 + Outstanding.' },
            { text: 'Compute net profit = Credit total – Debit total = ₹7,50,000 – ₹3,00,000 = ₹4,50,000 (Credit balance → Profit).' },
            { text: 'Distribute profit in old ratio 5:3:2. P = 5/10 × ₹4,50,000 = ₹2,25,000; Q = 3/10 × ₹4,50,000 = ₹1,35,000; R = 2/10 ×.' },
            { text: 'Journal entry for transfer: Revaluation A/c Dr. ₹4,50,000 To P\'s Capital A/c ₹2,25,000; To Q\'s Capital A/c ₹1,35,000;.', faded: true, blankAnswer: 'Revaluation Profit ₹4,50,000; P\'s share ₹2,25,000; Q\'s.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_03_004', title: 'Adjustment of Accumulated Profits and.',
          caseStudy: { intro: 'Imagine a partnership firm where three friends — A, B, and C — have been running a business for five years.',
            decisions: [{ prompt: 'A firm has a General Reserve of ₹50,000 and Profit & Loss Account (Cr.) of ₹20,000 on the date of retirement of partner X.', options: [
                { text: '**Correct Answer:** General Reserve A/c Dr', outcome: '**Correct Answer:** General Reserve A/c Dr. 50,000 Profit & Loss A/c Dr.' },
                { text: 'only continuing partners matter now', outcome: 'Not quite — **Misconception:** "All reserves on the liability side of the Balance Sheet are transferred to.', reveals: 'misconception-all-reserves-on-the' },
                { text: '"only continuing partners matter now', outcome: 'Not quite — **Misconception:** "All reserves on the liability side of the Balance Sheet are transferred to.', reveals: 'misconception-all-reserves-on-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_03_009', title: 'The Deceased Partner\'s Capital Account.',
          scaffold: { problem: 'X, Y, Z are partners sharing profits 5:3:2. Z dies on 31st August 2024. The Balance Sheet on 31st March 2024 showed:',
            steps: [
            { text: 'Calculate revaluation profit/loss. Building appreciation: 20% of ₹4,00,000 = ₹80,000 (cr).' },
            { text: 'Calculate goodwill share. Goodwill ₹1,80,000 × 2/10 = ₹36,000 (cr).' },
            { text: 'Calculate General Reserve share. ₹60,000 × 2/10 = ₹12,000 (cr).' },
            { text: 'Calculate profit up to death. Period: 1st April to 31st August = 5 months.' },
            { text: 'Calculate interest on capital. Z\'s opening capital ₹1,50,000 × 12% × 5/12 = ₹7,500 (cr).' },
            { text: 'Calculate interest on drawings. Drawings ₹15,000 × 10% × 3.5/12 = ₹438 (dr).' },
            { text: 'Calculate JLP share. Surrender value ₹90,000 × 2/10 = ₹18,000 (cr).' },
            { text: 'Compile Z\'s Capital Account.' },
            { text: 'Record payment. Paid ₹2,00,000; balance ₹50,929 payable in 2 instalments of ₹25,464.50 each with interest.' },
            { text: 'Prepare post-death Balance Sheet.', faded: true, blankAnswer: 'Z\'s Capital Account closing balance ₹2,50,929; Post-death.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_02_001', title: 'The **New Profit Sharing Ratio (NPSR)**.',
          scaffold: { problem: 'A and B are partners sharing profits in the ratio 3:2. They admit C for 1/4th share. C acquires his share from A and B in the ratio 2:1.',
            steps: [
            { text: 'Convert old ratio to fractions. Total parts = 3+2=5. A\'s old share = 3/5, B\'s old share = 2/5.' },
            { text: 'Determine C\'s share = 1/4. The remaining share for A and B = 1 - 1/4 = 3/4.' },
            { text: 'C acquires 2/3 of his share from A and 1/3 from B. So A\'s sacrifice = 2/3 × 1/4 = 2/12 = 1/6.' },
            { text: 'Compute new shares: A\'s new share = 3/5 - 1/6 = (18/30 - 5/30) = 13/30.' },
            { text: 'Convert to common denominator (LCM of 30,60,60 = 60). A = 26/60, B = 19/60, C = 15/60. New ratio = 26:19:15.', faded: true, blankAnswer: 'New Profit Sharing Ratio = 26:19:15; Sacrificing Ratio = 2:1' }
            ] } }
    ],
    explore: { component: C12_AccountancyRetirementPartnerGainingSim, prompt: 'Explore the interactive — New Profit Sharing Ratio and Gaining Ratio on Retirement of a Partner' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_001', difficulty: 'standard',
          question: 'When a partner retires from a partnership firm, the continuing partners acquire.',
          hint: 'Revisit c8_math_ch10_005 (Sharing Quantities in a Given Ratio) and c8_math_ch10_006.',
          misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.',
          parts: [
                { id: 'a', prompt: 'P, Q, and R are partners sharing profits in the ratio 4:3:3. R retires. P and Q agree to acquire R\'s share in the ratio 2:1.', answer: '**Correct Answer with Steps:** Step 1: Old ratio = 4:3:3 → Total = 10 parts',
                  options: ['**Correct Answer with Steps:** Step 1: Old ratio = 4:3:3 → Total = 10 parts', 'Gaining Ratio = 3:2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.' },
                { id: 'b', prompt: 'X, Y, Z share profits 1/2, 1/3, 1/6. Z retires. X and Y agree to share future profits equally. A student calculates gaining ratio as 1:1.', answer: '**Correct Answer:** The student is WRONG',
                  options: ['**Correct Answer:** The student is WRONG', 'equal new sharing', 'equal gaining'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.' }
          ],
            remediations: { 'specific-error-students-treat-new': { steps: ['Make them write the definition of each ratio side by side: "New Ratio = How profits shared AFTER retirement.', 'Give 3 mini-problems: (a) Old 5:3:2, new 3:2 → compute gain; (b) Old 4:3:3, gaining 2:1 → compute new; (c) Old.', 'Ask them to articulate in one sentence: "Gaining ratio is the *input* (agreement) or *output* (new minus old), but.', 'Re-test with a CUET-style MCQ where gaining ratio is given as 3:1 but new ratio options include 3:1 as a distractor.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.',
          parts: [
                { id: 'a', prompt: 'In a partnership, the retiring partner\'s share is acquired by continuing partners in their gaining ratio.', answer: '**Correct Answer:** The statement is FALSE',
                  options: ['**Correct Answer:** The statement is FALSE', 'Gaining Ratio = 3:2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.' },
                { id: 'b', prompt: 'Create a retirement scenario with 4 partners where two partners retire simultaneously.', answer: '**Sample Answer:** Old ratio: W:X:Y:Z = 4:3:2:1 (total 10)',
                  options: ['**Sample Answer:** Old ratio: W:X:Y:Z = 4:3:2:1 (total 10)', 'Gaining Ratio = 3:2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.' },
                { id: 'c', prompt: 'X, Y, Z share profits 1/2, 1/3, 1/6. Z retires. X and Y agree to share future profits equally. A student calculates gaining ratio as 1:1.', answer: '**Correct Answer:** The student is WRONG',
                  options: ['**Correct Answer:** The student is WRONG', 'equal new sharing', 'equal gaining', 'Gaining Ratio = 3:2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.' }
          ],
            remediations: { 'specific-error-students-treat-new': { steps: ['Make them write the definition of each ratio side by side: "New Ratio = How profits shared AFTER retirement.', 'Give 3 mini-problems: (a) Old 5:3:2, new 3:2 → compute gain; (b) Old 4:3:3, gaining 2:1 → compute new; (c) Old.', 'Ask them to articulate in one sentence: "Gaining ratio is the *input* (agreement) or *output* (new minus old), but.', 'Re-test with a CUET-style MCQ where gaining ratio is given as 3:1 but new ratio options include 3:1 as a distractor.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_002', difficulty: 'standard',
          question: 'Treatment of Goodwill on Retirement of a Partner refers to the accounting.',
          hint: 'If stuck, revisit the gaining ratio derivation in c12_acc_cbse_03_001 and practice with.',
          misconception: 'Students often believe that goodwill adjustment on retirement is done in the **new profit-sharing ratio** of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Treatment of Goodwill on Retirement of a Partner refers to the accounting process of',
                  options: ['Treatment of Goodwill on Retirement of a Partner refers to the accounting process of', 'When a partner retires from a partnership firm, the continuing partners acquire the', 'Revaluation Account is a nominal account prepared at the time of retirement (or', 'Adjustment of Accumulated Profits and Reserves on Retirement refers to the process of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that goodwill adjustment on retirement is done in the **new profit-sharing ratio** of the continuing partners.' }
          ],
            remediations: { 'goodwill-adjustment-on-retirement-is': { steps: ['Revisit **c12_acc_cbse_03_001** (New Profit Sharing Ratio and Gaining Ratio on Retirement) to master gaining ratio.', 'Practice 5 problems where old ratio, new ratio, and gaining ratio differ — compute each explicitly.', 'Use a table: Partner | Old Share | New Share | Gain = New−Old.', 'Re-attempt Diagnostic Question 5 after this drill.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_003', difficulty: 'standard',
          question: 'Revaluation Account is a nominal account prepared at the time of retirement (or.',
          hint: 'If stuck on whether to debit/credit Revaluation Account, revisit **c11_acc_cbse_03_004**.',
          misconception: '**Misconception:** "Revaluation Account and Realisation Account are the same because both record asset/liability value.',
          parts: [
                { id: 'a', prompt: 'Compare Revaluation Account (retirement) and Realisation Account (dissolution) on **three** distinct points: (i) purpose, (ii) treatment of unrecorded.', answer: '| Basis | Revaluation Account (Retirement) | Realisation Account (Dissolution) |',
                  options: ['| Basis | Revaluation Account (Retirement) | Realisation Account (Dissolution) |', 'both use old ratio', 'retiring partner'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Revaluation Account and Realisation Account are the same because both record asset/liability value changes." **Why it\'s.' }
          ],
            remediations: { 'misconception-revaluation-account-and-realisatio': { steps: ['** Revisit **c12_acc_cbse_03_001** (New Profit Sharing Ratio) to recall the difference between old and new ratios. **', '** Re-read the Revaluation Account format in NCERT Chapter 3 (Retirement) — note the debit side: "Decrease in asset.', '** Do a 15-minute drill: take a simple Balance Sheet (Land, Building, Stock, Creditors), apply 3 revaluation.', '** Self-check: Did you credit unrecorded asset? Did you use old ratio? If any "No", repeat Step 3 with a new problem.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Revaluation Account and Realisation Account are the same because both record asset/liability value.',
          parts: [
                { id: 'a', prompt: 'Create a new Revaluation Account problem for a 3-partner firm (ratio 4:3:2) where Partner Z retires.', answer: '**Balance Sheet (extract):** Land ₹8,00,000',
                  options: ['**Balance Sheet (extract):** Land ₹8,00,000', 'assets/liabilities transferred', 'profit/loss transferred to capital'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Revaluation Account and Realisation Account are the same because both record asset/liability value changes." **Why it\'s.' },
                { id: 'b', prompt: 'Compare Revaluation Account (retirement) and Realisation Account (dissolution) on **three** distinct points: (i) purpose, (ii) treatment of unrecorded.', answer: '| Basis | Revaluation Account (Retirement) | Realisation Account (Dissolution) |',
                  options: ['| Basis | Revaluation Account (Retirement) | Realisation Account (Dissolution) |', 'both use old ratio', 'retiring partner', 'assets/liabilities transferred'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Revaluation Account and Realisation Account are the same because both record asset/liability value changes." **Why it\'s.' }
          ],
            remediations: { 'misconception-revaluation-account-and-realisatio': { steps: ['** Revisit **c12_acc_cbse_03_001** (New Profit Sharing Ratio) to recall the difference between old and new ratios. **', '** Re-read the Revaluation Account format in NCERT Chapter 3 (Retirement) — note the debit side: "Decrease in asset.', '** Do a 15-minute drill: take a simple Balance Sheet (Land, Building, Stock, Creditors), apply 3 revaluation.', '** Self-check: Did you credit unrecorded asset? Did you use old ratio? If any "No", repeat Step 3 with a new problem.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_004', difficulty: 'standard',
          question: 'Adjustment of Accumulated Profits and Reserves on Retirement refers to the.',
          hint: 'If stuck, revisit **c11_acc_cbse_07_010** (Reserves: Meaning and Types) and.',
          misconception: '**Misconception:** "All reserves on the liability side of the Balance Sheet are transferred to partners\' capital.',
          parts: [
                { id: 'a', prompt: 'A firm has a General Reserve of ₹50,000 and Profit & Loss Account (Cr.) of ₹20,000 on the date of retirement of partner X.', answer: '**Correct Answer:** General Reserve A/c Dr',
                  options: ['**Correct Answer:** General Reserve A/c Dr', 'only continuing partners matter now', '"only continuing partners matter now'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "All reserves on the liability side of the Balance Sheet are transferred to partners\' capital accounts in the **new.' },
                { id: 'b', prompt: 'Compare and contrast the treatment of **General Reserve** and **Investment Fluctuation Fund (IFF)** on retirement of a partner.', answer: '**Correct Answer:** **General Reserve** is a free reserve created from profits',
                  options: ['**Correct Answer:** **General Reserve** is a free reserve created from profits', 'IFF is always credited like General Reserve', 'deficit is debited to Revaluation Account'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "All reserves on the liability side of the Balance Sheet are transferred to partners\' capital accounts in the **new.' }
          ],
            remediations: { 'misconception-all-reserves-on-the': { steps: ['Revisit **c11_acc_cbse_07_010** (Reserves: Meaning and Types) to distinguish free reserves (General Reserve,.', 'Revisit **c12_acc_cbse_03_001** (New Profit Sharing Ratio and Gaining Ratio) to clearly list: Old Ratio, New Ratio,.', 'Practice **one multi-reserve problem daily for 3 days** from NCERT Illustrations 3, 4, 5 (Chapter 3) — focus on WCR and.', 'Re-diagnostic: Solve Diagnostic Question 3 again without notes.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "All reserves on the liability side of the Balance Sheet are transferred to partners\' capital.',
          parts: [
                { id: 'a', prompt: 'A student argues: "On retirement, the retiring partner should get his share of accumulated profits in the **new profit sharing ratio** of the continuing.', answer: '**Correct Answer with Justification:** The argument is **incorrect**',
                  options: ['**Correct Answer with Justification:** The argument is **incorrect**', 'only continuing partners matter now', '"only continuing partners matter now'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "All reserves on the liability side of the Balance Sheet are transferred to partners\' capital accounts in the **new.' },
                { id: 'b', prompt: 'Create a new problem: A firm has three partners A, B, C sharing profits 5:3:2. C retires.', answer: '**Expected Answer / Criteria:** The student must: 1',
                  options: ['**Expected Answer / Criteria:** The student must: 1', 'only continuing partners matter now', '"only continuing partners matter now'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "All reserves on the liability side of the Balance Sheet are transferred to partners\' capital accounts in the **new.' },
                { id: 'c', prompt: 'Compare and contrast the treatment of **General Reserve** and **Investment Fluctuation Fund (IFF)** on retirement of a partner.', answer: '**Correct Answer:** **General Reserve** is a free reserve created from profits',
                  options: ['**Correct Answer:** **General Reserve** is a free reserve created from profits', 'IFF is always credited like General Reserve', 'deficit is debited to Revaluation Account', 'only continuing partners matter now'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "All reserves on the liability side of the Balance Sheet are transferred to partners\' capital accounts in the **new.' }
          ],
            remediations: { 'misconception-all-reserves-on-the': { steps: ['Revisit **c11_acc_cbse_07_010** (Reserves: Meaning and Types) to distinguish free reserves (General Reserve,.', 'Revisit **c12_acc_cbse_03_001** (New Profit Sharing Ratio and Gaining Ratio) to clearly list: Old Ratio, New Ratio,.', 'Practice **one multi-reserve problem daily for 3 days** from NCERT Illustrations 3, 4, 5 (Chapter 3) — focus on WCR and.', 'Re-diagnostic: Solve Diagnostic Question 3 again without notes.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_009', difficulty: 'standard',
          question: 'The Deceased Partner\'s Capital Account is a ledger account that aggregates all.',
          hint: 'If stuck on any adjustment item, revisit the specific prerequisite node: profit share →.',
          misconception: 'Students consistently treat the Joint Life Policy (JLP) proceeds as fully creditable to the deceased partner\'s capital.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Deceased Partner\'s Capital Account is a ledger account that aggregates all claims of',
                  options: ['The Deceased Partner\'s Capital Account is a ledger account that aggregates all claims of', 'When a partner retires from a partnership firm, the continuing partners acquire the', 'Treatment of Goodwill on Retirement of a Partner refers to the accounting process of', 'Revaluation Account is a nominal account prepared at the time of retirement (or'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently treat the Joint Life Policy (JLP) proceeds as fully creditable to the deceased partner\'s capital account regardless.' }
          ],
            remediations: { 'students-consistently-treat-the-joint': { steps: ['If the student cannot distinguish JLP treatments: (1) Make them write the three JLP accounting policies side-by-side:.', '(2) For each, trace the journal entries on death: receipt of claim, transfer to Realisation/Capital.', '(3) Give a mini-case: SV ₹60,000, SA ₹1,50,000, ratio 2:1.', 'Ask: "How much does deceased get in each policy?" (Answer: (a) ₹60,000 × share; (b) ₹1,50,000 × share; (c) ₹1,50,000 ×.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_001', difficulty: 'standard',
          question: 'The **New Profit Sharing Ratio (NPSR)** is the ratio in which all partners.',
          hint: 'If stuck, revisit Class 7 Math fraction operations (c7_math_ch08_001 to c7_math_ch08_010).',
          misconception: '**Misconception:** "Sacrificing Ratio is always the same as the Old Profit Sharing Ratio." **Why it\'s wrong:** This is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The **New Profit Sharing Ratio (NPSR)** is the ratio in',
                  options: ['The **New Profit Sharing Ratio (NPSR)** is the ratio in', 'When a partner retires from a partnership firm, the continuing partners acquire the', 'Treatment of Goodwill on Retirement of a Partner refers to the accounting process of', 'Revaluation Account is a nominal account prepared at the time of retirement (or'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Sacrificing Ratio is always the same as the Old Profit Sharing Ratio." **Why it\'s wrong:** This is true ONLY when the.' }
          ],
            remediations: { 'misconception-sacrificing-ratio-is-always': { steps: ['Revisit **c11_acc_cbse_02_006** (Revenue Recognition and Matching) — no, that\'s not relevant.', 'Actually, the prerequisite is **Class 6 Math: Ratio and Proportion (c6_math_ch06_062 to c6_math_ch06_068)** and **Class.', 'Practice converting ratios to fractions with common denominators (LCM method).', 'Do 5 problems where the sacrificing ratio is explicitly different from old ratio (e.g., acquisition ratio given, or new.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
