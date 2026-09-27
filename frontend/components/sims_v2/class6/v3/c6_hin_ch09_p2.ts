import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch09_p2: SimDef = {
    id: 'v3_c6_hin_ch09_p2',
    title: 'पाठ 9 · Part 2/3',
    subtitle: 'This node covers identification, evidence-gathering, and analytical explanation.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 9 · Part 2/3',
    chapters: ['c6_hin_ch09'],
    nodeIds: ['c6_hin_cbse_09_007', 'c6_hin_cbse_09_008', 'c6_hin_cbse_09_009', 'c6_hin_cbse_09_010', 'c6_hin_cbse_09_011', 'c6_hin_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Think about your favorite TV show — the main story might be "solving a mystery," but along the way, you.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'एक कहानी में मुख्य विषय \'साहस\' है। लेखक ने दो गौण विषय बुने हैं: (अ) \'डर को स्वीकार करना\' और (ब) \'दोस्ती में विश्वास\'। विश्लेषण कीजिए कि ये दोनों गौण विषय.',
        options: ['**Correct Answer:** (अ) **\'डर को स्वीकार करना\'**', 'दोनों साहस को बढ़ाते हैं', 'कहानी में होने वाली छोटी-मोटी घटनाएं'],
        answer: '**Correct Answer:** (अ) **\'डर को स्वीकार करना\'**',
        hook: '**Specific Error:** Students believe **गौण विषय = "कहानी में होने वाली छोटी-मोटी घटनाएं" (minor plot events)**.',
    },
    teaching: [
        { title: 'पाठ 9 — गौण विषय', text: 'गौण विषय (Sub-theme) refers to the secondary ideas, issues, or motifs in a literary text that run parallel to the मुख्य विषय (main theme), supporting, contrasting, or deepening it without being the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — गौण', 'पाठ 9 — साहित्यिक', 'पाठ 9 — पदावली', 'पाठ 9 — व्याकरण', 'पाठ 9 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_hin_cbse_09_007', title: 'पाठ 9 — गौण विषय',
          caseStudy: { intro: 'Think about your favorite TV show — the main story might be "solving a mystery," but along the way, you notice a **sub-theme of "friendship tested.',
            decisions: [{ prompt: 'किसी पाठ में \'गौण विषय\' की पहचान करने का सबसे पहला संकेत क्या होता है?', options: [
                { text: '**Correct Answer:** किसी विचार, घटना या भाव का पाठ में **बार-बार दोहराव** (repetition)', outcome: '**Correct Answer:** किसी विचार, घटना या भाव का पाठ में **बार-बार दोहराव** (repetition) — चाहे वह.' },
                { text: 'मुख्य पात्र का लक्ष्य', outcome: 'Not quite — **Specific Error:** Students believe **गौण विषय = "कहानी में होने वाली छोटी-मोटी घटनाएं" (minor.', reveals: 'specific-error-students-believe-minor' },
                { text: 'पाठ का शीर्षक', outcome: 'Not quite — **Specific Error:** Students believe **गौण विषय = "कहानी में होने वाली छोटी-मोटी घटनाएं" (minor.', reveals: 'specific-error-students-believe-minor' }
            ] }] } },
        { type: 'case', nodeId: 'c6_hin_cbse_09_012', title: 'पाठ 9 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'Imagine you are reading a WhatsApp message from a friend: "I\'m drenched, my bag is soaked, and I missed the bus." You instantly *know* it rained heavily.',
            decisions: [{ prompt: 'पाठ में से एक वस्तुनिष्ठ प्रश्न और एक आशय-सूचक प्रश्न पहचानिए: 1. "नायक का नाम क्या है?" 2.', options: [
                { text: '**उत्तर:** प्रश्न 1 ("नायक का नाम क्या है?") वस्तुनिष्ठ है क्योंकि इसका उत्तर पाठ में', outcome: '**उत्तर:** प्रश्न 1 ("नायक का नाम क्या है?") वस्तुनिष्ठ है क्योंकि इसका उत्तर पाठ में स्पष्ट लिखा.' },
                { text: 'Inferential questions have no right answer', outcome: 'Not quite — Students believe **"Inferential questions have no right answer — it\'s just your opinion."** They.', reveals: 'inferential-questions-have-no-right' },
                { text: '**"Inferential questions have no right answer', outcome: 'Not quite — Students believe **"Inferential questions have no right answer — it\'s just your opinion."** They.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c6_hin_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) refers to the secondary ideas, issues, or motifs in.',
          hint: 'If stuck, review **c6_hin_cbse_09_005 (सहायक पात्र)** — list all minor characters and.',
          misconception: '**Specific Error:** Students believe **गौण विषय = "कहानी में होने वाली छोटी-मोटी घटनाएं" (minor plot events)**.',
          parts: [
                { id: 'a', prompt: 'एक कहानी में मुख्य विषय \'साहस\' है। लेखक ने दो गौण विषय बुने हैं: (अ) \'डर को स्वीकार करना\' और (ब) \'दोस्ती में विश्वास\'। विश्लेषण कीजिए कि ये दोनों गौण विषय.', answer: '**Correct Answer:** (अ) **\'डर को स्वीकार करना\'**',
                  options: ['**Correct Answer:** (अ) **\'डर को स्वीकार करना\'**', 'दोनों साहस को बढ़ाते हैं', 'कहानी में होने वाली छोटी-मोटी घटनाएं', '**गौण विषय = "कहानी में होने वाली छोटी-मोटी घटनाएं" (minor plot events)**'],
                  hint: 'If stuck, review **c6_hin_cbse_09_005 (सहायक पात्र)** — list all minor characters and their.',
                  misconception: '**Specific Error:** Students believe **गौण विषय = "कहानी में होने वाली छोटी-मोटी घटनाएं" (minor plot events)**.' }
          ],
            remediations: { 'specific-error-students-believe-minor': { steps: ['**Step-by-step Remediation:** 1.', '**Concrete → Abstract Drill:** Give the student 3 plot events from the text (e.g., "दादी को दवा दी," "नए लड़के को.', 'Ask: "इन तीनों में **क्या समान भाव** है?" → Guide to single word: **"देखभाल" / "जिम्मेदारी"**.', '**Label the Abstraction:** Write on board: **घटना ≠ विषय। विषय = घटनाओं का सार (essence)**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific Error:** Students believe **गौण विषय = "कहानी में होने वाली छोटी-मोटी घटनाएं" (minor plot events)**.',
          parts: [
                { id: 'a', prompt: 'कथन का मूल्यांकन कीजिए: *"गौण विषय मुख्य विषय से कम महत्वपूर्ण होते हैं, इसलिए परीक्षा में उनके प्रश्न नहीं आते।"* क्या आप सहमत हैं? तर्क दीजिए।', answer: '**Correct Answer:** **असहमत।** गौण विषय कम महत्वपूर्ण नहीं',
                  options: ['**Correct Answer:** **असहमत।** गौण विषय कम महत्वपूर्ण नहीं', 'पाठ में \'मित्रता\' विषय कैसे उभरा है?', 'लेखक ने प्रकृति के वर्णन से कौन-सा भाव व्यक्त किया है?', 'कहानी में होने वाली छोटी-मोटी घटनाएं'],
                  hint: 'If stuck, review **c6_hin_cbse_09_005 (सहायक पात्र)** — list all minor characters and their.',
                  misconception: '**Specific Error:** Students believe **गौण विषय = "कहानी में होने वाली छोटी-मोटी घटनाएं" (minor plot events)**.' }
          ],
            remediations: { 'specific-error-students-believe-minor': { steps: ['**Step-by-step Remediation:** 1.', '**Concrete → Abstract Drill:** Give the student 3 plot events from the text (e.g., "दादी को दवा दी," "नए लड़के को.', 'Ask: "इन तीनों में **क्या समान भाव** है?" → Guide to single word: **"देखभाल" / "जिम्मेदारी"**.', '**Label the Abstraction:** Write on board: **घटना ≠ विषय। विषय = घटनाओं का सार (essence)**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** शब्दों के माध्यम से पाठक के मन में इंद्रियों (दृश्य, श्रवण.',
          hint: 'यदि अटका हुआ लगे: **इंद्रिय शब्दों की सूची** बनवाएँ (देखने: लाल, चमकीला, टिमटिमाता.',
          misconception: 'छात्र अक्सर मानते हैं कि **रूपक केवल \'सुंदर लिखने\' के लिए होता है** और बिंब केवल **सजावट** हैं। वे यह नहीं समझते कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** शब्दों के माध्यम से पाठक के मन में इंद्रियों (दृश्य, श्रवण, घ्राण,',
                  options: ['**बिंब (Imagery)** शब्दों के माध्यम से पाठक के मन में इंद्रियों (दृश्य, श्रवण, घ्राण,', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका हुआ लगे: **इंद्रिय शब्दों की सूची** बनवाएँ (देखने: लाल, चमकीला, टिमटिमाता; सुनने: खनक.',
                  misconception: 'छात्र अक्सर मानते हैं कि **रूपक केवल \'सुंदर लिखने\' के लिए होता है** और बिंब केवल **सजावट** हैं। वे यह नहीं समझते कि रूपक **अमूर्त भावनाओं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र को एक जानी-पहचानी कविता (जैसे NCERT की "झाँसी की रानी" या "पुष्प की अभिलाषा") की 2-3 पंक्तियाँ.', '**दूसरा कदम:** उसी कविता से एक रूपक वाली पंक्ति लो (या सरल बनाओ: "वीरता उसकी रगों में **लहू** नहीं, **आग** थी")। पूछो.', 'लहू क्यों नहीं?" — चर्चा करके निकालो: आग = फैलना, जलाना, रोशनी देना, रुकना मुश्किल। 3.', '**तीसरा कदम:** छात्र से कहो: "अपने **गुस्से** को एक रूपक + दो बिंब देकर लिखो।" (उदाहरण: "गुस्सा मेरे पेट में **दहकता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली नज़र में विरोधी या.',
          hint: 'यदि अटका हुआ लगे, तो "बिंब और रूपक" (c6_hin_cbse_09_008) के कार्यपत्रक दोहराएँ जहाँ.',
          misconception: 'छात्र अक्सर **विरोधाभास** को **विरोधाभासी स्थिति (oxymoron जैसे "मधुर कड़वाहट")** या साधारण **विरोधाभासी तथ्य** मान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली नज़र में विरोधी या असंभव लगता है,',
                  options: ['**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली नज़र में विरोधी या असंभव लगता है,', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका हुआ लगे, तो "बिंब और रूपक" (c6_hin_cbse_09_008) के कार्यपत्रक दोहराएँ जहाँ कविता/गद्य अंश.',
                  misconception: 'छात्र अक्सर **विरोधाभास** को **विरोधाभासी स्थिति (oxymoron जैसे "मधुर कड़वाहट")** या साधारण **विरोधाभासी तथ्य** मान लेते हैं, और **प्रतीक**.' }
          ],
            remediations: { 'oxymoron': { steps: ['**चरण 1:** छात्र को एक सरल विरोधाभास दें ("मौन बोलता है") और पूछें: "क्या मौन सच में बोल सकता है?', 'तो फिर क्या बोल रहा है?" — इस तरह **शाब्दिक vs अंतर्निहित अर्थ** का भेद स्पष्ट करें। **चरण 2:** एक जानी-पहचानी वस्तु.', 'और क्या दर्शाती है?" — **वस्तु vs प्रतीकात्मक अर्थ** का संबंध बनवाएँ। **चरण 3:** पाठ से एक छोटा अंश दें जहाँ दोनों.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द का अर्थ है किसी पाठ में आए उन चुनिंदा महत्त्वपूर्ण शब्दों की.',
          hint: 'यदि अटके तो c6_hin_cbse_09_006 (मुख्य विषय और संदेश) दोहराएँ — विषय स्पष्ट होते ही मुख्य.',
          misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' वही हैं जो **कठिन, लंबे या कम प्रचलित** हों (जैसे \'जिजीविषा\', \'अनवरत\') — जबकि वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द का अर्थ है किसी पाठ में आए उन चुनिंदा महत्त्वपूर्ण शब्दों की सूची और',
                  options: ['पदावली: मुख्य शब्द का अर्थ है किसी पाठ में आए उन चुनिंदा महत्त्वपूर्ण शब्दों की सूची और', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटके तो c6_hin_cbse_09_006 (मुख्य विषय और संदेश) दोहराएँ — विषय स्पष्ट होते ही मुख्य शब्द स्वयं.',
                  misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' वही हैं जो **कठिन, लंबे या कम प्रचलित** हों (जैसे \'जिजीविषा\', \'अनवरत\') — जबकि वास्तव में \'माँ\', \'घर\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 9 के पहले दो अनुच्छेद पढ़वाएँ और पूछें: "यहाँ कौन-सा शब्द सबसे ज़्यादा बार आया या सबसे ज़्यादा.', 'फिर पूछें: "अगर यह शब्द हटा दें तो पाठ का अर्थ बदल जाएगा?" — यदि हाँ, तो वह मुख्य शब्द है। 3.', 'अब उस शब्द के 3 अर्थ बताने को कहें (शाब्दिक, भावात्मक, प्रतीकात्मक) — यदि एक ही अर्थ दे, तो शब्दकोश/प्रसंग सहायता से.', 'अंत में, उस शब्द से पाठ-संबंधी वाक्य बनाने को कहें — इससे \'रटने\' से \'समझने\' की ओर बदलाव आता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, मुहावरों.',
          hint: 'अगर फँस जाएँ तो "पदावली: मुख्य शब्द" (c6_hin_cbse_09_010) दोहराएँ — विशेषकर शब्दों के.',
          misconception: 'छात्र मानते हैं कि **"अच्छी भाषा = कठिन/सजावटी/अलंकृत शब्द"**। उदाहरण: वे सोचते हैं कि "वह प्रसन्न था" से बेहतर "उसके.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, मुहावरों, लोकोक्तियों और',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, मुहावरों, लोकोक्तियों और', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the study of the', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) के क्रम में व्यवस्थित', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का भौगोलिक स्थान, ऐतिहासिक समय, सामाजिक-सांस्कृतिक'],
                  hint: 'अगर फँस जाएँ तो "पदावली: मुख्य शब्द" (c6_hin_cbse_09_010) दोहराएँ — विशेषकर शब्दों के भाव-पक्ष और.',
                  misconception: 'छात्र मानते हैं कि **"अच्छी भाषा = कठिन/सजावटी/अलंकृत शब्द"**। उदाहरण: वे सोचते हैं कि "वह प्रसन्न था" से बेहतर "उसके मुखमंडल पर हर्ष की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो समान-अर्थ वाले वाक्य दो (एक सरल, एक अलंकृत) और पूछो: "कौन सा वाक्य किस स्थिति में बेहतर लगेगा?', 'उसे एक चित्र दिखाओ और कहो: "इसे तीन तरह से लिखो — (अ) समाचार शैली में, (ब) कहानी शैली में, (स) कविता शैली में।" 3.', 'प्रत्येक संस्करण पर चर्चा करो: शब्दों, वाक्यों, लय में क्या बदला?', 'अंत में निष्कर्ष निकालो: **"भाषा प्रसंग बदलती है, अर्थ नहीं।"**'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_09_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective questions) वे प्रश्न हैं जिनका उत्तर पाठ में.',
          hint: 'Review "Scanning for Keywords" technique: Read the question → Circle keywords → Scan text.',
          misconception: 'Students believe **"Inferential questions have no right answer — it\'s just your opinion."** They confuse *inference*.',
          parts: [
                { id: 'a', prompt: 'निम्नलिखित प्रश्नों को **वस्तुनिष्ठ (V)** या **आशय-सूचक (A)** के रूप में वर्गीकृत कीजिए और प्रत्येक के लिए पाठ से प्रमाण (एक पंक्ति/शब्द) लिखिए जो उत्तर देने.', answer: '**उत्तर:** क) **वस्तुनिष्ठ (V)**',
                  options: ['**उत्तर:** क) **वस्तुनिष्ठ (V)**', 'Inferential questions have no right answer', '**"Inferential questions have no right answer'],
                  hint: 'Review "Scanning for Keywords" technique: Read the question → Circle keywords → Scan text for those.',
                  misconception: 'Students believe **"Inferential questions have no right answer — it\'s just your opinion."** They confuse *inference* (logical conclusion.' },
                { id: 'b', prompt: 'दो छात्रों ने एक ही आशय-सूचक प्रश्न का उत्तर दिया: **प्रश्न:** "कहानी के अंत में नायक मुस्कुराया क्यों?" **छात्र 1:** "क्योंकि वह खुश था।" **छात्र 2:**.', answer: '**उत्तर:** छात्र 1 का उत्तर **व्यक्तिगत अनुमान (guess)** है',
                  options: ['**उत्तर:** छात्र 1 का उत्तर **व्यक्तिगत अनुमान (guess)** है', 'Inferential questions have no right answer', '**"Inferential questions have no right answer'],
                  hint: 'Review "Scanning for Keywords" technique: Read the question → Circle keywords → Scan text for those.',
                  misconception: 'Students believe **"Inferential questions have no right answer — it\'s just your opinion."** They confuse *inference* (logical conclusion.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['**Color-Code the Text:** Give the student a printed paragraph.', 'Ask them to highlight **FACTS** (names, dates, direct actions) in **YELLOW** and **CLUES** (emotional words, repeated.', '**Question Sorting Game:** Write 10 questions on cards.', 'Student sorts into two buckets: "Answer is IN the text" (Objective) vs "Answer comes from THINKING about the text".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
