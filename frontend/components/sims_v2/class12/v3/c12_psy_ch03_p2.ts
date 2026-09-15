import type { SimDef } from '../../engine/types';

/** v3 generated — c12_psy_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_psy_ch03_p2: SimDef = {
    id: 'v3_c12_psy_ch03_p2',
    title: 'Meeting Life Challenges · Part 2/2',
    subtitle: 'Same exam date — one dreads it, one plans for it',
    classLevel: 12, subject: 'psychology', topic: 'Meeting Life Challenges · Part 2/2',
    chapters: ['c12_psy_ch03'],
    nodeIds: ['c12_psy_cbse_03_007', 'c12_psy_cbse_03_008', 'c12_psy_cbse_03_009', 'c12_psy_cbse_03_010', 'c12_psy_cbse_03_011', 'c12_psy_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Stress appraiser', intro: 'Two students, one date sheet, two opposite reactions — stress lives in the appraisal, not the event.', goal: 'Define stress transactionally — stressor, appraisal, strain — and split eustress from distress.' },
    discovery: {
        question: 'Same board-exam date sheet: Priya\'s stomach knots in dread, Arjun opens a planner. If the event is identical, where does the stress actually live?',
        options: ['In the transaction — stress is the appraisal of demand against coping resources, not the event itself; same stressor, different strain', 'In the date sheet', 'In personalities only', 'In preparation'],
        answer: 'In the transaction — stress is the appraisal of demand against coping resources, not the event itself; same stressor, different strain',
        hook: '\'Eliminate distress, keep only eustress\' fails twice — stress isn\'t binary, and too little arousal leaves you listless; a threat and a challenge can be the same event appraised differently. And the stressor ending doesn\'t end the strain — appraisal and arousal stay linked.',
    },
    teaching: [
        { title: 'Coping with Stress: Task-oriented, Emotion-oriented and Avoidance Strategies', text: 'Coping refers to constantly changing cognitive and behavioural efforts to master, reduce, or tolerate the internal or external demands created by a stressful transaction.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_psy_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace one stressful event through the model: name stressor and strain, separate primary from secondary appraisal, and argue why \'it\'s all in your personality\' or \'all in the event\' both miss the transaction.',
        labels: ['Coping with Stress: Task-oriented,', 'Stress Management Techniques: Relaxation,', 'Cognitive Behavioural Techniques: Meichenbaum\'s', 'Stress-Resistant Personality: Hardiness', 'Life Skills for Positive', 'Promoting Positive Health: Diet,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_007', title: 'Coping with Stress: Task-oriented, Emotion-oriented and Avoidance Strategies',
          caseStudy: { intro: 'Imagine you have just received your Class 12 pre-board results and your marks are 15% lower than expected for your target university course.',
            decisions: [{ prompt: 'Define coping as per Lazarus and Folkman, and state how it differs from Endler and Parker\'s conceptualisation of coping strategies.', options: [
                { text: 'Lazarus and Folkman define coping as "constantly changing cognitive and behavioural', outcome: 'Lazarus and Folkman define coping as "constantly changing cognitive and behavioural efforts.' },
                { text: 'he is a task-oriented coper', outcome: 'Not quite — Students believe "avoidance coping is always bad/maladaptive" and "task-oriented coping is always.', reveals: 'avoidance-coping-is-always-bad' },
                { text: 'avoidance coping is always bad/maladaptive', outcome: 'Not quite — Students believe "avoidance coping is always bad/maladaptive" and "task-oriented coping is always.', reveals: 'avoidance-coping-is-always-bad' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_008', title: 'Stress Management Techniques: Relaxation, Meditation, Biofeedback and Creative Visualisation',
          caseStudy: { intro: 'Imagine a Class 12 student, Priya, who experiences trembling hands, racing heart, and blank mind during board exams despite thorough preparation.',
            decisions: [{ prompt: '**REMEMBER level:** List the three stages of Biofeedback training as described in the NCERT textbook, in correct sequence.', options: [
                { text: 'Correct answer: (1) Developing awareness of the particular physiological response (e.g.,', outcome: 'Correct answer: (1) Developing awareness of the particular physiological response (e.g., heart.' },
                { text: 'relaxation, meditation, visualisation', outcome: 'Not quite — **Misconception:** "Meditation and Relaxation are the same thing—both just make you calm." **Why.', reveals: 'misconception-meditation-and-relaxation-are' },
                { text: 'biofeedback', outcome: 'Not quite — **Misconception:** "Meditation and Relaxation are the same thing—both just make you calm." **Why.', reveals: 'misconception-meditation-and-relaxation-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_009', title: 'Cognitive Behavioural Techniques: Meichenbaum\'s Stress Inoculation Training',
          caseStudy: { intro: 'Imagine you have a Class 12 student, Priya, who freezes during board exam papers despite knowing the material — her heart races, thoughts spiral ("I\'ll fail.',
            decisions: [{ prompt: 'What are the three main phases of Meichenbaum\'s Stress Inoculation Training in their correct sequential order?', options: [
                { text: 'The three phases in order are: (1) Conceptualisation / Assessment Phase, (2) Skills', outcome: 'The three phases in order are: (1) Conceptualisation / Assessment Phase, (2) Skills Acquisition and.' },
                { text: 'cognitive restructuring + relaxation', outcome: 'Not quite — Students often believe SIT is simply "cognitive restructuring + relaxation" and that the three.', reveals: 'sit-is-simply-cognitive-restructuring' },
                { text: 'relaxation first, or omitting the assessment phase', outcome: 'Not quite — Students often believe SIT is simply "cognitive restructuring + relaxation" and that the three.', reveals: 'sit-is-simply-cognitive-restructuring' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_010', title: 'Stress-Resistant Personality: Hardiness and the Three Cs (Commitment, Control, Challenge)',
          caseStudy: { intro: 'Imagine two Class 12 students, Arjun and Meera, both facing the same high-stakes board exam timetable with three back-to-back papers.',
            decisions: [{ prompt: 'Define hardiness and list its three constituent components (the three Cs) using the exact terminology from the NCERT textbook.', options: [
                { text: 'Hardiness is a set of beliefs about oneself, the world, and how they interact, consisting', outcome: 'Hardiness is a set of beliefs about oneself, the world, and how they interact, consisting of three.' },
                { text: 'courage, confidence, calmness', outcome: 'Not quite — Students consistently confuse **Control (hardiness)** with **Locus of Control (Rotter)**.', reveals: 'students-consistently-confuse-control-hardiness' },
                { text: 'commitment, confidence, challenge', outcome: 'Not quite — Students consistently confuse **Control (hardiness)** with **Locus of Control (Rotter)**.', reveals: 'students-consistently-confuse-control-hardiness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_011', title: 'Life Skills for Positive Health: Assertiveness, Time Management and Rational Thinking',
          caseStudy: { intro: 'Imagine you have a major project due tomorrow, a friend asks you to help them move house this evening, and your inner voice says, "If I say no, they\'ll hate.',
            decisions: [{ prompt: 'Define assertiveness as described in the NCERT Class 12 Psychology textbook and give one example of an assertive statement.', options: [
                { text: 'Assertiveness is a behaviour or skill that helps to communicate clearly and confidently', outcome: 'Assertiveness is a behaviour or skill that helps to communicate clearly and confidently our.' },
                { text: 'A wrong answer that describes assertiveness as', outcome: 'Not quite — Students often believe that assertiveness means being aggressive or selfish — they equate "saying.', reveals: 'assertiveness-means-being-aggressive-or' },
                { text: 'getting your way at others\' expense', outcome: 'Not quite — Students often believe that assertiveness means being aggressive or selfish — they equate "saying.', reveals: 'assertiveness-means-being-aggressive-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_012', title: 'Promoting Positive Health: Diet, Exercise, Positive Attitude, Optimism and Social Support',
          caseStudy: { intro: 'Imagine a Class 12 student, Arjun, who sleeps 4 hours a night, skips breakfast, drinks three energy drinks daily, believes "I\'ll fail no matter what," and has.',
            decisions: [{ prompt: 'Define positive health according to the NCERT textbook and list its five constructs.', options: [
                { text: 'Positive health is a state of complete physical, mental, social, and spiritual', outcome: 'Positive health is a state of complete physical, mental, social, and spiritual well-being, not.' },
                { text: 'absence of illness', outcome: 'Not quite — Students believe "positive attitude" and "positive thinking/optimism" are synonyms, writing.', reveals: 'positive-attitude-and-positive-thinking' },
                { text: 'positive attitude', outcome: 'Not quite — Students believe "positive attitude" and "positive thinking/optimism" are synonyms, writing.', reveals: 'positive-attitude-and-positive-thinking' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Two interns get the same Friday deadline. One reads it as \'a challenge — I\'ve got the tools and the mentor on call\'; the other reads it as \'a threat — I\'m drowning and nobody will help.\' Same brief, opposite stress.',
            decisions: [{ prompt: 'What does Lazarus\'s appraisal theory say differs?', options: [
                { text: 'Both appraisals — the first appraised challenge (primary) plus sufficient coping resources (secondary), producing manageable eustress; the second appraised threat plus insufficient resources, producing distress; the event was identical — the interpretation is what differed.', outcome: 'The chapter\'s thesis: stress lives in the appraisal, not the event — which is why changing perceived resources changes the stress even when the deadline doesn\'t move.' },
                { text: 'Only their personalities differ — the deadline objectively is stressful.', outcome: 'That relocates stress into the person or the event, exactly what appraisal theory rules out — the model is transactional: the same event produces different stress through different evaluations of it.', reveals: 'stress-is-in-the-event' },
                { text: 'The second intern is simply realistic — recognizing a threat is accuracy, not appraisal.', outcome: 'Both are appraising — \'realistic\' is itself a judgment of harm and of resources; calling one reading objective hides the secondary appraisal that made it feel unmanageable.', reveals: 'my-appraisal-is-reality' }
            ] }] } },
        { type: 'case', nodeId: 'c12_psy_cbse_03_012', title: 'You made it',
          caseStudy: { intro: 'You can now locate stress where it actually lives — in the appraisal loop between a demand and your sense of coping.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_007', difficulty: 'standard',
          question: 'Coping refers to constantly changing cognitive and behavioural efforts.',
          hint: 'Revisit c12_psy_cbse_03_002 — specifically the section "Primary appraisal refers to the.',
          misconception: 'Students believe "avoidance coping is always bad/maladaptive" and "task-oriented coping is always good/adaptive." This.',
          parts: [
                { id: 'a', prompt: 'A student facing a difficult board examination uses the following behaviours: (a) creates a chapter-wise revision schedule, (b) tells herself "I\'m going.', answer: 'creates a chapter-wise revision schedule, (',
                  options: ['creates a chapter-wise revision schedule, (', 'avoidance because she\'s not studying', 'avoidance coping is always bad/maladaptive', 'task-oriented coping is always good/adaptive'],
                  hint: 'Revisit c12_psy_cbse_03_002 — specifically the section "Primary appraisal refers to the perception.',
                  misconception: 'Students believe "avoidance coping is always bad/maladaptive" and "task-oriented coping is always good/adaptive." This binary thinking.' },
                { id: 'b', prompt: 'Riya\'s father loses his job (uncontrollable stressor). She responds by: (i) updating his LinkedIn profile and networking with contacts, (ii) journaling her.', answer: '(i) Task-oriented',
                  options: ['(i) Task-oriented', 'adaptive because it gives her a break', 'avoidance coping is always bad/maladaptive', 'task-oriented coping is always good/adaptive'],
                  hint: 'Revisit c12_psy_cbse_03_002 — specifically the section "Primary appraisal refers to the perception.',
                  misconception: 'Students believe "avoidance coping is always bad/maladaptive" and "task-oriented coping is always good/adaptive." This binary thinking.' },
                { id: 'c', prompt: 'Compare and contrast Endler and Parker\'s three coping strategies with Lazarus and Folkman\'s two coping functions.', answer: 'Mapping: Task-oriented → Problem-focused (both target the stressor)',
                  options: ['Mapping: Task-oriented → Problem-focused (both target the stressor)', 'avoidance coping is always bad/maladaptive', 'task-oriented coping is always good/adaptive', 'facing problems'],
                  hint: 'Revisit c12_psy_cbse_03_002 — specifically the section "Primary appraisal refers to the perception.',
                  misconception: 'Students believe "avoidance coping is always bad/maladaptive" and "task-oriented coping is always good/adaptive." This binary thinking.' }
          ],
            remediations: { 'avoidance-coping-is-always-bad': { steps: ['Revisit c12_psy_cbse_03_002 (Lazarus Cognitive Appraisal) — specifically the distinction between primary appraisal.', 'Complete Activity 3.4 from NCERT (identify problem-focused vs.', 'For one week, keep a "Coping Function Log" — for each stress response, write: Stressor → Controllable?', 'Re-attempt Diagnostic Question 3 and 5. If still confusing avoidance with maladaptation, review the NCERT line.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "avoidance coping is always bad/maladaptive" and "task-oriented coping is always good/adaptive." This.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Task-oriented coping is always the best strategy; schools should teach students to never use emotion-oriented or avoidance-oriented.', answer: 'The statement is false',
                  options: ['The statement is false', 'problem-solving bias', 'avoidance coping is always bad/maladaptive', 'task-oriented coping is always good/adaptive'],
                  hint: 'Revisit c12_psy_cbse_03_002 — specifically the section "Primary appraisal refers to the perception.',
                  misconception: 'Students believe "avoidance coping is always bad/maladaptive" and "task-oriented coping is always good/adaptive." This binary thinking.' },
                { id: 'b', prompt: 'Design a 4-week coping skills module for Class 12 students preparing for board exams.', answer: '**Week 1 (Discrimination):** Objective',
                  options: ['**Week 1 (Discrimination):** Objective', 'avoidance coping is always bad/maladaptive', 'task-oriented coping is always good/adaptive', 'facing problems'],
                  hint: 'Revisit c12_psy_cbse_03_002 — specifically the section "Primary appraisal refers to the perception.',
                  misconception: 'Students believe "avoidance coping is always bad/maladaptive" and "task-oriented coping is always good/adaptive." This binary thinking.' }
          ],
            remediations: { 'avoidance-coping-is-always-bad': { steps: ['Revisit c12_psy_cbse_03_002 (Lazarus Cognitive Appraisal) — specifically the distinction between primary appraisal.', 'Complete Activity 3.4 from NCERT (identify problem-focused vs.', 'For one week, keep a "Coping Function Log" — for each stress response, write: Stressor → Controllable?', 'Re-attempt Diagnostic Question 3 and 5. If still confusing avoidance with maladaptation, review the NCERT line.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_008', difficulty: 'standard',
          question: 'Stress management techniques are structured, evidence-based psychological.',
          hint: 'Revisit c12_psy_cbse_03_004 (Effects of Stress on Psychological Functioning) and create.',
          misconception: '**Misconception:** "Meditation and Relaxation are the same thing—both just make you calm." **Why it’s wrong:** Students.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND level:** Explain why Creative Visualisation requires the person to have a "quiet mind, relaxed body, and closed eyes" before beginning the imagery.', answer: 'Correct answer: A quiet mind and relaxed body minimise physiological arousal and',
                  options: ['Correct answer: A quiet mind and relaxed body minimise physiological arousal and', 'creative energy', 'turning an imagined scene into reality', 'to concentrate better'],
                  hint: 'Revisit c12_psy_cbse_03_004 (Effects of Stress on Psychological Functioning) and create a 2x2 table.',
                  misconception: '**Misconception:** "Meditation and Relaxation are the same thing—both just make you calm." **Why it’s wrong:** Students equate the.' }
          ],
            remediations: { 'misconception-meditation-and-relaxation-are': { steps: ['If a student holds this misconception: 1.', '**Contrast the procedures side-by-side** using a two-column table: (Relaxation: "tense-release muscle groups from feet.', 'Meditation: "focus on breath/mantra, gently return attention when it wanders, eyes closed, goal = altered state").', '**Assign a micro-practice**: 5 minutes of PMR (body scan) on Day 1, 5 minutes of breath meditation on Day 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_009', difficulty: 'standard',
          question: 'Meichenbaum\'s Stress Inoculation Training (SIT) is a cognitive-behavioural.',
          hint: 'Revisit c12_psy_cbse_03_002 (Lazarus Cognitive Appraisal Theory) — specifically the.',
          misconception: 'Students often believe SIT is simply "cognitive restructuring + relaxation" and that the three phases can be reordered.',
          parts: [
                { id: 'a', prompt: 'A student says: "SIT is just positive thinking — you replace negative thoughts with positive ones." Why is this statement an oversimplification that misses the.', answer: 'The statement misses three key elements: (a) SIT begins with collaborative',
                  options: ['The statement misses three key elements: (a) SIT begins with collaborative', 'cognitive restructuring + relaxation'],
                  hint: 'Revisit c12_psy_cbse_03_002 (Lazarus Cognitive Appraisal Theory) — specifically the two-level.',
                  misconception: 'Students often believe SIT is simply "cognitive restructuring + relaxation" and that the three phases can be reordered or skipped based.' }
          ],
            remediations: { 'sit-is-simply-cognitive-restructuring': { steps: ['If a student exhibits the above misconception: (1) Have them re-read the Lazarus Cognitive Appraisal node.', '(2) Use a concrete analogy: "Would a doctor prescribe medication (Phase 2) without diagnosis (Phase 1)?" (3) Assign.', '(4) Re-diagnose with Diagnostic Question 2 — they must now explain why "positive thinking" is insufficient without the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_010', difficulty: 'standard',
          question: 'Hardiness is a constellation of three interrelated personality dispositions.',
          hint: 'Revisit c12_psy_cbse_03_002 (Lazarus Cognitive Appraisal Theory) and practice classifying.',
          misconception: 'Students consistently confuse **Control (hardiness)** with **Locus of Control (Rotter)**.',
          parts: [
                { id: 'a', prompt: 'Rohit, a Class 12 student, faces a sudden family financial crisis. He thinks: "This is terrible, but I\'ve handled tough situations before.', answer: 'Control is present: "I\'ll talk to my teachers',
                  options: ['Control is present: "I\'ll talk to my teachers', 'coping actions', 'hardiness components'],
                  hint: 'Revisit c12_psy_cbse_03_002 (Lazarus Cognitive Appraisal Theory) and practice classifying 5 daily.',
                  misconception: 'Students consistently confuse **Control (hardiness)** with **Locus of Control (Rotter)**.' }
          ],
            remediations: { 'students-consistently-confuse-control-hardiness': { steps: ['Have the student write the NCERT definitions of Commitment, Control, Challenge side-by-side with Rotter\'s.', 'Ask them to circle words that appear in *both* definitions — typically only "control," "influence," "outcomes."', 'Highlight the NCERT-specific phrases: "sense of purpose and direction," "commitment to work, family, hobbies," "see.', 'Give a vignette: "Priya believes she controls her grades (internal locus) but feels no purpose in studying and sees.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_011', difficulty: 'standard',
          question: 'Life skills for positive health are adaptive behavioural competencies.',
          hint: 'Revisit c12_psy_cbse_03_002 (Lazarus Cognitive Appraisal) and c12_psy_cbse_03_007 (Coping.',
          misconception: 'Students often believe that assertiveness means being aggressive or selfish — they equate "saying no" with rudeness.',
          parts: [
                { id: 'a', prompt: 'Explain why the NCERT text states that "the central principle of time management is to spend your time doing the things that you value, or that help you.', answer: 'The principle emphasises alignment with personal values and goals',
                  options: ['The principle emphasises alignment with personal values and goals', 'saying no', 'assertiveness means being aggressive or selfish'],
                  hint: 'Revisit c12_psy_cbse_03_002 (Lazarus Cognitive Appraisal) and c12_psy_cbse_03_007 (Coping with.',
                  misconception: 'Students often believe that assertiveness means being aggressive or selfish — they equate "saying no" with rudeness.' }
          ],
            remediations: { 'assertiveness-means-being-aggressive-or': { steps: ['If a student conflates assertiveness with aggression, guide them through a three-step correction: (1) Present.', '(2) Have the student role-play the assertive response using the "I feel...', 'I need..." structure, emphasising respect for both parties.', '(3) Ask the student to rewrite their aggressive example into an assertive one and explain which element (respect for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_psy_cbse_03_012', difficulty: 'standard',
          question: 'Positive health is a holistic state of complete physical, mental, social, and.',
          hint: 'Revisit c12_psy_cbse_03_005 (GAS stages) and c12_psy_cbse_03_007 (problem-focused vs.',
          misconception: 'Students believe "positive attitude" and "positive thinking/optimism" are synonyms, writing identical definitions for.',
          parts: [
                { id: 'a', prompt: 'Define positive health according to the NCERT textbook and list its five constructs.', answer: 'Positive health is a state of complete physical, mental, social, and spiritual',
                  options: ['Positive health is a state of complete physical, mental, social, and spiritual', 'absence of illness', 'positive attitude', 'positive thinking/optimism'],
                  hint: 'Revisit c12_psy_cbse_03_005 (GAS stages) and c12_psy_cbse_03_007 (problem-focused vs.',
                  misconception: 'Students believe "positive attitude" and "positive thinking/optimism" are synonyms, writing identical definitions for both.' },
                { id: 'b', prompt: 'A student facing board exams reports: "I eat junk food, don\'t exercise, think I\'ll fail, and avoid friends." Using the five pillars of positive health, design.', answer: 'Week 1: Diet — replace one junk meal/day with a fruit + nut snack',
                  options: ['Week 1: Diet — replace one junk meal/day with a fruit + nut snack', 'positive attitude', 'positive thinking/optimism'],
                  hint: 'Revisit c12_psy_cbse_03_005 (GAS stages) and c12_psy_cbse_03_007 (problem-focused vs.',
                  misconception: 'Students believe "positive attitude" and "positive thinking/optimism" are synonyms, writing identical definitions for both.' },
                { id: 'c', prompt: 'Compare and contrast Kobasa\'s three Cs of hardiness (commitment, control, challenge) with the three resources of resilience (I HAVE, I AM, I CAN).', answer: 'Hardiness describes enduring personality traits: commitment (engagement vs',
                  options: ['Hardiness describes enduring personality traits: commitment (engagement vs', 'they\'re the same', 'positive attitude', 'positive thinking/optimism'],
                  hint: 'Revisit c12_psy_cbse_03_005 (GAS stages) and c12_psy_cbse_03_007 (problem-focused vs.',
                  misconception: 'Students believe "positive attitude" and "positive thinking/optimism" are synonyms, writing identical definitions for both.' }
          ],
            remediations: { 'positive-attitude-and-positive-thinking': { steps: ['Have the student create a two-column table with "Positive Attitude" and "Optimism" as headers.', 'Under each, list the NCERT bullet points verbatim (attitude: accurate perception, purpose, responsibility, tolerance.', 'For each bullet, generate one behavioral example (e.g., attitude: "admits mistake in group project"; optimism: "after.', 'Ask: "Can someone have a positive attitude but be pessimistic?" (Yes — realistic about challenges but expects effort.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
