import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch07_p1: SimDef = {
    id: 'v3_c12_hs_ch07_p1',
    title: 'Human Development · Part 1/2',
    subtitle: 'Declining joints, growing wisdom — both are development',
    classLevel: 12, subject: 'home_science', topic: 'Human Development · Part 1/2',
    chapters: ['c12_hs_ch07'],
    nodeIds: ['c12_hs_cbse_07_001', 'c12_hs_cbse_07_002', 'c12_hs_cbse_07_003', 'c12_hs_cbse_07_004', 'c12_hs_cbse_07_005', 'c12_hs_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Life-span analyst', intro: 'A teenager gaining height and a grandmother gaining judgement are doing the same thing: developing.', goal: 'Apply the life-span perspective — multidirectionality, plasticity and context — across the whole of a life.' },
    discovery: {
        question: 'An 82-year-old with arthritis is \'just declining now,\' the family says — yet he settles disputes no one else can. What does the life-span lens see that they don\'t?',
        options: ['Gains and losses coexist at every age — plasticity means capacity can still grow while joints decline; development is lifelong, not childhood-only', 'He\'s exceptional', 'Wisdom isn\'t development', 'Arthritis stops growth'],
        answer: 'Gains and losses coexist at every age — plasticity means capacity can still grow while joints decline; development is lifelong, not childhood-only',
        hook: 'But plasticity isn\'t a free pass — sensitive windows close and early deficits cascade into compounded disadvantage. \'We can fix it later\' is why early-childhood investment exists: the returns are highest exactly where the neglect is cheapest to prevent.',
    },
    teaching: [
        { title: 'Human Development: Concept and Definition Across the Lifespan', text: 'Human development is the lifelong, multidimensional process of quantitative and qualitative changes in physical, cognitive, and socio-emotional domains that occurs from conception to death, shaped.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reframe a life as lifelong development: separate growth, development and maturation, map gains and losses onto one athlete\'s trade-offs, and test the \'fix it later\' argument against sensitive periods.',
        labels: ['Human Development: Concept', 'Principles of Growth', 'Heredity and Environment: Interaction', 'Prenatal Development: Stages from', 'Birth Process and Neonatal', 'Infancy: Physical, Motor'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_001', title: 'Human Development: Concept and Definition Across the Lifespan',
          caseStudy: { intro: 'Begin with a relatable scenario: "Your 14-year-old cousin has grown 10 cm in six months but still struggles with emotional regulation.',
            decisions: [{ prompt: 'Define human development in one sentence. How does it differ from \'growth\'? Give one example of growth that is NOT development.', options: [
                { text: 'Correct answer: Human development is the lifelong, multidimensional process of', outcome: 'Correct answer: Human development is the lifelong, multidimensional process of quantitative and.' },
                { text: 'growth and development are the same', outcome: 'Not quite — Students equate \'development\' with \'growth\' and believe development ends at adolescence.', reveals: 'students-equate-development-with-growth' },
                { text: 'development stops at adulthood', outcome: 'Not quite — Students equate \'development\' with \'growth\' and believe development ends at adolescence.', reveals: 'students-equate-development-with-growth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_002', title: 'Principles of Growth and Development: Directionality and Individuality',
          caseStudy: { intro: 'Imagine you are observing two 6-month-old infants at an anganwadi: Baby A rolls over confidently but cannot sit without support, while Baby B sits briefly with.',
            decisions: [{ prompt: 'State the two directionality principles of human development and give one observable example of each in infancy.', options: [
                { text: 'The two directionality principles are: (1) Cephalocaudal', outcome: 'The two directionality principles are: (1) Cephalocaudal — development proceeds from head to tail.' },
                { text: 'babies walk before they sit', outcome: 'Not quite — Students often believe that "individuality means there is no normal sequence" and "directionality.', reveals: 'individuality-means-there-is-no' },
                { text: 'proximodistal means head to toe', outcome: 'Not quite — Students often believe that "individuality means there is no normal sequence" and "directionality.', reveals: 'individuality-means-there-is-no' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_003', title: 'Heredity and Environment: Interaction in Development',
          caseStudy: { intro: 'Imagine two sisters, Meera and Priya, born to the same parents in a Delhi slum.',
            decisions: [{ prompt: 'Define "reaction range" in the context of heredity-environment interaction.', options: [
                { text: 'Reaction range is the span of possible phenotypic expressions of a given genotype across', outcome: 'Reaction range is the span of possible phenotypic expressions of a given genotype across all.' },
                { text: 'heritability = genetic determination of an individual\'s trait', outcome: 'Not quite — Students often believe "heritability = genetic determination of an individual\'s trait." For.', reveals: 'heritability-genetic-determination-of-an' },
                { text: '"heritability = genetic determination of an individual\'s trait', outcome: 'Not quite — Students often believe "heritability = genetic determination of an individual\'s trait." For.', reveals: 'heritability-genetic-determination-of-an' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_004', title: 'Prenatal Development: Stages from Conception to Birth',
          caseStudy: { intro: 'Imagine a couple who just learned they are pregnant at 4 weeks — they want to know what is happening inside the womb *right now* and what they should avoid.',
            decisions: [{ prompt: 'What are the three stages of prenatal development in correct chronological order, and what is the approximate week range for each stage?', options: [
                { text: 'Correct answer: (1) Germinal stage: fertilisation to end of week 2', outcome: 'Correct answer: (1) Germinal stage: fertilisation to end of week 2; (2) Embryonic stage: week 3.' },
                { text: 'first trimester, second trimester, third trimester', outcome: 'Not quite — Students often believe: "The embryonic stage and fetal stage are the same thing — just different.', reveals: 'the-embryonic-stage-and-fetal' },
                { text: 'They write', outcome: 'Not quite — Students often believe: "The embryonic stage and fetal stage are the same thing — just different.', reveals: 'the-embryonic-stage-and-fetal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_005', title: 'Birth Process and Neonatal Assessment: Apgar Score',
          caseStudy: { intro: 'Imagine you are a student nurse in a delivery room: a baby is born, the clock starts, and you have 60 seconds to tell the team whether this newborn is “pink.',
            decisions: [{ prompt: '**REMEMBER:** Write the full expansion of the acronym APGAR and the maximum possible total score.', options: [
                { text: '**Correct answer:** A = Appearance (skin color), P = Pulse (heart rate), G = Grimace', outcome: '**Correct answer:** A = Appearance (skin color), P = Pulse (heart rate), G = Grimace (reflex.' },
                { text: 'Attitude', outcome: 'Not quite — Students frequently believe **“Apgar score predicts the baby’s future intelligence.', reveals: 'students-frequently-believe-apgar-score' },
                { text: 'Gestation', outcome: 'Not quite — Students frequently believe **“Apgar score predicts the baby’s future intelligence.', reveals: 'students-frequently-believe-apgar-score' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_006', title: 'Infancy: Physical, Motor and Sensory Development',
          caseStudy: { intro: 'Imagine you\'re observing a 4-month-old who lifts her head during tummy time but doesn\'t yet reach for a dangling toy. You wonder: Is this typical?',
            decisions: [{ prompt: 'A newborn exhibits the Moro reflex when startled by a loud noise.', options: [
                { text: 'The Moro reflex typically integrates (disappears) by 4-6 months', outcome: 'The Moro reflex typically integrates (disappears) by 4-6 months.' },
                { text: 'disappears at birth', outcome: 'Not quite — Students memorize milestone ages as rigid deadlines (e.g., "sitting at 6 months") and treat them.', reveals: 'students-memorize-milestone-ages-as' },
                { text: 'persists normally till 12 months', outcome: 'Not quite — Students memorize milestone ages as rigid deadlines (e.g., "sitting at 6 months") and treat them.', reveals: 'students-memorize-milestone-ages-as' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Human Development · Part 1/2', spots: [
            { id: 's1', label: 'Human Development Concept and Definition Across the Lifespan', prompt: 'Which idea is this? — Human development is the lifelong, multidimensional process of quantitative and.', answer: 'Human Development Concept and Definition Across the Lifespan', options: ['Human Development Concept and Definition Across the Lifespan', 'Heredity and Environment Interaction in Development', 'Prenatal Development Stages from Conception to Birth', 'Birth Process and Neonatal Assessment Apgar Score'] },
            { id: 's2', label: 'Heredity and Environment Interaction in Development', prompt: 'Which idea is this? — Heredity-environment interaction refers to the dynamic, bidirectional process where.', answer: 'Heredity and Environment Interaction in Development', options: ['Heredity and Environment Interaction in Development', 'Human Development Concept and Definition Across the Lifespan', 'Prenatal Development Stages from Conception to Birth', 'Birth Process and Neonatal Assessment Apgar Score'] },
            { id: 's3', label: 'Prenatal Development Stages from Conception to Birth', prompt: 'Which idea is this? — Prenatal development is the sequential process of growth and differentiation from.', answer: 'Prenatal Development Stages from Conception to Birth', options: ['Prenatal Development Stages from Conception to Birth', 'Human Development Concept and Definition Across the Lifespan', 'Heredity and Environment Interaction in Development', 'Birth Process and Neonatal Assessment Apgar Score'] },
            { id: 's4', label: 'Birth Process and Neonatal Assessment Apgar Score', prompt: 'Which idea is this? — The birth process is the sequence of physiological events — labor (dilation, expulsion.', answer: 'Birth Process and Neonatal Assessment Apgar Score', options: ['Birth Process and Neonatal Assessment Apgar Score', 'Human Development Concept and Definition Across the Lifespan', 'Heredity and Environment Interaction in Development', 'Prenatal Development Stages from Conception to Birth'] },
            { id: 's5', label: 'Infancy Physical Motor and Sensory Development', prompt: 'Which idea is this? — Infancy (0-12 months) is the period of most rapid physical growth and neurological.', answer: 'Infancy Physical Motor and Sensory Development', options: ['Infancy Physical Motor and Sensory Development', 'Human Development Concept and Definition Across the Lifespan', 'Heredity and Environment Interaction in Development', 'Prenatal Development Stages from Conception to Birth'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A playschool coordinator designs a toddler motor-skills hour that opens with bead-threading \'because it\'s quiet,\' ends with running, and publishes a weekly \'fastest developer\' chart ranking the children.',
            decisions: [{ prompt: 'Which development principles does the design violate?', options: [
                { text: 'Both — the sequence runs backwards: proximodistal and cephalocaudal order says whole-body and arm control come before finger work, so gross motor should precede beads; and the ranking chart violates individuality — children share the sequence but not the timetable.', outcome: 'The chapter separates what directionality fixes (order of skills) from what individuality permits (pace of arriving); the session inverts the first and denies the second.' },
                { text: 'Only the chart is wrong — starting with beads is fine because fine motor needs the freshest attention.', outcome: 'Attention isn\'t the constraint the principles describe — distal control matures after proximal; demanding precise finger work before the large-muscle foundation asks for a skill that isn\'t built yet.', reveals: 'any-order-works' },
                { text: 'Only the ordering is wrong — the chart is motivating because kids compete.', outcome: 'Competition presumes a shared timetable, which individuality denies — a \'fastest developer\' chart ranks children against a schedule that was never theirs, misreading normal variation as speed.', reveals: 'ranking-is-motivation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now see development as a whole-life balance sheet — gains and losses at every age, and why early investment still pays best.',
            decisions: [{ prompt: 'What comes next? Human Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_001', difficulty: 'standard',
          question: 'Human development is the lifelong, multidimensional process of quantitative and.',
          hint: 'If confused, revisit c11_psy_cbse_03_001 (Growth vs Development vs Maturation) and create.',
          misconception: 'Students equate \'development\' with \'growth\' and believe development ends at adolescence.',
          parts: [
                { id: 'a', prompt: 'Define human development in one sentence. How does it differ from \'growth\'? Give one example of growth that is NOT development.', answer: 'Correct answer: Human development is the lifelong, multidimensional process of',
                  options: ['Correct answer: Human development is the lifelong, multidimensional process of', 'growth and development are the same', 'development stops at adulthood', 'development is unidirectional'],
                  hint: 'If confused, revisit c11_psy_cbse_03_001 (Growth vs Development vs Maturation) and create.',
                  misconception: 'Students equate \'development\' with \'growth\' and believe development ends at adolescence.' },
                { id: 'b', prompt: 'Case: Riya, 16, trains 4 hours daily for national-level badminton.', answer: 'Correct mapping: Physical',
                  options: ['Correct mapping: Physical', 'physical domain is only positive', 'injuries mean development stopped', 'development is unidirectional'],
                  hint: 'If confused, revisit c11_psy_cbse_03_001 (Growth vs Development vs Maturation) and create.',
                  misconception: 'Students equate \'development\' with \'growth\' and believe development ends at adolescence.' },
                { id: 'c', prompt: 'Compare the \'traditional view\' of development (childhood-focused, unidirectional) with the \'life-span perspective\' (Baltes) on three dimensions: (a) age range.', answer: 'Correct comparison: (a) Traditional: birth to adolescence',
                  options: ['Correct comparison: (a) Traditional: birth to adolescence', 'old age included', 'development is unidirectional', 'only "old age included" without multidirectionality/context'],
                  hint: 'If confused, revisit c11_psy_cbse_03_001 (Growth vs Development vs Maturation) and create.',
                  misconception: 'Students equate \'development\' with \'growth\' and believe development ends at adolescence.' }
          ],
            remediations: { 'students-equate-development-with-growth': { steps: ['Revisit c11_psy_cbse_03_001 (Meaning of Development: Growth, Maturation and Evolution) — create a three-row table.', 'Revisit c11_psy_cbse_03_002 (Life-Span Perspective on Development: Continuous Process) — list Baltes\' 7 principles; for.', 'Take a family member (grandparent, parent, sibling) and map their current changes across physical, cognitive.', 'Re-attempt Diagnostic Questions 2 and 5. If still stuck, discuss with teacher using the phrase "multidirectionality".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate \'development\' with \'growth\' and believe development ends at adolescence.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since development is lifelong, early childhood interventions are overrated — we can always fix deficits later." Use the concepts.', answer: 'Correct critique: The statement misuses plasticity',
                  options: ['Correct critique: The statement misuses plasticity', 'plasticity means we can fix anything anytime', 'early childhood is the only thing that matters', 'development is unidirectional'],
                  hint: 'If confused, revisit c11_psy_cbse_03_001 (Growth vs Development vs Maturation) and create.',
                  misconception: 'Students equate \'development\' with \'growth\' and believe development ends at adolescence.' },
                { id: 'b', prompt: 'Design a 3-question interview protocol to assess whether a 45-year-old adult perceives their own development through a traditional (childhood-only) lens or.', answer: 'Good protocol example: Q1: "How have you changed in the last 5 years',
                  options: ['Good protocol example: Q1: "How have you changed in the last 5 years', 'development is unidirectional'],
                  hint: 'If confused, revisit c11_psy_cbse_03_001 (Growth vs Development vs Maturation) and create.',
                  misconception: 'Students equate \'development\' with \'growth\' and believe development ends at adolescence.' }
          ],
            remediations: { 'students-equate-development-with-growth': { steps: ['Revisit c11_psy_cbse_03_001 (Meaning of Development: Growth, Maturation and Evolution) — create a three-row table.', 'Revisit c11_psy_cbse_03_002 (Life-Span Perspective on Development: Continuous Process) — list Baltes\' 7 principles; for.', 'Take a family member (grandparent, parent, sibling) and map their current changes across physical, cognitive.', 'Re-attempt Diagnostic Questions 2 and 5. If still stuck, discuss with teacher using the phrase "multidirectionality".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_002', difficulty: 'standard',
          question: 'The principles of directionality and individuality are fundamental laws.',
          hint: 'Revisit c11_hs_cbse_08_002 (infancy milestones) and c11_psy_cbse_03_004 (reflexes.',
          misconception: 'Students often believe that "individuality means there is no normal sequence" and "directionality means every child.',
          parts: [
                { id: 'a', prompt: 'State the two directionality principles of human development and give one observable example of each in infancy.', answer: 'The two directionality principles are: (1) Cephalocaudal',
                  options: ['The two directionality principles are: (1) Cephalocaudal', 'babies walk before they sit', 'proximodistal means head to toe', 'individuality means there is no normal sequence'],
                  hint: 'Revisit c11_hs_cbse_08_002 (infancy milestones) and c11_psy_cbse_03_004 (reflexes to voluntary.',
                  misconception: 'Students often believe that "individuality means there is no normal sequence" and "directionality means every child hits milestones at the.' },
                { id: 'b', prompt: 'A 5-month-old infant in your observation holds a rattle placed in her hand but cannot reach for it when it is kept 10 cm away.', answer: 'This is expected',
                  options: ['This is expected', 'delayed fine motor', 'it\'s fine, all babies differ', 'individuality means there is no normal sequence'],
                  hint: 'Revisit c11_hs_cbse_08_002 (infancy milestones) and c11_psy_cbse_03_004 (reflexes to voluntary.',
                  misconception: 'Students often believe that "individuality means there is no normal sequence" and "directionality means every child hits milestones at the.' },
                { id: 'c', prompt: 'Compare and contrast how the principle of directionality and the principle of individuality would guide a teacher planning a motor-skills activity for.', answer: 'Directionality guides the *design* of the activity sequence: tasks must follow',
                  options: ['Directionality guides the *design* of the activity sequence: tasks must follow', '3-year-olds do X, 4-year-olds do Y', 'free play', 'individuality means there is no normal sequence'],
                  hint: 'Revisit c11_hs_cbse_08_002 (infancy milestones) and c11_psy_cbse_03_004 (reflexes to voluntary.',
                  misconception: 'Students often believe that "individuality means there is no normal sequence" and "directionality means every child hits milestones at the.' }
          ],
            remediations: { 'individuality-means-there-is-no': { steps: ['If a student conflates the two principles or treats them as contradictory: Step 1 — Have them physically enact the.', 'Step 2 — Give three infant case cards (ages 4, 7, 10 months) with motor skills listed.', 'Ask: "Which skills follow cephalocaudal?', 'Which child is \'ahead\'?" Step 3 — Reveal all three are normal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_003', difficulty: 'standard',
          question: 'Heredity-environment interaction refers to the dynamic, bidirectional process.',
          hint: 'If stuck, revisit c10_bio_cbse_04_006 (Acquired vs Inherited Traits) and.',
          misconception: 'Students often believe "heritability = genetic determination of an individual\'s trait." For example, they write: "Since.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Heredity-environment interaction refers to the dynamic, bidirectional process where',
                  options: ['Heredity-environment interaction refers to the dynamic, bidirectional process where', 'Human development is the lifelong, multidimensional process of quantitative and', 'The principles of directionality and individuality are fundamental laws governing human', 'Prenatal development is the sequential process of growth and differentiation from'],
                  hint: 'If stuck, revisit c10_bio_cbse_04_006 (Acquired vs Inherited Traits) and c11_bio_cbse_10_008.',
                  misconception: 'Students often believe "heritability = genetic determination of an individual\'s trait." For example, they write: "Since height heritability.' }
          ],
            remediations: { 'heritability-genetic-determination-of-an': { steps: ['Revisit c10_bio_cbse_04_006 (Acquired vs Inherited Traits) to re-establish that only genetic information is inherited.', 'Re-read c11_psy_cbse_03_003 (Prenatal Development) focusing on how teratogens show environment altering genetic.', 'Complete this re-diagnostic: "Explain why heritability of skin colour is near 1.0 in Norway but much lower in India.".', 'Watch the 8-min video "Heritability ≠ Hereditary" (search on DIKSHA portal) and write a 100-word correction of the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_004', difficulty: 'standard',
          question: 'Prenatal development is the sequential process of growth and differentiation.',
          hint: 'If stuck on germ layers or gastrulation, revisit c11_bio_cbse_10_006/c11_psy_cbse_03_003.',
          misconception: 'Students often believe: "The embryonic stage and fetal stage are the same thing — just different names for \'baby.',
          parts: [
                { id: 'a', prompt: 'What are the three stages of prenatal development in correct chronological order, and what is the approximate week range for each stage?', answer: 'Correct answer: (1) Germinal stage: fertilisation to end of week 2',
                  options: ['Correct answer: (1) Germinal stage: fertilisation to end of week 2', 'first trimester, second trimester, third trimester', 'They write'],
                  hint: 'If stuck on germ layers or gastrulation, revisit c11_bio_cbse_10_006/c11_psy_cbse_03_003.',
                  misconception: 'Students often believe: "The embryonic stage and fetal stage are the same thing — just different names for \'baby growing\'." They write.' }
          ],
            remediations: { 'the-embryonic-stage-and-fetal': { steps: ['If the student cannot distinguish embryonic vs.', 'fetal stages: (1) Have them draw a 2-column table: "Embryonic (weeks 3–8)" vs.', '(2) Give them 6 milestone cards: "neural tube closes", "heart beats", "surfactant produced", "limb buds appear", "rapid.', '(3) Ask them to sort each card into the correct column *and* justify why.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_005', difficulty: 'standard',
          question: 'The birth process is the sequence of physiological events — labor (dilation.',
          hint: 'If the physiological basis of the Apgar criteria feels abstract, revisit.',
          misconception: 'Students frequently believe **“Apgar score predicts the baby’s future intelligence or disability.”** They write.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The birth process is the sequence of physiological events',
                  options: ['The birth process is the sequence of physiological events', 'Human development is the lifelong, multidimensional process of quantitative and', 'The principles of directionality and individuality are fundamental laws governing human', 'Heredity-environment interaction refers to the dynamic, bidirectional process where'],
                  hint: 'If the physiological basis of the Apgar criteria feels abstract, revisit **c11_bio_cbse_14_001**.',
                  misconception: 'Students frequently believe **“Apgar score predicts the baby’s future intelligence or disability.”** They write in exams: “Low Apgar score.' }
          ],
            remediations: { 'students-frequently-believe-apgar-score': { steps: ['If a student cannot map observations to scores: 1.', '**Re‑watch** the 2‑minute video “Apgar Scoring Demonstration” (NCERT e‑pathshala) pausing at each criterion.', '**Create** a personal table: five rows (criteria), three columns (0,1,2) with **exact wording** from the rubric (e.g.', '**Practice** with three fresh vignettes from the CBSE sample paper (2023‑24) — score each, then check against the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_006', difficulty: 'standard',
          question: 'Infancy (0-12 months) is the period of most rapid physical growth and.',
          hint: 'Revisit c11_hs_cbse_08_002 milestone chart and c11_psy_cbse_03_004 reflex integration.',
          misconception: 'Students memorize milestone ages as rigid deadlines (e.g., "sitting at 6 months") and treat them as independent.',
          parts: [
                { id: 'a', prompt: 'A newborn exhibits the Moro reflex when startled by a loud noise.', answer: 'The Moro reflex typically integrates (disappears) by 4-6 months',
                  options: ['The Moro reflex typically integrates (disappears) by 4-6 months', 'disappears at birth', 'persists normally till 12 months'],
                  hint: 'Revisit c11_hs_cbse_08_002 milestone chart and c11_psy_cbse_03_004 reflex integration timeline.',
                  misconception: 'Students memorize milestone ages as rigid deadlines (e.g., "sitting at 6 months") and treat them as independent checkboxes.' },
                { id: 'b', prompt: 'Compare the developmental trajectory of vision versus hearing in infancy.', answer: 'Hearing is functional at birth (fetus hears in utero)',
                  options: ['Hearing is functional at birth (fetus hears in utero)', 'vision develops first'],
                  hint: 'Revisit c11_hs_cbse_08_002 milestone chart and c11_psy_cbse_03_004 reflex integration timeline.',
                  misconception: 'Students memorize milestone ages as rigid deadlines (e.g., "sitting at 6 months") and treat them as independent checkboxes.' }
          ],
            remediations: { 'students-memorize-milestone-ages-as': { steps: ['If a student treats milestones as isolated age-linked facts: (1) Have them draw a flowchart linking each motor.', '(2) Give 3 case vignettes where age is typical but quality is atypical (e.g., 8-month-old who sits but only in W-sit.', '(3) Revisit c11_hs_cbse_08_002 (Growth and Developmental Milestones in Infancy) and c11_psy_cbse_03_004 (Neonate and.', 'Re-diagnose using DIAGNOSTIC_QUESTION_3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
