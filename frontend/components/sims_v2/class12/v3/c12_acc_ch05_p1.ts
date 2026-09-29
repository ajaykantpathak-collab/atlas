import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch05_p1: SimDef = {
    id: 'v3_c12_acc_ch05_p1',
    title: 'Accounting for Share Capital · Part 1/2',
    subtitle: 'Fixed dividend or voting power? Every rupee of capital makes you choose.',
    classLevel: 12, subject: 'accountancy', topic: 'Accounting for Share Capital · Part 1/2',
    chapters: ['c12_acc_ch05'],
    nodeIds: ['c12_acc_cbse_05_001', 'c12_acc_cbse_05_002', 'c12_acc_cbse_05_003', 'c12_acc_cbse_05_004', 'c12_acc_cbse_05_005', 'c12_acc_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'CFO designing the company\'s share capital', intro: 'Raising ownership capital is a trade: what rights you sell decides what the money costs you.', goal: 'Compare equity and preference shares and select among public issue, private placement and rights issue.' },
    discovery: {
        question: 'A company offers shares paying a fixed 8% dividend, paid before anyone else, and refunded first on winding up — but holders cannot vote. What are these?',
        options: ['Preference shares — fixed dividend and priority in payment, but no voting rights', 'Equity shares — because every shareholder owns the company equally', 'Debentures — because the 8% return is fixed like interest', 'Sweat equity — issued for fixed consideration to employees'],
        answer: 'Preference shares — fixed dividend and priority in payment, but no voting rights',
        hook: 'Fixed return tempts students to call it debt — but preference dividends come from profits, not contractual interest, and that single difference rewrites the balance sheet.',
    },
    teaching: [
        { title: 'Share and Share Capital: Equity Shares vs Preference Shares', text: 'A share is a unit of ownership in a company that entitles the holder to a proportionate claim on the company\'s profits (dividends) and assets.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Structure a ₹1 crore raise: weigh equity against preference capital, then choose between public issue, private placement and a rights issue — matching each route to the company\'s situation.',
        labels: ['Share and Share Capital', 'Issue of Shares: Public', 'Issue of Shares at', 'Minimum Subscription, Over-subscription', 'Calls in Arrears', 'Issue of Shares'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_acc_cbse_05_001', title: 'Share and Share Capital: Equity Shares vs Preference Shares',
          caseStudy: { intro: 'Imagine you want to start a business and need ₹1 crore. You could borrow (debt) or invite people to become owners by selling "shares".',
            decisions: [{ prompt: 'What is the primary distinction between equity shares and preference shares regarding dividend payment?', options: [
                { text: 'Equity shareholders receive dividends only after preference shareholders have been paid,', outcome: 'Equity shareholders receive dividends only after preference shareholders have been paid, and the.' },
                { text: 'both get fixed dividends', outcome: 'Not quite — Students often think "preference shares are just like debentures because both have fixed returns.".', reveals: 'preference-shares-are-just-like' },
                { text: 'equity gets paid first', outcome: 'Not quite — Students often think "preference shares are just like debentures because both have fixed returns.".', reveals: 'preference-shares-are-just-like' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_05_003', title: 'Issue of Shares at Par, at Premium and at Discount',
          caseStudy: { intro: 'Imagine a startup, "GreenEnergy Ltd.", wants to raise ₹50 lakh by issuing 5 lakh equity shares of ₹10 each.',
            decisions: [{ prompt: 'State the correct journal entry when a company issues 10,000 equity shares of ₹10 each at par, payable ₹3 on application, ₹4 on allotment.', options: [
                { text: 'Correct entries: 1', outcome: 'Correct entries: 1. Bank A/c Dr. 30,000 → Share Application A/c 30,000 2. Share Application A/c Dr.' },
                { text: 'capital received', outcome: 'Not quite — Students often think that when shares are issued at a discount, the Share Capital account.', reveals: 'when-shares-are-issued-at' },
                { text: 'share capital', outcome: 'Not quite — Students often think that when shares are issued at a discount, the Share Capital account.', reveals: 'when-shares-are-issued-at' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_05_004', title: 'Minimum Subscription, Over-subscription and Pro-rata Allotment',
          scaffold: { problem: 'XYZ Ltd. issued 2,00,000 equity shares of ₹10 each at a premium of ₹2 per share, payable as ₹3 on application, ₹5 on allotment (including.',
            steps: [
            { text: 'Calculate minimum subscription: 90% of (2,00,000 × ₹12) = 90% of ₹24,00,000 = ₹21,60,000.' },
            { text: 'Determine pro-rata ratio: Shares issued : Shares applied = 2,00,000 : 3,00,000 = 2:3.' },
            { text: 'Calculate application money accounting: Total received = 3,00,000 × ₹3 = ₹9,00,000.' },
            { text: 'Calculate allotment due and adjustment: Allotment due = 2,00,000 × ₹5 = ₹10,00,000.' },
            { text: 'Calculate call due: Call due = 2,00,000 × ₹4 = ₹8,00,000. No excess remaining, so full ₹8,00,000 receivable.' },
            { text: 'Pass journal entries:' },
            { text: 'Verify: Total cash received = 9,00,000 + 7,00,000 + 8,00,000 = ₹24,00,000 = 2,00,000 × ₹12. Correct.', faded: true, blankAnswer: 'Journal entries as above. Total cash collected ₹24,00,000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_05_005', title: 'Calls in Arrears and Calls in Advance: Accounting Treatment',
          scaffold: { problem: 'XYZ Ltd. issued 20,000 equity shares of ₹100 each at a premium of ₹20 per share, payable as ₹30 on application, ₹50 on allotment (including.',
            steps: [
            { text: 'Calculate amounts due — Allotment per share = ₹50 (₹30 capital + ₹20 premium), Call per share = ₹40.' },
            { text: 'Shareholder A (400 shares) — Allotment due = 400 × ₹50 = ₹20,000.' },
            { text: 'Shareholder B (300 shares) — Allotment due = 300 × ₹50 = ₹15,000. Application money paid = 300 × (5/4) × ₹30 = ₹11,250.' },
            { text: 'Journal for Allotment: Share Allotment A/c Dr. 10,00,000 (20,000 × ₹50) To Share Capital A/c 6,00,000 To Securities.' },
            { text: 'Journal for Call: Share First & Final Call A/c Dr. 8,00,000 (20,000 × ₹40) To Share Capital A/c 8,00,000. Bank A/c Dr.' },
            { text: 'Interest on Arrears (6 months): ₹17,000 × 10% × 6/12 = ₹850. Shareholder A / Calls in Arrears A/c Dr.' },
            { text: 'Year-end transfer: Interest on Calls in Arrears A/c Dr. 850 To Profit & Loss A/c 850. Profit & Loss A/c Dr.', faded: true, blankAnswer: 'Journal entries as above. Balance Sheet extract: Share.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_05_006', title: 'Issue of Shares for Consideration Other than Cash',
          caseStudy: { intro: 'Imagine a startup, "GreenTech Ltd.", wants to buy a factory building worth ₹50 lakh from "BuildCo" but lacks cash.',
            decisions: [{ prompt: 'A company issues 10,000 shares of ₹10 each at par to a vendor for machinery worth ₹1,00,000.', options: [
                { text: '**Answer:** Share Capital Account is credited with ₹1,00,000', outcome: '**Answer:** Share Capital Account is credited with ₹1,00,000. **Why wrong answers reveal.' },
                { text: 'Vendor Account', outcome: 'Not quite — **Misconception:** "When shares are issued for non-cash consideration, the asset account is debited.', reveals: 'misconception-when-shares-are-issued' },
                { text: 'Machinery Account', outcome: 'Not quite — **Misconception:** "When shares are issued for non-cash consideration, the asset account is debited.', reveals: 'misconception-when-shares-are-issued' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A college entrepreneur needs ₹50 lakh for her D2C brand. A risk-averse uncle will invest only for a fixed return and wants no say in decisions; a friend wants voting rights and accepts that dividends will vary with profits.',
            decisions: [{ prompt: 'How should she match instruments to investors?', options: [
                { text: 'Issue preference shares to the uncle — fixed dividend paid before equity and priority on repayment, normally no voting — and equity shares to the friend, who gets votes on every resolution and a residual, variable dividend.', outcome: 'Each share class fits the investor: preference is a hybrid for conservative fixed-return money; equity is ownership with control and residual risk-return.' },
                { text: 'Give the uncle debentures instead — they\'re identical to preference shares since both carry a fixed return.', outcome: 'They\'re not identical: preference dividend is an appropriation of profit, not a charge like interest, and preference shareholders are members, not creditors — skipping their dividend doesn\'t trigger bankruptcy.', reveals: 'preference-equals-debenture' },
                { text: 'Issue equity to the uncle too — all shareholders get the same dividend anyway.', outcome: 'Equity dividend isn\'t fixed and comes only after preference dividend; in a lean year he\'d get nothing despite wanting a fixed return.', reveals: 'all-shares-same-dividend' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a capital structure like an investor does. Equity vs preference and issue methods are board staples — and the actual vocabulary of every IPO headline you\'ll ever read.',
            decisions: [{ prompt: 'What comes next? Accounting for Share Capital · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Accounting for Share Capital · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_001', difficulty: 'standard',
          question: 'A share is a unit of ownership in a company that entitles the holder to.',
          hint: 'Review Class 11 Business Studies Chapter 8 (Sources of Business Finance) nodes.',
          misconception: 'Students often think "preference shares are just like debentures because both have fixed returns." They write.',
          parts: [
                { id: 'a', prompt: 'Explain why preference shares are considered a hybrid security, using the concepts of fixed return and ownership.', answer: 'Preference shares are hybrid',
                  options: ['Preference shares are hybrid', 'preference shares are just like debentures', 'Preference shares carry a fixed rate of interest', 'Preference shareholders are creditors'],
                  hint: 'Review Class 11 Business Studies Chapter 8 (Sources of Business Finance) nodes c11_bs_cbse_08_004.',
                  misconception: 'Students often think "preference shares are just like debentures because both have fixed returns." They write: "Preference shares carry.' },
                { id: 'b', prompt: 'A company issues 10,000 equity shares of ₹10 each and 5,000 8% preference shares of ₹100 each.', answer: 'Preference dividend due = 5,000 × ₹100 × 8% = ₹40,000',
                  options: ['Preference dividend due = 5,000 × ₹100 × 8% = ₹40,000', 'preference shares are just like debentures', 'Preference shares carry a fixed rate of interest', 'Preference shareholders are creditors'],
                  hint: 'Review Class 11 Business Studies Chapter 8 (Sources of Business Finance) nodes c11_bs_cbse_08_004.',
                  misconception: 'Students often think "preference shares are just like debentures because both have fixed returns." They write: "Preference shares carry.' },
                { id: 'c', prompt: 'Compare the voting rights of equity and preference shareholders under the Companies Act, 2013.', answer: 'Equity shareholders have voting rights on every resolution',
                  options: ['Equity shareholders have voting rights on every resolution', 'preference shares are just like debentures', 'Preference shares carry a fixed rate of interest', 'Preference shareholders are creditors'],
                  hint: 'Review Class 11 Business Studies Chapter 8 (Sources of Business Finance) nodes c11_bs_cbse_08_004.',
                  misconception: 'Students often think "preference shares are just like debentures because both have fixed returns." They write: "Preference shares carry.' }
          ],
            remediations: { 'preference-shares-are-just-like': { steps: ['Revisit the definition of \'share\' vs \'debenture\' from Class 11 Business Studies (c11_bs_cbse_02_008.', 'Create a two-column table: "Debt (Debenture)" vs "Equity (Share)" and add a third column "Preference Share" — fill each.', 'Re-attempt Diagnostic Questions 2 and 5. If still stuck, watch a 10-minute video on "Hybrid Securities" and note the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "preference shares are just like debentures because both have fixed returns." They write.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Issuing preference shares is always better than issuing equity shares because it does not dilute control." Consider cost of capital.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'preference shares are just like debentures', 'Preference shares carry a fixed rate of interest', 'Preference shareholders are creditors'],
                  hint: 'Review Class 11 Business Studies Chapter 8 (Sources of Business Finance) nodes c11_bs_cbse_08_004.',
                  misconception: 'Students often think "preference shares are just like debentures because both have fixed returns." They write: "Preference shares carry.' }
          ],
            remediations: { 'preference-shares-are-just-like': { steps: ['Revisit the definition of \'share\' vs \'debenture\' from Class 11 Business Studies (c11_bs_cbse_02_008.', 'Create a two-column table: "Debt (Debenture)" vs "Equity (Share)" and add a third column "Preference Share" — fill each.', 'Re-attempt Diagnostic Questions 2 and 5. If still stuck, watch a 10-minute video on "Hybrid Securities" and note the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_002', difficulty: 'standard',
          question: 'Public Issue, Private Placement, and Rights Issue are three distinct methods.',
          hint: 'If stuck, review the definition and features of equity and preference shares.',
          misconception: 'Students often think that the accounting entries for share capital differ based on the method of issue (public.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Public Issue, Private Placement, and Rights Issue are three distinct methods through',
                  options: ['Public Issue, Private Placement, and Rights Issue are three distinct methods through', 'A share is a unit of ownership in a company that entitles the holder to a proportionate', 'Issue of shares at par means shares are issued at a price equal to their face (nominal)', 'Minimum Subscription is the SEBI-mandated threshold (90% of issued capital) that a'],
                  hint: 'If stuck, review the definition and features of equity and preference shares in c12_acc_cbse_05_001.',
                  misconception: 'Students often think that the accounting entries for share capital differ based on the method of issue (public, private, rights).' }
          ],
            remediations: { 'the-accounting-entries-for-share': { steps: ['If the student still believes entries differ by method, do this remediation: (1) Re‑visit node c12_acc_cbse_05_001.', '(2) Take one illustration (e.g., 1,000 shares of ₹10 at ₹2 premium) and write the entries for public issue, then for.', '(3) Practice the "Do it Yourself" questions from NCERT Chapter 5 that mix methods but use identical entries.', '(4) Re‑attempt Diagnostic Question 3 with a different premium/discount to reinforce the pattern.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_003', difficulty: 'standard',
          question: 'Issue of shares at par means shares are issued at a price equal to their face.',
          hint: 'If stuck, review Class 11 Journal entries (c11_acc_cbse_03_007) and the Accounting.',
          misconception: 'Students often think that when shares are issued at a discount, the Share Capital account is credited with the net.',
          parts: [
                { id: 'a', prompt: 'State the correct journal entry when a company issues 10,000 equity shares of ₹10 each at par, payable ₹3 on application, ₹4 on allotment, and ₹3 on first &.', answer: 'Correct entries: 1',
                  options: ['Correct entries: 1', 'capital received', 'share capital'],
                  hint: 'If stuck, review Class 11 Journal entries (c11_acc_cbse_03_007) and the Accounting Equation.',
                  misconception: 'Students often think that when shares are issued at a discount, the Share Capital account is credited with the net amount received (issue.' },
                { id: 'b', prompt: 'A company issues 5,000 shares of ₹100 each at a premium of ₹20, payable ₹30 on application, ₹50 (including premium) on allotment, and the balance on call.', answer: 'Share Capital represents the nominal (face) value of shares issued',
                  options: ['Share Capital represents the nominal (face) value of shares issued', 'capital received', 'share capital'],
                  hint: 'If stuck, review Class 11 Journal entries (c11_acc_cbse_03_007) and the Accounting Equation.',
                  misconception: 'Students often think that when shares are issued at a discount, the Share Capital account is credited with the net amount received (issue.' },
                { id: 'c', prompt: 'Pass journal entries for the issue of 2,000, 10% preference shares of ₹100 each at a discount of 10%, payable ₹25 on application, ₹40 on allotment, and ₹25.', answer: 'Bank Dr',
                  options: ['Bank Dr', 'capital received', 'share capital', 'discount reduces share capital'],
                  hint: 'If stuck, review Class 11 Journal entries (c11_acc_cbse_03_007) and the Accounting Equation.',
                  misconception: 'Students often think that when shares are issued at a discount, the Share Capital account is credited with the net amount received (issue.' }
          ],
            remediations: { 'when-shares-are-issued-at': { steps: ['Revisit the accounting equation: Assets = Liabilities + Capital.', 'Share Capital is part of Capital (equity) and must equal number of shares × face value.', 'Review Class 11 node c11_acc_cbse_03_004 (Rules of Debit/Credit) to recall that capital accounts are credited for.', 'Practice the "face value always" rule: write 10 entries where you deliberately separate face value, premium, and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_004', difficulty: 'standard',
          question: 'Minimum Subscription is the SEBI-mandated threshold (90% of issued capital).',
          hint: 'Review Class 8 Math Chapter 7 (Ratio and Proportion) nodes c8_math_ch7_2 and.',
          misconception: 'Students believe that in pro-rata allotment, the excess application money is automatically refunded to applicants.',
          parts: [
                { id: 'a', prompt: 'A company issues 50,000 shares of ₹10 each. Applications are received for 45,000 shares. Can the company proceed with allotment?', answer: 'No, the company cannot proceed with allotment',
                  options: ['No, the company cannot proceed with allotment', 'cannot proceed', 'rejected applications', 'pro-rata allotment'],
                  hint: 'Review Class 8 Math Chapter 7 (Ratio and Proportion) nodes c8_math_ch7_2 and c8_math_ch7_6 for.',
                  misconception: 'Students believe that in pro-rata allotment, the excess application money is automatically refunded to applicants.' },
                { id: 'b', prompt: 'Explain in your own words why excess application money in over-subscription is first adjusted towards allotment and then towards calls, rather than being.', answer: 'Excess application money belongs to applicants who will become shareholders',
                  options: ['Excess application money belongs to applicants who will become shareholders', 'convenience', 'it\'s a rule', 'rejected applications'],
                  hint: 'Review Class 8 Math Chapter 7 (Ratio and Proportion) nodes c8_math_ch7_2 and c8_math_ch7_6 for.',
                  misconception: 'Students believe that in pro-rata allotment, the excess application money is automatically refunded to applicants.' },
                { id: 'c', prompt: 'A company issues 1,00,000 shares of ₹10 each at a premium of ₹2 per share, payable as ₹3 on application, ₹5 on allotment (including premium), and ₹4 on first &.', answer: 'Pro-rata ratio; (',
                  options: ['Pro-rata ratio; (', 'rejected applications', 'pro-rata allotment'],
                  hint: 'Review Class 8 Math Chapter 7 (Ratio and Proportion) nodes c8_math_ch7_2 and c8_math_ch7_6 for.',
                  misconception: 'Students believe that in pro-rata allotment, the excess application money is automatically refunded to applicants.' },
                { id: 'd', prompt: 'Compare and contrast: (i) Full rejection of excess applications vs (ii) Pro-rata allotment vs (iii) Combination of both (some rejected, some pro-rata).', answer: '(i) Full rejection: Excess applicants get full refund',
                  options: ['(i) Full rejection: Excess applicants get full refund', 'pro-rata is always used', 'rejected applications', 'pro-rata allotment'],
                  hint: 'Review Class 8 Math Chapter 7 (Ratio and Proportion) nodes c8_math_ch7_2 and c8_math_ch7_6 for.',
                  misconception: 'Students believe that in pro-rata allotment, the excess application money is automatically refunded to applicants.' }
          ],
            remediations: { 'in-pro-rata-allotment': { steps: ['Revisit c12_acc_cbse_05_003 (Issue at Par/Premium/Discount) to solidify instalment payment structure.', 'Draw a flowchart: "Application Money Received → Less: Required for Allotted Shares → Excess → Adjust to Allotment →.', 'Practice 3 problems where excess application money exactly equals allotment due (zero allotment receipt), exceeds.', 'Re-attempt Diagnostic Question 3 and 5. If still stuck, review Class 8 ratio/proportion nodes (c8_math_ch7_2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_005', difficulty: 'standard',
          question: 'Calls in Arrears refers to the amount of called-up share capital that.',
          hint: 'Revisit c12_acc_cbse_05_003 (Issue of Shares at Par, Premium, Discount) to understand how.',
          misconception: 'Students often think Calls in Arrears reduces Share Capital directly in the Balance Sheet.',
          parts: [
                { id: 'a', prompt: 'A company issued shares payable as ₹20 on application, ₹30 on allotment, and ₹50 on first & final call.', answer: 'Correct answer: \'Calls in Arrears A/c\' should be debited',
                  options: ['Correct answer: \'Calls in Arrears A/c\' should be debited', 'Calls in Arrears reduces Share Capital directly in the Balance Sheet'],
                  hint: 'Revisit c12_acc_cbse_05_003 (Issue of Shares at Par, Premium, Discount) to understand how.',
                  misconception: 'Students often think Calls in Arrears reduces Share Capital directly in the Balance Sheet.' },
                { id: 'b', prompt: 'A company issued 5,000 shares of ₹100 each at a premium of ₹20, payable as ₹30 on application, ₹50 on allotment (including premium), and ₹40 on first & final.', answer: 'Correct entry: Bank A/c Dr',
                  options: ['Correct entry: Bank A/c Dr', 'Calls in Arrears reduces Share Capital directly in the Balance Sheet'],
                  hint: 'Revisit c12_acc_cbse_05_003 (Issue of Shares at Par, Premium, Discount) to understand how.',
                  misconception: 'Students often think Calls in Arrears reduces Share Capital directly in the Balance Sheet.' }
          ],
            remediations: { 'calls-in-arrears-reduces-share': { steps: ['If the student confuses the Balance Sheet presentation: Step 1 — Revisit c11_acc_cbse_08_006 (Balance Sheet.', 'Step 2 — Practice the two-step presentation: Note to Accounts (Share Capital) shows paid-up capital net of arrears.', 'Step 3 — Draw a T-account for Calls in Arrears: Debit side = arrears amount + interest; Credit side = receipts from.', 'Step 4 — Re-do Diagnostic Question 4 with a fresh scenario.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_006', difficulty: 'standard',
          question: 'Issue of shares for consideration other than cash refers to the allotment.',
          hint: 'Review "Issue of Shares at Par, Premium and Discount" (c12_acc_cbse_05_003) and "Cost.',
          misconception: '**Misconception:** "When shares are issued for non-cash consideration, the asset account is debited with the **face.',
          parts: [
                { id: 'a', prompt: 'A company issues 10,000 shares of ₹10 each at par to a vendor for machinery worth ₹1,00,000. Which account is credited in the final allotment entry?', answer: '**Answer:** Share Capital Account is credited with ₹1,00,000',
                  options: ['**Answer:** Share Capital Account is credited with ₹1,00,000', 'Vendor Account', 'Machinery Account'],
                  hint: 'Review "Issue of Shares at Par, Premium and Discount" (c12_acc_cbse_05_003) and "Cost Concept".',
                  misconception: '**Misconception:** "When shares are issued for non-cash consideration, the asset account is debited with the **face value** of shares.' },
                { id: 'b', prompt: 'X Ltd. purchases a building worth ₹2,20,000 from Y Ltd. and agrees to pay by issuing 2,000 shares of ₹100 each at a premium of 10%.', answer: '**Answer:** **Step 1:** Building A/c Dr',
                  options: ['**Answer:** **Step 1:** Building A/c Dr', 'Discount on Issue'],
                  hint: 'Review "Issue of Shares at Par, Premium and Discount" (c12_acc_cbse_05_003) and "Cost Concept".',
                  misconception: '**Misconception:** "When shares are issued for non-cash consideration, the asset account is debited with the **face value** of shares.' }
          ],
            remediations: { 'misconception-when-shares-are-issued': { steps: ['**Revisit the Cost Concept** (c11_acc_cbse_02_006): Assets are recorded at the price paid/consideration given, not.', '**Practice the two-entry method**: (a) Asset/Expense Dr.', '(at agreed value); (b) Vendor Dr.', '+ Securities Premium/Discount Cr./Dr.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
