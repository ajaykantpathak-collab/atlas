import type { SimDef } from '../../engine/types';
import C12_EconomicsDemandMeaningTypesSim from '../../../simulations/c6_12/C12_EconomicsDemandMeaningTypesSim';

/** v3 wrapped master — C12_EconomicsDemandMeaningTypesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_economicsdemandmeaningtypessim: SimDef = {
    id: 'v3w_c12_economicsdemandmeaningtypessim',
    title: 'Demand Meaning Types',
    subtitle: 'This node covers the meaning of money, its four functions (medium of exchange, unit of.',
    classLevel: 12, subject: 'economics', topic: 'Money: Meaning and Functions (Medium of Exchange, Unit of Account)',
    chapters: [],
    nodeIds: ['c12_eco_cbse_09_001', 'c12_eco_cbse_09_008', 'c12_eco_cbse_10_001', 'c12_eco_cbse_11_010', 'c12_eco_cbse_06_006', 'c12_eco_cbse_06_009', 'c12_eco_cbse_10_007', 'c12_eco_cbse_11_003', 'c12_eco_cbse_11_005', 'c12_eco_cbse_05_001', 'c12_eco_cbse_05_006', 'c12_eco_cbse_05_007', 'c12_eco_cbse_02_008', 'c12_eco_cbse_09_003', 'c12_eco_cbse_11_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are at a local mandi in Maharashtra wanting to buy 5 kg of tomatoes.', goal: 'Master Demand Meaning Types.' },
    discovery: {
        question: 'Why is a current account deposit considered a primary function of a commercial bank, while providing a safe deposit locker is a secondary function?',
        options: ['A current account deposit is a primary function', 'both are services to customers', 'discounting of bills of exchange'],
        answer: 'A current account deposit is a primary function',
        hook: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document.',
    },
    teaching: [
        { title: 'Money is a universally accepted medium of.', text: 'Money is a universally accepted medium of exchange that serves as a unit of account, a store of value, and a standard of deferred payment, enabling the valuation and exchange of goods and services.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_001', title: 'Money is a universally accepted medium.',
          scaffold: { problem: 'In a rural haat in Bihar, a potter wants to exchange 10 earthen pots for 5 kg of rice. The rice farmer wants a cotton dhoti, not pots.',
            steps: [
            { text: 'Identify the barter deadlock — Potter has pots, wants rice; Farmer has rice, wants dhoti; Weaver has dhoti, wants pots.' },
            { text: 'Introduce money as medium of exchange. Potter sells 10 pots to Weaver for ₹500.' },
            { text: 'Potter uses ₹500 to buy 5 kg rice from Farmer at ₹100/kg. (Function: Medium of exchange + Unit of account — price.' },
            { text: 'Farmer uses ₹500 to buy dhoti from Weaver. (Function: Medium of exchange.)' },
            { text: 'All three are satisfied. Money circulated as a medium; prices (₹100/kg, ₹500/dhoti) served as unit of account; if.', faded: true, blankAnswer: 'Money resolves the deadlock by performing medium of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_008', title: 'Commercial banks are financial.',
          scaffold: { problem: 'A commercial bank in India has the following liabilities and assets on a given day: Demand deposits (current accounts): ₹500 crore; Savings.',
            steps: [
            { text: 'Identify primary function items — these are balance sheet items directly from deposit-taking and lending: all deposit.' },
            { text: 'Identify secondary function items — fixed assets (branches, lockers, ATMs) support service delivery (agency/general.' },
            { text: 'Total deposits = Demand deposits + Savings deposits + Fixed deposits = ₹500 + ₹1,200 + ₹3,000 = ₹4,700 crore.' },
            { text: 'Credit-deposit ratio = (Loans and advances / Total deposits) × 100 = (₹3,200 / ₹4,700) × 100 = 68.09%.' },
            { text: 'Interpret — CD ratio of 68% is within RBI\'s comfort zone (typically 60-75%), showing healthy lending without excessive.', faded: true, blankAnswer: 'Primary function items: all deposits, borrowings, CRR, SLR,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_10_001', title: 'Aggregate Demand (AD) is the total.',
          scaffold: { problem: 'In 2023-24, India\'s nominal GDP (expenditure approach) was ₹295 lakh crore.',
            steps: [
            { text: 'Recall the expenditure identity: GDP = PFCE + GFCF + GFCE + (X − M) + Change in Stocks + Valuables + Discrepancy.' },
            { text: 'Plug in given values: GDP = 175 + (85 + 5 + 3) + 35 + (45 − 60) + (-8) = 175 + 93 + 35 − 15 − 8 = 280.' },
            { text: 'Compute Net Exports: NX = X − M = 45 − 60 = −15 lakh crore (trade deficit).' },
            { text: 'Apply revisions: New PFCE = 177, New M = 59. New NX = 45 − 59 = −14. New AD = 177 + 93 + 35 + (-14) = 291 lakh crore.' },
            { text: 'Revised GDP (assuming discrepancy adjusts) = 291 + Discrepancy. If discrepancy remains -8, GDP = 283.', faded: true, blankAnswer: 'Original AD = ₹288 lakh crore; NX = −₹15 lakh crore;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_010', title: 'The foreign exchange rate is the price.',
          scaffold: { problem: 'India imports crude oil worth $100 billion annually. The current exchange rate is ₹82/$.',
            steps: [
            { text: 'Identify the given data: Import volume = $100 billion, Initial exchange rate e₁ = ₹82/$, New exchange rate e₂ = ₹86/$,.' },
            { text: 'Recall the formula: Import bill in ₹ = (Import volume in $) × (Exchange rate in ₹/$)' },
            { text: 'Calculate initial import bill: ₹82/$ × $100 billion = ₹8,200 billion' },
            { text: 'Calculate new import bill: ₹86/$ × $100 billion = ₹8,600 billion' },
            { text: 'Calculate absolute increase: ₹8,600 billion - ₹8,200 billion = ₹400 billion' },
            { text: 'Calculate percentage increase: (₹400 billion / ₹8,200 billion) × 100 = 4.88%', faded: true, blankAnswer: 'Import bill increases by ₹400 billion (4.88%)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_06_006', title: 'Monopolistic competition is a market.',
          scaffold: { problem: 'In a monopolistically competitive market for "artisanal bread" in Bengaluru, there are 40 bakeries.',
            steps: [
            { text: 'Identify the market structure features — 40 firms (large number), differentiated products (artisanal varieties:.' },
            { text: 'Contrast with perfect competition: demand would be horizontal (P = constant).' },
            { text: 'Recall elasticity formula: η = (dQ/dP) × (P/Q). From P = 150 - 0.5q, rewrite as q = 300 - 2P, so dq/dP = -2.' },
            { text: 'At q = 100, find P = 150 - 0.5(100) = ₹100. Then η = (-2) × (100/100) = -2.' },
            { text: 'Interpret: A 1% price increase reduces quantity demanded by 2%.', faded: true, blankAnswer: 'The demand curve is downward sloping with slope -0.5,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_06_009', title: 'Comparison of market structures is the.',
          scaffold: { problem: 'In a perfectly competitive market for wheat in Punjab, the market price is ₹2,200 per quintal.',
            steps: [
            { text: 'Identify the market structure for each scenario and the corresponding MR. Perfect competition: P=MR=2200.' },
            { text: 'Compute MC from TC for both (same cost function). TC = 50,000 + 200Q + 0.5Q² → MC = dTC/dQ = 200 + Q.' },
            { text: 'Apply MR=MC for each. Perfect competition: 2200 = 200 + Q → Q_pc = 2000 quintals.' },
            { text: 'Find price for each. Perfect competition: P_pc = ₹2,200 (price taker).' },
            { text: 'Calculate profit (TR - TC) for each. Perfect competition: TR = 2200×2000 = 44,00,000; TC = 50,000 + 200(2000) +.' },
            { text: 'Interpret. The competitive firm earns large supernormal profit at this price, attracting entry.', faded: true, blankAnswer: 'Perfect Competition: Q=2000 quintals, P=₹2200,.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_eco_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'Demand Meaning Types', spots: [
            { id: 's1', label: 'Money is a universally accepted', prompt: 'Which idea is this? — Money is a universally accepted medium of exchange that serves as a unit of account, a.', answer: 'Money is a universally accepted', options: ['Money is a universally accepted', 'Commercial banks are financial institutions', 'Aggregate Demand AD is the', 'The foreign exchange rate is'] },
            { id: 's2', label: 'Commercial banks are financial institutions', prompt: 'Which idea is this? — Commercial banks are financial institutions that accept deposits from the public.', answer: 'Commercial banks are financial institutions', options: ['Commercial banks are financial institutions', 'Money is a universally accepted', 'Aggregate Demand AD is the', 'The foreign exchange rate is'] },
            { id: 's3', label: 'Aggregate Demand AD is the', prompt: 'Which idea is this? — Aggregate Demand (AD) is the total planned expenditure on final goods and services in an.', answer: 'Aggregate Demand AD is the', options: ['Aggregate Demand AD is the', 'Money is a universally accepted', 'Commercial banks are financial institutions', 'The foreign exchange rate is'] },
            { id: 's4', label: 'The foreign exchange rate is', prompt: 'Which idea is this? — The foreign exchange rate is the price of one country\'s currency expressed in terms of.', answer: 'The foreign exchange rate is', options: ['The foreign exchange rate is', 'Money is a universally accepted', 'Commercial banks are financial institutions', 'Aggregate Demand AD is the'] },
            { id: 's5', label: 'Monopolistic competition is a market', prompt: 'Which idea is this? — Monopolistic competition is a market structure characterized by a large number of firms.', answer: 'Monopolistic competition is a market', options: ['Monopolistic competition is a market', 'Money is a universally accepted', 'Commercial banks are financial institutions', 'Aggregate Demand AD is the'] },
            { id: 's6', label: 'Comparison of market structures is', prompt: 'Which idea is this? — Comparison of market structures is the systematic analysis of how perfect competition,.', answer: 'Comparison of market structures is', options: ['Comparison of market structures is', 'Money is a universally accepted', 'Commercial banks are financial institutions', 'Aggregate Demand AD is the'] }
          ] } }
    ],
    explore: { component: C12_EconomicsDemandMeaningTypesSim, prompt: 'Explore the interactive — Demand Meaning Types' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_001', difficulty: 'standard',
          question: 'Money is a universally accepted medium of exchange that serves as a unit of.',
          hint: 'If stuck, re-read c6_economics_ch11_002 (double coincidence) and c6_economics_ch11_004.',
          misconception: 'Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat currency (₹ notes).',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab sells 100 kg of wheat at ₹2,200 per quintal and receives payment via a cheque. He deposits the cheque in his savings account.', answer: 'the cheque, (',
                  options: ['the cheque, (', 'fiat currency (₹ notes) is \'not real money\''],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat currency (₹ notes) is \'not real money\'.' }
          ],
            remediations: { 'money-must-have-intrinsic-value': { steps: ['If the student cannot correctly match functions to scenarios or misclassifies instruments: (1) Revisit.', '(2) Do a \'Function Audit\' on 5 daily transactions (cash purchase, UPI transfer, saving pocket money, paying school fees.', '(3) Re-attempt Diagnostic Questions 3 and 5.', 'If still stuck, review the distinction between \'money\' (asset) and \'credit\' (liability) using the balance sheet.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat currency (₹ notes).',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: \'A credit card is money because it allows you to buy goods without cash.\' Consider all four functions of money in your evaluation.', answer: 'A credit card is NOT money',
                  options: ['A credit card is NOT money', 'fiat currency (₹ notes) is \'not real money\''],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat currency (₹ notes) is \'not real money\'.' }
          ],
            remediations: { 'money-must-have-intrinsic-value': { steps: ['If the student cannot correctly match functions to scenarios or misclassifies instruments: (1) Revisit.', '(2) Do a \'Function Audit\' on 5 daily transactions (cash purchase, UPI transfer, saving pocket money, paying school fees.', '(3) Re-attempt Diagnostic Questions 3 and 5.', 'If still stuck, review the distinction between \'money\' (asset) and \'credit\' (liability) using the balance sheet.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_008', difficulty: 'standard',
          question: 'Commercial banks are financial institutions that accept deposits from the.',
          hint: 'If stuck, revisit Class 10 "Loan Activities of Banks" (c10_eco_cbse_03_003) and Class 11.',
          misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document.',
          parts: [
                { id: 'a', prompt: 'Why is a current account deposit considered a primary function of a commercial bank, while providing a safe deposit locker is a secondary function?', answer: 'A current account deposit is a primary function',
                  options: ['A current account deposit is a primary function', 'both are services to customers', 'discounting of bills of exchange'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document (bill).' },
                { id: 'b', prompt: 'A commercial bank receives ₹10 crore in fixed deposits at 6% p.a. and lends ₹8 crore as term loans at 10% p.a.', answer: 'Step 1: Interest income = ₹8 crore × 10% = ₹0.8 crore',
                  options: ['Step 1: Interest income = ₹8 crore × 10% = ₹0.8 crore', 'discounting of bills of exchange', 'instruments'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document (bill).' },
                { id: 'c', prompt: 'Compare the liquidity and profitability implications for a commercial bank of (a) savings deposits vs (b) fixed deposits vs (c) current account deposits.', answer: 'savings deposits vs (',
                  options: ['savings deposits vs (', 'fixed deposits are most profitable', 'discounting of bills of exchange'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document (bill).' }
          ],
            remediations: { 'discounting-of-bills-of-exchange': { steps: ['If the student misclassifies discounting of bills or confuses primary/secondary functions: (1) Revisit.', '(2) Draw a T-account: when a bank discounts a ₹1 lakh bill at 12% for 3 months, show the asset side (Bills Discounted.', '(3) Re-do Diagnostic Q2 with this example.', '(4) Memorise the rule: "If it creates a bank asset (loan) and liability (deposit) simultaneously, it\'s primary.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Agency functions like collection of cheques and payment of insurance premiums are less important than primary functions because they.', answer: 'The statement is FALSE for a modern bank\'s revenue model',
                  options: ['The statement is FALSE for a modern bank\'s revenue model', 'discounting of bills of exchange', 'instruments'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document (bill).' },
                { id: 'b', prompt: 'Design a new secondary service that a commercial bank in India could offer to small retailers (kirana stores) to increase digital payment adoption.', answer: 'Service: "UPI Settlement Dashboard"',
                  options: ['Service: "UPI Settlement Dashboard"', 'giving loans to kirana stores', 'no credit risk', 'discounting of bills of exchange'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document (bill).' }
          ],
            remediations: { 'discounting-of-bills-of-exchange': { steps: ['If the student misclassifies discounting of bills or confuses primary/secondary functions: (1) Revisit.', '(2) Draw a T-account: when a bank discounts a ₹1 lakh bill at 12% for 3 months, show the asset side (Bills Discounted.', '(3) Re-do Diagnostic Q2 with this example.', '(4) Memorise the rule: "If it creates a bank asset (loan) and liability (deposit) simultaneously, it\'s primary.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_10_001', difficulty: 'standard',
          question: 'Aggregate Demand (AD) is the total planned expenditure on final goods and.',
          hint: 'If stuck on classifying expenditures, revisit c10_eco_cbse_02_003 (GDP expenditure.',
          misconception: 'Students often treat "Investment (I)" in AD as financial investment (buying shares, mutual funds) rather than physical.',
          parts: [
                { id: 'a', prompt: 'Compare two economies: Economy A has AD = C + I + G (closed), Economy B has AD = C + I + G + (X − M) (open). Suppose both have identical C, I, G.', answer: 'Economy B\'s AD curve shifts upward by ₹500 crore at every income level',
                  options: ['Economy B\'s AD curve shifts upward by ₹500 crore at every income level', 'both shift because income rises'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "Investment (I)" in AD as financial investment (buying shares, mutual funds) rather than physical capital formation.' }
          ],
            remediations: { 'students-often-treat-investment-i': { steps: ['Revisit c9_eco_ch2_1 (Demand definition) and c9_eco_ch2_10 (Market equilibrium) to recall the distinction between.', 'Use the "bathtub analogy": AD is water flowing into the tub (real expenditure); buying shares is just moving water.', 'Practice classifying 10 transactions (e.g., "firm issues bonds to build plant", "household buys govt bonds", "firm buys.', 'Re-attempt Diagnostic Q2 with fresh transactions.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "Investment (I)" in AD as financial investment (buying shares, mutual funds) rather than physical.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "A rise in imports always reduces Aggregate Demand, so the government should impose tariffs to boost AD." Use the AD identity and the.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'tariffs always increase AD'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "Investment (I)" in AD as financial investment (buying shares, mutual funds) rather than physical capital formation.' },
                { id: 'b', prompt: 'Compare two economies: Economy A has AD = C + I + G (closed), Economy B has AD = C + I + G + (X − M) (open). Suppose both have identical C, I, G.', answer: 'Economy B\'s AD curve shifts upward by ₹500 crore at every income level',
                  options: ['Economy B\'s AD curve shifts upward by ₹500 crore at every income level', 'both shift because income rises'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "Investment (I)" in AD as financial investment (buying shares, mutual funds) rather than physical capital formation.' }
          ],
            remediations: { 'students-often-treat-investment-i': { steps: ['Revisit c9_eco_ch2_1 (Demand definition) and c9_eco_ch2_10 (Market equilibrium) to recall the distinction between.', 'Use the "bathtub analogy": AD is water flowing into the tub (real expenditure); buying shares is just moving water.', 'Practice classifying 10 transactions (e.g., "firm issues bonds to build plant", "household buys govt bonds", "firm buys.', 'Re-attempt Diagnostic Q2 with fresh transactions.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_010', difficulty: 'standard',
          question: 'The foreign exchange rate is the price of one country\'s currency expressed in.',
          hint: 'Revisit Class 9 Market Equilibrium (c9_eco_ch2_10) and practice 3 demand-supply shift.',
          misconception: 'Students believe that "depreciation of rupee means the rupee becomes stronger" because they confuse the direction: they.',
          parts: [
                { id: 'a', prompt: 'Define foreign exchange rate and state how it is quoted in the Indian context (direct vs indirect quote). What does a quote of ₹83.50 per US Dollar mean?', answer: 'Foreign exchange rate is the price of one currency in terms of another',
                  options: ['Foreign exchange rate is the price of one currency in terms of another', '$83.50 per rupee', 'indirect quote'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "depreciation of rupee means the rupee becomes stronger" because they confuse the direction: they see the number ₹/$.' },
                { id: 'b', prompt: 'Explain why the demand curve for foreign exchange is downward sloping and the supply curve is upward sloping.', answer: 'Demand curve slopes downward',
                  options: ['Demand curve slopes downward', 'demand rises when exchange rate rises', 'depreciation of rupee means the rupee becomes stronger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "depreciation of rupee means the rupee becomes stronger" because they confuse the direction: they see the number ₹/$.' },
                { id: 'c', prompt: 'Analyse the impact on the Indian rupee exchange rate (₹/$) if: (a) Global crude oil prices rise sharply, (b) The US Federal Reserve raises interest rates while.', answer: 'Global crude oil prices rise sharply, (',
                  options: ['Global crude oil prices rise sharply, (', 'US rate hike makes dollar cheaper', 'FPI selling increases supply of dollars'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "depreciation of rupee means the rupee becomes stronger" because they confuse the direction: they see the number ₹/$.' }
          ],
            remediations: { 'depreciation-of-rupee-means-the': { steps: ['If the student confuses appreciation/depreciation direction: (1) Revisit the definition of direct quote (₹/$) using a.', 'Similarly, if 1$ costs ₹80 and rises to ₹85, the dollar became dearer, so rupee became cheaper." (2) Practice 5.', '(3) Re-draw the demand-supply diagram labelling axes correctly: Y-axis = Exchange rate (₹/$), X-axis = Quantity of $.', '(4) Take the diagnostic test again — if error persists, revisit Class 9 market equilibrium (c9_eco_ch2_10) where price.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "depreciation of rupee means the rupee becomes stronger" because they confuse the direction: they.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A depreciation of the rupee always improves India\'s trade balance because exports become cheaper and imports become dearer." Consider.', answer: 'The statement is NOT always true',
                  options: ['The statement is NOT always true', 'yes, always improves', 'no, never improves', 'depreciation of rupee means the rupee becomes stronger'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "depreciation of rupee means the rupee becomes stronger" because they confuse the direction: they see the number ₹/$.' },
                { id: 'b', prompt: 'Construct a numerical example showing how a 10% depreciation of the rupee (from ₹80/$ to ₹88/$) affects the rupee price of an imported good priced at $100 and.', answer: 'Import: Initial price = $100 × 80 = ₹8,000',
                  options: ['Import: Initial price = $100 × 80 = ₹8,000', 'depreciation of rupee means the rupee becomes stronger', 'higher number = stronger currency', 'appreciation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "depreciation of rupee means the rupee becomes stronger" because they confuse the direction: they see the number ₹/$.' }
          ],
            remediations: { 'depreciation-of-rupee-means-the': { steps: ['If the student confuses appreciation/depreciation direction: (1) Revisit the definition of direct quote (₹/$) using a.', 'Similarly, if 1$ costs ₹80 and rises to ₹85, the dollar became dearer, so rupee became cheaper." (2) Practice 5.', '(3) Re-draw the demand-supply diagram labelling axes correctly: Y-axis = Exchange rate (₹/$), X-axis = Quantity of $.', '(4) Take the diagnostic test again — if error persists, revisit Class 9 market equilibrium (c9_eco_ch2_10) where price.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_006', difficulty: 'standard',
          question: 'Monopolistic competition is a market structure characterized by a large number.',
          hint: 'If stuck, revisit Class 11 "Market Equilibrium" (c11_eco_cbse_02_010) and practice.',
          misconception: 'Students often think "product differentiation" means only physical differences (real differentiation) and forget.',
          parts: [
                { id: 'a', prompt: 'State the five defining features of monopolistic competition as per NCERT Class 12 Microeconomics.', answer: 'The five features are: (1) Large number of buyers and sellers, (2) Product',
                  options: ['The five features are: (1) Large number of buyers and sellers, (2) Product', 'selling costs', 'non-price competition'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "product differentiation" means only physical differences (real differentiation) and forget perceived differentiation.' },
                { id: 'b', prompt: 'Explain why the demand curve facing a firm in monopolistic competition is downward sloping but more elastic than a monopolist\'s demand curve.', answer: 'The demand curve slopes downward',
                  options: ['The demand curve slopes downward', 'demand is perfectly elastic', 'demand is inelastic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "product differentiation" means only physical differences (real differentiation) and forget perceived differentiation.' }
          ],
            remediations: { 'product-differentiation-means-only-physical': { steps: ['If the student cannot distinguish real vs.', 'perceived differentiation: Step 1 — Revisit Class 11 "Market Equilibrium" (c11_eco_cbse_02_010) to recall perfect.', 'Step 2 — Take two Indian FMCG products (e.g., Colgate vs.', 'Pepsodent toothpaste) and list 3 tangible differences (ingredients, flavor variants) and 3 intangible ones (brand.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "product differentiation" means only physical differences (real differentiation) and forget.',
          parts: [
                { id: 'a', prompt: 'Design a hypothetical monopolistically competitive market for "online tutoring platforms" in India.', answer: 'number of firms, (',
                  options: ['number of firms, (', 'product differentiation', 'large number of firms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "product differentiation" means only physical differences (real differentiation) and forget perceived differentiation.' }
          ],
            remediations: { 'product-differentiation-means-only-physical': { steps: ['If the student cannot distinguish real vs.', 'perceived differentiation: Step 1 — Revisit Class 11 "Market Equilibrium" (c11_eco_cbse_02_010) to recall perfect.', 'Step 2 — Take two Indian FMCG products (e.g., Colgate vs.', 'Pepsodent toothpaste) and list 3 tangible differences (ingredients, flavor variants) and 3 intangible ones (brand.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_009', difficulty: 'standard',
          question: 'Comparison of market structures is the systematic analysis of how perfect.',
          hint: 'If stuck on MR=MC derivation, revisit c11_math_cbse_13_007 (derivative of polynomial) and.',
          misconception: 'Students often think "monopolistic competition is a type of monopoly" because of the word "monopoly" in the name.',
          parts: [
                { id: 'a', prompt: 'A perfectly competitive firm faces market price ₹50. Its total cost function is TC = 100 + 10Q + Q².', answer: '**Perfect Competition:** P=MR=50',
                  options: ['**Perfect Competition:** P=MR=50', 'monopolistic competition is a type of monopoly', 'monopoly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "monopolistic competition is a type of monopoly" because of the word "monopoly" in the name.' }
          ],
            remediations: { 'monopolistic-competition-is-a-type': { steps: ['If a student confuses monopolistic competition with monopoly: 1.', 'Revisit **c12_eco_cbse_06_006** (Monopolistic Competition: Features) and **c12_eco_cbse_06_001** (Monopoly: Barriers to.', 'Create a two-column table: "Barriers to Entry" and "Long-Run Profit".', 'Draw the long-run equilibrium diagrams side-by-side: Monopoly (P>MC, P>AC, supernormal profit) vs Monopolistic.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "monopolistic competition is a type of monopoly" because of the word "monopoly" in the name.',
          parts: [
                { id: 'a', prompt: '"Monopolistic competition is socially wasteful because firms operate with excess capacity and charge P>MC." Evaluate this statement considering both efficiency.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'it is completely wasteful', 'it is perfectly efficient', 'monopolistic competition is a type of monopoly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "monopolistic competition is a type of monopoly" because of the word "monopoly" in the name.' },
                { id: 'b', prompt: 'Design a real-world Indian market example for each structure (perfect competition, monopoly, monopolistic competition).', answer: '**Perfect competition:** Agricultural mandi for wheat',
                  options: ['**Perfect competition:** Agricultural mandi for wheat', 'monopolistic competition is a type of monopoly', 'monopoly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "monopolistic competition is a type of monopoly" because of the word "monopoly" in the name.' }
          ],
            remediations: { 'monopolistic-competition-is-a-type': { steps: ['If a student confuses monopolistic competition with monopoly: 1.', 'Revisit **c12_eco_cbse_06_006** (Monopolistic Competition: Features) and **c12_eco_cbse_06_001** (Monopoly: Barriers to.', 'Create a two-column table: "Barriers to Entry" and "Long-Run Profit".', 'Draw the long-run equilibrium diagrams side-by-side: Monopoly (P>MC, P>AC, supernormal profit) vs Monopolistic.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
