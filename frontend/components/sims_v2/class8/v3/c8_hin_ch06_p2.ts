import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch06_p2: SimDef = {
    id: 'v3_c8_hin_ch06_p2',
    title: 'एक टोकरी भर मट्टिी · Part 2/3',
    subtitle: 'यह नोड केवल "एक टोकरी भर मिट्टी" पाठ के गौण विषयों (माँ-बेटी संबंध, ग्रामीण जीवन की.',
    classLevel: 8, subject: 'hin', topic: 'एक टोकरी भर मट्टिी · Part 2/3',
    chapters: ['c8_hin_ch06'],
    nodeIds: ['c8_hin_cbse_06_007', 'c8_hin_cbse_06_008', 'c8_hin_cbse_06_009', 'c8_hin_cbse_06_010', 'c8_hin_cbse_06_011', 'c8_hin_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करो तुम अपनी नानी के घर गाँव गए हो और वहाँ की मिट्टी की सुगंध तुम्हें अपने शहर के फ्लैट में भी याद आती.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'एक टोकरी भर मट्टिी — गौण विषय', text: 'गौण विषय (उप-विषय) वे सहायक विषय या प्रसंग होते हैं जो कहानी के मुख्य विषय के समानांतर चलते हुए पात्रों, परिवेश और संघर्ष को विस्तार देते हैं, और मुख्य विषय को अधिक अर्थपूर्ण बनाते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['एक टोकरी भर मट्टिी'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through एक टोकरी भर मट्टिी like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? एक टोकरी भर मट्टिी · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — एक टोकरी भर मट्टिी · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_007', difficulty: 'standard',
          question: 'गौण विषय (उप-विषय) वे सहायक विषय या प्रसंग होते हैं जो कहानी के मुख्य विषय के.',
          hint: 'यदि अटका हुआ महसूस हो तो c8_hin_cbse_06_006 (मुख्य विषय) और c8_hin_cbse_06_004/005.',
          misconception: 'विद्यार्थी समझते हैं कि गौण विषय \'कहानी के छोटे-छोटे टॉपिक्स\' हैं जिन्हें सूचीबद्ध करना है। वास्तव में गौण विषय कथानक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (उप-विषय) वे सहायक विषय या प्रसंग होते हैं जो कहानी के मुख्य विषय के समानांतर',
                  options: ['गौण विषय (उप-विषय) वे सहायक विषय या प्रसंग होते हैं जो कहानी के मुख्य विषय के समानांतर', 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान'],
                  hint: 'यदि अटका हुआ महसूस हो तो c8_hin_cbse_06_006 (मुख्य विषय) और c8_hin_cbse_06_004/005 (पात्र-चित्रण).',
                  misconception: 'विद्यार्थी समझते हैं कि गौण विषय \'कहानी के छोटे-छोटे टॉपिक्स\' हैं जिन्हें सूचीबद्ध करना है। वास्तव में गौण विषय कथानक में बुने हुए.' }
          ],
            remediations: { 'undercurrents': { steps: ['विद्यार्थी से कहें: "पाठ के 5 प्रसंग चुनो जहाँ मिट्टी का सीधा उल्लेख न हो, फिर भी मिट्टी की अनुपस्थिति महसूस हो।" 2.', 'प्रत्येक प्रसंग के लिए पूछें: "यहाँ कौन-सी भावना या संघर्ष उभर रहा है?" 3.', 'उन भावनाओं को समूहबद्ध करें — वही गौण विषय हैं। 4.', 'अंत में पूछें: "ये मुख्य विषय \'मिट्टी प्रेम\' को कैसे गहरा करते हैं?" — यह प्रक्रिया तथ्य से विषय तक पहुँचाती है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** शब्दों द्वारा पाठक की पाँचों इंद्रियों (दृष्टि, श्रवण, गंध.',
          hint: 'अगर अटके तो **c7_hin_cbse_07_008** के \'बिंब/रूपक पहचान अभ्यास\' दोहराएँ — विशेषकर.',
          misconception: 'छात्र अक्सर **\'बिंब = चित्र/वर्णन\'** और **\'रूपक = कोई भी तुलना\'** मान लेते हैं। उदाहरण: "मिट्टी लाल है" को दृश्य बिंब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** शब्दों द्वारा पाठक की पाँचों इंद्रियों (दृष्टि, श्रवण, गंध, स्पर्श,',
                  options: ['**बिंब (Imagery)** शब्दों द्वारा पाठक की पाँचों इंद्रियों (दृष्टि, श्रवण, गंध, स्पर्श,', 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान'],
                  hint: 'अगर अटके तो **c7_hin_cbse_07_008** के \'बिंब/रूपक पहचान अभ्यास\' दोहराएँ — विशेषकर \'जैसे/वैसा\' वाले.',
                  misconception: 'छात्र अक्सर **\'बिंब = चित्र/वर्णन\'** और **\'रूपक = कोई भी तुलना\'** मान लेते हैं। उदाहरण: "मिट्टी लाल है" को दृश्य बिंब कहना (जबकि वह मात्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**बिंब के लिए**: छात्र को आँख बंद कराकर कहो — "बरसात की गंध याद करो / बर्फ छूने का एहसास करो / घंटी की आवाज़ सुनो".', '**रूपक के लिए**: दो वाक्य साथ रखो — "जीवन **जैसे** संघर्ष है" (उपमा) बनाम "जीवन **है** संघर्ष" (रूपक) — और पूछो.', '**संयुक्त अभ्यास**: एक पैराग्राफ देकर कहो: "यहाँ हर संवेदना-शब्द को घेरे में लो (बिंब) और हर \'है/थी/बना\' वाली सीधी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_009', difficulty: 'standard',
          question: '**विरोधाभास** वह साहित्यिक युक्ति है जहाँ कथन में दो परस्पर विरोधी बातें एक साथ.',
          hint: 'c8_hin_cbse_06_008 (बिंब और रूपक) को दोहराएँ — विशेष रूप से "बिंब कैसे प्रतीक बनता है" और.',
          misconception: 'छात्र **विरोधाभास** को "गलती" या "झूठ" समझते हैं — जैसे "वह कहता कुछ है, करता कुछ है" को विरोधाभास मान लेते हैं। वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** वह साहित्यिक युक्ति है जहाँ कथन में दो परस्पर विरोधी बातें एक साथ प्रस्तुत',
                  options: ['**विरोधाभास** वह साहित्यिक युक्ति है जहाँ कथन में दो परस्पर विरोधी बातें एक साथ प्रस्तुत', 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान'],
                  hint: 'c8_hin_cbse_06_008 (बिंब और रूपक) को दोहराएँ — विशेष रूप से "बिंब कैसे प्रतीक बनता है" और "रूपक में.',
                  misconception: 'छात्र **विरोधाभास** को "गलती" या "झूठ" समझते हैं — जैसे "वह कहता कुछ है, करता कुछ है" को विरोधाभास मान लेते हैं। वास्तव में साहित्यिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**विरोधाभास स्पष्ट करो:** दो वाक्य लिखवाओ — एक साधारण विरोध ("वह अमीर है पर दुखी है"), एक साहित्यिक विरोधाभास ("उसकी.', '**प्रतीक अभ्यास:** कक्षा की किसी वस्तु (चॉक, ब्लैकबोर्ड, घंटी) को लो — पूछो: "यह क्या दर्शा सकती है?" (चॉक = ज्ञान का.', '**पाठ पर लौटो:** पाठ के दो विरोधाभास और दो प्रतीक मिलकर लिखवाओ, फिर पूछो: "अगर ये युक्तियाँ न होतीं, तो पाठ का प्रभाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द किसी पाठ में आए उन चुने हुए महत्त्वपूर्ण शब्दों का अध्ययन है.',
          hint: 'यदि अटके तो कक्षा 7 की पदावली (c7_hin_cbse_06_010) के \'सांदर्भिक अर्थ\' और \'व्युत्पत्ति\'.',
          misconception: 'छात्र समझते हैं कि \'पदावली: मुख्य शब्द\' का अर्थ है पाठ में आए कठिन/नए शब्दों के शब्दकोश अर्थ लिखना — जबकि वास्तव में यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द किसी पाठ में आए उन चुने हुए महत्त्वपूर्ण शब्दों का अध्ययन है जो पाठ का',
                  options: ['पदावली: मुख्य शब्द किसी पाठ में आए उन चुने हुए महत्त्वपूर्ण शब्दों का अध्ययन है जो पाठ का', 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान'],
                  hint: 'यदि अटके तो कक्षा 7 की पदावली (c7_hin_cbse_06_010) के \'सांदर्भिक अर्थ\' और \'व्युत्पत्ति\' अभ्यास.',
                  misconception: 'छात्र समझते हैं कि \'पदावली: मुख्य शब्द\' का अर्थ है पाठ में आए कठिन/नए शब्दों के शब्दकोश अर्थ लिखना — जबकि वास्तव में यह उन शब्दों का चयन है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहो — "पाठ से 5 शब्द चुनो जो तुम्हें सबसे महत्त्वपूर्ण लगते हैं, चाहे वे सरल ही हों।" चरण 2: प्रत्येक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, काल, वाच्य, और.',
          hint: 'यदि छात्र अटका हो तो: कक्षा 7 के \'व्याकरण: पाठ में भाषा-प्रयोग\' (c7_hin_cbse_06_011) के.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ है **व्याकरण के नियम पहचानना** (यह संज्ञा है, यह क्रिया है, यह भूतकाल है)। असल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, काल, वाच्य, और अलंकारिक',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, काल, वाच्य, और अलंकारिक', 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान'],
                  hint: 'यदि छात्र अटका हो तो: कक्षा 7 के \'व्याकरण: पाठ में भाषा-प्रयोग\' (c7_hin_cbse_06_011) के अभ्यास.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ है **व्याकरण के नियम पहचानना** (यह संज्ञा है, यह क्रिया है, यह भूतकाल है)। असल में भाषा-प्रयोग.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "पाठ का कोई एक वाक्य लो। उसकी हर शब्द को बदलकर समानार्थी लिखो (मिट्टी→धूल, उठाई→उठा ली, सोंधी→सुगंधित)।.', 'फिर पूछो: "लेखक ने तुम्हारा शब्द क्यों नहीं चुना?" 3.', 'इस \'क्यों\' का उत्तर देते ही छात्र **भाषा-प्रयोग की विश्लेषणात्मक दृष्टि** पकड़ लेगा। 4.', 'अभ्यास के लिए पाठ के 3 अलग-अलग प्रसंगों (श्रम, वर्णन, अंतर्मन) से यह कसरत कराओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ से सीधे, एक शब्द या वाक्य में दिया जा.',
          hint: 'यदि अटके तो c8_hin_cbse_06_002 (कथानक) और c8_hin_cbse_06_006 (मुख्य विषय) दोबारा पढ़ें.',
          misconception: 'छात्र मानते हैं कि आशय-सूचक प्रश्न का उत्तर \'अपनी राय\' देना है, जबकि वास्तव में उत्तर **पाठ-आधारित तर्क** होना चाहिए।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ से सीधे, एक शब्द या वाक्य में दिया जा सके (क्या,',
                  options: ['वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ से सीधे, एक शब्द या वाक्य में दिया जा सके (क्या,', 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान'],
                  hint: 'यदि अटके तो c8_hin_cbse_06_002 (कथानक) और c8_hin_cbse_06_006 (मुख्य विषय) दोबारा पढ़ें — ये.',
                  misconception: 'छात्र मानते हैं कि आशय-सूचक प्रश्न का उत्तर \'अपनी राय\' देना है, जबकि वास्तव में उत्तर **पाठ-आधारित तर्क** होना चाहिए। उदाहरण: "लेखक ने.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र को एक आशय-सूचक प्रश्न दो और उसका \'राय-आधारित\' व \'पाठ-आधारित\' उत्तर साथ रखकर दिखाओ। **चरण 2**: पूछो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
