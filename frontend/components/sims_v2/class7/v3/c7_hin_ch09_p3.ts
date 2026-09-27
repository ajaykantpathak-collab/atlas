import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch09_p3: SimDef = {
    id: 'v3_c7_hin_ch09_p3',
    title: 'पाठ 9 · Part 3/3',
    subtitle: 'इस नोड में पाठ 9 के आधार पर विश्लेषण और व्याख्या के उन्नत कौशल शामिल हैं: साक्ष्य-आधारित.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 9 · Part 3/3',
    chapters: ['c7_hin_ch09'],
    nodeIds: ['c7_hin_cbse_09_013', 'c7_hin_cbse_09_014', 'c7_hin_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करें कि आपने कोई नई फिल्म देखी और आपका दोस्त पूछता है, "कैसी लगी?" — आप सिर्फ कहानी नहीं सुनाते, बल्कि.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहरे अर्थ, संरचना, भाषा-शैली और अंतर्निहित मान्यताओं को तर्कसंगत ढंग से परखने, प्रश्न करने और व्याख्या करने की प्रक्रिया है, न कि केवल तथ्यों को याद.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — आलोचनात्मक', 'पाठ 9 — लेखन', 'पाठ 9 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_09_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 3/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (कहानी, कविता, निबंध) को पढ़कर, उसके तत्वों.', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — \'वाचन-श्रवण: चर्चा-बिंदु\' वह कौशल है जिसमें छात्र पाठ को पढ़कर/सुनकर अपनी समझ, जिज्ञासा.', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 9 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहरे अर्थ, संरचना, भाषा-शैली.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c7_hin_cbse_09_006 (मुख्य विषय)** और **c7_hin_cbse_09_008.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना** (fault-finding) या **अपनी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहरे अर्थ, संरचना, भाषा-शैली और',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ के गहरे अर्थ, संरचना, भाषा-शैली और', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c7_hin_cbse_09_006 (मुख्य विषय)** और **c7_hin_cbse_09_008 (बिंब-रूपक)**.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना** (fault-finding) या **अपनी निजी राय देना**.' }
          ],
            remediations: { 'fault-finding-personal-opinion': { steps: ['**शब्दावली स्पष्ट करें:** छात्र के साथ बैठकर "आलोचना" (critique) और "निंदा" (condemnation) का अंतर समझाएं — आलोचना.', '**मॉडलिंग करें:** पाठ 9 का एक छोटा अंश लें और **सोचते हुए बोलें** (think-aloud): "मैं देख रहा हूँ लेखक ने यहाँ रूपक.', 'मुझे लगता है इसका कारण यह है...', 'क्योंकि पाठ में यहाँ इसका प्रमाण है..." — यह दिखाएं कि विश्लेषण कैसे **पाठ से निकलता है**, राय से नहीं। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (कहानी, कविता, निबंध) को पढ़कर, उसके.',
          hint: 'यदि फँसें तो: c7_hin_cbse_09_013 (आलोचनात्मक चिंतन) दोहराएँ — वहाँ Explanation का अभ्यास.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "पाठ से उद्धरण दे देना" ही Evidence चरण पूरा करना है। वे लिखते हैं: *"पृष्ठ ३ पर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (कहानी, कविता, निबंध) को पढ़कर, उसके तत्वों',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (कहानी, कविता, निबंध) को पढ़कर, उसके तत्वों', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,'],
                  hint: 'यदि फँसें तो: c7_hin_cbse_09_013 (आलोचनात्मक चिंतन) दोहराएँ — वहाँ Explanation का अभ्यास छोटे-छोटे.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "पाठ से उद्धरण दे देना" ही Evidence चरण पूरा करना है। वे लिखते हैं: *"पृष्ठ ३ पर लिखा है \'वह रोया\'.' }
          ],
            remediations: { 'evidence-explanation-explanation': { steps: ['**दिखाओ, बताओ मत:** एक कमज़ोर उत्तर (केवल उद्धरण + अनुवाद) और एक मज़बूत उत्तर (उद्धरण + प्रेरणा/प्रसंग/विषय-संबंध) साथ.', '**\'क्यों\' सीढ़ी:** छात्र से कहो: "हर Evidence के बाद तीन बार \'क्यों?\' पूछो — पहला: पात्र ने ऐसा क्यों किया?', 'दूसरा: लेखक ने यह दृश्य क्यों रखा?', 'तीसरा: पाठक को क्या महसूस कराना चाहता है?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' वह कौशल है जिसमें छात्र पाठ को पढ़कर/सुनकर अपनी समझ.',
          hint: 'यदि अटका हुआ महसूस हो तो नोड ०१२ के वस्तुनिष्ठ प्रश्नों को दोहराएँ और पाठ के किन्हीं तीन.',
          misconception: 'छात्र समझते हैं कि चर्चा में \'जोर से बोलना\' या \'पहले बोलना\' जीतना है, जबकि असली चर्चा \'सुनकर, रुककर, फिर बोलना\' है। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' वह कौशल है जिसमें छात्र पाठ को पढ़कर/सुनकर अपनी समझ, जिज्ञासा',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' वह कौशल है जिसमें छात्र पाठ को पढ़कर/सुनकर अपनी समझ, जिज्ञासा', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,'],
                  hint: 'यदि अटका हुआ महसूस हो तो नोड ०१२ के वस्तुनिष्ठ प्रश्नों को दोहराएँ और पाठ के किन्हीं तीन प्रसंगों.',
                  misconception: 'छात्र समझते हैं कि चर्चा में \'जोर से बोलना\' या \'पहले बोलना\' जीतना है, जबकि असली चर्चा \'सुनकर, रुककर, फिर बोलना\' है। वे पाठ के शब्दों को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: छात्र को मौन पाठ पढ़ने दें और तीन \'क्यों?\' प्रश्न लिखने को कहें। चरण २: जोड़ी बनाकर एक-दूसरे के प्रश्न पढ़वाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
