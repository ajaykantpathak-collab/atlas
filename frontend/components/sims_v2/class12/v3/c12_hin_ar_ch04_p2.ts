import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch04_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch04_p2',
    title: 'कैमरे में बंद अपाहजि · Part 2/3',
    subtitle: 'He wrote in the people\'s tongue so the people could read it',
    classLevel: 12, subject: 'hin_ar', topic: 'कैमरे में बंद अपाहजि · Part 2/3',
    chapters: ['c12_hin_ar_ch04'],
    nodeIds: ['c12_hin_ar_cbse_04_007', 'c12_hin_ar_cbse_04_008', 'c12_hin_ar_cbse_04_009', 'c12_hin_ar_cbse_04_010', 'c12_hin_ar_cbse_04_011', 'c12_hin_ar_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Progressive poetry reader', intro: 'A poet-journalist who wrote for the ignored decides the poem itself must speak like them.', goal: 'Read Nagarjun through the Progressive movement — Khari Boli as politics, the street performer as systemic critique.' },
    discovery: {
        question: 'Nagarjun chooses Khari Boli — the people\'s spoken tongue — over Sanskritised literary Hindi, for poems about peasants and street performers. What does the language choice itself declare?',
        options: ['Democratic intent — the poem must be readable by the very people it depicts; medium is the politics', 'Khari Boli is easier to write', 'Sanskrit was banned', 'Nothing — language is neutral'],
        answer: 'Democratic intent — the poem must be readable by the very people it depicts; medium is the politics',
        hook: 'Progressive poets like Nagarjun — journalist, trilingual, champion of the ignored — prove the micro reveals the macro: a street performer\'s day exposes the whole machinery of exploitation. Journalism trained the eye; poetry carried the indictment.',
    },
    teaching: [
        { title: 'कैमरे में बंद अपाहजि — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'इस कविता में **प्रतीक (Symbol)** वह ठोस वस्तु या स्थिति है जो अमूर्त सामाजिक-राजनीतिक सत्य को व्यक्त करती है (जैसे: कैमरा = मीडियाई निगाह/वस्तुकरण), और **बिंब (Imagery)** वह संवेदनात्मक वर्णन है जो.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk with the street performer: read rustic speech as deliberate politics, trace how one \'small\' life opens onto the entire structure that exploits it, and test why context turns description into critique.',
        labels: ['कैमरे में बंद अपाहजि'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_011', title: 'कैमरे में बंद अपाहजि — व्याकरण: पद्य में भाषा-प्रयोग',
          caseStudy: { intro: 'Have you ever noticed how a poet can say "कैमरे में बंद" instead of "कैमरे के अंदर बंद किया गया" and it hits differently?',
            decisions: [{ prompt: 'पद्य में \'लोप\' (ellipsis) की परिभाषा लिखिए और कविता "कैमरे में बंद अपाहिज" से इसका एक उदाहरण दीजिए।', options: [
                { text: 'लोप वह व्याकरणिक युक्ति है जिसमें वाक्य के किसी अवयव (कर्ता, कर्म, क्रिया, सर्वनाम आदि)', outcome: 'लोप वह व्याकरणिक युक्ति है जिसमें वाक्य के किसी अवयव (कर्ता, कर्म, क्रिया, सर्वनाम आदि) का जानबूझकर.' },
                { text: 'difficult vs easy words', outcome: 'Not quite — Students treat "पद्य में भाषा-प्रयोग" as a labelling exercise — they memorize definitions of लोप.', reveals: 'students-treat-as-a-labelling' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'After a funds scandal in your student council, your group\'s protest poster is all slogans — \'We will shout for change!\' A senior suggests adding a line addressing each silent member by name, and clipping the actual audit report to the bottom.',
            decisions: [{ prompt: 'What does the structure of \'देश में चाँद विकृत\' say about the senior\'s edits?', options: [
                { text: 'Keep both — the poem\'s arc runs collective declaration (\'we\') → direct accusation (\'you\') → documentary proof; slogans alone rage at the air, but naming the complacent and ending with the audit clipping converts protest into verified indictment.', outcome: 'The poem performs its argument through structural stages, finishing with a newspaper report that turns poetic charge into documented fact — the senior is rebuilding exactly that engine.' },
                { text: 'Drop the audit — raw collective emotion is more powerful than paperwork.', outcome: 'The poem deliberately ends with reportage, not refrain: the clipping is the climax that proves \'vikrit\' isn\'t exaggeration but record; without it the poster stays an unfalsifiable mood.', reveals: 'rage-beats-record' },
                { text: 'Drop the \'you\' lines — naming members turns unity into blame.', outcome: 'The poem\'s middle stanzas are precisely the turn from \'we\' to \'you\' — the interrogation of the complacent is what makes the final evidence land; skipping it leaves only self-congratulation.', reveals: 'unity-means-no-accusation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear a poem\'s language as its argument — and see how progressive literature makes the marginal the centre.',
            decisions: [{ prompt: 'What comes next? कैमरे में बंद अपाहजि · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कैमरे में बंद अपाहजि · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_007', difficulty: 'standard',
          question: 'इस कविता में **प्रतीक (Symbol)** वह ठोस वस्तु या स्थिति है जो अमूर्त.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) के \'प्रतीक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'कैमरा\' कविता में केवल एक तकनीकी उपकरण (technological device) है** और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस कविता में **प्रतीक (Symbol)** वह ठोस वस्तु या स्थिति है जो अमूर्त सामाजिक-राजनीतिक',
                  options: ['इस कविता में **प्रतीक (Symbol)** वह ठोस वस्तु या स्थिति है जो अमूर्त सामाजिक-राजनीतिक', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) के \'प्रतीक की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'कैमरा\' कविता में केवल एक तकनीकी उपकरण (technological device) है** और \'अपाहजि\' केवल एक पात्र.' }
          ],
            remediations: { 'technological-device-character-multi-valency': { steps: ['**चरण 1:** छात्र से कहो: "कविता की पहली दो पंक्तियाँ पढ़ो और बताओ \'कैमरा\' यहाँ क्या *कर* रहा है — केवल फोटो खींच रहा है.', '**चरण 2:** नोड **c11_hin_ar_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) या **c11_hin_ar_cbse_14_007** (बादल को.', '**चरण 3:** एक छोटा अभ्यास दो: "अपने आसपास की किसी वस्तु (घड़ी, दरवाजा, खिड़की) को लेकर दो अर्थ लिखो — भौतिक और.', '**पुनर्निदान:** उपरोक्त DIAGNOSTIC_QUESTION_2 (फ्रेम का अर्थ) फिर से पूछो; यदि अब भी भौतिक अर्थ पर अटके तो नोड.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_008', difficulty: 'standard',
          question: '\'कैमरे में बंद अपाहिज\' का मुख्य भाव है — **आधुनिक मीडिया (कैमरा/टीवी) द्वारा.',
          hint: 'यदि अटके तो c12_hin_ar_cbse_04_002 (पद्यांश-वार भावार्थ) के पद 1, 3, 5 को दोबारा पढ़ें और.',
          misconception: '**सबसे आम भ्रम:** छात्र मान लेते हैं कि कविता का मुख्य भाव \'अपाहिज की पीड़ा\' या \'विकलांगों के प्रति सहानुभूति\' है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कैमरे में बंद अपाहिज\' का मुख्य भाव है',
                  options: ['\'कैमरे में बंद अपाहिज\' का मुख्य भाव है', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,'],
                  hint: 'यदि अटके तो c12_hin_ar_cbse_04_002 (पद्यांश-वार भावार्थ) के पद 1, 3, 5 को दोबारा पढ़ें और \'दर्शक\' व.',
                  misconception: '**सबसे आम भ्रम:** छात्र मान लेते हैं कि कविता का मुख्य भाव \'अपाहिज की पीड़ा\' या \'विकलांगों के प्रति सहानुभूति\' है। **वास्तविकता:** कविता.' }
          ],
            remediations: { '1': { steps: ['चरण 1: छात्र से कहें — "कविता को फिर से पढ़ो, पर इस बार **अपाहिज को भूल जाओ**; केवल **कैमरा** और **दर्शक** क्या कर रहे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_009', difficulty: 'standard',
          question: '**गौण भाव** कविता में वह द्वितीयक भावना या विचार है जो केंद्रीय भाव (मुख्य.',
          hint: 'यदि अटका हुआ महसूस हो तो: कक्षा 11 की किसी भी कविता (जैसे \'जाग तुझको दूर जाना\'.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'गौण भाव\' को \'मुख्य भाव का उप-विभाजन\' (sub-part) मान लेते हैं** — जैसे मुख्य भाव = अपाहिज का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**गौण भाव** कविता में वह द्वितीयक भावना या विचार है जो केंद्रीय भाव (मुख्य विषय) का पूरक',
                  options: ['**गौण भाव** कविता में वह द्वितीयक भावना या विचार है जो केंद्रीय भाव (मुख्य विषय) का पूरक', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: कक्षा 11 की किसी भी कविता (जैसे \'जाग तुझको दूर जाना\'.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'गौण भाव\' को \'मुख्य भाव का उप-विभाजन\' (sub-part) मान लेते हैं** — जैसे मुख्य भाव = अपाहिज का दुख, तो गौण भाव.' }
          ],
            remediations: { 'sub-part': { steps: ['**पुनः पढ़ो:** कविता के केवल वे अंश छांटो जहां **कैमरा/फोटोग्राफर/मीडिया** की बात है (गौण भाव) और जहां **कवि \'मैं\' या.', '**तुलना तालिका बनाओ:** तीन कॉलम — (क) केंद्रीय भाव की पंक्तियाँ, (ख) गौण भाव की पंक्तियाँ, (ग) विषयांतर की पंक्तियाँ।.', '**मौखिक अभ्यास:** किसी सहपाठी को समझाओ: "गौण भाव = फोटोग्राफर की नज़र, विषयांतर = कवि की नज़र"। यदि तुम यह अंतर 30.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_3 फिर से हल करो बिना नोट्स देखे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_010', difficulty: 'standard',
          question: 'पदावली किसी रचना में प्रयुक्त विशिष्ट शब्दों, मुहावरों और लोकोक्तियों की वह.',
          hint: 'यदि फँस जाएँ तो **कक्षा 11 आरोह काव्य खंड की किसी भी पदावली (जैसे.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पदावली\' का अर्थ है **\'कठिन शब्दों के शब्दकोशीय अर्थ रटना\'**। वे मुहावरों का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली किसी रचना में प्रयुक्त विशिष्ट शब्दों, मुहावरों और लोकोक्तियों की वह सूची है',
                  options: ['पदावली किसी रचना में प्रयुक्त विशिष्ट शब्दों, मुहावरों और लोकोक्तियों की वह सूची है', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,'],
                  hint: 'यदि फँस जाएँ तो **कक्षा 11 आरोह काव्य खंड की किसी भी पदावली (जैसे c11_hin_ar_cbse_13_010)** को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पदावली\' का अर्थ है **\'कठिन शब्दों के शब्दकोशीय अर्थ रटना\'**। वे मुहावरों का **\'सामान्य.' }
          ],
            remediations: { 'poetic-functionality-3-1': { steps: ['**चरण 1:** कविता को पुनः पढ़ें और **केवल 5 शब्द/मुहावरे** चुनें जो सर्वाधिक \'भारी\' लगें (अपाहिज, कैमरे में बंद.', '**चरण 2:** प्रत्येक के लिए **तीन-स्तरीय तालिका** बनाएँ: (क) शब्दकोश अर्थ, (ख) कविता-प्रसंग अर्थ, (ग) काव्य-प्रयोजन.', '**चरण 3:** किसी एक शब्द पर **50 शब्दों का सूक्ष्म निबंध** लिखें: "यह शब्द कविता के केंद्रीय भाव को कैसे आगे बढ़ाता है?".', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_4 को दोबारा हल करें — यदि अब \'दर्शक\' की सक्रिय भूमिका स्पष्ट हो, तो पदावली.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग (Language Use in Poetry) refers to the deliberate.',
          hint: 'If stuck on समास-विच्छेद or तत्सम/तद्भव पहचान: revisit Class 10 Hindi Vyakaran (समास.',
          misconception: 'Students treat "पद्य में भाषा-प्रयोग" as a labelling exercise — they memorize definitions of लोप, अन्वय, समास and hunt.',
          parts: [
                { id: 'a', prompt: 'कविता में प्रयुक्त किन्हीं दो समासों की पहचान कीजिए, उनके भेद बताइए, और समझाइए कि कवि ने पद-युग्म के बजाय समास क्यों चुना होगा।', answer: 'उदाहरण 1: "कैमरेबंद" (यदि प्रयुक्त हो) या "अपाहिज"',
                  options: ['उदाहरण 1: "कैमरेबंद" (यदि प्रयुक्त हो) या "अपाहिज"', 'difficult vs easy words'],
                  hint: 'If stuck on समास-विच्छेद or तत्सम/तद्भव पहचान: revisit Class 10 Hindi Vyakaran (समास प्रकरण) and.',
                  misconception: 'Students treat "पद्य में भाषा-प्रयोग" as a labelling exercise — they memorize definitions of लोप, अन्वय, समास and hunt for examples.' },
                { id: 'b', prompt: 'कविता में तत्सम, तद्भव, और देशज शब्दों का अनुपात विश्लेषित कीजिए। कवि ने इस मिश्रण को क्यों चुना होगा?', answer: 'पंक्ति: "कैमरे में बंद अपाहिज / देखता है सपने"',
                  options: ['पंक्ति: "कैमरे में बंद अपाहिज / देखता है सपने"', 'difficult vs easy words'],
                  hint: 'If stuck on समास-विच्छेद or तत्सम/तद्भव पहचान: revisit Class 10 Hindi Vyakaran (समास प्रकरण) and.',
                  misconception: 'Students treat "पद्य में भाषा-प्रयोग" as a labelling exercise — they memorize definitions of लोप, अन्वय, समास and hunt for examples.' }
          ],
            remediations: { 'students-treat-as-a-labelling': { steps: ['Take one stanza. Rewrite it in standard prose (गद्य रूप).', 'Compare word-by-word — what is missing (लोप)? What is reordered (अन्वय)? What is compounded (समास)?', 'For each difference, write ONE sentence: "कवि ने X किया ताकि Y प्रभाव पड़े।"', 'Practice two past board questions (c12_hin_ar_cbse_04_014) using this comparison table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "पद्य में भाषा-प्रयोग" as a labelling exercise — they memorize definitions of लोप, अन्वय, समास and hunt.',
          parts: [
                { id: 'a', prompt: 'क्या कविता में क्रिया-विशेषण (adverbial) प्रयोग सामान्य गद्य से भिन्न है? एक उद्धरण देकर मूल्यांकन कीजिए कि यह भिन्नता काव्यात्मक प्रभाव कैसे उत्पन्न करती है।', answer: 'हाँ, भिन्न है। उदाहरण: "चुपचाप / वह देखता रहता है"',
                  options: ['हाँ, भिन्न है। उदाहरण: "चुपचाप / वह देखता रहता है"', 'difficult vs easy words'],
                  hint: 'If stuck on समास-विच्छेद or तत्सम/तद्भव पहचान: revisit Class 10 Hindi Vyakaran (समास प्रकरण) and.',
                  misconception: 'Students treat "पद्य में भाषा-प्रयोग" as a labelling exercise — they memorize definitions of लोप, अन्वय, समास and hunt for examples.' }
          ],
            remediations: { 'students-treat-as-a-labelling': { steps: ['Take one stanza. Rewrite it in standard prose (गद्य रूप).', 'Compare word-by-word — what is missing (लोप)? What is reordered (अन्वय)? What is compounded (समास)?', 'For each difference, write ONE sentence: "कवि ने X किया ताकि Y प्रभाव पड़े।"', 'Practice two past board questions (c12_hin_ar_cbse_04_014) using this comparison table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_012', difficulty: 'standard',
          question: 'बोध-प्रश्नों के दो प्रकार होते हैं: (1) **वस्तुनिष्ठ** — जिनका उत्तर एक शब्द.',
          hint: 'यदि \'कैमरा\' प्रतीक या \'दान की रसीद\' व्यंग्य समझ न आए, तो **c12_hin_ar_cbse_04_007.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि आशय-सूचक प्रश्न का उत्तर देने के लिए **\'कविता का सारांश\' लिखना काफी है**। वे लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्नों के दो प्रकार होते हैं: (1) **वस्तुनिष्ठ**',
                  options: ['बोध-प्रश्नों के दो प्रकार होते हैं: (1) **वस्तुनिष्ठ**', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,'],
                  hint: 'यदि \'कैमरा\' प्रतीक या \'दान की रसीद\' व्यंग्य समझ न आए, तो **c12_hin_ar_cbse_04_007 (प्रतीक)** और.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि आशय-सूचक प्रश्न का उत्तर देने के लिए **\'कविता का सारांश\' लिखना काफी है**। वे लिखते हैं: "कविता में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहो — "एक पद्यांश लो, उस पर **केवल 3 वस्तुनिष्ठ प्रश्न** बनाओ (विकल्प सहित) और फिर **उनके उत्तर.', '- E: कौन सी **ठीक पंक्ति/शब्द** प्रमाण है?', '(पेंसिल से अंडरलाइन करो) - E: यह प्रमाण तुम्हारे दावे को कैसे सिद्ध करता है?', '- L: यह कविता के **केंद्रीय भाव** से कैसे जुड़ता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
