import type { SimDef } from '../../engine/types';
import C12_CommerceBonusIssueRightsSim from '../../../simulations/c6_12/C12_CommerceBonusIssueRightsSim';

/** v3 wrapped master — C12_CommerceBonusIssueRightsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_commercebonusissuerightssim: SimDef = {
    id: 'v3w_c12_commercebonusissuerightssim',
    title: 'Capital Market: Meaning and Components (Primary and Secondary Market)',
    subtitle: 'This node covers: meaning of capital market, its two components (primary and secondary.',
    classLevel: 12, subject: 'business_studies', topic: 'Capital Market: Meaning and Components (Primary and Secondary Market)',
    chapters: [],
    nodeIds: ['c12_bs_cbse_10_003', 'c12_bs_cbse_10_004', 'c12_bs_cbse_10_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a fast-growing Indian EV startup needs ₹500 crore to build a new battery plant — it cannot borrow.', goal: 'Master Capital Market: Meaning and Components (Primary and Secondary Market).' },
    discovery: {
        question: 'A company issues bonus shares to existing shareholders. Is this a primary market or secondary market transaction? Justify your answer in two sentences.',
        options: ['Bonus issue is a **primary market** transaction', 'secondary market', 'primary'],
        answer: 'Bonus issue is a **primary market** transaction',
        hook: '**Misconception:** "Secondary market transactions increase the company\'s share capital." **Why students make this.',
    },
    teaching: [
        { title: 'Capital Market refers to the institutional.', text: 'Capital Market refers to the institutional arrangement for borrowing and lending long-term funds (typically above one year) through financial instruments like equity shares, preference shares,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bs_cbse_10_003', title: 'Capital Market refers to the.',
          scaffold: { problem: 'GreenEnergy Ltd wants to set up a 200 MW solar park requiring ₹1,200 crore.',
            steps: [
            { text: 'Identify that both transactions are primary market because securities are issued for the first time directly by the.' },
            { text: 'Calculate equity funds: Number of shares × Issue price = 5,00,00,000 × (₹10 + ₹230) = 5,00,00,000 × ₹240 = ₹1,200 crore.' },
            { text: 'Calculate debenture funds: Number of debentures × Face value = 2,000 × ₹10,00,000 = ₹200 crore.' },
            { text: 'Total primary market funds = ₹1,200 crore + ₹200 crore = ₹1,400 crore.' },
            { text: 'Classify instruments: Equity shares → Primary Market (equity segment); Debentures → Primary Market (debt segment).', faded: true, blankAnswer: 'Total funds raised = ₹1,400 crore. Equity shares and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_10_004', title: 'The primary market is the segment of.',
          scaffold: { problem: 'TechNova Ltd. (unlisted) has 2 crore equity shares of ₹10 face value. Promoters hold 75%.',
            steps: [
            { text: 'Identify components — Fresh issue (50L shares) = money to company; OFS component (25L shares) = money to promoters.' },
            { text: '(a) Company funds = 50,00,000 × ₹400 = ₹2,000 crore.' },
            { text: '(b) Promoter funds = 25,00,000 × ₹400 = ₹1,000 crore.' },
            { text: '(c) Post-IPO shares = 2,00,00,000 + 50,00,000 = 2,50,00,000; paid-up capital = 2,50,00,000 × ₹10 = ₹25 crore.' },
            { text: '(d) Promoter pre-IPO shares = 75% of 2 crore = 1.5 crore. They sold 25L in OFS → remaining = 1.25 crore.' },
            { text: '(e) Public holds: 50L (fresh) + 25L (OFS) = 75L shares → 75,00,000 / 2,50,00,000 = 30%.', faded: true, blankAnswer: '(a) ₹2,000 crore, (b) ₹1,000 crore, (c) ₹25 crore, (d) 50%,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_10_008', title: 'A depository system is an electronic.',
          scaffold: { problem: 'Mr. Sharma holds 200 physical equity shares of Infosys Ltd. (face value ₹5) in certificate numbers INF12345 to INF12544.',
            steps: [
            { text: 'Mr. Sharma opens a Demat account with a DP (e.g., his bank) if he doesn\'t have one.' },
            { text: 'He fills a Dematerialisation Request Form (DRF) in triplicate, surrenders the physical certificates (with "Surrendered.' },
            { text: 'The DP verifies the certificates and DRF, assigns a Dematerialisation Request Number (DRN), and forwards the physical.' },
            { text: 'The RTA verifies the certificates against the company\'s register of members.' },
            { text: 'The depository credits 200 electronic shares to Mr. Sharma\'s Demat account (via the DP). The DP informs Mr. Sharma.' },
            { text: 'Timeline: Typically 15-21 days from DRF submission to credit. Once credited, shares are available for trading on T day,.', faded: true, blankAnswer: 'Process completed in 6 steps over 15-21 days; shares.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bs_cbse_10_004', title: 'Identify each idea',
          dissect: { specimen: 'Capital Market: Meaning and Components (Primary and Secondary Market)', spots: [
            { id: 's1', label: 'Capital Market refers to the', prompt: 'Which idea is this? — Capital Market refers to the institutional arrangement for borrowing and lending.', answer: 'Capital Market refers to the', options: ['Capital Market refers to the', 'The primary market is the', 'A depository system is an'] },
            { id: 's2', label: 'The primary market is the', prompt: 'Which idea is this? — The primary market is the segment of the capital market where new securities (equity.', answer: 'The primary market is the', options: ['The primary market is the', 'Capital Market refers to the', 'A depository system is an'] },
            { id: 's3', label: 'A depository system is an', prompt: 'Which idea is this? — A depository system is an electronic infrastructure that holds securities (shares, bonds,.', answer: 'A depository system is an', options: ['A depository system is an', 'Capital Market refers to the', 'The primary market is the'] }
          ] } }
    ],
    explore: { component: C12_CommerceBonusIssueRightsSim, prompt: 'Explore the interactive — Capital Market: Meaning and Components (Primary and Secondary Market)' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_003', difficulty: 'standard',
          question: 'Capital Market refers to the institutional arrangement for borrowing and.',
          hint: 'If confused about the 1-year boundary, revisit c12_bs_cbse_10_002 (Money Market.',
          misconception: '**Misconception:** "Secondary market transactions increase the company\'s share capital." **Why students make this.',
          parts: [
                { id: 'a', prompt: 'A company issues bonus shares to existing shareholders. Is this a primary market or secondary market transaction? Justify your answer in two sentences.', answer: 'Bonus issue is a **primary market** transaction',
                  options: ['Bonus issue is a **primary market** transaction', 'secondary market', 'primary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Secondary market transactions increase the company\'s share capital." **Why students make this error:** They see the.' },
                { id: 'b', prompt: 'An investor buys 100 shares of Reliance Industries on NSE at ₹2,500 per share. The next day, Reliance announces a new factory.', answer: 'No, Reliance receives **zero** money',
                  options: ['No, Reliance receives **zero** money', 'company gets money'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Secondary market transactions increase the company\'s share capital." **Why students make this error:** They see the.' }
          ],
            remediations: { 'misconception-secondary-market-transactions-incr': { steps: ['Revisit **c12_bs_cbse_10_001** (Financial Markets: Meaning, Functions and Types) — specifically the "Capital Market vs.', 'Re-do the diagnostic: "List two differences between Capital and Money Market based on maturity and instruments." 2.', 'Watch a 5-minute video of a live NSE trading screen — observe that buy/sell orders are matched between *clients*, not.', 'Practice the "Who gets the money?" test on 5 scenarios: (a) IPO, (b) FPO, (c) Bonus issue, (d) NSE trade, (e) Buyback.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_004', difficulty: 'standard',
          question: 'The primary market is the segment of the capital market where new securities.',
          hint: 'If dilution math is shaky, revisit **c11_bs_cbse_08_004** (Equity Shares) and practice:.',
          misconception: 'Students believe "Rights Issue is always at a discount to market price" and "OFS price is fixed by SEBI".',
          parts: [
                { id: 'a', prompt: 'GreenEnergy Ltd. (unlisted) has 1 crore shares of ₹10 face value. It plans an IPO of 20 lakh fresh shares at ₹500 per share.', answer: 'Step 1: Pre-IPO shares = 1,00,00,000',
                  options: ['Step 1: Pre-IPO shares = 1,00,00,000', 'Rights Issue is always at a discount to market price', 'OFS price is fixed by SEBI'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Rights Issue is always at a discount to market price" and "OFS price is fixed by SEBI".' },
                { id: 'b', prompt: 'Compare IPO and Rights Issue on these four dimensions: (i) Regulatory approval timeline, (ii) Cost of issuance, (iii) Investor base, (iv) Certainty of capital.', answer: 'Correct comparison: (i) IPO: SEBI approval + 6-12 months',
                  options: ['Correct comparison: (i) IPO: SEBI approval + 6-12 months', 'larger capital', 'biggest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Rights Issue is always at a discount to market price" and "OFS price is fixed by SEBI".' }
          ],
            remediations: { 'rights-issue-is-always-at': { steps: ['Revisit **c11_bs_cbse_08_004** (Equity Shares) to clarify *face value vs issue price* and *fresh issue vs transfer*.', 'Revisit **c11_bs_cbse_07_007** (Capital Subscription: Prospectus) to understand *listing requirements* and *minimum.', 'Re-do **Diagnostic Question 3** with a new set of numbers, forcing step-by-step: (a) identify fresh vs existing shares,.', 'If dilution % is still wrong, draw a *shareholding pie chart* pre- and post-issue for each method — visualising the.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Rights Issue is always at a discount to market price" and "OFS price is fixed by SEBI".',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "An Offer for Sale (OFS) is always better than an IPO for promoters who want to exit because it avoids dilution of earnings per share.', answer: 'The statement is **partially correct but misleading**',
                  options: ['The statement is **partially correct but misleading**', 'Rights Issue is always at a discount to market price', 'OFS price is fixed by SEBI'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Rights Issue is always at a discount to market price" and "OFS price is fixed by SEBI".' },
                { id: 'b', prompt: 'Compare IPO and Rights Issue on these four dimensions: (i) Regulatory approval timeline, (ii) Cost of issuance, (iii) Investor base, (iv) Certainty of capital.', answer: 'Correct comparison: (i) IPO: SEBI approval + 6-12 months',
                  options: ['Correct comparison: (i) IPO: SEBI approval + 6-12 months', 'larger capital', 'biggest', 'Rights Issue is always at a discount to market price'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Rights Issue is always at a discount to market price" and "OFS price is fixed by SEBI".' }
          ],
            remediations: { 'rights-issue-is-always-at': { steps: ['Revisit **c11_bs_cbse_08_004** (Equity Shares) to clarify *face value vs issue price* and *fresh issue vs transfer*.', 'Revisit **c11_bs_cbse_07_007** (Capital Subscription: Prospectus) to understand *listing requirements* and *minimum.', 'Re-do **Diagnostic Question 3** with a new set of numbers, forcing step-by-step: (a) identify fresh vs existing shares,.', 'If dilution % is still wrong, draw a *shareholding pie chart* pre- and post-issue for each method — visualising the.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_008', difficulty: 'standard',
          question: 'A depository system is an electronic infrastructure that holds securities.',
          hint: 'Revisit c12_bs_cbse_10_006 (trading procedure) and c12_bs_cbse_10_007 (SEBI\'s role) to.',
          misconception: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1" or.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast: Demat account vs. Trading account vs. Bank account. Which account is debited/credited when you buy shares on the NSE?', answer: '- Demat account: holds securities (electronic storage)',
                  options: ['- Demat account: holds securities (electronic storage)', 'trading account holds shares', 'bank account receives shares'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1" or "3-in-1" account opening.' }
          ],
            remediations: { 'a-demat-account-and-a': { steps: ['If the student conflates Demat and trading accounts: (1) Have them list three transactions that happen *only* in the.', '(2) Ask them to trace a buy order: "Where is the money deducted?', 'Where do shares appear?" (3) Re-diagnose with DIAGNOSTIC_QUESTION_4.', 'If they confuse DP with depository: (1) Show the NSDL/CDSL website list of registered DPs.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1" or.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Dematerialisation has eliminated all risks associated with holding securities." Support your answer with two specific risks that.', answer: 'The statement is false',
                  options: ['The statement is false', '2-in-1', '3-in-1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1" or "3-in-1" account opening.' },
                { id: 'b', prompt: 'Compare and contrast: Demat account vs. Trading account vs. Bank account. Which account is debited/credited when you buy shares on the NSE?', answer: '- Demat account: holds securities (electronic storage)',
                  options: ['- Demat account: holds securities (electronic storage)', 'trading account holds shares', 'bank account receives shares', '2-in-1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1" or "3-in-1" account opening.' }
          ],
            remediations: { 'a-demat-account-and-a': { steps: ['If the student conflates Demat and trading accounts: (1) Have them list three transactions that happen *only* in the.', '(2) Ask them to trace a buy order: "Where is the money deducted?', 'Where do shares appear?" (3) Re-diagnose with DIAGNOSTIC_QUESTION_4.', 'If they confuse DP with depository: (1) Show the NSDL/CDSL website list of registered DPs.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
