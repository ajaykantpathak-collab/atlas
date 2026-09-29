import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch21_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch21_p3: SimDef = {
    id: 'v3_c11_eng_w_ch21_p3',
    title: 'Patterns of Creativity (Essay) · Part 3/3',
    subtitle: 'Watch an astrophysicist argue that a poet and a physicist create the same way.',
    classLevel: 11, subject: 'eng_w', topic: 'Patterns of Creativity (Essay) · Part 3/3',
    chapters: ['c11_eng_w_ch21'],
    nodeIds: ['c11_eng_w_cbse_21_013', 'c11_eng_w_cbse_21_014', 'c11_eng_w_cbse_21_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader testing one theory of creativity across two fields', intro: 'A Nobel astrophysicist places Keats next to Newton and claims the pattern is identical — interrogate the claim.', goal: 'Apply assimilation and accommodation across poetry and science and analyse the essay\'s circular structure.' },
    discovery: {
        question: 'A poet borrows wave-particle duality as imagery in a poem. Under Chandrasekhar\'s scheme, is that assimilation or accommodation?',
        options: ['Assimilation — new content fitted into poetry\'s existing patterns; the poem\'s frame never changes', 'Accommodation — borrowing science always rebuilds the form', 'Neither — science and poetry share no patterns', 'Accommodation — any new idea forces new patterns'],
        answer: 'Assimilation — new content fitted into poetry\'s existing patterns; the poem\'s frame never changes',
        hook: 'The essay\'s real claim isn\'t \'science vs. poetry\' — it\'s that Newton and Keats ran the same two moves: fit the world to patterns, then remake patterns for the world.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Patterns of Creativity\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_21_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map the essay\'s paragraphs as thesis, parallel anecdotes and synthesis, then weigh whether the returning \'child on the seashore\' closes the argument or just repeats it.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Patterns of Creativity\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the central thesis of S. Chandrasekhar\'s essay "Patterns of Creativity" regarding the relationship between scientific and poetic.', options: [
                { text: 'The central thesis is that scientific creativity and poetic creativity follow', outcome: 'The central thesis is that scientific creativity and poetic creativity follow fundamentally.' },
                { text: 'they are essentially the same', outcome: 'Not quite — Students often think "critical analysis" means criticizing or finding faults in the essay.', reveals: 'critical-analysis-means-criticizing-or' },
                { text: 'critical analysis', outcome: 'Not quite — Students often think "critical analysis" means criticizing or finding faults in the essay.', reveals: 'critical-analysis-means-criticizing-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Patterns of Creativity\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the central contrast the author draws between poetic creativity and scientific creativity in "Patterns of Creativity"?', options: [
                { text: 'The central contrast is that poetic creativity is subjective, imaginative, and concerned', outcome: 'The central contrast is that poetic creativity is subjective, imaginative, and concerned with.' },
                { text: 'poets write poems, scientists do experiments', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarising the essay\'s content.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarising the essay\'s content.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Patterns of Creativity\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the central comparative argument of the essay "Patterns of Creativity" as introduced in the textbook\'s overview?', options: [
                { text: 'The essay compares creativity in poetry and creativity in science, examining their', outcome: 'The essay compares creativity in poetry and creativity in science, examining their patterns.' },
                { text: 'It\'s about how to write poems', outcome: 'Not quite — Students treat "discussion" as sharing personal opinions about creativity ("I think science is more.', reveals: 'students-treat-discussion-as-sharing' },
                { text: 'It\'s a biography of a scientist', outcome: 'Not quite — Students treat "discussion" as sharing personal opinions about creativity ("I think science is more.', reveals: 'students-treat-discussion-as-sharing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your school runs a \'Science vs Arts\' debate and the science captain claims: \'Scientists discover by logic; poets create by imagination — completely different brains at work.\' You remember Chandrasekhar\'s \'Patterns of Creativity\' argues almost the opposite.',
            decisions: [{ prompt: 'What\'s the essay\'s actual argument you should deploy?', options: [
                { text: 'Counter with the shared pattern: Chandrasekhar — a Nobel astrophysicist who loved literature — argues Keats and Newton use the same cognitive moves: assimilation (fitting new experience into existing patterns) and accommodation (changing the pattern to fit new experience). Newton\'s \'logic\' required imaginative leaps; Keats\'s \'imagination\' required structural discipline.', outcome: 'The debate flips: the essay dissolves the science-is-rigid / poetry-is-free stereotype instead of reinforcing it.' },
                { text: 'Use the essay to support the motion — it contrasts scientists\' facts with poets\' emotions.', outcome: 'That\'s the surface misreading: the essay\'s whole point is that both domains run on identical creative patterns, not that they diverge.', reveals: 'essay-contrasts-science-poetry' },
                { text: 'Summarise it as \'first he talks about Keats, then about Newton\' and let the examples speak for themselves.', outcome: 'That confuses content with argument: the examples are ordered by rhetorical logic to build a thesis, not just listed.', reveals: 'essay-plot-is-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_21_015', title: 'You made it',
          caseStudy: { intro: 'Newton \'invented\' his framework as surely as Keats \'discovered\' truth in a myth — the essay\'s circle closes because the child on the shore now means something more.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_013', difficulty: 'standard',
          question: 'Critical thinking on \'Patterns of Creativity\' — analysing the text to reach.',
          hint: 'If stuck, review c11_eng_w_cbse_21_012 (Comprehension) and create a one-page argument map.',
          misconception: 'Students often think "critical analysis" means criticizing or finding faults in the essay.',
          parts: [
                { id: 'a', prompt: 'What is the central thesis of S. Chandrasekhar\'s essay "Patterns of Creativity" regarding the relationship between scientific and poetic creativity?', answer: 'The central thesis is that scientific creativity and poetic creativity follow',
                  options: ['The central thesis is that scientific creativity and poetic creativity follow', 'they are essentially the same', 'critical analysis', '"critical analysis" means criticizing or finding faults in the essay'],
                  hint: 'If stuck, review c11_eng_w_cbse_21_012 (Comprehension) and create a one-page argument map of the.',
                  misconception: 'Students often think "critical analysis" means criticizing or finding faults in the essay.' },
                { id: 'b', prompt: 'Explain in your own words why Chandrasekhar argues that Shakespeare\'s creativity differs from Newton\'s, using the concept of "pattern" as the author defines it.', answer: 'Chandrasekhar argues Newton\'s creativity follows a cumulative pattern where each',
                  options: ['Chandrasekhar argues Newton\'s creativity follows a cumulative pattern where each', 'discoveries', 'Newton was a scientist, Shakespeare a poet', 'critical analysis'],
                  hint: 'If stuck, review c11_eng_w_cbse_21_012 (Comprehension) and create a one-page argument map of the.',
                  misconception: 'Students often think "critical analysis" means criticizing or finding faults in the essay.' }
          ],
            remediations: { 'critical-analysis-means-criticizing-or': { steps: ['Have the student reread the essay\'s opening paragraphs where Chandrasekhar explicitly defines "pattern of creativity".', 'Ask: "What specific *mechanism* does he say drives progress in science vs.', 'poetry?" (Answer: cumulativity vs.', 'Practice the "steel-manning" technique: restate Chandrasekhar\'s argument in its strongest form *before* critiquing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_014', difficulty: 'standard',
          question: 'Writing skills from \'Patterns of Creativity\' — using the text as a model.',
          hint: 'If stuck, review c11_eng_w_cbse_21_013 (Critical Thinking) exercises on identifying.',
          misconception: 'Students believe "writing skills based on the chapter" means summarising the essay\'s content or listing points from the.',
          parts: [
                { id: 'a', prompt: 'Compare how the essay treats the role of \'vision\' in poetic creativity versus \'hypothesis\' in scientific creativity.', answer: 'The essay presents poetic vision as an end in itself',
                  options: ['The essay presents poetic vision as an end in itself', 'both are ways of knowing', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_w_cbse_21_013 (Critical Thinking) exercises on identifying author\'s claims.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the essay\'s content or listing points from the text.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a summary instead of analysis: (1) Return the answer with "WHERE IS YOUR ANALYSIS?" written beside.', '(2) Ask them to highlight every sentence that makes a claim about *how* the author argues (e.g., "The author contrasts.', '(3) Have them rewrite keeping only analytical sentences and adding evidence for each.', '(4) Provide a model PEEL paragraph on a different aspect of the essay so they see the structure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means summarising the essay\'s content or listing points from the.',
          parts: [
                { id: 'a', prompt: 'Critique this claim: "The author of \'Patterns of Creativity\' ultimately values scientific creativity more because it produces verifiable results." Defend your.', answer: 'The claim is false',
                  options: ['The claim is false', 'writing skills based on the chapter'],
                  hint: 'If stuck, review c11_eng_w_cbse_21_013 (Critical Thinking) exercises on identifying author\'s claims.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the essay\'s content or listing points from the text.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a summary instead of analysis: (1) Return the answer with "WHERE IS YOUR ANALYSIS?" written beside.', '(2) Ask them to highlight every sentence that makes a claim about *how* the author argues (e.g., "The author contrasts.', '(3) Have them rewrite keeping only analytical sentences and adding evidence for each.', '(4) Provide a model PEEL paragraph on a different aspect of the essay so they see the structure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_21_015', difficulty: 'standard',
          question: 'Discussion points on \'Patterns of Creativity\' — speaking and listening around.',
          hint: 'If stuck, re-read the "Critical Thinking: Analysis and Interpretation" node.',
          misconception: 'Students treat "discussion" as sharing personal opinions about creativity ("I think science is more creative.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'Patterns of Creativity\'',
                  options: ['Discussion points on \'Patterns of Creativity\'', '\'Patterns of Creativity\' (Woven Words, ch', 'The plot/narrative arc of \'Patterns of Creativity\'', 'The setting of \'Patterns of Creativity\''],
                  hint: 'If stuck, re-read the "Critical Thinking: Analysis and Interpretation" node (c11_eng_w_cbse_21_013).',
                  misconception: 'Students treat "discussion" as sharing personal opinions about creativity ("I think science is more creative because...") rather than.' }
          ],
            remediations: { 'students-treat-discussion-as-sharing': { steps: ['Re-read the essay\'s first and last paragraphs to extract the exact comparative thesis.', 'List 3-4 key contrasts the author draws (e.g., process, validation, language).', 'Practice converting each contrast into a discussion prompt: "How does the author support the claim that ___?" 4.', 'In next discussion, allow only contributions that begin with "The text says..." or "Building on [peer]\'s point about.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
