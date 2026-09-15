import type { SimDef } from '../../engine/types';

/** v3 generated — c10_eco_ch03_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_eco_ch03_p2: SimDef = {
    id: 'v3_c10_eco_ch03_p2',
    title: 'Money and Credit · Part 2/2',
    subtitle: 'From barter chaos to UPI — what makes money, money',
    classLevel: 10, subject: 'economics', topic: 'Money and Credit · Part 2/2',
    chapters: ['c10_eco_ch03'],
    nodeIds: ['c10_eco_cbse_03_007', 'c10_eco_cbse_03_008', 'c10_eco_cbse_03_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village trader trying to escape the barter trap', intro: 'In a remote haat, a trader can\'t sell his cloth because the farmers don\'t want what he brought. One invention would fix it — and you carry it in your pocket.', goal: 'Explain double coincidence of wants, and treat demand deposits as real money alongside currency.' },
    discovery: {
        question: 'The ₹500 note in your pocket is just paper — why does a shopkeeper accept it?',
        options: ['Everyone trusts it can be exchanged for goods', 'The paper has intrinsic value', 'The RBI stores gold for every note', 'Law forces acceptance at gunpoint'],
        answer: 'Everyone trusts it can be exchanged for goods',
        hook: 'Money is a promise we all keep together. Break the trust and paper becomes paper again.',
    },
    teaching: [
        { title: 'Self-Help Groups (SHGs) for the Poor: Microfinance Model', text: 'A Self-Help Group (SHG) is a small, voluntary association of 10–20 poor people, typically women from similar socio-economic backgrounds, who pool their savings regularly to create a common fund from.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_eco_cbse_03_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Sell 50 kg of tomatoes, survive a barter nightmare, then track your own salary through cash, UPI and deposits to see what actually counts as \'money.\'',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c10_eco_cbse_03_007', title: 'Self-Help Groups (SHGs) for the Poor: Microfinance Model',
          caseStudy: { intro: 'Imagine a group of 12 women in a Bihar village who each save ₹50 per week.',
            decisions: [{ prompt: 'Define a Self-Help Group (SHG) and state the typical size and composition of an SHG in India.', options: [
                { text: 'An SHG is a voluntary group of 10–20 poor individuals, usually women from similar', outcome: 'An SHG is a voluntary group of 10–20 poor individuals, usually women from similar economic.' },
                { text: 'SHGs are run by banks', outcome: 'Not quite — Students think **SHGs are a type of bank** or **NGO-run charity**.', reveals: 'shgs-are-a-type-of' },
                { text: 'require land collateral', outcome: 'Not quite — Students think **SHGs are a type of bank** or **NGO-run charity**.', reveals: 'shgs-are-a-type-of' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_008', title: 'Why Poor People Depend on Informal Credit: Problems and Solutions',
          scaffold: { problem: 'A sharecropper in West Bengal needs ₹25,000 for paddy cultivation.',
            steps: [
            { text: 'Identify the moneylender\'s terms: Principal = ₹25,000, Monthly rate = 4% = 0.04, Tenure = 6 months, Simple interest,.' },
            { text: 'Calculate moneylender interest: Monthly interest = 0.04 × ₹25,000 = ₹1,000. Total for 6 months = ₹1,000 × 6 = ₹6,000.' },
            { text: 'Identify bank KCC terms: Annual rate = 7% = 0.07. Monthly rate = 0.07/12 ≈ 0.005833.' },
            { text: 'Calculate bank interest on declining balance: Month 1: 0.005833 × ₹25,000 = ₹145.83.' },
            { text: 'Compare: Moneylender = ₹6,000; Bank = ₹583.33. Ratio = 10.3x. Yet sharecropper chooses moneylender because: (a) no land.', faded: true, blankAnswer: 'Moneylender interest = ₹6,000; Bank interest = ₹583.33.' }
            ] } },
        { type: 'case', nodeId: 'c10_eco_cbse_03_009', title: 'Reserve Bank of India (RBI): Role in Issuing Currency and Regulating Banks',
          caseStudy: { intro: 'Imagine you withdraw ₹2,000 from an ATM in Delhi — the crisp new notes bear the signature of the RBI Governor, not the bank manager.',
            decisions: [{ prompt: '**REMEMBER**: State the specific section of the RBI Act, 1934 that grants RBI the sole right to issue banknotes in India, and mention the.', options: [
                { text: '**Correct Answer**: Section 22 of the RBI Act, 1934 grants RBI the sole right to issue', outcome: '**Correct Answer**: Section 22 of the RBI Act, 1934 grants RBI the sole right to issue banknotes.' },
                { text: 'RBI prints all money including coins', outcome: 'Not quite — **Misconception**: "RBI prints money whenever the government needs funds for schemes like PM-KISAN.', reveals: 'misconception-rbi-prints-money-whenever' },
                { text: 'Government prints notes', outcome: 'Not quite — **Misconception**: "RBI prints money whenever the government needs funds for schemes like PM-KISAN.', reveals: 'misconception-rbi-prints-money-whenever' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_03_007', title: 'A real-world call',
          caseStudy: { intro: 'A moneylender charges desperate farmers 5% a month. A bank won\'t lend to them — no collateral. Banning the moneylender removes the only credit available; allowing him keeps the debt trap running.',
            decisions: [{ prompt: 'Is bad credit better than no credit?', options: [
                { text: 'Yes — survival needs money today, not policy', outcome: 'True in the emergency; but \'bad credit available\' is how the debt trap stays permanent.' },
                { text: 'No — the trap is worse than the drought', outcome: 'Protects the long term; a farmer facing a failed crop this month may not get a long term.' },
                { text: 'Neither — the answer is making formal credit reach them', outcome: 'The structural fix — SHGs and microcredit exist precisely because both options fail alone.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At lunch, Nikhil wants Aditi\'s paratha and offers his apple. Aditi wants Ravi\'s cookies instead, but Ravi wants Nikhil\'s apple. The three spend ten minutes failing to arrange a trade, and Nikhil sighs, \'This is why people invented money.\'',
            decisions: [{ prompt: 'What exact problem did the three friends hit, and how does money fix it?', options: [
                { text: 'They hit the double coincidence of wants — each pair wanted what the other did not have at that moment, so no direct swap worked. Money fixes it because everyone accepts it: Nikhil could sell his apple for money, then use the money to buy the paratha, without needing Aditi to want his apple.', outcome: 'Money acts as a medium of exchange — it splits one impossible three-way swap into two simple sales, which is precisely the function that made barter economies give way to money.' },
                { text: 'The problem was that they had no adult to referee the trades — a teacher could have matched them up, which is all money really does.', outcome: 'A referee only finds matches; money removes the need to find a matching partner at all, since anything can be sold for it and it can buy anything.', reveals: 'money-is-just-a-referee' },
                { text: 'Barter failed only because food items are too cheap — for expensive items like phones, trading directly works fine.', outcome: 'Expensive items make barter worse, not better — the seller must find a buyer who both wants the phone and has exactly what the seller wants.', reveals: 'barter-works-for-big-items' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_03_009', title: 'You made it',
          caseStudy: { intro: 'Barter, money, credit, banks — you now see the invisible agreement holding the whole economy up.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_007', difficulty: 'standard',
          question: 'A Self-Help Group (SHG) is a small, voluntary association of 10–20 poor people.',
          hint: 'If stuck, revisit **c10_eco_cbse_03_005 (Terms of Credit)** and draw a flowchart:.',
          misconception: 'Students think **SHGs are a type of bank** or **NGO-run charity**.',
          parts: [
                { id: 'a', prompt: 'An SHG of 15 members saves ₹100 per member per month. After 6 months, they lend ₹45,000 to one member at 2% per month simple interest for 12 months.', answer: '**Step 1:** Principal = ₹45,000',
                  options: ['**Step 1:** Principal = ₹45,000', '**SHGs are a type of bank** or **NGO-run charity**'],
                  hint: 'If stuck, revisit **c10_eco_cbse_03_005 (Terms of Credit)** and draw a flowchart: No collateral →.',
                  misconception: 'Students think **SHGs are a type of bank** or **NGO-run charity**.' },
                { id: 'b', prompt: 'Compare the credit delivery chain of an SHG-Bank Linkage Programme (SBLP) loan vs. a direct bank loan to a poor farmer.', answer: '**SHG route:** Bank → SHG (single account) → Member (internal lending)',
                  options: ['**SHG route:** Bank → SHG (single account) → Member (internal lending)', 'lower interest rate', '**SHGs are a type of bank** or **NGO-run charity**'],
                  hint: 'If stuck, revisit **c10_eco_cbse_03_005 (Terms of Credit)** and draw a flowchart: No collateral →.',
                  misconception: 'Students think **SHGs are a type of bank** or **NGO-run charity**.' }
          ],
            remediations: { 'shgs-are-a-type-of': { steps: ['Revisit **c10_eco_cbse_03_005 (Terms of Credit)**: list collateral, interest rate, documentation for bank vs.', 'Watch a 5-min video of an actual SHG meeting (e.g., Kudumbashree, Kerala) — note who keeps the keys, who writes the.', 'Role-play: 5 students act as SHG members, 1 as bank manager.', 'Practice the **grading interview** — this makes the "social collateral" concept concrete.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_008', difficulty: 'standard',
          question: 'Informal credit dependence refers to the reliance of low-income households.',
          hint: 'If stuck, revisit c10_eco_cbse_03_005 (Terms of Credit) and create a table: Term | Formal.',
          misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with.',
          parts: [
                { id: 'a', prompt: 'Calculate the total interest paid over 2 years on a ₹20,000 loan from: (a) a moneylender charging 3% per month simple interest with no principal repayment, and.', answer: '**Step 1:** Moneylender: Monthly interest = 3% × ₹20,000 = ₹600',
                  options: ['**Step 1:** Moneylender: Monthly interest = 3% × ₹20,000 = ₹600', 'poor people prefer informal credit'],
                  hint: 'If stuck, revisit c10_eco_cbse_03_005 (Terms of Credit) and create a table: Term | Formal.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' },
                { id: 'b', prompt: 'Compare the credit access barriers for: (i) a tenant farmer in Punjab leasing 2 hectares, (ii) a street vendor in Mumbai with daily cash flow but no shop.', answer: '(i) Tenant farmer: **Collateral barrier**',
                  options: ['(i) Tenant farmer: **Collateral barrier**', 'high interest rates', 'poor people prefer informal credit'],
                  hint: 'If stuck, revisit c10_eco_cbse_03_005 (Terms of Credit) and create a table: Term | Formal.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' }
          ],
            remediations: { 'poor-people-prefer-informal-credit': { steps: ['** Revisit c10_eco_cbse_03_005 (Terms of Credit) — list the 4 formal credit terms (interest rate, collateral.', '** Use the ₹20,000/2-year calculation from Diagnostic 3 — redo it with compound interest for the moneylender (5%.', '** Read the RBI\'s "Priority Sector Lending — Weaker Sections" circular (2023) — note the 40% ANBC target for weaker.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Self-Help Groups (SHGs) solve the poor\'s credit problem by replacing moneylenders with banks." Use the concepts of social collateral.', answer: 'The statement is **partially correct but incomplete**',
                  options: ['The statement is **partially correct but incomplete**', 'poor people prefer informal credit'],
                  hint: 'If stuck, revisit c10_eco_cbse_03_005 (Terms of Credit) and create a table: Term | Formal.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' },
                { id: 'b', prompt: 'Design a credit product for a seasonal migrant construction worker in Delhi who earns ₹600/day for 8 months/year, has no ID proof in Delhi, and sends.', answer: '**Product:** "Migrant Flexi-Loan"',
                  options: ['**Product:** "Migrant Flexi-Loan"', 'poor people prefer informal credit'],
                  hint: 'If stuck, revisit c10_eco_cbse_03_005 (Terms of Credit) and create a table: Term | Formal.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' }
          ],
            remediations: { 'poor-people-prefer-informal-credit': { steps: ['** Revisit c10_eco_cbse_03_005 (Terms of Credit) — list the 4 formal credit terms (interest rate, collateral.', '** Use the ₹20,000/2-year calculation from Diagnostic 3 — redo it with compound interest for the moneylender (5%.', '** Read the RBI\'s "Priority Sector Lending — Weaker Sections" circular (2023) — note the 40% ANBC target for weaker.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_009', difficulty: 'standard',
          question: 'The Reserve Bank of India (RBI) is India\'s central banking institution.',
          hint: 'If stuck, revisit `c10_eco_cbse_03_003` (Loan Activities of Banks) and trace how a ₹100.',
          misconception: '**Misconception**: "RBI prints money whenever the government needs funds for schemes like PM-KISAN or infrastructure.".',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND**: Explain why RBI requires commercial banks to maintain a Cash Reserve Ratio (CRR) with itself, and what would happen to the banking system.', answer: '**Correct Answer**: CRR ensures two things: (1) **Liquidity safety**',
                  options: ['**Correct Answer**: CRR ensures two things: (1) **Liquidity safety**', 'CRR is a tax on banks', 'RBI uses CRR money for its expenses'],
                  hint: 'If stuck, revisit `c10_eco_cbse_03_003` (Loan Activities of Banks) and trace how a ₹100 deposit.',
                  misconception: '**Misconception**: "RBI prints money whenever the government needs funds for schemes like PM-KISAN or infrastructure." **Exact Wrong.' }
          ],
            remediations: { 'misconception-rbi-prints-money-whenever': { steps: ['**Revisit Class 7 node `c7_eco_ch04_011` (RBI: Central Bank)** — specifically the distinction between *currency.', '**Draw a T-account of RBI**: Left side (Assets: Gold, FX, Govt Securities); Right side (Liabilities: Notes Issued.', 'Show that every ₹100 note issued requires ₹100 asset backing — RBI cannot expand liabilities without assets.', '**Contrast with Government Budget**: Use a simple table — Government: Revenue (Tax) + Borrowing (Bonds) = Expenditure.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
