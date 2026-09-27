import type { SimDef } from '../../engine/types';
import C11_AccountancyAccountingStandardsMeaningSim from '../../../simulations/c6_12/C11_AccountancyAccountingStandardsMeaningSim';

/** v3 wrapped master — C11_AccountancyAccountingStandardsMeaningSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_accountancyaccountingstandardsmeaningsim: SimDef = {
    id: 'v3w_c11_accountancyaccountingstandardsmeaningsim',
    title: 'Accounting Standards Meaning',
    subtitle: 'This node covers the meaning, objectives, and user groups of financial statements; the.',
    classLevel: 11, subject: 'accountancy', topic: 'Financial Statements: Meaning and Objectives',
    chapters: [],
    nodeIds: ['c11_acc_cbse_08_001', 'c11_acc_cbse_01_003', 'c11_acc_cbse_01_006', 'c11_acc_cbse_01_007', 'c11_acc_cbse_01_001', 'c11_acc_cbse_08_002', 'c11_acc_cbse_08_004', 'c11_acc_cbse_08_006', 'c11_acc_cbse_02_001', 'c11_acc_cbse_02_005', 'c11_acc_cbse_02_007', 'c11_acc_cbse_02_008', 'c11_acc_cbse_02_011', 'c11_acc_cbse_02_002', 'c11_acc_cbse_09_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you run a small bakery in Delhi. At year-end, your father asks "Did we make money?" your bank manager.', goal: 'Master Accounting Standards Meaning.' },
    discovery: {
        question: 'A student says: "Capital expenditure is any large amount spent; revenue expenditure is any small amount spent." Using the NCERT criteria (benefit period,.',
        options: ['The statement is incorrect', 'Capital Expenditure = Purchase of Fixed Assets only', 'Revenue Expenditure = All other expenses'],
        answer: 'The statement is incorrect',
        hook: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".',
    },
    teaching: [
        { title: 'Financial statements are formal, structured.', text: 'Financial statements are formal, structured reports prepared at the end of an accounting period that communicate the financial performance (profit/loss) and financial position.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_001', title: 'Financial statements are formal,.',
          scaffold: { problem: 'Ramesh runs a stationery shop. During 2024-25, he incurred the following expenditures.',
            steps: [
            { text: 'Identify the nature of each outflow — does it acquire/create an asset/benefit lasting >1 year (CapEx) or consume.' },
            { text: 'Apply the four NCERT criteria: (a) Benefit period >1 year? (b) Increases earning capacity? (c) Non-recurring?' },
            { text: 'For each item, write the classification and the specific criterion met.' },
            { text: 'For borderline items (3, 6), explain why they are CapEx despite being "repairs/legal fees".' },
            { text: 'Verify that the classification aligns with the journal entry: CapEx → Asset A/c Dr.; RevEx → Expense A/c Dr.', faded: true, blankAnswer: '1-CapEx (asset, 5-yr benefit), 2-RevEx (restoration,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_01_003', title: 'The evolution of accounting refers to.',
          scaffold: { problem: 'An Egyptian treasury scribe in 3000 B.C. records daily gold deposits: Day 1: 50 deben received from Nubian mine; Day 2: 30 deben paid to.',
            steps: [
            { text: 'Identify the recording method — Egyptian system used daily recording on clay tablets/papyrus with chronological listing.' },
            { text: 'Prepare day-wise report for Wazir — list each day\'s transactions in chronological order with descriptions: Day 1: +50.' },
            { text: 'Calculate running balance — Day 1 closing: 50 deben; Day 2 closing: 20 deben; Day 3 closing: 40 deben' },
            { text: 'Prepare month-wise summary for King — aggregate totals: Total receipts = 70 deben, Total payments = 30 deben, Closing.' },
            { text: 'Analyse limitation — the system tracks stock of gold (asset) but has no concept of revenue vs capital receipts, expense.', faded: true, blankAnswer: 'Day-wise report: Day 1: Receipt 50 deben (Balance 50); Day.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_01_006', title: 'Accounting has evolved into three.',
          scaffold: { problem: 'Greenfield Agro Ltd. manufactures organic fertiliser. At year-end (31st March 2024), the following tasks are performed: (i) Preparing.',
            steps: [
            { text: 'Identify the purpose and output of Task (i). It produces general-purpose financial statements (Balance Sheet, P&L) for.' },
            { text: 'Map Task (i) to Financial Accounting. Justification: (a) Primary users are external (RoC, bank); (b) Governed by.' },
            { text: 'Identify the purpose of Task (ii). It computes per-unit cost (cost ascertainment) for pricing—a product-specific,.' },
            { text: 'Map Task (ii) to Cost Accounting. Justification: (a) Primary user is internal (production/sales management); (b) Focus.' },
            { text: 'Identify the purpose of Task (iii). It involves future-oriented projections (cash budget) and a strategic decision.' },
            { text: 'Map Task (iii) to Management Accounting. Justification: (a) Time orientation is future (planning); (b) Data includes.' },
            { text: 'Verify no overlap: Each task has a distinct primary objective, user, and time focus matching the three branches.', faded: true, blankAnswer: '(i) Financial Accounting — external users, mandatory Ind AS.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_01_007', title: 'Accounting serves as the language of.',
          scaffold: { problem: '"Sharma Electronics, a sole proprietorship, purchases a delivery van for ₹8,00,000 on 1st July 2024, paying ₹3,00,000 by cheque and taking.',
            steps: [
            { text: 'Identify the economic event – acquisition of a depreciable asset (van) financed partly by owner\'s funds and partly by.' },
            { text: 'Map to Role 1 – Language of Business: The transaction is recorded using standardised debit/credit vocabulary: "Van A/c.' },
            { text: 'Map to Role 2 – Historical Record: The entry is made chronologically in the journal on 1st July 2024 at the actual cost.' },
            { text: 'Map to Role 3 – Current Economic Reality: On the Balance Sheet date (31st March 2025), the van is shown at cost.' },
            { text: 'Map to Role 4 – Information System: The processed information flows to users: (a) HDFC Bank receives quarterly.' },
            { text: 'Map to Role 5 – Commodity: A Chartered Accountant may be engaged to certify the van\'s valuation for loan documentation,.', faded: true, blankAnswer: 'The van purchase demonstrates all five roles: (1) Language.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_01_001', title: 'Accounting is the systematic process of.',
          scaffold: { problem: 'Ramesh starts a garment shop on 1st April. During the first week, the following occur: (i) He invests ₹3,00,000 cash.',
            steps: [
            { text: 'List each event and check if it involves a monetary transaction (cash or credit) with measurable value.' },
            { text: '(i) Investment: external (owner is separate entity), ₹3,00,000. (ii) Furniture purchase: external (seller), ₹50,000.' },
            { text: 'Classify recorded events: (i), (ii), (iii), (v), (vi) are external. No internal events in this week.' },
            { text: 'Verify each recorded event has a monetary value and a source document (cash receipt, invoice, rent agreement).' },
            { text: 'Conclude: 5 economic events recorded; hiring is not recorded until salary is paid.', faded: true, blankAnswer: 'Recorded events: (i) ₹3,00,000 external, (ii) ₹50,000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_08_002', title: 'A Trading Account is a nominal account.',
          scaffold: { problem: 'M/s Gupta Traders provides the following for the year ended 31st March 2026: Opening Stock ₹75,000; Purchases ₹4,20,000; Purchase Returns.',
            steps: [
            { text: 'Identify all items belonging to Trading Account — separate direct expenses (Wages, Carriage Inwards, Factory Rent) from.' },
            { text: 'Compute Net Purchases = Total Purchases ₹4,20,000 - Purchase Returns ₹15,000 = ₹4,05,000.' },
            { text: 'Compute Net Sales = Total Sales ₹7,50,000 - Sales Returns ₹30,000 = ₹7,20,000.' },
            { text: 'Compute Total Direct Expenses = Wages ₹60,000 + Carriage Inwards ₹12,000 + Factory Rent ₹24,000 = ₹96,000.' },
            { text: 'Compute Cost of Goods Sold = Opening Stock ₹75,000 + Net Purchases ₹4,05,000 + Direct Expenses ₹96,000 - Closing Stock.' },
            { text: 'Compute Gross Profit = Net Sales ₹7,20,000 - COGS ₹4,86,000 = ₹2,34,000.' },
            { text: 'Draft Trading Account with proper format: Dr side — Opening Stock, Purchases (less returns), Direct Expenses; Cr side —.', faded: true, blankAnswer: 'Gross Profit = ₹2,34,000' }
            ] } },
        { type: 'dissect', nodeId: 'c11_acc_cbse_01_003', title: 'Identify each idea',
          dissect: { specimen: 'Accounting Standards Meaning', spots: [
            { id: 's1', label: 'Financial statements are formal structured', prompt: 'Which idea is this? — Financial statements are formal, structured reports prepared at the end of an accounting.', answer: 'Financial statements are formal structured', options: ['Financial statements are formal structured', 'The evolution of accounting refers', 'Accounting has evolved into three', 'Accounting serves as the language'] },
            { id: 's2', label: 'The evolution of accounting refers', prompt: 'Which idea is this? — The evolution of accounting refers to the chronological development of accounting.', answer: 'The evolution of accounting refers', options: ['The evolution of accounting refers', 'Financial statements are formal structured', 'Accounting has evolved into three', 'Accounting serves as the language'] },
            { id: 's3', label: 'Accounting has evolved into three', prompt: 'Which idea is this? — Accounting has evolved into three specialised branches—Financial Accounting, Cost.', answer: 'Accounting has evolved into three', options: ['Accounting has evolved into three', 'Financial statements are formal structured', 'The evolution of accounting refers', 'Accounting serves as the language'] },
            { id: 's4', label: 'Accounting serves as the language', prompt: 'Which idea is this? — Accounting serves as the language of business that systematically identifies, measures,.', answer: 'Accounting serves as the language', options: ['Accounting serves as the language', 'Financial statements are formal structured', 'The evolution of accounting refers', 'Accounting has evolved into three'] },
            { id: 's5', label: 'Accounting is the systematic process', prompt: 'Which idea is this? — Accounting is the systematic process of identifying, measuring, recording, and.', answer: 'Accounting is the systematic process', options: ['Accounting is the systematic process', 'Financial statements are formal structured', 'The evolution of accounting refers', 'Accounting has evolved into three'] },
            { id: 's6', label: 'A Trading Account is a', prompt: 'Which idea is this? — A Trading Account is a nominal account prepared to determine the gross profit or gross.', answer: 'A Trading Account is a', options: ['A Trading Account is a', 'Financial statements are formal structured', 'The evolution of accounting refers', 'Accounting has evolved into three'] }
          ] } }
    ],
    explore: { component: C11_AccountancyAccountingStandardsMeaningSim, prompt: 'Explore the interactive — Accounting Standards Meaning' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_001', difficulty: 'standard',
          question: 'Financial statements are formal, structured reports prepared at the end of an.',
          hint: 'If stuck, revisit the "Accounting Equation" and "Rules of Debit and Credit for Personal,.',
          misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".',
          parts: [
                { id: 'a', prompt: 'A student says: "Capital expenditure is any large amount spent; revenue expenditure is any small amount spent." Using the NCERT criteria (benefit period,.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Capital Expenditure = Purchase of Fixed Assets only', 'Revenue Expenditure = All other expenses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".' }
          ],
            remediations: { 'capital-expenditure-purchase-of-fixed': { steps: ['Ask the student to state the *exact* NCERT definition of Capital Expenditure ("benefit extends more than one accounting.', 'Present the machinery overhaul (₹5 lakh, extends life 5 years) and advance rent (₹10 lakh, 3 years) as two test items.', 'Force the student to answer *only* using the two criteria: (a) Over how many accounting periods will the benefit flow?', 'Show the journal entries: Overhaul → Machinery A/c Dr. (capitalised) → Depreciation over 5 years; Advance Rent →.', 'Have the student re-classify 5 more items using *only* the two criteria, forbidding "it\'s a fixed asset" or "amount is.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".',
          parts: [
                { id: 'a', prompt: '"Operating Profit (EBIT) is a better measure of core business performance than Net Profit because it excludes financial and abnormal items." Critically.', answer: 'a bank assessing loan repayment capacity, (',
                  options: ['a bank assessing loan repayment capacity, (', 'Capital Expenditure = Purchase of Fixed Assets only', 'Revenue Expenditure = All other expenses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".' },
                { id: 'b', prompt: 'Design a 10-item "Capital vs Revenue Classification Challenge" for your classmates. Include 5 expenditure items and 5 receipt items.', answer: 'A good answer lists 10 realistic items with correct classifications and precise',
                  options: ['A good answer lists 10 realistic items with correct classifications and precise', 'Capital Expenditure = Purchase of Fixed Assets only', 'Revenue Expenditure = All other expenses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Capital Expenditure = Purchase of Fixed Assets only" and "Revenue Expenditure = All other expenses".' }
          ],
            remediations: { 'capital-expenditure-purchase-of-fixed': { steps: ['Ask the student to state the *exact* NCERT definition of Capital Expenditure ("benefit extends more than one accounting.', 'Present the machinery overhaul (₹5 lakh, extends life 5 years) and advance rent (₹10 lakh, 3 years) as two test items.', 'Force the student to answer *only* using the two criteria: (a) Over how many accounting periods will the benefit flow?', 'Show the journal entries: Overhaul → Machinery A/c Dr. (capitalised) → Depreciation over 5 years; Advance Rent →.', 'Have the student re-classify 5 more items using *only* the two criteria, forbidding "it\'s a fixed asset" or "amount is.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_003', difficulty: 'standard',
          question: 'The evolution of accounting refers to the chronological development of.',
          hint: 'Revisit Class 6 Economics nodes on barter system (c6_economics_ch11_001) and evolution of.',
          misconception: 'Students often believe accounting history is a linear progression of "better" techniques where each civilisation.',
          parts: [
                { id: 'a', prompt: 'A 14th century Italian merchant records a credit sale of 500 florins to a buyer in his daybook as "Sold goods to Giovanni, 500 florins." Using Pacioli\'s.', answer: 'Debit Giovanni (Debtor/Asset) 500 florins',
                  options: ['Correct answer: Debit Giovanni (Debtor/Asset) 500 florins', 'Giovanni owes 500', 'owed to proprietor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe accounting history is a linear progression of "better" techniques where each civilisation improved on the previous.' },
                { id: 'b', prompt: 'Compare Kautilya\'s Arthashastra prescriptions for government accounting (23 centuries ago) with the Egyptian treasury system described in your textbook.', answer: 'Similarities',
                  options: ['Correct answer: Similarities', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe accounting history is a linear progression of "better" techniques where each civilisation improved on the previous.' }
          ],
            remediations: { 'accounting-history-is-a-linear': { steps: ['If a student shows this linear-progression misconception, use a three-step remediation: (1) Create a comparison table.', '(2) Ask: "Could Egyptian daily reporting to Wazirs work for a Venetian merchant with ships in Alexandria and.', 'Why or why not?" — forcing recognition of context-dependence.', '(3) Show how Pacioli\'s "Debit = owed to proprietor, Credit = owed by proprietor" works for both a state treasury and a.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe accounting history is a linear progression of "better" techniques where each civilisation.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Luca Pacioli invented double-entry bookkeeping in 1494." Defend your position using evidence from the textbook about Pacioli\'s own.', answer: 'The claim is false',
                  options: ['Correct answer: The claim is false', 'if you make one creditor, you must make some debtor', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe accounting history is a linear progression of "better" techniques where each civilisation improved on the previous.' },
                { id: 'b', prompt: 'Create a timeline diagram (described in words) showing five milestones in accounting evolution from 4000 B.C.', answer: 'Expected answer: 1) 4000 B.C',
                  options: ['Expected answer: 1) 4000 B.C', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe accounting history is a linear progression of "better" techniques where each civilisation improved on the previous.' },
                { id: 'c', prompt: 'Compare Kautilya\'s Arthashastra prescriptions for government accounting (23 centuries ago) with the Egyptian treasury system described in your textbook.', answer: 'Similarities',
                  options: ['Correct answer: Similarities', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe accounting history is a linear progression of "better" techniques where each civilisation improved on the previous.' }
          ],
            remediations: { 'accounting-history-is-a-linear': { steps: ['If a student shows this linear-progression misconception, use a three-step remediation: (1) Create a comparison table.', '(2) Ask: "Could Egyptian daily reporting to Wazirs work for a Venetian merchant with ships in Alexandria and.', 'Why or why not?" — forcing recognition of context-dependence.', '(3) Show how Pacioli\'s "Debit = owed to proprietor, Credit = owed by proprietor" works for both a state treasury and a.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_006', difficulty: 'standard',
          question: 'Accounting has evolved into three specialised branches—Financial Accounting,.',
          hint: 'If stuck, revisit c11_acc_cbse_01_004 (Users of Accounting Information) and create a.',
          misconception: 'Students often believe **Cost Accounting and Management Accounting are the same** because both serve internal.',
          parts: [
                { id: 'a', prompt: 'A factory manager asks the accountant: "What was the per-unit cost of the chairs we produced last month, and where did we overspend?" Which branch of.', answer: 'Cost Accounting answers this',
                  options: ['Cost Accounting answers this', 'Management Accounting', 'What did it cost?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **Cost Accounting and Management Accounting are the same** because both serve internal management.' },
                { id: 'b', prompt: 'XYZ Ltd. is planning to launch a new product. The CEO needs a report showing projected sales, cash flows, manpower needs, and environmental impact for the next.', answer: 'Management Accounting prepares this report',
                  options: ['Management Accounting prepares this report', 'Financial Accounting with estimates', 'What did it cost?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **Cost Accounting and Management Accounting are the same** because both serve internal management.' },
                { id: 'c', prompt: 'Compare the three branches on these four dimensions: (a) Primary user group, (b) Time orientation, (c) Data nature, (d) Regulatory framework.', answer: '| Dimension | Financial Accounting | Cost Accounting | Management Accounting |',
                  options: ['| Dimension | Financial Accounting | Cost Accounting | Management Accounting |', 'future', 'What did it cost?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **Cost Accounting and Management Accounting are the same** because both serve internal management.' }
          ],
            remediations: { 'cost-accounting-and-management-accounting': { steps: ['If a student conflates Cost and Management Accounting: (1) Ask them to list the *output* of each: Cost Accounting →.', '(2) Give a specific transaction: "Factory rent ₹2 lakh paid." Ask: How does Cost Accounting treat it?', '(Allocate to products via overhead absorption rate).', 'How does Management Accounting use it?'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe **Cost Accounting and Management Accounting are the same** because both serve internal.',
          parts: [
                { id: 'a', prompt: '"Management Accounting is just a combination of Financial Accounting and Cost Accounting." Evaluate this statement. Is it accurate?', answer: 'The statement is **inaccurate**',
                  options: ['The statement is **inaccurate**', 'What did it cost?', 'What should we do?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **Cost Accounting and Management Accounting are the same** because both serve internal management.' },
                { id: 'b', prompt: 'Create a realistic business scenario (3-4 sentences) where all three branches of accounting are simultaneously active.', answer: '**Scenario**: "Apex Textiles Ltd',
                  options: ['**Scenario**: "Apex Textiles Ltd', 'What did it cost?', 'What should we do?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **Cost Accounting and Management Accounting are the same** because both serve internal management.' }
          ],
            remediations: { 'cost-accounting-and-management-accounting': { steps: ['If a student conflates Cost and Management Accounting: (1) Ask them to list the *output* of each: Cost Accounting →.', '(2) Give a specific transaction: "Factory rent ₹2 lakh paid." Ask: How does Cost Accounting treat it?', '(Allocate to products via overhead absorption rate).', 'How does Management Accounting use it?'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_007', difficulty: 'standard',
          question: 'Accounting serves as the language of business that systematically identifies,.',
          hint: 'Revisit c11_acc_cbse_01_001 (definition of accounting) and c11_acc_cbse_01_004 (users of.',
          misconception: 'Students often confuse the "roles of accounting" (language, historical record, economic reality, information system,.',
          parts: [
                { id: 'a', prompt: 'A student says: "Accounting is just a historical record of past transactions.', answer: 'Accounting as "current economic reality" measures change in wealth (income)',
                  options: ['Accounting as "current economic reality" measures change in wealth (income)', 'roles of accounting', 'branches of accounting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the "roles of accounting" (language, historical record, economic reality, information system, commodity) with the.' }
          ],
            remediations: { 'students-often-confuse-the-roles': { steps: ['Draw a two-column table on paper. Left column: "Five Roles (Box 4)". Right column: "Three Branches (Box 3)".', 'For each role, write the one-sentence definition from NCERT. For each branch, write its purpose.', 'Pick a concrete event (e.g., "Company takes ₹10 lakh bank loan").', 'Trace how EACH role manifests for this event (Language: standard loan entry; Historical record: loan entry in books;.', 'Trace how EACH branch handles this event (Financial: records loan, shows in Balance Sheet; Cost: allocates interest to.', 'Verbally explain the difference to a peer: "Roles answer \'What does accounting DO for society?\' Branches answer \'Which.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_001', difficulty: 'standard',
          question: 'Accounting is the systematic process of identifying, measuring, recording, and.',
          hint: 'Revisit Class 7 Economics "Functions of Money: Medium of Exchange, Store of Value".',
          misconception: 'Students equate "accounting" with "book-keeping" and think every business activity is recorded.',
          parts: [
                { id: 'a', prompt: '"Accounting information must be comparable." A company changes its depreciation method from straight-line to written-down-value in Year 3 without disclosure.', answer: 'Changing method without disclosure breaks inter-period comparability (Year 3 vs',
                  options: ['Changing method without disclosure breaks inter-period comparability (Year 3 vs', 'comparability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "accounting" with "book-keeping" and think every business activity is recorded.' }
          ],
            remediations: { 'students-equate-accounting-with-book': { steps: ['Ask the student to list five things that happened in a shop today.', 'For each, ask "Can you put a ₹ amount on it right now?"', 'Cross out those without a measurable amount.', 'Explain: "Accounting is a filter — only monetary events pass through."', 'Practice with 10 mixed scenarios (cash sale, hire manager, sign lease, fire loss, pay rent) until the student correctly.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "accounting" with "book-keeping" and think every business activity is recorded.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Since accounting only records past transactions, it has no value for future planning." Defend your position with two arguments from.', answer: 'The statement is false',
                  options: ['The statement is false', 'past-oriented recording', 'past-only utility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "accounting" with "book-keeping" and think every business activity is recorded.' },
                { id: 'b', prompt: '"Accounting information must be comparable." A company changes its depreciation method from straight-line to written-down-value in Year 3 without disclosure.', answer: 'Changing method without disclosure breaks inter-period comparability (Year 3 vs',
                  options: ['Changing method without disclosure breaks inter-period comparability (Year 3 vs', 'comparability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "accounting" with "book-keeping" and think every business activity is recorded.' }
          ],
            remediations: { 'students-equate-accounting-with-book': { steps: ['Ask the student to list five things that happened in a shop today.', 'For each, ask "Can you put a ₹ amount on it right now?"', 'Cross out those without a measurable amount.', 'Explain: "Accounting is a filter — only monetary events pass through."', 'Practice with 10 mixed scenarios (cash sale, hire manager, sign lease, fire loss, pay rent) until the student correctly.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_002', difficulty: 'standard',
          question: 'A Trading Account is a nominal account prepared to determine the gross profit.',
          hint: 'Revisit Class 8 Maths Ch8 (Profit/Loss basics) and the "Direct vs Indirect Expense".',
          misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory.',
          parts: [
                { id: 'a', prompt: 'A student records "Carriage Outwards" (delivery charges to customers) on the debit side of the Trading Account. Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'expenses on goods', 'expenses to *acquire* goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory depreciation) and.' },
                { id: 'b', prompt: 'Compare two businesses: Business A has Gross Profit ₹2,00,000 on Sales ₹10,00,000 (GP ratio 20%).', answer: 'Business B has better trading efficiency (25% > 20%)',
                  options: ['Business B has better trading efficiency (25% > 20%)', '₹2,00,000 > ₹1,50,000'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory depreciation) and.' }
          ],
            remediations: { 'students-treat-all-factory-related': { steps: ['Draw a timeline: **Purchase → Transport Inwards → Factory Gate → Production → Saleable Condition → Warehouse →.', 'Ask: "At which point does the expense occur?" If *before* "Saleable Condition" → Direct (Trading A/c).', 'If *after* → Indirect (P&L A/c).', 'Practice classifying 10 expenses using this timeline (e.g., factory rent = before saleable → direct; factory manager.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory.',
          parts: [
                { id: 'a', prompt: 'Compare two businesses: Business A has Gross Profit ₹2,00,000 on Sales ₹10,00,000 (GP ratio 20%).', answer: 'Business B has better trading efficiency (25% > 20%)',
                  options: ['Business B has better trading efficiency (25% > 20%)', '₹2,00,000 > ₹1,50,000'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat **all factory-related expenses as direct** (e.g., factory supervisor salary, factory insurance, factory depreciation) and.' }
          ],
            remediations: { 'students-treat-all-factory-related': { steps: ['Draw a timeline: **Purchase → Transport Inwards → Factory Gate → Production → Saleable Condition → Warehouse →.', 'Ask: "At which point does the expense occur?" If *before* "Saleable Condition" → Direct (Trading A/c).', 'If *after* → Indirect (P&L A/c).', 'Practice classifying 10 expenses using this timeline (e.g., factory rent = before saleable → direct; factory manager.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
