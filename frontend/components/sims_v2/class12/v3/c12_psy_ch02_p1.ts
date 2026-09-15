import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch02_p1: SimDef = {
    id: 'v3_c12_psy_ch02_p1',
    title: 'Self and Personality · Part 1/2',
    subtitle: 'The self that writes and the self that\'s written',
    classLevel: 12, subject: 'psychology', topic: 'Self and Personality · Part 1/2',
    chapters: ['c12_psy_ch02'],
    nodeIds: ['c12_psy_cbse_02_001', 'c12_psy_cbse_02_002', 'c12_psy_cbse_02_003', 'c12_psy_cbse_02_004', 'c12_psy_cbse_02_005', 'c12_psy_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Identity mapper', intro: 'You wrote \'describe yourself in 50 words\' — and smuggled in two kinds of identity and a dual role for the self.', goal: 'Distinguish personal from social identity — and the self as subject and object across cultures.' },
    discovery: {
        question: '\'I am honest, a Hindu, a classical dancer, a daughter.\' A student files \'honest\' under social identity and \'Hindu\' under personal. What\'s backwards?',
        options: ['The criterion — personal identity is what individuates you (honest, dancer); social identity is group membership (Hindu, daughter). They swapped them', 'Both are social', 'Hindu is personal', 'Dancer is social'],
        answer: 'The criterion — personal identity is what individuates you (honest, dancer); social identity is group membership (Hindu, daughter). They swapped them',
        hook: 'The self is both the writer and the written — \'I am studying\' is subject; \'I am a student who procrastinates\' is object. And the Indian self-boundary shifts: it expands to include family at a festival, contracts to career in an interview — context moves the border, not the self.',
    },
    teaching: [
        { title: 'Concept of Self: Personal and Social Identity, Self as Subject and Object', text: 'The self is the totality of an individual\'s conscious experiences, ideas, thoughts, and feelings regarding themselves, defining their existence at both personal (unique attributes like name.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map a self-description: split personal from social identity, catch subject and object working in one sentence, and weigh how fixed versus shifting boundaries turn family-over-career into guilt in one culture and fulfilment in another.',
        labels: ['Concept of Self: Personal', 'Self-esteem, Self-efficacy and Self-regulation', 'Culture and Self: Western', 'Type Approaches to Personality', 'Trait Approaches: Allport\'s Cardinal/Central/Secondary', 'Eysenck\'s Personality Dimensions'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_001', title: 'Concept of Self: Personal and Social Identity, Self as Subject and Object',
          caseStudy: { intro: 'Imagine you are filling out a college application form that asks: "Describe yourself in 50 words." You write: "I am Priya, a classical dancer, a feminist,.',
            decisions: [{ prompt: 'A student writes: "My personal identity is that I am a Hindu, and my social identity is that I am honest." Identify the error in this.', options: [
                { text: 'The student has reversed the categories', outcome: 'The student has reversed the categories. Personal identity refers to unique attributes that.' },
                { text: 'differentiate', outcome: 'Not quite — Students conflate "social identity" with "social roles" and treat them as identical.', reveals: 'students-conflate-social-identity-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_002', title: 'Self-esteem, Self-efficacy and Self-regulation: Bandura\'s Social Learning Theory',
          caseStudy: { intro: 'Imagine a Class 12 student, Rohan, who wants to score 90% in Psychology but feels anxious about his ability.',
            decisions: [{ prompt: 'Define self-efficacy and state the theorist associated with its origin. How does it differ from self-esteem in terms of scope (global vs.', options: [
                { text: 'Self-efficacy is the belief in one\'s capability to organize and execute actions required', outcome: 'Self-efficacy is the belief in one\'s capability to organize and execute actions required to manage.' },
                { text: 'confidence', outcome: 'Not quite — Students often confuse self-efficacy with self-esteem, writing "self-efficacy is how much you like.', reveals: 'students-often-confuse-self-efficacy' },
                { text: 'self-efficacy is how much you like yourself', outcome: 'Not quite — Students often confuse self-efficacy with self-esteem, writing "self-efficacy is how much you like.', reveals: 'students-often-confuse-self-efficacy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_003', title: 'Culture and Self: Western Individualistic vs Indian Collectivistic Perspectives',
          caseStudy: { intro: 'Imagine an Indian student, Priya, who gets admitted to a university in the USA.',
            decisions: [{ prompt: 'Define "individualistic self" and "collectivistic self" in one sentence each, using the NCERT terminology of self-other boundary.', options: [
                { text: 'Individualistic self: A self-construal where the boundary between self and other is', outcome: 'Individualistic self: A self-construal where the boundary between self and other is relatively.' },
                { text: 'Individualistic self means selfish, collectivistic self means selfless', outcome: 'Not quite — Students often believe that "Indian collectivistic self means the person has no personal identity.', reveals: 'indian-collectivistic-self-means-the' },
                { text: 'This error arises', outcome: 'Not quite — Students often believe that "Indian collectivistic self means the person has no personal identity.', reveals: 'indian-collectivistic-self-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_004', title: 'Type Approaches to Personality: Hippocrates, Ayurveda, Sheldon, Jung and Type A/B/C/D',
          caseStudy: { intro: 'Imagine you are a school counsellor and two students walk in: one is constantly rushing, competitive, and gets angry when delayed; the other is relaxed.',
            decisions: [{ prompt: 'Name the four personality types proposed by Hippocrates and the bodily humour associated with each type.', options: [
                { text: 'The four types are: Sanguine (blood', outcome: 'The four types are: Sanguine (blood — cheerful, optimistic), Phlegmatic (phlegm — calm, sluggish).' },
                { text: '(dimension), writing', outcome: 'Not quite — Students treat all type theories as equivalent "personality tests" and believe a person can.', reveals: 'students-treat-all-type-theories' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_005', title: 'Trait Approaches: Allport\'s Cardinal/Central/Secondary Traits and Cattell\'s 16PF',
          caseStudy: { intro: 'Imagine you\'re writing a college recommendation letter for a friend.',
            decisions: [{ prompt: 'Define cardinal, central, and secondary traits in Allport\'s theory.', options: [
                { text: 'Cardinal trait: A single, pervasive disposition so dominant that virtually all behaviour', outcome: 'Cardinal trait: A single, pervasive disposition so dominant that virtually all behaviour revolves.' },
                { text: 'honesty', outcome: 'Not quite — Students treat Allport\'s three categories as a *trait list* (like "cardinal traits include honesty.', reveals: 'students-treat-allport-s-three' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_006', title: 'Eysenck\'s Personality Dimensions and the Five-Factor Model (Big Five)',
          caseStudy: { intro: 'Imagine two Class 12 students, Rohan and Priya, preparing for the same competitive exam.',
            decisions: [{ prompt: 'List Eysenck\'s three personality dimensions with their high and low pole labels exactly as given in NCERT.', options: [
                { text: 'Correct answer: (1) Extraversion vs', outcome: 'Correct answer: (1) Extraversion vs. Introversion, (2) Neuroticism vs.' },
                { text: 'Openness', outcome: 'Not quite — Students often treat Eysenck\'s Extraversion and Big Five Extraversion as identical because they.', reveals: 'students-often-treat-eysenck-s' },
                { text: 'Conscientiousness', outcome: 'Not quite — Students often treat Eysenck\'s Extraversion and Big Five Extraversion as identical because they.', reveals: 'students-often-treat-eysenck-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate spiralling before boards says three things: \'I\'m basically a failure,\' \'I can\'t crack organic chemistry no matter what,\' and \'I keep scrolling instead of revising.\'',
            decisions: [{ prompt: 'Map the three complaints to the three constructs correctly.', options: [
                { text: 'Self-esteem (\'I\'m a failure\' — global worth), self-efficacy (\'can\'t crack organic chem\' — domain-specific capability belief), and self-regulation (scrolling — the monitoring/directing process breaking down); three different levers, three different fixes.', outcome: 'The chapter\'s triage: evaluation of worth, belief about a specific task, and control of behaviour are distinct — \'he lacks confidence\' flattens all three into one vague problem.' },
                { text: 'All three are low self-esteem — the chemistry and scrolling are just symptoms.', outcome: 'Domain-specific doubt and failed self-monitoring aren\'t global worth judgments — a student can have intact self-esteem and still lack efficacy in chemistry; collapsing them loses the diagnosis the constructs exist to give.', reveals: 'everything-is-self-esteem' },
                { text: 'All three are poor self-regulation — fixing the scrolling fixes the rest.', outcome: 'Regulation directs behaviour but doesn\'t rewrite self-belief — better habits won\'t touch \'I\'m a failure\' or the specific efficacy doubt; the constructs travel together without being the same thing.', reveals: 'habits-fix-beliefs' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now dissect \'who am I\' into its parts — and see the boundary around \'I\' as something culture taught you to draw.',
            decisions: [{ prompt: 'What comes next? Self and Personality · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Self and Personality · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_001', difficulty: 'standard',
          question: 'The self is the totality of an individual\'s conscious experiences, ideas.',
          hint: 'Revisit c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and complete.',
          misconception: 'Students conflate "social identity" with "social roles" and treat them as identical.',
          parts: [
                { id: 'a', prompt: 'A student writes: "My personal identity is that I am a Hindu, and my social identity is that I am honest." Identify the error in this classification and state.', answer: 'The student has reversed the categories',
                  options: ['The student has reversed the categories', 'differentiate'],
                  hint: 'Revisit c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and complete Activity 2.1.',
                  misconception: 'Students conflate "social identity" with "social roles" and treat them as identical.' },
                { id: 'b', prompt: 'Explain in your own words what it means to say "the self is both a subject and an object." Give a real-life example that shows both roles operating.', answer: 'As a subject, the self is the active agent',
                  options: ['As a subject, the self is the active agent', 'self is what I know about myself', 'differentiate'],
                  hint: 'Revisit c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and complete Activity 2.1.',
                  misconception: 'Students conflate "social identity" with "social roles" and treat them as identical.' },
                { id: 'c', prompt: 'Rahul says: "When I am with my friends, I am loud and funny. When I am with my grandparents, I am quiet and respectful.', answer: 'Rahul is partially correct but conceptually imprecise',
                  options: ['Rahul is partially correct but conceptually imprecise', 'yes, he has multiple selves', 'no, self is always the same', 'differentiate'],
                  hint: 'Revisit c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and complete Activity 2.1.',
                  misconception: 'Students conflate "social identity" with "social roles" and treat them as identical.' }
          ],
            remediations: { 'students-conflate-social-identity-with': { steps: ['Have the student list 10 "I am..." statements (Activity 2.1 style).', 'Ask them to colour-code each statement: **Red** = unique to me (personal identity: traits, abilities, beliefs).', 'Discuss why "I am a Hindu" (Blue) ≠ "I am a student" (Green) — the former is an *ascribed cultural category*, the.', 'Re-attempt Diagnostic Question 1. If error persists, revisit c11_hs_cbse_02_003 (Identity: Personal and Social.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "social identity" with "social roles" and treat them as identical.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "The Indian concept of self is superior to the Western concept because it promotes harmony and reduces conflict." Use the.', answer: 'The NCERT presents both views as *cultural models*',
                  options: ['The NCERT presents both views as *cultural models*', 'differentiate'],
                  hint: 'Revisit c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and complete Activity 2.1.',
                  misconception: 'Students conflate "social identity" with "social roles" and treat them as identical.' },
                { id: 'b', prompt: 'Design a 5-item "Self-Boundary Mapping" activity for Class 12 students that would help them experientially discover the shifting nature of the Indian.', answer: 'Sample items (domains in parentheses): 1',
                  options: ['Sample items (domains in parentheses): 1', 'differentiate'],
                  hint: 'Revisit c11_hs_cbse_02_003 (Identity: Personal and Social Dimensions) and complete Activity 2.1.',
                  misconception: 'Students conflate "social identity" with "social roles" and treat them as identical.' }
          ],
            remediations: { 'students-conflate-social-identity-with': { steps: ['Have the student list 10 "I am..." statements (Activity 2.1 style).', 'Ask them to colour-code each statement: **Red** = unique to me (personal identity: traits, abilities, beliefs).', 'Discuss why "I am a Hindu" (Blue) ≠ "I am a student" (Green) — the former is an *ascribed cultural category*, the.', 'Re-attempt Diagnostic Question 1. If error persists, revisit c11_hs_cbse_02_003 (Identity: Personal and Social.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_002', difficulty: 'standard',
          question: 'Self-esteem is an individual\'s overall subjective evaluation of their own worth.',
          hint: 'Revisit c11_psy_cbse_05_006 (Observational Learning: Bandura\'s Modelling and Bobo Doll.',
          misconception: 'Students often confuse self-efficacy with self-esteem, writing "self-efficacy is how much you like yourself".',
          parts: [
                { id: 'a', prompt: 'Priya wants to stop procrastinating on her CUET preparation. She decides to: (a) record her study hours daily in a journal, (b) tell herself "Start with just.', answer: 'record her study hours daily in a journal, (',
                  options: ['record her study hours daily in a journal, (', 'self-instruction', 'self-efficacy is how much you like yourself', 'self-esteem is confidence in your abilities'],
                  hint: 'Revisit c11_psy_cbse_05_006 (Observational Learning: Bandura\'s Modelling and Bobo Doll Study).',
                  misconception: 'Students often confuse self-efficacy with self-esteem, writing "self-efficacy is how much you like yourself" or "self-esteem is confidence.' },
                { id: 'b', prompt: 'Compare and contrast how Bandura\'s social learning theory explains the development of self-efficacy versus how Skinner\'s operant conditioning would explain the.', answer: 'Bandura: Child observes others riding (vicarious learning), forms cognitive',
                  options: ['Bandura: Child observes others riding (vicarious learning), forms cognitive', 'self-efficacy is how much you like yourself', 'self-esteem is confidence in your abilities', 'willpower'],
                  hint: 'Revisit c11_psy_cbse_05_006 (Observational Learning: Bandura\'s Modelling and Bobo Doll Study).',
                  misconception: 'Students often confuse self-efficacy with self-esteem, writing "self-efficacy is how much you like yourself" or "self-esteem is confidence.' }
          ],
            remediations: { 'students-often-confuse-self-efficacy': { steps: ['If a student conflates self-efficacy and self-esteem: Step 1 — Have them write two statements: "I am a good person".', '"I can solve this calculus problem" (self-efficacy).', 'Step 2 — Ask: "Can you have high self-esteem but low self-efficacy for public speaking?" (Yes — e.g., a confident.', 'Step 3 — Re-read NCERT lines: "Self-efficacy is another important aspect of our self...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_003', difficulty: 'standard',
          question: 'The cultural perspective on self refers to how culture shapes the way.',
          hint: 'If unclear on personal vs social identity, re-read Node c12_psy_cbse_02_001 Section.',
          misconception: 'Students often believe that "Indian collectivistic self means the person has no personal identity, no autonomy, and.',
          parts: [
                { id: 'a', prompt: 'Rahul, raised in a traditional joint family in Varanasi, accepts a job in Mumbai against his parents\' wish that he stay nearby.', answer: 'Rahul\'s conflict arises',
                  options: ['Rahul\'s conflict arises', 'Rahul is torn between Indian and Western values', 'This error arises', 'and ignore the NCERT\'s explicit phrase'],
                  hint: 'If unclear on personal vs social identity, re-read Node c12_psy_cbse_02_001 Section "Kinds of Self".',
                  misconception: 'Students often believe that "Indian collectivistic self means the person has no personal identity, no autonomy, and always suppresses.' },
                { id: 'b', prompt: 'Compare the implications of fixed vs shifting self-boundary for (a) concept of privacy, (b) decision-making in career choice, and (c) expression.', answer: '| Domain | Fixed Boundary (Western Individualistic) | Shifting Boundary (Indian',
                  options: ['| Domain | Fixed Boundary (Western Individualistic) | Shifting Boundary (Indian', 'Indians never disagree', 'Westerners never care about family', 'This error arises'],
                  hint: 'If unclear on personal vs social identity, re-read Node c12_psy_cbse_02_001 Section "Kinds of Self".',
                  misconception: 'Students often believe that "Indian collectivistic self means the person has no personal identity, no autonomy, and always suppresses.' }
          ],
            remediations: { 'indian-collectivistic-self-means-the': { steps: ['Re-read NCERT pages 27-28, focusing on the paragraph starting "The most important distinction..." and Figure 2.1.', 'Revisit Node c12_psy_cbse_02_001 (Concept of Self: Personal and Social Identity) to reinforce that personal identity.', 'Watch a 5-minute video "Independent vs Interdependent Self" (search YouTube for "Markus Kitayama self-construal.', 'Re-attempt Diagnostic Question 2 and 3, writing answers that explicitly use the phrases "expands to include" and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_004', difficulty: 'standard',
          question: 'Type approaches to personality categorise individuals into discrete.',
          hint: 'Revisit the "Concept of Personality" subsection in NCERT Chapter 2 (before Major.',
          misconception: 'Students treat all type theories as equivalent "personality tests" and believe a person can be *only one type* across.',
          parts: [
                { id: 'a', prompt: 'Name the four personality types proposed by Hippocrates and the bodily humour associated with each type.', answer: 'The four types are: Sanguine (blood',
                  options: ['The four types are: Sanguine (blood', '(dimension), writing'],
                  hint: 'Revisit the "Concept of Personality" subsection in NCERT Chapter 2 (before Major Approaches) and.',
                  misconception: 'Students treat all type theories as equivalent "personality tests" and believe a person can be *only one type* across all systems.' },
                { id: 'b', prompt: 'A student writes: "In Ayurveda, a person with dominant vata dosha is calm, grounded, and gains weight easily." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', '(dimension), writing'],
                  hint: 'Revisit the "Concept of Personality" subsection in NCERT Chapter 2 (before Major Approaches) and.',
                  misconception: 'Students treat all type theories as equivalent "personality tests" and believe a person can be *only one type* across all systems.' },
                { id: 'c', prompt: 'Rohan is a national-level sprinter with a rectangular, muscular build, high energy, and courage.', answer: 'Rohan: Mesomorph',
                  options: ['Rohan: Mesomorph', '(dimension), writing'],
                  hint: 'Revisit the "Concept of Personality" subsection in NCERT Chapter 2 (before Major Approaches) and.',
                  misconception: 'Students treat all type theories as equivalent "personality tests" and believe a person can be *only one type* across all systems.' },
                { id: 'd', prompt: 'Compare Jung\'s introversion-extraversion typology with Friedman & Rosenman\'s Type A-Type B classification on two dimensions: (a) theoretical basis (what drives.', answer: 'theoretical basis (what drives the classification), and (',
                  options: ['theoretical basis (what drives the classification), and (', 'both predict health equally', 'Jung predicts CHD', '(dimension), writing'],
                  hint: 'Revisit the "Concept of Personality" subsection in NCERT Chapter 2 (before Major Approaches) and.',
                  misconception: 'Students treat all type theories as equivalent "personality tests" and believe a person can be *only one type* across all systems.' }
          ],
            remediations: { 'students-treat-all-type-theories': { steps: ['Have the student create a 5-column table: Theory | Basis of Classification | Types | Key Descriptors | NCERT Critique.', 'For each theory, write ONE real-life example of a person fitting each type (e.g., "My grandfather = kapha: calm, gains.', 'Ask: "Can a person be both vata and kapha?" → Discuss Ayurveda\'s prakriti as *dominant* dosha, not exclusive.', 'Contrast with trait approach (next node): "If shyness is a trait, you rate 1-10; if introversion is a type, you are.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_005', difficulty: 'standard',
          question: 'Trait approaches to personality conceptualize personality as a set of stable.',
          hint: 'If confused about trait vs type: Revisit c12_psy_cbse_02_004 "Type Approaches" — focus.',
          misconception: 'Students treat Allport\'s three categories as a *trait list* (like "cardinal traits include honesty, ambition...").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Trait approaches to personality conceptualize personality as a set of stable, enduring',
                  options: ['Trait approaches to personality conceptualize personality as a set of stable, enduring', 'The self is the totality of an individual\'s conscious experiences, ideas, thoughts, and', 'Self-esteem is an individual\'s overall subjective evaluation of their own worth and value', 'The cultural perspective on self refers to how culture shapes the way individuals define'],
                  hint: 'If confused about trait vs type: Revisit c12_psy_cbse_02_004 "Type Approaches" — focus on the.',
                  misconception: 'Students treat Allport\'s three categories as a *trait list* (like "cardinal traits include honesty, ambition...") rather than.' }
          ],
            remediations: { 'students-treat-allport-s-three': { steps: ['**Revisit the "pervasiveness" concept:** Take 3 people you know well.', 'Ask: "Does this trait explain their career, relationships, hobbies, and values?" Only traits answering YES are cardinal.', '**Visualize factor analysis:** Draw 20 surface traits as circles.', 'Draw arrows showing correlations.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_02_006', difficulty: 'standard',
          question: 'Eysenck\'s theory proposes three biologically-based personality dimensions.',
          hint: 'If stuck, revisit c12_psy_cbse_02_005 Allport\'s Trait Theory — focus on the section.',
          misconception: 'Students often treat Eysenck\'s Extraversion and Big Five Extraversion as identical because they share the same label.',
          parts: [
                { id: 'a', prompt: 'List Eysenck\'s three personality dimensions with their high and low pole labels exactly as given in NCERT.', answer: 'Correct answer: (1) Extraversion vs',
                  options: ['Correct answer: (1) Extraversion vs', 'Openness', 'Conscientiousness', 'How does Eysenck\'s view of extraversion differ from the Big Five?'],
                  hint: 'If stuck, revisit c12_psy_cbse_02_005 Allport\'s Trait Theory — focus on the section "Cattell.',
                  misconception: 'Students often treat Eysenck\'s Extraversion and Big Five Extraversion as identical because they share the same label.' },
                { id: 'b', prompt: 'Rahul scores high on Extraversion and low on Neuroticism in both Eysenck\'s EPQ and a Big Five inventory.', answer: 'Correct evaluation: The claim is false',
                  options: ['Correct evaluation: The claim is false', 'they measure the same thing', 'How does Eysenck\'s view of extraversion differ from the Big Five?'],
                  hint: 'If stuck, revisit c12_psy_cbse_02_005 Allport\'s Trait Theory — focus on the section "Cattell.',
                  misconception: 'Students often treat Eysenck\'s Extraversion and Big Five Extraversion as identical because they share the same label.' },
                { id: 'c', prompt: 'Analyse the following case using BOTH models: "Anjali is highly imaginative, enjoys abstract art, questions authority, keeps a messy room, misses appointments.', answer: 'Correct analysis: Eysenck: High Psychoticism (imaginative, questions authority,',
                  options: ['Correct analysis: Eysenck: High Psychoticism (imaginative, questions authority,', 'How does Eysenck\'s view of extraversion differ from the Big Five?'],
                  hint: 'If stuck, revisit c12_psy_cbse_02_005 Allport\'s Trait Theory — focus on the section "Cattell.',
                  misconception: 'Students often treat Eysenck\'s Extraversion and Big Five Extraversion as identical because they share the same label.' }
          ],
            remediations: { 'students-often-treat-eysenck-s': { steps: ['If the student conflates the two Extraversions: (1) Re-read NCERT Box 2.2 (Big Five) and the Eysenck section.', '(2) Make a two-column table: Column A = Eysenck\'s E descriptors (active, gregarious, impulsive, thrill-seeking); Column.', '(3) Highlight "impulsive, thrill-seeking" in Column A — note NCERT places these in Eysenck\'s E.', '(4) Check Big Five Conscientiousness pole: "impulsive" is explicitly the LOW pole.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
