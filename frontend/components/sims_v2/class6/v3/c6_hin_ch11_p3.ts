import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch11_p3: SimDef = {
    id: 'v3_c6_hin_ch11_p3',
    title: 'पाठ 11 · Part 3/3',
    subtitle: 'यह नोड कक्षा 6 के स्तर पर पाठ के **विश्लेषण** (घटकों में तोड़ना: विषय, तर्क, साक्ष्य.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 11 · Part 3/3',
    chapters: ['c6_hin_ch11'],
    nodeIds: ['c6_hin_cbse_11_013', 'c6_hin_cbse_11_014', 'c6_hin_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'क्या तुमने कभी कोई पहेली (जिगसॉ पज़ल) जोड़ी है? पहले तुम टुकड़ों को रंग या किनारों के हिसाब से अलग करते हो.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक ऐसी प्रक्रिया है जिसमें हम किसी पाठ, घटना या विचार को केवल पढ़ते या सुनते नहीं, बल्कि उसके विभिन्न पहलुओं (कारण, परिणाम, साक्ष्य, दृष्टिकोण) को तोड़कर.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_11_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — आलोचनात्मक', 'पाठ 11 — लेखन', 'पाठ 11 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_11_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 3/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (कहानी, कविता, निबंध) को पढ़कर उससे जुड़े.', answer: '11 -', options: ['11 -', '11 - -'] },
            { id: 's2', label: '11 - -', prompt: 'Which idea is this? — "वाचन-श्रवण: चर्चा-बिंदु" refers to the skill of identifying key discussion points from.', answer: '11 - -', options: ['11 - -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 11 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक ऐसी प्रक्रिया है जिसमें हम किसी पाठ.',
          hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_11_012 (बोध-प्रश्न)** और **c6_hin_cbse_11_006.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ **आलोचना करना (Criticizing / नुक्स निकालना)** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक ऐसी प्रक्रिया है जिसमें हम किसी पाठ, घटना या',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक ऐसी प्रक्रिया है जिसमें हम किसी पाठ, घटना या', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_11_012 (बोध-प्रश्न)** और **c6_hin_cbse_11_006 (मुख्य विषय)**.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ **आलोचना करना (Criticizing / नुक्स निकालना)** या **विरोध करना** है। **गलत.' }
          ],
            remediations: { 'criticizing-critical-negative': { steps: ['**शब्दार्थ स्पष्टीकरण:** छात्र को बैठाकर समझाएं: "आलोचनात्मक चिंतन = जज की तरह व्यवहार करना। जज पहले **सबूत** देखता है.', '**मॉडलिंग (Modeling):** एक छोटा पैराग्राफ लें। शिक्षक **जोर से सोचते हुए (Think-Aloud)** दिखाएं: "मैं देख रहा हूँ लेखक.', 'इसका मतलब वह विरोधाभास दिखा रहा है...', 'इसलिए मेरा निष्कर्ष यह है..." छात्र देखें कि प्रक्रिया **नकारात्मक नहीं, तार्किक** है। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (कहानी, कविता, निबंध) को पढ़कर उससे.',
          hint: 'यदि अटके तो c6_hin_cbse_11_012 (बोध-प्रश्न) और c6_hin_cbse_11_013 (आलोचनात्मक चिंतन).',
          misconception: 'छात्र मानते हैं कि Evidence का अर्थ है पाठ से लंबा-सा उद्धरण चिपका देना — वे 2-3 पंक्तियाँ नकल कर लेते हैं और समझते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (कहानी, कविता, निबंध) को पढ़कर उससे जुड़े',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (कहानी, कविता, निबंध) को पढ़कर उससे जुड़े', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय'],
                  hint: 'यदि अटके तो c6_hin_cbse_11_012 (बोध-प्रश्न) और c6_hin_cbse_11_013 (आलोचनात्मक चिंतन) दोहराएँ.',
                  misconception: 'छात्र मानते हैं कि Evidence का अर्थ है पाठ से लंबा-सा उद्धरण चिपका देना — वे 2-3 पंक्तियाँ नकल कर लेते हैं और समझते हैं कि काम हो गया।.' }
          ],
            remediations: { 'evidence-2-3-evidence-point': { steps: ['छात्र से कहो: "अपना उत्तर पढ़ो और हर वाक्य के आगे P, E, Ex, L लिखो — कौन-सा चरण गायब है?" 2.', 'यदि Explanation गायब है, तो पूछो: "यह सबूत तुम्हारी बात कैसे साबित करता है?', 'यदि Link गायब है, तो पूछो: "यह बात कहानी के बड़े संदेश से कैसे जुड़ती है?" 4.', 'एक कमज़ोर उत्तर दूँ और साथ मिलकर उसे PEEL में ढालूँ — पहले Point छाँटें, फिर सबसे छोटा Evidence चुनें, फिर Explanation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_015', difficulty: 'standard',
          question: '"वाचन-श्रवण: चर्चा-बिंदु" refers to the skill of identifying key discussion.',
          hint: 'Review c6_hin_cbse_11_012 — practice sorting 10 questions from any story into \'तथ्यात्मक\'.',
          misconception: 'विद्यार्थी अक्सर मानते हैं कि चर्चा-बिंदु का अर्थ है "पाठ से प्रश्न बनाना" — जैसे "नायक का नाम क्या था?" या "कहानी कहाँ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"वाचन-श्रवण: चर्चा-बिंदु" refers to the skill of identifying key discussion points from a',
                  options: ['"वाचन-श्रवण: चर्चा-बिंदु" refers to the skill of identifying key discussion points from a', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय'],
                  hint: 'Review c6_hin_cbse_11_012 — practice sorting 10 questions from any story into \'तथ्यात्मक\' and.',
                  misconception: 'विद्यार्थी अक्सर मानते हैं कि चर्चा-बिंदु का अर्थ है "पाठ से प्रश्न बनाना" — जैसे "नायक का नाम क्या था?" या "कहानी कहाँ घटी?"। वे नहीं.' }
          ],
            remediations: { 'factual-questions': { steps: ['चरण 1: विद्यार्थी को एक परिचित कहानी (जैसे पंचतंत्र की कोई कथा) दें और पूछें: "इससे कौन-से तीन प्रश्न पूछे जा सकते.', '"शेर ने चूहे को क्यों छोड़ा?" → "क्या शेर ने सही किया?', 'क्या तुम छोड़ते?")। चरण 4: अगले दिन नए पाठ पर यही अभ्यास दोहराएँ — धीरे-धीरे वे \'क्या\' से \'क्यों/क्या होगा अगर\' की ओर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
