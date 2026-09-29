import type { SimDef } from '../../engine/types';
import C12_AccountancyDisclosureShareCapitalSim from '../../../simulations/c6_12/C12_AccountancyDisclosureShareCapitalSim';

/** v3 wrapped master — C12_AccountancyDisclosureShareCapitalSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_accountancydisclosuresharecapitalsim: SimDef = {
    id: 'v3w_c12_accountancydisclosuresharecapitalsim',
    title: 'Presentation of Share Capital in Balance Sheet (Schedule III, Part I)',
    subtitle: 'Covers only the presentation/disclosure requirements of Share Capital in the Balance.',
    classLevel: 12, subject: 'accountancy', topic: 'Presentation of Share Capital in Balance Sheet (Schedule III, Part I)',
    chapters: [],
    nodeIds: ['c12_acc_cbse_05_010', 'c12_acc_cbse_07_004', 'c12_acc_cbse_07_005', 'c12_acc_cbse_05_001', 'c12_acc_cbse_05_003', 'c12_acc_cbse_05_005', 'c12_acc_cbse_05_006', 'c12_acc_cbse_05_007', 'c12_acc_cbse_05_009', 'c12_acc_cbse_09_008', 'c12_acc_cbse_07_009', 'c12_acc_cbse_09_003', 'c12_acc_cbse_09_007', 'c12_acc_cbse_06_002', 'c12_acc_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are the accountant of "TechNova Ltd." which has just completed its IPO.', goal: 'Master Presentation of Share Capital in Balance Sheet (Schedule III, Part I).' },
    discovery: {
        question: 'Why does Schedule III require separate disclosure of "Subscribed and fully paid‑up" and "Subscribed but not fully paid‑up" under Subscribed Capital?',
        options: ['Schedule III demands this split', 'it\'s just for detail', 'Paid‑up Capital'],
        answer: 'Schedule III demands this split',
        hook: 'Students often think "Paid‑up Capital" in the Balance Sheet is simply "Issued Capital minus Calls in Arrears".',
    },
    teaching: [
        { title: 'Presentation of Share Capital in the Balance.', text: 'Presentation of Share Capital in the Balance Sheet as per Schedule III, Part I of the Companies Act, 2013 requires a company to disclose its share capital under "Equity and Liabilities →.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_acc_cbse_05_010', title: 'Presentation of Share Capital in the.',
          scaffold: { problem: 'Himalaya Ltd. is registered with an Authorised Capital of ₹50,00,000 divided into 5,00,000 Equity Shares of ₹10 each.',
            steps: [
            { text: 'Authorised Capital = 5,00,000 × ₹10 = ₹50,00,000.' },
            { text: 'Issued Capital = 3,00,000 × ₹10 = ₹30,00,000.' },
            { text: 'Subscribed Capital = 2,80,000 shares applied, all allotted. Of these, 2,70,000 shares fully paid (₹10), 10,000 shares.' },
            { text: 'Called‑up Capital = ₹27,80,000 (same as Subscribed because calls made = ₹8 on partly paid).' },
            { text: 'Calls in Arrears = 10,000 × ₹2 = ₹20,000.' },
            { text: 'Paid‑up Capital before forfeiture = ₹27,80,000 - ₹20,000 = ₹27,60,000.' },
            { text: 'Forfeited 5,000 shares (from the 10,000 partly paid). Amount originally paid‑up on these = 5,000 × ₹8 = ₹40,000.' },
            { text: 'Re‑issue of 5,000 forfeited shares at ₹8 does NOT change the forfeited amount added (still ₹40,000).' },
            { text: 'Total Paid‑up Capital = ₹27,60,000 + ₹40,000 = ₹28,00,000.', faded: true, blankAnswer: 'Note to Accounts – Share Capital' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_07_004', title: 'Calls in Arrears refers to the amount.',
          scaffold: { problem: 'A Ltd. issued 50,000 equity shares of ₹10 each at par, payable as ₹3 on application, ₹4 on allotment, ₹2 on first call, and ₹1 on final.',
            steps: [
            { text: 'Identify called-up capital per share = ₹3 + ₹4 + ₹2 + ₹1 = ₹10. Total called-up = 50,000 × ₹10 = ₹5,00,000.' },
            { text: 'Calculate Calls in Arrears: First call unpaid on 1,000 shares = 1,000 × ₹2 = ₹2,000.' },
            { text: 'Calculate Calls in Advance: 500 shares paid final call (₹1) early with first call. Advance = 500 × ₹1 = ₹500.' },
            { text: 'Interest on Calls in Arrears: On first call arrears (₹2,000) from 1 June 2023 to 31 March 2024 = 10 months.' },
            { text: 'Interest on Calls in Advance: On final call advance (₹500) from 1 June 2023 (when paid with first call) to 1 Dec 2023.', faded: true, blankAnswer: '(a) Calls in Arrears = ₹4,000; (b) Calls in Advance = ₹500;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_07_005', title: 'Unclaimed Dividend refers to the.',
          scaffold: { problem: 'X Ltd. declared a dividend of ₹12,00,000 on 31st March 2024. By 30th April, ₹11,40,000 was paid.',
            steps: [
            { text: 'Record declaration of dividend — debit Statement of Profit and Loss (Dividend) and credit Dividend Payable for.' },
            { text: 'Record payment of ₹11,40,000 — debit Dividend Payable and credit Bank.' },
            { text: 'Transfer unpaid balance (₹12,00,000 - ₹11,40,000 = ₹60,000) to Unpaid Dividend Account — debit Dividend Payable, credit.' },
            { text: 'Record claim of ₹30,000 — debit Unpaid Dividend Account, credit Bank.' },
            { text: 'Verify that Unpaid Dividend Account shows a credit balance of ₹30,000 (₹60,000 - ₹30,000) which remains a current.', faded: true, blankAnswer: '31.03.2024: Dr. Statement of P&L (Dividend) ₹12,00,000; Cr..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_05_001', title: 'A share is a unit of ownership in a.',
          scaffold: { problem: 'GreenTech Ltd. is incorporated with an authorised capital of ₹50,00,000 divided into 3,00,000 equity shares of ₹10 each and 2,00,000.',
            steps: [
            { text: 'Identify authorised, issued, subscribed, and called-up capital for each class.' },
            { text: 'Unissued capital = Authorised - Issued. Equity: ₹30,00,000 - ₹15,00,000 = ₹15,00,000.' },
            { text: 'Unsubscribed capital = Issued - Subscribed. Equity: ₹15,00,000 - ₹14,00,000 = ₹1,00,000.' },
            { text: 'Journal entries: (a) Bank A/c Dr. 14,00,000 To Equity Share Application A/c 14,00,000 (equity application money.' },
            { text: 'Verify that total cash received = ₹23,00,000 and share capital accounts show ₹14,00,000 (equity) + ₹9,00,000.', faded: true, blankAnswer: 'Unissued capital: Equity ₹15,00,000, Preference ₹10,00,000..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_05_003', title: 'Issue of shares at par means shares are.',
          scaffold: { problem: 'Bright Ltd. issued 20,000 equity shares of ₹10 each at par, payable ₹3 on application, ₹4 on allotment, and ₹3 on first & final call.',
            steps: [
            { text: 'Calculate total amounts per instalment: Application = 20,000 × ₹3 = ₹60,000; Allotment = 20,000 × ₹4 = ₹80,000; Call =.' },
            { text: 'On receipt of application money: Bank A/c Dr. 60,000 → Share Application A/c 60,000.' },
            { text: 'On allotment, transfer application money to Share Capital: Share Application A/c Dr. 60,000 → Share Capital A/c 60,000.' },
            { text: 'Allotment money due: Share Allotment A/c Dr. 80,000 → Share Capital A/c 80,000.' },
            { text: 'Receipt of allotment money: Bank A/c Dr. 80,000 → Share Allotment A/c 80,000.' },
            { text: 'Call money due: Share First & Final Call A/c Dr. 60,000 → Share Capital A/c 60,000.' },
            { text: 'Receipt of call money: Bank A/c Dr. 60,000 → Share First & Final Call A/c 60,000.' },
            { text: 'Balance Sheet: Share Capital = ₹2,00,000 (20,000 shares × ₹10) under "Shareholders\' Funds".', faded: true, blankAnswer: 'Journal entries as above; Balance Sheet shows Share Capital.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_05_005', title: 'Calls in Arrears refers to the amount.',
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
        { type: 'dissect', nodeId: 'c12_acc_cbse_07_004', title: 'Identify each idea',
          dissect: { specimen: 'Presentation of Share Capital in Balance Sheet (Schedule III, Part I)', spots: [
            { id: 's1', label: 'Presentation of Share Capital in', prompt: 'Which idea is this? — Presentation of Share Capital in the Balance Sheet as per Schedule III, Part I of the.', answer: 'Presentation of Share Capital in', options: ['Presentation of Share Capital in', 'Calls in Arrears refers to', 'Unclaimed Dividend refers to the', 'A share is a unit'] },
            { id: 's2', label: 'Calls in Arrears refers to', prompt: 'Which idea is this? — Calls in Arrears refers to the amount of call money not paid by shareholders by the due.', answer: 'Calls in Arrears refers to', options: ['Calls in Arrears refers to', 'Presentation of Share Capital in', 'Unclaimed Dividend refers to the', 'A share is a unit'] },
            { id: 's3', label: 'Unclaimed Dividend refers to the', prompt: 'Which idea is this? — Unclaimed Dividend refers to the dividend declared by a company that remains unpaid or.', answer: 'Unclaimed Dividend refers to the', options: ['Unclaimed Dividend refers to the', 'Presentation of Share Capital in', 'Calls in Arrears refers to', 'A share is a unit'] },
            { id: 's4', label: 'A share is a unit', prompt: 'Which idea is this? — A share is a unit of ownership in a company that entitles the holder to a proportionate.', answer: 'A share is a unit', options: ['A share is a unit', 'Presentation of Share Capital in', 'Calls in Arrears refers to', 'Unclaimed Dividend refers to the'] },
            { id: 's5', label: 'Issue of shares at par', prompt: 'Which idea is this? — Issue of shares at par means shares are issued at a price equal to their face (nominal).', answer: 'Issue of shares at par', options: ['Issue of shares at par', 'Presentation of Share Capital in', 'Calls in Arrears refers to', 'Unclaimed Dividend refers to the'] }
          ] } }
    ],
    explore: { component: C12_AccountancyDisclosureShareCapitalSim, prompt: 'Explore the interactive — Presentation of Share Capital in Balance Sheet (Schedule III, Part I)' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_010', difficulty: 'standard',
          question: 'Presentation of Share Capital in the Balance Sheet as per Schedule III, Part I.',
          hint: 'If confused about any capital category, revisit the specific sibling node:.',
          misconception: 'Students often think "Paid‑up Capital" in the Balance Sheet is simply "Issued Capital minus Calls in Arrears".',
          parts: [
                { id: 'a', prompt: 'Why does Schedule III require separate disclosure of "Subscribed and fully paid‑up" and "Subscribed but not fully paid‑up" under Subscribed Capital?', answer: 'Schedule III demands this split',
                  options: ['Schedule III demands this split', 'it\'s just for detail', 'Paid‑up Capital'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Paid‑up Capital" in the Balance Sheet is simply "Issued Capital minus Calls in Arrears".' }
          ],
            remediations: { 'paid-up-capital-in-the': { steps: ['If a student cannot correctly build the Share Capital note: 1.', 'Revisit c12_acc_cbse_05_003 (Issue at Par/Premium/Discount) to recall how issue price affects Securities Premium but.', 'Revisit c12_acc_cbse_05_005 (Calls in Arrears/Advance) to distinguish arrears (asset?', 'no, deduction from called‑up) vs advance (liability).'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Paid‑up Capital" in the Balance Sheet is simply "Issued Capital minus Calls in Arrears".',
          parts: [
                { id: 'a', prompt: 'Design a new scenario (different from the worked examples) where a company has both Equity and Preference Share Capital, with some shares issued for.', answer: 'A good answer will: 1',
                  options: ['A good answer will: 1', 'Paid‑up Capital', 'Issued Capital minus Calls in Arrears'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Paid‑up Capital" in the Balance Sheet is simply "Issued Capital minus Calls in Arrears".' }
          ],
            remediations: { 'paid-up-capital-in-the': { steps: ['If a student cannot correctly build the Share Capital note: 1.', 'Revisit c12_acc_cbse_05_003 (Issue at Par/Premium/Discount) to recall how issue price affects Securities Premium but.', 'Revisit c12_acc_cbse_05_005 (Calls in Arrears/Advance) to distinguish arrears (asset?', 'no, deduction from called‑up) vs advance (liability).'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_004', difficulty: 'standard',
          question: 'Calls in Arrears refers to the amount of call money not paid by shareholders by.',
          hint: 'Revisit c12_acc_cbse_07_002 (Balance Sheet format) and c11_bs_cbse_07_007 (Capital.',
          misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it.',
          parts: [
                { id: 'a', prompt: 'A company issued 50,000 shares of ₹10 each at par, payable as ₹3 on application, ₹3 on allotment, ₹2 on first call, and ₹2 on final call.', answer: 'Calls in Arrears = 2,000 shares × ₹2 (final call) = ₹4,000',
                  options: ['Calls in Arrears = 2,000 shares × ₹2 (final call) = ₹4,000', 'amounts due from shareholders', 'trade receivables'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it later." They also net off.' },
                { id: 'b', prompt: 'A shareholder holding 500 shares of ₹100 each paid the first and final call of ₹20 per share along with the allotment money.', answer: 'Calls in Advance = 500 shares × ₹20 = ₹10,000',
                  options: ['Calls in Advance = 500 shares × ₹20 = ₹10,000', 'amounts due from shareholders', 'trade receivables'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it later." They also net off.' },
                { id: 'c', prompt: 'X Ltd. issued 20,000 shares of ₹10 each. The amount was payable as ₹3 on application, ₹4 on allotment, and ₹3 on first and final call.', answer: 'Call money due, (',
                  options: ['Call money due, (', 'amounts due from shareholders', 'trade receivables'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it later." They also net off.' }
          ],
            remediations: { 'students-often-treat-calls-in': { steps: ['If a student shows Calls in Arrears as a Current Asset or nets it with Calls in Advance: (1) Revisit.', '(2) Use the "Shareholder\'s Claim" analogy: Unpaid call = shareholder\'s equity claim is reduced; Advance payment =.', '(3) Practice: Take a trial balance with both items and force the student to place each in the correct Schedule III line.', '(4) Re-diagnostic: Give a fresh problem with both arrears and advance and ask for the Share Capital note and Current.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it.',
          parts: [
                { id: 'a', prompt: 'A company\'s Articles of Association are silent on interest on Calls in Arrears and Calls in Advance. The company charges 10% p.a. on arrears and pays 12% p.a.', answer: 'No, it is NOT permissible',
                  options: ['No, it is NOT permissible', 'not allowed because Articles are silent', 'any rate is allowed', 'amounts due from shareholders'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it later." They also net off.' },
                { id: 'b', prompt: 'Create a realistic scenario where a company has BOTH Calls in Arrears and Calls in Advance simultaneously.', answer: 'Scenario: Y Ltd',
                  options: ['Scenario: Y Ltd', 'amounts due from shareholders', 'trade receivables'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Calls in Arrears as a Current Asset (like a receivable) because "the company will collect it later." They also net off.' }
          ],
            remediations: { 'students-often-treat-calls-in': { steps: ['If a student shows Calls in Arrears as a Current Asset or nets it with Calls in Advance: (1) Revisit.', '(2) Use the "Shareholder\'s Claim" analogy: Unpaid call = shareholder\'s equity claim is reduced; Advance payment =.', '(3) Practice: Take a trial balance with both items and force the student to place each in the correct Schedule III line.', '(4) Re-diagnostic: Give a fresh problem with both arrears and advance and ask for the Share Capital note and Current.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_005', difficulty: 'standard',
          question: 'Unclaimed Dividend refers to the dividend declared by a company that remains.',
          hint: 'If stuck, revisit **c12_acc_cbse_07_002 (Balance Sheet Format)** and **c11_bs_cbse_08_004.',
          misconception: 'Students often treat **Unclaimed Dividend as a Provision** (like Provision for Tax) and show it under \'Short-term.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Unclaimed Dividend refers to the dividend declared by a company that remains unpaid or',
                  options: ['Unclaimed Dividend refers to the dividend declared by a company that remains unpaid or', 'Presentation of Share Capital in the Balance Sheet as per Schedule III, Part I of the', 'Calls in Arrears refers to the amount of call money not paid by shareholders by the due', 'A share is a unit of ownership in a company that entitles the holder to a proportionate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat **Unclaimed Dividend as a Provision** (like Provision for Tax) and show it under \'Short-term Provisions\' because the.' }
          ],
            remediations: { 'students-often-treat-unclaimed-dividend': { steps: ['**Revisit the Schedule III format** (node c12_acc_cbse_07_002) and physically locate the two line items: \'Other Current.', '**Practice 5 journal-entry sets**: (a) declaration → payment → unpaid transfer, (b) forfeiture → reissue at discount →.', '**Do a side-by-side comparison table** with columns: \'Item\', \'Nature (Liability/Equity)\', \'Schedule III Head\',.', '**Re-attempt Diagnostic Questions 1, 2, and 5** until all are correct without notes.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_001', difficulty: 'standard',
          question: 'A share is a unit of ownership in a company that entitles the holder to a.',
          hint: 'Review Class 11 Business Studies Chapter 8 (Sources of Business Finance) nodes.',
          misconception: 'Students often think "preference shares are just like debentures because both have fixed returns." They write:.',
          parts: [
                { id: 'a', prompt: 'Explain why preference shares are considered a hybrid security, using the concepts of fixed return and ownership.', answer: 'Preference shares are hybrid',
                  options: ['Preference shares are hybrid', 'preference shares are just like debentures', 'Preference shares carry a fixed rate of interest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "preference shares are just like debentures because both have fixed returns." They write: "Preference shares carry a.' },
                { id: 'b', prompt: 'A company issues 10,000 equity shares of ₹10 each and 5,000 8% preference shares of ₹100 each.', answer: 'Preference dividend due = 5,000 × ₹100 × 8% = ₹40,000',
                  options: ['Preference dividend due = 5,000 × ₹100 × 8% = ₹40,000', 'preference shares are just like debentures', 'Preference shares carry a fixed rate of interest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "preference shares are just like debentures because both have fixed returns." They write: "Preference shares carry a.' },
                { id: 'c', prompt: 'Compare the voting rights of equity and preference shareholders under the Companies Act, 2013.', answer: 'Equity shareholders have voting rights on every resolution',
                  options: ['Equity shareholders have voting rights on every resolution', 'preference shares are just like debentures', 'Preference shares carry a fixed rate of interest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "preference shares are just like debentures because both have fixed returns." They write: "Preference shares carry a.' }
          ],
            remediations: { 'preference-shares-are-just-like': { steps: ['Revisit the definition of \'share\' vs \'debenture\' from Class 11 Business Studies (c11_bs_cbse_02_008,.', 'Create a two-column table: "Debt (Debenture)" vs "Equity (Share)" and add a third column "Preference Share" — fill each.', 'Re-attempt Diagnostic Questions 2 and 5. If still stuck, watch a 10-minute video on "Hybrid Securities" and note the.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "preference shares are just like debentures because both have fixed returns." They write:.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Issuing preference shares is always better than issuing equity shares because it does not dilute control." Consider cost of capital,.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'preference shares are just like debentures', 'Preference shares carry a fixed rate of interest', 'Preference shareholders are creditors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "preference shares are just like debentures because both have fixed returns." They write: "Preference shares carry a.' }
          ],
            remediations: { 'preference-shares-are-just-like': { steps: ['Revisit the definition of \'share\' vs \'debenture\' from Class 11 Business Studies (c11_bs_cbse_02_008,.', 'Create a two-column table: "Debt (Debenture)" vs "Equity (Share)" and add a third column "Preference Share" — fill each.', 'Re-attempt Diagnostic Questions 2 and 5. If still stuck, watch a 10-minute video on "Hybrid Securities" and note the.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_003', difficulty: 'standard',
          question: 'Issue of shares at par means shares are issued at a price equal to their face.',
          hint: 'If stuck, review Class 11 Journal entries (c11_acc_cbse_03_007) and the Accounting.',
          misconception: 'Students often think that when shares are issued at a discount, the Share Capital account is credited with the net.',
          parts: [
                { id: 'a', prompt: 'State the correct journal entry when a company issues 10,000 equity shares of ₹10 each at par, payable ₹3 on application, ₹4 on allotment, and ₹3 on first &.', answer: 'Correct entries: 1',
                  options: ['Correct entries: 1', 'capital received', 'share capital'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that when shares are issued at a discount, the Share Capital account is credited with the net amount received (issue.' },
                { id: 'b', prompt: 'A company issues 5,000 shares of ₹100 each at a premium of ₹20, payable ₹30 on application, ₹50 (including premium) on allotment, and the balance on call.', answer: 'Share Capital represents the nominal (face) value of shares issued',
                  options: ['Share Capital represents the nominal (face) value of shares issued', 'capital received', 'share capital'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that when shares are issued at a discount, the Share Capital account is credited with the net amount received (issue.' }
          ],
            remediations: { 'when-shares-are-issued-at': { steps: ['Revisit the accounting equation: Assets = Liabilities + Capital.', 'Share Capital is part of Capital (equity) and must equal number of shares × face value.', 'Review Class 11 node c11_acc_cbse_03_004 (Rules of Debit/Credit) to recall that capital accounts are credited for.', 'Practice the "face value always" rule: write 10 entries where you deliberately separate face value, premium, and.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that when shares are issued at a discount, the Share Capital account is credited with the net.',
          parts: [
                { id: 'a', prompt: 'Create a scenario where a company issues 10,000 equity shares of ₹10 each at a premium of ₹2, but the allotment money (including premium) is not fully.', answer: 'Scenario: Green Ltd',
                  options: ['Scenario: Green Ltd', 'capital received', 'share capital'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that when shares are issued at a discount, the Share Capital account is credited with the net amount received (issue.' }
          ],
            remediations: { 'when-shares-are-issued-at': { steps: ['Revisit the accounting equation: Assets = Liabilities + Capital.', 'Share Capital is part of Capital (equity) and must equal number of shares × face value.', 'Review Class 11 node c11_acc_cbse_03_004 (Rules of Debit/Credit) to recall that capital accounts are credited for.', 'Practice the "face value always" rule: write 10 entries where you deliberately separate face value, premium, and.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_005', difficulty: 'standard',
          question: 'Calls in Arrears refers to the amount of called-up share capital that.',
          hint: 'Revisit c12_acc_cbse_05_003 (Issue of Shares at Par, Premium, Discount) to understand how.',
          misconception: 'Students often think Calls in Arrears reduces Share Capital directly in the Balance Sheet.',
          parts: [
                { id: 'a', prompt: 'A company issued shares payable as ₹20 on application, ₹30 on allotment, and ₹50 on first & final call.', answer: '\'Calls in Arrears A/c\' should be debited',
                  options: ['Correct answer: \'Calls in Arrears A/c\' should be debited', 'Calls in Arrears reduces Share Capital directly in the Balance Sheet'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Calls in Arrears reduces Share Capital directly in the Balance Sheet.' },
                { id: 'b', prompt: 'A company issued 5,000 shares of ₹100 each at a premium of ₹20, payable as ₹30 on application, ₹50 on allotment (including premium), and ₹40 on first & final.', answer: 'Correct entry: Bank A/c Dr',
                  options: ['Correct entry: Bank A/c Dr', 'Calls in Arrears reduces Share Capital directly in the Balance Sheet'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Calls in Arrears reduces Share Capital directly in the Balance Sheet.' }
          ],
            remediations: { 'calls-in-arrears-reduces-share': { steps: ['If the student confuses the Balance Sheet presentation: Step 1 — Revisit c11_acc_cbse_08_006 (Balance Sheet.', 'Step 2 — Practice the two-step presentation: Note to Accounts (Share Capital) shows paid-up capital net of arrears;.', 'Step 3 — Draw a T-account for Calls in Arrears: Debit side = arrears amount + interest; Credit side = receipts from.', 'Step 4 — Re-do Diagnostic Question 4 with a fresh scenario.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_05_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Calls in Arrears reduces Share Capital directly in the Balance Sheet.',
          parts: [
                { id: 'a', prompt: 'A company\'s Articles specify interest on calls in arrears at 8% p.a. (instead of statutory 10%) and interest on calls in advance at 10% p.a.', answer: 'Correct calculation: Interest on arrears = ₹20,000 × 8% × 6/12 = ₹800 (debit',
                  options: ['Correct calculation: Interest on arrears = ₹20,000 × 8% × 6/12 = ₹800 (debit', 'Calls in Arrears reduces Share Capital directly in the Balance Sheet'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Calls in Arrears reduces Share Capital directly in the Balance Sheet.' },
                { id: 'b', prompt: 'Create a scenario where a company issues shares with three payment stages, has both calls in arrears and calls in advance from different shareholders, and the.', answer: 'A good answer will: (1) Define share issue terms (e.g., 1,000 shares ₹100 each,',
                  options: ['A good answer will: (1) Define share issue terms (e.g., 1,000 shares ₹100 each,', 'Calls in Arrears reduces Share Capital directly in the Balance Sheet'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Calls in Arrears reduces Share Capital directly in the Balance Sheet.' }
          ],
            remediations: { 'calls-in-arrears-reduces-share': { steps: ['If the student confuses the Balance Sheet presentation: Step 1 — Revisit c11_acc_cbse_08_006 (Balance Sheet.', 'Step 2 — Practice the two-step presentation: Note to Accounts (Share Capital) shows paid-up capital net of arrears;.', 'Step 3 — Draw a T-account for Calls in Arrears: Debit side = arrears amount + interest; Credit side = receipts from.', 'Step 4 — Re-do Diagnostic Question 4 with a fresh scenario.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
