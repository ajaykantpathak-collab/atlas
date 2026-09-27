import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch01_p3: SimDef = {
    id: 'v3_c9_hin_ga_ch01_p3',
    title: 'पाठ 1 · Part 3/3',
    subtitle: 'यह नोड **केवल** पाठ 1 (गंगा/निर्धारित पाठ) पर केंद्रित आलोचनात्मक विश्लेषण और व्याख्या की.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 1 · Part 3/3',
    chapters: ['c9_hin_ga_ch01'],
    nodeIds: ['c9_hin_ga_cbse_01_013', 'c9_hin_ga_cbse_01_014', 'c9_hin_ga_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'कल्पना करो: परीक्षा में प्रश्न आता है — *"पाठ में नायक का निर्णय उसकी आंतरिक द्वंद्व को कैसे प्रकट करता है?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन अध्ययन की वह प्रक्रिया है जिसमें छात्र पाठ्य-सामग्री को केवल ग्रहण नहीं करता, बल्कि उसके **तर्कों, प्रमाणों, पूर्वधारणाओं, भाषा-प्रयोग और निहितार्थों**.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — आलोचनात्मक', 'पाठ 1 — लेखन', 'पाठ 1 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_01_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 3/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश या पाठ्यांश के आधार.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें पाठ के मौन वाचन या श्रवण के पश्चात.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 1 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन अध्ययन की वह प्रक्रिया है.',
          hint: 'यदि फँसें: "पाठ 1 के मुख्य विषय (c9_hin_ga_cbse_01_006) और नायक के द्वंद्व.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन = पाठ में कमियाँ निकालना (fault-finding)" या "अपनी व्यक्तिगत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन अध्ययन की वह प्रक्रिया है जिसमें छात्र',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन अध्ययन की वह प्रक्रिया है जिसमें छात्र', 'पृष्ठभूमि और रचनाकार परिचय, किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', '**कथानक** घटनाओं का तार्किक और कारण-कार्य संबंध से युक्त क्रमबद्ध विन्यास है जो रचना के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **काल (समय), स्थान (भूगोल),'],
                  hint: 'यदि फँसें: "पाठ 1 के मुख्य विषय (c9_hin_ga_cbse_01_006) और नायक के द्वंद्व (c9_hin_ga_cbse_01_004).',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन = पाठ में कमियाँ निकालना (fault-finding)" या "अपनी व्यक्तिगत राय लिखना (personal.' }
          ],
            remediations: { 'fault-finding-personal-opinion-critical': { steps: ['छात्र से कहें: "पाठ खोलो, वह अंश ढूँढो जहाँ नायक निर्णय लेता है। उस अंश की दो पंक्तियाँ कॉपी पर लिखो।" (साक्ष्य-आधारित.', 'पूछें: "इन पंक्तियों में कौन-से शब्द नायक के मन को दिखाते हैं?', 'प्रत्येक शब्द को रेखांकित करो।" (भाषा-स्तरीय विश्लेषण) ३.', 'कहें: "अब लिखो: \'लेखक ने ___ शब्द प्रयोग किया है क्योंकि ___।\' यह वाक्य तीन बार पूरा करो।" (कारण-कार्य संबंध स्थापित.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश या.',
          hint: 'यदि अटका हो तो: c9_hin_ga_cbse_01_012 (बोध-प्रश्न) के वस्तुनिष्ठ/आशय-सूचक प्रश्नों को हल.',
          misconception: 'छात्र मानते हैं कि "पाठ-आधारित उत्तर" का अर्थ है पाठ की घटनाओं को अपने शब्दों में दोहराना (paraphrasing/summary)। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश या पाठ्यांश के आधार',
                  options: ['पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश या पाठ्यांश के आधार', 'पृष्ठभूमि और रचनाकार परिचय, किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', '**कथानक** घटनाओं का तार्किक और कारण-कार्य संबंध से युक्त क्रमबद्ध विन्यास है जो रचना के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **काल (समय), स्थान (भूगोल),'],
                  hint: 'यदि अटका हो तो: c9_hin_ga_cbse_01_012 (बोध-प्रश्न) के वस्तुनिष्ठ/आशय-सूचक प्रश्नों को हल करके.',
                  misconception: 'छात्र मानते हैं कि "पाठ-आधारित उत्तर" का अर्थ है पाठ की घटनाओं को अपने शब्दों में दोहराना (paraphrasing/summary)। वे नहीं समझते कि बोर्ड.' }
          ],
            remediations: { 'paraphrasing-summary-how-why-70': { steps: ['छात्र को एक छोटा गद्यांश (5-6 पंक्ति) दें और केवल **Evidence छाँटने** का अभ्यास कराएँ — "पेंसिल से उन वाक्यों को.', 'फिर प्रत्येक रेखांकित वाक्य के आगे बोलकर पूछें: "यह वाक्य तुम्हारे दावे को *कैसे* सिद्ध करता है?" — लिखित Explanation न.', 'अंत में PEEL शीट दें (चार खाने बने हों) और कहें: "अब प्रत्येक खाने में एक-एक वाक्य लिखो।" धीरे-धीरे मौखिक से लिखित की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें पाठ के मौन वाचन या श्रवण के.',
          hint: 'यदि अटका हुआ महसूस करें, तो **c9_hin_ga_cbse_01_012 (बोध-प्रश्न)** के \'आशय-सूचक प्रश्न\'.',
          misconception: '**विशिष्ट भ्रांति:** "चर्चा में वही बोलता है जिसे पूरा पाठ कंठस्थ हो; मुझे सब याद नहीं, इसलिए मैं चुप रहूँगा।" **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें पाठ के मौन वाचन या श्रवण के पश्चात',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें पाठ के मौन वाचन या श्रवण के पश्चात', 'पृष्ठभूमि और रचनाकार परिचय, किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', '**कथानक** घटनाओं का तार्किक और कारण-कार्य संबंध से युक्त क्रमबद्ध विन्यास है जो रचना के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **काल (समय), स्थान (भूगोल),'],
                  hint: 'यदि अटका हुआ महसूस करें, तो **c9_hin_ga_cbse_01_012 (बोध-प्रश्न)** के \'आशय-सूचक प्रश्न\' दोबारा हल.',
                  misconception: '**विशिष्ट भ्रांति:** "चर्चा में वही बोलता है जिसे पूरा पाठ कंठस्थ हो; मुझे सब याद नहीं, इसलिए मैं चुप रहूँगा।" **गलत तर्क:** विद्यार्थी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**छात्र से कहें:** "पाठ खोलो, वह एक पैराग्राफ ढूँढ़ो जो तुम्हें सबसे अधिक प्रभावित लगा — पृष्ठ संख्या नहीं.', '**मॉडल करें:** शिक्षक स्वयं एक तथ्यात्मक, एक विश्लेषणात्मक, एक सृजनात्मक प्रश्न बनाकर दिखाए — **सोच-अलाउड.', '**अभ्यास दें:** जोड़ी बनाकर **\'एक प्रश्न पूछो, एक उत्तर दो\'** खेलें — केवल पाठ्य-साक्ष्य के साथ। 4.', '**फीडबैक:** "तुमने पंक्ति उद्धृत की, अच्छा; अब बताओ यह पंक्ति तुम्हारे तर्क को कैसे सिद्ध करती है?" — **Explanation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
