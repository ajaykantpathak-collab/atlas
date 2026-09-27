import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch15_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch15_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch15_p2',
    title: 'पाठ 15 · Part 2/3',
    subtitle: 'Watch a poem dismantle your definitions before it offers its own.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 15 · Part 2/3',
    chapters: ['c11_hin_ar_ch15'],
    nodeIds: ['c11_hin_ar_cbse_15_007', 'c11_hin_ar_cbse_15_008', 'c11_hin_ar_cbse_15_009', 'c11_hin_ar_cbse_15_010', 'c11_hin_ar_cbse_15_011', 'c11_hin_ar_cbse_15_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a hill journalist naming the cruelty inside ordinary leaving', intro: 'Men leave Garhwal for Delhi\'s scaffolds and it barely counts as news — the poem asks what \'small\' and \'cruel\' really mean.', goal: 'Analyse the negative-then-positive argumentative structure and the poem\'s migrant-labour context.' },
    discovery: {
        question: 'The poem opens by listing what cruelty is NOT — three whole stanzas of negatives. Cut them and lose nothing?',
        options: ['No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle', 'Yes — a poem should state its thesis upfront', 'Yes — negative definitions are logically empty', 'No — but only because the poem would be too short'],
        answer: 'No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle',
        hook: 'The refrain flips at the fourth stanza — \'not this\' becomes \'this is the most dangerous\' — and the imagery turns from home\'s warmth to a worker\'s weary feet.',
    },
    teaching: [
        { title: 'पाठ 15 — गौण विषय', text: 'गौण विषय (Sub-theme) वह कथात्मक धारा है जो मुख्य विषय के समानांतर चलती हुई कथानक को विस्तार, पात्रों को गहराई और सामाजिक यथार्थ को विश्वसनीयता प्रदान करती है, बिना मुख्य कथानक का अंग बने।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_15_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the stanza where negation flips to assertion, then weigh the title\'s provocation — \'the smallest is not the smallest\' — against 1980s hill migration.',
        labels: ['पाठ 15 — गौण', 'पाठ 15 — साहित्यिक', 'पाठ 15 — पदावली', 'पाठ 15 — व्याकरण', 'पाठ 15 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_15_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 15 · Part 2/3', spots: [
            { id: 's1', label: '15 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा रचना के विषय, पात्र, परिवेश और भाव-भंगिमा के.', answer: '15 -', options: ['15 -', '15 - -'] },
            { id: 's2', label: '15 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्टतः लिखित तथ्यों, घटनाओं, नामों या क्रम.', answer: '15 - -', options: ['15 - -', '15 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a kavi sammelan themed on migration, someone offers \'Laguta Sabse Chhoti Nahin Hoti\' but introduces it as \'a gentle poem about how small people also matter — mothers\' love, fathers\' laps, childhood warmth.\'',
            decisions: [{ prompt: 'What is the poem actually arguing, and how is it built?', options: [
                { text: 'Read the title as provocation from a people\'s-advocate journalist of Tehri Garhwal who watched villages empty as men left for Delhi\'s construction sites: \'smallness\' is redefined as the erosion of dignity when survival fractures belonging. Structurally it argues by elimination — the first stanzas keep saying what cruelty is NOT before the positives arrive, climaxing in the weary worker\'s feet — dignity dying slowly in everyday struggle.', outcome: 'The introduction is corrected: it\'s not a warm affirmation of small lives but a reckoning with what migration does to human worth — built like a debate, not a lullaby.' },
                { text: 'Keep the gentle reading — the poem lists tender images of family, so it\'s about the dignity of simple lives.', outcome: 'The early stanzas are negatives — what cruelty is NOT — positioned to be stripped away; reading them as the thesis stops before the poem\'s real answer.', reveals: 'poem-is-gentle-affirmation' },
                { text: 'Present it as having no real structure — it\'s a mood piece on poverty, not an argument.', outcome: 'The argumentative architecture is precise: sequenced denials, a refrain as hinge, and a final image as verdict — structure performs the elimination.', reveals: 'poem-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_012', title: 'The bigger picture',
          caseStudy: { intro: 'Written by a journalist who watched Tehri\'s villages empty to Delhi\'s construction sites — \'small\' was never about size; it\'s about what we\'re trained not to see.',
            decisions: [{ prompt: 'What comes next? पाठ 15 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 15 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह कथात्मक धारा है जो मुख्य विषय के समानांतर चलती हुई.',
          hint: 'यदि फँसें तो \'कथानक और आख्यान-संरचना\' (नोड 002) में \'उपकथानक\' (sub-plot) की अवधारणा.',
          misconception: 'छात्र समझते हैं कि \'गौण विषय = कम महत्वपूर्ण विषय\'। वे शब्द \'गौण\' (secondary) को \'गैर-जरूरी\' (unimportant) समझ लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह कथात्मक धारा है जो मुख्य विषय के समानांतर चलती हुई कथानक को',
                  options: ['गौण विषय (Sub-theme) वह कथात्मक धारा है जो मुख्य विषय के समानांतर चलती हुई कथानक को', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें'],
                  hint: 'यदि फँसें तो \'कथानक और आख्यान-संरचना\' (नोड 002) में \'उपकथानक\' (sub-plot) की अवधारणा दोहराएँ — गौण.',
                  misconception: 'छात्र समझते हैं कि \'गौण विषय = कम महत्वपूर्ण विषय\'। वे शब्द \'गौण\' (secondary) को \'गैर-जरूरी\' (unimportant) समझ लेते हैं। उदाहरण: पाठ 15 में.' }
          ],
            remediations: { 'secondary-unimportant-15': { steps: ['छात्र से कहें: "पाठ के 5 प्रमुख प्रसंग लिखो जो तुम्हें लगे मुख्य कहानी से अलग हैं।" 2.', 'प्रत्येक प्रसंग के लिए पूछें: "इस प्रसंग का अपना कौन-सा संघर्ष है?', 'इसका आरंभ-मध्य-अंत क्या है?" 3.', 'फिर पूछें: "अगर यह प्रसंग हटा दें, तो मुख्य पात्र/कहानी पर क्या फर्क पड़ेगा?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_008', difficulty: 'standard',
          question: '**बिंब (Imagery):** काव्य/गद्य में प्रयुक्त वह शब्द-योजना जो पाठक के मन में.',
          hint: 'यदि अटके: **उपमा और रूपक के १०-१० उदाहरण** लिखकर उनके **विधानिक अंतर** (जैसे/सा की.',
          misconception: '**विशिष्ट भ्रम:** छात्र **हर अंतर्निहित तुलना को रूपक मान लेते हैं** — जैसे "वह शेर दिल का है" (यह रूपक है), लेकिन "वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** काव्य/गद्य में प्रयुक्त वह शब्द-योजना जो पाठक के मन में इंद्रियगत',
                  options: ['**बिंब (Imagery):** काव्य/गद्य में प्रयुक्त वह शब्द-योजना जो पाठक के मन में इंद्रियगत', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें'],
                  hint: 'यदि अटके: **उपमा और रूपक के १०-१० उदाहरण** लिखकर उनके **विधानिक अंतर** (जैसे/सा की.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **हर अंतर्निहित तुलना को रूपक मान लेते हैं** — जैसे "वह शेर दिल का है" (यह रूपक है), लेकिन "वह शेर *जैसा* बहादुर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण १:** छात्र को ५ वाक्य दें — २ उपमा, २ रूपक, १ केवल बिंब। कहें: "हर वाक्य में \'जैसे/सा/सम\' ढूँढ़ो। जहाँ न हो, वहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसा साहित्यिक युक्ति है जिसमें कोई कथन या स्थिति.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_15_008 (बिंब और रूपक)** के \'रूपक के दो घटक: उपमान/उपमेय\' और.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'विरोधाभास\' को \'विरोधाभासी स्थिति\' (Situational Irony) या साधारण \'विरोध\' (Contrast) समझ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसा साहित्यिक युक्ति है जिसमें कोई कथन या स्थिति प्रथम',
                  options: ['**विरोधाभास (Paradox)** एक ऐसा साहित्यिक युक्ति है जिसमें कोई कथन या स्थिति प्रथम', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_15_008 (बिंब और रूपक)** के \'रूपक के दो घटक: उपमान/उपमेय\' और \'बिंब के.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'विरोधाभास\' को \'विरोधाभासी स्थिति\' (Situational Irony) या साधारण \'विरोध\' (Contrast) समझ लेते हैं।** उदाहरण.' }
          ],
            remediations: { 'situational-irony-contrast': { steps: ['**पुनर्पाठ (Re-read):** छात्र से कहें — पाठ का वह अंश दुबारा पढ़ें जहाँ विरोधाभास/प्रतीक लगा है; **पेंसिल से रेखांकित.', '**तर्क-परीक्षण (Logic Test):** पूछें — "अगर यह कथन शाब्दिक रूप से सच मान लें, तो क्या असंभव होगा?', 'और अगर झूठ मान लें, तो क्या सत्य बचेगा?" — विरोधाभास में **दोनों स्थितियों में एक सत्य बचता है**। 3.', '**प्रतीक-मानचित्र (Symbol Map):** एक तालिका बनवाएँ: कॉलम 1 — वस्तु/चरित्र (पाठगत), कॉलम 2 — भौतिक गुण, कॉलम 3 — संभावित.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_010', difficulty: 'standard',
          question: 'पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द या पद हैं जो पाठ के केंद्रीय.',
          hint: 'यदि अटके: \'मुख्य विषय और संदेश\' (c11_hin_ar_cbse_15_006) नोड पर लौटें और विषय को एक वाक्य.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य शब्द\' वे ही हैं जो पाठ में **सबसे अधिक बार आए हों** (word frequency) या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द या पद हैं जो पाठ के केंद्रीय विषय,',
                  options: ['पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द या पद हैं जो पाठ के केंद्रीय विषय,', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें'],
                  hint: 'यदि अटके: \'मुख्य विषय और संदेश\' (c11_hin_ar_cbse_15_006) नोड पर लौटें और विषय को एक वाक्य में.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य शब्द\' वे ही हैं जो पाठ में **सबसे अधिक बार आए हों** (word frequency) या जो **सबसे.' }
          ],
            remediations: { 'word-frequency-15': { steps: ['**पुनर्परिभाषित करें:** छात्र से कहें — "भूल जाओ कि शब्द कठिन है या सरल; बताओ: अगर इस शब्द को पाठ से हटा दूं, तो क्या.', 'यदि हाँ, तो यह मुख्य शब्द है।" 2.', '**वाक्य-प्रयोग करवाएं:** छात्र से प्रत्येक संभावित मुख्य शब्द का प्रयोग करते हुए **एक वाक्य** लिखने को कहें जो पाठ का.', '**श्रेणीकरण अभ्यास:** पहचाने गए शब्दों को तीन स्तंभों में बाँटें: (क) विषय-निर्माता (Theme-builders), (ख) तर्क-साधक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा रचना के विषय, पात्र, परिवेश और.',
          hint: 'अगर अटके तो कक्षा 9-10 के \'शब्द-भेद\' और \'वाच्य-परिवर्तन\' के अभ्यास पुनः देखें, विशेषकर.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ है पाठ में आए **कठिन शब्दों के अर्थ लिखना** या **संधि-समास-विग्रह करना**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा रचना के विषय, पात्र, परिवेश और भाव-भंगिमा के',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा रचना के विषय, पात्र, परिवेश और भाव-भंगिमा के', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें'],
                  hint: 'अगर अटके तो कक्षा 9-10 के \'शब्द-भेद\' और \'वाच्य-परिवर्तन\' के अभ्यास पुनः देखें, विशेषकर तत्सम-तद्भव.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ है पाठ में आए **कठिन शब्दों के अर्थ लिखना** या **संधि-समास-विग्रह करना**। वे यह नहीं देख पाते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के **एक ही भाव** (जैसे \'क्रोध\') के लिए प्रयुक्त **3-4 अलग शब्द** (जैसे: क्रोध, रोष, कोप, गुस्सा, खून.', 'हर शब्द के लिए पूछो: "यह शब्द यहाँ ही क्यों?', '\'गुस्सा\' यहाँ क्यों नहीं चला?" 3.', 'छात्र से कहो कि वह **अपनी भाषा में** उस शब्द की \'ध्वनि\', \'लंबाई\', \'संस्कृति\' और \'भाव-तीव्रता\' का वर्णन करे — शब्दकोश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्टतः लिखित तथ्यों, घटनाओं.',
          hint: 'यदि छात्र अटका हो तो **पाठ 15 के मुख्य विषय (नोड 006) और साहित्यिक युक्तियाँ (नोड 008.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न का उत्तर लंबा होना चाहिए\'** और **\'वस्तुनिष्ठ प्रश्न का उत्तर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्टतः लिखित तथ्यों, घटनाओं, नामों या क्रम',
                  options: ['वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्टतः लिखित तथ्यों, घटनाओं, नामों या क्रम', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें'],
                  hint: 'यदि छात्र अटका हो तो **पाठ 15 के मुख्य विषय (नोड 006) और साहित्यिक युक्तियाँ (नोड 008, 009)** की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न का उत्तर लंबा होना चाहिए\'** और **\'वस्तुनिष्ठ प्रश्न का उत्तर एक शब्द/वाक्य में.' }
          ],
            remediations: { 'paraphrasing': { steps: ['**पहचान अभ्यास:** छात्र को 10 मिश्रित प्रश्न दें (पाठ 15 के)। उसे केवल **लेबल** करना है: V (वस्तुनिष्ठ) / A (आशय-सूचक)।.', '**साक्ष्य-उद्धरण अभ्यास:** 3 आशय-सूचक प्रश्न दें। छात्र को **उत्तर नहीं लिखना**, केवल **पाठ की वे 2-3 पंक्तियाँ/शब्द.', '**PEEL ढाँचा सिखाएँ:** हर आशय-सूचक उत्तर के लिए: **P**oint (सीधा उत्तर), **E**vidence (पाठ-संदर्भ/उद्धरण).', '**आदर्श उत्तर तुलना:** बोर्ड के मॉडल उत्तर (मार्किंग स्कीम) और छात्र का उत्तर साथ रखें। छात्र से पूछें: "आपके उत्तर में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
