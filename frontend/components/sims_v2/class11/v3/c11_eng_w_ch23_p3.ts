import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch23_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch23_p3: SimDef = {
    id: 'v3_c11_eng_w_ch23_p3',
    title: 'What is a Good Book? (Essay) · Part 3/3',
    subtitle: 'Assemble the criteria for a good book the way a reader actually does.',
    classLevel: 11, subject: 'eng_w', topic: 'What is a Good Book? (Essay) · Part 3/3',
    chapters: ['c11_eng_w_ch23'],
    nodeIds: ['c11_eng_w_cbse_23_013', 'c11_eng_w_cbse_23_014', 'c11_eng_w_cbse_23_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a lifelong reader auditing what lasted', intro: 'Which books from your childhood still hold up? The essay builds its answer from exactly that experiment.', goal: 'Analyse the essay\'s inductive structure and its circular, library-framed resolution.' },
    discovery: {
        question: 'Which test best certifies a \'good book\' — critical acclaim, or something a childhood favourite can prove decades later?',
        options: ['Whether it survives re-reading as an adult — endurance across the reader\'s own time is the essay\'s criterion', 'Sales figures — the market recognises quality', 'Difficulty — a good book must resist easy reading', 'Newness — only contemporary work matters'],
        answer: 'Whether it survives re-reading as an adult — endurance across the reader\'s own time is the essay\'s criterion',
        hook: 'Bond builds his criteria inductively out of a childhood of reading — the essay argues the way a library grows: one loved book at a time.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation in the context of "Patterns of Creativity" refers to the ability to deconstruct the essay\'s central argument about the divergent creative patterns.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_23_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace how the essay departs from chronology to group books by theme, and judge the ending\'s return to the grandfather\'s library.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are at a science exhibition where a poet and a physicist are arguing about whether a rainbow is more beautiful before or after you understand its.',
            decisions: [{ prompt: 'What is the central question Chandrasekhar explicitly states he will not answer directly in the opening paragraph of "Patterns.', options: [
                { text: 'The central question is: "why is there a difference in the patterns of creativity among', outcome: 'The central question is: "why is there a difference in the patterns of creativity among the.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often treat the essay as a simple "Science vs. Poetry" debate and look for a winner.', reveals: 'students-often-treat-the-essay' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you are asked: "Chandrasekhar says scientists and poets view each other with suspicion. Do you agree?',
            decisions: [{ prompt: 'What is the PEEL structure in analytical writing, and what does each letter stand for?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. Point: the main claim of the paragraph.' },
                { text: 'Point, Example, Explanation, Conclusion', outcome: 'Not quite — Students often believe that "using quotes from the text" equals analysis.', reveals: 'using-quotes-from-the-text' },
                { text: 'using quotes from the text', outcome: 'Not quite — Students often believe that "using quotes from the text" equals analysis.', reveals: 'using-quotes-from-the-text' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a literature circle with classmates, and the teacher asks: "Why does Chandrasekhar spend so much time quoting poets like Wordsworth, Keats.',
            decisions: [{ prompt: 'What is the central question Chandrasekhar poses at the beginning of the essay "Patterns of Creativity"?', options: [
                { text: 'The central question is: "why is there a difference in the patterns of creativity among', outcome: 'The central question is: "why is there a difference in the patterns of creativity among the.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often think a discussion is just sharing personal opinions about whether they like science.', reveals: 'a-discussion-is-just-sharing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_013', title: 'Use it in the wild',
          caseStudy: { intro: 'The library committee asks your class to draft criteria for \'what makes a book worth keeping.\' You suggest the essay \'What is a Good Book?\' but a teammate dismisses it: \'It\'s just someone\'s childhood reading memories — there\'s no argument, no structure, nothing to extract criteria from.\'',
            decisions: [{ prompt: 'How do you show the essay\'s argumentative structure?', options: [
                { text: 'Trace the essay\'s real architecture: it poses a question and answers it inductively — personal reading memories aren\'t decoration but anchors, recurring touchstones from which general criteria accumulate. The childhood anecdotes function as evidence, and the movement from specific books to universal standards is the \'plot of ideas\' guiding the reader to a conclusion.', outcome: 'The teammate learns to read non-fiction structure: an essay\'s plot is its logical progression, and the memories are load-bearing evidence, not nostalgia.' },
                { text: 'Concede and drop the essay — pick a checklist article instead, since this one has no criteria.', outcome: 'The criteria are there; they\'re built inductively from experience rather than listed — a stronger, more durable kind of argument for \'worth keeping\'.', reveals: 'reflective-essay-has-no-argument' },
                { text: 'Force it into a story shape — call the childhood memory the \'exposition\' and the last library image the \'resolution\' to prove it has structure.', outcome: 'Freytag\'s pyramid is the wrong tool: the essay\'s architecture is an inductive accumulation of criteria anchored by personal touchstones, not a fictional arc.', reveals: 'forcing-fiction-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_015', title: 'You made it',
          caseStudy: { intro: 'The essay closes the circle where it began — in a library — and hands the question to the reader\'s own shelves.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation in the context of "Patterns.',
          hint: 'If stuck, review "Understanding the Text" Q1 and Q2 in the textbook which explicitly ask.',
          misconception: 'Students often treat the essay as a simple "Science vs. Poetry" debate and look for a winner.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Chandrasekhar calls Shelley "a scientist\'s poet" and contrasts him with Wordsworth and Keats.', answer: 'Shelley is called "a scientist\'s poet"',
                  options: ['Shelley is called "a scientist\'s poet"', 'a scientist\'s poet', 'joy, peace, and illumination', 'cold philosophy'],
                  hint: 'If stuck, review "Understanding the Text" Q1 and Q2 in the textbook which explicitly ask for the.',
                  misconception: 'Students often treat the essay as a simple "Science vs. Poetry" debate and look for a winner.' },
                { id: 'b', prompt: 'Apply Chandrasekhar\'s distinction between "mutually sustaining endeavours" and "compete" to a modern example: a biologist writing a popular science book using.', answer: 'Chandrasekhar would likely classify this as *competition*',
                  options: ['Chandrasekhar would likely classify this as *competition*', 'cooperation'],
                  hint: 'If stuck, review "Understanding the Text" Q1 and Q2 in the textbook which explicitly ask for the.',
                  misconception: 'Students often treat the essay as a simple "Science vs. Poetry" debate and look for a winner.' }
          ],
            remediations: { 'students-often-treat-the-essay': { steps: ['If a student falls into the "Science vs.', 'Poetry" binary trap: (1) Have them re-read the paragraph starting "It would not seem to me that one can go very far...', 'by pointing accusing fingers." (2) Ask: "Who is the speaker?', 'What does he *do* with the poets\' quotes?" (3) Guide them to map the essay\'s three moves: hostile poets → friendly poet.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_014', difficulty: 'standard',
          question: 'Analytical essay writing on interdisciplinary themes involves constructing.',
          hint: 'If stuck, review c11_eng_w_cbse_23_006 (Theme) and c9_engl_ch1_15 (PEEL method).',
          misconception: 'Students often believe that "using quotes from the text" equals analysis.',
          parts: [
                { id: 'a', prompt: 'What is the PEEL structure in analytical writing, and what does each letter stand for?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Point, Example, Explanation, Conclusion', 'using quotes from the text', '"using quotes from the text" equals analysis'],
                  hint: 'If stuck, review c11_eng_w_cbse_23_006 (Theme) and c9_engl_ch1_15 (PEEL method) to refresh the core.',
                  misconception: 'Students often believe that "using quotes from the text" equals analysis.' }
          ],
            remediations: { 'using-quotes-from-the-text': { steps: ['If a student produces quote-dumping paragraphs, do this 3-step fix: (1) Give them a model PEEL paragraph on the same.', '(2) Ask them to write one sentence answering "What does \'wings\' represent in Keats\'s metaphor?" and another answering.', 'Repeat with a new quote until the habit forms.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "using quotes from the text" equals analysis.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Chandrasekhar proves that poetry and science are mutually sustaining endeavours." Use evidence from the text to justify your.', answer: 'The statement is not fully supported',
                  options: ['The statement is not fully supported', 'using quotes from the text', '"using quotes from the text" equals analysis'],
                  hint: 'If stuck, review c11_eng_w_cbse_23_006 (Theme) and c9_engl_ch1_15 (PEEL method) to refresh the core.',
                  misconception: 'Students often believe that "using quotes from the text" equals analysis.' }
          ],
            remediations: { 'using-quotes-from-the-text': { steps: ['If a student produces quote-dumping paragraphs, do this 3-step fix: (1) Give them a model PEEL paragraph on the same.', '(2) Ask them to write one sentence answering "What does \'wings\' represent in Keats\'s metaphor?" and another answering.', 'Repeat with a new quote until the habit forms.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review the "Understanding the Text" questions (especially Q1, Q3, Q5) and the.',
          misconception: 'Students often think a discussion is just sharing personal opinions about whether they like science or poetry.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to the structured oral activity where',
                  options: ['Speaking and Listening: Discussion Points refers to the structured oral activity where', '"Before You Read: Context and Background" is a pre-reading strategy where students', 'Plot is the sequence of causally linked events that form the narrative arc of a text,', 'In a non-fiction essay, **setting** refers to the intellectual, historical, and cultural'],
                  hint: 'If stuck, review the "Understanding the Text" questions (especially Q1, Q3, Q5) and the "Talking.',
                  misconception: 'Students often think a discussion is just sharing personal opinions about whether they like science or poetry.' }
          ],
            remediations: { 'a-discussion-is-just-sharing': { steps: ['Have the student re-read the "Talking About the Text" section in the textbook (the three discussion prompts).', 'Model a text-grounded response: "On page 155, Chandrasekhar quotes Shelley\'s \'The Cloud\' as fusing myth, science, and.', 'Practice with a partner: each point must include a page/line reference.', 'Use a graphic organizer: Claim | Evidence | Explanation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
