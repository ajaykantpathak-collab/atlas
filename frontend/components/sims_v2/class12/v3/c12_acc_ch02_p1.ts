import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch02_p1: SimDef = {
    id: 'v3_c12_acc_ch02_p1',
    title: 'Reconstitution of a Partnership Firm - Admission of a Partner · Part 1/2',
    subtitle: 'A new partner walks in — who gives up what, and what is the goodwill worth?',
    classLevel: 12, subject: 'accountancy', topic: 'Reconstitution of a Partnership Firm - Admission of a Partner · Part 1/2',
    chapters: ['c12_acc_ch02'],
    nodeIds: ['c12_acc_cbse_02_001', 'c12_acc_cbse_02_002', 'c12_acc_cbse_02_003', 'c12_acc_cbse_02_004', 'c12_acc_cbse_02_005', 'c12_acc_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Partnership accountant handling an admission', intro: 'Admitting a partner rewrites the firm\'s entire economics in one afternoon — ratio, goodwill, capital.', goal: 'Compute new and sacrificing ratios under varied agreements and account for goodwill on admission.' },
    discovery: {
        question: 'Three partners sharing 3:2:1 admit a new chef for a 1/6 share. How much does each old partner give up?',
        options: ['Whatever their agreement says — the sacrificing ratio is decided by the partners, not fixed by law', 'Exactly 1/18 each — the new share is always divided equally among old partners', 'Nothing — the new partner\'s 1/6 is created fresh, not taken from anyone', 'Always in their old 3:2:1 ratio — the law mandates it'],
        answer: 'Whatever their agreement says — the sacrificing ratio is decided by the partners, not fixed by law',
        hook: 'The reflex is to split the new partner\'s share equally; in reality sacrifice can follow the old ratio, a fixed ratio, or fall on one partner alone — and goodwill payment rides on that choice.',
    },
    teaching: [
        { title: 'New Profit Sharing Ratio and Sacrificing Ratio: Computation', text: 'The **New Profit Sharing Ratio (NPSR)** is the ratio in which all partners (including the newly admitted partner) will share future profits and losses of the reconstituted firm.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Negotiate an admission: compute the new ratio under different sacrifice deals, value the firm\'s goodwill, and decide what the incoming partner must pay for the reputation they\'re buying into.',
        labels: ['New Profit Sharing Ratio', 'Goodwill: Nature, Factors Affecting', 'Goodwill: Average Profit Method', 'Goodwill: Capitalisation of Average', 'Treatment of Goodwill', 'Revaluation of Assets'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_02_001', title: 'New Profit Sharing Ratio and Sacrificing Ratio: Computation',
          scaffold: { problem: 'A and B are partners sharing profits in the ratio 3:2. They admit C for 1/4th share. C acquires his share from A and B in the ratio 2:1.',
            steps: [
            { text: 'Convert old ratio to fractions. Total parts = 3+2=5. A\'s old share = 3/5, B\'s old share = 2/5.' },
            { text: 'Determine C\'s share = 1/4. The remaining share for A and B = 1 - 1/4 = 3/4.' },
            { text: 'C acquires 2/3 of his share from A and 1/3 from B. So A\'s sacrifice = 2/3 × 1/4 = 2/12 = 1/6.' },
            { text: 'Compute new shares: A\'s new share = 3/5 - 1/6 = (18/30 - 5/30) = 13/30.' },
            { text: 'Convert to common denominator (LCM of 30,60,60 = 60). A = 26/60, B = 19/60, C = 15/60. New ratio = 26:19:15.', faded: true, blankAnswer: 'New Profit Sharing Ratio = 26:19:15; Sacrificing Ratio = 2:1' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_02_002', title: 'Goodwill: Nature, Factors Affecting Valuation and Need for Valuation',
          caseStudy: { intro: 'Imagine you and two friends run a successful neighbourhood bakery called "Sweet Crust" — you have a prime location, a secret recipe, and loyal customers who.',
            decisions: [{ prompt: 'Define goodwill in your own words and state whether it is a fictitious asset or an intangible asset.', options: [
                { text: 'Goodwill is the monetary value of a business\'s reputation and other non-physical', outcome: 'Goodwill is the monetary value of a business\'s reputation and other non-physical advantages that.' },
                { text: 'not physically tangible', outcome: 'Not quite — Students often believe goodwill is **only created when a new partner pays for it** (premium method).', reveals: 'goodwill-is-only-created-when' },
                { text: 'not real', outcome: 'Not quite — Students often believe goodwill is **only created when a new partner pays for it** (premium method).', reveals: 'goodwill-is-only-created-when' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_02_003', title: 'Goodwill: Average Profit Method and Super Profit Method',
          scaffold: { problem: 'A firm\'s profits for 3 years ended 31st March: 2022: ₹1,20,000; 2023: ₹1,50,000; 2024: ₹1,80,000.',
            steps: [
            { text: 'Adjust each year\'s profit for non-recurring items, partner salary, and depreciation error.' },
            { text: '2022: ₹1,20,000 − ₹24,000 (salary) − ₹6,000 (depreciation) = ₹90,000. 2023: ₹1,50,000 − ₹24,000 = ₹1,26,000.' },
            { text: 'Total adjusted profit = ₹90,000 + ₹1,26,000 + ₹1,26,000 = ₹3,42,000.' },
            { text: 'Average profit = ₹3,42,000 / 3 = ₹1,14,000.' },
            { text: 'Goodwill = ₹1,14,000 × 2 = ₹2,28,000.' },
            { text: 'Verify: All adjustments reduce profit to maintainable level; years\' purchase multiplies annual excess.', faded: true, blankAnswer: '₹2,28,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_02_004', title: 'Goodwill: Capitalisation of Average Profits and Super Profits Methods',
          scaffold: { problem: 'M/s Gupta & Co. (a partnership) has the following data for admission of a new partner: Profits for last 3 years: 2021-22: ₹4,20,000 (after.',
            steps: [
            { text: 'Adjust each year\'s profit for abnormal items: 2021-22 = ₹4,20,000 + ₹30,000 = ₹4,50,000; 2022-23 = ₹5,00,000; 2023-24.' },
            { text: 'Compute Simple Average Profit = (₹4,50,000 + ₹5,00,000 + ₹5,60,000) / 3 = ₹15,10,000 / 3 = ₹5,03,333.' },
            { text: 'Deduct Partners\' Remuneration to get Maintainable Profit = ₹5,03,333 − ₹1,20,000 = ₹3,83,333.' },
            { text: 'Capitalised Value of Average Profits = Maintainable Profit × 100 / NRR = ₹3,83,333 × 100/10 = ₹38,33,330.' },
            { text: 'Goodwill = Capitalised Value − Capital Employed = ₹38,33,330 − ₹40,00,000 = -₹1,66,670 → Goodwill = ₹0 (cannot.', faded: true, blankAnswer: 'Goodwill = ₹0 (Nil)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_02_005', title: 'Treatment of Goodwill on Admission: Premium Method and Revaluation Method',
          scaffold: { problem: 'P and Q share profits 4:1. They admit R for 1/5th share. R brings ₹1,00,000 as capital and ₹30,000 as goodwill in cash.',
            steps: [
            { text: 'Identify old ratio (P=4/5, Q=1/5) and new ratio (P=4/6, Q=1/6, R=1/6).' },
            { text: 'Calculate sacrificing ratio: P = 4/5 - 4/6 = (24-20)/30 = 4/30 = 2/15; Q = 1/5 - 1/6 = (6-5)/30 = 1/30.' },
            { text: 'Distribute ₹30,000 goodwill in 4:1 → P = ₹30,000 × 4/5 = ₹24,000; Q = ₹30,000 × 1/5 = ₹6,000.' },
            { text: 'Pass journal entry: Cash/Bank A/c Dr. 30,000; To P\'s Capital A/c 24,000; To Q\'s Capital A/c 6,000.' },
            { text: 'Verify — total credited = ₹30,000; ratio 24,000:6,000 = 4:1 matches sacrifice.', faded: true, blankAnswer: 'Journal Entry: Cash/Bank A/c Dr. ₹30,000; To P\'s Capital.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_02_006', title: 'Revaluation of Assets and Liabilities: Revaluation Account Preparation',
          caseStudy: { intro: 'Imagine your family decides to bring in a new partner to your small bakery business.',
            decisions: [{ prompt: 'What is the correct journal entry when the value of machinery increases by ₹15,000 at the time of admission of a partner?', options: [
                { text: 'Machinery A/c Dr', outcome: 'Machinery A/c Dr. 15,000 To Revaluation A/c 15,000 **Why a wrong answer reveals misunderstanding:**.' },
                { text: 'increase in asset', outcome: 'Not quite — **Misconception:** “Unrecorded assets are credited to Revaluation Account and unrecorded.', reveals: 'misconception-unrecorded-assets-are-credited' },
                { text: 'decrease in asset', outcome: 'Not quite — **Misconception:** “Unrecorded assets are credited to Revaluation Account and unrecorded.', reveals: 'misconception-unrecorded-assets-are-credited' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Three friends run a college fest food-stall venture sharing profits 3:2:1. They admit a new baker for a 1/6 share, and their deal says she takes 1/12 from the first friend and 1/12 from the second. The treasurer assumes the \'sacrificing ratio\' is simply the old 3:2:1.',
            decisions: [{ prompt: 'How should the sacrifice actually be shared?', options: [
                { text: 'Follow the agreement: she acquires equally from two partners, so the sacrificing ratio is 1:1 — the sacrificing ratio is whatever proportion the new share is actually taken in, not the old ratio.', outcome: 'Sacrificing ratio = the ratio in which old partners give up share. When the acquisition split is specified, that split IS the sacrificing ratio; old ratio is only the default.' },
                { text: 'Sacrificing ratio is always the old profit-sharing ratio, so goodwill gets credited 3:2:1.', outcome: 'That default applies only when the deed is silent on how the new partner\'s share is acquired — here an explicit 1:1 split overrides it.', reveals: 'sacrifice-always-old-ratio' },
                { text: 'Divide the new partner\'s 1/6 share by three — every old partner must sacrifice equally.', outcome: 'Nothing forces equal sacrifice; the new partner\'s share comes only from those who actually give it up, per their agreement.', reveals: 'sacrifice-must-be-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now control the two numbers every admission hinges on — new ratio and goodwill. Boards test the ratio algebra; real firms test your negotiation.',
            decisions: [{ prompt: 'What comes next? Reconstitution of a Partnership Firm - Admission of a Partner · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Reconstitution of a Partnership Firm - Admission of a Partner · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_001', difficulty: 'standard',
          question: 'The **New Profit Sharing Ratio (NPSR)** is the ratio in which all partners.',
          hint: 'If stuck, revisit Class 7 Math fraction operations (c7_math_ch08_001 to c7_math_ch08_010).',
          misconception: '**Misconception:** "Sacrificing Ratio is always the same as the Old Profit Sharing Ratio." **Why it\'s wrong:** This.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The **New Profit Sharing Ratio (NPSR)** is the ratio in',
                  options: ['The **New Profit Sharing Ratio (NPSR)** is the ratio in', 'Goodwill is an intangible asset representing the value of a firm\'s reputation, customer', 'Goodwill valuation under the **Average Profit Method** computes goodwill as the product', 'Goodwill under the Capitalisation Method is valued by capitalising the firm\'s'],
                  hint: 'If stuck, revisit Class 7 Math fraction operations (c7_math_ch08_001 to c7_math_ch08_010) and Class.',
                  misconception: '**Misconception:** "Sacrificing Ratio is always the same as the Old Profit Sharing Ratio." **Why it\'s wrong:** This is true ONLY when the.' }
          ],
            remediations: { 'misconception-sacrificing-ratio-is-always': { steps: ['Revisit **c11_acc_cbse_02_006** (Revenue Recognition and Matching) — no, that\'s not relevant.', 'Actually, the prerequisite is **Class 6 Math: Ratio and Proportion (c6_math_ch06_062 to c6_math_ch06_068)** and **Class.', 'Practice converting ratios to fractions with common denominators (LCM method).', 'Do 5 problems where the sacrificing ratio is explicitly different from old ratio (e.g., acquisition ratio given, or new.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_002', difficulty: 'standard',
          question: 'Goodwill is an intangible asset representing the value of a firm\'s reputation.',
          hint: 'If stuck, revisit Class 11 node c11_acc_cbse_01_008 (Asset definition) and.',
          misconception: 'Students often believe goodwill is **only created when a new partner pays for it** (premium method) and that if no cash.',
          parts: [
                { id: 'a', prompt: 'Define goodwill in your own words and state whether it is a fictitious asset or an intangible asset. Give one reason for your classification.', answer: 'Goodwill is the monetary value of a business\'s reputation and other non-physical',
                  options: ['Goodwill is the monetary value of a business\'s reputation and other non-physical', 'not physically tangible', 'not real', 'does not exist'],
                  hint: 'If stuck, revisit Class 11 node c11_acc_cbse_01_008 (Asset definition) and c11_acc_cbse_02_006.',
                  misconception: 'Students often believe goodwill is **only created when a new partner pays for it** (premium method) and that if no cash changes hands.' },
                { id: 'b', prompt: 'In a partnership firm, Partner A and Partner B share profits 3:2. They admit Partner C for 1/5th share. The goodwill of the firm is valued at ₹2,00,000.', answer: 'Goodwill must be valued',
                  options: ['Goodwill must be valued', 'no adjustment needed if cash not brought', 'does not exist', 'need not be valued'],
                  hint: 'If stuck, revisit Class 11 node c11_acc_cbse_01_008 (Asset definition) and c11_acc_cbse_02_006.',
                  misconception: 'Students often believe goodwill is **only created when a new partner pays for it** (premium method) and that if no cash changes hands.' }
          ],
            remediations: { 'goodwill-is-only-created-when': { steps: ['Ask the student: "If you built a brand over 10 years and I join as partner tomorrow without paying for the brand value.', 'Show a simple numerical: Firm earns ₹10L profit on ₹50L capital (normal return 12% = ₹6L).', 'Goodwill @ 3 years\' purchase = ₹12L.', 'Now admit Partner C for 1/4 share *without* goodwill adjustment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_003', difficulty: 'standard',
          question: 'Goodwill valuation under the **Average Profit Method** computes goodwill as the.',
          hint: 'If stuck on profit adjustments, revisit **c11_acc_cbse_09_003, c11_acc_cbse_09_005.',
          misconception: 'Students often **forget to adjust profits for non-recurring items, partner remuneration, and depreciation policy.',
          parts: [
                { id: 'a', prompt: 'Compare Simple Average Profit Method and Weighted Average Profit Method. When is weighted average preferred?', answer: 'Simple average gives equal weight to all years',
                  options: ['Simple average gives equal weight to all years', 'weighted average is always better'],
                  hint: 'If stuck on profit adjustments, revisit **c11_acc_cbse_09_003, c11_acc_cbse_09_005.',
                  misconception: 'Students often **forget to adjust profits for non-recurring items, partner remuneration, and depreciation policy changes** before computing.' }
          ],
            remediations: { 'students-often-forget-to-adjust': { steps: ['Revisit **c11_acc_cbse_09_003** (Outstanding/Prepaid Expenses), **c11_acc_cbse_09_005** (Depreciation Adjustment).', 'Practice computing **capital employed** from a Balance Sheet: list all assets (at revalued amounts), subtract outside.', 'Use **c11_acc_cbse_08_006** (Balance Sheet classification).', 'Solve 5 problems where you must **identify and adjust** at least 3 items (non-recurring gain, partner salary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often **forget to adjust profits for non-recurring items, partner remuneration, and depreciation policy.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Super Profit Method is superior to Average Profit Method because it considers capital employed." Evaluate this statement with reference to.', answer: 'The statement is **partially correct but incomplete**',
                  options: ['The statement is **partially correct but incomplete**', 'Super Profit is always better'],
                  hint: 'If stuck on profit adjustments, revisit **c11_acc_cbse_09_003, c11_acc_cbse_09_005.',
                  misconception: 'Students often **forget to adjust profits for non-recurring items, partner remuneration, and depreciation policy changes** before computing.' }
          ],
            remediations: { 'students-often-forget-to-adjust': { steps: ['Revisit **c11_acc_cbse_09_003** (Outstanding/Prepaid Expenses), **c11_acc_cbse_09_005** (Depreciation Adjustment).', 'Practice computing **capital employed** from a Balance Sheet: list all assets (at revalued amounts), subtract outside.', 'Use **c11_acc_cbse_08_006** (Balance Sheet classification).', 'Solve 5 problems where you must **identify and adjust** at least 3 items (non-recurring gain, partner salary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_004', difficulty: 'standard',
          question: 'Goodwill under the Capitalisation Method is valued by capitalising the firm\'s.',
          hint: 'If stuck, revisit c12_acc_cbse_02_003 for profit adjustments and c11_acc_cbse_08_006/007.',
          misconception: 'Students often treat "Capital Employed" as simply "Total Assets − Current Liabilities" without excluding non-trading.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Capitalisation of Average Profits and Capitalisation of Super Profits always produce the same goodwill figure when applied to the.', answer: 'Correct explanation: Capitalised Average Profits = Average Profits × 100/NRR',
                  options: ['Correct explanation: Capitalised Average Profits = Average Profits × 100/NRR', 'they are different methods so answers differ'],
                  hint: 'If stuck, revisit c12_acc_cbse_02_003 for profit adjustments and c11_acc_cbse_08_006/007 for.',
                  misconception: 'Students often treat "Capital Employed" as simply "Total Assets − Current Liabilities" without excluding non-trading assets (like.' }
          ],
            remediations: { 'students-often-treat-capital-employed': { steps: ['If a student makes the above error, first revisit c12_acc_cbse_02_003 (Average Profit and Super Profit methods).', 'Then, using a simple balance sheet, explicitly list each asset/liability and classify as trading/non-trading.', 'Practice computing "Capital Employed for Goodwill" = Trading Assets − Trading Liabilities.', 'Next, take a profit series with abnormal items and partner salary, and walk through the adjustment column: "Profit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_005', difficulty: 'standard',
          question: 'Treatment of Goodwill on Admission refers to the accounting procedures for.',
          hint: 'If sacrificing ratio calculation is shaky, revisit c12_acc_cbse_02_001 and practice 10.',
          misconception: '**Students believe "Revaluation Method" and "Adjustment Method (through capital accounts)" are the same.** They write.',
          parts: [
                { id: 'a', prompt: 'What is the journal entry when a new partner brings goodwill in cash under the Premium Method, assuming the sacrificing ratio is known?', answer: '**Correct Answer:** Cash/Bank A/c Dr',
                  options: ['**Correct Answer:** Cash/Bank A/c Dr', 'Revaluation Method', 'Adjustment Method (through capital accounts)'],
                  hint: 'If sacrificing ratio calculation is shaky, revisit c12_acc_cbse_02_001 and practice 10 problems.',
                  misconception: '**Students believe "Revaluation Method" and "Adjustment Method (through capital accounts)" are the same.** They write: "Goodwill A/c Dr.' },
                { id: 'b', prompt: 'A and B share profits 3:2. They admit C for 1/4th share. C brings ₹80,000 as capital and ₹20,000 as goodwill. The new profit-sharing ratio is 3:2:1.', answer: '**Correct Answer with Steps:** 1',
                  options: ['**Correct Answer with Steps:** 1', 'Revaluation Method', 'Adjustment Method (through capital accounts)'],
                  hint: 'If sacrificing ratio calculation is shaky, revisit c12_acc_cbse_02_001 and practice 10 problems.',
                  misconception: '**Students believe "Revaluation Method" and "Adjustment Method (through capital accounts)" are the same.** They write: "Goodwill A/c Dr.' }
          ],
            remediations: { 'students-believe-revaluation-method-and': { steps: ['**Revisit c12_acc_cbse_02_001 (Sacrificing Ratio):** Re-derive sacrificing ratio = Old Ratio - New Ratio for 3.', '**Revisit c11_acc_cbse_03_004 (Debit/Credit Rules):** Practice 5 journal entries for Premium Method — say aloud "Cash.', '**Create a 2×2 comparison table:** | Method | Goodwill A/c Opened?', '| Ratio for Credit to Old Partners | New Partner\'s Capital Affected?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_006', difficulty: 'standard',
          question: 'Revaluation Account is a nominal account prepared at the time of reconstitution.',
          hint: 'Revisit Class 11 nodes c11_acc_cbse_03_004 to c11_acc_cbse_03_006 and practice 10 journal.',
          misconception: '**Misconception:** “Unrecorded assets are credited to Revaluation Account and unrecorded liabilities are debited.”.',
          parts: [
                { id: 'a', prompt: 'What is the correct journal entry when the value of machinery increases by ₹15,000 at the time of admission of a partner?', answer: 'Machinery A/c Dr',
                  options: ['Machinery A/c Dr', 'increase in asset', 'decrease in asset'],
                  hint: 'Revisit Class 11 nodes c11_acc_cbse_03_004 to c11_acc_cbse_03_006 and practice 10 journal entries.',
                  misconception: '**Misconception:** “Unrecorded assets are credited to Revaluation Account and unrecorded liabilities are debited.” **Why students make this.' }
          ],
            remediations: { 'misconception-unrecorded-assets-are-credited': { steps: ['If a student makes the above error: 1.', '**Re-teach the core rule** using a T-account visual: draw Asset and Liability T-accounts, show normal balances (Asset.', '**Walk through two concrete examples**: (a) Unrecorded stock found → Stock A/c Dr., Revaluation A/c Cr.', '(b) Unrecorded creditor found → Revaluation A/c Dr., Creditor A/c Cr.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
