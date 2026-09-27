import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch05_p1: SimDef = {
    id: 'v3_c10_hin_ks_ch05_p1',
    title: 'पाठ 5 · Part 1/3',
    subtitle: 'यह नोड केवल सूर्यकांत त्रिपाठी \'निराला\' के जीवन-परिचय, प्रमुख रचनाएँ, साहित्यिक.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 5 · Part 1/3',
    chapters: ['c10_hin_ks_ch05'],
    nodeIds: ['c10_hin_ks_cbse_05_001', 'c10_hin_ks_cbse_05_002', 'c10_hin_ks_cbse_05_003', 'c10_hin_ks_cbse_05_004', 'c10_hin_ks_cbse_05_005', 'c10_hin_ks_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'क्या आपने कभी सोचा है कि कोई कवि अपनी कविता में इतने तीखे तेवर और नई शैली क्यों लाता है?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन परिस्थितियों, और वैचारिक पृष्ठभूमि को जानना ताकि उनकी रचनाओं के मूल भाव को गहराई से समझा जा सके।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — कवि', 'पाठ 5 — पद्यांश-वार', 'पाठ 5 — काव्य-संरचना', 'पाठ 5 — केंद्रीय', 'पाठ 5 — छंद', 'पाठ 5 — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 1/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों.', answer: '5 -', options: ['5 -', '5 - -', '5 -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक.', answer: '5 - -', options: ['5 - -', '5 -', '5 -'] },
            { id: 's3', label: '5 -', prompt: 'Which idea is this? — **छंद** कविता का वह निश्चित मात्रा-विधान है जिसमें प्रत्येक चरण (पंक्ति) में मात्राओं की.', answer: '5 -', options: ['5 -', '5 -', '5 - -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_001', difficulty: 'standard',
          question: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा.',
          hint: 'यदि अटका हुआ महसूस करें तो कक्षा 9 की हिंदी पुस्तक \'कृतिका\' या \'क्षितिज\' के छायावाद परिचय.',
          misconception: 'छात्र अक्सर निराला जी को केवल \'छायावादी कवि\' मानकर उनकी रोमांटिक कल्पना पर ही ध्यान देते हैं, जबकि उनकी सबसे बड़ी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन',
                  options: ['कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक', 'केंद्रीय भाव वह मुख्य भावना या मनोदशा है जिस पर कविता का पूरा ध्यान केन्द्रित होता है'],
                  hint: 'यदि अटका हुआ महसूस करें तो कक्षा 9 की हिंदी पुस्तक \'कृतिका\' या \'क्षितिज\' के छायावाद परिचय वाले.',
                  misconception: 'छात्र अक्सर निराला जी को केवल \'छायावादी कवि\' मानकर उनकी रोमांटिक कल्पना पर ही ध्यान देते हैं, जबकि उनकी सबसे बड़ी विशेषता है — छायावाद की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को निराला की दो कविताएँ (\'उत्साह\' और \'सरोज-स्मृति\') साथ रखकर पढ़वाएँ और पूछें: \'दोनों में दुख है, पर स्वर कैसे.', 'फिर उन्हें निराला के जीवन की तीन घटनाएँ (माँ की मृत्यु, पत्नी की मृत्यु, आर्थिक तंगी) लिखवाएँ और प्रत्येक के सामने.', 'अंत में उनसे पूछें: \'यदि निराला विद्रोही न होते तो क्या वे मुक्तछंद लिख पाते?\' इस चर्चा से वे विद्रोह और शैली का संबंध.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों.',
          hint: 'यदि अटके तो कवि परिचय और पृष्ठभूमि (c10_hin_ks_cbse_05_001) दोबारा पढ़ें, विशेषकर कवि की.',
          misconception: 'विद्यार्थी समझते हैं कि पद्यांश-वार भावार्थ = प्रत्येक शब्द का शब्दकोशीय अर्थ लिखना। वे \'निर्झर\' का अर्थ \'झरना\' लिखकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक', 'केंद्रीय भाव वह मुख्य भावना या मनोदशा है जिस पर कविता का पूरा ध्यान केन्द्रित होता है'],
                  hint: 'यदि अटके तो कवि परिचय और पृष्ठभूमि (c10_hin_ks_cbse_05_001) दोबारा पढ़ें, विशेषकर कवि की अन्य.',
                  misconception: 'विद्यार्थी समझते हैं कि पद्यांश-वार भावार्थ = प्रत्येक शब्द का शब्दकोशीय अर्थ लिखना। वे \'निर्झर\' का अर्थ \'झरना\' लिखकर रुक जाते हैं, जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['विद्यार्थी से एक परिचित कविता (जैसे \'पुष्प की अभिलाषा\') का एक पद्यांश लेकर केवल शब्दार्थ लिखवाएं। 2.', 'फिर उसी पद्यांश का \'कवि क्या कहना चाहता है?\' पूछकर भावार्थ लिखवाएं। 3.', 'दोनों की तुलना कराकर पूछें: "कौन-सा उत्तर कवि के मन के अधिक निकट है?" 4.', 'अंत में \'शब्दार्थ vs भावार्थ\' का T-चार्ट बनवाकर दीवार पर लगवाएं; हर नई कविता में इसी प्रक्रिया को दोहराएं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति.',
          hint: 'यदि अटके तो कक्षा 9 के \'छंद परिचय\' नोड (मात्रिक/वर्णिक छंद, गण, यति, गुरु-लघु) की समीक्षा.',
          misconception: 'छात्र अक्सर समझते हैं कि काव्य-संरचना केवल \'तुक\' (rhyme) तक सीमित है और छंद (meter), पद-विभाजन, एनजैम्बमेंट, पंक्ति.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक',
                  options: ['काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'केंद्रीय भाव वह मुख्य भावना या मनोदशा है जिस पर कविता का पूरा ध्यान केन्द्रित होता है'],
                  hint: 'यदि अटके तो कक्षा 9 के \'छंद परिचय\' नोड (मात्रिक/वर्णिक छंद, गण, यति, गुरु-लघु) की समीक्षा करें।',
                  misconception: 'छात्र अक्सर समझते हैं कि काव्य-संरचना केवल \'तुक\' (rhyme) तक सीमित है और छंद (meter), पद-विभाजन, एनजैम्बमेंट, पंक्ति लंबाई, विराम चिह्नों को.' }
          ],
            remediations: { 'rhyme-meter': { steps: ['छात्र को एक सरल बाल गीत (जैसे "मछली जल की रानी है") दें और उसे पद, पंक्ति, तुक योजना, छंद (मात्रिक) पहचानने को कहें। 2.', 'फिर उसी गीत की एक पंक्ति हटाकर/जोड़कर पूछें: "अब लय कैसी लगी?" 3.', 'अंत में मूल कविता के एक पद पर यही अभ्यास दोहराएं, चरण-दर-चरण मार्गदर्शन करते हुए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_004', difficulty: 'standard',
          question: 'केंद्रीय भाव वह मुख्य भावना या मनोदशा है जिस पर कविता का पूरा ध्यान केन्द्रित.',
          hint: 'पद्यांश-वार भावार्थ (node c10_hin_ks_cbse_05_002) की समीक्षा करके stanza-wise अर्थ.',
          misconception: 'छात्र अक्सर यह मान लेते हैं कि केंद्रीय भाव और रस एक ही चीज हैं, या तो वे रस को केवल कवि के मनोदशा का पर्याय समझते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव वह मुख्य भावना या मनोदशा है जिस पर कविता का पूरा ध्यान केन्द्रित होता है',
                  options: ['केंद्रीय भाव वह मुख्य भावना या मनोदशा है जिस पर कविता का पूरा ध्यान केन्द्रित होता है', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक'],
                  hint: 'पद्यांश-वार भावार्थ (node c10_hin_ks_cbse_05_002) की समीक्षा करके stanza-wise अर्थ निकालने की विधि.',
                  misconception: 'छात्र अक्सर यह मान लेते हैं कि केंद्रीय भाव और रस एक ही चीज हैं, या तो वे रस को केवल कवि के मनोदशा का पर्याय समझते हैं, जैसे कि यदि कविता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही केंद्रीय भाव से अलग-अलग रस उत्पन्न हो सकते हैं: उदाहरण के लिए, "प्रेम" केंद्रीय भाव से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_005', difficulty: 'standard',
          question: '**छंद** कविता का वह निश्चित मात्रा-विधान है जिसमें प्रत्येक चरण (पंक्ति) में.',
          hint: 'यदि अटके तो **कक्षा 9 हिंदी व्याकरण — वर्ण-विचार (मात्रा-नियम)** दोहराएँ।',
          misconception: '**विशिष्ट भ्रम:** छात्र **मात्रा-गणना में संयुक्त व्यंजनों (जैसे \'क्ल\', \'त्र\', \'श्र\') और अनुस्वार/अनुनासिक** को या तो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**छंद** कविता का वह निश्चित मात्रा-विधान है जिसमें प्रत्येक चरण (पंक्ति) में मात्राओं की',
                  options: ['**छंद** कविता का वह निश्चित मात्रा-विधान है जिसमें प्रत्येक चरण (पंक्ति) में मात्राओं की', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक'],
                  hint: 'यदि अटके तो **कक्षा 9 हिंदी व्याकरण — वर्ण-विचार (मात्रा-नियम)** दोहराएँ।',
                  misconception: '**विशिष्ट भ्रम:** छात्र **मात्रा-गणना में संयुक्त व्यंजनों (जैसे \'क्ल\', \'त्र\', \'श्र\') और अनुस्वार/अनुनासिक** को या तो **दो मात्राएँ गिन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः सिखाएँ:** हिंदी वर्णमाला के **संयुक्त व्यंजन** (क्ल, त्र, श्र, ज्ञ, आदि) और **अनुस्वार/अनुनासिक** के मात्रा-नियम.', '**अभ्यास:** पाठ-5 की **पहली 4 पंक्तियाँ** लें, प्रत्येक शब्द की मात्रा **लिखकर** गिनवाएँ (मौखिक नहीं)। 3.', '**जाँच:** छात्र से पूछें — "यहाँ \'व्\' की मात्रा क्यों नहीं गिनी?" — जब तक वह **नियम बोलकर न बताए**, आगे न बढ़ें। 4.', '**सुदृढ़ीकरण:** 5 और पंक्तियों पर यही प्रक्रिया दोहराएँ; फिर छंद-नाम पहचानने को कहें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_006', difficulty: 'standard',
          question: 'अलंकार काव्य की वह रसायनिक क्रिया है जिसमें शब्द, अर्थ या ध्वनि के विशेष प्रयोग.',
          hint: 'यदि अटके: नोड 002 (पद्यांश-वार भावार्थ) पर लौटें — पहले पंक्ति का **सरल अर्थ** लिखें, फिर.',
          misconception: '**विशिष्ट भ्रम:** छात्र **उत्प्रेक्षा** और **अतिशयोक्ति** को एक मान लेते हैं क्योंकि दोनों में "कल्पना" और "बढ़ा-चढ़ाकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार काव्य की वह रसायनिक क्रिया है जिसमें शब्द, अर्थ या ध्वनि के विशेष प्रयोग से कथन',
                  options: ['अलंकार काव्य की वह रसायनिक क्रिया है जिसमें शब्द, अर्थ या ध्वनि के विशेष प्रयोग से कथन', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक'],
                  hint: 'यदि अटके: नोड 002 (पद्यांश-वार भावार्थ) पर लौटें — पहले पंक्ति का **सरल अर्थ** लिखें, फिर अलंकार.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **उत्प्रेक्षा** और **अतिशयोक्ति** को एक मान लेते हैं क्योंकि दोनों में "कल्पना" और "बढ़ा-चढ़ाकर कहना" दिखता है।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को दो पंक्तियाँ दें — एक उत्प्रेक्षा, एक अतिशयोक्ति — और पूछें: "कवि यहाँ **पूछ रहा है/सोच रहा है** या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
