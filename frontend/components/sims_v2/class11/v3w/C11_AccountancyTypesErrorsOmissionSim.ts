import type { SimDef } from '../../engine/types';
import C11_AccountancyTypesErrorsOmissionSim from '../../../simulations/c6_12/C11_AccountancyTypesErrorsOmissionSim';

/** v3 wrapped master — C11_AccountancyTypesErrorsOmissionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_accountancytypeserrorsomissionsim: SimDef = {
    id: 'v3w_c11_accountancytypeserrorsomissionsim',
    title: 'Types Errors Omission',
    subtitle: 'This node covers the classification of errors based on their effect on trial balance.',
    classLevel: 11, subject: 'accountancy', topic: 'Errors Disclosed and Not Disclosed by Trial Balance',
    chapters: [],
    nodeIds: ['c11_acc_cbse_06_003', 'c11_acc_cbse_06_006', 'c11_acc_cbse_06_009', 'c11_acc_cbse_05_007', 'c11_acc_cbse_06_004', 'c11_acc_cbse_06_005', 'c11_acc_cbse_05_009', 'c11_acc_cbse_06_001', 'c11_acc_cbse_06_002', 'c11_acc_cbse_06_007', 'c11_acc_cbse_06_008', 'c11_acc_cbse_06_010', 'c11_acc_cbse_05_001', 'c11_acc_cbse_05_002', 'c11_acc_cbse_05_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re an accountant at a Delhi-based trading firm. It\'s March 31st, and you\'ve just prepared the.', goal: 'Master Types Errors Omission.' },
    discovery: {
        question: 'A bookkeeper records a credit purchase of goods worth ₹20,000 from supplier Rahul.',
        options: ['Yes, this error will be disclosed by the trial balance', 'Error of Commission always affects trial balance', 'Error of Principle never affects trial balance'],
        answer: 'Yes, this error will be disclosed by the trial balance',
        hook: 'Students believe that "Error of Commission always affects trial balance" and "Error of Principle never affects trial.',
    },
    teaching: [
        { title: 'Errors disclosed by trial balance are.', text: 'Errors disclosed by trial balance are one-sided errors that cause the total debits and total credits to be unequal, making the trial balance disagree.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_acc_cbse_06_003', title: 'Errors disclosed by trial balance are.',
          scaffold: { problem: 'M/s Singh Enterprises, Delhi, prepared a trial balance on 31st March 2024.',
            steps: [
            { text: 'Calculate the original difference: Debit total ₹18,75,000 - Credit total ₹18,60,000 = ₹15,000 excess debit.' },
            { text: 'Analyze Error (i): Sales Book overcast ₹12,000 means Sales Account credited excess ₹12,000 → Credit side excess ₹12,000.' },
            { text: 'Analyze Error (ii): Purchase Returns Book undercast ₹3,000 means Purchase Returns Account credited short ₹3,000 →.' },
            { text: 'Analyze Error (iii): Credit sales to Verma ₹15,000 not posted to his account.' },
            { text: 'Net effect on Debit side: Error (i) -₹12,000 (short), Error (ii) +₹3,000 (excess), Error (iii) -₹15,000 (short) = Total.', faded: true, blankAnswer: 'Net effect of the three errors: Credit side excess ₹24,000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_06_006', title: 'Errors of Commission are clerical.',
          scaffold: { problem: 'M/s Gupta Traders sold goods to Verma Enterprises on credit for ₹45,000. The sale was correctly recorded in the Sales Book.',
            steps: [
            { text: 'Identify the correct entry that should have been made: Verma\'s A/c Dr. 45,000; To Sales A/c 45,000.' },
            { text: 'Identify the wrong entry actually made: Verma\'s A/c Dr. 4,500; To Sales A/c 45,000 (Sales Book total is correct, so.' },
            { text: 'Compare effects on each account: Sales A/c — correct (no error). Verma\'s A/c — short debit of ₹40,500 (45,000 – 4,500).' },
            { text: 'Apply rectification rule: Debit the account with short debit. So debit Verma\'s A/c with ₹40,500.' },
            { text: 'Since trial balance is prepared and Suspense exists, credit Suspense Account to complete the double entry.', faded: true, blankAnswer: 'Verma\'s A/c Dr. 40,500; To Suspense A/c 40,500' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_06_009', title: 'Rectification of errors is the.',
          scaffold: { problem: 'M/s Gupta Traders\' trial balance shows a credit excess of ₹12,000. The accountant puts the difference to Suspense Account.',
            steps: [
            { text: 'Analyze each error for one-sided vs two-sided. (1) Sales Book overcast: only Sales Account affected (one-sided).' },
            { text: 'Identify nature of each error: (1) One-sided (Sales Book overcast) → requires Suspense.' },
            { text: 'Write rectification entries:' },
            { text: 'Prepare Suspense Account: Opening Dr. balance = ₹12,000 (to balance trial balance). Add Dr.' },
            { text: 'Verify: Original difference was credit excess ₹12,000. After rectifying overcast sales (which added ₹3,000 extra.' },
            { text: 'Conclude that Suspense Account remains open with ₹15,000 debit balance carried forward.', faded: true, blankAnswer: 'Rectification entries as above. Suspense Account shows.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_05_007', title: 'Errors in Cash Book and Pass Book refer.',
          scaffold: { problem: 'M/s Sharma Traders\' cash book (bank column) shows a debit balance of ₹75,000 on 31st March 2024. The pass book shows a different balance.',
            steps: [
            { text: 'Identify the starting point - Cash book debit balance (favourable) = ₹75,000.' },
            { text: 'Analyze each error for its effect on cash book balance and pass book balance.' },
            { text: 'Error (ii): Cheque deposited ₹8,500 recorded in cash column → bank column shows no entry → cash book bank balance is.' },
            { text: 'Error (iii): Bank wrongly credited ₹3,000 → pass book balance is ₹3,000 higher than it should be.' },
            { text: 'Error (iv): Receipts side overcast by ₹2,000 → total receipts inflated → cash book bank balance is ₹2,000 higher than.' },
            { text: 'Error (v): Cheque ₹5,000 entered in cash book but not deposited → cash book shows ₹5,000 receipt, pass book shows.' },
            { text: 'Determine adjustments: To go from cash book balance (starting point) to pass book balance (target), we must reverse the.' },
            { text: 'Compute: Start ₹75,000. Add: (ii) ₹8,500, (iii) ₹3,000 = ₹11,500. Less: (i) ₹10,800, (iv) ₹2,000, (v) ₹5,000 = ₹17,800.', faded: true, blankAnswer: 'Pass Book Balance = ₹68,700 (Credit)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_06_004', title: 'An Error of Principle occurs when a.',
          scaffold: { problem: 'M/s Sharma Traders purchased a second-hand machine for ₹4,50,000 and spent ₹50,000 on its overhauling and installation.',
            steps: [
            { text: 'Analyze the transaction — Purchase of machine (₹4,50,000) + Overhauling/Installation (₹50,000) = Total capital.' },
            { text: 'Identify the error — The accountant debited ₹5,00,000 to "Repairs & Maintenance" (revenue expense) instead of.' },
            { text: 'Verify trial balance agreement — Wrong entry: Repairs & Maintenance Dr. 5,00,000; Bank/Cash Cr. 5,00,000.' },
            { text: 'Determine rectification — Since it\'s a two-sided error (wrong account debited, correct account credited), rectify by:.' },
            { text: 'Write journal entry — Machinery Account Dr. 5,00,000; To Repairs & Maintenance Account 5,00,000.', faded: true, blankAnswer: 'Error of Principle. Trial balance agrees because equal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_06_005', title: 'Errors of Omission occur when a.',
          scaffold: { problem: 'M/s Gupta Traders omitted to record a credit purchase of goods worth ₹15,000 from M/s Sharma & Co.',
            steps: [
            { text: 'Identify the transaction that was missed — credit purchase of goods ₹15,000 from Sharma & Co.' },
            { text: 'Determine the correct accounts and sides: Purchases A/c (Debit) and Sharma & Co. A/c (Credit).' },
            { text: 'Classify the omission — since the transaction was **not recorded in the Purchases Book at all**, it is an **Error of.' },
            { text: 'Assess effect on Trial Balance — both debit (Purchases) and credit (Sharma & Co.) are missing by the same amount, so.' },
            { text: 'Write the rectification entry — because it is a two-sided error (both accounts missed), we simply record the missed.', faded: true, blankAnswer: 'Complete omission; Trial Balance agrees; Rectification:.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_acc_cbse_06_006', title: 'Identify each idea',
          dissect: { specimen: 'Types Errors Omission', spots: [
            { id: 's1', label: 'Errors disclosed by trial balance', prompt: 'Which idea is this? — Errors disclosed by trial balance are one-sided errors that cause the total debits and.', answer: 'Errors disclosed by trial balance', options: ['Errors disclosed by trial balance', 'Errors of Commission are clerical', 'Rectification of errors is the', 'Errors in Cash Book and'] },
            { id: 's2', label: 'Errors of Commission are clerical', prompt: 'Which idea is this? — Errors of Commission are clerical mistakes arising from incorrect execution of accounting.', answer: 'Errors of Commission are clerical', options: ['Errors of Commission are clerical', 'Errors disclosed by trial balance', 'Rectification of errors is the', 'Errors in Cash Book and'] },
            { id: 's3', label: 'Rectification of errors is the', prompt: 'Which idea is this? — Rectification of errors is the systematic process of correcting accounting mistakes by.', answer: 'Rectification of errors is the', options: ['Rectification of errors is the', 'Errors disclosed by trial balance', 'Errors of Commission are clerical', 'Errors in Cash Book and'] },
            { id: 's4', label: 'Errors in Cash Book and', prompt: 'Which idea is this? — Errors in Cash Book and Pass Book refer to unintentional mistakes made either by the.', answer: 'Errors in Cash Book and', options: ['Errors in Cash Book and', 'Errors disclosed by trial balance', 'Errors of Commission are clerical', 'Rectification of errors is the'] },
            { id: 's5', label: 'An Error of Principle occurs', prompt: 'Which idea is this? — An Error of Principle occurs when a transaction is recorded in violation of fundamental.', answer: 'An Error of Principle occurs', options: ['An Error of Principle occurs', 'Errors disclosed by trial balance', 'Errors of Commission are clerical', 'Rectification of errors is the'] },
            { id: 's6', label: 'Errors of Omission occur when', prompt: 'Which idea is this? — Errors of Omission occur when a transaction is either completely left out from the books.', answer: 'Errors of Omission occur when', options: ['Errors of Omission occur when', 'Errors disclosed by trial balance', 'Errors of Commission are clerical', 'Rectification of errors is the'] }
          ] } }
    ],
    explore: { component: C11_AccountancyTypesErrorsOmissionSim, prompt: 'Explore the interactive — Types Errors Omission' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_003', difficulty: 'standard',
          question: 'Errors disclosed by trial balance are one-sided errors that cause the total.',
          hint: 'Revisit the double-entry rule for 5 transactions: write the journal entry, post to.',
          misconception: 'Students believe that "Error of Commission always affects trial balance" and "Error of Principle never affects trial.',
          parts: [
                { id: 'a', prompt: 'A bookkeeper records a credit purchase of goods worth ₹20,000 from supplier Rahul.', answer: 'Yes, this error will be disclosed by the trial balance',
                  options: ['Yes, this error will be disclosed by the trial balance', 'Error of Commission always affects trial balance', 'Error of Principle never affects trial balance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "Error of Commission always affects trial balance" and "Error of Principle never affects trial balance." This is.' },
                { id: 'b', prompt: 'A trial balance shows excess credit of ₹9,000. The accountant finds two errors: (a) Sales Book overcast by ₹5,000, (b) Purchase Returns Book undercast by.', answer: 'Yes, the trial balance will tally after rectification',
                  options: ['Yes, the trial balance will tally after rectification', 'Error of Commission always affects trial balance', 'Error of Principle never affects trial balance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "Error of Commission always affects trial balance" and "Error of Principle never affects trial balance." This is.' },
                { id: 'c', prompt: 'Compare and contrast: Error of Complete Omission vs Error of Partial Omission.', answer: 'Error of Complete Omission: (i) Does NOT affect trial balance',
                  options: ['Error of Complete Omission: (i) Does NOT affect trial balance', 'both affect trial balance', 'both need suspense'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "Error of Commission always affects trial balance" and "Error of Principle never affects trial balance." This is.' }
          ],
            remediations: { 'error-of-commission-always-affects': { steps: ['Draw a T-account for each account involved in the error.', 'Show the WRONG entry actually made (debit/credit amounts).', 'Show the CORRECT entry that should have been made.', 'Compare total debits and total credits in the WRONG version — are they equal?', 'Conclude: "Equal totals = not disclosed. Unequal totals = disclosed." Practice with 5 varied errors until the student.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "Error of Commission always affects trial balance" and "Error of Principle never affects trial.',
          parts: [
                { id: 'a', prompt: 'Create a realistic business scenario (Indian context, ₹ amounts) where THREE different types of errors occur simultaneously: one disclosed by trial balance,.', answer: 'Scenario: M/s Gupta Traders, Mumbai',
                  options: ['Scenario: M/s Gupta Traders, Mumbai', 'Error of Commission always affects trial balance', 'Error of Principle never affects trial balance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "Error of Commission always affects trial balance" and "Error of Principle never affects trial balance." This is.' }
          ],
            remediations: { 'error-of-commission-always-affects': { steps: ['Draw a T-account for each account involved in the error.', 'Show the WRONG entry actually made (debit/credit amounts).', 'Show the CORRECT entry that should have been made.', 'Compare total debits and total credits in the WRONG version — are they equal?', 'Conclude: "Equal totals = not disclosed. Unequal totals = disclosed." Practice with 5 varied errors until the student.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_006', difficulty: 'standard',
          question: 'Errors of Commission are clerical mistakes arising from incorrect execution of.',
          hint: 'Revisit the rules of debit and credit for personal, real, and nominal accounts (from.',
          misconception: 'Students often believe that any mistake in posting is an Error of Commission and that all such errors always cause the.',
          parts: [
                { id: 'a', prompt: 'Define "Error of Commission" in your own words and give one original example (not from the textbook) that involves a subsidiary book.', answer: 'An Error of Commission is a clerical mistake made while recording or posting a',
                  options: ['An Error of Commission is a clerical mistake made while recording or posting a', 'wrong account', 'wrong amount'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any mistake in posting is an Error of Commission and that all such errors always cause the trial balance to.' },
                { id: 'b', prompt: 'A bookkeeper records a credit sale of ₹12,000 to Arjun in the Sales Book as ₹1,200.', answer: 'Yes, it affects the trial balance',
                  options: ['Yes, it affects the trial balance', 'it does not affect trial balance', 'wrong account'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any mistake in posting is an Error of Commission and that all such errors always cause the trial balance to.' },
                { id: 'c', prompt: 'Cash received from Meena ₹8,000 is correctly entered in the Cash Book but posted to Meena\'s account as ₹800. The trial balance shows a difference.', answer: 'Wrong effect: Meena\'s A/c Dr',
                  options: ['Wrong effect: Meena\'s A/c Dr', 'wrong account', 'wrong amount'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any mistake in posting is an Error of Commission and that all such errors always cause the trial balance to.' }
          ],
            remediations: { 'any-mistake-in-posting-is': { steps: ['Ask the student to write the correct entry that should have been made.', 'Write the wrong entry that was actually made.', 'Compare the two side-by-side for each account: identify which account has excess/short debit or credit.', 'Apply the rule: "Debit the account with short debit or excess credit; Credit the account with excess debit or short.', 'If only one account is affected (wrong amount on correct side), the other side goes to Suspense.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that any mistake in posting is an Error of Commission and that all such errors always cause the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All Errors of Commission are disclosed by the trial balance." Provide a counter-example if false, or justify if true.', answer: 'The statement is false',
                  options: ['The statement is false', 'confuses', 'wrong account', 'wrong amount'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that any mistake in posting is an Error of Commission and that all such errors always cause the trial balance to.' }
          ],
            remediations: { 'any-mistake-in-posting-is': { steps: ['Ask the student to write the correct entry that should have been made.', 'Write the wrong entry that was actually made.', 'Compare the two side-by-side for each account: identify which account has excess/short debit or credit.', 'Apply the rule: "Debit the account with short debit or excess credit; Credit the account with excess debit or short.', 'If only one account is affected (wrong amount on correct side), the other side goes to Suspense.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_009', difficulty: 'standard',
          question: 'Rectification of errors is the systematic process of correcting accounting.',
          hint: 'Revisit node c11_acc_cbse_06_003 (Errors Disclosed and Not Disclosed by Trial Balance).',
          misconception: 'Students believe that **every error correction after trial balance preparation must involve the Suspense Account**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rectification of errors is the systematic process of correcting accounting mistakes by',
                  options: ['Rectification of errors is the systematic process of correcting accounting mistakes by', 'Errors disclosed by trial balance are one-sided errors that cause the total debits and', 'Errors of Commission are clerical mistakes arising from incorrect execution of accounting', 'Errors in Cash Book and Pass Book refer to unintentional mistakes made either by the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that **every error correction after trial balance preparation must involve the Suspense Account**.' }
          ],
            remediations: { 'every-error-correction-after-trial': { steps: ['Ask the student to list the two accounts affected by the error and identify if the wrong entry had equal debits and.', 'If yes (two-sided), demonstrate that the trial balance would have tallied, so no Suspense Account was ever created for.', 'If no (one-sided), show that this error caused the trial balance difference that led to opening the Suspense Account.', 'Practice with 5 mixed errors, requiring the student to verbally classify each as "Suspense needed" or "No Suspense".'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that **every error correction after trial balance preparation must involve the Suspense Account**.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "If the Suspense Account balance is ₹10,000 (debit) after rectifying all detected errors, it means there are no more errors in the.', answer: 'The statement is false',
                  options: ['The statement is false', 'Suspense Account balance is a comprehensive error detector'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that **every error correction after trial balance preparation must involve the Suspense Account**.' }
          ],
            remediations: { 'every-error-correction-after-trial': { steps: ['Ask the student to list the two accounts affected by the error and identify if the wrong entry had equal debits and.', 'If yes (two-sided), demonstrate that the trial balance would have tallied, so no Suspense Account was ever created for.', 'If no (one-sided), show that this error caused the trial balance difference that led to opening the Suspense Account.', 'Practice with 5 mixed errors, requiring the student to verbally classify each as "Suspense needed" or "No Suspense".'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_007', difficulty: 'standard',
          question: 'Errors in Cash Book and Pass Book refer to unintentional mistakes made either.',
          hint: 'If stuck, revisit c11_acc_cbse_05_002 to c11_acc_cbse_05_006 and create a comparison.',
          misconception: 'Students believe that "all errors in the cash book require a rectification journal entry before preparing BRS." This is.',
          parts: [
                { id: 'a', prompt: 'A cheque of ₹5,000 issued to a supplier was recorded in the cash book as ₹500. The bank correctly debited ₹5,000.', answer: 'Correct answer: Add ₹4,500 to the cash book balance',
                  options: ['Correct answer: Add ₹4,500 to the cash book balance', 'error means subtract'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "all errors in the cash book require a rectification journal entry before preparing BRS." This is wrong because: (1).' }
          ],
            remediations: { 'all-errors-in-the-cash': { steps: ['Ask the student to draw two T-accounts side by side - "Cash Book (Bank Column)" and "Pass Book" - and post the correct.', 'Introduce the error in only one book and ask: "Which balance is now wrong? By how much? In which direction?"', 'Have them write the BRS starting from the *wrong* balance and determine what adjustment (add/deduct) makes it equal to.', 'Repeat with error in the other book.', 'Emphasize the rule: "Adjust the STARTING balance to match the TARGET balance. If starting balance is too high → deduct.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_004', difficulty: 'standard',
          question: 'An Error of Principle occurs when a transaction is recorded in violation of.',
          hint: 'If stuck, revisit the "Capital vs Revenue Expenditure" classification rules from Chapter.',
          misconception: 'Students often think: "Any wrong account used = Error of Commission." They classify the.',
          parts: [
                { id: 'a', prompt: 'A company purchases a delivery van for ₹8,00,000 and debits it to "Vehicle Running Expenses". The trial balance agrees. Is this an Error of Principle?', answer: 'Yes, this is an Error of Principle',
                  options: ['Yes, this is an Error of Principle', 'it\'s an error of commission', 'trial balance will not agree'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "Any wrong account used = Error of Commission." They classify the machinery-purchased-recorded-in-purchases-book as.' },
                { id: 'b', prompt: 'Rectify the following Error of Principle by writing the journal entry: "Wages paid ₹25,000 for construction of a new factory shed were debited to Wages.', answer: '**Rectification Entry:** Factory Shed Account (or Building Account) Dr',
                  options: ['**Rectification Entry:** Factory Shed Account (or Building Account) Dr', 'Any wrong account used = Error of Commission', 'wrong book used'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "Any wrong account used = Error of Commission." They classify the machinery-purchased-recorded-in-purchases-book as.' },
                { id: 'c', prompt: 'Compare and contrast: (a) Error of Principle vs Error of Commission, (b) Why Error of Principle doesn\'t affect trial balance but Error of Commission often does.', answer: 'Error of Principle vs Error of Commission, (',
                  options: ['Error of Principle vs Error of Commission, (', 'both affect trial balance', 'both are clerical'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "Any wrong account used = Error of Commission." They classify the machinery-purchased-recorded-in-purchases-book as.' }
          ],
            remediations: { 'any-wrong-account-used-error': { steps: ['If the student makes this error: 1) Ask: "Was the mistake in the *amount/side/posting* (clerical) or in the *nature of.', 'Is it consumed in current year?', '3) Show side-by-side: Error of Commission example (posting ₹10,000 as ₹1,000 to correct account) vs Error of Principle.', '4) Practice: Give 5 transactions, have student classify each as Principle/Commission/Omission and explain WHY.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think: "Any wrong account used = Error of Commission." They classify the.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Since Errors of Principle do not affect the trial balance, they are less harmful than Errors of Commission and can be ignored until.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'trial balance agreement', 'accounting accuracy', 'Any wrong account used = Error of Commission'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "Any wrong account used = Error of Commission." They classify the machinery-purchased-recorded-in-purchases-book as.' }
          ],
            remediations: { 'any-wrong-account-used-error': { steps: ['If the student makes this error: 1) Ask: "Was the mistake in the *amount/side/posting* (clerical) or in the *nature of.', 'Is it consumed in current year?', '3) Show side-by-side: Error of Commission example (posting ₹10,000 as ₹1,000 to correct account) vs Error of Principle.', '4) Practice: Give 5 transactions, have student classify each as Principle/Commission/Omission and explain WHY.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_005', difficulty: 'standard',
          question: 'Errors of Omission occur when a transaction is either completely left out from.',
          hint: 'If stuck, revisit the "Balances Method" of Trial Balance preparation.',
          misconception: 'Students often think **any** omission automatically means the trial balance will not tally.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the rectification entries for: (a) Credit purchases from Rahul ₹8,000 completely omitted; (b) Credit purchases from Rahul ₹8,000 recorded.', answer: 'Credit purchases from Rahul ₹8,000 completely omitted',
                  options: ['Credit purchases from Rahul ₹8,000 completely omitted', '**any** omission automatically means the trial balance will not tally'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **any** omission automatically means the trial balance will not tally.' }
          ],
            remediations: { 'any-omission-automatically-means-the': { steps: ['Ask the student to draw the accounting cycle: Source Document → Subsidiary Book → Ledger → Trial Balance.', 'Mark where the transaction "stops" in complete omission (never leaves source document) vs.', 'partial omission (reaches subsidiary book, stops before ledger).', 'Show that at the Trial Balance stage, complete omission has **zero** entries on both sides, while partial omission has.'] } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **any** omission automatically means the trial balance will not tally.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "If the trial balance agrees, we can be sure there are no errors of omission in the books." Justify your answer with examples.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', '**any** omission automatically means the trial balance will not tally'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **any** omission automatically means the trial balance will not tally.' },
                { id: 'b', prompt: 'Compare and contrast the rectification entries for: (a) Credit purchases from Rahul ₹8,000 completely omitted; (b) Credit purchases from Rahul ₹8,000 recorded.', answer: 'Credit purchases from Rahul ₹8,000 completely omitted',
                  options: ['Credit purchases from Rahul ₹8,000 completely omitted', '**any** omission automatically means the trial balance will not tally'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **any** omission automatically means the trial balance will not tally.' }
          ],
            remediations: { 'any-omission-automatically-means-the': { steps: ['Ask the student to draw the accounting cycle: Source Document → Subsidiary Book → Ledger → Trial Balance.', 'Mark where the transaction "stops" in complete omission (never leaves source document) vs.', 'partial omission (reaches subsidiary book, stops before ledger).', 'Show that at the Trial Balance stage, complete omission has **zero** entries on both sides, while partial omission has.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
