import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch04_p1: SimDef = {
    id: 'v3_c11_acc_ch04_p1',
    title: 'Recording of Transactions - II · Part 1/2',
    subtitle: 'Route transactions through purchases book, sales book, return books and cash book.',
    classLevel: 11, subject: 'accountancy', topic: 'Recording of Transactions - II · Part 1/2',
    chapters: ['c11_acc_ch04'],
    nodeIds: ['c11_acc_cbse_04_001', 'c11_acc_cbse_04_002', 'c11_acc_cbse_04_003', 'c11_acc_cbse_04_004', 'c11_acc_cbse_04_005', 'c11_acc_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a bookkeeper untangling a wholesale trader\'s paperwork', intro: 'One journal for everything doesn\'t scale. Time to build the sorting system real businesses use.', goal: 'Prepare subsidiary books and the cash book, and distinguish trade discount from cash discount.' },
    discovery: {
        question: 'A trader returns damaged goods worth ₹8,000 to his supplier. His assistant records it as a purchase. What\'s wrong — and which special book should catch it?',
        options: ['It\'s a purchase return, recorded in the purchases return book, reducing what the firm owes', 'Nothing is wrong — all goods leaving count as purchases', 'It belongs in the sales book since goods moved out', 'It goes in the cash book as a refund due'],
        answer: 'It\'s a purchase return, recorded in the purchases return book, reducing what the firm owes',
        hook: 'Subsidiary books exist because direction matters — goods coming in and going out are opposite stories.',
    },
    teaching: [
        { title: 'Cash Book: Simple Cash Book', text: 'A Simple Cash Book (Single Column Cash Book) is a subsidiary book that records only cash receipts and cash payments in chronological order, with a single amount column on each side (debit for.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort a messy pile of invoices into the right subsidiary books — purchases, sales, returns, and the cash book.',
        labels: ['Cash Book: Simple Cash', 'Cash Book: Two-column', 'Cash Book: Petty Cash', 'Purchase Book and Sales', 'Purchase Return Book', 'Journal Proper: Transactions not'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_04_001', title: 'Cash Book: Simple Cash Book',
          scaffold: { problem: 'M/s Sharma Traders started business on 1st Jan 2024 with cash ₹50,000.',
            steps: [
            { text: 'Draw the format with Date, Particulars, L.F., Amount (₹) on both Debit (Receipts) and Credit (Payments) sides.' },
            { text: 'Enter opening balance "Balance b/d" on debit side with ₹50,000.' },
            { text: 'Record each receipt (Jan 3, 8, 15, 25) on debit side with date, particulars (Sales, Debtor, Sales, Commission), and.' },
            { text: 'Record each payment (Jan 5, 10, 12, 20, 28, 31) on credit side with date, particulars (Rent, Purchases, Wages.' },
            { text: 'Total both columns: Debit total = 50,000+12,000+8,500+9,000+2,000 = ₹81,500; Credit total.' },
            { text: 'Calculate balance: ₹81,500 - ₹31,500 = ₹50,000. Write "Balance c/d" on credit side with ₹50,000 to equalize totals.', faded: true, blankAnswer: 'Closing Cash Balance = ₹50,000 (Dr)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_04_002', title: 'Cash Book: Two-column and Three-column Cash Book',
          scaffold: { problem: 'M/s Gupta Enterprises has the following transactions for March 2024. Prepare a Two-column Cash Book and balance it.',
            steps: [
            { text: 'Draw the Two-column Cash Book format with Date, Particulars, L.F., Cash, Bank on both Dr. and Cr. sides.' },
            { text: 'Record each transaction chronologically: (a) Cash sales → Dr. Cash ₹12,000. (b) Mohan\'s cheque deposited same day → Dr.' },
            { text: 'Total each column: Dr. Cash = 45,000+12,000+9,000+5,000 = 71,000; Cr. Cash = 10,000+9,000+7,000+3,500 = 29,500. Dr.' },
            { text: 'Balance each column: Cash balance = 71,000 - 29,500 = 41,500 (Dr., write "Balance c/d" on Cr. side).' },
            { text: 'Carry forward balances: Next period Dr. Cash ₹41,500, Dr. Bank ₹34,000. Verify totals match: Dr. Cash total = Cr.', faded: true, blankAnswer: 'Cash Book balanced with Cash in hand ₹41,500 (Dr.) and Cash.' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_04_003', title: 'Cash Book: Petty Cash Book and Imprest System',
          caseStudy: { intro: 'Imagine you are the office manager of a busy stationery shop in Delhi.',
            decisions: [{ prompt: 'What is the meaning of "imprest amount" in the context of a petty cash book, and how does it differ from the opening cash balance in.', options: [
                { text: 'The imprest amount is a fixed, pre-determined float advanced to the petty cashier at the', outcome: 'The imprest amount is a fixed, pre-determined float advanced to the petty cashier at the start.' },
                { text: 'imprest amount is just the opening balance', outcome: 'Not quite — Students often treat the reimbursement cheque received by the petty cashier as a "receipt" in the.', reveals: 'students-often-treat-the-reimbursement' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_04_004', title: 'Purchase Book and Sales Book: Recording Credit Transactions',
          caseStudy: { intro: 'Imagine you run a stationery shop and a school orders 500 notebooks on credit - you don\'t receive cash immediately, but you\'ve sold goods.',
            decisions: [{ prompt: 'A student records a credit purchase of office furniture (for business use, not resale) in the Purchase Book. Is this correct?', options: [
                { text: 'No, this is incorrect', outcome: 'No, this is incorrect. The Purchase Book records only credit purchases of goods meant for resale.' },
                { text: 'any credit purchase', outcome: 'Not quite — Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They.', reveals: 'purchase-book-records-all-purchases' },
                { text: 'credit purchase of goods', outcome: 'Not quite — Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They.', reveals: 'purchase-book-records-all-purchases' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_04_005', title: 'Purchase Return Book and Sales Return Book',
          caseStudy: { intro: 'Imagine you run a stationery shop and a customer returns 5 defective notebooks you sold on credit last week.',
            decisions: [{ prompt: 'What is the source document for recording entries in the Purchase Return Book, and which account is credited with the periodic total.', options: [
                { text: 'The source document is a Debit Note (prepared by the buyer and sent to the supplier)', outcome: 'The source document is a Debit Note (prepared by the buyer and sent to the supplier).' },
                { text: 'return means we owe less', outcome: 'Not quite — Students often think that a Purchase Return Book entry credits the Supplier\'s Account (because.', reveals: 'a-purchase-return-book-entry' },
                { text: 'Credit Note or crediting Purchases Account', outcome: 'Not quite — Students often think that a Purchase Return Book entry credits the Supplier\'s Account (because.', reveals: 'a-purchase-return-book-entry' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_04_006', title: 'Journal Proper: Transactions not Recorded in Special Journals',
          caseStudy: { intro: 'Imagine you are the accountant for a growing furniture shop. You have neatly recorded all cash sales in the Cash Book, credit sales in the Sales Book, and.',
            decisions: [{ prompt: 'A business purchases a delivery van on credit from Mahindra & Mahindra for ₹8,00,000.', options: [
                { text: 'Journal Proper', outcome: 'Journal Proper. The Purchases Book records only credit purchases of *goods* (items meant for.' },
                { text: 'purchases', outcome: 'Not quite — Students often think "Journal Proper is only for rare/errors entries" and miss that **Opening.', reveals: 'journal-proper-is-only-for' },
                { text: 'Journal Proper is only for rare/errors entries', outcome: 'Not quite — Students often think "Journal Proper is only for rare/errors entries" and miss that **Opening.', reveals: 'journal-proper-is-only-for' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'As treasurer of the school canteen co-op you keep a Simple Cash Book. Today\'s slip reads: \'Cash sales ₹3,400; paid for bread ₹900; sold 20 coupon books to Class 12 on credit ₹2,000 (they\'ll pay Monday); deposited ₹1,500 of the cash into the co-op\'s bank account.\' A junior member insists all four lines go on the cash book\'s receipts side.',
            decisions: [{ prompt: 'What actually goes into the cash book, and where?', options: [
                { text: 'Debit side: cash sales ₹3,400. Credit side: bread payment ₹900. The bank deposit is a contra entry (cash out, bank in). The credit coupon sale is excluded entirely — no cash moved today.', outcome: 'The Simple Cash Book records only cash movements; the credit sale waits for Monday\'s cash, and the deposit touches both sides as a contra entry.' },
                { text: 'Record the ₹2,000 coupon sale as a receipt — a sale is a sale, and the money is as good as received.', outcome: 'Until cash actually moves, a credit sale has no place in a cash book; recording it inflates cash in hand that doesn\'t exist.', reveals: 'credit-sale-in-cash-book' },
                { text: 'Show the bank deposit only once — as a payment — since cash physically left the drawer.', outcome: 'A deposit moves value between two accounts the business owns; it must appear on both sides as a contra entry or the bank record won\'t reconcile.', reveals: 'contra-entry-half-recorded' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Special journals are traffic control: they send each transaction down the right lane so the ledger stays clean.',
            decisions: [{ prompt: 'What comes next? Recording of Transactions - II · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Recording of Transactions - II · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_001', difficulty: 'standard',
          question: 'A Simple Cash Book (Single Column Cash Book) is a subsidiary book that records.',
          hint: 'If stuck, revisit Class 6 Maths: Operations on Large Numbers (Addition/Subtraction) and.',
          misconception: 'Students often treat the Simple Cash Book exactly like a Cash Account in the ledger, writing "To Balance b/d" and "By.',
          parts: [
                { id: 'a', prompt: 'State the two sides of a Simple Cash Book and what each side records.', answer: 'The left side (Debit) records all cash receipts',
                  options: ['The left side (Debit) records all cash receipts', 'left records payments'],
                  hint: 'If stuck, revisit Class 6 Maths: Operations on Large Numbers (Addition/Subtraction) and Class 6.',
                  misconception: 'Students often treat the Simple Cash Book exactly like a Cash Account in the ledger, writing "To Balance b/d" and "By Balance c/d" but.' },
                { id: 'b', prompt: 'Why does a Simple Cash Book always show a debit balance? Explain in your own words.', answer: 'Because cash payments can never exceed cash receipts plus opening cash in hand',
                  options: ['Because cash payments can never exceed cash receipts plus opening cash in hand', 'because of accounting rules'],
                  hint: 'If stuck, revisit Class 6 Maths: Operations on Large Numbers (Addition/Subtraction) and Class 6.',
                  misconception: 'Students often treat the Simple Cash Book exactly like a Cash Account in the ledger, writing "To Balance b/d" and "By Balance c/d" but.' }
          ],
            remediations: { 'students-often-treat-the-simple': { steps: ['Ask the student to physically simulate a cash box – put in ₹100 (opening), add ₹50 (receipt), take out ₹30 (payment).', 'Map each physical action to the cash book columns: "Cash in hand" → Debit side; "Cash paid" → Credit side.', 'Give 3 transactions where one is a credit sale. Ask: "Does cash move?" No → don\'t record.', 'Practice L.F. column by posting one entry to a dummy ledger and writing the ledger page number in the cash book.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_002', difficulty: 'standard',
          question: 'A Two-column Cash Book records cash and bank transactions side-by-side with.',
          hint: 'Revisit Simple Cash Book (c11_acc_cbse_04_001) balancing and posting, and review Class 6.',
          misconception: 'Students treat the Discount Allowed and Discount Received columns as accounts to be balanced (like cash/bank), carrying.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Two-column Cash Book records cash and bank transactions side-by-side with separate',
                  options: ['A Two-column Cash Book records cash and bank transactions side-by-side with separate', 'A Simple Cash Book (Single Column Cash Book) is a subsidiary book that records only cash', 'A Petty Cash Book is a subsidiary book maintained under the Imprest System to record', 'The Purchase Book is a subsidiary book used exclusively to record all credit purchases of'],
                  hint: 'Revisit Simple Cash Book (c11_acc_cbse_04_001) balancing and posting, and review Class 6 Economics.',
                  misconception: 'Students treat the Discount Allowed and Discount Received columns as accounts to be balanced (like cash/bank), carrying forward a "balance.' }
          ],
            remediations: { 'students-treat-the-discount-allowed': { steps: ['Ask the student: "Is Discount Allowed an asset you own or an expense you incurred?" (Expense).', '"Can you have a \'closing stock\' of discount?" (No).', 'Show the ledger posting from NCERT Illustration 2: Discount Allowed A/c is debited with the period total (₹750) and.', 'Have the student re-do a three-column cash book problem but stop after totaling discount columns — explicitly forbid.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_003', difficulty: 'standard',
          question: 'A Petty Cash Book is a subsidiary book maintained under the Imprest System.',
          hint: 'If stuck, revisit the simple cash book (c11_acc_cbse_04_001) focusing on: (a) which side.',
          misconception: 'Students often treat the reimbursement cheque received by the petty cashier as a "receipt" in the petty cash book and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Petty Cash Book is a subsidiary book maintained under the Imprest System to record',
                  options: ['A Petty Cash Book is a subsidiary book maintained under the Imprest System to record', 'A Simple Cash Book (Single Column Cash Book) is a subsidiary book that records only cash', 'A Two-column Cash Book records cash and bank transactions side-by-side with separate', 'The Purchase Book is a subsidiary book used exclusively to record all credit purchases of'],
                  hint: 'If stuck, revisit the simple cash book (c11_acc_cbse_04_001) focusing on: (a) which side records.',
                  misconception: 'Students often treat the reimbursement cheque received by the petty cashier as a "receipt" in the petty cash book and record it on the.' }
          ],
            remediations: { 'students-often-treat-the-reimbursement': { steps: ['**Physical demonstration:** Use play money – give student ₹2,000 (imprest), have them "spend" ₹1,500 on vouchers.', 'Hand them a ₹1,500 cheque (paper).', 'Ask: "How much cash do you hold now?" (₹2,000).', '"Did you receive new money or just get back what you spent?" (Got back spent amount).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_004', difficulty: 'standard',
          question: 'The Purchase Book is a subsidiary book used exclusively to record all credit.',
          hint: 'If stuck, revisit the fundamental journal entry for credit purchase and credit sale from.',
          misconception: 'Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They miss the critical.',
          parts: [
                { id: 'a', prompt: 'A student records a credit purchase of office furniture (for business use, not resale) in the Purchase Book. Is this correct?', answer: 'No, this is incorrect',
                  options: ['No, this is incorrect', 'any credit purchase', 'credit purchase of goods', 'Purchase Book records all purchases'],
                  hint: 'If stuck, revisit the fundamental journal entry for credit purchase and credit sale from Chapter 3.',
                  misconception: 'Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They miss the critical qualifiers: **credit**.' },
                { id: 'b', prompt: 'M/s Sharma Traders purchased goods on credit from M/s Gupta Suppliers for ₹50,000 (invoice no. 450) with 10% trade discount.', answer: 'Correct amount = ₹50,000 - 10% = ₹45,000',
                  options: ['Correct amount = ₹50,000 - 10% = ₹45,000', 'Purchase Book records all purchases', 'Sales Book records all sales', '"Purchase Book records all purchases" and "Sales Book records all sales'],
                  hint: 'If stuck, revisit the fundamental journal entry for credit purchase and credit sale from Chapter 3.',
                  misconception: 'Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They miss the critical qualifiers: **credit**.' }
          ],
            remediations: { 'purchase-book-records-all-purchases': { steps: ['Have the student create a 2×2 decision matrix: Rows = Credit vs Cash, Columns = Goods vs Non-Goods.', 'Place each book name in the correct cell: Purchase Book (Credit, Goods), Sales Book (Credit, Goods), Cash Book (Cash.', 'Give 10 mixed transactions; student must place each in the matrix before recording.', 'Emphasize the "Goods for Resale" test: "Will this item be sold to customers in normal business?" If yes → Goods.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They miss the critical.',
          parts: [
                { id: 'a', prompt: 'A business maintains both a Purchase Book and a Cash Book. The accountant argues: "Since all purchases eventually involve cash payment, why not record credit.', answer: 'The argument is flawed',
                  options: ['The argument is flawed', 'Purchase Book records all purchases', 'Sales Book records all sales', '"Purchase Book records all purchases" and "Sales Book records all sales'],
                  hint: 'If stuck, revisit the fundamental journal entry for credit purchase and credit sale from Chapter 3.',
                  misconception: 'Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They miss the critical qualifiers: **credit**.' },
                { id: 'b', prompt: 'Design a transaction scenario where a student must decide between Purchase Book, Sales Book, Cash Book, and Journal Proper for four different but related.', answer: 'Example: (1) Bought goods on credit from X - Purchase Book',
                  options: ['Example: (1) Bought goods on credit from X - Purchase Book', 'Purchase Book records all purchases', 'Sales Book records all sales', '"Purchase Book records all purchases" and "Sales Book records all sales'],
                  hint: 'If stuck, revisit the fundamental journal entry for credit purchase and credit sale from Chapter 3.',
                  misconception: 'Students believe "Purchase Book records all purchases" and "Sales Book records all sales." They miss the critical qualifiers: **credit**.' }
          ],
            remediations: { 'purchase-book-records-all-purchases': { steps: ['Have the student create a 2×2 decision matrix: Rows = Credit vs Cash, Columns = Goods vs Non-Goods.', 'Place each book name in the correct cell: Purchase Book (Credit, Goods), Sales Book (Credit, Goods), Cash Book (Cash.', 'Give 10 mixed transactions; student must place each in the matrix before recording.', 'Emphasize the "Goods for Resale" test: "Will this item be sold to customers in normal business?" If yes → Goods.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_005', difficulty: 'standard',
          question: 'The Purchase Return Book (Return Outwards Book) is a subsidiary book used.',
          hint: 'If stuck, revisit the Purchase Book and Sales Book (node c11_acc_cbse_04_004) and.',
          misconception: 'Students often think that a Purchase Return Book entry credits the Supplier\'s Account (because "return means we owe.',
          parts: [
                { id: 'a', prompt: 'A student records a return of goods purchased on credit in the Purchase Book itself as a negative entry.', answer: 'The Purchase Book records only credit purchases of goods',
                  options: ['The Purchase Book records only credit purchases of goods', 'return means we owe less'],
                  hint: 'If stuck, revisit the Purchase Book and Sales Book (node c11_acc_cbse_04_004) and practice one.',
                  misconception: 'Students often think that a Purchase Return Book entry credits the Supplier\'s Account (because "return means we owe less") and debits the.' },
                { id: 'b', prompt: 'M/s Sharma Traders returned goods worth ₹12,000 (list price) to M/s Verma Suppliers on 15th March, 2024.', answer: 'Step 1: Calculate net value after trade discount: ₹12,000 less 10% = ₹10,800',
                  options: ['Step 1: Calculate net value after trade discount: ₹12,000 less 10% = ₹10,800', 'return means we owe less'],
                  hint: 'If stuck, revisit the Purchase Book and Sales Book (node c11_acc_cbse_04_004) and practice one.',
                  misconception: 'Students often think that a Purchase Return Book entry credits the Supplier\'s Account (because "return means we owe less") and debits the.' }
          ],
            remediations: { 'a-purchase-return-book-entry': { steps: ['Draw a T-account for the Supplier (Creditor) and show the original purchase entry (Credit Supplier).', 'Ask: "To reduce this credit balance, which side do we enter?" (Debit side).', 'Explain that the Purchases Return Account is a contra-purchase account, so it has a credit balance (opposite.', 'Practice two similar transactions with the student, having them verbalize "Debit the receiver of the benefit (supplier.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_006', difficulty: 'standard',
          question: 'Journal Proper is a residual journal used to record transactions that cannot.',
          hint: 'If stuck, revisit the "Special Purpose Books" summary table in NCERT (end of chapter) and.',
          misconception: 'Students often think "Journal Proper is only for rare/errors entries" and miss that **Opening Entries** (every year).',
          parts: [
                { id: 'a', prompt: 'A business purchases a delivery van on credit from Mahindra & Mahindra for ₹8,00,000. In which book should this transaction be recorded initially?', answer: 'Journal Proper',
                  options: ['Journal Proper', 'purchases', 'Journal Proper is only for rare/errors entries', 'Purchase of furniture on credit'],
                  hint: 'If stuck, revisit the "Special Purpose Books" summary table in NCERT (end of chapter) and create.',
                  misconception: 'Students often think "Journal Proper is only for rare/errors entries" and miss that **Opening Entries** (every year) and **Closing/Transfer.' },
                { id: 'b', prompt: 'Explain why the entry for "Goods withdrawn by proprietor for personal use" is recorded in Journal Proper and not in the Sales Book or Cash Book.', answer: 'The Sales Book records only *credit sales of goods* to customers',
                  options: ['The Sales Book records only *credit sales of goods* to customers', 'Goods withdrawn by owner for personal use', 'it\'s a sale at zero price', 'Journal Proper is only for rare/errors entries'],
                  hint: 'If stuck, revisit the "Special Purpose Books" summary table in NCERT (end of chapter) and create.',
                  misconception: 'Students often think "Journal Proper is only for rare/errors entries" and miss that **Opening Entries** (every year) and **Closing/Transfer.' },
                { id: 'c', prompt: 'Pass the Journal Proper entry for the following: "A cheque of ₹25,000 received from Rahul (a debtor) and deposited into bank was dishonoured.', answer: '**Entry:** Rahul\'s A/c Dr',
                  options: ['**Entry:** Rahul\'s A/c Dr', 'Journal Proper is only for rare/errors entries', 'Purchase of furniture on credit', 'Purchases Book'],
                  hint: 'If stuck, revisit the "Special Purpose Books" summary table in NCERT (end of chapter) and create.',
                  misconception: 'Students often think "Journal Proper is only for rare/errors entries" and miss that **Opening Entries** (every year) and **Closing/Transfer.' }
          ],
            remediations: { 'journal-proper-is-only-for': { steps: ['**Re-teach the definition of "Goods" vs "Assets/Expenses":** Use a physical store walkthrough: "Point to items that are.', '**Create a Decision Flowchart:** Start with "Is cash/bank involved?" → Yes → Cash Book.', 'No → "Is it credit purchase/sale of GOODS?" → Yes → Purchases/Sales Book.', 'No → "Is it return of GOODS?" → Yes → Return Books.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
