import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch11_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch11_p2',
    title: 'पाठ 11 · Part 2/3',
    subtitle: 'This node covers identification, evidence-based analysis, and thematic connection.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 11 · Part 2/3',
    chapters: ['c9_hin_ga_ch11'],
    nodeIds: ['c9_hin_ga_cbse_11_007', 'c9_hin_ga_cbse_11_008', 'c9_hin_ga_cbse_11_009', 'c9_hin_ga_cbse_11_010', 'c9_hin_ga_cbse_11_011', 'c9_hin_ga_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'झाँसी की रानी\' में झाँसी, रानी, वीरता, स्वतंत्रता जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — गौण विषय', text: '\'झाँसी की रानी\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — गौण', 'पाठ 11 — साहित्यिक', 'पाठ 11 — पदावली', 'पाठ 11 — व्याकरण', 'पाठ 11 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 2/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — \'झाँसी की रानी\' में भाषा-प्रयोग — सुभद्रा कुमारी चौहान ने कैसे शब्द, वाक्य और शैली चुनी।', answer: '11 -', options: ['11 -', '11 - -'] },
            { id: 's2', label: '11 - -', prompt: 'Which idea is this? — \'झाँसी की रानी\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '11 - -', options: ['11 - -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 11 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_007', difficulty: 'standard',
          question: '\'झाँसी की रानी\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'Review node c9_hin_ga_cbse_11_006 (मुख्य विषय और संदेश) — specifically the worked.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'गौण विषय\' = \'मुख्य विषय का उप-विषय\' (sub-topic of main theme) — जैसे मुख्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'झाँसी की रानी\' के गौण विषय',
                  options: ['\'झाँसी की रानी\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'झाँसी की रानी\' का कथानक', '\'झाँसी की रानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review node c9_hin_ga_cbse_11_006 (मुख्य विषय और संदेश) — specifically the worked examples showing.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'गौण विषय\' = \'मुख्य विषय का उप-विषय\' (sub-topic of main theme) — जैसे मुख्य विषय \'संघर्ष\' है तो गौण.' }
          ],
            remediations: { 'sub-topic-of-main-theme': { steps: ['**चरण 1 (स्पष्टीकरण):** छात्र से कहें: "मुख्य विषय एक **नदी** है; गौण विषय उसके किनारे बहने वाली **सहायक नदियाँ** हैं.', '**चरण 2 (अभ्यास):** पाठ 11 से 5 प्रसंग कार्ड बनवाएं। छात्र को दो ढेर बनाने को कहें: \'मुख्य कथानक को सीधे बढ़ाने वाले\'.', '**चरण 3 (लिंकिंग वाक्य):** प्रत्येक गौण विषय के लिए यह वाक्य-ढांचा दें: "यह गौण विषय मुख्य विषय को.', '**चरण 4 (बोर्ड-शैली उत्तर):** एक 3-अंक का प्रश्न दें: "पाठ 11 में किन्हीं दो गौण विषयों की पहचान कीजिए और स्पष्ट कीजिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_008', difficulty: 'standard',
          question: '\'झाँसी की रानी\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो **c9_hin_ga_cbse_11_001 (रचनाकार परिचय)** और **c9_hin_ga_cbse_11_006 (मुख्य.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **हर तुलना रूपक होती है** और **"जैसे/सा/सी" वाले वाक्य भी रूपक हैं**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'झाँसी की रानी\' में बिंब (imagery)',
                  options: ['\'झाँसी की रानी\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'झाँसी की रानी\' का कथानक', '\'झाँसी की रानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c9_hin_ga_cbse_11_001 (रचनाकार परिचय)** और **c9_hin_ga_cbse_11_006 (मुख्य विषय)**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **हर तुलना रूपक होती है** और **"जैसे/सा/सी" वाले वाक्य भी रूपक हैं**। वास्तविकता: रूपक में **कोई.' }
          ],
            remediations: { '6-8': { steps: ['**स्पष्ट भेद सिखाएँ:** बोर्ड पर दो कॉलम बनाएँ — "उपमा" और "रूपक"। 10 वाक्य दें (मिश्रित)। छात्र से कहें: "पहले.', '**रूपक-निर्माण अभ्यास:** 5 अमूर्त संज्ञाएँ दें (क्रोध, समय, आशा, दुःख, ज्ञान)। छात्र से कहें: "प्रत्येक के लिए **एक.', '**प्रभाव-लेखन:** प्रत्येक रूपक के लिए एक पंक्ति लिखवाएँ: "कवि ने यह तुलना **क्यों** की?', 'पाठक को क्या **महसूस** कराना चाहा?" — यही बोर्ड उत्तर का **तीसरा चरण** है। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_009', difficulty: 'standard',
          question: '\'झाँसी की रानी\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटका हुआ महसूस हो तो **c9_hin_ga_cbse_11_008 (बिंब और रूपक)** के कार्यित उदाहरण.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **विरोधाभास को \'विरोधाभास अलंकार\' (Oxymoron) समझ लेते हैं** और दोनों को एक मानकर "दो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'झाँसी की रानी\' में विरोधाभास',
                  options: ['\'झाँसी की रानी\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'झाँसी की रानी\' का कथानक', '\'झाँसी की रानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c9_hin_ga_cbse_11_008 (बिंब और रूपक)** के कार्यित उदाहरण (Worked.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **विरोधाभास को \'विरोधाभास अलंकार\' (Oxymoron) समझ लेते हैं** और दोनों को एक मानकर "दो विपरीत शब्दों का मेल".' }
          ],
            remediations: { 'oxymoron': { steps: ['**चरण 1 (स्पष्टीकरण):** छात्र को बैठाकर पूछो: "अगर मैं कहूँ \'मौन बोलता है\' — यहाँ कौन-सा अलंकार है?" यदि वह \'विरोधाभास.', 'अब बताओ यह वस्तु किस अमूर्त भाव का **वाहक (vehicle)** बनी?" — यह **प्रसंग-आधारित अर्थ-निर्माण (context-dependent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_010', difficulty: 'standard',
          question: '\'झाँसी की रानी\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो **क्लास 9 हिंदी व्याकरण पुस्तक के "शब्द-शक्ति" अध्याय** को दोहराएँ — विशेषकर.',
          misconception: '**विशिष्ट भ्रांति**: *"मुख्य शब्द वे ही हैं जो कठिन हों या कम आए हों।"* — छात्र **आवृत्ति (frequency)** और **कठिनाई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'झाँसी की रानी\' की पदावली',
                  options: ['\'झाँसी की रानी\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'झाँसी की रानी\' का कथानक', '\'झाँसी की रानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **क्लास 9 हिंदी व्याकरण पुस्तक के "शब्द-शक्ति" अध्याय** को दोहराएँ — विशेषकर व्यंजना के.',
                  misconception: '**विशिष्ट भ्रांति**: *"मुख्य शब्द वे ही हैं जो कठिन हों या कम आए हों।"* — छात्र **आवृत्ति (frequency)** और **कठिनाई (difficulty)** को मुख्य.' }
          ],
            remediations: { 'frequency-difficulty': { steps: ['**पुनर्पाठ (Re-read)**: पाठ 11 को **केवल मुख्य शब्द खोजने के लिए** पढ़ें — हर उस शब्द को घेरें जो **भावुकता, द्वंद्व.', '**शक्ति-परीक्षण (Power-test)**: प्रत्येक घिरे शब्द के लिए पूछें — *"क्या यहाँ इसका सीधा अर्थ (अभिधा) पूरा न्याय करता.', '**संबंध-मानचित्र (Link-map)**: शब्द को केंद्र में रखकर तीर खींचें — **किस पात्र से जुड़ा?', 'कैसे वातावरण बनाता है?** 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_011', difficulty: 'standard',
          question: '\'झाँसी की रानी\' में भाषा-प्रयोग — सुभद्रा कुमारी चौहान ने कैसे शब्द, वाक्य और.',
          hint: 'यदि अटके तो **कक्षा 8 हिंदी व्याकरण: शब्द-भेद, वाक्य-भेद, मुहावरे-लोकोक्तियाँ** दोहराएँ.',
          misconception: 'छात्र प्रायः मान लेते हैं कि **\'भाषा-प्रयोग\' = \'अलंकार/मुहावरे पहचानना\'**। वे पाठ में रूपक, उपमा, यमक ढूंढकर संतुष्ट हो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'झाँसी की रानी\' में भाषा-प्रयोग',
                  options: ['\'झाँसी की रानी\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'झाँसी की रानी\' का कथानक', '\'झाँसी की रानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **कक्षा 8 हिंदी व्याकरण: शब्द-भेद, वाक्य-भेद, मुहावरे-लोकोक्तियाँ** दोहराएँ — विशेषतः.',
                  misconception: 'छात्र प्रायः मान लेते हैं कि **\'भाषा-प्रयोग\' = \'अलंकार/मुहावरे पहचानना\'**। वे पाठ में रूपक, उपमा, यमक ढूंढकर संतुष्ट हो जाते हैं और यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला चरण:** छात्र को पाठ 11 के **एक ही पात्र के दो संवाद** (आरंभिक और अंतिम) साथ रखकर पढ़वाएँ; अंतर रेखांकित करवाएँ.', '**दूसरा चरण:** पूछें: "यदि लेखक दोनों जगह एक-सी भाषा रखता तो पात्र का विकास (character arc) कैसे दिखता?" — इससे.', '**तीसरा चरण:** छात्र से कहें: "अब तुम इस पात्र की ओर से एक डायरी-प्रविष्टि लिखो — पहले गाँव की बोली में, फिर शहर.', '**चौथा चरण:** अंत में बोर्ड-शैली का एक लघु-उत्तर लिखवाएँ: "पाठ 11 में भाषा-प्रयोग पात्र-चित्रण को कैसे सशक्त बनाता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_11_012', difficulty: 'standard',
          question: '\'झाँसी की रानी\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके तो नोड 002 (कथानक), 004 (नायक पात्र-चित्रण) और 006 (मुख्य विषय) को दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि आशय-सूचक (inferential) प्रश्न का उत्तर \'अपनी कल्पना से\' या \'सामान्य ज्ञान से\' देना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'झाँसी की रानी\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'झाँसी की रानी\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'झाँसी की रानी\' का कथानक', '\'झाँसी की रानी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो नोड 002 (कथानक), 004 (नायक पात्र-चित्रण) और 006 (मुख्य विषय) को दोबारा पढ़ें — विशेषकर.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि आशय-सूचक (inferential) प्रश्न का उत्तर \'अपनी कल्पना से\' या \'सामान्य ज्ञान से\' देना होता है। उदाहरण.' }
          ],
            remediations: { 'inferential-implication-guess-implicit-meaning': { steps: ['छात्र को एक छोटा गद्यांश दें जिसमें क्रिया और विशेषण दोनों हों (जैसे: "वह धीरे-धीरे बोला, आँखें नीची किए")। 2.', 'पूछें: "वह धीरे क्यों बोला?" — छात्र जो भी उत्तर दे, उससे पूछें: "पाठ में कौन से शब्द तुम्हारे उत्तर को सिद्ध करते.', 'यदि वह \'सामान्य ज्ञान\' से उत्तर दे (जैसे "शर्माता होगा"), तो पाठ में \'आँखें नीची किए\' को इंगित कर कहें: "यह शब्द.', 'अभ्यास कराएँ: प्रत्येक आशय-सूचक उत्तर के लिए **कम से कम दो पाठगत साक्ष्य (textual evidence) अनिवार्य** करें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
