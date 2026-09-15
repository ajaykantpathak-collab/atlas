import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch08_p2: SimDef = {
    id: 'v3_c11_hs_ch08_p2',
    title: 'Nutrition for Self and Family · Part 2/2',
    subtitle: 'Learn why \'well-fed\' and \'well-nourished\' are two different report cards.',
    classLevel: 11, subject: 'home_science', topic: 'Nutrition for Self and Family · Part 2/2',
    chapters: ['c11_hs_ch08'],
    nodeIds: ['c11_hs_cbse_08_007', 'c11_hs_cbse_08_008', 'c11_hs_cbse_08_009', 'c11_hs_cbse_08_010', 'c11_hs_cbse_08_011', 'c11_hs_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a health worker weighing a village\'s children', intro: 'An infant at 4.5 kg on diluted cow\'s milk, a preschooler with night blindness on rice-and-dal — each stage has its own nutritional maths.', goal: 'Link feeding practices to developmental stages and evaluate the dual burden of malnutrition.' },
    discovery: {
        question: 'A 10-year-old lives on chips, cola and white bread — 2,500 kcal a day and overweight. Malnourished?',
        options: ['Yes — obesity with iron, calcium and vitamin D deficiency is still malnutrition; the burden runs both ways', 'No — overweight means over-nourished, full stop', 'No — malnutrition only means being thin', 'Yes — but only because of the sugar'],
        answer: 'Yes — obesity with iron, calcium and vitamin D deficiency is still malnutrition; the burden runs both ways',
        hook: 'For a low-birth-weight baby, the fix isn\'t a formula bottle — mother\'s milk carries amino acids and antimicrobial factors no powder replicates.',
    },
    teaching: [
        { title: 'Immunisation Schedule for Infants and Children: Vaccines and Mechanism', text: 'Immunisation schedule is a scientifically designed timetable specifying the exact ages at which infants and children should receive specific vaccines to induce active immunity against.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_08_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Compute a preschooler\'s protein and energy deficits against ICMR norms, then argue why protein shortfall cuts deeper than calorie shortfall at age four.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_007', title: 'Immunisation Schedule for Infants and Children: Vaccines and Mechanism',
          caseStudy: { intro: 'Imagine you are a community health volunteer in a rural village.',
            decisions: [{ prompt: 'What does the acronym \'PENTA\' stand for in the National Immunisation Schedule, and at which three ages is it administered?', options: [
                { text: 'PENTA stands for a combination vaccine containing DPT (Diphtheria, Pertussis, Tetanus),', outcome: 'PENTA stands for a combination vaccine containing DPT (Diphtheria, Pertussis, Tetanus), Hepatitis.' },
                { text: 'PENTA is only DPT', outcome: 'Not quite — Students often believe vaccines contain live, disease-causing germs that can actually give the.', reveals: 'vaccines-contain-live' },
                { text: 'given at birth', outcome: 'Not quite — Students often believe vaccines contain live, disease-causing germs that can actually give the.', reveals: 'vaccines-contain-live' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_008', title: 'Nutritional Requirements of Preschool Children (1-6 Years)',
          caseStudy: { intro: 'Imagine you are helping your neighbour plan a day\'s meals for their 4-year-old who is a picky eater and often skips lunch.',
            decisions: [{ prompt: 'A REMEMBER level question: State the ICMR 2010 Recommended Dietary Allowance for energy (Kcal) and protein (g) for a 5-year-old child.', options: [
                { text: 'Correct answer: Energy = 1690 Kcal, Protein = 30 g', outcome: 'Correct answer: Energy = 1690 Kcal, Protein = 30 g. A wrong answer (e.g., 1240 Kcal and 22 g).' },
                { text: 'balanced diet for preschoolers means giving adult food in smaller portions', outcome: 'Not quite — Students often believe that "balanced diet for preschoolers means giving adult food in smaller.', reveals: 'balanced-diet-for-preschoolers-means' },
                { text: 'the child eats little', outcome: 'Not quite — Students often believe that "balanced diet for preschoolers means giving adult food in smaller.', reveals: 'balanced-diet-for-preschoolers-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_009', title: 'Planning Balanced Meals for Preschool Children Using ICMR Guidelines',
          caseStudy: { intro: 'Imagine you are helping your aunt plan a day\'s meals for her 4-year-old daughter who is a picky eater and often skips lunch.',
            decisions: [{ prompt: 'A parent asks: "The ICMR table says 120 g cereals for a 5-year-old.', options: [
                { text: 'The 120 g refers to the raw/uncooked weight of cereals and millets (e.g., wheat flour,', outcome: 'The 120 g refers to the raw/uncooked weight of cereals and millets (e.g., wheat flour, rice, ragi).' },
                { text: 'the ICMR food group quantities (e', outcome: 'Not quite — Students believe the ICMR food group quantities (e.g., 120 g cereals) are the cooked/served weights.', reveals: 'the-icmr-food-group-quantities' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_010', title: 'Nutritional Requirements of School-Age Children (7-12 Years)',
          caseStudy: { intro: 'Imagine you are helping your 10‑year‑old cousin plan a tiffin box that meets her ICMR RDA while she insists on packing chips and chocolate.',
            decisions: [{ prompt: 'State the ICMR (2010) Recommended Dietary Allowance for energy and protein for a 9‑year‑old boy and a 10‑year‑old girl.', options: [
                { text: 'For a 9‑year‑old boy (7–9 years group): Energy = 1690 kcal, Protein = 29.5 g', outcome: 'For a 9‑year‑old boy (7–9 years group): Energy = 1690 kcal, Protein = 29.5 g.' },
                { text: 'All nutrient needs increase by about 30% from 7–9 to 10–12 years', outcome: 'Not quite — Students often treat the school‑age RDA table as a simple upward extension of preschool values.', reveals: 'students-often-treat-the-school' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_011', title: 'Health and Nutrition Issues in School-Age Children: Obesity and Undernutrition',
          caseStudy: { intro: 'Imagine you are a school health coordinator reviewing two students: Rohan (11 years, 55 kg, 145 cm) from a private urban school who brings packaged snacks.',
            decisions: [{ prompt: 'A 10-year-old boy weighs 42 kg and is 138 cm tall. Using the BMI-for-age formula (weight in kg / height in m²), calculate his BMI and state.', options: [
                { text: 'BMI = 42 / (1.38)² = 42 / 1.9044 = 22.05 kg/m²', outcome: 'BMI = 42 / (1.38)² = 42 / 1.9044 = 22.05 kg/m². No, BMI alone is insufficient; classification.' },
                { text: 'hidden hunger', outcome: 'Not quite — Students believe obesity and undernutrition are mutually exclusive categories—either a child.', reveals: 'obesity-and-undernutrition-are-mutually' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_012', title: 'Feeding Children with Special Needs: Adaptations and Strategies',
          caseStudy: { intro: 'Imagine you are a home science student visiting an anganwadi where a 4-year-old child with cerebral palsy struggles to eat lunch—food spills from her mouth.',
            decisions: [{ prompt: 'A child with spastic cerebral palsy frequently chokes on thin liquids like water and clear soup.', options: [
                { text: 'The first adaptation is to thicken thin liquids using agents like rice flour, cornstarch,', outcome: 'The first adaptation is to thicken thin liquids using agents like rice flour, cornstarch,.' },
                { text: 'give only solid foods', outcome: 'Not quite — Students often believe "special diet for special needs" means a completely different set of foods.', reveals: 'special-diet-for-special-needs' },
                { text: 'use a feeding tube immediately', outcome: 'Not quite — Students often believe "special diet for special needs" means a completely different set of foods.', reveals: 'special-diet-for-special-needs' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_08_008', title: 'Identify each idea',
          dissect: { specimen: 'Nutrition for Self and Family · Part 2/2', spots: [
            { id: 's1', label: 'Nutritional Requirements of Preschool Children 1-6 Years', prompt: 'Which idea is this? — Nutritional requirements of preschool children (1-6 years) refer to the specific.', answer: 'Nutritional Requirements of Preschool Children 1-6 Years', options: ['Nutritional Requirements of Preschool Children 1-6 Years', 'Nutritional Requirements of School-Age Children 7-12 Years'] },
            { id: 's2', label: 'Nutritional Requirements of School-Age Children 7-12 Years', prompt: 'Which idea is this? — Nutritional requirements of school-age children (7–12 years) are the specific Recommended.', answer: 'Nutritional Requirements of School-Age Children 7-12 Years', options: ['Nutritional Requirements of School-Age Children 7-12 Years', 'Nutritional Requirements of Preschool Children 1-6 Years'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a village health visit, a worker sees an overweight 10-year-old on chips and sugary drinks and writes \'well-nourished\'. She also tells a mother: \'Start dal exactly at 6 months — the calendar says so,\' though the baby still pushes food out with her tongue.',
            decisions: [{ prompt: 'What do both calls get wrong about child nutrition?', options: [
                { text: 'Widen malnutrition and tie feeding to development: the obese child can carry hidden hunger — iron, calcium, vitamin D, fibre deficiencies behind excess calories. And complementary feeding readiness is developmental, not calendrical: loss of tongue-thrust, head control and sitting with support signal readiness — feeding a tongue-thrusting 6-month-old risks aspiration, while delaying a ready 7-month-old misses the iron window.', outcome: 'The assessment becomes integrated: milestones are the visible output of nutrition matching development — growth rules (weight doubles by 6 months) plus readiness signs, not the calendar alone.' },
                { text: 'Keep \'well-nourished\' — the child is clearly not thin, so malnutrition doesn\'t apply.', outcome: 'Malnutrition isn\'t only underweight: excess calories with micronutrient deficiency is the dual burden — obesity and anaemia can coexist.', reveals: 'overweight-means-well-nourished' },
                { text: 'Keep the 6-month rule — feeding schedules are set by age, uniformly.', outcome: 'Age sets the window; development sets the readiness: oral-motor signs decide safety, so rigid calendaring both risks aspiration and can miss the iron window.', reveals: 'feeding-by-calendar-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_08_012', title: 'You made it',
          caseStudy: { intro: 'Between one and six the brain is wiring itself on amino acids — an energy gap slows a child down; a protein gap builds less brain.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_007', difficulty: 'standard',
          question: 'Immunisation schedule is a scientifically designed timetable specifying the.',
          hint: 'Review Class 8 Biology \'Immunity: Body\'s Defence Against Diseases\' and \'Vaccines: How.',
          misconception: 'Students often believe vaccines contain live, disease-causing germs that can actually give the child a mild form of the.',
          parts: [
                { id: 'a', prompt: 'Why is the BCG vaccine given at birth while the Measles-Rubella (MR) vaccine is delayed until 9 months?', answer: 'BCG is given at birth',
                  options: ['BCG is given at birth', 'BCG is stronger', 'MR is for older children', 'inactive/attenuated form'],
                  hint: 'Review Class 8 Biology \'Immunity: Body\'s Defence Against Diseases\' and \'Vaccines: How They Work\'.',
                  misconception: 'Students often believe vaccines contain live, disease-causing germs that can actually give the child a mild form of the disease.' }
          ],
            remediations: { 'vaccines-contain-live': { steps: ['Explicitly define "inactive form" – killed whole organism, purified protein subunit, or toxoid (inactivated toxin).', 'Use the "wanted poster" analogy: vaccine shows the immune system a photo of the criminal (antigen) so it can make.', 'Draw a simple flowchart: Vaccine → Antigen Presenting Cell → Helper T Cell → B Cell → Plasma Cell (antibodies) + Memory.', 'Have the student explain why a child with fever after DPT is not "sick with diphtheria" – the fever is cytokine release.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe vaccines contain live, disease-causing germs that can actually give the child a mild form of the.',
          parts: [
                { id: 'a', prompt: 'A parent argues: "Polio has been eradicated in India, so the OPV doses in the schedule are unnecessary and only cause side effects." Critique this argument.', answer: 'The argument is flawed',
                  options: ['The argument is flawed', 'polio is gone so stop', 'inactive/attenuated form', 'weakened but still infectious'],
                  hint: 'Review Class 8 Biology \'Immunity: Body\'s Defence Against Diseases\' and \'Vaccines: How They Work\'.',
                  misconception: 'Students often believe vaccines contain live, disease-causing germs that can actually give the child a mild form of the disease.' }
          ],
            remediations: { 'vaccines-contain-live': { steps: ['Explicitly define "inactive form" – killed whole organism, purified protein subunit, or toxoid (inactivated toxin).', 'Use the "wanted poster" analogy: vaccine shows the immune system a photo of the criminal (antigen) so it can make.', 'Draw a simple flowchart: Vaccine → Antigen Presenting Cell → Helper T Cell → B Cell → Plasma Cell (antibodies) + Memory.', 'Have the student explain why a child with fever after DPT is not "sick with diphtheria" – the fever is cytokine release.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_008', difficulty: 'standard',
          question: 'Nutritional requirements of preschool children (1-6 years) refer to the.',
          hint: 'If stuck, revisit c11_hs_cbse_08_003 (ICMR RDA for infants) to practice table reading.',
          misconception: 'Students often believe that "balanced diet for preschoolers means giving adult food in smaller portions." This leads.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: State the ICMR 2010 Recommended Dietary Allowance for energy (Kcal) and protein (g) for a 5-year-old child.', answer: 'Correct answer: Energy = 1690 Kcal, Protein = 30 g',
                  options: ['Correct answer: Energy = 1690 Kcal, Protein = 30 g', 'balanced diet for preschoolers means giving adult food in smaller portions', 'the child eats little', '"balanced diet for preschoolers means giving adult food in smaller portions'],
                  hint: 'If stuck, revisit c11_hs_cbse_08_003 (ICMR RDA for infants) to practice table reading, and.',
                  misconception: 'Students often believe that "balanced diet for preschoolers means giving adult food in smaller portions." This leads to two errors: (1).' },
                { id: 'b', prompt: 'An UNDERSTAND level question: Explain why the ICMR balanced diet for preschoolers (Table 5) specifies 500 ml of milk for both 1-3 years and 4-6 years, while.', answer: 'Correct answer: Milk provides high-quality protein, calcium, and vitamin B12',
                  options: ['Correct answer: Milk provides high-quality protein, calcium, and vitamin B12', 'milk is less important for older children', 'balanced diet for preschoolers means giving adult food in smaller portions', 'the child eats little'],
                  hint: 'If stuck, revisit c11_hs_cbse_08_003 (ICMR RDA for infants) to practice table reading, and.',
                  misconception: 'Students often believe that "balanced diet for preschoolers means giving adult food in smaller portions." This leads to two errors: (1).' },
                { id: 'c', prompt: 'An APPLY level question: A 3-year-old child\'s daily menu provides: Cereals 80g, Pulses 20g, Milk 400ml, Roots/tubers 30g, Green leafy vegetables 20g, Other.', answer: 'Correct answer: Deficiencies: Cereals -20g (need 60g, have 80g?',
                  options: ['Correct answer: Deficiencies: Cereals -20g (need 60g, have 80g?', 'balanced diet for preschoolers means giving adult food in smaller portions', 'the child eats little', '"balanced diet for preschoolers means giving adult food in smaller portions'],
                  hint: 'If stuck, revisit c11_hs_cbse_08_003 (ICMR RDA for infants) to practice table reading, and.',
                  misconception: 'Students often believe that "balanced diet for preschoolers means giving adult food in smaller portions." This leads to two errors: (1).' }
          ],
            remediations: { 'balanced-diet-for-preschoolers-means': { steps: ['If a student shows this misconception: (1) Have them calculate the per-kg energy requirement for a 12kg 3-year-old.', '(2) Ask them to plan a day\'s menu using ONLY Table 5 quantities for 4-6 years, then compare with a "small adult.', '(3) Highlight that Table 5 milk quantity (500ml) is the same for both age groups while cereals double — this disproves.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_009', difficulty: 'standard',
          question: 'Planning balanced meals for preschool children (1-6 years) using ICMR.',
          hint: 'Revisit c11_hs_cbse_08_008 (Nutritional Requirements of Preschool Children) to see how.',
          misconception: 'Students believe the ICMR food group quantities (e.g., 120 g cereals) are the cooked/served weights on the plate.',
          parts: [
                { id: 'a', prompt: 'A 3-year-old child\'s daily menu includes: Breakfast — 1 chapati (30 g wheat flour) + 100 ml milk; Lunch — 50 g rice + 20 g dal + 50 g potato; Evening snack — 1.', answer: 'Cereals: 30+50+10+30 = 120 g (required 60 g)',
                  options: ['Cereals: 30+50+10+30 = 120 g (required 60 g)', 'the ICMR food group quantities (e'],
                  hint: 'Revisit c11_hs_cbse_08_008 (Nutritional Requirements of Preschool Children) to see how RDA values.',
                  misconception: 'Students believe the ICMR food group quantities (e.g., 120 g cereals) are the cooked/served weights on the plate.' }
          ],
            remediations: { 'the-icmr-food-group-quantities': { steps: ['Show the student a kitchen demo — weigh 30 g raw wheat flour, make one chapati, weigh the cooked chapati (~45 g).', 'Have them re-calculate the 4-year-old menu from Worked Example 1 using raw weights for each ingredient.', 'Ask them to explain in their own words why ICMR uses raw weights (standardisation across recipes, water absorption.', 'Give a new problem where they must convert a cooked menu (e.g., "1 bowl cooked rice") back to raw weight for table.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_010', difficulty: 'standard',
          question: 'Nutritional requirements of school-age children (7–12 years) are the specific.',
          hint: 'If stuck, revisit c11_hs_cbse_08_009 (Planning Balanced Meals for Preschool Children) and.',
          misconception: 'Students often treat the school‑age RDA table as a simple upward extension of preschool values, assuming all nutrients.',
          parts: [
                { id: 'a', prompt: 'State the ICMR (2010) Recommended Dietary Allowance for energy and protein for a 9‑year‑old boy and a 10‑year‑old girl.', answer: 'For a 9‑year‑old boy (7–9 years group): Energy = 1690 kcal, Protein = 29.5 g',
                  options: ['For a 9‑year‑old boy (7–9 years group): Energy = 1690 kcal, Protein = 29.5 g', 'All nutrient needs increase by about 30% from 7–9 to 10–12 years'],
                  hint: 'If stuck, revisit c11_hs_cbse_08_009 (Planning Balanced Meals for Preschool Children) and practice.',
                  misconception: 'Students often treat the school‑age RDA table as a simple upward extension of preschool values, assuming all nutrients increase uniformly.' }
          ],
            remediations: { 'students-often-treat-the-school': { steps: ['Have the student create a two‑column table: left column = nutrient, right column = % increase from 7–9 to 10–12 for.', 'Ask them to highlight nutrients with >50% increase (iron for girls).', 'Link each highlighted nutrient to its physiological driver (menarche → iron; peak bone mass → calcium).', 'Finally, give a mini‑case: "A 11‑year‑old girl with heavy periods — which RDA value must be prioritised?" This forces.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_011', difficulty: 'standard',
          question: 'Health and nutrition issues in school-age children (7-12 years) refer to the.',
          hint: 'Review c11_hs_cbse_08_010 (Nutritional Requirements of School-Age Children) focusing.',
          misconception: 'Students believe obesity and undernutrition are mutually exclusive categories—either a child is overfed.',
          parts: [
                { id: 'a', prompt: 'A 10-year-old boy weighs 42 kg and is 138 cm tall. Using the BMI-for-age formula (weight in kg / height in m²), calculate his BMI and state whether this value.', answer: 'BMI = 42 / (1.38)² = 42 / 1.9044 = 22.05 kg/m²',
                  options: ['BMI = 42 / (1.38)² = 42 / 1.9044 = 22.05 kg/m²', 'hidden hunger'],
                  hint: 'Review c11_hs_cbse_08_010 (Nutritional Requirements of School-Age Children) focusing on Table 7.',
                  misconception: 'Students believe obesity and undernutrition are mutually exclusive categories—either a child is overfed or underfed—failing to recognise.' }
          ],
            remediations: { 'obesity-and-undernutrition-are-mutually': { steps: ['If the student holds this misconception: Step 1—Show WHO growth charts with four quadrants (stunted/non-stunted.', 'Step 2—Explain **thrifty phenotype hypothesis** simply: "When a fetus/baby experiences undernutrition, the body.', 'Later, when high-calorie food is available, this \'thrifty\' metabolism drives rapid fat gain." Step 3—Analyse.', 'Discuss why *same* food environment (cheap oil, refined carbs) harms both differently.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_08_012', difficulty: 'standard',
          question: 'Feeding children with special needs refers to the systematic adaptation of food.',
          hint: 'If stuck, revisit c11_hs_cbse_08_003 (ICMR RDAs for infants) and c11_hs_cbse_08_005.',
          misconception: 'Students often believe "special diet for special needs" means a completely different set of foods (e.g., only.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Feeding children with special needs refers to the systematic adaptation of food textures,',
                  options: ['Feeding children with special needs refers to the systematic adaptation of food textures,', 'Nutrition is the science of food and its relationship to health, encompassing the', 'Growth and developmental milestones in infancy (0-12 months) refer to the sequential,', 'The ICMR Recommended Dietary Allowances (RDAs) for infants are scientifically derived'],
                  hint: 'If stuck, revisit c11_hs_cbse_08_003 (ICMR RDAs for infants) and c11_hs_cbse_08_005 (Complementary.',
                  misconception: 'Students often believe "special diet for special needs" means a completely different set of foods (e.g., only commercial formulas,.' }
          ],
            remediations: { 'special-diet-for-special-needs': { steps: ['If a student gives a "special formula" answer: (1) Ask them to list the ingredients of a typical commercial pediatric.', '(2) Ask them to match each component to a home food source (carbohydrate → rice/ragi/wheat; protein → dal/milk/egg; fat.', '(3) Have them calculate the cost per kcal of formula vs.', 'home-prepared thickened khichdi with ghee.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
