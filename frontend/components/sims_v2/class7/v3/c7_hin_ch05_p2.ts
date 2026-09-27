import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch05_p2: SimDef = {
    id: 'v3_c7_hin_ch05_p2',
    title: 'पाठ 5 · Part 2/3',
    subtitle: 'This node covers identification, evidence-gathering, and analysis of secondary themes.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 5 · Part 2/3',
    chapters: ['c7_hin_ch05'],
    nodeIds: ['c7_hin_cbse_05_007', 'c7_hin_cbse_05_008', 'c7_hin_cbse_05_009', 'c7_hin_cbse_05_010', 'c7_hin_cbse_05_011', 'c7_hin_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Think about your favourite movie — you remember the main plot, but what stays with you are the side stories.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'पाठ 5 का कोई एक प्रसंग चुनकर, उस पर आधारित **एक आशय-सूचक प्रश्न बनाइए** और उसका **आदर्श उत्तर** 4 चरणों (दावा-प्रमाण-व्याख्या-विषय संबंध) में लिखिए।',
        options: ['**Expected Criteria for Good Answer:** 1', 'आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (my opinion) होता है।', 'no single right answer'],
        answer: '**Expected Criteria for Good Answer:** 1',
        hook: '**"आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (my opinion) होता है।"** Students believe that because आशय-सूचक questions have.',
    },
    teaching: [
        { title: 'पाठ 5 — गौण विषय', text: 'गौण विषय (Secondary Theme) वह विषय है जो पाठ के मुख्य विषय का समर्थन करता है, उसे गहराई देता है, या उसके समानांतर चलकर कहानी को बहुआयामी बनाता है; यह स्वतंत्र रूप से भी एक सार्थक संदेश दे सकता है.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — गौण', 'पाठ 5 — साहित्यिक', 'पाठ 5 — पदावली', 'पाठ 5 — व्याकरण', 'पाठ 5 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_hin_cbse_05_012', title: 'पाठ 5 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'Think about the last time you watched a cricket match highlights reel.',
            decisions: [{ prompt: 'पाठ 5 में \'वस्तुनिष्ठ प्रश्न\' की पहचान क्या है? इसकी एक विशेषता लिखिए।', options: [
                { text: '**Correct Answer:** वस्तुनिष्ठ प्रश्न का उत्तर पाठ में स्पष्ट रूप से लिखा होता है', outcome: '**Correct Answer:** वस्तुनिष्ठ प्रश्न का उत्तर पाठ में स्पष्ट रूप से लिखा होता है (explicitly.' },
                { text: 'नायक का नाम क्या है?', outcome: 'Not quite — **"आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (my opinion) होता है।"** Students believe that because.', reveals: 'my-opinion-students-believe-that' },
                { text: 'जिसका उत्तर छोटा हो', outcome: 'Not quite — **"आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (my opinion) होता है।"** Students believe that because.', reveals: 'my-opinion-students-believe-that' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hin_cbse_05_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_007', difficulty: 'standard',
          question: 'गौण विषय (Secondary Theme) वह विषय है जो पाठ के मुख्य विषय का समर्थन करता है.',
          hint: 'यदि अटका हुआ महसूस हो तो c7_hin_cbse_05_006 (मुख्य विषय) के कार्यित उदाहरण (worked.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि कोई भी छोटी बात या एक बार आने वाला प्रसंग गौण विषय है। *उदाहरण:* पाठ 5 में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Secondary Theme) वह विषय है जो पाठ के मुख्य विषय का समर्थन करता है, उसे गहराई',
                  options: ['गौण विषय (Secondary Theme) वह विषय है जो पाठ के मुख्य विषय का समर्थन करता है, उसे गहराई', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और'],
                  hint: 'यदि अटका हुआ महसूस हो तो c7_hin_cbse_05_006 (मुख्य विषय) के कार्यित उदाहरण (worked examples) दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि कोई भी छोटी बात या एक बार आने वाला प्रसंग गौण विषय है। *उदाहरण:* पाठ 5 में एक पात्र का एक बार.' }
          ],
            remediations: { '5-recurrence-development-3-4': { steps: ['**पुनर्पाठ (Re-read) चरण:** विद्यार्थी को पाठ 5 के 3-4 प्रमुख पात्रों की सूची बनाने को कहें। प्रत्येक पात्र के लिए.', '**रंग-कोडिंग (Colour-coding):** दो रंगों के हाइलाइटर दें — एक मुख्य विषय के साक्ष्यों के लिए, दूसरा संभावित गौण विषय के.', '**क्लस्टरिंग (Clustering):** दूसरे रंग के सभी हाइलाइट्स को काटकर कागज पर चिपकाएँ; समान विचारों को गुच्छों (clusters).', '**मौखिक रक्षा (Oral defense):** विद्यार्थी से कहें: "इस गुच्छे को हटाने से मुख्य विषय कैसे कमजोर पड़ेगा?" — यदि वह 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_008', difficulty: 'standard',
          question: '**बिंब (Imagery):** शब्दों के माध्यम से पाठक की पाँचों इंद्रियों (दृष्टि.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 6 के किसी भी पाठ (जैसे c6_hin_cbse_05_008) के \'बिंब और.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **संवेदी विशेषण (sensory adjectives)** को ही बिंब मान लेते हैं — जैसे "लाल गुलाब", "मीठा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** शब्दों के माध्यम से पाठक की पाँचों इंद्रियों (दृष्टि, श्रवण, गंध,',
                  options: ['**बिंब (Imagery):** शब्दों के माध्यम से पाठक की पाँचों इंद्रियों (दृष्टि, श्रवण, गंध,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 6 के किसी भी पाठ (जैसे c6_hin_cbse_05_008) के \'बिंब और रूपक\' खंड को.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **संवेदी विशेषण (sensory adjectives)** को ही बिंब मान लेते हैं — जैसे "लाल गुलाब", "मीठा आम", "कर्कश आवाज़".' }
          ],
            remediations: { 'sensory-adjectives': { steps: ['**पहचान अभ्यास:** छात्र को 5 वाक्य दो — प्रत्येक में एक संवेदी विशेषण हो (जैसे "काली रात")। पूछो: "यह बिंब है या.', '**इंद्रिय-मानचित्रण:** एक छोटा अनुच्छेद देकर कहो: "हर वाक्य के आगे लिखो — आँख/कान/नाक/त्वचा/जीभ — कौन जागा?" फिर चर्चा.', '**रूपक-विच्छेदन:** 3 रूपक वाले वाक्य दो (जैसे "क्रोध ज्वालामुखी है")। छात्र से कहो: "उपमेय गोला करो, उपमान बॉक्स में.', '**लघु-लेखन:** किसी भाव (डर, खुशी, इंतज़ार) पर 3 पंक्तियाँ लिखवाओ जिनमें **एक रूपक + दो बिंब** अनिवार्य हों। फिर साथ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_009', difficulty: 'standard',
          question: '**विरोधाभास** वह साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी बातें एक साथ रखकर.',
          hint: 'अगर अटके तो c7_hin_cbse_05_008 के कार्यित उदाहरण (WORKED_EXAMPLE) दोबारा करो — विशेष रूप.',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास** को **विरोधाभासी स्थिति (सिचुएशनल आयरनी)** समझ लेते हैं — जैसे "दमकल की गाड़ी आग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** वह साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी बातें एक साथ रखकर एक गहरा',
                  options: ['**विरोधाभास** वह साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी बातें एक साथ रखकर एक गहरा', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और'],
                  hint: 'अगर अटके तो c7_hin_cbse_05_008 के कार्यित उदाहरण (WORKED_EXAMPLE) दोबारा करो — विशेष रूप से \'रूपक →.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास** को **विरोधाभासी स्थिति (सिचुएशनल आयरनी)** समझ लेते हैं — जैसे "दमकल की गाड़ी आग से जल गई" — और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — अलग करना:** छात्र को दो कॉलम बनाने को कहो: बायाँ \'शब्द/वाक्य\', दायाँ \'अर्थ\'। विरोधाभास वाली पंक्ति लिखवाओ और.', '**चरण 2 — प्रसंग जोड़ना:** वही पंक्ति कहानी के किस मोड़ पर आई?', '— यह जोड़ने पर विरोधाभास का \'क्यों\' खुलता है। 3.', '**चरण 3 — प्रतीक की छलांग:** कोई एक वस्तु (जैसे \'पुराना झोला\') लो। पूछो: "यह झोला क्या ढोता है?" — सामान?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द उस पाठ के **चुनिंदा, अर्थपूर्ण और प्रसंगानुकूल शब्दों का.',
          hint: 'अगर अटके तो **c7_hin_cbse_05_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — विषय स्पष्ट होते.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"मुख्य शब्द = पाठ के सभी कठिन/अपरिचित शब्द"**। वे शब्दकोश खोलकर हर उस शब्द का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द उस पाठ के **चुनिंदा, अर्थपूर्ण और प्रसंगानुकूल शब्दों का समूह** है जो',
                  options: ['पदावली: मुख्य शब्द उस पाठ के **चुनिंदा, अर्थपूर्ण और प्रसंगानुकूल शब्दों का समूह** है जो', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और'],
                  hint: 'अगर अटके तो **c7_hin_cbse_05_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — विषय स्पष्ट होते ही मुख्य.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"मुख्य शब्द = पाठ के सभी कठिन/अपरिचित शब्द"**। वे शब्दकोश खोलकर हर उस शब्द का अर्थ ढूँढ लाते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहो — "पाठ 5 को **केवल 5 मिनट में** दोबारा पढ़ो और **केवल 5 शब्द** घेरो जो तुम्हें लगते हैं कि.', '**दूसरा कदम:** उन 5 शब्दों को बोर्ड/कागज़ पर लिखो और **प्रत्येक के आगे पूछो** — "यह शब्द **किस पात्र/प्रसंग/विषय** से.', 'अगर यह शब्द हटा दें तो क्या अर्थ बदलेगा?" 3.', '**तीसरा कदम:** छात्र के चुने शब्दों में से **गैर-मुख्य शब्द** (जैसे "प्रांगण") को **तर्क सहित हटाओ** — "यह केवल स्थान.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा पात्र, प्रसंग और भाव के अनुसार.',
          hint: 'यदि अटका हुआ लगे तो कक्षा 6 के व्याकरण नोड (c6_hin_cbse_05_011) के "वाक्य-भेद पहचान" और.',
          misconception: 'छात्र समझते हैं कि "पाठ में भाषा-प्रयोग" का अर्थ है **व्याकरण की त्रुटियाँ ढूँढ़ना** या **कठिन शब्दों के अर्थ लिखना**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा पात्र, प्रसंग और भाव के अनुसार शब्द-चयन',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा पात्र, प्रसंग और भाव के अनुसार शब्द-चयन', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और'],
                  hint: 'यदि अटका हुआ लगे तो कक्षा 6 के व्याकरण नोड (c6_hin_cbse_05_011) के "वाक्य-भेद पहचान" और "काल पहचान".',
                  misconception: 'छात्र समझते हैं कि "पाठ में भाषा-प्रयोग" का अर्थ है **व्याकरण की त्रुटियाँ ढूँढ़ना** या **कठिन शब्दों के अर्थ लिखना**। असल में लेखक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र के साथ पाठ का एक संवाद-अंश जोर से पढ़ो; पूछो: "अगर यह वाक्य पाठ्यपुस्तक की परिभाषा जैसा लिखा होता — \'तुम कहाँ.', 'दोनों रूपों को आमने-सामने लिखवाओ; छात्र से बोलो: "पहला वाक्य किसका लगता है?', 'फिर समझाओ: "लेखक ने जानबूझकर \'गलत\' व्याकरण चुना ताकि पात्र असली लगे — यही भाषा-प्रयोग का कलात्मक निर्णय है।" 4.', 'अब छात्र से कहो: "पाठ से ऐसा एक और उदाहरण ढूँढ़ो जहाँ लेखक ने नियम तोड़ा हो पर असर बढ़ाया हो।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_012', difficulty: 'standard',
          question: '**Vastu-nishth (वस्तुनिष्ठ) प्रश्न** are objective, text-explicit questions.',
          hint: 'If stuck, review "पाठ 5 — मुख्य विषय और संदेश" (c7_hin_cbse_05_006) for theme clarity.',
          misconception: '**"आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (my opinion) होता है।"** Students believe that because आशय-सूचक questions have.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**Vastu-nishth (वस्तुनिष्ठ) प्रश्न** are objective, text-explicit questions with a',
                  options: ['**Vastu-nishth (वस्तुनिष्ठ) प्रश्न** are objective, text-explicit questions with a', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और'],
                  hint: 'If stuck, review "पाठ 5 — मुख्य विषय और संदेश" (c7_hin_cbse_05_006) for theme clarity, and "पाठ 5.',
                  misconception: '**"आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (my opinion) होता है।"** Students believe that because आशय-सूचक questions have "no single right.' }
          ],
            remediations: { 'my-opinion-students-believe-that': { steps: ['Clarify the Definition.** Show two questions side-by-side: "नायक ने क्या खाया?" (वस्तुनिष्ठ) vs "नायक ने वह खाना क्यों.', 'Model the 4-Step Structure.** Take a familiar story (e.g., Panchatantra\'s "Lion and Mouse").', 'Guided Practice.** Give a short unseen paragraph (3-4 lines). Ask them to write ONE आशय-सूचक question and answer.', 'Self-Correction.** Give them a "weak answer" (opinion-based, no evidence).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (my opinion) होता है।"** Students believe that because आशय-सूचक questions have.',
          parts: [
                { id: 'a', prompt: 'पाठ 5 का कोई एक प्रसंग चुनकर, उस पर आधारित **एक आशय-सूचक प्रश्न बनाइए** और उसका **आदर्श उत्तर** 4 चरणों (दावा-प्रमाण-व्याख्या-विषय संबंध) में लिखिए।', answer: '**Expected Criteria for Good Answer:** 1',
                  options: ['**Expected Criteria for Good Answer:** 1', 'आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (my opinion) होता है।', 'no single right answer', 'लेखक ने अंत में खुला अंत क्यों रखा?'],
                  hint: 'If stuck, review "पाठ 5 — मुख्य विषय और संदेश" (c7_hin_cbse_05_006) for theme clarity, and "पाठ 5.',
                  misconception: '**"आशय-सूचक प्रश्न का उत्तर \'मेरी राय\' (my opinion) होता है।"** Students believe that because आशय-सूचक questions have "no single right.' }
          ],
            remediations: { 'my-opinion-students-believe-that': { steps: ['Clarify the Definition.** Show two questions side-by-side: "नायक ने क्या खाया?" (वस्तुनिष्ठ) vs "नायक ने वह खाना क्यों.', 'Model the 4-Step Structure.** Take a familiar story (e.g., Panchatantra\'s "Lion and Mouse").', 'Guided Practice.** Give a short unseen paragraph (3-4 lines). Ask them to write ONE आशय-सूचक question and answer.', 'Self-Correction.** Give them a "weak answer" (opinion-based, no evidence).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
