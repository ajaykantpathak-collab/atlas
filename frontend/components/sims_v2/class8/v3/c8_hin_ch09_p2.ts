import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch09_p2: SimDef = {
    id: 'v3_c8_hin_ch09_p2',
    title: 'पाठ 9 · Part 2/3',
    subtitle: 'इस नोड में पाठ 9 के गौण विषयों की पहचान, उनका मुख्य विषय से संबंध, और पात्र/कथानक पर उनका.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 9 · Part 2/3',
    chapters: ['c8_hin_ch09'],
    nodeIds: ['c8_hin_cbse_09_007', 'c8_hin_cbse_09_008', 'c8_hin_cbse_09_009', 'c8_hin_cbse_09_010', 'c8_hin_cbse_09_011', 'c8_hin_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'क्या तुमने कभी ध्यान दिया है कि किसी मेले में मुख्य झूला (मुख्य विषय) के अलावा चाट-पकौड़ी, गुब्बारे, जादूगर.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक कथावस्तु या भाव-धारा है जो मुख्य विषय के समानांतर चलती है, पात्रों/परिस्थितियों को गहराई देती है, और मुख्य संदेश को पुष्ट करती है, किंतु कथानक का केंद्रीय आधार नहीं होती।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — गौण', 'पाठ 9 — साहित्यिक', 'पाठ 9 — पदावली', 'पाठ 9 — व्याकरण', 'पाठ 9 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 2/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग (Language Use in Text) का अर्थ है किसी रचना में प्रयुक्त शब्दावली.', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है और उसमें.', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह सहायक कथावस्तु या भाव-धारा है जो मुख्य विषय के समानांतर.',
          hint: 'यदि अटका हो तो: नोड 006 (मुख्य विषय) और नोड 004-005 (पात्र-चित्रण) दोबारा पढ़ें — गौण.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "कोई भी छोटी कहानी/प्रसंग/वर्णन जो मुख्य कथा से अलग हो, गौण विषय है।" **क्यों होता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक कथावस्तु या भाव-धारा है जो मुख्य विषय के समानांतर चलती है,',
                  options: ['गौण विषय (Sub-theme) वह सहायक कथावस्तु या भाव-धारा है जो मुख्य विषय के समानांतर चलती है,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक'],
                  hint: 'यदि अटका हो तो: नोड 006 (मुख्य विषय) और नोड 004-005 (पात्र-चित्रण) दोबारा पढ़ें — गौण विषय इन्हीं.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "कोई भी छोटी कहानी/प्रसंग/वर्णन जो मुख्य कथा से अलग हो, गौण विषय है।" **क्यों होता है:** वे \'गौण\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः कसौटी दोहराओ:** छात्र के सामने तीन कसौटियाँ (आवृत्ति, प्रभाव, संबंध) लिखवाओ। 2.', '**संयुक्त अभ्यास:** पाठ से 5 प्रसंग दो — 3 गौण विषय, 2 केवल प्रसंग। छात्र को प्रत्येक पर तीनों कसौटियाँ लागू करवाओ.', '**मौखिक तर्क:** छात्र से पूछो — "यह प्रसंग गौण विषय क्यों *नहीं* है?" — उसे \'नहीं\' का कारण बोलने को कहो। 4.', '**लिखित सुधार:** छात्र अपनी पिछली गलत पहचान को सुधारकर सही प्रमाण सहित लिखे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_008', difficulty: 'standard',
          question: 'बिंब वह वर्णन है जो पाठ पढ़ने वाले के मन में स्पष्ट दृश्य या संवेदना बनाता है.',
          hint: 'यदि फँसें तो कक्षा 6 और 7 के साहित्यिक युक्तियों के प्राथमिक उदाहरणों को दोबारा देखें.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई वाक्य "जैसे" या "तो जैसे" शब्द रखता है तो वह रूपक है, जबकि वास्तव में ये शब्द simile.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब वह वर्णन है जो पाठ पढ़ने वाले के मन में स्पष्ट दृश्य या संवेदना बनाता है, जबकि रूपक',
                  options: ['बिंब वह वर्णन है जो पाठ पढ़ने वाले के मन में स्पष्ट दृश्य या संवेदना बनाता है, जबकि रूपक', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक'],
                  hint: 'यदि फँसें तो कक्षा 6 और 7 के साहित्यिक युक्तियों के प्राथमिक उदाहरणों को दोबारा देखें, विशेष रूप से.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई वाक्य "जैसे" या "तो जैसे" शब्द रखता है तो वह रूपक है, जबकि वास्तव में ये शब्द simile दर्शाते हैं और रूपक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो कॉलम वाली तालिका बनाकर समझाइए: पहले कॉलम में वाक्य लिखिए (जैसे, "वह शेर जैसा युद्ध करता है"), दूसरे कॉलम.', 'यदि हाँ, तो यह simile है, रूपक नहीं। फिर उसी वाक्य को रूपक में बदलने के लिए "जैसे" हटाकर सीधा जोड़ दिजिए: "वह शेर युद्ध.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_009', difficulty: 'standard',
          question: 'विरोधाभास वह साहित्यिक युक्ति है जिसमें दो विपरीत विचार एक साथ रखे जाते हैं.',
          hint: 'यदि छात्र फँसे हुए हैं, तो रूपक और बिंब के पिछले नोड (c8_hin_cbse_09_008) की समीक्षा.',
          misconception: 'छात्र अक्सर विरोधाभास को केवल भाषा की गलती या मूर्खतापूर्ण वाक्य मान लेते हैं, जैसे सोचते हैं कि "वह बुद्धिमान मूर्ख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास वह साहित्यिक युक्ति है जिसमें दो विपरीत विचार एक साथ रखे जाते हैं ताकि गहरा',
                  options: ['विरोधाभास वह साहित्यिक युक्ति है जिसमें दो विपरीत विचार एक साथ रखे जाते हैं ताकि गहरा', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक'],
                  hint: 'यदि छात्र फँसे हुए हैं, तो रूपक और बिंब के पिछले नोड (c8_hin_cbse_09_008) की समीक्षा करवाई जानी.',
                  misconception: 'छात्र अक्सर विरोधाभास को केवल भाषा की गलती या मूर्खतापूर्ण वाक्य मान लेते हैं, जैसे सोचते हैं कि "वह बुद्धिमान मूर्ख था" सिर्फ़ एक बेतुका.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि क्या वे कभी ऐसा महसूस कर चुके हैं जब वे किसी परीक्षा में बहुत पढ़ाई करके आए थे लेकिन फिर भी अनुचित.', 'फिर स्पष्ट कीजिए कि विरोधाभासactly इसी तरह की भावना को अभिव्यक्त करने का एक तरीका है: दो सच्चाइयाँ (मेहनत और असफलता) जो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द वे विशिष्ट शब्द होते हैं जो पाठ के केंद्रीय विषय, प्रमुख.',
          hint: 'अगर अटके तो c8_hin_cbse_09_006 (मुख्य विषय और संदेश) दोबारा पढ़ें — विषय स्पष्ट होते ही.',
          misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' का अर्थ है \'पाठ में आए सबसे कठिन या लंबे शब्द\' — इसलिए वे \'प्रतिष्ठापन\', \'अनुकूलन\' जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द वे विशिष्ट शब्द होते हैं जो पाठ के केंद्रीय विषय, प्रमुख पात्रों,',
                  options: ['पदावली: मुख्य शब्द वे विशिष्ट शब्द होते हैं जो पाठ के केंद्रीय विषय, प्रमुख पात्रों,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक'],
                  hint: 'अगर अटके तो c8_hin_cbse_09_006 (मुख्य विषय और संदेश) दोबारा पढ़ें — विषय स्पष्ट होते ही मुख्य शब्द.',
                  misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' का अर्थ है \'पाठ में आए सबसे कठिन या लंबे शब्द\' — इसलिए वे \'प्रतिष्ठापन\', \'अनुकूलन\' जैसे शब्द चुन लेते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें कि पाठ 9 को दोबारा पढ़ें और हर उस शब्द पर टिक लगाएँ जो उन्हें \'महत्वपूर्ण\' लगता है — बिना परिभाषा.', 'अगर हट जाए तो क्या फर्क पड़ेगा?" चरण 3: जिन शब्दों के लिए वे स्पष्ट कारण न बता पाएँ, उन्हें सूची से हटाएँ। चरण 4: शेष.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग (Language Use in Text) का अर्थ है किसी रचना में प्रयुक्त.',
          hint: 'यदि फँस जाएँ तो कक्षा 7 के \'व्याकरण: पाठ में भाषा-प्रयोग\' (c7_hin_cbse_09_011) के.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि पाठ में \'अशुद्ध/अमानक\' प्रयोग (जैसे \'का\' के लिए \'क्या\', \'नाहीं\' के लिए \'नहीं\').',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग (Language Use in Text) का अर्थ है किसी रचना में प्रयुक्त शब्दावली,',
                  options: ['पाठ में भाषा-प्रयोग (Language Use in Text) का अर्थ है किसी रचना में प्रयुक्त शब्दावली,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक'],
                  hint: 'यदि फँस जाएँ तो कक्षा 7 के \'व्याकरण: पाठ में भाषा-प्रयोग\' (c7_hin_cbse_09_011) के कार्यपत्रकों.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि पाठ में \'अशुद्ध/अमानक\' प्रयोग (जैसे \'का\' के लिए \'क्या\', \'नाहीं\' के लिए \'नहीं\') लेखक की **त्रुटि** या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहले स्वीकारो:** "तुम्हारा ध्यान शुद्धता पर गया, यह स्वाभाविक है — स्कूल में हमें \'सही/गलत\' सिखाया जाता है।" 2.', '**फिर विपरीत उदाहरण दो:** एक ही बात को दो तरह से लिखो — (क) मानक हिंदी में, (ख) पात्र की बोली में। पूछो: "कौन-सा अधिक.', '**संकल्पना स्पष्ट करो:** "लेखक गलती नहीं कर रहा; वह पात्र की **आवाज** (voice) रच रहा है। जैसे अभिनेता कपड़े पहनता है.', '**अभ्यास कराओ:** पाठ 9 से 3 संवाद चुनो, उनके \'मानक रूपांतरण\' लिखो, फिर दोनों के प्रभाव की तुलना एक तालिका में करो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_09_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है और.',
          hint: 'यदि अटके तो c8_hin_cbse_09_002 (कथानक) और c8_hin_cbse_09_010 (पदावली) दोबारा पढ़ें — तथ्य.',
          misconception: 'छात्र अक्सर मान लेते हैं कि \'कौन, क्या, कब, कहाँ\' वाले प्रश्न ही वस्तुनिष्ठ होते हैं और \'क्यों, कैसे\' वाले आशय-सूचक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है और उसमें',
                  options: ['वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है और उसमें', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन, उनके लेखन-काल की', 'कथानक (Plot) कहानी में घटनाओं का तार्किक और कारण-परिणाम संबंध वाला क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का **समय, स्थान और सामाजिक परिस्थितियों** का भौतिक'],
                  hint: 'यदि अटके तो c8_hin_cbse_09_002 (कथानक) और c8_hin_cbse_09_010 (पदावली) दोबारा पढ़ें — तथ्य वहीं.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि \'कौन, क्या, कब, कहाँ\' वाले प्रश्न ही वस्तुनिष्ठ होते हैं और \'क्यों, कैसे\' वाले आशय-सूचक — जबकि वास्तविकता यह है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: छात्र को ५-५ प्रश्नों की दो सूचियाँ दो — एक जहाँ उत्तर पाठ में शब्दशः मिले, दूसरी जहाँ तर्क लगाना पड़े। चरण २.', 'इसलिए मुझे लगता है..." का वाक्य-ढांचा (sentence frame) देकर अभ्यास कराओ। चरण ४: मिश्रित प्रश्नों का सेट देकर वर्गीकरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
