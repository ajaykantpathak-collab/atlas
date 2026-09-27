import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch05_p3: SimDef = {
    id: 'v3_c11_hin_a_ch05_p3',
    title: 'पाठ 5 · Part 3/3',
    subtitle: 'यह नोड कक्षा 11 हिंदी अंतरा के पाठ 5 के संदर्भ में **विश्लेषण और व्याख्या की पद्धति**.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 5 · Part 3/3',
    chapters: ['c11_hin_a_ch05'],
    nodeIds: ['c11_hin_a_cbse_05_013', 'c11_hin_a_cbse_05_014', 'c11_hin_a_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'मान लीजिए आपने एक फिल्म देखी और दोस्त पूछता है "कैसी लगी?" — आप कहते हैं "अच्छी थी" (सारांश/राय)। लेकिन अगर.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के सतही अर्थ से आगे जाकर उसकी अंतर्निहित संरचना, भाषा-प्रयोग, दृष्टिकोण और निहितार्थों का विश्लेषण (Analysis) किया.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — आलोचनात्मक', 'पाठ 5 — लेखन', 'पाठ 5 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_05_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 3/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश/पद्यांश से साक्ष्य.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक **साहित्यिक संवाद कौशल** है जिसमें शिक्षार्थी पाठ का मौन वाचन.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 5 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें.',
          hint: 'यदि फंसें: **नोड 008 (बिंब/रूपक) और 009 (विरोधाभास/प्रतीक)** पर लौटें — एक-एक युक्ति को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन = अपनी राय देना" या "व्याख्या = पाठ का भावार्थ लिखना"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के सतही',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के सतही', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना-काल की', '**कथानक (Plot)** is the logical, causal sequence of events structured as exposition,', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक के घटित होने का समग्र स्पेस-टाइम-कल्चर ढाँचा'],
                  hint: 'यदि फंसें: **नोड 008 (बिंब/रूपक) और 009 (विरोधाभास/प्रतीक)** पर लौटें — एक-एक युक्ति को अलग से.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन = अपनी राय देना" या "व्याख्या = पाठ का भावार्थ लिखना"। **ठीक-ठीक गलत तर्क:** वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग:** एक छोटे अंश (3-4 पंक्तियाँ) लें। **विचार-प्रकट (Think-Aloud)** करें: "मैं देख रहा हूँ यहाँ दो विशेषण साथ.', 'क्योंकि..." — छात्र को **प्रक्रिया** दिखाएं, केवल उत्तर नहीं। 2.', '**संरचित अभ्यास:** दें: "इस पंक्ति में तीन युक्तियाँ हैं। उन्हें चिह्नित करें, फिर बताएं प्रत्येक *कैसे* अर्थ बदलती.', '**प्रतिपुष्टि लूप:** छात्र की व्याख्या पर पूछें: "तुम्हारा दावा X है। पाठ का *कौन-सा शब्द/वाक्य* X को सिद्ध करता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश/पद्यांश.',
          hint: 'यदि फँसें तो **c11_hin_a_cbse_05_006 (मुख्य विषय)** और **c11_hin_a_cbse_05_012.',
          misconception: '**"उत्तर जितना लंबा, अंक उतने अधिक"** — यह Class 11 की सबसे घातक गलतफहमी है। छात्र 150 शब्दों के प्रश्न में 250 शब्द.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश/पद्यांश से साक्ष्य',
                  options: ['पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश/पद्यांश से साक्ष्य', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना-काल की', '**कथानक (Plot)** is the logical, causal sequence of events structured as exposition,', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक के घटित होने का समग्र स्पेस-टाइम-कल्चर ढाँचा'],
                  hint: 'यदि फँसें तो **c11_hin_a_cbse_05_006 (मुख्य विषय)** और **c11_hin_a_cbse_05_012 (बोध-प्रश्न)**.',
                  misconception: '**"उत्तर जितना लंबा, अंक उतने अधिक"** — यह Class 11 की सबसे घातक गलतफहमी है। छात्र 150 शब्दों के प्रश्न में 250 शब्द लिख डालते हैं, जिनमें.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडल उत्तर दिखाएँ:** बोर्ड के टॉपर उत्तर (CBSE वेबसाइट पर उपलब्ध) और कमज़ोर उत्तर साथ रखें; छात्र से **अंतर चिह्नित**.', '**PEEL टेम्पलेट दें:** एक खाका (template) जिसमें चार खाने हों — P, E, E, L — छात्र पहले खाने भरे, फिर वाक्य जोड़ें। 3.', '**शब्द-सीमा अभ्यास:** 3 अंकों के 5 प्रश्न दें, शर्त: **अधिकतम 80 शब्द**। टाइमर लगाएँ। फिर साथ बैठकर गिनें: कितने Point.', '**साक्ष्य-खोज खेल:** पाठ का एक पृष्ठ दें, 2 मिनट में **3 उद्धरण** ढूँढ़ने को कहें जो दिए गए थीम (जैसे "अकेलापन") को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक **साहित्यिक संवाद कौशल** है जिसमें शिक्षार्थी पाठ का.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_05_013 के \'विरोधाभास विश्लेषण\' चरण** को दोहराएँ.',
          misconception: 'छात्र समझते हैं कि **\'चर्चा-बिंदु = अपने विचार बोल देना\'**; वे भूल जाते हैं कि **श्रवण (सुनना) चर्चा का आधा भाग है**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक **साहित्यिक संवाद कौशल** है जिसमें शिक्षार्थी पाठ का मौन वाचन',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक **साहित्यिक संवाद कौशल** है जिसमें शिक्षार्थी पाठ का मौन वाचन', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना-काल की', '**कथानक (Plot)** is the logical, causal sequence of events structured as exposition,', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक के घटित होने का समग्र स्पेस-टाइम-कल्चर ढाँचा'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_05_013 के \'विरोधाभास विश्लेषण\' चरण** को दोहराएँ — वही.',
                  misconception: 'छात्र समझते हैं कि **\'चर्चा-बिंदु = अपने विचार बोल देना\'**; वे भूल जाते हैं कि **श्रवण (सुनना) चर्चा का आधा भाग है**। वास्तविक त्रुटि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग**: शिक्षक एक छोटे अंश पर **\'सोच-जोर से\' (think-aloud)** प्रदर्शित करे — "मैंने यह पंक्ति पढ़ी, मुझे लगा X, पर.', '**संरचित श्रवण अभ्यास**: जोड़े में — एक बोले, दूसरा **बिना राय दिए केवल पुनःकथन (paraphrase)** करे: "तुम कह रहे हो कि...', '**साक्ष्य-कार्ड**: प्रत्येक चर्चा-बिंदु के लिए **अनिवार्य कार्ड** — (अ) मत, (आ) उद्धरण, (इ) व्याख्या, (ई) प्रतिप्रश्न।.', '**फीडबैक लूप**: चर्चा के बाद 2 मिनट: "किसके तर्क ने तुम्हारी सोच बदली?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
