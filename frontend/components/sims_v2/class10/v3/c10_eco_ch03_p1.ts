import type { SimDef } from '../../engine/types';

/** v3 generated — c10_eco_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_eco_ch03_p1: SimDef = {
    id: 'v3_c10_eco_ch03_p1',
    title: 'Money and Credit · Part 1/2',
    subtitle: 'From barter chaos to UPI — what makes money, money',
    classLevel: 10, subject: 'economics', topic: 'Money and Credit · Part 1/2',
    chapters: ['c10_eco_ch03'],
    nodeIds: ['c10_eco_cbse_03_001', 'c10_eco_cbse_03_002', 'c10_eco_cbse_03_003', 'c10_eco_cbse_03_004', 'c10_eco_cbse_03_005', 'c10_eco_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village trader trying to escape the barter trap', intro: 'In a remote haat, a trader can\'t sell his cloth because the farmers don\'t want what he brought. One invention would fix it — and you carry it in your pocket.', goal: 'Explain double coincidence of wants, and treat demand deposits as real money alongside currency.' },
    discovery: {
        question: 'The ₹500 note in your pocket is just paper — why does a shopkeeper accept it?',
        options: ['Everyone trusts it can be exchanged for goods', 'The paper has intrinsic value', 'The RBI stores gold for every note', 'Law forces acceptance at gunpoint'],
        answer: 'Everyone trusts it can be exchanged for goods',
        hook: 'Money is a promise we all keep together. Break the trust and paper becomes paper again.',
    },
    teaching: [
        { title: 'Money as a Medium of Exchange: Barter System and Its Limitations', text: 'Money as a medium of exchange is an asset that is universally accepted in an economy to facilitate the buying and selling of goods and services by eliminating the requirement of a double coincidence.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_eco_cbse_03_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Sell 50 kg of tomatoes, survive a barter nightmare, then track your own salary through cash, UPI and deposits to see what actually counts as \'money.\'',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c10_eco_cbse_03_001', title: 'Money as a Medium of Exchange: Barter System and Its Limitations',
          caseStudy: { intro: 'Imagine a wheat farmer in Punjab who needs a pair of leather shoes.',
            decisions: [{ prompt: 'Define the term \'double coincidence of wants\' in the context of the barter system.', options: [
                { text: 'Double coincidence of wants refers to a situation in a barter economy where two parties', outcome: 'Double coincidence of wants refers to a situation in a barter economy where two parties can only.' },
                { text: 'when two people want to trade', outcome: 'Not quite — Students often believe the barter system\'s only problem is "inconvenience" or "difficulty.', reveals: 'the-barter-system-s-only' },
                { text: 'when wants coincide', outcome: 'Not quite — Students often believe the barter system\'s only problem is "inconvenience" or "difficulty.', reveals: 'the-barter-system-s-only' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_03_002', title: 'Modern Forms of Money: Currency and Bank Deposits',
          caseStudy: { intro: 'Imagine you buy a textbook for ₹450. You can pay with a ₹500 note (currency) or scan a UPI QR code (bank deposit transfer).',
            decisions: [{ prompt: 'What is the legal status of a ₹200 banknote issued by the Reserve Bank of India, and who guarantees its value?', options: [
                { text: 'Correct answer: The ₹200 banknote is **legal tender** in India, meaning it cannot be', outcome: 'Correct answer: The ₹200 banknote is **legal tender** in India, meaning it cannot be refused.' },
                { text: 'guaranteed by RBI gold reserves', outcome: 'Not quite — Students often think **"Money in my bank account is just a record; real money is only cash."** They.', reveals: 'money-in-my-bank-account' },
                { text: 'backed by the bank\'s assets', outcome: 'Not quite — Students often think **"Money in my bank account is just a record; real money is only cash."** They.', reveals: 'money-in-my-bank-account' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_003', title: 'Loan Activities of Banks: Deposits and Lending Mechanism',
          scaffold: { problem: 'A commercial bank receives a new fixed deposit of ₹2,00,000 for 2 years at 6% p.a. The current CRR is 4.5% and SLR is 18%.',
            steps: [
            { text: 'Identify the given data: Deposit = ₹2,00,000; CRR = 4.5% = 0.045; SLR = 18% = 0.18; Deposit rate = 6%; Lending rate.' },
            { text: 'Calculate required reserves: CRR reserve = 0.045 × ₹2,00,000 = ₹9,000; SLR reserve = 0.18 × ₹2,00,000 = ₹36,000; Total.' },
            { text: 'Calculate maximum lendable amount = Deposit - Total reserves = ₹2,00,000 - ₹45,000 = ₹1,55,000.' },
            { text: 'Compute annual interest income from loan = 10% of ₹1,55,000 = ₹15,500.' },
            { text: 'Compute annual interest expense on deposit = 6% of ₹2,00,000 = ₹12,000.' },
            { text: 'Calculate gross spread = Interest income - Interest expense = ₹15,500 - ₹12,000 = ₹3,500.', faded: true, blankAnswer: '(a) ₹45,000 (b) ₹1,55,000 (c) ₹15,500 (d) ₹12,000 (e) ₹3,500' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_004', title: 'Two Different Credit Situations: Good Credit vs Bad Credit (Debt Trap)',
          scaffold: { problem: 'Ravi, a small farmer in Punjab, borrows ₹80,000 from a commercial bank at 9% per annum simple interest to purchase a high-yielding variety.',
            steps: [
            { text: 'Identify the given data: Principal (P) = ₹80,000, Rate (R) = 9% per annum, Time (T) = 6 months = 0.5 years.' },
            { text: 'Recall the simple interest formula: SI = (P × R × T) / 100.' },
            { text: 'Calculate interest for 6 months: SI = (80,000 × 9 × 0.5) / 100 = (80,000 × 4.5) / 100 = ₹3,600.' },
            { text: 'Compare interest cost (₹3,600) with incremental income (₹25,000).' },
            { text: 'Interpret economically: The loan is used for a productive purpose (seeds/fertilizer) that generates income exceeding.', faded: true, blankAnswer: 'Interest for 6 months = ₹3,600. Since incremental income.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_005', title: 'Terms of Credit: Interest Rate, Collateral, Documentation, Mode of Repayment',
          scaffold: { problem: 'Rani, a small shopkeeper in Tamil Nadu, borrows ₹80,000 from a bank at 8% simple interest per annum for 3 years to expand her shop.',
            steps: [
            { text: 'Identify the given data: Principal (P) = ₹80,000, Rate (R) = 8% p.a., Time (T) = 3 years.' },
            { text: 'Recall the simple interest formula: SI = (P × R × T) / 100.' },
            { text: 'Calculate SI = (80,000 × 8 × 3) / 100 = ₹19,200.' },
            { text: 'Total repayment = Principal + SI = ₹80,000 + ₹19,200 = ₹99,200.' },
            { text: 'Monthly EMI = Total repayment / number of months = ₹99,200 / 36 = ₹2,755.56 (approx).' },
            { text: 'Interpret: The collateral (shop) secures the bank; documentation verifies income; monthly EMI suits regular shop income.', faded: true, blankAnswer: 'Total interest = ₹19,200; Total repayment = ₹99,200.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_006', title: 'Formal and Informal Credit Sources in India (Banks vs Moneylenders)',
          scaffold: { problem: 'A small trader in Varanasi needs ₹1,00,000 for 6 months to stock festival inventory.',
            steps: [
            { text: 'Identify the given data — Principal = ₹1,00,000, Time = 6 months = 0.5 years.' },
            { text: 'Convert moneylender\'s monthly rate to annual rate for comparison: 3% × 12 = 36% p.a.' },
            { text: 'Calculate bank interest for 6 months: Simple Interest = (1,00,000 × 10 × 0.5) / 100 = ₹5,000.' },
            { text: 'Calculate moneylender interest for 6 months: Simple Interest = (1,00,000 × 18) / 100 = ₹18,000.' },
            { text: 'Compare: Bank interest ₹5,000 vs Moneylender ₹18,000. Bank is cheaper by ₹13,000.', faded: true, blankAnswer: 'Bank interest = ₹5,000; Moneylender interest = ₹18,000.' }
            ] } },
        { type: 'case', nodeId: 'c10_eco_cbse_03_001', title: 'A real-world call',
          caseStudy: { intro: 'A moneylender charges desperate farmers 5% a month. A bank won\'t lend to them — no collateral. Banning the moneylender removes the only credit available; allowing him keeps the debt trap running.',
            decisions: [{ prompt: 'Is bad credit better than no credit?', options: [
                { text: 'Yes — survival needs money today, not policy', outcome: 'True in the emergency; but \'bad credit available\' is how the debt trap stays permanent.' },
                { text: 'No — the trap is worse than the drought', outcome: 'Protects the long term; a farmer facing a failed crop this month may not get a long term.' },
                { text: 'Neither — the answer is making formal credit reach them', outcome: 'The structural fix — SHGs and microcredit exist precisely because both options fail alone.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At lunch, Nikhil wants Aditi\'s paratha and offers his apple. Aditi wants Ravi\'s cookies instead, but Ravi wants Nikhil\'s apple. The three spend ten minutes failing to arrange a trade, and Nikhil sighs, \'This is why people invented money.\'',
            decisions: [{ prompt: 'What exact problem did the three friends hit, and how does money fix it?', options: [
                { text: 'They hit the double coincidence of wants — each pair wanted what the other did not have at that moment, so no direct swap worked. Money fixes it because everyone accepts it: Nikhil could sell his apple for money, then use the money to buy the paratha, without needing Aditi to want his apple.', outcome: 'Money acts as a medium of exchange — it splits one impossible three-way swap into two simple sales, which is precisely the function that made barter economies give way to money.' },
                { text: 'The problem was that they had no adult to referee the trades — a teacher could have matched them up, which is all money really does.', outcome: 'A referee only finds matches; money removes the need to find a matching partner at all, since anything can be sold for it and it can buy anything.', reveals: 'money-is-just-a-referee' },
                { text: 'Barter failed only because food items are too cheap — for expensive items like phones, trading directly works fine.', outcome: 'Expensive items make barter worse, not better — the seller must find a buyer who both wants the phone and has exactly what the seller wants.', reveals: 'barter-works-for-big-items' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Barter, money, credit, banks — you now see the invisible agreement holding the whole economy up.',
            decisions: [{ prompt: 'What comes next? Money and Credit · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Money and Credit · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_001', difficulty: 'standard',
          question: 'Money as a medium of exchange is an asset that is universally accepted in.',
          hint: 'If stuck, revisit c6_economics_ch11_002 (Problems with Barter: Double Coincidence.',
          misconception: 'Students often believe the barter system\'s only problem is "inconvenience" or "difficulty in finding trading partners,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Money as a medium of exchange is an asset that is universally accepted in an economy to',
                  options: ['Money as a medium of exchange is an asset that is universally accepted in an economy to', 'Modern forms of money in India consist of **currency** (paper notes and coins) issued by', 'Loan activities of banks refer to the process where banks accept deposits from the public', 'Good credit refers to borrowing for productive purposes (e.g., investment in business,'],
                  hint: 'If stuck, revisit c6_economics_ch11_002 (Problems with Barter: Double Coincidence of Wants) and.',
                  misconception: 'Students often believe the barter system\'s only problem is "inconvenience" or "difficulty in finding trading partners," and that money.' }
          ],
            remediations: { 'the-barter-system-s-only': { steps: ['Draw a 3-good barter matrix (Wheat, Shoes, Pots) on paper and list all 3 pairwise exchange rates needed.', 'Add a 4th good (Milk) and calculate the new total exchange rates (6).', 'Show that with money, only 4 money prices are needed regardless of the number of goods.', 'Use a real Indian example — a textile mill in Surat — and ask: "How would the mill owner pay 2,000 workers, buy cotton.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the barter system\'s only problem is "inconvenience" or "difficulty in finding trading partners,".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The barter system works perfectly well in a small village where everyone knows each other and produces different goods." Use at least.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'it works because they trust each other', 'inconvenience', 'difficulty in finding trading partners'],
                  hint: 'If stuck, revisit c6_economics_ch11_002 (Problems with Barter: Double Coincidence of Wants) and.',
                  misconception: 'Students often believe the barter system\'s only problem is "inconvenience" or "difficulty in finding trading partners," and that money.' }
          ],
            remediations: { 'the-barter-system-s-only': { steps: ['Draw a 3-good barter matrix (Wheat, Shoes, Pots) on paper and list all 3 pairwise exchange rates needed.', 'Add a 4th good (Milk) and calculate the new total exchange rates (6).', 'Show that with money, only 4 money prices are needed regardless of the number of goods.', 'Use a real Indian example — a textile mill in Surat — and ask: "How would the mill owner pay 2,000 workers, buy cotton.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_002', difficulty: 'standard',
          question: 'Modern forms of money in India consist of **currency** (paper notes and coins).',
          hint: 'If stuck, revisit **c6_economics_ch11_004 (Functions of Money)** and.',
          misconception: 'Students often think **"Money in my bank account is just a record; real money is only cash."** They write in exams.',
          parts: [
                { id: 'a', prompt: 'Riya has ₹50,000 in her savings account. She writes a cheque for ₹12,000 to Rohan. Rohan deposits the cheque in his current account.', answer: 'Step 1: Identify initial demand deposits – Riya: ₹50,000',
                  options: ['Step 1: Identify initial demand deposits – Riya: ₹50,000', 'Money in my bank account is just a record', 'Bank deposits are not money, they are just claims', 'Only currency issued by RBI is money'],
                  hint: 'If stuck, revisit **c6_economics_ch11_004 (Functions of Money)** and **c6_economics_ch08_005.',
                  misconception: 'Students often think **"Money in my bank account is just a record; real money is only cash."** They write in exams: "Bank deposits are not.' },
                { id: 'b', prompt: 'Compare the following two statements and identify which is correct and why: Statement A: "Currency notes are money because they are made of special paper and.', answer: 'Correct answer: Statement B is correct',
                  options: ['Correct answer: Statement B is correct', 'Money in my bank account is just a record', 'Bank deposits are not money, they are just claims', 'Only currency issued by RBI is money'],
                  hint: 'If stuck, revisit **c6_economics_ch11_004 (Functions of Money)** and **c6_economics_ch08_005.',
                  misconception: 'Students often think **"Money in my bank account is just a record; real money is only cash."** They write in exams: "Bank deposits are not.' }
          ],
            remediations: { 'money-in-my-bank-account': { steps: ['Re-read the NCERT definition: "Money supply = Currency with public + Demand deposits with banks." 2.', 'Do a **real-life audit**: List 5 payments you made last week – how many used cash vs.', 'Realize most used bank deposits.', 'Trace a UPI payment: Open your banking app → see "Balance: ₹X" → that balance is a **liability of the bank to you**.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_003', difficulty: 'standard',
          question: 'Loan activities of banks refer to the process where banks accept deposits from.',
          hint: 'If stuck, revisit \'Types of Bank Accounts: Savings, Current, Fixed Deposit\'.',
          misconception: 'Students often believe that the money multiplier (1/CRR) gives the exact total money supply increase in the real.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Loan activities of banks refer to the process where banks accept deposits from the public',
                  options: ['Loan activities of banks refer to the process where banks accept deposits from the public', 'Money as a medium of exchange is an asset that is universally accepted in an economy to', 'Modern forms of money in India consist of **currency** (paper notes and coins) issued by', 'Good credit refers to borrowing for productive purposes (e.g., investment in business,'],
                  hint: 'If stuck, revisit \'Types of Bank Accounts: Savings, Current, Fixed Deposit\' (c6_economics_ch08_004).',
                  misconception: 'Students often believe that the money multiplier (1/CRR) gives the exact total money supply increase in the real economy.' }
          ],
            remediations: { 'the-money-multiplier-1-crr': { steps: ['Revisit the money multiplier derivation with a numerical example (like Worked Example 3).', 'Introduce the concept of \'leakages\' — currency drain ratio (c) and excess reserve ratio (e) — and show the realistic.', 'Use RBI data (e.g., CRR=4.5%, currency with public ~15% of deposits, excess reserves ~1%) to compute actual multiplier.', 'Practice a board-style case question: "Why is actual credit creation lower than 1/CRR? Explain two reasons."'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_004', difficulty: 'standard',
          question: 'Good credit refers to borrowing for productive purposes (e.g., investment.',
          hint: 'If stuck, review simple interest calculation (Class 6/7) and the concept of capital.',
          misconception: 'Students often think "debt trap" means *any* high-interest loan, or that *only* moneylenders cause debt traps.',
          parts: [
                { id: 'a', prompt: 'Ramesh (from the walkthrough) took a loan for a water pump. Suresh took a loan for a wedding.', answer: 'Ramesh\'s loan is good credit',
                  options: ['Ramesh\'s loan is good credit', 'both are good because they help the family', 'debt trap'],
                  hint: 'If stuck, review simple interest calculation (Class 6/7) and the concept of capital formation.',
                  misconception: 'Students often think "debt trap" means *any* high-interest loan, or that *only* moneylenders cause debt traps.' },
                { id: 'b', prompt: 'A small farmer borrows ₹40,000 from a moneylender at 5% *per month* (simple interest) to buy seeds and fertilizer. The crop fails due to drought.', answer: 'Step 1: Monthly interest rate = 5% = 0.05',
                  options: ['Step 1: Monthly interest rate = 5% = 0.05', 'debt trap'],
                  hint: 'If stuck, review simple interest calculation (Class 6/7) and the concept of capital formation.',
                  misconception: 'Students often think "debt trap" means *any* high-interest loan, or that *only* moneylenders cause debt traps.' },
                { id: 'c', prompt: 'Compare two credit situations: (A) A shopkeeper borrows ₹1,00,000 from a bank at 12% p.a. to expand her shop. She earns an additional ₹2,000 per month.', answer: 'Situation (B) is far more likely to lead to a debt trap',
                  options: ['Situation (B) is far more likely to lead to a debt trap', 'both are debt traps', 'debt trap'],
                  hint: 'If stuck, review simple interest calculation (Class 6/7) and the concept of capital formation.',
                  misconception: 'Students often think "debt trap" means *any* high-interest loan, or that *only* moneylenders cause debt traps.' }
          ],
            remediations: { 'debt-trap-means-any-high': { steps: ['Revisit the definition of "productive vs unproductive credit" — list 3 examples of each.', 'Take a loan of ₹10,000 at 2% per month. Calculate interest for 3 months.', 'Draw a flowchart: Loan → Purpose → Income generated? → Yes → Repay → Good credit; No → Borrow again → Debt trap.', 'Identify in each case whether the *interest rate* or the *income generation* was the decisive factor.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_005', difficulty: 'standard',
          question: 'Terms of credit refer to the specific conditions agreed upon between a lender.',
          hint: 'If stuck, revisit "Understanding Interest: The Cost of Borrowing, the Reward of Saving".',
          misconception: 'Students often think that a lower interest rate alone makes a loan "good credit".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Terms of credit refer to the specific conditions agreed upon between a lender and a',
                  options: ['Terms of credit refer to the specific conditions agreed upon between a lender and a', 'Money as a medium of exchange is an asset that is universally accepted in an economy to', 'Modern forms of money in India consist of **currency** (paper notes and coins) issued by', 'Loan activities of banks refer to the process where banks accept deposits from the public'],
                  hint: 'If stuck, revisit "Understanding Interest: The Cost of Borrowing, the Reward of Saving".',
                  misconception: 'Students often think that a lower interest rate alone makes a loan "good credit".' }
          ],
            remediations: { 'a-lower-interest-rate-alone': { steps: ['If a student focuses only on interest rate, give them a mini-case: Two loans of ₹50,000 at 10% p.a.', 'Loan A: monthly installments of ₹5,000.', 'Loan B: single payment after 6 months (harvest).', 'The borrower earns ₹60,000 only at harvest.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_006', difficulty: 'standard',
          question: 'Formal credit sources are institutions registered and regulated by the Reserve.',
          hint: 'If stuck, revisit c10_eco_cbse_03_005 (Terms of Credit) and c6_economics_ch08_003.',
          misconception: 'Students believe that "informal credit is only used by the poor because they are uneducated" — the reality is that even.',
          parts: [
                { id: 'a', prompt: 'A borrower takes a ₹20,000 loan from a moneylender at 5% per month simple interest.', answer: 'Moneylender: 5% per month × 12 = 60% per annum',
                  options: ['Moneylender: 5% per month × 12 = 60% per annum', 'informal credit is only used by the poor'],
                  hint: 'If stuck, revisit c10_eco_cbse_03_005 (Terms of Credit) and c6_economics_ch08_003 (Understanding.',
                  misconception: 'Students believe that "informal credit is only used by the poor because they are uneducated" — the reality is that even educated small.' },
                { id: 'b', prompt: 'Compare the collateral requirements of a bank loan and a moneylender loan for a small farmer who owns 1 hectare of land but has no formal land title.', answer: 'Banks require legal collateral (land title deeds)',
                  options: ['Banks require legal collateral (land title deeds)', 'moneylender doesn\'t ask for collateral so it\'s better', 'informal credit is only used by the poor'],
                  hint: 'If stuck, revisit c10_eco_cbse_03_005 (Terms of Credit) and c6_economics_ch08_003 (Understanding.',
                  misconception: 'Students believe that "informal credit is only used by the poor because they are uneducated" — the reality is that even educated small.' }
          ],
            remediations: { 'informal-credit-is-only-used': { steps: ['Revisit the worked example comparing interest calculations (Diagnostic Q3) — practice converting monthly to annual.', 'Draw a two-column table: Formal vs Informal — fill in interest rate range, collateral type, documentation, speed, RBI.', 'Read the case study of a marginal farmer in the textbook (or NCERT example) and identify which barriers are price.', 'Explain to a peer why capping moneylender rates without expanding bank access can worsen credit availability — use the.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
