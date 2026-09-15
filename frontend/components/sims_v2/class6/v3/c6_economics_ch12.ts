import type { SimDef } from '../../engine/types';

/** v3 generated — c6_economics_ch12 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_economics_ch12: SimDef = {
    id: 'v3_c6_economics_ch12',
    title: 'Understanding Markets',
    subtitle: 'Is an empty shop still a market?',
    classLevel: 6, subject: 'economics', topic: 'Understanding Markets',
    chapters: ['c6_economics_ch12'],
    nodeIds: ['c6_economics_ch12_001', 'c6_economics_ch12_002', 'c6_economics_ch12_003', 'c6_economics_ch12_004', 'c6_economics_ch12_005', 'c6_economics_ch12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a market-maker matching buyers with sellers', intro: 'One shop, zero customers; one app, a million trades. Your job is to figure out what a market really is — and it isn\'t a building.', goal: 'Define a market by the exchange — buyer, seller, price — not by walls and stalls.' },
    discovery: {
        question: 'A shopkeeper insists, \'I run a market!\' But for a whole month not a single customer walks in. His shop is real and his shelves are full — so is it still a market?',
        options: ['Not quite — a market needs buyers AND sellers meeting to exchange; an empty shop is only half a market', 'Yes — any building with goods for sale is automatically a market', 'No — markets must be outdoors, like vegetable stalls', 'Yes — the market exists as long as the rent is paid'],
        answer: 'Not quite — a market needs buyers AND sellers meeting to exchange; an empty shop is only half a market',
        hook: 'A market isn\'t a place — it\'s a meeting. Buyer + seller + exchange can happen in a stall, a shop, or an app. No meeting, no market.',
    },
    teaching: [
        { title: 'What is a Market? Buyers, Sellers, and Exchange', text: 'A market is any environment, physical or digital, where buyers and sellers meet to exchange goods or services for a price. It acts as the central link that connects producers to consumers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_economics_ch12_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Build a market from scratch — bring together people who want things and people who sell them — in a bazaar AND on a phone screen.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c6_economics_ch12_001', title: 'What is a Market? Buyers, Sellers, and Exchange',
          caseStudy: { intro: 'Have you ever wondered what happens when you buy a pencil from a shopkeeper?',
            decisions: [{ prompt: 'What are the three essential components that make a market?', options: [
                { text: 'The three components are the buyer, the seller, and the exchange of goods or services', outcome: 'The three components are the buyer, the seller, and the exchange of goods or services.' },
                { text: 'a market must be a physical place they can visit', outcome: 'Not quite — Students often believe a market must be a physical place they can visit.', reveals: 'a-market-must-be-a' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch12_002', title: 'Types of Markets: Local, National, and Global',
          caseStudy: { intro: 'Think about the fresh vegetables your mother buys from the street vendor compared to the smartphone in your father\'s pocket that was perhaps designed.',
            decisions: [{ prompt: 'What is a local market? A local market is a place where goods are sold within a small area, like a neighborhood or village.', options: [
                { text: 'Correct', outcome: 'Correct. A wrong answer (like "a place where only farmers sell") reveals a misunderstanding that.' },
                { text: 'a place where only farmers sell', outcome: 'Not quite — Students often confuse "market size" with "shop size." They might think a large supermarket.', reveals: 'students-often-confuse-market-size' },
                { text: 'market size', outcome: 'Not quite — Students often confuse "market size" with "shop size." They might think a large supermarket.', reveals: 'students-often-confuse-market-size' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch12_003', title: 'How Prices Are Determined: Supply and Demand Basics',
          caseStudy: { intro: 'Have you ever wondered why the price of umbrellas goes up when the monsoon starts, or why mangoes get cheaper in the middle of summer?',
            decisions: [{ prompt: 'What is the difference between supply and demand?', options: [
                { text: 'Supply is the amount sellers are willing to sell, while demand is the amount buyers are', outcome: 'Supply is the amount sellers are willing to sell, while demand is the amount buyers are willing.' },
                { text: 'high demand', outcome: 'Not quite — Students often think that "high demand" automatically means "high price" regardless of supply.', reveals: 'high-demand-automatically-means-high' },
                { text: 'high price', outcome: 'Not quite — Students often think that "high demand" automatically means "high price" regardless of supply.', reveals: 'high-demand-automatically-means-high' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch12_004', title: 'Competition in Markets: Many Sellers, Many Buyers',
          caseStudy: { intro: 'Have you ever wondered why there are so many different shops selling notebooks in your local market?',
            decisions: [{ prompt: 'What is the term for a market where there is only one seller?', options: [
                { text: 'The term is a monopoly', outcome: 'The term is a monopoly. If a student answers "competition" or "market," it reveals they have not.' },
                { text: 'competition', outcome: 'Not quite — Students often think "competition" means the sellers are fighting or hurting each other.', reveals: 'competition-means-the-sellers-are' },
                { text: 'fighting', outcome: 'Not quite — Students often think "competition" means the sellers are fighting or hurting each other.', reveals: 'competition-means-the-sellers-are' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch12_005', title: 'Consumer Awareness: Rights and Protection',
          caseStudy: { intro: 'Have you ever bought a packet of chips only to find it was already expired, or felt you were charged more than the price printed on the label?',
            decisions: [{ prompt: 'What does "consumer awareness" mean in simple terms?', options: [
                { text: 'It means knowing your rights as a buyer and how to protect yourself from unfair practices', outcome: 'It means knowing your rights as a buyer and how to protect yourself from unfair practices like.' },
                { text: 'finding cheap prices', outcome: 'Not quite — Students often confuse "consumer rights" with "being rude to shopkeepers." They think being.', reveals: 'students-often-confuse-consumer-rights' },
                { text: 'consumer rights', outcome: 'Not quite — Students often confuse "consumer rights" with "being rude to shopkeepers." They think being.', reveals: 'students-often-confuse-consumer-rights' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch12_006', title: 'Markets in Daily Life: From Vegetable Vendors to Online Shopping',
          caseStudy: { intro: 'Think about how you got your breakfast today; did you use milk from a local dairy or bread from a store?',
            decisions: [{ prompt: 'What is the primary purpose of a market in our daily lives?', options: [
                { text: 'The purpose is to exchange goods or services for money', outcome: 'The purpose is to exchange goods or services for money. A wrong answer suggests the student thinks.' },
                { text: 'buying food', outcome: 'Not quite — Students often believe that "markets" only refer to physical locations like the vegetable market.', reveals: 'markets-only-refer-to-physical' },
                { text: 'markets', outcome: 'Not quite — Students often believe that "markets" only refer to physical locations like the vegetable market.', reveals: 'markets-only-refer-to-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student orders a textbook online from a seller in another city. Her grandfather snorts: \'Ordering on a screen isn\'t a market — a market is a place with stalls and shouting, like our weekly haat.\'',
            decisions: [{ prompt: 'Who is right about what a market is?', options: [
                { text: 'The student — a market is any arrangement where buyers and sellers exchange goods for money; a physical place is optional. The online order has both parties, a good and a price, so it is as much a market as the haat. The real test is the exchange — a shop standing empty with no buyers for a month is a building, not a functioning market.', outcome: 'The haat and the app share the same essence — a buyer, a seller and a price agreed between them; the weekly gathering and the website are just two shapes of the same thing.' },
                { text: 'Grandfather is right — if there is no physical place where people gather, it cannot be a market.', outcome: 'Markets are defined by exchange, not geography — buyers and sellers who never meet still complete a market transaction.', reveals: 'market-must-be-a-place' },
                { text: 'Neither is fully right — only shops open daily count; both the haat and the app are something else.', outcome: 'Frequency is irrelevant — a weekly haat and an online order are both markets because both are exchanges; \'every day\' is not in the definition.', reveals: 'market-must-be-daily' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch12_006', title: 'You made it',
          caseStudy: { intro: 'Follow the pencil: your need met the shopkeeper\'s supply, and money carried the message. Wherever buyers and sellers meet — even online — that\'s the market.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_economics_ch12_001', difficulty: 'standard',
          question: 'A market is any environment, physical or digital, where buyers and sellers meet.',
          hint: 'Review the definition of "Economic Activities" in Chapter 14.',
          misconception: 'Students often believe a market must be a physical place they can visit.',
          parts: [
                { id: 'a', prompt: 'Is a mobile app where you order groceries a "market"? Why or why not?', answer: 'Yes, it is a market',
                  options: ['Yes, it is a market', 'a market must have four walls and a roof', 'a market must be a physical place they can visit'],
                  hint: 'Review the definition of "Economic Activities" in Chapter 14.',
                  misconception: 'Students often believe a market must be a physical place they can visit.' },
                { id: 'b', prompt: 'If a farmer gives wheat to a neighbor in exchange for labor, is this a market transaction? Explain.', answer: 'Yes, it is a market transaction',
                  options: ['Yes, it is a market transaction', 'a market must be a physical place they can visit'],
                  hint: 'Review the definition of "Economic Activities" in Chapter 14.',
                  misconception: 'Students often believe a market must be a physical place they can visit.' }
          ],
            remediations: { 'a-market-must-be-a': { steps: ['First, ask the student to describe how they get a digital game or an e-book.', 'Ask: "Who made it?" (Seller) and "Who got it?" (Buyer).', 'Point out that since money and products moved between them, the digital screen is just a different "type" of shop.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe a market must be a physical place they can visit.',
          parts: [
                { id: 'a', prompt: 'Can a market exist if the seller has goods but there are no buyers?', answer: 'No, a market requires the interaction of both parties',
                  options: ['No, a market requires the interaction of both parties', 'a market must be a physical place they can visit'],
                  hint: 'Review the definition of "Economic Activities" in Chapter 14.',
                  misconception: 'Students often believe a market must be a physical place they can visit.' }
          ],
            remediations: { 'a-market-must-be-a': { steps: ['First, ask the student to describe how they get a digital game or an e-book.', 'Ask: "Who made it?" (Seller) and "Who got it?" (Buyer).', 'Point out that since money and products moved between them, the digital screen is just a different "type" of shop.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch12_002', difficulty: 'standard',
          question: 'Markets are categorized based on their geographical reach, where local markets.',
          hint: 'Review the "Economic Activities" chapter regarding how goods move from producer.',
          misconception: 'Students often confuse "market size" with "shop size." They might think a large supermarket in their neighborhood is.',
          parts: [
                { id: 'a', prompt: 'What is a local market? A local market is a place where goods are sold within a small area, like a neighborhood or village.', answer: 'Correct',
                  options: ['Correct', 'a place where only farmers sell', 'market size', 'shop size'],
                  hint: 'Review the "Economic Activities" chapter regarding how goods move from producer to consumer.',
                  misconception: 'Students often confuse "market size" with "shop size." They might think a large supermarket in their neighborhood is a "national market".' },
                { id: 'b', prompt: 'If a company sells shoes across every state in India, is this a local or national market? It is a national market because it spans an entire country.', answer: 'Correct',
                  options: ['Correct', 'market size', 'shop size', 'national market'],
                  hint: 'Review the "Economic Activities" chapter regarding how goods move from producer to consumer.',
                  misconception: 'Students often confuse "market size" with "shop size." They might think a large supermarket in their neighborhood is a "national market".' },
                { id: 'c', prompt: 'Why might the price of the same brand of soap be different in a local shop versus a large city store?', answer: 'Correct',
                  options: ['Correct', 'market size', 'shop size', 'national market'],
                  hint: 'Review the "Economic Activities" chapter regarding how goods move from producer to consumer.',
                  misconception: 'Students often confuse "market size" with "shop size." They might think a large supermarket in their neighborhood is a "national market".' }
          ],
            remediations: { 'students-often-confuse-market-size': { steps: ['Ask the student to identify where the customers of the shop live.', 'If they only live nearby, define it as local.', 'Explain that "National" requires moving goods across state lines, regardless of how big the building is.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch12_003', difficulty: 'standard',
          question: 'Supply is the total amount of a product that sellers are willing to offer at.',
          hint: 'Review Chapter 14 (Economic Activities) to recall how goods move from farms to shops.',
          misconception: 'Students often think that "high demand" automatically means "high price" regardless of supply.',
          parts: [
                { id: 'a', prompt: 'If a sudden storm destroys half of the apple crop, what happens to the supply of apples in the market?', answer: 'The supply decreases',
                  options: ['The supply decreases', 'supply', 'high demand', 'high price'],
                  hint: 'Review Chapter 14 (Economic Activities) to recall how goods move from farms to shops.',
                  misconception: 'Students often think that "high demand" automatically means "high price" regardless of supply.' },
                { id: 'b', prompt: 'If a popular new toy becomes a trend and every child wants one, what happens to the price if the number of toys stays the same?', answer: 'The price will rise',
                  options: ['The price will rise', 'high demand', 'high price', '"high demand" automatically means "high price" regardless of supply'],
                  hint: 'Review Chapter 14 (Economic Activities) to recall how goods move from farms to shops.',
                  misconception: 'Students often think that "high demand" automatically means "high price" regardless of supply.' },
                { id: 'c', prompt: 'Compare a scenario where mangoes are in season versus out of season. How does the quantity of mangoes affect their price?', answer: 'When in season, supply is high, making prices lower',
                  options: ['When in season, supply is high, making prices lower', 'high demand', 'high price', '"high demand" automatically means "high price" regardless of supply'],
                  hint: 'Review Chapter 14 (Economic Activities) to recall how goods move from farms to shops.',
                  misconception: 'Students often think that "high demand" automatically means "high price" regardless of supply.' }
          ],
            remediations: { 'high-demand-automatically-means-high': { steps: ['First, ask the student to visualize a scale: one side is "Quantity Available" (Supply) and the other is "Quantity.', 'Tell them to imagine if one side is very heavy.', 'If the "Wanted" side is heavy, the price needs to go up to push the scale back to center.', 'Use the onion example: if the market is flooded with onions, the "Available" side is heavy, so the price must go down.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch12_004', difficulty: 'standard',
          question: 'Market competition is a situation where multiple sellers offer products to many.',
          hint: 'Review the definition of "economic activities" in the NCERT textbook.',
          misconception: 'Students often think "competition" means the sellers are fighting or hurting each other.',
          parts: [
                { id: 'a', prompt: 'What is the term for a market where there is only one seller?', answer: 'The term is a monopoly',
                  options: ['The term is a monopoly', 'competition', 'fighting', 'competing for customer preference'],
                  hint: 'Review the definition of "economic activities" in the NCERT textbook.',
                  misconception: 'Students often think "competition" means the sellers are fighting or hurting each other.' },
                { id: 'b', prompt: 'Why does competition among many sellers generally benefit the consumer?', answer: 'Competition benefits the consumer',
                  options: ['Competition benefits the consumer', 'it makes things more expensive', 'competition', 'fighting'],
                  hint: 'Review the definition of "economic activities" in the NCERT textbook.',
                  misconception: 'Students often think "competition" means the sellers are fighting or hurting each other.' },
                { id: 'c', prompt: 'If a large government project is the only buyer of steel in a region, and it forces all steel factories to lower their prices to an unfair level, what is this.', answer: 'This is called a monopsony',
                  options: ['This is called a monopsony', 'competition', 'fighting', 'competing for customer preference'],
                  hint: 'Review the definition of "economic activities" in the NCERT textbook.',
                  misconception: 'Students often think "competition" means the sellers are fighting or hurting each other.' },
                { id: 'd', prompt: 'Compare the position of a buyer in a competitive market versus a monopoly.', answer: 'In a competitive market, a buyer has power',
                  options: ['In a competitive market, a buyer has power', 'competition', 'fighting', 'competing for customer preference'],
                  hint: 'Review the definition of "economic activities" in the NCERT textbook.',
                  misconception: 'Students often think "competition" means the sellers are fighting or hurting each other.' }
          ],
            remediations: { 'competition-means-the-sellers-are': { steps: ['First, ask the student to imagine two ice cream vendors standing next to each other.', 'Ask them: "If vendor A charges 50 rupees but vendor B charges 30 rupees for the same ice cream, who will the customers.', 'This clarifies that competition is about "winning" customers, not "fighting" rivals.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch12_005', difficulty: 'standard',
          question: 'Consumer awareness is the process of understanding your rights as a buyer and.',
          hint: 'Review the definition of "economic activity" to see how buying a snack is an exchange.',
          misconception: 'Students often confuse "consumer rights" with "being rude to shopkeepers." They think being an "aware" consumer means.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Consumer awareness is the process of understanding your rights as a buyer and learning',
                  options: ['Consumer awareness is the process of understanding your rights as a buyer and learning', 'A market is any environment, physical or digital, where buyers and sellers meet to', 'Markets are categorized based on their geographical reach, where local markets serve', 'Supply is the total amount of a product that sellers are willing to offer at a specific'],
                  hint: 'Review the definition of "economic activity" to see how buying a snack is an exchange of money for.',
                  misconception: 'Students often confuse "consumer rights" with "being rude to shopkeepers." They think being an "aware" consumer means arguing or fighting.' }
          ],
            remediations: { 'students-often-confuse-consumer-rights': { steps: ['Ask for the price politely.', 'Check the label for the date.', 'Explain that if the info is missing, they will simply shop elsewhere.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch12_006', difficulty: 'standard',
          question: 'Markets are the physical or virtual spaces where people buy and sell goods and.',
          hint: 'Review Chapter 14: Economic Activities Around Us.',
          misconception: 'Students often believe that "markets" only refer to physical locations like the vegetable market or a grocery store.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a market in our daily lives?', answer: 'The purpose is to exchange goods or services for money',
                  options: ['The purpose is to exchange goods or services for money', 'buying food', 'markets'],
                  hint: 'Review Chapter 14: Economic Activities Around Us.',
                  misconception: 'Students often believe that "markets" only refer to physical locations like the vegetable market or a grocery store.' },
                { id: 'b', prompt: 'Compare a vegetable vendor to an online clothing store. What is the one thing that remains the same in both?', answer: 'Both involve a transaction where money is exchanged for a product',
                  options: ['Both involve a transaction where money is exchanged for a product', 'markets'],
                  hint: 'Review Chapter 14: Economic Activities Around Us.',
                  misconception: 'Students often believe that "markets" only refer to physical locations like the vegetable market or a grocery store.' }
          ],
            remediations: { 'markets-only-refer-to-physical': { steps: ['Ask the student to list five things they paid for last week.', 'For each item, ask: "Did you get an object to keep, or did someone do something for you?" 3.', 'Label the "object" as a Good and the "action" as a Service.', 'Explain that both are bought in the "Market."'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
