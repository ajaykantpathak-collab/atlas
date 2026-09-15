import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch05_p3: SimDef = {
    id: 'v3_c12_hin_a_ch05_p3',
    title: 'efyd eqgEen tk;lh · Part 3/3',
    subtitle: 'When the wheel stops, a whole culture stops',
    classLevel: 12, subject: 'hin_a', topic: 'efyd eqgEen tk;lh · Part 3/3',
    chapters: ['c12_hin_a_ch05'],
    nodeIds: ['c12_hin_a_cbse_05_013', 'c12_hin_a_cbse_05_014', 'c12_hin_a_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social-realist poetry reader', intro: 'A journalist-poet sets down his notebook and picks up the potter\'s vocabulary instead.', goal: 'Read the potter poems through Jagdish Lalak\'s journalistic eye — dialect as realism, craft as vanishing culture.' },
    discovery: {
        question: 'A journalist-poet writes about a Haryana potter in the potter\'s own dialect — \'fiQjdh\', \'uanu\' and all. Why not translate him into polished Hindi?',
        options: ['Dialect is realism and empathy — the village must sound like itself; polishing it would break the very world the poem honours', 'Dialect is just flavour', 'He lacked vocabulary', 'To test the reader'],
        answer: 'Dialect is realism and empathy — the village must sound like itself; polishing it would break the very world the poem honours',
        hook: 'The potter and his wheel are one system — body, skill and cyclical tradition; when the wheel stops, a culture stops. Journalism taught Lalak the colloquial register that reaches beyond Haryana — local speech, universal hearing.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the process of examining a literary text (here, the poems "olar vk;k" and "rksM+ks") by breaking it into its constituent elements — imagery.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Listen at the potter\'s wheel: weigh dialect as documentary fidelity, read man and wheel as a single craft, and feel what\'s lost when such poems stop being written.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are asked in the board exam: "How does the poet use the image of the \'cracked earth\' to convey the farmer\'s despair in \'olar vk;k\'?" Most students.',
            decisions: [{ prompt: 'Define \'imagery\' in poetry and give one example from the poem "olar vk;k" without quoting the entire line.', options: [
                { text: 'Imagery is the use of descriptive language that appeals to the senses (sight, sound,', outcome: 'Imagery is the use of descriptive language that appeals to the senses (sight, sound, touch, taste.' },
                { text: 'imagery is a picture', outcome: 'Not quite — Students believe \'critical analysis\' means listing every literary device they can spot (metaphor.', reveals: 'critical-analysis-means-listing-every' },
                { text: 'the poem shows the pain of farmers', outcome: 'Not quite — Students believe \'critical analysis\' means listing every literary device they can spot (metaphor.', reveals: 'critical-analysis-means-listing-every' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall, staring at a 6-mark question: "Critically appreciate the poem \'olar vk;k\' with reference to the portrayal of old age." Your.',
            decisions: [{ prompt: 'What is the first step you should take when a board exam question asks you to "critically appreciate" a poem from this chapter?', options: [
                { text: 'The first step is to deconstruct the question by underlining command words ("critically', outcome: 'The first step is to deconstruct the question by underlining command words ("critically.' },
                { text: 'read the poem again', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means memorizing 2-3 model answers for.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe that "writing skills based on the chapter" means memorizing 2-3 model answers for.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a documentary assignment on the old woman who has carried loads at the mandi for fifty years, your partner wants to end on a sponsor\'s donation — \'give it a clean resolution so it doesn\'t feel unfinished.\'',
            decisions: [{ prompt: 'What does the ending of Nagarjun\'s poem about the old woman suggest?', options: [
                { text: 'End with the question, not the fix — the poem closes by turning from her story to a direct question at the reader, making society\'s neglect the unresolved fact; a sponsor\'s cheque would manufacture closure the reality hasn\'t earned.', outcome: 'The chapter calls this the modernist open resolution: the story hands responsibility to the audience instead of discharging it — your film should do the same.' },
                { text: 'Use the donation ending — leaving a documentary unresolved is weak storytelling.', outcome: 'That reads closure as craft; the poem shows the unanswered ending is the stronger structure because the neglect is real and continuing — a neat fix would lie.', reveals: 'endings-must-resolve' },
                { text: 'End on her statistics — years worked, loads carried — so the film closes with evidence, not sentiment.', outcome: 'Numbers summarise her but don\'t turn the gaze; the poem\'s final move is a question that conscripts the viewer — data can\'t perform that transfer of responsibility.', reveals: 'data-is-the-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You can now hear dialect as the poem\'s conscience — a vanishing world recorded in its own accent.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the process of examining.',
          hint: 'If stuck, return to c12_hin_a_cbse_05_008 (Imagery and Metaphor) and.',
          misconception: 'Students believe \'critical analysis\' means listing every literary device they can spot (metaphor, alliteration, irony).',
          parts: [
                { id: 'a', prompt: 'In "olar vk;k", the line "vkSj ;g oSQysaMj ls ekywe Fkk" (and this news came from the newspaper) appears after a stanza of vivid rural decay.', answer: 'Step 1: Identify the two elements juxtaposed',
                  options: ['Step 1: Identify the two elements juxtaposed', 'it shows contrast', 'the poem shows the pain of farmers'],
                  hint: 'If stuck, return to c12_hin_a_cbse_05_008 (Imagery and Metaphor) and c12_hin_a_cbse_05_009 (Irony.',
                  misconception: 'Students believe \'critical analysis\' means listing every literary device they can spot (metaphor, alliteration, irony) and then writing.' },
                { id: 'b', prompt: 'Compare the use of the \'tree\' image in both poems: in "olar vk;k" it is "xje ikuh" (the shade tree) and in "rksM+ks" it is "Ålj catj" (the green tree).', answer: 'In "olar vk;k", "xje ikuh" (the shade tree) is a memory of relief',
                  options: ['In "olar vk;k", "xje ikuh" (the shade tree) is a memory of relief', 'both poems use trees', 'the poem shows the pain of farmers'],
                  hint: 'If stuck, return to c12_hin_a_cbse_05_008 (Imagery and Metaphor) and c12_hin_a_cbse_05_009 (Irony.',
                  misconception: 'Students believe \'critical analysis\' means listing every literary device they can spot (metaphor, alliteration, irony) and then writing.' }
          ],
            remediations: { 'critical-analysis-means-listing-every': { steps: ['Take the student\'s last written answer and highlight every device they named.', 'For each device, ask: "What does this device *do* in this exact line?" — force them to write the effect in one sentence.', 'Then ask: "How does that effect change the reader\'s understanding of the farmer / the tree / the drought?" — write the.', 'Finally, have them rewrite the paragraph using only those device-effect-theme chains.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe \'critical analysis\' means listing every literary device they can spot (metaphor, alliteration, irony).',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The poet\'s use of colloquial dialect (e.g., \'pqjeqjk\', \'fiQjdh\', \'ngj&ngj\') makes the poems authentic but limits their universal appeal.".', answer: 'Refute',
                  options: ['Refute', 'the poem shows the pain of farmers'],
                  hint: 'If stuck, return to c12_hin_a_cbse_05_008 (Imagery and Metaphor) and c12_hin_a_cbse_05_009 (Irony.',
                  misconception: 'Students believe \'critical analysis\' means listing every literary device they can spot (metaphor, alliteration, irony) and then writing.' }
          ],
            remediations: { 'critical-analysis-means-listing-every': { steps: ['Take the student\'s last written answer and highlight every device they named.', 'For each device, ask: "What does this device *do* in this exact line?" — force them to write the effect in one sentence.', 'Then ask: "How does that effect change the reader\'s understanding of the farmer / the tree / the drought?" — write the.', 'Finally, have them rewrite the paragraph using only those device-effect-theme chains.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter refers to the ability to compose.',
          hint: 'If stuck, revisit **c12_hin_a_cbse_05_013 (Critical Thinking)** for interpretation.',
          misconception: 'Students believe that "writing skills based on the chapter" means memorizing 2-3 model answers for likely questions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing Skills based on the chapter refers to the ability to compose structured,',
                  options: ['Writing Skills based on the chapter refers to the ability to compose structured,', 'Context and background in literature refers to the biographical, historical, cultural,', 'Plot and narrative structure in poetry refers to the sequence of events, the progression', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, revisit **c12_hin_a_cbse_05_013 (Critical Thinking)** for interpretation practice and.',
                  misconception: 'Students believe that "writing skills based on the chapter" means memorizing 2-3 model answers for likely questions.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['**Diagnose the gap:** Ask the student to attempt a fresh 6-mark question *without notes* in 10 minutes.', '**Mark against PEEL rubric:** Highlight each sentence as P, E, E, or L.', 'Count how many paragraphs have all four.', '**Targeted remediation:** - If missing **Point**: Practice writing one-sentence thesis statements for 5 past paper.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to structured oral activities.',
          hint: 'If stuck, revisit the critical thinking node (c12_hin_a_cbse_05_013) and re-annotate the.',
          misconception: 'Students often believe a discussion is successful if everyone speaks, regardless of whether they refer to the text.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to structured oral activities where',
                  options: ['Speaking and Listening: Discussion Points refers to structured oral activities where', 'Context and background in literature refers to the biographical, historical, cultural,', 'Plot and narrative structure in poetry refers to the sequence of events, the progression', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, revisit the critical thinking node (c12_hin_a_cbse_05_013) and re-annotate the poems.',
                  misconception: 'Students often believe a discussion is successful if everyone speaks, regardless of whether they refer to the text.' }
          ],
            remediations: { 'a-discussion-is-successful-if': { steps: ['Ask the student to re-read both poems with a highlighter, marking only lines that directly relate to aging, memory,.', 'Have them write three "evidence-claim" pairs (line + what it proves) for each poem.', 'Pair them with a peer for a 5-minute timed discussion using only those pairs as prompts.', 'Afterward, debrief: which evidence was strongest?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
