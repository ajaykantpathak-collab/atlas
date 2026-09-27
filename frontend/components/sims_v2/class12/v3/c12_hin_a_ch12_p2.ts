import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch12_p2: SimDef = {
    id: 'v3_c12_hin_a_ch12_p2',
    title: 'संवदयिा · Part 2/3',
    subtitle: 'A union leader wrote the village in the village\'s own voice',
    classLevel: 12, subject: 'hin_a', topic: 'संवदयिा · Part 2/3',
    chapters: ['c12_hin_a_ch12'],
    nodeIds: ['c12_hin_a_cbse_12_007', 'c12_hin_a_cbse_12_008', 'c12_hin_a_cbse_12_009', 'c12_hin_a_cbse_12_010', 'c12_hin_a_cbse_12_011', 'c12_hin_a_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Socialist-fiction reader', intro: 'He fought the British, organised workers, then sat down to write the village as the village sounds.', goal: 'Read Renu\'s/Phanishwar Nath\'s story through socialist humanism — colloquial voice as the carrier of rural truth.' },
    discovery: {
        question: 'A Quit India activist and trade unionist writes a village story in the village\'s own tongue — why does the colloquial language matter as much as the plot?',
        options: ['Voice is the politics — a socialist eye sees suffering with human warmth, and only the village\'s own speech can carry that truth without the textbook\'s distance', 'Simple language for simple readers', 'Dialect is easier to write', 'Just realism for colour'],
        answer: 'Voice is the politics — a socialist eye sees suffering with human warmth, and only the village\'s own speech can carry that truth without the textbook\'s distance',
        hook: '\'Simple\' isn\'t \'artless\' — colloquial, descriptive, expressive prose immerses you in village life so hardship and tenderness land as lived, not reported. A socialist lens sees both the poverty AND the feeling; the story outlives its decade because the rural-urban divide still argues today.',
    },
    teaching: [
        { title: 'संवदयिा — गौण विषय', text: 'गौण विषय वह विचार या भाव है जो मुख्य विषय को समर्थन देता है, कहानी की गहराई बढ़ाता है, लेकिन केंद्रीय संदेश का हिस्सा नहीं होता।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the village through its own speech: weigh a freedom fighter\'s lens on rural suffering, test why colloquiality is craft, and ask what a 1950s story still teaches a 2025 reader.',
        labels: ['संवदयिा — गौण विषय', 'संवदयिा — साहित्यिक युक्तियाँ', 'संवदयिा — पदावली: मुख्य', 'संवदयिा — व्याकरण: पाठ', 'संवदयिा — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your family wants to shift the ageing grandmother — who has nursed half the village\'s children — into your city flat \'for her own good.\' She refuses flatly, and everyone calls it stubbornness.',
            decisions: [{ prompt: 'How does the climax of \'रेणु\' read her refusal?', options: [
                { text: 'As the story\'s peak of belonging — the nanny refuses the narrator\'s city offer with \'you are my mother, mother of the whole village\' echoing around her; she isn\'t refusing care, she\'s rooted where her care made her everyone\'s.', outcome: 'The story builds to that confrontation precisely so her staying reads as identity, not obstinacy — the village is her life\'s work, and removing her to \'safety\' removes her from herself.' },
                { text: 'Insist on the move — the city\'s facilities objectively outweigh a village attachment.', outcome: 'That\'s the narrator\'s own plan at the climax, and the story gives it no victory: her refusal stands because the measure of her good isn\'t amenities but the web of people who call her mother.', reveals: 'facilities-outweigh-roots' },
                { text: 'Let her stay but stop calling — if she chooses the village, she\'s chosen isolation.', outcome: 'The story\'s flashbacks exist to show she\'s the least alone person in it — the refusal closes the city plan, not the relationship; withdrawing contact punishes her for rootedness.', reveals: 'staying-equals-isolation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read voice as worldview — where the choice of dialect is itself a statement about whose reality counts.',
            decisions: [{ prompt: 'What comes next? संवदयिा · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — संवदयिा · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_007', difficulty: 'standard',
          question: 'गौण विषय वह विचार या भाव है जो मुख्य विषय को समर्थन देता है, कहानी की गहराई.',
          hint: 'यदि फँसें तो c12_hin_a_cbse_12_006 (मुख्य विषय और संदेश) पर फिर से काम करें और मुख्य विषय.',
          misconception: 'students अक्सर मानते हैं कि यदि कोई पात्र या घटना कहानी में बार-बार आती है या भावनात्मक रूप से मजबूत है, तो वह मुख्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय वह विचार या भाव है जो मुख्य विषय को समर्थन देता है, कहानी की गहराई बढ़ाता है,',
                  options: ['गौण विषय वह विचार या भाव है जो मुख्य विषय को समर्थन देता है, कहानी की गहराई बढ़ाता है,', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि फँसें तो c12_hin_a_cbse_12_006 (मुख्य विषय और संदेश) पर फिर से काम करें और मुख्य विषय से गौण.',
                  misconception: 'students अक्सर मानते हैं कि यदि कोई पात्र या घटना कहानी में बार-बार आती है या भावनात्मक रूप से मजबूत है, तो वह मुख्य विषय होना चाहिए।.' }
          ],
            remediations: { 'students': { steps: ['छात्र को दिखाएँ कि कहानी के अंत में क्या बदलता है: यदि बूढ़ा पात्र की बातें हटा दें और मुख्य संघर्ष का समाधान समान रहे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_008', difficulty: 'standard',
          question: 'बिंब वह मानसिक चित्र है जो कविता के शब्दों से पाठक के मन में उत्पन्न होता है.',
          hint: 'यदि छात्र बिंब और रूपक के बीच के अंतर को समझ नहीं पा रहा है, तो कक्षा 11 के नोड.',
          misconception: 'छात्र अक्सर बिंब और रूपक को इस कारण से混동 करते हैं कि दोनों चित्रात्मक भाषा का प्रयोग करते हैं और दोनों ही कविता की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब वह मानसिक चित्र है जो कविता के शब्दों से पाठक के मन में उत्पन्न होता है, जबकि रूपक',
                  options: ['बिंब वह मानसिक चित्र है जो कविता के शब्दों से पाठक के मन में उत्पन्न होता है, जबकि रूपक', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि छात्र बिंब और रूपक के बीच के अंतर को समझ नहीं पा रहा है, तो कक्षा 11 के नोड.',
                  misconception: 'छात्र अक्सर बिंब और रूपक को इस कारण से混동 करते हैं कि दोनों चित्रात्मक भाषा का प्रयोग करते हैं और दोनों ही कविता की सुंदरता बढ़ाते हैं। वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो अलग-अलग रंग के हाईलाइटर दें: एक बिंब के लिए (शब्दों के चारों ओर घेरा डालें जो मन में चित्र, आवाज़, गंध.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली नज़र में तर्क-विरुद्ध या.',
          hint: 'यदि फँसें तो **c11_hin_a_cbse_01_009** के \'विरोधाभास व प्रतीक में अंतर\' और \'सरल उदाहरण\'.',
          misconception: '**सबसे घातक भ्रम:** छात्र **विरोधाभास** को **विरोधाभास अलंकार (Oxymoron)** समझ लेते हैं — जैसे "जीवित मृत", "मधुर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली नज़र में तर्क-विरुद्ध या असंगत लगता',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली नज़र में तर्क-विरुद्ध या असंगत लगता', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि फँसें तो **c11_hin_a_cbse_01_009** के \'विरोधाभास व प्रतीक में अंतर\' और \'सरल उदाहरण\' खंड को.',
                  misconception: '**सबसे घातक भ्रम:** छात्र **विरोधाभास** को **विरोधाभास अलंकार (Oxymoron)** समझ लेते हैं — जैसे "जीवित मृत", "मधुर कड़वा" — जो केवल **दो.' }
          ],
            remediations: { 'oxymoron': { steps: ['**चरण 1:** छात्र से कहें: "पाठ से कोई एक वाक्य चुनो जो \'गलत\' लगे लेकिन \'सही\' लगे" — उसे लिखवाएँ; फिर पूछें: "कौन-सा.', '**चरण 2:** पाठ में **बार-बार आने वाली 3 वस्तुओं/छवियों** को सूचीबद्ध करवाएँ; प्रत्येक के लिए पूछें: "लेखक ने इसे ही.', 'क्या यह केवल वस्तु है या कुछ और कहती है?" — यह प्रतीक की **पुनरावृत्ति-आधारित पहचान** सिखाएगा। 3.', '**चरण 3:** कक्षा 11 के नोड **c11_hin_a_cbse_01_009** (साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक) को दोबारा पढ़वाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द वे विशेष शब्द या शब्दसमूह हैं जो किसी पाठ के केंद्रीय विषय.',
          hint: 'अगर फँसें तो कथानक (c12_hin_a_cbse_12_002) और प्रमुख पात्र (c12_hin_a_cbse_12_004) पर.',
          misconception: 'छात्र अक्सर मुख्य शब्दों को पाठ के कठिन, अप्रयुक्त या Sanskrit pochod के शब्दों से जोड़कर समझते हैं, जैसे \'धर्म\', \'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द वे विशेष शब्द या शब्दसमूह हैं जो किसी पाठ के केंद्रीय विषय, भाव या',
                  options: ['पदावली: मुख्य शब्द वे विशेष शब्द या शब्दसमूह हैं जो किसी पाठ के केंद्रीय विषय, भाव या', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'अगर फँसें तो कथानक (c12_hin_a_cbse_12_002) और प्रमुख पात्र (c12_hin_a_cbse_12_004) पर दोबारा ध्यान.',
                  misconception: 'छात्र अक्सर मुख्य शब्दों को पाठ के कठिन, अप्रयुक्त या Sanskrit pochod के शब्दों से जोड़कर समझते हैं, जैसे \'धर्म\', \' moksha\' को मुख्य शब्द.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले पाठ के तीन छोटे वाक्य दें और पूछें: "इन वाक्यों में कौन सा शब्द सबसे अधिक बार आया है और क्यों लगता है कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग शब्दों के कार्य (जैसे विशेषण, क्रिया, सर्वनाम, संबंधबंध) को.',
          hint: 'यदि फंसे हों, तो c12_hin_a_cbse_12_010 (पदावली: मुख्य शब्द) को दोबारा देखें — शब्दों के.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द विशेषण के रूप में भी उपयोग होता है (जैसे "तेज", "साफ", "स्पष्ट"), तो वह किसी भी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग शब्दों के कार्य (जैसे विशेषण, क्रिया, सर्वनाम, संबंधबंध) को उनके',
                  options: ['पाठ में भाषा-प्रयोग शब्दों के कार्य (जैसे विशेषण, क्रिया, सर्वनाम, संबंधबंध) को उनके', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि फंसे हों, तो c12_hin_a_cbse_12_010 (पदावली: मुख्य शब्द) को दोबारा देखें — शब्दों के अर्थ को.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द विशेषण के रूप में भी उपयोग होता है (जैसे "तेज", "साफ", "स्पष्ट"), तो वह किसी भी वाक्य में विशेषण ही.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो वाक्य दें: (1) "वह स्पष्ट बोलता है" और (2) "वह स्पष्ट रूप से बोलता है"। पहले वाक्य में "स्पष्ट" को विशेषण.', 'स्पष्ट)। दूसरे वाक्य में, पहले क्रिया "बोलता है" को पहचानने के लिए कहें, फिर पूछें कि "स्पष्ट रूप से" उसे कैसे बदल रहा.', 'यदि हां, तो यह क्रियाविशेषण है। इस तुलना के माध्यम से, छात्र देखेगा कि समान शब्द-समूह अलग-अलग कार्यों में कैसे काम करते.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ से सीधे उद्धृत.',
          hint: 'यदि आशय-सूचक प्रश्न पहचानने में अटके: **c11_hin_a_cbse_07_012** (सामान्य गलतियाँ पहचानना).',
          misconception: '**सबसे घातक भ्रम:** "आशय-सूचक प्रश्न का उत्तर पाठ की पंक्तियाँ **कॉपी-पेस्ट** करके दे दो।" **वास्तविकता:** CBSE.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ से सीधे उद्धृत तथ्य, नाम,',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ से सीधे उद्धृत तथ्य, नाम,', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि आशय-सूचक प्रश्न पहचानने में अटके: **c11_hin_a_cbse_07_012** (सामान्य गलतियाँ पहचानना) और.',
                  misconception: '**सबसे घातक भ्रम:** "आशय-सूचक प्रश्न का उत्तर पाठ की पंक्तियाँ **कॉपी-पेस्ट** करके दे दो।" **वास्तविकता:** CBSE मार्किंग स्कीम में.' }
          ],
            remediations: { 'cbse-1': { steps: ['**चरण 1:** छात्र को 5 वस्तुनिष्ठ और 5 आशय-सूचक प्रश्न दें (मिश्रित क्रम में)। उससे कहें: **"प्रत्येक प्रश्न के आगे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
