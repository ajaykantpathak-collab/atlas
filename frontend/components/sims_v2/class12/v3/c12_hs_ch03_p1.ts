import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch03_p1: SimDef = {
    id: 'v3_c12_hs_ch03_p1',
    title: 'Human Development and Family Studies · Part 1/2',
    subtitle: 'Head before sitting, palm before pinch — the order is law',
    classLevel: 12, subject: 'home_science', topic: 'Human Development and Family Studies · Part 1/2',
    chapters: ['c12_hs_ch03'],
    nodeIds: ['c12_hs_cbse_03_001', 'c12_hs_cbse_03_002', 'c12_hs_cbse_03_003', 'c12_hs_cbse_03_004', 'c12_hs_cbse_03_005', 'c12_hs_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Development tracker', intro: 'Every child climbs the same staircase of abilities — just at their own speed. Learn to read the staircase.', goal: 'Distinguish growth from development and apply the directional principles behind milestone sequences.' },
    discovery: {
        question: 'A baby steadies her head months before she can sit, and grasps with her whole palm long before a pincer grip. Why is the order never reversed?',
        options: ['Lawful direction — development runs head-to-tail and centre-to-fingertip; the sequence is universal even though each child\'s pace differs', 'Babies just learn slowly', 'Practice builds it', 'It\'s random timing'],
        answer: 'Lawful direction — development runs head-to-tail and centre-to-fingertip; the sequence is universal even though each child\'s pace differs',
        hook: 'Growth is what you can measure; development is what emerges. And a child who skips crawling hasn\'t broken the rule — the direction (head before trunk before legs) still held; the pathway varied. Sequence is law; timing is personal.',
    },
    teaching: [
        { title: 'Human Development: Definition and Key Principles of Growth and Development', text: 'Human development is the lifelong, multidimensional process of quantitative growth (measurable physical changes like height, weight, organ size) and qualitative development (progressive acquisition.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch milestones like a scientist: separate measurable growth from emerging skill, predict which ability must come before which, and calm a parent whose \'late\' crawler is right on time.',
        labels: ['Human Development: Definition', 'Stages of Human Development', 'Theories of Development: Piaget\'s', 'Theories of Development: Erikson\'s', 'Family: Definition, Types', 'Family Life Cycle Stages'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_001', title: 'Human Development: Definition and Key Principles of Growth and Development',
          caseStudy: { intro: 'Imagine you are observing a 6-month-old infant who can hold her head steady but cannot yet sit without support, while her 12-month-old brother is pulling.',
            decisions: [{ prompt: 'Define "growth" and "development" in the context of human development.', options: [
                { text: 'Growth refers to quantitative, measurable physical changes (e.g., increase in height from', outcome: 'Growth refers to quantitative, measurable physical changes (e.g., increase in height from 90 cm.' },
                { text: 'growth and development mean the same thing', outcome: 'Not quite — Students often believe **"growth and development mean the same thing"** and use them.', reveals: 'growth-and-development-mean-the' },
                { text: 'The child\'s growth is seen in his ability to speak in sentences', outcome: 'Not quite — Students often believe **"growth and development mean the same thing"** and use them.', reveals: 'growth-and-development-mean-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_002', title: 'Stages of Human Development: Prenatal to Late Adulthood',
          caseStudy: { intro: 'Imagine you are a counsellor at a community health centre. A mother brings her 3-year-old who isn\'t speaking in sentences yet, and a 70-year-old grandfather.',
            decisions: [{ prompt: 'List the eight stages of human development in correct sequential order from conception to late adulthood, giving the approximate age range.', options: [
                { text: 'Correct sequence: (1) Prenatal (conception to birth), (2) Infancy (0–2 years), (3) Early', outcome: 'Correct sequence: (1) Prenatal (conception to birth), (2) Infancy (0–2 years), (3) Early Childhood.' },
                { text: 'old age', outcome: 'Not quite — Students treat developmental stages as rigid "boxes" with fixed boundaries (e.g., "At exactly 12.', reveals: 'students-treat-developmental-stages-as' },
                { text: 'late adulthood', outcome: 'Not quite — Students treat developmental stages as rigid "boxes" with fixed boundaries (e.g., "At exactly 12.', reveals: 'students-treat-developmental-stages-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_003', title: 'Theories of Development: Piaget\'s Cognitive Development Theory',
          caseStudy: { intro: 'Imagine a 3-year-old insisting the moon "follows" her car, while her 10-year-old brother explains it\'s an optical illusion. Why such different explanations?',
            decisions: [{ prompt: 'A 4-year-old watches her mother pour juice from a short wide glass into a tall thin glass and cries, "You gave me less!" Which Piagetian.', options: [
                { text: 'The child lacks conservation of liquid quantity, a hallmark of the preoperational stage', outcome: 'The child lacks conservation of liquid quantity, a hallmark of the preoperational stage (ages 2–7).' },
                { text: 'sensorimotor stage', outcome: 'Not quite — Students often think "stages = ages" rigidly, believing a 7-year-old is suddenly concrete.', reveals: 'stages-ages-rigidly' },
                { text: 'egocentrism', outcome: 'Not quite — Students often think "stages = ages" rigidly, believing a 7-year-old is suddenly concrete.', reveals: 'stages-ages-rigidly' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_004', title: 'Theories of Development: Erikson\'s Psychosocial Stages',
          caseStudy: { intro: 'Imagine a 14-year-old student, Rohan, who suddenly refuses to participate in family traditions, experiments with drastically different clothing styles, and.',
            decisions: [{ prompt: 'A REMEMBER level question: List Erikson\'s eight psychosocial stages in correct sequential order with their corresponding age ranges.', options: [
                { text: 'Correct sequence: 1) Trust vs', outcome: 'Correct sequence: 1) Trust vs. Mistrust (0-1 yr) → Hope; 2) Autonomy vs.' },
                { text: 'from autonomy to exercise', outcome: 'Not quite — Students consistently confuse Erikson\'s "Industry vs. Inferiority" (Stage 4, ages 6-12) with.', reveals: 'students-consistently-confuse-erikson-s' },
                { text: 'in initiative)', outcome: 'Not quite — Students consistently confuse Erikson\'s "Industry vs. Inferiority" (Stage 4, ages 6-12) with.', reveals: 'students-consistently-confuse-erikson-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_005', title: 'Family: Definition, Types and Functions in Modern Society',
          caseStudy: { intro: 'Imagine you are a social worker visiting a household in urban Delhi: a grandmother, her divorced daughter, and two grandchildren live together, while the.',
            decisions: [{ prompt: 'Define "family" in one sentence using the three essential criteria from the sociological perspective (membership, residence, roles).', options: [
                { text: 'A family is a socially recognized group bound by marriage, blood, or adoption, sharing a', outcome: 'A family is a socially recognized group bound by marriage, blood, or adoption, sharing a common.' },
                { text: 'people living together', outcome: 'Not quite — Students equate "joint family" with "any household having grandparents" and "nuclear family" with.', reveals: 'students-equate-joint-family-with' },
                { text: 'household', outcome: 'Not quite — Students equate "joint family" with "any household having grandparents" and "nuclear family" with.', reveals: 'students-equate-joint-family-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_006', title: 'Family Life Cycle Stages and Developmental Tasks',
          caseStudy: { intro: 'Imagine a young couple, Priya and Arjun, just married and living in a rented flat in Bengaluru.',
            decisions: [{ prompt: 'List the 8 stages of Duvall\'s family life cycle in correct chronological order from marriage to old age.', options: [
                { text: 'Correct order: 1', outcome: 'Correct order: 1. Beginning Family (married couple, no children), 2.' },
                { text: 'you must be in Launching stage by age 50', outcome: 'Not quite — Students believe the family life cycle is a rigid *timetable* (e.g., "you must be in Launching.', reveals: 'the-family-life-cycle-is' },
                { text: 'the family life cycle is a rigid *timetable* (e', outcome: 'Not quite — Students believe the family life cycle is a rigid *timetable* (e.g., "you must be in Launching.', reveals: 'the-family-life-cycle-is' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Human Development and Family Studies · Part 1/2', spots: [
            { id: 's1', label: 'Stages of Human Development Prenatal to Late Adulthood', prompt: 'Which idea is this? — Human development stages refer to the sequential, age-related phases from conception.', answer: 'Stages of Human Development Prenatal to Late Adulthood', options: ['Stages of Human Development Prenatal to Late Adulthood', 'Theories of Development Piagets Cognitive Development Theory', 'Theories of Development Eriksons Psychosocial Stages', 'Family Definition Types and Functions in Modern Society'] },
            { id: 's2', label: 'Theories of Development Piagets Cognitive Development Theory', prompt: 'Which idea is this? — Piaget\'s Cognitive Development Theory describes how children actively construct knowledge.', answer: 'Theories of Development Piagets Cognitive Development Theory', options: ['Theories of Development Piagets Cognitive Development Theory', 'Stages of Human Development Prenatal to Late Adulthood', 'Theories of Development Eriksons Psychosocial Stages', 'Family Definition Types and Functions in Modern Society'] },
            { id: 's3', label: 'Theories of Development Eriksons Psychosocial Stages', prompt: 'Which idea is this? — Erikson\'s Psychosocial Development Theory proposes that human personality develops.', answer: 'Theories of Development Eriksons Psychosocial Stages', options: ['Theories of Development Eriksons Psychosocial Stages', 'Stages of Human Development Prenatal to Late Adulthood', 'Theories of Development Piagets Cognitive Development Theory', 'Family Definition Types and Functions in Modern Society'] },
            { id: 's4', label: 'Family Definition Types and Functions in Modern Society', prompt: 'Which idea is this? — A family is a socially recognized group of individuals united by bonds of marriage.', answer: 'Family Definition Types and Functions in Modern Society', options: ['Family Definition Types and Functions in Modern Society', 'Stages of Human Development Prenatal to Late Adulthood', 'Theories of Development Piagets Cognitive Development Theory', 'Theories of Development Eriksons Psychosocial Stages'] },
            { id: 's5', label: 'Family Life Cycle Stages and Developmental Tasks', prompt: 'Which idea is this? — The family life cycle is a sequential framework describing the predictable stages.', answer: 'Family Life Cycle Stages and Developmental Tasks', options: ['Family Life Cycle Stages and Developmental Tasks', 'Stages of Human Development Prenatal to Late Adulthood', 'Theories of Development Piagets Cognitive Development Theory', 'Theories of Development Eriksons Psychosocial Stages'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A neighbour is in a panic because a milestone-checklist app flagged her three-year-old for \'not yet speaking in full sentences\', while her own mother shrugs that \'children bloom differently.\'',
            decisions: [{ prompt: 'How do the eight development stages advise her?', options: [
                { text: 'Stages are signposts, not stopwatches — early childhood spans two to six years and its milestones mark the typical range; development is plastic and rates vary, so a range flag invites observation and if needed guidance — not a verdict that the child is \'behind.\'', outcome: 'The chapter frames milestones as anchors within wide stages, not rigid deadlines — multidimensional, modifiable development means an app flag is a reason to watch, not to panic.' },
                { text: 'Trust the app — milestones exist precisely because there\'s a correct schedule.', outcome: 'That reads stages as rigid rules, which the chapter rejects: the eight stages describe sequence with varying rate; a single flag is a screening prompt, not a diagnosis.', reveals: 'milestones-are-deadlines' },
                { text: 'Dismiss the flag entirely — all children catch up, so there\'s nothing to look at.', outcome: 'Plasticity cuts both ways — development varies AND responds to support; ignoring the flag throws away the early-help window the stages exist to open.', reveals: 'variation-means-ignore' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a child\'s progress as patterned law — universal in order, individual in pace.',
            decisions: [{ prompt: 'What comes next? Human Development and Family Studies · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Human Development and Family Studies · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_001', difficulty: 'standard',
          question: 'Human development is the lifelong, multidimensional process of quantitative.',
          hint: 'If stuck, revisit **c11_psy_cbse_03_001** (Meaning of Development: Growth, Maturation and.',
          misconception: 'Students often believe **"growth and development mean the same thing"** and use them interchangeably.',
          parts: [
                { id: 'a', prompt: 'A mother says, "My 4-month-old baby can grasp a rattle with her whole hand, but she cannot pick up a small raisin with her thumb and forefinger yet." Which.', answer: 'The **proximodistal principle**',
                  options: ['The **proximodistal principle**', 'cephalocaudal', 'growth and development mean the same thing', 'The child\'s growth is seen in his ability to speak in sentences'],
                  hint: 'If stuck, revisit **c11_psy_cbse_03_001** (Meaning of Development: Growth, Maturation and.',
                  misconception: 'Students often believe **"growth and development mean the same thing"** and use them interchangeably.' }
          ],
            remediations: { 'growth-and-development-mean-the': { steps: ['**Revisit the definitions**: Write the two definitions side-by-side on a flashcard: *Growth = quantitative, measurable.', 'Development = qualitative, progressive, multi-domain, plastic.* 2.', '**Generate 5 paired examples**: For each domain (physical, cognitive, emotional, social, language), write one growth.', '**Self-test**: Cover the definitions and explain the difference to a peer using your examples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe **"growth and development mean the same thing"** and use them interchangeably.',
          parts: [
                { id: 'a', prompt: 'Create a 3-row table comparing **growth**, **maturation**, and **development** across these columns: (a) Nature of change (quantitative/qualitative), (b).', answer: '| Concept | Nature | Primary Driver | Reversibility | Adolescent Example |',
                  options: ['| Concept | Nature | Primary Driver | Reversibility | Adolescent Example |', 'growth and development mean the same thing', 'The child\'s growth is seen in his ability to speak in sentences', '**"growth and development mean the same thing"** and use them interchangeably'],
                  hint: 'If stuck, revisit **c11_psy_cbse_03_001** (Meaning of Development: Growth, Maturation and.',
                  misconception: 'Students often believe **"growth and development mean the same thing"** and use them interchangeably.' }
          ],
            remediations: { 'growth-and-development-mean-the': { steps: ['**Revisit the definitions**: Write the two definitions side-by-side on a flashcard: *Growth = quantitative, measurable.', 'Development = qualitative, progressive, multi-domain, plastic.* 2.', '**Generate 5 paired examples**: For each domain (physical, cognitive, emotional, social, language), write one growth.', '**Self-test**: Cover the definitions and explain the difference to a peer using your examples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_002', difficulty: 'standard',
          question: 'Human development stages refer to the sequential, age-related phases from.',
          hint: 'If stuck on domain distinctions, revisit c11_hs_cbse_01_006 (Adolescence as Turning.',
          misconception: 'Students treat developmental stages as rigid "boxes" with fixed boundaries (e.g., "At exactly 12 years, a child becomes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Human development stages refer to the sequential, age-related phases from conception to',
                  options: ['Human development stages refer to the sequential, age-related phases from conception to', 'Human development is the lifelong, multidimensional process of quantitative growth', 'Piaget\'s Cognitive Development Theory describes how children actively construct knowledge', 'Erikson\'s Psychosocial Development Theory proposes that human personality develops'],
                  hint: 'If stuck on domain distinctions, revisit c11_hs_cbse_01_006 (Adolescence as Turning Point) —.',
                  misconception: 'Students treat developmental stages as rigid "boxes" with fixed boundaries (e.g., "At exactly 12 years, a child becomes adolescent").' }
          ],
            remediations: { 'students-treat-developmental-stages-as': { steps: ['If a student cannot sequence stages or map milestones to domains: Step 1 — Revisit c11_psy_cbse_03_003 (Prenatal.', 'Step 2 — Create a 3-column × 8-row table (Domain × Stage) on A3 paper.', 'Fill only physical milestones first, using NCERT phrases.', 'Step 3 — Add cognitive, then socio-emotional.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_003', difficulty: 'standard',
          question: 'Piaget\'s Cognitive Development Theory describes how children actively construct.',
          hint: 'If unable to list stages/milestones, review c11_psy_cbse_03_005 stage table and create.',
          misconception: 'Students often think "stages = ages" rigidly, believing a 7-year-old is suddenly concrete operational on their.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why a 6-month-old does not search for a toy hidden under a blanket, but a 10-month-old does.', answer: 'The 6-month-old lacks the schema of object permanence',
                  options: ['The 6-month-old lacks the schema of object permanence', 'memory', 'stages = ages', 'The child assimilated the new word \'dog\' into his cat schema'],
                  hint: 'If unable to list stages/milestones, review c11_psy_cbse_03_005 stage table and create flashcards.',
                  misconception: 'Students often think "stages = ages" rigidly, believing a 7-year-old is suddenly concrete operational on their birthday.' },
                { id: 'b', prompt: 'A Class 12 student designs a pendulum experiment to test what affects swing period: length, weight, or push force.', answer: 'Formal operational stage (11+ years)',
                  options: ['Formal operational stage (11+ years)', 'concrete operational', 'stages = ages', 'The child assimilated the new word \'dog\' into his cat schema'],
                  hint: 'If unable to list stages/milestones, review c11_psy_cbse_03_005 stage table and create flashcards.',
                  misconception: 'Students often think "stages = ages" rigidly, believing a 7-year-old is suddenly concrete operational on their birthday.' },
                { id: 'c', prompt: 'Compare how a preoperational child and a concrete operational child would explain why a clay ball flattened into a pancake has the same amount of clay.', answer: 'Preoperational child: "It\'s different now, it\'s flat"',
                  options: ['Preoperational child: "It\'s different now, it\'s flat"', 'stages = ages', 'The child assimilated the new word \'dog\' into his cat schema'],
                  hint: 'If unable to list stages/milestones, review c11_psy_cbse_03_005 stage table and create flashcards.',
                  misconception: 'Students often think "stages = ages" rigidly, believing a 7-year-old is suddenly concrete operational on their birthday.' }
          ],
            remediations: { 'stages-ages-rigidly': { steps: ['Revisit c11_psy_cbse_03_005 (Class 11 Psychology Piaget node) — re-read the stage table and mechanism definitions.', 'Create a 4×3 table: Stage | Age | Key Achievement | Example from Indian daily life (e.g., conservation of roti dough).', 'Practice labeling 5 scenarios as assimilation vs.', 'Re-attempt Diagnostic Q2 and Q4; if still stuck, discuss with teacher using the "spoon-dropping" role-play.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_004', difficulty: 'standard',
          question: 'Erikson\'s Psychosocial Development Theory proposes that human personality.',
          hint: 'If stuck, revisit c11_psy_cbse_03_006 (Erikson\'s Stages of Psychosocial Development) and.',
          misconception: 'Students consistently confuse Erikson\'s "Industry vs. Inferiority" (Stage 4, ages 6-12) with "Initiative vs.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: List Erikson\'s eight psychosocial stages in correct sequential order with their corresponding age ranges (approximate) and the.', answer: 'Correct sequence: 1) Trust vs',
                  options: ['Correct sequence: 1) Trust vs', 'from autonomy to exercise', 'in initiative)'],
                  hint: 'If stuck, revisit c11_psy_cbse_03_006 (Erikson\'s Stages of Psychosocial Development) and create.',
                  misconception: 'Students consistently confuse Erikson\'s "Industry vs. Inferiority" (Stage 4, ages 6-12) with "Initiative vs.' },
                { id: 'b', prompt: 'An UNDERSTAND level question: A 4-year-old child insists on pouring her own milk, spills it, and when the mother scolds her, the child hides her face and says.', answer: 'The child is in Stage 3: Initiative vs',
                  options: ['The child is in Stage 3: Initiative vs', 'Autonomy vs', 'labels this as "Autonomy vs'],
                  hint: 'If stuck, revisit c11_psy_cbse_03_006 (Erikson\'s Stages of Psychosocial Development) and create.',
                  misconception: 'Students consistently confuse Erikson\'s "Industry vs. Inferiority" (Stage 4, ages 6-12) with "Initiative vs.' },
                { id: 'c', prompt: 'An APPLY level question: Design a 30-minute Anganwadi activity plan for 4-year-olds that deliberately targets the "Initiative vs. Guilt" stage.', answer: 'the activity, (',
                  options: ['the activity, (', 'guided play', 'free play with scaffolding'],
                  hint: 'If stuck, revisit c11_psy_cbse_03_006 (Erikson\'s Stages of Psychosocial Development) and create.',
                  misconception: 'Students consistently confuse Erikson\'s "Industry vs. Inferiority" (Stage 4, ages 6-12) with "Initiative vs.' }
          ],
            remediations: { 'students-consistently-confuse-erikson-s': { steps: ['If a student confuses Stage 3 and Stage 4: (1) Have them create a two-column table: Column A = "Preschool (3-6).', 'Column B = "School Age (6-12): Industry" — list 5 behaviors: completing homework, learning multiplication tables.', '(2) Ask: "Which column requires a teacher\'s curriculum?', 'Which column happens in free play?" (3) Re-diagnostic: Give a new vignette — "6-year-old refuses to share toys, saying.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_005', difficulty: 'standard',
          question: 'A family is a socially recognized group of individuals united by bonds.',
          hint: 'Revisit c11_soc_cbse_03_002 (Family: Definition, Functions, Types) — focus on the nuclear.',
          misconception: 'Students equate "joint family" with "any household having grandparents" and "nuclear family" with "only parents and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A family is a socially recognized group of individuals united by bonds of marriage,',
                  options: ['A family is a socially recognized group of individuals united by bonds of marriage,', 'Human development is the lifelong, multidimensional process of quantitative growth', 'Human development stages refer to the sequential, age-related phases from conception to', 'Piaget\'s Cognitive Development Theory describes how children actively construct knowledge'],
                  hint: 'Revisit c11_soc_cbse_03_002 (Family: Definition, Functions, Types) — focus on the nuclear vs.',
                  misconception: 'Students equate "joint family" with "any household having grandparents" and "nuclear family" with "only parents and children." They miss.' }
          ],
            remediations: { 'students-equate-joint-family-with': { steps: ['If a student misclassifies families by headcount only: Step 1 — Give them two case studies: (A) Grandmother lives with.', '(B) Grandmother lives next door, visits daily, but son\'s family has separate bank account and makes own decisions.', 'Step 2 — Ask: "Which is joint?', 'Justify using DECISION-MAKING and RESOURCE CONTROL, not just who sleeps where." Step 3 — Have them create a 2×2 matrix.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_03_006', difficulty: 'standard',
          question: 'The family life cycle is a sequential framework describing the predictable.',
          hint: 'If unsure, revisit **c11_psy_cbse_03_006** (Erikson\'s Psychosocial Stages) and create.',
          misconception: 'Students believe the family life cycle is a rigid *timetable* (e.g., "you must be in Launching stage by age 50") rather.',
          parts: [
                { id: 'a', prompt: 'List the 8 stages of Duvall\'s family life cycle in correct chronological order from marriage to old age.', answer: 'Correct order: 1',
                  options: ['Correct order: 1', 'you must be in Launching stage by age 50', 'the family life cycle is a rigid *timetable* (e'],
                  hint: 'If unsure, revisit **c11_psy_cbse_03_006** (Erikson\'s Psychosocial Stages) and create a two-column.',
                  misconception: 'Students believe the family life cycle is a rigid *timetable* (e.g., "you must be in Launching stage by age 50") rather than a *task-based.' },
                { id: 'b', prompt: 'Case: The Sharmas — both 42, two children aged 14 and 11. Mrs. Sharma has just rejoined the workforce after 12 years; Mr.', answer: 'Stage: Family with Teenagers (oldest child 14)',
                  options: ['Stage: Family with Teenagers (oldest child 14)', 'Launching Family', 'Middle-Aged Family', 'you must be in Launching stage by age 50'],
                  hint: 'If unsure, revisit **c11_psy_cbse_03_006** (Erikson\'s Psychosocial Stages) and create a two-column.',
                  misconception: 'Students believe the family life cycle is a rigid *timetable* (e.g., "you must be in Launching stage by age 50") rather than a *task-based.' },
                { id: 'c', prompt: 'Compare the developmental tasks of "Family with Preschool Children" and "Family with School-Age Children" on three dimensions: (a) primary socialization agent.', answer: 'primary socialization agent, (',
                  options: ['primary socialization agent, (', 'both are about teaching values', 'analyze', 'you must be in Launching stage by age 50'],
                  hint: 'If unsure, revisit **c11_psy_cbse_03_006** (Erikson\'s Psychosocial Stages) and create a two-column.',
                  misconception: 'Students believe the family life cycle is a rigid *timetable* (e.g., "you must be in Launching stage by age 50") rather than a *task-based.' }
          ],
            remediations: { 'the-family-life-cycle-is': { steps: ['Revisit **c11_psy_cbse_03_006** (Erikson\'s Psychosocial Stages) — map each of Erikson\'s 8 stages to the corresponding.', 'Mistrust → Childbearing Family).', 'Revisit **c12_hs_cbse_03_005** (Family: Definition, Types and Functions) — review how family *structure* changes drive.', 'Do a 15-minute "stage sorting" drill: write each of the 8 stages on a card, shuffle, reorder, then write 2 tasks per.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
