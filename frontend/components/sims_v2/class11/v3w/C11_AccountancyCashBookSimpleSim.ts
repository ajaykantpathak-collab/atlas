import type { SimDef } from '../../engine/types';
import C11_AccountancyCashBookSimpleSim from '../../../simulations/c6_12/C11_AccountancyCashBookSimpleSim';

/** v3 wrapped master — C11_AccountancyCashBookSimpleSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_accountancycashbooksimplesim: SimDef = {
    id: 'v3w_c11_accountancycashbooksimplesim',
    title: 'Cash Book Simple',
    subtitle: 'This node covers only the Single Column Cash Book: format, recording rules, balancing,.',
    classLevel: 11, subject: 'accountancy', topic: 'Cash Book: Simple Cash Book',
    chapters: [],
    nodeIds: ['c11_acc_cbse_04_001', 'c11_acc_cbse_03_007', 'c11_acc_cbse_03_010', 'c11_acc_cbse_04_002', 'c11_acc_cbse_04_003', 'c11_acc_cbse_04_004', 'c11_acc_cbse_04_005', 'c11_acc_cbse_04_006', 'c11_acc_cbse_04_007', 'c11_acc_cbse_04_008', 'c11_acc_cbse_04_009', 'c11_acc_cbse_09_008', 'c11_acc_cbse_09_005', 'c11_acc_cbse_01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you run a small kirana store. Every day you receive cash from customers and pay cash for purchases,.', goal: 'Master Cash Book Simple.' },
    discovery: {
        question: 'In the ledger account for "Cash", a journal entry shows "Cash A/c Dr. 10,000 To Sales A/c 10,000".',
        options: ['Correct answer: "Sales"', 'Capital', 'Furniture'],
        answer: 'Correct answer: "Sales"',
        hook: 'Students believe the Particulars column in a ledger account should repeat the account\'s own name (e.g., writing.',
    },
    teaching: [
        { title: 'A Simple Cash Book (Single Column Cash Book).', text: 'A Simple Cash Book (Single Column Cash Book) is a subsidiary book that records only cash receipts and cash payments in chronological order, with a single amount column on each side (debit for.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_acc_cbse_04_001', title: 'A Simple Cash Book (Single Column Cash.',
          scaffold: { problem: 'M/s Sharma Traders started business on 1st Jan 2024 with cash ₹50,000.',
            steps: [
            { text: 'Draw the format with Date, Particulars, L.F., Amount (₹) on both Debit (Receipts) and Credit (Payments) sides.' },
            { text: 'Enter opening balance "Balance b/d" on debit side with ₹50,000.' },
            { text: 'Record each receipt (Jan 3, 8, 15, 25) on debit side with date, particulars (Sales, Debtor, Sales, Commission), and.' },
            { text: 'Record each payment (Jan 5, 10, 12, 20, 28, 31) on credit side with date, particulars (Rent, Purchases, Wages,.' },
            { text: 'Total both columns: Debit total = 50,000+12,000+8,500+9,000+2,000 = ₹81,500; Credit total =.' },
            { text: 'Calculate balance: ₹81,500 - ₹31,500 = ₹50,000. Write "Balance c/d" on credit side with ₹50,000 to equalize totals.', faded: true, blankAnswer: 'Closing Cash Balance = ₹50,000 (Dr)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_03_007', title: 'A Journal is the primary book of.',
          scaffold: { problem: 'On 1st April 2024, Rohan started a business by investing ₹2,00,000 cash and ₹50,000 worth of furniture.',
            steps: [
            { text: 'Analyse Transaction 1 (1st April): Two assets increase (Cash, Furniture) and Capital increases.' },
            { text: 'Write Transaction 1 entry: Cash A/c Dr. 2,00,000; Furniture A/c Dr.' },
            { text: 'Analyse Transaction 2 (3rd April): Goods (Purchases) increase, Cash decreases.' },
            { text: 'Analyse Transaction 3 (5th April): Debtors (Sharma Enterprises) increase, Sales (revenue) increase, Stock (goods).' },
            { text: 'Combine all three entries in chronological order in journal format with Date, Particulars, L.F., Debit, Credit columns.', faded: true, blankAnswer: 'Journal' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_03_010', title: 'Posting is the systematic process of.',
          scaffold: { problem: 'Journalise and post the following transaction: On March 10, 2024, M/s Sharma Traders purchased office furniture for ₹45,000 from M/s.',
            steps: [
            { text: 'Identify accounts affected — Furniture (Asset, increase → Debit), Bank (Asset, decrease → Credit), M/s Woodcraft.' },
            { text: 'Write compound journal entry: Furniture A/c Dr. 45,000 To Bank A/c 15,000 To M/s Woodcraft A/c 30,000 (Narration:.' },
            { text: 'Post to Furniture Account (Debit side): Date: Mar 10 | Particulars: "Bank" (₹15,000) and "M/s Woodcraft" (₹30,000) on.' },
            { text: 'Post to Bank Account (Credit side): Date: Mar 10 | Particulars: "Furniture" | J.F.: journal page no. | Amount: 15,000.' },
            { text: 'Post to M/s Woodcraft Account (Credit side): Date: Mar 10 | Particulars: "Furniture" | J.F.: journal page no.' },
            { text: 'Cross-reference: Enter ledger page numbers in journal\'s L.F. column for each account.', faded: true, blankAnswer: 'Furniture A/c shows two debit lines (Bank 15,000; M/s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_04_002', title: 'A Two-column Cash Book records cash and.',
          scaffold: { problem: 'M/s Gupta Enterprises has the following transactions for March 2024. Prepare a Two-column Cash Book and balance it.',
            steps: [
            { text: 'Draw the Two-column Cash Book format with Date, Particulars, L.F., Cash, Bank on both Dr. and Cr. sides.' },
            { text: 'Record each transaction chronologically: (a) Cash sales → Dr. Cash ₹12,000. (b) Mohan\'s cheque deposited same day → Dr.' },
            { text: 'Total each column: Dr. Cash = 45,000+12,000+9,000+5,000 = 71,000; Cr. Cash = 10,000+9,000+7,000+3,500 = 29,500. Dr.' },
            { text: 'Balance each column: Cash balance = 71,000 - 29,500 = 41,500 (Dr., write "Balance c/d" on Cr. side).' },
            { text: 'Carry forward balances: Next period Dr. Cash ₹41,500, Dr. Bank ₹34,000. Verify totals match: Dr. Cash total = Cr.', faded: true, blankAnswer: 'Cash Book balanced with Cash in hand ₹41,500 (Dr.) and Cash.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_04_003', title: 'A Petty Cash Book is a subsidiary book.',
          scaffold: { problem: 'M/s Gupta Traders operates an imprest petty cash system with a float of ₹3,000. On 1st March, the petty cashier has the full imprest.',
            steps: [
            { text: 'Identify the analysis columns needed from the expense types: Conveyance (auto, taxi, bus), Postage & Courier,.' },
            { text: 'Draw the petty cash book format with columns: Date, Particulars, Voucher No., Total Paid, then analysis columns for.' },
            { text: 'Enter each transaction: write date, particulars, voucher no., total amount in Total Paid column, and the same amount in.' },
            { text: 'After all entries, total the Total Paid column (sum of all payments) and each analysis column.' },
            { text: 'Compute reimbursement amount = Total Paid total (since imprest is restored to ₹3,000).' },
            { text: 'In the main cash book (bank column), record reimbursement: Credit Bank (payment side) with reimbursement amount, Debit.', faded: true, blankAnswer: 'Total Paid = ₹2,500.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_04_004', title: 'The Purchase Book is a subsidiary book.',
          scaffold: { problem: 'M/s Delhi Traders (furniture dealers) had the following transactions in March 2024.',
            steps: [
            { text: 'Verify each transaction is a credit transaction of goods for resale - all qualify for Purchase/Sales Books.' },
            { text: 'Calculate net amount for each invoice after trade discount: Mar 02: (10×2500 + 5×8000) = 65,000; less 10% = ₹58,500.' },
            { text: 'Prepare Purchase Book with columns Date, Invoice No., Supplier Name, L.F., Amount.' },
            { text: 'Prepare Sales Book with columns Date, Invoice No., Customer Name, L.F., Amount.' },
            { text: 'Post daily to supplier/customer accounts: Wood Craft Cr. 58,500 (Mar 02) and 46,800 (Mar 25); Steel Furnishers Cr.' },
            { text: 'Post monthly totals: Purchases A/c Dr. 1,62,675 (Sundries as per Purchase Book); Sales A/c Cr.', faded: true, blankAnswer: 'Purchase Book Total ₹1,62,675; Sales Book Total ₹1,08,020..' }
            ] } },
        { type: 'dissect', nodeId: 'c11_acc_cbse_03_007', title: 'Identify each idea',
          dissect: { specimen: 'Cash Book Simple', spots: [
            { id: 's1', label: 'A Simple Cash Book Single', prompt: 'Which idea is this? — A Simple Cash Book (Single Column Cash Book) is a subsidiary book that records only cash.', answer: 'A Simple Cash Book Single', options: ['A Simple Cash Book Single', 'A Journal is the primary', 'Posting is the systematic process', 'A Two-column Cash Book records'] },
            { id: 's2', label: 'A Journal is the primary', prompt: 'Which idea is this? — A Journal is the primary book of original entry where business transactions are recorded.', answer: 'A Journal is the primary', options: ['A Journal is the primary', 'A Simple Cash Book Single', 'Posting is the systematic process', 'A Two-column Cash Book records'] },
            { id: 's3', label: 'Posting is the systematic process', prompt: 'Which idea is this? — Posting is the systematic process of transferring journal entries to their respective.', answer: 'Posting is the systematic process', options: ['Posting is the systematic process', 'A Simple Cash Book Single', 'A Journal is the primary', 'A Two-column Cash Book records'] },
            { id: 's4', label: 'A Two-column Cash Book records', prompt: 'Which idea is this? — A Two-column Cash Book records cash and bank transactions side-by-side with separate.', answer: 'A Two-column Cash Book records', options: ['A Two-column Cash Book records', 'A Simple Cash Book Single', 'A Journal is the primary', 'Posting is the systematic process'] },
            { id: 's5', label: 'A Petty Cash Book is', prompt: 'Which idea is this? — A Petty Cash Book is a subsidiary book maintained under the Imprest System to record.', answer: 'A Petty Cash Book is', options: ['A Petty Cash Book is', 'A Simple Cash Book Single', 'A Journal is the primary', 'Posting is the systematic process'] },
            { id: 's6', label: 'The Purchase Book is a', prompt: 'Which idea is this? — The Purchase Book is a subsidiary book used exclusively to record all credit purchases of.', answer: 'The Purchase Book is a', options: ['The Purchase Book is a', 'A Simple Cash Book Single', 'A Journal is the primary', 'Posting is the systematic process'] }
          ] } }
    ],
    explore: { component: C11_AccountancyCashBookSimpleSim, prompt: 'Explore the interactive — Cash Book Simple' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_001', difficulty: 'standard',
          question: 'A Simple Cash Book (Single Column Cash Book) is a subsidiary book that records.',
          hint: 'If stuck, revisit Class 6 Maths: Operations on Large Numbers (Addition/Subtraction) and.',
          misconception: 'Students often treat the Simple Cash Book exactly like a Cash Account in the ledger, writing "To Balance b/d" and "By.',
          parts: [
                { id: 'a', prompt: 'State the two sides of a Simple Cash Book and what each side records.', answer: 'The left side (Debit) records all cash receipts',
                  options: ['The left side (Debit) records all cash receipts', 'left records payments'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the Simple Cash Book exactly like a Cash Account in the ledger, writing "To Balance b/d" and "By Balance c/d" but.' },
                { id: 'b', prompt: 'Why does a Simple Cash Book always show a debit balance? Explain in your own words.', answer: 'Because cash payments can never exceed cash receipts plus opening cash in hand',
                  options: ['Because cash payments can never exceed cash receipts plus opening cash in hand', 'because of accounting rules'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the Simple Cash Book exactly like a Cash Account in the ledger, writing "To Balance b/d" and "By Balance c/d" but.' }
          ],
            remediations: { 'students-often-treat-the-simple': { steps: ['Ask the student to physically simulate a cash box – put in ₹100 (opening), add ₹50 (receipt), take out ₹30 (payment).', 'Map each physical action to the cash book columns: "Cash in hand" → Debit side; "Cash paid" → Credit side.', 'Give 3 transactions where one is a credit sale. Ask: "Does cash move?" No → don\'t record.', 'Practice L.F. column by posting one entry to a dummy ledger and writing the ledger page number in the cash book.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_007', difficulty: 'standard',
          question: 'A Journal is the primary book of original entry where business transactions are.',
          hint: 'If stuck on debit/credit decision, revisit the "Rules of Debit and Credit" summary chart.',
          misconception: 'Students often write the credit account on the same line as the debit account (e.g., "Cash A/c Dr.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Journal is the primary book of original entry where business transactions are recorded',
                  options: ['A Journal is the primary book of original entry where business transactions are recorded', 'A Simple Cash Book (Single Column Cash Book) is a subsidiary book that records only cash', 'Posting is the systematic process of transferring journal entries to their respective', 'A Two-column Cash Book records cash and bank transactions side-by-side with separate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the credit account on the same line as the debit account (e.g., "Cash A/c Dr.' }
          ],
            remediations: { 'students-often-write-the-credit': { steps: ['Show the student a printed journal page from a real manual accounting book (or NCERT Figure 3.5) and ask them to trace.', 'Have them practice writing 5 entries by hand on ruled paper, enforcing: (a) Debit account flush left, \'Dr.\' at right.', 'Give immediate feedback by checking each line against the format.', 'Explain that board examiners deduct marks for format errors even if accounts/amounts are correct — this is a.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_010', difficulty: 'standard',
          question: 'Posting is the systematic process of transferring journal entries to their.',
          hint: 'Review "Recording in Journal: Compound Journal Entry" (c11_acc_cbse_03_008) to practice.',
          misconception: 'Students believe the Particulars column in a ledger account should repeat the account\'s own name (e.g., writing.',
          parts: [
                { id: 'a', prompt: 'In the ledger account for "Cash", a journal entry shows "Cash A/c Dr. 10,000 To Sales A/c 10,000".', answer: 'Correct answer: "Sales"',
                  options: ['Correct answer: "Sales"', 'Capital', 'Furniture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Particulars column in a ledger account should repeat the account\'s own name (e.g., writing "Furniture" in Furniture.' },
                { id: 'b', prompt: 'Why is the Journal Folio (J.F.) column in the ledger filled at the time of posting, not at the time of journalising?', answer: 'Correct answer: The J.F',
                  options: ['Correct answer: The J.F', 'it\'s filled during journalising', 'Furniture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Particulars column in a ledger account should repeat the account\'s own name (e.g., writing "Furniture" in Furniture.' },
                { id: 'c', prompt: 'Compare the journal and ledger for the same transaction: "Rent A/c Dr. 5,000 To Bank A/c 5,000".', answer: 'The journal records the *entry* with debit account first (by convention)',
                  options: ['The journal records the *entry* with debit account first (by convention)', 'Furniture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Particulars column in a ledger account should repeat the account\'s own name (e.g., writing "Furniture" in Furniture.' }
          ],
            remediations: { 'the-particulars-column-in-a': { steps: ['Take a simple entry: "Cash A/c Dr.', '5,000 To Capital A/c 5,000".', 'Ask: "In Cash Account, did cash come from Capital or from Cash?" → It came from Capital.', 'Ask: "In Capital Account, did capital come from Cash or from Capital?" → It came from Cash.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Particulars column in a ledger account should repeat the account\'s own name (e.g., writing.',
          parts: [
                { id: 'a', prompt: 'A student posts a journal entry but forgets to enter the ledger page number in the journal\'s L.F. column.', answer: 'the accounting equation, (',
                  options: ['the accounting equation, (', 'the trial balance won\'t tally', 'Furniture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Particulars column in a ledger account should repeat the account\'s own name (e.g., writing "Furniture" in Furniture.' },
                { id: 'b', prompt: 'Design a compound journal entry (minimum 3 accounts) for a transaction where a business purchases a delivery van for ₹8,00,000, paying ₹2,00,000 by cheque and.', answer: 'Journal: Delivery Van A/c Dr',
                  options: ['Journal: Delivery Van A/c Dr', 'Furniture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Particulars column in a ledger account should repeat the account\'s own name (e.g., writing "Furniture" in Furniture.' }
          ],
            remediations: { 'the-particulars-column-in-a': { steps: ['Take a simple entry: "Cash A/c Dr.', '5,000 To Capital A/c 5,000".', 'Ask: "In Cash Account, did cash come from Capital or from Cash?" → It came from Capital.', 'Ask: "In Capital Account, did capital come from Cash or from Capital?" → It came from Cash.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_002', difficulty: 'standard',
          question: 'A Two-column Cash Book records cash and bank transactions side-by-side with.',
          hint: 'Revisit Simple Cash Book (c11_acc_cbse_04_001) balancing and posting, and review Class 6.',
          misconception: 'Students treat the Discount Allowed and Discount Received columns as accounts to be balanced (like cash/bank), carrying.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Two-column Cash Book records cash and bank transactions side-by-side with separate',
                  options: ['A Two-column Cash Book records cash and bank transactions side-by-side with separate', 'A Simple Cash Book (Single Column Cash Book) is a subsidiary book that records only cash', 'A Journal is the primary book of original entry where business transactions are recorded', 'Posting is the systematic process of transferring journal entries to their respective'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the Discount Allowed and Discount Received columns as accounts to be balanced (like cash/bank), carrying forward a "balance.' }
          ],
            remediations: { 'students-treat-the-discount-allowed': { steps: ['Ask the student: "Is Discount Allowed an asset you own or an expense you incurred?" (Expense).', '"Can you have a \'closing stock\' of discount?" (No).', 'Show the ledger posting from NCERT Illustration 2: Discount Allowed A/c is debited with the period total (₹750) and.', 'Have the student re-do a three-column cash book problem but stop after totaling discount columns — explicitly forbid.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_003', difficulty: 'standard',
          question: 'A Petty Cash Book is a subsidiary book maintained under the Imprest System to.',
          hint: 'If stuck, revisit the simple cash book (c11_acc_cbse_04_001) focusing on: (a) which side.',
          misconception: 'Students often treat the reimbursement cheque received by the petty cashier as a "receipt" in the petty cash book and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Petty Cash Book is a subsidiary book maintained under the Imprest System to record',
                  options: ['A Petty Cash Book is a subsidiary book maintained under the Imprest System to record', 'A Simple Cash Book (Single Column Cash Book) is a subsidiary book that records only cash', 'A Journal is the primary book of original entry where business transactions are recorded', 'Posting is the systematic process of transferring journal entries to their respective'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the reimbursement cheque received by the petty cashier as a "receipt" in the petty cash book and record it on the.' }
          ],
            remediations: { 'students-often-treat-the-reimbursement': { steps: ['**Physical demonstration:** Use play money – give student ₹2,000 (imprest), have them "spend" ₹1,500 on vouchers,.', 'Hand them a ₹1,500 cheque (paper).', 'Ask: "How much cash do you hold now?" (₹2,000).', '"Did you receive new money or just get back what you spent?" (Got back spent amount).'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_004', difficulty: 'standard',
          question: 'The Purchase Book is a subsidiary book used exclusively to record all credit.',
          hint: 'If stuck, revisit the fundamental journal entry for credit purchase and credit sale from.',
          misconception: 'Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They miss the critical.',
          parts: [
                { id: 'a', prompt: 'A student records a credit purchase of office furniture (for business use, not resale) in the Purchase Book. Is this correct?', answer: 'No, this is incorrect',
                  options: ['No, this is incorrect', 'any credit purchase', 'credit purchase of goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They miss the critical qualifiers: **credit**.' },
                { id: 'b', prompt: 'M/s Sharma Traders purchased goods on credit from M/s Gupta Suppliers for ₹50,000 (invoice no. 450) with 10% trade discount.', answer: 'Correct amount = ₹50,000 - 10% = ₹45,000',
                  options: ['Correct amount = ₹50,000 - 10% = ₹45,000', 'Purchase Book records all purchases', 'Sales Book records all sales'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They miss the critical qualifiers: **credit**.' }
          ],
            remediations: { 'purchase-book-records-all-purchases': { steps: ['Have the student create a 2×2 decision matrix: Rows = Credit vs Cash, Columns = Goods vs Non-Goods.', 'Place each book name in the correct cell: Purchase Book (Credit, Goods), Sales Book (Credit, Goods), Cash Book (Cash,.', 'Give 10 mixed transactions; student must place each in the matrix before recording.', 'Emphasize the "Goods for Resale" test: "Will this item be sold to customers in normal business?" If yes → Goods.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They miss the critical.',
          parts: [
                { id: 'a', prompt: 'A business maintains both a Purchase Book and a Cash Book. The accountant argues: "Since all purchases eventually involve cash payment, why not record credit.', answer: 'The argument is flawed',
                  options: ['The argument is flawed', 'Purchase Book records all purchases', 'Sales Book records all sales', '"Purchase Book records all purchases" and "Sales Book records all sales'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They miss the critical qualifiers: **credit**.' },
                { id: 'b', prompt: 'Design a transaction scenario where a student must decide between Purchase Book, Sales Book, Cash Book, and Journal Proper for four different but related.', answer: 'Example: (1) Bought goods on credit from X - Purchase Book',
                  options: ['Example: (1) Bought goods on credit from X - Purchase Book', 'Purchase Book records all purchases', 'Sales Book records all sales', '"Purchase Book records all purchases" and "Sales Book records all sales'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They miss the critical qualifiers: **credit**.' }
          ],
            remediations: { 'purchase-book-records-all-purchases': { steps: ['Have the student create a 2×2 decision matrix: Rows = Credit vs Cash, Columns = Goods vs Non-Goods.', 'Place each book name in the correct cell: Purchase Book (Credit, Goods), Sales Book (Credit, Goods), Cash Book (Cash,.', 'Give 10 mixed transactions; student must place each in the matrix before recording.', 'Emphasize the "Goods for Resale" test: "Will this item be sold to customers in normal business?" If yes → Goods.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
