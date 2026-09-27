import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch03_p3: SimDef = {
    id: 'v3_c12_hin_v_ch03_p3',
    title: 'अतीत में दबे पाँव · Part 3/3',
    subtitle: 'Fifteen years of glory, five centuries of silence',
    classLevel: 12, subject: 'hin_v', topic: 'अतीत में दबे पाँव · Part 3/3',
    chapters: ['c12_hin_v_ch03'],
    nodeIds: ['c12_hin_v_cbse_03_013', 'c12_hin_v_cbse_03_014', 'c12_hin_v_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Historical travelogue reader', intro: 'A writer stands among red-sandstone ruins and rebuilds Akbar\'s abandoned capital in prose.', goal: 'Read the chapter as reconstruction — architectural evidence, urban planning and the paradox of a city built to last that didn\'t.' },
    discovery: {
        question: 'Fatehpur Sikri was built for eternity — then abandoned within fifteen years, its silence loud under the Buland Darwaza. What makes the ruin worth reconstructing?',
        options: ['The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone', 'Tourist value', 'Mughal nostalgia', 'Pretty sandstone'],
        answer: 'The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone',
        hook: 'Don\'t mistake it for a romantic travelogue — the writer records workers\' quarters, graded housing and cheap labour inside the glory. \'Prachin\' signals reconstruction: read the architecture as evidence for a lost urban order, caste-free craft zoning and planned water — not just ornament.',
    },
    teaching: [
        { title: 'अतीत में दबे पाँव — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के **तत्वों (कथानक, पात्र, भाषा, शिल्प, प्रतीक)** को अलग-अलग करके उनकी **पारस्परिक अंतर्क्रिया** और **गहन अर्थ-निर्माण प्रक्रिया** को समझना.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the ghost capital like an archaeologist: cluster the proper nouns into rulers, monuments and events, weigh the planned-city claim against the labour it cost, and measure ruins against the boast.',
        labels: ['अतीत में दबे पाँव'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a smart-city meeting in your town, a planner pitches clearing an old quarter for a parking complex: \'It\'s just decayed walls — real progress is glass and concrete, not ruins.\'',
            decisions: [{ prompt: 'How does the Rajgir chapter answer that pitch?', options: [
                { text: 'Ancient Rajgir\'s ruins document a city with planned streets, drains and housing without caste barriers — a \'society-governed\' civilisation; the author contrasts its civic wisdom with today\'s chaotic neglect precisely to show modernity excavated the history but didn\'t learn it.', outcome: 'The chapter\'s argument: the ruins aren\'t the opposite of progress but a rebuke to it — the \'decayed walls\' hold urban planning and social ethics the glass-and-concrete pitch hasn\'t matched.' },
                { text: 'Side with the planner — sentimentality about ruins can\'t run a modern city.', outcome: 'The chapter isn\'t nostalgia — it\'s a comparison of civic competence: the ancient city governed itself socially where the modern one only manages to excavate; dismissing the walls discards the evidence, not the sentiment.', reveals: 'ruins-equal-stagnation' },
                { text: 'Propose freezing the whole quarter as a museum — heritage must be untouched.', outcome: 'The author\'s point is that Rajgir was lived-in and socially governed, not embalmed; turning it into a sealed exhibit repeats the mistake of treating civic life as a monument instead of a model to inhabit.', reveals: 'heritage-means-freeze' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a travelogue as urban history — where a dead city\'s plan still argues what a city could be.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के **तत्वों (कथानक.',
          hint: 'यदि **प्रतीक-योजना** या **मनोवैज्ञानिक यथार्थवाद** समझ न आए, तो **c12_hin_v_cbse_03_009.',
          misconception: '**सबसे गहरी भ्रांति:** छात्र समझते हैं कि **\'आलोचनात्मक चिंतन\' = \'पाठ की कमियाँ निकालना\' या \'नकारात्मक टिप्पणी करना\'**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के **तत्वों (कथानक, पात्र, भाषा,',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के **तत्वों (कथानक, पात्र, भाषा,', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और'],
                  hint: 'यदि **प्रतीक-योजना** या **मनोवैज्ञानिक यथार्थवाद** समझ न आए, तो **c12_hin_v_cbse_03_009 (विरोधाभास.',
                  misconception: '**सबसे गहरी भ्रांति:** छात्र समझते हैं कि **\'आलोचनात्मक चिंतन\' = \'पाठ की कमियाँ निकालना\' या \'नकारात्मक टिप्पणी करना\'**। **वास्तविकता:**.' }
          ],
            remediations: { 'analytical-evaluation': { steps: ['**शब्द-स्पष्टीकरण:** छात्र से पूछें — *"\'आलोचना\' और \'निंदा\' में क्या अंतर है?"* फिर **साहित्यिक आलोचना की परिभाषा**.', '**मॉडल विश्लेषण दिखाएँ:** पाठ के **एक छोटे अंश** (5-6 पंक्तियाँ) लें और **चरण-दर-चरण** दिखाएँ: (क) कौन-सा उपकरण.', '(घ) वैकल्पिक व्याख्या की गुंजाइश?', '**निर्देशित अभ्यास:** छात्र को **एक प्रतीक/बिंब** दें (जैसे \'धूल\') और कहें — *"इसके तीन स्तरीय अर्थ लिखो: शाब्दिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित (Text-based Writing Skill) refers to the ability.',
          hint: 'If stuck on finding evidence, review **c12_hin_v_cbse_03_002** (कथानक और आख्यान-संरचना).',
          misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर का अर्थ है पाठ से लंबे-लंबे उद्धरण (quotes) कॉपी करना।" **वास्तविकता:** CBSE.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित (Text-based Writing Skill) refers to the ability to construct',
                  options: ['लेखन कौशल: पाठ-आधारित (Text-based Writing Skill) refers to the ability to construct', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और'],
                  hint: 'If stuck on finding evidence, review **c12_hin_v_cbse_03_002** (कथानक और आख्यान-संरचना) for.',
                  misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर का अर्थ है पाठ से लंबे-लंबे उद्धरण (quotes) कॉपी करना।" **वास्तविकता:** CBSE हिंदी कोर में 60-80.' }
          ],
            remediations: { 'quotes-cbse-60-80-2': { steps: ['**निदान:** छात्र से 50 शब्दों में एक उत्तर लिखवाएं। यदि उसमें >15 शब्द सीधे पाठ से उठे हैं → \'उद्धरण-निर्भरता\' (Quote.', '**अभ्यास:** उसी उत्तर को \'एम्बेडिंग\' (embedding) तकनीक से पुनर्लिखवाएं: पाठ के शब्दों को अपने वाक्य के अंदर फिट करें.', '**पुनः निदान:** अगले दिन एक नए विषय पर उत्तर लिखवाएं और **लाल पेन से** हर उद्धृत शब्द गिनें। लक्ष्य: **प्रति उत्तर.', '**संदर्भ:** यदि कठिनाई बने, तो **c11_hin_v_cbse_03_014** (कक्षा 11 का समान लेखन कौशल नोड) पर वापस जाएं और वहाँ दिए गए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक सहयोगी भाषा-कौशल गतिविधि है जिसमें शिक्षक/छात्र पाठ.',
          hint: 'अगर "प्रोसोडी" (prosody) या "सक्रिय श्रवण" अस्पष्ट लगे तो `c11_hin_v_cbse_03_015` के.',
          misconception: '**भ्रांति**: "वाचन-श्रवण-चर्चा केवल \'पाठ पढ़कर सुनना और सवाल पूछना\' है — कोई भी कर सकता है, इसमें कोई कौशल नहीं।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक सहयोगी भाषा-कौशल गतिविधि है जिसमें शिक्षक/छात्र पाठ का सस्वर',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक सहयोगी भाषा-कौशल गतिविधि है जिसमें शिक्षक/छात्र पाठ का सस्वर', '\'अतीत में दबे पाँव\' कुबेरनाथ राय द्वारा लिखित एक **स्मृति-चित्रात्मक निबंध** (memoir', 'कथानक (plot) किसी आख्यान की घटनाओं का क्रमबद्ध और कारण-परिणाम से जुड़ा विन्यास है, जबकि', 'पाठ्य-परिवेश (Setting/Context) कथा के घटित होने का भौगोलिक, ऐतिहासिक, सामाजिक और'],
                  hint: 'अगर "प्रोसोडी" (prosody) या "सक्रिय श्रवण" अस्पष्ट लगे तो `c11_hin_v_cbse_03_015` के "वाचन मानदंड".',
                  misconception: '**भ्रांति**: "वाचन-श्रवण-चर्चा केवल \'पाठ पढ़कर सुनना और सवाल पूछना\' है — कोई भी कर सकता है, इसमें कोई कौशल नहीं।" **वास्तविकता**: यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र को NCERT "हिंदी वितान" भाग-2 की **भूमिका** में दिए "शिक्षण-प्रक्रिया" अनुच्छेद पढ़वाओ — वहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
