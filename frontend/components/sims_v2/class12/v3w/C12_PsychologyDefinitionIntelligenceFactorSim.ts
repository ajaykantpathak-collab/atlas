import type { SimDef } from '../../engine/types';
import C12_PsychologyDefinitionIntelligenceFactorSim from '../../../simulations/c6_12/C12_PsychologyDefinitionIntelligenceFactorSim';

/** v3 wrapped master — C12_PsychologyDefinitionIntelligenceFactorSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_psychologydefinitionintelligencefactorsim: SimDef = {
    id: 'v3w_c12_psychologydefinitionintelligencefactorsim',
    title: 'Gardner\'s Theory of Multiple Intelligences: Eight Independent Types',
    subtitle: 'This node covers Gardner\'s eight intelligences, their defining characteristics, and the.',
    classLevel: 12, subject: 'psychology', topic: 'Gardner\'s Theory of Multiple Intelligences: Eight Independent Types',
    chapters: [],
    nodeIds: ['c12_psy_cbse_01_005', 'c12_psy_cbse_01_002', 'c12_psy_cbse_01_003', 'c12_psy_cbse_01_011', 'c12_psy_cbse_01_012', 'c12_psy_cbse_01_001', 'c12_psy_cbse_01_004', 'c12_psy_cbse_01_007', 'c12_psy_cbse_01_008', 'c12_psy_cbse_06_008', 'c12_psy_cbse_06_005', 'c12_psy_cbse_01_006', 'c12_psy_cbse_01_010', 'c12_psy_cbse_07_001', 'c12_psy_cbse_01_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a Class 12 student, Arjun, who struggles with textbook mathematics but can effortlessly compose.', goal: 'Master Gardner\'s Theory of Multiple Intelligences: Eight Independent Types.' },
    discovery: {
        question: 'A student writes: "Gardner\'s theory says there are 8 types of intelligence, and everyone has all 8 in equal amounts." Identify the error in this statement and.',
        options: ['The statement contains two errors', 'A wrong answer reveals the student conflates', 'everyone is smart in their own way'],
        answer: 'The statement contains two errors',
        hook: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that.',
    },
    teaching: [
        { title: 'Gardner\'s Theory of Multiple Intelligences.', text: 'Gardner\'s Theory of Multiple Intelligences proposes that intelligence is not a single general ability (g-factor) but rather eight distinct, relatively independent intelligences: Linguistic,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_psy_cbse_01_005', title: 'Gardner\'s Theory of Multiple.',
          scaffold: { problem: 'A school counsellor uses only a standard verbal reasoning test to select students for a "Leadership Development Programme." Three students.',
            steps: [
            { text: 'Identify the intelligence measured by a standard verbal reasoning test — primarily Linguistic and Logical-Mathematical.' },
            { text: 'Recognise Gardner\'s claim that intelligences are relatively independent — high Linguistic/Logical-Mathematical does not.' },
            { text: 'Map each student\'s described behaviours to Gardner\'s intelligences: Rohan — football captaincy + conflict mediation =.' },
            { text: 'Conclude the test systematically excludes students whose strengths lie outside the two intelligences it measures,.' },
            { text: 'Recommend a multi-method identification process including peer/teacher nominations, portfolio review, and performance.', faded: true, blankAnswer: 'The selection method is flawed because it measures only.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_01_002', title: 'Assessment of psychological attributes.',
          scaffold: { problem: 'A school wants to identify students for a "Young Scientists" programme (Class 8-10).',
            steps: [
            { text: 'Identify the three target attributes from the problem statement: scientific reasoning, sustained interest, creativity.' },
            { text: 'Map each attribute to the correct NCERT domain: scientific reasoning → Intelligence (cognitive competence); sustained.' },
            { text: 'Select the best assessment method for each domain: Intelligence → Standardized psychological test (objective,.' },
            { text: 'Justify each: Intelligence test gives comparable scores across candidates; self-report captures subjective interest.' },
            { text: 'Verify coverage: All three domains are distinct; methods match domain characteristics; no method is used for a domain.', faded: true, blankAnswer: '(1) Intelligence + Standardized Test; (2) Interest +.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_01_003', title: 'Intelligence is a psychological.',
          scaffold: { problem: 'A Class 12 student writes in a board exam: "Binet defined intelligence as the ability to learn quickly and adapt to new situations." The.',
            steps: [
            { text: 'Identify the student\'s error — they attributed "learn quickly" (speed) and "adapt to new situations" (Wechsler\'s.' },
            { text: 'Recall Binet\'s exact NCERT phrasing: "ability to judge well, understand well, and reason well."' },
            { text: 'Note that Binet\'s definition focuses on *cognitive operations* (judgment, understanding, reasoning), not speed or.' },
            { text: 'Contrast with Wechsler: "global and aggregate capacity to think rationally, act purposefully, and deal effectively with.' },
            { text: 'Construct the correct answer: "Binet defined intelligence as the ability to judge well, understand well, and reason.', faded: true, blankAnswer: 'Correct definition: "Binet defined intelligence as the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_01_011', title: 'Culture and intelligence refers to the.',
          scaffold: { problem: 'A school counsellor uses a standard Western verbal IQ test (normed on US middle-class children) to assess a 12-year-old student from a.',
            steps: [
            { text: 'Identify the test type — verbal, culture-loaded, normed on Western urban population → high cultural bias.' },
            { text: 'Identify the student’s cultural context — tribal, oral, nature-oriented, collectivistic → values skills not measured by.' },
            { text: 'Map student’s strengths to *buddhi* competencies: tracking/plant knowledge → cognitive capacity (discrimination,.' },
            { text: 'Map test demands to technological intelligence: vocabulary, abstract analogies, speed → analysis, abstraction,.' },
            { text: 'Conclude mismatch — test measures technological intelligence; student excels in integral intelligence (*buddhi*).' },
            { text: 'Judge recommendation — unjustified. The low score reflects cultural mismatch, not intellectual deficiency.', faded: true, blankAnswer: 'The recommendation is not justified. The test is.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_01_012', title: 'Emotional Intelligence (EI) is the.',
          scaffold: { problem: 'A career counsellor uses General Aptitude Test Battery (GATB) for a student, Arjun.',
            steps: [
            { text: 'Identify CA\'s core aptitude demands: High Numerical (calculations), High Clerical Perception (accuracy in accounts),.' },
            { text: 'Compare Arjun\'s profile: N=90 (excellent), Q=60 (average), G=85 (high), V=70 (good).' },
            { text: 'Judge fit: Strong match on N and G; Q is only average — may struggle with speed/accuracy in auditing.' },
            { text: 'Alternative 1: Data Scientist/Analyst — requires High G (85), High N (90), High V (70) for interpretation; low.' },
            { text: 'Alternative 2: Actuary — requires Highest G, N; Moderate V; Low others. Arjun\'s G=85, N=90 ideal.', faded: true, blankAnswer: 'CA fit = Moderate (needs clerical speed improvement)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_psy_cbse_01_001', title: 'Individual differences refer to the.',
          scaffold: { problem: 'A researcher wants to study individual differences in reaction time among 200 students.',
            steps: [
            { text: 'Identify what is being measured – reaction time to a visual stimulus.' },
            { text: 'Recognize that reaction time is a psychological attribute (speed of processing) though it has a physical component.' },
            { text: 'Note that the range (150-350 ms) shows variability among individuals – some are faster, some slower.' },
            { text: 'Conclude that this variability in a psychological attribute across individuals is the essence of individual differences.' },
            { text: 'Clarify that while reaction time involves physiological processes, it is studied as a psychological attribute because.', faded: true, blankAnswer: 'The study shows individual differences because students.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_psy_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'Gardner\'s Theory of Multiple Intelligences: Eight Independent Types', spots: [
            { id: 's1', label: 'Gardners Theory of Multiple Intelligences', prompt: 'Which idea is this? — Gardner\'s Theory of Multiple Intelligences proposes that intelligence is not a single.', answer: 'Gardners Theory of Multiple Intelligences', options: ['Gardners Theory of Multiple Intelligences', 'Assessment of psychological attributes is', 'Intelligence is a psychological construct', 'Culture and intelligence refers to'] },
            { id: 's2', label: 'Assessment of psychological attributes is', prompt: 'Which idea is this? — Assessment of psychological attributes is the systematic, standardized process of.', answer: 'Assessment of psychological attributes is', options: ['Assessment of psychological attributes is', 'Gardners Theory of Multiple Intelligences', 'Intelligence is a psychological construct', 'Culture and intelligence refers to'] },
            { id: 's3', label: 'Intelligence is a psychological construct', prompt: 'Which idea is this? — Intelligence is a psychological construct defined by Alfred Binet as the ability to judge.', answer: 'Intelligence is a psychological construct', options: ['Intelligence is a psychological construct', 'Gardners Theory of Multiple Intelligences', 'Assessment of psychological attributes is', 'Culture and intelligence refers to'] },
            { id: 's4', label: 'Culture and intelligence refers to', prompt: 'Which idea is this? — Culture and intelligence refers to the dynamic interplay where cultural context shapes.', answer: 'Culture and intelligence refers to', options: ['Culture and intelligence refers to', 'Gardners Theory of Multiple Intelligences', 'Assessment of psychological attributes is', 'Intelligence is a psychological construct'] },
            { id: 's5', label: 'Emotional Intelligence EI is the', prompt: 'Which idea is this? — Emotional Intelligence (EI) is the ability to perceive, understand, manage, and use.', answer: 'Emotional Intelligence EI is the', options: ['Emotional Intelligence EI is the', 'Gardners Theory of Multiple Intelligences', 'Assessment of psychological attributes is', 'Intelligence is a psychological construct'] },
            { id: 's6', label: 'Individual differences refer to the', prompt: 'Which idea is this? — Individual differences refer to the distinctiveness and variability among people in their.', answer: 'Individual differences refer to the', options: ['Individual differences refer to the', 'Gardners Theory of Multiple Intelligences', 'Assessment of psychological attributes is', 'Intelligence is a psychological construct'] }
          ] } }
    ],
    explore: { component: C12_PsychologyDefinitionIntelligenceFactorSim, prompt: 'Explore the interactive — Gardner\'s Theory of Multiple Intelligences: Eight Independent Types' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_005', difficulty: 'standard',
          question: 'Gardner\'s Theory of Multiple Intelligences proposes that intelligence is not a.',
          hint: 'Revisit c12_psy_cbse_01_004 (Spearman\'s g-factor and Thurstone\'s Primary Mental.',
          misconception: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Gardner\'s theory says there are 8 types of intelligence, and everyone has all 8 in equal amounts." Identify the error in this statement and.', answer: 'The statement contains two errors',
                  options: ['The statement contains two errors', 'A wrong answer reveals the student conflates', 'everyone is smart in their own way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that obscures the theory\'s.' },
                { id: 'b', prompt: 'A Class 12 student claims: "If someone has high Logical-Mathematical intelligence, they must also have high Spatial intelligence because both involve abstract.', answer: 'The claim is false',
                  options: ['The claim is false', 'everyone is smart in their own way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that obscures the theory\'s.' },
                { id: 'c', prompt: 'Priya is a 17-year-old who: (a) writes award-winning Hindi poetry, (b) cannot read maps or assemble furniture, (c) learns dance choreography after one.', answer: 'Mapping: Linguistic',
                  options: ['Mapping: Linguistic', 'smartness', 'everyone is smart in their own way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that obscures the theory\'s.' }
          ],
            remediations: { 'gardner-s-theory-means-everyone': { steps: ['If a student exhibits the above misconception: Step 1 — Have them re-read Gardner\'s original criteria (isolation by.', 'Step 2 — Give three cases: (a) a student who prefers diagrams (learning style), (b) a student who mentally rotates 3D.', 'Ask: "Which is an intelligence?', 'Justify using Gardner\'s criteria." Step 3 — If they still confuse, assign: "Write 150 words distinguishing.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that.',
          parts: [
                { id: 'a', prompt: 'Critique the following school policy using Gardner\'s theory: "Our school identifies \'gifted students\' using a standard IQ test (verbal + non-verbal reasoning).', answer: 'Limitations: (1) IQ tests primarily measure Linguistic and Logical-Mathematical',
                  options: ['Limitations: (1) IQ tests primarily measure Linguistic and Logical-Mathematical', 'everyone is smart in their own way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that obscures the theory\'s.' },
                { id: 'b', prompt: 'Design a 4-week Class 12 Psychology project that allows students to demonstrate understanding of Gardner\'s theory through ALL eight intelligences.', answer: 'Theme: "Understanding My Community." Deliverables: Linguistic',
                  options: ['Theme: "Understanding My Community." Deliverables: Linguistic', 'everyone is smart in their own way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Gardner\'s theory means "everyone is smart in their own way" — a feel-good platitude that obscures the theory\'s.' }
          ],
            remediations: { 'gardner-s-theory-means-everyone': { steps: ['If a student exhibits the above misconception: Step 1 — Have them re-read Gardner\'s original criteria (isolation by.', 'Step 2 — Give three cases: (a) a student who prefers diagrams (learning style), (b) a student who mentally rotates 3D.', 'Ask: "Which is an intelligence?', 'Justify using Gardner\'s criteria." Step 3 — If they still confuse, assign: "Write 150 words distinguishing.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_002', difficulty: 'standard',
          question: 'Assessment of psychological attributes is the systematic, standardized process.',
          hint: 'If stuck, revisit Class 11 Node c11_psy_cbse_02_003 (Observational Method) and.',
          misconception: 'Students often believe "psychological test" and "assessment" are interchangeable, and that a single test (like an IQ.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why psychological attributes are described as "multi-dimensional" rather than "unidimensional" in the NCERT text.', answer: 'A line (unidimensional) can be described by a single measure (length), but a box',
                  options: ['A line (unidimensional) can be described by a single measure (length), but a box', 'multi-dimensional', 'psychological test'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "psychological test" and "assessment" are interchangeable, and that a single test (like an IQ test) can measure a.' },
                { id: 'b', prompt: 'A researcher wants to study the leadership style of a student council president in a natural school setting over three months.', answer: 'Observation is most appropriate',
                  options: ['Observation is most appropriate', 'psychological test', 'interview'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "psychological test" and "assessment" are interchangeable, and that a single test (like an IQ test) can measure a.' },
                { id: 'c', prompt: 'Compare and contrast "interest" and "aptitude" as domains of psychological assessment. Why is it necessary to assess BOTH for career guidance?', answer: 'Interest is a person\'s preference for activities (what they like)',
                  options: ['Interest is a person\'s preference for activities (what they like)', 'psychological test', 'assessment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "psychological test" and "assessment" are interchangeable, and that a single test (like an IQ test) can measure a.' }
          ],
            remediations: { 'psychological-test-and-assessment-are': { steps: ['Re-read the NCERT distinction: "Assessment refers to the measurement... often using multiple methods...', 'Create a two-column table: Column A = "Assessment Process", Column B = "Psychological Test".', 'Write a 3-sentence explanation of why a clinician would NOT rely solely on an IQ test for a learning disability.', 'Re-attempt Diagnostic Question 1 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "psychological test" and "assessment" are interchangeable, and that a single test (like an IQ.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "A self-report questionnaire is the best method for assessing personality because it directly asks the person about themselves." Use.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'psychological test', 'assessment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "psychological test" and "assessment" are interchangeable, and that a single test (like an IQ test) can measure a.' },
                { id: 'b', prompt: 'Design a mini-assessment plan for a 14-year-old referred for "difficulty adjusting to new school." Specify: (a) two domains to assess, (b) one method per.', answer: 'two domains to assess, (',
                  options: ['two domains to assess, (', 'psychological test', 'assessment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "psychological test" and "assessment" are interchangeable, and that a single test (like an IQ test) can measure a.' }
          ],
            remediations: { 'psychological-test-and-assessment-are': { steps: ['Re-read the NCERT distinction: "Assessment refers to the measurement... often using multiple methods...', 'Create a two-column table: Column A = "Assessment Process", Column B = "Psychological Test".', 'Write a 3-sentence explanation of why a clinician would NOT rely solely on an IQ test for a learning disability.', 'Re-attempt Diagnostic Question 1 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_003', difficulty: 'standard',
          question: 'Intelligence is a psychological construct defined by Alfred Binet as the.',
          hint: 'Revisit c11_psy_cbse_02_007 (Characteristics of a Good Test) — focus on "standardization".',
          misconception: 'Students consistently write: **"Binet defined intelligence as mental age; Wechsler defined it as IQ."** This is.',
          parts: [
                { id: 'a', prompt: 'Compare how the "common-sense notion" of intelligence (mental alertness, ready wit, quickness in learning) differs from Binet\'s and Wechsler\'s definitions.', answer: '| Perspective | Focus | Key Verbs | Limitation |',
                  options: ['| Perspective | Focus | Key Verbs | Limitation |', 'global capacity', 'Binet = reasoning, Wechsler = adaptation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write: **"Binet defined intelligence as mental age; Wechsler defined it as IQ."** This is factually wrong and.' }
          ],
            remediations: { 'students-consistently-write-binet-defined': { steps: ['**Re-read the NCERT paragraphs** under "Intelligence" (pages 3-4 in the reference text) — highlight only the two.', '**Make two flashcards**: Card 1 front: "Binet (1905)"; back: "Judge well, understand well, reason well — cognitive.', '**Do the "Sorting" activity**: Write 10 behaviors on slips (e.g., "solves puzzle fast", "calms crying baby", "memorizes.', 'Sort into "Binet-focused" vs.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently write: **"Binet defined intelligence as mental age; Wechsler defined it as IQ."** This is.',
          parts: [
                { id: 'a', prompt: 'Compare how the "common-sense notion" of intelligence (mental alertness, ready wit, quickness in learning) differs from Binet\'s and Wechsler\'s definitions.', answer: '| Perspective | Focus | Key Verbs | Limitation |',
                  options: ['| Perspective | Focus | Key Verbs | Limitation |', 'global capacity', 'Binet = reasoning, Wechsler = adaptation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write: **"Binet defined intelligence as mental age; Wechsler defined it as IQ."** This is factually wrong and.' }
          ],
            remediations: { 'students-consistently-write-binet-defined': { steps: ['**Re-read the NCERT paragraphs** under "Intelligence" (pages 3-4 in the reference text) — highlight only the two.', '**Make two flashcards**: Card 1 front: "Binet (1905)"; back: "Judge well, understand well, reason well — cognitive.', '**Do the "Sorting" activity**: Write 10 behaviors on slips (e.g., "solves puzzle fast", "calms crying baby", "memorizes.', 'Sort into "Binet-focused" vs.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_011', difficulty: 'standard',
          question: 'Culture and intelligence refers to the dynamic interplay where cultural context.',
          hint: 'Revisit c12_psy_cbse_01_003 (definitions) and c12_psy_cbse_01_006 (Sternberg’s contextual.',
          misconception: 'Students often equate "cultural differences in intelligence" with "some cultures are smarter than others".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Culture and intelligence refers to the dynamic interplay where cultural context shapes',
                  options: ['Culture and intelligence refers to the dynamic interplay where cultural context shapes', 'Gardner\'s Theory of Multiple Intelligences proposes that intelligence is not a single', 'Assessment of psychological attributes is the systematic, standardized process of', 'Intelligence is a psychological construct defined by Alfred Binet as the ability to judge'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "cultural differences in intelligence" with "some cultures are smarter than others".' }
          ],
            remediations: { 'students-often-equate-cultural-differences': { steps: ['If a student expresses the above misconception: (1) Ask them to list the four *buddhi* competencies and identify which.', '(2) Have them re-read the NCERT paragraph: "Unlike the western views, which primarily focus on cognitive parameters,.', 'Who is more intelligent?" Guide them to see that the question itself is flawed because it imposes one culture’s metric.', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_3 to check if they now distinguish test bias from ability difference.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_012', difficulty: 'standard',
          question: 'Emotional Intelligence (EI) is the ability to perceive, understand, manage, and.',
          hint: 'Revisit c12_psy_cbse_01_003 (intelligence definitions), c12_psy_cbse_01_005/006.',
          misconception: 'Students equate "Emotional Intelligence" with "being nice/empathetic" or "suppressing emotions".',
          parts: [
                { id: 'a', prompt: 'A student scores 130 on IQ test but produces only conventional solutions on Torrance Tests of Creative Thinking.', answer: 'Threshold hypothesis: IQ and creativity correlate positively up to ~IQ 120',
                  options: ['Threshold hypothesis: IQ and creativity correlate positively up to ~IQ 120', 'high IQ always means high creativity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Emotional Intelligence" with "being nice/empathetic" or "suppressing emotions".' },
                { id: 'b', prompt: 'Compare the *nature* of items in Intelligence Tests vs Creativity Tests.', answer: 'Intelligence tests: convergent thinking',
                  options: ['Intelligence tests: convergent thinking', 'difficulty level'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Emotional Intelligence" with "being nice/empathetic" or "suppressing emotions".' }
          ],
            remediations: { 'students-equate-emotional-intelligence-with': { steps: ['Re-read NCERT Box 1.2 — highlight each verb: *Perceive, Relate, Understand, Control/Regulate*.', 'Watch 5-min video "Gross Emotion Regulation Model" (reappraisal vs suppression).', 'Write two scenarios: (a) Suppression: "I\'m fine" while trembling; (b) Reappraisal: "This criticism helps me improve."', 'Map to Salovey-Mayer branches: Perceiving (notice tremor), Understanding (criticism → threat to self-esteem), Managing.', 'Re-attempt Diagnostic Q1. If still confused, revisit c11_psy_cbse_08_010 (Managing Negative Emotions) for regulation.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "Emotional Intelligence" with "being nice/empathetic" or "suppressing emotions".',
          parts: [
                { id: 'a', prompt: 'Compare the *nature* of items in Intelligence Tests vs Creativity Tests.', answer: 'Intelligence tests: convergent thinking',
                  options: ['Intelligence tests: convergent thinking', 'difficulty level'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate "Emotional Intelligence" with "being nice/empathetic" or "suppressing emotions".' }
          ],
            remediations: { 'students-equate-emotional-intelligence-with': { steps: ['Re-read NCERT Box 1.2 — highlight each verb: *Perceive, Relate, Understand, Control/Regulate*.', 'Watch 5-min video "Gross Emotion Regulation Model" (reappraisal vs suppression).', 'Write two scenarios: (a) Suppression: "I\'m fine" while trembling; (b) Reappraisal: "This criticism helps me improve."', 'Map to Salovey-Mayer branches: Perceiving (notice tremor), Understanding (criticism → threat to self-esteem), Managing.', 'Re-attempt Diagnostic Q1. If still confused, revisit c11_psy_cbse_08_010 (Managing Negative Emotions) for regulation.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_001', difficulty: 'standard',
          question: 'Individual differences refer to the distinctiveness and variability among.',
          hint: 'If stuck, revisit Class 11 Psychology Chapter 3 (Human Development) – specifically the.',
          misconception: 'Students often think that situationism means traits don\'t exist or don\'t matter at all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Individual differences refer to the distinctiveness and variability among people in their',
                  options: ['Individual differences refer to the distinctiveness and variability among people in their', 'Gardner\'s Theory of Multiple Intelligences proposes that intelligence is not a single', 'Assessment of psychological attributes is the systematic, standardized process of', 'Intelligence is a psychological construct defined by Alfred Binet as the ability to judge'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that situationism means traits don\'t exist or don\'t matter at all.' }
          ],
            remediations: { 'situationism-means-traits-don-t': { steps: ['If a student holds the misconception that situationism denies traits, do this: 1) Re-read the NCERT paragraph on.', '2) Write down the exact sentence: "A person, who is generally aggressive, may behave in a submissive manner in the.', '4) Explain in your own words: The trait exists, but the situation overrides it.', '5) Then read the next sentence: "Sometimes, the situational influences are so powerful that individuals with differing.'] } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that situationism means traits don\'t exist or don\'t matter at all.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Individual differences are solely determined by heredity." Use the concept of nature-nurture interplay.', answer: 'The statement is false',
                  options: ['The statement is false', 'situationism means traits don\'t exist or don\'t matter at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that situationism means traits don\'t exist or don\'t matter at all.' },
                { id: 'b', prompt: 'Create a real-life scenario that demonstrates how both heredity and environment contribute to individual differences in a psychological attribute (e.g.,.', answer: 'Example: Two siblings inherit genes for high musical aptitude (heredity)',
                  options: ['Example: Two siblings inherit genes for high musical aptitude (heredity)', 'situationism means traits don\'t exist or don\'t matter at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that situationism means traits don\'t exist or don\'t matter at all.' }
          ],
            remediations: { 'situationism-means-traits-don-t': { steps: ['If a student holds the misconception that situationism denies traits, do this: 1) Re-read the NCERT paragraph on.', '2) Write down the exact sentence: "A person, who is generally aggressive, may behave in a submissive manner in the.', '4) Explain in your own words: The trait exists, but the situation overrides it.', '5) Then read the next sentence: "Sometimes, the situational influences are so powerful that individuals with differing.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
