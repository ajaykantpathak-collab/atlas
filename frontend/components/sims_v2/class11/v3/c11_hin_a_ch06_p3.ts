import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch06_p3: SimDef = {
    id: 'v3_c11_hin_a_ch06_p3',
    title: 'पाठ 6 · Part 3/3',
    subtitle: 'यह नोड कक्षा 11 के \'अंतरा\' भाग-1 के पाठ 6 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या) की.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 6 · Part 3/3',
    chapters: ['c11_hin_a_ch06'],
    nodeIds: ['c11_hin_a_cbse_06_013', 'c11_hin_a_cbse_06_014', 'c11_hin_a_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना करो कि तुमने कोई फिल्म देखी और मित्र पूछे "कैसी लगी?" — तुम कहते हो "अच्छी थी" (यह सारांश/प्रतिक्रिया.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के अवयवों (शब्द, बिंब, प्रतीक, संरचना, भाषा-शैली) को तार्किक ढंग से विखंडित करके (विश्लेषण) उनके परस्पर संबंध और गहन निहितार्थ को उद्घाटित करने (व्याख्या) की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — आलोचनात्मक', 'पाठ 6 — लेखन', 'पाठ 6 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_06_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 3/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based writing skill) is the ability to construct analytical.', answer: '6 -', options: ['6 -', '6 - -'] },
            { id: 's2', label: '6 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु वह **संरचित संवाद-कौशल** है जिसमें शिक्षार्थी पाठ को पढ़ने/सुनने.', answer: '6 - -', options: ['6 - -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 6 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के अवयवों (शब्द, बिंब, प्रतीक, संरचना.',
          hint: 'यदि अटकें तो **c11_hin_a_cbse_06_008 (बिंब और रूपक)** और **c11_hin_a_cbse_06_009.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः \'आलोचनात्मक चिंतन\' का अर्थ \'दोष निकालना\' (Fault-finding) या \'नकारात्मक टिप्पणी करना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के अवयवों (शब्द, बिंब, प्रतीक, संरचना,',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के अवयवों (शब्द, बिंब, प्रतीक, संरचना,', '**पृष्ठभूमि (Context)** किसी रचना के लिखे जाने का **ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी कथा में घटित घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का भौतिक,'],
                  hint: 'यदि अटकें तो **c11_hin_a_cbse_06_008 (बिंब और रूपक)** और **c11_hin_a_cbse_06_009 (विरोधाभास और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः \'आलोचनात्मक चिंतन\' का अर्थ \'दोष निकालना\' (Fault-finding) या \'नकारात्मक टिप्पणी करना\' समझ लेते हैं। वे.' }
          ],
            remediations: { 'fault-finding': { steps: ['**शब्दार्थ स्पष्टीकरण:** छात्र को \'Critical\' की व्युत्पत्ति (Greek *kritikos* = \'निर्णय करने योग्य, विश्लेषण करने.', '**मॉडलिंग (Modeling):** पाठ 6 के एक छोटे अंश (3-4 पंक्तियाँ) लें और छात्र के सामने \'थिंक-अलाउड\' (Think-Aloud) करें.', 'क्योंकि पाठ में पहले Z हुआ था...', 'अतः मेरा निष्कर्ष यह है।" — इससे छात्र देखेगा कि \'पसंद/नापसंद\' का कोई स्थान नहीं है। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based writing skill) is the ability to construct.',
          hint: 'यदि फंसें तो **c11_hin_a_cbse_06_013 (आलोचनात्मक चिंतन)** पर लौटें: किसी एक प्रसंग को.',
          misconception: '**"पाठ-आधारित लेखन का अर्थ है कहानी/कविता का सारांश (summary) लिखना।"** यह सबसे घातक भ्रम है। छात्र सोचते हैं कि "पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based writing skill) is the ability to construct analytical,',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based writing skill) is the ability to construct analytical,', '**पृष्ठभूमि (Context)** किसी रचना के लिखे जाने का **ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी कथा में घटित घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का भौतिक,'],
                  hint: 'यदि फंसें तो **c11_hin_a_cbse_06_013 (आलोचनात्मक चिंतन)** पर लौटें: किसी एक प्रसंग को लेकर "क्या?',
                  misconception: '**"पाठ-आधारित लेखन का अर्थ है कहानी/कविता का सारांश (summary) लिखना।"** यह सबसे घातक भ्रम है। छात्र सोचते हैं कि "पाठ पर आधारित" का अर्थ है.' }
          ],
            remediations: { 'summary': { steps: ['**पहचानें:** छात्र से पूछें — "तुम्हारे इस वाक्य का सबूत पाठ में कहाँ है?', 'उंगली रखकर दिखाओ।" यदि वे पन्ने पलटने लगें या अस्पष्ट कहें ("कहीं तो लिखा है"), तो समझें Evidence चरण छूटा है। 2.', '**मॉडल करें:** उसी दावे के लिए **आप** एक मॉडल PEEL पैराग्राफ लिखकर दिखाएं, हर चरण को लेबल करते हुए (P/E/E/L)। 3.', '**संयुक्त अभ्यास:** अगले प्रश्न पर **मिलकर** लिखें — आप Point दें, वे Evidence ढूंढें, आप Explanation सुझाएं, वे Link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_06_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु वह **संरचित संवाद-कौशल** है जिसमें शिक्षार्थी पाठ को.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_06_013 (आलोचनात्मक चिंतन)** और **c11_hin_a_cbse_06_012.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **"चर्चा-बिंदु = पाठ का सारांश (summary) या अपनी पसंद/नापसंद (opinion)"**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु वह **संरचित संवाद-कौशल** है जिसमें शिक्षार्थी पाठ को पढ़ने/सुनने',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु वह **संरचित संवाद-कौशल** है जिसमें शिक्षार्थी पाठ को पढ़ने/सुनने', '**पृष्ठभूमि (Context)** किसी रचना के लिखे जाने का **ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'कथानक (Plot) किसी कथा में घटित घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का भौतिक,'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_06_013 (आलोचनात्मक चिंतन)** और **c11_hin_a_cbse_06_012 (बोध-प्रश्न)**.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **"चर्चा-बिंदु = पाठ का सारांश (summary) या अपनी पसंद/नापसंद (opinion)"**। **गलत तर्क**: वे सोचते.' }
          ],
            remediations: { 'summary-opinion': { steps: ['**चरण १**: छात्र से कहें — *"अपना अंतिम उत्तर पढ़ो और बताओ: क्या तुमने कहानी की कोई पंक्ति उद्धृत की?', 'क्या तुमने बताया कि लेखक ने वह प्रभाव कैसे पैदा किया?"* **चरण २**: यदि उत्तर \'नहीं\' हो, तो **PEEL टेम्पलेट** दें — खाली.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
