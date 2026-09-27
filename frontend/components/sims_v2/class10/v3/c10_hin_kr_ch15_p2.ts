import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_kr_ch15_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_kr_ch15_p2: SimDef = {
    id: 'v3_c10_hin_kr_ch15_p2',
    title: 'साना-साना हाथ जोड़ि · Part 2/3',
    subtitle: 'यह नोड केवल पाठ 3 में निहित गौण विषयों की पहचान, विश्लेषण और मुख्य विषय से संबंधन तक.',
    classLevel: 10, subject: 'hin_kr', topic: 'साना-साना हाथ जोड़ि · Part 2/3',
    chapters: ['c10_hin_kr_ch15'],
    nodeIds: ['c10_hin_kr_cbse_15_007', 'c10_hin_kr_cbse_15_008', 'c10_hin_kr_cbse_15_009', 'c10_hin_kr_cbse_15_010', 'c10_hin_kr_cbse_15_011', 'c10_hin_kr_cbse_15_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'आपने कभी ध्यान दिया है कि किसी मेले में मुख्य झूला (मुख्य विषय) के अलावा छोटे-छोटे स्टॉल (गौण विषय) भी होते.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — गौण विषय', text: 'गौण विषय (Sub-theme) पाठ में उभरने वाला वह द्वितीयक केंद्रीय विचार है जो मुख्य विषय का पूरक होता है, पात्रों के आंतरिक द्वंद्व या सामाजिक यथार्थ की परतें खोलता है, और कथानक के समानांतर चलकर मुख्य.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_kr_cbse_15_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — गौण', 'पाठ 3 — साहित्यिक', 'पाठ 3 — पदावली', 'पाठ 3 — व्याकरण', 'पाठ 3 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_kr_cbse_15_008', title: 'Identify each idea',
          dissect: { specimen: 'साना-साना हाथ जोड़ि · Part 2/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा विशिष्ट व्याकरणिक संरचनाओं (काल, वाच्य.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — बोध-प्रश्न वे प्रश्न हैं जो किसी पाठ (गद्य/पद्य) को पढ़ने के बाद उसकी समझ जांचने के लिए.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_15_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through साना-साना हाथ जोड़ि like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? साना-साना हाथ जोड़ि · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — साना-साना हाथ जोड़ि · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) पाठ में उभरने वाला वह द्वितीयक केंद्रीय विचार है जो मुख्य.',
          hint: 'यदि अटके तो तुरंत नोड 006 (मुख्य विषय) और नोड 004-005 (पात्र-चित्रण) पर लौटें — गौण विषय.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि पाठ में आने वाला **हर छोटा-मोटा मुद्दा** (जैसे "मौसम का वर्णन", "मेले का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) पाठ में उभरने वाला वह द्वितीयक केंद्रीय विचार है जो मुख्य विषय का',
                  options: ['गौण विषय (Sub-theme) पाठ में उभरने वाला वह द्वितीयक केंद्रीय विचार है जो मुख्य विषय का', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटके तो तुरंत नोड 006 (मुख्य विषय) और नोड 004-005 (पात्र-चित्रण) पर लौटें — गौण विषय इन्हीं से.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि पाठ में आने वाला **हर छोटा-मोटा मुद्दा** (जैसे "मौसम का वर्णन", "मेले का दृश्य", "खाने का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनरावृत्ति जाँच:** छात्र से कहें: "पाठ में उस विचार को तीन अलग-अलग अध्याय/पृष्ठों पर ढूँढो — यदि नहीं मिला तो वह गौण.', '**मुख्य विषय से जोड़:** पूछें: "यह विचार मुख्य विषय (जो तुमने पिछले नोड में सीखा) को कैसे बदलता/गहरा करता है?', '**साक्ष्य-आधारित लेखन:** छात्र को एक टेबल बनाने को कहें: कॉलम 1 — गौण विषय का नाम, कॉलम 2 — प्रसंग 1, कॉलम 3 — प्रसंग.', '**मॉडल उत्तर दिखाएँ:** बोर्ड के टॉपर उत्तर की फोटोकॉपी दें जहाँ गौण विषय इसी संरचना में लिखे गए हों।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_008', difficulty: 'standard',
          question: 'बिंब (Image) वह शब्द या वाक्यांश है जो पाठक की किसी इंद्रिय (दृष्टि, श्रवण.',
          hint: 'यदि फंसे तो पाठ के मुख्य विषय (nodal main idea) और भाव की पहचान करने वाले नोड.',
          misconception: 'छात्र अक्सर रूपक को सिर्फ "उपमा" समझ लेते हैं और सोचते हैं कि यदि वाक्य में "जैसे" या "मानो" नहीं है तो वह रूपक नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (Image) वह शब्द या वाक्यांश है जो पाठक की किसी इंद्रिय (दृष्टि, श्रवण, गंध, स्पर्श,',
                  options: ['बिंब (Image) वह शब्द या वाक्यांश है जो पाठक की किसी इंद्रिय (दृष्टि, श्रवण, गंध, स्पर्श,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि फंसे तो पाठ के मुख्य विषय (nodal main idea) और भाव की पहचान करने वाले नोड.',
                  misconception: 'छात्र अक्सर रूपक को सिर्फ "उपमा" समझ लेते हैं और सोचते हैं कि यदि वाक्य में "जैसे" या "मानो" नहीं है तो वह रूपक नहीं है, जबकि वास्तव में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि उपमा और रूपक में केवल एक शब्द का अंतर होता है। उपमा: "वह शेर जैसे बहादुर है।" रूपक: "वह शेर बहादुर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_009', difficulty: 'standard',
          question: 'विरोधाभास (contradiction) वह साहित्यिक युक्ति है जिसमें दो विपरीत विचार.',
          hint: 'यदि फँसें तो छवि और रूपक के अंतर को दोहराएँ, विशेष रूप से कि रूपक स्पष्ट तुलना करता है.',
          misconception: 'छात्र अक्सर विरोधाभास को विडंबना (irony) से混淆 करते हैं, मानते हुए कि किसी भी अपेक्षा‑परिणाम टकराव को विरोधाभास कहा जा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास (contradiction) वह साहित्यिक युक्ति है जिसमें दो विपरीत विचार, भावनाएँ या कथन',
                  options: ['विरोधाभास (contradiction) वह साहित्यिक युक्ति है जिसमें दो विपरीत विचार, भावनाएँ या कथन', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि फँसें तो छवि और रूपक के अंतर को दोहराएँ, विशेष रूप से कि रूपक स्पष्ट तुलना करता है जबकि प्रतीक.',
                  misconception: 'छात्र अक्सर विरोधाभास को विडंबना (irony) से混淆 करते हैं, मानते हुए कि किसी भी अपेक्षा‑परिणाम टकराव को विरोधाभास कहा जा सकता है; वे भूल जाते' }
          ],
            remediations: { 'irony': { steps: ['छात्र से पूछें कि क्या वाक्य में कोई स्पष्ट तुलना‑ शब्द ("जैसा", "के समान") है; यदि नहीं, तो यह रूपक नहीं हो सकता। 2.', 'फिर जाँचें कि क्या दो विपरीत तत्व (कार्य‑भावना, विचार‑परिणाम) एक साथ रखे गए हैं; यदि हाँ, तो विरोधाभास है। 3.', 'यदि एक वस्तु अपने प्रत्यक्ष अर्थ से परे किसी विचार को दे रही है बिना कोई तुलना किए, तो यह प्रतीक है। 4.', 'इन प्रश्नों के उत्तर के आधार पर युक्ति की पहचान करने का अभ्यास दो‑तीन विभिन्न वाक्यों पर करवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द — पाठ के केंद्रीय भाव, विषय और शिल्प को धारण करने वाले वे.',
          hint: 'यदि अटका हुआ लगे तो: नोड 006 (मुख्य विषय) और नोड 008 (बिंब/रूपक) दोबारा पढ़ें — विषय और.',
          misconception: 'छात्र समझते हैं कि \'पदावली: मुख्य शब्द\' का अर्थ है — कठिन/तत्सम शब्दों की सूची बनाकर उनके शब्दकोश अर्थ रट लेना। वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द',
                  options: ['पदावली: मुख्य शब्द', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटका हुआ लगे तो: नोड 006 (मुख्य विषय) और नोड 008 (बिंब/रूपक) दोबारा पढ़ें — विषय और बिंब ही.',
                  misconception: 'छात्र समझते हैं कि \'पदावली: मुख्य शब्द\' का अर्थ है — कठिन/तत्सम शब्दों की सूची बनाकर उनके शब्दकोश अर्थ रट लेना। वास्तव में बोर्ड परीक्षा.' }
          ],
            remediations: { 'usage-effect': { steps: ['चरण १: छात्र से कहें — "पाठ का वह अंश पढ़ो जहां शब्द आया है; शब्द को मिटाकर उसकी जगह कोई पर्यायवाची रखो; अब दोनों वाक्य.', 'क्या वह शब्द लेखक की अपनी भाषा का है या पात्र की?" चरण ३: शब्द की ध्वनि (साना-साना की पुनरुक्ति, विगलित का \'ल\' कार का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा विशिष्ट व्याकरणिक संरचनाओं (काल.',
          hint: 'यदि अटके: कक्षा 9 हिंदी व्याकरण (NCERT \'व्याकरण प्रवेश\' या समान) के **काल, वाच्य.',
          misconception: '**विशिष्ट भ्रांति:** "व्याकरण विश्लेषण = क्रिया/संज्ञा पहचानना।" **वास्तविक त्रुटि:** छात्र पाठ में प्रयुक्त क्रिया को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा विशिष्ट व्याकरणिक संरचनाओं (काल, वाच्य,',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा विशिष्ट व्याकरणिक संरचनाओं (काल, वाच्य,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटके: कक्षा 9 हिंदी व्याकरण (NCERT \'व्याकरण प्रवेश\' या समान) के **काल, वाच्य, वाक्य-रूपांतरण**.',
                  misconception: '**विशिष्ट भ्रांति:** "व्याकरण विश्लेषण = क्रिया/संज्ञा पहचानना।" **वास्तविक त्रुटि:** छात्र पाठ में प्रयुक्त क्रिया को \'भूतकालिक क्रिया\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से एक वाक्य चुनने को कहें (पाठ 3 से)। **चरण 2:** पूछें: "इस वाक्य की **एक** व्याकरणिक विशेषता बदलो.', '**क्यों** लेखक ने मूल रूप चुना होगा?" **चरण 4:** छात्र को उत्तर इस प्रारूप में लिखने को कहें: *"लेखक ने [विशेषता] चुना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_012', difficulty: 'standard',
          question: 'बोध-प्रश्न वे प्रश्न हैं जो किसी पाठ (गद्य/पद्य) को पढ़ने के बाद उसकी समझ.',
          hint: 'यदि फंसे तो **पाठ 3 के कथानक (c10_hin_kr_cbse_15_002)** और **मुख्य विषय.',
          misconception: '**सबसे विशिष्ट भ्रांति:** छात्र मानते हैं कि **आशय-सूचक प्रश्नों** में भी पाठ की पंक्तियाँ **शब्दशः उद्धृत (quote.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न वे प्रश्न हैं जो किसी पाठ (गद्य/पद्य) को पढ़ने के बाद उसकी समझ जांचने के लिए',
                  options: ['बोध-प्रश्न वे प्रश्न हैं जो किसी पाठ (गद्य/पद्य) को पढ़ने के बाद उसकी समझ जांचने के लिए', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि फंसे तो **पाठ 3 के कथानक (c10_hin_kr_cbse_15_002)** और **मुख्य विषय (c10_hin_kr_cbse_15_006)**.',
                  misconception: '**सबसे विशिष्ट भ्रांति:** छात्र मानते हैं कि **आशय-सूचक प्रश्नों** में भी पाठ की पंक्तियाँ **शब्दशः उद्धृत (quote verbatim)** करना पर्याप्त.' }
          ],
            remediations: { 'quote-verbatim': { steps: ['**चरणबद्ध सुधार (Remediation):** 1.', '**पहचान अभ्यास:** छात्र को 5 मिश्रित प्रश्न दें (3 वस्तुनिष्ठ, 2 आशय-सूचक) और कहें: "प्रत्येक प्रश्न के आगे **O**.', '**साक्ष्य-व्याख्या टेम्पलेट:** उसे यह ढांचा दें: **उत्तर = (पाठ से उद्धरण) + "इससे पता चलता है कि..." + (व्याख्या).', 'विषय से जुड़ता है।"** इसे 3 अलग-अलग आशय-सूचक प्रश्नों पर लागू करवाएं। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
