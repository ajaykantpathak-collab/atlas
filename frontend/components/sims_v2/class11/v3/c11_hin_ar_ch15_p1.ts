import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch15_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch15_p1',
    title: 'पाठ 15 · Part 1/3',
    subtitle: 'Watch a poem dismantle your definitions before it offers its own.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 15 · Part 1/3',
    chapters: ['c11_hin_ar_ch15'],
    nodeIds: ['c11_hin_ar_cbse_15_001', 'c11_hin_ar_cbse_15_002', 'c11_hin_ar_cbse_15_003', 'c11_hin_ar_cbse_15_004', 'c11_hin_ar_cbse_15_005', 'c11_hin_ar_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a hill journalist naming the cruelty inside ordinary leaving', intro: 'Men leave Garhwal for Delhi\'s scaffolds and it barely counts as news — the poem asks what \'small\' and \'cruel\' really mean.', goal: 'Analyse the negative-then-positive argumentative structure and the poem\'s migrant-labour context.' },
    discovery: {
        question: 'The poem opens by listing what cruelty is NOT — three whole stanzas of negatives. Cut them and lose nothing?',
        options: ['No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle', 'Yes — a poem should state its thesis upfront', 'Yes — negative definitions are logically empty', 'No — but only because the poem would be too short'],
        answer: 'No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle',
        hook: 'The refrain flips at the fourth stanza — \'not this\' becomes \'this is the most dangerous\' — and the imagery turns from home\'s warmth to a worker\'s weary feet.',
    },
    teaching: [
        { title: 'पाठ 15 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें रचना की संरचना हुई, तथा \'रचनाकार परिचय\' लेखक के जीवन-वृत्त, साहित्यिक यात्रा, प्रमुख कृतियों एवं रचनाधर्मिता.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_15_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the stanza where negation flips to assertion, then weigh the title\'s provocation — \'the smallest is not the smallest\' — against 1980s hill migration.',
        labels: ['पाठ 15 — पृष्ठभूमि', 'पाठ 15 — कथानक', 'पाठ 15 — पाठ्य-परिवेश', 'पाठ 15 — पात्र-चित्रण', 'पाठ 15 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_15_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 15 · Part 1/3', spots: [
            { id: 's1', label: '15 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि.', answer: '15 -', options: ['15 -', '15 -'] },
            { id: 's2', label: '15 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें.', answer: '15 -', options: ['15 -', '15 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a kavi sammelan themed on migration, someone offers \'Laguta Sabse Chhoti Nahin Hoti\' but introduces it as \'a gentle poem about how small people also matter — mothers\' love, fathers\' laps, childhood warmth.\'',
            decisions: [{ prompt: 'What is the poem actually arguing, and how is it built?', options: [
                { text: 'Read the title as provocation from a people\'s-advocate journalist of Tehri Garhwal who watched villages empty as men left for Delhi\'s construction sites: \'smallness\' is redefined as the erosion of dignity when survival fractures belonging. Structurally it argues by elimination — the first stanzas keep saying what cruelty is NOT before the positives arrive, climaxing in the weary worker\'s feet — dignity dying slowly in everyday struggle.', outcome: 'The introduction is corrected: it\'s not a warm affirmation of small lives but a reckoning with what migration does to human worth — built like a debate, not a lullaby.' },
                { text: 'Keep the gentle reading — the poem lists tender images of family, so it\'s about the dignity of simple lives.', outcome: 'The early stanzas are negatives — what cruelty is NOT — positioned to be stripped away; reading them as the thesis stops before the poem\'s real answer.', reveals: 'poem-is-gentle-affirmation' },
                { text: 'Present it as having no real structure — it\'s a mood piece on poverty, not an argument.', outcome: 'The argumentative architecture is precise: sequenced denials, a refrain as hinge, and a final image as verdict — structure performs the elimination.', reveals: 'poem-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'Written by a journalist who watched Tehri\'s villages empty to Delhi\'s construction sites — \'small\' was never about size; it\'s about what we\'re trained not to see.',
            decisions: [{ prompt: 'What comes next? पाठ 15 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 15 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से.',
          hint: 'यदि फंसें तो कक्षा 10 की पाठ्यपुस्तक \'आरोह/क्षितिज\' के किसी एक पाठ का \'लेखक परिचय\' और.',
          misconception: 'छात्र समझते हैं कि \'पृष्ठभूमि\' का अर्थ केवल \'इतिहास की तारीखें और घटनाएं\' रटना है, और \'रचनाकार परिचय\' का अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें',
                  options: ['\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि फंसें तो कक्षा 10 की पाठ्यपुस्तक \'आरोह/क्षितिज\' के किसी एक पाठ का \'लेखक परिचय\' और \'पाठ की.',
                  misconception: 'छात्र समझते हैं कि \'पृष्ठभूमि\' का अर्थ केवल \'इतिहास की तारीखें और घटनाएं\' रटना है, और \'रचनाकार परिचय\' का अर्थ \'जन्म-मृत्यु तिथि, प्रमुख.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "रचनाकार की जीवनी के 3 पन्ने पढ़ें और उनमें से 3 ऐसी घटनाएं छांटें जो आपको पाठ के किसी.', 'क्यों?" चरण 3: बोर्ड के गत 5 वर्षों के प्रश्नपत्र दिखाएं जहां \'पृष्ठभूमि/रचनाकार\' आधारित प्रश्न आए हैं (प्रसंग.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम.',
          hint: 'यदि अटका हुआ महसूस हो, तो **\'घटना-मानचित्रण\' (Event Mapping)** का अभ्यास करें: किसी.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "कथानक = कहानी का सारांश" और "आख्यान-संरचना = अध्यायों में विभाजन"। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि',
                  options: ['कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **\'घटना-मानचित्रण\' (Event Mapping)** का अभ्यास करें: किसी परिचित कहानी.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "कथानक = कहानी का सारांश" और "आख्यान-संरचना = अध्यायों में विभाजन"। वे **फ्रायटैग पिरामिड.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — दृश्यीकरण:** छात्र से कहें: "किसी फिल्म/सीरियल का ऐसा दृश्य याद करो जो \'अंत से शुरू होता है\' (जैसे *ब्रेकिंग.', '**चरण 2 — अंतराल चिह्नित करो:** जहाँ दोनों कॉलम मेल न खाएँ, वहाँ लाल पेन से तीर खींचो और लिखो: "लेखक ने यहाँ समय को.', '**चरण 3 — प्रभाव लिखो:** प्रत्येक तीर के सामने एक पंक्ति में लिखो: "इससे पाठक को ______ महसूस हुआ / ______ जानने की.', '**चरण 4 — सामान्यीकरण:** अंत में छात्र से पूछो: "तो संरचना केवल क्रम नहीं, बल्कि ______ का औजार है?" (उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है.',
          hint: 'यदि अटके हों तो **कक्षा 10 हिंदी की \'पृष्ठभूमि/परिवेश\' संबंधी परिभाषाएँ और उदाहरण**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र \'वातावरण\' (Atmosphere/Mood) और \'परिवेश\' (Setting) को पर्यायवाची मान लेते हैं। वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटके हों तो **कक्षा 10 हिंदी की \'पृष्ठभूमि/परिवेश\' संबंधी परिभाषाएँ और उदाहरण** दोहराएँ, फिर इस.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र \'वातावरण\' (Atmosphere/Mood) और \'परिवेश\' (Setting) को पर्यायवाची मान लेते हैं। वे लिखते हैं: "कहानी का वातावरण.' }
          ],
            remediations: { 'atmosphere-mood-setting': { steps: ['**पुनः अवधारणा स्पष्ट करें:** छात्र से कहें — "अपनी कक्षा का परिवेश बताओ (बेंच, ब्लैकबोर्ड, पंखा, समय-सारणी) फिर.', '**पाठ से छँटाई करवाएँ:** पाठ 15 के किसी पृष्ठ पर नीले पेन से **तथ्यात्मक विवरण** (परिवेश) और लाल पेन से **भावनात्मक.', '**मिनी-लेखन:** एक ही दृश्य पर दो पैराग्राफ लिखवाएँ — पहला केवल परिवेश (तथ्य), दूसरा केवल वातावरण (अनुभूति)। फिर दोनों.', '**बोर्ड पैटर्न अभ्यास:** गत वर्ष के 3 अंकों के प्रश्न "परिवेश का चित्रण कीजिए" और "वातावरण का वर्णन कीजिए" के मॉडल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_15_002 (कथानक और आख्यान-संरचना)** के.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि पात्र-चित्रण = **गुणों की सूची (list of traits)** जैसे "ईमानदार, बहादुर, भावुक"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें नायक/प्रमुख पात्र के', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_15_002 (कथानक और आख्यान-संरचना)** के "कथानक-चरण पहचान".',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि पात्र-चित्रण = **गुणों की सूची (list of traits)** जैसे "ईमानदार, बहादुर, भावुक"। वे **पात्र को स्थिर.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**चरण 1**: छात्र को एक **परिचित कहानी** (जैसे: \'उपन्यास सम्राट प्रेमचंद की \'बूढ़ी काकी\' या पाठ्यपुस्तक की कोई कहानी).', 'यदि हाँ, तो **क्या बदला** और **क्या स्थिर रहा**?" **चरण 3**: अब **PEEL शीट** दें: Point (गुण), Evidence (उद्धरण).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटके, तो नोड 004 (नायक चित्रण) के \'आंतरिक द्वंद्व पहचान\' चरण को दोहराएँ और नायक के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "सहायक पात्र = नायक का मित्र/परिवार वाला" और उसका विश्लेषण **संबंध-लेबल**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें'],
                  hint: 'यदि अटके, तो नोड 004 (नायक चित्रण) के \'आंतरिक द्वंद्व पहचान\' चरण को दोहराएँ और नायक के तीन प्रमुख.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "सहायक पात्र = नायक का मित्र/परिवार वाला" और उसका विश्लेषण **संबंध-लेबल** (पत्नी, भाई, दोस्त) तक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "पात्र का नाम मत बताओ, उसका **काम** बताओ — वह कहानी में **क्या कर रहा है** जो कोई और नहीं कर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जिसे रचनाकार.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_15_002 (कथानक संरचना) और c11_hin_ar_cbse_15_004 (नायक चित्रण).',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'मुख्य विषय\' = \'लेखक का संदेश\' = \'कहानी का नैतिक उपदेश\' (Moral of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जिसे रचनाकार कथानक,',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जिसे रचनाकार कथानक,', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_15_002 (कथानक संरचना) और c11_hin_ar_cbse_15_004 (नायक चित्रण) दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'मुख्य विषय\' = \'लेखक का संदेश\' = \'कहानी का नैतिक उपदेश\' (Moral of the story)** — तीनों एक ही हैं।.' }
          ],
            remediations: { 'moral-of-the-story-theme': { steps: ['**अंतर स्पष्ट करें:** छात्र से कहें — "तीन वाक्य लिखो: (क) कहानी क्या कहती है?', '(ख) प्रेमचंद क्या कहना चाहते हैं?', '(ग) तुम्हें क्या सीख मिली?" — तीनों की तुलना करवाएँ। 2.', '**पाठ-आधारित प्रमाण मांगें:** "वंशीधर के किस संवाद/कृत्य से तुम्हें लगा कि विषय \'ईमानदारी की कीमत\' है?" — जब तक वह 2-3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
