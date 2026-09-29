import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch13_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch13_p3: SimDef = {
    id: 'v3_c12_eng_k_ch13_p3',
    title: 'A River (Poem) · Part 3/3',
    subtitle: 'The house she left keeps dying in every town she reaches',
    classLevel: 12, subject: 'eng_k', topic: 'A River (Poem) · Part 3/3',
    chapters: ['c12_eng_k_ch13'],
    nodeIds: ['c12_eng_k_cbse_13_013', 'c12_eng_k_cbse_13_014', 'c12_eng_k_cbse_13_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Confessional poetry reader', intro: 'A feminist poet returns, in verse, to the feudal house that made her — and asks what her blood remembers that she\'d rather forget.', goal: 'Read Kamala Das\'s Blood as a confessional meditation on matrilineal inheritance, female agency and unresolved guilt.' },
    discovery: {
        question: 'A great-grandmother boasts her blood is \'the oldest blood in the world — thin and clear and fine,\' while the poor bleed \'thick as gruel.\' Is the poem endorsing her pride?',
        options: ['No — it stages the feudal metaphor for critique; the granddaughter who shares that blood abandons the house and learns \'most lessons of defeat\'', 'Yes — aristocratic blood is real', 'It\'s about literal blood types', 'The grandmother is simply right'],
        answer: 'No — it stages the feudal metaphor for critique; the granddaughter who shares that blood abandons the house and learns \'most lessons of defeat\'',
        hook: '\'Blood\' is confessional poetry — a feminist voice interrogating her own inheritance. The decaying tharavad and the dying matriarch are one body; the speaker flees, feels the betrayal, and still hears \'the rattle of its death\' from every town she lives in. Inheritance is a haunting, not a keepsake.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Blood\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_13_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk the ancestral house of South Malabar: map the poem\'s three timeframes, weigh the great-grandmother\'s devotion against the speaker\'s flight, and decide if the ending offers closure — or a haunting that rides on.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Blood\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the central conflict in Kamala Das\'s poem "Blood"?', options: [
                { text: 'The central conflict is the poet\'s guilt over abandoning her ancestral house and breaking', outcome: 'The central conflict is the poet\'s guilt over abandoning her ancestral house and breaking her.' },
                { text: 'the house is old and broken', outcome: 'Not quite — Students often read "oldest blood" as a straightforward celebration of heritage, missing the poem\'s.', reveals: 'students-often-read-oldest-blood' },
                { text: 'oldest blood', outcome: 'Not quite — Students often read "oldest blood" as a straightforward celebration of heritage, missing the poem\'s.', reveals: 'students-often-read-oldest-blood' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Blood\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers for CBSE Class 12?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "writing skills" for poetry means memorising a template answer for each likely.', reveals: 'writing-skills-for-poetry-means' },
                { text: 'Point, Example, Elaborate, Leave', outcome: 'Not quite — Students believe "writing skills" for poetry means memorising a template answer for each likely.', reveals: 'writing-skills-for-poetry-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Blood\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' in a Class 12 English speaking and listening activity based on a poem?', options: [
                { text: 'The primary purpose is to scaffold focused, evidence-based oral analysis of the poem\'s', outcome: 'The primary purpose is to scaffold focused, evidence-based oral analysis of the poem\'s themes.' },
                { text: 'to summarize the poem', outcome: 'Not quite — Students often treat speaking and listening as "just talking about the poem" — they share personal.', reveals: 'students-often-treat-speaking-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A daughter is told she must keep the crumbling ancestral house and \'the oldest blood in the world\' — abandon her career in the city to guard the lineage.',
            decisions: [{ prompt: 'What does Kamala Das\'s \'Blood\' make of that demand?', options: [
                { text: 'It backs her break — the poem loves the house yet shows \'blood\' pride as a script that cages women; she can honour the inheritance and still refuse the role it assigns her.', outcome: 'The speaker stays haunted but leaves anyway — loyalty to memory doesn\'t mean submission to the lineage\'s demands.' },
                { text: 'She must stay — bloodline duty outranks any individual life.', outcome: 'The poem reports the great-grandmother\'s claim ironically, exposing how \'oldest blood\' talk serves the feudal order, not her.', reveals: 'tradition-outranks-person' },
                { text: 'She should go and feel nothing — attachment to an old house is irrational.', outcome: 'The poem refuses that easy exit too; the haunting is real, and denying it just hides the cost rather than paying it honestly.', reveals: 'heritage-is-irrational' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_13_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a family home as an argument about lineage, gender and guilt — and hear an ellipsis where a resolution should be.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_013', difficulty: 'standard',
          question: 'Critical thinking on \'Blood\' — analysing the text to reach evidence-based.',
          hint: 'If stuck, return to node **c12_eng_k_cbse_13_008** and practice the "Image → Literal.',
          misconception: 'Students often read "oldest blood" as a straightforward celebration of heritage, missing the poem\'s irony: the.',
          parts: [
                { id: 'a', prompt: 'Explain the contrast the poem draws between the "oldest blood" of the speaker\'s lineage and the blood of the "always poor" and "new-rich men." What social.', answer: 'The "oldest blood" is described as "thin and clear and fine"',
                  options: ['The "oldest blood" is described as "thin and clear and fine"', 'she thinks her family has better genetics', 'oldest blood', 'thin, clear, fine'],
                  hint: 'If stuck, return to node **c12_eng_k_cbse_13_008** and practice the "Image → Literal Meaning →.',
                  misconception: 'Students often read "oldest blood" as a straightforward celebration of heritage, missing the poem\'s irony: the great-grandmother\'s "thin.' }
          ],
            remediations: { 'students-often-read-oldest-blood': { steps: ['If a student cannot articulate the irony or the dual-level symbolism: (1) Re-read the great-grandmother\'s monologue.', '(3) Revisit node **c12_eng_k_cbse_13_009** (Irony and Symbolism) to analyze the "blood" comparison as situational irony.', '(4) Write a two-column table: Column A = great-grandmother\'s claims; Column B = poem\'s reality.', 'Use this to draft a paragraph explaining why the "oldest blood" cannot save the house.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_014', difficulty: 'standard',
          question: 'Writing skills from \'Blood\' — using the text as a model or springboard for your.',
          hint: 'If stuck on Evidence selection, return to node 012 (Comprehension) and practice the.',
          misconception: 'Students believe "writing skills" for poetry means memorising a template answer for each likely question.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers for CBSE Class 12?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Line', 'Point, Example, Elaborate, Leave', 'Evidence'],
                  hint: 'If stuck on Evidence selection, return to node 012 (Comprehension) and practice the.',
                  misconception: 'Students believe "writing skills" for poetry means memorising a template answer for each likely question.' },
                { id: 'b', prompt: 'Compare these two evidence selections for a paragraph on the house as symbol. Which is more effective and why?', answer: 'Selection A is more effective for a *symbolism* paragraph',
                  options: ['Selection A is more effective for a *symbolism* paragraph', 'writing skills'],
                  hint: 'If stuck on Evidence selection, return to node 012 (Comprehension) and practice the.',
                  misconception: 'Students believe "writing skills" for poetry means memorising a template answer for each likely question.' }
          ],
            remediations: { 'writing-skills-for-poetry-means': { steps: ['If a student cannot produce a coherent PEEL paragraph after two attempts: 1) Return to node c12_eng_k_cbse_13_012.', '2) Revisit node c12_eng_k_cbse_13_008 (Imagery and Metaphor) and c12_eng_k_cbse_13_009 (Irony and Symbolism) to ensure.', '3) Practice the "Evidence Hunt" drill: give a theme, set a 2-minute timer, student lists 3 quotes with stanza/line.', '4) Re-attempt a full PEEL paragraph on a fresh theme (e.g., "compromise") with the teacher modelling the Link sentence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills" for poetry means memorising a template answer for each likely question.',
          parts: [
                { id: 'a', prompt: 'A student\'s Link sentence reads: "This shows the poet feels guilty." Evaluate this Link against the question: "How does the poem explore the conflict between.', answer: 'The Link is inadequate',
                  options: ['The Link is inadequate', 'writing skills'],
                  hint: 'If stuck on Evidence selection, return to node 012 (Comprehension) and practice the.',
                  misconception: 'Students believe "writing skills" for poetry means memorising a template answer for each likely question.' }
          ],
            remediations: { 'writing-skills-for-poetry-means': { steps: ['If a student cannot produce a coherent PEEL paragraph after two attempts: 1) Return to node c12_eng_k_cbse_13_012.', '2) Revisit node c12_eng_k_cbse_13_008 (Imagery and Metaphor) and c12_eng_k_cbse_13_009 (Irony and Symbolism) to ensure.', '3) Practice the "Evidence Hunt" drill: give a theme, set a 2-minute timer, student lists 3 quotes with stanza/line.', '4) Re-attempt a full PEEL paragraph on a fresh theme (e.g., "compromise") with the teacher modelling the Link sentence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_13_015', difficulty: 'standard',
          question: 'Discussion points on \'Blood\' — speaking and listening around the text.',
          hint: 'If stuck, revisit c12_eng_k_cbse_13_008 (Imagery and Metaphor) and c12_eng_k_cbse_13_009.',
          misconception: 'Students often treat speaking and listening as "just talking about the poem" — they share personal opinions ("I liked.',
          parts: [
                { id: 'a', prompt: 'In the poem "Blood," the great-grandmother says, "For I love this house, it hurts me much / To watch it die." A student claims this line shows the house is.', answer: 'Yes, it is valid',
                  options: ['Yes, it is valid', 'it\'s just a house'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_13_008 (Imagery and Metaphor) and c12_eng_k_cbse_13_009 (Irony and.',
                  misconception: 'Students often treat speaking and listening as "just talking about the poem" — they share personal opinions ("I liked the part about the.' }
          ],
            remediations: { 'students-often-treat-speaking-and': { steps: ['If a student cannot move beyond summary or personal reaction: (1) Give them a specific textual anchor — e.g., "Find the.', 'What does \'thin and clear and fine\' suggest about her self-image?" (2) Model a 30-second evidence-based claim: "The.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
