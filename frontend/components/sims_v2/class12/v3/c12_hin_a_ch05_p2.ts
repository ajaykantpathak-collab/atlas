import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch05_p2: SimDef = {
    id: 'v3_c12_hin_a_ch05_p2',
    title: 'रघुवीर सहाय · Part 2/3',
    subtitle: 'When the wheel stops, a whole culture stops',
    classLevel: 12, subject: 'hin_a', topic: 'रघुवीर सहाय · Part 2/3',
    chapters: ['c12_hin_a_ch05'],
    nodeIds: ['c12_hin_a_cbse_05_007', 'c12_hin_a_cbse_05_008', 'c12_hin_a_cbse_05_009', 'c12_hin_a_cbse_05_010', 'c12_hin_a_cbse_05_011', 'c12_hin_a_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social-realist poetry reader', intro: 'A journalist-poet sets down his notebook and picks up the potter\'s vocabulary instead.', goal: 'Read the potter poems through Jagdish Lalak\'s journalistic eye — dialect as realism, craft as vanishing culture.' },
    discovery: {
        question: 'A journalist-poet writes about a Haryana potter in the potter\'s own dialect — \'fiQjdh\', \'uanu\' and all. Why not translate him into polished Hindi?',
        options: ['Dialect is realism and empathy — the village must sound like itself; polishing it would break the very world the poem honours', 'Dialect is just flavour', 'He lacked vocabulary', 'To test the reader'],
        answer: 'Dialect is realism and empathy — the village must sound like itself; polishing it would break the very world the poem honours',
        hook: 'The potter and his wheel are one system — body, skill and cyclical tradition; when the wheel stops, a culture stops. Journalism taught Lalak the colloquial register that reaches beyond Haryana — local speech, universal hearing.',
    },
    teaching: [
        { title: 'रघुवीर सहाय — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**बिंब (Imagery):** काव्य-भाषा में प्रयुक्त वे शब्द या पद जो पाठक की पाँचों इंद्रियों (दृष्टि, श्रवण, घ्राण, स्पर्श, स्वाद) को जगाकर कोई ठोस अनुभूति (concrete sensation) उत्पन्न करते हैं। **प्रतीक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Listen at the potter\'s wheel: weigh dialect as documentary fidelity, read man and wheel as a single craft, and feel what\'s lost when such poems stop being written.',
        labels: ['रघुवीर सहाय — साहित्यिक', 'रघुवीर सहाय — मुख्य', 'रघुवीर सहाय — गौण', 'रघुवीर सहाय — पदावली', 'रघुवीर सहाय — व्याकरण', 'रघुवीर सहाय — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a documentary assignment on the old woman who has carried loads at the mandi for fifty years, your partner wants to end on a sponsor\'s donation — \'give it a clean resolution so it doesn\'t feel unfinished.\'',
            decisions: [{ prompt: 'What does the ending of Nagarjun\'s poem about the old woman suggest?', options: [
                { text: 'End with the question, not the fix — the poem closes by turning from her story to a direct question at the reader, making society\'s neglect the unresolved fact; a sponsor\'s cheque would manufacture closure the reality hasn\'t earned.', outcome: 'The chapter calls this the modernist open resolution: the story hands responsibility to the audience instead of discharging it — your film should do the same.' },
                { text: 'Use the donation ending — leaving a documentary unresolved is weak storytelling.', outcome: 'That reads closure as craft; the poem shows the unanswered ending is the stronger structure because the neglect is real and continuing — a neat fix would lie.', reveals: 'endings-must-resolve' },
                { text: 'End on her statistics — years worked, loads carried — so the film closes with evidence, not sentiment.', outcome: 'Numbers summarise her but don\'t turn the gaze; the poem\'s final move is a question that conscripts the viewer — data can\'t perform that transfer of responsibility.', reveals: 'data-is-the-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear dialect as the poem\'s conscience — a vanishing world recorded in its own accent.',
            decisions: [{ prompt: 'What comes next? रघुवीर सहाय · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — रघुवीर सहाय · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_007', difficulty: 'standard',
          question: '**बिंब (Imagery):** काव्य-भाषा में प्रयुक्त वे शब्द या पद जो पाठक की पाँचों.',
          hint: 'यदि फँस जाएँ तो **c11_hin_a_cbse_13_007 (जाग तुझको दूर जाना — प्रतीक और बिंब)** पर लौटें.',
          misconception: '**गलतफहमी:** "बिंब और प्रतीक दोनों \'अलंकार\' के प्रकार हैं, इसलिए इन्हें अलंकार की तरह ही पहचानो — जैसे \'उपमा\' में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** काव्य-भाषा में प्रयुक्त वे शब्द या पद जो पाठक की पाँचों इंद्रियों',
                  options: ['**बिंब (Imagery):** काव्य-भाषा में प्रयुक्त वे शब्द या पद जो पाठक की पाँचों इंद्रियों', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे'],
                  hint: 'यदि फँस जाएँ तो **c11_hin_a_cbse_13_007 (जाग तुझको दूर जाना — प्रतीक और बिंब)** पर लौटें — वहाँ.',
                  misconception: '**गलतफहमी:** "बिंब और प्रतीक दोनों \'अलंकार\' के प्रकार हैं, इसलिए इन्हें अलंकार की तरह ही पहचानो — जैसे \'उपमा\' में \'जैसे\' आता है, वैसे ही.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** कविता का कोई एक पद चुनो (जैसे दूसरा पद)। **चरण 2:** तीन रंग के पेन लो: लाल = दृश्य बिंब, नीला = श्रव्य बिंब.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_008', difficulty: 'standard',
          question: 'किसी रचना का **मुख्य भाव** वह केंद्रीय विचार या संदेश है जिसे रचनाकार पाठक तक.',
          hint: 'यदि अटके हों, तो **नोड 002 (भावार्थ)** और **नोड 007 (प्रतीक/बिंब)** पर लौटकर **प्रत्येक.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **"मुख्य भाव" = "कवि क्या कहना चाहता है" का एक-लाइन सारांश** होता है (जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'किसी रचना का **मुख्य भाव** वह केंद्रीय विचार या संदेश है जिसे रचनाकार पाठक तक पहुँचाना',
                  options: ['किसी रचना का **मुख्य भाव** वह केंद्रीय विचार या संदेश है जिसे रचनाकार पाठक तक पहुँचाना', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे'],
                  hint: 'यदि अटके हों, तो **नोड 002 (भावार्थ)** और **नोड 007 (प्रतीक/बिंब)** पर लौटकर **प्रत्येक पद के लिए.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **"मुख्य भाव" = "कवि क्या कहना चाहता है" का एक-लाइन सारांश** होता है (जैसे: "भ्रष्टाचार बुरा है")।.' }
          ],
            remediations: { 'tension': { steps: ['**पुनः पढ़ें**: नोड **c12_hin_a_cbse_05_002** (पद्यांश-वार भावार्थ) और **c12_hin_a_cbse_05_007** (प्रतीक और बिंब).', '**तुलना करें**: नोड **c11_hin_a_cbse_13_008** (जाग तुझको दूर जाना — मुख्य भाव) और **c11_hin_a_cbse_16_008** (घर में.', '**अभ्यास**: बोर्ड के गत 5 वर्षों के **आशय-स्पष्टीकरण प्रश्न** (3-4 अंक) हल करें — हर उत्तर में **PEEL** ढाँचा लगाएँ। 4.', '**पुनः निदान**: उपरोक्त **DIAGNOSTIC_QUESTION_3** और **_5** दोबारा हल करें — यदि अब सही होते हैं, तो आगे बढ़ें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_009', difficulty: 'standard',
          question: 'गौण भाव वह हल्का, सहायक भाव है जो कविता के मुख्य भाव को सपोर्ट करता है, जबकि.',
          hint: 'यदि फंसे तो मुख्य भाव और रस (c12_hin_a_cbse_05_004) की समीक्षा करें, विशेषकर उन उदाहरणों.',
          misconception: 'छात्र अक्सर गौण भाव को इसलिए विषयांतर मान लेते हैं क्योंकि वह अधिक स्पष्ट, विस्तृत या भावुक लगता है, भले ही उसका कार्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव वह हल्का, सहायक भाव है जो कविता के मुख्य भाव को सपोर्ट करता है, जबकि विषयांतर तब',
                  options: ['गौण भाव वह हल्का, सहायक भाव है जो कविता के मुख्य भाव को सपोर्ट करता है, जबकि विषयांतर तब', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे'],
                  hint: 'यदि फंसे तो मुख्य भाव और रस (c12_hin_a_cbse_05_004) की समीक्षा करें, विशेषकर उन उदाहरणों को जहाँ.',
                  misconception: 'छात्र अक्सर गौण भाव को इसलिए विषयांतर मान लेते हैं क्योंकि वह अधिक स्पष्ट, विस्तृत या भावुक लगता है, भले ही उसका कार्य मुख्य भाव का समर्थन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो पद्यांश दें: एक जहाँ गौण भाव स्पष्ट है लेकिन मुख्य भाव को सपोर्ट करता है (जैसेviraha में प्रकृति का शांत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_010', difficulty: 'standard',
          question: '**पदावली** कविता में प्रयुक्त विशिष्ट शब्द-समूह (lexical items) का वह संकलन है.',
          hint: 'यदि फँस जाएँ तो **पद्यांश-वार भावार्थ (c12_hin_a_cbse_05_002)** पर लौटें और उस विशिष्ट.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कठिन शब्द" का अर्थ **केवल संस्कृतनिष्ठ/तत्सम शब्द** (Sanskritized/tatsama.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पदावली** कविता में प्रयुक्त विशिष्ट शब्द-समूह (lexical items) का वह संकलन है जिसमें',
                  options: ['**पदावली** कविता में प्रयुक्त विशिष्ट शब्द-समूह (lexical items) का वह संकलन है जिसमें', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे'],
                  hint: 'यदि फँस जाएँ तो **पद्यांश-वार भावार्थ (c12_hin_a_cbse_05_002)** पर लौटें और उस विशिष्ट पंक्ति को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कठिन शब्द" का अर्थ **केवल संस्कृतनिष्ठ/तत्सम शब्द** (Sanskritized/tatsama words) होता है और.' }
          ],
            remediations: { 'sanskritized-tatsama-words': { steps: ['**चरणबद्ध उपचार (remediation):** 1.', '**पुनः पठन (re-reading):** कविता के **पद्यांश-वार भावार्थ** (c12_hin_a_cbse_05_002) को दोबारा पढ़ें और हर पंक्ति में आए.', '**तालिका निर्माण:** दो स्तंभ बनाएँ — **स्तंभ A:** शब्द/मुहावरा (शाब्दिक अर्थ), **स्तंभ B:** कविता में प्रसंगानुकूल.', '**मुहावरा-विश्लेषण अभ्यास:** कविता से किन्हीं 3 मुहावरों को चुनें और प्रत्येक के लिए लिखें: (क) शाब्दिक अर्थ, (ख).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_011', difficulty: 'standard',
          question: 'रघुवीर सहाय की कविताओं में भाषा-प्रयोग से तात्पर्य शब्द चयन, वाक्य रचना, लय-छंद.',
          hint: 'यदि फंसे हुए हों, तो कक्षा 11 के \'व्याकरण: पाठ में भाषा-प्रयोग\' (c11_hin_a_cbse_05_011).',
          misconception: 'छात्र अक्सर मानते हैं कि रघुवीर सहाय की कविता में भाषा-प्रयोग का अर्थ केवल अलंकार (जैसे रूपक, उपमा) या कठिन शब्दों का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रघुवीर सहाय की कविताओं में भाषा-प्रयोग से तात्पर्य शब्द चयन, वाक्य रचना, लय-छंद और',
                  options: ['रघुवीर सहाय की कविताओं में भाषा-प्रयोग से तात्पर्य शब्द चयन, वाक्य रचना, लय-छंद और', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे'],
                  hint: 'यदि फंसे हुए हों, तो कक्षा 11 के \'व्याकरण: पाठ में भाषा-प्रयोग\' (c11_hin_a_cbse_05_011) को फिर से.',
                  misconception: 'छात्र अक्सर मानते हैं कि रघुवीर सहाय की कविता में भाषा-प्रयोग का अर्थ केवल अलंकार (जैसे रूपक, उपमा) या कठिन शब्दों का उपयोग करना है, इसलिए.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक सरल कविता की पंक्ति दें जिसमें केवल दोहराव और विराम चिह्न हो (जैसे: "रुको...', 'रुको..."), और पूछें: "इस दोहराव और विराम के कारण आपका मन कैसा महसूस कर रहा है?', 'क्या आप तेज़ चलना चाहते हैं या रुकना?" फिर स्पष्ट करें कि विराम चिह्न प्रत्येक शब्द को बल देता है, और दोहराव से भाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ बोध-प्रश्न वे होते हैं जिनके उत्तर पाठ में सीधे लिखे हुए होते हैं और.',
          hint: 'यदि छात्र आशय-सूचक प्रश्नों के उत्तर में केवल पाठ की दोहराव दे रहा है, तो उसे.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में पाठ से प्रत्यक्ष उद्धरण दे देते हैं और मानते हैं कि उनका काम पूरा हो गया है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ बोध-प्रश्न वे होते हैं जिनके उत्तर पाठ में सीधे लिखे हुए होते हैं और जिनका सही',
                  options: ['वस्तुनिष्ठ बोध-प्रश्न वे होते हैं जिनके उत्तर पाठ में सीधे लिखे हुए होते हैं और जिनका सही', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे'],
                  hint: 'यदि छात्र आशय-सूचक प्रश्नों के उत्तर में केवल पाठ की दोहराव दे रहा है, तो उसे c12_hin_a_cbse_05_004.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में पाठ से प्रत्यक्ष उद्धरण दे देते हैं और मानते हैं कि उनका काम पूरा हो गया है, जैसे कि "कविता में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही वाक्य अलग-अलग संदर्भों में अलग अर्थ दे सकता है। उदाहरण: "दिया बुझ गया" — एक विज्ञान पाठ में.', 'इस प्रकार रूपक के भावनात्मक अर्थ को जोड़कर समझाइए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
