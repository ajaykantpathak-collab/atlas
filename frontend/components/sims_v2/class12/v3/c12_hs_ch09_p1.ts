import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch09_p1: SimDef = {
    id: 'v3_c12_hs_ch09_p1',
    title: 'Nutrition for Self and Family · Part 1/2',
    subtitle: 'The number was right — the food matrix was missing',
    classLevel: 12, subject: 'home_science', topic: 'Nutrition for Self and Family · Part 1/2',
    chapters: ['c12_hs_ch09'],
    nodeIds: ['c12_hs_cbse_09_001', 'c12_hs_cbse_09_002', 'c12_hs_cbse_09_003', 'c12_hs_cbse_09_004', 'c12_hs_cbse_09_005', 'c12_hs_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Dietary planner', intro: 'One family, four plates, four different RDAs — a pregnant mother, an infant, a labourer, an elder.', goal: 'Use RDA correctly — requirements shift with age, sex, activity and physiology; food beats the isolated pill.' },
    discovery: {
        question: 'An 80 mg vitamin C tablet hits the RDA exactly — so why does the nutritionist still hand you a guava instead?',
        options: ['The RDA assumes a food matrix — whole food brings fibre, phytochemicals and cofactors that shape absorption; an isolated number isn\'t the whole nutrient story', 'Tablets are expensive', 'Guava tastes better', 'Supplements don\'t work'],
        answer: 'The RDA assumes a food matrix — whole food brings fibre, phytochemicals and cofactors that shape absorption; an isolated number isn\'t the whole nutrient story',
        hook: 'RDA isn\'t a minimum or a dose — it\'s the intake covering ~97.5% of healthy people in a group. And \'all adults need the same\' collapses fast: sex, activity, pregnancy and age move requirements by hundreds of kilocalories and milligrams of iron.',
    },
    teaching: [
        { title: 'Nutrition Through the Lifespan: Concept of Nutritional Requirements', text: 'Nutritional requirements refer to the specific amounts of essential nutrients (energy, protein, fats, carbohydrates, vitamins, minerals, and water) that an individual must consume daily to maintain.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_09_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Read the RDA like a clinician: compute protein from body weight, explain why pregnancy triples iron needs, and plan a day\'s vegetarian menu that actually meets the numbers.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_09_001', title: 'Nutrition Through the Lifespan: Concept of Nutritional Requirements',
          caseStudy: { intro: 'Imagine you are planning a day\'s meals for a family of four: a 6-month-old infant, a 10-year-old school-going child, a 35-year-old pregnant mother (second.',
            decisions: [{ prompt: 'Define "Recommended Dietary Allowance (RDA)" as per ICMR-NIN terminology. How does it differ from "Estimated Average Requirement (EAR)"?', options: [
                { text: 'RDA is the average daily dietary intake level sufficient to meet the nutrient', outcome: 'RDA is the average daily dietary intake level sufficient to meet the nutrient requirements.' },
                { text: 'minimum requirements', outcome: 'Not quite — Students often believe that RDA values are "minimum requirements" below which deficiency occurs.', reveals: 'rda-values-are-minimum-requirements' },
                { text: 'RDA values are "minimum requirements" below', outcome: 'Not quite — Students often believe that RDA values are "minimum requirements" below which deficiency occurs.', reveals: 'rda-values-are-minimum-requirements' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_09_003', title: 'Nutritional Requirements During Lactation: Energy, Protein and Micronutrient Needs',
          scaffold: { problem: 'Meena, a 28‑year‑old sedentary woman (weight 55 kg), is exclusively breastfeeding her 3‑month‑old infant.',
            steps: [
            { text: 'Identify the base RDA for a sedentary woman (18–30 yr): Energy = 1900 kcal/day, Protein = 46 g/day.' },
            { text: 'Identify the lactation increments for 0–6 months: Energy increment = +600 kcal/day, Protein increment = +19 g/day.' },
            { text: 'Add the increments to the base values: Total Energy = 1900 + 600 = 2500 kcal/day; Total Protein = 46 + 19 = 65 g/day.' },
            { text: 'Verify that the increments correspond to the correct lactation stage (exclusive breastfeeding, 0–6 months).' },
            { text: 'Interpret the result: Meena needs to consume approximately 2500 kcal and 65 g protein daily to support milk production.', faded: true, blankAnswer: 'Total Energy Requirement = 2500 kcal/day; Total Protein.' }
            ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_09_004', title: 'Infant Nutrition (0-1 Year): Breastfeeding and Complementary Feeding Guidelines',
          caseStudy: { intro: 'Imagine you are a community nutrition intern visiting an Anganwadi centre in rural Maharashtra. A mother asks: "My baby is 5 months old.',
            decisions: [{ prompt: 'A mother states: "My 4-month-old baby seems hungry after feeds.', options: [
                { text: 'Correct answer: WHO/UNICEF recommend exclusive breastfeeding for the first 6 months (180', outcome: 'Correct answer: WHO/UNICEF recommend exclusive breastfeeding for the first 6 months (180 days).' },
                { text: 'Cerelac is fine if baby is hungry', outcome: 'Not quite — Students believe "complementary feeding starts at 6 months exactly" and treat it as a rigid.', reveals: 'complementary-feeding-starts-at-6' },
                { text: 'perceived hunger', outcome: 'Not quite — Students believe "complementary feeding starts at 6 months exactly" and treat it as a rigid.', reveals: 'complementary-feeding-starts-at-6' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_09_005', title: 'Nutritional Requirements of Preschool Children (1-6 Years)',
          caseStudy: { intro: 'Imagine you are a dietetic intern at an Anganwadi centre in rural Maharashtra.',
            decisions: [{ prompt: 'State the ICMR 2020 Recommended Dietary Allowance (RDA) for energy and protein for a 4-year-old girl weighing 16 kg. Include units.', options: [
                { text: 'Energy: 1350 kcal/day', outcome: 'Energy: 1350 kcal/day; Protein: 20.1 g/day (ICMR 2020 RDA for children 4-6 years).' },
                { text: 'preschoolers need less food than adults', outcome: 'Not quite — Students believe "preschoolers need less food than adults because they are smaller" and therefore.', reveals: 'preschoolers-need-less-food-than' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Nutrition for Self and Family · Part 1/2', spots: [
            { id: 's1', label: 'Nutritional Requirements of Preschool Children 1-6 Years', prompt: 'Which idea is this? — Preschool children (1-6 years) require nutrient-dense diets to support rapid physical.', answer: 'Nutritional Requirements of Preschool Children 1-6 Years', options: ['Nutritional Requirements of Preschool Children 1-6 Years', 'Nutritional Requirements of School-Age Children 7-12 Years'] },
            { id: 's2', label: 'Nutritional Requirements of School-Age Children 7-12 Years', prompt: 'Which idea is this? — Nutritional requirements of school-age children (7-12 years) refer to the specific.', answer: 'Nutritional Requirements of School-Age Children 7-12 Years', options: ['Nutritional Requirements of School-Age Children 7-12 Years', 'Nutritional Requirements of Preschool Children 1-6 Years'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A newly pregnant colleague\'s grandmother insists she \'eat for two\' — double rotis, double milk — while her doctor has prescribed folic acid and a modest calorie increase. The family calls the doctor \'stingy.\'',
            decisions: [{ prompt: 'What does the pregnancy RDA actually say?', options: [
                { text: 'The doctor is calibrated — ICMR adds roughly 350–450 kcal and about 10–23 g of protein, not double portions; the big demands are micronutrients like iron and folic acid, with folate\'s largest increment in the first trimester for the neural tube, not a second stomach\'s worth of food.', outcome: 'The chapter\'s point: \'eating for two\' describes quality and specific nutrients, not quantity doubled — blood volume, fetal skeleton and neural tube each bill specific nutrients, not bulk calories.' },
                { text: 'Side with the grandmother — a growing baby needs double the intake, simple arithmetic.', outcome: 'The arithmetic is wrong: the fetus is a fraction of the mother\'s mass, and the RDA\'s increments are modest and timed — doubling calories buys surplus weight, not the iron and folate the physiology actually demands.', reveals: 'eat-for-two-literally' },
                { text: 'Split it — keep normal calories but double the folic acid through all nine months.', outcome: 'Folate isn\'t flat either: its biggest increment covers the first-trimester neural tube window and tapers later; doubling it throughout misses that the demand is critical-period, not constant.', reveals: 'supplement-equals-uniform' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now treat requirements as living physiology — and why a nutrient on a label is not yet a nutrient in a body.',
            decisions: [{ prompt: 'What comes next? Nutrition for Self and Family · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Nutrition for Self and Family · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_001', difficulty: 'standard',
          question: 'Nutritional requirements refer to the specific amounts of essential nutrients.',
          hint: 'Revisit c11_hs_cbse_03_007 (RDA methodology) and c11_hs_cbse_03_003 (nutrient.',
          misconception: 'Students often believe that RDA values are "minimum requirements" below which deficiency occurs immediately.',
          parts: [
                { id: 'a', prompt: 'Define "Recommended Dietary Allowance (RDA)" as per ICMR-NIN terminology. How does it differ from "Estimated Average Requirement (EAR)"?', answer: 'RDA is the average daily dietary intake level sufficient to meet the nutrient',
                  options: ['RDA is the average daily dietary intake level sufficient to meet the nutrient', 'minimum requirements', 'RDA values are "minimum requirements" below'],
                  hint: 'Revisit c11_hs_cbse_03_007 (RDA methodology) and c11_hs_cbse_03_003 (nutrient classification).',
                  misconception: 'Students often believe that RDA values are "minimum requirements" below which deficiency occurs immediately.' },
                { id: 'b', prompt: 'Compare the iron RDA for three women: (a) 20-year-old non-pregnant, non-lactating; (b) 30-year-old pregnant (second trimester); (c) 50-year-old.', answer: '20-year-old non-pregnant, non-lactating',
                  options: ['20-year-old non-pregnant, non-lactating', 'minimum requirements', 'gives the same value for all three ignores life-stage physiology', 'RDA values are "minimum requirements" below'],
                  hint: 'Revisit c11_hs_cbse_03_007 (RDA methodology) and c11_hs_cbse_03_003 (nutrient classification).',
                  misconception: 'Students often believe that RDA values are "minimum requirements" below which deficiency occurs immediately.' }
          ],
            remediations: { 'rda-values-are-minimum-requirements': { steps: ['Revisit c11_hs_cbse_03_007 (RDA: Meaning and Application) and c11_hs_cbse_03_006 (Balanced Diet) to rebuild the.', 'Create a comparison table with three columns: EAR, RDA, UL — fill in definitions, purpose, and an example nutrient.', 'Practice interpreting a dietary recall: given a 24-hour recall for a 30-year-old male, calculate % RDA met for energy.', 'Re-attempt Diagnostic Questions 3 and 4 with the corrected framework.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_002', difficulty: 'standard',
          question: 'Nutritional requirements during pregnancy refer to the increased need for.',
          hint: 'If unsure about BMR/PAL/RDA, revisit c12_hs_cbse_09_001 (Nutrition Through the Lifespan).',
          misconception: 'Students often believe “RDA for pregnancy is just the non‑pregnant RDA plus a fixed extra amount for all nutrients.”.',
          parts: [
                { id: 'a', prompt: 'Compare the folic acid RDA increment (µg/day) between first and third trimesters.', answer: 'ICMR 2020: Non‑pregnant = 200 µg',
                  options: ['ICMR 2020: Non‑pregnant = 200 µg', 'more growth = more folate always'],
                  hint: 'If unsure about BMR/PAL/RDA, revisit c12_hs_cbse_09_001 (Nutrition Through the Lifespan) where.',
                  misconception: 'Students often believe “RDA for pregnancy is just the non‑pregnant RDA plus a fixed extra amount for all nutrients.” In reality, increments.' }
          ],
            remediations: { 'rda-for-pregnancy-is-just': { steps: ['If a student cannot link physiological changes to specific nutrient increments, do: (1) Revisit c11_bio_cbse_16_003.', '(2) Re‑read ICMR 2020 RDA table for pregnancy (NCERT Class 12 Home Science Chapter 9, Table 9.2) and create.', '(3) Practice one numerical: calculate 3rd‑trimester energy for a 60 kg moderate‑activity woman (PAL = 1.8).', '(4) Re‑attempt Diagnostic Question 2 and 4.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_003', difficulty: 'standard',
          question: 'Nutritional requirements during lactation refer to the increased dietary.',
          hint: 'If unable to recall base RDA values, review **c11_hs_cbse_03_007** (RDA meaning and.',
          misconception: '**Misconception:** "The extra food needed during breastfeeding is the same as during pregnancy, or just \'eat for two\'.".',
          parts: [
                { id: 'a', prompt: 'An UNDERSTAND level question: Explain why the protein increment during 0–6 months lactation (+19 g/day) is higher than during pregnancy (+9.5 g/day in the.', answer: 'During lactation, the mother secretes about 1.1 g protein per 100 mL of milk',
                  options: ['During lactation, the mother secretes about 1.1 g protein per 100 mL of milk', 'because the baby is bigger'],
                  hint: 'If unable to recall base RDA values, review **c11_hs_cbse_03_007** (RDA meaning and application).',
                  misconception: '**Misconception:** "The extra food needed during breastfeeding is the same as during pregnancy, or just \'eat for two\'." **Why it’s wrong:**.' },
                { id: 'b', prompt: 'An APPLY level question: A 25‑year‑old sedentary woman (RDA energy = 1900 kcal/day, protein = 46 g/day) begins exclusive breastfeeding.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'adds the pregnancy increment (+350 kcal, +9'],
                  hint: 'If unable to recall base RDA values, review **c11_hs_cbse_03_007** (RDA meaning and application).',
                  misconception: '**Misconception:** "The extra food needed during breastfeeding is the same as during pregnancy, or just \'eat for two\'." **Why it’s wrong:**.' }
          ],
            remediations: { 'misconception-the-extra-food-needed': { steps: ['Revisit **c12_hs_cbse_09_002** (Pregnancy requirements) and make a side‑by‑side table of increments for energy.', 'Practice calculating total RDA for a sample woman (age, activity level) for both states using the ICMR 2020 tables.', 'Re‑attempt **Diagnostic Question 3** and **Diagnostic Question 5** with the corrected increments.', 'If confusion persists, watch the ICMR‑NIN video "RDA for Lactation" (available on NIN YouTube channel) and note the.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_004', difficulty: 'standard',
          question: 'Infant nutrition (0-1 year) encompasses the scientific principles and.',
          hint: 'Revisit c11_hs_cbse_08_002 (Growth and Developmental Milestones in Infancy) — focus.',
          misconception: 'Students believe "complementary feeding starts at 6 months exactly" and treat it as a rigid calendar date.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Infant nutrition (0-1 year) encompasses the scientific principles and evidence-based',
                  options: ['Infant nutrition (0-1 year) encompasses the scientific principles and evidence-based', 'Nutritional requirements refer to the specific amounts of essential nutrients (energy,', 'Nutritional requirements during pregnancy refer to the increased need for energy,', 'Nutritional requirements during lactation refer to the increased dietary allowances for'],
                  hint: 'Revisit c11_hs_cbse_08_002 (Growth and Developmental Milestones in Infancy) — focus on the 4-6.',
                  misconception: 'Students believe "complementary feeding starts at 6 months exactly" and treat it as a rigid calendar date.' }
          ],
            remediations: { 'complementary-feeding-starts-at-6': { steps: ['If a student cannot distinguish developmental readiness from calendar age: (1) Revisit c11_hs_cbse_08_002 (Growth and.', 'Mother asks to start solids.', 'What do you advise?" Correct: Start complementary feeding — readiness signs are present.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "complementary feeding starts at 6 months exactly" and treat it as a rigid calendar date.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The Baby-Friendly Hospital Initiative (BFHI) \'Ten Steps to Successful Breastfeeding\' is only relevant for hospital births; it has.', answer: 'Critique: The statement is false',
                  options: ['Critique: The statement is false', 'BFHI is only for hospitals', 'complementary feeding starts at 6 months exactly'],
                  hint: 'Revisit c11_hs_cbse_08_002 (Growth and Developmental Milestones in Infancy) — focus on the 4-6.',
                  misconception: 'Students believe "complementary feeding starts at 6 months exactly" and treat it as a rigid calendar date.' }
          ],
            remediations: { 'complementary-feeding-starts-at-6': { steps: ['If a student cannot distinguish developmental readiness from calendar age: (1) Revisit c11_hs_cbse_08_002 (Growth and.', 'Mother asks to start solids.', 'What do you advise?" Correct: Start complementary feeding — readiness signs are present.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_005', difficulty: 'standard',
          question: 'Preschool children (1-6 years) require nutrient-dense diets to support rapid.',
          hint: 'If unable to calculate nutrient adequacy of a menu, revisit c11_hs_cbse_03_008 (food.',
          misconception: 'Students believe "preschoolers need less food than adults because they are smaller" and therefore plan menus with adult.',
          parts: [
                { id: 'a', prompt: 'State the ICMR 2020 Recommended Dietary Allowance (RDA) for energy and protein for a 4-year-old girl weighing 16 kg. Include units.', answer: 'Energy: 1350 kcal/day',
                  options: ['Energy: 1350 kcal/day', 'preschoolers need less food than adults'],
                  hint: 'If unable to calculate nutrient adequacy of a menu, revisit c11_hs_cbse_03_008 (food.',
                  misconception: 'Students believe "preschoolers need less food than adults because they are smaller" and therefore plan menus with adult portions reduced.' },
                { id: 'b', prompt: 'Calculate the additional iron (in mg) needed daily to meet the ICMR 2020 RDA for a 5-year-old boy whose current diet provides 7 mg iron from vegetarian.', answer: 'Step 1: ICMR 2020 RDA for iron, 4-6 years = 13 mg/day (boys)',
                  options: ['Step 1: ICMR 2020 RDA for iron, 4-6 years = 13 mg/day (boys)', 'preschoolers need less food than adults'],
                  hint: 'If unable to calculate nutrient adequacy of a menu, revisit c11_hs_cbse_03_008 (food.',
                  misconception: 'Students believe "preschoolers need less food than adults because they are smaller" and therefore plan menus with adult portions reduced.' },
                { id: 'c', prompt: 'Compare the per-kg-body-weight protein requirement (g/kg/day) for a 2-year-old (12 kg) vs a 25-year-old sedentary man (65 kg) using ICMR 2020 RDAs.', answer: '2-year-old: RDA 16.7 g / 12 kg = 1.39 g/kg/day',
                  options: ['2-year-old: RDA 16.7 g / 12 kg = 1.39 g/kg/day', 'adults need more protein', 'preschoolers need less food than adults'],
                  hint: 'If unable to calculate nutrient adequacy of a menu, revisit c11_hs_cbse_03_008 (food.',
                  misconception: 'Students believe "preschoolers need less food than adults because they are smaller" and therefore plan menus with adult portions reduced.' }
          ],
            remediations: { 'preschoolers-need-less-food-than': { steps: ['If the student exhibits this misconception: Step 1 — Have them calculate per-kg RDA for energy and protein for.', 'Step 2 — Plot gastric capacity vs.', 'nutrient needs on a simple bar chart: x-axis = age group, y-axis = kcal/kg and mL capacity.', 'Step 3 — Ask: "How can 300 mL stomach hold 1060 kcal?" Guide them to nutrient density (kcal/mL) calculation: preschool.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_09_006', difficulty: 'standard',
          question: 'Nutritional requirements of school-age children (7-12 years) refer to the.',
          hint: 'If unable to recall RDA values or food group nutrient profiles, revisit.',
          misconception: 'Students memorise ICMR RDA tables as isolated numbers but fail to connect each nutrient\'s RDA to its specific.',
          parts: [
                { id: 'a', prompt: 'A Class 12 student writes: "School-age children need more calcium than adolescents because their bones are growing faster." Evaluate this statement using ICMR.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'bone growth happens in childhood', 'rate of mineral deposition'],
                  hint: 'If unable to recall RDA values or food group nutrient profiles, revisit c11_hs_cbse_08_010 (Class.',
                  misconception: 'Students memorise ICMR RDA tables as isolated numbers but fail to connect each nutrient\'s RDA to its specific physiological driver in this.' },
                { id: 'b', prompt: 'Compare the iron RDA (mg/day) for a 12-year-old girl vs. a 12-year-old boy per ICMR 2020.', answer: 'ICMR 2020 Iron RDA: 12-year-old boy = 28 mg/day',
                  options: ['ICMR 2020 Iron RDA: 12-year-old boy = 28 mg/day', 'girls lose more blood'],
                  hint: 'If unable to recall RDA values or food group nutrient profiles, revisit c11_hs_cbse_08_010 (Class.',
                  misconception: 'Students memorise ICMR RDA tables as isolated numbers but fail to connect each nutrient\'s RDA to its specific physiological driver in this.' }
          ],
            remediations: { 'students-memorise-icmr-rda-tables': { steps: ['If a student cannot explain the physiological basis for RDA differences across 7-12 years: 1.', 'Revisit c11_bio_cbse_19_005 (Gonads: Testis and Ovary Hormones) to recall oestrogen/testosterone role in growth spurt.', 'Revisit c11_hs_cbse_08_010 (Class 11 school-age nutrition) and re-derive the calcium RDA progression: 850 → 1000 → 1200.', 'Practice: For each nutrient (energy, protein, calcium, iron, vitamin A), write one sentence linking its RDA trend to.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
