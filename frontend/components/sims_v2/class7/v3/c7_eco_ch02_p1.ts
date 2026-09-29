import type { SimDef } from '../../engine/types';

/** v3 generated — c7_eco_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_eco_ch02_p1: SimDef = {
    id: 'v3_c7_eco_ch02_p1',
    title: 'Understanding Markets · Part 1/2',
    subtitle: 'Covers the fundamental economic definition of a market and its basic types (physical vs.',
    classLevel: 7, subject: 'economics', topic: 'Understanding Markets · Part 1/2',
    chapters: ['c7_eco_ch02'],
    nodeIds: ['c7_eco_ch02_001', 'c7_eco_ch02_002', 'c7_eco_ch02_003', 'c7_eco_ch02_004', 'c7_eco_ch02_005', 'c7_eco_ch02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking into a bustling Saturday vegetable mandi in your neighborhood or opening an app on your.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Riya pays a classmate 50 rupees for a handmade craft in a school corridor — no shop, no signboard, no receipt. Did a market just happen?',
        options: ['Yes — a buyer, a seller, and an exchange of value are all a market needs, whether it is a corridor, a haat, or an app', 'No — markets require registered shops and computers', 'No — 50 rupees is too small to count', 'Only if a teacher supervises the deal'],
        answer: 'Yes — a buyer, a seller, and an exchange of value are all a market needs, whether it is a corridor, a haat, or an app',
        hook: 'A market is an arrangement, not a building. A vegetable stall and a shopping app do the same job — bringing buyer and seller together — and strictly speaking, even money is optional where value can still be exchanged.',
    },
    teaching: [
        { title: 'What is a Market: Definition and Types', text: 'A market is an arrangement where buyers and sellers come into contact with one another, directly or indirectly, to exchange goods and services for money or other items of value.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_eco_ch02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Audit five everyday scenes — a mandi, a phone app, a school swap day, a cobbler, a rickshaw ride — and decide which truly qualify as markets and why.',
        labels: ['What is a Market', 'How Markets Function: Buyers,', 'Types of Markets: Local,', 'Role of Markets', 'Weekly Markets (Haats): Traditional', 'Role of Government'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_eco_ch02_001', title: 'What is a Market: Definition and Types',
          caseStudy: { intro: 'Imagine walking into a bustling Saturday vegetable mandi in your neighborhood or opening an app on your smartphone to order a new pair of shoes.',
            decisions: [{ prompt: 'What are the three essential components required for any market transaction to take place?', options: [
                { text: 'Buyers, sellers, and an item of exchange (goods, services, or money)', outcome: 'Buyers, sellers, and an item of exchange (goods, services, or money).' },
                { text: 'market', outcome: 'Not quite — Students often think that a "market" must always be a physical building or a specific geographical.', reveals: 'a-market-must-always-be' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch02_002', title: 'How Markets Function: Buyers, Sellers and Exchange',
          scaffold: { problem: 'Anita goes to a local vegetable market in Jaipur to buy potatoes. The vendor quotes a price of ₹25 per kilogram.',
            steps: [
            { text: 'Identify the economic actors and their roles (Anita is the buyer, the vendor is the seller).' },
            { text: 'Extract the given economic variables from the problem (Price per kg = ₹25, Quantity = 4 kg).' },
            { text: 'Recall the exchange formula: Total Value of Exchange = Price per Unit × Quantity Exchanged.' },
            { text: 'Substitute the values into the formula: Total Value = 25 × 4.' },
            { text: 'Calculate the final product: 25 × 4 = 100.', faded: true, blankAnswer: '₹100' }
            ] } },
        { type: 'case', nodeId: 'c7_eco_ch02_003', title: 'Types of Markets: Local, National, Regional, Global',
          caseStudy: { intro: 'Imagine buying fresh coriander from your neighborhood vendor versus ordering a smartphone manufactured in South Korea through an e-commerce website.',
            decisions: [{ prompt: 'Which type of market is a village weekly market (haat) where local farmers sell vegetables directly to nearby villagers?', options: [
                { text: 'a local market', outcome: 'The correct answer is a local market. A student who answers "national market" has a misconception.' },
                { text: 'national market', outcome: 'Not quite — Students often think that the physical size of the item being sold determines the market.', reveals: 'the-physical-size-of-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch02_005', title: 'Weekly Markets (Haats): Traditional Market Systems',
          scaffold: { problem: 'A clay toy maker attends a weekly *haat* every Thursday. She carries 150 toys in a rented auto-rickshaw.',
            steps: [
            { text: 'Identify the selling price per unit (₹50) and quantity sold (150 toys).' },
            { text: 'Calculate Gross Revenue by multiplying price and quantity (₹50 × 150 = ₹7,500).' },
            { text: 'Calculate total production cost by multiplying cost per toy by quantity (₹20 × 150 = ₹3,000) and add transport cost.' },
            { text: 'Subtract Total Costs from Gross Revenue to find Net Profit (₹7,500 - ₹3,300 = ₹4,200).', faded: true, blankAnswer: '₹4,200' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch02_006', title: 'Role of Government in Markets: Regulation and Fair Trade',
          scaffold: { problem: 'A merchant buys 50 kg of cooking oil in sealed tins. The government regulation states that every tin must contain exactly 5 liters, and.',
            steps: [
            { text: 'Identify given data: 5 faulty tins, short-fill of 0.5 liters per tin, and price of ₹120 per liter.' },
            { text: 'Calculate total missing volume of oil: 5 tins × 0.5 liters/tin = 2.5 liters missing in total.' },
            { text: 'Calculate total financial loss: 2.5 liters × ₹120 per liter = ₹300 total loss.' },
            { text: 'Interpret economically: Buyers paid for oil they never received, which violates fair trade and consumer rights.', faded: true, blankAnswer: 'Total financial loss is ₹300 across the 5 tins.' }
            ] } },
        { type: 'case', nodeId: 'c7_eco_ch02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A farmer harvests 100 kg of tomatoes — 20 kg feed his family, and the remaining 80 kg are carted to the wholesale market and sold. At dinner, his son declares, \'The whole harvest was market activity.\'',
            decisions: [{ prompt: 'Which part of the 100 kg actually counts as market activity?', options: [
                { text: 'Only the 80 kg sold — a market transaction needs a buyer, a seller, a good and an agreed price changing hands. The 20 kg eaten at home never met a buyer, so it is production and consumption but not market activity; the son\'s claim erases the line that defines what a market is.', outcome: 'The split matters economically — what a household consumes itself never enters the market, while what it sells becomes revenue and trade.' },
                { text: 'The son is right — everything produced is part of the market whether it is sold or eaten.', outcome: 'Production is not exchange — the eaten portion never met a buyer or a price, so it stays outside the market entirely.', reveals: 'production-equals-market' },
                { text: 'None of it counts — real market activity requires a permanent shop, and a farmer\'s cart is not one.', outcome: 'Markets need buyers, sellers and exchange, not buildings — the wholesale sale of 80 kg is a market transaction however it was carried there.', reveals: 'market-needs-permanent-shop' }
            ] }] } },
        { type: 'case', nodeId: 'c7_eco_ch02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Wherever a want meets an offer and value changes hands, a market quietly exists — no walls required.',
            decisions: [{ prompt: 'What comes next? Understanding Markets · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Understanding Markets · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_eco_ch02_001', difficulty: 'standard',
          question: 'A market is an arrangement where buyers and sellers come into contact with one.',
          hint: 'Review the Class 6 concept of buyers, sellers, and exchange from c6_economics_ch12_001.',
          misconception: 'Students often think that a "market" must always be a physical building or a specific geographical location like.',
          parts: [
                { id: 'a', prompt: 'What are the three essential components required for any market transaction to take place?', answer: 'Buyers, sellers, and an item of exchange (goods, services, or money)',
                  options: ['Buyers, sellers, and an item of exchange (goods, services, or money)', 'market'],
                  hint: 'Review the Class 6 concept of buyers, sellers, and exchange from c6_economics_ch12_001.',
                  misconception: 'Students often think that a "market" must always be a physical building or a specific geographical location like a supermarket.' },
                { id: 'b', prompt: 'Why is a local vegetable vendor\'s stall considered a market even though there are no contracts or computers involved?', answer: 'A market does not require formal legal contracts or computers',
                  options: ['A market does not require formal legal contracts or computers', 'market'],
                  hint: 'Review the Class 6 concept of buyers, sellers, and exchange from c6_economics_ch12_001.',
                  misconception: 'Students often think that a "market" must always be a physical building or a specific geographical location like a supermarket.' },
                { id: 'c', prompt: 'If Riya buys a handmade craft from her classmate during school hours for ₹50, does this interaction constitute a market transaction?', answer: 'Identify the buyer (Riya) and the seller (classmate)',
                  options: ['Identify the buyer (Riya) and the seller (classmate)', 'market', 'markets only happen in registered commercial shops'],
                  hint: 'Review the Class 6 concept of buyers, sellers, and exchange from c6_economics_ch12_001.',
                  misconception: 'Students often think that a "market" must always be a physical building or a specific geographical location like a supermarket.' }
          ],
            remediations: { 'a-market-must-always-be': { steps: ['To fix this misconception, guide the student through two contrasting examples: a local vegetable market (physical) and.', 'Ask them: "Can you touch the building of an online bookstore?" When they say no, ask: "Can you still buy books there?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that a "market" must always be a physical building or a specific geographical location like.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Money is always required for a market to exist." Do you agree or disagree based on economic principles?', answer: 'Disagree',
                  options: ['Disagree', 'market'],
                  hint: 'Review the Class 6 concept of buyers, sellers, and exchange from c6_economics_ch12_001.',
                  misconception: 'Students often think that a "market" must always be a physical building or a specific geographical location like a supermarket.' }
          ],
            remediations: { 'a-market-must-always-be': { steps: ['To fix this misconception, guide the student through two contrasting examples: a local vegetable market (physical) and.', 'Ask them: "Can you touch the building of an online bookstore?" When they say no, ask: "Can you still buy books there?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch02_002', difficulty: 'standard',
          question: 'Market exchange is an economic process where buyers and sellers interact.',
          hint: 'Review c6_economics_ch12_001 to reinforce the basic definitions of buyers, sellers, and.',
          misconception: 'Students often think that market exchange is purely a physical transfer of goods, ignoring the flow of information and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Market exchange is an economic process where buyers and sellers interact to trade goods,',
                  options: ['Market exchange is an economic process where buyers and sellers interact to trade goods,', 'A market is an arrangement where buyers and sellers come into contact with one another,', 'Markets are classified by their geographic scope into local, regional, national, and', 'The role of markets in people\'s lives refers to how buying and selling networks provide'],
                  hint: 'Review c6_economics_ch12_001 to reinforce the basic definitions of buyers, sellers, and the core.',
                  misconception: 'Students often think that market exchange is purely a physical transfer of goods, ignoring the flow of information and money that must.' }
          ],
            remediations: { 'market-exchange-is-purely-a': { steps: ['To fix this misconception, have the student role-play a simple market transaction using paper currency and a classroom.', 'First, ask the student to act as a seller who demands an impossibly high price; ask them what happens when buyers walk.', 'Then, guide them to adjust the price downward until a buyer agrees, proving that exchange requires mutual consent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch02_003', difficulty: 'standard',
          question: 'Markets are classified by their geographic scope into local, regional.',
          hint: 'Review node c7_eco_ch02_001 to reinforce the basic definition of buyers, sellers, and.',
          misconception: 'Students often think that the physical size of the item being sold determines the market type—believing that small.',
          parts: [
                { id: 'a', prompt: 'Which type of market is a village weekly market (haat) where local farmers sell vegetables directly to nearby villagers?', answer: 'a local market',
                  options: ['a local market', 'national market'],
                  hint: 'Review node c7_eco_ch02_001 to reinforce the basic definition of buyers, sellers, and exchange.',
                  misconception: 'Students often think that the physical size of the item being sold determines the market type—believing that small items are always local.' }
          ],
            remediations: { 'the-physical-size-of-the': { steps: ['To fix this misconception, take a single product—such as packaged tea leaves—and trace its journey across three tiers.', 'Ask the student to identify what changed: the tea leaves are identical, but the distance between buyers and sellers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch02_004', difficulty: 'standard',
          question: 'The role of markets in people\'s lives refers to how buying and selling networks.',
          hint: 'Review c6_economics_ch12_001 to understand the basic components of buying and selling.',
          misconception: 'Students often think that markets are merely physical buildings where goods are displayed, ignoring the vast network.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The role of markets in people\'s lives refers to how buying and selling networks provide',
                  options: ['The role of markets in people\'s lives refers to how buying and selling networks provide', 'A market is an arrangement where buyers and sellers come into contact with one another,', 'Market exchange is an economic process where buyers and sellers interact to trade goods,', 'Markets are classified by their geographic scope into local, regional, national, and'],
                  hint: 'Review c6_economics_ch12_001 to understand the basic components of buying and selling before.',
                  misconception: 'Students often think that markets are merely physical buildings where goods are displayed, ignoring the vast network of invisible.' }
          ],
            remediations: { 'markets-are-merely-physical-buildings': { steps: ['To fix this, map out a simple supply chain on paper starting from a farm in a neighboring district to a local.', 'Trace how money and goods move in opposite directions at each step: the farmer sells to a wholesaler for cash, the.', 'Emphasize that every single step represents a person earning a livelihood through market exchange.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch02_005', difficulty: 'standard',
          question: 'A weekly market, often called a *haat* in rural and semi-urban India, is.',
          hint: 'Review c7_eco_ch02_001 to understand how different market structures function before.',
          misconception: 'Students often assume that because weekly market goods are cheaper, the quality must always be inferior or counterfeit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A weekly market, often called a *haat* in rural and semi-urban India, is a traditional',
                  options: ['A weekly market, often called a *haat* in rural and semi-urban India, is a traditional', 'A market is an arrangement where buyers and sellers come into contact with one another,', 'Market exchange is an economic process where buyers and sellers interact to trade goods,', 'Markets are classified by their geographic scope into local, regional, national, and'],
                  hint: 'Review c7_eco_ch02_001 to understand how different market structures function before examining.',
                  misconception: 'Students often assume that because weekly market goods are cheaper, the quality must always be inferior or counterfeit.' }
          ],
            remediations: { 'because-weekly-market-goods-are': { steps: ['To fix this, guide the student through a cost breakdown comparison: take a plastic bucket sold in a permanent city shop.', 'Explain that the city shopkeeper charges extra to cover a ₹5,000 monthly rent, whereas the *haat* vendor pays zero rent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch02_006', difficulty: 'standard',
          question: 'The role of government in markets involves setting rules, regulations, and fair.',
          hint: 'Review c7_eco_ch02_002 to understand how private transactions occur between buyers and.',
          misconception: 'Students often think that government market regulation means the government fixes every single price in the country and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The role of government in markets involves setting rules, regulations, and fair trade',
                  options: ['The role of government in markets involves setting rules, regulations, and fair trade', 'A market is an arrangement where buyers and sellers come into contact with one another,', 'Market exchange is an economic process where buyers and sellers interact to trade goods,', 'Markets are classified by their geographic scope into local, regional, national, and'],
                  hint: 'Review c7_eco_ch02_002 to understand how private transactions occur between buyers and sellers in.',
                  misconception: 'Students often think that government market regulation means the government fixes every single price in the country and runs all shops.' }
          ],
            remediations: { 'government-market-regulation-means-the': { steps: ['To fix this misconception, use a sports analogy: the government is like an umpire on a cricket field, not the captain.', 'Explain that the umpire (government) does not bat or bowl, but makes sure nobody cheats, everyone follows the rules.', 'Then show a real-world example: the government does not set the price of a designer shirt, but it requires the shirt.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
