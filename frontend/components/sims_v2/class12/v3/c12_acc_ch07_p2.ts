import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch07_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch07_p2: SimDef = {
    id: 'v3_c12_acc_ch07_p2',
    title: 'Financial Statements of a Company · Part 2/2',
    subtitle: 'Why does every Indian company\'s Balance Sheet look exactly the same?',
    classLevel: 12, subject: 'accountancy', topic: 'Financial Statements of a Company · Part 2/2',
    chapters: ['c12_acc_ch07'],
    nodeIds: ['c12_acc_cbse_07_007', 'c12_acc_cbse_07_008', 'c12_acc_cbse_07_009', 'c12_acc_cbse_07_010', 'c12_acc_cbse_07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Reporting accountant preparing statutory statements', intro: 'A company\'s financial statements aren\'t just records — they\'re a regulated language every business must speak identically.', goal: 'Apply Schedule III classification to prepare a compliant company Balance Sheet.' },
    discovery: {
        question: 'You open the annual reports of Reliance, TCS and a small unlisted company — and find the Balance Sheet laid out identically in all three. Who forces this uniformity?',
        options: ['Schedule III of the Companies Act, 2013 — one prescribed format for every company', 'The company\'s auditor chooses the layout each year', 'SEBI dictates formats only to listed companies; others are free', 'Each board of directors designs its own Balance Sheet'],
        answer: 'Schedule III of the Companies Act, 2013 — one prescribed format for every company',
        hook: 'It feels like coincidence or convention — it\'s actually law. Schedule III standardises classification (current vs non-current, shareholders\' funds vs liabilities) so any investor can compare any two companies.',
    },
    teaching: [
        { title: 'Live Stock, Loose Tools and Patent Rights in Balance Sheet', text: 'Live Stock, Loose Tools, and Patent Rights are specific assets that require distinct classification and presentation in a company\'s Balance Sheet as per Schedule III of the Companies Act, 2013.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Build a company\'s Balance Sheet the Schedule III way: order the Equity & Liabilities blocks, split every item into current and non-current, and explain why the format exists at all.',
        labels: ['Live Stock, Loose Tools', 'Managerial Remuneration and its', 'Provisions and Reserves: Distinction', 'Preparation of Statement', 'Preparation of Balance Sheet'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_07_008', title: 'Managerial Remuneration and its Treatment in Financial Statements',
          scaffold: { problem: 'Apex Technologies Ltd. earned a Profit Before Tax of ₹2,50,00,000 for the year ended 31st March 2024.',
            steps: [
            { text: 'Calculate Net Profit under Section 198 = Profit Before Tax + Depreciation on Revaluation - Profit on Sale of Fixed.' },
            { text: 'Determine overall cap = 11% of Section 198 Net Profit = 11% × ₹2,57,00,000 = ₹28,27,000' },
            { text: 'Determine individual cap for MD = 5% of Section 198 Net Profit = 5% × ₹2,57,00,000 = ₹12,85,000' },
            { text: 'Determine individual cap for each WTD = 5% of Section 198 Net Profit = ₹12,85,000 each' },
            { text: 'Verify total proposed remuneration does not exceed overall cap of ₹28,27,000.', faded: true, blankAnswer: 'Maximum overall managerial remuneration = ₹28,27,000.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_07_009', title: 'Provisions and Reserves: Distinction and Disclosure Requirements',
          caseStudy: { intro: 'Imagine you are reviewing the Balance Sheet of a company and see "Provision for Taxation ₹5,00,000" under Current Liabilities and "General Reserve ₹20,00,000".',
            decisions: [{ prompt: 'State the fundamental difference between a provision and a reserve in one sentence.', options: [
                { text: 'A provision is a charge against profit to meet a known liability of uncertain', outcome: 'A provision is a charge against profit to meet a known liability of uncertain amount/timing, while.' },
                { text: 'both are the same', outcome: 'Not quite — Students often think "Provision for Depreciation" is a provision in the same sense as "Provision.', reveals: 'provision-for-depreciation-is-a' },
                { text: 'reserve is for liability', outcome: 'Not quite — Students often think "Provision for Depreciation" is a provision in the same sense as "Provision.', reveals: 'provision-for-depreciation-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_07_010', title: 'Preparation of Statement of Profit and Loss with Adjustments',
          caseStudy: { intro: 'Imagine you\'re an accountant at "Mumbai Textiles Ltd." and the trial balance shows Rent Expense ₹2,40,000, but the rent agreement says ₹20,000/month and.',
            decisions: [{ prompt: 'A company\'s trial balance shows "Salaries" ₹6,00,000. Additional information: "Salaries for March ₹50,000 are unpaid." What is the correct.', options: [
                { text: '₹6,50,000', outcome: '₹6,50,000. The trial balance shows salaries paid for 11 months (₹6,00,000).' },
                { text: 'Depreciation and Amortisation Expense', outcome: 'Not quite — **Misconception:** "Adjustments only affect the Balance Sheet; the P&L just takes the trial balance.', reveals: 'misconception-adjustments-only-affect-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_07_011', title: 'Preparation of Balance Sheet as per Schedule III with Adjustments',
          caseStudy: { intro: 'Imagine you are an accountant at "Surya Textiles Ltd." on 31st March.',
            decisions: [{ prompt: 'What are the two main heads under "Equity and Liabilities" in a Schedule III Balance Sheet, and which sub-heads fall under each?', options: [
                { text: 'The two main heads are (1) Shareholders\' Funds (sub-heads: Share Capital, Reserves &', outcome: 'The two main heads are (1) Shareholders\' Funds (sub-heads: Share Capital, Reserves & Surplus, Money.' },
                { text: 'Trade Payables', outcome: 'Not quite — **Misconception:** "Adjustments like outstanding expenses, prepaid expenses, accrued income, and.', reveals: 'misconception-adjustments-like-outstanding-expen' },
                { text: 'Reserves & Surplus', outcome: 'Not quite — **Misconception:** "Adjustments like outstanding expenses, prepaid expenses, accrued income, and.', reveals: 'misconception-adjustments-like-outstanding-expen' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a fintech internship, a student drafts the startup\'s first annual balance sheet in the old sole-proprietor style — horizontal layout, one merged \'Capital\' line. The founder waves it through: \'the totals match, that\'s what matters.\'',
            decisions: [{ prompt: 'Will this pass as the company\'s financial statements?', options: [
                { text: 'No — Section 129 read with Schedule III of the Companies Act, 2013 prescribes a vertical format with current/non-current splits and separate disclosure of share capital and each reserve; matching totals don\'t cure a wrong format.', outcome: 'Company statements are statutory documents for absentee shareholders, lenders and regulators — the mandated structure is what makes them comparable across firms.' },
                { text: 'Yes — a balance sheet is correct whenever assets equal liabilities plus capital, whatever the layout.', outcome: 'For a company, presentation is a legal requirement, not a style choice; aggregating \'Capital\' hides equity composition and liquidity.', reveals: 'format-optional-if-totals-match' },
                { text: 'Only add a Cash Flow Statement on top — the two Class 11-style statements plus cash flow make a complete set.', outcome: 'A complete set also needs the Statement of Changes in Equity and Notes to Accounts, all in Schedule III form — not just three proprietorship-era statements.', reveals: 'statements-are-just-two-plus-cashflow' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_07_011', title: 'You made it',
          caseStudy: { intro: 'You can now navigate any Indian company\'s annual report without a guide. Schedule III formats are direct board marks — and the skeleton key to real financial analysis.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_007', difficulty: 'standard',
          question: 'Live Stock, Loose Tools, and Patent Rights are specific assets that require.',
          hint: 'If stuck, revisit Class 11 node **c11_acc_cbse_08_007** (Balance Sheet: Assets.',
          misconception: 'Students often treat Live Stock as "Inventory" because it is biological and can be sold, or they treat Loose Tools.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Live Stock, Loose Tools, and Patent Rights are specific assets that require distinct',
                  options: ['Live Stock, Loose Tools, and Patent Rights are specific assets that require distinct', 'Financial Statements of a Company are the formal, structured summaries of a company\'s', 'The Balance Sheet of a Company as per Schedule III, Part I of the Companies Act 2013 is a', 'The Statement of Profit and Loss (as per Schedule III, Part II of the Companies Act,'],
                  hint: 'If stuck, revisit Class 11 node **c11_acc_cbse_08_007** (Balance Sheet: Assets Classification) and.',
                  misconception: 'Students often treat Live Stock as "Inventory" because it is biological and can be sold, or they treat Loose Tools as "Fixed Assets".' }
          ],
            remediations: { 'students-often-treat-live-stock': { steps: ['Revisit **c11_acc_cbse_08_007** (Asset Classification) to reinforce Fixed vs Current asset criteria.', 'Review **c12_acc_cbse_07_002** (Balance Sheet Format) to see the exact Schedule III line items.', 'Practice classifying 10 mixed items (e.g., "Dies", "Cows", "Software", "Spare Parts") into PPE, Intangible, Inventory.', 'Re-attempt Diagnostic Question 2 and 4; if still wrong, consult the teacher for a "decision tree" flowchart: Is it held.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_008', difficulty: 'standard',
          question: 'Managerial remuneration refers to the total compensation (salary, commission.',
          hint: 'If stuck, revisit c12_acc_cbse_07_003 (Statement of Profit and Loss Format) and.',
          misconception: 'Students believe "Managerial Remuneration" is a separate line item on the face of the Statement of Profit and Loss.',
          parts: [
                { id: 'a', prompt: 'XYZ Ltd. has a net profit of ₹80,00,000 calculated under Section 198. The company has one Managing Director and two Whole-time Directors.', answer: 'Step 1: MD max = 5% of ₹80L = ₹4,00,000',
                  options: ['Step 1: MD max = 5% of ₹80L = ₹4,00,000', 'yes, MD gets 5%', 'Managerial Remuneration', 'Finance Costs'],
                  hint: 'If stuck, revisit c12_acc_cbse_07_003 (Statement of Profit and Loss Format) and c11_acc_cbse_09_010.',
                  misconception: 'Students believe "Managerial Remuneration" is a separate line item on the face of the Statement of Profit and Loss (like "Finance Costs".' }
          ],
            remediations: { 'managerial-remuneration-is-a-separate': { steps: ['If the student cannot distinguish the Schedule III presentation: (1) Revisit c12_acc_cbse_07_003 (Statement of Profit.', '(2) Revisit c11_acc_cbse_08_004 (Profit and Loss Account Preparation) — see how salaries are grouped.', '(3) Practice: Take a trial balance with "MD Salary ₹20L, MD Commission ₹10L, Employee Salaries ₹50L" — prepare the.', '(4) Re-do Diagnostic Question 4 until the distinction is clear.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Managerial Remuneration" is a separate line item on the face of the Statement of Profit and Loss.',
          parts: [
                { id: 'a', prompt: 'A company pays ₹50 lakh as managerial remuneration but the Section 198 net profit allows only ₹35 lakh.', answer: 'This treatment is INCORRECT',
                  options: ['This treatment is INCORRECT', 'Advance to Director', 'Managerial Remuneration', 'Finance Costs'],
                  hint: 'If stuck, revisit c12_acc_cbse_07_003 (Statement of Profit and Loss Format) and c11_acc_cbse_09_010.',
                  misconception: 'Students believe "Managerial Remuneration" is a separate line item on the face of the Statement of Profit and Loss (like "Finance Costs".' },
                { id: 'b', prompt: 'Create a scenario where a company with ₹10 crore Section 198 net profit wants to pay maximum permissible remuneration to: (a) one Managing Director, (b) two.', answer: 'Scenario: Net profit (Sec 198) = ₹10 cr',
                  options: ['Scenario: Net profit (Sec 198) = ₹10 cr', 'Managerial Remuneration', 'Finance Costs', 'Depreciation'],
                  hint: 'If stuck, revisit c12_acc_cbse_07_003 (Statement of Profit and Loss Format) and c11_acc_cbse_09_010.',
                  misconception: 'Students believe "Managerial Remuneration" is a separate line item on the face of the Statement of Profit and Loss (like "Finance Costs".' }
          ],
            remediations: { 'managerial-remuneration-is-a-separate': { steps: ['If the student cannot distinguish the Schedule III presentation: (1) Revisit c12_acc_cbse_07_003 (Statement of Profit.', '(2) Revisit c11_acc_cbse_08_004 (Profit and Loss Account Preparation) — see how salaries are grouped.', '(3) Practice: Take a trial balance with "MD Salary ₹20L, MD Commission ₹10L, Employee Salaries ₹50L" — prepare the.', '(4) Re-do Diagnostic Question 4 until the distinction is clear.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_009', difficulty: 'standard',
          question: 'Provisions are amounts set aside from profits to meet known liabilities whose.',
          hint: 'Review the "Distinction between Provisions and Reserves" table in Class 11 NCERT (Chapter.',
          misconception: 'Students often think "Provision for Depreciation" is a provision in the same sense as "Provision for Doubtful Debts".',
          parts: [
                { id: 'a', prompt: 'State the fundamental difference between a provision and a reserve in one sentence.', answer: 'A provision is a charge against profit to meet a known liability of uncertain',
                  options: ['A provision is a charge against profit to meet a known liability of uncertain', 'both are the same', 'reserve is for liability', 'Provision for Depreciation'],
                  hint: 'Review the "Distinction between Provisions and Reserves" table in Class 11 NCERT (Chapter 7) and.',
                  misconception: 'Students often think "Provision for Depreciation" is a provision in the same sense as "Provision for Doubtful Debts" and show it as.' },
                { id: 'b', prompt: 'A company creates a "Provision for Warranty Claims" of ₹2,00,000.', answer: 'It is a charge against profit',
                  options: ['It is a charge against profit', 'Provision for Depreciation', 'Provision for Doubtful Debts', 'Reserve for Doubtful Debts'],
                  hint: 'Review the "Distinction between Provisions and Reserves" table in Class 11 NCERT (Chapter 7) and.',
                  misconception: 'Students often think "Provision for Depreciation" is a provision in the same sense as "Provision for Doubtful Debts" and show it as.' }
          ],
            remediations: { 'provision-for-depreciation-is-a': { steps: ['Revisit Class 11 nodes c11_acc_cbse_07_009 (Provisions: Meaning and Types) and c11_acc_cbse_07_010 (Reserves: Meaning.', 'appropriation distinction.', 'Review Schedule III format from node c12_acc_cbse_07_002 (Balance Sheet of a Company: Format as per Schedule III).', 'Do a classification drill: take 10 items (e.g., Provision for Tax, Capital Reserve, Securities Premium, Provision for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_010', difficulty: 'standard',
          question: 'Preparation of Statement of Profit and Loss with Adjustments is the process.',
          hint: 'If stuck, revisit `c11_acc_cbse_09_011` (Preparation of Adjusted Financial Statements.',
          misconception: '**Misconception:** "Adjustments only affect the Balance Sheet; the P&L just takes the trial balance figures." **Why.',
          parts: [
                { id: 'a', prompt: 'A company\'s trial balance shows "Salaries" ₹6,00,000. Additional information: "Salaries for March ₹50,000 are unpaid." What is the correct amount to be shown.', answer: '₹6,50,000',
                  options: ['₹6,50,000', 'Depreciation and Amortisation Expense'],
                  hint: 'If stuck, revisit `c11_acc_cbse_09_011` (Preparation of Adjusted Financial Statements with Multiple.',
                  misconception: '**Misconception:** "Adjustments only affect the Balance Sheet; the P&L just takes the trial balance figures." **Why it\'s wrong:** Every.' },
                { id: 'b', prompt: 'Trial balance shows: "Insurance Premium" ₹1,20,000 (paid for 12 months ending 30th June 2024). Financial year ends 31st March 2024.', answer: 'Insurance Expense (P&L) = ₹90,000 (9 months: April–December 2023)',
                  options: ['Insurance Expense (P&L) = ₹90,000 (9 months: April–December 2023)', 'Depreciation and Amortisation Expense'],
                  hint: 'If stuck, revisit `c11_acc_cbse_09_011` (Preparation of Adjusted Financial Statements with Multiple.',
                  misconception: '**Misconception:** "Adjustments only affect the Balance Sheet; the P&L just takes the trial balance figures." **Why it\'s wrong:** Every.' },
                { id: 'c', prompt: 'A company has Trade Receivables ₹10,00,000. Additional information: "Create a provision for doubtful debts @ 5% on debtors." The trial balance already shows.', answer: 'Required provision = 5% of ₹10,00,000 = ₹50,000',
                  options: ['Required provision = 5% of ₹10,00,000 = ₹50,000', 'Depreciation and Amortisation Expense'],
                  hint: 'If stuck, revisit `c11_acc_cbse_09_011` (Preparation of Adjusted Financial Statements with Multiple.',
                  misconception: '**Misconception:** "Adjustments only affect the Balance Sheet; the P&L just takes the trial balance figures." **Why it\'s wrong:** Every.' }
          ],
            remediations: { 'misconception-adjustments-only-affect-the': { steps: ['**Revisit Class 11 Adjustments:** Go to `c11_acc_cbse_09_003` (Outstanding/Prepaid), `c11_acc_cbse_09_004`.', 'For each, write the adjusting entry and explicitly state: "P&L Effect: ___ ; Balance Sheet Effect: ___".', '**Practice Schedule III Format:** Open `c12_acc_cbse_07_003` and memorise the exact line-item sequence: Revenue from.', '**Re-do Diagnostic Q3 & Q4:** Solve them again, but this time **write the journal entry first**, then post.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_011', difficulty: 'standard',
          question: 'Preparation of Balance Sheet as per Schedule III with Adjustments is the.',
          hint: 'If stuck, revisit c12_acc_cbse_07_002 (Schedule III format) and c11_acc_cbse_09_011.',
          misconception: '**Misconception:** "Adjustments like outstanding expenses, prepaid expenses, accrued income, and unearned income are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Preparation of Balance Sheet as per Schedule III with Adjustments is the process of',
                  options: ['Preparation of Balance Sheet as per Schedule III with Adjustments is the process of', 'Financial Statements of a Company are the formal, structured summaries of a company\'s', 'The Balance Sheet of a Company as per Schedule III, Part I of the Companies Act 2013 is a', 'The Statement of Profit and Loss (as per Schedule III, Part II of the Companies Act,'],
                  hint: 'If stuck, revisit c12_acc_cbse_07_002 (Schedule III format) and c11_acc_cbse_09_011 (multiple.',
                  misconception: '**Misconception:** "Adjustments like outstanding expenses, prepaid expenses, accrued income, and unearned income are shown directly on the.' }
          ],
            remediations: { 'misconception-adjustments-like-outstanding-expen': { steps: ['If a student makes the above error: 1.', '**Show side-by-side comparison**: Take a Class 11 Balance Sheet (horizontal format, detailed items) and a Class 12.', 'Highlight that the *total* of "Other Current Liabilities" in Class 12 equals the *sum* of all outstanding expenses.', '**Practice mapping exercise**: Give 10 adjustment items (outstanding wages, prepaid insurance, accrued interest.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
