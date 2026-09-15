import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch25_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch25_p3: SimDef = {
    id: 'v3_c11_eng_w_ch25_p3',
    title: 'The Story (Essay) · Part 3/3',
    subtitle: 'Separate story\'s \'and then\' from plot\'s \'why\' — Forster\'s sharpest knife.',
    classLevel: 11, subject: 'eng_w', topic: 'The Story (Essay) · Part 3/3',
    chapters: ['c11_eng_w_ch25'],
    nodeIds: ['c11_eng_w_cbse_25_013', 'c11_eng_w_cbse_25_014', 'c11_eng_w_cbse_25_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a critic auditing what a novel cannot live without', intro: 'A lecture hall, 1927: a novelist insists the humble story — crude, chronological, ancient — is the backbone no novel escapes.', goal: 'Apply the story-plot distinction and evaluate time as the novel\'s inescapable fabric.' },
    discovery: {
        question: '\'The king died and then the queen died\' versus \'The king died and then the queen died of grief.\' Forster says only one is a plot — which?',
        options: ['The second — it adds causality; the first is merely a story, a tapeworm of time', 'The first — plot just means events in order', 'Both — plot and story are synonyms', 'Neither — both are only chronology'],
        answer: 'The second — it adds causality; the first is merely a story, a tapeworm of time',
        hook: 'A story only asks \'and then?\'; a plot makes you ask \'why?\' — the whole machinery of the novel hangs on that difference.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of actively examining a text\'s arguments, metaphors, and rhetorical strategies to interpret the author\'s deeper meaning, evaluate the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_25_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split \'life in time\' from \'life by values\' in real sentences, then test Forster\'s claim that no novelist — not Sterne, not Proust — can deny time.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are choosing between reading a viral social media thread summarizing a classic novel versus reading the novel itself.',
            decisions: [{ prompt: 'According to Ruskin, what is the fundamental difference between a "book of the hour" and a true "Book" in terms of the author\'s intention?', options: [
                { text: 'A "book of the hour" is written to multiply the author\'s voice for immediate', outcome: 'A "book of the hour" is written to multiply the author\'s voice for immediate communication (like.' },
                { text: 'one is fiction, the other non-fiction', outcome: 'Not quite — Students often believe Ruskin dismisses all contemporary/popular writing as "bad." They conflate.', reveals: 'ruskin-dismisses-all-contemporary-popular' },
                { text: 'Ruskin dismisses all contemporary/popular writing as "bad', outcome: 'Not quite — Students often believe Ruskin dismisses all contemporary/popular writing as "bad." They conflate.', reveals: 'ruskin-dismisses-all-contemporary-popular' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you sit in the exam hall and the question reads: "Ruskin argues that reading a good book is like mining for gold.',
            decisions: [{ prompt: 'Define the term \'books of the hour\' as used by Ruskin, and give one example he provides in the essay.', options: [
                { text: 'Books of the hour are useful or pleasant printed talks', outcome: 'Books of the hour are useful or pleasant printed talks — travel accounts, witty discussions.' },
                { text: 'writing a board-exam answer on Ruskin means summarizing his points in sequence', outcome: 'Not quite — Students believe that writing a board-exam answer on Ruskin means summarizing his points.', reveals: 'writing-a-board-exam-answer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a literature circle where everyone has read Ruskin\'s essay but interprets his "mining for gold" metaphor differently—one classmate thinks.',
            decisions: [{ prompt: 'What is the primary distinction Ruskin draws between "books of the hour" and true books in the essay?', options: [
                { text: 'Ruskin distinguishes "books of the hour" as useful or pleasant talk printed for temporary', outcome: 'Ruskin distinguishes "books of the hour" as useful or pleasant talk printed for temporary.' },
                { text: 'equates the difference with fiction vs', outcome: 'Not quite — Students often treat "discussion points" as a checklist of topics to cover rather than a dynamic.', reveals: 'students-often-treat-discussion-points' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your reading club is debating a \'one book per month\' rule where members pick whatever is trending online. You invoke Ruskin\'s \'What is a Good Book?\' A member fires back: \'That Victorian essay is just a loose rant — old books good, newspapers bad, then something about gold mining and spelling.\'',
            decisions: [{ prompt: 'How do you show the essay is a tight argument, not a rant?', options: [
                { text: 'Walk them through the architecture: Distinction (books of the hour vs books of all time) → Definition of a true book → Urgency → the mining analogy (you must dig and smelt for the author\'s meaning as for gold) → Prescription (read letter by letter). Each move necessitates the next. And Ruskin\'s context explains the values: a critic of industrial capitalism prized permanence over multiplication, labour over conveyance.', outcome: 'The \'rant\' resolves into engineering: distinction creates the category, analogy explains the process, prescription hands over the tool — the club sees why \'trending\' is exactly Ruskin\'s \'book of the hour\'.' },
                { text: 'Concede the structure point but keep the conclusion — Ruskin liked old books, so just pick classics.', outcome: 'Keeping the conclusion while denying the argument misses his actual demand: not oldness but the disciplined, letter-by-letter labour a true book requires of its reader.', reveals: 'ruskin-just-means-old-books' },
                { text: 'Agree it\'s loose — Victorian prose is famously rambling, so mine it for a few quotes instead.', outcome: 'The sentence complexity hides the moves, it doesn\'t erase them; treating it as a quote-bag skips the argumentative arc that carries the reader from premise to conviction.', reveals: 'victorian-prose-is-formless' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_015', title: 'You made it',
          caseStudy: { intro: 'Writers can hide the clock, flip it, or alter its hands — but the reader keeps rebuilding the time-line, which is exactly Forster\'s point.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of actively.',
          hint: 'If stuck, return to node 008 (Imagery and Metaphor) and re-analyze the mining metaphor.',
          misconception: 'Students often believe Ruskin dismisses all contemporary/popular writing as "bad." They conflate his critique.',
          parts: [
                { id: 'a', prompt: 'According to Ruskin, what is the fundamental difference between a "book of the hour" and a true "Book" in terms of the author\'s intention?', answer: 'A "book of the hour" is written to multiply the author\'s voice for immediate',
                  options: ['A "book of the hour" is written to multiply the author\'s voice for immediate', 'one is fiction, the other non-fiction', 'Ruskin dismisses all contemporary/popular writing as "bad'],
                  hint: 'If stuck, return to node 008 (Imagery and Metaphor) and re-analyze the mining metaphor using the.',
                  misconception: 'Students often believe Ruskin dismisses all contemporary/popular writing as "bad." They conflate his critique of *mistaking the ephemeral.' }
          ],
            remediations: { 'ruskin-dismisses-all-contemporary-popular': { steps: ['Re-read paragraphs 1-2 with a highlighter: mark every positive adjective Ruskin uses for "books of the hour" (useful.', 'Write a two-column table: "Purpose of Book of Hour" (communication, multiplicity, conveyance) vs.', '"Purpose of True Book" (permanence, preservation, inscription).', 'Orally explain to a peer: "Ruskin loves newspapers; he just doesn\'t want you to *live* in them." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'If stuck, review c11_eng_w_cbse_25_013\'s worked examples on tracing a theme across.',
          misconception: 'Students believe that writing a board-exam answer on Ruskin means summarizing his points in sequence.',
          parts: [
                { id: 'a', prompt: 'Define the term \'books of the hour\' as used by Ruskin, and give one example he provides in the essay.', answer: 'Books of the hour are useful or pleasant printed talks',
                  options: ['Books of the hour are useful or pleasant printed talks', 'writing a board-exam answer on Ruskin means summarizing his points in sequence'],
                  hint: 'If stuck, review c11_eng_w_cbse_25_013\'s worked examples on tracing a theme across multiple.',
                  misconception: 'Students believe that writing a board-exam answer on Ruskin means summarizing his points in sequence.' },
                { id: 'b', prompt: 'Explain in your own words why Ruskin insists that a reader must \'rise to the level of\' the thoughts in a true book rather than expecting the book to descend.', answer: 'Ruskin believes true books contain the concentrated wisdom of great minds',
                  options: ['Ruskin believes true books contain the concentrated wisdom of great minds', 'writing a board-exam answer on Ruskin means summarizing his points in sequence'],
                  hint: 'If stuck, review c11_eng_w_cbse_25_013\'s worked examples on tracing a theme across multiple.',
                  misconception: 'Students believe that writing a board-exam answer on Ruskin means summarizing his points in sequence.' },
                { id: 'c', prompt: 'A Class 11 student writes: "Ruskin says we should read letter by letter.', answer: 'The interpretation is incomplete',
                  options: ['The interpretation is incomplete', 'writing a board-exam answer on Ruskin means summarizing his points in sequence'],
                  hint: 'If stuck, review c11_eng_w_cbse_25_013\'s worked examples on tracing a theme across multiple.',
                  misconception: 'Students believe that writing a board-exam answer on Ruskin means summarizing his points in sequence.' },
                { id: 'd', prompt: 'Compare Ruskin\'s view of the reader\'s duty with the modern idea of \'relatable\' literature.', answer: 'Ruskin explicitly rejects the reader who says, \'How good this is',
                  options: ['Ruskin explicitly rejects the reader who says, \'How good this is', 'writing a board-exam answer on Ruskin means summarizing his points in sequence'],
                  hint: 'If stuck, review c11_eng_w_cbse_25_013\'s worked examples on tracing a theme across multiple.',
                  misconception: 'Students believe that writing a board-exam answer on Ruskin means summarizing his points in sequence.' }
          ],
            remediations: { 'writing-a-board-exam-answer': { steps: ['Give the student a one-paragraph prompt (e.g., \'Explain Ruskin\'s distinction between books of the hour and true books\').', 'Ask them to highlight every sentence that is *their own analytical claim* vs.', 'If they have zero analytical claims, provide a template: \'Ruskin argues that [claim] because [reason].', 'He illustrates this by [evidence].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that writing a board-exam answer on Ruskin means summarizing his points in sequence.',
          parts: [
                { id: 'a', prompt: 'Critique the following claim using evidence from the text: "Ruskin\'s essay is elitist because it says only the educated can access true books."', answer: 'The claim misreads Ruskin\'s meritocracy',
                  options: ['The claim misreads Ruskin\'s meritocracy', 'writing a board-exam answer on Ruskin means summarizing his points in sequence'],
                  hint: 'If stuck, review c11_eng_w_cbse_25_013\'s worked examples on tracing a theme across multiple.',
                  misconception: 'Students believe that writing a board-exam answer on Ruskin means summarizing his points in sequence.' },
                { id: 'b', prompt: 'Write a 100-word analytical paragraph responding to: "How does Ruskin use the metaphor of gold mining to define the relationship between author, text, and.', answer: 'Ruskin\'s mining metaphor reconfigures reading as extractive labor',
                  options: ['Ruskin\'s mining metaphor reconfigures reading as extractive labor', 'writing a board-exam answer on Ruskin means summarizing his points in sequence'],
                  hint: 'If stuck, review c11_eng_w_cbse_25_013\'s worked examples on tracing a theme across multiple.',
                  misconception: 'Students believe that writing a board-exam answer on Ruskin means summarizing his points in sequence.' }
          ],
            remediations: { 'writing-a-board-exam-answer': { steps: ['Give the student a one-paragraph prompt (e.g., \'Explain Ruskin\'s distinction between books of the hour and true books\').', 'Ask them to highlight every sentence that is *their own analytical claim* vs.', 'If they have zero analytical claims, provide a template: \'Ruskin argues that [claim] because [reason].', 'He illustrates this by [evidence].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review c11_eng_w_cbse_25_013 (Critical Thinking) worked examples.',
          misconception: 'Students often treat "discussion points" as a checklist of topics to cover rather than a dynamic exchange of ideas.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to the structured oral communication',
                  options: ['Speaking and Listening: Discussion Points refers to the structured oral communication', '"Before You Read: Context and Background" is a preparatory pedagogical step that equips', 'Plot is the logical sequence of events or ideas that form the backbone of a narrative', 'In non-fiction essays like Ruskin\'s, **setting** refers to the metaphorical,'],
                  hint: 'If stuck, review c11_eng_w_cbse_25_013 (Critical Thinking) worked examples on constructing.',
                  misconception: 'Students often treat "discussion points" as a checklist of topics to cover rather than a dynamic exchange of ideas.' }
          ],
            remediations: { 'students-often-treat-discussion-points': { steps: ['If a student defaults to serial monologue: (1) Pause the discussion and model a "building" move: "Arjun noticed the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
