import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch07_p3: SimDef = {
    id: 'v3_c9_hin_ga_ch07_p3',
    title: 'पाठ 7 · Part 3/3',
    subtitle: 'यह नोड कक्षा 9 के स्तर पर **पाठ-आधारित विश्लेषण और व्याख्या** पर केंद्रित है: विषय-वस्तु.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 7 · Part 3/3',
    chapters: ['c9_hin_ga_ch07'],
    nodeIds: ['c9_hin_ga_cbse_07_013', 'c9_hin_ga_cbse_07_014', 'c9_hin_ga_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'मेरे बचपन के दिन\' का विश्लेषण — महादेवी वर्मा का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'मेरे बचपन के दिन\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_07_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — आलोचनात्मक', 'पाठ 7 — लेखन', 'पाठ 7 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_07_015', title: 'पाठ 7 — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'मेरे बचपन के दिन\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'पाठ्य-आधारित चर्चा में \'साक्ष्य-आधारित बिंदु\' (evidence-based point) का क्या अर्थ है? एक वाक्य में समझाइए।', options: [
                { text: 'साक्ष्य-आधारित बिंदु वह कथन है जो पाठ के किसी विशिष्ट अंश (पंक्ति, शब्द, प्रसंग) का हवाला', outcome: 'साक्ष्य-आधारित बिंदु वह कथन है जो पाठ के किसी विशिष्ट अंश (पंक्ति, शब्द, प्रसंग) का हवाला देकर अपनी.' },
                { text: 'good discussion', outcome: 'Not quite — Students believe a "good discussion" means speaking the most, using flowery language, or impressing.', reveals: 'a-good-discussion-means-speaking' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 7 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_013', difficulty: 'standard',
          question: '\'मेरे बचपन के दिन\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि अटके: **c9_hin_ga_cbse_07_008 (बिंब/रूपक) और c9_hin_ga_cbse_07_009.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आलोचनात्मक चिंतन\' का अर्थ \'नकारात्मक आलोचना\' (Fault-finding) या \'अपनी निजी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरे बचपन के दिन\' का आलोचनात्मक चिंतन',
                  options: ['\'मेरे बचपन के दिन\' का आलोचनात्मक चिंतन', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'मेरे बचपन के दिन\' का कथानक', '\'मेरे बचपन के दिन\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **c9_hin_ga_cbse_07_008 (बिंब/रूपक) और c9_hin_ga_cbse_07_009 (विरोधाभास/प्रतीक)** को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आलोचनात्मक चिंतन\' का अर्थ \'नकारात्मक आलोचना\' (Fault-finding) या \'अपनी निजी राय देना\' (Subjective.' }
          ],
            remediations: { 'fault-finding-subjective-opinion-critical': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**शब्दावली स्पष्टीकरण (5 मिनट):** बोर्ड पर लिखें: **Critical (दैनिक जीवन) = दोष निकालना** vs **Critical.', '**मॉडलिंग (10 मिनट):** एक छोटे गद्यांश पर **दो उत्तर** दिखाएँ: (अ) निजी राय: "यह बुरा लगा।" (ब) आलोचनात्मक विश्लेषण.', '**अभ्यास (15 मिनट):** पाठ 7 की एक पंक्ति दें। छात्रों से कहें: **"\'मुझे यह पसंद है/नहीं\' लिखे बिना बताओ कि लेखक ने यह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_014', difficulty: 'standard',
          question: '\'मेरे बचपन के दिन\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि फँसें तो **c9_hin_ga_cbse_07_006 (मुख्य विषय और संदेश)** और **c9_hin_ga_cbse_07_013.',
          misconception: '**विशिष्ट भ्रांति:** *"अच्छे अंकों के लिए उत्तर लंबा लिखना ज़रूरी है, भले ही वही बात घुमा-फिराकर कहनी पड़े।"* **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरे बचपन के दिन\' पर पाठ-आधारित लेखन',
                  options: ['\'मेरे बचपन के दिन\' पर पाठ-आधारित लेखन', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'मेरे बचपन के दिन\' का कथानक', '\'मेरे बचपन के दिन\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **c9_hin_ga_cbse_07_006 (मुख्य विषय और संदेश)** और **c9_hin_ga_cbse_07_013 (आलोचनात्मक.',
                  misconception: '**विशिष्ट भ्रांति:** *"अच्छे अंकों के लिए उत्तर लंबा लिखना ज़रूरी है, भले ही वही बात घुमा-फिराकर कहनी पड़े।"* **गलत तर्क का स्रोत:** छात्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — निदान:** छात्र से कहें: *"अपना उत्तर पढ़ो और हर वाक्य के आगे लिखो: यह P है, E है, या L है।"* यदि 50% से अधिक.', 'क्या L प्रश्न के \'की-वर्ड\' को छूता है?', 'नहीं तो दोहराएँ। **चरण 4 — स्थानांतरण:** अगले दिन नया प्रश्न दें, समय घटाकर 2 मिनट करें। जब वह 3 बार लगातार सही करे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_015', difficulty: 'standard',
          question: '\'मेरे बचपन के दिन\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श.',
          hint: 'Review "पाठ्य-आधारित साक्ष्य चयन" (c9_hin_ga_cbse_07_012) and practice the "Quote →.',
          misconception: 'Students believe a "good discussion" means speaking the most, using flowery language, or impressing the teacher with.',
          parts: [
                { id: 'a', prompt: 'आपके सहपाठी कहते हैं: "पाठ 7 का नायक स्वार्थी है क्योंकि वह अपने परिवार को छोड़ देता है।" आप इस कथन से असहमत हैं। पाठ के आधार पर **एक** साक्ष्य देकर अपना विरोध.', answer: 'सही उत्तर: "पृष्ठ 3, पैरा 2 में नायक कहता है',
                  options: ['सही उत्तर: "पृष्ठ 3, पैरा 2 में नायक कहता है', 'good discussion'],
                  hint: 'Review "पाठ्य-आधारित साक्ष्य चयन" (c9_hin_ga_cbse_07_012) and practice the "Quote → Explain →.',
                  misconception: 'Students believe a "good discussion" means speaking the most, using flowery language, or impressing the teacher with vocabulary.' },
                { id: 'b', prompt: 'कक्षा में चर्चा चल रही है। एक छात्र ने पाठ के एक बिंब की व्याख्या की। आप उस व्याख्या को आगे बढ़ाना चाहते हैं। **अगला वाक्य** बोलिए जो चर्चा को गहरा करे (केवल.', answer: 'उदाहरण: "आपने जो बिंब बताया',
                  options: ['उदाहरण: "आपने जो बिंब बताया', 'good discussion'],
                  hint: 'Review "पाठ्य-आधारित साक्ष्य चयन" (c9_hin_ga_cbse_07_012) and practice the "Quote → Explain →.',
                  misconception: 'Students believe a "good discussion" means speaking the most, using flowery language, or impressing the teacher with vocabulary.' },
                { id: 'c', prompt: 'दो छात्रों के मत हैं: छात्र अ: "पाठ का मुख्य विषय \'संघर्ष\' है।" छात्र ब: "पाठ का मुख्य विषय \'समझौता\' है।" पाठ के दो अलग-अलग प्रसंगों का हवाला देकर बताइए कि.', answer: 'संभावित उत्तर: "पहले प्रसंग (पृष्ठ 1, संवाद) में नायक परिस्थिति से लड़ता है',
                  options: ['संभावित उत्तर: "पहले प्रसंग (पृष्ठ 1, संवाद) में नायक परिस्थिति से लड़ता है', 'good discussion'],
                  hint: 'Review "पाठ्य-आधारित साक्ष्य चयन" (c9_hin_ga_cbse_07_012) and practice the "Quote → Explain →.',
                  misconception: 'Students believe a "good discussion" means speaking the most, using flowery language, or impressing the teacher with vocabulary.' }
          ],
            remediations: { 'a-good-discussion-means-speaking': { steps: ['**Model the difference:** Show two 30-second videos — one student giving an opinion ("मुझे लगता है नायक बहादुर था").', '**Drill "Text → Point" mapping:** Give 5 extracts from Chapter 7; students must write exactly ONE point per extract.', 'No point without a line number is accepted.', '**Practice "Build, don\'t just agree":** In pairs, Student A makes a point; Student B *must* start with "आपके बिंदु से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a "good discussion" means speaking the most, using flowery language, or impressing the teacher with.',
          parts: [
                { id: 'a', prompt: 'चर्चा के अंत में शिक्षक कहते हैं: "समूह का निष्कर्ष एक वाक्य में लिखो।" आपका समूह 10 मिनट से बोल रहा है। **आप** क्या लिखेंगे?', answer: 'उत्तर: "नायक का अंतर्द्वंद्व कर्तव्य और इच्छा के बीच नहीं, बल्कि दो कर्तव्यों',
                  options: ['उत्तर: "नायक का अंतर्द्वंद्व कर्तव्य और इच्छा के बीच नहीं, बल्कि दो कर्तव्यों', 'good discussion'],
                  hint: 'Review "पाठ्य-आधारित साक्ष्य चयन" (c9_hin_ga_cbse_07_012) and practice the "Quote → Explain →.',
                  misconception: 'Students believe a "good discussion" means speaking the most, using flowery language, or impressing the teacher with vocabulary.' },
                { id: 'b', prompt: 'पाठ 7 के किसी एक पात्र को चुनकर, **आप** एक नया चर्चा-बिंदु (discussion prompt) बनाइए जो कक्षा को 15 मिनट तक सार्थक चर्चा में लगा सके। बिंदु \'हाँ/नहीं\' में.', answer: 'उदाहरण: "सहायक पात्र \'दादी\' की चुप्पी क्या दर्शाती है',
                  options: ['उदाहरण: "सहायक पात्र \'दादी\' की चुप्पी क्या दर्शाती है', 'good discussion'],
                  hint: 'Review "पाठ्य-आधारित साक्ष्य चयन" (c9_hin_ga_cbse_07_012) and practice the "Quote → Explain →.',
                  misconception: 'Students believe a "good discussion" means speaking the most, using flowery language, or impressing the teacher with vocabulary.' }
          ],
            remediations: { 'a-good-discussion-means-speaking': { steps: ['**Model the difference:** Show two 30-second videos — one student giving an opinion ("मुझे लगता है नायक बहादुर था").', '**Drill "Text → Point" mapping:** Give 5 extracts from Chapter 7; students must write exactly ONE point per extract.', 'No point without a line number is accepted.', '**Practice "Build, don\'t just agree":** In pairs, Student A makes a point; Student B *must* start with "आपके बिंदु से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
