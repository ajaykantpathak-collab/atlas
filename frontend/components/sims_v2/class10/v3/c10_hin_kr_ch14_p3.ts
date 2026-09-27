import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_kr_ch14_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_kr_ch14_p3: SimDef = {
    id: 'v3_c10_hin_kr_ch14_p3',
    title: 'जॉर्ज पंचम की नाक · Part 3/3',
    subtitle: 'यह नोड केवल पाठ 2 (साना-साना हाथ जोड़ि) के **विश्लेषण और व्याख्या की प्रक्रिया** सिखाता.',
    classLevel: 10, subject: 'hin_kr', topic: 'जॉर्ज पंचम की नाक · Part 3/3',
    chapters: ['c10_hin_kr_ch14'],
    nodeIds: ['c10_hin_kr_cbse_14_013', 'c10_hin_kr_cbse_14_014', 'c10_hin_kr_cbse_14_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'शुरू करें एक परिचित स्थिति से: "तुमने कभी कोई फ़िल्म देखी और फिर दोस्त से कहा \'वो सीन जहाँ हीरो चुप रहता है.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के तत्वों — कथानक, पात्र, भाषा, शैली, प्रतीक — को व्यवस्थित ढंग से अलग करके, उनके परस्पर संबंध और रचनाकार के उद्देश्य को समझना, फिर.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_kr_cbse_14_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — आलोचनात्मक', 'पाठ 2 — लेखन', 'पाठ 2 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_kr_cbse_14_014', title: 'Identify each idea',
          dissect: { specimen: 'जॉर्ज पंचम की नाक · Part 3/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है NCERT कृतिका के गद्य/पद्य पाठों से पूछे गए प्रश्नों (जैसे.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर (वाचन), दूसरों के.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_14_015', title: 'You made it',
          caseStudy: { intro: 'You finished जॉर्ज पंचम की नाक — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के तत्वों — कथानक.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c10_hin_kr_cbse_14_008 (बिंब-रूपक)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "आलोचनात्मक विश्लेषण" का अर्थ **पाठ में कमियाँ निकालना** या **लेखक की निंदा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के तत्वों',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के तत्वों', 'पृष्ठभूमि और रचनाकार परिचय (Background and Author Introduction) is the systematic study', 'कथानक किसी कहानी की घटनाओं का क्रमबद्ध विवरण है, whereas आख्यान-संरचना वह रूपरेखा है', 'पाठ्य-परिवेश लेखक के जीवनकाल, ऐतिहासिक period, सामाजिक-आर्थिक स्थिति और literary परम्परा'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c10_hin_kr_cbse_14_008 (बिंब-रूपक)** और **c10_hin_kr_cbse_14_009.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "आलोचनात्मक विश्लेषण" का अर्थ **पाठ में कमियाँ निकालना** या **लेखक की निंदा करना** है। उदाहरण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**शब्दकोश सुधारें:** कक्षा में \'Critical Analysis\' के लिए हिंदी पद **"विवेचन"** या **"समालोचनात्मक विश्लेषण"** लिखें और.', '**मॉडल दिखाएँ:** एक ही अंश का दो विश्लेषण दें — (क) निंदात्मक: "लेखक ने स्त्री को बेचारा बनाया" (ख) विश्लेषणात्मक.', '**अभ्यास:** छात्रों से कहें: "पाठ का कोई एक वाक्य चुनो और बताओ कि यदि लेखक उसकी जगह दूसरा शब्द चुनता तो अर्थ कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है NCERT कृतिका के गद्य/पद्य पाठों से पूछे गए.',
          hint: 'यदि फंसें तो **नोड 012 (बोध-प्रश्न)** और **नोड 013 (आलोचनात्मक चिंतन)** के अभ्यास दोहराएं.',
          misconception: '**विशिष्ट भ्रांति**: *"लेखन कौशल का अर्थ \'अच्छी भाषा/शुद्ध हिंदी\' में लिखना है — यदि मेरी हिंदी शुद्ध है और मैंने पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है NCERT कृतिका के गद्य/पद्य पाठों से पूछे गए प्रश्नों (जैसे',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है NCERT कृतिका के गद्य/पद्य पाठों से पूछे गए प्रश्नों (जैसे', 'पृष्ठभूमि और रचनाकार परिचय (Background and Author Introduction) is the systematic study', 'कथानक किसी कहानी की घटनाओं का क्रमबद्ध विवरण है, whereas आख्यान-संरचना वह रूपरेखा है', 'पाठ्य-परिवेश लेखक के जीवनकाल, ऐतिहासिक period, सामाजिक-आर्थिक स्थिति और literary परम्परा'],
                  hint: 'यदि फंसें तो **नोड 012 (बोध-प्रश्न)** और **नोड 013 (आलोचनात्मक चिंतन)** के अभ्यास दोहराएं — ये.',
                  misconception: '**विशिष्ट भ्रांति**: *"लेखन कौशल का अर्थ \'अच्छी भाषा/शुद्ध हिंदी\' में लिखना है — यदि मेरी हिंदी शुद्ध है और मैंने पाठ की बातें लिख दीं, तो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**निदान**: छात्र से 3 अंक का एक प्रश्न हल करवाएं और उसका उत्तर PEEL ग्रिड पर मैप करें — कौन सा कक्ष खाली है?', '(अक्सर Explanation और Link खाली मिलते हैं)। 2.', '**मॉडलिंग**: उसी प्रश्न का आदर्श PEEL उत्तर **साथ-साथ लिखकर दिखाएं**, प्रत्येक चरण के लिए \'सोच-बोल\' (think-aloud) करें.', 'अब Evidence के लिए पाठ से कौन सा वाक्य सबसे सटीक है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर (वाचन).',
          hint: 'यदि अटके तो **c10_hin_kr_cbse_14_013 (आलोचनात्मक चिंतन)** पर लौटें — वहाँ सीखे \'प्रश्न.',
          misconception: 'छात्र समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ है पाठ के बारे में अपने \'विचार\' या \'भावनाएँ\' व्यक्त करना** — जैसे "मुझे पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर (वाचन), दूसरों के',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर (वाचन), दूसरों के', 'पृष्ठभूमि और रचनाकार परिचय (Background and Author Introduction) is the systematic study', 'कथानक किसी कहानी की घटनाओं का क्रमबद्ध विवरण है, whereas आख्यान-संरचना वह रूपरेखा है', 'पाठ्य-परिवेश लेखक के जीवनकाल, ऐतिहासिक period, सामाजिक-आर्थिक स्थिति और literary परम्परा'],
                  hint: 'यदि अटके तो **c10_hin_kr_cbse_14_013 (आलोचनात्मक चिंतन)** पर लौटें — वहाँ सीखे \'प्रश्न पूछना\' और.',
                  misconception: 'छात्र समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ है पाठ के बारे में अपने \'विचार\' या \'भावनाएँ\' व्यक्त करना** — जैसे "मुझे पाठ अच्छा लगा", "पात्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र को एक परिचित पाठ (जैसे "नेताजी का चश्मा") दें और कहें: "इसके 3 तथ्यात्मक प्रश्न लिखो, फिर 3.', '**दूसरा कदम:** प्रत्येक चर्चा-बिंदु के लिए पूछें: "इसके पक्ष और विपक्ष में पाठ से एक-एक पंक्ति ढूंढो।" यदि नहीं मिलता.', '**तीसरा कदम:** 5 मिनट का टाइमर लगाकर "सुनो-समझो-बोलो" अभ्यास कराएँ: एक बोले, दूसरा सारांश देकर अपना तर्क जोड़े। 4.', '**चौथा कदम:** पिछले वर्ष के ASL रिकॉर्डिंग सुनवाएँ और छात्र से कहें: "पहचानो कि किसने पाठ-साक्ष्य दिया, किसने केवल राय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
