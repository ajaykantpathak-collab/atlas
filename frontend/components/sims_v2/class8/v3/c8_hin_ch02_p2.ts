import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch02_p2: SimDef = {
    id: 'v3_c8_hin_ch02_p2',
    title: 'पाठ 2 · Part 2/3',
    subtitle: 'यह नोड केवल **गौण विषय की पहचान, वर्गीकरण और मुख्य विषय से संबंध विश्लेषण** तक सीमित है।.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 2 · Part 2/3',
    chapters: ['c8_hin_ch02'],
    nodeIds: ['c8_hin_cbse_02_007', 'c8_hin_cbse_02_008', 'c8_hin_cbse_02_009', 'c8_hin_cbse_02_010', 'c8_hin_cbse_02_011', 'c8_hin_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करो तुमने कोई उपन्यास पढ़ा और तुम्हें लगा "कहानी तो एक थी, पर ये दूसरा ट्रैक क्यों था?" — यही सवाल गौण.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — गौण विषय', text: 'गौण विषय (उप-विषय) वह साहित्यिक तत्व है जो कथानक में मुख्य विषय के समानांतर चलता है, उसे पूरक बनाता है, पात्रों की आंतरिक दुनिया खोलता है या सामाजिक- सांस्कृतिक परतें जोड़ता है, परन्तु कथा का.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — गौण', 'पाठ 2 — साहित्यिक', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 2/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा रचना के प्रसंग, पात्र, भाव और उद्देश्य के.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — **Vastu-nishth (objective) questions** test literal comprehension — facts, details.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_02_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_007', difficulty: 'standard',
          question: 'गौण विषय (उप-विषय) वह साहित्यिक तत्व है जो कथानक में मुख्य विषय के समानांतर.',
          hint: 'यदि फँस जाएँ, तो **c8_hin_cbse_02_006 (मुख्य विषय और संदेश)** के \'वाक्य-रूप में मुख्य.',
          misconception: '**सबसे गहरी भ्रांति:** छात्र **गौण विषय** को **\'मुख्य विषय के उप-विषय\' (sub-topics of main theme)** समझते हैं — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (उप-विषय) वह साहित्यिक तत्व है जो कथानक में मुख्य विषय के समानांतर चलता है, उसे',
                  options: ['गौण विषय (उप-विषय) वह साहित्यिक तत्व है जो कथानक में मुख्य विषय के समानांतर चलता है, उसे', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,'],
                  hint: 'यदि फँस जाएँ, तो **c8_hin_cbse_02_006 (मुख्य विषय और संदेश)** के \'वाक्य-रूप में मुख्य विषय लिखना\'.',
                  misconception: '**सबसे गहरी भ्रांति:** छात्र **गौण विषय** को **\'मुख्य विषय के उप-विषय\' (sub-topics of main theme)** समझते हैं — जैसे मुख्य विषय एक पेड़ है.' }
          ],
            remediations: { 'sub-topics-of-main-theme': { steps: ['**पहला कदम:** छात्र से कहो — "पाठ 2 का मुख्य विषय एक वाक्य में लिखो (कथन रूप में, टॉपिक नहीं)।" यदि वह न लिख सके, तो.', '**दूसरा कदम:** पाठ से 5 घटनाएँ/संवाद चुनने को कहो जो **मुख्य विषय वाक्य को सीधे सिद्ध/बढ़ाते न हों**। उन्हें अलग कागज.', '**तीसरा कदम:** प्रत्येक के लिए पूछो — "यह कौन-सा **अलग कथन (statement)** बनाता है?" (उदाहरण: "परिवार लड़कियों को नहीं.', '**चौथा कदम:** अब मिलान करो — "क्या यह कथन मुख्य विषय कथन को **विरोधाभास, विस्तार, पृष्ठभूमि, या मानवीय गहराई** देता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_008', difficulty: 'standard',
          question: 'बिंब (Imagery) शब्दों के माध्यम से इंद्रियों (दृष्टि, श्रवण, स्पर्श, गंध.',
          hint: 'यदि अटके तो कक्षा 7 पाठ 2, 5, 6 के बिंब-रूपक अभ्यास (c7_hin_cbse_02_008.',
          misconception: 'छात्र अक्सर मानते हैं कि **हर तुलना रूपक है** — वे "जीवन संघर्ष है" (रूपक) और "जीवन संघर्ष जैसा है" (उपमा) को समान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (Imagery) शब्दों के माध्यम से इंद्रियों (दृष्टि, श्रवण, स्पर्श, गंध, स्वाद) को',
                  options: ['बिंब (Imagery) शब्दों के माध्यम से इंद्रियों (दृष्टि, श्रवण, स्पर्श, गंध, स्वाद) को', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,'],
                  hint: 'यदि अटके तो कक्षा 7 पाठ 2, 5, 6 के बिंब-रूपक अभ्यास (c7_hin_cbse_02_008, c7_hin_cbse_05_008.',
                  misconception: 'छात्र अक्सर मानते हैं कि **हर तुलना रूपक है** — वे "जीवन संघर्ष है" (रूपक) और "जीवन संघर्ष जैसा है" (उपमा) को समान मानते हैं क्योंकि दोनों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — व्याकरणिक जाँच:** छात्र से कहें: "वाक्य में \'जैसे\', \'वैसे\', \'समान\', \'सा\', \'सी\', \'से\' ढूँढ़ो। मिले?', '**चरण 2 — इंद्रिय लेबलिंग:** बिंब वाली पंक्ति दें, पूछें: "कौन-सी इंद्रिय जागी?', '**चरण 3 — रूपक विच्छेदन:** रूपक वाक्य दें (जैसे "आशा एक दीपक है") — दो कॉलम बनवाएँ: उपमान (दीपक) | उपमेय (आशा)। फिर.', '**चरण 4 — पुनर्लेखन:** उसी भाव को उपमा में बदलवाएँ ("आशा दीपक जैसी है") और दोनों पढ़कर अंतर *महसूस* करवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_009', difficulty: 'standard',
          question: 'विरोधाभास (Paradox) एक ऐसी साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ.',
          hint: 'यदि फँस जाएँ तो कक्षा 7 के नोड c7_hin_cbse_02_009 के उदाहरणों को दोहराएँ और \'बिंब.',
          misconception: 'छात्र अक्सर विरोधाभास को केवल "विरोधी शब्दों का मेल" (जैसे \'जीवित मृत\') समझ लेते हैं और प्रतीक को "सुंदर तुलना" (जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास (Paradox) एक ऐसी साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ कहकर एक गहरा',
                  options: ['विरोधाभास (Paradox) एक ऐसी साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ कहकर एक गहरा', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,'],
                  hint: 'यदि फँस जाएँ तो कक्षा 7 के नोड c7_hin_cbse_02_009 के उदाहरणों को दोहराएँ और \'बिंब vs प्रतीक\' तथा.',
                  misconception: 'छात्र अक्सर विरोधाभास को केवल "विरोधी शब्दों का मेल" (जैसे \'जीवित मृत\') समझ लेते हैं और प्रतीक को "सुंदर तुलना" (जैसे \'चाँद-सा मुखड़ा\') मान.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक छोटा पैराग्राफ दो जिसमें स्पष्ट विरोधाभास हो (जैसे "वह गरीब सबसे अमीर था क्योंकि उसके पास समय था") — उससे.', 'लेखक असल में क्या कहना चाहता है?" 2.', 'फिर एक प्रतीक-प्रसंग दो (जैसे "बार-बार उड़ती पतंग कटती है, फिर भी बच्चा नई पतंग ले आता है") — पूछो: "पतंग यहाँ केवल.', 'क्या भाव बार-बार लौट रहा है?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द पाठ के उन चुनिंदा, प्रभावशाली शब्दों का समूह है जो कथ्य के.',
          hint: 'यदि अटके तो **c8_hin_cbse_02_006 (मुख्य विषय और संदेश)** और **c8_hin_cbse_02_004 (नायक.',
          misconception: 'छात्र समझते हैं कि **पदावली = कठिन शब्दों की सूची + शब्दकोश अर्थ**। वे पाठ से 10-15 कठिन शब्द छाँट लेते हैं, शब्दकोश से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द पाठ के उन चुनिंदा, प्रभावशाली शब्दों का समूह है जो कथ्य के केंद्रीय',
                  options: ['पदावली: मुख्य शब्द पाठ के उन चुनिंदा, प्रभावशाली शब्दों का समूह है जो कथ्य के केंद्रीय', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,'],
                  hint: 'यदि अटके तो **c8_hin_cbse_02_006 (मुख्य विषय और संदेश)** और **c8_hin_cbse_02_004 (नायक.',
                  misconception: 'छात्र समझते हैं कि **पदावली = कठिन शब्दों की सूची + शब्दकोश अर्थ**। वे पाठ से 10-15 कठिन शब्द छाँट लेते हैं, शब्दकोश से अर्थ नकल कर लेते.' }
          ],
            remediations: { '10-15': { steps: ['**पाठ के 3 खंड चुनें** (आरंभ, मध्य, अंत) और प्रत्येक से **एक-एक शब्द** घेरें जो आपको लगे कि \'सबसे ज्यादा काम कर रहा.', 'प्रत्येक शब्द के लिए पूछें: "अगर मैं इसे हटा दूँ, तो क्या अर्थ बदल जाएगा?" — यदि हाँ, तो वह मुख्य शब्द है। 3.', 'अब उस शब्द के **आसपास के 2-3 वाक्य** पढ़ें और **केवल उन्हीं से** अर्थ निकालें (शब्दकोश बंद रखें)। 4.', 'अंत में लिखें: "यह शब्द पाठ के ______ विषय/पात्र/भाव को खोलता है क्योंकि ______।" 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा रचना के प्रसंग, पात्र, भाव और.',
          hint: 'यदि शब्द-भेद या मुहावरे पहचानने में अटके तो c8_hin_cbse_02_010 (पदावली) और कक्षा 7 के.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ पाठ में आए **कठिन शब्दों के अर्थ लिखना** या **व्याकरण के नियम (संधि/समास).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा रचना के प्रसंग, पात्र, भाव और उद्देश्य के',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा रचना के प्रसंग, पात्र, भाव और उद्देश्य के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,'],
                  hint: 'यदि शब्द-भेद या मुहावरे पहचानने में अटके तो c8_hin_cbse_02_010 (पदावली) और कक्षा 7 के व्याकरण नोट्स.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ पाठ में आए **कठिन शब्दों के अर्थ लिखना** या **व्याकरण के नियम (संधि/समास) पहचानना** है। वे यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ का कोई एक पन्ना खोलो। वहाँ दो वाक्य चुनो — एक वर्णन का, एक संवाद का। दोनों को आमने-सामने रखो।" 2.', 'पूछें: "पहले वाक्य में कौन-से शब्द हैं?', 'फिर पूछें: "अगर लेखक इन दोनों को उलट दे — वर्णन वाली शैली में संवाद लिखे और संवाद वाली शैली में वर्णन — तो क्या होगा?', 'अंत में: "यही है भाषा-प्रयोग — लेखक का **सचेत चुनाव**। अब पाठ में जाओ और तीन जगह ढूँढ़ो जहाँ यह चुनाव साफ दिखता हो।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_012', difficulty: 'standard',
          question: '**Vastu-nishth (objective) questions** test literal comprehension — facts.',
          hint: 'Review **c8_hin_cbse_02_002 (कथानक)** and **c8_hin_cbse_02_004 (पात्र-चित्रण)** — if you.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आशय-सूचक प्रश्न का उत्तर पाठ के **किसी एक वाक्य** में "छिपा" होता है जिसे ढूंढकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**Vastu-nishth (objective) questions** test literal comprehension',
                  options: ['**Vastu-nishth (objective) questions** test literal comprehension', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,'],
                  hint: 'Review **c8_hin_cbse_02_002 (कथानक)** and **c8_hin_cbse_02_004 (पात्र-चित्रण)** — if you don\'t know.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आशय-सूचक प्रश्न का उत्तर पाठ के **किसी एक वाक्य** में "छिपा" होता है जिसे ढूंढकर कॉपी करना है। **गलत.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहचान का अभ्यास (5 मिनट):** छात्र को १० मिश्रित प्रश्न दें (५ वस्तुनिष्ठ, ५ आशय-सूचक)। उसे केवल **श्रेणी बतानी है**.', '**\'नहीं लिखा\' खेल (10 मिनट):** एक आशय-सूचक प्रश्न लें। बोर्ड पर लिखें: *"पाठ में यह वाक्य नहीं है: [उत्तर]। फिर भी.', '**PEEL का मिनी-संस्करण सिखाएं:** २ अंक के लिए **P+E** (Point + Evidence), ३+ अंक के लिए **P+E+E+L**। अभ्यास: १ अंक, २.', '**फीडबैक लूप:** अगले ३ दिन तक हर गृहकार्य में **एक** आशय-सूचक प्रश्न अनिवार्य करें, केवल श्रेणी पहचान + P+E लिखवाएं।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
