import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch01_p3: SimDef = {
    id: 'v3_c8_hin_ch01_p3',
    title: 'पाठ 1 · Part 3/3',
    subtitle: 'यह नोड पाठ 1 के संदर्भ में विश्लेषण और व्याख्या की **प्रक्रिया** और **लेखन कौशल** पर.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 1 · Part 3/3',
    chapters: ['c8_hin_ch01'],
    nodeIds: ['c8_hin_cbse_01_013', 'c8_hin_cbse_01_014', 'c8_hin_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करो तुमने एक नई फिल्म देखी और दोस्त पूछता है "कैसी लगी?" — तुम सिर्फ "अच्छी" नहीं कहते, बल्कि बताते.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें पाठ के तत्वों (कथानक, पात्र, भाषा, युक्तियाँ) को अलग-अलग जाँचा जाता है (विश्लेषण) और फिर उनके परस्पर संबंध तथा गहरे निहितार्थ को समझकर स्वतंत्र निर्णय/व्याख्या.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_01_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        labels: ['पाठ 1 — आलोचनात्मक', 'पाठ 1 — लेखन', 'पाठ 1 — वाचन-श्रवण'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_01_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 3/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र किसी दिए गए पाठ (गद्य या पद्य) से.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक संरचित कक्षा गतिविधि है जहाँ छात्र पाठ को पढ़ने/सुनने के बाद.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 1 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें पाठ के तत्वों (कथानक, पात्र, भाषा.',
          hint: 'यदि फँसें तो **c8_hin_cbse_01_006 (मुख्य विषय और संदेश)** और **c8_hin_cbse_01_009.',
          misconception: 'छात्र मानते हैं कि **\'व्याख्या\' का अर्थ \'अपनी राय लिखना\' है** — वे पाठगत प्रमाण (quotes, प्रसंग, भाषाई युक्तियाँ) दिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें पाठ के तत्वों (कथानक, पात्र, भाषा, युक्तियाँ) को',
                  options: ['आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें पाठ के तत्वों (कथानक, पात्र, भाषा, युक्तियाँ) को', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि फँसें तो **c8_hin_cbse_01_006 (मुख्य विषय और संदेश)** और **c8_hin_cbse_01_009 (विरोधाभास और.',
                  misconception: 'छात्र मानते हैं कि **\'व्याख्या\' का अर्थ \'अपनी राय लिखना\' है** — वे पाठगत प्रमाण (quotes, प्रसंग, भाषाई युक्तियाँ) दिए बिना सामान्यीकरण करते.' }
          ],
            remediations: { 'quotes': { steps: ['**मॉडलिंग:** एक कमजोर उत्तर ("लेखक दुख दिखाता है") और एक सशक्त उत्तर ("पृष्ठ 3 पर \'सूखे पत्तों की सरसराहट\' बिंब के.', '**संरचित अभ्यास:** छात्र को **PEEL शीट** दें: Point (दावा), Evidence (पाठ संदर्भ), Explanation (कैसे प्रमाण दावे को.', '**सहकर्मी समीक्षा:** दो छात्रों की व्याख्याएँ बिना नाम दिखाएँ; कक्षा से पूछें: "किसमें प्रमाण बेहतर है?', 'क्यों?" — इससे \'राय\' और \'व्याख्या\' का भेद अंतर्निहित होता है।'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र किसी दिए गए पाठ (गद्य या पद्य).',
          hint: 'यदि अटके, तो **c7_hin_cbse_01_014 (कक्षा 7 लेखन कौशल)** के \'PEEL विधि परिचय\' और \'कमजोर.',
          misconception: '**"उद्धरण (Quote) देना ही प्रमाण (Evidence) देना है, और उद्धरण के बाद कुछ न लिखना ही व्याख्या (Explanation) है।"**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र किसी दिए गए पाठ (गद्य या पद्य) से',
                  options: ['पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र किसी दिए गए पाठ (गद्य या पद्य) से', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटके, तो **c7_hin_cbse_01_014 (कक्षा 7 लेखन कौशल)** के \'PEEL विधि परिचय\' और \'कमजोर vs मजबूत.',
                  misconception: '**"उद्धरण (Quote) देना ही प्रमाण (Evidence) देना है, और उद्धरण के बाद कुछ न लिखना ही व्याख्या (Explanation) है।"** **क्यों होती है:** छात्र.' }
          ],
            remediations: { 'quote-evidence': { steps: ['**चरण 1 (अंतर स्पष्ट करें):** छात्र को दो वाक्य दें — एक केवल उद्धरण, एक उद्धरण+व्याख्या। पूछें: "कौन-सा वाक्य *क्यों*.', '**चरण 2 (रंगीन कोडिंग):** उसके लिखे उत्तर में **Point (लाल), Evidence (नीला), Explanation (हरा), Link (पीला)** से.', '**चरण 3 (मौखिक अभ्यास):** रोज एक छोटा पाठांश दें, मौखिक PEEL करवाएँ — लिखने का दबाव हटाकर सोचने पर जोर दें। 4.', '**चरण 4 (मॉडल उत्तर):** कमजोर और मजबूत उत्तर साथ रखकर तुलना करवाएँ, छात्र को खुद अंतर पहचानने दें।'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित कक्षा गतिविधि है जहाँ छात्र पाठ को.',
          hint: 'यदि अटका लगे तो **c8_hin_cbse_01_013 (आलोचनात्मक चिंतन)** और **c8_hin_cbse_01_012.',
          misconception: 'छात्र (और कभी-कभी शिक्षक) मानते हैं कि **चर्चा-बिंदु का अर्थ है "पाठ के प्रश्नों के उत्तर खोजना"**। वे चर्चा को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित कक्षा गतिविधि है जहाँ छात्र पाठ को पढ़ने/सुनने के बाद',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक संरचित कक्षा गतिविधि है जहाँ छात्र पाठ को पढ़ने/सुनने के बाद', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटका लगे तो **c8_hin_cbse_01_013 (आलोचनात्मक चिंतन)** और **c8_hin_cbse_01_012 (बोध-प्रश्न)**.',
                  misconception: 'छात्र (और कभी-कभी शिक्षक) मानते हैं कि **चर्चा-बिंदु का अर्थ है "पाठ के प्रश्नों के उत्तर खोजना"**। वे चर्चा को **तथ्य-खोज.' }
          ],
            remediations: { 'fact-retrieval': { steps: ['**पहचानो:** छात्र से पूछो — "तुम्हें लगता है चर्चा में \'सही उत्तर\' देना है?" यदि हाँ, तो गलतफहमी पकड़ी गई। 2.', '**दिखाओ:** दो उदाहरण रखो — (क) बोध-प्रश्न: "नायक का नाम?" (ख) चर्चा-बिंदु: "नायक का निर्णय सही था या गलत?', 'तुम क्या करते?" — अंतर स्पष्ट करो। 3.', '**अभ्यास कराओ:** छात्र को पाठ का एक अंश देकर **तीन चर्चा-बिंदु** लिखने को कहो जो "क्यों/कैसे/क्या होगा यदि" से शुरू.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
