import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch06_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch06_p2',
    title: 'पाठ 6 · Part 2/3',
    subtitle: 'यह नोड केवल "गौण विषय" की पहचान, वर्गीकरण, मुख्य विषय से संबंध विश्लेषण, और बोर्ड-स्तरीय.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 6 · Part 2/3',
    chapters: ['c9_hin_ga_ch06'],
    nodeIds: ['c9_hin_ga_cbse_06_007', 'c9_hin_ga_cbse_06_008', 'c9_hin_ga_cbse_06_009', 'c9_hin_ga_cbse_06_010', 'c9_hin_ga_cbse_06_011', 'c9_hin_ga_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'प्रेमचंद के फटे जूते\' में प्रेमचंद, जूते, सरलता, प्रसंग जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — गौण विषय', text: '\'प्रेमचंद के फटे जूते\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — गौण', 'पाठ 6 — साहित्यिक', 'पाठ 6 — पदावली', 'पाठ 6 — व्याकरण', 'पाठ 6 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 2/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — \'प्रेमचंद के फटे जूते\' में भाषा-प्रयोग — (निबंध) ने कैसे शब्द, वाक्य और शैली चुनी।', answer: '6 -', options: ['6 -', '6 - -'] },
            { id: 's2', label: '6 - -', prompt: 'Which idea is this? — \'प्रेमचंद के फटे जूते\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '6 - -', options: ['6 - -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 6 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_007', difficulty: 'standard',
          question: '\'प्रेमचंद के फटे जूते\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो c9_hin_ga_cbse_06_006 (मुख्य विषय और संदेश) पर वापस जाएँ और मुख्य विषय को.',
          misconception: '**विशिष्ट भ्रांति:** "गौण विषय = मुख्य विषय का छोटा/कम महत्वपूर्ण भाग" — छात्र समझते हैं कि गौण विषय मुख्य विषय का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'प्रेमचंद के फटे जूते\' के गौण विषय',
                  options: ['\'प्रेमचंद के फटे जूते\' के गौण विषय', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'प्रेमचंद के फटे जूते\' का कथानक', '\'प्रेमचंद के फटे जूते\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c9_hin_ga_cbse_06_006 (मुख्य विषय और संदेश) पर वापस जाएँ और मुख्य विषय को **एक वाक्य.',
                  misconception: '**विशिष्ट भ्रांति:** "गौण विषय = मुख्य विषय का छोटा/कम महत्वपूर्ण भाग" — छात्र समझते हैं कि गौण विषय मुख्य विषय का **उपसमुच्चय** (subset).' }
          ],
            remediations: { 'subset': { steps: ['**चरण 1 — शब्द-प्रयोग सुधार:** छात्र से कहें: "गौण" का अर्थ "द्वितीयक/सहायक" लिखें, "कम महत्वपूर्ण" न लिखें। बोर्ड.', '**चरण 2 — स्वतंत्र अस्तित्व का अभ्यास:** पाठ 6 से एक गौण विषय चुनें (जैसे: कर्ज़/आर्थिक दबाव) और छात्र से पूछें: "अगर.', '**चरण 3 — संबंध-मानचित्र बनवाएँ:** एक तीर-आरेख (arrow diagram) बनवाएँ: गौण विषय → (पुष्ट करता है / जटिल बनाता है.', '**चरण 4 — बोर्ड-शैली उत्तर लेखन:** छात्र से एक 60-शब्दी उत्तर लिखवाएँ: "पाठ 6 में आर्थिक विवशता गौण विषय के रूप में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_008', difficulty: 'standard',
          question: '\'प्रेमचंद के फटे जूते\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटका लगे तो c9_hin_ga_cbse_06_006 के \'थीम पहचान\' चरण को दोहराएँ—विशेषकर.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि **हर तुलना रूपक है** और हर \'सुंदर वर्णन\' बिंब है। उदाहरण: "वह शेर जैसा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'प्रेमचंद के फटे जूते\' में बिंब (imagery)',
                  options: ['\'प्रेमचंद के फटे जूते\' में बिंब (imagery)', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'प्रेमचंद के फटे जूते\' का कथानक', '\'प्रेमचंद के फटे जूते\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका लगे तो c9_hin_ga_cbse_06_006 के \'थीम पहचान\' चरण को दोहराएँ—विशेषकर \'साक्ष्य-आधारित थीम.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि **हर तुलना रूपक है** और हर \'सुंदर वर्णन\' बिंब है। उदाहरण: "वह शेर जैसा बहादुर है" — छात्र इसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**संरचना ड्रिल:** 10 वाक्य दें (मिश्रित: उपमा, रूपक, साधारण वाक्य)। छात्र से केवल \'जैसे/वैसे/समान\' शब्द खोजने को.', '**इंद्रिय-छँटाई:** एक छोटा अनुच्छेद दें। छात्र पाँच रंगों के पेंसिल से प्रत्येक इंद्रिय के शब्द रेखांकित करे.', '**उपमान-गुण मिलान:** 5 रूपक दें (समय=चोर, क्रोध=ज्वालामुखी, आशा=किरण, जीवन=नदी, ज्ञान=प्रकाश)। छात्र प्रत्येक उपमान के.', '**लघु-लेखन:** उपरोक्त ड्रिल के तुरंत बाद 3 पंक्तियाँ लिखवाएँ जहाँ जानबूझकर 2 बिंब + 1 रूपक प्रयुक्त हों। सहपाठी समीक्षा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_009', difficulty: 'standard',
          question: '\'प्रेमचंद के फटे जूते\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review **node c9_hin_ga_cbse_06_008 (बिंब और रूपक)** — specifically the worked.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **विरोधाभास (Paradox)** और **विरोधाभास अलंकार (Oxymoron)** को एक ही मान लेते हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'प्रेमचंद के फटे जूते\' में विरोधाभास',
                  options: ['\'प्रेमचंद के फटे जूते\' में विरोधाभास', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'प्रेमचंद के फटे जूते\' का कथानक', '\'प्रेमचंद के फटे जूते\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **node c9_hin_ga_cbse_06_008 (बिंब और रूपक)** — specifically the worked examples.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **विरोधाभास (Paradox)** और **विरोधाभास अलंकार (Oxymoron)** को एक ही मान लेते हैं। वे "मधुर कड़वाहट".' }
          ],
            remediations: { 'paradox-oxymoron-bittersweet': { steps: ['**चरण 1:** छात्र से कहें: "पाठ 6 से कोई एक वाक्य चुनो जो तुम्हें \'गलत\' या \'उल्टा\' लगे पर लेखक ने जानबूझकर लिखा हो। उसे.', '(उदाहरण: हार/जीत)। अब बताओ: लेखक झूठ बोल रहा है या एक अलग तल (level) पर सत्य बता रहा है?" — यह विरोधाभास की.', 'हर बार पात्र क्या महसूस कर रहा होता है?', 'क्या वस्तु का रूप बदलता है (टूटना, जलना, खोना)?" — यह *पुनरावृत्ति (recurrence)* और *सह-विकास (co-evolution)* द्वारा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_010', difficulty: 'standard',
          question: '\'प्रेमचंद के फटे जूते\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'अगर अटके तो \'पाठ 6 — मुख्य विषय और संदेश\' (नोड 006) दोबारा पढ़ें क्योंकि मुख्य शब्द उसी.',
          misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' का अर्थ केवल \'कठिन शब्द\' या \'बार-बार आने वाला शब्द\' होता है; वे शब्दकोश अर्थ रट लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'प्रेमचंद के फटे जूते\' की पदावली',
                  options: ['\'प्रेमचंद के फटे जूते\' की पदावली', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'प्रेमचंद के फटे जूते\' का कथानक', '\'प्रेमचंद के फटे जूते\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर अटके तो \'पाठ 6 — मुख्य विषय और संदेश\' (नोड 006) दोबारा पढ़ें क्योंकि मुख्य शब्द उसी विषय की.',
                  misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' का अर्थ केवल \'कठिन शब्द\' या \'बार-बार आने वाला शब्द\' होता है; वे शब्दकोश अर्थ रट लेते हैं लेकिन यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से पाठ 6 का कोई एक अनुच्छेद पढ़वाएँ और उनसे कहें कि वे 3 शब्द चुनें जिन्हें हटाने से बात \'अधूरी\' लगे। चरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_011', difficulty: 'standard',
          question: '\'प्रेमचंद के फटे जूते\' में भाषा-प्रयोग — (निबंध) ने कैसे शब्द, वाक्य और शैली.',
          hint: 'अगर फँस जाएँ तो **पदावली नोड (c9_hin_ga_cbse_06_010)** के "कार्यशाला: शब्द-परिवार बनाना".',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "पाठ में भाषा-प्रयोग" का अर्थ है **व्याकरण की शुद्धता (correct grammar)** जाँचना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'प्रेमचंद के फटे जूते\' में भाषा-प्रयोग',
                  options: ['\'प्रेमचंद के फटे जूते\' में भाषा-प्रयोग', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'प्रेमचंद के फटे जूते\' का कथानक', '\'प्रेमचंद के फटे जूते\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर फँस जाएँ तो **पदावली नोड (c9_hin_ga_cbse_06_010)** के "कार्यशाला: शब्द-परिवार बनाना" अभ्यास को.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "पाठ में भाषा-प्रयोग" का अर्थ है **व्याकरण की शुद्धता (correct grammar)** जाँचना — जैसे संधि-विच्छेद.' }
          ],
            remediations: { 'correct-grammar': { steps: ['**पहला चरण:** छात्र से कहो: "पाठ 6 के किसी एक पात्र के 5 संवाद छाँटो और प्रत्येक में **एक शब्द/वाक्य-विशेषता** अंडरलाइन.', '**दूसरा चरण:** प्रत्येक अंडरलाइन किए भाग के सामने लिखो: **"यह *क्यों* यहाँ है?', '— पात्र की पहचान / मनोभाव / प्रसंग की माँग।"** 3.', '**तीसरा चरण:** छात्र को **PEEL पैराग्राफ** लिखने को कहो: *Point* (भाषा-विशेषता), *Evidence* (पाठ से उद्धरण).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_012', difficulty: 'standard',
          question: '\'प्रेमचंद के फटे जूते\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटकें तो c9_hin_ga_cbse_06_010 (पदावली) और c9_hin_ga_cbse_06_002 (कथानक) दोबारा पढ़ें।',
          misconception: 'छात्र समझते हैं कि "आशय-सूचक" का अर्थ है "अपनी मन से कहानी बनाना"। इसलिए वे पाठ से बाहर की बातें लिख देते हैं — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'प्रेमचंद के फटे जूते\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'प्रेमचंद के फटे जूते\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'प्रेमचंद के फटे जूते\' का कथानक', '\'प्रेमचंद के फटे जूते\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटकें तो c9_hin_ga_cbse_06_010 (पदावली) और c9_hin_ga_cbse_06_002 (कथानक) दोबारा पढ़ें।',
                  misconception: 'छात्र समझते हैं कि "आशय-सूचक" का अर्थ है "अपनी मन से कहानी बनाना"। इसलिए वे पाठ से बाहर की बातें लिख देते हैं — जैसे ऊपर के अंश में "शायद.' }
          ],
            remediations: { 'text-bound-inference-6-8': { steps: ['छात्र को एक छोटा अंश (4-5 पंक्ति) दें और कहें: "हर वाक्य के आगे 📌 लगाओ जहाँ तुम्हें लगता है कोई जानकारी छिपी है।" 2.', 'फिर पूछें: "इन 📌 को जोड़कर एक निष्कर्ष लिखो — लेकिन हर निष्कर्ष के आगे वह 📌 वाली पंक्ति लिखो जो उसका सबूत है।" 3.', 'यदि वह बाहरी ज्ञान लाए (जैसे "किसान गरीब होगा"), तो रोकें: "पाठ में \'गरीब\' शब्द कहाँ है?', '\'हल\' और \'खेत\' से हम क्या जानते हैं — बस वही लिखो।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
