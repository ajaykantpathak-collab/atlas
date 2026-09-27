import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch02_p1: SimDef = {
    id: 'v3_c8_hin_ch02_p1',
    title: 'पाठ 2 · Part 1/3',
    subtitle: 'यह नोड केवल रचनाकार के जीवन परिचय, साहित्यिक परिचय, कालखंड की प्रमुख प्रवृत्तियों और पाठ.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 2 · Part 1/3',
    chapters: ['c8_hin_ch02'],
    nodeIds: ['c8_hin_cbse_02_001', 'c8_hin_cbse_02_002', 'c8_hin_cbse_02_003', 'c8_hin_cbse_02_004', 'c8_hin_cbse_02_005', 'c8_hin_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करें आप एक जासूस हैं जिसे एक गुमनाम पत्र मिला है — आप सबसे पहले क्या करेंगे?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल की सामाजिक-सांस्कृतिक परिस्थितियों, उनकी साहित्यिक विचारधारा और प्रमुख कृतियों को जानना ताकि पाठ के अंतर्निहित.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_02_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 1/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन.', answer: '2 -', options: ['2 -', '2 -'] },
            { id: 's2', label: '2 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान.', answer: '2 -', options: ['2 -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके.',
          hint: 'यदि फंसें तो कक्षा 7 के \'रचनाकार परिचय\' नोट्स देखें जहां किसी एक रचनाकार (जैसे.',
          misconception: 'छात्र मानते हैं कि \'रचनाकार परिचय\' का अर्थ है विकिपीडिया जैसी जीवनी रटना (जन्म, मृत्यु, पुस्तकें)। वे यह नहीं समझते कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें कहानी/उपन्यास के'],
                  hint: 'यदि फंसें तो कक्षा 7 के \'रचनाकार परिचय\' नोट्स देखें जहां किसी एक रचनाकार (जैसे प्रेमचंद/फणीश्वरनाथ.',
                  misconception: 'छात्र मानते हैं कि \'रचनाकार परिचय\' का अर्थ है विकिपीडिया जैसी जीवनी रटना (जन्म, मृत्यु, पुस्तकें)। वे यह नहीं समझते कि परीक्षा और वास्तविक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['1) छात्र से कहें: "रचनाकार की जीवनी से तीन ऐसी घटनाएं छांटो जो तुम्हें सबसे ज्यादा छू गईं।" 2) फिर पूछें: "इनमें से कौन.', 'एक वाक्य में लिखो।" 3) अब पाठ से एक उद्धरण (कोट) ढूंढने को कहें जो उस घटना की झलक देता हो। 4) अंत में दोनों को जोड़ने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_002', difficulty: 'standard',
          question: 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि.',
          hint: 'यदि अटका हुआ लगे तो कक्षा 7 के \'कथानक और आख्यान-संरचना\' (c7_hin_cbse_02_002) के.',
          misconception: 'छात्र अक्सर मानते हैं कि \'कथानक के चरण\' (आरंभ, विकास, चरम, पतन, अंत) ही \'आख्यान-संरचना\' हैं। उदाहरण: वे फ्रायटाग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन',
                  options: ['कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें कहानी/उपन्यास के'],
                  hint: 'यदि अटका हुआ लगे तो कक्षा 7 के \'कथानक और आख्यान-संरचना\' (c7_hin_cbse_02_002) के फ्लैशबैक/रैखिक.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'कथानक के चरण\' (आरंभ, विकास, चरम, पतन, अंत) ही \'आख्यान-संरचना\' हैं। उदाहरण: वे फ्रायटाग पिरामिड बना कर समझते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "एक परिचित फिल्म (जैसे \'बाहुबली\' या \'दंगल\') के 5 प्रमुख दृश्य कागज़ पर समय-क्रम में लिखो।" 2.', 'फिर पूछें: "क्या फिल्म इसी क्रम में दिखाई गई थी?', 'यदि नहीं, तो किस दृश्य को आगे/पीछे किया गया?" 3.', 'अब समझाएँ: "जो क्रम तुमने लिखा—वह कथानक है; जो क्रम फिल्म में दिखा—वह संरचना है।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 7 के \'पाठ्य-परिवेश और वातावरण\' (c7_hin_cbse_02_003) के.',
          misconception: 'छात्र अक्सर मानते हैं कि \'परिवेश\' केवल भौगोलिक स्थान (गाँव, शहर, नदी, पहाड़) है और \'वातावरण\' केवल मौसम (बारिश, धूप.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,',
                  options: ['पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें कहानी/उपन्यास के'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 7 के \'पाठ्य-परिवेश और वातावरण\' (c7_hin_cbse_02_003) के \'संवेदी बिंब.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'परिवेश\' केवल भौगोलिक स्थान (गाँव, शहर, नदी, पहाड़) है और \'वातावरण\' केवल मौसम (बारिश, धूप, सर्दी)। वे यह नहीं देख.' }
          ],
            remediations: { 'wrong-idea': { steps: ['1) छात्र को एक परिचित दृश्य (स्कूल की प्रार्थना सभा) दें और पूछें: "यहाँ भौतिक रूप से क्या है?', 'अब बताओ — यहाँ कौन-से अदृश्य नियम चल रहे हैं?', '(अनुशासन, पंक्ति, मौन, वरिष्ठता)।" 2) फिर एक कहानी का अंश दें जहाँ सामाजिक नियम (जैसे बाल विवाह, दहेज, छुआछूत) पात्र को.', 'ढूंढो।" 4) अंत में समझाएं: परिवेश = दृश्य + अदृश्य नियम। वातावरण = उनसे उपजा दबाव/मुक्ति।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें.',
          hint: 'यदि अटका हुआ महसूस हो तो: **कक्षा 7 के पात्र-चित्रण नोट्स (c7_hin_cbse_02_004)** देखें और.',
          misconception: '**विशिष्ट भ्रांति**: "पात्र-चित्रण का अर्थ है नायक के गुणों की **सूची (list)** बनाना — जैसे: बहादुर, ईमानदार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें कहानी/उपन्यास के',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें कहानी/उपन्यास के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: **कक्षा 7 के पात्र-चित्रण नोट्स (c7_hin_cbse_02_004)** देखें और PEEL.',
                  misconception: '**विशिष्ट भ्रांति**: "पात्र-चित्रण का अर्थ है नायक के गुणों की **सूची (list)** बनाना — जैसे: बहादुर, ईमानदार, बुद्धिमान, दयालु।" **क्यों.' }
          ],
            remediations: { 'list': { steps: ['**चरणबद्ध उपचार**: 1) छात्र से कहो: "पाठ खोलो, नायक के किसी एक गुण (जैसे साहस) के आगे **तीन बार** \'क्यों?\' पूछो — हर.', 'अगर नहीं, तो एक वाक्य जोड़ो: \'यह साहस ही है जो अंत में गाँव को बचाता है।\'" इस **\'तीन बार क्यों\' + PEEL** अभ्यास को दो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_005', difficulty: 'standard',
          question: 'सहायक पात्र (supporting characters) are fictional persons in a narrative who.',
          hint: 'यदि अटका हुआ महसूस हो, तो कक्षा 7 के \'पात्र-चित्रण: सहायक पात्र\' (c7_hin_cbse_02_005) के.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'सहायक पात्र\' (supporting character) को \'गौण पात्र\' (minor/flat character) समझ लेते हैं और मान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (supporting characters) are fictional persons in a narrative who interact',
                  options: ['सहायक पात्र (supporting characters) are fictional persons in a narrative who interact', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,'],
                  hint: 'यदि अटका हुआ महसूस हो, तो कक्षा 7 के \'पात्र-चित्रण: सहायक पात्र\' (c7_hin_cbse_02_005) के \'प्रकार और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'सहायक पात्र\' (supporting character) को \'गौण पात्र\' (minor/flat character) समझ लेते हैं और मान लेते हैं कि इनका.' }
          ],
            remediations: { 'supporting-character-minor-flat-character': { steps: ['**शब्दावली स्पष्टीकरण (5 मिनट):** बोर्ड पर लिखें — \'सहायक पात्र ≠ गौण पात्र\'। समझाएँ: \'सहायक\' = कथा में योगदानकर्ता.', '**ज्ञात उदाहरण से जोड़ें (5 मिनट):** कक्षा 7 के किसी पाठ (जैसे \'दादी माँ\' या \'काबुलीवाला\') का सहायक पात्र लें — छात्रों.', '**कार्य-आधारित विश्लेषण शीट दें (10 मिनट):** एक तालिका दें — पात्र का नाम | क्रिया/संवाद | नायक पर प्रभाव | कथात्मक.', '**पुनरावृत्ति:** अगले दो कक्षाओं में हर पाठ के एक सहायक पात्र का इसी शीट से विश्लेषण करवाएँ जब तक आदत न बन जाए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'सहायक पात्र\' (supporting character) को \'गौण पात्र\' (minor/flat character) समझ लेते हैं और मान.',
          parts: [
                { id: 'a', prompt: '"कथानक में सहायक पात्र केवल नायक की सहायता के लिए होते हैं।" — इस कथन का मूल्यांकन करें। क्या आप सहमत हैं? कारण सहित उत्तर दें।', answer: '**असहमत।** सहायक पात्र केवल \'सहायता\' नहीं करते',
                  options: ['**असहमत।** सहायक पात्र केवल \'सहायता\' नहीं करते', 'हाँ, सहायक पात्र मदद करते हैं'],
                  hint: 'यदि अटका हुआ महसूस हो, तो कक्षा 7 के \'पात्र-चित्रण: सहायक पात्र\' (c7_hin_cbse_02_005) के \'प्रकार और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'सहायक पात्र\' (supporting character) को \'गौण पात्र\' (minor/flat character) समझ लेते हैं और मान लेते हैं कि इनका.' }
          ],
            remediations: { 'supporting-character-minor-flat-character': { steps: ['**शब्दावली स्पष्टीकरण (5 मिनट):** बोर्ड पर लिखें — \'सहायक पात्र ≠ गौण पात्र\'। समझाएँ: \'सहायक\' = कथा में योगदानकर्ता.', '**ज्ञात उदाहरण से जोड़ें (5 मिनट):** कक्षा 7 के किसी पाठ (जैसे \'दादी माँ\' या \'काबुलीवाला\') का सहायक पात्र लें — छात्रों.', '**कार्य-आधारित विश्लेषण शीट दें (10 मिनट):** एक तालिका दें — पात्र का नाम | क्रिया/संवाद | नायक पर प्रभाव | कथात्मक.', '**पुनरावृत्ति:** अगले दो कक्षाओं में हर पाठ के एक सहायक पात्र का इसी शीट से विश्लेषण करवाएँ जब तक आदत न बन जाए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_02_006', difficulty: 'standard',
          question: '"मुख्य विषय" (main theme) is the central, universal idea explored throughout.',
          hint: 'यदि अटके, तो c8_hin_cbse_02_002 (कथानक संरचना) और c8_hin_cbse_02_004 (नायक चित्रण).',
          misconception: 'छात्र अक्सर **मुख्य विषय को \'एक शब्द\' (जैसे: प्रेम, साहस) में समेट देते हैं और संदेश को \'नैतिक शिक्षा\' (जैसे: हमें.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"मुख्य विषय" (main theme) is the central, universal idea explored throughout a literary',
                  options: ['"मुख्य विषय" (main theme) is the central, universal idea explored throughout a literary', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन काल', 'कथानक (कथावस्तु) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है, जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) किसी साहित्यिक रचना में घटनाओं के घटित होने का भौतिक स्थान,'],
                  hint: 'यदि अटके, तो c8_hin_cbse_02_002 (कथानक संरचना) और c8_hin_cbse_02_004 (नायक चित्रण) दोहराएं — विषय.',
                  misconception: 'छात्र अक्सर **मुख्य विषय को \'एक शब्द\' (जैसे: प्रेम, साहस) में समेट देते हैं और संदेश को \'नैतिक शिक्षा\' (जैसे: हमें साहसी होना चाहिए) मान.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "कहानी का शीर्षक यदि एक वाक्य होता, तो वह क्या होता?" — इससे विषय का वाक्य-रूप उभरता है। 2.', 'फिर पूछें: "लेखक ने इस कहानी को लिखने में महीनों लगाए — वह तुमसे **क्या समझाना** चाहता था, न कि **क्या करवाना**?".', 'अब पाठ से 3 प्रसंग चुनवाएं और प्रत्येक के आगे लिखवाएं: "यह प्रसंग विषय ______ को कैसे आगे बढ़ाता है?" — इससे.', 'अंत में: "यदि कहानी का अंत बदल दें, तो संदेश बदलेगा या नहीं?" — इससे संदेश की विषय-निर्भरता समझ आती है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
