import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch02_p2: SimDef = {
    id: 'v3_c12_acc_ch02_p2',
    title: 'Reconstitution of a Partnership Firm - Admission of a Partner · Part 2/2',
    subtitle: 'A new partner walks in — who gives up what, and what is the goodwill worth?',
    classLevel: 12, subject: 'accountancy', topic: 'Reconstitution of a Partnership Firm - Admission of a Partner · Part 2/2',
    chapters: ['c12_acc_ch02'],
    nodeIds: ['c12_acc_cbse_02_007', 'c12_acc_cbse_02_008', 'c12_acc_cbse_02_009', 'c12_acc_cbse_02_010', 'c12_acc_cbse_02_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Partnership accountant handling an admission', intro: 'Admitting a partner rewrites the firm\'s entire economics in one afternoon — ratio, goodwill, capital.', goal: 'Compute new and sacrificing ratios under varied agreements and account for goodwill on admission.' },
    discovery: {
        question: 'Three partners sharing 3:2:1 admit a new chef for a 1/6 share. How much does each old partner give up?',
        options: ['Whatever their agreement says — the sacrificing ratio is decided by the partners, not fixed by law', 'Exactly 1/18 each — the new share is always divided equally among old partners', 'Nothing — the new partner\'s 1/6 is created fresh, not taken from anyone', 'Always in their old 3:2:1 ratio — the law mandates it'],
        answer: 'Whatever their agreement says — the sacrificing ratio is decided by the partners, not fixed by law',
        hook: 'The reflex is to split the new partner\'s share equally; in reality sacrifice can follow the old ratio, a fixed ratio, or fall on one partner alone — and goodwill payment rides on that choice.',
    },
    teaching: [
        { title: 'Adjustment of Accumulated Profits, Reserves and Losses on Admission', text: 'Adjustment of accumulated profits, reserves and losses on admission refers to the process of distributing the credit balances of reserves (like General Reserve, Reserve Fund) and debit balances.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Negotiate an admission: compute the new ratio under different sacrifice deals, value the firm\'s goodwill, and decide what the incoming partner must pay for the reputation they\'re buying into.',
        labels: ['Adjustment of Accumulated Profits,', 'Adjustment of Partners\' Capitals', 'Journal Entries for Admission', 'Preparation of Revaluation Account,', 'Hidden Goodwill: Computation when'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_02_008', title: 'Adjustment of Partners\' Capitals for Proportionate Capital (Capital Adjustment)',
          scaffold: { problem: 'P and Q are partners sharing profits 3:2. They admit R for 1/5 share. R brings ₹1,00,000 as capital.',
            steps: [
            { text: 'Determine new profit-sharing ratio. R gets 1/5. Remaining 4/5 shared by P and Q in 3:2 → P = 3/5 × 4/5 = 12/25, Q = 2/5.' },
            { text: 'Compute required capital for each partner using total capital ₹6,00,000. P = 12/25 × ₹6,00,000 = ₹2,88,000.' },
            { text: 'Compare with adjusted capitals. P has ₹2,40,000 (deficit ₹48,000 → bring in).' },
            { text: 'Pass journal entries for cash brought in.' },
            { text: 'Verify total cash brought in = ₹48,000 + ₹32,000 + ₹20,000 = ₹1,00,000. Total capital becomes ₹6,00,000.', faded: true, blankAnswer: 'P brings ₹48,000; Q brings ₹32,000; R brings additional.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_02_010', title: 'Preparation of Revaluation Account, Partners\' Capital Accounts and Balance Sheet after Admission',
          caseStudy: { intro: 'Imagine you\'re the accountant for a partnership firm where a new partner is joining tomorrow.',
            decisions: [{ prompt: 'A firm\'s Revaluation Account shows a credit total of ₹1,20,000 and debit total of ₹75,000. The old profit sharing ratio is 3:2.', options: [
                { text: 'Revaluation profit = ₹1,20,000 - ₹75,000 = ₹45,000', outcome: 'Revaluation profit = ₹1,20,000 - ₹75,000 = ₹45,000. Partner A (3/5) gets ₹27,000 credit; Partner.' },
                { text: 'the new firm will share future profits in that ratio', outcome: 'Not quite — Students believe the Revaluation Account profit/loss is distributed in the NEW profit sharing ratio.', reveals: 'the-revaluation-account-profit-loss' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_02_011', title: 'Hidden Goodwill: Computation when Capital and Share are Given',
          scaffold: { problem: 'P and Q are partners sharing profits 3:2. Their adjusted capitals after revaluation are ₹4,50,000 and ₹3,00,000 respectively.',
            steps: [
            { text: 'Calculate total capitalised value of the firm using R\'s capital and share: ₹2,00,000 × (1 / 1/4) = ₹2,00,000 × 4.' },
            { text: 'Calculate combined adjusted capitals of old partners: ₹4,50,000 + ₹3,00,000 = ₹7,50,000.' },
            { text: 'Add new partner\'s capital to combined capitals: ₹7,50,000 + ₹2,00,000 = ₹9,50,000.' },
            { text: 'Compute hidden goodwill: Total capitalised value (₹8,00,000) – Combined capitals after admission (₹9,50,000).' },
            { text: 'Because hidden goodwill is negative, no journal entry for goodwill is passed.', faded: true, blankAnswer: 'Hidden Goodwill = -₹1,50,000 (no hidden goodwill; firm.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Three friends run a college fest food-stall venture sharing profits 3:2:1. They admit a new baker for a 1/6 share, and their deal says she takes 1/12 from the first friend and 1/12 from the second. The treasurer assumes the \'sacrificing ratio\' is simply the old 3:2:1.',
            decisions: [{ prompt: 'How should the sacrifice actually be shared?', options: [
                { text: 'Follow the agreement: she acquires equally from two partners, so the sacrificing ratio is 1:1 — the sacrificing ratio is whatever proportion the new share is actually taken in, not the old ratio.', outcome: 'Sacrificing ratio = the ratio in which old partners give up share. When the acquisition split is specified, that split IS the sacrificing ratio; old ratio is only the default.' },
                { text: 'Sacrificing ratio is always the old profit-sharing ratio, so goodwill gets credited 3:2:1.', outcome: 'That default applies only when the deed is silent on how the new partner\'s share is acquired — here an explicit 1:1 split overrides it.', reveals: 'sacrifice-always-old-ratio' },
                { text: 'Divide the new partner\'s 1/6 share by three — every old partner must sacrifice equally.', outcome: 'Nothing forces equal sacrifice; the new partner\'s share comes only from those who actually give it up, per their agreement.', reveals: 'sacrifice-must-be-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_02_011', title: 'You made it',
          caseStudy: { intro: 'You now control the two numbers every admission hinges on — new ratio and goodwill. Boards test the ratio algebra; real firms test your negotiation.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_007', difficulty: 'standard',
          question: 'Adjustment of accumulated profits, reserves and losses on admission refers.',
          hint: 'If stuck, revisit **c12_acc_cbse_02_001** for old ratio calculation and.',
          misconception: '**Misconception:** “Accumulated profits and losses are distributed in the **new profit sharing ratio** or **sacrificing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Adjustment of accumulated profits, reserves and losses on admission refers to the process',
                  options: ['Adjustment of accumulated profits, reserves and losses on admission refers to the process', 'The **New Profit Sharing Ratio (NPSR)** is the ratio in', 'Goodwill is an intangible asset representing the value of a firm\'s reputation, customer', 'Goodwill valuation under the **Average Profit Method** computes goodwill as the product'],
                  hint: 'If stuck, revisit **c12_acc_cbse_02_001** for old ratio calculation and **c11_acc_cbse_03_004/005**.',
                  misconception: '**Misconception:** “Accumulated profits and losses are distributed in the **new profit sharing ratio** or **sacrificing ratio** because the.' }
          ],
            remediations: { 'misconception-accumulated-profits-and-losses': { steps: ['Revisit **c12_acc_cbse_02_001 (New Profit Sharing Ratio and Sacrificing Ratio)** to clearly distinguish old ratio, new.', 'Review **c11_acc_cbse_07_010 (Reserves: Meaning and Types)** to understand reserves are *appropriations of past.', 'Practice 5 journal entry sets where you **only** adjust reserves and P&L balance — ignore goodwill, revaluation.', 'Use a checklist: “Is this item a past accumulation?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_008', difficulty: 'standard',
          question: 'Adjustment of Partners\' Capitals for Proportionate Capital refers to the.',
          hint: 'Revisit c12_acc_cbse_02_001 (New Profit Sharing Ratio) and c12_acc_cbse_02_006/007.',
          misconception: 'Students often believe that "capital adjustment" means simply making the new partner\'s capital proportionate to their.',
          parts: [
                { id: 'a', prompt: 'A and B are partners sharing profits 3:2. They admit C for 1/4 share. C brings ₹1,00,000 as capital.', answer: 'New ratio: A:B:C = (3/4 × 3/5) : (3/4 × 2/5) : 1/4 = 9/20 : 6/20 : 5/20 = 9:6:5',
                  options: ['New ratio: A:B:C = (3/4 × 3/5) : (3/4 × 2/5) : 1/4 = 9/20 : 6/20 : 5/20 = 9:6:5', 'capital adjustment'],
                  hint: 'Revisit c12_acc_cbse_02_001 (New Profit Sharing Ratio) and c12_acc_cbse_02_006/007 (Revaluation and.',
                  misconception: 'Students often believe that "capital adjustment" means simply making the new partner\'s capital proportionate to their share, ignoring that.' },
                { id: 'b', prompt: 'Compare and contrast the journal entries for "excess capital withdrawn" vs "deficit capital brought in" during capital adjustment.', answer: 'Excess capital: Partner\'s Capital A/c Dr',
                  options: ['Excess capital: Partner\'s Capital A/c Dr', 'capital adjustment'],
                  hint: 'Revisit c12_acc_cbse_02_001 (New Profit Sharing Ratio) and c12_acc_cbse_02_006/007 (Revaluation and.',
                  misconception: 'Students often believe that "capital adjustment" means simply making the new partner\'s capital proportionate to their share, ignoring that.' }
          ],
            remediations: { 'capital-adjustment-means-simply-making': { steps: ['If the student cannot distinguish the three scenarios, do this: (1) Draw a decision tree: "Is total capital given?', 'No → Is a partner retiring/outgoing?', '→ Yes → Total = continuing capitals + outgoing dues.', 'No → Total = sum of continuing adjusted capitals." (2) For each scenario, solve one numerical problem side-by-side.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "capital adjustment" means simply making the new partner\'s capital proportionate to their.',
          parts: [
                { id: 'a', prompt: 'A firm\'s total capital after admission is ₹10,00,000. New profit-sharing ratio is 5:3:2. Partner P\'s adjusted capital is ₹5,50,000.', answer: 'Required capitals: P = 5/10 × ₹10,00,000 = ₹5,00,000 (excess ₹50,000 → withdraw)',
                  options: ['Required capitals: P = 5/10 × ₹10,00,000 = ₹5,00,000 (excess ₹50,000 → withdraw)', 'all are proportionate', 'capital adjustment'],
                  hint: 'Revisit c12_acc_cbse_02_001 (New Profit Sharing Ratio) and c12_acc_cbse_02_006/007 (Revaluation and.',
                  misconception: 'Students often believe that "capital adjustment" means simply making the new partner\'s capital proportionate to their share, ignoring that.' },
                { id: 'b', prompt: 'Create a scenario where three partners admit a fourth, the total capital is not specified, and one continuing partner must withdraw capital while another must.', answer: 'Example: A, B, C share 4:3:3',
                  options: ['Example: A, B, C share 4:3:3', 'capital adjustment'],
                  hint: 'Revisit c12_acc_cbse_02_001 (New Profit Sharing Ratio) and c12_acc_cbse_02_006/007 (Revaluation and.',
                  misconception: 'Students often believe that "capital adjustment" means simply making the new partner\'s capital proportionate to their share, ignoring that.' }
          ],
            remediations: { 'capital-adjustment-means-simply-making': { steps: ['If the student cannot distinguish the three scenarios, do this: (1) Draw a decision tree: "Is total capital given?', 'No → Is a partner retiring/outgoing?', '→ Yes → Total = continuing capitals + outgoing dues.', 'No → Total = sum of continuing adjusted capitals." (2) For each scenario, solve one numerical problem side-by-side.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_009', difficulty: 'standard',
          question: 'Journal entries for admission of a new partner record all accounting.',
          hint: 'If stuck on which account to debit/credit, revisit c11_acc_cbse_03_004 and classify the.',
          misconception: '**Misconception:** "Goodwill brought in by the new partner is credited to Goodwill Account and appears as an asset.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Journal entries for admission of a new partner record all accounting adjustments required',
                  options: ['Journal entries for admission of a new partner record all accounting adjustments required', 'The **New Profit Sharing Ratio (NPSR)** is the ratio in', 'Goodwill is an intangible asset representing the value of a firm\'s reputation, customer', 'Goodwill valuation under the **Average Profit Method** computes goodwill as the product'],
                  hint: 'If stuck on which account to debit/credit, revisit c11_acc_cbse_03_004 and classify the account:.',
                  misconception: '**Misconception:** "Goodwill brought in by the new partner is credited to Goodwill Account and appears as an asset in the Balance Sheet.".' }
          ],
            remediations: { 'misconception-goodwill-brought-in-by': { steps: ['**Revisit c11_acc_cbse_03_004 (Rules of Debit/Credit):** Practice identifying accounts.', '**Revisit c12_acc_cbse_02_001 (Sacrificing Ratio):** Calculate sacrificing ratio for 5 scenarios where old/new ratios.', 'Verify: Sacrifice = Old - New (if positive).', '**Revisit c12_acc_cbse_02_005 (Premium Method) & c12_acc_cbse_02_006 (Revaluation):** Write both sets of entries.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_010', difficulty: 'standard',
          question: 'Preparation of Revaluation Account, Partners\' Capital Accounts, and Balance.',
          hint: 'If stuck on ledger posting: revisit Class 11 node c11_acc_cbse_03_010 (Posting from.',
          misconception: 'Students believe the Revaluation Account profit/loss is distributed in the NEW profit sharing ratio because "the new.',
          parts: [
                { id: 'a', prompt: 'A firm\'s Revaluation Account shows a credit total of ₹1,20,000 and debit total of ₹75,000. The old profit sharing ratio is 3:2.', answer: 'Revaluation profit = ₹1,20,000 - ₹75,000 = ₹45,000',
                  options: ['Revaluation profit = ₹1,20,000 - ₹75,000 = ₹45,000', 'the new firm will share future profits in that ratio'],
                  hint: 'If stuck on ledger posting: revisit Class 11 node c11_acc_cbse_03_010 (Posting from Journal.',
                  misconception: 'Students believe the Revaluation Account profit/loss is distributed in the NEW profit sharing ratio because "the new firm will share future.' },
                { id: 'b', prompt: 'A and B share profits 3:2. They admit C for 1/4th share. C brings ₹80,000 capital and ₹20,000 goodwill premium.', answer: 'New ratio: A = 3/4 × 3/4 = 9/16?',
                  options: ['New ratio: A = 3/4 × 3/4 = 9/16?', 'the new firm will share future profits in that ratio'],
                  hint: 'If stuck on ledger posting: revisit Class 11 node c11_acc_cbse_03_010 (Posting from Journal.',
                  misconception: 'Students believe the Revaluation Account profit/loss is distributed in the NEW profit sharing ratio because "the new firm will share future.' },
                { id: 'c', prompt: 'Compare the Revaluation Account format for admission vs. retirement. In admission, revaluation profit is credited to OLD partners in OLD ratio.', answer: 'Retiring partner is included',
                  options: ['Retiring partner is included', 'the new firm will share future profits in that ratio', 'retirement severs all ties immediately'],
                  hint: 'If stuck on ledger posting: revisit Class 11 node c11_acc_cbse_03_010 (Posting from Journal.',
                  misconception: 'Students believe the Revaluation Account profit/loss is distributed in the NEW profit sharing ratio because "the new firm will share future.' }
          ],
            remediations: { 'the-revaluation-account-profit-loss': { steps: ['Draw a timeline on paper: "Revaluation Date" → "Admission Date" → "Future". Place each adjustment on the timeline.', 'For each adjustment, ask: "Who was a partner on this date?" → determines distribution ratio.', 'Re-do Worked Example 1 from node 02_009, but this time POST each journal entry to T-accounts (Revaluation, Capital.', 'Verify Balance Sheet totals match. If not, trace each posting back to its journal entry.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_02_011', difficulty: 'standard',
          question: 'Hidden goodwill is the unrecorded goodwill of a partnership firm that arises.',
          hint: 'If stuck, revisit node c12_acc_cbse_02_001 (sacrificing ratio) and node.',
          misconception: 'Students often think hidden goodwill is the amount of goodwill the new partner brings in cash.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why hidden goodwill arises at the time of admission of a partner.', answer: 'Hidden goodwill arises',
                  options: ['Hidden goodwill arises', 'hidden goodwill is the amount of goodwill the new partner brings in cash'],
                  hint: 'If stuck, revisit node c12_acc_cbse_02_001 (sacrificing ratio) and node c12_acc_cbse_02_008.',
                  misconception: 'Students often think hidden goodwill is the amount of goodwill the new partner brings in cash.' },
                { id: 'b', prompt: 'A and B are partners sharing profits 3:2. Their adjusted capitals are ₹6,00,000 and ₹4,00,000. C is admitted for 1/4th share and brings ₹3,00,000 as capital.', answer: 'Step 1: Total capitalised value = ₹3,00,000 × (1 / 1/4) = ₹12,00,000',
                  options: ['Step 1: Total capitalised value = ₹3,00,000 × (1 / 1/4) = ₹12,00,000', 'hidden goodwill is the amount of goodwill the new partner brings in cash'],
                  hint: 'If stuck, revisit node c12_acc_cbse_02_001 (sacrificing ratio) and node c12_acc_cbse_02_008.',
                  misconception: 'Students often think hidden goodwill is the amount of goodwill the new partner brings in cash.' }
          ],
            remediations: { 'hidden-goodwill-is-the-amount': { steps: ['If a student makes the above error, first ask them to list the components of the firm\'s net assets after admission (old.', 'Then, using a simple analogy: "If you buy a 1/4 share of a pizza for ₹100, the whole pizza is valued at ₹400.', 'If the pizza already had ingredients worth ₹350, the extra ₹50 is the hidden value." Relate: new partner\'s capital.', 'Existing net assets (old capitals + new capital) = ₹350 + ₹100 = ₹450.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
