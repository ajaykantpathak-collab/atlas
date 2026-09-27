import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch13_p2: SimDef = {
    id: 'v3_c6_hin_ch13_p2',
    title: 'पाठ 13 · Part 2/3',
    subtitle: 'इस नोड में गौण विषय की पहचान, मुख्य विषय से अंतर समझना, और कहानी में उसके कार्य का.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 13 · Part 2/3',
    chapters: ['c6_hin_ch13'],
    nodeIds: ['c6_hin_cbse_13_007', 'c6_hin_cbse_13_008', 'c6_hin_cbse_13_009', 'c6_hin_cbse_13_010', 'c6_hin_cbse_13_011', 'c6_hin_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कक्षा में किसी दोस्त से कहानी सुनने के बाद जब आप कहते हैं "यह कहानी सच्ची दोस्ती के बारे में थी", तो आप मुख्य.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 13 — गौण विषय', text: 'गौण विषय वह द्वितीयक विचार या संदेश है जो मुख्य कहानी को समृद्ध बनाता है, लेकिन यह कहानी का केंद्रीय बिंदु नहीं होता।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_13_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 13 — गौण', 'पाठ 13 — साहित्यिक', 'पाठ 13 — पदावली', 'पाठ 13 — व्याकरण', 'पाठ 13 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_hin_cbse_13_012', title: 'पाठ 13 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'Have you ever played "Guess the Object" where one friend describes something without naming it?',
            decisions: [{ prompt: 'पाठ में से एक वस्तुनिष्ठ (वास्तुनिष्ठ) प्रश्न का उदाहरण दीजिए और बताइए कि उसका उत्तर पाठ में कहाँ मिलेगा।', options: [
                { text: 'उदाहरण: "नायक का नाम क्या है?"', outcome: 'उदाहरण: "नायक का नाम क्या है?" — उत्तर पाठ के पहले पैराग्राफ में स्पष्ट लिखा होगा। यदि छात्र "नायक.' },
                { text: 'opinion questions', outcome: 'Not quite — Students believe that ashay-suchak questions are "opinion questions" where any answer is correct.', reveals: 'ashay-suchak-questions-are-opinion' }
            ] }] } },
        { type: 'case', nodeId: 'c6_hin_cbse_13_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 13 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 13 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 13 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_007', difficulty: 'standard',
          question: 'गौण विषय वह द्वितीयक विचार या संदेश है जो मुख्य कहानी को समृद्ध बनाता है, लेकिन.',
          hint: 'मुख्य विषय की पहचान करने के तरीके को दोहराएँ, विशेषकर c6_hin_cbse_13_006 से।',
          misconception: 'छात्र अक्सर मानते हैं कि गौण विषय केवल वह भाग है जो कहानी में सबसे अधिक बार आता है, जैसे यदि कोई पात्र बार-बार खाना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय वह द्वितीयक विचार या संदेश है जो मुख्य कहानी को समृद्ध बनाता है, लेकिन यह कहानी',
                  options: ['गौण विषय वह द्वितीयक विचार या संदेश है जो मुख्य कहानी को समृद्ध बनाता है, लेकिन यह कहानी', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है'],
                  hint: 'मुख्य विषय की पहचान करने के तरीके को दोहराएँ, विशेषकर c6_hin_cbse_13_006 से।',
                  misconception: 'छात्र अक्सर मानते हैं कि गौण विषय केवल वह भाग है जो कहानी में सबसे अधिक बार आता है, जैसे यदि कोई पात्र बार-बार खाना खाता दिखाया जाए तो वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "क्या इस दोहराव से कोई नया विचार या भाव आता है?', 'क्या यह हमें पात्र के बारे में कुछ नया बताता है या मुख्य संदेश को चुनौती देता है?" फिर दो उदाहरण दें: एक जहाँ दोहराव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_008', difficulty: 'standard',
          question: 'बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें लेखक शब्दों के माध्यम से पाठक की.',
          hint: 'यदि अटका हुआ लगे तो "उपमा और रूपक का अंतर" तथा "पाँच इंद्रियों के उदाहरण" दोहराएँ — ये.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"है/हैं/था/थी" वाले हर वाक्य में रूपक होता है**। उदाहरण: "गुलाब एक फूल है".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें लेखक शब्दों के माध्यम से पाठक की पाँचों',
                  options: ['बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें लेखक शब्दों के माध्यम से पाठक की पाँचों', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है'],
                  hint: 'यदि अटका हुआ लगे तो "उपमा और रूपक का अंतर" तथा "पाँच इंद्रियों के उदाहरण" दोहराएँ — ये दोनों.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"है/हैं/था/थी" वाले हर वाक्य में रूपक होता है**। उदाहरण: "गुलाब एक फूल है" — छात्र कहते हैं "रूपक है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहो: "दो वाक्य लिखो — एक जिसमें \'है\' हो पर रूपक न हो, एक जिसमें रूपक हो।" 2.', '**चरण 2:** दोनों वाक्यों में **"क्या किससे तुलना हो रही है?"** पूछो। पहले में तुलना नहीं होगी (गुलाब = फूल, परिभाषा).', '**चरण 3:** समझाओ: "रूपक में **\'है\' का अर्थ \'बराबर\' नहीं, \'बन जाता है\' होता है — जैसे अभिनेता मंच पर राजा \'बन जाता है\'.', '**चरण 4:** 5-5 वाक्य दें (मिश्रित: परिभाषा, उपमा, रूपक) और छात्र से केवल रूपक छाँटने को कहो — हर चयन पर "कौन-कौन सी दो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_009', difficulty: 'standard',
          question: '**विरोधाभास** एक ऐसी साहित्यिक युक्ति है जहाँ कथन पहली नज़र में असंगत या.',
          hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_13_008 (बिंब और रूपक)** के \'रूपक के दो भाग: उपमान.',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** को **विरोधाभासी स्थिति (Contradictory situation)** या **विलोम शब्द.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** एक ऐसी साहित्यिक युक्ति है जहाँ कथन पहली नज़र में असंगत या आत्म-विरोधी लगता',
                  options: ['**विरोधाभास** एक ऐसी साहित्यिक युक्ति है जहाँ कथन पहली नज़र में असंगत या आत्म-विरोधी लगता', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_13_008 (बिंब और रूपक)** के \'रूपक के दो भाग: उपमान और उपमेय\'.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** को **विरोधाभासी स्थिति (Contradictory situation)** या **विलोम शब्द (Antonyms)** समझ लेते.' }
          ],
            remediations: { 'paradox-contradictory-situation-antonyms': { steps: ['**विरोधाभास के लिए:** छात्र को दो कथन दो — एक साधारण विरोधाभासी स्थिति ("वह रो रहा था पर हँस भी रहा था") और एक.', 'दूसरे में क्या?" तब समझाओ: साहित्यिक विरोधाभास **अपने आप में एक अंतर्दृष्टि (Insight) देता है**, केवल स्थिति नहीं.', '**प्रतीक के लिए:** तीन वस्तुएँ दिखाओ: (अ) लाल बत्ती (ट्रैफिक सिग्नल), (ब) लाल गुलाब (प्रेम प्रसंग में), (स) लाल रंग का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_010', difficulty: 'standard',
          question: 'पदावली के मुख्य शब्द वे विशिष्ट शब्द होते हैं जो किसी पाठ की केंद्रीय.',
          hint: 'यदि अटके, तो c6_hin_cbse_13_006 (मुख्य विषय और संदेश) पर लौटें और पाठ का एक-वाक्य सार.',
          misconception: 'छात्र समझते हैं कि **जो शब्द पाठ में सबसे ज्यादा बार आए, वही मुख्य शब्द है**। उदाहरण: एक कहानी में \'घर\' 10 बार आया और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के मुख्य शब्द वे विशिष्ट शब्द होते हैं जो किसी पाठ की केंद्रीय विषयवस्तु, भाव, या',
                  options: ['पदावली के मुख्य शब्द वे विशिष्ट शब्द होते हैं जो किसी पाठ की केंद्रीय विषयवस्तु, भाव, या', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है'],
                  hint: 'यदि अटके, तो c6_hin_cbse_13_006 (मुख्य विषय और संदेश) पर लौटें और पाठ का एक-वाक्य सार लिखने का.',
                  misconception: 'छात्र समझते हैं कि **जो शब्द पाठ में सबसे ज्यादा बार आए, वही मुख्य शब्द है**। उदाहरण: एक कहानी में \'घर\' 10 बार आया और \'त्याग\' 3 बार आया.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक छोटा अनुच्छेद दो (5-6 वाक्य) जिसमें एक शब्द 5 बार आए (जैसे \'कुर्सी\') और एक भाव-सूचक शब्द 2 बार आए (जैसे.', 'पूछो: "कहानी किस बारे में है — कुर्सी के बारे में या साहस के बारे में?" 3.', 'जब वह \'साहस\' बोले, तो कहो: "तो मुख्य शब्द वह नहीं जो **ज्यादा आए**, बल्कि वह जो **अर्थ का केंद्र** हो।" 4.', 'अब उसे पाठ 13 के 3 पैराग्राफ देकर कहो: "हर पैरा में 1 शब्द छाँटो जो उस पैरा का राज़ खोले — फिर तीनों को मिलाकर पाठ का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, काल, वाच्य, और.',
          hint: 'अगर पहचान में अटकें तो कक्षा 5 के व्याकरण अभ्यास (वाक्य-छेदन, पद-परिचय, काल-परिवर्तन).',
          misconception: 'छात्र समझते हैं कि "व्याकरण में भाषा-प्रयोग" का मतलब है **वाक्यों को शुद्ध करना** (त्रुटि सुधार), जबकि असल में यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, काल, वाच्य, और विराम',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, काल, वाच्य, और विराम', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है'],
                  hint: 'अगर पहचान में अटकें तो कक्षा 5 के व्याकरण अभ्यास (वाक्य-छेदन, पद-परिचय, काल-परिवर्तन) दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि "व्याकरण में भाषा-प्रयोग" का मतलब है **वाक्यों को शुद्ध करना** (त्रुटि सुधार), जबकि असल में यह **लेखक के चयनों की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 13 का **एक छोटा अंश (3-4 वाक्य)** दो और कहो: "इसे **बिना अर्थ बदले** तीन तरह से लिखो: (क) केवल छोटे.', 'फिर तीनों संस्करण साथ रखो और पूछो: "कौन-सा संस्करण **उदासी** दिखाता है?', 'लेखक ने मूल में क्या चुना और क्यों?" 3.', 'छात्र जब **प्रभाव** बताने लगे (नियम नहीं), तब समझो धारणा बदली। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_012', difficulty: 'standard',
          question: 'Vastu-nishtha (objective) questions test literal comprehension by asking for.',
          hint: 'Review c6_hin_cbse_13_002 (plot sequence) and c6_hin_cbse_13_004 (main character\'s.',
          misconception: 'Students believe that ashay-suchak questions are "opinion questions" where any answer is correct as long as they "feel".',
          parts: [
                { id: 'a', prompt: 'पाठ में से एक वस्तुनिष्ठ (वास्तुनिष्ठ) प्रश्न का उदाहरण दीजिए और बताइए कि उसका उत्तर पाठ में कहाँ मिलेगा।', answer: 'उदाहरण: "नायक का नाम क्या है?"',
                  options: ['उदाहरण: "नायक का नाम क्या है?"', 'opinion questions'],
                  hint: 'Review c6_hin_cbse_13_002 (plot sequence) and c6_hin_cbse_13_004 (main character\'s actions) using.',
                  misconception: 'Students believe that ashay-suchak questions are "opinion questions" where any answer is correct as long as they "feel" it.' },
                { id: 'b', prompt: 'नीचे दिए गए अंश को पढ़कर वास्तुनिष्ठ और आशय-सूचक — एक-एक प्रश्न बनाइए और उनके उत्तर लिखिए: "रामू ने टूटी हुई साइकिल को घंटों सुधारा। उसके हाथ तेल से सने थे, पर.', answer: 'वास्तुनिष्ठ: "रामू ने क्या सुधारा?"',
                  options: ['वास्तुनिष्ठ: "रामू ने क्या सुधारा?"', 'opinion questions'],
                  hint: 'Review c6_hin_cbse_13_002 (plot sequence) and c6_hin_cbse_13_004 (main character\'s actions) using.',
                  misconception: 'Students believe that ashay-suchak questions are "opinion questions" where any answer is correct as long as they "feel" it.' },
                { id: 'c', prompt: 'दोनों प्रकार के प्रश्नों की तुलना करें: वास्तुनिष्ठ प्रश्न का उत्तर देते समय आप पाठ को कैसे पढ़ते हैं, और आशय-सूचक प्रश्न का उत्तर देते समय पढ़ने का तरीका कैसे.', answer: 'वास्तुनिष्ठ के लिए पाठ को **स्किम/स्कैन** करते हैं',
                  options: ['वास्तुनिष्ठ के लिए पाठ को **स्किम/स्कैन** करते हैं', 'opinion questions'],
                  hint: 'Review c6_hin_cbse_13_002 (plot sequence) and c6_hin_cbse_13_004 (main character\'s actions) using.',
                  misconception: 'Students believe that ashay-suchak questions are "opinion questions" where any answer is correct as long as they "feel" it.' }
          ],
            remediations: { 'ashay-suchak-questions-are-opinion': { steps: ['Give the student a 3-column table: **Question | Text Evidence (Exact Words) | My Reasoning**.', 'Practice with 5 vastunishtha questions first — fill only the first two columns — to build confidence in locating facts.', 'Switch to 3 ashay-suchak questions; now require all three columns.', 'Teacher models one: "Question: Why did Meena hide the letter?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
