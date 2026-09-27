import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch01_p1: SimDef = {
    id: 'v3_c10_hin_ks_ch01_p1',
    title: 'पाठ 1 · Part 1/3',
    subtitle: 'इस नोड में केवल कवि के जीवन‑परिचय (जन्म‑स्थल, युग, प्रमुख घटनाएँ, साहित्यिक प्रवृत्ति) का.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 1 · Part 1/3',
    chapters: ['c10_hin_ks_ch01'],
    nodeIds: ['c10_hin_ks_cbse_01_001', 'c10_hin_ks_cbse_01_002', 'c10_hin_ks_cbse_01_003', 'c10_hin_ks_cbse_01_004', 'c10_hin_ks_cbse_01_005', 'c10_hin_ks_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आपकी कक्षा में एक नया विद्यालय आया है और आप उससे दोस्ती करना चाहते हैं—पहले आप उसके बारे में.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — कवि परिचय और पृष्ठभूमि', text: 'कवि का परिचय और पृष्ठभूमि बताना अर्थात् कवि के नाम, जन्म‑मृत्यु, युग, सामाजिक‑सांस्कृतिक संदर्भ और उनकी प्रमुख जीवन घटनाओं का संक्षिप्त विवरण देना, जिससे उनकी रचना पर पड़ने वाले प्रभाव को समझा जा सके।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — कवि', 'पाठ 1 — पद्यांश-वार', 'पाठ 1 — काव्य-संरचना', 'पाठ 1 — केंद्रीय', 'पाठ 1 — छंद', 'पाठ 1 — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 1/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें.', answer: '1 -', options: ['1 -', '1 - -', '1 -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप का विधान: पदों/छंदों का.', answer: '1 - -', options: ['1 - -', '1 -', '1 -'] },
            { id: 's3', label: '1 -', prompt: 'Which idea is this? — छंद (Meter) काव्य-पंक्ति में **मात्राओं (समय इकाइयों) की निश्चित संख्या, क्रम और गण.', answer: '1 -', options: ['1 -', '1 -', '1 - -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_001', difficulty: 'standard',
          question: 'कवि का परिचय और पृष्ठभूमि बताना अर्थात् कवि के नाम, जन्म‑मृत्यु, युग.',
          hint: 'यदि परिचय लिखने में कठिनाई हो तो कक्षा 9 के हिन्दी पाठ्यक्रम में दिए गए लेखक परिचय (जैसे.',
          misconception: 'छात्र अक्सर कवि के परिचय को कविता के सारांश या विषय‑वस्तु के विवरण के रूप में लिख देते हैं, जैसे कि “कवि ने प्रकृति की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि का परिचय और पृष्ठभूमि बताना अर्थात् कवि के नाम, जन्म‑मृत्यु, युग, सामाजिक‑सांस्कृतिक',
                  options: ['कवि का परिचय और पृष्ठभूमि बताना अर्थात् कवि के नाम, जन्म‑मृत्यु, युग, सामाजिक‑सांस्कृतिक', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप का विधान: पदों/छंदों का', 'केंद्रीय भाव (Central Idea) कविता का वह मूल संदेश या सार है जिसे कवि सम्पूर्ण रचना के'],
                  hint: 'यदि परिचय लिखने में कठिनाई हो तो कक्षा 9 के हिन्दी पाठ्यक्रम में दिए गए लेखक परिचय (जैसे प्रेमचंद.',
                  misconception: 'छात्र अक्सर कवि के परिचय को कविता के सारांश या विषय‑वस्तु के विवरण के रूप में लिख देते हैं, जैसे कि “कवि ने प्रकृति की सुंदरता का वर्णन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['पहले छात्र से पूछिए कि “कवि के बारे में आप क्या जानना चाहेंगे यदि आप उनसे मिल रहे हों?” फिर उनके उत्तर (जन्म स्थान.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_002', difficulty: 'standard',
          question: 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को.',
          hint: 'यदि stanza‑wise भावार्थ समझने में कठिनाई हो तो पहले c10_hin_ks_cbse_01_001 (कवि परिचय और.',
          misconception: 'छात्र अक्सर मानते हैं कि stanza‑wise भावार्थ का अर्थ सिर्फ पंक्तियों के शब्द‑शब्द हिन्दी अनुवाद करना है, इसलिए वे “पानी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें',
                  options: ['पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', 'कवि का परिचय और पृष्ठभूमि बताना अर्थात् कवि के नाम, जन्म‑मृत्यु, युग, सामाजिक‑सांस्कृतिक', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप का विधान: पदों/छंदों का', 'केंद्रीय भाव (Central Idea) कविता का वह मूल संदेश या सार है जिसे कवि सम्पूर्ण रचना के'],
                  hint: 'यदि stanza‑wise भावार्थ समझने में कठिनाई हो तो पहले c10_hin_ks_cbse_01_001 (कवि परिचय और पृष्ठभूमि).',
                  misconception: 'छात्र अक्सर मानते हैं कि stanza‑wise भावार्थ का अर्थ सिर्फ पंक्तियों के शब्द‑शब्द हिन्दी अनुवाद करना है, इसलिए वे “पानी की धार बह रही है”.' }
          ],
            remediations: { 'stanza-wise': { steps: ['यदि छात्र भावार्थ को केवल शब्द‑शब्द अनुकूलन कर रहा है, तो उसे निम्नलिखित चरणों से अभ्यास करवाएँ: 1.', 'स्टेन्ज़ को आवाज़ में पढ़कर कठिन या रोचक शब्दों को underline करें (उदाहरण: “सोने जैसी”, “चुपचाप सोता”)। 2.', 'प्रत्येक underlined शब्द या समूह के लिए उसके पर्यायवाची या सरल अर्थ लिखें (सोने जैसी → bardzo ценный/सुंदर)। 3.', 'फिर पूरे वाक्य को पढ़कर पूछें: “इस तुलना या चित्र से कवि कौन‑सा भाव या विचार देना चाह रहा है?” 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप का विधान: पदों/छंदों.',
          hint: 'यदि अटके तो "पद्यांश-वार भावार्थ" (c10_hin_ks_cbse_01_002) के पद-विभाजन और अर्थ को पुनः.',
          misconception: 'छात्र समझते हैं कि **पद-विभाजन (स्टैंजा ब्रेक) केवल दृश्य सुविधा के लिए होता है** — जैसे पैराग्राफ। असल में, प्रत्येक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप का विधान: पदों/छंदों का',
                  options: ['काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप का विधान: पदों/छंदों का', 'कवि का परिचय और पृष्ठभूमि बताना अर्थात् कवि के नाम, जन्म‑मृत्यु, युग, सामाजिक‑सांस्कृतिक', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', 'केंद्रीय भाव (Central Idea) कविता का वह मूल संदेश या सार है जिसे कवि सम्पूर्ण रचना के'],
                  hint: 'यदि अटके तो "पद्यांश-वार भावार्थ" (c10_hin_ks_cbse_01_002) के पद-विभाजन और अर्थ को पुनः देखें — वही.',
                  misconception: 'छात्र समझते हैं कि **पद-विभाजन (स्टैंजा ब्रेक) केवल दृश्य सुविधा के लिए होता है** — जैसे पैराग्राफ। असल में, प्रत्येक पद एक **विचार-इकाई**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**क्लैप-एंड-काउंट**: छात्र से कविता की पहली पंक्ति ताली बजाते हुए पढ़वाएँ — प्रत्येक मात्रा पर एक ताली। फिर दूसरी.', '**कलर-कोड तुक**: अंतिम शब्दों को हाइलाइटर से रंगें — समान तुक = समान रंग। पैटर्न (aabb, abab) तुरंत दिखेगा। 3.', '**पद-सार लिखो**: प्रत्येक पद का एक-वाक्य सार लिखवाएँ। यदि दो पदों का सार समान निकले, तो पद-विभाजन समझ नहीं आया — पुनः.', '**तुलना शीट**: दो कविताएँ (एक छंदबद्ध, एक मुक्त छंद) साथ रखें — "किसमें क्या बंधन है, किसमें मुक्ति?" लिखवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Idea) कविता का वह मूल संदेश या सार है जिसे कवि सम्पूर्ण.',
          hint: 'यदि अटके तो पद्यांश-वार भावार्थ (c10_hin_ks_cbse_01_002) और काव्य-संरचना.',
          misconception: '**ठीक-ठीक भ्रम:** छात्र समझते हैं कि केंद्रीय भाव = कविता का सारांश (summary) और रस = कवि की अपनी मनोदशा (poet\'s mood)।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Idea) कविता का वह मूल संदेश या सार है जिसे कवि सम्पूर्ण रचना के',
                  options: ['केंद्रीय भाव (Central Idea) कविता का वह मूल संदेश या सार है जिसे कवि सम्पूर्ण रचना के', 'कवि का परिचय और पृष्ठभूमि बताना अर्थात् कवि के नाम, जन्म‑मृत्यु, युग, सामाजिक‑सांस्कृतिक', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप का विधान: पदों/छंदों का'],
                  hint: 'यदि अटके तो पद्यांश-वार भावार्थ (c10_hin_ks_cbse_01_002) और काव्य-संरचना (c10_hin_ks_cbse_01_003).',
                  misconception: '**ठीक-ठीक भ्रम:** छात्र समझते हैं कि केंद्रीय भाव = कविता का सारांश (summary) और रस = कवि की अपनी मनोदशा (poet\'s mood)। **वास्तविकता:**.' }
          ],
            remediations: { 'summary-poet-s-mood': { steps: ['**अंतर स्पष्ट करो:** बोर्ड पर दो कॉलम बनाओ — बाएँ \'सारांश/कवि-भावना\', दाएँ \'केंद्रीय भाव/रस\'। 5 उदाहरण देकर दिखाओ कि.', '**रस-निष्पत्ति का चार्ट बनाओ:** एक टेबल में चारों अंग (आलम्बन, उद्दीपन, अनुभाव, संचारी) लिखो और पाठ 1 की कविता से.', '**अभ्यास:** छात्र से कहो — "किसी भी विज्ञापन/गीत को लेकर उसका केंद्रीय भाव (एक वाक्य) और प्रधान रस (चार अंगों सहित).', '**फीडबैक:** अगले दिन उसकी जाँच करो और गलती वही हो तो फिर से चारों अंगों की परिभाषा दोहराओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_005', difficulty: 'standard',
          question: 'छंद (Meter) काव्य-पंक्ति में **मात्राओं (समय इकाइयों) की निश्चित संख्या, क्रम.',
          hint: 'यदि मात्रा गिनने में अटके — **\'मात्रा-निर्धारण नियम\' (लघु/गुरु) का चार्ट** बनाकर दीवार पर.',
          misconception: '**विशिष्ट भ्रांति:** *"छंद पहचानने के लिए केवल अंतिम शब्द की तुक (rhyme) देख लेते हैं — जैसे \'आयो/खिझायो\' दोनों में \'ओ\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद (Meter) काव्य-पंक्ति में **मात्राओं (समय इकाइयों) की निश्चित संख्या, क्रम और गण',
                  options: ['छंद (Meter) काव्य-पंक्ति में **मात्राओं (समय इकाइयों) की निश्चित संख्या, क्रम और गण', 'कवि का परिचय और पृष्ठभूमि बताना अर्थात् कवि के नाम, जन्म‑मृत्यु, युग, सामाजिक‑सांस्कृतिक', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप का विधान: पदों/छंदों का'],
                  hint: 'यदि मात्रा गिनने में अटके — **\'मात्रा-निर्धारण नियम\' (लघु/गुरु) का चार्ट** बनाकर दीवार पर लगाएँ और.',
                  misconception: '**विशिष्ट भ्रांति:** *"छंद पहचानने के लिए केवल अंतिम शब्द की तुक (rhyme) देख लेते हैं — जैसे \'आयो/खिझायो\' दोनों में \'ओ\' है तो छंद एक ही.' }
          ],
            remediations: { 'rhyme': { steps: ['**वर्ण-मात्रा अभ्यास:** 20 शब्दों की सूची दें (सरल+संयुक्त) — छात्र से **वर्ण-विच्छेद कराकर प्रत्येक की मात्रा.', '**गण-चक्र सिखाएँ:** 8 गणों (य, र, त, न, भ, न, य, य) को **उँगलियों पर गिनना** सिखाएँ — य=123, र=213, त=321, न=111.', '**पंक्ति-विश्लेषण शीट:** पाठ-1 की 5 पंक्तियाँ दें — कॉलम बनवाएँ: शब्द | वर्ण-विच्छेद | मात्रा | कुल | गण | छंद-नाम।.', '**तत्काल फीडबैक:** गलती मिलते ही **वर्ण-विच्छेद पर लौटें**, छंद-तालिका न दिखाएँ — इससे **मूल नियम (लघु/गुरु)** पक्का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_01_006', difficulty: 'standard',
          question: 'अलंकार काव्य की वह रचनात्मक युक्ति है जिसमें शब्दों या अर्थों के विशेष विन्यास.',
          hint: 'यदि अटके तो **नोड 002 (पद्यांश-वार भावार्थ)** पर लौटें — विशेषकर उन पंक्तियों को दोहराएं.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'उपमा\' और \'रूपक\' को केवल सूचक शब्द (\'जैसे\', \'सा\', \'इव\') के आधार पर अलग करते हैं**, पर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार काव्य की वह रचनात्मक युक्ति है जिसमें शब्दों या अर्थों के विशेष विन्यास से कथन में',
                  options: ['अलंकार काव्य की वह रचनात्मक युक्ति है जिसमें शब्दों या अर्थों के विशेष विन्यास से कथन में', 'कवि का परिचय और पृष्ठभूमि बताना अर्थात् कवि के नाम, जन्म‑मृत्यु, युग, सामाजिक‑सांस्कृतिक', 'पद्यांश‑वार भावार्थ का अर्थ है कविता के प्रत्येक स्टेन्ज़ की पंक्तियों को पढ़कर, उनमें', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप का विधान: पदों/छंदों का'],
                  hint: 'यदि अटके तो **नोड 002 (पद्यांश-वार भावार्थ)** पर लौटें — विशेषकर उन पंक्तियों को दोहराएं जहां कवि.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'उपमा\' और \'रूपक\' को केवल सूचक शब्द (\'जैसे\', \'सा\', \'इव\') के आधार पर अलग करते हैं**, पर **\'उत्प्रेक्षा\' और \'उपमा\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**तुलना चार्ट बनाएं:** कक्षा में बोर्ड पर तीन स्तंभ बनाएं — उपमा, रूपक, उत्प्रेक्षा; पंक्तियाँ: सूचक शब्द.', '**पाठ 1 के पदों से 5-5 उदाहरण निकालें** और छात्र से प्रत्येक को चार्ट में रखने को कहें — गलती होने पर तुरंत \'क्यों?\'.', '**मंत्र दें:** "सूचक शब्द + वास्तविक समानता = उपमा | सूचक शब्द नहीं + आरोप = रूपक | सूचक शब्द + कल्पनातीत संभावना.', '**बोर्ड-शैली अभ्यास:** 3-अंक का प्रश्न दें: "पंक्ति में आए अलंकार की पहचान कर उसके प्रभाव को दो वाक्यों में लिखिए".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
