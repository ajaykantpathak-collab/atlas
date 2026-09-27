import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch05_p1: SimDef = {
    id: 'v3_c12_hin_a_ch05_p1',
    title: 'रघुवीर सहाय · Part 1/3',
    subtitle: 'When the wheel stops, a whole culture stops',
    classLevel: 12, subject: 'hin_a', topic: 'रघुवीर सहाय · Part 1/3',
    chapters: ['c12_hin_a_ch05'],
    nodeIds: ['c12_hin_a_cbse_05_001', 'c12_hin_a_cbse_05_002', 'c12_hin_a_cbse_05_003', 'c12_hin_a_cbse_05_004', 'c12_hin_a_cbse_05_005', 'c12_hin_a_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social-realist poetry reader', intro: 'A journalist-poet sets down his notebook and picks up the potter\'s vocabulary instead.', goal: 'Read the potter poems through Jagdish Lalak\'s journalistic eye — dialect as realism, craft as vanishing culture.' },
    discovery: {
        question: 'A journalist-poet writes about a Haryana potter in the potter\'s own dialect — \'fiQjdh\', \'uanu\' and all. Why not translate him into polished Hindi?',
        options: ['Dialect is realism and empathy — the village must sound like itself; polishing it would break the very world the poem honours', 'Dialect is just flavour', 'He lacked vocabulary', 'To test the reader'],
        answer: 'Dialect is realism and empathy — the village must sound like itself; polishing it would break the very world the poem honours',
        hook: 'The potter and his wheel are one system — body, skill and cyclical tradition; when the wheel stops, a culture stops. Journalism taught Lalak the colloquial register that reaches beyond Haryana — local speech, universal hearing.',
    },
    teaching: [
        { title: 'रघुवीर सहाय — कवि परिचय और पृष्ठभूमि', text: 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ स्वातंत्र्योत्तर भारत के मोहभंग, राजनैतिक छल, और मध्यवर्गीय नैतिक संकट को बेबाकी से उजागर करती हैं। उनकी कविता.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Listen at the potter\'s wheel: weigh dialect as documentary fidelity, read man and wheel as a single craft, and feel what\'s lost when such poems stop being written.',
        labels: ['रघुवीर सहाय — कवि', 'रघुवीर सहाय — पद्यांश-वार', 'रघुवीर सहाय — काव्य-संरचना', 'रघुवीर सहाय — केंद्रीय', 'रघुवीर सहाय — छंद', 'रघुवीर सहाय — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a documentary assignment on the old woman who has carried loads at the mandi for fifty years, your partner wants to end on a sponsor\'s donation — \'give it a clean resolution so it doesn\'t feel unfinished.\'',
            decisions: [{ prompt: 'What does the ending of Nagarjun\'s poem about the old woman suggest?', options: [
                { text: 'End with the question, not the fix — the poem closes by turning from her story to a direct question at the reader, making society\'s neglect the unresolved fact; a sponsor\'s cheque would manufacture closure the reality hasn\'t earned.', outcome: 'The chapter calls this the modernist open resolution: the story hands responsibility to the audience instead of discharging it — your film should do the same.' },
                { text: 'Use the donation ending — leaving a documentary unresolved is weak storytelling.', outcome: 'That reads closure as craft; the poem shows the unanswered ending is the stronger structure because the neglect is real and continuing — a neat fix would lie.', reveals: 'endings-must-resolve' },
                { text: 'End on her statistics — years worked, loads carried — so the film closes with evidence, not sentiment.', outcome: 'Numbers summarise her but don\'t turn the gaze; the poem\'s final move is a question that conscripts the viewer — data can\'t perform that transfer of responsibility.', reveals: 'data-is-the-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear dialect as the poem\'s conscience — a vanishing world recorded in its own accent.',
            decisions: [{ prompt: 'What comes next? रघुवीर सहाय · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — रघुवीर सहाय · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_001', difficulty: 'standard',
          question: 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी.',
          hint: 'अगर \'नई कविता\' और \'समकालीन कविता\' का भेद स्पष्ट न हो, तो कक्षा 11 हिंदी अंतरा की.',
          misconception: 'छात्र अक्सर रघुवीर सहाय को \'निराला/मुक्तिबोध की परंपरा का कठिन कवि\' मानकर उनके जीवन-परिचय को \'रटने लायक तथ्य\' समझ लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ',
                  options: ['रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे', 'केंद्रीय भाव वह मूल विचार या सन्देश है जो कविता के माध्यम से कवि व्यक्त करना चाहता है,'],
                  hint: 'अगर \'नई कविता\' और \'समकालीन कविता\' का भेद स्पष्ट न हो, तो कक्षा 11 हिंदी अंतरा की \'पाठ्यक्रम संरचना\'.',
                  misconception: 'छात्र अक्सर रघुवीर सहाय को \'निराला/मुक्तिबोध की परंपरा का कठिन कवि\' मानकर उनके जीवन-परिचय को \'रटने लायक तथ्य\' समझ लेते हैं। असल में सहाय की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को \'दिनमान\' के किसी पुराने अंक का संपादकीय पढ़वाएँ (ऑनलाइन उपलब्ध) — देखें कि संपादक कैसे \'सरकारी भाषा\' को काटता.', 'कक्षा में \'राष्ट्रपति भवन\' कविता का पहला पैरा जोर से पढ़वाएँ — पूछें: "यहाँ कौन बोल रहा है?', 'तुलना करवाएँ: निराला की \'राम की शक्तिपूजा\' vs सहाय की \'लोग भूल गए हैं\' — दोनों में \'शक्ति\' कहाँ है?', 'पुनः डायग्नोस्टिक प्रश्न 2 और 4 दें — अब छात्र \'संपादक-कवि द्वैत\' पहचान पाएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश).',
          hint: 'यदि छात्र भावार्थ निकालने में कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_05_001 (कवि.',
          misconception: 'छात्र अक्सर यह मान लेते हैं कि यदि वे पद्यांश के सभी शब्दों के शब्दार्थ जानते हैं तो उन्होंने उसका भावार्थ निकाल लिया.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग',
                  options: ['पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे', 'केंद्रीय भाव वह मूल विचार या सन्देश है जो कविता के माध्यम से कवि व्यक्त करना चाहता है,'],
                  hint: 'यदि छात्र भावार्थ निकालने में कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_05_001 (कवि परिचय और.',
                  misconception: 'छात्र अक्सर यह मान लेते हैं कि यदि वे पद्यांश के सभी शब्दों के शब्दार्थ जानते हैं तो उन्होंने उसका भावार्थ निकाल लिया है, जैसे कि कोई.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले एक 간단한 वाक्य दें जैसे "मैं ठीक हूँ" और पूछें कि क्या यह हमेशा सच्चा है - फिर बताएँ कि टोन, संदर्भ और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे — stanza विभाजन, पंक्तियों.',
          hint: 'कक्षा 11 में काव्य-संरचना और पद्य-विन्यास (c11_hin_a_cbse_05_003) की अवधारणा को पुनः.',
          misconception: 'छात्र अक्सर मानते हैं कि रघुवीर सहाय की कविता में असमान stanza लंबाई, बदलता rhyme scheme, या अनियमित meter केवल तकनीकी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे',
                  options: ['काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'केंद्रीय भाव वह मूल विचार या सन्देश है जो कविता के माध्यम से कवि व्यक्त करना चाहता है,'],
                  hint: 'कक्षा 11 में काव्य-संरचना और पद्य-विन्यास (c11_hin_a_cbse_05_003) की अवधारणा को पुनः देखें — विशेष.',
                  misconception: 'छात्र अक्सर मानते हैं कि रघुवीर सहाय की कविता में असमान stanza लंबाई, बदलता rhyme scheme, या अनियमित meter केवल तकनीकी गलतियाँ या व्याकरणिक.' }
          ],
            remediations: { 'stanza': { steps: ['छात्र को पहले एक परिचित पारंपरिक कविता (जैसे दोहा या sorath) दें और पूछें कि इसका रूप कैसा है और यह भाव को कैसे सहारा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_004', difficulty: 'standard',
          question: 'केंद्रीय भाव वह मूल विचार या सन्देश है जो कविता के माध्यम से कवि व्यक्त करना.',
          hint: 'यदि छात्र केंद्रीय भाव और रस में अंतर नहीं कर पा रहा है, तो उसे c12_hin_a_cbse_05_002.',
          misconception: 'छात्र अक्सर मानते हैं कि रस केवल कविता में उपस्थित emocion शब्दों (जैसे "दुःख", "खुशी") से निर्धारित होता है—जैसे कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव वह मूल विचार या सन्देश है जो कविता के माध्यम से कवि व्यक्त करना चाहता है,',
                  options: ['केंद्रीय भाव वह मूल विचार या सन्देश है जो कविता के माध्यम से कवि व्यक्त करना चाहता है,', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे'],
                  hint: 'यदि छात्र केंद्रीय भाव और रस में अंतर नहीं कर पा रहा है, तो उसे c12_hin_a_cbse_05_002 (भावार्थ) और.',
                  misconception: 'छात्र अक्सर मानते हैं कि रस केवल कविता में उपस्थित emocion शब्दों (जैसे "दुःख", "खुशी") से निर्धारित होता है—जैसे कि अगर कविता में "दुःख".' }
          ],
            remediations: { 'emocion': { steps: ['छात्र को दिखाइए कि एक ही शब्द "दुःख" दो अलग-अलग कविताओं में दो अलग-अलग रस उत्पन्न कर सकता है: एक कविता में जहां यह धीमे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_005', difficulty: 'standard',
          question: 'छंद कविता का वह निश्चित मात्रिक या वार्णिक ढांचा है जिसमें प्रत्येक पंक्ति के.',
          hint: 'यदि मात्रा गिनने में अटके: प्रत्येक शब्द को बोलकर, ताली बजाकर गुरु/लघु पहचानें — लिखित.',
          misconception: '**सबसे बड़ी भ्रांति:** "छंद = तुकबंदी (राइम)" और "लय = गाना गाने जैसा"। छात्र सोचते हैं कि अंत में आने वाले शब्द.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद कविता का वह निश्चित मात्रिक या वार्णिक ढांचा है जिसमें प्रत्येक पंक्ति के चरणों में',
                  options: ['छंद कविता का वह निश्चित मात्रिक या वार्णिक ढांचा है जिसमें प्रत्येक पंक्ति के चरणों में', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे'],
                  hint: 'यदि मात्रा गिनने में अटके: प्रत्येक शब्द को बोलकर, ताली बजाकर गुरु/लघु पहचानें — लिखित नियम से पहले.',
                  misconception: '**सबसे बड़ी भ्रांति:** "छंद = तुकबंदी (राइम)" और "लय = गाना गाने जैसा"। छात्र सोचते हैं कि अंत में आने वाले शब्द मिलते-जुलते हों (जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "किसी भी कविता की एक पंक्ति लो, प्रत्येक शब्द के नीचे \'गु\' (गुरु) या \'ल\' (लघु) लिखो। नियम: दीर्घ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_006', difficulty: 'standard',
          question: 'अलंकार वे साहित्यिक युक्तियाँ हैं जो भाषा में सजावट, प्रभाव और गहराई लाने के.',
          hint: 'यदि छात्र रूपक और उपमा में अंतर नहीं कर पा रहा है तो उसे c12_hin_a_cbse_05_002.',
          misconception: 'छात्र अक्सर रूपक और उपमा के बीच के अंतर को ध्वनि या लय के आधार पर समझने की कोशिश करते हैं, जबकि वास्तविक अंतर तुलना के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार वे साहित्यिक युक्तियाँ हैं जो भाषा में सजावट, प्रभाव और गहराई लाने के लिए प्रयोग',
                  options: ['अलंकार वे साहित्यिक युक्तियाँ हैं जो भाषा में सजावट, प्रभाव और गहराई लाने के लिए प्रयोग', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे'],
                  hint: 'यदि छात्र रूपक और उपमा में अंतर नहीं कर पा रहा है तो उसे c12_hin_a_cbse_05_002 (पद्यांश-वार.',
                  misconception: 'छात्र अक्सर रूपक और उपमा के बीच के अंतर को ध्वनि या लय के आधार पर समझने की कोशिश करते हैं, जबकि वास्तविक अंतर तुलना के तरीके में है: उपमा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो पंक्तियाँ दीजिए: (1) "उसकी हँसी फूल जैसी है" (2) "उसकी हँसी एक फूल है" फिर पूछिए: किसमें \'जैसा\' शब्द है और.', 'फिर स्पष्ट कीजिए कि \'जैसा\' की presenza उपमा को दर्शाता है और उसकी absence रूपक को। इस अभ्यास को 3-4 अलग-अलग उदाहरणों के.', 'इससे वह रूपक और उपमा के बीच के संरचनात्मक अंतर को महसूस करना शुरू कर देगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
