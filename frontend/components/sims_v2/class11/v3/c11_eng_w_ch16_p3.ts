import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch16_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch16_p3: SimDef = {
    id: 'v3_c11_eng_w_ch16_p3',
    title: 'For Elkana (Poem) · Part 3/3',
    subtitle: 'Read a family evening where the silences are part of the plot.',
    classLevel: 11, subject: 'eng_w', topic: 'For Elkana (Poem) · Part 3/3',
    chapters: ['c11_eng_w_ch16'],
    nodeIds: ['c11_eng_w_cbse_16_013', 'c11_eng_w_cbse_16_014', 'c11_eng_w_cbse_16_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a quiet observer on a lawn at dusk', intro: 'Chairs dragged onto a lawn, a wife\'s grievance, a son\'s demand for dinner — ordinary speech doing the work of poetry.', goal: 'Read understatement and ellipsis as narrative tools in a domestic poem.' },
    discovery: {
        question: 'The title says \'For Elkana\' — a biblical patriarch, or someone closer to home?',
        options: ['Ezekiel\'s own son — the dedication signals a personal, domestic scene, not scripture', 'Elkanah, father of Samuel — expect a religious poem', 'A pseudonym the poet used for himself', 'A character from a Marathi folk tale'],
        answer: 'Ezekiel\'s own son — the dedication signals a personal, domestic scene, not scripture',
        hook: 'Ezekiel\'s surname invites the biblical guess; the poem is actually an April evening, a wife\'s complaint, and a small boy changing the weather of a marriage.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'For Elkana\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_16_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark where each stanza shifts the \'camera\' across a family evening, then decide if \'We rise and go into the house\' closes the story or just pauses a ritual.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'For Elkana\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the significance of the capitalisation in the line "Children Must be Disciplined" in the poem "For Elkana"?', options: [
                { text: 'The capitalisation transforms the phrase into a mock-commandment or universal law,', outcome: 'The capitalisation transforms the phrase into a mock-commandment or universal law, highlighting the.' },
                { text: 'it\'s just for emphasis', outcome: 'Not quite — Students often treat "For Elkana" as a simple, light-hearted family snapshot and miss its satirical.', reveals: 'students-often-treat-for-elkana' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'For Elkana\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for poetry?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Leave', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means summarising the poem or writing.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means summarising the poem or writing.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'For Elkana\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary purpose of a literary discussion on a poem like "For Elkana" in a Class 11 speaking and listening assessment?', options: [
                { text: 'The primary purpose is to collaboratively construct meaning by sharing interpretations,', outcome: 'The primary purpose is to collaboratively construct meaning by sharing interpretations, supporting.' },
                { text: 'to show the teacher I know the right answers', outcome: 'Not quite — Students often believe a literary discussion means taking turns giving "right answers" to the.', reveals: 'a-literary-discussion-means-taking' },
                { text: 'right answers', outcome: 'Not quite — Students often believe a literary discussion means taking turns giving "right answers" to the.', reveals: 'a-literary-discussion-means-taking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your study group is annotating Ezekiel\'s \'For Elkana\'. One member insists Elkana must be Elkanah, the biblical father of Samuel, so the poem \'must be religious.\' Another says \'nothing happens — it\'s just people at dinner.\'',
            decisions: [{ prompt: 'How do you correct both readings at once?', options: [
                { text: 'Show that Elkana is Ezekiel\'s own son — the dedication signals a personal, autobiographical scene of Indian middle-class family life on an April evening. And plenty happens: Ezekiel compresses a short-story arc into the stanzas — the wife\'s complaint, the husband\'s retreat into thought, the son\'s logical performance shifting the dynamic — using understatement and gaps the reader fills.', outcome: 'Both fixes come from the same skill: treating context and stanza structure as interpretive lenses, not trivia — domestic bickering becomes art.' },
                { text: 'Go with the biblical reading — Ezekiel\'s name is biblical and Indian English poetry often uses mythology.', outcome: 'The poet\'s own notes name his son; overgeneralising from the surname and other syllabus poems produces a religious poem that isn\'t on the page.', reveals: 'elkana-is-biblical' },
                { text: 'Agree nothing happens — it\'s a static slice of domestic description.', outcome: 'The narrative runs on mental events and ellipsis: the wife\'s unspoken \'Children Must be Disciplined\', the husband\'s internal monologue, the son\'s speech — the plot is in the structure, not visible action.', reveals: 'domestic-poem-has-no-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_16_015', title: 'You made it',
          caseStudy: { intro: 'The couple came down the stone steps; they rise and go back in — the quarrel was never an event, it\'s the evening itself.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_013', difficulty: 'standard',
          question: 'Critical thinking on \'For Elkana\' — analysing the text to reach evidence-based.',
          hint: 'Review c11_eng_w_cbse_16_009 (Irony and Symbolism) and c11_eng_w_cbse_16_012.',
          misconception: 'Students often treat "For Elkana" as a simple, light-hearted family snapshot and miss its satirical edge — they read.',
          parts: [
                { id: 'a', prompt: 'Explain how the poet uses understatement in the line "My wife\'s delightful laughter / holds the three of us together" to convey the resolution of the conflict.', answer: 'The understatement minimises the dramatic resolution',
                  options: ['The understatement minimises the dramatic resolution', 'happy ending'],
                  hint: 'Review c11_eng_w_cbse_16_009 (Irony and Symbolism) and c11_eng_w_cbse_16_012 (Comprehension) for.',
                  misconception: 'Students often treat "For Elkana" as a simple, light-hearted family snapshot and miss its satirical edge — they read the father\'s.' }
          ],
            remediations: { 'students-often-treat-for-elkana': { steps: ['If a student reads the poem literally: (1) Have them re-read the "unusual rapport" moment and ask: "Who actually wins.', '(3) Ask: "Is the \'delightful laughter\' genuine joy or relief at restored peace at any cost?" (4) Connect to Ezekiel\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_014', difficulty: 'standard',
          question: 'Writing skills from \'For Elkana\' — using the text as a model or springboard for.',
          hint: 'Review the PEEL method from c8_engl_ch1_17 and practice with a simpler poem (e.g., "The.',
          misconception: 'Students believe that "writing skills based on the chapter" means summarising the poem or writing a character sketch.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for poetry?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Leave', 'writing skills based on the chapter'],
                  hint: 'Review the PEEL method from c8_engl_ch1_17 and practice with a simpler poem (e.g., "The Cherry.',
                  misconception: 'Students believe that "writing skills based on the chapter" means summarising the poem or writing a character sketch in isolation.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['Return to node c11_eng_w_cbse_16_008 (Imagery and Metaphor) and c11_eng_w_cbse_16_009 (Irony and Symbolism); annotate.', 'Take one "Understanding the Poem" question and rewrite a model answer from the textbook\'s suggested reading using PEEL.', 'Practice writing one PEEL paragraph daily for a different question, getting feedback on whether the Evidence is.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "writing skills based on the chapter" means summarising the poem or writing a character sketch.',
          parts: [
                { id: 'a', prompt: 'Write a 4-line limerick (aabba rhyme scheme) that captures the central irony of "For Elkana" — the child\'s logical demand disrupting parental authority.', answer: 'A couple sat out on the lawn, (a) Where marital tensions were drawn',
                  options: ['A couple sat out on the lawn, (a) Where marital tensions were drawn', 'writing skills based on the chapter'],
                  hint: 'Review the PEEL method from c8_engl_ch1_17 and practice with a simpler poem (e.g., "The Cherry.',
                  misconception: 'Students believe that "writing skills based on the chapter" means summarising the poem or writing a character sketch in isolation.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['Return to node c11_eng_w_cbse_16_008 (Imagery and Metaphor) and c11_eng_w_cbse_16_009 (Irony and Symbolism); annotate.', 'Take one "Understanding the Poem" question and rewrite a model answer from the textbook\'s suggested reading using PEEL.', 'Practice writing one PEEL paragraph daily for a different question, getting feedback on whether the Evidence is.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_16_015', difficulty: 'standard',
          question: 'Discussion points on \'For Elkana\' — speaking and listening around the text.',
          hint: 'If stuck, review c11_eng_w_cbse_16_012 (Comprehension) and c11_eng_w_cbse_16_013.',
          misconception: 'Students often believe a literary discussion means taking turns giving "right answers" to the teacher\'s questions,.',
          parts: [
                { id: 'a', prompt: 'A student says, "The poem is just about a family arguing over dinner." How does this statement show a lack of understanding of the poem\'s subtlety, and what.', answer: 'The statement reduces the poem\'s layered portrayal of family communication',
                  options: ['The statement reduces the poem\'s layered portrayal of family communication', 'right answers'],
                  hint: 'If stuck, review c11_eng_w_cbse_16_012 (Comprehension) and c11_eng_w_cbse_16_013 (Critical.',
                  misconception: 'Students often believe a literary discussion means taking turns giving "right answers" to the teacher\'s questions, so they prepare.' },
                { id: 'b', prompt: 'During a discussion on Question 2 ("Poetic effect is achieved through understatement and asides"), a peer claims, "The poet doesn\'t use understatement;.', answer: 'Step 1: Define understatement',
                  options: ['Step 1: Define understatement', 'Suggests a thing or two', 'right answers', 'quotes the wife\'s direct speech ("Suggests a thing or two'],
                  hint: 'If stuck, review c11_eng_w_cbse_16_012 (Comprehension) and c11_eng_w_cbse_16_013 (Critical.',
                  misconception: 'Students often believe a literary discussion means taking turns giving "right answers" to the teacher\'s questions, so they prepare.' },
                { id: 'c', prompt: 'Compare the "idyllic" opening ("warm April evening," "breezes sauntering") with the "pedestrian" domestic detail ("broken window-pane," "dinner now").', answer: 'The poem opens with a pastoral, almost romantic scene',
                  options: ['The poem opens with a pastoral, almost romantic scene', 'right answers', 'merely lists pretty vs'],
                  hint: 'If stuck, review c11_eng_w_cbse_16_012 (Comprehension) and c11_eng_w_cbse_16_013 (Critical.',
                  misconception: 'Students often believe a literary discussion means taking turns giving "right answers" to the teacher\'s questions, so they prepare.' }
          ],
            remediations: { 'a-literary-discussion-means-taking': { steps: ['If a student reverts to reciting memorized points: 1) Pause the discussion and ask, "What line in the poem made you.', '2) Model a tentative contribution: "I\'m not sure, but the phrase \'unusual rapport\' feels ironic because right after.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
