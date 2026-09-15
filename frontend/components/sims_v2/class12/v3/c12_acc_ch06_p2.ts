import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch06_p2: SimDef = {
    id: 'v3_c12_acc_ch06_p2',
    title: 'Issue and Redemption of Debentures · Part 2/2',
    subtitle: 'Borrow ₹500 crore without selling a single vote — welcome to debentures.',
    classLevel: 12, subject: 'accountancy', topic: 'Issue and Redemption of Debentures · Part 2/2',
    chapters: ['c12_acc_ch06'],
    nodeIds: ['c12_acc_cbse_06_007', 'c12_acc_cbse_06_008', 'c12_acc_cbse_06_009', 'c12_acc_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Corporate treasurer raising debt capital', intro: 'The smartest companies grow on other people\'s money — debentures are the IOU that makes it possible.', goal: 'Classify debentures and journalise issue at par, premium and discount.' },
    discovery: {
        question: 'Volt Motors needs ₹500 crore but refuses to dilute ownership or accept 12% bank covenants. Investors accept 10% instead. What did the company issue — and why did investors take less?',
        options: ['Secured debentures — lenders accept lower fixed interest because assets back the debt', 'Equity shares — investors always accept lower returns for voting rights', 'Preference shares — fixed dividend with ownership dilution', 'A bank overdraft — the cheapest form of long-term borrowing'],
        answer: 'Secured debentures — lenders accept lower fixed interest because assets back the debt',
        hook: 'Students think lower return means worse deal — but security changes the risk, not just the rate. Debentures let a company borrow without surrendering a single vote.',
    },
    teaching: [
        { title: 'Redemption of Debentures: Lump Sum Payment and Draw of Lots Method', text: 'Redemption of debentures refers to the discharge of the company\'s obligation to repay the principal amount to debentureholders.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Structure a debenture issue: classify the instrument, then record it issued at par, premium and discount — tracing how each pricing choice moves cash, liabilities and reserves.',
        labels: ['Redemption of Debentures: Lump', 'Redemption by Purchase from', 'Sinking Fund Method', 'Journal Entries for Issue'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_acc_cbse_06_007', title: 'Redemption of Debentures: Lump Sum Payment and Draw of Lots Method',
          caseStudy: { intro: 'Imagine a company, *Vayu Energy Ltd.*, issued ₹50 crore of 9% debentures five years ago. The debentures are now due for redemption.',
            decisions: [{ prompt: 'A company issued 10,000, 8% debentures of ₹100 each redeemable at par after 5 years.', options: [
                { text: '**Correct answer:** 8% Debentures Account is debited', outcome: '**Correct answer:** 8% Debentures Account is debited. **Why wrong answers reveal.' },
                { text: 'Debentureholders Account', outcome: 'Not quite — **Misconception:** "In draw of lots, the company debits the *entire* Debentures Account in the.', reveals: 'misconception-in-draw-of-lots' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_06_008', title: 'Redemption by Purchase from Open Market and Conversion Method',
          caseStudy: { intro: 'Imagine a company, "TechGrow Ltd.", has 10,000, 9% debentures of ₹100 each outstanding. The board decides to redeem them early.',
            decisions: [{ prompt: 'What is the journal entry when a company purchases its own debentures from the open market at a price lower than the face value for.', options: [
                { text: 'Correct entry: Debit Debentures A/c (face value), Credit Own Debentures A/c (purchase', outcome: 'Correct entry: Debit Debentures A/c (face value), Credit Own Debentures A/c (purchase price).' },
                { text: 'Profit on Cancellation', outcome: 'Not quite — Students often treat "Own Debentures" as an investment asset and forget to cancel them immediately.', reveals: 'students-often-treat-own-debentures' },
                { text: 'Interest on Debentures', outcome: 'Not quite — Students often treat "Own Debentures" as an investment asset and forget to cancel them immediately.', reveals: 'students-often-treat-own-debentures' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_06_009', title: 'Sinking Fund Method and Debenture Redemption Reserve (DRR) Requirements',
          scaffold: { problem: 'On 1st April 2022, PQR Ltd. issued 10,000, 9% debentures of ₹100 each at par, redeemable at par on 31st March 2027.',
            steps: [
            { text: 'Calculate redemption amount = 10,000 × ₹100 = ₹10,00,000.' },
            { text: 'Calculate annual sinking fund contribution = ₹10,00,000 × 0.180975 = ₹1,80,975.' },
            { text: 'DRR requirement = 25% of ₹10,00,000 = ₹2,50,000. This must be created before redemption starts (i.e., by 31st March.' },
            { text: '15% investment requirement: Debentures mature in 2026-27. By 30th April 2026, invest/deposit 15% of ₹10,00,000.' },
            { text: 'Journal Entries for 2022-23 (Year 1):' },
            { text: 'Journal Entries for 2023-24 (Year 2):', faded: true, blankAnswer: 'Annual contribution = ₹1,80,975; DRR = ₹2,50,000 (created.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_06_010', title: 'Journal Entries for Issue and Redemption of Debentures',
          caseStudy: { intro: 'Imagine you are the accountant of "Bharat Infra Ltd." which needs ₹50 crore for a highway project. The board decides to issue 10% debentures.',
            decisions: [{ prompt: 'State the journal entry for issuing 5,000, 9% debentures of ₹100 each at a premium of 10%, redeemable at par.', options: [
                { text: '**Correct Entry:** Bank A/c Dr', outcome: '**Correct Entry:** Bank A/c Dr. 5,50,000 To 9% Debenture Application & Allotment A/c 5,50,000 9%.' },
                { text: 'Premium on Redemption of Debentures', outcome: 'Not quite — **Misconception:** *"Premium on Redemption of Debentures is credited at the time of issue and.', reveals: 'misconception-premium-on-redemption-of' },
                { text: 'Securities Premium', outcome: 'Not quite — **Misconception:** *"Premium on Redemption of Debentures is credited at the time of issue and.', reveals: 'misconception-premium-on-redemption-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An EV startup raises money through debentures carrying a second charge on factory land already mortgaged to an earlier debenture issue. A trainee accountant files these \'Second Debentures\' under Unsecured Loans in the draft balance sheet.',
            decisions: [{ prompt: 'Is that classification right?', options: [
                { text: 'No — \'secured\' asks whether a charge on assets exists, \'first/second\' is the ranking among charges; these debentures have a charge, so they\'re Secured Second Debentures.', outcome: 'Security and priority are separate classification bases — a debenture can be secured yet rank second in repayment order.' },
                { text: 'Yes — second in line for repayment means unsecured, since the first charge holders get paid ahead of them.', outcome: 'Ranking lower in priority doesn\'t remove the charge; they\'re still secured creditors, just behind the first charge.', reveals: 'second-means-unsecured' },
                { text: 'Reclassify them as shareholders\' funds — debenture holders are part-owners of the company.', outcome: 'Debenture holders are creditors with a contractual fixed interest and repayment claim — never owners, regardless of security.', reveals: 'debenture-holders-are-owners' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'Debt without dilution is a superpower — and you now know its price list. Debenture entries are pure board marks; understanding risk-vs-rate is pure investing wisdom.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_007', difficulty: 'standard',
          question: 'Redemption of debentures refers to the discharge of the company\'s obligation.',
          hint: 'Review c12_acc_cbse_06_002 (issue entries) and c12_acc_cbse_06_005 (interest with TDS).',
          misconception: '**Misconception:** "In draw of lots, the company debits the *entire* Debentures Account in the first year and credits.',
          parts: [
                { id: 'a', prompt: 'A company issued 10,000, 8% debentures of ₹100 each redeemable at par after 5 years. At redemption, which account is debited for the principal amount?', answer: '**Correct answer:** 8% Debentures Account is debited',
                  options: ['**Correct answer:** 8% Debentures Account is debited', 'Debentureholders Account'],
                  hint: 'Review c12_acc_cbse_06_002 (issue entries) and c12_acc_cbse_06_005 (interest with TDS) — focus.',
                  misconception: '**Misconception:** "In draw of lots, the company debits the *entire* Debentures Account in the first year and credits a \'Provision for.' }
          ],
            remediations: { 'misconception-in-draw-of-lots': { steps: ['If a student makes the above error: 1.', '**Revisit** the definition of a liability (Class 11: c11_acc_cbse_01_008) — a present obligation from past events.', 'Undrawn debentures are not yet due.', '**Practice** a mini-ledger: Open Debentures A/c with ₹1,00,00,000, post first draw redemption, show balance carried.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "In draw of lots, the company debits the *entire* Debentures Account in the first year and credits.',
          parts: [
                { id: 'a', prompt: '*Evaluate level:* "Creating Debenture Redemption Investment (DRI) of 15% of the amount to be redeemed in the next financial year is mandatory for all.', answer: '**Correct evaluation:** The statement is **false**',
                  options: ['**Correct evaluation:** The statement is **false**', '15% DRI'],
                  hint: 'Review c12_acc_cbse_06_002 (issue entries) and c12_acc_cbse_06_005 (interest with TDS) — focus.',
                  misconception: '**Misconception:** "In draw of lots, the company debits the *entire* Debentures Account in the first year and credits a \'Provision for.' }
          ],
            remediations: { 'misconception-in-draw-of-lots': { steps: ['If a student makes the above error: 1.', '**Revisit** the definition of a liability (Class 11: c11_acc_cbse_01_008) — a present obligation from past events.', 'Undrawn debentures are not yet due.', '**Practice** a mini-ledger: Open Debentures A/c with ₹1,00,00,000, post first draw redemption, show balance carried.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_008', difficulty: 'standard',
          question: 'Redemption by purchase from open market refers to a company buying back its own.',
          hint: 'If stuck, revisit c12_acc_cbse_06_002 (Issue of Debentures at Par, Premium, Discount) and.',
          misconception: 'Students often treat "Own Debentures" as an investment asset and forget to cancel them immediately, leaving a debit.',
          parts: [
                { id: 'a', prompt: 'Explain why profit on cancellation of own debentures purchased from the open market is transferred to Capital Reserve and not to the Statement of Profit & Loss.', answer: 'Profit on cancellation arises from a capital transaction (reduction of long-term',
                  options: ['Profit on cancellation arises from a capital transaction (reduction of long-term', 'it increases net profit', 'Profit on Cancellation', 'Interest on Debentures'],
                  hint: 'If stuck, revisit c12_acc_cbse_06_002 (Issue of Debentures at Par, Premium, Discount) and.',
                  misconception: 'Students often treat "Own Debentures" as an investment asset and forget to cancel them immediately, leaving a debit balance in Own.' },
                { id: 'b', prompt: 'TechGrow Ltd. has 5,000, 10% debentures of ₹100 each. It purchases 1,000 debentures at ₹95 each from the open market and cancels them immediately.', answer: 'Step 1: Debit 10% Debentures A/c ₹1,00,000',
                  options: ['Step 1: Debit 10% Debentures A/c ₹1,00,000', 'Profit on Cancellation', 'Interest on Debentures'],
                  hint: 'If stuck, revisit c12_acc_cbse_06_002 (Issue of Debentures at Par, Premium, Discount) and.',
                  misconception: 'Students often treat "Own Debentures" as an investment asset and forget to cancel them immediately, leaving a debit balance in Own.' },
                { id: 'c', prompt: 'Compare the accounting treatment when debentures are redeemed by conversion into equity shares at par versus at a premium.', answer: 'At par: Debit Debentures A/c, Credit Share Capital A/c',
                  options: ['At par: Debit Debentures A/c, Credit Share Capital A/c', 'Profit on Cancellation', 'Interest on Debentures'],
                  hint: 'If stuck, revisit c12_acc_cbse_06_002 (Issue of Debentures at Par, Premium, Discount) and.',
                  misconception: 'Students often treat "Own Debentures" as an investment asset and forget to cancel them immediately, leaving a debit balance in Own.' }
          ],
            remediations: { 'students-often-treat-own-debentures': { steps: ['If the student makes the above errors: (1) Revisit the concept that purchase of own debentures for cancellation is.', 'Use a T-account to show Own Debentures A/c opens and closes to zero.', '(2) Drill the rule: "Capital profits → Capital Reserve; Capital losses → Statement of Profit & Loss." (3) Practice.', 'Re-do worked examples 1 and 2 with focus on the "Own Debentures" account movement.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_009', difficulty: 'standard',
          question: 'The Sinking Fund Method is a systematic approach to debenture redemption where.',
          hint: 'If stuck on sinking fund factor calculation, revisit c11_math_cbse_09_006 (Sum of n terms.',
          misconception: 'Students treat DRR and Sinking Fund as interchangeable — they think creating DRR *is* the sinking fund.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Sinking Fund Method is a systematic approach to debenture redemption where a company',
                  options: ['The Sinking Fund Method is a systematic approach to debenture redemption where a company', 'A debenture is a written instrument acknowledging a debt under the common seal of a', 'Issue of debentures refers to the process by', 'Issue of Debentures for Consideration Other than Cash refers to the allotment of'],
                  hint: 'If stuck on sinking fund factor calculation, revisit c11_math_cbse_09_006 (Sum of n terms of GP).',
                  misconception: 'Students treat DRR and Sinking Fund as interchangeable — they think creating DRR *is* the sinking fund.' }
          ],
            remediations: { 'students-treat-drr-and-sinking': { steps: ['If the student conflates DRR and Sinking Fund: (1) Make a two-column table: Column A "DRR (Statutory Reserve)", Column.', 'List: Nature (Legal vs Voluntary), Account debited (Surplus vs P&L Appropriation), Asset created (N/A vs Sinking Fund.', '(2) Revisit node c11_acc_cbse_07_009 (Reserves: Meaning and Types) to reinforce "Reserve = appropriation of profit, not.', '(3) Re-do Diagnostic Question 4 and 6 focusing on separate journal entries.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_010', difficulty: 'standard',
          question: 'Journal entries for issue and redemption of debentures are systematic.',
          hint: 'If stuck on *which account to debit/credit*, revisit **c11_acc_cbse_03_005** (Rules.',
          misconception: '**Misconception:** *"Premium on Redemption of Debentures is credited at the time of issue and debited at redemption."*.',
          parts: [
                { id: 'a', prompt: 'State the journal entry for issuing 5,000, 9% debentures of ₹100 each at a premium of 10%, redeemable at par. (Assume full amount received on application.)', answer: '**Correct Entry:** Bank A/c Dr',
                  options: ['**Correct Entry:** Bank A/c Dr', 'Premium on Redemption of Debentures', 'Securities Premium'],
                  hint: 'If stuck on *which account to debit/credit*, revisit **c11_acc_cbse_03_005** (Rules of Debit/Credit.',
                  misconception: '**Misconception:** *"Premium on Redemption of Debentures is credited at the time of issue and debited at redemption."* **Why it\'s wrong:**.' },
                { id: 'b', prompt: 'Pass journal entries for the following: (i) X Ltd. issued 2,000, 12% debentures of ₹100 each at par, redeemable at 5% premium after 5 years.', answer: '**Step-by-step Solution:** **(i) Issue:** Bank A/c Dr',
                  options: ['**Step-by-step Solution:** **(i) Issue:** Bank A/c Dr', 'Premium on Redemption'],
                  hint: 'If stuck on *which account to debit/credit*, revisit **c11_acc_cbse_03_005** (Rules of Debit/Credit.',
                  misconception: '**Misconception:** *"Premium on Redemption of Debentures is credited at the time of issue and debited at redemption."* **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-premium-on-redemption-of': { steps: ['**Revisit Node c12_acc_cbse_06_002** (Issue at Premium/Discount) — Re-do the 3-column comparison table: *Issue Price vs.', '**Revisit Node c12_acc_cbse_06_007** (Redemption: Lump Sum & Draw of Lots) — Focus on the *Premium on Redemption*.', 'Write the entry 5 times from memory: `Debentures Dr., Premium on Redemption Dr.', '→ To Bank/Debentureholders`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
