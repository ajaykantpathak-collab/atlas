import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch04_p1: SimDef = {
    id: 'v3_c12_acc_ch04_p1',
    title: 'Dissolution of Partnership Firm · Part 1/2',
    subtitle: 'Rewrite the contract — or bury the company? Learn to tell which is which.',
    classLevel: 12, subject: 'accountancy', topic: 'Dissolution of Partnership Firm · Part 1/2',
    chapters: ['c12_acc_ch04'],
    nodeIds: ['c12_acc_cbse_04_001', 'c12_acc_cbse_04_002', 'c12_acc_cbse_04_003', 'c12_acc_cbse_04_004', 'c12_acc_cbse_04_005', 'c12_acc_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Legal advisor ruling on firm closures', intro: 'The word \'dissolution\' hides two completely different events — and examiners bet you can\'t separate them.', goal: 'Distinguish dissolution of partnership from dissolution of firm and apply the legal modes of each.' },
    discovery: {
        question: 'Sohan retires and Mohan joins the same firm on a fresh agreement. Has the partnership firm been dissolved?',
        options: ['No — this is dissolution of partnership; the firm continues under a new agreement', 'Yes — any change in partners dissolves the firm itself', 'Yes — retirement always triggers full closure and asset sale', 'No — because no court order was issued, nothing was dissolved at all'],
        answer: 'No — this is dissolution of partnership; the firm continues under a new agreement',
        hook: 'The single most-confused distinction in partnership law: dissolving the *partnership* rewrites the contract while the business runs on; dissolving the *firm* means selling everything and paying everyone off.',
    },
    teaching: [
        { title: 'Dissolution of Partnership vs Dissolution of Partnership Firm: Distinction', text: 'Dissolution of partnership refers to a change in the partnership agreement (such as admission, retirement, death, or change in profit-sharing ratio) where the firm continues its business with a new.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Adjudicate dissolution scenarios — agreement, notice, court order — and decide in each case whether the business survives or the firm must be wound up, assets realised and liabilities cleared.',
        labels: ['Dissolution of Partnership', 'Modes of Dissolution', 'Realisation Account: Purpose, Format', 'Treatment of Realisation Expenses', 'Treatment of Unrecorded Assets', 'Treatment of Partner\'s Loan'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_acc_cbse_04_001', title: 'Dissolution of Partnership vs Dissolution of Partnership Firm: Distinction',
          caseStudy: { intro: 'Imagine two friends, Rohan and Sohan, run a partnership firm. One day, Sohan decides to retire.',
            decisions: [{ prompt: 'State whether the following is dissolution of partnership or dissolution of partnership firm: "A partner retires and the remaining partners.', options: [
                { text: 'This is **dissolution of partnership**', outcome: 'This is **dissolution of partnership** because the firm continues to exist with a reconstituted.' },
                { text: 'dissolution of partnership', outcome: 'Not quite — Students often think **any change in partners (admission, retirement, death) = dissolution.', reveals: 'any-change-in-partners-admission' },
                { text: 'dissolution of firm', outcome: 'Not quite — Students often think **any change in partners (admission, retirement, death) = dissolution.', reveals: 'any-change-in-partners-admission' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_04_002', title: 'Modes of Dissolution of a Partnership Firm (By Agreement, Notice, Court)',
          caseStudy: { intro: 'Imagine two friends, Rohan and Sohan, running a partnership firm. They decide to close the business because they want to pursue different careers.',
            decisions: [{ prompt: 'What is the essential legal requirement for a partnership firm to be dissolved by mutual agreement of all partners?', options: [
                { text: 'The essential requirement is that all partners must consent to the dissolution, either', outcome: 'The essential requirement is that all partners must consent to the dissolution, either expressly.' },
                { text: 'majority consent is enough', outcome: 'Not quite — Students often believe that a partnership deed is mandatory for a partnership to exist, and.', reveals: 'a-partnership-deed-is-mandatory' },
                { text: 'without a deed, no partnership exists', outcome: 'Not quite — Students often believe that a partnership deed is mandatory for a partnership to exist, and.', reveals: 'a-partnership-deed-is-mandatory' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_04_003', title: 'Realisation Account: Purpose, Format and Preparation',
          caseStudy: { intro: 'Imagine a partnership firm "Sharma & Verma" decides to close down. They have assets (building, stock, debtors) and liabilities (creditors, bank loan).',
            decisions: [{ prompt: 'What is the primary purpose of preparing a Realisation Account in the dissolution of a partnership firm?', options: [
                { text: 'The primary purpose is to ascertain the profit or loss on the realization of assets and', outcome: 'The primary purpose is to ascertain the profit or loss on the realization of assets and payment.' },
                { text: 'to distribute cash among partners', outcome: 'Not quite — Students often think the Realisation Account is the same as the Partners\' Capital Account or the.', reveals: 'the-realisation-account-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_04_004', title: 'Treatment of Realisation Expenses (Firm vs Partner Bearing)',
          caseStudy: { intro: 'Imagine a partnership firm "Mehta & Associates" decides to dissolve. They hire a lawyer for ₹25,000 and an auctioneer for ₹15,000 to sell assets.',
            decisions: [{ prompt: 'State the journal entry when realisation expenses of ₹10,000 are paid by the firm out of its bank account and the firm bears the expense.', options: [
                { text: 'Correct entry: Realisation A/c Dr', outcome: 'Correct entry: Realisation A/c Dr. ₹10,000 To Bank A/c ₹10,000.' },
                { text: '**whoever pays the cash** bears the expense', outcome: 'Not quite — Students often believe that **whoever pays the cash** bears the expense.', reveals: 'whoever-pays-the-cash-bears' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_04_005', title: 'Treatment of Unrecorded Assets and Unrecorded Liabilities',
          caseStudy: { intro: 'Imagine a partnership firm dissolving after 10 years. The Balance Sheet shows no goodwill, but the firm has a strong reputation — an unrecorded asset.',
            decisions: [{ prompt: 'Define unrecorded assets and unrecorded liabilities in the context of dissolution of a partnership firm. Give one example of each.', options: [
                { text: 'Unrecorded assets are assets not shown in the Balance Sheet (e.g., goodwill written off,', outcome: 'Unrecorded assets are assets not shown in the Balance Sheet (e.g., goodwill written off, patents.' },
                { text: 'assets not yet sold', outcome: 'Not quite — Students often debit the unrecorded asset account (e.g., Goodwill A/c) and credit Realisation.', reveals: 'students-often-debit-the-unrecorded' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_04_006', title: 'Treatment of Partner\'s Loan to the Firm and Partner\'s Capital Account',
          caseStudy: { intro: 'Imagine a partnership firm "A & B" decides to dissolve. The firm owes ₹50,000 to an outside creditor, ₹20,000 as a loan from partner A, and capitals are.',
            decisions: [{ prompt: 'What is the priority order of payments on dissolution of a partnership firm according to the Indian Partnership Act, 1932 (and NCERT)?', options: [
                { text: 'Correct order: (1) External creditors, (2) Partner\'s loan to the firm, (3) Partner\'s', outcome: 'Correct order: (1) External creditors, (2) Partner\'s loan to the firm, (3) Partner\'s capital.' },
                { text: 'Partner\'s capital before partner\'s loan', outcome: 'Not quite — Students treat Partner\'s Loan as part of Capital and settle it *after* capital or *with* capital.', reveals: 'students-treat-partner-s-loan' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A two-partner baking-supplies firm loses one partner to retirement; the survivor brings in a new partner and keeps trading. Their accounts intern opens a Realisation Account \'to record the retirement\'.',
            decisions: [{ prompt: 'Is that the right account?', options: [
                { text: 'No — the business continues, so this is only dissolution of partnership (reconstitution); assets and liabilities are revalued through a Revaluation Account, not sold off.', outcome: 'Realisation Account is for firm closure — assets realised, liabilities paid, business ended. Retirement with continuation just re-slices the agreement.' },
                { text: 'Yes — any change in the partners means the firm is dissolved, so assets must be realised and liabilities paid.', outcome: 'That collapses the legal distinction: admission, retirement or death end the agreement, not the business — only closure dissolves the firm.', reveals: 'partner-change-ends-firm' },
                { text: 'Open no account at all — a retirement is a personal matter between partners and the books stay untouched.', outcome: 'Reconstitution still needs accounting: assets/liabilities get revalued so the continuing firm carries fair values.', reveals: 'retirement-needs-no-entry' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You\'ll never again mix up \'the deal changed\' with \'the business died\'. This distinction is a guaranteed board question and the first thing a practising CA checks.',
            decisions: [{ prompt: 'What comes next? Dissolution of Partnership Firm · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Dissolution of Partnership Firm · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_04_001', difficulty: 'standard',
          question: 'Dissolution of partnership refers to a change in the partnership agreement.',
          hint: 'Review the Partnership Deed node (c11_bs_cbse_02_005) and list three clauses that allow.',
          misconception: 'Students often think **any change in partners (admission, retirement, death) = dissolution of firm**.',
          parts: [
                { id: 'a', prompt: 'State whether the following is dissolution of partnership or dissolution of partnership firm: "A partner retires and the remaining partners continue the.', answer: 'This is **dissolution of partnership**',
                  options: ['This is **dissolution of partnership**', 'dissolution of partnership', 'dissolution of firm', '**any change in partners (admission, retirement, death) = dissolution of firm**'],
                  hint: 'Review the Partnership Deed node (c11_bs_cbse_02_005) and list three clauses that allow the firm.',
                  misconception: 'Students often think **any change in partners (admission, retirement, death) = dissolution of firm**.' },
                { id: 'b', prompt: 'A firm has three partners. They mutually agree to close the business, sell all assets, pay liabilities, and distribute the surplus.', answer: 'This is **dissolution of partnership firm**',
                  options: ['This is **dissolution of partnership firm**', 'dissolution of partnership', 'dissolution of firm', '**any change in partners (admission, retirement, death) = dissolution of firm**'],
                  hint: 'Review the Partnership Deed node (c11_bs_cbse_02_005) and list three clauses that allow the firm.',
                  misconception: 'Students often think **any change in partners (admission, retirement, death) = dissolution of firm**.' }
          ],
            remediations: { 'any-change-in-partners-admission': { steps: ['Revisit the **Partnership Deed** concept (c11_bs_cbse_02_005) to recall that a partnership is an agreement that can.', 'Draw a **two-column table**: Left column = events causing dissolution of partnership (admission, retirement, death.', 'Practice classifying 10 scenarios from past papers.', 'If stuck on any, ask: "Does the business stop operating tomorrow?" If no → partnership dissolution only.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **any change in partners (admission, retirement, death) = dissolution of firm**.',
          parts: [
                { id: 'a', prompt: 'Create a short scenario (2-3 sentences) where a partnership firm undergoes dissolution of partnership **twice** within a year but never reaches dissolution.', answer: 'Example: "In January, Partner A retires and Partner D is admitted',
                  options: ['Example: "In January, Partner A retires and Partner D is admitted', 'dissolution of partnership', 'dissolution of firm', '**any change in partners (admission, retirement, death) = dissolution of firm**'],
                  hint: 'Review the Partnership Deed node (c11_bs_cbse_02_005) and list three clauses that allow the firm.',
                  misconception: 'Students often think **any change in partners (admission, retirement, death) = dissolution of firm**.' }
          ],
            remediations: { 'any-change-in-partners-admission': { steps: ['Revisit the **Partnership Deed** concept (c11_bs_cbse_02_005) to recall that a partnership is an agreement that can.', 'Draw a **two-column table**: Left column = events causing dissolution of partnership (admission, retirement, death.', 'Practice classifying 10 scenarios from past papers.', 'If stuck on any, ask: "Does the business stop operating tomorrow?" If no → partnership dissolution only.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_04_002', difficulty: 'standard',
          question: 'Modes of dissolution of a partnership firm refer to the legally recognised ways.',
          hint: 'If stuck, revisit the concept of \'partnership at will\' and \'fixed-term partnership\' from.',
          misconception: 'Students often believe that a partnership deed is mandatory for a partnership to exist, and therefore think that.',
          parts: [
                { id: 'a', prompt: 'A partnership firm has no partnership deed. Partner A wants to retire and dissolve the firm, but Partner B wants to continue.', answer: 'Yes, Partner A can dissolve the firm by giving a written notice to Partner B',
                  options: ['Yes, Partner A can dissolve the firm by giving a written notice to Partner B', 'both must agree', 'without a deed, no partnership exists'],
                  hint: 'If stuck, revisit the concept of \'partnership at will\' and \'fixed-term partnership\' from Class 11.',
                  misconception: 'Students often believe that a partnership deed is mandatory for a partnership to exist, and therefore think that without a deed,.' }
          ],
            remediations: { 'a-partnership-deed-is-mandatory': { steps: ['If a student cannot distinguish between partnership at will and fixed-term partnership, have them revisit Class 11.', 'Then, ask them to re-read Section 7 and Section 43 of the Indian Partnership Act, 1932.', 'Finally, give them a diagnostic question: "A partnership has no written deed.', 'Partner A gives notice to dissolve.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_04_003', difficulty: 'standard',
          question: 'A Realisation Account is a temporary nominal account prepared during the.',
          hint: 'If stuck, revisit Class 11 node **c11_acc_cbse_08_006** (Balance Sheet: Assets.',
          misconception: 'Students often think the Realisation Account is the same as the Partners\' Capital Account or the Bank Account.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Realisation Account is a temporary nominal account prepared during the dissolution of a',
                  options: ['A Realisation Account is a temporary nominal account prepared during the dissolution of a', 'Dissolution of partnership refers to a change in the partnership agreement (such as', 'Modes of dissolution of a partnership firm refer to the legally recognised ways in', 'Treatment of Realisation Expenses refers to the accounting procedure for recording costs'],
                  hint: 'If stuck, revisit Class 11 node **c11_acc_cbse_08_006** (Balance Sheet: Assets Classification) and.',
                  misconception: 'Students often think the Realisation Account is the same as the Partners\' Capital Account or the Bank Account.' }
          ],
            remediations: { 'the-realisation-account-is-the': { steps: ['Revisit the distinction between Realisation Account and Partners\' Capital Accounts using a T-account diagram.', 'Capital Accounts (personal, permanent).', 'Practice the golden rule: "Debit Realisation with book values of assets given up; Credit Realisation with book values.', 'Do a mini-exercise: Take a balance sheet, write only the Realisation Account entries for transfer of assets/liabilities.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_04_004', difficulty: 'standard',
          question: 'Treatment of Realisation Expenses refers to the accounting procedure for.',
          hint: 'Revisit Realisation Account preparation (c12_acc_cbse_04_003) and Class 11 debit/credit.',
          misconception: 'Students often believe that **whoever pays the cash** bears the expense.',
          parts: [
                { id: 'a', prompt: 'State the journal entry when realisation expenses of ₹10,000 are paid by the firm out of its bank account and the firm bears the expense.', answer: 'Correct entry: Realisation A/c Dr',
                  options: ['Correct entry: Realisation A/c Dr', '**whoever pays the cash** bears the expense'],
                  hint: 'Revisit Realisation Account preparation (c12_acc_cbse_04_003) and Class 11 debit/credit rules.',
                  misconception: 'Students often believe that **whoever pays the cash** bears the expense.' },
                { id: 'b', prompt: 'A firm dissolves. Realisation expenses of ₹8,000 are paid by Partner A from his personal funds. The agreement states the firm bears these expenses.', answer: 'Step 1: Realisation A/c Dr',
                  options: ['Step 1: Realisation A/c Dr', 'the payer bears the expense, ignoring the agreement', '**whoever pays the cash** bears the expense'],
                  hint: 'Revisit Realisation Account preparation (c12_acc_cbse_04_003) and Class 11 debit/credit rules.',
                  misconception: 'Students often believe that **whoever pays the cash** bears the expense.' },
                { id: 'c', prompt: 'Compare the effect on the Realisation Account and Partner\'s Capital Account when (i) firm bears and pays ₹5,000, (ii) partner bears and firm pays ₹5,000, (iii).', answer: '(i) Realisation Dr',
                  options: ['(i) Realisation Dr', 'puts Bank in (iii) shows misunderstanding of cash flow', '**whoever pays the cash** bears the expense'],
                  hint: 'Revisit Realisation Account preparation (c12_acc_cbse_04_003) and Class 11 debit/credit rules.',
                  misconception: 'Students often believe that **whoever pays the cash** bears the expense.' }
          ],
            remediations: { 'whoever-pays-the-cash-bears': { steps: ['Re-read the partnership deed clause (or assumed agreement) aloud and identify the bearer.', 'Draw a T-account for Realisation and Partner\'s Capital.', 'Ask: "Is this expense a loss to the firm or a personal charge to the partner?" 4.', 'Then ask: "Did the firm pay cash or did the partner pay?" Credit Bank or Partner\'s Capital accordingly.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_04_005', difficulty: 'standard',
          question: 'Unrecorded assets are assets not appearing in the firm\'s Balance Sheet (e.g.',
          hint: 'Revisit Realisation Account purpose and format (c12_acc_cbse_04_003) and practice 3-4.',
          misconception: 'Students often debit the unrecorded asset account (e.g., Goodwill A/c) and credit Realisation Account, thinking the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Unrecorded assets are assets not appearing in the firm\'s Balance Sheet (e.g., goodwill',
                  options: ['Unrecorded assets are assets not appearing in the firm\'s Balance Sheet (e.g., goodwill', 'Dissolution of partnership refers to a change in the partnership agreement (such as', 'Modes of dissolution of a partnership firm refer to the legally recognised ways in', 'A Realisation Account is a temporary nominal account prepared during the dissolution of a'],
                  hint: 'Revisit Realisation Account purpose and format (c12_acc_cbse_04_003) and practice 3-4 simple.',
                  misconception: 'Students often debit the unrecorded asset account (e.g., Goodwill A/c) and credit Realisation Account, thinking the asset must first.' }
          ],
            remediations: { 'students-often-debit-the-unrecorded': { steps: ['Revisit the purpose of Realisation Account (node c12_acc_cbse_04_003) — it is a nominal account for profit/loss.', 'Practice the rule: "Any gain (cash inflow or liability taken over) credits Realisation; any loss (cash outflow or asset.', 'Write 5 journal entries for unrecorded items without using any asset/liability account names — only Bank, Realisation.', 'Check each entry: Does cash come in?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_04_006', difficulty: 'standard',
          question: 'In the dissolution of a partnership firm, a **Partner\'s Loan to the Firm** is.',
          hint: 'Revise Class 11 Accounting Equation (c11_acc_cbse_01_011) and Business Studies.',
          misconception: 'Students treat Partner\'s Loan as part of Capital and settle it *after* capital or *with* capital in one combined entry.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In the dissolution of a partnership firm, a **Partner\'s Loan to the Firm** is a liability',
                  options: ['In the dissolution of a partnership firm, a **Partner\'s Loan to the Firm** is a liability', 'Dissolution of partnership refers to a change in the partnership agreement (such as', 'Modes of dissolution of a partnership firm refer to the legally recognised ways in', 'A Realisation Account is a temporary nominal account prepared during the dissolution of a'],
                  hint: 'Revise Class 11 Accounting Equation (c11_acc_cbse_01_011) and Business Studies Partnership features.',
                  misconception: 'Students treat Partner\'s Loan as part of Capital and settle it *after* capital or *with* capital in one combined entry.' }
          ],
            remediations: { 'students-treat-partner-s-loan': { steps: ['Revisit the definition of "Liability vs Equity" from Class 11 (c11_acc_cbse_01_008).', 'Draw a payment hierarchy ladder on paper: Creditors → Partner\'s Loan → Partner\'s Capital.', 'Do 3 practice problems *only* on loan repayment (cash and asset settlement) until the entry "Partner\'s Loan A/c Dr.".', 'Then attempt combined problems with capital.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
