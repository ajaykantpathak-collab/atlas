import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch11_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch11_p2',
    title: 'पाठ 11 · Part 2/3',
    subtitle: 'Walk through a remembered home that slowly relocates inside the speaker.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 11 · Part 2/3',
    chapters: ['c11_hin_ar_ch11'],
    nodeIds: ['c11_hin_ar_cbse_11_007', 'c11_hin_ar_cbse_11_008', 'c11_hin_ar_cbse_11_009', 'c11_hin_ar_cbse_11_010', 'c11_hin_ar_cbse_11_011', 'c11_hin_ar_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an emigrant reconstructing a childhood home from memory', intro: 'A poet of the masses looks back at a mud-walled house — and finds the building was never the point.', goal: 'Analyse the poem\'s refrain-anchored structure and its movement from place to person to identity.' },
    discovery: {
        question: 'Bachchan\'s \'घर की याद\' keeps returning to the same refrain — is the repetition just decoration?',
        options: ['No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker', 'Yes — it\'s a leftover from oral tradition', 'Yes — poets repeat lines to fill stanzas', 'No — the refrain changes meaning each time, so it\'s three different lines'],
        answer: 'No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker',
        hook: 'The poem moves house → people → self: first walls and courtyards, then a father\'s voice and a mother\'s cooking, then the realization the home now lives inside the speaker.',
    },
    teaching: [
        { title: 'पाठ 11 — गौण विषय', text: 'गौण विषय (Sub-theme) कथा-साहित्य में वह द्वितीयक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलता हुआ, उसे पुष्ट करता हुआ, विस्तार देता हुआ या उसके विरोधाभास को उजागर करता हुआ, कृति के अर्थ-क्षेत्र को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split the poem into its three phases — physical house, human presence, internal landscape — and test what the circular ending gains.',
        labels: ['पाठ 11 — गौण', 'पाठ 11 — साहित्यिक', 'पाठ 11 — पदावली', 'पाठ 11 — व्याकरण', 'पाठ 11 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 2/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — भाषा-प्रयोग (Language Use) refers to the conscious selection and arrangement.', answer: '11 -', options: ['11 -', '11 - -'] },
            { id: 's2', label: '11 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न** वे हैं जिनका उत्तर निश्चित, संक्षिप्त और एकरेखीय होता है (तथ्यात्मक.', answer: '11 - -', options: ['11 - -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a poetry recital rehearsal, a classmate prepares Bachchan\'s \'Ghar ki Yaad\' and announces: \'It\'s a descriptive poem — the poet lists the walls, rooms and courtyard of his old house. I\'ll read it flat, like an estate agent\'s inventory.\'',
            decisions: [{ prompt: 'What should the performance convey instead?', options: [
                { text: 'Rebuild the reading around the arc: the poem moves from physical description to emotional memory — the father\'s voice, the mother\'s silence, the joint family — to philosophical reflection; the \'events\' are mental acts: remembering, comparing, realising. The refrain isn\'t decoration but the anchor pulling wandering memory back to the core truth: home is not a building but a living presence within the speaker.', outcome: 'The recital shifts register: the house outside becomes the house inside — a consciousness-driven journey, not an inventory.' },
                { text: 'Keep the flat reading — it IS a list of rooms and walls; honesty over drama.', outcome: 'Description is the entry, not the destination: the poem\'s structure carries the speaker from architecture to identity — flat reading strands it at the door.', reveals: 'poem-is-house-inventory' },
                { text: 'Add dramatic events instead — act out family scenes so the audience \'sees\' a plot.', outcome: 'Staging external scenes invents what the poem deliberately does internally: the structure is a memory-journey anchored by refrain, not a family drama.', reveals: 'invent-events-for-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'The house that \'stood silent\' in stanza one ends \'living in me\' — the same line, transformed by twelve stanzas of remembering.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कथा-साहित्य में वह द्वितीयक कथ्य-तत्व है जो मुख्य विषय के.',
          hint: 'यदि अटके तो नोड 006 (मुख्य विषय) पर लौटें: मुख्य विषय को 3-4 कीवर्ड में लिखें, फिर पाठ.',
          misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'गौण पात्र\' (minor character)** और **\'गौण विषय\' (sub-theme)** को मिला देते हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कथा-साहित्य में वह द्वितीयक कथ्य-तत्व है जो मुख्य विषय के समानांतर',
                  options: ['गौण विषय (Sub-theme) कथा-साहित्य में वह द्वितीयक कथ्य-तत्व है जो मुख्य विषय के समानांतर', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि'],
                  hint: 'यदि अटके तो नोड 006 (मुख्य विषय) पर लौटें: मुख्य विषय को 3-4 कीवर्ड में लिखें, फिर पाठ दुबारा पढ़ते.',
                  misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'गौण पात्र\' (minor character)** और **\'गौण विषय\' (sub-theme)** को मिला देते हैं। वे सोचते हैं: "मित्र एक गौण.' }
          ],
            remediations: { 'minor-character-sub-theme': { steps: ['**पृथक्करण अभ्यास**: छात्र से कहो—पाठ के 5 पात्रों के नाम लिखो (स्तंभ अ) और 5 विचार/संघर्ष लिखो जो पाठ में उठते हैं.', '**प्रसंग-निष्कर्षण**: एक गौण विषय (जैसे \'भाषा का संकट\') दो। छात्र से कहो—पाठ से **तीन** भिन्न प्रसंग (अलग पात्र/स्थिति).', '**मुख्य-विषय से संवाद**: प्रत्येक प्रसंग के लिए छात्र से एक वाक्य में लिखवाओ: "यह प्रसंग मुख्य विषय \'X\' को कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** शब्दों के माध्यम से पाठक की इंद्रियों (दृष्टि, श्रवण.',
          hint: 'यदि अटके तो **नोड 006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — विषय स्पष्ट होते ही.',
          misconception: '**सबसे घातक भ्रम**: छात्र **बिंब (Imagery)** को **अलंकार (Figure of Speech)** का पर्याय मान लेते हैं — जैसे "बिंब एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** शब्दों के माध्यम से पाठक की इंद्रियों (दृष्टि, श्रवण, स्पर्श, गंध,',
                  options: ['**बिंब (Imagery)** शब्दों के माध्यम से पाठक की इंद्रियों (दृष्टि, श्रवण, स्पर्श, गंध,', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि'],
                  hint: 'यदि अटके तो **नोड 006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — विषय स्पष्ट होते ही युक्तियाँ \'क्यों\'.',
                  misconception: '**सबसे घातक भ्रम**: छात्र **बिंब (Imagery)** को **अलंकार (Figure of Speech)** का पर्याय मान लेते हैं — जैसे "बिंब एक अलंकार है" लिख देना।.' }
          ],
            remediations: { 'imagery-figure-of-speech': { steps: ['**चरण 1**: छात्र से कहो — "आँख बंद करो और \'आम का अचार\' सोचो। क्या तुम्हें **खट्टापन** (स्वाद बिंब), **गंध** (घ्राण.', 'यह **बिंब** है — कोई अलंकार नहीं, केवल **इंद्रिय-जागरण**।" **चरण 2**: अब कहो — "अब बोलो: \'यादें आम के अचार जैसी खट्टी.', 'रूपक में \'जैसे\' नहीं, **सीधा आरोप**।" **चरण 3**: अभ्यास कराओ — पाठ से 5 पंक्तियाँ चुनवाओ, प्रत्येक में बिंब-प्रकार और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में आत्म-विरोधी.',
          hint: 'यदि फँसें तो **नोड c11_hin_ar_cbse_11_008** के "बिंब बनाम रूपक" खंड को दोबारा पढ़ें और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **विरोधाभास (Paradox)** को **विरोधाभासी स्थिति (Oxymoron)** समझ लेते हैं और दोनों को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में आत्म-विरोधी',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में आत्म-विरोधी', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि'],
                  hint: 'यदि फँसें तो **नोड c11_hin_ar_cbse_11_008** के "बिंब बनाम रूपक" खंड को दोबारा पढ़ें और 3-4 उदाहरणों.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **विरोधाभास (Paradox)** को **विरोधाभासी स्थिति (Oxymoron)** समझ लेते हैं और दोनों को समानार्थी मानते हैं।.' }
          ],
            remediations: { 'paradox-oxymoron-oxymoron': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**अंतर स्पष्टीकरण (15 मिनट):** दो कॉलम बनाएँ — बाएँ **Oxymoron** (पदबंध स्तर, दो शब्द), दाएँ **Paradox** (वाक्य/स्थिति.', '**प्रतीक बनाम रूपक/बिंब (15 मिनट):** त्रिकोण आरेख (Venn Diagram) खींचें — तीनों के **साझे गुण** (तुलनात्मक/चित्रात्मक).', '**अभ्यास (10 मिनट):** पाठ 11 के किसी अंश से 3-4 वाक्य दें; छात्र चिह्नित करे: यह Oxymoron है, Paradox है, Symbol है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द वे **महत्वपूर्ण पद/शब्द** हैं जो पाठ के केंद्रीय भाव.',
          hint: 'यदि अटके तो **\'पाठ का केंद्रीय विषय\' (नोड 11_006)** और **\'बिंब-रूपक\' (नोड 11_008)**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'मुख्य शब्द\' = \'कठिन/क्लिष्ट/संस्कृतनिष्ठ शब्द\'**। वे सरल, बोलचाल के शब्दों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द वे **महत्वपूर्ण पद/शब्द** हैं जो पाठ के केंद्रीय भाव, विषय-वस्तु,',
                  options: ['पदावली: मुख्य शब्द वे **महत्वपूर्ण पद/शब्द** हैं जो पाठ के केंद्रीय भाव, विषय-वस्तु,', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि'],
                  hint: 'यदि अटके तो **\'पाठ का केंद्रीय विषय\' (नोड 11_006)** और **\'बिंब-रूपक\' (नोड 11_008)** दोहराएँ — मुख्य.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'मुख्य शब्द\' = \'कठिन/क्लिष्ट/संस्कृतनिष्ठ शब्द\'**। वे सरल, बोलचाल के शब्दों (जैसे \'रोटी\', \'आँसू\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (तत्काल सुधार):** छात्र को पाठ से **5 सबसे सरल शब्द** चुनने को कहें (जिन्हें वह \'मामूली\' समझता हो)। **चरण 2.', 'यदि अलग, तो कैसे?" **चरण 4 (सिद्धांत स्थापन):** स्वयं खोजने दें कि सरल शब्द ही **सबसे अधिक \'बहु-अर्थी\' (Polysemous)**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग (Language Use) refers to the conscious selection and arrangement.',
          hint: 'If stuck, review \'वाक्य भेद\' (sentence types), \'सर्वनाम विशेषकर पुरुषवाचक सर्वनाम के भेद\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'भाषा-प्रयोग विश्लेषण\' का अर्थ है — पाठ में आए *कठिन/तत्सम शब्दों की सूची.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग (Language Use) refers to the conscious selection and arrangement of',
                  options: ['भाषा-प्रयोग (Language Use) refers to the conscious selection and arrangement of', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि'],
                  hint: 'If stuck, review \'वाक्य भेद\' (sentence types), \'सर्वनाम विशेषकर पुरुषवाचक सर्वनाम के भेद\' (pronoun.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'भाषा-प्रयोग विश्लेषण\' का अर्थ है — पाठ में आए *कठिन/तत्सम शब्दों की सूची बनाना* या *व्याकरणिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहें — "पाठ का कोई एक संवाद जोर से पढ़ो, जैसे तुम वही पात्र हो। फिर वही बात \'स्कूल के.', 'लिखो।" इससे वे \'रजिस्टर परिवर्तन\' (register shift) को शरीरानुभव करेंगे। 2.', '**दूसरा कदम:** पाठ से दो वाक्य दें — एक आंचलिक संवाद, एक साहित्यिक वर्णन। पूछें: "अगर लेखक यहाँ भी वही शब्द इस्तेमाल.', '**तीसरा कदम:** एक तालिका बनवाएँ: स्तंभ — पात्र / शब्द चयन / सर्वनाम / वाक्य प्रकार / प्रभाव। छात्र स्वयं भरें। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे हैं जिनका उत्तर निश्चित, संक्षिप्त और एकरेखीय होता है.',
          hint: 'यदि फंसे हों तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 009 (विरोधाभास और प्रतीक)** को.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **\'आशय-सूचक\' का अर्थ \'अपनी राय/कल्पना लिखना\' है**। वे उत्तर में पाठ-आधारित प्रमाण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** वे हैं जिनका उत्तर निश्चित, संक्षिप्त और एकरेखीय होता है (तथ्यात्मक',
                  options: ['**वस्तुनिष्ठ प्रश्न** वे हैं जिनका उत्तर निश्चित, संक्षिप्त और एकरेखीय होता है (तथ्यात्मक', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि'],
                  hint: 'यदि फंसे हों तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 009 (विरोधाभास और प्रतीक)** को दोहराएं.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **\'आशय-सूचक\' का अर्थ \'अपनी राय/कल्पना लिखना\' है**। वे उत्तर में पाठ-आधारित प्रमाण (Textual Evidence).' }
          ],
            remediations: { 'textual-evidence': { steps: ['**चरण 1**: छात्र को एक ही विषय पर दो प्रश्न दें — एक वस्तुनिष्ठ ("होरी की मृत्यु कैसे हुई?"), एक आशय-सूचक ("होरी की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
