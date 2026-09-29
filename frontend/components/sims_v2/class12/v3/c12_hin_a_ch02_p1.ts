import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch02_p1: SimDef = {
    id: 'v3_c12_hin_a_ch02_p1',
    title: 'सरोज स्मृति · Part 1/3',
    subtitle: 'He lost everything — and gained every register of the language',
    classLevel: 12, subject: 'hin_a', topic: 'सरोज स्मृति · Part 1/3',
    chapters: ['c12_hin_a_ch02'],
    nodeIds: ['c12_hin_a_cbse_02_001', 'c12_hin_a_cbse_02_002', 'c12_hin_a_cbse_02_003', 'c12_hin_a_cbse_02_004', 'c12_hin_a_cbse_02_005', 'c12_hin_a_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poet\'s biographer', intro: 'Three tragedies before forty — and a poetic range no one else matched. The biography explains the voice.', goal: 'Connect Nirala\'s losses and editorial life to his stylistic range and evolution beyond Chhayavad.' },
    discovery: {
        question: 'Orphaned young, widowed early, alone in a Kolkata boarding house — yet Nirala\'s poems celebrate life\'s fleeting beauty. How does grief become craft?',
        options: ['Through deliberate transformation — editing magazines, mastering registers from Sanskritised epic to rustic satire, he converted private loss into universal voice', 'He suppressed the grief', 'Poetry was his therapy only', 'Luck and talent'],
        answer: 'Through deliberate transformation — editing magazines, mastering registers from Sanskritised epic to rustic satire, he converted private loss into universal voice',
        hook: 'Nirala outgrew Chhayavad\'s self-centred lyricism — from subjective romance to epic history, satire and metaphysical inquiry. His language had \'many forms and levels\': the same pen wrote high-Sanskrit prayer and village-cornfield satire. Grief was the fuel; craft was the engine.',
    },
    teaching: [
        { title: 'सरोज स्मृति — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a poet\'s alchemy: follow the losses that forged him, map his leap beyond Chhayavad\'s bounds, and hear one voice speak in epic Sanskrit and village Avadhi both.',
        labels: ['सरोज स्मृति — कवि', 'सरोज स्मृति — पद्यांश-वार', 'सरोज स्मृति — काव्य-संरचना', 'सरोज स्मृति — केंद्रीय', 'सरोज स्मृति — छंद', 'सरोज स्मृति — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_001', title: 'सरोज स्मृति — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'अंतरा भाग-2 खोलिए और पाठ 02 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Identify the three major personal losses फुज्क्यक suffered before age 40, and state the year his first published poem "तवघ्र की दह".', options: [
                { text: 'Correct answer: Mother\'s death (1918), father\'s death (shortly after), wife\'s death (year', outcome: 'Correct answer: Mother\'s death (1918), father\'s death (shortly after), wife\'s death (year not.' },
                { text: 'only mother died', outcome: 'Not quite — Students treat "Before You Read" as optional background reading rather than examinable content.', reveals: 'students-treat-before-you-read' },
                { text: 'first poem in 1922', outcome: 'Not quite — Students treat "Before You Read" as optional background reading rather than examinable content.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_002', title: 'सरोज स्मृति — पद्यांश-वार भावार्थ',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 2\' का क्रम: शुरुआत पाठ-2 से, घटनाएँ बढ़ती हैं, अंत \'अंतरा भाग-2 पर।',
            decisions: [{ prompt: 'Define "plot" and "narrative structure" in the context of a narrative poem. How do they differ from a simple summary?', options: [
                { text: 'Plot is the causal sequence of events (what happens and why)', outcome: 'Plot is the causal sequence of events (what happens and why); narrative structure is the artistic.' },
                { text: 'structure', outcome: 'Not quite — Students often treat "plot" as a mere list of "what happens" and "structure" as synonymous with.', reveals: 'students-often-treat-plot-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_004', title: 'सरोज स्मृति — केंद्रीय भाव और रस',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'अंतरा भाग-2 — पाठ 2\' में पाठ-2 से पात्र उभरता है।',
            decisions: [{ prompt: 'What is the literal meaning of the protagonist\'s name "लज्जा" and how does the poet use it ironically in the opening stanza?', options: [
                { text: '"लज्जा" literally means "shame" or "modesty/shyness"', outcome: '"लज्जा" literally means "shame" or "modesty/shyness". The poet uses it ironically because the name.' },
                { text: 'her name means beauty', outcome: 'Not quite — Students treat लज्जा as a static symbol of "Indian womanhood" rather than a dynamic character with.', reveals: 'students-treat-as-a-static' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re making a memorial film for a departed grandparent. The editor wants strict chronology — birth, childhood, marriage, death — \'so it\'s clear.\' Your best asset is a single fading photograph of her as a young woman.',
            decisions: [{ prompt: 'What does the structure of Agyeya\'s \'लज्जत लेखा\' advise?', options: [
                { text: 'Open on the photograph — let the frame\'s mystery pull the viewer back through fragments of her life and return to the portrait at the end; the non-linear circle enacts how memory actually holds the dead, and makes impermanence felt rather than stated.', outcome: 'The poem begins with a portrait because the trace is all that survives — starting there gives the viewer the poet\'s own shock of discovery; chronology would flatten the loss into a record.' },
                { text: 'Go chronological — clarity is respect, and audiences shouldn\'t have to piece a life together.', outcome: 'The chapter\'s counter is that order is meaning: the circular frame mimics the mind returning to a fixed image; a straight birth-to-death line dilutes the irony that only the image remains.', reveals: 'clarity-demands-chronology' },
                { text: 'Drop the photograph and structure the film around interviews with people who knew her.', outcome: 'That trades the anchor for testimony: the poem\'s power is the single surviving image holding a whole life — without it, the memories float unattached.', reveals: 'testimony-beats-image' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a life into its poetry — and see how Nirala turned personal catastrophe into the widest range in modern Hindi verse.',
            decisions: [{ prompt: 'What comes next? सरोज स्मृति · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — सरोज स्मृति · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If unable to list 5 facts from pp. 8–11 in 3 minutes, revisit Class 11 "Before You Read".',
          misconception: 'Students treat "Before You Read" as optional background reading rather than examinable content.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 2\' का कथानक — \'अंतरा भाग-2 — पाठ 2\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-2 — पाठ 2\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'If unable to list 5 facts from pp. 8–11 in 3 minutes, revisit Class 11 "Before You Read".',
                  misconception: 'Students treat "Before You Read" as optional background reading rather than examinable content.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Re-read pp. 8–11 with a highlighter. Mark every date, place, person, and work title in three colours: LIFE (red).', 'Create a two-column table: LEFT column = biographical fact; RIGHT column = probable textual manifestation (e.g.', 'Orally explain the table to a peer/teacher without notes.', 'Attempt Diagnostic Questions 2 and 4 again — they test the life-work synthesis most students miss.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_002', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' का कथानक — \'अंतरा भाग-2 — पाठ 2\' — अंतरा भाग-2 का पाठ।.',
          hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_002 "Text: Plot and Narrative.',
          misconception: 'Students often treat "plot" as a mere list of "what happens" and "structure" as synonymous with "paragraphs".',
          parts: [
                { id: 'a', prompt: 'Define "plot" and "narrative structure" in the context of a narrative poem. How do they differ from a simple summary?', answer: 'Plot is the causal sequence of events (what happens and why)',
                  options: ['Plot is the causal sequence of events (what happens and why)', 'structure'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_002 "Text: Plot and Narrative Structure".',
                  misconception: 'Students often treat "plot" as a mere list of "what happens" and "structure" as synonymous with "paragraphs" or "stanzas".' },
                { id: 'b', prompt: 'The poem opens with the line "ns[kk fookg vkewy uoy" (I saw a portrait...).', answer: 'The portrait acts as a *frame*',
                  options: ['The portrait acts as a *frame*', 'to introduce the character'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_002 "Text: Plot and Narrative Structure".',
                  misconception: 'Students often treat "plot" as a mere list of "what happens" and "structure" as synonymous with "paragraphs" or "stanzas".' }
          ],
            remediations: { 'students-often-treat-plot-as': { steps: ['If a student cannot distinguish plot from structure: (1) Give them a 3-sentence story: "She died.', 'She lived." Ask: "Is this a plot?', 'Why/why not?" (2) Show the same events in chronological order vs the poem\'s order.', 'Ask: "What changes in how you feel?" (3) Have them draw a *story map* with arrows for time jumps, labeling each jump.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_003', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि मुक्तछंद की आंतरिक लय समझ न आए, तो c11_hin_a_cbse_13_005 (जाग तुझको दूर जाना — छंद और.',
          misconception: '**\'मुक्तछंद का अर्थ है बिना नियम की कविता\'** — यह सबसे घातक भ्रम है। छात्र समझते हैं कि निराला ने \'मनमाने ढंग से\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 2\' का कथानक — \'अंतरा भाग-2 — पाठ 2\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 2\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि मुक्तछंद की आंतरिक लय समझ न आए, तो c11_hin_a_cbse_13_005 (जाग तुझको दूर जाना — छंद और लय-विधान).',
                  misconception: '**\'मुक्तछंद का अर्थ है बिना नियम की कविता\'** — यह सबसे घातक भ्रम है। छात्र समझते हैं कि निराला ने \'मनमाने ढंग से\' पंक्तियाँ तोड़ी हैं, जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **पद 10-12 जोर से पढ़वाएँ** — उससे पूछें: "कहाँ तुम्हारी साँस स्वाभाविक रूप से रुकती है?" फिर दिखाएँ कि निराला.', '**दो संस्करण लिखवाएँ**: एक निराला का मूल, दूसरा उसी भाव को गद्य-अनुच्छेद (prose paragraph) में — फिर दोनों का पाठकीय.', 'यदि फिर भी न समझे, तो **c11_hin_a_cbse_13_003 (जाग तुझको दूर जाना — काव्य-संरचना)** और **c11_hin_a_cbse_14_003 (बादल को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_004', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'If unable to write evidence-based claims, review "Show vs. Tell in Character Analysis".',
          misconception: 'Students treat लज्जा as a static symbol of "Indian womanhood" rather than a dynamic character with specific textual.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the protagonist\'s name "लज्जा" and how does the poet use it ironically in the opening stanza?', answer: '"लज्जा" literally means "shame" or "modesty/shyness"',
                  options: ['"लज्जा" literally means "shame" or "modesty/shyness"', 'her name means beauty'],
                  hint: 'If unable to write evidence-based claims, review "Show vs. Tell in Character Analysis" from.',
                  misconception: 'Students treat लज्जा as a static symbol of "Indian womanhood" rather than a dynamic character with specific textual turning points.' }
          ],
            remediations: { 'students-treat-as-a-static': { steps: ['Re-read the poem *only* for लज्जा\'s verbs (highlight every action verb: सकुचाई, सुनी, उठी, चली, मिलाती).', 'Create a 3-column table: Stanza | Verb/Action | What it reveals.', 'Rewrite one PEEL paragraph using *only* verb evidence.', 'Re-attempt Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_005', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'अगर अटका लगे तो कक्षा 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_005) का छंद-विश्लेषण.',
          misconception: 'छात्र समझते हैं कि \'मुक्त छंद\' का अर्थ है **\'कुछ भी लिख दो, पंक्तियाँ तोड़ दो\'** — वे मात्रा-गणना न होने को \'नियमहीनता\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 2\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'अंतरा भाग-2 — पाठ 2\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 2\' का कथानक — \'अंतरा भाग-2 — पाठ 2\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'अगर अटका लगे तो कक्षा 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_005) का छंद-विश्लेषण दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि \'मुक्त छंद\' का अर्थ है **\'कुछ भी लिख दो, पंक्तियाँ तोड़ दो\'** — वे मात्रा-गणना न होने को \'नियमहीनता\' मान लेते हैं।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता के **केवल पहले और अंतिम पद** जोर से पढ़वाएँ, साँस-रोक (breath-hold) अंतर महसूस करवाएँ। 2.', 'फिर उनसे पूछें: "कहाँ साँस लंबी खिंची?', 'कहाँ बार-बार अटकी?" — इसे लय-गति से जोड़ें। 3.', 'अब **कक्षा 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_005)** या \'बादल को घरिते देखा है\' (c11_hin_a_cbse_14_005) के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_006', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 2\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 2\' का केंद्रीय भाव और.',
          hint: 'यदि stuck हो तो c11_hin_a_cbse_01_008 और c11_hin_a_cbse_02_008 पर रूपक और उपमा की आधारभूत.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द दोहराया गया है तो वह अनुप्रास है, जैसे "मन मन करता है" में "मन" का दोहराव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 2\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 2\' का केंद्रीय भाव और संदेश',
                  options: ['\'अंतरा भाग-2 — पाठ 2\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 2\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 2\' का कथानक — \'अंतरा भाग-2 — पाठ 2\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि stuck हो तो c11_hin_a_cbse_01_008 और c11_hin_a_cbse_02_008 पर रूपक और उपमा की आधारभूत पहचान की.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द दोहराया गया है तो वह अनुप्रास है, जैसे "मन मन करता है" में "मन" का दोहराव अनुप्रास होना। यह गलत है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले ध्वनि पर ध्यान देने के लिए कहिए: शब्द बंद आँखों से पढ़िए और शुरुआती अक्षर की ध्वनि पर ध्यान दीजिए - यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
