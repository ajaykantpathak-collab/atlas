import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch01_p2: SimDef = {
    id: 'v3_c12_acc_ch01_p2',
    title: 'Accounting for Partnership Firms · Part 2/2',
    subtitle: 'Two friends, one food truck, and the law that decides if they\'re partners',
    classLevel: 12, subject: 'accountancy', topic: 'Accounting for Partnership Firms · Part 2/2',
    chapters: ['c12_acc_ch01'],
    nodeIds: ['c12_acc_cbse_01_007', 'c12_acc_cbse_01_008', 'c12_acc_cbse_01_009', 'c12_acc_cbse_01_010', 'c12_acc_cbse_01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Founding partner & agreements drafter', intro: 'Every business you\'ll ever build or audit starts with one question: what exactly binds these people together?', goal: 'Apply Section 4\'s essential features and design deed clauses for profit-sharing, capital and disputes.' },
    discovery: {
        question: 'Rohan and Sohan pool money for a food truck, share recipes, and split profits 60:40 — but never sign anything. Under the Indian Partnership Act, 1932, are they legally a partnership?',
        options: ['Yes — an agreement to run a business and share profits is enough; writing is not mandatory', 'No — a partnership exists only once a written deed is registered', 'No — a firm needs at least three partners to be recognised', 'Yes — but only after they register the firm with the Registrar'],
        answer: 'Yes — an agreement to run a business and share profits is enough; writing is not mandatory',
        hook: 'Students assume law demands paperwork; Section 4 only demands agreement, business, profit-sharing and mutual agency — the deed is evidence, not existence.',
    },
    teaching: [
        { title: 'Interest on Drawings: Product Method and Average Period Method', text: 'Interest on Drawings is the charge levied by the partnership firm on amounts withdrawn by partners for personal use, calculated at an agreed rate for the period the money remains with the partner.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Run a two-partner venture and test every \'are we a partnership?\' scenario against Section 4 — then draft the deed clauses that protect both partners before a dispute does it for them.',
        labels: ['Interest on Drawings: Product', 'Partner\'s Salary, Commission', 'Guarantee of Profit', 'Past Adjustments in Partnership', 'Maintenance of Partners\' Capital'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_01_007', title: 'Interest on Drawings: Product Method and Average Period Method',
          scaffold: { problem: 'Partner A draws the following amounts during the year ended 31st March 2024: ₹20,000 on 1st May, ₹15,000 on 31st August, ₹10,000 on 30th.',
            steps: [
            { text: 'Determine months outstanding for each drawing from the month following the drawing to March (year-end).' },
            { text: 'Calculate product for each drawing: Amount × Months Outstanding. ₹20,000 × 10 = 2,00,000. ₹15,000 × 7 = 1,05,000.' },
            { text: 'Sum of Products = 2,00,000 + 1,05,000 + 40,000 + 5,000 = 3,50,000.' },
            { text: 'Apply formula: Interest = Sum of Products × Rate/100 × 1/12 = 3,50,000 × 12/100 × 1/12 = 3,50,000 × 0.01 = ₹3,500.' },
            { text: 'Verify: Equivalent to charging 1% per month on each product. ₹20,000 for 10 months @ 1%/month = ₹2,000.', faded: true, blankAnswer: '₹3,500' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_01_008', title: 'Partner\'s Salary, Commission and Interest on Partner\'s Loan',
          scaffold: { problem: 'Partners X and Y share profits 3:2. X gets a monthly salary of ₹15,000.',
            steps: [
            { text: 'Identify charges vs appropriations. Interest on Y\'s loan is a charge (deed silent → 6% p.a.).' },
            { text: 'Calculate Interest on Loan = ₹4,00,000 × 6% × 9/12 = ₹18,000. Debit to P&L Account.' },
            { text: 'Calculate X\'s Salary = ₹15,000 × 12 = ₹1,80,000. Debit to P&L Appropriation.' },
            { text: 'Profit before Y\'s commission = ₹5,82,000 – ₹1,80,000 = ₹4,02,000. Commission = ₹4,02,000 × 10/110 = ₹36,545 (rounded).' },
            { text: 'Divisible Profit = ₹4,02,000 – ₹36,545 = ₹3,65,455. Share: X = ₹3,65,455 × 3/5 = ₹2,19,273; Y = ₹1,46,182.' },
            { text: 'Prepare P&L Appropriation Account: Dr. side — Salary ₹1,80,000, Commission ₹36,545, Profit transferred to Capital:.', faded: true, blankAnswer: 'Interest on Loan ₹18,000 (charge); X\'s Salary ₹1,80,000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_01_009', title: 'Guarantee of Profit to a Partner: Meaning and Adjustment',
          scaffold: { problem: 'A, B, and C are partners sharing profits in the ratio 3:2:1. They admit D as a new partner with 1/6 share in profits, guaranteed at ₹60,000.',
            steps: [
            { text: 'Calculate D\'s actual profit share before guarantee: D\'s share = 1/6 × ₹3,00,000 = ₹50,000.' },
            { text: 'Compare with guaranteed amount: Guaranteed = ₹60,000; Actual = ₹50,000; Deficiency = ₹60,000 - ₹50,000 = ₹10,000.' },
            { text: 'Distribute deficiency between guaranteeing partners A and B in their guarantee ratio 3:2.' },
            { text: 'Calculate original profit shares of all partners on full profit ₹3,00,000 in old ratio 3:2:1 (since D\'s share comes.' },
            { text: 'Adjust for deficiency: A\'s final = ₹1,50,000 - ₹6,000 = ₹1,44,000; B\'s final = ₹1,00,000 - ₹4,000 = ₹96,000; C\'s final.' },
            { text: 'Verify total = ₹1,44,000 + ₹96,000 + ₹50,000 + ₹60,000 = ₹3,50,000? Wait — total profit is ₹3,00,000. Error!', faded: true, blankAnswer: 'Final profit shares: A ₹1,19,000; B ₹79,333; C ₹41,667;.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_01_010', title: 'Past Adjustments in Partnership Accounts: Rectification Entries',
          caseStudy: { intro: 'Imagine a partnership firm that has been operating for three years.',
            decisions: [{ prompt: 'What is the primary purpose of a Profit and Loss Adjustment Account in the context of past adjustments in a partnership firm?', options: [
                { text: 'The primary purpose is to record the effect of rectification entries for errors/omissions', outcome: 'The primary purpose is to record the effect of rectification entries for errors/omissions of prior.' },
                { text: 'to calculate current year\'s profit', outcome: 'Not quite — Students often believe that rectification entries for past adjustments should be routed through the.', reveals: 'rectification-entries-for-past-adjustments' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a summer internship, a Class 12 student lends ₹50,000 to a friend\'s cloud-kitchen and takes 10% of monthly profits instead of fixed interest. When the kitchen defaults on a supplier\'s bill, the supplier claims she is a partner and must pay up.',
            decisions: [{ prompt: 'Is she liable as a partner?', options: [
                { text: 'No — Section 6 of the Partnership Act says a lender whose return varies with profits is not a partner; she has no mutual agency, so profit-sharing alone doesn\'t make her one.', outcome: 'Profit share is only one feature; without the authority to act for and bind the firm, there\'s no partnership — the supplier can\'t touch her.' },
                { text: 'Yes — anyone who takes a share of business profits is a partner, so she\'s jointly and severally liable for the debt.', outcome: 'That over-generalises profit-sharing: the Act explicitly excludes lenders paid from profits, and she cannot bind the firm.', reveals: 'profit-share-equals-partner' },
                { text: 'No — the firm was never registered, so no partnership can legally exist and nobody is liable.', outcome: 'Registration isn\'t what creates a partnership — but she still isn\'t a partner because mutual agency is missing, not because paperwork is missing.', reveals: 'registration-creates-partnership' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_01_011', title: 'You made it',
          caseStudy: { intro: 'You can now spot a partnership in the wild and write the deed that keeps it alive. Board questions love the \'is this a partnership?\' trap — and future founders live it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_007', difficulty: 'standard',
          question: 'Interest on Drawings is the charge levied by the partnership firm on amounts.',
          hint: 'Revisit c11_acc_cbse_01_010 (Drawings meaning) and.',
          misconception: 'Students memorize average periods (6.5, 6, 5.5) but apply them blindly without checking if drawings are truly regular.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Interest on Drawings is the charge levied by the partnership firm on amounts withdrawn by',
                  options: ['Interest on Drawings is the charge levied by the partnership firm on amounts withdrawn by', 'Partnership is a relation between two or more persons who have agreed to share the', 'A Partnership Deed is a written legal document that contains the terms and conditions of', 'In the absence of a written Partnership Deed, the provisions of the Indian Partnership'],
                  hint: 'Revisit c11_acc_cbse_01_010 (Drawings meaning) and c11_acc_cbse_03_004/c11_acc_cbse_03_005.',
                  misconception: 'Students memorize average periods (6.5, 6, 5.5) but apply them blindly without checking if drawings are truly regular.' }
          ],
            remediations: { 'students-memorize-average-periods-6': { steps: ['If a student confuses the methods: Step 1 — Ask "Are specific dates given?" If YES → Product Method.', 'If NO, but frequency/timing given (e.g., "beginning of every month") → Average Period Method.', 'Step 2 — For Product Method errors: Practice month-counting with a calendar.', 'Draw a timeline: Accounting year Apr-Mar.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_008', difficulty: 'standard',
          question: 'Partner\'s Salary is a fixed periodic payment to a working partner for active.',
          hint: 'If stuck, review the format of Profit and Loss Appropriation Account.',
          misconception: '**Students treat Partner\'s Salary as an expense (charge) and debit it to Profit and Loss Account.** Why: They see.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Partner\'s Salary is a fixed periodic payment to a working partner for active',
                  options: ['Partner\'s Salary is a fixed periodic payment to a working partner for active', 'Partnership is a relation between two or more persons who have agreed to share the', 'A Partnership Deed is a written legal document that contains the terms and conditions of', 'In the absence of a written Partnership Deed, the provisions of the Indian Partnership'],
                  hint: 'If stuck, review the format of Profit and Loss Appropriation Account (c12_acc_cbse_01_005) and the.',
                  misconception: '**Students treat Partner\'s Salary as an expense (charge) and debit it to Profit and Loss Account.** Why: They see "salary" and associate.' }
          ],
            remediations: { 'students-treat-partner-s-salary': { steps: ['Revisit **c12_acc_cbse_01_005** (Profit and Loss Appropriation Account) to relearn the format and items.', 'Review **c11_acc_cbse_08_004** (Trading and Profit and Loss Account) to recall the difference between expenses.', 'Do a focused drill: Take 5 problems where you classify each item as Charge or Appropriation.', 'Say aloud: "Interest on loan → Charge → P&L A/c.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students treat Partner\'s Salary as an expense (charge) and debit it to Profit and Loss Account.** Why: They see.',
          parts: [
                { id: 'a', prompt: 'The partnership deed provides for a partner\'s commission of 12% on net profit **before** charging commission.', answer: 'Correct commission (before) = ₹5,00,000 × 12% = ₹60,000',
                  options: ['Correct commission (before) = ₹5,00,000 × 12% = ₹60,000', 'commission is a charge'],
                  hint: 'If stuck, review the format of Profit and Loss Appropriation Account (c12_acc_cbse_01_005) and the.',
                  misconception: '**Students treat Partner\'s Salary as an expense (charge) and debit it to Profit and Loss Account.** Why: They see "salary" and associate.' }
          ],
            remediations: { 'students-treat-partner-s-salary': { steps: ['Revisit **c12_acc_cbse_01_005** (Profit and Loss Appropriation Account) to relearn the format and items.', 'Review **c11_acc_cbse_08_004** (Trading and Profit and Loss Account) to recall the difference between expenses.', 'Do a focused drill: Take 5 problems where you classify each item as Charge or Appropriation.', 'Say aloud: "Interest on loan → Charge → P&L A/c.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_009', difficulty: 'standard',
          question: 'Guarantee of profit to a partner is a contractual arrangement where the firm.',
          hint: 'Revisit c12_acc_cbse_01_005 (Profit and Loss Appropriation Account) and practice 3-4 full.',
          misconception: 'Students often believe that when a partner is guaranteed a minimum profit, the guaranteed amount is simply added to the.',
          parts: [
                { id: 'a', prompt: 'A, B, and C are partners sharing profits 3:2:1. They admit D with 1/6 share guaranteed at ₹60,000 by A and B in 3:2 ratio. Firm earns ₹2,40,000 profit.', answer: 'Yes, correct',
                  options: ['Yes, correct', 'firm profit ₹2,00,000 + guarantee ₹50,000 = ₹2,50,000 to distribute'],
                  hint: 'Revisit c12_acc_cbse_01_005 (Profit and Loss Appropriation Account) and practice 3-4 full.',
                  misconception: 'Students often believe that when a partner is guaranteed a minimum profit, the guaranteed amount is simply added to the profit before.' },
                { id: 'b', prompt: 'X, Y, Z share profits 5:3:2. Z is guaranteed ₹50,000 by the firm. Profit = ₹1,50,000. Z\'s share = 2/10 × 1,50,000 = ₹30,000. Deficiency = ₹20,000.', answer: 'Profit and Loss Appropriation A/c Dr',
                  options: ['Profit and Loss Appropriation A/c Dr', 'firm profit ₹2,00,000 + guarantee ₹50,000 = ₹2,50,000 to distribute'],
                  hint: 'Revisit c12_acc_cbse_01_005 (Profit and Loss Appropriation Account) and practice 3-4 full.',
                  misconception: 'Students often believe that when a partner is guaranteed a minimum profit, the guaranteed amount is simply added to the profit before.' },
                { id: 'c', prompt: 'P and Q share profits 2:1. They admit R with 1/4 share guaranteed at ₹80,000 by P alone. Profit = ₹2,00,000. R\'s actual share = 1/4 × 2,00,000 = ₹50,000.', answer: 'P\'s original share = 2/3 × 2,00,000 = ₹1,33,333',
                  options: ['P\'s original share = 2/3 × 2,00,000 = ₹1,33,333', 'firm profit ₹2,00,000 + guarantee ₹50,000 = ₹2,50,000 to distribute'],
                  hint: 'Revisit c12_acc_cbse_01_005 (Profit and Loss Appropriation Account) and practice 3-4 full.',
                  misconception: 'Students often believe that when a partner is guaranteed a minimum profit, the guaranteed amount is simply added to the profit before.' }
          ],
            remediations: { 'when-a-partner-is-guaranteed': { steps: ['If a student makes the above misconception: (1) Ask them to write the Profit and Loss Account and Profit and Loss.', '(2) Give a simple numerical: Profit ₹1,00,000, two partners 1:1, one guaranteed ₹60,000 by firm.', 'Ask: "If we add ₹60,000 to profit, total becomes ₹1,60,000 — but the firm only earned ₹1,00,000.', 'Where does extra ₹60,000 come from?" (3) Revisit node c12_acc_cbse_01_005 (Profit and Loss Appropriation Account).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_010', difficulty: 'standard',
          question: 'Past adjustments in partnership accounts refer to the rectification entries.',
          hint: 'If stuck, revisit Class 11 rectification of errors (c11_acc_cbse_06_009.',
          misconception: 'Students often believe that rectification entries for past adjustments should be routed through the current year\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Past adjustments in partnership accounts refer to the rectification entries passed to',
                  options: ['Past adjustments in partnership accounts refer to the rectification entries passed to', 'Partnership is a relation between two or more persons who have agreed to share the', 'A Partnership Deed is a written legal document that contains the terms and conditions of', 'In the absence of a written Partnership Deed, the provisions of the Indian Partnership'],
                  hint: 'If stuck, revisit Class 11 rectification of errors (c11_acc_cbse_06_009, c11_acc_cbse_06_010) and.',
                  misconception: 'Students often believe that rectification entries for past adjustments should be routed through the current year\'s Profit and Loss Account.' }
          ],
            remediations: { 'rectification-entries-for-past-adjustments': { steps: ['If the student confuses the account to be debited/credited, follow these steps: 1.', 'Revisit Class 11 rectification of errors (nodes c11_acc_cbse_06_009 and c11_acc_cbse_06_010) to master the "correct.', 'Review each partnership adjustment node (c12_acc_cbse_01_006 to c12_acc_cbse_01_009) to recall the original correct.', 'Practice the rule: "For any past omission, debit Profit and Loss Adjustment Account with the amount that should have.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_011', difficulty: 'standard',
          question: 'Maintenance of Partners\' Capital and Current Accounts refers to the systematic.',
          hint: 'If unsure about Fixed vs Fluctuating Capital, review c12_acc_cbse_01_004.',
          misconception: '**Misconception:** "Under Fixed Capital Method, the Capital Account never changes, so we only need to maintain the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Maintenance of Partners\' Capital and Current Accounts refers to the systematic recording',
                  options: ['Maintenance of Partners\' Capital and Current Accounts refers to the systematic recording', 'Partnership is a relation between two or more persons who have agreed to share the', 'A Partnership Deed is a written legal document that contains the terms and conditions of', 'In the absence of a written Partnership Deed, the provisions of the Indian Partnership'],
                  hint: 'If unsure about Fixed vs Fluctuating Capital, review c12_acc_cbse_01_004.',
                  misconception: '**Misconception:** "Under Fixed Capital Method, the Capital Account never changes, so we only need to maintain the Current Account." **Why.' }
          ],
            remediations: { 'misconception-under-fixed-capital-method': { steps: ['**Revisit the definition**: "Fixed Capital = Permanent Capital; Current Account = Fluctuating Account." Write it on.', '**Do a card sort**: Take 10 transaction cards (e.g., "Additional capital ₹50,000", "Drawings ₹20,000", "Interest.', 'Sort each into "Capital A/c" or "Current A/c" pile.', 'Check against NCERT rules.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
