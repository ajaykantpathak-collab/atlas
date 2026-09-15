import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch10_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch10_p2: SimDef = {
    id: 'v3_c12_bs_ch10_p2',
    title: 'Financial Markets · Part 2/2',
    subtitle: '₹500 crore for 45 days — there\'s a market built exactly for that.',
    classLevel: 12, subject: 'business_studies', topic: 'Financial Markets · Part 2/2',
    chapters: ['c12_bs_ch10'],
    nodeIds: ['c12_bs_cbse_10_007', 'c12_bs_cbse_10_008', 'c12_bs_cbse_10_009', 'c12_bs_cbse_10_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Treasury dealer', intro: 'Every saved rupee and every needed loan meet in one place — the financial market is that meeting ground.', goal: 'Explain the functions of financial markets and distinguish money-market instruments.' },
    discovery: {
        question: 'Tata Steel needs ₹500 crore for just 45 days to pay suppliers before export receipts land. A term loan is too slow — where does it go?',
        options: ['The money market — issuing short-term instruments like commercial paper or treasury bills', 'The capital market — issuing shares for a quick fundraise', 'A venture capital fund — they specialise in fast corporate loans', 'The stock exchange — selling its own shares intraday'],
        answer: 'The money market — issuing short-term instruments like commercial paper or treasury bills',
        hook: 'Duration decides the market — under one year it\'s the money market\'s territory: T-bills, commercial paper, call money. Students merge money and capital markets; the maturity line separates them cleanly.',
    },
    teaching: [
        { title: 'SEBI: Objectives and Functions of Securities and Exchange Board of India', text: 'SEBI (Securities and Exchange Board of India) is the statutory regulatory body established under the SEBI Act, 1992, entrusted with the twin mandate of protecting investor interests in securities and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Route the money: channel a saver\'s ₹50,000 to a startup that needs ₹50 lakh through the financial market\'s functions, then pick the right money-market instrument for a 45-day corporate gap.',
        labels: ['SEBI: Objectives and Functions', 'Depository System: Dematerialisation', 'Derivatives: Forwards, Futures', 'Distinction between Money Market'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_007', title: 'SEBI: Objectives and Functions of Securities and Exchange Board of India',
          caseStudy: { intro: 'Imagine you invested ₹50,000 in a company\'s IPO based on its prospectus claiming "guaranteed 30% returns in 6 months." Six months later, the company vanishes.',
            decisions: [{ prompt: 'State the three statutory objectives of SEBI as per Section 11 of the SEBI Act, 1992.', options: [
                { text: 'The three statutory objectives are: (1) Protection of interests of investors in', outcome: 'The three statutory objectives are: (1) Protection of interests of investors in securities, (2).' },
                { text: 'controlling stock prices', outcome: 'Not quite — Students often believe SEBI\'s "investor protection" means **guaranteeing returns or compensating.', reveals: 'sebi-s-investor-protection-means' },
                { text: 'managing mutual funds', outcome: 'Not quite — Students often believe SEBI\'s "investor protection" means **guaranteeing returns or compensating.', reveals: 'sebi-s-investor-protection-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_008', title: 'Depository System: Dematerialisation and Demat Accounts',
          caseStudy: { intro: 'Imagine you inherited physical share certificates of a company from the 1990s — paper documents that can be torn, lost, or forged.',
            decisions: [{ prompt: 'What is the primary function of a Depository Participant (DP) in the Indian depository system?', options: [
                { text: 'A Depository Participant (DP) acts as an agent of the depository (NSDL or CDSL) and', outcome: 'A Depository Participant (DP) acts as an agent of the depository (NSDL or CDSL) and provides the.' },
                { text: 'DP is the depository itself', outcome: 'Not quite — Students often think a Demat account and a trading account are the same because many brokers offer.', reveals: 'a-demat-account-and-a' },
                { text: 'DP executes trades on the stock exchange', outcome: 'Not quite — Students often think a Demat account and a trading account are the same because many brokers offer.', reveals: 'a-demat-account-and-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_009', title: 'Derivatives: Forwards, Futures and Options',
          caseStudy: { intro: 'Imagine a wheat farmer in Punjab who fears prices may drop by harvest time, and a bread factory in Delhi that fears prices may rise.',
            decisions: [{ prompt: 'What is the fundamental difference between a forward contract and a futures contract in terms of standardisation and trading venue?', options: [
                { text: 'A forward contract is a customised, bilateral agreement traded over-the-counter (OTC)', outcome: 'A forward contract is a customised, bilateral agreement traded over-the-counter (OTC) with.' },
                { text: 'forwards are exchange-traded', outcome: 'Not quite — Students often think "futures and forwards are the same thing — both fix a future price." They miss.', reveals: 'futures-and-forwards-are-the' },
                { text: 'futures and forwards are the same thing', outcome: 'Not quite — Students often think "futures and forwards are the same thing — both fix a future price." They miss.', reveals: 'futures-and-forwards-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_010', title: 'Distinction between Money Market and Capital Market',
          caseStudy: { intro: 'Imagine a startup founder, Priya, who needs ₹50 lakh for three months to fund inventory before Diwali sales, and also needs ₹5 crore to build a new factory.',
            decisions: [{ prompt: 'State the maximum maturity period for instruments traded in the money market as per RBI guidelines, and name one instrument that operates.', options: [
                { text: 'The maximum maturity is 364 days (Treasury Bills)', outcome: 'The maximum maturity is 364 days (Treasury Bills). Commercial Paper can go up to 1 year (365 days).' },
                { text: '91 days', outcome: 'Not quite — Students believe "money market = only Treasury Bills" and "capital market = only shares." They miss.', reveals: 'money-market-only-treasury-bills' },
                { text: '5 years', outcome: 'Not quite — Students believe "money market = only Treasury Bills" and "capital market = only shares." They miss.', reveals: 'money-market-only-treasury-bills' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A manufacturer needs ₹2 crore for just six months to stock seasonal inventory. A junior analyst proposes issuing fresh equity shares to raise it.',
            decisions: [{ prompt: 'Is equity the right instrument for this need?', options: [
                { text: 'No — match maturity to need: a six-month requirement belongs to the money market (e.g., commercial paper); equity is permanent capital with no maturity, wrong tool for a short-term gap.', outcome: 'Maturity matching avoids refinancing risk and excess cost — the market offers short-term instruments precisely for short-term needs.' },
                { text: 'Yes — any security issued by a company belongs to the capital market, and equity is the most flexible.', outcome: 'Market class is set by instrument maturity, not by the issuer: short-maturity paper like CP is money market even when a company issues it.', reveals: 'issuer-decides-market-type' },
                { text: 'Yes — the financial market is the stock market, so shares are the natural route for any corporate fund-raise.', outcome: 'Financial markets span money, bond, forex and derivative markets too; \'shares for everything\' mistakes the famous slice for the whole.', reveals: 'fin-market-is-stock-market' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_10_010', title: 'You made it',
          caseStudy: { intro: 'You can now route funds from savers to borrowers like the market does. Financial market functions and money-market instruments are reliable board marks — and the plumbing behind every finance headline.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_007', difficulty: 'standard',
          question: 'SEBI (Securities and Exchange Board of India) is the statutory regulatory body.',
          hint: 'Revisit **c12_bs_cbse_10_003** (Capital Market components) and **c12_bs_cbse_10_005**.',
          misconception: 'Students often believe SEBI\'s "investor protection" means **guaranteeing returns or compensating losses** — e.g., "If.',
          parts: [
                { id: 'a', prompt: 'State the three statutory objectives of SEBI as per Section 11 of the SEBI Act, 1992.', answer: 'The three statutory objectives are: (1) Protection of interests of investors in',
                  options: ['The three statutory objectives are: (1) Protection of interests of investors in', 'controlling stock prices', 'managing mutual funds', 'investor protection'],
                  hint: 'Revisit **c12_bs_cbse_10_003** (Capital Market components) and **c12_bs_cbse_10_005** (Stock.',
                  misconception: 'Students often believe SEBI\'s "investor protection" means **guaranteeing returns or compensating losses** — e.g., "If my shares fall, SEBI.' },
                { id: 'b', prompt: 'Compare SEBI\'s approach to investor protection under the *Protective* function with the Consumer Protection Act, 2019 approach.', answer: 'Difference 1: Scope',
                  options: ['Difference 1: Scope', 'both protect consumers', 'investor protection', 'If my shares fall, SEBI should pay me'],
                  hint: 'Revisit **c12_bs_cbse_10_003** (Capital Market components) and **c12_bs_cbse_10_005** (Stock.',
                  misconception: 'Students often believe SEBI\'s "investor protection" means **guaranteeing returns or compensating losses** — e.g., "If my shares fall, SEBI.' }
          ],
            remediations: { 'sebi-s-investor-protection-means': { steps: ['Have the student re-read Section 11 of the SEBI Act (bare act language) and highlight the three objectives — verbatim.', 'Give a 2x3 table (Objectives × Functions) and ask them to place 6 specific SEBI actions (ICDR, LODR, PIT, SCORES, T+1.', 'Present two mini-cases — (a) A company hides debt in IPO prospectus; (b) A broker misuses client securities — and ask.', 'If confusion persists, revisit node **c12_bs_cbse_10_005** (Secondary Market: Stock Exchanges) to clarify the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe SEBI\'s "investor protection" means **guaranteeing returns or compensating losses** — e.g., "If.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "SEBI\'s developmental functions are secondary to its regulatory functions because regulation ensures market integrity, which is the.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'investor protection', 'If my shares fall, SEBI should pay me'],
                  hint: 'Revisit **c12_bs_cbse_10_003** (Capital Market components) and **c12_bs_cbse_10_005** (Stock.',
                  misconception: 'Students often believe SEBI\'s "investor protection" means **guaranteeing returns or compensating losses** — e.g., "If my shares fall, SEBI.' },
                { id: 'b', prompt: 'Design a hypothetical SEBI regulatory response to a new market innovation: "Social Trading Platforms" where retail investors auto-copy trades of "star traders".', answer: 'Which objective(s) are primarily at risk?',
                  options: ['Which objective(s) are primarily at risk?', 'investor protection', 'If my shares fall, SEBI should pay me'],
                  hint: 'Revisit **c12_bs_cbse_10_003** (Capital Market components) and **c12_bs_cbse_10_005** (Stock.',
                  misconception: 'Students often believe SEBI\'s "investor protection" means **guaranteeing returns or compensating losses** — e.g., "If my shares fall, SEBI.' }
          ],
            remediations: { 'sebi-s-investor-protection-means': { steps: ['Have the student re-read Section 11 of the SEBI Act (bare act language) and highlight the three objectives — verbatim.', 'Give a 2x3 table (Objectives × Functions) and ask them to place 6 specific SEBI actions (ICDR, LODR, PIT, SCORES, T+1.', 'Present two mini-cases — (a) A company hides debt in IPO prospectus; (b) A broker misuses client securities — and ask.', 'If confusion persists, revisit node **c12_bs_cbse_10_005** (Secondary Market: Stock Exchanges) to clarify the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_008', difficulty: 'standard',
          question: 'A depository system is an electronic infrastructure that holds securities.',
          hint: 'Revisit c12_bs_cbse_10_006 (trading procedure) and c12_bs_cbse_10_007 (SEBI\'s role).',
          misconception: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1".',
          parts: [
                { id: 'a', prompt: 'Compare and contrast: Demat account vs. Trading account vs. Bank account. Which account is debited/credited when you buy shares on the NSE?', answer: '- Demat account: holds securities (electronic storage)',
                  options: ['- Demat account: holds securities (electronic storage)', 'trading account holds shares', 'bank account receives shares', '2-in-1'],
                  hint: 'Revisit c12_bs_cbse_10_006 (trading procedure) and c12_bs_cbse_10_007 (SEBI\'s role) to see why.',
                  misconception: 'Students often think a Demat account and a trading account are the same because many brokers offer a "2-in-1" or "3-in-1" account opening.' }
          ],
            remediations: { 'a-demat-account-and-a': { steps: ['If the student conflates Demat and trading accounts: (1) Have them list three transactions that happen *only* in the.', '(2) Ask them to trace a buy order: "Where is the money deducted?', 'Where do shares appear?" (3) Re-diagnose with DIAGNOSTIC_QUESTION_4.', 'If they confuse DP with depository: (1) Show the NSDL/CDSL website list of registered DPs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_009', difficulty: 'standard',
          question: 'Derivatives are financial instruments whose value is derived from the value.',
          hint: 'If unclear on exchange vs OTC or clearing corporation role, revisit c12_bs_cbse_10_005.',
          misconception: 'Students often think "futures and forwards are the same thing — both fix a future price." They miss that futures are.',
          parts: [
                { id: 'a', prompt: 'Explain why a futures contract requires both initial margin and maintenance margin, whereas a forward contract typically does not.', answer: 'Futures are exchange-traded with daily marking-to-market',
                  options: ['Futures are exchange-traded with daily marking-to-market', 'forwards also have margin', 'futures and forwards are the same thing', '"futures and forwards are the same thing'],
                  hint: 'If unclear on exchange vs OTC or clearing corporation role, revisit c12_bs_cbse_10_005 and.',
                  misconception: 'Students often think "futures and forwards are the same thing — both fix a future price." They miss that futures are exchange-traded.' },
                { id: 'b', prompt: 'A jeweller expects gold prices to rise in two months. He enters a long futures contract at ₹60,000 per 10g. At expiry, the spot price is ₹62,000.', answer: 'Futures profit = ₹62,000 – ₹60,000 = ₹2,000 per 10g',
                  options: ['Futures profit = ₹62,000 – ₹60,000 = ₹2,000 per 10g', 'futures and forwards are the same thing', '"futures and forwards are the same thing'],
                  hint: 'If unclear on exchange vs OTC or clearing corporation role, revisit c12_bs_cbse_10_005 and.',
                  misconception: 'Students often think "futures and forwards are the same thing — both fix a future price." They miss that futures are exchange-traded.' }
          ],
            remediations: { 'futures-and-forwards-are-the': { steps: ['Revisit c12_bs_cbse_10_005 (Secondary Market: Stock Exchanges) to recall exchange structure and clearing corporation.', 'Re-read c12_bs_cbse_10_006 (Stock Exchange: Trading Procedure) for marking-to-market mechanics.', 'Draw a three-column table (Forward / Future / Option) with rows: Trading venue, Standardisation, Obligation/Right.', 'Fill it from memory, then check against NCERT.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_010', difficulty: 'standard',
          question: 'The money market is a financial market for short-term debt instruments with.',
          hint: 'If unable to classify instruments by market, revisit the maturity column.',
          misconception: 'Students believe "money market = only Treasury Bills" and "capital market = only shares." They miss that money market.',
          parts: [
                { id: 'a', prompt: 'State the maximum maturity period for instruments traded in the money market as per RBI guidelines, and name one instrument that operates at this maximum limit.', answer: 'The maximum maturity is 364 days (Treasury Bills)',
                  options: ['The maximum maturity is 364 days (Treasury Bills)', '91 days', '5 years', 'money market = only Treasury Bills'],
                  hint: 'If unable to classify instruments by market, revisit the maturity column in c12_bs_cbse_10_002.',
                  misconception: 'Students believe "money market = only Treasury Bills" and "capital market = only shares." They miss that money market includes CP, CDs.' },
                { id: 'b', prompt: 'A manufacturing company issues Commercial Paper of ₹100 crore at 7.5% for 180 days.', answer: 'CP annualised cost = ₹100 cr × 7.5% = ₹7.5 cr',
                  options: ['CP annualised cost = ₹100 cr × 7.5% = ₹7.5 cr', 'money market = only Treasury Bills', 'capital market = only shares', '"money market = only Treasury Bills" and "capital market = only shares'],
                  hint: 'If unable to classify instruments by market, revisit the maturity column in c12_bs_cbse_10_002.',
                  misconception: 'Students believe "money market = only Treasury Bills" and "capital market = only shares." They miss that money market includes CP, CDs.' },
                { id: 'c', prompt: 'Compare the participant structure of money market vs capital market.', answer: 'Money market: RBI, banks, FIs, corporates, MFs',
                  options: ['Money market: RBI, banks, FIs, corporates, MFs', 'knowledge', 'money market = only Treasury Bills', 'capital market = only shares'],
                  hint: 'If unable to classify instruments by market, revisit the maturity column in c12_bs_cbse_10_002.',
                  misconception: 'Students believe "money market = only Treasury Bills" and "capital market = only shares." They miss that money market includes CP, CDs.' }
          ],
            remediations: { 'money-market-only-treasury-bills': { steps: ['Revisit c12_bs_cbse_10_002 (Money Market Instruments) and list all 6 instruments with their max tenors.', 'Revisit c12_bs_cbse_10_003 (Capital Market Components) and list all instrument categories (equity, debt, hybrids).', 'Create a 2-column sheet: for each instrument, write "Money Market" or "Capital Market" based solely on maturity > or <.', 'Re-attempt Diagnostic Question 4 — if you still misclassify, the gap is maturity-threshold understanding, not.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
