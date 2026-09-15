import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch05_p3: SimDef = {
    id: 'v3_c12_eng_v_ch05_p3',
    title: 'On the Face of It · Part 3/3',
    subtitle: 'A tin leg, a burned face, and a garden with no locked gate',
    classLevel: 12, subject: 'eng_v', topic: 'On the Face of It · Part 3/3',
    chapters: ['c12_eng_v_ch05'],
    nodeIds: ['c12_eng_v_cbse_05_013', 'c12_eng_v_cbse_05_014', 'c12_eng_v_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Drama reader', intro: 'Two people the world keeps misreading meet in a garden. One afternoon is enough to change what a face means.', goal: 'Read On the Face of It as a study of alienation and connection — disability as circumstance, not subject.' },
    discovery: {
        question: 'An old man with a tin leg and a boy with a burned face meet in a garden. \'It\'s a play about disability,\' says a classmate. What\'s the truer subject?',
        options: ['Alienation — not the impairments but others\' reactions to them; the play asks what bond forms between two people the world keeps staring at', 'Correct — disability is the theme', 'The garden is the theme', 'It\'s about growing apples'],
        answer: 'Alienation — not the impairments but others\' reactions to them; the play asks what bond forms between two people the world keeps staring at',
        hook: 'The \'before you read\' label calls Derry \'defiant\' — yet his first lines are pure panic. Hold context lightly: the play isn\'t about a tin leg or a scar, it\'s about the loneliness both carried into the garden and the friendship neither expected.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the advanced literary skill of moving beyond literal comprehension to examine how a text constructs meaning through character dynamics, thematic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sit in Mr Lamb\'s garden through one afternoon: track how crab-apple talk, bees and open gates dismantle a boy\'s defences — and decide what the title\'s \'face of it\' really judges.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re asked: "Why does Derry return to Mr Lamb\'s garden at the end, knowing Mr Lamb might be dead?" This question cannot be answered by recalling plot.',
            decisions: [{ prompt: 'What is the fundamental difference between a literal comprehension question and a critical analysis question for "On the Face of It"?', options: [
                { text: 'A literal comprehension question asks "what happens" (e.g., "How does Derry enter the', outcome: 'A literal comprehension question asks "what happens" (e.g., "How does Derry enter the garden?").' },
                { text: 'critical analysis', outcome: 'Not quite — Students believe "critical analysis" means finding *hidden meanings* the author deliberately.', reveals: 'critical-analysis-means-finding-hidden' },
                { text: 'the crab apples represent original sin', outcome: 'Not quite — Students believe "critical analysis" means finding *hidden meanings* the author deliberately.', reveals: 'critical-analysis-means-finding-hidden' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you open your board exam paper and see: "Write a character sketch of Derry in 100-120 words." Your heart races — you know the story, but how do you.',
            decisions: [{ prompt: 'What is the correct structure of a PEEL paragraph for a character sketch answer in the CBSE Class 12 English exam?', options: [
                { text: 'A PEEL paragraph consists of: **P**oint (topic sentence stating a trait), **E**vidence', outcome: 'A PEEL paragraph consists of: **P**oint (topic sentence stating a trait), **E**vidence (textual.' },
                { text: 'PEEL means Point, Example, Effect, Language', outcome: 'Not quite — Students believe "writing skills based on the chapter" means memorising a ready-made character.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means memorising a ready-made character.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a book club where everyone has read "On the Face of It" but interpretations differ — some think Mr Lamb is merely lonely, others see him.',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' in a speaking and listening activity based on a literary text?', options: [
                { text: 'A discussion point is an open-ended prompt derived from the text that invites multiple', outcome: 'A discussion point is an open-ended prompt derived from the text that invites multiple perspectives.' },
                { text: 'To test if students remember the plot', outcome: 'Not quite — Students often think a \'good discussion\' means everyone agrees or that the loudest voice wins.', reveals: 'a-good-discussion-means-everyone' },
                { text: 'a \'good discussion\' means everyone agrees or that the loudest voice wins', outcome: 'Not quite — Students often think a \'good discussion\' means everyone agrees or that the loudest voice wins.', reveals: 'a-good-discussion-means-everyone' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A new teammate with a facial scar always sits alone at lunch and skips group events. You\'ve had one warm conversation with her and promised \'I\'ll sit with you tomorrow\' — then your own friends pull you to their table.',
            decisions: [{ prompt: 'What does \'On the Face of It\' say about your promise?', options: [
                { text: 'Keep it — actually go back. Mr Lamb\'s bitter aside \'They never do come back\' exists because kindness without return is the pattern; Derry\'s return matters precisely because everyone else failed to, and the tragedy is arriving after the chance is gone.', outcome: 'The play\'s three-scene arc builds everything on whether Derry returns; the garden means nothing as a one-visit kindness and everything as a chosen connection — your table tomorrow is the point, not your sympathy today.' },
                { text: 'She probably prefers being left alone anyway, like Derry claims to.', outcome: 'That\'s the misreading the play dismantles — Derry\'s \'I don\'t care\' is armour built from others\' stares, not preference; Mr Lamb reads the withdrawal as a wound to be answered with welcome, not respected as a wish.', reveals: 'withdrawal-equals-preference' },
                { text: 'One kind conversation already counts — you showed her someone cares.', outcome: 'The off-stage fall makes the point brutally: single visits don\'t save anyone, and the window is short; the play measures connection by the return, not the first approach.', reveals: 'one-visit-is-enough' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a one-act play for its bond, not its plot — and spot how other people\'s staring does the actual damage.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the advanced literary skill.',
          hint: 'If stuck, return to c12_eng_v_cbse_05_009 (Irony and Symbolism) and re-practice.',
          misconception: 'Students believe "critical analysis" means finding *hidden meanings* the author deliberately buried, leading them.',
          parts: [
                { id: 'a', prompt: 'Analyze how the garden functions as a symbolic space that evolves across the three scenes. What does its transformation reveal about the play\'s central theme?', answer: 'The garden evolves from: Scene One',
                  options: ['The garden evolves from: Scene One', 'apples, bees, weeds', 'symbolism', 'critical analysis'],
                  hint: 'If stuck, return to c12_eng_v_cbse_05_009 (Irony and Symbolism) and re-practice identifying *how*.',
                  misconception: 'Students believe "critical analysis" means finding *hidden meanings* the author deliberately buried, leading them to over-interpret (e.g.' }
          ],
            remediations: { 'critical-analysis-means-finding-hidden': { steps: ['If a student produces unsupported interpretations: (1) Have them re-read Scene One\'s "weeds" dialogue.', 'It\'s all life." (2) Practice the "Evidence → Inference → Warrant" chain: For any claim, cite the exact line, state the.', 'Warrant: The repetition of \'never\' and the private context show this is genuine expectation, not philosophy).', '(3) Re-attempt Diagnostic Question 4 with this scaffold.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical analysis" means finding *hidden meanings* the author deliberately buried, leading them.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Mr Lamb is merely a plot device to catalyze Derry\'s transformation; his own loneliness is performative, not genuine." Defend or refute.', answer: 'Refute',
                  options: ['Refute', 'Mr Lamb seems wise/happy', 'character analysis', 'critical analysis'],
                  hint: 'If stuck, return to c12_eng_v_cbse_05_009 (Irony and Symbolism) and re-practice identifying *how*.',
                  misconception: 'Students believe "critical analysis" means finding *hidden meanings* the author deliberately buried, leading them to over-interpret (e.g.' },
                { id: 'b', prompt: 'Create an alternative ending for Scene Three where Derry arrives *before* the ladder falls.', answer: 'Strong answer example: Derry: (breathless) I\'m here',
                  options: ['Strong answer example: Derry: (breathless) I\'m here', 'critical analysis', 'the crab apples represent original sin'],
                  hint: 'If stuck, return to c12_eng_v_cbse_05_009 (Irony and Symbolism) and re-practice identifying *how*.',
                  misconception: 'Students believe "critical analysis" means finding *hidden meanings* the author deliberately buried, leading them to over-interpret (e.g.' }
          ],
            remediations: { 'critical-analysis-means-finding-hidden': { steps: ['If a student produces unsupported interpretations: (1) Have them re-read Scene One\'s "weeds" dialogue.', 'It\'s all life." (2) Practice the "Evidence → Inference → Warrant" chain: For any claim, cite the exact line, state the.', 'Warrant: The repetition of \'never\' and the private context show this is genuine expectation, not philosophy).', '(3) Re-attempt Diagnostic Question 4 with this scaffold.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter "On the Face of It" refers to the ability.',
          hint: 'If stuck on evidence selection, review c12_eng_v_cbse_05_004 and c12_eng_v_cbse_05_006.',
          misconception: 'Students believe "writing skills based on the chapter" means memorising a ready-made character sketch or diary entry.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Derry is a sad boy because his face got burned by acid. He meets Mr Lamb in a garden. Mr Lamb has a tin leg.', answer: '**Error 1:** Narrative summary instead of analytical character sketch',
                  options: ['**Error 1:** Narrative summary instead of analytical character sketch', 'missing quotes', 'writing skills based on the chapter'],
                  hint: 'If stuck on evidence selection, review c12_eng_v_cbse_05_004 and c12_eng_v_cbse_05_006 to map.',
                  misconception: 'Students believe "writing skills based on the chapter" means memorising a ready-made character sketch or diary entry to reproduce verbatim.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student cannot move beyond plot summary: 1.', '**Diagnose:** Ask them to write one PEEL paragraph on *any* trait (e.g., "Derry is observant") using only **one** quote.', 'If they narrate ("Derry sees the garden..."), stop them.', '**Remediate:** Revisit **c12_eng_v_cbse_05_004** (Character Analysis: Protagonist) and **c12_eng_v_cbse_05_006**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_05_015', difficulty: 'standard',
          question: 'Speaking and Listening Discussion Points for "On the Face of It" are structured.',
          hint: 'If stuck, revisit c12_eng_v_cbse_05_013 (Critical Thinking) to practice forming.',
          misconception: 'Students often think a \'good discussion\' means everyone agrees or that the loudest voice wins.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening Discussion Points for "On the Face of It" are structured prompts',
                  options: ['Speaking and Listening Discussion Points for "On the Face of It" are structured prompts', '"Before You Read: Context and Background" is a pre-reading strategy that provides', 'Plot and narrative structure refers to the organization of events in a literary work,', 'Setting in drama refers to the time, place, and physical environment where the action'],
                  hint: 'If stuck, revisit c12_eng_v_cbse_05_013 (Critical Thinking) to practice forming interpretive claims.',
                  misconception: 'Students often think a \'good discussion\' means everyone agrees or that the loudest voice wins.' }
          ],
            remediations: { 'a-good-discussion-means-everyone': { steps: ['If a student dominates or gives only factual answers: (1) Pause the group and model a \'paraphrase-then-add\' turn using.', 'That connects to Y in Scene 2 where..." (2) Assign roles: \'Evidence Finder\', \'Devil\'s Advocate\', \'Summarizer\'.', '(3) Re-run the same discussion point with a 2-minute silent thinking time before speaking.', '(4) Debrief: "What changed when you listened first?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
