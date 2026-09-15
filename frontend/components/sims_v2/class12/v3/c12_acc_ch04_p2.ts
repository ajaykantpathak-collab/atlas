import type { SimDef } from '../../engine/types';

/** v3 generated — c12_acc_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_acc_ch04_p2: SimDef = {
    id: 'v3_c12_acc_ch04_p2',
    title: 'Dissolution of Partnership Firm · Part 2/2',
    subtitle: 'Rewrite the contract — or bury the company? Learn to tell which is which.',
    classLevel: 12, subject: 'accountancy', topic: 'Dissolution of Partnership Firm · Part 2/2',
    chapters: ['c12_acc_ch04'],
    nodeIds: ['c12_acc_cbse_04_007', 'c12_acc_cbse_04_008', 'c12_acc_cbse_04_009', 'c12_acc_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Legal advisor ruling on firm closures', intro: 'The word \'dissolution\' hides two completely different events — and examiners bet you can\'t separate them.', goal: 'Distinguish dissolution of partnership from dissolution of firm and apply the legal modes of each.' },
    discovery: {
        question: 'Sohan retires and Mohan joins the same firm on a fresh agreement. Has the partnership firm been dissolved?',
        options: ['No — this is dissolution of partnership; the firm continues under a new agreement', 'Yes — any change in partners dissolves the firm itself', 'Yes — retirement always triggers full closure and asset sale', 'No — because no court order was issued, nothing was dissolved at all'],
        answer: 'No — this is dissolution of partnership; the firm continues under a new agreement',
        hook: 'The single most-confused distinction in partnership law: dissolving the *partnership* rewrites the contract while the business runs on; dissolving the *firm* means selling everything and paying everyone off.',
    },
    teaching: [
        { title: 'Settlement of Accounts: Realisation of Assets and Payment of Liabilities', text: 'Settlement of Accounts in dissolution refers to the systematic process of distributing the cash realised from asset sales to discharge the firm\'s external liabilities, partner loans, and finally.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_acc_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Adjudicate dissolution scenarios — agreement, notice, court order — and decide in each case whether the business survives or the firm must be wound up, assets realised and liabilities cleared.',
        labels: ['Settlement of Accounts: Realisation', 'Insolvency of a Partner', 'Preparation of Realisation Account,', 'Journal Entries for Dissolution'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_04_008', title: 'Insolvency of a Partner: Garner v Murray Rule and Its Application',
          scaffold: { problem: 'A, B, C are partners sharing profits 5:3:2. On 31st March 2024, they dissolve the firm. Capitals: A ₹1,00,000, B ₹60,000, C ₹40,000.',
            steps: [
            { text: 'Share realization loss in profit-sharing ratio 5:3:2. A\'s share = ₹30,000 × 5/10 = ₹15,000; B\'s share = ₹30,000 × 3/10.' },
            { text: 'Adjust capitals for realization loss: A = ₹1,00,000 - ₹15,000 = ₹85,000; B = ₹60,000 - ₹9,000 = ₹51,000; C = ₹40,000.' },
            { text: 'Identify insolvent partner\'s deficiency. C has ₹34,000 (Cr) — no deficiency!' },
            { text: 'Allocate C\'s deficiency ₹22,000 to A and B in profit-sharing ratio 5:3.' },
            { text: 'Final capitals: A = ₹55,000 - ₹13,750 = ₹41,250; B = ₹33,000 - ₹8,250 = ₹24,750; C = ₹0 (insolvent).', faded: true, blankAnswer: 'A receives ₹41,250; B receives ₹24,750; C receives ₹0.' }
            ] } },
        { type: 'case', nodeId: 'c12_acc_cbse_04_009', title: 'Preparation of Realisation Account, Partners\' Capital Accounts and Cash/Bank Account',
          caseStudy: { intro: 'Imagine you are a partner in a firm that has decided to dissolve.',
            decisions: [{ prompt: 'What is the primary purpose of the Realisation Account in dissolution of a partnership firm?', options: [
                { text: 'The Realisation Account is prepared to ascertain the profit or loss on realisation of', outcome: 'The Realisation Account is prepared to ascertain the profit or loss on realisation of assets and.' },
                { text: 'to record journal entries', outcome: 'Not quite — Students often think that the Realisation Account and the Revaluation Account are the same.', reveals: 'the-realisation-account-and-the' },
                { text: 'to calculate partner\'s capital', outcome: 'Not quite — Students often think that the Realisation Account and the Revaluation Account are the same.', reveals: 'the-realisation-account-and-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_04_010', title: 'Journal Entries for Dissolution of a Partnership Firm',
          caseStudy: { intro: 'Imagine your family\'s partnership firm "Sharma & Sons" has decided to dissolve after 20 years.',
            decisions: [{ prompt: 'State the journal entry to transfer sundry assets (excluding cash/bank) to Realisation Account at book value when a partnership firm.', options: [
                { text: 'Correct entry: Realisation A/c Dr', outcome: 'Correct entry: Realisation A/c Dr. → To Sundry Assets A/c (individually).' },
                { text: 'Sundry Assets A/c Dr', outcome: 'Not quite — Students believe that when a partner takes over an asset (recorded or unrecorded), the entry.', reveals: 'when-a-partner-takes-over' },
                { text: 'assets are "coming in" rather than being transferred out for realisation', outcome: 'Not quite — Students believe that when a partner takes over an asset (recorded or unrecorded), the entry.', reveals: 'when-a-partner-takes-over' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A two-partner baking-supplies firm loses one partner to retirement; the survivor brings in a new partner and keeps trading. Their accounts intern opens a Realisation Account \'to record the retirement\'.',
            decisions: [{ prompt: 'Is that the right account?', options: [
                { text: 'No — the business continues, so this is only dissolution of partnership (reconstitution); assets and liabilities are revalued through a Revaluation Account, not sold off.', outcome: 'Realisation Account is for firm closure — assets realised, liabilities paid, business ended. Retirement with continuation just re-slices the agreement.' },
                { text: 'Yes — any change in the partners means the firm is dissolved, so assets must be realised and liabilities paid.', outcome: 'That collapses the legal distinction: admission, retirement or death end the agreement, not the business — only closure dissolves the firm.', reveals: 'partner-change-ends-firm' },
                { text: 'Open no account at all — a retirement is a personal matter between partners and the books stay untouched.', outcome: 'Reconstitution still needs accounting: assets/liabilities get revalued so the continuing firm carries fair values.', reveals: 'retirement-needs-no-entry' }
            ] }] } },
        { type: 'case', nodeId: 'c12_acc_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'You\'ll never again mix up \'the deal changed\' with \'the business died\'. This distinction is a guaranteed board question and the first thing a practising CA checks.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_04_007', difficulty: 'standard',
          question: 'Settlement of Accounts in dissolution refers to the systematic process.',
          hint: 'If confused about adjusted capitals, revisit **c12_acc_cbse_04_003** (Realisation.',
          misconception: '**Misconception:** "Partner\'s capital should be paid before partner\'s loan because capital is ownership and loan.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Settlement of Accounts in dissolution refers to the systematic process of distributing',
                  options: ['Settlement of Accounts in dissolution refers to the systematic process of distributing', 'Dissolution of partnership refers to a change in the partnership agreement (such as', 'Modes of dissolution of a partnership firm refer to the legally recognised ways in', 'A Realisation Account is a temporary nominal account prepared during the dissolution of a'],
                  hint: 'If confused about adjusted capitals, revisit **c12_acc_cbse_04_003** (Realisation Account) and.',
                  misconception: '**Misconception:** "Partner\'s capital should be paid before partner\'s loan because capital is ownership and loan is debt." **Why it\'s.' }
          ],
            remediations: { 'misconception-partner-s-capital-should': { steps: ['If the student reverses loan/capital order or ignores PSR in deficiency: 1.', 'Revisit **c12_acc_cbse_04_003** (Realisation Account) to confirm how profit/loss adjusts capitals.', 'Re-read Section 48 text (NCERT Partnership Act summary) and draw the **three-tier waterfall** diagram: Creditors →.', 'Do a **mini-drill**: Take the Diagnostic Q3 numbers, but swap loan and capital amounts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_04_008', difficulty: 'standard',
          question: 'The Garner v Murray rule is a legal principle applied during the dissolution.',
          hint: 'Revisit c12_acc_cbse_04_003 (Realisation Account) and c12_acc_cbse_04_007 (Settlement.',
          misconception: 'Students often think Garner v Murray means the deficiency is shared in the CAPITAL RATIO of solvent partners.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Garner v Murray rule is a legal principle applied during the dissolution of a',
                  options: ['The Garner v Murray rule is a legal principle applied during the dissolution of a', 'Dissolution of partnership refers to a change in the partnership agreement (such as', 'Modes of dissolution of a partnership firm refer to the legally recognised ways in', 'A Realisation Account is a temporary nominal account prepared during the dissolution of a'],
                  hint: 'Revisit c12_acc_cbse_04_003 (Realisation Account) and c12_acc_cbse_04_007 (Settlement of Accounts).',
                  misconception: 'Students often think Garner v Murray means the deficiency is shared in the CAPITAL RATIO of solvent partners.' }
          ],
            remediations: { 'garner-v-murray-means-the': { steps: ['If the student uses capital ratio instead of profit-sharing ratio: (1) Re-read the NCERT Class 12 Partnership Accounts.', '(2) Solve 3 problems where profit-sharing ratio ≠ capital ratio (e.g., 3:2 profit, 1:1 capital).', '(3) Write the rule in own words: "On dissolution, insolvent partner\'s deficiency → solvent partners in profit-sharing.', '(4) Re-attempt Diagnostic Question 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_04_009', difficulty: 'standard',
          question: 'Preparation of Realisation Account, Partners\' Capital Accounts, and Cash/Bank.',
          hint: 'If stuck, revisit Class 11 nodes on Ledger (c11_acc_cbse_03_009, c11_acc_cbse_03_010.',
          misconception: 'Students often think that the Realisation Account and the Revaluation Account are the same.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Preparation of Realisation Account, Partners\' Capital Accounts, and Cash/Bank Account is',
                  options: ['Preparation of Realisation Account, Partners\' Capital Accounts, and Cash/Bank Account is', 'Dissolution of partnership refers to a change in the partnership agreement (such as', 'Modes of dissolution of a partnership firm refer to the legally recognised ways in', 'A Realisation Account is a temporary nominal account prepared during the dissolution of a'],
                  hint: 'If stuck, revisit Class 11 nodes on Ledger (c11_acc_cbse_03_009, c11_acc_cbse_03_010.',
                  misconception: 'Students often think that the Realisation Account and the Revaluation Account are the same.' }
          ],
            remediations: { 'the-realisation-account-and-the': { steps: ['If the student makes the above error, guide them to: (1) Revisit node c12_acc_cbse_04_003 (Realisation Account.', '(2) Practice a simple dissolution problem where only book values are given; have them list each asset/liability at book.', '(3) Then introduce realised values separately and compute profit/loss.', '(4) Use a diagnostic question: "A building book value ₹5,00,000 sold for ₹6,00,000.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_04_010', difficulty: 'standard',
          question: 'Journal entries for dissolution of a partnership firm are the systematic.',
          hint: 'If stuck on any entry, go back to **c11_acc_cbse_03_004** (Rules of Debit and Credit for.',
          misconception: 'Students believe that when a partner takes over an asset (recorded or unrecorded), the entry is **Realisation A/c Dr.',
          parts: [
                { id: 'a', prompt: 'State the journal entry to transfer sundry assets (excluding cash/bank) to Realisation Account at book value when a partnership firm is dissolved.', answer: 'Correct entry: Realisation A/c Dr',
                  options: ['Correct entry: Realisation A/c Dr', 'Sundry Assets A/c Dr', 'assets are "coming in" rather than being transferred out for realisation'],
                  hint: 'If stuck on any entry, go back to **c11_acc_cbse_03_004** (Rules of Debit and Credit for Assets.',
                  misconception: 'Students believe that when a partner takes over an asset (recorded or unrecorded), the entry is **Realisation A/c Dr.' }
          ],
            remediations: { 'when-a-partner-takes-over': { steps: ['Revisit node **c12_acc_cbse_04_003** (Realisation Account: Purpose, Format and Preparation) to relearn the golden rule.', 'Practice 5 asset-takeover scenarios (recorded/unrecorded, by partner/outsider) writing only the Realisation Account.', 'Re-diagnostic: Pass entry for "Partner took over unrecorded asset worth ₹8,000 at ₹6,000" and explain why Realisation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
