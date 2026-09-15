import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch03_p2: SimDef = {
    id: 'v3_c11_acc_ch03_p2',
    title: 'Recording of Transactions - I · Part 2/2',
    subtitle: 'Classify accounts, apply debit-credit rules, and write your first journal entries.',
    classLevel: 11, subject: 'accountancy', topic: 'Recording of Transactions - I · Part 2/2',
    chapters: ['c11_acc_ch03'],
    nodeIds: ['c11_acc_cbse_03_007', 'c11_acc_cbse_03_008', 'c11_acc_cbse_03_009', 'c11_acc_cbse_03_010', 'c11_acc_cbse_03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior accountant catching a firm\'s bookkeeping errors', intro: 'A ledger is just physics for money: every action has an equal and opposite entry.', goal: 'Classify accounts (personal, real, nominal) and record transactions correctly with source documents and vouchers.' },
    discovery: {
        question: 'You buy ₹5,000 of stationery on credit. The cashier insists only a \'cash\' transaction needs recording. What does the double-entry system say actually happened?',
        options: ['Two accounts changed — stationery went up and a liability to the supplier appeared', 'Nothing is recorded until the bill is paid', 'Only the stationery account is touched since goods arrived', 'A cash account entry with a future date is created'],
        answer: 'Two accounts changed — stationery went up and a liability to the supplier appeared',
        hook: 'Every transaction is a two-sided event — debit and credit are the two ends of one seesaw.',
    },
    teaching: [
        { title: 'Books of Original Entry: Journal and its Format', text: 'A Journal is the primary book of original entry where business transactions are recorded for the first time in chronological order, following the double-entry system, with each entry showing the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Break a batch of transactions into their dual effects and post them to the right accounts using the rules of debit and credit.',
        labels: ['Books of Original Entry', 'Recording in Journal: Compound', 'Ledger: Meaning and Utility', 'Posting from Journal', 'Balancing of Ledger Accounts'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_007', title: 'Books of Original Entry: Journal and its Format',
          caseStudy: { intro: 'Imagine you run a small stationery shop and sell 50 notebooks to a school on credit.',
            decisions: [{ prompt: 'What are the five columns of a standard journal format, and in which column is the page number of the ledger account recorded?', options: [
                { text: 'The five columns are: Date, Particulars, L.F', outcome: 'The five columns are: Date, Particulars, L.F. (Ledger Folio), Debit Amount, Credit Amount. The L.F.' },
                { text: 'narration is a column, or that L.F', outcome: 'Not quite — Students often write the credit account on the same line as the debit account (e.g., "Cash A/c Dr.', reveals: 'students-often-write-the-credit' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_008', title: 'Recording in Journal: Compound Journal Entry',
          caseStudy: { intro: 'Imagine you buy a laptop for ₹60,000 for your freelance business: you pay ₹20,000 cash upfront and agree to pay the remaining ₹40,000 next month.',
            decisions: [{ prompt: 'What is the minimum number of accounts affected in a compound journal entry, and how does it differ from a simple journal entry in terms.', options: [
                { text: 'A compound journal entry affects a minimum of three accounts (e.g., two debits and one', outcome: 'A compound journal entry affects a minimum of three accounts (e.g., two debits and one credit,.' },
                { text: 'two accounts', outcome: 'Not quite — Students believe that in a compound entry, each account pair (debit-credit) must balance.', reveals: 'in-a-compound-entry' },
                { text: 'no structural difference', outcome: 'Not quite — Students believe that in a compound entry, each account pair (debit-credit) must balance.', reveals: 'in-a-compound-entry' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_009', title: 'Ledger: Meaning and Utility',
          caseStudy: { intro: 'Imagine you have recorded 50 transactions in your journal for the month.',
            decisions: [{ prompt: 'What is the primary utility of a ledger that distinguishes it from a journal?', options: [
                { text: 'The ledger provides the net balance of a specific account on a given date by grouping all', outcome: 'The ledger provides the net balance of a specific account on a given date by grouping all its.' },
                { text: 'ledger records transactions first', outcome: 'Not quite — Students often believe the ledger is merely a \'copy\' of the journal where entries are rewritten.', reveals: 'the-ledger-is-merely-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_010', title: 'Posting from Journal to Ledger: Procedure',
          caseStudy: { intro: 'Imagine you\'ve just recorded a week\'s transactions in your journal — now your manager asks, "How much does M/s Gulmohar Fashion House owe us?" You cannot.',
            decisions: [{ prompt: 'In the ledger account for "Cash", a journal entry shows "Cash A/c Dr. 10,000 To Sales A/c 10,000".', options: [
                { text: 'Correct answer: "Sales"', outcome: 'Correct answer: "Sales". The Particulars column always records the name of the *other* account.' },
                { text: 'Capital', outcome: 'Not quite — Students believe the Particulars column in a ledger account should repeat the account\'s own name.', reveals: 'the-particulars-column-in-a' },
                { text: 'Furniture', outcome: 'Not quite — Students believe the Particulars column in a ledger account should repeat the account\'s own name.', reveals: 'the-particulars-column-in-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_03_011', title: 'Balancing of Ledger Accounts',
          scaffold: { problem: 'M/s Gupta Traders has the following postings in the "Cash Account" for March 2024. Balance the account as on 31st March 2024.',
            steps: [
            { text: 'Total the Debit side: ₹1,00,000 + ₹25,000 + ₹15,000 + ₹30,000 = ₹1,70,000.' },
            { text: 'Total the Credit side: ₹40,000 + ₹10,000 + ₹20,000 + ₹5,000 + ₹8,000 = ₹83,000.' },
            { text: 'Compare totals. Debit side (₹1,70,000) > Credit side (₹83,000). Difference = ₹1,70,000 - ₹83,000 = ₹87,000.' },
            { text: 'Since Credit side is shorter, write "Balance c/d" on the Credit side with date 31st March 2024, particulars "Balance.' },
            { text: 'On 1st April 2024 (next period), bring down the balance on the *opposite* side (Debit side) as "Balance b/d" ₹87,000.', faded: true, blankAnswer: 'Cash Account balanced with "Balance c/d ₹87,000" on Credit.' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Interning at your uncle\'s electronics shop, you\'re asked to enter the day\'s transactions. The counter boy says: \'Sold a phone for ₹14,000 cash to a walk-in — no bill was printed, but I remember it. Also, uncle took ₹2,000 from the till for his daughter\'s school fees. And a supplier delivered ₹30,000 of stock on credit — the invoice is in the drawer.\'',
            decisions: [{ prompt: 'What do you record, and on what evidence?', options: [
                { text: 'Record the cash sale by issuing a cash memo now (no source document, no entry), the supplier\'s credit purchase from the invoice, and uncle\'s ₹2,000 as drawings — a business transaction because it changes the firm\'s position.', outcome: 'Every entry needs a source document; and the owner\'s drawing changes the firm\'s capital even though it feels \'personal\'.' },
                { text: 'Record the phone sale from the counter boy\'s memory — a transaction happened, so evidence is optional.', outcome: 'Memory is not verifiable evidence; without a source document the entry has no objective proof and the books can\'t be audited.', reveals: 'memory-is-a-source-document' },
                { text: 'Skip uncle\'s ₹2,000 — it\'s his personal family expense, so it\'s not a business transaction.', outcome: 'The money came from the firm\'s till, so the firm\'s cash and capital both changed; drawings is a business transaction even though the purpose was personal.', reveals: 'owner-drawings-not-transaction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_03_011', title: 'You made it',
          caseStudy: { intro: 'Double-entry isn\'t double work — it\'s a built-in error detector. If both sides don\'t move, the story is incomplete.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_007', difficulty: 'standard',
          question: 'A Journal is the primary book of original entry where business transactions are.',
          hint: 'If stuck on debit/credit decision, revisit the "Rules of Debit and Credit" summary chart.',
          misconception: 'Students often write the credit account on the same line as the debit account (e.g., "Cash A/c Dr.',
          parts: [
                { id: 'a', prompt: 'What are the five columns of a standard journal format, and in which column is the page number of the ledger account recorded?', answer: 'The five columns are: Date, Particulars, L.F',
                  options: ['The five columns are: Date, Particulars, L.F', 'narration is a column, or that L.F'],
                  hint: 'If stuck on debit/credit decision, revisit the "Rules of Debit and Credit" summary chart (NCERT.',
                  misconception: 'Students often write the credit account on the same line as the debit account (e.g., "Cash A/c Dr.' }
          ],
            remediations: { 'students-often-write-the-credit': { steps: ['Show the student a printed journal page from a real manual accounting book (or NCERT Figure 3.5) and ask them to trace.', 'Have them practice writing 5 entries by hand on ruled paper, enforcing: (a) Debit account flush left, \'Dr.\' at right.', 'Give immediate feedback by checking each line against the format.', 'Explain that board examiners deduct marks for format errors even if accounts/amounts are correct — this is.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_008', difficulty: 'standard',
          question: 'A compound journal entry is a single journal entry that records a business.',
          hint: 'If stuck, revisit c11_acc_cbse_03_004/005/006 (debit/credit rules) and.',
          misconception: 'Students believe that in a compound entry, each account pair (debit-credit) must balance individually.',
          parts: [
                { id: 'a', prompt: 'A student records a transaction "Purchased furniture ₹25,000, paid ₹5,000 cash, balance on credit" as: Furniture A/c Dr.', answer: 'The first student is correct',
                  options: ['The first student is correct', 'each account needs its own \'Dr', 'in a compound entry, each account pair (debit-credit) must balance individually'],
                  hint: 'If stuck, revisit c11_acc_cbse_03_004/005/006 (debit/credit rules) and c11_acc_cbse_03_007 (journal.',
                  misconception: 'Students believe that in a compound entry, each account pair (debit-credit) must balance individually.' }
          ],
            remediations: { 'in-a-compound-entry': { steps: ['**Confront the error:** Show a compound entry (e.g., van purchase above) and ask: "If I pair Furniture (Dr.', '1,70,000), they don\'t match — so is this wrong?" Let them see the imbalance.', '**Re-teach the invariant:** Write on board: **Σ Debits = Σ Credits** (always, for the whole entry).', 'Use a seesaw analogy: all debit weights on left, all credit weights on right — the fulcrum is the entry line.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that in a compound entry, each account pair (debit-credit) must balance individually.',
          parts: [
                { id: 'a', prompt: 'A student argues: "In a compound entry, since there are multiple accounts, the total of debits doesn\'t have to equal total of credits for each account.', answer: 'The statement is **incorrect and dangerous**',
                  options: ['The statement is **incorrect and dangerous**', 'multiple accounts', 'multiple entries', 'in a compound entry, each account pair (debit-credit) must balance individually'],
                  hint: 'If stuck, revisit c11_acc_cbse_03_004/005/006 (debit/credit rules) and c11_acc_cbse_03_007 (journal.',
                  misconception: 'Students believe that in a compound entry, each account pair (debit-credit) must balance individually.' }
          ],
            remediations: { 'in-a-compound-entry': { steps: ['**Confront the error:** Show a compound entry (e.g., van purchase above) and ask: "If I pair Furniture (Dr.', '1,70,000), they don\'t match — so is this wrong?" Let them see the imbalance.', '**Re-teach the invariant:** Write on board: **Σ Debits = Σ Credits** (always, for the whole entry).', 'Use a seesaw analogy: all debit weights on left, all credit weights on right — the fulcrum is the entry line.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_009', difficulty: 'standard',
          question: 'The ledger is the principal book of accounts in which all transactions from the.',
          hint: 'Review the rules of debit and credit for all five account categories (Assets.',
          misconception: 'Students often believe the ledger is merely a \'copy\' of the journal where entries are rewritten in a different format.',
          parts: [
                { id: 'a', prompt: 'Explain why the ledger is called the \'principal book of accounting system\' while the journal is called the \'book of original entry\'.', answer: 'The journal is the book of original entry',
                  options: ['The journal is the book of original entry', 'ledger is used for original recording'],
                  hint: 'Review the rules of debit and credit for all five account categories (Assets, Liabilities, Capital.',
                  misconception: 'Students often believe the ledger is merely a \'copy\' of the journal where entries are rewritten in a different format.' }
          ],
            remediations: { 'the-ledger-is-merely-a': { steps: ['Show the student a journal with 3 entries affecting the same account (e.g., Cash: capital introduced, cash sales, rent.', 'Ask: "What is the cash balance now?" 3.', 'Demonstrate that answering requires adding/subtracting across three separate journal pages.', 'Then show the Cash ledger account where all three are on one page, and the balance is visible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_010', difficulty: 'standard',
          question: 'Posting is the systematic process of transferring journal entries to their.',
          hint: 'Review "Recording in Journal: Compound Journal Entry" (c11_acc_cbse_03_008) to practice.',
          misconception: 'Students believe the Particulars column in a ledger account should repeat the account\'s own name (e.g., writing.',
          parts: [
                { id: 'a', prompt: 'In the ledger account for "Cash", a journal entry shows "Cash A/c Dr. 10,000 To Sales A/c 10,000".', answer: 'Correct answer: "Sales"',
                  options: ['Correct answer: "Sales"', 'Capital', 'Furniture'],
                  hint: 'Review "Recording in Journal: Compound Journal Entry" (c11_acc_cbse_03_008) to practice identifying.',
                  misconception: 'Students believe the Particulars column in a ledger account should repeat the account\'s own name (e.g., writing "Furniture" in Furniture.' },
                { id: 'b', prompt: 'Why is the Journal Folio (J.F.) column in the ledger filled at the time of posting, not at the time of journalising?', answer: 'Correct answer: The J.F',
                  options: ['Correct answer: The J.F', 'it\'s filled during journalising', 'Furniture'],
                  hint: 'Review "Recording in Journal: Compound Journal Entry" (c11_acc_cbse_03_008) to practice identifying.',
                  misconception: 'Students believe the Particulars column in a ledger account should repeat the account\'s own name (e.g., writing "Furniture" in Furniture.' },
                { id: 'c', prompt: 'Compare the journal and ledger for the same transaction: "Rent A/c Dr. 5,000 To Bank A/c 5,000".', answer: 'The journal records the *entry* with debit account first (by convention)',
                  options: ['The journal records the *entry* with debit account first (by convention)', 'Furniture'],
                  hint: 'Review "Recording in Journal: Compound Journal Entry" (c11_acc_cbse_03_008) to practice identifying.',
                  misconception: 'Students believe the Particulars column in a ledger account should repeat the account\'s own name (e.g., writing "Furniture" in Furniture.' }
          ],
            remediations: { 'the-particulars-column-in-a': { steps: ['Take a simple entry: "Cash A/c Dr.', '5,000 To Capital A/c 5,000".', 'Ask: "In Cash Account, did cash come from Capital or from Cash?" → It came from Capital.', 'Ask: "In Capital Account, did capital come from Cash or from Capital?" → It came from Cash.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_03_011', difficulty: 'standard',
          question: 'Balancing of a ledger account is the process of determining the net difference.',
          hint: 'If stuck, revisit the "Rules of Debit and Credit" (c11_acc_cbse_03_004 and.',
          misconception: 'Students mechanically write "Balance c/d" on the *debit* side for *all* accounts because they see it done for Cash and.',
          parts: [
                { id: 'a', prompt: 'What is the correct phrase written on the shorter side of a ledger account when balancing it at the end of an accounting period?', answer: 'The correct phrase is "Balance c/d" (Balance carried down)',
                  options: ['The correct phrase is "Balance c/d" (Balance carried down)', 'Balance b/d', 'Closing Balance'],
                  hint: 'If stuck, revisit the "Rules of Debit and Credit" (c11_acc_cbse_03_004 and c11_acc_cbse_03_005) and.',
                  misconception: 'Students mechanically write "Balance c/d" on the *debit* side for *all* accounts because they see it done for Cash and Bank (assets) most.' },
                { id: 'b', prompt: 'The "Sales Account" has a credit total of ₹5,00,000 and a debit total of ₹20,000 (due to sales returns).', answer: 'Step 1: Total credit side = ₹5,00,000',
                  options: ['Step 1: Total credit side = ₹5,00,000', 'Balance b/d'],
                  hint: 'If stuck, revisit the "Rules of Debit and Credit" (c11_acc_cbse_03_004 and c11_acc_cbse_03_005) and.',
                  misconception: 'Students mechanically write "Balance c/d" on the *debit* side for *all* accounts because they see it done for Cash and Bank (assets) most.' }
          ],
            remediations: { 'students-mechanically-write-balance-c': { steps: ['**Stop and Visualise:** Draw a big T-account on paper.', 'Label left "Dr" and right "Cr".', 'Write the two totals at the bottom of each side.', '**Apply the Short-Side Rule:** Point to the smaller total.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
