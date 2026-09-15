import type { SimDef } from '../../engine/types';

/** v3 generated — c11_psy_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_psy_ch05_p2: SimDef = {
    id: 'v3_c11_psy_ch05_p2',
    title: 'Learning · Part 2/2',
    subtitle: 'Watch a bell stay a bell while quietly becoming a prediction.',
    classLevel: 11, subject: 'psychology', topic: 'Learning · Part 2/2',
    chapters: ['c11_psy_ch05'],
    nodeIds: ['c11_psy_cbse_05_007', 'c11_psy_cbse_05_008', 'c11_psy_cbse_05_009', 'c11_psy_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a behaviourist timing the signal before the food', intro: 'The dog salivates to a sound — not because the sound became food, but because it learned to mean food.', goal: 'Explain classical conditioning as signal learning and distinguish learning from performance.' },
    discovery: {
        question: 'After conditioning, the bell \'becomes food\' for Pavlov\'s dog — a fair summary?',
        options: ['No — the bell stays a bell; it gains signal value predicting food, and salivation is a preparatory response, not the food-response moved', 'Yes — the CS replaces the US', 'Yes — the dog now thinks bell is edible', 'No — because dogs can\'t learn sounds'],
        answer: 'No — the bell stays a bell; it gains signal value predicting food, and salivation is a preparatory response, not the food-response moved',
        hook: 'Contiguity isn\'t enough — present the food before the bell (backward conditioning) and the pairing fails; the signal must predict, not just accompany.',
    },
    teaching: [
        { title: 'Cognitive Learning: Kohler\'s Insight Learning', text: 'Insight learning is a form of cognitive learning where the solution to a problem emerges suddenly through the mental restructuring of the problem situation, enabling the learner to perceive the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_psy_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Separate learning from performance — the crammed-then-forgotten exam answer — and test whether \'relatively permanent\' survives forgetting.',
        labels: ['Cognitive Learning: Kohler\'s Insight', 'Latent Learning: Tolman\'s Cognitive', 'Skill Learning: Stages', 'Factors Facilitating Learning'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_007', title: 'Cognitive Learning: Kohler\'s Insight Learning',
          caseStudy: { intro: 'Imagine you\'re stuck on a difficult mathematics problem — you\'ve tried every formula you know, nothing works, so you set it aside and go for a walk.',
            decisions: [{ prompt: 'Define insight learning and state the two key characteristics that distinguish it from operant conditioning.', options: [
                { text: 'Insight learning is the sudden comprehension of a problem\'s solution through mental', outcome: 'Insight learning is the sudden comprehension of a problem\'s solution through mental restructuring.' },
                { text: 'fast trial-and-error', outcome: 'Not quite — Students believe insight learning is simply "fast learning" or "learning without practice" — they.', reveals: 'insight-learning-is-simply-fast' },
                { text: 'learning without reinforcement', outcome: 'Not quite — Students believe insight learning is simply "fast learning" or "learning without practice" — they.', reveals: 'insight-learning-is-simply-fast' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_008', title: 'Latent Learning: Tolman\'s Cognitive Maps',
          caseStudy: { intro: 'Imagine you walk through a new neighbourhood every day on your way to tuition, but you never stop to explore the side lanes.',
            decisions: [{ prompt: 'Define latent learning and state one way it differs from operant conditioning in terms of the role of reinforcement.', options: [
                { text: 'Latent learning is learning that occurs without immediate reinforcement and is not', outcome: 'Latent learning is learning that occurs without immediate reinforcement and is not demonstrated.' },
                { text: 'latent learning requires no reinforcement at all', outcome: 'Not quite — Students often confuse *latent learning* with *insight learning*, thinking both involve "sudden.', reveals: 'students-often-confuse-latent-learning' },
                { text: 'sudden understanding', outcome: 'Not quite — Students often confuse *latent learning* with *insight learning*, thinking both involve "sudden.', reveals: 'students-often-confuse-latent-learning' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_009', title: 'Skill Learning: Stages and Factors Facilitating Skill Acquisition',
          caseStudy: { intro: 'Think about learning to drive a car in Indian traffic. At first, you consciously remember every step: "clutch, gear, mirror, indicator" (cognitive phase).',
            decisions: [{ prompt: 'Define \'skill\' as per NCERT Class 11 Psychology and name the three phases of skill acquisition proposed by Fitts.', options: [
                { text: 'A skill is the ability to perform a complex task smoothly and efficiently', outcome: 'A skill is the ability to perform a complex task smoothly and efficiently.' },
                { text: 'practice, feedback, mastery', outcome: 'Not quite — Students believe the three phases are strictly time-based (e.g., "cognitive phase lasts 2 weeks").', reveals: 'the-three-phases-are-strictly' },
                { text: 'cognitive phase lasts 2 weeks', outcome: 'Not quite — Students believe the three phases are strictly time-based (e.g., "cognitive phase lasts 2 weeks").', reveals: 'the-three-phases-are-strictly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_010', title: 'Factors Facilitating Learning and Learning Styles',
          caseStudy: { intro: 'Imagine you are preparing for your Class 11 final exams: you study two chapters—one you find fascinating (intrinsic motivation) and one you dread but need for.',
            decisions: [{ prompt: 'State the partial reinforcement effect and name the two reinforcement schedules it compares.', options: [
                { text: 'The partial reinforcement effect states that responses acquired under partial', outcome: 'The partial reinforcement effect states that responses acquired under partial (intermittent).' },
                { text: 'continuous reinforcement is more resistant to extinction', outcome: 'Not quite — Students believe "learning disabilities mean the child is \'slow\' or has low intelligence." This.', reveals: 'learning-disabilities-mean-the-child' },
                { text: 'learning disabilities mean the child is \'slow\' or has low intelligence', outcome: 'Not quite — Students believe "learning disabilities mean the child is \'slow\' or has low intelligence." This.', reveals: 'learning-disabilities-mean-the-child' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A revision group debates two claims: \'Cramming that worked on the test but was forgotten a week later wasn\'t learning — it didn\'t last.\' And \'In Pavlov\'s setup the bell basically became food for the dog.\'',
            decisions: [{ prompt: 'What do the definitions of learning and conditioning say?', options: [
                { text: 'Apply the criteria precisely: learning is a RELATIVELY permanent change from experience — cramming produced real learning (behavioural potential existed at test time); later forgetting is extinction, not absence of learning. And the bell stays a bell: conditioning gives the CS signal value — repeated pairing strengthens a neural pathway so it triggers a preparatory response anticipating food; nothing transforms into the US.', outcome: 'Both myths fall to the definitions: performance can fade after learning occurred, and the conditioned stimulus predicts rather than becomes the unconditioned one.' },
                { text: 'Agree cramming wasn\'t learning — if it\'s gone, it was never learned.', outcome: '\'Relatively permanent\' isn\'t \'permanent forever\': the change existed and decayed — confusing performance-at-a-moment with the learned change itself is the error.', reveals: 'forgotten-means-never-learned' },
                { text: 'Accept bell-becomes-food — after conditioning the CS functions as the US.', outcome: 'The CS gains predictive signal value through contiguity, eliciting an anticipatory response — it signals the US, it doesn\'t turn into it.', reveals: 'cs-becomes-us' }
            ] }] } },
        { type: 'case', nodeId: 'c11_psy_cbse_05_010', title: 'You made it',
          caseStudy: { intro: 'Learning is the underlying change; performance is just its momentary evidence — one can fade while the other looked solid.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_007', difficulty: 'standard',
          question: 'Insight learning is a form of cognitive learning where the solution to.',
          hint: 'Revisit c11_psy_cbse_05_002 (Classical Conditioning) and c11_psy_cbse_05_004 (Operant.',
          misconception: 'Students believe insight learning is simply "fast learning" or "learning without practice" — they equate the.',
          parts: [
                { id: 'a', prompt: 'Compare Kohler\'s insight learning with Bandura\'s observational learning (c11_psy_cbse_05_006) on three dimensions: (a) role of the model, (b) necessity.', answer: 'role of the model, (',
                  options: ['role of the model, (', 'no reinforcement needed', 'fast learning', 'learning without practice'],
                  hint: 'Revisit c11_psy_cbse_05_002 (Classical Conditioning) and c11_psy_cbse_05_004 (Operant Conditioning).',
                  misconception: 'Students believe insight learning is simply "fast learning" or "learning without practice" — they equate the *suddenness* of the solution.' }
          ],
            remediations: { 'insight-learning-is-simply-fast': { steps: ['If a student conflates insight with fast trial-and-error: (1) Have them re-read Kohler\'s description of Sultan\'s.', 'If by insight?" (3) Use the "two-string problem" (Maier, 1931) as a human analogue: students must tie two hanging.', 'The insight solution (use a pendulum swing) emerges only after preparatory failure and incubation — have them.', 'This concrete experience replaces the abstract misconception with procedural knowledge.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe insight learning is simply "fast learning" or "learning without practice" — they equate the.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "Insight learning proves that animals have human-like reasoning because they solve problems without trial-and-error.".', answer: 'The claim overstates the evidence',
                  options: ['The claim overstates the evidence', 'fast learning', 'learning without practice'],
                  hint: 'Revisit c11_psy_cbse_05_002 (Classical Conditioning) and c11_psy_cbse_05_004 (Operant Conditioning).',
                  misconception: 'Students believe insight learning is simply "fast learning" or "learning without practice" — they equate the *suddenness* of the solution.' },
                { id: 'b', prompt: 'Design a classroom activity for Class 9 students that would allow them to experience insight learning (not trial-and-error) in a geometry context.', answer: 'the problem, (',
                  options: ['the problem, (', 'fast learning', 'learning without practice'],
                  hint: 'Revisit c11_psy_cbse_05_002 (Classical Conditioning) and c11_psy_cbse_05_004 (Operant Conditioning).',
                  misconception: 'Students believe insight learning is simply "fast learning" or "learning without practice" — they equate the *suddenness* of the solution.' }
          ],
            remediations: { 'insight-learning-is-simply-fast': { steps: ['If a student conflates insight with fast trial-and-error: (1) Have them re-read Kohler\'s description of Sultan\'s.', 'If by insight?" (3) Use the "two-string problem" (Maier, 1931) as a human analogue: students must tie two hanging.', 'The insight solution (use a pendulum swing) emerges only after preparatory failure and incubation — have them.', 'This concrete experience replaces the abstract misconception with procedural knowledge.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_008', difficulty: 'standard',
          question: 'Latent learning is a form of cognitive learning in which an organism acquires.',
          hint: 'Revisit c11_psy_cbse_05_004 (Operant Conditioning) to recall the law of effect and.',
          misconception: 'Students often confuse *latent learning* with *insight learning*, thinking both involve "sudden understanding." They.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Latent learning proves that reinforcement is unnecessary for learning." Using Tolman\'s experimental design, evaluate this claim and correct.', answer: 'The claim is partially correct but incomplete',
                  options: ['The claim is partially correct but incomplete', 'sudden understanding', 'The rats suddenly realised the maze layout on Day 11'],
                  hint: 'Revisit c11_psy_cbse_05_004 (Operant Conditioning) to recall the law of effect and reinforcement.',
                  misconception: 'Students often confuse *latent learning* with *insight learning*, thinking both involve "sudden understanding." They write: "The rats.' },
                { id: 'b', prompt: 'Compare and contrast Kohler\'s insight learning (chimpanzees) and Tolman\'s latent learning (rats) on three dimensions: (a) the role of sudden restructuring vs.', answer: 'the role of sudden restructuring vs',
                  options: ['the role of sudden restructuring vs', 'both cognitive', 'sudden understanding', 'The rats suddenly realised the maze layout on Day 11'],
                  hint: 'Revisit c11_psy_cbse_05_004 (Operant Conditioning) to recall the law of effect and reinforcement.',
                  misconception: 'Students often confuse *latent learning* with *insight learning*, thinking both involve "sudden understanding." They write: "The rats.' }
          ],
            remediations: { 'students-often-confuse-latent-learning': { steps: ['If a student conflates latent and insight learning: (1) Draw a timeline: Days 1–10 (exploration, flat error curve) →.', 'Label the *learning* phase (Days 1–10) and *performance* phase (Day 11).', '(2) Contrast with Kohler: Sultan the chimp stares at sticks, then *suddenly* joins them — no prior exploration phase.', '(3) Ask: "If the rats had insight on Day 11, why did they need 10 days of exploration?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_009', difficulty: 'standard',
          question: 'Skill learning is the process of acquiring the ability to perform complex tasks.',
          hint: 'Revisit c11_psy_cbse_05_004 (Operant Conditioning) and c11_psy_cbse_05_005 (Schedules.',
          misconception: 'Students believe the three phases are strictly time-based (e.g., "cognitive phase lasts 2 weeks") and that.',
          parts: [
                { id: 'a', prompt: 'Define \'skill\' as per NCERT Class 11 Psychology and name the three phases of skill acquisition proposed by Fitts.', answer: 'A skill is the ability to perform a complex task smoothly and efficiently',
                  options: ['A skill is the ability to perform a complex task smoothly and efficiently', 'practice, feedback, mastery', 'cognitive phase lasts 2 weeks', 'After 20 hours of driving practice, I\'ll be in autonomous phase'],
                  hint: 'Revisit c11_psy_cbse_05_004 (Operant Conditioning) and c11_psy_cbse_05_005 (Schedules.',
                  misconception: 'Students believe the three phases are strictly time-based (e.g., "cognitive phase lasts 2 weeks") and that *automaticity means the skill.' },
                { id: 'b', prompt: 'A student says: "The associative phase is just \'more practice\' after the cognitive phase." Explain why this statement is incomplete.', answer: 'The associative phase is not merely repetition',
                  options: ['The associative phase is not merely repetition', 'cognitive phase lasts 2 weeks', 'After 20 hours of driving practice, I\'ll be in autonomous phase', 'the three phases are strictly time-based (e'],
                  hint: 'Revisit c11_psy_cbse_05_004 (Operant Conditioning) and c11_psy_cbse_05_005 (Schedules.',
                  misconception: 'Students believe the three phases are strictly time-based (e.g., "cognitive phase lasts 2 weeks") and that *automaticity means the skill.' }
          ],
            remediations: { 'the-three-phases-are-strictly': { steps: ['Ask the student to recall a skill they learned recently (cycling, typing, cooking).', 'Have them describe *what they were thinking* at three points: first attempt, after some competence, after mastery.', 'Map their descriptions to "verbal instructions in head" (cognitive), "adjusting based on feel/feedback" (associative).', 'Explicitly contrast: "Notice how your *thinking changed*, not just your speed.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_psy_cbse_05_010', difficulty: 'standard',
          question: 'Factors facilitating learning refer to the general determinants—such.',
          hint: 'Revisit c11_psy_cbse_05_005 (Schedules of Reinforcement) and practice drawing extinction.',
          misconception: 'Students believe "learning disabilities mean the child is \'slow\' or has low intelligence." This error arises because.',
          parts: [
                { id: 'a', prompt: 'State the partial reinforcement effect and name the two reinforcement schedules it compares.', answer: 'The partial reinforcement effect states that responses acquired under partial',
                  options: ['The partial reinforcement effect states that responses acquired under partial', 'continuous reinforcement is more resistant to extinction', 'learning disabilities mean the child is \'slow\' or has low intelligence', 'disability'],
                  hint: 'Revisit c11_psy_cbse_05_005 (Schedules of Reinforcement) and practice drawing extinction curves for.',
                  misconception: 'Students believe "learning disabilities mean the child is \'slow\' or has low intelligence." This error arises because the term "disability".' },
                { id: 'b', prompt: 'A teacher uses continuous reinforcement (praise after every correct answer) for a week, then stops praising.', answer: 'The continuous reinforcement class will show faster extinction',
                  options: ['The continuous reinforcement class will show faster extinction', 'learning disabilities mean the child is \'slow\' or has low intelligence', 'disability', '"learning disabilities mean the child is \'slow\' or has low intelligence'],
                  hint: 'Revisit c11_psy_cbse_05_005 (Schedules of Reinforcement) and practice drawing extinction curves for.',
                  misconception: 'Students believe "learning disabilities mean the child is \'slow\' or has low intelligence." This error arises because the term "disability".' }
          ],
            remediations: { 'learning-disabilities-mean-the-child': { steps: ['Ask the student to define "intellectual disability" and "learning disability" side-by-side using NCERT wording.', 'Present a case vignette: "Riya, IQ 115, reads \'was\' as \'saw\', reverses \'b/d\', but solves complex puzzles quickly.', 'Guide them to map each symptom to the NCERT criteria (specific deficit + average IQ = learning disability).', 'Have them write one sentence distinguishing the two using "despite adequate intelligence" as the key phrase.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
