import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch01_p1: SimDef = {
    id: 'v3_c12_acc_ch01_p1',
    title: 'Accounting for Partnership Firms · Part 1/2',
    subtitle: 'Two friends, one food truck, and the law that decides if they\'re partners',
    classLevel: 12, subject: 'accountancy', topic: 'Accounting for Partnership Firms · Part 1/2',
    chapters: ['c12_acc_ch01'],
    nodeIds: ['c12_acc_cbse_01_001', 'c12_acc_cbse_01_002', 'c12_acc_cbse_01_003', 'c12_acc_cbse_01_004', 'c12_acc_cbse_01_005', 'c12_acc_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Founding partner & agreements drafter', intro: 'Every business you\'ll ever build or audit starts with one question: what exactly binds these people together?', goal: 'Apply Section 4\'s essential features and design deed clauses for profit-sharing, capital and disputes.' },
    discovery: {
        question: 'Rohan and Sohan pool money for a food truck, share recipes, and split profits 60:40 — but never sign anything. Under the Indian Partnership Act, 1932, are they legally a partnership?',
        options: ['Yes — an agreement to run a business and share profits is enough; writing is not mandatory', 'No — a partnership exists only once a written deed is registered', 'No — a firm needs at least three partners to be recognised', 'Yes — but only after they register the firm with the Registrar'],
        answer: 'Yes — an agreement to run a business and share profits is enough; writing is not mandatory',
        hook: 'Students assume law demands paperwork; Section 4 only demands agreement, business, profit-sharing and mutual agency — the deed is evidence, not existence.',
    },
    teaching: [
        { title: 'Partnership: Definition and Essential Features under the Act', text: 'Partnership is a relation between two or more persons who have agreed to share the profits of a business carried on by all or any of them acting for all, as defined under Section 4 of the Indian.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Run a two-partner venture and test every \'are we a partnership?\' scenario against Section 4 — then draft the deed clauses that protect both partners before a dispute does it for them.',
        labels: ['Partnership: Definition and Essential', 'Partnership Deed: Meaning, Contents', 'Rules Applicable in', 'Fixed Capital vs Fluctuating', 'Profit and Loss Appropriation', 'Interest on Capital: Computation'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_acc_cbse_01_001', title: 'Partnership: Definition and Essential Features under the Act',
          caseStudy: { intro: 'Imagine two friends, Rohan and Sohan, start a food truck business. They pool money, share recipes, and agree to split profits 60:40. Is this a partnership?',
            decisions: [{ prompt: 'State the legal definition of partnership as per Section 4 of the Indian Partnership Act, 1932.', options: [
                { text: 'Partnership is the relation between persons who have agreed to share the profits of a', outcome: 'Partnership is the relation between persons who have agreed to share the profits of a business.' },
                { text: 'partnership is a company', outcome: 'Not quite — Students often believe that sharing profits automatically means a partnership exists.', reveals: 'sharing-profits-automatically-means-a' },
                { text: 'partnership requires registration', outcome: 'Not quite — Students often believe that sharing profits automatically means a partnership exists.', reveals: 'sharing-profits-automatically-means-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_01_002', title: 'Partnership Deed: Meaning, Contents and Importance',
          caseStudy: { intro: 'Imagine you and two friends decide to start a CA coaching institute in Delhi.',
            decisions: [{ prompt: 'What is the minimum number of clauses a Partnership Deed must contain to be valid under the Indian Partnership Act, 1932?', options: [
                { text: 'There is no statutory minimum number of clauses', outcome: 'There is no statutory minimum number of clauses. A Partnership Deed can be oral or written; the Act.' },
                { text: '5 clauses', outcome: 'Not quite — Students believe a Partnership Deed is primarily a legal formality for registration, and its.', reveals: 'a-partnership-deed-is-primarily' },
                { text: 'must be registered', outcome: 'Not quite — Students believe a Partnership Deed is primarily a legal formality for registration, and its.', reveals: 'a-partnership-deed-is-primarily' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_01_003', title: 'Rules Applicable in the Absence of a Partnership Deed',
          caseStudy: { intro: 'Imagine two friends, Arjun and Priya, start a consulting firm. Arjun invests ₹10 lakh, Priya invests ₹2 lakh. They shake hands but sign no deed.',
            decisions: [{ prompt: 'State the default profit-sharing ratio between partners when no partnership deed exists, and cite the specific section of the Indian.', options: [
                { text: 'Equal sharing (1:1) regardless of capital contribution, per Section 13(b) of the Indian', outcome: 'Equal sharing (1:1) regardless of capital contribution, per Section 13(b) of the Indian Partnership.' },
                { text: 'in capital ratio', outcome: 'Not quite — Students often believe "capital contribution determines profit share" by default because they.', reveals: 'capital-contribution-determines-profit-share' },
                { text: 'as mutually agreed', outcome: 'Not quite — Students often believe "capital contribution determines profit share" by default because they.', reveals: 'capital-contribution-determines-profit-share' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_01_004', title: 'Fixed Capital vs Fluctuating Capital Accounts: Distinction and Treatment',
          caseStudy: { intro: 'Imagine two friends, Arjun and Meera, start a partnership firm with ₹5,00,000 each.',
            decisions: [{ prompt: 'State the fundamental difference between Fixed Capital Method and Fluctuating Capital Method in a partnership firm.', options: [
                { text: 'Fixed Capital Method keeps the Capital Account balance constant (original contribution', outcome: 'Fixed Capital Method keeps the Capital Account balance constant (original contribution only) and.' },
                { text: 'Fixed Capital means capital cannot be changed at all', outcome: 'Not quite — Students believe that under Fixed Capital Method, the Capital Account **never** changes — not even.', reveals: 'under-fixed-capital-method' },
                { text: 'fixed unless permanently altered', outcome: 'Not quite — Students believe that under Fixed Capital Method, the Capital Account **never** changes — not even.', reveals: 'under-fixed-capital-method' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_01_005', title: 'Profit and Loss Appropriation Account: Preparation and Format',
          scaffold: { problem: 'P and Q are partners sharing profits 3:2. Their capitals: P ₹6,00,000, Q ₹4,00,000. Net profit from P&L Account: ₹3,50,000.',
            steps: [
            { text: 'Identify all appropriation items from the deed and classify each as debit (charge against profit) or credit (income.' },
            { text: 'Compute each item: Interest on Capital: P = ₹6,00,000 × 10% = ₹60,000; Q = ₹4,00,000 × 10% = ₹40,000.' },
            { text: 'Compute commission first since it depends on divisible profit before reserve.' },
            { text: 'Profit before reserve = ₹1,79,000 − ₹8,524 = ₹1,70,476. Transfer to General Reserve = 10% × ₹1,70,476 = ₹17,048.' },
            { text: 'Distribute divisible profit: P (3/5) = ₹92,057; Q (2/5) = ₹61,371.', faded: true, blankAnswer: 'Divisible Profit = ₹1,53,428 (P: ₹92,057, Q: ₹61,371).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_01_006', title: 'Interest on Capital: Computation and Accounting Treatment',
          scaffold: { problem: 'Partners A and B share profits 3:2. Their fixed capitals on 1st April 2023: A ₹5,00,000, B ₹3,00,000. Partnership Deed provides 10% p.a.',
            steps: [
            { text: 'Identify capital periods for A: ₹5,00,000 for 3 months (Apr-Jun), ₹6,00,000 for 9 months (Jul-Mar).' },
            { text: 'Calculate products: A = (5,00,000 × 3) + (6,00,000 × 9) = 15,00,000 + 54,00,000 = 69,00,000.' },
            { text: 'Compute interest: A = 69,00,000 × 10/100 × 1/12 = ₹57,500. B = 33,00,000 × 10/100 × 1/12 = ₹27,500.' },
            { text: 'Check profit sufficiency: Profit ₹1,20,000 > ₹85,000 → full interest allowed.' },
            { text: 'Prepare P&L Appropriation A/c: Dr. Interest on Capital A ₹57,500, B ₹27,500; Profit transferred to Capital A/cs.', faded: true, blankAnswer: 'A\'s Interest = ₹57,500, B\'s Interest = ₹27,500. P&L.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a summer internship, a Class 12 student lends ₹50,000 to a friend\'s cloud-kitchen and takes 10% of monthly profits instead of fixed interest. When the kitchen defaults on a supplier\'s bill, the supplier claims she is a partner and must pay up.',
            decisions: [{ prompt: 'Is she liable as a partner?', options: [
                { text: 'No — Section 6 of the Partnership Act says a lender whose return varies with profits is not a partner; she has no mutual agency, so profit-sharing alone doesn\'t make her one.', outcome: 'Profit share is only one feature; without the authority to act for and bind the firm, there\'s no partnership — the supplier can\'t touch her.' },
                { text: 'Yes — anyone who takes a share of business profits is a partner, so she\'s jointly and severally liable for the debt.', outcome: 'That over-generalises profit-sharing: the Act explicitly excludes lenders paid from profits, and she cannot bind the firm.', reveals: 'profit-share-equals-partner' },
                { text: 'No — the firm was never registered, so no partnership can legally exist and nobody is liable.', outcome: 'Registration isn\'t what creates a partnership — but she still isn\'t a partner because mutual agency is missing, not because paperwork is missing.', reveals: 'registration-creates-partnership' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now spot a partnership in the wild and write the deed that keeps it alive. Board questions love the \'is this a partnership?\' trap — and future founders live it.',
            decisions: [{ prompt: 'What comes next? Accounting for Partnership Firms · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Accounting for Partnership Firms · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_001', difficulty: 'standard',
          question: 'Partnership is a relation between two or more persons who have agreed to share.',
          hint: 'If stuck, revisit Class 11 Business Studies Chapter 2 (Forms of Business Organisation).',
          misconception: 'Students often believe that sharing profits automatically means a partnership exists.',
          parts: [
                { id: 'a', prompt: 'Rahul and Priya jointly own a building and rent it out, sharing the rental income equally. They have no agreement to carry on any business.', answer: 'No, it is not a partnership',
                  options: ['No, it is not a partnership', 'profit-sharing alone creates partnership, ignoring the business requirement', 'sharing profits automatically means a partnership exists'],
                  hint: 'If stuck, revisit Class 11 Business Studies Chapter 2 (Forms of Business Organisation).',
                  misconception: 'Students often believe that sharing profits automatically means a partnership exists.' },
                { id: 'b', prompt: 'Compare partnership with a Joint Hindu Family Business (HUF) on the basis of: (a) mode of creation, (b) liability of members, (c) mutual agency, (d).', answer: 'mode of creation, (',
                  options: ['mode of creation, (', 'both have mutual agency', 'sharing profits automatically means a partnership exists'],
                  hint: 'If stuck, revisit Class 11 Business Studies Chapter 2 (Forms of Business Organisation).',
                  misconception: 'Students often believe that sharing profits automatically means a partnership exists.' }
          ],
            remediations: { 'sharing-profits-automatically-means-a': { steps: ['If a student thinks profit-sharing alone creates partnership, do this: (1) Re-read Section 6 of the Indian Partnership.', '(2) Take three scenarios: (a) employee bonus linked to profit, (b) lender taking profit-linked interest, (c) two.', 'For each, check all six features in a table.', '(3) Ask: "Can the employee bind the firm?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_002', difficulty: 'standard',
          question: 'A Partnership Deed is a written legal document that contains the terms and.',
          hint: 'If stuck, revisit c11_bs_cbse_02_005 and create a two-column table: Column 1 = Deed.',
          misconception: 'Students believe a Partnership Deed is primarily a legal formality for registration, and its accounting relevance.',
          parts: [
                { id: 'a', prompt: 'What is the minimum number of clauses a Partnership Deed must contain to be valid under the Indian Partnership Act, 1932?', answer: 'There is no statutory minimum number of clauses',
                  options: ['There is no statutory minimum number of clauses', '5 clauses', 'must be registered'],
                  hint: 'If stuck, revisit c11_bs_cbse_02_005 and create a two-column table: Column 1 = Deed Clause (e.g.',
                  misconception: 'Students believe a Partnership Deed is primarily a legal formality for registration, and its accounting relevance is limited to stating the.' }
          ],
            remediations: { 'a-partnership-deed-is-primarily': { steps: ['Revisit c11_bs_cbse_02_005 (Class 11 Business Studies: Partnership Deed Contents) — list the 10 standard clauses.', 'For each clause, write the exact journal entry it triggers (e.g., "Interest on Capital clause → Debit P&L.', 'Take a blank deed template and fill it for a hypothetical firm (capital, roles, profit share).', 'Generate 5 transactions (drawings, salary, loss year, admission) and pass entries ONLY based on your deed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_003', difficulty: 'standard',
          question: 'In the absence of a written Partnership Deed, the provisions of the Indian.',
          hint: 'Revisit "Partnership: Definition and Essential Features" (c12_acc_cbse_01_001) and.',
          misconception: 'Students often believe "capital contribution determines profit share" by default because they confuse partnership with.',
          parts: [
                { id: 'a', prompt: 'Arjun and Priya are partners without a deed. Arjun contributed ₹8,00,000 capital; Priya contributed ₹2,00,000. Arjun claims 80% of profits. Priya claims 50%.', answer: 'Priya is correct',
                  options: ['Priya is correct', 'capital contribution determines profit share'],
                  hint: 'Revisit "Partnership: Definition and Essential Features" (c12_acc_cbse_01_001) and "Partnership.',
                  misconception: 'Students often believe "capital contribution determines profit share" by default because they confuse partnership with a company (where.' },
                { id: 'b', prompt: 'A partnership without a deed has three partners: X, Y, Z. X advances a loan of ₹5,00,000 to the firm. The firm earns ₹3,00,000 profit before interest.', answer: 'Interest = ₹5,00,000 × 6% = ₹30,000 (Section 13(c) proviso)',
                  options: ['Interest = ₹5,00,000 × 6% = ₹30,000 (Section 13(c) proviso)', 'interest on loan', 'interest on capital', 'capital contribution determines profit share'],
                  hint: 'Revisit "Partnership: Definition and Essential Features" (c12_acc_cbse_01_001) and "Partnership.',
                  misconception: 'Students often believe "capital contribution determines profit share" by default because they confuse partnership with a company (where.' },
                { id: 'c', prompt: 'Compare and contrast: (a) Interest on partner\'s loan vs (b) Interest on partner\'s capital under the default rules of the Partnership Act.', answer: 'Interest on partner\'s loan vs (',
                  options: ['Interest on partner\'s loan vs (', 'capital contribution determines profit share'],
                  hint: 'Revisit "Partnership: Definition and Essential Features" (c12_acc_cbse_01_001) and "Partnership.',
                  misconception: 'Students often believe "capital contribution determines profit share" by default because they confuse partnership with a company (where.' }
          ],
            remediations: { 'capital-contribution-determines-profit-share': { steps: ['Re-read Section 13 of the Indian Partnership Act, 1932 (NCERT Chapter 1, page 7-8).', 'Make a two-column table: "What the Act Says" vs "What Students Assume".', 'Solve Illustration 1 from NCERT (page 8) without looking at solution — it tests exactly these default rules.', 'If still confused, revisit c12_acc_cbse_01_001 (Partnership Definition) to reinforce "mutual agency" and "co-ownership".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "capital contribution determines profit share" by default because they confuse partnership with.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "In a partnership without a deed, a working partner who devotes full time to the business can claim a monthly salary of ₹50,000 from.', answer: 'Refute',
                  options: ['Refute', 'capital contribution determines profit share'],
                  hint: 'Revisit "Partnership: Definition and Essential Features" (c12_acc_cbse_01_001) and "Partnership.',
                  misconception: 'Students often believe "capital contribution determines profit share" by default because they confuse partnership with a company (where.' },
                { id: 'b', prompt: 'Create a realistic scenario where three partners (A, B, C) without a deed face a conflict involving: (i) profit sharing, (ii) interest on capital, (iii).', answer: 'Scenario: A (₹10L capital), B (₹5L), C (₹1L)',
                  options: ['Scenario: A (₹10L capital), B (₹5L), C (₹1L)', 'capital contribution determines profit share'],
                  hint: 'Revisit "Partnership: Definition and Essential Features" (c12_acc_cbse_01_001) and "Partnership.',
                  misconception: 'Students often believe "capital contribution determines profit share" by default because they confuse partnership with a company (where.' }
          ],
            remediations: { 'capital-contribution-determines-profit-share': { steps: ['Re-read Section 13 of the Indian Partnership Act, 1932 (NCERT Chapter 1, page 7-8).', 'Make a two-column table: "What the Act Says" vs "What Students Assume".', 'Solve Illustration 1 from NCERT (page 8) without looking at solution — it tests exactly these default rules.', 'If still confused, revisit c12_acc_cbse_01_001 (Partnership Definition) to reinforce "mutual agency" and "co-ownership".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_004', difficulty: 'standard',
          question: 'Fixed Capital Method maintains partners\' capital accounts at a constant.',
          hint: 'Revisit c11_acc_cbse_03_004 (Rules of Debit/Credit for Capital) and c12_acc_cbse_01_002.',
          misconception: 'Students believe that under Fixed Capital Method, the Capital Account **never** changes — not even when a partner.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Fixed Capital Method maintains partners\' capital accounts at a constant original amount',
                  options: ['Fixed Capital Method maintains partners\' capital accounts at a constant original amount', 'Partnership is a relation between two or more persons who have agreed to share the', 'A Partnership Deed is a written legal document that contains the terms and conditions of', 'In the absence of a written Partnership Deed, the provisions of the Indian Partnership'],
                  hint: 'Revisit c11_acc_cbse_03_004 (Rules of Debit/Credit for Capital) and c12_acc_cbse_01_002.',
                  misconception: 'Students believe that under Fixed Capital Method, the Capital Account **never** changes — not even when a partner permanently introduces.' }
          ],
            remediations: { 'under-fixed-capital-method': { steps: ['Ask student: "If Partner A brings ₹1,00,000 additional capital on 1st Jan under Fixed Capital Method, which account.', 'Re-teach: Draw a T-account for Capital and Current side-by-side.', 'List 10 transactions (interest on capital, drawings, salary, profit share, additional capital, permanent withdrawal.', 'Have student classify each as "Capital Account" or "Current Account" under Fixed Capital Method.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_005', difficulty: 'standard',
          question: 'The Profit and Loss Appropriation Account is a nominal account prepared.',
          hint: 'Revisit c11_acc_cbse_08_004 (P&L Account Preparation) and c11_acc_cbse_03_005.',
          misconception: 'Students treat the Profit and Loss Appropriation Account as a continuation of the Profit and Loss Account and put *all*.',
          parts: [
                { id: 'a', prompt: 'Compare the treatment of "Interest on Capital" and "Interest on Drawings" in the Profit and Loss Appropriation Account.', answer: 'Interest on Capital is an *appropriation*',
                  options: ['Interest on Capital is an *appropriation*', 'capital = debit, drawings = credit'],
                  hint: 'Revisit c11_acc_cbse_08_004 (P&L Account Preparation) and c11_acc_cbse_03_005 (Debit/Credit Rules.',
                  misconception: 'Students treat the Profit and Loss Appropriation Account as a continuation of the Profit and Loss Account and put *all* partner-related.' }
          ],
            remediations: { 'students-treat-the-profit-and': { steps: ['Have the student draw a two-column table: "Firm\'s Perspective" vs "Partner\'s Perspective" for each item (Interest.', 'For each, ask: "Does the firm *pay* or *receive*?', 'Is it an *expense/appropriation* or *income*?" 3.', 'Firm pays interest on capital → appropriation → debit.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_006', difficulty: 'standard',
          question: 'Interest on Capital is the return paid to partners for the capital they have.',
          hint: 'Revisit c8_math_ch8_9 (Simple Interest formula) and c11_acc_cbse_09_008 (Adjustment.',
          misconception: 'Students often treat interest on capital as a "charge against profit" (like rent or employee salary) that must be paid.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Interest on Capital is the return paid to partners for the capital they have invested in',
                  options: ['Interest on Capital is the return paid to partners for the capital they have invested in', 'Partnership is a relation between two or more persons who have agreed to share the', 'A Partnership Deed is a written legal document that contains the terms and conditions of', 'In the absence of a written Partnership Deed, the provisions of the Indian Partnership'],
                  hint: 'Revisit c8_math_ch8_9 (Simple Interest formula) and c11_acc_cbse_09_008 (Adjustment: Interest.',
                  misconception: 'Students often treat interest on capital as a "charge against profit" (like rent or employee salary) that must be paid even if the firm.' }
          ],
            remediations: { 'students-often-treat-interest-on': { steps: ['If a student makes the charge-vs-appropriation error: (1) Revisit c11_acc_cbse_08_004 (P&L Account) and.', '(2) Revisit c11_acc_cbse_09_008 (Adjustment: Interest on Capital and Drawings) for the adjustment entry pattern.', '(3) Practice: "Firm has loss of ₹20,000.', 'Deed provides 10% interest on capital ₹5,00,000.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
