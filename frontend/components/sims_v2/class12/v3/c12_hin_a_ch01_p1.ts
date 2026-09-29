import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch01_p1: SimDef = {
    id: 'v3_c12_hin_a_ch01_p1',
    title: 'देवसेना का गीत, कार्नेलयिा का गीत · Part 1/3',
    subtitle: 'Same god, different century — context is the lens',
    classLevel: 12, subject: 'hin_a', topic: 'देवसेना का गीत, कार्नेलयिा का गीत · Part 1/3',
    chapters: ['c12_hin_a_ch01'],
    nodeIds: ['c12_hin_a_cbse_01_001', 'c12_hin_a_cbse_01_002', 'c12_hin_a_cbse_01_003', 'c12_hin_a_cbse_01_004', 'c12_hin_a_cbse_01_005', 'c12_hin_a_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi poetry scholar', intro: 'Before a single line of Tulsidas, there\'s a world to rebuild — the Bhakti age that made his poems possible.', goal: 'Use contextual reading — author, era, movement, language — to situate Tulsidas\'s poems in the Bhakti tradition.' },
    discovery: {
        question: 'Same poet Tulsidas, same devotion — but read him beside Nirala and the poems could be from different universes. What separates them?',
        options: ['Context — Bhakti-era Awadhi devotion for mass access versus Chhayavad\'s Khari Boli individualism; era, movement and language write the poem before the poet does', 'Just personal taste', 'Only the language differs', 'Nothing — poetry is timeless'],
        answer: 'Context — Bhakti-era Awadhi devotion for mass access versus Chhayavad\'s Khari Boli individualism; era, movement and language write the poem before the poet does',
        hook: '\'Before You Read\' isn\'t optional décor — without it, Tulsidas\'s Rama reads as just mythology instead of a personal god open to every caste. Three questions unlock any poem: whose life, which movement, what tongue.',
    },
    teaching: [
        { title: 'देवसेना का गीत, कार्नेलयिा का गीत — कवि परिचय और पृष्ठभूमि', text: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532, राजापुर/चित्रकूट-क्षेत्र से जुड़ी परंपरा, मृत्यु लगभग 1623 काशी), उनकी रामभक्ति-शाखा (राम को परम ब्रह्म मानने.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build the lens before the poem: reconstruct Tulsidas\'s Bhakti world — Mughal era, Awadhi, devotion for all — and test how context changes what a single word can mean.',
        labels: ['देवसेना का गीत, कार्नेलयिा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_001', title: 'देवसेना का गीत, कार्नेलयिा का गीत — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'कवि-परिचय से तुलसीदास की समय-रेखा बनाइए: जन्म (लगभग 1532), बचपन का वियोग व गुरु-दीक्षा, राम-उपासना की दीक्षा, \'रामचरितमानस\' की रचना, \'विनय पत्रिका\' की.',
            decisions: [{ prompt: 'What is the primary purpose of the "Before You Read" section in a literature textbook?', options: [
                { text: 'The primary purpose is to provide the reader with essential background information about', outcome: 'The primary purpose is to provide the reader with essential background information about the.' },
                { text: 'to summarize the story', outcome: 'Not quite — Students often treat "Before You Read" as a passive reading of the author\'s birth/death dates and.', reveals: 'students-often-treat-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your batch wants a song for the annual day honouring the school\'s retiring matron. The lyricist drafts a literal timeline — joined in this year, served in that year — and it reads like a résumé set to music.',
            decisions: [{ prompt: 'How does Nirala\'s structuring of \'देवसेना का गीत\' and \'कानेसरिया का गीत\' suggest fixing it?', options: [
                { text: 'Rebuild it as an emotional arc, not a résumé — open inside one personal moment of hers, let the feeling turn from private memory to collective debt, and end on the batch\'s open pledge — the way the poems move from private grief to an appeal the listener must carry.', outcome: 'The chapter\'s insight is that a lyric\'s plot is the journey of the speaker\'s consciousness — emotional beats do the narrative work events do in prose.' },
                { text: 'Keep the timeline — a tribute should record the facts of her service accurately.', outcome: 'That\'s the event-plot assumption the chapter corrects: a list of dates documents a career but never becomes a song — without an emotional pivot the audience is informed, not moved.', reveals: 'facts-make-a-song' },
                { text: 'Make it fully abstract — drop her story and write only grand verses about service.', outcome: 'The poems earn their collective ending by starting inside a specific grief; pure abstraction skips the concrete wound that makes the final appeal land.', reveals: 'abstract-is-universal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now approach any Hindi text with the reader\'s toolkit — biography, movement and milieu as the keys that turn \'old verse\' into argument.',
            decisions: [{ prompt: 'What comes next? देवसेना का गीत, कार्नेलयिा का गीत · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — देवसेना का गीत, कार्नेलयिा का गीत · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_001', difficulty: 'standard',
          question: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म.',
          hint: 'If stuck, review the "Before You Read" section of any Class 11 Aroh chapter (e.g.',
          misconception: 'Students often treat "Before You Read" as a passive reading of the author\'s birth/death dates and a list of works.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,',
                  options: ['इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,', '\'नसोल्सुक का छर\' का कथानक', '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)', '\'नसोल्सुक का छर\' का पात्र-चित्रण'],
                  hint: 'If stuck, review the "Before You Read" section of any Class 11 Aroh chapter (e.g.',
                  misconception: 'Students often treat "Before You Read" as a passive reading of the author\'s birth/death dates and a list of works, memorizing them for.' }
          ],
            remediations: { 'students-often-treat-before-you': { steps: ['If a student cannot connect context to text, guide them through a three-step exercise: (1) Pick one fact from the.', '(2) Find one line in the poem that shows Sanskrit influence (e.g., a tatsama word or complex compound).', '(3) Write one sentence explaining the link.', 'Repeat with two more facts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_002', difficulty: 'standard',
          question: '\'नसोल्सुक का छर\' का कथानक — \'नसोल्सुक का छर\' — अंतरा भाग-2 का पाठ। पाठ का.',
          hint: 'यदि अटके तो **कक्षा 11 के नोड c11_hin_a_cbse_13_002 (जाग तुझको दूर जाना — पद्यांश-वार.',
          misconception: '**विशिष्ट भ्रम:** छात्र "पद्यांश-वार भावार्थ" को **"पूरी कविता का सारांश"** समझते हैं और परीक्षा में 5-6 पद्यांशों को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नसोल्सुक का छर\' का कथानक',
                  options: ['\'नसोल्सुक का छर\' का कथानक', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,', '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)', '\'नसोल्सुक का छर\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो **कक्षा 11 के नोड c11_hin_a_cbse_13_002 (जाग तुझको दूर जाना — पद्यांश-वार भावार्थ)** पर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र "पद्यांश-वार भावार्थ" को **"पूरी कविता का सारांश"** समझते हैं और परीक्षा में 5-6 पद्यांशों को मिलाकर एक लंबा पैरा.' }
          ],
            remediations: { '5-6-cbse-2-4': { steps: ['**चरण 1:** छात्र को एक **एकल पद्यांश** (दोनों गीतों में से कोई एक) दें और कहें: "केवल इस पद्यांश के 3 वाक्यों में.', '**चरण 2:** उसके उत्तर में **कठिन शब्द, बिंब, अलंकार, केंद्रीय भाव से संबंध** — इन 4 तत्वों को अलग-अलग रंग से रेखांकित.', '**चरण 3:** यदि कोई तत्व छूटा हो, तो उसी पद्यांश पर दोबारा लिखने को कहें — इस बार **चेकलिस्ट** साथ रखकर। 4.', '**पुनः निदान:** अगले सप्ताह वही पद्यांश देकर समय-सीमा (5 मिनट) में लिखवाएँ — यदि 4/4 तत्व आए, तो अगले पद्यांश पर बढ़ें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_003', difficulty: 'standard',
          question: '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि stanza पहचान में कठिनाई हो, तो c12_hin_a_cbse_01_002 (पद्यांश-वार भावार्थ) की दोबारा.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि दो कविताओं में同じ छंद है, तो उनका पद्य-विन्यास完全的に同じ है, जैसे देवसेना का गीत और कार्नेलयिा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)',
                  options: ['\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,', '\'नसोल्सुक का छर\' का कथानक', '\'नसोल्सुक का छर\' का पात्र-चित्रण'],
                  hint: 'यदि stanza पहचान में कठिनाई हो, तो c12_hin_a_cbse_01_002 (पद्यांश-वार भावार्थ) की दोबारा समीक्षा.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि दो कविताओं में同じ छंद है, तो उनका पद्य-विन्यास完全的に同じ है, जैसे देवसेना का गीत और कार्नेलयिा का गीत में साम्यिका.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दोनों गीतों की एक पंक्तियों में लय चिह्नित करने के लिए कहिए (उदाहरण: तालियों से beats गिनिए)। फिर stanza-wise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_004', difficulty: 'standard',
          question: '\'नसोल्सुक का छर\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'If stuck, revisit Class 11 node c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना — केंद्रीय भाव.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर समझते हैं कि "केंद्रीय भाव" और "प्रधान रस" एक ही चीज़ के दो नाम हैं — जैसे "देवसेना का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नसोल्सुक का छर\' का पात्र-चित्रण',
                  options: ['\'नसोल्सुक का छर\' का पात्र-चित्रण', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,', '\'नसोल्सुक का छर\' का कथानक', '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, revisit Class 11 node c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना — केंद्रीय भाव और रस) and.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर समझते हैं कि "केंद्रीय भाव" और "प्रधान रस" एक ही चीज़ के दो नाम हैं — जैसे "देवसेना का गीत = वीर रस" और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दोनों कविताएँ **मौन वाचन** कराएँ, फिर **स्वर वाचन** — ध्वनि और लय पर ध्यान दें। 2.', 'पूछें: "कौन-सी पंक्ति पढ़कर तुम्हारी भुजाएँ फड़कीं?', '(वीर रस) कौन-सी पंक्ति पढ़कर आँखें नम हुईं?', '(करुण रस)" — इससे रस की **अनुभूति** पकड़ में आएगी। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_005', difficulty: 'standard',
          question: '\'नसोल्सुक का छर\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटके तो Class 11 के छंद नोड्स (c11_hin_a_cbse_13_005 आदि) के \'मात्रा-गणना अभ्यास\'.',
          misconception: 'छात्र समझते हैं कि \'छंद पहचानना\' केवल पदों के नाम याद रखना है (जैसे \'यह दोहा है\', \'यह चौपाई है\')। वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नसोल्सुक का छर\' के सहायक पात्र',
                  options: ['\'नसोल्सुक का छर\' के सहायक पात्र', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,', '\'नसोल्सुक का छर\' का कथानक', '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो Class 11 के छंद नोड्स (c11_hin_a_cbse_13_005 आदि) के \'मात्रा-गणना अभ्यास\' दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि \'छंद पहचानना\' केवल पदों के नाम याद रखना है (जैसे \'यह दोहा है\', \'यह चौपाई है\')। वास्तव में बोर्ड/कुशलता परीक्षा में पूछा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: Class 11 के छंद नोड (c11_hin_a_cbse_13_005, c11_hin_a_cbse_14_005, c11_hin_a_cbse_15_005, c11_hin_a_cbse_16_005).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_006', difficulty: 'standard',
          question: '\'नसोल्सुक का छर\' का मुख्य विषय — \'नसोल्सुक का छर\' का केंद्रीय भाव और संदेश',
          hint: 'यदि अलंकार पहचानने में अटकें: **c11_hin_a_cbse_13_006** (जाग तुझको दूर जाना — अलंकार).',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **अलंकार पहचानना = नाम बता देना** (यह अनुप्रास है, यह रूपक है)। वे **उद्धरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नसोल्सुक का छर\' का मुख्य विषय',
                  options: ['\'नसोल्सुक का छर\' का मुख्य विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,', '\'नसोल्सुक का छर\' का कथानक', '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अलंकार पहचानने में अटकें: **c11_hin_a_cbse_13_006** (जाग तुझको दूर जाना — अलंकार) दोबारा करें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **अलंकार पहचानना = नाम बता देना** (यह अनुप्रास है, यह रूपक है)। वे **उद्धरण नहीं देते**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** c12_hin_a_cbse_01_002 (पद्यांश-वार भावार्थ) — जिन पदों में अलंकार हैं, उनका **संदर्भ** समझें। 2.', '**तालिका बनाएं:** 4 कॉलम — **पद | अलंकार नाम | उद्धरण | भाव-प्रभाव**। दोनों कविताओं के 5-5 प्रमुख अलंकार भरें। 3.', '**मौखिक अभ्यास:** प्रत्येक पद के लिए बोलें: *"कवि ने [अलंकार] इसलिए प्रयुक्त किया क्योंकि वह [भाव] को [कैसे] दिखाना.', '**पुनः निदान:** DIAGNOSTIC_QUESTION_2 और _4 दोबारा हल करें — अब **कारण** और **संयुक्त प्रभाव** लिख पाने चाहिए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
