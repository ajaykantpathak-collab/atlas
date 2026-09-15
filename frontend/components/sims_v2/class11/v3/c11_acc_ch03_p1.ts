import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch03_p1: SimDef = {
    id: 'v3_c11_acc_ch03_p1',
    title: 'Recording of Transactions - I · Part 1/2',
    subtitle: 'Classify accounts, apply debit-credit rules, and write your first journal entries.',
    classLevel: 11, subject: 'accountancy', topic: 'Recording of Transactions - I · Part 1/2',
    chapters: ['c11_acc_ch03'],
    nodeIds: ['c11_acc_cbse_03_001', 'c11_acc_cbse_03_002', 'c11_acc_cbse_03_003', 'c11_acc_cbse_03_004', 'c11_acc_cbse_03_005', 'c11_acc_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior accountant catching a firm\'s bookkeeping errors', intro: 'A ledger is just physics for money: every action has an equal and opposite entry.', goal: 'Classify accounts (personal, real, nominal) and record transactions correctly with source documents and vouchers.' },
    discovery: {
        question: 'You buy ₹5,000 of stationery on credit. The cashier insists only a \'cash\' transaction needs recording. What does the double-entry system say actually happened?',
        options: ['Two accounts changed — stationery went up and a liability to the supplier appeared', 'Nothing is recorded until the bill is paid', 'Only the stationery account is touched since goods arrived', 'A cash account entry with a future date is created'],
        answer: 'Two accounts changed — stationery went up and a liability to the supplier appeared',
        hook: 'Every transaction is a two-sided event — debit and credit are the two ends of one seesaw.',
    },
    teaching: [
        { title: 'Business Transactions and Source Documents', text: 'A business transaction is an economic event involving the exchange of goods, services, or assets between two parties that can be measured in monetary terms and changes the financial position of the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Break a batch of transactions into their dual effects and post them to the right accounts using the rules of debit and credit.',
        labels: ['Business Transactions and Source', 'Vouchers: Types and Preparation', 'Accounting Equation: Effect', 'Rules of Debit'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_001', title: 'Business Transactions and Source Documents',
          caseStudy: { intro: 'Imagine you go to a stationery shop and buy a notebook for ₹50, paying by UPI. The shopkeeper gives you a digital receipt. Is this a business transaction?',
            decisions: [{ prompt: 'A student says: "When my father gives me ₹500 as pocket money, that\'s a business transaction because money changed hands." Is the student.', options: [
                { text: 'No, the student is incorrect', outcome: 'No, the student is incorrect. A business transaction must involve an exchange between a business.' },
                { text: 'business transaction', outcome: 'Not quite — Students often think a "business transaction" is any activity involving money — like paying school.', reveals: 'a-business-transaction-is-any' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_002', title: 'Vouchers: Types and Preparation',
          caseStudy: { intro: 'Imagine you run a small stationery shop and a customer buys notebooks worth ₹2,500 paying by UPI.',
            decisions: [{ prompt: 'State the three mandatory elements that distinguish a valid accounting voucher from a rough note or informal memo.', options: [
                { text: 'A valid voucher must have: (1) Name of the firm printed on top, (2) Serial number in', outcome: 'A valid voucher must have: (1) Name of the firm printed on top, (2) Serial number in chronological.' },
                { text: 'amount', outcome: 'Not quite — Students believe "Voucher = Source Document" and use the terms interchangeably.', reveals: 'voucher-source-document-and-use' },
                { text: 'Voucher = Source Document', outcome: 'Not quite — Students believe "Voucher = Source Document" and use the terms interchangeably.', reveals: 'voucher-source-document-and-use' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_03_003', title: 'Accounting Equation: Effect of Transactions on Assets and Liabilities',
          scaffold: { problem: 'Riya starts a freelance graphic design business on 1st April 2024. She invests ₹2,00,000 cash and brings in a laptop worth ₹80,000.',
            steps: [
            { text: 'Identify the transaction — commencement of business with cash and asset.' },
            { text: 'Classify accounts affected: Cash (Asset), Laptop (Asset), Capital (Owner\'s Equity).' },
            { text: 'Determine direction: Cash increases by ₹2,00,000; Laptop increases by ₹80,000; Capital increases by ₹2,80,000 (total.' },
            { text: 'Apply to equation: Assets = Cash ₹2,00,000 + Laptop ₹80,000 = ₹2,80,000; Liabilities = 0; Capital = ₹2,80,000.' },
            { text: 'Interpret — the business now has resources of ₹2,80,000 funded entirely by the owner; no outsider claims exist.', faded: true, blankAnswer: 'Assets = ₹2,80,000 (Cash ₹2,00,000 + Laptop ₹80,000).' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_004', title: 'Rules of Debit and Credit for Assets, Liabilities and Capital',
          caseStudy: { intro: 'Imagine you\'re helping your uncle track his new electronics shop.',
            decisions: [{ prompt: 'State the rule for debit and credit regarding an increase in an asset account and an increase in a liability account.', options: [
                { text: 'Increase in asset is debited', outcome: 'Increase in asset is debited; increase in liability is credited.' },
                { text: 'increase in liability is debited', outcome: 'Not quite — Students treat "debit" and "credit" as synonyms for "increase" and "decrease" respectively.', reveals: 'students-treat-debit-and-credit' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_005', title: 'Rules of Debit and Credit for Expenses and Revenues',
          caseStudy: { intro: 'Imagine you run a small online tutoring business. You pay ₹2,000 for internet (an expense) and receive ₹15,000 from a student for a month of classes (revenue).',
            decisions: [{ prompt: 'State the debit/credit rule for expenses and for revenues according to the modern accounting equation approach.', options: [
                { text: 'Expenses: Increase → Debit, Decrease → Credit', outcome: 'Expenses: Increase → Debit, Decrease → Credit. Revenues: Increase → Credit, Decrease → Debit.' },
                { text: 'expenses increase → credit', outcome: 'Not quite — Students treat expense accounts exactly like asset accounts because both are debited when they.', reveals: 'students-treat-expense-accounts-exactly' },
                { text: 'Prepaid rent is an expense so we debit Rent Expense when paid in advance', outcome: 'Not quite — Students treat expense accounts exactly like asset accounts because both are debited when they.', reveals: 'students-treat-expense-accounts-exactly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_006', title: 'Rules of Debit and Credit: Traditional Classification Approach',
          caseStudy: { intro: 'Imagine you are helping your uncle record transactions for his kirana store.',
            decisions: [{ prompt: 'State the three categories of accounts in the traditional classification and the golden rule for each.', options: [
                { text: 'The three categories are Personal, Real, and Nominal', outcome: 'The three categories are Personal, Real, and Nominal. Personal: Debit the receiver, Credit the.' },
                { text: 'Assets, Liabilities, Capital', outcome: 'Not quite — Students often treat "Bank Account" as a Real account because it deals with money, and they apply.', reveals: 'students-often-treat-bank-account' },
                { text: 'Assets, Liabilities, Capital" or swapping the rules', outcome: 'Not quite — Students often treat "Bank Account" as a Real account because it deals with money, and they apply.', reveals: 'students-often-treat-bank-account' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Interning at your uncle\'s electronics shop, you\'re asked to enter the day\'s transactions. The counter boy says: \'Sold a phone for ₹14,000 cash to a walk-in — no bill was printed, but I remember it. Also, uncle took ₹2,000 from the till for his daughter\'s school fees. And a supplier delivered ₹30,000 of stock on credit — the invoice is in the drawer.\'',
            decisions: [{ prompt: 'What do you record, and on what evidence?', options: [
                { text: 'Record the cash sale by issuing a cash memo now (no source document, no entry), the supplier\'s credit purchase from the invoice, and uncle\'s ₹2,000 as drawings — a business transaction because it changes the firm\'s position.', outcome: 'Every entry needs a source document; and the owner\'s drawing changes the firm\'s capital even though it feels \'personal\'.' },
                { text: 'Record the phone sale from the counter boy\'s memory — a transaction happened, so evidence is optional.', outcome: 'Memory is not verifiable evidence; without a source document the entry has no objective proof and the books can\'t be audited.', reveals: 'memory-is-a-source-document' },
                { text: 'Skip uncle\'s ₹2,000 — it\'s his personal family expense, so it\'s not a business transaction.', outcome: 'The money came from the firm\'s till, so the firm\'s cash and capital both changed; drawings is a business transaction even though the purpose was personal.', reveals: 'owner-drawings-not-transaction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Double-entry isn\'t double work — it\'s a built-in error detector. If both sides don\'t move, the story is incomplete.',
            decisions: [{ prompt: 'What comes next? Recording of Transactions - I · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Recording of Transactions - I · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_001', difficulty: 'standard',
          question: 'A business transaction is an economic event involving the exchange of goods.',
          hint: 'Revisit Chapter 1: "Business Entity Concept" and "Money Measurement Concept".',
          misconception: 'Students often think a "business transaction" is any activity involving money — like paying school fees, lending ₹100.',
          parts: [
                { id: 'a', prompt: 'A student says: "When my father gives me ₹500 as pocket money, that\'s a business transaction because money changed hands." Is the student correct?', answer: 'No, the student is incorrect',
                  options: ['No, the student is incorrect', 'business transaction'],
                  hint: 'Revisit Chapter 1: "Business Entity Concept" and "Money Measurement Concept" — specifically the.',
                  misconception: 'Students often think a "business transaction" is any activity involving money — like paying school fees, lending ₹100 to a friend,.' },
                { id: 'b', prompt: 'A shopkeeper sells goods worth ₹2,000 to a customer on credit. No invoice is issued, but the shopkeeper records it in a personal diary from memory.', answer: 'No, the diary entry is not a valid source document',
                  options: ['No, the diary entry is not a valid source document', 'business transaction'],
                  hint: 'Revisit Chapter 1: "Business Entity Concept" and "Money Measurement Concept" — specifically the.',
                  misconception: 'Students often think a "business transaction" is any activity involving money — like paying school fees, lending ₹100 to a friend,.' },
                { id: 'c', prompt: 'Identify the source document for each: (a) Business deposits ₹50,000 cash into bank. (b) Business buys furniture on credit from M/s Delhi Furnishers.', answer: 'Business deposits ₹50,000 cash into bank',
                  options: ['Business deposits ₹50,000 cash into bank', 'business transaction'],
                  hint: 'Revisit Chapter 1: "Business Entity Concept" and "Money Measurement Concept" — specifically the.',
                  misconception: 'Students often think a "business transaction" is any activity involving money — like paying school fees, lending ₹100 to a friend,.' }
          ],
            remediations: { 'a-business-transaction-is-any': { steps: ['Revisit Chapter 1\'s "Business Entity Concept" — the firm is separate from the owner.', 'For any event, ask: "Does this change the *firm\'s* assets, liabilities, or capital?" If yes → business transaction.', 'Then ask: "What *original document* proves it?" If external document exists → that\'s the source document.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a "business transaction" is any activity involving money — like paying school fees, lending ₹100.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "A transaction without a source document cannot be recorded in the books of accounts." Is it always true?', answer: 'The statement is generally true but has an exception',
                  options: ['The statement is generally true but has an exception', 'A student who says', 'misses the internal voucher exception', 'ignores the evidentiary foundation of accounting'],
                  hint: 'Revisit Chapter 1: "Business Entity Concept" and "Money Measurement Concept" — specifically the.',
                  misconception: 'Students often think a "business transaction" is any activity involving money — like paying school fees, lending ₹100 to a friend,.' }
          ],
            remediations: { 'a-business-transaction-is-any': { steps: ['Revisit Chapter 1\'s "Business Entity Concept" — the firm is separate from the owner.', 'For any event, ask: "Does this change the *firm\'s* assets, liabilities, or capital?" If yes → business transaction.', 'Then ask: "What *original document* proves it?" If external document exists → that\'s the source document.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_002', difficulty: 'standard',
          question: 'A voucher is a written document that serves as the primary evidence of.',
          hint: 'Revisit "Business Transactions and Source Documents" (c11_acc_cbse_03_001) — specifically.',
          misconception: 'Students believe "Voucher = Source Document" and use the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'A student says: "Since a Compound Voucher has multiple debits and one credit, a transaction with two debits and two credits is also a Compound Voucher.".', answer: 'Incorrect',
                  options: ['Incorrect', 'Voucher = Source Document', '"Voucher = Source Document" and use the terms interchangeably'],
                  hint: 'Revisit "Business Transactions and Source Documents" (c11_acc_cbse_03_001) — specifically the "Give.',
                  misconception: 'Students believe "Voucher = Source Document" and use the terms interchangeably.' }
          ],
            remediations: { 'voucher-source-document-and-use': { steps: ['Show two physical papers side-by-side — a supplier\'s printed invoice (source document) and a blank voucher form.', 'Trace the flow: Invoice arrives → Voucher prepared → Journal entry made → Ledger posted.', 'Give a transaction where source document is missing (e.g., petty cash expense) — ask "What do we do?" → Prepare voucher.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_003', difficulty: 'standard',
          question: 'The accounting equation (A = L + C) expresses the fundamental duality that.',
          hint: 'If stuck, revisit the classification of accounts into Assets, Liabilities, Capital.',
          misconception: 'Students believe that "Capital increases only when owner invests cash" and "Expenses are Liabilities." They treat Rent.',
          parts: [
                { id: 'a', prompt: 'A student says: "When a business earns profit, liabilities increase because the business owes more to the owner." Explain why this statement is incorrect using.', answer: 'Profit increases Capital (owner\'s equity), not Liabilities',
                  options: ['Profit increases Capital (owner\'s equity), not Liabilities', 'Capital increases only when owner invests cash', 'Expenses are Liabilities', '"Capital increases only when owner invests cash" and "Expenses are Liabilities'],
                  hint: 'If stuck, revisit the classification of accounts into Assets, Liabilities, Capital, Revenue.',
                  misconception: 'Students believe that "Capital increases only when owner invests cash" and "Expenses are Liabilities." They treat Rent Paid as increasing.' },
                { id: 'b', prompt: 'Transaction: "Paid ₹12,000 cash for office rent." Show the effect on the accounting equation using a 3-column format (Assets, Liabilities, Capital) with.', answer: 'Assets: Cash −₹12,000',
                  options: ['Assets: Cash −₹12,000', 'Capital increases only when owner invests cash', 'Expenses are Liabilities', '"Capital increases only when owner invests cash" and "Expenses are Liabilities'],
                  hint: 'If stuck, revisit the classification of accounts into Assets, Liabilities, Capital, Revenue.',
                  misconception: 'Students believe that "Capital increases only when owner invests cash" and "Expenses are Liabilities." They treat Rent Paid as increasing.' },
                { id: 'c', prompt: 'Compare the effect on the accounting equation of: (a) Purchasing machinery for ₹50,000 cash, and (b) Purchasing machinery for ₹50,000 on credit.', answer: 'Purchasing machinery for ₹50,000 cash, and (',
                  options: ['Purchasing machinery for ₹50,000 cash, and (', 'Capital increases only when owner invests cash', 'Expenses are Liabilities', '"Capital increases only when owner invests cash" and "Expenses are Liabilities'],
                  hint: 'If stuck, revisit the classification of accounts into Assets, Liabilities, Capital, Revenue.',
                  misconception: 'Students believe that "Capital increases only when owner invests cash" and "Expenses are Liabilities." They treat Rent Paid as increasing.' }
          ],
            remediations: { 'capital-increases-only-when-owner': { steps: ['Return to the dual-aspect concept: every transaction has two effects — a "give" and a "take." Use physical tokens (two.', 'Practice classifying 20 items as Asset, Liability, Capital, Revenue, Expense using the NCERT chart (p.54).', 'For each transaction, ask: "Who gave?', 'Who took?" then map to A/L/C.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_004', difficulty: 'standard',
          question: 'The rules of debit and credit for assets, liabilities, and capital (modern.',
          hint: 'Revisit the accounting equation analysis table in c11_acc_cbse_03_003 (Illustration 1).',
          misconception: 'Students treat "debit" and "credit" as synonyms for "increase" and "decrease" respectively, ignoring account.',
          parts: [
                { id: 'a', prompt: 'State the rule for debit and credit regarding an increase in an asset account and an increase in a liability account.', answer: 'Increase in asset is debited',
                  options: ['Increase in asset is debited', 'increase in liability is debited'],
                  hint: 'Revisit the accounting equation analysis table in c11_acc_cbse_03_003 (Illustration 1) and practice.',
                  misconception: 'Students treat "debit" and "credit" as synonyms for "increase" and "decrease" respectively, ignoring account classification.' }
          ],
            remediations: { 'students-treat-debit-and-credit': { steps: ['Draw the accounting equation (A = L + C) as a large T-shape on paper.', 'Label left side "Assets (Debit)" and right side "Liabilities + Capital (Credit)." 2.', 'For the failed transaction, place each account on its correct side of the T.', 'Ask: "Is this account increasing or decreasing?" If increasing, write the amount on its native side; if decreasing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_005', difficulty: 'standard',
          question: 'The rules of debit and credit for expenses and revenues state that: (1).',
          hint: 'Review the accounting equation analysis table in NCERT Chapter 3 (pages 51-52) showing.',
          misconception: 'Students treat expense accounts exactly like asset accounts because both are debited when they increase.',
          parts: [
                { id: 'a', prompt: 'State the debit/credit rule for expenses and for revenues according to the modern accounting equation approach.', answer: 'Expenses: Increase → Debit, Decrease → Credit',
                  options: ['Expenses: Increase → Debit, Decrease → Credit', 'expenses increase → credit', 'Prepaid rent is an expense so we debit Rent Expense when paid in advance'],
                  hint: 'Review the accounting equation analysis table in NCERT Chapter 3 (pages 51-52) showing how each.',
                  misconception: 'Students treat expense accounts exactly like asset accounts because both are debited when they increase.' },
                { id: 'b', prompt: 'A student argues: "Since rent paid is an outflow of cash, we should credit Rent Expense because cash is credited." Explain why this reasoning is incorrect.', answer: 'Rent paid decreases cash (asset) → credit Cash',
                  options: ['Rent paid decreases cash (asset) → credit Cash', 'Prepaid rent is an expense so we debit Rent Expense when paid in advance'],
                  hint: 'Review the accounting equation analysis table in NCERT Chapter 3 (pages 51-52) showing how each.',
                  misconception: 'Students treat expense accounts exactly like asset accounts because both are debited when they increase.' },
                { id: 'c', prompt: 'Pass the journal entry for: "Paid ₹8,000 salary to employees by cheque." Identify the accounts affected, their types, and the debit/credit for each.', answer: 'Salary A/c Dr',
                  options: ['Salary A/c Dr', 'payment', 'expense recognition', 'Prepaid rent is an expense so we debit Rent Expense when paid in advance'],
                  hint: 'Review the accounting equation analysis table in NCERT Chapter 3 (pages 51-52) showing how each.',
                  misconception: 'Students treat expense accounts exactly like asset accounts because both are debited when they increase.' },
                { id: 'd', prompt: 'Compare these two transactions: (A) Received ₹5,000 commission in advance from a client. (B) Earned ₹5,000 commission by providing services.', answer: '(A) Cash ↑ (Asset, Debit) + Unearned Commission ↑ (Liability, Credit)',
                  options: ['(A) Cash ↑ (Asset, Debit) + Unearned Commission ↑ (Liability, Credit)', 'Prepaid rent is an expense so we debit Rent Expense when paid in advance'],
                  hint: 'Review the accounting equation analysis table in NCERT Chapter 3 (pages 51-52) showing how each.',
                  misconception: 'Students treat expense accounts exactly like asset accounts because both are debited when they increase.' }
          ],
            remediations: { 'students-treat-expense-accounts-exactly': { steps: ['Have the student write the expanded accounting equation: Assets = Liabilities + Capital + Revenues - Expenses.', 'Ask them to identify which side of the equation each item falls on.', 'Show that Expenses are subtracted from Capital (so increase in expense = decrease in capital = debit), while Revenues.', 'Practice 5 transactions where they must first state the effect on Capital, then derive the debit/credit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_006', difficulty: 'standard',
          question: 'The traditional classification approach categorizes all accounts into three.',
          hint: 'If stuck, revisit the classification of accounts into Personal, Real, Nominal (from your.',
          misconception: 'Students often treat "Bank Account" as a Real account because it deals with money, and they apply "Debit what comes in".',
          parts: [
                { id: 'a', prompt: 'State the three categories of accounts in the traditional classification and the golden rule for each.', answer: 'The three categories are Personal, Real, and Nominal',
                  options: ['The three categories are Personal, Real, and Nominal', 'Assets, Liabilities, Capital', 'Assets, Liabilities, Capital" or swapping the rules'],
                  hint: 'If stuck, revisit the classification of accounts into Personal, Real, Nominal (from your textbook\'s.',
                  misconception: 'Students often treat "Bank Account" as a Real account because it deals with money, and they apply "Debit what comes in" when cash.' }
          ],
            remediations: { 'students-often-treat-bank-account': { steps: ['Draw a three-column table on paper: Personal / Real / Nominal.', 'List 10 accounts (Cash, Bank, Rent, Sales, Debtor, Creditor, Furniture, Salary, Capital, Drawings) and force the.', 'For each account, write the traditional rule next to it.', 'Pick two transactions and have the student derive the entry using both traditional and modern rules side-by-side.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
