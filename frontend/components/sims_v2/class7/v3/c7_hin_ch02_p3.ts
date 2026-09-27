import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch02_p3: SimDef = {
    id: 'v3_c7_hin_ch02_p3',
    title: 'पाठ 2 · Part 3/3',
    subtitle: 'यह नोड पाठ 2 के संदर्भ में विश्लेषण (कैसे/क्यों) और व्याख्या (क्या अर्थ निकलता है) कौशल.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 2 · Part 3/3',
    chapters: ['c7_hin_ch02'],
    nodeIds: ['c7_hin_cbse_02_013', 'c7_hin_cbse_02_014', 'c7_hin_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो कि तुम्हारे दोस्त ने कहा "मुझे बहुत मज़ा आया" पर उसका चेहरा उदास था — तुम तुरंत समझ जाओगे कि बात.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ का गहन विश्लेषण (Analysis) करके उसके छिपे अर्थ, लेखक के उद्देश्य, और विचारों की आंतरिक संगति को समझने की प्रक्रिया है, जिसके आधार पर फिर उसकी तर्कसंगत.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — आलोचनात्मक', 'पाठ 2 — लेखन', 'पाठ 2 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_02_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 3/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है पढ़े गए अध्याय, कहानी या कविता से जानकारी लेकर अपने.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — चर्चा-बिंदु (Discussion Points) वे मुख्य विषय, प्रश्न या मुद्दे होते हैं जो किसी पाठ को.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 2 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ का गहन विश्लेषण (Analysis) करके.',
          hint: 'यदि अटका हुआ लगे, तो पहले c7_hin_cbse_02_006 (मुख्य विषय) और c7_hin_cbse_02_009.',
          misconception: 'छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का मतलब पाठ की \'आलोचना\' (Criticism) करना यानी कमियाँ निकालना है — जैसे "लेखक ने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ का गहन विश्लेषण (Analysis) करके उसके छिपे',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ का गहन विश्लेषण (Analysis) करके उसके छिपे', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका हुआ लगे, तो पहले c7_hin_cbse_02_006 (मुख्य विषय) और c7_hin_cbse_02_009 (विरोधाभास/प्रतीक).',
                  misconception: 'छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का मतलब पाठ की \'आलोचना\' (Criticism) करना यानी कमियाँ निकालना है — जैसे "लेखक ने यह गलत लिखा", "कहानी.' }
          ],
            remediations: { 'criticism': { steps: ['छात्र को \'Critical\' शब्द की व्युत्पत्ति (Etymology) समझाओ: "यह \'Critic\' (निर्णायक/समालोचक) से बना है, जिसका काम कमियाँ.', 'एक छोटा अभ्यास कराओ: पाठ 2 का एक वाक्य दो बार पढ़वाओ — पहली बार पूछो "क्या लिखा है?" (तथ्य), दूसरी बार "लेखक ने यह शब्द.', '\'PEEL\' संरचना (Point, Evidence, Explanation, Link) का एक खाका (Template) दो और छात्र से कहो कि अगली बार उत्तर इसी में.', 'अगले 2-3 प्रश्नों में केवल \'Evidence\' (प्रमाण) ढूंढने का अभ्यास कराओ, पूरा उत्तर लिखने का दबाव न डालो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है पढ़े गए अध्याय, कहानी या कविता से जानकारी लेकर.',
          hint: 'यदि छात्र PEEL के चरणों को क्रम में नहीं रख पा रहा है, तो c7_hin_cbse_02_006 (मुख्य विषय.',
          misconception: 'छात्र अक्सर मानते हैं कि "अपने शब्दों में लिखना" का अर्थ है पाठ की पंक्तियों को थोड़ा बदल देना या समानार्थी शब्दों में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है पढ़े गए अध्याय, कहानी या कविता से जानकारी लेकर अपने',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है पढ़े गए अध्याय, कहानी या कविता से जानकारी लेकर अपने', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि छात्र PEEL के चरणों को क्रम में नहीं रख पा रहा है, तो c7_hin_cbse_02_006 (मुख्य विषय और संदेश).',
                  misconception: 'छात्र अक्सर मानते हैं कि "अपने शब्दों में लिखना" का अर्थ है पाठ की पंक्तियों को थोड़ा बदल देना या समानार्थी शब्दों में बदल देना—जैसे "वह.' }
          ],
            remediations: { 'verdadera': { steps: ['छात्र से पूछिए: "इस पंक्ति के बाद क्या हुआ?', 'इस क्रिया का क्या कारण हो सकता है?', 'यह बात कहानी के बड़े संदेश से कैसे जुड़ सकती है?" फिर उनके उत्तर को PEEL चरणों में बाँटकर दिखाइए: पहले आपका बिंदु क्या.', 'फिर पाठ से कौन सा प्रमाण आपके बिंदु को सपोर्ट करता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_02_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) वे मुख्य विषय, प्रश्न या मुद्दे होते हैं जो.',
          hint: 'अगर अटके तो **c7_hin_cbse_02_002 (कथानक)** और **c7_hin_cbse_02_006 (मुख्य विषय)** दोबारा.',
          misconception: 'विद्यार्थी समझते हैं कि **चर्चा का अर्थ है "बोलना"**, जबकि असल अर्थ है **"सुनकर, प्रमाण देकर, सोच को आगे बढ़ाना"**。 वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु (Discussion Points) वे मुख्य विषय, प्रश्न या मुद्दे होते हैं जो किसी पाठ को',
                  options: ['चर्चा-बिंदु (Discussion Points) वे मुख्य विषय, प्रश्न या मुद्दे होते हैं जो किसी पाठ को', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (Cause-Effect) वाला तार्किक क्रम है,', 'पाठ्य-परिवेश (setting) किसी रचना का भौगोलिक स्थान, ऐतिहासिक काल, सामाजिक-सांस्कृतिक'],
                  hint: 'अगर अटके तो **c7_hin_cbse_02_002 (कथानक)** और **c7_hin_cbse_02_006 (मुख्य विषय)** दोबारा पढ़ो.',
                  misconception: 'विद्यार्थी समझते हैं कि **चर्चा का अर्थ है "बोलना"**, जबकि असल अर्थ है **"सुनकर, प्रमाण देकर, सोच को आगे बढ़ाना"**。 वे अक्सर पाठ पढ़े बिना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: विद्यार्थी को **पाठ का एक छोटा अंश (५-६ पंक्तियाँ) दोबारा पढ़वाओ** और पूछो: "यहाँ लेखक क्या दिखाना चाहता है?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
