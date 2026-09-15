import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch01_p2: SimDef = {
    id: 'v3_c11_acc_ch01_p2',
    title: 'Introduction to Accounting · Part 2/2',
    subtitle: 'Decide what counts as a transaction, who accounting serves, and why cash isn\'t profit.',
    classLevel: 11, subject: 'accountancy', topic: 'Introduction to Accounting · Part 2/2',
    chapters: ['c11_acc_ch01'],
    nodeIds: ['c11_acc_cbse_01_007', 'c11_acc_cbse_01_008', 'c11_acc_cbse_01_009', 'c11_acc_cbse_01_010', 'c11_acc_cbse_01_011', 'c11_acc_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a trainee accountant auditing a neighbourhood shop', intro: 'A busy shopkeeper insists her memory is better than any ledger. You\'re here to show her what slips through.', goal: 'Distinguish accounting from bookkeeping, identify users of accounting information, and classify transactions correctly.' },
    discovery: {
        question: 'A kirana shop owner sells ₹40,000 of goods this month but only ₹28,000 reaches her bank account — the rest is on credit and expenses. Her ledger says she\'s \'doing fine\'. Which single idea explains why her books can say one thing while her cash says another?',
        options: ['Profit is measured on what is earned, not what is collected in cash', 'Cash in hand is always equal to profit for the month', 'Credit sales are ignored until the money actually arrives', 'Only cash expenses reduce profit, never credit purchases'],
        answer: 'Profit is measured on what is earned, not what is collected in cash',
        hook: 'Accounting separates earning from collecting — that\'s the leap from a cash diary to real accounts.',
    },
    teaching: [
        { title: 'Role of Accounting in Business and Society', text: 'Accounting serves as the language of business that systematically identifies, measures, records, and communicates economic information about an organisation to internal and external users for.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a week of transactions in a small business and decide which ones actually belong in the books of accounts.',
        labels: ['Role of Accounting', 'Basic Accounting Terms: Asset,', 'Basic Accounting Terms: Revenue,', 'Drawings, Debtors and Creditors', 'Accounting Equation: Assets =', 'Limitations of Accounting'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_007', title: 'Role of Accounting in Business and Society',
          caseStudy: { intro: 'Imagine you\'re the owner of a small bakery in Delhi. You sell cakes, buy flour and sugar, pay rent and salaries, and take a loan from a bank.',
            decisions: [{ prompt: 'State the five roles of accounting as identified in the NCERT textbook and give a one-line description of what each role means.', options: [
                { text: 'The five roles are: (1) Language of business – communicates financial information using', outcome: 'The five roles are: (1) Language of business – communicates financial information using.' },
                { text: 'bookkeeping', outcome: 'Not quite — Students often confuse the "roles of accounting" (language, historical record, economic reality.', reveals: 'students-often-confuse-the-roles' },
                { text: 'auditing', outcome: 'Not quite — Students often confuse the "roles of accounting" (language, historical record, economic reality.', reveals: 'students-often-confuse-the-roles' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_008', title: 'Basic Accounting Terms: Asset, Liability and Capital',
          caseStudy: { intro: 'Imagine you are helping your cousin set up a small cloud kitchen.',
            decisions: [{ prompt: 'State the three essential characteristics that distinguish an asset from a liability in accounting, as per the NCERT definition.', options: [
                { text: 'Correct answer: (1) Asset: resource controlled by enterprise from past events, future', outcome: 'Correct answer: (1) Asset: resource controlled by enterprise from past events, future economic.' },
                { text: 'assets are things we own, liabilities are things we owe', outcome: 'Not quite — Students treat **Capital as an asset** because "the owner put money in, so it\'s the business\'s.', reveals: 'students-treat-capital-as-an' },
                { text: 'control', outcome: 'Not quite — Students treat **Capital as an asset** because "the owner put money in, so it\'s the business\'s.', reveals: 'students-treat-capital-as-an' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_009', title: 'Basic Accounting Terms: Revenue, Expense, Gain and Loss',
          caseStudy: { intro: 'Imagine you run a small bakery. You sell cakes for ₹50,000 this month — that\'s revenue from your main business.',
            decisions: [{ prompt: 'A stationery shop owner sells notebooks worth ₹25,000 for cash.', options: [
                { text: '₹25,000 from notebook sales = Revenue (ordinary activity)', outcome: '₹25,000 from notebook sales = Revenue (ordinary activity). ₹3,000 from chair sale: book value.' },
                { text: 'Revenue', outcome: 'Not quite — Students treat "Gain" as just "extra revenue" and "Loss" as just "extra expense," using the terms.', reveals: 'students-treat-gain-as-just' },
                { text: 'ordinary activities', outcome: 'Not quite — Students treat "Gain" as just "extra revenue" and "Loss" as just "extra expense," using the terms.', reveals: 'students-treat-gain-as-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_010', title: 'Drawings, Debtors and Creditors: Key Terms',
          caseStudy: { intro: 'Imagine you start a small online stationery business with ₹50,000 of your own savings.',
            decisions: [{ prompt: 'Define Drawings, Debtors, and Creditors in one sentence each, using the precise terminology from the accounting equation perspective.', options: [
                { text: '**Drawings**: Withdrawal of assets (cash/goods) by the owner for personal use, reducing', outcome: '**Drawings**: Withdrawal of assets (cash/goods) by the owner for personal use, reducing Capital.' },
                { text: 'expense', outcome: 'Not quite — **Misconception**: "Drawings are a business expense because money goes out of the business." **Why.', reveals: 'misconception-drawings-are-a-business' },
                { text: 'liability', outcome: 'Not quite — **Misconception**: "Drawings are a business expense because money goes out of the business." **Why.', reveals: 'misconception-drawings-are-a-business' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_01_011', title: 'Accounting Equation: Assets = Liabilities + Capital',
          scaffold: { problem: 'Rohan starts a graphic design studio on 1st April 2024. He invests ₹3,00,000 cash and transfers his personal laptop worth ₹80,000 to the.',
            steps: [
            { text: 'Identify initial state — no business exists yet, so Assets = 0, Liabilities = 0, Capital = 0.' },
            { text: 'Transaction 1 — Owner invests cash ₹3,00,000 and laptop ₹80,000.' },
            { text: 'Transaction 2 — Bank loan ₹2,00,000 received. Assets (Bank) +₹2,00,000. Liabilities (Bank Loan) +₹2,00,000.' },
            { text: 'Transaction 3 — Furniture purchased by cheque ₹1,20,000. Assets: Furniture +₹1,20,000, Bank -₹1,20,000.' },
            { text: 'Transaction 4 — Advance rent ₹60,000 paid by cheque. Assets: Prepaid Rent (asset) +₹60,000, Bank -₹60,000.' },
            { text: 'Verify final composition — Assets = Cash ₹3,00,000 + Laptop ₹80,000 + Bank ₹20,000 (2,00,000 - 1,20,000 - 60,000).', faded: true, blankAnswer: 'Final Accounting Equation: Assets ₹5,80,000 = Liabilities.' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_012', title: 'Limitations of Accounting',
          caseStudy: { intro: 'Imagine you\'re analyzing two companies for investment: Company A shows ₹50 lakh profit with ₹2 crore assets, Company B shows ₹45 lakh profit with ₹1.8 crore.',
            decisions: [{ prompt: 'State any four limitations of financial accounting as per the CBSE Class 11 curriculum.', options: [
                { text: 'The four core limitations are: (1) Historical nature—records past transactions only, not', outcome: 'The four core limitations are: (1) Historical nature—records past transactions only, not future.' },
                { text: 'does not record non-monetary transactions', outcome: 'Not quite — Students often believe "limitations of accounting" means "accounting is flawed/useless" and.', reveals: 'limitations-of-accounting-means-accounting' },
                { text: 'limitations of accounting', outcome: 'Not quite — Students often believe "limitations of accounting" means "accounting is flawed/useless" and.', reveals: 'limitations-of-accounting-means-accounting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You volunteer as treasurer for your school\'s two-day cultural fest. On day one: a sponsor pays ₹20,000, you hire a popular band for day two, the principal announces a donation, and a stall\'s fridge breaks down (₹8,000 repair estimate). Back in the accounts room, a teammate says every announcement should go in the books because they are all important.',
            decisions: [{ prompt: 'Which events actually enter the fest\'s accounts?', options: [
                { text: 'Record the sponsor\'s ₹20,000 and the fridge loss estimate — both are economic events measurable in money. The band hiring becomes a transaction only when the service/payment is made, and the principal\'s announcement is not measurable until the money is promised in writing and received.', outcome: 'Accounting filters events through monetary measurability: only what can be expressed in rupees is recorded, however \'important\' the rest feels.' },
                { text: 'Record all four — the band booking and the announced donation are significant events for the fest.', outcome: 'Significance is not the test; without a monetary amount attached to an exchange, the event stays outside the books.', reveals: 'importance-equals-recordable' },
                { text: 'Just write down whatever cash physically moved today — accounting is only cash in and cash out.', outcome: 'That reduces accounting to book-keeping of cash; accounting records all measurable economic events (including credit and losses) and then analyses them for decisions.', reveals: 'accounting-is-cash-bookkeeping' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'Accounting is the language that turns scattered transactions into a story a business can act on.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_007', difficulty: 'standard',
          question: 'Accounting serves as the language of business that systematically identifies.',
          hint: 'Revisit c11_acc_cbse_01_001 (definition of accounting) and c11_acc_cbse_01_004 (users.',
          misconception: 'Students often confuse the "roles of accounting" (language, historical record, economic reality, information system.',
          parts: [
                { id: 'a', prompt: 'A student says: "Accounting is just a historical record of past transactions.', answer: 'Accounting as "current economic reality" measures change in wealth (income)',
                  options: ['Accounting as "current economic reality" measures change in wealth (income)', 'roles of accounting', 'branches of accounting', 'functions of accounting'],
                  hint: 'Revisit c11_acc_cbse_01_001 (definition of accounting) and c11_acc_cbse_01_004 (users of accounting.',
                  misconception: 'Students often confuse the "roles of accounting" (language, historical record, economic reality, information system, commodity) with the.' }
          ],
            remediations: { 'students-often-confuse-the-roles': { steps: ['Draw a two-column table on paper. Left column: "Five Roles (Box 4)". Right column: "Three Branches (Box 3)".', 'For each role, write the one-sentence definition from NCERT. For each branch, write its purpose.', 'Pick a concrete event (e.g., "Company takes ₹10 lakh bank loan").', 'Trace how EACH role manifests for this event (Language: standard loan entry; Historical record: loan entry in books.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_008', difficulty: 'standard',
          question: 'An **Asset** is an economic resource controlled by an enterprise as a result.',
          hint: 'If stuck, revisit the Entity Concept (c11_acc_cbse_01_001) and the Balance Model.',
          misconception: 'Students treat **Capital as an asset** because "the owner put money in, so it\'s the business\'s money." They write.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the classification criteria for "Current Asset" vs "Non-current Asset" and "Current Liability" vs "Non-current Liability" as given.', answer: 'Correct answer: Both use operating cycle *or* 12 months, whichever is longer',
                  options: ['Correct answer: Both use operating cycle *or* 12 months, whichever is longer', 'current means within 12 months for everyone', 'Drawings A/c Dr'],
                  hint: 'If stuck, revisit the Entity Concept (c11_acc_cbse_01_001) and the Balance Model of Equations.',
                  misconception: 'Students treat **Capital as an asset** because "the owner put money in, so it\'s the business\'s money." They write "Capital" on the asset.' }
          ],
            remediations: { 'students-treat-capital-as-an': { steps: ['Re-teach the **Entity Concept** using a physical analogy: "You (owner) and the Business (a separate box) are two.', 'Draw a T-account for Capital. Show only two transactions: (a) Owner invests → Credit Capital; (b) Owner withdraws →.', 'Give 5 rapid-fire items (Cash, Loan, Machinery, Creditors, Capital) and ask: "Asset, Liability, or Capital?" Force the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_009', difficulty: 'standard',
          question: 'Revenue is the gross inflow of economic benefits arising from the ordinary.',
          hint: 'Revisit c11_acc_cbse_01_008 (Asset, Liability, Capital) and c11_acc_cbse_01_011.',
          misconception: 'Students treat "Gain" as just "extra revenue" and "Loss" as just "extra expense," using the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'A stationery shop owner sells notebooks worth ₹25,000 for cash. He also sells an old office chair (original cost ₹5,000, book value ₹2,000) for ₹3,000.', answer: '₹25,000 from notebook sales = Revenue (ordinary activity)',
                  options: ['₹25,000 from notebook sales = Revenue (ordinary activity)', 'Revenue', 'ordinary activities', 'any cash inflow is revenue, missing the "ordinary activities" criterion'],
                  hint: 'Revisit c11_acc_cbse_01_008 (Asset, Liability, Capital) and c11_acc_cbse_01_011 (Accounting.',
                  misconception: 'Students treat "Gain" as just "extra revenue" and "Loss" as just "extra expense," using the terms interchangeably.' }
          ],
            remediations: { 'students-treat-gain-as-just': { steps: ['Draw a 2×2 matrix on paper. Rows: "Ordinary Activity" vs "Peripheral/Incidental".', 'Place Revenue (Ordinary+Inflow), Expense (Ordinary+Outflow), Gain (Peripheral+Inflow), Loss (Peripheral+Outflow).', 'Take 10 transactions from the NCERT Test Your Understanding-V (Mr.', 'For each, say aloud: "This is [category] because it is [ordinary/peripheral] and results in [inflow/outflow]." This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_010', difficulty: 'standard',
          question: '**Drawings** refer to the withdrawal of money, goods, or other assets by the.',
          hint: 'Revisit c11_acc_cbse_01_008 (Asset/Liability/Capital classification) and.',
          misconception: '**Misconception**: "Drawings are a business expense because money goes out of the business." **Why it happens**.',
          parts: [
                { id: 'a', prompt: 'A student says: "When a business sells goods on credit to a customer, the customer becomes a creditor because the business has given them goods." Explain why.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'creditor', 'party involved in credit transaction', 'party to whom money is owed'],
                  hint: 'Revisit c11_acc_cbse_01_008 (Asset/Liability/Capital classification) and c11_acc_cbse_01_001.',
                  misconception: '**Misconception**: "Drawings are a business expense because money goes out of the business." **Why it happens**: Students apply daily-life.' },
                { id: 'b', prompt: 'Transaction: "Proprietor withdrew goods costing ₹8,000 for personal use." Show the effect on the Accounting Equation (Assets = Liabilities + Capital) with.', answer: '**Step 1**: Identify accounts affected: Stock (Asset) decreases by ₹8,000',
                  options: ['**Step 1**: Identify accounts affected: Stock (Asset) decreases by ₹8,000', 'Proprietor withdrew ₹10,000 for daughter\'s school fees', 'Debit School Fees Expense ₹10,000', 'Debit Drawings ₹10,000'],
                  hint: 'Revisit c11_acc_cbse_01_008 (Asset/Liability/Capital classification) and c11_acc_cbse_01_001.',
                  misconception: '**Misconception**: "Drawings are a business expense because money goes out of the business." **Why it happens**: Students apply daily-life.' }
          ],
            remediations: { 'misconception-drawings-are-a-business': { steps: ['**Step 1**: Re-teach the **Entity Concept** using a physical analogy: "Business and Owner are two separate persons.', 'When Owner takes money from Business, Business *loses* an asset but *owes less* to Owner (Capital ↓).', 'It\'s not a cost of doing business—it\'s the Owner taking their share." **Step 2**: Draw a T-account for Capital: show.', 'Emphasize: "Drawings sit on the *debit side of Capital*, not in the P&L." **Step 3**: Give 5 rapid-fire transactions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "Drawings are a business expense because money goes out of the business." **Why it happens**.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "Since Drawings reduce Capital, they should be debited to the Profit & Loss Account as an expense to correctly calculate net profit." Defend.', answer: '**Refute**',
                  options: ['**Refute**', 'reduction in equity', 'expense', 'Proprietor withdrew ₹10,000 for daughter\'s school fees'],
                  hint: 'Revisit c11_acc_cbse_01_008 (Asset/Liability/Capital classification) and c11_acc_cbse_01_001.',
                  misconception: '**Misconception**: "Drawings are a business expense because money goes out of the business." **Why it happens**: Students apply daily-life.' }
          ],
            remediations: { 'misconception-drawings-are-a-business': { steps: ['**Step 1**: Re-teach the **Entity Concept** using a physical analogy: "Business and Owner are two separate persons.', 'When Owner takes money from Business, Business *loses* an asset but *owes less* to Owner (Capital ↓).', 'It\'s not a cost of doing business—it\'s the Owner taking their share." **Step 2**: Draw a T-account for Capital: show.', 'Emphasize: "Drawings sit on the *debit side of Capital*, not in the P&L." **Step 3**: Give 5 rapid-fire transactions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_011', difficulty: 'standard',
          question: 'The Accounting Equation is the fundamental identity of double-entry bookkeeping.',
          hint: 'If stuck, revisit **c11_acc_cbse_01_008** for Asset/Liability/Capital definitions and.',
          misconception: '**Misconception:** "Drawings reduce Liabilities because the owner takes money out, so the business owes less." **Why.',
          parts: [
                { id: 'a', prompt: 'State the Accounting Equation and name the three components with one-line definitions for each.', answer: '**Correct Answer:** Assets = Liabilities + Capital',
                  options: ['**Correct Answer:** Assets = Liabilities + Capital', 'Assets = Liabilities – Capital', 'money invested', 'profit'],
                  hint: 'If stuck, revisit **c11_acc_cbse_01_008** for Asset/Liability/Capital definitions and.',
                  misconception: '**Misconception:** "Drawings reduce Liabilities because the owner takes money out, so the business owes less." **Why students make this.' },
                { id: 'b', prompt: 'A student says: "When a business earns profit, Assets increase and Liabilities increase too, because profit is a liability to the owner." Explain why this.', answer: '**Correct Answer:** Profit increases Capital (owner\'s equity), not Liabilities',
                  options: ['**Correct Answer:** Profit increases Capital (owner\'s equity), not Liabilities', 'owner is also a creditor so it\'s a liability', 'I withdrew my money', 'I repaid myself'],
                  hint: 'If stuck, revisit **c11_acc_cbse_01_008** for Asset/Liability/Capital definitions and.',
                  misconception: '**Misconception:** "Drawings reduce Liabilities because the owner takes money out, so the business owes less." **Why students make this.' }
          ],
            remediations: { 'misconception-drawings-reduce-liabilities-becaus': { steps: ['**Step-by-step remediation:** 1.', '**Revisit Entity Concept (c11_acc_cbse_01_008):** Ask: "If you and your business are separate, who \'owns\' the cash.', '"When you take it, whose claim reduces?" → Yours (Capital).', '**Use T-account visual:** Draw Capital T-account.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_01_012', difficulty: 'standard',
          question: 'Limitations of accounting refer to the inherent constraints in financial.',
          hint: 'Revisit node c11_acc_cbse_01_005 "Qualitative Characteristics of Accounting Information".',
          misconception: 'Students often believe "limitations of accounting" means "accounting is flawed/useless" and therefore discount.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the "historical cost principle" creates a limitation for users comparing financial statements across time periods during high.', answer: 'Historical cost records assets at original purchase price',
                  options: ['Historical cost records assets at original purchase price', 'depreciation is wrong', 'limitations of accounting', 'accounting is flawed/useless'],
                  hint: 'Revisit node c11_acc_cbse_01_005 "Qualitative Characteristics of Accounting Information" and create.',
                  misconception: 'Students often believe "limitations of accounting" means "accounting is flawed/useless" and therefore discount financial statements.' }
          ],
            remediations: { 'limitations-of-accounting-means-accounting': { steps: ['Ask the student to list what a thermometer measures (temperature) and what it doesn\'t (humidity, air pressure).', 'Explain that a thermometer\'s inability to measure humidity is not a "defect"—it\'s a scope boundary.', 'Map this to accounting: financial statements are a "financial thermometer"—they measure financial position/performance.', 'Have the student re-read NCERT Section 1.4: "accounting information relates to the past transactions and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
