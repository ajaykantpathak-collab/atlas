import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch11_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch11_p2: SimDef = {
    id: 'v3_c12_eco_ch11_p2',
    title: 'Government Budget and Balance of Payments · Part 2/2',
    subtitle: '₹9 lakh crore that\'s \'small\' and ₹50,000 crore that\'s \'capital\'',
    classLevel: 12, subject: 'economics', topic: 'Government Budget and Balance of Payments · Part 2/2',
    chapters: ['c12_eco_ch11'],
    nodeIds: ['c12_eco_cbse_11_007', 'c12_eco_cbse_11_008', 'c12_eco_cbse_11_009', 'c12_eco_cbse_11_010', 'c12_eco_cbse_11_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Fiscal analyst', intro: 'Every February the government publishes its plans in two wallets — one for running the country, one for building it. Learn to read both.', goal: 'Split the budget into revenue and capital components and connect items to the objectives of allocation, redistribution and stabilisation.' },
    discovery: {
        question: 'A ₹9-lakh-crore interest payment and a ₹50,000-crore disinvestment receipt — students guess \'the bigger one is capital.\' Which is actually capital?',
        options: ['Disinvestment — it shrinks a government asset; interest is recurring revenue expenditure however huge the number', 'The interest — bigger money means capital budget', 'Both are capital', 'Neither — they\'re the same category'],
        answer: 'Disinvestment — it shrinks a government asset; interest is recurring revenue expenditure however huge the number',
        hook: 'Size is a decoy: revenue vs capital is about economic nature, not amount. Does it create an asset or change a liability? Then it\'s capital. Recurring and net-worth-neutral? Revenue. Free smartphones for students = revenue expenditure — the asset belongs to the child, not the state.',
    },
    teaching: [
        { title: 'Balance of Payments: Meaning and Structure (Current and Capital Accounts)', text: 'The Balance of Payments (BoP) is a systematic, double-entry record of all economic transactions between residents of a country and the rest of the world during a given period (usually a year).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_11_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Build a state government\'s budget from raw items: sort GST, salaries, borrowings, AIIMS construction and stake sales into revenue and capital wallets, then link each line to allocation, redistribution or stabilisation.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_007', title: 'Balance of Payments: Meaning and Structure (Current and Capital Accounts)',
          scaffold: { problem: 'India\'s BoP data for a quarter (₹ crore): Merchandise exports 8,000; Merchandise imports 12,000; Service exports 5,000; Service imports.',
            steps: [
            { text: 'Compute Trade Balance (Goods) = Exports - Imports = 8,000 - 12,000 = -4,000 (deficit).' },
            { text: 'Compute Services Balance = 5,000 - 3,000 = +2,000 (surplus).' },
            { text: 'Current Account = Trade Balance + Services Balance + Net Primary Income + Net Secondary Income = (-4,000) + 2,000.' },
            { text: 'Capital Account = FDI + Portfolio + Other Investment (ECB) + Reserve Change = 1,500 + (-800) + 1,000 + (-700) = 0?' },
            { text: 'BoP Identity: Current Account + Capital Account + Errors & Omissions = 0 → -500 + 1,000 + E&O = 0 → E&O = -500 crore.', faded: true, blankAnswer: 'Current Account = -₹500 crore (deficit); Capital Account.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_008', title: 'Balance of Trade vs Balance of Current Account',
          scaffold: { problem: 'India\'s FY23 Balance of Payments (provisional) shows: Merchandise Exports = $447 bn, Merchandise Imports = $714 bn, Services Exports = $325.',
            steps: [
            { text: 'Identify the given data and classify each item — Merchandise Exports/Imports are goods (visible); Services.' },
            { text: 'Recall formulas — BoT = X_g - M_g; BoCA = BoT + (X_s - M_s) + NPI + NSI.' },
            { text: 'Compute BoT = 447 - 714 = -$267 bn (merchandise trade deficit).' },
            { text: 'Compute Net Services = 325 - 168 = +$157 bn; Net Invisibles = 157 + (-38) + 112 = +$231 bn.' },
            { text: 'Compute BoCA = -267 + 231 = -$36 bn (current account deficit).' },
            { text: 'Interpret — Despite a large merchandise deficit ($267 bn), strong services surplus ($157 bn) and remittances ($112 bn).', faded: true, blankAnswer: 'BoT = -$267 bn; BoCA = -$36 bn (Current Account Deficit.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_009', title: 'Balance of Payments Deficit and Surplus: Meaning',
          scaffold: { problem: 'India\'s BoP data for a quarter (in $ billion): Merchandise exports 100, Merchandise imports 130, Service exports 50, Service imports 30.',
            steps: [
            { text: 'Compute Current Account Balance = (Merchandise exports - Merchandise imports) + (Service exports - Service imports).' },
            { text: 'Compute Autonomous Capital Account Balance = FDI net + Portfolio net + Short-term credit net = 15 + (-5) + 5 = +15.' },
            { text: 'Compute Net Autonomous Balance = Current Account + Capital Account = 5 + 15 = +20 (Surplus).' },
            { text: 'By BoP identity, Net Autonomous Balance + Change in Official Reserves = 0. Therefore, Change in Official Reserves = -20.' },
            { text: 'Interpretation: India has a BoP surplus of $20 billion; RBI\'s foreign exchange reserves increase by $20 billion.', faded: true, blankAnswer: 'BoP Surplus = $20 billion; Official Reserves increase.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_010', title: 'Foreign Exchange Rate: Meaning and Determination',
          scaffold: { problem: 'India imports crude oil worth $100 billion annually. The current exchange rate is ₹82/$.',
            steps: [
            { text: 'Identify the given data: Import volume = $100 billion, Initial exchange rate e₁ = ₹82/$, New exchange rate e₂ = ₹86/$.' },
            { text: 'Recall the formula: Import bill in ₹ = (Import volume in $) × (Exchange rate in ₹/$)' },
            { text: 'Calculate initial import bill: ₹82/$ × $100 billion = ₹8,200 billion' },
            { text: 'Calculate new import bill: ₹86/$ × $100 billion = ₹8,600 billion' },
            { text: 'Calculate absolute increase: ₹8,600 billion - ₹8,200 billion = ₹400 billion' },
            { text: 'Calculate percentage increase: (₹400 billion / ₹8,200 billion) × 100 = 4.88%', faded: true, blankAnswer: 'Import bill increases by ₹400 billion (4.88%)' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_11_011', title: 'Systems of Exchange Rate: Fixed vs Flexible Exchange Rate',
          caseStudy: { intro: 'Imagine you are an importer in Mumbai needing to pay $1 million for machinery from the US. You go to your bank to buy dollars.',
            decisions: [{ prompt: 'Define a fixed exchange rate system and state the specific obligation it imposes on the central bank.', options: [
                { text: 'A fixed exchange rate system is one where the government/central bank announces an', outcome: 'A fixed exchange rate system is one where the government/central bank announces an official par.' },
                { text: 'the rate never changes', outcome: 'Not quite — Students often think "fixed exchange rate means the exchange rate never changes." In reality,.', reveals: 'fixed-exchange-rate-means-the' },
                { text: 'the central bank sets the rate but doesn\'t have to intervene', outcome: 'Not quite — Students often think "fixed exchange rate means the exchange rate never changes." In reality,.', reveals: 'fixed-exchange-rate-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Sorting budget items for a civics project, a student files the government\'s PSU stake sale under \'revenue receipts\' — \'it\'s money coming in, so it\'s revenue\' — and a new AIIMS under revenue expenditure too.',
            decisions: [{ prompt: 'Where does the classification actually turn?', options: [
                { text: 'On assets and liabilities, not size or recurrence alone: selling a stake reduces a government asset → capital receipt; building a hospital creates one → capital expenditure.', outcome: 'The revenue/capital split asks \'does this change the government\'s balance sheet?\' — interest of ₹9 lakh crore stays revenue while a small disinvestment is capital.' },
                { text: 'He\'s right — any inflow is revenue, and salaries-like recurring spend is what revenue expenditure covers, so both filings stand.', outcome: 'Inflows that shrink assets (disinvestment) or create liabilities (borrowings) are capital receipts regardless of being \'income\'.', reveals: 'inflow-equals-revenue' },
                { text: 'Swap by size — big-ticket items like AIIMS are \'capital\' only because they\'re expensive.', outcome: 'The hospital is capital because it creates an asset, not because it\'s costly — a ₹1-lakh-crore interest bill is still revenue expenditure.', reveals: 'big-money-is-capital' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_11_011', title: 'You made it',
          caseStudy: { intro: 'You can now deconstruct any Union Budget headline — deficit targets, capex pushes, subsidy bills — into its true anatomy. Budget questions practically mark themselves once the split clicks.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_007', difficulty: 'standard',
          question: 'The Balance of Payments (BoP) is a systematic, double-entry record of all.',
          hint: 'If stuck, review Class 11 Accounting nodes c11_acc_cbse_03_004 and c11_acc_cbse_03_005.',
          misconception: 'Students often think "Balance of Payments deficit" means the BoP doesn\'t balance.',
          parts: [
                { id: 'a', prompt: 'Classify the following transactions into Current Account or Capital Account, and indicate credit (+) or debit (−): (a) India imports crude oil worth $5.', answer: '(a) Import of goods → Current Account, Debit (−)',
                  options: ['(a) Import of goods → Current Account, Debit (−)', 'Balance of Payments deficit', 'deficit in a sub-account', 'BoP not balancing'],
                  hint: 'If stuck, review Class 11 Accounting nodes c11_acc_cbse_03_004 and c11_acc_cbse_03_005.',
                  misconception: 'Students often think "Balance of Payments deficit" means the BoP doesn\'t balance. In fact, BoP always balances as an accounting identity.' }
          ],
            remediations: { 'balance-of-payments-deficit-means': { steps: ['If the student confuses BoP accounting identity with sub-account balances: (1) Revisit the double-entry principle using.', '(2) Use the NCERT Table 6.1 (Structure of BoP) to map each transaction to its two entries.', '(3) Practice with the worked examples below until the student can automatically generate the offsetting entry for any.', '(4) Re-diagnostic: Ask the student to explain why a Current Account deficit of ₹50,000 crore does NOT mean "BoP is.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Balance of Payments deficit" means the BoP doesn\'t balance.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A country running a persistent Current Account deficit is living beyond its means and must eventually default." Use BoP accounting.', answer: 'The statement is not necessarily true',
                  options: ['The statement is not necessarily true', 'Balance of Payments deficit', 'deficit in a sub-account', 'BoP not balancing'],
                  hint: 'If stuck, review Class 11 Accounting nodes c11_acc_cbse_03_004 and c11_acc_cbse_03_005.',
                  misconception: 'Students often think "Balance of Payments deficit" means the BoP doesn\'t balance. In fact, BoP always balances as an accounting identity.' }
          ],
            remediations: { 'balance-of-payments-deficit-means': { steps: ['If the student confuses BoP accounting identity with sub-account balances: (1) Revisit the double-entry principle using.', '(2) Use the NCERT Table 6.1 (Structure of BoP) to map each transaction to its two entries.', '(3) Practice with the worked examples below until the student can automatically generate the offsetting entry for any.', '(4) Re-diagnostic: Ask the student to explain why a Current Account deficit of ₹50,000 crore does NOT mean "BoP is.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_008', difficulty: 'standard',
          question: 'Balance of Trade (BoT) is the difference between the value of a country\'s.',
          hint: 'If stuck, revisit c12_eco_cbse_11_007 and practice classifying 10 transactions into.',
          misconception: 'Students equate **Balance of Trade deficit with Current Account deficit** and write "India has a trade deficit, so.',
          parts: [
                { id: 'a', prompt: 'Country Y has BoT = -$50 bn and BoCA = +$10 bn. Country Z has BoT = +$30 bn and BoCA = -$5 bn.', answer: 'Net Invisibles = BoCA - BoT',
                  options: ['Net Invisibles = BoCA - BoT', 'trade deficit'],
                  hint: 'If stuck, revisit c12_eco_cbse_11_007 and practice classifying 10 transactions into Current Account.',
                  misconception: 'Students equate **Balance of Trade deficit with Current Account deficit** and write "India has a trade deficit, so it has a current account.' }
          ],
            remediations: { 'students-equate-balance-of-trade': { steps: ['Revisit **c12_eco_cbse_11_007** (Balance of Payments: Meaning and Structure) — re-learn the 3-account classification.', 'Create a **component classification table** from memory: write "Goods, Services, Primary Income, Secondary Income".', 'Check against NCERT Table 5.1.', 'Re-do **Diagnostic Question 3** with fresh data: invent your own numbers for X_g, M_g, X_s, M_s, Net Primary Income.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_009', difficulty: 'standard',
          question: 'Balance of Payments (BoP) deficit occurs when a country\'s total autonomous.',
          hint: 'If stuck on classification, revisit the "Credit/Debit" and "Current/Capital Account".',
          misconception: 'Students often think "Balance of Payments deficit" means the country has not paid its bills or that the BoP accounts.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Balance of Payments (BoP) deficit occurs when a country\'s total autonomous payments',
                  options: ['Balance of Payments (BoP) deficit occurs when a country\'s total autonomous payments', 'A government budget is an annual financial statement presenting the government\'s', 'Revenue receipts are government inflows that neither create a liability nor reduce assets', 'Revenue expenditure refers to government spending that does not create any physical or'],
                  hint: 'If stuck on classification, revisit the "Credit/Debit" and "Current/Capital Account" rules.',
                  misconception: 'Students often think "Balance of Payments deficit" means the country has not paid its bills or that the BoP accounts don\'t balance.' }
          ],
            remediations: { 'balance-of-payments-deficit-means': { steps: ['If the student cannot distinguish autonomous vs accommodating transactions, have them revisit c12_eco_cbse_11_007 (BoP.', 'Do this exercise: Take a simple transaction (e.g., Indian importer pays $1M for machinery).', 'Write the two BoP entries: Debit: Import of goods (autonomous, current account); Credit: Reduction in foreign currency.', 'Repeat for 5 varied transactions until the classification becomes automatic.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_010', difficulty: 'standard',
          question: 'The foreign exchange rate is the price of one country\'s currency expressed.',
          hint: 'Revisit Class 9 Market Equilibrium (c9_eco_ch2_10) and practice 3 demand-supply shift.',
          misconception: 'Students believe that "depreciation of rupee means the rupee becomes stronger" because they confuse the direction: they.',
          parts: [
                { id: 'a', prompt: 'Define foreign exchange rate and state how it is quoted in the Indian context (direct vs indirect quote). What does a quote of ₹83.50 per US Dollar mean?', answer: 'Foreign exchange rate is the price of one currency in terms of another',
                  options: ['Foreign exchange rate is the price of one currency in terms of another', '$83.50 per rupee', 'indirect quote', 'depreciation of rupee means the rupee becomes stronger'],
                  hint: 'Revisit Class 9 Market Equilibrium (c9_eco_ch2_10) and practice 3 demand-supply shift problems with.',
                  misconception: 'Students believe that "depreciation of rupee means the rupee becomes stronger" because they confuse the direction: they see the number ₹/$.' },
                { id: 'b', prompt: 'Explain why the demand curve for foreign exchange is downward sloping and the supply curve is upward sloping.', answer: 'Demand curve slopes downward',
                  options: ['Demand curve slopes downward', 'demand rises when exchange rate rises', 'depreciation of rupee means the rupee becomes stronger', 'higher number = stronger currency'],
                  hint: 'Revisit Class 9 Market Equilibrium (c9_eco_ch2_10) and practice 3 demand-supply shift problems with.',
                  misconception: 'Students believe that "depreciation of rupee means the rupee becomes stronger" because they confuse the direction: they see the number ₹/$.' },
                { id: 'c', prompt: 'Analyse the impact on the Indian rupee exchange rate (₹/$) if: (a) Global crude oil prices rise sharply, (b) The US Federal Reserve raises interest rates while.', answer: 'Global crude oil prices rise sharply, (',
                  options: ['Global crude oil prices rise sharply, (', 'US rate hike makes dollar cheaper', 'FPI selling increases supply of dollars', 'depreciation of rupee means the rupee becomes stronger'],
                  hint: 'Revisit Class 9 Market Equilibrium (c9_eco_ch2_10) and practice 3 demand-supply shift problems with.',
                  misconception: 'Students believe that "depreciation of rupee means the rupee becomes stronger" because they confuse the direction: they see the number ₹/$.' }
          ],
            remediations: { 'depreciation-of-rupee-means-the': { steps: ['If the student confuses appreciation/depreciation direction: (1) Revisit the definition of direct quote (₹/$) using.', 'Similarly, if 1$ costs ₹80 and rises to ₹85, the dollar became dearer, so rupee became cheaper." (2) Practice 5.', '(3) Re-draw the demand-supply diagram labelling axes correctly: Y-axis = Exchange rate (₹/$), X-axis = Quantity of $.', '(4) Take the diagnostic test again — if error persists, revisit Class 9 market equilibrium (c9_eco_ch2_10) where price.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_011', difficulty: 'standard',
          question: 'A fixed exchange rate system is one where the government or central bank pegs.',
          hint: 'If stuck, review the foreign exchange market diagram and the concepts of excess demand.',
          misconception: 'Students often think "fixed exchange rate means the exchange rate never changes." In reality, a fixed rate can.',
          parts: [
                { id: 'a', prompt: 'Why does a country operating under a fixed exchange rate system need to hold large foreign exchange reserves?', answer: 'Under a fixed rate, the exchange rate cannot adjust to equate demand and supply',
                  options: ['Under a fixed rate, the exchange rate cannot adjust to equate demand and supply', 'reserves are needed to pay for imports', 'fixed exchange rate means the exchange rate never changes', 'the central bank intervenes'],
                  hint: 'If stuck, review the foreign exchange market diagram and the concepts of excess demand and excess.',
                  misconception: 'Students often think "fixed exchange rate means the exchange rate never changes." In reality, a fixed rate can be changed by official.' },
                { id: 'b', prompt: 'Suppose Country X fixes its currency at 10 units per USD. Initially, market demand = market supply = $50 billion at this rate.', answer: 'Excess demand = $70b - $50b = $20b',
                  options: ['Excess demand = $70b - $50b = $20b', 'fixed exchange rate means the exchange rate never changes', 'the central bank intervenes', '"fixed exchange rate means the exchange rate never changes'],
                  hint: 'If stuck, review the foreign exchange market diagram and the concepts of excess demand and excess.',
                  misconception: 'Students often think "fixed exchange rate means the exchange rate never changes." In reality, a fixed rate can be changed by official.' }
          ],
            remediations: { 'fixed-exchange-rate-means-the': { steps: ['If the student conflates fixed and managed floating, or thinks fixed rates are immutable: (1) Revisit node.', '(2) Draw a diagram with a horizontal line (fixed rate) intersecting demand and supply curves; show excess demand/supply.', '(3) Contrast with a diagram where the exchange rate moves to clear the market (flexible).', '(4) Practice identifying the regime from news headlines: "RBI sells dollars to stem rupee fall" → managed floating (no.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
