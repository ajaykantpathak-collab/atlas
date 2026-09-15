import type { SimDef } from '../../engine/types';

/** v3 generated — c9_eco_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_eco_ch02_p2: SimDef = {
    id: 'v3_c9_eco_ch02_p2',
    title: 'The Price Puzzle: What Drives the Market · Part 2/2',
    subtitle: 'Why buyers flee when prices climb — usually',
    classLevel: 9, subject: 'economics', topic: 'The Price Puzzle: What Drives the Market · Part 2/2',
    chapters: ['c9_eco_ch02'],
    nodeIds: ['c9_eco_ch2_4', 'c9_eco_ch2_5', 'c9_eco_ch2_6', 'c9_eco_ch2_7', 'c9_eco_ch2_8', 'c9_eco_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a market-price detective', intro: 'Watch a shopper change her mango order as prices swing week to week, and you\'ll see the Law of Demand in the wild — plus the sneaky exceptions that look like violations but aren\'t.', goal: 'Understand demand as willingness + ability to pay, the Law of Demand\'s inverse price–quantity relationship under ceteris paribus, and the movement-vs-shift distinction.' },
    discovery: {
        question: 'During Diwali, sweet prices RISE and people buy MORE. Did the Law of Demand just break?',
        options: ['No — the law only applies when nothing else changes; festival tastes shifted the whole demand curve rightward', 'Yes — the law is fake', 'Yes — sweets are exempt from economics', 'No — people forgot the prices'],
        answer: 'No — the law only applies when nothing else changes; festival tastes shifted the whole demand curve rightward',
        hook: 'Wanting a ₹50,000 phone isn\'t demand — demand needs a wallet behind the wish. And a price change moves you ALONG the curve; only a change in income, taste or other goods shifts the curve itself.',
    },
    teaching: [
        { title: 'Determinants of Demand: Price of Related Goods', text: 'The demand for a good is affected by the prices of related goods: for substitute goods, a rise in the price of one good increases the demand for the other; for complementary goods, a rise in the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_eco_ch2_4', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Build a demand schedule from mango-season prices, plot the downward-sloping curve, then referee the classic mix-up: when petrol prices rise and Arjun buys less, did his \'demand\' fall or just his \'quantity demanded\'?',
        labels: ['Determinants of Demand: Price', 'Substitute and Complementary Goods', 'Other Determinants: Income, Taste,', 'Supply: Definition and Law', 'Supply Curve: Upward Sloping', 'Determinants of Supply: Technology,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_eco_ch2_4', title: 'Determinants of Demand: Price of Related Goods',
          scaffold: { problem: 'In a Delhi market, the price of LPG cylinders increases from ₹900 to ₹1,100.',
            steps: [
            { text: 'Identify the goods — LPG cylinders and induction stoves. Note own price of induction stoves is constant (₹3,000).' },
            { text: 'Observe direction of change — LPG price ↑ (₹900 → ₹1,100), demand for induction stoves ↑ (20 → 35).' },
            { text: 'Calculate %ΔP_LPG = (1100-900)/900 × 100 = 22.2%. %ΔQ_induction = (35-20)/20 × 100 = 75%.' },
            { text: 'Interpret cross-price effect — both changes positive → positive cross-price elasticity → goods are substitutes.' },
            { text: 'Conclude — demand curve for induction stoves shifts rightward because consumers switch from LPG to induction cooking.', faded: true, blankAnswer: 'LPG cylinders and induction stoves are substitutes. Demand.' }
            ] } },
        { type: 'case', nodeId: 'c9_eco_ch2_5', title: 'Substitute and Complementary Goods: Effect on Demand',
          caseStudy: { intro: 'Imagine you run a small tea stall near a Delhi Metro station. Your regular customers buy tea and biscuits together every morning.',
            decisions: [{ prompt: 'Define substitute goods and complementary goods in terms of how the price of one good affects the demand for the other.', options: [
                { text: 'Substitute goods: an increase in the price of good Y leads to an increase in demand for', outcome: 'Substitute goods: an increase in the price of good Y leads to an increase in demand for good.' },
                { text: 'used together', outcome: 'Not quite — Students often think that if two goods are complements, a rise in the price of one *increases*.', reveals: 'if-two-goods-are-complements' },
                { text: 'demand moves together', outcome: 'Not quite — Students often think that if two goods are complements, a rise in the price of one *increases*.', reveals: 'if-two-goods-are-complements' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch2_6', title: 'Other Determinants: Income, Taste, Seasonality, Expectations',
          scaffold: { problem: 'In a tier-2 city, average monthly household income rises from ₹30,000 to ₹36,000.',
            steps: [
            { text: 'Identify the determinant—income change—and the two goods (branded atta, loose atta).' },
            { text: 'Recall the income elasticity formula: YED = (%ΔQ) / (%ΔY).' },
            { text: 'Compute %ΔY = (36,000 - 30,000) / 30,000 × 100 = 20%.' },
            { text: 'For branded atta: %ΔQ = (9.2 - 8) / 8 × 100 = 15%; YED = 15% / 20% = +0.75 → normal good (necessity).' },
            { text: 'For loose atta: %ΔQ = (10 - 12) / 12 × 100 = -16.67%; YED = -16.67% / 20% = -0.83 → inferior good.' },
            { text: 'Interpret: As income rises, households switch from loose to branded atta, consistent with Engel\'s Law.', faded: true, blankAnswer: 'Branded atta YED = +0.75 (normal good); Loose atta YED.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch2_7', title: 'Supply: Definition and Law of Supply',
          scaffold: { problem: 'A wheat farmer in Punjab has the following cost structure for harvesting: First 10 quintals cost ₹1,800/quintal (own labour, own land).',
            steps: [
            { text: 'Identify the economic principle — profit-maximising supply means produce up to where Price ≥ Marginal Cost (MC).' },
            { text: 'List marginal costs per block: Block 1 (0–10 qtl): MC = ₹1,800; Block 2 (10–20 qtl): MC = ₹2,200; Block 3 (20–30 qtl).' },
            { text: 'At each given price, find how many blocks have MC ≤ Price. At ₹1,800: only Block 1 → 10 qtl.' },
            { text: 'Construct supply schedule: Price (₹/qtl) | Qty Supplied (qtl) — 1800 | 10; 2200 | 20; 2500 | 20; 2800 | 30; 3000 | 30.' },
            { text: 'Interpret — the step-wise supply reflects discrete factor choices (own labour → hired labour → rented machine).', faded: true, blankAnswer: 'Supply schedule as above; at ₹2,500/quintal, farmer.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch2_8', title: 'Supply Curve: Upward Sloping and Its Meaning',
          scaffold: { problem: 'A mango orchard owner in Maharashtra has the following supply schedule: At ₹30/kg, supplies 1000 kg; at ₹40/kg, supplies 1400 kg;.',
            steps: [
            { text: 'Identify the four price-quantity pairs: (1000,30), (1400,40), (1700,50), (1900,60).' },
            { text: 'Calculate slope between first two points: ΔP/ΔQ = (40-30)/(1400-1000) = 10/400 = 0.025 ₹/kg.' },
            { text: 'Calculate slope between second and third: (50-40)/(1700-1400) = 10/300 = 0.033 ₹/kg.' },
            { text: 'Calculate slope between third and fourth: (60-50)/(1900-1700) = 10/200 = 0.05 ₹/kg.' },
            { text: 'Observe slopes are increasing (0.025 → 0.033 → 0.05). This means the curve is getting steeper (convex to origin).', faded: true, blankAnswer: 'Slopes: 0.025, 0.033, 0.05 ₹/kg. The curve is upward.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch2_9', title: 'Determinants of Supply: Technology, Number of Sellers, Expectations',
          scaffold: { problem: 'A bicycle factory in Ludhiana currently produces 50 bicycles/day at a market price of ₹8,000 each.',
            steps: [
            { text: 'Identify the determinant — technology improvement (robotic welding arm) reduces variable cost per unit.' },
            { text: 'Recall the profit-maximisation rule for a competitive firm: produce where Price = Marginal Cost (P = MC).' },
            { text: 'Calculate new marginal cost: Old MC = ₹6,500; Cost reduction = ₹1,200; New MC = ₹6,500 - ₹1,200 = ₹5,300 per bicycle.' },
            { text: 'At market price ₹8,000, the factory will now produce until MC rises to ₹8,000.' },
            { text: 'Interpret: At the same price ₹8,000, quantity supplied increased from 50 to 75 bicycles/day.', faded: true, blankAnswer: 'New quantity supplied = 75 bicycles/day at ₹8,000. Supply.' }
            ] } },
        { type: 'case', nodeId: 'c9_eco_ch2_4', title: 'Use it in the wild',
          caseStudy: { intro: 'A Class 9 student \'demands\' a ₹50,000 phone, telling his father \'demand means desire.\' Weeks later, when the milk price rises from ₹60 to ₹70, the family buys less — and the student reports their \'demand for milk has fallen.\'',
            decisions: [{ prompt: 'How should both statements be corrected?', options: [
                { text: 'Demand needs willingness AND ability to pay — a phone you cannot afford is a desire, not demand. And the milk case is a fall in quantity demanded (moving along the curve as price rose), not a fall in demand — the curve itself shifts only when a non-price factor like income or taste changes.', outcome: 'This applies both board-level distinctions — want versus demand, and movement along versus shift of the curve.' },
                { text: 'Both statements were correct — demand is whatever you want, and buying less means demand fell.', outcome: 'Wanting without the power to pay is not demand, and a price change alone moves along the existing curve rather than shifting it.', reveals: 'demand-is-desire' },
                { text: 'Only the milk point is wrong — the phone claim holds because strong desire creates demand in a market.', outcome: 'Markets respond to effective demand — desire backed by money; without ability to pay, want registers nothing to a seller.', reveals: 'desire-is-demand' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Price up, quantity down — but only ceteris paribus. The demand curve is a snapshot of one price-relationship; let Diwali tastes or a pay rise walk in, and the whole curve packs up and moves.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_eco_ch2_4', difficulty: 'standard',
          question: 'The demand for a good is affected by the prices of related goods: for.',
          hint: 'Review c9_eco_ch2_3 (demand curve meaning) and practice distinguishing "change.',
          misconception: 'Students often think that if the price of a substitute good rises, the demand for the original good falls because.',
          parts: [
                { id: 'a', prompt: 'Define substitute goods and complementary goods in the context of demand. Give one real-life example of each from an Indian market.', answer: 'Substitute goods are goods that can replace each other (e.g., tea and coffee)',
                  options: ['Substitute goods are goods that can replace each other (e.g., tea and coffee)', 'everything becomes more expensive', 'If coffee price rises, people have less money, so they buy less tea too', 'tea and sugar are substitutes'],
                  hint: 'Review c9_eco_ch2_3 (demand curve meaning) and practice distinguishing "change in quantity.',
                  misconception: 'Students often think that if the price of a substitute good rises, the demand for the original good falls because "everything becomes more.' },
                { id: 'b', prompt: 'If the price of diesel increases significantly, what happens to the demand for diesel cars?', answer: 'Demand for diesel cars decreases',
                  options: ['Demand for diesel cars decreases', 'everything becomes more expensive', 'If coffee price rises, people have less money, so they buy less tea too', 'they are substitutes or ignores the joint consumption relationship'],
                  hint: 'Review c9_eco_ch2_3 (demand curve meaning) and practice distinguishing "change in quantity.',
                  misconception: 'Students often think that if the price of a substitute good rises, the demand for the original good falls because "everything becomes more.' },
                { id: 'c', prompt: 'The price of butter increases from ₹200/kg to ₹250/kg. As a result, the demand for margarine at a local store rises from 50 kg/week to 70 kg/week.', answer: '%ΔP_butter = (250-200)/200 × 100 = 25%',
                  options: ['%ΔP_butter = (250-200)/200 × 100 = 25%', 'everything becomes more expensive', 'If coffee price rises, people have less money, so they buy less tea too'],
                  hint: 'Review c9_eco_ch2_3 (demand curve meaning) and practice distinguishing "change in quantity.',
                  misconception: 'Students often think that if the price of a substitute good rises, the demand for the original good falls because "everything becomes more.' },
                { id: 'd', prompt: 'Compare the effect on demand for smartphones when: (a) the price of mobile data plans falls, and (b) the price of laptops falls.', answer: 'the price of mobile data plans falls, and (',
                  options: ['the price of mobile data plans falls, and (', 'everything becomes more expensive', 'If coffee price rises, people have less money, so they buy less tea too'],
                  hint: 'Review c9_eco_ch2_3 (demand curve meaning) and practice distinguishing "change in quantity.',
                  misconception: 'Students often think that if the price of a substitute good rises, the demand for the original good falls because "everything becomes more.' }
          ],
            remediations: { 'if-the-price-of-a': { steps: ['Draw two demand curves side by side — one for tea, one for coffee.', 'Show a price increase for coffee (move up along coffee\'s demand curve).', 'Ask: "At the original tea price, would you buy more or less tea now?"', 'Use a numerical example: coffee ₹50→₹70, tea ₹10. At ₹10 tea, you now prefer tea over coffee, so your quantity demanded.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that if the price of a substitute good rises, the demand for the original good falls because.',
          parts: [
                { id: 'a', prompt: 'Create a scenario involving three goods — Good X, Good Y, and Good Z — where X and Y are substitutes, Y and Z are complements, and X and Z are unrelated.', answer: 'Example: X = tea, Y = coffee, Z = sugar',
                  options: ['Example: X = tea, Y = coffee, Z = sugar', 'everything becomes more expensive', 'If coffee price rises, people have less money, so they buy less tea too'],
                  hint: 'Review c9_eco_ch2_3 (demand curve meaning) and practice distinguishing "change in quantity.',
                  misconception: 'Students often think that if the price of a substitute good rises, the demand for the original good falls because "everything becomes more.' }
          ],
            remediations: { 'if-the-price-of-a': { steps: ['Draw two demand curves side by side — one for tea, one for coffee.', 'Show a price increase for coffee (move up along coffee\'s demand curve).', 'Ask: "At the original tea price, would you buy more or less tea now?"', 'Use a numerical example: coffee ₹50→₹70, tea ₹10. At ₹10 tea, you now prefer tea over coffee, so your quantity demanded.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_5', difficulty: 'standard',
          question: 'Substitute goods are products that satisfy a similar want, so a rise in the.',
          hint: 'Revisit c9_eco_ch2_3 (Demand Curve: Downward Sloping and Its Meaning) and practice.',
          misconception: 'Students often think that if two goods are complements, a rise in the price of one *increases* demand for the other.',
          parts: [
                { id: 'a', prompt: 'If the price of petrol increases significantly, what happens to the demand for cars?', answer: 'Cars and petrol are complements',
                  options: ['Cars and petrol are complements', 'save fuel', 'they go together, so you need more of the other'],
                  hint: 'Revisit c9_eco_ch2_3 (Demand Curve: Downward Sloping and Its Meaning) and practice distinguishing.',
                  misconception: 'Students often think that if two goods are complements, a rise in the price of one *increases* demand for the other because "they.' },
                { id: 'b', prompt: 'The price of Samsung smartphones falls from ₹25,000 to ₹20,000.', answer: 'Step 1: Identify Samsung and Xiaomi as substitutes',
                  options: ['Step 1: Identify Samsung and Xiaomi as substitutes', 'they go together, so you need more of the other'],
                  hint: 'Revisit c9_eco_ch2_3 (Demand Curve: Downward Sloping and Its Meaning) and practice distinguishing.',
                  misconception: 'Students often think that if two goods are complements, a rise in the price of one *increases* demand for the other because "they.' }
          ],
            remediations: { 'if-two-goods-are-complements': { steps: ['Use the "total cost of usage" framework. For complements (car + petrol), calculate total monthly cost = (car EMI).', 'Contrast with substitutes (tea vs coffee): if coffee price rises, tea becomes relatively cheaper *without* changing.', 'Practice with a table: list 5 pairs, identify relationship, predict shift direction.', 'Draw side-by-side diagrams for own-price change (movement along) vs related-price change (shift) to cement the visual.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_6', difficulty: 'standard',
          question: 'Non-price determinants of demand—income, tastes, seasonality, and.',
          hint: 'Revisit c9_eco_ch2_3 (Demand Curve: Downward Sloping and Its Meaning) and practice.',
          misconception: 'Students believe "seasonality affects only supply" because they see seasonal produce arrive in markets.',
          parts: [
                { id: 'a', prompt: 'Define "normal good" and "inferior good" in terms of the income-demand relationship.', answer: 'A normal good is one for',
                  options: ['A normal good is one for', 'inferior goods are low-quality goods', 'inferior', 'seasonality affects only supply'],
                  hint: 'Revisit c9_eco_ch2_3 (Demand Curve: Downward Sloping and Its Meaning) and practice drawing shifts.',
                  misconception: 'Students believe "seasonality affects only supply" because they see seasonal produce arrive in markets.' },
                { id: 'b', prompt: 'Why does a change in consumer taste cause a shift of the demand curve rather than a movement along it?', answer: 'Taste is a non-price determinant',
                  options: ['Taste is a non-price determinant', 'because taste affects price', 'seasonality affects only supply', '"seasonality affects only supply"'],
                  hint: 'Revisit c9_eco_ch2_3 (Demand Curve: Downward Sloping and Its Meaning) and practice drawing shifts.',
                  misconception: 'Students believe "seasonality affects only supply" because they see seasonal produce arrive in markets.' },
                { id: 'c', prompt: 'In a survey, 100 families in Delhi were asked their monthly demand for bus tickets at ₹10 per ticket.', answer: 'Step 1: % change in quantity = (40-60)/60 × 100 = -33.33%',
                  options: ['Step 1: % change in quantity = (40-60)/60 × 100 = -33.33%', 'seasonality affects only supply', '"seasonality affects only supply"'],
                  hint: 'Revisit c9_eco_ch2_3 (Demand Curve: Downward Sloping and Its Meaning) and practice drawing shifts.',
                  misconception: 'Students believe "seasonality affects only supply" because they see seasonal produce arrive in markets.' }
          ],
            remediations: { 'seasonality-affects-only-supply-because': { steps: ['Use a two-column table—column A lists seasonal products (ACs, woolens, mangoes), column B asks "Does my desire for this.', 'For each, plot demand curves for winter vs. summer at same prices to visualise the shift.', 'Compare with supply shifts from c9_eco_ch2_9 to see both curves moving.', 'Practice past board questions where both demand and supply shift seasonally.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_7', difficulty: 'standard',
          question: 'Supply refers to the quantity of a good or service that producers are willing.',
          hint: 'Revisit c9_eco_ch2_1 (Law of Demand) and c8_eco_ch1_2 (Factors of Production) — focus.',
          misconception: 'Students often believe "supply increases when price increases" means the *supply curve shifts right* when price rises.',
          parts: [
                { id: 'a', prompt: 'Define \'supply\' in economics. How does it differ from \'quantity supplied\'?', answer: 'Supply is the entire relationship between price and quantity supplied',
                  options: ['Supply is the entire relationship between price and quantity supplied', 'supply is how much is in the warehouse', 'supply increases when price increases'],
                  hint: 'Revisit c9_eco_ch2_1 (Law of Demand) and c8_eco_ch1_2 (Factors of Production) — focus on how fixed.',
                  misconception: 'Students often believe "supply increases when price increases" means the *supply curve shifts right* when price rises.' },
                { id: 'b', prompt: 'A dairy farmer in Gujarat supplies milk at different prices as shown: at ₹40/litre, 200 litres; at ₹50/litre, 280 litres; at ₹60/litre, 350 litres.', answer: 'Construct the supply schedule',
                  options: ['Construct the supply schedule', 'change in supply', 'supply increases when price increases'],
                  hint: 'Revisit c9_eco_ch2_1 (Law of Demand) and c8_eco_ch1_2 (Factors of Production) — focus on how fixed.',
                  misconception: 'Students often believe "supply increases when price increases" means the *supply curve shifts right* when price rises.' }
          ],
            remediations: { 'supply-increases-when-price-increases': { steps: ['Draw a supply schedule table with Price (₹) and Qty Supplied columns.', 'Pick a price (e.g., ₹40), find the corresponding quantity — this is *one point* (quantity supplied).', 'Change *only* the price to ₹50, find the new quantity — this is a *movement along the same schedule*.', 'Now, keep price at ₹40 but imagine a new technology reduces cost — show a *new column* with higher quantities.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_8', difficulty: 'standard',
          question: 'The supply curve is a graphical representation of the Law of Supply, showing.',
          hint: 'If stuck, review the "Law of Supply" (c9_eco_ch2_7) and the "Factors of Production".',
          misconception: 'Students often think the upward slope exists because "sellers want more money" or "higher price causes higher supply".',
          parts: [
                { id: 'a', prompt: 'Why does the supply curve slope upward? Explain using the concept of marginal cost.', answer: 'The supply curve slopes upward',
                  options: ['The supply curve slopes upward', 'because producers are greedy', 'because demand increases', 'sellers want more money'],
                  hint: 'If stuck, review the "Law of Supply" (c9_eco_ch2_7) and the "Factors of Production" (c8_eco_ch1_2).',
                  misconception: 'Students often think the upward slope exists because "sellers want more money" or "higher price causes higher supply" in a causal sense.' },
                { id: 'b', prompt: 'A bicycle factory in Ludhiana supplies 100 bicycles per week at ₹5,000 each. When the price rises to ₹6,000, it supplies 130 bicycles.', answer: 'Step 1: Identify points: (Q=100, P=5000) and (Q=130, P=6000)',
                  options: ['Step 1: Identify points: (Q=100, P=5000) and (Q=130, P=6000)', 'sellers want more money', 'higher price causes higher supply'],
                  hint: 'If stuck, review the "Law of Supply" (c9_eco_ch2_7) and the "Factors of Production" (c8_eco_ch1_2).',
                  misconception: 'Students often think the upward slope exists because "sellers want more money" or "higher price causes higher supply" in a causal sense.' },
                { id: 'c', prompt: 'Compare two scenarios: (A) The price of steel rises, causing a car manufacturer to reduce output at every price.', answer: 'Scenario B is a movement ALONG the supply curve (change in quantity supplied)',
                  options: ['Scenario B is a movement ALONG the supply curve (change in quantity supplied)', 'change in quantity supplied', 'change in supply', 'sellers want more money'],
                  hint: 'If stuck, review the "Law of Supply" (c9_eco_ch2_7) and the "Factors of Production" (c8_eco_ch1_2).',
                  misconception: 'Students often think the upward slope exists because "sellers want more money" or "higher price causes higher supply" in a causal sense.' }
          ],
            remediations: { 'the-upward-slope-exists-because': { steps: ['Revisit the "Factors of Production" node (c8_eco_ch1_2) and "Law of Diminishing Returns" concept (implicit.', 'Draw a marginal cost curve for a specific Indian farmer (e.g., rising cost of irrigation water as deeper tubewells are.', 'Show that the supply curve IS the marginal cost curve above average variable cost.', 'Practice: "If marginal cost of 1st unit is ₹10, 2nd is ₹12, 3rd is ₹15, what is the minimum price to supply 3 units?".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_9', difficulty: 'standard',
          question: 'Determinants of supply are non-price factors that cause the entire supply curve.',
          hint: 'Revisit c9_eco_ch2_7 (Law of Supply) and c9_eco_ch2_8 (Supply Curve) — practice drawing.',
          misconception: 'Students believe "better technology always increases supply" without considering that technology adoption takes time.',
          parts: [
                { id: 'a', prompt: 'Define "determinants of supply" and name the three determinants covered in this topic.', answer: 'Determinants of supply are non-price factors that shift the entire supply curve',
                  options: ['Determinants of supply are non-price factors that shift the entire supply curve', 'price of the good', 'income of buyers', 'better technology always increases supply'],
                  hint: 'Revisit c9_eco_ch2_7 (Law of Supply) and c9_eco_ch2_8 (Supply Curve) — practice drawing shifts.',
                  misconception: 'Students believe "better technology always increases supply" without considering that technology adoption takes time and investment.' },
                { id: 'b', prompt: 'A smartphone manufacturer installs AI-driven robots that reduce assembly time by 40%. Explain why this shifts the supply curve and in which direction.', answer: 'The AI robots lower the marginal cost of producing each smartphone',
                  options: ['The AI robots lower the marginal cost of producing each smartphone', 'supply increases', 'quantity supplied increases', 'better technology always increases supply'],
                  hint: 'Revisit c9_eco_ch2_7 (Law of Supply) and c9_eco_ch2_8 (Supply Curve) — practice drawing shifts.',
                  misconception: 'Students believe "better technology always increases supply" without considering that technology adoption takes time and investment.' }
          ],
            remediations: { 'better-technology-always-increases-supply': { steps: ['Draw a supply curve on paper. Label axes: Price (₹) vertical, Quantity horizontal.', 'Pick a price (e.g., ₹20). Mark quantity supplied Q1.', 'For technology improvement — ask "At this same ₹20, can the firm produce more cheaply?" Yes → mark Q2 > Q1 to the.', 'For expectations of higher future price — ask "At this same ₹20, would the seller hold back stock?" Yes → mark Q3 < Q1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
