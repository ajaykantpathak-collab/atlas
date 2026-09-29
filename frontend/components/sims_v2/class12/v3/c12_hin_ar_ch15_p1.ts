import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch15_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch15_p1',
    title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज · Part 1/3',
    subtitle: 'He couldn\'t touch the tank — so he rewrote the nation\'s contract',
    classLevel: 12, subject: 'hin_ar', topic: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज · Part 1/3',
    chapters: ['c12_hin_ar_ch15'],
    nodeIds: ['c12_hin_ar_cbse_15_001', 'c12_hin_ar_cbse_15_002', 'c12_hin_ar_cbse_15_003', 'c12_hin_ar_cbse_15_004', 'c12_hin_ar_cbse_15_005', 'c12_hin_ar_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Constitutional thinker', intro: 'Every humiliation a Dalit child recorded became a clause in the republic\'s charter. Ambedkar\'s essay is that alchemy.', goal: 'Read Ambedkar\'s essay on birth and caste — liberty, equality, fraternity as structural demands, not slogans.' },
    discovery: {
        question: 'A boy denied water from the public tank and a separate seat at school grows up to write the Constitution. Why did Ambedkar call caste a denial of liberty itself?',
        options: ['Caste assigns occupation and dignity at birth — it kills the freedom to choose work and compete on merit, making liberty and equality structurally impossible', 'Caste was just unkind', 'It blocked his education', 'Because untouchability was illegal'],
        answer: 'Caste assigns occupation and dignity at birth — it kills the freedom to choose work and compete on merit, making liberty and equality structurally impossible',
        hook: 'His argument is structural, not just moral: liberty, equality, fraternity are non-negotiables, and \'dignity of labour\' means choosing work without caste prejudice. The essay\'s fire is autobiography turned into constitutional philosophy — lived reality forged into law.',
    },
    teaching: [
        { title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_15_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Argue alongside Ambedkar: link each childhood wound to its constitutional answer, test whether legal bans end discrimination, and apply \'dignity of labour\' to today\'s interview rooms.',
        labels: ['श्रम वभिाजन और जाति-प्रथा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_001', title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-2 खोलिए और पाठ 15 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: '**REMEMBER**: List Dr. B.R. Ambedkar\'s birth date, place of birth, and the year he passed away.', options: [
                { text: '**Correct Answer**: Born 14 April 1891 in Mhow (Madhya Pradesh)', outcome: '**Correct Answer**: Born 14 April 1891 in Mhow (Madhya Pradesh); passed away 6 December 1956.' },
                { text: 'mÙke O;ogkj', outcome: 'Not quite — Students often treat "tkfr&izFkk" (caste discrimination) and "tkfr&vyavastha" (caste system).', reveals: 'students-often-treat-tkfr-izfkk' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_002', title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का क्रम: शुरुआत जे-फोह्क्तु-वक्ज-त्क्फ्र-इज़फक्क से, घटनाएँ बढ़ती हैं, अंत \'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का केंद्रीय.',
            decisions: [{ prompt: 'What is the central thesis of Ambedkar\'s essay "Jati Vichar aur Varna Vyavastha" as stated in the opening section?', options: [
                { text: 'The central thesis is that the caste system (varna vyavastha) is fundamentally', outcome: 'The central thesis is that the caste system (varna vyavastha) is fundamentally incompatible with.' },
                { text: 'Ambedkar describes his childhood struggles', outcome: 'Not quite — Students treat this essay as a "story" with a plot (beginning-middle-end events) and look for.', reveals: 'students-treat-this-essay-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_005', title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'Name the teacher mentioned in the text who asked young Ambedkar what he would do after completing his education, and state Ambedkar\'s exact.', options: [
                { text: 'The teacher is not named in the text', outcome: 'The teacher is not named in the text; he is referred to only as "ek vè;kid" (a teacher).' },
                { text: 'Principal Krishnaji', outcome: 'Not quite — Students treat "supporting characters" in non-fiction as mere name-dropping — they list "Maharaja.', reveals: 'students-treat-supporting-characters-in' },
                { text: 'invents a name (e', outcome: 'Not quite — Students treat "supporting characters" in non-fiction as mere name-dropping — they list "Maharaja.', reveals: 'students-treat-supporting-characters-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_006', title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज — मुख्य विषय और संदेश',
          caseStudy: { intro: 'सब घटनाएँ \'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' में \'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का केंद्रीय भाव और संदेश की ओर ले जाती हैं — यही मुख्य विषय है।',
            decisions: [{ prompt: 'What is the central argument Ambedkar makes about the relationship between caste and social justice in this chapter?', options: [
                { text: 'Correct answer: Ambedkar argues that caste is not merely a social evil but a structural', outcome: 'Correct answer: Ambedkar argues that caste is not merely a social evil but a structural barrier.' },
                { text: 'Ambedkar wants to reform caste', outcome: 'Not quite — Students often treat "caste discrimination" as the theme itself, rather than the *subject* of the.', reveals: 'students-often-treat-caste-discrimination' },
                { text: 'He focuses only on political rights', outcome: 'Not quite — Students often treat "caste discrimination" as the theme itself, rather than the *subject* of the.', reveals: 'students-often-treat-caste-discrimination' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a debate, the opposing side argues: \'Caste is irrelevant now — admission should be purely on merit.\' Your turn to respond.',
            decisions: [{ prompt: 'How would Ambedkar\'s essay structure the rebuttal?', options: [
                { text: 'Concede the surface appeal, expose the hidden premise that birth already decided who could acquire merit, then flip the burden — merit presupposes equal opportunity, which caste denies; close with his thesis that political equality can\'t survive without social equality.', outcome: 'That\'s the essay\'s own three-step move: validate before dismantling so the \'merit\' defence can\'t claim a straw man — and the conclusion that fraternity is structurally impossible under birth-based hierarchy is the essay\'s load-bearing claim.' },
                { text: 'Open with an emotional personal story of discrimination — feeling precedes argument.', outcome: 'Ambedkar does use his school anecdote, but as evidence anchoring a defined thesis, not as substitute for it; pathos without the birth-versus-merit analysis leaves the opponent\'s logic untouched.', reveals: 'emotion-replaces-argument' },
                { text: 'Dismiss merit-talk outright as upper-caste propaganda not worth engaging.', outcome: 'Refusing to engage is what the essay\'s dialectic avoids: the merit defence is met on its own terms and turned — concede, expose, flip — because dismissal concedes the argument while winning only the mood.', reveals: 'dismissal-beats-dialectic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue caste as a structural theft of liberty — and see how one man\'s humiliations became a nation\'s founding promises.',
            decisions: [{ prompt: 'What comes next? श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'Review Class 11 Hindi Aroh Chapter 15 "Before You Read" (c11_hin_ar_cbse_15_001) and the.',
          misconception: 'Students often treat "tkfr&izFkk" (caste discrimination) and "tkfr&vyavastha" (caste system) as synonyms, leading them.',
          parts: [
                { id: 'a', prompt: '**REMEMBER**: List Dr. B.R. Ambedkar\'s birth date, place of birth, and the year he passed away.', answer: '**Correct Answer**: Born 14 April 1891 in Mhow (Madhya Pradesh)',
                  options: ['**Correct Answer**: Born 14 April 1891 in Mhow (Madhya Pradesh)', 'mÙke O;ogkj'],
                  hint: 'Review Class 11 Hindi Aroh Chapter 15 "Before You Read" (c11_hin_ar_cbse_15_001) and the theme.',
                  misconception: 'Students often treat "tkfr&izFkk" (caste discrimination) and "tkfr&vyavastha" (caste system) as synonyms, leading them to write answers.' },
                { id: 'b', prompt: '**APPLY**: A student from a marginalized community clears a competitive exam but is mocked during the interview for "not looking like an officer." Using.', answer: '**Correct Answer (steps)**: 1',
                  options: ['**Correct Answer (steps)**: 1', '**What a wrong answer reveals**: If the student writes a generic', 'statement without using the terms', 'Lora=krk'],
                  hint: 'Review Class 11 Hindi Aroh Chapter 15 "Before You Read" (c11_hin_ar_cbse_15_001) and the theme.',
                  misconception: 'Students often treat "tkfr&izFkk" (caste discrimination) and "tkfr&vyavastha" (caste system) as synonyms, leading them to write answers.' },
                { id: 'c', prompt: '**ANALYZE**: Compare Ambedkar\'s view of "lerk" (equality) in this essay with the Constitutional provision of "Equality of Opportunity" (Article 16).', answer: '**Correct Answer**: - Similarity: Both reject formal equality (treating everyone',
                  options: ['**Correct Answer**: - Similarity: Both reject formal equality (treating everyone', 'both support reservations', 'mÙke O;ogkj'],
                  hint: 'Review Class 11 Hindi Aroh Chapter 15 "Before You Read" (c11_hin_ar_cbse_15_001) and the theme.',
                  misconception: 'Students often treat "tkfr&izFkk" (caste discrimination) and "tkfr&vyavastha" (caste system) as synonyms, leading them to write answers.' }
          ],
            remediations: { 'students-often-treat-tkfr-izfkk': { steps: ['**Step-by-step remediation**: 1.', 'Re-read the biographical sketch and create a 2-column table: Column A = "Life Event" (e.g., denied Sanskrit, separate.', 'For each of the three key terms — **Lora=krk, lerk, Hkzkr`rk** — write one sentence in your own words using the.', 'Take the "vklikl" (activity) question 1 from the text: read Premchand\'s "xyrk yksgk" (or its summary) and write 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "tkfr&izFkk" (caste discrimination) and "tkfr&vyavastha" (caste system) as synonyms, leading them.',
          parts: [
                { id: 'a', prompt: '**EVALUATE**: "Ambedkar\'s essay is historically important but irrelevant today because caste discrimination is legally banned." Critique this statement using.', answer: '**Correct Answer**: The statement is flawed because: 1',
                  options: ['**Correct Answer**: The statement is flawed because: 1', 'laws exist now', 'mÙke O;ogkj'],
                  hint: 'Review Class 11 Hindi Aroh Chapter 15 "Before You Read" (c11_hin_ar_cbse_15_001) and the theme.',
                  misconception: 'Students often treat "tkfr&izFkk" (caste discrimination) and "tkfr&vyavastha" (caste system) as synonyms, leading them to write answers.' },
                { id: 'b', prompt: '**CREATE**: Write a 4-line dialogue between a young Bhimrao (age 12) and his teacher, where the teacher asks "What do you want to become?" and Bhimrao replies.', answer: '**Expected criteria for a good answer**: - Teacher asks the question',
                  options: ['**Expected criteria for a good answer**: - Teacher asks the question', 'mÙke O;ogkj'],
                  hint: 'Review Class 11 Hindi Aroh Chapter 15 "Before You Read" (c11_hin_ar_cbse_15_001) and the theme.',
                  misconception: 'Students often treat "tkfr&izFkk" (caste discrimination) and "tkfr&vyavastha" (caste system) as synonyms, leading them to write answers.' }
          ],
            remediations: { 'students-often-treat-tkfr-izfkk': { steps: ['**Step-by-step remediation**: 1.', 'Re-read the biographical sketch and create a 2-column table: Column A = "Life Event" (e.g., denied Sanskrit, separate.', 'For each of the three key terms — **Lora=krk, lerk, Hkzkr`rk** — write one sentence in your own words using the.', 'Take the "vklikl" (activity) question 1 from the text: read Premchand\'s "xyrk yksgk" (or its summary) and write 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_002', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का कथानक — \'जे फोह्क्तु वक्ज त्क्फ्र.',
          hint: 'If stuck, review Class 11 "Text: Plot and Narrative Structure" (c11_hin_ar_cbse_15_002).',
          misconception: 'Students treat this essay as a "story" with a plot (beginning-middle-end events) and look for "rising action,".',
          parts: [
                { id: 'a', prompt: 'What is the central thesis of Ambedkar\'s essay "Jati Vichar aur Varna Vyavastha" as stated in the opening section?', answer: 'The central thesis is that the caste system (varna vyavastha) is fundamentally',
                  options: ['The central thesis is that the caste system (varna vyavastha) is fundamentally', 'Ambedkar describes his childhood struggles'],
                  hint: 'If stuck, review Class 11 "Text: Plot and Narrative Structure" (c11_hin_ar_cbse_15_002) focusing.',
                  misconception: 'Students treat this essay as a "story" with a plot (beginning-middle-end events) and look for "rising action," "climax," "falling action.".' }
          ],
            remediations: { 'students-treat-this-essay-as': { steps: ['If a student maps narrative arc instead of logical flow: (1) Give them a 2-paragraph op-ed on a current issue (e.g.', '(2) Ask them to number each sentence\'s function: Claim / Evidence / Counter-claim / Rebuttal / Conclusion.', '(3) Have them draw arrows showing which sentence supports which.', '(4) Return to Ambedkar — apply same labeling to paragraphs 1-9.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_003', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान.',
          hint: 'यदि अटका हुआ महसूस करें, तो **c11_hin_ar_cbse_15_003** (कक्षा 11 का परिवेश-वातावरण नोड).',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी प्रायः मान लेते हैं कि चूंकि आंबेडकर \'जाति-प्रथा\' की आलोचना कर रहे हैं, इसलिए निबंध का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पाठ्य-परिवेश (setting)',
                  options: ['\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का कथानक', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पात्र-चित्रण'],
                  hint: 'यदि अटका हुआ महसूस करें, तो **c11_hin_ar_cbse_15_003** (कक्षा 11 का परिवेश-वातावरण नोड) और.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी प्रायः मान लेते हैं कि चूंकि आंबेडकर \'जाति-प्रथा\' की आलोचना कर रहे हैं, इसलिए निबंध का **वातावरण सर्वत्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पठन (Re-reading):** निबंध के तीन खंड चुनें — (क) प्रारंभिक परिभाषा अंश, (ख) \'विषैला वातावरण\' अंश, (ग) अंतिम.', '**शब्द-मानचित्रण (Word-mapping):** प्रत्येक खंड से 5-5 शब्द निकालें जो वातावरण रचते हों (जैसे: खंड क — \'विभाजन\'.', '**तुलनात्मक विश्लेषण:** तीनों सूचियों की तुलना करें — शब्दों की **प्रकृति कैसे बदलती है?** (संज्ञा-प्रधान/तकनीकी →.', '**लेखन अभ्यास:** 50 शब्दों में लिखें: *"निबंध का वातावरण एकांगी नहीं, त्रि-आयामी है — विश्लेषणात्मक प्रस्थान, नैतिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_004', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति.',
          hint: 'यदि फँस जाएँ तो **कक्षा 11, पाठ 15 (c11_hin_ar_cbse_15_004)** का \'पात्र-चित्रण\' पुनः.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अंबेडकर के \'नायक-चित्रण\' में **\'व्यक्तिगत गुणों\' (साहस, विद्वता, संघर्ष)** की सूची बना देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पात्र-चित्रण',
                  options: ['\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का कथानक', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **कक्षा 11, पाठ 15 (c11_hin_ar_cbse_15_004)** का \'पात्र-चित्रण\' पुनः पढ़ें और तुलना.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अंबेडकर के \'नायक-चित्रण\' में **\'व्यक्तिगत गुणों\' (साहस, विद्वता, संघर्ष)** की सूची बना देते हैं — जैसे जीवनी में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पाठ के 3-4 मुख्य तर्क-बिंदु** (Thesis Points) छात्र से बुलेट-पॉइंट में लिखवाएँ (उदा.: जाति=श्रमिकों का विभाजन.', 'प्रत्येक बिंदु के सामने लिखवाएँ: **"यहाँ अंबेडकर क्या कर रहे हैं?"** — क्रिया-विशेषण में उत्तर दें (विखंडित कर रहे हैं.', 'इन क्रियाओं को **चार आयामों** में वर्गीकृत करवाएँ: **तार्किक विश्लेषक, निडर विखंडनकर्ता, कट्टर यथार्थवादी, संरचनात्मक.', 'अब कहें: **"यही नायक का चित्रण है — विशेषणों की सूची नहीं, क्रियाओं का कोलाज।"** इस अभ्यास के बाद छात्र से पुनः 150.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_005', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के.',
          hint: 'If stuck on "why is Phule here?", revisit c12_hin_ar_cbse_15_001 (Context) — the 1936.',
          misconception: 'Students treat "supporting characters" in non-fiction as mere name-dropping — they list "Maharaja of Baroda, Jyotiba.',
          parts: [
                { id: 'a', prompt: 'Name the teacher mentioned in the text who asked young Ambedkar what he would do after completing his education, and state Ambedkar\'s exact three-part reply.', answer: 'The teacher is not named in the text',
                  options: ['The teacher is not named in the text', 'Principal Krishnaji', 'invents a name (e'],
                  hint: 'If stuck on "why is Phule here?", revisit c12_hin_ar_cbse_15_001 (Context) — the 1936 speech was.',
                  misconception: 'Students treat "supporting characters" in non-fiction as mere name-dropping — they list "Maharaja of Baroda, Jyotiba Phule, teacher" and.' },
                { id: 'b', prompt: 'Explain in your own words why Ambedkar includes Jyotiba Phule (xka/h th) as a reference in this essay.', answer: 'Ambedkar cites Phule to establish an ideological lineage',
                  options: ['Ambedkar cites Phule to establish an ideological lineage', 'Phule was Ambedkar\'s guru', 'they worked together'],
                  hint: 'If stuck on "why is Phule here?", revisit c12_hin_ar_cbse_15_001 (Context) — the 1936 speech was.',
                  misconception: 'Students treat "supporting characters" in non-fiction as mere name-dropping — they list "Maharaja of Baroda, Jyotiba Phule, teacher" and.' },
                { id: 'c', prompt: 'Compare the roles of the school teacher (who asked the question) and the Maharaja of Baroda (who funded the scholarship) in shaping Ambedkar\'s trajectory.', answer: 'The teacher triggers internal motivation',
                  options: ['The teacher triggers internal motivation', 'motivation'],
                  hint: 'If stuck on "why is Phule here?", revisit c12_hin_ar_cbse_15_001 (Context) — the 1936 speech was.',
                  misconception: 'Students treat "supporting characters" in non-fiction as mere name-dropping — they list "Maharaja of Baroda, Jyotiba Phule, teacher" and.' }
          ],
            remediations: { 'students-treat-supporting-characters-in': { steps: ['Re-read the text *only* for proper nouns — circle every name/title (teacher, Maharaja, Phule, British, xka/h th).', 'For each, write one sentence: "This person appears in paragraph X to show Y."', 'Check if any sentence uses "because" or "therefore" — if not, the function isn\'t analyzed.', 'Revisit c11_hin_ar_cbse_15_005 (Class 11 Supporting Characters) for the fiction vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_006', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का मुख्य विषय — \'जे फोह्क्तु वक्ज त्क्फ्र.',
          hint: 'If unable to separate topic from theme, review the difference using a परिचित text (e.g.',
          misconception: 'Students often treat "caste discrimination" as the theme itself, rather than the *subject* of the chapter.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain why Ambedkar says "caste is not just a division of labour but a division of labourers" and how this supports the primary theme.', answer: 'Correct answer: The phrase means caste doesn\'t just assign different jobs',
                  options: ['Correct answer: The phrase means caste doesn\'t just assign different jobs', 'division of labour', 'division of labourers', 'social justice'],
                  hint: 'If unable to separate topic from theme, review the difference using a परिचित text (e.g., "Topic.',
                  misconception: 'Students often treat "caste discrimination" as the theme itself, rather than the *subject* of the chapter.' },
                { id: 'b', prompt: 'Apply Ambedkar\'s concept of "social justice" to evaluate the following statement: "Economic reservations for economically weaker sections (EWS) achieve social.', answer: 'Correct application: Ambedkar\'s social justice requires addressing *caste-based*',
                  options: ['Correct application: Ambedkar\'s social justice requires addressing *caste-based*', 'social justice', 'reservation policy'],
                  hint: 'If unable to separate topic from theme, review the difference using a परिचित text (e.g., "Topic.',
                  misconception: 'Students often treat "caste discrimination" as the theme itself, rather than the *subject* of the chapter.' }
          ],
            remediations: { 'students-often-treat-caste-discrimination': { steps: ['Re-read the last 3 pages of the chapter (from "esjh dYiuk dk vkn\'kZ&lekt" to end) and underline every sentence.', 'Write one sentence explaining how each of these four concepts is *denied* by caste according to Ambedkar.', 'Re-attempt Diagnostic Question 6.', 'If still stuck, review Class 11 node c11_hin_ar_cbse_15_006 (Theme: Primary Theme and Message) for the PEEL structure.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
