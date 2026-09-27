import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch01_p1: SimDef = {
    id: 'v3_c11_hin_v_ch01_p1',
    title: 'पाठ 1 · Part 1/3',
    subtitle: 'Watch theatre\'s grammar shift from the spoken word to the seen image.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 1 · Part 1/3',
    chapters: ['c11_hin_v_ch01'],
    nodeIds: ['c11_hin_v_cbse_01_001', 'c11_hin_v_cbse_01_002', 'c11_hin_v_cbse_01_003', 'c11_hin_v_cbse_01_004', 'c11_hin_v_cbse_01_005', 'c11_hin_v_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a theatre-goer learning to watch with new eyes', intro: 'Before the curtain: a voice from a machine, no face attached — Agyeya builds his whole argument about modern theatre from that disembodied sound.', goal: 'Distinguish literary and visual drama and analyse the essay\'s experiential-to-theoretical arc.' },
    discovery: {
        question: 'A play\'s power used to live in its words — then cinema made sound, light and silence do the talking. Did audiences\' eyes actually change?',
        options: ['Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted', 'No — an audience is an audience, whatever the medium', 'No — only critics changed, not viewers', 'Yes — but only because tickets got cheaper'],
        answer: 'Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted',
        hook: 'Agyeya opens by hearing a gramophone before seeing anything — a miniature of his thesis: modern theatre detached sound from sight and rewired the senses.',
    },
    teaching: [
        { title: 'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — पाठ की रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ (पृष्ठभूमि) तथा लेखक के जीवन, साहित्यिक यात्रा, विचारधारा और प्रमुख कृतियों का संक्षिप्त विवरण (रचनाकार.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split classical Sanskrit, Parsi-folk and Mohan Rakesh\'s realism into their governing principles, then judge whether word-dominant and visual-dominant theatre can even be compared.',
        labels: ['पाठ 1 — पृष्ठभूमि', 'पाठ 1 — कथानक', 'पाठ 1 — पाठ्य-परिवेश', 'पाठ 1 — पात्र-चित्रण', 'पाठ 1 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_v_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 1/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — **कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो.', answer: '1 -', options: ['1 -', '1 -'] },
            { id: 's2', label: '1 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक.', answer: '1 -', options: ['1 -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your theatre club is adapting a stage play into a short film. A member says: \'Just film the play — theatre is literature, cinema is just literature with a camera. Agyeya\'s essay on Mohan Rakesh is basically a biography of a playwright.\'',
            decisions: [{ prompt: 'What does Agyeya\'s argument actually say?', options: [
                { text: 'Explain the grammar shift: the essay is a manifesto for रंगमंचीय/चित्रकाव्य as an independent art — a move from शब्द-प्रधान (word-dominant) to दृश्य-श्रव्य-प्रधान (audio-visual dominant) theatre. Silence, light, sound and pause have their own grammar that literary criticism ignores; Mohan Rakesh is the case study of a playwright who bridged both traditions, not merely the subject of a biography.', outcome: 'The adaptation rethink begins: film isn\'t filmed literature — it tells through image and sound, which is precisely the epistemological shift the essay maps.' },
                { text: 'Film the play as written — if the script is strong, the medium doesn\'t matter.', outcome: 'That\'s exactly the assumption the essay dismantles: visual drama has its own aesthetics; a pause on stage and a cut on screen do different work.', reveals: 'film-is-filmed-theatre' },
                { text: 'Treat the essay as Rakesh\'s life story — mine it for biographical details about the playwright.', outcome: 'Rakesh is the evidence, not the argument: the essay is about a shift in theatrical grammar, not a personality profile.', reveals: 'essay-is-playwright-biography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Comparing classical and cinematic theatre is like comparing poetry to architecture — different substances, different rules, different eyes.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — पाठ की रचना के ऐतिहासिक, सामाजिक.',
          hint: 'यदि अटका हुआ महसूस हो तो: \'हिंदी साहित्य का इतिहास — आधुनिक काल की प्रमुख प्रवृत्तियाँ\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'रचनाकार परिचय\' का अर्थ है — जन्मतिथि, मृत्युतिथि, शिक्षा, पुरस्कारों की सूची.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो तो: \'हिंदी साहित्य का इतिहास — आधुनिक काल की प्रमुख प्रवृत्तियाँ\' (कक्षा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'रचनाकार परिचय\' का अर्थ है — जन्मतिथि, मृत्युतिथि, शिक्षा, पुरस्कारों की सूची रट लेना (बायोडेटा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार:** 1) छात्र से कहें: \'रचनाकार की जन्मतिथि भूल जाओ, केवल यह बताओ कि उनके जीवन की कौन-सी एक बात तुम्हें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_002', difficulty: 'standard',
          question: '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम.',
          hint: 'यदि अटका हुआ महसूस हो तो **\'घटना-मानचित्र\' (Event Map)** बनाएँ: एक रेखा खींचें, उस पर.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'कालक्रम भंग\' (anachrony)** को **\'कथानक में छेद\' (plot hole)** समझ लेते हैं। **गलत तर्क:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो',
                  options: ['**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'घटना-मानचित्र\' (Event Map)** बनाएँ: एक रेखा खींचें, उस पर घटनाएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'कालक्रम भंग\' (anachrony)** को **\'कथानक में छेद\' (plot hole)** समझ लेते हैं। **गलत तर्क:** "लेखक ने घटनाएँ उलझा.' }
          ],
            remediations: { 'anachrony-plot-hole': { steps: ['**दृश्यीकरण (Visualize):** छात्र से कहें — कहानी की 5-6 प्रमुख घटनाएँ **इंडेक्स कार्ड** पर लिखें। उन्हें **कालक्रम.', '**पुनर्व्यवस्था (Reorder):** अब कार्ड्स को **पाठ के क्रम** में जमाएँ — जहाँ अंतर दिखे, वहाँ **रंगीन पेन से तीर खींचें**.', '**कार्य-प्रश्न (Function Question):** हर तीर पर पूछें: *"लेखक ने यहाँ क्रम क्यों तोड़ा?', 'पाठक को क्या महसूस कराना चाहा?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 10 की किसी भी कहानी (जैसे \'बड़े भाई साहब\', \'डायरी का एक.',
          misconception: '**विशिष्ट भ्रांति**: छात्र अक्सर मानते हैं कि **"वातावरण = मौसम (Weather) या ऋतु (Season)"** — क्योंकि हिंदी में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 10 की किसी भी कहानी (जैसे \'बड़े भाई साहब\', \'डायरी का एक पन्ना\') को.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र अक्सर मानते हैं कि **"वातावरण = मौसम (Weather) या ऋतु (Season)"** — क्योंकि हिंदी में \'वातावरण\' शब्द दैनिक.' }
          ],
            remediations: { 'weather-season': { steps: ['**चरणबद्ध उपचार**: १) छात्र से कहें: "कमरे की खिड़की से बाहर देखो और **पाँच संज्ञाएँ** लिखो जो दिखें (पेड़, सड़क, कार.', 'कैसे?" — इससे वे समझेंगे कि **वस्तु (परिवेश) वही, दृष्टि (वातावरण) बदली**। ४) अंत में पाठ से एक अंश देकर दोनों पहचानने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें.',
          hint: 'यदि अटके तो **c11_hin_v_cbse_01_002 (कथानक और आख्यान-संरचना)** के \'मोड़ प्रसंग पहचान\' खंड.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **\'पात्र-चित्रण\' = \'पात्र का वर्णन\' (description)** — अर्थात् नायक के गुणों की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक'],
                  hint: 'यदि अटके तो **c11_hin_v_cbse_01_002 (कथानक और आख्यान-संरचना)** के \'मोड़ प्रसंग पहचान\' खंड को.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **\'पात्र-चित्रण\' = \'पात्र का वर्णन\' (description)** — अर्थात् नायक के गुणों की **सूची (list.' }
          ],
            remediations: { 'description-list-of-traits': { steps: ['**मॉडलिंग**: छात्र को एक **कमजोर उत्तर** (केवल विशेषणों की सूची) और एक **बलशाली उत्तर** (PEEL संरचना में प्रमाण सहित).', '**संयुक्त अभ्यास**: एक छोटा प्रसंग दो, छात्र से कहो — "इससे नायक के बारे में **एक** निष्कर्ष निकालो और **पाठ से एक.', '**आयाम-विस्तार**: जब वह एक गुण + प्रमाण दे सके, तब कहो — "अब **दूसरा आयाम** ढूँढो जो पहले से **विपरीत या पूरक** हो.', '**स्व-मूल्यांकन चेकलिस्ट**: उसे दें — "क्या मेरे उत्तर में: (क) Point है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_v_cbse_01_004 (नायक पात्र-चित्रण)** के अपने नोट्स.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"सहायक पात्र का विश्लेषण करने का अर्थ है — उसका अलग से \'चरित्र-चित्रण\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के कथानक-गति,',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के कथानक-गति,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_v_cbse_01_004 (नायक पात्र-चित्रण)** के अपने नोट्स दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"सहायक पात्र का विश्लेषण करने का अर्थ है — उसका अलग से \'चरित्र-चित्रण\' (character sketch) लिख.' }
          ],
            remediations: { 'character-sketch': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**चरण 1 — शब्दावली परिवर्तन:** छात्र से कहें: "आज से \'पात्र\' को \'व्यक्ति\' मत कहो, उसे **\'उपकरण\' (tool)** या **\'कार्य\'.', '**चरण 2 — \'हटाओ-परीक्षण\' (Deletion Test) अभ्यास:** पाठ के 3 सहायक पात्र चुनें। प्रत्येक के लिए पूछें: *"इसे मिटा दो। अब.', '**चरण 3 — लेबलिंग ड्रिल:** प्रत्येक पात्र के आगे एक **कार्यात्मक टैग (functional tag)** चिपकाएँ: [प्रतिपक्षी], [फॉयल].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जिसे रचनाकार.',
          hint: 'यदि अटके तो **c11_hin_v_cbse_01_002 (कथानक और आख्यान-संरचना)** के \'क्लाइमेक्स\' और.',
          misconception: 'छात्र अक्सर **\'मुख्य विषय\' को \'कहानी का नैतिक उपदेश\' (Moral of the story) मान लेते हैं** — जैसे "झूठ मत बोलो", "बड़ों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जिसे रचनाकार संपूर्ण',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जिसे रचनाकार संपूर्ण', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक'],
                  hint: 'यदि अटके तो **c11_hin_v_cbse_01_002 (कथानक और आख्यान-संरचना)** के \'क्लाइमेक्स\' और \'निर्णायक मोड़\'.',
                  misconception: 'छात्र अक्सर **\'मुख्य विषय\' को \'कहानी का नैतिक उपदेश\' (Moral of the story) मान लेते हैं** — जैसे "झूठ मत बोलो", "बड़ों का आदर करो"। यह भूल.' }
          ],
            remediations: { 'moral-of-the-story': { steps: ['**पुनर्परिभाषित करें:** छात्र से कहें — "मुख्य विषय वह **प्रश्न** है जो रचना बार-बार पूछती है, **उत्तर** नहीं। पाठ 1.', '(उदाहरण: \'क्या चुप रहना सुरक्षित है?\')" 2.', '**सबूत-आधारित निष्कर्षण:** छात्र से पाठ के **3 विशिष्ट स्थल** (पृष्ठ/पंक्ति) मांगें जहां वह प्रश्न गूंजता हो — संवाद.', '**सामान्यीकरण का अभ्यास:** उन 3 स्थलों से **एक वाक्य में पैटर्न** निकालने को कहें: "हर बार जब नायक बोलना चाहता है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
