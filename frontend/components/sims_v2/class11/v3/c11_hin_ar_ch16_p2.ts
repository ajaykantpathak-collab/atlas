import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch16_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch16_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch16_p2',
    title: 'आओ, मलिकर बचाएँ · Part 2/3',
    subtitle: 'Enter a poem that shelters the village inside language itself.',
    classLevel: 11, subject: 'hin_ar', topic: 'आओ, मलिकर बचाएँ · Part 2/3',
    chapters: ['c11_hin_ar_ch16'],
    nodeIds: ['c11_hin_ar_cbse_16_007', 'c11_hin_ar_cbse_16_008', 'c11_hin_ar_cbse_16_009', 'c11_hin_ar_cbse_16_010', 'c11_hin_ar_cbse_16_011', 'c11_hin_ar_cbse_16_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village-born poet writing back to his own roots', intro: 'Rural hunger and city alienation share one poem — and the poet who left the village must decide whether to expose it or protect it.', goal: 'Analyse dialect as aesthetic choice and the poem\'s three-part protective structure.' },
    discovery: {
        question: 'A Nagpuri-speaking poet chooses \'tyok;q\' over standard Hindi \'tyok\' — just dialect flavour?',
        options: ['No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act', 'Yes — it means the same thing either way', 'Yes — he just didn\'t know standard Hindi', 'No — because Nagpuri is actually a different language entirely'],
        answer: 'No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act',
        hook: 'The poem\'s \'let\'s hide/save\' means both conceal and protect — the insider-outsider poet wraps language around wounds so they can be witnessed without being exposed.',
    },
    teaching: [
        { title: 'आओ, मलिकर बचाएँ — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**प्रतीक (Symbol)** एक ठोस वस्तु, व्यक्ति, स्थान या क्रिया है जो अपने स्थूल अर्थ के अतिरिक्त एक अमूर्त विचार, भावना या अवधारणा को अभिव्यक्त करता है। **बिंब (Imagery)** शब्दों द्वारा रचा गया वह जीवंत.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_16_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the three-stanza arc — invitation, catalog of burdens, quiet resistance — and test whether the shape is inevitable or arbitrary.',
        labels: ['आओ, मलिकर बचाएँ —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c11_hin_ar_cbse_16_010', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['शब्दकोश अर्थ — \'चीरना\' = फाड़ना, दो भागों में बाँटना (भौतिक.', 'व्युत्पत्ति/शैली — तद्भव मूल (चीरना ← संस्कृत \'चीर्ण\') →.', 'शब्द पहचान — \'चीरकर\' मूल क्रिया \'चीरना\' (Transitive verb).', 'प्रसंगानुकूल अर्थ — यहाँ \'अँधेरा\' अमूर्त/प्रतीकात्मक संज्ञा.', 'शब्द-चयन का औचित्य — कवि ने \'हटाकर\' या \'मिटाकर\' न कहकर.'], answer: 'शब्द पहचान — \'चीरकर\' मूल क्रिया \'चीरना\' (Transitive verb). शब्दकोश अर्थ — \'चीरना\' = फाड़ना, दो भागों में बाँटना (भौतिक. प्रसंगानुकूल अर्थ — यहाँ \'अँधेरा\' अमूर्त/प्रतीकात्मक संज्ञा. व्युत्पत्ति/शैली — तद्भव मूल (चीरना ← संस्कृत \'चीर्ण\') →. शब्द-चयन का औचित्य — कवि ने \'हटाकर\' या \'मिटाकर\' न कहकर.' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A translation club discusses a Nagpur-born poet who writes in Marathi and translates himself into Hindi, with a poem that begins \'come, let us hide\' and ends in quiet resistance. A member says: \'Pick either the village reading or the city reading — a poem can\'t be both. And the second stanza\'s long list is just imagery.\'',
            decisions: [{ prompt: 'What do both claims miss?', options: [
                { text: 'Hold the fracture: the poem speaks from inside the split between two Indias — the village with its caste, hunger and oral tradition versus the city with alienation and broken promises; the poet\'s self-translation embodies that crossing. And the list IS structure: stanza one commands (\'hide\'), stanza two stacks the burdens of modernity as rhythmic accumulation, stanza three turns declarative — \'even in this night, there\'s still much to hide.\' The form performs the hiding.', outcome: 'Both corrections land: the doubleness is the poem\'s subject, and the stanza pattern — imperative, catalogue, declaration — is the argument enacted, not ornament.' },
                { text: 'Choose the city reading — the poem lists modern burdens, so it\'s about urban alienation only.', outcome: 'Halving it destroys the tension: the poem\'s meaning lives in the contrast between village and city, agrarian memory and urban displacement.', reveals: 'pick-one-world-reading' },
                { text: 'Treat the middle stanza\'s list as decorative imagery to be sampled, not analysed.', outcome: 'The accumulation is structural enactment — the burdens pile up rhythmically so the reader feels the weight the speaker hides from.', reveals: 'list-is-just-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_012', title: 'The bigger picture',
          caseStudy: { intro: 'Invitation → enumeration → affirmation: a three-beat arc where each stanza tucks the reader deeper into what the modern world erodes.',
            decisions: [{ prompt: 'What comes next? आओ, मलिकर बचाएँ · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — आओ, मलिकर बचाएँ · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_007', difficulty: 'standard',
          question: '**प्रतीक (Symbol)** एक ठोस वस्तु, व्यक्ति, स्थान या क्रिया है जो अपने स्थूल.',
          hint: 'यदि फँसें तो **c11_hin_ar_cbse_16_002 (भावार्थ)** और **c11_hin_ar_cbse_16_006 (अलंकार)**.',
          misconception: '**सबसे गंभीर भ्रम**: छात्र **प्रतीक (Symbol)** और **रूपक (Metaphor)** को समान मान लेते हैं क्योंकि दोनों में \'एक वस्तु.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**प्रतीक (Symbol)** एक ठोस वस्तु, व्यक्ति, स्थान या क्रिया है जो अपने स्थूल अर्थ के',
                  options: ['**प्रतीक (Symbol)** एक ठोस वस्तु, व्यक्ति, स्थान या क्रिया है जो अपने स्थूल अर्थ के', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद'],
                  hint: 'यदि फँसें तो **c11_hin_ar_cbse_16_002 (भावार्थ)** और **c11_hin_ar_cbse_16_006 (अलंकार)** दोहराएँ.',
                  misconception: '**सबसे गंभीर भ्रम**: छात्र **प्रतीक (Symbol)** और **रूपक (Metaphor)** को समान मान लेते हैं क्योंकि दोनों में \'एक वस्तु दूसरी को दर्शाती.' }
          ],
            remediations: { 'symbol-metaphor-superimposition': { steps: ['**चरण 1**: छात्र से कहें — "कविता की कोई एक पंक्ति चुनो जो तुम्हें **दिखाई दे** (चित्र बने), **सुनाई दे**, या **महसूस.', 'कविता के विषय (आदिवासी जीवन) से जोड़ो।" — इससे प्रतीक की **संकेतात्मक (Suggestive)** प्रकृति स्पष्ट होगी। **चरण 3**: दो.', 'कहाँ शब्द स्वयं रहकर \'अन्य\' की ओर संकेत कर रहा है?" — तुलनात्मक अभ्यास से भ्रम दूर होगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_008', difficulty: 'standard',
          question: '\'मुख्य भाव और संदेश\' का अर्थ है कविता के उस **केंद्रीय विचार (Central Idea)**.',
          hint: 'यदि अटके तो **Node 007 (प्रतीक और बिंब)** के \'मलिकर\' प्रतीक विश्लेषण को दोबारा पढ़ें और.',
          misconception: 'छात्र प्रायः **\'मुख्य भाव\' (Central Theme) और \'संदेश\' (Message) को समानार्थी मान लेते हैं**। उदाहरण: वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मुख्य भाव और संदेश\' का अर्थ है कविता के उस **केंद्रीय विचार (Central Idea)** की पहचान',
                  options: ['\'मुख्य भाव और संदेश\' का अर्थ है कविता के उस **केंद्रीय विचार (Central Idea)** की पहचान', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद'],
                  hint: 'यदि अटके तो **Node 007 (प्रतीक और बिंब)** के \'मलिकर\' प्रतीक विश्लेषण को दोबारा पढ़ें और **Node 002.',
                  misconception: 'छात्र प्रायः **\'मुख्य भाव\' (Central Theme) और \'संदेश\' (Message) को समानार्थी मान लेते हैं**। उदाहरण: वे लिखते हैं — "मुख्य भाव: पेड़ बचाना.' }
          ],
            remediations: { 'central-theme-message': { steps: ['**भेद स्पष्ट करें:** बोर्ड पर दो कॉलम बनाएँ — \'भाव\' (क्या महसूस होता है?', 'सहअस्तित्व, भय, आशा) और \'संदेश\' (क्या करना है?', 'संगठित हों, नीति बदलें, निगरानी करें)। 2.', '**पंक्ति-आधारित अभ्यास:** कविता की 3 पंक्तियाँ दें — छात्र बताए प्रत्येक से \'भाव\' क्या निकला और \'संदेश\' क्या निकला। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_009', difficulty: 'standard',
          question: '**गौण भाव** (Secondary Theme) काव्य में मुख्य भाव का समर्थन, स्पष्टीकरण या.',
          hint: 'यदि अटके: c11_hin_ar_cbse_16_004 (केंद्रीय भाव और रस) और c11_hin_ar_cbse_16_008 (मुख्य.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **मुख्य विषय से हटने वाला हर प्रसंग \'विषयांतर\' ही होता है**। वे \'गौण भाव\' और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**गौण भाव** (Secondary Theme) काव्य में मुख्य भाव का समर्थन, स्पष्टीकरण या विस्तार करने',
                  options: ['**गौण भाव** (Secondary Theme) काव्य में मुख्य भाव का समर्थन, स्पष्टीकरण या विस्तार करने', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद'],
                  hint: 'यदि अटके: c11_hin_ar_cbse_16_004 (केंद्रीय भाव और रस) और c11_hin_ar_cbse_16_008 (मुख्य भाव और.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **मुख्य विषय से हटने वाला हर प्रसंग \'विषयांतर\' ही होता है**। वे \'गौण भाव\' और \'विषयांतर\' का अंतर.' }
          ],
            remediations: { 'functional-relevance': { steps: ['**केंद्रीय भाव को एक वाक्य में लिखवाएँ** — "कविता का एकमात्र उद्देश्य क्या है?" (उत्तर: मलिकर/लोक-संस्कृति बचाना)। 2.', '**हर विवादित अंश के लिए दो प्रश्न पूछें** — (अ) "क्या यह अंश मलिकर बचाने का कारण, प्रमाण, भावनात्मक बल या उपाय देता.', '**तुलना तालिका बनवाएँ** — दो स्तंभ: \'गौण भाव के लक्षण\' (समर्थन करता है, भावनात्मक बल देता है, तर्क पुष्ट करता है) बनाम.', '**अभ्यास**: कविता के 3-3 अंश देकर वर्गीकरण करवाएँ और **काव्य-पंक्ति उद्धृत कर तर्क मांगें**।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_010', difficulty: 'standard',
          question: 'पदावली (Vocabulary/Glossary) refers to the systematic study of difficult words.',
          hint: 'If stuck, review **c11_hin_ar_cbse_16_002 (पद्यांश-वार भावार्थ)** — specifically the.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कठिन शब्द" का अर्थ केवल "शब्दकोश से अर्थ ढूँढ़ना" है और "मुहावरे" का अर्थ केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (Vocabulary/Glossary) refers to the systematic study of difficult words (कठिन',
                  options: ['पदावली (Vocabulary/Glossary) refers to the systematic study of difficult words (कठिन', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद'],
                  hint: 'If stuck, review **c11_hin_ar_cbse_16_002 (पद्यांश-वार भावार्थ)** — specifically the stanza where.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कठिन शब्द" का अर्थ केवल "शब्दकोश से अर्थ ढूँढ़ना" है और "मुहावरे" का अर्थ केवल "रटे हुए वाक्य.' }
          ],
            remediations: { 'class-11-etymology': { steps: ['**शब्द-अलगाव अभ्यास (Word Isolation Drill):** कविता से 10 शब्द चुनें → प्रत्येक के लिए 4-स्तरीय शीट बनाएँ: (क) शब्दकोश.', '— 3 दिन तक रोज़ 2 शब्द करें। 2.', '**मुहावरा-विच्छेदन (Idiom Dissection):** 5 प्रमुख मुहावरों को शाब्दिक/लाक्षणिक/सांस्कृतिक तीन कॉलम में तोड़ें →.', '**उल्टा-प्रयोग (Reverse Application):** प्रत्येक मुहावरे का विपरीत भाव वाला मौलिक वाक्य लिखें — इससे प्रसंग-निर्भरता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग (Language Use in Poetry) वह भाषा-वैज्ञानिक विश्लेषण है.',
          hint: 'यदि अटका हुआ महसूस हो तो: **कक्षा ९-१० हिंदी व्याकरण (संधि, समास, कारक, वाक्य-रूपांतरण)**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पद्य में भाषा-प्रयोग\' का अर्थ केवल **कठिन शब्दों के अर्थ** बताना या **अलंकार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग (Language Use in Poetry) वह भाषा-वैज्ञानिक विश्लेषण है जिसमें कविता',
                  options: ['पद्य में भाषा-प्रयोग (Language Use in Poetry) वह भाषा-वैज्ञानिक विश्लेषण है जिसमें कविता', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद'],
                  hint: 'यदि अटका हुआ महसूस हो तो: **कक्षा ९-१० हिंदी व्याकरण (संधि, समास, कारक, वाक्य-रूपांतरण)** के NCERT.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पद्य में भाषा-प्रयोग\' का अर्थ केवल **कठिन शब्दों के अर्थ** बताना या **अलंकार पहचानना** है। वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉर्फोलॉजी ड्रिल:** कविता से ५ संज्ञा/क्रिया पद चुनें → उनका संधि-विच्छेद, समास-विग्रह, प्रत्यय-परिचय करें → पूछें.', '**सिंटैक्स मैपिंग:** एक पद्यांश लें → प्रत्येक वाक्य का **आरेख (ट्री/ब्रैकेट)** बनाएँ → सामान्य क्रम से विचलन चिह्नित.', '**ध्वनि-चित्रण:** एक स्टैंजा को IPA/देवनागरी ध्वनि-प्रतीकों में लिखें → आवर्ती ध्वनियों को रंगीन करें → पूछें: "यह.', '**तुलनात्मक अभ्यास:** उसी भाव को व्यक्त करने वाला **गद्य वाक्य** लिखें → दोनों की तुलना करें: क्या खोया, क्या पाया?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनका एक ही सही उत्तर होता है (जैसे बहुविकल्पी.',
          hint: 'यदि आशय निकालने में कठिनाई हो तो पहले stanza-wise भावार्थ (नोड 002) और केंद्रीय भाव (नोड.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में पाठ की सीधी पंक्तियों को दोहराते हैं, सोचते हैं कि यह पर्याप्त विश्लेषण है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनका एक ही सही उत्तर होता है (जैसे बहुविकल्पी,',
                  options: ['वस्तुनिष्ठ प्रश्न वे होते हैं जिनका एक ही सही उत्तर होता है (जैसे बहुविकल्पी,', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद'],
                  hint: 'यदि आशय निकालने में कठिनाई हो तो पहले stanza-wise भावार्थ (नोड 002) और केंद्रीय भाव (नोड 008) की.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में पाठ की सीधी पंक्तियों को दोहराते हैं, सोचते हैं कि यह पर्याप्त विश्लेषण है। उदाहरण के लिए, जब.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए: "यदि कोई वास्तव में रो रहा हो, तो कवि इसे कविता में क्यों लिखे?', 'क्या इससे कोई गहरा अर्थ हो सकता है?" फिर उनसे दो विकल्प दें: (A) शाब्दिक अर्थ: बच्चों के आंसू, (B) प्रतीकात्मक अर्थ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
