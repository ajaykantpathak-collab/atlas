import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch06_p1: SimDef = {
    id: 'v3_c11_acc_ch06_p1',
    title: 'Trial Balance and Rectification of Errors · Part 1/2',
    subtitle: 'Build a trial balance and classify errors of omission, commission, principle and compensation.',
    classLevel: 11, subject: 'accountancy', topic: 'Trial Balance and Rectification of Errors · Part 1/2',
    chapters: ['c11_acc_ch06'],
    nodeIds: ['c11_acc_cbse_06_001', 'c11_acc_cbse_06_002', 'c11_acc_cbse_06_003', 'c11_acc_cbse_06_004', 'c11_acc_cbse_06_005', 'c11_acc_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a forensic accountant hunting errors a balanced ledger is hiding', intro: 'The totals match, yet the profit smells wrong. Learn which errors leave footprints and which leave none.', goal: 'Prepare a trial balance, classify errors, and pass rectification entries including suspense account use.' },
    discovery: {
        question: 'A trial balance totals match perfectly — debits equal credits to the rupee. The owner celebrates. Should an auditor share the celebration?',
        options: ['No — errors like recording a sale in the wrong customer\'s account leave totals untouched', 'Yes — equal totals prove the books are error-free', 'No — trial balance can only balance if prepared wrong', 'Yes — but only if checked on the last day of the month'],
        answer: 'No — errors like recording a sale in the wrong customer\'s account leave totals untouched',
        hook: 'A balanced trial balance proves arithmetic, not accuracy — whole classes of errors hide inside it.',
    },
    teaching: [
        { title: 'Trial Balance: Meaning and Objectives', text: 'A Trial Balance is a statement prepared at a specific date that lists the closing debit and credit balances of all ledger accounts to verify the arithmetical accuracy of posting under the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Prepare a trial balance, then detect and rectify errors that both disturb and don\'t disturb it.',
        labels: ['Trial Balance: Meaning', 'Preparation of Trial Balance', 'Errors Disclosed and Not', 'Types of Errors: Errors'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_001', title: 'Trial Balance: Meaning and Objectives',
          caseStudy: { intro: 'Imagine you have just finished posting hundreds of transactions into ledger accounts for your family\'s small retail shop.',
            decisions: [{ prompt: 'State the three objectives of preparing a Trial Balance as per the NCERT textbook.', options: [
                { text: 'The three objectives are: (1) To ascertain the arithmetical accuracy of ledger accounts,', outcome: 'The three objectives are: (1) To ascertain the arithmetical accuracy of ledger accounts, (2).' },
                { text: 'to find profit', outcome: 'Not quite — Students believe that a tallied Trial Balance guarantees "correctness" of accounts.', reveals: 'a-tallied-trial-balance-guarantees' },
                { text: 'to check bank balance', outcome: 'Not quite — Students believe that a tallied Trial Balance guarantees "correctness" of accounts.', reveals: 'a-tallied-trial-balance-guarantees' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_002', title: 'Preparation of Trial Balance: Totals Method and Balances Method',
          caseStudy: { intro: 'Imagine you\'re helping your uncle reconcile his shop\'s books at month-end.',
            decisions: [{ prompt: 'State the fundamental difference between the Totals Method and the Balances Method of preparing a Trial Balance in terms of what figures.', options: [
                { text: 'The Totals Method uses the **sum of debit entries** and **sum of credit entries** for', outcome: 'The Totals Method uses the **sum of debit entries** and **sum of credit entries** for each account.' },
                { text: 'both methods use net balances', outcome: 'Not quite — Students believe that in the Balances Method, an account with a zero balance should be **omitted**.', reveals: 'in-the-balances-method' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_003', title: 'Errors Disclosed and Not Disclosed by Trial Balance',
          caseStudy: { intro: 'Imagine you\'re an accountant at a Delhi-based trading firm. It\'s March 31st, and you\'ve just prepared the trial balance — but the debit column totals.',
            decisions: [{ prompt: 'A bookkeeper records a credit purchase of goods worth ₹20,000 from supplier Rahul.', options: [
                { text: 'Yes, this error will be disclosed by the trial balance', outcome: 'Yes, this error will be disclosed by the trial balance. The Purchases Account is debited with the.' },
                { text: 'Error of Commission always affects trial balance', outcome: 'Not quite — Students believe that "Error of Commission always affects trial balance" and "Error of Principle.', reveals: 'error-of-commission-always-affects' },
                { text: 'Error of Principle never affects trial balance', outcome: 'Not quite — Students believe that "Error of Commission always affects trial balance" and "Error of Principle.', reveals: 'error-of-commission-always-affects' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_004', title: 'Types of Errors: Errors of Principle',
          caseStudy: { intro: 'Imagine you run a small bakery and spend ₹50,000 to build a new storage room. Your accountant debits this to "Repairs & Maintenance" instead of "Building".',
            decisions: [{ prompt: 'Define Error of Principle and state one reason why it does not affect the agreement of the trial balance.', options: [
                { text: 'Error of Principle is an error committed due to violation of accounting principles,', outcome: 'Error of Principle is an error committed due to violation of accounting principles, specifically.' },
                { text: 'it affects trial balance', outcome: 'Not quite — Students often think: "Any wrong account used = Error of Commission." They classify the.', reveals: 'any-wrong-account-used-error' },
                { text: 'it\'s a clerical error', outcome: 'Not quite — Students often think: "Any wrong account used = Error of Commission." They classify the.', reveals: 'any-wrong-account-used-error' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_005', title: 'Types of Errors: Errors of Omission',
          caseStudy: { intro: 'Imagine you run a small stationery shop. On March 15th, you sold notebooks worth ₹5,000 to a school on credit.',
            decisions: [{ prompt: 'State the definition of an Error of Complete Omission and give one example from the purchase cycle.', options: [
                { text: 'An Error of Complete Omission occurs when a transaction is entirely omitted from the', outcome: 'An Error of Complete Omission occurs when a transaction is entirely omitted from the books.' },
                { text: 'it affects trial balance', outcome: 'Not quite — Students often think **any** omission automatically means the trial balance will not tally.', reveals: 'any-omission-automatically-means-the' },
                { text: '**any** omission automatically means the trial balance will not tally', outcome: 'Not quite — Students often think **any** omission automatically means the trial balance will not tally.', reveals: 'any-omission-automatically-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_006', title: 'Types of Errors: Errors of Commission',
          caseStudy: { intro: 'Imagine you run a small stationery shop. You receive a payment of ₹5,000 from a customer, Rahul, and correctly enter it in the Cash Book.',
            decisions: [{ prompt: 'Define "Error of Commission" in your own words and give one original example (not from the textbook) that involves a subsidiary book.', options: [
                { text: 'An Error of Commission is a clerical mistake made while recording or posting a', outcome: 'An Error of Commission is a clerical mistake made while recording or posting a transaction, such.' },
                { text: 'wrong account', outcome: 'Not quite — Students often believe that any mistake in posting is an Error of Commission and that all such.', reveals: 'any-mistake-in-posting-is' },
                { text: 'wrong amount', outcome: 'Not quite — Students often believe that any mistake in posting is an Error of Commission and that all such.', reveals: 'any-mistake-in-posting-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_001', title: 'A real-world call',
          caseStudy: { intro: 'An accountant discovers the company\'s books hide a loss — correcting it means honesty, a falling stock price, and possibly layoffs; staying quiet keeps everyone employed a while longer.',
            decisions: [{ prompt: 'Is a kind lie still a lie?', options: [
                { text: 'Report it — books exist to be true, not kind', outcome: 'The professional-ethics answer; the layoffs that follow are real, and so is the trust the correction preserves.' },
                { text: 'Stay quiet — protecting jobs matters more than ledgers', outcome: 'The compassionate-looking answer; but hidden losses don\'t disappear — they compound, and the reckoning lands harder.' },
                { text: 'Report it AND fight for the workers the truth affects', outcome: 'The complete answer — honesty about the books, advocacy for the people; harder than either option alone.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At your internship, the senior accountant asks you to check the books of a client\'s café. You extract a trial balance: debits ₹4,86,000, credits ₹4,86,000 — it tallies. You email the client: \'Books are error-free, accounts can be finalised.\' Hidden in the ledger: the new ₹90,000 espresso machine was debited to Purchases, and a ₹12,000 cash sale was never recorded at all.',
            decisions: [{ prompt: 'Was your email right?', options: [
                { text: 'No — the trial balance proves only arithmetical accuracy. The machine in Purchases is an error of principle and the missed sale is complete omission; both leave debits equal to credits while profit and assets are materially wrong.', outcome: 'Tallying columns can\'t see wrong account classification or missing transactions; the trial balance is a first check, not a certificate of truth.' },
                { text: 'Yes — equal totals mean every transaction was recorded correctly, that\'s the whole point of double entry.', outcome: 'Double entry guarantees equal debits and credits even when the wrong account is debited or a transaction is skipped entirely.', reveals: 'tally-means-accurate' },
                { text: 'No — but the only error a trial balance can miss is a compensating one, where two mistakes cancel.', outcome: 'It also misses errors of principle, complete omission, and wrong subsidiary books; narrowing the blind spots to one type understates the problem.', reveals: 'only-compensating-errors-missed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'The trial balance is a checkpoint, not a certificate — it catches one-sided slips and stays blind to compensating mistakes.',
            decisions: [{ prompt: 'What comes next? Trial Balance and Rectification of Errors · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Trial Balance and Rectification of Errors · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_001', difficulty: 'standard',
          question: 'A Trial Balance is a statement prepared at a specific date that lists the.',
          hint: 'If stuck, revisit the "Rules of Debit and Credit" (Modern Approach: Asset/Expense.',
          misconception: 'Students believe that a tallied Trial Balance guarantees "correctness" of accounts.',
          parts: [
                { id: 'a', prompt: 'A student says: "If the Trial Balance tallies, it means there are no errors in the books." Explain why this statement is incorrect, giving two specific.', answer: 'A tallied Trial Balance only proves that total debits equal total credits',
                  options: ['A tallied Trial Balance only proves that total debits equal total credits', 'correctness', 'a tallied Trial Balance guarantees "correctness" of accounts'],
                  hint: 'If stuck, revisit the "Rules of Debit and Credit" (Modern Approach: Asset/Expense = Debit.',
                  misconception: 'Students believe that a tallied Trial Balance guarantees "correctness" of accounts.' },
                { id: 'b', prompt: 'Compare the Trial Balance and the Balance Sheet on the basis of: (i) Stage of preparation, (ii) Types of accounts included, (iii) Purpose, (iv) Legal.', answer: '(i) Trial Balance is prepared *before* financial statements',
                  options: ['(i) Trial Balance is prepared *before* financial statements', 'correctness', 'a tallied Trial Balance guarantees "correctness" of accounts'],
                  hint: 'If stuck, revisit the "Rules of Debit and Credit" (Modern Approach: Asset/Expense = Debit.',
                  misconception: 'Students believe that a tallied Trial Balance guarantees "correctness" of accounts.' }
          ],
            remediations: { 'a-tallied-trial-balance-guarantees': { steps: ['Show the student a tallied Trial Balance with a hidden Error of Principle (e.g., Furniture purchased debited.', 'Prepare the Trading Account from this Trial Balance – show how Gross Profit is wrong because Purchases includes.', 'Explicitly contrast "Arithmetical Accuracy" (debits = credits) vs "Accounting Accuracy" (correct account, correct.', 'Give a mnemonic: **T**rial **B**alance **T**allies **B**ut **T**ruth **B**e **T**old? **N**o!'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that a tallied Trial Balance guarantees "correctness" of accounts.',
          parts: [
                { id: 'a', prompt: '"A Trial Balance is just a list of balances – it has no analytical value." Evaluate this statement. Do you agree or disagree?', answer: 'Disagree',
                  options: ['Disagree', 'correctness', 'a tallied Trial Balance guarantees "correctness" of accounts'],
                  hint: 'If stuck, revisit the "Rules of Debit and Credit" (Modern Approach: Asset/Expense = Debit.',
                  misconception: 'Students believe that a tallied Trial Balance guarantees "correctness" of accounts.' }
          ],
            remediations: { 'a-tallied-trial-balance-guarantees': { steps: ['Show the student a tallied Trial Balance with a hidden Error of Principle (e.g., Furniture purchased debited.', 'Prepare the Trading Account from this Trial Balance – show how Gross Profit is wrong because Purchases includes.', 'Explicitly contrast "Arithmetical Accuracy" (debits = credits) vs "Accounting Accuracy" (correct account, correct.', 'Give a mnemonic: **T**rial **B**alance **T**allies **B**ut **T**ruth **B**e **T**old? **N**o!'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_002', difficulty: 'standard',
          question: 'A Trial Balance is a statement that lists all ledger accounts with their.',
          hint: 'If stuck, revisit ledger posting rules (Journal → Ledger) and practice balancing a single.',
          misconception: 'Students believe that in the Balances Method, an account with a zero balance should be **omitted** from the Trial.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Trial Balance is a statement that lists all ledger accounts with their respective debit',
                  options: ['A Trial Balance is a statement that lists all ledger accounts with their respective debit', 'A Trial Balance is a statement prepared at a specific date that lists the closing debit', 'Errors disclosed by trial balance are one-sided errors that cause the total debits and', 'An Error of Principle occurs when a transaction is recorded in violation of fundamental'],
                  hint: 'If stuck, revisit ledger posting rules (Journal → Ledger) and practice balancing a single.',
                  misconception: 'Students believe that in the Balances Method, an account with a zero balance should be **omitted** from the Trial Balance.' }
          ],
            remediations: { 'in-the-balances-method': { steps: ['Show the student a ledger account that balances to zero (e.g., a temporary expense account fully paid off).', 'Ask: "If we omit this, how will anyone know the account existed and was correctly closed?" 2.', 'Demonstrate with the NCERT example: Rawat\'s Capital has a credit balance of ₹60,000—if it were zero, the capital.', 'Practice: Give 5 ledger accounts, two with zero balances.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_003', difficulty: 'standard',
          question: 'Errors disclosed by trial balance are one-sided errors that cause the total.',
          hint: 'Revisit the double-entry rule for 5 transactions: write the journal entry, post.',
          misconception: 'Students believe that "Error of Commission always affects trial balance" and "Error of Principle never affects trial.',
          parts: [
                { id: 'a', prompt: 'A bookkeeper records a credit purchase of goods worth ₹20,000 from supplier Rahul.', answer: 'Yes, this error will be disclosed by the trial balance',
                  options: ['Yes, this error will be disclosed by the trial balance', 'Error of Commission always affects trial balance', 'Error of Principle never affects trial balance'],
                  hint: 'Revisit the double-entry rule for 5 transactions: write the journal entry, post to T-accounts, and.',
                  misconception: 'Students believe that "Error of Commission always affects trial balance" and "Error of Principle never affects trial balance." This.' },
                { id: 'b', prompt: 'A trial balance shows excess credit of ₹9,000. The accountant finds two errors: (a) Sales Book overcast by ₹5,000, (b) Purchase Returns Book undercast.', answer: 'Yes, the trial balance will tally after rectification',
                  options: ['Yes, the trial balance will tally after rectification', 'Error of Commission always affects trial balance', 'Error of Principle never affects trial balance'],
                  hint: 'Revisit the double-entry rule for 5 transactions: write the journal entry, post to T-accounts, and.',
                  misconception: 'Students believe that "Error of Commission always affects trial balance" and "Error of Principle never affects trial balance." This.' },
                { id: 'c', prompt: 'Compare and contrast: Error of Complete Omission vs Error of Partial Omission.', answer: 'Error of Complete Omission: (i) Does NOT affect trial balance',
                  options: ['Error of Complete Omission: (i) Does NOT affect trial balance', 'both affect trial balance', 'both need suspense', 'omission from books'],
                  hint: 'Revisit the double-entry rule for 5 transactions: write the journal entry, post to T-accounts, and.',
                  misconception: 'Students believe that "Error of Commission always affects trial balance" and "Error of Principle never affects trial balance." This.' }
          ],
            remediations: { 'error-of-commission-always-affects': { steps: ['Draw a T-account for each account involved in the error.', 'Show the WRONG entry actually made (debit/credit amounts).', 'Show the CORRECT entry that should have been made.', 'Compare total debits and total credits in the WRONG version — are they equal?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_004', difficulty: 'standard',
          question: 'An Error of Principle occurs when a transaction is recorded in violation.',
          hint: 'If stuck, revisit the "Capital vs Revenue Expenditure" classification rules from Chapter.',
          misconception: 'Students often think: "Any wrong account used = Error of Commission." They classify the.',
          parts: [
                { id: 'a', prompt: 'A company purchases a delivery van for ₹8,00,000 and debits it to "Vehicle Running Expenses". The trial balance agrees. Is this an Error of Principle?', answer: 'Yes, this is an Error of Principle',
                  options: ['Yes, this is an Error of Principle', 'it\'s an error of commission', 'trial balance will not agree', 'Any wrong account used = Error of Commission'],
                  hint: 'If stuck, revisit the "Capital vs Revenue Expenditure" classification rules from Chapter 2.',
                  misconception: 'Students often think: "Any wrong account used = Error of Commission." They classify the machinery-purchased-recorded-in-purchases-book.' },
                { id: 'b', prompt: 'Rectify the following Error of Principle by writing the journal entry: "Wages paid ₹25,000 for construction of a new factory shed were debited to Wages.', answer: '**Rectification Entry:** Factory Shed Account (or Building Account) Dr',
                  options: ['**Rectification Entry:** Factory Shed Account (or Building Account) Dr', 'Any wrong account used = Error of Commission', 'wrong book used'],
                  hint: 'If stuck, revisit the "Capital vs Revenue Expenditure" classification rules from Chapter 2.',
                  misconception: 'Students often think: "Any wrong account used = Error of Commission." They classify the machinery-purchased-recorded-in-purchases-book.' },
                { id: 'c', prompt: 'Compare and contrast: (a) Error of Principle vs Error of Commission, (b) Why Error of Principle doesn\'t affect trial balance but Error of Commission often does.', answer: 'Error of Principle vs Error of Commission, (',
                  options: ['Error of Principle vs Error of Commission, (', 'both affect trial balance', 'both are clerical', 'Any wrong account used = Error of Commission'],
                  hint: 'If stuck, revisit the "Capital vs Revenue Expenditure" classification rules from Chapter 2.',
                  misconception: 'Students often think: "Any wrong account used = Error of Commission." They classify the machinery-purchased-recorded-in-purchases-book.' }
          ],
            remediations: { 'any-wrong-account-used-error': { steps: ['If the student makes this error: 1) Ask: "Was the mistake in the *amount/side/posting* (clerical) or in the *nature.', 'Is it consumed in current year?', '3) Show side-by-side: Error of Commission example (posting ₹10,000 as ₹1,000 to correct account) vs Error of Principle.', '4) Practice: Give 5 transactions, have student classify each as Principle/Commission/Omission and explain WHY.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_005', difficulty: 'standard',
          question: 'Errors of Omission occur when a transaction is either completely left out from.',
          hint: 'If stuck, revisit the "Balances Method" of Trial Balance preparation.',
          misconception: 'Students often think **any** omission automatically means the trial balance will not tally.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the rectification entries for: (a) Credit purchases from Rahul ₹8,000 completely omitted; (b) Credit purchases from Rahul ₹8,000 recorded.', answer: 'Credit purchases from Rahul ₹8,000 completely omitted',
                  options: ['Credit purchases from Rahul ₹8,000 completely omitted', '**any** omission automatically means the trial balance will not tally'],
                  hint: 'If stuck, revisit the "Balances Method" of Trial Balance preparation (c11_acc_cbse_06_002) and the.',
                  misconception: 'Students often think **any** omission automatically means the trial balance will not tally.' }
          ],
            remediations: { 'any-omission-automatically-means-the': { steps: ['Ask the student to draw the accounting cycle: Source Document → Subsidiary Book → Ledger → Trial Balance.', 'Mark where the transaction "stops" in complete omission (never leaves source document) vs.', 'partial omission (reaches subsidiary book, stops before ledger).', 'Show that at the Trial Balance stage, complete omission has **zero** entries on both sides, while partial omission has.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_006', difficulty: 'standard',
          question: 'Errors of Commission are clerical mistakes arising from incorrect execution.',
          hint: 'Revisit the rules of debit and credit for personal, real, and nominal accounts (from.',
          misconception: 'Students often believe that any mistake in posting is an Error of Commission and that all such errors always cause the.',
          parts: [
                { id: 'a', prompt: 'Define "Error of Commission" in your own words and give one original example (not from the textbook) that involves a subsidiary book.', answer: 'An Error of Commission is a clerical mistake made while recording or posting a',
                  options: ['An Error of Commission is a clerical mistake made while recording or posting a', 'wrong account', 'wrong amount'],
                  hint: 'Revisit the rules of debit and credit for personal, real, and nominal accounts (from Journal and.',
                  misconception: 'Students often believe that any mistake in posting is an Error of Commission and that all such errors always cause the trial balance.' },
                { id: 'b', prompt: 'A bookkeeper records a credit sale of ₹12,000 to Arjun in the Sales Book as ₹1,200.', answer: 'Yes, it affects the trial balance',
                  options: ['Yes, it affects the trial balance', 'it does not affect trial balance', 'wrong account', 'wrong amount'],
                  hint: 'Revisit the rules of debit and credit for personal, real, and nominal accounts (from Journal and.',
                  misconception: 'Students often believe that any mistake in posting is an Error of Commission and that all such errors always cause the trial balance.' },
                { id: 'c', prompt: 'Cash received from Meena ₹8,000 is correctly entered in the Cash Book but posted to Meena\'s account as ₹800. The trial balance shows a difference.', answer: 'Wrong effect: Meena\'s A/c Dr',
                  options: ['Wrong effect: Meena\'s A/c Dr', 'wrong account', 'wrong amount'],
                  hint: 'Revisit the rules of debit and credit for personal, real, and nominal accounts (from Journal and.',
                  misconception: 'Students often believe that any mistake in posting is an Error of Commission and that all such errors always cause the trial balance.' }
          ],
            remediations: { 'any-mistake-in-posting-is': { steps: ['Ask the student to write the correct entry that should have been made.', 'Write the wrong entry that was actually made.', 'Compare the two side-by-side for each account: identify which account has excess/short debit or credit.', 'Apply the rule: "Debit the account with short debit or excess credit; Credit the account with excess debit or short.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
