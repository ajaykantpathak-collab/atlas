import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch14_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch14_p1',
    title: 'पाठ 14 · Part 1/3',
    subtitle: 'Read the poems of a woman the palace tried to silence — and the canon tried to forget.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 14 · Part 1/3',
    chapters: ['c11_hin_ar_ch14'],
    nodeIds: ['c11_hin_ar_cbse_14_001', 'c11_hin_ar_cbse_14_002', 'c11_hin_ar_cbse_14_003', 'c11_hin_ar_cbse_14_004', 'c11_hin_ar_cbse_14_005', 'c11_hin_ar_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader holding a locked diary that got out anyway', intro: 'Imprisoned for writing, released on conditions, betrayed, escaped — her biography isn\'t background; it\'s the poems\' skeleton.', goal: 'Read biography as the structural logic of the poems and evaluate their unresolved moral ending.' },
    discovery: {
        question: 'A queen imprisoned by her own king for writing poetry negotiates three conditions for release, he breaks them, she breaks out — what is this life to her poems?',
        options: ['The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice', 'Nothing — biography shouldn\'t colour literary analysis', 'It\'s background colour for a romantic reading', 'It proves the poems are only about palace politics'],
        answer: 'The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice',
        hook: 'A Chhayavad-era woman wrote in Braj Bhasha so village women could read her — and the canon excluded her for decades for exactly that choice.',
    },
    teaching: [
        { title: 'पाठ 14 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश (पृष्ठभूमि) तथा लेखक के जीवन-परिचय, साहित्यिक योगदान एवं वैचारिक दृष्टिकोण.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the two poems as a diptych — systemic oppression in one, a hunter\'s frozen moral crisis in the other — and judge the unresolved \'if I kill her\' ending.',
        labels: ['पाठ 14 — पृष्ठभूमि', 'पाठ 14 — कथानक', 'पाठ 14 — पाठ्य-परिवेश', 'पाठ 14 — पात्र-चित्रण', 'पाठ 14 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_14_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 14 · Part 1/3', spots: [
            { id: 's1', label: '14 -', prompt: 'Which idea is this? — कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश.', answer: '14 -', options: ['14 -', '14 -'] },
            { id: 's2', label: '14 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal.', answer: '14 -', options: ['14 -', '14 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary society is debating why a Chhayavad-era queen who wrote in Braj Bhasha — imprisoned by her own husband for writing — was left out of the canon for decades. A member says: \'Probably her poems were just weaker; canon committees judge merit, not politics.\'',
            decisions: [{ prompt: 'What does her case actually reveal?', options: [
                { text: 'Read exclusion as power, not merit: she wrote in Braj so village women could access her work — a choice the Khari Boli canon punished. And biography is structural logic: imprisoned for writing, she negotiated three release conditions, he broke them, and she broke out — so the second poem\'s knocking on the door is a political act, and the first\'s call for reform is a survivor\'s testimony, not abstract preaching.', outcome: 'The debate reframes: canon-making is a struggle over language, gender and authority — her life is the interpretive key, not an anecdote.' },
                { text: 'Accept the merit explanation — the canon reflects quality, and exclusion just means weaker verse.', outcome: 'That ignores the documented mechanism: her Braj Bhasha choice — made for accessibility — was itself the grounds for exclusion, a language-and-gender judgment dressed as taste.', reveals: 'canon-is-pure-merit' },
                { text: 'Separate the poems from her life — read them on their own without biography.', outcome: 'Here biography IS the structure: the diptych pairs systemic oppression (poem 1) with the individual moral crisis it produces (poem 2) — her imprisonment and escape are the logic, not decoration.', reveals: 'ignore-biography-read-text-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'The hunter\'s hand stays raised and the poem refuses to lower it — the reader must live inside the poor man\'s eternal dilemma.',
            decisions: [{ prompt: 'What comes next? पाठ 14 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 14 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे.',
          hint: 'यदि अटके हुए हैं, तो कक्षा 10 की हिंदी पाठ्यपुस्तक (स्पर्श/संचयन) के किसी एक पाठ का \'जीवन.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पृष्ठभूमि\' का अर्थ केवल \'इतिहास की तारीखें और घटनाएं\' रटना है और \'रचनाकार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक **कथन (बताकर)**,'],
                  hint: 'यदि अटके हुए हैं, तो कक्षा 10 की हिंदी पाठ्यपुस्तक (स्पर्श/संचयन) के किसी एक पाठ का \'जीवन परिचय\' और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पृष्ठभूमि\' का अर्थ केवल \'इतिहास की तारीखें और घटनाएं\' रटना है और \'रचनाकार परिचय\' का अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**तथ्य से संबंध जोड़ो (Bridge Fact to Text):** रचनाकार की जीवनी से 3 प्रमुख बिंदु चुनें (जैसे: गांव में बीता बचपन.', '**पृष्ठभूमि का \'कारण-निवेश\' (Root Cause Analysis):** पाठ की एक प्रमुख समस्या (जैसे: नायक का कर्ज) लें और पूछें — "यह.', '**\'आवाज़\' पहचान का अभ्यास:** रचनाकार के किसी अन्य छोटे अंश (पाठ्यपुस्तक से बाहर) को पढ़ें और फिर पाठ 14 का अंश पढ़ें।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_002', difficulty: 'standard',
          question: 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष.',
          hint: 'अगर फँसें तो c11_hin_ar_cbse_14_001 (पाठ 14 — पृष्ठभूमि और रचनाकार परिचय) की समीक्षा.',
          misconception: 'छात्र अक्सर यह मानते हैं कि यदि कोई कहानी समय के क्रम में नहीं बताई जाती (जैसे flashback के साथ) तो उसका कथानक भी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश',
                  options: ['कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक **कथन (बताकर)**,'],
                  hint: 'अगर फँसें तो c11_hin_ar_cbse_14_001 (पाठ 14 — पृष्ठभूमि और रचनाकार परिचय) की समीक्षा करें, विशेषकर.',
                  misconception: 'छात्र अक्सर यह मानते हैं कि यदि कोई कहानी समय के क्रम में नहीं बताई जाती (जैसे flashback के साथ) तो उसका कथानक भी अनैखिक हो जाता है - वे.' }
          ],
            remediations: { 'flashback': { steps: ['पहले छात्र से कहें कि वह किसी भी कहानी की घटनाओं को एक समय रेखा पर लगाए - बस क्या हुआ जब, बिना देखे कि इसे कैसे बताया.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_14_002 (कथानक और आख्यान-संरचना) के \'घटना-प्रवाह आरेख\' (event.',
          misconception: 'छात्र प्रायः \'परिवेश\' को केवल भौगोलिक स्थान (गाँव, शहर, नदी, पहाड़) तक सीमित कर देते हैं और \'वातावरण\' को केवल \'मूड\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,',
                  options: ['पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक **कथन (बताकर)**,'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_14_002 (कथानक और आख्यान-संरचना) के \'घटना-प्रवाह आरेख\' (event flow.',
                  misconception: 'छात्र प्रायः \'परिवेश\' को केवल भौगोलिक स्थान (गाँव, शहर, नदी, पहाड़) तक सीमित कर देते हैं और \'वातावरण\' को केवल \'मूड\' (mood) का पर्याय मान.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के एक छोटे अंश (5-6 पंक्तियाँ) दें और कहें: "केवल भौतिक संज्ञा शब्दों (nouns) को घेरें — जैसे छत, बरसात.', 'फिर कहें: "अब प्रत्येक संज्ञा के आगे वह विशेषण या क्रिया लिखें जो लेखक ने उसके साथ प्रयुक्त की है — जैसे \'टपकती छत\'.', 'अब पूछें: "इन विशेषणों/क्रियाओं से पाठक के मन में कौन-सी भावना जगती है?', '(घुटन, भय, निराशा, क्रोध)" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक **कथन.',
          hint: 'यदि फँस जाएँ: **कथानक संरचना (c11_hin_ar_cbse_14_002)** के \'संघर्ष\' और \'चरमोत्कर्ष\' खंड.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'पात्र-वर्णन\' (Character Description)** और **\'पात्र-चित्रण\' (Character Analysis)** को समान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक **कथन (बताकर)**,',
                  options: ['पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक **कथन (बताकर)**,', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,'],
                  hint: 'यदि फँस जाएँ: **कथानक संरचना (c11_hin_ar_cbse_14_002)** के \'संघर्ष\' और \'चरमोत्कर्ष\' खंड को दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'पात्र-वर्णन\' (Character Description)** और **\'पात्र-चित्रण\' (Character Analysis)** को समान मानते हैं। वे नायक.' }
          ],
            remediations: { 'character-description-character-analysis': { steps: ['**लक्षित उपचार (3 चरण):** 1.', '**अंतर स्पष्ट करो:** छात्र को एक ही पात्र के दो पैराग्राफ पढ़वाओ — एक **वर्णनात्मक** (केवल तथ्य), दूसरा.', '**PEEL का अभ्यास:** एक साधारण गुण (जैसे: \'साहसी\') देकर कहो: **P**oint लिखो, पाठ से **E**vidence ढूंढो, **E**xplain करो.', '**\'साक्ष्य-शिकार\' खेल:** 10 मिनट में पाठ से नायक के **एक गुण** के **3 भिन्न प्रमाण** (संवाद, कर्म, अन्य पात्र की राय).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो मुख्य नायक/नायिका के.',
          hint: 'यदि अटके तो नोड 004 (पात्र-चित्रण: नायक) की PEEL पद्धति और \'गोदान\' के कथानक सारांश (नोड.',
          misconception: 'छात्र मानते हैं कि \'सहायक पात्र\' का अर्थ \'कम महत्वपूर्ण पात्र\' होता है और परीक्षा में वे केवल मुख्य नायक के इर्द-गिर्द.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो मुख्य नायक/नायिका के समानांतर या',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र हैं जो मुख्य नायक/नायिका के समानांतर या', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,'],
                  hint: 'यदि अटके तो नोड 004 (पात्र-चित्रण: नायक) की PEEL पद्धति और \'गोदान\' के कथानक सारांश (नोड 002) को.',
                  misconception: 'छात्र मानते हैं कि \'सहायक पात्र\' का अर्थ \'कम महत्वपूर्ण पात्र\' होता है और परीक्षा में वे केवल मुख्य नायक के इर्द-गिर्द घूमने वाले विवरण लिख.' }
          ],
            remediations: { 'narrative-function': { steps: ['चरण 1: छात्र से पूछें — "इस पात्र को हटा दें तो कथानक में क्या टूटेगा?" यदि उत्तर "कुछ नहीं" हो, तो वह पात्र की कथात्मक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) कहानी का वह केंद्रीय विचार या भावभूमि है जिसके चारों.',
          hint: 'यदि अटका हुआ महसूस हो तो **कथानक संरचना (c11_hin_ar_cbse_14_002)** और **नायक पात्र-चित्रण.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'मुख्य विषय\' ढूंढने का अर्थ है कहानी का \'केंद्रीय पात्र कौन है\' या \'कहानी में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) कहानी का वह केंद्रीय विचार या भावभूमि है जिसके चारों ओर',
                  options: ['मुख्य विषय (Central Theme) कहानी का वह केंद्रीय विचार या भावभूमि है जिसके चारों ओर', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कथानक संरचना (c11_hin_ar_cbse_14_002)** और **नायक पात्र-चित्रण.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'मुख्य विषय\' ढूंढने का अर्थ है कहानी का \'केंद्रीय पात्र कौन है\' या \'कहानी में क्या-क्या हुआ\' बताना। वे.' }
          ],
            remediations: { 'plot-subject-matter-14': { steps: ['**स्पष्टीकरण:** छात्र को समझाएं — "विषय वह **वाक्य** है जो कहानी का सार बताता है, न कि वह **शब्द** जो कहानी का टॉपिक.', '**अभ्यास:** पाठ 14 से 3 प्रमुख घटनाएं चुनवाएं और पूछें — "इन तीनों में कॉमन (Common) कौन-सा बड़ा विचार है?" वही विषय.', '**तुलना:** दो कहानियों (जैसे: \'उषा\' और \'अपना-अपना भाग्य\') का विषय आमने-सामने रखवाएं — समान विषय, अलग कथावस्तु — इससे.', '**लेखन:** छात्र से कहें — "विषय को एक वाक्य में लिखो, फिर उस वाक्य से \'संदेश\' अलग करो।" बार-बार लिखने से अवधारणा स्थिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
