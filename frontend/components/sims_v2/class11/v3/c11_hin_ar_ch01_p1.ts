import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch01_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch01_p1',
    title: 'पाठ 1 · Part 1/3',
    subtitle: 'Read a chess game as the diagnosis of a kingdom already lost.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 1 · Part 1/3',
    chapters: ['c11_hin_ar_ch01'],
    nodeIds: ['c11_hin_ar_cbse_01_001', 'c11_hin_ar_cbse_01_002', 'c11_hin_ar_cbse_01_003', 'c11_hin_ar_cbse_01_004', 'c11_hin_ar_cbse_01_005', 'c11_hin_ar_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a kingdom fall one move at a time', intro: 'In 1856 Lucknow two nobles chase checkmate while the Company chases the crown — and Premchand refuses to tell you whom to blame.', goal: 'Analyse feudal decay as systemic, not personal, and evaluate Premchand\'s deliberate historical distortion.' },
    discovery: {
        question: 'Two nobles play chess while the British annex Awadh — are Mir and Roshan the villains of \'Shatranj ke Khiladi\'?',
        options: ['No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab', 'Yes — their chess obsession alone destroyed the kingdom', 'Yes — they are the story\'s clear antagonists', 'No — the British officer is the story\'s only villain'],
        answer: 'No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab',
        hook: 'Premchand wrote 1856 from inside 1924 — the \'polite\' annexation mirrors the reformist colonial rhetoric of his own time.',
    },
    teaching: [
        { title: 'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक परिस्थितियों का वह ढाँचा है जो रचना के कथ्य और रूप को निर्धारित करता है; रचनाकार परिचय (Author Introduction).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hold the three timelines — 1856 Lucknow, 1924 India, today — and weigh whether shrinking Wajid Ali Shah to a caged bird is a historical error or an artistic necessity.',
        labels: ['पाठ 1 — पृष्ठभूमि', 'पाठ 1 — कथानक', 'पाठ 1 — पाठ्य-परिवेश', 'पाठ 1 — पात्र-चित्रण', 'पाठ 1 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 1/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम.', answer: '1 -', options: ['1 -', '1 -'] },
            { id: 's2', label: '1 -', prompt: 'Which idea is this? — पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो.', answer: '1 -', options: ['1 -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is staging a reading of Premchand\'s \'Shatranj ke Khiladi\'. The director wants to stage it as \'a comedy about two chess-obsessed nobles in old Lucknow — period fun, nothing more.\' You sense the 1856 setting is doing heavier work.',
            decisions: [{ prompt: 'What reading should the production take?', options: [
                { text: 'Stage it as national allegory: Premchand wrote in 1924 — Non-Cooperation rising, Jallianwala Bagh fresh — and chose 1856 Awadh deliberately. The chessboard is a structural device: while Mirza and Mir move pieces, the kingdom is annexed without a shot — aristocratic decadence mirroring the \'polite\' colonial takeover the audience of 1924 would recognise in their own moment.', outcome: 'The comedy turns sharp: context isn\'t backdrop, it\'s the prism that makes chess-playing during a collapse mean political paralysis.' },
                { text: 'Go with the comedy reading — the story\'s humour about chess addicts carries itself without history lessons.', outcome: 'Stripping the 1856/1924 double timeline reduces a critique of feudal and colonial complicity to costume farce.', reveals: 'chess-players-is-just-comedy' },
                { text: 'Present it as a moral tale — chess is a vice, so the nobles deserved to lose their kingdom.', outcome: 'The game is a metaphor for paralysis, not a sin being punished; Premchand indicts a system\'s decadence, not a hobby.', reveals: 'chess-is-the-vice' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'An older Premchand story gave vice and virtue clear names; here nobody is clean — which is exactly what systemic decay looks like.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_001', difficulty: 'standard',
          question: 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक.',
          hint: 'यदि अटके तो कक्षा 10 की हिंदी पाठ्यपुस्तक के किसी भी पाठ का \'लेखक परिचय\' खोलें और देखें.',
          misconception: 'छात्र समझते हैं कि \'रचनाकार परिचय\' का अर्थ है — जन्मतिथि, मृत्यु तिथि, प्रमुख कृतियों की सूची और पुरस्कार रट लेना। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक',
                  options: ['पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो', 'पात्र-चित्रण एक साहित्यिक विश्लेषण विधि है जिसमें किसी कथा/नाटक के प्रमुख पात्र (नायक) के'],
                  hint: 'यदि अटके तो कक्षा 10 की हिंदी पाठ्यपुस्तक के किसी भी पाठ का \'लेखक परिचय\' खोलें और देखें कि वहाँ दिए.',
                  misconception: 'छात्र समझते हैं कि \'रचनाकार परिचय\' का अर्थ है — जन्मतिथि, मृत्यु तिथि, प्रमुख कृतियों की सूची और पुरस्कार रट लेना। वे यह नहीं देखते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "रचनाकार की जीवनी से 5 तथ्य चुनो जो तुम्हें \'भावनात्मक\' लगें (दुख, संघर्ष, विद्रोह, प्रेम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_002', difficulty: 'standard',
          question: 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त.',
          hint: 'यदि अटका महसूस हो तो: **E.M. फॉर्स्टर का मूल उद्धरण** ("The king died and then the queen.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'कथानक = घटनाओं की सूची\' और \'आख्यान-संरचना = अध्यायों/भागों का विभाजन\'। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम',
                  options: ['कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो', 'पात्र-चित्रण एक साहित्यिक विश्लेषण विधि है जिसमें किसी कथा/नाटक के प्रमुख पात्र (नायक) के'],
                  hint: 'यदि अटका महसूस हो तो: **E.M. फॉर्स्टर का मूल उद्धरण** ("The king died and then the queen died".',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'कथानक = घटनाओं की सूची\' और \'आख्यान-संरचना = अध्यायों/भागों का विभाजन\'। **गलत तर्क का स्रोत:**.' }
          ],
            remediations: { 'class-10': { steps: ['**माइक्रो-स्टेप 1:** छात्र से कहें — "किसी भी फिल्म का अंतिम दृश्य याद करो। अब बताओ: वह दृश्य *क्यों* अंत में आया?', 'कौन-सी तीन घटनाएँ उसके *कारण* बनीं?" — यह **कारण-कार्य श्रृंखला (Causal Chain)** बनाने का अभ्यास है। 2.', '**माइक्रो-स्टेप 2:** एक ही लघुकथा को दो तरह से सुनाएँ: (क) रैखिक, (ख) फ्लैशबैक से शुरू। पूछें: "कौन-सी संस्कृति ज्यादा.', 'क्यों?" — यह **संरचना के मनोवैज्ञानिक प्रभाव** का साक्षात्कार है। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित.',
          hint: 'यदि फंसे हुए महसूस हो तो कथानक और आख्यान-संरचना (c11_hin_ar_cbse_01_002) की घटनाओं के.',
          misconception: 'छात्र अक्सर यह मानते हैं कि पाठ्य-परिवेश का अर्थ केवल कहानी की भौतिक जगह (जैसे गांव, शहर) है, और वे समय (इतिहासकाल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो',
                  options: ['पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पात्र-चित्रण एक साहित्यिक विश्लेषण विधि है जिसमें किसी कथा/नाटक के प्रमुख पात्र (नायक) के'],
                  hint: 'यदि फंसे हुए महसूस हो तो कथानक और आख्यान-संरचना (c11_hin_ar_cbse_01_002) की घटनाओं के क्रम और.',
                  misconception: 'छात्र अक्सर यह मानते हैं कि पाठ्य-परिवेश का अर्थ केवल कहानी की भौतिक जगह (जैसे गांव, शहर) है, और वे समय (इतिहासकाल, मौसम) या सामाजिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही पात्र (जैसे एक किसान) दो अलग-अलग परिवेशों में कैसे अलग व्यवहार करता है: चरण 1 - कहानी A में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_004', difficulty: 'standard',
          question: 'पात्र-चित्रण एक साहित्यिक विश्लेषण विधि है जिसमें किसी कथा/नाटक के प्रमुख पात्र.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_01_002 (कथानक और आख्यान-संरचना)** के.',
          misconception: '**विशिष्ट भ्रांति:** *"पात्र-चित्रण में नायक के गुण-दोषों की सूची (List of Traits) बनाना पर्याप्त है, जैसे: ईमानदार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण एक साहित्यिक विश्लेषण विधि है जिसमें किसी कथा/नाटक के प्रमुख पात्र (नायक) के',
                  options: ['पात्र-चित्रण एक साहित्यिक विश्लेषण विधि है जिसमें किसी कथा/नाटक के प्रमुख पात्र (नायक) के', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_01_002 (कथानक और आख्यान-संरचना)** के \'चरमोत्कर्ष\'.',
                  misconception: '**विशिष्ट भ्रांति:** *"पात्र-चित्रण में नायक के गुण-दोषों की सूची (List of Traits) बनाना पर्याप्त है, जैसे: ईमानदार, साहसी, भावुक, क्रोधी.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**\'क्यों?\' का खेल (5 Whys Technique):** छात्र से नायक के किसी एक कार्य के लिए 5 बार "क्यों?" पूछें — हर उत्तर के बाद.', 'सजा का → क्यों डरता है सजा से?', 'बचपन में पिटता था → तो झूठ **आदत नहीं, आघात-प्रतिक्रिया** है।) 2.', '**साक्ष्य-व्याख्या तालिका (Evidence-Explanation Table):** दो कॉलम बनाएँ — बायाँ: "पाठ से साक्ष्य (संवाद/घटना)", दायाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे गौण चरित्र होते हैं जो नायक/प्रमुख पात्र.',
          hint: 'यदि अटके, तो **नोड 004 (नायक चित्रण)** के \'चरित्र-चाप (Character Arc)\' खंड को दोहराएँ और.',
          misconception: '**विशिष्ट भ्रांति:** "सहायक पात्र का विश्लेषण करते समय उसके **व्यक्तिगत जीवन-वृत्त (Backstory), स्वभाव की सूची (Traits.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे गौण चरित्र होते हैं जो नायक/प्रमुख पात्र के',
                  options: ['सहायक पात्र (Supporting Characters) वे गौण चरित्र होते हैं जो नायक/प्रमुख पात्र के', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो'],
                  hint: 'यदि अटके, तो **नोड 004 (नायक चित्रण)** के \'चरित्र-चाप (Character Arc)\' खंड को दोहराएँ और नायक के.',
                  misconception: '**विशिष्ट भ्रांति:** "सहायक पात्र का विश्लेषण करते समय उसके **व्यक्तिगत जीवन-वृत्त (Backstory), स्वभाव की सूची (Traits list), या नायक के.' }
          ],
            remediations: { 'backstory': { steps: ['**चरण 1 — निदान:** छात्र से पूछें: *"इस पात्र को कहानी से हटा दो। नायक का अंतिम निर्णय/क्लाइमेक्स/थीम पर क्या असर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) किसी रचना का वह केंद्रीय विचार या मूल भावना है जिसे.',
          hint: 'यदि अटके तो **पात्र-चित्रण: नायक (c11_hin_ar_cbse_01_004)** के \'चरित्र विकास क्रम\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'शीर्षक को ही मुख्य विषय मान लेते हैं\'** या **\'किसी एक पात्र के एक संवाद को लेखक का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) किसी रचना का वह केंद्रीय विचार या मूल भावना है जिसे लेखक',
                  options: ['मुख्य विषय (Central Theme) किसी रचना का वह केंद्रीय विचार या मूल भावना है जिसे लेखक', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो'],
                  hint: 'यदि अटके तो **पात्र-चित्रण: नायक (c11_hin_ar_cbse_01_004)** के \'चरित्र विकास क्रम\' (Character Arc).',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'शीर्षक को ही मुख्य विषय मान लेते हैं\'** या **\'किसी एक पात्र के एक संवाद को लेखक का अंतिम संदेश मान लेते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read) कराएं:** छात्र से कहें — "पाठ के **अंतिम तीन पैराग्राफ** दोबारा पढ़ो और बताओ: लेखक यहाँ नायक के.', 'नायक क्या *महसूस* कर रहा है?', '**द्विआधारी तालिका (Binary Table) बनवाएं:** दो कॉलम बनाएं — \'पात्र के संवाद/विचार\' और \'लेखक का संकेत/व्यंग्य/पुष्टि\'।.', '**विषय-वाक्य लेखन अभ्यास:** छात्र से कहें — "विषय को एक संज्ञा (जैसे \'त्याग\') में न लिखो। एक पूर्ण वाक्य लिखो जिसमें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
