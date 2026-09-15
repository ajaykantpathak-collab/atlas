import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch04_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch04_p2: SimDef = {
    id: 'v3_c11_acc_ch04_p2',
    title: 'Recording of Transactions - II · Part 2/2',
    subtitle: 'Route transactions through purchases book, sales book, return books and cash book.',
    classLevel: 11, subject: 'accountancy', topic: 'Recording of Transactions - II · Part 2/2',
    chapters: ['c11_acc_ch04'],
    nodeIds: ['c11_acc_cbse_04_007', 'c11_acc_cbse_04_008', 'c11_acc_cbse_04_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a bookkeeper untangling a wholesale trader\'s paperwork', intro: 'One journal for everything doesn\'t scale. Time to build the sorting system real businesses use.', goal: 'Prepare subsidiary books and the cash book, and distinguish trade discount from cash discount.' },
    discovery: {
        question: 'A trader returns damaged goods worth ₹8,000 to his supplier. His assistant records it as a purchase. What\'s wrong — and which special book should catch it?',
        options: ['It\'s a purchase return, recorded in the purchases return book, reducing what the firm owes', 'Nothing is wrong — all goods leaving count as purchases', 'It belongs in the sales book since goods moved out', 'It goes in the cash book as a refund due'],
        answer: 'It\'s a purchase return, recorded in the purchases return book, reducing what the firm owes',
        hook: 'Subsidiary books exist because direction matters — goods coming in and going out are opposite stories.',
    },
    teaching: [
        { title: 'Balancing and Totaling of Subsidiary Books', text: 'Balancing and totaling of subsidiary books is the systematic process of determining the net effect of all transactions recorded in each special journal (Cash Book, Purchases Book, Sales Book.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort a messy pile of invoices into the right subsidiary books — purchases, sales, returns, and the cash book.',
        labels: ['Balancing and Totaling', 'Posting from Cash Book', 'Posting from Other Subsidiary'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_04_009', title: 'Posting from Other Subsidiary Books to Ledger',
          caseStudy: { intro: 'Imagine you run a wholesale stationery business. At month-end, your Purchases Book shows ₹2,45,000 of credit purchases from 12 suppliers, Sales Book shows.',
            decisions: [{ prompt: 'State the exact narration written in the Purchases Account when posting the monthly total from the Purchases Book, and explain why.', options: [
                { text: 'Correct narration: "To Sundries as per Purchases Book" on the debit side of Purchases', outcome: 'Correct narration: "To Sundries as per Purchases Book" on the debit side of Purchases Account.' },
                { text: 'By Sundries', outcome: 'Not quite — Students believe that **only the periodical totals** are posted from subsidiary books to the.', reveals: 'only-the-periodical-totals-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'As treasurer of the school canteen co-op you keep a Simple Cash Book. Today\'s slip reads: \'Cash sales ₹3,400; paid for bread ₹900; sold 20 coupon books to Class 12 on credit ₹2,000 (they\'ll pay Monday); deposited ₹1,500 of the cash into the co-op\'s bank account.\' A junior member insists all four lines go on the cash book\'s receipts side.',
            decisions: [{ prompt: 'What actually goes into the cash book, and where?', options: [
                { text: 'Debit side: cash sales ₹3,400. Credit side: bread payment ₹900. The bank deposit is a contra entry (cash out, bank in). The credit coupon sale is excluded entirely — no cash moved today.', outcome: 'The Simple Cash Book records only cash movements; the credit sale waits for Monday\'s cash, and the deposit touches both sides as a contra entry.' },
                { text: 'Record the ₹2,000 coupon sale as a receipt — a sale is a sale, and the money is as good as received.', outcome: 'Until cash actually moves, a credit sale has no place in a cash book; recording it inflates cash in hand that doesn\'t exist.', reveals: 'credit-sale-in-cash-book' },
                { text: 'Show the bank deposit only once — as a payment — since cash physically left the drawer.', outcome: 'A deposit moves value between two accounts the business owns; it must appear on both sides as a contra entry or the bank record won\'t reconcile.', reveals: 'contra-entry-half-recorded' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_04_009', title: 'You made it',
          caseStudy: { intro: 'Special journals are traffic control: they send each transaction down the right lane so the ledger stays clean.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_007', difficulty: 'standard',
          question: 'Balancing and totaling of subsidiary books is the systematic process.',
          hint: 'Revisit the "Types of Accounts" concept (Real, Personal, Nominal) and the "Rules of Debit.',
          misconception: 'Students treat ALL subsidiary books alike — writing \'Balance c/d\' and \'Balance b/d\' in Purchases Book, Sales Book, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Balancing and totaling of subsidiary books is the systematic process of determining the',
                  options: ['Balancing and totaling of subsidiary books is the systematic process of determining the', 'A Simple Cash Book (Single Column Cash Book) is a subsidiary book that records only cash', 'A Two-column Cash Book records cash and bank transactions side-by-side with separate', 'A Petty Cash Book is a subsidiary book maintained under the Imprest System to record'],
                  hint: 'Revisit the "Types of Accounts" concept (Real, Personal, Nominal) and the "Rules of Debit and.',
                  misconception: 'Students treat ALL subsidiary books alike — writing \'Balance c/d\' and \'Balance b/d\' in Purchases Book, Sales Book, and Returns Books just.' }
          ],
            remediations: { 'students-treat-all-subsidiary-books': { steps: ['Ask student to classify each subsidiary book\'s purpose — "What does this book record?" (Cash Book: cash/bank movements.', 'Show the ledger account that receives the posting — Cash/Bank accounts show balance c/d; Purchases/Sales/Returns.', 'Have student re-do one Purchases Book example: total the column, write \'Total ₹X\' below, post to Purchases A/c Dr.', 'Contrast with Cash Book where Balance b/d becomes next month\'s opening entry.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_008', difficulty: 'standard',
          question: 'Posting from Cash Book to Ledger is the process of transferring entries.',
          hint: 'Revisit c11_acc_cbse_04_002 (Double Column Cash Book) and practice identifying contra.',
          misconception: 'Students often post contra entries (cash deposited/withdrawn) to the ledger by creating separate "Cash" and "Bank".',
          parts: [
                { id: 'a', prompt: 'In a double-column cash book, a contra entry is marked \'C\' in the L.F. column.', answer: 'Correct answer: Contra entries involve only cash and bank accounts, both of',
                  options: ['Correct answer: Contra entries involve only cash and bank accounts, both of', 'because they are not real transactions'],
                  hint: 'Revisit c11_acc_cbse_04_002 (Double Column Cash Book) and practice identifying contra entries and.',
                  misconception: 'Students often post contra entries (cash deposited/withdrawn) to the ledger by creating separate "Cash" and "Bank" ledger accounts and.' }
          ],
            remediations: { 'students-often-post-contra-entries': { steps: ['Have the student physically cover the L.F. column of a solved cash book and ask: "Which accounts need updating outside.', 'For each non-contra line, ask: "Did cash come in or go out? Which outside party is involved?', 'For contra lines, ask: "Which two accounts are affected? Are they both inside this book? Then why post outside?"', 'Practice with a cash book where contra entries are *not* pre-marked — student must identify them first.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often post contra entries (cash deposited/withdrawn) to the ledger by creating separate "Cash" and "Bank".',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Since the cash book serves as both journal and ledger for cash, we never need a separate Cash Account in the ledger.', answer: 'Correct answer: The statement is correct',
                  options: ['Correct answer: The statement is correct', 'Bank account still needed for passbook reconciliation'],
                  hint: 'Revisit c11_acc_cbse_04_002 (Double Column Cash Book) and practice identifying contra entries and.',
                  misconception: 'Students often post contra entries (cash deposited/withdrawn) to the ledger by creating separate "Cash" and "Bank" ledger accounts and.' }
          ],
            remediations: { 'students-often-post-contra-entries': { steps: ['Have the student physically cover the L.F. column of a solved cash book and ask: "Which accounts need updating outside.', 'For each non-contra line, ask: "Did cash come in or go out? Which outside party is involved?', 'For contra lines, ask: "Which two accounts are affected? Are they both inside this book? Then why post outside?"', 'Practice with a cash book where contra entries are *not* pre-marked — student must identify them first.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_04_009', difficulty: 'standard',
          question: 'Posting from other subsidiary books refers to the systematic process.',
          hint: 'Revisit c11_acc_cbse_04_008 (Posting from Cash Book) and re-do the "Gurmeet\'s Account".',
          misconception: 'Students believe that **only the periodical totals** are posted from subsidiary books to the ledger, and individual.',
          parts: [
                { id: 'a', prompt: 'From the following analytical Purchases Book (with CGST, SGST, IGST columns), post the entries to ledger accounts for April 2024: | Date | Invoice | Supplier |.', answer: '**Purchases A/c** Dr',
                  options: ['**Purchases A/c** Dr', 'By Purchases', 'By IGST Input'],
                  hint: 'Revisit c11_acc_cbse_04_008 (Posting from Cash Book) and re-do the "Gurmeet\'s Account" vs "Sales.',
                  misconception: 'Students believe that **only the periodical totals** are posted from subsidiary books to the ledger, and individual party accounts.' }
          ],
            remediations: { 'only-the-periodical-totals-are': { steps: ['Show the student a Purchases Book with 5 entries across different dates.', 'Demonstrate daily posting to one supplier\'s account (e.g., M/s X) with narration "By Purchases" and L.F. filled.', 'Contrast with Purchases Account where we write "To Sundries as per Purchases Book" only on the 30th.', 'Give a 3-transaction exercise: post daily to supplier accounts, then monthly total to Purchases Account.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
