import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch10_p1: SimDef = {
    id: 'v3_c8_hin_ch10_p1',
    title: 'तरुण के स्वप्न · Part 1/3',
    subtitle: 'यह नोड **केवल** शिवमूर्ति का संक्षिप्त जीवन परिचय, उनकी रचना-प्रक्रिया की विशेषताएँ.',
    classLevel: 8, subject: 'hin', topic: 'तरुण के स्वप्न · Part 1/3',
    chapters: ['c8_hin_ch10'],
    nodeIds: ['c8_hin_cbse_10_001', 'c8_hin_cbse_10_002', 'c8_hin_cbse_10_003', 'c8_hin_cbse_10_004', 'c8_hin_cbse_10_005', 'c8_hin_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'मान लो तुमने अख़बार में पढ़ा कि किसी गाँव में एक दलित युवक को सिर्फ़ इसलिए पीटा गया क्योंकि उसने ऊँची जाति के.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'तरुण के स्वप्न — पृष्ठभूमि और रचनाकार परिचय', text: '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के जीवन वृत्त, रचनाकालीन सामाजिक-राजनीतिक परिस्थितियों, और रचना के उद्देश्य का व्यवस्थित अध्ययन किया जाता है ताकि.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तरुण के स्वप्न —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through तरुण के स्वप्न like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? तरुण के स्वप्न · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तरुण के स्वप्न · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_001', difficulty: 'standard',
          question: '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें.',
          hint: 'यदि अटका हुआ महसूस हो तो: कक्षा 7 के नोड **c7_hin_cbse_10_001 (मीरा के पद — कवि परिचय और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "पृष्ठभूमि और रचनाकार परिचय" = **तथ्यों की सूची** (जन्मतिथि, जन्मस्थान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के',
                  options: ['"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,', 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के बाह्य रूप, स्वभाव, विचारों,'],
                  hint: 'यदि अटका हुआ महसूस हो तो: कक्षा 7 के नोड **c7_hin_cbse_10_001 (मीरा के पद — कवि परिचय और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "पृष्ठभूमि और रचनाकार परिचय" = **तथ्यों की सूची** (जन्मतिथि, जन्मस्थान, पुरस्कार, प्रमुख कृतियाँ)।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला चरण (5 मिनट):** छात्र से पूछो — "अगर तुम अपने गाँव/मोहल्ले की कहानी लिखोगे, तो तुम्हारी जाति/धर्म/आर्थिक स्थिति.', '**दूसरा चरण (10 मिनट):** कहानी का एक छोटा अंश (जहाँ तरुण कुएँ पर जाता है) पढ़वाओ और पूछो — "यह दृश्य लिखने के लिए लेखक.', '**तीसरा चरण (गृहकार्य):** शिवमूर्ति का कोई साक्षात्कार (यूट्यूब/पत्रिका) दिखाओ जहाँ वे अपनी रचना-प्रक्रिया बताते हों।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_002', difficulty: 'standard',
          question: 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है.',
          hint: 'अगर अटके तो कक्षा 7 के \'कथानक और आख्यान-संरचना\' नोड (c7_hin_cbse_02_002) का \'पाँच सोपान\'.',
          misconception: 'विद्यार्थी अक्सर समझते हैं कि \'कथानक\' और \'आख्यान-संरचना\' एक ही हैं — क्योंकि दोनों \'कहानी कैसे चली\' बताते लगते हैं। असल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि',
                  options: ['कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,', 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के बाह्य रूप, स्वभाव, विचारों,'],
                  hint: 'अगर अटके तो कक्षा 7 के \'कथानक और आख्यान-संरचना\' नोड (c7_hin_cbse_02_002) का \'पाँच सोपान\' और.',
                  misconception: 'विद्यार्थी अक्सर समझते हैं कि \'कथानक\' और \'आख्यान-संरचना\' एक ही हैं — क्योंकि दोनों \'कहानी कैसे चली\' बताते लगते हैं। असल में कथानक = *क्या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: विद्यार्थी से कहो: "कहानी की 5 मुख्य घटनाएँ कागज़ पर क्रम से लिखो (यही कथानक है)।" चरण 2: फिर पूछो: "लेखक ने.', 'पहली घटना जो पाठ में आती है, वह कहानी की पहली घटना है क्या?" चरण 3: एक टेबल बनवाओ: बायाँ कॉलम \'कथानक क्रम\' (घटनाओं का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details.',
          hint: 'If stuck, review **\'Show, Don\'t Tell\' (दिखाओ, बताओ मत)** technique from Class 7 Creative.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि **\'पाठ्य-परिवेश = स्थान का नाम\' (जैसे: गाँव, शहर)** और **\'वातावरण = विशेषण\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,',
                  options: ['पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के बाह्य रूप, स्वभाव, विचारों,'],
                  hint: 'If stuck, review **\'Show, Don\'t Tell\' (दिखाओ, बताओ मत)** technique from Class 7 Creative Writing.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि **\'पाठ्य-परिवेश = स्थान का नाम\' (जैसे: गाँव, शहर)** और **\'वातावरण = विशेषण\' (जैसे: अच्छा, बुरा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (दृश्यीकरण):** विद्यार्थी से कहें: "आँख बंद करो। पाठ के पहले पैराग्राम का *कोई एक* दृश्य मन में बनाओ — दीवार का.', '**चरण 2 (पृथक्करण):** एक टेबल बनाएँ: बाएँ कॉलम में **\'पाठ में लिखे शब्द\'** (उद्धरण), दाएँ में **\'मेरे मन में उठा.', '**चरण 3 (सामान्यीकरण):** पूछें: "क्या सभी विवरण एक ही भाव दे रहे हैं?', 'किन्हीं दो विवरणों में तनाव (Tension) है?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के बाह्य रूप, स्वभाव.',
          hint: 'यदि फँस जाएँ तो c7_hin_cbse_01_004 (पात्र-चित्रण की चरणबद्ध विधि) और c8_hin_cbse_10_002.',
          misconception: 'छात्र प्रायः मान लेते हैं कि \'स्वप्न देखने वाला पात्र\' = \'अव्यावहारिक/कल्पनालोक में जीने वाला\'। तरुण के प्रसंग में यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के बाह्य रूप, स्वभाव, विचारों,',
                  options: ['पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के बाह्य रूप, स्वभाव, विचारों,', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,'],
                  hint: 'यदि फँस जाएँ तो c7_hin_cbse_01_004 (पात्र-चित्रण की चरणबद्ध विधि) और c8_hin_cbse_10_002 (स्वप्नों.',
                  misconception: 'छात्र प्रायः मान लेते हैं कि \'स्वप्न देखने वाला पात्र\' = \'अव्यावहारिक/कल्पनालोक में जीने वाला\'। तरुण के प्रसंग में यह भ्रांति इसलिए होती है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ खोलो और तरुण के तीन स्वप्नों के तुरंत बाद के पैराग्राफ पढ़ो — प्रत्येक में उसने क्या **किया**?".', 'फिर पूछें: "क्या कोई स्वप्न ऐसा है जिसके बाद उसने कुछ **नहीं** किया?" (नहीं — हर स्वप्न कर्म को जन्म देता है)। 3.', 'अब समझाएँ: "स्वप्न उसके लिए **मानसिक पूर्वाभ्यास** (mental rehearsal) हैं, जैसे खिलाड़ी मैच से पहले विजुअलाइज़ करता.', 'अंत में पुनः पात्र-चित्रण लिखने को कहें, इस बार \'स्वप्न → क्रिया\' तालिका बनाकर।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_005', difficulty: 'standard',
          question: 'सहायक पात्र-चित्रण का अर्थ है कहानी के गौण पात्रों (पिता, माँ, शिक्षक, मित्र.',
          hint: 'यदि अटके, तो कक्षा 7 के किसी भी पाठ (जैसे c7_hin_cbse_05_005) का सहायक पात्र-चित्रण.',
          misconception: 'छात्र सहायक पात्रों को **\'अच्छे\' या \'बुरे\'** के खांचे में डाल देते हैं — पिता \'बुरे\' क्योंकि विरोध करते हैं, माँ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र-चित्रण का अर्थ है कहानी के गौण पात्रों (पिता, माँ, शिक्षक, मित्र आदि) के',
                  options: ['सहायक पात्र-चित्रण का अर्थ है कहानी के गौण पात्रों (पिता, माँ, शिक्षक, मित्र आदि) के', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,'],
                  hint: 'यदि अटके, तो कक्षा 7 के किसी भी पाठ (जैसे c7_hin_cbse_05_005) का सहायक पात्र-चित्रण दोबारा पढ़ें और.',
                  misconception: 'छात्र सहायक पात्रों को **\'अच्छे\' या \'बुरे\'** के खांचे में डाल देते हैं — पिता \'बुरे\' क्योंकि विरोध करते हैं, माँ \'अच्छी\' क्योंकि चुपचाप साथ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछो: "पिता तरुण को डांटते हैं — क्या वे उससे नफरत करते हैं?', 'पाठ से एक पंक्ति ढूंढो जो उनका प्रेम दिखाती हो।" (उत्तर: "तुम्हारे भविष्य की चिंता है मुझे") 2.', 'फिर माँ के लिए: "माँ बोलती क्यों नहीं?', 'पाठ से एक कार्य ढूंढो जो उसकी ताकत दिखाता हो।" (उत्तर: पिता के क्रोध से तरुण को बचाना, अलग दूध रखना) 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_10_006', difficulty: 'standard',
          question: '**मुख्य विषय (Central Theme):** कहानी का वह केंद्रीय विचार या भाव जो पूरी रचना.',
          hint: 'यदि अटके तो कक्षा 7 के \'मुख्य विषय और संदेश\' (c7_hin_cbse_01_006) का अभ्यास दोहराएँ.',
          misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'तरुण का सपना\' (वैज्ञानिक बनना)** को ही **मुख्य विषय** मान लेते हैं। वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (Central Theme):** कहानी का वह केंद्रीय विचार या भाव जो पूरी रचना में',
                  options: ['**मुख्य विषय (Central Theme):** कहानी का वह केंद्रीय विचार या भाव जो पूरी रचना में', '"पृष्ठभूमि और रचनाकार परिचय" वह साहित्यिक विश्लेषण का आधारभूत चरण है जिसमें रचनाकार के', 'कथानक (plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the concrete, descriptive details of time,'],
                  hint: 'यदि अटके तो कक्षा 7 के \'मुख्य विषय और संदेश\' (c7_hin_cbse_01_006) का अभ्यास दोहराएँ — विशेषकर विषय.',
                  misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'तरुण का सपना\' (वैज्ञानिक बनना)** को ही **मुख्य विषय** मान लेते हैं। वे लिखते हैं: "मुख्य विषय है — तरुण.' }
          ],
            remediations: { '1': { steps: ['**स्पष्ट करो**: "विषय = कहानी का \'दिल\' (बार-बार धड़कने वाला विचार), कथानक = कहानी का \'शरीर\' (घटनाओं का क्रम)।" 2.', '**तुलना कराओ**: दो वाक्य लिखवाओ — (क) "तरुण वैज्ञानिक बनना चाहता था" (घटना) (ख) "सपने यथार्थ से टकराते हैं" (विषय).', '**पाठ से प्रमाण माँगो**: "कहानी में तीन जगह ढूँढ़ो जहाँ सपना और यथार्थ आमने-सामने आएँ (परीक्षा, पिता की बात, शिक्षक का.', '**सामान्यीकरण कराओ**: "अब अपने शब्दों में लिखो — इस कहानी का विषय एक पंक्ति में क्या है?" — इससे अमूर्त अवधारणा ठोस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
