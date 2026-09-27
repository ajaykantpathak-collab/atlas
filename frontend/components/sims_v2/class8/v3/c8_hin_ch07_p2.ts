import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch07_p2: SimDef = {
    id: 'v3_c8_hin_ch07_p2',
    title: 'पाठ 7 · Part 2/3',
    subtitle: 'This node covers identification, evidence-based analysis, and thematic linkage.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 7 · Part 2/3',
    chapters: ['c8_hin_ch07'],
    nodeIds: ['c8_hin_cbse_07_007', 'c8_hin_cbse_07_008', 'c8_hin_cbse_07_009', 'c8_hin_cbse_07_010', 'c8_hin_cbse_07_011', 'c8_hin_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'Think of your favourite movie — say, *Taare Zameen Par*. The main theme is "every child is special." But what.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — गौण विषय', text: 'गौण विषय (Sub-theme) is a secondary idea or motif that runs parallel to the main theme, enriches the narrative, and deepens the central message by exploring related aspects through characters.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — गौण', 'पाठ 7 — साहित्यिक', 'पाठ 7 — पदावली', 'पाठ 7 — व्याकरण', 'पाठ 7 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_07_012', title: 'पाठ 7 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'Think of the last time you misunderstood a WhatsApp message because you read only the words, not the tone — that\'s exactly what happens when you treat.',
            decisions: [{ prompt: 'पाठ 7 में से एक वस्तुनिष्ठ प्रश्न लिखें जिसका उत्तर पाठ की किसी एक पंक्ति में सीधे मिल जाए।', options: [
                { text: 'उदाहरण: "पाठ का नायक कौन है?" या "घटना किस दिन घटी?"', outcome: 'उदाहरण: "पाठ का नायक कौन है?" या "घटना किस दिन घटी?" — ऐसा कोई भी प्रश्न जिसका उत्तर पाठ में स्पष्ट.' },
                { text: 'correct', outcome: 'Not quite — Students believe **आशय-सूचक questions have a single "correct" answer hidden in the textbook**,.', reveals: 'questions-have-a-single-correct' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hin_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 7 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) is a secondary idea or motif that runs parallel to the.',
          hint: 'यदि अटके: नोड 006 (मुख्य विषय) पर लौटें — मुख्य विषय को एक वाक्य में लिखें, फिर पाठ के 5.',
          misconception: 'छात्र अक्सर **\'विषय\' (topic)** और **\'गौण विषय\' (sub-theme)** में भ्रम करते हैं। उदाहरण: पाठ 7 में "परीक्षा" एक **विषय**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) is a secondary idea or motif that runs parallel to the main theme,',
                  options: ['गौण विषय (Sub-theme) is a secondary idea or motif that runs parallel to the main theme,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है', '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect in a story', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**'],
                  hint: 'यदि अटके: नोड 006 (मुख्य विषय) पर लौटें — मुख्य विषय को एक वाक्य में लिखें, फिर पाठ के 5 प्रसंग.',
                  misconception: 'छात्र अक्सर **\'विषय\' (topic)** और **\'गौण विषय\' (sub-theme)** में भ्रम करते हैं। उदाहरण: पाठ 7 में "परीक्षा" एक **विषय** है — लेकिन "परीक्षा.' }
          ],
            remediations: { 'topic-sub-theme-7': { steps: ['छात्र से कहें: "पाठ 7 के 5 मुख्य प्रसंग लिखो। अब प्रत्येक के आगे लिखो: *इससे कौन-सा भाव/विचार उभरता है?*" 2.', 'फिर पूछें: "कौन-सा विचार **3 या अधिक प्रसंगों** में आया?" → वही गौण विषय है। 3.', 'अब जाँचें: "क्या यह विचार मुख्य विषय (नोड 006 से) को **समझने में मदद** करता है?" — हाँ, तो मान्य। 4.', 'अभ्यास: दो कहानियाँ दें (एक में स्पष्ट गौण विषय हो, दूसरी में केवल विषय) — छात्र को अंतर पहचानने दें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** शब्दों द्वारा पाठक के मन में संवेदनात्मक अनुभव (दृश्य.',
          hint: 'यदि अटके तो **c7_hin_cbse_07_008** के "बिंब के प्रकार" और "रूपक vs उपमा" खंड दोहराएँ.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि **"हर तुलना रूपक है" और "बिंब केवल दृश्य (देखने वाला) होता है"।** **क्यों होता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** शब्दों द्वारा पाठक के मन में संवेदनात्मक अनुभव (दृश्य, श्रव्य, घ्राण,',
                  options: ['**बिंब (Imagery)** शब्दों द्वारा पाठक के मन में संवेदनात्मक अनुभव (दृश्य, श्रव्य, घ्राण,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है', '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect in a story', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**'],
                  hint: 'यदि अटके तो **c7_hin_cbse_07_008** के "बिंब के प्रकार" और "रूपक vs उपमा" खंड दोहराएँ — विशेष रूप से.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि **"हर तुलना रूपक है" और "बिंब केवल दृश्य (देखने वाला) होता है"।** **क्यों होता है**: Class 6-7 में.' }
          ],
            remediations: { 'class-6-7': { steps: ['**इन्द्रिय-छँटाई खेल**: 10 वाक्य दो (मिश्रित बिंब वाले)। छात्र से कहो: प्रत्येक वाक्य में **कौन-सी इन्द्रिय** जाग रही.', '**रूपक-उपमा छलनी**: 15 वाक्य दो (मिश्रित)। छात्र को प्रत्येक में "जैसे/वैसा/समान/तुल्य" शब्द ढूँढ़ने को कहो। जहाँ ये.', '**संयुक्त अभ्यास**: एक छोटा अनुच्छेद दो जिसमें दोनों हों। छात्र पहले बिंब छाँटे (इन्द्रिय लिखे), फिर रूपक छाँटे (दोनों.', '**मौखिक तर्क**: हर पहचान के बाद पूछो "कैसे जाना?" — इससे अंतर्निहित तर्क पक्का होता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_009', difficulty: 'standard',
          question: 'विरोधाभास (पैराडॉक्स) वह साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी लगने वाले.',
          hint: 'यदि अटका महसूस हो तो c8_hin_cbse_07_008 के \'बिंब-रूपक पहचान\' अभ्यास दोहराएँ — वही.',
          misconception: 'छात्र अक्सर **विरोधाभास को \'विरोधाभासी स्थिति\' (कंट्राडिक्शन) समझ बैठते हैं** — जैसे "वह रोता हुआ हँस रहा था" को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास (पैराडॉक्स) वह साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी लगने वाले कथन या',
                  options: ['विरोधाभास (पैराडॉक्स) वह साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी लगने वाले कथन या', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है', '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect in a story', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**'],
                  hint: 'यदि अटका महसूस हो तो c8_hin_cbse_07_008 के \'बिंब-रूपक पहचान\' अभ्यास दोहराएँ — वही \'अर्थ-परत\' खोलने.',
                  misconception: 'छात्र अक्सर **विरोधाभास को \'विरोधाभासी स्थिति\' (कंट्राडिक्शन) समझ बैठते हैं** — जैसे "वह रोता हुआ हँस रहा था" को विरोधाभास मान लेते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो वाक्य दें: एक साधारण विरोध ("वह अमीर है पर दुखी है"), एक विरोधाभास ("दुख ही सुख का द्वार है") — पूछें.', 'प्रतीक के लिए: एक वस्तु (कलम) दें और कहें — "इसे तीन चीज़ों का प्रतीक बनाओ: शक्ति, ज्ञान, जिम्मेदारी" — छात्र प्रत्येक.', 'फिर पाठ के किसी अंश में दोनों युक्तियाँ एक साथ ढूँढ़ने को कहें — इससे स्वतंत्र व संयुक्त पहचान दोनों सधेगी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_010', difficulty: 'standard',
          question: 'पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द या पद होते हैं जो पाठ के.',
          hint: 'यदि अटके तो c8_hin_cbse_07_006 (मुख्य विषय और संदेश) दोबारा पढ़ें — विषय स्पष्ट होते ही.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'मुख्य शब्द\' = \'पाठ में आए कठिन/अपरिचित शब्द\'। **गलत तर्क:** "शब्द कठिन है, इसलिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द या पद होते हैं जो पाठ के केंद्रीय भाव,',
                  options: ['पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द या पद होते हैं जो पाठ के केंद्रीय भाव,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है', '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect in a story', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**'],
                  hint: 'यदि अटके तो c8_hin_cbse_07_006 (मुख्य विषय और संदेश) दोबारा पढ़ें — विषय स्पष्ट होते ही शब्दों की.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'मुख्य शब्द\' = \'पाठ में आए कठिन/अपरिचित शब्द\'। **गलत तर्क:** "शब्द कठिन है, इसलिए मुख्य होगा।".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ 7 के 5 शब्द चुनो जो तुम्हें \'महत्वपूर्ण\' लगते हैं — कठिन नहीं, महत्वपूर्ण।" 2.', 'प्रत्येक शब्द के लिए पूछें: "यह शब्द किस पात्र/घटना/संदेश से जुड़ा है?', 'यदि यह शब्द न होता, तो क्या छूट जाता?" 3.', 'एक T-तालिका बनवाएँ: बाएँ कॉलम में शब्द, दाएँ में **\'क्या छूट जाता\'**। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_011', difficulty: 'standard',
          question: '"पाठ में भाषा-प्रयोग" refers to the deliberate linguistic choices an author.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 7 के \'व्याकरण: पाठ में भाषा-प्रयोग\' (c7_hin_cbse_07_011).',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "भाषा-प्रयोग विश्लेषण" का अर्थ है — पाठ में से संज्ञा, सर्वनाम, क्रिया छाँटकर उनकी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पाठ में भाषा-प्रयोग" refers to the deliberate linguistic choices an author makes',
                  options: ['"पाठ में भाषा-प्रयोग" refers to the deliberate linguistic choices an author makes', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है', '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect in a story', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 7 के \'व्याकरण: पाठ में भाषा-प्रयोग\' (c7_hin_cbse_07_011) के अभ्यास.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "भाषा-प्रयोग विश्लेषण" का अर्थ है — पाठ में से संज्ञा, सर्वनाम, क्रिया छाँटकर उनकी परिभाषा लिख देना।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र को पाठ 7 का एक छोटा अनुच्छेद (5-6 पंक्तियाँ) दें और कहें: "कोई 3 शब्द चुनो जो तुम्हें \'अलग\' या.', '**दूसरा कदम:** प्रत्येक शब्द के लिए पूछें: "यहीं पर लेखक इसकी जगह कोई और शब्द रख सकता था (जैसे \'अँधियारा\' की जगह.', '**तीसरा कदम:** छात्र से कहें: "अब इस अनुच्छेद को जोर से पढ़ो — पहले मूल रूप में, फिर अपने बदले हुए शब्दों के साथ।.', '**चौथा कदम:** इस प्रक्रिया को 2-3 अनुच्छेदों पर दोहराएँ, फिर छात्र से पूछें: "लेखक की भाषा-शैली की 3 विशेषताएँ बताओ जो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है (तथ्य.',
          hint: 'If stuck, review **c7_hin_cbse_07_012** — specifically the "clue-word hunt" exercise.',
          misconception: 'Students believe **आशय-सूचक questions have a single "correct" answer hidden in the textbook**, so they waste time.',
          parts: [
                { id: 'a', prompt: 'पाठ 7 में से एक वस्तुनिष्ठ प्रश्न लिखें जिसका उत्तर पाठ की किसी एक पंक्ति में सीधे मिल जाए।', answer: 'उदाहरण: "पाठ का नायक कौन है?" या "घटना किस दिन घटी?"',
                  options: ['उदाहरण: "पाठ का नायक कौन है?" या "घटना किस दिन घटी?"', 'correct'],
                  hint: 'If stuck, review **c7_hin_cbse_07_012** — specifically the "clue-word hunt" exercise where students.',
                  misconception: 'Students believe **आशय-सूचक questions have a single "correct" answer hidden in the textbook**, so they waste time re-reading hoping.' },
                { id: 'b', prompt: 'मान लीजिए पाठ में लिखा है: "रमेश ने खिड़की से बाहर देखा, फिर चुपचाप बैग उठाया और चला गया।" — प्रश्न: "रमेश की मनोदशा क्या थी?" क्या यह वस्तुनिष्ठ है या.', answer: 'यह **आशय-सूचक** है क्योंकि पाठ में "दुखी", "नाराज़", या "उदास" शब्द नहीं लिखे',
                  options: ['यह **आशय-सूचक** है क्योंकि पाठ में "दुखी", "नाराज़", या "उदास" शब्द नहीं लिखे', 'correct'],
                  hint: 'If stuck, review **c7_hin_cbse_07_012** — specifically the "clue-word hunt" exercise where students.',
                  misconception: 'Students believe **आशय-सूचक questions have a single "correct" answer hidden in the textbook**, so they waste time re-reading hoping.' }
          ],
            remediations: { 'questions-have-a-single-correct': { steps: ['**Isolate the confusion**: Give the student two questions — one वस्तुनिष्ठ ("What color was the flag?"), one आशय-सूचक.', 'Ask: "Which answer can you point to?', 'Which requires *thinking*?" 2.', '**Clue-hunting drill**: Pick one आशय-सूचक question.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **आशय-सूचक questions have a single "correct" answer hidden in the textbook**, so they waste time.',
          parts: [
                { id: 'a', prompt: 'कथन: "आशय-सूचक प्रश्नों के उत्तर \'सही\' या \'गलत\' नहीं होते — वे \'समर्थित\' या \'असमर्थित\' होते हैं।" — इससे सहमत हैं या असहमत?', answer: '**सहमत**। उदाहरण: "नायक ने वापस लौटने का फैसला क्यों किया?"',
                  options: ['**सहमत**। उदाहरण: "नायक ने वापस लौटने का फैसला क्यों किया?"', 'correct'],
                  hint: 'If stuck, review **c7_hin_cbse_07_012** — specifically the "clue-word hunt" exercise where students.',
                  misconception: 'Students believe **आशय-सूचक questions have a single "correct" answer hidden in the textbook**, so they waste time re-reading hoping.' }
          ],
            remediations: { 'questions-have-a-single-correct': { steps: ['**Isolate the confusion**: Give the student two questions — one वस्तुनिष्ठ ("What color was the flag?"), one आशय-सूचक.', 'Ask: "Which answer can you point to?', 'Which requires *thinking*?" 2.', '**Clue-hunting drill**: Pick one आशय-सूचक question.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
