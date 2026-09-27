import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch12_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch12_p2',
    title: 'पाठ 12 · Part 2/3',
    subtitle: 'Follow a village postman who delivers an argument instead of a letter.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 12 · Part 2/3',
    chapters: ['c11_hin_ar_ch12'],
    nodeIds: ['c11_hin_ar_cbse_12_007', 'c11_hin_ar_cbse_12_008', 'c11_hin_ar_cbse_12_009', 'c11_hin_ar_cbse_12_010', 'c11_hin_ar_cbse_12_011', 'c11_hin_ar_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a villager deciding whether \'पढ़ ले\' is an order or an invitation', intro: 'A postman calls at the door and finds the letters useless to the woman inside — so he tries to hand her the alphabet itself.', goal: 'Read the poem as a narrative of persuasion and evaluate its open, imperative ending.' },
    discovery: {
        question: 'A postman urges an illiterate villager to learn letters; the poem ends on \'पढ़ ले!\' — does the villager learn to read by the end?',
        options: ['No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader', 'Yes — she reads her letter in the final stanza', 'Yes — literacy is achieved by stanza six', 'No — the postman gives up instead'],
        answer: 'No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader',
        hook: 'Agyeya the linguist wrote in the people\'s dialect on purpose — the poem isn\'t about letters, it\'s about reclaiming agency.',
    },
    teaching: [
        { title: 'पाठ 12 — गौण विषय', text: 'गौण विषय (Sub-theme/Sub-plot) कथानक में मुख्य विषय के समानांतर चलने वाला वह द्वितीयक कथात्मक सूत्र है जो मुख्य विषय को पूरक, विरोधाभासी, या विस्तारित करता हुआ कथा-संरचना को गहराई, व्यापकता और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart the postman\'s arrival to the command \'पढ़ ले!\' as a narrative arc, then argue whether a revolutionary poet\'s literacy poem can be called propaganda.',
        labels: ['पाठ 12 — गौण', 'पाठ 12 — साहित्यिक', 'पाठ 12 — पदावली', 'पाठ 12 — व्याकरण', 'पाठ 12 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_12_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 2/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा अपने विचारों को प्रभावी ढंग से व्यक्त करने के.', answer: '12 -', options: ['12 -', '12 - -'] },
            { id: 's2', label: '12 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न पाठ के **स्पष्ट तथ्यों, घटनाओं, पात्रों के नाम, समय, स्थान** आदि की.', answer: '12 - -', options: ['12 - -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is adapting Agyeya\'s poem — a postman urging an illiterate villager to read — for a street play. The adapter wants to add a narrator to \'explain the poet\'s sadness about illiteracy\' and soften the postman\'s command \'पढ़ ले!\' into polite persuasion.',
            decisions: [{ prompt: 'Why do both changes miss the poem\'s design?', options: [
                { text: 'Keep it narrative and keep the force: this isn\'t a lyric about sadness — it\'s a performed confrontation carried entirely in dialogue, no narrator needed. The structure runs exposition (postman\'s arrival) through rising action (the villager\'s shame, the persuasion) to the climax \'पढ़ ले!\' and resolves in a vision of empowerment. Softening the command defuses the turning point — and context sharpens it: an experimentalist poet in the literacy-campaign era making language itself a tool of liberation.', outcome: 'The play preserves the poem\'s engine: dialogue as structure, the command as climax — oral culture crossing into literacy onstage.' },
                { text: 'Add the narrator — an audience needs someone to state the theme clearly.', outcome: 'The poem deliberately works without narration: the two voices carry the whole arc, and a narrator converts performance into summary.', reveals: 'narrator-needed-for-theme' },
                { text: 'Soften the command — \'please try reading\' is kinder and more realistic persuasion.', outcome: 'The imperative is the climax — the moment agency is handed over; softening it turns a demand for liberation into a suggestion.', reveals: 'soften-the-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'The poem never shows her reading — the last word is a command left open, because the literacy it imagines was still unfinished business.',
            decisions: [{ prompt: 'What comes next? पाठ 12 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 12 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme/Sub-plot) कथानक में मुख्य विषय के समानांतर चलने वाला वह.',
          hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो तुरंत नोड **c11_hin_ar_cbse_12_006** (मुख्य विषय और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'गौण विषय = कम शब्दों/प्रसंगों में आने वाला विषय\' — यानी मात्रात्मक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme/Sub-plot) कथानक में मुख्य विषय के समानांतर चलने वाला वह द्वितीयक',
                  options: ['गौण विषय (Sub-theme/Sub-plot) कथानक में मुख्य विषय के समानांतर चलने वाला वह द्वितीयक', '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक', '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो तुरंत नोड **c11_hin_ar_cbse_12_006** (मुख्य विषय और संदेश) पर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'गौण विषय = कम शब्दों/प्रसंगों में आने वाला विषय\' — यानी मात्रात्मक (quantitative) आधार पर.' }
          ],
            remediations: { 'quantitative-functional-12': { steps: ['**चरण 1:** छात्र से कहें: "पाठ 12 के 3 प्रमुख पात्र चुनो जो नायक **नहीं** हैं। प्रत्येक का एक स्वतंत्र संघर्ष लिखो।".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_008', difficulty: 'standard',
          question: '**बिंब (Imagery):** शब्दों के माध्यम से पाठक की इंद्रियों (दृष्टि, श्रवण, गंध.',
          hint: 'यदि अटके: **पाठ 12 का सारांश (नोड 006)** दोबारा पढ़ें और किसी एक प्रमुख भाव (जैसे.',
          misconception: 'छात्र अक्सर **\'रूपक\' को \'उपमा का संक्षिप्त रूप\'** मान लेते हैं — सोचते हैं "जैसे/जैसी हटाओ, रूपक बन गया"। यह भ्रांति.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** शब्दों के माध्यम से पाठक की इंद्रियों (दृष्टि, श्रवण, गंध, स्पर्श,',
                  options: ['**बिंब (Imagery):** शब्दों के माध्यम से पाठक की इंद्रियों (दृष्टि, श्रवण, गंध, स्पर्श,', '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक', '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि अटके: **पाठ 12 का सारांश (नोड 006)** दोबारा पढ़ें और किसी एक प्रमुख भाव (जैसे \'अकेलापन\'.',
                  misconception: 'छात्र अक्सर **\'रूपक\' को \'उपमा का संक्षिप्त रूप\'** मान लेते हैं — सोचते हैं "जैसे/जैसी हटाओ, रूपक बन गया"। यह भ्रांति इसलिए होती है क्योंकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**दृश्य-श्रवण अलगाव अभ्यास:** छात्र को 5 वाक्य दें जिनमें मिश्रित बिंब हों; उसे **रंगीन कलम से** दृश्य=लाल, श्रवण=नीला.', '**रूपक-उपमा रूपांतरण खेल:** कोई उपमा दें (जैसे "चाँद चाँदी के थाल सा है") — छात्र को **रूपक में बदलने** को कहें ("चाँद.', '**पाठ-आधारित खोज:** पाठ 12 से 3 रूपक छाँटकर लाने को कहें; प्रत्येक के लिए **उपमेय-उपमान टेबल** बनवाएँ और एक वाक्य में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो प्रथम दृष्ट्या तर्क-विरुद्ध.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_12_008 (बिंब और रूपक)** के कार्यित उदाहरण.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि **विरोधाभास = अलंकार (Figure of Speech) मात्र** है और **प्रतीक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो प्रथम दृष्ट्या तर्क-विरुद्ध, असंगत या',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो प्रथम दृष्ट्या तर्क-विरुद्ध, असंगत या', '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक', '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_12_008 (बिंब और रूपक)** के कार्यित उदाहरण (Worked.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि **विरोधाभास = अलंकार (Figure of Speech) मात्र** है और **प्रतीक = स्थूल वस्तु का.' }
          ],
            remediations: { 'figure-of-speech': { steps: ['**मूलभूत भेद स्पष्ट करें:** छात्र से कहें — "विरोधाभास एक **कथन-रचना** (Statement-structure) है जो अर्थ का **तनाव**.', '**सूक्ष्म पाठ-अभ्यास दें:** पाठ 12 से 3-4 छोटे अंश दें जहां विरोधाभास/प्रतीक हों। छात्र से केवल **पहचान** न करवाएं.', '**तुलनात्मक विश्लेषण:** दो समान प्रतीकों (जैसे दो रचनाओं में \'दीया\') की तुलना करवाएं — दिखाएं कि **प्रसंग** कैसे प्रतीक.', '**लेखन-आधारित सुदृढ़ीकरण:** छात्र से एक पैराग्राफ लिखने को कहें जहां वह **एक विरोधाभास और एक प्रतीक का संयुक्त प्रयोग**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_010', difficulty: 'standard',
          question: 'पदावली (Vocabulary/Glossary) किसी पाठ में प्रयुक्त **मुख्य, कठिन, तत्सम, तद्भव.',
          hint: 'यदि अटके: **\'शब्द-रचना (Morphology)\'** की NCERT कक्षा ९-१० व्याकरण इकाई दोहराएँ — विशेषतः.',
          misconception: '**विशिष्ट भ्रांति:** *"पदावली में शब्द का **पहला शब्दकोशीय अर्थ** लिख देना पर्याप्त है।"* **वास्तविकता:** हिंदी के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (Vocabulary/Glossary) किसी पाठ में प्रयुक्त **मुख्य, कठिन, तत्सम, तद्भव, देशज या',
                  options: ['पदावली (Vocabulary/Glossary) किसी पाठ में प्रयुक्त **मुख्य, कठिन, तत्सम, तद्भव, देशज या', '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक', '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि अटके: **\'शब्द-रचना (Morphology)\'** की NCERT कक्षा ९-१० व्याकरण इकाई दोहराएँ — विशेषतः **कृदंत.',
                  misconception: '**विशिष्ट भ्रांति:** *"पदावली में शब्द का **पहला शब्दकोशीय अर्थ** लिख देना पर्याप्त है।"* **वास्तविकता:** हिंदी के **बहुअर्थी शब्द.' }
          ],
            remediations: { 'polysemous-words': { steps: ['**चरणबद्ध उपचार (Remediation):** १.', '**पृथक्करण अभ्यास:** छात्र को १० बहुअर्थी शब्द देकर **३-३ प्रसंग** में वाक्य बनाने को कहो (जैसे: *मृदु, कठोर, तीखा.', '**प्रसंग-चिह्नीकरण:** पाठ के वाक्य में **लक्ष्य शब्द को रेखांकित** करवाओ और पूछो: *"यहाँ शब्द किस \'अनुभूति\' को व्यक्त.', '**अर्थ-श्रेणी मिलान:** शब्दकोश के ३-४ अर्थ देकर पूछो: *"पाठ के वाक्य के लिए कौन सा अर्थ **सटीक बैठता है** और शेष.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा अपने विचारों को प्रभावी ढंग से.',
          hint: 'अगर अटके तो कक्षा 9-10 के \'क्रिया और काल\' तथा \'वाक्य-रचना\' अध्याय दोहराएँ; विशेषकर.',
          misconception: 'छात्र समझते हैं कि \'व्याकरण: पाठ में भाषा-प्रयोग\' का अर्थ केवल त्रुटि-शोधन (error correction) या परिभाषाएँ रटना है; वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा अपने विचारों को प्रभावी ढंग से व्यक्त करने के',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा अपने विचारों को प्रभावी ढंग से व्यक्त करने के', '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक', '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'अगर अटके तो कक्षा 9-10 के \'क्रिया और काल\' तथा \'वाक्य-रचना\' अध्याय दोहराएँ; विशेषकर \'अपूर्ण/पूर्ण.',
                  misconception: 'छात्र समझते हैं कि \'व्याकरण: पाठ में भाषा-प्रयोग\' का अर्थ केवल त्रुटि-शोधन (error correction) या परिभाषाएँ रटना है; वे नहीं देखते कि लेखक.' }
          ],
            remediations: { 'error-correction': { steps: ['छात्र से कहें: "पाठ 12 के किसी एक पृष्ठ के 5 वाक्य चुनो और प्रत्येक की क्रिया को रेखांकित करो — फिर पूछो: \'लेखक ने.', 'अगर बदल दें तो क्या बदलेगा?\'" 2.', 'एक ही वाक्य के 3 रूप लिखवाएँ (सक्रिय/निष्क्रिय, भूत/वर्तमान, सरल/संयुक्त) और हर रूप का अर्थ-प्रभाव लिखवाएँ। 3.', 'पाठ के किसी मुहावरे को शाब्दिक भाषा में बदलवाएँ और पूछें: "क्या खो गया?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न पाठ के **स्पष्ट तथ्यों, घटनाओं, पात्रों के नाम, समय, स्थान**.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 009 (विरोधाभास और.',
          misconception: 'छात्र समझते हैं कि **\'आशय-सूचक प्रश्न का उत्तर = अपनी मन की राय\'** होता है, जबकि वास्तव में वह **पाठ-आधारित साक्ष्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न पाठ के **स्पष्ट तथ्यों, घटनाओं, पात्रों के नाम, समय, स्थान** आदि की',
                  options: ['वस्तुनिष्ठ प्रश्न पाठ के **स्पष्ट तथ्यों, घटनाओं, पात्रों के नाम, समय, स्थान** आदि की', '**पृष्ठभूमि** किसी रचना के सृजन के समय की ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनैतिक', '**कथानक (Plot)** कहानी की घटनाओं का तार्किक और कालानुक्रमिक (Chronological) क्रम है जो', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं के घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 009 (विरोधाभास और प्रतीक)**.',
                  misconception: 'छात्र समझते हैं कि **\'आशय-सूचक प्रश्न का उत्तर = अपनी मन की राय\'** होता है, जबकि वास्तव में वह **पाठ-आधारित साक्ष्य (textual evidence) से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **दो रंगों के हाइलाइटर** दें: पीला = तथ्य (वस्तुनिष्ठ), गुलाबी = भाव/आशय (आशय-सूचक)। 2.', 'एक छोटा अनुच्छेद दें; कहें "हर वाक्य को सही रंग से मार्क करो।" 3.', 'फिर पूछें: "पीले वाक्यों से कौन-से प्रश्न बनेंगे?', 'अंत में एक-एक प्रश्न का **PEEL उत्तर** लिखवाएँ। यह **दृश्य + सक्रिय वर्गीकरण** भ्रम तोड़ता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
