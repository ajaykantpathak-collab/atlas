import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch05_p2: SimDef = {
    id: 'v3_c11_acc_ch05_p2',
    title: 'Bank Reconciliation Statement · Part 2/2',
    subtitle: 'Reconcile the cash book with the passbook by isolating timing and recording differences.',
    classLevel: 11, subject: 'accountancy', topic: 'Bank Reconciliation Statement · Part 2/2',
    chapters: ['c11_acc_ch05'],
    nodeIds: ['c11_acc_cbse_05_007', 'c11_acc_cbse_05_008', 'c11_acc_cbse_05_009', 'c11_acc_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an auditor explaining why the bank and the books disagree', intro: 'The bank says one number, the ledger another. Your job: find every reason in between.', goal: 'Identify causes of disagreement between cash book and passbook and prepare a bank reconciliation statement.' },
    discovery: {
        question: 'Your passbook shows ₹12,400 but your cash book says ₹9,800. The bank hasn\'t stolen anything. Which explanation actually accounts for the gap?',
        options: ['Cheques issued but not yet presented, and deposits still in clearing, make the two clocks read differently', 'The bank must have made an error and owes an apology', 'The cash book is wrong and should be rewritten to match the bank', 'Interest credited by the bank can never cause such a gap'],
        answer: 'Cheques issued but not yet presented, and deposits still in clearing, make the two clocks read differently',
        hook: 'Two honest records can disagree purely because of timing — reconciliation is detective work, not accusation.',
    },
    teaching: [
        { title: 'Causes of Difference: Errors in Cash Book and Pass Book', text: 'Errors in Cash Book and Pass Book refer to unintentional mistakes made either by the business entity while recording transactions in the bank column of the cash book, or by the bank while maintaining.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hunt down every timing difference and direct credit hiding between a firm\'s cash book and its bank statement, then reconcile them.',
        labels: ['Causes of Difference: Errors', 'Preparation of Bank Reconciliation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_007', title: 'Causes of Difference: Errors in Cash Book and Pass Book',
          caseStudy: { intro: 'Imagine you run a small stationery shop and maintain a cash book. At month-end, your cash book shows ₹45,000 but the bank statement shows ₹43,200.',
            decisions: [{ prompt: 'A cheque of ₹5,000 issued to a supplier was recorded in the cash book as ₹500. The bank correctly debited ₹5,000.', options: [
                { text: 'Correct answer: Add ₹4,500 to the cash book balance', outcome: 'Correct answer: Add ₹4,500 to the cash book balance. Reasoning: The cash book shows only ₹500.' },
                { text: 'error means subtract', outcome: 'Not quite — Students believe that "all errors in the cash book require a rectification journal entry before.', reveals: 'all-errors-in-the-cash' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_05_008', title: 'Preparation of Bank Reconciliation Statement: From Cash Book Balance',
          scaffold: { problem: 'On 31st March 2024, the cash book of M/s Gupta Traders showed a debit balance of ₹75,000.',
            steps: [
            { text: 'Identify the starting point: Cash book balance is debit (favourable) ₹75,000.' },
            { text: 'Analyze each reconciling item for its effect on passbook relative to cash book:' },
            { text: 'Construct the statement in the two-column format (+ and -) or single column with Add/Less.' },
            { text: 'Compute the net balance: 75,000 + 15,000 + 1,200 + 5,000 - 10,000 - 250 = ₹85,950.' },
            { text: 'Verify: The result should be a credit balance in passbook (favourable).', faded: true, blankAnswer: 'Balance as per Passbook ₹85,950 (Credit/Favourable)' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_009', title: 'Preparation of Bank Reconciliation Statement: From Pass Book Balance',
          caseStudy: { intro: 'Imagine you receive your bank statement (Pass Book) showing a balance of ₹50,000, but your Cash Book shows ₹42,000.',
            decisions: [{ prompt: 'When the Pass Book shows a credit balance of ₹30,000 and cheques issued but not presented total ₹8,000, what adjustment is made to the Pass.', options: [
                { text: '**Answer:** Add ₹8,000 to the Pass Book balance', outcome: '**Answer:** Add ₹8,000 to the Pass Book balance. **Why wrong answers reveal misunderstanding:**.' },
                { text: 'unpresented cheques are always added', outcome: 'Not quite — Students believe the adjustment rules are fixed per item type (e.g., "unpresented cheques are.', reveals: 'the-adjustment-rules-are-fixed' },
                { text: 'the adjustment rules are fixed per item type (e', outcome: 'Not quite — Students believe the adjustment rules are fixed per item type (e.g., "unpresented cheques are.', reveals: 'the-adjustment-rules-are-fixed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_010', title: 'Preparation of Bank Reconciliation Statement: Overdraft Balance',
          caseStudy: { intro: 'Imagine you run a small wholesale business and your bank statement shows a negative balance of ₹50,000 (overdraft), but your cash book shows only ₹42,000.',
            decisions: [{ prompt: 'What is the meaning of \'credit balance as per cash book\' in the context of bank reconciliation, and how does it differ from \'debit balance.', options: [
                { text: 'Credit balance as per cash book means the bank column total on the credit side exceeds', outcome: 'Credit balance as per cash book means the bank column total on the credit side exceeds the debit.' },
                { text: 'credit balance = favourable', outcome: 'Not quite — Students treat overdraft BRS exactly like favourable balance BRS, just with a "minus sign" on the.', reveals: 'students-treat-overdraft-brs-exactly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You run a small online craft store after school. Your own cash book says the bank holds ₹18,600; the bank statement says ₹21,100. The gap traces to: a ₹3,000 cheque you issued to a supplier (not yet presented), a ₹700 bank charge you never recorded, and a ₹4,200 customer UPI that the bank credited but you forgot to enter. Your friend says the bank must have made an error.',
            decisions: [{ prompt: 'How do you explain the difference?', options: [
                { text: 'These are timing differences and your own omissions, not necessarily bank error: starting from the pass book, deduct the unpresented cheque effect appropriately, adjust for the bank charge and the unrecorded credit to reconcile to ₹18,600.', outcome: 'A BRS works because you and the bank record the same events at different times; each item has a direction depending on which balance you start from.' },
                { text: 'Always add the differences to the cash book balance to reach the pass book balance — that\'s the rule.', outcome: 'Direction depends on the starting point and whether the item makes that balance higher or lower; a memorised \'always add\' fails the moment you start from the other side.', reveals: 'brs-always-add-rule' },
                { text: 'The bank probably posted someone else\'s money to your account — file a complaint and wait.', outcome: 'Before blaming the bank, list every item and ask which book recorded it first; almost all gaps are timing differences or your own unrecorded items.', reveals: 'difference-means-bank-error' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_010', title: 'You made it',
          caseStudy: { intro: 'A bank reconciliation statement is how you prove two \'truths\' are the same truth seen at different moments.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_007', difficulty: 'standard',
          question: 'Errors in Cash Book and Pass Book refer to unintentional mistakes made either.',
          hint: 'If stuck, revisit c11_acc_cbse_05_002 to c11_acc_cbse_05_006 and create a comparison.',
          misconception: 'Students believe that "all errors in the cash book require a rectification journal entry before preparing BRS." This.',
          parts: [
                { id: 'a', prompt: 'A cheque of ₹5,000 issued to a supplier was recorded in the cash book as ₹500. The bank correctly debited ₹5,000.', answer: 'Correct answer: Add ₹4,500 to the cash book balance',
                  options: ['Correct answer: Add ₹4,500 to the cash book balance', 'error means subtract'],
                  hint: 'If stuck, revisit c11_acc_cbse_05_002 to c11_acc_cbse_05_006 and create a comparison table: "Timing.',
                  misconception: 'Students believe that "all errors in the cash book require a rectification journal entry before preparing BRS." This is wrong because: (1).' }
          ],
            remediations: { 'all-errors-in-the-cash': { steps: ['Ask the student to draw two T-accounts side by side - "Cash Book (Bank Column)" and "Pass Book" - and post the correct.', 'Introduce the error in only one book and ask: "Which balance is now wrong? By how much? In which direction?"', 'Have them write the BRS starting from the *wrong* balance and determine what adjustment (add/deduct) makes it equal.', 'Repeat with error in the other book.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_008', difficulty: 'standard',
          question: 'A Bank Reconciliation Statement (BRS) prepared from the cash book balance is.',
          hint: 'If stuck, revisit nodes c11_acc_cbse_05_002 to c11_acc_cbse_05_007 and create a table.',
          misconception: 'Students often memorize "cheques issued but not presented = ADD" and "cheques deposited but not collected = LESS".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Bank Reconciliation Statement (BRS) prepared from the cash book balance is a statement',
                  options: ['A Bank Reconciliation Statement (BRS) prepared from the cash book balance is a statement', 'A Bank Reconciliation Statement (BRS) is a periodic statement prepared by an account', 'Cheques issued but not presented for payment refers to the timing difference where a', 'Cheques deposited but not collected refers to a timing difference in Bank Reconciliation'],
                  hint: 'If stuck, revisit nodes c11_acc_cbse_05_002 to c11_acc_cbse_05_007 and create a table with three.',
                  misconception: 'Students often memorize "cheques issued but not presented = ADD" and "cheques deposited but not collected = LESS" as rigid rules without.' }
          ],
            remediations: { 'students-often-memorize-cheques-issued': { steps: ['Draw a timeline: Firm records transaction → Time gap → Bank records transaction.', 'For each item, ask: "Who recorded it first?" and "Which balance is higher/lower because of this?" 3.', 'Use a number line: Place cash book balance, then move toward passbook balance by adding/subtracting the gap.', 'Practice with both favourable and overdraft balances side-by-side for the same set of items to see the pattern: the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_009', difficulty: 'standard',
          question: 'A Bank Reconciliation Statement prepared with the Pass Book balance as the.',
          hint: 'If stuck, revisit c11_acc_cbse_05_002 through c11_acc_cbse_05_007 and for each cause.',
          misconception: 'Students believe the adjustment rules are fixed per item type (e.g., "unpresented cheques are always added") rather.',
          parts: [
                { id: 'a', prompt: 'When the Pass Book shows a credit balance of ₹30,000 and cheques issued but not presented total ₹8,000, what adjustment is made to the Pass Book balance.', answer: '**Answer:** Add ₹8,000 to the Pass Book balance',
                  options: ['**Answer:** Add ₹8,000 to the Pass Book balance', 'unpresented cheques are always added', 'the adjustment rules are fixed per item type (e'],
                  hint: 'If stuck, revisit c11_acc_cbse_05_002 through c11_acc_cbse_05_007 and for each cause of difference.',
                  misconception: 'Students believe the adjustment rules are fixed per item type (e.g., "unpresented cheques are always added") rather than understanding that.' },
                { id: 'b', prompt: 'A firm\'s Pass Book shows a debit balance (overdraft) of ₹25,000.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'unpresented cheques are always added', 'the adjustment rules are fixed per item type (e'],
                  hint: 'If stuck, revisit c11_acc_cbse_05_002 through c11_acc_cbse_05_007 and for each cause of difference.',
                  misconception: 'Students believe the adjustment rules are fixed per item type (e.g., "unpresented cheques are always added") rather than understanding that.' }
          ],
            remediations: { 'the-adjustment-rules-are-fixed': { steps: ['**Visual comparison method:** Draw two columns - "Pass Book" and "Cash Book" - and for each discrepancy, mark which.', 'Example: "Cheques issued not presented" → Pass Book higher (bank hasn\'t paid), Cash Book lower (firm already credited).', '**Arrow rule:** Draw arrow from starting balance to target balance.', 'If Pass Book → Cash Book and Pass Book is higher, arrow points DOWN (deduct).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the adjustment rules are fixed per item type (e.g., "unpresented cheques are always added") rather.',
          parts: [
                { id: 'a', prompt: 'A student prepares BRS from Pass Book balance (credit ₹40,000) and writes: "Cheques issued but not presented ₹5,000 - Deducted". Evaluate this entry.', answer: '**Answer:** The entry is INCORRECT',
                  options: ['**Answer:** The entry is INCORRECT', 'unpresented cheques are always added', 'the adjustment rules are fixed per item type (e'],
                  hint: 'If stuck, revisit c11_acc_cbse_05_002 through c11_acc_cbse_05_007 and for each cause of difference.',
                  misconception: 'Students believe the adjustment rules are fixed per item type (e.g., "unpresented cheques are always added") rather than understanding that.' },
                { id: 'b', prompt: 'Design a BRS problem where the Pass Book shows a credit balance of ₹1,00,000 and there are exactly 5 discrepancies: 2 timing differences that increase Pass.', answer: '**Problem:** Pass Book credit balance ₹1,00,000',
                  options: ['**Problem:** Pass Book credit balance ₹1,00,000', 'unpresented cheques are always added', 'the adjustment rules are fixed per item type (e'],
                  hint: 'If stuck, revisit c11_acc_cbse_05_002 through c11_acc_cbse_05_007 and for each cause of difference.',
                  misconception: 'Students believe the adjustment rules are fixed per item type (e.g., "unpresented cheques are always added") rather than understanding that.' }
          ],
            remediations: { 'the-adjustment-rules-are-fixed': { steps: ['**Visual comparison method:** Draw two columns - "Pass Book" and "Cash Book" - and for each discrepancy, mark which.', 'Example: "Cheques issued not presented" → Pass Book higher (bank hasn\'t paid), Cash Book lower (firm already credited).', '**Arrow rule:** Draw arrow from starting balance to target balance.', 'If Pass Book → Cash Book and Pass Book is higher, arrow points DOWN (deduct).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_010', difficulty: 'standard',
          question: 'A Bank Reconciliation Statement with an overdraft balance reconciles the credit.',
          hint: 'Review the "direction of reconciliation" principle from nodes c11_acc_cbse_05_008 and.',
          misconception: 'Students treat overdraft BRS exactly like favourable balance BRS, just with a "minus sign" on the starting figure.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Bank Reconciliation Statement with an overdraft balance reconciles the credit balance',
                  options: ['A Bank Reconciliation Statement with an overdraft balance reconciles the credit balance', 'A Bank Reconciliation Statement (BRS) is a periodic statement prepared by an account', 'Cheques issued but not presented for payment refers to the timing difference where a', 'Cheques deposited but not collected refers to a timing difference in Bank Reconciliation'],
                  hint: 'Review the "direction of reconciliation" principle from nodes c11_acc_cbse_05_008 and.',
                  misconception: 'Students treat overdraft BRS exactly like favourable balance BRS, just with a "minus sign" on the starting figure.' }
          ],
            remediations: { 'students-treat-overdraft-brs-exactly': { steps: ['**Visualize with a number line**: Draw a horizontal line with zero in middle.', 'Mark cash book overdraft (-45,000) and passbook overdraft (-36,300).', 'Ask: "To go from -45,000 to -36,300, do we add or subtract?" (Add 8,700).', 'This shows overdraft REDUCED.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
