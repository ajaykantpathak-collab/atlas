import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch19_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch19_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch19_p1',
    title: 'पर्वत प्रदेश में पावस · Part 1/3',
    subtitle: 'यह नोड **केवल** कवि परिचय (जीवन-परिचय, काव्यगत विशेषताएँ, प्रमुख रचनाएँ) और कविता की.',
    classLevel: 10, subject: 'hin_sp', topic: 'पर्वत प्रदेश में पावस · Part 1/3',
    chapters: ['c10_hin_sp_ch19'],
    nodeIds: ['c10_hin_sp_cbse_19_001', 'c10_hin_sp_cbse_19_002', 'c10_hin_sp_cbse_19_003', 'c10_hin_sp_cbse_19_004', 'c10_hin_sp_cbse_19_005', 'c10_hin_sp_cbse_19_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कवि-परिचय से पंत के तीन पड़ाव उतारिए — कौसानी (जन्म व पहाड़ी बचपन), इलाहाबाद (अध्ययन व लेखन), काशी/कलकत्ता.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पर्वत प्रदेश में पावस — कवि परिचय और पृष्ठभूमि', text: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी — कुमाऊँ हिमालय), छायावाद आंदोलन के प्रवर्तकों में उनका स्थान, काव्य-भाषा के दो विशिष्ट गुण (चित्रात्मकता और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_19_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पर्वत प्रदेश में पावस'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_19_003', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['पहचानें कि लंबी पंक्तियाँ **बहु-शब्द विशेषण युग्म** (जैसे.', 'तुक-योजना देखें: AABBCC (युग्म तुक) — प्रत्येक युग्म एक.', 'एनजैम्बमेंट ढूँढें: पंक्ति 2-3 ("सुनाते हुए / पर्वत शिखरों.', 'द्वितीय पद की सभी 6 पंक्तियाँ लिखें और प्रत्येक के शब्द.', 'संश्लेषण: लंबी पंक्तियाँ + युग्म तुक + एनजैम्बमेंट.'], answer: 'द्वितीय पद की सभी 6 पंक्तियाँ लिखें और प्रत्येक के शब्द. पहचानें कि लंबी पंक्तियाँ **बहु-शब्द विशेषण युग्म** (जैसे. तुक-योजना देखें: AABBCC (युग्म तुक) — प्रत्येक युग्म एक. एनजैम्बमेंट ढूँढें: पंक्ति 2-3 ("सुनाते हुए / पर्वत शिखरों. संश्लेषण: लंबी पंक्तियाँ + युग्म तुक + एनजैम्बमेंट.' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_19_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पर्वत प्रदेश में पावस like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पर्वत प्रदेश में पावस · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पर्वत प्रदेश में पावस · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_001', difficulty: 'standard',
          question: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म.',
          hint: 'यदि अटके तो **कक्षा 9 की हिंदी पाठ्यपुस्तक (स्पर्श/संचयन) के \'छायावाद\' परिचय पृष्ठ** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'कवि परिचय\' का अर्थ केवल \'जन्म-मृत्यु तिथि, प्रमुख रचनाएँ, पुरस्कार\' रटना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी',
                  options: ['इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)', '\'पर्वत प्रदेश में पावस\' का पात्र-चित्रण'],
                  hint: 'यदि अटके तो **कक्षा 9 की हिंदी पाठ्यपुस्तक (स्पर्श/संचयन) के \'छायावाद\' परिचय पृष्ठ** और **व्याकरण.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'कवि परिचय\' का अर्थ केवल \'जन्म-मृत्यु तिथि, प्रमुख रचनाएँ, पुरस्कार\' रटना है**। वे यह नहीं समझते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**तालिका बनाएँ:** तीन कॉलम — स्थान (कौसानी/इलाहाबाद/काशी), प्रभाव (चित्रात्मकता/शास्त्रीयता/दर्शन), कविता में प्रमाण.', '**\'क्यों\' पूछने का अभ्यास:** हर तथ्य के बाद पूछें — "इससे कविता में क्या बदला?" (उदा.', 'जन्म तिथि 1900 → 20वीं सदी का छायावाद → प्रयोगवाद नहीं)। 3.', '**पिछले वर्ष के प्रश्न देखें:** CBSE 2023, 2022 के \'कवि परिचय\' आधारित प्रश्न निकालें और उनके उत्तरों का पैटर्न समझें। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_002', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' का कथानक — \'पर्वत प्रदेश में पावस\' — स्पर्श भाग-2 का.',
          hint: 'If stuck, review the Chhayavaadi concept of \'प्रकृति-चेतना\' (nature-consciousness) and.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि पद्यांश-वार भावार्थ का अर्थ है — प्रत्येक पद्यांश का **शब्दानुवाद (literal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' का कथानक',
                  options: ['\'पर्वत प्रदेश में पावस\' का कथानक', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)', '\'पर्वत प्रदेश में पावस\' का पात्र-चित्रण'],
                  hint: 'If stuck, review the Chhayavaadi concept of \'प्रकृति-चेतना\' (nature-consciousness) and Pant\'s.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि पद्यांश-वार भावार्थ का अर्थ है — प्रत्येक पद्यांश का **शब्दानुवाद (literal translation)** लिख.' }
          ],
            remediations: { 'literal-translation-3-1-emotion': { steps: ['**चरण 1 - अंतर स्पष्ट करें:** विद्यार्थी को दो नमूने दिखाएं — (क) केवल अनुवाद, (ख) पूर्ण भावार्थ.', '**चरण 2 - टेम्पलेट दें:** प्रत्येक पद्यांश के लिए 5-खंड टेम्पलेट पकड़ाएं: (i) पद्यांश संख्या/पंक्तियाँ, (ii) प्रसंग (एक.', '**चरण 3 - अभ्यास:** पहले पद्यांश को मिलकर भरें, दूसरे को विद्यार्थी स्वयं भरे, तीसरे की पीयर-रिव्यू (peer review).', '**चरण 4 - बोर्ड उत्तर दिखाएं:** CBSE टॉपर उत्तर पुस्तिका (model answer) का पद्यांश-वार भावार्थ खंड दिखाकर अंक-वितरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_003', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और.',
          hint: 'If stuck, review c10_hin_sp_cbse_19_002 (पद्यांश-वार भावार्थ) — specifically the.',
          misconception: '**विशिष्ट भ्रांति:** "संरचना का अर्थ है पदों की गिनती और तुक पहचानना — बस।" **वास्तविकता:** CBSE बोर्ड परीक्षा में 3-5.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)',
                  options: ['\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पात्र-चित्रण'],
                  hint: 'If stuck, review c10_hin_sp_cbse_19_002 (पद्यांश-वार भावार्थ) — specifically the stanza-wise.',
                  misconception: '**विशिष्ट भ्रांति:** "संरचना का अर्थ है पदों की गिनती और तुक पहचानना — बस।" **वास्तविकता:** CBSE बोर्ड परीक्षा में 3-5 अंक के प्रश्न पूछते.' }
          ],
            remediations: { 'cbse-3-5-cause-effect': { steps: ['**पुनः पढ़ाएँ — श्रवण अभ्यास:** विद्यार्थी से कहें: "कविता का पहला पद आँख बंद करके सुनो। मुझे बताओ — तुम्हारी साँस कहाँ.', 'तुम्हारी आवाज़ कहाँ तेज/धीमी हुई?" — इसे बोर्ड पर चिह्नित करें। 2.', '**तुलना कराएँ:** उसी भाव को गद्य में लिखवाएँ, फिर पद्य में — पूछें: "क्या बदला?', '**माइक्रो-एनोटेशन दें:** एक पंक्ति दें (जैसे: "बादल घिर आए / झमाझम बरसे") — पूछें: "यदि इसे एक पंक्ति में लिख दें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_004', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और.',
          hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_19_002 (पद्यांश-वार भावार्थ) पर लौटें — प्रत्येक.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'केंद्रीय भाव\' = \'कविता का सारांश\' और \'रस\' = \'कविता का मूड (mood)\'। **गलत तर्क का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' का पात्र-चित्रण',
                  options: ['\'पर्वत प्रदेश में पावस\' का पात्र-चित्रण', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_19_002 (पद्यांश-वार भावार्थ) पर लौटें — प्रत्येक पद्य का.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'केंद्रीय भाव\' = \'कविता का सारांश\' और \'रस\' = \'कविता का मूड (mood)\'। **गलत तर्क का उदाहरण:** छात्र.' }
          ],
            remediations: { 'mood': { steps: ['**अंतर स्पष्ट करो:** छात्र से कहो — "कविता की 3 पंक्तियाँ पढ़ो और बताओ: (क) क्या हुआ?', '(ख) कवि क्या महसूस कराना चाहता है?" — दोनों उत्तर अलग होंगे, यही अंतर है। 2.', '**रस-निर्माण का अभ्यास:** एक प्रसंग लो (जैसे "धुले शिखर पर नहाया सूरज") — छात्र से पूछो: विभाव क्या है?', '(धुला पहाड़, सूरज), अनुभाव क्या है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_005', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि मात्रा-गण में अटकें, तो कक्षा 9 के \'छंद परिचय\' पाठ (मात्रा-गण-यति) को दोहराएँ.',
          misconception: 'छात्र प्रायः मानते हैं कि **छंद पहचानना = मात्रा गिनकर गण लिख देना** पर्याप्त है। वे भूल जाते हैं कि बोर्ड परीक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' के सहायक पात्र',
                  options: ['\'पर्वत प्रदेश में पावस\' के सहायक पात्र', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मात्रा-गण में अटकें, तो कक्षा 9 के \'छंद परिचय\' पाठ (मात्रा-गण-यति) को दोहराएँ; विशेषकर संयुक्त.',
                  misconception: 'छात्र प्रायः मानते हैं कि **छंद पहचानना = मात्रा गिनकर गण लिख देना** पर्याप्त है। वे भूल जाते हैं कि बोर्ड परीक्षा पूछती है: "छंद और लय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मात्रा-गण अभ्यास:** प्रतिदिन कविता के 2-2 चरण लेकर मात्रा गिनो, गण लिखो, यति चिह्नित करो — 5 दिन तक। 2.', '**लय-मानचित्रण:** कविता को जोर से पढ़ते हुए रिकॉर्ड करो; फिर सुनकर चिह्नित करो — कहाँ गति तेज, कहाँ मंद, कहाँ रुकावट?', '**प्रभाव-लेखन:** प्रत्येक पद्यांश के लिए एक वाक्य लिखो: "यहाँ [गण/यति/अनुप्रास/विराम] ने [विशिष्ट दृश्य/भाव] को लय में.', '**बोर्ड-उत्तर ढांचा:** उत्तर लिखो: (क) छंद पहचान + मात्रा-गण-यति, (ख) लय-विधान (अनुप्रास/यमक/विराम), (ग) भाव-सौंदर्य पर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_006', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' का मुख्य विषय — \'पर्वत प्रदेश में पावस\' का केंद्रीय भाव.',
          hint: 'यदि अटके तो c10_hin_sp_cbse_19_002 (भावार्थ) और c10_hin_sp_cbse_19_005 (छंद) दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **उत्प्रेक्षा** और **उपमा** को एक ही समझ लेते हैं क्योंकि दोनों में \'जैसे/मानो\' आता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' का मुख्य विषय',
                  options: ['\'पर्वत प्रदेश में पावस\' का मुख्य विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_19_002 (भावार्थ) और c10_hin_sp_cbse_19_005 (छंद) दोबारा पढ़ें — अलंकार.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **उत्प्रेक्षा** और **उपमा** को एक ही समझ लेते हैं क्योंकि दोनों में \'जैसे/मानो\' आता है। वे नहीं समझते कि.' }
          ],
            remediations: { 'a': { steps: ['छात्र को दो वाक्य दें: "बादल धुएँ जैसे लगे" (उपमा) और "बादल मानो धुआँ बनकर उड़े" (उत्प्रेक्षा) — पूछें: "पहले में बादल.', 'कविता की 3-4 पंक्तियाँ देकर कहें: "हर पंक्ति में \'जैसे/मानो\' ढूँढ़ो और तय करो — तुलना है या कल्पनात्‍मक आरोप?" 3.', 'एक तालिका बनवाएँ: स्तंभ — पंक्ति, शब्द (जैसे/मानो), अलंकार, कारण। 5 उदाहरणों के बाद भेद स्वतः स्पष्ट हो जाएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
