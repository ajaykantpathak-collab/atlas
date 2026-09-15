import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch06_p1: SimDef = {
    id: 'v3_c12_psy_ch06_p1',
    title: 'Attitude and Social Cognition · Part 1/2',
    subtitle: 'She believes it, feels it — and still doesn\'t do it',
    classLevel: 12, subject: 'psychology', topic: 'Attitude and Social Cognition · Part 1/2',
    chapters: ['c12_psy_ch06'],
    nodeIds: ['c12_psy_cbse_06_001', 'c12_psy_cbse_06_002', 'c12_psy_cbse_06_003', 'c12_psy_cbse_06_004', 'c12_psy_cbse_06_005', 'c12_psy_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Attitude diagnostician', intro: 'Think, feel, do — an attitude is all three at once, and they\'re rarely in perfect agreement.', goal: 'Apply the A-B-C model of attitudes — and why components can disagree without the attitude vanishing.' },
    discovery: {
        question: 'Riya knows exercise is essential and feels great doing it — yet never exercises. Does she have a positive attitude toward it?',
        options: ['Yes — attitude is a latent A-B-C system; her behavioural component is weak but cognition and affect are strong, so the attitude exists, just misaligned', 'No — no action', 'Only halfway', 'It\'s a belief'],
        answer: 'Yes — attitude is a latent A-B-C system; her behavioural component is weak but cognition and affect are strong, so the attitude exists, just misaligned',
        hook: 'Knowing isn\'t an attitude — \'I know junk food is unhealthy\' is only the cognitive third. And a lecture on benefits rarely builds durable attitudes; an experience that engages feeling and doing builds consonance across all three components.',
    },
    teaching: [
        { title: 'Nature and Components of Attitudes: A-B-C (Affective, Behavioural, Cognitive) Model', text: 'An attitude is a learned predisposition to evaluate an attitude object (person, issue, object, or event) in a favourable or unfavourable manner, consisting of three interrelated components: the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Dissect attitudes into A-B-C: find the weak component in a real scenario, separate belief from value from attitude, and choose the strategy that builds a lasting one.',
        labels: ['Nature and Components', 'Features of Attitudes: Valence,', 'Attitude Formation: Learning by', 'Factors Influencing Attitude Formation', 'Attitude Change: Heider\'s Balance', 'Cognitive Dissonance Theory: Festinger'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_001', title: 'Nature and Components of Attitudes: A-B-C (Affective, Behavioural, Cognitive) Model',
          caseStudy: { intro: 'Begin by asking: "Think of something you feel strongly about — maybe a brand of phone, a political issue, or a school rule.',
            decisions: [{ prompt: 'A student says, "My attitude toward junk food is negative because I know it\'s unhealthy." Which component of the A-B-C model is this.', options: [
                { text: 'The student describes only the **cognitive component** (belief/knowledge that junk food', outcome: 'The student describes only the **cognitive component** (belief/knowledge that junk food.' },
                { text: 'If someone says they believe X, their attitude toward X is positive', outcome: 'Not quite — **Misconception:** "If someone says they believe X, their attitude toward X is positive." **Why.', reveals: 'misconception-if-someone-says-they' },
                { text: '* **Concrete wrong answer:**', outcome: 'Not quite — **Misconception:** "If someone says they believe X, their attitude toward X is positive." **Why.', reveals: 'misconception-if-someone-says-they' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_002', title: 'Features of Attitudes: Valence, Extremeness, Simplicity/Complexity and Centrality',
          caseStudy: { intro: 'Think about your attitude toward "online learning." Is it positive or negative (valence)? How strongly do you feel (extremeness)?',
            decisions: [{ prompt: 'A student rates her attitude toward "mandatory school uniforms" as 2 on a 5-point scale (1 = Very bad, 2 = Bad, 3 = Neutral, 4 = Good, 5.', options: [
                { text: 'Valence: Negative (rating 2 falls on the negative side of the neutral midpoint)', outcome: 'Valence: Negative (rating 2 falls on the negative side of the neutral midpoint).' },
                { text: 'valence positive', outcome: 'Not quite — Students often confuse "simplicity/complexity" (number of member attitudes in an attitude system).', reveals: 'students-often-confuse-simplicity-complexity' },
                { text: 'extremeness high', outcome: 'Not quite — Students often confuse "simplicity/complexity" (number of member attitudes in an attitude system).', reveals: 'students-often-confuse-simplicity-complexity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_003', title: 'Attitude Formation: Learning by Association, Reward, Modelling and Group Norms',
          caseStudy: { intro: 'Imagine a Class 12 student named Rohan who suddenly develops a strong dislike for a subject he previously enjoyed — say, Mathematics.',
            decisions: [{ prompt: 'A student develops a positive attitude towards a subject because the teacher who teaches it is warm and encouraging.', options: [
                { text: 'This illustrates learning by association (classical conditioning)', outcome: 'This illustrates learning by association (classical conditioning).' },
                { text: 'reward/punishment', outcome: 'Not quite — Students often confuse "learning by association" with "learning by reward/punishment," treating.', reveals: 'students-often-confuse-learning-by' },
                { text: 'learning by association', outcome: 'Not quite — Students often confuse "learning by association" with "learning by reward/punishment," treating.', reveals: 'students-often-confuse-learning-by' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_004', title: 'Factors Influencing Attitude Formation: Family, Reference Groups, Personal Experiences and Media',
          caseStudy: { intro: 'Think of a Class 12 student, Arjun, who strongly believes “plastic should be banned.” Ask: *Where did this attitude come from?* Start by listing the four.',
            decisions: [{ prompt: 'Name the four factors that influence attitude formation according to NCERT Class 12 Psychology Chapter 6.', options: [
                { text: 'The four factors are: (1) Family and School Environment, (2) Reference Groups, (3)', outcome: 'The four factors are: (1) Family and School Environment, (2) Reference Groups, (3) Personal.' },
                { text: 'genetics', outcome: 'Not quite — Students often believe that *media influences attitudes only through explicit persuasive messages*.', reveals: 'media-influences-attitudes-only-through' },
                { text: 'personality traits', outcome: 'Not quite — Students often believe that *media influences attitudes only through explicit persuasive messages*.', reveals: 'media-influences-attitudes-only-through' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_005', title: 'Attitude Change: Heider\'s Balance Theory (P-O-X Triangle) and Cognitive Consistency',
          caseStudy: { intro: 'Imagine your best friend (O) strongly dislikes a new movie (X) that you (P) loved.',
            decisions: [{ prompt: 'In Heider\'s P-O-X triangle, P has a positive attitude toward X, O has a positive attitude toward X, and P has a negative attitude toward O.', options: [
                { text: 'Imbalanced', outcome: 'Imbalanced. The three relations are: P-X = +, O-X = +, P-O = –. Multiplying: (+) × (+) × (–) = –.' },
                { text: 'balanced because two are positive', outcome: 'Not quite — Students memorise "two positives and one negative = imbalance" as a rigid rule, but then misapply.', reveals: 'students-memorise-two-positives-and' },
                { text: 'majority positive', outcome: 'Not quite — Students memorise "two positives and one negative = imbalance" as a rigid rule, but then misapply.', reveals: 'students-memorise-two-positives-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_006', title: 'Cognitive Dissonance Theory: Festinger and Carlsmith\'s Experiment',
          caseStudy: { intro: 'Imagine you tell a friend a movie was "amazing" just to be polite, even though you found it boring.',
            decisions: [{ prompt: 'What is the core proposition of Festinger\'s Cognitive Dissonance Theory regarding inconsistent cognitions?', options: [
                { text: 'The core proposition is that holding two or more psychologically inconsistent cognitions', outcome: 'The core proposition is that holding two or more psychologically inconsistent cognitions creates.' },
                { text: 'people ignore inconsistencies', outcome: 'Not quite — **Misconception:** "Cognitive dissonance means people change their behaviour to match their.', reveals: 'misconception-cognitive-dissonance-means-people' },
                { text: 'dissonance leads to behaviour change only', outcome: 'Not quite — **Misconception:** "Cognitive dissonance means people change their behaviour to match their.', reveals: 'misconception-cognitive-dissonance-means-people' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A health NGO wants villagers to stop a harmful practice central to their identity. The strategist asks: \'Do we attack the belief head-on, or first strengthen a related health attitude they already hold?\'',
            decisions: [{ prompt: 'What do the attitude features predict?', options: [
                { text: 'Head-on fails — a central, extreme, negative-leaning attitude resists incongruent change; the smarter lever is congruent change — deepen an existing aligned attitude (like protecting children\'s health) so the shift rides the system\'s own valence rather than fighting it.', outcome: 'The chapter\'s resistance map: centrality and extremeness multiply resistance in the opposite direction — you change a system by working with its gravity, not against it.' },
                { text: 'Go head-on — central beliefs change fastest because they matter most to people.', outcome: 'Centrality raises the stakes of the change, not its ease — the more a belief anchors the rest of the system, the harder incongruent pressure is to move.', reveals: 'central-changes-fast' },
                { text: 'Strategy doesn\'t matter — attitudes change at the same rate regardless of direction.', outcome: 'Valence and direction are exactly the variables — congruent change (more of what\'s felt) is easier than incongruent reversal, and extreme central attitudes make the gap even wider.', reveals: 'all-change-equal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read an attitude as three forces — and diagnose which one is dragging when belief and action diverge.',
            decisions: [{ prompt: 'What comes next? Attitude and Social Cognition · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Attitude and Social Cognition · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_001', difficulty: 'standard',
          question: 'An attitude is a learned predisposition to evaluate an attitude object (person.',
          hint: 'If stuck, revisit c11_psy_cbse_08_005 (emotion components) and c11_psy_cbse_07_002.',
          misconception: '**Misconception:** "If someone says they believe X, their attitude toward X is positive." **Why it\'s wrong:** This.',
          parts: [
                { id: 'a', prompt: 'In the NCERT "Green Environment" example (Box 6.1), a person has a strong cognitive component (knows tree plantation helps the environment) but a weak.', answer: 'Attitudes are **latent constructs**',
                  options: ['Attitudes are **latent constructs**', 'they don\'t have an attitude', 'If someone says they believe X, their attitude toward X is positive', '* **Concrete wrong answer:**'],
                  hint: 'If stuck, revisit c11_psy_cbse_08_005 (emotion components) and c11_psy_cbse_07_002.',
                  misconception: '**Misconception:** "If someone says they believe X, their attitude toward X is positive." **Why it\'s wrong:** This confuses *belief*.' }
          ],
            remediations: { 'misconception-if-someone-says-they': { steps: ['If a student cannot separate the three components in Diagnostic Q1–Q3: 1.', '**Re-teach with a concrete object:** Use "smartphone" — ask: "What do you *think* about it?', '(C) What do you *feel* when holding it?', '(A) What do you *do* with it?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_002', difficulty: 'standard',
          question: 'The features of attitudes — valence, extremeness, simplicity/complexity.',
          hint: 'Revisit node c12_psy_cbse_06_001 and practice identifying A-B-C components in 5 different.',
          misconception: 'Students often confuse "simplicity/complexity" (number of member attitudes in an attitude system) with the "A-B-C.',
          parts: [
                { id: 'a', prompt: 'A student rates her attitude toward "mandatory school uniforms" as 2 on a 5-point scale (1 = Very bad, 2 = Bad, 3 = Neutral, 4 = Good, 5 = Very good).', answer: 'Valence: Negative (rating 2 falls on the negative side of the neutral midpoint)',
                  options: ['Valence: Negative (rating 2 falls on the negative side of the neutral midpoint)', 'valence positive', 'extremeness high', 'simplicity/complexity'],
                  hint: 'Revisit node c12_psy_cbse_06_001 and practice identifying A-B-C components in 5 different attitude.',
                  misconception: 'Students often confuse "simplicity/complexity" (number of member attitudes in an attitude system) with the "A-B-C components" (three.' },
                { id: 'b', prompt: 'Explain in your own words why an attitude system toward "health and well-being" is considered complex (multiplex) while an attitude toward "a particular.', answer: '"Health and well-being" is complex',
                  options: ['"Health and well-being" is complex', 'health is complex', 'simplicity/complexity', 'A-B-C components'],
                  hint: 'Revisit node c12_psy_cbse_06_001 and practice identifying A-B-C components in 5 different attitude.',
                  misconception: 'Students often confuse "simplicity/complexity" (number of member attitudes in an attitude system) with the "A-B-C components" (three.' },
                { id: 'c', prompt: 'Rahul has a strongly negative attitude toward "junk food" (valence = negative, extremeness = high).', answer: 'Congruent change (more negative) would be easier',
                  options: ['Congruent change (more negative) would be easier', 'both are equally easy', 'simplicity/complexity', 'A-B-C components'],
                  hint: 'Revisit node c12_psy_cbse_06_001 and practice identifying A-B-C components in 5 different attitude.',
                  misconception: 'Students often confuse "simplicity/complexity" (number of member attitudes in an attitude system) with the "A-B-C components" (three.' },
                { id: 'd', prompt: 'Compare two attitude systems: System A has a central attitude with high extremeness and negative valence; System B has a peripheral attitude with low.', answer: 'System A is more resistant',
                  options: ['System A is more resistant', 'simplicity/complexity', 'A-B-C components'],
                  hint: 'Revisit node c12_psy_cbse_06_001 and practice identifying A-B-C components in 5 different attitude.',
                  misconception: 'Students often confuse "simplicity/complexity" (number of member attitudes in an attitude system) with the "A-B-C components" (three.' }
          ],
            remediations: { 'students-often-confuse-simplicity-complexity': { steps: ['Re-read the NCERT paragraphs on "Simplicity or Complexity (multiplexity)" and "Centrality" (pages 106–107).', 'Draw a diagram: a central circle labeled "Attitude toward Health" with spokes to member attitudes (Diet, Exercise.', 'Label each spoke as a member attitude with its own A-B-C.', 'Contrast with a single circle "Attitude toward Rahul" with A-B-C inside.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "simplicity/complexity" (number of member attitudes in an attitude system) with the "A-B-C.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "A simple attitude system is always easier to change than a complex one." Use the features of attitudes to support or refute.', answer: 'The claim is generally true but not absolute',
                  options: ['The claim is generally true but not absolute', 'always easier', 'simplicity/complexity', 'A-B-C components'],
                  hint: 'Revisit node c12_psy_cbse_06_001 and practice identifying A-B-C components in 5 different attitude.',
                  misconception: 'Students often confuse "simplicity/complexity" (number of member attitudes in an attitude system) with the "A-B-C components" (three.' },
                { id: 'b', prompt: 'Create a real-life scenario (Indian context) involving an attitude toward "digital payments (UPI)" that illustrates all four features.', answer: 'Scenario: Priya, a college student, uses UPI daily',
                  options: ['Scenario: Priya, a college student, uses UPI daily', 'simplicity/complexity', 'A-B-C components'],
                  hint: 'Revisit node c12_psy_cbse_06_001 and practice identifying A-B-C components in 5 different attitude.',
                  misconception: 'Students often confuse "simplicity/complexity" (number of member attitudes in an attitude system) with the "A-B-C components" (three.' }
          ],
            remediations: { 'students-often-confuse-simplicity-complexity': { steps: ['Re-read the NCERT paragraphs on "Simplicity or Complexity (multiplexity)" and "Centrality" (pages 106–107).', 'Draw a diagram: a central circle labeled "Attitude toward Health" with spokes to member attitudes (Diet, Exercise.', 'Label each spoke as a member attitude with its own A-B-C.', 'Contrast with a single circle "Attitude toward Rahul" with A-B-C inside.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_003', difficulty: 'standard',
          question: 'Attitude formation is the process through which individuals acquire and develop.',
          hint: 'If stuck, revisit c11_psy_cbse_05_002 (Classical Conditioning) and c11_psy_cbse_05_004.',
          misconception: 'Students often confuse "learning by association" with "learning by reward/punishment," treating both as "learning from.',
          parts: [
                { id: 'a', prompt: 'A student develops a positive attitude towards a subject because the teacher who teaches it is warm and encouraging.', answer: 'This illustrates learning by association (classical conditioning)',
                  options: ['This illustrates learning by association (classical conditioning)', 'reward/punishment', 'learning by association', 'learning by reward/punishment'],
                  hint: 'If stuck, revisit c11_psy_cbse_05_002 (Classical Conditioning) and c11_psy_cbse_05_004 (Operant.',
                  misconception: 'Students often confuse "learning by association" with "learning by reward/punishment," treating both as "learning from experience." They.' },
                { id: 'b', prompt: 'Explain in your own words how learning attitudes through group or cultural norms differs from learning through modelling, even though both involve observing.', answer: 'Modelling involves observing a specific individual being rewarded/punished for a',
                  options: ['Modelling involves observing a specific individual being rewarded/punished for a', 'learning by association', 'learning by reward/punishment', 'learning from experience'],
                  hint: 'If stuck, revisit c11_psy_cbse_05_002 (Classical Conditioning) and c11_psy_cbse_05_004 (Operant.',
                  misconception: 'Students often confuse "learning by association" with "learning by reward/punishment," treating both as "learning from experience." They.' },
                { id: 'c', prompt: 'A teenager starts volunteering at an animal shelter after seeing her older sister receive praise from their parents for doing the same.', answer: 'This is learning through modelling (observational learning)',
                  options: ['This is learning through modelling (observational learning)', 'reward/punishment', 'learning by association', 'learning by reward/punishment'],
                  hint: 'If stuck, revisit c11_psy_cbse_05_002 (Classical Conditioning) and c11_psy_cbse_05_004 (Operant.',
                  misconception: 'Students often confuse "learning by association" with "learning by reward/punishment," treating both as "learning from experience." They.' },
                { id: 'd', prompt: 'Compare and contrast how the cognitive (C), affective (A), and behavioural (B) components of an attitude might develop differently when formed through (a).', answer: 'In association (e.g., liking a brand',
                  options: ['In association (e.g., liking a brand', 'learning by association', 'learning by reward/punishment', 'learning from experience'],
                  hint: 'If stuck, revisit c11_psy_cbse_05_002 (Classical Conditioning) and c11_psy_cbse_05_004 (Operant.',
                  misconception: 'Students often confuse "learning by association" with "learning by reward/punishment," treating both as "learning from experience." They.' }
          ],
            remediations: { 'students-often-confuse-learning-by': { steps: ['Revisit c11_psy_cbse_05_002 (Classical Conditioning) and c11_psy_cbse_05_004 (Operant Conditioning) to re-learn the.', 'Create 5 pairs of scenarios — one per mechanism — and practice labelling them.', 'Use the "who acts?" test: In association, the environment pairs stimuli; in reward/punishment, the learner acts and the.', 'Re-attempt Diagnostic Questions 1 and 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_004', difficulty: 'standard',
          question: 'Factors influencing attitude formation are the contextual sources — family and.',
          hint: 'Revisit c12_psy_cbse_06_003 and create a one-sentence definition for each learning.',
          misconception: 'Students often believe that *media influences attitudes only through explicit persuasive messages* (advertisements.',
          parts: [
                { id: 'a', prompt: 'A 14-year-old, Priya, develops a positive attitude toward “studying late at night” after seeing her older sister (a topper) do it and get praised by parents.', answer: 'Factor: Family and School Environment',
                  options: ['Factor: Family and School Environment', 'reference group', 'personal experience'],
                  hint: 'Revisit c12_psy_cbse_06_003 and create a one-sentence definition for each learning process with.',
                  misconception: 'Students often believe that *media influences attitudes only through explicit persuasive messages* (advertisements, editorials) and.' }
          ],
            remediations: { 'media-influences-attitudes-only-through': { steps: ['Re-read the NCERT paragraphs under “Factors that Influence Attitude Formation” (pages 108–109) and underline the.', 'Create a 4×2 table: Factor | Mechanism(s) | Example from your life.', 'Fill it without looking at the book.', 'Re-attempt Diagnostic Questions 2 and 4, which specifically test mechanism discrimination.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_005', difficulty: 'standard',
          question: 'Heider\'s Balance Theory (P-O-X Triangle) is a cognitive consistency theory.',
          hint: 'If stuck on assigning signs to P-O-X edges, revisit c12_psy_cbse_06_001 (A-B-C.',
          misconception: 'Students memorise "two positives and one negative = imbalance" as a rigid rule, but then misapply it by counting.',
          parts: [
                { id: 'a', prompt: 'In Heider\'s P-O-X triangle, P has a positive attitude toward X, O has a positive attitude toward X, and P has a negative attitude toward O.', answer: 'Imbalanced',
                  options: ['Imbalanced', 'balanced because two are positive', 'majority positive', 'define/identify'],
                  hint: 'If stuck on assigning signs to P-O-X edges, revisit c12_psy_cbse_06_001 (A-B-C components) and.',
                  misconception: 'Students memorise "two positives and one negative = imbalance" as a rigid rule, but then misapply it by counting positive *attitudes*.' },
                { id: 'b', prompt: 'Apply Heider\'s Balance Theory to this scenario: Riya (P) admires her senior colleague Anil (O) [P-O = +]. Anil strongly supports remote work (X) [O-X = +].', answer: 'Is the triad balanced?',
                  options: ['Is the triad balanced?', 'define/identify'],
                  hint: 'If stuck on assigning signs to P-O-X edges, revisit c12_psy_cbse_06_001 (A-B-C components) and.',
                  misconception: 'Students memorise "two positives and one negative = imbalance" as a rigid rule, but then misapply it by counting positive *attitudes*.' },
                { id: 'c', prompt: 'Compare Heider\'s Balance Theory and Festinger\'s Cognitive Dissonance Theory on these dimensions: (i) unit of analysis (triad vs.', answer: '(i) Heider: triadic (P-O-X)',
                  options: ['(i) Heider: triadic (P-O-X)', 'define/identify'],
                  hint: 'If stuck on assigning signs to P-O-X edges, revisit c12_psy_cbse_06_001 (A-B-C components) and.',
                  misconception: 'Students memorise "two positives and one negative = imbalance" as a rigid rule, but then misapply it by counting positive *attitudes*.' }
          ],
            remediations: { 'students-memorise-two-positives-and': { steps: ['Revisit node c12_psy_cbse_06_001 (A-B-C components) to reinforce that attitudes are *relations* between a person and.', 'Draw 10 random P-O-X triangles on paper, assign random ± signs to each edge, compute the product, and label.', 'For each imbalanced triangle, list all three single-sign-flip resolutions.', 'Take the NCERT dowry example and *change one sign* (e.g., make O dislike P) — recompute balance and predict the new.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_06_006', difficulty: 'standard',
          question: 'Cognitive Dissonance Theory, proposed by Leon Festinger (1957), states that.',
          hint: 'If stuck, revisit **c12_psy_cbse_06_001 (A-B-C Components)** to practice identifying the.',
          misconception: '**Misconception:** "Cognitive dissonance means people change their behaviour to match their attitude." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast Heider\'s Balance Theory (P-O-X) and Festinger\'s Cognitive Dissonance Theory in terms of: (a) the unit of analysis, (b) the nature.', answer: 'the unit of analysis, (',
                  options: ['the unit of analysis, (', 'cognitive elements'],
                  hint: 'If stuck, revisit **c12_psy_cbse_06_001 (A-B-C Components)** to practice identifying the cognitive.',
                  misconception: '**Misconception:** "Cognitive dissonance means people change their behaviour to match their attitude." **Why it\'s wrong:** This reverses.' }
          ],
            remediations: { 'misconception-cognitive-dissonance-means-people': { steps: ['Re-read the **Box 6.2 "Telling a Lie for Twenty Dollars"** in NCERT line-by-line.', 'Map each row: Initial Cognitions ($1 group) → Changed Cognitions.', 'Say aloud: "The $1 is *insufficient* to justify the lie, so the person *must* believe the lie." 2.', 'Draw a 2×2 table: **Condition** ($1 vs $20) × **Outcome** (Attitude Change: Yes/No).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
