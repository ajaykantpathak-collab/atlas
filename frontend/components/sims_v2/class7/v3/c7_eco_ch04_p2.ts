import type { SimDef } from '../../engine/types';

/** v3 generated — c7_eco_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_eco_ch04_p2: SimDef = {
    id: 'v3_c7_eco_ch04_p2',
    title: 'Banks and the Magic of Finance · Part 2/2',
    subtitle: 'Covers the basic concept of interest, calculation of simple interest, and its dual role.',
    classLevel: 7, subject: 'economics', topic: 'Banks and the Magic of Finance · Part 2/2',
    chapters: ['c7_eco_ch04'],
    nodeIds: ['c7_eco_ch04_007', 'c7_eco_ch04_008', 'c7_eco_ch04_009', 'c7_eco_ch04_010', 'c7_eco_ch04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Aarav wants to buy a bicycle costing ₹5,000 for his delivery job, but he only has ₹3,000 in his savings.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A town of 5,000 people has no bank, no payment app, no credit — savings sleep in mattresses and every deal needs a sack of cash. What invisible machinery has stopped working?',
        options: ['The financial infrastructure — without banks and payment networks, savings cannot be pooled, businesses cannot borrow, and money cannot move safely', 'The physical infrastructure — the roads must have vanished too', 'Nothing — mattresses are safer than banks anyway', 'The market — trade is impossible without rupees printed locally'],
        answer: 'The financial infrastructure — without banks and payment networks, savings cannot be pooled, businesses cannot borrow, and money cannot move safely',
        hook: 'Banks and payment systems are the plumbing of an economy — as essential as roads are to trucks. A digital scan at a vegetable stall rides on a vast hidden network of institutions and rules, not magic.',
    },
    teaching: [
        { title: 'Interest: The Cost of Borrowing and Reward for Saving', text: 'Interest is the price paid for borrowing money (the cost of borrowing) and the payment earned for depositing or lending money (the reward for saving), usually expressed as a percentage of the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_eco_ch04_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Design a financial rescue kit for a remote hill village — pick the three pieces of money-moving machinery it needs first and explain the job of each.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c7_eco_ch04_007', title: 'Interest: The Cost of Borrowing and Reward for Saving',
          caseStudy: { intro: 'Aarav wants to buy a bicycle costing ₹5,000 for his delivery job, but he only has ₹3,000 in his savings account.',
            decisions: [{ prompt: 'What is the primary economic term for the reward a bank gives to a depositor for keeping their money in a savings account?', options: [
                { text: 'The correct term is interest', outcome: 'The correct term is interest. A wrong answer like "loan" or "principal" shows a failure.' },
                { text: 'principal', outcome: 'Not quite — Students often think that interest is a fixed fee charged once by a bank for the service.', reveals: 'interest-is-a-fixed-fee' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch04_009', title: 'Stock Markets: Investment and Capital Formation',
          scaffold: { problem: 'A solar panel manufacturing startup in Karnataka wishes to raise ₹20,00,000 to construct a new testing laboratory.',
            steps: [
            { text: 'Identify total capital required (₹20,00,000) and total number of shares to be issued (4,000 shares).' },
            { text: 'Determine initial price per share by dividing total capital by total shares: ₹20,00,000 ÷ 4,000.' },
            { text: 'Perform calculation: ₹20,00,000 ÷ 4,000 = ₹500 per share.' },
            { text: 'Calculate investor\'s total cost by multiplying number of shares bought (50) by price per share (₹500): 50 × ₹500.' },
            { text: 'Conclude that initial share price is ₹500 and the investor\'s total investment is ₹25,000.', faded: true, blankAnswer: 'Initial share price is ₹500; Investor\'s total investment.' }
            ] } },
        { type: 'case', nodeId: 'c7_eco_ch04_011', title: 'RBI: Central Bank and Its Role in the Economy',
          caseStudy: { intro: 'Imagine you visit your local bank branch in Delhi to open a savings account or take a loan for your father\'s shop—that is a commercial bank.',
            decisions: [{ prompt: 'What is the primary institution responsible for issuing paper currency notes in India?', options: [
                { text: 'The Reserve Bank of India (RBI)', outcome: 'The Reserve Bank of India (RBI). A student who answers "commercial banks" or "the State Bank.' },
                { text: 'commercial banks', outcome: 'Not quite — Students often believe that the Reserve Bank of India (RBI) is just another large commercial bank.', reveals: 'the-reserve-bank-of-india' },
                { text: 'the State Bank of India', outcome: 'Not quite — Students often believe that the Reserve Bank of India (RBI) is just another large commercial bank.', reveals: 'the-reserve-bank-of-india' }
            ] }] } },
        { type: 'case', nodeId: 'c7_eco_ch04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A mountain district has fertile land, hardworking farmers and eager shopkeepers — but no bank branch for miles. Savings sit in cash at home, a trader who wants to expand can\'t borrow, and a visitor wonders why such an industrious place stays poor.',
            decisions: [{ prompt: 'What is the missing ingredient?', options: [
                { text: 'Financial infrastructure — cash under a mattress earns nothing and funds nothing, while the same rupees in a bank would earn interest and become loans for the trader\'s expansion. Without banks, credit and payment networks, hard work cannot convert into investment — effort is trapped in place, which is exactly how a lack of banks keeps a capable region poor.', outcome: 'The chapter\'s core: saving and borrowing need institutions to connect them — no bank means no bridge from spare money to working capital.' },
                { text: 'Nothing is missing — hardworking people with resources always prosper eventually, banks or not.', outcome: 'Effort alone cannot scale — expansion needs borrowed capital, and idle cash savings never become anyone\'s loan without a bank between saver and borrower.', reveals: 'hard-work-beats-credit' },
                { text: 'The district needs charity, not banks — donations from outside would fix the poverty faster.', outcome: 'Charity flows once; a bank keeps recycling local savings into local loans every year — the district needs the mechanism, not a one-time gift.', reveals: 'charity-beats-banking' }
            ] }] } },
        { type: 'case', nodeId: 'c7_eco_ch04_011', title: 'You made it',
          caseStudy: { intro: 'Roads carry the goods; banks and payment networks carry the money. Break either one and trade limps to a halt.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_eco_ch04_007', difficulty: 'standard',
          question: 'Interest is the price paid for borrowing money (the cost of borrowing) and the.',
          hint: 'Review c7_eco_ch04_006 to understand how loans and credit function before looking at the.',
          misconception: 'Students often think that interest is a fixed fee charged once by a bank for the service of handling cash, rather than.',
          parts: [
                { id: 'a', prompt: 'What is the primary economic term for the reward a bank gives to a depositor for keeping their money in a savings account?', answer: 'The correct term is interest',
                  options: ['The correct term is interest', 'principal'],
                  hint: 'Review c7_eco_ch04_006 to understand how loans and credit function before looking at the cost.',
                  misconception: 'Students often think that interest is a fixed fee charged once by a bank for the service of handling cash, rather than a percentage fee.' },
                { id: 'b', prompt: 'How does a rise in the interest rate offered by banks generally affect the behavior of households regarding saving versus spending?', answer: 'A higher interest rate increases the reward for saving',
                  options: ['A higher interest rate increases the reward for saving', 'people will spend more'],
                  hint: 'Review c7_eco_ch04_006 to understand how loans and credit function before looking at the cost.',
                  misconception: 'Students often think that interest is a fixed fee charged once by a bank for the service of handling cash, rather than a percentage fee.' }
          ],
            remediations: { 'interest-is-a-fixed-fee': { steps: ['To fix this, break down the calculation using a timeline: draw a line representing Year 1 and Year 2.', 'Show that every single year the borrower keeps the bank\'s money, an additional percentage of the original principal.', 'Emphasize the word "per annum" (per year) to show that interest is tied directly to the duration of time.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch04_008', difficulty: 'standard',
          question: 'Payment systems refer to the methods and networks—such as cheques, Unified.',
          hint: 'Review bank account operations and how savings accounts store money digitally before.',
          misconception: 'Students often believe that when they make a payment using a UPI app on their phone, the physical money is stored.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Payment systems refer to the methods and networks—such as cheques, Unified Payments',
                  options: ['Payment systems refer to the methods and networks—such as cheques, Unified Payments', 'Financial infrastructure refers to the foundational network of institutions, markets,', 'A bank is a financial institution licensed to accept deposits from the public and create', 'The two primary functions of commercial banks are accepting deposits from savers (paying'],
                  hint: 'Review bank account operations and how savings accounts store money digitally before learning.',
                  misconception: 'Students often believe that when they make a payment using a UPI app on their phone, the physical money is stored inside the mobile.' }
          ],
            remediations: { 'when-they-make-a-payment': { steps: ['To fix this misconception, ask the student to check their bank statement after making a UPI payment to a friend.', 'Show them that the app balance did not decrease because money was "inside" the app, but rather because the app sent.', 'Explain that apps like Google Pay, PhonePe, or Paytm are merely windows looking into the bank, not the bank vault.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch04_009', difficulty: 'standard',
          question: 'The stock market is a regulated financial marketplace where buyers and sellers.',
          hint: 'Review c7_eco_ch04_003 to reinforce how financial systems move funds from savers.',
          misconception: 'Students often believe that buying and selling shares on the stock market creates new money out of thin air, or that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The stock market is a regulated financial marketplace where buyers and sellers trade',
                  options: ['The stock market is a regulated financial marketplace where buyers and sellers trade', 'Financial infrastructure refers to the foundational network of institutions, markets,', 'A bank is a financial institution licensed to accept deposits from the public and create', 'The two primary functions of commercial banks are accepting deposits from savers (paying'],
                  hint: 'Review c7_eco_ch04_003 to reinforce how financial systems move funds from savers to borrowers.',
                  misconception: 'Students often believe that buying and selling shares on the stock market creates new money out of thin air, or that when a share price.' }
          ],
            remediations: { 'buying-and-selling-shares-on': { steps: ['To fix this misconception, trace a rupee through a share lifecycle using a concrete example: When a farmer\'s.', 'Later, if investor A sells that share to investor B for ₹150 because the tractors made the farm very productive, the.', 'Emphasize that the stock market is a secondary market for transferring ownership, while the primary capital formation.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch04_010', difficulty: 'standard',
          question: 'Financial infrastructure comprises the institutional and systemic.',
          hint: 'Review c7_eco_ch04_003 and c7_eco_ch04_009 to remember how individual savings transform.',
          misconception: 'Students often believe that money in a bank account sits idle in a vault with their name on it, rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Financial infrastructure comprises the institutional and systemic framework—including',
                  options: ['Financial infrastructure comprises the institutional and systemic framework—including', 'Financial infrastructure refers to the foundational network of institutions, markets,', 'A bank is a financial institution licensed to accept deposits from the public and create', 'The two primary functions of commercial banks are accepting deposits from savers (paying'],
                  hint: 'Review c7_eco_ch04_003 and c7_eco_ch04_009 to remember how individual savings transform into.',
                  misconception: 'Students often believe that money in a bank account sits idle in a vault with their name on it, rather than understanding that banks.' }
          ],
            remediations: { 'money-in-a-bank-account': { steps: ['To fix this, use a pooled-water analogy: explain that a bank is like a large reservoir fed by thousands of small.', 'The water in the reservoir is constantly let out through controlled channels (loans) to irrigate fields (businesses and.', 'Trace step-by-step how Rs.', '500 saved by 10 different students combines into a Rs.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch04_011', difficulty: 'standard',
          question: 'The Reserve Bank of India (RBI) is the nation\'s central bank, responsible for.',
          hint: 'Review node c6_economics_ch08_006 to understand how commercial banks interact with.',
          misconception: 'Students often believe that the Reserve Bank of India (RBI) is just another large commercial bank where normal citizens.',
          parts: [
                { id: 'a', prompt: 'What is the primary institution responsible for issuing paper currency notes in India?', answer: 'The Reserve Bank of India (RBI)',
                  options: ['The Reserve Bank of India (RBI)', 'commercial banks', 'the State Bank of India'],
                  hint: 'Review node c6_economics_ch08_006 to understand how commercial banks interact with ordinary people.',
                  misconception: 'Students often believe that the Reserve Bank of India (RBI) is just another large commercial bank where normal citizens can open savings.' }
          ],
            remediations: { 'the-reserve-bank-of-india': { steps: ['To correct this, draw a two-tier pyramid diagram on the board.', 'At the bottom tier, write "Commercial Banks (SBI, HDFC, PNB, etc.)" and list what they do: take public deposits, give.', 'At the top apex tier, write "Reserve Bank of India (RBI)" and explain that it has only two main customers: the.', 'Emphasize that the RBI regulates the banks at the bottom, just like traffic police regulate drivers on the road.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
