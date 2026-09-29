import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch12_p2: SimDef = {
    id: 'v3_c11_hin_a_ch12_p2',
    title: 'पाठ 12 · Part 2/3',
    subtitle: 'यह नोड केवल **पाठ 12 (गौण विषय)** में आए उप-कथ्यों की पहचान, वर्गीकरण और मुख्य विषय से.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 12 · Part 2/3',
    chapters: ['c11_hin_a_ch12'],
    nodeIds: ['c11_hin_a_cbse_12_007', 'c11_hin_a_cbse_12_008', 'c11_hin_a_cbse_12_009', 'c11_hin_a_cbse_12_010', 'c11_hin_a_cbse_12_011', 'c11_hin_a_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'क्या हुआ\' में क्या-हुआ जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — गौण विषय', text: '\'क्या हुआ\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — गौण', 'पाठ 12 — साहित्यिक', 'पाठ 12 — पदावली', 'पाठ 12 — व्याकरण', 'पाठ 12 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_12_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 2/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — \'क्या हुआ\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।', answer: '12 -', options: ['12 -', '12 - -'] },
            { id: 's2', label: '12 - -', prompt: 'Which idea is this? — \'क्या हुआ\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '12 - -', options: ['12 - -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 12 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 12 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 12 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_007', difficulty: 'standard',
          question: '\'क्या हुआ\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो **c11_hin_a_cbse_12_006 (मुख्य विषय और संदेश)** और **c11_hin_a_cbse_12_002.',
          misconception: '**विशिष्ट भ्रांति:** *"गौण विषय = कम महत्वपूर्ण विषय / फिलर (filler) प्रसंग / केवल वातावरण निर्माण के लिए।"* **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्या हुआ\' के गौण विषय',
                  options: ['\'क्या हुआ\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्या हुआ\' का कथानक', '\'क्या हुआ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_12_006 (मुख्य विषय और संदेश)** और **c11_hin_a_cbse_12_002 (कथानक और.',
                  misconception: '**विशिष्ट भ्रांति:** *"गौण विषय = कम महत्वपूर्ण विषय / फिलर (filler) प्रसंग / केवल वातावरण निर्माण के लिए।"* **गलत तर्क:** छात्र सोचते हैं.' }
          ],
            remediations: { 'filler': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**चरण 1 — पुनर्पाठ (Re-read with lens):** छात्र से कहें — "पाठ को केवल इस प्रश्न के साथ पढ़ो: *\'यह प्रसंग मुख्य कहानी.', '**चरण 2 — वर्गीकरण (Categorize):** घेरे हुए प्रसंगों को तीन स्तंभों में बाँटो — (क) सामाजिक मुद्दा, (ख) सांस्कृतिक.', '**चरण 3 — सेतु निर्माण (Bridge-building):** प्रत्येक प्रसंग के लिए एक वाक्य लिखो: *"यह प्रसंग मुख्य विषय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_008', difficulty: 'standard',
          question: '\'क्या हुआ\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो **पाठ के किसी एक भाव-प्रधान अनुच्छेद** को तीन बार पढ़ो: पहली बार — केवल अर्थ.',
          misconception: 'छात्र अक्सर मानते हैं कि **\'बिंब = चित्र/वर्णन\' और \'रूपक = फैंसी तुलना\'** — यह गलती इसलिए होती है क्योंकि कक्षा 10 तक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्या हुआ\' में बिंब (imagery)',
                  options: ['\'क्या हुआ\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्या हुआ\' का कथानक', '\'क्या हुआ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **पाठ के किसी एक भाव-प्रधान अनुच्छेद** को तीन बार पढ़ो: पहली बार — केवल अर्थ के लिए.',
                  misconception: 'छात्र अक्सर मानते हैं कि **\'बिंब = चित्र/वर्णन\' और \'रूपक = फैंसी तुलना\'** — यह गलती इसलिए होती है क्योंकि कक्षा 10 तक अलंकारों को केवल.' }
          ],
            remediations: { '10': { steps: ['**पुनः पढ़ो** पाठ का कोई छोटा अंश (4-5 पंक्तियाँ) और **रंगीन कलम** से चिह्नित करो: लाल = दृश्य बिंब, नीला = श्रव्य, हरा.', '**रूपक-खोज:** हर वाक्य से पूछो — "क्या यहाँ A को B **बताया** गया है (न कि \'जैसा\' कहा गया)?" यदि हाँ, तो रूपक मिल गया। 3.', '**अर्थ-निकर्षण:** प्रत्येक चिह्नित बिंब/रूपक के लिए लिखो — "इससे मुझे क्या महसूस हुआ?" और "इससे लेखक क्या अतिरिक्त कहना.', '**अभ्यास:** प्रतिदिन एक अखबार संपादकीय/कविता से 2 बिंब + 1 रूपक निकालकर उपरोक्त तीन चरण दोहराओ — 5 दिन में स्वचालित हो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_009', difficulty: 'standard',
          question: '\'क्या हुआ\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_12_008 (बिंब और रूपक)** के \'कार्य-विधान\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **हर विरोधाभासी वाक्य \'विरोधाभास\' (Paradox) है** और **हर महत्वपूर्ण वस्तु.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्या हुआ\' में विरोधाभास',
                  options: ['\'क्या हुआ\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्या हुआ\' का कथानक', '\'क्या हुआ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_12_008 (बिंब और रूपक)** के \'कार्य-विधान\' (functioning).',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **हर विरोधाभासी वाक्य \'विरोधाभास\' (Paradox) है** और **हर महत्वपूर्ण वस्तु \'प्रतीक\' (Symbol) है**।.' }
          ],
            remediations: { 'paradox-symbol': { steps: ['**चरण 1 (विरोधाभास हेतु):** छात्र को 3 वाक्य दें — एक साधारण विरोधाभासी स्थिति (oxymoron), एक तार्किक विरोधाभास.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_010', difficulty: 'standard',
          question: '\'क्या हुआ\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटका हुआ महसूस हो तो नोड 006 (मुख्य विषय और संदेश) दोबारा पढ़ें — विषय स्पष्ट होते ही.',
          misconception: 'छात्र अक्सर मानते हैं कि **\'मुख्य शब्द\' वही हैं जो पाठ में सबसे अधिक बार आए हों या जिनके अर्थ कठिन हों**। वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्या हुआ\' की पदावली',
                  options: ['\'क्या हुआ\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्या हुआ\' का कथानक', '\'क्या हुआ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो नोड 006 (मुख्य विषय और संदेश) दोबारा पढ़ें — विषय स्पष्ट होते ही मुख्य.',
                  misconception: 'छात्र अक्सर मानते हैं कि **\'मुख्य शब्द\' वही हैं जो पाठ में सबसे अधिक बार आए हों या जिनके अर्थ कठिन हों**। वास्तव में, एक शब्द जो केवल एक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के **तीन निर्णायक क्षण** (प्रारंभ, मध्य, अंत) चुनने को कहें। 2.', 'प्रत्येक क्षण से **एक शब्द** निकालें जो उस क्षण का सार हो। 3.', 'पूछें: "यदि यह शब्द हटा दें, तो क्या वह क्षण अपना अर्थ खो देगा?" 4.', 'केवल वही शब्द रखें जिनका उत्तर \'हाँ\' हो — यही मुख्य शब्द हैं। इस प्रक्रिया से \'आवृत्ति\' से \'महत्व\' पर ध्यान केंद्रित.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_011', difficulty: 'standard',
          question: '\'क्या हुआ\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।',
          hint: 'यदि अटके तो **पदावली: मुख्य शब्द (c11_hin_a_cbse_12_010)** के \'कार्यशाला अभ्यास\'.',
          misconception: 'छात्र प्रायः मानते हैं कि **\'व्याकरण सही है तो भाषा-प्रयोग अच्छा है\'** — उदा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्या हुआ\' में भाषा-प्रयोग',
                  options: ['\'क्या हुआ\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्या हुआ\' का कथानक', '\'क्या हुआ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **पदावली: मुख्य शब्द (c11_hin_a_cbse_12_010)** के \'कार्यशाला अभ्यास\' (Workshop.',
                  misconception: 'छात्र प्रायः मानते हैं कि **\'व्याकरण सही है तो भाषा-प्रयोग अच्छा है\'** — उदा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मिनी-लेसन (5 मिनट)**: एक ही मूल वाक्य के 4-5 रूप (काल/वाच्य/क्रम/मुहावरा बदलकर) बोर्ड पर लिखें; छात्रों से पूछें.', '**माइक्रो-टास्क**: पाठ 12 से 3 वाक्य दें; छात्र प्रत्येक का **एक** परिवर्तन करें और **एक पंक्ति** में लिखें — "क्या बदल.', '**साझा पाठन (Shared Reading)**: शिक्षक जोर से पाठ पढ़े, रुक-रुक कर पूछे — "लेखक ने *यही* शब्द/रचना क्यों चुनी?" — छात्र.', '**फीडबैक लूप**: अगले कक्षा में छात्रों के लिखे \'प्रभाव-वाक्य\' पढ़वाएँ, सहपाठी टिप्पणी करें — "क्या तुम सहमत हो?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_12_012', difficulty: 'standard',
          question: '\'क्या हुआ\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck, review **c11_hin_a_cbse_12_002 (कथानक और आख्यान-संरचना)** to map the sequence.',
          misconception: '**विशिष्ट भ्रांति:** *"आशय-सूचक प्रश्नों के उत्तर पाठ में \'छिपे\' होते हैं — बस सही पंक्ति ढूंढनी पड़ती है।"* **गलत तर्क.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्या हुआ\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'क्या हुआ\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्या हुआ\' का कथानक', '\'क्या हुआ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **c11_hin_a_cbse_12_002 (कथानक और आख्यान-संरचना)** to map the sequence of events.',
                  misconception: '**विशिष्ट भ्रांति:** *"आशय-सूचक प्रश्नों के उत्तर पाठ में \'छिपे\' होते हैं — बस सही पंक्ति ढूंढनी पड़ती है।"* **गलत तर्क (Wrong.' }
          ],
            remediations: { 'wrong-reasoning-puzzle': { steps: ['**चरण 1 — संज्ञानात्मक रीसेट (Cognitive Reset):** छात्र के सामने एक **समानांतर दैनिक-जीवन स्थिति** रखें: "माँ पूछती है.', 'reasoning) को स्पष्ट करना ही कुंजी है। **चरण 4 — स्कैफोल्डेड अभ्यास (Scaffolded Practice):** पहले \'दो-सुराग\' वाले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
