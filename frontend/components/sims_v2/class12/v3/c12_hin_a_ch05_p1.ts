import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch05_p1: SimDef = {
    id: 'v3_c12_hin_a_ch05_p1',
    title: 'रघुवीर सहाय · Part 1/3',
    subtitle: 'When the wheel stops, a whole culture stops',
    classLevel: 12, subject: 'hin_a', topic: 'रघुवीर सहाय · Part 1/3',
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
        { title: 'रघुवीर सहाय — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Listen at the potter\'s wheel: weigh dialect as documentary fidelity, read man and wheel as a single craft, and feel what\'s lost when such poems stop being written.',
        labels: ['रघुवीर सहाय — कवि', 'रघुवीर सहाय — पद्यांश-वार', 'रघुवीर सहाय — काव्य-संरचना', 'रघुवीर सहाय — केंद्रीय', 'रघुवीर सहाय — छंद', 'रघुवीर सहाय — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_001', title: 'रघुवीर सहाय — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'अंतरा भाग-2 खोलिए और पाठ 05 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'What is the primary profession of Jagdish Lalak apart from being a poet, and how does it shape his poetic language?', options: [
                { text: 'Jagdish Lalak was a journalist and radio editor', outcome: 'Jagdish Lalak was a journalist and radio editor; his professional exposure to everyday speech and.' },
                { text: 'he was a teacher', outcome: 'Not quite — Students often think “context and background” means memorising the poet’s birth/death dates and.', reveals: 'context-and-background-means-memorising' },
                { text: 'context and background', outcome: 'Not quite — Students often think “context and background” means memorising the poet’s birth/death dates and.', reveals: 'context-and-background-means-memorising' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_004', title: 'रघुवीर सहाय — केंद्रीय भाव और रस',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'अंतरा भाग-2 — पाठ 5\' में अंतरा-भाग-2-—-पाठ-5 से पात्र उभरता है।',
            decisions: [{ prompt: 'Identify the protagonist of the poem "olar vk;k" and state one physical detail the poet uses to establish her age and frailty in the.', options: [
                { text: 'The protagonist is the old woman (olar)', outcome: 'The protagonist is the old woman (olar). A physical detail is "cM+s&cM+s fi;jk, iÙks" (trembling.' },
                { text: 'the poet or the crow as protagonist', outcome: 'Not quite — Students often treat the protagonist as a mere symbol of "old age" or "tradition" and write generic.', reveals: 'students-often-treat-the-protagonist' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_005', title: 'रघुवीर सहाय — छंद और लय-विधान',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 5\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'In the poem "ओलार वक;क", who is the \'nk\' (child) and what is their single action in the poem?', options: [
                { text: 'The \'nk\' is the child listener who, upon hearing the oriole\'s song, asks the bird to sing', outcome: 'The \'nk\' is the child listener who, upon hearing the oriole\'s song, asks the bird to sing again.' },
                { text: 'the child is the poet', outcome: 'Not quite — Students treat supporting characters in poetry as \'minor characters in a story\' — they look for.', reveals: 'students-treat-supporting-characters-in' },
                { text: 'the child catches the bird', outcome: 'Not quite — Students treat supporting characters in poetry as \'minor characters in a story\' — they look for.', reveals: 'students-treat-supporting-characters-in' }
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
            decisions: [{ prompt: 'What comes next? रघुवीर सहाय · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — रघुवीर सहाय · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
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
          question: '\'अंतरा भाग-2 — पाठ 5\' का कथानक — \'अंतरा भाग-2 — पाठ 5\' — अंतरा भाग-2 का पाठ।.',
          hint: 'यदि छात्र भावार्थ निकालने में कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_05_001 (कवि.',
          misconception: 'छात्र अक्सर यह मान लेते हैं कि यदि वे पद्यांश के सभी शब्दों के शब्दार्थ जानते हैं तो उन्होंने उसका भावार्थ निकाल लिया.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 5\' का कथानक — \'अंतरा भाग-2 — पाठ 5\' — अंतरा भाग-2 का पाठ। पाठ का',
                  options: ['\'अंतरा भाग-2 — पाठ 5\' का कथानक — \'अंतरा भाग-2 — पाठ 5\' — अंतरा भाग-2 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-2 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि छात्र भावार्थ निकालने में कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_05_001 (कवि परिचय और.',
                  misconception: 'छात्र अक्सर यह मान लेते हैं कि यदि वे पद्यांश के सभी शब्दों के शब्दार्थ जानते हैं तो उन्होंने उसका भावार्थ निकाल लिया है, जैसे कि कोई.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले एक 간단한 वाक्य दें जैसे "मैं ठीक हूँ" और पूछें कि क्या यह हमेशा सच्चा है - फिर बताएँ कि टोन, संदर्भ और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_003', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'कक्षा 11 में काव्य-संरचना और पद्य-विन्यास (c11_hin_a_cbse_05_003) की अवधारणा को पुनः.',
          misconception: 'छात्र अक्सर मानते हैं कि रघुवीर सहाय की कविता में असमान stanza लंबाई, बदलता rhyme scheme, या अनियमित meter केवल तकनीकी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'अंतरा भाग-2 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 5\' का कथानक — \'अंतरा भाग-2 — पाठ 5\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'कक्षा 11 में काव्य-संरचना और पद्य-विन्यास (c11_hin_a_cbse_05_003) की अवधारणा को पुनः देखें — विशेष.',
                  misconception: 'छात्र अक्सर मानते हैं कि रघुवीर सहाय की कविता में असमान stanza लंबाई, बदलता rhyme scheme, या अनियमित meter केवल तकनीकी गलतियाँ या व्याकरणिक.' }
          ],
            remediations: { 'stanza': { steps: ['छात्र को पहले एक परिचित पारंपरिक कविता (जैसे दोहा या sorath) दें और पूछें कि इसका रूप कैसा है और यह भाव को कैसे सहारा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_004', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
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
          question: '\'अंतरा भाग-2 — पाठ 5\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
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
          question: '\'अंतरा भाग-2 — पाठ 5\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 5\' का केंद्रीय भाव और.',
          hint: 'यदि छात्र रूपक और उपमा में अंतर नहीं कर पा रहा है तो उसे c12_hin_a_cbse_05_002.',
          misconception: 'छात्र अक्सर रूपक और उपमा के बीच के अंतर को ध्वनि या लय के आधार पर समझने की कोशिश करते हैं, जबकि वास्तविक अंतर तुलना के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 5\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 5\' का केंद्रीय भाव और संदेश',
                  options: ['\'अंतरा भाग-2 — पाठ 5\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 5\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 5\' का कथानक — \'अंतरा भाग-2 — पाठ 5\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र रूपक और उपमा में अंतर नहीं कर पा रहा है तो उसे c12_hin_a_cbse_05_002 (पद्यांश-वार.',
                  misconception: 'छात्र अक्सर रूपक और उपमा के बीच के अंतर को ध्वनि या लय के आधार पर समझने की कोशिश करते हैं, जबकि वास्तविक अंतर तुलना के तरीके में है: उपमा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो पंक्तियाँ दीजिए: (1) "उसकी हँसी फूल जैसी है" (2) "उसकी हँसी एक फूल है" फिर पूछिए: किसमें \'जैसा\' शब्द है और.', 'फिर स्पष्ट कीजिए कि \'जैसा\' की presenza उपमा को दर्शाता है और उसकी absence रूपक को। इस अभ्यास को 3-4 अलग-अलग उदाहरणों के.', 'इससे वह रूपक और उपमा के बीच के संरचनात्मक अंतर को महसूस करना शुरू कर देगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
