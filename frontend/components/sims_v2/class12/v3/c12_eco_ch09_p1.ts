import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch09_p1: SimDef = {
    id: 'v3_c12_eco_ch09_p1',
    title: 'Money and Banking · Part 1/2',
    subtitle: 'Your credit card is a loan, not money — here\'s the test',
    classLevel: 12, subject: 'economics', topic: 'Money and Banking · Part 1/2',
    chapters: ['c12_eco_ch09'],
    nodeIds: ['c12_eco_cbse_09_001', 'c12_eco_cbse_09_002', 'c12_eco_cbse_09_003', 'c12_eco_cbse_09_004', 'c12_eco_cbse_09_005', 'c12_eco_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Monetary economist', intro: 'A farmer once needed a shoemaker who wanted wheat. Money ended that impossible search — and built the modern economy.', goal: 'Define money\'s four functions, contrast barter\'s limits, and distinguish fiat, commodity and bank money.' },
    discovery: {
        question: 'Your credit card buys goods without cash — so is it money? Run it through the four-function test.',
        options: ['No — it creates a loan, stores debt not value, and prices are never quoted in \'card units\'; it\'s a payment instrument, not money', 'Yes — anything that buys things is money', 'Yes — it\'s digital money', 'Only if the bank approves it'],
        answer: 'No — it creates a loan, stores debt not value, and prices are never quoted in \'card units\'; it\'s a payment instrument, not money',
        hook: 'Money is defined by functions, not form: medium of exchange, unit of account, store of value, standard of deferred payment. Fiat notes qualify despite zero intrinsic value — trust and legal-tender status do the work. A credit card fails three of four tests.',
    },
    teaching: [
        { title: 'Money: Meaning and Functions (Medium of Exchange, Unit of Account)', text: 'Money is a universally accepted medium of exchange that serves as a unit of account, a store of value, and a standard of deferred payment, enabling the valuation and exchange of goods and services.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Escape the barter trap: prove how money kills the double-coincidence problem, grade coins, notes, deposits and cards against the four functions, then follow the trail to RBI and the money multiplier.',
        labels: ['Money: Meaning and Functions', 'Money Supply: Measures M1,', 'Functions of the Central', 'Open Market Operations', 'Cash Reserve Ratio (CRR)'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eco_cbse_09_001', title: 'Money: Meaning and Functions (Medium of Exchange, Unit of Account)',
          caseStudy: { intro: 'Imagine you are at a local mandi in Maharashtra wanting to buy 5 kg of tomatoes.',
            decisions: [{ prompt: 'State the four functions of money as defined in the NCERT Class 12 Macroeconomics textbook.', options: [
                { text: 'The four functions are: (1) Medium of Exchange, (2) Unit of Account (Measure of Value),', outcome: 'The four functions are: (1) Medium of Exchange, (2) Unit of Account (Measure of Value), (3) Store.' },
                { text: 'only three functions, or confusing \'unit of account\' with \'store of value\'', outcome: 'Not quite — Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat.', reveals: 'money-must-have-intrinsic-value' },
                { text: 'fiat currency (₹ notes) is \'not real money\'', outcome: 'Not quite — Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat.', reveals: 'money-must-have-intrinsic-value' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_002', title: 'Money Supply: Measures M1, M2, M3 and M4 in India',
          scaffold: { problem: 'From the following data (₹ crores), calculate M1, M2, M3, M4. Identify which component is NOT included in any measure.',
            steps: [
            { text: 'Compute Currency with public = Currency in circulation - Cash with banks = 30,000 - 2,000 = 28,000.' },
            { text: 'Compute Demand deposits (DD) = Current account + Savings account (demand portion) = 8,000 + 12,000 = 20,000.' },
            { text: 'M1 = Currency with public + DD + Other deposits with RBI = 28,000 + 20,000 + 800 = 48,800.' },
            { text: 'M2 = M1 + Post office savings deposits = 48,800 + 6,000 = 54,800.' },
            { text: 'Compute Net time deposits = (Fixed deposits + Recurring deposits) - Interbank time deposits = (50,000 + 5,000) - 3,000.' },
            { text: 'M3 = M1 + Net time deposits = 48,800 + 52,000 = 1,00,800.' },
            { text: 'Post office total deposits (excl. NSC) = Post office savings + Post office time = 6,000 + 4,000 = 10,000.' },
            { text: 'M4 = M3 + Post office total (excl. NSC) = 1,00,800 + 10,000 = 1,10,800.' },
            { text: 'NSC (₹2,000 cr) is NOT included in any M measure — it\'s a government savings instrument, not a monetary liability.', faded: true, blankAnswer: 'M1 = ₹48,800 cr; M2 = ₹54,800 cr; M3 = ₹1,00,800 cr; M4.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_003', title: 'Functions of the Central Bank (RBI): Issuer of Currency and Banker to Government',
          scaffold: { problem: 'As of March 31, 2023, RBI\'s Issue Department held: Gold = 794.64 metric tonnes (valued at ₹5,800 crore per tonne), Foreign Exchange.',
            steps: [
            { text: 'Recall MRS requirements — Total assets ≥ ₹200 crore, Gold ≥ ₹115 crore' },
            { text: 'Calculate gold value = 794.64 tonnes × ₹5,800 crore/tonne = ₹4,60,891.2 crore' },
            { text: 'Total assets = Gold (₹4,60,891.2 cr) + Forex (₹42,00,000 cr) + Govt Securities (₹8,50,000 cr) = ₹55,10,891.2 crore' },
            { text: 'Check requirements: Gold (₹4,60,891.2 cr) > ₹115 cr ✓; Total (₹55,10,891.2 cr) > ₹200 cr ✓' },
            { text: 'Excess backing = Total assets - Currency issued = ₹55,10,891.2 cr - ₹34,00,000 cr = ₹21,10,891.2 crore' },
            { text: 'Interpret: RBI can issue up to ₹21.1 lakh crore more currency without acquiring new assets', faded: true, blankAnswer: 'RBI meets MRS comfortably. Excess backing = ₹21,10,891.2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_004', title: 'Functions of the Central Bank: Banker\'s Bank and Lender of Last Resort',
          scaffold: { problem: '"State Bank of India (SBI) holds ₹2.5 lakh crore in Central Government Securities (SLR portfolio).',
            steps: [
            { text: 'Initial reserves = ₹1.21 lakh cr. Outflow = ₹0.15 lakh cr. Reserves after outflow = ₹1.21 - 0.15 = ₹1.06 lakh cr.' },
            { text: 'CRR requirement = ₹1.2 lakh cr. Deficit = ₹1.2 - ₹1.06 = ₹0.14 lakh cr = ₹14,000 cr.' },
            { text: 'Collateral value = ₹2.5 lakh cr. Haircut = 95%. Max LOLR loan = 0.95 × 2.5 = ₹2.375 lakh cr.' },
            { text: 'SBI borrows only the deficit = ₹14,000 cr (not the max).' },
            { text: 'Daily interest = 14,000 × (7.25/100) / 365 = ₹27.81 cr/day. For 3 days = ₹83.43 cr.', faded: true, blankAnswer: '(a) ₹14,000 cr deficit; (b) ₹2.375 lakh cr max capacity.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_005', title: 'Open Market Operations and Monetary Policy',
          scaffold: { problem: 'The RBI conducts an outright OMO purchase of ₹20,000 crore of government securities from commercial banks.',
            steps: [
            { text: 'Identify the change in high-powered money (ΔH). OMO purchase injects reserves, so ΔH = +₹20,000 crore.' },
            { text: 'Compute the money multiplier m = (1 + cdr) / (cdr + rdr) = (1 + 0.2) / (0.2 + 0.1) = 1.2 / 0.3 = 4.' },
            { text: 'Calculate ΔM = m × ΔH = 4 × ₹20,000 crore = ₹80,000 crore.' },
            { text: 'Interpret: The initial ₹20,000 crore reserve injection enables banks to create up to ₹80,000 crore of additional.' },
            { text: 'Check consistency: The multiplier 4 means every ₹1 of reserves supports ₹4 of money supply. The result is plausible.', faded: true, blankAnswer: 'The maximum potential increase in money supply (M3).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_09_006', title: 'Cash Reserve Ratio (CRR) and Statutory Liquidity Ratio (SLR)',
          scaffold: { problem: 'A commercial bank has NDTL of ₹2,000 crore. Current CRR = 4.5%, SLR = 18%.',
            steps: [
            { text: 'Compute initial required reserves: CRR reserve = 4.5% × 2000 = ₹90 cr (with RBI, 0% interest).' },
            { text: 'Compute new required reserves: CRR reserve = 4.0% × 2000 = ₹80 cr. SLR holding = 18.5% × 2000 = ₹370 cr.' },
            { text: 'Observe net change in lendable funds = ₹0 cr (CRR cut releases ₹10 cr, SLR hike absorbs ₹10 cr).' },
            { text: 'Compute interest income change: Released CRR funds (₹10 cr) can now be lent at 9% → +₹0.9 cr income.' },
            { text: 'Interpret: The policy mix is neutral on liquidity but improves bank profitability marginally because the released.', faded: true, blankAnswer: 'Net change in lendable funds = ₹0 crore; Net change.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Debate prep: a teammate\'s slide says \'a credit card is money — it buys goods without cash\'. The opposing team plans to tear it apart at the functions-of-money level.',
            decisions: [{ prompt: 'Is a credit card money?', options: [
                { text: 'No — it merely routes a bank loan to the merchant: it isn\'t a unit of account, stores debt not value, and the deferred payment is owed BY the user; it\'s a payment instrument, not money.', outcome: 'Buying power isn\'t the test — the four functions are: only assets performing all of them (currency, demand deposits) qualify as money.' },
                { text: 'Yes — anything that lets you purchase goods performs the medium-of-exchange job, so it counts.', outcome: 'Medium of exchange is only one function; the card fails the other three because the \'money\' is the bank\'s liability, not the user\'s asset.', reveals: 'payment-tool-is-money' },
                { text: 'Yes — and for the same reason UPI itself is the new money replacing bank deposits.', outcome: 'UPI is a rail moving deposits; the deposit is the money — the pipe isn\'t the water.', reveals: 'payment-rail-is-money' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now say exactly what makes a ₹500 note \'money\' and a credit card \'not money\' — and trace how banks multiply deposits through the system.',
            decisions: [{ prompt: 'What comes next? Money and Banking · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Money and Banking · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_001', difficulty: 'standard',
          question: 'Money is a universally accepted medium of exchange that serves as a unit.',
          hint: 'If stuck, re-read c6_economics_ch11_002 (double coincidence) and c6_economics_ch11_004.',
          misconception: 'Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat currency (₹ notes).',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab sells 100 kg of wheat at ₹2,200 per quintal and receives payment via a cheque. He deposits the cheque in his savings account.', answer: 'the cheque, (',
                  options: ['the cheque, (', 'fiat currency (₹ notes) is \'not real money\''],
                  hint: 'If stuck, re-read c6_economics_ch11_002 (double coincidence) and c6_economics_ch11_004 (four.',
                  misconception: 'Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat currency (₹ notes) is \'not real money\'.' }
          ],
            remediations: { 'money-must-have-intrinsic-value': { steps: ['If the student cannot correctly match functions to scenarios or misclassifies instruments: (1) Revisit.', '(2) Do a \'Function Audit\' on 5 daily transactions (cash purchase, UPI transfer, saving pocket money, paying school fees.', '(3) Re-attempt Diagnostic Questions 3 and 5.', 'If still stuck, review the distinction between \'money\' (asset) and \'credit\' (liability) using the balance sheet.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat currency (₹ notes).',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: \'A credit card is money because it allows you to buy goods without cash.\' Consider all four functions of money in your evaluation.', answer: 'A credit card is NOT money',
                  options: ['A credit card is NOT money', 'fiat currency (₹ notes) is \'not real money\''],
                  hint: 'If stuck, re-read c6_economics_ch11_002 (double coincidence) and c6_economics_ch11_004 (four.',
                  misconception: 'Students often believe that \'money must have intrinsic value\' (like gold) and therefore think fiat currency (₹ notes) is \'not real money\'.' }
          ],
            remediations: { 'money-must-have-intrinsic-value': { steps: ['If the student cannot correctly match functions to scenarios or misclassifies instruments: (1) Revisit.', '(2) Do a \'Function Audit\' on 5 daily transactions (cash purchase, UPI transfer, saving pocket money, paying school fees.', '(3) Re-attempt Diagnostic Questions 3 and 5.', 'If still stuck, review the distinction between \'money\' (asset) and \'credit\' (liability) using the balance sheet.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_002', difficulty: 'standard',
          question: 'Money supply in India refers to the total stock of money circulating in the.',
          hint: 'If stuck on classification, revisit **c10_eco_cbse_03_002** (Modern Forms of Money.',
          misconception: '**Misconception:** "M3 = M1 + Time deposits of public with banks." **Why it\'s wrong:** M3 uses **net time deposits**.',
          parts: [
                { id: 'a', prompt: 'Explain why a ₹10 lakh fixed deposit in a commercial bank is included in M3 but NOT in M1. Use the concept of liquidity in your answer.', answer: 'A fixed deposit is a time deposit',
                  options: ['A fixed deposit is a time deposit', 'fixed deposits are not money'],
                  hint: 'If stuck on classification, revisit **c10_eco_cbse_03_002** (Modern Forms of Money: Currency and.',
                  misconception: '**Misconception:** "M3 = M1 + Time deposits of public with banks." **Why it\'s wrong:** M3 uses **net time deposits** (total time deposits.' },
                { id: 'b', prompt: 'Compare the liquidity hierarchy of M1, M2, M3, M4. If the RBI wants to measure the *total purchasing power immediately available* for spending in the economy.', answer: 'The RBI should use **M1**',
                  options: ['The RBI should use **M1**', 'it\'s the broadest measure used in policy'],
                  hint: 'If stuck on classification, revisit **c10_eco_cbse_03_002** (Modern Forms of Money: Currency and.',
                  misconception: '**Misconception:** "M3 = M1 + Time deposits of public with banks." **Why it\'s wrong:** M3 uses **net time deposits** (total time deposits.' }
          ],
            remediations: { 'misconception-m3-m1-time-deposits': { steps: ['If a student cannot distinguish net vs gross time deposits: 1.', 'Revisit **c12_eco_cbse_09_008** (Commercial Banks: Primary and Secondary Functions) — understand that banks hold.', 'Revisit **c12_eco_cbse_09_006** (CRR and SLR) — NDTL (Net Demand and Time Liabilities) is the base for CRR/SLR;.', 'Do this re-diagnostic: "A bank has total time deposits ₹100 cr, of which ₹15 cr are from other banks.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_003', difficulty: 'standard',
          question: 'The Reserve Bank of India (RBI) as the central bank performs two foundational.',
          hint: 'If confused about asset backing, revisit c6_economics_ch11_005 (commodity vs fiat money).',
          misconception: '**Misconception:** "RBI prints money and gives it to the government to spend — that\'s how the fiscal deficit.',
          parts: [
                { id: 'a', prompt: 'Compare the currency issue mechanism under the Proportional Reserve System (pre-1957) and the Minimum Reserve System (post-1957).', answer: '**Correct answer:** Minimum Reserve System allows greater elasticity',
                  options: ['**Correct answer:** Minimum Reserve System allows greater elasticity', 'reserve backing', 'flexibility'],
                  hint: 'If confused about asset backing, revisit c6_economics_ch11_005 (commodity vs fiat money) and.',
                  misconception: '**Misconception:** "RBI prints money and gives it to the government to spend — that\'s how the fiscal deficit is financed." **Why it\'s.' }
          ],
            remediations: { 'misconception-rbi-prints-money-and': { steps: ['** Revisit c10_eco_cbse_03_009 (Class 10 RBI role) — focus on the distinction between "issuing currency" and "managing.', '** Draw RBI\'s balance sheet: Assets (Gold, Foreign Exchange, Government Securities, Loans to Govt) | Liabilities.', '** Practice NCERT Exercise Q13 (Chapter 3): "Distinguish between currency issue and deficit financing." Write the.', '** Re-attempt Diagnostic Question 5 with the balance sheet framework.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_004', difficulty: 'standard',
          question: 'The Central Bank (RBI in India) acts as the **Banker\'s Bank** by holding the.',
          hint: 'If stuck on balance sheet effects, revisit Class 11 Accountancy nodes c11_acc_cbse_08_006.',
          misconception: '**Misconception:** "RBI\'s Lender of Last Resort is the same as the Repo window — banks just borrow at Repo Rate.',
          parts: [
                { id: 'a', prompt: 'A commercial bank has ₹500 crore in deposits and maintains CRR of 4% with RBI. It faces an unexpected withdrawal of ₹30 crore.', answer: '**Step 1:** Required CRR = 4% of ₹500 cr = ₹20 cr',
                  options: ['**Step 1:** Required CRR = 4% of ₹500 cr = ₹20 cr', 'distinguish'],
                  hint: 'If stuck on balance sheet effects, revisit Class 11 Accountancy nodes c11_acc_cbse_08_006 and.',
                  misconception: '**Misconception:** "RBI\'s Lender of Last Resort is the same as the Repo window — banks just borrow at Repo Rate whenever they need cash.".' }
          ],
            remediations: { 'misconception-rbi-s-lender-of': { steps: ['If the student cannot distinguish LOLR from Repo, or cannot apply Bagehot principles: 1.', 'Revisit **c12_eco_cbse_09_003** (Central Bank: Issuer of Currency) to recall RBI\'s balance sheet structure.', 'Revisit **c12_eco_cbse_09_007** (Repo Rate and Bank Rate) to master the rate hierarchy: Repo Rate (policy) < Bank Rate.', 'Do a **re-diagnostic**: Draw RBI\'s balance sheet before/after a ₹100 cr LOLR loan.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_005', difficulty: 'standard',
          question: 'Open Market Operations (OMO) refer to the purchase and sale of government.',
          hint: 'Review the money multiplier derivation in c12_eco_cbse_09_010 and the credit creation.',
          misconception: 'Students often think OMO directly changes the money supply (M3) by the same amount as the transaction.',
          parts: [
                { id: 'a', prompt: 'What is the immediate effect on the monetary base (high-powered money) when the RBI conducts an outright purchase of government securities from commercial.', answer: 'The monetary base increases by the exact amount of the purchase',
                  options: ['The monetary base increases by the exact amount of the purchase', 'money supply increases by the same amount', 'OMO directly changes the money supply (M3) by the same amount as the transaction'],
                  hint: 'Review the money multiplier derivation in c12_eco_cbse_09_010 and the credit creation example.',
                  misconception: 'Students often think OMO directly changes the money supply (M3) by the same amount as the transaction.' },
                { id: 'b', prompt: 'Suppose the RBI sells ₹5,000 crore of government securities to banks.', answer: 'Step 1: OMO sale reduces reserves (high-powered money) by ₹5,000 crore',
                  options: ['Step 1: OMO sale reduces reserves (high-powered money) by ₹5,000 crore', 'OMO directly changes the money supply (M3) by the same amount as the transaction'],
                  hint: 'Review the money multiplier derivation in c12_eco_cbse_09_010 and the credit creation example.',
                  misconception: 'Students often think OMO directly changes the money supply (M3) by the same amount as the transaction.' }
          ],
            remediations: { 'omo-directly-changes-the-money': { steps: ['If the student confuses monetary base with money supply, have them revisit c12_eco_cbse_09_010 (High-Powered Money and.', 'Then re-attempt Diagnostic Question 3 with a focus on tracing the multiplier steps: ΔH → ΔReserves → ΔDeposits → ΔM3.', 'Use a simple balance sheet of a bank to show how an initial reserve injection allows multiple rounds of lending.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_09_006', difficulty: 'standard',
          question: 'Cash Reserve Ratio (CRR) is the fraction of a commercial bank\'s net demand and.',
          hint: 'If NDTL is unclear, revisit c12_eco_cbse_09_002 (Money Supply Measures) and practice.',
          misconception: 'Students often believe that CRR and SLR reserves are "idle money" that banks cannot use at all.',
          parts: [
                { id: 'a', prompt: 'If a bank\'s NDTL is ₹500 crore, CRR is 4.5%, and SLR is 18%, calculate the amount the bank must hold as CRR reserves with RBI and as SLR assets.', answer: 'CRR reserve = 4.5% of ₹500 crore = ₹22.5 crore (held with RBI, interest-free)',
                  options: ['CRR reserve = 4.5% of ₹500 crore = ₹22.5 crore (held with RBI, interest-free)', 'idle money', 'CRR and SLR reserves are "idle money" that banks cannot use at all'],
                  hint: 'If NDTL is unclear, revisit c12_eco_cbse_09_002 (Money Supply Measures) and practice classifying.',
                  misconception: 'Students often believe that CRR and SLR reserves are "idle money" that banks cannot use at all.' },
                { id: 'b', prompt: 'The RBI reduces CRR from 4.5% to 4.0% while keeping SLR unchanged at 18%.', answer: 'Old rr = 0.045 + 0.18 = 0.225 → Old multiplier = 1/0.225 = 4.44',
                  options: ['Old rr = 0.045 + 0.18 = 0.225 → Old multiplier = 1/0.225 = 4.44', 'frozen', 'idle money', 'the simple formula applies perfectly'],
                  hint: 'If NDTL is unclear, revisit c12_eco_cbse_09_002 (Money Supply Measures) and practice classifying.',
                  misconception: 'Students often believe that CRR and SLR reserves are "idle money" that banks cannot use at all.' },
                { id: 'c', prompt: 'Compare the impact of a 1% increase in CRR versus a 1% increase in SLR on: (a) bank profitability, (b) government borrowing cost, and (c) transmission.', answer: 'bank profitability, (',
                  options: ['bank profitability, (', 'idle money', 'both affect profitability equally', 'CRR and SLR reserves are "idle money" that banks cannot use at all'],
                  hint: 'If NDTL is unclear, revisit c12_eco_cbse_09_002 (Money Supply Measures) and practice classifying.',
                  misconception: 'Students often believe that CRR and SLR reserves are "idle money" that banks cannot use at all.' }
          ],
            remediations: { 'crr-and-slr-reserves-are': { steps: ['If the student conflates CRR/SLR with the repo/reverse repo rates (c12_eco_cbse_09_007) or cannot compute the money.', '(2) Use a balance sheet template: Assets = Reserves (CRR + SLR) + Loans; Liabilities = Deposits (NDTL).', '(3) Practice numerical: "If NDTL = ₹1000 cr, CRR=4%, SLR=18%, show the balance sheet before/after a 1% CRR hike." (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
