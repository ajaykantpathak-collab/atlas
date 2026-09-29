import type { SimDef } from '../../engine/types';
import C10_EconomicsDeterminantsDemandNonpriceSim from '../../../simulations/c6_12/C10_EconomicsDeterminantsDemandNonpriceSim';

/** v3 wrapped master — C10_EconomicsDeterminantsDemandNonpriceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_economicsdeterminantsdemandnonpricesim: SimDef = {
    id: 'v3w_c10_economicsdeterminantsdemandnonpricesim',
    title: 'Loan Activities of Banks: Deposits and Lending Mechanism',
    subtitle: 'Covers the mechanics of deposit mobilisation, lending process, interest rate.',
    classLevel: 10, subject: 'economics', topic: 'Loan Activities of Banks: Deposits and Lending Mechanism',
    chapters: [],
    nodeIds: ['c10_eco_cbse_03_003', 'c10_eco_cbse_03_002', 'c10_eco_cbse_05_002', 'c10_eco_cbse_05_004', 'c10_eco_cbse_05_006', 'c10_eco_cbse_03_008', 'c10_eco_cbse_02_003', 'c10_eco_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you deposit ₹10,000 from your summer internship earnings into a savings account at a local bank.', goal: 'Master Loan Activities of Banks: Deposits and Lending Mechanism.' },
    discovery: {
        question: 'Riya has ₹50,000 in her savings account. She writes a cheque for ₹12,000 to Rohan. Rohan deposits the cheque in his current account.',
        options: ['Step 1: Identify initial demand deposits – Riya: ₹50,000', 'Money in my bank account is just a record', 'Bank deposits are not money, they are just claims'],
        answer: 'Step 1: Identify initial demand deposits – Riya: ₹50,000',
        hook: 'Students often think **"Money in my bank account is just a record; real money is only cash."** They write in exams:.',
    },
    teaching: [
        { title: 'Loan activities of banks refer to the.', text: 'Loan activities of banks refer to the process where banks accept deposits from the public (savings, current, fixed deposits) and lend a major portion of these funds as loans to borrowers.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_003', title: 'Loan activities of banks refer to the.',
          scaffold: { problem: 'A commercial bank receives a new fixed deposit of ₹2,00,000 for 2 years at 6% p.a. The current CRR is 4.5% and SLR is 18%.',
            steps: [
            { text: 'Identify the given data: Deposit = ₹2,00,000; CRR = 4.5% = 0.045; SLR = 18% = 0.18; Deposit rate = 6%; Lending rate =.' },
            { text: 'Calculate required reserves: CRR reserve = 0.045 × ₹2,00,000 = ₹9,000; SLR reserve = 0.18 × ₹2,00,000 = ₹36,000; Total.' },
            { text: 'Calculate maximum lendable amount = Deposit - Total reserves = ₹2,00,000 - ₹45,000 = ₹1,55,000.' },
            { text: 'Compute annual interest income from loan = 10% of ₹1,55,000 = ₹15,500.' },
            { text: 'Compute annual interest expense on deposit = 6% of ₹2,00,000 = ₹12,000.' },
            { text: 'Calculate gross spread = Interest income - Interest expense = ₹15,500 - ₹12,000 = ₹3,500.', faded: true, blankAnswer: '(a) ₹45,000 (b) ₹1,55,000 (c) ₹15,500 (d) ₹12,000 (e) ₹3,500' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_002', title: 'Modern forms of money in India consist.',
          scaffold: { problem: 'Arjun receives his monthly salary of ₹45,000 via NEFT into his savings account.',
            steps: [
            { text: 'Identify initial change – Salary credit of ₹45,000 increases Arjun\'s demand deposit by ₹45,000.' },
            { text: 'ATM withdrawal of ₹5,000 – Arjun\'s demand deposit falls by ₹5,000; currency with public rises by ₹5,000.' },
            { text: 'UPI rent payment of ₹12,000 – Arjun\'s demand deposit falls by ₹12,000; landlord\'s demand deposit rises by ₹12,000.' },
            { text: 'Debit card grocery ₹3,000 – Arjun\'s demand deposit falls by ₹3,000; merchant\'s demand deposit rises by ₹3,000.' },
            { text: 'Net change from start: Demand deposits = +₹45,000 – ₹5,000 – ₹12,000 – ₹3,000 = +₹25,000.', faded: true, blankAnswer: '(i) Currency with public: +₹5,000; (ii) Demand deposits:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_05_002', title: 'The four fundamental consumer rights —.',
          scaffold: { problem: 'Priya buys a 2-litre painted water bottle for ₹300 from a Mumbai street vendor. The bottle has no label, no brand name, no ISI mark.',
            steps: [
            { text: 'Identify the consumer and transaction — Priya, personal use, durable good (water bottle), ₹300.' },
            { text: 'Check Right to Safety — paint chipping into drinking water is a health hazard; no safety certification (ISI) → violated.' },
            { text: 'Check Right to Information — no label, no brand, no material composition, no manufacturer details → violated.' },
            { text: 'Check Right to Choice — only unbranded bottles sold; no alternative safe options displayed → violated.' },
            { text: 'Check Right to Redressal — vendor refuses refund/replacement for defective good → violated.' },
            { text: 'Legal remedy — File complaint at District Consumer Disputes Redressal Commission (jurisdiction: value < ₹1 crore) under.', faded: true, blankAnswer: 'All four rights violated. Remedy: Full refund of ₹300 +.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_05_004', title: 'The Consumer Disputes Redressal Forums.',
          scaffold: { problem: 'Riya purchased a washing machine for ₹38,000 from a local dealer. It malfunctioned within the warranty period.',
            steps: [
            { text: 'Identify the economic concept — pecuniary jurisdiction of Consumer Disputes Redressal Forums under the Consumer.' },
            { text: 'Recall the formula: Total Claim Value = Price of Goods/Services + Compensation Claimed.' },
            { text: 'Calculate total claim: ₹38,000 (refund) + ₹5,000 (compensation) = ₹43,000.' },
            { text: 'Compare with jurisdiction limits: District Commission up to ₹1 crore; State Commission ₹1 crore to ₹10 crore; National.' },
            { text: 'Since ₹43,000 ≤ ₹1 crore, the appropriate forum is the District Consumer Disputes Redressal Commission in Riya\'s.', faded: true, blankAnswer: 'District Consumer Disputes Redressal Commission (District.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_05_006', title: 'The Right to Be Heard and Represented.',
          scaffold: { problem: 'Riya, a Class 10 student in Delhi, bought a pair of branded sports shoes online for ₹3,499. After two weeks, the sole detached.',
            steps: [
            { text: 'Identify the right being exercised — Right to Be Heard (Section 2(9) of Consumer Protection Act, 2019: “right to be.' },
            { text: 'Choose the appropriate forum for an *individual* complaint with value up to ₹1 crore — **District Consumer Disputes.' },
            { text: 'Use the **e-Daakhil portal (edaakhil.nic.in)** — the online platform mandated by the Consumer Protection (Direct.' },
            { text: 'After filing, the Commission issues notice to the seller (opposite party).' },
            { text: 'The Commission passes an order. Even if the order dismisses the claim (e.g., defect due to misuse), Riya’s Right to Be.', faded: true, blankAnswer: 'Riya files on e-Daakhil portal → District Commission, Delhi.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_008', title: 'Informal credit dependence refers to.',
          scaffold: { problem: 'A sharecropper in West Bengal needs ₹25,000 for paddy cultivation.',
            steps: [
            { text: 'Identify the moneylender\'s terms: Principal = ₹25,000, Monthly rate = 4% = 0.04, Tenure = 6 months, Simple interest, no.' },
            { text: 'Calculate moneylender interest: Monthly interest = 0.04 × ₹25,000 = ₹1,000. Total for 6 months = ₹1,000 × 6 = ₹6,000.' },
            { text: 'Identify bank KCC terms: Annual rate = 7% = 0.07. Monthly rate = 0.07/12 ≈ 0.005833.' },
            { text: 'Calculate bank interest on declining balance: Month 1: 0.005833 × ₹25,000 = ₹145.83.' },
            { text: 'Compare: Moneylender = ₹6,000; Bank = ₹583.33. Ratio = 10.3x. Yet sharecropper chooses moneylender because: (a) no land.', faded: true, blankAnswer: 'Moneylender interest = ₹6,000; Bank interest = ₹583.33;.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_eco_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Loan Activities of Banks: Deposits and Lending Mechanism', spots: [
            { id: 's1', label: 'Loan activities of banks refer', prompt: 'Which idea is this? — Loan activities of banks refer to the process where banks accept deposits from the public.', answer: 'Loan activities of banks refer', options: ['Loan activities of banks refer', 'Modern forms of money in', 'The four fundamental consumer rights', 'The Consumer Disputes Redressal Forums'] },
            { id: 's2', label: 'Modern forms of money in', prompt: 'Which idea is this? — Modern forms of money in India consist of **currency** (paper notes and coins) issued by.', answer: 'Modern forms of money in', options: ['Modern forms of money in', 'Loan activities of banks refer', 'The four fundamental consumer rights', 'The Consumer Disputes Redressal Forums'] },
            { id: 's3', label: 'The four fundamental consumer rights', prompt: 'Which idea is this? — The four fundamental consumer rights — Safety, Information, Choice, and Redressal — are.', answer: 'The four fundamental consumer rights', options: ['The four fundamental consumer rights', 'Loan activities of banks refer', 'Modern forms of money in', 'The Consumer Disputes Redressal Forums'] },
            { id: 's4', label: 'The Consumer Disputes Redressal Forums', prompt: 'Which idea is this? — The Consumer Disputes Redressal Forums are a three-tier quasi-judicial machinery.', answer: 'The Consumer Disputes Redressal Forums', options: ['The Consumer Disputes Redressal Forums', 'Loan activities of banks refer', 'Modern forms of money in', 'The four fundamental consumer rights'] },
            { id: 's5', label: 'The Right to Be Heard', prompt: 'Which idea is this? — The Right to Be Heard and Represented ensures that consumers have the opportunity to.', answer: 'The Right to Be Heard', options: ['The Right to Be Heard', 'Loan activities of banks refer', 'Modern forms of money in', 'The four fundamental consumer rights'] },
            { id: 's6', label: 'Informal credit dependence refers to', prompt: 'Which idea is this? — Informal credit dependence refers to the reliance of low-income households on.', answer: 'Informal credit dependence refers to', options: ['Informal credit dependence refers to', 'Loan activities of banks refer', 'Modern forms of money in', 'The four fundamental consumer rights'] }
          ] } }
    ],
    explore: { component: C10_EconomicsDeterminantsDemandNonpriceSim, prompt: 'Explore the interactive — Loan Activities of Banks: Deposits and Lending Mechanism' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_003', difficulty: 'standard',
          question: 'Loan activities of banks refer to the process where banks accept deposits from.',
          hint: 'If stuck, revisit \'Types of Bank Accounts: Savings, Current, Fixed Deposit\'.',
          misconception: 'Students often believe that the money multiplier (1/CRR) gives the exact total money supply increase in the real.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Loan activities of banks refer to the process where banks accept deposits from the public',
                  options: ['Loan activities of banks refer to the process where banks accept deposits from the public', 'Modern forms of money in India consist of **currency** (paper notes and coins) issued by', 'The four fundamental consumer rights', 'The Consumer Disputes Redressal Forums are a three-tier quasi-judicial machinery'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the money multiplier (1/CRR) gives the exact total money supply increase in the real economy.' }
          ],
            remediations: { 'the-money-multiplier-1-crr': { steps: ['Revisit the money multiplier derivation with a numerical example (like Worked Example 3).', 'Introduce the concept of \'leakages\' — currency drain ratio (c) and excess reserve ratio (e) — and show the realistic.', 'Use RBI data (e.g., CRR=4.5%, currency with public ~15% of deposits, excess reserves ~1%) to compute actual multiplier.', 'Practice a board-style case question: "Why is actual credit creation lower than 1/CRR? Explain two reasons."'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_002', difficulty: 'standard',
          question: 'Modern forms of money in India consist of **currency** (paper notes and coins).',
          hint: 'If stuck, revisit **c6_economics_ch11_004 (Functions of Money)** and.',
          misconception: 'Students often think **"Money in my bank account is just a record; real money is only cash."** They write in exams:.',
          parts: [
                { id: 'a', prompt: 'Riya has ₹50,000 in her savings account. She writes a cheque for ₹12,000 to Rohan. Rohan deposits the cheque in his current account.', answer: 'Step 1: Identify initial demand deposits – Riya: ₹50,000',
                  options: ['Step 1: Identify initial demand deposits – Riya: ₹50,000', 'Money in my bank account is just a record', 'Bank deposits are not money, they are just claims'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"Money in my bank account is just a record; real money is only cash."** They write in exams: "Bank deposits are not.' },
                { id: 'b', prompt: 'Compare the following two statements and identify which is correct and why: Statement A: "Currency notes are money because they are made of special paper and.', answer: 'Statement B is correct',
                  options: ['Correct answer: Statement B is correct', 'Money in my bank account is just a record', 'Bank deposits are not money, they are just claims'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"Money in my bank account is just a record; real money is only cash."** They write in exams: "Bank deposits are not.' }
          ],
            remediations: { 'money-in-my-bank-account': { steps: ['Re-read the NCERT definition: "Money supply = Currency with public + Demand deposits with banks." 2.', 'Do a **real-life audit**: List 5 payments you made last week – how many used cash vs.', 'Realize most used bank deposits.', 'Trace a UPI payment: Open your banking app → see "Balance: ₹X" → that balance is a **liability of the bank to you**.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **"Money in my bank account is just a record; real money is only cash."** They write in exams:.',
          parts: [
                { id: 'a', prompt: 'Design a simple flowchart showing how a UPI payment of ₹500 from Person A (Bank X) to Person B (Bank Y) moves through the banking system.', answer: 'Expected flowchart (text description): 1',
                  options: ['Expected flowchart (text description): 1', 'Money in my bank account is just a record', 'Bank deposits are not money, they are just claims', 'Only currency issued by RBI is money'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"Money in my bank account is just a record; real money is only cash."** They write in exams: "Bank deposits are not.' },
                { id: 'b', prompt: 'Compare the following two statements and identify which is correct and why: Statement A: "Currency notes are money because they are made of special paper and.', answer: 'Statement B is correct',
                  options: ['Correct answer: Statement B is correct', 'Money in my bank account is just a record', 'Bank deposits are not money, they are just claims', 'Only currency issued by RBI is money'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"Money in my bank account is just a record; real money is only cash."** They write in exams: "Bank deposits are not.' }
          ],
            remediations: { 'money-in-my-bank-account': { steps: ['Re-read the NCERT definition: "Money supply = Currency with public + Demand deposits with banks." 2.', 'Do a **real-life audit**: List 5 payments you made last week – how many used cash vs.', 'Realize most used bank deposits.', 'Trace a UPI payment: Open your banking app → see "Balance: ₹X" → that balance is a **liability of the bank to you**.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_002', difficulty: 'standard',
          question: 'The four fundamental consumer rights — Safety, Information, Choice, and.',
          hint: 'Revisit c6_economics_ch12_005 (Consumer Awareness: Rights and Protection) and.',
          misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics,.',
          parts: [
                { id: 'a', prompt: 'A consumer buys a packet of biscuits but the packet does not mention the date of manufacture, expiry date, or ingredients. Which consumer right is violated?', answer: 'The Right to Information is violated',
                  options: ['The Right to Information is violated', 'Right to Safety'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' },
                { id: 'b', prompt: 'In a village fair, a shopkeeper sells only one brand of toothpaste at ₹50 per tube, claiming "no other stock".', answer: 'Right to Choice is violated',
                  options: ['Right to Choice is violated', 'Right to Safety'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' },
                { id: 'c', prompt: 'Compare two situations: (A) A mobile phone battery explodes while charging, injuring the user.', answer: '(A) Right to Safety violated',
                  options: ['(A) Right to Safety violated', 'Right to Safety'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' }
          ],
            remediations: { 'right-to-safety-only-applies': { steps: ['List 5 non-food items you use daily (e.g., phone charger, LPG stove, school bus, elevator, mosquito coil).', 'For each, write one safety hazard if defective.', 'Check if each has ISI/BIS/Hallmark — if not, Right to Safety is at risk.', 'Read Section 2(9) of Consumer Protection Act 2019 definition of "defect" — note it includes "any fault...', 'Re-attempt Diagnostic Q4 distinguishing Safety vs Redressal.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics,.',
          parts: [
                { id: 'a', prompt: '"Right to Choice means a consumer can demand any product at any price they want." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Right to Safety'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' },
                { id: 'b', prompt: 'Create a 4-panel comic strip storyboard (describe each panel in 1-2 sentences) showing a consumer experiencing violation of all four rights while buying a.', answer: 'Panel 1: Ramesh buys a ceiling fan from "Bharat Electronics"',
                  options: ['Panel 1: Ramesh buys a ceiling fan from "Bharat Electronics"', 'Right to Safety'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Right to Safety" only applies to food and medicines, not to durable goods like electronics, vehicles, or construction.' }
          ],
            remediations: { 'right-to-safety-only-applies': { steps: ['List 5 non-food items you use daily (e.g., phone charger, LPG stove, school bus, elevator, mosquito coil).', 'For each, write one safety hazard if defective.', 'Check if each has ISI/BIS/Hallmark — if not, Right to Safety is at risk.', 'Read Section 2(9) of Consumer Protection Act 2019 definition of "defect" — note it includes "any fault...', 'Re-attempt Diagnostic Q4 distinguishing Safety vs Redressal.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_004', difficulty: 'standard',
          question: 'The Consumer Disputes Redressal Forums are a three-tier quasi-judicial.',
          hint: 'If stuck on jurisdiction limits, revisit c10_eco_cbse_05_003 (COPRA provisions) and.',
          misconception: 'Students often believe that the type of product (e.g., car vs. phone) or the brand (big company vs.',
          parts: [
                { id: 'a', prompt: 'Compare the composition of the District Commission and the National Commission. How does the difference reflect the complexity of cases they handle?', answer: 'District Commission: President + 2 members (one must be a woman)',
                  options: ['District Commission: President + 2 members (one must be a woman)', 'the type of product (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the type of product (e.g., car vs. phone) or the brand (big company vs. small shop) determines the forum.' }
          ],
            remediations: { 'the-type-of-product-e': { steps: ['Re-read the pecuniary limits table in the textbook (or this node\'s definition).', 'Practice 5 numerical problems where you calculate total claim value (include compensation) and pick the forum.', 'Draw the appeal hierarchy (District → State → National → Supreme Court) on a flashcard.', 'Explain aloud why a ₹50 lakh claim against a multinational company still goes to District Commission — this reinforces.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the type of product (e.g., car vs. phone) or the brand (big company vs.',
          parts: [
                { id: 'a', prompt: 'Compare the composition of the District Commission and the National Commission. How does the difference reflect the complexity of cases they handle?', answer: 'District Commission: President + 2 members (one must be a woman)',
                  options: ['District Commission: President + 2 members (one must be a woman)', 'the type of product (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the type of product (e.g., car vs. phone) or the brand (big company vs. small shop) determines the forum.' }
          ],
            remediations: { 'the-type-of-product-e': { steps: ['Re-read the pecuniary limits table in the textbook (or this node\'s definition).', 'Practice 5 numerical problems where you calculate total claim value (include compensation) and pick the forum.', 'Draw the appeal hierarchy (District → State → National → Supreme Court) on a flashcard.', 'Explain aloud why a ₹50 lakh claim against a multinational company still goes to District Commission — this reinforces.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_006', difficulty: 'standard',
          question: 'The Right to Be Heard and Represented ensures that consumers have the.',
          hint: 'If stuck, revisit the six consumer rights (c10_eco_cbse_05_002) and the key sections of.',
          misconception: 'Students believe “Right to Be Heard” means the seller/government **must agree** with the consumer’s demand.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Right to Be Heard and Represented ensures that consumers have the opportunity to',
                  options: ['The Right to Be Heard and Represented ensures that consumers have the opportunity to', 'Loan activities of banks refer to the process where banks accept deposits from the public', 'Modern forms of money in India consist of **currency** (paper notes and coins) issued by', 'The four fundamental consumer rights'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe “Right to Be Heard” means the seller/government **must agree** with the consumer’s demand.' }
          ],
            remediations: { 'right-to-be-heard-means': { steps: ['If the student confuses “being heard” with “winning the case”: 1.', '**Draw a two-column table** on paper: Column A = “Right to Be Heard (Procedure)”, Column B = “Right to Redressal.', '**Fill Column A** with: file complaint → receive hearing notice → present evidence → argue case → receive order (even.', '**Fill Column B** with: order grants refund/replacement/compensation/cease-and-desist.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe “Right to Be Heard” means the seller/government **must agree** with the consumer’s demand.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: “The Right to Be Heard is meaningless without the Right to Information.” Use the example of a consumer trying to challenge a hidden fee.', answer: 'The statement is **correct**',
                  options: ['The statement is **correct**', 'they are separate rights', 'Right to Be Heard', 'Assertion false, Reason true'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe “Right to Be Heard” means the seller/government **must agree** with the consumer’s demand.' },
                { id: 'b', prompt: 'Design a 3-step action plan for a Class 10 student who discovers that the school canteen sells packaged snacks **without the FSSAI license number** on the.', answer: '**Step 1 (School level',
                  options: ['**Step 1 (School level', 'Right to Be Heard', 'Assertion false, Reason true'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe “Right to Be Heard” means the seller/government **must agree** with the consumer’s demand.' }
          ],
            remediations: { 'right-to-be-heard-means': { steps: ['If the student confuses “being heard” with “winning the case”: 1.', '**Draw a two-column table** on paper: Column A = “Right to Be Heard (Procedure)”, Column B = “Right to Redressal.', '**Fill Column A** with: file complaint → receive hearing notice → present evidence → argue case → receive order (even.', '**Fill Column B** with: order grants refund/replacement/compensation/cease-and-desist.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_008', difficulty: 'standard',
          question: 'Informal credit dependence refers to the reliance of low-income households on.',
          hint: 'If stuck, revisit c10_eco_cbse_03_005 (Terms of Credit) and create a table: Term | Formal.',
          misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with.',
          parts: [
                { id: 'a', prompt: 'Calculate the total interest paid over 2 years on a ₹20,000 loan from: (a) a moneylender charging 3% per month simple interest with no principal repayment, and.', answer: '**Step 1:** Moneylender: Monthly interest = 3% × ₹20,000 = ₹600',
                  options: ['**Step 1:** Moneylender: Monthly interest = 3% × ₹20,000 = ₹600', 'poor people prefer informal credit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' },
                { id: 'b', prompt: 'Compare the credit access barriers for: (i) a tenant farmer in Punjab leasing 2 hectares, (ii) a street vendor in Mumbai with daily cash flow but no shop.', answer: '(i) Tenant farmer: **Collateral barrier**',
                  options: ['(i) Tenant farmer: **Collateral barrier**', 'high interest rates', 'poor people prefer informal credit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' }
          ],
            remediations: { 'poor-people-prefer-informal-credit': { steps: ['** Revisit c10_eco_cbse_03_005 (Terms of Credit) — list the 4 formal credit terms (interest rate, collateral,.', '** Use the ₹20,000/2-year calculation from Diagnostic 3 — redo it with compound interest for the moneylender (5%.', '** Read the RBI\'s "Priority Sector Lending — Weaker Sections" circular (2023) — note the 40% ANBC target for weaker.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Self-Help Groups (SHGs) solve the poor\'s credit problem by replacing moneylenders with banks." Use the concepts of social collateral,.', answer: 'The statement is **partially correct but incomplete**',
                  options: ['The statement is **partially correct but incomplete**', 'poor people prefer informal credit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' },
                { id: 'b', prompt: 'Design a credit product for a seasonal migrant construction worker in Delhi who earns ₹600/day for 8 months/year, has no ID proof in Delhi, and sends.', answer: '**Product:** "Migrant Flexi-Loan"',
                  options: ['**Product:** "Migrant Flexi-Loan"', 'poor people prefer informal credit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' },
                { id: 'c', prompt: 'Compare the credit access barriers for: (i) a tenant farmer in Punjab leasing 2 hectares, (ii) a street vendor in Mumbai with daily cash flow but no shop.', answer: '(i) Tenant farmer: **Collateral barrier**',
                  options: ['(i) Tenant farmer: **Collateral barrier**', 'high interest rates', 'poor people prefer informal credit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' }
          ],
            remediations: { 'poor-people-prefer-informal-credit': { steps: ['** Revisit c10_eco_cbse_03_005 (Terms of Credit) — list the 4 formal credit terms (interest rate, collateral,.', '** Use the ₹20,000/2-year calculation from Diagnostic 3 — redo it with compound interest for the moneylender (5%.', '** Read the RBI\'s "Priority Sector Lending — Weaker Sections" circular (2023) — note the 40% ANBC target for weaker.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
