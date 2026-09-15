import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch02_p2: SimDef = {
    id: 'v3_c11_hs_ch02_p2',
    title: 'Understanding the Self · Part 2/2',
    subtitle: 'Split the description of you from the verdict on you.',
    classLevel: 11, subject: 'home_science', topic: 'Understanding the Self · Part 2/2',
    chapters: ['c11_hs_ch02'],
    nodeIds: ['c11_hs_cbse_02_007', 'c11_hs_cbse_02_008', 'c11_hs_cbse_02_009', 'c11_hs_cbse_02_010', 'c11_hs_cbse_02_011', 'c11_hs_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a counsellor separating what a teen is from what they demand of themselves', intro: '\'I am lazy\' is a description; \'I am worthless\' is a verdict — and they don\'t come from the same place.', goal: 'Distinguish self-concept from self-esteem and read the cultural \'we-self\' correctly.' },
    discovery: {
        question: 'Two students write the same self-description — \'average in studies, good at painting, short-tempered.\' One feels fine, one feels a failure. Same self-concept, different what?',
        options: ['Different self-esteem — worth is measured against each one\'s internalised ideal self, not against the description', 'Different memory — they recall different events', 'Different intelligence — one is more honest', 'Different personality type — optimist versus pessimist'],
        answer: 'Different self-esteem — worth is measured against each one\'s internalised ideal self, not against the description',
        hook: 'And \'I am a daughter, a sister, a Rajput\' isn\'t a weaker self — Indian selves often speak in \'we,\' and that\'s interdependence, not deficiency.',
    },
    teaching: [
        { title: 'Role Confusion and Identity Crisis in Adolescence', text: 'Role confusion is a psychosocial state during adolescence where an individual experiences uncertainty and inconsistency in integrating multiple social roles (student, child, friend, future.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort \'I am\' statements into bodily, emotional, mental, social and agentic selves, then test why positive affirmations can backfire.',
        labels: ['Role Confusion and Identity', 'Puberty and Pubescence: Physical', 'Cognitive and Emotional Changes', 'Real Self and Ideal', 'Factors Influencing Identity Formation', 'Self-Construction: How the Sense'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_008', title: 'Puberty and Pubescence: Physical and Biological Changes',
          caseStudy: { intro: 'Imagine you are looking at two Class 11 students: Rohan, who has a deep voice and facial hair, and Priya, who has just started menstruating but is shorter than.',
            decisions: [{ prompt: 'Define pubescence and state the typical age range for its onset in Indian girls and boys as per the NCERT textbook.', options: [
                { text: 'Pubescence is the period during', outcome: 'Pubescence is the period during which physical and biological changes occur leading to the.' },
                { text: 'Distinguish between', outcome: 'Not quite — **Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the.', reveals: 'misconception-puberty-and-pubescence-are' },
                { text: 'pubescence starts at 14 for girls or confusing it with puberty', outcome: 'Not quite — **Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the.', reveals: 'misconception-puberty-and-pubescence-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_009', title: 'Cognitive and Emotional Changes During Adolescence',
          caseStudy: { intro: 'Imagine a Class 11 student, Rohan, who spends 40 minutes choosing a shirt for a family function, convinced everyone will notice if the collar isn\'t perfect.',
            decisions: [{ prompt: 'Define "imaginary audience" and "personal fable" as described by David Elkind. How do they differ in their cognitive mechanism?', options: [
                { text: 'Imaginary audience: The adolescent\'s belief that others are constantly observing and', outcome: 'Imaginary audience: The adolescent\'s belief that others are constantly observing and evaluating.' },
                { text: 'self-centeredness', outcome: 'Not quite — Students believe "abstract thinking" means "thinking about vague things" and equate imaginary.', reveals: 'abstract-thinking-means-thinking-about' },
                { text: 'abstract thinking', outcome: 'Not quite — Students believe "abstract thinking" means "thinking about vague things" and equate imaginary.', reveals: 'abstract-thinking-means-thinking-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_010', title: 'Real Self and Ideal Self: Development and Relationship',
          caseStudy: { intro: 'Imagine you\'re scrolling through Instagram and see a peer who seems to have perfect grades, a fitness routine, and confident social life — you think, "I wish.',
            decisions: [{ prompt: 'Define "real self" and "ideal self" in your own words, and state the developmental period when the distinction between them first becomes.', options: [
                { text: 'Real self: the individual\'s current, experience-based perception of their actual traits,', outcome: 'Real self: the individual\'s current, experience-based perception of their actual traits, abilities.' },
                { text: 'ideal self', outcome: 'Not quite — Students believe the "ideal self" is simply "who I want to be when I grow up" (a future career.', reveals: 'the-ideal-self-is-simply' },
                { text: 'who I want to be when I grow up', outcome: 'Not quite — Students believe the "ideal self" is simply "who I want to be when I grow up" (a future career.', reveals: 'the-ideal-self-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_011', title: 'Factors Influencing Identity Formation: Family, Peers and Socio-Cultural Context',
          caseStudy: { intro: 'Imagine a 16-year-old student, Priya, who wears jeans and listens to K-pop with her friends, but switches to a salwar-kameez and helps with puja at home, while.',
            decisions: [{ prompt: 'What are the three primary categories of external influences on identity formation discussed in this topic?', options: [
                { text: 'The three primary categories are family, peers, and socio-cultural context', outcome: 'The three primary categories are family, peers, and socio-cultural context.' },
                { text: 'family and friends', outcome: 'Not quite — Students often believe that identity formation is a simple additive process: family gives you some.', reveals: 'identity-formation-is-a-simple' },
                { text: 'hormones', outcome: 'Not quite — Students often believe that identity formation is a simple additive process: family gives you some.', reveals: 'identity-formation-is-a-simple' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_012', title: 'Self-Construction: How the Sense of Self Develops Across the Lifespan',
          caseStudy: { intro: 'Imagine you are looking at your childhood photos: at age 2 you\'re touching your reflection in a mirror, at age 5 you\'re proudly declaring "I can tie.',
            decisions: [{ prompt: 'A 14-month-old infant has a red dot placed on their forehead and is placed before a mirror.', options: [
                { text: 'The infant touching the reflection indicates NO self-awareness', outcome: 'The infant touching the reflection indicates NO self-awareness — they perceive the mirror image.' },
                { text: 'this shows self-awareness', outcome: 'Not quite — Students believe self-construction is a LINEAR, STAGE-LIKE progression where each phase.', reveals: 'self-construction-is-a-linear' },
                { text: 'this happens at 3 years', outcome: 'Not quite — Students believe self-construction is a LINEAR, STAGE-LIKE progression where each phase.', reveals: 'self-construction-is-a-linear' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'Understanding the Self · Part 2/2', spots: [
            { id: 's1', label: 'Role Confusion and Identity Crisis in Adolescence', prompt: 'Which idea is this? — Role confusion is a psychosocial state during adolescence where an individual experiences.', answer: 'Role Confusion and Identity Crisis in Adolescence', options: ['Role Confusion and Identity Crisis in Adolescence', 'Puberty and Pubescence Physical and Biological Changes', 'Cognitive and Emotional Changes During Adolescence', 'Real Self and Ideal Self Development and Relationship'] },
            { id: 's2', label: 'Puberty and Pubescence Physical and Biological Changes', prompt: 'Which idea is this? — Puberty is the specific point in time when an individual attains sexual maturity, marked.', answer: 'Puberty and Pubescence Physical and Biological Changes', options: ['Puberty and Pubescence Physical and Biological Changes', 'Role Confusion and Identity Crisis in Adolescence', 'Cognitive and Emotional Changes During Adolescence', 'Real Self and Ideal Self Development and Relationship'] },
            { id: 's3', label: 'Cognitive and Emotional Changes During Adolescence', prompt: 'Which idea is this? — Cognitive changes during adolescence refer to the developmental shift from concrete.', answer: 'Cognitive and Emotional Changes During Adolescence', options: ['Cognitive and Emotional Changes During Adolescence', 'Role Confusion and Identity Crisis in Adolescence', 'Puberty and Pubescence Physical and Biological Changes', 'Real Self and Ideal Self Development and Relationship'] },
            { id: 's4', label: 'Real Self and Ideal Self Development and Relationship', prompt: 'Which idea is this? — The real self is an individual\'s current, actual perception of their own attributes.', answer: 'Real Self and Ideal Self Development and Relationship', options: ['Real Self and Ideal Self Development and Relationship', 'Role Confusion and Identity Crisis in Adolescence', 'Puberty and Pubescence Physical and Biological Changes', 'Cognitive and Emotional Changes During Adolescence'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a self-awareness workshop, students sort \'I am\' statements into personal vs social self. Priya files \'I am a daughter\' (thought silently) under personal because \'it\'s private\', and \'I am intelligent, helpful, artistic\' under \'high self-esteem guaranteed.\'',
            decisions: [{ prompt: 'Where do her classifications slip?', options: [
                { text: 'Sort by relationality, not visibility: \'daughter\' is social self even when private — the role structurally requires another person — while ability claims are personal even when publicly tested. And self-concept isn\'t self-esteem: \'I am X\' is description; esteem is the evaluative judgement of X against internalised standards — an \'intelligent, artistic\' student can still have low self-esteem if her standard is \'best at everything\'.', outcome: 'The workshop gains its core distinction: personal/social marks whether the attribute needs others to exist, and esteem is a judgement, not a trait list.' },
                { text: 'Accept her sorting — private thoughts are personal, public roles are social.', outcome: 'Visibility is the wrong axis: a silently-held family role is still social because the identity only exists in relation to others.', reveals: 'private-equals-personal' },
                { text: 'Agree on the esteem point — positive self-descriptions automatically mean high self-esteem.', outcome: 'Esteem is measured against internal standards, not the positivity of the list — high self-concept with unreachable ideals produces low self-esteem.', reveals: 'positive-traits-equal-high-esteem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'Self-concept is the description; self-esteem is the gap between it and the standard you absorbed — change the standard and the same you scores differently.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_007', difficulty: 'standard',
          question: 'Role confusion is a psychosocial state during adolescence where an individual.',
          hint: 'Re-read c11_hs_cbse_02_005 "Self during Adolescence" focusing on the five bullet-point.',
          misconception: 'Students commonly believe that \'identity crisis\' means a mental breakdown or clinical depression requiring therapy.',
          parts: [
                { id: 'a', prompt: 'Compare how role confusion manifests differently in two cultural contexts: (a) a rural Indian adolescent in a traditional occupation (e.g., farming family) and.', answer: 'In the rural context, role continuity is high',
                  options: ['In the rural context, role continuity is high', 'urban adolescents have it easier'],
                  hint: 'Re-read c11_hs_cbse_02_005 "Self during Adolescence" focusing on the five bullet-point.',
                  misconception: 'Students commonly believe that \'identity crisis\' means a mental breakdown or clinical depression requiring therapy, because the word.' }
          ],
            remediations: { 'students-commonly-believe-that-identity': { steps: ['If a student equates identity crisis with mental illness: **Step 1** — Ask them to locate the textbook sentence: "The.', 'are a normal part of development." **Step 2** — Contrast two scenarios: (a) Rohan, 16, feels torn between medicine and.', '(b) Rohan, 16, says "I am nothing," refuses all activities, sleeps 16 hours, expresses hopelessness — this may indicate.', '**Step 3** — Have them re-read Marcia\'s statuses: diffusion (apathy, no exploration) is the unhealthy outcome.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_008', difficulty: 'standard',
          question: 'Puberty is the specific point in time when an individual attains sexual.',
          hint: 'If stuck on the sequence, revisit **Class 10 Biology Chapter 9 (Heredity and Evolution).',
          misconception: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the.',
          parts: [
                { id: 'a', prompt: 'Define pubescence and state the typical age range for its onset in Indian girls and boys as per the NCERT textbook.', answer: 'Pubescence is the period during',
                  options: ['Pubescence is the period during', 'Distinguish between', 'pubescence starts at 14 for girls or confusing it with puberty'],
                  hint: 'If stuck on the sequence, revisit **Class 10 Biology Chapter 9 (Heredity and Evolution) -> Sex.',
                  misconception: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the sequence of changes.' },
                { id: 'b', prompt: 'A Class 11 student claims, "Menarche is the first sign of puberty in girls." Using the NCERT sequence of changes for girls, explain why this statement.', answer: 'The statement is inaccurate',
                  options: ['The statement is inaccurate', 'menarche', 'start of puberty', 'Distinguish between'],
                  hint: 'If stuck on the sequence, revisit **Class 10 Biology Chapter 9 (Heredity and Evolution) -> Sex.',
                  misconception: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the sequence of changes.' },
                { id: 'c', prompt: 'Rohan (14 years) and Amit (14 years) are classmates. Rohan has developed kinky pubic hair and his voice is deepening; Amit has only straight pigmented pubic.', answer: '**Rohan is further along.** Sequence for boys: 1',
                  options: ['**Rohan is further along.** Sequence for boys: 1', 'Distinguish between', 'Amit is ahead because he is taller'],
                  hint: 'If stuck on the sequence, revisit **Class 10 Biology Chapter 9 (Heredity and Evolution) -> Sex.',
                  misconception: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the sequence of changes.' }
          ],
            remediations: { 'misconception-puberty-and-pubescence-are': { steps: ['Terminology Sort.** Create two cards: "PUBESCENCE (Process/Journey)" and "PUBERTY (Event/Milestone)".', 'Sequence Strips.** Give paper strips with the 6-9 changes for girls and boys (mixed).', 'The "Why" Bridge.** Ask: "Why does the textbook say girls\' growth spurt is *before* menarche but boys\' is *after*.', 'Exam Drill.** Practice one 3-marker: "List the sequence of changes in boys up to spermarche" and one 2-marker.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Pubescence is a universal biological process, therefore all adolescents experience identity development in the same way." Use the.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'Distinguish between'],
                  hint: 'If stuck on the sequence, revisit **Class 10 Biology Chapter 9 (Heredity and Evolution) -> Sex.',
                  misconception: '**Misconception:** "Puberty and pubescence are synonyms; menarche/spermarche is the *start* of the process; and the sequence of changes.' }
          ],
            remediations: { 'misconception-puberty-and-pubescence-are': { steps: ['Terminology Sort.** Create two cards: "PUBESCENCE (Process/Journey)" and "PUBERTY (Event/Milestone)".', 'Sequence Strips.** Give paper strips with the 6-9 changes for girls and boys (mixed).', 'The "Why" Bridge.** Ask: "Why does the textbook say girls\' growth spurt is *before* menarche but boys\' is *after*.', 'Exam Drill.** Practice one 3-marker: "List the sequence of changes in boys up to spermarche" and one 2-marker.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_009', difficulty: 'standard',
          question: 'Cognitive changes during adolescence refer to the developmental shift from.',
          hint: 'Revisit c10_bio_cbse_02_004 (Human Brain: Forebrain functions) and practice generating.',
          misconception: 'Students believe "abstract thinking" means "thinking about vague things" and equate imaginary audience with normal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cognitive changes during adolescence refer to the developmental shift from concrete to',
                  options: ['Cognitive changes during adolescence refer to the developmental shift from concrete to', 'The **self** is the totality of a person\'s experiences, ideas, thoughts, and feelings', 'Self-concept is the cognitive-descriptive component of the self, representing the', 'Identity is the enduring sense of self that provides continuity and sameness across time'],
                  hint: 'Revisit c10_bio_cbse_02_004 (Human Brain: Forebrain functions) and practice generating.',
                  misconception: 'Students believe "abstract thinking" means "thinking about vague things" and equate imaginary audience with normal self-consciousness.' }
          ],
            remediations: { 'abstract-thinking-means-thinking-about': { steps: ['Use the "mirror test" analogy: Ask student to describe what a 5-year-old thinks when seeing herself in a mirror vs.', 'Give a concrete-to-abstract ladder task: "Write 3 thoughts a Class 6 student has about \'future career.\' Then write 3.', 'Show a 2-minute video of a toddler hiding by covering eyes (egocentrism: "I can\'t see you → you can\'t see me") vs.', 'Assign the "Thought Court" worksheet: Student writes one imaginary audience thought, then cross-examines it as defense.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_010', difficulty: 'standard',
          question: 'The real self is an individual\'s current, actual perception of their own.',
          hint: 'Revisit c11_hs_cbse_02_002 (Self-Concept and Self-Esteem) — specifically the distinction.',
          misconception: 'Students believe the "ideal self" is simply "who I want to be when I grow up" (a future career role), confusing it with.',
          parts: [
                { id: 'a', prompt: 'A 14-year-old girl writes in her journal: "I\'m so lazy and undisciplined.', answer: 'Real self: "I\'m so lazy and undisciplined',
                  options: ['Real self: "I\'m so lazy and undisciplined', 'hormones', 'peer pressure', 'ideal self'],
                  hint: 'Revisit c11_hs_cbse_02_002 (Self-Concept and Self-Esteem) — specifically the distinction between.',
                  misconception: 'Students believe the "ideal self" is simply "who I want to be when I grow up" (a future career role), confusing it with *vocational.' },
                { id: 'b', prompt: 'Compare how the real-ideal self gap manifests differently for an adolescent girl in a traditional joint family in rural Rajasthan versus an adolescent boy in.', answer: 'source of ideal self standards, (',
                  options: ['source of ideal self standards, (', 'ideal self', 'who I want to be when I grow up'],
                  hint: 'Revisit c11_hs_cbse_02_002 (Self-Concept and Self-Esteem) — specifically the distinction between.',
                  misconception: 'Students believe the "ideal self" is simply "who I want to be when I grow up" (a future career role), confusing it with *vocational.' }
          ],
            remediations: { 'the-ideal-self-is-simply': { steps: ['Ask the student to list 5 traits of their "ideal self" *right now* (not future job).', 'For each trait, ask: "What would someone *see you doing* today if you had this trait?" — forcing behavioral.', 'Compare each to a real self behavior from yesterday.', 'Explicitly label: "This *set of trait-behavior pairs* is your ideal self-schema.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_011', difficulty: 'standard',
          question: 'Identity formation during adolescence is the dynamic process through which.',
          hint: 'If stuck, revisit node c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and.',
          misconception: 'Students often believe that identity formation is a simple additive process: family gives you some traits, peers give.',
          parts: [
                { id: 'a', prompt: 'What are the three primary categories of external influences on identity formation discussed in this topic?', answer: 'The three primary categories are family, peers, and socio-cultural context',
                  options: ['The three primary categories are family, peers, and socio-cultural context', 'family and friends', 'hormones', 'lists only two categories (e'],
                  hint: 'If stuck, revisit node c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and the.',
                  misconception: 'Students often believe that identity formation is a simple additive process: family gives you some traits, peers give others, and culture.' },
                { id: 'b', prompt: 'A 15-year-old boy from a traditional joint family in Rajasthan wants to become a dancer, but his family expects him to join the family jewelry business.', answer: 'Step 1: Identify the three sources',
                  options: ['Step 1: Identify the three sources', 'family pressure'],
                  hint: 'If stuck, revisit node c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and the.',
                  misconception: 'Students often believe that identity formation is a simple additive process: family gives you some traits, peers give others, and culture.' },
                { id: 'c', prompt: 'Compare how identity formation differs for an adolescent in a traditional Indian village where occupational roles are fixed, versus an adolescent in urban.', answer: 'In the traditional village, identity is largely ascribed',
                  options: ['In the traditional village, identity is largely ascribed', 'no identity', 'complete freedom'],
                  hint: 'If stuck, revisit node c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and the.',
                  misconception: 'Students often believe that identity formation is a simple additive process: family gives you some traits, peers give others, and culture.' }
          ],
            remediations: { 'identity-formation-is-a-simple': { steps: ['If a student exhibits this misconception, use a three-step remediation: 1) Have them complete a "Context Mapping".', '2) Guide them to identify at least two situations where influences conflict (e.g., parents want early marriage, peers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_012', difficulty: 'standard',
          question: 'Self-construction is the lifelong, dynamic process through which individuals.',
          hint: 'Revisit c11_hs_cbse_02_002 (self-concept vs self-esteem) and c11_hs_cbse_02_004 (infancy.',
          misconception: 'Students believe self-construction is a LINEAR, STAGE-LIKE progression where each phase is "completed" before the next.',
          parts: [
                { id: 'a', prompt: 'A 14-month-old infant has a red dot placed on their forehead and is placed before a mirror. The infant reaches out to touch the reflection\'s forehead.', answer: 'The infant touching the reflection indicates NO self-awareness',
                  options: ['The infant touching the reflection indicates NO self-awareness', 'this shows self-awareness', 'this happens at 3 years', 'completed'],
                  hint: 'Revisit c11_hs_cbse_02_002 (self-concept vs self-esteem) and c11_hs_cbse_02_004 (infancy.',
                  misconception: 'Students believe self-construction is a LINEAR, STAGE-LIKE progression where each phase is "completed" before the next begins (e.g.' }
          ],
            remediations: { 'self-construction-is-a-linear': { steps: ['Have the student create a 4×4 matrix (Life Stages × Influences) and fill ONE cell at a time using text evidence — e.g.', 'Ask them to find TEXTUAL examples of OVERLAP (e.g., adolescent still concerned with physical appearance = infancy.', 'Use the Radha (3yr) vs 9yr-old vs adolescent comparison to practice identifying STAGE-SPECIFIC STRUCTURES, not just.', 'Clarify "crisis" = developmental task conflict, not mental illness — have them list 3 normal adolescent dilemmas from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
