import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch05_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch05_p2: SimDef = {
    id: 'v3_c12_eco_ch05_p2',
    title: 'Market Equilibrium · Part 2/2',
    subtitle: '₹40/kg at 9 AM sharp — the price where every tomato finds a buyer',
    classLevel: 12, subject: 'economics', topic: 'Market Equilibrium · Part 2/2',
    chapters: ['c12_eco_ch05'],
    nodeIds: ['c12_eco_cbse_05_007', 'c12_eco_cbse_05_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Market economist', intro: 'By mid-morning the mandi settles on one price where nothing rots and nobody leaves empty-handed. That price is an equilibrium — here\'s the machinery.', goal: 'Determine equilibrium price and quantity from demand and supply, and explain how surpluses and shortages self-correct.' },
    discovery: {
        question: 'Government sets wheat MSP above the market price \'so farmers sell more and consumers benefit.\' At that price, what actually clears the market?',
        options: ['The shorter side wins — quantity traded falls to demand, a surplus piles up, and consumers buy less at the higher price', 'Everyone trades more — higher price, more supply, more demand', 'Supply exactly meets demand by law', 'Farmers withhold all wheat'],
        answer: 'The shorter side wins — quantity traded falls to demand, a surplus piles up, and consumers buy less at the higher price',
        hook: 'Quantity supplied is not quantity traded — at a fixed price, the smaller of Qd and Qs decides real trade. And surplus doesn\'t mean \'price rises\'; it pushes price down until the curves cross. Confusing willingness with actual trades wrecks most equilibrium answers.',
    },
    teaching: [
        { title: 'Price Floor: Meaning, Rationale and Effects (Minimum Support Price)', text: 'A price floor is a government-mandated minimum price set **above the market equilibrium price** to protect producers from prices deemed too low.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Find the price that clears a mandi: solve Qd = Qs algebraically, draw the intersection, then trace how a demand surge or supply shock drags the market to a brand-new equilibrium.',
        labels: ['Price Floor: Meaning, Rationale', 'Application of Market Equilibrium'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_05_007', title: 'Price Floor: Meaning, Rationale and Effects (Minimum Support Price)',
          scaffold: { problem: 'The demand for rice in a state is Qd = 500 - 20P (lakh tonnes, P in ₹/kg). Supply is Qs = 10P - 50. The government sets MSP = ₹25/kg.',
            steps: [
            { text: 'Set Qd = Qs for equilibrium: 500 - 20P = 10P - 50 → 30P = 550 → P* = ₹18.33/kg.' },
            { text: 'At MSP = ₹25: Qd = 500 - 20(25) = 0 lakh tonnes (negative → 0). Qs = 10(25) - 50 = 200 lakh tonnes.' },
            { text: 'Find price on demand curve at Qs = 200: 200 = 500 - 20P → 20P = 300 → P = ₹15/kg.' },
            { text: 'Deadweight loss triangle: base = Q* - Qd = 133.4 - 0 = 133.4 lakh tonnes; height = P_floor - P_demand_at_Qs = 25 - 15.' },
            { text: 'Interpret: Government must procure 200 lakh tonnes at ₹25/kg (cost ₹5,000 crore) to maintain MSP, but society loses.', faded: true, blankAnswer: '(a) P* = ₹18.33/kg, Q* = 133.4 lakh tonnes; (b) Qd = 0,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_05_008', title: 'Application of Market Equilibrium: Government Intervention in Prices',
          scaffold: { problem: 'The market for onions in a mandi has demand Qd = 2000 - 50P and supply Qs = 50P - 500 (Q in quintals, P in ₹/kg).',
            steps: [
            { text: 'Find free-market equilibrium by setting Qd = Qs: 2000 - 50P = 50P - 500 → 100P = 2500 → P* = ₹25, Q* = 750 quintals.' },
            { text: 'At P = ₹20: Qd = 2000 - 1000 = 1000 quintals; Qs = 1000 - 500 = 500 quintals.' },
            { text: 'Shortage = Qd - Qs = 1000 - 500 = 500 quintals.' },
            { text: 'DWL = area of triangle between demand and supply from Qs=500 to Q*=750. Height = Pd(500) - Ps(500).' },
            { text: 'Consumer surplus change: Original CS = ½ × (40-25) × 750 = 5625 (in ₹-quintals).', faded: true, blankAnswer: '(a) P* = ₹25/kg, Q* = 750 quintals; (b) Qd = 1000 quintals.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_05_007', title: 'A real-world call',
          caseStudy: { intro: 'A welfare program gives cash directly — dignity and freedom of choice — or gives goods/services — guaranteed nutrition and housing but no autonomy. Cash respects; goods protect.',
            decisions: [{ prompt: 'Is help more respectful when it trusts, or when it guarantees?', options: [
                { text: 'Cash — people know their own needs best', outcome: 'The dignity argument — evidence mostly supports it; the failure cases are the ones that make headlines.' },
                { text: 'Goods — protection beats autonomy when hunger\'s the risk', outcome: 'The safety argument; honest that it treats the recipient as someone who can\'t be trusted with their own welfare.' },
                { text: 'Cash by default, goods where markets fail', outcome: 'The design answer — autonomy where shops exist, goods where they don\'t; the hard part is knowing which is which.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A minister announces an MSP for wheat well above the market-clearing price, telling the press \'farmers will sell more, buyers will still buy — everyone wins\'. Grain starts piling up unsold in godowns.',
            decisions: [{ prompt: 'What does the equilibrium logic predict?', options: [
                { text: 'A surplus — above equilibrium, supply exceeds demand, so the quantity actually traded falls to the demand side and someone must absorb the unsold stock.', outcome: 'A price floor fixes the price, not the quantities: farmers want to sell more at the high price but buyers want less — the shorter side decides.' },
                { text: 'He\'s right — a higher price raises supply and demand together since both sides \'benefit\'.', outcome: 'Higher price moves opposite directions on the two curves: it raises quantity supplied but lowers quantity demanded.', reveals: 'floor-raises-quantity' },
                { text: 'It\'s fine — at the new price everyone who wants wheat still gets it, since equilibrium just means needs are met.', outcome: 'Equilibrium means the market clears, not that all wants are met — and a floor above it isn\'t even an equilibrium.', reveals: 'equilibrium-means-all-satisfied' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_05_008', title: 'You made it',
          caseStudy: { intro: 'You can now compute the \'going rate\' of any market and narrate the forces that pull stray prices back. Equilibrium is microeconomics\' home base — shifts, taxes and floors all start here.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_007', difficulty: 'standard',
          question: 'A price floor is a government-mandated minimum price set **above the market.',
          hint: 'If stuck on surplus calculation, revisit **c6_math_ch05_057 (Solving Linear Equations)**.',
          misconception: '**Misconception:** "MSP is the price at which the government buys *all* the farmer\'s produce, so every farmer benefits.',
          parts: [
                { id: 'a', prompt: 'Define \'price floor\' and state the necessary condition for it to be \'binding\' in a competitive market.', answer: 'A price floor is a government-imposed minimum legal price',
                  options: ['A price floor is a government-imposed minimum legal price', 'floor below equilibrium'],
                  hint: 'If stuck on surplus calculation, revisit **c6_math_ch05_057 (Solving Linear Equations)** and.',
                  misconception: '**Misconception:** "MSP is the price at which the government buys *all* the farmer\'s produce, so every farmer benefits equally.".' }
          ],
            remediations: { 'misconception-msp-is-the-price': { steps: ['If the student holds the above misconception: 1.', '**Revisit node c12_eco_cbse_05_001** (Market Equilibrium) — verify understanding that equilibrium is where *actual*.', '**Study Table 5.1 of NCERT Microeconomics (or latest Agricultural Statistics)** showing % of production procured at MSP.', '**Re-diagnostic:** "If MSP for wheat is ₹2,275 but a farmer in Bihar sells at ₹1,900, why doesn\'t he get MSP?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_05_008', difficulty: 'standard',
          question: 'Government intervention in prices refers to policies such as price ceilings.',
          hint: 'If stuck, revisit Node 001 (equilibrium determination) and Node 005 (tax/subsidy.',
          misconception: 'Students often believe that a price floor set above equilibrium "helps all producers" and a price ceiling set below.',
          parts: [
                { id: 'a', prompt: 'The demand for wheat is Qd = 1000 - 10P and supply is Qs = 20P - 200 (quantities in tonnes, price in ₹/kg). The government imposes a price floor of ₹35/kg.', answer: 'the free-market equilibrium price and quantity',
                  options: ['the free-market equilibrium price and quantity', 'helps all producers', 'helps all consumers'],
                  hint: 'If stuck, revisit Node 001 (equilibrium determination) and Node 005 (tax/subsidy incidence).',
                  misconception: 'Students often believe that a price floor set above equilibrium "helps all producers" and a price ceiling set below equilibrium "helps all.' },
                { id: 'b', prompt: 'Compare the deadweight loss (DWL) from a binding price ceiling versus a per-unit tax that reduces the equilibrium quantity by the same amount.', answer: 'Both policies reduce quantity traded from Q* to Q1',
                  options: ['Both policies reduce quantity traded from Q* to Q1', 'tax creates larger DWL', 'helps all producers', 'helps all consumers'],
                  hint: 'If stuck, revisit Node 001 (equilibrium determination) and Node 005 (tax/subsidy incidence).',
                  misconception: 'Students often believe that a price floor set above equilibrium "helps all producers" and a price ceiling set below equilibrium "helps all.' }
          ],
            remediations: { 'a-price-floor-set-above': { steps: ['Revisit Node 001 (equilibrium determination) to practice finding Q* and P* algebraically and graphically.', 'Revisit Node 006 (price ceiling) and Node 007 (price floor) to re-learn how to identify binding vs non-binding, and.', 'Revisit Node 005 (tax/subsidy) to practice shifting curves and calculating tax incidence.', 'Do a re-diagnostic: solve a fresh problem with a price floor of ₹50 on a market where Qd = 500 - 5P, Qs = 10P - 200.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
