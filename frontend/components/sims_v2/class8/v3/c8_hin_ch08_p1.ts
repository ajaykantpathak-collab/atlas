import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch08_p1: SimDef = {
    id: 'v3_c8_hin_ch08_p1',
    title: 'पाठ 8 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 8 की पृष्ठभूमि (काल, परिवेश, प्रेरणा) और रचनाकार के जीवन-परिचय, साहित्यिक.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 8 · Part 1/3',
    chapters: ['c8_hin_ch08'],
    nodeIds: ['c8_hin_cbse_08_001', 'c8_hin_cbse_08_002', 'c8_hin_cbse_08_003', 'c8_hin_cbse_08_004', 'c8_hin_cbse_08_005', 'c8_hin_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'मान लो तुमने दादी से कोई पुरानी कहानी सुनी और फिर वही कहानी किसी किताब में पढ़ी — क्या फर्क महसूस हुआ?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के ऐतिहासिक-सामाजिक-सांस्कृतिक संदर्भ (पृष्ठभूमि) तथा लेखक के जीवन, विचारधारा, लेखन-शैली और प्रमुख कृतियों (रचनाकार परिचय) का व्यवस्थित.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — पृष्ठभूमि', 'पाठ 8 — कथानक', 'पाठ 8 — पाठ्य-परिवेश', 'पाठ 8 — पात्र-चित्रण', 'पाठ 8 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 1/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन.', answer: '8 -', options: ['8 -', '8 -'] },
            { id: 's2', label: '8 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक.', answer: '8 -', options: ['8 -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 8 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के.',
          hint: 'अगर फँस जाएँ तो कक्षा 7 के पाठ 8 (c7_hin_cbse_08_001) का \'पृष्ठभूमि और रचनाकार परिचय\'.',
          misconception: 'छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' केवल परीक्षा में आने वाले तथ्यों (जन्म-तिथि, कृतियों की सूची, आंदोलन का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के',
                  options: ['पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'अगर फँस जाएँ तो कक्षा 7 के पाठ 8 (c7_hin_cbse_08_001) का \'पृष्ठभूमि और रचनाकार परिचय\' दोबारा पढ़ें.',
                  misconception: 'छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' केवल परीक्षा में आने वाले तथ्यों (जन्म-तिथि, कृतियों की सूची, आंदोलन का नाम) का संग्रह है।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहो — "रचनाकार परिचय में लिखी *एक* जीवन-घटना चुनो (जैसे: बचपन में नदी पार करके स्कूल जाना)। चरण 2: पाठ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_002', difficulty: 'standard',
          question: 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा ७ के \'कथानक और आख्यान-संरचना\' (c7_hin_cbse_08_002) के.',
          misconception: 'छात्र प्रायः मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं क्योंकि दोनों \'क्रम\' से जुड़े हैं। वास्तव में कथानक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन',
                  options: ['कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा ७ के \'कथानक और आख्यान-संरचना\' (c7_hin_cbse_08_002) के फ्लैशबैक और.',
                  misconception: 'छात्र प्रायः मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं क्योंकि दोनों \'क्रम\' से जुड़े हैं। वास्तव में कथानक = घटनाओं का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से एक परिचित फ़िल्म (जैसे \'बाहुबली\' या \'दृश्यम\') का कथानक ५ वाक्यों में लिखवाएँ — फिर पूछें: "क्या फ़िल्म इसी.', 'एक ही घटना (जैसे: \'परीक्षा परिणाम\') को दो तरह से सुनाएँ: (अ) रैखिक — तैयारी → परीक्षा → प्रतीक्षा → परिणाम; (ब) अरैखिक.', 'कक्षा में \'कथानक मानचित्र\' (plot map) बनवाएँ: X-अक्ष = कहानी का समय, Y-अक्ष = तनाव स्तर — चरमोत्कर्ष सबसे ऊँचा बिंदु.', 'गृहकार्य: किसी कहानी में एक फ्लैशबैक खोजकर लाएँ और समझाएँ कि यदि वह फ्लैशबैक न होता तो पाठक का अनुभव कैसे बदलता।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 7 के "पाठ्य-परिवेश और वातावरण" (c7_hin_cbse_08_003) के.',
          misconception: 'छात्र अक्सर मानते हैं कि "परिवेश वर्णन" का अर्थ केवल स्थान का सजावटी चित्रण है (जैसे: "सुंदर बगीचा था, फूल खिले थे").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक',
                  options: ['पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें नायक/प्रमुख पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 7 के "पाठ्य-परिवेश और वातावरण" (c7_hin_cbse_08_003) के कार्यपत्रक.',
                  misconception: 'छात्र अक्सर मानते हैं कि "परिवेश वर्णन" का अर्थ केवल स्थान का सजावटी चित्रण है (जैसे: "सुंदर बगीचा था, फूल खिले थे") — वे नहीं समझते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "आँखें बंद करो और याद करो: जब तुम परीक्षा हॉल में घुसे थे, कमरे की गंध, कुर्सियों की कतार, घड़ी.', 'यही परिवेश का कार्य है।" चरण 2: पाठ्यपुस्तक के किसी अंश को साथ पढ़ें; हर वाक्य पर रुकें और पूछें: "यह वाक्य स्थान बता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें नायक/प्रमुख.',
          hint: 'यदि अटके तो **कक्षा 7 के पात्र-चित्रण नोट्स (c7_hin_cbse_08_004)** दोहराएँ — विशेषकर.',
          misconception: 'छात्र अक्सर समझते हैं कि पात्र-चित्रण = **गुणों की सूची (list of adjectives)** बनाना है: "नायक बहादुर, ईमानदार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें नायक/प्रमुख पात्र के',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें नायक/प्रमुख पात्र के', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक'],
                  hint: 'यदि अटके तो **कक्षा 7 के पात्र-चित्रण नोट्स (c7_hin_cbse_08_004)** दोहराएँ — विशेषकर \'साक्ष्य.',
                  misconception: 'छात्र अक्सर समझते हैं कि पात्र-चित्रण = **गुणों की सूची (list of adjectives)** बनाना है: "नायक बहादुर, ईमानदार, संघर्षशील था।" वे **साक्ष्य.' }
          ],
            remediations: { 'list-of-adjectives': { steps: ['**साक्ष्य-आधारित अभ्यास (Evidence-based drill):** छात्र को पाठ से 5 संवाद/कार्य छाँटने को कहें और प्रत्येक के आगे.', '**टाइमलाइन बनवाएँ:** कहानी की 3 प्रमुख घटनाओं की टाइमलाइन खींचें — प्रत्येक पर नायक की **प्रतिक्रिया (reaction)** और.', '**तुलनात्मक वाक्य लिखवाएँ:** "आरंभ में नायक ______ करता/कहता था, लेकिन अंत में वह ______ करता/कहता है, क्योंकि ______।".', '**मॉडल उत्तर दिखाएँ:** एक कमजोर उत्तर (केवल विशेषण) और एक सशक्त उत्तर (साक्ष्य+विश्लेषण) साथ रखकर अंतर स्पष्ट करें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथा को आगे बढ़ाने.',
          hint: 'अगर अटके तो c8_hin_cbse_08_004 (नायक/प्रमुख पात्र का चित्रण) दोबारा पढ़ें — विशेष रूप से.',
          misconception: 'छात्र समझते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\'। वे \'स्क्रीन टाइम\' (उपस्थिति की मात्रा) को \'कथात्मक महत्व\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथा को आगे बढ़ाने, उसके चरित्र',
                  options: ['सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथा को आगे बढ़ाने, उसके चरित्र', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक'],
                  hint: 'अगर अटके तो c8_hin_cbse_08_004 (नायक/प्रमुख पात्र का चित्रण) दोबारा पढ़ें — विशेष रूप से.',
                  misconception: 'छात्र समझते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\'। वे \'स्क्रीन टाइम\' (उपस्थिति की मात्रा) को \'कथात्मक महत्व\' (narrative significance).' }
          ],
            remediations: { 'narrative-significance': { steps: ['छात्र को एक परिचित कहानी (जैसे \'पंचतंत्र\' की कोई कथा) दें और कहें: "नायक को हटाकर कहानी फिर से लिखो — क्या बचता है?" जो.', 'एक टेबल बनाएँ: कॉलम 1 — पात्र का नाम, कॉलम 2 — उसके बिना कौन-सी घटना न होती, कॉलम 3 — नायक कौन-सा गुण न दिखा पाता। 3.', 'छात्र से पूछें: "कौन-सा सहायक पात्र हटाने से कहानी सबसे ज्यादा बदलती है?" — इससे \'महत्व\' की मात्रात्मक नहीं, गुणात्मक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_08_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जो पूरी रचना में.',
          hint: 'अगर अटके तो c8_hin_cbse_08_004 (नायक चित्रण) और c8_hin_cbse_08_002 (कथानक संरचना) दोबारा.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'मुख्य विषय\' एक शब्द में होता है (जैसे \'देशभक्ति\', \'ईमानदारी\', \'गरीबी\') और \'संदेश\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जो पूरी रचना में व्याप्त रहता',
                  options: ['मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जो पूरी रचना में व्याप्त रहता', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचना के', 'कथानक कहानी की घटनाओं का तार्किक क्रम है (कारण-कार्य संबंध सहित), जबकि आख्यान-संरचना उन', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समय अवधि और सामाजिक'],
                  hint: 'अगर अटके तो c8_hin_cbse_08_004 (नायक चित्रण) और c8_hin_cbse_08_002 (कथानक संरचना) दोबारा देखें.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'मुख्य विषय\' एक शब्द में होता है (जैसे \'देशभक्ति\', \'ईमानदारी\', \'गरीबी\') और \'संदेश\' हमेशा एक नैतिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहो — "पाठ की तीन सबसे बड़ी घटनाएँ लिखो। अब प्रत्येक के आगे लिखो: \'इससे लेखक क्या कहना चाहता.', '**दूसरा कदम:** विषय को एक शब्द से वाक्य में बदलने का अभ्यास कराओ — "गरीबी" → "गरीबी इंसान को झुकाती नहीं, लड़ना सिखाती.', '**तीसरा कदम:** दो कहानियाँ दो (एक ही विषय, अलग अंत) और पूछो — "संदेश कैसे बदला?" इससे विषय-संदेश का अंतर स्पष्ट होगा। 4.', '**चौथा कदम:** अगले पाठ में पढ़ते समय \'विषय-डायरी\' बनवाओ: प्रत्येक पैराग्राफ के बाद एक पंक्ति — "यह पैराग्राफ विषय _____.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
