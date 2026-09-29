import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch11_p3: SimDef = {
    id: 'v3_c11_eng_h_ch11_p3',
    title: 'Childhood (Poem) · Part 3/3',
    subtitle: 'Track a lyric that argues, not narrates — and watch its question mutate at the end.',
    classLevel: 11, subject: 'eng_h', topic: 'Childhood (Poem) · Part 3/3',
    chapters: ['c11_eng_h_ch11'],
    nodeIds: ['c11_eng_h_cbse_11_013', 'c11_eng_h_cbse_11_014', 'c11_eng_h_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a detective of one\'s own lost innocence', intro: 'No plot, no characters — just a man interrogating himself about the exact moment he stopped being a child.', goal: 'Read the poem as a cumulative philosophical argument and analyse the when-to-where pivot.' },
    discovery: {
        question: 'For three stanzas the speaker asks \'when did my childhood go?\' — then the question changes. To what, and why does it matter?',
        options: ['To \'where\' — childhood isn\'t a lost moment in time but a relocated place, \'hidden in an infant\'s face\'', 'To \'why\' — he finally demands the cause of growing up', 'To \'how\' — he wants the mechanism of maturity', 'It doesn\'t — the same question repeats to the end'],
        answer: 'To \'where\' — childhood isn\'t a lost moment in time but a relocated place, \'hidden in an infant\'s face\'',
        hook: 'Each stanza offers a different \'when\' — adult hypocrisy, independent thought, a mind of one\'s own — then the pivot rejects \'when\' altogether.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Childhood\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_11_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Line up the poem\'s three candidate answers for when childhood ends, then evaluate whether the infant\'s face resolves the quest or deepens its irony.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Childhood\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'Identify the refrain in "Childhood" and state its literal meaning in the poem.', options: [
                { text: 'The refrain is "When did my childhood go?" repeated at the start of stanzas 1, 2, and 3', outcome: 'The refrain is "When did my childhood go?" repeated at the start of stanzas 1, 2, and 3.' },
                { text: 'Was it the day I ceased to be eleven', outcome: 'Not quite — Students believe the poem\'s three stanzas offer three *alternative* answers to "when," and they.', reveals: 'the-poem-s-three-stanzas' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Childhood\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the PEEL structure for writing an analytical paragraph, and what does each letter stand for in the context of literature answer.', options: [
                { text: 'PEEL stands for Point (topic sentence stating the argument), Evidence (textual quote or', outcome: 'PEEL stands for Point (topic sentence stating the argument), Evidence (textual quote or reference).' },
                { text: 'Point, Example, Explain, Leave', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing the poem or retelling its.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing the poem or retelling its.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Childhood\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary structural feature of the poem "Childhood" that organizes the poet\'s inquiry into the loss of innocence?', options: [
                { text: 'The poem uses a refrain ("When did my childhood go?") repeated in the first three', outcome: 'The poem uses a refrain ("When did my childhood go?") repeated in the first three stanzas, each.' },
                { text: 'It has four stanzas of equal length', outcome: 'Not quite — Students believe a "good discussion" means speaking the most or sharing relatable personal stories.', reveals: 'a-good-discussion-means-speaking' },
                { text: 'good discussion', outcome: 'Not quite — Students believe a "good discussion" means speaking the most or sharing relatable personal stories.', reveals: 'a-good-discussion-means-speaking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For open-mic night a student adapts the poem \'Childhood\' into a skit: actors play young Markus, his parents, a teacher — dramatising \'the day he stopped believing in heaven\'. The mentor asks: \'Where in the poem is this scene actually narrated?\'',
            decisions: [{ prompt: 'Why does the skit\'s premise misread the poem?', options: [
                { text: '\'Childhood\' is a philosophical lyric, not a narrative: it argues that childhood ends not on a date or event but when the mind gains independent, critical thought — seeing through adults\' hypocrisy, questioning where heaven is, thinking thoughts that are one\'s own. There are no characters, setting or plot to dramatise; the \'when\' is a cognitive threshold.', outcome: 'Reading a lyric argument as a memory-story manufactures scenes the poem deliberately refuses — its refrain is a question about ideas, not an anecdote.' },
                { text: 'The skit works — every poem is a story, so picking one memory as the \'moment\' is fine.', outcome: 'That treats the poem as autobiography; the poem\'s point is that no single event ends childhood — three different \'whens\' are proposed and the answer is a state of mind.', reveals: 'lyric-is-narrative' },
                { text: 'Childhood ends at puberty — the poem is about biological growth, so stage it as a birthday scene.', outcome: 'The poem explicitly locates the end in intellectual awakening — independent perception and thought — not in any birthday or bodily milestone.', reveals: 'childhood-ends-at-puberty' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'Childhood doesn\'t die — it emigrates. The speaker can see it in an infant\'s face but never move back in.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_013', difficulty: 'standard',
          question: 'Critical thinking on \'Childhood\' — analysing the text to reach evidence-based.',
          hint: 'Review c11_eng_h_cbse_11_002 (narrative structure) to remap the poem\'s three accusations.',
          misconception: 'Students believe the poem\'s three stanzas offer three *alternative* answers to "when," and they must pick the "correct".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'Childhood\'',
                  options: ['Critical thinking on \'Childhood\'', '\'Childhood\' (Hornbill, ch', 'The plot/narrative arc of \'Childhood\'', 'The setting of \'Childhood\''],
                  hint: 'Review c11_eng_h_cbse_11_002 (narrative structure) to remap the poem\'s three accusations as.',
                  misconception: 'Students believe the poem\'s three stanzas offer three *alternative* answers to "when," and they must pick the "correct" one.' }
          ],
            remediations: { 'the-poem-s-three-stanzas': { steps: ['Have the student physically arrange three index cards labeled "Social," "Intellectual," "Spiritual" and match each.', 'Ask: "If stanza 1 never happened, would stanza 3 still make sense?" to force recognition of interdependence.', 'Model a "layered thesis" sentence: "Natten portrays maturation as a three-stage erosion: first trust in others (stanza.', 'Practice writing a single paragraph integrating all three stanzas using transition phrases like "This external.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_014', difficulty: 'standard',
          question: 'Writing skills from \'Childhood\' — using the text as a model or springboard for.',
          hint: 'Review node 008 (Imagery/Metaphor) and 009 (Irony/Symbolism) for evidence; review node.',
          misconception: 'Students believe "writing skills based on the chapter" means summarizing the poem or retelling its story.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing skills from \'Childhood\'',
                  options: ['Writing skills from \'Childhood\'', '\'Childhood\' (Hornbill, ch', 'The plot/narrative arc of \'Childhood\'', 'The setting of \'Childhood\''],
                  hint: 'Review node 008 (Imagery/Metaphor) and 009 (Irony/Symbolism) for evidence; review node 013 for.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the poem or retelling its story.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a summary instead of analysis: (1) Highlight every sentence that merely retells the poem in yellow.', '(2) Ask: "Does this sentence make a claim about *how* the poem works, or just *what* happens?" (3) Have them rewrite.', '(4) Practice with a new prompt: "Write three analytical Points about the refrain—no plot mention allowed." This trains.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means summarizing the poem or retelling its story.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s claim: "The poem \'Childhood\' is only about growing up; it has no social commentary." Defend or refute using textual evidence.', answer: 'Refute',
                  options: ['Refute', 'personal experience', 'universal theme devoid of social critique', 'writing skills based on the chapter'],
                  hint: 'Review node 008 (Imagery/Metaphor) and 009 (Irony/Symbolism) for evidence; review node 013 for.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the poem or retelling its story.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a summary instead of analysis: (1) Highlight every sentence that merely retells the poem in yellow.', '(2) Ask: "Does this sentence make a claim about *how* the poem works, or just *what* happens?" (3) Have them rewrite.', '(4) Practice with a new prompt: "Write three analytical Points about the refrain—no plot mention allowed." This trains.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_015', difficulty: 'standard',
          question: 'Discussion points on \'Childhood\' — speaking and listening around the text.',
          hint: 'If stuck, review the "Critical Thinking: Analysis and Interpretation" node.',
          misconception: 'Students believe a "good discussion" means speaking the most or sharing relatable personal stories.',
          parts: [
                { id: 'a', prompt: 'Compare how "Childhood" and the Class 10 poem "The Tale of Custard the Dragon" (First Flight) use irony to explore the gap between appearance and reality.', answer: 'Similarity: Both use situational irony',
                  options: ['Similarity: Both use situational irony', 'both are funny', 'good discussion'],
                  hint: 'If stuck, review the "Critical Thinking: Analysis and Interpretation" node (c11_eng_h_cbse_11_013).',
                  misconception: 'Students believe a "good discussion" means speaking the most or sharing relatable personal stories.' }
          ],
            remediations: { 'a-good-discussion-means-speaking': { steps: ['**Model the CER pattern explicitly**: Write a sample contribution on the board: "Claim: Stanza 2 identifies hypocrisy.', 'Evidence: \'They preached of love and acted so differently.\' Reasoning: The enjambment between \'love\' and \'acted\'.', '**Practice with a "fishbowl"**: 4 students discuss while others tally CER usage on a checklist.', '**Assign roles**: Evidence Finder (locates lines), Device Detective (names techniques), Connector (links to theme).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
