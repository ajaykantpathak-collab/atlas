import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch12 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch12: SimDef = {
    id: 'v3_c12_eco_ch12',
    title: 'Open Economy Macroeconomics',
    subtitle: 'Covers: definition of foreign exchange rate, three exchange rate regimes (fixed.',
    classLevel: 12, subject: 'economics', topic: 'Open Economy Macroeconomics',
    chapters: ['c12_eco_ch12'],
    nodeIds: ['c12_eco_cbse_12_001', 'c12_eco_cbse_12_002', 'c12_eco_cbse_12_003', 'c12_eco_cbse_12_004', 'c12_eco_cbse_12_005', 'c12_eco_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a relatable scenario: an Indian student planning to study in the USA needs dollars for tuition.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Compare fixed and flexible exchange rate regimes on: (a) need for foreign exchange reserves, (b) monetary policy autonomy, (c) automatic BoP adjustment.',
        options: ['need for foreign exchange reserves, (', 'fixed gives more monetary autonomy', 'flexible requires more reserves'],
        answer: 'need for foreign exchange reserves, (',
        hook: '**Students write: "Devaluation and depreciation both mean the currency becomes cheaper."** **Why this is wrong:** They.',
    },
    teaching: [
        { title: 'Foreign Exchange Rate — Fixed, Flexible and Managed Floating', text: 'Foreign exchange rate is the price of one currency expressed in terms of another currency, determining the rate at which currencies are exchanged in the foreign exchange market; it links domestic and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_12_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_eco_cbse_12_001', title: 'Foreign Exchange Rate — Fixed, Flexible and Managed Floating',
          caseStudy: { intro: 'Start with a relatable scenario: an Indian student planning to study in the USA needs dollars for tuition — she checks the ₹/$ rate daily.',
            decisions: [{ prompt: 'Define foreign exchange rate and state its two main functions in an open economy.', options: [
                { text: 'Foreign exchange rate is the price of one currency in terms of another (e.g., ₹83 per $1)', outcome: 'Foreign exchange rate is the price of one currency in terms of another (e.g., ₹83 per $1).' },
                { text: 'it is the interest rate on foreign loans', outcome: 'Not quite — **Students write: "Devaluation and depreciation both mean the currency becomes cheaper."** **Why.', reveals: 'students-write-devaluation-and-depreciation' },
                { text: 'it is set by WTO', outcome: 'Not quite — **Students write: "Devaluation and depreciation both mean the currency becomes cheaper."** **Why.', reveals: 'students-write-devaluation-and-depreciation' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_12_002', title: 'Determination of Exchange Rate in a Free Market',
          scaffold: { problem: 'India\'s demand for dollars: Qd = 200 – 5e (e = ₹/$). Supply of dollars: Qs = 50 + 3e.',
            steps: [
            { text: 'Identify initial equilibrium. Set Qd = Qs: 200 – 5e = 50 + 3e → 150 = 8e → e₁ = ₹18.75/$.' },
            { text: 'Model the shock. Higher US rates → Indian demand for US assets rises → demand for dollars increases by 30 at each e.' },
            { text: 'Find new equilibrium. Set Qd\' = Qs: 230 – 5e = 50 + 3e → 180 = 8e → e₂ = ₹22.50/$.' },
            { text: 'Compare. e rose from 18.75 to 22.50 → **rupee depreciated by 20%**. Quantity traded rose from 106.25 to 117.5 million $.' },
            { text: 'Economic interpretation. Higher foreign interest rates attract capital outflows from India → Indians sell rupees to buy.', faded: true, blankAnswer: 'Initial: e = ₹18.75/$, Q = 106.25 million $. New:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_12_003', title: 'Merits and Demerits of Flexible vs Fixed Exchange Rates',
          scaffold: { problem: 'Suppose India\'s MPC (c) = 0.75 and MPM (m) = 0.15. The government increases autonomous spending (G) by ₹100 crore.',
            steps: [
            { text: 'Identify the formula for open economy multiplier: k_open = 1 / (1 - c + m)' },
            { text: 'Plug in values: c = 0.75, m = 0.15 → 1 - 0.75 + 0.15 = 0.40' },
            { text: 'Calculate k_open = 1 / 0.40 = 2.5' },
            { text: 'Calculate ΔY_open = k_open × ΔG = 2.5 × ₹100 crore = ₹250 crore' },
            { text: 'Calculate closed economy multiplier: k_closed = 1 / (1 - c) = 1 / 0.25 = 4' },
            { text: 'Calculate ΔY_closed = 4 × ₹100 crore = ₹400 crore' },
            { text: 'Interpret: The open economy multiplier (2.5) is smaller than closed (4) because m = 0.15 means 15% of every new rupee.', faded: true, blankAnswer: '(a) ΔY = ₹250 crore; (b) ΔY = ₹400 crore. The open economy.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_12_004', title: 'Balance of Payments — Current and Capital Accounts',
          scaffold: { problem: 'For India in 2022-23, the following data (in billion USD) is available:',
            steps: [
            { text: 'Identify Current Account components: Trade balance (goods), net services, net primary income, net secondary income.' },
            { text: 'Calculate Trade Balance = Merchandise exports - Merchandise imports = 450 - 720 = -270 billion USD' },
            { text: 'Calculate Net Invisibles = Net services + Net primary income + Net secondary income = 120 + (-25) + 100 = 195 billion.' },
            { text: 'Calculate Current Account Balance = Trade Balance + Net Invisibles = (-270) + 195 = -75 billion USD' },
            { text: 'Identify Capital Account components (per RBI\'s old classification): Net FDI, net portfolio investment, net external.' },
            { text: 'Calculate Capital Account Balance = Net FDI + Net portfolio inflow + Net external borrowings = 40 + (-10) + 15 = 45.' },
            { text: 'Calculate Overall BoP = Current Account Balance + Capital Account Balance + Errors and Omissions = (-75) + 45 + 0 = -30.', faded: true, blankAnswer: 'Current Account Balance = -75 billion USD' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_12_005', title: 'Autonomous vs Accommodating Transactions in BoP',
          scaffold: { problem: 'In 2023, India recorded exports of goods worth $450 billion, imports of goods worth $600 billion, net invisibles of $80 billion, foreign.',
            steps: [
            { text: 'Calculate trade balance = exports - imports = 450 - 600 = -$150 billion' },
            { text: 'Calculate current account = trade balance + net invisibles = -150 + 80 = -$70 billion (deficit)' },
            { text: 'Calculate capital account = FDI + portfolio investment + external borrowings = 50 + 30 + 20 = +$100 billion (surplus)' },
            { text: 'Sum current account, capital account, and errors and omissions = -70 + 100 + 5 = +$35 billion' },
            { text: 'For BoP to balance (Overall Balance = 0), accommodating transaction = -$35 billion' },
            { text: 'A negative overall balance indicates a decrease in official reserves (reserve sale) of $35 billion', faded: true, blankAnswer: '$35 billion decrease in official reserves (reserve sale).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_12_006', title: 'Disequilibrium in Balance of Payments and Correction',
          scaffold: { problem: 'An economy reports the following for a year:',
            steps: [
            { text: 'Calculate Trade Balance = Exports - Imports = 200 - 250 = -₹50 billion' },
            { text: 'Calculate Net Invisibles = Net services + Net income + Net transfers = 30 + (-10) + 50 = ₹70 billion' },
            { text: 'Current Account = Trade Balance + Net Invisibles = (-50) + 70 = +₹20 billion' },
            { text: 'Capital Account = Net FDI + Net Portfolio Investment + Net Loans = 40 + (-15) + 25 = +₹50 billion' },
            { text: 'Errors and Omissions = 0 (assumed, as not given)' },
            { text: 'BoP = Current Account + Capital Account + Errors and Omissions = 20 + 50 + 0 = +₹70 billion' },
            { text: 'Since BoP > 0, it is a surplus of ₹70 billion', faded: true, blankAnswer: '+₹70 billion surplus' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_12_006', title: 'You made it',
          caseStudy: { intro: 'You finished Open Economy Macroeconomics — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_12_001', difficulty: 'standard',
          question: 'Foreign exchange rate is the price of one currency expressed in terms.',
          hint: 'If stuck on demand-supply shifts, revisit Class 10 Economics Ch2 (Demand/Supply curves).',
          misconception: '**Students write: "Devaluation and depreciation both mean the currency becomes cheaper."** **Why this is wrong:** They.',
          parts: [
                { id: 'a', prompt: 'Compare fixed and flexible exchange rate regimes on: (a) need for foreign exchange reserves, (b) monetary policy autonomy, (c) automatic BoP adjustment.', answer: 'need for foreign exchange reserves, (',
                  options: ['need for foreign exchange reserves, (', 'fixed gives more monetary autonomy', 'flexible requires more reserves', 'devalue'],
                  hint: 'If stuck on demand-supply shifts, revisit Class 10 Economics Ch2 (Demand/Supply curves) or Class 9.',
                  misconception: '**Students write: "Devaluation and depreciation both mean the currency becomes cheaper."** **Why this is wrong:** They are *mechanistically.' }
          ],
            remediations: { 'students-write-devaluation-and-depreciation': { steps: ['If the student confuses depreciation/devaluation or regime characteristics: 1.', 'Revisit **c11_eco_cbse_03_006** (Foreign Exchange Reforms and Rupee Devaluation) — see how 1991 crisis involved.', 'Draw two side-by-side diagrams: (a) Fixed rate — horizontal line at peg, RBI buys/sells at that price; (b) Flexible.', 'Label "devaluation" only on (a) as a *shift of the peg*; label "depreciation" only on (b) as *movement along curves*.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students write: "Devaluation and depreciation both mean the currency becomes cheaper."** **Why this is wrong:** They.',
          parts: [
                { id: 'a', prompt: 'Construct a real-world scenario where speculation causes a self-fulfilling depreciation of the rupee under flexible rates.', answer: 'Scenario: Current ₹/$ = ₹83',
                  options: ['Scenario: Current ₹/$ = ₹83', 'devalue'],
                  hint: 'If stuck on demand-supply shifts, revisit Class 10 Economics Ch2 (Demand/Supply curves) or Class 9.',
                  misconception: '**Students write: "Devaluation and depreciation both mean the currency becomes cheaper."** **Why this is wrong:** They are *mechanistically.' }
          ],
            remediations: { 'students-write-devaluation-and-depreciation': { steps: ['If the student confuses depreciation/devaluation or regime characteristics: 1.', 'Revisit **c11_eco_cbse_03_006** (Foreign Exchange Reforms and Rupee Devaluation) — see how 1991 crisis involved.', 'Draw two side-by-side diagrams: (a) Fixed rate — horizontal line at peg, RBI buys/sells at that price; (b) Flexible.', 'Label "devaluation" only on (a) as a *shift of the peg*; label "depreciation" only on (b) as *movement along curves*.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_12_002', difficulty: 'standard',
          question: 'In a free (flexible) exchange rate regime, the equilibrium foreign exchange.',
          hint: 'If stuck on equilibrium calculation: revisit Class 10 Math c10_math_cbse_03_006.',
          misconception: 'Students consistently confuse **depreciation** (market-driven rise in ₹/$ under flexible rates) with **devaluation**.',
          parts: [
                { id: 'a', prompt: 'Explain why the demand curve for foreign exchange slopes downward. Use the example of an Indian importer buying US machinery.', answer: 'When the exchange rate (₹/$) rises, each dollar costs more rupees',
                  options: ['When the exchange rate (₹/$) rises, each dollar costs more rupees', 'higher rate increases demand'],
                  hint: 'If stuck on equilibrium calculation: revisit Class 10 Math c10_math_cbse_03_006 (elimination.',
                  misconception: 'Students consistently confuse **depreciation** (market-driven rise in ₹/$ under flexible rates) with **devaluation** (government-driven.' }
          ],
            remediations: { 'students-consistently-confuse-depreciation-marke': { steps: ['If the student confuses depreciation/devaluation: (1) Revisit **c12_eco_cbse_12_001** (Fixed vs Flexible regimes).', '(2) Draw two side-by-side diagrams: left panel — flexible, D/S shift, e moves from e0 to e1, label "Depreciation".', '(3) Practice: "Identify the regime and term: (a) RBI sells dollars to keep ₹/$ at 83.', '(b) ₹/$ rises from 80 to 85 due to FII outflows." Redo Diagnostic Q2 and Q4 after this.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_12_003', difficulty: 'standard',
          question: '**Flexible (floating) exchange rate:** A regime where the foreign exchange rate.',
          hint: 'If stuck on the adjustment mechanism distinction, revisit `c12_eco_cbse_12_002` Figures.',
          misconception: '**Misconception:** "Devaluation (fixed rate) and Depreciation (flexible rate) are the same thing — just the currency.',
          parts: [
                { id: 'a', prompt: 'Define "speculative attack" in the context of a fixed exchange rate regime. What specific condition makes a fixed exchange rate vulnerable to such an attack?', answer: 'A speculative attack occurs when market participants (investors, banks, public)',
                  options: ['A speculative attack occurs when market participants (investors, banks, public)', 'speculative attack happens when exchange rate is flexible', 'devaluation'],
                  hint: 'If stuck on the adjustment mechanism distinction, revisit `c12_eco_cbse_12_002` Figures 6.2 and 6.3.',
                  misconception: '**Misconception:** "Devaluation (fixed rate) and Depreciation (flexible rate) are the same thing — just the currency becoming weaker.".' },
                { id: 'b', prompt: 'India currently follows a "managed floating" exchange rate regime.', answer: 'RBI\'s foreign exchange reserves, (',
                  options: ['RBI\'s foreign exchange reserves, (', 'money supply increases', 'devaluation'],
                  hint: 'If stuck on the adjustment mechanism distinction, revisit `c12_eco_cbse_12_002` Figures 6.2 and 6.3.',
                  misconception: '**Misconception:** "Devaluation (fixed rate) and Depreciation (flexible rate) are the same thing — just the currency becoming weaker.".' },
                { id: 'c', prompt: 'Compare the degree of **monetary policy autonomy** (ability to set domestic interest rates independently) under fixed vs.', answer: '**Flexible rates:** Full monetary policy autonomy',
                  options: ['**Flexible rates:** Full monetary policy autonomy', 'fixed rates allow independent monetary policy if capital controls exist', 'flexible rates constrain monetary policy', 'devaluation'],
                  hint: 'If stuck on the adjustment mechanism distinction, revisit `c12_eco_cbse_12_002` Figures 6.2 and 6.3.',
                  misconception: '**Misconception:** "Devaluation (fixed rate) and Depreciation (flexible rate) are the same thing — just the currency becoming weaker.".' }
          ],
            remediations: { 'misconception-devaluation-fixed-rate-and': { steps: ['** Revisit `c12_eco_cbse_12_001` (Fixed vs Flexible definitions) — create a 2x2 table: Regime (Fixed/Flexible).', '** Revisit `c12_eco_cbse_12_002` (Determination of exchange rate) — draw demand-supply diagrams for *both* regimes.', '** Practice NCERT Exercise Q7: "Differentiate between devaluation and depreciation." Write the answer *verbatim* from.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_12_004', difficulty: 'standard',
          question: 'The Balance of Payments (BoP) is a systematic record of all economic.',
          hint: 'If confused about whether a transaction is Current or Capital Account, revisit the.',
          misconception: 'Students often believe that a Current Account deficit directly causes currency depreciation, arguing that "more imports.',
          parts: [
                { id: 'a', prompt: 'Which of the following transactions is recorded in the Current Account of India\'s Balance of Payments? A.', answer: 'Correct answer: B',
                  options: ['Correct answer: B', 'financial flows', 'more imports mean more demand for foreign currency, so the rupee must fall'],
                  hint: 'If confused about whether a transaction is Current or Capital Account, revisit the definition.',
                  misconception: 'Students often believe that a Current Account deficit directly causes currency depreciation, arguing that "more imports mean more demand.' }
          ],
            remediations: { 'a-current-account-deficit-directly': { steps: ['To fix this, use India\'s 2020-21 data: Current Account surplus of +$24 billion (due to crash in oil imports) coincided.', 'Step-by-step: (1) Calculate Current Account deficit/surplus; (2) Measure net capital inflows (FDI + portfolio.', 'Current Account gap; (4) Conclude: Rupee appreciates if net capital inflows > Current Account deficit (increasing forex.', 'This demonstrates that exchange rate movement depends on the *BoP as a whole*, not the Current Account alone.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_12_005', difficulty: 'standard',
          question: 'Autonomous transactions in the Balance of Payments (BoP) are international.',
          hint: 'Review how current account and capital account are structured (c12_eco_cbse_12_004) and.',
          misconception: 'Students often believe that accommodating transactions are driven by the same profit-seeking motives as autonomous.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Autonomous transactions in the Balance of Payments (BoP) are international economic',
                  options: ['Autonomous transactions in the Balance of Payments (BoP) are international economic', 'Foreign exchange rate is the price of one currency expressed in terms of another', 'In a free (flexible) exchange rate regime, the equilibrium foreign exchange rate is', '**Flexible (floating) exchange rate:** A regime where the foreign exchange rate is'],
                  hint: 'Review how current account and capital account are structured (c12_eco_cbse_12_004) and the BoP.',
                  misconception: 'Students often believe that accommodating transactions are driven by the same profit-seeking motives as autonomous transactions, such.' }
          ],
            remediations: { 'accommodating-transactions-are-driven-by': { steps: ['Revisit the BoP identity: Current Account + Capital Account + Errors and Omissions + Overall Balance = 0.', 'Use India’s 2022-23 BoP data: current account deficit of $38B, capital account surplus of $41.15B, errors and omissions.', 'Show that the sum is zero only when overall balance (accommodating) is zero.', 'Then, simulate a scenario: if capital account surplus falls to $30B, calculate required accommodating transaction.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_12_006', difficulty: 'standard',
          question: 'Disequilibrium in Balance of Payments occurs when the net sum of all.',
          hint: 'Review c12_eco_cbse_12_004 (BoP — Current and Capital Accounts) to clarify what belongs.',
          misconception: 'Students often believe that a BoP deficit must be corrected *only* by reducing imports (e.g., via quotas or tariffs).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Disequilibrium in Balance of Payments occurs when the net sum of all international',
                  options: ['Disequilibrium in Balance of Payments occurs when the net sum of all international', 'Foreign exchange rate is the price of one currency expressed in terms of another', 'In a free (flexible) exchange rate regime, the equilibrium foreign exchange rate is', '**Flexible (floating) exchange rate:** A regime where the foreign exchange rate is'],
                  hint: 'Review c12_eco_cbse_12_004 (BoP — Current and Capital Accounts) to clarify what belongs in each.',
                  misconception: 'Students often believe that a BoP deficit must be corrected *only* by reducing imports (e.g., via quotas or tariffs), ignoring that exports.' }
          ],
            remediations: { 'a-bop-deficit-must-be': { steps: ['Revisit the BoP identity: BoP = (Exports - Imports) + Net Invisibles + Net Capital Flows.', 'Use real data: India’s 2022-23 BoP showed a merchandise trade deficit of -$265 billion but a services surplus of +$155.', 'Have students calculate how increasing IT services exports by $20 billion or reducing oil imports via renewable energy.', 'This demonstrates that correction isn’t limited to import curbs—it can come from export growth or capital attraction.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
