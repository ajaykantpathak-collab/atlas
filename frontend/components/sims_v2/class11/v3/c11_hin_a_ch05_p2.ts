import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch05_p2: SimDef = {
    id: 'v3_c11_hin_a_ch05_p2',
    title: 'पाठ 5 · Part 2/3',
    subtitle: 'यह नोड **केवल गौण विषय की पहचान, वर्गीकरण (समांतर/प्रतिपक्ष/विस्तारक), मुख्य विषय से.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 5 · Part 2/3',
    chapters: ['c11_hin_a_ch05'],
    nodeIds: ['c11_hin_a_cbse_05_007', 'c11_hin_a_cbse_05_008', 'c11_hin_a_cbse_05_009', 'c11_hin_a_cbse_05_010', 'c11_hin_a_cbse_05_011', 'c11_hin_a_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'अंतरा भाग-1 — पाठ 5\' में अंतरा-भाग-1-—-पाठ-5 जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'पाठ 5 की इन पंक्तियों पर विचार कीजिए: *"वह चुपचाप कोने में बैठा रहा, पर उसकी मुट्ठियाँ भिंची हुई थीं।"* प्रश्न: "उसकी मुट्ठियाँ भिंची हुई थीं — इस वर्णन का आशय.',
        options: ['**Correct Steps:** 1', 'उत्तर लिख देंगे', 'शब्दार्थ बताएँगे'],
        answer: '**Correct Steps:** 1',
        hook: '**"आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढ़ना पड़ता है।"** **Why this is wrong:** Students treat.',
    },
    teaching: [
        { title: 'पाठ 5 — गौण विषय', text: '\'अंतरा भाग-1 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — गौण', 'पाठ 5 — साहित्यिक', 'पाठ 5 — पदावली', 'पाठ 5 — व्याकरण', 'पाठ 5 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_05_012', title: 'पाठ 5 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'अंतरा भाग-1 — पाठ 5\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'अंतरा भाग-1।',
            decisions: [{ prompt: 'पाठ 5 के संदर्भ में, \'वस्तुनिष्ठ प्रश्न\' की परिभाषा लिखिए और एक उदाहरण दीजिए जो इस पाठ पर आधारित हो।', options: [
                { text: '**Correct Answer:** वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट, प्रत्यक्ष रूप से', outcome: '**Correct Answer:** वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट, प्रत्यक्ष रूप से उपलब्ध हो.' },
                { text: 'नायक का नाम क्या है?', outcome: 'Not quite — **"आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढ़ना पड़ता है।"** **Why this is wrong:**.', reveals: 'wrong-idea' },
                { text: 'कहानी किस गाँव में घटित होती है?', outcome: 'Not quite — **"आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढ़ना पड़ता है।"** **Why this is wrong:**.', reveals: 'wrong-idea' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_007', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_05_006 (मुख्य विषय और संदेश)** पर लौटकर \'मुख्य.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"गौण विषय = मुख्य विषय का उप-विभाजन (sub-division) या सहायक प्रसंग मात्र"**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'अंतरा भाग-1 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_05_006 (मुख्य विषय और संदेश)** पर लौटकर \'मुख्य विषय.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"गौण विषय = मुख्य विषय का उप-विभाजन (sub-division) या सहायक प्रसंग मात्र"**। वे गौण विषय को मुख्य.' }
          ],
            remediations: { 'sub-division': { steps: ['**चरणबद्ध उपचार:** (1) **पृथक्करण अभ्यास:** पाठ से 5-6 प्रसंग निकालकर टेबल बनाएं — कॉलम: \'प्रसंग\', \'केंद्रीय पात्र\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_008', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 5\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटका हुआ महसूस हो तो **\'अर्थालंकार: रूपक\' (कक्षा 9-10 व्याकरण)** की परिभाषा और 5-6.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'बिंब\' (Imagery)** को **\'चित्रात्मक वर्णन\' (Pictorial Description)** मात्र समझ लेते हैं और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 5\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'अंतरा भाग-1 — पाठ 5\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'अर्थालंकार: रूपक\' (कक्षा 9-10 व्याकरण)** की परिभाषा और 5-6 उदाहरण.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'बिंब\' (Imagery)** को **\'चित्रात्मक वर्णन\' (Pictorial Description)** मात्र समझ लेते हैं और सोचते हैं कि केवल.' }
          ],
            remediations: { 'imagery-pictorial-description': { steps: ['**इंद्रिय-मानचित्रण अभ्यास (Sensory Mapping):** छात्र को एक परिचित दृश्य (जैसे: रसोई, बाज़ार, बरसात) दें और कहें: "आँख.', 'क्या चखा?" प्रत्येक संवेदना के लिए 3-3 शब्द लिखवाएँ। इससे \'दृश्य-केंद्रित\' सोच टूटती है। 2.', '**रूपक-विच्छेदन शीट (Metaphor Dissection):** 5 वाक्य दें (मिश्रित: उपमा, रूपक, साधारण कथन)। छात्र से कहें: "हर वाक्य.', 'यदि नहीं, तो रूपक है। फिर लिखो: आरोप्य = ?, आरोप = ?, आधार = ?" यह यांत्रिक अभ्यास रूपक की संरचना स्पष्ट करता है। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_009', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 5\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_05_008** के "रूपक विश्लेषण चरण" दोहराएं: (1).',
          misconception: 'छात्र **विरोधाभास** को **विरोधाभासी शब्द-युग्म (Oxymoron)** मान लेते हैं — जैसे "जीवित लाश", "मीठा जहर" — जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 5\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 5\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_05_008** के "रूपक विश्लेषण चरण" दोहराएं: (1) तुलना के दो.',
                  misconception: 'छात्र **विरोधाभास** को **विरोधाभासी शब्द-युग्म (Oxymoron)** मान लेते हैं — जैसे "जीवित लाश", "मीठा जहर" — जबकि विरोधाभास **पूर्ण.' }
          ],
            remediations: { 'oxymoron': { steps: ['**विरोधाभास के लिए:** छात्र से कहें — "पहले वाक्य को दो भागों में बांटो: भाग A क्या कहता है?', 'क्या दोनों एक साथ सच हो सकते हैं?', 'यदि नहीं, तो कौन-सा गहरा सच दोनों को जोड़ता है?" — इसे 3 अलग-अलग वाक्यों पर करवाएं। 2.', '**प्रतीक के लिए:** पूछें — "यह वस्तु/छवि कहां-कहां आई?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_010', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 5\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'अगर अटके तो c11_hin_a_cbse_05_003 (पाठ्य-परिवेश) और c11_hin_a_cbse_05_006 (मुख्य विषय) को.',
          misconception: 'छात्र मानते हैं कि \'मुख्य शब्द\' वही हैं जो **पाठ में बार-बार आएँ** या **शब्दकोश में कठिन हों**। वास्तविकता: मुख्य शब्द.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 5\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 5\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'अगर अटके तो c11_hin_a_cbse_05_003 (पाठ्य-परिवेश) और c11_hin_a_cbse_05_006 (मुख्य विषय) को दोबारा.',
                  misconception: 'छात्र मानते हैं कि \'मुख्य शब्द\' वही हैं जो **पाठ में बार-बार आएँ** या **शब्दकोश में कठिन हों**। वास्तविकता: मुख्य शब्द की पहचान **आवृत्ति.' }
          ],
            remediations: { 'frequency': { steps: ['चरण 1: छात्र को पाठ का एक छोटा अंश (5-6 पंक्तियाँ) दें और कहें: "केवल **एक** शब्द छाँटो जिसे हटाने से इस अंश का भाव बदल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_011', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 5\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck, review **\'शब्द भेद और वाक्य भेद\' (Word classification and Sentence types)**.',
          misconception: '**भ्रांति:** "भाषा-प्रयोग का विश्लेषण करने का अर्थ है पाठ में आए कठिन शब्दों (शब्दार्थ) की सूची बनाना या अलंकारों के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 5\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'अंतरा भाग-1 — पाठ 5\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review **\'शब्द भेद और वाक्य भेद\' (Word classification and Sentence types)** from Class 10.',
                  misconception: '**भ्रांति:** "भाषा-प्रयोग का विश्लेषण करने का अर्थ है पाठ में आए कठिन शब्दों (शब्दार्थ) की सूची बनाना या अलंकारों के नाम पहचानना.' }
          ],
            remediations: { '10-11-identification-interpretation-analysis': { steps: ['**चरण 1 (डीकोड):** छात्र को एक छोटा अनुच्छेद दें (पाठ 5 से नया, अनदेखा)। कहें: "पहले केवल क्रियाएँ (Verbs) घेरो.', 'भविष्य काल है या अतीत?" इससे शब्द-स्तर से ऊपर उठकर वाक्य-स्तर (Syntax) पर ध्यान जाता है। **चरण 2 (कनेक्ट):** फिर पूछें.', 'यह संचय (accumulation) प्रभाव दे रहा है...', 'इससे पात्र की उत्कंठा बढ़ती दिख रही है।" **चरण 4 (अभ्यास):** छात्र से एक पैराग्राफ का \'भाषा-प्रयोग विश्लेषण\' PEEL.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_012', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 5\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck, **revisit Node 009 (विरोधाभास और प्रतीक)** — *aashay* questions most often.',
          misconception: '**"आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढ़ना पड़ता है।"** **Why this is wrong:** Students treat.',
          parts: [
                { id: 'a', prompt: 'पाठ 5 की इन पंक्तियों पर विचार कीजिए: *"वह चुपचाप कोने में बैठा रहा, पर उसकी मुट्ठियाँ भिंची हुई थीं।"* प्रश्न: "उसकी मुट्ठियाँ भिंची हुई थीं — इस वर्णन का आशय.', answer: '**Correct Steps:** 1',
                  options: ['**Correct Steps:** 1', 'उत्तर लिख देंगे', 'शब्दार्थ बताएँगे'],
                  hint: 'If stuck, **revisit Node 009 (विरोधाभास और प्रतीक)** — *aashay* questions most often target.',
                  misconception: '**"आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढ़ना पड़ता है।"** **Why this is wrong:** Students treat *aashay* as.' },
                { id: 'b', prompt: 'पाठ 5 में एक प्रसंग है जहाँ नायक किसी अनजान व्यक्ति को देखकर "मुस्कुरा देता है"। वस्तुनिष्ठ प्रश्न पूछेगा: "नायक ने क्या किया?" आशय-सूचक प्रश्न पूछेगा: "नायक.', answer: '**Correct Analysis:** - **वस्तुनिष्ठ उत्तर ("नायक मुस्कुराया") नहीं बदलेगा**',
                  options: ['**Correct Analysis:** - **वस्तुनिष्ठ उत्तर ("नायक मुस्कुराया") नहीं बदलेगा**', 'नायक मुस्कुराया', 'मुस्कराहट = सद्भावना/शिष्टाचार', 'मुस्कराहट = छल/बनावटीपन/आंतरिक द्वंद्व'],
                  hint: 'If stuck, **revisit Node 009 (विरोधाभास और प्रतीक)** — *aashay* questions most often target.',
                  misconception: '**"आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है, बस ढूँढ़ना पड़ता है।"** **Why this is wrong:** Students treat *aashay* as.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**Step-by-step remediation when student confuses the two types or quotes text for *aashay*:** 1.', '**Color-Code Drill:** Give 5 questions from the chapter.', 'Student highlights **question stem words** (क्या/कौन/कब/कितना → **Red = वस्तुनिष्ठ**; क्यों/कैसे/क्या.', 'No answering — only classification.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
