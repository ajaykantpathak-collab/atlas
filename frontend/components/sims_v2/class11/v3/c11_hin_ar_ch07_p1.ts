import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch07_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch07_p1',
    title: 'पाठ 7 · Part 1/3',
    subtitle: 'Follow a simple request through an office where procedure eats its purpose.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 7 · Part 1/3',
    chapters: ['c11_hin_ar_ch07'],
    nodeIds: ['c11_hin_ar_cbse_07_001', 'c11_hin_ar_cbse_07_002', 'c11_hin_ar_cbse_07_003', 'c11_hin_ar_cbse_07_004', 'c11_hin_ar_cbse_07_005', 'c11_hin_ar_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a citizen trapped in a paper corridor', intro: 'One lost child, three offices, zero responsibility — Renu turns a queue into a verdict on the system.', goal: 'Read bureaucratic satire and analyse how episodic structure builds the indictment.' },
    discovery: {
        question: 'A lost child at the station gets shuffled: report at Platform 3, stamp at the Superintendent\'s, return — by which time the child is gone. Just slapstick?',
        options: ['No — Renu\'s satire is that procedure has outlived its purpose: every stamp is correct and the outcome is cruelty', 'Yes — it\'s comedy with no bite', 'Yes — the child should have waited properly', 'No — it\'s actually a ghost story'],
        answer: 'No — Renu\'s satire is that procedure has outlived its purpose: every stamp is correct and the outcome is cruelty',
        hook: 'Anchalik fiction\'s trick: village dialect and folk detail aren\'t decoration — they\'re the machinery that makes the bureaucracy look absurd.',
    },
    teaching: [
        { title: 'पाठ 7 — पृष्ठभूमि और रचनाकार परिचय', text: '**पृष्ठभूमि और रचनाकार परिचय** का अर्थ है — किसी रचना के लेखक का संक्षिप्त जीवन-परिचय, उनकी साहित्यिक यात्रा, प्रमुख रचनाएँ, तथा वह ऐतिहासिक-सामाजिक-सांस्कृतिक परिवेश जिसमें रचना लिखी गई; ताकि रचना.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart the runaround office to office, identify where satire turns to indictment, and test whether the ending punishes the system or just exposes it.',
        labels: ['पाठ 7 — पृष्ठभूमि', 'पाठ 7 — कथानक', 'पाठ 7 — पाठ्य-परिवेश', 'पाठ 7 — पात्र-चित्रण', 'पाठ 7 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 1/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध.', answer: '7 -', options: ['7 -', '7 -'] },
            { id: 's2', label: '7 -', prompt: 'Which idea is this? — **पाठ्य-परिवेश (Setting/Context)** किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल.', answer: '7 -', options: ['7 -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a satire evening you pick Renu\'s story of a leopard cub passed between the Forest, Agriculture and Revenue departments while its mother waits. A classmate edits your script: \'Cut two of the three office refusals — they\'re repetitive — and make the climax the cub being rescued by officials.\'',
            decisions: [{ prompt: 'Why should you reject both edits?', options: [
                { text: 'Keep the pattern: the repeated refusals — forest guard, ranger, police, each citing rules and jurisdiction — ARE the structure; the circular paperwork mimics the bureaucracy being satirised. And the climax isn\'t the rescue outcome but the mother leopard bypassing the entire system: instinct achieves what the state couldn\'t, which is the satire\'s punch.', outcome: 'The script now bites as intended: repetition builds the indictment, and the resolution comes from circumventing bureaucracy, not satisfying it.' },
                { text: 'Accept the cuts — one refusal conveys the point; three is redundancy.', outcome: 'Repetition is the technique: a single refusal reads as one rude official; the pattern of identical refusals exposes a system, which is the satire\'s target.', reveals: 'repetition-is-redundancy' },
                { text: 'Let the officials save the cub — a competent government gives the story a hopeful close.', outcome: 'That reverses the satire: the story\'s logic demands the system fail while the animal\'s instinct succeeds — bureaucratic success would prove the system works.', reveals: 'officials-should-save-the-cub' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every official followed the rules — that\'s the horror: the machine ran perfectly and the point was lost.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_001', difficulty: 'standard',
          question: '**पृष्ठभूमि और रचनाकार परिचय** का अर्थ है — किसी रचना के लेखक का संक्षिप्त.',
          hint: 'यदि अटका हुआ महसूस हो तो **\'साहित्य में पृष्ठभूमि का महत्व\'** (importance of background.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि "पृष्ठभूमि" = "इतिहास की तारीखें रटना" और "रचनाकार परिचय" = "जीवनी के बिंदु रटना"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पृष्ठभूमि और रचनाकार परिचय** का अर्थ है',
                  options: ['**पृष्ठभूमि और रचनाकार परिचय** का अर्थ है', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting/Context)** किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,', 'पात्र-चित्रण (Character Sketch) एक **विश्लेषणात्मक लेखन कौशल** है जिसमें कहानी/उपन्यास के'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'साहित्य में पृष्ठभूमि का महत्व\'** (importance of background.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि "पृष्ठभूमि" = "इतिहास की तारीखें रटना" और "रचनाकार परिचय" = "जीवनी के बिंदु रटना"। **गलत तर्क**: वे.' }
          ],
            remediations: { 'ncert': { steps: ['**पुनर्पठन**: छात्र से कहें — NCERT के \'रचनाकार परिचय\' बॉक्स को **दो बार पढ़ें**: पहली बार तथ्यों के लिए, दूसरी बार.', '**मैपिंग तालिका**: एक 3-स्तंभ तालिका बनवाएँ — (क) जीवन-तथ्य | (ख) रचना में साक्ष्य (पंक्ति/प्रसंग) | (ग) प्रभाव/अर्थ।.', '**इतिहास-साहित्य सेतु**: रचना-काल (दशक) की दो बड़ी घटनाएँ (विकिपीडिया/इतिहास की किताब से) लिखवाएँ और पूछें: *"अगर यह.', '**लघु-लेखन**: 100 शब्दों में लिखवाएँ — *"लेखक का जीवन रचना का \'कारण\' नहीं, \'संदर्भ\' है"* — इस कथन को पाठ 7 से सिद्ध.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_002', difficulty: 'standard',
          question: 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो.',
          hint: 'अगर अटका हुआ महसूस हो तो: किसी परिचित कहानी (पंचतंत्र या बचपन की कहानी) की घटनाओं को.',
          misconception: 'छात्र समझते हैं कि \'कथानक का सारांश लिख देना\' ही आख्यान-संरचना का विश्लेषण है। वे फ्लैशबैक, फ्लैश-फॉरवर्ड, समानांतर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध',
                  options: ['कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', '**पृष्ठभूमि और रचनाकार परिचय** का अर्थ है', '**पाठ्य-परिवेश (Setting/Context)** किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,', 'पात्र-चित्रण (Character Sketch) एक **विश्लेषणात्मक लेखन कौशल** है जिसमें कहानी/उपन्यास के'],
                  hint: 'अगर अटका हुआ महसूस हो तो: किसी परिचित कहानी (पंचतंत्र या बचपन की कहानी) की घटनाओं को तारीख/समय क्रम.',
                  misconception: 'छात्र समझते हैं कि \'कथानक का सारांश लिख देना\' ही आख्यान-संरचना का विश्लेषण है। वे फ्लैशबैक, फ्लैश-फॉरवर्ड, समानांतर कथानक, अविश्वसनीय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक परिचित फिल्म (जैसे \'शोले\' या \'दंगल\') के 5 प्रमुख दृश्य लिखने को कहें — यह कथानक है। 2.', 'फिर पूछें: "निर्देशक ने इन्हें किस क्रम में दिखाया?', 'क्या कोई दृश्य अतीत में जाता है?', 'क्या दो कहानियाँ साथ चलती हैं?" — यह संरचना है। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_003', difficulty: 'standard',
          question: '**पाठ्य-परिवेश (Setting/Context)** किसी रचना में वर्णित **भौगोलिक स्थान.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 002 (कथानक और आख्यान-संरचना)** के \'घटना-विश्लेषण\' अभ्यास.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'ऐतिहासिक पृष्ठभूमि\' (historical background)** और **\'पाठ्य-परिवेश\' (setting)** को समानार्थी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पाठ्य-परिवेश (Setting/Context)** किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,',
                  options: ['**पाठ्य-परिवेश (Setting/Context)** किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,', '**पृष्ठभूमि और रचनाकार परिचय** का अर्थ है', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', 'पात्र-चित्रण (Character Sketch) एक **विश्लेषणात्मक लेखन कौशल** है जिसमें कहानी/उपन्यास के'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 002 (कथानक और आख्यान-संरचना)** के \'घटना-विश्लेषण\' अभ्यास को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'ऐतिहासिक पृष्ठभूमि\' (historical background)** और **\'पाठ्य-परिवेश\' (setting)** को समानार्थी मान लेते हैं। **गलत.' }
          ],
            remediations: { 'historical-background-setting-1942': { steps: ['**चरणबद्ध सुधार (Remediation):** 1.', '**माइक्रो-रीडिंग (Micro-reading):** छात्र को **एक पृष्ठ का गद्यांश** दें (जैसे \'उषा प्रियंवदा की \'वापसी\' का पहला पन्ना).', '**टेबल बनवाएँ (Tabulation):** पाँच कॉलम — **स्थान | काल | समाज | अर्थव्यवस्था | प्रकृति** — प्रत्येक घिरे शब्द को उचित.', '**कारण-कार्य तीर (Causal arrows):** पूछें — *"इस कॉलम की चीज़ पात्र को क्या करने को मजबूर करती है?"* — तीर खींचकर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक **विश्लेषणात्मक लेखन कौशल** है जिसमें.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 003 (पाठ्य-परिवेश और वातावरण)** दोबारा पढ़ें — परिवेश के.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि पात्र-चित्रण = **गुणों की सूची (List of Adjectives)** + **कहानी का सारांश**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक **विश्लेषणात्मक लेखन कौशल** है जिसमें कहानी/उपन्यास के',
                  options: ['पात्र-चित्रण (Character Sketch) एक **विश्लेषणात्मक लेखन कौशल** है जिसमें कहानी/उपन्यास के', '**पृष्ठभूमि और रचनाकार परिचय** का अर्थ है', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting/Context)** किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 003 (पाठ्य-परिवेश और वातावरण)** दोबारा पढ़ें — परिवेश के.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि पात्र-चित्रण = **गुणों की सूची (List of Adjectives)** + **कहानी का सारांश**। वे लिखते हैं: "नायक.' }
          ],
            remediations: { 'list-of-adjectives': { steps: ['**मॉडलिंग**: बोर्ड के **उत्कृष्ट उत्तर (Model Answer)** और **कमजोर उत्तर** साथ रखकर दिखाएँ — अंतर केवल **PEEL संरचना**.', '**साझा अभ्यास**: कक्षा में एक छोटे पात्र (सहायक पात्र) पर **सामूहिक PEEL** लिखवाएँ — शिक्षक बोर्ड पर चरण-दर-चरण लिखे.', '**साक्ष्य-खोज खेल**: ५ मिनट में पाठ से नायक के **किसी एक गुण** के **३ साक्ष्य** ढूंढने का टाइम्ड अभ्यास कराएँ। 4.', '**स्व-मूल्यांकन चेकलिस्ट**: छात्र को अपना उत्तर जाँचने के लिए दें — "क्या हर विशेषण के आगे पृ.सं./पैरा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटके तो **नोड 004 (नायक का चरित्र-चित्रण)** के \'कार्य किए गए उदाहरण\' (Worked.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर \'सहायक पात्र\' (Supporting Character) और \'गौण पात्र\' (Minor/Flat Character) को समानार्थी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ', '**पृष्ठभूमि और रचनाकार परिचय** का अर्थ है', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting/Context)** किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके तो **नोड 004 (नायक का चरित्र-चित्रण)** के \'कार्य किए गए उदाहरण\' (Worked Examples) दोबारा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर \'सहायक पात्र\' (Supporting Character) और \'गौण पात्र\' (Minor/Flat Character) को समानार्थी (synonymous) समझ लेते.' }
          ],
            remediations: { 'supporting-character-minor-flat-character': { steps: ['**पुनर्परिभाषित करें (Redefine):** छात्र से कहें: "भूल जाओ कि वह कितनी बार आया। यह बताओ: अगर यह पात्र हटा दिया जाए, तो.', 'क्या क्लाइमेक्स टूट जाएगा?" — यदि हाँ, तो वह \'महत्वपूर्ण सहायक पात्र\' है, चाहे 2 पन्ने का ही हो। 2.', '**तुलना तालिका बनाएं (Comparison Table):** दो कॉलम बनाएं: \'गौण पात्र\' (केवल वातावरण/सजावट, जैसे भीड़ में एक चेहरा).', '**\'व्हाट इफ\' (What-if) खेलें:** "अगर यह सहायक पात्र न होता तो नायक क्या करता?" — इस प्रश्न का लिखित उत्तर देने से पात्र.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_006', difficulty: 'standard',
          question: 'मुख्य विषय वह केंद्रीय विचार है जो पाठ के माध्यम से बार-बार आता है और लेखक का.',
          hint: 'यदि फंसे हुए हों, तो पात्र-चित्रण (विशेष रूप से सहायक पात्रों) की समीक्षा करें — क्योंकि.',
          misconception: 'छात्र अक्सर मुख्य विषय को पाठ की morale या सीख के समान मान लेते हैं — जैसे यदि कोई कहानी ईमानदारी की प्रशंसा करती है तो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय वह केंद्रीय विचार है जो पाठ के माध्यम से बार-बार आता है और लेखक का मूल संदेश',
                  options: ['मुख्य विषय वह केंद्रीय विचार है जो पाठ के माध्यम से बार-बार आता है और लेखक का मूल संदेश', '**पृष्ठभूमि और रचनाकार परिचय** का अर्थ है', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting/Context)** किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि फंसे हुए हों, तो पात्र-चित्रण (विशेष रूप से सहायक पात्रों) की समीक्षा करें — क्योंकि वे अक्सर.',
                  misconception: 'छात्र अक्सर मुख्य विषय को पाठ की morale या सीख के समान मान लेते हैं — जैसे यदि कोई कहानी ईमानदारी की प्रशंसा करती है तो वे कहते हैं कि विषय.' }
          ],
            remediations: { 'morale': { steps: ['छात्र से पूछिए: "यदि इस कहानी के अंत में कोई नैतिक शिक्षा लिखी होती, तो वह क्या होती?" फिर कहिए: "अब उसी कहानी को पढ़िए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
