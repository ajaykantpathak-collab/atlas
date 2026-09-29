import type { SimDef } from '../../engine/types';
import C10_EconApplicationsElasticitySupplyMeaningSim from '../../../simulations/c6_12/C10_EconApplicationsElasticitySupplyMeaningSim';

/** v3 wrapped master — C10_EconApplicationsElasticitySupplyMeaningSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_econapplicationselasticitysupplymeaningsim: SimDef = {
    id: 'v3w_c10_econapplicationselasticitysupplymeaningsim',
    title: 'Modern Forms of Money: Currency and Bank Deposits',
    subtitle: 'Covers: (1) Currency – RBI issuance, legal tender status, denominations, fiat nature; (2).',
    classLevel: 10, subject: 'economics', topic: 'Modern Forms of Money: Currency and Bank Deposits',
    chapters: [],
    nodeIds: ['c10_eco_cbse_03_002', 'c10_eco_cbse_03_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you buy a textbook for ₹450. You can pay with a ₹500 note (currency) or scan a UPI QR code (bank.', goal: 'Master n Applications Elasticity Supply Meaning.' },
    discovery: {
        question: 'Riya has ₹50,000 in her savings account. She writes a cheque for ₹12,000 to Rohan. Rohan deposits the cheque in his current account.',
        options: ['Step 1: Identify initial demand deposits – Riya: ₹50,000', 'Money in my bank account is just a record', 'Bank deposits are not money, they are just claims'],
        answer: 'Step 1: Identify initial demand deposits – Riya: ₹50,000',
        hook: 'Students often think **"Money in my bank account is just a record; real money is only cash."** They write in exams:.',
    },
    teaching: [
        { title: 'Modern forms of money in India consist of.', text: 'Modern forms of money in India consist of **currency** (paper notes and coins) issued by the Reserve Bank of India (RBI) on behalf of the central government, and **bank deposits** (demand deposits).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_002', title: 'Modern forms of money in India consist.',
          scaffold: { problem: 'Arjun receives his monthly salary of ₹45,000 via NEFT into his savings account.',
            steps: [
            { text: 'Identify initial change – Salary credit of ₹45,000 increases Arjun\'s demand deposit by ₹45,000.' },
            { text: 'ATM withdrawal of ₹5,000 – Arjun\'s demand deposit falls by ₹5,000; currency with public rises by ₹5,000.' },
            { text: 'UPI rent payment of ₹12,000 – Arjun\'s demand deposit falls by ₹12,000; landlord\'s demand deposit rises by ₹12,000.' },
            { text: 'Debit card grocery ₹3,000 – Arjun\'s demand deposit falls by ₹3,000; merchant\'s demand deposit rises by ₹3,000.' },
            { text: 'Net change from start: Demand deposits = +₹45,000 – ₹5,000 – ₹12,000 – ₹3,000 = +₹25,000.', faded: true, blankAnswer: '(i) Currency with public: +₹5,000; (ii) Demand deposits:.' }
            ] } },
        { type: 'case', nodeId: 'c10_eco_cbse_03_009', title: 'The Reserve Bank of India (RBI) is.',
          caseStudy: { intro: 'Imagine you withdraw ₹2,000 from an ATM in Delhi — the crisp new notes bear the signature of the RBI Governor, not the bank manager.',
            decisions: [{ prompt: '**REMEMBER**: State the specific section of the RBI Act, 1934 that grants RBI the sole right to issue banknotes in India, and mention the.', options: [
                { text: '**Correct Answer**: Section 22 of the RBI Act, 1934 grants RBI the sole right to issue', outcome: '**Correct Answer**: Section 22 of the RBI Act, 1934 grants RBI the sole right to issue banknotes.' },
                { text: 'RBI prints all money including coins', outcome: 'Not quite — **Misconception**: "RBI prints money whenever the government needs funds for schemes like PM-KISAN.', reveals: 'misconception-rbi-prints-money-whenever' },
                { text: 'Government prints notes', outcome: 'Not quite — **Misconception**: "RBI prints money whenever the government needs funds for schemes like PM-KISAN.', reveals: 'misconception-rbi-prints-money-whenever' }
            ] }] } }
    ],
    explore: { component: C10_EconApplicationsElasticitySupplyMeaningSim, prompt: 'Explore the interactive — n Applications Elasticity Supply Meaning' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_009', difficulty: 'standard',
          question: 'The Reserve Bank of India (RBI) is India\'s central banking institution,.',
          hint: 'If stuck, revisit `c10_eco_cbse_03_003` (Loan Activities of Banks) and trace how a ₹100.',
          misconception: '**Misconception**: "RBI prints money whenever the government needs funds for schemes like PM-KISAN or infrastructure.".',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND**: Explain why RBI requires commercial banks to maintain a Cash Reserve Ratio (CRR) with itself, and what would happen to the banking system if.', answer: '**Correct Answer**: CRR ensures two things: (1) **Liquidity safety**',
                  options: ['**Correct Answer**: CRR ensures two things: (1) **Liquidity safety**', 'CRR is a tax on banks', 'RBI uses CRR money for its expenses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "RBI prints money whenever the government needs funds for schemes like PM-KISAN or infrastructure." **Exact Wrong.' }
          ],
            remediations: { 'misconception-rbi-prints-money-whenever': { steps: ['**Revisit Class 7 node `c7_eco_ch04_011` (RBI: Central Bank)** — specifically the distinction between *currency.', '**Draw a T-account of RBI**: Left side (Assets: Gold, FX, Govt Securities); Right side (Liabilities: Notes Issued,.', 'Show that every ₹100 note issued requires ₹100 asset backing — RBI cannot expand liabilities without assets.', '**Contrast with Government Budget**: Use a simple table — Government: Revenue (Tax) + Borrowing (Bonds) = Expenditure.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "RBI prints money whenever the government needs funds for schemes like PM-KISAN or infrastructure.".',
          parts: [
                { id: 'a', prompt: '**EVALUATE**: "RBI should stop regulating interest rates on savings accounts and let banks compete freely." Assess this statement from the perspective of.', answer: '**Correct Answer**: **Disagree',
                  options: ['**Correct Answer**: **Disagree', 'Free competition always benefits customers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "RBI prints money whenever the government needs funds for schemes like PM-KISAN or infrastructure." **Exact Wrong.' },
                { id: 'b', prompt: '**CREATE**: Design a simple flowchart (text-based) showing the journey of a ₹500 note from RBI printing press to a farmer\'s hand in a village, labeling the.', answer: '**Expected Answer Criteria**: Flowchart must include: 1',
                  options: ['**Expected Answer Criteria**: Flowchart must include: 1', 'Currency Chests'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "RBI prints money whenever the government needs funds for schemes like PM-KISAN or infrastructure." **Exact Wrong.' }
          ],
            remediations: { 'misconception-rbi-prints-money-whenever': { steps: ['**Revisit Class 7 node `c7_eco_ch04_011` (RBI: Central Bank)** — specifically the distinction between *currency.', '**Draw a T-account of RBI**: Left side (Assets: Gold, FX, Govt Securities); Right side (Liabilities: Notes Issued,.', 'Show that every ₹100 note issued requires ₹100 asset backing — RBI cannot expand liabilities without assets.', '**Contrast with Government Budget**: Use a simple table — Government: Revenue (Tax) + Borrowing (Bonds) = Expenditure.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
