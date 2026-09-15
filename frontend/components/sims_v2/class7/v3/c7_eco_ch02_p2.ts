import type { SimDef } from '../../engine/types';

/** v3 generated — c7_eco_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_eco_ch02_p2: SimDef = {
    id: 'v3_c7_eco_ch02_p2',
    title: 'Understanding Markets · Part 2/2',
    subtitle: 'Covers the identification of quality certification marks (such as ISI, Agmark, Hallmark).',
    classLevel: 7, subject: 'economics', topic: 'Understanding Markets · Part 2/2',
    chapters: ['c7_eco_ch02'],
    nodeIds: ['c7_eco_ch02_007', 'c7_eco_ch02_008', 'c7_eco_ch02_009', 'c7_eco_ch02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking into a local Kirana store in your neighborhood to buy a packet of spices, a gold ring, and.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Riya pays a classmate 50 rupees for a handmade craft in a school corridor — no shop, no signboard, no receipt. Did a market just happen?',
        options: ['Yes — a buyer, a seller, and an exchange of value are all a market needs, whether it is a corridor, a haat, or an app', 'No — markets require registered shops and computers', 'No — 50 rupees is too small to count', 'Only if a teacher supervises the deal'],
        answer: 'Yes — a buyer, a seller, and an exchange of value are all a market needs, whether it is a corridor, a haat, or an app',
        hook: 'A market is an arrangement, not a building. A vegetable stall and a shopping app do the same job — bringing buyer and seller together — and strictly speaking, even money is optional where value can still be exchanged.',
    },
    teaching: [
        { title: 'Consumer Awareness: Assessing Quality of Goods and Services', text: 'Consumer awareness is the knowledge a buyer has about the safety, quality, price, and standard of goods and services before making a purchase.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_eco_ch02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Audit five everyday scenes — a mandi, a phone app, a school swap day, a cobbler, a rickshaw ride — and decide which truly qualify as markets and why.',
        labels: ['Consumer Awareness: Assessing Quality', 'Price Determination: Supply', 'Markets and Economic Activities', 'Challenges in Markets: Exploitation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_eco_ch02_008', title: 'Price Determination: Supply and Demand Basics',
          scaffold: { problem: 'A local fruit seller in Delhi sells loose apples. At ₹100 per kg, consumers demand 50 kg, but farmers supply 150 kg.',
            steps: [
            { text: 'Identify the given price points and corresponding quantities demanded and supplied from the market data.' },
            { text: 'Compare quantity demanded and quantity supplied at the price of ₹100 per kg (Demand = 50 kg, Supply = 150 kg).' },
            { text: 'Subtract demand from supply at ₹100 to find the market imbalance: 150 kg - 50 kg = 100 kg surplus.' },
            { text: 'Examine all price points to find where quantity demanded equals quantity supplied (at ₹60, both are 100 kg).' },
            { text: 'Conclude that ₹60 per kg is the equilibrium price and a surplus of 100 kg exists at ₹100 per kg.', faded: true, blankAnswer: 'Equilibrium price is ₹60 per kg; at ₹100 per kg there is.' }
            ] } },
        { type: 'case', nodeId: 'c7_eco_ch02_009', title: 'Markets and Economic Activities: Primary, Secondary, Tertiary',
          caseStudy: { intro: 'Imagine buying a crisp cotton school uniform at a local clothing store in your town.',
            decisions: [{ prompt: 'Which of the following economic activities belongs strictly to the primary sector?', options: [
                { text: 'C', outcome: 'The correct answer is C. Harvesting wheat from an agricultural field in Punjab.' },
                { text: 'a single business can only belong to one sector without any overlap', outcome: 'Not quite — Students often think that the tertiary sector creates physical goods just like the primary and.', reveals: 'the-tertiary-sector-creates-physical' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch02_010', title: 'Challenges in Markets: Exploitation and Information Gaps',
          scaffold: { problem: 'A vegetable vendor in a local market uses a manipulated weighing stone that weighs only 800 grams instead of the standard 1000 grams (1.',
            steps: [
            { text: 'Identify the stated quantity purchased (5 kg) and the price per kg (₹40).' },
            { text: 'Calculate the total money paid by the customer: 5 kg × ₹40 = ₹200.' },
            { text: 'Determine the actual weight received by the customer for each 1 kg paid: 800 grams (or 0.8 kg).' },
            { text: 'Calculate the true value of the goods received: 4.0 kg × ₹40 = ₹160.' },
            { text: 'Find the difference between what was paid and the true value of goods received to find the exploitation amount: ₹200.', faded: true, blankAnswer: '₹40 extra collected unfairly.' }
            ] } },
        { type: 'case', nodeId: 'c7_eco_ch02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A farmer harvests 100 kg of tomatoes — 20 kg feed his family, and the remaining 80 kg are carted to the wholesale market and sold. At dinner, his son declares, \'The whole harvest was market activity.\'',
            decisions: [{ prompt: 'Which part of the 100 kg actually counts as market activity?', options: [
                { text: 'Only the 80 kg sold — a market transaction needs a buyer, a seller, a good and an agreed price changing hands. The 20 kg eaten at home never met a buyer, so it is production and consumption but not market activity; the son\'s claim erases the line that defines what a market is.', outcome: 'The split matters economically — what a household consumes itself never enters the market, while what it sells becomes revenue and trade.' },
                { text: 'The son is right — everything produced is part of the market whether it is sold or eaten.', outcome: 'Production is not exchange — the eaten portion never met a buyer or a price, so it stays outside the market entirely.', reveals: 'production-equals-market' },
                { text: 'None of it counts — real market activity requires a permanent shop, and a farmer\'s cart is not one.', outcome: 'Markets need buyers, sellers and exchange, not buildings — the wholesale sale of 80 kg is a market transaction however it was carried there.', reveals: 'market-needs-permanent-shop' }
            ] }] } },
        { type: 'case', nodeId: 'c7_eco_ch02_010', title: 'You made it',
          caseStudy: { intro: 'Wherever a want meets an offer and value changes hands, a market quietly exists — no walls required.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_eco_ch02_007', difficulty: 'standard',
          question: 'Consumer awareness is the knowledge a buyer has about the safety, quality.',
          hint: 'Review market transactions and basic consumer rights from c7_eco_ch02_002 and.',
          misconception: 'Students often believe that a higher price tag automatically guarantees superior product quality and safety, assuming.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Consumer awareness is the knowledge a buyer has about the safety, quality, price, and',
                  options: ['Consumer awareness is the knowledge a buyer has about the safety, quality, price, and', 'A market is an arrangement where buyers and sellers come into contact with one another,', 'Market exchange is an economic process where buyers and sellers interact to trade goods,', 'Markets are classified by their geographic scope into local, regional, national, and'],
                  hint: 'Review market transactions and basic consumer rights from c7_eco_ch02_002 and c6_economics_ch12_005.',
                  misconception: 'Students often believe that a higher price tag automatically guarantees superior product quality and safety, assuming that expensive items.' }
          ],
            remediations: { 'a-higher-price-tag-automatically': { steps: ['To correct this, show students two items: an expensive unbranded gold necklace and a hallmarked gold ring of lesser.', 'Explain that price is set by sellers based on demand, branding, and cost, whereas certification marks like the Bureau.', 'Emphasize that buyers must look for official verification symbols rather than relying on price alone.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch02_008', difficulty: 'standard',
          question: 'Price determination is the economic process by which the price of a good.',
          hint: 'Review node c7_eco_ch02_002 on how buyers and sellers interact in market exchanges before.',
          misconception: 'Students often believe that prices are set purely by what sellers want to charge, completely ignoring the role.',
          parts: [
                { id: 'a', prompt: 'What term describes the market situation when the quantity demanded by consumers is greater than the quantity supplied by producers at a given price?', answer: 'a shortage (or excess demand)',
                  options: ['a shortage (or excess demand)', 'surplus'],
                  hint: 'Review node c7_eco_ch02_002 on how buyers and sellers interact in market exchanges before.',
                  misconception: 'Students often believe that prices are set purely by what sellers want to charge, completely ignoring the role of consumer demand and.' }
          ],
            remediations: { 'prices-are-set-purely-by': { steps: ['To fix this, use a hands-on market simulation: give one student 5 apples and set a high imaginary price of ₹500 per.', 'Ask if anyone will buy at that price.', 'Then guide them step-by-step: 1) Note that zero buyers at ₹500 means the seller makes zero money.', '2) Lower the price step by step until a buyer agrees to purchase.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch02_009', difficulty: 'standard',
          question: 'Primary, secondary, and tertiary economic activities are the three broad.',
          hint: 'Review c7_eco_ch02_002 to recall how goods flow from producers to buyers in everyday.',
          misconception: 'Students often think that the tertiary sector creates physical goods just like the primary and secondary sectors,.',
          parts: [
                { id: 'a', prompt: 'Which of the following economic activities belongs strictly to the primary sector?', answer: 'Harvesting wheat from an agricultural field in Punjab',
                  options: ['Harvesting wheat from an agricultural field in Punjab', 'a single business can only belong to one sector without any overlap'],
                  hint: 'Review c7_eco_ch02_002 to recall how goods flow from producers to buyers in everyday markets.',
                  misconception: 'Students often think that the tertiary sector creates physical goods just like the primary and secondary sectors, or they believe that.' }
          ],
            remediations: { 'the-tertiary-sector-creates-physical': { steps: ['To fix this misconception, guide the student through a tangible classification test using a simple item like packaged.', 'Ask: Where do the raw mangoes come from?', 'Where are the mangoes crushed, sweetened, and sealed in cartons?', 'Who brings the cartons to the local shop and rings up the bill for the customer?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch02_010', difficulty: 'standard',
          question: 'Market challenges like exploitation and information gaps occur when one party.',
          hint: 'Review c7_eco_ch02_002 to understand normal market exchange before studying how.',
          misconception: 'Students often believe that high prices in a market are *always* proof of seller exploitation or dishonesty.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Market challenges like exploitation and information gaps occur when one party in a',
                  options: ['Market challenges like exploitation and information gaps occur when one party in a', 'A market is an arrangement where buyers and sellers come into contact with one another,', 'Market exchange is an economic process where buyers and sellers interact to trade goods,', 'Markets are classified by their geographic scope into local, regional, national, and'],
                  hint: 'Review c7_eco_ch02_002 to understand normal market exchange before studying how imbalances and.',
                  misconception: 'Students often believe that high prices in a market are *always* proof of seller exploitation or dishonesty.' }
          ],
            remediations: { 'high-prices-in-a-market': { steps: ['To correct this, guide the student through a two-part cost breakdown exercise.', 'First, show them how to separate production and transport costs from the final selling price using a real example: "If.', 'This helps students see that exploitation relies on deception or unfair market power, not merely higher prices.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch02_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that high prices in a market are *always* proof of seller exploitation or dishonesty.',
          parts: [
                { id: 'a', prompt: 'Design a simple three-step strategy that a consumer group in a local weekly market (haat) can use to protect buyers from information gaps and unfair weights.', answer: 'A strong response should include: 1',
                  options: ['A strong response should include: 1', 'high prices in a market are *always* proof of seller exploitation or dishonesty'],
                  hint: 'Review c7_eco_ch02_002 to understand normal market exchange before studying how imbalances and.',
                  misconception: 'Students often believe that high prices in a market are *always* proof of seller exploitation or dishonesty.' }
          ],
            remediations: { 'high-prices-in-a-market': { steps: ['To correct this, guide the student through a two-part cost breakdown exercise.', 'First, show them how to separate production and transport costs from the final selling price using a real example: "If.', 'This helps students see that exploitation relies on deception or unfair market power, not merely higher prices.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
