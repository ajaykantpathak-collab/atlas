import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch21_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch21_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch21_p3',
    title: 'कर चले हम फ़दिा · Part 3/3',
    subtitle: 'This node covers the **methodology and practice** of writing board-exam standard.',
    classLevel: 10, subject: 'hin_sp', topic: 'कर चले हम फ़दिा · Part 3/3',
    chapters: ['c10_hin_sp_ch21'],
    nodeIds: ['c10_hin_sp_cbse_21_013', 'c10_hin_sp_cbse_21_014', 'c10_hin_sp_cbse_21_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'You sit in the exam hall, staring at the question: *"निम्नलिखित पंक्तियों का आशय स्पष्ट कीजिए..."* — your.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'दिए गए पद्यांश का आशय-स्पष्टीकरण लिखिए: *"सरफ़रोशी की तमन्ना अब हमारे दिल में है, देखना है ज़ोर कितना बाज़ू-ए-क़ातिल में है"* (नोट: यह पंक्ति मूल कविता से नहीं.',
        options: ['**Correct Answer (Structured):** 1', 'कर चले हम फ़िदा', 'देशभक्ति की भावना है'],
        answer: '**Correct Answer (Structured):** 1',
        hook: '**The "Paraphrase Trap" (भावार्थ को ही आशय समझना):** 90% struggling students believe writing a **simpler Hindi version.',
    },
    teaching: [
        { title: 'कर चले हम फ़दिा — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण (Explanation of Intent/Meaning) is the structured literary skill of interpreting a specific poetic stanza or line by identifying its literal meaning, the literary devices used, the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_21_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['कर चले हम फ़दिा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_21_013', title: 'कर चले हम फ़दिा — आशय-स्पष्टीकरण और विश्लेषण अभ्यास',
          caseStudy: { intro: 'You sit in the exam hall, staring at the question: *"निम्नलिखित पंक्तियों का आशय स्पष्ट कीजिए..."* — your heart races because you know the poem but don\'t know.',
            decisions: [{ prompt: '"कर चले हम फ़िदा" शीर्षक पंक्ति में \'फ़िदा\' शब्द का शाब्दिक अर्थ क्या है और यह शब्द कविता के केंद्रीय भाव को किस प्रकार स्थापित करता है?', options: [
                { text: '**Correct Answer:** \'फ़िदा\' का शाब्दिक अर्थ है \'न्यौछावर करना\', \'बलिदान कर देना\' या', outcome: '**Correct Answer:** \'फ़िदा\' का शाब्दिक अर्थ है \'न्यौछावर करना\', \'बलिदान कर देना\' या \'कुर्बान होना\'।.' },
                { text: 'मर जाना', outcome: 'Not quite — **The "Paraphrase Trap" (भावार्थ को ही आशय समझना):** 90% struggling students believe writing.', reveals: 'the-paraphrase-trap-90-struggling' },
                { text: 'शहीद होना', outcome: 'Not quite — **The "Paraphrase Trap" (भावार्थ को ही आशय समझना):** 90% struggling students believe writing.', reveals: 'the-paraphrase-trap-90-struggling' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_21_015', title: 'You made it',
          caseStudy: { intro: 'You finished कर चले हम फ़दिा — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_21_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण (Explanation of Intent/Meaning) is the structured literary skill.',
          hint: 'If stuck, review **Node 006 (अलंकार)** and **Node 007 (प्रतीक/बिंब)** — specifically the.',
          misconception: '**The "Paraphrase Trap" (भावार्थ को ही आशय समझना):** 90% struggling students believe writing a **simpler Hindi version.',
          parts: [
                { id: 'a', prompt: 'दिए गए पद्यांश का आशय-स्पष्टीकरण लिखिए: *"सरफ़रोशी की तमन्ना अब हमारे दिल में है, देखना है ज़ोर कितना बाज़ू-ए-क़ातिल में है"* (नोट: यह पंक्ति मूल कविता से नहीं.', answer: '**Correct Answer (Structured):** 1',
                  options: ['**Correct Answer (Structured):** 1', 'कर चले हम फ़िदा', 'देशभक्ति की भावना है', 'Paraphrase Trap'],
                  hint: 'If stuck, review **Node 006 (अलंकार)** and **Node 007 (प्रतीक/बिंब)** — specifically the worked.',
                  misconception: '**The "Paraphrase Trap" (भावार्थ को ही आशय समझना):** 90% struggling students believe writing a **simpler Hindi version (सरल भावार्थ)**.' }
          ],
            remediations: { 'the-paraphrase-trap-90-struggling': { steps: ['**Targeted Remediation Protocol (3-Day Fix):** 1.', '**Day 1 - Deconstruct a Model Answer:** Give the student a **perfect 4-step आशय-स्पष्टीकरण** (from node 014 or CBSE.', 'Ask: "दोनों में क्या अंतर है?', 'किसे पूरे अंक मिलेंगे?" Force them to label the 4 steps (प्रसंग, भावार्थ, युक्ति, भाव-संबंध) in the model answer using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_21_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "Paraphrase Trap" (भावार्थ को ही आशय समझना):** 90% struggling students believe writing a **simpler Hindi version.',
          parts: [
                { id: 'a', prompt: 'कथन का मूल्यांकन कीजिए: *"आशय-स्पष्टीकरण में कवि की जीवनी (Biography) और ऐतिहासिक पृष्ठभूमि लिखना अनिवार्य है ताकि उत्तर पूर्ण माना जाए।"* क्या आप सहमत हैं?', answer: '**Correct Answer:** **असहमत (Disagree)।** CBSE बोर्ड परीक्षा में आशय-स्पष्टीकरण',
                  options: ['**Correct Answer:** **असहमत (Disagree)।** CBSE बोर्ड परीक्षा में आशय-स्पष्टीकरण', 'कवि परिचय', 'आशय-स्पष्टीकरण', 'Paraphrase Trap'],
                  hint: 'If stuck, review **Node 006 (अलंकार)** and **Node 007 (प्रतीक/बिंब)** — specifically the worked.',
                  misconception: '**The "Paraphrase Trap" (भावार्थ को ही आशय समझना):** 90% struggling students believe writing a **simpler Hindi version (सरल भावार्थ)**.' },
                { id: 'b', prompt: '"कर चले हम फ़िदा" की अंतिम 4 पंक्तियों के आधार पर एक **नया छंद (Stanza)** रचिए जो **आज के युवा** को उसी भावना (देश-प्रेम/दायित्व) से संबोधित करता हो, परंतु.', answer: '**Expected Criteria for Good Answer:** 1',
                  options: ['**Expected Criteria for Good Answer:** 1', 'writing lines', 'composing poetry', 'Paraphrase Trap'],
                  hint: 'If stuck, review **Node 006 (अलंकार)** and **Node 007 (प्रतीक/बिंब)** — specifically the worked.',
                  misconception: '**The "Paraphrase Trap" (भावार्थ को ही आशय समझना):** 90% struggling students believe writing a **simpler Hindi version (सरल भावार्थ)**.' }
          ],
            remediations: { 'the-paraphrase-trap-90-struggling': { steps: ['**Targeted Remediation Protocol (3-Day Fix):** 1.', '**Day 1 - Deconstruct a Model Answer:** Give the student a **perfect 4-step आशय-स्पष्टीकरण** (from node 014 or CBSE.', 'Ask: "दोनों में क्या अंतर है?', 'किसे पूरे अंक मिलेंगे?" Force them to label the 4 steps (प्रसंग, भावार्थ, युक्ति, भाव-संबंध) in the model answer using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_21_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) वह व्यवस्थित प्रक्रिया है.',
          hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_21_007 (प्रतीक और बिंब)** और **c10_hin_sp_cbse_21_013.',
          misconception: '**विशिष्ट भ्रांति**: *"अच्छे अंक पाने के लिए कविता की अधिक-से-अधिक पंक्तियाँ ज्यों-की-त्यों लिख देनी चाहिए। लंबा उत्तर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) वह व्यवस्थित प्रक्रिया है जिसमें',
                  options: ['परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) वह व्यवस्थित प्रक्रिया है जिसमें', '\'कर चले हम फिदा\' कविता के कवि **माखनलाल चतुर्वेदी** (1889–1968) छायावादोत्तर युग के', '"कर चले हम फ़िदा" कविता के प्रत्येक पद्यांश (चार पंक्तियों के समूह) का भावार्थ स्पष्ट करना', '**काव्य-संरचना (Poetic Structure)** कविता के आंतरिक संगठन की वह योजना है जिसमें पद-विभाजन'],
                  hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_21_007 (प्रतीक और बिंब)** और **c10_hin_sp_cbse_21_013.',
                  misconception: '**विशिष्ट भ्रांति**: *"अच्छे अंक पाने के लिए कविता की अधिक-से-अधिक पंक्तियाँ ज्यों-की-त्यों लिख देनी चाहिए। लंबा उत्तर = अधिक अंक।"*.' }
          ],
            remediations: { 'cbse-content-50': { steps: ['**निदान**: छात्र से कहें — *"पिछले वर्ष के बोर्ड पेपर का कोई 5-अंकीय प्रश्न उठाओ और 8 मिनट में उत्तर लिखो।"* उसका उत्तर.', '**मॉडलिंग**: उसी प्रश्न का **आदर्श उत्तर (Model Answer)** PEEL में दिखाएँ — **रंगीन पेन** से.', '**अभ्यास**: **केवल Evidence चरण** का अभ्यास कराएँ — 5 मिनट में कविता से **दो सटीक उद्धरण** चुनकर लिखने का ड्रिल दें। 4.', '**प्रतिपुष्टि (Feedback)**: अगले 3 दिन तक **रोज एक 3-अंकीय और एक 5-अंकीय उत्तर** लिखवाएँ, **केवल संरचना (Structure)**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_21_015', difficulty: 'standard',
          question: 'वाचन-पाठ कविता को सही उच्चारण, उचित विराम, लय और भाव के साथ आवाज़ देकर पढ़ने की.',
          hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_21_002 (पद्यांश-वार भावार्थ)** और.',
          misconception: '**सबसे घातक भ्रम:** "वाचन-पाठ का अर्थ केवल **स्वर-पाठ (recitation)** है; चर्चा-बिंदु तो **शिक्षक पूछते हैं, हमें उत्तर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ कविता को सही उच्चारण, उचित विराम, लय और भाव के साथ आवाज़ देकर पढ़ने की कला है',
                  options: ['वाचन-पाठ कविता को सही उच्चारण, उचित विराम, लय और भाव के साथ आवाज़ देकर पढ़ने की कला है', '\'कर चले हम फिदा\' कविता के कवि **माखनलाल चतुर्वेदी** (1889–1968) छायावादोत्तर युग के', '"कर चले हम फ़िदा" कविता के प्रत्येक पद्यांश (चार पंक्तियों के समूह) का भावार्थ स्पष्ट करना', '**काव्य-संरचना (Poetic Structure)** कविता के आंतरिक संगठन की वह योजना है जिसमें पद-विभाजन'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_21_002 (पद्यांश-वार भावार्थ)** और.',
                  misconception: '**सबसे घातक भ्रम:** "वाचन-पाठ का अर्थ केवल **स्वर-पाठ (recitation)** है; चर्चा-बिंदु तो **शिक्षक पूछते हैं, हमें उत्तर रटने हैं**।" छात्र.' }
          ],
            remediations: { 'recitation': { steps: ['**पुनः वाचन-अभ्यास:** छात्र को अकेले कविता रिकॉर्ड करवाएँ → स्वयं सुनवाएँ → पूछें "कहाँ भाव टूटा?" → उन 2-3 पंक्तियों.', '**चर्चा-बिंदु डीकोड करना:** एक प्रश्न लें (जैसे "कवि ने \'अब\' शब्द क्यों प्रयुक्त किया?") → छात्र से कहें: "पहले पंक्ति.', '**साक्ष्य-आधारित बोलना:** छात्र को बोलने से पहले **कलम से एक पंक्ति उद्धृत** करने को कहें — यह आदत **RTC उत्तर-लेखन**.', '**सहकर्मी-प्रतिक्रिया (peer feedback):** दो छात्रों को एक-दूसरे का वाचन सुनकर **एक प्रशंसा, एक सुधार** लिखने को कहें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
