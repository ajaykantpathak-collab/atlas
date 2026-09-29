import type { SimDef } from '../../engine/types';
import C10_EconApplicationsRoleCommercialBanksSim from '../../../simulations/c6_12/C10_EconApplicationsRoleCommercialBanksSim';

/** v3 wrapped master — C10_EconApplicationsRoleCommercialBanksSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_econapplicationsrolecommercialbankssim: SimDef = {
    id: 'v3w_c10_econapplicationsrolecommercialbankssim',
    title: 'Modern Forms of Money: Currency and Bank Deposits',
    subtitle: 'Covers: (1) Currency – RBI issuance, legal tender status, denominations, fiat nature; (2).',
    classLevel: 10, subject: 'economics', topic: 'Modern Forms of Money: Currency and Bank Deposits',
    chapters: [],
    nodeIds: ['c10_eco_cbse_03_002', 'c10_eco_cbse_03_009', 'c10_eco_cbse_03_006', 'c10_eco_cbse_03_003', 'c10_eco_cbse_03_001', 'c10_eco_cbse_03_007', 'c10_eco_cbse_03_008', 'c10_eco_cbse_03_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you buy a textbook for ₹450. You can pay with a ₹500 note (currency) or scan a UPI QR code (bank.', goal: 'Master n Applications Role Commercial Banks.' },
    discovery: {
        question: 'Riya has ₹50,000 in her savings account. She writes a cheque for ₹12,000 to Rohan. Rohan deposits the cheque in his current account.',
        options: ['Step 1: Identify initial demand deposits – Riya: ₹50,000', 'Money in my bank account is just a record', 'Bank deposits are not money, they are just claims'],
        answer: 'Step 1: Identify initial demand deposits – Riya: ₹50,000',
        hook: 'Students often think **"Money in my bank account is just a record; real money is only cash."** They write in exams:.',
    },
    teaching: [
        { title: 'Modern forms of money in India consist of.', text: 'Modern forms of money in India consist of **currency** (paper notes and coins) issued by the Reserve Bank of India (RBI) on behalf of the central government, and **bank deposits** (demand deposits).', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
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
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_006', title: 'Formal credit sources are institutions.',
          scaffold: { problem: 'A small trader in Varanasi needs ₹1,00,000 for 6 months to stock festival inventory.',
            steps: [
            { text: 'Identify the given data — Principal = ₹1,00,000, Time = 6 months = 0.5 years.' },
            { text: 'Convert moneylender\'s monthly rate to annual rate for comparison: 3% × 12 = 36% p.a.' },
            { text: 'Calculate bank interest for 6 months: Simple Interest = (1,00,000 × 10 × 0.5) / 100 = ₹5,000.' },
            { text: 'Calculate moneylender interest for 6 months: Simple Interest = (1,00,000 × 18) / 100 = ₹18,000.' },
            { text: 'Compare: Bank interest ₹5,000 vs Moneylender ₹18,000. Bank is cheaper by ₹13,000.', faded: true, blankAnswer: 'Bank interest = ₹5,000; Moneylender interest = ₹18,000;.' }
            ] } },
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
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_001', title: 'Money as a medium of exchange is an.',
          scaffold: { problem: 'A vegetable vendor in Mumbai sells 50 kg of tomatoes at ₹40/kg. He wants to buy a second-hand smartphone worth ₹8,000.',
            steps: [
            { text: 'Calculate total revenue from tomato sales: 50 kg × ₹40/kg = ₹2,000. This is the money income earned by selling output.' },
            { text: 'Identify the barter limitations: (a) Double coincidence — smartphone seller unlikely to want 50 kg tomatoes; (b).' },
            { text: 'Explain money\'s role: Vendor receives ₹2,000 cash (medium of exchange).' },
            { text: 'Note that the vendor must save ₹2,000 daily for 4 days to accumulate ₹8,000 — money bridges the time gap between.' },
            { text: 'Conclude that without money, the vendor could never convert perishable, low-value daily output into a high-value.', faded: true, blankAnswer: 'Total tomato revenue = ₹2,000. Money resolves all three.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_007', title: 'A Self-Help Group (SHG) is a small,.',
          scaffold: { problem: 'An SHG in Odisha has 12 members. Each saves ₹80/week. After 10 weeks, the group lends ₹8,000 to Member A for a sewing machine at 1.5% per.',
            steps: [
            { text: 'Identify given data — 12 members, ₹80/week, 10 weeks, loan ₹8,000 @ 1.5%/month for 10 months, reserve ₹1,600.' },
            { text: 'Calculate total savings = 12 × 80 × 10 = ₹9,600.' },
            { text: 'Calculate simple interest on loan = (8,000 × 1.5 × 10)/100 = ₹1,200.' },
            { text: 'Final corpus = Total savings + Interest earned - Emergency reserve (since reserve is part of corpus, not subtracted) =.' },
            { text: 'Corpus per member = ₹10,800 / 12 = ₹900.', faded: true, blankAnswer: '(a) ₹9,600, (b) ₹1,200, (c) ₹10,800, (d) ₹900 per member.' }
            ] } }
    ],
    explore: { component: C10_EconApplicationsRoleCommercialBanksSim, prompt: 'Explore the interactive — n Applications Role Commercial Banks' },
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
            remediations: { 'misconception-rbi-prints-money-whenever': { steps: ['**Revisit Class 7 node `c7_eco_ch04_011` (RBI: Central Bank)** — specifically the distinction between *currency.', '**Draw a T-account of RBI**: Left side (Assets: Gold, FX, Govt Securities); Right side (Liabilities: Notes Issued,.', 'Show that every ₹100 note issued requires ₹100 asset backing — RBI cannot expand liabilities without assets.', '**Contrast with Government Budget**: Use a simple table — Government: Revenue (Tax) + Borrowing (Bonds) = Expenditure.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_006', difficulty: 'standard',
          question: 'Formal credit sources are institutions registered and regulated by the Reserve.',
          hint: 'If stuck, revisit c10_eco_cbse_03_005 (Terms of Credit) and c6_economics_ch08_003.',
          misconception: 'Students believe that "informal credit is only used by the poor because they are uneducated" — the reality is that even.',
          parts: [
                { id: 'a', prompt: 'A borrower takes a ₹20,000 loan from a moneylender at 5% per month simple interest.', answer: 'Moneylender: 5% per month × 12 = 60% per annum',
                  options: ['Moneylender: 5% per month × 12 = 60% per annum', 'informal credit is only used by the poor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "informal credit is only used by the poor because they are uneducated" — the reality is that even educated small.' },
                { id: 'b', prompt: 'Compare the collateral requirements of a bank loan and a moneylender loan for a small farmer who owns 1 hectare of land but has no formal land title.', answer: 'Banks require legal collateral (land title deeds)',
                  options: ['Banks require legal collateral (land title deeds)', 'moneylender doesn\'t ask for collateral so it\'s better', 'informal credit is only used by the poor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "informal credit is only used by the poor because they are uneducated" — the reality is that even educated small.' }
          ],
            remediations: { 'informal-credit-is-only-used': { steps: ['Revisit the worked example comparing interest calculations (Diagnostic Q3) — practice converting monthly to annual.', 'Draw a two-column table: Formal vs Informal — fill in interest rate range, collateral type, documentation, speed, RBI.', 'Read the case study of a marginal farmer in the textbook (or NCERT example) and identify which barriers are price vs.', 'Explain to a peer why capping moneylender rates without expanding bank access can worsen credit availability — use the.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "informal credit is only used by the poor because they are uneducated" — the reality is that even.',
          parts: [
                { id: 'a', prompt: 'Construct a scenario where a rural household uses both formal and informal credit for different purposes.', answer: 'Example: Household takes a Kisan Credit Card loan from a bank at 7% p.a',
                  options: ['Example: Household takes a Kisan Credit Card loan from a bank at 7% p.a', 'informal credit is only used by the poor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "informal credit is only used by the poor because they are uneducated" — the reality is that even educated small.' },
                { id: 'b', prompt: 'Compare the collateral requirements of a bank loan and a moneylender loan for a small farmer who owns 1 hectare of land but has no formal land title.', answer: 'Banks require legal collateral (land title deeds)',
                  options: ['Banks require legal collateral (land title deeds)', 'moneylender doesn\'t ask for collateral so it\'s better', 'informal credit is only used by the poor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "informal credit is only used by the poor because they are uneducated" — the reality is that even educated small.' }
          ],
            remediations: { 'informal-credit-is-only-used': { steps: ['Revisit the worked example comparing interest calculations (Diagnostic Q3) — practice converting monthly to annual.', 'Draw a two-column table: Formal vs Informal — fill in interest rate range, collateral type, documentation, speed, RBI.', 'Read the case study of a marginal farmer in the textbook (or NCERT example) and identify which barriers are price vs.', 'Explain to a peer why capping moneylender rates without expanding bank access can worsen credit availability — use the.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_003', difficulty: 'standard',
          question: 'Loan activities of banks refer to the process where banks accept deposits from.',
          hint: 'If stuck, revisit \'Types of Bank Accounts: Savings, Current, Fixed Deposit\'.',
          misconception: 'Students often believe that the money multiplier (1/CRR) gives the exact total money supply increase in the real.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Loan activities of banks refer to the process where banks accept deposits from the public',
                  options: ['Loan activities of banks refer to the process where banks accept deposits from the public', 'Modern forms of money in India consist of **currency** (paper notes and coins) issued by', 'The Reserve Bank of India (RBI) is India\'s central banking institution, established under', 'Formal credit sources are institutions registered and regulated by the Reserve Bank of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the money multiplier (1/CRR) gives the exact total money supply increase in the real economy.' }
          ],
            remediations: { 'the-money-multiplier-1-crr': { steps: ['Revisit the money multiplier derivation with a numerical example (like Worked Example 3).', 'Introduce the concept of \'leakages\' — currency drain ratio (c) and excess reserve ratio (e) — and show the realistic.', 'Use RBI data (e.g., CRR=4.5%, currency with public ~15% of deposits, excess reserves ~1%) to compute actual multiplier.', 'Practice a board-style case question: "Why is actual credit creation lower than 1/CRR? Explain two reasons."'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_001', difficulty: 'standard',
          question: 'Money as a medium of exchange is an asset that is universally accepted in an.',
          hint: 'If stuck, revisit c6_economics_ch11_002 (Problems with Barter: Double Coincidence of.',
          misconception: 'Students often believe the barter system\'s only problem is "inconvenience" or "difficulty in finding trading partners,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Money as a medium of exchange is an asset that is universally accepted in an economy to',
                  options: ['Money as a medium of exchange is an asset that is universally accepted in an economy to', 'Modern forms of money in India consist of **currency** (paper notes and coins) issued by', 'The Reserve Bank of India (RBI) is India\'s central banking institution, established under', 'Formal credit sources are institutions registered and regulated by the Reserve Bank of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the barter system\'s only problem is "inconvenience" or "difficulty in finding trading partners," and that money.' }
          ],
            remediations: { 'the-barter-system-s-only': { steps: ['Draw a 3-good barter matrix (Wheat, Shoes, Pots) on paper and list all 3 pairwise exchange rates needed.', 'Add a 4th good (Milk) and calculate the new total exchange rates (6).', 'Show that with money, only 4 money prices are needed regardless of the number of goods.', 'Use a real Indian example — a textile mill in Surat — and ask: "How would the mill owner pay 2,000 workers, buy cotton.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the barter system\'s only problem is "inconvenience" or "difficulty in finding trading partners,".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The barter system works perfectly well in a small village where everyone knows each other and produces different goods." Use at least.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'it works because they trust each other', 'inconvenience', 'difficulty in finding trading partners'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the barter system\'s only problem is "inconvenience" or "difficulty in finding trading partners," and that money.' }
          ],
            remediations: { 'the-barter-system-s-only': { steps: ['Draw a 3-good barter matrix (Wheat, Shoes, Pots) on paper and list all 3 pairwise exchange rates needed.', 'Add a 4th good (Milk) and calculate the new total exchange rates (6).', 'Show that with money, only 4 money prices are needed regardless of the number of goods.', 'Use a real Indian example — a textile mill in Surat — and ask: "How would the mill owner pay 2,000 workers, buy cotton.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_007', difficulty: 'standard',
          question: 'A Self-Help Group (SHG) is a small, voluntary association of 10–20 poor people,.',
          hint: 'If stuck, revisit **c10_eco_cbse_03_005 (Terms of Credit)** and draw a flowchart: No.',
          misconception: 'Students think **SHGs are a type of bank** or **NGO-run charity**.',
          parts: [
                { id: 'a', prompt: 'An SHG of 15 members saves ₹100 per member per month. After 6 months, they lend ₹45,000 to one member at 2% per month simple interest for 12 months.', answer: '**Step 1:** Principal = ₹45,000',
                  options: ['**Step 1:** Principal = ₹45,000', '**SHGs are a type of bank** or **NGO-run charity**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think **SHGs are a type of bank** or **NGO-run charity**.' },
                { id: 'b', prompt: 'Compare the credit delivery chain of an SHG-Bank Linkage Programme (SBLP) loan vs. a direct bank loan to a poor farmer.', answer: '**SHG route:** Bank → SHG (single account) → Member (internal lending)',
                  options: ['**SHG route:** Bank → SHG (single account) → Member (internal lending)', 'lower interest rate', '**SHGs are a type of bank** or **NGO-run charity**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think **SHGs are a type of bank** or **NGO-run charity**.' }
          ],
            remediations: { 'shgs-are-a-type-of': { steps: ['Revisit **c10_eco_cbse_03_005 (Terms of Credit)**: list collateral, interest rate, documentation for bank vs.', 'Watch a 5-min video of an actual SHG meeting (e.g., Kudumbashree, Kerala) — note who keeps the keys, who writes the.', 'Role-play: 5 students act as SHG members, 1 as bank manager.', 'Practice the **grading interview** — this makes the "social collateral" concept concrete.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think **SHGs are a type of bank** or **NGO-run charity**.',
          parts: [
                { id: 'a', prompt: 'Compare the credit delivery chain of an SHG-Bank Linkage Programme (SBLP) loan vs. a direct bank loan to a poor farmer.', answer: '**SHG route:** Bank → SHG (single account) → Member (internal lending)',
                  options: ['**SHG route:** Bank → SHG (single account) → Member (internal lending)', 'lower interest rate', '**SHGs are a type of bank** or **NGO-run charity**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think **SHGs are a type of bank** or **NGO-run charity**.' }
          ],
            remediations: { 'shgs-are-a-type-of': { steps: ['Revisit **c10_eco_cbse_03_005 (Terms of Credit)**: list collateral, interest rate, documentation for bank vs.', 'Watch a 5-min video of an actual SHG meeting (e.g., Kudumbashree, Kerala) — note who keeps the keys, who writes the.', 'Role-play: 5 students act as SHG members, 1 as bank manager.', 'Practice the **grading interview** — this makes the "social collateral" concept concrete.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
