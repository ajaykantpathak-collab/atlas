import type { SimDef } from '../../engine/types';

/** v3 generated — c9_eco_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_eco_ch02_p1: SimDef = {
    id: 'v3_c9_eco_ch02_p1',
    title: 'The Price Puzzle: What Drives the Market · Part 1/2',
    subtitle: 'Why buyers flee when prices climb — usually',
    classLevel: 9, subject: 'economics', topic: 'The Price Puzzle: What Drives the Market · Part 1/2',
    chapters: ['c9_eco_ch02'],
    nodeIds: ['c9_eco_ch2_1', 'c9_eco_ch2_10', 'c9_eco_ch2_11', 'c9_eco_ch2_12', 'c9_eco_ch2_2', 'c9_eco_ch2_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a market-price detective', intro: 'Watch a shopper change her mango order as prices swing week to week, and you\'ll see the Law of Demand in the wild — plus the sneaky exceptions that look like violations but aren\'t.', goal: 'Understand demand as willingness + ability to pay, the Law of Demand\'s inverse price–quantity relationship under ceteris paribus, and the movement-vs-shift distinction.' },
    discovery: {
        question: 'During Diwali, sweet prices RISE and people buy MORE. Did the Law of Demand just break?',
        options: ['No — the law only applies when nothing else changes; festival tastes shifted the whole demand curve rightward', 'Yes — the law is fake', 'Yes — sweets are exempt from economics', 'No — people forgot the prices'],
        answer: 'No — the law only applies when nothing else changes; festival tastes shifted the whole demand curve rightward',
        hook: 'Wanting a ₹50,000 phone isn\'t demand — demand needs a wallet behind the wish. And a price change moves you ALONG the curve; only a change in income, taste or other goods shifts the curve itself.',
    },
    teaching: [
        { title: 'Demand: Definition and Law of Demand', text: 'Demand is the quantity of a good or service that consumers are willing and able to purchase at various prices during a given period, holding all other factors constant.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_eco_ch2_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Build a demand schedule from mango-season prices, plot the downward-sloping curve, then referee the classic mix-up: when petrol prices rise and Arjun buys less, did his \'demand\' fall or just his \'quantity demanded\'?',
        labels: ['Demand: Definition and Law', 'Market Equilibrium: Interaction', 'Government Intervention: Price Ceiling', 'Monopoly and Market Regulation', 'Individual Demand vs Market', 'Demand Curve: Downward Sloping'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_eco_ch2_1', title: 'Demand: Definition and Law of Demand',
          caseStudy: { intro: 'Imagine you visit a fruit market in Delhi during mango season. You see Alphonso mangoes priced at ₹200 per kg and decide to buy 2 kg.',
            decisions: [{ prompt: 'Define "demand" in economics. How is it different from "desire" or "want"?', options: [
                { text: 'Demand is the quantity of a good a consumer is willing **and able** to buy at a given', outcome: 'Demand is the quantity of a good a consumer is willing **and able** to buy at a given price in.' },
                { text: 'ability to pay', outcome: 'Not quite — Students often think the Law of Demand means "when price falls, demand increases" — using "demand".', reveals: 'the-law-of-demand-means' },
                { text: 'when price falls, demand increases', outcome: 'Not quite — Students often think the Law of Demand means "when price falls, demand increases" — using "demand".', reveals: 'the-law-of-demand-means' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch2_10', title: 'Market Equilibrium: Interaction of Demand and Supply',
          scaffold: { problem: 'The monthly demand and supply for potatoes in a Kolkata wholesale market are given by: Qd = 5000 - 50P and Qs = 1000 + 30P, where P.',
            steps: [
            { text: 'Identify the equilibrium condition: Qd = Qs. Set 5000 - 50P = 1000 + 30P.' },
            { text: 'Solve for P: 5000 - 1000 = 30P + 50P → 4000 = 80P → P* = ₹50/kg.' },
            { text: 'Find Q* by substituting P* into either equation: Q* = 5000 - 50(50) = 5000 - 2500 = 2500 kg.' },
            { text: 'At price ceiling Pc = ₹30/kg, calculate Qd = 5000 - 50(30) = 3500 kg and Qs = 1000 + 30(30) = 1900 kg.' },
            { text: 'Shortage = Qd - Qs = 3500 - 1900 = 1600 kg. Interpret: at ₹30/kg, buyers want 3500 kg but only 1900 kg supplied.', faded: true, blankAnswer: 'Equilibrium price = ₹50/kg, Equilibrium quantity = 2500 kg.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch2_11', title: 'Government Intervention: Price Ceiling and Price Floor',
          scaffold: { problem: 'The market for rice in a district has demand Qd = 1000 - 10P and supply Qs = 20P - 200, where P is price in ₹/kg and Q is in quintals/day.',
            steps: [
            { text: 'Find equilibrium by setting Qd = Qs: 1000 - 10P = 20P - 200 → 30P = 1200 → P* = ₹40/kg.' },
            { text: 'Find equilibrium quantity: Q* = 1000 - 10(40) = 600 quintals/day (or Qs = 20(40)-200 = 600).' },
            { text: 'At ceiling price Pc = ₹30, calculate Qd = 1000 - 10(30) = 700 quintals/day.' },
            { text: 'At Pc = ₹30, calculate Qs = 20(30) - 200 = 400 quintals/day.' },
            { text: 'Shortage = Qd - Qs = 700 - 400 = 300 quintals/day. Quantity actually traded = Qs = 400 quintals/day (the lower of the.', faded: true, blankAnswer: 'Equilibrium: ₹40/kg, 600 quintals/day. At ceiling ₹30/kg.' }
            ] } },
        { type: 'case', nodeId: 'c9_eco_ch2_12', title: 'Monopoly and Market Regulation by Government',
          caseStudy: { intro: 'Imagine you live in a town where only one company supplies electricity — the State Electricity Board.',
            decisions: [{ prompt: 'Define monopoly and state one key feature that distinguishes it from perfect competition.', options: [
                { text: 'Monopoly is a market structure with a single seller of a unique product having no close', outcome: 'Monopoly is a market structure with a single seller of a unique product having no close.' },
                { text: 'monopoly has many sellers', outcome: 'Not quite — Students often think a monopolist can charge any price it wants and earn unlimited profit.', reveals: 'a-monopolist-can-charge-any' },
                { text: 'a monopolist can charge any price it wants and earn unlimited profit', outcome: 'Not quite — Students often think a monopolist can charge any price it wants and earn unlimited profit.', reveals: 'a-monopolist-can-charge-any' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch2_2', title: 'Individual Demand vs Market Demand',
          scaffold: { problem: 'In a small town, three families — Sharma, Verma, and Khan — buy milk daily.',
            steps: [
            { text: 'Identify the concept: market demand is horizontal summation of individual demands at each price.' },
            { text: 'List the given data in a table with price as rows and each family\'s quantity as columns.' },
            { text: 'At ₹40/liter, read Sharma=3, Verma=1.5, Khan=4. Add horizontally: 3 + 1.5 + 4 = 8.5 liters.' },
            { text: 'Repeat for all prices: ₹50→3.5, ₹45→6, ₹40→8.5, ₹35→11, ₹30→13.5 liters.' },
            { text: 'Interpret: Market demand at ₹40 is 8.5 liters/day. The market schedule shows total town demand at each price.', faded: true, blankAnswer: 'Market demand at ₹40/liter = 8.5 liters/day. Full schedule.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch2_3', title: 'Demand Curve: Downward Sloping and Its Meaning',
          scaffold: { problem: 'Riya buys notebooks for school. The table shows her demand schedule:',
            steps: [
            { text: 'Identify the economic concept — this is an individual demand schedule obeying the law of demand; plot price (Y-axis).' },
            { text: 'Plot the five points: (2,60), (3,50), (5,40), (8,30), (12,20).' },
            { text: 'Locate the price change: at ₹50, quantity is 3 (point A); at ₹30, quantity is 8 (point B).' },
            { text: 'Name the change correctly: "change in quantity demanded" (movement along the curve), NOT "change in demand" (shift.' },
            { text: 'Explain the increase: Income effect — at ₹30, Riya\'s pocket money buys more notebooks (real income rises).', faded: true, blankAnswer: '(a) Downward-sloping curve through the five plotted points.' }
            ] } },
        { type: 'case', nodeId: 'c9_eco_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A Class 9 student \'demands\' a ₹50,000 phone, telling his father \'demand means desire.\' Weeks later, when the milk price rises from ₹60 to ₹70, the family buys less — and the student reports their \'demand for milk has fallen.\'',
            decisions: [{ prompt: 'How should both statements be corrected?', options: [
                { text: 'Demand needs willingness AND ability to pay — a phone you cannot afford is a desire, not demand. And the milk case is a fall in quantity demanded (moving along the curve as price rose), not a fall in demand — the curve itself shifts only when a non-price factor like income or taste changes.', outcome: 'This applies both board-level distinctions — want versus demand, and movement along versus shift of the curve.' },
                { text: 'Both statements were correct — demand is whatever you want, and buying less means demand fell.', outcome: 'Wanting without the power to pay is not demand, and a price change alone moves along the existing curve rather than shifting it.', reveals: 'demand-is-desire' },
                { text: 'Only the milk point is wrong — the phone claim holds because strong desire creates demand in a market.', outcome: 'Markets respond to effective demand — desire backed by money; without ability to pay, want registers nothing to a seller.', reveals: 'desire-is-demand' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch2_3', title: 'The bigger picture',
          caseStudy: { intro: 'Price up, quantity down — but only ceteris paribus. The demand curve is a snapshot of one price-relationship; let Diwali tastes or a pay rise walk in, and the whole curve packs up and moves.',
            decisions: [{ prompt: 'What comes next? The Price Puzzle: What Drives the Market · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Price Puzzle: What Drives the Market · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_eco_ch2_1', difficulty: 'standard',
          question: 'Demand is the quantity of a good or service that consumers are willing and able.',
          hint: 'If stuck, revisit c6_economics_ch12_001 "What is a Market?" and c6_economics_ch12_003.',
          misconception: 'Students often think the Law of Demand means "when price falls, demand increases" — using "demand" to mean "quantity.',
          parts: [
                { id: 'a', prompt: 'The price of petrol in Mumbai rises from ₹100 to ₹110 per litre. Arjun reduces his petrol consumption from 40 litres to 35 litres per month.', answer: 'The friend is incorrect',
                  options: ['The friend is incorrect', 'yes, demand decreased', 'when price falls, demand increases', 'demand'],
                  hint: 'If stuck, revisit c6_economics_ch12_001 "What is a Market?" and c6_economics_ch12_003 "How Prices.',
                  misconception: 'Students often think the Law of Demand means "when price falls, demand increases" — using "demand" to mean "quantity demanded." They also.' }
          ],
            remediations: { 'the-law-of-demand-means': { steps: ['Revisit the ceteris paribus assumption — list five non-price factors (income, tastes, price of substitutes/complements.', 'Draw a demand curve on graph paper. Mark point A (₹40, 5 kg) and point B (₹80, 2 kg).', 'Now imagine income falls. Draw a new curve left of the original.', 'Practice 5 board-style MCQs distinguishing "change in quantity demanded" vs "change in demand" until 100% accuracy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Law of Demand means "when price falls, demand increases" — using "demand" to mean "quantity.',
          parts: [
                { id: 'a', prompt: '"During Diwali, the price of sweets increases, and people buy more sweets. This violates the Law of Demand." Evaluate this statement.', answer: 'The statement is false',
                  options: ['The statement is false', 'yes, it violates', 'when price falls, demand increases', 'demand'],
                  hint: 'If stuck, revisit c6_economics_ch12_001 "What is a Market?" and c6_economics_ch12_003 "How Prices.',
                  misconception: 'Students often think the Law of Demand means "when price falls, demand increases" — using "demand" to mean "quantity demanded." They also.' },
                { id: 'b', prompt: 'Create a real-life example (Indian context) of a good that follows the Law of Demand.', answer: 'Example: Monthly mobile data packs',
                  options: ['Example: Monthly mobile data packs', 'when price falls, demand increases', 'demand', 'quantity demanded'],
                  hint: 'If stuck, revisit c6_economics_ch12_001 "What is a Market?" and c6_economics_ch12_003 "How Prices.',
                  misconception: 'Students often think the Law of Demand means "when price falls, demand increases" — using "demand" to mean "quantity demanded." They also.' }
          ],
            remediations: { 'the-law-of-demand-means': { steps: ['Revisit the ceteris paribus assumption — list five non-price factors (income, tastes, price of substitutes/complements.', 'Draw a demand curve on graph paper. Mark point A (₹40, 5 kg) and point B (₹80, 2 kg).', 'Now imagine income falls. Draw a new curve left of the original.', 'Practice 5 board-style MCQs distinguishing "change in quantity demanded" vs "change in demand" until 100% accuracy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_10', difficulty: 'standard',
          question: 'Market equilibrium is the price-quantity combination where the quantity.',
          hint: 'If stuck, revisit c9_eco_ch2_3 (demand curve meaning) and c9_eco_ch2_8 (supply curve.',
          misconception: 'Students think "equilibrium price is the price where everyone is happy" or "equilibrium means no one wants to buy.',
          parts: [
                { id: 'a', prompt: 'Define market equilibrium price and equilibrium quantity in your own words.', answer: 'Equilibrium price is the price at',
                  options: ['Equilibrium price is the price at', 'equilibrium is where demand curve meets supply curve', 'equilibrium price is the price where everyone is happy', 'equilibrium means no one wants to buy or sell more'],
                  hint: 'If stuck, revisit c9_eco_ch2_3 (demand curve meaning) and c9_eco_ch2_8 (supply curve meaning).',
                  misconception: 'Students think "equilibrium price is the price where everyone is happy" or "equilibrium means no one wants to buy or sell more.".' },
                { id: 'b', prompt: 'In a market for mangoes, at ₹80/kg there is a surplus of 200 kg. Explain step-by-step why this surplus forces the price down toward equilibrium.', answer: 'At ₹80/kg, Qs > Qd by 200 kg',
                  options: ['At ₹80/kg, Qs > Qd by 200 kg', 'price falls because demand increases', 'equilibrium price is the price where everyone is happy', 'equilibrium means no one wants to buy or sell more'],
                  hint: 'If stuck, revisit c9_eco_ch2_3 (demand curve meaning) and c9_eco_ch2_8 (supply curve meaning).',
                  misconception: 'Students think "equilibrium price is the price where everyone is happy" or "equilibrium means no one wants to buy or sell more.".' },
                { id: 'c', prompt: 'Given demand schedule: P=100, Qd=50; P=80, Qd=70; P=60, Qd=90; P=40, Qd=110; P=20, Qd=130.', answer: 'Step 1: List Qd and Qs at each price',
                  options: ['Step 1: List Qd and Qs at each price', 'closest', 'equilibrium price is the price where everyone is happy', 'equilibrium means no one wants to buy or sell more'],
                  hint: 'If stuck, revisit c9_eco_ch2_3 (demand curve meaning) and c9_eco_ch2_8 (supply curve meaning).',
                  misconception: 'Students think "equilibrium price is the price where everyone is happy" or "equilibrium means no one wants to buy or sell more.".' },
                { id: 'd', prompt: 'The equilibrium price of onions is ₹40/kg. Due to a poor harvest, supply decreases at every price.', answer: 'At original P*=₹40, new Qs < old Qs = Qd, so shortage emerges',
                  options: ['At original P*=₹40, new Qs < old Qs = Qd, so shortage emerges', 'surplus because supply decreased', 'equilibrium price is the price where everyone is happy', 'equilibrium means no one wants to buy or sell more'],
                  hint: 'If stuck, revisit c9_eco_ch2_3 (demand curve meaning) and c9_eco_ch2_8 (supply curve meaning).',
                  misconception: 'Students think "equilibrium price is the price where everyone is happy" or "equilibrium means no one wants to buy or sell more.".' }
          ],
            remediations: { 'equilibrium-price-is-the-price': { steps: ['Revisit c9_eco_ch2_3 (demand curve meaning) and c9_eco_ch2_8 (supply curve meaning) — ensure student understands each.', 'Use a concrete schedule: at P=80, Qd=70, Qs=90. Ask: "At this price, do buyers *actually* buy 70?', 'Contrast with equilibrium: at P=60, Qd=90, Qs=70. Only 70 transacts.', 'Practice with c9_eco_ch2_10 worked examples until student can articulate "plans vs. outcomes" distinction.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_11', difficulty: 'standard',
          question: 'A price ceiling is a government-imposed maximum price set below the market.',
          hint: 'Revisit c9_eco_ch2_10 (Market Equilibrium) and c9_eco_ch2_3 & c9_eco_ch2_8 (Demand/Supply.',
          misconception: 'Students often believe that a price ceiling *lowers the price for everyone* and a price floor *raises the price for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A price ceiling is a government-imposed maximum price set below the market equilibrium',
                  options: ['A price ceiling is a government-imposed maximum price set below the market equilibrium', 'Demand is the quantity of a good or service that consumers are willing and able to', 'Market equilibrium is the price-quantity combination where the quantity demanded by', 'A monopoly is a market structure where a single seller dominates the entire market for a'],
                  hint: 'Revisit c9_eco_ch2_10 (Market Equilibrium) and c9_eco_ch2_3 & c9_eco_ch2_8 (Demand/Supply curve.',
                  misconception: 'Students often believe that a price ceiling *lowers the price for everyone* and a price floor *raises the price for everyone*, ignoring.' }
          ],
            remediations: { 'a-price-ceiling-lowers-the': { steps: ['Draw the demand-supply diagram with equilibrium (P*, Q*).', 'Draw a horizontal line at ceiling price Pc < P*.', 'Read Qd at Pc (on demand curve) and Qs at Pc (on supply curve).', 'Shade the horizontal gap between Qd and Qs — this is the shortage.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_12', difficulty: 'standard',
          question: 'A monopoly is a market structure where a single seller dominates the entire.',
          hint: 'If stuck, revisit c9_eco_ch2_10 (market equilibrium) and c9_eco_ch2_11 (price.',
          misconception: 'Students often think a monopolist can charge any price it wants and earn unlimited profit.',
          parts: [
                { id: 'a', prompt: 'The State Electricity Board (a monopoly) faces demand: P = 100 - 0.5Q (price in ₹/kWh, Q in million kWh). Its marginal cost is constant at ₹20/kWh.', answer: 'Step 1: Set MR = MC → 100 - Q = 20 → Q = 80 million kWh',
                  options: ['Step 1: Set MR = MC → 100 - Q = 20 → Q = 80 million kWh', 'a monopolist can charge any price it wants and earn unlimited profit'],
                  hint: 'If stuck, revisit c9_eco_ch2_10 (market equilibrium) and c9_eco_ch2_11 (price ceiling/floor).',
                  misconception: 'Students often think a monopolist can charge any price it wants and earn unlimited profit.' },
                { id: 'b', prompt: 'Compare the consumer surplus under monopoly (from Question 3) with the consumer surplus if the market were perfectly competitive (P=MC).', answer: 'Competitive equilibrium: P=MC=20 → Q=160',
                  options: ['Competitive equilibrium: P=MC=20 → Q=160', 'monopoly CS is larger', 'a monopolist can charge any price it wants and earn unlimited profit'],
                  hint: 'If stuck, revisit c9_eco_ch2_10 (market equilibrium) and c9_eco_ch2_11 (price ceiling/floor).',
                  misconception: 'Students often think a monopolist can charge any price it wants and earn unlimited profit.' }
          ],
            remediations: { 'a-monopolist-can-charge-any': { steps: ['If a student holds this misconception, walk through a numerical demand schedule: Price ₹10 → Q=100, TR=1000; Price ₹20.', 'Show that higher price reduced total revenue.', 'Then plot demand and MR curves, highlighting that MR becomes negative when demand is inelastic.', 'Emphasize that the monopolist chooses the profit-maximizing price, not the highest price.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_2', difficulty: 'standard',
          question: 'Individual demand is the quantity of a good a single consumer is willing and.',
          hint: 'Revisit c9_eco_ch2_1: practice drawing individual demand curves from schedules until.',
          misconception: 'Students believe market demand is found by vertically adding individual demand curves (adding prices at each quantity).',
          parts: [
                { id: 'a', prompt: 'Three consumers — A, B, and C — have individual demand schedules for mangoes (kg) at prices ₹50, ₹40, ₹30, ₹20, ₹10 per kg: A: 2, 4, 6, 8, 10 B: 1, 2, 3, 4, 5.', answer: 'Step 1: Align prices and quantities',
                  options: ['Step 1: Align prices and quantities', 'adding demand', 'adding supply'],
                  hint: 'Revisit c9_eco_ch2_1: practice drawing individual demand curves from schedules until comfortable.',
                  misconception: 'Students believe market demand is found by vertically adding individual demand curves (adding prices at each quantity) because they confuse.' },
                { id: 'b', prompt: 'In a village market, 50 households each have identical demand for wheat: Qd = 10 - 0.5P.', answer: 'Original market demand: Qd_market = 50*(10 - 0.5P) = 500 - 25P',
                  options: ['Original market demand: Qd_market = 50*(10 - 0.5P) = 500 - 25P', 'curve shifts right', 'becomes flatter', 'adding demand'],
                  hint: 'Revisit c9_eco_ch2_1: practice drawing individual demand curves from schedules until comfortable.',
                  misconception: 'Students believe market demand is found by vertically adding individual demand curves (adding prices at each quantity) because they confuse.' }
          ],
            remediations: { 'market-demand-is-found-by': { steps: ['Draw two individual demand curves on the same axes (price vertical, quantity horizontal).', 'Pick a price, say ₹20, read off quantity for each consumer (e.g., 5 and 3 units).', 'Plot total quantity 8 at ₹20 on a new graph.', 'Repeat for 3-4 prices.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch2_3', difficulty: 'standard',
          question: 'The demand curve is a graphical representation of the law of demand, showing.',
          hint: 'Revisit the law of demand (c9_eco_ch2_1) and the individual vs market demand distinction.',
          misconception: 'Students routinely use "demand" and "quantity demanded" as synonyms, saying "demand increases when price falls." This.',
          parts: [
                { id: 'a', prompt: 'Explain why the demand curve slopes downward. Use the concepts of income effect and substitution effect in your answer, and give a concrete example using.', answer: 'The downward slope occurs',
                  options: ['The downward slope occurs', 'people buy more when price is low', 'substitution effect is about income'],
                  hint: 'Revisit the law of demand (c9_eco_ch2_1) and the individual vs market demand distinction.',
                  misconception: 'Students routinely use "demand" and "quantity demanded" as synonyms, saying "demand increases when price falls." This is the single most.' },
                { id: 'b', prompt: 'The table below shows the demand schedule for wheat flour (atta) in a Kolkata household: | Price (₹/kg) | Quantity Demanded (kg/month) |.', answer: 'Plot the demand curve on graph paper',
                  options: ['Plot the demand curve on graph paper', 'shift of the demand curve'],
                  hint: 'Revisit the law of demand (c9_eco_ch2_1) and the individual vs market demand distinction.',
                  misconception: 'Students routinely use "demand" and "quantity demanded" as synonyms, saying "demand increases when price falls." This is the single most.' },
                { id: 'c', prompt: 'Consider two scenarios for the same household\'s demand for wheat flour: Scenario A: Price of rice (a substitute) falls from ₹50/kg to ₹40/kg.', answer: 'Scenario A (rice price falls): Wheat flour becomes relatively more expensive',
                  options: ['Scenario A (rice price falls): Wheat flour becomes relatively more expensive', 'draws both as movements along the curve, or both as shifts'],
                  hint: 'Revisit the law of demand (c9_eco_ch2_1) and the individual vs market demand distinction.',
                  misconception: 'Students routinely use "demand" and "quantity demanded" as synonyms, saying "demand increases when price falls." This is the single most.' }
          ],
            remediations: { 'students-routinely-use-demand-and': { steps: ['Draw a demand curve on the board. Label it D₁. Pick a point A (P=₹50, Q=10).', 'Show a price drop to ₹40 — move along D₁ to point B (Q=14). Say: "Only price changed. Curve D₁ stays put.', 'Now announce "Consumer income rises." Draw a new curve D₂ to the right of D₁.', 'Give three rapid-fire scenarios (price of substitute falls, own price rises, population grows) — student must say.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
