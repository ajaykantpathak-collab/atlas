import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch05_p1: SimDef = {
    id: 'v3_c12_hin_a_ch05_p1',
    title: 'efyd eqgEen tk;lh · Part 1/3',
    subtitle: 'When the wheel stops, a whole culture stops',
    classLevel: 12, subject: 'hin_a', topic: 'efyd eqgEen tk;lh · Part 1/3',
    chapters: ['c12_hin_a_ch05'],
    nodeIds: ['c12_hin_a_cbse_05_001', 'c12_hin_a_cbse_05_002', 'c12_hin_a_cbse_05_003', 'c12_hin_a_cbse_05_004', 'c12_hin_a_cbse_05_005', 'c12_hin_a_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social-realist poetry reader', intro: 'A journalist-poet sets down his notebook and picks up the potter\'s vocabulary instead.', goal: 'Read the potter poems through Jagdish Lalak\'s journalistic eye — dialect as realism, craft as vanishing culture.' },
    discovery: {
        question: 'A journalist-poet writes about a Haryana potter in the potter\'s own dialect — \'fiQjdh\', \'uanu\' and all. Why not translate him into polished Hindi?',
        options: ['Dialect is realism and empathy — the village must sound like itself; polishing it would break the very world the poem honours', 'Dialect is just flavour', 'He lacked vocabulary', 'To test the reader'],
        answer: 'Dialect is realism and empathy — the village must sound like itself; polishing it would break the very world the poem honours',
        hook: 'The potter and his wheel are one system — body, skill and cyclical tradition; when the wheel stops, a culture stops. Journalism taught Lalak the colloquial register that reaches beyond Haryana — local speech, universal hearing.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'Context and background in literature refers to the biographical, historical, cultural, and linguistic circumstances surrounding a writer and their work that shape the themes, language, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Listen at the potter\'s wheel: weigh dialect as documentary fidelity, read man and wheel as a single craft, and feel what\'s lost when such poems stop being written.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a movie set in a village you’ve never visited.',
            decisions: [{ prompt: 'What is the primary profession of Jagdish Lalak apart from being a poet, and how does it shape his poetic language?', options: [
                { text: 'Jagdish Lalak was a journalist and radio editor', outcome: 'Jagdish Lalak was a journalist and radio editor; his professional exposure to everyday speech and.' },
                { text: 'he was a teacher', outcome: 'Not quite — Students often think “context and background” means memorising the poet’s birth/death dates and.', reveals: 'context-and-background-means-memorising' },
                { text: 'context and background', outcome: 'Not quite — Students often think “context and background” means memorising the poet’s birth/death dates and.', reveals: 'context-and-background-means-memorising' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are standing in a vast field at noon — the sun beats down, the air smells of earth and sweat, and you hear the rhythmic thud of a hoe.',
            decisions: [{ prompt: 'What is the primary physical setting of the poem "olar vk;k" and which two sensory details does the poet use to establish it in the first.', options: [
                { text: 'The primary setting is an agricultural field during daytime', outcome: 'The primary setting is an agricultural field during daytime. The poet uses the visual detail.' },
                { text: 'village', outcome: 'Not quite — Students often treat setting as a static list of place and time ("the poem is set in a field.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you meet an elderly neighbor who sits on her porch every evening, watching the world change while she remains a silent witness to time.',
            decisions: [{ prompt: 'Identify the protagonist of the poem "olar vk;k" and state one physical detail the poet uses to establish her age and frailty in the.', options: [
                { text: 'The protagonist is the old woman (olar)', outcome: 'The protagonist is the old woman (olar). A physical detail is "cM+s&cM+s fi;jk, iÙks" (trembling.' },
                { text: 'the poet or the crow as protagonist', outcome: 'Not quite — Students often treat the protagonist as a mere symbol of "old age" or "tradition" and write generic.', reveals: 'students-often-treat-the-protagonist' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are sitting in a garden and hear a bird\'s sudden, perfect song — you didn\'t ask for it, it just happens.',
            decisions: [{ prompt: 'In the poem "ओलार वक;क", who is the \'nk\' (child) and what is their single action in the poem?', options: [
                { text: 'The \'nk\' is the child listener who, upon hearing the oriole\'s song, asks the bird to sing', outcome: 'The \'nk\' is the child listener who, upon hearing the oriole\'s song, asks the bird to sing again.' },
                { text: 'the child is the poet', outcome: 'Not quite — Students treat supporting characters in poetry as \'minor characters in a story\' — they look for.', reveals: 'students-treat-supporting-characters-in' },
                { text: 'the child catches the bird', outcome: 'Not quite — Students treat supporting characters in poetry as \'minor characters in a story\' — they look for.', reveals: 'students-treat-supporting-characters-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are telling a friend about a movie you watched — you don\'t recount every scene; you say, "It\'s about how time catches up with everyone, but.',
            decisions: [{ prompt: 'What is the difference between a *topic* (विषय) and a *theme* (मुख्य भाव/थीम) in poetry? Give one example from "olar vk;k" to illustrate.', options: [
                { text: 'A topic is the surface subject (e.g., "old age" or "an old man walking")', outcome: 'A topic is the surface subject (e.g., "old age" or "an old man walking"); a theme is the poet\'s.' },
                { text: 'old age', outcome: 'Not quite — Students consistently confuse *theme* with *moral* or *summary*.', reveals: 'students-consistently-confuse-theme-with' },
                { text: 'walking', outcome: 'Not quite — Students consistently confuse *theme* with *moral* or *summary*.', reveals: 'students-consistently-confuse-theme-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a documentary assignment on the old woman who has carried loads at the mandi for fifty years, your partner wants to end on a sponsor\'s donation — \'give it a clean resolution so it doesn\'t feel unfinished.\'',
            decisions: [{ prompt: 'What does the ending of Nagarjun\'s poem about the old woman suggest?', options: [
                { text: 'End with the question, not the fix — the poem closes by turning from her story to a direct question at the reader, making society\'s neglect the unresolved fact; a sponsor\'s cheque would manufacture closure the reality hasn\'t earned.', outcome: 'The chapter calls this the modernist open resolution: the story hands responsibility to the audience instead of discharging it — your film should do the same.' },
                { text: 'Use the donation ending — leaving a documentary unresolved is weak storytelling.', outcome: 'That reads closure as craft; the poem shows the unanswered ending is the stronger structure because the neglect is real and continuing — a neat fix would lie.', reveals: 'endings-must-resolve' },
                { text: 'End on her statistics — years worked, loads carried — so the film closes with evidence, not sentiment.', outcome: 'Numbers summarise her but don\'t turn the gaze; the poem\'s final move is a question that conscripts the viewer — data can\'t perform that transfer of responsibility.', reveals: 'data-is-the-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear dialect as the poem\'s conscience — a vanishing world recorded in its own accent.',
            decisions: [{ prompt: 'What comes next? efyd eqgEen tk;lh · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — efyd eqgEen tk;lh · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_001', difficulty: 'standard',
          question: 'Context and background in literature refers to the biographical, historical.',
          hint: 'If stuck, revisit the Class 11 “Before You Read” node (c11_hin_ar_cbse_01_001) and.',
          misconception: 'Students often think “context and background” means memorising the poet’s birth/death dates and a list of works.',
          parts: [
                { id: 'a', prompt: 'What is the primary profession of Jagdish Lalak apart from being a poet, and how does it shape his poetic language?', answer: 'Jagdish Lalak was a journalist and radio editor',
                  options: ['Jagdish Lalak was a journalist and radio editor', 'he was a teacher', 'context and background'],
                  hint: 'If stuck, revisit the Class 11 “Before You Read” node (c11_hin_ar_cbse_01_001) and practise the.',
                  misconception: 'Students often think “context and background” means memorising the poet’s birth/death dates and a list of works.' },
                { id: 'b', prompt: 'Explain in your own words why the introduction mentions “ns\'kt (rn~Hko) \'kCnksa” (dialect words) in the poem “olar vk;k”.', answer: 'The poet uses Haryanvi dialect words to authentically capture the potter’s world',
                  options: ['The poet uses Haryanvi dialect words to authentically capture the potter’s world', 'context and background'],
                  hint: 'If stuck, revisit the Class 11 “Before You Read” node (c11_hin_ar_cbse_01_001) and practise the.',
                  misconception: 'Students often think “context and background” means memorising the poet’s birth/death dates and a list of works.' },
                { id: 'c', prompt: 'Compare the function of the potter in “olar vk;k” with the function of the “chak” (wheel) in the same poem.', answer: 'The potter represents the human agent',
                  options: ['The potter represents the human agent', 'context and background'],
                  hint: 'If stuck, revisit the Class 11 “Before You Read” node (c11_hin_ar_cbse_01_001) and practise the.',
                  misconception: 'Students often think “context and background” means memorising the poet’s birth/death dates and a list of works.' }
          ],
            remediations: { 'context-and-background-means-memorising': { steps: ['Ask the student to re‑read the introductory note and underline every phrase that describes Lalak’s profession, region.', 'For each underlined phrase, have them write one sentence connecting it to something they expect to see in the poems.', 'Give them a short unseen paragraph about another writer (e.g., a farmer‑poet) and ask them to predict two poetic.', 'Review the predictions together, emphasising the “bio → text” arrow.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think “context and background” means memorising the poet’s birth/death dates and a list of works.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “Jagdish Lalak’s use of dialect makes his poetry accessible only to readers from Haryana.” Defend your position with evidence from the.', answer: 'The statement is false',
                  options: ['The statement is false', 'local colour', 'exclusivity', 'context and background'],
                  hint: 'If stuck, revisit the Class 11 “Before You Read” node (c11_hin_ar_cbse_01_001) and practise the.',
                  misconception: 'Students often think “context and background” means memorising the poet’s birth/death dates and a list of works.' }
          ],
            remediations: { 'context-and-background-means-memorising': { steps: ['Ask the student to re‑read the introductory note and underline every phrase that describes Lalak’s profession, region.', 'For each underlined phrase, have them write one sentence connecting it to something they expect to see in the poems.', 'Give them a short unseen paragraph about another writer (e.g., a farmer‑poet) and ask them to predict two poetic.', 'Review the predictions together, emphasising the “bio → text” arrow.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_002', difficulty: 'standard',
          question: 'Plot and narrative structure in poetry refers to the sequence of events, the.',
          hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_002 on narrative structure in poetry.',
          misconception: 'Students often think narrative poems must have a clear beginning, middle, and end like a story, and they look for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure in poetry refers to the sequence of events, the progression',
                  options: ['Plot and narrative structure in poetry refers to the sequence of events, the progression', 'Context and background in literature refers to the biographical, historical, cultural,', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist involves a systematic examination of the central'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_002 on narrative structure in poetry and practice.',
                  misconception: 'Students often think narrative poems must have a clear beginning, middle, and end like a story, and they look for explicit plot events.' }
          ],
            remediations: { 'narrative-poems-must-have-a': { steps: ['If the student cannot identify narrative elements, guide them to: (1) Number the stanzas and label each with.', '(2) Draw a simple arc diagram labeling exposition, rising action, climax, resolution.', '(3) Re-read the poem aloud, noting where the tone shifts from descriptive to emotional.', '(4) Practice with a simpler narrative poem from Class 11 (e.g., c11_hin_ar_cbse_01_002) to reinforce the concept.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a literary.',
          hint: 'Review the imagery identification exercises from Class 11 (c11_hin_ar_cbse_05_008) and.',
          misconception: 'Students often treat setting as a static list of place and time ("the poem is set in a field in summer") and atmosphere.',
          parts: [
                { id: 'a', prompt: 'What is the primary physical setting of the poem "olar vk;k" and which two sensory details does the poet use to establish it in the first stanza?', answer: 'The primary setting is an agricultural field during daytime',
                  options: ['The primary setting is an agricultural field during daytime', 'village'],
                  hint: 'Review the imagery identification exercises from Class 11 (c11_hin_ar_cbse_05_008) and practice.',
                  misconception: 'Students often treat setting as a static list of place and time ("the poem is set in a field in summer") and atmosphere as a single.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot move beyond static identification, do this: 1) Have them re-read the poem aloud, pausing at each.', '2) Ask them to draw a two-column timeline: left column = setting details per stanza, right column = feeling evoked.', '3) Guide them to write one sentence linking a specific change in setting (e.g., "the sun climbs higher") to a shift.', '4) Re-test with Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves a systematic examination of the.',
          hint: 'If stuck, review "Text: Plot and Narrative Structure" (c12_hin_a_cbse_05_002).',
          misconception: 'Students often treat the protagonist as a mere symbol of "old age" or "tradition" and write generic essays about Indian.',
          parts: [
                { id: 'a', prompt: 'Identify the protagonist of the poem "olar vk;k" and state one physical detail the poet uses to establish her age and frailty in the opening stanza.', answer: 'The protagonist is the old woman (olar)',
                  options: ['The protagonist is the old woman (olar)', 'the poet or the crow as protagonist'],
                  hint: 'If stuck, review "Text: Plot and Narrative Structure" (c12_hin_a_cbse_05_002) to re-establish the.',
                  misconception: 'Students often treat the protagonist as a mere symbol of "old age" or "tradition" and write generic essays about Indian elderly women.' }
          ],
            remediations: { 'students-often-treat-the-protagonist': { steps: ['Re-read the poem aloud, circling every ns\'kt word (enueghuk, ngj&ngj, fiQjdh, uanu&ou) and every bodily sensation.', 'Revisit node c12_hin_a_cbse_05_002 (Plot) to map the protagonist\'s actions chronologically: remembering → walking →.', 'Practice writing one PEEL paragraph using ONLY dialect words as evidence (e.g., "The word \'ngj&ngj\' shows...").', 'Re-attempt Diagnostic Question 4 with this constraint: every claim must quote a dialect word.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_005', difficulty: 'standard',
          question: 'In poetry, supporting characters are the secondary voices, symbols, or entities.',
          hint: 'If stuck, review the \'Speaker vs. Listener\' distinction in c12_hin_a_cbse_05_004 and the.',
          misconception: 'Students treat supporting characters in poetry as \'minor characters in a story\' — they look for personality traits.',
          parts: [
                { id: 'a', prompt: 'Compare the role of the \'child\' in "ओलार वक;क" with the role of the \'peacock/parrot\' in "रक्सM+ks".', answer: 'The child in "ओलार वक;क" represents human *interruption*',
                  options: ['The child in "ओलार वक;क" represents human *interruption*', 'both are just part of the setting'],
                  hint: 'If stuck, review the \'Speaker vs. Listener\' distinction in c12_hin_a_cbse_05_004 and the \'Symbol.',
                  misconception: 'Students treat supporting characters in poetry as \'minor characters in a story\' — they look for personality traits, backstories,.' }
          ],
            remediations: { 'students-treat-supporting-characters-in': { steps: ['Have the student re-read both poems *only* marking nouns that are not the speaker (\'मैं\', \'हम\', \'dfo\').', 'For each marked noun, ask: "If I delete this noun, what specific meaning disappears?" 3.', 'Make a two-column table: Column A = Supporting Element, Column B = Thematic Function (not description).', 'Practice writing one-sentence functional statements for each (e.g., "The child\'s request = human desire to repeat the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_006', difficulty: 'standard',
          question: 'The primary theme of a poem is its central, unifying idea that emerges from the.',
          hint: 'If stuck, review the PEEL structure using the Class 11 Antra Chapter 5 theme node.',
          misconception: 'Students consistently confuse *theme* with *moral* or *summary*.',
          parts: [
                { id: 'a', prompt: 'What is the difference between a *topic* (विषय) and a *theme* (मुख्य भाव/थीम) in poetry? Give one example from "olar vk;k" to illustrate.', answer: 'A topic is the surface subject (e.g., "old age" or "an old man walking")',
                  options: ['A topic is the surface subject (e.g., "old age" or "an old man walking")', 'old age', 'walking'],
                  hint: 'If stuck, review the PEEL structure using the Class 11 Antra Chapter 5 theme node.',
                  misconception: 'Students consistently confuse *theme* with *moral* or *summary*.' },
                { id: 'b', prompt: 'In "olar vk;k", the poet uses the phrase "veqd fnu veqd ckj enueghus dh gksosxh iapeh" (day after day, the sun of many seasons has risen).', answer: 'This line establishes the vast timescale over which the old man has lived',
                  options: ['This line establishes the vast timescale over which the old man has lived', 'the sun rose many days', 'how does the poet convey'],
                  hint: 'If stuck, review the PEEL structure using the Class 11 Antra Chapter 5 theme node.',
                  misconception: 'Students consistently confuse *theme* with *moral* or *summary*.' },
                { id: 'c', prompt: 'Compare the role of *nature imagery* in establishing the primary theme of "olar vk;k" versus "rksM+ks".', answer: 'In "olar vk;k", nature (sun, seasons, wind) is a *witness* and *contrast*',
                  options: ['In "olar vk;k", nature (sun, seasons, wind) is a *witness* and *contrast*', 'both poems use nature imagery'],
                  hint: 'If stuck, review the PEEL structure using the Class 11 Antra Chapter 5 theme node.',
                  misconception: 'Students consistently confuse *theme* with *moral* or *summary*.' }
          ],
            remediations: { 'students-consistently-confuse-theme-with': { steps: ['**Revisit the distinction**: Have the student write three columns for "olar vk;k" — Topic / Summary Sentence / Theme.', 'Model one: Topic = "Old man\'s walk"; Summary = "An old man walks slowly, remembering his youth"; Theme = "Time.', '**Color-code the poem**: Use three highlighters — one for *time/aging images*, one for *memory/youth images*, one for.', 'Ask: "Which color dominates each stanza?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
