import type { SimDef } from '../../engine/types';

/** v3 generated — c7_eco_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_eco_ch04_p1: SimDef = {
    id: 'v3_c7_eco_ch04_p1',
    title: 'Banks and the Magic of Finance · Part 1/2',
    subtitle: 'Covers the definition and basic components of financial infrastructure (banks, markets.',
    classLevel: 7, subject: 'economics', topic: 'Banks and the Magic of Finance · Part 1/2',
    chapters: ['c7_eco_ch04'],
    nodeIds: ['c7_eco_ch04_001', 'c7_eco_ch04_002', 'c7_eco_ch04_003', 'c7_eco_ch04_004', 'c7_eco_ch04_005', 'c7_eco_ch04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking into a bustling weekly vegetable market in your town where buyers use cash, digital UPI apps.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A town of 5,000 people has no bank, no payment app, no credit — savings sleep in mattresses and every deal needs a sack of cash. What invisible machinery has stopped working?',
        options: ['The financial infrastructure — without banks and payment networks, savings cannot be pooled, businesses cannot borrow, and money cannot move safely', 'The physical infrastructure — the roads must have vanished too', 'Nothing — mattresses are safer than banks anyway', 'The market — trade is impossible without rupees printed locally'],
        answer: 'The financial infrastructure — without banks and payment networks, savings cannot be pooled, businesses cannot borrow, and money cannot move safely',
        hook: 'Banks and payment systems are the plumbing of an economy — as essential as roads are to trucks. A digital scan at a vegetable stall rides on a vast hidden network of institutions and rules, not magic.',
    },
    teaching: [
        { title: 'Financial Infrastructure: Definition and Components', text: 'Financial infrastructure refers to the foundational network of institutions, markets, rules, and technologies—such as banks, payment gateways, and stock exchanges—that allow money to move safely and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_eco_ch04_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Design a financial rescue kit for a remote hill village — pick the three pieces of money-moving machinery it needs first and explain the job of each.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_eco_ch04_002', title: 'What is a Bank: Functions and Types',
          scaffold: { problem: 'A commercial bank in Chennai receives ₹50,00,000 in total savings deposits from local households, paying an annual interest rate of 3%.',
            steps: [
            { text: 'Identify total deposits (₹50,00,000), deposit interest rate (3%), reserve ratio (20%), loan ratio (80%), and loan.' },
            { text: 'Calculate total amount lent out = 80% of ₹50,00,000 = 0.80 × 50,00,000 = ₹40,00,000.' },
            { text: 'Calculate annual interest income earned from loans = 9% of ₹40,00,000 = 0.09 × 40,00,000 = ₹3,60,000.' },
            { text: 'Calculate annual interest expense paid to depositors = 3% of ₹50,00,000 = 0.03 × 50,00,000 = ₹1,50,000.' },
            { text: 'Calculate net annual interest income = ₹3,60,000 - ₹1,50,000 = ₹2,10,000.', faded: true, blankAnswer: 'Net interest income is ₹2,10,000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch04_003', title: 'Main Functions of Banks: Deposits and Lending',
          scaffold: { problem: 'A rural bank collects ₹2,00,000 in total savings deposits, offering a 3% annual interest reward to its account holders.',
            steps: [
            { text: 'Identify given variables: Deposit Amount = ₹2,00,000, Deposit Rate = 3% (0.03), Loan Amount = ₹1,50,000, Lending Rate.' },
            { text: 'Calculate total interest paid out to depositors using the formula: Deposit Amount × Deposit Rate.' },
            { text: 'Calculate total interest received from the borrower using the formula: Loan Amount × Lending Rate.' },
            { text: 'Subtract total interest paid from total interest received to find the bank\'s net interest earnings.' },
            { text: 'Interpret the result economically as the gross margin the bank uses to cover operational costs.', faded: true, blankAnswer: 'Net earnings = ₹13,500 (Interest earned = ₹13,500; Interest.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch04_004', title: 'How Banks Impact People\'s Lives: Savings and Loans',
          scaffold: { problem: 'Meena deposits ₹8,000 in a bank savings account offering an annual interest rate of 5%.',
            steps: [
            { text: 'Identify the given values: Principal (P) = ₹8,000, Rate (R) = 5% per annum, Time (T) = 2 years.' },
            { text: 'State the simple interest formula: Interest (I) = (P × R × T) / 100.' },
            { text: 'Substitute the values into the formula: I = (8,000 × 5 × 2) / 100.' },
            { text: 'Perform the multiplication and division: I = 80,000 / 100 = ₹800.' },
            { text: 'Calculate the total account balance by adding the interest to the principal: Total Balance = ₹8,000 + ₹800 = ₹8,800.', faded: true, blankAnswer: 'Total interest earned is ₹800, and total account balance.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_eco_ch04_006', title: 'Loans and Credit: How Banks Lend Money',
          scaffold: { problem: 'A local potter in Rajasthan needs ₹25,000 to buy electric pottery wheels.',
            steps: [
            { text: 'Identify the given data: Principal (P) = ₹25,000, Rate (R) = 10% per year, Time (T) = 2 years.' },
            { text: 'Set up the simple interest formula: Interest ($I$) = $(P \\times R \\times T) / 100$.' },
            { text: 'Substitute the numbers into the formula: $I = (25,000 \\times 10 \\times 2) / 100$.' },
            { text: 'Calculate the total interest: $I = 500,000 / 100 = ₹5,000$.' },
            { text: 'Add the interest to the principal to find total repayment: Total Amount = Principal + Interest = ₹25,000 + ₹5,000.', faded: true, blankAnswer: 'Total interest is ₹5,000 and total repayment is ₹30,000.' }
            ] } },
        { type: 'case', nodeId: 'c7_eco_ch04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A mountain district has fertile land, hardworking farmers and eager shopkeepers — but no bank branch for miles. Savings sit in cash at home, a trader who wants to expand can\'t borrow, and a visitor wonders why such an industrious place stays poor.',
            decisions: [{ prompt: 'What is the missing ingredient?', options: [
                { text: 'Financial infrastructure — cash under a mattress earns nothing and funds nothing, while the same rupees in a bank would earn interest and become loans for the trader\'s expansion. Without banks, credit and payment networks, hard work cannot convert into investment — effort is trapped in place, which is exactly how a lack of banks keeps a capable region poor.', outcome: 'The chapter\'s core: saving and borrowing need institutions to connect them — no bank means no bridge from spare money to working capital.' },
                { text: 'Nothing is missing — hardworking people with resources always prosper eventually, banks or not.', outcome: 'Effort alone cannot scale — expansion needs borrowed capital, and idle cash savings never become anyone\'s loan without a bank between saver and borrower.', reveals: 'hard-work-beats-credit' },
                { text: 'The district needs charity, not banks — donations from outside would fix the poverty faster.', outcome: 'Charity flows once; a bank keeps recycling local savings into local loans every year — the district needs the mechanism, not a one-time gift.', reveals: 'charity-beats-banking' }
            ] }] } },
        { type: 'case', nodeId: 'c7_eco_ch04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Roads carry the goods; banks and payment networks carry the money. Break either one and trade limps to a halt.',
            decisions: [{ prompt: 'What comes next? Banks and the Magic of Finance · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Banks and the Magic of Finance · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_eco_ch04_001', difficulty: 'standard',
          question: 'Financial infrastructure refers to the foundational network of institutions.',
          hint: 'Review c6_economics_ch07_001 on physical vs social infrastructure and.',
          misconception: 'Students often think financial infrastructure only means commercial banks like SBI or HDFC, completely overlooking.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Financial infrastructure refers to the foundational network of institutions, markets,',
                  options: ['Financial infrastructure refers to the foundational network of institutions, markets,', 'A bank is a financial institution licensed to accept deposits from the public and create', 'The two primary functions of commercial banks are accepting deposits from savers (paying', 'How banks impact people\'s lives through savings and loans refers to the ways formal'],
                  hint: 'Review c6_economics_ch07_001 on physical vs social infrastructure and c6_economics_ch08_006.',
                  misconception: 'Students often think financial infrastructure only means commercial banks like SBI or HDFC, completely overlooking payment systems, stock.' }
          ],
            remediations: { 'financial-infrastructure-only-means-commercial': { steps: ['To fix this misconception, draw a mental map starting with a single consumer buying a notebook digitally.', 'Show that the transaction requires: 1) The consumer\'s bank account, 2) A digital payment app (the interface), 3).', 'Explain that all these connected pieces working together form the "infrastructure," just like water pipes, water tanks.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch04_002', difficulty: 'standard',
          question: 'A bank is a financial institution licensed to accept deposits from the public.',
          hint: 'Review c6_economics_ch08_001 to reinforce the basic concept of why people store money.',
          misconception: 'Students often believe that banks keep 100% of all deposited cash locked in a vault waiting solely for the original.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A bank is a financial institution licensed to accept deposits from the public and create',
                  options: ['A bank is a financial institution licensed to accept deposits from the public and create', 'Financial infrastructure refers to the foundational network of institutions, markets,', 'The two primary functions of commercial banks are accepting deposits from savers (paying', 'How banks impact people\'s lives through savings and loans refers to the ways formal'],
                  hint: 'Review c6_economics_ch08_001 to reinforce the basic concept of why people store money safely.',
                  misconception: 'Students often believe that banks keep 100% of all deposited cash locked in a vault waiting solely for the original depositor to take.' }
          ],
            remediations: { 'banks-keep-100-of-all': { steps: ['Remind students of the dual function of banking by tracing a single ₹10,000 deposit.', 'Show step-by-step how the bank keeps ₹1,000 as a cash reserve for daily withdrawals and lends out ₹9,000 to a local.', 'This demonstrates that deposits are actively working in the economy rather than resting idle in a vault.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch04_003', difficulty: 'standard',
          question: 'The two primary functions of commercial banks are accepting deposits from.',
          hint: 'Review c6_economics_ch08_002 to re-familiarize yourself with the basic dual roles.',
          misconception: 'Students often believe that when they deposit money in a bank, that exact physical cash sits in a vault waiting for.',
          parts: [
                { id: 'a', prompt: 'What is the primary term used for money that individuals and businesses safely place into a bank account for safekeeping and earning a reward?', answer: 'The correct term is deposits',
                  options: ['The correct term is deposits', 'investments'],
                  hint: 'Review c6_economics_ch08_002 to re-familiarize yourself with the basic dual roles of saving and.',
                  misconception: 'Students often believe that when they deposit money in a bank, that exact physical cash sits in a vault waiting for them to pick it up.' }
          ],
            remediations: { 'when-they-deposit-money-in': { steps: ['To fix this, trace a single ₹1,000 note deposited by Student A into a bank.', 'Show how the bank keeps ₹100 in the vault as a reserve and lends ₹900 to Student B to buy school supplies.', 'Explain that the bank does not have ₹1,000 sitting in a box; it has a promise from Student B to repay ₹900, which.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch04_004', difficulty: 'standard',
          question: 'How banks impact people\'s lives through savings and loans refers to the ways.',
          hint: 'Review c7_eco_ch04_003 to clarify how deposits and lending form the foundation of banking.',
          misconception: 'Students often believe that banks are merely storage lockers like piggy banks, failing to realize that banks actively.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'How banks impact people\'s lives through savings and loans refers to the ways formal',
                  options: ['How banks impact people\'s lives through savings and loans refers to the ways formal', 'Financial infrastructure refers to the foundational network of institutions, markets,', 'A bank is a financial institution licensed to accept deposits from the public and create', 'The two primary functions of commercial banks are accepting deposits from savers (paying'],
                  hint: 'Review c7_eco_ch04_003 to clarify how deposits and lending form the foundation of banking services.',
                  misconception: 'Students often believe that banks are merely storage lockers like piggy banks, failing to realize that banks actively use deposited savings.' }
          ],
            remediations: { 'banks-are-merely-storage-lockers': { steps: ['To fix this, use a classroom analogy: imagine 10 students each save ₹100 with a student bank manager.', 'The manager keeps ₹20 as a reserve for daily withdrawals and lends ₹80 to a classmate who needs to buy art supplies.', 'Explain that the card seller uses the loan to earn revenue, repays the loan with a little extra (interest), and allows.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch04_005', difficulty: 'standard',
          question: 'Banks offer different types of accounts—Savings, Current, and Fixed.',
          hint: 'Review node c7_eco_ch04_002 to reinforce what a commercial bank is and why people deposit.',
          misconception: 'Students often think that all bank accounts give the same interest rate and have the exact same rules for withdrawing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Banks offer different types of accounts—Savings, Current, and Fixed Deposit—tailored to',
                  options: ['Banks offer different types of accounts—Savings, Current, and Fixed Deposit—tailored to', 'Financial infrastructure refers to the foundational network of institutions, markets,', 'A bank is a financial institution licensed to accept deposits from the public and create', 'The two primary functions of commercial banks are accepting deposits from savers (paying'],
                  hint: 'Review node c7_eco_ch04_002 to reinforce what a commercial bank is and why people deposit money.',
                  misconception: 'Students often think that all bank accounts give the same interest rate and have the exact same rules for withdrawing money.' }
          ],
            remediations: { 'all-bank-accounts-give-the': { steps: ['To fix this, review the three core pillars of banking accounts: Liquidity (how easily you can take cash out), Purpose.', 'long-term investment), and Return (interest earned).', 'Create a comparative table on the blackboard listing Savings, Current, and Fixed Deposits across columns: Interest Rate.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c7_eco_ch04_006', difficulty: 'standard',
          question: 'Loans and credit refer to the economic process where banks lend accumulated.',
          hint: 'Review c7_eco_ch04_003 to understand how deposits become loanable funds before tackling.',
          misconception: 'Students often believe that banks create money out of thin air without any backing or that the loan money given out.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Loans and credit refer to the economic process where banks lend accumulated deposits to',
                  options: ['Loans and credit refer to the economic process where banks lend accumulated deposits to', 'Financial infrastructure refers to the foundational network of institutions, markets,', 'A bank is a financial institution licensed to accept deposits from the public and create', 'The two primary functions of commercial banks are accepting deposits from savers (paying'],
                  hint: 'Review c7_eco_ch04_003 to understand how deposits become loanable funds before tackling credit.',
                  misconception: 'Students often believe that banks create money out of thin air without any backing or that the loan money given out belongs entirely to the.' }
          ],
            remediations: { 'banks-create-money-out-of': { steps: ['To fix this misunderstanding, trace a single ₹1,000 deposit made by a student\'s family member into a bank account.', 'Show that out of this deposit, the bank keeps a fraction in reserve and lends the rest to a local artisan.', 'Explain that if the artisan fails to repay, the bank will struggle to return the family\'s original ₹1,000 deposit.', 'Use this physical flow model to demonstrate that bank credit is simply redistributed community savings with added.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
