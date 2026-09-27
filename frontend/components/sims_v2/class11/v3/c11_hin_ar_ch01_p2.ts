import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch01_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch01_p2',
    title: 'पाठ 1 · Part 2/3',
    subtitle: 'Read a chess game as the diagnosis of a kingdom already lost.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 1 · Part 2/3',
    chapters: ['c11_hin_ar_ch01'],
    nodeIds: ['c11_hin_ar_cbse_01_007', 'c11_hin_ar_cbse_01_008', 'c11_hin_ar_cbse_01_009', 'c11_hin_ar_cbse_01_010', 'c11_hin_ar_cbse_01_011', 'c11_hin_ar_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a kingdom fall one move at a time', intro: 'In 1856 Lucknow two nobles chase checkmate while the Company chases the crown — and Premchand refuses to tell you whom to blame.', goal: 'Analyse feudal decay as systemic, not personal, and evaluate Premchand\'s deliberate historical distortion.' },
    discovery: {
        question: 'Two nobles play chess while the British annex Awadh — are Mir and Roshan the villains of \'Shatranj ke Khiladi\'?',
        options: ['No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab', 'Yes — their chess obsession alone destroyed the kingdom', 'Yes — they are the story\'s clear antagonists', 'No — the British officer is the story\'s only villain'],
        answer: 'No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab',
        hook: 'Premchand wrote 1856 from inside 1924 — the \'polite\' annexation mirrors the reformist colonial rhetoric of his own time.',
    },
    teaching: [
        { title: 'पाठ 1 — गौण विषय', text: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता हुआ कथा में विस्तार, गहराई और सामाजिक-सांस्कृतिक संदर्भ जोड़ता है तथा मुख्य विषय की व्याख्या, पुष्टि या विरोधाभास प्रस्तुत.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hold the three timelines — 1856 Lucknow, 1924 India, today — and weigh whether shrinking Wajid Ali Shah to a caged bird is a historical error or an artistic necessity.',
        labels: ['पाठ 1 — गौण', 'पाठ 1 — साहित्यिक', 'पाठ 1 — पदावली', 'पाठ 1 — व्याकरण', 'पाठ 1 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 2/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का तात्पर्य रचनाकार द्वारा कथ्य, पात्र, परिवेश और उद्देश्य के अनुरूप.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर निश्चित, संक्षिप्त और.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is staging a reading of Premchand\'s \'Shatranj ke Khiladi\'. The director wants to stage it as \'a comedy about two chess-obsessed nobles in old Lucknow — period fun, nothing more.\' You sense the 1856 setting is doing heavier work.',
            decisions: [{ prompt: 'What reading should the production take?', options: [
                { text: 'Stage it as national allegory: Premchand wrote in 1924 — Non-Cooperation rising, Jallianwala Bagh fresh — and chose 1856 Awadh deliberately. The chessboard is a structural device: while Mirza and Mir move pieces, the kingdom is annexed without a shot — aristocratic decadence mirroring the \'polite\' colonial takeover the audience of 1924 would recognise in their own moment.', outcome: 'The comedy turns sharp: context isn\'t backdrop, it\'s the prism that makes chess-playing during a collapse mean political paralysis.' },
                { text: 'Go with the comedy reading — the story\'s humour about chess addicts carries itself without history lessons.', outcome: 'Stripping the 1856/1924 double timeline reduces a critique of feudal and colonial complicity to costume farce.', reveals: 'chess-players-is-just-comedy' },
                { text: 'Present it as a moral tale — chess is a vice, so the nobles deserved to lose their kingdom.', outcome: 'The game is a metaphor for paralysis, not a sin being punished; Premchand indicts a system\'s decadence, not a hobby.', reveals: 'chess-is-the-vice' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'An older Premchand story gave vice and virtue clear names; here nobody is clean — which is exactly what systemic decay looks like.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता.',
          hint: 'अगर अटके तो \'मुख्य विषय\' (नोड 006) पर वापस जाएं और पाठ के केंद्रीय संघर्ष/संदेश को एक.',
          misconception: 'छात्र समझते हैं कि \'गौण विषय\' = \'कम महत्वपूर्ण विषय\' या \'साइड प्लॉट\'। वास्तव में, गौण विषय **कथा का विषयगत घनत्व.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह द्वितीयक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता हुआ कथा में',
                  options: ['गौण विषय (Sub-theme) वह द्वितीयक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता हुआ कथा में', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो'],
                  hint: 'अगर अटके तो \'मुख्य विषय\' (नोड 006) पर वापस जाएं और पाठ के केंद्रीय संघर्ष/संदेश को एक स्पष्ट वाक्य.',
                  misconception: 'छात्र समझते हैं कि \'गौण विषय\' = \'कम महत्वपूर्ण विषय\' या \'साइड प्लॉट\'। वास्तव में, गौण विषय **कथा का विषयगत घनत्व (thematic density)**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के 3 ऐसे प्रसंग चुनो जो मुख्य कथा को आगे न बढ़ाते हों, फिर भी लेखक ने उन्हें रखा है।" 2.', 'प्रत्येक प्रसंग के लिए पूछें: "अगर यह प्रसंग हटा दिया जाए, तो मुख्य विषय की समझ पर क्या असर पड़ेगा?" 3.', 'छात्र लिखे: "प्रसंग X हटने पर मुख्य विषय Y अधूरा/कमजोर लगेगा क्योंकि..." — यह **कार्यात्मक अनिवार्यता (functional.', 'अंत में समझाएं: "जिसे तुम \'साइड स्टोरी\' समझते हो, वह वास्तव में मुख्य विषय का **सबूत/विस्तार/चुनौती** है।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें कवि/लेखक इंद्रियों (दृश्य.',
          hint: 'यदि अटके तो "उपमा और रूपक के सहायक शब्द" (कक्षा 9-10 व्याकरण) दोहराएँ — विशेषतः \'है\' बनाम.',
          misconception: 'छात्र **रूपक** और **उपमा** को केवल "तुलना" मानकर एक समझ लेते हैं क्योंकि दोनों में दो चीज़ें आती हैं। वे नहीं देखते कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें कवि/लेखक इंद्रियों (दृश्य, श्रवण, घ्राण,',
                  options: ['**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें कवि/लेखक इंद्रियों (दृश्य, श्रवण, घ्राण,', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो'],
                  hint: 'यदि अटके तो "उपमा और रूपक के सहायक शब्द" (कक्षा 9-10 व्याकरण) दोहराएँ — विशेषतः \'है\' बनाम \'जैसे\' का.',
                  misconception: 'छात्र **रूपक** और **उपमा** को केवल "तुलना" मानकर एक समझ लेते हैं क्योंकि दोनों में दो चीज़ें आती हैं। वे नहीं देखते कि रूपक में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['1) छात्र को **पाँच वाक्य** दें: दो रूपक, दो उपमा, एक साधारण कथन — उसे **केवल सहायक शब्द (जैसे/वैसा/सा/है/हैं)** छाँटने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली नज़र में असंगत या.',
          hint: 'यदि फँस जाएँ तो **c11_hin_ar_cbse_01_008** के "रूपक विश्लेषण चरण" (उपमान-उपमेय अलग करना.',
          misconception: '**सबसे विशिष्ट भ्रम**: छात्र **विरोधाभास** को **वक्रोक्ति (Irony)** या **यमक (Pun)** समझ बैठते हैं क्योंकि तीनों में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली नज़र में असंगत या आत्म-विरोधी',
                  options: ['**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली नज़र में असंगत या आत्म-विरोधी', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो'],
                  hint: 'यदि फँस जाएँ तो **c11_hin_ar_cbse_01_008** के "रूपक विश्लेषण चरण" (उपमान-उपमेय अलग करना, साधारण.',
                  misconception: '**सबसे विशिष्ट भ्रम**: छात्र **विरोधाभास** को **वक्रोक्ति (Irony)** या **यमक (Pun)** समझ बैठते हैं क्योंकि तीनों में "विरोधी/द्विअर्थी".' }
          ],
            remediations: { 'irony-pun': { steps: ['**चरण १**: छात्र से कहें — "किसी भी वाक्य को लेकर तीन प्रश्न पूछो: (अ) क्या यह पहली नज़र में **असंभव/उल्टा** लगता है?', '(ब) क्या गहराई में जाकर यह **कोई सत्य/अनुभव** खोलता है?', '(स) क्या यह **केवल शब्दों का खेल** है या **विचार का विस्तार**?" — यदि (अ) और (ब) हाँ, (स) नहीं → **विरोधाभास"। **चरण.', '(ब) क्या X का **शाब्दिक कार्य** (छाया देना, जलना) से **अलग** कोई **अमूर्त अर्थ** (आशा, अंत) यहाँ निभा रहा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_010', difficulty: 'standard',
          question: 'पदावली (Lexicon/Vocabulary) किसी विशिष्ट पाठ, विधा या रचनाकार द्वारा प्रयुक्त.',
          hint: 'यदि अटका हुआ महसूस हो तो **\'शब्द-शक्ति: अभिधा-लक्षणा-व्यंजना\' (कक्षा ९-१० हिंदी.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'मुख्य शब्द\' का अर्थ है \'कठिन/संस्कृतनिष्ठ/लंबे शब्द\'** जो परीक्षा में पूछे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (Lexicon/Vocabulary) किसी विशिष्ट पाठ, विधा या रचनाकार द्वारा प्रयुक्त **शब्दों का',
                  options: ['पदावली (Lexicon/Vocabulary) किसी विशिष्ट पाठ, विधा या रचनाकार द्वारा प्रयुक्त **शब्दों का', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'शब्द-शक्ति: अभिधा-लक्षणा-व्यंजना\' (कक्षा ९-१० हिंदी व्याकरण/साहित्य)**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'मुख्य शब्द\' का अर्थ है \'कठिन/संस्कृतनिष्ठ/लंबे शब्द\'** जो परीक्षा में पूछे जाएं। इसलिए वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित सुधार (Targeted Remediation) — ४ चरणों में:** १.', '**प्रत्यक्षीकरण (Confrontation):** छात्र को पाठ १ देकर कहिए: *"पेंसिल से उन १० शब्दों को घेरो जो तुम्हें लगता है इस पाठ.', 'वह तो कठिन है!\'* — यहीं भ्रांति टूटेगी। २.', '**प्रतिस्थापन-प्रयोग (Substitution Test):** प्रत्येक मुख्य शब्द के लिए कहिए: *"इसकी जगह इसका समानार्थी रख दो — अर्थ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का तात्पर्य रचनाकार द्वारा कथ्य, पात्र, परिवेश और उद्देश्य.',
          hint: 'यदि अटके तो **पदावली नोड (c11_hin_ar_cbse_01_010)** के \'शब्द-वर्गीकरण अभ्यास\' और.',
          misconception: '**विशिष्ट भ्रम**: छात्र प्रायः मान लेते हैं कि **\'भाषा-प्रयोग विश्लेषण\' का अर्थ \'कठिन/तत्सम शब्दों की सूची बनाना\' है**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का तात्पर्य रचनाकार द्वारा कथ्य, पात्र, परिवेश और उद्देश्य के अनुरूप',
                  options: ['पाठ में भाषा-प्रयोग का तात्पर्य रचनाकार द्वारा कथ्य, पात्र, परिवेश और उद्देश्य के अनुरूप', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो'],
                  hint: 'यदि अटके तो **पदावली नोड (c11_hin_ar_cbse_01_010)** के \'शब्द-वर्गीकरण अभ्यास\' और \'प्रसंगिक अर्थ.',
                  misconception: '**विशिष्ट भ्रम**: छात्र प्रायः मान लेते हैं कि **\'भाषा-प्रयोग विश्लेषण\' का अर्थ \'कठिन/तत्सम शब्दों की सूची बनाना\' है**। उदाहरण के लिए, वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "पाठ से **तीन वाक्य** चुनो जहाँ भाषा **\'कठिन\' न लगे पर **\'प्रभावी\' लगे**।" (उदाहरण: अलोपीदीन.', 'कैसे?" (हाँ, चरित्र की प्रामाणिकता, ग्रामीण ठसक, भावनात्मक तीव्रता खो जाती है)। **चरण 3**: समझाएँ — "भाषा-प्रयोग.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर निश्चित, संक्षिप्त.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_01_002 (कथानक)** और **c11_hin_ar_cbse_01_004 (नायक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आशय-सूचक\' प्रश्न का अर्थ है **\'अपनी राय/कल्पना लिखना\'** (Subjective Opinion)।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर निश्चित, संक्षिप्त और',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर निश्चित, संक्षिप्त और', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_01_002 (कथानक)** और **c11_hin_ar_cbse_01_004 (नायक पात्र-चित्रण)** को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आशय-सूचक\' प्रश्न का अर्थ है **\'अपनी राय/कल्पना लिखना\'** (Subjective Opinion)। वे सोचते हैं: "चूंकि.' }
          ],
            remediations: { 'subjective-opinion': { steps: ['**पहचान:** छात्र से कहें — "अपना उत्तर पढ़ो और बताओ: तुमने कौन-सा वाक्य पाठ से उठाया है?" यदि वह एक भी वाक्य न बता पाए.', '**अभ्यास:** उसे एक छोटा गद्यांश दें और केवल **\'प्रमाण ढूंढो\'** का कार्य दें (उत्तर न लिखवाएं)। जैसे: "वह वाक्य छांटो जो.', '**संरचना दें:** PEEL शीट दें — P: बिंदु, E: पाठ का वाक्य (कोट करें), E: समझाएं कि यह वाक्य आपके बिंदु को कैसे सिद्ध.', '**प्रतिपुष्टि (Feedback):** उसके लिखे उत्तर में \'राय वाले वाक्य\' (मुझे लगता है, शायद) को लाल पेन से काटें और \'प्रमाण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
