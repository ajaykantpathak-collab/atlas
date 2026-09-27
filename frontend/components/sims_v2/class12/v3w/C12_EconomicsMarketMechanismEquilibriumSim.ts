import type { SimDef } from '../../engine/types';
import C12_EconomicsMarketMechanismEquilibriumSim from '../../../simulations/c6_12/C12_EconomicsMarketMechanismEquilibriumSim';

/** v3 wrapped master — C12_EconomicsMarketMechanismEquilibriumSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_economicsmarketmechanismequilibriumsim: SimDef = {
    id: 'v3w_c12_economicsmarketmechanismequilibriumsim',
    title: 'Market Mechanism Equilibrium',
    subtitle: 'Covers: Meaning of price ceiling, rationale (equity/affordability), binding vs.',
    classLevel: 12, subject: 'economics', topic: 'Price Ceiling: Meaning, Rationale and Effects (Black Market)',
    chapters: [],
    nodeIds: ['c12_eco_cbse_05_006', 'c12_eco_cbse_04_006', 'c12_eco_cbse_11_011', 'c12_eco_cbse_05_001', 'c12_eco_cbse_05_002', 'c12_eco_cbse_05_003', 'c12_eco_cbse_05_004', 'c12_eco_cbse_05_005', 'c12_eco_cbse_05_007', 'c12_eco_cbse_05_008', 'c12_eco_cbse_01_002', 'c12_eco_cbse_10_007', 'c12_eco_cbse_10_010', 'c12_eco_cbse_11_010', 'c12_eco_cbse_11_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you go to a fair-price shop in Delhi to buy wheat at the government-fixed rate of ₹22/kg, but the.', goal: 'Master Market Mechanism Equilibrium.' },
    discovery: {
        question: '"In the long run, a perfectly competitive firm produces at the minimum point of its LAC curve.',
        options: ['Yes, the firm is productively efficient', 'only productively efficient', 'in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i'],
        answer: 'Yes, the firm is productively efficient',
        hook: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner.',
    },
    teaching: [
        { title: 'A price ceiling is a government-imposed.', text: 'A price ceiling is a government-imposed maximum legal price that sellers can charge for a good or service, set below the market equilibrium price to make essential goods affordable for consumers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_eco_cbse_05_006', title: 'A price ceiling is a government-imposed.',
          scaffold: { problem: 'The market for rice in a Tamil Nadu district has demand Qd = 5000 - 200P and supply Qs = 1000 + 150P (Q in tonnes, P in ₹/kg).',
            steps: [
            { text: 'Find free-market equilibrium by setting Qd = Qs → 5000 - 200P = 1000 + 150P → 4000 = 350P → P* = ₹11.43/kg.' },
            { text: 'Compare ceiling Pc = ₹12 with P* = ₹11.43. Since Pc > P*, the ceiling is **non-binding** — the market price is already.' },
            { text: 'At Pc = ₹12, Qd = 5000 - 200(12) = 2600 tonnes, Qs = 1000 + 150(12) = 2800 tonnes.' },
            { text: 'Since there is no shortage (in fact a surplus at Pc), buffer stock release is **not needed**.' },
            { text: 'Policy insight: The ceiling must be set *below* P* to bind. If the intent was ₹10/kg, recalculate: at Pc=10, Qd=3000,.', faded: true, blankAnswer: '(a) P* = ₹11.43/kg, Q* = 2714 tonnes; (b) Non-binding (Pc >.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_04_006', title: 'Long-run equilibrium of a firm under.',
          scaffold: { problem: 'A representative firm in a perfectly competitive industry has a long-run total cost function LTC(q) = 2q³ - 24q² + 128q.',
            steps: [
            { text: 'Derive the long-run average cost function: LAC(q) = LTC/q = 2q² - 24q + 128.' },
            { text: 'Find the output level that minimizes LAC by taking the first derivative and setting to zero: d(LAC)/dq = 4q - 24 = 0 →.' },
            { text: 'Verify it is a minimum using the second derivative: d²(LAC)/dq² = 4 > 0, so LAC is minimized at q* = 6.' },
            { text: 'Compute the minimum LAC: LAC(6) = 2(36) - 24(6) + 128 = 72 - 144 + 128 = 56.' },
            { text: 'Find market quantity demanded at P* = 56: Qd = 2000 - 50(56) = 2000 - 2800 = -800?' },
            { text: 'Number of firms n = Qd / q* = 880 / 6 ≈ 146.67 → 146 firms (since firms are discrete, but in continuous model n =.', faded: true, blankAnswer: '(a) P* = ₹56 per unit; (b) q* = 6 units per firm; (c) n ≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_11_011', title: 'A fixed exchange rate system is one.',
          scaffold: { problem: 'India operates a managed floating exchange rate regime. The current market exchange rate is ₹83.00 per USD.',
            steps: [
            { text: 'Identify the regime — managed floating means the RBI intervenes to limit volatility, not to fix a specific rate.' },
            { text: 'Recognize that excess demand of $2 billion at ₹83.00 would, without intervention, push the rate above ₹83.00.' },
            { text: 'The RBI sells $2 billion from reserves to meet the excess demand.' },
            { text: 'With the additional supply, the market clears at the original rate ₹83.00 (assuming the intervention is fully effective.' },
            { text: 'Interpret: Reserves fall by $2 billion; the exchange rate remains within the band.', faded: true, blankAnswer: 'The new exchange rate remains ₹83.00 per USD (within the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_05_001', title: 'Market equilibrium is a state in a.',
          scaffold: { problem: 'In a local fish market, the daily market demand for pomfret is given by Qd = 200 - 5P (kg) and the daily market supply is Qs = 50 + 10P.',
            steps: [
            { text: 'Identify the equilibrium condition: Qd = Qs.' },
            { text: 'Substitute the given functions: 200 - 5P = 50 + 10P.' },
            { text: 'Solve for P: 200 - 50 = 10P + 5P → 150 = 15P → P = ₹10/kg.' },
            { text: 'Find equilibrium quantity: Substitute P = 10 into either equation: Qd = 200 - 5(10) = 150 kg.' },
            { text: 'Analyze the situation at P = ₹12: Qd = 200 - 5(12) = 140 kg; Qs = 50 + 10(12) = 170 kg.', faded: true, blankAnswer: 'Equilibrium price = ₹10/kg, equilibrium quantity = 150 kg..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_05_002', title: 'A shift in demand refers to a change in.',
          scaffold: { problem: 'The market for mangoes in Mumbai in April is described by the demand function Qd = 500 – 10P and supply function Qs = 100 + 5P (Q in.',
            steps: [
            { text: 'Identify the given functions and the shift. Initial demand: Qd = 500 – 10P. Supply: Qs = 100 + 5P.' },
            { text: 'Calculate initial equilibrium. Set Qd = Qs: 500 – 10P = 100 + 5P → 400 = 15P → P₁ = 400/15 = 80/3 ≈ 26.67 ₹/kg.' },
            { text: 'Calculate new equilibrium after shift. Set Qd\' = Qs: 600 – 10P = 100 + 5P → 500 = 15P → P₂ = 500/15 = 100/3 ≈ 33.33.' },
            { text: 'Compute changes. ΔP = P₂ – P₁ = (100/3 – 80/3) = 20/3 ≈ 6.67 ₹/kg (increase).' },
            { text: 'Describe the adjustment. At the old price ₹26.67, new demand is 600 – 10(26.67) = 333.33 tonnes, but supply is only.', faded: true, blankAnswer: 'Initial equilibrium: P = ₹26.67/kg, Q = 233.33 tonnes. New.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_05_003', title: 'A shift in supply occurs when a.',
          caseStudy: { intro: 'Imagine you run a small wheat flour (atta) mill in Punjab. Last year, you bought wheat at ₹2,200 per quintal; this year, a bumper harvest pushes the wheat.',
            decisions: [{ prompt: 'Define "increase in supply" and "decrease in supply" using the concept of a shift of the supply curve.', options: [
                { text: '**Correct answer:** An **increase in supply** is a rightward shift of the entire supply', outcome: '**Correct answer:** An **increase in supply** is a rightward shift of the entire supply curve — at.' },
                { text: 'increase in supply means quantity supplied goes up when price rises', outcome: 'Not quite — **Misconception:** "When supply increases, price falls, so producers earn less revenue — therefore.', reveals: 'misconception-when-supply-increases' }
            ] }] } }
    ],
    explore: { component: C12_EconomicsMarketMechanismEquilibriumSim, prompt: 'Explore the interactive — Market Mechanism Equilibrium' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_006', difficulty: 'standard',
          question: 'A price ceiling is a government-imposed maximum legal price that sellers can.',
          hint: 'If stuck, revisit c12_eco_cbse_05_001 for equilibrium calculation and surplus.',
          misconception: '**Misconception:** "A price ceiling always benefits consumers because they pay a lower price." **Reality:** Only.',
          parts: [
                { id: 'a', prompt: 'Explain why a price ceiling on essential medicines, while intended to help poor patients, often leads to the very patients being unable to buy the medicine at.', answer: 'At the ceiling price Pc, quantity supplied (Qs) falls',
                  options: ['At the ceiling price Pc, quantity supplied (Qs) falls', 'producers stop producing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "A price ceiling always benefits consumers because they pay a lower price." **Reality:** Only consumers who *actually.' },
                { id: 'b', prompt: 'Compare the welfare effects of a binding price ceiling on consumers who successfully purchase the good versus consumers who are unable to purchase it.', answer: 'Consumers who buy at Pc gain: they pay less than P* for Qs units',
                  options: ['Consumers who buy at Pc gain: they pay less than P* for Qs units', 'consumers always gain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "A price ceiling always benefits consumers because they pay a lower price." **Reality:** Only consumers who *actually.' }
          ],
            remediations: { 'misconception-a-price-ceiling-always': { steps: ['If the student holds this misconception: 1.', '**Revisit node c12_eco_cbse_05_001 (Market Equilibrium)** — confirm understanding that at P*, Qd = Qs and all willing.', '**Draw the graph:** Mark P*, Q*.', 'Draw horizontal line at Pc < P*.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "A price ceiling always benefits consumers because they pay a lower price." **Reality:** Only.',
          parts: [
                { id: 'a', prompt: 'Compare the welfare effects of a binding price ceiling on consumers who successfully purchase the good versus consumers who are unable to purchase it.', answer: 'Consumers who buy at Pc gain: they pay less than P* for Qs units',
                  options: ['Consumers who buy at Pc gain: they pay less than P* for Qs units', 'consumers always gain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "A price ceiling always benefits consumers because they pay a lower price." **Reality:** Only consumers who *actually.' }
          ],
            remediations: { 'misconception-a-price-ceiling-always': { steps: ['If the student holds this misconception: 1.', '**Revisit node c12_eco_cbse_05_001 (Market Equilibrium)** — confirm understanding that at P*, Qd = Qs and all willing.', '**Draw the graph:** Mark P*, Q*.', 'Draw horizontal line at Pc < P*.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_04_006', difficulty: 'standard',
          question: 'Long-run equilibrium of a firm under perfect competition occurs when the firm.',
          hint: 'If stuck, revisit c12_eco_cbse_04_004 (Short Run Equilibrium) and c12_eco_cbse_04_005.',
          misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner.',
          parts: [
                { id: 'a', prompt: 'State the three conditions that must hold simultaneously for a perfectly competitive firm to be in long-run equilibrium.', answer: 'The three conditions are: (1) Price = Long-run Marginal Cost (P = LMC)',
                  options: ['The three conditions are: (1) Price = Long-run Marginal Cost (P = LMC)', 'in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner takes home no money).' },
                { id: 'b', prompt: 'A perfectly competitive firm has a long-run total cost function LTC(q) = q³ - 10q² + 36q. The market demand is Qd = 120 - 5P.', answer: 'Step 1: Find LAC = LTC/q = q² - 10q + 36',
                  options: ['Step 1: Find LAC = LTC/q = q² - 10q + 36', 'in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner takes home no money).' },
                { id: 'c', prompt: 'Compare the long-run industry supply curve under three scenarios: (a) constant cost industry, (b) increasing cost industry, (c) decreasing cost industry.', answer: 'constant cost industry, (',
                  options: ['constant cost industry, (', 'in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner takes home no money).' }
          ],
            remediations: { 'in-long-run-equilibrium': { steps: ['If the student confuses accounting vs.', 'economic profit, revisit c12_eco_cbse_04_001 (Perfect Competition assumptions) and c11_eco_cbse_04_001 (Human Capital.', 'If they cannot derive min LAC, practice calculus optimization: set derivative of LAC to zero, verify second derivative.', 'If they miss the entry/exit mechanism, re-read the walkthrough scenario of the Punjab wheat farmer and trace the.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner.',
          parts: [
                { id: 'a', prompt: '"In the long run, a perfectly competitive firm produces at the minimum point of its LAC curve.', answer: 'Yes, the firm is productively efficient',
                  options: ['Yes, the firm is productively efficient', 'only productively efficient', 'in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner takes home no money).' },
                { id: 'b', prompt: 'Construct a numerical example where a perfectly competitive firm initially earns supernormal profit in the short run, then show step-by-step how the industry.', answer: 'Example: Firm\'s LTC = q³ - 8q² + 20q',
                  options: ['Example: Firm\'s LTC = q³ - 8q² + 20q', 'in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that in long-run equilibrium, the firm\'s profit is zero in the accounting sense (i.e., the owner takes home no money).' }
          ],
            remediations: { 'in-long-run-equilibrium': { steps: ['If the student confuses accounting vs.', 'economic profit, revisit c12_eco_cbse_04_001 (Perfect Competition assumptions) and c11_eco_cbse_04_001 (Human Capital.', 'If they cannot derive min LAC, practice calculus optimization: set derivative of LAC to zero, verify second derivative.', 'If they miss the entry/exit mechanism, re-read the walkthrough scenario of the Punjab wheat farmer and trace the.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_011', difficulty: 'standard',
          question: 'A fixed exchange rate system is one where the government or central bank pegs.',
          hint: 'If stuck, review the foreign exchange market diagram and the concepts of excess demand.',
          misconception: 'Students often think "fixed exchange rate means the exchange rate never changes." In reality, a fixed rate can be.',
          parts: [
                { id: 'a', prompt: 'Why does a country operating under a fixed exchange rate system need to hold large foreign exchange reserves?', answer: 'Under a fixed rate, the exchange rate cannot adjust to equate demand and supply',
                  options: ['Under a fixed rate, the exchange rate cannot adjust to equate demand and supply', 'reserves are needed to pay for imports', 'fixed exchange rate means the exchange rate never changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "fixed exchange rate means the exchange rate never changes." In reality, a fixed rate can be changed by official.' },
                { id: 'b', prompt: 'Suppose Country X fixes its currency at 10 units per USD. Initially, market demand = market supply = $50 billion at this rate.', answer: 'Excess demand = $70b - $50b = $20b',
                  options: ['Excess demand = $70b - $50b = $20b', 'fixed exchange rate means the exchange rate never changes', 'the central bank intervenes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "fixed exchange rate means the exchange rate never changes." In reality, a fixed rate can be changed by official.' }
          ],
            remediations: { 'fixed-exchange-rate-means-the': { steps: ['If the student conflates fixed and managed floating, or thinks fixed rates are immutable: (1) Revisit node.', '(2) Draw a diagram with a horizontal line (fixed rate) intersecting demand and supply curves; show excess demand/supply.', '(3) Contrast with a diagram where the exchange rate moves to clear the market (flexible).', '(4) Practice identifying the regime from news headlines: "RBI sells dollars to stem rupee fall" → managed floating (no.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_11_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "fixed exchange rate means the exchange rate never changes." In reality, a fixed rate can be.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A flexible exchange rate system is superior to a fixed exchange rate system for a developing economy like India because it provides.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'fixed exchange rate means the exchange rate never changes', 'the central bank intervenes', '"fixed exchange rate means the exchange rate never changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "fixed exchange rate means the exchange rate never changes." In reality, a fixed rate can be changed by official.' },
                { id: 'b', prompt: 'Design a policy response for a country with a fixed exchange rate that is experiencing a persistent balance of payments deficit and dwindling reserves.', answer: 'an expenditure-reducing policy, (',
                  options: ['an expenditure-reducing policy, (', 'fixed exchange rate means the exchange rate never changes', 'the central bank intervenes', '"fixed exchange rate means the exchange rate never changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "fixed exchange rate means the exchange rate never changes." In reality, a fixed rate can be changed by official.' }
          ],
            remediations: { 'fixed-exchange-rate-means-the': { steps: ['If the student conflates fixed and managed floating, or thinks fixed rates are immutable: (1) Revisit node.', '(2) Draw a diagram with a horizontal line (fixed rate) intersecting demand and supply curves; show excess demand/supply.', '(3) Contrast with a diagram where the exchange rate moves to clear the market (flexible).', '(4) Practice identifying the regime from news headlines: "RBI sells dollars to stem rupee fall" → managed floating (no.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_001', difficulty: 'standard',
          question: 'Market equilibrium is a state in a competitive market where the quantity.',
          hint: 'If stuck, revisit Class 9 Economics Chapter 2 (demand, supply, market equilibrium basics).',
          misconception: 'Students often believe that "equilibrium price is the price at which everyone who wants the good can buy it." This is.',
          parts: [
                { id: 'a', prompt: 'Given the demand function Qd = 120 – 10P and supply function Qs = 20 + 5P, calculate the equilibrium price and equilibrium quantity. Show all steps.', answer: 'Step 1: Set Qd = Qs → 120 – 10P = 20 + 5P',
                  options: ['Step 1: Set Qd = Qs → 120 – 10P = 20 + 5P', 'equilibrium price is the price at', 'no unmet demand'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "equilibrium price is the price at which everyone who wants the good can buy it." This is wrong because at.' },
                { id: 'b', prompt: 'Compare the equilibrium outcomes when (a) demand increases (curve shifts right) and (b) supply decreases (curve shifts left).', answer: 'demand increases (curve shifts right) and (',
                  options: ['demand increases (curve shifts right) and (', 'both increase quantity', 'supply decrease lowers price'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "equilibrium price is the price at which everyone who wants the good can buy it." This is wrong because at.' }
          ],
            remediations: { 'equilibrium-price-is-the-price': { steps: ['If the student holds the above misconception: 1.', 'Draw a standard demand-supply graph with equilibrium at P* = ₹40, Q* = 100 kg.', 'Pick a point on the demand curve at P = ₹30, Qd = 150 kg.', 'Ask: "At the equilibrium price ₹40, does this consumer buy?" (No, they only buy at ₹30).'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "equilibrium price is the price at which everyone who wants the good can buy it." This is.',
          parts: [
                { id: 'a', prompt: 'A student argues: "If the government sets a minimum support price (MSP) for wheat above the equilibrium price, farmers will sell more wheat and consumers will.', answer: 'The statement is false',
                  options: ['The statement is false', 'quantity supplied', 'quantity traded', 'equilibrium price is the price at'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "equilibrium price is the price at which everyone who wants the good can buy it." This is wrong because at.' },
                { id: 'b', prompt: 'Compare the equilibrium outcomes when (a) demand increases (curve shifts right) and (b) supply decreases (curve shifts left).', answer: 'demand increases (curve shifts right) and (',
                  options: ['demand increases (curve shifts right) and (', 'both increase quantity', 'supply decrease lowers price', 'equilibrium price is the price at'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "equilibrium price is the price at which everyone who wants the good can buy it." This is wrong because at.' }
          ],
            remediations: { 'equilibrium-price-is-the-price': { steps: ['If the student holds the above misconception: 1.', 'Draw a standard demand-supply graph with equilibrium at P* = ₹40, Q* = 100 kg.', 'Pick a point on the demand curve at P = ₹30, Qd = 150 kg.', 'Ask: "At the equilibrium price ₹40, does this consumer buy?" (No, they only buy at ₹30).'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_002', difficulty: 'standard',
          question: 'A shift in demand refers to a change in the quantity demanded at every price.',
          hint: 'If stuck, revisit c12_eco_cbse_05_001 for equilibrium mechanics and c9_eco_ch2_4 to.',
          misconception: 'Students often say: "When demand increases, price goes up, so quantity demanded should go down (law of demand),.',
          parts: [
                { id: 'a', prompt: 'State the exact effect on equilibrium price and equilibrium quantity when the demand curve shifts rightward (increase in demand) while the supply curve remains.', answer: 'Equilibrium price rises and equilibrium quantity rises',
                  options: ['Correct answer: Equilibrium price rises and equilibrium quantity rises', 'price rises but quantity falls', 'price unchanged'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often say: "When demand increases, price goes up, so quantity demanded should go down (law of demand), therefore equilibrium.' }
          ],
            remediations: { 'students-often-say-when-demand': { steps: ['If the student holds the above misconception: 1.', 'Revisit **c9_eco_ch2_3: Demand Curve: Downward Sloping and Its Meaning** to reinforce "movement along vs shift".', 'Use a numerical example: Original demand Qd=100–2P, supply Qs=20+2P.', 'Demand shifts to Qd\'=120–2P.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often say: "When demand increases, price goes up, so quantity demanded should go down (law of demand),.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "An increase in consumer income will always increase the equilibrium price of a normal good." Is this true, false, or uncertain?', answer: '**Uncertain / False in a specific case**',
                  options: ['Correct answer: **Uncertain / False in a specific case**', 'every demand shift must change price'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often say: "When demand increases, price goes up, so quantity demanded should go down (law of demand), therefore equilibrium.' }
          ],
            remediations: { 'students-often-say-when-demand': { steps: ['If the student holds the above misconception: 1.', 'Revisit **c9_eco_ch2_3: Demand Curve: Downward Sloping and Its Meaning** to reinforce "movement along vs shift".', 'Use a numerical example: Original demand Qd=100–2P, supply Qs=20+2P.', 'Demand shifts to Qd\'=120–2P.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_003', difficulty: 'standard',
          question: 'A shift in supply occurs when a non-price determinant of supply (such as input.',
          hint: 'If stuck, immediately revisit **c12_eco_cbse_05_001** for equilibrium mechanics and.',
          misconception: '**Misconception:** "When supply increases, price falls, so producers earn less revenue — therefore producers would.',
          parts: [
                { id: 'a', prompt: 'Compare the effects of a **rightward shift in supply** versus a **rightward shift in demand** on equilibrium price and equilibrium quantity.', answer: '**Correct answer:** | Shift Type | Equilibrium Price | Equilibrium Quantity |',
                  options: ['**Correct answer:** | Shift Type | Equilibrium Price | Equilibrium Quantity |', 'both shifts raise price', 'both lower quantity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "When supply increases, price falls, so producers earn less revenue — therefore producers would never voluntarily adopt.' }
          ],
            remediations: { 'misconception-when-supply-increases': { steps: ['Revisit **node c12_eco_cbse_05_001** (Market Equilibrium: Meaning and Determination) — practice finding equilibrium.', 'Revisit **node c9_eco_ch2_7** (Supply: Definition and Law of Supply) and **c9_eco_ch2_8** (Supply Curve) — drill the.', 'Do a **re-diagnostic**: Take the onion problem from **DIAGNOSTIC_QUESTION_3** but change the shift to a *leftward*.', 'Solve for new P, Q, ΔP, ΔQ.'] } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "When supply increases, price falls, so producers earn less revenue — therefore producers would.',
          parts: [
                { id: 'a', prompt: 'Construct a real-world Indian market scenario (different from wheat, onions, or mangoes) where a **leftward shift in supply** occurs due to a **government.', answer: '**Expected answer (criteria for a good response):** - **Scenario example:** The',
                  options: ['**Expected answer (criteria for a good response):** - **Scenario example:** The', 'stricter norm raises cost', 'increases supply'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "When supply increases, price falls, so producers earn less revenue — therefore producers would never voluntarily adopt.' },
                { id: 'b', prompt: 'Compare the effects of a **rightward shift in supply** versus a **rightward shift in demand** on equilibrium price and equilibrium quantity.', answer: '**Correct answer:** | Shift Type | Equilibrium Price | Equilibrium Quantity |',
                  options: ['**Correct answer:** | Shift Type | Equilibrium Price | Equilibrium Quantity |', 'both shifts raise price', 'both lower quantity', 'quantity change is ambiguous for supply shift'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "When supply increases, price falls, so producers earn less revenue — therefore producers would never voluntarily adopt.' }
          ],
            remediations: { 'misconception-when-supply-increases': { steps: ['Revisit **node c12_eco_cbse_05_001** (Market Equilibrium: Meaning and Determination) — practice finding equilibrium.', 'Revisit **node c9_eco_ch2_7** (Supply: Definition and Law of Supply) and **c9_eco_ch2_8** (Supply Curve) — drill the.', 'Do a **re-diagnostic**: Take the onion problem from **DIAGNOSTIC_QUESTION_3** but change the shift to a *leftward*.', 'Solve for new P, Q, ΔP, ΔQ.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
