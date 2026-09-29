import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch10_p3: SimDef = {
    id: 'v3_c12_eng_k_ch10_p3',
    title: 'Emily Dickinson (Poem) · Part 3/3',
    subtitle: 'Fewer than a dozen poems published — 1,789 left in a drawer',
    classLevel: 12, subject: 'eng_k', topic: 'Emily Dickinson (Poem) · Part 3/3',
    chapters: ['c12_eng_k_ch10'],
    nodeIds: ['c12_eng_k_cbse_10_013', 'c12_eng_k_cbse_10_014', 'c12_eng_k_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'American poetry reader', intro: 'A recluse in Amherst wrote poems too strange for her century — and they turned out to be built, not broken.', goal: 'Read Dickinson\'s Trees through her signature style — dashes, capitals, compressed imagery — and her observational precision.' },
    discovery: {
        question: 'Dickinson writes \'The Trees like Tassels hit – and – swung –\' with dashes where commas belong and capitals mid-sentence. Error, or instrument?',
        options: ['Instrument — the dashes mime the trees\' jerky swing and the capitals turn Sun and Summer into persons with Estates of Cloud', 'Errors — she needed an editor', 'Random habit', 'Old-fashioned grammar rules'],
        answer: 'Instrument — the dashes mime the trees\' jerky swing and the capitals turn Sun and Summer into persons with Estates of Cloud',
        hook: 'She published barely a dozen poems alive; 1,789 surfaced after — written for herself, never flattened by a publisher. Recluse doesn\'t mean unobservant: \'A Bird sat careless on the fence\' is precision, not fantasy. The strangeness is the point.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Trees\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_10_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Decode Dickinson\'s fingerprint: wield her dashes and capitals as reading tools, then prove that a woman at one window watched nature more closely than most travellers.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Trees\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'Define "interpretation" in literary analysis and explain how it differs from "summary" or "personal opinion."', options: [
                { text: 'Interpretation is an evidence-based argument about what a text *means* and *how* it', outcome: 'Interpretation is an evidence-based argument about what a text *means* and *how* it achieves that.' },
                { text: 'Interpretation is just your view of the poem', outcome: 'Not quite — Students believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "The Sun.', reveals: 'critical-analysis-means-finding-one' },
                { text: 'critical analysis', outcome: 'Not quite — Students believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "The Sun.', reveals: 'critical-analysis-means-finding-one' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Trees\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs for poetry?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "embedding quotes" means inserting a full line like: "The Trees like Tassels hit.', reveals: 'embedding-quotes-means-inserting-a' },
                { text: 'embedding quotes', outcome: 'Not quite — Students believe "embedding quotes" means inserting a full line like: "The Trees like Tassels hit.', reveals: 'embedding-quotes-means-inserting-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Trees\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the six discussion questions provided in the NCERT "Responding to the Poem" section for Emily Dickinson\'s "Trees"?', options: [
                { text: 'The six questions are: (1) What imagery does the poet use to delineate Summer\'s day more', outcome: 'The six questions are: (1) What imagery does the poet use to delineate Summer\'s day more.' },
                { text: 'Language Study', outcome: 'Not quite — Students believe a literary discussion is a round-robin where each person answers a question once.', reveals: 'a-literary-discussion-is-a' },
                { text: 'only 3-4 questions or confusing them with "Language Study" items', outcome: 'Not quite — Students believe a literary discussion is a round-robin where each person answers a question once.', reveals: 'a-literary-discussion-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Editing a young poet\'s manuscript, a colleague wants to strip out all her odd dashes and strange capitalisations \'to fix the grammar before we publish\'.',
            decisions: [{ prompt: 'Correct the strangeness or keep it?', options: [
                { text: 'Keep it until proven decorative — Dickinson\'s dashes and capitals aren\'t errors but tools that hold pauses and double meanings; \'fixing\' them flattens the poem.', outcome: 'Before editing style into compliance, ask what the oddity is doing — in Dickinson the form carries the meaning.' },
                { text: 'Fix it — standard grammar exists so readers aren\'t confused.', outcome: 'That treats deliberate prosodic choice as a mistake; her compressed strangeness is the precision.', reveals: 'unconventionality-is-error' },
                { text: 'Publish it, but note she\'s a recluse so expect the work to be small and private anyway.', outcome: 'Her window-narrow life produced startlingly universal poems; biography doesn\'t bound imagination.', reveals: 'isolation-means-narrowness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'You can now read the strangest punctuation in English poetry as deliberate music — and defend private genius against the myth of the madwoman.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_013', difficulty: 'standard',
          question: 'Critical thinking on \'Trees\' — analysing the text to reach evidence-based.',
          hint: 'If stuck, revisit node c12_eng_k_cbse_10_008 (Imagery and Metaphor) and.',
          misconception: 'Students believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "The Sun = God") and then.',
          parts: [
                { id: 'a', prompt: 'In the first poem, the Sun is referred to with capitalized pronouns ("Himself," "His").', answer: 'Capitalization here does not merely signal reverence',
                  options: ['Capitalization here does not merely signal reverence', 'critical analysis', 'The Sun = God', '"critical analysis" means finding *one* hidden symbolic meaning (e'],
                  hint: 'If stuck, revisit node c12_eng_k_cbse_10_008 (Imagery and Metaphor) and c12_eng_k_cbse_10_009.',
                  misconception: 'Students believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "The Sun = God") and then hunting for proof.' },
                { id: 'b', prompt: 'Apply the concept of "defamiliarization" (making the familiar strange) to the image "Bright Flowers slit a Calyx / And soared upon a Stem / Like Hindered Flags.', answer: 'Step 1: Identify the literal process',
                  options: ['Step 1: Identify the literal process', 'critical analysis', 'The Sun = God', '"critical analysis" means finding *one* hidden symbolic meaning (e'],
                  hint: 'If stuck, revisit node c12_eng_k_cbse_10_008 (Imagery and Metaphor) and c12_eng_k_cbse_10_009.',
                  misconception: 'Students believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "The Sun = God") and then hunting for proof.' },
                { id: 'c', prompt: 'Compare the role of sound in both poems. The first poem mentions "a Tune," "Psalteries," "Enamoring the Ear"; the second has "gossiped," "charmed," and the.', answer: 'In Poem 1, sound is *structured* and *musical* ("Psalteries of Summer"',
                  options: ['In Poem 1, sound is *structured* and *musical* ("Psalteries of Summer"', 'critical analysis', 'The Sun = God', '"critical analysis" means finding *one* hidden symbolic meaning (e'],
                  hint: 'If stuck, revisit node c12_eng_k_cbse_10_008 (Imagery and Metaphor) and c12_eng_k_cbse_10_009.',
                  misconception: 'Students believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "The Sun = God") and then hunting for proof.' }
          ],
            remediations: { 'critical-analysis-means-finding-one': { steps: ['If a student reduces analysis to symbol-decoding: (1) Have them re-read the first poem *without* naming any "symbols".', '(2) Ask: "What happens to the poem\'s feeling if the Sun is *not* a god but a moody neighbor?" (3) Assign a micro-task.', '(4) Re-attempt Diagnostic Question 2 with this lens.', 'This shifts focus from *what things stand for* to *how language behaves*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "The Sun = God") and then.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Dickinson\'s dashes are merely a stylistic quirk; removing them would not change the poems\' meaning." Defend your judgment with evidence.', answer: 'The claim is false',
                  options: ['The claim is false', 'critical analysis', 'The Sun = God', '"critical analysis" means finding *one* hidden symbolic meaning (e'],
                  hint: 'If stuck, revisit node c12_eng_k_cbse_10_008 (Imagery and Metaphor) and c12_eng_k_cbse_10_009.',
                  misconception: 'Students believe "critical analysis" means finding *one* hidden symbolic meaning (e.g., "The Sun = God") and then hunting for proof.' }
          ],
            remediations: { 'critical-analysis-means-finding-one': { steps: ['If a student reduces analysis to symbol-decoding: (1) Have them re-read the first poem *without* naming any "symbols".', '(2) Ask: "What happens to the poem\'s feeling if the Sun is *not* a god but a moody neighbor?" (3) Assign a micro-task.', '(4) Re-attempt Diagnostic Question 2 with this lens.', 'This shifts focus from *what things stand for* to *how language behaves*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_014', difficulty: 'standard',
          question: 'Writing skills from \'Trees\' — using the text as a model or springboard for your.',
          hint: 'If unable to write a Point sentence, revisit c12_eng_k_cbse_10_006 (Theme) and.',
          misconception: 'Students believe "embedding quotes" means inserting a full line like: "The Trees like Tassels hit – and – swung – There.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs for poetry?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Line', 'embedding quotes', 'The Trees like Tassels hit – and – swung – There seemed to rise a Tune'],
                  hint: 'If unable to write a Point sentence, revisit c12_eng_k_cbse_10_006 (Theme) and.',
                  misconception: 'Students believe "embedding quotes" means inserting a full line like: "The Trees like Tassels hit – and – swung – There seemed to rise.' },
                { id: 'b', prompt: 'Compare these two answers to "Discuss the significance of capitalised pronouns for the Sun (Himself, His, Him)." Answer A: "The Sun is called Himself and His.', answer: 'Answer B is superior',
                  options: ['Answer B is superior', 'embedding quotes', 'The Trees like Tassels hit – and – swung – There seemed to rise a Tune'],
                  hint: 'If unable to write a Point sentence, revisit c12_eng_k_cbse_10_006 (Theme) and.',
                  misconception: 'Students believe "embedding quotes" means inserting a full line like: "The Trees like Tassels hit – and – swung – There seemed to rise.' }
          ],
            remediations: { 'embedding-quotes-means-inserting-a': { steps: ['Give the student three model PEEL paragraphs on the same poem (from c12_eng_k_cbse_10_013 Critical Thinking node).', 'Ask them to highlight Point, Evidence, Explanation, Link in four colours.', 'Have them rewrite one paragraph replacing full-line quotes with 3-5 word embedded phrases.', 'Assign a 3-mark question: "Analyse the metaphor \'Far Psalteries of Summer\'." Require them to submit a coloured PEEL.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_10_015', difficulty: 'standard',
          question: 'Discussion points on \'Trees\' — speaking and listening around the text.',
          hint: 'If stuck, revisit c12_eng_k_cbse_10_013 (Critical Thinking) to practice breaking down.',
          misconception: 'Students believe a literary discussion is a round-robin where each person answers a question once, and the "best".',
          parts: [
                { id: 'a', prompt: 'Two peers offer different interpretations of "Hindered Flags — Sweet hoisted — With Spices — in the Hem": Peer A says it describes flowers struggling to bloom.', answer: 'Peer B\'s reading is stronger',
                  options: ['Peer B\'s reading is stronger', 'equally valid'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_10_013 (Critical Thinking) to practice breaking down each question.',
                  misconception: 'Students believe a literary discussion is a round-robin where each person answers a question once, and the "best" answer wins.' }
          ],
            remediations: { 'a-literary-discussion-is-a': { steps: ['If a student treats discussion as solo answering: (1) Assign them the "Listener" role for 5 minutes — they must only.', '(2) Provide sentence stems: "I agree with ____ because ____", "That changes my view on ____ because ____".', '(3) Have them re-watch a 3-minute clip of a model literary discussion (e.g., from NCERT\'s audio resources) and note.', '(4) Re-attempt a 10-minute discussion on Question 4 with the teacher tracking "peer references" — aim for at least 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
