import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch03_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch03_p1',
    title: 'पाठ 3 · Part 1/3',
    subtitle: 'Watch a first creative act survive its own terror — and its own comedy.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 3 · Part 1/3',
    chapters: ['c11_hin_ar_ch03'],
    nodeIds: ['c11_hin_ar_cbse_03_001', 'c11_hin_ar_cbse_03_002', 'c11_hin_ar_cbse_03_003', 'c11_hin_ar_cbse_03_004', 'c11_hin_ar_cbse_03_005', 'c11_hin_ar_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a first-time creator guarding a small bottle of ink', intro: 'An adult writer looks back at the day everything that could go wrong on a makeshift stage did — and the dream survived anyway.', goal: 'Read the ink bottle as a symbol of fragile creative courage and locate the play-night climax.' },
    discovery: {
        question: 'A story built around a tiny ink bottle — \'दाई साल\' of a first attempt. Just a prop on a desk?',
        options: ['No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins', 'Yes — objects in titles are always decorative', 'No — the ink is secretly magical', 'Yes — the real subject is the writing desk'],
        answer: 'No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins',
        hook: 'The Nayi Kahani writer makes the labour of writing itself the story — doubt, ghosts, landlords and all.',
    },
    teaching: [
        { title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track a first creative attempt through its chaos — the stage, the mix-up of two actors as one \'भूत\' — and ask why the imperfection is the point.',
        labels: ['पाठ 3 — पृष्ठभूमि', 'पाठ 3 — कथानक', 'पाठ 3 — पाठ्य-परिवेश', 'पाठ 3 — पात्र-चित्रण', 'पाठ 3 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_001', title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-1 खोलिए और पाठ 03 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of "viw osQ lkFk <kbZ lky," and what are two key biographical details that inform the story\'s perspective?', options: [
                { text: 'The author is I.F', outcome: 'The author is I.F. Ikappiya (iFksj ikapkyh), born 1921 in Dausa, Rajasthan; his first story "I.F.' },
                { text: 'Hindi writer', outcome: 'Not quite — Students treat "context" as a list of facts to memorize (birth year, awards, movement name) rather.', reveals: 'students-treat-context-as-a' },
                { text: 'Premchand or a generic "Hindi writer', outcome: 'Not quite — Students treat "context" as a list of facts to memorize (birth year, awards, movement name) rather.', reveals: 'students-treat-context-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary magazine plans a feature on \'writers writing about writing.\' A junior editor suggests Ikappiya\'s story but calls it \'a plain autobiography of a struggling writer — Nayi Kahani is just a label to memorise for exams.\'',
            decisions: [{ prompt: 'How do you pitch the story properly?', options: [
                { text: 'Pitch it as the Nayi Kahani sensibility in action: written in 1955, in a newly independent nation redefining its voice, the story rejects romantic idealism for middle-class realism — a writer afraid to dip his pen, the tiny ink bottle as symbol of fragile creation. The retrospective adult narration adds reflection and dramatic irony; the meandering, episode-based structure is the movement\'s rejection of plot-driven storytelling.', outcome: 'The feature now explains why a 1955 story about fearing a blank page matters differently — context turns autobiography into a movement\'s manifesto.' },
                { text: 'Run it as autobiography — the author\'s own struggle told straight, no movement talk needed.', outcome: 'Dropping the Nayi Kahani frame misreads the structure: the episodic drift and reflective hindsight are deliberate craft, not diary habits.', reveals: 'story-is-plain-autobiography' },
                { text: 'Extract a moral instead — \'every writer should just start writing\' — for an inspirational box item.', outcome: 'The story isn\'t a productivity lesson; it\'s about the doubt and precarity of becoming a writer when the nation itself is finding its voice.', reveals: 'story-is-motivation-piece' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'The botched performance isn\'t failure — it\'s proof that art gets made by people who risk wasting their only ink.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'Review Class 10 Hindi textbook chapters on "Hindi Sahitya ka Itihas" covering Premchand.',
          misconception: 'Students treat "context" as a list of facts to memorize (birth year, awards, movement name) rather than a lens that.',
          parts: [
                { id: 'a', prompt: 'Who is the author of "viw osQ lkFk <kbZ lky," and what are two key biographical details that inform the story\'s perspective?', answer: 'The author is I.F',
                  options: ['The author is I.F', 'Hindi writer', 'Premchand or a generic "Hindi writer'],
                  hint: 'Review Class 10 Hindi textbook chapters on "Hindi Sahitya ka Itihas" covering Premchand and.',
                  misconception: 'Students treat "context" as a list of facts to memorize (birth year, awards, movement name) rather than a lens that actively shapes.' },
                { id: 'b', prompt: 'The story was published in 1955, a decade after Independence. Explain how the Nayi Kahani (New Story) movement\'s concerns—middle-class anxiety, urban.', answer: 'Nayi Kahani shifted focus from village idealism (Premchand) to urban, educated',
                  options: ['Nayi Kahani shifted focus from village idealism (Premchand) to urban, educated', 'post-Independence mood'],
                  hint: 'Review Class 10 Hindi textbook chapters on "Hindi Sahitya ka Itihas" covering Premchand and.',
                  misconception: 'Students treat "context" as a list of facts to memorize (birth year, awards, movement name) rather than a lens that actively shapes.' },
                { id: 'c', prompt: 'The text references four historical figures—Hitler (#tosYV), Churchill (pfpZy), Roosevelt (fgVyj), Ho Chi Minh (vCnqy xÝiQkj [kku)—as portraits in the.', answer: 'These four represent competing 20th-century visions of power, resistance, and',
                  options: ['These four represent competing 20th-century visions of power, resistance, and', 'famous people'],
                  hint: 'Review Class 10 Hindi textbook chapters on "Hindi Sahitya ka Itihas" covering Premchand and.',
                  misconception: 'Students treat "context" as a list of facts to memorize (birth year, awards, movement name) rather than a lens that actively shapes.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['Give the student two 50-word summaries of the same story—one written as "Context: Ikappiya, 1921, Nayi Kahani, awards".', 'Ask: "Which summary helps you predict the story\'s tone, structure, and central conflict?"', 'Have them rewrite their own context notes for another chapter using the lens format: "Because [biographical/historical.', 'Check next class by asking them to apply the lens to a new passage without prompting.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_002', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' का कथानक — \'वीं के साथ बिते लम्हे\' — आरोह भाग-1 का पाठ।.',
          hint: 'यदि रचनाकार की पृष्ठभूमि स्पष्ट न हो, तो नोड c11_hin_ar_cbse_03_001 के \'रचनाकार परिचय\' और.',
          misconception: 'छात्र प्रायः मान लेते हैं कि \'कालक्रमिक क्रम\' (Chronological Order) ही \'स्वाभाविक\' या \'सही\' संरचना है और कोई भी विचलन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वीं के साथ बिते लम्हे\' का कथानक',
                  options: ['\'वीं के साथ बिते लम्हे\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)', '\'वीं के साथ बिते लम्हे\' का पात्र-चित्रण'],
                  hint: 'यदि रचनाकार की पृष्ठभूमि स्पष्ट न हो, तो नोड c11_hin_ar_cbse_03_001 के \'रचनाकार परिचय\' और.',
                  misconception: 'छात्र प्रायः मान लेते हैं कि \'कालक्रमिक क्रम\' (Chronological Order) ही \'स्वाभाविक\' या \'सही\' संरचना है और कोई भी विचलन (फ्लैशबैक, समानांतर.' }
          ],
            remediations: { 'chronological-order': { steps: ['१) छात्र से कहें: "एक सरल कहानी (जैसे \'खरगोश और कछुआ\') को तीन तरह से लिखो: अ) कालक्रमिक, ब) अंत से शुरू करके फ्लैशबैक.', 'सहानुभूति कहाँ गहरी है?" ३) फिर स्पष्ट करें: "घटनाएँ वही हैं (कथानक समान), केवल क्रम बदला (संरचना) — देखो, अर्थ कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_003', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और.',
          hint: 'यदि परिवेश के सूक्ष्म संकेत (subtle cues) पकड़ में न आएँ, तो नोड 001 (रचनाकार परिचय) में.',
          misconception: 'छात्र प्रायः मानते हैं कि \'परिवेश\' पृष्ठभूमि में स्थिर खड़ा एक \'कैनवास\' है जिस पर कथानक घटित होता है, जबकि वास्तविकता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)',
                  options: ['\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वीं के साथ बिते लम्हे\' का कथानक', '\'वीं के साथ बिते लम्हे\' का पात्र-चित्रण'],
                  hint: 'यदि परिवेश के सूक्ष्म संकेत (subtle cues) पकड़ में न आएँ, तो नोड 001 (रचनाकार परिचय) में दिए गए.',
                  misconception: 'छात्र प्रायः मानते हैं कि \'परिवेश\' पृष्ठभूमि में स्थिर खड़ा एक \'कैनवास\' है जिस पर कथानक घटित होता है, जबकि वास्तविकता यह है कि परिवेश एक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "पाठ के किसी एक पात्र का एक बड़ा फैसला चुनें (जैसे: घर छोड़ना, झूठ बोलना, विद्रोह करना)। अब पाठ.', '(सामाजिक/आर्थिक/सांस्कृतिक/राजनीतिक/भौगोलिक)"। चरण 3: पूछें — "यदि यह आयाम बदल जाए (जैसे: गाँव के बजाय शहर, सामंतवाद के.', 'क्यों/क्यों नहीं?" चरण 4: अंत में छात्र से एक पैराग्राफ लिखवाएँ: "परिवेश पात्र के इस फैसले का \'अदृश्य सह-लेखक\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_004', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_03_002 (कथानक संरचना) के \'कैरेक्टर आर्क\' (Character Arc) खंड.',
          misconception: 'छात्र अक्सर मानते हैं कि पात्र-चित्रण का अर्थ केवल पात्र के गुणों (Traits) की सूची बनाना है — जैसे "नायक ईमानदार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वीं के साथ बिते लम्हे\' का पात्र-चित्रण',
                  options: ['\'वीं के साथ बिते लम्हे\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वीं के साथ बिते लम्हे\' का कथानक', '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_03_002 (कथानक संरचना) के \'कैरेक्टर आर्क\' (Character Arc) खंड को दोहराएँ.',
                  misconception: 'छात्र अक्सर मानते हैं कि पात्र-चित्रण का अर्थ केवल पात्र के गुणों (Traits) की सूची बनाना है — जैसे "नायक ईमानदार, साहसी, त्यागी है"। वे यह.' }
          ],
            remediations: { 'traits': { steps: ['छात्र को एक छोटा गद्यांश दें और कहें: "यहाँ नायक के तीन कार्य छाँटो और प्रत्येक के सामने लिखो कि इससे उसके चरित्र के.', 'फिर पूछें: "यदि यह कार्य न होता तो कथा कैसे बदल जाती?" — इससे \'कार्य-परिणाम\' (Action-Consequence) जोड़ स्पष्ट होगा। 3.', 'अंत में PEEL संरचना का एक मॉडल उत्तर दिखाएँ और छात्र से कहें कि वह अपने उत्तर को उससे मिलाए। 4.', 'अभ्यास के लिए \'चरित्र-डायरी\' (Character Diary) लिखवाएँ: नायक की दृष्टि से एक दिन की प्रविष्टि, जिसमें उसके विचार, भाव.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_005', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटका हुआ महसूस हो तो नोड 004 (नायक चित्रण) की \'चरित्र-चित्रण की तकनीकें\' और नोड 002.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'सहायक पात्र\' का अर्थ \'कम महत्वपूर्ण पात्र\' होता है, इसलिए वे परीक्षा में उनके.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वीं के साथ बिते लम्हे\' के सहायक पात्र',
                  options: ['\'वीं के साथ बिते लम्हे\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वीं के साथ बिते लम्हे\' का कथानक', '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो नोड 004 (नायक चित्रण) की \'चरित्र-चित्रण की तकनीकें\' और नोड 002 (कथानक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'सहायक पात्र\' का अर्थ \'कम महत्वपूर्ण पात्र\' होता है, इसलिए वे परीक्षा में उनके चरित्र-चित्रण को 2-3.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहचान अभ्यास:** छात्र को किसी परिचित कहानी (जैसे \'पंचतंत्र\' या फिल्म) के 3 सहायक पात्र चुनने को कहें और प्रत्येक के.', '**वर्गीकरण अभ्यास:** उन 3 पात्रों को \'फॉयल\', \'कॉन्फिडेंट\', \'मेंटर\', \'कैटलिस्ट\' में वर्गीकृत करवाएँ और कारण पूछें। 3.', '**विस्तारित उत्तर लेखन:** उसी पात्र पर 80-100 शब्दों का उत्तर लिखवाएँ जिसमें **PEEL संरचना** हो: Point (पात्र का.', '**फीडबैक:** बताएँ कि \'वफादार नौकर\' लिखना \'विवरण\' (description) है, \'विश्लेषण\' (analysis) नहीं — विश्लेषण के लिए \'क्यों\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_006', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' का मुख्य विषय — \'वीं के साथ बिते लम्हे\' का केंद्रीय भाव.',
          hint: 'यदि अटके तो पाठ 3 के \'कथानक और आख्यान-संरचना\' (c11_hin_ar_cbse_03_002) और \'पात्र-चित्रण.',
          misconception: 'छात्र प्रायः **मुख्य विषय को एक शब्द में (जैसे \'प्रेम\', \'त्याग\') लिखकर पूर्ण मान लेते हैं** — जबकि विषय एक **पूर्ण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वीं के साथ बिते लम्हे\' का मुख्य विषय',
                  options: ['\'वीं के साथ बिते लम्हे\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वीं के साथ बिते लम्हे\' का कथानक', '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो पाठ 3 के \'कथानक और आख्यान-संरचना\' (c11_hin_ar_cbse_03_002) और \'पात्र-चित्रण: नायक\'.',
                  misconception: 'छात्र प्रायः **मुख्य विषय को एक शब्द में (जैसे \'प्रेम\', \'त्याग\') लिखकर पूर्ण मान लेते हैं** — जबकि विषय एक **पूर्ण विचार-वाक्य** होता है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "विषय को एक शब्द में न लिखें — एक पूरा वाक्य बनाएँ जो \'क्या\' और \'क्यों\' दोनों बताए।" 2.', 'पाठ से तीन प्रमाण छाँटने को कहें जो उस वाक्य को सिद्ध करें। 3.', 'यदि प्रमाण न मिलें, तो विषय-वाक्य को संशोधित करने को कहें। 4.', 'अंत में पूछें: "लेखक इस विषय से आपको क्या करने/सोचने को कह रहा है?" — वही संदेश बनेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
