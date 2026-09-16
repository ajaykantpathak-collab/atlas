import type { SimDef } from '../../engine/types';

/** v3 generated — c6_economics_ch08 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_economics_ch08: SimDef = {
    id: 'v3_c6_economics_ch08',
    title: 'Banks and the Magic of Finance',
    subtitle: 'How does a \'community piggy bank\' build bakeries?',
    classLevel: 6, subject: 'economics', topic: 'Banks and the Magic of Finance',
    chapters: ['c6_economics_ch08'],
    nodeIds: ['c6_economics_ch08_001', 'c6_economics_ch08_002', 'c6_economics_ch08_003', 'c6_economics_ch08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'village bank manager deciding who gets the next loan', intro: 'Farmers deposit their surplus; a baker needs a loan; a student wants her first account. Every rupee you take in can walk back out as someone\'s new beginning.', goal: 'See the bank as a bridge between savers and borrowers — not just a safe.' },
    discovery: {
        question: 'A whole village hides savings under mattresses — \'the safest place there is!\' Meanwhile a young woman can\'t find a loan to open her bakery. What connects the two problems?',
        options: ['Mattress money sleeps — inside a bank it would become loans for people like her', 'Nothing — mattresses and loans are completely unrelated', 'She should hunt for money under the mattresses too', 'The village simply needs more mattresses, not banks'],
        answer: 'Mattress money sleeps — inside a bank it would become loans for people like her',
        hook: 'A bank isn\'t a vault that sits on cash — it\'s a bridge. Your deposit doesn\'t nap in a locker; it travels out as someone\'s bakery, then comes home with interest.',
    },
    teaching: [
        { title: 'What is a Bank? A Safe Place for Money', text: 'A bank is a financial institution that acts as a safe storage place for money, accepting deposits from people who have extra cash and lending that money to people who need it for productive purposes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_economics_ch08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the village bank for a year — accept deposits, choose who deserves the loans, and turn sleepy savings into new shops, farms and dreams.',
        labels: ['What is a Bank?', 'Saving and Borrowing: Two', 'Understanding Interest: The Cost', 'Types of Bank Accounts', 'Banking Services: Cheques, ATMs,', 'Banks and the Economy'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_economics_ch08_001', title: 'What is a Bank? A Safe Place for Money',
          caseStudy: { intro: 'Think about a time you saved money in a piggy bank—where did you keep it?',
            decisions: [{ prompt: 'What are the two main functions of a bank? (Recall)', options: [
                { text: 'The two main functions are accepting deposits from people with extra money and lending', outcome: 'The two main functions are accepting deposits from people with extra money and lending money.' },
                { text: 'lending', outcome: 'Not quite — Students often think a bank is just a "vault" or a big safe that holds cash.', reveals: 'a-bank-is-just-a' },
                { text: 'circulating', outcome: 'Not quite — Students often think a bank is just a "vault" or a big safe that holds cash.', reveals: 'a-bank-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch08_002', title: 'Saving and Borrowing: Two Sides of Banking',
          caseStudy: { intro: 'Imagine you have a piggy bank that is full, but your friend needs money to buy a school uniform.',
            decisions: [{ prompt: 'Who are the two main groups of people that interact with a bank?', options: [
                { text: 'The two groups are savers and borrowers', outcome: 'The two groups are savers and borrowers. A wrong answer suggests the student hasn\'t grasped the.' },
                { text: 'two-sided', outcome: 'Not quite — Students often think banks generate money out of thin air to give to borrowers.', reveals: 'banks-generate-money-out-of' },
                { text: 'banks generate money out of thin air to give to borrowers', outcome: 'Not quite — Students often think banks generate money out of thin air to give to borrowers.', reveals: 'banks-generate-money-out-of' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch08_003', title: 'Understanding Interest: The Cost of Borrowing, the Reward of Saving',
          caseStudy: { intro: 'Have you ever wondered why, if you put 1,000 rupees in a piggy bank for a year, you still have 1,000 rupees, but if you put it in a bank account, it grows?',
            decisions: [{ prompt: 'What is the name of the extra money you earn for keeping your savings in a bank account?', options: [
                { text: 'The extra money is called interest', outcome: 'The extra money is called interest. A wrong answer suggests the student confuses interest with.' },
                { text: 'interest is a "fixed" amount regardless of the principal, like a flat fee', outcome: 'Not quite — Students often think interest is a "fixed" amount regardless of the principal, like a flat fee.', reveals: 'interest-is-a-fixed-amount' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch08_004', title: 'Types of Bank Accounts: Savings, Current, Fixed Deposit',
          caseStudy: { intro: 'Imagine you have a piggy bank, but instead of just holding coins, it could pay you extra money just for keeping them there, or help you pay your school fees.',
            decisions: [{ prompt: 'What is the primary purpose of a savings account for a student?', options: [
                { text: '[Correct answer] A savings account is a safe place to store money for future goals while', outcome: '[Correct answer] A savings account is a safe place to store money for future goals while earning.' },
                { text: 'liquid', outcome: 'Not quite — Students often think all bank accounts earn high interest and are exactly the same.', reveals: 'all-bank-accounts-earn-high' },
                { text: 'all bank accounts earn high interest and are exactly the same', outcome: 'Not quite — Students often think all bank accounts earn high interest and are exactly the same.', reveals: 'all-bank-accounts-earn-high' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch08_005', title: 'Banking Services: Cheques, ATMs, Online Banking',
          caseStudy: { intro: 'Have you ever wondered how your parents pay for expensive things without carrying a giant bag of coins?',
            decisions: [{ prompt: 'What is the primary purpose of a cheque?', options: [
                { text: 'A cheque is a written order to a bank to pay a specific amount of money to a named person', outcome: 'A cheque is a written order to a bank to pay a specific amount of money to a named person.' },
                { text: 'Cheque', outcome: 'Not quite — Students often think a "Cheque" or a "Debit Card" *is* the money itself.', reveals: 'a-cheque-or-a-debit' },
                { text: 'Debit Card', outcome: 'Not quite — Students often think a "Cheque" or a "Debit Card" *is* the money itself.', reveals: 'a-cheque-or-a-debit' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch08_006', title: 'Banks and the Economy: How Banks Keep Money Flowing',
          caseStudy: { intro: 'Have you ever wondered what happens to the money your parents put in a savings account?',
            decisions: [{ prompt: 'What is the primary role of a bank in an economy? (Recall: Simple direct question)', options: [
                { text: 'The bank acts as an intermediary that takes money from depositors and lends it to people', outcome: 'The bank acts as an intermediary that takes money from depositors and lends it to people.' },
                { text: 'banks keep every customer\'s money in a separate personal drawer in the back', outcome: 'Not quite — Students often believe that banks keep every customer\'s money in a separate personal drawer in the.', reveals: 'banks-keep-every-customer-s' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A villager keeps his savings in a tin box under the bed \'where no bank can touch it.\' Meanwhile, a neighbour needs exactly that amount for a sewing machine but cannot find anyone to lend it.',
            decisions: [{ prompt: 'What does the bank do that the tin box cannot?', options: [
                { text: 'It connects the saver to the borrower — deposits from people with spare money become loans for people who need it, so the saver earns interest and the neighbour gets her sewing machine. Money under a bed funds nothing; the same sum in a bank quietly finances someone\'s livelihood while staying safer than any tin box.', outcome: 'The bank\'s \'magic\' is intermediation — idle savings are recycled into working capital, which is why a village that banks its money can grow businesses.' },
                { text: 'The tin box is wiser — money you can see is safer than money in an institution.', outcome: 'A box can be stolen, lost or eaten by inflation, and it earns nothing — a bank both safeguards the deposit and puts it to work for someone else.', reveals: 'cash-under-bed-is-safest' },
                { text: 'The bank\'s only real job is storing money — lending to neighbours is a separate business altogether.', outcome: 'Lending deposits out is the core of banking — a bank is not a locker; the pool of savings is exactly what loans are made from.', reveals: 'bank-is-just-locker' }
            ] }] } },
        { type: 'case', nodeId: 'c6_economics_ch08_006', title: 'You made it',
          caseStudy: { intro: 'Deposits in, loans out — the bank is where saved money goes to work. Under the mattress it\'s safe; inside the bank it\'s alive.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_economics_ch08_001', difficulty: 'standard',
          question: 'A bank is a financial institution that acts as a safe storage place for money.',
          hint: 'Review the "Economic Activities" chapter to see how people earn and spend money.',
          misconception: 'Students often think a bank is just a "vault" or a big safe that holds cash.',
          parts: [
                { id: 'a', prompt: 'Keeping money in a bank keeps it safe and prevents it from sitting idle, whereas money under a bed earns nothing and faces risks like theft.', answer: '**Correct Answer:** Keeping money in a bank is better',
                  options: ['**Correct Answer:** Keeping money in a bank is better', 'keep your money', 'a bank is just a "vault" or a big safe that holds cash'],
                  hint: 'Review the "Economic Activities" chapter to see how people earn and spend money.',
                  misconception: 'Students often think a bank is just a "vault" or a big safe that holds cash.' },
                { id: 'b', prompt: 'If your neighbour needs money to open a small bakery, where can they go to get it, and what is that process called? (Apply)', answer: 'They can go to a bank to request a loan',
                  options: ['They can go to a bank to request a loan', 'a bank is just a "vault" or a big safe that holds cash'],
                  hint: 'Review the "Economic Activities" chapter to see how people earn and spend money.',
                  misconception: 'Students often think a bank is just a "vault" or a big safe that holds cash.' },
                { id: 'c', prompt: 'How do banks help "connect" two different types of people in a town? (Analyze)', answer: 'Banks connect people with "extra money" (depositors) to people who "need money"',
                  options: ['Banks connect people with "extra money" (depositors) to people who "need money"', 'a bank is just a "vault" or a big safe that holds cash'],
                  hint: 'Review the "Economic Activities" chapter to see how people earn and spend money.',
                  misconception: 'Students often think a bank is just a "vault" or a big safe that holds cash.' }
          ],
            remediations: { 'a-bank-is-just-a': { steps: ['Ask the student: "If the bank just hid your money in a box, how would they pay the people who work there?" Guide them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a bank is just a "vault" or a big safe that holds cash.',
          parts: [
                { id: 'a', prompt: 'Is it safer to lend your own savings directly to a stranger for their business, or to deposit it in a bank? Why? (Evaluate)', answer: 'It is safer to use a bank',
                  options: ['It is safer to use a bank', 'a bank is just a "vault" or a big safe that holds cash'],
                  hint: 'Review the "Economic Activities" chapter to see how people earn and spend money.',
                  misconception: 'Students often think a bank is just a "vault" or a big safe that holds cash.' }
          ],
            remediations: { 'a-bank-is-just-a': { steps: ['Ask the student: "If the bank just hid your money in a box, how would they pay the people who work there?" Guide them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch08_002', difficulty: 'standard',
          question: 'Banks act as financial bridges by collecting money from people who have extra.',
          hint: 'Review the "Economic vs Non-economic" table in Chapter 13 to solidify the concept.',
          misconception: 'Students often think banks generate money out of thin air to give to borrowers.',
          parts: [
                { id: 'a', prompt: 'Who are the two main groups of people that interact with a bank?', answer: 'The two groups are savers and borrowers',
                  options: ['The two groups are savers and borrowers', 'two-sided', 'banks generate money out of thin air to give to borrowers'],
                  hint: 'Review the "Economic vs Non-economic" table in Chapter 13 to solidify the concept of "value."',
                  misconception: 'Students often think banks generate money out of thin air to give to borrowers.' },
                { id: 'b', prompt: 'Why would someone choose to deposit money in a bank instead of keeping it in a metal box at home?', answer: 'A bank keeps money safe and pays interest, helping the savings grow',
                  options: ['A bank keeps money safe and pays interest, helping the savings grow', 'banks are just for hiding money, ignoring the growth aspect (interest)', 'banks generate money out of thin air to give to borrowers'],
                  hint: 'Review the "Economic vs Non-economic" table in Chapter 13 to solidify the concept of "value."',
                  misconception: 'Students often think banks generate money out of thin air to give to borrowers.' },
                { id: 'c', prompt: 'If you deposit ₹1,000 at a 5% interest rate, how much interest do you earn in one year?', answer: 'You earn ₹50',
                  options: ['You earn ₹50', 'banks generate money out of thin air to give to borrowers'],
                  hint: 'Review the "Economic vs Non-economic" table in Chapter 13 to solidify the concept of "value."',
                  misconception: 'Students often think banks generate money out of thin air to give to borrowers.' },
                { id: 'd', prompt: 'How does a bank benefit from the money deposited by savers?', answer: 'The bank uses those deposits to provide loans (borrowing) to others',
                  options: ['The bank uses those deposits to provide loans (borrowing) to others', 'banks generate money out of thin air to give to borrowers'],
                  hint: 'Review the "Economic vs Non-economic" table in Chapter 13 to solidify the concept of "value."',
                  misconception: 'Students often think banks generate money out of thin air to give to borrowers.' }
          ],
            remediations: { 'banks-generate-money-out-of': { steps: ['Explain the "Water Tank" analogy: The bank is like a tank.', 'Savers are the ones pouring water in (deposits), and borrowers are the ones using the tap (loans).', 'The bank cannot let the tap run if the tank is empty, so they must attract "depositors" first.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch08_003', difficulty: 'standard',
          question: 'Interest is the price paid for using someone else\'s money; it acts as a reward.',
          hint: 'Review the "Percentages" section in your mathematics workbook.',
          misconception: 'Students often think interest is a "fixed" amount regardless of the principal, like a flat fee.',
          parts: [
                { id: 'a', prompt: 'What is the name of the extra money you earn for keeping your savings in a bank account?', answer: 'The extra money is called interest',
                  options: ['The extra money is called interest', 'interest is a "fixed" amount regardless of the principal, like a flat fee'],
                  hint: 'Review the "Percentages" section in your mathematics workbook.',
                  misconception: 'Students often think interest is a "fixed" amount regardless of the principal, like a flat fee.' },
                { id: 'b', prompt: 'If you borrow 5,000 rupees and pay back 5,500 rupees, why did you have to pay the extra 500 rupees?', answer: 'You paid the extra 500 rupees as the cost of borrowing the bank\'s money',
                  options: ['You paid the extra 500 rupees as the cost of borrowing the bank\'s money', 'rental fee', 'interest is a "fixed" amount regardless of the principal, like a flat fee'],
                  hint: 'Review the "Percentages" section in your mathematics workbook.',
                  misconception: 'Students often think interest is a "fixed" amount regardless of the principal, like a flat fee.' },
                { id: 'c', prompt: 'If you have 2,000 rupees and the bank offers 5% interest per year, how much interest will you have after one year?', answer: 'You will have 100 rupees',
                  options: ['You will have 100 rupees', 'interest is a "fixed" amount regardless of the principal, like a flat fee'],
                  hint: 'Review the "Percentages" section in your mathematics workbook.',
                  misconception: 'Students often think interest is a "fixed" amount regardless of the principal, like a flat fee.' }
          ],
            remediations: { 'interest-is-a-fixed-amount': { steps: ['Ask the student to calculate 10% of 100, then 10% of 1,000.', 'Point out that the "10%" rule remains the same, but the actual money changes because the starting amount (principal).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch08_004', difficulty: 'standard',
          question: 'Bank accounts are specialized services provided by banks that allow individuals.',
          hint: 'Review the definition of "Economic Activities" from Chapter 13.',
          misconception: 'Students often think all bank accounts earn high interest and are exactly the same.',
          parts: [
                { id: 'a', prompt: 'Why would a business owner prefer a current account over a savings account?', answer: '[Correct answer] A business owner prefers a current account',
                  options: ['[Correct answer] A business owner prefers a current account', 'all bank accounts earn high interest and are exactly the same'],
                  hint: 'Review the definition of "Economic Activities" from Chapter 13.',
                  misconception: 'Students often think all bank accounts earn high interest and are exactly the same.' },
                { id: 'b', prompt: 'If your father wants to deposit a large sum of money for 3 years to earn the highest possible interest, which account should he choose?', answer: '**Correct Answer:** Your father should choose a Fixed Deposit (FD) account',
                  options: ['**Correct Answer:** Your father should choose a Fixed Deposit (FD) account', 'a Savings Account', 'all bank accounts earn high interest and are exactly the same'],
                  hint: 'Review the definition of "Economic Activities" from Chapter 13.',
                  misconception: 'Students often think all bank accounts earn high interest and are exactly the same.' },
                { id: 'c', prompt: 'Compare the interest-earning potential of a Savings Account versus a Fixed Deposit.', answer: '**Correct Answer:** Fixed Deposits offer higher interest rates',
                  options: ['**Correct Answer:** Fixed Deposits offer higher interest rates', 'liquidity-premium', 'all bank accounts earn high interest and are exactly the same'],
                  hint: 'Review the definition of "Economic Activities" from Chapter 13.',
                  misconception: 'Students often think all bank accounts earn high interest and are exactly the same.' }
          ],
            remediations: { 'all-bank-accounts-earn-high': { steps: ['Ask the student: "If you were a shopkeeper paying 50 people every day, would you want an account that limits how many.', 'Explain the "Transaction vs.', 'Use a table to compare: Savings (Low interest, high access) vs.', 'FD (High interest, low access).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch08_005', difficulty: 'standard',
          question: 'Banking services are modern financial tools—like cheques, ATMs, and online.',
          hint: 'Review the "Economic Life Around Us" section on how people are paid (salary/wages).',
          misconception: 'Students often think a "Cheque" or a "Debit Card" *is* the money itself.',
          parts: [
                { id: 'a', prompt: 'If you want to send money to a friend instantly from your home using a mobile app, which service are you using?', answer: 'You are using online banking or a UPI-based mobile service',
                  options: ['You are using online banking or a UPI-based mobile service', 'Cheque', 'Debit Card', 'a "Cheque" or a "Debit Card" *is* the money itself'],
                  hint: 'Review the "Economic Life Around Us" section on how people are paid (salary/wages).',
                  misconception: 'Students often think a "Cheque" or a "Debit Card" *is* the money itself.' },
                { id: 'b', prompt: 'Compare a physical cash transaction with an online bank transfer. Which is better for large payments and why?', answer: 'Online transfers are better',
                  options: ['Online transfers are better', 'Cheque', 'Debit Card', 'a "Cheque" or a "Debit Card" *is* the money itself'],
                  hint: 'Review the "Economic Life Around Us" section on how people are paid (salary/wages).',
                  misconception: 'Students often think a "Cheque" or a "Debit Card" *is* the money itself.' }
          ],
            remediations: { 'a-cheque-or-a-debit': { steps: ['Explain that the bank account is the "bucket" holding the water (money).', 'The cheque or card is just the "tap" or "pipe" used to get the water out.', 'Tell the student: "If you break the tap, the water is still safe in the bucket at the bank."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_economics_ch08_006', difficulty: 'standard',
          question: 'Banks are financial institutions that act as a bridge by collecting money from.',
          hint: 'Review the definition of \'Economic Activity\' from the previous chapter.',
          misconception: 'Students often believe that banks keep every customer\'s money in a separate personal drawer in the back.',
          parts: [
                { id: 'a', prompt: 'If a student takes a loan from a bank to pay for their education, how does this fit into the bank\'s role? (Apply: Using the concept in a new scenario)', answer: 'The bank provides the capital (loan) so the student can gain skills',
                  options: ['The bank provides the capital (loan) so the student can gain skills', 'banks keep every customer\'s money in a separate personal drawer in the back'],
                  hint: 'Review the definition of \'Economic Activity\' from the previous chapter.',
                  misconception: 'Students often believe that banks keep every customer\'s money in a separate personal drawer in the back.' }
          ],
            remediations: { 'banks-keep-every-customer-s': { steps: ['First, ask the student: "If a bank just held your money, how would it pay its employees or make a profit?" Then.', 'Use the "Library Book" analogy: if a book just sits on a shelf, no one learns; if it is checked out, knowledge.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
