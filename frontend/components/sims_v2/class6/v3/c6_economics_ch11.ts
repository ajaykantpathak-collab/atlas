import type { SimDef } from '../../engine/types';

/** v3 generated — c6_economics_ch11 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_economics_ch11: SimDef = {
    id: 'v3_c6_economics_ch11',
    title: 'From Barter to Money',
    subtitle: 'Three villagers, three wants — and not a single trade',
    classLevel: 6, subject: 'economics', topic: 'From Barter to Money',
    chapters: ['c6_economics_ch11'],
    nodeIds: ['c6_economics_ch11_001', 'c6_economics_ch11_002', 'c6_economics_ch11_003', 'c6_economics_ch11_004', 'c6_economics_ch11_005', 'c6_economics_ch11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a trade negotiator in a village without money', intro: 'The cobbler wants bread, the farmer wants cloth, the weaver wants shoes — and nobody is offering the right swap. Welcome to the world\'s oldest trading puzzle.', goal: 'Feel why the double coincidence of wants made barter exhausting — and why money changed everything.' },
    discovery: {
        question: 'The cobbler has shoes and wants bread. The farmer has bread and wants a shirt. The weaver has a shirt and wants shoes. Nobody wants what\'s directly offered — why is this village stuck?',
        options: ['Barter needs a \'double coincidence of wants\' — each side must want exactly what the other has', 'The villagers are stuck because their goods are too cheap', 'Barter only fails when people are unfriendly to each other', 'They\'re stuck because shoes are worth more than bread'],
        answer: 'Barter needs a \'double coincidence of wants\' — each side must want exactly what the other has',
        hook: 'Barter isn\'t just \'swapping stuff\' — it\'s a lock that opens only when two wants match perfectly. Money is the master key that ended the waiting.',
    },
    teaching: [
        { title: 'The Barter System: How People Exchanged Before Money', text: 'The barter system is an early method of trade where people exchanged goods or services directly for other goods or services without using money.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_economics_ch11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Unstick a barter village — chain the trades so cobbler, farmer and weaver all get what they want — then invent the shortcut that makes it instant.',
        labels: ['The Barter System: How', 'Problems with Barter: Double', 'The Emergence of Money', 'Functions of Money: Medium,', 'Evolution of Currency: From', 'Money in Daily Life'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_economics_ch11_001', title: 'The Barter System: How People Exchanged Before Money',
          caseStudy: { intro: 'Imagine you have a basket of fresh mangoes but you really want a new cricket bat. Would the shopkeeper take your mangoes as payment?',
            decisions: [{ prompt: 'What is the definition of the barter system?', options: [
                { text: 'The barter system is a way of trading where goods and services are exchanged directly for', outcome: 'The barter system is a way of trading where goods and services are exchanged directly for other.' },
                { text: 'trading with coins', outcome: 'Not quite — Students often think barter means "selling things for a cheaper price." They confuse the *method*.', reveals: 'barter-means-selling-things-for' },
                { text: 'selling things for profit', outcome: 'Not quite — Students often think barter means "selling things for a cheaper price." They confuse the *method*.', reveals: 'barter-means-selling-things-for' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch11_002', title: 'Problems with Barter: Double Coincidence of Wants',
          caseStudy: { intro: 'Imagine you have a basket of fresh mangoes and you really want a cricket bat.',
            decisions: [{ prompt: 'What is the "double coincidence of wants" in a barter system?', options: [
                { text: 'It is when two people each have something the other person wants, allowing them to trade', outcome: 'It is when two people each have something the other person wants, allowing them to trade directly.' },
                { text: 'two people wanting to buy something', outcome: 'Not quite — Students often think that if two people have valuable items, a trade *must* happen.', reveals: 'if-two-people-have-valuable' },
                { text: 'if two people have valuable items, a trade *must* happen', outcome: 'Not quite — Students often think that if two people have valuable items, a trade *must* happen.', reveals: 'if-two-people-have-valuable' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch11_003', title: 'The Emergence of Money: From Shells to Coins',
          caseStudy: { intro: 'Imagine you have a bag of rice but you really want a cricket bat; if the bat owner doesn\'t want rice, you can\'t trade—this is the "barter problem." To solve.',
            decisions: [{ prompt: 'What is one reason cowrie shells were used as money in ancient times?', options: [
                { text: 'They were used because they were durable, portable, and hard to copy (counterfeit)', outcome: 'They were used because they were durable, portable, and hard to copy (counterfeit).' },
                { text: 'government-issued paper', outcome: 'Not quite — Students often think money has always been "government-issued paper." They struggle to realize that.', reveals: 'money-has-always-been-government' },
                { text: 'they were used just', outcome: 'Not quite — Students often think money has always been "government-issued paper." They struggle to realize that.', reveals: 'money-has-always-been-government' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch11_004', title: 'Functions of Money: Medium, Measure, Store, Standard',
          caseStudy: { intro: 'Imagine you have a basket of mangoes, but you really want a geometry box.',
            decisions: [{ prompt: 'What is the function called when money allows us to compare the worth of a shirt and a book?', options: [
                { text: 'This is the "Measure of Value" function', outcome: 'This is the "Measure of Value" function. A wrong answer suggests the student is confusing the act.' },
                { text: 'money has value because of the paper it is printed on', outcome: 'Not quite — Students often think money has value because of the paper it is printed on.', reveals: 'money-has-value-because-of' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch11_005', title: 'Evolution of Currency: From Coins to Paper to Digital',
          caseStudy: { intro: 'Imagine you are at a local market in India. If you wanted to buy a bicycle 500 years ago, you might have had to carry a heavy bag of copper coins that clinked.',
            decisions: [{ prompt: 'In ancient China, why did merchants start using paper receipts instead of carrying coins? [Recall: Must be answered in 1-2 sentences.]', options: [
                { text: 'Merchants used paper receipts', outcome: 'Merchants used paper receipts because coins were very heavy and difficult to transport in large.' },
                { text: 'digital money is "fake" money', outcome: 'Not quite — Students often think digital money is "fake" money because they cannot touch it.', reveals: 'digital-money-is-fake-money' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch11_006', title: 'Money in Daily Life: Earning, Saving, Spending',
          caseStudy: { intro: 'Think about the last time you bought a pencil or a snack; where did that money come from, and why didn\'t you spend all your money at once?',
            decisions: [{ prompt: 'What are the three main ways money flows through our daily lives?', options: [
                { text: 'The three ways are earning, spending, and saving', outcome: 'The three ways are earning, spending, and saving. A wrong answer suggests the student hasn\'t.' },
                { text: 'with just', outcome: 'Not quite — Students often believe that "saving" is only for rich people who have "extra" money.', reveals: 'saving-is-only-for-rich' },
                { text: 'saving', outcome: 'Not quite — Students often believe that "saving" is only for rich people who have "extra" money.', reveals: 'saving-is-only-for-rich' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a village barter fair, a cobbler wants bread, but the farmer who has bread wants cloth, and the weaver who has cloth wants shoes. They circle each other all morning and nobody trades. \'We\'re just unlucky today,\' the cobbler sighs.',
            decisions: [{ prompt: 'Was it bad luck, and how would money fix it?', options: [
                { text: 'It was not luck but the double coincidence of wants — barter needs each partner to want exactly what the other offers, and their three-way mismatch makes that nearly impossible. Money fixes it because everyone accepts it: the cobbler sells shoes for money, then buys bread with it — no need to find a farmer who happens to want shoes.', outcome: 'One universally accepted item splits an impossible matching puzzle into two simple trades — which is why growing villages moved from barter to money.' },
                { text: 'It was just a bad day — barter always works eventually if people keep asking around.', outcome: 'Searching harder does not remove the mismatch — the bigger the village, the worse the coincidence problem; money removes the need for matching altogether.', reveals: 'barter-always-works' },
                { text: 'The fix is to barter bigger items — valuable goods like a bicycle trade easily for anything.', outcome: 'Value does not help if the other person does not want that item — a bicycle cannot buy a phone unless the phone-owner happens to want a bicycle.', reveals: 'valuable-goods-barter-easily' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch11_006', title: 'You made it',
          caseStudy: { intro: 'Three people, three wants, zero trades — until money walks in. Money isn\'t just a thing to buy with; it\'s the agreement that lets everyone stop searching.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_economics_ch11_001', difficulty: 'standard',
          question: 'The barter system is an early method of trade where people exchanged goods.',
          hint: 'Review the definition of "Economic Activities" in your textbook.',
          misconception: 'Students often think barter means "selling things for a cheaper price." They confuse the *method* of payment (goods vs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The barter system is an early method of trade where people exchanged goods or services',
                  options: ['The barter system is an early method of trade where people exchanged goods or services', 'Double coincidence of wants is a situation in a barter system where two people must', 'Commodity money refers to the earliest form of currency where items with their own', 'Money is a universally accepted tool that functions as a medium of exchange, a measure of'],
                  hint: 'Review the definition of "Economic Activities" in your textbook.',
                  misconception: 'Students often think barter means "selling things for a cheaper price." They confuse the *method* of payment (goods vs.' }
          ],
            remediations: { 'barter-means-selling-things-for': { steps: ['Ask the student: "If you want to buy a pen, can you pay with a leaf?" 2.', 'Explain that the leaf has no value to the seller unless they need it for something.', 'Define "Double Coincidence of Wants" by showing two circles overlapping—one for "What I have" and one for "What they.', 'Practice by having the student list three items they have and three things they need, then check if they can trade.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think barter means "selling things for a cheaper price." They confuse the *method* of payment (goods vs.',
          parts: [
                { id: 'a', prompt: 'Is a barter system efficient for a large city today? Why or why not?', answer: 'No, it is highly inefficient',
                  options: ['No, it is highly inefficient', 'selling things for a cheaper price', 'barter means "selling things for a cheaper price'],
                  hint: 'Review the definition of "Economic Activities" in your textbook.',
                  misconception: 'Students often think barter means "selling things for a cheaper price." They confuse the *method* of payment (goods vs.' },
                { id: 'b', prompt: 'Create a scenario where you could successfully trade without money. What items are involved?', answer: 'A good answer involves two people with complementary needs, such as',
                  options: ['A good answer involves two people with complementary needs, such as', 'selling things for a cheaper price', 'barter means "selling things for a cheaper price'],
                  hint: 'Review the definition of "Economic Activities" in your textbook.',
                  misconception: 'Students often think barter means "selling things for a cheaper price." They confuse the *method* of payment (goods vs.' }
          ],
            remediations: { 'barter-means-selling-things-for': { steps: ['Ask the student: "If you want to buy a pen, can you pay with a leaf?" 2.', 'Explain that the leaf has no value to the seller unless they need it for something.', 'Define "Double Coincidence of Wants" by showing two circles overlapping—one for "What I have" and one for "What they.', 'Practice by having the student list three items they have and three things they need, then check if they can trade.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch11_002', difficulty: 'standard',
          question: 'Double coincidence of wants is a situation in a barter system where two people.',
          hint: 'Review the "Interdependence Among Sectors" section to see how different producers depend.',
          misconception: 'Students often think that if two people have valuable items, a trade *must* happen.',
          parts: [
                { id: 'a', prompt: 'If a farmer has rice and wants a pot, but the potter only wants cloth, why does the barter fail?', answer: 'The barter fails',
                  options: ['The barter fails', 'if two people have valuable items, a trade *must* happen'],
                  hint: 'Review the "Interdependence Among Sectors" section to see how different producers depend on each.',
                  misconception: 'Students often think that if two people have valuable items, a trade *must* happen.' },
                { id: 'b', prompt: 'You have a bag of wheat and need a haircut. The barber needs wheat but doesn\'t have time to cut your hair today. Can you barter? Why or why not?', answer: 'No, you cannot barter',
                  options: ['No, you cannot barter', 'coincidence', 'if two people have valuable items, a trade *must* happen'],
                  hint: 'Review the "Interdependence Among Sectors" section to see how different producers depend on each.',
                  misconception: 'Students often think that if two people have valuable items, a trade *must* happen.' }
          ],
            remediations: { 'if-two-people-have-valuable': { steps: ['Ask the student: "Does the farmer need gold right now to feed his family?" Then, guide them to list two columns: "What.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch11_003', difficulty: 'standard',
          question: 'Commodity money refers to the earliest form of currency where items with their.',
          hint: 'Review the limitations of the barter system—specifically the difficulty of finding.',
          misconception: 'Students often think money has always been "government-issued paper." They struggle to realize that anything can.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Commodity money refers to the earliest form of currency where items with their own',
                  options: ['Commodity money refers to the earliest form of currency where items with their own', 'The barter system is an early method of trade where people exchanged goods or services', 'Double coincidence of wants is a situation in a barter system where two people must', 'Money is a universally accepted tool that functions as a medium of exchange, a measure of'],
                  hint: 'Review the limitations of the barter system—specifically the difficulty of finding a trade partner.',
                  misconception: 'Students often think money has always been "government-issued paper." They struggle to realize that anything can be money if a community.' }
          ],
            remediations: { 'money-has-always-been-government': { steps: ['First, ask the student to imagine a school where students trade stickers for snacks.', 'Ask: "If everyone agrees a gold sticker is worth three snacks, is that sticker money?" Once they agree, explain that.', 'Reinforce that money is just a tool for trust, not just something from a bank.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch11_004', difficulty: 'standard',
          question: 'Money is a universally accepted tool that functions as a medium of exchange,.',
          hint: 'Review the limitations of the Barter System (Chapter 11 early sections).',
          misconception: 'Students often think money has value because of the paper it is printed on.',
          parts: [
                { id: 'a', prompt: 'What is the function called when money allows us to compare the worth of a shirt and a book?', answer: 'This is the "Measure of Value" function',
                  options: ['This is the "Measure of Value" function', 'money has value because of the paper it is printed on'],
                  hint: 'Review the limitations of the Barter System (Chapter 11 early sections).',
                  misconception: 'Students often think money has value because of the paper it is printed on.' },
                { id: 'b', prompt: 'Why does a shopkeeper accept money for groceries instead of asking for the specific item you produce at your job?', answer: 'Because money is a "Medium of Exchange" that is universally accepted',
                  options: ['Because money is a "Medium of Exchange" that is universally accepted', 'money has value because of the paper it is printed on'],
                  hint: 'Review the limitations of the Barter System (Chapter 11 early sections).',
                  misconception: 'Students often think money has value because of the paper it is printed on.' },
                { id: 'c', prompt: 'If you keep 500 rupees in a savings box to buy a cricket bat next month, which function of money are you using?', answer: 'This is the "Store of Value" function',
                  options: ['This is the "Store of Value" function', 'money has value because of the paper it is printed on'],
                  hint: 'Review the limitations of the Barter System (Chapter 11 early sections).',
                  misconception: 'Students often think money has value because of the paper it is printed on.' },
                { id: 'd', prompt: 'How does money solve the problem of a farmer who wants to sell wheat to buy a tractor, but the tractor seller doesn\'t want wheat?', answer: 'Money acts as a medium of exchange',
                  options: ['Money acts as a medium of exchange', 'money has value because of the paper it is printed on'],
                  hint: 'Review the limitations of the Barter System (Chapter 11 early sections).',
                  misconception: 'Students often think money has value because of the paper it is printed on.' }
          ],
            remediations: { 'money-has-value-because-of': { steps: ['Explain to the student that if money were just paper, we could use any scrap of paper.', 'Tell them: "If you take a 100-rupee note to a shop, the shopkeeper gives you goods, but if you draw a picture of a tree.', 'The difference is the government\'s guarantee, which makes it a \'Medium of Exchange\' that everyone trusts."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch11_005', difficulty: 'standard',
          question: 'The evolution of currency refers to the historical shift in how societies pay.',
          hint: 'Review the definition of "Medium of Exchange" in c6_economics_ch11_004.',
          misconception: 'Students often think digital money is "fake" money because they cannot touch it.',
          parts: [
                { id: 'a', prompt: 'In ancient China, why did merchants start using paper receipts instead of carrying coins? [Recall: Must be answered in 1-2 sentences.]', answer: 'Merchants used paper receipts',
                  options: ['Merchants used paper receipts', 'digital money is "fake" money'],
                  hint: 'Review the definition of "Medium of Exchange" in c6_economics_ch11_004.',
                  misconception: 'Students often think digital money is "fake" money because they cannot touch it.' },
                { id: 'b', prompt: 'Explain why paper money is considered an "innovation" compared to metal coins. [Understand: Must expose the misconception that value comes from the material.]', answer: 'Paper money is an innovation',
                  options: ['Paper money is an innovation', 'valuable', 'digital money is "fake" money'],
                  hint: 'Review the definition of "Medium of Exchange" in c6_economics_ch11_004.',
                  misconception: 'Students often think digital money is "fake" money because they cannot touch it.' },
                { id: 'c', prompt: 'If you have 500 rupees in a digital bank account, where is that "money" physically located?', answer: 'The money is not physically in your pocket',
                  options: ['The money is not physically in your pocket', 'the mobile phone itself contains the physical cash', 'digital money is "fake" money'],
                  hint: 'Review the definition of "Medium of Exchange" in c6_economics_ch11_004.',
                  misconception: 'Students often think digital money is "fake" money because they cannot touch it.' }
          ],
            remediations: { 'digital-money-is-fake-money': { steps: ['Ask the student: "If you pay via a digital app, does the shopkeeper get the money?" 2.', 'Explain that the bank\'s computer acts like a giant, secure notebook that keeps track of everyone\'s balance.', 'Use the example of a school cricket scorebook—the score is real even if the players aren\'t holding the numbers in their.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch11_006', difficulty: 'standard',
          question: 'Money in daily life refers to the cycle of earning (gaining income through.',
          hint: 'Review the "Economic Activities" chapter to see how people work to earn.',
          misconception: 'Students often believe that "saving" is only for rich people who have "extra" money.',
          parts: [
                { id: 'a', prompt: 'What are the three main ways money flows through our daily lives?', answer: 'The three ways are earning, spending, and saving',
                  options: ['The three ways are earning, spending, and saving', 'with just', 'saving', '"saving" is only for rich people who have "extra" money'],
                  hint: 'Review the "Economic Activities" chapter to see how people work to earn.',
                  misconception: 'Students often believe that "saving" is only for rich people who have "extra" money.' },
                { id: 'b', prompt: 'A shopkeeper earns profit from sales, while a teacher earns a monthly salary. How are these two types of earnings similar?', answer: 'Both are forms of "earning" resulting from economic activity',
                  options: ['Both are forms of "earning" resulting from economic activity', 'earning', 'saving', 'only one type of work counts as "earning" money'],
                  hint: 'Review the "Economic Activities" chapter to see how people work to earn.',
                  misconception: 'Students often believe that "saving" is only for rich people who have "extra" money.' }
          ],
            remediations: { 'saving-is-only-for-rich': { steps: ['Ask the student to list three small "wants" they bought last week.', 'Ask how much that cost in total.', 'Explain that even setting aside 1 rupee out of that total is a form of saving.', 'Emphasize that saving is about the "habit" of keeping a part, not the size of the amount.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
