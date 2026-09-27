import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch08_p1: SimDef = {
    id: 'v3_c7_hin_ch08_p1',
    title: 'पाठ 8 · Part 1/3',
    subtitle: 'इस नोड में कक्षा 7 के पाठ 8 की **विशिष्ट पृष्ठभूमि (समयकाल, परिवेश, प्रेरणा स्रोत)** और.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 8 · Part 1/3',
    chapters: ['c7_hin_ch08'],
    nodeIds: ['c7_hin_cbse_08_001', 'c7_hin_cbse_08_002', 'c7_hin_cbse_08_003', 'c7_hin_cbse_08_004', 'c7_hin_cbse_08_005', 'c7_hin_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो तुमने एक पुराना पारिवारिक फ़ोटो एल्बम खोला — पहली तस्वीर देखते ही तुम पूछते हो: "ये कब खींची गई?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — पृष्ठभूमि और रचनाकार परिचय', text: '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें रचना की रचना हुई या जिसकी पृष्ठभूमि पर कथानक आधारित है। **रचनाकार परिचय** में लेखक के जीवन के उन प्रमुख.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — पृष्ठभूमि', 'पाठ 8 — कथानक', 'पाठ 8 — पाठ्य-परिवेश', 'पाठ 8 — पात्र-चित्रण', 'पाठ 8 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 1/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष.', answer: '8 -', options: ['8 -', '8 -'] },
            { id: 's2', label: '8 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को.', answer: '8 -', options: ['8 -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 8 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_001', difficulty: 'standard',
          question: '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से.',
          hint: 'यदि अटके तो **कक्षा 6 के किसी भी पाठ (जैसे पाठ 1 या 8) की पृष्ठभूमि और रचनाकार परिचय को.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि **"पृष्ठभूमि = इतिहास का पाठ" और "रचनाकार परिचय = जीवनी का पाठ"** — दोनों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें',
                  options: ['**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें हम नायक/प्रमुख पात्र'],
                  hint: 'यदि अटके तो **कक्षा 6 के किसी भी पाठ (जैसे पाठ 1 या 8) की पृष्ठभूमि और रचनाकार परिचय को फिर से.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि **"पृष्ठभूमि = इतिहास का पाठ" और "रचनाकार परिचय = जीवनी का पाठ"** — दोनों को **पाठ 8 से.' }
          ],
            remediations: { '8': { steps: ['**साक्ष्य-आधारित जोड़ (Evidence linking):** विद्यार्थी से कहो — "पृष्ठभूमि से **एक वाक्य** उठाओ (जैसे: \'उस दौर में.', '**रचनाकार की आवाज़ पहचानो:** रचनाकार के किसी **साक्षात्कार/आत्मकथा के अंश** (यदि उपलब्ध हो) पढ़वाओ जहाँ वे बताएँ "मैंने.', '**तुलनात्मक अभ्यास:** उसी रचनाकार की **दो अलग पृष्ठभूमि वाली कहानियाँ** (कक्षा 6 की कोई और पाठ 8 के साथ) साथ रखो.', '**लिखित प्रतिबिंब:** विद्यार्थी **3 वाक्यों** में लिखे: "पृष्ठभूमि ने इस कहानी को ______ बनाया, क्योंकि ______। रचनाकार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_002', difficulty: 'standard',
          question: 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो.',
          hint: 'यदि अटका हुआ लगे: **कक्षा 6 के किसी भी पाठ (c6_hin_cbse_01_002 आदि) का कथानक-सोपान.',
          misconception: '**विशिष्ट भ्रम:** छात्र **फ्रेटैग पिरामिड के पांच सोपान (उत्प्रेरण, विकास, चरम, पतन, समाधान) को "रट" लेते हैं** और हर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष',
                  options: ['कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें हम नायक/प्रमुख पात्र'],
                  hint: 'यदि अटका हुआ लगे: **कक्षा 6 के किसी भी पाठ (c6_hin_cbse_01_002 आदि) का कथानक-सोपान चार्ट** दोबारा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **फ्रेटैग पिरामिड के पांच सोपान (उत्प्रेरण, विकास, चरम, पतन, समाधान) को "रट" लेते हैं** और हर कहानी पर यांत्रिक रूप.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से एक परिचित फिल्म/कहानी के **सिर्फ 5 मुख्य घटनाएं** कागज पर लिखवाओ — **क्रम में नहीं, जैसे याद.', '**दूसरा कदम:** साथ मिलकर तीर (→) खींचकर दिखाओ: "यह घटना **इसके कारण** हुई" — इससे **कारणात्मक श्रृंखला (कथानक)** बनेगी।.', '**तीसरा कदम:** अब पूछो: "लेखक/निर्देशक ने इन्हें **किस क्रम में दिखाया**?" — दोनों क्रमों की तुलना से **आख्यान-संरचना**.', '**चौथा कदम:** एक ही कहानी के दो संस्करण पढ़वाओ — एक रैखिक, एक फ्लैशबैक युक्त — और पूछो: "कौन-सा संस्करण तुम्हें **कैसा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक.',
          hint: 'यदि अटका हुआ लगे तो कक्षा ६ के पाठ ८ (c6_hin_cbse_08_003) के \'परिवेश पहचान\' अभ्यास.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'वातावरण\' पात्रों की **आंतरिक मनोदशा** (मूड) के समान है — जैसे "रामू दुखी था.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को',
                  options: ['पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें हम नायक/प्रमुख पात्र'],
                  hint: 'यदि अटका हुआ लगे तो कक्षा ६ के पाठ ८ (c6_hin_cbse_08_003) के \'परिवेश पहचान\' अभ्यास दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'वातावरण\' पात्रों की **आंतरिक मनोदशा** (मूड) के समान है — जैसे "रामू दुखी था, इसलिए वातावरण दुखी था।".' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण १:** छात्र से कहो: "आँखें बंद करो। मैं तुम्हें एक कमरे का वर्णन पढ़ता हूँ — तुम बताओ तुम्हें कैसा **लग रहा है**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें हम.',
          hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_01_004** (या किसी भी Class 6 पात्र-चित्रण नोड) की.',
          misconception: '**विशिष्ट भ्रम**: विद्यार्थी मानते हैं कि **पात्र-चित्रण = विशेषणों की सूची** (जैसे: "नायक बहादुर, दयालु, ईमानदार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें हम नायक/प्रमुख पात्र',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें हम नायक/प्रमुख पात्र', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_01_004** (या किसी भी Class 6 पात्र-चित्रण नोड) की **"PEEL.',
                  misconception: '**विशिष्ट भ्रम**: विद्यार्थी मानते हैं कि **पात्र-चित्रण = विशेषणों की सूची** (जैसे: "नायक बहादुर, दयालु, ईमानदार, बुद्धिमान है")। वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग**: एक परिचित पात्र (जैसे \'हैरी पॉटर\' या पाठ्यपुस्तक के किसी पात्र) का **गलत चित्रण** (केवल विशेषण) और **सही.', '**संयुक्त अभ्यास**: विद्यार्थी से कहो: "पाठ से **तीन वाक्य** छाँटो जो नायक के स्वभाव को दिखाते हों — विशेषण मत ढूँढो.', '**ग्राफिक ऑर्गनाइज़र**: एक टेबल बनवाओ — कॉलम: विशेषता | साक्ष्य (उद्धरण/घटना) | यह क्या दर्शाता है | कथानक से संबंध।.', '**फीडबैक लूप**: पहले ड्राफ्ट पर केवल एक टिप्पणी दो: "यहाँ साक्ष्य कहाँ है?" — विद्यार्थी स्वयं सुधारे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर कथानक को गति.',
          hint: 'यदि अटका हुआ लगे: c7_hin_cbse_08_004 (नायक चित्रण) पर लौटकर नायक के गुणों की सूची बनाओ.',
          misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र = \'कम महत्वपूर्ण पात्र\'। वे शब्द \'सहायक\' को \'गौण/द्वितीयक\' समझ लेते हैं, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर कथानक को गति देते हैं,',
                  options: ['सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर कथानक को गति देते हैं,', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को'],
                  hint: 'यदि अटका हुआ लगे: c7_hin_cbse_08_004 (नायक चित्रण) पर लौटकर नायक के गुणों की सूची बनाओ, फिर.',
                  misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र = \'कम महत्वपूर्ण पात्र\'। वे शब्द \'सहायक\' को \'गौण/द्वितीयक\' समझ लेते हैं, जबकि साहित्य में सहायक पात्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "पाठ के किसी एक पृष्ठ पर नायक के नाम को लाल पेन से और अन्य सभी पात्रों के नाम को नीले पेन से घेरो।" 2.', 'फिर पूछो: "नीले घेरे वाले पात्र नायक से क्या *कहते/करते* हैं जो नायक अकेले नहीं कर सकता?" 3.', 'प्रत्येक नीले पात्र के लिए एक वाक्य लिखवाओ: "इस पात्र के बिना नायक ______ नहीं कर पाता।" 4.', 'अंत में चर्चा करो: "कौन-सा नीला पात्र नायक का foil है और कौन सा दर्पण?" — यह दृश्यात्मक अभ्यास \'गौणता\' का भ्रम तोड़ता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह मूल विचार या सार्वभौमिक सत्य है जिसका अन्वेषण.',
          hint: 'अगर अटके तो c7_hin_cbse_08_002 (कथानक) और c7_hin_cbse_08_004 (नायक चित्रण) दोबारा पढ़ें.',
          misconception: 'छात्र अक्सर मान लेते हैं कि \'मुख्य विषय\' कहानी का शीर्षक या नायक का पेशा होता है (जैसे "यह डॉक्टर की कहानी है, तो विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह मूल विचार या सार्वभौमिक सत्य है जिसका अन्वेषण पूरी रचना में',
                  options: ['मुख्य विषय (Central Theme) वह मूल विचार या सार्वभौमिक सत्य है जिसका अन्वेषण पूरी रचना में', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को'],
                  hint: 'अगर अटके तो c7_hin_cbse_08_002 (कथानक) और c7_hin_cbse_08_004 (नायक चित्रण) दोबारा पढ़ें — विषय वहीं.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि \'मुख्य विषय\' कहानी का शीर्षक या नायक का पेशा होता है (जैसे "यह डॉक्टर की कहानी है, तो विषय चिकित्सा है")। वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ की तीन सबसे बड़ी घटनाएँ लिखो। फिर प्रत्येक के आगे लिखो: \'इससे लेखक क्या कहना चाहता है?\' — विषय वही.', 'एक परिचित फ़िल्म (जैसे \'तारे ज़मीन पर\') का उदाहरण लेकर विषय (\'हर बच्चा ख़ास है\') और विषयवस्तु (\'डिस्लेक्सिया वाला.', 'पाठ 8 के दो संवाद चुनवाएँ जो विषय के विपरीत लगते हों (जैसे डॉक्टर का डर vs उसका जाना) और पूछें: "दोनों में क्या तनाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
