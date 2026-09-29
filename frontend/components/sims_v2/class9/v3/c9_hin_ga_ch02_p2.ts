import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch02_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch02_p2',
    title: 'पाठ 2 · Part 2/3',
    subtitle: 'यह नोड केवल \'गौण विषय\' की पहचान, विश्लेषण और मुख्य विषय से संबंध पर केंद्रित है; इसमें.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 2 · Part 2/3',
    chapters: ['c9_hin_ga_ch02'],
    nodeIds: ['c9_hin_ga_cbse_02_007', 'c9_hin_ga_cbse_02_008', 'c9_hin_ga_cbse_02_009', 'c9_hin_ga_cbse_02_010', 'c9_hin_ga_cbse_02_011', 'c9_hin_ga_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'ल्हासा की ओर\' में ल्हासा, तिब्बत, यात्रा, राहुल सांकृत्यायन जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — गौण विषय', text: '\'ल्हासा की ओर\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — गौण', 'पाठ 2 — साहित्यिक', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 2/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — \'ल्हासा की ओर\' में भाषा-प्रयोग — राहुल सांकृत्यायन ने कैसे शब्द, वाक्य और शैली चुनी।', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — पदावली-लोकोक्ति — कोश-8-समूह (~60-शब्द) + लोकोक्ति-4-परत + परिवार-4 + जड़-4.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_007', difficulty: 'standard',
          question: '\'ल्हासा की ओर\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो नोड 006 (मुख्य विषय) दोहराएँ और पाठ के 3-4 मुख्य प्रसंग लिखकर उनसे \'बार-बार.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः \'गौण विषय\' को \'गौण पात्र की समस्या\' समझ लेते हैं। उदाहरण: पाठ 2 में नायिका की सहेली.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्हासा की ओर\' के गौण विषय',
                  options: ['\'ल्हासा की ओर\' के गौण विषय', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'ल्हासा की ओर\' का कथानक', '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो नोड 006 (मुख्य विषय) दोहराएँ और पाठ के 3-4 मुख्य प्रसंग लिखकर उनसे \'बार-बार आने वाले.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः \'गौण विषय\' को \'गौण पात्र की समस्या\' समझ लेते हैं। उदाहरण: पाठ 2 में नायिका की सहेली \'राधा\' का बाल विवाह.' }
          ],
            remediations: { '2': { steps: ['**स्पष्टीकरण:** छात्र को समझाएँ — "गौण विषय एक \'लेबल\' है जैसे \'गरीबी\', \'जातिभेद\', \'शिक्षा का अभाव\' — यह किसी एक पात्र.', '**अभ्यास:** पाठ से 5 वाक्य/संवाद चुनवाएँ जो एक ही विचार (जैसे \'स्त्री पर नियंत्रण\') की ओर इशारा करते हों — छात्र को.', '**तुलना तालिका बनवाएँ:** | पात्र/घटना | गौण विषय | | राधा का बाल विवाह | बाल विवाह / स्त्री एजेंसी का अभाव | | नायिका.', '**बोर्ड-शैली प्रश्न दें:** "पाठ में \'गौण विषय X\' के दो प्रमाण दीजिए और समझाइए कि यह मुख्य विषय से कैसे जुड़ता है".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_008', difficulty: 'standard',
          question: '\'ल्हासा की ओर\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो **\'अलंकार की परिभाषा\' (कक्षा 8 व्याकरण)** और **\'इंद्रियाँ व उनकी संवेदनाएँ\'.',
          misconception: 'छात्र अक्सर **\'रूपक\' और \'उपमा\' को एक ही मान लेते हैं** क्योंकि दोनों में तुलना होती है। वे \'जैसे/समान\' शब्द न देखकर भी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्हासा की ओर\' में बिंब (imagery)',
                  options: ['\'ल्हासा की ओर\' में बिंब (imagery)', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'ल्हासा की ओर\' का कथानक', '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **\'अलंकार की परिभाषा\' (कक्षा 8 व्याकरण)** और **\'इंद्रियाँ व उनकी संवेदनाएँ\' (कक्षा 6.',
                  misconception: 'छात्र अक्सर **\'रूपक\' और \'उपमा\' को एक ही मान लेते हैं** क्योंकि दोनों में तुलना होती है। वे \'जैसे/समान\' शब्द न देखकर भी रूपक को उपमा कह देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**रंगीन कार्ड बनाओ:** लाल कार्ड पर \'उपमेय\', नीले पर \'उपमान\', पीले पर \'संकेत शब्द (जैसे/समान)\'। 2.', '**10 वाक्य छाँटो** (पाठ/अखबार/विज्ञापन से) और प्रत्येक को कार्ड पर रखकर छाँटो: संकेत शब्द है → उपमा; बिना संकेत शब्द.', '**खुद से पूछो:** "क्या लेखक कह रहा है A, B *जैसा* है या A *है* B?" — यही निर्णायक प्रश्न है। 4.', 'दो दिन तक रोज 5 वाक्य बनाओ (2 उपमा, 3 रूपक) और साथी से जँचवाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_009', difficulty: 'standard',
          question: '\'ल्हासा की ओर\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके हों, तो नोड **c9_hin_ga_cbse_02_008** (बिंब और रूपक) के कार्यित उदाहरण दोबारा.',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास** को **विरोधाभासी स्थिति (कॉन्ट्राडिक्टरी सिचुएशन)** समझ लेते हैं। **गलत तर्क:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्हासा की ओर\' में विरोधाभास',
                  options: ['\'ल्हासा की ओर\' में विरोधाभास', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'ल्हासा की ओर\' का कथानक', '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके हों, तो नोड **c9_hin_ga_cbse_02_008** (बिंब और रूपक) के कार्यित उदाहरण दोबारा देखें.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास** को **विरोधाभासी स्थिति (कॉन्ट्राडिक्टरी सिचुएशन)** समझ लेते हैं। **गलत तर्क:** "पात्र गरीब है लेकिन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — विरोधाभास के लिए:** छात्र को 3 वाक्य दें: (क) "वह रो रहा था पर आँखें सूखी थीं" (विरोधाभास), (ख) "गरीब अमीर से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_010', difficulty: 'standard',
          question: '\'ल्हासा की ओर\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो **\'व्यंजना शक्ति\' (साहित्यिक युक्ति)** और **\'कथानक के प्रमुख मोड़\' (Plot.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **"मुख्य शब्द" का अर्थ "कठिन/क्लिष्ट/तत्सम शब्द" ही होता है** — इसलिए वे सरल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्हासा की ओर\' की पदावली',
                  options: ['\'ल्हासा की ओर\' की पदावली', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'ल्हासा की ओर\' का कथानक', '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **\'व्यंजना शक्ति\' (साहित्यिक युक्ति)** और **\'कथानक के प्रमुख मोड़\' (Plot Points)** — इन.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **"मुख्य शब्द" का अर्थ "कठिन/क्लिष्ट/तत्सम शब्द" ही होता है** — इसलिए वे सरल शब्दों (जैसे: माँ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पाठ से 5 सरल शब्द चुनवाएँ** (जैसे: आँगन, चूल्हा, बटुआ, पगडंडी, साँझ) और पूछें — "इनका शब्दकोश अर्थ क्या है?" (छात्र.', '**फिर वही शब्द पाठ के विशिष्ट प्रसंग में रखकर पूछें** — "जब विधवा माँ कहती है \'मेरा आँगन सूना है\', तो \'आँगन\' यहाँ क्या.', '**शिक्षक स्वयं मॉडल करके दिखाएँ**: शब्दकोश अर्थ → प्रसंग → पात्र की मनोदशा → व्यंजक अर्थ — यह **4-चरणीय मॉडल** बार-बार.', '**अभ्यास**: छात्र से कहें — "पाठ के किसी एक पृष्ठ से 3 सरल शब्द चुनो और उनकी व्यंजना लिखो" — जाँचें और फीडबैक दें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_011', difficulty: 'standard',
          question: '\'ल्हासा की ओर\' में भाषा-प्रयोग — राहुल सांकृत्यायन ने कैसे शब्द, वाक्य और शैली.',
          hint: 'यदि अटके तो **पदावली: मुख्य शब्द (c9_hin_ga_cbse_02_010)** के "भाव-बोध" और "श्रेणीकरण".',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "भाषा-प्रयोग" का अर्थ केवल **व्याकरणिक शुद्धता (Grammatical Correctness)** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्हासा की ओर\' में भाषा-प्रयोग',
                  options: ['\'ल्हासा की ओर\' में भाषा-प्रयोग', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'ल्हासा की ओर\' का कथानक', '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **पदावली: मुख्य शब्द (c9_hin_ga_cbse_02_010)** के "भाव-बोध" और "श्रेणीकरण" अभ्यास.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "भाषा-प्रयोग" का अर्थ केवल **व्याकरणिक शुद्धता (Grammatical Correctness)** या **कठिन शब्दों का.' }
          ],
            remediations: { 'grammatical-correctness-vocabulary-knowledge-ide': { steps: ['**चरण 1 (Contrast Drill):** छात्र को पाठ के एक वाक्य के 3 संस्करण दें: मूल, एक \'शुद्ध/औपचारिक\' संस्करण, एक.', '**चरण 2 (Author\'s Choice):** पूछें: "लेखक ने मूल संस्करण ही क्यों चुना?', 'यदि वह दूसरा चुनता तो पात्र/प्रसंग कैसे बदल जाता?" — इससे **साहित्यिक निर्णय (Authorial Decision)** समझ में आएगा। 3.', '**चरण 3 (Board Answer Template):** बोर्ड उत्तर का ढांचा दें: **(क) भाषिक लक्षण पहचानो**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_02_012', difficulty: 'standard',
          question: 'पदावली-लोकोक्ति — कोश-8-समूह (~60-शब्द) + लोकोक्ति-4-परत + परिवार-4 + जड़-4.',
          hint: 'यदि अटका हुआ महसूस हो तो: कोश-1 + लोकोक्ति-1 + जड़-1 — तीन-रजिस्टर-कोश, लोकोक्ति-4-परत.',
          misconception: 'छात्र \'शब्द-कोश-रटना-है-परीक्षा-के-लिए\' समझते हैं — नौकरी-अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली-लोकोक्ति — कोश-8-समूह (~60-शब्द) + लोकोक्ति-4-परत + परिवार-4 + जड़-4:',
                  options: ['पदावली-लोकोक्ति — कोश-8-समूह (~60-शब्द) + लोकोक्ति-4-परत + परिवार-4 + जड़-4:', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'ल्हासा की ओर\' का कथानक', '\'ल्हासा की ओर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो: कोश-1 + लोकोक्ति-1 + जड़-1 — तीन-रजिस्टर-कोश, लोकोक्ति-4-परत, एक-जड़-फल.',
                  misconception: 'छात्र \'शब्द-कोश-रटना-है-परीक्षा-के-लिए\' समझते हैं — नौकरी-अर्थ.' }
          ],
            remediations: { '60-60': { steps: ['**उपचार**: (1) कोश-3 — तकनीकी-दुर्बोध-नाम-3-रजिस्टर। (2) भाव-1 — वधू-5-भाव-श्रोता-के-1-मालिक। (3) लोकोक्ति-4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
