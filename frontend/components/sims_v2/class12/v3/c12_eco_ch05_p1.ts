import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch05_p1: SimDef = {
    id: 'v3_c12_eco_ch05_p1',
    title: 'Market Equilibrium · Part 1/2',
    subtitle: '₹40/kg at 9 AM sharp — the price where every tomato finds a buyer',
    classLevel: 12, subject: 'economics', topic: 'Market Equilibrium · Part 1/2',
    chapters: ['c12_eco_ch05'],
    nodeIds: ['c12_eco_cbse_05_001', 'c12_eco_cbse_05_002', 'c12_eco_cbse_05_003', 'c12_eco_cbse_05_004', 'c12_eco_cbse_05_005', 'c12_eco_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Market economist', intro: 'By mid-morning the mandi settles on one price where nothing rots and nobody leaves empty-handed. That price is an equilibrium — here\'s the machinery.', goal: 'Determine equilibrium price and quantity from demand and supply, and explain how surpluses and shortages self-correct.' },
    discovery: {
        question: 'Government sets wheat MSP above the market price \'so farmers sell more and consumers benefit.\' At that price, what actually clears the market?',
        options: ['The shorter side wins — quantity traded falls to demand, a surplus piles up, and consumers buy less at the higher price', 'Everyone trades more — higher price, more supply, more demand', 'Supply exactly meets demand by law', 'Farmers withhold all wheat'],
        answer: 'The shorter side wins — quantity traded falls to demand, a surplus piles up, and consumers buy less at the higher price',
        hook: 'Quantity supplied is not quantity traded — at a fixed price, the smaller of Qd and Qs decides real trade. And surplus doesn\'t mean \'price rises\'; it pushes price down until the curves cross. Confusing willingness with actual trades wrecks most equilibrium answers.',
    },
    teaching: [
        { title: 'Market Equilibrium: Meaning and Determination of Equilibrium Price', text: 'Market equilibrium is a state in a competitive market where the quantity demanded by buyers exactly equals the quantity supplied by sellers at a particular price, known as the equilibrium price.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Find the price that clears a mandi: solve Qd = Qs algebraically, draw the intersection, then trace how a demand surge or supply shock drags the market to a brand-new equilibrium.',
        labels: ['Market Equilibrium: Meaning', 'Effect of Shift', 'Simultaneous Shifts in Demand', 'Impact of Tax', 'Price Ceiling: Meaning, Rationale'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_05_001', title: 'Market Equilibrium: Meaning and Determination of Equilibrium Price',
          scaffold: { problem: 'In a local fish market, the daily market demand for pomfret is given by Qd = 200 - 5P (kg) and the daily market supply is Qs = 50 + 10P.',
            steps: [
            { text: 'Identify the equilibrium condition: Qd = Qs.' },
            { text: 'Substitute the given functions: 200 - 5P = 50 + 10P.' },
            { text: 'Solve for P: 200 - 50 = 10P + 5P → 150 = 15P → P = ₹10/kg.' },
            { text: 'Find equilibrium quantity: Substitute P = 10 into either equation: Qd = 200 - 5(10) = 150 kg.' },
            { text: 'Analyze the situation at P = ₹12: Qd = 200 - 5(12) = 140 kg; Qs = 50 + 10(12) = 170 kg.', faded: true, blankAnswer: 'Equilibrium price = ₹10/kg, equilibrium quantity = 150 kg.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_05_002', title: 'Effect of Shift in Demand on Equilibrium Price and Quantity',
          scaffold: { problem: 'The market for mangoes in Mumbai in April is described by the demand function Qd = 500 – 10P and supply function Qs = 100 + 5P (Q.',
            steps: [
            { text: 'Identify the given functions and the shift. Initial demand: Qd = 500 – 10P. Supply: Qs = 100 + 5P.' },
            { text: 'Calculate initial equilibrium. Set Qd = Qs: 500 – 10P = 100 + 5P → 400 = 15P → P₁ = 400/15 = 80/3 ≈ 26.67 ₹/kg.' },
            { text: 'Calculate new equilibrium after shift. Set Qd\' = Qs: 600 – 10P = 100 + 5P → 500 = 15P → P₂ = 500/15 = 100/3 ≈ 33.33.' },
            { text: 'Compute changes. ΔP = P₂ – P₁ = (100/3 – 80/3) = 20/3 ≈ 6.67 ₹/kg (increase).' },
            { text: 'Describe the adjustment. At the old price ₹26.67, new demand is 600 – 10(26.67) = 333.33 tonnes, but supply is only.', faded: true, blankAnswer: 'Initial equilibrium: P = ₹26.67/kg, Q = 233.33 tonnes. New.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_05_003', title: 'Effect of Shift in Supply on Equilibrium Price and Quantity',
          caseStudy: { intro: 'Imagine you run a small wheat flour (atta) mill in Punjab. Last year, you bought wheat at ₹2,200 per quintal; this year, a bumper harvest pushes the wheat.',
            decisions: [{ prompt: 'Define "increase in supply" and "decrease in supply" using the concept of a shift of the supply curve.', options: [
                { text: '**Correct answer:** An **increase in supply** is a rightward shift of the entire supply', outcome: '**Correct answer:** An **increase in supply** is a rightward shift of the entire supply curve —.' },
                { text: 'increase in supply means quantity supplied goes up when price rises', outcome: 'Not quite — **Misconception:** "When supply increases, price falls, so producers earn less revenue — therefore.', reveals: 'misconception-when-supply-increases' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_05_004', title: 'Simultaneous Shifts in Demand and Supply',
          caseStudy: { intro: 'Imagine you\'re analysing the market for **tomatoes in Azadpur Mandi, Delhi**.',
            decisions: [{ prompt: 'In a simultaneous shift where **both demand and supply increase**, which of the following is TRUE about the new equilibrium?', options: [
                { text: '**Correct: C** — When both demand and supply increase, the demand shift pushes price up', outcome: '**Correct: C** — When both demand and supply increase, the demand shift pushes price up and.' },
                { text: 'demand down, supply up', outcome: 'Not quite — **Students memorise a 2×2 table of outcomes (↑/↓ for P and Q in four cases) without understanding.', reveals: 'students-memorise-a-2-2' },
                { text: 'both shifts push price in the same direction (they don\'t', outcome: 'Not quite — **Students memorise a 2×2 table of outcomes (↑/↓ for P and Q in four cases) without understanding.', reveals: 'students-memorise-a-2-2' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_05_005', title: 'Impact of Tax and Subsidy on Market Equilibrium',
          scaffold: { problem: 'The market for wheat in a mandi has demand Qd = 2000 − 100P and supply Qs = 500 + 50P (P in ₹/kg, Q in quintals).',
            steps: [
            { text: 'Find pre-tax equilibrium by setting Qd = Qs: 2000 − 100P = 500 + 50P → 150P = 1500 → P* = ₹10/kg.' },
            { text: 'Tax on sellers shifts supply up by ₹2: new supply Qs\' = 500 + 50(P − 2) = 50P + 400.' },
            { text: 'New equilibrium: 2000 − 100Pb = 50Pb + 400 → 150Pb = 1600 → Pb = ₹10.67/kg. Ps = Pb − 2 = ₹8.67/kg.' },
            { text: 'New quantity Q\' = 2000 − 100(10.67) = 933.33 quintals.' },
            { text: 'Tax burden on buyers = Pb − P* = 10.67 − 10 = ₹0.67/kg. Burden on sellers = P* − Ps = 10 − 8.67 = ₹1.33/kg.' },
            { text: 'Tax revenue = t × Q\' = 2 × 933.33 = ₹1,866.67. DWL = ½ × t × (Q* − Q\') = 0.5 × 2 × (1000 − 933.33) = ₹66.67.', faded: true, blankAnswer: '(a) P* = ₹10/kg, Q* = 1000 quintals; (b) Pb = ₹10.67/kg,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_05_006', title: 'Price Ceiling: Meaning, Rationale and Effects (Black Market)',
          scaffold: { problem: 'The market for rice in a Tamil Nadu district has demand Qd = 5000 - 200P and supply Qs = 1000 + 150P (Q in tonnes, P in ₹/kg).',
            steps: [
            { text: 'Find free-market equilibrium by setting Qd = Qs → 5000 - 200P = 1000 + 150P → 4000 = 350P → P* = ₹11.43/kg.' },
            { text: 'Compare ceiling Pc = ₹12 with P* = ₹11.43. Since Pc > P*, the ceiling is **non-binding** — the market price is already.' },
            { text: 'At Pc = ₹12, Qd = 5000 - 200(12) = 2600 tonnes, Qs = 1000 + 150(12) = 2800 tonnes.' },
            { text: 'Since there is no shortage (in fact a surplus at Pc), buffer stock release is **not needed**.' },
            { text: 'Policy insight: The ceiling must be set *below* P* to bind. If the intent was ₹10/kg, recalculate: at Pc=10, Qd=3000.', faded: true, blankAnswer: '(a) P* = ₹11.43/kg, Q* = 2714 tonnes; (b) Non-binding (Pc >.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_05_001', title: 'A real-world call',
          caseStudy: { intro: 'A welfare program gives cash directly — dignity and freedom of choice — or gives goods/services — guaranteed nutrition and housing but no autonomy. Cash respects; goods protect.',
            decisions: [{ prompt: 'Is help more respectful when it trusts, or when it guarantees?', options: [
                { text: 'Cash — people know their own needs best', outcome: 'The dignity argument — evidence mostly supports it; the failure cases are the ones that make headlines.' },
                { text: 'Goods — protection beats autonomy when hunger\'s the risk', outcome: 'The safety argument; honest that it treats the recipient as someone who can\'t be trusted with their own welfare.' },
                { text: 'Cash by default, goods where markets fail', outcome: 'The design answer — autonomy where shops exist, goods where they don\'t; the hard part is knowing which is which.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A minister announces an MSP for wheat well above the market-clearing price, telling the press \'farmers will sell more, buyers will still buy — everyone wins\'. Grain starts piling up unsold in godowns.',
            decisions: [{ prompt: 'What does the equilibrium logic predict?', options: [
                { text: 'A surplus — above equilibrium, supply exceeds demand, so the quantity actually traded falls to the demand side and someone must absorb the unsold stock.', outcome: 'A price floor fixes the price, not the quantities: farmers want to sell more at the high price but buyers want less — the shorter side decides.' },
                { text: 'He\'s right — a higher price raises supply and demand together since both sides \'benefit\'.', outcome: 'Higher price moves opposite directions on the two curves: it raises quantity supplied but lowers quantity demanded.', reveals: 'floor-raises-quantity' },
                { text: 'It\'s fine — at the new price everyone who wants wheat still gets it, since equilibrium just means needs are met.', outcome: 'Equilibrium means the market clears, not that all wants are met — and a floor above it isn\'t even an equilibrium.', reveals: 'equilibrium-means-all-satisfied' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now compute the \'going rate\' of any market and narrate the forces that pull stray prices back. Equilibrium is microeconomics\' home base — shifts, taxes and floors all start here.',
            decisions: [{ prompt: 'What comes next? Market Equilibrium · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Market Equilibrium · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_001', difficulty: 'standard',
          question: 'Market equilibrium is a state in a competitive market where the quantity.',
          hint: 'If stuck, revisit Class 9 Economics Chapter 2 (demand, supply, market equilibrium basics).',
          misconception: 'Students often believe that "equilibrium price is the price at which everyone who wants the good can buy it." This.',
          parts: [
                { id: 'a', prompt: 'Given the demand function Qd = 120 – 10P and supply function Qs = 20 + 5P, calculate the equilibrium price and equilibrium quantity. Show all steps.', answer: 'Step 1: Set Qd = Qs → 120 – 10P = 20 + 5P',
                  options: ['Step 1: Set Qd = Qs → 120 – 10P = 20 + 5P', 'equilibrium price is the price at', 'no unmet demand', '"equilibrium price is the price at'],
                  hint: 'If stuck, revisit Class 9 Economics Chapter 2 (demand, supply, market equilibrium basics) and Class.',
                  misconception: 'Students often believe that "equilibrium price is the price at which everyone who wants the good can buy it." This is wrong because.' },
                { id: 'b', prompt: 'Compare the equilibrium outcomes when (a) demand increases (curve shifts right) and (b) supply decreases (curve shifts left).', answer: 'demand increases (curve shifts right) and (',
                  options: ['demand increases (curve shifts right) and (', 'both increase quantity', 'supply decrease lowers price', 'equilibrium price is the price at'],
                  hint: 'If stuck, revisit Class 9 Economics Chapter 2 (demand, supply, market equilibrium basics) and Class.',
                  misconception: 'Students often believe that "equilibrium price is the price at which everyone who wants the good can buy it." This is wrong because.' }
          ],
            remediations: { 'equilibrium-price-is-the-price': { steps: ['If the student holds the above misconception: 1.', 'Draw a standard demand-supply graph with equilibrium at P* = ₹40, Q* = 100 kg.', 'Pick a point on the demand curve at P = ₹30, Qd = 150 kg.', 'Ask: "At the equilibrium price ₹40, does this consumer buy?" (No, they only buy at ₹30).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "equilibrium price is the price at which everyone who wants the good can buy it." This.',
          parts: [
                { id: 'a', prompt: 'A student argues: "If the government sets a minimum support price (MSP) for wheat above the equilibrium price, farmers will sell more wheat and consumers will.', answer: 'The statement is false',
                  options: ['The statement is false', 'quantity supplied', 'quantity traded', 'equilibrium price is the price at'],
                  hint: 'If stuck, revisit Class 9 Economics Chapter 2 (demand, supply, market equilibrium basics) and Class.',
                  misconception: 'Students often believe that "equilibrium price is the price at which everyone who wants the good can buy it." This is wrong because.' }
          ],
            remediations: { 'equilibrium-price-is-the-price': { steps: ['If the student holds the above misconception: 1.', 'Draw a standard demand-supply graph with equilibrium at P* = ₹40, Q* = 100 kg.', 'Pick a point on the demand curve at P = ₹30, Qd = 150 kg.', 'Ask: "At the equilibrium price ₹40, does this consumer buy?" (No, they only buy at ₹30).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_002', difficulty: 'standard',
          question: 'A shift in demand refers to a change in the quantity demanded at every price.',
          hint: 'If stuck, revisit c12_eco_cbse_05_001 for equilibrium mechanics and c9_eco_ch2_4.',
          misconception: 'Students often say: "When demand increases, price goes up, so quantity demanded should go down (law of demand).',
          parts: [
                { id: 'a', prompt: 'State the exact effect on equilibrium price and equilibrium quantity when the demand curve shifts rightward (increase in demand) while the supply curve remains.', answer: 'Correct answer: Equilibrium price rises and equilibrium quantity rises',
                  options: ['Correct answer: Equilibrium price rises and equilibrium quantity rises', 'price rises but quantity falls', 'price unchanged'],
                  hint: 'If stuck, revisit c12_eco_cbse_05_001 for equilibrium mechanics and c9_eco_ch2_4 to c9_eco_ch2_6.',
                  misconception: 'Students often say: "When demand increases, price goes up, so quantity demanded should go down (law of demand), therefore equilibrium.' }
          ],
            remediations: { 'students-often-say-when-demand': { steps: ['If the student holds the above misconception: 1.', 'Revisit **c9_eco_ch2_3: Demand Curve: Downward Sloping and Its Meaning** to reinforce "movement along vs shift".', 'Use a numerical example: Original demand Qd=100–2P, supply Qs=20+2P.', 'Demand shifts to Qd\'=120–2P.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_003', difficulty: 'standard',
          question: 'A shift in supply occurs when a non-price determinant of supply (such as input.',
          hint: 'If stuck, immediately revisit **c12_eco_cbse_05_001** for equilibrium mechanics and.',
          misconception: '**Misconception:** "When supply increases, price falls, so producers earn less revenue — therefore producers would.',
          parts: [
                { id: 'a', prompt: 'Compare the effects of a **rightward shift in supply** versus a **rightward shift in demand** on equilibrium price and equilibrium quantity.', answer: '**Correct answer:** | Shift Type | Equilibrium Price | Equilibrium Quantity |',
                  options: ['**Correct answer:** | Shift Type | Equilibrium Price | Equilibrium Quantity |', 'both shifts raise price', 'both lower quantity', 'quantity change is ambiguous for supply shift'],
                  hint: 'If stuck, immediately revisit **c12_eco_cbse_05_001** for equilibrium mechanics and.',
                  misconception: '**Misconception:** "When supply increases, price falls, so producers earn less revenue — therefore producers would never voluntarily adopt.' }
          ],
            remediations: { 'misconception-when-supply-increases': { steps: ['Revisit **node c12_eco_cbse_05_001** (Market Equilibrium: Meaning and Determination) — practice finding equilibrium.', 'Revisit **node c9_eco_ch2_7** (Supply: Definition and Law of Supply) and **c9_eco_ch2_8** (Supply Curve) — drill the.', 'Do a **re-diagnostic**: Take the onion problem from **DIAGNOSTIC_QUESTION_3** but change the shift to a *leftward*.', 'Solve for new P, Q, ΔP, ΔQ.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_004', difficulty: 'standard',
          question: 'Simultaneous shifts in demand and supply occur when both the demand curve and.',
          hint: 'If stuck, revisit **c12_eco_cbse_05_002** for demand shift mechanics and.',
          misconception: '**Students memorise a 2×2 table of outcomes (↑/↓ for P and Q in four cases) without understanding *why* one variable.',
          parts: [
                { id: 'a', prompt: 'The market for electric two-wheelers in Bengaluru initially has equilibrium price ₹1,00,000 and quantity 50,000 units.', answer: '**No, you cannot conclude the price direction.** Both shifts increase quantity',
                  options: ['**No, you cannot conclude the price direction.** Both shifts increase quantity', 'price must fall because supply increased', 'price must rise because demand increased'],
                  hint: 'If stuck, revisit **c12_eco_cbse_05_002** for demand shift mechanics and **c12_eco_cbse_05_003**.',
                  misconception: '**Students memorise a 2×2 table of outcomes (↑/↓ for P and Q in four cases) without understanding *why* one variable is determinate and the.' }
          ],
            remediations: { 'students-memorise-a-2-2': { steps: ['**Revisit force-analysis:** Draw a large diagram with D₀, S₀, E₀.', 'For each of the four cases, draw *one* shifted curve at a time and ask: "Does *this* shift alone push P up or down?', 'Q up or down?" Write arrows on the diagram.', 'Then draw the second shift and repeat.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_005', difficulty: 'standard',
          question: 'A unit tax imposed on sellers shifts the supply curve vertically upward by the.',
          hint: 'If stuck on tax incidence calculation, revisit c12_eco_cbse_05_003 (supply shift) and.',
          misconception: 'Students believe that "whoever legally pays the tax (sellers) bears the tax burden." In reality, the economic incidence.',
          parts: [
                { id: 'a', prompt: 'What is the vertical distance between the post-tax supply curve and the pre-tax supply curve when a unit tax of t rupees per unit is imposed on sellers?', answer: 'The vertical distance is exactly t rupees at every quantity',
                  options: ['The vertical distance is exactly t rupees at every quantity', 'it depends on elasticity', 'it varies with quantity', 'whoever legally pays the tax (sellers) bears the tax burden'],
                  hint: 'If stuck on tax incidence calculation, revisit c12_eco_cbse_05_003 (supply shift) and c9_eco_ch2_4.',
                  misconception: 'Students believe that "whoever legally pays the tax (sellers) bears the tax burden." In reality, the economic incidence is determined.' },
                { id: 'b', prompt: 'If the demand curve is perfectly inelastic (vertical) and a unit tax is imposed on sellers, who bears the entire tax burden and why?', answer: 'Buyers bear the entire tax burden',
                  options: ['Buyers bear the entire tax burden', 'sellers bear it because they legally pay the tax', 'whoever legally pays the tax (sellers) bears the tax burden', 'sellers bear the tax'],
                  hint: 'If stuck on tax incidence calculation, revisit c12_eco_cbse_05_003 (supply shift) and c9_eco_ch2_4.',
                  misconception: 'Students believe that "whoever legally pays the tax (sellers) bears the tax burden." In reality, the economic incidence is determined.' },
                { id: 'c', prompt: 'Given linear demand Qd = 100 − 2P and supply Qs = 20 + 3P, a unit tax of ₹10 per unit is imposed on sellers.', answer: 'Step 1: Pre-tax equilibrium: 100 − 2P = 20 + 3P → 5P = 80 → P* = ₹16, Q* = 68',
                  options: ['Step 1: Pre-tax equilibrium: 100 − 2P = 20 + 3P → 5P = 80 → P* = ₹16, Q* = 68', 'whoever legally pays the tax (sellers) bears the tax burden', 'sellers bear the tax', '"whoever legally pays the tax (sellers) bears the tax burden'],
                  hint: 'If stuck on tax incidence calculation, revisit c12_eco_cbse_05_003 (supply shift) and c9_eco_ch2_4.',
                  misconception: 'Students believe that "whoever legally pays the tax (sellers) bears the tax burden." In reality, the economic incidence is determined.' },
                { id: 'd', prompt: 'Compare the deadweight loss from a ₹10 unit tax when (a) demand is elastic (Ed = −2) and supply is inelastic (Es = 0.5) versus (b) demand is inelastic (Ed.', answer: 'Case (a) generates larger DWL',
                  options: ['Case (a) generates larger DWL', 'whoever legally pays the tax (sellers) bears the tax burden', 'sellers bear the tax', '"whoever legally pays the tax (sellers) bears the tax burden'],
                  hint: 'If stuck on tax incidence calculation, revisit c12_eco_cbse_05_003 (supply shift) and c9_eco_ch2_4.',
                  misconception: 'Students believe that "whoever legally pays the tax (sellers) bears the tax burden." In reality, the economic incidence is determined.' }
          ],
            remediations: { 'whoever-legally-pays-the-tax': { steps: ['Revisit c12_eco_cbse_05_003 (Effect of Shift in Supply) and practice drawing a supply shift of exactly ₹t upward.', 'Revisit c9_eco_ch2_4 (Determinants of Demand: Price of Related Goods) and c9_eco_ch2_9 (Determinants of Supply).', 'Impose the same ₹10 tax on sellers in both.', 'Measure ΔPb and ΔPs in each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_006', difficulty: 'standard',
          question: 'A price ceiling is a government-imposed maximum legal price that sellers can.',
          hint: 'If stuck, revisit c12_eco_cbse_05_001 for equilibrium calculation and surplus.',
          misconception: '**Misconception:** "A price ceiling always benefits consumers because they pay a lower price." **Reality:** Only.',
          parts: [
                { id: 'a', prompt: 'Explain why a price ceiling on essential medicines, while intended to help poor patients, often leads to the very patients being unable to buy the medicine.', answer: 'At the ceiling price Pc, quantity supplied (Qs) falls',
                  options: ['At the ceiling price Pc, quantity supplied (Qs) falls', 'producers stop producing'],
                  hint: 'If stuck, revisit c12_eco_cbse_05_001 for equilibrium calculation and surplus identification, then.',
                  misconception: '**Misconception:** "A price ceiling always benefits consumers because they pay a lower price." **Reality:** Only consumers who *actually.' },
                { id: 'b', prompt: 'Compare the welfare effects of a binding price ceiling on consumers who successfully purchase the good versus consumers who are unable to purchase it.', answer: 'Consumers who buy at Pc gain: they pay less than P* for Qs units',
                  options: ['Consumers who buy at Pc gain: they pay less than P* for Qs units', 'consumers always gain'],
                  hint: 'If stuck, revisit c12_eco_cbse_05_001 for equilibrium calculation and surplus identification, then.',
                  misconception: '**Misconception:** "A price ceiling always benefits consumers because they pay a lower price." **Reality:** Only consumers who *actually.' }
          ],
            remediations: { 'misconception-a-price-ceiling-always': { steps: ['If the student holds this misconception: 1.', '**Revisit node c12_eco_cbse_05_001 (Market Equilibrium)** — confirm understanding that at P*, Qd = Qs and all willing.', '**Draw the graph:** Mark P*, Q*.', 'Draw horizontal line at Pc < P*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
