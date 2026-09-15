import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch05_p2: SimDef = {
    id: 'v3_c12_acc_ch05_p2',
    title: 'Accounting for Share Capital · Part 2/2',
    subtitle: 'Fixed dividend or voting power? Every rupee of capital makes you choose.',
    classLevel: 12, subject: 'accountancy', topic: 'Accounting for Share Capital · Part 2/2',
    chapters: ['c12_acc_ch05'],
    nodeIds: ['c12_acc_cbse_05_007', 'c12_acc_cbse_05_008', 'c12_acc_cbse_05_009', 'c12_acc_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'CFO designing the company\'s share capital', intro: 'Raising ownership capital is a trade: what rights you sell decides what the money costs you.', goal: 'Compare equity and preference shares and select among public issue, private placement and rights issue.' },
    discovery: {
        question: 'A company offers shares paying a fixed 8% dividend, paid before anyone else, and refunded first on winding up — but holders cannot vote. What are these?',
        options: ['Preference shares — fixed dividend and priority in payment, but no voting rights', 'Equity shares — because every shareholder owns the company equally', 'Debentures — because the 8% return is fixed like interest', 'Sweat equity — issued for fixed consideration to employees'],
        answer: 'Preference shares — fixed dividend and priority in payment, but no voting rights',
        hook: 'Fixed return tempts students to call it debt — but preference dividends come from profits, not contractual interest, and that single difference rewrites the balance sheet.',
    },
    teaching: [
        { title: 'Forfeiture of Shares: Journal Entries and Accounting Treatment', text: 'Forfeiture of shares is the cancellation of shares by a company when a shareholder fails to pay the call money (or any instalment due) within the stipulated time, resulting in the shareholder losing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Structure a ₹1 crore raise: weigh equity against preference capital, then choose between public issue, private placement and a rights issue — matching each route to the company\'s situation.',
        labels: ['Forfeiture of Shares: Journal', 'Re-issue of Forfeited Shares', 'Buyback of Shares: Conditions,', 'Presentation of Share Capital'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_05_008', title: 'Re-issue of Forfeited Shares and Treatment of Forfeiture Amount',
          scaffold: { problem: 'XYZ Ltd. forfeited 200 equity shares of ₹10 each, ₹8 called up, for non-payment of first call of ₹2 per share.',
            steps: [
            { text: 'Determine the forfeited amount per share. The shareholder paid ₹3 (application) + ₹3 (allotment) = ₹6 per share.' },
            { text: 'Determine re-issue price and discount. Re-issue at ₹8 per share, face value ₹10 → discount = ₹2 per share.' },
            { text: 'Check if discount ≤ forfeited amount. ₹400 ≤ ₹1,200 → allowed.' },
            { text: 'Pass journal entries:' },
            { text: 'Verify Capital Reserve = ₹800. The Forfeited Shares Account is now closed.', faded: true, blankAnswer: 'Journal entries as above; Capital Reserve = ₹800.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_05_009', title: 'Buyback of Shares: Conditions, Sources and Accounting Treatment',
          scaffold: { problem: 'Apex Ltd. has the following Balance Sheet extracts as on 31st March 2024:',
            steps: [
            { text: 'Identify free reserves = General Reserve + Surplus = ₹3,00,00,000 + ₹2,00,00,000 = ₹5,00,00,000.' },
            { text: 'Compute 25% limit = 25% × (Paid-up Capital ₹5,00,00,000 + Free Reserves ₹5,00,00,000) = 25% × ₹10,00,00,000.' },
            { text: 'Buyback consideration = 10 lakh × ₹25 = ₹2,50,00,000. Nominal value cancelled = 10 lakh × ₹10 = ₹1,00,00,000.' },
            { text: 'Pass buyback entry: Equity Share Capital A/c Dr. 1,00,00,000; Securities Premium A/c Dr.' },
            { text: 'Transfer to CRR: General Reserve A/c Dr. 1,00,00,000 → Capital Redemption Reserve A/c 1,00,00,000.', faded: true, blankAnswer: 'Maximum permissible buyback = 25 lakh shares (₹2.5.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_05_010', title: 'Presentation of Share Capital in Balance Sheet (Schedule III, Part I)',
          caseStudy: { intro: 'Imagine you are the accountant of "TechNova Ltd." which has just completed its IPO. The board asks you to finalize the Balance Sheet.',
            decisions: [{ prompt: 'A company has Authorised Capital of 10,00,000 equity shares of ₹10 each.', options: [
                { text: 'Correct presentation: Authorised Capital: 10,00,000 shares of ₹10 each = ₹1,00,00,000', outcome: 'Correct presentation: Authorised Capital: 10,00,000 shares of ₹10 each = ₹1,00,00,000 Issued.' },
                { text: 'Subscribed Capital ₹80,00,000', outcome: 'Not quite — Students often think "Paid‑up Capital" in the Balance Sheet is simply "Issued Capital minus Calls.', reveals: 'paid-up-capital-in-the' },
                { text: 'Paid‑up Capital', outcome: 'Not quite — Students often think "Paid‑up Capital" in the Balance Sheet is simply "Issued Capital minus Calls.', reveals: 'paid-up-capital-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A college entrepreneur needs ₹50 lakh for her D2C brand. A risk-averse uncle will invest only for a fixed return and wants no say in decisions; a friend wants voting rights and accepts that dividends will vary with profits.',
            decisions: [{ prompt: 'How should she match instruments to investors?', options: [
                { text: 'Issue preference shares to the uncle — fixed dividend paid before equity and priority on repayment, normally no voting — and equity shares to the friend, who gets votes on every resolution and a residual, variable dividend.', outcome: 'Each share class fits the investor: preference is a hybrid for conservative fixed-return money; equity is ownership with control and residual risk-return.' },
                { text: 'Give the uncle debentures instead — they\'re identical to preference shares since both carry a fixed return.', outcome: 'They\'re not identical: preference dividend is an appropriation of profit, not a charge like interest, and preference shareholders are members, not creditors — skipping their dividend doesn\'t trigger bankruptcy.', reveals: 'preference-equals-debenture' },
                { text: 'Issue equity to the uncle too — all shareholders get the same dividend anyway.', outcome: 'Equity dividend isn\'t fixed and comes only after preference dividend; in a lean year he\'d get nothing despite wanting a fixed return.', reveals: 'all-shares-same-dividend' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_05_010', title: 'You made it',
          caseStudy: { intro: 'You can now read a capital structure like an investor does. Equity vs preference and issue methods are board staples — and the actual vocabulary of every IPO headline you\'ll ever read.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_007', difficulty: 'standard',
          question: 'Forfeiture of shares is the cancellation of shares by a company when.',
          hint: 'If stuck, revisit the call-wise breakup of issue price in node c12_acc_cbse_05_003 and.',
          misconception: 'Students often believe that when shares are forfeited, the Securities Premium Reserve must always be debited if shares.',
          parts: [
                { id: 'a', prompt: 'X Ltd. issued shares of ₹100 each at a premium of ₹20, payable as: ₹30 on application, ₹50 on allotment (including premium), ₹40 on first call.', answer: 'Correct entry: Share Capital A/c Dr',
                  options: ['Correct entry: Share Capital A/c Dr', 'premium once credited must be reversed'],
                  hint: 'If stuck, revisit the call-wise breakup of issue price in node c12_acc_cbse_05_003 and the calls.',
                  misconception: 'Students often believe that when shares are forfeited, the Securities Premium Reserve must always be debited if shares were originally.' }
          ],
            remediations: { 'when-shares-are-forfeited': { steps: ['If the student makes the above errors: (1) Revisit node c12_acc_cbse_05_003 (Issue at Premium/Discount) to see when.', '(2) Revisit node c12_acc_cbse_05_005 (Calls in Arrears) to identify which call includes premium/discount.', '(3) Practice 5 forfeiture problems: 2 at par, 2 at premium (one with premium in arrears, one with premium received), 1.', 'For each, explicitly write: "Called-up capital = ₹X, Unpaid call = ₹Y, Premium/Discount in arrears = ₹Z, Amount.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_008', difficulty: 'standard',
          question: 'Re-issue of forfeited shares refers to the process where a company re-allots.',
          hint: 'Review the forfeiture entries in c12_acc_cbse_05_007, focusing on how the Forfeited.',
          misconception: 'Students often think that the forfeited amount (credit balance in Forfeited Shares Account) can be used to write off.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Re-issue of forfeited shares refers to the process where a company re-allots shares that',
                  options: ['Re-issue of forfeited shares refers to the process where a company re-allots shares that', 'A share is a unit of ownership in a company that entitles the holder to a proportionate', 'Public Issue, Private Placement, and Rights Issue are three distinct methods through', 'Issue of shares at par means shares are issued at a price equal to their face (nominal)'],
                  hint: 'Review the forfeiture entries in c12_acc_cbse_05_007, focusing on how the Forfeited Shares Account.',
                  misconception: 'Students often think that the forfeited amount (credit balance in Forfeited Shares Account) can be used to write off any discount.' }
          ],
            remediations: { 'the-forfeited-amount-credit-balance': { steps: ['Revisit the forfeiture entries in c12_acc_cbse_05_007 to confirm how the Forfeited Shares Account gets its credit.', 'Practice the rule: "Discount on re-issue ≤ Forfeited amount on those shares" by solving 5 problems where you calculate.', 'Write out the three journal entry patterns (par, discount, premium) side by side and highlight which account.', 'Verify each entry with the accounting equation: Assets = Liabilities + Capital + Reserves.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_009', difficulty: 'standard',
          question: 'Buyback of shares is a corporate action where a company repurchases its own.',
          hint: 'Revisit c11_acc_cbse_07_010 (Reserves: Meaning and Types) and make a two-column table.',
          misconception: 'Students treat buyback premium (buyback price minus face value) as a "loss on buyback" and debit it to Statement.',
          parts: [
                { id: 'a', prompt: 'TechNova Ltd. has: Equity Share Capital ₹20 cr (₹10 face value), Securities Premium ₹5 cr, General Reserve ₹15 cr, Profit & Loss ₹10 cr.', answer: 'buyback, (',
                  options: ['buyback, (', 'Loss on Buyback', 'Profit on Buyback'],
                  hint: 'Revisit c11_acc_cbse_07_010 (Reserves: Meaning and Types) and make a two-column table: "Free.',
                  misconception: 'Students treat buyback premium (buyback price minus face value) as a "loss on buyback" and debit it to Statement of Profit and Loss,.' }
          ],
            remediations: { 'students-treat-buyback-premium-buyback': { steps: ['If a student debits "Loss on Buyback" to P&L: (1) Ask them to locate "Loss on Buyback" in the NCERT chart of accounts.', '(2) Show side-by-side: Debenture Redemption (premium on redemption → Loss on Issue of Debentures → written off from.', '(3) Make them redo Diagnostic Question 3 with the constraint: "No account named \'Profit/Loss on Buyback\' may appear.".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_010', difficulty: 'standard',
          question: 'Presentation of Share Capital in the Balance Sheet as per Schedule III, Part.',
          hint: 'If confused about any capital category, revisit the specific sibling node.',
          misconception: 'Students often think "Paid‑up Capital" in the Balance Sheet is simply "Issued Capital minus Calls in Arrears".',
          parts: [
                { id: 'a', prompt: 'Why does Schedule III require separate disclosure of "Subscribed and fully paid‑up" and "Subscribed but not fully paid‑up" under Subscribed Capital?', answer: 'Schedule III demands this split',
                  options: ['Schedule III demands this split', 'it\'s just for detail', 'Paid‑up Capital', 'Issued Capital minus Calls in Arrears'],
                  hint: 'If confused about any capital category, revisit the specific sibling node: c12_acc_cbse_05_003 for.',
                  misconception: 'Students often think "Paid‑up Capital" in the Balance Sheet is simply "Issued Capital minus Calls in Arrears".' }
          ],
            remediations: { 'paid-up-capital-in-the': { steps: ['If a student cannot correctly build the Share Capital note: 1.', 'Revisit c12_acc_cbse_05_003 (Issue at Par/Premium/Discount) to recall how issue price affects Securities Premium but.', 'Revisit c12_acc_cbse_05_005 (Calls in Arrears/Advance) to distinguish arrears (asset?', 'no, deduction from called‑up) vs advance (liability).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Paid‑up Capital" in the Balance Sheet is simply "Issued Capital minus Calls in Arrears".',
          parts: [
                { id: 'a', prompt: 'Design a new scenario (different from the worked examples) where a company has both Equity and Preference Share Capital, with some shares issued for.', answer: 'A good answer will: 1',
                  options: ['A good answer will: 1', 'Paid‑up Capital', 'Issued Capital minus Calls in Arrears'],
                  hint: 'If confused about any capital category, revisit the specific sibling node: c12_acc_cbse_05_003 for.',
                  misconception: 'Students often think "Paid‑up Capital" in the Balance Sheet is simply "Issued Capital minus Calls in Arrears".' }
          ],
            remediations: { 'paid-up-capital-in-the': { steps: ['If a student cannot correctly build the Share Capital note: 1.', 'Revisit c12_acc_cbse_05_003 (Issue at Par/Premium/Discount) to recall how issue price affects Securities Premium but.', 'Revisit c12_acc_cbse_05_005 (Calls in Arrears/Advance) to distinguish arrears (asset?', 'no, deduction from called‑up) vs advance (liability).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
