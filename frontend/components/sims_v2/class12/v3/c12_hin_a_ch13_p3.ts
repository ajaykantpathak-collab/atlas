import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch13_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch13_p3: SimDef = {
    id: 'v3_c12_hin_a_ch13_p3',
    title: 'Hkh"e lkguh · Part 3/3',
    subtitle: '1938: the revolutionaries who still knew how to laugh',
    classLevel: 12, subject: 'hin_a', topic: 'Hkh"e lkguh · Part 3/3',
    chapters: ['c12_hin_a_ch13'],
    nodeIds: ['c12_hin_a_cbse_13_013', 'c12_hin_a_cbse_13_014', 'c12_hin_a_cbse_13_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Freedom-era memoir reader', intro: 'Before Quit India, there were the quiet years — and a memoirist who remembered the people inside the movement.', goal: 'Read the memoir through its 1938 setting — nationalism as lived relationship, not marble statue.' },
    discovery: {
        question: 'Nagpur, 1938: a revolutionary editor jokes through clandestine work while a provisional government forms in shadow. What makes this memoir different from a freedom-fighter hagiography?',
        options: ['Humanity beside heroism — the note gives Sakharam a rule of humour and a smiling gaze; the memoir records people, not icons', 'It names real people', 'It\'s more recent', 'Memoirs are always accurate'],
        answer: 'Humanity beside heroism — the note gives Sakharam a rule of humour and a smiling gaze; the memoir records people, not icons',
        hook: 'The year is precise — 1938, pre-Quit India, not the famous 1942. And the language carries the era: Marathi-inflected Hindi, short colloquial sentences, dialogue over description. Personal memory and national history are woven on the same loom.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of examining a text\'s explicit and implicit meanings by evaluating evidence, identifying patterns, questioning assumptions, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_13_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sit in a 1938 Nagpur room: weigh Sakharam\'s warmth against his revolution, separate the provisional government\'s claim from the British one, and hear how colloquial prose carries lived history.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re sitting in the exam hall and the question asks: "How does Khaleel use the friendship between Khaleel, Usg, and Kalyan Singh to comment.',
            decisions: [{ prompt: 'Define "critical interpretation" in the context of Class 12 Hindi prose analysis. How does it differ from literal comprehension?', options: [
                { text: 'Critical interpretation requires evaluating *how* the text constructs meaning through', outcome: 'Critical interpretation requires evaluating *how* the text constructs meaning through authorial.' },
                { text: 'personal opinion', outcome: 'Not quite — Students believe "critical analysis" means finding *hidden meanings* the author secretly buried,.', reveals: 'critical-analysis-means-finding-hidden' },
                { text: 'summary with adjectives', outcome: 'Not quite — Students believe "critical analysis" means finding *hidden meanings* the author secretly buried,.', reveals: 'critical-analysis-means-finding-hidden' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall and the question reads: "Analyze how ;kLlsj vjkI+kQkr\'s imprisonment scene reveals the chapter\'s concept of nationalism." You.',
            decisions: [{ prompt: 'What are the four components of the PEEL structure used for writing literature answers in CBSE Class 12 Hindi Core, and what specific.', options: [
                { text: 'The four components are: **Point**', outcome: 'The four components are: **Point** — one-sentence direct answer to the question (e.g., "vjkI+kQkr.' },
                { text: 'Introduction, Body, Conclusion', outcome: 'Not quite — **Students believe "good writing" in literature answers means flowery vocabulary, long sentences.', reveals: 'students-believe-good-writing-in' },
                { text: 'good writing', outcome: 'Not quite — **Students believe "good writing" in literature answers means flowery vocabulary, long sentences.', reveals: 'students-believe-good-writing-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in an ASL exam and the examiner asks: "How does the woodcutter story reflect partition trauma?" Don\'t summarize the plot.',
            decisions: [{ prompt: 'List three discussion topics from "xkaèkh, usg: vkSj ;kLlsj vjkI+kQkr" that are suitable for ASL assessment, moving beyond plot summary.', options: [
                { text: 'Strong topics: (1) "How does Shakun\'s newspaper-reading routine function as quiet', outcome: 'Strong topics: (1) "How does Shakun\'s newspaper-reading routine function as quiet resistance.' },
                { text: 'In what ways does the woodcutter story (ck', outcome: 'Not quite — Students prepare plot summaries as discussion points. They think "knowing the story" equals.', reveals: 'students-prepare-plot-summaries-as' },
                { text: 'A wrong answer listing', outcome: 'Not quite — Students prepare plot summaries as discussion points. They think "knowing the story" equals.', reveals: 'students-prepare-plot-summaries-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A senior who documented a student protest movement now calls it \'my movement, my story\' — editing out the grassroots workers whose songs and sacrifices built it, and ending every retelling on his own reflection.',
            decisions: [{ prompt: 'What does Bhisham Sahni\'s memoir structure say to that?', options: [
                { text: 'Hand the ending to the collective — the chapter deliberately closes on the revolutionary\'s \'they are not just yours, they are ours too,\' surrendering the writer\'s \'I\' to the movement\'s \'we\'; a witness holds the story in trust, not ownership.', outcome: 'The memoir\'s architecture is the argument: embedded voices — Nehru\'s sparrow tale, the child\'s song — exist so the writer never owns history, only testifies to it.' },
                { text: 'Let him own it — he wrote it down, so the narrative is his by right.', outcome: 'The chapter\'s ending exists to refute that claim: the narrator who steps back for the revolutionary\'s voice enacts the truth that recording isn\'t owning — the movement\'s people are co-owners of its telling.', reveals: 'writer-owns-the-story' },
                { text: 'Cut the folk and domestic episodes from the retelling — keep only the political events so it stays \'serious.\'', outcome: 'The memoir\'s power is the weave — the sparrow story and the child\'s song structurally foreshadow sacrifice; stripping them leaves a chronology without the argument that private life feeds public courage.', reveals: 'politics-over-domestic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a memoir as national history told in a personal voice — where revolutionaries joke, worry and persist.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of examining.',
          hint: 'If stuck, review **c12_hin_a_cbse_13_008** (imagery/metaphor) and **009**.',
          misconception: 'Students believe "critical analysis" means finding *hidden meanings* the author secretly buried, so they invent symbols.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis is the disciplined process of examining a text\'s',
                  options: ['Critical thinking in literary analysis is the disciplined process of examining a text\'s', '"Before You Read: Context and Background" provides essential historical, biographical,', 'Plot and narrative structure refers to the organized sequence of events (plot) and the', 'Setting and atmosphere in prose refer to the physical, temporal, and social environment'],
                  hint: 'If stuck, review **c12_hin_a_cbse_13_008** (imagery/metaphor) and **009** (irony/symbolism).',
                  misconception: 'Students believe "critical analysis" means finding *hidden meanings* the author secretly buried, so they invent symbols (e.g., "the.' }
          ],
            remediations: { 'critical-analysis-means-finding-hidden': { steps: ['Return to node **c12_hin_a_cbse_13_012** (Comprehension: Literal and Inferential Questions) and re-do the inferential.', 'Revisit **c12_hin_a_cbse_13_008** and **009** (Literary Devices): make a two-column table — Column A: device (irony.', 'Practice the "PEEL paragraph" structure (Point, Evidence, Explanation, Link) on one theme: communal harmony.', 'Write three PEEL paragraphs using only quotes from pages 92-94.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical analysis" means finding *hidden meanings* the author secretly buried, so they invent symbols.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Khaleel\'s use of Urdu-inflected Hindi (e.g., \'fno~Q\', \'yCèkizfr"B\', \'lnjeqdke\') is merely decorative." Defend your judgment with textual.', answer: 'The claim is false',
                  options: ['The claim is false', 'critical analysis', 'the *v[kckj* represents the British Empire', 'interpretation'],
                  hint: 'If stuck, review **c12_hin_a_cbse_13_008** (imagery/metaphor) and **009** (irony/symbolism).',
                  misconception: 'Students believe "critical analysis" means finding *hidden meanings* the author secretly buried, so they invent symbols (e.g., "the.' }
          ],
            remediations: { 'critical-analysis-means-finding-hidden': { steps: ['Return to node **c12_hin_a_cbse_13_012** (Comprehension: Literal and Inferential Questions) and re-do the inferential.', 'Revisit **c12_hin_a_cbse_13_008** and **009** (Literary Devices): make a two-column table — Column A: device (irony.', 'Practice the "PEEL paragraph" structure (Point, Evidence, Explanation, Link) on one theme: communal harmony.', 'Write three PEEL paragraphs using only quotes from pages 92-94.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refers to the ability to compose.',
          hint: 'If stuck on evidence selection, review c12_hin_a_cbse_13_002 (Plot) for incident.',
          misconception: '**Students believe "good writing" in literature answers means flowery vocabulary, long sentences, and emotional.',
          parts: [
                { id: 'a', prompt: 'What are the four components of the PEEL structure used for writing literature answers in CBSE Class 12 Hindi Core, and what specific function does each serve.', answer: 'The four components are: **Point**',
                  options: ['The four components are: **Point**', 'Introduction, Body, Conclusion', 'good writing', 'pKk;drk'],
                  hint: 'If stuck on evidence selection, review c12_hin_a_cbse_13_002 (Plot) for incident references and.',
                  misconception: '**Students believe "good writing" in literature answers means flowery vocabulary, long sentences, and emotional language.** In reality.' },
                { id: 'b', prompt: 'Using the PEEL structure, write a 4-sentence analytical paragraph answering: "How does the setting of the lnjeqdke cell (pp.', answer: '**Point:** The lnjeqdke cell operates as a **metaphoric microcosm** of inclusive',
                  options: ['**Point:** The lnjeqdke cell operates as a **metaphoric microcosm** of inclusive', 'good writing', 'pKk;drk', 'lkQyu rkRi;Z'],
                  hint: 'If stuck on evidence selection, review c12_hin_a_cbse_13_002 (Plot) for incident references and.',
                  misconception: '**Students believe "good writing" in literature answers means flowery vocabulary, long sentences, and emotional language.** In reality.' },
                { id: 'c', prompt: 'Compare how the chapter portrays "cultural patriotism" (xkaèkh th\'s preservation of folk memory, language, ritual) versus "revolutionary patriotism".', answer: '**Structural similarity:** Both are framed through **narrative recursion**',
                  options: ['**Structural similarity:** Both are framed through **narrative recursion**', 'both love India', 'good writing', 'pKk;drk'],
                  hint: 'If stuck on evidence selection, review c12_hin_a_cbse_13_002 (Plot) for incident references and.',
                  misconception: '**Students believe "good writing" in literature answers means flowery vocabulary, long sentences, and emotional language.** In reality.' }
          ],
            remediations: { 'students-believe-good-writing-in': { steps: ['** Return to **c12_hin_a_cbse_13_004** (Character Analysis: Protagonist) and **c12_hin_a_cbse_13_006** (Theme: Primary.', '** Extract ONE character trait from 004 (e.g., "xkaèkh th\'s loyalty") and ONE theme from 006 (e.g., "cultural.', '** Practice PEEL *only* on this trait-theme pair using Worked Example 1 as template — write 3 versions, each time.', '** Re-attempt Diagnostic Question 3. **'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_015', difficulty: 'standard',
          question: 'Speaking and Listening discussion points are structured conversation prompts.',
          hint: 'If stuck, review character analysis (c12_hin_a_cbse_13_004, 005) and theme nodes.',
          misconception: 'Students prepare plot summaries as discussion points. They think "knowing the story" equals "discussing the story.".',
          parts: [
                { id: 'a', prompt: 'Explain why "Shakun\'s silence about her past" is a richer discussion point than "Shakun\'s physical description" for an ASL response on character analysis.', answer: 'Physical description (appearance, clothing) yields closed, factual responses',
                  options: ['Physical description (appearance, clothing) yields closed, factual responses', 'Both are character details'],
                  hint: 'If stuck, review character analysis (c12_hin_a_cbse_13_004, 005) and theme nodes.',
                  misconception: 'Students prepare plot summaries as discussion points. They think "knowing the story" equals "discussing the story." Example: A student says.' },
                { id: 'b', prompt: 'Compare how Usga and Kalpana Vajpayee represent different responses to historical upheaval, using one textual detail for each woman that reveals her.', answer: 'Usga: Domestic storytelling as resistance',
                  options: ['Usga: Domestic storytelling as resistance', 'अकेली पड़ गई थी'],
                  hint: 'If stuck, review character analysis (c12_hin_a_cbse_13_004, 005) and theme nodes.',
                  misconception: 'Students prepare plot summaries as discussion points. They think "knowing the story" equals "discussing the story." Example: A student says.' }
          ],
            remediations: { 'students-prepare-plot-summaries-as': { steps: ['If student defaults to plot summary: (1) Interrupt gently: "That\'s what happens.', 'Now tell me what it *means* and *how* the author shows it." (2) Model conversion: Take their fact "Shakun read.', 'For each, ask: "What does this reveal about gender/partition/author\'s craft?" (4) Re-attempt the original discussion.', 'If still stuck, assign node c12_hin_a_cbse_13_013 (Critical Thinking) for evidence-to-argument practice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
