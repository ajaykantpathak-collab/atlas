import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch10_p2: SimDef = {
    id: 'v3_c11_hs_ch10_p2',
    title: 'Money Management and Consumer Education · Part 2/2',
    subtitle: 'Count a family\'s wealth in three currencies, not one.',
    classLevel: 11, subject: 'home_science', topic: 'Money Management and Consumer Education · Part 2/2',
    chapters: ['c11_hs_ch10'],
    nodeIds: ['c11_hs_cbse_10_007', 'c11_hs_cbse_10_008', 'c11_hs_cbse_10_009', 'c11_hs_cbse_10_010', 'c11_hs_cbse_10_011', 'c11_hs_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a family CFO auditing non-money income', intro: 'Renovate the kitchen AND fund college — the money won\'t stretch, but the carpentry, the backyard and the tool library might.', goal: 'Distinguish money, real and psychic income and apply budgeting as a goal-driven plan.' },
    discovery: {
        question: 'Family A earns ₹1 lakh but buys everything in; Family B earns less but has a kitchen garden, a grandmother\'s childcare and a father\'s repair skills. Who\'s richer in living?',
        options: ['Family B — quality of living runs on real and psychic income, not money income alone', 'Family A — money is the only income that counts', 'Family A — services bought are always better', 'Equal — income is income'],
        answer: 'Family B — quality of living runs on real and psychic income, not money income alone',
        hook: 'And a budget isn\'t the plan — it\'s the written output of one; fill in numbers without goals and you\'ve made a spreadsheet, not a decision.',
    },
    teaching: [
        { title: 'Control and Record Keeping in Money Management', text: 'Control in money management is the systematic process of monitoring actual expenditure against budgeted allocations through checking mechanisms (mental and mechanical) and formal record-keeping.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_10_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Balance a ₹60,000 household budget against a ₹10,000 savings goal, then optimise the Sharma family\'s skills and time toward a ₹5 lakh admission.',
        labels: ['Control and Record Keeping', 'Evaluation in Money Management', 'Savings: Concept, Importance', 'Investment: Definition, Distinction from', 'Savings and Investment Avenues', 'Credit: Concept, Need'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_007', title: 'Control and Record Keeping in Money Management',
          caseStudy: { intro: 'Imagine your family budgeted ₹15,000 for food this month, but by the 20th you\'ve already spent ₹14,500. How would you know this early enough to adjust?',
            decisions: [{ prompt: 'What are the two main types of control checks in money management described in the NCERT textbook?', options: [
                { text: 'The two main types are: (1) Mental and mechanical checks, and (2) Records and accounts', outcome: 'The two main types are: (1) Mental and mechanical checks, and (2) Records and accounts.' },
                { text: 'planning and evaluation', outcome: 'Not quite — Students believe "control" means strictly preventing any overspending, so they view any budget.', reveals: 'control-means-strictly-preventing-any' },
                { text: 'control', outcome: 'Not quite — Students believe "control" means strictly preventing any overspending, so they view any budget.', reveals: 'control-means-strictly-preventing-any' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_008', title: 'Evaluation in Money Management: Criteria and Process',
          caseStudy: { intro: 'Imagine your family planned to spend ₹15,000 on food last month but actually spent ₹18,500. The budget shows a ₹3,500 overspend — but is that a failure?',
            decisions: [{ prompt: 'A family budgeted ₹8,000 for medical expenses but spent ₹12,000 due to an unexpected hospitalization.', options: [
                { text: 'No, this is incorrect evaluation', outcome: 'No, this is incorrect evaluation because unexpected emergencies are explicitly meant to be covered.' },
                { text: 'allow for emergencies', outcome: 'Not quite — Students believe evaluation means checking if actual spending exactly matches the budget (zero.', reveals: 'evaluation-means-checking-if-actual' },
                { text: 'mistake', outcome: 'Not quite — Students believe evaluation means checking if actual spending exactly matches the budget (zero.', reveals: 'evaluation-means-checking-if-actual' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_10_009', title: 'Savings: Concept, Importance and Determinants',
          scaffold: { problem: 'The Sharma family has a monthly money income of ₹85,000. Their essential expenses are: Food ₹18,000, Housing ₹12,000, Transport ₹6,000.',
            steps: [
            { text: 'Calculate total essential expenses = ₹18,000 + ₹12,000 + ₹6,000 + ₹4,000 + ₹9,000 + ₹5,000 + ₹3,000 = ₹57,000.' },
            { text: 'Calculate current total expenditure = Essential ₹57,000 + Discretionary ₹15,000 = ₹72,000.' },
            { text: 'Calculate current savings = Income ₹85,000 − Expenditure ₹72,000 = ₹13,000/month.' },
            { text: 'Calculate maximum possible savings (ability) = Income ₹85,000 − Essential ₹57,000 = ₹28,000/month.' },
            { text: 'Calculate required savings for Goal 1 = ₹2,00,000 ÷ 18 months = ₹11,111/month.' },
            { text: 'Compare: Required ₹11,111 < Current savings ₹13,000 → Goal 1 feasible *without* cutting discretionary spending.' },
            { text: 'Sacrifice ratio if funded from discretionary = Required ₹11,111 ÷ Discretionary ₹15,000 = 74.1% (but not needed since.', faded: true, blankAnswer: '(a) ₹13,000/month, (b) ₹28,000/month, (c) ₹11,111/month.' }
            ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_010', title: 'Investment: Definition, Distinction from Savings and Principles of Sound Investment',
          caseStudy: { intro: 'Imagine your family has ₹50,000 saved after a year of careful budgeting.',
            decisions: [{ prompt: 'Define investment in your own words and state how it differs from savings in terms of the fate of the principal amount.', options: [
                { text: 'Investment is committing saved money to assets (financial or physical) expecting future', outcome: 'Investment is committing saved money to assets (financial or physical) expecting future income.' },
                { text: 'investment also keeps principal safe', outcome: 'Not quite — Students conflate "physical assets like gold and property" with "investment" in the economic sense.', reveals: 'students-conflate-physical-assets-like' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_011', title: 'Savings and Investment Avenues Available in India',
          caseStudy: { intro: 'Imagine your family has just received a ₹2 lakh annual bonus. Your parents ask you to help decide where to put this money so it grows safely for your younger.',
            decisions: [{ prompt: 'Name any four savings/investment avenues available in India that offer a sovereign (government) guarantee on the principal amount.', options: [
                { text: 'Public Provident Fund (PPF), National Savings Certificate (NSC), Senior Citizens Savings', outcome: 'Public Provident Fund (PPF), National Savings Certificate (NSC), Senior Citizens Savings Scheme.' },
                { text: 'regulated by RBI/SEBI', outcome: 'Not quite — Students treat "Post Office schemes" as a single homogeneous product, not realizing that NSC, KVP.', reveals: 'students-treat-post-office-schemes' },
                { text: 'sovereign guarantee on principal', outcome: 'Not quite — Students treat "Post Office schemes" as a single homogeneous product, not realizing that NSC, KVP.', reveals: 'students-treat-post-office-schemes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_012', title: 'Credit: Concept, Need and the Four Cs of Credit',
          caseStudy: { intro: 'Imagine your family wants to buy a refrigerator costing ₹35,000 but only has ₹10,000 in savings.',
            decisions: [{ prompt: 'Define credit in your own words and explain the meaning of the Latin word \'CREDO\' from which it is derived.', options: [
                { text: 'Credit is an arrangement to obtain money, goods, or services now and pay for them in the', outcome: 'Credit is an arrangement to obtain money, goods, or services now and pay for them in the future.' },
                { text: 'credit means free money', outcome: 'Not quite — Students conflate **Capital** and **Collateral**, thinking they are the same because both relate.', reveals: 'students-conflate-capital-and-collateral' },
                { text: 'credit is same as savings', outcome: 'Not quite — Students conflate **Capital** and **Collateral**, thinking they are the same because both relate.', reveals: 'students-conflate-capital-and-collateral' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'Money Management and Consumer Education · Part 2/2', spots: [
            { id: 's1', label: 'Control and Record Keeping in Money Management', prompt: 'Which idea is this? — Control in money management is the systematic process of monitoring actual expenditure.', answer: 'Control and Record Keeping in Money Management', options: ['Control and Record Keeping in Money Management', 'Evaluation in Money Management Criteria and Process', 'Savings Concept Importance and Determinants', 'Savings and Investment Avenues Available in India'] },
            { id: 's2', label: 'Evaluation in Money Management Criteria and Process', prompt: 'Which idea is this? — Evaluation in money management is the systematic process of assessing whether financial.', answer: 'Evaluation in Money Management Criteria and Process', options: ['Evaluation in Money Management Criteria and Process', 'Control and Record Keeping in Money Management', 'Savings Concept Importance and Determinants', 'Savings and Investment Avenues Available in India'] },
            { id: 's3', label: 'Savings Concept Importance and Determinants', prompt: 'Which idea is this? — Savings is the portion of current money income (or other resources) that a family.', answer: 'Savings Concept Importance and Determinants', options: ['Savings Concept Importance and Determinants', 'Control and Record Keeping in Money Management', 'Evaluation in Money Management Criteria and Process', 'Savings and Investment Avenues Available in India'] },
            { id: 's4', label: 'Savings and Investment Avenues Available in India', prompt: 'Which idea is this? — Savings and investment avenues are specific financial instruments or schemes offered.', answer: 'Savings and Investment Avenues Available in India', options: ['Savings and Investment Avenues Available in India', 'Control and Record Keeping in Money Management', 'Evaluation in Money Management Criteria and Process', 'Savings Concept Importance and Determinants'] },
            { id: 's5', label: 'Credit Concept Need and the Four Cs of Credit', prompt: 'Which idea is this? — Credit is a financial arrangement where a borrower receives money, goods, or services.', answer: 'Credit Concept Need and the Four Cs of Credit', options: ['Credit Concept Need and the Four Cs of Credit', 'Control and Record Keeping in Money Management', 'Evaluation in Money Management Criteria and Process', 'Savings Concept Importance and Determinants'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your family gets ₹50,000 this month. A cousin proposes \'financial planning\': copy a template — 50% food, 30% rent, 20% savings — and insists \'resources means money, so optimisation means spending less.\'',
            decisions: [{ prompt: 'What does real financial management add?', options: [
                { text: 'Widen both concepts: planning is the decision process — goals first, then allocations; the budget is merely the written output that makes trade-offs visible (college fund in 2 years, emergency reserve). And resources aren\'t just money: mother\'s skills, the backyard, the community tool library, grandmother\'s childcare all substitute for cash — optimisation is deploying the whole portfolio, not just cutting expenses.', outcome: 'The plan gains purpose: allocations tie to named goals, and non-money resources reduce outflows — a budget that balances but serves no goal is arithmetic, not planning.' },
                { text: 'Use the template — a balanced budget IS the plan, percentages done.', outcome: 'A budget without goals passes arithmetic and fails planning: allocations must answer \'what are we securing?\' — future goals are the plan, the sheet is the record.', reveals: 'budget-is-the-plan' },
                { text: 'Agree resources equal money — parks and skills are nice, but only rupees are real resources.', outcome: 'That misses substitution: community resources and human skills replace monetary outflows — ignoring them leaves the portfolio half-idle.', reveals: 'resources-equal-money' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_10_012', title: 'You made it',
          caseStudy: { intro: 'Material resources alone are concentration risk — human skill and community assets are the diversification a money-only family lacks.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_007', difficulty: 'standard',
          question: 'Control in money management is the systematic process of monitoring actual.',
          hint: 'Revisit "Steps in Making a Budget" (c11_hs_cbse_10_006) — specifically step (iv).',
          misconception: 'Students believe "control" means strictly preventing any overspending, so they view any budget variance as personal.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between a mental check and a mechanical check in money management. Give one concrete example of each from a student\'s daily life.', answer: 'A mental check is a cognitive process: visualizing what specific items a budget',
                  options: ['A mental check is a cognitive process: visualizing what specific items a budget', 'mental check is thinking, mechanical check is writing', 'control'],
                  hint: 'Revisit "Steps in Making a Budget" (c11_hs_cbse_10_006) — specifically step (iv) balancing.',
                  misconception: 'Students believe "control" means strictly preventing any overspending, so they view any budget variance as personal failure.' },
                { id: 'b', prompt: 'A family allocated ₹9,000 for "Food" in their November budget.', answer: 'Total spent = ₹3,800 + ₹1,600 + ₹2,100 + ₹1,200 + ₹1,500 = ₹10,200',
                  options: ['Total spent = ₹3,800 + ₹1,600 + ₹2,100 + ₹1,200 + ₹1,500 = ₹10,200', 'no adjustment needed, month is almost over', 'control'],
                  hint: 'Revisit "Steps in Making a Budget" (c11_hs_cbse_10_006) — specifically step (iv) balancing.',
                  misconception: 'Students believe "control" means strictly preventing any overspending, so they view any budget variance as personal failure.' },
                { id: 'c', prompt: 'Compare the single-sheet record method and the mechanical check (envelope system) for a family with highly irregular income — a farmer who receives lump-sum.', answer: 'The single-sheet method is more suitable',
                  options: ['The single-sheet method is more suitable', 'control'],
                  hint: 'Revisit "Steps in Making a Budget" (c11_hs_cbse_10_006) — specifically step (iv) balancing.',
                  misconception: 'Students believe "control" means strictly preventing any overspending, so they view any budget variance as personal failure.' }
          ],
            remediations: { 'control-means-strictly-preventing-any': { steps: ['Show the textbook lines: "Adjustments may be needed if the original planning was poor because of factors beyond the.', 'Reframe variance as useful data, not judgment: "The record told you where money went — that\'s control working."', 'Practice with a scenario: "Your bike repair costs ₹2,000 unplanned.', 'Emphasize the control cycle: Check → Record → Compare → Adjust. The adjust step is mandatory, not optional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "control" means strictly preventing any overspending, so they view any budget variance as personal.',
          parts: [
                { id: 'a', prompt: '"Record keeping is only useful for identifying where a family has overspent." Critique this statement using at least three specific advantages of record.', answer: 'The statement is false',
                  options: ['The statement is false', 'control'],
                  hint: 'Revisit "Steps in Making a Budget" (c11_hs_cbse_10_006) — specifically step (iv) balancing.',
                  misconception: 'Students believe "control" means strictly preventing any overspending, so they view any budget variance as personal failure.' }
          ],
            remediations: { 'control-means-strictly-preventing-any': { steps: ['Show the textbook lines: "Adjustments may be needed if the original planning was poor because of factors beyond the.', 'Reframe variance as useful data, not judgment: "The record told you where money went — that\'s control working."', 'Practice with a scenario: "Your bike repair costs ₹2,000 unplanned.', 'Emphasize the control cycle: Check → Record → Compare → Adjust. The adjust step is mandatory, not optional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_008', difficulty: 'standard',
          question: 'Evaluation in money management is the systematic process of assessing whether.',
          hint: 'If stuck, revisit the single-sheet record method (Figure 1, NCERT page 194) and practice.',
          misconception: 'Students believe evaluation means checking if actual spending exactly matches the budget (zero variance), and any.',
          parts: [
                { id: 'a', prompt: 'A family budgeted ₹8,000 for medical expenses but spent ₹12,000 due to an unexpected hospitalization.', answer: 'No, this is incorrect evaluation',
                  options: ['No, this is incorrect evaluation', 'allow for emergencies', 'mistake', 'satisfaction derived from expenditures'],
                  hint: 'If stuck, revisit the single-sheet record method (Figure 1, NCERT page 194) and practice entering.',
                  misconception: 'Students believe evaluation means checking if actual spending exactly matches the budget (zero variance), and any deviation is a "mistake.".' },
                { id: 'b', prompt: 'Explain in your own words why "satisfaction derived from expenditures" is considered a criterion for evaluating a budget, even though satisfaction.', answer: 'Satisfaction (psychic income) is the ultimate purpose of spending',
                  options: ['Satisfaction (psychic income) is the ultimate purpose of spending', 'the most important in terms of quality of living', 'mistake', 'satisfaction derived from expenditures'],
                  hint: 'If stuck, revisit the single-sheet record method (Figure 1, NCERT page 194) and practice entering.',
                  misconception: 'Students believe evaluation means checking if actual spending exactly matches the budget (zero variance), and any deviation is a "mistake.".' },
                { id: 'c', prompt: 'A family\'s monthly budget and actuals for three categories are: | Category | Budgeted (₹) | Actual (₹) | |----------|--------------|------------| | Food |.', answer: 'Food: +₹1,800 (+15%)',
                  options: ['Food: +₹1,800 (+15%)', 'identifying categories where expenditure is too high or too low', 'mistake', 'satisfaction derived from expenditures'],
                  hint: 'If stuck, revisit the single-sheet record method (Figure 1, NCERT page 194) and practice entering.',
                  misconception: 'Students believe evaluation means checking if actual spending exactly matches the budget (zero variance), and any deviation is a "mistake.".' }
          ],
            remediations: { 'evaluation-means-checking-if-actual': { steps: ['Have the student re-read NCERT page 194-195 and highlight the four explicit evaluation goals (fair value, pay bills.', 'Give them a case where every category has a variance but all four goals are met — ask them to evaluate.', 'Contrast with a case where actuals match budget perfectly but the family borrowed for an emergency — ask them.', 'Guide them to articulate: "Evaluation judges outcomes against goals, not actuals against plans."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_009', difficulty: 'standard',
          question: 'Savings is the portion of current money income (or other resources) that.',
          hint: 'If unable to calculate disposable income, revisit c11_hs_cbse_10_006 Step 3 (estimating.',
          misconception: 'Students believe "savings = income − expenditure" is a complete definition, treating the residual as automatically.',
          parts: [
                { id: 'a', prompt: 'Ramesh\'s family (monthly income ₹45,000) and Suresh\'s family (monthly income ₹90,000) both spend ₹35,000 on essential expenses.', answer: 'Step 1: Ramesh income = ₹45,000',
                  options: ['Step 1: Ramesh income = ₹45,000', 'savings = income − expenditure'],
                  hint: 'If unable to calculate disposable income, revisit c11_hs_cbse_10_006 Step 3 (estimating assured.',
                  misconception: 'Students believe "savings = income − expenditure" is a complete definition, treating the residual as automatically savings.' },
                { id: 'b', prompt: 'Compare the following two statements and identify which reflects a deeper understanding of the relationship between savings and capital formation.', answer: 'Correct answer: Statement B reflects deeper understanding',
                  options: ['Correct answer: Statement B reflects deeper understanding', 'savings = income − expenditure'],
                  hint: 'If unable to calculate disposable income, revisit c11_hs_cbse_10_006 Step 3 (estimating assured.',
                  misconception: 'Students believe "savings = income − expenditure" is a complete definition, treating the residual as automatically savings.' }
          ],
            remediations: { 'savings-income-expenditure-is-a': { steps: ['If a student gives the residual definition, do NOT just repeat the correct definition.', 'Instead: (1) Give two scenarios — Scenario A: "I have ₹500 left because I forgot to buy snacks." Scenario B: "I put.', 'Why?" (2) Force identification of the three missing elements in Scenario A: no intent, no purpose, no plan.', '(3) Show the NCERT line: "Saving for saving\'s sake is futile." (4) Ask: "If Scenario A\'s ₹500 stays in the drawer for 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_010', difficulty: 'standard',
          question: 'Investment is the deployment of saved money into financial or physical assets.',
          hint: 'If stuck, revisit the budget-surplus calculation in c11_hs_cbse_10_005 and the.',
          misconception: 'Students conflate "physical assets like gold and property" with "investment" in the economic sense, believing any asset.',
          parts: [
                { id: 'a', prompt: 'A family puts ₹1,00,000 in a bank fixed deposit at 6% p.a. and another ₹1,00,000 in a residential plot expecting 12% p.a. appreciation.', answer: 'The fixed deposit is savings channelled into a financial asset',
                  options: ['The fixed deposit is savings channelled into a financial asset', 'it gives high returns'],
                  hint: 'If stuck, revisit the budget-surplus calculation in c11_hs_cbse_10_005 and the distinction between.',
                  misconception: 'Students conflate "physical assets like gold and property" with "investment" in the economic sense, believing any asset that appreciates.' },
                { id: 'b', prompt: 'Compare the risk-return-liquidity trade-off between a Public Provident Fund (15-year lock-in, 7.1% tax-free) and a Liquid Mutual Fund (no lock-in, ~6.5%.', answer: 'For (i) retirement in 20 years: PPF wins',
                  options: ['For (i) retirement in 20 years: PPF wins', 'liquidity', 'easy accessibility'],
                  hint: 'If stuck, revisit the budget-surplus calculation in c11_hs_cbse_10_005 and the distinction between.',
                  misconception: 'Students conflate "physical assets like gold and property" with "investment" in the economic sense, believing any asset that appreciates.' }
          ],
            remediations: { 'students-conflate-physical-assets-like': { steps: ['Ask the student to list three things they own that "grow in value" (gold, house, FD).', 'For each, ask: "Does this create new jobs, factories, or goods in the economy?"', 'Show NCERT line: "physical assets... not productive in economic sense".', 'Contrast with FD: "bank lends your FD to a business → new machine → capital formation".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_011', difficulty: 'standard',
          question: 'Savings and investment avenues are specific financial instruments or schemes.',
          hint: 'Revisit the "Principles underlying sound investments" section in the Investment node.',
          misconception: 'Students treat "Post Office schemes" as a single homogeneous product, not realizing that NSC, KVP, SCSS, SSY, MIS, and.',
          parts: [
                { id: 'a', prompt: 'Compare National Savings Certificate (NSC) and Kisan Vikas Patra (KVP) on: (a) tenure, (b) tax treatment of interest, (c) premature withdrawal rules, (d).', answer: 'tenure, (',
                  options: ['tenure, (', 'both are same because both are post office schemes'],
                  hint: 'Revisit the "Principles underlying sound investments" section in the Investment node.',
                  misconception: 'Students treat "Post Office schemes" as a single homogeneous product, not realizing that NSC, KVP, SCSS, SSY, MIS, and Time Deposits have.' }
          ],
            remediations: { 'students-treat-post-office-schemes': { steps: ['Have the student create a one-page comparison table with columns: Scheme, Issuer, Tenure, Current Rate, Interest Payout.', 'Fill it using the latest India Post / bank website data.', 'Then give three family profiles (young couple, senior citizen, girl child) and ask them to pick the best two schemes.', 'This forces parameter-wise analysis instead of name-recall.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_10_012', difficulty: 'standard',
          question: 'Credit is a financial arrangement where a borrower receives money, goods,.',
          hint: 'If stuck on Capacity vs. Capital, revisit the budget node (c11_hs_cbse_10_005) and the.',
          misconception: 'Students conflate **Capital** and **Collateral**, thinking they are the same because both relate to "assets." They.',
          parts: [
                { id: 'a', prompt: 'A family earns ₹50,000/month and spends ₹45,000 on essential expenses. They want a ₹5 lakh home loan. The bank asks for their property papers as security.', answer: 'Capacity and Collateral are being assessed',
                  options: ['Capacity and Collateral are being assessed', 'Character is assessed', 'Capital is the property papers'],
                  hint: 'If stuck on Capacity vs. Capital, revisit the budget node (c11_hs_cbse_10_005) and the savings node.',
                  misconception: 'Students conflate **Capital** and **Collateral**, thinking they are the same because both relate to "assets." They answer: "Capital is the.' },
                { id: 'b', prompt: 'Compare and contrast: Why do self-help groups (SHGs) often lend without collateral while commercial banks insist on it?', answer: 'Banks rely on Collateral as a legal safeguard against default',
                  options: ['Banks rely on Collateral as a legal safeguard against default', 'SHGs don\'t need collateral', 'Banks have more money'],
                  hint: 'If stuck on Capacity vs. Capital, revisit the budget node (c11_hs_cbse_10_005) and the savings node.',
                  misconception: 'Students conflate **Capital** and **Collateral**, thinking they are the same because both relate to "assets." They answer: "Capital is the.' }
          ],
            remediations: { 'students-conflate-capital-and-collateral': { steps: ['Ask the student to write the textbook definitions of Capital and Collateral side-by-side.', 'Give a concrete scenario: "Family owns a ₹50 lakh house (₹20 lakh loan outstanding), ₹5 lakh FD, ₹2 lakh car.', 'Have them calculate Capital (₹50L + ₹5L + ₹2L – ₹20L = ₹37L) and identify Collateral (₹5L FD only).', 'Ask: "If they default on the personal loan, what does the bank take?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
