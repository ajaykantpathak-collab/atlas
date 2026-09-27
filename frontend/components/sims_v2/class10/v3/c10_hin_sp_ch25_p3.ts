import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch25_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch25_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch25_p3',
    title: 'तताँरा-वामीरो कथा · Part 3/3',
    subtitle: 'यह नोड \'तताँरा-वामीरो कथा\' के **गहन विश्लेषण** (थीम की बहु-स्तरीयता, कथानक-शिल्प का.',
    classLevel: 10, subject: 'hin_sp', topic: 'तताँरा-वामीरो कथा · Part 3/3',
    chapters: ['c10_hin_sp_ch25'],
    nodeIds: ['c10_hin_sp_cbse_25_013', 'c10_hin_sp_cbse_25_014', 'c10_hin_sp_cbse_25_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना करें कि परीक्षा में पूछा गया: *"तताँरा-वामीरो कथा में \'जंगल\' केवल पृष्ठभूमि नहीं, एक \'सक्रिय पात्र\' है.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'तताँरा-वामीरो कथा — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के सतही अर्थ से आगे जाकर उसके अंतर्निहित अभिप्राय, संरचनागत युक्तियों, सामाजिक-सांस्कृतिक संदर्भों तथा लेखकीय दृष्टिकोण की तार्किक जाँच-परख और व्याख्या करने.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_25_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तताँरा-वामीरो कथा — आलोचनात्मक', 'तताँरा-वामीरो कथा — लेखन', 'तताँरा-वामीरो कथा — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_sp_cbse_25_014', title: 'Identify each idea',
          dissect: { specimen: 'तताँरा-वामीरो कथा · Part 3/3', spots: [
            { id: 's1', label: '- -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है — दिए गए साहित्यिक पाठ (गद्य/पद्य) से प्रमाण.', answer: '- -', options: ['- -', '- - -'] },
            { id: 's2', label: '- - -', prompt: 'Which idea is this? — \'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी भाषा-कौशल गतिविधि है जिसमें **वाचक (पाठक) पाठ को भाव.', answer: '- - -', options: ['- - -', '- -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_25_015', title: 'You made it',
          caseStudy: { intro: 'You finished तताँरा-वामीरो कथा — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के सतही अर्थ से आगे जाकर उसके.',
          hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_25_006 (मुख्य विषय)** और **c10_hin_sp_cbse_25_008.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है **\'कमियाँ निकालना\' (Fault-finding)** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के सतही अर्थ से आगे जाकर उसके अंतर्निहित',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के सतही अर्थ से आगे जाकर उसके अंतर्निहित', '**"तताँरा-वामीरो कथा"** गुजरात के भील समुदाय में प्रचलित एक लोककथा है जिसे प्रसिद्ध', '**कथानक (Plot)** कथा में घटित घटनाओं का कालानुक्रमिक (chronological) क्रम है जो', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_25_006 (मुख्य विषय)** और **c10_hin_sp_cbse_25_008 (बिंब/प्रतीक)**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है **\'कमियाँ निकालना\' (Fault-finding)** या **\'नकारात्मक टिप्पणी करना\'**।.' }
          ],
            remediations: { 'fault-finding-critique-objective-analysis': { steps: ['**भेद स्पष्ट करें:** छात्र से पूछें — "क्या तुमने कभी कोई फिल्म देखी जहाँ नायक मर जाए पर फिल्म \'विजय\' की लगे?', '(उदहारण: *रंग दे बसंती*, *उरी*)। उस \'विजय\' को शब्द दो।" 2.', '**मिनी-व्यायाम दें:** पाठ के एक छोटे अंश (4-5 पंक्तियाँ) दें और कहें: "इसमें लेखक ने *क्या* किया?', '— तीन वाक्यों में लिखो।" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है — दिए गए साहित्यिक पाठ (गद्य/पद्य) से प्रमाण.',
          hint: 'यदि प्रमाण नहीं सूझ रहे → c10_hin_sp_cbse_25_002 (कथानक) और c10_hin_sp_cbse_25_004.',
          misconception: '**विशिष्ट भ्रांति:** "अच्छा उत्तर लिखने का अर्थ है पाठ की **अधिक से अधिक बातें याद करके उगल देना** (Content Dumping)।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है', '**"तताँरा-वामीरो कथा"** गुजरात के भील समुदाय में प्रचलित एक लोककथा है जिसे प्रसिद्ध', '**कथानक (Plot)** कथा में घटित घटनाओं का कालानुक्रमिक (chronological) क्रम है जो', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि प्रमाण नहीं सूझ रहे → c10_hin_sp_cbse_25_002 (कथानक) और c10_hin_sp_cbse_25_004 (पात्र-चित्रण).',
                  misconception: '**विशिष्ट भ्रांति:** "अच्छा उत्तर लिखने का अर्थ है पाठ की **अधिक से अधिक बातें याद करके उगल देना** (Content Dumping)।" **वास्तविकता:**.' }
          ],
            remediations: { 'content-dumping-5-3-4': { steps: ['**निदान:** छात्र से कहें — "अगले 3 प्रश्नों के उत्तर **केवल बिंदुवार (Bullet Points)** में लिखो, पूरा वाक्य मत बनाओ।".', '**मॉडलिंग:** उसी प्रश्न का **कमजोर उत्तर (केवल सारांश)** और **बलवान उत्तर (PEEL)** साथ रखकर दिखाएँ; अंतर चिह्नित कराएँ.', '**अभ्यास:** रोज एक 3-अंक का प्रश्न दें; टाइमर लगाएँ — 2 मिनट योजना (PEEL रूपरेखा), 5 मिनट लेखन, 1 मिनट संपादन.', '**फीडबैक:** केवल अंक न दें; लिखें — "Point 2 में Evidence पंक्ति संख्या सहित जोड़ें", "Link में थीसिस से जुड़ें"। **मूल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी भाषा-कौशल गतिविधि है जिसमें **वाचक (पाठक).',
          hint: 'यदि अटके: c10_hin_sp_cbse_25_002 (कथानक) और c10_hin_sp_cbse_25_008 (बिंब/रूपक) दोहराएँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'वाचन-श्रवण\' का अभ्यास केवल \'जोर से पढ़ना और सुनना\' है** — वे **भाव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी भाषा-कौशल गतिविधि है जिसमें **वाचक (पाठक) पाठ को भाव,',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी भाषा-कौशल गतिविधि है जिसमें **वाचक (पाठक) पाठ को भाव,', '**"तताँरा-वामीरो कथा"** गुजरात के भील समुदाय में प्रचलित एक लोककथा है जिसे प्रसिद्ध', '**कथानक (Plot)** कथा में घटित घटनाओं का कालानुक्रमिक (chronological) क्रम है जो', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके: c10_hin_sp_cbse_25_002 (कथानक) और c10_hin_sp_cbse_25_008 (बिंब/रूपक) दोहराएँ — विशेषकर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'वाचन-श्रवण\' का अभ्यास केवल \'जोर से पढ़ना और सुनना\' है** — वे **भाव (expression), लय (rhythm).' }
          ],
            remediations: { 'expression': { steps: ['**चरणबद्ध उपचार (3-दिनी योजना):** 1.', '**दिन 1 — केवल श्रवण (Listening only):** शिक्षक पाठ का एक प्रसंग **तीन बार** पढ़ें — (क) सपाट/तेज, (ख) भावपूर्ण/धीमा.', '**दिन 2 — वाचक बनो (Be the reader):** प्रत्येक छात्र 2 पंक्तियाँ पढ़े — शिक्षक **केवल एक चीज़** सुधारे: "यहाँ रुको.', '**दिन 3 — जोड़ी अभ्यास (Paired practice):** जोड़ियों में — एक तताँरा, एक वामीरो। तताँरा 4 पंक्तियाँ पढ़े; वामीरो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
