import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch10_p3: SimDef = {
    id: 'v3_c8_hin_ch10_p3',
    title: 'तरुण के स्वप्न · Part 3/3',
    subtitle: 'यह नोड तरुण के स्वप्न के *पाठगत विश्लेषण* (textual analysis) पर केंद्रित है: बिंब, रूपक.',
    classLevel: 8, subject: 'hin', topic: 'तरुण के स्वप्न · Part 3/3',
    chapters: ['c8_hin_ch10'],
    nodeIds: ['c8_hin_cbse_10_013', 'c8_hin_cbse_10_014', 'c8_hin_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करो तुमने तरुण का सपना पढ़ा और तुम्हें लगा "अरे, यह तो बस एक लड़के के सपने की कहानी है" — लेकिन.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'तरुण के स्वप्न — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के तत्वों — कथानक, पात्र, भाषा, शिल्प, प्रतीक — को *विच्छेदित* (break down) करके उनके पारस्परिक संबंध और रचनाकार के उद्देश्य को समझने की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तरुण के स्वप्न —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'You finished तरुण के स्वप्न — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के तत्वों — कथानक.',
          hint: 'यदि अटके तो c8_hin_cbse_10_008 (बिंब/रूपक) और c8_hin_cbse_10_009 (विरोधाभास/प्रतीक) पर.',
          misconception: 'छात्र समझते हैं कि \'विश्लेषण\' का अर्थ है **पाठ में से \'गहरे अर्थ\' निकाल लेना** (जैसे खजाना ढूँढना), जबकि वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के तत्वों',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के तत्वों', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,'],
                  hint: 'यदि अटके तो c8_hin_cbse_10_008 (बिंब/रूपक) और c8_hin_cbse_10_009 (विरोधाभास/प्रतीक) पर लौटें — वहाँ.',
                  misconception: 'छात्र समझते हैं कि \'विश्लेषण\' का अर्थ है **पाठ में से \'गहरे अर्थ\' निकाल लेना** (जैसे खजाना ढूँढना), जबकि वास्तव में विश्लेषण **रचनाकार के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ कराओ एक लेंस के साथ**: छात्र को कहो — "इस बार कहानी पढ़ने के लिए नहीं, **लेखक की कार्यशाला (workshop).', '**शब्द-चयन सारणी बनवाओ**: एक टेबल दो — कॉलम 1: पाठ का शब्द/वाक्यांश (जैसे \'कतरना\'), कॉलम 2: संभावित विकल्प (टूटना.', 'इसे 5 उदाहरणों के लिए करवाओ। 3.', '**PEEL फ्रेम देकर लिखवाओ**: Point: "लेखक \'कतरना\' प्रयुक्त करता है सामाजिक नियंत्रण दिखाने के लिए।" Evidence: "पंक्ति.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी.',
          hint: 'यदि अटका हुआ लगे: c8_hin_cbse_10_004 (पात्र-चित्रण) और c8_hin_cbse_10_006 (मुख्य विषय).',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "पाठ-आधारित लेखन" का अर्थ है **पाठ की नकल करना (copying lines)** या **पूरा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी साहित्यिक',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह क्षमता है जिसमें छात्र किसी साहित्यिक', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,'],
                  hint: 'यदि अटका हुआ लगे: c8_hin_cbse_10_004 (पात्र-चित्रण) और c8_hin_cbse_10_006 (मुख्य विषय) दोबारा देखें.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "पाठ-आधारित लेखन" का अर्थ है **पाठ की नकल करना (copying lines)** या **पूरा पैराग्राफ उद्धृत करना**। वे.' }
          ],
            remediations: { 'copying-lines': { steps: ['**पहला कदम:** छात्र को एक **कमज़ोर उत्तर** (केवल उद्धरण, बिना विश्लेषण) और एक **मज़बूत उत्तर** (PEEL संरचना) साथ-साथ.', '**दूसरा कदम:** **हाईलाइटिंग अभ्यास** कराएं: पाठ से 5 वाक्य चुनें, छात्र से कहें — "इनमें से केवल **वह एक वाक्य** चुनो.', '**तीसरा कदम:** **PEEL टेम्पलेट** दें (खाली कॉलम: Point | Evidence | Explanation | Link) — छात्र को एक प्रश्न पर भरने को.', '**चौथा कदम:** **स्व-मूल्यांकन चेकलिस्ट** दें: "क्या मेरे उत्तर में Point है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक भाषा-कौशल गतिविधि है जिसमें विद्यार्थी पाठ को.',
          hint: 'यदि अटका लगे तो **c8_hin_cbse_10_006 (मुख्य विषय और संदेश)** और **c8_hin_cbse_10_004.',
          misconception: '**"चर्चा-बिंदु का अर्थ है पाठ से प्रश्न बनाकर उत्तर रटना।"** छात्र समझते हैं कि \'चर्चा-बिंदु\' = **तथ्यात्मक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक भाषा-कौशल गतिविधि है जिसमें विद्यार्थी पाठ को **सही उच्चारण,',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' एक भाषा-कौशल गतिविधि है जिसमें विद्यार्थी पाठ को **सही उच्चारण,', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,'],
                  hint: 'यदि अटका लगे तो **c8_hin_cbse_10_006 (मुख्य विषय और संदेश)** और **c8_hin_cbse_10_004 (नायक.',
                  misconception: '**"चर्चा-बिंदु का अर्थ है पाठ से प्रश्न बनाकर उत्तर रटना।"** छात्र समझते हैं कि \'चर्चा-बिंदु\' = **तथ्यात्मक प्रश्नोत्तर** (जैसे: "तरुण ने.' }
          ],
            remediations: { '6-7': { steps: ['**मॉडलिंग दोहराएँ:** शिक्षक वही अंश **दो बार** पढ़े — पहली बार सपाट (छात्र क शैली), दूसरी बार भावसहित (छात्र ख शैली)।.', '**श्रवण-मानचित्रण (Listening mapping) करवाएँ:** छात्र ख के वाचन को सुनते समय एक **ग्राफ खींचने** को कहें — X-अक्ष.', '**चर्चा-बिंदु टेम्पलेट दें:** "पाठ में ______ शब्द पर बल दिया गया क्योंकि ______। इससे ______ प्रकट होता है।" — रिक्त.', '**सहकर्मी प्रतिपुष्टि (Peer feedback):** जोड़ी में एक पढ़े, दूसरा **\'भाव-स्कोर\' (1-5)** दे और **एक विशिष्ट सुधार** बताए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
