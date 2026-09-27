import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_al_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_al_ch01_p3: SimDef = {
    id: 'v3_c11_hin_al_ch01_p3',
    title: 'हुसैन की कहानी अपनी ज़बानी · Part 3/3',
    subtitle: 'यह नोड पाठ के आलोचनात्मक विश्लेषण और व्याख्या पर केंद्रित है—जैसे लेखक के उद्देश्य, भाषा.',
    classLevel: 11, subject: 'hin_al', topic: 'हुसैन की कहानी अपनी ज़बानी · Part 3/3',
    chapters: ['c11_hin_al_ch01'],
    nodeIds: ['c11_hin_al_cbse_01_013', 'c11_hin_al_cbse_01_014', 'c11_hin_al_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना कीजिए आप एक समाचार लेख पढ़ रहे हैं जिसमें कहा गया है कि "कृषि सब्सिडी हटाने से किसानों की आय.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'हुसैन की कहानी अपनी ज़बानी — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें पाठ का विश्लेषण करके लेखक के तर्क, पूर्वाग्रह, संदर्भ और भाषा के उपयोग का मूल्यांकन किया जाता है, ताकि अर्थ की कई परतों को समझा जा सके।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_al_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['हुसैन की कहानी अपनी'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_al_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You finished हुसैन की कहानी अपनी ज़बानी — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें पाठ का विश्लेषण करके लेखक के तर्क.',
          hint: 'यदि छात्र पाठ के स्पष्ट अर्थ से आगे नहीं बढ़ पा रहा है, तो उसे पात्र-चित्रण (नोड 004) और.',
          misconception: 'छात्र अक्सर मानते हैं कि आलोचनात्मक चिंतन का मतलब है लेखक के खिलाफ नकारात्मक टिप्पणी करना या उसकी हर बात को खारिज.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें पाठ का विश्लेषण करके लेखक के तर्क, पूर्वाग्रह,',
                  options: ['आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें पाठ का विश्लेषण करके लेखक के तर्क, पूर्वाग्रह,', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक'],
                  hint: 'यदि छात्र पाठ के स्पष्ट अर्थ से आगे नहीं बढ़ पा रहा है, तो उसे पात्र-चित्रण (नोड 004) और साहित्यिक.',
                  misconception: 'छात्र अक्सर मानते हैं कि आलोचनात्मक चिंतन का मतलब है लेखक के खिलाफ नकारात्मक टिप्पणी करना या उसकी हर बात को खारिज करना—जैसे कहानी में.' }
          ],
            remediations: { 'criticism': { steps: ['पहले छात्र से पूछें कि "क्या आप इस पंक्ति से सहमत हैं?" फिर निर्देश दें: "अब बताइए कि लेखक इस विचार तक क्यों पहुँचा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह विधा है जिसमें छात्र पाठ्य.',
          hint: 'यदि अटके: **c11_hin_al_cbse_01_006 (मुख्य विषय और संदेश)** और **c11_hin_al_cbse_01_008.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पाठ-आधारित लेखन\' में **पाठ के अधिकतम अंश उद्धृत (Maximum Quoting)** करना अच्छा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह विधा है जिसमें छात्र पाठ्य सामग्री',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह विधा है जिसमें छात्र पाठ्य सामग्री', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक'],
                  hint: 'यदि अटके: **c11_hin_al_cbse_01_006 (मुख्य विषय और संदेश)** और **c11_hin_al_cbse_01_008 (साहित्यिक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पाठ-आधारित लेखन\' में **पाठ के अधिकतम अंश उद्धृत (Maximum Quoting)** करना अच्छा अंक दिलाता है। वे.' }
          ],
            remediations: { 'maximum-quoting-collage': { steps: ['**लक्षित सुधार (Targeted Remediation):** 1.', '**\'एक उद्धरण, तीन वाक्य\' नियम (One Quote, Three Sentences Rule):** छात्र को अभ्यास कराएँ कि हर उद्धरण के बाद **कम से कम.', '(ख) यह प्रश्न के की-वर्ड से कैसे जुड़ता है?', '(ग) इसका गहरा निहितार्थ (Implication) क्या है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_015', difficulty: 'standard',
          question: 'वाचन-श्रवण (Reading-Listening) और चर्चा-बिंदु (Discussion Points) एक सहयोगी.',
          hint: 'यदि अटका हुआ महसूस करें तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 008 (साहित्यिक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है **पाठ पर अपनी \'राय\' (Opinion) देना** — जैसे "मुझे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण (Reading-Listening) और चर्चा-बिंदु (Discussion Points) एक सहयोगी शैक्षणिक',
                  options: ['वाचन-श्रवण (Reading-Listening) और चर्चा-बिंदु (Discussion Points) एक सहयोगी शैक्षणिक', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक'],
                  hint: 'यदि अटका हुआ महसूस करें तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 008 (साहित्यिक युक्तियाँ)**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है **पाठ पर अपनी \'राय\' (Opinion) देना** — जैसे "मुझे हुसैन पसंद हैं क्योंकि.' }
          ],
            remediations: { 'opinion-interpretation-personal-preference-evide': { steps: ['**मॉडलिंग (Modeling):** शिक्षक एक कमजोर प्रविष्टि ("मुझे कहानी अच्छी लगी") और एक सशक्त प्रविष्टि ("पंक्ति १२ में \'कूची.', '**साक्ष्य-टैगिंग अभ्यास (Evidence-Tagging Drill):** हर कथन के आगे **[पृष्ठ/पंक्ति]** लिखना अनिवार्य करें। बिना टैग के.', '**वाक्य-आरंभक (Sentence Starters) दें:** "पाठ में ______ लिखा है, इसलिए मुझे लगता है ______ क्योंकि ______।" — यह.', '**सहकर्मी प्रतिपुष्टि (Peer Feedback):** छात्र एक-दूसरे की प्रविष्टि पर लिखें: "तुम्हारा साक्ष्य कहाँ है?" — यह आदत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
