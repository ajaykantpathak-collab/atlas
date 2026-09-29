import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch08_p1: SimDef = {
    id: 'v3_c10_hin_ks_ch08_p1',
    title: 'पाठ 8 · Part 1/3',
    subtitle: 'इस नोड में कवि के जीवन और साहित्यिक संदर्भ का परिचय दिया जाता है; इसमें काव्य-शास्त्रीय.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 8 · Part 1/3',
    chapters: ['c10_hin_ks_ch08'],
    nodeIds: ['c10_hin_ks_cbse_08_001', 'c10_hin_ks_cbse_08_002', 'c10_hin_ks_cbse_08_003', 'c10_hin_ks_cbse_08_004', 'c10_hin_ks_cbse_08_005', 'c10_hin_ks_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'क्षितिज भाग-2 खोलिए और पाठ 08 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — कवि', 'पाठ 8 — पद्यांश-वार', 'पाठ 8 — काव्य-संरचना', 'पाठ 8 — केंद्रीय', 'पाठ 8 — छंद', 'पाठ 8 — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 1/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 8\' का कथानक — \'क्षितिज भाग-2 — पाठ 8\' — क्षितिज भाग-2 का पाठ। पाठ का.', answer: '8 -', options: ['8 -', '8 - -', '8 -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.', answer: '8 - -', options: ['8 - -', '8 -', '8 -'] },
            { id: 's3', label: '8 -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 8\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.', answer: '8 -', options: ['8 -', '8 -', '8 - -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_08_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'यदि समझ न आए तो कक्षा 9 के पाठ्यक्रम में पढ़े गये कवि परिचय (जैसे ‘सूर्यकांत त्रिपाठी.',
          misconception: 'छात्र अक्सर सोचते हैं कि कवि का परिचय केवल उसके नाम, जन्म-तिथि और मृत्यु-तिथि लिख देना ही पर्याप्त है, और वे साहित्यिक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 8\' का कथानक — \'क्षितिज भाग-2 — पाठ 8\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में', '\'क्षितिज भाग-2 — पाठ 8\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि समझ न आए तो कक्षा 9 के पाठ्यक्रम में पढ़े गये कवि परिचय (जैसे ‘सूर्यकांत त्रिपाठी निराला’ का.',
                  misconception: 'छात्र अक्सर सोचते हैं कि कवि का परिचय केवल उसके नाम, जन्म-तिथि और मृत्यु-तिथि लिख देना ही पर्याप्त है, और वे साहित्यिक यuga, प्रमुख रचना या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि कोई एक कवि (जैसे प्रेमचंद) का परिचय कैसे लिखें: पहले नाम और जन्म‑स्थली लिखिए, फिर उनके यuga (उदाहरण.', 'छात्र को एक टेबल भरने के लिए कहिए जिसमें कॉलम हों: कवि का नाम, जन्म‑स्थली, साहित्यिक यuga, प्रमुख रचना, कविता/कहानी का.', 'यदि छात्र फिर भी केवल तिथियाँ लिखता है, तो उससे पूछिए: “इस तिथि से आपको कवि की सोच या उसकी रचना के बारे में क्या पता.', 'अंत में, एक उदाहरण उत्तर दिखाइए जहाँ तिथि के साथ yuga और रचना का उल्लेख हो और बताइए कि बोर्ड परीक्षा के मार्किंग स्कीम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_002', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 8\' का कथानक — \'क्षितिज भाग-2 — पाठ 8\' — क्षितिज भाग-2 का.',
          hint: 'यदि भाव समझने में कठिनाई हो तो कवि परिचय (c10_hin_ks_cbse_08_001) का पुनरावलोकन करके कवि.',
          misconception: 'छात्र अक्सर मानते हैं कि पद्यांश-वार भावार्थ का अर्थ केवल प्रत्येक पंक्ति का हिन्दी में अनुवाद करना है, जबकि वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 8\' का कथानक — \'क्षितिज भाग-2 — पाठ 8\' — क्षितिज भाग-2 का पाठ। पाठ का',
                  options: ['\'क्षितिज भाग-2 — पाठ 8\' का कथानक — \'क्षितिज भाग-2 — पाठ 8\' — क्षितिज भाग-2 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में', '\'क्षितिज भाग-2 — पाठ 8\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि भाव समझने में कठिनाई हो तो कवि परिचय (c10_hin_ks_cbse_08_001) का पुनरावलोकन करके कवि के अनुभवों.',
                  misconception: 'छात्र अक्सर मानते हैं कि पद्यांश-वार भावार्थ का अर्थ केवल प्रत्येक पंक्ति का हिन्दी में अनुवाद करना है, जबकि वास्तव में भावार्थ में शब्द के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र केवल शब्दशः अनुवाद पर अटक जाए तो निम्नलिखित चरणों का पालन करवाएँ: 1) पद्यांश को loudly पढ़ें और शब्दों की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_003', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और.',
          hint: 'यदि अटके तो **पद्यांश-वार भावार्थ (c10_hin_ks_cbse_08_002)** दोहराएँ और हर छंद का.',
          misconception: 'छात्र मानते हैं कि **काव्य-संरचना केवल \'सजावट\' (ornamentation) है** — जैसे तुकबंदी इसलिए है कि कविता \'सुंदर\' लगे, या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में',
                  options: ['\'क्षितिज भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 8\' का कथानक — \'क्षितिज भाग-2 — पाठ 8\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 8\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटके तो **पद्यांश-वार भावार्थ (c10_hin_ks_cbse_08_002)** दोहराएँ और हर छंद का एक-वाक्य सार.',
                  misconception: 'छात्र मानते हैं कि **काव्य-संरचना केवल \'सजावट\' (ornamentation) है** — जैसे तुकबंदी इसलिए है कि कविता \'सुंदर\' लगे, या छंद इसलिए हैं कि कविता.' }
          ],
            remediations: { 'ornamentation': { steps: ['छात्र को एक परिचित कविता (पाठ्यपुस्तक की) दें और कहें: "पेंसिल से हर छंद के अंत में **विराम चिह्न** लगाओ — पूर्ण विराम.', 'फिर पूछें: "जहाँ पूर्ण विराम नहीं है, वहाँ कवि ने पंक्ति क्यों तोड़ी?', 'अब तुकबंदी योजना लिखवाएँ और पूछें: "यह पैटर्न (AABB/ABAB) कविता के **विषय** (जैसे बचपन की सरलता / जीवन की जटिलता) से.', 'अंत में: "एक छंद की लंबाई बदल दो — कविता का प्रभाव कैसे बदलेगा?" — यह **संरचना-प्रभाव संबंध** (structure-effect link).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_004', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 8\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और.',
          hint: 'यदि छात्र केंद्रीय भाव और रस में भ्रमित हो तो उसे nodes 002 (पद्यांश‑वार भावार्थ) और 003.',
          misconception: 'छात्र अक्सर केंद्रीय भाव को कविता के स्पष्ट onderwerp (जैसे “नदी”, “पर्वत”, “प्रेम”) से समान मान लेते हैं, जबकि वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 8\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'क्षितिज भाग-2 — पाठ 8\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 8\' का कथानक — \'क्षितिज भाग-2 — पाठ 8\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि छात्र केंद्रीय भाव और रस में भ्रमित हो तो उसे nodes 002 (पद्यांश‑वार भावार्थ) और 003.',
                  misconception: 'छात्र अक्सर केंद्रीय भाव को कविता के स्पष्ट onderwerp (जैसे “नदी”, “पर्वत”, “प्रेम”) से समान मान लेते हैं, जबकि वास्तव में केंद्रीय भाव वह.' }
          ],
            remediations: { 'onderwerp': { steps: ['छात्र से कहें कि वह पद्यांश कोसस्वर पढ़े और प्रत्येक शब्द या समूह के पीछे किस feeling का बोध हो रहा है, इसे कागज पर.', 'फिर उन सभी feelings को समूह में रखकर देखें कि कौन‑सी भावना सबसे अधिक बार या सबसे intensely reappears हो रही है — ये.', 'अब इस भावना से जुड़े अनुभव (जैसे शांति → मन को विश्राम, वीरता → साहस और उत्साह) का नाम बताएं — ये रस होगा। 4.', 'अंत में छात्र को दो‑तीन अलग‑अलग पद्यांश देकर इस प्रक्रिया को दोहराने के लिए कहें, ताकि वह विषय‑भावना अंतर को मजबूती से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_005', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 8\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि छात्र मात्राएँ सही से नहीं गिना पा रहा है, तो कक्षा 6‑7 की हिन्दी व्याख्या में.',
          misconception: 'छात्र अक्सर यह मान लेते हैं कि यदि कविता की पंक्तियों का अंतिम शब्द समान ध्वनि वाला (साज‑सज्जा) है तो वह छंद है, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 8\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे',
                  options: ['\'क्षितिज भाग-2 — पाठ 8\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 8\' का कथानक — \'क्षितिज भाग-2 — पाठ 8\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि छात्र मात्राएँ सही से नहीं गिना पा रहा है, तो कक्षा 6‑7 की हिन्दी व्याख्या में “मात्रा विखंडन”.',
                  misconception: 'छात्र अक्सर यह मान लेते हैं कि यदि कविता की पंक्तियों का अंतिम शब्द समान ध्वनि वाला (साज‑सज्जा) है तो वह छंद है, जबकि वास्तव में छंद.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक सरल शब्द दें (जैसे “गुरु”) और पूछें कि इसमें कितनी मात्राएँ हैं और कौन‑सी लंबी/छोटी है। 2.', 'उसे प्रत्येक स्वर को लंबी (aa, ee, oo, ai, au) या छोटी (a, i, u) के रूप में रंग भरने को कहें। 3.', 'फिर दो‑शब्द वाला छोटा वाक्य बनाएँ (जैसे “राम गया”) और उसके प्रत्येक शब्द की मात्राएँ गिनकर guru‑laghu चिह्न लगाएँ। 4.', 'अंत में इस क्रम को देख कर बताएँ कि यह कौन‑सा छंद (द्विपदी, त्रिपदी आदि) लगता है। इस क्रम‑बद्ध अभ्यास से छात्र को समझ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_006', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 8\' का मुख्य विषय — \'क्षितिज भाग-2 — पाठ 8\' का केंद्रीय भाव.',
          hint: 'यदि अलंकार पहचान में कठिनाई हो तो c10_hin_ks_cbse_08_005 (छंद और लय-विधान) node की.',
          misconception: 'छात्र अक्सर उपमा और रूपक को एक ही चीज़ समझते हैं क्योंकि दोनों में तुलना होती है; वे भूल जाते हैं कि उपमा में स्पष्ट.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 8\' का मुख्य विषय — \'क्षितिज भाग-2 — पाठ 8\' का केंद्रीय भाव और संदेश',
                  options: ['\'क्षितिज भाग-2 — पाठ 8\' का मुख्य विषय — \'क्षितिज भाग-2 — पाठ 8\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 8\' का कथानक — \'क्षितिज भाग-2 — पाठ 8\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अलंकार पहचान में कठिनाई हो तो c10_hin_ks_cbse_08_005 (छंद और लय-विधान) node की समीक्षा करें.',
                  misconception: 'छात्र अक्सर उपमा और रूपक को एक ही चीज़ समझते हैं क्योंकि दोनों में तुलना होती है; वे भूल जाते हैं कि उपमा में स्पष्ट comparación शब्द.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो रंग के कार्ड दें: एक कार्ड पर "जैसे/तैसे/जैसा" शब्द लिखें (उपमा कार्ड) और दूसरे पर खाली छोड़ें (रूपक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
