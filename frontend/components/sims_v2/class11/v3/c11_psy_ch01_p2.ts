import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch01_p2: SimDef = {
    id: 'v3_c11_psy_ch01_p2',
    title: 'What is Psychology? · Part 2/2',
    subtitle: 'See why two opposite proverbs can both be \'common sense\' — and neither is science.',
    classLevel: 11, subject: 'psychology', topic: 'What is Psychology? · Part 2/2',
    chapters: ['c11_psy_ch01'],
    nodeIds: ['c11_psy_cbse_01_007', 'c11_psy_cbse_01_008', 'c11_psy_cbse_01_009', 'c11_psy_cbse_01_010', 'c11_psy_cbse_01_011', 'c11_psy_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a researcher refusing to accept a proverb as a theory', intro: '\'He\'s aggressive because he\'s frustrated\' sounds right — which is exactly the problem; so would the opposite explanation.', goal: 'Distinguish scientific psychology\'s testable models from common-sense rationalisation.' },
    discovery: {
        question: '\'Absence makes the heart grow fonder\' and \'out of sight, out of mind\' — both wise, both proverbs. Which one is psychology?',
        options: ['Neither — common sense supplies opposite answers on demand; psychology tests which prediction survives evidence', 'Both — folk wisdom is psychology', 'The first — it\'s more romantic', 'The second — it\'s more cynical'],
        answer: 'Neither — common sense supplies opposite answers on demand; psychology tests which prediction survives evidence',
        hook: 'Dweck\'s finding that easy tasks reduced performance persistence is exactly the kind of counterintuitive result proverbs can never produce.',
    },
    teaching: [
        { title: 'Gestalt Psychology: Whole is Greater than Parts', text: 'Gestalt psychology is a school of thought that emphasizes the human tendency to perceive objects as organized wholes (Gestalts) rather than as collections of discrete parts, asserting that the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take the bystander-in-emergency puzzle and separate a retrospective \'people are selfish\' shrug from a testable psychological model.',
        labels: ['Gestalt Psychology: Whole', 'Psychoanalysis: Freud and', 'Humanistic Psychology: Maslow', 'Cognitive Psychology: Mental Processes', 'Major Branches of Psychology', 'Psychology in India: Historical'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_007', title: 'Gestalt Psychology: Whole is Greater than Parts',
          caseStudy: { intro: 'Imagine you are watching a Bollywood movie on a screen. Physically, the screen shows only rapid, discrete flashes of still images (24 frames per second) with.',
            decisions: [{ prompt: 'State the fundamental principle of Gestalt psychology in one sentence and name the German psychologist who founded the first Gestalt.', options: [
                { text: 'The fundamental principle is "the whole is greater than the sum of its parts" (or "the', outcome: 'The fundamental principle is "the whole is greater than the sum of its parts" (or "the whole.' },
                { text: 'it studies elements of consciousness', outcome: 'Not quite — Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made.', reveals: 'students-often-confuse-the-whole' },
                { text: 'the whole is greater than the sum of its parts', outcome: 'Not quite — Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made.', reveals: 'students-often-confuse-the-whole' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_008', title: 'Psychoanalysis: Freud and the Unconscious Mind',
          caseStudy: { intro: 'Have you ever blurted out a word you didn\'t mean to say, or had a dream that felt strangely meaningful, or found yourself irrationally angry at someone who.',
            decisions: [{ prompt: 'What are the three components of Freud\'s structural model of personality, and what principle governs the functioning of each?', options: [
                { text: 'The three components are the id (operates on the pleasure principle, seeking immediate', outcome: 'The three components are the id (operates on the pleasure principle, seeking immediate.' },
                { text: 'conscious, subconscious, unconscious', outcome: 'Not quite — Students frequently equate Freud\'s "unconscious" with the everyday notion of "subconscious".', reveals: 'students-frequently-equate-freud-s' },
                { text: 'I unconsciously forgot my homework', outcome: 'Not quite — Students frequently equate Freud\'s "unconscious" with the everyday notion of "subconscious".', reveals: 'students-frequently-equate-freud-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_009', title: 'Humanistic Psychology: Maslow and Rogers on Self-Actualisation',
          caseStudy: { intro: 'Imagine a Class 11 student named Arjun who scores 95% in his board exams but still feels empty and anxious—he wonders, "Is this all there is?',
            decisions: [{ prompt: 'Define self-actualisation according to Maslow and state its position in the hierarchy of needs.', options: [
                { text: 'Self-actualisation is the highest level in Maslow\'s hierarchy, representing the innate', outcome: 'Self-actualisation is the highest level in Maslow\'s hierarchy, representing the innate drive.' },
                { text: 'self-actualised person', outcome: 'Not quite — Students frequently believe that **self-actualisation is a permanent, achieved state** (like.', reveals: 'students-frequently-believe-that-self' },
                { text: 'fully functioning person', outcome: 'Not quite — Students frequently believe that **self-actualisation is a permanent, achieved state** (like.', reveals: 'students-frequently-believe-that-self' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_010', title: 'Cognitive Psychology: Mental Processes and Information Processing',
          caseStudy: { intro: 'Imagine you\'re solving a difficult math problem in a noisy classroom: your brain filters out the chatter (attention), recognises the symbols on the page.',
            decisions: [{ prompt: 'Define "cognition" as used in cognitive psychology, and list any four core mental processes it investigates.', options: [
                { text: 'Cognition refers to the process of knowing—acquiring, storing, transforming, and using', outcome: 'Cognition refers to the process of knowing—acquiring, storing, transforming, and using information.' },
                { text: 'thinking', outcome: 'Not quite — Students often believe "cognitive psychology = studying thinking" and equate it with *only*.', reveals: 'cognitive-psychology-studying-thinking-and' },
                { text: 'intelligence', outcome: 'Not quite — Students often believe "cognitive psychology = studying thinking" and equate it with *only*.', reveals: 'cognitive-psychology-studying-thinking-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_011', title: 'Major Branches of Psychology: Clinical, Counselling, Educational',
          caseStudy: { intro: 'Imagine three Class 11 students: Rohan has been feeling intense, persistent sadness and hopelessness for months, struggling to get out of bed; Priya.',
            decisions: [{ prompt: 'Name the branch of psychology that primarily deals with the assessment, diagnosis, and treatment of mental disorders such as anxiety.', options: [
                { text: 'Clinical Psychology', outcome: 'Clinical Psychology. A wrong answer (e.g., "Counselling Psychology" or "Psychiatry") reveals.' },
                { text: 'Counselling Psychology', outcome: 'Not quite — Students frequently confuse "Clinical Psychology" and "Psychiatry" as interchangeable terms, and.', reveals: 'students-frequently-confuse-clinical-psychology' },
                { text: 'Psychiatry', outcome: 'Not quite — Students frequently confuse "Clinical Psychology" and "Psychiatry" as interchangeable terms, and.', reveals: 'students-frequently-confuse-clinical-psychology' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_012', title: 'Psychology in India: Historical Development and Current Status',
          caseStudy: { intro: 'Imagine you are a Class 11 student in 2024 choosing psychology as an elective.',
            decisions: [{ prompt: 'What was the first institution in India to establish a psychology laboratory and a formal Department of Psychology, and in which years did.', options: [
                { text: 'The first psychology laboratory was established at Calcutta University in 1915, and the', outcome: 'The first psychology laboratory was established at Calcutta University in 1915, and the first.' },
                { text: 'NIMHANS or a post-independence university', outcome: 'Not quite — Students often believe "Indigenisation means replacing Western psychology with ancient Indian texts.', reveals: 'indigenisation-means-replacing-western-psycholog' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a psychology taster session, a student shrugs: \'Psychology is just common sense — everyone knows absent friends fade, out of sight out of mind.\' A classmate counters with the opposite proverb: \'Distance makes the heart grow fonder.\'',
            decisions: [{ prompt: 'What does this contradiction reveal about the discipline?', options: [
                { text: 'Show why science is needed: both proverbs sound wise yet contradict — common sense explains after the fact but can\'t predict. Scientific psychology builds testable models that specify WHEN each holds: e.g., the bystander effect predicts helping falls as witness numbers rise, via diffusion of responsibility — a mechanism, not a trait label like \'people are selfish\'.', outcome: 'The room sees the difference: psychology studies mental processes, experience and behaviour with methods that could turn out wrong — hindsight proverbs can\'t lose.' },
                { text: 'Pick the truer proverb — decide which one matches your own experience.', outcome: 'Choosing by anecdote repeats the problem: both feel true in hindsight; only empirical testing separates when each pattern actually occurs.', reveals: 'pick-the-truer-proverb' },
                { text: 'Conclude psychology is just tidied-up common sense — studies confirm what we already know.', outcome: 'Findings are often counter-intuitive — e.g., easy tasks can reduce persistence — so the discipline exists precisely because intuition is unreliable.', reveals: 'psychology-confirms-common-sense' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'Common sense explains everything after the fact and predicts nothing — science earns its name by risking a wrong prediction.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_007', difficulty: 'standard',
          question: 'Gestalt psychology is a school of thought that emphasizes the human tendency.',
          hint: 'Revisit c11_psy_cbse_01_004: focus on the definition of "element" in structuralism and.',
          misconception: 'Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made of* parts" — they.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the Gestalt concept of "insight learning" (Köhler\'s chimpanzees) with the behaviourist "trial-and-error learning" (Thorndike\'s cats).', answer: 'role of mental representation, (',
                  options: ['role of mental representation, (', 'both show gradual curves', 'insight is just fast trial-and-error', 'the whole is greater than the sum of its parts'],
                  hint: 'Revisit c11_psy_cbse_01_004: focus on the definition of "element" in structuralism and the example.',
                  misconception: 'Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made of* parts" — they think Gestalt psychology.' }
          ],
            remediations: { 'students-often-confuse-the-whole': { steps: ['Draw two identical dot patterns: Pattern X (random scatter) and Pattern Y (same dots arranged in a circle).', 'Emphasize: Parts are necessary but not sufficient. The *organization* (spatial relation) is the additional causal.', 'Contrast with structuralism: Wundt would analyze X and Y into same elements (dots, positions) and miss the difference.', 'Practice board-style question: "Gestalt psychology ignores the elements of consciousness." → False.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made of* parts" — they.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Gestalt principles of perception are universal biological hardwiring, so cultural differences in perception (e.g., Müller-Lyer.', answer: 'The statement is false',
                  options: ['The statement is false', 'illusions are optical, not cultural', 'Gestalt laws are innate so culture irrelevant', 'the whole is greater than the sum of its parts'],
                  hint: 'Revisit c11_psy_cbse_01_004: focus on the definition of "element" in structuralism and the example.',
                  misconception: 'Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made of* parts" — they think Gestalt psychology.' },
                { id: 'b', prompt: 'Design a real-world Indian traffic signage system for a chaotic 4-way intersection using at least three Gestalt laws to minimize cognitive load for drivers.', answer: 'Layout: (1) **Proximity**: Group all lane-specific signs (left-turn, straight,',
                  options: ['Layout: (1) **Proximity**: Group all lane-specific signs (left-turn, straight,', 'the whole is greater than the sum of its parts', 'the whole is *made of* parts', 'Gestalt psychology denies the existence of parts/elements'],
                  hint: 'Revisit c11_psy_cbse_01_004: focus on the definition of "element" in structuralism and the example.',
                  misconception: 'Students often confuse "the whole is greater than the sum of its parts" with "the whole is *made of* parts" — they think Gestalt psychology.' }
          ],
            remediations: { 'students-often-confuse-the-whole': { steps: ['Draw two identical dot patterns: Pattern X (random scatter) and Pattern Y (same dots arranged in a circle).', 'Emphasize: Parts are necessary but not sufficient. The *organization* (spatial relation) is the additional causal.', 'Contrast with structuralism: Wundt would analyze X and Y into same elements (dots, positions) and miss the difference.', 'Practice board-style question: "Gestalt psychology ignores the elements of consciousness." → False.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_008', difficulty: 'standard',
          question: 'Psychoanalysis is a comprehensive theory of personality and a therapeutic.',
          hint: 'If confused about the shift from conscious to unconscious focus, revisit.',
          misconception: 'Students frequently equate Freud\'s "unconscious" with the everyday notion of "subconscious" — things temporarily.',
          parts: [
                { id: 'a', prompt: 'A 16-year-old student who was bitten by a dog at age 4 now experiences intense anxiety when seeing any dog, but has no conscious memory of the bite.', answer: 'The defense mechanism is repression',
                  options: ['The defense mechanism is repression', 'forgetting', 'suppression', 'I unconsciously forgot my homework'],
                  hint: 'If confused about the shift from conscious to unconscious focus, revisit c11_psy_cbse_01_004.',
                  misconception: 'Students frequently equate Freud\'s "unconscious" with the everyday notion of "subconscious" — things temporarily forgotten or not currently.' }
          ],
            remediations: { 'students-frequently-equate-freud-s': { steps: ['Explicitly contrast the three terms: *preconscious* (available to awareness with attention, e.g., your breakfast.', 'Use the "censor at the gate" metaphor: the ego stands guard; repressed material pushes against the gate but cannot.', 'Assign a 5-minute writing task: "Describe a time you *chose* not to think about something (suppression) vs.', 'a time you *genuinely didn\'t know* why you felt/acted a certain way until later reflection (unconscious leak)." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_009', difficulty: 'standard',
          question: 'Humanistic psychology is a psychological perspective that emphasizes the.',
          hint: 'Revisit c11_psy_cbse_01_006 (Behaviourism) and c11_psy_cbse_01_008 (Psychoanalysis).',
          misconception: 'Students frequently believe that **self-actualisation is a permanent, achieved state** (like a trophy you win once).',
          parts: [
                { id: 'a', prompt: 'A student says: "Maslow and Rogers are basically saying the same thing—people want to grow.', answer: 'The statement is inaccurate',
                  options: ['The statement is inaccurate', 'growth theories', 'self-actualised person', 'fully functioning person'],
                  hint: 'Revisit c11_psy_cbse_01_006 (Behaviourism) and c11_psy_cbse_01_008 (Psychoanalysis) focusing.',
                  misconception: 'Students frequently believe that **self-actualisation is a permanent, achieved state** (like a trophy you win once) rather than an ongoing.' }
          ],
            remediations: { 'students-frequently-believe-that-self': { steps: ['If a student conflates self-actualisation as a fixed endpoint or merges Maslow/Rogers traits: **Step 1**—Draw two.', '**Step 2**—Use the "Arjun" case from the walkthrough: map his current position on *both* models (Maslow: esteem needs.', '**Step 3**—Give a 3-mark practice question: "Distinguish between Maslow\'s and Rogers\' views on whether a person whose.', 'This contrast is the examinable differentiator.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_010', difficulty: 'standard',
          question: 'Cognitive psychology is the scientific study of mental processes—including.',
          hint: 'Revisit the "Behaviourism: Watson and the Stimulus-Response Approach" and "Gestalt.',
          misconception: 'Students often believe "cognitive psychology = studying thinking" and equate it with *only* higher-order processes like.',
          parts: [
                { id: 'a', prompt: 'Compare Piaget\'s constructivism and Vygotsky\'s socio-cultural constructivism on: (a) the primary driver of cognitive development, and (b) the role of social.', answer: 'the primary driver of cognitive development, and (',
                  options: ['the primary driver of cognitive development, and (', 'both think children construct knowledge', 'cognitive psychology = studying thinking', 'children construct knowledge" without differentiating *how* (individual vs'],
                  hint: 'Revisit the "Behaviourism: Watson and the Stimulus-Response Approach" and "Gestalt Psychology.',
                  misconception: 'Students often believe "cognitive psychology = studying thinking" and equate it with *only* higher-order processes like problem-solving.' }
          ],
            remediations: { 'cognitive-psychology-studying-thinking-and': { steps: ['Ask the student to walk through the "math problem in a noisy room" scenario from the Walkthrough, naming *each* mental.', 'Have them label each step with the correct cognitive process term (attention, perception, long-term memory retrieval.', 'Explicitly contrast: "Which of these steps would a behaviourist say we can study?" (None—they\'re all internal).', '"Which would a cognitive psychologist study?" (All—they\'re information processing stages).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_011', difficulty: 'standard',
          question: 'Clinical Psychology focuses on the assessment, diagnosis, treatment, and.',
          hint: 'Revisit c11_psy_cbse_01_001 (definition of psychology) and c11_psy_cbse_01_003 (natural.',
          misconception: 'Students frequently confuse "Clinical Psychology" and "Psychiatry" as interchangeable terms, and they conflate.',
          parts: [
                { id: 'a', prompt: 'Name the branch of psychology that primarily deals with the assessment, diagnosis, and treatment of mental disorders such as anxiety disorders, depression, and.', answer: 'Clinical Psychology',
                  options: ['Clinical Psychology', 'Counselling Psychology', 'Psychiatry'],
                  hint: 'Revisit c11_psy_cbse_01_001 (definition of psychology) and c11_psy_cbse_01_003 (natural vs social.',
                  misconception: 'Students frequently confuse "Clinical Psychology" and "Psychiatry" as interchangeable terms, and they conflate "Counselling Psychology".' },
                { id: 'b', prompt: 'A school principal wants to redesign the Class 9 mathematics curriculum because students consistently perform poorly on word problems.', answer: 'Educational Psychology',
                  options: ['Educational Psychology', 'Clinical Psychology', 'Counselling Psychology', 'Psychiatry'],
                  hint: 'Revisit c11_psy_cbse_01_001 (definition of psychology) and c11_psy_cbse_01_003 (natural vs social.',
                  misconception: 'Students frequently confuse "Clinical Psychology" and "Psychiatry" as interchangeable terms, and they conflate "Counselling Psychology".' },
                { id: 'c', prompt: 'Compare and contrast the training and legal scope of practice of a clinical psychologist and a psychiatrist in India.', answer: '| Aspect | Clinical Psychologist | Psychiatrist |',
                  options: ['| Aspect | Clinical Psychologist | Psychiatrist |', 'Clinical Psychology', 'Psychiatry', 'Counselling Psychology'],
                  hint: 'Revisit c11_psy_cbse_01_001 (definition of psychology) and c11_psy_cbse_01_003 (natural vs social.',
                  misconception: 'Students frequently confuse "Clinical Psychology" and "Psychiatry" as interchangeable terms, and they conflate "Counselling Psychology".' }
          ],
            remediations: { 'students-frequently-confuse-clinical-psychology': { steps: ['Draw a three-circle Venn diagram on paper. Label circles: Clinical, Counselling, Psychiatry.', 'In the Clinical circle, write: "M.Phil Clinical Psych (RCI), Psychotherapy, Assessment, NO prescription." In Psychiatry.', 'Write the overlapping area between Clinical and Counselling: "Both do psychotherapy, both are non-medical."', 'Read the NCERT paragraph "Clinical and Counselling Psychology deals with..." and underline "clinical psychologist has.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_01_012', difficulty: 'standard',
          question: 'Psychology in India refers to the historical evolution of psychology as.',
          hint: 'Revisit node c11_psy_cbse_01_004 (Wundt/Structuralism) and c11_psy_cbse_01_008.',
          misconception: 'Students often believe "Indigenisation means replacing Western psychology with ancient Indian texts only." This error.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Psychology in India refers to the historical evolution of psychology as an academic',
                  options: ['Psychology in India refers to the historical evolution of psychology as an academic', 'Psychology is formally defined as the scientific discipline that studies mental', 'Scientific psychology is the systematic study of mental processes, experiences, and', 'Psychology as a natural science uses the hypothetico-deductive model, controlled'],
                  hint: 'Revisit node c11_psy_cbse_01_004 (Wundt/Structuralism) and c11_psy_cbse_01_008.',
                  misconception: 'Students often believe "Indigenisation means replacing Western psychology with ancient Indian texts only." This error arises because.' }
          ],
            remediations: { 'indigenisation-means-replacing-western-psycholog': { steps: ['If a student holds this misconception: 1.', '**Contrast two concrete examples:** Show a 1980s "revivalist" paper (e.g., "Guna theory as personality typology".', 'a 2020s indigenised study (e.g., "fMRI correlates of *Samadhi* states in expert meditators" – uses neuroscience.', '**Map the "Three Pillars" of current Indian psychology on board:** (A) Indigenous Concepts (from texts), (B) Modern.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
