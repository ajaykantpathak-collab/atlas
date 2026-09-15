import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch03_p1: SimDef = {
    id: 'v3_c12_acc_ch03_p1',
    title: 'Reconstitution of a Partnership Firm - Retirement/Death of a Partner · Part 1/2',
    subtitle: 'One partner exits — who gains his share, and who pays for his goodwill?',
    classLevel: 12, subject: 'accountancy', topic: 'Reconstitution of a Partnership Firm - Retirement/Death of a Partner · Part 1/2',
    chapters: ['c12_acc_ch03'],
    nodeIds: ['c12_acc_cbse_03_001', 'c12_acc_cbse_03_002', 'c12_acc_cbse_03_003', 'c12_acc_cbse_03_004', 'c12_acc_cbse_03_005', 'c12_acc_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Firm accountant managing a partner\'s exit', intro: 'When a partner leaves, the firm doesn\'t just lose a person — it silently redistributes every future rupee of profit.', goal: 'Compute gaining and new ratios and settle the retiring partner\'s goodwill through capital adjustments.' },
    discovery: {
        question: 'Chirag retires from a firm where Aryan, Bhavya and Chirag shared 3:2:1. The deed says nothing about who inherits his 1/6 share. What does the law assume?',
        options: ['The continuing partners gain in their old ratio — Aryan and Bhavya absorb it 3:2', 'The share is split equally between the two remaining partners', 'The share lapses — profits are now shared only between two, with no gain computed', 'The retiring partner chooses who inherits the share in his will'],
        answer: 'The continuing partners gain in their old ratio — Aryan and Bhavya absorb it 3:2',
        hook: 'Silence in the deed is itself an answer: absent an explicit deal, the gaining ratio defaults to the old ratio — and that default decides who funds the retiring partner\'s goodwill.',
    },
    teaching: [
        { title: 'New Profit Sharing Ratio and Gaining Ratio on Retirement of a Partner', text: 'When a partner retires from a partnership firm, the continuing partners acquire the retiring partner\'s share of profit in a specific ratio.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Handle a retirement end-to-end: compute the gaining ratio, compensate the outgoing partner\'s goodwill share through the gainers\' capital accounts, and restate the firm\'s future profit split.',
        labels: ['New Profit Sharing Ratio', 'Treatment of Goodwill', 'Revaluation of Assets', 'Adjustment of Accumulated Profits', 'Computation of Amount Due', 'Calculation of Deceased Partner\'s'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_03_001', title: 'New Profit Sharing Ratio and Gaining Ratio on Retirement of a Partner',
          scaffold: { problem: 'A, B, and C are partners sharing profits in the ratio 5:3:2. C retires. A and B agree to share future profits in the ratio 3:2.',
            steps: [
            { text: 'Convert old ratio to fractions. Total parts = 5+3+2 = 10. A\'s old share = 5/10, B\'s old share = 3/10, C\'s old share.' },
            { text: 'Convert new ratio to fractions. A and B new ratio = 3:2 → Total parts = 5. A\'s new share = 3/5, B\'s new share = 2/5.' },
            { text: 'Express new shares with denominator 10 for comparison. A\'s new share = 3/5 = 6/10. B\'s new share = 2/5 = 4/10.' },
            { text: 'Compute gain for each. Gain of A = New – Old = 6/10 – 5/10 = 1/10. Gain of B = 4/10 – 3/10 = 1/10.' },
            { text: 'Gaining ratio = Gain of A : Gain of B = 1/10 : 1/10 = 1:1.', faded: true, blankAnswer: 'Gaining Ratio = 1:1' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_03_003', title: 'Revaluation of Assets and Liabilities on Retirement: Revaluation Account',
          caseStudy: { intro: 'Imagine a partnership firm where Partner C retires after 10 years. The Balance Sheet shows Land at ₹5,00,000 (purchased 8 years ago) and Stock at ₹2,00,000.',
            decisions: [{ prompt: 'A student writes: "On retirement, revaluation profit is shared by continuing partners in their new profit sharing ratio." Is this statement.', options: [
                { text: '**No.** Revaluation profit/loss is shared by **all partners including the retiring', outcome: '**No.** Revaluation profit/loss is shared by **all partners including the retiring partner**.' },
                { text: 'new ratio', outcome: 'Not quite — **Misconception:** "Revaluation Account and Realisation Account are the same because both record.', reveals: 'misconception-revaluation-account-and-realisatio' },
                { text: 'assets/liabilities transferred', outcome: 'Not quite — **Misconception:** "Revaluation Account and Realisation Account are the same because both record.', reveals: 'misconception-revaluation-account-and-realisatio' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_03_004', title: 'Adjustment of Accumulated Profits and Reserves on Retirement',
          caseStudy: { intro: 'Imagine a partnership firm where three friends — A, B, and C — have been running a business for five years.',
            decisions: [{ prompt: 'A firm has a General Reserve of ₹50,000 and Profit & Loss Account (Cr.) of ₹20,000 on the date of retirement of partner X.', options: [
                { text: '**Correct Answer:** General Reserve A/c Dr', outcome: '**Correct Answer:** General Reserve A/c Dr. 50,000 Profit & Loss A/c Dr.' },
                { text: 'only continuing partners matter now', outcome: 'Not quite — **Misconception:** "All reserves on the liability side of the Balance Sheet are transferred.', reveals: 'misconception-all-reserves-on-the' },
                { text: '"only continuing partners matter now', outcome: 'Not quite — **Misconception:** "All reserves on the liability side of the Balance Sheet are transferred.', reveals: 'misconception-all-reserves-on-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_03_005', title: 'Computation of Amount Due to Retiring Partner and Settlement Modes',
          scaffold: { problem: 'A, B, and C are partners sharing profits 5:3:2. C retires on 31st March 2024. On that date, C\'s Capital Account shows ₹2,00,000 (credit).',
            steps: [
            { text: 'Identify C\'s share in old ratio = 2/10 = 1/5. Gaining ratio of A and B = 5:3.' },
            { text: 'Compute adjustments for C:' },
            { text: 'Prepare C\'s Capital Account:' },
            { text: 'Goodwill adjustment entry (without raising goodwill):' },
            { text: 'Verify: Amount due to C = ₹2,33,000.', faded: true, blankAnswer: 'Amount due to C = ₹2,33,000. Goodwill adjustment: A\'s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_03_006', title: 'Calculation of Deceased Partner\'s Share of Profit up to Date of Death',
          scaffold: { problem: 'A, B, C share profits 3:2:1. C dies on 31st July 2024. Accounting year ends 31st March. Last year\'s profit ₹12,00,000.',
            steps: [
            { text: 'Identify Base Profit = ₹12,00,000 (last year\'s profit as per deed).' },
            { text: 'Identify Profit Sharing Ratio of C = 1/6 (from 3:2:1).' },
            { text: 'Calculate Period = April to July = 4 months. Period Fraction = 4/12 = 1/3.' },
            { text: 'Compute Share = ₹12,00,000 × (4/12) × (1/6) = ₹12,00,000 × (1/3) × (1/6) = ₹66,667.' },
            { text: 'Journal Entry: Profit & Loss Suspense A/c Dr. ₹66,667 To C\'s Capital A/c ₹66,667 (Being profit share up to date.', faded: true, blankAnswer: 'C\'s Profit Share = ₹66,667. Journal: Profit & Loss Suspense.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student-run print shop has three partners sharing 5:3:2. The third partner retires and the other two agree to share future profits 3:2. The junior accountant adjusts the retiring partner\'s ₹12,000 goodwill share by debiting the continuing partners in 3:2.',
            decisions: [{ prompt: 'Is the goodwill split right?', options: [
                { text: 'No — goodwill is compensated in the gaining ratio (new share minus old share): A gains 6/10−5/10=1/10 and B gains 4/10−3/10=1/10, so it\'s 1:1, i.e. ₹6,000 each.', outcome: 'The gaining ratio is derived from how much each continuing partner\'s share rose, not from the new profit-sharing ratio itself.' },
                { text: 'Yes — the new profit-sharing ratio 3:2 is the gaining ratio, so debit ₹7,200 and ₹4,800.', outcome: 'That confuses the new ratio with the gaining ratio — the classic board-exam trap; gains must be computed as New minus Old for each partner.', reveals: 'new-ratio-is-gaining-ratio' },
                { text: 'Split it equally anyway — retirement always means equal gains for continuing partners.', outcome: 'Equal gains happen here by coincidence of the numbers; the rule is gain = new share − old share, which is often unequal.', reveals: 'retirement-always-equal-gain' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Retirement is admission run in reverse — and you\'ve now mastered both directions. Boards love gaining-ratio puzzles; real practice hands you the same arithmetic with real money.',
            decisions: [{ prompt: 'What comes next? Reconstitution of a Partnership Firm - Retirement/Death of a Partner · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Reconstitution of a Partnership Firm - Retirement/Death of a Partner · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_001', difficulty: 'standard',
          question: 'When a partner retires from a partnership firm, the continuing partners acquire.',
          hint: 'Revisit c8_math_ch10_005 (Sharing Quantities in a Given Ratio) and c8_math_ch10_006.',
          misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.',
          parts: [
                { id: 'a', prompt: 'P, Q, and R are partners sharing profits in the ratio 4:3:3. R retires. P and Q agree to acquire R\'s share in the ratio 2:1.', answer: '**Correct Answer with Steps:** Step 1: Old ratio = 4:3:3 → Total = 10 parts',
                  options: ['**Correct Answer with Steps:** Step 1: Old ratio = 4:3:3 → Total = 10 parts', 'Gaining Ratio = 3:2'],
                  hint: 'Revisit c8_math_ch10_005 (Sharing Quantities in a Given Ratio) and c8_math_ch10_006 (Direct.',
                  misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.' },
                { id: 'b', prompt: 'X, Y, Z share profits 1/2, 1/3, 1/6. Z retires. X and Y agree to share future profits equally. A student calculates gaining ratio as 1:1.', answer: '**Correct Answer:** The student is WRONG',
                  options: ['**Correct Answer:** The student is WRONG', 'equal new sharing', 'equal gaining', 'Gaining Ratio = 3:2'],
                  hint: 'Revisit c8_math_ch10_005 (Sharing Quantities in a Given Ratio) and c8_math_ch10_006 (Direct.',
                  misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.' }
          ],
            remediations: { 'specific-error-students-treat-new': { steps: ['Make them write the definition of each ratio side by side: "New Ratio = How profits shared AFTER retirement.', 'Give 3 mini-problems: (a) Old 5:3:2, new 3:2 → compute gain; (b) Old 4:3:3, gaining 2:1 → compute new; (c) Old.', 'Ask them to articulate in one sentence: "Gaining ratio is the *input* (agreement) or *output* (new minus old), but.', 'Re-test with a CUET-style MCQ where gaining ratio is given as 3:1 but new ratio options include 3:1 as a distractor.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.',
          parts: [
                { id: 'a', prompt: 'In a partnership, the retiring partner\'s share is acquired by continuing partners in their gaining ratio.', answer: '**Correct Answer:** The statement is FALSE',
                  options: ['**Correct Answer:** The statement is FALSE', 'Gaining Ratio = 3:2'],
                  hint: 'Revisit c8_math_ch10_005 (Sharing Quantities in a Given Ratio) and c8_math_ch10_006 (Direct.',
                  misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.' },
                { id: 'b', prompt: 'Create a retirement scenario with 4 partners where two partners retire simultaneously.', answer: '**Sample Answer:** Old ratio: W:X:Y:Z = 4:3:2:1 (total 10)',
                  options: ['**Sample Answer:** Old ratio: W:X:Y:Z = 4:3:2:1 (total 10)', 'Gaining Ratio = 3:2'],
                  hint: 'Revisit c8_math_ch10_005 (Sharing Quantities in a Given Ratio) and c8_math_ch10_006 (Direct.',
                  misconception: '**Specific Error:** Students treat "New Profit Sharing Ratio" and "Gaining Ratio" as interchangeable terms.' }
          ],
            remediations: { 'specific-error-students-treat-new': { steps: ['Make them write the definition of each ratio side by side: "New Ratio = How profits shared AFTER retirement.', 'Give 3 mini-problems: (a) Old 5:3:2, new 3:2 → compute gain; (b) Old 4:3:3, gaining 2:1 → compute new; (c) Old.', 'Ask them to articulate in one sentence: "Gaining ratio is the *input* (agreement) or *output* (new minus old), but.', 'Re-test with a CUET-style MCQ where gaining ratio is given as 3:1 but new ratio options include 3:1 as a distractor.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_002', difficulty: 'standard',
          question: 'Treatment of Goodwill on Retirement of a Partner refers to the accounting.',
          hint: 'If stuck, revisit the gaining ratio derivation in c12_acc_cbse_03_001 and practice with.',
          misconception: 'Students often believe that goodwill adjustment on retirement is done in the **new profit-sharing ratio** of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Treatment of Goodwill on Retirement of a Partner refers to the accounting process of',
                  options: ['Treatment of Goodwill on Retirement of a Partner refers to the accounting process of', 'When a partner retires from a partnership firm, the continuing partners acquire the', 'Revaluation Account is a nominal account prepared at the time of retirement (or', 'Adjustment of Accumulated Profits and Reserves on Retirement refers to the process of'],
                  hint: 'If stuck, revisit the gaining ratio derivation in c12_acc_cbse_03_001 and practice with 3-partner.',
                  misconception: 'Students often believe that goodwill adjustment on retirement is done in the **new profit-sharing ratio** of the continuing partners.' }
          ],
            remediations: { 'goodwill-adjustment-on-retirement-is': { steps: ['Revisit **c12_acc_cbse_03_001** (New Profit Sharing Ratio and Gaining Ratio on Retirement) to master gaining ratio.', 'Practice 5 problems where old ratio, new ratio, and gaining ratio differ — compute each explicitly.', 'Use a table: Partner | Old Share | New Share | Gain = New−Old.', 'Re-attempt Diagnostic Question 5 after this drill.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_003', difficulty: 'standard',
          question: 'Revaluation Account is a nominal account prepared at the time of retirement (or.',
          hint: 'If stuck on whether to debit/credit Revaluation Account, revisit **c11_acc_cbse_03_004**.',
          misconception: '**Misconception:** "Revaluation Account and Realisation Account are the same because both record asset/liability value.',
          parts: [
                { id: 'a', prompt: 'Compare Revaluation Account (retirement) and Realisation Account (dissolution) on **three** distinct points: (i) purpose, (ii) treatment of unrecorded.', answer: '| Basis | Revaluation Account (Retirement) | Realisation Account (Dissolution) |',
                  options: ['| Basis | Revaluation Account (Retirement) | Realisation Account (Dissolution) |', 'both use old ratio', 'retiring partner', 'assets/liabilities transferred'],
                  hint: 'If stuck on whether to debit/credit Revaluation Account, revisit **c11_acc_cbse_03_004** (Rules.',
                  misconception: '**Misconception:** "Revaluation Account and Realisation Account are the same because both record asset/liability value changes." **Why it\'s.' }
          ],
            remediations: { 'misconception-revaluation-account-and-realisatio': { steps: ['** Revisit **c12_acc_cbse_03_001** (New Profit Sharing Ratio) to recall the difference between old and new ratios. **', '** Re-read the Revaluation Account format in NCERT Chapter 3 (Retirement) — note the debit side: "Decrease in asset.', '** Do a 15-minute drill: take a simple Balance Sheet (Land, Building, Stock, Creditors), apply 3 revaluation.', '** Self-check: Did you credit unrecorded asset? Did you use old ratio? If any "No", repeat Step 3 with a new problem.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_004', difficulty: 'standard',
          question: 'Adjustment of Accumulated Profits and Reserves on Retirement refers to the.',
          hint: 'If stuck, revisit **c11_acc_cbse_07_010** (Reserves: Meaning and Types) and.',
          misconception: '**Misconception:** "All reserves on the liability side of the Balance Sheet are transferred to partners\' capital.',
          parts: [
                { id: 'a', prompt: 'A firm has a General Reserve of ₹50,000 and Profit & Loss Account (Cr.) of ₹20,000 on the date of retirement of partner X.', answer: '**Correct Answer:** General Reserve A/c Dr',
                  options: ['**Correct Answer:** General Reserve A/c Dr', 'only continuing partners matter now', '"only continuing partners matter now'],
                  hint: 'If stuck, revisit **c11_acc_cbse_07_010** (Reserves: Meaning and Types) and **c12_acc_cbse_03_001**.',
                  misconception: '**Misconception:** "All reserves on the liability side of the Balance Sheet are transferred to partners\' capital accounts in the **new.' },
                { id: 'b', prompt: 'Compare and contrast the treatment of **General Reserve** and **Investment Fluctuation Fund (IFF)** on retirement of a partner.', answer: '**Correct Answer:** **General Reserve** is a free reserve created from profits',
                  options: ['**Correct Answer:** **General Reserve** is a free reserve created from profits', 'IFF is always credited like General Reserve', 'deficit is debited to Revaluation Account', 'only continuing partners matter now'],
                  hint: 'If stuck, revisit **c11_acc_cbse_07_010** (Reserves: Meaning and Types) and **c12_acc_cbse_03_001**.',
                  misconception: '**Misconception:** "All reserves on the liability side of the Balance Sheet are transferred to partners\' capital accounts in the **new.' }
          ],
            remediations: { 'misconception-all-reserves-on-the': { steps: ['Revisit **c11_acc_cbse_07_010** (Reserves: Meaning and Types) to distinguish free reserves (General Reserve.', 'Revisit **c12_acc_cbse_03_001** (New Profit Sharing Ratio and Gaining Ratio) to clearly list: Old Ratio, New Ratio.', 'Practice **one multi-reserve problem daily for 3 days** from NCERT Illustrations 3, 4, 5 (Chapter 3) — focus on WCR and.', 'Re-diagnostic: Solve Diagnostic Question 3 again without notes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_005', difficulty: 'standard',
          question: 'The amount due to a retiring partner is the final settlement figure.',
          hint: 'If stuck, revisit **c12_acc_cbse_03_002** (goodwill adjustment without raising).',
          misconception: 'Students often believe that the "amount due to retiring partner" is simply the credit balance in his capital account.',
          parts: [
                { id: 'a', prompt: 'P, Q, and R share profits 3:2:1. R retires. Goodwill is valued at ₹60,000.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'amount due to retiring partner'],
                  hint: 'If stuck, revisit **c12_acc_cbse_03_002** (goodwill adjustment without raising).',
                  misconception: 'Students often believe that the "amount due to retiring partner" is simply the credit balance in his capital account *before* any.' },
                { id: 'b', prompt: 'Compare the accounting treatment when the retiring partner is paid (a) entirely in cash, (b) partly in cash and partly by transferring a fixed asset at book.', answer: 'entirely in cash, (',
                  options: ['entirely in cash, (', 'amount due to retiring partner'],
                  hint: 'If stuck, revisit **c12_acc_cbse_03_002** (goodwill adjustment without raising).',
                  misconception: 'Students often believe that the "amount due to retiring partner" is simply the credit balance in his capital account *before* any.' }
          ],
            remediations: { 'the-amount-due-to-retiring': { steps: ['If a student cannot compute the correct amount due: 1.', 'Have them re-do node **c12_acc_cbse_03_002** (Goodwill treatment) — focus on "goodwill not raised" adjustment using.', 'Then **c12_acc_cbse_03_003** (Revaluation) — practice posting revaluation profit/loss to old partners\' capital accounts.', 'Then **c12_acc_cbse_03_004** (Accumulated profits/reserves) — ensure they distribute in old ratio.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_006', difficulty: 'standard',
          question: 'The deceased partner\'s share of profit up to the date of death is the portion.',
          hint: 'Revisit c11_acc_cbse_08_004 (Net Profit calculation) and c11_bs_cbse_02_005 (Partnership.',
          misconception: 'Students often debit **Profit & Loss Appropriation Account** instead of **Profit & Loss Suspense Account** when.',
          parts: [
                { id: 'a', prompt: 'The partnership deed is silent on how to calculate profit share for a deceased partner.', answer: 'Correct answer: Average profit of ₹3,00,000 (₹9,00,000/3) should be used',
                  options: ['Correct answer: Average profit of ₹3,00,000 (₹9,00,000/3) should be used', 'silent deed with multiple years\' data'],
                  hint: 'Revisit c11_acc_cbse_08_004 (Net Profit calculation) and c11_bs_cbse_02_005 (Partnership Deed.',
                  misconception: 'Students often debit **Profit & Loss Appropriation Account** instead of **Profit & Loss Suspense Account** when recording the deceased.' },
                { id: 'b', prompt: 'Compare two scenarios: (A) Deed specifies "profit share based on last year\'s profit". (B) Deed is silent, last 3 years\' profits given.', answer: 'Scenario B (silent deed) is more disputable',
                  options: ['Scenario B (silent deed) is more disputable', 'A is more disputable'],
                  hint: 'Revisit c11_acc_cbse_08_004 (Net Profit calculation) and c11_bs_cbse_02_005 (Partnership Deed.',
                  misconception: 'Students often debit **Profit & Loss Appropriation Account** instead of **Profit & Loss Suspense Account** when recording the deceased.' }
          ],
            remediations: { 'students-often-debit-profit-loss': { steps: ['If the student debits P&L Appropriation: (1) Ask: "Is the final profit for the year known on the date of death?" (No).', '(2) Show the timeline: Death → Interim entry (P&L Suspense) → Year-end → Final P&L → Transfer from Suspense.', '(3) Make them re-do 3 journal entries from NCERT Illustrations 12-14 (Chapter 4) where P&L Suspense is used.', '(4) Re-diagnostic: Give a death-on-15th-October problem and ask for the journal entry — check for "P&L Suspense A/c Dr."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
