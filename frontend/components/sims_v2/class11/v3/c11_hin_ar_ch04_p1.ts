import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch04_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch04_p1',
    title: 'पाठ 4 · Part 1/3',
    subtitle: 'Read a bureaucratic \'order\' as parody — and a soldier\'s letter as an accusation.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 4 · Part 1/3',
    chapters: ['c11_hin_ar_ch04'],
    nodeIds: ['c11_hin_ar_cbse_04_001', 'c11_hin_ar_cbse_04_002', 'c11_hin_ar_cbse_04_003', 'c11_hin_ar_cbse_04_004', 'c11_hin_ar_cbse_04_005', 'c11_hin_ar_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader unmasking a ridiculous official letter', intro: 'A letter reaches the king from his own soldier — part chronicle of past glory, part folk tale, part indictment.', goal: 'Decode Guleri\'s linguistic satire and analyse the letter\'s fragmented narrative structure.' },
    discovery: {
        question: 'A British officer\'s order arrives dressed in legal English, dead Sanskrit and bazaar Hindi — is the absurdity just clumsy writing?',
        options: ['No — the linguistic mess is the satire: colonial authority is shown as performance, not competence', 'Yes — the officer simply couldn\'t write Hindi', 'No — it\'s actually a translation error by the editor', 'Yes — satire requires elegant language'],
        answer: 'No — the linguistic mess is the satire: colonial authority is shown as performance, not competence',
        hook: 'Guleri edited a paper through the 1899 famine that killed crores while grain was exported — the mock-bureaucratic \'order\' is a weapon, not a joke.',
    },
    teaching: [
        { title: 'पाठ 4 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक, राजनीतिक और साहित्यिक परिस्थितियों का समग्र विवेचन है, जबकि रचनाकार परिचय (Author\'s Introduction) में लेखक का.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Break a soldier\'s letter into its blocks — past glory, present misery, the snake-and-two-women folktale — and ask what the broken structure does to the ruler reading it.',
        labels: ['पाठ 4 — पृष्ठभूमि', 'पाठ 4 — कथानक', 'पाठ 4 — पाठ्य-परिवेश', 'पाठ 4 — पात्र-चित्रण', 'पाठ 4 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 1/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक.', answer: '4 -', options: ['4 -', '4 -'] },
            { id: 's2', label: '4 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय).', answer: '4 -', options: ['4 -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a satire-writing workshop you take Guleri\'s sketch — a soldier\'s letter to his ruler mixing Sanskrit, Persian officialese and folk tale. A participant says: \'The mixed language is sloppy writing, and the snake-and-two-women folk tale is a pointless digression from the letter\'s complaint.\'',
            decisions: [{ prompt: 'How do you defend the text\'s design?', options: [
                { text: 'Decode the hybridity: the officer\'s mangled officialese (vakil, daftar, hukm) parodies the Persianised bureaucratic register — colonial power as performative language — while the elder sister\'s brave Sanskritised speech vs the younger\'s fearful fragments allegorise indigenous tradition vs colonised psyche. And the folk tale isn\'t digression: it\'s a parallel symbolic sub-plot doing the work of satire and allegory inside the letter form.', outcome: 'The workshop sees context as decoder: Guleri\'s famine-era journalism weaponised language — every register switch and the embedded tale are the critique.' },
                { text: 'Agree the language is sloppy — clean it into uniform modern Hindi for the exercise.', outcome: 'Uniforming the register erases the satire: the collision of Sanskrit, Persian and colloquial speech is precisely how colonial authority gets mocked.', reveals: 'hybrid-language-is-sloppy' },
                { text: 'Cut the folk tale — a letter should stick to its complaint.', outcome: 'The sub-plot carries the allegorical weight: it mirrors and sharpens the main letter\'s charge, so cutting it removes the satire\'s core.', reveals: 'folk-tale-is-digression' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Two sisters face the same officer — one answers in courage and Sanskritised rebuke, one in fear; both are true, and that refusal of a clean binary is the honesty.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_001', difficulty: 'standard',
          question: 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक.',
          hint: 'यदि अटका हुआ महसूस करें तो: **इतिहास की पाठ्यपुस्तक (थीम्स इन इंडियन हिस्ट्री - III) के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'रचनाकार परिचय\' का अर्थ केवल लेखक की \'जन्म-तिथि, मृत्यु-तिथि, प्रमुख रचनाओं की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,',
                  options: ['पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक नायक/प्रमुख पात्र'],
                  hint: 'यदि अटका हुआ महसूस करें तो: **इतिहास की पाठ्यपुस्तक (थीम्स इन इंडियन हिस्ट्री - III) के \'स्वतंत्रता.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'रचनाकार परिचय\' का अर्थ केवल लेखक की \'जन्म-तिथि, मृत्यु-तिथि, प्रमुख रचनाओं की सूची\' याद करना है।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**तथ्य vs विश्लेषण अभ्यास:** छात्र से किसी परिचित लेखक (जैसे प्रेमचंद) के 5 तथ्य लिखवाएं, फिर प्रत्येक तथ्य के सामने.', '**पृष्ठभूमि मानचित्रण (Background Mapping):** एक टेम्पलेट दें: रचनाकाल → प्रमुख ऐतिहासिक घटनाएं → साहित्यिक आंदोलन →.', '**तुलनात्मक विश्लेषण:** एक ही विषय (जैसे \'स्त्री विमर्श\') पर दो लेखिकाओं (महादेवी वर्मा और कृष्णा सोबती) के रचनाकार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_002', difficulty: 'standard',
          question: 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ.',
          hint: 'यदि छात्र अटका हो तो उसे **\'घटना-मानचित्र\' (Event Map)** बनाने को कहें: कागज़ पर बाएँ से.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'कथानक\' (Plot) और \'कहानी/कथावस्तु\' (Story/Fabula)** को समानार्थी मान लेते हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक',
                  options: ['कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक नायक/प्रमुख पात्र'],
                  hint: 'यदि छात्र अटका हो तो उसे **\'घटना-मानचित्र\' (Event Map)** बनाने को कहें: कागज़ पर बाएँ से दाएँ तीर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'कथानक\' (Plot) और \'कहानी/कथावस्तु\' (Story/Fabula)** को समानार्थी मान लेते हैं। वे सोचते हैं: "जो घटनाएँ.' }
          ],
            remediations: { 'plot-story-fabula': { steps: ['**स्पष्ट भेद सिखाएँ:** छात्र को ई.एम.', 'फॉर्स्टर का उदाहरण देकर समझाएँ — "राजा मरा, रानी मरी" (Story) vs "राजा मरा, शोक से रानी मरी" (Plot)। पूछें: "दूसरे.', '**मैपिंग अभ्यास कराएँ:** किसी परिचित कहानी (जैसे \'पंचतंत्र\' की कोई कथा) लें और छात्र से कहें: "घटनाओं को समय-क्रम में.', '**कारण-परिणाम तीर खिंचवाएँ:** कथानक के हर सोपान के बीच तीर (→) खींचकर लिखवाएँ: "घटना A → **कारण** → घटना B"। जहाँ तीर न.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें.',
          hint: 'यदि अटके तो \'कथानक और आख्यान-संरचना\' (नोड 002) के \'घटना-श्रृंखला\' खंड को दोबारा पढ़ें और.',
          misconception: 'छात्र प्रायः \'परिवेश\' को स्थैतिक पृष्ठभूमि (static backdrop) मान लेते हैं — जैसे स्टेज पर लगा पर्दा — जबकि वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक नायक/प्रमुख पात्र'],
                  hint: 'यदि अटके तो \'कथानक और आख्यान-संरचना\' (नोड 002) के \'घटना-श्रृंखला\' खंड को दोबारा पढ़ें और पूछें.',
                  misconception: 'छात्र प्रायः \'परिवेश\' को स्थैतिक पृष्ठभूमि (static backdrop) मान लेते हैं — जैसे स्टेज पर लगा पर्दा — जबकि वास्तव में परिवेश गतिशील शक्ति.' }
          ],
            remediations: { 'static-backdrop-active-force': { steps: ['चरण 1: छात्र से कहें — "पाठ का कोई एक दृश्य चुनो जहां पात्र कोई निर्णय लेता है। अब कल्पना करो वही पात्र, वही निर्णय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक.',
          hint: 'यदि \'अंतर्द्वंद्व\' (Internal Conflict) और \'बाह्य संघर्ष\' (External Conflict) का अंतर.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'नायक के गुणों की सूची बनाना\' (Listing traits: ईमानदार, बहादुर, त्यागी) ही.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक नायक/प्रमुख पात्र',
                  options: ['पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसमें लेखक नायक/प्रमुख पात्र', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),'],
                  hint: 'यदि \'अंतर्द्वंद्व\' (Internal Conflict) और \'बाह्य संघर्ष\' (External Conflict) का अंतर स्पष्ट नहीं.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'नायक के गुणों की सूची बनाना\' (Listing traits: ईमानदार, बहादुर, त्यागी) ही पात्र-चित्रण है। वे पाठ.' }
          ],
            remediations: { 'listing-traits': { steps: ['**पुनर्पाठ (Re-read) रणनीति:** पाठ को केवल \'कहानी\' समझकर न पढ़ें। नायक के नाम पर उँगली रखें और हर पृष्ठ पर पूछें: "इस.', '**साक्ष्य-वर्गीकरण (Evidence Categorization):** एकत्रित संवाद/क्रियाओं को तीन ढेर में बाँटें: (क) बाह्य व्यवहार.', '**कारण-परिणति मानचित्र (Cause-Effect Map):** हर प्रमुख गुण के लिए तीर खींचें: *अतीत की घटना → वर्तमान निर्णय → भविष्य.', '**मॉडल उत्तर अनुकरण:** बोर्ड के किसी मॉडल उत्तर (Sample Answer) को PEEL संरचना (Point, Evidence, Explanation, Link) में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या अधीन रहकर कथानक को.',
          hint: 'यदि फँस जाएँ तो c11_hin_ar_cbse_04_004 के \'कार्य-उदाहरण 2\' (नायक का चरित्र-चाप विश्लेषण).',
          misconception: 'छात्र सहायक पात्र को \'द्वितीयक\' (secondary) समझकर \'गौण\' (insignificant) मान लेते हैं — वे लिखते हैं: "धनिया होरी की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या अधीन रहकर कथानक को गति देते',
                  options: ['सहायक पात्र वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या अधीन रहकर कथानक को गति देते', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),'],
                  hint: 'यदि फँस जाएँ तो c11_hin_ar_cbse_04_004 के \'कार्य-उदाहरण 2\' (नायक का चरित्र-चाप विश्लेषण) को दोहराएँ.',
                  misconception: 'छात्र सहायक पात्र को \'द्वितीयक\' (secondary) समझकर \'गौण\' (insignificant) मान लेते हैं — वे लिखते हैं: "धनिया होरी की पत्नी है, उसके सहयोग से.' }
          ],
            remediations: { 'secondary-insignificant': { steps: ['चरण 1: छात्र से कहें — "पात्र का नाम हटाकर केवल उसके \'कार्य\' (actions) और \'संवाद\' (dialogues) लिखो। अब बताओ: यदि यह.', 'प्रशांत की तुलना करवाएँ — दोनों पुजारी/डॉक्टर हैं, पर एक शोषण का प्रतीक, दूसरा मुक्ति का। चरण 4: छात्र से 100 शब्दों.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) रचना का वह मूल विचार या भाव है जो सम्पूर्ण कथानक.',
          hint: 'अगर अटके तो c11_hin_ar_cbse_04_002 (कथानक) और c11_hin_ar_cbse_04_004 (नायक चित्रण) दोबारा.',
          misconception: 'छात्र अक्सर मान लेते हैं कि \'मुख्य विषय\' एक शब्द में कहा जा सकता है (जैसे "प्रेम", "देशभक्ति") — जबकि वरिष्ठ माध्यमिक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) रचना का वह मूल विचार या भाव है जो सम्पूर्ण कथानक, पात्रों और',
                  options: ['मुख्य विषय (Central Theme) रचना का वह मूल विचार या भाव है जो सम्पूर्ण कथानक, पात्रों और', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),'],
                  hint: 'अगर अटके तो c11_hin_ar_cbse_04_002 (कथानक) और c11_hin_ar_cbse_04_004 (नायक चित्रण) दोबारा पढ़ें.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि \'मुख्य विषय\' एक शब्द में कहा जा सकता है (जैसे "प्रेम", "देशभक्ति") — जबकि वरिष्ठ माध्यमिक स्तर पर विषय एक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के तीन सबसे मार्मिक दृश्य चुनो और प्रत्येक के लिए एक वाक्य में लिखो कि लेखक क्या महसूस कराना चाहता.', 'फिर तीनों वाक्यों में समान शब्द/भाव ढूँढने को कहें — वही मुख्य विषय बनेगा। 3.', 'अंत में पूछें: "अगर लेखक यहाँ बैठा होता तो तुमसे क्या कहता?" — वही संदेश है। यह चरणबद्ध विधि (scaffolding) अमूर्त.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
