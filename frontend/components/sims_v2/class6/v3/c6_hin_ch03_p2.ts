import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch03_p2: SimDef = {
    id: 'v3_c6_hin_ch03_p2',
    title: 'पाठ 3 · Part 2/3',
    subtitle: 'यह नोड केवल **गौण विषयों की पहचान, उनके साक्ष्य, और मुख्य विषय से उनके संबंध** पर.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 3 · Part 2/3',
    chapters: ['c6_hin_ch03'],
    nodeIds: ['c6_hin_cbse_03_007', 'c6_hin_cbse_03_008', 'c6_hin_cbse_03_009', 'c6_hin_cbse_03_010', 'c6_hin_cbse_03_011', 'c6_hin_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'क्या आपने कभी ध्यान दिया है कि जब दादी कोई कहानी सुनाती हैं, तो मुख्य कहानी के साथ-साथ वे छोटी-छोटी बातें भी.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — गौण विषय', text: 'गौण विषय (Sub-theme/Minor theme) वे सहायक विषय होते हैं जो पाठ के मुख्य विषय का समर्थन करते हैं, उसे गहराई देते हैं, और कथानक को अधिक यथार्थवादी तथा बहुआयामी बनाते हैं; ये मुख्य कथानक के समानांतर.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — गौण', 'पाठ 3 — साहित्यिक', 'पाठ 3 — पदावली', 'पाठ 3 — व्याकरण', 'पाठ 3 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 2/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है — लेखक द्वारा रचना में **शब्द-चयन (शब्दावली).', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न (Objective Questions)** have a single, fact-based answer directly.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme/Minor theme) वे सहायक विषय होते हैं जो पाठ के मुख्य विषय का.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c6_hin_cbse_03_006 (मुख्य विषय और संदेश)** पर वापस जाएँ और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "गौण विषय = पृष्ठभूमि विवरण (setting details) जैसे मौसम, घर का वर्णन, कपड़े।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme/Minor theme) वे सहायक विषय होते हैं जो पाठ के मुख्य विषय का समर्थन',
                  options: ['गौण विषय (Sub-theme/Minor theme) वे सहायक विषय होते हैं जो पाठ के मुख्य विषय का समर्थन', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c6_hin_cbse_03_006 (मुख्य विषय और संदेश)** पर वापस जाएँ और मुख्य विषय.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "गौण विषय = पृष्ठभूमि विवरण (setting details) जैसे मौसम, घर का वर्णन, कपड़े।" **गलत तर्क:** वे पाठ.' }
          ],
            remediations: { 'setting-details': { steps: ['**चरण 1:** छात्र से कहें: "पाठ से कोई **एक वाक्य** चुनो जो केवल वर्णन हो (जैसे: \'कमरे में अंधेरा था\')। फिर एक वाक्य.', '**चरण 2:** पूछें: "दूसरे वाक्य में ऐसा क्या है जो पहले में नहीं?', 'कौन-सा **विचार** या **मुद्दा** उभर रहा है?" 3.', '**चरण 3:** समझाएँ: "गौण विषय **विचार/मुद्दा** है, वर्णन नहीं। वर्णन **दिखाता** है, गौण विषय **कहता** है।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की.',
          hint: 'अगर अटका हुआ लगे तो **उपमा (Simile) के 5-6 उदाहरण** लिखकर उनके तुलनात्मक शब्द घेरने का.',
          misconception: '**सबसे आम गलती:** छात्र **हर तुलना को रूपक** मान लेते हैं, भले ही उसमें \'जैसे\', \'सा\', \'तुल्य\', \'प्रायः\' आदि शब्द हों।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की पाँचों',
                  options: ['**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की पाँचों', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक'],
                  hint: 'अगर अटका हुआ लगे तो **उपमा (Simile) के 5-6 उदाहरण** लिखकर उनके तुलनात्मक शब्द घेरने का अभ्यास.',
                  misconception: '**सबसे आम गलती:** छात्र **हर तुलना को रूपक** मान लेते हैं, भले ही उसमें \'जैसे\', \'सा\', \'तुल्य\', \'प्रायः\' आदि शब्द हों। वे नहीं समझते कि रूपक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — दृश्य सहायता:** दो कार्ड बनाओ: कार्ड A पर लिखो "X, Y **जैसा** है" (उपमा), कार्ड B पर "X **है** Y" (रूपक)।.', '**चरण 2 — रंग-कोडिंग:** पाठ में हर \'जैसे/सा/तुल्य\' को लाल पेंसिल से घेरो; जहाँ ये शब्द **नहीं** हैं लेकिन दो भिन्न.', '**चरण 3 — रूपांतरण अभ्यास:** तीन उपमा वाक्य दो और छात्र से कहो: "इनसे \'जैसे/सा\' हटाकर रूपक बनाओ।" उदा.', '"आसमान नीला है जैसे नीलम" → "आसमान नीलम है"। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली नज़र में स्वयं का खंडन करता हुआ.',
          hint: 'यदि अटका हुआ महसूस हो, तो नोड 008 (बिंब और रूपक) के "तुलना और अर्थ-विस्तार" वाले भाग को.',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** और **युग्म शब्द/विरोधाभासी पद (Oxymoron)** को एक ही समझ लेते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली नज़र में स्वयं का खंडन करता हुआ लगता है,',
                  options: ['**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली नज़र में स्वयं का खंडन करता हुआ लगता है,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक'],
                  hint: 'यदि अटका हुआ महसूस हो, तो नोड 008 (बिंब और रूपक) के "तुलना और अर्थ-विस्तार" वाले भाग को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** और **युग्म शब्द/विरोधाभासी पद (Oxymoron)** को एक ही समझ लेते हैं। उदाहरण: "मधुर कड़वाहट".' }
          ],
            remediations: { 'paradox-oxymoron-oxymoron': { steps: ['**स्पष्ट विभाजन दिखाएँ:** बोर्ड पर दो कॉलम बनाएँ — बाएँ "ऑक्सीमोरॉन (दो शब्द)" — उदा.', '"जीवित लाश", "खामोश चीख"। दाएँ "विरोधाभास (पूरा वाक्य)" — उदा.', '"वह जीता ही इसलिए कि मरना सीख गया"। 2.', '**परीक्षण कराएँ:** छात्र को 5 वाक्य दें, छाँटने को कहें — कौन ऑक्सीमोरॉन, कौन विरोधाभास। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द (Key Vocabulary) refers to the curated list of significant.',
          hint: 'If stuck, review \'पात्र-चित्रण: नायक\' (c6_hin_cbse_03_004) and \'मुख्य विषय और संदेश\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य शब्द\' वे होते हैं जो पाठ में **सबसे ज्यादा बार आए हों** (High Frequency).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द (Key Vocabulary) refers to the curated list of significant words in a',
                  options: ['पदावली: मुख्य शब्द (Key Vocabulary) refers to the curated list of significant words in a', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक'],
                  hint: 'If stuck, review \'पात्र-चित्रण: नायक\' (c6_hin_cbse_03_004) and \'मुख्य विषय और संदेश\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य शब्द\' वे होते हैं जो पाठ में **सबसे ज्यादा बार आए हों** (High Frequency) या जो **सबसे.' }
          ],
            remediations: { 'high-frequency-complexity-3-50': { steps: ['**दृश्य अभ्यास (Visual Drill):** पाठ का एक पृष्ठ दें। कहें: "लाल पेन से हर \'राम/सीता/लक्ष्मण\' को काट दो। अब नीले पेन से.', 'नीले वाले ही मुख्य शब्द हैं।" 2.', '**\'क्यों?\' का खेल:** छात्र द्वारा चुने गए हर शब्द पर पूछें: "यह शब्द हटा दो तो पाठ का संदेश बदल जाएगा?', 'हाँ → मुख्य शब्द। नहीं → साधारण शब्द।" इसे 5 शब्दों पर दोहराएँ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है — लेखक द्वारा रचना में **शब्द-चयन (शब्दावली).',
          hint: 'यदि अटके तो **पदावली: मुख्य शब्द (c6_hin_cbse_03_010)** के शब्द-अर्थ और वाक्य-प्रयोग.',
          misconception: 'छात्र समझते हैं कि **"भाषा-प्रयोग = कठिन शब्दों के अर्थ लिखना"** या **"व्याकरण के नियम (संज्ञा, क्रिया) पहचानना"**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक'],
                  hint: 'यदि अटके तो **पदावली: मुख्य शब्द (c6_hin_cbse_03_010)** के शब्द-अर्थ और वाक्य-प्रयोग दोहराएँ।',
                  misconception: 'छात्र समझते हैं कि **"भाषा-प्रयोग = कठिन शब्दों के अर्थ लिखना"** या **"व्याकरण के नियम (संज्ञा, क्रिया) पहचानना"**। वास्तव में, भाषा-प्रयोग.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक ही वाक्य के **तीन रूप** दो: (अ) साधारण, (ब) बिंबात्मक, (स) मुहावरेदार। 2.', 'पूछो: "पढ़कर तुम्हें क्या **दिखा/महसूस हुआ**?" — उत्तर में आए शब्द (दौड़ना, उड़ना, हवा होना) बोर्ड पर लिखो। 3.', 'अब समझाओ: "लेखक ने शब्द नहीं, **अनुभव** चुना है — यही भाषा-प्रयोग है।" 4.', 'अभ्यास: पाठ से 2-3 वाक्य उठवाओ और उनको **बदलकर** तीनों शैलियों में लिखवाओ — तुलना करवाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न (Objective Questions)** have a single, fact-based answer.',
          hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_03_002 (कथानक)** और **c6_hin_cbse_03_004.',
          misconception: '**"आशय-सूचक प्रश्न का उत्तर पाठ में कहीं \'छिपा\' होता है, बस ढूँढ़ना पड़ता है।"** छात्र यह मान लेते हैं कि इन्फरेंस.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न (Objective Questions)** have a single, fact-based answer directly',
                  options: ['**वस्तुनिष्ठ प्रश्न (Objective Questions)** have a single, fact-based answer directly', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_03_002 (कथानक)** और **c6_hin_cbse_03_004 (पात्र-चित्रण)**.',
                  misconception: '**"आशय-सूचक प्रश्न का उत्तर पाठ में कहीं \'छिपा\' होता है, बस ढूँढ़ना पड़ता है।"** छात्र यह मान लेते हैं कि इन्फरेंस (अनुमान) भी एक तथ्य ही.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**साक्ष्य-तर्क-निष्कर्ष कार्ड खेल:** 3 रंग के कार्ड बनाएँ — पीला (साक्ष्य: पाठ की पंक्ति), नीला (तर्क: सामान्य.', '**"मुझे मत बताओ, मुझे दिखाओ":** शिक्षक एक गुण (जैसे: लालची) बोले; छात्र पाठ से 2 ऐसी क्रियाएँ ढूँढ़े जो लालच **दिखाती**.', '**सोच-जोर (Think-Aloud) मॉडलिंग:** शिक्षक स्वयं एक आशय-सूचक प्रश्न हल करे, बोलते हुए: "मैं पाठ में यह देखता हूँ...', 'मुझे याद है कि ऐसा तब होता है जब...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
