import type { SimDef } from '../../engine/types';

/** v3 generated — c6_civics_ch13 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_civics_ch13: SimDef = {
    id: 'v3_c6_civics_ch13',
    title: 'Government Budget',
    subtitle: 'A country\'s pocket-money plan, scaled up a billion times',
    classLevel: 6, subject: 'civics', topic: 'Government Budget',
    chapters: ['c6_civics_ch13'],
    nodeIds: [],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a junior finance minister planning the year', intro: 'Taxes are in and requests are flooding — hospitals want machines, schools want roofs, farmers want roads. You hold the plan that decides it all.', goal: 'Read a budget as a plan for spending, not a rule against it.' },
    discovery: {
        question: 'The government announces it \'has a budget,\' so a student concludes it must be saving money and shouldn\'t build the new road. What\'s wrong with this picture?',
        options: ['A budget isn\'t about not-spending — it\'s a plan for spending public money well', 'Nothing — having a budget means the government must stop all spending', 'The road is cancelled because roads are never allowed in budgets', 'Budgets are secret — nobody should even know about the road'],
        answer: 'A budget isn\'t about not-spending — it\'s a plan for spending public money well',
        hook: 'A budget is a roadmap of money, not a lock on the wallet. It decides where every rupee goes — roads, schools, hospitals — before the year even starts.',
    },
    teaching: [
        { title: 'What is a Budget and Why Governments Need One', text: 'A government budget is a written financial plan that shows how much money the government expects to receive (income) and how it intends to spend that money on public services over the course of one.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_civics_ch13_023', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Balance one year of a country\'s money — collect the taxes, then split every rupee among hospitals, schools and roads — and defend your choices to the people.',
        labels: ['What is a Budget', 'Sources of Government Income', 'Government Expenditure: Where', 'Types of Budget: Surplus,', 'How the Budget'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_civics_ch13_023', title: 'What is a Budget and Why Governments Need One',
          caseStudy: { intro: 'Think about your own pocket money or your family’s monthly expenses: how do you decide if you can afford a new cricket bat or a trip to the cinema?',
            decisions: [{ prompt: 'What are the two main components that make up a government budget?', options: [
                { text: 'The two main components are expected income and planned expenditure', outcome: 'The two main components are expected income and planned expenditure.' },
                { text: 'budget', outcome: 'Not quite — Students often think "budget" means "saving money" or "not spending." In reality, a budget is.', reveals: 'budget-means-saving-money-or' },
                { text: 'spending', outcome: 'Not quite — Students often think "budget" means "saving money" or "not spending." In reality, a budget is.', reveals: 'budget-means-saving-money-or' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch13_024', title: 'Sources of Government Income: Taxes and More',
          caseStudy: { intro: 'Imagine your school needs to buy new library books but doesn\'t have the money.',
            decisions: [{ prompt: 'What is the primary way the government collects money to provide public services?', options: [
                { text: 'The primary way is through taxes', outcome: 'The primary way is through taxes. A wrong answer here suggests the student hasn\'t grasped the basic.' },
                { text: 'infinite', outcome: 'Not quite — Students often think the government has an "infinite" supply of money or that money for public.', reveals: 'the-government-has-an-infinite' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch13_025', title: 'Government Expenditure: Where the Money Goes',
          caseStudy: { intro: 'Imagine your family has a monthly income and needs to decide how much to spend on food, rent, school fees, and savings—this is exactly what a government does.',
            decisions: [{ prompt: 'What is the primary purpose of government expenditure?', options: [
                { text: 'The purpose is to use collected money to provide essential services and public goods to', outcome: 'The purpose is to use collected money to provide essential services and public goods to citizens.' },
                { text: 'Government Money', outcome: 'Not quite — Students often think "Government Money" is an infinite, separate pot of gold that just exists.', reveals: 'government-money-is-an-infinite' },
                { text: '"Government Money" is an infinite, separate pot of gold that just exists', outcome: 'Not quite — Students often think "Government Money" is an infinite, separate pot of gold that just exists.', reveals: 'government-money-is-an-infinite' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch13_026', title: 'Types of Budget: Surplus, Deficit, Balanced',
          caseStudy: { intro: 'Think about your monthly pocket money: if you spend exactly what you receive, your budget is balanced.',
            decisions: [{ prompt: 'What do we call a budget where the government’s income is exactly equal to its expenditure?', options: [
                { text: 'It is called a balanced budget', outcome: 'It is called a balanced budget. A wrong answer here suggests the student confuses "balanced" with.' },
                { text: 'balanced', outcome: 'Not quite — Students often think a "deficit" means the government has no money at all.', reveals: 'a-deficit-means-the-government' },
                { text: 'surplus', outcome: 'Not quite — Students often think a "deficit" means the government has no money at all.', reveals: 'a-deficit-means-the-government' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch13_027', title: 'How the Budget Is Made and Approved',
          caseStudy: { intro: 'Imagine your family is planning a big trip and needs to decide how much money to spend on travel, food, and hotels.',
            decisions: [{ prompt: 'Who is responsible for collecting the requirements from different government departments?', options: [
                { text: 'The Ministry of Finance collects these requirements', outcome: 'The Ministry of Finance collects these requirements. A wrong answer suggests the student thinks one.' },
                { text: 'manager', outcome: 'Not quite — Students often think the government has an "infinite pot of money" and can spend whatever they want.', reveals: 'the-government-has-an-infinite' },
                { text: 'infinite pot of money', outcome: 'Not quite — Students often think the government has an "infinite pot of money" and can spend whatever they want.', reveals: 'the-government-has-an-infinite' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch13_023', title: 'Use it in the wild',
          caseStudy: { intro: 'A city council has a fixed sum of money and two urgent demands — repairing a crumbling park and cleaning a blocked drain. One councillor says, \'Just do a bit of both and announce everything is funded.\'',
            decisions: [{ prompt: 'How does a budget change this conversation?', options: [
                { text: 'A budget forces the council to put income and expenses on paper, match them, and choose openly what to fund first — you cannot promise both if the money covers only one. It turns a vague argument into a stated priority that citizens can see and question.', outcome: 'That is the budget\'s job: it makes trade-offs explicit and public, so the choice between park and drain is argued with numbers instead of promised away with words.' },
                { text: 'The councillor\'s approach works — a government can spend on everything and sort out the money later.', outcome: 'Spending beyond income creates a deficit — money must come from borrowing or new taxes, so \'do a bit of both\' just hides a bill rather than paying it.', reveals: 'spend-now-count-later' },
                { text: 'A budget is just an accounts formality — the real decision is made the same way whether or not one is published.', outcome: 'Publishing the budget is what lets citizens see and challenge the priorities — without it, choices are made in the dark.', reveals: 'budget-is-formality' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch13_027', title: 'You made it',
          caseStudy: { intro: 'You don\'t budget to avoid spending — you budget so the spending makes sense. Every line in the plan is a promise about what the nation values most.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch13_023', difficulty: 'standard',
          question: 'A government budget is a written financial plan that shows how much money the.',
          hint: 'Review the idea of a "household budget" to make the concept of income and spending.',
          misconception: 'Students often think "budget" means "saving money" or "not spending." In reality, a budget is a plan to *spend* money.',
          parts: [
                { id: 'a', prompt: 'What are the two main components that make up a government budget?', answer: 'The two main components are expected income and planned expenditure',
                  options: ['The two main components are expected income and planned expenditure', 'budget', 'spending', 'saving money'],
                  hint: 'Review the idea of a "household budget" to make the concept of income and spending concrete.',
                  misconception: 'Students often think "budget" means "saving money" or "not spending." In reality, a budget is a plan to *spend* money effectively.' },
                { id: 'b', prompt: 'Why do you think a government cannot just spend money whenever it wants without a budget?', answer: 'A budget is necessary to prioritize needs and ensure resources aren\'t wasted',
                  options: ['A budget is necessary to prioritize needs and ensure resources aren\'t wasted', 'because the government has infinite money', 'budget', 'saving money'],
                  hint: 'Review the idea of a "household budget" to make the concept of income and spending concrete.',
                  misconception: 'Students often think "budget" means "saving money" or "not spending." In reality, a budget is a plan to *spend* money effectively.' },
                { id: 'c', prompt: 'Compare a family’s monthly budget to a government’s yearly budget. What is one similarity?', answer: 'Both must balance what comes in with what goes out to avoid running out of money',
                  options: ['Both must balance what comes in with what goes out to avoid running out of money', 'managers', 'budget', 'saving money'],
                  hint: 'Review the idea of a "household budget" to make the concept of income and spending concrete.',
                  misconception: 'Students often think "budget" means "saving money" or "not spending." In reality, a budget is a plan to *spend* money effectively.' }
          ],
            remediations: { 'budget-means-saving-money-or': { steps: ['If a student is stuck, ask them: "If your family wanted to go on a vacation, would you just leave without counting your.', 'Ask them to write down three things the government *must* pay for and three things they *might* want to pay for, then.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch13_023', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "budget" means "saving money" or "not spending." In reality, a budget is a plan to *spend* money.',
          parts: [
                { id: 'a', prompt: 'Is a budget just a list of expenses, or is it something more? Justify your answer.', answer: 'It is more than a list',
                  options: ['It is more than a list', 'budget', 'saving money', 'not spending'],
                  hint: 'Review the idea of a "household budget" to make the concept of income and spending concrete.',
                  misconception: 'Students often think "budget" means "saving money" or "not spending." In reality, a budget is a plan to *spend* money effectively.' }
          ],
            remediations: { 'budget-means-saving-money-or': { steps: ['If a student is stuck, ask them: "If your family wanted to go on a vacation, would you just leave without counting your.', 'Ask them to write down three things the government *must* pay for and three things they *might* want to pay for, then.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch13_024', difficulty: 'standard',
          question: 'Government income refers to the money the state collects to pay for public.',
          hint: 'Review Figure 12.4 in the text to see what services the government actually provides.',
          misconception: 'Students often think the government has an "infinite" supply of money or that money for public services magically.',
          parts: [
                { id: 'a', prompt: 'What is the primary way the government collects money to provide public services?', answer: 'The primary way is through taxes',
                  options: ['The primary way is through taxes', 'infinite'],
                  hint: 'Review Figure 12.4 in the text to see what services the government actually provides.',
                  misconception: 'Students often think the government has an "infinite" supply of money or that money for public services magically appears.' },
                { id: 'b', prompt: 'Why is an income tax called a "direct" tax?', answer: 'It is called "direct"',
                  options: ['It is called "direct"', 'infinite'],
                  hint: 'Review Figure 12.4 in the text to see what services the government actually provides.',
                  misconception: 'Students often think the government has an "infinite" supply of money or that money for public services magically appears.' },
                { id: 'c', prompt: 'If you buy a notebook and pay tax as part of the price, is this a direct or indirect tax? Explain why.', answer: 'This is an indirect tax',
                  options: ['This is an indirect tax', 'direct vs'],
                  hint: 'Review Figure 12.4 in the text to see what services the government actually provides.',
                  misconception: 'Students often think the government has an "infinite" supply of money or that money for public services magically appears.' }
          ],
            remediations: { 'the-government-has-an-infinite': { steps: ['Ask the student: "If the government spent all its money on one project, where would the money for the next one come.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch13_025', difficulty: 'standard',
          question: 'Government expenditure is the process by which the government spends the money.',
          hint: 'Review the concept of "Public Services" (things everyone uses, like parks or roads).',
          misconception: 'Students often think "Government Money" is an infinite, separate pot of gold that just exists.',
          parts: [
                { id: 'a', prompt: 'If the government builds a new highway, which category of expenditure does this fall under?', answer: 'This falls under infrastructure spending',
                  options: ['This falls under infrastructure spending', 'Government Money', '"Government Money" is an infinite, separate pot of gold that just exists'],
                  hint: 'Review the concept of "Public Services" (things everyone uses, like parks or roads).',
                  misconception: 'Students often think "Government Money" is an infinite, separate pot of gold that just exists.' }
          ],
            remediations: { 'government-money-is-an-infinite': { steps: ['First, ask the student, "Who pays the taxes that fill the government\'s pockets?" Guide them to see that the government.', 'Use the "Household Budget" analogy to explain that if the government spends more in one area, it must carefully plan.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch13_026', difficulty: 'standard',
          question: 'A government budget is a financial plan that shows the relationship between.',
          hint: 'Review the list of services provided by the Municipal Corporation in the NCERT text.',
          misconception: 'Students often think a "deficit" means the government has no money at all.',
          parts: [
                { id: 'a', prompt: 'What do we call a budget where the government’s income is exactly equal to its expenditure?', answer: 'It is called a balanced budget',
                  options: ['It is called a balanced budget', 'balanced', 'surplus', 'deficit'],
                  hint: 'Review the list of services provided by the Municipal Corporation in the NCERT text (Figure 12.4).',
                  misconception: 'Students often think a "deficit" means the government has no money at all.' },
                { id: 'b', prompt: 'If a Municipal Corporation earns ₹50 lakhs in taxes but spends ₹60 lakhs on garbage collection and road repairs, what type of budget is this?', answer: 'This is a deficit budget',
                  options: ['This is a deficit budget', 'surplus', 'deficit', 'a "deficit" means the government has no money at all'],
                  hint: 'Review the list of services provided by the Municipal Corporation in the NCERT text (Figure 12.4).',
                  misconception: 'Students often think a "deficit" means the government has no money at all.' },
                { id: 'c', prompt: 'A local council has a surplus budget. What can they do with the extra money?', answer: 'They can save the money for future projects or use it to pay off existing debts',
                  options: ['They can save the money for future projects or use it to pay off existing debts', 'deficit', 'a "deficit" means the government has no money at all'],
                  hint: 'Review the list of services provided by the Municipal Corporation in the NCERT text (Figure 12.4).',
                  misconception: 'Students often think a "deficit" means the government has no money at all.' },
                { id: 'd', prompt: 'Compare a deficit budget to a surplus budget. How does the government\'s action differ in these two cases?', answer: 'In a deficit, the government must borrow money to cover the gap',
                  options: ['In a deficit, the government must borrow money to cover the gap', 'deficit', 'a "deficit" means the government has no money at all'],
                  hint: 'Review the list of services provided by the Municipal Corporation in the NCERT text (Figure 12.4).',
                  misconception: 'Students often think a "deficit" means the government has no money at all.' }
          ],
            remediations: { 'a-deficit-means-the-government': { steps: ['First, clarify that "income" is money coming in.', 'Use a visual: draw a bucket representing "Income" and a hole representing "Expenditure." Explain that if the hole.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch13_027', difficulty: 'standard',
          question: 'The government budget is a formal plan that lists how the government expects.',
          hint: 'Review the roles of different government ministries and the function of the Parliament.',
          misconception: 'Students often think the government has an "infinite pot of money" and can spend whatever they want at any time.',
          parts: [
                { id: 'a', prompt: 'Who is responsible for collecting the requirements from different government departments?', answer: 'The Ministry of Finance collects these requirements',
                  options: ['The Ministry of Finance collects these requirements', 'manager', 'infinite pot of money'],
                  hint: 'Review the roles of different government ministries and the function of the Parliament.',
                  misconception: 'Students often think the government has an "infinite pot of money" and can spend whatever they want at any time.' },
                { id: 'b', prompt: 'How does the Finance Minister involve the legislature in the budget process?', answer: 'The Minister presents the budget to Parliament for discussion and approval',
                  options: ['The Minister presents the budget to Parliament for discussion and approval', 'infinite pot of money'],
                  hint: 'Review the roles of different government ministries and the function of the Parliament.',
                  misconception: 'Students often think the government has an "infinite pot of money" and can spend whatever they want at any time.' }
          ],
            remediations: { 'the-government-has-an-infinite': { steps: ['Ask the student to imagine their own monthly pocket money.', 'Tell them to list three things they want to buy (spending) and then look at the fixed amount of money they actually.', 'Guide them to realize that if their wants exceed their money, they must choose the most important items first.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
