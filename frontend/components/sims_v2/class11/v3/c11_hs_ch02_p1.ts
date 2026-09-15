import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch02_p1: SimDef = {
    id: 'v3_c11_hs_ch02_p1',
    title: 'Understanding the Self · Part 1/2',
    subtitle: 'Split the description of you from the verdict on you.',
    classLevel: 11, subject: 'home_science', topic: 'Understanding the Self · Part 1/2',
    chapters: ['c11_hs_ch02'],
    nodeIds: ['c11_hs_cbse_02_001', 'c11_hs_cbse_02_002', 'c11_hs_cbse_02_003', 'c11_hs_cbse_02_004', 'c11_hs_cbse_02_005', 'c11_hs_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a counsellor separating what a teen is from what they demand of themselves', intro: '\'I am lazy\' is a description; \'I am worthless\' is a verdict — and they don\'t come from the same place.', goal: 'Distinguish self-concept from self-esteem and read the cultural \'we-self\' correctly.' },
    discovery: {
        question: 'Two students write the same self-description — \'average in studies, good at painting, short-tempered.\' One feels fine, one feels a failure. Same self-concept, different what?',
        options: ['Different self-esteem — worth is measured against each one\'s internalised ideal self, not against the description', 'Different memory — they recall different events', 'Different intelligence — one is more honest', 'Different personality type — optimist versus pessimist'],
        answer: 'Different self-esteem — worth is measured against each one\'s internalised ideal self, not against the description',
        hook: 'And \'I am a daughter, a sister, a Rajput\' isn\'t a weaker self — Indian selves often speak in \'we,\' and that\'s interdependence, not deficiency.',
    },
    teaching: [
        { title: 'Concept of Self: Definition and Dimensions', text: 'The **self** is the totality of a person\'s experiences, ideas, thoughts, and feelings with regard to themselves — the characteristic way in which an individual defines themselves.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort \'I am\' statements into bodily, emotional, mental, social and agentic selves, then test why positive affirmations can backfire.',
        labels: ['Concept of Self: Definition', 'Self-Concept and Self-Esteem: Meaning', 'Identity: Personal and Social', 'Self-Awareness and Self-Understanding Across', 'Self During Adolescence: Abstract', 'Adolescence as a Critical'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_001', title: 'Concept of Self: Definition and Dimensions',
          caseStudy: { intro: 'Imagine you are asked to introduce yourself in a new college group — you might say "I\'m Ananya, I love painting, I\'m the eldest daughter, I get anxious before.',
            decisions: [{ prompt: 'A student writes these "I am" statements: "I am 5\'6" tall. I am a good listener. I am a daughter. I am scared of dogs.', options: [
                { text: '**Correct classification:** "I am 5\'6" tall" → Personal Self (bodily characteristic', outcome: '**Correct classification:** "I am 5\'6" tall" → Personal Self (bodily characteristic unique.' },
                { text: 'daughter', outcome: 'Not quite — **Misconception:** *"Personal self = private thoughts; Social self = public behaviour."* Students.', reveals: 'misconception-personal-self-private-thoughts' },
                { text: 'Personal self = private thoughts', outcome: 'Not quite — **Misconception:** *"Personal self = private thoughts; Social self = public behaviour."* Students.', reveals: 'misconception-personal-self-private-thoughts' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_002', title: 'Self-Concept and Self-Esteem: Meaning and Relationship',
          caseStudy: { intro: 'Imagine a Class 11 student, Rohan, who writes in his journal: "I am lazy and stupid" (self-concept statement) and then feels worthless (self-esteem feeling).',
            decisions: [{ prompt: 'A student writes: "I am a bad friend because I forgot my best friend\'s birthday." Identify which part of this statement reflects.', options: [
                { text: 'Self-concept: "I forgot my best friend\'s birthday" (descriptive, factual claim about', outcome: 'Self-concept: "I forgot my best friend\'s birthday" (descriptive, factual claim about behaviour).' },
                { text: 'distinguish with examples', outcome: 'Not quite — Students equate self-concept and self-esteem as synonyms ("how you see yourself") and believe.', reveals: 'students-equate-self-concept-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_003', title: 'Identity: Personal and Social Dimensions',
          caseStudy: { intro: 'Begin by asking: "When someone asks \'Who are you?\', do you answer with your name and personality traits, or with your family name, religion, and role as.',
            decisions: [{ prompt: 'Define personal identity and social identity in one sentence each, giving one original example for each from an Indian adolescent\'s life.', options: [
                { text: 'Personal identity: The unique combination of traits, abilities, and characteristics that', outcome: 'Personal identity: The unique combination of traits, abilities, and characteristics that.' },
                { text: 'student, daughter', outcome: 'Not quite — Students often think personal identity = "what I do alone" and social identity = "what I do with.', reveals: 'personal-identity-what-i-do' },
                { text: 'what I do alone', outcome: 'Not quite — Students often think personal identity = "what I do alone" and social identity = "what I do with.', reveals: 'personal-identity-what-i-do' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_004', title: 'Self-Awareness and Self-Understanding Across Infancy and Childhood',
          caseStudy: { intro: 'Imagine you are observing a 15-month-old toddler playing in front of a mirror.',
            decisions: [{ prompt: 'A researcher places a red dot on the nose of a 14-month-old infant and places the infant in front of a mirror.', options: [
                { text: 'The infant lacks self-awareness', outcome: 'The infant lacks self-awareness; touching the reflection indicates the infant perceives the mirror.' },
                { text: 'the infant is self-aware', outcome: 'Not quite — Students believe self-awareness and self-concept appear simultaneously at 18 months because the.', reveals: 'self-awareness-and-self-concept' },
                { text: 'that is me', outcome: 'Not quite — Students believe self-awareness and self-concept appear simultaneously at 18 months because the.', reveals: 'self-awareness-and-self-concept' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_005', title: 'Self During Adolescence: Abstract Descriptions and Contradictions',
          caseStudy: { intro: 'Begin by asking: "When a 14-year-old writes \'I am thoughtful\' in a diary, then crosses it out and writes \'I am actually impulsive,\' what cognitive shift allows.',
            decisions: [{ prompt: 'A student writes: "I am tall, I have a bicycle, I can run fast." Another writes: "I am introspective, I value honesty, I sometimes.', options: [
                { text: 'First student: middle childhood (concrete, absolute, physical/behavioral descriptors)', outcome: 'First student: middle childhood (concrete, absolute, physical/behavioral descriptors).' },
                { text: 'contradictions in self-description', outcome: 'Not quite — Students equate "contradictions in self-description" with "identity confusion" or "being fake.".', reveals: 'students-equate-contradictions-in-self' },
                { text: 'identity confusion', outcome: 'Not quite — Students equate "contradictions in self-description" with "identity confusion" or "being fake.".', reveals: 'students-equate-contradictions-in-self' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_006', title: 'Adolescence as a Critical Period for Identity Development',
          caseStudy: { intro: 'Imagine you are 16 and your parents say "behave like an adult" at a family function but also say "you\'re too young to have an opinion" on the household budget.',
            decisions: [{ prompt: 'According to Erik Erikson, what is the primary psychosocial crisis of adolescence, and what are the two possible outcomes of this crisis?', options: [
                { text: 'The primary psychosocial crisis of adolescence is **Identity vs Role Confusion**', outcome: 'The primary psychosocial crisis of adolescence is **Identity vs Role Confusion**.' },
                { text: 'trust vs mistrust', outcome: 'Not quite — Students equate "identity crisis" with mental breakdown or pathology, and assume the Western model.', reveals: 'students-equate-identity-crisis-with' },
                { text: 'autonomy vs shame', outcome: 'Not quite — Students equate "identity crisis" with mental breakdown or pathology, and assume the Western model.', reveals: 'students-equate-identity-crisis-with' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'Understanding the Self · Part 1/2', spots: [
            { id: 's1', label: 'Concept of Self Definition and Dimensions', prompt: 'Which idea is this? — The **self** is the totality of a person\'s experiences, ideas, thoughts, and feelings.', answer: 'Concept of Self Definition and Dimensions', options: ['Concept of Self Definition and Dimensions', 'Self-Concept and Self-Esteem Meaning and Relationship', 'Identity Personal and Social Dimensions', 'Adolescence as a Critical Period for Identity Development'] },
            { id: 's2', label: 'Self-Concept and Self-Esteem Meaning and Relationship', prompt: 'Which idea is this? — Self-concept is the cognitive-descriptive component of the self, representing the.', answer: 'Self-Concept and Self-Esteem Meaning and Relationship', options: ['Self-Concept and Self-Esteem Meaning and Relationship', 'Concept of Self Definition and Dimensions', 'Identity Personal and Social Dimensions', 'Adolescence as a Critical Period for Identity Development'] },
            { id: 's3', label: 'Identity Personal and Social Dimensions', prompt: 'Which idea is this? — Identity is the enduring sense of self that provides continuity and sameness across time.', answer: 'Identity Personal and Social Dimensions', options: ['Identity Personal and Social Dimensions', 'Concept of Self Definition and Dimensions', 'Self-Concept and Self-Esteem Meaning and Relationship', 'Adolescence as a Critical Period for Identity Development'] },
            { id: 's4', label: 'Adolescence as a Critical Period for Identity Development', prompt: 'Which idea is this? — Adolescence is a critical period for identity development because it is the developmental.', answer: 'Adolescence as a Critical Period for Identity Development', options: ['Adolescence as a Critical Period for Identity Development', 'Concept of Self Definition and Dimensions', 'Self-Concept and Self-Esteem Meaning and Relationship', 'Identity Personal and Social Dimensions'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a self-awareness workshop, students sort \'I am\' statements into personal vs social self. Priya files \'I am a daughter\' (thought silently) under personal because \'it\'s private\', and \'I am intelligent, helpful, artistic\' under \'high self-esteem guaranteed.\'',
            decisions: [{ prompt: 'Where do her classifications slip?', options: [
                { text: 'Sort by relationality, not visibility: \'daughter\' is social self even when private — the role structurally requires another person — while ability claims are personal even when publicly tested. And self-concept isn\'t self-esteem: \'I am X\' is description; esteem is the evaluative judgement of X against internalised standards — an \'intelligent, artistic\' student can still have low self-esteem if her standard is \'best at everything\'.', outcome: 'The workshop gains its core distinction: personal/social marks whether the attribute needs others to exist, and esteem is a judgement, not a trait list.' },
                { text: 'Accept her sorting — private thoughts are personal, public roles are social.', outcome: 'Visibility is the wrong axis: a silently-held family role is still social because the identity only exists in relation to others.', reveals: 'private-equals-personal' },
                { text: 'Agree on the esteem point — positive self-descriptions automatically mean high self-esteem.', outcome: 'Esteem is measured against internal standards, not the positivity of the list — high self-concept with unreachable ideals produces low self-esteem.', reveals: 'positive-traits-equal-high-esteem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Self-concept is the description; self-esteem is the gap between it and the standard you absorbed — change the standard and the same you scores differently.',
            decisions: [{ prompt: 'What comes next? Understanding the Self · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Understanding the Self · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_001', difficulty: 'standard',
          question: 'The **self** is the totality of a person\'s experiences, ideas, thoughts, and.',
          hint: 'If stuck, revisit Class 8 Biology Chapter 2 "Mental Health: Stress, Anxiety, and.',
          misconception: '**Misconception:** *"Personal self = private thoughts; Social self = public behaviour."* Students believe the.',
          parts: [
                { id: 'a', prompt: 'Read the following case: *Rohan, 16, describes himself: "I am a science student. I am terrible at physics. I am the cricket captain. I am short-tempered.', answer: '**Correct mapping:** "I am a science student" → (d) Social role',
                  options: ['**Correct mapping:** "I am a science student" → (d) Social role', 'terrible at physics', 'Rajput', 'Personal self = private thoughts'],
                  hint: 'If stuck, revisit Class 8 Biology Chapter 2 "Mental Health: Stress, Anxiety, and Well-Being".',
                  misconception: '**Misconception:** *"Personal self = private thoughts; Social self = public behaviour."* Students believe the personal-social distinction.' }
          ],
            remediations: { 'misconception-personal-self-private-thoughts': { steps: ['**Step-by-step remediation:** (1) Ask the student to list 5 roles they occupy (daughter, student, friend, etc.) and 5.', '(2) For each role, ask: *"Can this exist without another specific person or group?"* — No (daughter needs parents.', 'For each trait, ask: *"Does this trait belong to you even if no one else knows it?"* — Yes (you are tall/kind/anxious.', '(3) Have them re-read NCERT: "Personal self has those aspects which relate **only to you** while social self refers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_002', difficulty: 'standard',
          question: 'Self-concept is the cognitive-descriptive component of the self, representing.',
          hint: 'Revisit c11_hs_cbse_02_001 Activity 1: re-do the "I am..." statements and categorise each.',
          misconception: 'Students equate self-concept and self-esteem as synonyms ("how you see yourself") and believe self-esteem.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Self-concept is the cognitive-descriptive component of the self, representing the',
                  options: ['Self-concept is the cognitive-descriptive component of the self, representing the', 'The **self** is the totality of a person\'s experiences, ideas, thoughts, and feelings', 'Identity is the enduring sense of self that provides continuity and sameness across time', 'Self-awareness is the mental representation of oneself as a distinct entity separate from'],
                  hint: 'Revisit c11_hs_cbse_02_001 Activity 1: re-do the "I am..." statements and categorise each.',
                  misconception: 'Students equate self-concept and self-esteem as synonyms ("how you see yourself") and believe self-esteem is *automatically* high.' }
          ],
            remediations: { 'students-equate-self-concept-and': { steps: ['Have the student complete NCERT Activity 1 ("I am..." x10).', 'Ask them to label each statement as D (description) or E (evaluation).', 'For every E statement, ask: "What standard are you using to judge this? Where did that standard come from?"', 'Show a case where identical D statements yield different E outcomes due to different standards (Priya/Rahul example).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate self-concept and self-esteem as synonyms ("how you see yourself") and believe self-esteem.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Improving self-esteem requires only changing negative self-concept statements to positive ones (e.g., \'I am stupid\' → \'I am smart\').".', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'standards largely influenced by society'],
                  hint: 'Revisit c11_hs_cbse_02_001 Activity 1: re-do the "I am..." statements and categorise each.',
                  misconception: 'Students equate self-concept and self-esteem as synonyms ("how you see yourself") and believe self-esteem is *automatically* high.' }
          ],
            remediations: { 'students-equate-self-concept-and': { steps: ['Have the student complete NCERT Activity 1 ("I am..." x10).', 'Ask them to label each statement as D (description) or E (evaluation).', 'For every E statement, ask: "What standard are you using to judge this? Where did that standard come from?"', 'Show a case where identical D statements yield different E outcomes due to different standards (Priya/Rahul example).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_003', difficulty: 'standard',
          question: 'Identity is the enduring sense of self that provides continuity and sameness.',
          hint: 'Revisit c11_hs_cbse_02_001 (Concept of Self) and c11_hs_cbse_02_002 (Self-Concept and.',
          misconception: 'Students often think personal identity = "what I do alone" and social identity = "what I do with others".',
          parts: [
                { id: 'a', prompt: 'Explain why the statement "I am honest" reflects personal identity while "I am a Rajput" reflects social identity, using the concepts of uniqueness and group.', answer: '"I am honest" reflects personal identity',
                  options: ['"I am honest" reflects personal identity', 'I feel them', 'what I do alone', 'what I do with others'],
                  hint: 'Revisit c11_hs_cbse_02_001 (Concept of Self) and c11_hs_cbse_02_002 (Self-Concept and Self-Esteem).',
                  misconception: 'Students often think personal identity = "what I do alone" and social identity = "what I do with others".' },
                { id: 'b', prompt: 'A 16-year-old girl from a traditional Gujarati family writes: "I am ambitious", "I am a Gujarati", "I want to be a doctor", "I am a sister".', answer: '"I am ambitious" → personal (unique trait)',
                  options: ['"I am ambitious" → personal (unique trait)', 'sister', 'what I do alone', 'what I do with others'],
                  hint: 'Revisit c11_hs_cbse_02_001 (Concept of Self) and c11_hs_cbse_02_002 (Self-Concept and Self-Esteem).',
                  misconception: 'Students often think personal identity = "what I do alone" and social identity = "what I do with others".' },
                { id: 'c', prompt: 'Compare how personal and social identity function differently when an adolescent moves from a village school to an urban English-medium school.', answer: 'Personal identity (traits, values, aspirations) provides internal continuity',
                  options: ['Personal identity (traits, values, aspirations) provides internal continuity', 'what I do alone', 'what I do with others'],
                  hint: 'Revisit c11_hs_cbse_02_001 (Concept of Self) and c11_hs_cbse_02_002 (Self-Concept and Self-Esteem).',
                  misconception: 'Students often think personal identity = "what I do alone" and social identity = "what I do with others".' }
          ],
            remediations: { 'personal-identity-what-i-do': { steps: ['Have the student list 10 "I am" statements.', 'For each, ask: "Does this statement require a group to exist for it to be true?" If yes → social identity (e.g., "I.', 'For social identities, ask: "What expectations come from this group?"', 'Discuss how the same person can hold conflicting social identities (e.g., "student" vs "employee") and how personal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_004', difficulty: 'standard',
          question: 'Self-awareness is the mental representation of oneself as a distinct entity.',
          hint: 'If stuck, revisit the "I am" activity in node 001 (Concept of Self) and the.',
          misconception: 'Students believe self-awareness and self-concept appear simultaneously at 18 months because the mirror test is famous.',
          parts: [
                { id: 'a', prompt: 'A researcher places a red dot on the nose of a 14-month-old infant and places the infant in front of a mirror.', answer: 'The infant lacks self-awareness',
                  options: ['The infant lacks self-awareness', 'the infant is self-aware', 'that is me', 'that is another baby'],
                  hint: 'If stuck, revisit the "I am" activity in node 001 (Concept of Self) and the.',
                  misconception: 'Students believe self-awareness and self-concept appear simultaneously at 18 months because the mirror test is famous.' },
                { id: 'b', prompt: 'Nine-year-old Priya says: "I am good at making friends. I am in the school choir. I can finish homework faster than my brother.', answer: 'Mapping: "good at making friends" → (a) internal psychological traits',
                  options: ['Mapping: "good at making friends" → (a) internal psychological traits', 'I am a boy', 'I am good'],
                  hint: 'If stuck, revisit the "I am" activity in node 001 (Concept of Self) and the.',
                  misconception: 'Students believe self-awareness and self-concept appear simultaneously at 18 months because the mirror test is famous.' }
          ],
            remediations: { 'self-awareness-and-self-concept': { steps: ['Draw a timeline (0-12 years) with three labelled phases: Infancy (0-2) — Mirror Test / Bodily Self; Early Childhood.', 'For each phase, write ONE keyword per characteristic (e.g., Infancy: "mirror"; Early: "physical, active, concrete.', 'Practice classifying 5 sample child statements into the correct phase using only the keywords.', 'Explain aloud why "I am taller than Rohan" cannot belong to early childhood.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_005', difficulty: 'standard',
          question: 'The adolescent self is characterized by abstract, psychological.',
          hint: 'Revisit node c11_hs_cbse_02_004 Activity 2: interview a 5-year-old, 9-year-old, and.',
          misconception: 'Students equate "contradictions in self-description" with "identity confusion" or "being fake." They think: "If I say.',
          parts: [
                { id: 'a', prompt: 'A 15-year-old says: "I am shy with strangers but loud with friends — so I don\'t know who I really am." Explain why this statement reflects normative adolescent.', answer: 'Correct answer: The adolescent holds context-dependent self-views (shy vs',
                  options: ['Correct answer: The adolescent holds context-dependent self-views (shy vs', 'possible selves', 'identity disorder', 'contradictions in self-description'],
                  hint: 'Revisit node c11_hs_cbse_02_004 Activity 2: interview a 5-year-old, 9-year-old, and 13-year-old.',
                  misconception: 'Students equate "contradictions in self-description" with "identity confusion" or "being fake." They think: "If I say I\'m kind but act.' },
                { id: 'b', prompt: 'Anjali (16) wants to be a veterinarian (ideal self) but struggles in biology and feels queasy during dissection (real self).', answer: 'Step 1: Real self = current academic difficulty + physiological reaction',
                  options: ['Step 1: Real self = current academic difficulty + physiological reaction', 'she should study harder', 'contradictions in self-description', 'identity confusion'],
                  hint: 'Revisit node c11_hs_cbse_02_004 Activity 2: interview a 5-year-old, 9-year-old, and 13-year-old.',
                  misconception: 'Students equate "contradictions in self-description" with "identity confusion" or "being fake." They think: "If I say I\'m kind but act.' },
                { id: 'c', prompt: 'Compare how "imaginary audience" (Elkind) manifests differently for: (a) a 14-year-old boy in a Delhi government school with uniform policy, and (b).', answer: 'a 14-year-old boy in a Delhi government school with uniform policy, and (',
                  options: ['a 14-year-old boy in a Delhi government school with uniform policy, and (', 'uniform eliminates imaginary audience', 'contradictions in self-description', 'identity confusion'],
                  hint: 'Revisit node c11_hs_cbse_02_004 Activity 2: interview a 5-year-old, 9-year-old, and 13-year-old.',
                  misconception: 'Students equate "contradictions in self-description" with "identity confusion" or "being fake." They think: "If I say I\'m kind but act.' }
          ],
            remediations: { 'students-equate-contradictions-in-self': { steps: ['Have the student create a "Context × Trait" matrix: rows = situations (with parents, with friends, alone, in class).', 'Fill each cell with a 1-5 rating.', 'Discuss: "Why does \'honest\' score 5 with parents but 3 with friends?"', 'Explain: Contradictions = differentiated self-knowledge, not confusion.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_02_006', difficulty: 'standard',
          question: 'Adolescence is a critical period for identity development because it is the.',
          hint: 'Revisit node c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and.',
          misconception: 'Students equate "identity crisis" with mental breakdown or pathology, and assume the Western model of independence.',
          parts: [
                { id: 'a', prompt: 'According to Erik Erikson, what is the primary psychosocial crisis of adolescence, and what are the two possible outcomes of this crisis?', answer: 'The primary psychosocial crisis of adolescence is **Identity vs Role Confusion**',
                  options: ['The primary psychosocial crisis of adolescence is **Identity vs Role Confusion**', 'trust vs mistrust', 'autonomy vs shame', 'identity crisis'],
                  hint: 'Revisit node c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and c11_hs_cbse_02_005.',
                  misconception: 'Students equate "identity crisis" with mental breakdown or pathology, and assume the Western model of independence (separation from.' },
                { id: 'b', prompt: 'A 14-year-old boy in a traditional weaving community in Gujarat has been learning the family craft since age 10 and will take over the business at 18.', answer: 'The Mumbai adolescent is more likely to experience role confusion',
                  options: ['The Mumbai adolescent is more likely to experience role confusion', '**Step 3:** Recall textbook', 'traditional = suppressed identity', 'traditional = pre-structured identity with less decision burden'],
                  hint: 'Revisit node c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and c11_hs_cbse_02_005.',
                  misconception: 'Students equate "identity crisis" with mental breakdown or pathology, and assume the Western model of independence (separation from.' }
          ],
            remediations: { 'students-equate-identity-crisis-with': { steps: ['** Re-read textbook pages 15–16 (cultural variations section) and highlight every sentence contrasting Western and.', '** Create a two-column table: Column A = "Western cultural script for adolescent independence" (keywords: separation.', '** Identify the specific sentence: "In all cultures, however, adolescence is reported to be accompanied by dilemmas and.', '** Practice explaining to a peer: "Identity crisis is the normal developmental *work* of adolescence, not a disease.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
