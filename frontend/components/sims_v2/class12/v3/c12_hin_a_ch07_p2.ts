import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch07_p2: SimDef = {
    id: 'v3_c12_hin_a_ch07_p2',
    title: 'बारहमासा · Part 2/3',
    subtitle: 'A walking song where hunger means two hungers',
    classLevel: 12, subject: 'hin_a', topic: 'बारहमासा · Part 2/3',
    chapters: ['c12_hin_a_ch07'],
    nodeIds: ['c12_hin_a_cbse_07_007', 'c12_hin_a_cbse_07_008', 'c12_hin_a_cbse_07_009', 'c12_hin_a_cbse_07_010', 'c12_hin_a_cbse_07_011', 'c12_hin_a_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Varkari-tradition reader', intro: 'On the road to Pandharpur, a saint-poet handed the poorest pilgrims a song — and a subtle verdict on orthodoxy.', goal: 'Read Eknath\'s Abhang through the Varkari tradition — folk form carrying devotion and social critique.' },
    discovery: {
        question: 'A pilgrim woman sings to Vitthal of hunger and thirst on the road to Pandharpur — why does an Abhang carry both at once?',
        options: ['Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together', 'Pilgrims just get hungry', 'Folk songs need simple themes', 'Fasting is the ritual'],
        answer: 'Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together',
        hook: 'Eknath was a Brahmin who wrote for the marginalised — the Abhang\'s plain Marathi, folk rhythm and a woman\'s voice are the reform, not simplification. This is poetry made to be walked and sung, not recited from a throne.',
    },
    teaching: [
        { title: 'बारहमासा — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**बिंब (Imagery):** काव्य में प्रयुक्त वे शब्द-युग्म या पदावली जो पाठक की पाँचों इंद्रियों (दृष्टि, श्रवण, घ्राण, स्पर्श, स्वाद) को उद्दीप्त कर **मूर्त संवेदनात्मक अनुभूति** उत्पन्न करते हैं।.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'March with the Varkaris: learn what makes an Abhang an Abhang, read hunger as both road and spirit, and hear how a saint smuggled equality into a song.',
        labels: ['बारहमासा — साहित्यिक युक्तियाँ', 'बारहमासा — मुख्य भाव', 'बारहमासा — गौण भाव', 'बारहमासा — पदावली: कठिन', 'बारहमासा — व्याकरण: पद्य', 'बारहमासा — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a folk-style music video of a woman waiting through the night for someone who doesn\'t come. A teammate wants to cut the repeated shots — lamp, doorway, her face — because \'repetition is dead screen time.\'',
            decisions: [{ prompt: 'What does Mahadevi Verma\'s \'बारहमासा\'-style waiting poem say?', options: [
                { text: 'Keep the repeats — in the poem each stanza\'s return to lamp, night and call is the waiting itself; repetition isn\'t filler, it\'s the heartbeat, and each recurrence shifts from active seeking to inward endurance as the night deepens.', outcome: 'The chapter\'s point: in folk narrative the structure IS the emotion — time passing is the plot, and only the repeated images let the viewer feel its weight.' },
                { text: 'Cut them — montage it once and move on; viewers understand waiting from a single shot.', outcome: 'One shot conveys \'she waited\' as information; the poem\'s layered returns make the waiting an experience — the difference between being told a night passed and watching it refuse to pass.', reveals: 'repetition-is-filler' },
                { text: 'Keep one repeat at the end for rhythm but tighten the middle.', outcome: 'The poem needs the middle repetitions most — that\'s where \'the day passed, the night didn\'t\' stretches external time into her subjective endurance; trimming there trims the tension\'s source.', reveals: 'repeat-only-at-end' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a pilgrimage song as social reform in folk metre — Bhakti that walks, sings and quietly levels.',
            decisions: [{ prompt: 'What comes next? बारहमासा · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बारहमासा · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_007', difficulty: 'standard',
          question: '**बिंब (Imagery):** काव्य में प्रयुक्त वे शब्द-युग्म या पदावली जो पाठक की.',
          hint: 'यदि अटके: कक्षा 11 अंतरा के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_007) का \'चातक-प्रतीक\'.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'बिंब\' को \'रूपक/उपमा\' मान लेते हैं** क्योंकि दोनों में \'तुलना\' या \'चित्रण\' होता है। उदाहरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** काव्य में प्रयुक्त वे शब्द-युग्म या पदावली जो पाठक की पाँचों',
                  options: ['**बिंब (Imagery):** काव्य में प्रयुक्त वे शब्द-युग्म या पदावली जो पाठक की पाँचों', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**'],
                  hint: 'यदि अटके: कक्षा 11 अंतरा के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_007) का \'चातक-प्रतीक\' और \'बादल.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'बिंब\' को \'रूपक/उपमा\' मान लेते हैं** क्योंकि दोनों में \'तुलना\' या \'चित्रण\' होता है। उदाहरण: "चाँद सा मुखड़ा".' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** c11_hin_a_cbse_13_007 (जाग तुझको दूर जाना — प्रतीक और बिंब) तथा c11_hin_a_cbse_14_007 (बादल को घरिते.', '**अभ्यास करें:** बारहमासा के **एक मास (जैसे जेठ या सावन)** के पद्यांश लें। हर संज्ञा/विशेषण के आगे **[इंद्रिय-टैग]**.', '**प्रश्न पूछें:** "यह बिंब कविता में किस भाव को मूर्त कर रहा है?" — उत्तर लिखें: "बिंब X → इंद्रिय Y → प्रतीकार्थ Z →.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_3 और 4 दोबारा हल करें। यदि अब सही होते हैं, तो अगले नोड.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_008', difficulty: 'standard',
          question: 'बारहमासा में मुख्य भाव वह केंद्रित मनोभाव है जो संपूर्ण कविता के माध्यम से.',
          hint: 'यदि फंसें तो c12_hin_a_cbse_07_002: बारहमासा — पद्यांश-वार भावार्थ पर वापस जाएं और.',
          misconception: 'छात्र अक्सर बारहमासा के मुख्य भाव को वह भाव मान लेते हैं जो किसी एक विशेष महीने (जैसे वैशाख में अनुराग या कार्तिक में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बारहमासा में मुख्य भाव वह केंद्रित मनोभाव है जो संपूर्ण कविता के माध्यम से विकसित होता',
                  options: ['बारहमासा में मुख्य भाव वह केंद्रित मनोभाव है जो संपूर्ण कविता के माध्यम से विकसित होता', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**'],
                  hint: 'यदि फंसें तो c12_hin_a_cbse_07_002: बारहमासा — पद्यांश-वार भावार्थ पर वापस जाएं और प्रत्येक महीने.',
                  misconception: 'छात्र अक्सर बारहमासा के मुख्य भाव को वह भाव मान लेते हैं जो किसी एक विशेष महीने (जैसे वैशाख में अनुराग या कार्तिक में विरह) में सबसे तीव्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहिए कि वह कविता की एक तालिका बनाए—पहले स्तंभ में महीने का नाम, दूसरे में प्रमुख भाव, तीसरे में भाव की तीव्रता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_009', difficulty: 'standard',
          question: 'गौण भाव वे द्वितीयक भाव या चित्र हैं जो कविता के मुख्य भाव को समर्थन, विपरीत.',
          hint: 'यदि गौण भाव और मुख्य emoción के बीच संबंध समझ नहीं आ रहा है, तो c12_hin_a_cbse_07_008.',
          misconception: 'छात्र अक्सर गौण भाव को बस \'मुख्य भाव के अतिरिक्त सजावटी विवरण\' समझ बैठते हैं और सोचते हैं कि उनका केवल कविता को लम्बा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव वे द्वितीयक भाव या चित्र हैं जो कविता के मुख्य भाव को समर्थन, विपरीत, या',
                  options: ['गौण भाव वे द्वितीयक भाव या चित्र हैं जो कविता के मुख्य भाव को समर्थन, विपरीत, या', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**'],
                  hint: 'यदि गौण भाव और मुख्य emoción के बीच संबंध समझ नहीं आ रहा है, तो c12_hin_a_cbse_07_008 (केंद्रीय भाव.',
                  misconception: 'छात्र अक्सर गौण भाव को बस \'मुख्य भाव के अतिरिक्त सजावटी विवरण\' समझ बैठते हैं और सोचते हैं कि उनका केवल कविता को लम्बा या सुंदर बनाने का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले एक स्पष्ट विपरीत उदाहरण दें: श्लोक "हरियाली भर आई है, कोयल कूकती है, पर मेरा मन तो उदास है" पूछिए कि यहाँ.', 'अकेला बैठा प्रेमी) ताकि वह सक्रिय रूप से विरोध की पहचान करना सीखे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_010', difficulty: 'standard',
          question: 'पदावली: कठिन शब्द और मुहावरे वह अध्ययन है जिसमें कविता में प्रयुक्त अपरिचित या.',
          hint: 'यदि फंसे हैं तो कक्षा 11 के किसी भी पाठ (जैसे c11_hin_a_cbse_01_010 से.',
          misconception: 'छात्र अक्सर कठिन शब्दों और मुहावरों को शब्दश: अर्थ लेकर समझते हैं, जैसे "हाथ पीले करना" को literally हाथों के पीले होने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: कठिन शब्द और मुहावरे वह अध्ययन है जिसमें कविता में प्रयुक्त अपरिचित या',
                  options: ['पदावली: कठिन शब्द और मुहावरे वह अध्ययन है जिसमें कविता में प्रयुक्त अपरिचित या', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**'],
                  hint: 'यदि फंसे हैं तो कक्षा 11 के किसी भी पाठ (जैसे c11_hin_a_cbse_01_010 से c11_hin_a_cbse_07_010) में.',
                  misconception: 'छात्र अक्सर कठिन शब्दों और मुहावरों को शब्दश: अर्थ लेकर समझते हैं, जैसे "हाथ पीले करना" को literally हाथों के पीले होने के रूप में लेते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि "हाथ पीले करना" मुहावरे के दो हिस्से हैं: literal (हाथों का रंग) और idiomatic (काम में निपुणता)। फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_011', difficulty: 'standard',
          question: 'बारहमासा कविता में भाषा-प्रयोग से तात्पर्य उस विशिष्ट शब्द-चयन, वाक्य-संरचना.',
          hint: 'यदि भाषा के प्रयोग के भाव पर प्रभाव को समझने में कठिनाई हो तो पहले c12_hin_a_cbse_07_005.',
          misconception: 'बारहमासा की कविता में भाषा के प्रयोग को समझते समय छात्र अक्सर यह मान लेते हैं कि यदि शब्दों का शब्दकोश अर्थ समझ आ गया.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बारहमासा कविता में भाषा-प्रयोग से तात्पर्य उस विशिष्ट शब्द-चयन, वाक्य-संरचना, और शैलीगत',
                  options: ['बारहमासा कविता में भाषा-प्रयोग से तात्पर्य उस विशिष्ट शब्द-चयन, वाक्य-संरचना, और शैलीगत', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**'],
                  hint: 'यदि भाषा के प्रयोग के भाव पर प्रभाव को समझने में कठिनाई हो तो पहले c12_hin_a_cbse_07_005 (छंद और.',
                  misconception: 'बारहमासा की कविता में भाषा के प्रयोग को समझते समय छात्र अक्सर यह मान लेते हैं कि यदि शब्दों का शब्दकोश अर्थ समझ आ गया है तो कविता समझ गई है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले एक सरल हिंदी वाक्य दें जैसे "मैं स्कूल जा रहा हूँ" और पूछिए कि इसका अर्थ बदलने के लिए आप क्या बदल.', 'फिर उन्हें दिखाइए कि यदि हम इसे "स्कूल जा रहा हूँ मैं" (उलटा वाक्य) लिखते हैं तो emphasis कैसे बदलता है, या "मैं-मैं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_012', difficulty: 'standard',
          question: 'बोध-प्रश्न वे प्रश्न हैं जो पाठ की विषयवस्तु, भाव, शिल्प और भाषा की समझ की जाँच.',
          hint: 'यदि किसी माह का बिंब-प्रतीक याद न आए तो c12_hin_a_cbse_07_002 (पद्यांश-वार भावार्थ) की.',
          misconception: 'छात्र समझते हैं कि आशय-सूचक प्रश्नों का उत्तर **\'कवि क्या कहना चाहता है\'** के बजाय **\'मुझे क्या लगता है\'** लिख देना है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न वे प्रश्न हैं जो पाठ की विषयवस्तु, भाव, शिल्प और भाषा की समझ की जाँच करते हैं',
                  options: ['बोध-प्रश्न वे प्रश्न हैं जो पाठ की विषयवस्तु, भाव, शिल्प और भाषा की समझ की जाँच करते हैं', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**'],
                  hint: 'यदि किसी माह का बिंब-प्रतीक याद न आए तो c12_hin_a_cbse_07_002 (पद्यांश-वार भावार्थ) की तालिका.',
                  misconception: 'छात्र समझते हैं कि आशय-सूचक प्रश्नों का उत्तर **\'कवि क्या कहना चाहता है\'** के बजाय **\'मुझे क्या लगता है\'** लिख देना है। उदाहरण: "मुझे लगता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहो — "पहले पद्यांश की **दो पंक्तियाँ** बोलकर सुनाओ जो प्रश्न से सीधे जुड़ती हैं।" चरण 2: पूछो — "इन.', 'उसका **सामान्य अर्थ** और **पाठ-विशेष अर्थ** क्या है?" चरण 3: फिर कहो — "अब अपने उत्तर को इस ढाँचे में लिखो: **उद्धरण →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
