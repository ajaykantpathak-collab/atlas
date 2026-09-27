import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch01_p1: SimDef = {
    id: 'v3_c12_psy_ch01_p1',
    title: 'Variations in Psychological Attributes · Part 1/2',
    subtitle: 'Same Rohan, different room — trait or situation?',
    classLevel: 12, subject: 'psychology', topic: 'Variations in Psychological Attributes · Part 1/2',
    chapters: ['c12_psy_ch01'],
    nodeIds: ['c12_psy_cbse_01_001', 'c12_psy_cbse_01_002', 'c12_psy_cbse_01_003', 'c12_psy_cbse_01_004', 'c12_psy_cbse_01_005', 'c12_psy_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Behaviour analyst', intro: 'Why does one friend race through the test while another barely finishes? The answer is older than the classroom.', goal: 'Explain individual differences through the trait-situation debate and nature-nurture interaction.' },
    discovery: {
        question: 'Rohan is loud and funny with friends, quiet and respectful at the school assembly. Did his personality change — or did something else move?',
        options: ['The situation — situationism says context can override traits; the aggressive go submissive before a boss, the talkative go quiet in assembly', 'His traits reset — personality permanently shifts with each audience', 'He is performing — the quiet assembly version is deliberate masking', 'Two personalities — one for peers and one for authority figures'],
        answer: 'The situation — situationism says context can override traits; the aggressive go submissive before a boss, the talkative go quiet in assembly',
        hook: 'Nature versus nurture isn\'t a contest — heredity sets a reaction range, environment picks where inside it you land. Modern psychology is interactionist: the honest answer to \'trait or situation?\' is both, dynamically.',
    },
    teaching: [
        { title: 'Individual Differences: Nature, Situationism and Sources of Variation', text: 'Individual differences refer to the distinctiveness and variability among people in their psychological characteristics (such as intelligence, personality, aptitude, interests, values) and behavior.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Analyse why classmates differ: run the trait-versus-situation debate on real behaviour, place heredity and environment in the same frame, and resist the urge to crown either one.',
        labels: ['Individual Differences: Nature, Situationism', 'Assessment of Psychological Attributes', 'Intelligence: Definitions from Binet', 'Psychometric Theories: Spearman\'s g-factor', 'Gardner\'s Theory of Multiple', 'Sternberg\'s Triarchic Theory: Componential,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_001', title: 'Individual Differences: Nature, Situationism and Sources of Variation',
          caseStudy: { intro: 'Start by asking students to observe their classmates: "Why do some students finish a math test quickly while others take longer?',
            decisions: [{ prompt: 'Define individual differences in psychological terms. How do they differ from physical differences?', options: [
                { text: 'Individual differences refer to distinctiveness and variations in people\'s psychological', outcome: 'Individual differences refer to distinctiveness and variations in people\'s psychological.' },
                { text: 'situationism means traits don\'t exist or don\'t matter at all', outcome: 'Not quite — Students often think that situationism means traits don\'t exist or don\'t matter at all.', reveals: 'situationism-means-traits-don-t' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_002', title: 'Assessment of Psychological Attributes: Methods and Domains',
          caseStudy: { intro: 'Imagine your school counsellor has to help a Class 10 student choose a stream (Science, Commerce, Humanities).',
            decisions: [{ prompt: 'A student says, "Assessment and testing mean the same thing in psychology." Is this statement correct? Answer in one sentence.', options: [
                { text: 'No', outcome: 'No. Assessment is the broader process of measurement and evaluation using multiple methods (tests.' },
                { text: 'psychological test', outcome: 'Not quite — Students often believe "psychological test" and "assessment" are interchangeable, and that a single.', reveals: 'psychological-test-and-assessment-are' },
                { text: 'assessment', outcome: 'Not quite — Students often believe "psychological test" and "assessment" are interchangeable, and that a single.', reveals: 'psychological-test-and-assessment-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_003', title: 'Intelligence: Definitions from Binet to Wechsler',
          caseStudy: { intro: 'Imagine a teacher says, "Rohan is very intelligent — he finishes tests first and gets top marks." A classmate replies, "But Priya solves real-life problems.',
            decisions: [{ prompt: 'State Alfred Binet\'s definition of intelligence as given in the NCERT textbook. Use the exact three phrases he emphasized.', options: [
                { text: 'Binet defined intelligence as **the ability to judge well, understand well, and reason', outcome: 'Binet defined intelligence as **the ability to judge well, understand well, and reason well**.' },
                { text: 'ability to learn quickly', outcome: 'Not quite — Students consistently write: **"Binet defined intelligence as mental age; Wechsler defined it.', reveals: 'students-consistently-write-binet-defined' },
                { text: 'high IQ', outcome: 'Not quite — Students consistently write: **"Binet defined intelligence as mental age; Wechsler defined it.', reveals: 'students-consistently-write-binet-defined' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_004', title: 'Psychometric Theories: Spearman\'s g-factor and Thurstone\'s Primary Mental Abilities',
          caseStudy: { intro: 'Imagine you and your friend both score 85% on a test battery covering math, vocabulary, and spatial puzzles.',
            decisions: [{ prompt: 'What is the fundamental statistical technique Charles Spearman used to propose his two-factor theory of intelligence, and what does the.', options: [
                { text: 'Spearman used **factor analysis** on correlation matrices of test scores', outcome: 'Spearman used **factor analysis** on correlation matrices of test scores.' },
                { text: 'Spearman used regression analysis', outcome: 'Not quite — **Misconception:** "Spearman\'s g-factor and Thurstone\'s primary mental abilities are contradictory.', reveals: 'misconception-spearman-s-g-factor' },
                { text: 'g-factor is just vocabulary skill', outcome: 'Not quite — **Misconception:** "Spearman\'s g-factor and Thurstone\'s primary mental abilities are contradictory.', reveals: 'misconception-spearman-s-g-factor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_005', title: 'Gardner\'s Theory of Multiple Intelligences: Eight Independent Types',
          caseStudy: { intro: 'Imagine a Class 12 student, Arjun, who struggles with textbook mathematics but can effortlessly compose original ragas on the sitar, navigate Delhi\'s metro.',
            decisions: [{ prompt: 'A student writes: "Gardner\'s theory says there are 8 types of intelligence, and everyone has all 8 in equal amounts." Identify the error.', options: [
                { text: 'The statement contains two errors', outcome: 'The statement contains two errors. First, Gardner does not claim equal amounts; he argues.' },
                { text: 'A wrong answer reveals the student conflates', outcome: 'Not quite — Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good.', reveals: 'gardner-s-theory-means-everyone' },
                { text: 'everyone is smart in their own way', outcome: 'Not quite — Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good.', reveals: 'gardner-s-theory-means-everyone' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_006', title: 'Sternberg\'s Triarchic Theory: Componential, Experiential and Contextual Intelligence',
          caseStudy: { intro: 'Imagine you are the captain of your school cricket team. In the nets you analyze the bowler\'s action and plan your shots (componential).',
            decisions: [{ prompt: 'Name the three components of Sternberg\'s Triarchic Theory and give the alternative label used in the NCERT text for each (e.g.', options: [
                { text: 'The three components are: Componential (Analytical), Experiential (Creative), and', outcome: 'The three components are: Componential (Analytical), Experiential (Creative), and Contextual.' },
                { text: 'Analytical', outcome: 'Not quite — Students often think the three intelligences are mutually exclusive "types" of people (e.g., "I\'m.', reveals: 'the-three-intelligences-are-mutually' },
                { text: 'of people (e.g', outcome: 'Not quite — Students often think the three intelligences are mutually exclusive "types" of people (e.g., "I\'m.', reveals: 'the-three-intelligences-are-mutually' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A school counsellor must advise a student torn between \'I love sketching, so design\' and her strong mechanical-aptitude score — her parents push \'just follow the marks card.\'',
            decisions: [{ prompt: 'What does psychological assessment say the decision actually needs?', options: [
                { text: 'Both domains, separately — interest says what she\'d choose, aptitude says what she could train into skill; loving a field without the aptitude breeds frustration, aptitude without interest breeds disengagement, and a marks card answers neither.', outcome: 'The chapter\'s split: domains are different constructs needing different methods — assessment is purpose-driven, and stream choice needs the interest-aptitude pairing, not a single score.' },
                { text: 'Follow the marks — performance is the best single predictor of success.', outcome: 'Marks conflate ability, coaching and effort into one number and say nothing about preference or potential; the chapter treats attributes as multi-dimensional precisely because one index can\'t carry a career decision.', reveals: 'marks-are-enough' },
                { text: 'Follow her interest — passion overrides aptitude every time.', outcome: 'Interest without aptitude is the textbook mismatch — she may love the activity and still stall on the skill; the pairing exists to catch exactly this lopsided case.', reveals: 'passion-overrides-aptitude' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read individual differences as an interaction — traits meeting situations, nature setting the range nurture navigates.',
            decisions: [{ prompt: 'What comes next? Variations in Psychological Attributes · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Variations in Psychological Attributes · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_001', difficulty: 'standard',
          question: 'Individual differences refer to the distinctiveness and variability among.',
          hint: 'If stuck, revisit Class 11 Psychology Chapter 3 (Human Development) – specifically the.',
          misconception: 'Students often think that situationism means traits don\'t exist or don\'t matter at all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Individual differences refer to the distinctiveness and variability among people in their',
                  options: ['Individual differences refer to the distinctiveness and variability among people in their', 'Assessment of psychological attributes is the systematic, standardized process of', 'Intelligence is a psychological construct defined by Alfred Binet as the ability to judge', 'Psychometric theories of intelligence use statistical methods (especially factor'],
                  hint: 'If stuck, revisit Class 11 Psychology Chapter 3 (Human Development) – specifically the life-span.',
                  misconception: 'Students often think that situationism means traits don\'t exist or don\'t matter at all.' }
          ],
            remediations: { 'situationism-means-traits-don-t': { steps: ['If a student holds the misconception that situationism denies traits, do this: 1) Re-read the NCERT paragraph.', '2) Write down the exact sentence: "A person, who is generally aggressive, may behave in a submissive manner in the.', '4) Explain in your own words: The trait exists, but the situation overrides it.', '5) Then read the next sentence: "Sometimes, the situational influences are so powerful that individuals with differing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that situationism means traits don\'t exist or don\'t matter at all.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Individual differences are solely determined by heredity." Use the concept of nature-nurture interplay.', answer: 'The statement is false',
                  options: ['The statement is false', 'situationism means traits don\'t exist or don\'t matter at all'],
                  hint: 'If stuck, revisit Class 11 Psychology Chapter 3 (Human Development) – specifically the life-span.',
                  misconception: 'Students often think that situationism means traits don\'t exist or don\'t matter at all.' },
                { id: 'b', prompt: 'Create a real-life scenario that demonstrates how both heredity and environment contribute to individual differences in a psychological attribute (e.g.', answer: 'Example: Two siblings inherit genes for high musical aptitude (heredity)',
                  options: ['Example: Two siblings inherit genes for high musical aptitude (heredity)', 'situationism means traits don\'t exist or don\'t matter at all'],
                  hint: 'If stuck, revisit Class 11 Psychology Chapter 3 (Human Development) – specifically the life-span.',
                  misconception: 'Students often think that situationism means traits don\'t exist or don\'t matter at all.' }
          ],
            remediations: { 'situationism-means-traits-don-t': { steps: ['If a student holds the misconception that situationism denies traits, do this: 1) Re-read the NCERT paragraph.', '2) Write down the exact sentence: "A person, who is generally aggressive, may behave in a submissive manner in the.', '4) Explain in your own words: The trait exists, but the situation overrides it.', '5) Then read the next sentence: "Sometimes, the situational influences are so powerful that individuals with differing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_002', difficulty: 'standard',
          question: 'Assessment of psychological attributes is the systematic, standardized process.',
          hint: 'If stuck, revisit Class 11 Node c11_psy_cbse_02_003 (Observational Method) and.',
          misconception: 'Students often believe "psychological test" and "assessment" are interchangeable, and that a single test (like an.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why psychological attributes are described as "multi-dimensional" rather than "unidimensional" in the NCERT text.', answer: 'A line (unidimensional) can be described by a single measure (length), but a box',
                  options: ['A line (unidimensional) can be described by a single measure (length), but a box', 'multi-dimensional', 'psychological test', 'assessment'],
                  hint: 'If stuck, revisit Class 11 Node c11_psy_cbse_02_003 (Observational Method) and c11_psy_cbse_02_006.',
                  misconception: 'Students often believe "psychological test" and "assessment" are interchangeable, and that a single test (like an IQ test) can measure.' },
                { id: 'b', prompt: 'A researcher wants to study the leadership style of a student council president in a natural school setting over three months.', answer: 'Observation is most appropriate',
                  options: ['Observation is most appropriate', 'psychological test', 'interview', 'assessment'],
                  hint: 'If stuck, revisit Class 11 Node c11_psy_cbse_02_003 (Observational Method) and c11_psy_cbse_02_006.',
                  misconception: 'Students often believe "psychological test" and "assessment" are interchangeable, and that a single test (like an IQ test) can measure.' },
                { id: 'c', prompt: 'Compare and contrast "interest" and "aptitude" as domains of psychological assessment. Why is it necessary to assess BOTH for career guidance?', answer: 'Interest is a person\'s preference for activities (what they like)',
                  options: ['Interest is a person\'s preference for activities (what they like)', 'psychological test', 'assessment'],
                  hint: 'If stuck, revisit Class 11 Node c11_psy_cbse_02_003 (Observational Method) and c11_psy_cbse_02_006.',
                  misconception: 'Students often believe "psychological test" and "assessment" are interchangeable, and that a single test (like an IQ test) can measure.' }
          ],
            remediations: { 'psychological-test-and-assessment-are': { steps: ['Re-read the NCERT distinction: "Assessment refers to the measurement... often using multiple methods...', 'Create a two-column table: Column A = "Assessment Process", Column B = "Psychological Test".', 'Write a 3-sentence explanation of why a clinician would NOT rely solely on an IQ test for a learning disability.', 'Re-attempt Diagnostic Question 1 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_003', difficulty: 'standard',
          question: 'Intelligence is a psychological construct defined by Alfred Binet as the.',
          hint: 'Revisit c11_psy_cbse_02_007 (Characteristics of a Good Test) — focus on "standardization".',
          misconception: 'Students consistently write: **"Binet defined intelligence as mental age; Wechsler defined it as IQ."** This.',
          parts: [
                { id: 'a', prompt: 'Compare how the "common-sense notion" of intelligence (mental alertness, ready wit, quickness in learning) differs from Binet\'s and Wechsler\'s definitions.', answer: '| Perspective | Focus | Key Verbs | Limitation |',
                  options: ['| Perspective | Focus | Key Verbs | Limitation |', 'global capacity', 'Binet = reasoning, Wechsler = adaptation'],
                  hint: 'Revisit c11_psy_cbse_02_007 (Characteristics of a Good Test) — focus on "standardization" and.',
                  misconception: 'Students consistently write: **"Binet defined intelligence as mental age; Wechsler defined it as IQ."** This is factually wrong and.' }
          ],
            remediations: { 'students-consistently-write-binet-defined': { steps: ['**Re-read the NCERT paragraphs** under "Intelligence" (pages 3-4 in the reference text) — highlight only the two.', '**Make two flashcards**: Card 1 front: "Binet (1905)"; back: "Judge well, understand well, reason well — cognitive.', '**Do the "Sorting" activity**: Write 10 behaviors on slips (e.g., "solves puzzle fast", "calms crying baby", "memorizes.', 'Sort into "Binet-focused" vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_004', difficulty: 'standard',
          question: 'Psychometric theories of intelligence use statistical methods (especially.',
          hint: 'Review Class 11 Psychology node `c11_psy_cbse_02_009` (Descriptive Statistics) for.',
          misconception: '**Misconception:** "Spearman\'s g-factor and Thurstone\'s primary mental abilities are contradictory theories — one says.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental statistical technique Charles Spearman used to propose his two-factor theory of intelligence, and what does the \'g-factor\' represent.', answer: 'Spearman used **factor analysis** on correlation matrices of test scores',
                  options: ['Spearman used **factor analysis** on correlation matrices of test scores', 'Spearman used regression analysis', 'g-factor is just vocabulary skill', 'factor analysis yields *one true structure*, not realizing that **orthogonal vs'],
                  hint: 'Review Class 11 Psychology node `c11_psy_cbse_02_009` (Descriptive Statistics) for correlation, and.',
                  misconception: '**Misconception:** "Spearman\'s g-factor and Thurstone\'s primary mental abilities are contradictory theories — one says intelligence is one.' },
                { id: 'b', prompt: 'Given a correlation matrix of 5 cognitive tests where all inter-correlations are positive and moderate (r ≈ 0.4–0.6), a researcher extracts one general factor.', answer: 'This supports **Spearman\'s theory**',
                  options: ['This supports **Spearman\'s theory**', 'both equally', 'factor analysis yields *one true structure*, not realizing that **orthogonal vs'],
                  hint: 'Review Class 11 Psychology node `c11_psy_cbse_02_009` (Descriptive Statistics) for correlation, and.',
                  misconception: '**Misconception:** "Spearman\'s g-factor and Thurstone\'s primary mental abilities are contradictory theories — one says intelligence is one.' },
                { id: 'c', prompt: 'Compare the predictive utility of Spearman\'s g-factor vs. Thurstone\'s primary mental abilities for (a) overall academic success and (b) specific career.', answer: 'overall academic success and (',
                  options: ['overall academic success and (', 'g predicts everything equally well', 'factor analysis yields *one true structure*, not realizing that **orthogonal vs'],
                  hint: 'Review Class 11 Psychology node `c11_psy_cbse_02_009` (Descriptive Statistics) for correlation, and.',
                  misconception: '**Misconception:** "Spearman\'s g-factor and Thurstone\'s primary mental abilities are contradictory theories — one says intelligence is one.' }
          ],
            remediations: { 'misconception-spearman-s-g-factor': { steps: ['**Revisit factor analysis basics**: Review Class 11 statistics (correlation → factor extraction → rotation).', 'Use node `c11_psy_cbse_02_009` (Inferential Statistics) to understand how correlated variables yield latent factors.', '**Re-read NCERT pages 6–7** focusing on the phrases "two-factor theory" and "primary mental abilities" — note that.', '**Draw a hierarchical diagram**: g at top → 7 primary abilities below → specific tests at bottom.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_005', difficulty: 'standard',
          question: 'Gardner\'s Theory of Multiple Intelligences proposes that intelligence is not.',
          hint: 'Revisit c12_psy_cbse_01_004 (Spearman\'s g-factor and Thurstone\'s Primary Mental.',
          misconception: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Gardner\'s theory says there are 8 types of intelligence, and everyone has all 8 in equal amounts." Identify the error in this statement and.', answer: 'The statement contains two errors',
                  options: ['The statement contains two errors', 'A wrong answer reveals the student conflates', 'everyone is smart in their own way'],
                  hint: 'Revisit c12_psy_cbse_01_004 (Spearman\'s g-factor and Thurstone\'s Primary Mental Abilities) — focus.',
                  misconception: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that obscures the theory\'s.' },
                { id: 'b', prompt: 'A Class 12 student claims: "If someone has high Logical-Mathematical intelligence, they must also have high Spatial intelligence because both involve abstract.', answer: 'The claim is false',
                  options: ['The claim is false', 'everyone is smart in their own way'],
                  hint: 'Revisit c12_psy_cbse_01_004 (Spearman\'s g-factor and Thurstone\'s Primary Mental Abilities) — focus.',
                  misconception: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that obscures the theory\'s.' },
                { id: 'c', prompt: 'Priya is a 17-year-old who: (a) writes award-winning Hindi poetry, (b) cannot read maps or assemble furniture, (c) learns dance choreography after one.', answer: 'Mapping: Linguistic',
                  options: ['Mapping: Linguistic', 'smartness', 'everyone is smart in their own way'],
                  hint: 'Revisit c12_psy_cbse_01_004 (Spearman\'s g-factor and Thurstone\'s Primary Mental Abilities) — focus.',
                  misconception: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that obscures the theory\'s.' },
                { id: 'd', prompt: 'Compare Gardner\'s view of intelligence with Spearman\'s g-factor theory on THREE dimensions: (1) structure of intelligence, (2) explanation of exceptional.', answer: '| Dimension | Spearman (g-factor) | Gardner (Multiple Intelligences) |',
                  options: ['| Dimension | Spearman (g-factor) | Gardner (Multiple Intelligences) |', 'both agree people have different strengths', 'everyone is smart in their own way'],
                  hint: 'Revisit c12_psy_cbse_01_004 (Spearman\'s g-factor and Thurstone\'s Primary Mental Abilities) — focus.',
                  misconception: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that obscures the theory\'s.' }
          ],
            remediations: { 'gardner-s-theory-means-everyone': { steps: ['If a student exhibits the above misconception: Step 1 — Have them re-read Gardner\'s original criteria (isolation.', 'Step 2 — Give three cases: (a) a student who prefers diagrams (learning style), (b) a student who mentally rotates 3D.', 'Ask: "Which is an intelligence?', 'Justify using Gardner\'s criteria." Step 3 — If they still confuse, assign: "Write 150 words distinguishing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_006', difficulty: 'standard',
          question: 'Sternberg\'s Triarchic Theory proposes that intelligence comprises three.',
          hint: 'Revisit c12_psy_cbse_01_004 and list the key difference: psychometric theories ask "how.',
          misconception: 'Students often think the three intelligences are mutually exclusive "types" of people (e.g., "I\'m a contextual.',
          parts: [
                { id: 'a', prompt: 'A student memorizes a new formula by linking it to a familiar physics derivation, plans which problems to practice first, and then solves them quickly.', answer: 'Memorizing by linking = Knowledge-acquisition component',
                  options: ['Memorizing by linking = Knowledge-acquisition component', 'planning', 'of people (e.g', 'the three intelligences are mutually exclusive "types" of people (e'],
                  hint: 'Revisit c12_psy_cbse_01_004 and list the key difference: psychometric theories ask "how many.',
                  misconception: 'Students often think the three intelligences are mutually exclusive "types" of people (e.g., "I\'m a contextual person").' },
                { id: 'b', prompt: 'Riya has never baked a cake. She watches a video, realizes the oven temperature in the recipe is for a conventional oven but she has a convection oven, so she.', answer: 'Experiential (Creative) intelligence',
                  options: ['Experiential (Creative) intelligence', 'Componential', 'of people (e.g', 'the three intelligences are mutually exclusive "types" of people (e'],
                  hint: 'Revisit c12_psy_cbse_01_004 and list the key difference: psychometric theories ask "how many.',
                  misconception: 'Students often think the three intelligences are mutually exclusive "types" of people (e.g., "I\'m a contextual person").' }
          ],
            remediations: { 'the-three-intelligences-are-mutually': { steps: ['Re-read the NCERT paragraph on "Triarchic Theory of Intelligence" (Chapter 1, page 8-9) focusing on the verbs.', 'Create a three-column table: column headers = Componential, Experiential, Contextual; rows = Knowledge-acquisition.', 'Fill each cell with a one-phrase example from your own life.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
