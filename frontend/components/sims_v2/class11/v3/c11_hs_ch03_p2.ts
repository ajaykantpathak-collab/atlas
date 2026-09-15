import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch03_p2: SimDef = {
    id: 'v3_c11_hs_ch03_p2',
    title: 'Food, Nutrition and Health · Part 2/2',
    subtitle: 'See why identical lunches produce different bodies — food is biology plus society.',
    classLevel: 11, subject: 'home_science', topic: 'Food, Nutrition and Health · Part 2/2',
    chapters: ['c11_hs_ch03'],
    nodeIds: ['c11_hs_cbse_03_007', 'c11_hs_cbse_03_008', 'c11_hs_cbse_03_009', 'c11_hs_cbse_03_010', 'c11_hs_cbse_03_011', 'c11_hs_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a nutritionist auditing a program that should have worked', intro: 'Same tray, same calories, different outcomes — the science of nutrition starts where the lunch line ends.', goal: 'Classify nutrients by requirement scale and apply nutrition\'s four dimensions.' },
    discovery: {
        question: 'A school serves calorie-adequate mid-day meals, yet a third of the children stay undernourished after a year. The food failed — or did something else?',
        options: ['Something else — caste seating, disliked taste and who eats last at home all sit between adequate food and an adequately fed child', 'The food — adequate calories always nourish', 'The children — they chose to be undernourished', 'The calories — the count was surely wrong'],
        answer: 'Something else — caste seating, disliked taste and who eats last at home all sit between adequate food and an adequately fed child',
        hook: 'Nutrition science isn\'t just biology — the social, psychological and economic dimensions aren\'t add-ons; they\'re where meals actually fail.',
    },
    teaching: [
        { title: 'Recommended Dietary Allowances (RDA): Meaning and Application', text: 'Recommended Dietary Allowances (RDAs) are the estimated nutrient intake levels that meet the requirements of nearly all (97-98%) healthy individuals in a specific life-stage and gender group.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify roti, spinach, ghee and iodised salt by the grams-versus-micrograms rule, then break the claim that one food or one calorie number can fix malnutrition.',
        labels: ['Recommended Dietary Allowances (RDA)', 'Classification of Foods into', 'Food Guide Pyramid', 'Adolescent Dietary Patterns', 'Eating Disorders: Anorexia Nervosa', 'Adolescent Anaemia: Prevalence, Causes'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_03_007', title: 'Recommended Dietary Allowances (RDA): Meaning and Application',
          scaffold: { problem: 'Using ICMR 2020 RDA values, calculate the protein RDA for a 17-year-old boy (reference weight 60 kg) with moderate activity.',
            steps: [
            { text: 'Identify the given values — reference body weight = 60 kg, protein requirement = 0.66 g/kg/day, safety margin = 25%.' },
            { text: 'Calculate average physiological requirement = 0.66 g/kg × 60 kg = 39.6 g/day.' },
            { text: 'Calculate margin of safety = 25% of 39.6 g = 0.25 × 39.6 = 9.9 g/day.' },
            { text: 'Compute RDA = Requirement + Safety margin = 39.6 g + 9.9 g = 49.5 g/day (ICMR rounds to 50 g/day for this category).' },
            { text: 'Compare intake (55 g) with RDA (49.5 g) — 55 g ≥ 49.5 g, so the diet meets the RDA with a surplus of 5.5 g.', faded: true, blankAnswer: 'RDA = 49.5 g/day (≈50 g/day); 55 g intake meets the RDA.' }
            ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_008', title: 'Classification of Foods into Basic Food Groups: Nutrient Content and Key Foods',
          caseStudy: { intro: 'Imagine you are packing a tiffin for your younger sibling who has sports practice after school. You have roti, dal, curd, an apple, and a spoon of ghee.',
            decisions: [{ prompt: 'Name the five basic food groups in the ICMR classification and state the predominant macronutrient supplied by the "Cereals, Grains and.', options: [
                { text: 'The five groups are: (1) Cereals, Grains and Products, (2) Pulses and Legumes, (3) Milk,', outcome: 'The five groups are: (1) Cereals, Grains and Products, (2) Pulses and Legumes, (3) Milk, Meat and.' },
                { text: 'protein', outcome: 'Not quite — Students believe that "protective foods" (fruits/vegetables) and "body-building foods".', reveals: 'protective-foods-fruits-vegetables-and' },
                { text: 'protective foods', outcome: 'Not quite — Students believe that "protective foods" (fruits/vegetables) and "body-building foods".', reveals: 'protective-foods-fruits-vegetables-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_009', title: 'Food Guide Pyramid for Indians and Vegetarian Food Guide',
          caseStudy: { intro: 'Imagine you are helping your younger cousin plan a tiffin box for school that follows the Food Guide Pyramid — they are vegetarian and you need to ensure they.',
            decisions: [{ prompt: 'State the recommended daily serving ranges for the five food groups in the Food Guide Pyramid for Indians as depicted in the NCERT textbook.', options: [
                { text: 'Correct answer: Cereals 6-11 servings, Vegetables 3-5 servings, Fruits 2-4 servings, Milk', outcome: 'Correct answer: Cereals 6-11 servings, Vegetables 3-5 servings, Fruits 2-4 servings, Milk 2-3.' },
                { text: '\'vegetarian\' means \'less food\' or \'lower protein\'', outcome: 'Not quite — Students often believe the Vegetarian Food Guide is a separate, smaller pyramid with fewer servings.', reveals: 'the-vegetarian-food-guide-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_010', title: 'Adolescent Dietary Patterns and Nutritional Needs',
          caseStudy: { intro: 'Imagine a 15-year-old boy, Rohan, who regularly skips breakfast, grabs a samosa and cola for lunch, snacks on chips in the evening, and eats a heavy dinner.',
            decisions: [{ prompt: 'Define "Recommended Dietary Allowance (RDA)" as per ICMR and explain how it differs from "nutrient requirement" for an adolescent girl aged.', options: [
                { text: 'RDA = nutrient requirement + margin of safety (typically 2 SD above mean requirement) to', outcome: 'RDA = nutrient requirement + margin of safety (typically 2 SD above mean requirement) to cover.' },
                { text: 'safety margin', outcome: 'Not quite — Students believe "adolescents need more protein than adults, so they should eat extra meat/eggs.', reveals: 'adolescents-need-more-protein-than' },
                { text: 'increased needs', outcome: 'Not quite — Students believe "adolescents need more protein than adults, so they should eat extra meat/eggs.', reveals: 'adolescents-need-more-protein-than' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_011', title: 'Eating Disorders: Anorexia Nervosa and Bulimia Nervosa',
          caseStudy: { intro: 'Imagine a 16-year-old student, Priya, who skips lunch daily, counts calories obsessively, exercises for two hours after school, and insists she is "fat".',
            decisions: [{ prompt: 'Define Anorexia Nervosa and Bulimia Nervosa in one sentence each, highlighting the core behavioral distinction between them.', options: [
                { text: 'Anorexia Nervosa is characterized by severe restriction of energy intake leading to', outcome: 'Anorexia Nervosa is characterized by severe restriction of energy intake leading to significantly.' },
                { text: 'not eating', outcome: 'Not quite — Students believe Anorexia Nervosa is "just extreme dieting" and Bulimia Nervosa is "just vomiting.', reveals: 'anorexia-nervosa-is-just-extreme' },
                { text: 'eating too little', outcome: 'Not quite — Students believe Anorexia Nervosa is "just extreme dieting" and Bulimia Nervosa is "just vomiting.', reveals: 'anorexia-nervosa-is-just-extreme' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_012', title: 'Adolescent Anaemia: Prevalence, Causes and Prevention',
          caseStudy: { intro: 'Imagine a 15-year-old girl in your neighbourhood who feels exhausted after climbing one flight of stairs, looks pale, and has been missing school frequently.',
            decisions: [{ prompt: 'According to NFHS-3 (2005–06), what was the reported prevalence of anaemia among adolescent girls (15–19 years) in India, and how did.', options: [
                { text: 'NFHS-3 reported 56% prevalence in adolescent girls versus 30% in adolescent boys (15–19', outcome: 'NFHS-3 reported 56% prevalence in adolescent girls versus 30% in adolescent boys (15–19 years).' },
                { text: 'eating spinach (palak) daily is enough to prevent anaemia', outcome: 'Not quite — Students often believe that “eating spinach (palak) daily is enough to prevent anaemia” because.', reveals: 'eating-spinach-palak-daily-is' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'Food, Nutrition and Health · Part 2/2', spots: [
            { id: 's1', label: 'Recommended Dietary Allowances RDA Meaning and Application', prompt: 'Which idea is this? — Recommended Dietary Allowances (RDAs) are the estimated nutrient intake levels that meet.', answer: 'Recommended Dietary Allowances RDA Meaning and Application', options: ['Recommended Dietary Allowances RDA Meaning and Application', 'Food Guide Pyramid for Indians and Vegetarian Food Guide', 'Adolescent Dietary Patterns and Nutritional Needs', 'Eating Disorders Anorexia Nervosa and Bulimia Nervosa'] },
            { id: 's2', label: 'Food Guide Pyramid for Indians and Vegetarian Food Guide', prompt: 'Which idea is this? — The Food Guide Pyramid for Indians is a visual dietary guide that translates the five.', answer: 'Food Guide Pyramid for Indians and Vegetarian Food Guide', options: ['Food Guide Pyramid for Indians and Vegetarian Food Guide', 'Recommended Dietary Allowances RDA Meaning and Application', 'Adolescent Dietary Patterns and Nutritional Needs', 'Eating Disorders Anorexia Nervosa and Bulimia Nervosa'] },
            { id: 's3', label: 'Adolescent Dietary Patterns and Nutritional Needs', prompt: 'Which idea is this? — Adolescent dietary patterns refer to the habitual food choices, eating behaviors, and.', answer: 'Adolescent Dietary Patterns and Nutritional Needs', options: ['Adolescent Dietary Patterns and Nutritional Needs', 'Recommended Dietary Allowances RDA Meaning and Application', 'Food Guide Pyramid for Indians and Vegetarian Food Guide', 'Eating Disorders Anorexia Nervosa and Bulimia Nervosa'] },
            { id: 's4', label: 'Eating Disorders Anorexia Nervosa and Bulimia Nervosa', prompt: 'Which idea is this? — Eating disorders are serious mental health conditions characterized by persistent.', answer: 'Eating Disorders Anorexia Nervosa and Bulimia Nervosa', options: ['Eating Disorders Anorexia Nervosa and Bulimia Nervosa', 'Recommended Dietary Allowances RDA Meaning and Application', 'Food Guide Pyramid for Indians and Vegetarian Food Guide', 'Adolescent Dietary Patterns and Nutritional Needs'] },
            { id: 's5', label: 'Adolescent Anaemia Prevalence Causes and Prevention', prompt: 'Which idea is this? — Adolescent anaemia is a condition characterised by haemoglobin concentration below the.', answer: 'Adolescent Anaemia Prevalence Causes and Prevention', options: ['Adolescent Anaemia Prevalence Causes and Prevention', 'Recommended Dietary Allowances RDA Meaning and Application', 'Food Guide Pyramid for Indians and Vegetarian Food Guide', 'Adolescent Dietary Patterns and Nutritional Needs'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school health camp, a volunteer explains: \'Macronutrients are the energy-givers, micronutrients are vitamins and minerals — water and fibre are micros since they give no calories. And nutrition science is basically the study of which nutrients do what.\'',
            decisions: [{ prompt: 'What should the briefing correct?', options: [
                { text: 'Correct the classification basis: macro vs micro is by quantity needed — grams vs milligrams — not by function; water and fibre are required in large amounts. And nutrition science isn\'t only physiology: the social (who gets served first), psychological (stress eating, body image) and economic (cost of diverse foods) dimensions are constitutive — that\'s why identical meals yield different outcomes for different people.', outcome: 'The camp briefing improves: food is fuel, building material, regulator and shield — and nutrition is biology plus behaviour and society, not a nutrient list.' },
                { text: 'Keep the function-based split — energy-givers are macro, protectors are micro; it\'s simpler.', outcome: 'Simplicity misclassifies: protein builds but is macro, fibre protects but is needed in grams — the dividing line is how much the body requires.', reveals: 'macro-means-energy-nutrient' },
                { text: 'Keep the narrow definition — social and economic factors are context around the science, not part of it.', outcome: 'Without them you can\'t explain real outcomes: an adequate diet still fails through gendered food allocation or cost barriers — the science includes those mechanisms.', reveals: 'nutrition-is-only-biology' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_012', title: 'You made it',
          caseStudy: { intro: 'No single food carries everything — rice gives energy but hides no vitamin C; variety is a design rule, not a luxury.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_007', difficulty: 'standard',
          question: 'Recommended Dietary Allowances (RDAs) are the estimated nutrient intake levels.',
          hint: 'If stuck on the safety margin concept, revisit the normal distribution curve from Class.',
          misconception: 'Students treat RDA as the "exact daily need" for a specific person and believe eating exactly the RDA value guarantees.',
          parts: [
                { id: 'a', prompt: 'State the formula that relates Recommended Dietary Allowance (RDA), nutrient requirement, and margin of safety as given in the NCERT textbook.', answer: 'RDA = Requirement + Margin of safety',
                  options: ['RDA = Requirement + Margin of safety', 'RDA = Requirement', 'RDA = Requirement × Safety factor'],
                  hint: 'If stuck on the safety margin concept, revisit the normal distribution curve from Class 10.',
                  misconception: 'Students treat RDA as the "exact daily need" for a specific person and believe eating exactly the RDA value guarantees adequacy.' },
                { id: 'b', prompt: 'Explain in your own words why the RDA for a nutrient is set higher than the average physiological requirement for that nutrient.', answer: 'The average requirement meets the need of only 50% of healthy individuals',
                  options: ['The average requirement meets the need of only 50% of healthy individuals', 'extra for safety'],
                  hint: 'If stuck on the safety margin concept, revisit the normal distribution curve from Class 10.',
                  misconception: 'Students treat RDA as the "exact daily need" for a specific person and believe eating exactly the RDA value guarantees adequacy.' }
          ],
            remediations: { 'students-treat-rda-as-the': { steps: ['Have the student write the definition of RDA from the textbook key terms box verbatim, then underline "practically all.', 'Draw a normal distribution curve on paper — mark mean (EAR), mean + 2SD (RDA), and shade the 2-3% tail beyond RDA.', 'Give a case: "Girl, 15 yr, RDA iron 28 mg. She eats 25 mg daily from diverse foods.', 'Practice 3 menu-evaluation exercises where total intake is 85-95% of RDA — teach them to comment "likely adequate due.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_008', difficulty: 'standard',
          question: 'Food group classification is a systematic categorization of foods based.',
          hint: 'If stuck, revisit the nutrient classification table in node c11_hs_cbse_03_003.',
          misconception: 'Students believe that "protective foods" (fruits/vegetables) and "body-building foods" (pulses/milk/meat) are mutually.',
          parts: [
                { id: 'a', prompt: 'A student claims that "since milk contains protein, fat, calcium, and B12, it can replace both the pulses group and the meat group in a vegetarian diet.".', answer: 'Milk is a poor source of iron, fibre, and vitamin C, and its protein, though',
                  options: ['Milk is a poor source of iron, fibre, and vitamin C, and its protein, though', 'protective foods', 'body-building foods'],
                  hint: 'If stuck, revisit the nutrient classification table in node c11_hs_cbse_03_003 (macronutrients.',
                  misconception: 'Students believe that "protective foods" (fruits/vegetables) and "body-building foods" (pulses/milk/meat) are mutually exclusive.' },
                { id: 'b', prompt: 'Plan a vegetarian lunch menu for a 16-year-old girl that includes at least one serving from each of the five ICMR food groups.', answer: 'Example menu: (1) Wheat chapati (Cereals) → Thiamine (B1), Iron',
                  options: ['Example menu: (1) Wheat chapati (Cereals) → Thiamine (B1), Iron', 'at least one serving from each group', 'protective foods', 'body-building foods'],
                  hint: 'If stuck, revisit the nutrient classification table in node c11_hs_cbse_03_003 (macronutrients.',
                  misconception: 'Students believe that "protective foods" (fruits/vegetables) and "body-building foods" (pulses/milk/meat) are mutually exclusive.' }
          ],
            remediations: { 'protective-foods-fruits-vegetables-and': { steps: ['If a student misclassifies soybean or coconut, do NOT simply give the correct group.', 'Instead: (1) Ask them to list macronutrient percentages for soybean (protein 43%, fat 20%, carb 30%) and coconut (fat.', '(2) Have them compare these to the *predominant* nutrient of each group: Pulses = protein (20-25%), low fat (1-2%).', '(3) Guide them to see that soybean\'s fat is 10x higher than typical pulses, so it contributes significant fat calories.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "protective foods" (fruits/vegetables) and "body-building foods" (pulses/milk/meat) are mutually.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The Food Guide Pyramid puts fats and sugars at the apex meaning they are unimportant and should be avoided completely." Use the.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'eliminate', 'protective foods', 'body-building foods'],
                  hint: 'If stuck, revisit the nutrient classification table in node c11_hs_cbse_03_003 (macronutrients.',
                  misconception: 'Students believe that "protective foods" (fruits/vegetables) and "body-building foods" (pulses/milk/meat) are mutually exclusive.' },
                { id: 'b', prompt: 'Design a one-day "deficiency demonstration menu" for a Class 11 student that deliberately excludes one entire food group.', answer: 'Example: Exclude Group III (Milk/Meat)',
                  options: ['Example: Exclude Group III (Milk/Meat)', 'protective foods', 'body-building foods'],
                  hint: 'If stuck, revisit the nutrient classification table in node c11_hs_cbse_03_003 (macronutrients.',
                  misconception: 'Students believe that "protective foods" (fruits/vegetables) and "body-building foods" (pulses/milk/meat) are mutually exclusive.' }
          ],
            remediations: { 'protective-foods-fruits-vegetables-and': { steps: ['If a student misclassifies soybean or coconut, do NOT simply give the correct group.', 'Instead: (1) Ask them to list macronutrient percentages for soybean (protein 43%, fat 20%, carb 30%) and coconut (fat.', '(2) Have them compare these to the *predominant* nutrient of each group: Pulses = protein (20-25%), low fat (1-2%).', '(3) Guide them to see that soybean\'s fat is 10x higher than typical pulses, so it contributes significant fat calories.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_009', difficulty: 'standard',
          question: 'The Food Guide Pyramid for Indians is a visual dietary guide that translates.',
          hint: 'If stuck, revisit the \'Five Food Groups\' table in node c11_hs_cbse_03_008 and practice.',
          misconception: 'Students often believe the Vegetarian Food Guide is a separate, smaller pyramid with fewer servings — they think.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Food Guide Pyramid for Indians is a visual dietary guide that translates the five',
                  options: ['The Food Guide Pyramid for Indians is a visual dietary guide that translates the five', 'Food is any solid or liquid substance that, when ingested, digested, and assimilated,', 'Nutrition Science is the systematic study of foods, nutrients, and other bioactive', 'Nutrients are the specific chemical constituents in food that the human body requires in'],
                  hint: 'If stuck, revisit the \'Five Food Groups\' table in node c11_hs_cbse_03_008 and practice classifying.',
                  misconception: 'Students often believe the Vegetarian Food Guide is a separate, smaller pyramid with fewer servings — they think \'vegetarian\' means \'less.' }
          ],
            remediations: { 'the-vegetarian-food-guide-is': { steps: ['If a student shows this misconception, do NOT just re-list the servings.', 'Instead: 1) Have them calculate protein from 30g raw dal (≈7g), 1 egg (≈6g), 50g chicken (≈10g) using the nutritive.', '2) Ask them to plan a day where the *only* change is swapping 50g chicken for 30g dal + 15g curd — they will see total.', '3) Emphasize the pyramid\'s serving *count* is fixed; the *choice* within the group varies.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_010', difficulty: 'standard',
          question: 'Adolescent dietary patterns refer to the habitual food choices, eating.',
          hint: 'Revisit c11_hs_cbse_03_007 (RDA tables) and c11_hs_cbse_03_008 (food group classification.',
          misconception: 'Students believe "adolescents need more protein than adults, so they should eat extra meat/eggs daily." In reality.',
          parts: [
                { id: 'a', prompt: 'A 16-year-old vegetarian boy consumes 3 chapatis (90g wheat), 1 cup cooked dal (30g raw), 1 cup curd (200g), 100g spinach, and 10g oil daily.', answer: 'Underrepresented groups: Fruits (0 servings vs',
                  options: ['Underrepresented groups: Fruits (0 servings vs', 'protein deficiency', 'increased needs', 'more meat'],
                  hint: 'Revisit c11_hs_cbse_03_007 (RDA tables) and c11_hs_cbse_03_008 (food group classification with.',
                  misconception: 'Students believe "adolescents need more protein than adults, so they should eat extra meat/eggs daily." In reality, ICMR RDA 2020 for.' },
                { id: 'b', prompt: 'Calculate the total energy (kcal) and protein (g) provided by the following adolescent breakfast: 2 aloo parathas (each: 50g wheat flour + 30g potato + 5g.', answer: 'Step 1: Calculate per paratha: wheat 50g → 170 kcal, 6g protein',
                  options: ['Step 1: Calculate per paratha: wheat 50g → 170 kcal, 6g protein', 'increased needs', 'more meat', 'more total food from all groups'],
                  hint: 'Revisit c11_hs_cbse_03_007 (RDA tables) and c11_hs_cbse_03_008 (food group classification with.',
                  misconception: 'Students believe "adolescents need more protein than adults, so they should eat extra meat/eggs daily." In reality, ICMR RDA 2020 for.' },
                { id: 'c', prompt: 'Analyze why adolescent girls in urban India show higher prevalence of iron deficiency anemia (56% per NFHS-3) than boys (30%), despite similar RDA for iron (28.', answer: 'Physiological: Menarche adds ~0.5–1 mg/day iron loss',
                  options: ['Physiological: Menarche adds ~0.5–1 mg/day iron loss', 'menstruation', 'increased needs', 'more meat'],
                  hint: 'Revisit c11_hs_cbse_03_007 (RDA tables) and c11_hs_cbse_03_008 (food group classification with.',
                  misconception: 'Students believe "adolescents need more protein than adults, so they should eat extra meat/eggs daily." In reality, ICMR RDA 2020 for.' }
          ],
            remediations: { 'adolescents-need-more-protein-than': { steps: ['If a student insists on high meat intake, do: (1) Show ICMR RDA table: protein requirement for 14 yr boy = 46g/day; 3.', '(2) Calculate saturated fat: 3 eggs = 9g sat fat (45% of 20g limit); add ghee/butter → exceeds limit.', '(3) Demonstrate calcium loss: high protein increases urinary calcium excretion; adolescents need 800mg calcium for peak.', '(4) Assign: redesign the day\'s menu using cereal-pulse-milk-vegetable combos to meet protein *and* calcium *and* fiber.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_011', difficulty: 'standard',
          question: 'Eating disorders are serious mental health conditions characterized.',
          hint: 'If unable to plan the balanced diet, revisit c11_hs_cbse_03_006 (balanced diet.',
          misconception: 'Students believe Anorexia Nervosa is "just extreme dieting" and Bulimia Nervosa is "just vomiting after eating,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Eating disorders are serious mental health conditions characterized by persistent',
                  options: ['Eating disorders are serious mental health conditions characterized by persistent', 'Food is any solid or liquid substance that, when ingested, digested, and assimilated,', 'Nutrition Science is the systematic study of foods, nutrients, and other bioactive', 'Nutrients are the specific chemical constituents in food that the human body requires in'],
                  hint: 'If unable to plan the balanced diet, revisit c11_hs_cbse_03_006 (balanced diet components) and.',
                  misconception: 'Students believe Anorexia Nervosa is "just extreme dieting" and Bulimia Nervosa is "just vomiting after eating," missing that both are.' }
          ],
            remediations: { 'anorexia-nervosa-is-just-extreme': { steps: ['Have the student create a two-column table contrasting "Dieting" vs.', 'Ask them to identify which dimension(s) shift a behavior from "dieting" to "disorder" (loss of control, psychological.', 'Assign a 200-word reflection: "Why does the textbook say \'dieting unsupervised by experts can lead to dangerous.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_012', difficulty: 'standard',
          question: 'Adolescent anaemia is a condition characterised by haemoglobin concentration.',
          hint: 'Revisit the “Micronutrients” section in c11_hs_cbse_03_003 and the “Food Group.',
          misconception: 'Students often believe that “eating spinach (palak) daily is enough to prevent anaemia” because it is famously high.',
          parts: [
                { id: 'a', prompt: 'A 14-year-old vegetarian girl (weight 45 kg) consumes 18 mg dietary iron/day from cereals, pulses, and vegetables.', answer: 'Step 1: Absorbed iron = 18 mg × 0.05 = 0.9 mg/day',
                  options: ['Step 1: Absorbed iron = 18 mg × 0.05 = 0.9 mg/day', 'eating spinach (palak) daily is enough to prevent anaemia'],
                  hint: 'Revisit the “Micronutrients” section in c11_hs_cbse_03_003 and the “Food Group IV – Fruits and.',
                  misconception: 'Students often believe that “eating spinach (palak) daily is enough to prevent anaemia” because it is famously high in iron.' }
          ],
            remediations: { 'eating-spinach-palak-daily-is': { steps: ['Show the student the oxalate-iron binding reaction (Fe²⁺ + C₂O₄²⁻ → FeC₂O₄↓) and compare absorption from 100 g spinach.', 'Have them calculate how many cups of cooked spinach are needed to match the iron in one WIFS tablet (100 mg elemental.', 'Assign a mini-project: “Modify three common home recipes (e.g., dal, paratha, chutney) to increase iron bioavailability.', 'Re-test with a case study where a girl eats spinach daily but remains anaemic; ask the student to diagnose why and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
