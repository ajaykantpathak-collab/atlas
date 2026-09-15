import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch12_p3: SimDef = {
    id: 'v3_c11_eng_h_ch12_p3',
    title: 'Father to Father (Poem) · Part 3/3',
    subtitle: 'Read a generational silence as structure, not as a missing scene.',
    classLevel: 11, subject: 'eng_h', topic: 'Father to Father (Poem) · Part 3/3',
    chapters: ['c11_eng_h_ch12'],
    nodeIds: ['c11_eng_h_cbse_12_013', 'c11_eng_h_cbse_12_014', 'c11_eng_h_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a critic weighing a poem that ends without a handshake', intro: 'Same house, same blood, no words — a father watches his son become someone he can\'t reach.', goal: 'Analyse narrative structure in lyric poetry and defend the open denouement.' },
    discovery: {
        question: 'A classmate calls the ending \'weak\' — father and son never speak or reconcile on the page. Is a silent ending a failed one?',
        options: ['No — the open denouement resolves tension without plot closure, mirroring how generational distance often stays unspoken', 'Yes — a story owes its readers explicit reconciliation', 'Yes — silence means nothing happened', 'No — but only because a sequel was planned'],
        answer: 'No — the open denouement resolves tension without plot closure, mirroring how generational distance often stays unspoken',
        hook: 'Resolution of plot and resolution of tension aren\'t the same — a shared silence can close a poem better than dialogue.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the disciplined process of examining a literary text (here, the poem "Father to Father") by breaking it into constituent elements—structure.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_12_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Treat each stanza as a film scene, find where enjambment rushes the climax, and test whether biography explains the tight quatrains holding emotional chaos.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re sitting in the exam hall, the question reads: "Analyze how the poet portrays the emotional distance between father and son." Your mind goes.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Point, Example, Explain.' },
                { text: 'Point, Example, Explain, Conclusion', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarising the poem in their own.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarising the poem in their own.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re at a family gathering and your cousin reads a poem about fathers that perfectly captures the awkward silence between your own father and.',
            decisions: [{ prompt: 'What is the primary purpose of using textual evidence during a literary discussion of a poem like "Father to Father"?', options: [
                { text: 'The primary purpose is to ground interpretations in the poem\'s actual language so that', outcome: 'The primary purpose is to ground interpretations in the poem\'s actual language so that claims about.' },
                { text: 'to impress the teacher', outcome: 'Not quite — Students believe a "good discussion" means everyone agrees on a single theme (e.g., "The poem.', reveals: 'a-good-discussion-means-everyone' },
                { text: 'to show you memorized lines', outcome: 'Not quite — Students believe a "good discussion" means everyone agrees on a single theme (e.g., "The poem.', reveals: 'a-good-discussion-means-everyone' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a poetry-recitation contest you must defend your choice of Elizabeth Jennings\'s \'Father to Son\' against a judge who asks: \'Why did you pick something so plain and restrained? Great emotion deserves dramatic, free-flowing verse.\'',
            decisions: [{ prompt: 'What\'s the strongest defence of the poem\'s plainness?', options: [
                { text: 'The restraint IS the meaning: Jennings was a Movement poet — clarity, formal control, everyday subjects — and the regular quatrains mirror the father\'s emotional lockdown; a man who cannot reach his son speaks in controlled, measured lines. The gap between tidy form and aching content is the poem\'s engine, and context (Movement aesthetics) is what lets you see it.', outcome: 'Form mirrors feeling here: tight stanzas enact the very inarticulateness the poem grieves — dramatic free verse would contradict the subject.' },
                { text: 'Concede — plain form means plain feeling; pick a more passionate poem.', outcome: 'That misreads the aesthetic: the controlled surface contains more grief because it visibly cannot overflow — restraint is the signature, not the defect.', reveals: 'plain-form-plain-feeling' },
                { text: 'Recite it dramatically anyway — performance can add the emotion the text lacks.', outcome: 'Overplaying breaks the poem\'s logic: the father-and-son distance is felt through what\'s withheld; declaiming it erases the silence between them.', reveals: 'perform-the-missing-emotion' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_12_015', title: 'You made it',
          caseStudy: { intro: 'Movement poets put chaos in controlled stanzas — the form is the father trying to hold himself together.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the disciplined process.',
          hint: 'Review c8_engl_ch1_17 (PEEL method) and c7_engl_ch01_015 (embedding quotes) before.',
          misconception: 'Students equate "critical analysis" with "listing poetic devices." They write: "The poet uses metaphor, enjambment, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical Thinking: Analysis and Interpretation is the disciplined process of examining a',
                  options: ['Critical Thinking: Analysis and Interpretation is the disciplined process of examining a', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and narrative structure in poetry refers to the organized sequence of events,', 'Setting in poetry refers to the time, place, and social environment where the poem\'s'],
                  hint: 'Review c8_engl_ch1_17 (PEEL method) and c7_engl_ch01_015 (embedding quotes) before attempting.',
                  misconception: 'Students equate "critical analysis" with "listing poetic devices." They write: "The poet uses metaphor, enjambment, and alliteration" and.' }
          ],
            remediations: { 'students-equate-critical-analysis-with': { steps: ['Hand the student a single stanza stripped of line breaks (prose version).', 'Ask: "Where would *you* break the lines?', 'Why?" Compare their breaks to the poet’s.', 'Give them a two-column table: Column A = Device (e.g., "enjambment after \'understand\'"), Column B = *So what?* (e.g.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_014', difficulty: 'standard',
          question: 'Writing skills based on a literary chapter involve the ability to produce.',
          hint: 'If stuck, return to c11_eng_h_cbse_12_008 (Imagery and Metaphor) and.',
          misconception: 'Students believe "writing skills based on the chapter" means summarising the poem in their own words or writing.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Point, Example, Explain, Conclusion', 'writing skills based on the chapter', 'generation gap'],
                  hint: 'If stuck, return to c11_eng_h_cbse_12_008 (Imagery and Metaphor) and c11_eng_h_cbse_12_012.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the poem in their own words or writing a generic essay.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['Have the student highlight 5 key phrases from the poem that carry emotional weight.', 'Practice turning each phrase into a PEEL paragraph: write the Point *using words from the phrase*, then Explain the.', 'For creative tasks, give a "voice checklist": Does this sound like the father/son?', 'Does it use the poem\'s imagery?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means summarising the poem in their own words or writing.',
          parts: [
                { id: 'a', prompt: 'A student\'s creative response (diary entry as the son) uses modern slang ("bruh, my dad is so cringe") and mentions smartphones.', answer: 'Inappropriate',
                  options: ['Inappropriate', 'writing skills based on the chapter', 'generation gap'],
                  hint: 'If stuck, return to c11_eng_h_cbse_12_008 (Imagery and Metaphor) and c11_eng_h_cbse_12_012.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the poem in their own words or writing a generic essay.' },
                { id: 'b', prompt: 'Write a 4-line poetic response from the father\'s perspective, using ONE central image from the poem (e.g., the seed, the silence, the house) to express his.', answer: 'Example: I planted a seed in foreign soil, watched it grow away from my shadow',
                  options: ['Example: I planted a seed in foreign soil, watched it grow away from my shadow', 'writing skills based on the chapter', 'generation gap'],
                  hint: 'If stuck, return to c11_eng_h_cbse_12_008 (Imagery and Metaphor) and c11_eng_h_cbse_12_012.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarising the poem in their own words or writing a generic essay.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['Have the student highlight 5 key phrases from the poem that carry emotional weight.', 'Practice turning each phrase into a PEEL paragraph: write the Point *using words from the phrase*, then Explain the.', 'For creative tasks, give a "voice checklist": Does this sound like the father/son?', 'Does it use the poem\'s imagery?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_12_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured framework.',
          hint: 'If stuck, return to c11_eng_h_cbse_12_008 (Imagery and Metaphor) and.',
          misconception: 'Students believe a "good discussion" means everyone agrees on a single theme (e.g., "The poem is about the generation.',
          parts: [
                { id: 'a', prompt: 'During discussion, a peer argues the "hands" imagery in the poem represents only manual labor.', answer: 'Step 1: Acknowledge the labor reading ("The calloused hands do show work")',
                  options: ['Step 1: Acknowledge the labor reading ("The calloused hands do show work")', 'good discussion', 'The poem is about the generation gap', 'a "good discussion" means everyone agrees on a single theme (e'],
                  hint: 'If stuck, return to c11_eng_h_cbse_12_008 (Imagery and Metaphor) and c11_eng_h_cbse_12_012.',
                  misconception: 'Students believe a "good discussion" means everyone agrees on a single theme (e.g., "The poem is about the generation gap") and that the.' },
                { id: 'b', prompt: 'Compare two discussion approaches: (A) Each member shares a personal story about their father.', answer: 'Approach B better serves literary analysis',
                  options: ['Approach B better serves literary analysis', 'good discussion', 'The poem is about the generation gap', 'a "good discussion" means everyone agrees on a single theme (e'],
                  hint: 'If stuck, return to c11_eng_h_cbse_12_008 (Imagery and Metaphor) and c11_eng_h_cbse_12_012.',
                  misconception: 'Students believe a "good discussion" means everyone agrees on a single theme (e.g., "The poem is about the generation gap") and that the.' }
          ],
            remediations: { 'a-good-discussion-means-everyone': { steps: ['Assign a "textual evidence only" round: each speaker must quote a line before commenting.', 'Use the "Two-Minute Write" before discussion: students write one observation + one question + one line that.', 'Model a think-aloud: "I used to think this poem was just about distance, but look at line 12 — the father \'smiles\'.', 'Debrief with meta-questions: "Which peer\'s evidence changed your reading?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
