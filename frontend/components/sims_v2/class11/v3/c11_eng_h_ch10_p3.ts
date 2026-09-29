import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch10_p3: SimDef = {
    id: 'v3_c11_eng_h_ch10_p3',
    title: 'The Voice of the Rain (Poem) · Part 3/3',
    subtitle: 'Hear a water cycle talk — and notice it is describing poetry itself.',
    classLevel: 11, subject: 'eng_h', topic: 'The Voice of the Rain (Poem) · Part 3/3',
    chapters: ['c11_eng_h_ch10'],
    nodeIds: ['c11_eng_h_cbse_10_013', 'c11_eng_h_cbse_10_014', 'c11_eng_h_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an interviewer granted one question to a shower', intro: 'The poet asks the rain who it is; the rain answers in a perfect circle — rise, transform, descend, begin again.', goal: 'Interpret the rain\'s speech as a metaphor for poetic creation and analyse the dialogue structure.' },
    discovery: {
        question: 'Is \'The Voice of the Rain\' basically a science lesson about the water cycle dressed in personification?',
        options: ['No — the cycle is the vehicle; the real subject is poetry\'s own eternal return, rising from earth and giving back transformed', 'Yes — Whitman wrote it to teach evaporation and condensation', 'No — the rain is merely describing weather, nothing more', 'Yes — the personification is decoration on meteorology'],
        answer: 'No — the cycle is the vehicle; the real subject is poetry\'s own eternal return, rising from earth and giving back transformed',
        hook: '\'I am the Poem of Earth\' — the rain narrates the water cycle so the poet can describe himself: experience rising, changing, returning.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Voice of the Rain\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_10_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map each stanza to its water-cycle stage and speaker, then argue why the poem needs a dialogue, not a monologue.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Voice of the Rain\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the central extended metaphor in "The Voice of the Rain" and which two lines explicitly state it?', options: [
                { text: 'The central extended metaphor is the rain identifying itself as the "Poem of Earth" (line', outcome: 'The central extended metaphor is the rain identifying itself as the "Poem of Earth" (line 1.' },
                { text: 'rain is like water cycle', outcome: 'Not quite — Students treat the poem as a versified water cycle diagram, answering "evaporation, condensation.', reveals: 'students-treat-the-poem-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Voice of the Rain\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What are the four characteristics of a good essay as defined in the NCERT Hornbill textbook, and briefly state what each means?', options: [
                { text: 'The four characteristics are: Unity (essay deals with the main subject, all parts clearly', outcome: 'The four characteristics are: Unity (essay deals with the main subject, all parts clearly linked).' },
                { text: 'introduction, body, conclusion', outcome: 'Not quite — Students believe "writing based on the chapter" means **summarizing the poem** or **listing poetic.', reveals: 'writing-based-on-the-chapter' },
                { text: 'grammar, vocabulary, spelling', outcome: 'Not quite — Students believe "writing based on the chapter" means **summarizing the poem** or **listing poetic.', reveals: 'writing-based-on-the-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Voice of the Rain\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary purpose of a literary discussion on a poem like "The Voice of the Rain" in Class 11?', options: [
                { text: 'The primary purpose is to collaboratively construct a deeper interpretation of the poem', outcome: 'The primary purpose is to collaboratively construct a deeper interpretation of the poem by sharing.' },
                { text: 'to give our opinion', outcome: 'Not quite — Students believe a good discussion means speaking frequently and sharing personal feelings ("I feel.', reveals: 'a-good-discussion-means-speaking' },
                { text: 'I feel the rain is sad', outcome: 'Not quite — Students believe a good discussion means speaking frequently and sharing personal feelings ("I feel.', reveals: 'a-good-discussion-means-speaking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a science-literature exhibition a student labels \'The Voice of the Rain\': \'A cute personification trick — Whitman makes the water cycle talk so kids can learn evaporation and condensation. Basically a science lesson in verse.\'',
            decisions: [{ prompt: 'What does the label get wrong about the poem\'s aim?', options: [
                { text: 'It inverts vehicle and tenor: the water cycle is the vehicle — rising impalpable from earth, transforming, returning to nourish its origin — for the poem\'s real subject: poetry itself. The rain\'s \'song\' is Whitman\'s own creative cycle, making the poem an ars poetica disguised as a nature dialogue.', outcome: 'Personification here isn\'t decoration on a science lesson; the science is the metaphor for how poems are born from life and return to it.' },
                { text: 'The label is fair — its purpose is teaching the water cycle through a talking-rain gimmick.', outcome: 'Whitman isn\'t instructing in meteorology; the poem\'s claim (\'I give back life to my own origin\') is about song nourishing its maker\'s world — art, not water.', reveals: 'poem-is-science-lesson' },
                { text: 'It\'s mainly about the poet\'s ego — rain bragging about itself.', outcome: 'The voice is dignified and cyclic, not boastful: rising, changing, returning — a model of creation completing its circle, not self-praise.', reveals: 'rain-is-just-boasting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'The question \'who art thou?\' makes the rain a mystery to be unveiled — cut it, and the eternal voice has no one to answer.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Voice of the Rain\' — analysing the text to reach.',
          hint: 'Review the annotation of "I am the Poem of Earth" and the final couplet in node.',
          misconception: 'Students treat the poem as a versified water cycle diagram, answering "evaporation, condensation, precipitation" when.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'The Voice of the Rain\'',
                  options: ['Critical thinking on \'The Voice of the Rain\'', '\'The Voice of the Rain\' (Hornbill, ch', 'The plot/narrative arc of \'The Voice of the Rain\'', 'The setting of \'The Voice of the Rain\''],
                  hint: 'Review the annotation of "I am the Poem of Earth" and the final couplet in node.',
                  misconception: 'Students treat the poem as a versified water cycle diagram, answering "evaporation, condensation, precipitation" when asked for the rain\'s.' }
          ],
            remediations: { 'students-treat-the-poem-as': { steps: ['Have the student physically draw two parallel columns: left column = rain\'s journey (5 stages from text), right column.', 'Ask: "At which stage does the rain \'change form\'?', 'At which stage does the song \'wander changed in form\'?" 3.', 'Read the final couplet aloud slowly, stressing "For song..." — explain "For" means "because/since," linking the two.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the poem as a versified water cycle diagram, answering "evaporation, condensation, precipitation" when.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The final couplet shifts the poem from a nature poem to an ars poetica (poem about poetry)." Defend your position with evidence from the.', answer: 'The claim is valid',
                  options: ['The claim is valid', 'it\'s still about rain'],
                  hint: 'Review the annotation of "I am the Poem of Earth" and the final couplet in node.',
                  misconception: 'Students treat the poem as a versified water cycle diagram, answering "evaporation, condensation, precipitation" when asked for the rain\'s.' }
          ],
            remediations: { 'students-treat-the-poem-as': { steps: ['Have the student physically draw two parallel columns: left column = rain\'s journey (5 stages from text), right column.', 'Ask: "At which stage does the rain \'change form\'?', 'At which stage does the song \'wander changed in form\'?" 3.', 'Read the final couplet aloud slowly, stressing "For song..." — explain "For" means "because/since," linking the two.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_014', difficulty: 'standard',
          question: 'Writing skills from \'The Voice of the Rain\' — using the text as a model.',
          hint: 'If stuck, review c11_eng_h_cbse_10_006 (Primary Theme) and c11_eng_h_cbse_10_008 (Imagery.',
          misconception: 'Students believe "writing based on the chapter" means **summarizing the poem** or **listing poetic devices**.',
          parts: [
                { id: 'a', prompt: 'Using the brainstorming technique shown in the textbook (central circle with radiating ideas), create a mind-map for the essay topic: **"The Parallel Between.', answer: 'Valid radiating ideas (any 6): 1) "I am the Poem of Earth"',
                  options: ['Valid radiating ideas (any 6): 1) "I am the Poem of Earth"', 'writing based on the chapter'],
                  hint: 'If stuck, review c11_eng_h_cbse_10_006 (Primary Theme) and c11_eng_h_cbse_10_008 (Imagery and.',
                  misconception: 'Students believe "writing based on the chapter" means **summarizing the poem** or **listing poetic devices** in paragraph form.' },
                { id: 'b', prompt: 'Analyze this draft introduction for an essay on "The Voice of the Rain": "In this essay I will talk about the poem The Voice of the Rain by Walt Whitman.', answer: 'Weaknesses: 1) **Meta-commentary** ("In this essay I will talk about...") wastes',
                  options: ['Weaknesses: 1) **Meta-commentary** ("In this essay I will talk about...") wastes', 'writing based on the chapter'],
                  hint: 'If stuck, review c11_eng_h_cbse_10_006 (Primary Theme) and c11_eng_h_cbse_10_008 (Imagery and.',
                  misconception: 'Students believe "writing based on the chapter" means **summarizing the poem** or **listing poetic devices** in paragraph form.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['**Show the difference**: Place a 100-word *summary* and a 100-word *analytical paragraph* on the same theme.', 'Ask: "Which one *uses* the poem to make a point?', 'Which one just *tells* the poem?" 2.', '**Force generative brainstorming**: Set a 5-minute timer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_10_015', difficulty: 'standard',
          question: 'Discussion points on \'The Voice of the Rain\' — speaking and listening around.',
          hint: 'Revisit c11_eng_h_cbse_10_013 (Critical Thinking) to practice evidence-based.',
          misconception: 'Students believe a good discussion means speaking frequently and sharing personal feelings ("I feel the rain is sad").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'The Voice of the Rain\'',
                  options: ['Discussion points on \'The Voice of the Rain\'', '\'The Voice of the Rain\' (Hornbill, ch', 'The plot/narrative arc of \'The Voice of the Rain\'', 'The setting of \'The Voice of the Rain\''],
                  hint: 'Revisit c11_eng_h_cbse_10_013 (Critical Thinking) to practice evidence-based interpretation, and.',
                  misconception: 'Students believe a good discussion means speaking frequently and sharing personal feelings ("I feel the rain is sad").' }
          ],
            remediations: { 'a-good-discussion-means-speaking': { steps: ['Model the "Evidence Sandwich": Claim → Quote/Reference → Explanation.', 'Practice with a simple claim ("The rain is eternal") → find the line ("eternal I rise") → explain how "eternal" placed.', 'Give the student a "Discussion Sentence Starter" card: "In line X, the word \'Y\' suggests..." / "This connects to the.', 'Run a 3-minute "fishbowl" where the student observes a model discussion using these stems, then immediately tries one.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
