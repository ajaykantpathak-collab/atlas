import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch09_p2: SimDef = {
    id: 'v3_c12_hs_ch09_p2',
    title: 'Nutrition for Self and Family · Part 2/2',
    subtitle: 'The number was right — the food matrix was missing',
    classLevel: 12, subject: 'home_science', topic: 'Nutrition for Self and Family · Part 2/2',
    chapters: ['c12_hs_ch09'],
    nodeIds: ['c12_hs_cbse_09_007', 'c12_hs_cbse_09_008', 'c12_hs_cbse_09_009', 'c12_hs_cbse_09_010', 'c12_hs_cbse_09_011', 'c12_hs_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Dietary planner', intro: 'One family, four plates, four different RDAs — a pregnant mother, an infant, a labourer, an elder.', goal: 'Use RDA correctly — requirements shift with age, sex, activity and physiology; food beats the isolated pill.' },
    discovery: {
        question: 'An 80 mg vitamin C tablet hits the RDA exactly — so why does the nutritionist still hand you a guava instead?',
        options: ['The RDA assumes a food matrix — whole food brings fibre, phytochemicals and cofactors that shape absorption; an isolated number isn\'t the whole nutrient story', 'Tablets are expensive', 'Guava tastes better', 'Supplements don\'t work'],
        answer: 'The RDA assumes a food matrix — whole food brings fibre, phytochemicals and cofactors that shape absorption; an isolated number isn\'t the whole nutrient story',
        hook: 'RDA isn\'t a minimum or a dose — it\'s the intake covering ~97.5% of healthy people in a group. And \'all adults need the same\' collapses fast: sex, activity, pregnancy and age move requirements by hundreds of kilocalories and milligrams of iron.',
    },
    teaching: [
        { title: 'Adolescent Nutrition: Growth Spurt and Increased Nutrient Demands', text: 'Adolescent nutrition refers to the specific dietary requirements during the adolescent growth spurt (ages 10-19), characterized by a rapid increase in height, weight, bone density, muscle mass, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_09_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Read the RDA like a clinician: compute protein from body weight, explain why pregnancy triples iron needs, and plan a day\'s vegetarian menu that actually meets the numbers.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_09_007', title: 'Adolescent Nutrition: Growth Spurt and Increased Nutrient Demands',
          caseStudy: { intro: 'Imagine a 13-year-old boy who suddenly outgrows his shoes in three months and is always hungry — his body is building the equivalent of an adult skeleton.',
            decisions: [{ prompt: 'A 14-year-old girl consumes 1800 kcal, 45 g protein, 400 mg calcium, and 12 mg iron daily.', options: [
                { text: 'Correct answer: Calcium (60% deficit)', outcome: 'Correct answer: Calcium (60% deficit). ICMR 2020 RDA for girls 13-15 years: Energy 2050 kcal (12%.' },
                { text: 'adolescents need iron', outcome: 'Not quite — Students believe "adolescents need more of everything equally" — they increase all foods.', reveals: 'adolescents-need-more-of-everything' },
                { text: 'adolescents need more of everything equally', outcome: 'Not quite — Students believe "adolescents need more of everything equally" — they increase all foods.', reveals: 'adolescents-need-more-of-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_09_008', title: 'Adult Nutrition: RDA for Men and Women and Lifestyle Factors',
          caseStudy: { intro: 'Imagine you are a dietitian consulting a 35-year-old male software engineer who works night shifts, sleeps 5 hours, drinks alcohol twice a week, and does.',
            decisions: [{ prompt: 'State the ICMR 2020 RDA for energy (kcal/day) and protein (g/day) for a sedentary adult man and a sedentary adult woman (18–60 years).', options: [
                { text: 'Sedentary adult man: 2110 kcal, 54 g protein (0.83 g/kg for 65 kg reference weight)', outcome: 'Sedentary adult man: 2110 kcal, 54 g protein (0.83 g/kg for 65 kg reference weight).' },
                { text: 'RDA is a fixed number for all adults of the same gender', outcome: 'Not quite — Students believe "RDA is a fixed number for all adults of the same gender" and memorise single.', reveals: 'rda-is-a-fixed-number' },
                { text: 'women need 19 mg iron', outcome: 'Not quite — Students believe "RDA is a fixed number for all adults of the same gender" and memorise single.', reveals: 'rda-is-a-fixed-number' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_09_009', title: 'Nutrition for the Elderly: Physiological Changes and Dietary Modifications',
          caseStudy: { intro: 'Start with a relatable scenario: "Your 72-year-old neighbour, Mrs.',
            decisions: [{ prompt: 'A REMEMBER level question: State the ICMR 2020 Recommended Dietary Allowance (RDA) for protein for a 70-year-old man weighing 60 kg, and.', options: [
                { text: 'Correct answer: Protein RDA = 1.2 g/kg body weight/day → 72 g/day for a 60 kg man', outcome: 'Correct answer: Protein RDA = 1.2 g/kg body weight/day → 72 g/day for a 60 kg man.' },
                { text: '\'elderly need less protein', outcome: 'Not quite — Students often believe \'elderly need less protein because they are less active.\' This is wrong.', reveals: 'elderly-need-less-protein-because' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_09_010', title: 'Nutritional Requirements During Fever and Infections',
          scaffold: { problem: 'A 30-year-old male (weight 70 kg, height 170 cm) develops a fever of 39.5°C. His basal metabolic rate (BMR) is 1650 kcal/day.',
            steps: [
            { text: 'Calculate ΔT = 39.5 - 37 = 2.5°C. Energy increase = 7% per °C × 2.5 = 17.5%.' },
            { text: 'Apply activity factor for bed rest with fever = 1.2. Total energy = 1856 × 1.2 = 2227 kcal/day. Round to 2250 kcal/day.' },
            { text: 'Protein requirement = 1.5 g/kg (moderate fever) to 2.0 g/kg (severe). Use 1.75 g/kg. Protein = 70 × 1.75 = 122.5 g/day.' },
            { text: 'Fluid requirement = 35 mL/kg + 500 mL/°C above 37 = (35 × 70) + (500 × 2.5) = 2450 + 1250 = 3700 mL/day.' },
            { text: 'Verify: Energy 2250 kcal (vs normal ~2400 for sedentary male — slightly lower due to bed rest but fever compensates).', faded: true, blankAnswer: 'Energy: 2250 kcal/day; Protein: 125 g/day; Fluid: 3700.' }
            ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_09_011', title: 'Therapeutic Diets: Principles and Modifications for Cardiovascular Diseases',
          caseStudy: { intro: 'Imagine a 55-year-old uncle who just had a mild heart attack; the doctor says "change your diet" but he loves his daily parathas with butter, pickles, and.',
            decisions: [{ prompt: 'Define "therapeutic diet" in the context of cardiovascular disease and state the primary nutrient modifications recommended by ICMR/NIN for.', options: [
                { text: 'A therapeutic diet for CVD is a scientifically planned meal pattern that modifies', outcome: 'A therapeutic diet for CVD is a scientifically planned meal pattern that modifies specific.' },
                { text: 'low fat, low salt', outcome: 'Not quite — Students often believe "cholesterol-free" labels on plant oils (e.g., "zero cholesterol".', reveals: 'cholesterol-free-labels-on-plant' },
                { text: 'cholesterol-free', outcome: 'Not quite — Students often believe "cholesterol-free" labels on plant oils (e.g., "zero cholesterol".', reveals: 'cholesterol-free-labels-on-plant' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_09_012', title: 'Therapeutic Diets: Principles and Modifications for Diabetes Mellitus',
          caseStudy: { intro: 'Imagine your 55-year-old uncle just diagnosed with Type 2 diabetes — fasting glucose 145 mg/dL, HbA1c 8.2%, BMI 28, sedentary job.',
            decisions: [{ prompt: 'Define glycemic index (GI) and state its significance in diabetic meal planning.', options: [
                { text: 'Glycemic index ranks carbohydrate foods on a scale 0-100 based on their blood glucose', outcome: 'Glycemic index ranks carbohydrate foods on a scale 0-100 based on their blood glucose response.' },
                { text: 'GI measures sugar content', outcome: 'Not quite — Students believe "diabetic diet = sugar-free diet" and recommend artificial sweeteners freely.', reveals: 'diabetic-diet-sugar-free-diet' },
                { text: 'diabetic diet = sugar-free diet', outcome: 'Not quite — Students believe "diabetic diet = sugar-free diet" and recommend artificial sweeteners freely.', reveals: 'diabetic-diet-sugar-free-diet' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'Nutrition for Self and Family · Part 2/2', spots: [
            { id: 's1', label: 'Adult Nutrition RDA for Men and Women and Lifestyle Factors', prompt: 'Which idea is this? — Adult nutrition refers to the dietary requirements and recommended dietary allowances.', answer: 'Adult Nutrition RDA for Men and Women and Lifestyle Factors', options: ['Adult Nutrition RDA for Men and Women and Lifestyle Factors', 'Nutritional Requirements During Fever and Infections'] },
            { id: 's2', label: 'Nutritional Requirements During Fever and Infections', prompt: 'Which idea is this? — Nutritional requirements during fever and infections refer to the increased and altered.', answer: 'Nutritional Requirements During Fever and Infections', options: ['Nutritional Requirements During Fever and Infections', 'Adult Nutrition RDA for Men and Women and Lifestyle Factors'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A newly pregnant colleague\'s grandmother insists she \'eat for two\' — double rotis, double milk — while her doctor has prescribed folic acid and a modest calorie increase. The family calls the doctor \'stingy.\'',
            decisions: [{ prompt: 'What does the pregnancy RDA actually say?', options: [
                { text: 'The doctor is calibrated — ICMR adds roughly 350–450 kcal and about 10–23 g of protein, not double portions; the big demands are micronutrients like iron and folic acid, with folate\'s largest increment in the first trimester for the neural tube, not a second stomach\'s worth of food.', outcome: 'The chapter\'s point: \'eating for two\' describes quality and specific nutrients, not quantity doubled — blood volume, fetal skeleton and neural tube each bill specific nutrients, not bulk calories.' },
                { text: 'Side with the grandmother — a growing baby needs double the intake, simple arithmetic.', outcome: 'The arithmetic is wrong: the fetus is a fraction of the mother\'s mass, and the RDA\'s increments are modest and timed — doubling calories buys surplus weight, not the iron and folate the physiology actually demands.', reveals: 'eat-for-two-literally' },
                { text: 'Split it — keep normal calories but double the folic acid through all nine months.', outcome: 'Folate isn\'t flat either: its biggest increment covers the first-trimester neural tube window and tapers later; doubling it throughout misses that the demand is critical-period, not constant.', reveals: 'supplement-equals-uniform' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_09_012', title: 'You made it',
          caseStudy: { intro: 'You can now treat requirements as living physiology — and why a nutrient on a label is not yet a nutrient in a body.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_007', difficulty: 'standard',
          question: 'Adolescent nutrition refers to the specific dietary requirements during the.',
          hint: 'If stuck on RDA lookup or food composition: revisit c11_hs_cbse_03_007 (RDA tables) and.',
          misconception: 'Students believe "adolescents need more of everything equally" — they increase all foods proportionally (e.g., "eat two.',
          parts: [
                { id: 'a', prompt: 'A 14-year-old girl consumes 1800 kcal, 45 g protein, 400 mg calcium, and 12 mg iron daily.', answer: 'Correct answer: Calcium (60% deficit)',
                  options: ['Correct answer: Calcium (60% deficit)', 'adolescents need iron', 'adolescents need more of everything equally', 'eat two chapatis instead of one'],
                  hint: 'If stuck on RDA lookup or food composition: revisit c11_hs_cbse_03_007 (RDA tables) and.',
                  misconception: 'Students believe "adolescents need more of everything equally" — they increase all foods proportionally (e.g., "eat two chapatis instead.' },
                { id: 'b', prompt: 'A 15-year-old vegetarian boy (height 165 cm, weight 50 kg) wants to meet his calcium RDA (1000 mg/day) without supplements.', answer: 'Sample solution: Breakfast',
                  options: ['Sample solution: Breakfast', 'plan a meal', 'adolescents need more of everything equally', 'eat two chapatis instead of one'],
                  hint: 'If stuck on RDA lookup or food composition: revisit c11_hs_cbse_03_007 (RDA tables) and.',
                  misconception: 'Students believe "adolescents need more of everything equally" — they increase all foods proportionally (e.g., "eat two chapatis instead.' }
          ],
            remediations: { 'adolescents-need-more-of-everything': { steps: ['If a student cannot calculate percentage deficits or design meal plans: (1) Revisit c11_hs_cbse_03_007 (RDA concept).', '(2) Practice: "Given RDA = X, intake = Y, calculate % deficit" for 5 nutrients using a calculator.', '(3) Re-do Diagnostic Q3 with a scaffolded worksheet: pre-fill food calcium values, leave only quantity columns blank.', '(4) Re-test with a new case: 16-year-old boy, RDA calcium 1000 mg, intake 350 mg — calculate deficit and suggest 2.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "adolescents need more of everything equally" — they increase all foods proportionally (e.g., "eat two.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since adolescents need more calcium for bone growth, giving them 500 ml milk daily (600 mg calcium) ensures they meet their calcium.', answer: 'Critique: The statement is FALSE and dangerous',
                  options: ['Critique: The statement is FALSE and dangerous', 'adolescents need more of everything equally', 'eat two chapatis instead of one', '"adolescents need more of everything equally"'],
                  hint: 'If stuck on RDA lookup or food composition: revisit c11_hs_cbse_03_007 (RDA tables) and.',
                  misconception: 'Students believe "adolescents need more of everything equally" — they increase all foods proportionally (e.g., "eat two chapatis instead.' }
          ],
            remediations: { 'adolescents-need-more-of-everything': { steps: ['If a student cannot calculate percentage deficits or design meal plans: (1) Revisit c11_hs_cbse_03_007 (RDA concept).', '(2) Practice: "Given RDA = X, intake = Y, calculate % deficit" for 5 nutrients using a calculator.', '(3) Re-do Diagnostic Q3 with a scaffolded worksheet: pre-fill food calcium values, leave only quantity columns blank.', '(4) Re-test with a new case: 16-year-old boy, RDA calcium 1000 mg, intake 350 mg — calculate deficit and suggest 2.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_008', difficulty: 'standard',
          question: 'Adult nutrition refers to the dietary requirements and recommended dietary.',
          hint: 'If stuck on activity-level adjustments, revisit the PAL (Physical Activity Level) concept.',
          misconception: 'Students believe "RDA is a fixed number for all adults of the same gender" and memorise single values (e.g., "women.',
          parts: [
                { id: 'a', prompt: 'A 40-year-old male marketing executive travels 4 days/week, eats restaurant meals high in sodium and saturated fat, sleeps 6 hours, and drinks 3–4 alcoholic.', answer: '(1) Sodium ≤ 2000 mg/day (vs',
                  options: ['(1) Sodium ≤ 2000 mg/day (vs', 'eat less salt', 'RDA is a fixed number for all adults of the same gender', 'women need 19 mg iron'],
                  hint: 'If stuck on activity-level adjustments, revisit the PAL (Physical Activity Level) concept.',
                  misconception: 'Students believe "RDA is a fixed number for all adults of the same gender" and memorise single values (e.g., "women need 19 mg iron").' },
                { id: 'b', prompt: 'Compare the *magnitude* of increase in energy RDA from sedentary to heavy activity for adult men vs. women.', answer: 'Men: 2110 → 3470 kcal (+1360 kcal, +64%)',
                  options: ['Men: 2110 → 3470 kcal (+1360 kcal, +64%)', 'men need more because they are bigger', 'RDA is a fixed number for all adults of the same gender', 'women need 19 mg iron'],
                  hint: 'If stuck on activity-level adjustments, revisit the PAL (Physical Activity Level) concept.',
                  misconception: 'Students believe "RDA is a fixed number for all adults of the same gender" and memorise single values (e.g., "women need 19 mg iron").' }
          ],
            remediations: { 'rda-is-a-fixed-number': { steps: ['Revisit c11_hs_cbse_03_007 (RDA Meaning and Application) — re-learn the definition of RDA as "safe intake covering.', 'Revisit c11_hs_cbse_03_008 (Food Groups) — practice converting RDA grams into food-group servings using the Indian Food.', 'Take a blank ICMR 2020 RDA table (download from NIN website) and fill *only* the adult columns for 3 activity levels.', 'For each nutrient, write one sentence stating whether it scales with energy, body weight, or is fixed — then verify.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_009', difficulty: 'standard',
          question: 'Nutrition for the elderly refers to the science of meeting the altered nutrient.',
          hint: 'If stuck, revisit c11_hs_cbse_03_007 (RDA tables and interpretation) and.',
          misconception: 'Students often believe \'elderly need less protein because they are less active.\' This is wrong: while total energy.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Nutrition for the elderly refers to the science of meeting the altered nutrient',
                  options: ['Nutrition for the elderly refers to the science of meeting the altered nutrient', 'Nutritional requirements refer to the specific amounts of essential nutrients (energy,', 'Nutritional requirements during pregnancy refer to the increased need for energy,', 'Nutritional requirements during lactation refer to the increased dietary allowances for'],
                  hint: 'If stuck, revisit c11_hs_cbse_03_007 (RDA tables and interpretation) and c12_hs_cbse_09_008 (Adult.',
                  misconception: 'Students often believe \'elderly need less protein because they are less active.\' This is wrong: while total energy needs drop due.' }
          ],
            remediations: { 'elderly-need-less-protein-because': { steps: ['If the student exhibits the above misconception: (1) Have them calculate protein RDA for a 60 kg adult (48 g) vs.', '60 kg elderly (72 g) using ICMR 2020 tables.', '(2) Show a 2-minute video/graphic of \'anabolic resistance\' — how leucine threshold for mTOR activation rises with age.', '(3) Assign a mini-case: \'Mr.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_010', difficulty: 'standard',
          question: 'Nutritional requirements during fever and infections refer to the increased and.',
          hint: 'Revisit c11_hs_cbse_03_007 for RDA table lookup and calculation steps, and.',
          misconception: 'Students believe "starve a fever" or that fever requires only fluids and no solid food until temperature normalises.',
          parts: [
                { id: 'a', prompt: 'Explain why protein requirement increases disproportionately (50-100% above RDA) compared to energy (10-15%) during infection, and name two specific amino.', answer: 'Protein increases more',
                  options: ['Protein increases more', 'protein builds muscle', 'starve a fever', 'Give only glucose water and clear soup for 3 days until fever breaks'],
                  hint: 'Revisit c11_hs_cbse_03_007 for RDA table lookup and calculation steps, and c11_hs_cbse_07_006 for.',
                  misconception: 'Students believe "starve a fever" or that fever requires only fluids and no solid food until temperature normalises.' }
          ],
            remediations: { 'starve-a-fever-or-that': { steps: ['If the student persists with "starve the fever" thinking: (1) Revisit c11_hs_cbse_03_007 (RDA concept) and.', '(2) Calculate nitrogen balance: show that 0 g protein intake + fever-induced urinary nitrogen loss = negative balance.', '(3) Re-do Diagnostic Question 3 with the constraint: "Must provide 1.5 g protein/kg/day." (4) Verify by checking if the.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_011', difficulty: 'standard',
          question: 'Therapeutic diets for cardiovascular diseases (CVD) are evidence-based dietary.',
          hint: 'If stuck, revisit the "Lipids: Fatty Acids and Glycerol" (c11_bio_cbse_09_003) and.',
          misconception: 'Students often believe "cholesterol-free" labels on plant oils (e.g., "zero cholesterol" on sunflower oil bottles) mean.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Therapeutic diets for cardiovascular diseases (CVD) are evidence-based dietary',
                  options: ['Therapeutic diets for cardiovascular diseases (CVD) are evidence-based dietary', 'Nutritional requirements refer to the specific amounts of essential nutrients (energy,', 'Nutritional requirements during pregnancy refer to the increased need for energy,', 'Nutritional requirements during lactation refer to the increased dietary allowances for'],
                  hint: 'If stuck, revisit the "Lipids: Fatty Acids and Glycerol" (c11_bio_cbse_09_003) and "Nutrients.',
                  misconception: 'Students often believe "cholesterol-free" labels on plant oils (e.g., "zero cholesterol" on sunflower oil bottles) mean the oil.' }
          ],
            remediations: { 'cholesterol-free-labels-on-plant': { steps: ['Revisit **c11_hs_cbse_03_003** (Nutrients: Classification) to relearn lipid categories (SFA, MUFA, PUFA, trans) and.', 'Revisit **c11_bio_cbse_09_003** (Lipids: Fatty Acids and Glycerol) to understand fatty acid structure and essential.', 'Revisit **c11_bio_cbse_15_007** (Disorders of Circulatory System: Hypertension and Atherosclerosis) to link diet.', 'Do a focused re-diagnostic: Take 5 common Indian cooking oils, write their SFA/MUFA/PUFA percentages, and rank them for.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_012', difficulty: 'standard',
          question: 'Therapeutic diet for diabetes mellitus is a scientifically planned meal pattern.',
          hint: 'Review ICMR food exchange lists and practice converting cooked food weights to raw.',
          misconception: 'Students believe "diabetic diet = sugar-free diet" and recommend artificial sweeteners freely.',
          parts: [
                { id: 'a', prompt: 'A 60 kg, 45-year-old woman with Type 2 diabetes requires 1800 kcal/day.', answer: 'Carb calories = 1800 × 0.55 = 990 kcal',
                  options: ['Carb calories = 1800 × 0.55 = 990 kcal', '55 exchanges', 'diabetic diet = sugar-free diet', '"diabetic diet = sugar-free diet" and recommend artificial sweeteners freely'],
                  hint: 'Review ICMR food exchange lists and practice converting cooked food weights to raw equivalents for.',
                  misconception: 'Students believe "diabetic diet = sugar-free diet" and recommend artificial sweeteners freely.' },
                { id: 'b', prompt: 'Design a 1600 kcal diabetic menu distributing 13 carbohydrate exchanges across 3 main meals + 2 snacks.', answer: 'Total 13 exchanges: Breakfast 4, Mid-morning 1, Lunch 4, Evening 1, Dinner 3',
                  options: ['Total 13 exchanges: Breakfast 4, Mid-morning 1, Lunch 4, Evening 1, Dinner 3', 'diabetic diet = sugar-free diet', '"diabetic diet = sugar-free diet" and recommend artificial sweeteners freely'],
                  hint: 'Review ICMR food exchange lists and practice converting cooked food weights to raw equivalents for.',
                  misconception: 'Students believe "diabetic diet = sugar-free diet" and recommend artificial sweeteners freely.' },
                { id: 'c', prompt: 'Compare and contrast dietary modifications for Type 1 vs Type 2 diabetes regarding carbohydrate consistency, weight management, and hypoglycemia prevention.', answer: 'Type 1: Carbohydrate consistency critical for fixed insulin doses',
                  options: ['Type 1: Carbohydrate consistency critical for fixed insulin doses', 'Both need same carb restriction', 'diabetic diet = sugar-free diet', '"diabetic diet = sugar-free diet" and recommend artificial sweeteners freely'],
                  hint: 'Review ICMR food exchange lists and practice converting cooked food weights to raw equivalents for.',
                  misconception: 'Students believe "diabetic diet = sugar-free diet" and recommend artificial sweeteners freely.' }
          ],
            remediations: { 'diabetic-diet-sugar-free-diet': { steps: ['Revisit c11_hs_cbse_03_003 (nutrient classification) to reinforce carbohydrate types and 4 kcal/g.', 'Review c12_hs_cbse_09_011 (fever diet) for therapeutic diet principles foundation.', 'Practice 5 carb exchange calculations using Indian food composition tables (ICMR).', 'Re-attempt Diagnostic Q2 with stepwise verification: %kcal → kcal → grams → exchanges.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
