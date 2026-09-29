import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch15_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch15_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch15_p2',
    title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज · Part 2/3',
    subtitle: 'He couldn\'t touch the tank — so he rewrote the nation\'s contract',
    classLevel: 12, subject: 'hin_ar', topic: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज · Part 2/3',
    chapters: ['c12_hin_ar_ch15'],
    nodeIds: ['c12_hin_ar_cbse_15_007', 'c12_hin_ar_cbse_15_008', 'c12_hin_ar_cbse_15_009', 'c12_hin_ar_cbse_15_010', 'c12_hin_ar_cbse_15_011', 'c12_hin_ar_cbse_15_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Constitutional thinker', intro: 'Every humiliation a Dalit child recorded became a clause in the republic\'s charter. Ambedkar\'s essay is that alchemy.', goal: 'Read Ambedkar\'s essay on birth and caste — liberty, equality, fraternity as structural demands, not slogans.' },
    discovery: {
        question: 'A boy denied water from the public tank and a separate seat at school grows up to write the Constitution. Why did Ambedkar call caste a denial of liberty itself?',
        options: ['Caste assigns occupation and dignity at birth — it kills the freedom to choose work and compete on merit, making liberty and equality structurally impossible', 'Caste was just unkind', 'It blocked his education', 'Because untouchability was illegal'],
        answer: 'Caste assigns occupation and dignity at birth — it kills the freedom to choose work and compete on merit, making liberty and equality structurally impossible',
        hook: 'His argument is structural, not just moral: liberty, equality, fraternity are non-negotiables, and \'dignity of labour\' means choosing work without caste prejudice. The essay\'s fire is autobiography turned into constitutional philosophy — lived reality forged into law.',
    },
    teaching: [
        { title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज — गौण विषय', text: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_15_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Argue alongside Ambedkar: link each childhood wound to its constitutional answer, test whether legal bans end discrimination, and apply \'dignity of labour\' to today\'s interview rooms.',
        labels: ['श्रम वभिाजन और जाति-प्रथा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_009', title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define verbal irony and situational irony. Give one example of each from everyday life (not from the chapter).', options: [
                { text: 'Verbal irony occurs when a speaker says the opposite of what they mean (e.g., saying', outcome: 'Verbal irony occurs when a speaker says the opposite of what they mean (e.g., saying "Great job!".' },
                { text: 'reप्रस्तुतिs', outcome: 'Not quite — Students often confuse **irony** with **sarcasm** or **coincidence**, and treat **symbols** as mere.', reveals: 'students-often-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_010', title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' के मुख्य शब्द: जे-फोह्क्तु-वक्ज-त्क्फ्र-इज़फक्क — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'Define *tkfr&izFkk* (caste system) as Ambedkar uses it in this speech.', options: [
                { text: 'Ambedkar defines *tkfr&izFkk* not merely as a social hierarchy but as a *graded', outcome: 'Ambedkar defines *tkfr&izFkk* not merely as a social hierarchy but as a *graded inequality*.' },
                { text: 'caste is hierarchy', outcome: 'Not quite — Students treat key terms in Ambedkar\'s speech as fixed labels with dictionary meanings (e.g.', reveals: 'students-treat-key-terms-in' },
                { text: 'caste is division of labor', outcome: 'Not quite — Students treat key terms in Ambedkar\'s speech as fixed labels with dictionary meanings (e.g.', reveals: 'students-treat-key-terms-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a debate, the opposing side argues: \'Caste is irrelevant now — admission should be purely on merit.\' Your turn to respond.',
            decisions: [{ prompt: 'How would Ambedkar\'s essay structure the rebuttal?', options: [
                { text: 'Concede the surface appeal, expose the hidden premise that birth already decided who could acquire merit, then flip the burden — merit presupposes equal opportunity, which caste denies; close with his thesis that political equality can\'t survive without social equality.', outcome: 'That\'s the essay\'s own three-step move: validate before dismantling so the \'merit\' defence can\'t claim a straw man — and the conclusion that fraternity is structurally impossible under birth-based hierarchy is the essay\'s load-bearing claim.' },
                { text: 'Open with an emotional personal story of discrimination — feeling precedes argument.', outcome: 'Ambedkar does use his school anecdote, but as evidence anchoring a defined thesis, not as substitute for it; pathos without the birth-versus-merit analysis leaves the opponent\'s logic untouched.', reveals: 'emotion-replaces-argument' },
                { text: 'Dismiss merit-talk outright as upper-caste propaganda not worth engaging.', outcome: 'Refusing to engage is what the essay\'s dialectic avoids: the merit defence is met on its own terms and turned — concede, expose, flip — because dismissal concedes the argument while winning only the mood.', reveals: 'dismissal-beats-dialectic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue caste as a structural theft of liberty — and see how one man\'s humiliations became a nation\'s founding promises.',
            decisions: [{ prompt: 'What comes next? श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_007', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' के गौण विषय — मुख्य विषय के साथ चलने वाले.',
          hint: 'यदि मुख्य विषय ही स्पष्ट नहीं है, तो पहले c12_hin_ar_cbse_15_006 (मुख्य विषय और संदेश) पर.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि गौण विषय = "लेखक द्वारा दी गई अतिरिक्त जानकारी/उदाहरण/प्रसंग"। **वास्तविकता:** गौण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' के गौण विषय',
                  options: ['\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का कथानक', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मुख्य विषय ही स्पष्ट नहीं है, तो पहले c12_hin_ar_cbse_15_006 (मुख्य विषय और संदेश) पर जाएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि गौण विषय = "लेखक द्वारा दी गई अतिरिक्त जानकारी/उदाहरण/प्रसंग"। **वास्तविकता:** गौण विषय एक **तार्किक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 15 के 3-4 पैराग्राफ दें और कहें: "मुख्य विषय (जाति-प्रथा श्रमिकों का विभाजन है) को लाल पेन से, और उससे.', 'फिर पूछें: "नीले वाले विचार मुख्य विषय के कौन-से पहलू को खोलते हैं — कारण, परिणाम, समाधान, या विरोधाभास?" 3.', 'यदि अटकें, तो कक्षा 11 के नोड **c11_hin_ar_cbse_15_007** (गौण विषय) को दोहराएँ, विशेषकर \'गौण विषय vs साक्ष्य.', 'पुनः निदान के लिए DIAGNOSTIC_QUESTION_3 दोहराएँ — अब छात्र \'श्रमिक एकता\' को गौण विषय के रूप में पहचान पाएंगे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_008', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' में बिंब (imagery) — शब्दों से बने जीवंत.',
          hint: 'यदि **उपमेय/उपमान पहचानने** में अटकें → **c11_hin_ar_cbse_15_008** के \'रूपक पहचान अभ्यास\'.',
          misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **बिंब = केवल दृश्य वर्णन (visual description)** और **रूपक = सजावटी भाषा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' में बिंब (imagery)',
                  options: ['\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का कथानक', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि **उपमेय/उपमान पहचानने** में अटकें → **c11_hin_ar_cbse_15_008** के \'रूपक पहचान अभ्यास\' दोहराएँ।.',
                  misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **बिंब = केवल दृश्य वर्णन (visual description)** और **रूपक = सजावटी भाषा (decorative language)**।.' }
          ],
            remediations: { 'visual-description-decorative-language-1': { steps: ['**चरण 1 (10 मिनट):** छात्र से कहें — "आँखें बंद करो। मैं \'बारिश\' कहूँगा। तुम्हें क्या दिखा/सुना/महसूस हुआ?', 'बोलो।" → उनके उत्तर लिखें (बूँदों की आवाज़, मिट्टी की गंध, ठंडक)। समझाएँ: **यही बिंब-निर्माण है।** 2.', '**चरण 2 (15 मिनट):** पाठ के 5 वाक्य दें जिनमें रूपक हो। छात्र से **उपमेय/उपमान अलग करने** को कहें, फिर पूछें: *"लेखक ने.', '\'दीवार\' की जगह \'पहाड़\' होता तो अर्थ कैसे बदलता?"* → यह **चयन-तर्क (selection rationale)** सिखाता है। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_009', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य.',
          hint: 'If stuck on irony types, review the "Claim vs. Reality" table method from ON_FAILURE.',
          misconception: 'Students often confuse **irony** with **sarcasm** or **coincidence**, and treat **symbols** as mere "reप्रस्तुतिs".',
          parts: [
                { id: 'a', prompt: 'In the chapter, Ambedkar states that caste defenders claim the system is based on "merit" (gun) and "division of labor," but he argues it is actually based.', answer: 'This is **situational irony**',
                  options: ['This is **situational irony**', 'verbal irony', 'hypocrisy', 'reप्रस्तुतिs'],
                  hint: 'If stuck on irony types, review the "Claim vs. Reality" table method from ON_FAILURE.',
                  misconception: 'Students often confuse **irony** with **sarcasm** or **coincidence**, and treat **symbols** as mere "reप्रस्तुतिs" rather than.' },
                { id: 'b', prompt: 'Ambedkar writes: "The Constitution is not merely a legal document; it is a vehicle of life, and its spirit is the spirit of the age." Identify the symbol here.', answer: 'The **Constitution** is a symbol representing **social democracy**',
                  options: ['The **Constitution** is a symbol representing **social democracy**', 'it symbolizes law', 'it symbolizes government', 'reप्रस्तुतिs'],
                  hint: 'If stuck on irony types, review the "Claim vs. Reality" table method from ON_FAILURE.',
                  misconception: 'Students often confuse **irony** with **sarcasm** or **coincidence**, and treat **symbols** as mere "reप्रस्तुतिs" rather than.' },
                { id: 'c', prompt: 'Compare the symbolic function of **Manusmriti** and **Buddhism** in Ambedkar\'s argument. How do they operate as opposing symbols?', answer: '**Manusmriti** symbolizes **caste-sanctioned oppression**',
                  options: ['**Manusmriti** symbolizes **caste-sanctioned oppression**', 'reप्रस्तुतिs'],
                  hint: 'If stuck on irony types, review the "Claim vs. Reality" table method from ON_FAILURE.',
                  misconception: 'Students often confuse **irony** with **sarcasm** or **coincidence**, and treat **symbols** as mere "reप्रस्तुतिs" rather than.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If the student cannot distinguish irony types or reads symbols literally: 1.', '**Revisit node c11_hin_ar_cbse_15_009** (Class 11 Irony and Symbolism) — re-do the diagnostic questions there, focusing.', 'Reality" table**: For 5 caste justifications in the chapter (divine, merit, stability, etc.), write the claim in Column.', '**Symbol mapping exercise**: List 5 objects/institutions in the chapter (Constitution, Manusmriti, Buddhism.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse **irony** with **sarcasm** or **coincidence**, and treat **symbols** as mere "reप्रस्तुतिs".',
          parts: [
                { id: 'a', prompt: 'Write a 4-line paragraph using **verbal irony** to critique a modern caste-based practice (e.g., "merit" arguments in reservations debates), and name **one.', answer: '**Sample paragraph**: "Oh yes, \'merit\' is purely objective',
                  options: ['**Sample paragraph**: "Oh yes, \'merit\' is purely objective', 'reप्रस्तुतिs'],
                  hint: 'If stuck on irony types, review the "Claim vs. Reality" table method from ON_FAILURE.',
                  misconception: 'Students often confuse **irony** with **sarcasm** or **coincidence**, and treat **symbols** as mere "reप्रस्तुतिs" rather than.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If the student cannot distinguish irony types or reads symbols literally: 1.', '**Revisit node c11_hin_ar_cbse_15_009** (Class 11 Irony and Symbolism) — re-do the diagnostic questions there, focusing.', 'Reality" table**: For 5 caste justifications in the chapter (divine, merit, stability, etc.), write the claim in Column.', '**Symbol mapping exercise**: List 5 objects/institutions in the chapter (Constitution, Manusmriti, Buddhism.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_010', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध.',
          hint: 'If stuck, review c11_hin_ar_cbse_15_010 (Class 11 Vocabulary in Context) for the 3-step.',
          misconception: 'Students treat key terms in Ambedkar\'s speech as fixed labels with dictionary meanings (e.g., *Lora=krk* = "equality.',
          parts: [
                { id: 'a', prompt: 'Define *tkfr&izFkk* (caste system) as Ambedkar uses it in this speech.', answer: 'Ambedkar defines *tkfr&izFkk* not merely as a social hierarchy but as a *graded',
                  options: ['Ambedkar defines *tkfr&izFkk* not merely as a social hierarchy but as a *graded', 'caste is hierarchy', 'caste is division of labor'],
                  hint: 'If stuck, review c11_hin_ar_cbse_15_010 (Class 11 Vocabulary in Context) for the 3-step.',
                  misconception: 'Students treat key terms in Ambedkar\'s speech as fixed labels with dictionary meanings (e.g., *Lora=krk* = "equality before law," *lerk*.' }
          ],
            remediations: { 'students-treat-key-terms-in': { steps: ['If a student cannot distinguish dictionary vs.', 'contextual meaning: (1) Have them re-read the *Lora=krk* passage (para starting "blh izdkj Lora=krk ij Hkh...") and.', '(2) Ask them to write two definitions side-by-side: "Dictionary: ___" vs.', '"Ambedkar: ___" for *Lora=krk, lerk, nklrk*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_011', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे.',
          hint: 'If stuck, review the chapter summary and the Class 11 grammar node.',
          misconception: 'छात्र अक्सर मानते हैं कि "भाषा उपयोग" विश्लेषण का अर्थ केवल शब्दों के अर्थ समझना या शब्द-भेद पहचानना है। वे यह नहीं देख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' में भाषा-प्रयोग',
                  options: ['\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का कथानक', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review the chapter summary and the Class 11 grammar node (c11_hin_ar_cbse_15_011) for.',
                  misconception: 'छात्र अक्सर मानते हैं कि "भाषा उपयोग" विश्लेषण का अर्थ केवल शब्दों के अर्थ समझना या शब्द-भेद पहचानना है। वे यह नहीं देख पाते कि व्याकरणिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के दो छोटे अंश (50-60 शब्द प्रत्येक) दें: एक जहां कर्मवाच्य प्रबल हो, दूसरा जहां कर्तृवाच्य। 2.', 'उनसे दोनों में कर्ता/कर्म पहचानने और फिर पूछें: "किस अंश में व्यवस्था अधिक शक्तिशाली लगती है?', 'फिर संज्ञाकरण पर ध्यान केंद्रित करें: "असमानता", "शोषण", "मुक्ति" जैसे शब्दों को मूल क्रिया/विशेषण ("असमान", "शोषित".', 'अंत में, छात्र से एक पैराग्राफ पुनर्लेखन करवाएं जहां वह सक्रिय रूप से कर्मवाच्य और संज्ञाकरण का प्रयोग करके व्यवस्थागत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_012', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे.',
          hint: 'यदि फँस जाएँ: **c11_hin_ar_cbse_15_012** के अपठित गद्यांशों पर PEEL लेखन का पुनः अभ्यास.',
          misconception: '**सबसे घातक गलतफहमी:** छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर "अपनी राय" देना होता है**। वे लिखते हैं: "मुझे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का कथानक', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ: **c11_hin_ar_cbse_15_012** के अपठित गद्यांशों पर PEEL लेखन का पुनः अभ्यास करें.',
                  misconception: '**सबसे घातक गलतफहमी:** छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर "अपनी राय" देना होता है**। वे लिखते हैं: "मुझे लगता है लेखक ऐसा इसलिए.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — निदान:** छात्र से कहें: "पाठ का कोई एक वाक्य चुनो और बताओ कि इसका **सीधा अर्थ** क्या है और **लेखक का आशय**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
