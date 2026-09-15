import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch03_p2: SimDef = {
    id: 'v3_c12_acc_ch03_p2',
    title: 'Reconstitution of a Partnership Firm - Retirement/Death of a Partner · Part 2/2',
    subtitle: 'One partner exits — who gains his share, and who pays for his goodwill?',
    classLevel: 12, subject: 'accountancy', topic: 'Reconstitution of a Partnership Firm - Retirement/Death of a Partner · Part 2/2',
    chapters: ['c12_acc_ch03'],
    nodeIds: ['c12_acc_cbse_03_007', 'c12_acc_cbse_03_008', 'c12_acc_cbse_03_009', 'c12_acc_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Firm accountant managing a partner\'s exit', intro: 'When a partner leaves, the firm doesn\'t just lose a person — it silently redistributes every future rupee of profit.', goal: 'Compute gaining and new ratios and settle the retiring partner\'s goodwill through capital adjustments.' },
    discovery: {
        question: 'Chirag retires from a firm where Aryan, Bhavya and Chirag shared 3:2:1. The deed says nothing about who inherits his 1/6 share. What does the law assume?',
        options: ['The continuing partners gain in their old ratio — Aryan and Bhavya absorb it 3:2', 'The share is split equally between the two remaining partners', 'The share lapses — profits are now shared only between two, with no gain computed', 'The retiring partner chooses who inherits the share in his will'],
        answer: 'The continuing partners gain in their old ratio — Aryan and Bhavya absorb it 3:2',
        hook: 'Silence in the deed is itself an answer: absent an explicit deal, the gaining ratio defaults to the old ratio — and that default decides who funds the retiring partner\'s goodwill.',
    },
    teaching: [
        { title: 'Joint Life Policy and Individual Life Policy: Accounting Treatment', text: 'Joint Life Policy (JLP) is an insurance policy taken by a partnership firm on the lives of all partners jointly, where the sum assured becomes payable on the death of any partner or at maturity.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Handle a retirement end-to-end: compute the gaining ratio, compensate the outgoing partner\'s goodwill share through the gainers\' capital accounts, and restate the firm\'s future profit split.',
        labels: ['Joint Life Policy', 'Adjustment of Capitals', 'Preparation of Deceased Partner\'s', 'Journal Entries for Retirement'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_03_008', title: 'Adjustment of Capitals of Continuing Partners after Retirement',
          scaffold: { problem: 'A, B, C share profits 4:3:3. C retires. After all adjustments (goodwill, revaluation, reserves), their capitals are: A ₹2,00,000,.',
            steps: [
            { text: 'Determine total capital of reconstituted firm = A\'s adjusted capital + B\'s adjusted capital = ₹2,00,000 + ₹1,50,000.' },
            { text: 'New ratio of A and B = 3:2. Sum of ratio terms = 5.' },
            { text: 'Compute new capitals: A = ₹3,50,000 × 3/5 = ₹2,10,000; B = ₹3,50,000 × 2/5 = ₹1,40,000.' },
            { text: 'Compare with adjusted capitals: A has ₹2,00,000 (deficit ₹10,000 → bring in cash).' },
            { text: 'Journal entries: Bank A/c Dr. ₹10,000 → A\'s Capital A/c ₹10,000; B\'s Capital A/c Dr. ₹10,000 → Bank A/c ₹10,000.', faded: true, blankAnswer: 'A brings in ₹10,000; B withdraws ₹10,000.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student-run print shop has three partners sharing 5:3:2. The third partner retires and the other two agree to share future profits 3:2. The junior accountant adjusts the retiring partner\'s ₹12,000 goodwill share by debiting the continuing partners in 3:2.',
            decisions: [{ prompt: 'Is the goodwill split right?', options: [
                { text: 'No — goodwill is compensated in the gaining ratio (new share minus old share): A gains 6/10−5/10=1/10 and B gains 4/10−3/10=1/10, so it\'s 1:1, i.e. ₹6,000 each.', outcome: 'The gaining ratio is derived from how much each continuing partner\'s share rose, not from the new profit-sharing ratio itself.' },
                { text: 'Yes — the new profit-sharing ratio 3:2 is the gaining ratio, so debit ₹7,200 and ₹4,800.', outcome: 'That confuses the new ratio with the gaining ratio — the classic board-exam trap; gains must be computed as New minus Old for each partner.', reveals: 'new-ratio-is-gaining-ratio' },
                { text: 'Split it equally anyway — retirement always means equal gains for continuing partners.', outcome: 'Equal gains happen here by coincidence of the numbers; the rule is gain = new share − old share, which is often unequal.', reveals: 'retirement-always-equal-gain' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'Retirement is admission run in reverse — and you\'ve now mastered both directions. Boards love gaining-ratio puzzles; real practice hands you the same arithmetic with real money.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_007', difficulty: 'standard',
          question: 'Joint Life Policy (JLP) is an insurance policy taken by a partnership firm.',
          hint: 'Revisit "Provisions and Reserves" (c11_acc_cbse_07_009, c11_acc_cbse_07_010) to clarify.',
          misconception: 'Students often believe that on a partner\'s death, the full sum assured of an Individual Life Policy goes entirely.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the premium paid on a Joint Life Policy is debited to Profit and Loss Account, but the surrender value received is credited.', answer: 'Premium is a revenue expense',
                  options: ['Premium is a revenue expense', 'both go to P&L', 'surrender value is profit'],
                  hint: 'Revisit "Provisions and Reserves" (c11_acc_cbse_07_009, c11_acc_cbse_07_010) to clarify why JLP.',
                  misconception: 'Students often believe that on a partner\'s death, the full sum assured of an Individual Life Policy goes entirely to the deceased partner\'s.' },
                { id: 'b', prompt: 'Compare and contrast the accounting treatment of Joint Life Policy and Individual Life Policy when a partner retires.', answer: 'who receives the policy proceeds, (',
                  options: ['who receives the policy proceeds, (', 'JLP proceeds go only to continuing partners', 'ILP profit goes only to that partner'],
                  hint: 'Revisit "Provisions and Reserves" (c11_acc_cbse_07_009, c11_acc_cbse_07_010) to clarify why JLP.',
                  misconception: 'Students often believe that on a partner\'s death, the full sum assured of an Individual Life Policy goes entirely to the deceased partner\'s.' }
          ],
            remediations: { 'on-a-partner-s-death': { steps: ['Revisit the concept that insurance premium is a revenue expense (P&L debit) while surrender value is an asset.', 'Practice the two methods separately. For surrender value method: draw a T-account for "Joint Life Policy" showing.', 'Solve a retirement problem where policy is surrendered — trace every rupee from Bank → Policy → Partners\' Capital.', 'Solve a death problem with ILP — separate the surrender value (capital return) from profit (shared).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that on a partner\'s death, the full sum assured of an Individual Life Policy goes entirely.',
          parts: [
                { id: 'a', prompt: 'A firm maintains its Joint Life Policy at full sum assured (₹50 lakh) by creating a "Joint Life Policy Reserve". Annual premium ₹2 lakh.', answer: 'Maintaining at sum assured with reserve: - Premium: P&L Dr',
                  options: ['Maintaining at sum assured with reserve: - Premium: P&L Dr', 'sum assured method shows higher profit'],
                  hint: 'Revisit "Provisions and Reserves" (c11_acc_cbse_07_009, c11_acc_cbse_07_010) to clarify why JLP.',
                  misconception: 'Students often believe that on a partner\'s death, the full sum assured of an Individual Life Policy goes entirely to the deceased partner\'s.' }
          ],
            remediations: { 'on-a-partner-s-death': { steps: ['Revisit the concept that insurance premium is a revenue expense (P&L debit) while surrender value is an asset.', 'Practice the two methods separately. For surrender value method: draw a T-account for "Joint Life Policy" showing.', 'Solve a retirement problem where policy is surrendered — trace every rupee from Bank → Policy → Partners\' Capital.', 'Solve a death problem with ILP — separate the surrender value (capital return) from profit (shared).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_008', difficulty: 'standard',
          question: 'Adjustment of Capitals of Continuing Partners after Retirement is the process.',
          hint: 'Revisit the capital account preparation steps in c12_acc_cbse_03_002, 003, 004, 005.',
          misconception: 'Students often **calculate new capitals using the old profit-sharing ratio** or **use the pre-adjustment capital.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Adjustment of Capitals of Continuing Partners after Retirement is the process of',
                  options: ['Adjustment of Capitals of Continuing Partners after Retirement is the process of', 'When a partner retires from a partnership firm, the continuing partners acquire the', 'Treatment of Goodwill on Retirement of a Partner refers to the accounting process of', 'Revaluation Account is a nominal account prepared at the time of retirement (or'],
                  hint: 'Revisit the capital account preparation steps in c12_acc_cbse_03_002, 003, 004, 005 — specifically.',
                  misconception: 'Students often **calculate new capitals using the old profit-sharing ratio** or **use the pre-adjustment capital balances** (before.' }
          ],
            remediations: { 'students-often-calculate-new-capitals': { steps: ['Revisit **c12_acc_cbse_03_001** (New Profit Sharing Ratio) to confirm the new ratio.', 'Revisit **c12_acc_cbse_03_002, 003, 004** (Goodwill, Revaluation, Reserves adjustments) and re-do the capital account.', 'Verify the **total capital of the reconstituted firm** = Sum of continuing partners\' adjusted capitals (after retiring.', 'Practice one simple problem: given adjusted capitals and new ratio, compute new capitals and cash movements.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_009', difficulty: 'standard',
          question: 'The Deceased Partner\'s Capital Account is a ledger account that aggregates all.',
          hint: 'If stuck on any adjustment item, revisit the specific prerequisite node: profit share →.',
          misconception: 'Students consistently treat the Joint Life Policy (JLP) proceeds as fully creditable to the deceased partner\'s capital.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Deceased Partner\'s Capital Account is a ledger account that aggregates all claims of',
                  options: ['The Deceased Partner\'s Capital Account is a ledger account that aggregates all claims of', 'When a partner retires from a partnership firm, the continuing partners acquire the', 'Treatment of Goodwill on Retirement of a Partner refers to the accounting process of', 'Revaluation Account is a nominal account prepared at the time of retirement (or'],
                  hint: 'If stuck on any adjustment item, revisit the specific prerequisite node: profit share →.',
                  misconception: 'Students consistently treat the Joint Life Policy (JLP) proceeds as fully creditable to the deceased partner\'s capital account regardless.' }
          ],
            remediations: { 'students-consistently-treat-the-joint': { steps: ['If the student cannot distinguish JLP treatments: (1) Make them write the three JLP accounting policies side-by-side.', '(2) For each, trace the journal entries on death: receipt of claim, transfer to Realisation/Capital.', '(3) Give a mini-case: SV ₹60,000, SA ₹1,50,000, ratio 2:1.', 'Ask: "How much does deceased get in each policy?" (Answer: (a) ₹60,000 × share; (b) ₹1,50,000 × share; (c) ₹1,50,000.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_03_010', difficulty: 'standard',
          question: 'Journal entries for retirement and death of a partner are the systematic.',
          hint: 'If stuck on gaining ratio: Revisit c12_acc_cbse_03_001 and practice "New Share minus Old.',
          misconception: '**Misconception:** "Goodwill adjustment on retirement is always done by debiting continuing partners\' capital accounts.',
          parts: [
                { id: 'a', prompt: 'A, B, C share profits 5:3:2. B retires. Goodwill of the firm is valued at ₹1,20,000. No goodwill appears in books.', answer: '**Step 1:** Old ratio = 5:3:2',
                  options: ['**Step 1:** Old ratio = 5:3:2', 'gaining ratio', 'both continuing partners gain'],
                  hint: 'If stuck on gaining ratio: Revisit c12_acc_cbse_03_001 and practice "New Share minus Old Share" for.',
                  misconception: '**Misconception:** "Goodwill adjustment on retirement is always done by debiting continuing partners\' capital accounts in their **new.' }
          ],
            remediations: { 'misconception-goodwill-adjustment-on-retirement': { steps: ['** Revisit **c12_acc_cbse_03_001** (New Profit Sharing Ratio and Gaining Ratio) — recalculate gaining ratio for 5.', '** Revisit **c12_acc_cbse_03_002** (Treatment of Goodwill on Retirement) — practice the three cases: (a) Goodwill.', '** Take a blank sheet. Write the **standard journal entry template** for each adjustment type (8 templates total).', '** Re-attempt Diagnostic Question 3 and 6. Verify every ratio calculation with a peer or teacher.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
