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
        { title: 'देवसेना का गीत, कार्नेलयिा का गीत — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का अर्थ है — रचनाकार (कवि) का संक्षिप्त जीवन-परिचय, उनकी साहित्यिक यात्रा, प्रमुख रचनाएँ, रचनाधर्मिता की विशेषताएँ, तथा उस विशिष्ट ऐतिहासिक-सांस्कृतिक पृष्ठभूमि का विवेचन जिससे.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build the lens before the poem: reconstruct Tulsidas\'s Bhakti world — Mughal era, Awadhi, devotion for all — and test how context changes what a single word can mean.',
        labels: ['देवसेना का गीत, कार्नेलयिा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_a_cbse_01_004', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['अनुभाव (बाह्य अभिव्यक्ति) पहचानें — \'तलवार चलाना\', \'खड़ा.', 'विभाव (आलम्बन/उद्दीपन) ढूँढें — आलम्बन: **वीर श्रोता/पाठक**.', 'स्थायी भाव पहचानें — यहाँ **उत्साह** (वीर रस का स्थायी भाव).', 'संचारी भाव पहचानें — \'संकल्प\' (धृति), \'नया इतिहास लिखने\' की.', 'रस-निष्पत्ति का निष्कर्ष — विभाव+अनुभाव+संचारी के संयोग से.'], answer: 'स्थायी भाव पहचानें — यहाँ **उत्साह** (वीर रस का स्थायी भाव). विभाव (आलम्बन/उद्दीपन) ढूँढें — आलम्बन: **वीर श्रोता/पाठक**. अनुभाव (बाह्य अभिव्यक्ति) पहचानें — \'तलवार चलाना\', \'खड़ा. संचारी भाव पहचानें — \'संकल्प\' (धृति), \'नया इतिहास लिखने\' की. रस-निष्पत्ति का निष्कर्ष — विभाव+अनुभाव+संचारी के संयोग से.' } },
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
          question: 'कवि परिचय और पृष्ठभूमि का अर्थ है — रचनाकार (कवि) का संक्षिप्त जीवन-परिचय, उनकी.',
          hint: 'अगर अटके तो c11_hin_a_cbse_13_001 और c11_hin_a_cbse_15_001 के \'कवि परिचय\' खंड दोहराएँ.',
          misconception: 'छात्र समझते हैं कि \'कवि परिचय\' का अर्थ केवल जन्म-मृत्यु तिथि, प्रसिद्ध रचनाओं की सूची और साहित्यिक धारा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का अर्थ है',
                  options: ['कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित', 'केंद्रीय भाव (Central Idea) कविता का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना चाहता'],
                  hint: 'अगर अटके तो c11_hin_a_cbse_13_001 और c11_hin_a_cbse_15_001 के \'कवि परिचय\' खंड दोहराएँ — वहाँ.',
                  misconception: 'छात्र समझते हैं कि \'कवि परिचय\' का अर्थ केवल जन्म-मृत्यु तिथि, प्रसिद्ध रचनाओं की सूची और साहित्यिक धारा (छायावाद/द्विवेदी युग) लिख देना है।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: दोनों कवियों की समय-रेखा (timeline) बनाइए — प्रमुख जीवन-घटनाएँ एक कॉलम में, प्रमुख रचनाएँ दूसरे में, ऐतिहासिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ.',
          hint: 'यदि अटके तो **कक्षा 11 के नोड c11_hin_a_cbse_13_002 (जाग तुझको दूर जाना — पद्यांश-वार.',
          misconception: '**विशिष्ट भ्रम:** छात्र "पद्यांश-वार भावार्थ" को **"पूरी कविता का सारांश"** समझते हैं और परीक्षा में 5-6 पद्यांशों को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित', 'केंद्रीय भाव (Central Idea) कविता का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना चाहता'],
                  hint: 'यदि अटके तो **कक्षा 11 के नोड c11_hin_a_cbse_13_002 (जाग तुझको दूर जाना — पद्यांश-वार भावार्थ)** पर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र "पद्यांश-वार भावार्थ" को **"पूरी कविता का सारांश"** समझते हैं और परीक्षा में 5-6 पद्यांशों को मिलाकर एक लंबा पैरा.' }
          ],
            remediations: { '5-6-cbse-2-4': { steps: ['**चरण 1:** छात्र को एक **एकल पद्यांश** (दोनों गीतों में से कोई एक) दें और कहें: "केवल इस पद्यांश के 3 वाक्यों में.', '**चरण 2:** उसके उत्तर में **कठिन शब्द, बिंब, अलंकार, केंद्रीय भाव से संबंध** — इन 4 तत्वों को अलग-अलग रंग से रेखांकित.', '**चरण 3:** यदि कोई तत्व छूटा हो, तो उसी पद्यांश पर दोबारा लिखने को कहें — इस बार **चेकलिस्ट** साथ रखकर। 4.', '**पुनः निदान:** अगले सप्ताह वही पद्यांश देकर समय-सीमा (5 मिनट) में लिखवाएँ — यदि 4/4 तत्व आए, तो अगले पद्यांश पर बढ़ें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_003', difficulty: 'standard',
          question: 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को.',
          hint: 'यदि stanza पहचान में कठिनाई हो, तो c12_hin_a_cbse_01_002 (पद्यांश-वार भावार्थ) की दोबारा.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि दो कविताओं में同じ छंद है, तो उनका पद्य-विन्यास完全的に同じ है, जैसे देवसेना का गीत और कार्नेलयिा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित',
                  options: ['काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'केंद्रीय भाव (Central Idea) कविता का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना चाहता'],
                  hint: 'यदि stanza पहचान में कठिनाई हो, तो c12_hin_a_cbse_01_002 (पद्यांश-वार भावार्थ) की दोबारा समीक्षा.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि दो कविताओं में同じ छंद है, तो उनका पद्य-विन्यास完全的に同じ है, जैसे देवसेना का गीत और कार्नेलयिा का गीत में साम्यिका.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दोनों गीतों की एक पंक्तियों में लय चिह्नित करने के लिए कहिए (उदाहरण: तालियों से beats गिनिए)। फिर stanza-wise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Idea) कविता का वह मूल संदेश या सार है जिसे कवि संप्रेषित.',
          hint: 'If stuck, revisit Class 11 node c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना — केंद्रीय भाव.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर समझते हैं कि "केंद्रीय भाव" और "प्रधान रस" एक ही चीज़ के दो नाम हैं — जैसे "देवसेना का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Idea) कविता का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना चाहता',
                  options: ['केंद्रीय भाव (Central Idea) कविता का वह मूल संदेश या सार है जिसे कवि संप्रेषित करना चाहता', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित'],
                  hint: 'If stuck, revisit Class 11 node c11_hin_a_cbse_13_004 (जाग तुझको दूर जाना — केंद्रीय भाव और रस) and.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर समझते हैं कि "केंद्रीय भाव" और "प्रधान रस" एक ही चीज़ के दो नाम हैं — जैसे "देवसेना का गीत = वीर रस" और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दोनों कविताएँ **मौन वाचन** कराएँ, फिर **स्वर वाचन** — ध्वनि और लय पर ध्यान दें। 2.', 'पूछें: "कौन-सी पंक्ति पढ़कर तुम्हारी भुजाएँ फड़कीं?', '(वीर रस) कौन-सी पंक्ति पढ़कर आँखें नम हुईं?', '(करुण रस)" — इससे रस की **अनुभूति** पकड़ में आएगी। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_005', difficulty: 'standard',
          question: 'छंद काव्य की वह निश्चित संरचना है जिसमें पदों के वर्णों या मात्राओं का क्रमबद्ध.',
          hint: 'यदि अटके तो Class 11 के छंद नोड्स (c11_hin_a_cbse_13_005 आदि) के \'मात्रा-गणना अभ्यास\'.',
          misconception: 'छात्र समझते हैं कि \'छंद पहचानना\' केवल पदों के नाम याद रखना है (जैसे \'यह दोहा है\', \'यह चौपाई है\')। वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद काव्य की वह निश्चित संरचना है जिसमें पदों के वर्णों या मात्राओं का क्रमबद्ध विधान',
                  options: ['छंद काव्य की वह निश्चित संरचना है जिसमें पदों के वर्णों या मात्राओं का क्रमबद्ध विधान', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित'],
                  hint: 'यदि अटके तो Class 11 के छंद नोड्स (c11_hin_a_cbse_13_005 आदि) के \'मात्रा-गणना अभ्यास\' दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि \'छंद पहचानना\' केवल पदों के नाम याद रखना है (जैसे \'यह दोहा है\', \'यह चौपाई है\')। वास्तव में बोर्ड/कुशलता परीक्षा में पूछा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: Class 11 के छंद नोड (c11_hin_a_cbse_13_005, c11_hin_a_cbse_14_005, c11_hin_a_cbse_15_005, c11_hin_a_cbse_16_005).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_006', difficulty: 'standard',
          question: 'अलंकार (Figure of Speech) काव्य-भाषा की वह विशेष रचनात्मक युक्ति है जिसमें.',
          hint: 'यदि अलंकार पहचानने में अटकें: **c11_hin_a_cbse_13_006** (जाग तुझको दूर जाना — अलंकार).',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **अलंकार पहचानना = नाम बता देना** (यह अनुप्रास है, यह रूपक है)। वे **उद्धरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार (Figure of Speech) काव्य-भाषा की वह विशेष रचनात्मक युक्ति है जिसमें शब्दों के',
                  options: ['अलंकार (Figure of Speech) काव्य-भाषा की वह विशेष रचनात्मक युक्ति है जिसमें शब्दों के', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित'],
                  hint: 'यदि अलंकार पहचानने में अटकें: **c11_hin_a_cbse_13_006** (जाग तुझको दूर जाना — अलंकार) दोबारा करें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **अलंकार पहचानना = नाम बता देना** (यह अनुप्रास है, यह रूपक है)। वे **उद्धरण नहीं देते**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** c12_hin_a_cbse_01_002 (पद्यांश-वार भावार्थ) — जिन पदों में अलंकार हैं, उनका **संदर्भ** समझें। 2.', '**तालिका बनाएं:** 4 कॉलम — **पद | अलंकार नाम | उद्धरण | भाव-प्रभाव**। दोनों कविताओं के 5-5 प्रमुख अलंकार भरें। 3.', '**मौखिक अभ्यास:** प्रत्येक पद के लिए बोलें: *"कवि ने [अलंकार] इसलिए प्रयुक्त किया क्योंकि वह [भाव] को [कैसे] दिखाना.', '**पुनः निदान:** DIAGNOSTIC_QUESTION_2 और _4 दोबारा हल करें — अब **कारण** और **संयुक्त प्रभाव** लिख पाने चाहिए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
