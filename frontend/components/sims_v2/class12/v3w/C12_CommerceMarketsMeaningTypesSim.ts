import type { SimDef } from '../../engine/types';
import C12_CommerceMarketsMeaningTypesSim from '../../../simulations/c6_12/C12_CommerceMarketsMeaningTypesSim';

/** v3 wrapped master — C12_CommerceMarketsMeaningTypesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_commercemarketsmeaningtypessim: SimDef = {
    id: 'v3w_c12_commercemarketsmeaningtypessim',
    title: 'Markets Meaning Types',
    subtitle: 'Covers: meaning of secondary market, distinction from primary market, definition and.',
    classLevel: 12, subject: 'business_studies', topic: 'Secondary Market: Stock Exchanges and their Functions',
    chapters: [],
    nodeIds: ['c12_bs_cbse_10_005', 'c12_bs_cbse_11_001', 'c12_bs_cbse_11_007', 'c12_bs_cbse_10_006', 'c12_bs_cbse_10_009', 'c12_bs_cbse_10_001', 'c12_bs_cbse_10_003', 'c12_bs_cbse_10_008', 'c12_bs_cbse_11_004', 'c12_bs_cbse_11_005', 'c12_bs_cbse_05_006', 'c12_bs_cbse_05_009', 'c12_bs_cbse_11_008', 'c12_bs_cbse_11_009', 'c12_bs_cbse_11_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you bought 100 shares of Reliance Industries in an IPO two years ago.', goal: 'Master Markets Meaning Types.' },
    discovery: {
        question: 'A company\'s shares are listed on both BSE and NSE. On a particular day, the share price on BSE is ₹2,450 and on NSE is ₹2,455. An arbitrageur notices this.',
        options: ['Correct steps: (1) Buy shares on BSE at ₹2,450', 'law of one price', 'secondary market trading helps the company raise more capital'],
        answer: 'Correct steps: (1) Buy shares on BSE at ₹2,450',
        hook: 'Students believe "secondary market trading helps the company raise more capital." They write: "When share price rises.',
    },
    teaching: [
        { title: 'The secondary market is a financial market.', text: 'The secondary market is a financial market where previously issued securities (shares, debentures, bonds) are bought and sold among investors without involvement of the issuing company.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bs_cbse_10_005', title: 'The secondary market is a financial.',
          scaffold: { problem: 'An investor bought 500 shares of Tata Motors at ₹400 per share in the secondary market (NSE). Two years later, the share price is ₹520.',
            steps: [
            { text: 'Identify initial investment = 500 shares × ₹400 = ₹2,00,000. Note: This money went to the previous shareholder, not to.' },
            { text: 'Bonus issue 2:1 means for every 1 share held, investor gets 2 additional shares free.' },
            { text: 'Post-bonus, share price adjusts proportionally (theoretical ex-bonus price = ₹520 × 1/3 ≈ ₹173.33).' },
            { text: 'Capital gain if sold post-bonus = Sale proceeds - Initial investment = ₹2,60,000 - ₹2,00,000 = ₹60,000.' },
            { text: 'Company\'s paid-up capital: Bonus issue capitalises reserves, so paid-up capital increases.' },
            { text: 'Investor\'s % holding: Pre-bonus = 500 / 10,00,00,000 = 0.0005%.', faded: true, blankAnswer: '(a) ₹60,000 capital gain; (b) Zero change due to secondary.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_11_001', title: 'Marketing is a social and managerial.',
          scaffold: { problem: 'A startup founder says, "We have built a great app for learning Indian classical music.',
            steps: [
            { text: 'Recall Kotler definition — marketing starts with "individuals and groups obtain what they need and want" — so first.' },
            { text: 'Map to marketing process: (a) Need identification — did they research what music learners actually struggle with?' },
            { text: 'Apply scope of marketing — the app is a \'service\' + \'information\' + \'idea\' (preserving tradition); each entity requires.' },
            { text: 'List the four overlooked activities: (1) Market research on learner pain points (need identification), (2) Feature.' },
            { text: 'Conclude — advertising (promotion) is only the 5th step; doing it first wastes budget on an unvalidated offering.', faded: true, blankAnswer: '(1) Market research on learner pain points, (2) Feature.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_11_007', title: 'Channels of distribution refer to the.',
          scaffold: { problem: 'A manufacturer of industrial robots (price ₹50 lakh each, highly technical, customized installation required, 20 potential buyers in India).',
            steps: [
            { text: 'Identify product characteristics — high unit value, technical complexity, customization, very few buyers (narrow.' },
            { text: 'Identify company factors — assume manufacturer has technical expertise but limited sales force; can afford to build.' },
            { text: 'Identify market factors — buyers are concentrated (industrial hubs), require pre-sale consultation and post-sale.' },
            { text: 'Identify middlemen factors — specialized industrial distributors exist but add cost; may lack deep technical knowledge.' },
            { text: 'Evaluate channel options — Direct (zero-level) allows manufacturer\'s engineers to sell, install, service; builds.' },
            { text: 'Recommend — Direct channel (zero-level) with company-employed sales engineers.', faded: true, blankAnswer: 'Direct channel (zero-level) with manufacturer\'s own sales.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_10_006', title: 'A stock exchange is an organized.',
          scaffold: { problem: 'Mrs. Sharma wants to sell 200 shares of HDFC Bank held in her demat account with DP ‘Zerodha’. The current market price is ₹1,650.',
            steps: [
            { text: 'Identify order type — limit sell order at ₹1,655, valid for the day (day order).' },
            { text: 'Partial execution means only 120 shares found matching buy orders at ₹1,655 or higher during the session.' },
            { text: 'The unexecuted 80 shares remain in the order book until end of trading session (3:30 PM), then lapse automatically.' },
            { text: 'For the executed 120 shares, trade confirmation is generated instantly; clearing corporation novates the trade.' },
            { text: 'Settlement follows T+1 cycle: on T+1, shares debited from Mrs.', faded: true, blankAnswer: 'Remaining 80 shares lapse at 3:30 PM; executed 120 shares.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_10_009', title: 'Derivatives are financial instruments.',
          scaffold: { problem: 'A cotton farmer expects to harvest 500 quintals in 3 months. Current spot price is ₹6,000/quintal.',
            steps: [
            { text: 'Identify the forward contract terms — farmer sells 500 quintals at ₹6,200/quintal in 3 months.' },
            { text: 'Determine spot price at maturity — ₹5,800/quintal.' },
            { text: 'Calculate farmer\'s revenue under forward: 500 × ₹6,200 = ₹31,00,000.' },
            { text: 'Calculate farmer\'s revenue if sold in spot: 500 × ₹5,800 = ₹29,00,000.' },
            { text: 'Farmer\'s gain from forward = ₹31,00,000 – ₹29,00,000 = ₹2,00,000.' },
            { text: 'Mill\'s loss = same amount (zero-sum before transaction costs).', faded: true, blankAnswer: 'Farmer gains ₹2,00,000; mill loses ₹2,00,000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_10_001', title: 'A financial market is a marketplace.',
          scaffold: { problem: 'A manufacturing company needs ₹50 crore for a new plant (10-year life) and ₹5 crore for raw material inventory (3-month cycle).',
            steps: [
            { text: 'Identify the time horizon of each need — plant is long-term (10 years), inventory is short-term (3 months).' },
            { text: 'Recall maturity matching principle — long-term assets financed by long-term sources, short-term assets by short-term.' },
            { text: 'Classify plant need as capital market (maturity > 1 year), inventory need as money market (maturity < 1 year).' },
            { text: 'Select instruments — for plant: equity shares or debentures (capital market); for inventory: commercial paper (money.' },
            { text: 'Verify — commercial paper max maturity 1 year matches 3-month need; debentures 5–10 year tenure matches plant life.', faded: true, blankAnswer: 'Plant → Capital Market → Debentures/Equity; Inventory →.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bs_cbse_11_001', title: 'Identify each idea',
          dissect: { specimen: 'Markets Meaning Types', spots: [
            { id: 's1', label: 'The secondary market is a', prompt: 'Which idea is this? — The secondary market is a financial market where previously issued securities (shares,.', answer: 'The secondary market is a', options: ['The secondary market is a', 'Marketing is a social and', 'Channels of distribution refer to', 'A stock exchange is an'] },
            { id: 's2', label: 'Marketing is a social and', prompt: 'Which idea is this? — Marketing is a social and managerial process by which individuals and groups obtain what.', answer: 'Marketing is a social and', options: ['Marketing is a social and', 'The secondary market is a', 'Channels of distribution refer to', 'A stock exchange is an'] },
            { id: 's3', label: 'Channels of distribution refer to', prompt: 'Which idea is this? — Channels of distribution refer to the path or route through which goods and services move.', answer: 'Channels of distribution refer to', options: ['Channels of distribution refer to', 'The secondary market is a', 'Marketing is a social and', 'A stock exchange is an'] },
            { id: 's4', label: 'A stock exchange is an', prompt: 'Which idea is this? — A stock exchange is an organized marketplace where securities (shares, bonds,.', answer: 'A stock exchange is an', options: ['A stock exchange is an', 'The secondary market is a', 'Marketing is a social and', 'Channels of distribution refer to'] },
            { id: 's5', label: 'Derivatives are financial instruments whose', prompt: 'Which idea is this? — Derivatives are financial instruments whose value is derived from the value of an.', answer: 'Derivatives are financial instruments whose', options: ['Derivatives are financial instruments whose', 'The secondary market is a', 'Marketing is a social and', 'Channels of distribution refer to'] },
            { id: 's6', label: 'A financial market is a', prompt: 'Which idea is this? — A financial market is a marketplace where buyers and sellers trade financial assets such.', answer: 'A financial market is a', options: ['A financial market is a', 'The secondary market is a', 'Marketing is a social and', 'Channels of distribution refer to'] }
          ] } }
    ],
    explore: { component: C12_CommerceMarketsMeaningTypesSim, prompt: 'Explore the interactive — Markets Meaning Types' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_005', difficulty: 'standard',
          question: 'The secondary market is a financial market where previously issued securities.',
          hint: 'Revisit c12_bs_cbse_10_004 (Primary Market) and trace the money flow: Investor -> Company.',
          misconception: 'Students believe "secondary market trading helps the company raise more capital." They write: "When share price rises.',
          parts: [
                { id: 'a', prompt: 'A company\'s shares are listed on both BSE and NSE. On a particular day, the share price on BSE is ₹2,450 and on NSE is ₹2,455. An arbitrageur notices this.', answer: 'Correct steps: (1) Buy shares on BSE at ₹2,450',
                  options: ['Correct steps: (1) Buy shares on BSE at ₹2,450', 'law of one price', 'secondary market trading helps the company raise more capital'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "secondary market trading helps the company raise more capital." They write: "When share price rises on NSE, the company.' }
          ],
            remediations: { 'secondary-market-trading-helps-the': { steps: ['Revisit c12_bs_cbse_10_003 (Capital Market components) and c12_bs_cbse_10_004 (Primary Market) to reinforce that.', 'Draw a T-account: Company\'s Balance Sheet (Share Capital ₹100 Cr) vs Market Cap (₹500 Cr).', 'Practice 3 board-style questions: "Distinguish between market capitalisation and paid-up capital", "Explain how.', 'Re-diagnose with a fresh question: "A company has 1 crore shares, face value ₹10, market price ₹500.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "secondary market trading helps the company raise more capital." They write: "When share price rises.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Stock exchanges perform a social function by channelising household savings into productive investment — therefore, every listed.', answer: 'Correct evaluation: Critique',
                  options: ['Correct evaluation: Critique', 'capital formation', 'socially optimal allocation', 'secondary market trading helps the company raise more capital'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "secondary market trading helps the company raise more capital." They write: "When share price rises on NSE, the company.' }
          ],
            remediations: { 'secondary-market-trading-helps-the': { steps: ['Revisit c12_bs_cbse_10_003 (Capital Market components) and c12_bs_cbse_10_004 (Primary Market) to reinforce that.', 'Draw a T-account: Company\'s Balance Sheet (Share Capital ₹100 Cr) vs Market Cap (₹500 Cr).', 'Practice 3 board-style questions: "Distinguish between market capitalisation and paid-up capital", "Explain how.', 'Re-diagnose with a fresh question: "A company has 1 crore shares, face value ₹10, market price ₹500.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_001', difficulty: 'standard',
          question: 'Marketing is a social and managerial process by which individuals and groups.',
          hint: 'If stuck, revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) and.',
          misconception: 'Students consistently equate marketing with only advertising or selling.',
          parts: [
                { id: 'a', prompt: 'Define marketing in one sentence using the Philip Kotler definition. Include the phrases "social process" and "freely exchanging."', answer: 'Correct answer: Marketing is a social process by',
                  options: ['Correct answer: Marketing is a social process by', 'marketing is selling products', 'marketing is advertising'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently equate marketing with only advertising or selling.' },
                { id: 'b', prompt: 'A local bakery wants to expand its business. The owner currently only sells walk-in cakes.', answer: 'Correct answer (any three with valid examples): Services',
                  options: ['Correct answer (any three with valid examples): Services', 'cakes, pastries, bread'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently equate marketing with only advertising or selling.' },
                { id: 'c', prompt: 'Compare the AMA (2017) definition of marketing with the Kotler definition. Identify ONE key similarity and ONE key difference in their emphasis.', answer: 'Correct answer: Similarity',
                  options: ['Correct answer: Similarity', 'both are same', 'AMA includes stakeholders'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently equate marketing with only advertising or selling.' }
          ],
            remediations: { 'students-consistently-equate-marketing-with': { steps: ['If the student equates marketing with advertising/selling: Step 1 — Have them re-read the Kotler definition and.', 'Does selling identify the need?" Step 3 — Use the smartphone walkthrough: list 5 marketing activities that happened.', 'Step 4 — Re-attempt Diagnostic Question 2 and 3.', 'If still stuck, revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) to see where marketing fits in.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_007', difficulty: 'standard',
          question: 'Channels of distribution refer to the path or route through which goods and.',
          hint: 'Review Marketing Mix (c12_bs_cbse_11_004) and Product Classification (c12_bs_cbse_11_005).',
          misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.',
          parts: [
                { id: 'a', prompt: 'Compare the functions of a \'wholesaler\' and a \'retailer\' in a two-level channel. Identify one function they share and one function unique to each.', answer: 'Shared: Risk-bearing (both hold stock)',
                  options: ['Shared: Risk-bearing (both hold stock)', 'selling', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' }
          ],
            remediations: { 'direct-channel-means-the-manufacturer': { steps: ['Revisit the definition of \'intermediary\' — an independent business entity that takes title or actively negotiates.', 'Draw a diagram: Manufacturer → [Own Retail Store] → Consumer.', 'Label: "Is the store an independent intermediary?', 'Contrast with Manufacturer → [Independent Wholesaler] → [Independent Retailer] → Consumer.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Eliminating all intermediaries (going direct) always increases the manufacturer\'s profit margin because the intermediary\'s markup is.', answer: 'For: (1) No markup paid to intermediaries → higher gross margin per unit',
                  options: ['For: (1) No markup paid to intermediaries → higher gross margin per unit', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' },
                { id: 'b', prompt: 'Create a novel distribution channel scenario for a new product: \'Smart Water Bottles\' (electronic sensor tracks hydration, syncs with phone, priced at ₹2,500).', answer: 'Good answer: Hybrid strategy',
                  options: ['Good answer: Hybrid strategy', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' },
                { id: 'c', prompt: 'Compare the functions of a \'wholesaler\' and a \'retailer\' in a two-level channel. Identify one function they share and one function unique to each.', answer: 'Shared: Risk-bearing (both hold stock)',
                  options: ['Shared: Risk-bearing (both hold stock)', 'selling', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' }
          ],
            remediations: { 'direct-channel-means-the-manufacturer': { steps: ['Revisit the definition of \'intermediary\' — an independent business entity that takes title or actively negotiates.', 'Draw a diagram: Manufacturer → [Own Retail Store] → Consumer.', 'Label: "Is the store an independent intermediary?', 'Contrast with Manufacturer → [Independent Wholesaler] → [Independent Retailer] → Consumer.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_006', difficulty: 'standard',
          question: 'A stock exchange is an organized marketplace where securities (shares, bonds,.',
          hint: 'Revisit node c12_bs_cbse_10_004 (Primary Market) and c12_bs_cbse_10_005 (Secondary.',
          misconception: 'Students often think “trading on a stock exchange means the company gets money when shares are bought/sold.” In.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the settlement cycle in India is T+1 and not T+0 or T+2.', answer: 'Correct explanation: T+1 balances operational efficiency with risk management',
                  options: ['Correct explanation: T+1 balances operational efficiency with risk management', 'T+1 is faster so it’s better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “trading on a stock exchange means the company gets money when shares are bought/sold.” In reality, the company.' },
                { id: 'b', prompt: 'An investor places a limit buy order for 50 shares of Tata Motors at ₹800 when the current market price is ₹805. The order remains unexecuted at day‑end.', answer: 'The order lapses at the end of the trading session',
                  options: ['The order lapses at the end of the trading session', 'the order stays active until executed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “trading on a stock exchange means the company gets money when shares are bought/sold.” In reality, the company.' }
          ],
            remediations: { 'trading-on-a-stock-exchange': { steps: ['If the student confuses primary vs secondary market cash flows: (1) Re‑read node c12_bs_cbse_10_004 (Primary Market:.', '(4) Re‑attempt Diagnostic Question 5 and create a similar case: “Ram buys 10 shares of X Ltd in IPO vs.', 'Ram buys 10 shares of X Ltd on NSE — who receives the money in each case?”'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_009', difficulty: 'standard',
          question: 'Derivatives are financial instruments whose value is derived from the value of.',
          hint: 'If unclear on exchange vs OTC or clearing corporation role, revisit c12_bs_cbse_10_005.',
          misconception: 'Students often think "futures and forwards are the same thing — both fix a future price." They miss that futures are.',
          parts: [
                { id: 'a', prompt: 'Explain why a futures contract requires both initial margin and maintenance margin, whereas a forward contract typically does not.', answer: 'Futures are exchange-traded with daily marking-to-market',
                  options: ['Futures are exchange-traded with daily marking-to-market', 'forwards also have margin', 'futures and forwards are the same thing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "futures and forwards are the same thing — both fix a future price." They miss that futures are exchange-traded,.' },
                { id: 'b', prompt: 'A jeweller expects gold prices to rise in two months. He enters a long futures contract at ₹60,000 per 10g. At expiry, the spot price is ₹62,000.', answer: 'Futures profit = ₹62,000 – ₹60,000 = ₹2,000 per 10g',
                  options: ['Futures profit = ₹62,000 – ₹60,000 = ₹2,000 per 10g', 'futures and forwards are the same thing', '"futures and forwards are the same thing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "futures and forwards are the same thing — both fix a future price." They miss that futures are exchange-traded,.' }
          ],
            remediations: { 'futures-and-forwards-are-the': { steps: ['Revisit c12_bs_cbse_10_005 (Secondary Market: Stock Exchanges) to recall exchange structure and clearing corporation.', 'Re-read c12_bs_cbse_10_006 (Stock Exchange: Trading Procedure) for marking-to-market mechanics.', 'Draw a three-column table (Forward / Future / Option) with rows: Trading venue, Standardisation, Obligation/Right,.', 'Fill it from memory, then check against NCERT.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "futures and forwards are the same thing — both fix a future price." They miss that futures are.',
          parts: [
                { id: 'a', prompt: '"Options are always better than futures for hedging because they limit downside." Evaluate this statement with reference to the cost of hedging and the.', answer: 'The statement is false',
                  options: ['The statement is false', 'futures and forwards are the same thing', '"futures and forwards are the same thing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "futures and forwards are the same thing — both fix a future price." They miss that futures are exchange-traded,.' }
          ],
            remediations: { 'futures-and-forwards-are-the': { steps: ['Revisit c12_bs_cbse_10_005 (Secondary Market: Stock Exchanges) to recall exchange structure and clearing corporation.', 'Re-read c12_bs_cbse_10_006 (Stock Exchange: Trading Procedure) for marking-to-market mechanics.', 'Draw a three-column table (Forward / Future / Option) with rows: Trading venue, Standardisation, Obligation/Right,.', 'Fill it from memory, then check against NCERT.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_10_001', difficulty: 'standard',
          question: 'A financial market is a marketplace where buyers and sellers trade financial.',
          hint: 'Revisit c11_bs_cbse_08_002 (classification of sources of finance) and c11_bs_cbse_08_003.',
          misconception: 'Students often think "financial market = stock market" and use the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'Explain why "price discovery" is considered a core function of financial markets. Use the example of a newly listed company\'s shares to illustrate.', answer: 'Price discovery is the process by',
                  options: ['Price discovery is the process by', 'price discovery means the company sets the price', 'financial market = stock market'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "financial market = stock market" and use the terms interchangeably.' },
                { id: 'b', prompt: 'A company needs ₹2 crore for 6 months to finance seasonal inventory. It considers two options: (a) issue commercial paper, (b) issue equity shares.', answer: 'Commercial paper (option a) is a money market instrument',
                  options: ['Commercial paper (option a) is a money market instrument', 'companies use both for finance', 'it\'s issued by a company'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "financial market = stock market" and use the terms interchangeably.' }
          ],
            remediations: { 'financial-market-stock-market-and': { steps: ['Ask the student to list 5 financial assets they know.', 'For each, identify: (a) issuer, (b) maturity, (c) market type.', 'Show RBI\'s weekly statistical supplement — point to "Money Market" and "Capital Market" sections with actual.', 'Have them re-write the definition including at least one debt and one equity instrument.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
