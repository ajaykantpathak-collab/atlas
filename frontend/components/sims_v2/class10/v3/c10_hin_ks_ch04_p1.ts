import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch04_p1: SimDef = {
    id: 'v3_c10_hin_ks_ch04_p1',
    title: 'पाठ 4 · Part 1/3',
    subtitle: 'इस नोड में कवि के व्यक्तिगत एवं सामाजिक पृष्ठभूमि, युगीय प्रभाव और साहित्यिक योगदान पर.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 4 · Part 1/3',
    chapters: ['c10_hin_ks_ch04'],
    nodeIds: ['c10_hin_ks_cbse_04_001', 'c10_hin_ks_cbse_04_002', 'c10_hin_ks_cbse_04_003', 'c10_hin_ks_cbse_04_004', 'c10_hin_ks_cbse_04_005', 'c10_hin_ks_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप पुस्तकालय में एक नई कविता देख रहे हैं और सबसे पहले 궁금해 करते हैं कि इस कविता को किसने लिखा है.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'एक छात्र ने पद्यांश का भावार्थ लिखा: "कवि कहता है कि फूल सुंदर होते हैं और वे खुशबू देते हैं।" मूल पद्यांश: "मुरझाए फूल भी खुशबू देते हैं, टूटी डालियाँ भी छाया.',
        options: ['**Correct answer:** **नहीं, यह भावार्थ गलत है।** **कारण:** 1', '**What a wrong answer reveals:** If the student defends the answer saying', 'आशय स्पष्ट कीजिए'],
        answer: '**Correct answer:** **नहीं, यह भावार्थ गलत है।** **कारण:** 1',
        hook: '**Exact error:** Students treat भावार्थ as "difficult word meanings + one-line summary".',
    },
    teaching: [
        { title: 'पाठ 4 — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों — जन्म, युग, शैक्षणिक एवं साहित्यिक योगदान, सामाजिक-राजनीतिक परिदृश्य — को संक्षेप में प्रस्तुत करके उनकी रचना के संदर्भ को समझने में.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — कवि', 'पाठ 4 — पद्यांश-वार', 'पाठ 4 — काव्य-संरचना', 'पाठ 4 — केंद्रीय', 'पाठ 4 — छंद', 'पाठ 4 — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_04_002', title: 'पाठ 4 — पद्यांश-वार भावार्थ',
          caseStudy: { intro: 'You open your Hindi textbook to a new poem and see 4-5 stanzas of unfamiliar words — your first thought: "Where do I even start?" Begin by reading the poem.',
            decisions: [{ prompt: 'पद्यांश-वार भावार्थ और अनुवाद में मूल अंतर क्या है? एक वाक्य में बताइए।', options: [
                { text: '**Correct answer:** अनुवाद शब्दों का शाब्दिक रूपांतरण है, जबकि भावार्थ पद्यांश के', outcome: '**Correct answer:** अनुवाद शब्दों का शाब्दिक रूपांतरण है, जबकि भावार्थ पद्यांश के अंतर्निहित भाव.' },
                { text: 'दोनों एक ही हैं', outcome: 'Not quite — **Exact error:** Students treat भावार्थ as "difficult word meanings + one-line summary".', reveals: 'exact-error-students-treat-as' },
                { text: 'भावार्थ में कठिन शब्दों के अर्थ लिखते हैं', outcome: 'Not quite — **Exact error:** Students treat भावार्थ as "difficult word meanings + one-line summary".', reveals: 'exact-error-students-treat-as' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_001', difficulty: 'standard',
          question: 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों — जन्म, युग.',
          hint: 'यदि कठिनाई हो तो कक्षा 9 के साहित्यिक युक्तियों और भाव‑विश्लेषण के आधारभूत अध्ययन को पुनः.',
          misconception: 'छात्र अक्सर कवि के परिचय को केवल जन्म‑तिथि, मृत्यु‑तिथि और शैक्षणिक योगदान तक सीमित रख देते हैं, मानते हैं कि ये तथ्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों',
                  options: ['कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक', 'केंद्रीय भाव वह मुख्य भाव या विचार है जो कविता के सभी stanza में दोहराया जाता है, और रस'],
                  hint: 'यदि कठिनाई हो तो कक्षा 9 के साहित्यिक युक्तियों और भाव‑विश्लेषण के आधारभूत अध्ययन को पुनः पढ़ें।',
                  misconception: 'छात्र अक्सर कवि के परिचय को केवल जन्म‑तिथि, मृत्यु‑तिथि और शैक्षणिक योगदान तक सीमित रख देते हैं, मानते हैं कि ये तथ्य पर्याप्त हैं। वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को बताइए कि परिचय का उद्देश्य कविता को “संदर्भ में रखना” है। stepwise मार्गदर्शन दें: (1) कविता के मुख्य विषय या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem.',
          hint: 'If stuck, review Class 9 Hindi \'पद्य खंड\' basics: how to use पाठ्यपुस्तक की शब्दावली.',
          misconception: '**Exact error:** Students treat भावार्थ as "difficult word meanings + one-line summary".',
          parts: [
                { id: 'a', prompt: 'किसी कविता के दो लगातार पद्यांशों का भावार्थ लिखते समय आप कैसे तय करेंगे कि दूसरे पद्यांश का भाव पहले से अलग है या उसी का विस्तार? समझाइए।', answer: '**Correct answer:** दूसरे पद्यांश के की-वर्ड्स (संज्ञा, क्रिया, विशेषण), टोन',
                  options: ['**Correct answer:** दूसरे पद्यांश के की-वर्ड्स (संज्ञा, क्रिया, विशेषण), टोन', 'दोनों एक ही विषय पर हैं'],
                  hint: 'If stuck, review Class 9 Hindi \'पद्य खंड\' basics: how to use पाठ्यपुस्तक की शब्दावली (glossary) and.',
                  misconception: '**Exact error:** Students treat भावार्थ as "difficult word meanings + one-line summary".' },
                { id: 'b', prompt: 'नीचे दिए गए काल्पनिक पद्यांश का भावार्थ लिखिए (शब्दार्थ अलग से न लिखें): "सूखे पत्ते जब झड़ते हैं, तब जड़ें मुस्कुराती हैं।"', answer: '**Steps & Answer:** 1',
                  options: ['**Steps & Answer:** 1', '**What a wrong answer reveals:** Writing only'],
                  hint: 'If stuck, review Class 9 Hindi \'पद्य खंड\' basics: how to use पाठ्यपुस्तक की शब्दावली (glossary) and.',
                  misconception: '**Exact error:** Students treat भावार्थ as "difficult word meanings + one-line summary".' }
          ],
            remediations: { 'exact-error-students-treat-as': { steps: ['**Step-by-step remediation:** 1.', '**Isolate the gap:** Give the student a 2-line stanza.', 'Ask: "यहाँ कवि *क्या* कह रहा है?', '(literal) → कवि *क्या महसूस कर रहा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Exact error:** Students treat भावार्थ as "difficult word meanings + one-line summary".',
          parts: [
                { id: 'a', prompt: 'एक छात्र ने पद्यांश का भावार्थ लिखा: "कवि कहता है कि फूल सुंदर होते हैं और वे खुशबू देते हैं।" मूल पद्यांश: "मुरझाए फूल भी खुशबू देते हैं, टूटी डालियाँ भी छाया.', answer: '**Correct answer:** **नहीं, यह भावार्थ गलत है।** **कारण:** 1',
                  options: ['**Correct answer:** **नहीं, यह भावार्थ गलत है।** **कारण:** 1', '**What a wrong answer reveals:** If the student defends the answer saying', 'आशय स्पष्ट कीजिए'],
                  hint: 'If stuck, review Class 9 Hindi \'पद्य खंड\' basics: how to use पाठ्यपुस्तक की शब्दावली (glossary) and.',
                  misconception: '**Exact error:** Students treat भावार्थ as "difficult word meanings + one-line summary".' }
          ],
            remediations: { 'exact-error-students-treat-as': { steps: ['**Step-by-step remediation:** 1.', '**Isolate the gap:** Give the student a 2-line stanza.', 'Ask: "यहाँ कवि *क्या* कह रहा है?', '(literal) → कवि *क्या महसूस कर रहा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_003', difficulty: 'standard',
          question: 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या.',
          hint: 'यदि फँसें तो stanza-वार भावार्थ (नोड 002) की समीक्षा करें, विशेष रूप से यह देखते हुए कि.',
          misconception: 'छात्र अक्सर काव्य-संरचना और पद्य-विन्यास को छंद (meter) से मिला लेते हैं, सोचते हैं कि यदि कविता में कोई स्पष्ट छंद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक',
                  options: ['काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'केंद्रीय भाव वह मुख्य भाव या विचार है जो कविता के सभी stanza में दोहराया जाता है, और रस'],
                  hint: 'यदि फँसें तो stanza-वार भावार्थ (नोड 002) की समीक्षा करें, विशेष रूप से यह देखते हुए कि प्रत्येक.',
                  misconception: 'छात्र अक्सर काव्य-संरचना और पद्य-विन्यास को छंद (meter) से मिला लेते हैं, सोचते हैं कि यदि कविता में कोई स्पष्ट छंद नहीं है (जैसे दोहा का.' }
          ],
            remediations: { 'meter': { steps: ['इस गलती को सुधारने के लिए, छात्र को कविता पढ़ते समय एक कागज़ ले कर प्रत्येक stanza के बाद एक ऊर्ध्वाधर रेखा खींचने के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_004', difficulty: 'standard',
          question: 'केंद्रीय भाव वह मुख्य भाव या विचार है जो कविता के सभी stanza में दोहराया जाता.',
          hint: 'पद्य-vinyas और छंद की अवधारणा को फिर से देखें (नोड c10_hin_ks_cbse_04_003)',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कविता में किसी विशेष भाव (जैसे दुख) से जुड़ा शब्द आ रहा है तो वह शब्द ही केंद्रीय भाव है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव वह मुख्य भाव या विचार है जो कविता के सभी stanza में दोहराया जाता है, और रस',
                  options: ['केंद्रीय भाव वह मुख्य भाव या विचार है जो कविता के सभी stanza में दोहराया जाता है, और रस', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक'],
                  hint: 'पद्य-vinyas और छंद की अवधारणा को फिर से देखें (नोड c10_hin_ks_cbse_04_003)',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कविता में किसी विशेष भाव (जैसे दुख) से जुड़ा शब्द आ रहा है तो वह शब्द ही केंद्रीय भाव है और उसी से रस भी तय हो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['सबसे पहले छात्र को एक छोटी कविता (चार stanza) दीजिए और प्रत्येक stanza में मुख्य शब्द या वाक्यांश को underline करने के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_005', difficulty: 'standard',
          question: 'छंद कविता का वह विधान है जिसमें पदों के चरणों में वर्णों या मात्राओं की निश्चित.',
          hint: 'यदि मात्रा गिनने में अटके, तो कक्षा 9 के \'वर्ण-विचार\' और \'मात्रा ज्ञान\' को दोहराएँ।',
          misconception: 'छात्र अक्सर मानते हैं कि **\'तुक मिलना ही छंद है\'** — वे "उत्साह/आस", "जग/मग" जैसी तुकों को देखकर छंद पहचान लेते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद कविता का वह विधान है जिसमें पदों के चरणों में वर्णों या मात्राओं की निश्चित संख्या,',
                  options: ['छंद कविता का वह विधान है जिसमें पदों के चरणों में वर्णों या मात्राओं की निश्चित संख्या,', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक'],
                  hint: 'यदि मात्रा गिनने में अटके, तो कक्षा 9 के \'वर्ण-विचार\' और \'मात्रा ज्ञान\' को दोहराएँ।',
                  misconception: 'छात्र अक्सर मानते हैं कि **\'तुक मिलना ही छंद है\'** — वे "उत्साह/आस", "जग/मग" जैसी तुकों को देखकर छंद पहचान लेते हैं, जबकि बोर्ड परीक्षा में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "एक पंक्ति लो, प्रत्येक शब्द की मात्राएँ गिनो (गुरु=2, लघु=1), फिर कुल जोड़ो।" 2.', 'दोहा (13,11) और चौपाई (16,16) के मानक उदाहरण देकर अभ्यास कराएँ। 3.', 'यति चिह्न (|) लगाकर जोर से पढ़वाएँ — जहाँ स्वाभाविक ठहराव आए, वहीं यति है। 4.', 'फिर पाठ 4 की पंक्तियों पर यही प्रक्रिया दुहराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_006', difficulty: 'standard',
          question: 'अलंकार (Figure of Speech) वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के.',
          hint: 'यदि अटके तो **कक्षा 9 की हिंदी व्याकरण पुस्तक (NCERT) के अलंकार अध्याय** के.',
          misconception: 'छात्र समझते हैं कि अलंकार पहचानना = केवल नाम लिख देना (जैसे "यह उपमा है")। बोर्ड परीक्षा में **पहचान मात्र ½ अंक** की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार (Figure of Speech) वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशेष विन्यास',
                  options: ['अलंकार (Figure of Speech) वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों के विशेष विन्यास', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक'],
                  hint: 'यदि अटके तो **कक्षा 9 की हिंदी व्याकरण पुस्तक (NCERT) के अलंकार अध्याय** के परिभाषा-उदाहरण दोहराओ.',
                  misconception: 'छात्र समझते हैं कि अलंकार पहचानना = केवल नाम लिख देना (जैसे "यह उपमा है")। बोर्ड परीक्षा में **पहचान मात्र ½ अंक** की होती है, शेष 1½–2 अंक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **अलंकार-चक्र** (चार्ट) बनवाओ: बाईं ओर अलंकार नाम, दाईं ओर — परिभाषा, पहचान-सूत्र (साधन/लक्षण), 1 उदाहरण, 1.', 'प्रतिदिन 1 पद्यांश देकर **पहचान → उद्धरण → व्याख्या → प्रभाव** का 4-चरणीय लिखित अभ्यास करवाओ (टाइमर: 5 मिनट)। 3.', 'गलत उत्तरों पर लाल पेन से **कौन-सा चरण छूटा** लिखो — इससे मेटा-कॉग्निशन विकसित होगा। 4.', 'बोर्ड के गत 5 वर्षों के अलंकार-आधारित प्रश्नों का **ट्रेंड विश्लेषण** करवाओ (कौन-सा अलंकार बार-बार पूछा जाता है?)।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
