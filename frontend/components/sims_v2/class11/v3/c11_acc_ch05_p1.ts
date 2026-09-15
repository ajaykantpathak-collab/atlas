import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch05_p1: SimDef = {
    id: 'v3_c11_acc_ch05_p1',
    title: 'Bank Reconciliation Statement · Part 1/2',
    subtitle: 'Reconcile the cash book with the passbook by isolating timing and recording differences.',
    classLevel: 11, subject: 'accountancy', topic: 'Bank Reconciliation Statement · Part 1/2',
    chapters: ['c11_acc_ch05'],
    nodeIds: ['c11_acc_cbse_05_001', 'c11_acc_cbse_05_002', 'c11_acc_cbse_05_003', 'c11_acc_cbse_05_004', 'c11_acc_cbse_05_005', 'c11_acc_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an auditor explaining why the bank and the books disagree', intro: 'The bank says one number, the ledger another. Your job: find every reason in between.', goal: 'Identify causes of disagreement between cash book and passbook and prepare a bank reconciliation statement.' },
    discovery: {
        question: 'Your passbook shows ₹12,400 but your cash book says ₹9,800. The bank hasn\'t stolen anything. Which explanation actually accounts for the gap?',
        options: ['Cheques issued but not yet presented, and deposits still in clearing, make the two clocks read differently', 'The bank must have made an error and owes an apology', 'The cash book is wrong and should be rewritten to match the bank', 'Interest credited by the bank can never cause such a gap'],
        answer: 'Cheques issued but not yet presented, and deposits still in clearing, make the two clocks read differently',
        hook: 'Two honest records can disagree purely because of timing — reconciliation is detective work, not accusation.',
    },
    teaching: [
        { title: 'Meaning and Need for Bank Reconciliation Statement', text: 'A Bank Reconciliation Statement (BRS) is a periodic statement prepared by an account holder to reconcile and explain the differences between the bank balance as per the Cash Book (maintained by the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hunt down every timing difference and direct credit hiding between a firm\'s cash book and its bank statement, then reconcile them.',
        labels: ['Meaning and Need', 'Causes of Difference: Cheques', 'Causes of Difference: Bank', 'Causes of Difference: Direct', 'Causes of Difference: Dishonour'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_001', title: 'Meaning and Need for Bank Reconciliation Statement',
          caseStudy: { intro: 'Imagine you run a small clothing store. On March 31st, your Cash Book shows ₹50,000 in the bank, but the bank\'s statement shows ₹42,000.',
            decisions: [{ prompt: 'Define \'Bank Reconciliation Statement\' in one sentence using the precise terminology required for CBSE board exam answer writing.', options: [
                { text: 'A Bank Reconciliation Statement is a statement prepared on a specific date to reconcile', outcome: 'A Bank Reconciliation Statement is a statement prepared on a specific date to reconcile the bank.' },
                { text: 'a statement to check bank balance', outcome: 'Not quite — **Misconception:** "If the Cash Book balance is higher than the Pass Book balance, we always ADD.', reveals: 'misconception-if-the-cash-book' },
                { text: 'a statement to correct errors', outcome: 'Not quite — **Misconception:** "If the Cash Book balance is higher than the Pass Book balance, we always ADD.', reveals: 'misconception-if-the-cash-book' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_002', title: 'Causes of Difference: Cheques Issued but Not Presented',
          caseStudy: { intro: 'Imagine you run a small stationery shop and you pay a supplier ₹5,000 by cheque on 28th March.',
            decisions: [{ prompt: 'What is the immediate effect on the cash book when a cheque is issued to a creditor, and why does this create a difference with the.', options: [
                { text: 'Correct answer: The cash book is credited (bank column) immediately, reducing the cash', outcome: 'Correct answer: The cash book is credited (bank column) immediately, reducing the cash book.' },
                { text: 'the passbook is also debited immediately', outcome: 'Not quite — Students often believe that the bank debits the account on the date the cheque is *issued* (or the.', reveals: 'the-bank-debits-the-account' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_003', title: 'Causes of Difference: Cheques Deposited but Not Collected',
          caseStudy: { intro: 'Imagine you run a small stationery shop in Delhi. A customer from Mumbai pays you ₹15,000 via cheque on March 28th.',
            decisions: [{ prompt: 'A business receives a cheque of ₹25,000 from a customer on March 30th and deposits it the same day.', options: [
                { text: 'The passbook balance will be ₹75,000 (₹1,00,000 - ₹25,000)', outcome: 'The passbook balance will be ₹75,000 (₹1,00,000 - ₹25,000). The cash book recorded the deposit.' },
                { text: 'cheques issued but not presented', outcome: 'Not quite — **The "Always Deduct" Trap**: Students memorize "cheques deposited but not collected → deduct" from.', reveals: 'the-always-deduct-trap-students' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_004', title: 'Causes of Difference: Bank Charges and Interest Credited',
          caseStudy: { intro: 'Imagine you run a small stationery shop. You check your cash book and see ₹50,000 in the bank column. Then you get your bank statement and see ₹49,500.',
            decisions: [{ prompt: 'What is the effect on the passbook balance when the bank debits charges (e.g., incidental charges) that are not yet recorded in the cash.', options: [
                { text: 'The passbook balance decreases relative to the cash book balance', outcome: 'The passbook balance decreases relative to the cash book balance because the bank has already.' },
                { text: 'passbook balance increases', outcome: 'Not quite — Students often think "bank charges are debited in the cash book, so we add them in reconciliation".', reveals: 'bank-charges-are-debited-in' },
                { text: 'bank charges are debited in the cash book, so we add them in reconciliation', outcome: 'Not quite — Students often think "bank charges are debited in the cash book, so we add them in reconciliation".', reveals: 'bank-charges-are-debited-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_005', title: 'Causes of Difference: Direct Deposits by Customers',
          caseStudy: { intro: 'Imagine you run a clothing store and a customer, instead of paying you at the counter, walks into your bank branch and deposits ₹15,000 directly into your.',
            decisions: [{ prompt: 'What is the immediate effect on the bank passbook when a customer directly deposits money into the firm\'s account?', options: [
                { text: 'The bank credits the firm\'s account immediately, increasing the passbook balance', outcome: 'The bank credits the firm\'s account immediately, increasing the passbook balance.' },
                { text: 'passbook balance decreases', outcome: 'Not quite — Students often think that because the money is in the bank, the cash book automatically gets.', reveals: 'because-the-money-is-in' },
                { text: 'no effect', outcome: 'Not quite — Students often think that because the money is in the bank, the cash book automatically gets.', reveals: 'because-the-money-is-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_006', title: 'Causes of Difference: Dishonour of Cheque and Bills',
          caseStudy: { intro: 'Imagine you run a small textile shop in Surat. A customer from Mumbai pays you ₹50,000 via cheque.',
            decisions: [{ prompt: 'What is the immediate effect on the bank passbook when a cheque deposited by the firm is dishonoured?', options: [
                { text: 'The bank debits the firm\'s account, reducing the passbook balance', outcome: 'The bank debits the firm\'s account, reducing the passbook balance.' },
                { text: 'passbook balance increases', outcome: 'Not quite — Students often believe that because the firm had already recorded the cheque/bill as a receipt, the.', reveals: 'because-the-firm-had-already' },
                { text: 'no effect', outcome: 'Not quite — Students often believe that because the firm had already recorded the cheque/bill as a receipt, the.', reveals: 'because-the-firm-had-already' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You run a small online craft store after school. Your own cash book says the bank holds ₹18,600; the bank statement says ₹21,100. The gap traces to: a ₹3,000 cheque you issued to a supplier (not yet presented), a ₹700 bank charge you never recorded, and a ₹4,200 customer UPI that the bank credited but you forgot to enter. Your friend says the bank must have made an error.',
            decisions: [{ prompt: 'How do you explain the difference?', options: [
                { text: 'These are timing differences and your own omissions, not necessarily bank error: starting from the pass book, deduct the unpresented cheque effect appropriately, adjust for the bank charge and the unrecorded credit to reconcile to ₹18,600.', outcome: 'A BRS works because you and the bank record the same events at different times; each item has a direction depending on which balance you start from.' },
                { text: 'Always add the differences to the cash book balance to reach the pass book balance — that\'s the rule.', outcome: 'Direction depends on the starting point and whether the item makes that balance higher or lower; a memorised \'always add\' fails the moment you start from the other side.', reveals: 'brs-always-add-rule' },
                { text: 'The bank probably posted someone else\'s money to your account — file a complaint and wait.', outcome: 'Before blaming the bank, list every item and ask which book recorded it first; almost all gaps are timing differences or your own unrecorded items.', reveals: 'difference-means-bank-error' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'A bank reconciliation statement is how you prove two \'truths\' are the same truth seen at different moments.',
            decisions: [{ prompt: 'What comes next? Bank Reconciliation Statement · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Bank Reconciliation Statement · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_001', difficulty: 'standard',
          question: 'A Bank Reconciliation Statement (BRS) is a periodic statement prepared by.',
          hint: 'Revisit the "entity perspective" concept: role-play as the business (record a payment).',
          misconception: '**Misconception:** "If the Cash Book balance is higher than the Pass Book balance, we always ADD items to the Cash Book.',
          parts: [
                { id: 'a', prompt: 'A student says: "The Cash Book shows a debit balance of ₹20,000 and the Pass Book shows a credit balance of ₹20,000.', answer: 'The reasoning is flawed',
                  options: ['The reasoning is flawed', 'balance equality', 'transaction-level agreement', 'unpresented cheque'],
                  hint: 'Revisit the "entity perspective" concept: role-play as the business (record a payment) and as the.',
                  misconception: '**Misconception:** "If the Cash Book balance is higher than the Pass Book balance, we always ADD items to the Cash Book balance in the BRS.' },
                { id: 'b', prompt: 'On 31st March, M/s Sharma Traders issued a cheque of ₹15,000 to a supplier and recorded it in the Cash Book. The supplier presented the cheque on 5th April.', answer: 'Yes, it causes a difference',
                  options: ['Yes, it causes a difference', 'Pass Book lower', 'no difference', 'unpresented cheque'],
                  hint: 'Revisit the "entity perspective" concept: role-play as the business (record a payment) and as the.',
                  misconception: '**Misconception:** "If the Cash Book balance is higher than the Pass Book balance, we always ADD items to the Cash Book balance in the BRS.' }
          ],
            remediations: { 'misconception-if-the-cash-book': { steps: ['**Draw the "See-Saw" diagram:** Draw two pans — left: Cash Book balance, right: Pass Book balance.', 'Place the known balance on its pan.', 'For each difference, ask: "Does this make the Cash Book pan go up or down relative to the Pass Book pan?" If Cash Book.', 'If starting from Pass Book, we *add* weight to the lighter Pass Book pan.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "If the Cash Book balance is higher than the Pass Book balance, we always ADD items to the Cash Book.',
          parts: [
                { id: 'a', prompt: 'Create a realistic scenario (3-4 transactions) for a small business where the Cash Book balance is **higher** than the Pass Book balance on the reconciliation.', answer: '**Scenario for M/s Gupta Electronics (31st March):** 1',
                  options: ['**Scenario for M/s Gupta Electronics (31st March):** 1', 'unpresented cheque'],
                  hint: 'Revisit the "entity perspective" concept: role-play as the business (record a payment) and as the.',
                  misconception: '**Misconception:** "If the Cash Book balance is higher than the Pass Book balance, we always ADD items to the Cash Book balance in the BRS.' }
          ],
            remediations: { 'misconception-if-the-cash-book': { steps: ['**Draw the "See-Saw" diagram:** Draw two pans — left: Cash Book balance, right: Pass Book balance.', 'Place the known balance on its pan.', 'For each difference, ask: "Does this make the Cash Book pan go up or down relative to the Pass Book pan?" If Cash Book.', 'If starting from Pass Book, we *add* weight to the lighter Pass Book pan.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_002', difficulty: 'standard',
          question: 'Cheques issued but not presented for payment refers to the timing difference.',
          hint: 'If stuck, revisit the concept of \'cheque clearing process\' from Class 7 Economics.',
          misconception: 'Students often believe that the bank debits the account on the date the cheque is *issued* (or the date written on the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cheques issued but not presented for payment refers to the timing difference where a',
                  options: ['Cheques issued but not presented for payment refers to the timing difference where a', 'A Bank Reconciliation Statement (BRS) is a periodic statement prepared by an account', 'Cheques deposited but not collected refers to a timing difference in Bank Reconciliation', 'Bank charges are fees debited by the bank for services (e.g., cheque collection charges,'],
                  hint: 'If stuck, revisit the concept of \'cheque clearing process\' from Class 7 Economics (c7_eco_ch04_008).',
                  misconception: 'Students often believe that the bank debits the account on the date the cheque is *issued* (or the date written on the cheque), not on the.' }
          ],
            remediations: { 'the-bank-debits-the-account': { steps: ['Ask the student to draw two timelines – one for the business (cash book) and one for the bank (passbook).', 'Mark the date of cheque issue on the business timeline and the date of presentation on the bank timeline.', 'Have them compare the balances on the reconciliation date (e.g., 31st March).', 'Explicitly state: "The bank only knows about the cheque when it is physically presented.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_003', difficulty: 'standard',
          question: 'Cheques deposited but not collected refers to a timing difference in Bank.',
          hint: 'Revisit "Cheques issued but not presented" (c11_acc_cbse_05_002) and compare the two.',
          misconception: '**The "Always Deduct" Trap**: Students memorize "cheques deposited but not collected → deduct" from the standard format.',
          parts: [
                { id: 'a', prompt: 'A business receives a cheque of ₹25,000 from a customer on March 30th and deposits it the same day.', answer: 'The passbook balance will be ₹75,000 (₹1,00,000 - ₹25,000)',
                  options: ['The passbook balance will be ₹75,000 (₹1,00,000 - ₹25,000)', 'cheques issued but not presented'],
                  hint: 'Revisit "Cheques issued but not presented" (c11_acc_cbse_05_002) and compare the two — they are.',
                  misconception: '**The "Always Deduct" Trap**: Students memorize "cheques deposited but not collected → deduct" from the standard format where cash book.' },
                { id: 'b', prompt: 'In a BRS problem, the starting point is "Overdraft as per passbook ₹50,000". The problem states: "Cheques deposited but not collected ₹12,000".', answer: '**ADD ₹12,000**',
                  options: ['**ADD ₹12,000**', 'deduct', 'deduct for cheques deposited not collected'],
                  hint: 'Revisit "Cheques issued but not presented" (c11_acc_cbse_05_002) and compare the two — they are.',
                  misconception: '**The "Always Deduct" Trap**: Students memorize "cheques deposited but not collected → deduct" from the standard format where cash book.' }
          ],
            remediations: { 'the-always-deduct-trap-students': { steps: ['If a student shows this misconception: (1) **Stop them from memorizing signs**.', 'Make them draw a "balance comparison diagram" for each scenario: two columns (Cash Book vs Passbook), show which.', '(2) **Use the "Who knows what?" technique**: "Business knows cheque deposited → Cash Book debited.', 'Bank doesn\'t know yet → Passbook not credited.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_004', difficulty: 'standard',
          question: 'Bank charges are fees debited by the bank for services (e.g., cheque collection.',
          hint: 'If stuck, revisit c11_acc_cbse_05_002 and c11_acc_cbse_05_003 to reinforce the pattern.',
          misconception: 'Students often think "bank charges are debited in the cash book, so we add them in reconciliation" because they confuse.',
          parts: [
                { id: 'a', prompt: 'What is the effect on the passbook balance when the bank debits charges (e.g., incidental charges) that are not yet recorded in the cash book?', answer: 'The passbook balance decreases relative to the cash book balance',
                  options: ['The passbook balance decreases relative to the cash book balance', 'passbook balance increases', 'bank charges are debited in the cash book, so we add them in reconciliation'],
                  hint: 'If stuck, revisit c11_acc_cbse_05_002 and c11_acc_cbse_05_003 to reinforce the pattern: "Bank.',
                  misconception: 'Students often think "bank charges are debited in the cash book, so we add them in reconciliation" because they confuse the cash book entry.' },
                { id: 'b', prompt: 'A firm\'s cash book shows a bank balance of ₹75,000. The bank statement shows: (i) Bank charges ₹350 debited by bank, not in cash book; (ii) Interest on deposit.', answer: 'Step 1: Start with cash book balance ₹75,000',
                  options: ['Step 1: Start with cash book balance ₹75,000', 'bank charges are debited in the cash book, so we add them in reconciliation'],
                  hint: 'If stuck, revisit c11_acc_cbse_05_002 and c11_acc_cbse_05_003 to reinforce the pattern: "Bank.',
                  misconception: 'Students often think "bank charges are debited in the cash book, so we add them in reconciliation" because they confuse the cash book entry.' }
          ],
            remediations: { 'bank-charges-are-debited-in': { steps: ['Draw a two-column timeline: left column "Bank\'s Books (Passbook)", right column "Firm\'s Books (Cash Book)".', 'Mark the date when bank debits charges/credits interest.', 'Mark the later date when firm receives statement and records it.', 'Ask: "On the first date, which balance changed?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_005', difficulty: 'standard',
          question: 'Direct deposits by customers refer to amounts deposited directly into the.',
          hint: 'Revisit the meaning and need for bank reconciliation statement (c11_acc_cbse_05_001) and.',
          misconception: 'Students often think that because the money is in the bank, the cash book automatically gets updated.',
          parts: [
                { id: 'a', prompt: 'What is the immediate effect on the bank passbook when a customer directly deposits money into the firm\'s account?', answer: 'The bank credits the firm\'s account immediately, increasing the passbook balance',
                  options: ['The bank credits the firm\'s account immediately, increasing the passbook balance', 'passbook balance decreases', 'no effect', 'because the money is in the bank, the cash book automatically gets updated'],
                  hint: 'Revisit the meaning and need for bank reconciliation statement (c11_acc_cbse_05_001) and the.',
                  misconception: 'Students often think that because the money is in the bank, the cash book automatically gets updated.' },
                { id: 'b', prompt: 'A student says: "Direct deposits by customers increase the cash book balance because the firm receives the money." Explain why this statement is incorrect.', answer: 'The cash book is maintained by the firm',
                  options: ['The cash book is maintained by the firm', 'because the money is in the bank, the cash book automatically gets updated'],
                  hint: 'Revisit the meaning and need for bank reconciliation statement (c11_acc_cbse_05_001) and the.',
                  misconception: 'Students often think that because the money is in the bank, the cash book automatically gets updated.' },
                { id: 'c', prompt: 'On 31st March, the cash book shows a bank balance of ₹50,000. The passbook shows ₹62,000.', answer: 'Add ₹12,000 to the cash book balance',
                  options: ['Add ₹12,000 to the cash book balance', 'because the money is in the bank, the cash book automatically gets updated'],
                  hint: 'Revisit the meaning and need for bank reconciliation statement (c11_acc_cbse_05_001) and the.',
                  misconception: 'Students often think that because the money is in the bank, the cash book automatically gets updated.' },
                { id: 'd', prompt: 'Compare and contrast the effect of "direct deposits by customers" with "cheques deposited but not yet collected" on the cash book and passbook balances.', answer: 'Direct deposits: passbook balance > cash book balance (bank records first)',
                  options: ['Direct deposits: passbook balance > cash book balance (bank records first)', 'because the money is in the bank, the cash book automatically gets updated'],
                  hint: 'Revisit the meaning and need for bank reconciliation statement (c11_acc_cbse_05_001) and the.',
                  misconception: 'Students often think that because the money is in the bank, the cash book automatically gets updated.' }
          ],
            remediations: { 'because-the-money-is-in': { steps: ['Ask the student to draw two parallel timelines — one for the bank, one for the firm — and mark when the deposit happens.', 'Have them physically separate a sample cash book page and a passbook page, then simulate a direct deposit by writing.', 'Ask: "If you only look at the cash book, what balance do you see?" This visual and tactile separation reinforces that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_05_006', difficulty: 'standard',
          question: 'Dishonour of a cheque or bill occurs when a cheque deposited by the firm (or.',
          hint: 'Review the cash book entries for "cheque deposited" and "bill discounted" in Chapter 4.',
          misconception: 'Students often believe that because the firm had already recorded the cheque/bill as a receipt, the cash book balance.',
          parts: [
                { id: 'a', prompt: 'What is the immediate effect on the bank passbook when a cheque deposited by the firm is dishonoured?', answer: 'The bank debits the firm\'s account, reducing the passbook balance',
                  options: ['The bank debits the firm\'s account, reducing the passbook balance', 'passbook balance increases', 'no effect', 'correct'],
                  hint: 'Review the cash book entries for "cheque deposited" and "bill discounted" in Chapter 4 (Recording.',
                  misconception: 'Students often believe that because the firm had already recorded the cheque/bill as a receipt, the cash book balance is "correct" and the.' },
                { id: 'b', prompt: 'A firm deposited a cheque of ₹25,000 on 28th March. The bank credited the firm\'s account on 30th March but the cheque was dishonoured on 2nd April.', answer: 'On 31st March, the cheque has been credited by the bank but not yet dishonoured',
                  options: ['On 31st March, the cheque has been credited by the bank but not yet dishonoured', 'subtract ₹25,000 from cash book balance', 'correct'],
                  hint: 'Review the cash book entries for "cheque deposited" and "bill discounted" in Chapter 4 (Recording.',
                  misconception: 'Students often believe that because the firm had already recorded the cheque/bill as a receipt, the cash book balance is "correct" and the.' },
                { id: 'c', prompt: 'The cash book shows a debit balance of ₹1,00,000. A cheque of ₹15,000 deposited earlier was dishonoured, and the bank debited ₹150 as dishonour charges.', answer: 'Step 1: Start with cash book balance ₹1,00,000 (Dr)',
                  options: ['Step 1: Start with cash book balance ₹1,00,000 (Dr)', 'correct'],
                  hint: 'Review the cash book entries for "cheque deposited" and "bill discounted" in Chapter 4 (Recording.',
                  misconception: 'Students often believe that because the firm had already recorded the cheque/bill as a receipt, the cash book balance is "correct" and the.' },
                { id: 'd', prompt: 'Compare the treatment of a dishonoured cheque in the Bank Reconciliation Statement when (a) starting from cash book balance and (b) starting from passbook.', answer: 'starting from cash book balance and (',
                  options: ['starting from cash book balance and (', 'correct'],
                  hint: 'Review the cash book entries for "cheque deposited" and "bill discounted" in Chapter 4 (Recording.',
                  misconception: 'Students often believe that because the firm had already recorded the cheque/bill as a receipt, the cash book balance is "correct" and the.' }
          ],
            remediations: { 'because-the-firm-had-already': { steps: ['Draw a timeline: Show the sequence – cheque deposited → firm records in cash book (balance up) → bank credits (passbook.', 'Ask: "At the reconciliation date, which balance is higher?', 'Use the "see-saw" analogy: The two balances are on a see-saw.', 'Dishonour pushes the passbook side down.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
