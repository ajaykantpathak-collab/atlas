import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch06_p2: SimDef = {
    id: 'v3_c11_acc_ch06_p2',
    title: 'Trial Balance and Rectification of Errors · Part 2/2',
    subtitle: 'Build a trial balance and classify errors of omission, commission, principle and compensation.',
    classLevel: 11, subject: 'accountancy', topic: 'Trial Balance and Rectification of Errors · Part 2/2',
    chapters: ['c11_acc_ch06'],
    nodeIds: ['c11_acc_cbse_06_007', 'c11_acc_cbse_06_008', 'c11_acc_cbse_06_009', 'c11_acc_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a forensic accountant hunting errors a balanced ledger is hiding', intro: 'The totals match, yet the profit smells wrong. Learn which errors leave footprints and which leave none.', goal: 'Prepare a trial balance, classify errors, and pass rectification entries including suspense account use.' },
    discovery: {
        question: 'A trial balance totals match perfectly — debits equal credits to the rupee. The owner celebrates. Should an auditor share the celebration?',
        options: ['No — errors like recording a sale in the wrong customer\'s account leave totals untouched', 'Yes — equal totals prove the books are error-free', 'No — trial balance can only balance if prepared wrong', 'Yes — but only if checked on the last day of the month'],
        answer: 'No — errors like recording a sale in the wrong customer\'s account leave totals untouched',
        hook: 'A balanced trial balance proves arithmetic, not accuracy — whole classes of errors hide inside it.',
    },
    teaching: [
        { title: 'Types of Errors: Compensating Errors', text: 'Compensating errors occur when two or more accounting errors are committed such that their opposing effects on the debit and credit sides of the ledger cancel each other out, resulting in a net zero.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Prepare a trial balance, then detect and rectify errors that both disturb and don\'t disturb it.',
        labels: ['Types of Errors: Compensating', 'Suspense Account: Meaning', 'Rectification of Errors: Before', 'Rectification of Errors: After'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_007', title: 'Types of Errors: Compensating Errors',
          caseStudy: { intro: 'Imagine you are auditing a small kirana store in Delhi. The owner shows you a trial balance that tallies perfectly at ₹5,00,000 on both sides.',
            decisions: [{ prompt: 'Define compensating errors and state their effect on the agreement of the trial balance.', options: [
                { text: 'Compensating errors are two or more errors whose net effect on the debit and credit', outcome: 'Compensating errors are two or more errors whose net effect on the debit and credit totals of the.' },
                { text: 'Compensating errors are errors that cancel each other out in the same account', outcome: 'Not quite — Students believe that "compensating errors" means two errors in the same account that cancel out.', reveals: 'compensating-errors-means-two-errors' },
                { text: 'compensating errors', outcome: 'Not quite — Students believe that "compensating errors" means two errors in the same account that cancel out.', reveals: 'compensating-errors-means-two-errors' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_008', title: 'Suspense Account: Meaning and Use',
          caseStudy: { intro: 'Imagine you are an intern at a CA firm in Mumbai. It\'s 31st March, and your senior hands you a trial balance where the debit column totals ₹12,45,000 and the.',
            decisions: [{ prompt: 'What is the primary purpose of opening a suspense account when a trial balance does not tally?', options: [
                { text: 'The primary purpose is to temporarily balance the trial balance by placing the difference', outcome: 'The primary purpose is to temporarily balance the trial balance by placing the difference on the.' },
                { text: 'to correct the error permanently', outcome: 'Not quite — Students believe that **every error rectification requires a suspense account entry**.', reveals: 'every-error-rectification-requires-a' },
                { text: 'to record missing transactions', outcome: 'Not quite — Students believe that **every error rectification requires a suspense account entry**.', reveals: 'every-error-rectification-requires-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_010', title: 'Rectification of Errors: After Preparation of Final Accounts',
          caseStudy: { intro: 'Imagine you are an accountant at "Sharma Electronics" reviewing last year\'s books in April.',
            decisions: [{ prompt: 'What is the purpose of using Profit and Loss Adjustment Account when rectifying errors after final accounts are prepared?', options: [
                { text: 'The Profit and Loss Adjustment Account is used to rectify nominal account errors', outcome: 'The Profit and Loss Adjustment Account is used to rectify nominal account errors (expenses.' },
                { text: 'to correct the Suspense Account', outcome: 'Not quite — Students often think **any** prior period error correction must go through Profit and Loss.', reveals: 'any-prior-period-error-correction' },
                { text: 'to adjust the Balance Sheet directly', outcome: 'Not quite — Students often think **any** prior period error correction must go through Profit and Loss.', reveals: 'any-prior-period-error-correction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_007', title: 'A real-world call',
          caseStudy: { intro: 'An accountant discovers the company\'s books hide a loss — correcting it means honesty, a falling stock price, and possibly layoffs; staying quiet keeps everyone employed a while longer.',
            decisions: [{ prompt: 'Is a kind lie still a lie?', options: [
                { text: 'Report it — books exist to be true, not kind', outcome: 'The professional-ethics answer; the layoffs that follow are real, and so is the trust the correction preserves.' },
                { text: 'Stay quiet — protecting jobs matters more than ledgers', outcome: 'The compassionate-looking answer; but hidden losses don\'t disappear — they compound, and the reckoning lands harder.' },
                { text: 'Report it AND fight for the workers the truth affects', outcome: 'The complete answer — honesty about the books, advocacy for the people; harder than either option alone.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At your internship, the senior accountant asks you to check the books of a client\'s café. You extract a trial balance: debits ₹4,86,000, credits ₹4,86,000 — it tallies. You email the client: \'Books are error-free, accounts can be finalised.\' Hidden in the ledger: the new ₹90,000 espresso machine was debited to Purchases, and a ₹12,000 cash sale was never recorded at all.',
            decisions: [{ prompt: 'Was your email right?', options: [
                { text: 'No — the trial balance proves only arithmetical accuracy. The machine in Purchases is an error of principle and the missed sale is complete omission; both leave debits equal to credits while profit and assets are materially wrong.', outcome: 'Tallying columns can\'t see wrong account classification or missing transactions; the trial balance is a first check, not a certificate of truth.' },
                { text: 'Yes — equal totals mean every transaction was recorded correctly, that\'s the whole point of double entry.', outcome: 'Double entry guarantees equal debits and credits even when the wrong account is debited or a transaction is skipped entirely.', reveals: 'tally-means-accurate' },
                { text: 'No — but the only error a trial balance can miss is a compensating one, where two mistakes cancel.', outcome: 'It also misses errors of principle, complete omission, and wrong subsidiary books; narrowing the blind spots to one type understates the problem.', reveals: 'only-compensating-errors-missed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'The trial balance is a checkpoint, not a certificate — it catches one-sided slips and stays blind to compensating mistakes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_007', difficulty: 'standard',
          question: 'Compensating errors occur when two or more accounting errors are committed such.',
          hint: 'Revisit c11_acc_cbse_06_003 (Errors Disclosed and Not Disclosed by Trial Balance) and.',
          misconception: 'Students believe that "compensating errors" means two errors in the same account that cancel out (e.g., posting ₹5,000.',
          parts: [
                { id: 'a', prompt: 'A bookkeeper overcasts the Purchases Book by ₹5,000 and undercasts the Sales Book by ₹5,000. Will the trial balance agree?', answer: 'Yes, the trial balance will agree',
                  options: ['Yes, the trial balance will agree', 'compensating errors', '"compensating errors" means two errors in the same account that cancel out (e'],
                  hint: 'Revisit c11_acc_cbse_06_003 (Errors Disclosed and Not Disclosed by Trial Balance) and practice.',
                  misconception: 'Students believe that "compensating errors" means two errors in the same account that cancel out (e.g., posting ₹5,000 twice then reversing.' },
                { id: 'b', prompt: 'The following errors are found in the books of M/s Sharma Traders: (i) Purchases Book overcast by ₹8,000. (ii) Sales Returns Book undercast by ₹8,000.', answer: 'Step 1: Analyze error (i)',
                  options: ['Step 1: Analyze error (i)', 'compensating errors', '"compensating errors" means two errors in the same account that cancel out (e'],
                  hint: 'Revisit c11_acc_cbse_06_003 (Errors Disclosed and Not Disclosed by Trial Balance) and practice.',
                  misconception: 'Students believe that "compensating errors" means two errors in the same account that cancel out (e.g., posting ₹5,000 twice then reversing.' }
          ],
            remediations: { 'compensating-errors-means-two-errors': { steps: ['If the student confuses compensating errors with self-correcting single-account errors: (1) Draw a T-account for.', '(2) Draw two separate T-accounts (Purchases and Sales Returns) and show how an excess debit in one and short debit.', '(3) Have the student physically write trial balance columns with numbers: Debit column = Purchases ₹1,00,000 + Sales.', 'Then introduce errors: Purchases becomes ₹1,10,000 (+₹10,000), Sales Returns becomes ₹0 (-₹10,000).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "compensating errors" means two errors in the same account that cancel out (e.g., posting ₹5,000.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "If the trial balance agrees, the accountant can be confident there are no compensating errors in the books." Defend or refute with.', answer: 'Refute',
                  options: ['Refute', 'arithmetical accuracy', 'accounting accuracy', 'compensating errors'],
                  hint: 'Revisit c11_acc_cbse_06_003 (Errors Disclosed and Not Disclosed by Trial Balance) and practice.',
                  misconception: 'Students believe that "compensating errors" means two errors in the same account that cancel out (e.g., posting ₹5,000 twice then reversing.' },
                { id: 'b', prompt: 'Create a realistic scenario involving a compensating error pair in a small Indian manufacturing firm.', answer: 'Scenario: M/s Gupta Steel, Ludhiana',
                  options: ['Scenario: M/s Gupta Steel, Ludhiana', 'under/overcast', 'compensating errors', 'Sales Returns overcast'],
                  hint: 'Revisit c11_acc_cbse_06_003 (Errors Disclosed and Not Disclosed by Trial Balance) and practice.',
                  misconception: 'Students believe that "compensating errors" means two errors in the same account that cancel out (e.g., posting ₹5,000 twice then reversing.' }
          ],
            remediations: { 'compensating-errors-means-two-errors': { steps: ['If the student confuses compensating errors with self-correcting single-account errors: (1) Draw a T-account for.', '(2) Draw two separate T-accounts (Purchases and Sales Returns) and show how an excess debit in one and short debit.', '(3) Have the student physically write trial balance columns with numbers: Debit column = Purchases ₹1,00,000 + Sales.', 'Then introduce errors: Purchases becomes ₹1,10,000 (+₹10,000), Sales Returns becomes ₹0 (-₹10,000).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_008', difficulty: 'standard',
          question: 'A Suspense Account is a temporary holding account used to record the difference.',
          hint: 'Review "Errors Disclosed and Not Disclosed by Trial Balance" (c11_acc_cbse_06_003) and.',
          misconception: 'Students believe that **every error rectification requires a suspense account entry**.',
          parts: [
                { id: 'a', prompt: 'Pass the rectification entry through suspense account for: "Cash received from Rahul ₹5,000 was posted to his account as ₹500." The trial balance had shown.', answer: '**Correct Entry:** Suspense A/c Dr',
                  options: ['**Correct Entry:** Suspense A/c Dr', '**every error rectification requires a suspense account entry**'],
                  hint: 'Review "Errors Disclosed and Not Disclosed by Trial Balance" (c11_acc_cbse_06_003) and practice.',
                  misconception: 'Students believe that **every error rectification requires a suspense account entry**. They routinely pass entries like "Suspense A/c Dr.' },
                { id: 'b', prompt: 'Compare and contrast: (a) Errors rectified through suspense account vs. (b) Errors rectified by direct journal entry without suspense account.', answer: 'Errors rectified through suspense account vs',
                  options: ['Errors rectified through suspense account vs', '**every error rectification requires a suspense account entry**'],
                  hint: 'Review "Errors Disclosed and Not Disclosed by Trial Balance" (c11_acc_cbse_06_003) and practice.',
                  misconception: 'Students believe that **every error rectification requires a suspense account entry**. They routinely pass entries like "Suspense A/c Dr.' }
          ],
            remediations: { 'every-error-rectification-requires-a': { steps: ['**Revisit the classification**: Have the student list all 8-10 errors from Illustration 1 (NCERT) and label each.', '**Visual mapping**: Draw a T-account for Suspense.', 'side = Excess Credit in TB" and "Cr.', 'side = Excess Debit in TB".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_009', difficulty: 'standard',
          question: 'Rectification of errors is the systematic process of correcting accounting.',
          hint: 'Revisit node c11_acc_cbse_06_003 (Errors Disclosed and Not Disclosed by Trial Balance).',
          misconception: 'Students believe that **every error correction after trial balance preparation must involve the Suspense Account**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rectification of errors is the systematic process of correcting accounting mistakes by',
                  options: ['Rectification of errors is the systematic process of correcting accounting mistakes by', 'A Trial Balance is a statement prepared at a specific date that lists the closing debit', 'A Trial Balance is a statement that lists all ledger accounts with their respective debit', 'Errors disclosed by trial balance are one-sided errors that cause the total debits and'],
                  hint: 'Revisit node c11_acc_cbse_06_003 (Errors Disclosed and Not Disclosed by Trial Balance) and practice.',
                  misconception: 'Students believe that **every error correction after trial balance preparation must involve the Suspense Account**.' }
          ],
            remediations: { 'every-error-correction-after-trial': { steps: ['Ask the student to list the two accounts affected by the error and identify if the wrong entry had equal debits and.', 'If yes (two-sided), demonstrate that the trial balance would have tallied, so no Suspense Account was ever created for.', 'If no (one-sided), show that this error caused the trial balance difference that led to opening the Suspense Account.', 'Practice with 5 mixed errors, requiring the student to verbally classify each as "Suspense needed" or "No Suspense".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_06_010', difficulty: 'standard',
          question: 'Rectification of errors after preparation of final accounts refers to the.',
          hint: 'Revisit the fundamental classification of accounts (nominal vs real vs personal) and the.',
          misconception: 'Students often think **any** prior period error correction must go through Profit and Loss Adjustment Account.',
          parts: [
                { id: 'a', prompt: 'What is the purpose of using Profit and Loss Adjustment Account when rectifying errors after final accounts are prepared?', answer: 'The Profit and Loss Adjustment Account is used to rectify nominal account errors',
                  options: ['The Profit and Loss Adjustment Account is used to rectify nominal account errors', 'to correct the Suspense Account', 'to adjust the Balance Sheet directly', 'current period accounts can be used for prior period corrections'],
                  hint: 'Revisit the fundamental classification of accounts (nominal vs real vs personal) and the closing.',
                  misconception: 'Students often think **any** prior period error correction must go through Profit and Loss Adjustment Account.' }
          ],
            remediations: { 'any-prior-period-error-correction': { steps: ['**Isolate the account types:** Make a two-column list: "Nominal Accounts (Expenses/Incomes)" vs "Real/Personal Accounts.', '**Apply the rule:** For each error, identify which accounts were wrongly debited/credited.', 'If a **nominal** account is involved in the error, use P&L Adjustment in its place.', 'If **only real/personal** accounts are involved, correct them directly.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
