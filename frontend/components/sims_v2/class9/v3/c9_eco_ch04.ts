import type { SimDef } from '../../engine/types';

/** v3 generated — c9_eco_ch04 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_eco_ch04: SimDef = {
    id: 'v3_c9_eco_ch04',
    title: 'Smart Ways to Manage Your Finances',
    subtitle: 'This node covers personal/household income sources, the budgeting process (50-30-20 rule.',
    classLevel: 9, subject: 'economics', topic: 'Smart Ways to Manage Your Finances',
    chapters: ['c9_eco_ch04'],
    nodeIds: ['c9_eco_ch4_1', 'c9_eco_ch4_2', 'c9_eco_ch4_3', 'c9_eco_ch4_4', 'c9_eco_ch4_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Start with a relatable scenario: "Riya earns ₹15,000/month from tutoring and gets ₹5,000 pocket money.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Define \'disposable income\' in your own words and give one example of a deduction that converts gross income to disposable income for a salaried person.',
        options: ['Disposable income is the money left after paying direct taxes (like income tax)', 'money left after rent', 'savings = income minus expenses'],
        answer: 'Disposable income is the money left after paying direct taxes (like income tax)',
        hook: 'Students believe "savings = income minus expenses" is a *passive outcome* — whatever remains after spending.',
    },
    teaching: [
        { title: 'Income, Budgeting and Savings', text: 'Income is the flow of money received by an individual or household over a period (wages, salary, rent, profit, interest).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_eco_ch4_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['Income, Budgeting and Savings', 'Banking and Digital Payments', 'Interest: Simple and Compound', 'Insurance and Investment Basics', 'Financial Frauds and How'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_eco_ch4_1', title: 'Income, Budgeting and Savings',
          scaffold: { problem: 'Meena, a Class 9 student, receives ₹1,500 pocket money monthly. She also earns ₹300 by selling handmade bookmarks.',
            steps: [
            { text: 'Calculate total monthly income: ₹1,500 (pocket money) + ₹300 (bookmarks) = ₹1,800.' },
            { text: 'Calculate current total expenses: ₹400 (supplies) + ₹350 (snacks) + ₹200 (bus) = ₹950.' },
            { text: 'Calculate current monthly savings: ₹1,800 – ₹950 = ₹850.' },
            { text: 'Determine required monthly savings for goal: ₹2,000 ÷ 5 months = ₹400/month.' },
            { text: 'Compare: Current savings (₹850) > Required savings (₹400). She *can* achieve the goal — and still have ₹450/month for.', faded: true, blankAnswer: 'Yes, Meena can buy the art kit in 5 months. She saves.' }
            ] } },
        { type: 'case', nodeId: 'c9_eco_ch4_2', title: 'Banking and Digital Payments: UPI and Beyond',
          caseStudy: { intro: 'Imagine you’re at a street food stall in Delhi selling momos for ₹50 each. Instead of asking for cash, the vendor displays a QR code.',
            decisions: [{ prompt: 'What does UPI stand for, and what is its primary function in digital payments?', options: [
                { text: 'UPI stands for Unified Payments Interface', outcome: 'UPI stands for Unified Payments Interface. Its primary function is to enable instant, real-time.' },
                { text: 'UPI is a mobile wallet where money is stored', outcome: 'Not quite — Students often think UPI transactions are processed instantly only if both parties use the same.', reveals: 'upi-transactions-are-processed-instantly' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch4_3', title: 'Interest: Simple and Compound',
          scaffold: { problem: 'Priya invests ₹15,000 in a bank fixed deposit at 5.5% p.a. simple interest for 4 years.',
            steps: [
            { text: 'Identify the given data — Principal (P) = ₹15,000, Rate (R) = 5.5% per annum, Time (T) = 4 years.' },
            { text: 'Recall the simple interest formula: SI = (P × R × T) / 100. This formula applies because interest is calculated only.' },
            { text: 'Substitute values: SI = (15000 × 5.5 × 4) / 100. First compute 15000 × 5.5 = 82,500; then 82,500 × 4 = 330,000; divide.' },
            { text: 'Calculate maturity amount: Amount = Principal + SI = 15,000 + 3,300 = ₹18,300.' },
            { text: 'Interpret economically: Priya earns ₹3,300 as reward for letting the bank use her money for 4 years.', faded: true, blankAnswer: 'Simple Interest = ₹3,300; Maturity Amount = ₹18,300' }
            ] } },
        { type: 'case', nodeId: 'c9_eco_ch4_4', title: 'Insurance and Investment Basics',
          caseStudy: { intro: 'Start by asking students if they or their family have ever bought a mobile phone insurance policy or invested in a piggy bank or post office savings scheme.',
            decisions: [{ prompt: 'What is the primary purpose of insurance? A) To earn high returns on money invested B) To protect against financial loss from unexpected.', options: [
                { text: 'B) To protect against financial loss from unexpected events', outcome: 'B) To protect against financial loss from unexpected events A student who chooses A or C confuses.' },
                { text: 'if they don’t make a claim, they’ve “lost” their premium money', outcome: 'Not quite — Students often think that insurance is a type of investment because both involve paying money.', reveals: 'insurance-is-a-type-of' }
            ] }] } },
        { type: 'case', nodeId: 'c9_eco_ch4_5', title: 'You made it',
          caseStudy: { intro: 'You finished Smart Ways to Manage Your Finances — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_eco_ch4_1', difficulty: 'standard',
          question: 'Income is the flow of money received by an individual or household over.',
          hint: 'If stuck on budget math, revisit c8_math_ch8_4 (percentage of quantity) and.',
          misconception: 'Students believe "savings = income minus expenses" is a *passive outcome* — whatever remains after spending.',
          parts: [
                { id: 'a', prompt: 'Define \'disposable income\' in your own words and give one example of a deduction that converts gross income to disposable income for a salaried person.', answer: 'Disposable income is the money left after paying direct taxes (like income tax)',
                  options: ['Disposable income is the money left after paying direct taxes (like income tax)', 'money left after rent', 'savings = income minus expenses', '"savings = income minus expenses" is a *passive outcome*'],
                  hint: 'If stuck on budget math, revisit c8_math_ch8_4 (percentage of quantity) and c7_math_ch03_008/009.',
                  misconception: 'Students believe "savings = income minus expenses" is a *passive outcome* — whatever remains after spending.' },
                { id: 'b', prompt: 'Priya budgets ₹3,000 for \'food\' but spends ₹3,800. She says, "Food is a need, so it\'s okay to overspend." Explain why this reasoning is flawed using the.', answer: 'A budget constraint means total spending cannot exceed total income',
                  options: ['A budget constraint means total spending cannot exceed total income', 'savings = income minus expenses', '"savings = income minus expenses" is a *passive outcome*'],
                  hint: 'If stuck on budget math, revisit c8_math_ch8_4 (percentage of quantity) and c7_math_ch03_008/009.',
                  misconception: 'Students believe "savings = income minus expenses" is a *passive outcome* — whatever remains after spending.' },
                { id: 'c', prompt: 'Arjun earns ₹25,000/month. His fixed expenses: Rent ₹8,000, EMI ₹3,000, Insurance ₹1,500.', answer: 'Step 1: Total fixed = 8,000 + 3,000 + 1,500 = ₹12,500',
                  options: ['Step 1: Total fixed = 8,000 + 3,000 + 1,500 = ₹12,500', 'savings = income minus expenses', '"savings = income minus expenses" is a *passive outcome*'],
                  hint: 'If stuck on budget math, revisit c8_math_ch8_4 (percentage of quantity) and c7_math_ch03_008/009.',
                  misconception: 'Students believe "savings = income minus expenses" is a *passive outcome* — whatever remains after spending.' },
                { id: 'd', prompt: 'Compare two budgeting approaches: (A) "Save whatever is left after spending" vs.', answer: 'Approach B builds wealth faster',
                  options: ['Approach B builds wealth faster', 'both are same if discipline is equal', 'savings = income minus expenses', '"savings = income minus expenses" is a *passive outcome*'],
                  hint: 'If stuck on budget math, revisit c8_math_ch8_4 (percentage of quantity) and c7_math_ch03_008/009.',
                  misconception: 'Students believe "savings = income minus expenses" is a *passive outcome* — whatever remains after spending.' }
          ],
            remediations: { 'savings-income-minus-expenses-is': { steps: ['Give the student a fixed income (₹1,000) and a 2-week spending log with 10 items.', 'Ask them to classify each as need/want.', 'Have them redo the log *as if* they had committed to saving ₹200 upfront — what 2 wants would they drop?', 'Calculate the new savings rate.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch4_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "savings = income minus expenses" is a *passive outcome* — whatever remains after spending.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "A household earning ₹1 lakh/month should follow the 50-30-20 rule strictly." Consider a family with a chronic illness (high medical costs) and.', answer: 'No, the 50-30-20 rule is a *heuristic*, not a law',
                  options: ['No, the 50-30-20 rule is a *heuristic*, not a law', 'savings = income minus expenses', '"savings = income minus expenses" is a *passive outcome*'],
                  hint: 'If stuck on budget math, revisit c8_math_ch8_4 (percentage of quantity) and c7_math_ch03_008/009.',
                  misconception: 'Students believe "savings = income minus expenses" is a *passive outcome* — whatever remains after spending.' },
                { id: 'b', prompt: 'Create a monthly budget for a fictional Class 9 student, \'Aman\', who gets ₹2,000 pocket money and earns ₹500 helping at his uncle\'s shop.', answer: 'Income: ₹2,500',
                  options: ['Income: ₹2,500', 'savings = income minus expenses', '"savings = income minus expenses" is a *passive outcome*'],
                  hint: 'If stuck on budget math, revisit c8_math_ch8_4 (percentage of quantity) and c7_math_ch03_008/009.',
                  misconception: 'Students believe "savings = income minus expenses" is a *passive outcome* — whatever remains after spending.' }
          ],
            remediations: { 'savings-income-minus-expenses-is': { steps: ['Give the student a fixed income (₹1,000) and a 2-week spending log with 10 items.', 'Ask them to classify each as need/want.', 'Have them redo the log *as if* they had committed to saving ₹200 upfront — what 2 wants would they drop?', 'Calculate the new savings rate.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch4_2', difficulty: 'standard',
          question: 'UPI (Unified Payments Interface) is a real-time digital payment system.',
          hint: 'If stuck, revisit the concept of “banking services” from Class 6 (c6_economics_ch08_005).',
          misconception: 'Students often think UPI transactions are processed instantly only if both parties use the same bank app (e.g., both.',
          parts: [
                { id: 'a', prompt: 'What does UPI stand for, and what is its primary function in digital payments?', answer: 'UPI stands for Unified Payments Interface',
                  options: ['UPI stands for Unified Payments Interface', 'UPI is a mobile wallet where money is stored'],
                  hint: 'If stuck, revisit the concept of “banking services” from Class 6 (c6_economics_ch08_005).',
                  misconception: 'Students often think UPI transactions are processed instantly only if both parties use the same bank app (e.g., both on PhonePe), failing.' }
          ],
            remediations: { 'upi-transactions-are-processed-instantly': { steps: ['A enters B’s VPA (e.g., `b@hdfc`) in PhonePe and confirms.', 'PhonePe sends request to NPCI via UPI switch.', 'NPCI routes debit request to SBI and credit request to HDFC.', 'Both banks confirm via IMPS; NPCI settles in real time.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch4_3', difficulty: 'standard',
          question: 'Simple interest is calculated only on the original principal amount for the.',
          hint: 'If stuck, revisit Class 8 Mathematics Chapter 8 (Simple Interest) and Class 6 Economics.',
          misconception: 'Students believe that "compound interest is always better than simple interest" — but this is only true for the.',
          parts: [
                { id: 'a', prompt: 'Why does compound interest earn more than simple interest over the same period, even at the same rate?', answer: 'Because in compound interest, the interest earned in each period is added to the',
                  options: ['Because in compound interest, the interest earned in each period is added to the', 'compound interest is applied more times', 'the rate is higher', 'compound interest is always better than simple interest'],
                  hint: 'If stuck, revisit Class 8 Mathematics Chapter 8 (Simple Interest) and Class 6 Economics.',
                  misconception: 'Students believe that "compound interest is always better than simple interest" — but this is only true for the *lender/saver*.' }
          ],
            remediations: { 'compound-interest-is-always-better': { steps: ['If a student confuses borrower vs saver perspective: Give two identical loan scenarios — one with SI, one with CI — and.', 'Then ask: "If you were the bank, which would you choose?" This forces perspective-taking.', 'For formula errors: Use a colour-coded template — P in blue, R in red, T in green — and have them fill it for 5.', 'Emphasise: "R is % per annum, T in years, compounding = annually unless stated." Practice with ₹1,000 at 10% for 1,2,3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch4_4', difficulty: 'standard',
          question: 'Insurance is a contract where you pay a small regular amount (premium) to.',
          hint: 'If stuck, review c9_eco_ch4_3 (Interest: Simple and Compound) to understand how.',
          misconception: 'Students often think that insurance is a type of investment because both involve paying money regularly to a financial.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of insurance? A) To earn high returns on money invested B) To protect against financial loss from unexpected events C) To increase.', answer: 'B) To protect against financial loss from unexpected events',
                  options: ['B) To protect against financial loss from unexpected events', 'if they don’t make a claim, they’ve “lost” their premium money'],
                  hint: 'If stuck, review c9_eco_ch4_3 (Interest: Simple and Compound) to understand how investments grow.',
                  misconception: 'Students often think that insurance is a type of investment because both involve paying money regularly to a financial institution, and.' },
                { id: 'b', prompt: 'Why is paying a health insurance premium not considered an investment, even though money is paid regularly?', answer: 'B) Because it does not generate income or appreciate in value',
                  options: ['B) Because it does not generate income or appreciate in value', 'if they don’t make a claim, they’ve “lost” their premium money'],
                  hint: 'If stuck, review c9_eco_ch4_3 (Interest: Simple and Compound) to understand how investments grow.',
                  misconception: 'Students often think that insurance is a type of investment because both involve paying money regularly to a financial institution, and.' }
          ],
            remediations: { 'insurance-is-a-type-of': { steps: ['Use a real-life analogy: Paying insurance premium is like paying for a seatbelt in a car—you hope you never need.', 'Show data: Compare two students—one with insurance (paid ₹1,000 premium, no claim) and one without (faced ₹10,000.', 'The insured student is better off by ₹9,000 despite no claim.', 'This makes clear that insurance value is in risk reduction, not claim frequency.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_eco_ch4_5', difficulty: 'standard',
          question: 'Financial fraud refers to deceptive practices where individuals or groups trick.',
          hint: 'If stuck, revisit c9_eco_ch4_2 (Banking and Digital Payments: UPI and Beyond).',
          misconception: 'Students often believe that if a website or app has the correct logo, color scheme, and professional design, it must.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Financial fraud refers to deceptive practices where individuals or groups trick others',
                  options: ['Financial fraud refers to deceptive practices where individuals or groups trick others', 'Income is the flow of money received by an individual or household over a period (wages,', 'UPI (Unified Payments Interface) is a real-time digital payment system developed by NPCI', 'Simple interest is calculated only on the original principal amount for the entire'],
                  hint: 'If stuck, revisit c9_eco_ch4_2 (Banking and Digital Payments: UPI and Beyond), specifically the.',
                  misconception: 'Students often believe that if a website or app has the correct logo, color scheme, and professional design, it must be genuine and safe.' }
          ],
            remediations: { 'if-a-website-or-app': { steps: ['Teach students to always check the URL *before* entering any data—look for misspellings, odd domains (.xyz, .info),.', 'Demonstrate how to open the real app separately (not via link) to check for offers.', 'Role-play a scenario where a message says “Click to get ₹1,000 cashback”—guide them to verify via official app.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
