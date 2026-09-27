import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch04_p3: SimDef = {
    id: 'v3_c8_hin_ch04_p3',
    title: 'पाठ 4 · Part 3/3',
    subtitle: 'यह नोड पाठ 4 के संदर्भ में विश्लेषण और व्याख्या की उच्च-क्रम सोच कौशल (Higher Order.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 4 · Part 3/3',
    chapters: ['c8_hin_ch04'],
    nodeIds: ['c8_hin_cbse_04_013', 'c8_hin_cbse_04_014', 'c8_hin_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'मान लो तुमने एक फिल्म देखी जहाँ नायक अंत में बुरे आदमी को माफ कर देता है — पहली नज़र में यह \'अच्छाई\' लगती है.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) वह प्रक्रिया है जिसमें पाठक किसी साहित्यिक कृति के तथ्यों, तर्कों, भाषा-शैली और अंतर्निहित मान्यताओं की जाँच करके उसके गहन अर्थ, उद्देश्य और प्रभाव का स्वतंत्र.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — आलोचनात्मक', 'पाठ 4 — लेखन', 'पाठ 4 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_04_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 3/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (गद्य या पद्य) के विशिष्ट अंशों, पात्रों, घटनाओं.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — चर्चा-बिंदु वे पूर्व-नियोजित विषय या प्रश्न होते हैं जो किसी पाठ के वाचन या श्रवण के बाद.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 4 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) वह प्रक्रिया है जिसमें पाठक किसी साहित्यिक.',
          hint: 'यदि अटका हुआ महसूस हो तो c8_hin_cbse_04_006 (मुख्य विषय और संदेश) और c8_hin_cbse_04_009.',
          misconception: 'छात्र अक्सर समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है पाठ में \'कमियाँ निकालना\' या लेखक से \'असहमत होना\'। वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) वह प्रक्रिया है जिसमें पाठक किसी साहित्यिक कृति के',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) वह प्रक्रिया है जिसमें पाठक किसी साहित्यिक कृति के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in'],
                  hint: 'यदि अटका हुआ महसूस हो तो c8_hin_cbse_04_006 (मुख्य विषय और संदेश) और c8_hin_cbse_04_009 (विरोधाभास.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है पाठ में \'कमियाँ निकालना\' या लेखक से \'असहमत होना\'। वास्तव में, आलोचनात्मक चिंतन का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "चलो एक छोटा प्रयोग करते हैं — पाठ 4 का कोई एक संवाद चुनो जो तुम्हें पसंद है। अब बताओ: लेखक ने यह संवाद.', 'अगर शब्द बदल दिए जाएँ तो क्या प्रभाव बदलेगा?" 2.', 'फिर पूछें: "इस संवाद को बोलने वाले पात्र को क्या पता नहीं है जो पाठक को पता है?', 'फिर कहें: "अब इस संवाद को पाठ के मुख्य विषय (जो तुम पहले पढ़ चुके हो) से जोड़कर एक वाक्य लिखो।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (गद्य या पद्य) के विशिष्ट अंशों.',
          hint: 'यदि छात्र Evidence नहीं ढूँढ़ पा रहा, तो **पाठ 4 के \'पदावली: मुख्य शब्द\'.',
          misconception: '**सबसे विशिष्ट भ्रम:** छात्र मानते हैं कि "पाठ-आधारित उत्तर" का अर्थ है **पाठ का अनुवाद या सारांश** लिखना — विशेषकर जब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (गद्य या पद्य) के विशिष्ट अंशों, पात्रों, घटनाओं',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (गद्य या पद्य) के विशिष्ट अंशों, पात्रों, घटनाओं', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in'],
                  hint: 'यदि छात्र Evidence नहीं ढूँढ़ पा रहा, तो **पाठ 4 के \'पदावली: मुख्य शब्द\' (c8_hin_cbse_04_010) और.',
                  misconception: '**सबसे विशिष्ट भ्रम:** छात्र मानते हैं कि "पाठ-आधारित उत्तर" का अर्थ है **पाठ का अनुवाद या सारांश** लिखना — विशेषकर जब प्रश्न "चर्चा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — निदान:** छात्र से कहें: "अपना उत्तर पढ़ो और हर वाक्य के आगे लिखो: यह **Point** है, **Evidence** है.', 'जो वाक्य किसी श्रेणी में न आए, उसे काट दो।" **चरण 2 — मॉडलिंग:** उसी प्रश्न का एक **आदर्श PEEL उत्तर** साथ में लिखकर.', 'अब Evidence के लिए पाठ स्कैन करूँगा...")। **चरण 3 — साझा अभ्यास:** एक नया प्रश्न दें, छात्र से **केवल Point और.', 'क्या Explanation में \'क्यों/कैसे\' है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_04_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु वे पूर्व-नियोजित विषय या प्रश्न होते हैं जो किसी पाठ के वाचन या.',
          hint: 'यदि विद्यार्थी अटका हो तो c8_hin_cbse_04_013 (आलोचनात्मक चिंतन) के \'द्वंद्व-पहचान\' अभ्यास.',
          misconception: 'विद्यार्थी समझते हैं कि चर्चा-बिंदु का अर्थ है **\'कक्षा में शोर-शराबा करना\'** या **\'जो मन में आए बोल देना\'**। वे तैयारी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु वे पूर्व-नियोजित विषय या प्रश्न होते हैं जो किसी पाठ के वाचन या श्रवण के बाद',
                  options: ['चर्चा-बिंदु वे पूर्व-नियोजित विषय या प्रश्न होते हैं जो किसी पाठ के वाचन या श्रवण के बाद', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी साहित्यिक कृति के लेखन-काल, सामाजिक-ऐतिहासिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) पर आधारित तार्किक क्रम है', 'पाठ्य-परिवेश (setting) refers to the time, place, and social context in'],
                  hint: 'यदि विद्यार्थी अटका हो तो c8_hin_cbse_04_013 (आलोचनात्मक चिंतन) के \'द्वंद्व-पहचान\' अभ्यास पर वापस.',
                  misconception: 'विद्यार्थी समझते हैं कि चर्चा-बिंदु का अर्थ है **\'कक्षा में शोर-शराबा करना\'** या **\'जो मन में आए बोल देना\'**। वे तैयारी नहीं करते, पाठ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडल चर्चा दिखाएँ**: शिक्षक स्वयं दो विद्यार्थियों के साथ एक मिनी-चर्चा करें — एक तर्क दे, दूसरा खंडन करे, शिक्षक.', '**साक्ष्य-कार्ड बाँटें**: प्रत्येक विद्यार्थी को चर्चा से पहले 2 मिनट दें पाठ खोलकर **एक वाक्य** ढूँढने के लिए जो उसके.', '**\'सुनकर दोहराओ\' नियम लागू करें**: बोलने से पहले पिछले वक्ता का तर्क अपने शब्दों में दोहराना अनिवार्य करें। 4.', '**चर्चा-लॉग भरवाएँ**: चर्चा के बाद प्रत्येक विद्यार्थी लिखे — "मेरा मत बदला/नहीं बदला, क्योंकि…" — यह मेटाकॉग्निशन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
