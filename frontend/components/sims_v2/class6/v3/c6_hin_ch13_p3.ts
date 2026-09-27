import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch13_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch13_p3: SimDef = {
    id: 'v3_c6_hin_ch13_p3',
    title: 'पाठ 13 · Part 3/3',
    subtitle: 'यह नोड **केवल** पाठ 13 के प्रसंग में विश्लेषण-व्याख्या की प्रक्रिया सिखाता है — कथानक.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 13 · Part 3/3',
    chapters: ['c6_hin_ch13'],
    nodeIds: ['c6_hin_cbse_13_013', 'c6_hin_cbse_13_014', 'c6_hin_cbse_13_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'मान लो तुमने दादी से एक कहानी सुनी — पहले तुम बस सुनते हो, फिर मन में सवाल उठते हैं: "दादी ने यह बात **ऐसे**.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 13 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ को **तार्किक ढंग से तोड़कर** (विश्लेषण/Analysis) उसके भागों — विषय, पात्र, भाषा, युक्तियाँ — को समझना, फिर उन भागों का **अर्थ निकालकर**.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_13_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 13 — आलोचनात्मक', 'पाठ 13 — लेखन', 'पाठ 13 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_13_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 13 · Part 3/3', spots: [
            { id: 's1', label: '13 -', prompt: 'Which idea is this? — लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (गद्य/पद्य) को पढ़कर, उससे संबंधित प्रश्नों के.', answer: '13 -', options: ['13 -', '13 - -'] },
            { id: 's2', label: '13 - -', prompt: 'Which idea is this? — \'वाचन-श्रवण: चर्चा-बिंदु\' पाठ को पढ़ने (वाचन) और सुनने (श्रवण) के बाद, पाठ के मुख्य विषय.', answer: '13 - -', options: ['13 - -', '13 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_13_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 13 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ को **तार्किक ढंग से तोड़कर**.',
          hint: 'अगर अटका हुआ महसूस हो, तो **c6_hin_cbse_13_008 (बिंब/रूपक)** और **c6_hin_cbse_13_009.',
          misconception: 'छात्र समझते हैं कि **आलोचनात्मक चिंतन = "कमियाँ निकालना" या "विरोध करना"**। उदाहरण: पाठ 13 में जब नायक झूठ बोलता है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ को **तार्किक ढंग से तोड़कर**',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ को **तार्किक ढंग से तोड़कर**', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है'],
                  hint: 'अगर अटका हुआ महसूस हो, तो **c6_hin_cbse_13_008 (बिंब/रूपक)** और **c6_hin_cbse_13_009.',
                  misconception: 'छात्र समझते हैं कि **आलोचनात्मक चिंतन = "कमियाँ निकालना" या "विरोध करना"**। उदाहरण: पाठ 13 में जब नायक झूठ बोलता है, छात्र लिखते हैं "लेखक.' }
          ],
            remediations: { '13': { steps: ['**चरण 1**: छात्र को एक **परिचित विज्ञापन** (जैसे साबुन का विज्ञापन) दिखाओ और पूछो: "यह तुम्हें क्या **बेचना** चाहता है?', 'किन शब्दों/चित्रों से?" — यह **विश्लेषण** का अभ्यास है बिना नैतिक फैसले के। **चरण 2**: फिर उसी विज्ञापन के लिए पूछो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (गद्य/पद्य) को पढ़कर, उससे संबंधित.',
          hint: 'यदि फँसें: c6_hin_cbse_13_012 के \'आशय-सूचक प्रश्न\' दोहराएँ — वहाँ पाठ से उत्तर ढूंढने का.',
          misconception: 'विद्यार्थी समझते हैं कि **\'पाठ से प्रमाण देना\' का अर्थ है पूरी पंक्ति या पैराग्राफ नकल कर देना**। वे लिखते हैं: "पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (गद्य/पद्य) को पढ़कर, उससे संबंधित प्रश्नों के',
                  options: ['लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (गद्य/पद्य) को पढ़कर, उससे संबंधित प्रश्नों के', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है'],
                  hint: 'यदि फँसें: c6_hin_cbse_13_012 के \'आशय-सूचक प्रश्न\' दोहराएँ — वहाँ पाठ से उत्तर ढूंढने का अभ्यास है.',
                  misconception: 'विद्यार्थी समझते हैं कि **\'पाठ से प्रमाण देना\' का अर्थ है पूरी पंक्ति या पैराग्राफ नकल कर देना**। वे लिखते हैं: "पाठ में लिखा है — [लंबा.' }
          ],
            remediations: { '1': { steps: ['विद्यार्थी को एक छोटा अंश (3-4 वाक्य) दें और कहें: "इसमें से **केवल 5 शब्द** चुनो जो प्रश्न का उत्तर देते हों।" 2.', 'फिर पूछें: "ये 5 शब्द क्या साबित करते हैं?', 'अपने शब्दों में एक वाक्य में बताओ।" 3.', 'अब कहें: "पूरा उत्तर लिखो: Point → तुम्हारे 5 शब्द → तुम्हारा वाक्य → विषय से जुड़ाव।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' पाठ को पढ़ने (वाचन) और सुनने (श्रवण) के बाद, पाठ के.',
          hint: 'अगर अटके तो **पाठ 13 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक (c6_hin_cbse_13_012)** दोहराओ.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि चर्चा-बिंदु में **शिक्षक सही जवाब बताएँगे** और उन्हें बस याद करना है। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' पाठ को पढ़ने (वाचन) और सुनने (श्रवण) के बाद, पाठ के मुख्य विषय,',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' पाठ को पढ़ने (वाचन) और सुनने (श्रवण) के बाद, पाठ के मुख्य विषय,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है'],
                  hint: 'अगर अटके तो **पाठ 13 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक (c6_hin_cbse_13_012)** दोहराओ — तथ्य और.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि चर्चा-बिंदु में **शिक्षक सही जवाब बताएँगे** और उन्हें बस याद करना है। वे **\'चर्चा\' को.' }
          ],
            remediations: { 'factual-open-ended-13': { steps: ['**सुरक्षित माहौल बनाओ:** कक्षा में घोषणा करो — "आज कोई गलत जवाब नहीं, केवल **विचार** हैं। जो भी बोलेगा, उसका स्वागत.', '**वाक्य-प्रारंभ (sentence starters) दो:** बोर्ड पर लिखो — "मेरा मानना है...', 'क्योंकि...", "मैं सहमत हूँ क्योंकि...", "मैं असहमत हूँ क्योंकि पाठ में लिखा है..." — विद्यार्थियों को इन्हीं से शुरू.', '**\'क्यों\' का अभ्यास कराओ:** हर उत्तर के बाद तुम **जरूर** पूछो — "क्यों?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
