import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch01_p3: SimDef = {
    id: 'v3_c6_hin_ch01_p3',
    title: 'पाठ 1 · Part 3/3',
    subtitle: 'यह नोड कक्षा 6 के स्तर पर पाठ के **आंतरिक साक्ष्य** (Internal Evidence) पर आधारित.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 1 · Part 3/3',
    chapters: ['c6_hin_ch01'],
    nodeIds: ['c6_hin_cbse_01_013', 'c6_hin_cbse_01_014', 'c6_hin_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो तुमने एक नई फिल्म देखी और दोस्त पूछता है "कैसी लगी?" — तुम सिर्फ "अच्छी थी" नहीं कहते, बल्कि बताते.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ की गहरी जाँच-परख की प्रक्रिया है जिसमें हम पाठ के अवयवों (पात्र, कथानक, भाषा, शैली) को अलग-अलग समझते हैं (विश्लेषण) और फिर उन्हें जोड़कर पाठ का गहरा.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — आलोचनात्मक', 'पाठ 1 — लेखन', 'पाठ 1 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_01_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 3/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह योग्यता है जिसमें छात्र किसी दिए गए गद्यांश या पद्यांश के आधार पर.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — \'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है किसी पाठ को पढ़ने (वाचन) या सुनने (श्रवण) के बाद.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_01_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ की गहरी जाँच-परख की प्रक्रिया है.',
          hint: 'यदि फँस जाएँ तो **नोड 006 (मुख्य विषय) और नोड 008-009 (साहित्यिक युक्तियाँ)** पर लौटें.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'व्याख्या\' (Interpretation) का अर्थ है **\'अपनी राय देना\' (Giving Opinion)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ की गहरी जाँच-परख की प्रक्रिया है जिसमें हम',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ की गहरी जाँच-परख की प्रक्रिया है जिसमें हम', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि फँस जाएँ तो **नोड 006 (मुख्य विषय) और नोड 008-009 (साहित्यिक युक्तियाँ)** पर लौटें — व्याख्या.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'व्याख्या\' (Interpretation) का अर्थ है **\'अपनी राय देना\' (Giving Opinion)** — जैसे "मुझे लगता है.' }
          ],
            remediations: { 'interpretation-giving-opinion-subjective-prefere': { steps: ['**मॉडलिंग**: एक छोटे अंश पर **\'राय\' बनाम \'व्याख्या\'** का तुलना चार्ट बनाओ — बाएँ कॉलम में "मुझे लगा...", दाएँ में "पाठ.', '**अभ्यास**: छात्र से कहो: "एक वाक्य अपनी राय का लिखो, फिर उसी बात को पाठ के **दो उद्धरण/संदर्भ** देकर सिद्ध करो।" 3.', '**संकेत शब्द**: उसे **\'क्योंकि पाठ में लिखा है...\', \'इस पंक्ति से पता चलता है...\', \'लेखक ने यहाँ...', 'प्रयोग किया है\'** — इन वाक्यांशों को अनिवार्य करो। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह योग्यता है जिसमें छात्र किसी दिए गए गद्यांश या पद्यांश.',
          hint: 'अगर अटके तो **\'पाठ में जानकारी ढूंढना\' (Locating Information - c6_hin_cbse_01_012 का.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"पाठ से प्रमाण देना" (Giving Evidence) का अर्थ है पाठ की लंबी पंक्तियों को हुबहू.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह योग्यता है जिसमें छात्र किसी दिए गए गद्यांश या पद्यांश के आधार पर',
                  options: ['पाठ-आधारित लेखन कौशल वह योग्यता है जिसमें छात्र किसी दिए गए गद्यांश या पद्यांश के आधार पर', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक'],
                  hint: 'अगर अटके तो **\'पाठ में जानकारी ढूंढना\' (Locating Information - c6_hin_cbse_01_012 का.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"पाठ से प्रमाण देना" (Giving Evidence) का अर्थ है पाठ की लंबी पंक्तियों को हुबहू नकल कर देना.' }
          ],
            remediations: { 'giving-evidence-copying-long-quotes': { steps: ['**चरण 1 (Modeling - दिखाकर सिखाओ):** बोर्ड पर एक लंबा उद्धरण (Long Quote) और उसका **सही संस्करण (Selective Quote.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है किसी पाठ को पढ़ने (वाचन) या सुनने (श्रवण).',
          hint: 'यदि अटके तो \'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक\' (c6_hin_cbse_01_012) दोहराएँ — विशेषकर.',
          misconception: 'छात्र अक्सर समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ है पाठ से तथ्यात्मक प्रश्न पूछना** (जैसे: "नायक का नाम क्या था?".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है किसी पाठ को पढ़ने (वाचन) या सुनने (श्रवण) के बाद,',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है किसी पाठ को पढ़ने (वाचन) या सुनने (श्रवण) के बाद,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटके तो \'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक\' (c6_hin_cbse_01_012) दोहराएँ — विशेषकर \'आशय-सूचक\'.',
                  misconception: 'छात्र अक्सर समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ है पाठ से तथ्यात्मक प्रश्न पूछना** (जैसे: "नायक का नाम क्या था?", "कहानी कहाँ घटित हुई?")।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['१) छात्र को दो प्रश्न लिखने को कहो: एक तथ्यात्मक, एक चर्चा-बिंदु — उसी पाठ पर। २) दोनों की तुलना करो: "किस प्रश्न से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
