import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch02_p2: SimDef = {
    id: 'v3_c12_hs_ch02_p2',
    title: 'Nutrition, Food Science and Technology · Part 2/2',
    subtitle: 'The label says 20 grams — the body may see far less',
    classLevel: 12, subject: 'home_science', topic: 'Nutrition, Food Science and Technology · Part 2/2',
    chapters: ['c12_hs_ch02'],
    nodeIds: ['c12_hs_cbse_02_007', 'c12_hs_cbse_02_008', 'c12_hs_cbse_02_009', 'c12_hs_cbse_02_010', 'c12_hs_cbse_02_011', 'c12_hs_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Food-system analyst', intro: 'Between farm and fork, food is transformed — and every transformation has a nutritional price or payoff.', goal: 'Connect food science and nutrition — how processing, fortification and bioavailability shape what a diet delivers.' },
    discovery: {
        question: 'A snack label says 20g protein per 100g — yet the extrusion that made it may have burned away the protein\'s usefulness. What\'s the label not telling you?',
        options: ['Quantity isn\'t quality — processing denatures proteins and triggers lysine loss; bioavailability, not the number, is what the body gets', 'The protein is fake', 'Labels always lie', '20g is plenty anyway'],
        answer: 'Quantity isn\'t quality — processing denatures proteins and triggers lysine loss; bioavailability, not the number, is what the body gets',
        hook: 'Food science and nutrition are two lenses on one meal — one asks what food is and how processing transforms it, the other what it does in the body. Milling strips thiamine; fortification adds it back. A nutritionist who ignores processing is reading a photograph of a moving thing.',
    },
    teaching: [
        { title: 'Water-Soluble Vitamins (B-Complex, C): Functions, Sources and Deficiency', text: 'Water-soluble vitamins (B-complex and vitamin C) are organic micronutrients that dissolve in water, are not stored in significant amounts in the body, and must be consumed regularly through diet.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow wheat from grain to fortified biscuit: trace where nutrients are lost, added and unlocked, and learn the questions a nutritionist must ask a process engineer.',
        labels: ['Water-Soluble Vitamins (B-Complex, C)', 'Macro and Micro Minerals', 'Water and Dietary Fibre', 'Food Processing: Objectives, Methods', 'Food Additives: Types, Functions', 'Food Fortification and Enrichment'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_007', title: 'Water-Soluble Vitamins (B-Complex, C): Functions, Sources and Deficiency',
          caseStudy: { intro: 'Imagine you are planning a week\'s meals for a hostel mess where several students complain of fatigue, mouth ulcers, and frequent infections — could their diet.',
            decisions: [{ prompt: 'Name the coenzyme form of vitamin B1 (thiamine) and the central metabolic pathway where it acts as a cofactor.', options: [
                { text: 'The coenzyme form is thiamine pyrophosphate (TPP), and it acts as a cofactor in the', outcome: 'The coenzyme form is thiamine pyrophosphate (TPP), and it acts as a cofactor in the pyruvate.' },
                { text: 'vitamin B-complex', outcome: 'Not quite — Students often believe that "vitamin B-complex" is a single vitamin and that deficiency of one.', reveals: 'vitamin-b-complex-is-a' },
                { text: 'FAD or NAD+', outcome: 'Not quite — Students often believe that "vitamin B-complex" is a single vitamin and that deficiency of one.', reveals: 'vitamin-b-complex-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_008', title: 'Macro and Micro Minerals: Calcium, Iron, Iodine and Zinc Roles',
          caseStudy: { intro: 'Imagine a 14-year-old girl named Priya who feels constantly tired, has pale conjunctiva, and struggles to concentrate in class — her doctor suspects iron.',
            decisions: [{ prompt: 'State the ICMR 2020 RDA for calcium and iron for a 15-year-old girl and a 15-year-old boy.', options: [
                { text: 'Correct answer: Calcium RDA is 1000 mg/day for both genders (15–17 years)', outcome: 'Correct answer: Calcium RDA is 1000 mg/day for both genders (15–17 years).' },
                { text: 'milk is the only good source of calcium', outcome: 'Not quite — Students believe "milk is the only good source of calcium" and "spinach is the best iron source".', reveals: 'milk-is-the-only-good' },
                { text: 'spinach is the best iron source', outcome: 'Not quite — Students believe "milk is the only good source of calcium" and "spinach is the best iron source".', reveals: 'milk-is-the-only-good' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_009', title: 'Water and Dietary Fibre: Functions and Health Significance',
          caseStudy: { intro: 'Imagine a 45-year-old office worker in Delhi who drinks only 1 L water daily, skips breakfast, eats white rice and refined wheat rotis, and complains.',
            decisions: [{ prompt: 'A student writes: "Water provides energy because it is a nutrient." What fundamental error does this reveal about the student\'s.', options: [
                { text: 'Correct answer: Water is a non-energy-yielding nutrient', outcome: 'Correct answer: Water is a non-energy-yielding nutrient; it does not undergo catabolism to produce.' },
                { text: 'essential nutrient', outcome: 'Not quite — Students believe "drinking 8 glasses of water daily" is a universal rule and that "fibre is fibre.', reveals: 'drinking-8-glasses-of-water' },
                { text: 'macronutrient that supplies calories', outcome: 'Not quite — Students believe "drinking 8 glasses of water daily" is a universal rule and that "fibre is fibre.', reveals: 'drinking-8-glasses-of-water' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_010', title: 'Food Processing: Objectives, Methods and Preservation Techniques',
          caseStudy: { intro: 'Imagine you buy fresh tomatoes from the market — within 3 days they turn mushy and mouldy, but a bottle of tomato ketchup lasts 12 months in your pantry.',
            decisions: [{ prompt: 'List the three main objectives of food processing and give one example of a product for each objective where that objective is the PRIMARY.', options: [
                { text: 'The three main objectives are: (1) Safety', outcome: 'The three main objectives are: (1) Safety — e.g., pasteurised milk (pathogen elimination.' },
                { text: 'nutrient retention', outcome: 'Not quite — Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate.', reveals: 'processed-food-unhealthy-and-preservatives' },
                { text: 'processed food = unhealthy', outcome: 'Not quite — Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate.', reveals: 'processed-food-unhealthy-and-preservatives' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_02_011', title: 'Food Additives: Types, Functions and Safety Regulations',
          scaffold: { problem: 'A fruit juice manufacturer uses sodium benzoate (INS 211) at 800 mg/L in a product with pH 3.2.',
            steps: [
            { text: 'Convert FSSAI limit from benzoic acid to sodium benzoate equivalent: 1000 mg/kg benzoic acid × (144.11/122.12) = 1000.' },
            { text: 'Convert limit to mg/L using density: 1180 mg/kg × 1.04 kg/L = 1227 mg/L sodium benzoate.' },
            { text: 'Compare actual use level: 800 mg/L < 1227 mg/L → compliant with maximum permitted level.' },
            { text: 'Check ADI exposure: ADI for benzoates = 5 mg/kg bw/day (JECFA).' },
            { text: 'Verify pH dependency: Benzoates are effective only at pH < 4.5; product pH 3.2 ensures antimicrobial efficacy.', faded: true, blankAnswer: 'Compliant — 800 mg/L sodium benzoate is below the converted.' }
            ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_012', title: 'Food Fortification and Enrichment: Principles and Public Health Impact',
          caseStudy: { intro: 'Imagine you are a public health nutritionist tasked with reducing iron deficiency anaemia among adolescent girls in a rural Indian district.',
            decisions: [{ prompt: 'Define food fortification and food enrichment. Give one example of each from the Indian context.', options: [
                { text: 'Food fortification is the addition of nutrients not originally present or present in', outcome: 'Food fortification is the addition of nutrients not originally present or present in insignificant.' },
                { text: 'fortification', outcome: 'Not quite — Students often think "fortification" and "enrichment" are interchangeable terms, and they cite.', reveals: 'fortification-and-enrichment-are-interchangeable' },
                { text: 'enrichment', outcome: 'Not quite — Students often think "fortification" and "enrichment" are interchangeable terms, and they cite.', reveals: 'fortification-and-enrichment-are-interchangeable' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'Nutrition, Food Science and Technology · Part 2/2', spots: [
            { id: 's1', label: 'Macro and Micro Minerals Calcium Iron Iodine and Zinc Roles', prompt: 'Which idea is this? — Macro and micro minerals are inorganic elements required by the body in relatively large.', answer: 'Macro and Micro Minerals Calcium Iron Iodine and Zinc Roles', options: ['Macro and Micro Minerals Calcium Iron Iodine and Zinc Roles', 'Water and Dietary Fibre Functions and Health Significance', 'Food Additives Types Functions and Safety Regulations'] },
            { id: 's2', label: 'Water and Dietary Fibre Functions and Health Significance', prompt: 'Which idea is this? — Water is an essential nutrient constituting 60-70% of body weight, serving as the.', answer: 'Water and Dietary Fibre Functions and Health Significance', options: ['Water and Dietary Fibre Functions and Health Significance', 'Macro and Micro Minerals Calcium Iron Iodine and Zinc Roles', 'Food Additives Types Functions and Safety Regulations'] },
            { id: 's3', label: 'Food Additives Types Functions and Safety Regulations', prompt: 'Which idea is this? — Food additives are substances intentionally added to food in small quantities during.', answer: 'Food Additives Types Functions and Safety Regulations', options: ['Food Additives Types Functions and Safety Regulations', 'Macro and Micro Minerals Calcium Iron Iodine and Zinc Roles', 'Water and Dietary Fibre Functions and Health Significance'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A fitness-app founder pitches at your school: \'Food is fuel — macros, calories, nothing more. We strip the sentiment out of eating.\'',
            decisions: [{ prompt: 'Which of the three functions of food does the pitch erase?', options: [
                { text: 'Two of them — the pitch covers only the physiological function; food also works psychologically (comfort, pleasure, security) and socio-culturally (festival dishes, langar, hospitality) — a festival sweet is the same flour and sugar as any dessert, but the occasion is what it feeds.', outcome: 'The chapter\'s point: context decides the dominant function — identical nutrients serve energy in one meal and identity in another; \'just fuel\' reads composition and misses the reason for eating.' },
                { text: 'Endorse it — nutrition science is objective; attaching emotion to food causes bad eating.', outcome: 'The chapter treats the psychological and social functions as real functions, not noise — comfort eating and festival food meet needs the calorie count can\'t see; stripping them doesn\'t make eating \'pure\', it makes it incomplete.', reveals: 'food-is-only-fuel' },
                { text: 'Concede partially — keep a \'cheat meal\' slot for the emotional side.', outcome: 'That quarantines what the chapter integrates: one meal can serve all three functions at once — comfort, bonding and nourishment aren\'t separate courses to be scheduled.', reveals: 'emotion-is-a-cheat-slot' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'You can now read food as a process, not a label — and pair the food scientist\'s \'what it is\' with the nutritionist\'s \'what it does.\'',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_007', difficulty: 'standard',
          question: 'Water-soluble vitamins (B-complex and vitamin C) are organic micronutrients.',
          hint: 'If stuck, revisit c11_bio_cbse_09_005 (Enzymes: Nature and Mechanism of Action) and.',
          misconception: 'Students often believe that "vitamin B-complex" is a single vitamin and that deficiency of one B-vitamin produces.',
          parts: [
                { id: 'a', prompt: 'A 16-year-old vegetarian student consumes 300 g of cooked rice, 100 g of cooked dal, 100 g of boiled potato, and 100 g of curd daily, but no fruits or leafy.', answer: 'Vitamin C intake = 100 g potato × 10 mg/100g = 10 mg',
                  options: ['Vitamin C intake = 100 g potato × 10 mg/100g = 10 mg', 'vitamin B-complex'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_005 (Enzymes: Nature and Mechanism of Action) and.',
                  misconception: 'Students often believe that "vitamin B-complex" is a single vitamin and that deficiency of one B-vitamin produces a single, isolated.' },
                { id: 'b', prompt: 'Compare and contrast the biochemical basis of neurological symptoms in vitamin B12 deficiency versus vitamin B6 deficiency, referencing their respective.', answer: 'B12 (as methylcobalamin) is required for methionine synthase',
                  options: ['B12 (as methylcobalamin) is required for methionine synthase', 'vitamin B-complex'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_005 (Enzymes: Nature and Mechanism of Action) and.',
                  misconception: 'Students often believe that "vitamin B-complex" is a single vitamin and that deficiency of one B-vitamin produces a single, isolated.' }
          ],
            remediations: { 'vitamin-b-complex-is-a': { steps: ['If the student cannot differentiate the coenzyme roles or match deficiencies to vitamins, have them: (1) Revisit.', '(2) Create a concept map linking each B-vitamin → coenzyme → specific enzyme → pathway → deficiency symptom.', '(3) Practice with a diagnostic worksheet: given a case study (e.g., alcoholic with confusion, ataxia, ophthalmoplegia).', '(4) Re-attempt DIAGNOSTIC_QUESTION_4 after the concept map exercise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "vitamin B-complex" is a single vitamin and that deficiency of one B-vitamin produces.',
          parts: [
                { id: 'a', prompt: 'Design a one-day vegetarian menu for a pregnant woman (second trimester) that meets the ICMR RDAs for folate (500 µg), vitamin B12 (1.2 µg), and vitamin C (60.', answer: 'Example menu: Breakfast',
                  options: ['Example menu: Breakfast', 'vitamin B-complex'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_005 (Enzymes: Nature and Mechanism of Action) and.',
                  misconception: 'Students often believe that "vitamin B-complex" is a single vitamin and that deficiency of one B-vitamin produces a single, isolated.' }
          ],
            remediations: { 'vitamin-b-complex-is-a': { steps: ['If the student cannot differentiate the coenzyme roles or match deficiencies to vitamins, have them: (1) Revisit.', '(2) Create a concept map linking each B-vitamin → coenzyme → specific enzyme → pathway → deficiency symptom.', '(3) Practice with a diagnostic worksheet: given a case study (e.g., alcoholic with confusion, ataxia, ophthalmoplegia).', '(4) Re-attempt DIAGNOSTIC_QUESTION_4 after the concept map exercise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_008', difficulty: 'standard',
          question: 'Macro and micro minerals are inorganic elements required by the body.',
          hint: 'If stuck on absorption mechanisms, revisit c11_bio_cbse_16_004 (renal handling.',
          misconception: 'Students believe "milk is the only good source of calcium" and "spinach is the best iron source".',
          parts: [
                { id: 'a', prompt: 'State the ICMR 2020 RDA for calcium and iron for a 15-year-old girl and a 15-year-old boy.', answer: 'Correct answer: Calcium RDA is 1000 mg/day for both genders (15–17 years)',
                  options: ['Correct answer: Calcium RDA is 1000 mg/day for both genders (15–17 years)', 'milk is the only good source of calcium', 'spinach is the best iron source', 'milk, spinach'],
                  hint: 'If stuck on absorption mechanisms, revisit c11_bio_cbse_16_004 (renal handling of calcium) and.',
                  misconception: 'Students believe "milk is the only good source of calcium" and "spinach is the best iron source".' },
                { id: 'b', prompt: 'A 30-year-old vegetarian woman (non-pregnant, non-lactating) consumes 18 mg iron/day from plant sources.', answer: 'Step 1: Dietary iron = 18 mg/day',
                  options: ['Step 1: Dietary iron = 18 mg/day', 'milk is the only good source of calcium', 'spinach is the best iron source', 'milk, spinach'],
                  hint: 'If stuck on absorption mechanisms, revisit c11_bio_cbse_16_004 (renal handling of calcium) and.',
                  misconception: 'Students believe "milk is the only good source of calcium" and "spinach is the best iron source".' }
          ],
            remediations: { 'milk-is-the-only-good': { steps: ['If student cannot explain bioavailability differences or calculate absorbed nutrients: 1) Revisit c12_hs_cbse_02_003.', '2) Review c11_bio_cbse_16_004 (Tubular Reabsorption) for calcium homeostasis hormones.', '3) Re-do Worked Example 3 with a different inhibitor (phytate in whole wheat) and enhancer (amla).', '4) Take a 5-question re-diagnostic on "mineral enhancers/inhibitors" from CBSE sample papers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_009', difficulty: 'standard',
          question: 'Water is an essential nutrient constituting 60-70% of body weight, serving.',
          hint: 'Revisit c11_bio_cbse_09_001: compare starch (α-1,4/α-1,6) vs cellulose (β-1,4) bond.',
          misconception: 'Students believe "drinking 8 glasses of water daily" is a universal rule and that "fibre is fibre — any source works.".',
          parts: [
                { id: 'a', prompt: 'A student writes: "Water provides energy because it is a nutrient." What fundamental error does this reveal about the student\'s understanding of nutrient.', answer: 'Correct answer: Water is a non-energy-yielding nutrient',
                  options: ['Correct answer: Water is a non-energy-yielding nutrient', 'essential nutrient', 'macronutrient that supplies calories', 'drinking 8 glasses of water daily'],
                  hint: 'Revisit c11_bio_cbse_09_001: compare starch (α-1,4/α-1,6) vs cellulose (β-1,4) bond orientation and.',
                  misconception: 'Students believe "drinking 8 glasses of water daily" is a universal rule and that "fibre is fibre — any source works." They memorise the.' },
                { id: 'b', prompt: 'A 60 kg sedentary woman in Mumbai (humid climate) consumes 1.8 L water from beverages and 0.6 L from food.', answer: 'Total intake = 1.8 + 0.6 = 2.4 L',
                  options: ['Total intake = 1.8 + 0.6 = 2.4 L', 'drinking 8 glasses of water daily', 'fibre is fibre — any source works'],
                  hint: 'Revisit c11_bio_cbse_09_001: compare starch (α-1,4/α-1,6) vs cellulose (β-1,4) bond orientation and.',
                  misconception: 'Students believe "drinking 8 glasses of water daily" is a universal rule and that "fibre is fibre — any source works." They memorise the.' }
          ],
            remediations: { 'drinking-8-glasses-of-water': { steps: ['If student cannot differentiate soluble vs insoluble fibre mechanisms: (1) Revisit c11_bio_cbse_09_001 (carbohydrates.', '(2) Watch a 5-min demo: psyllium in water (gels) vs wheat bran in water (floats).', '(3) Re-do Diagnostic Q2 and Q4 with focus on viscosity.', '(4) Create a two-column table: Property → Physiological Effect → Health Outcome for each fibre type.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_010', difficulty: 'standard',
          question: 'Food processing is the transformation of raw agricultural produce into safe.',
          hint: 'Revisit c12_hs_cbse_02_009 (Water and Dietary Fibre) section on water activity and.',
          misconception: 'Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate all processing with.',
          parts: [
                { id: 'a', prompt: 'List the three main objectives of food processing and give one example of a product for each objective where that objective is the PRIMARY driver.', answer: 'The three main objectives are: (1) Safety',
                  options: ['The three main objectives are: (1) Safety', 'nutrient retention', 'processed food = unhealthy', 'preservatives = harmful chemicals'],
                  hint: 'Revisit c12_hs_cbse_02_009 (Water and Dietary Fibre) section on water activity and c8_bio_ch1_9.',
                  misconception: 'Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate all processing with ultra-processed.' },
                { id: 'b', prompt: 'A food technologist wants to produce shelf-stable mango pulp (pH 3.8, water activity 0.98) without refrigeration.', answer: 'Option A: Hot-fill at 90°C kills vegetative microbes and creates vacuum seal',
                  options: ['Option A: Hot-fill at 90°C kills vegetative microbes and creates vacuum seal', 'hurdle technology', 'processed food = unhealthy', 'preservatives = harmful chemicals'],
                  hint: 'Revisit c12_hs_cbse_02_009 (Water and Dietary Fibre) section on water activity and c8_bio_ch1_9.',
                  misconception: 'Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate all processing with ultra-processed.' },
                { id: 'c', prompt: 'Compare and contrast primary, secondary, and tertiary food processing using wheat as the raw material.', answer: 'Primary: Wheat cleaning & milling → physical separation of bran/germ/endosperm →',
                  options: ['Primary: Wheat cleaning & milling → physical separation of bran/germ/endosperm →', 'processed food = unhealthy', 'preservatives = harmful chemicals', 'sodium benzoate or potassium sorbate are toxic at permitted levels'],
                  hint: 'Revisit c12_hs_cbse_02_009 (Water and Dietary Fibre) section on water activity and c8_bio_ch1_9.',
                  misconception: 'Students believe "processed food = unhealthy" and "preservatives = harmful chemicals." They equate all processing with ultra-processed.' }
          ],
            remediations: { 'processed-food-unhealthy-and-preservatives': { steps: ['Have the student list 5 foods they ate yesterday and classify each as unprocessed, primary, secondary, or tertiary.', 'For each, identify the preservation method used (heat, cold, drying, acid, salt, sugar, packaging, fermentation).', 'Ask them to calculate the benzoate exposure from a 250 mL drink with 150 ppm benzoate for a 50 kg person, compare.', 'Re-attempt Diagnostic Question 5 — if they still claim "preservatives are poison," assign reading of FSSAI regulation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_011', difficulty: 'standard',
          question: 'Food additives are substances intentionally added to food in small quantities.',
          hint: 'If stuck, revisit c12_hs_cbse_02_010\'s "Preservation" section — identify which spoilage.',
          misconception: 'Students believe "E-numbers/INS numbers indicate harmful chemicals" and that "natural additives are safer than.',
          parts: [
                { id: 'a', prompt: 'A student sees "INS 220" on a dried apricot pack and writes: "This is a preservative added to prevent microbial spoilage." Is this statement fully correct?', answer: 'INS 220 is sulfur dioxide (SO₂), which functions primarily as an antioxidant and',
                  options: ['INS 220 is sulfur dioxide (SO₂), which functions primarily as an antioxidant and', 'preservative', 'E-numbers/INS numbers indicate harmful chemicals', 'natural additives are safer than synthetic ones'],
                  hint: 'If stuck, revisit c12_hs_cbse_02_010\'s "Preservation" section — identify which spoilage mechanisms.',
                  misconception: 'Students believe "E-numbers/INS numbers indicate harmful chemicals" and that "natural additives are safer than synthetic ones." The exact.' },
                { id: 'b', prompt: 'Two students debate: "All emulsifiers are stabilizers, but not all stabilizers are emulsifiers." Evaluate this claim using FSSAI functional categories (INS 322.', answer: 'The claim is correct',
                  options: ['The claim is correct', 'forming an emulsion', 'maintaining physical stability', 'E-numbers/INS numbers indicate harmful chemicals'],
                  hint: 'If stuck, revisit c12_hs_cbse_02_010\'s "Preservation" section — identify which spoilage mechanisms.',
                  misconception: 'Students believe "E-numbers/INS numbers indicate harmful chemicals" and that "natural additives are safer than synthetic ones." The exact.' },
                { id: 'c', prompt: 'A manufacturer wants to use aspartame (INS 951) in a carbonated beverage at 600 mg/L.', answer: 'Step 1: Convert limit to mg/L: 700 mg/kg × 1.02 kg/L = 714 mg/L',
                  options: ['Step 1: Convert limit to mg/L: 700 mg/kg × 1.02 kg/L = 714 mg/L', 'E-numbers/INS numbers indicate harmful chemicals', 'natural additives are safer than synthetic ones', 'natural origin (e'],
                  hint: 'If stuck, revisit c12_hs_cbse_02_010\'s "Preservation" section — identify which spoilage mechanisms.',
                  misconception: 'Students believe "E-numbers/INS numbers indicate harmful chemicals" and that "natural additives are safer than synthetic ones." The exact.' }
          ],
            remediations: { 'e-numbers-ins-numbers-indicate': { steps: ['Revisit c12_hs_cbse_02_010 (Food Processing) to recall why additives are used in processing (preservation, texture.', 'Study the FSSAI "Food Additives" regulation appendix — pick 5 additives, find their INS, function, and max limit in one.', 'Practice unit conversion: convert 3 mg/kg limits to mg/L for beverages of density 1.03, 1.05, 1.10 g/mL.', 'Re-attempt Diagnostic Q3 and Q5 — if still wrong, watch FSSAI\'s "Food Additives Explained" video and re-read the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_012', difficulty: 'standard',
          question: 'Food fortification is the deliberate addition of essential micronutrients.',
          hint: 'Revisit the micronutrient tables in nodes c12_hs_cbse_02_006, 007, 008 and the milling.',
          misconception: 'Students often think "fortification" and "enrichment" are interchangeable terms, and they cite iodized salt as.',
          parts: [
                { id: 'a', prompt: 'A student says: "If we fortify rice with iron, we can solve anaemia in India because everyone eats rice." Identify the flaw in this reasoning and explain why.', answer: 'The flaw is assuming universal consumption of the fortified vehicle and ignoring',
                  options: ['The flaw is assuming universal consumption of the fortified vehicle and ignoring', 'it\'s a good idea', 'fortification', 'enrichment'],
                  hint: 'Revisit the micronutrient tables in nodes c12_hs_cbse_02_006, 007, 008 and the milling process.',
                  misconception: 'Students often think "fortification" and "enrichment" are interchangeable terms, and they cite iodized salt as an example of enrichment.' }
          ],
            remediations: { 'fortification-and-enrichment-are-interchangeable': { steps: ['If the student conflates fortification and enrichment, have them create a two-column table with definitions, nutrient.', 'Then ask them to classify: (1) iodine in salt, (2) B-vitamins added back to maida, (3) vitamin A in vanaspati, (4) iron.', 'For the "fortification solves everything" misconception, assign a case study: "Why did anaemia prevalence remain high.', 'Re-diagnostic: Ask them to list three reasons why fortification is necessary but not sufficient.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
