import type { SimDef } from '../../engine/types';

/** v3 generated — c7_eco_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_eco_ch01_p2: SimDef = {
    id: 'v3_c7_eco_ch01_p2',
    title: 'From Barter to Money · Part 2/2',
    subtitle: 'Covers the mechanics and functions of cheques, bank deposits, and digital money (UPI.',
    classLevel: 7, subject: 'economics', topic: 'From Barter to Money · Part 2/2',
    chapters: ['c7_eco_ch01'],
    nodeIds: ['c7_eco_ch01_007', 'c7_eco_ch01_008', 'c7_eco_ch01_009', 'c7_eco_ch01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Aarav watches his mother pay for groceries at the local supermarket by scanning a QR code with her.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'You stand in a village haat holding a basket of wheat, desperate for sandals — and money does not exist. Before you can walk home in new shoes, what lucky match must happen?',
        options: ['You must find a cobbler who both has spare sandals and wants your wheat — a double match of wants, negotiated on the spot', 'You just hand over wheat and take any sandals you like', 'You wait for the market to print sandal-money', 'You trade your wheat for a fixed official price in sandals'],
        answer: 'You must find a cobbler who both has spare sandals and wants your wheat — a double match of wants, negotiated on the spot',
        hook: 'Barter has no price tags — one trader may give five mangoes for a kilo of rice while another demands eight. Every rate is negotiated fresh, and if nobody wants your pots, a potter cannot eat at all.',
    },
    teaching: [
        { title: 'Modern Forms of Money: Cheques, Bank Deposits, Digital Money', text: 'Modern forms of money include bank deposits, cheques, and digital money, which do not have physical form as coins or paper notes but serve as universally accepted mediums of exchange backed by the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_eco_ch01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Survive a day in a barter village — as a weaver, find who needs cloth and has what you need, then negotiate a fair swap measured in kilograms per metre.',
        labels: ['Modern Forms of Money', 'Functions of Money: Medium', 'Electronic and Digital Transactions', 'Money as a Link'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_eco_ch01_007', title: 'Modern Forms of Money: Cheques, Bank Deposits, Digital Money',
          scaffold: { problem: 'Priya has a bank deposit of ₹25,000 in her savings account. She pays her school tuition fee of ₹9,000 by writing a cheque.',
            steps: [
            { text: 'Identify initial bank deposit balance = ₹25,000.' },
            { text: 'Account for the cheque payment for tuition, which decreases her bank deposit by ₹9,000 (₹25,000 - ₹9,000 = ₹16,000).' },
            { text: 'Account for the incoming digital transfer from her uncle, which increases her bank deposit by ₹4,500 (₹16,000 + ₹4,500.' },
            { text: 'Verify all transactions are properly recorded against bank deposits without using physical cash.' },
            { text: 'Conclude that Priya\'s final bank account balance is ₹20,500.', faded: true, blankAnswer: '₹20,500' }
            ] } },
        { type: 'case', nodeId: 'c7_eco_ch01_008', title: 'Functions of Money: Medium of Exchange, Store of Value',
          caseStudy: { intro: 'Imagine walking into a bustling Saturday vegetable market in Jaipur with a 100-rupee note in your pocket, handing it to a vendor for tomatoes, and later.',
            decisions: [{ prompt: 'What is the primary economic function of money when a customer hands a currency note to a shopkeeper to buy a notebook?', options: [
                { text: 'Money is acting as a medium of exchange', outcome: 'Money is acting as a medium of exchange. A student who answers "store of value" confuses the act.' },
                { text: 'store of value', outcome: 'Not quite — Students often think that any money sitting idle in a wallet or piggy bank is actively functioning.', reveals: 'any-money-sitting-idle-in' },
                { text: 'medium of exchange', outcome: 'Not quite — Students often think that any money sitting idle in a wallet or piggy bank is actively functioning.', reveals: 'any-money-sitting-idle-in' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch01_009', title: 'Electronic and Digital Transactions: Modern Banking',
          scaffold: { problem: 'Priya has a savings account balance of ₹10,000. She makes three digital transactions in a week: she pays ₹1,200 for books using UPI.',
            steps: [
            { text: 'Identify the initial bank balance, which is ₹10,000.' },
            { text: 'Identify all outgoing digital transactions (payments for books and tuition): ₹1,200 + ₹3,000 = ₹4,200.' },
            { text: 'Identify incoming digital transactions (gift received): ₹1,000.' },
            { text: 'Calculate the net change in the account: Incoming (₹1,000) - Outgoing (₹4,200) = -₹3,200.' },
            { text: 'Add the net change to the initial balance: ₹10,000 - ₹3,200 = ₹6,800.', faded: true, blankAnswer: '₹6,800' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch01_010', title: 'Money as a Link Between Present and Future',
          scaffold: { problem: 'Priya earns a monthly salary of ₹20,000. She wants to buy a laptop worth ₹30,000 after 5 months.',
            steps: [
            { text: 'Identify the target cost of the laptop (₹30,000) and Priya\'s monthly savings amount (₹6,000).' },
            { text: 'Determine the time period for saving, which is 5 months.' },
            { text: 'Calculate the total accumulated savings by multiplying monthly savings by the number of months: ₹6,000 × 5 = ₹30,000.' },
            { text: 'Compare the total accumulated savings (₹30,000) with the target cost (₹30,000).' },
            { text: 'Conclude that money successfully acts as a bridge, allowing Priya to achieve her future goal through present sacrifice.', faded: true, blankAnswer: 'Yes, she will have exactly ₹30,000, which is enough to buy.' }
            ] } },
        { type: 'case', nodeId: 'c7_eco_ch01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a barter market, two merchants argue over a bronze idol. One insists it\'s worth 5 bags of grain; the other says 3, because grain is scarce this season. With no money, there\'s no price tag to settle it.',
            decisions: [{ prompt: 'Why can\'t the argument be resolved — and what does that reveal about barter?', options: [
                { text: 'Because barter has no common measure of value — the idol\'s \'worth\' exists only as a negotiated ratio against whatever it is traded for, and that ratio shifts with scarcity: in a lean season, grain commands more. Money fixes exactly this by giving every good a single common measure — a price — instead of a different bargain for each pair of goods.', outcome: 'Both merchants are partly right — value in barter is situational, and the disagreement itself is the flaw that money was invented to remove.' },
                { text: 'The first merchant is right — valuable items keep a fixed worth, so 5 bags is the idol\'s true price.', outcome: 'Barter has no \'true price\' — value is set per trade, and a scarce harvest legitimately makes grain dearer against everything.', reveals: 'value-is-fixed' },
                { text: 'The dispute is just about honesty — one of them is lying, and a truthful trader would end it.', outcome: 'Both may be honest — without a shared measure, two reasonable people can hold different valuations, which is the structural problem, not dishonesty.', reveals: 'disputes-mean-dishonesty' }
            ] }] } },
        { type: 'case', nodeId: 'c7_eco_ch01_010', title: 'You made it',
          caseStudy: { intro: 'Money was invented because matching wants is exhausting. Barter works only when two needs collide at the same moment.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_eco_ch01_007', difficulty: 'standard',
          question: 'Modern forms of money include bank deposits, cheques, and digital money, which.',
          hint: 'Review Class 6 banking services and paper money advantages before tackling digital.',
          misconception: 'Students often believe that digital money and cheques create *new* wealth out of thin air, thinking that an online.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Modern forms of money include bank deposits, cheques, and digital money',
                  options: ['Modern forms of money include bank deposits, cheques, and digital money', 'The barter system is an economic method of exchange where goods and services are traded', 'The double coincidence of wants is a situation where two parties must each desire what', 'The emergence of money represents the historical evolution from a cumbersome barter'],
                  hint: 'Review Class 6 banking services and paper money advantages before tackling digital account balances.',
                  misconception: 'Students often believe that digital money and cheques create *new* wealth out of thin air, thinking that an online transfer or cheque.' }
          ],
            remediations: { 'digital-money-and-cheques-create': { steps: ['To fix this, trace a single ₹5,000 note deposited by a parent into a bank account, and then watch it move when that.', 'Show that the parent\'s account drops by ₹2,000 and the plumber\'s account rises by ₹2,000, proving that the total amount.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch01_008', difficulty: 'standard',
          question: 'Money serves primarily as a medium of exchange to facilitate transactions.',
          hint: 'Review c6_economics_ch11_004 to refresh the basic definitions of money\'s four main.',
          misconception: 'Students often think that any money sitting idle in a wallet or piggy bank is actively functioning as a "medium.',
          parts: [
                { id: 'a', prompt: 'What is the primary economic function of money when a customer hands a currency note to a shopkeeper to buy a notebook?', answer: 'Money is acting as a medium of exchange',
                  options: ['Money is acting as a medium of exchange', 'store of value', 'medium of exchange'],
                  hint: 'Review c6_economics_ch11_004 to refresh the basic definitions of money\'s four main functions before.',
                  misconception: 'Students often think that any money sitting idle in a wallet or piggy bank is actively functioning as a "medium of exchange" simply because.' },
                { id: 'b', prompt: 'Why does holding cash under a mattress sometimes fail to perform the "store of value" function effectively over many years?', answer: 'Inflation causes the general price level of goods and services to rise',
                  options: ['Inflation causes the general price level of goods and services to rise', 'medium of exchange'],
                  hint: 'Review c6_economics_ch11_004 to refresh the basic definitions of money\'s four main functions before.',
                  misconception: 'Students often think that any money sitting idle in a wallet or piggy bank is actively functioning as a "medium of exchange" simply because.' },
                { id: 'c', prompt: 'Aarav earns 500 rupees from a part-time craft project. He spends 300 rupees on art supplies today and deposits 200 rupees into a bank account for a school trip.', answer: 'Identify total earnings: 500 rupees',
                  options: ['Identify total earnings: 500 rupees', 'medium of exchange'],
                  hint: 'Review c6_economics_ch11_004 to refresh the basic definitions of money\'s four main functions before.',
                  misconception: 'Students often think that any money sitting idle in a wallet or piggy bank is actively functioning as a "medium of exchange" simply because.' },
                { id: 'd', prompt: 'Analyze the difference in economic function between using a digital wallet to pay an electricity bill instantly versus keeping money in a fixed deposit account.', answer: 'Paying an electricity bill instantly uses money as a medium of exchange',
                  options: ['Paying an electricity bill instantly uses money as a medium of exchange', 'medium of exchange'],
                  hint: 'Review c6_economics_ch11_004 to refresh the basic definitions of money\'s four main functions before.',
                  misconception: 'Students often think that any money sitting idle in a wallet or piggy bank is actively functioning as a "medium of exchange" simply because.' }
          ],
            remediations: { 'any-money-sitting-idle-in': { steps: ['To fix this error, take a 50-rupee note and place it inside a notebook.', 'Ask: "Is this note buying anything right now?" Explain that while it is potential medium of exchange, right now it.', 'Then, use the note to buy a pen from a classmate, explaining that the exact moment of transfer transforms its active.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any money sitting idle in a wallet or piggy bank is actively functioning as a "medium.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Barter systems provide a better store of value than modern paper currency because bags of wheat do not lose value." Is this.', answer: 'This statement is economically inaccurate',
                  options: ['This statement is economically inaccurate', 'medium of exchange'],
                  hint: 'Review c6_economics_ch11_004 to refresh the basic definitions of money\'s four main functions before.',
                  misconception: 'Students often think that any money sitting idle in a wallet or piggy bank is actively functioning as a "medium of exchange" simply because.' }
          ],
            remediations: { 'any-money-sitting-idle-in': { steps: ['To fix this error, take a 50-rupee note and place it inside a notebook.', 'Ask: "Is this note buying anything right now?" Explain that while it is potential medium of exchange, right now it.', 'Then, use the note to buy a pen from a classmate, explaining that the exact moment of transfer transforms its active.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch01_009', difficulty: 'standard',
          question: 'Electronic and digital transactions refer to the transfer of funds and.',
          hint: 'Review Class 6 banking services and modern forms of money (c7_eco_ch01_007) to reinforce.',
          misconception: 'Students often believe that when they make an online payment via UPI, physical money is instantly packed into.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Electronic and digital transactions refer to the transfer of funds and financial',
                  options: ['Electronic and digital transactions refer to the transfer of funds and financial', 'The barter system is an economic method of exchange where goods and services are traded', 'The double coincidence of wants is a situation where two parties must each desire what', 'The emergence of money represents the historical evolution from a cumbersome barter'],
                  hint: 'Review Class 6 banking services and modern forms of money (c7_eco_ch01_007) to reinforce how bank.',
                  misconception: 'Students often believe that when they make an online payment via UPI, physical money is instantly packed into an invisible digital box and.' }
          ],
            remediations: { 'when-they-make-an-online': { steps: ['To fix this misconception, use a ledger analogy: draw two notebooks representing two bank accounts.', 'Explain that when you pay digitally, you are simply asking the bank accountant to erase ₹500 from your ledger line and.', 'Show that the internet is only the communication network carrying the message, not a conveyor belt carrying physical.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch01_010', difficulty: 'standard',
          question: 'Money serves as a vital economic link between the present and the future.',
          hint: 'Review the store of value function in c7_eco_ch01_008 before attempting inter-temporal.',
          misconception: 'Students often believe that the numerical amount of money saved today will always buy the exact same quantity of goods.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Money serves as a vital economic link between the present and the future by acting as a',
                  options: ['Money serves as a vital economic link between the present and the future by acting as a', 'The barter system is an economic method of exchange where goods and services are traded', 'The double coincidence of wants is a situation where two parties must each desire what', 'The emergence of money represents the historical evolution from a cumbersome barter'],
                  hint: 'Review the store of value function in c7_eco_ch01_008 before attempting inter-temporal financial.',
                  misconception: 'Students often believe that the numerical amount of money saved today will always buy the exact same quantity of goods in the future.' }
          ],
            remediations: { 'the-numerical-amount-of-money': { steps: ['To fix this misconception, guide the student through a price comparison exercise using real Indian market data.', 'Show that if a packet of milk costs ₹50 today and inflation is 5%, that same packet will cost ₹52.50 next year.', 'Conclude by demonstrating that money links present and future only nominally, and savers must account for changing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
