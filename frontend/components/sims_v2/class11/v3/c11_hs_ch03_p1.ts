import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch03_p1: SimDef = {
    id: 'v3_c11_hs_ch03_p1',
    title: 'Food, Nutrition and Health · Part 1/2',
    subtitle: 'See why identical lunches produce different bodies — food is biology plus society.',
    classLevel: 11, subject: 'home_science', topic: 'Food, Nutrition and Health · Part 1/2',
    chapters: ['c11_hs_ch03'],
    nodeIds: ['c11_hs_cbse_03_001', 'c11_hs_cbse_03_002', 'c11_hs_cbse_03_003', 'c11_hs_cbse_03_004', 'c11_hs_cbse_03_005', 'c11_hs_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a nutritionist auditing a program that should have worked', intro: 'Same tray, same calories, different outcomes — the science of nutrition starts where the lunch line ends.', goal: 'Classify nutrients by requirement scale and apply nutrition\'s four dimensions.' },
    discovery: {
        question: 'A school serves calorie-adequate mid-day meals, yet a third of the children stay undernourished after a year. The food failed — or did something else?',
        options: ['Something else — caste seating, disliked taste and who eats last at home all sit between adequate food and an adequately fed child', 'The food — adequate calories always nourish', 'The children — they chose to be undernourished', 'The calories — the count was surely wrong'],
        answer: 'Something else — caste seating, disliked taste and who eats last at home all sit between adequate food and an adequately fed child',
        hook: 'Nutrition science isn\'t just biology — the social, psychological and economic dimensions aren\'t add-ons; they\'re where meals actually fail.',
    },
    teaching: [
        { title: 'Definition and Role of Food in the Human Body', text: 'Food is any solid or liquid substance that, when ingested, digested, and assimilated, provides the body with essential nutrients (carbohydrates, proteins, fats, vitamins, minerals, water, and fibre).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify roti, spinach, ghee and iodised salt by the grams-versus-micrograms rule, then break the claim that one food or one calorie number can fix malnutrition.',
        labels: ['Definition and Role', 'Definition and Scope', 'Nutrients: Definition and Classification', 'WHO Definition of Health', 'Relationship Between Food, Nutrition,', 'Concept of Balanced Diet'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_03_001', title: 'Definition and Role of Food in the Human Body',
          scaffold: { problem: 'A Class 11 student\'s breakfast consists of 2 whole wheat rotis (60 g carbohydrate, 12 g protein, 3 g fat), 1 cup milk (12 g carbohydrate, 8.',
            steps: [
            { text: 'Sum the macronutrients across all three food items: Total carbohydrate = 60 + 12 + 27 = 99 g; Total protein = 12 + 8.' },
            { text: 'Apply the energy conversion factors (4-4-9 rule): Energy from carbohydrate = 99 × 4 = 396 kcal; Energy from protein.' },
            { text: 'Calculate total energy = 396 + 84 + 102.6 = 582.6 kcal.' },
            { text: 'Calculate percentage contributions: Carbohydrate % = (396 / 582.6) × 100 = 68.0%; Protein % = (84 / 582.6) × 100.' },
            { text: 'Verify sum of percentages ≈ 100% (68.0 + 14.4 + 17.6 = 100%) and interpret: This breakfast is carbohydrate-dominant.', faded: true, blankAnswer: 'Total energy = 582.6 kcal; Carbohydrate = 68.0%, Protein.' }
            ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_002', title: 'Definition and Scope of Nutrition Science',
          caseStudy: { intro: 'Imagine two teenagers, Riya and Arjun, both eat the same school lunch every day — yet Riya is energetic and maintains healthy weight while Arjun feels sluggish.',
            decisions: [{ prompt: 'State the NCERT definition of Nutrition Science and list its four dimensions.', options: [
                { text: 'Correct answer: Nutrition Science is the science of foods, nutrients, and other', outcome: 'Correct answer: Nutrition Science is the science of foods, nutrients, and other substances they.' },
                { text: 'nutrition is digestion and absorption', outcome: 'Not quite — Students equate Nutrition Science with "studying nutrients" or "healthy eating guidelines." They.', reveals: 'students-equate-nutrition-science-with' },
                { text: 'only mentions physiological processes (e', outcome: 'Not quite — Students equate Nutrition Science with "studying nutrients" or "healthy eating guidelines." They.', reveals: 'students-equate-nutrition-science-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_003', title: 'Nutrients: Definition and Classification into Macronutrients and Micronutrients',
          caseStudy: { intro: 'Imagine you are planning a tiffin for your younger sibling — you pack a roti (carbohydrate), dal (protein), a spoon of ghee (fat), a guava (vitamin C), and.',
            decisions: [{ prompt: 'State the precise quantitative criterion (with units) used in NCERT to classify a nutrient as a macronutrient versus a micronutrient, and.', options: [
                { text: 'Correct answer: Macronutrients are required in gram (g) quantities per day', outcome: 'Correct answer: Macronutrients are required in gram (g) quantities per day; micronutrients are.' },
                { text: 'carbohydrates, proteins, fats', outcome: 'Not quite — Students categorically believe "macronutrients = energy-giving nutrients (carbs, proteins, fats)".', reveals: 'students-categorically-believe-macronutrients-en' },
                { text: 'large amount vs small amount', outcome: 'Not quite — Students categorically believe "macronutrients = energy-giving nutrients (carbs, proteins, fats)".', reveals: 'students-categorically-believe-macronutrients-en' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_004', title: 'WHO Definition of Health and Dimensions of Well-being',
          caseStudy: { intro: 'Imagine a Class 11 student, Rohan, who has no diagnosed illness, attends school regularly, and eats three meals a day.',
            decisions: [{ prompt: 'State the exact WHO (1948) definition of health and identify the three dimensions it encompasses.', options: [
                { text: 'Correct answer: "Health is a state of complete physical, mental and social well-being and', outcome: 'Correct answer: "Health is a state of complete physical, mental and social well-being and not.' },
                { text: 'complete', outcome: 'Not quite — Students equate "mental health" with "absence of mental illness" and "social health" with "being.', reveals: 'students-equate-mental-health-with' },
                { text: 'not merely the absence of disease', outcome: 'Not quite — Students equate "mental health" with "absence of mental illness" and "social health" with "being.', reveals: 'students-equate-mental-health-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_005', title: 'Relationship Between Food, Nutrition, Health and Fitness',
          caseStudy: { intro: 'Start with a relatable scenario: "Your friend skips breakfast, grabs a samosa for lunch, and feels too tired to play badminton by evening — which link in the.',
            decisions: [{ prompt: 'Define \'nutrition\' as per the NCERT Class 11 textbook, listing all five physiological processes it encompasses and the three additional.', options: [
                { text: 'Nutrition is the science of foods, nutrients, and other substances they contain', outcome: 'Nutrition is the science of foods, nutrients, and other substances they contain; and of their.' },
                { text: 'eating and digestion', outcome: 'Not quite — Students believe "healthy food = healthy body" in a linear, guaranteed way — e.g., "If I eat.', reveals: 'healthy-food-healthy-body-in' },
                { text: 'healthy food = healthy body', outcome: 'Not quite — Students believe "healthy food = healthy body" in a linear, guaranteed way — e.g., "If I eat.', reveals: 'healthy-food-healthy-body-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_006', title: 'Concept of Balanced Diet and Its Components',
          caseStudy: { intro: 'Imagine you are packing a tiffin for your younger sibling who has sports practice after school. You put in two aloo parathas and a mango.',
            decisions: [{ prompt: 'State the ICMR definition of a balanced diet and list its six defining characteristics as per the NCERT textbook.', options: [
                { text: 'A balanced diet includes a variety of foods in adequate amounts and correct proportions', outcome: 'A balanced diet includes a variety of foods in adequate amounts and correct proportions to meet.' },
                { text: 'eating all food groups', outcome: 'Not quite — Students equate "balanced diet" with "eating equal amounts from each food group" or "eating.', reveals: 'students-equate-balanced-diet-with' },
                { text: 'only "eating all food groups" or confusing RDA with requirement', outcome: 'Not quite — Students equate "balanced diet" with "eating equal amounts from each food group" or "eating.', reveals: 'students-equate-balanced-diet-with' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Food, Nutrition and Health · Part 1/2', spots: [
            { id: 's1', label: 'Definition and Role of Food in the Human Body', prompt: 'Which idea is this? — Food is any solid or liquid substance that, when ingested, digested, and assimilated.', answer: 'Definition and Role of Food in the Human Body', options: ['Definition and Role of Food in the Human Body', 'Definition and Scope of Nutrition Science', 'WHO Definition of Health and Dimensions of Well-being', 'Relationship Between Food Nutrition Health and Fitness'] },
            { id: 's2', label: 'Definition and Scope of Nutrition Science', prompt: 'Which idea is this? — Nutrition Science is the systematic study of foods, nutrients, and other bioactive.', answer: 'Definition and Scope of Nutrition Science', options: ['Definition and Scope of Nutrition Science', 'Definition and Role of Food in the Human Body', 'WHO Definition of Health and Dimensions of Well-being', 'Relationship Between Food Nutrition Health and Fitness'] },
            { id: 's3', label: 'WHO Definition of Health and Dimensions of Well-being', prompt: 'Which idea is this? — Health, as defined by the World Health Organization (WHO) in 1948, is a state of complete.', answer: 'WHO Definition of Health and Dimensions of Well-being', options: ['WHO Definition of Health and Dimensions of Well-being', 'Definition and Role of Food in the Human Body', 'Definition and Scope of Nutrition Science', 'Relationship Between Food Nutrition Health and Fitness'] },
            { id: 's4', label: 'Relationship Between Food Nutrition Health and Fitness', prompt: 'Which idea is this? — The relationship between food, nutrition, health, and fitness is a causal chain where.', answer: 'Relationship Between Food Nutrition Health and Fitness', options: ['Relationship Between Food Nutrition Health and Fitness', 'Definition and Role of Food in the Human Body', 'Definition and Scope of Nutrition Science', 'WHO Definition of Health and Dimensions of Well-being'] },
            { id: 's5', label: 'Concept of Balanced Diet and Its Components', prompt: 'Which idea is this? — A balanced diet is a dietary pattern that incorporates a diverse variety of foods.', answer: 'Concept of Balanced Diet and Its Components', options: ['Concept of Balanced Diet and Its Components', 'Definition and Role of Food in the Human Body', 'Definition and Scope of Nutrition Science', 'WHO Definition of Health and Dimensions of Well-being'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school health camp, a volunteer explains: \'Macronutrients are the energy-givers, micronutrients are vitamins and minerals — water and fibre are micros since they give no calories. And nutrition science is basically the study of which nutrients do what.\'',
            decisions: [{ prompt: 'What should the briefing correct?', options: [
                { text: 'Correct the classification basis: macro vs micro is by quantity needed — grams vs milligrams — not by function; water and fibre are required in large amounts. And nutrition science isn\'t only physiology: the social (who gets served first), psychological (stress eating, body image) and economic (cost of diverse foods) dimensions are constitutive — that\'s why identical meals yield different outcomes for different people.', outcome: 'The camp briefing improves: food is fuel, building material, regulator and shield — and nutrition is biology plus behaviour and society, not a nutrient list.' },
                { text: 'Keep the function-based split — energy-givers are macro, protectors are micro; it\'s simpler.', outcome: 'Simplicity misclassifies: protein builds but is macro, fibre protects but is needed in grams — the dividing line is how much the body requires.', reveals: 'macro-means-energy-nutrient' },
                { text: 'Keep the narrow definition — social and economic factors are context around the science, not part of it.', outcome: 'Without them you can\'t explain real outcomes: an adequate diet still fails through gendered food allocation or cost barriers — the science includes those mechanisms.', reveals: 'nutrition-is-only-biology' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'No single food carries everything — rice gives energy but hides no vitamin C; variety is a design rule, not a luxury.',
            decisions: [{ prompt: 'What comes next? Food, Nutrition and Health · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Food, Nutrition and Health · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_001', difficulty: 'standard',
          question: 'Food is any solid or liquid substance that, when ingested, digested, and.',
          hint: 'Review Class 10 Biology Chapter 6 (Life Processes) — specifically the human digestive.',
          misconception: 'Students believe "macronutrient = energy-giving nutrient" and "micronutrient = vitamin/mineral only." They classify.',
          parts: [
                { id: 'a', prompt: 'Define "food" according to the NCERT Class 11 Home Science textbook.', answer: 'Food is anything solid or liquid',
                  options: ['Food is anything solid or liquid', 'assimilated', 'gives energy only', 'macronutrient = energy-giving nutrient'],
                  hint: 'Review Class 10 Biology Chapter 6 (Life Processes) — specifically the human digestive system.',
                  misconception: 'Students believe "macronutrient = energy-giving nutrient" and "micronutrient = vitamin/mineral only." They classify water and fibre.' },
                { id: 'b', prompt: 'A student says, "Nutrition and food mean the same thing — what you eat." Explain why this statement is incorrect using the precise NCERT definitions of both.', answer: 'Food is the substance consumed',
                  options: ['Food is the substance consumed', 'macronutrient = energy-giving nutrient', 'micronutrient = vitamin/mineral only', 'they don\'t give calories'],
                  hint: 'Review Class 10 Biology Chapter 6 (Life Processes) — specifically the human digestive system.',
                  misconception: 'Students believe "macronutrient = energy-giving nutrient" and "micronutrient = vitamin/mineral only." They classify water and fibre.' },
                { id: 'c', prompt: 'Classify each of the following as a macronutrient or micronutrient source: (a) wheat roti, (b) spinach, (c) ghee, (d) iodised salt.', answer: 'wheat roti, (',
                  options: ['wheat roti, (', 'macronutrient food', 'macronutrient = energy-giving nutrient', 'micronutrient = vitamin/mineral only'],
                  hint: 'Review Class 10 Biology Chapter 6 (Life Processes) — specifically the human digestive system.',
                  misconception: 'Students believe "macronutrient = energy-giving nutrient" and "micronutrient = vitamin/mineral only." They classify water and fibre.' },
                { id: 'd', prompt: 'Compare the energy contribution of 20 g of carbohydrate vs 20 g of fat.', answer: '20 g carbohydrate = 80 kcal (20 × 4)',
                  options: ['20 g carbohydrate = 80 kcal (20 × 4)', 'fibre gives energy', 'water is not a nutrient', 'macronutrient = energy-giving nutrient'],
                  hint: 'Review Class 10 Biology Chapter 6 (Life Processes) — specifically the human digestive system.',
                  misconception: 'Students believe "macronutrient = energy-giving nutrient" and "micronutrient = vitamin/mineral only." They classify water and fibre.' }
          ],
            remediations: { 'macronutrient-energy-giving-nutrient-and': { steps: ['Ask the student to write the NCERT macronutrient/micronutrient table from memory.', 'Point to water and fibre in the macronutrient column and ask "How many grams of water do you need daily?" (2000–3000.', 'Contrast with "How many milligrams of iron?" (15–30 mg).', 'Have them re-state the definition: "Macronutrients are required in gram quantities per day; micronutrients in milligram.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "macronutrient = energy-giving nutrient" and "micronutrient = vitamin/mineral only." They classify.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since rice provides energy, protein, and B-vitamins, eating only rice in sufficient quantity can meet all nutrient needs." Use the.', answer: 'The claim is false',
                  options: ['The claim is false', 'energy + some protein + some vitamins = complete nutrition', 'macronutrient = energy-giving nutrient', 'micronutrient = vitamin/mineral only'],
                  hint: 'Review Class 10 Biology Chapter 6 (Life Processes) — specifically the human digestive system.',
                  misconception: 'Students believe "macronutrient = energy-giving nutrient" and "micronutrient = vitamin/mineral only." They classify water and fibre.' },
                { id: 'b', prompt: 'Create a one-day meal plan for a Class 11 student that explicitly demonstrates all four functions of food (energy, growth/repair, regulation, protection).', answer: 'Example: Breakfast',
                  options: ['Example: Breakfast', 'macronutrient = energy-giving nutrient', 'micronutrient = vitamin/mineral only', 'they don\'t give calories'],
                  hint: 'Review Class 10 Biology Chapter 6 (Life Processes) — specifically the human digestive system.',
                  misconception: 'Students believe "macronutrient = energy-giving nutrient" and "micronutrient = vitamin/mineral only." They classify water and fibre.' }
          ],
            remediations: { 'macronutrient-energy-giving-nutrient-and': { steps: ['Ask the student to write the NCERT macronutrient/micronutrient table from memory.', 'Point to water and fibre in the macronutrient column and ask "How many grams of water do you need daily?" (2000–3000.', 'Contrast with "How many milligrams of iron?" (15–30 mg).', 'Have them re-state the definition: "Macronutrients are required in gram quantities per day; micronutrients in milligram.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_002', difficulty: 'standard',
          question: 'Nutrition Science is the systematic study of foods, nutrients, and other.',
          hint: 'Revisit c11_hs_cbse_03_001 — specifically the definition of food and its three functions.',
          misconception: 'Students equate Nutrition Science with "studying nutrients" or "healthy eating guidelines." They memorise the NCERT.',
          parts: [
                { id: 'a', prompt: 'State the NCERT definition of Nutrition Science and list its four dimensions.', answer: 'Correct answer: Nutrition Science is the science of foods, nutrients, and other',
                  options: ['Correct answer: Nutrition Science is the science of foods, nutrients, and other', 'nutrition is digestion and absorption', 'only mentions physiological processes (e'],
                  hint: 'Revisit c11_hs_cbse_03_001 — specifically the definition of food and its three functions — then.',
                  misconception: 'Students equate Nutrition Science with "studying nutrients" or "healthy eating guidelines." They memorise the NCERT definition but fail.' },
                { id: 'b', prompt: 'In your own words, explain why the NCERT textbook states that "nutrition has social, psychological and economic dimensions too" — give one concrete example for.', answer: 'Correct answer: Social dimension',
                  options: ['Correct answer: Social dimension', 'iron prevents anaemia', 'gives only physiological examples (e'],
                  hint: 'Revisit c11_hs_cbse_03_001 — specifically the definition of food and its three functions — then.',
                  misconception: 'Students equate Nutrition Science with "studying nutrients" or "healthy eating guidelines." They memorise the NCERT definition but fail.' },
                { id: 'c', prompt: 'A school implements a mid-day meal program providing calorically adequate meals, yet 30% of children remain undernourished after one year.', answer: 'Correct answer with steps: Step 1: Identify the non-physiological dimensions',
                  options: ['Correct answer with steps: Step 1: Identify the non-physiological dimensions', 'meal lacks protein'],
                  hint: 'Revisit c11_hs_cbse_03_001 — specifically the definition of food and its three functions — then.',
                  misconception: 'Students equate Nutrition Science with "studying nutrients" or "healthy eating guidelines." They memorise the NCERT definition but fail.' },
                { id: 'd', prompt: 'Compare and contrast Nutrition Science, Food Science, and Dietetics. Identify one area of overlap and one area of unique focus for each.', answer: 'Correct answer: Overlap: All three study food/nutrients and health',
                  options: ['Correct answer: Overlap: All three study food/nutrients and health', 'all are about healthy eating', 'treats them as synonyms (e'],
                  hint: 'Revisit c11_hs_cbse_03_001 — specifically the definition of food and its three functions — then.',
                  misconception: 'Students equate Nutrition Science with "studying nutrients" or "healthy eating guidelines." They memorise the NCERT definition but fail.' }
          ],
            remediations: { 'students-equate-nutrition-science-with': { steps: ['Have the student interview one family member about a food habit (e.g., "Why do you eat rice daily?"), then code the.', 'Use the mid-day meal case (Diagnostic Q3) — ask the student to role-play as a program officer and list reasons for.', 'Show a 2-minute video clip of a rural meal scene; pause and ask: "What nutrition science dimensions do you see.', 'Require the student to rewrite the NCERT definition in their own words, explicitly naming all four dimensions with one.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_003', difficulty: 'standard',
          question: 'Nutrients are the specific chemical constituents in food that the human body.',
          hint: 'Revisit c11_hs_cbse_03_001 (Definition and Role of Food) and c11_hs_cbse_03_002.',
          misconception: 'Students categorically believe "macronutrients = energy-giving nutrients (carbs, proteins, fats)" and "micronutrients.',
          parts: [
                { id: 'a', prompt: 'State the precise quantitative criterion (with units) used in NCERT to classify a nutrient as a macronutrient versus a micronutrient, and name the five.', answer: 'Correct answer: Macronutrients are required in gram (g) quantities per day',
                  options: ['Correct answer: Macronutrients are required in gram (g) quantities per day', 'carbohydrates, proteins, fats', 'large amount vs small amount'],
                  hint: 'Revisit c11_hs_cbse_03_001 (Definition and Role of Food) and c11_hs_cbse_03_002 (Definition and.',
                  misconception: 'Students categorically believe "macronutrients = energy-giving nutrients (carbs, proteins, fats)" and "micronutrients = protective.' },
                { id: 'b', prompt: 'A student claims: "Water is a micronutrient because it has no calories and does not provide energy." Using the NCERT classification rationale, explain why this.', answer: 'Correct answer: Water is classified as a macronutrient',
                  options: ['Correct answer: Water is classified as a macronutrient', 'energy-yielding', 'macronutrient'],
                  hint: 'Revisit c11_hs_cbse_03_001 (Definition and Role of Food) and c11_hs_cbse_03_002 (Definition and.',
                  misconception: 'Students categorically believe "macronutrients = energy-giving nutrients (carbs, proteins, fats)" and "micronutrients = protective.' }
          ],
            remediations: { 'students-categorically-believe-macronutrients-en': { steps: ['Have the student write the NCERT Figure 1 classification from memory, then compare side-by-side with the textbook.', 'Ask: "If a patient is dehydrated, is this a macronutrient or micronutrient deficiency?" Force the answer using the.', 'Give a 3-food dataset (e.g., 200 ml water, 5 g salt, 10 g oil) and ask the student to compute total macronutrient mass.', 'Assign a 2-mark board-style question: "Define macronutrient. Name the five macronutrients as per NCERT." Grade.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_004', difficulty: 'standard',
          question: 'Health, as defined by the World Health Organization (WHO) in 1948, is a state.',
          hint: 'Revisit Class 8 Biology Chapter 2 "Health and Diseases" – specifically the definition.',
          misconception: 'Students equate "mental health" with "absence of mental illness" and "social health" with "being extroverted/having.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Health, as defined by the World Health Organization (WHO) in 1948, is a state of complete',
                  options: ['Health, as defined by the World Health Organization (WHO) in 1948, is a state of complete', 'Food is any solid or liquid substance that, when ingested, digested, and assimilated,', 'Nutrition Science is the systematic study of foods, nutrients, and other bioactive', 'Nutrients are the specific chemical constituents in food that the human body requires in'],
                  hint: 'Revisit Class 8 Biology Chapter 2 "Health and Diseases" – specifically the definition of health and.',
                  misconception: 'Students equate "mental health" with "absence of mental illness" and "social health" with "being extroverted/having many friends." They.' }
          ],
            remediations: { 'students-equate-mental-health-with': { steps: ['Ask the student to list three people they know—one with a diagnosed illness but strong relationships and purpose, one.', 'Have them apply the WHO definition to each person using a three-column table (Physical, Mental, Social).', 'Guide them to see that Person 1 scores high on Mental/Social despite Physical challenge; Persons 2 and 3 score low.', 'Assign the NCERT paragraph on mental health (page 31) for close reading—highlight "feeling capable," "handling stress,".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_005', difficulty: 'standard',
          question: 'The relationship between food, nutrition, health, and fitness is a causal chain.',
          hint: 'Revisit c11_hs_cbse_03_002 (nutrition definition with five processes) and.',
          misconception: 'Students believe "healthy food = healthy body" in a linear, guaranteed way — e.g., "If I eat spinach daily, I won\'t get.',
          parts: [
                { id: 'a', prompt: 'Define \'nutrition\' as per the NCERT Class 11 textbook, listing all five physiological processes it encompasses and the three additional dimensions beyond.', answer: 'Nutrition is the science of foods, nutrients, and other substances they contain',
                  options: ['Nutrition is the science of foods, nutrients, and other substances they contain', 'eating and digestion', 'healthy food = healthy body', 'If I eat spinach daily, I won\'t get anaemia'],
                  hint: 'Revisit c11_hs_cbse_03_002 (nutrition definition with five processes) and c11_hs_cbse_03_004 (WHO.',
                  misconception: 'Students believe "healthy food = healthy body" in a linear, guaranteed way — e.g., "If I eat spinach daily, I won\'t get anaemia." They.' },
                { id: 'b', prompt: 'An adolescent girl consumes 2000 kcal/day entirely from rice, sugar, and oil (no pulses, vegetables, milk, or meat). She maintains normal weight.', answer: 'Her diet includes only Food Group I (cereals) and Group V (fats/sugars)',
                  options: ['Her diet includes only Food Group I (cereals) and Group V (fats/sugars)', 'low iron', 'healthy food = healthy body', 'If I eat spinach daily, I won\'t get anaemia'],
                  hint: 'Revisit c11_hs_cbse_03_002 (nutrition definition with five processes) and c11_hs_cbse_03_004 (WHO.',
                  misconception: 'Students believe "healthy food = healthy body" in a linear, guaranteed way — e.g., "If I eat spinach daily, I won\'t get anaemia." They.' }
          ],
            remediations: { 'healthy-food-healthy-body-in': { steps: ['Have the student trace iron from spinach → stomach (acid needed) → duodenum (hepcidin check, calcium competition.', 'At each step, ask "What can go wrong even if intake is adequate?"', 'Map each failure point to health dimension (physical: fatigue; mental: concentration; social: withdrawal) and fitness.', 'Contrast with the linear "spinach → blood → energy" mental model.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_03_006', difficulty: 'standard',
          question: 'A balanced diet is a dietary pattern that incorporates a diverse variety.',
          hint: 'If stuck, revisit c11_hs_cbse_03_003 (Nutrients: Definition and Classification) and.',
          misconception: 'Students equate "balanced diet" with "eating equal amounts from each food group" or "eating a little bit.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I eat one item from each of the five food groups every day, my diet is automatically balanced." Evaluate this statement using the.', answer: 'The statement is false',
                  options: ['The statement is false', 'variety = balance', 'Explain why variety alone is insufficient'],
                  hint: 'If stuck, revisit c11_hs_cbse_03_003 (Nutrients: Definition and Classification) and create.',
                  misconception: 'Students equate "balanced diet" with "eating equal amounts from each food group" or "eating a little bit of everything." They visualize the.' }
          ],
            remediations: { 'students-equate-balanced-diet-with': { steps: ['Draw the Food Guide Pyramid on paper.', 'Write the *serving ranges* next to each layer (Cereals: 6-11, Veg: 3-5, Fruit: 2-4, Milk/Meat: 2-3, Fats: sparse).', 'Convert *one serving* of each into grams and kcal using the "Remember" box (1g carb/protein=4kcal, 1g fat=9kcal).', 'Calculate total kcal if you ate the *minimum* servings (6 cereal, 3 veg, 2 fruit, 2 milk, minimal fat).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
