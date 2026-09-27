import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_kr_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_kr_ch15_p1: SimDef = {
    id: 'v3_c10_hin_kr_ch15_p1',
    title: 'साना-साना हाथ जोड़ि · Part 1/3',
    subtitle: 'इस नोड में केवल रचनाकार का संक्षिप्त जीवन-परिचय, उनकी साहित्यिक प्रवृत्तियाँ, रचना-काल का.',
    classLevel: 10, subject: 'hin_kr', topic: 'साना-साना हाथ जोड़ि · Part 1/3',
    chapters: ['c10_hin_kr_ch15'],
    nodeIds: ['c10_hin_kr_cbse_15_001', 'c10_hin_kr_cbse_15_002', 'c10_hin_kr_cbse_15_003', 'c10_hin_kr_cbse_15_004', 'c10_hin_kr_cbse_15_005', 'c10_hin_kr_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना करें कि आपको एक पुराना पारिवारिक पत्र मिला है जिसमें दादाजी ने गाँव के हालात लिखे हैं — आप उसे तब तक.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा, विचारधारा तथा रचना-काल की सामाजिक-ऐतिहासिक परिस्थितियों का वह अध्ययन जो पाठ के कथ्य, शिल्प और संवेदना को समझने का.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_kr_cbse_15_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — पृष्ठभूमि', 'पाठ 3 — कथानक', 'पाठ 3 — पाठ्य-परिवेश', 'पाठ 3 — पात्र-चित्रण', 'पाठ 3 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_kr_cbse_15_002', title: 'Identify each idea',
          dissect: { specimen: 'साना-साना हाथ जोड़ि · Part 1/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना.', answer: '3 -', options: ['3 -', '3 -'] },
            { id: 's2', label: '3 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और.', answer: '3 -', options: ['3 -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through साना-साना हाथ जोड़ि like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? साना-साना हाथ जोड़ि · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — साना-साना हाथ जोड़ि · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक.',
          hint: 'अगर अटके तो **पाठ्यपुस्तक के \'पृष्ठभूमि\' बॉक्स** को दोबारा पढ़ें और रचनाकार के जीवन की.',
          misconception: '**विशिष्ट भ्रांति:** "पृष्ठभूमि और रचनाकार परिचय" का अर्थ छात्र **\'जीवनी के तथ्य रटना\'** (जन्म-तिथि, मृत्यु-तिथि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख'],
                  hint: 'अगर अटके तो **पाठ्यपुस्तक के \'पृष्ठभूमि\' बॉक्स** को दोबारा पढ़ें और रचनाकार के जीवन की **तीन.',
                  misconception: '**विशिष्ट भ्रांति:** "पृष्ठभूमि और रचनाकार परिचय" का अर्थ छात्र **\'जीवनी के तथ्य रटना\'** (जन्म-तिथि, मृत्यु-तिथि, प्रमुख रचनाएँ) समझ लेते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहें — "पाठ 3 का कोई एक पात्र/प्रसंग चुनो जो तुम्हें सबसे मार्मिक लगा।" 2.', '**दूसरा कदम:** पूछें — "रचनाकार के जीवन में ऐसा क्या था जिसने उन्हें यह प्रसंग इस तरह लिखने को बाध्य किया?".', '**तीसरा कदम:** छात्र को एक वाक्य लिखने को कहें: "रचनाकार के ______ (अनुभव) के कारण पाठ में ______ (प्रसंग) ______.', '**चौथा कदम:** यही वाक्य बोर्ड उत्तर का **पहला वाक्य** (थीम सेंटेंस) बनेगा — इसका अभ्यास 3-4 अलग प्रसंगों पर करवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_002', difficulty: 'standard',
          question: 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि.',
          hint: 'यदि कथानक के चरण पहचानने में कठिनाई हो तो पाठ 2 — पृष्ठभूमि और रचनाकार परिचय.',
          misconception: 'विद्यार्थी अक्सर कथानक को सिर्फ कहानी की घटनाओं की सूची समझ लेते हैं और आख्यान-संरचना के चरणों (जैसे शिखर और समापन) को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना',
                  options: ['कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख'],
                  hint: 'यदि कथानक के चरण पहचानने में कठिनाई हो तो पाठ 2 — पृष्ठभूमि और रचनाकार परिचय.',
                  misconception: 'विद्यार्थी अक्सर कथानक को सिर्फ कहानी की घटनाओं की सूची समझ लेते हैं और आख्यान-संरचना के चरणों (जैसे शिखर और समापन) को intermix कर देते.' }
          ],
            remediations: { 'intermix': { steps: ['छात्र को पहले पाठ की दो घटनाएँ बताने के लिए कहें (जैसे पात्र की यात्रा शुरू होना और बाद में कोई कठिन निर्णय लेना)। फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक.',
          hint: 'यदि अटका हुआ महसूस हो तो **\'कथानक और आख्यान-संरचना\' (c10_hin_kr_cbse_15_002)** के.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि परिवेश वर्णन केवल \'सजावट\' के लिए होता है और परीक्षा में उसे छोड़कर केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और',
                  options: ['पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'कथानक और आख्यान-संरचना\' (c10_hin_kr_cbse_15_002)** के \'घटना-क्रम.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि परिवेश वर्णन केवल \'सजावट\' के लिए होता है और परीक्षा में उसे छोड़कर केवल कथानक/पात्र पर ध्यान देना.' }
          ],
            remediations: { 'cbse-3-5': { steps: ['**चरण 1:** छात्र से कहें: "किसी भी कहानी का पहला पन्ना खोलो और केवल पहले पैराग्राम में परिवेश के शब्द (समय, स्थान.', 'डर, शांति, उत्सुकता?" — वही वातावरण है। **चरण 3:** फिर कहें: "अब सोचो — अगर यह परिवेश बदल दिया जाए (गाँव के बजाय शहर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के.',
          hint: 'अगर अटकें तो **कक्षा 9 की \'गद्य खंड\' नोटबुक** खोलकर PEEL संरचना के 2-3 हल किए उदाहरण.',
          misconception: '**विशिष्ट भ्रांति**: "पात्र-चित्रण का अर्थ नायक के **गुण-दोषों की सूची** बनाना है — जैसे: ईमानदार, साहसी, भावुक, गरीब।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'अगर अटकें तो **कक्षा 9 की \'गद्य खंड\' नोटबुक** खोलकर PEEL संरचना के 2-3 हल किए उदाहरण देखें.',
                  misconception: '**विशिष्ट भ्रांति**: "पात्र-चित्रण का अर्थ नायक के **गुण-दोषों की सूची** बनाना है — जैसे: ईमानदार, साहसी, भावुक, गरीब।" **क्यों होती है**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "पाठ खोलो और नायक के **सिर्फ 5 संवाद** ढूँढ़ो जो तुम्हें सबसे महत्वपूर्ण लगते हैं। उन्हें.', '**चरण 2**: हर संवाद के सामने लिखवाएँ — "यह संवाद नायक के **कौन से गुण** को **कैसे** दिखाता है?', 'पाठ की कौन सी पंक्ति इसका प्रमाण है?" (PEEL का E और E अभ्यास)। 3.', '**चरण 3**: पूछें — "पहले संवाद और आखिरी संवाद में नायक की **भाषा/सोच में क्या अंतर** आया?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो कहानी के मुख्य पात्र के साथ अंतःक्रिया करते.',
          hint: 'Work step by step.',
          misconception: 'छात्र अक्सर सोचते हैं कि सहायक पात्र का चरित्र-चित्रण केवल उसके बारे में तथ्य बताने (जैसे: "रमेश एक किसान है और वह लाल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो कहानी के मुख्य पात्र के साथ अंतःक्रिया करते हैं, कथानक',
                  options: ['सहायक पात्र वे पात्र होते हैं जो कहानी के मुख्य पात्र के साथ अंतःक्रिया करते हैं, कथानक', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र अक्सर सोचते हैं कि सहायक पात्र का चरित्र-चित्रण केवल उसके बारे में तथ्य बताने (जैसे: "रमेश एक किसान है और वह लाल टोपी पहनता है") से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहिए कि वह पहले सहायक पात्र के बारे में दो तथ्य लिखे (जैसे व्यवसाय और एक आदत)। फिर उससे पूछिए: "इस तथ्य से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_006', difficulty: 'standard',
          question: '**मुख्य विषय (Main Theme)** वह केंद्रीय विचार या सार्वभौमिक सत्य है जो पूरी.',
          hint: 'यदि अटके तो **नोड 002 (कथानक)** के \'प्रमुख मोड़\' अनुभाग को दोहराएँ और **नोड 004 (नायक)**.',
          misconception: '**विषय = कथानक का सारांश** — यह सबसे घातक भ्रम है। छात्र लिखते हैं: "विषय यह है कि नायक गाँव से शहर गया, नौकरी की, फिर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (Main Theme)** वह केंद्रीय विचार या सार्वभौमिक सत्य है जो पूरी रचना में',
                  options: ['**मुख्य विषय (Main Theme)** वह केंद्रीय विचार या सार्वभौमिक सत्य है जो पूरी रचना में', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटके तो **नोड 002 (कथानक)** के \'प्रमुख मोड़\' अनुभाग को दोहराएँ और **नोड 004 (नायक)** के \'आंतरिक.',
                  misconception: '**विषय = कथानक का सारांश** — यह सबसे घातक भ्रम है। छात्र लिखते हैं: "विषय यह है कि नायक गाँव से शहर गया, नौकरी की, फिर गाँव लौटा।" **क्यों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "कहानी **क्या** हुई (Plot) और **क्यों** हुई/क्या सीख (Theme/Message) — दो कॉलम बनाओ।" 2.', '**चरण 2**: पाठ के **अंतिम दो पृष्ठ** पढ़वाएँ — लेखक अक्सर अंत में संदेश स्पष्ट करता है। पूछें: "अंतिम संवाद/विचार क्या.', '**चरण 3**: **PEEL मॉडल** दें: Point (विषय), Evidence (उद्धरण), Explanation (कैसे सिद्ध होता है), Link (संदेश से जुड़ाव).', '**चरण 4**: छात्र को **एक प्रसंग** देकर अभ्यास कराएँ — तुरंत फीडबैक दें: "तुमने घटना लिखी, विचार नहीं।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
