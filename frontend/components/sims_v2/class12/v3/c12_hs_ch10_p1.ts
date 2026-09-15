import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch10_p1: SimDef = {
    id: 'v3_c12_hs_ch10_p1',
    title: 'Meal Planning · Part 1/2',
    subtitle: 'Same potato twice — three principles broken',
    classLevel: 12, subject: 'home_science', topic: 'Meal Planning · Part 1/2',
    chapters: ['c12_hs_ch10'],
    nodeIds: ['c12_hs_cbse_10_001', 'c12_hs_cbse_10_002', 'c12_hs_cbse_10_003', 'c12_hs_cbse_10_004', 'c12_hs_cbse_10_005', 'c12_hs_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Family meal planner', intro: 'Four people, four different needs, one kitchen — meal planning is the framework that turns science into plates.', goal: 'Apply the five principles of meal planning — balance, variety, moderation, adequacy, economy — to real Indian menus.' },
    discovery: {
        question: 'Dal, roti, potato sabzi at lunch — then roti, dal, potato sabzi again at dinner. The family\'s fed, so what\'s wrong with this menu?',
        options: ['It fails three principles at once — no variety (potato twice), no fruit or milk group, and no moderation in the oil; feeding people isn\'t the same as planning meals', 'Nothing — it\'s healthy food', 'Potato is a vegetable', 'Indians eat this daily'],
        answer: 'It fails three principles at once — no variety (potato twice), no fruit or milk group, and no moderation in the oil; feeding people isn\'t the same as planning meals',
        hook: 'Variety isn\'t decoration — nutritionally, no single food carries every nutrient; psychologically, monotony kills appetite, especially in children and elders. And the food pyramid is a starting grid, not a guarantee: it speaks to a reference adult, not your anaemic mother or hypertensive father.',
    },
    teaching: [
        { title: 'Meal Planning: Definition, Objectives and Principles', text: 'Meal planning is the systematic process of designing daily or weekly menus that meet the nutritional requirements of individuals or groups while considering factors such as age, sex, activity level.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Plan a real family week: run balance, variety, moderation, adequacy and economy across four different bodies, and catch the violations hiding in an ordinary thali.',
        labels: ['Meal Planning: Definition, Objectives', 'Factors Affecting Meal Planning', 'Food Groups: ICMR Classification', 'Balanced Diet: Concept', 'Food Exchange Lists: Concept', 'Meal Planning for Pregnant'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_10_001', title: 'Meal Planning: Definition, Objectives and Principles',
          caseStudy: { intro: 'Imagine you are helping your mother plan a week’s meals for your family of four: your father (office worker, 45), your mother (homemaker, 42), your 16-year-old.',
            decisions: [{ prompt: 'Define meal planning in one sentence using the terms "nutritional adequacy", "food groups", and "RDA".', options: [
                { text: 'Meal planning is the process of selecting and combining foods from different food groups', outcome: 'Meal planning is the process of selecting and combining foods from different food groups.' },
                { text: 'food groups', outcome: 'Not quite — Students often think "meal planning = writing a menu" and equate *balance* with "including all food.', reveals: 'meal-planning-writing-a-menu' },
                { text: 'meal planning = writing a menu', outcome: 'Not quite — Students often think "meal planning = writing a menu" and equate *balance* with "including all food.', reveals: 'meal-planning-writing-a-menu' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_10_002', title: 'Factors Affecting Meal Planning: Age, Activity and Economic Status',
          caseStudy: { intro: 'Imagine you are planning a week’s meals for a family of four: a 70‑year‑old grandfather with arthritis, a 35‑year‑old mother who works a desk job,.',
            decisions: [{ prompt: 'State the three primary factors that affect meal planning according to the Class 12 Home Science curriculum.', options: [
                { text: 'The three primary factors are age, activity level, and economic status', outcome: 'The three primary factors are age, activity level, and economic status.' },
                { text: 'climate', outcome: 'Not quite — Students often believe that “economic status only limits the *quantity* of food, not the.', reveals: 'economic-status-only-limits-the' },
                { text: 'religion', outcome: 'Not quite — Students often believe that “economic status only limits the *quantity* of food, not the.', reveals: 'economic-status-only-limits-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_10_003', title: 'Food Groups: ICMR Classification and Nutrient Contributions',
          caseStudy: { intro: 'Imagine you are designing a day\'s menu for a hostel mess serving 200 adolescents.',
            decisions: [{ prompt: 'Name the five ICMR food groups and give one staple Indian example for each.', options: [
                { text: 'Correct answer: 1) Cereals & Millets', outcome: 'Correct answer: 1) Cereals & Millets — wheat/rice; 2) Pulses & Legumes — toor dal/chana; 3) Milk &.' },
                { text: 'proteins', outcome: 'Not quite — Students treat ICMR food groups as rigid "containers" — e.g., "potato is a vegetable so it belongs.', reveals: 'students-treat-icmr-food-groups' },
                { text: 'proteins" as a group', outcome: 'Not quite — Students treat ICMR food groups as rigid "containers" — e.g., "potato is a vegetable so it belongs.', reveals: 'students-treat-icmr-food-groups' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_10_004', title: 'Balanced Diet: Concept and Components for Different Age Groups',
          caseStudy: { intro: 'Imagine you are a dietitian asked to plan a day\'s meals for three clients: a 10-month-old infant, a 14-year-old adolescent girl, and a 70-year-old man with.',
            decisions: [{ prompt: 'State the ICMR 2020 RDA for energy (kcal/day) and protein (g/day) for a 10-year-old boy and a 10-year-old girl.', options: [
                { text: 'Correct answer: 10-year-old boy: 1970 kcal, 35 g protein', outcome: 'Correct answer: 10-year-old boy: 1970 kcal, 35 g protein; 10-year-old girl: 1740 kcal, 35.' },
                { text: 'balanced diet', outcome: 'Not quite — Students believe "balanced diet" means eating equal quantities from each food group every day.', reveals: 'balanced-diet-means-eating-equal' },
                { text: '"balanced diet" means eating equal quantities from each food group every day', outcome: 'Not quite — Students believe "balanced diet" means eating equal quantities from each food group every day.', reveals: 'balanced-diet-means-eating-equal' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_10_005', title: 'Food Exchange Lists: Concept and Use in Meal Planning',
          scaffold: { problem: 'A 35-year-old woman with BMI 28 is prescribed a 1500 kcal weight-loss diet with 50% carb, 20% protein, 30% fat.',
            steps: [
            { text: 'Calculate total macronutrient targets in kcal and grams. Carb = 1500 × 0.50 = 750 kcal = 187.5g.' },
            { text: 'Account for fixed exchanges. 2 Milk = 200kcal, 24gC, 12gP, 12gF. 3 Fat = 135kcal, 15gF.' },
            { text: 'Set up equations for variable exchanges (C=cereal, P=pulse, V=vegetable, F=fruit, S=sugar).' },
            { text: 'Solve iteratively for whole numbers. Prioritize protein: need 63g from C+P+V.' },
            { text: 'Final distribution: Cereal 7, Pulse 5, Vegetable 4, Fruit 1, Sugar 1, Milk 2, Fat 3. Total exchanges = 23.', faded: true, blankAnswer: 'Cereal 7, Pulse 5, Vegetable 4, Fruit 1, Sugar 1, Milk 2.' }
            ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_10_006', title: 'Meal Planning for Pregnant and Lactating Women',
          caseStudy: { intro: 'Imagine your cousin in her 28th week of pregnancy complains of constant heartburn, avoids milk due to bloating, and her Hb is 9.8 g/dL — how would you redesign.',
            decisions: [{ prompt: 'A pregnant woman in her 2nd trimester has a pre-pregnancy body weight of 55 kg and sedentary activity level.', options: [
                { text: 'Correct answer: 2250 kcal', outcome: 'Correct answer: 2250 kcal. Calculation: Pre-pregnancy RDA for 55 kg sedentary woman = 1900 kcal.' },
                { text: 'eating for two', outcome: 'Not quite — Students believe "eating for two" means doubling portion sizes of usual foods.', reveals: 'eating-for-two-means-doubling' },
                { text: '"eating for two" means doubling portion sizes of usual foods', outcome: 'Not quite — Students believe "eating for two" means doubling portion sizes of usual foods.', reveals: 'eating-for-two-means-doubling' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Meal Planning · Part 1/2', spots: [
            { id: 's1', label: 'Meal Planning Definition Objectives and Principles', prompt: 'Which idea is this? — Meal planning is the systematic process of designing daily or weekly menus that meet the.', answer: 'Meal Planning Definition Objectives and Principles', options: ['Meal Planning Definition Objectives and Principles', 'Food Groups ICMR Classification and Nutrient Contributions', 'Food Exchange Lists Concept and Use in Meal Planning', 'Meal Planning for Pregnant and Lactating Women'] },
            { id: 's2', label: 'Food Groups ICMR Classification and Nutrient Contributions', prompt: 'Which idea is this? — The ICMR (Indian Council of Medical Research) food group system classifies foods into.', answer: 'Food Groups ICMR Classification and Nutrient Contributions', options: ['Food Groups ICMR Classification and Nutrient Contributions', 'Meal Planning Definition Objectives and Principles', 'Food Exchange Lists Concept and Use in Meal Planning', 'Meal Planning for Pregnant and Lactating Women'] },
            { id: 's3', label: 'Food Exchange Lists Concept and Use in Meal Planning', prompt: 'Which idea is this? — Food Exchange Lists are a meal planning tool that categorizes foods into groups.', answer: 'Food Exchange Lists Concept and Use in Meal Planning', options: ['Food Exchange Lists Concept and Use in Meal Planning', 'Meal Planning Definition Objectives and Principles', 'Food Groups ICMR Classification and Nutrient Contributions', 'Meal Planning for Pregnant and Lactating Women'] },
            { id: 's4', label: 'Meal Planning for Pregnant and Lactating Women', prompt: 'Which idea is this? — Meal planning for pregnant and lactating women is the systematic design of daily diets.', answer: 'Meal Planning for Pregnant and Lactating Women', options: ['Meal Planning for Pregnant and Lactating Women', 'Meal Planning Definition Objectives and Principles', 'Food Groups ICMR Classification and Nutrient Contributions', 'Food Exchange Lists Concept and Use in Meal Planning'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your hostel mess serves an identical thali to everyone. The state-level footballer finishes still hungry while the sedentary day-scholar leaves half — and the warden calls it \'fair: same food for all.\'',
            decisions: [{ prompt: 'What do the factors affecting meal planning say about \'same for all\'?', options: [
                { text: 'Fair isn\'t identical — age, activity and economics set each person\'s RDA; the athlete\'s energy and protein needs run roughly a thousand calories above the sedentary student\'s, so identical plates underfeed one and overfeed the other; equity means portioning to need within the same budget.', outcome: 'The chapter\'s logic chain — age and activity → RDA → servings → cost — exists so menus match bodies, not uniforms; \'same food for all\' is equal input, not fair nutrition.' },
                { text: 'Keep the identical thali — standardisation is how messes stay within budget.', outcome: 'Budget is one of the three factors, not the only one — the RDA gap is real regardless of the constraint; the chapter\'s own method is low-cost nutrient-dense substitutions, not flattening every need to the mean.', reveals: 'uniform-equals-fair' },
                { text: 'Just give the athletes a second thali — extra food solves the gap.', outcome: 'Doubling doubles the budget line without matching the actual RDA difference; the method is to scale servings by computed requirement — arithmetic, not a duplicate plate.', reveals: 'double-portion-equals-science' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now plan meals as nutrient architecture — and hear the difference between feeding people and nourishing them.',
            decisions: [{ prompt: 'What comes next? Meal Planning · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Meal Planning · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_001', difficulty: 'standard',
          question: 'Meal planning is the systematic process of designing daily or weekly menus that.',
          hint: 'Revisit c11_hs_cbse_03_007 (RDA) and c11_hs_cbse_03_008 (Food Groups) — make a table.',
          misconception: 'Students often think "meal planning = writing a menu" and equate *balance* with "including all food groups in every.',
          parts: [
                { id: 'a', prompt: 'Explain why "variety" is a principle of meal planning. Give two distinct reasons — one nutritional, one psychosocial.', answer: 'Nutritional reason: No single food provides all essential nutrients',
                  options: ['Nutritional reason: No single food provides all essential nutrients', 'to get all nutrients', 'meal planning = writing a menu', 'including all food groups in every meal'],
                  hint: 'Revisit c11_hs_cbse_03_007 (RDA) and c11_hs_cbse_03_008 (Food Groups) — make a table: Food Group |.',
                  misconception: 'Students often think "meal planning = writing a menu" and equate *balance* with "including all food groups in every meal".' },
                { id: 'b', prompt: 'A family of four (two adults, two adolescents) plans a day’s menu: breakfast — aloo paratha with curd; lunch — rice, dal, potato sabzi; dinner — roti, dal.', answer: 'Violations: (1) *Variety*',
                  options: ['Violations: (1) *Variety*', 'potato repeated', 'meal planning = writing a menu', 'including all food groups in every meal'],
                  hint: 'Revisit c11_hs_cbse_03_007 (RDA) and c11_hs_cbse_03_008 (Food Groups) — make a table: Food Group |.',
                  misconception: 'Students often think "meal planning = writing a menu" and equate *balance* with "including all food groups in every meal".' },
                { id: 'c', prompt: 'Compare the objectives of meal planning for a low-income rural family versus a high-income urban family.', answer: 'Similarities: (1) Both aim for nutritional adequacy (meeting RDA)',
                  options: ['Similarities: (1) Both aim for nutritional adequacy (meeting RDA)', 'rich people eat more protein', 'meal planning = writing a menu', 'including all food groups in every meal'],
                  hint: 'Revisit c11_hs_cbse_03_007 (RDA) and c11_hs_cbse_03_008 (Food Groups) — make a table: Food Group |.',
                  misconception: 'Students often think "meal planning = writing a menu" and equate *balance* with "including all food groups in every meal".' }
          ],
            remediations: { 'meal-planning-writing-a-menu': { steps: ['If the student confuses per-meal balance with daily balance, do this: (1) Show the ICMR "Balanced Diet for Adult.', '(2) Have them take a sample day’s intake and tally food group servings against the table.', '(3) Ask: "If you eat fruit at breakfast, do you need fruit again at lunch?" Guide them to see daily totals matter.', '(4) Re-do Diagnostic Question 3 with this lens — they should now spot that the original menu *could* be balanced.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_002', difficulty: 'standard',
          question: 'Factors affecting meal planning are the variables that determine the type.',
          hint: 'If stuck, review the ICMR 2020 RDA summary table in Class 11 node c11_hs_cbse_03_007 and.',
          misconception: 'Students often believe that “economic status only limits the *quantity* of food, not the *quality*”.',
          parts: [
                { id: 'a', prompt: 'State the three primary factors that affect meal planning according to the Class 12 Home Science curriculum.', answer: 'The three primary factors are age, activity level, and economic status',
                  options: ['The three primary factors are age, activity level, and economic status', 'climate', 'religion', 'food preferences'],
                  hint: 'If stuck, review the ICMR 2020 RDA summary table in Class 11 node c11_hs_cbse_03_007 and practice.',
                  misconception: 'Students often believe that “economic status only limits the *quantity* of food, not the *quality*”.' },
                { id: 'b', prompt: 'Compare the meal planning adjustments required for (a) an elderly person (70 yrs) with low activity and (b) a preschool child (4 yrs) with high activity.', answer: 'an elderly person (70 yrs) with low activity and (',
                  options: ['an elderly person (70 yrs) with low activity and (', 'economic status only limits the *quantity* of food, not the *quality*', '“economic status only limits the *quantity* of food, not the *quality*”'],
                  hint: 'If stuck, review the ICMR 2020 RDA summary table in Class 11 node c11_hs_cbse_03_007 and practice.',
                  misconception: 'Students often believe that “economic status only limits the *quantity* of food, not the *quality*”.' }
          ],
            remediations: { 'economic-status-only-limits-the': { steps: ['If a student exhibits this misconception: 1.', 'Revisit c12_hs_cbse_10_001 (Meal Planning Principles) to review the principle of “nutrient density” and “adequacy”.', 'Re‑read ICMR RDA tables for protein, iron, calcium across age/activity groups (node c11_hs_cbse_03_007).', 'Practice one “low‑cost nutrient‑dense substitution” exercise: take a standard meal and replace each expensive item with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that “economic status only limits the *quantity* of food, not the *quality*”.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “Economic status is the only factor that determines what a family eats; age and activity are irrelevant if money is limited.”', answer: 'The statement is false',
                  options: ['The statement is false', 'food access', 'nutritional adequacy', 'economic status only limits the *quantity* of food, not the *quality*'],
                  hint: 'If stuck, review the ICMR 2020 RDA summary table in Class 11 node c11_hs_cbse_03_007 and practice.',
                  misconception: 'Students often believe that “economic status only limits the *quantity* of food, not the *quality*”.' },
                { id: 'b', prompt: 'Design a one‑day meal plan for a 30‑year‑old female construction worker (heavy activity) from a low‑income household (₹100/day food budget).', answer: 'A good answer includes: - Early morning: Tea with milk (50 ml) + 2 biscuits',
                  options: ['A good answer includes: - Early morning: Tea with milk (50 ml) + 2 biscuits', 'economic status only limits the *quantity* of food, not the *quality*', '“economic status only limits the *quantity* of food, not the *quality*”'],
                  hint: 'If stuck, review the ICMR 2020 RDA summary table in Class 11 node c11_hs_cbse_03_007 and practice.',
                  misconception: 'Students often believe that “economic status only limits the *quantity* of food, not the *quality*”.' }
          ],
            remediations: { 'economic-status-only-limits-the': { steps: ['If a student exhibits this misconception: 1.', 'Revisit c12_hs_cbse_10_001 (Meal Planning Principles) to review the principle of “nutrient density” and “adequacy”.', 'Re‑read ICMR RDA tables for protein, iron, calcium across age/activity groups (node c11_hs_cbse_03_007).', 'Practice one “low‑cost nutrient‑dense substitution” exercise: take a standard meal and replace each expensive item with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_003', difficulty: 'standard',
          question: 'The ICMR (Indian Council of Medical Research) food group system classifies.',
          hint: 'If stuck, review c11_hs_cbse_03_003 (nutrient definitions) and c11_hs_cbse_03_008 (basic.',
          misconception: 'Students treat ICMR food groups as rigid "containers" — e.g., "potato is a vegetable so it belongs only in Fruits &.',
          parts: [
                { id: 'a', prompt: 'Name the five ICMR food groups and give one staple Indian example for each.', answer: 'Correct answer: 1) Cereals & Millets',
                  options: ['Correct answer: 1) Cereals & Millets', 'proteins', 'proteins" as a group'],
                  hint: 'If stuck, review c11_hs_cbse_03_003 (nutrient definitions) and c11_hs_cbse_03_008 (basic grouping).',
                  misconception: 'Students treat ICMR food groups as rigid "containers" — e.g., "potato is a vegetable so it belongs only in Fruits & Vegetables.".' }
          ],
            remediations: { 'students-treat-icmr-food-groups': { steps: ['Revisit c11_hs_cbse_03_008 (Class 11 food group classification) and create a two-column table: Botanical Category vs.', 'Highlight 5 foods where they differ (potato, green pea, coconut, soybean, avocado).', 'Re-attempt Diagnostic Question 3 with this lens.', 'If still confused, watch the ICMR-NIN "My Plate for the Day" video and map each plate section to the five groups.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_004', difficulty: 'standard',
          question: 'A balanced diet is a scientifically planned combination of foods from all ICMR.',
          hint: 'If stuck, revisit c11_hs_cbse_03_007 (RDA tables) and c11_hs_cbse_03_008 (food group.',
          misconception: 'Students believe "balanced diet" means eating equal quantities from each food group every day.',
          parts: [
                { id: 'a', prompt: 'State the ICMR 2020 RDA for energy (kcal/day) and protein (g/day) for a 10-year-old boy and a 10-year-old girl. Are they identical or different?', answer: 'Correct answer: 10-year-old boy: 1970 kcal, 35 g protein',
                  options: ['Correct answer: 10-year-old boy: 1970 kcal, 35 g protein', 'balanced diet', '"balanced diet" means eating equal quantities from each food group every day'],
                  hint: 'If stuck, revisit c11_hs_cbse_03_007 (RDA tables) and c11_hs_cbse_03_008 (food group serving sizes).',
                  misconception: 'Students believe "balanced diet" means eating equal quantities from each food group every day.' },
                { id: 'b', prompt: 'A student writes: "A balanced diet for a 3-year-old child is just a smaller portion of an adult balanced diet." Explain why this statement is incorrect using.', answer: 'Correct answer: (1) Growth velocity: preschooler deposits ~2 kg body weight/year',
                  options: ['Correct answer: (1) Growth velocity: preschooler deposits ~2 kg body weight/year', 'smaller quantity', 'balanced diet', '"balanced diet" means eating equal quantities from each food group every day'],
                  hint: 'If stuck, revisit c11_hs_cbse_03_007 (RDA tables) and c11_hs_cbse_03_008 (food group serving sizes).',
                  misconception: 'Students believe "balanced diet" means eating equal quantities from each food group every day.' },
                { id: 'c', prompt: 'Using ICMR 2020 RDA and food group serving sizes, calculate the minimum number of cereal servings (30g raw each) required to meet 60% of energy RDA for.', answer: 'Step 1: Target energy from cereals = 60% of 1660 = 996 kcal',
                  options: ['Step 1: Target energy from cereals = 60% of 1660 = 996 kcal', 'balanced diet', '"balanced diet" means eating equal quantities from each food group every day'],
                  hint: 'If stuck, revisit c11_hs_cbse_03_007 (RDA tables) and c11_hs_cbse_03_008 (food group serving sizes).',
                  misconception: 'Students believe "balanced diet" means eating equal quantities from each food group every day.' }
          ],
            remediations: { 'balanced-diet-means-eating-equal': { steps: ['Have the student re-read ICMR 2020 RDA tables (c11_hs_cbse_03_007) and food group serving sizes (c11_hs_cbse_03_008).', 'Practice calculating servings for ONE nutrient (energy) for ONE age group using the formula: Servings = (RDA_kcal × %.', 'Re-attempt Diagnostic Question 3 with a different age group (e.g., adolescent boy).', 'If error persists, map each food group\'s % energy contribution from ICMR\'s "My Plate for the Day" infographic to see.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_005', difficulty: 'standard',
          question: 'Food Exchange Lists are a meal planning tool that categorizes foods into groups.',
          hint: 'If unable to recall exchange values, review the "Food Exchange Lists" table in NCERT.',
          misconception: 'Students believe "1 exchange = 1 serving of that food as eaten" — e.g., they think 1 cereal exchange = 1 cooked roti.',
          parts: [
                { id: 'a', prompt: 'Explain why 30g raw rice and 30g raw wheat flour are both considered 1 cereal exchange despite having different weights when cooked.', answer: 'Exchange lists are based on raw/uncooked weight',
                  options: ['Exchange lists are based on raw/uncooked weight', 'because they weigh the same cooked', '1 exchange = 1 serving of that food as eaten', '"1 exchange = 1 serving of that food as eaten"'],
                  hint: 'If unable to recall exchange values, review the "Food Exchange Lists" table in NCERT Class 12.',
                  misconception: 'Students believe "1 exchange = 1 serving of that food as eaten" — e.g., they think 1 cereal exchange = 1 cooked roti (≈30g cooked) instead.' },
                { id: 'b', prompt: 'A 2000 kcal diet for a sedentary adult male requires 60% carbohydrate.', answer: 'Step 1: Total carb kcal = 2000 × 0.60 = 1200 kcal',
                  options: ['Step 1: Total carb kcal = 2000 × 0.60 = 1200 kcal', '1 exchange = 1 serving of that food as eaten', '"1 exchange = 1 serving of that food as eaten"'],
                  hint: 'If unable to recall exchange values, review the "Food Exchange Lists" table in NCERT Class 12.',
                  misconception: 'Students believe "1 exchange = 1 serving of that food as eaten" — e.g., they think 1 cereal exchange = 1 cooked roti (≈30g cooked) instead.' },
                { id: 'c', prompt: 'Compare the ICMR food exchange system with the USDA "Choose MyPlate" food group system.', answer: 'Advantages: (1) Quantitative precision',
                  options: ['Advantages: (1) Quantitative precision', 'exchange system is only for hospitals', 'MyPlate is better', '1 exchange = 1 serving of that food as eaten'],
                  hint: 'If unable to recall exchange values, review the "Food Exchange Lists" table in NCERT Class 12.',
                  misconception: 'Students believe "1 exchange = 1 serving of that food as eaten" — e.g., they think 1 cereal exchange = 1 cooked roti (≈30g cooked) instead.' }
          ],
            remediations: { '1-exchange-1-serving-of': { steps: ['Revisit c12_hs_cbse_10_003 (Food Groups) to re-learn ICMR raw portion standards for each group.', 'Practice converting 5 common cooked dishes (e.g., 1 cup cooked rice, 1 katori dal, 2 rotis, 1 paratha, 1 idli) back.', 'Re-do Diagnostic Question 3 with the corrected raw weights.', 'If still stuck, watch the NCERT Lab Manual video "Food Exchange List Demonstration" (Class 12 Practical) and replicate.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_10_006', difficulty: 'standard',
          question: 'Meal planning for pregnant and lactating women is the systematic design.',
          hint: 'If stuck on RDA calculations, revisit c11_hs_cbse_03_007 (RDA Meaning and Application).',
          misconception: 'Students believe "eating for two" means doubling portion sizes of usual foods.',
          parts: [
                { id: 'a', prompt: 'A pregnant woman in her 2nd trimester has a pre-pregnancy body weight of 55 kg and sedentary activity level.', answer: 'Correct answer: 2250 kcal',
                  options: ['Correct answer: 2250 kcal', 'eating for two', '"eating for two" means doubling portion sizes of usual foods'],
                  hint: 'If stuck on RDA calculations, revisit c11_hs_cbse_03_007 (RDA Meaning and Application) and practice.',
                  misconception: 'Students believe "eating for two" means doubling portion sizes of usual foods.' },
                { id: 'b', prompt: 'A lactating mother (0-4 months postpartum) consumes a diet providing 60 g protein/day. Her pre-pregnancy weight was 50 kg (sedentary).', answer: 'Correct answer: Deficit = 9 g/day',
                  options: ['Correct answer: Deficit = 9 g/day', 'eating for two', '"eating for two" means doubling portion sizes of usual foods'],
                  hint: 'If stuck on RDA calculations, revisit c11_hs_cbse_03_007 (RDA Meaning and Application) and practice.',
                  misconception: 'Students believe "eating for two" means doubling portion sizes of usual foods.' },
                { id: 'c', prompt: 'Compare the physiological rationale for ICMR\'s calcium recommendation during pregnancy (1200 mg/day) versus lactation (1200 mg/day) — same value, different.', answer: 'Correct analysis: Pregnancy: calcium for fetal skeletal mineralization (~30 g',
                  options: ['Correct analysis: Pregnancy: calcium for fetal skeletal mineralization (~30 g', 'baby takes calcium from mother\'s bones in both', 'eating for two', '"eating for two" means doubling portion sizes of usual foods'],
                  hint: 'If stuck on RDA calculations, revisit c11_hs_cbse_03_007 (RDA Meaning and Application) and practice.',
                  misconception: 'Students believe "eating for two" means doubling portion sizes of usual foods.' }
          ],
            remediations: { 'eating-for-two-means-doubling': { steps: ['Revisit c12_hs_cbse_10_004 (Balanced Diet) to recalculate pre-pregnancy RDA for a reference woman (55 kg, sedentary).', 'Revisit c12_hs_cbse_10_005 (Food Exchange Lists) and practice swapping 1 cereal exchange (30 g raw rice = 100 kcal, 2.', 'Use ICMR 2020 RDA table (NCERT Appendix) to write trimester-wise increments on a flashcard.', 'Re-attempt Diagnostic Question 3 with the flashcard. If still wrong, revisit c11_hs_cbse_03_007 (RDA Meaning and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
