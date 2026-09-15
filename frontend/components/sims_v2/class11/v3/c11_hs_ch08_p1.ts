import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch08_p1: SimDef = {
    id: 'v3_c11_hs_ch08_p1',
    title: 'Nutrition for Self and Family · Part 1/2',
    subtitle: 'Learn why \'well-fed\' and \'well-nourished\' are two different report cards.',
    classLevel: 11, subject: 'home_science', topic: 'Nutrition for Self and Family · Part 1/2',
    chapters: ['c11_hs_ch08'],
    nodeIds: ['c11_hs_cbse_08_001', 'c11_hs_cbse_08_002', 'c11_hs_cbse_08_003', 'c11_hs_cbse_08_004', 'c11_hs_cbse_08_005', 'c11_hs_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a health worker weighing a village\'s children', intro: 'An infant at 4.5 kg on diluted cow\'s milk, a preschooler with night blindness on rice-and-dal — each stage has its own nutritional maths.', goal: 'Link feeding practices to developmental stages and evaluate the dual burden of malnutrition.' },
    discovery: {
        question: 'A 10-year-old lives on chips, cola and white bread — 2,500 kcal a day and overweight. Malnourished?',
        options: ['Yes — obesity with iron, calcium and vitamin D deficiency is still malnutrition; the burden runs both ways', 'No — overweight means over-nourished, full stop', 'No — malnutrition only means being thin', 'Yes — but only because of the sugar'],
        answer: 'Yes — obesity with iron, calcium and vitamin D deficiency is still malnutrition; the burden runs both ways',
        hook: 'For a low-birth-weight baby, the fix isn\'t a formula bottle — mother\'s milk carries amino acids and antimicrobial factors no powder replicates.',
    },
    teaching: [
        { title: 'Concept of Nutrition and Its Role in Child Health', text: 'Nutrition is the science of food and its relationship to health, encompassing the processes by which organisms ingest, digest, absorb, transport, utilize, and excrete nutrients to sustain growth.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_08_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Compute a preschooler\'s protein and energy deficits against ICMR norms, then argue why protein shortfall cuts deeper than calorie shortfall at age four.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_001', title: 'Concept of Nutrition and Its Role in Child Health',
          caseStudy: { intro: 'Imagine you are a community health worker visiting a village where a 6-month-old infant weighs only 4.5 kg (birth weight 2.8 kg) and a 4-year-old child has.',
            decisions: [{ prompt: 'Define "nutrition" in the context of child health and distinguish it from "diet" using two specific physiological processes that nutrition.', options: [
                { text: 'Nutrition is the sum of processes—ingestion, digestion, absorption, transport,', outcome: 'Nutrition is the sum of processes—ingestion, digestion, absorption, transport, metabolism, and.' },
                { text: 'eating healthy food', outcome: 'Not quite — Students equate "malnutrition" only with "thinness/underweight" (undernutrition) and fail.', reveals: 'students-equate-malnutrition-only-with' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_08_002', title: 'Growth and Developmental Milestones in Infancy (0-12 Months)',
          scaffold: { problem: 'A 3-month-old infant weighed 3.0 kg at birth and now weighs 5.2 kg. The mother is exclusively breastfeeding.',
            steps: [
            { text: 'Calculate expected weight at 3 months using the doubling-by-6-months rule.' },
            { text: 'Compare actual weight (5.2 kg) with expected (4.5 kg). The infant is 0.7 kg above expectation, indicating good growth.' },
            { text: 'Identify the correct RDA coefficients for age 3 months (0-6 month bracket): Energy = 108 kcal/kg/day, Protein = 2.05.' },
            { text: 'Compute daily requirements using current weight: Energy = 108 × 5.2 = 561.6 kcal/day; Protein = 2.05 × 5.2 = 10.66.' },
            { text: 'Interpret: The mother\'s milk must supply ~562 kcal and ~10.7 g protein daily.', faded: true, blankAnswer: 'Growth is adequate (5.2 kg > 4.5 kg expected). Daily energy.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hs_cbse_08_003', title: 'ICMR Recommended Dietary Allowances for Infants',
          scaffold: { problem: 'A 3-month-old infant weighs 5.2 kg. Using ICMR 2010 RDAs, calculate the infant\'s daily Energy and Protein requirements.',
            steps: [
            { text: 'Identify the correct age column in the RDA table → 0–6 months (Birth to 6 Months).' },
            { text: 'Extract the per-kg values: Energy = 108 kcal/kg, Protein = 2.05 g/kg.' },
            { text: 'Multiply by infant\'s body weight (5.2 kg): Energy = 108 × 5.2 = 561.6 kcal/day; Protein = 2.05 × 5.2 = 10.66 g/day.' },
            { text: 'Calculate nutrient supply from 750 ml breast milk: Energy = (65 kcal/100 ml) × 7.5 = 487.5 kcal; Protein = (1.1 g/100.' },
            { text: 'Compare supply vs. requirement: Energy deficit = 561.6 – 487.5 = 74.1 kcal; Protein deficit = 10.66 – 8.25 = 2.41 g.', faded: true, blankAnswer: 'Energy requirement = 561.6 kcal/day; Protein requirement.' }
            ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_004', title: 'Breastfeeding: Benefits, Physiology and WHO Recommendations',
          caseStudy: { intro: 'Imagine a new mother in your neighbourhood who is told by her mother-in-law to discard the "yellow water" (colostrum) and give honey-water instead for the.',
            decisions: [{ prompt: 'Define "exclusive breastfeeding" as per WHO recommendation and state the exact duration for which it is advised.', options: [
                { text: 'Exclusive breastfeeding means the infant receives only breast milk (including expressed', outcome: 'Exclusive breastfeeding means the infant receives only breast milk (including expressed milk.' },
                { text: 'breastfeeding with water', outcome: 'Not quite — Students often believe that "foremilk" (watery milk at start of feed) and "hindmilk" (creamy milk.', reveals: 'foremilk-watery-milk-at-start' },
                { text: 'for 4 months', outcome: 'Not quite — Students often believe that "foremilk" (watery milk at start of feed) and "hindmilk" (creamy milk.', reveals: 'foremilk-watery-milk-at-start' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_005', title: 'Complementary Feeding: Principles, Types and Guidelines',
          caseStudy: { intro: 'Imagine you are counseling a young mother whose 6-month-old baby has just started refusing exclusive breastfeeding and seems hungry after feeds.',
            decisions: [{ prompt: 'Define complementary feeding and state the exact age (in months) recommended by WHO for its initiation.', options: [
                { text: 'Complementary feeding is the process of introducing solid/semi-solid foods alongside', outcome: 'Complementary feeding is the process of introducing solid/semi-solid foods alongside continued.' },
                { text: '4 months', outcome: 'Not quite — Students believe "complementary feeding means replacing breast milk with solid foods" and therefore.', reveals: 'complementary-feeding-means-replacing-breast' },
                { text: 'when baby gets teeth', outcome: 'Not quite — Students believe "complementary feeding means replacing breast milk with solid foods" and therefore.', reveals: 'complementary-feeding-means-replacing-breast' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_006', title: 'Low-Cost Complementary Foods Using Locally Available Ingredients',
          caseStudy: { intro: 'Imagine you are a community health worker visiting a village where mothers cannot afford commercial baby cereals like Cerelac.',
            decisions: [{ prompt: 'List the seven low-cost complementary food formulations recommended in the NCERT textbook and state the primary cereal base used in each.', options: [
                { text: 'The seven formulations are: (1) Indian multipurpose flour – groundnut flour (low fat) and', outcome: 'The seven formulations are: (1) Indian multipurpose flour – groundnut flour (low fat) and bengal.' },
                { text: 'low-cost complementary food', outcome: 'Not quite — Students believe "low-cost complementary food" means simply mixing any available grains and pulses.', reveals: 'low-cost-complementary-food-means' },
                { text: '1 cup rice + 1 cup dal + 1 cup groundnut', outcome: 'Not quite — Students believe "low-cost complementary food" means simply mixing any available grains and pulses.', reveals: 'low-cost-complementary-food-means' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Nutrition for Self and Family · Part 1/2', spots: [
            { id: 's1', label: 'Concept of Nutrition and Its Role in Child Health', prompt: 'Which idea is this? — Nutrition is the science of food and its relationship to health, encompassing the.', answer: 'Concept of Nutrition and Its Role in Child Health', options: ['Concept of Nutrition and Its Role in Child Health', 'Growth and Developmental Milestones in Infancy 0-12 Months', 'ICMR Recommended Dietary Allowances for Infants', 'Breastfeeding Benefits Physiology and WHO Recommendations'] },
            { id: 's2', label: 'Growth and Developmental Milestones in Infancy 0-12 Months', prompt: 'Which idea is this? — Growth and developmental milestones in infancy (0-12 months) refer to the sequential.', answer: 'Growth and Developmental Milestones in Infancy 0-12 Months', options: ['Growth and Developmental Milestones in Infancy 0-12 Months', 'Concept of Nutrition and Its Role in Child Health', 'ICMR Recommended Dietary Allowances for Infants', 'Breastfeeding Benefits Physiology and WHO Recommendations'] },
            { id: 's3', label: 'ICMR Recommended Dietary Allowances for Infants', prompt: 'Which idea is this? — The ICMR Recommended Dietary Allowances (RDAs) for infants are scientifically derived.', answer: 'ICMR Recommended Dietary Allowances for Infants', options: ['ICMR Recommended Dietary Allowances for Infants', 'Concept of Nutrition and Its Role in Child Health', 'Growth and Developmental Milestones in Infancy 0-12 Months', 'Breastfeeding Benefits Physiology and WHO Recommendations'] },
            { id: 's4', label: 'Breastfeeding Benefits Physiology and WHO Recommendations', prompt: 'Which idea is this? — Breastfeeding is the physiological process of feeding an infant with human milk directly.', answer: 'Breastfeeding Benefits Physiology and WHO Recommendations', options: ['Breastfeeding Benefits Physiology and WHO Recommendations', 'Concept of Nutrition and Its Role in Child Health', 'Growth and Developmental Milestones in Infancy 0-12 Months', 'ICMR Recommended Dietary Allowances for Infants'] },
            { id: 's5', label: 'Complementary Feeding Principles Types and Guidelines', prompt: 'Which idea is this? — Complementary feeding is the process of gradually introducing nutrient-dense.', answer: 'Complementary Feeding Principles Types and Guidelines', options: ['Complementary Feeding Principles Types and Guidelines', 'Concept of Nutrition and Its Role in Child Health', 'Growth and Developmental Milestones in Infancy 0-12 Months', 'ICMR Recommended Dietary Allowances for Infants'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a village health visit, a worker sees an overweight 10-year-old on chips and sugary drinks and writes \'well-nourished\'. She also tells a mother: \'Start dal exactly at 6 months — the calendar says so,\' though the baby still pushes food out with her tongue.',
            decisions: [{ prompt: 'What do both calls get wrong about child nutrition?', options: [
                { text: 'Widen malnutrition and tie feeding to development: the obese child can carry hidden hunger — iron, calcium, vitamin D, fibre deficiencies behind excess calories. And complementary feeding readiness is developmental, not calendrical: loss of tongue-thrust, head control and sitting with support signal readiness — feeding a tongue-thrusting 6-month-old risks aspiration, while delaying a ready 7-month-old misses the iron window.', outcome: 'The assessment becomes integrated: milestones are the visible output of nutrition matching development — growth rules (weight doubles by 6 months) plus readiness signs, not the calendar alone.' },
                { text: 'Keep \'well-nourished\' — the child is clearly not thin, so malnutrition doesn\'t apply.', outcome: 'Malnutrition isn\'t only underweight: excess calories with micronutrient deficiency is the dual burden — obesity and anaemia can coexist.', reveals: 'overweight-means-well-nourished' },
                { text: 'Keep the 6-month rule — feeding schedules are set by age, uniformly.', outcome: 'Age sets the window; development sets the readiness: oral-motor signs decide safety, so rigid calendaring both risks aspiration and can miss the iron window.', reveals: 'feeding-by-calendar-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'Between one and six the brain is wiring itself on amino acids — an energy gap slows a child down; a protein gap builds less brain.',
            decisions: [{ prompt: 'What comes next? Nutrition for Self and Family · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Nutrition for Self and Family · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_001', difficulty: 'standard',
          question: 'Nutrition is the science of food and its relationship to health, encompassing.',
          hint: 'Revisit Class 10 Biology Chapter 1 (Life Processes) — specifically the nutrition section.',
          misconception: 'Students equate "malnutrition" only with "thinness/underweight" (undernutrition) and fail to recognise that a child can.',
          parts: [
                { id: 'a', prompt: 'Define "nutrition" in the context of child health and distinguish it from "diet" using two specific physiological processes that nutrition encompasses but diet.', answer: 'Nutrition is the sum of processes—ingestion, digestion, absorption, transport,',
                  options: ['Nutrition is the sum of processes—ingestion, digestion, absorption, transport,', 'eating healthy food'],
                  hint: 'Revisit Class 10 Biology Chapter 1 (Life Processes) — specifically the nutrition section covering.',
                  misconception: 'Students equate "malnutrition" only with "thinness/underweight" (undernutrition) and fail to recognise that a child can be overweight yet.' }
          ],
            remediations: { 'students-equate-malnutrition-only-with': { steps: ['Show the student two growth charts—one of a stunted child (low height-for-age) and one of an obese child with low serum.', 'Define malnutrition per NCERT: "Refers to both undernutrition and overnutrition.', 'Map three nutrients (iron, calcium, vitamin A) to their deficiency consequences *independent of weight status*.', 'Practice a board-style case: "A 12-year-old girl, BMI 24, complains of fatigue, poor concentration, frequent fractures.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_002', difficulty: 'standard',
          question: 'Growth and developmental milestones in infancy (0-12 months) refer to the.',
          hint: 'Revisit c11_hs_cbse_08_001 (Concept of Nutrition and Its Role in Child Health) and review.',
          misconception: 'Students often believe that "developmental milestones" in infancy are only motor skills (rolling, sitting, crawling).',
          parts: [
                { id: 'a', prompt: 'A 4-month-old infant weighs 6.5 kg (birth weight 3.2 kg). Using the growth velocity rule, determine if this weight gain is on track.', answer: 'Step 1: Expected weight at 4 months',
                  options: ['Step 1: Expected weight at 4 months', 'developmental milestones'],
                  hint: 'Revisit c11_hs_cbse_08_001 (Concept of Nutrition and Its Role in Child Health) and review the.',
                  misconception: 'Students often believe that "developmental milestones" in infancy are only motor skills (rolling, sitting, crawling) and treat feeding.' }
          ],
            remediations: { 'developmental-milestones-in-infancy-are': { steps: ['Have the student create a two-column table: left column = "Motor/Oral Milestone", right column = "Feeding Implication".', 'Give three case vignettes (e.g., "5-month-old with good head control but strong tongue-thrust"; "7-month-old sitting.', 'Explicitly link each feeding transition to the physiological system that matures: tongue-thrust loss → safe swallowing.', 'Practice writing a board-style answer: "At 6 months, infant shows head control and loss of tongue-thrust reflex.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "developmental milestones" in infancy are only motor skills (rolling, sitting, crawling).',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "If a low birth weight infant (<2.5 kg) is gaining weight slowly, the mother should immediately start top feeds with formula to catch.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'developmental milestones'],
                  hint: 'Revisit c11_hs_cbse_08_001 (Concept of Nutrition and Its Role in Child Health) and review the.',
                  misconception: 'Students often believe that "developmental milestones" in infancy are only motor skills (rolling, sitting, crawling) and treat feeding.' },
                { id: 'b', prompt: 'Design a one-page "Growth & Feeding Milestone Tracker" for parents of a 0-12 month infant that integrates anthropometric checkpoints, developmental feeding.', answer: 'Layout: Columns = Age (months) | Weight Check (kg/% gain) | Length Check (cm) |',
                  options: ['Layout: Columns = Age (months) | Weight Check (kg/% gain) | Length Check (cm) |', 'developmental milestones'],
                  hint: 'Revisit c11_hs_cbse_08_001 (Concept of Nutrition and Its Role in Child Health) and review the.',
                  misconception: 'Students often believe that "developmental milestones" in infancy are only motor skills (rolling, sitting, crawling) and treat feeding.' }
          ],
            remediations: { 'developmental-milestones-in-infancy-are': { steps: ['Have the student create a two-column table: left column = "Motor/Oral Milestone", right column = "Feeding Implication".', 'Give three case vignettes (e.g., "5-month-old with good head control but strong tongue-thrust"; "7-month-old sitting.', 'Explicitly link each feeding transition to the physiological system that matures: tongue-thrust loss → safe swallowing.', 'Practice writing a board-style answer: "At 6 months, infant shows head control and loss of tongue-thrust reflex.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_003', difficulty: 'standard',
          question: 'The ICMR Recommended Dietary Allowances (RDAs) for infants are scientifically.',
          hint: 'If stuck on the "per kg" concept, revisit c11_hs_cbse_08_002 (Growth Milestones) and.',
          misconception: 'Students often think the RDA values in the table are *fixed daily totals* for all infants in that age group (e.g.',
          parts: [
                { id: 'a', prompt: 'State the ICMR 2010 recommended dietary allowance for Energy and Protein for an infant aged 0–6 months, including the units used in the table.', answer: 'Energy: 108 kcal per kg body weight',
                  options: ['Energy: 108 kcal per kg body weight', '600 kcal', 'every 0–6 month baby needs exactly 108 kcal total'],
                  hint: 'If stuck on the "per kg" concept, revisit c11_hs_cbse_08_002 (Growth Milestones) and note: "Weight.',
                  misconception: 'Students often think the RDA values in the table are *fixed daily totals* for all infants in that age group (e.g., "every 0–6 month baby.' },
                { id: 'b', prompt: 'A 5-month-old infant weighs 6.5 kg. Using the ICMR 2010 RDA, calculate the infant\'s daily Energy (kcal) and Protein (g) requirements. Show all steps.', answer: 'Step 1: Identify age group → 0–6 months',
                  options: ['Step 1: Identify age group → 0–6 months', 'every 0–6 month baby needs exactly 108 kcal total'],
                  hint: 'If stuck on the "per kg" concept, revisit c11_hs_cbse_08_002 (Growth Milestones) and note: "Weight.',
                  misconception: 'Students often think the RDA values in the table are *fixed daily totals* for all infants in that age group (e.g., "every 0–6 month baby.' },
                { id: 'c', prompt: 'Compare the per-kg Energy and Protein RDAs for 0–6 months vs. 6–12 months.', answer: 'Per-kg Energy drops from 108 to 98 kcal/kg',
                  options: ['Per-kg Energy drops from 108 to 98 kcal/kg', 'every 0–6 month baby needs exactly 108 kcal total'],
                  hint: 'If stuck on the "per kg" concept, revisit c11_hs_cbse_08_002 (Growth Milestones) and note: "Weight.',
                  misconception: 'Students often think the RDA values in the table are *fixed daily totals* for all infants in that age group (e.g., "every 0–6 month baby.' }
          ],
            remediations: { 'the-rda-values-in-the': { steps: ['If a student treats the values as absolute: (1) Point to the column header "Birth to 6 Months" and the row label.', '(2) Ask: "If a baby weighs 4 kg and another 7 kg, do they need the same calories?" (3) Show the worked example in the.', 'baby thrives well if mother is well nourished" — this implies the milk volume scales with baby\'s demand, which scales.', '(4) Practice: Give three infants with different weights (3.5, 5.5, 7.5 kg) and have the student compute each.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_004', difficulty: 'standard',
          question: 'Breastfeeding is the physiological process of feeding an infant with human milk.',
          hint: 'Revisit Class 10 Biology Chapter 3 (Human Reproduction) — specifically the section.',
          misconception: 'Students often believe that "foremilk" (watery milk at start of feed) and "hindmilk" (creamy milk at end) are two.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Breastfeeding is the physiological process of feeding an infant with human milk directly',
                  options: ['Breastfeeding is the physiological process of feeding an infant with human milk directly', 'Nutrition is the science of food and its relationship to health, encompassing the', 'Growth and developmental milestones in infancy (0-12 months) refer to the sequential,', 'The ICMR Recommended Dietary Allowances (RDAs) for infants are scientifically derived'],
                  hint: 'Revisit Class 10 Biology Chapter 3 (Human Reproduction) — specifically the section on mammary gland.',
                  misconception: 'Students often believe that "foremilk" (watery milk at start of feed) and "hindmilk" (creamy milk at end) are two distinct types of milk.' }
          ],
            remediations: { 'foremilk-watery-milk-at-start': { steps: ['Show a video of milk fat globule ejection during a feed (ultrasound or animation) to visualise the gradual fat increase.', 'Conduct a thought experiment: "If foremilk and hindmilk were separate, where is the valve that switches them?" 3.', 'Have the student plot a graph of fat percentage vs time during a feed using data from lactation studies (e.g., 1%.', 'Practice counselling a role-play mother who says "my baby only drinks for 10 minutes per side" — guide the student.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_005', difficulty: 'standard',
          question: 'Complementary feeding is the process of gradually introducing nutrient-dense.',
          hint: 'If stuck, revisit the "Growth and Developmental Milestones in Infancy" node.',
          misconception: 'Students believe "complementary feeding means replacing breast milk with solid foods" and therefore recommend stopping.',
          parts: [
                { id: 'a', prompt: 'A mother introduces three new foods (mashed banana, suji kheer, and egg yolk) on the same day to her 6-month-old.', answer: 'This violates the "only one food at a time" guideline',
                  options: ['This violates the "only one food at a time" guideline', 'confusion', 'complementary feeding means replacing breast milk with solid foods'],
                  hint: 'If stuck, revisit the "Growth and Developmental Milestones in Infancy" node (c11_hs_cbse_08_002).',
                  misconception: 'Students believe "complementary feeding means replacing breast milk with solid foods" and therefore recommend stopping breastfeeding at 6.' },
                { id: 'b', prompt: 'Compare the nutrient composition rationale for "Indian Multipurpose Flour" (groundnut flour: bengal gram 75:25) versus "Win Food" (pearl millet: green gram.', answer: 'Win Food better addresses protein quality',
                  options: ['Win Food better addresses protein quality', 'complementary feeding means replacing breast milk with solid foods'],
                  hint: 'If stuck, revisit the "Growth and Developmental Milestones in Infancy" node (c11_hs_cbse_08_002).',
                  misconception: 'Students believe "complementary feeding means replacing breast milk with solid foods" and therefore recommend stopping breastfeeding at 6.' }
          ],
            remediations: { 'complementary-feeding-means-replacing-breast': { steps: ['If a student exhibits this misconception: (1) Show the WHO breastfeeding continuum graphic: exclusive BF 0-6m →.', '(2) Calculate: at 6-8 months, breast milk provides ~600 kcal/day; complementary foods need to add only ~200 kcal/day.', '(3) Assign a role-play: counsel a mother who wants to stop BF because "baby eats solids now." Student must explain the.', '(4) Revisit node c11_hs_cbse_08_004 (Breastfeeding benefits) to reinforce that complementary feeding builds.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_006', difficulty: 'standard',
          question: 'Low-cost complementary foods are nutrient-dense, home-prepared mixtures made.',
          hint: 'Review "mutual supplementation of cereal and pulse proteins" from Class 10 Biology.',
          misconception: 'Students believe "low-cost complementary food" means simply mixing any available grains and pulses in equal proportions.',
          parts: [
                { id: 'a', prompt: 'A mother in Rajasthan wants to prepare Win food for her 9-month-old using 500g total batch.', answer: 'Win food ratio = 5:2:2:2 (pearl millet : green gram : groundnut : jaggery)',
                  options: ['Win food ratio = 5:2:2:2 (pearl millet : green gram : groundnut : jaggery)', 'low-cost complementary food', '1 cup rice + 1 cup dal + 1 cup groundnut'],
                  hint: 'Review "mutual supplementation of cereal and pulse proteins" from Class 10 Biology.',
                  misconception: 'Students believe "low-cost complementary food" means simply mixing any available grains and pulses in equal proportions (e.g., "1 cup rice.' },
                { id: 'b', prompt: 'Compare Balahar (7:2:2 wheat:groundnut:bengal gram) and Amutham (1.5:1.5:1.5:2.5:2.5 rice:ragi:bengal gram:sesame:groundnut + jaggery).', answer: 'For Tamil Nadu coast: Amutham is superior',
                  options: ['For Tamil Nadu coast: Amutham is superior', 'familiarity', 'low-cost complementary food', '1 cup rice + 1 cup dal + 1 cup groundnut'],
                  hint: 'Review "mutual supplementation of cereal and pulse proteins" from Class 10 Biology.',
                  misconception: 'Students believe "low-cost complementary food" means simply mixing any available grains and pulses in equal proportions (e.g., "1 cup rice.' }
          ],
            remediations: { 'low-cost-complementary-food-means': { steps: ['If a student proposes equal-part mixing: (1) Ask them to calculate protein energy % for their 1:1:1:1 mix using.', '(2) Have them compare amino acid profiles: cereal-only lacks lysine; pulse-only lacks methionine; show how the textbook.', '(3) Demonstrate with a simple experiment: cook raw vs.', 'roasted besan (bengal gram flour) in water – raw forms lumps and smells beany; roasted disperses smoothly.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
