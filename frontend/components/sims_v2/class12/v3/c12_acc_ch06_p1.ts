import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch06_p1: SimDef = {
    id: 'v3_c12_acc_ch06_p1',
    title: 'Issue and Redemption of Debentures · Part 1/2',
    subtitle: 'Borrow ₹500 crore without selling a single vote — welcome to debentures.',
    classLevel: 12, subject: 'accountancy', topic: 'Issue and Redemption of Debentures · Part 1/2',
    chapters: ['c12_acc_ch06'],
    nodeIds: ['c12_acc_cbse_06_001', 'c12_acc_cbse_06_002', 'c12_acc_cbse_06_003', 'c12_acc_cbse_06_004', 'c12_acc_cbse_06_005', 'c12_acc_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Corporate treasurer raising debt capital', intro: 'The smartest companies grow on other people\'s money — debentures are the IOU that makes it possible.', goal: 'Classify debentures and journalise issue at par, premium and discount.' },
    discovery: {
        question: 'Volt Motors needs ₹500 crore but refuses to dilute ownership or accept 12% bank covenants. Investors accept 10% instead. What did the company issue — and why did investors take less?',
        options: ['Secured debentures — lenders accept lower fixed interest because assets back the debt', 'Equity shares — investors always accept lower returns for voting rights', 'Preference shares — fixed dividend with ownership dilution', 'A bank overdraft — the cheapest form of long-term borrowing'],
        answer: 'Secured debentures — lenders accept lower fixed interest because assets back the debt',
        hook: 'Students think lower return means worse deal — but security changes the risk, not just the rate. Debentures let a company borrow without surrendering a single vote.',
    },
    teaching: [
        { title: 'Debentures: Meaning, Characteristics and Types', text: 'A debenture is a written instrument acknowledging a debt under the common seal of a company, containing a contract for repayment of principal after a specified period or at intervals, and payment.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Structure a debenture issue: classify the instrument, then record it issued at par, premium and discount — tracing how each pricing choice moves cash, liabilities and reserves.',
        labels: ['Debentures: Meaning, Characteristics', 'Issue of Debentures at', 'Issue of Debentures', 'Issue of Debentures as', 'Interest on Debentures', 'Writing off Discount/Loss'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_acc_cbse_06_001', title: 'Debentures: Meaning, Characteristics and Types',
          caseStudy: { intro: 'Imagine a fast-growing Indian EV startup, "Volt Motors Ltd.", needs ₹500 crore to build a new battery plant.',
            decisions: [{ prompt: 'State the three mandatory legal elements that must be present for a document to qualify as a debenture under the Companies Act 2013, as per.', options: [
                { text: 'Correct answer: (1) Written instrument acknowledging a debt, (2) Issued under the common', outcome: 'Correct answer: (1) Written instrument acknowledging a debt, (2) Issued under the common seal.' },
                { text: 'fixed interest', outcome: 'Not quite — **Misconception**: "Secured debentures and First debentures mean the same thing — both mean the.', reveals: 'misconception-secured-debentures-and-first' },
                { text: 'secured', outcome: 'Not quite — **Misconception**: "Secured debentures and First debentures mean the same thing — both mean the.', reveals: 'misconception-secured-debentures-and-first' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_06_004', title: 'Issue of Debentures as Collateral Security: Accounting Treatment',
          caseStudy: { intro: 'Imagine a company, "TechGrowth Ltd.", takes a ₹50 lakh loan from a bank and pledges its factory building as primary security.',
            decisions: [{ prompt: 'What is the fundamental difference between debentures issued as collateral security and debentures issued for cash subscription?', options: [
                { text: 'Correct answer: Debentures issued for cash create a new liability and bring in funds;', outcome: 'Correct answer: Debentures issued for cash create a new liability and bring in funds; debentures.' },
                { text: 'both bring cash', outcome: 'Not quite — Students believe that debentures issued as collateral security must always be recorded at the loan.', reveals: 'debentures-issued-as-collateral-security' },
                { text: 'both are recorded the same way', outcome: 'Not quite — Students believe that debentures issued as collateral security must always be recorded at the loan.', reveals: 'debentures-issued-as-collateral-security' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_06_005', title: 'Interest on Debentures and Tax Deducted at Source (TDS)',
          scaffold: { problem: 'PQR Ltd. issued 5,000 10% debentures of ₹100 each on 1st April 2023. Interest is payable half-yearly on 30th September and 31st March.',
            steps: [
            { text: 'Calculate gross interest for 6 months: Face Value = 5,000 × ₹100 = ₹5,00,000.' },
            { text: 'Calculate TDS: 10% of ₹25,000 = ₹2,500. Net payable to debenture holders = ₹25,000 – ₹2,500 = ₹22,500.' },
            { text: 'Entry when interest becomes due (30th Sept): Debenture Interest A/c Dr.' },
            { text: 'Entry on payment (5th Oct): Debentureholders A/c Dr. ₹22,500 → To Bank A/c ₹22,500.' },
            { text: 'Entry for TDS deposit (by 7th Oct): TDS Payable A/c Dr. ₹2,500 → To Bank A/c ₹2,500. (Reason: Remitting tax deducted.)' },
            { text: 'Transfer to P&L (at year-end or period-end): Statement of Profit and Loss Dr.', faded: true, blankAnswer: 'Gross Interest ₹25,000; TDS ₹2,500; Net Paid ₹22,500.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_06_006', title: 'Writing off Discount/Loss on Issue of Debentures',
          scaffold: { problem: 'On 1st April 2023, A Ltd. issued 20,000, 8% debentures of ₹100 each at a discount of 5%, redeemable at par after 4 years.',
            steps: [
            { text: 'Calculate total discount on issue = 5% of (20,000 × ₹100) = ₹1,00,000.' },
            { text: 'Determine annual write-off = ₹1,00,000 ÷ 4 years = ₹25,000 per year.' },
            { text: 'Journal entry for issue: Bank A/c Dr. ₹19,00,000; Discount on Issue of Debentures A/c Dr.' },
            { text: 'Journal entry for writing off (31 Mar 2024): Statement of Profit & Loss A/c Dr.' },
            { text: 'Balance Sheet extract (31 Mar 2024): Non-Current Liabilities: Long-term Borrowings – 8% Debentures ₹20,00,000.', faded: true, blankAnswer: '(a) Bank Dr. 19,00,000; Discount on Issue Dr. 1,00,000;.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An EV startup raises money through debentures carrying a second charge on factory land already mortgaged to an earlier debenture issue. A trainee accountant files these \'Second Debentures\' under Unsecured Loans in the draft balance sheet.',
            decisions: [{ prompt: 'Is that classification right?', options: [
                { text: 'No — \'secured\' asks whether a charge on assets exists, \'first/second\' is the ranking among charges; these debentures have a charge, so they\'re Secured Second Debentures.', outcome: 'Security and priority are separate classification bases — a debenture can be secured yet rank second in repayment order.' },
                { text: 'Yes — second in line for repayment means unsecured, since the first charge holders get paid ahead of them.', outcome: 'Ranking lower in priority doesn\'t remove the charge; they\'re still secured creditors, just behind the first charge.', reveals: 'second-means-unsecured' },
                { text: 'Reclassify them as shareholders\' funds — debenture holders are part-owners of the company.', outcome: 'Debenture holders are creditors with a contractual fixed interest and repayment claim — never owners, regardless of security.', reveals: 'debenture-holders-are-owners' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Debt without dilution is a superpower — and you now know its price list. Debenture entries are pure board marks; understanding risk-vs-rate is pure investing wisdom.',
            decisions: [{ prompt: 'What comes next? Issue and Redemption of Debentures · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Issue and Redemption of Debentures · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_001', difficulty: 'standard',
          question: 'A debenture is a written instrument acknowledging a debt under the common seal.',
          hint: 'If stuck on classification, revisit c11_bs_cbse_08_006 (Debentures: Meaning, Types and.',
          misconception: '**Misconception**: "Secured debentures and First debentures mean the same thing — both mean the debenture has a charge.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast "Secured Debentures" vs "Unsecured Debentures" and "First Debentures" vs "Second Debentures".', answer: 'Correct analysis: The two pairs classify on DIFFERENT bases',
                  options: ['Correct analysis: The two pairs classify on DIFFERENT bases', 'secured'],
                  hint: 'If stuck on classification, revisit c11_bs_cbse_08_006 (Debentures: Meaning, Types and Merits) and.',
                  misconception: '**Misconception**: "Secured debentures and First debentures mean the same thing — both mean the debenture has a charge on assets." **Why.' }
          ],
            remediations: { 'misconception-secured-debentures-and-first': { steps: ['**Immediate remediation**: Draw a 2×2 matrix on paper: Rows = Security (Secured, Unsecured); Columns = Priority (First.', 'Fill each cell with a one-line example: Secured+First = "First mortgage on factory"; Secured+Second = "Second mortgage.', '**Re-diagnostic**: Ask the student to classify these two instruments: (A) "8% Debentures secured by floating charge.', '(B) "10% Debentures with no charge, repayable before other unsecured creditors" → Unsecured, First.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "Secured debentures and First debentures mean the same thing — both mean the debenture has a charge.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "Zero Coupon Debentures are issued at a discount and redeemed at par, so the difference is the investor\'s return.', answer: 'Critique — the statement is **incorrect** on all three counts: 1',
                  options: ['Critique — the statement is **incorrect** on all three counts: 1', 'no reinvestment risk'],
                  hint: 'If stuck on classification, revisit c11_bs_cbse_08_006 (Debentures: Meaning, Types and Merits) and.',
                  misconception: '**Misconception**: "Secured debentures and First debentures mean the same thing — both mean the debenture has a charge on assets." **Why.' }
          ],
            remediations: { 'misconception-secured-debentures-and-first': { steps: ['**Immediate remediation**: Draw a 2×2 matrix on paper: Rows = Security (Secured, Unsecured); Columns = Priority (First.', 'Fill each cell with a one-line example: Secured+First = "First mortgage on factory"; Secured+Second = "Second mortgage.', '**Re-diagnostic**: Ask the student to classify these two instruments: (A) "8% Debentures secured by floating charge.', '(B) "10% Debentures with no charge, repayable before other unsecured creditors" → Unsecured, First.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_002', difficulty: 'standard',
          question: 'Issue of debentures refers to the process by which a company raises borrowed.',
          hint: 'Review Class 11 Journal entries (c11_acc_cbse_03_007, 03_008) and the accounting equation.',
          misconception: 'Students often treat **premium on issue of debentures** as revenue income and credit it to Statement of Profit & Loss.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Issue of debentures refers to the process by',
                  options: ['Issue of debentures refers to the process by', 'A debenture is a written instrument acknowledging a debt under the common seal of a', 'Issue of Debentures for Consideration Other than Cash refers to the allotment of', 'Issue of debentures as collateral security refers to the practice where a company issues'],
                  hint: 'Review Class 11 Journal entries (c11_acc_cbse_03_007, 03_008) and the accounting equation effect.',
                  misconception: 'Students often treat **premium on issue of debentures** as revenue income and credit it to Statement of Profit & Loss.' }
          ],
            remediations: { 'students-often-treat-premium-on': { steps: ['If the student makes the above error: 1.', 'Revisit **c11_acc_cbse_03_008** (Compound Journal Entry) to practice multi-account entries.', 'Review **c12_acc_cbse_06_001** (Debentures: Meaning, Characteristics and Types) to reinforce that debentures are.', 'Do a focused drill: Pass entries for 3 cases — at par, at 10% premium, at 10% discount — with full.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_003', difficulty: 'standard',
          question: 'Issue of Debentures for Consideration Other than Cash refers to the allotment.',
          hint: 'If stuck, revisit **c12_acc_cbse_06_002** and solve: "A company issues 5,000, 10%.',
          misconception: '**The "Face Value Trap":** Students consistently calculate the number of debentures to be issued by dividing the agreed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Issue of Debentures for Consideration Other than Cash refers to the allotment of',
                  options: ['Issue of Debentures for Consideration Other than Cash refers to the allotment of', 'A debenture is a written instrument acknowledging a debt under the common seal of a', 'Issue of debentures refers to the process by', 'Issue of debentures as collateral security refers to the practice where a company issues'],
                  hint: 'If stuck, revisit **c12_acc_cbse_06_002** and solve: "A company issues 5,000, 10% debentures.',
                  misconception: '**The "Face Value Trap":** Students consistently calculate the number of debentures to be issued by dividing the agreed consideration.' }
          ],
            remediations: { 'the-face-value-trap-students': { steps: ['**Step-by-step remediation:** 1.', '**Revisit c12_acc_cbse_06_002** — re-solve 3 cash-issue problems at premium/discount.', 'Explicitly write: "Cash Received = Number × Issue Price" and "Nominal Value = Number × Face Value." 2.', '**Create a mapping table:** For non-cash issues, replace "Cash Received" with "Agreed Value of Consideration.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_004', difficulty: 'standard',
          question: 'Issue of debentures as collateral security refers to the practice where.',
          hint: 'Revisit c12_acc_cbse_06_002 for normal issue entries and.',
          misconception: 'Students believe that debentures issued as collateral security must always be recorded at the loan amount (e.g.,.',
          parts: [
                { id: 'a', prompt: 'A company issues 10,000 9% debentures of ₹100 each as collateral security for a bank loan of ₹8,00,000. The accountant records: Bank A/c Dr.', answer: 'Correct answer: The entry incorrectly debits Bank A/c',
                  options: ['Correct answer: The entry incorrectly debits Bank A/c', 'the amount is wrong', 'debentures should be credited at premium'],
                  hint: 'Revisit c12_acc_cbse_06_002 for normal issue entries and c11_acc_cbse_08_006/c11_acc_cbse_08_007.',
                  misconception: 'Students believe that debentures issued as collateral security must always be recorded at the loan amount (e.g., if loan is ₹8 lakh, issue.' },
                { id: 'b', prompt: 'XYZ Ltd. has a bank loan of ₹20,00,000 secured by land. It issues 25,000 8% debentures of ₹100 each as collateral security.', answer: 'Correct answer: Journal Entry: Debenture Suspense A/c Dr',
                  options: ['Correct answer: Journal Entry: Debenture Suspense A/c Dr', 'Contingent Liabilities', '25,000 8% debentures of ₹100 each issued as collateral security to bank'],
                  hint: 'Revisit c12_acc_cbse_06_002 for normal issue entries and c11_acc_cbse_08_006/c11_acc_cbse_08_007.',
                  misconception: 'Students believe that debentures issued as collateral security must always be recorded at the loan amount (e.g., if loan is ₹8 lakh, issue.' },
                { id: 'c', prompt: 'Compare the "No Entry Method" and "Debenture Suspense Method" for collateral security. Which method provides better internal control and why?', answer: 'Correct answer: The Debenture Suspense Method provides better internal control',
                  options: ['Correct answer: The Debenture Suspense Method provides better internal control', 'both are same', 'suspense account goes to liability side'],
                  hint: 'Revisit c12_acc_cbse_06_002 for normal issue entries and c11_acc_cbse_08_006/c11_acc_cbse_08_007.',
                  misconception: 'Students believe that debentures issued as collateral security must always be recorded at the loan amount (e.g., if loan is ₹8 lakh, issue.' }
          ],
            remediations: { 'debentures-issued-as-collateral-security': { steps: ['Revisit c12_acc_cbse_06_002 (Issue at Par/Premium/Discount) — identify entries that involve Bank A/c.', 'Compare with collateral issue — note ABSENCE of Bank A/c.', 'Practice: "Loan ₹5L taken → Bank Dr. 5L To Loan 5L. Then collateral debentures ₹6L issued → ?"', 'Redo Diagnostic Q2 and Q3. If error persists, draw a timeline: Loan taken → Collateral given → Loan repaid → Collateral.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_005', difficulty: 'standard',
          question: 'Interest on debentures is a fixed financial charge payable by the company.',
          hint: 'Revisit simple interest (Class 8 Math c8_math_ch8_9) and outstanding expenses adjustment.',
          misconception: 'Students often calculate debenture interest on the **issue price** (especially when issued at discount/premium) instead.',
          parts: [
                { id: 'a', prompt: 'A company has issued 5,000 12% debentures of ₹100 each. Interest is payable half-yearly.', answer: 'The entry is wrong',
                  options: ['The entry is wrong', 'interest on borrowing', 'debenture coupon'],
                  hint: 'Revisit simple interest (Class 8 Math c8_math_ch8_9) and outstanding expenses adjustment (Class 11.',
                  misconception: 'Students often calculate debenture interest on the **issue price** (especially when issued at discount/premium) instead of the **face.' },
                { id: 'b', prompt: 'XYZ Ltd. has 20,000 8% debentures of ₹100 each outstanding. Interest is paid annually on 31st March.', answer: 'Gross interest for the year, (',
                  options: ['Gross interest for the year, (', 'interest on borrowing', 'debenture coupon'],
                  hint: 'Revisit simple interest (Class 8 Math c8_math_ch8_9) and outstanding expenses adjustment (Class 11.',
                  misconception: 'Students often calculate debenture interest on the **issue price** (especially when issued at discount/premium) instead of the **face.' },
                { id: 'c', prompt: 'Compare the Balance Sheet disclosure of "Interest Accrued and Due on Debentures" and "TDS Payable on Debenture Interest" as on 31st March 2024 for a company.', answer: 'Both appear under **Current Liabilities**',
                  options: ['Both appear under **Current Liabilities**', 'interest on borrowing', 'debenture coupon'],
                  hint: 'Revisit simple interest (Class 8 Math c8_math_ch8_9) and outstanding expenses adjustment (Class 11.',
                  misconception: 'Students often calculate debenture interest on the **issue price** (especially when issued at discount/premium) instead of the **face.' }
          ],
            remediations: { 'students-often-calculate-debenture-interest': { steps: ['If a student calculates interest on issue price: (1) Ask them to read the debenture certificate wording: "9% Debentures.', '(2) Show a real debenture indenture (or NCERT illustration) where interest is explicitly "9% on face value".', '(3) Make them re-do Worked Example 3 with a discount issue, forcing them to write "Face Value = ₹1,00,000" as step 1.', '(4) Re-diagnose with Diagnostic Question 3 but with a discount issue.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_006', difficulty: 'standard',
          question: 'Writing off discount/loss on issue of debentures is the systematic allocation.',
          hint: 'Revisit Class 11 node c11_acc_cbse_07_001 (Depreciation: Meaning and Need) — the concept.',
          misconception: 'Students often treat discount on issue of debentures as a revenue expense and write it off entirely in the year.',
          parts: [
                { id: 'a', prompt: 'What is the nature of discount on issue of debentures and how is it treated in the Balance Sheet until written off?', answer: 'Discount on issue of debentures is a capital loss',
                  options: ['Discount on issue of debentures is a capital loss', 'Discount on Issue of Shares'],
                  hint: 'Revisit Class 11 node c11_acc_cbse_07_001 (Depreciation: Meaning and Need) — the concept.',
                  misconception: 'Students often treat discount on issue of debentures as a revenue expense and write it off entirely in the year of issue, or they confuse.' },
                { id: 'b', prompt: 'A company issues debentures at a discount of 5% redeemable at par after 4 years.', answer: 'Both companies suffer the same total loss on issue (5% of face value)',
                  options: ['Both companies suffer the same total loss on issue (5% of face value)', 'Discount on Issue of Shares', 'the second company has no loss on issue'],
                  hint: 'Revisit Class 11 node c11_acc_cbse_07_001 (Depreciation: Meaning and Need) — the concept.',
                  misconception: 'Students often treat discount on issue of debentures as a revenue expense and write it off entirely in the year of issue, or they confuse.' },
                { id: 'c', prompt: 'XYZ Ltd. issued 5,000, 10% debentures of ₹100 each at a discount of 10%, redeemable at par after 5 years.', answer: 'Issue: Bank A/c Dr',
                  options: ['Issue: Bank A/c Dr', 'Discount on Issue of Shares'],
                  hint: 'Revisit Class 11 node c11_acc_cbse_07_001 (Depreciation: Meaning and Need) — the concept.',
                  misconception: 'Students often treat discount on issue of debentures as a revenue expense and write it off entirely in the year of issue, or they confuse.' },
                { id: 'd', prompt: 'PQR Ltd. issued 10,000, 9% debentures of ₹100 each at a discount of 5%, redeemable in 4 equal annual installments starting at the end of year 1.', answer: 'Total discount = ₹50,000',
                  options: ['Total discount = ₹50,000', 'Discount on Issue of Shares'],
                  hint: 'Revisit Class 11 node c11_acc_cbse_07_001 (Depreciation: Meaning and Need) — the concept.',
                  misconception: 'Students often treat discount on issue of debentures as a revenue expense and write it off entirely in the year of issue, or they confuse.' }
          ],
            remediations: { 'students-often-treat-discount-on': { steps: ['If the student makes the above error, take them through a concrete comparison: (1) Issue 100 debentures of ₹100 at 10%.', 'Cash in = ₹9,000; Cash out = ₹10,000.', '(2) Issue 100 debentures at par, redeemable at 10% premium.', 'Cash in = ₹10,000; Cash out = ₹11,000.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
