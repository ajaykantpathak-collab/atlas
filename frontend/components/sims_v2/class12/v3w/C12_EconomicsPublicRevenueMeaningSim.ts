import type { SimDef } from '../../engine/types';
import C12_EconomicsPublicRevenueMeaningSim from '../../../simulations/c6_12/C12_EconomicsPublicRevenueMeaningSim';

/** v3 wrapped master — C12_EconomicsPublicRevenueMeaningSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_economicspublicrevenuemeaningsim: SimDef = {
    id: 'v3w_c12_economicspublicrevenuemeaningsim',
    title: 'Functions of the Central Bank (RBI): Issuer of Currency and Banker to Government',
    subtitle: 'This node covers ONLY two functions of RBI: (a) Issuer of Currency — monopoly, Minimum.',
    classLevel: 12, subject: 'economics', topic: 'Functions of the Central Bank (RBI): Issuer of Currency and Banker to Government',
    chapters: [],
    nodeIds: ['c12_eco_cbse_09_003', 'c12_eco_cbse_01_008', 'c12_eco_cbse_11_001', 'c12_eco_cbse_11_006', 'c12_eco_cbse_04_006', 'c12_eco_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you hold a ₹500 note — notice the promise "I promise to pay the bearer the sum of five hundred.', goal: 'Master Functions of the Central Bank (RBI): Issuer of Currency and Banker to Government.' },
    discovery: {
        question: 'Compare the currency issue mechanism under the Proportional Reserve System (pre-1957) and the Minimum Reserve System (post-1957).',
        options: ['**Correct answer:** Minimum Reserve System allows greater elasticity', 'reserve backing', 'flexibility'],
        answer: '**Correct answer:** Minimum Reserve System allows greater elasticity',
        hook: '**Misconception:** "RBI prints money and gives it to the government to spend — that\'s how the fiscal deficit is.',
    },
    teaching: [
        { title: 'The Reserve Bank of India (RBI) as the.', text: 'The Reserve Bank of India (RBI) as the central bank performs two foundational functions: (1) **Issuer of Currency** — it has the sole monopoly to issue banknotes (except one-rupee notes and coins.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_003', title: 'The Reserve Bank of India (RBI) as the.',
          scaffold: { problem: 'As of March 31, 2023, RBI\'s Issue Department held: Gold = 794.64 metric tonnes (valued at ₹5,800 crore per tonne), Foreign Exchange =.',
            steps: [
            { text: 'Recall MRS requirements — Total assets ≥ ₹200 crore, Gold ≥ ₹115 crore' },
            { text: 'Calculate gold value = 794.64 tonnes × ₹5,800 crore/tonne = ₹4,60,891.2 crore' },
            { text: 'Total assets = Gold (₹4,60,891.2 cr) + Forex (₹42,00,000 cr) + Govt Securities (₹8,50,000 cr) = ₹55,10,891.2 crore' },
            { text: 'Check requirements: Gold (₹4,60,891.2 cr) > ₹115 cr ✓; Total (₹55,10,891.2 cr) > ₹200 cr ✓' },
            { text: 'Excess backing = Total assets - Currency issued = ₹55,10,891.2 cr - ₹34,00,000 cr = ₹21,10,891.2 crore' },
            { text: 'Interpret: RBI can issue up to ₹21.1 lakh crore more currency without acquiring new assets', faded: true, blankAnswer: 'RBI meets MRS comfortably. Excess backing = ₹21,10,891.2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_01_008', title: 'Economic agents are the decision-making.',
          scaffold: { problem: 'Classify the following entities in the Indian context and justify each classification using the NCERT criteria (ownership, motive,.',
            steps: [
            { text: 'Recall the three agent definitions — Household (consumption decisions, factor ownership), Firm (production for market,.' },
            { text: 'Analyse Amul — It is a cooperative owned by milk producers (households), but it *operates* as a production unit: hires.' },
            { text: 'Analyse marginal farmer — Primary activity is own-consumption; family labour (not wage labour); sells surplus.' },
            { text: 'Analyse DMRC — Joint venture of Govt of India and Govt of Delhi; builds/runs metro (public infrastructure); fares set.' },
            { text: 'Analyse gig worker — Supplies labour service to a platform (firm); earns piece-rate income; no control over pricing, no.' },
            { text: 'Analyse SEBI — Statutory body under SEBI Act 1992; regulates securities market; protects investors; quasi-judicial.', faded: true, blankAnswer: '1. Firm, 2. Household, 3. Government, 4. Household, 5..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_001', title: 'A government budget is an annual.',
          scaffold: { problem: 'From the Union Budget 2023-24 (actuals), Revenue Receipts = ₹26.3 lakh crore, Revenue Expenditure = ₹34.5 lakh crore, Capital Receipts =.',
            steps: [
            { text: 'Identify Revenue Receipts (RR) = 26.3, Revenue Expenditure (RE) = 34.5.' },
            { text: 'Total Expenditure = RE + CE = 34.5 + 10.5 = 45.0 lakh crore. Total Receipts excluding borrowings = RR + (Capital.' },
            { text: 'Primary Deficit = Fiscal Deficit - Interest Payments = 15.4 - 10.8 = 4.6 lakh crore.' },
            { text: 'Interpret: Revenue deficit means day-to-day spending exceeds current income; fiscal deficit of 15.4 lakh crore is.', faded: true, blankAnswer: '(a) Revenue Deficit = ₹8.2 lakh crore; (b) Fiscal Deficit =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_006', title: 'Fiscal deficit is the excess of total.',
          scaffold: { problem: 'From the following Budget 2024-25 (hypothetical) data, calculate Fiscal Deficit and its financing composition.',
            steps: [
            { text: 'Compute Fiscal Deficit = Total Expenditure – (Revenue Receipts + Non-Debt Capital Receipts) = 45,00,000 – (26,00,000 +.' },
            { text: 'Compute Net Market Borrowing = Gross Market Borrowing – Repayments – Switching = 12,00,000 – 2,50,000 – 1,00,000 =.' },
            { text: 'Sum all financing sources = Net Market Borrowing (8,50,000) + Net External Borrowing (50,000) + Net NSSF (1,50,000) +.' },
            { text: 'Notice the sum (11,00,000) ≠ Fiscal Deficit (16,00,000). The gap ₹5,00,000 crore must be financed by other domestic.' },
            { text: 'Conclude: Fiscal Deficit = Σ All Financing Items. The identity holds by construction in government accounting.', faded: true, blankAnswer: 'Fiscal Deficit = ₹16,00,000 crore. Financing composition.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_04_006', title: 'Long-run equilibrium of a firm under.',
          scaffold: { problem: 'A representative firm in a perfectly competitive industry has a long-run total cost function LTC(q) = 2q³ - 24q² + 128q.',
            steps: [
            { text: 'Derive the long-run average cost function: LAC(q) = LTC/q = 2q² - 24q + 128.' },
            { text: 'Find the output level that minimizes LAC by taking the first derivative and setting to zero: d(LAC)/dq = 4q - 24 = 0 →.' },
            { text: 'Verify it is a minimum using the second derivative: d²(LAC)/dq² = 4 > 0, so LAC is minimized at q* = 6.' },
            { text: 'Compute the minimum LAC: LAC(6) = 2(36) - 24(6) + 128 = 72 - 144 + 128 = 56.' },
            { text: 'Find market quantity demanded at P* = 56: Qd = 2000 - 50(56) = 2000 - 2800 = -800?' },
            { text: 'Number of firms n = Qd / q* = 880 / 6 ≈ 146.67 → 146 firms (since firms are discrete, but in continuous model n =.', faded: true, blankAnswer: '(a) P* = ₹56 per unit; (b) q* = 6 units per firm; (c) n ≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_01_006', title: 'Microeconomics studies the behaviour of.',
          scaffold: { problem: 'An Indian newspaper headline reads: "RBI keeps repo rate unchanged at 6.5% to balance inflation and growth." Identify whether this is a.',
            steps: [
            { text: 'Identify the decision-maker: Reserve Bank of India (RBI), which is the central bank and a statutory body.' },
            { text: 'Identify the objective: "balance inflation and growth" – these are aggregate goals (price stability and output growth).' },
            { text: 'Recognise the policy tool: repo rate (the interest rate at which RBI lends to commercial banks) is a monetary policy.' },
            { text: 'Determine the sectors involved: Government (RBI acts on behalf of the state), Firms (borrowing costs change),.' },
            { text: 'Conclude: This is a macroeconomic issue because it involves a macroeconomic agent (RBI) using a policy tool to target.', faded: true, blankAnswer: 'Macroeconomic. Sectors: Government (RBI), Firms,.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_eco_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'Functions of the Central Bank (RBI): Issuer of Currency and Banker to Government', spots: [
            { id: 's1', label: 'The Reserve Bank of India', prompt: 'Which idea is this? — The Reserve Bank of India (RBI) as the central bank performs two foundational functions:.', answer: 'The Reserve Bank of India', options: ['The Reserve Bank of India', 'Economic agents are the decision-making', 'A government budget is an', 'Fiscal deficit is the excess'] },
            { id: 's2', label: 'Economic agents are the decision-making', prompt: 'Which idea is this? — Economic agents are the decision-making units in an economy that undertake production,.', answer: 'Economic agents are the decision-making', options: ['Economic agents are the decision-making', 'The Reserve Bank of India', 'A government budget is an', 'Fiscal deficit is the excess'] },
            { id: 's3', label: 'A government budget is an', prompt: 'Which idea is this? — A government budget is an annual financial statement presenting the government\'s.', answer: 'A government budget is an', options: ['A government budget is an', 'The Reserve Bank of India', 'Economic agents are the decision-making', 'Fiscal deficit is the excess'] },
            { id: 's4', label: 'Fiscal deficit is the excess', prompt: 'Which idea is this? — Fiscal deficit is the excess of total government expenditure over total receipts (revenue.', answer: 'Fiscal deficit is the excess', options: ['Fiscal deficit is the excess', 'The Reserve Bank of India', 'Economic agents are the decision-making', 'A government budget is an'] },
            { id: 's5', label: 'Long-run equilibrium of a firm', prompt: 'Which idea is this? — Long-run equilibrium of a firm under perfect competition occurs when the firm produces at.', answer: 'Long-run equilibrium of a firm', options: ['Long-run equilibrium of a firm', 'The Reserve Bank of India', 'Economic agents are the decision-making', 'A government budget is an'] },
            { id: 's6', label: 'Microeconomics studies the behaviour of', prompt: 'Which idea is this? — Microeconomics studies the behaviour of individual economic agents — households and firms.', answer: 'Microeconomics studies the behaviour of', options: ['Microeconomics studies the behaviour of', 'The Reserve Bank of India', 'Economic agents are the decision-making', 'A government budget is an'] }
          ] } }
    ],
    explore: { component: C12_EconomicsPublicRevenueMeaningSim, prompt: 'Explore the interactive — Functions of the Central Bank (RBI): Issuer of Currency and Banker to Government' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_003', difficulty: 'standard',
          question: 'The Reserve Bank of India (RBI) as the central bank performs two foundational.',
          hint: 'If confused about asset backing, revisit c6_economics_ch11_005 (commodity vs fiat money).',
          misconception: '**Misconception:** "RBI prints money and gives it to the government to spend — that\'s how the fiscal deficit is.',
          parts: [
                { id: 'a', prompt: 'Compare the currency issue mechanism under the Proportional Reserve System (pre-1957) and the Minimum Reserve System (post-1957).', answer: '**Correct answer:** Minimum Reserve System allows greater elasticity',
                  options: ['**Correct answer:** Minimum Reserve System allows greater elasticity', 'reserve backing', 'flexibility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "RBI prints money and gives it to the government to spend — that\'s how the fiscal deficit is financed." **Why it\'s.' }
          ],
            remediations: { 'misconception-rbi-prints-money-and': { steps: ['** Revisit c10_eco_cbse_03_009 (Class 10 RBI role) — focus on the distinction between "issuing currency" and "managing.', '** Draw RBI\'s balance sheet: Assets (Gold, Foreign Exchange, Government Securities, Loans to Govt) | Liabilities.', '** Practice NCERT Exercise Q13 (Chapter 3): "Distinguish between currency issue and deficit financing." Write the.', '** Re-attempt Diagnostic Question 5 with the balance sheet framework.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "RBI prints money and gives it to the government to spend — that\'s how the fiscal deficit is.',
          parts: [
                { id: 'a', prompt: 'Compare the currency issue mechanism under the Proportional Reserve System (pre-1957) and the Minimum Reserve System (post-1957).', answer: '**Correct answer:** Minimum Reserve System allows greater elasticity',
                  options: ['**Correct answer:** Minimum Reserve System allows greater elasticity', 'reserve backing', 'flexibility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "RBI prints money and gives it to the government to spend — that\'s how the fiscal deficit is financed." **Why it\'s.' }
          ],
            remediations: { 'misconception-rbi-prints-money-and': { steps: ['** Revisit c10_eco_cbse_03_009 (Class 10 RBI role) — focus on the distinction between "issuing currency" and "managing.', '** Draw RBI\'s balance sheet: Assets (Gold, Foreign Exchange, Government Securities, Loans to Govt) | Liabilities.', '** Practice NCERT Exercise Q13 (Chapter 3): "Distinguish between currency issue and deficit financing." Write the.', '** Re-attempt Diagnostic Question 5 with the balance sheet framework.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_008', difficulty: 'standard',
          question: 'Economic agents are the decision-making units in an economy that undertake.',
          hint: 'If stuck on agent classification, revisit **c8_eco_ch1_2** (Factors of Production) and.',
          misconception: '**"Households only consume; firms only produce; government only taxes."** Students memorise these as rigid, exclusive.',
          parts: [
                { id: 'a', prompt: 'In a mixed economy like India, the government produces goods/services (e.g., railways, defence) AND regulates private firms.', answer: 'As a **producer**, the government wants its enterprises (e.g., BSNL, Air India',
                  options: ['As a **producer**, the government wants its enterprises (e.g., BSNL, Air India', 'government firms are always inefficient', 'regulation always helps public firms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Households only consume; firms only produce; government only taxes."** Students memorise these as rigid, exclusive roles.' }
          ],
            remediations: { 'households-only-consume': { steps: ['Revisit **c8_eco_ch1_2** (Factors of Production) and **c8_eco_ch1_6** (Entrepreneurship) to recall that households.', 'Draw a **two-column table**: Column A = "Activities of Ramesh\'s Family" (work, save, buy, sell surplus milk, pay tax);.', 'Fill it for 10 activities.', 'Read the NCERT paragraph starting "In both the developed and developing countries, apart from the private capitalist.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"Households only consume; firms only produce; government only taxes."** Students memorise these as rigid, exclusive.',
          parts: [
                { id: 'a', prompt: 'In a mixed economy like India, the government produces goods/services (e.g., railways, defence) AND regulates private firms.', answer: 'As a **producer**, the government wants its enterprises (e.g., BSNL, Air India',
                  options: ['As a **producer**, the government wants its enterprises (e.g., BSNL, Air India', 'government firms are always inefficient', 'regulation always helps public firms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Households only consume; firms only produce; government only taxes."** Students memorise these as rigid, exclusive roles.' }
          ],
            remediations: { 'households-only-consume': { steps: ['Revisit **c8_eco_ch1_2** (Factors of Production) and **c8_eco_ch1_6** (Entrepreneurship) to recall that households.', 'Draw a **two-column table**: Column A = "Activities of Ramesh\'s Family" (work, save, buy, sell surplus milk, pay tax);.', 'Fill it for 10 activities.', 'Read the NCERT paragraph starting "In both the developed and developing countries, apart from the private capitalist.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_001', difficulty: 'standard',
          question: 'A government budget is an annual financial statement presenting the.',
          hint: 'If unsure about flow vs stock, revisit Class 12 Macroeconomics Chapter 2 (National Income.',
          misconception: 'Students often think "Capital Budget means big money, Revenue Budget means small money." The real distinction is.',
          parts: [
                { id: 'a', prompt: 'Explain why the budget is divided into Revenue Budget and Capital Budget. What economic distinction does this division capture?', answer: 'The division separates current/recurring transactions (revenue) from',
                  options: ['The division separates current/recurring transactions (revenue) from', 'revenue is for short term, capital for long term', 'Capital Budget means big money, Revenue Budget means small money'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Capital Budget means big money, Revenue Budget means small money." The real distinction is economic nature: Revenue.' },
                { id: 'b', prompt: 'Classify each of the following into Revenue Receipt, Revenue Expenditure, Capital Receipt, or Capital Expenditure: (a) Corporate tax collection, (b) Interest.', answer: 'Corporate tax collection, (',
                  options: ['Corporate tax collection, (', 'Capital Budget means big money, Revenue Budget means small money', '"Capital Budget means big money, Revenue Budget means small money'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Capital Budget means big money, Revenue Budget means small money." The real distinction is economic nature: Revenue.' }
          ],
            remediations: { 'capital-budget-means-big-money': { steps: ['If the student confuses revenue vs capital classification: (1) Revisit the definition: "Does this create a government.', 'Otherwise → Revenue." (2) Practice with 10 items from the latest Union Budget (use budget.gov.in).', '(3) Draw a T-account for each item: left side asset/liability change?', '(4) Re-attempt Diagnostic Question 3 and 6.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Capital Budget means big money, Revenue Budget means small money." The real distinction is.',
          parts: [
                { id: 'a', prompt: '"During high inflation, the government should increase capital expenditure on infrastructure to boost supply." Evaluate this statement using the stabilization.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'Capital Budget means big money, Revenue Budget means small money', '"Capital Budget means big money, Revenue Budget means small money'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Capital Budget means big money, Revenue Budget means small money." The real distinction is economic nature: Revenue.' },
                { id: 'b', prompt: 'Construct a mini-budget for a hypothetical state government with the following items (in ₹ crore): GST collection 50,000; Salaries 30,000; Interest payments.', answer: 'Revenue Budget: Receipts = GST 50,000 (Revenue Receipt)',
                  options: ['Revenue Budget: Receipts = GST 50,000 (Revenue Receipt)', 'Capital Budget means big money, Revenue Budget means small money', '"Capital Budget means big money, Revenue Budget means small money'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Capital Budget means big money, Revenue Budget means small money." The real distinction is economic nature: Revenue.' }
          ],
            remediations: { 'capital-budget-means-big-money': { steps: ['If the student confuses revenue vs capital classification: (1) Revisit the definition: "Does this create a government.', 'Otherwise → Revenue." (2) Practice with 10 items from the latest Union Budget (use budget.gov.in).', '(3) Draw a T-account for each item: left side asset/liability change?', '(4) Re-attempt Diagnostic Question 3 and 6.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_006', difficulty: 'standard',
          question: 'Fiscal deficit is the excess of total government expenditure over total.',
          hint: 'If stuck, revisit c12_eco_cbse_11_005 worked examples on calculating fiscal deficit,.',
          misconception: 'Students believe "Fiscal Deficit = Borrowing from RBI (printing money)".',
          parts: [
                { id: 'a', prompt: 'In the Union Budget 2024-25, the Government of India estimates Total Expenditure at ₹47,65,768 crore and Total Receipts (excluding borrowings) at ₹30,80,000.', answer: 'Fiscal Deficit = ₹47,65,768 crore – ₹30,80,000 crore = ₹16,85,768 crore',
                  options: ['Fiscal Deficit = ₹47,65,768 crore – ₹30,80,000 crore = ₹16,85,768 crore', 'Fiscal Deficit = Borrowing from RBI (printing money)', '"Fiscal Deficit = Borrowing from RBI (printing money)"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Fiscal Deficit = Borrowing from RBI (printing money)".' },
                { id: 'b', prompt: 'The government decides to finance ₹2 lakh crore of its fiscal deficit by issuing 10-year dated securities (G-Secs) to commercial banks.', answer: 'bank reserves, (',
                  options: ['bank reserves, (', 'money supply increases', 'Fiscal Deficit = Borrowing from RBI (printing money)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Fiscal Deficit = Borrowing from RBI (printing money)".' },
                { id: 'c', prompt: 'Compare the macroeconomic impact of financing ₹1 lakh crore fiscal deficit through: (A) RBI purchasing government securities (monetization) vs.', answer: '(A) RBI credits government account → H increases directly (ΔH = ₹1 lakh crore)',
                  options: ['(A) RBI credits government account → H increases directly (ΔH = ₹1 lakh crore)', 'Fiscal Deficit = Borrowing from RBI (printing money)', '"Fiscal Deficit = Borrowing from RBI (printing money)"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Fiscal Deficit = Borrowing from RBI (printing money)".' }
          ],
            remediations: { 'fiscal-deficit-borrowing-from-rbi': { steps: ['If the student holds the above misconception: (1) Revisit c12_eco_cbse_11_005 to re-derive Fiscal Deficit = Borrowing.', '(2) Use RBI\'s "Financing of Fiscal Deficit" table from the latest Budget (Annexure 2.1) — identify each line item:.', '(3) Calculate the share of RBI (WMA + G-Sec purchases) vs.', '(4) Re-attempt Diagnostic Q4 with actual data.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Fiscal Deficit = Borrowing from RBI (printing money)".',
          parts: [
                { id: 'a', prompt: 'The Finance Minister argues: "A higher fiscal deficit is acceptable because we are borrowing domestically in rupees, so we can never default — we can always.', answer: 'The statement is dangerous',
                  options: ['The statement is dangerous', 'Fiscal Deficit = Borrowing from RBI (printing money)', '"Fiscal Deficit = Borrowing from RBI (printing money)"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Fiscal Deficit = Borrowing from RBI (printing money)".' },
                { id: 'b', prompt: 'Design a financing mix for a ₹15 lakh crore fiscal deficit that minimizes crowding out of private investment while keeping inflation below 4%.', answer: 'Good answer example: (i) ₹10 lakh crore dated securities',
                  options: ['Good answer example: (i) ₹10 lakh crore dated securities', 'Fiscal Deficit = Borrowing from RBI (printing money)', '"Fiscal Deficit = Borrowing from RBI (printing money)"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Fiscal Deficit = Borrowing from RBI (printing money)".' }
          ],
            remediations: { 'fiscal-deficit-borrowing-from-rbi': { steps: ['If the student holds the above misconception: (1) Revisit c12_eco_cbse_11_005 to re-derive Fiscal Deficit = Borrowing.', '(2) Use RBI\'s "Financing of Fiscal Deficit" table from the latest Budget (Annexure 2.1) — identify each line item:.', '(3) Calculate the share of RBI (WMA + G-Sec purchases) vs.', '(4) Re-attempt Diagnostic Q4 with actual data.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_04_006', difficulty: 'standard',
          question: 'Long-run equilibrium of a firm under perfect competition occurs when the firm.',
          hint: 'If stuck, revisit c12_eco_cbse_04_004 (Short Run Equilibrium) and c12_eco_cbse_04_005.',
          misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner.',
          parts: [
                { id: 'a', prompt: 'State the three conditions that must hold simultaneously for a perfectly competitive firm to be in long-run equilibrium.', answer: 'The three conditions are: (1) Price = Long-run Marginal Cost (P = LMC)',
                  options: ['The three conditions are: (1) Price = Long-run Marginal Cost (P = LMC)', 'in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner takes home no money).' },
                { id: 'b', prompt: 'A perfectly competitive firm has a long-run total cost function LTC(q) = q³ - 10q² + 36q. The market demand is Qd = 120 - 5P.', answer: 'Step 1: Find LAC = LTC/q = q² - 10q + 36',
                  options: ['Step 1: Find LAC = LTC/q = q² - 10q + 36', 'in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner takes home no money).' },
                { id: 'c', prompt: 'Compare the long-run industry supply curve under three scenarios: (a) constant cost industry, (b) increasing cost industry, (c) decreasing cost industry.', answer: 'constant cost industry, (',
                  options: ['constant cost industry, (', 'in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner takes home no money).' }
          ],
            remediations: { 'in-long-run-equilibrium': { steps: ['If the student confuses accounting vs.', 'economic profit, revisit c12_eco_cbse_04_001 (Perfect Competition assumptions) and c11_eco_cbse_04_001 (Human Capital.', 'If they cannot derive min LAC, practice calculus optimization: set derivative of LAC to zero, verify second derivative.', 'If they miss the entry/exit mechanism, re-read the walkthrough scenario of the Punjab wheat farmer and trace the.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner.',
          parts: [
                { id: 'a', prompt: '"In the long run, a perfectly competitive firm produces at the minimum point of its LAC curve.', answer: 'Yes, the firm is productively efficient',
                  options: ['Yes, the firm is productively efficient', 'only productively efficient', 'in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner takes home no money).' },
                { id: 'b', prompt: 'Construct a numerical example where a perfectly competitive firm initially earns supernormal profit in the short run, then show step-by-step how the industry.', answer: 'Example: Firm\'s LTC = q³ - 8q² + 20q',
                  options: ['Example: Firm\'s LTC = q³ - 8q² + 20q', 'in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner takes home no money).' }
          ],
            remediations: { 'in-long-run-equilibrium': { steps: ['If the student confuses accounting vs.', 'economic profit, revisit c12_eco_cbse_04_001 (Perfect Competition assumptions) and c11_eco_cbse_04_001 (Human Capital.', 'If they cannot derive min LAC, practice calculus optimization: set derivative of LAC to zero, verify second derivative.', 'If they miss the entry/exit mechanism, re-read the walkthrough scenario of the Punjab wheat farmer and trace the.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_006', difficulty: 'standard',
          question: 'Microeconomics studies the behaviour of individual economic agents — households.',
          hint: 'If stuck, revisit Class 9 \'Scarcity: The Fundamental Economic Problem\' (c9_eco_ch1_1) and.',
          misconception: 'Students often think the distinction between micro and macro is merely about "small vs.',
          parts: [
                { id: 'a', prompt: 'Explain why the Great Depression of 1929 led to the birth of macroeconomics as a separate branch of economics.', answer: 'The Great Depression showed that the classical belief',
                  options: ['The Great Depression showed that the classical belief', 'because the stock market crashed', 'the distinction between micro and macro is merely about "small vs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the distinction between micro and macro is merely about "small vs. large" numbers — e.g., a small firm vs.' },
                { id: 'b', prompt: 'Classify each of the following as a microeconomic or macroeconomic issue: (a) A farmer in Punjab deciding how much wheat to plant.', answer: 'A farmer in Punjab deciding how much wheat to plant',
                  options: ['A farmer in Punjab deciding how much wheat to plant', 'the distinction between micro and macro is merely about "small vs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the distinction between micro and macro is merely about "small vs. large" numbers — e.g., a small firm vs.' }
          ],
            remediations: { 'the-distinction-between-micro-and': { steps: ['If a student confuses micro/macro based on size, do this remediation: 1) Re-read the NCERT box on "Economic Agents" and.', '2) Create a two-column table: Column A: Decision-maker (Household, Firm, Government, RBI).', 'Column B: Objective (Max utility, Max profit, Public welfare, Price stability).', '3) For each, ask: "Is this agent optimising for itself or for the economy as a whole?" 4) Test with a fresh example:.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the distinction between micro and macro is merely about "small vs.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "Macroeconomics is just the sum of microeconomics; if we understand all individual markets, we don\'t need a separate.', answer: 'The statement is false',
                  options: ['The statement is false', 'the distinction between micro and macro is merely about "small vs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the distinction between micro and macro is merely about "small vs. large" numbers — e.g., a small firm vs.' }
          ],
            remediations: { 'the-distinction-between-micro-and': { steps: ['If a student confuses micro/macro based on size, do this remediation: 1) Re-read the NCERT box on "Economic Agents" and.', '2) Create a two-column table: Column A: Decision-maker (Household, Firm, Government, RBI).', 'Column B: Objective (Max utility, Max profit, Public welfare, Price stability).', '3) For each, ask: "Is this agent optimising for itself or for the economy as a whole?" 4) Test with a fresh example:.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
