import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch09_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch09_p2: SimDef = {
    id: 'v3_c12_eco_ch09_p2',
    title: 'Money and Banking · Part 2/2',
    subtitle: 'Your credit card is a loan, not money — here\'s the test',
    classLevel: 12, subject: 'economics', topic: 'Money and Banking · Part 2/2',
    chapters: ['c12_eco_ch09'],
    nodeIds: ['c12_eco_cbse_09_007', 'c12_eco_cbse_09_008', 'c12_eco_cbse_09_009', 'c12_eco_cbse_09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Monetary economist', intro: 'A farmer once needed a shoemaker who wanted wheat. Money ended that impossible search — and built the modern economy.', goal: 'Define money\'s four functions, contrast barter\'s limits, and distinguish fiat, commodity and bank money.' },
    discovery: {
        question: 'Your credit card buys goods without cash — so is it money? Run it through the four-function test.',
        options: ['No — it creates a loan, stores debt not value, and prices are never quoted in \'card units\'; it\'s a payment instrument, not money', 'Yes — anything that buys things is money', 'Yes — it\'s digital money', 'Only if the bank approves it'],
        answer: 'No — it creates a loan, stores debt not value, and prices are never quoted in \'card units\'; it\'s a payment instrument, not money',
        hook: 'Money is defined by functions, not form: medium of exchange, unit of account, store of value, standard of deferred payment. Fiat notes qualify despite zero intrinsic value — trust and legal-tender status do the work. A credit card fails three of four tests.',
    },
    teaching: [
        { title: 'Repo Rate and Bank Rate as Instruments of Monetary Policy', text: 'Repo rate is the interest rate at which the Reserve Bank of India (RBI) lends short-term funds to commercial banks against the collateral of government securities under a repurchase agreement.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Escape the barter trap: prove how money kills the double-coincidence problem, grade coins, notes, deposits and cards against the four functions, then follow the trail to RBI and the money multiplier.',
        labels: ['Repo Rate and Bank', 'Commercial Banks: Primary', 'Credit Creation by Commercial', 'High-Powered Money and'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_007', title: 'Repo Rate and Bank Rate as Instruments of Monetary Policy',
          scaffold: { problem: 'On 8 June 2024, the RBI\'s Monetary Policy Committee raises the repo rate from 6.50% to 6.75% (a 25 basis point hike).',
            steps: [
            { text: 'Identify the change in repo rate: Δr = 6.75% - 6.50% = 0.25% = 0.0025 in decimal.' },
            { text: 'Recall the daily interest cost formula: Daily Interest = Principal × Annual Rate × (1/365).' },
            { text: 'Compute the additional daily interest = Principal × Δr × (1/365) = 1,200 crore × 0.0025 × (1/365).' },
            { text: 'Calculate: 1,200 × 0.0025 = 3 crore; 3 / 365 ≈ 0.008219 crore = ₹82.19 lakh.' },
            { text: 'Interpret: The bank\'s daily cost of borrowing from the RBI increases by about ₹82 lakh.', faded: true, blankAnswer: 'Additional daily interest cost = ₹82.19 lakh (approx).' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_09_008', title: 'Commercial Banks: Primary and Secondary Functions',
          caseStudy: { intro: 'Imagine you walk into an SBI branch in your neighbourhood. You see a savings account counter, a current account desk for shopkeepers, a loan officer discussing.',
            decisions: [{ prompt: 'State the two primary functions of a commercial bank and give one example of each in the Indian context.', options: [
                { text: 'The two primary functions are (1) accepting deposits (e.g., a household opening a savings', outcome: 'The two primary functions are (1) accepting deposits (e.g., a household opening a savings account.' },
                { text: 'issuing cheques', outcome: 'Not quite — Students often think "discounting of bills of exchange" is a secondary/agency function because.', reveals: 'discounting-of-bills-of-exchange' },
                { text: 'locker facility', outcome: 'Not quite — Students often think "discounting of bills of exchange" is a secondary/agency function because.', reveals: 'discounting-of-bills-of-exchange' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_009', title: 'Credit Creation by Commercial Banks: Money Multiplier Process',
          scaffold: { problem: 'The Reserve Bank of India sets CRR at 5%. A customer deposits ₹2,00,000 in cash into Bank A.',
            steps: [
            { text: 'Identify the given data — CRR = 5% = 0.05, Initial fresh deposit = ₹2,00,000.' },
            { text: 'Recall the money multiplier formula: m = 1 / CRR. This gives the maximum expansion factor for total deposits from.' },
            { text: 'Calculate the money multiplier: m = 1 / 0.05 = 20. This means every ₹1 of initial deposit can support ₹20 of total.' },
            { text: 'Calculate total deposits created: ΔD_total = Initial Deposit × m = ₹2,00,000 × 20 = ₹40,00,000 (₹40 lakh).' },
            { text: 'Calculate total credit created: Credit = Total Deposits - Initial Deposit = ₹40,00,000 - ₹2,00,000 = ₹38,00,000 (₹38.' },
            { text: 'Calculate total reserves: In the final equilibrium, total reserves = Total Deposits × CRR = ₹40,00,000 × 0.05.', faded: true, blankAnswer: '(i) Money multiplier = 20; (ii) Maximum total deposits.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_010', title: 'High-Powered Money and the Money Multiplier Formula',
          scaffold: { problem: 'In an economy, the public holds ₹500 crore as currency, commercial banks hold ₹1,500 crore as reserves, and demand deposits are ₹10,000.',
            steps: [
            { text: 'Identify given values: C = ₹500 cr, R = ₹1,500 cr, D = ₹10,000 cr.' },
            { text: 'Compute H = C + R = 500 + 1,500 = ₹2,000 crore.' },
            { text: 'Compute M = C + D = 500 + 10,000 = ₹10,500 crore.' },
            { text: 'Compute c = C/D = 500/10,000 = 0.05. Compute r = R/D = 1,500/10,000 = 0.15.' },
            { text: 'Compute m = (1 + c)/(c + r) = (1 + 0.05)/(0.05 + 0.15) = 1.05/0.20 = 5.25.' },
            { text: 'Verify M = m × H = 5.25 × 2,000 = ₹10,500 crore (matches).' },
            { text: 'New H = 2,000 + 200 = ₹2,200 crore. New M = m × new H = 5.25 × 2,200 = ₹11,550 crore.', faded: true, blankAnswer: 'H = ₹2,000 cr, M = ₹10,500 cr, c = 0.05, r = 0.15,.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Debate prep: a teammate\'s slide says \'a credit card is money — it buys goods without cash\'. The opposing team plans to tear it apart at the functions-of-money level.',
            decisions: [{ prompt: 'Is a credit card money?', options: [
                { text: 'No — it merely routes a bank loan to the merchant: it isn\'t a unit of account, stores debt not value, and the deferred payment is owed BY the user; it\'s a payment instrument, not money.', outcome: 'Buying power isn\'t the test — the four functions are: only assets performing all of them (currency, demand deposits) qualify as money.' },
                { text: 'Yes — anything that lets you purchase goods performs the medium-of-exchange job, so it counts.', outcome: 'Medium of exchange is only one function; the card fails the other three because the \'money\' is the bank\'s liability, not the user\'s asset.', reveals: 'payment-tool-is-money' },
                { text: 'Yes — and for the same reason UPI itself is the new money replacing bank deposits.', outcome: 'UPI is a rail moving deposits; the deposit is the money — the pipe isn\'t the water.', reveals: 'payment-rail-is-money' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_09_010', title: 'You made it',
          caseStudy: { intro: 'You can now say exactly what makes a ₹500 note \'money\' and a credit card \'not money\' — and trace how banks multiply deposits through the system.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_007', difficulty: 'standard',
          question: 'Repo rate is the interest rate at which the Reserve Bank of India (RBI) lends.',
          hint: 'If stuck, revisit c12_eco_cbse_09_006 (CRR and SLR) to recall reserve requirements, and.',
          misconception: 'Students often think the repo rate and bank rate are the same thing with different names, or that the bank rate is the.',
          parts: [
                { id: 'a', prompt: 'What is the repo rate, and what collateral is required for a bank to borrow at this rate from the RBI?', answer: 'The repo rate is the rate at',
                  options: ['The repo rate is the rate at', 'no collateral', 'long-term loan'],
                  hint: 'If stuck, revisit c12_eco_cbse_09_006 (CRR and SLR) to recall reserve requirements, and.',
                  misconception: 'Students often think the repo rate and bank rate are the same thing with different names, or that the bank rate is the rate at which banks.' },
                { id: 'b', prompt: 'Why does an increase in the repo rate typically lead to a reduction in aggregate demand in the economy?', answer: 'When the repo rate rises, banks\' cost of borrowing from the RBI increases',
                  options: ['When the repo rate rises, banks\' cost of borrowing from the RBI increases', 'higher repo rate increases money supply'],
                  hint: 'If stuck, revisit c12_eco_cbse_09_006 (CRR and SLR) to recall reserve requirements, and.',
                  misconception: 'Students often think the repo rate and bank rate are the same thing with different names, or that the bank rate is the rate at which banks.' },
                { id: 'c', prompt: 'Compare the repo rate and the bank rate on three dimensions: (i) typical tenure, (ii) collateral requirement, (iii) primary purpose in monetary policy.', answer: '(i) Repo rate: overnight/short-term (usually 1 day)',
                  options: ['(i) Repo rate: overnight/short-term (usually 1 day)', 'swaps tenure or collateral shows confusion between the two instruments'],
                  hint: 'If stuck, revisit c12_eco_cbse_09_006 (CRR and SLR) to recall reserve requirements, and.',
                  misconception: 'Students often think the repo rate and bank rate are the same thing with different names, or that the bank rate is the rate at which banks.' }
          ],
            remediations: { 'the-repo-rate-and-bank': { steps: ['If the student confuses the two rates, have them create a two-column table: Column 1 = Repo Rate, Column 2 = Bank Rate.', 'Rows: Tenure, Collateral, Window (LAF vs.', 'traditional), Frequency of change, Current numerical value (check RBI website).', 'Then re-do Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_008', difficulty: 'standard',
          question: 'Commercial banks are financial institutions that accept deposits from the.',
          hint: 'If stuck, revisit Class 10 "Loan Activities of Banks" (c10_eco_cbse_03_003) and Class 11.',
          misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document.',
          parts: [
                { id: 'a', prompt: 'Why is a current account deposit considered a primary function of a commercial bank, while providing a safe deposit locker is a secondary function?', answer: 'A current account deposit is a primary function',
                  options: ['A current account deposit is a primary function', 'both are services to customers', 'discounting of bills of exchange', 'instruments'],
                  hint: 'If stuck, revisit Class 10 "Loan Activities of Banks" (c10_eco_cbse_03_003) and Class 11 Business.',
                  misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document (bill).' },
                { id: 'b', prompt: 'A commercial bank receives ₹10 crore in fixed deposits at 6% p.a. and lends ₹8 crore as term loans at 10% p.a.', answer: 'Step 1: Interest income = ₹8 crore × 10% = ₹0.8 crore',
                  options: ['Step 1: Interest income = ₹8 crore × 10% = ₹0.8 crore', 'discounting of bills of exchange', 'instruments'],
                  hint: 'If stuck, revisit Class 10 "Loan Activities of Banks" (c10_eco_cbse_03_003) and Class 11 Business.',
                  misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document (bill).' },
                { id: 'c', prompt: 'Compare the liquidity and profitability implications for a commercial bank of (a) savings deposits vs (b) fixed deposits vs (c) current account deposits.', answer: 'savings deposits vs (',
                  options: ['savings deposits vs (', 'fixed deposits are most profitable', 'discounting of bills of exchange', 'instruments'],
                  hint: 'If stuck, revisit Class 10 "Loan Activities of Banks" (c10_eco_cbse_03_003) and Class 11 Business.',
                  misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document (bill).' }
          ],
            remediations: { 'discounting-of-bills-of-exchange': { steps: ['If the student misclassifies discounting of bills or confuses primary/secondary functions: (1) Revisit.', '(2) Draw a T-account: when a bank discounts a ₹1 lakh bill at 12% for 3 months, show the asset side (Bills Discounted.', '(3) Re-do Diagnostic Q2 with this example.', '(4) Memorise the rule: "If it creates a bank asset (loan) and liability (deposit) simultaneously, it\'s primary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Agency functions like collection of cheques and payment of insurance premiums are less important than primary functions because they.', answer: 'The statement is FALSE for a modern bank\'s revenue model',
                  options: ['The statement is FALSE for a modern bank\'s revenue model', 'discounting of bills of exchange', 'instruments'],
                  hint: 'If stuck, revisit Class 10 "Loan Activities of Banks" (c10_eco_cbse_03_003) and Class 11 Business.',
                  misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document (bill).' },
                { id: 'b', prompt: 'Design a new secondary service that a commercial bank in India could offer to small retailers (kirana stores) to increase digital payment adoption.', answer: 'Service: "UPI Settlement Dashboard"',
                  options: ['Service: "UPI Settlement Dashboard"', 'giving loans to kirana stores', 'no credit risk', 'discounting of bills of exchange'],
                  hint: 'If stuck, revisit Class 10 "Loan Activities of Banks" (c10_eco_cbse_03_003) and Class 11 Business.',
                  misconception: 'Students often think "discounting of bills of exchange" is a secondary/agency function because it involves a document (bill).' }
          ],
            remediations: { 'discounting-of-bills-of-exchange': { steps: ['If the student misclassifies discounting of bills or confuses primary/secondary functions: (1) Revisit.', '(2) Draw a T-account: when a bank discounts a ₹1 lakh bill at 12% for 3 months, show the asset side (Bills Discounted.', '(3) Re-do Diagnostic Q2 with this example.', '(4) Memorise the rule: "If it creates a bank asset (loan) and liability (deposit) simultaneously, it\'s primary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_009', difficulty: 'standard',
          question: 'Credit creation by commercial banks is the process through which banks expand.',
          hint: 'If stuck, revisit c12_eco_cbse_09_006 (CRR definition) and c10_eco_cbse_03_003 (bank.',
          misconception: 'Students often believe that "banks lend out reserves" or "banks multiply the initial deposit by lending it repeatedly.".',
          parts: [
                { id: 'a', prompt: 'Define the money multiplier and state its formula in terms of the Cash Reserve Ratio (CRR). What is the value of the money multiplier if CRR = 5%?', answer: 'The money multiplier (m) = 1/CRR',
                  options: ['The money multiplier (m) = 1/CRR', 'banks lend out reserves', 'banks multiply the initial deposit by lending it repeatedly'],
                  hint: 'If stuck, revisit c12_eco_cbse_09_006 (CRR definition) and c10_eco_cbse_03_003 (bank lending.',
                  misconception: 'Students often believe that "banks lend out reserves" or "banks multiply the initial deposit by lending it repeatedly." The correct view.' },
                { id: 'b', prompt: 'Explain why the actual credit creation by commercial banks is always less than the theoretical maximum given by the money multiplier formula (1/CRR).', answer: 'Actual credit creation falls short due to: (1) Currency drain',
                  options: ['Actual credit creation falls short due to: (1) Currency drain', 'banks don\'t lend all', 'banks lend out reserves', 'banks multiply the initial deposit by lending it repeatedly'],
                  hint: 'If stuck, revisit c12_eco_cbse_09_006 (CRR definition) and c10_eco_cbse_03_003 (bank lending.',
                  misconception: 'Students often believe that "banks lend out reserves" or "banks multiply the initial deposit by lending it repeatedly." The correct view.' },
                { id: 'c', prompt: 'A commercial bank receives a fresh deposit of ₹50,000. The CRR is 10%.', answer: 'the money multiplier, (',
                  options: ['the money multiplier, (', 'banks lend out reserves', 'banks multiply the initial deposit by lending it repeatedly'],
                  hint: 'If stuck, revisit c12_eco_cbse_09_006 (CRR definition) and c10_eco_cbse_03_003 (bank lending.',
                  misconception: 'Students often believe that "banks lend out reserves" or "banks multiply the initial deposit by lending it repeatedly." The correct view.' },
                { id: 'd', prompt: 'Trace the first three rounds of credit creation starting with an initial deposit of ₹10,000 and CRR = 20%.', answer: 'Round 1: Deposit = ₹10,000',
                  options: ['Round 1: Deposit = ₹10,000', 'banks lend out reserves', 'banks multiply the initial deposit by lending it repeatedly'],
                  hint: 'If stuck, revisit c12_eco_cbse_09_006 (CRR definition) and c10_eco_cbse_03_003 (bank lending.',
                  misconception: 'Students often believe that "banks lend out reserves" or "banks multiply the initial deposit by lending it repeatedly." The correct view.' }
          ],
            remediations: { 'banks-lend-out-reserves-or': { steps: ['If the student confuses the direction of credit creation or misapplies the multiplier: 1.', 'Revisit c12_eco_cbse_09_008 (Commercial Banks: Primary and Secondary Functions) to clarify that lending is a *secondary.', 'Revisit c12_eco_cbse_09_006 (CRR and SLR) to reinforce that CRR is a *fraction of deposits* banks must hold, not.', 'Use a T-account exercise: Show Bank A\'s balance sheet after receiving ₹100 deposit (Assets: Reserves ₹100; Liabilities.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_010', difficulty: 'standard',
          question: 'High-powered money (H), also called the monetary base, is the total liability.',
          hint: 'Review the deposit creation numerical example in node c12_eco_cbse_09_009 (Credit.',
          misconception: 'Students often confuse the simple deposit multiplier (1/r) with the actual money multiplier (1+c)/(c+r).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'High-powered money (H), also called the monetary base, is the total liability of the',
                  options: ['High-powered money (H), also called the monetary base, is the total liability of the', 'Money is a universally accepted medium of exchange that serves as a unit of account, a', 'Money supply in India refers to the total stock of money circulating in the economy at a', 'The Reserve Bank of India (RBI) as the central bank performs two foundational functions:'],
                  hint: 'Review the deposit creation numerical example in node c12_eco_cbse_09_009 (Credit Creation.',
                  misconception: 'Students often confuse the simple deposit multiplier (1/r) with the actual money multiplier (1+c)/(c+r).' }
          ],
            remediations: { 'students-often-confuse-the-simple': { steps: ['Revisit the definitions of c and r from the credit creation node (c12_eco_cbse_09_009).', 'Draw a T-account for a bank receiving a new deposit of ₹100 with r=0.1, c=0.2.', 'Track how much currency leaks out at each step.', 'Compute the deposit creation series: 100 → 80 → 64 → ...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
