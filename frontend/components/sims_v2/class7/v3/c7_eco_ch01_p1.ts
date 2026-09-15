import type { SimDef } from '../../engine/types';

/** v3 generated — c7_eco_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_eco_ch01_p1: SimDef = {
    id: 'v3_c7_eco_ch01_p1',
    title: 'From Barter to Money · Part 1/2',
    subtitle: 'Covers the fundamental concept of trading goods for goods in a primitive or non-monetary.',
    classLevel: 7, subject: 'economics', topic: 'From Barter to Money · Part 1/2',
    chapters: ['c7_eco_ch01'],
    nodeIds: ['c7_eco_ch01_001', 'c7_eco_ch01_002', 'c7_eco_ch01_003', 'c7_eco_ch01_004', 'c7_eco_ch01_005', 'c7_eco_ch01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are at a local village haat with a basket of fresh wheat, but you urgently need a pair of leather.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You stand in a village haat holding a basket of wheat, desperate for sandals — and money does not exist. Before you can walk home in new shoes, what lucky match must happen?',
        options: ['You must find a cobbler who both has spare sandals and wants your wheat — a double match of wants, negotiated on the spot', 'You just hand over wheat and take any sandals you like', 'You wait for the market to print sandal-money', 'You trade your wheat for a fixed official price in sandals'],
        answer: 'You must find a cobbler who both has spare sandals and wants your wheat — a double match of wants, negotiated on the spot',
        hook: 'Barter has no price tags — one trader may give five mangoes for a kilo of rice while another demands eight. Every rate is negotiated fresh, and if nobody wants your pots, a potter cannot eat at all.',
    },
    teaching: [
        { title: 'Barter System: Exchange of Goods for Goods', text: 'The barter system is an economic method of exchange where goods and services are traded directly for other goods and services without the use of money as a medium of exchange.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_eco_ch01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Survive a day in a barter village — as a weaver, find who needs cloth and has what you need, then negotiate a fair swap measured in kilograms per metre.',
        labels: ['Barter System: Exchange', 'Limitations of the Barter', 'Emergence of Money: Need', 'Early Forms of Money', 'Metallic Money: Coins', 'Paper Currency: Notes'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_eco_ch01_001', title: 'Barter System: Exchange of Goods for Goods',
          caseStudy: { intro: 'Imagine you are at a local village haat with a basket of fresh wheat, but you urgently need a pair of leather sandals for the upcoming festival.',
            decisions: [{ prompt: 'What is the defining characteristic of a barter system of trade?', options: [
                { text: 'The defining characteristic is the direct exchange of goods and services for other goods', outcome: 'The defining characteristic is the direct exchange of goods and services for other goods and.' },
                { text: 'trading goods for rupees', outcome: 'Not quite — Students often think that bartering is just a primitive type of shopping where items have fixed.', reveals: 'bartering-is-just-a-primitive' }
            ] }] } },
        { type: 'case', nodeId: 'c7_eco_ch01_002', title: 'Limitations of the Barter System: Double Coincidence of Wants',
          caseStudy: { intro: 'Imagine a wheat farmer in Punjab who needs a pair of sturdy shoes for the winter season.',
            decisions: [{ prompt: 'What term describes the condition where Person A wants what Person B has, and Person B simultaneously wants what Person A has?', options: [
                { text: 'The correct term is the double coincidence of wants', outcome: 'The correct term is the double coincidence of wants. If a student answers "barter system".' },
                { text: 'barter system', outcome: 'Not quite — Students often believe that in a barter system, goods always have a fixed and universally accepted.', reveals: 'in-a-barter-system' },
                { text: 'market exchange', outcome: 'Not quite — Students often believe that in a barter system, goods always have a fixed and universally accepted.', reveals: 'in-a-barter-system' }
            ] }] } },
        { type: 'case', nodeId: 'c7_eco_ch01_003', title: 'Emergence of Money: Need and Historical Development',
          caseStudy: { intro: 'Imagine you are a wheat farmer in a bustling ancient Indian village market who urgently needs a pair of iron shoes made by the village blacksmith.',
            decisions: [{ prompt: 'What fundamental problem of the barter system directly caused societies to seek an alternative medium of exchange?', options: [
                { text: 'The requirement of a "double coincidence of wants," where both trading parties must', outcome: 'The requirement of a "double coincidence of wants," where both trading parties must simultaneously.' },
                { text: 'prices were too high in barter', outcome: 'Not quite — Students often believe that money was invented overnight by government decree or by a king who.', reveals: 'money-was-invented-overnight-by' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch01_004', title: 'Early Forms of Money: Cowrie Shells, Cattle, Commodity Money',
          scaffold: { problem: 'In an ancient Indian village practicing commodity exchange, 1 cow of superior breed is valued at 10 sacks of rice.',
            steps: [
            { text: 'Identify the given exchange values: 1 cow = 10 sacks of rice, and 1 sack of rice = 4 clay pots.' },
            { text: 'Set up the equation to convert cows into pots through the intermediate commodity (rice).' },
            { text: 'Substitute the value of 1 sack of rice into the cow valuation: 1 cow = 10 × (4 clay pots).' },
            { text: 'Calculate the total number of pots required: 10 × 4 = 40 pots.' },
            { text: 'Interpret economically: Cattle and rice acted as units of account and intermediate commodities to bridge the gap.', faded: true, blankAnswer: '40 clay pots' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch01_006', title: 'Paper Currency: Notes and Their Advantages',
          scaffold: { problem: 'A grain merchant in Punjab needs to pay 50,000 rupees to a farmer for a harvest.',
            steps: [
            { text: 'Calculate the total number of 10-rupee coins needed for 50,000 rupees ($\\frac{50,000}{10} = 5,000\\text{ coins}$).' },
            { text: 'Calculate the total weight of the coins in grams ($5,000\\text{ coins} \\times 8\\text{ grams/coin} = 40,000\\text{.' },
            { text: 'Calculate the total number of 500-rupee notes needed for 50,000 rupees ($\\frac{50,000}{500} = 100\\text{ notes}$).' },
            { text: 'Calculate the total weight of the paper notes in grams ($100\\text{ notes} \\times 1\\text{ gram/note} = 100\\text{ grams}$.' },
            { text: 'Subtract the paper weight from the coin weight ($40\\text{ kgs} - 0.1\\text{ kgs} = 39.9\\text{ kgs}$ saved).', faded: true, blankAnswer: 'The merchant saves 39.9 kilograms of carrying weight.' }
            ] } },
        { type: 'case', nodeId: 'c7_eco_ch01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a barter market, two merchants argue over a bronze idol. One insists it\'s worth 5 bags of grain; the other says 3, because grain is scarce this season. With no money, there\'s no price tag to settle it.',
            decisions: [{ prompt: 'Why can\'t the argument be resolved — and what does that reveal about barter?', options: [
                { text: 'Because barter has no common measure of value — the idol\'s \'worth\' exists only as a negotiated ratio against whatever it is traded for, and that ratio shifts with scarcity: in a lean season, grain commands more. Money fixes exactly this by giving every good a single common measure — a price — instead of a different bargain for each pair of goods.', outcome: 'Both merchants are partly right — value in barter is situational, and the disagreement itself is the flaw that money was invented to remove.' },
                { text: 'The first merchant is right — valuable items keep a fixed worth, so 5 bags is the idol\'s true price.', outcome: 'Barter has no \'true price\' — value is set per trade, and a scarce harvest legitimately makes grain dearer against everything.', reveals: 'value-is-fixed' },
                { text: 'The dispute is just about honesty — one of them is lying, and a truthful trader would end it.', outcome: 'Both may be honest — without a shared measure, two reasonable people can hold different valuations, which is the structural problem, not dishonesty.', reveals: 'disputes-mean-dishonesty' }
            ] }] } },
        { type: 'case', nodeId: 'c7_eco_ch01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Money was invented because matching wants is exhausting. Barter works only when two needs collide at the same moment.',
            decisions: [{ prompt: 'What comes next? From Barter to Money · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — From Barter to Money · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_eco_ch01_001', difficulty: 'standard',
          question: 'The barter system is an economic method of exchange where goods and services.',
          hint: 'Review c6_economics_ch11_001 to recall how people traded surplus goods before coins and.',
          misconception: 'Students often think that bartering is just a primitive type of shopping where items have fixed price tags in terms.',
          parts: [
                { id: 'a', prompt: 'Why would a farmer who grows rice and needs vegetables prefer trading directly with a vegetable grower rather than keeping all the rice?', answer: 'The farmer trades directly',
                  options: ['The farmer trades directly', 'the farmer uses coins to buy vegetables'],
                  hint: 'Review c6_economics_ch11_001 to recall how people traded surplus goods before coins and paper money.',
                  misconception: 'Students often think that bartering is just a primitive type of shopping where items have fixed price tags in terms of other items, such.' }
          ],
            remediations: { 'bartering-is-just-a-primitive': { steps: ['To fix this misconception, walk through a concrete example using a basket of mangoes and a bag of rice.', 'Show that if Person A trades with Person B, they might agree on 1 kg rice for 5 mangoes, but Person C might demand 1.', 'Emphasize that without a common currency to measure value, exchange rates change constantly depending on who is trading.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that bartering is just a primitive type of shopping where items have fixed price tags in terms.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether a potter who makes clay pots can easily survive in a pure barter economy if nobody in the village currently needs a new pot.', answer: 'The potter cannot easily survive',
                  options: ['The potter cannot easily survive', 'the potter can sell pots for digital money'],
                  hint: 'Review c6_economics_ch11_001 to recall how people traded surplus goods before coins and paper money.',
                  misconception: 'Students often think that bartering is just a primitive type of shopping where items have fixed price tags in terms of other items, such.' }
          ],
            remediations: { 'bartering-is-just-a-primitive': { steps: ['To fix this misconception, walk through a concrete example using a basket of mangoes and a bag of rice.', 'Show that if Person A trades with Person B, they might agree on 1 kg rice for 5 mangoes, but Person C might demand 1.', 'Emphasize that without a common currency to measure value, exchange rates change constantly depending on who is trading.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch01_002', difficulty: 'standard',
          question: 'The double coincidence of wants is a situation where two parties must each.',
          hint: 'Review node c7_eco_ch01_001 to solidify the basic mechanics of how goods were exchanged.',
          misconception: 'Students often believe that in a barter system, goods always have a fixed and universally accepted value relative.',
          parts: [
                { id: 'a', prompt: 'What term describes the condition where Person A wants what Person B has, and Person B simultaneously wants what Person A has?', answer: 'The correct term is the double coincidence of wants',
                  options: ['The correct term is the double coincidence of wants', 'barter system', 'market exchange'],
                  hint: 'Review node c7_eco_ch01_001 to solidify the basic mechanics of how goods were exchanged before.',
                  misconception: 'Students often believe that in a barter system, goods always have a fixed and universally accepted value relative to each other, making.' }
          ],
            remediations: { 'in-a-barter-system': { steps: ['To fix this misconception, guide the student through a concrete multi-party simulation.', 'Give Student A 10 mangoes who wants a notebook.', 'Give Student B notebooks who wants iron nails.', 'Give Student C iron nails who wants mangoes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch01_003', difficulty: 'standard',
          question: 'The emergence of money represents the historical evolution from a cumbersome.',
          hint: 'Review c7_eco_ch01_002 to re-examine the exact problems of the barter system before.',
          misconception: 'Students often believe that money was invented overnight by government decree or by a king who ordered everyone to use.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The emergence of money represents the historical evolution from a cumbersome barter',
                  options: ['The emergence of money represents the historical evolution from a cumbersome barter', 'The barter system is an economic method of exchange where goods and services are traded', 'The double coincidence of wants is a situation where two parties must each desire what', 'Early forms of money refer to specific everyday commodities—such as cowrie shells,'],
                  hint: 'Review c7_eco_ch01_002 to re-examine the exact problems of the barter system before studying how.',
                  misconception: 'Students often believe that money was invented overnight by government decree or by a king who ordered everyone to use coins.' }
          ],
            remediations: { 'money-was-invented-overnight-by': { steps: ['To fix this misconception, walk the student through a step-by-step market simulation: 1.', 'Take a community of 4 villagers (farmer, potter, weaver, blacksmith) trading without money.', 'Show how they waste hours walking around trying to match their exact needs (double coincidence failure).', 'Observe how one commodity (say, salt or metal bits) naturally becomes accepted by everyone because everybody wants.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch01_004', difficulty: 'standard',
          question: 'Early forms of money refer to specific everyday commodities—such as cowrie.',
          hint: 'Review c7_eco_ch01_002 to reinforce how trading goods directly created severe bottlenecks.',
          misconception: 'Students often think that any rare object naturally became money without needing general social agreement or trust.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Early forms of money refer to specific everyday commodities—such as cowrie shells,',
                  options: ['Early forms of money refer to specific everyday commodities—such as cowrie shells,', 'The barter system is an economic method of exchange where goods and services are traded', 'The double coincidence of wants is a situation where two parties must each desire what', 'The emergence of money represents the historical evolution from a cumbersome barter'],
                  hint: 'Review c7_eco_ch01_002 to reinforce how trading goods directly created severe bottlenecks.',
                  misconception: 'Students often think that any rare object naturally became money without needing general social agreement or trust.' }
          ],
            remediations: { 'any-rare-object-naturally-became': { steps: ['To fix this, guide the student back to the basic definition of exchange: trade requires trust.', 'Ask the student: "If you try to pay a shopkeeper with a common pebble from your backyard, will they accept it?" When.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch01_005', difficulty: 'standard',
          question: 'Metallic money refers to standardized pieces of metal, such as copper, silver.',
          hint: 'Review node c7_eco_ch01_004 to understand the physical inconveniences of commodity money.',
          misconception: 'Students often think that the value of early metallic money came entirely from the king\'s stamp or decree, ignoring the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Metallic money refers to standardized pieces of metal, such as copper, silver, or gold,',
                  options: ['Metallic money refers to standardized pieces of metal, such as copper, silver, or gold,', 'The barter system is an economic method of exchange where goods and services are traded', 'The double coincidence of wants is a situation where two parties must each desire what', 'The emergence of money represents the historical evolution from a cumbersome barter'],
                  hint: 'Review node c7_eco_ch01_004 to understand the physical inconveniences of commodity money like grain.',
                  misconception: 'Students often think that the value of early metallic money came entirely from the king\'s stamp or decree, ignoring the intrinsic value.' }
          ],
            remediations: { 'the-value-of-early-metallic': { steps: ['To fix this misconception, use a concrete comparison: show students two coins of identical size—one made of aluminum.', 'Ask them which one a merchant would accept in exchange for an expensive bag of spices, and why.', 'Explain that while the stamp provides trust and convenience, the underlying metal represents real wealth and scarcity.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch01_006', difficulty: 'standard',
          question: 'Paper currency consists of lightweight paper notes issued by a central monetary.',
          hint: 'Review node c7_eco_ch01_005 to recall the weight and storage problems associated with.',
          misconception: 'Students often believe that paper currency notes derive their high value from the physical material they are printed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Paper currency consists of lightweight paper notes issued by a central monetary authority',
                  options: ['Paper currency consists of lightweight paper notes issued by a central monetary authority', 'The barter system is an economic method of exchange where goods and services are traded', 'The double coincidence of wants is a situation where two parties must each desire what', 'The emergence of money represents the historical evolution from a cumbersome barter'],
                  hint: 'Review node c7_eco_ch01_005 to recall the weight and storage problems associated with carrying.',
                  misconception: 'Students often believe that paper currency notes derive their high value from the physical material they are printed on—such as a special.' }
          ],
            remediations: { 'paper-currency-notes-derive-their': { steps: ['To fix this misconception, show students two items: a used notebook page and a 100-rupee currency note.', 'Ask them to estimate the raw material cost of paper for both (both are very inexpensive, mere fractions of a rupee).', 'Then ask why a shopkeeper accepts the 100-rupee note for goods worth 100 rupees but rejects the notebook paper.', 'Explain that the difference is not the paper quality, but the government\'s guarantee (Reserve Bank of India governor\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
