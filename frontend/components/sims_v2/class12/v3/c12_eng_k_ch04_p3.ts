import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch04_p3: SimDef = {
    id: 'v3_c12_eng_k_ch04_p3',
    title: 'Tomorrow (Short Story) · Part 3/3',
    subtitle: 'He digs every day and plants nothing — hope as a life sentence',
    classLevel: 12, subject: 'eng_k', topic: 'Tomorrow (Short Story) · Part 3/3',
    chapters: ['c12_eng_k_ch04'],
    nodeIds: ['c12_eng_k_cbse_04_013', 'c12_eng_k_cbse_04_014', 'c12_eng_k_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Conrad scholar', intro: 'A retired captain waits for tomorrow — the day his boy comes home. The boy is home. Tomorrow never arrives.', goal: 'Read Tomorrow through Conrad\'s maritime realism, layered narration and the psychology of self-protective delusion.' },
    discovery: {
        question: 'Captain Hagberd digs his garden daily, plants nothing, sews a sailcloth suit on land and advertises for a son who\'s already back — spending the cash and leaving. Why can\'t the barber\'s teasing \'cure\' him?',
        options: ['The delusion is functional — his madness is \'equilibrium based upon self-esteem,\' the very structure that keeps him capable; teasing threatens the architecture, not the symptom', 'The barber isn\'t funny enough', 'Madness can\'t be cured at all', 'Hagberd doesn\'t hear him'],
        answer: 'The delusion is functional — his madness is \'equilibrium based upon self-esteem,\' the very structure that keeps him capable; teasing threatens the architecture, not the symptom',
        hook: 'Conrad the master mariner builds the story in layers — tap-room gossip, Hagberd\'s own voice, the son\'s mercenary return — each stripping his self-mythology. The sailcloth suit and the unplanted spade aren\'t props; they\'re a man suspended between the sea he fled and the tomorrow he invented.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text beyond its literal meaning to interpret themes, evaluate character motivations, analyze narrative techniques, and synthesize evidence.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk Colebrook\'s coast like a psychologist: peel the story-within-a-story layers, weigh Bessie\'s complicity against Harry\'s brutal clarity, and answer the question — when does hope become a prison?',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a detective asked to solve a mystery: Why does Captain Hagberd insist his son will return "tomorrow" for seven years, and what does that.',
            decisions: [{ prompt: 'What is the primary literary device Conrad uses when Captain Hagberd repeatedly says "tomorrow" to mean both a literal day and.', options: [
                { text: 'The primary device is **symbolism**', outcome: 'The primary device is **symbolism** — "tomorrow" functions as a symbol of Hagberd\'s delusional.' },
                { text: 'repetition', outcome: 'Not quite — Students often believe "critical analysis" means listing literary devices (metaphor, irony.', reveals: 'critical-analysis-means-listing-literary' },
                { text: 'foreshadowing', outcome: 'Not quite — Students often believe "critical analysis" means listing literary devices (metaphor, irony.', reveals: 'critical-analysis-means-listing-literary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing a 6-mark question: "How does Conrad use the \'tomorrow\' motif to reveal Captain Hagberd\'s madness?" You freeze because.',
            decisions: [{ prompt: 'Define the PEEL structure for literature answers and state what each letter stands for.', options: [
                { text: 'PEEL = Point (topic sentence stating your argument), Evidence (brief textual quote or', outcome: 'PEEL = Point (topic sentence stating your argument), Evidence (brief textual quote or reference).' },
                { text: 'Point, Example, Explain, Conclusion', outcome: 'Not quite — Students believe "writing skills" means memorizing model answers for predicted questions.', reveals: 'writing-skills-means-memorizing-model' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" means memorizing model answers for predicted questions.', reveals: 'writing-skills-means-memorizing-model' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a literature circle where someone claims "Captain Hagberd isn\'t really mad — he\'s just stubborn." How do you respond without just saying "I.',
            decisions: [{ prompt: 'What are the two discussion prompts given in the "Talking about the Text" section of the NCERT textbook for "Tomorrow"?', options: [
                { text: 'The two prompts are: (1) \'Every mental state, even madness, has its equilibrium based', outcome: 'The two prompts are: (1) \'Every mental state, even madness, has its equilibrium based upon.' },
                { text: 'comprehension questions or appreciation questions', outcome: 'Not quite — Students treat "discussion" as "sharing opinions" rather than "building arguments with evidence.".', reveals: 'students-treat-discussion-as-sharing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A founder has rehearsed her \'big launch tomorrow\' for two years. When a real customer finally shows up today, she turns them away — \'the real launch is coming.\'',
            decisions: [{ prompt: 'What\'s Conrad\'s \'Tomorrow\' diagnosis?', options: [
                { text: 'The fantasy of tomorrow has eaten the present — Hagberd rejects his actual returned son because the real thing can\'t compete with the rehearsed dream; take the imperfect today or lose it.', outcome: 'Living for an imagined tomorrow makes real arrivals look like impostors — the story\'s warning is to test hope against what\'s actually here.' },
                { text: 'Keep waiting — hope is always worth protecting from premature reality.', outcome: 'Hope without an expiry date curdles into self-deception; Hagberd\'s \'tomorrow\' is a prison, not a promise.', reveals: 'hope-without-evidence' },
                { text: 'Kill all hope — expectation is delusion by definition.', outcome: 'The story condemns fantasy substituted for life, not hope itself; acting on the real chance is hope working properly.', reveals: 'hope-is-delusion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'You can now read madness as structure, not chaos — and see how Conrad layers narrators so the truth arrives sideways.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text beyond its.',
          hint: 'If stuck, review the "Understanding the Text" questions on NCERT page 68 — they are.',
          misconception: 'Students often believe "critical analysis" means listing literary devices (metaphor, irony, symbolism) without.',
          parts: [
                { id: 'a', prompt: 'What is the primary literary device Conrad uses when Captain Hagberd repeatedly says "tomorrow" to mean both a literal day and an indefinite future?', answer: 'The primary device is **symbolism**',
                  options: ['The primary device is **symbolism**', 'repetition', 'foreshadowing', 'critical analysis'],
                  hint: 'If stuck, review the "Understanding the Text" questions on NCERT page 68 — they are ready-made.',
                  misconception: 'Students often believe "critical analysis" means listing literary devices (metaphor, irony, symbolism) without explaining *how* each device.' },
                { id: 'b', prompt: 'Explain in your own words why Bessie Carvil never directly contradicts Hagberd\'s belief that Harry will return "tomorrow", even though she privately doubts it.', answer: 'Bessie humours Hagberd',
                  options: ['Bessie humours Hagberd', 'she is kind', 'she believes him', 'critical analysis'],
                  hint: 'If stuck, review the "Understanding the Text" questions on NCERT page 68 — they are ready-made.',
                  misconception: 'Students often believe "critical analysis" means listing literary devices (metaphor, irony, symbolism) without explaining *how* each device.' },
                { id: 'c', prompt: 'Analyze the significance of the sailcloth suit and the spade as paired symbols in Captain Hagberd\'s characterisation.', answer: 'The **sailcloth suit** (No',
                  options: ['The **sailcloth suit** (No', 'he is a miser', 'he likes gardening', 'critical analysis'],
                  hint: 'If stuck, review the "Understanding the Text" questions on NCERT page 68 — they are ready-made.',
                  misconception: 'Students often believe "critical analysis" means listing literary devices (metaphor, irony, symbolism) without explaining *how* each device.' }
          ],
            remediations: { 'critical-analysis-means-listing-literary': { steps: ['Re-read the "Stop and Think" questions in the NCERT text (pages 39–68) — they model the analytical moves this node.', 'Revisit node **c12_eng_k_cbse_04_009** (Irony and Symbolism) and **c12_eng_k_cbse_04_006** (Primary Theme) to refresh.', 'Practice the PEEL structure on a single paragraph: e.g., "How does the fence/railing function as a symbol?" Write one.', 'If still stuck, return to Class 11 critical thinking nodes **c11_eng_h_cbse_01_013** and **c11_eng_h_cbse_04_013** for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "critical analysis" means listing literary devices (metaphor, irony, symbolism) without.',
          parts: [
                { id: 'a', prompt: 'Evaluate the story\'s ending: Does Harry\'s departure constitute a tragedy for Bessie, or a liberation? Defend your interpretation with textual evidence.', answer: 'It is a **tragedy of missed connection, not liberation**',
                  options: ['It is a **tragedy of missed connection, not liberation**', 'she is free of a bad man', 'critical analysis'],
                  hint: 'If stuck, review the "Understanding the Text" questions on NCERT page 68 — they are ready-made.',
                  misconception: 'Students often believe "critical analysis" means listing literary devices (metaphor, irony, symbolism) without explaining *how* each device.' }
          ],
            remediations: { 'critical-analysis-means-listing-literary': { steps: ['Re-read the "Stop and Think" questions in the NCERT text (pages 39–68) — they model the analytical moves this node.', 'Revisit node **c12_eng_k_cbse_04_009** (Irony and Symbolism) and **c12_eng_k_cbse_04_006** (Primary Theme) to refresh.', 'Practice the PEEL structure on a single paragraph: e.g., "How does the fence/railing function as a symbol?" Write one.', 'If still stuck, return to Class 11 critical thinking nodes **c11_eng_h_cbse_01_013** and **c11_eng_h_cbse_04_013** for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter "Tomorrow" involve the ability to compose.',
          hint: 'Review c12_eng_k_cbse_04_008 (Imagery/Metaphor) and c12_eng_k_cbse_04_009.',
          misconception: 'Students believe "writing skills" means memorizing model answers for predicted questions.',
          parts: [
                { id: 'a', prompt: 'Analyze how Conrad uses the character of Bessie Carvil as a foil to Captain Hagberd. Identify two contrasting traits with evidence.', answer: '**Trait 1 — Agency vs',
                  options: ['**Trait 1 — Agency vs', 'writing skills', '"writing skills" means memorizing model answers for predicted questions'],
                  hint: 'Review c12_eng_k_cbse_04_008 (Imagery/Metaphor) and c12_eng_k_cbse_04_009 (Irony/Symbolism).',
                  misconception: 'Students believe "writing skills" means memorizing model answers for predicted questions.' }
          ],
            remediations: { 'writing-skills-means-memorizing-model': { steps: ['If a student cannot adapt content to question demands: 1) Have them deconstruct 3 past board questions on "Tomorrow".', '2) Practice rewriting one PEEL paragraph for each question type using the *same* evidence but different Points/Links.', '3) Use node c12_eng_k_cbse_04_013 (Critical Thinking) to rehearse question variation.', '4) Re-attempt Diagnostic Question 3 with a new prompt: "Analyze the fence as a narrative device."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_04_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If unable to cite evidence fluently, return to c12_eng_k_cbse_04_013 and complete the.',
          misconception: 'Students treat "discussion" as "sharing opinions" rather than "building arguments with evidence." They say "I think.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to the structured oral communication',
                  options: ['Speaking and Listening: Discussion Points refers to the structured oral communication', '"Before You Read: Context and Background" provides the historical, biographical, and', 'Plot and narrative structure refers to the organization of events in a story, including', 'Setting in literature refers to the time, place, and social environment in'],
                  hint: 'If unable to cite evidence fluently, return to c12_eng_k_cbse_04_013 and complete the "Evidence.',
                  misconception: 'Students treat "discussion" as "sharing opinions" rather than "building arguments with evidence." They say "I think Harry is selfish".' }
          ],
            remediations: { 'students-treat-discussion-as-sharing': { steps: ['If a student cannot move beyond opinion-sharing: (1) Assign them the "Evidence Detective" role in the next discussion.', '(2) Use the "Two-Minute Rule": each speaker must quote or paraphrase a specific textual moment within their first two.', '(3) Practice with a low-stakes text (e.g., a newspaper editorial) to drill the "Claim → Evidence → Reasoning" loop.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
