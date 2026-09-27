import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch15_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch15_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch15_p3',
    title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज · Part 3/3',
    subtitle: 'He couldn\'t touch the tank — so he rewrote the nation\'s contract',
    classLevel: 12, subject: 'hin_ar', topic: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज · Part 3/3',
    chapters: ['c12_hin_ar_ch15'],
    nodeIds: ['c12_hin_ar_cbse_15_013', 'c12_hin_ar_cbse_15_014', 'c12_hin_ar_cbse_15_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Constitutional thinker', intro: 'Every humiliation a Dalit child recorded became a clause in the republic\'s charter. Ambedkar\'s essay is that alchemy.', goal: 'Read Ambedkar\'s essay on birth and caste — liberty, equality, fraternity as structural demands, not slogans.' },
    discovery: {
        question: 'A boy denied water from the public tank and a separate seat at school grows up to write the Constitution. Why did Ambedkar call caste a denial of liberty itself?',
        options: ['Caste assigns occupation and dignity at birth — it kills the freedom to choose work and compete on merit, making liberty and equality structurally impossible', 'Caste was just unkind', 'It blocked his education', 'Because untouchability was illegal'],
        answer: 'Caste assigns occupation and dignity at birth — it kills the freedom to choose work and compete on merit, making liberty and equality structurally impossible',
        hook: 'His argument is structural, not just moral: liberty, equality, fraternity are non-negotiables, and \'dignity of labour\' means choosing work without caste prejudice. The essay\'s fire is autobiography turned into constitutional philosophy — lived reality forged into law.',
    },
    teaching: [
        { title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) इस संदर्भ में डॉ. आंबेडकर के निबंध के तर्कों की आंतरिक संगति, साक्ष्य-आधारित व्याख्या, और अंतर्निहित पूर्वाग्रहों की पहचान करने की बौद्धिक प्रक्रिया है, जिससे.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_15_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Argue alongside Ambedkar: link each childhood wound to its constitutional answer, test whether legal bans end discrimination, and apply \'dignity of labour\' to today\'s interview rooms.',
        labels: ['श्रम वभिाजन और जाति-प्रथा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c12_hin_ar_cbse_15_014', title: 'Identify each idea',
          dissect: { specimen: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज · Part 3/3', spots: [
            { id: 's1', label: '- -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है — किसी दिए गए पाठ (गद्य/पद्य) के विशिष्ट अंशों, प्रसंगों.', answer: '- -', options: ['- -', '- - -'] },
            { id: 's2', label: '- - -', prompt: 'Which idea is this? — \'श्रम विभाजन\' उत्पादन प्रक्रिया में कार्यों का विशेषीकरण है जिससे दक्षता बढ़ती है.', answer: '- - -', options: ['- - -', '- -'] }
          ] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a debate, the opposing side argues: \'Caste is irrelevant now — admission should be purely on merit.\' Your turn to respond.',
            decisions: [{ prompt: 'How would Ambedkar\'s essay structure the rebuttal?', options: [
                { text: 'Concede the surface appeal, expose the hidden premise that birth already decided who could acquire merit, then flip the burden — merit presupposes equal opportunity, which caste denies; close with his thesis that political equality can\'t survive without social equality.', outcome: 'That\'s the essay\'s own three-step move: validate before dismantling so the \'merit\' defence can\'t claim a straw man — and the conclusion that fraternity is structurally impossible under birth-based hierarchy is the essay\'s load-bearing claim.' },
                { text: 'Open with an emotional personal story of discrimination — feeling precedes argument.', outcome: 'Ambedkar does use his school anecdote, but as evidence anchoring a defined thesis, not as substitute for it; pathos without the birth-versus-merit analysis leaves the opponent\'s logic untouched.', reveals: 'emotion-replaces-argument' },
                { text: 'Dismiss merit-talk outright as upper-caste propaganda not worth engaging.', outcome: 'Refusing to engage is what the essay\'s dialectic avoids: the merit defence is met on its own terms and turned — concede, expose, flip — because dismissal concedes the argument while winning only the mood.', reveals: 'dismissal-beats-dialectic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_015', title: 'You made it',
          caseStudy: { intro: 'You can now argue caste as a structural theft of liberty — and see how one man\'s humiliations became a nation\'s founding promises.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) इस संदर्भ में डॉ. आंबेडकर के निबंध के.',
          hint: 'यदि टूलमिन मॉडल (दावा/साक्ष्य/वारंट) अस्पष्ट है → तुरंत **c11_hin_ar_cbse_15_013** (कक्षा.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आंबेडकर का \'आदर्श समाज\' एक **यूटोपिया (दूर का सपना)** है जिसे वे \'अच्छी बातें\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) इस संदर्भ में डॉ',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) इस संदर्भ में डॉ', '**पृष्ठभूमि और रचनाकार परिचय** किसी पाठ के रचनाकालीन सामाजिक-राजनीतिक-सांस्कृतिक परिवेश', 'कथानक घटनाओं का तार्किक-कारणात्मक क्रम है जो रचना का कंकाल बनाता है; आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting/Context)** किसी रचना का वह बाहरी ढांचा है जिसमें काल (समय), स्थान'],
                  hint: 'यदि टूलमिन मॉडल (दावा/साक्ष्य/वारंट) अस्पष्ट है → तुरंत **c11_hin_ar_cbse_15_013** (कक्षा 11 आरोह.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आंबेडकर का \'आदर्श समाज\' एक **यूटोपिया (दूर का सपना)** है जिसे वे \'अच्छी बातें\' कहकर सजाते हैं।.' }
          ],
            remediations: { 'practical-necessity': { steps: ['**पुनर्पाठ (Re-read):** पाठ के अंतिम 3 पैराग्राफ (आदर्श समाज पर) पढ़ें — चिह्नित करें: "Democracy is a mode.', '**तर्क-मानचित्र (Argument map) बनाएँ:** कागज पर खींचें: जाति → गतिहीनता → वर्ग-हित टकराव → लोकतंत्र विफल → आदर्श समाज.', '**तुलना-कार्य:** गांधी के \'हरिजन\' लेख (वर्णाश्रम बचाव) और आंबेडकर के \'एनिहिलेशन ऑफ कास्ट\' (खंडन) के **एक-एक पैरा**.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_4 और 5 फिर से हल करें — अब तर्क-चरण (Logical steps) गिनकर लिखें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है — किसी दिए गए पाठ (गद्य/पद्य) के विशिष्ट अंशों.',
          hint: 'यदि फँस जाएँ तो **c12_hin_ar_cbse_15_006 (मुख्य विषय)** और **c12_hin_ar_cbse_15_009.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर लिखने का अर्थ है पाठ का अनुवाद या सारांश लिख देना।"* **वास्तविकता:** बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है', '**पृष्ठभूमि और रचनाकार परिचय** किसी पाठ के रचनाकालीन सामाजिक-राजनीतिक-सांस्कृतिक परिवेश', 'कथानक घटनाओं का तार्किक-कारणात्मक क्रम है जो रचना का कंकाल बनाता है; आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting/Context)** किसी रचना का वह बाहरी ढांचा है जिसमें काल (समय), स्थान'],
                  hint: 'यदि फँस जाएँ तो **c12_hin_ar_cbse_15_006 (मुख्य विषय)** और **c12_hin_ar_cbse_15_009.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर लिखने का अर्थ है पाठ का अनुवाद या सारांश लिख देना।"* **वास्तविकता:** बोर्ड परीक्षा में.' }
          ],
            remediations: { 'text-evidenced': { steps: ['**चरण 1 — निदान:** विद्यार्थी से कहें कि वह अपना अंतिम लिखा उत्तर लाए और प्रत्येक पैराग्राफ के आगे **P, E, Ex, L** लेबल.', 'Evidence यह वाक्य लूँगा क्योंकि इसमें \'अमानवीय\' शब्द है...', 'Explanation में मैं बताऊँगा कि यह शब्द प्रतीकात्मक रूप से..."* **चरण 4 — पुनः निदान:** अगले सप्ताह समान पैटर्न का नया.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_015', difficulty: 'standard',
          question: '\'श्रम विभाजन\' उत्पादन प्रक्रिया में कार्यों का विशेषीकरण है जिससे दक्षता बढ़ती.',
          hint: 'यदि फँसें तो **c12_hin_ar_cbse_15_006 (मुख्य विषय और संदेश)** पर लौटें — वहाँ लेखक के.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'श्रम विभाजन\' और \'जाति-प्रथा\' दोनों "काम बाँटने" के तरीके हैं — इसलिए दोनों में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'श्रम विभाजन\' उत्पादन प्रक्रिया में कार्यों का विशेषीकरण है जिससे दक्षता बढ़ती है',
                  options: ['\'श्रम विभाजन\' उत्पादन प्रक्रिया में कार्यों का विशेषीकरण है जिससे दक्षता बढ़ती है', '**पृष्ठभूमि और रचनाकार परिचय** किसी पाठ के रचनाकालीन सामाजिक-राजनीतिक-सांस्कृतिक परिवेश', 'कथानक घटनाओं का तार्किक-कारणात्मक क्रम है जो रचना का कंकाल बनाता है; आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting/Context)** किसी रचना का वह बाहरी ढांचा है जिसमें काल (समय), स्थान'],
                  hint: 'यदि फँसें तो **c12_hin_ar_cbse_15_006 (मुख्य विषय और संदेश)** पर लौटें — वहाँ लेखक के तर्कों का.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'श्रम विभाजन\' और \'जाति-प्रथा\' दोनों "काम बाँटने" के तरीके हैं — इसलिए दोनों में कोई खास फर्क नहीं।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें (5 मिनट):** पाठ के **पैराग्राफ 3-5** (जहाँ लेखक अंतर स्पष्ट करता है) को **जोर से पढ़ें** — आवाज़ में तर्क.', '**तुलना तालिका बनाएँ (10 मिनट):** एक कागज़ पर दो कॉलम: "श्रम विभाजन" और "जाति-प्रथा"। हर पंक्ति में **एक पहलू** (आधार.', '**मौखिक अभ्यास (5 मिनट):** किसी मित्र/परिजन को 2 मिनट में अंतर समझाएँ — अगर वे समझ गए, आप तैयार हैं। 4.', '**पुनः निदान:** ऊपर दिए गए **DIAGNOSTIC_QUESTION_1** और **DIAGNOSTIC_QUESTION_3** फिर से हल करें — अब तर्क के साथ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
