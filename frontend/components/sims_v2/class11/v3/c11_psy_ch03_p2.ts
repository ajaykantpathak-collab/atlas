import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch03_p2: SimDef = {
    id: 'v3_c11_psy_ch03_p2',
    title: 'Human Development · Part 2/2',
    subtitle: 'Discover that growing up is only half of developing.',
    classLevel: 11, subject: 'psychology', topic: 'Human Development · Part 2/2',
    chapters: ['c11_psy_ch03'],
    nodeIds: ['c11_psy_cbse_03_007', 'c11_psy_cbse_03_008', 'c11_psy_cbse_03_009', 'c11_psy_cbse_03_010', 'c11_psy_cbse_03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a lifespan scientist tracking gains and losses together', intro: 'A behaviour appears untaught — maturation, or quiet learning you never noticed? The distinction changes what development means.', goal: 'Apply the life-span view — lifelong, multidirectional, plastic, contextual — to human development.' },
    discovery: {
        question: '\'Development is just growth plus maturation.\' Does the formula capture it?',
        options: ['No — development is lifelong, multidirectional and plastic, and includes losses alongside gains', 'Yes — the two processes sum to development', 'Yes — anything not learned is maturation', 'No — development ends at adolescence'],
        answer: 'No — development is lifelong, multidirectional and plastic, and includes losses alongside gains',
        hook: 'Plasticity isn\'t unlimited potential — \'plastic\' means modifiable within biological limits, not expert-at-anything-at-any-age.',
    },
    teaching: [
        { title: 'Kohlberg\'s Stages of Moral Development', text: 'Kohlberg\'s theory proposes that moral reasoning develops through three hierarchical levels—pre-conventional, conventional, and post-conventional—each containing two stages, progressing from external.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Weigh whether wisdom gaining while processing speed loses is one process or two, then test \'any skill at any age\' against the plasticity clause.',
        labels: ['Kohlberg\'s Stages of Moral', 'Language Development: Stages from', 'Gender Socialisation and Development', 'Adolescence: Physical, Cognitive', 'Adulthood and Old Age'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_007', title: 'Kohlberg\'s Stages of Moral Development',
          caseStudy: { intro: 'Imagine you see a classmate cheat on an exam. You think "That\'s wrong." But why? Because you\'ll get in trouble if caught? Because rules are rules?',
            decisions: [{ prompt: 'A student says: "Heinz should not steal the medicine because he will go to jail if caught." Which Kohlberg level and stage does this.', options: [
                { text: 'Pre-conventional Level, Stage 1: Obedience and Punishment Orientation', outcome: 'Pre-conventional Level, Stage 1: Obedience and Punishment Orientation.' },
                { text: 'Stage 4 because it\'s about law', outcome: 'Not quite — Students believe moral *development* means making "better" decisions (e.g., "stealing is wrong" →.', reveals: 'moral-development-means-making-better' },
                { text: 'better', outcome: 'Not quite — Students believe moral *development* means making "better" decisions (e.g., "stealing is wrong" →.', reveals: 'moral-development-means-making-better' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_008', title: 'Language Development: Stages from Babbling to Complex Sentences',
          caseStudy: { intro: 'Imagine you are watching a home video of your baby cousin: at 2 months she coos "ooo-aaa" when smiled at; at 6 months she babbles "bababa"; at 14 months she.',
            decisions: [{ prompt: 'What is the correct chronological order of the following language milestones: (a) telegraphic speech, (b) babbling, (c) holophrastic stage.', options: [
                { text: 'Correct order: cooing (1-3 months) → babbling (4-6 months) → holophrastic stage (10-18', outcome: 'Correct order: cooing (1-3 months) → babbling (4-6 months) → holophrastic stage (10-18 months) →.' },
                { text: 'telegraphic speech', outcome: 'Not quite — Students often believe that "telegraphic speech" means the child speaks in short, incomplete.', reveals: 'telegraphic-speech-means-the-child' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_009', title: 'Gender Socialisation and Development of Gender Identity',
          caseStudy: { intro: 'Imagine a 4-year-old boy in a Delhi preschool who loves the kitchen set during free play, but his teacher gently redirects him to the block corner saying.',
            decisions: [{ prompt: 'Define "sex" and "gender" as used in psychology. Give one example of a sex difference and one example of a gender difference.', options: [
                { text: 'Sex refers to the biological and physiological characteristics that define males and', outcome: 'Sex refers to the biological and physiological characteristics that define males and females (e.g.' },
                { text: 'sex and gender are the same thing', outcome: 'Not quite — Students frequently believe that gender identity is fixed at birth and entirely determined.', reveals: 'students-frequently-believe-that-gender' },
                { text: 'gender is determined by chromosomes', outcome: 'Not quite — Students frequently believe that gender identity is fixed at birth and entirely determined.', reveals: 'students-frequently-believe-that-gender' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_010', title: 'Adolescence: Physical, Cognitive and Identity Changes',
          caseStudy: { intro: 'Imagine a 14-year-old student, Arjun, who spends 45 minutes styling his hair before school, convinced everyone will notice if a single strand is out of place.',
            decisions: [{ prompt: 'Define "menarche" and "spermarche" precisely, and state the typical age range for each in the Indian context.', options: [
                { text: 'Menarche is the onset of menstruation, marking female reproductive maturity, typically', outcome: 'Menarche is the onset of menstruation, marking female reproductive maturity, typically occurring.' },
                { text: 'menarche is first period at age 8', outcome: 'Not quite — Students believe "adolescent egocentrism" means adolescents are selfish or narcissistic.', reveals: 'adolescent-egocentrism-means-adolescents-are' },
                { text: 'adolescent egocentrism', outcome: 'Not quite — Students believe "adolescent egocentrism" means adolescents are selfish or narcissistic.', reveals: 'adolescent-egocentrism-means-adolescents-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_011', title: 'Adulthood and Old Age: Changes and Challenges',
          caseStudy: { intro: 'Imagine your 68-year-old grandfather recently retired from his government job, lives alone since your grandmother passed away, and complains of "feeling.',
            decisions: [{ prompt: 'According to NCERT, which of the following best describes the primary developmental task of early adulthood (twenties) in the life-span.', options: [
                { text: 'The primary developmental task of early adulthood is exploring possibilities for adult', outcome: 'The primary developmental task of early adulthood is exploring possibilities for adult living and.' },
                { text: 'achieving ego integrity', outcome: 'Not quite — Students believe that "ageing = uniform decline for everyone" and that developmental stages.', reveals: 'ageing-uniform-decline-for-everyone' },
                { text: 'mastering concrete operations', outcome: 'Not quite — Students believe that "ageing = uniform decline for everyone" and that developmental stages.', reveals: 'ageing-uniform-decline-for-everyone' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A parenting workshop hears: \'A baby who walks at 10 months instead of 12 shows faster maturation — biology sets the timetable, environment can\'t change it.\' Another adds: \'Development ends at adulthood; after that it\'s just decline.\'',
            decisions: [{ prompt: 'What do development science and the life-span view say?', options: [
                { text: 'Separate the processes first: growth is measurable size increase; maturation is the genetically-timed unfolding that still needs adequate environment and a little practice — early walking reflects maturational timing AND opportunity, not a fixed program. And the life-span perspective says development is lifelong, multi-directional (gains like wisdom beside losses like speed), plastic within limits, and historically embedded — not a stage ladder ending at 18.', outcome: 'The workshop corrects both myths: biology provides the timetable but environment writes the performance — and development runs to life\'s end in both directions at once.' },
                { text: 'Agree on pure maturation — untaught milestones are genes doing their schedule.', outcome: 'Untaught isn\'t unmodifiable: maturation sets the sequence but rate varies with nutrition, freedom of movement and cultural practice — plasticity is real within limits.', reveals: 'maturation-is-fixed-program' },
                { text: 'Accept the decline story — development is childhood growth, the rest is loss.', outcome: 'Multi-directionality rejects that: later life combines gains (expertise, emotional regulation) with losses — and a 20-year-old in 1947 vs today shows historical embeddedness matters.', reveals: 'development-ends-at-adulthood' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_03_011', title: 'You made it',
          caseStudy: { intro: 'Old age can mean slower reflexes and better judgement in the same person — development runs both directions at once.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_007', difficulty: 'standard',
          question: 'Kohlberg\'s theory proposes that moral reasoning develops through three.',
          hint: 'Revisit c11_psy_cbse_03_005 Table 3.2: practice generating hypothetical syllogisms (e.g.',
          misconception: 'Students believe moral *development* means making "better" decisions (e.g., "stealing is wrong" → "stealing.',
          parts: [
                { id: 'a', prompt: 'A student says: "Heinz should not steal the medicine because he will go to jail if caught." Which Kohlberg level and stage does this reasoning represent?', answer: 'Pre-conventional Level, Stage 1: Obedience and Punishment Orientation',
                  options: ['Pre-conventional Level, Stage 1: Obedience and Punishment Orientation', 'Stage 4 because it\'s about law', 'better', 'stealing is wrong'],
                  hint: 'Revisit c11_psy_cbse_03_005 Table 3.2: practice generating hypothetical syllogisms (e.g., "If.',
                  misconception: 'Students believe moral *development* means making "better" decisions (e.g., "stealing is wrong" → "stealing is sometimes right").' },
                { id: 'b', prompt: 'A 14-year-old argues: "Heinz shouldn\'t steal because if everyone stole whenever they felt their need was greater, society would collapse into chaos.', answer: 'Conventional Level, Stage 4: Law and Order Orientation',
                  options: ['Conventional Level, Stage 4: Law and Order Orientation', 'better', 'stealing is wrong', 'stealing is sometimes right'],
                  hint: 'Revisit c11_psy_cbse_03_005 Table 3.2: practice generating hypothetical syllogisms (e.g., "If.',
                  misconception: 'Students believe moral *development* means making "better" decisions (e.g., "stealing is wrong" → "stealing is sometimes right").' },
                { id: 'c', prompt: 'Compare Kohlberg\'s Stage 5 (Social Contract) and Stage 6 (Universal Ethical Principles) on the Heinz dilemma. Both may support stealing.', answer: 'Stage 5: "Heinz should steal',
                  options: ['Stage 5: "Heinz should steal', 'changing laws', 'universal principles', 'better'],
                  hint: 'Revisit c11_psy_cbse_03_005 Table 3.2: practice generating hypothetical syllogisms (e.g., "If.',
                  misconception: 'Students believe moral *development* means making "better" decisions (e.g., "stealing is wrong" → "stealing is sometimes right").' }
          ],
            remediations: { 'moral-development-means-making-better': { steps: ['Give the student two identical decisions with different justifications (e.g., "Don\'t cheat: you\'ll get caught" vs.', 'Ask "Which reasoning is more mature? Why?"', 'Explicitly label: first is Stage 1 (punishment), second is Stage 4 (social system).', 'Practice with 3 dilemmas where *decision is held constant* and only *reasoning varies*—student must sort justifications.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe moral *development* means making "better" decisions (e.g., "stealing is wrong" → "stealing.',
          parts: [
                { id: 'a', prompt: 'Critique the claim: "Kohlberg\'s stages are culturally biased because his highest stage reflects Western individualistic values (autonomy, justice) rather than.', answer: 'Valid critique supported by cross-cultural research (e.g., Snarey, 1985',
                  options: ['Valid critique supported by cross-cultural research (e.g., Snarey, 1985', 'better', 'stealing is wrong', 'stealing is sometimes right'],
                  hint: 'Revisit c11_psy_cbse_03_005 Table 3.2: practice generating hypothetical syllogisms (e.g., "If.',
                  misconception: 'Students believe moral *development* means making "better" decisions (e.g., "stealing is wrong" → "stealing is sometimes right").' },
                { id: 'b', prompt: 'Create a new moral dilemma (not Heinz) that could discriminate between Stage 3 and Stage 4 reasoning.', answer: 'Dilemma: "A teacher discovers a top-performing student plagiarized an assignment',
                  options: ['Dilemma: "A teacher discovers a top-performing student plagiarized an assignment', 'better', 'stealing is wrong', 'stealing is sometimes right'],
                  hint: 'Revisit c11_psy_cbse_03_005 Table 3.2: practice generating hypothetical syllogisms (e.g., "If.',
                  misconception: 'Students believe moral *development* means making "better" decisions (e.g., "stealing is wrong" → "stealing is sometimes right").' }
          ],
            remediations: { 'moral-development-means-making-better': { steps: ['Give the student two identical decisions with different justifications (e.g., "Don\'t cheat: you\'ll get caught" vs.', 'Ask "Which reasoning is more mature? Why?"', 'Explicitly label: first is Stage 1 (punishment), second is Stage 4 (social system).', 'Practice with 3 dilemmas where *decision is held constant* and only *reasoning varies*—student must sort justifications.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_008', difficulty: 'standard',
          question: 'Language development is the universal, biologically guided process through.',
          hint: 'Revisit c11_psy_cbse_03_001 (maturation vs. learning) and c11_psy_cbse_03_005.',
          misconception: 'Students often believe that "telegraphic speech" means the child speaks in short, incomplete sentences because of low.',
          parts: [
                { id: 'a', prompt: 'A 28-month-old says "Daddy go work" and "Me want cookie." Identify the stage and list two grammatical morphemes that are systematically omitted in this stage.', answer: 'Stage: telegraphic speech',
                  options: ['Stage: telegraphic speech', 'past tense -ed', 'telegraphic speech'],
                  hint: 'Revisit c11_psy_cbse_03_001 (maturation vs. learning) and c11_psy_cbse_03_005 (sensorimotor.',
                  misconception: 'Students often believe that "telegraphic speech" means the child speaks in short, incomplete sentences because of low intelligence or lack.' }
          ],
            remediations: { 'telegraphic-speech-means-the-child': { steps: ['Show the student a side-by-side transcript: telegraphic "Baby eat apple" vs.', 'adult "The baby is eating the apple." 2.', 'Ask them to circle every word the child omitted.', 'Have them classify each omitted word as content or function.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_009', difficulty: 'standard',
          question: 'Gender socialisation is the lifelong process through which individuals.',
          hint: 'If stuck, revisit Piaget\'s Preoperational Stage (c11_psy_cbse_03_005) focusing.',
          misconception: 'Students frequently believe that gender identity is fixed at birth and entirely determined by biology ("born this.',
          parts: [
                { id: 'a', prompt: 'A 5-year-old girl says, "I\'m a girl, so I can\'t be a pilot when I grow up." Using the concept of gender typing, explain how she might have reached this.', answer: 'Gender typing is the process by',
                  options: ['Gender typing is the process by', 'her father told her', 'boys will be boys'],
                  hint: 'If stuck, revisit Piaget\'s Preoperational Stage (c11_psy_cbse_03_005) focusing on symbolic thought.',
                  misconception: 'Students frequently believe that gender identity is fixed at birth and entirely determined by biology ("born this way"), leading them.' },
                { id: 'b', prompt: 'Design a 10-minute classroom activity for Class 6 students to help them recognize gender stereotypes in Indian television advertisements.', answer: 'Activity: "Ad Detective"',
                  options: ['Activity: "Ad Detective"', 'boys will be boys'],
                  hint: 'If stuck, revisit Piaget\'s Preoperational Stage (c11_psy_cbse_03_005) focusing on symbolic thought.',
                  misconception: 'Students frequently believe that gender identity is fixed at birth and entirely determined by biology ("born this way"), leading them.' },
                { id: 'c', prompt: 'Compare the role of parents versus peers in gender socialisation during middle childhood (ages 7-11).', answer: 'Parents operate primarily through direct instruction, differential reinforcement',
                  options: ['Parents operate primarily through direct instruction, differential reinforcement', 'both teach gender roles', 'boys will be boys'],
                  hint: 'If stuck, revisit Piaget\'s Preoperational Stage (c11_psy_cbse_03_005) focusing on symbolic thought.',
                  misconception: 'Students frequently believe that gender identity is fixed at birth and entirely determined by biology ("born this way"), leading them.' }
          ],
            remediations: { 'students-frequently-believe-that-gender': { steps: ['Conduct a "Gender Biography" exercise: student interviews two adults (one male, one female) from different generations.', 'They then map each memory to a specific socialisation agent (parent, peer, media, school, religion) using a table.', 'Show the 2017 BBC documentary "No More Boys and Girls: Can Our Kids Go Gender Free?" (clips available on YouTube).', 'Assign a mini-literature review: find one study showing cross-cultural variation in a gender-typed behaviour (e.g.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_010', difficulty: 'standard',
          question: 'Adolescence is the transitional developmental period between childhood and.',
          hint: 'Revisit c11_psy_cbse_03_005 Table 3.2 and the "pendulum problem" example—focus on the.',
          misconception: 'Students believe "adolescent egocentrism" means adolescents are selfish or narcissistic.',
          parts: [
                { id: 'a', prompt: 'A Class 9 student argues: "If I can solve algebra problems, I\'m already in formal operations.', answer: 'The flaw: concrete operational children (7-11 years) CAN solve algebra if taught',
                  options: ['The flaw: concrete operational children (7-11 years) CAN solve algebra if taught', 'content of thought', 'structure of thought', 'adolescent egocentrism'],
                  hint: 'Revisit c11_psy_cbse_03_005 Table 3.2 and the "pendulum problem" example—focus on the difference.',
                  misconception: 'Students believe "adolescent egocentrism" means adolescents are selfish or narcissistic.' },
                { id: 'b', prompt: 'Compare and contrast Erikson\'s "identity vs. role confusion" and Marcia\'s four identity statuses.', answer: 'Erikson provides the psychosocial FRAMEWORK (crisis: establish coherent self vs',
                  options: ['Erikson provides the psychosocial FRAMEWORK (crisis: establish coherent self vs', 'adolescent egocentrism', 'Everyone noticed my wrong answer in class', '"adolescent egocentrism" means adolescents are selfish or narcissistic'],
                  hint: 'Revisit c11_psy_cbse_03_005 Table 3.2 and the "pendulum problem" example—focus on the difference.',
                  misconception: 'Students believe "adolescent egocentrism" means adolescents are selfish or narcissistic.' }
          ],
            remediations: { 'adolescent-egocentrism-means-adolescents-are': { steps: ['Ask the student to recall a time they felt "everyone was watching"—validate the feeling as real.', 'Use a concrete demonstration: have them estimate how many classmates remember their outfit from yesterday; then poll.', 'Explicitly link the gap between estimate and reality to "formal operations allows thinking about thinking, but early.', 'Assign a 3-day "spotlight log": record moments of feeling watched, then note actual evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_03_011', difficulty: 'standard',
          question: 'Adulthood and old age represent the final two major stages of the human.',
          hint: 'Revisit c11_psy_cbse_03_006 (Erikson\'s Stages) and c11_psy_cbse_03_002 (Life-Span.',
          misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the experience of widowhood for an 80-year-old woman in a traditional joint family in rural Uttar Pradesh versus an 80-year-old woman.', answer: 'Rural joint family: Microsystem',
                  options: ['Rural joint family: Microsystem', 'same grief', 'ageing = uniform decline for everyone', 'retirement at 60 means old age starts'],
                  hint: 'Revisit c11_psy_cbse_03_006 (Erikson\'s Stages) and c11_psy_cbse_03_002 (Life-Span Perspective).',
                  misconception: 'Students believe that "ageing = uniform decline for everyone" and that developmental stages in adulthood are rigidly age-locked (e.g.' }
          ],
            remediations: { 'ageing-uniform-decline-for-everyone': { steps: ['Ask the student to list three 70+ year-old Indians they admire who are active (e.g., Ratan Tata, Amitabh Bachchan.', 'Have them re-read NCERT\'s "Old Age" section highlighting words: "active, energetic, creative," "openness to new.', 'Use a Venn diagram to separate "Normative Changes" (wrinkles, slower recall) from "Pathological Changes".', 'Assign a mini-interview with an older adult about their life-satisfaction sources — forces confrontation with real.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
