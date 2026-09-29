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
        { title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_15_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Argue alongside Ambedkar: link each childhood wound to its constitutional answer, test whether legal bans end discrimination, and apply \'dignity of labour\' to today\'s interview rooms.',
        labels: ['श्रम वभिाजन और जाति-प्रथा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_15_014', title: 'श्रम वभिाजन और जाति-प्रथा और मेरी कल्पना का आदर्श समाज — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the \'E\' in PEEL stand for, and what specific function does it serve in a board exam answer?', options: [
                { text: 'The \'E\' stands for **Explanation**', outcome: 'The \'E\' stands for **Explanation** — it is the step where you interpret HOW the evidence supports.' },
                { text: 'Example', outcome: 'Not quite — **"Good writing = flowery language and long quotes."** Students believe examiners reward.', reveals: 'good-writing-flowery-language-and' },
                { text: 'Evidence', outcome: 'Not quite — **"Good writing = flowery language and long quotes."** Students believe examiners reward.', reveals: 'good-writing-flowery-language-and' }
            ] }] } },
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
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का आलोचनात्मक चिंतन — विश्लेषण करके.',
          hint: 'यदि टूलमिन मॉडल (दावा/साक्ष्य/वारंट) अस्पष्ट है → तुरंत **c11_hin_ar_cbse_15_013** (कक्षा.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आंबेडकर का \'आदर्श समाज\' एक **यूटोपिया (दूर का सपना)** है जिसे वे \'अच्छी बातें\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का आलोचनात्मक चिंतन',
                  options: ['\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का कथानक', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि टूलमिन मॉडल (दावा/साक्ष्य/वारंट) अस्पष्ट है → तुरंत **c11_hin_ar_cbse_15_013** (कक्षा 11 आरोह.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आंबेडकर का \'आदर्श समाज\' एक **यूटोपिया (दूर का सपना)** है जिसे वे \'अच्छी बातें\' कहकर सजाते हैं।.' }
          ],
            remediations: { 'practical-necessity': { steps: ['**पुनर्पाठ (Re-read):** पाठ के अंतिम 3 पैराग्राफ (आदर्श समाज पर) पढ़ें — चिह्नित करें: "Democracy is a mode.', '**तर्क-मानचित्र (Argument map) बनाएँ:** कागज पर खींचें: जाति → गतिहीनता → वर्ग-हित टकराव → लोकतंत्र विफल → आदर्श समाज.', '**तुलना-कार्य:** गांधी के \'हरिजन\' लेख (वर्णाश्रम बचाव) और आंबेडकर के \'एनिहिलेशन ऑफ कास्ट\' (खंडन) के **एक-एक पैरा**.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_4 और 5 फिर से हल करें — अब तर्क-चरण (Logical steps) गिनकर लिखें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_014', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर.',
          hint: 'If evidence retrieval is slow: revisit c12_hin_ar_cbse_15_012 (Comprehension) and create.',
          misconception: '**"Good writing = flowery language and long quotes."** Students believe examiners reward Sanskritized Hindi, poetic.',
          parts: [
                { id: 'a', prompt: 'What does the \'E\' in PEEL stand for, and what specific function does it serve in a board exam answer?', answer: 'The \'E\' stands for **Explanation**',
                  options: ['The \'E\' stands for **Explanation**', 'Example', 'Evidence', 'lack of critical engagement'],
                  hint: 'If evidence retrieval is slow: revisit c12_hin_ar_cbse_15_012 (Comprehension) and create a 2-column.',
                  misconception: '**"Good writing = flowery language and long quotes."** Students believe examiners reward Sanskritized Hindi, poetic phrasing, and copying.' },
                { id: 'b', prompt: 'A student writes: "Ambedkar believed in equality because he said \'all men are equal\' and he fought for Dalit rights.', answer: 'The answer has **Point** and **Evidence** but **no Explanation (E)**',
                  options: ['The answer has **Point** and **Evidence** but **no Explanation (E)**', 'Good writing = flowery language and long quotes'],
                  hint: 'If evidence retrieval is slow: revisit c12_hin_ar_cbse_15_012 (Comprehension) and create a 2-column.',
                  misconception: '**"Good writing = flowery language and long quotes."** Students believe examiners reward Sanskritized Hindi, poetic phrasing, and copying.' },
                { id: 'c', prompt: 'Analyze this student\'s opening sentence for a 150-word answer: "In the chapter \'Jeevan Darshan\', Dr.', answer: '**Penalties:** (1) **Vagueness penalty**',
                  options: ['**Penalties:** (1) **Vagueness penalty**', 'Good writing = flowery language and long quotes'],
                  hint: 'If evidence retrieval is slow: revisit c12_hin_ar_cbse_15_012 (Comprehension) and create a 2-column.',
                  misconception: '**"Good writing = flowery language and long quotes."** Students believe examiners reward Sanskritized Hindi, poetic phrasing, and copying.' }
          ],
            remediations: { 'good-writing-flowery-language-and': { steps: ['** Give them a 6-mark answer written in "student style" (long quotes, emotional language, no PEEL) and the *same.', '** Have them highlight every analytical verb in the strong version (e.g., "redefines," "operationalizes,".', '** Assign a 3-mark question daily for 5 days; require rough-work evidence-listing before writing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_15_015', difficulty: 'standard',
          question: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने.',
          hint: 'यदि फँसें तो **c12_hin_ar_cbse_15_006 (मुख्य विषय और संदेश)** पर लौटें — वहाँ लेखक के.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'श्रम विभाजन\' और \'जाति-प्रथा\' दोनों "काम बाँटने" के तरीके हैं — इसलिए दोनों में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का कथानक', '\'जे फोह्क्तु वक्ज त्क्फ्र इज़फक्क\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **c12_hin_ar_cbse_15_006 (मुख्य विषय और संदेश)** पर लौटें — वहाँ लेखक के तर्कों का.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'श्रम विभाजन\' और \'जाति-प्रथा\' दोनों "काम बाँटने" के तरीके हैं — इसलिए दोनों में कोई खास फर्क नहीं।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें (5 मिनट):** पाठ के **पैराग्राफ 3-5** (जहाँ लेखक अंतर स्पष्ट करता है) को **जोर से पढ़ें** — आवाज़ में तर्क.', '**तुलना तालिका बनाएँ (10 मिनट):** एक कागज़ पर दो कॉलम: "श्रम विभाजन" और "जाति-प्रथा"। हर पंक्ति में **एक पहलू** (आधार.', '**मौखिक अभ्यास (5 मिनट):** किसी मित्र/परिजन को 2 मिनट में अंतर समझाएँ — अगर वे समझ गए, आप तैयार हैं। 4.', '**पुनः निदान:** ऊपर दिए गए **DIAGNOSTIC_QUESTION_1** और **DIAGNOSTIC_QUESTION_3** फिर से हल करें — अब तर्क के साथ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
