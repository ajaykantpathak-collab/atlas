import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch25_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch25_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch25_p1',
    title: 'तताँरा-वामीरो कथा · Part 1/3',
    subtitle: 'इस नोड में केवल **रचनाकार परिचय, रचना की पृष्ठभूमि (लोककथा का स्रोत), भाषा-शैली की.',
    classLevel: 10, subject: 'hin_sp', topic: 'तताँरा-वामीरो कथा · Part 1/3',
    chapters: ['c10_hin_sp_ch25'],
    nodeIds: ['c10_hin_sp_cbse_25_001', 'c10_hin_sp_cbse_25_002', 'c10_hin_sp_cbse_25_003', 'c10_hin_sp_cbse_25_004', 'c10_hin_sp_cbse_25_005', 'c10_hin_sp_cbse_25_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'पाठ्यपुस्तक से देथा-परिचय के तीन तथ्य लिखिए (राजस्थान-संबद्धता, लोक-साहित्य संग्रह, पहचान)। अब लोककथा का.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'तताँरा-वामीरो कथा — पृष्ठभूमि और रचनाकार परिचय', text: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के प्रख्यात संग्रहकर्ता-लेखक), लोककथा का स्रोत-रूप, उनकी भाषा-शैली (लोकभाषा का साहित्यिक प्रयोग), तथा लोककथा →.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_25_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तताँरा-वामीरो कथा — पृष्ठभूमि', 'तताँरा-वामीरो कथा — कथानक', 'तताँरा-वामीरो कथा — पाठ्य-परिवेश', 'तताँरा-वामीरो कथा — पात्र-चित्रण', 'तताँरा-वामीरो कथा — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_sp_cbse_25_002', title: 'Identify each idea',
          dissect: { specimen: 'तताँरा-वामीरो कथा · Part 1/3', spots: [
            { id: 's1', label: '- -', prompt: 'Which idea is this? — \'तताँरा-वामीरो कथा\' का कथानक — \'तताँरा-वामीरो कथा\' — स्पर्श भाग-2 का पाठ। पाठ का कथानक.', answer: '- -', options: ['- -', '- -'] },
            { id: 's2', label: '- -', prompt: 'Which idea is this? — \'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित है।', answer: '- -', options: ['- -', '- -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_25_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through तताँरा-वामीरो कथा like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? तताँरा-वामीरो कथा · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तताँरा-वामीरो कथा · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_001', difficulty: 'standard',
          question: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी.',
          hint: 'यदि अटके तो **\'लोककथा और साहित्यिक कथा का अंतर\'** (कक्षा 9 हिंदी/सामान्य ज्ञान स्तर).',
          misconception: '**विशिष्ट भ्रांति:** छात्र मान लेते हैं कि **"तताँरा-वामीरो कथा" विजयदान देथा की मौलिक (original) कहानी है** और इसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के',
                  options: ['इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के', '\'तताँरा-वामीरो कथा\' का कथानक', '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)', '\'तताँरा-वामीरो कथा\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो **\'लोककथा और साहित्यिक कथा का अंतर\'** (कक्षा 9 हिंदी/सामान्य ज्ञान स्तर) दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मान लेते हैं कि **"तताँरा-वामीरो कथा" विजयदान देथा की मौलिक (original) कहानी है** और इसे प्रेमचंद या मोहन राकेश.' }
          ],
            remediations: { 'original': { steps: ['**स्पष्ट अंतर सिखाएँ:** बोर्ड पर दो कॉलम बनाएँ — बाएँ \'लोककथा (मौखिक/सामूहिक/सरल/प्रकृति-आधारित)\', दाएँ \'साहित्यिक कथा.', '**रचनाकार का वक्तव्य पढ़वाएँ:** विजयदान देथा का प्रसिद्ध कथन — *"मैं लोककथाओं का अनुवादक नहीं, पुनर्सृजक हूँ"* — कक्षा.', '**पाठ से साक्ष्य ढूँढवाएँ:** छात्रों से कहें कि पाठ के पहले दो पैराग्राफ पढ़कर **तीन लोकभाषा के शब्द** और **तीन.', '**अभ्यास प्रश्न:** "इस कथा को पढ़कर आपको कैसे पता चलता है कि यह मौलिक कहानी नहीं, लोककथा पर आधारित है?" — इसका उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_002', difficulty: 'standard',
          question: '\'तताँरा-वामीरो कथा\' का कथानक — \'तताँरा-वामीरो कथा\' — स्पर्श भाग-2 का पाठ। पाठ.',
          hint: 'If stuck, review the **textual sequence of events** (पाठ में घटनाओं का क्रम) from node.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"फ्लैशबैक" (flashback) केवल "अतीत में जाना" है** और हर बार जब अतीत का वर्णन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तताँरा-वामीरो कथा\' का कथानक',
                  options: ['\'तताँरा-वामीरो कथा\' का कथानक', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के', '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)', '\'तताँरा-वामीरो कथा\' का पात्र-चित्रण'],
                  hint: 'If stuck, review the **textual sequence of events** (पाठ में घटनाओं का क्रम) from node 001\'s.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"फ्लैशबैक" (flashback) केवल "अतीत में जाना" है** और हर बार जब अतीत का वर्णन आता है, उसे फ्लैशबैक.' }
          ],
            remediations: { 'flashback': { steps: ['**चरण 1:** छात्र से पूछें: "कहानी कौन सुना रहा है — लेखक या वामीरो?" → उत्तर: वामीरो (प्रथम-व्यक्ति/प्रतिभागी कथावाचक)।.', '**चरण 2:** पूछें: "तताँरा का बचपन हमें कैसे पता चलता है?" → उत्तर: वामीरो की स्मृति/कथन से। 3.', '**चरण 3:** समझाएँ: "जब कोई पात्र अपनी स्मृति से अतीत बताता है, वह **आंतरिक फ्लैशबैक** है। जब लेखक सीधे अतीत में ले जाता.', '**चरण 4:** अभ्यास: पाठ के दो अंश दें — एक जहाँ वामीरो कहता है "मुझे याद है..." (आंतरिक), एक जहाँ लेखक सीधे वर्णन करता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_003', difficulty: 'standard',
          question: '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_25_002 (कथानक और आख्यान-संरचना)** के \'प्रमुख मोड़\' खंड को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पाठ्य-परिवेश\' का अर्थ केवल **भौगोलिक विवरण (geographical description)** लिखना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)',
                  options: ['\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के', '\'तताँरा-वामीरो कथा\' का कथानक', '\'तताँरा-वामीरो कथा\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_25_002 (कथानक और आख्यान-संरचना)** के \'प्रमुख मोड़\' खंड को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'पाठ्य-परिवेश\' का अर्थ केवल **भौगोलिक विवरण (geographical description)** लिखना है — जैसे "कहानी.' }
          ],
            remediations: { 'geographical-description': { steps: ['**चरण 1:** छात्र से कहें: "पाठ के किसी एक पृष्ठ को खोलो जहाँ केवल प्रकृति-वर्णन हो। अब पेंसिल से घेरो: कौन-सा शब्द.', 'कौन-सा **वामीरो के मन** से?', 'कौन-सा **समाज के दबाव** से?" 2.', '**चरण 2:** एक टेबल बनाएँ — स्तंभ: भौगोलिक तत्व | सामाजिक तत्व | मनोवैज्ञानिक प्रभाव। पाठ से 5-5 उदाहरण भरवाएँ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_004', difficulty: 'standard',
          question: '\'तताँरा-वामीरो कथा\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_25_002 (कथानक)** दोबारा पढ़ें — तताँरा के चरित्र के 4.',
          misconception: '**विशिष्ट भ्रांति:** छात्र तताँरा को केवल **"बहादुर चरवाहा" (brave shepherd)** लिखकर 2-3 विशेषण (adjectives) दे देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तताँरा-वामीरो कथा\' का पात्र-चित्रण',
                  options: ['\'तताँरा-वामीरो कथा\' का पात्र-चित्रण', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के', '\'तताँरा-वामीरो कथा\' का कथानक', '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_25_002 (कथानक)** दोबारा पढ़ें — तताँरा के चरित्र के 4 प्रमुख मोड़.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र तताँरा को केवल **"बहादुर चरवाहा" (brave shepherd)** लिखकर 2-3 विशेषण (adjectives) दे देते हैं और समझते हैं.' }
          ],
            remediations: { 'brave-shepherd-2-3-adjectives': { steps: ['**पहला कदम:** छात्र से कहें — "पाठ खोलो और तताँरा के **केवल 3 संवाद** ढूंढो: (क) पहला संवाद, (ख) दरबार में सबसे तीखा.', '**दूसरा कदम:** प्रत्येक संवाद के नीचे लिखवाएं — "यह संवाद तताँरा के **कौन से गुण** को दर्शाता है?', '**तीसरा कदम:** अब पूछें — "क्या शुरुआत और अंत के गुण एक जैसे हैं?', 'अगर नहीं, तो **कब और कैसे बदला**?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_005', difficulty: 'standard',
          question: '\'तताँरा-वामीरो कथा\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटके तो **नोड 004 (नायक का चरित्र-चित्रण)** के **\'PEEL उत्तर संरचना\'** को दोहराएँ और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि सहायक पात्रों का विश्लेषण करते समय केवल उनके **गुण-दोष (Traits)** गिनाने हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तताँरा-वामीरो कथा\' के सहायक पात्र',
                  options: ['\'तताँरा-वामीरो कथा\' के सहायक पात्र', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के', '\'तताँरा-वामीरो कथा\' का कथानक', '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **नोड 004 (नायक का चरित्र-चित्रण)** के **\'PEEL उत्तर संरचना\'** को दोहराएँ और **नोड 003.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि सहायक पात्रों का विश्लेषण करते समय केवल उनके **गुण-दोष (Traits)** गिनाने हैं (जैसे: तताँरा मेहनती.' }
          ],
            remediations: { 'traits': { steps: ['**चरण 1:** छात्र को पाठ से **एक सहायक पात्र** चुनने को कहें और उसके **केवल तीन संवाद/कार्य** ढूँढ़ने को कहें (खोज.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_006', difficulty: 'standard',
          question: '\'तताँरा-वामीरो कथा\' का मुख्य विषय — \'तताँरा-वामीरो कथा\' का केंद्रीय भाव और संदेश',
          hint: 'यदि अटके तो c10_hin_sp_cbse_25_002 (कथानक) के \'मृत्यु-प्रसंग मैपिंग\' अभ्यास को दोहराएँ.',
          misconception: '**सबसे आम भ्रम:** छात्र **\'विषय\' (Theme)** और **\'कथानक\' (Plot)** को एक मान लेते हैं। वे उत्तर में लिखते हैं: *"विषय यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तताँरा-वामीरो कथा\' का मुख्य विषय',
                  options: ['\'तताँरा-वामीरो कथा\' का मुख्य विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के', '\'तताँरा-वामीरो कथा\' का कथानक', '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_25_002 (कथानक) के \'मृत्यु-प्रसंग मैपिंग\' अभ्यास को दोहराएँ — प्रत्येक.',
                  misconception: '**सबसे आम भ्रम:** छात्र **\'विषय\' (Theme)** और **\'कथानक\' (Plot)** को एक मान लेते हैं। वे उत्तर में लिखते हैं: *"विषय यह है कि तताँरा और.' }
          ],
            remediations: { 'theme-plot-9-what-happened': { steps: ['**चरण 1:** छात्र से कहें — "कहानी किसी को सुनाओ, पर **केवल 2 वाक्यों में**।" जब वह घटनाएँ सुनाए, रोकें और पूछें: "यह.', '**चरण 2:** बोर्ड पर दो कॉलम बनाएँ: **कथानक (Plot)** vs **विषय (Theme)**। 5-5 उदाहरण भरवाएँ (जैसे: कथानक — "राम वन गया".', '**चरण 3:** \'तताँरा-वामीरो कथा\' के 3 प्रसंग दें और पूछें: "प्रत्येक से कौन-सा **सार्वभौमिक सत्य** निकलता है?" — इससे.', '**चरण 4:** पिछले वर्ष के बोर्ड प्रश्न दिखाएँ जहाँ विषय पूछा गया हो और टॉपर का उत्तर दिखाएँ — अंतर स्पष्ट करें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
