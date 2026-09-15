import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch03_p3: SimDef = {
    id: 'v3_c12_eng_f_ch03_p3',
    title: 'Deep Water · Part 3/3',
    subtitle: 'A Supreme Court Justice\'s oldest opponent was nine feet of water',
    classLevel: 12, subject: 'eng_f', topic: 'Deep Water · Part 3/3',
    chapters: ['c12_eng_f_ch03'],
    nodeIds: ['c12_eng_f_cbse_03_013', 'c12_eng_f_cbse_03_014', 'c12_eng_f_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Narrative analyst', intro: 'Before he defended liberties on the Supreme Court, William Douglas had to win his freedom from a swimming pool.', goal: 'Read Deep Water as an autobiographical study of fear\'s origin, grip and methodical conquest.' },
    discovery: {
        question: 'The \'safe\' YMCA pool — shallow end, lifeguards nearby — is where Douglas nearly drowned, while the \'treacherous\' Yakima river never touched him. Why does that irony power the whole story?',
        options: ['Perceived safety dropped his guard — the controlled space becoming the trauma site makes the violation, and the fear it seeded, far sharper', 'Pools are more dangerous than rivers', 'He couldn\'t swim at all', 'The river was actually safe'],
        answer: 'Perceived safety dropped his guard — the controlled space becoming the trauma site makes the violation, and the fear it seeded, far sharper',
        hook: 'This isn\'t a swimming story — it\'s an autopsy of fear by a man who later sat 36 years on the US Supreme Court. Two events matter separately: the beach planted the aversion, the pool crystallised it. And the fear wasn\'t irrational — it was proportionate to nearly dying twice.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining an author\'s narrative choices — perspective, structure, language, and symbolism — to interpret deeper meanings, evaluate the text\'s.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace fear\'s full anatomy: separate the beach origin from the pool trauma, watch terror \'hold him firmly in its grip\', then follow the belt-and-pulley drills that dismantled it piece by piece.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_03_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re writing a literary review of "Deep Water" for a school magazine. You need to explain *why* this essay moves readers — not just *what* happens.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension response and a critical analysis response when discussing Douglas\'s.', options: [
                { text: 'A literal comprehension response recounts *what happened* (e.g., "Douglas was thrown in,', outcome: 'A literal comprehension response recounts *what happened* (e.g., "Douglas was thrown in, sank.' },
                { text: 'giving your opinion', outcome: 'Not quite — Students believe critical analysis means "giving your opinion" or "finding hidden meanings." They.', reveals: 'critical-analysis-means-giving-your' },
                { text: 'finding hidden meanings', outcome: 'Not quite — Students believe critical analysis means "giving your opinion" or "finding hidden meanings." They.', reveals: 'critical-analysis-means-giving-your' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_03_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re sitting in the exam hall and the question asks: "Write an essay about a time you overcame fear, beginning with \'At last I felt released...\'".',
            decisions: [{ prompt: 'What are the three specific writing tasks prescribed in the NCERT "Writing" section for the chapter "Deep Water"?', options: [
                { text: 'The three tasks are: (1) A five-paragraph essay recounting an experience of overcoming', outcome: 'The three tasks are: (1) A five-paragraph essay recounting an experience of overcoming fear in any.' },
                { text: 'write a story about swimming', outcome: 'Not quite — Students believe "Writing Skills based on the chapter" means summarizing the story or copying.', reveals: 'writing-skills-based-on-the' },
                { text: 'write a diary entry', outcome: 'Not quite — Students believe "Writing Skills based on the chapter" means summarizing the story or copying.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_03_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a CBSE ASL exam room: the examiner gives you a prompt — "Fear is a prison; courage is the key" — and asks you to discuss it with a partner.',
            decisions: [{ prompt: 'What is the primary purpose of a "text-based discussion" in Class 12 English, as distinct from a casual conversation about the story?', options: [
                { text: 'A text-based discussion requires every claim to be supported by specific textual evidence', outcome: 'A text-based discussion requires every claim to be supported by specific textual evidence (quotes.' },
                { text: 'sharing what you liked', outcome: 'Not quite — Students believe "good discussion" means speaking fluently, using advanced vocabulary, or covering.', reveals: 'good-discussion-means-speaking-fluently' },
                { text: 'evidence-based reasoning', outcome: 'Not quite — Students believe "good discussion" means speaking fluently, using advanced vocabulary, or covering.', reveals: 'good-discussion-means-speaking-fluently' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A college trek includes river wading, and a student who nearly drowned as a child wants to quit the whole trip rather than face the water.',
            decisions: [{ prompt: 'Following \'Deep Water\', what actually works?', options: [
                { text: 'Douglas\'s route — shrink the fear systematically: a trained instructor, shallow starts, staged practice, and honest testing until terror gives way to mastery.', outcome: 'Fear of fear itself is the real enemy; patient, deliberate exposure beat it for Douglas and generalises to any paralysing dread.' },
                { text: 'Throw him in the deep end — one plunge and the fear is gone.', outcome: 'A forced plunge is what created Douglas\'s phobia in the first place; trauma doesn\'t cure trauma.', reveals: 'brute-force-exposure' },
                { text: 'Avoidance is fine — simply never go near water again.', outcome: 'Douglas shows avoidance rules your life from the shadows; the fear wins every decision you don\'t make.', reveals: 'avoidance-cures-fear' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You now read a near-drowning as a case study in will — where the victory isn\'t courage but systematic practice. That reframe is what elevates a board answer.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_03_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining an author\'s narrative.',
          hint: 'If stuck, review c12_eng_f_cbse_03_008 and c12_eng_f_cbse_03_009 device lists, then.',
          misconception: 'Students believe critical analysis means "giving your opinion" or "finding hidden meanings." They write: "I think the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis involves examining an author\'s narrative choices',
                  options: ['Critical thinking in literary analysis involves examining an author\'s narrative choices', 'The "Before You Read: Context and Background" section provides essential preliminary', 'Plot and narrative structure in "Deep Water" refers to the organization of events in', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck, review c12_eng_f_cbse_03_008 and c12_eng_f_cbse_03_009 device lists, then practice: "In.',
                  misconception: 'Students believe critical analysis means "giving your opinion" or "finding hidden meanings." They write: "I think the water represents.' }
          ],
            remediations: { 'critical-analysis-means-giving-your': { steps: ['Revisit c12_eng_f_cbse_03_008 (Imagery/Metaphor) and c12_eng_f_cbse_03_009 (Irony/Symbolism) to relearn how to identify.', 'Practice the PEEL structure on a single paragraph: Pick the "yellow water" passage, write one analytical paragraph.', 'Re-attempt Diagnostic Questions 3 and 4.', 'If still unable to separate device from effect, review c11_eng_h_cbse_01_013 (Class 11 Critical Thinking) for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe critical analysis means "giving your opinion" or "finding hidden meanings." They write: "I think the.',
          parts: [
                { id: 'a', prompt: 'Create a 4-sentence third-person observational paragraph describing the YMCA pool incident from the perspective of the "big bruiser" boy, using only external.', answer: 'Sample paragraph: "The skinny kid sat shivering on the pool edge',
                  options: ['Sample paragraph: "The skinny kid sat shivering on the pool edge', 'giving your opinion', 'finding hidden meanings', 'I think the water represents life\'s struggles'],
                  hint: 'If stuck, review c12_eng_f_cbse_03_008 and c12_eng_f_cbse_03_009 device lists, then practice: "In.',
                  misconception: 'Students believe critical analysis means "giving your opinion" or "finding hidden meanings." They write: "I think the water represents.' }
          ],
            remediations: { 'critical-analysis-means-giving-your': { steps: ['Revisit c12_eng_f_cbse_03_008 (Imagery/Metaphor) and c12_eng_f_cbse_03_009 (Irony/Symbolism) to relearn how to identify.', 'Practice the PEEL structure on a single paragraph: Pick the "yellow water" passage, write one analytical paragraph.', 'Re-attempt Diagnostic Questions 3 and 4.', 'If still unable to separate device from effect, review c11_eng_h_cbse_01_013 (Class 11 Critical Thinking) for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_03_014', difficulty: 'standard',
          question: 'Writing Skills based on "Deep Water" involves crafting structured, first-person.',
          hint: 'If stuck, re-read the "Writing" prompt in NCERT and the chapter\'s last three paragraphs.',
          misconception: 'Students believe "Writing Skills based on the chapter" means summarizing the story or copying Douglas\'s experience.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the NCERT instructs you to begin the essay with the sentence: "At last I felt released — free to walk the trails and climb the.', answer: 'This sentence is the thematic climax of the chapter',
                  options: ['This sentence is the thematic climax of the chapter', 'it\'s a good hook', 'to make it interesting', 'Writing Skills based on the chapter'],
                  hint: 'If stuck, re-read the "Writing" prompt in NCERT and the chapter\'s last three paragraphs — they.',
                  misconception: 'Students believe "Writing Skills based on the chapter" means summarizing the story or copying Douglas\'s experience.' },
                { id: 'b', prompt: 'A student writes this opening for the essay: "I was scared of riding a bicycle. My father bought me one. I fell many times. But I kept trying.', answer: 'Weakness 1: It lacks sensory/emotional granularity',
                  options: ['Weakness 1: It lacks sensory/emotional granularity', 'grammar', 'vocabulary', 'Writing Skills based on the chapter'],
                  hint: 'If stuck, re-read the "Writing" prompt in NCERT and the chapter\'s last three paragraphs — they.',
                  misconception: 'Students believe "Writing Skills based on the chapter" means summarizing the story or copying Douglas\'s experience.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student produces a summary instead of a personal narrative: Step 1 — Have them re-read the "Writing" prompt.', 'Step 2 — Use the "Fear-Arc Template" from the chapter: Paragraph 1 = Origin of YOUR fear (Douglas: California beach.', 'Step 3 — Student fills template with THEIR memory (e.g., learning to drive, stage performance, cycling).', 'Step 4 — Re-diagnostic: Ask them to highlight sensory details in each paragraph — if fewer than 2 per paragraph, repeat.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_03_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, return to c12_eng_f_cbse_03_013 (Critical Thinking) and re-do the "Analysis and.',
          misconception: 'Students believe "good discussion" means speaking fluently, using advanced vocabulary, or covering many points.',
          parts: [
                { id: 'a', prompt: 'Compare these two discussion openings for the prompt "All we have to fear is fear itself": Opening X: "I agree with Roosevelt. Fear stops us.', answer: 'Opening Y is superior',
                  options: ['Opening Y is superior', 'good discussion'],
                  hint: 'If stuck, return to c12_eng_f_cbse_03_013 (Critical Thinking) and re-do the "Analysis and.',
                  misconception: 'Students believe "good discussion" means speaking fluently, using advanced vocabulary, or covering many points.' }
          ],
            remediations: { 'good-discussion-means-speaking-fluently': { steps: ['If a student cannot generate a text-anchored discussion point: (1) Have them re-read the "Understanding the text" Q1.', '(2) Ask them to convert each detail into a "claim + evidence" sentence: "Douglas conveys panic through the visual.', '(4) Re-diagnose using DIAGNOSTIC_QUESTION_3 — if they can now ask a probing follow-up, the gap is closed.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
