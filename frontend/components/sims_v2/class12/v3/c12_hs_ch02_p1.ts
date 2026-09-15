import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch02_p1: SimDef = {
    id: 'v3_c12_hs_ch02_p1',
    title: 'Nutrition, Food Science and Technology · Part 1/2',
    subtitle: 'The label says 20 grams — the body may see far less',
    classLevel: 12, subject: 'home_science', topic: 'Nutrition, Food Science and Technology · Part 1/2',
    chapters: ['c12_hs_ch02'],
    nodeIds: ['c12_hs_cbse_02_001', 'c12_hs_cbse_02_002', 'c12_hs_cbse_02_003', 'c12_hs_cbse_02_004', 'c12_hs_cbse_02_005', 'c12_hs_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Food-system analyst', intro: 'Between farm and fork, food is transformed — and every transformation has a nutritional price or payoff.', goal: 'Connect food science and nutrition — how processing, fortification and bioavailability shape what a diet delivers.' },
    discovery: {
        question: 'A snack label says 20g protein per 100g — yet the extrusion that made it may have burned away the protein\'s usefulness. What\'s the label not telling you?',
        options: ['Quantity isn\'t quality — processing denatures proteins and triggers lysine loss; bioavailability, not the number, is what the body gets', 'The protein is fake', 'Labels always lie', '20g is plenty anyway'],
        answer: 'Quantity isn\'t quality — processing denatures proteins and triggers lysine loss; bioavailability, not the number, is what the body gets',
        hook: 'Food science and nutrition are two lenses on one meal — one asks what food is and how processing transforms it, the other what it does in the body. Milling strips thiamine; fortification adds it back. A nutritionist who ignores processing is reading a photograph of a moving thing.',
    },
    teaching: [
        { title: 'Food Science: Definition and Interrelationship with Nutrition', text: 'Food Science is the interdisciplinary study of the physical, chemical, and biological nature of food, its composition, processing, preservation, safety, and quality.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow wheat from grain to fortified biscuit: trace where nutrients are lost, added and unlocked, and learn the questions a nutritionist must ask a process engineer.',
        labels: ['Food Science: Definition', 'Functions of Food: Physiological,', 'Carbohydrates: Classification, Functions', 'Proteins: Classification, Functions', 'Lipids: Classification, Essential Fatty', 'Fat-Soluble Vitamins (A, D,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_001', title: 'Food Science: Definition and Interrelationship with Nutrition',
          caseStudy: { intro: 'Imagine you pick up a packet of fortified milk. Why is vitamin D added? Why is it pasteurised? Why does it have a shelf life?',
            decisions: [{ prompt: 'Define Food Science in one sentence and name any two of its core sub-disciplines.', options: [
                { text: 'Food Science is the interdisciplinary study of the physical, chemical, and biological', outcome: 'Food Science is the interdisciplinary study of the physical, chemical, and biological nature.' },
                { text: 'Food Science is the study of nutrition', outcome: 'Not quite — Students often think Food Science and Nutrition are the same field with different names, or that.', reveals: 'food-science-and-nutrition-are' },
                { text: 'Food Science is cooking', outcome: 'Not quite — Students often think Food Science and Nutrition are the same field with different names, or that.', reveals: 'food-science-and-nutrition-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_002', title: 'Functions of Food: Physiological, Psychological and Socio-Cultural',
          caseStudy: { intro: 'Think about your last family festival meal — perhaps Diwali sweets, Eid biryani, or Christmas cake. Why did you eat it?',
            decisions: [{ prompt: 'A student writes: "The physiological function of food is to provide energy." Is this statement complete?', options: [
                { text: 'The statement is incomplete', outcome: 'The statement is incomplete. The three physiological functions are: (1) providing energy, (2).' },
                { text: 'energy', outcome: 'Not quite — Students treat the three functions as mutually exclusive categories: "This food is physiological.', reveals: 'students-treat-the-three-functions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_003', title: 'Carbohydrates: Classification, Functions and Dietary Sources',
          caseStudy: { intro: 'Imagine you are planning a day\'s meals for a 16-year-old athlete who needs 2800 kcal/day — where do you start with carbohydrates?',
            decisions: [{ prompt: 'A student writes: "Carbohydrates are classified as monosaccharides, disaccharides, and polysaccharides based on the number of sugar units.".', options: [
                { text: 'No, this chemical classification is incomplete nutritionally', outcome: 'No, this chemical classification is incomplete nutritionally because it does not distinguish.' },
                { text: 'complex carbohydrates = good, simple carbohydrates = bad', outcome: 'Not quite — Students believe "complex carbohydrates = good, simple carbohydrates = bad" and classify *all*.', reveals: 'complex-carbohydrates-good' },
                { text: 'complex/healthy', outcome: 'Not quite — Students believe "complex carbohydrates = good, simple carbohydrates = bad" and classify *all*.', reveals: 'complex-carbohydrates-good' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_02_004', title: 'Proteins: Classification, Functions and Quality Assessment (BV, NPU)',
          scaffold: { problem: 'A 12-year-old child consumes 40g protein in a day. Faecal nitrogen loss is 1.2g and urinary nitrogen loss is 3.0g.',
            steps: [
            { text: 'Convert protein intake to nitrogen: N_intake = 40g × 0.16 = 6.4g N.' },
            { text: 'Calculate absorbed nitrogen: N_absorbed = N_intake - faecal N = 6.4 - 1.2 = 5.2g N.' },
            { text: 'Calculate retained nitrogen: N_retained = N_absorbed - (urinary N - endogenous urinary N) = 5.2 - (3.0 - 0.5) = 5.2.' },
            { text: 'Compute BV = (2.7 / 5.2) × 100 = 51.9%.' },
            { text: 'Compute NPU = (2.7 / 6.4) × 100 = 42.2%.' },
            { text: 'Interpret: BV > NPU (51.9% > 42.2%), consistent with theory. Low values suggest poor quality protein or high endogenous.', faded: true, blankAnswer: 'BV = 51.9%, NPU = 42.2%' }
            ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_005', title: 'Lipids: Classification, Essential Fatty Acids and Health Implications',
          caseStudy: { intro: 'Start by asking: "Why does ghee solidify in winter but mustard oil stays liquid — and why does your nutritionist insist on both omega-3 and omega-6?" This.',
            decisions: [{ prompt: 'Define essential fatty acids and name the two parent essential fatty acids with their omega designations.', options: [
                { text: 'Essential fatty acids (EFAs) are polyunsaturated fatty acids that humans cannot', outcome: 'Essential fatty acids (EFAs) are polyunsaturated fatty acids that humans cannot synthesize de novo.' },
                { text: 'essential', outcome: 'Not quite — Students believe "all saturated fats raise LDL equally" and "all polyunsaturated fats are.', reveals: 'all-saturated-fats-raise-ldl' },
                { text: 'important', outcome: 'Not quite — Students believe "all saturated fats raise LDL equally" and "all polyunsaturated fats are.', reveals: 'all-saturated-fats-raise-ldl' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_006', title: 'Fat-Soluble Vitamins (A, D, E, K): Functions, Sources and Deficiency',
          caseStudy: { intro: 'Begin with a relatable question: "Why does your grandmother insist on adding a teaspoon of ghee to your carrot halwa?" This hooks the student to the core.',
            decisions: [{ prompt: 'Name the four fat-soluble vitamins and state the one common structural feature that makes them fat-soluble.', options: [
                { text: 'The four fat-soluble vitamins are A, D, E, and K', outcome: 'The four fat-soluble vitamins are A, D, E, and K. Their common structural feature is the presence.' },
                { text: 'vitamins are natural, so higher doses are harmless', outcome: 'Not quite — Students often believe that "vitamins are natural, so higher doses are harmless" — specifically.', reveals: 'vitamins-are-natural' },
                { text: 'vitamin C or B-complex', outcome: 'Not quite — Students often believe that "vitamins are natural, so higher doses are harmless" — specifically.', reveals: 'vitamins-are-natural' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'Nutrition, Food Science and Technology · Part 1/2', spots: [
            { id: 's1', label: 'Food Science Definition and Interrelationship with Nutrition', prompt: 'Which idea is this? — Food Science is the interdisciplinary study of the physical, chemical, and biological.', answer: 'Food Science Definition and Interrelationship with Nutrition', options: ['Food Science Definition and Interrelationship with Nutrition', 'Carbohydrates Classification Functions and Dietary Sources'] },
            { id: 's2', label: 'Carbohydrates Classification Functions and Dietary Sources', prompt: 'Which idea is this? — Carbohydrates are organic compounds composed of carbon, hydrogen, and oxygen (typically.', answer: 'Carbohydrates Classification Functions and Dietary Sources', options: ['Carbohydrates Classification Functions and Dietary Sources', 'Food Science Definition and Interrelationship with Nutrition'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A fitness-app founder pitches at your school: \'Food is fuel — macros, calories, nothing more. We strip the sentiment out of eating.\'',
            decisions: [{ prompt: 'Which of the three functions of food does the pitch erase?', options: [
                { text: 'Two of them — the pitch covers only the physiological function; food also works psychologically (comfort, pleasure, security) and socio-culturally (festival dishes, langar, hospitality) — a festival sweet is the same flour and sugar as any dessert, but the occasion is what it feeds.', outcome: 'The chapter\'s point: context decides the dominant function — identical nutrients serve energy in one meal and identity in another; \'just fuel\' reads composition and misses the reason for eating.' },
                { text: 'Endorse it — nutrition science is objective; attaching emotion to food causes bad eating.', outcome: 'The chapter treats the psychological and social functions as real functions, not noise — comfort eating and festival food meet needs the calorie count can\'t see; stripping them doesn\'t make eating \'pure\', it makes it incomplete.', reveals: 'food-is-only-fuel' },
                { text: 'Concede partially — keep a \'cheat meal\' slot for the emotional side.', outcome: 'That quarantines what the chapter integrates: one meal can serve all three functions at once — comfort, bonding and nourishment aren\'t separate courses to be scheduled.', reveals: 'emotion-is-a-cheat-slot' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read food as a process, not a label — and pair the food scientist\'s \'what it is\' with the nutritionist\'s \'what it does.\'',
            decisions: [{ prompt: 'What comes next? Nutrition, Food Science and Technology · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Nutrition, Food Science and Technology · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_001', difficulty: 'standard',
          question: 'Food Science is the interdisciplinary study of the physical, chemical, and.',
          hint: 'If stuck, revisit c11_hs_cbse_03_003 (nutrient classification) and c11_hs_cbse_03_005.',
          misconception: 'Students often think Food Science and Nutrition are the same field with different names, or that Food Science is just.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how Food Science and Nutrition are interrelated.', answer: 'Food Science studies what food is and how it can be transformed',
                  options: ['Food Science studies what food is and how it can be transformed', 'they are related', 'cooking science', 'health science'],
                  hint: 'If stuck, revisit c11_hs_cbse_03_003 (nutrient classification) and c11_hs_cbse_03_005.',
                  misconception: 'Students often think Food Science and Nutrition are the same field with different names, or that Food Science is just "cooking science".' }
          ],
            remediations: { 'food-science-and-nutrition-are': { steps: ['Revisit c11_hs_cbse_03_001 (Definition and Role of Food) and c11_hs_cbse_03_002 (Definition and Scope of Nutrition.', 'For each of the 5 sub-disciplines of Food Science (chemistry, microbiology, processing, engineering, sensory), write.', 'Re-attempt Diagnostic Question 2 and 4. If you still conflate the two, explicitly label every statement in your notes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Food Science and Nutrition are the same field with different names, or that Food Science is just.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since nutrition is about nutrients, a nutritionist does not need to know food processing methods; they only need the nutrient.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'cooking science', 'health science', 'What is this food made of and how can we process it safely?'],
                  hint: 'If stuck, revisit c11_hs_cbse_03_003 (nutrient classification) and c11_hs_cbse_03_005.',
                  misconception: 'Students often think Food Science and Nutrition are the same field with different names, or that Food Science is just "cooking science".' },
                { id: 'b', prompt: 'Design a one-page infographic concept (describe the layout, headings, and three key visual elements) that explains to a Class 10 student how Food Science and.', answer: 'Layout: Title "From Grain to Gain: The Food Science–Nutrition Partnership"',
                  options: ['Layout: Title "From Grain to Gain: The Food Science–Nutrition Partnership"', 'cooking science', 'health science', 'What is this food made of and how can we process it safely?'],
                  hint: 'If stuck, revisit c11_hs_cbse_03_003 (nutrient classification) and c11_hs_cbse_03_005.',
                  misconception: 'Students often think Food Science and Nutrition are the same field with different names, or that Food Science is just "cooking science".' }
          ],
            remediations: { 'food-science-and-nutrition-are': { steps: ['Revisit c11_hs_cbse_03_001 (Definition and Role of Food) and c11_hs_cbse_03_002 (Definition and Scope of Nutrition.', 'For each of the 5 sub-disciplines of Food Science (chemistry, microbiology, processing, engineering, sensory), write.', 'Re-attempt Diagnostic Question 2 and 4. If you still conflate the two, explicitly label every statement in your notes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_002', difficulty: 'standard',
          question: 'Food functions refer to the three fundamental roles food plays in human life.',
          hint: 'Revisit Class 11 node c11_hs_cbse_03_005 (Relationship Between Food, Nutrition, Health.',
          misconception: 'Students treat the three functions as mutually exclusive categories: "This food is physiological, that food.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The physiological function of food is to provide energy." Is this statement complete?', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'energy'],
                  hint: 'Revisit Class 11 node c11_hs_cbse_03_005 (Relationship Between Food, Nutrition, Health and Fitness).',
                  misconception: 'Students treat the three functions as mutually exclusive categories: "This food is physiological, that food is psychological." In reality.' },
                { id: 'b', prompt: 'Explain why "eating ice cream after a breakup" is primarily a psychological function of food, not a physiological one.', answer: 'Eating ice cream after a breakup serves the psychological function',
                  options: ['Eating ice cream after a breakup serves the psychological function', 'sugar gives energy'],
                  hint: 'Revisit Class 11 node c11_hs_cbse_03_005 (Relationship Between Food, Nutrition, Health and Fitness).',
                  misconception: 'Students treat the three functions as mutually exclusive categories: "This food is physiological, that food is psychological." In reality.' },
                { id: 'c', prompt: 'A family serves *dal-chawal* (lentils and rice) daily but prepares *puran poli* (sweet stuffed flatbread) only during Ganesh Chaturthi.', answer: '*Dal-chawal* daily: primarily physiological (energy, protein) with secondary',
                  options: ['*Dal-chawal* daily: primarily physiological (energy, protein) with secondary', 'both are physiological'],
                  hint: 'Revisit Class 11 node c11_hs_cbse_03_005 (Relationship Between Food, Nutrition, Health and Fitness).',
                  misconception: 'Students treat the three functions as mutually exclusive categories: "This food is physiological, that food is psychological." In reality.' }
          ],
            remediations: { 'students-treat-the-three-functions': { steps: ['If a student cannot integrate the three functions, use the "One Meal, Three Lenses" exercise: Pick their last meal.', 'Lens 1 (Physiological): List nutrients and what they do in the body.', 'Lens 2 (Psychological): What did they *feel* before/during/after?', 'Lens 3 (Socio-Cultural): Who cooked?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_003', difficulty: 'standard',
          question: 'Carbohydrates are organic compounds composed of carbon, hydrogen, and oxygen.',
          hint: 'If unable to distinguish digestible vs indigestible linkages, revisit c11_bio_cbse_09_001.',
          misconception: 'Students believe "complex carbohydrates = good, simple carbohydrates = bad" and classify *all* polysaccharides.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Carbohydrates are classified as monosaccharides, disaccharides, and polysaccharides based on the number of sugar units." Is this.', answer: 'No, this chemical classification is incomplete nutritionally',
                  options: ['No, this chemical classification is incomplete nutritionally', 'complex carbohydrates = good, simple carbohydrates = bad', 'complex/healthy', 'simple/unhealthy'],
                  hint: 'If unable to distinguish digestible vs indigestible linkages, revisit c11_bio_cbse_09_001 section.',
                  misconception: 'Students believe "complex carbohydrates = good, simple carbohydrates = bad" and classify *all* polysaccharides (including starch).' },
                { id: 'b', prompt: 'A 30-year-old sedentary woman (RDA: 1900 kcal) consumes the following in one day: 200g rice (raw weight), 60g wheat flour, 100g potato, 150g banana, 20g sugar.', answer: 'Step 1: Calculate CHO from each source: Rice = 200g × 0.70 = 140g',
                  options: ['Step 1: Calculate CHO from each source: Rice = 200g × 0.70 = 140g', 'complex carbohydrates = good, simple carbohydrates = bad', 'complex/healthy', 'simple/unhealthy'],
                  hint: 'If unable to distinguish digestible vs indigestible linkages, revisit c11_bio_cbse_09_001 section.',
                  misconception: 'Students believe "complex carbohydrates = good, simple carbohydrates = bad" and classify *all* polysaccharides (including starch).' }
          ],
            remediations: { 'complex-carbohydrates-good': { steps: ['Revisit c11_bio_cbse_09_001 (Carbohydrates: Monosaccharides and Polysaccharides) to re-learn chemical structures — but.', 'Create a 3-column table: Food | Chemical Class (mono/di/poly) | Nutritional Class (available/unavailable.', 'Identify where chemical and nutritional classifications *diverge* (e.g., maltodextrin = poly but high GI; fructose.', 'Re-attempt Diagnostic Question 2 and 5. If still stuck, the gap is not memory but *conceptual transfer* — seek teacher.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_004', difficulty: 'standard',
          question: 'Proteins are macromolecules composed of amino acids linked by peptide bonds.',
          hint: 'If stuck on nitrogen conversion, revisit c11_bio_cbse_09_002 (amino acid structure) and.',
          misconception: 'Students often think "Biological Value measures how much protein is absorbed" – confusing absorption with retention.',
          parts: [
                { id: 'a', prompt: 'Define Biological Value (BV) and Net Protein Utilization (NPU) and state the relationship between them.', answer: 'BV = (Nitrogen retained / Nitrogen absorbed) × 100',
                  options: ['BV = (Nitrogen retained / Nitrogen absorbed) × 100', 'Biological Value measures how much protein is absorbed'],
                  hint: 'If stuck on nitrogen conversion, revisit c11_bio_cbse_09_002 (amino acid structure) and recall that.',
                  misconception: 'Students often think "Biological Value measures how much protein is absorbed" – confusing absorption with retention.' },
                { id: 'b', prompt: 'A student says: "Plant proteins are always incomplete and animal proteins are always complete." Explain why this statement is incorrect using two specific.', answer: 'Soy protein (plant) is complete (contains all essential amino acids in adequate',
                  options: ['Soy protein (plant) is complete (contains all essential amino acids in adequate', 'Biological Value measures how much protein is absorbed', 'repeats the statement shows lack of nuance in nutritional quality assessment'],
                  hint: 'If stuck on nitrogen conversion, revisit c11_bio_cbse_09_002 (amino acid structure) and recall that.',
                  misconception: 'Students often think "Biological Value measures how much protein is absorbed" – confusing absorption with retention.' },
                { id: 'c', prompt: 'Calculate BV and NPU for a subject who consumed 20g protein (16% nitrogen), absorbed 15g protein equivalent, and retained 12g protein equivalent.', answer: 'Step 1: Convert protein to nitrogen: Intake N = 20g × 0.16 = 3.2g N',
                  options: ['Step 1: Convert protein to nitrogen: Intake N = 20g × 0.16 = 3.2g N', 'Biological Value measures how much protein is absorbed'],
                  hint: 'If stuck on nitrogen conversion, revisit c11_bio_cbse_09_002 (amino acid structure) and recall that.',
                  misconception: 'Students often think "Biological Value measures how much protein is absorbed" – confusing absorption with retention.' },
                { id: 'd', prompt: 'Compare the protein quality of a diet providing 60% protein from cereals and 40% from pulses versus a diet providing 100% protein from milk, using the concept.', answer: 'Cereals are lysine-deficient but methionine-rich',
                  options: ['Cereals are lysine-deficient but methionine-rich', 'Biological Value measures how much protein is absorbed'],
                  hint: 'If stuck on nitrogen conversion, revisit c11_bio_cbse_09_002 (amino acid structure) and recall that.',
                  misconception: 'Students often think "Biological Value measures how much protein is absorbed" – confusing absorption with retention.' }
          ],
            remediations: { 'biological-value-measures-how-much': { steps: ['Revisit nitrogen balance concept using c11_bio_cbse_09_002 (amino acids) to recall that nitrogen is the marker for.', 'Draw a flowchart: Dietary Protein → Digestion → Absorbed Amino Acids → (Protein Synthesis + Oxidation) → Nitrogen.', 'Practice 5 calculation problems where only two of three values (intake, absorbed, retained) are given; solve for the.', 'Take a mini-diagnostic: "If BV=80% and NPU=60%, what is digestibility?" (Answer: NPU/BV = 75%). If wrong, repeat step 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_005', difficulty: 'standard',
          question: 'Lipids are a heterogeneous group of organic compounds insoluble in water but.',
          hint: 'If stuck on fatty acid notation or desaturation logic, revisit c11_bio_cbse_09_003.',
          misconception: 'Students believe "all saturated fats raise LDL equally" and "all polyunsaturated fats are heart-healthy." They write.',
          parts: [
                { id: 'a', prompt: 'Define essential fatty acids and name the two parent essential fatty acids with their omega designations.', answer: 'Essential fatty acids (EFAs) are polyunsaturated fatty acids that humans cannot',
                  options: ['Essential fatty acids (EFAs) are polyunsaturated fatty acids that humans cannot', 'essential', 'important', 'all saturated fats raise LDL equally'],
                  hint: 'If stuck on fatty acid notation or desaturation logic, revisit c11_bio_cbse_09_003 section.',
                  misconception: 'Students believe "all saturated fats raise LDL equally" and "all polyunsaturated fats are heart-healthy." They write in exams: "Saturated.' },
                { id: 'b', prompt: 'Compare the metabolic fates of linoleic acid (omega-6) and alpha-linolenic acid (omega-3) in humans, and explain why their ratio influences inflammatory status.', answer: 'Both undergo Δ-6 desaturation (rate-limiting) → elongation → Δ-5 desaturation',
                  options: ['Both undergo Δ-6 desaturation (rate-limiting) → elongation → Δ-5 desaturation', 'omega-6 is bad, omega-3 is good', 'all saturated fats raise LDL equally', 'all polyunsaturated fats are heart-healthy'],
                  hint: 'If stuck on fatty acid notation or desaturation logic, revisit c11_bio_cbse_09_003 section.',
                  misconception: 'Students believe "all saturated fats raise LDL equally" and "all polyunsaturated fats are heart-healthy." They write in exams: "Saturated.' }
          ],
            remediations: { 'all-saturated-fats-raise-ldl': { steps: ['If student cannot differentiate fatty acid-specific metabolic effects: Step 1 — Revisit Class 11 node.', 'Step 2 — Revisit c11_biotech_cbse_03_004 (Lipids: Fatty Acids, Triglycerides and Phospholipids) for structural.', 'Step 3 — Do a focused re-diagnostic: "Compare the effect of 10 g lauric acid vs 10 g palmitic acid on LDL/HDL ratio.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_02_006', difficulty: 'standard',
          question: 'Fat-soluble vitamins (A, D, E, K) are organic micronutrients that dissolve.',
          hint: 'If stuck, revisit the mechanism of bile salt action and mixed micelle formation in Class.',
          misconception: 'Students often believe that "vitamins are natural, so higher doses are harmless" — specifically, they assume.',
          parts: [
                { id: 'a', prompt: 'Name the four fat-soluble vitamins and state the one common structural feature that makes them fat-soluble.', answer: 'The four fat-soluble vitamins are A, D, E, and K',
                  options: ['The four fat-soluble vitamins are A, D, E, and K', 'vitamins are natural, so higher doses are harmless', 'vitamin C or B-complex', 'fat-soluble vitamins behave like water-soluble ones (excess excreted in urine)'],
                  hint: 'If stuck, revisit the mechanism of bile salt action and mixed micelle formation in Class 10 Biology.',
                  misconception: 'Students often believe that "vitamins are natural, so higher doses are harmless" — specifically, they assume fat-soluble vitamins behave.' },
                { id: 'b', prompt: 'A 6-year-old child presents with night blindness, Bitot\'s spots, and frequent respiratory infections.', answer: 'Identify the most likely vitamin deficiency',
                  options: ['Identify the most likely vitamin deficiency', 'poor diet', 'vitamins are natural, so higher doses are harmless', 'fat-soluble vitamins behave like water-soluble ones (excess excreted in urine)'],
                  hint: 'If stuck, revisit the mechanism of bile salt action and mixed micelle formation in Class 10 Biology.',
                  misconception: 'Students often believe that "vitamins are natural, so higher doses are harmless" — specifically, they assume fat-soluble vitamins behave.' }
          ],
            remediations: { 'vitamins-are-natural': { steps: ['If the student cannot explain the micelle-dependent absorption mechanism (Diagnostic Q2), follow these steps: (1).', '(2) Draw a labelled diagram of a mixed micelle showing bile salts, fatty acids, monoglycerides, cholesterol, and.', '(3) Explain aloud: "No bile → no micelles → vitamins stay in lumen → excreted." (4) Re-attempt Diagnostic Q2 and Q3.', 'If still stuck, watch a 5-minute animation of lipid absorption (e.g., from NCERT e-content) and repeat step 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
