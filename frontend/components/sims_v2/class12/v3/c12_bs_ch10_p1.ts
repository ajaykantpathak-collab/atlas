import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch10_p1: SimDef = {
    id: 'v3_c12_bs_ch10_p1',
    title: 'Financial Markets · Part 1/2',
    subtitle: '₹500 crore for 45 days — there\'s a market built exactly for that.',
    classLevel: 12, subject: 'business_studies', topic: 'Financial Markets · Part 1/2',
    chapters: ['c12_bs_ch10'],
    nodeIds: ['c12_bs_cbse_10_001', 'c12_bs_cbse_10_002', 'c12_bs_cbse_10_003', 'c12_bs_cbse_10_004', 'c12_bs_cbse_10_005', 'c12_bs_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Treasury dealer', intro: 'Every saved rupee and every needed loan meet in one place — the financial market is that meeting ground.', goal: 'Explain the functions of financial markets and distinguish money-market instruments.' },
    discovery: {
        question: 'Tata Steel needs ₹500 crore for just 45 days to pay suppliers before export receipts land. A term loan is too slow — where does it go?',
        options: ['The money market — issuing short-term instruments like commercial paper or treasury bills', 'The capital market — issuing shares for a quick fundraise', 'A venture capital fund — they specialise in fast corporate loans', 'The stock exchange — selling its own shares intraday'],
        answer: 'The money market — issuing short-term instruments like commercial paper or treasury bills',
        hook: 'Duration decides the market — under one year it\'s the money market\'s territory: T-bills, commercial paper, call money. Students merge money and capital markets; the maturity line separates them cleanly.',
    },
    teaching: [
        { title: 'Financial Markets: Meaning, Functions and Types', text: 'A financial market is a marketplace where buyers and sellers trade financial assets such as shares, bonds, debentures, and derivatives, facilitating the transfer of funds from savers (surplus units).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Route the money: channel a saver\'s ₹50,000 to a startup that needs ₹50 lakh through the financial market\'s functions, then pick the right money-market instrument for a 45-day corporate gap.',
        labels: ['Financial Markets: Meaning, Functions', 'Money Market: Instruments (Treasury', 'Capital Market: Meaning', 'Primary Market: Methods', 'Secondary Market: Stock Exchanges', 'Stock Exchange: Functions'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_001', title: 'Financial Markets: Meaning, Functions and Types',
          caseStudy: { intro: 'Imagine you have ₹50,000 saved from your summer internship. You want it to grow but don\'t want to start a business yourself.',
            decisions: [{ prompt: 'State the definition of a financial market and name its two primary participant categories.', options: [
                { text: 'A financial market is a marketplace where financial assets are traded, enabling transfer', outcome: 'A financial market is a marketplace where financial assets are traded, enabling transfer of funds.' },
                { text: 'financial assets', outcome: 'Not quite — Students often think "financial market = stock market" and use the terms interchangeably.', reveals: 'financial-market-stock-market-and' },
                { text: 'fund transfer', outcome: 'Not quite — Students often think "financial market = stock market" and use the terms interchangeably.', reveals: 'financial-market-stock-market-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_002', title: 'Money Market: Instruments (Treasury Bills, Commercial Paper, Call Money)',
          caseStudy: { intro: 'Imagine a large Indian company like Tata Steel needs ₹500 crore for 45 days to pay suppliers before its export receipts arrive.',
            decisions: [{ prompt: 'What is the maximum maturity period for instruments traded in the money market, and which of the three instruments (T-Bill, CP, Call Money).', options: [
                { text: 'The maximum maturity in the money market is 365 days (one year)', outcome: 'The maximum maturity in the money market is 365 days (one year).' },
                { text: '5 years', outcome: 'Not quite — Students often treat T-Bills, CP, and Call Money as "the same thing — short-term loans" and.', reveals: 'students-often-treat-t-bills' },
                { text: 'T-Bill has shortest maturity', outcome: 'Not quite — Students often treat T-Bills, CP, and Call Money as "the same thing — short-term loans" and.', reveals: 'students-often-treat-t-bills' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_003', title: 'Capital Market: Meaning and Components (Primary and Secondary Market)',
          caseStudy: { intro: 'Imagine a fast-growing Indian EV startup needs ₹500 crore to build a new battery plant — it cannot borrow this entire amount from a bank (money market deals.',
            decisions: [{ prompt: 'State the one-line NCERT definition of Capital Market and name its two components.', options: [
                { text: 'Capital Market is the market for long-term funds (maturity > 1 year) consisting of', outcome: 'Capital Market is the market for long-term funds (maturity > 1 year) consisting of Primary Market.' },
                { text: 'market for shares and debentures', outcome: 'Not quite — **Misconception:** "Secondary market transactions increase the company\'s share capital." **Why.', reveals: 'misconception-secondary-market-transactions-incr' },
                { text: 'long-term funds', outcome: 'Not quite — **Misconception:** "Secondary market transactions increase the company\'s share capital." **Why.', reveals: 'misconception-secondary-market-transactions-incr' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_004', title: 'Primary Market: Methods of Floatation (IPO, Offer for Sale, Rights Issue)',
          caseStudy: { intro: 'Imagine a startup, "GreenEnergy Ltd.", needs ₹500 crore to build solar farms.',
            decisions: [{ prompt: 'State the one-line definition of an Initial Public Offer (IPO) as per the Companies Act, 2013 and SEBI ICDR Regulations.', options: [
                { text: 'Correct: An IPO is the first sale of shares by a private company to the public, resulting', outcome: 'Correct: An IPO is the first sale of shares by a private company to the public, resulting.' },
                { text: 'any public issue of shares', outcome: 'Not quite — Students believe "Rights Issue is always at a discount to market price" and "OFS price is fixed.', reveals: 'rights-issue-is-always-at' },
                { text: 'Rights Issue is always at a discount to market price', outcome: 'Not quite — Students believe "Rights Issue is always at a discount to market price" and "OFS price is fixed.', reveals: 'rights-issue-is-always-at' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_005', title: 'Secondary Market: Stock Exchanges and their Functions',
          caseStudy: { intro: 'Imagine you bought 100 shares of Reliance Industries in an IPO two years ago. Now you need money for your sister\'s wedding.',
            decisions: [{ prompt: 'State the one fundamental difference between primary market and secondary market in terms of who receives the proceeds from the sale.', options: [
                { text: 'Correct answer: In the primary market, the issuing company receives the proceeds; in the', outcome: 'Correct answer: In the primary market, the issuing company receives the proceeds; in the secondary.' },
                { text: 'primary market is for new issues, secondary is for old issues', outcome: 'Not quite — Students believe "secondary market trading helps the company raise more capital." They write: "When.', reveals: 'secondary-market-trading-helps-the' },
                { text: 'secondary market trading helps the company raise more capital', outcome: 'Not quite — Students believe "secondary market trading helps the company raise more capital." They write: "When.', reveals: 'secondary-market-trading-helps-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_006', title: 'Stock Exchange: Functions and Trading Procedure',
          caseStudy: { intro: 'Imagine you want to buy 10 shares of Reliance Industries today — you call your broker or use a trading app, but what actually happens after you click “Buy”?',
            decisions: [{ prompt: 'State any three functions of a stock exchange as per the NCERT Class 12 Business Studies textbook.', options: [
                { text: 'Correct answer: (1) Providing liquidity and marketability to existing securities, (2)', outcome: 'Correct answer: (1) Providing liquidity and marketability to existing securities, (2) Determining.' },
                { text: 'helping companies raise new capital', outcome: 'Not quite — Students often think “trading on a stock exchange means the company gets money when shares are.', reveals: 'trading-on-a-stock-exchange' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A manufacturer needs ₹2 crore for just six months to stock seasonal inventory. A junior analyst proposes issuing fresh equity shares to raise it.',
            decisions: [{ prompt: 'Is equity the right instrument for this need?', options: [
                { text: 'No — match maturity to need: a six-month requirement belongs to the money market (e.g., commercial paper); equity is permanent capital with no maturity, wrong tool for a short-term gap.', outcome: 'Maturity matching avoids refinancing risk and excess cost — the market offers short-term instruments precisely for short-term needs.' },
                { text: 'Yes — any security issued by a company belongs to the capital market, and equity is the most flexible.', outcome: 'Market class is set by instrument maturity, not by the issuer: short-maturity paper like CP is money market even when a company issues it.', reveals: 'issuer-decides-market-type' },
                { text: 'Yes — the financial market is the stock market, so shares are the natural route for any corporate fund-raise.', outcome: 'Financial markets span money, bond, forex and derivative markets too; \'shares for everything\' mistakes the famous slice for the whole.', reveals: 'fin-market-is-stock-market' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now route funds from savers to borrowers like the market does. Financial market functions and money-market instruments are reliable board marks — and the plumbing behind every finance headline.',
            decisions: [{ prompt: 'What comes next? Financial Markets · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Financial Markets · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_001', difficulty: 'standard',
          question: 'A financial market is a marketplace where buyers and sellers trade financial.',
          hint: 'Revisit c11_bs_cbse_08_002 (classification of sources of finance) and c11_bs_cbse_08_003.',
          misconception: 'Students often think "financial market = stock market" and use the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'Explain why "price discovery" is considered a core function of financial markets. Use the example of a newly listed company\'s shares to illustrate.', answer: 'Price discovery is the process by',
                  options: ['Price discovery is the process by', 'price discovery means the company sets the price', 'financial market = stock market', '"financial market = stock market" and use the terms interchangeably'],
                  hint: 'Revisit c11_bs_cbse_08_002 (classification of sources of finance) and c11_bs_cbse_08_003 (owners\'.',
                  misconception: 'Students often think "financial market = stock market" and use the terms interchangeably.' },
                { id: 'b', prompt: 'A company needs ₹2 crore for 6 months to finance seasonal inventory. It considers two options: (a) issue commercial paper, (b) issue equity shares.', answer: 'Commercial paper (option a) is a money market instrument',
                  options: ['Commercial paper (option a) is a money market instrument', 'companies use both for finance', 'it\'s issued by a company', 'financial market = stock market'],
                  hint: 'Revisit c11_bs_cbse_08_002 (classification of sources of finance) and c11_bs_cbse_08_003 (owners\'.',
                  misconception: 'Students often think "financial market = stock market" and use the terms interchangeably.' }
          ],
            remediations: { 'financial-market-stock-market-and': { steps: ['Ask the student to list 5 financial assets they know.', 'For each, identify: (a) issuer, (b) maturity, (c) market type.', 'Show RBI\'s weekly statistical supplement — point to "Money Market" and "Capital Market" sections with actual.', 'Have them re-write the definition including at least one debt and one equity instrument.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_002', difficulty: 'standard',
          question: 'The money market is a segment of the financial market where short-term funds.',
          hint: 'Revisit c12_bs_cbse_10_001 (Financial Markets: Meaning, Functions and Types) and.',
          misconception: 'Students often treat T-Bills, CP, and Call Money as "the same thing — short-term loans" and memorise only maturity.',
          parts: [
                { id: 'a', prompt: 'What is the maximum maturity period for instruments traded in the money market, and which of the three instruments (T-Bill, CP, Call Money) typically has the.', answer: 'The maximum maturity in the money market is 365 days (one year)',
                  options: ['The maximum maturity in the money market is 365 days (one year)', '5 years', 'T-Bill has shortest maturity', 'which instrument has the lowest yield?'],
                  hint: 'Revisit c12_bs_cbse_10_001 (Financial Markets: Meaning, Functions and Types) and.',
                  misconception: 'Students often treat T-Bills, CP, and Call Money as "the same thing — short-term loans" and memorise only maturity periods.' },
                { id: 'b', prompt: 'A company issues Commercial Paper with a face value of ₹10 crore at a discount of 8% per annum for 90 days. The company receives ₹9.8 crore. Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'correct', 'which instrument has the lowest yield?', 'why does CP require a credit rating but T-Bill does not?'],
                  hint: 'Revisit c12_bs_cbse_10_001 (Financial Markets: Meaning, Functions and Types) and.',
                  misconception: 'Students often treat T-Bills, CP, and Call Money as "the same thing — short-term loans" and memorise only maturity periods.' }
          ],
            remediations: { 'students-often-treat-t-bills': { steps: ['Revisit the distinction between *issuer* (Government vs Corporate vs Bank) and *credit risk* using a 3-column table.', 'Practice the T-Bill yield calculation: Yield = (Face Value - Issue Price) / Issue Price × (365 / Days to Maturity).', 'Read the RBI FAQ on Commercial Paper (available on RBI website) focusing on eligibility (net worth, rating, working.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, watch a 10-minute video on "Money Market Instruments — T-Bill.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat T-Bills, CP, and Call Money as "the same thing — short-term loans" and memorise only maturity.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "Call Money is the most expensive source of short-term funds for a bank." Defend or refute with reasoning.', answer: 'Refute',
                  options: ['Refute', 'which instrument has the lowest yield?', 'why does CP require a credit rating but T-Bill does not?'],
                  hint: 'Revisit c12_bs_cbse_10_001 (Financial Markets: Meaning, Functions and Types) and.',
                  misconception: 'Students often treat T-Bills, CP, and Call Money as "the same thing — short-term loans" and memorise only maturity periods.' },
                { id: 'b', prompt: 'Design a hypothetical scenario where a mutual fund manager would choose a 91-day T-Bill over a 90-day CP of a AAA-rated company, even if the CP offers a 0.25%.', answer: 'Scenario: The fund has a large redemption pressure expected in 60 days and needs',
                  options: ['Scenario: The fund has a large redemption pressure expected in 60 days and needs', 'which instrument has the lowest yield?', 'why does CP require a credit rating but T-Bill does not?'],
                  hint: 'Revisit c12_bs_cbse_10_001 (Financial Markets: Meaning, Functions and Types) and.',
                  misconception: 'Students often treat T-Bills, CP, and Call Money as "the same thing — short-term loans" and memorise only maturity periods.' }
          ],
            remediations: { 'students-often-treat-t-bills': { steps: ['Revisit the distinction between *issuer* (Government vs Corporate vs Bank) and *credit risk* using a 3-column table.', 'Practice the T-Bill yield calculation: Yield = (Face Value - Issue Price) / Issue Price × (365 / Days to Maturity).', 'Read the RBI FAQ on Commercial Paper (available on RBI website) focusing on eligibility (net worth, rating, working.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, watch a 10-minute video on "Money Market Instruments — T-Bill.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_003', difficulty: 'standard',
          question: 'Capital Market refers to the institutional arrangement for borrowing and.',
          hint: 'If confused about the 1-year boundary, revisit c12_bs_cbse_10_002 (Money Market.',
          misconception: '**Misconception:** "Secondary market transactions increase the company\'s share capital." **Why students make this.',
          parts: [
                { id: 'a', prompt: 'A company issues bonus shares to existing shareholders. Is this a primary market or secondary market transaction? Justify your answer in two sentences.', answer: 'Bonus issue is a **primary market** transaction',
                  options: ['Bonus issue is a **primary market** transaction', 'secondary market', 'primary'],
                  hint: 'If confused about the 1-year boundary, revisit c12_bs_cbse_10_002 (Money Market instruments) and.',
                  misconception: '**Misconception:** "Secondary market transactions increase the company\'s share capital." **Why students make this error:** They see the.' },
                { id: 'b', prompt: 'An investor buys 100 shares of Reliance Industries on NSE at ₹2,500 per share. The next day, Reliance announces a new factory.', answer: 'No, Reliance receives **zero** money',
                  options: ['No, Reliance receives **zero** money', 'company gets money'],
                  hint: 'If confused about the 1-year boundary, revisit c12_bs_cbse_10_002 (Money Market instruments) and.',
                  misconception: '**Misconception:** "Secondary market transactions increase the company\'s share capital." **Why students make this error:** They see the.' }
          ],
            remediations: { 'misconception-secondary-market-transactions-incr': { steps: ['Revisit **c12_bs_cbse_10_001** (Financial Markets: Meaning, Functions and Types) — specifically the "Capital Market.', 'Re-do the diagnostic: "List two differences between Capital and Money Market based on maturity and instruments." 2.', 'Watch a 5-minute video of a live NSE trading screen — observe that buy/sell orders are matched between *clients*, not.', 'Practice the "Who gets the money?" test on 5 scenarios: (a) IPO, (b) FPO, (c) Bonus issue, (d) NSE trade, (e) Buyback.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_004', difficulty: 'standard',
          question: 'The primary market is the segment of the capital market where new securities.',
          hint: 'If dilution math is shaky, revisit **c11_bs_cbse_08_004** (Equity Shares) and practice.',
          misconception: 'Students believe "Rights Issue is always at a discount to market price" and "OFS price is fixed by SEBI".',
          parts: [
                { id: 'a', prompt: 'GreenEnergy Ltd. (unlisted) has 1 crore shares of ₹10 face value. It plans an IPO of 20 lakh fresh shares at ₹500 per share.', answer: 'Step 1: Pre-IPO shares = 1,00,00,000',
                  options: ['Step 1: Pre-IPO shares = 1,00,00,000', 'Rights Issue is always at a discount to market price', 'OFS price is fixed by SEBI'],
                  hint: 'If dilution math is shaky, revisit **c11_bs_cbse_08_004** (Equity Shares) and practice: "Company.',
                  misconception: 'Students believe "Rights Issue is always at a discount to market price" and "OFS price is fixed by SEBI".' },
                { id: 'b', prompt: 'Compare IPO and Rights Issue on these four dimensions: (i) Regulatory approval timeline, (ii) Cost of issuance, (iii) Investor base, (iv) Certainty of capital.', answer: 'Correct comparison: (i) IPO: SEBI approval + 6-12 months',
                  options: ['Correct comparison: (i) IPO: SEBI approval + 6-12 months', 'larger capital', 'biggest', 'Rights Issue is always at a discount to market price'],
                  hint: 'If dilution math is shaky, revisit **c11_bs_cbse_08_004** (Equity Shares) and practice: "Company.',
                  misconception: 'Students believe "Rights Issue is always at a discount to market price" and "OFS price is fixed by SEBI".' }
          ],
            remediations: { 'rights-issue-is-always-at': { steps: ['Revisit **c11_bs_cbse_08_004** (Equity Shares) to clarify *face value vs issue price* and *fresh issue vs transfer*.', 'Revisit **c11_bs_cbse_07_007** (Capital Subscription: Prospectus) to understand *listing requirements* and *minimum.', 'Re-do **Diagnostic Question 3** with a new set of numbers, forcing step-by-step: (a) identify fresh vs existing shares.', 'If dilution % is still wrong, draw a *shareholding pie chart* pre- and post-issue for each method — visualising the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_005', difficulty: 'standard',
          question: 'The secondary market is a financial market where previously issued securities.',
          hint: 'Revisit c12_bs_cbse_10_004 (Primary Market) and trace the money flow: Investor -> Company.',
          misconception: 'Students believe "secondary market trading helps the company raise more capital." They write: "When share price rises.',
          parts: [
                { id: 'a', prompt: 'A company\'s shares are listed on both BSE and NSE. On a particular day, the share price on BSE is ₹2,450 and on NSE is ₹2,455. An arbitrageur notices this.', answer: 'Correct steps: (1) Buy shares on BSE at ₹2,450',
                  options: ['Correct steps: (1) Buy shares on BSE at ₹2,450', 'law of one price', 'secondary market trading helps the company raise more capital', 'When share price rises on NSE, the company gets more money'],
                  hint: 'Revisit c12_bs_cbse_10_004 (Primary Market) and trace the money flow: Investor -> Company (IPO) ->.',
                  misconception: 'Students believe "secondary market trading helps the company raise more capital." They write: "When share price rises on NSE, the company.' }
          ],
            remediations: { 'secondary-market-trading-helps-the': { steps: ['Revisit c12_bs_cbse_10_003 (Capital Market components) and c12_bs_cbse_10_004 (Primary Market) to reinforce that.', 'Draw a T-account: Company\'s Balance Sheet (Share Capital ₹100 Cr) vs Market Cap (₹500 Cr).', 'Practice 3 board-style questions: "Distinguish between market capitalisation and paid-up capital", "Explain how.', 'Re-diagnose with a fresh question: "A company has 1 crore shares, face value ₹10, market price ₹500.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_006', difficulty: 'standard',
          question: 'A stock exchange is an organized marketplace where securities (shares, bonds.',
          hint: 'Revisit node c12_bs_cbse_10_004 (Primary Market) and c12_bs_cbse_10_005 (Secondary.',
          misconception: 'Students often think “trading on a stock exchange means the company gets money when shares are bought/sold.”.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the settlement cycle in India is T+1 and not T+0 or T+2.', answer: 'Correct explanation: T+1 balances operational efficiency with risk management',
                  options: ['Correct explanation: T+1 balances operational efficiency with risk management', 'T+1 is faster so it’s better'],
                  hint: 'Revisit node c12_bs_cbse_10_004 (Primary Market) and c12_bs_cbse_10_005 (Secondary Market) and make.',
                  misconception: 'Students often think “trading on a stock exchange means the company gets money when shares are bought/sold.” In reality, the company.' },
                { id: 'b', prompt: 'An investor places a limit buy order for 50 shares of Tata Motors at ₹800 when the current market price is ₹805. The order remains unexecuted at day‑end.', answer: 'The order lapses at the end of the trading session',
                  options: ['The order lapses at the end of the trading session', 'the order stays active until executed'],
                  hint: 'Revisit node c12_bs_cbse_10_004 (Primary Market) and c12_bs_cbse_10_005 (Secondary Market) and make.',
                  misconception: 'Students often think “trading on a stock exchange means the company gets money when shares are bought/sold.” In reality, the company.' }
          ],
            remediations: { 'trading-on-a-stock-exchange': { steps: ['If the student confuses primary vs secondary market cash flows: (1) Re‑read node c12_bs_cbse_10_004 (Primary Market.', '(4) Re‑attempt Diagnostic Question 5 and create a similar case: “Ram buys 10 shares of X Ltd in IPO vs.', 'Ram buys 10 shares of X Ltd on NSE — who receives the money in each case?”'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
