import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch07_p3: SimDef = {
    id: 'v3_c7_hin_ch07_p3',
    title: 'पाठ 7 · Part 3/3',
    subtitle: 'This node covers *how* to analyze and interpret a text by examining authorial craft.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 7 · Part 3/3',
    chapters: ['c7_hin_ch07'],
    nodeIds: ['c7_hin_cbse_07_013', 'c7_hin_cbse_07_014', 'c7_hin_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Think about the last time you argued with a friend about a movie ending — you didn\'t just say "it was bad,".', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) in literature is the disciplined process of actively examining, questioning, and interpreting a text\'s components — such as structure, language, perspective, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_07_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — आलोचनात्मक', 'पाठ 7 — लेखन', 'पाठ 7 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_07_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 3/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी पाठ (गद्य/पद्य) के विशिष्ट अंशों.', answer: '7 -', options: ['7 -', '7 - -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — \'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी अधिगम प्रक्रिया है जहाँ छात्र पाठ को पढ़कर (वाचन) या.', answer: '7 - -', options: ['7 - -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 7 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) in literature is the disciplined process.',
          hint: 'यदि फँसें तो **c7_hin_cbse_07_008 (बिंब और रूपक)** और **c7_hin_cbse_07_009 (विरोधाभास और.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना** या **अपनी निजी राय देना**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) in literature is the disciplined process of actively',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) in literature is the disciplined process of actively', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि फँसें तो **c7_hin_cbse_07_008 (बिंब और रूपक)** और **c7_hin_cbse_07_009 (विरोधाभास और प्रतीक)**.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना** या **अपनी निजी राय देना** ("मुझे यह पसंद नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**भेद स्पष्ट करें:** छात्र के सामने दो उत्तर रखें — एक \'व्यक्तिगत प्रतिक्रिया\' ("मुझे अंत बुरा लगा"), एक \'आलोचनात्मक.', '**\'क्यों\' का खेल खेलें:** पाठ के किसी एक वाक्य पर तीन बार "क्यों?" पूछें। उदा.', '"लेखक ने यहाँ छोटे वाक्य क्यों लिखे?', '→ तनाव बढ़ाने के लिए। तनाव क्यों बढ़ाना चाहा?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी पाठ (गद्य/पद्य) के.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c7_hin_cbse_07_006 (मुख्य विषय और संदेश)** और.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "पाठ-आधारित लेखन" का अर्थ है **पाठ का सारांश लिखना** या **पंक्तियाँ नकल करना**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी पाठ (गद्य/पद्य) के विशिष्ट अंशों',
                  options: ['पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी पाठ (गद्य/पद्य) के विशिष्ट अंशों', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c7_hin_cbse_07_006 (मुख्य विषय और संदेश)** और **c7_hin_cbse_07_004.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "पाठ-आधारित लेखन" का अर्थ है **पाठ का सारांश लिखना** या **पंक्तियाँ नकल करना**। वे **Evidence** और.' }
          ],
            remediations: { 'evidence-explanation': { steps: ['**चरण 1:** छात्र को एक **कमज़ोर उत्तर** दें (केवल Evidence, बिना Explanation) और पूछें: "यह पंक्ति तुम्हारा दावा कैसे.', 'मुझे समझाओ जैसे मैं पाठ नहीं पढ़ा हूँ।" **चरण 2:** उसे **मौखिक रूप से** व्याख्या करने दें, फिर लिखने को कहें। **चरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी अधिगम प्रक्रिया है जहाँ छात्र पाठ को पढ़कर.',
          hint: 'यदि फँसे तो c7_hin_cbse_07_013 (आलोचनात्मक चिंतन) और c7_hin_cbse_07_006 (मुख्य विषय) की.',
          misconception: 'छात्र अक्सर मानते हैं कि \'चर्चा-बिंदु\' का अर्थ है — शिक्षक प्रश्न पूछे, छात्र हाथ उठाएँ, सही उत्तर दे, और शिक्षक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी अधिगम प्रक्रिया है जहाँ छात्र पाठ को पढ़कर (वाचन) या',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी अधिगम प्रक्रिया है जहाँ छात्र पाठ को पढ़कर (वाचन) या', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि फँसे तो c7_hin_cbse_07_013 (आलोचनात्मक चिंतन) और c7_hin_cbse_07_006 (मुख्य विषय) की समीक्षा.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'चर्चा-बिंदु\' का अर्थ है — शिक्षक प्रश्न पूछे, छात्र हाथ उठाएँ, सही उत्तर दे, और शिक्षक "शाबाश" कहे। वे नहीं समझते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को स्पष्ट करो: "चर्चा में \'सही/गलत\' नहीं, \'मजबूत/कमजोर तर्क\' होता है।" इसे एक खेल की तरह समझाओ: जैसे क्रिकेट में.', 'एक छोटा अभ्यास करो: पाठ 7 का एक विवादास्पद प्रसंग लो (जैसे: "क्या नायक को सच बोलना चाहिए था?")। छात्र को दोनों पक्षों.', 'फिर उससे पूछो: "कौन सा तर्क पाठ के अधिक निकट है?" — अब वह साक्ष्य-आधारित निर्णय ले रहा है, न कि राय दे रहा है। 4.', 'अंत में, उसे किसी सहपाठी के तर्क का खंडन करने को कहो, पर शर्त: "पाठ की उसी पंक्ति का प्रयोग करो जिसका उसने किया था।" यह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
