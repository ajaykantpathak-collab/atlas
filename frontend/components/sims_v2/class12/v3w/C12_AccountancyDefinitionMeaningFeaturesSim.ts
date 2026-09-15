import type { SimDef } from '../../engine/types';
import C12_AccountancyDefinitionMeaningFeaturesSim from '../../../simulations/c6_12/C12_AccountancyDefinitionMeaningFeaturesSim';

/** v3 wrapped master — C12_AccountancyDefinitionMeaningFeaturesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_accountancydefinitionmeaningfeaturessim: SimDef = {
    id: 'v3w_c12_accountancydefinitionmeaningfeaturessim',
    title: 'Definition Meaning Features',
    subtitle: 'This node covers the legal definition of partnership under the Indian Partnership Act,.',
    classLevel: 12, subject: 'accountancy', topic: 'Partnership: Definition and Essential Features under the Act',
    chapters: [],
    nodeIds: ['c12_acc_cbse_01_001', 'c12_acc_cbse_05_001', 'c12_acc_cbse_06_001', 'c12_acc_cbse_07_001', 'c12_acc_cbse_09_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine two friends, Rohan and Sohan, start a food truck business.', goal: 'Master Definition Meaning Features.' },
    discovery: {
        question: 'Rahul and Priya jointly own a building and rent it out, sharing the rental income equally. They have no agreement to carry on any business.',
        options: ['No, it is not a partnership', 'profit-sharing alone creates partnership, ignoring the business requirement', 'sharing profits automatically means a partnership exists'],
        answer: 'No, it is not a partnership',
        hook: 'Students often believe that sharing profits automatically means a partnership exists.',
    },
    teaching: [
        { title: 'Partnership is a relation between two or.', text: 'Partnership is a relation between two or more persons who have agreed to share the profits of a business carried on by all or any of them acting for all, as defined under Section 4 of the Indian.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_acc_cbse_01_001', title: 'Partnership is a relation between two.',
          scaffold: { problem: 'Three friends — Amit, Bina, and Chirag — decide to start a consulting firm.',
            steps: [
            { text: 'Check for agreement — yes, a written agreement exists (oral or written both valid).' },
            { text: 'Check for business — yes, consulting is a business activity carried on with continuity.' },
            { text: 'Check for profit-sharing — yes, agreed ratio 3:2:1.' },
            { text: 'Check for mutual agency — yes, each partner can act for the firm; Amit manages, Bina brings clients, Chirag may not.' },
            { text: 'Check for unlimited liability — yes, all partners have unlimited joint and several liability by default.' },
            { text: 'Check for separate legal entity — no, the firm has no separate legal existence; registration is optional and does not.' },
            { text: 'Conclude — all six features present, so partnership exists.', faded: true, blankAnswer: 'Yes, a partnership exists.' }
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
        { type: 'scaffold', nodeId: 'c12_acc_cbse_06_001', title: 'A debenture is a written instrument.',
          scaffold: { problem: '"GreenPower Ltd. proposes to issue 10,000 debentures of ₹100 each.',
            steps: [
            { text: 'Identify given data for each structure: Face value = ₹100, Quantity = 10,000, Total face value = ₹10,00,000.' },
            { text: 'Structure A (Fixed coupon): Annual interest = 8% × ₹10,00,000 = ₹80,000. Over 5 years = ₹4,00,000.' },
            { text: 'Structure B (Convertible): Annual interest = 7% × ₹10,00,000 = ₹70,000 for 3 years = ₹2,10,000.' },
            { text: 'Structure C (Zero Coupon): No annual interest. Issue proceeds = 10,000 × ₹600 = ₹60,00,000.' },
            { text: 'Compare: Structure A has highest annual cash cost but lowest total cost.', faded: true, blankAnswer: 'Structure A: Interest cost ₹4L, Annual ₹80k + ₹10L at yr5,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_07_001', title: 'Financial Statements of a Company are.',
          scaffold: { problem: 'Greenfield Ltd. is a public company incorporated on 1st April 2023.',
            steps: [
            { text: 'Identify the legal requirement — Section 129(1) of Companies Act, 2013 mandates compliance with Schedule III.' },
            { text: 'Recall Schedule III prescribes a *vertical format* with specific line items and order: Equity and Liabilities.' },
            { text: 'Note that "Capital" is not a permitted line item; Share Capital must be shown separately (Authorised, Issued,.' },
            { text: 'Reserves & Surplus must be broken into: Capital Reserve, Securities Premium, Other Reserves (specify nature), Surplus.' },
            { text: 'Current/Non-current classification of *all* assets and liabilities is mandatory — not optional.', faded: true, blankAnswer: 'The draft violates Schedule III because: (1) Uses.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_acc_cbse_09_001', title: 'A Cash Flow Statement is a financial.',
          scaffold: { problem: 'Classify the following transactions for a TEXTILE MANUFACTURING COMPANY (non-financial enterprise) as per AS-3: (1) Cash sales of fabric.',
            steps: [
            { text: 'Identify the enterprise type — textile manufacturing = non-financial enterprise.' },
            { text: 'Recall AS-3 classification rules for non-financial enterprises: Operating = core business; Investing = long-term.' },
            { text: 'Classify each: (1) Operating inflow (core revenue), (2) Investing outflow (fixed asset), (3) Financing inflow.' },
            { text: 'Verify no transaction is missed and classification matches AS-3 rules.' },
            { text: 'Present in a table for clarity.', faded: true, blankAnswer: '(1) Operating Inflow, (2) Investing Outflow, (3) Financing.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_acc_cbse_05_001', title: 'Identify each idea',
          dissect: { specimen: 'Definition Meaning Features', spots: [
            { id: 's1', label: 'Partnership is a relation between', prompt: 'Which idea is this? — Partnership is a relation between two or more persons who have agreed to share the.', answer: 'Partnership is a relation between', options: ['Partnership is a relation between', 'A share is a unit', 'A debenture is a written', 'Financial Statements of a Company'] },
            { id: 's2', label: 'A share is a unit', prompt: 'Which idea is this? — A share is a unit of ownership in a company that entitles the holder to a proportionate.', answer: 'A share is a unit', options: ['A share is a unit', 'Partnership is a relation between', 'A debenture is a written', 'Financial Statements of a Company'] },
            { id: 's3', label: 'A debenture is a written', prompt: 'Which idea is this? — A debenture is a written instrument acknowledging a debt under the common seal of a.', answer: 'A debenture is a written', options: ['A debenture is a written', 'Partnership is a relation between', 'A share is a unit', 'Financial Statements of a Company'] },
            { id: 's4', label: 'Financial Statements of a Company', prompt: 'Which idea is this? — Financial Statements of a Company are the formal, structured summaries of a company\'s.', answer: 'Financial Statements of a Company', options: ['Financial Statements of a Company', 'Partnership is a relation between', 'A share is a unit', 'A debenture is a written'] },
            { id: 's5', label: 'A Cash Flow Statement is', prompt: 'Which idea is this? — A Cash Flow Statement is a financial statement prepared as per Accounting Standard-3.', answer: 'A Cash Flow Statement is', options: ['A Cash Flow Statement is', 'Partnership is a relation between', 'A share is a unit', 'A debenture is a written'] }
          ] } }
    ],
    explore: { component: C12_AccountancyDefinitionMeaningFeaturesSim, prompt: 'Explore the interactive — Definition Meaning Features' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_001', difficulty: 'standard',
          question: 'Partnership is a relation between two or more persons who have agreed to share.',
          hint: 'If stuck, revisit Class 11 Business Studies Chapter 2 (Forms of Business Organisation),.',
          misconception: 'Students often believe that sharing profits automatically means a partnership exists.',
          parts: [
                { id: 'a', prompt: 'Rahul and Priya jointly own a building and rent it out, sharing the rental income equally. They have no agreement to carry on any business.', answer: 'No, it is not a partnership',
                  options: ['No, it is not a partnership', 'profit-sharing alone creates partnership, ignoring the business requirement', 'sharing profits automatically means a partnership exists'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that sharing profits automatically means a partnership exists.' },
                { id: 'b', prompt: 'Compare partnership with a Joint Hindu Family Business (HUF) on the basis of: (a) mode of creation, (b) liability of members, (c) mutual agency, (d).', answer: 'mode of creation, (',
                  options: ['mode of creation, (', 'sharing profits automatically means a partnership exists'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that sharing profits automatically means a partnership exists.' }
          ],
            remediations: { 'sharing-profits-automatically-means-a': { steps: ['If a student thinks profit-sharing alone creates partnership, do this: (1) Re-read Section 6 of the Indian Partnership.', '(2) Take three scenarios: (a) employee bonus linked to profit, (b) lender taking profit-linked interest, (c) two.', 'For each, check all six features in a table.', '(3) Ask: "Can the employee bind the firm?'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that sharing profits automatically means a partnership exists.',
          parts: [
                { id: 'a', prompt: 'Compare partnership with a Joint Hindu Family Business (HUF) on the basis of: (a) mode of creation, (b) liability of members, (c) mutual agency, (d).', answer: 'mode of creation, (',
                  options: ['mode of creation, (', 'sharing profits automatically means a partnership exists'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that sharing profits automatically means a partnership exists.' }
          ],
            remediations: { 'sharing-profits-automatically-means-a': { steps: ['If a student thinks profit-sharing alone creates partnership, do this: (1) Re-read Section 6 of the Indian Partnership.', '(2) Take three scenarios: (a) employee bonus linked to profit, (b) lender taking profit-linked interest, (c) two.', 'For each, check all six features in a table.', '(3) Ask: "Can the employee bind the firm?'] } } },
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
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_001', difficulty: 'standard',
          question: 'A debenture is a written instrument acknowledging a debt under the common seal.',
          hint: 'If stuck on classification, revisit c11_bs_cbse_08_006 (Debentures: Meaning, Types and.',
          misconception: '**Misconception**: "Secured debentures and First debentures mean the same thing — both mean the debenture has a charge.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast "Secured Debentures" vs "Unsecured Debentures" and "First Debentures" vs "Second Debentures".', answer: 'Correct analysis: The two pairs classify on DIFFERENT bases',
                  options: ['Correct analysis: The two pairs classify on DIFFERENT bases', 'secured'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Secured debentures and First debentures mean the same thing — both mean the debenture has a charge on assets." **Why.' }
          ],
            remediations: { 'misconception-secured-debentures-and-first': { steps: ['**Immediate remediation**: Draw a 2×2 matrix on paper: Rows = Security (Secured, Unsecured); Columns = Priority (First,.', 'Fill each cell with a one-line example: Secured+First = "First mortgage on factory"; Secured+Second = "Second mortgage.', '**Re-diagnostic**: Ask the student to classify these two instruments: (A) "8% Debentures secured by floating charge on.', '(B) "10% Debentures with no charge, repayable before other unsecured creditors" → Unsecured, First.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "Secured debentures and First debentures mean the same thing — both mean the debenture has a charge.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "Zero Coupon Debentures are issued at a discount and redeemed at par, so the difference is the investor\'s return.', answer: 'Critique — the statement is **incorrect** on all three counts: 1',
                  options: ['Critique — the statement is **incorrect** on all three counts: 1', 'no reinvestment risk'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Secured debentures and First debentures mean the same thing — both mean the debenture has a charge on assets." **Why.' },
                { id: 'b', prompt: 'Compare and contrast "Secured Debentures" vs "Unsecured Debentures" and "First Debentures" vs "Second Debentures".', answer: 'Correct analysis: The two pairs classify on DIFFERENT bases',
                  options: ['Correct analysis: The two pairs classify on DIFFERENT bases', 'secured'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "Secured debentures and First debentures mean the same thing — both mean the debenture has a charge on assets." **Why.' }
          ],
            remediations: { 'misconception-secured-debentures-and-first': { steps: ['**Immediate remediation**: Draw a 2×2 matrix on paper: Rows = Security (Secured, Unsecured); Columns = Priority (First,.', 'Fill each cell with a one-line example: Secured+First = "First mortgage on factory"; Secured+Second = "Second mortgage.', '**Re-diagnostic**: Ask the student to classify these two instruments: (A) "8% Debentures secured by floating charge on.', '(B) "10% Debentures with no charge, repayable before other unsecured creditors" → Unsecured, First.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_07_001', difficulty: 'standard',
          question: 'Financial Statements of a Company are the formal, structured summaries of a.',
          hint: 'If stuck, revisit **c11_acc_cbse_08_007** (Asset Classification) and.',
          misconception: 'Students often believe that **"Financial Statements of a Company = Balance Sheet + Profit & Loss Account (like in Class.',
          parts: [
                { id: 'a', prompt: 'What are the two primary financial statements mandated by Schedule III of the Companies Act, 2013 for a company, and what does each report?', answer: 'The two primary statements are: (1) Balance Sheet',
                  options: ['The two primary statements are: (1) Balance Sheet', 'Trading Account', 'Cash Flow Statement'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **"Financial Statements of a Company = Balance Sheet + Profit & Loss Account (like in Class 11), just with.' }
          ],
            remediations: { 'financial-statements-of-a-company': { steps: ['If the student holds the above misconception: 1.', '**Show side-by-side**: Place a Class 11 sole proprietorship Balance Sheet (horizontal format, no current/non-current,.', 'Ask: "What *structural* differences do you see?" 2.', '**Map to law**: Read Section 129 of Companies Act, 2013 — "Financial statements shall give a true and fair view...'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_001', difficulty: 'standard',
          question: 'A Cash Flow Statement is a financial statement prepared as per Accounting.',
          hint: 'If stuck, revisit Class 11 Financial Statements (c11_acc_cbse_08_001 to.',
          misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse.',
          parts: [
                { id: 'a', prompt: 'A company purchases machinery worth ₹10,00,000 by issuing equity shares of the same value. How is this transaction treated in the Cash Flow Statement?', answer: 'This transaction is NOT shown in the Cash Flow Statement',
                  options: ['This transaction is NOT shown in the Cash Flow Statement', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse cash equivalents with.' },
                { id: 'b', prompt: 'Classify the following for a non-financial enterprise: (a) Interest paid on debentures, (b) Dividend received on shares held as investment, (c) Cash receipts.', answer: 'Interest paid on debentures, (',
                  options: ['Interest paid on debentures, (', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse cash equivalents with.' }
          ],
            remediations: { 'cash-flow-statement-shows-profit': { steps: ['Re-read AS-3 classification rules for interest/dividend (financial vs. non-financial) from NCERT Section 6.5.4.', 'Make a 2x2 table: rows = Financial/Non-financial, columns = Interest Paid/Received, Dividend Paid/Received.', 'Practice 10 classification questions from "Test Your Understanding - I" (NCERT pg 247) — check answers against the.', 'Explain aloud why "purchase of shares by a brokerage firm" is operating but "purchase of shares by a steel company" is.'] } } },
        { type: 'subpart', nodeId: 'c12_acc_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse.',
          parts: [
                { id: 'a', prompt: 'A company reports a net profit of ₹10,00,000. During the year, trade receivables increased by ₹2,00,000, inventory decreased by ₹50,000, and trade payables.', answer: 'Cash from operations will be HIGHER than net profit by ₹50,000',
                  options: ['Cash from operations will be HIGHER than net profit by ₹50,000', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book', '"Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse cash equivalents with.' },
                { id: 'b', prompt: 'Create a realistic scenario for a "Software Development Company" where the same activity — "Purchase of shares" — could be classified as operating for one.', answer: 'Scenario: Company A is a share brokerage firm (operating activity',
                  options: ['Scenario: Company A is a share brokerage firm (operating activity', 'Cash Flow Statement shows profit', 'Cash Flow Statement is just the cash book', '"Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Cash Flow Statement shows profit" or "Cash Flow Statement is just the cash book." They confuse cash equivalents with.' }
          ],
            remediations: { 'cash-flow-statement-shows-profit': { steps: ['Re-read AS-3 classification rules for interest/dividend (financial vs. non-financial) from NCERT Section 6.5.4.', 'Make a 2x2 table: rows = Financial/Non-financial, columns = Interest Paid/Received, Dividend Paid/Received.', 'Practice 10 classification questions from "Test Your Understanding - I" (NCERT pg 247) — check answers against the.', 'Explain aloud why "purchase of shares by a brokerage firm" is operating but "purchase of shares by a steel company" is.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
