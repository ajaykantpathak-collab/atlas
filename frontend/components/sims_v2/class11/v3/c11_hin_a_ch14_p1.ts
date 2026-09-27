import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch14_p1: SimDef = {
    id: 'v3_c11_hin_a_ch14_p1',
    title: 'बादल को घरिते देखा है · Part 1/3',
    subtitle: 'इस नोड में **केवल** सर्वेश्वर दयाल सक्सेना का संक्षिप्त जीवन-परिचय, उनकी काव्य-शैली की.',
    classLevel: 11, subject: 'hin_a', topic: 'बादल को घरिते देखा है · Part 1/3',
    chapters: ['c11_hin_a_ch14'],
    nodeIds: ['c11_hin_a_cbse_14_001', 'c11_hin_a_cbse_14_002', 'c11_hin_a_cbse_14_003', 'c11_hin_a_cbse_14_004', 'c11_hin_a_cbse_14_005', 'c11_hin_a_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना कीजिए आपको एक पुराना पत्र मिला है जिसमें कोई लिखता है: "आकाश काला हो गया, मन भारी है।" — आप तुरंत नहीं.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'बादल को घरिते देखा है — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का अर्थ है: कवि के **जीवन-वृत्त (जीवन-परिचय), साहित्यिक विचारधारा, लेखन-शैली की विशेषताएँ** तथा कविता रचना के **ऐतिहासिक-सामाजिक संदर्भ (काल, युग, आंदोलन)** का व्यवस्थित.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['बादल को घरिते देखा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through बादल को घरिते देखा है like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? बादल को घरिते देखा है · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बादल को घरिते देखा है · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_001', difficulty: 'standard',
          question: 'कवि परिचय और पृष्ठभूमि का अर्थ है: कवि के **जीवन-वृत्त (जीवन-परिचय), साहित्यिक.',
          hint: 'यदि अटका हुआ महसूस करें, तो **कक्षा 10 की \'हिंदी साहित्य का इतिहास\' इकाई में \'नई कविता\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'कवि परिचय\' का अर्थ केवल \'जन्म-तिथि, जन्म-स्थान, प्रमुख रचनाएँ, मृत्यु-तिथि\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का अर्थ है: कवि के **जीवन-वृत्त (जीवन-परिचय), साहित्यिक विचारधारा,',
                  options: ['कवि परिचय और पृष्ठभूमि का अर्थ है: कवि के **जीवन-वृत्त (जीवन-परिचय), साहित्यिक विचारधारा,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) is the systematic interpretation of each', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढाँचे से है जिसमें छंद-विधान,', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सारभूत अनुभूति है जिसे कवि संपूर्ण'],
                  hint: 'यदि अटका हुआ महसूस करें, तो **कक्षा 10 की \'हिंदी साहित्य का इतिहास\' इकाई में \'नई कविता\' आंदोलन के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'कवि परिचय\' का अर्थ केवल \'जन्म-तिथि, जन्म-स्थान, प्रमुख रचनाएँ, मृत्यु-तिथि\' रटना है**। वे यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**तुलनात्मक सारणी बनवाएँ:** छात्र से कहें — *"छायावाद, नई कविता, अकविता — तीनों की दो-दो प्रमुख विशेषताएँ एक सारणी में.', '**\'कवि-जीवन → काव्य-दृष्टि\' मैपिंग करवाएँ:** एक फ्लो-चार्ट बनाएँ: **जीवन-तथ्य (गरीबी) → विचारधारा (मार्क्सवाद) →.', '**प्रतीक-डिकोडिंग अभ्यास:** कक्षा में \'बादल\', \'धरती माँ\', \'कीचड़\' — इन तीन प्रतीकों को बोर्ड पर लिखें और पूछें: *"कवि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ (Stanza-wise meaning) is the systematic interpretation.',
          hint: 'यदि अटकें तो: नागार्जुन की अन्य कविताएँ (जैसे \'अकाल और उसके बाद\', \'तुमने कहा था\') पढ़ें.',
          misconception: 'Students treat पद्यांश-वार भावार्थ as a vocabulary exercise — listing word-meanings (शब्दार्थ) for each stanza and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ (Stanza-wise meaning) is the systematic interpretation of each',
                  options: ['पद्यांश-वार भावार्थ (Stanza-wise meaning) is the systematic interpretation of each', 'कवि परिचय और पृष्ठभूमि का अर्थ है: कवि के **जीवन-वृत्त (जीवन-परिचय), साहित्यिक विचारधारा,', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढाँचे से है जिसमें छंद-विधान,', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सारभूत अनुभूति है जिसे कवि संपूर्ण'],
                  hint: 'यदि अटकें तो: नागार्जुन की अन्य कविताएँ (जैसे \'अकाल और उसके बाद\', \'तुमने कहा था\') पढ़ें — वहाँ भी.',
                  misconception: 'Students treat पद्यांश-वार भावार्थ as a vocabulary exercise — listing word-meanings (शब्दार्थ) for each stanza and stopping there.' }
          ],
            remediations: { 'students-treat-as-a-vocabulary': { steps: ['Read it aloud 3 times — first for sound, second for action-verbs, third for feeling-tone.', 'Write only TWO sentences: (a) "What is happening physically?" (b) "What is happening inside the poet?" 3.', 'Draw an arrow between them: Physical → Internal.', 'Label the arrow with the *image* that connects them (e.g., cloud → thought).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढाँचे से है जिसमें.',
          hint: 'यदि अटके तो **\'छंद परिचय\' (कक्षा 9-10 पाठ्यपुस्तक)** के गुरु-लघु नियम व गण-तालिका.',
          misconception: 'विद्यार्थी समझते हैं कि **\'छंद पहचानना = मात्रा गिन लेना\'** है; वे मात्रा-गणना तो कर लेते हैं पर **गण-यति-लय का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढाँचे से है जिसमें छंद-विधान,',
                  options: ['काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढाँचे से है जिसमें छंद-विधान,', 'कवि परिचय और पृष्ठभूमि का अर्थ है: कवि के **जीवन-वृत्त (जीवन-परिचय), साहित्यिक विचारधारा,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) is the systematic interpretation of each', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सारभूत अनुभूति है जिसे कवि संपूर्ण'],
                  hint: 'यदि अटके तो **\'छंद परिचय\' (कक्षा 9-10 पाठ्यपुस्तक)** के गुरु-लघु नियम व गण-तालिका दोहराएँ; विशेषकर.',
                  misconception: 'विद्यार्थी समझते हैं कि **\'छंद पहचानना = मात्रा गिन लेना\'** है; वे मात्रा-गणना तो कर लेते हैं पर **गण-यति-लय का भाव-निर्माण में योगदान**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: विद्यार्थी से **एक ही पंक्ति को तीन लय में पढ़वाएँ** — (क) सपाट, (ख) यति पर रुककर, (ग) गण-क्रम पर बल देकर — और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सारभूत अनुभूति है जिसे.',
          hint: 'यदि अटका हुआ महसूस करें, तो **रस सूत्र के चार घटक** और **कविता के अंतिम दो पद्यांश.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः समझते हैं कि "केंद्रीय भाव = कविता का सारांश (Summary)" और "रस = कविता का विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सारभूत अनुभूति है जिसे कवि संपूर्ण',
                  options: ['केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश या सारभूत अनुभूति है जिसे कवि संपूर्ण', 'कवि परिचय और पृष्ठभूमि का अर्थ है: कवि के **जीवन-वृत्त (जीवन-परिचय), साहित्यिक विचारधारा,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) is the systematic interpretation of each', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढाँचे से है जिसमें छंद-विधान,'],
                  hint: 'यदि अटका हुआ महसूस करें, तो **रस सूत्र के चार घटक** और **कविता के अंतिम दो पद्यांश (वियोग/स्मृति.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः समझते हैं कि "केंद्रीय भाव = कविता का सारांश (Summary)" और "रस = कविता का विषय (Subject matter जैसे.' }
          ],
            remediations: { 'summary-subject-matter': { steps: ['**पुनर्परिभाषित करें:** छात्र से कहें — "कथ्य (क्या हुआ) और भाव (क्या महसूस हुआ) में अंतर लिखो।" दो कॉलम बनवाएँ: कॉलम 1.', '**रस-निष्पत्ति का चार्ट बनवाएँ:** एक टेबल बनाएँ — स्तंभ: स्थायी भाव, आलंबन, उद्दीपन, अनुभाव, संचारी। कविता की पंक्तियाँ.', '**तुलनात्मक अभ्यास:** दो छोटी कविताएँ दें — एक केवल वर्णनात्मक, दूसरी भावप्रधान। छात्र से पहचान करवाएँ कि कौन \'भाव\'.', '**बोर्ड पैटर्न अभ्यास:** विगत 5 वर्षों के CBSE प्रश्नों में \'केंद्रीय भाव\' और \'रस\' पूछने के पैटर्न दिखाएँ — उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_005', difficulty: 'standard',
          question: 'छंद काव्य की वह निश्चित मात्रिक/वर्णिक संरचना है जिसमें प्रत्येक चरण/पंक्ति की.',
          hint: 'अगर गुरु/लघु पहचान में अटके तो **\'मात्रा ज्ञान\' (कक्षा ९-१० व्याकरण)** के.',
          misconception: '**सबसे गहरी गलतफहमी:** "मत्त गजेन्द्र छंद में हर चरण में ठीक १६ वर्ण होने चाहिए।" छात्र **वर्ण (अक्षर) गिनते हैं**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद काव्य की वह निश्चित मात्रिक/वर्णिक संरचना है जिसमें प्रत्येक चरण/पंक्ति की मात्राओं',
                  options: ['छंद काव्य की वह निश्चित मात्रिक/वर्णिक संरचना है जिसमें प्रत्येक चरण/पंक्ति की मात्राओं', 'कवि परिचय और पृष्ठभूमि का अर्थ है: कवि के **जीवन-वृत्त (जीवन-परिचय), साहित्यिक विचारधारा,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) is the systematic interpretation of each', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढाँचे से है जिसमें छंद-विधान,'],
                  hint: 'अगर गुरु/लघु पहचान में अटके तो **\'मात्रा ज्ञान\' (कक्षा ९-१० व्याकरण)** के \'स्वर/व्यंजन/मात्रा\'.',
                  misconception: '**सबसे गहरी गलतफहमी:** "मत्त गजेन्द्र छंद में हर चरण में ठीक १६ वर्ण होने चाहिए।" छात्र **वर्ण (अक्षर) गिनते हैं**, मात्राएँ नहीं — क्योंकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **अपना नाम** मात्राओं में गिनवाएँ (उदाहरण: रा-हु-ल = २+१+१ = ४ मात्राएँ)। 2.', 'फिर कविता की **पहली पंक्ति** को ताली बजाकर पढ़वाएँ — हर ताली = १ मात्रा। 3.', 'अब **चरण विभाजन** करवाएँ: १६ तालियों पर रुकें, फिर अगले १६। 4.', 'अंत में **गण-चार्ट** बनवाएँ: कागज पर ४ खाने खींचें, प्रत्येक में गण का पैटर्न लिखें (सगण: ● ○ ●), फिर पंक्ति के अक्षर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_006', difficulty: 'standard',
          question: 'अलंकार काव्य-शोभा बढ़ाने वाले वे शब्द-विधान हैं जो अर्थ की व्यंजना.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_14_002 (पद्यांश-वार भावार्थ)** पर लौटें — हर अलंकार वाली.',
          misconception: 'छात्र **उपमा और रूपक** का भेद केवल \'जैसे/इव/वत्\' शब्द की उपस्थिति/अनुपस्थिति से करते हैं, जबकि वास्तविक भेद **आरोप.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार काव्य-शोभा बढ़ाने वाले वे शब्द-विधान हैं जो अर्थ की व्यंजना, चित्रात्मकता और',
                  options: ['अलंकार काव्य-शोभा बढ़ाने वाले वे शब्द-विधान हैं जो अर्थ की व्यंजना, चित्रात्मकता और', 'कवि परिचय और पृष्ठभूमि का अर्थ है: कवि के **जीवन-वृत्त (जीवन-परिचय), साहित्यिक विचारधारा,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) is the systematic interpretation of each', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढाँचे से है जिसमें छंद-विधान,'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_14_002 (पद्यांश-वार भावार्थ)** पर लौटें — हर अलंकार वाली पंक्ति का.',
                  misconception: 'छात्र **उपमा और रूपक** का भेद केवल \'जैसे/इव/वत्\' शब्द की उपस्थिति/अनुपस्थिति से करते हैं, जबकि वास्तविक भेद **आरोप (Superimposition) बनाम.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें — *"एक वाक्य में बादल को रूपक में बताओ, फिर उपमा में; दोनों के भाव-अंतर को बोलकर समझाओ।"* यदि.', '**चरण 2:** दो कॉलम बनवाएँ: **आरोप (रूपक)** vs **सादृश्य (उपमा)** — कविता की 3-3 पंक्तियाँ प्रत्येक में छँटवाएँ। 3.', '**चरण 3:** उत्प्रेक्षा/अतिशयोक्ति के लिए **\'कवि का इरादा\' (Poetic Intent)** टेस्ट दें: *"क्या कवि चाहता है कि पाठक इसे.', '**चरण 4:** वक्रोक्ति के लिए **\'वाच्य → लक्ष्य\' मैपिंग** करवाएँ — हर वक्रोक्ति पंक्ति के लिए तीर खींचवाएँ: वाच्यार्थ →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
