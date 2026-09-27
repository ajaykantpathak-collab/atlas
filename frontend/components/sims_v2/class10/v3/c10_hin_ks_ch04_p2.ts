import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch04_p2: SimDef = {
    id: 'v3_c10_hin_ks_ch04_p2',
    title: 'पाठ 4 · Part 2/3',
    subtitle: 'इस नोड में प्रतीक एवं बिंब की परिभाषा, पहचान, विश्लेषण एवं केंद्रीय भाव से संबंधित.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 4 · Part 2/3',
    chapters: ['c10_hin_ks_ch04'],
    nodeIds: ['c10_hin_ks_cbse_04_007', 'c10_hin_ks_cbse_04_008', 'c10_hin_ks_cbse_04_009', 'c10_hin_ks_cbse_04_010', 'c10_hin_ks_cbse_04_011', 'c10_hin_ks_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप सड़क पर चल रहे हैं और एक पीले फूल देखते हैं; पहले आप देखते हैं कि वह फूल पीला है (बिंब), फिर.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**प्रतीक** (symbol) वह चिह्न, वस्तु या क्रिया है जो अपने प्रत्यक्ष अर्थ के अतिरिक्त कोई गहरा, भावनात्मक या विचार‑परक अर्थ व्यक्त करती है; **बिंब** (image) वह विवरण है जो पाठक की इंद्रियों (मुख्यतः.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — साहित्यिक', 'पाठ 4 — मुख्य', 'पाठ 4 — गौण', 'पाठ 4 — पदावली', 'पाठ 4 — व्याकरण', 'पाठ 4 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 2/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — पद्य में भाषा-प्रयोग का अर्थ है कविता में शब्दों, वाक्य-रचना, ध्वनि-योजना, छंद, अलंकार और.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ बोध‑प्रश्न ऐसे प्रश्न होते हैं जिनके उत्तर पाठ में स्पष्ट रूप से दिए गए तथ्यों.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_007', difficulty: 'standard',
          question: '**प्रतीक** (symbol) वह चिह्न, वस्तु या क्रिया है जो अपने प्रत्यक्ष अर्थ के.',
          hint: 'यदि अवधारणा स्पष्ट न हो तो नोड 006 (साहित्यिक युक्तियाँ: अलंकार) की समीक्षा करें, क्योंकि.',
          misconception: 'विद्यार्थी अक्सर मानते हैं कि कोई भी vivid, sensory‑आधारित विवरण अपने आप में प्रतीक हो जाता है; वे बिंब को प्रतीक की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**प्रतीक** (symbol) वह चिह्न, वस्तु या क्रिया है जो अपने प्रत्यक्ष अर्थ के अतिरिक्त कोई',
                  options: ['**प्रतीक** (symbol) वह चिह्न, वस्तु या क्रिया है जो अपने प्रत्यक्ष अर्थ के अतिरिक्त कोई', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक'],
                  hint: 'यदि अवधारणा स्पष्ट न हो तो नोड 006 (साहित्यिक युक्तियाँ: अलंकार) की समीक्षा करें, क्योंकि.',
                  misconception: 'विद्यार्थी अक्सर मानते हैं कि कोई भी vivid, sensory‑आधारित विवरण अपने आप में प्रतीक हो जाता है; वे बिंब को प्रतीक की उप‑श्रेणी मान लेते.' }
          ],
            remediations: { 'vivid': { steps: ['छात्र से पंक्ति के शब्दों का प्रत्यक्ष अर्थ पूछें (वह क्या देख रहा/सुन रहा है)। 2.', 'फिर पूछें: “इस प्रत्यक्ष अर्थ के अलावा क्या यहाँ कोई भाव, विचार या संदेश छिपा है जो लेखक कहना चाहता है?” 3.', 'यदि उत्तर हाँ है → यह प्रतीक है; यदि उत्तर नहीं है → यह केवल बिंब है। 4.', 'इस दो‑चरणी जाँच को तीन‑चार अलग‑पंक्तियों पर अभ्यास करवाएँ ताकि अंतर स्पष्ट हो जाए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_008', difficulty: 'standard',
          question: 'मुख्य भाव वह मूल भाव या rasa है जो कविता के माध्यम से कवि निरंतर व्यक्त करना.',
          hint: 'यदि छात्र मुख्य भाव पहचानने में कठिनाई महसूस कर रहा है, तो वह “पद्यांश‑वार भावार्थ” (node.',
          misconception: 'छात्र अक्सर मुख्य भाव को कविता के प्रथम या अंतिम stanza में व्यक्त भाव के समान मान लेते हैं, सोचते हैं कि यदि पहली.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव वह मूल भाव या rasa है जो कविता के माध्यम से कवि निरंतर व्यक्त करना चाहता है, और',
                  options: ['मुख्य भाव वह मूल भाव या rasa है जो कविता के माध्यम से कवि निरंतर व्यक्त करना चाहता है, और', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक'],
                  hint: 'यदि छात्र मुख्य भाव पहचानने में कठिनाई महसूस कर रहा है, तो वह “पद्यांश‑वार भावार्थ” (node.',
                  misconception: 'छात्र अक्सर मुख्य भाव को कविता के प्रथम या अंतिम stanza में व्यक्त भाव के समान मान लेते हैं, सोचते हैं कि यदि पहली पंक्ति में शोक है तो.' }
          ],
            remediations: { 'stanza': { steps: ['छात्र को बताइए कि मुख्य भाव को खोजने के लिए उसे प्रत्येक stanza का भाव‑सूचक शब्द लिखकर एक सूची बनानी होगी, फिर देखना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_009', difficulty: 'standard',
          question: '**गौण भाव** कविता में वह द्वितीयक भाव है जो मुख्य भाव (रस) का समर्थन, विस्तार.',
          hint: 'यदि अटके, तो \'रस और संचारी भाव\' (कक्षा 9/10 पाठ्यक्रम) दोहराएँ — विशेषकर करुण रस में.',
          misconception: 'छात्र अक्सर **गौण भाव** और **विषयांतर** को एक ही समझ लेते हैं क्योंकि दोनों मुख्य विषय से \'अलग\' लगते हैं। वे सोचते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**गौण भाव** कविता में वह द्वितीयक भाव है जो मुख्य भाव (रस) का समर्थन, विस्तार या पूरक',
                  options: ['**गौण भाव** कविता में वह द्वितीयक भाव है जो मुख्य भाव (रस) का समर्थन, विस्तार या पूरक', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक'],
                  hint: 'यदि अटके, तो \'रस और संचारी भाव\' (कक्षा 9/10 पाठ्यक्रम) दोहराएँ — विशेषकर करुण रस में करुणा, विषाद.',
                  misconception: 'छात्र अक्सर **गौण भाव** और **विषयांतर** को एक ही समझ लेते हैं क्योंकि दोनों मुख्य विषय से \'अलग\' लगते हैं। वे सोचते हैं: "जो मुख्य भाव नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पहले कविता का **एक वाक्य में मुख्य भाव** लिखो।" यदि न लिख पाए, तो मुख्य भाव स्पष्ट करो (नोड 004, 008.', 'फिर पूछें: "कौन-सी पंक्तियाँ इस मुख्य भाव को **सीधे बढ़ा** रही हैं?" उन्हें गौण भाव के रूप में चिह्नित करो। 3.', 'फिर पूछें: "कहाँ कवि **बिल्कुल अन्य विषय** पर चला गया?" उसे विषयांतर मानो। 4.', 'अभ्यास हेतु छोटी कविताएँ दो जहाँ गौण भाव और विषयांतर स्पष्ट अलग हों (जैसे निराला की \'जूही की कली\' में माँ की स्मृति.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_010', difficulty: 'standard',
          question: 'पदावली से तात्पर्य किसी रचना में प्रयुक्त विशिष्ट शब्दों के समूह से है जिनमें.',
          hint: 'यदि अटके तो "पद्यांश-वार भावार्थ" (c10_hin_ks_cbse_04_002) और "केंद्रीय भाव".',
          misconception: 'छात्र समझते हैं कि कठिन शब्द का अर्थ शब्दकोश से ढूँढ़कर लिख देना पर्याप्त है। **वास्तविक भूल:** वे यह नहीं देखते कि कवि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली से तात्पर्य किसी रचना में प्रयुक्त विशिष्ट शब्दों के समूह से है जिनमें कठिन शब्द,',
                  options: ['पदावली से तात्पर्य किसी रचना में प्रयुक्त विशिष्ट शब्दों के समूह से है जिनमें कठिन शब्द,', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक'],
                  hint: 'यदि अटके तो "पद्यांश-वार भावार्थ" (c10_hin_ks_cbse_04_002) और "केंद्रीय भाव".',
                  misconception: 'छात्र समझते हैं कि कठिन शब्द का अर्थ शब्दकोश से ढूँढ़कर लिख देना पर्याप्त है। **वास्तविक भूल:** वे यह नहीं देखते कि कवि ने उस शब्द को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ की 5 पंक्तियाँ दें जिनमें कठिन शब्द/मुहावरे हों। 2.', 'उससे कहें: "पहले वाक्य का भाव बताओ, फिर शब्द का कोशीय अर्थ, फिर बताओ कि कवि ने इसी शब्द को क्यों चुना?" 3.', 'साथ में बैठकर उसके उत्तर में \'क्यों\' जोड़ने का अभ्यास कराएँ। 4.', 'एक सप्ताह तक रोज एक पंक्ति का ऐसा विश्लेषण कराएँ — फिर बोर्ड शैली का प्रश्न देकर जाँचें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है कविता में शब्दों, वाक्य-रचना, ध्वनि-योजना, छंद.',
          hint: 'यदि अटके तो \'पद परिचय\' और \'अलंकार\' के मूल नियम दोहराएँ, विशेषकर क्रिया विशेषण और अनुप्रास.',
          misconception: 'छात्र समझते हैं कि पद्य में व्याकरण के नियम शिथिल होते हैं या \'कुछ भी चलता है\', जबकि वास्तव में कवि नियमों को जान-बूझकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है कविता में शब्दों, वाक्य-रचना, ध्वनि-योजना, छंद, अलंकार और',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है कविता में शब्दों, वाक्य-रचना, ध्वनि-योजना, छंद, अलंकार और', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक'],
                  hint: 'यदि अटके तो \'पद परिचय\' और \'अलंकार\' के मूल नियम दोहराएँ, विशेषकर क्रिया विशेषण और अनुप्रास के उदाहरण।',
                  misconception: 'छात्र समझते हैं कि पद्य में व्याकरण के नियम शिथिल होते हैं या \'कुछ भी चलता है\', जबकि वास्तव में कवि नियमों को जान-बूझकर तोड़ता-मरोड़ता है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक सरल गद्य वाक्य दें (जैसे "बच्चे खेलते हैं") और कहें: "इसे तीन तरह से पंक्तिबद्ध करो — लय, बल और बिंब बदलते.', 'प्रत्येक रूप में क्रिया, विशेषण, कारक की पहचान करवाएँ। 3.', 'पूछें: "कवि ने क्रम क्यों बदला?" — उत्तर में \'प्रभाव\' शब्द आना चाहिए। 4.', 'फिर अपरिचित पद्यांश पर यही प्रक्रिया दुहराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ बोध‑प्रश्न ऐसे प्रश्न होते हैं जिनके उत्तर पाठ में स्पष्ट रूप से दिए.',
          hint: 'यदि कठिनाई हो तो पद्यांश‑वार भावार्थ (c10_hin_ks_cbse_04_002) की समीक्षा करें।',
          misconception: 'छात्र अक्सर सोचते हैं कि आशय‑सूचक प्रश्नों का उत्तर भी पाठ में शब्द‑शब्द मौजूद होना चाहिए, इसलिए वे हर प्रश्न के लिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ बोध‑प्रश्न ऐसे प्रश्न होते हैं जिनके उत्तर पाठ में स्पष्ट रूप से दिए गए तथ्यों',
                  options: ['वस्तुनिष्ठ बोध‑प्रश्न ऐसे प्रश्न होते हैं जिनके उत्तर पाठ में स्पष्ट रूप से दिए गए तथ्यों', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक'],
                  hint: 'यदि कठिनाई हो तो पद्यांश‑वार भावार्थ (c10_hin_ks_cbse_04_002) की समीक्षा करें।',
                  misconception: 'छात्र अक्सर सोचते हैं कि आशय‑सूचक प्रश्नों का उत्तर भी पाठ में शब्द‑शब्द मौजूद होना चाहिए, इसलिए वे हर प्रश्न के लिए पाठ में ठीक‑ठाक वाक्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि किस प्रकार दो‑तीन संकेत मिलकर एक भाव बनाते हैं: उदाहरण के लिए पंक्तियों में “सुनसान गली”, “धीमे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
