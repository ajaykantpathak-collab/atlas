import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch10_p1: SimDef = {
    id: 'v3_c11_hs_ch10_p1',
    title: 'Money Management and Consumer Education · Part 1/2',
    subtitle: 'Count a family\'s wealth in three currencies, not one.',
    classLevel: 11, subject: 'home_science', topic: 'Money Management and Consumer Education · Part 1/2',
    chapters: ['c11_hs_ch10'],
    nodeIds: ['c11_hs_cbse_10_001', 'c11_hs_cbse_10_002', 'c11_hs_cbse_10_003', 'c11_hs_cbse_10_004', 'c11_hs_cbse_10_005', 'c11_hs_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a family CFO auditing non-money income', intro: 'Renovate the kitchen AND fund college — the money won\'t stretch, but the carpentry, the backyard and the tool library might.', goal: 'Distinguish money, real and psychic income and apply budgeting as a goal-driven plan.' },
    discovery: {
        question: 'Family A earns ₹1 lakh but buys everything in; Family B earns less but has a kitchen garden, a grandmother\'s childcare and a father\'s repair skills. Who\'s richer in living?',
        options: ['Family B — quality of living runs on real and psychic income, not money income alone', 'Family A — money is the only income that counts', 'Family A — services bought are always better', 'Equal — income is income'],
        answer: 'Family B — quality of living runs on real and psychic income, not money income alone',
        hook: 'And a budget isn\'t the plan — it\'s the written output of one; fill in numbers without goals and you\'ve made a spreadsheet, not a decision.',
    },
    teaching: [
        { title: 'Financial Management and Financial Planning: Concept and Purpose', text: 'Financial management is the systematic process of planning, controlling, and evaluating the use of all types of family income (money, real, and psychic) to achieve maximum satisfaction of family.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_10_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Balance a ₹60,000 household budget against a ₹10,000 savings goal, then optimise the Sharma family\'s skills and time toward a ₹5 lakh admission.',
        labels: ['Financial Management and Financial', 'Family Resources: Classification', 'Family Income: Money Income,', 'Money: Functions and Importance', 'Budget: Concept, Purpose', 'Steps in Making'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_001', title: 'Financial Management and Financial Planning: Concept and Purpose',
          caseStudy: { intro: 'Imagine your family receives ₹50,000 this month. Without a plan, you might spend ₹15,000 on a spontaneous gadget purchase, then struggle to pay the electricity.',
            decisions: [{ prompt: 'Define financial management in the context of a family. How does it differ from simply "spending money wisely"?', options: [
                { text: 'Financial management is the systematic process of planning, controlling, and evaluating', outcome: 'Financial management is the systematic process of planning, controlling, and evaluating the use.' },
                { text: 'not wasting money', outcome: 'Not quite — Students conflate "financial planning" with "making a budget" and treat them as identical.', reveals: 'students-conflate-financial-planning-with' },
                { text: 'saving more', outcome: 'Not quite — Students conflate "financial planning" with "making a budget" and treat them as identical.', reveals: 'students-conflate-financial-planning-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_002', title: 'Family Resources: Classification and Optimisation',
          caseStudy: { intro: 'Imagine your family wants to renovate the kitchen but also save for your sibling\'s college fees next year. Where do you begin?',
            decisions: [{ prompt: 'List the three categories of family resources as defined in Home Science and give one concrete example of each category from a typical.', options: [
                { text: 'The three categories are: (1) Human resources', outcome: 'The three categories are: (1) Human resources — e.g., mother\'s tailoring skill, father\'s ability.' },
                { text: 'resources = money', outcome: 'Not quite — Students equate "family resources" exclusively with "money income" and believe optimisation means.', reveals: 'students-equate-family-resources-exclusively' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_003', title: 'Family Income: Money Income, Real Income and Psychic Income',
          caseStudy: { intro: 'Imagine your neighbour Mrs. Sharma earns ₹60,000/month as a teacher (Money Income), grows vegetables on her terrace (Direct Real Income), stitches her family\'s.',
            decisions: [{ prompt: 'Define Money Income, Real Income, and Psychic Income in exactly one sentence each, using terminology from the NCERT Class 11 textbook.', options: [
                { text: 'Money Income: Purchasing power in rupees and paisa received from wages, salary, bonus,', outcome: 'Money Income: Purchasing power in rupees and paisa received from wages, salary, bonus, commission.' },
                { text: 'income adjusted for inflation', outcome: 'Not quite — Students consistently confuse Home Science "Real Income" with the Economics definition (nominal.', reveals: 'students-consistently-confuse-home-science' },
                { text: 'Real Income', outcome: 'Not quite — Students consistently confuse Home Science "Real Income" with the Economics definition (nominal.', reveals: 'students-consistently-confuse-home-science' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_004', title: 'Money: Functions and Importance in Family Life',
          caseStudy: { intro: 'Imagine your family needs to buy a washing machine but the shopkeeper only accepts barter – you would have to find something the shopkeeper wants, like wheat.',
            decisions: [{ prompt: 'State the four functions of money as defined in the NCERT Class 11 textbook.', options: [
                { text: 'The four functions are: (1) Medium of exchange, (2) Measure of value, (3) Standard of', outcome: 'The four functions are: (1) Medium of exchange, (2) Measure of value, (3) Standard of deferred.' },
                { text: 'buying things', outcome: 'Not quite — Students often believe money\'s only function is "buying things" (medium of exchange) and treat the.', reveals: 'money-s-only-function-is' },
                { text: 'saving', outcome: 'Not quite — Students often believe money\'s only function is "buying things" (medium of exchange) and treat the.', reveals: 'money-s-only-function-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_005', title: 'Budget: Concept, Purpose and Success Criteria',
          caseStudy: { intro: 'Imagine your family receives ₹60,000 this month. Without a plan, you might spend ₹25,000 on a smartphone sale, ₹10,000 on a weekend trip, and then panic when.',
            decisions: [{ prompt: 'What is the NCERT definition of a budget, and what are the three specific success criteria mentioned in the textbook for a budget to.', options: [
                { text: 'A budget is defined as "a plan for future expenditure" and "the most common planning', outcome: 'A budget is defined as "a plan for future expenditure" and "the most common planning device for the.' },
                { text: 'a record of past spending', outcome: 'Not quite — Students often think a budget is a record of past spending (expense tracker) rather than.', reveals: 'a-budget-is-a-record' },
                { text: 'high savings rate', outcome: 'Not quite — Students often think a budget is a record of past spending (expense tracker) rather than.', reveals: 'a-budget-is-a-record' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_006', title: 'Steps in Making a Family Budget and Advantages of Budgeting',
          caseStudy: { intro: 'Imagine your family wants to celebrate Diwali next month but also needs to pay school fees and save for your sister\'s college admission next year.',
            decisions: [{ prompt: 'List the five steps of making a family budget in the correct order as per NCERT.', options: [
                { text: 'Correct order: (1) List and group commodities/services needed, (2) Estimate cost of each', outcome: 'Correct order: (1) List and group commodities/services needed, (2) Estimate cost of each category.' },
                { text: 'you need to know how much money you have before deciding what to buy', outcome: 'Not quite — Students believe Step 3 (income estimation) comes *before* Step 1 (listing needs) because "you need.', reveals: 'step-3-income-estimation-comes' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Money Management and Consumer Education · Part 1/2', spots: [
            { id: 's1', label: 'Family Resources Classification and Optimisation', prompt: 'Which idea is this? — Family resources are the assets available to a household at a given time that enable.', answer: 'Family Resources Classification and Optimisation', options: ['Family Resources Classification and Optimisation', 'Family Income Money Income Real Income and Psychic Income', 'Money Functions and Importance in Family Life', 'Budget Concept Purpose and Success Criteria'] },
            { id: 's2', label: 'Family Income Money Income Real Income and Psychic Income', prompt: 'Which idea is this? — Family income is the aggregate monetary and non-monetary inflow available to a household.', answer: 'Family Income Money Income Real Income and Psychic Income', options: ['Family Income Money Income Real Income and Psychic Income', 'Family Resources Classification and Optimisation', 'Money Functions and Importance in Family Life', 'Budget Concept Purpose and Success Criteria'] },
            { id: 's3', label: 'Money Functions and Importance in Family Life', prompt: 'Which idea is this? — Money is any generally accepted medium of exchange that simultaneously functions as.', answer: 'Money Functions and Importance in Family Life', options: ['Money Functions and Importance in Family Life', 'Family Resources Classification and Optimisation', 'Family Income Money Income Real Income and Psychic Income', 'Budget Concept Purpose and Success Criteria'] },
            { id: 's4', label: 'Budget Concept Purpose and Success Criteria', prompt: 'Which idea is this? — A budget is a forward-looking financial plan that systematically estimates a family\'s.', answer: 'Budget Concept Purpose and Success Criteria', options: ['Budget Concept Purpose and Success Criteria', 'Family Resources Classification and Optimisation', 'Family Income Money Income Real Income and Psychic Income', 'Money Functions and Importance in Family Life'] },
            { id: 's5', label: 'Steps in Making a Family Budget and Advantages of Budgeting', prompt: 'Which idea is this? — A family budget is a systematic, written plan that estimates expected income and.', answer: 'Steps in Making a Family Budget and Advantages of Budgeting', options: ['Steps in Making a Family Budget and Advantages of Budgeting', 'Family Resources Classification and Optimisation', 'Family Income Money Income Real Income and Psychic Income', 'Money Functions and Importance in Family Life'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your family gets ₹50,000 this month. A cousin proposes \'financial planning\': copy a template — 50% food, 30% rent, 20% savings — and insists \'resources means money, so optimisation means spending less.\'',
            decisions: [{ prompt: 'What does real financial management add?', options: [
                { text: 'Widen both concepts: planning is the decision process — goals first, then allocations; the budget is merely the written output that makes trade-offs visible (college fund in 2 years, emergency reserve). And resources aren\'t just money: mother\'s skills, the backyard, the community tool library, grandmother\'s childcare all substitute for cash — optimisation is deploying the whole portfolio, not just cutting expenses.', outcome: 'The plan gains purpose: allocations tie to named goals, and non-money resources reduce outflows — a budget that balances but serves no goal is arithmetic, not planning.' },
                { text: 'Use the template — a balanced budget IS the plan, percentages done.', outcome: 'A budget without goals passes arithmetic and fails planning: allocations must answer \'what are we securing?\' — future goals are the plan, the sheet is the record.', reveals: 'budget-is-the-plan' },
                { text: 'Agree resources equal money — parks and skills are nice, but only rupees are real resources.', outcome: 'That misses substitution: community resources and human skills replace monetary outflows — ignoring them leaves the portfolio half-idle.', reveals: 'resources-equal-money' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'Material resources alone are concentration risk — human skill and community assets are the diversification a money-only family lacks.',
            decisions: [{ prompt: 'What comes next? Money Management and Consumer Education · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Money Management and Consumer Education · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_001', difficulty: 'standard',
          question: 'Financial management is the systematic process of planning, controlling, and.',
          hint: 'Revisit the Class 6 Civics nodes on government budgeting (c6_civics_ch13_023.',
          misconception: 'Students conflate "financial planning" with "making a budget" and treat them as identical.',
          parts: [
                { id: 'a', prompt: 'A family grows vegetables in their kitchen garden and the mother stitches clothes for the children. The father earns ₹40,000 monthly salary.', answer: 'Father\'s salary: money income',
                  options: ['Father\'s salary: money income', 'indirect real income'],
                  hint: 'Revisit the Class 6 Civics nodes on government budgeting (c6_civics_ch13_023.',
                  misconception: 'Students conflate "financial planning" with "making a budget" and treat them as identical.' },
                { id: 'b', prompt: 'A family\'s monthly money income is ₹60,000. Their estimated expenses: Food ₹18,000, Housing ₹12,000, Education ₹10,000, Transport ₹5,000, Medical ₹3,000.', answer: 'Step (i): Categories listed',
                  options: ['Step (i): Categories listed', 'increase income'],
                  hint: 'Revisit the Class 6 Civics nodes on government budgeting (c6_civics_ch13_023.',
                  misconception: 'Students conflate "financial planning" with "making a budget" and treat them as identical.' }
          ],
            remediations: { 'students-conflate-financial-planning-with': { steps: ['If a student produces a mechanically balanced but goal-disconnected budget: (1) Ask: "What is this family\'s top three.', '(3) Show where allocations contradict goals (e.g., "Miscellaneous ₹8,000 → no goal link").', '(4) Require reallocation so every rupee traces to a goal or essential need.', '(5) Reinforce: The budget is the MAP; financial planning is the JOURNEY DESIGN.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "financial planning" with "making a budget" and treat them as identical.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "A family with high money income but low real income (few home-produced goods/services) has a lower quality of living than a family.', answer: 'The statement is largely defensible',
                  options: ['The statement is largely defensible', 'most important in terms of quality of living'],
                  hint: 'Revisit the Class 6 Civics nodes on government budgeting (c6_civics_ch13_023.',
                  misconception: 'Students conflate "financial planning" with "making a budget" and treat them as identical.' }
          ],
            remediations: { 'students-conflate-financial-planning-with': { steps: ['If a student produces a mechanically balanced but goal-disconnected budget: (1) Ask: "What is this family\'s top three.', '(3) Show where allocations contradict goals (e.g., "Miscellaneous ₹8,000 → no goal link").', '(4) Require reallocation so every rupee traces to a goal or essential need.', '(5) Reinforce: The budget is the MAP; financial planning is the JOURNEY DESIGN.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_002', difficulty: 'standard',
          question: 'Family resources are the assets available to a household at a given time that.',
          hint: 'Revisit c11_hs_cbse_10_001\'s definition: "Management is using what you have (resources).',
          misconception: 'Students equate "family resources" exclusively with "money income" and believe optimisation means "cutting expenses".',
          parts: [
                { id: 'a', prompt: 'List the three categories of family resources as defined in Home Science and give one concrete example of each category from a typical Indian urban household.', answer: 'The three categories are: (1) Human resources',
                  options: ['The three categories are: (1) Human resources', 'resources = money'],
                  hint: 'Revisit c11_hs_cbse_10_001\'s definition: "Management is using what you have (resources) to achieve.',
                  misconception: 'Students equate "family resources" exclusively with "money income" and believe optimisation means "cutting expenses" or "saving more." They.' },
                { id: 'b', prompt: 'A family has ₹50,000 in savings (material), the mother knows organic gardening (human), and the colony has a composting pit (community).', answer: 'Using savings alone (₹50,000) only converts material resource into vegetables',
                  options: ['Using savings alone (₹50,000) only converts material resource into vegetables', 'just buy vegetables from savings'],
                  hint: 'Revisit c11_hs_cbse_10_001\'s definition: "Management is using what you have (resources) to achieve.',
                  misconception: 'Students equate "family resources" exclusively with "money income" and believe optimisation means "cutting expenses" or "saving more." They.' }
          ],
            remediations: { 'students-equate-family-resources-exclusively': { steps: ['Ask the student to list "everything your family uses in a week that you did not pay cash for" — this surfaces human and.', 'For each item, identify which category it belongs to and what would happen if it disappeared (e.g., if grandmother.', 'Give a mini-case: "Family needs ₹10,000 for medical emergency.', 'Debrief: "Notice how Solution 2 (son freelances using WiFi) uses human+community to *generate* money, while Solution 1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_003', difficulty: 'standard',
          question: 'Family income is the aggregate monetary and non-monetary inflow available to.',
          hint: 'Revisit c11_hs_cbse_10_002 "Family Resources: Classification and Optimisation".',
          misconception: 'Students consistently confuse Home Science "Real Income" with the Economics definition (nominal income adjusted for.',
          parts: [
                { id: 'a', prompt: 'A family receives ₹50,000 monthly salary, grows herbs on their balcony, and the mother stitches school uniforms for the children.', answer: '₹50,000 salary = Money Income',
                  options: ['₹50,000 salary = Money Income', 'Real Income', 'If prices rise 10% and salary rises 5%, Real Income falls'],
                  hint: 'Revisit c11_hs_cbse_10_002 "Family Resources: Classification and Optimisation" — specifically the.',
                  misconception: 'Students consistently confuse Home Science "Real Income" with the Economics definition (nominal income adjusted for inflation / purchasing.' }
          ],
            remediations: { 'students-consistently-confuse-home-science': { steps: ['Explicitly contrast the two definitions side-by-side on a board/paper: Economics Real Income = Nominal Income / Price.', 'Give 5 items (salary, home-grown tomatoes, mother\'s cooking, rented flat, owned flat) and have student classify each.', 'Drill the NCERT phrase "Real income is a flow of goods and services, it is not stagnant" and "consists of goods and.', 'Practice board-style question: "Distinguish between Real Income in Home Science and Real Income in Economics" — require.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_004', difficulty: 'standard',
          question: 'Money is any generally accepted medium of exchange that simultaneously.',
          hint: 'Revisit the classification of family income in c11_hs_cbse_10_003, focusing on the.',
          misconception: 'Students often believe money\'s only function is "buying things" (medium of exchange) and treat the other three.',
          parts: [
                { id: 'a', prompt: 'A family wants to buy a car worth ₹8,00,000. They have ₹2,00,000 savings and take a loan for the rest, repaying ₹15,000/month for 5 years.', answer: 'paying the down payment, (',
                  options: ['paying the down payment, (', 'buying things'],
                  hint: 'Revisit the classification of family income in c11_hs_cbse_10_003, focusing on the definition and.',
                  misconception: 'Students often believe money\'s only function is "buying things" (medium of exchange) and treat the other three as synonyms for saving.' }
          ],
            remediations: { 'money-s-only-function-is': { steps: ['Give the student a family scenario card: "Family X earns ₹50,000/month, wants to buy a ₹10 lakh plot in 3 years."', 'Ask them to write one sentence for *each* function showing how money helps *specifically* in this plan.', 'If they repeat "saving" for multiple functions, pause and say: "Store of value is about the ₹50,000 you keep safely.', 'Have them re-write the four sentences with the correct labels.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_005', difficulty: 'standard',
          question: 'A budget is a forward-looking financial plan that systematically estimates.',
          hint: 'Review the classification of family income (money, real, psychic) in node.',
          misconception: 'Students often think a budget is a record of past spending (expense tracker) rather than a forward-looking plan.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A budget is a forward-looking financial plan that systematically estimates a family\'s',
                  options: ['A budget is a forward-looking financial plan that systematically estimates a family\'s', 'Financial management is the systematic process of planning, controlling, and evaluating', 'Family resources are the assets available to a household at a given time that enable it', 'Family income is the aggregate monetary and non-monetary inflow available to a household'],
                  hint: 'Review the classification of family income (money, real, psychic) in node c11_hs_cbse_10_003 and.',
                  misconception: 'Students often think a budget is a record of past spending (expense tracker) rather than a forward-looking plan.' }
          ],
            remediations: { 'a-budget-is-a-record': { steps: ['If a student confuses budget with expense record: (1) Ask: "Is a travel itinerary the same as a travel diary?".', '(2) Highlight NCERT phrase: "Budget is a plan for future expenditure" – underline \'future\'.', '(3) Walk through the five steps: Step (i) lists future needs, not past expenses.', '(4) Have them create a one-week pocket-money budget before the week starts, then compare with actual spending at week\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_006', difficulty: 'standard',
          question: 'A family budget is a systematic, written plan that estimates expected income.',
          hint: 'Revisit c11_hs_cbse_10_003 (Family Income types) and practice classifying 10 sample.',
          misconception: 'Students believe Step 3 (income estimation) comes *before* Step 1 (listing needs) because "you need to know how much.',
          parts: [
                { id: 'a', prompt: 'A family has assured monthly income of ₹45,000 (salary) and possible income of ₹8,000 (expected bonus). Their estimated expenses total ₹58,000.', answer: 'Gap = ₹58,000 − ₹45,000 = ₹13,000 (using only assured income)',
                  options: ['Gap = ₹58,000 − ₹45,000 = ₹13,000 (using only assured income)', 'necessities from assured income, \'nice but not necessary\' from possible income', 'you need to know how much money you have before deciding what to buy', 'uses the full ₹8,000 possible income to cover necessities (e'],
                  hint: 'Revisit c11_hs_cbse_10_003 (Family Income types) and practice classifying 10 sample receipts.',
                  misconception: 'Students believe Step 3 (income estimation) comes *before* Step 1 (listing needs) because "you need to know how much money you have before.' }
          ],
            remediations: { 'step-3-income-estimation-comes': { steps: ['If a student reverses the steps or produces an income-first budget: (1) Give them a blank sheet and say: "Forget income.', 'Write what your family *actually needs* to survive and thrive this month — every item." (2) After they list 20+ items.', 'Total it." (4) Only now: "Write down every rupee you *know* is coming." (5) Compare totals.', 'If expenses > assured income, ask: "Which *non-essential* heads can shrink?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
