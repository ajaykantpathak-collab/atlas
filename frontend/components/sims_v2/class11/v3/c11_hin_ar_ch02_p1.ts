import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch02_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch02_p1',
    title: 'पाठ 2 · Part 1/3',
    subtitle: 'Watch a quiet cook defeat his master without ever raising his voice.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 2 · Part 1/3',
    chapters: ['c11_hin_ar_ch02'],
    nodeIds: ['c11_hin_ar_cbse_02_001', 'c11_hin_ar_cbse_02_002', 'c11_hin_ar_cbse_02_003', 'c11_hin_ar_cbse_02_004', 'c11_hin_ar_cbse_02_005', 'c11_hin_ar_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener piecing together a servant\'s hidden past', intro: 'Puris puff on the stove while a nickname — \'उल्हनिहु\' — opens a trapdoor into a whole colonial history.', goal: 'Analyse the story\'s flashback structure and read its silent ending as resistance.' },
    discovery: {
        question: 'The cook Phenku ends the story serving puris in silence — the narrator learned nothing, so the ending resolves nothing?',
        options: ['Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history', 'Right — an open ending is a narrative failure', 'Right — the colonial anecdote deserved a dramatic payoff', 'Wrong — he actually resigns at the end'],
        answer: 'Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history',
        hook: 'The story hides its oldest event two-thirds of the way in — a flashback that only lands because we met the dignified cook first.',
    },
    teaching: [
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल है जिसमें किसी रचना के लेखन-कालीन ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश तथा रचनाकार के व्यक्तिगत जीवन-अनुभव.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Reorder the five scenes by narrative logic rather than chronology, and argue why the colonial-officer flashback lands where it does.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_005', title: 'पाठ 2 — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: 'Think about your best friend — how they react when you\'re angry reveals your temper, how they support you shows your vulnerabilities, and how they disagree.',
            decisions: [{ prompt: '\'नमक का दारोगा\' में पंडित अलोपीदीन की भूमिका को एक वाक्य में परिभाषित कीजिए।', options: [
                { text: 'पंडित अलोपीदीन मुंशी वंशीधर के नैतिक दृढ़ता के प्रतिबिंब (foil) के रूप में कार्य करते', outcome: 'पंडित अलोपीदीन मुंशी वंशीधर के नैतिक दृढ़ता के प्रतिबिंब (foil) के रूप में कार्य करते हैं, जिनका.' },
                { text: 'वो एक भ्रष्ट जमींदार हैं', outcome: 'Not quite — **Exact error:** Students equate "सहायक पात्र" (supporting character) with "कम महत्वपूर्ण पात्र".', reveals: 'exact-error-students-equate-supporting' },
                { text: 'description vs', outcome: 'Not quite — **Exact error:** Students equate "सहायक पात्र" (supporting character) with "कम महत्वपूर्ण पात्र".', reveals: 'exact-error-students-equate-supporting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a regional-literature seminar you present Renu\'s anchalik katha and Yashpal\'s \'Phenku\' story. A classmate objects: \'These dialect words and folk songs are local colour — decoration. And the Phenku story is simple: master questions cook, cook answers, done in order.\'',
            decisions: [{ prompt: 'What\'s the better analysis?', options: [
                { text: 'Show the machinery: in anchalik fiction the dialect, folk songs and agrarian rituals aren\'t colour — they carry the meaning and the tension between tradition and modernity. And Yashpal\'s structure is the argument: the colonial-officer anecdote arrives as a flashback two-thirds in, so we meet Phenku\'s present dignity BEFORE learning his past — the quiet \'simple\' cook becomes the moral centre while the talkative master shrinks.', outcome: 'Both corrections land: form is meaning — dialect is the story\'s engine, and narrative sequencing is how the servant outwits the master without raising his voice.' },
                { text: 'Agree dialect is decoration — translate it into standard Hindi so the \'real\' story shows clearly.', outcome: 'Removing the regional register removes the story: anchalik katha locates meaning in the specific soil, speech and ritual of the region.', reveals: 'dialect-is-decoration' },
                { text: 'Retell Phenku chronologically — put the officer anecdote first so events run in order.', outcome: 'Chronological retelling destroys the irony: the flashback\'s late placement is what lets present dignity precede past humiliation.', reveals: 'reorder-flashback-chronologically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'A servant who never raises his voice outwits everyone — the structure does the same to the reader.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक.',
          hint: 'यदि अटके तो \'नई कहानी आंदोलन\' की मूल स्थापनाओं (अनुभूति की प्रामाणिकता, शिल्पगत प्रयोग.',
          misconception: 'छात्र अक्सर \'रचनाकार परिचय\' को \'जीवनी के तथ्य रटना\' (जन्म-तिथि, शिक्षा, पुरस्कार, प्रसिद्ध कृतियाँ) समझ लेते हैं और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल',
                  options: ['पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटके तो \'नई कहानी आंदोलन\' की मूल स्थापनाओं (अनुभूति की प्रामाणिकता, शिल्पगत प्रयोग, मध्यवर्गीय.',
                  misconception: 'छात्र अक्सर \'रचनाकार परिचय\' को \'जीवनी के तथ्य रटना\' (जन्म-तिथि, शिक्षा, पुरस्कार, प्रसिद्ध कृतियाँ) समझ लेते हैं और परीक्षा में वही लिख.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से रचनाकार की किन्हीं दो जीवन-घटनाओं को लिखवाएं (जैसे: बचपन में पिता का निधन, शहर में नौकरी के दौरान.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता.',
          hint: 'यदि अटका हुआ महसूस हो तो \'फैबुला बनाम स्यूज़ेट\' (Fabula vs Syuzhet) की रूसी औपचारिकतावादी.',
          misconception: 'छात्र अक्सर मानते हैं कि \'कथानक = कहानी का सारांश\' और \'आख्यान-संरचना = अध्यायों/भागों का विभाजन\'। यह भ्रम इसलिए होता है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि',
                  options: ['कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो तो \'फैबुला बनाम स्यूज़ेट\' (Fabula vs Syuzhet) की रूसी औपचारिकतावादी अवधारणा.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'कथानक = कहानी का सारांश\' और \'आख्यान-संरचना = अध्यायों/भागों का विभाजन\'। यह भ्रम इसलिए होता है क्योंकि स्कूली स्तर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक परिचित फिल्म (जैसे \'बाहुबली\' या \'दृश्यम\') का कथानक कालानुक्रम में लिखने को कहें (5-6 बिंदु)। 2.', 'फिर उसी फिल्म के दृश्यों का क्रम लिखने को कहें जैसा फिल्म में दिखाया गया है। 3.', 'दोनों सूचियों की तुलना करवाएं: "फिल्म ने घटना X को घटना Y से पहले क्यों दिखाया जबकि वास्तव में Y पहले घटी?" 4.', 'इस अंतर को \'कथानक बनाम आख्यान-संरचना\' का नाम दें। 2-3 अभ्यासों के बाद छात्र स्वयं विचलन पहचानने लगेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_003', difficulty: 'standard',
          question: '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल.',
          hint: 'अगर अटका हुआ महसूस हो तो **\'कथानक और आख्यान-संरचना\' (c11_hin_ar_cbse_02_002)** के.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **\'वातावरण केवल विशेषणों (Adjectives) से बनता है\'** — जैसे \'डरावना जंगल\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),',
                  options: ['**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'अगर अटका हुआ महसूस हो तो **\'कथानक और आख्यान-संरचना\' (c11_hin_ar_cbse_02_002)** के \'चरमोत्कर्ष.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **\'वातावरण केवल विशेषणों (Adjectives) से बनता है\'** — जैसे \'डरावना जंगल\', \'सुंदर बगीचा\', \'उदास.' }
          ],
            remediations: { 'adjectives': { steps: ['**माइक्रो-एनालिसिस अभ्यास**: छात्र को एक छोटा अनुच्छेद (५० शब्द) दें — उसे **हर विशेषण को काटकर** केवल **क्रियाओं.', '**तुलनात्मक सारणी बनवाएँ**: दो कॉलम — बायाँ: \'लेखक ने क्या लिखा (पद/पदबंध)\', दायाँ: \'पाठक पर क्या असर हुआ (संवेदना)\'।.', '**\'क्यों\' का पीछा करें**: हर पहचाने गए शब्द/युक्ति के लिए पूछें — "अगर लेखक यहाँ \'चल रहा था\' के बजाय \'घिसट रहा था\'.', '**बोर्ड-उत्तर संरचना सिखाएँ**: (बिंदु) → (उद्धरण/संदर्भ) → (युक्ति का नाम) → (वातावरण पर प्रभाव) → (कथानक/पात्र से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_02_002 (कथानक संरचना)** के \'प्रमुख मोड़\' खंड को दोहराएँ और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण का अर्थ है पात्र के **गुणों की सूची (list of traits)** बनाना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_02_002 (कथानक संरचना)** के \'प्रमुख मोड़\' खंड को दोहराएँ और पाठ में.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण का अर्थ है पात्र के **गुणों की सूची (list of traits)** बनाना — जैसे "नायक ईमानदार.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**मॉडलिंग (Modeling):** शिक्षक एक छोटे ज्ञात पात्र (जैसे \'पंचतंत्र का शेर\' या \'मुंशी प्रेमचंद की \'ईदगाह\' का हामिद) लेकर.', '**सैफोल्डिंग (Scaffolding):** छात्र को **\'पात्र-चित्रण ग्राफिक ऑर्गनाइज़र\'** दें जिसमें चार कॉलम हों: *प्रसंग/घटना →.', '**तुलनात्मक अभ्यास:** दो कमज़ोर और एक मजबूत नमूना उत्तर दिखाएँ; छात्रों से कहें **\'कमज़ोर उत्तर में क्या गायब है?\'**.', '**माइक्रो-लेखन:** पूरे चित्रण के बजाय, केवल **एक प्रसंग पर एक पैराग्राफ** लिखने को कहें, सख्त शब्द-सीमा (50 शब्द) में।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो मुख्य पात्र.',
          hint: 'Review "नायक का संघर्ष और चरित्र-परिवर्तन" from node c11_hin_ar_cbse_02_004.',
          misconception: '**Exact error:** Students equate "सहायक पात्र" (supporting character) with "कम महत्वपूर्ण पात्र" (less important.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो मुख्य पात्र (नायक/नायिका) के',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो मुख्य पात्र (नायक/नायिका) के', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),'],
                  hint: 'Review "नायक का संघर्ष और चरित्र-परिवर्तन" from node c11_hin_ar_cbse_02_004 — specifically the PEEL.',
                  misconception: '**Exact error:** Students equate "सहायक पात्र" (supporting character) with "कम महत्वपूर्ण पात्र" (less important character) and therefore.' }
          ],
            remediations: { 'exact-error-students-equate-supporting': { steps: ['**Step 1 — Reframe:** Tell the student: "Forget \'important/unimportant\'.', 'Ask: *If I delete this character from the story, which specific scene collapses or changes meaning?*" 2.', '**Step 2 — Map Functions:** Give a 3-column table: Character | Action/Dialogue | Effect on Protagonist/Plot.', 'Fill it for पंडित अलोपीदीन together.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_006', difficulty: 'standard',
          question: '\'मुख्य विषय\' (Central Theme) किसी रचना का वह केंद्रीय विचार, दर्शन या.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_02_004 (नायक पात्र-चित्रण)** और **c11_hin_ar_cbse_02_002.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य विषय\' पाठ में **स्पष्ट शब्दों में लिखा होता है** (जैसे कोई नैतिक शिक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मुख्य विषय\' (Central Theme) किसी रचना का वह केंद्रीय विचार, दर्शन या सार्वभौमिक सत्य है',
                  options: ['\'मुख्य विषय\' (Central Theme) किसी रचना का वह केंद्रीय विचार, दर्शन या सार्वभौमिक सत्य है', 'पृष्ठभूमि और रचनाकार परिचय (Context and Author Introduction) वह साहित्यिक विश्लेषण कौशल', 'कथानक (Plot) घटनाओं का तार्किक और कारण-परिणाम क्रम है जो कहानी का कंकाल बनाता है, जबकि', '**पाठ्य-परिवेश (Setting)** कथानक की भौतिक पृष्ठभूमि है जिसमें स्थान (जहाँ), काल (कब),'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_02_004 (नायक पात्र-चित्रण)** और **c11_hin_ar_cbse_02_002 (कथानक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य विषय\' पाठ में **स्पष्ट शब्दों में लिखा होता है** (जैसे कोई नैतिक शिक्षा: "सदा सत्य बोलो").' }
          ],
            remediations: { 'wrong-idea': { steps: ['**माइक्रो-टास्क:** पाठ के 5 मुख्य संवाद चुनें; प्रत्येक के लिए लिखें — "पात्र ने क्या कहा" बनाम "पात्र ने क्या अभिप्रेत.', '**पैटर्न खोज:** उन 5 संवादों में कौन-सा **आवर्ती तनाव** (Recurring Tension) है?', '(जैसे: कर्तव्य बनाम इच्छा, व्यक्ति बनाम समाज, सत्य बनाम छल)।<br>3.', '**विषय निर्माण:** उस तनाव को एक **सार्वभौमिक कथन** में बदलें (जैसे: "व्यक्ति जब सामाजिक अपेक्षाओं और निजी सत्य के बीच.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
