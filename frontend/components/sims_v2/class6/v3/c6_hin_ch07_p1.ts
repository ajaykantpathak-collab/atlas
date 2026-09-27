import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch07_p1: SimDef = {
    id: 'v3_c6_hin_ch07_p1',
    title: 'पाठ 7 · Part 1/3',
    subtitle: 'यह नोड केवल लेखक परिचय, रचनाकाल की पृष्ठभूमि और रचना के उद्देश्य तक सीमित है; इसमें कथानक.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 7 · Part 1/3',
    chapters: ['c6_hin_ch07'],
    nodeIds: ['c6_hin_cbse_07_001', 'c6_hin_cbse_07_002', 'c6_hin_cbse_07_003', 'c6_hin_cbse_07_004', 'c6_hin_cbse_07_005', 'c6_hin_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो कि तुम्हें एक बंद डिब्बा दिया गया है और कहा गया है "अंदाज़ा लगाओ इसमें क्या है?" — मुश्किल है न?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की सामाजिक-सांस्कृतिक परिस्थितियों, और रचना के उद्देश्य या प्रेरणा का संक्षिप्त विवेचन है जो पाठ के गहन अर्थ तक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — पृष्ठभूमि', 'पाठ 7 — कथानक', 'पाठ 7 — पाठ्य-परिवेश', 'पाठ 7 — पात्र-चित्रण', 'पाठ 7 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 1/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — **कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ.', answer: '7 -', options: ['7 -', '7 -'] },
            { id: 's2', label: '7 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक.', answer: '7 -', options: ['7 -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 7 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन.',
          hint: 'अगर अटके तो **\'लेखक और उसका समय\' (Author and his time)** की अवधारणा दोहराएँ — कक्षा 5 की.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर समझते हैं कि \'पृष्ठभूमि जानना\' का अर्थ है **इतिहास की तारीखें, घटनाएँ और लेखक की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें किसी पात्र की'],
                  hint: 'अगर अटके तो **\'लेखक और उसका समय\' (Author and his time)** की अवधारणा दोहराएँ — कक्षा 5 की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर समझते हैं कि \'पृष्ठभूमि जानना\' का अर्थ है **इतिहास की तारीखें, घटनाएँ और लेखक की जन्म-मृत्यु तिथि रट.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम (साक्षात्कार विधि):** छात्र से पूछें: "अगर तुम्हें अपने दादाजी के बचपन की कहानी सुननी हो, तो तुम उनसे क्या.', 'या यह कि \'दादाजी, जब आप छोटे थे तो गाँव में बिजली थी?', 'कोई डर लगता था?\'" — इससे उन्हें \'पृष्ठभूमि\' का अर्थ **\'जीवन का संदर्भ\'** समझ में आएगा। 2.', '**दूसरा कदम (टेक्स्ट मैपिंग):** पाठ 7 के पहले पन्ने पर लेखक परिचय वाले पैराग्राफ में **तीन अलग रंगों से अंडरलाइन**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_002', difficulty: 'standard',
          question: '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा.',
          hint: 'यदि अटका महसूस हो तो **"कहानी के 5 भाग" (Beginning, Middle, End का विस्तार)** और.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'कथानक के सोपान (Plot Points)\'** को **\'पात्र की भावनाओं/विचारों\' (Character\'s Internal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ',
                  options: ['**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें किसी पात्र की'],
                  hint: 'यदि अटका महसूस हो तो **"कहानी के 5 भाग" (Beginning, Middle, End का विस्तार)** और **"क्यों?',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'कथानक के सोपान (Plot Points)\'** को **\'पात्र की भावनाओं/विचारों\' (Character\'s Internal State)** मान लेते हैं।.' }
          ],
            remediations: { 'plot-points-character-s-internal': { steps: ['**चरण 1 (ठोस बनाओ):** छात्र को एक **सरल घरेलू घटना** दो: "तुम्हारा छोटा भाई दूध गिरा देता है → माँ डाँटती है → वह रोता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय.',
          hint: 'यदि अटका हुआ महसूस हो तो **कथानक (नोड 002) की घटनाओं की सूची** बनाओ और प्रत्येक घटना के.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'परिवेश\' = **केवल स्थान वर्णन** (जैसे: "गाँव था, नदी थी, पेड़ थे")। वे **समय**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक',
                  options: ['पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें किसी पात्र की'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कथानक (नोड 002) की घटनाओं की सूची** बनाओ और प्रत्येक घटना के आगे पूछो.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'परिवेश\' = **केवल स्थान वर्णन** (जैसे: "गाँव था, नदी थी, पेड़ थे")। वे **समय** (इतिहासिक काल, मौसम.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक **परिचित दृश्य** (जैसे: अपने स्कूल की सुबह की प्रार्थना सभा) दें और कहें: *"केवल स्थान मत बताओ — बताओ कि.', 'फिर एक **कहानी का छोटा अंश** दें और **चार रंगों के पेंसिल** से चिह्नित करने को कहें: लाल = समय, नीला = स्थान, हरा.', 'पूछें: *"यदि पीला (सामाजिक) हटा दें तो पात्र का फैसला बदलेगा?"* — इससे **सक्रिय भूमिका** स्पष्ट होगी। ४.', 'अंत में: छात्र स्वयं एक **दो-वाक्य दृश्य** लिखे जहाँ परिवेश फैसला बदल दे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें किसी पात्र.',
          hint: 'अगर अटका हुआ महसूस हो तो c6_hin_cbse_07_002 (कथानक और आख्यान-संरचना) दोहराएँ — नायक के.',
          misconception: 'छात्र अक्सर पात्र-चित्रण को \'जीवनी\' (biography) या \'गुणों की सूची\' (list of adjectives) समझ लेते हैं — जैसे "राम लंबा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें किसी पात्र की',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें किसी पात्र की', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक'],
                  hint: 'अगर अटका हुआ महसूस हो तो c6_hin_cbse_07_002 (कथानक और आख्यान-संरचना) दोहराएँ — नायक के तीन प्रमुख.',
                  misconception: 'छात्र अक्सर पात्र-चित्रण को \'जीवनी\' (biography) या \'गुणों की सूची\' (list of adjectives) समझ लेते हैं — जैसे "राम लंबा है, गोरा है, बहादुर.' }
          ],
            remediations: { 'biography-list-of-adjectives': { steps: ['छात्र को एक परिचित कहानी (जैसे पंचतंत्र की कोई कथा) दें और कहें: "नायक की तीन विशेषताएँ बताओ और प्रत्येक के लिए कहानी.', 'फिर उससे पूछें: "अगर यह विशेषता न होती तो कहानी कैसे बदल जाती?" — यह कारण-कारण संबंध (trait → plot) स्थापित करेगा। 3.', 'अंत में PEEL संरचना (Point, Evidence, Explanation, Link) का उपयोग करके एक अनुच्छेद लिखने का अभ्यास कराएँ, जहाँ हर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर कथानक को गति.',
          hint: 'यदि अटके तो \'पात्र-चित्रण: नायक/प्रमुख पात्र\' (c6_hin_cbse_07_004) के \'कार्य-चरण 3: नायक.',
          misconception: 'छात्र समझते हैं कि \'सहायक पात्र\' का अर्थ \'कम महत्वपूर्ण पात्र\' या \'बैकग्राउंड में रहने वाला\' होता है, जबकि वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर कथानक को गति देते हैं,',
                  options: ['सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर कथानक को गति देते हैं,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक'],
                  hint: 'यदि अटके तो \'पात्र-चित्रण: नायक/प्रमुख पात्र\' (c6_hin_cbse_07_004) के \'कार्य-चरण 3: नायक के गुण-दोष.',
                  misconception: 'छात्र समझते हैं कि \'सहायक पात्र\' का अर्थ \'कम महत्वपूर्ण पात्र\' या \'बैकग्राउंड में रहने वाला\' होता है, जबकि वास्तव में सहायक पात्र कथानक के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "अपनी पसंदीदा फिल्म/कहानी का कोई दृश्य याद करो जहाँ हीरो अकेला मुसीबत में हो — तब कौन आता है?', 'हीरो उसके बिना क्या कर पाता?" 2.', 'फिर एक चार्ट बनाओ: स्तंभ 1 — सहायक पात्र का नाम, स्तंभ 2 — उसका कार्य, स्तंभ 3 — नायक पर प्रभाव। 3.', 'साथ पढ़ते समय हर सहायक पात्र के संवाद पर रुककर पूछो: "यह बात नायक के बारे में क्या बताती है?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या संदेश है जो पूरी रचना में.',
          hint: 'यदि अटका हुआ लगे तो **कथानक-चक्र (Plot Mountain)** दोहराएँ — विशेषकर चरम बिंदु (Climax).',
          misconception: '**विशिष्ट भ्रांति:** छात्र **मुख्य विषय** को **नैतिक शिक्षा (Moral)** समझ लेते हैं — जैसे "झूठ मत बोलो" — जबकि विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या संदेश है जो पूरी रचना में व्याप्त रहता है',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या संदेश है जो पूरी रचना में व्याप्त रहता है', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक'],
                  hint: 'यदि अटका हुआ लगे तो **कथानक-चक्र (Plot Mountain)** दोहराएँ — विशेषकर चरम बिंदु (Climax) और पतन.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **मुख्य विषय** को **नैतिक शिक्षा (Moral)** समझ लेते हैं — जैसे "झूठ मत बोलो" — जबकि विषय **विचार/मूल्य** होता है.' }
          ],
            remediations: { 'moral': { steps: ['छात्र को दो वाक्य दें: (अ) "सच बोलो।" (ब) "सच्चाई में बड़ी ताकत होती है।" पूछें: "कौन-सा **विचार** है और कौन-सा.', 'फिर कहानी का अंत पढ़वाकर पूछें: "लेखक कौन-सा **विचार** दे रहा है — आदेश नहीं?" 3.', 'साथ मिलकर **विषय-वाक्य** बनाएँ: "इस कहानी का विषय है — ______।" 4.', 'दो दिन बाद दूसरी कहानी से वही अभ्यास दोहराएँ जब तक वह **विचार** और **उपदेश** में भेद न कर ले।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
