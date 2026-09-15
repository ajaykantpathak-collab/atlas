import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch07_p2: SimDef = {
    id: 'v3_c12_hs_ch07_p2',
    title: 'Human Development · Part 2/2',
    subtitle: 'Declining joints, growing wisdom — both are development',
    classLevel: 12, subject: 'home_science', topic: 'Human Development · Part 2/2',
    chapters: ['c12_hs_ch07'],
    nodeIds: ['c12_hs_cbse_07_007', 'c12_hs_cbse_07_008', 'c12_hs_cbse_07_009', 'c12_hs_cbse_07_010', 'c12_hs_cbse_07_011', 'c12_hs_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Life-span analyst', intro: 'A teenager gaining height and a grandmother gaining judgement are doing the same thing: developing.', goal: 'Apply the life-span perspective — multidirectionality, plasticity and context — across the whole of a life.' },
    discovery: {
        question: 'An 82-year-old with arthritis is \'just declining now,\' the family says — yet he settles disputes no one else can. What does the life-span lens see that they don\'t?',
        options: ['Gains and losses coexist at every age — plasticity means capacity can still grow while joints decline; development is lifelong, not childhood-only', 'He\'s exceptional', 'Wisdom isn\'t development', 'Arthritis stops growth'],
        answer: 'Gains and losses coexist at every age — plasticity means capacity can still grow while joints decline; development is lifelong, not childhood-only',
        hook: 'But plasticity isn\'t a free pass — sensitive windows close and early deficits cascade into compounded disadvantage. \'We can fix it later\' is why early-childhood investment exists: the returns are highest exactly where the neglect is cheapest to prevent.',
    },
    teaching: [
        { title: 'Early Childhood: Language, Cognitive and Social-Emotional Development', text: 'Early childhood (ages 2–6 years) is a period of rapid language acquisition, symbolic cognitive growth, and emerging social-emotional awareness where children develop vocabulary, engage in pretend.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reframe a life as lifelong development: separate growth, development and maturation, map gains and losses onto one athlete\'s trade-offs, and test the \'fix it later\' argument against sensitive periods.',
        labels: ['Early Childhood: Language, Cognitive', 'Middle Childhood: School Readiness', 'Adolescence: Puberty, Identity Formation', 'Adulthood: Intimacy, Career Establishment', 'Late Adulthood: Ageing Theories', 'Death and Dying: Kubler-Ross'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_007', title: 'Early Childhood: Language, Cognitive and Social-Emotional Development',
          caseStudy: { intro: 'Imagine you are observing a 4-year-old in an anganwadi: she points to a picture book, says "doggy run fast," then pretends a block is a phone and talks to her.',
            decisions: [{ prompt: 'What is the typical vocabulary size of a 3-year-old child, and what is the term for the rapid increase in vocabulary during early childhood?', options: [
                { text: 'A typical 3-year-old has a vocabulary of about 900–1,000 words', outcome: 'A typical 3-year-old has a vocabulary of about 900–1,000 words.' },
                { text: '50 words', outcome: 'Not quite — Students often think that egocentrism in Piaget\'s preoperational stage means "selfishness".', reveals: 'egocentrism-in-piaget-s-preoperational' },
                { text: 'vocabulary burst', outcome: 'Not quite — Students often think that egocentrism in Piaget\'s preoperational stage means "selfishness".', reveals: 'egocentrism-in-piaget-s-preoperational' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_008', title: 'Middle Childhood: School Readiness and Peer Relationships',
          caseStudy: { intro: 'Imagine a 7‑year‑old named Arjun who can read simple sentences but freezes when asked to join a group game at recess.',
            decisions: [{ prompt: 'Define “school readiness” in the context of middle childhood as per the NCERT framework.', options: [
                { text: 'School readiness is a multidimensional construct encompassing physical well‑being and', outcome: 'School readiness is a multidimensional construct encompassing physical well‑being and motor.' },
                { text: 'knowing ABCs and 123s', outcome: 'Not quite — Students often equate “school readiness” with early academic drills (rote counting, alphabet.', reveals: 'students-often-equate-school-readiness' },
                { text: 'lists only academic skills (e', outcome: 'Not quite — Students often equate “school readiness” with early academic drills (rote counting, alphabet.', reveals: 'students-often-equate-school-readiness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_009', title: 'Adolescence: Puberty, Identity Formation and Risk Behaviours',
          caseStudy: { intro: 'Imagine a 15-year-old in your neighbourhood who started skipping school, experimenting with vaping, and arguing constantly with parents — teachers label her.',
            decisions: [{ prompt: 'A 13-year-old girl has reached Tanner Stage 3 breast development and menarche occurred 6 months ago.', options: [
                { text: 'She is in early adolescence (ages 10–14)', outcome: 'She is in early adolescence (ages 10–14). Symptoms are normative because: (1) HPG axis activation.' },
                { text: 'rebellion', outcome: 'Not quite — Students equate "adolescent risk behavior" with "bad choices" or "poor parenting," ignoring the.', reveals: 'students-equate-adolescent-risk-behavior' },
                { text: 'hormonal imbalance needing medication', outcome: 'Not quite — Students equate "adolescent risk behavior" with "bad choices" or "poor parenting," ignoring the.', reveals: 'students-equate-adolescent-risk-behavior' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_010', title: 'Adulthood: Intimacy, Career Establishment and Family Formation',
          caseStudy: { intro: 'Imagine a 24-year-old named Priya who has just finished her master\'s degree, started her first full-time job in Bengaluru, and is navigating a serious.',
            decisions: [{ prompt: 'According to Erikson, what is the core psychosocial crisis of early adulthood, and what is its successful resolution outcome?', options: [
                { text: 'The core crisis is intimacy vs', outcome: 'The core crisis is intimacy vs. isolation; successful resolution yields the virtue of love — the.' },
                { text: 'identity vs', outcome: 'Not quite — Students believe "career establishment" means getting *any* job and holding it, and "family.', reveals: 'career-establishment-means-getting-any' },
                { text: 'generativity vs', outcome: 'Not quite — Students believe "career establishment" means getting *any* job and holding it, and "family.', reveals: 'career-establishment-means-getting-any' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_011', title: 'Late Adulthood: Ageing Theories and Psychosocial Adjustment',
          caseStudy: { intro: 'Imagine your 72-year-old grandmother recently lost her husband, retired from teaching, and now lives alone in a metro city while her children work abroad.',
            decisions: [{ prompt: 'Define "disengagement theory" of ageing and state its core proposition about the older person–society relationship.', options: [
                { text: 'Disengagement theory (Cumming & Henry, 1961) proposes that mutual withdrawal between', outcome: 'Disengagement theory (Cumming & Henry, 1961) proposes that mutual withdrawal between older adults.' },
                { text: 'disengagement is pathological and must be prevented', outcome: 'Not quite — Students equate "successful ageing" with "absence of disease" or "high activity levels" — writing.', reveals: 'students-equate-successful-ageing-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_012', title: 'Death and Dying: Kubler-Ross Stages and Bereavement Process',
          caseStudy: { intro: 'Imagine a 17-year-old student whose grandmother has been diagnosed with terminal cancer.',
            decisions: [{ prompt: 'A terminally ill patient says, "The test results must be wrong — I feel perfectly fine, so there\'s no way I have only months to live.".', options: [
                { text: 'Correct answer: Denial', outcome: 'Correct answer: Denial. The patient rejects the reality of the diagnosis despite medical evidence.' },
                { text: 'bargaining', outcome: 'Not quite — Students believe Kübler-Ross\'s stages apply identically to both the dying person AND the bereaved.', reveals: 'k-bler-ross-s-stages' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'Human Development · Part 2/2', spots: [
            { id: 's1', label: 'Middle Childhood School Readiness and Peer Relationships', prompt: 'Which idea is this? — Middle childhood (ages 6–12) is the developmental period marked by entry into formal.', answer: 'Middle Childhood School Readiness and Peer Relationships', options: ['Middle Childhood School Readiness and Peer Relationships', 'Adolescence Puberty Identity Formation and Risk Behaviours', 'Adulthood Intimacy Career Establishment and Family Formation', 'Late Adulthood Ageing Theories and Psychosocial Adjustment'] },
            { id: 's2', label: 'Adolescence Puberty Identity Formation and Risk Behaviours', prompt: 'Which idea is this? — Adolescence (ages 10–19) is the transitional developmental period between childhood and.', answer: 'Adolescence Puberty Identity Formation and Risk Behaviours', options: ['Adolescence Puberty Identity Formation and Risk Behaviours', 'Middle Childhood School Readiness and Peer Relationships', 'Adulthood Intimacy Career Establishment and Family Formation', 'Late Adulthood Ageing Theories and Psychosocial Adjustment'] },
            { id: 's3', label: 'Adulthood Intimacy Career Establishment and Family Formation', prompt: 'Which idea is this? — Adulthood is the life stage beginning approximately at age 20–21, characterised by the.', answer: 'Adulthood Intimacy Career Establishment and Family Formation', options: ['Adulthood Intimacy Career Establishment and Family Formation', 'Middle Childhood School Readiness and Peer Relationships', 'Adolescence Puberty Identity Formation and Risk Behaviours', 'Late Adulthood Ageing Theories and Psychosocial Adjustment'] },
            { id: 's4', label: 'Late Adulthood Ageing Theories and Psychosocial Adjustment', prompt: 'Which idea is this? — Late adulthood (typically 60+ years in India) is the final stage of the lifespan.', answer: 'Late Adulthood Ageing Theories and Psychosocial Adjustment', options: ['Late Adulthood Ageing Theories and Psychosocial Adjustment', 'Middle Childhood School Readiness and Peer Relationships', 'Adolescence Puberty Identity Formation and Risk Behaviours', 'Adulthood Intimacy Career Establishment and Family Formation'] },
            { id: 's5', label: 'Death and Dying Kubler-Ross Stages and Bereavement Process', prompt: 'Which idea is this? — Death and dying in human development refers to the final stage of the lifespan where.', answer: 'Death and Dying Kubler-Ross Stages and Bereavement Process', options: ['Death and Dying Kubler-Ross Stages and Bereavement Process', 'Middle Childhood School Readiness and Peer Relationships', 'Adolescence Puberty Identity Formation and Risk Behaviours', 'Adulthood Intimacy Career Establishment and Family Formation'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A playschool coordinator designs a toddler motor-skills hour that opens with bead-threading \'because it\'s quiet,\' ends with running, and publishes a weekly \'fastest developer\' chart ranking the children.',
            decisions: [{ prompt: 'Which development principles does the design violate?', options: [
                { text: 'Both — the sequence runs backwards: proximodistal and cephalocaudal order says whole-body and arm control come before finger work, so gross motor should precede beads; and the ranking chart violates individuality — children share the sequence but not the timetable.', outcome: 'The chapter separates what directionality fixes (order of skills) from what individuality permits (pace of arriving); the session inverts the first and denies the second.' },
                { text: 'Only the chart is wrong — starting with beads is fine because fine motor needs the freshest attention.', outcome: 'Attention isn\'t the constraint the principles describe — distal control matures after proximal; demanding precise finger work before the large-muscle foundation asks for a skill that isn\'t built yet.', reveals: 'any-order-works' },
                { text: 'Only the ordering is wrong — the chart is motivating because kids compete.', outcome: 'Competition presumes a shared timetable, which individuality denies — a \'fastest developer\' chart ranks children against a schedule that was never theirs, misreading normal variation as speed.', reveals: 'ranking-is-motivation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_07_012', title: 'You made it',
          caseStudy: { intro: 'You can now see development as a whole-life balance sheet — gains and losses at every age, and why early investment still pays best.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_007', difficulty: 'standard',
          question: 'Early childhood (ages 2–6 years) is a period of rapid language acquisition.',
          hint: 'Review c11_psy_cbse_03_005 (Piaget\'s stages) focusing on the transition from sensorimotor.',
          misconception: 'Students often think that egocentrism in Piaget\'s preoperational stage means "selfishness" or "arrogance." In reality.',
          parts: [
                { id: 'a', prompt: 'What is the typical vocabulary size of a 3-year-old child, and what is the term for the rapid increase in vocabulary during early childhood?', answer: 'A typical 3-year-old has a vocabulary of about 900–1,000 words',
                  options: ['A typical 3-year-old has a vocabulary of about 900–1,000 words', '50 words', 'vocabulary burst', 'selfishness'],
                  hint: 'Review c11_psy_cbse_03_005 (Piaget\'s stages) focusing on the transition from sensorimotor.',
                  misconception: 'Students often think that egocentrism in Piaget\'s preoperational stage means "selfishness" or "arrogance." In reality, egocentrism is.' }
          ],
            remediations: { 'egocentrism-in-piaget-s-preoperational': { steps: ['Revisit the definition of egocentrism in c11_psy_cbse_03_005 (Piaget\'s stages) and contrast with moral development.', 'Watch a 3-minute video of the "Three Mountains Task" to visualise the cognitive limitation.', 'Re-attempt DIAGNOSTIC_QUESTION_3 with the correct lens: centration + lack of conservation = preoperational, not.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that egocentrism in Piaget\'s preoperational stage means "selfishness" or "arrogance." In reality.',
          parts: [
                { id: 'a', prompt: 'A 5-year-old insists on dressing herself, spills milk, and says, "I do it myself!" When scolded, she hides her face and says, "I bad." Using Erikson\'s stage.', answer: 'This reflects the initiative vs',
                  options: ['This reflects the initiative vs', 'defiance', 'low self-esteem', 'selfishness'],
                  hint: 'Review c11_psy_cbse_03_005 (Piaget\'s stages) focusing on the transition from sensorimotor.',
                  misconception: 'Students often think that egocentrism in Piaget\'s preoperational stage means "selfishness" or "arrogance." In reality, egocentrism is.' }
          ],
            remediations: { 'egocentrism-in-piaget-s-preoperational': { steps: ['Revisit the definition of egocentrism in c11_psy_cbse_03_005 (Piaget\'s stages) and contrast with moral development.', 'Watch a 3-minute video of the "Three Mountains Task" to visualise the cognitive limitation.', 'Re-attempt DIAGNOSTIC_QUESTION_3 with the correct lens: centration + lack of conservation = preoperational, not.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_008', difficulty: 'standard',
          question: 'Middle childhood (ages 6–12) is the developmental period marked by entry into.',
          hint: 'If stuck, revisit the developmental milestones of early childhood (ages 3-6) in node.',
          misconception: 'Students often equate “school readiness” with early academic drills (rote counting, alphabet writing) and treat peer.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Middle childhood (ages 6–12) is the developmental period marked by entry into formal',
                  options: ['Middle childhood (ages 6–12) is the developmental period marked by entry into formal', 'Human development is the lifelong, multidimensional process of quantitative and', 'The principles of directionality and individuality are fundamental laws governing human', 'Heredity-environment interaction refers to the dynamic, bidirectional process where'],
                  hint: 'If stuck, revisit the developmental milestones of early childhood (ages 3-6) in node.',
                  misconception: 'Students often equate “school readiness” with early academic drills (rote counting, alphabet writing) and treat peer relationships as mere.' }
          ],
            remediations: { 'students-often-equate-school-readiness': { steps: ['If a student cannot distinguish the three readiness domains or defaults to academic‑only definitions: (1) Have them.', '(2) Use a video clip of a classroom circle time; ask the student to tag each child’s behaviour with the domain.', '(3) Re‑visit the case of Arjun from the Walkthrough and ask: “Which domain explains his freezing at recess?” This.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_009', difficulty: 'standard',
          question: 'Adolescence (ages 10–19) is the transitional developmental period between.',
          hint: 'If stuck on identity statuses: revisit c11_hs_cbse_02_006 and c11_psy_cbse_03_010.',
          misconception: 'Students equate "adolescent risk behavior" with "bad choices" or "poor parenting," ignoring the **neurodevelopmental.',
          parts: [
                { id: 'a', prompt: 'A 13-year-old girl has reached Tanner Stage 3 breast development and menarche occurred 6 months ago.', answer: 'She is in early adolescence (ages 10–14)',
                  options: ['She is in early adolescence (ages 10–14)', 'rebellion', 'hormonal imbalance needing medication'],
                  hint: 'If stuck on identity statuses: revisit c11_hs_cbse_02_006 and c11_psy_cbse_03_010 — create a 2×2.',
                  misconception: 'Students equate "adolescent risk behavior" with "bad choices" or "poor parenting," ignoring the **neurodevelopmental mismatch**: puberty.' },
                { id: 'b', prompt: 'Two 16-year-olds: Rahul has clear career goals (engineering), follows a structured study routine, and discusses future plans with parents.', answer: 'Rahul: Identity Achievement (exploration + commitment)',
                  options: ['Rahul: Identity Achievement (exploration + commitment)', 'moratorium'],
                  hint: 'If stuck on identity statuses: revisit c11_hs_cbse_02_006 and c11_psy_cbse_03_010 — create a 2×2.',
                  misconception: 'Students equate "adolescent risk behavior" with "bad choices" or "poor parenting," ignoring the **neurodevelopmental mismatch**: puberty.' },
                { id: 'c', prompt: 'A school counsellor designs an anti-vaping program for Class 9–10 students.', answer: 'Critique: (a) Statistics lectures fail',
                  options: ['Critique: (a) Statistics lectures fail', 'interactive quizzes'],
                  hint: 'If stuck on identity statuses: revisit c11_hs_cbse_02_006 and c11_psy_cbse_03_010 — create a 2×2.',
                  misconception: 'Students equate "adolescent risk behavior" with "bad choices" or "poor parenting," ignoring the **neurodevelopmental mismatch**: puberty.' }
          ],
            remediations: { 'students-equate-adolescent-risk-behavior': { steps: ['**Revisit neurobiology**: Review c11_bio_cbse_19_005 (Gonads: Testis and Ovary Hormones) and c11_bio_cbse_18_004.', 'Draw a timeline graph: x-axis age 8–25, y-axis "limbic reactivity" (inverted U, peak 14) and "PFC regulation" (linear.', '**Relearn Marcia\'s 2×2 matrix**: Use c11_hs_cbse_02_006 and c11_psy_cbse_03_010 — create 4 vignettes (one per status).', '**Practice ecological mapping**: Take the diagnostic Q4 cases, draw Bronfenbrenner circles for each, identify leverage.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_010', difficulty: 'standard',
          question: 'Adulthood is the life stage beginning approximately at age 20–21, characterised.',
          hint: 'If stuck on stage sequence or identity-intimacy link, revisit c11_psy_cbse_03_006.',
          misconception: 'Students believe "career establishment" means getting *any* job and holding it, and "family formation" follows a fixed.',
          parts: [
                { id: 'a', prompt: 'According to Erikson, what is the core psychosocial crisis of early adulthood, and what is its successful resolution outcome?', answer: 'The core crisis is intimacy vs',
                  options: ['The core crisis is intimacy vs', 'identity vs', 'generativity vs', 'career establishment'],
                  hint: 'If stuck on stage sequence or identity-intimacy link, revisit c11_psy_cbse_03_006 (Erikson\'s Stages.',
                  misconception: 'Students believe "career establishment" means getting *any* job and holding it, and "family formation" follows a fixed biological clock.' },
                { id: 'b', prompt: 'Rahul (26) has changed jobs three times in two years, each time citing "better growth" but actually feeling uncertain about his fit.', answer: 'Rahul is in the Exploration stage (approx',
                  options: ['Rahul is in the Exploration stage (approx', 'Establishment', 'Maintenance', 'career establishment'],
                  hint: 'If stuck on stage sequence or identity-intimacy link, revisit c11_psy_cbse_03_006 (Erikson\'s Stages.',
                  misconception: 'Students believe "career establishment" means getting *any* job and holding it, and "family formation" follows a fixed biological clock.' }
          ],
            remediations: { 'career-establishment-means-getting-any': { steps: ['If a student cannot distinguish identity vs.', 'intimacy stages or map Super\'s stages to a case, take these steps: (1) Revisit c11_hs_cbse_02_006 (Adolescence.', '(2) Use a timeline exercise: draw a 15–30 age line, mark Super\'s stages with coloured bands, place 3 Indian case.', '(3) Re-diagnostic: give a new case (29M returning from MBA, engaged, job offer in another city) and ask student.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_011', difficulty: 'standard',
          question: 'Late adulthood (typically 60+ years in India) is the final stage of the.',
          hint: 'Revisit c11_psy_cbse_03_006 (Erikson\'s stages) and c11_psy_cbse_03_011 (Adulthood and Old.',
          misconception: 'Students equate "successful ageing" with "absence of disease" or "high activity levels" — writing answers like.',
          parts: [
                { id: 'a', prompt: 'Mrs. Rao, 75, lives alone after her husband\'s death. Her daughter insists she move to a "premium senior living community" with medical facilities and scheduled.', answer: 'SST: with limited time perspective, she prioritises emotionally meaningful goals',
                  options: ['SST: with limited time perspective, she prioritises emotionally meaningful goals', 'stubbornness', 'safety first'],
                  hint: 'Revisit c11_psy_cbse_03_006 (Erikson\'s stages) and c11_psy_cbse_03_011 (Adulthood and Old Age).',
                  misconception: 'Students equate "successful ageing" with "absence of disease" or "high activity levels" — writing answers like "successful ageing means.' },
                { id: 'b', prompt: 'Compare the psychosocial outcomes of "institutionalisation" vs "family care" for Indian elderly using Erikson\'s integrity vs despair and the concept of "filial.', answer: 'Integrity requires life review yielding acceptance and wisdom',
                  options: ['Integrity requires life review yielding acceptance and wisdom', 'family care'],
                  hint: 'Revisit c11_psy_cbse_03_006 (Erikson\'s stages) and c11_psy_cbse_03_011 (Adulthood and Old Age).',
                  misconception: 'Students equate "successful ageing" with "absence of disease" or "high activity levels" — writing answers like "successful ageing means.' }
          ],
            remediations: { 'students-equate-successful-ageing-with': { steps: ['Re-read NCERT Class 12 text pages 125–128 on "Why are the Elderly Vulnerable?" and "Some Programmes for the Elderly".', 'Review Class 11 Psychology node c11_psy_cbse_03_011 (Adulthood and Old Age) for Erikson\'s integrity vs despair and.', 'Create a two-column table: "Western Theory Assumption" vs "Indian Reality Constraint" for each theory (disengagement.', 'Re-attempt Diagnostic Q2 and Q4 using this table. If still stuck, discuss with teacher using the case of a 70-year-old.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_07_012', difficulty: 'standard',
          question: 'Death and dying in human development refers to the final stage of the lifespan.',
          hint: 'Revisit c12_hs_cbse_07_011 (Late Adulthood) for Erikson\'s stage and family role changes.',
          misconception: 'Students believe Kübler-Ross\'s stages apply identically to both the dying person AND the bereaved family members.',
          parts: [
                { id: 'a', prompt: 'A terminally ill patient says, "The test results must be wrong — I feel perfectly fine, so there\'s no way I have only months to live." Which Kübler-Ross stage.', answer: 'Correct answer: Denial',
                  options: ['Correct answer: Denial', 'bargaining'],
                  hint: 'Revisit c12_hs_cbse_07_011 (Late Adulthood) for Erikson\'s stage and family role changes, and.',
                  misconception: 'Students believe Kübler-Ross\'s stages apply identically to both the dying person AND the bereaved family members.' },
                { id: 'b', prompt: 'Explain why Kübler-Ross\'s stages should not be treated as a fixed linear sequence that every dying person passes through in order.', answer: 'Correct answer: Kübler-Ross herself emphasized that stages are not linear',
                  options: ['Correct answer: Kübler-Ross herself emphasized that stages are not linear', 'everyone goes through all five stages in order'],
                  hint: 'Revisit c12_hs_cbse_07_011 (Late Adulthood) for Erikson\'s stage and family role changes, and.',
                  misconception: 'Students believe Kübler-Ross\'s stages apply identically to both the dying person AND the bereaved family members.' },
                { id: 'c', prompt: 'A 45-year-old man whose wife died two months ago alternates between: (a) looking at her photos and crying intensely, and (b) focusing on repairing the house.', answer: 'Correct answer: (a) is loss-oriented coping (confronting grief directly), (b) is',
                  options: ['Correct answer: (a) is loss-oriented coping (confronting grief directly), (b) is', 'stages of grief', 'he should only grieve'],
                  hint: 'Revisit c12_hs_cbse_07_011 (Late Adulthood) for Erikson\'s stage and family role changes, and.',
                  misconception: 'Students believe Kübler-Ross\'s stages apply identically to both the dying person AND the bereaved family members.' },
                { id: 'd', prompt: 'Compare how the 13-day Hindu mourning period (terahvin) and the 40-day mourning period in some Muslim communities in India serve similar psychosocial functions.', answer: 'Correct answer: Both provide (1) structured social support through prescribed',
                  options: ['Correct answer: Both provide (1) structured social support through prescribed', 'one has pind daan, the other has Quran recitation'],
                  hint: 'Revisit c12_hs_cbse_07_011 (Late Adulthood) for Erikson\'s stage and family role changes, and.',
                  misconception: 'Students believe Kübler-Ross\'s stages apply identically to both the dying person AND the bereaved family members.' }
          ],
            remediations: { 'k-bler-ross-s-stages': { steps: ['Have the student create a two-column table: left column "Dying Person (Kübler-Ross)" with 5 stages, right column.', 'Give three mini-cases — one dying patient, two bereaved relatives — and ask student to label which model applies.', 'Student explains in own words: "Kübler-Ross describes how a person faces THEIR OWN death; dual-process describes how.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
