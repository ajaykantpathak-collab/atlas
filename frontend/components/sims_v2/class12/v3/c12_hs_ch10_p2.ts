import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch10_p2: SimDef = {
    id: 'v3_c12_hs_ch10_p2',
    title: 'Meal Planning · Part 2/2',
    subtitle: 'Same potato twice — three principles broken',
    classLevel: 12, subject: 'home_science', topic: 'Meal Planning · Part 2/2',
    chapters: ['c12_hs_ch10'],
    nodeIds: ['c12_hs_cbse_10_007', 'c12_hs_cbse_10_008', 'c12_hs_cbse_10_009', 'c12_hs_cbse_10_010', 'c12_hs_cbse_10_011', 'c12_hs_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Family meal planner', intro: 'Four people, four different needs, one kitchen — meal planning is the framework that turns science into plates.', goal: 'Apply the five principles of meal planning — balance, variety, moderation, adequacy, economy — to real Indian menus.' },
    discovery: {
        question: 'Dal, roti, potato sabzi at lunch — then roti, dal, potato sabzi again at dinner. The family\'s fed, so what\'s wrong with this menu?',
        options: ['It fails three principles at once — no variety (potato twice), no fruit or milk group, and no moderation in the oil; feeding people isn\'t the same as planning meals', 'Nothing — it\'s healthy food', 'Potato is a vegetable', 'Indians eat this daily'],
        answer: 'It fails three principles at once — no variety (potato twice), no fruit or milk group, and no moderation in the oil; feeding people isn\'t the same as planning meals',
        hook: 'Variety isn\'t decoration — nutritionally, no single food carries every nutrient; psychologically, monotony kills appetite, especially in children and elders. And the food pyramid is a starting grid, not a guarantee: it speaks to a reference adult, not your anaemic mother or hypertensive father.',
    },
    teaching: [
        { title: 'Meal Planning for Infants and Preschool Children', text: 'Meal planning for infants (0–12 months) and preschool children (1–6 years) is the systematic process of selecting and scheduling age-appropriate foods to meet the specific nutrient requirements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Plan a real family week: run balance, variety, moderation, adequacy and economy across four different bodies, and catch the violations hiding in an ordinary thali.',
        labels: ['Meal Planning for Infants', 'Meal Planning for School-Age', 'Meal Planning for Adults', 'Meal Planning for Low-Cost,', 'Therapeutic Meal Planning: Diabetic', 'Food Budgeting and Cost'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_10_008', title: 'Meal Planning for School-Age Children and Adolescents',
          caseStudy: { intro: 'Imagine a 14-year-old girl who skips breakfast, survives on samosas and cold drinks at school, and feels dizzy during afternoon sports — her haemoglobin is 9.8.',
            decisions: [{ prompt: 'A Class 12 student writes: "The RDA for iron for a 15-year-old boy and a 15-year-old girl is the same because they are the same age.".', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. According to ICMR 2020, the RDA for iron for a 15-year-old boy is 22.' },
                { text: 'meal planning for adolescents = adult meal planning + larger portions', outcome: 'Not quite — Students believe "meal planning for adolescents = adult meal planning + larger portions." This.', reveals: 'meal-planning-for-adolescents-adult' },
                { text: 'Give 3 chapatis instead of 2, add extra dal', outcome: 'Not quite — Students believe "meal planning for adolescents = adult meal planning + larger portions." This.', reveals: 'meal-planning-for-adolescents-adult' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_10_009', title: 'Meal Planning for Adults and the Elderly',
          caseStudy: { intro: 'Imagine your 68-year-old grandmother has been diagnosed with early osteoporosis and hypertension.',
            decisions: [{ prompt: 'State the ICMR 2020 RDA for calcium for an elderly woman (60+ years) and explain why it is higher than that for an adult woman (18-59.', options: [
                { text: 'The ICMR 2020 RDA for calcium for an elderly woman (60+ years) is 1000 mg/day, while for', outcome: 'The ICMR 2020 RDA for calcium for an elderly woman (60+ years) is 1000 mg/day, while for an adult.' },
                { text: 'meal planning for elderly is just reducing portion sizes of adult meals', outcome: 'Not quite — Students often think "meal planning for elderly is just reducing portion sizes of adult meals.".', reveals: 'meal-planning-for-elderly-is' },
                { text: 'Give half roti, half dal, half vegetable to elderly', outcome: 'Not quite — Students often think "meal planning for elderly is just reducing portion sizes of adult meals.".', reveals: 'meal-planning-for-elderly-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_10_010', title: 'Meal Planning for Low-Cost, Medium-Cost and High-Cost Budgets',
          scaffold: { problem: 'Plan a low-cost lunch menu for a sedentary adult woman (lunch RDA: 570 kcal, 16.5g protein) using only these foods with prices: wheat flour.',
            steps: [
            { text: 'Set target nutrients: 570 kcal, 16.5g protein. Choose cereal-pulse base 3:1 ratio for protein quality.' },
            { text: 'Estimate raw weights: wheat 75g (250 kcal, 9g protein), Bengal gram 30g raw (100 kcal, 6g protein).' },
            { text: 'Add vegetables for vitamins/fiber: spinach 100g (25 kcal, 2g protein, cost ₹4.00), potato 50g (40 kcal, 1g protein.' },
            { text: 'Add fat for energy density and palatability: oil 10g (90 kcal, cost ₹1.10).' },
            { text: 'Energy still short of 570 kcal. Add 15g wheat (50 kcal, 1.8g protein, ₹0.45).', faded: true, blankAnswer: 'Menu: Wheat chapati (90g), Bengal gram dal (30g raw).' }
            ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_10_011', title: 'Therapeutic Meal Planning: Diabetic and Hypertensive Diet Plans',
          caseStudy: { intro: 'Imagine your 55-year-old uncle has just been diagnosed with both Type 2 diabetes (HbA1c 8.2%) and Stage 1 hypertension (BP 145/92).',
            decisions: [{ prompt: 'A 60-year-old male with Type 2 diabetes is prescribed an 1800 kcal diet with 55% energy from carbohydrates.', options: [
                { text: 'Correct answer: 16.5 exchanges (rounded to 16 or 17 exchanges distributed across meals)', outcome: 'Correct answer: 16.5 exchanges (rounded to 16 or 17 exchanges distributed across meals).' },
                { text: 'diabetic diet = sugar-free', outcome: 'Not quite — Students believe "diabetic diet = sugar-free" and "hypertensive diet = salt-free" — leading to two.', reveals: 'diabetic-diet-sugar-free-and' },
                { text: 'hypertensive diet = salt-free', outcome: 'Not quite — Students believe "diabetic diet = sugar-free" and "hypertensive diet = salt-free" — leading to two.', reveals: 'diabetic-diet-sugar-free-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_10_012', title: 'Food Budgeting and Cost Calculation for Family Meals',
          scaffold: { problem: 'A family of three (father: moderate work, mother: sedentary, child 8 years) has a monthly food budget of ₹9,000.',
            steps: [
            { text: 'Daily budget = ₹9,000 ÷ 30 = ₹300/day.' },
            { text: 'Calculate total servings per group: Cereals = (1.2 + 0.9 + 0.8) × 10 = 2.9 × 10 = 29 servings.' },
            { text: 'Convert servings to raw quantities (using standard serving sizes: cereal 30 g, pulse 30 g, milk 100 mL, veg 100.' },
            { text: 'Apply hypothetical prices (₹/kg or ₹/L): Wheat flour ₹30, Rice ₹40, Mixed pulses ₹100, Milk ₹60, Potatoes ₹20, Spinach.' },
            { text: 'Sum = 30.45+18+36+6+12+15+15+9+2.70 = ₹144.15. This is well within ₹300, leaving ₹155.85 for spices, condiments.', faded: true, blankAnswer: 'Daily budget ₹300; estimated daily food cost ₹144.15.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'Meal Planning · Part 2/2', spots: [
            { id: 's1', label: 'Meal Planning for Infants and Preschool Children', prompt: 'Which idea is this? — Meal planning for infants (0–12 months) and preschool children (1–6 years) is the.', answer: 'Meal Planning for Infants and Preschool Children', options: ['Meal Planning for Infants and Preschool Children', 'Meal Planning for School-Age Children and Adolescents', 'Meal Planning for Adults and the Elderly', 'Meal Planning for Low-Cost Medium-Cost and High-Cost Budgets'] },
            { id: 's2', label: 'Meal Planning for School-Age Children and Adolescents', prompt: 'Which idea is this? — Meal planning for school-age children (7-12 years) and adolescents (13-19 years) is the.', answer: 'Meal Planning for School-Age Children and Adolescents', options: ['Meal Planning for School-Age Children and Adolescents', 'Meal Planning for Infants and Preschool Children', 'Meal Planning for Adults and the Elderly', 'Meal Planning for Low-Cost Medium-Cost and High-Cost Budgets'] },
            { id: 's3', label: 'Meal Planning for Adults and the Elderly', prompt: 'Which idea is this? — Meal planning for adults and the elderly involves designing daily dietary patterns that.', answer: 'Meal Planning for Adults and the Elderly', options: ['Meal Planning for Adults and the Elderly', 'Meal Planning for Infants and Preschool Children', 'Meal Planning for School-Age Children and Adolescents', 'Meal Planning for Low-Cost Medium-Cost and High-Cost Budgets'] },
            { id: 's4', label: 'Meal Planning for Low-Cost Medium-Cost and High-Cost Budgets', prompt: 'Which idea is this? — Meal planning for different budget levels involves designing nutritionally adequate menus.', answer: 'Meal Planning for Low-Cost Medium-Cost and High-Cost Budgets', options: ['Meal Planning for Low-Cost Medium-Cost and High-Cost Budgets', 'Meal Planning for Infants and Preschool Children', 'Meal Planning for School-Age Children and Adolescents', 'Meal Planning for Adults and the Elderly'] },
            { id: 's5', label: 'Food Budgeting and Cost Calculation for Family Meals', prompt: 'Which idea is this? — Food budgeting is the systematic process of estimating and allocating financial resources.', answer: 'Food Budgeting and Cost Calculation for Family Meals', options: ['Food Budgeting and Cost Calculation for Family Meals', 'Meal Planning for Infants and Preschool Children', 'Meal Planning for School-Age Children and Adolescents', 'Meal Planning for Adults and the Elderly'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your hostel mess serves an identical thali to everyone. The state-level footballer finishes still hungry while the sedentary day-scholar leaves half — and the warden calls it \'fair: same food for all.\'',
            decisions: [{ prompt: 'What do the factors affecting meal planning say about \'same for all\'?', options: [
                { text: 'Fair isn\'t identical — age, activity and economics set each person\'s RDA; the athlete\'s energy and protein needs run roughly a thousand calories above the sedentary student\'s, so identical plates underfeed one and overfeed the other; equity means portioning to need within the same budget.', outcome: 'The chapter\'s logic chain — age and activity → RDA → servings → cost — exists so menus match bodies, not uniforms; \'same food for all\' is equal input, not fair nutrition.' },
                { text: 'Keep the identical thali — standardisation is how messes stay within budget.', outcome: 'Budget is one of the three factors, not the only one — the RDA gap is real regardless of the constraint; the chapter\'s own method is low-cost nutrient-dense substitutions, not flattening every need to the mean.', reveals: 'uniform-equals-fair' },
                { text: 'Just give the athletes a second thali — extra food solves the gap.', outcome: 'Doubling doubles the budget line without matching the actual RDA difference; the method is to scale servings by computed requirement — arithmetic, not a duplicate plate.', reveals: 'double-portion-equals-science' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_10_012', title: 'You made it',
          caseStudy: { intro: 'You can now plan meals as nutrient architecture — and hear the difference between feeding people and nourishing them.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_007', difficulty: 'standard',
          question: 'Meal planning for infants (0–12 months) and preschool children (1–6 years).',
          hint: 'If stuck, review c11_hs_cbse_08_003 (infant RDAs) and c11_hs_cbse_08_008 (preschool RDAs).',
          misconception: '"Preschool children need smaller portions of exactly the same foods as adults." Students often plan a preschooler’s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Meal planning for infants (0–12 months) and preschool children (1–6 years) is the',
                  options: ['Meal planning for infants (0–12 months) and preschool children (1–6 years) is the', 'Meal planning is the systematic process of designing daily or weekly menus that meet the', 'Factors affecting meal planning are the variables that determine the type, quantity,', 'The ICMR (Indian Council of Medical Research) food group system classifies foods into'],
                  hint: 'If stuck, review c11_hs_cbse_08_003 (infant RDAs) and c11_hs_cbse_08_008 (preschool RDAs) tables.',
                  misconception: '"Preschool children need smaller portions of exactly the same foods as adults." Students often plan a preschooler’s menu by simply halving.' }
          ],
            remediations: { 'preschool-children-need-smaller-portions': { steps: ['If a student cannot differentiate adult vs.', 'child portion logic: (1) Revisit c11_hs_cbse_08_008 (Nutritional Requirements of Preschool Children) and.', '(2) Practice converting adult recipes to child versions: reduce salt/sugar, increase nutrient density (add milk powder.', '(3) Re-diagnostic: Plan a day’s menu for a 4-year-old using the "My Plate for Preschoolers" visual guide (half plate.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_008', difficulty: 'standard',
          question: 'Meal planning for school-age children (7-12 years) and adolescents (13-19.',
          hint: 'If unable to perform exchange calculations, revisit c12_hs_cbse_10_005 (Food Exchange.',
          misconception: 'Students believe "meal planning for adolescents = adult meal planning + larger portions." This is wrong because: (1).',
          parts: [
                { id: 'a', prompt: 'A Class 12 student writes: "The RDA for iron for a 15-year-old boy and a 15-year-old girl is the same because they are the same age." Is this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'meal planning for adolescents = adult meal planning + larger portions', 'Give 3 chapatis instead of 2, add extra dal', '"meal planning for adolescents = adult meal planning + larger portions'],
                  hint: 'If unable to perform exchange calculations, revisit c12_hs_cbse_10_005 (Food Exchange Lists) and.',
                  misconception: 'Students believe "meal planning for adolescents = adult meal planning + larger portions." This is wrong because: (1) Adolescents have.' },
                { id: 'b', prompt: 'Design a 400 kcal, 12g protein, 5mg iron evening snack for a 16-year-old male athlete (training 2 hrs/day) using only these ingredients: roasted chana (100g.', answer: 'Let x = g roasted chana, y = g jaggery, z = g peanuts, w = g amaranth leaves',
                  options: ['Let x = g roasted chana, y = g jaggery, z = g peanuts, w = g amaranth leaves', 'meal planning for adolescents = adult meal planning + larger portions', 'Give 3 chapatis instead of 2, add extra dal', '"meal planning for adolescents = adult meal planning + larger portions'],
                  hint: 'If unable to perform exchange calculations, revisit c12_hs_cbse_10_005 (Food Exchange Lists) and.',
                  misconception: 'Students believe "meal planning for adolescents = adult meal planning + larger portions." This is wrong because: (1) Adolescents have.' }
          ],
            remediations: { 'meal-planning-for-adolescents-adult': { steps: ['If a student cannot differentiate adolescent from adult nutrient density requirements: Step 1 — Revisit.', 'Step 2 — Calculate nutrient density (mg/1000kcal) for iron, calcium, protein for each age-sex group using ICMR 2020.', 'Step 3 — Compare with a standard adult menu\'s nutrient density — show numerically where dilution occurs.', 'Step 4 — Re-attempt Diagnostic Question 1 and 4 with this quantitative lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "meal planning for adolescents = adult meal planning + larger portions." This is wrong because: (1).',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since adolescents have high energy needs, adding sugar-sweetened beverages and fried snacks to their diet is an acceptable way to meet.', answer: 'The claim is nutritionally unsound',
                  options: ['The claim is nutritionally unsound', 'energy adequacy', 'nutritional adequacy', 'meal planning for adolescents = adult meal planning + larger portions'],
                  hint: 'If unable to perform exchange calculations, revisit c12_hs_cbse_10_005 (Food Exchange Lists) and.',
                  misconception: 'Students believe "meal planning for adolescents = adult meal planning + larger portions." This is wrong because: (1) Adolescents have.' },
                { id: 'b', prompt: 'Create a one-week tiffin planner for a 13-year-old vegetarian boy (RDA: 2450 kcal, 54g protein, 35mg iron, 850mg calcium) that: (a) uses ≤3 food exchanges per.', answer: '| Day | Menu | Exchanges Used | Key Nutrient Highlight |',
                  options: ['| Day | Menu | Exchanges Used | Key Nutrient Highlight |', 'meal planning for adolescents = adult meal planning + larger portions', 'Give 3 chapatis instead of 2, add extra dal', '"meal planning for adolescents = adult meal planning + larger portions'],
                  hint: 'If unable to perform exchange calculations, revisit c12_hs_cbse_10_005 (Food Exchange Lists) and.',
                  misconception: 'Students believe "meal planning for adolescents = adult meal planning + larger portions." This is wrong because: (1) Adolescents have.' }
          ],
            remediations: { 'meal-planning-for-adolescents-adult': { steps: ['If a student cannot differentiate adolescent from adult nutrient density requirements: Step 1 — Revisit.', 'Step 2 — Calculate nutrient density (mg/1000kcal) for iron, calcium, protein for each age-sex group using ICMR 2020.', 'Step 3 — Compare with a standard adult menu\'s nutrient density — show numerically where dilution occurs.', 'Step 4 — Re-attempt Diagnostic Question 1 and 4 with this quantitative lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_009', difficulty: 'standard',
          question: 'Meal planning for adults and the elderly involves designing daily dietary.',
          hint: 'If stuck, revisit food exchange list calculations (c12_hs_cbse_10_005) and adult RDA.',
          misconception: 'Students often think "meal planning for elderly is just reducing portion sizes of adult meals." This is wrong because.',
          parts: [
                { id: 'a', prompt: 'An elderly man with hypertension is advised to restrict sodium to 2000 mg/day.', answer: 'Total salt = 3 g = 3000 mg',
                  options: ['Total salt = 3 g = 3000 mg', 'meal planning for elderly is just reducing portion sizes of adult meals', 'Give half roti, half dal, half vegetable to elderly', '"meal planning for elderly is just reducing portion sizes of adult meals'],
                  hint: 'If stuck, revisit food exchange list calculations (c12_hs_cbse_10_005) and adult RDA values.',
                  misconception: 'Students often think "meal planning for elderly is just reducing portion sizes of adult meals." This is wrong because: (1) Elderly need.' }
          ],
            remediations: { 'meal-planning-for-elderly-is': { steps: ['Show ICMR RDA table comparing adult vs elderly — highlight calcium (800→1000 mg), vitamin D (400→600 IU), fibre (25→30.', 'Give a case study of a 70-year-old woman with osteoporosis and constipation; ask student to plan a 1600 kcal menu.', 'Demonstrate a correct menu using nutrient-dense swaps (ragi, milk, GLV, whole pulses) and texture modifications.', 'Re-test with a similar case but different condition (e.g., hypertension + dental loss) to confirm transfer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_010', difficulty: 'standard',
          question: 'Meal planning for different budget levels involves designing nutritionally.',
          hint: 'If stuck on cost calculation, revisit c12_hs_cbse_10_005 (Food Exchange Lists) and.',
          misconception: 'Students believe "low-cost meal planning" means simply reducing portion sizes of a normal menu, or that "high-cost".',
          parts: [
                { id: 'a', prompt: 'List the three budget categories for meal planning and give one typical food item that distinguishes each category from the others.', answer: 'The three categories are low-cost, medium-cost, and high-cost budgets',
                  options: ['The three categories are low-cost, medium-cost, and high-cost budgets', 'cheap, moderate, expensive', 'low-cost meal planning', 'high-cost'],
                  hint: 'If stuck on cost calculation, revisit c12_hs_cbse_10_005 (Food Exchange Lists) and practice.',
                  misconception: 'Students believe "low-cost meal planning" means simply reducing portion sizes of a normal menu, or that "high-cost" automatically means.' },
                { id: 'b', prompt: 'Compare the nutrient density per rupee of three protein sources for a low-cost menu: (a) whole Bengal gram (₹100/kg, 20g protein/100g), (b) egg (₹6/piece, 6g.', answer: 'whole Bengal gram (₹100/kg, 20g protein/100g), (',
                  options: ['whole Bengal gram (₹100/kg, 20g protein/100g), (', 'eggs are protein-rich', 'low-cost meal planning', 'high-cost'],
                  hint: 'If stuck on cost calculation, revisit c12_hs_cbse_10_005 (Food Exchange Lists) and practice.',
                  misconception: 'Students believe "low-cost meal planning" means simply reducing portion sizes of a normal menu, or that "high-cost" automatically means.' }
          ],
            remediations: { 'low-cost-meal-planning-means': { steps: ['If the student cannot distinguish budget categories by nutrient strategy, do: (1) Revisit node c12_hs_cbse_10_003 (Food.', '(2) Revisit node c12_hs_cbse_10_005 (Food Exchange Lists) to practice substituting foods within groups while tracking.', '(3) Complete this re-diagnostic: "Using exchange lists, convert a medium-cost lunch (chapati, dal, sabzi, curd).', 'Calculate new cost and protein." If protein drops >10%, repeat with adjusted weights until both cost and protein.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_011', difficulty: 'standard',
          question: 'Therapeutic meal planning for diabetes and hypertension involves designing.',
          hint: 'If unable to convert meals to exchanges instantly, revisit c12_hs_cbse_10_005 and.',
          misconception: 'Students believe "diabetic diet = sugar-free" and "hypertensive diet = salt-free" — leading to two dangerous errors.',
          parts: [
                { id: 'a', prompt: 'Explain why a diabetic patient is advised to choose whole fruits over fruit juices, and why a hypertensive patient is advised to choose fresh vegetables over.', answer: 'Correct answer: For diabetes',
                  options: ['Correct answer: For diabetes', 'both are less processed so both are healthier', 'diabetic diet = sugar-free', 'hypertensive diet = salt-free'],
                  hint: 'If unable to convert meals to exchanges instantly, revisit c12_hs_cbse_10_005 and practice with 10.',
                  misconception: 'Students believe "diabetic diet = sugar-free" and "hypertensive diet = salt-free" — leading to two dangerous errors: (1) Using artificial.' },
                { id: 'b', prompt: 'Compare and contrast the role of dietary fiber in diabetes management versus hypertension management.', answer: 'Correct answer: In diabetes',
                  options: ['Correct answer: In diabetes', 'fiber lowers both sugar and BP', 'diabetic diet = sugar-free', 'hypertensive diet = salt-free'],
                  hint: 'If unable to convert meals to exchanges instantly, revisit c12_hs_cbse_10_005 and practice with 10.',
                  misconception: 'Students believe "diabetic diet = sugar-free" and "hypertensive diet = salt-free" — leading to two dangerous errors: (1) Using artificial.' }
          ],
            remediations: { 'diabetic-diet-sugar-free-and': { steps: ['Revisit c12_hs_cbse_10_005 (Food Exchange Lists) — practice converting 5 common Indian meals into exchanges until you.', 'Memorize the salt-to-sodium conversion (1g salt = 400mg Na) and the sodium content of 10 high-sodium Indian foods.', 'Re-do Diagnostic Q3 and Q5 with a timer — if you cannot complete the calculation + clinical critique in 8 minutes.', 'Create a "dual-condition modification table" for 5 staple Indian meals (e.g., aloo paratha → multigrain roti + less oil.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_012', difficulty: 'standard',
          question: 'Food budgeting is the systematic process of estimating and allocating financial.',
          hint: 'If stuck, revisit c12_hs_cbse_10_004 (RDA tables and balanced diet translation) and.',
          misconception: 'Students often treat food budgeting as a single arithmetic division (total budget ÷ days ÷ family members) and then try.',
          parts: [
                { id: 'a', prompt: 'Explain why simply dividing the daily food budget equally among family members (e.g., ₹500 ÷ 4 = ₹125 per person) is an incorrect approach to meal planning.', answer: 'Correct explanation: Nutritional needs vary by age, sex, activity level, and',
                  options: ['Correct explanation: Nutritional needs vary by age, sex, activity level, and', 'it\'s fair to divide equally'],
                  hint: 'If stuck, revisit c12_hs_cbse_10_004 (RDA tables and balanced diet translation) and.',
                  misconception: 'Students often treat food budgeting as a single arithmetic division (total budget ÷ days ÷ family members) and then try to fit meals into.' }
          ],
            remediations: { 'students-often-treat-food-budgeting': { steps: ['If a student cannot move from RDAs to a costed menu: (1) Revisit c12_hs_cbse_10_004 to practice converting RDAs into.', '(2) Revisit c12_hs_cbse_10_005 to practice using food exchange lists to substitute items within a group while keeping.', '(3) Do a guided exercise: give a fixed menu, ask them to cost it step-by-step with a price list, then ask them.', '(4) Re-diagnose with a simpler version of Diagnostic Question 3 (single recipe costing) before attempting full-day.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
