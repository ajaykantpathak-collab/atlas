import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch07_p1: SimDef = {
    id: 'v3_c12_hin_a_ch07_p1',
    title: 'बारहमासा · Part 1/3',
    subtitle: 'A walking song where hunger means two hungers',
    classLevel: 12, subject: 'hin_a', topic: 'बारहमासा · Part 1/3',
    chapters: ['c12_hin_a_ch07'],
    nodeIds: ['c12_hin_a_cbse_07_001', 'c12_hin_a_cbse_07_002', 'c12_hin_a_cbse_07_003', 'c12_hin_a_cbse_07_004', 'c12_hin_a_cbse_07_005', 'c12_hin_a_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Varkari-tradition reader', intro: 'On the road to Pandharpur, a saint-poet handed the poorest pilgrims a song — and a subtle verdict on orthodoxy.', goal: 'Read Eknath\'s Abhang through the Varkari tradition — folk form carrying devotion and social critique.' },
    discovery: {
        question: 'A pilgrim woman sings to Vitthal of hunger and thirst on the road to Pandharpur — why does an Abhang carry both at once?',
        options: ['Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together', 'Pilgrims just get hungry', 'Folk songs need simple themes', 'Fasting is the ritual'],
        answer: 'Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together',
        hook: 'Eknath was a Brahmin who wrote for the marginalised — the Abhang\'s plain Marathi, folk rhythm and a woman\'s voice are the reform, not simplification. This is poetry made to be walked and sung, not recited from a throne.',
    },
    teaching: [
        { title: 'बारहमासा — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'March with the Varkaris: learn what makes an Abhang an Abhang, read hunger as both road and spirit, and hear how a saint smuggled equality into a song.',
        labels: ['बारहमासा — कवि परिचय', 'बारहमासा — पद्यांश-वार भावार्थ', 'बारहमासा — काव्य-संरचना और', 'बारहमासा — केंद्रीय भाव', 'बारहमासा — छंद और', 'बारहमासा — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_002', title: 'बारहमासा — पद्यांश-वार भावार्थ',
          caseStudy: { intro: '\'कंजकली\' का क्रम: शुरुआत कंजकली से, घटनाएँ बढ़ती हैं, अंत \'कंजकली\' का केंद्रीय भाव और संदेश पर।',
            decisions: [{ prompt: 'What is the primary narrative event that structures the entire poem "ckjgeklk" across its stanzas?', options: [
                { text: 'The poem is structured around a woman (ukxerh) waiting through the night for her beloved,', outcome: 'The poem is structured around a woman (ukxerh) waiting through the night for her beloved, with each.' },
                { text: 'it\'s about nature description', outcome: 'Not quite — Students treat "ckjgeklk" as a lyric poem (about feeling) rather than a narrative poem (about.', reveals: 'students-treat-ckjgeklk-as-a' },
                { text: 'it\'s a love song without narrative', outcome: 'Not quite — Students treat "ckjgeklk" as a lyric poem (about feeling) rather than a narrative poem (about.', reveals: 'students-treat-ckjgeklk-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a folk-style music video of a woman waiting through the night for someone who doesn\'t come. A teammate wants to cut the repeated shots — lamp, doorway, her face — because \'repetition is dead screen time.\'',
            decisions: [{ prompt: 'What does Mahadevi Verma\'s \'बारहमासा\'-style waiting poem say?', options: [
                { text: 'Keep the repeats — in the poem each stanza\'s return to lamp, night and call is the waiting itself; repetition isn\'t filler, it\'s the heartbeat, and each recurrence shifts from active seeking to inward endurance as the night deepens.', outcome: 'The chapter\'s point: in folk narrative the structure IS the emotion — time passing is the plot, and only the repeated images let the viewer feel its weight.' },
                { text: 'Cut them — montage it once and move on; viewers understand waiting from a single shot.', outcome: 'One shot conveys \'she waited\' as information; the poem\'s layered returns make the waiting an experience — the difference between being told a night passed and watching it refuse to pass.', reveals: 'repetition-is-filler' },
                { text: 'Keep one repeat at the end for rhythm but tighten the middle.', outcome: 'The poem needs the middle repetitions most — that\'s where \'the day passed, the night didn\'t\' stretches external time into her subjective endurance; trimming there trims the tension\'s source.', reveals: 'repeat-only-at-end' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a pilgrimage song as social reform in folk metre — Bhakti that walks, sings and quietly levels.',
            decisions: [{ prompt: 'What comes next? बारहमासा · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बारहमासा · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review Class 11 Chapter 7 (c11_hin_ar_cbse_07_001) "Before You Read" where.',
          misconception: 'Students treat "context" as a list of memorizable facts (dates, birthplace, other works) rather than an interpretive.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'कंजकली\' का कथानक', '\'कंजकली\' का पाठ्य-परिवेश (setting)', '\'कंजकली\' का पात्र-चित्रण'],
                  hint: 'If stuck, review Class 11 Chapter 7 (c11_hin_ar_cbse_07_001) "Before You Read" where Varkari.',
                  misconception: 'Students treat "context" as a list of memorizable facts (dates, birthplace, other works) rather than an interpretive framework.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['If a student cannot articulate the function of context (not just facts), do: (1) Have them re-read the Class 11 node.', '(2) Give them two 2-line excerpts — one from a Sanskrit Shloka, one from an Abhang — and ask: "Which is for singing?', 'How do you know?" (3) Then return to Eknath: "What in his life made him choose the singing form for this message?" This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_002', difficulty: 'standard',
          question: '\'कंजकली\' का कथानक — \'कंजकली\' — अंतरा भाग-2 का पाठ। पाठ का कथानक, पात्र और.',
          hint: 'Review "narrative vs lyric poetry" distinction and "stanza as narrative beat" concept.',
          misconception: 'Students treat "ckjgeklk" as a lyric poem (about feeling) rather than a narrative poem (about a sequence of events).',
          parts: [
                { id: 'a', prompt: 'Compare the narrative function of the refrain-like repetitions in Stanza 1 ("?kj ?kj phj jpk lc dkgw¡") and Stanza 4 ("rsfg fcuq tkM+ u NwVS ekgk¡AA / rw¡ lks.', answer: 'Stanza 1\'s repetition ("house to house, calling out") shows active seeking',
                  options: ['Stanza 1\'s repetition ("house to house, calling out") shows active seeking', 'repetition for emphasis'],
                  hint: 'Review "narrative vs lyric poetry" distinction and "stanza as narrative beat" concept from Class 11.',
                  misconception: 'Students treat "ckjgeklk" as a lyric poem (about feeling) rather than a narrative poem (about a sequence of events).' }
          ],
            remediations: { 'students-treat-ckjgeklk-as-a': { steps: ['Have the student create a 4-box storyboard — one box per stanza — drawing only what HAPPENS (not what is described).', 'Ask "What changes from box to box?" — force them to name the narrative action.', 'Re-read the poem mapping each Hindi line to a box.', 'Re-attempt Diagnostic Question 4 — if they still see only "repetition," repeat with a परिचित folk song (e.g., "Kesariya.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "ckjgeklk" as a lyric poem (about feeling) rather than a narrative poem (about a sequence of events).',
          parts: [
                { id: 'a', prompt: 'Evaluate this interpretation: "The poem has no real plot — it\'s just a series of folk images strung together." Defend or critique using structural evidence.', answer: 'Critique: The poem has a clear three-act narrative structure',
                  options: ['Critique: The poem has a clear three-act narrative structure', 'non-linear', 'plotless'],
                  hint: 'Review "narrative vs lyric poetry" distinction and "stanza as narrative beat" concept from Class 11.',
                  misconception: 'Students treat "ckjgeklk" as a lyric poem (about feeling) rather than a narrative poem (about a sequence of events).' }
          ],
            remediations: { 'students-treat-ckjgeklk-as-a': { steps: ['Have the student create a 4-box storyboard — one box per stanza — drawing only what HAPPENS (not what is described).', 'Ask "What changes from box to box?" — force them to name the narrative action.', 'Re-read the poem mapping each Hindi line to a box.', 'Re-attempt Diagnostic Question 4 — if they still see only "repetition," repeat with a परिचित folk song (e.g., "Kesariya.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_003', difficulty: 'standard',
          question: '\'कंजकली\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित है।',
          hint: 'अगर अटके: c12_hin_a_cbse_07_002 दोहराओ + कक्षा 11 के c11_hin_a_cbse_13_003 (जाग तुझको दूर.',
          misconception: '**विशिष्ट भ्रम**: विद्यार्थी समझते हैं कि **"काव्य-संरचना = छंद नाम बताना"**। **वास्तविकता**: संरचना = **पद-योजना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कंजकली\' का पाठ्य-परिवेश (setting)',
                  options: ['\'कंजकली\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'कंजकली\' का कथानक', '\'कंजकली\' का पात्र-चित्रण'],
                  hint: 'अगर अटके: c12_hin_a_cbse_07_002 दोहराओ + कक्षा 11 के c11_hin_a_cbse_13_003 (जाग तुझको दूर जाना.',
                  misconception: '**विशिष्ट भ्रम**: विद्यार्थी समझते हैं कि **"काव्य-संरचना = छंद नाम बताना"**। **वास्तविकता**: संरचना = **पद-योजना + भाव-क्रम.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: विद्यार्थी को **कविता जोर से पढ़वाओ** — 2 बार, लय पकड़ने तक। **चरण 2**: **कागज पर 12 खाने बनवाओ** — हर खाने.', 'अगर क्रम बदल दें तो क्या होगा?" — **यही संरचना-विश्लेषण है**। **पुनः निदान**: DIAGNOSTIC_QUESTION_2 और 5 फिर से पूछो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_004', difficulty: 'standard',
          question: '\'कंजकली\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि छात्र केंद्रीय भाव और किसी एक महीने के भाव में अंतर नहीं कर पा रहा है, तो उसे.',
          misconception: 'छात्र अक्सर सोचते हैं कि बारहमासा कविता का केंद्रीय भाव वह भाव है जो किसी एक विशिष्ट महीने (जैसे श्रावण या कार्तिक) में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कंजकली\' का पात्र-चित्रण',
                  options: ['\'कंजकली\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'कंजकली\' का कथानक', '\'कंजकली\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र केंद्रीय भाव और किसी एक महीने के भाव में अंतर नहीं कर पा रहा है, तो उसे.',
                  misconception: 'छात्र अक्सर सोचते हैं कि बारहमासा कविता का केंद्रीय भाव वह भाव है जो किसी एक विशिष्ट महीने (जैसे श्रावण या कार्तिक) में सबसे अधिक तीव्रता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले बारहमासा कविता के सभी बारह महीनों की एक सूची बनवाई जाए, फिर प्रत्येक महीने के सामने वह भाव लिखने के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_005', difficulty: 'standard',
          question: '\'कंजकली\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते हैं।',
          hint: 'matra की गणना में कठिनाई होने पर, c11_hin_a_cbse_07_005 (Class 11 में बारहमासा का छंद) पर.',
          misconception: 'छात्र अक्सर मानते हैं कि बारहमासा का छंद akshar की संख्या से निर्धारित होता है क्योंकि वे शब्दों को पढ़ते समय matra की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कंजकली\' के सहायक पात्र',
                  options: ['\'कंजकली\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'कंजकली\' का कथानक', '\'कंजकली\' का पाठ्य-परिवेश (setting)'],
                  hint: 'matra की गणना में कठिनाई होने पर, c11_hin_a_cbse_07_005 (Class 11 में बारहमासा का छंद) पर वापस जाकर.',
                  misconception: 'छात्र अक्सर मानते हैं कि बारहमासा का छंद akshar की संख्या से निर्धारित होता है क्योंकि वे शब्दों को पढ़ते समय matra की बजाय akshar देखते.' }
          ],
            remediations: { 'akshar-matra-akshar-2-akshar': { steps: ['छात्र को 먼저 एक सरल शब्द दें जैसे "घी" (घी = 2 matra) और पूछें कि इसे कैसे बोला जाता है; फिर धीरे-धीरे जटिल शब्द जैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_006', difficulty: 'standard',
          question: '\'कंजकली\' का मुख्य विषय — \'कंजकली\' का केंद्रीय भाव और संदेश',
          hint: 'If stuck on identifying alankar type, revisit **upama vs rupak vs utpreksha decision.',
          misconception: 'Students memorise alankar definitions as isolated labels ("Anupras = repetition of varna") but **fail to see alankars.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कंजकली\' का मुख्य विषय',
                  options: ['\'कंजकली\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'कंजकली\' का कथानक', '\'कंजकली\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck on identifying alankar type, revisit **upama vs rupak vs utpreksha decision tree**: (1).',
                  misconception: 'Students memorise alankar definitions as isolated labels ("Anupras = repetition of varna") but **fail to see alankars operating.' }
          ],
            remediations: { 'students-memorise-alankar-definitions-as': { steps: ['Re-read c12_hin_a_cbse_07_002 (पद्यांश-वार भावार्थ) for the *exact pada* where the alankar appears — meaning clarity.', 'Take one pada (e.g., शरद्), write each line on a separate slip, colour-code: **red = shabdalankar, blue = arthalankar.', 'For each coloured segment, speak aloud: "Name → Quote → Why this name → Effect on ras/imagery." 4.', 'Re-attempt Diagnostic Q4 & Q5; if still scoring < 3/5, revisit c11_hin_a_cbse_13_006 (जाग तुझको दूर जाना — अलंकार).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
