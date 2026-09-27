import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch07_p2: SimDef = {
    id: 'v3_c6_hin_ch07_p2',
    title: 'पाठ 7 · Part 2/3',
    subtitle: 'This node covers identifying, analyzing, and explaining secondary themes (gaun vishay).',
    classLevel: 6, subject: 'hin', topic: 'पाठ 7 · Part 2/3',
    chapters: ['c6_hin_ch07'],
    nodeIds: ['c6_hin_cbse_07_007', 'c6_hin_cbse_07_008', 'c6_hin_cbse_07_009', 'c6_hin_cbse_07_010', 'c6_hin_cbse_07_011', 'c6_hin_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Think about your favorite festival — say, Diwali. The *main* event is Lakshmi Puja, but the *secondary*.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — गौण विषय', text: 'गौण विषय (Secondary Theme) वह सहायक केंद्रीय विचार है जो पाठ के मुख्य विषय के समानांतर चलता है, उसे समृद्ध करता है, और पात्रों या परिवेश की गहराई को उजागर करता है, बिना मुख्य कथानक का केंद्र बने।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — गौण', 'पाठ 7 — साहित्यिक', 'पाठ 7 — पदावली', 'पाठ 7 — व्याकरण', 'पाठ 7 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 2/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — भाषा-प्रयोग (Language Use) से तात्पर्य है — किसी पाठ में लेखक द्वारा शब्दों, वाक्य-रचना.', answer: '7 -', options: ['7 -', '7 - -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया.', answer: '7 - -', options: ['7 - -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_07_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_007', difficulty: 'standard',
          question: 'गौण विषय (Secondary Theme) वह सहायक केंद्रीय विचार है जो पाठ के मुख्य विषय के.',
          hint: 'If stuck, review "मुख्य विषय और संदेश" (c6_hin_cbse_07_006) — specifically the difference.',
          misconception: 'छात्र अक्सर गौण विषय को "पक्ष-कथानक" (sub-plot) या "सहायक पात्र की कहानी" समझ लेते हैं। वे सोचते हैं: "अगर दादी की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Secondary Theme) वह सहायक केंद्रीय विचार है जो पाठ के मुख्य विषय के समानांतर',
                  options: ['गौण विषय (Secondary Theme) वह सहायक केंद्रीय विचार है जो पाठ के मुख्य विषय के समानांतर', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक'],
                  hint: 'If stuck, review "मुख्य विषय और संदेश" (c6_hin_cbse_07_006) — specifically the difference between.',
                  misconception: 'छात्र अक्सर गौण विषय को "पक्ष-कथानक" (sub-plot) या "सहायक पात्र की कहानी" समझ लेते हैं। वे सोचते हैं: "अगर दादी की बीमारी का जिक्र बार-बार.' }
          ],
            remediations: { 'sub-plot': { steps: ['**पहला कदम:** छात्र से कहें — "पाठ में कोई एक छोटी घटना चुनो जो मुख्य कहानी से अलग हो (जैसे: दादी का तुलसी पूजन)। अब.', 'एक शब्द में नहीं, एक वाक्य में।" 2.', '**दूसरा कदम:** उस वाक्य को \'विषय\' (topic) से \'विषय-विचार\' (theme) में बदलने का अभ्यास कराएँ — "दादी तुलसी पूजती है".', '**तीसरा कदम:** पूछें — "यह विचार मुख्य विषय से कैसे जुड़ता है?" यदि मुख्य विषय \'परंपरा\' है, तो यह गौण विषय \'दैनिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** शब्दों द्वारा पाठक की पाँचों इंद्रियों (दृष्टि, श्रवण, गंध.',
          hint: 'अगर फँसें तो: **उपमा और रूपक के 5-5 उदाहरण** लिखकर उनके अंतर (तुलनात्मक शब्द की.',
          misconception: 'छात्र अक्सर **रूपक** और **उपमा** को एक ही समझ लेते हैं क्योंकि दोनों तुलना करते हैं। वे "है/हैं/था/थी" देखकर रूपक पहचान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** शब्दों द्वारा पाठक की पाँचों इंद्रियों (दृष्टि, श्रवण, गंध, स्पर्श,',
                  options: ['**बिंब (Imagery)** शब्दों द्वारा पाठक की पाँचों इंद्रियों (दृष्टि, श्रवण, गंध, स्पर्श,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक'],
                  hint: 'अगर फँसें तो: **उपमा और रूपक के 5-5 उदाहरण** लिखकर उनके अंतर (तुलनात्मक शब्द की.',
                  misconception: 'छात्र अक्सर **रूपक** और **उपमा** को एक ही समझ लेते हैं क्योंकि दोनों तुलना करते हैं। वे "है/हैं/था/थी" देखकर रूपक पहचान लेते हैं, लेकिन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को दो वाक्य दें: "वह शेर **जैसा** बहादुर है" और "वह **शेर** है।" पूछें: "पहले में तुलना स्पष्ट है.', '**चरण 2:** रूपक वाले वाक्य में "शेर" के गुण लिखवाएँ (बलवान, निर्भय, राजा) और फिर पूछें: "ये गुण \'उस\' पर कैसे लागू हुए?".', '**चरण 3:** एक कविता की पंक्ति दें जिसमें रूपक हो (जैसे "स्मृति **दीपक** है") — छात्र से कहें: "दीपक के तीन गुण लिखो और.', '**चरण 4:** अब छात्र से कहें: "अपना एक रूपक बनाओ किसी भाव के लिए (क्रोध, प्रेम, डर, खुशी) — और समझाओ क्यों चुना।" — यह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली नज़र में असंगत या झूठा.',
          hint: 'यदि अटके तो **नोड 008 (बिंब और रूपक)** के "अर्थ-परतें खोलना" अभ्यास दोहराएं — विशेष रूप.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **विरोधाभास = "गलत/झूठा वाक्य"** और **प्रतीक = "चित्र/सजावट"**। **क्यों होती.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली नज़र में असंगत या झूठा लगता है,',
                  options: ['**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जो पहली नज़र में असंगत या झूठा लगता है,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक'],
                  hint: 'यदि अटके तो **नोड 008 (बिंब और रूपक)** के "अर्थ-परतें खोलना" अभ्यास दोहराएं — विशेष रूप से वह चरण.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **विरोधाभास = "गलत/झूठा वाक्य"** और **प्रतीक = "चित्र/सजावट"**। **क्यों होती है:** कक्षा 5 तक वे.' }
          ],
            remediations: { '5': { steps: ['**चरण 1 (विरोधाभास हेतु):** छात्र को 3 दैनिक जीवन के विरोधाभास दें — "चुप्पी चीखती है", "अंधेरा रोशनी दिखाता है".', 'अगर नहीं, तो कौन सा सत्य छिपा है?" — इससे **शाब्दिक/गहरा अर्थ** का भेद स्पष्ट होगा। **चरण 2 (प्रतीक हेतु):** कक्षा में.', 'अब बताओ यह क्या *हो सकती है* किसी कहानी में?" (पेंसिल = रचनाशक्ति/शुरुआत; दरवाजा = अवसर/परिवर्तन; खिड़की.', 'दूसरी क्यों नहीं?" — इससे **चयनात्मकता (selectivity)** और **कार्यकारणता (causality)** समझ आएगी। **चरण 3:** दोनों को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_010', difficulty: 'standard',
          question: 'पदावली के मुख्य शब्द वे विशिष्ट शब्द होते हैं जिन्हें लेखक ने कथ्य के.',
          hint: 'यदि अटके तो c6_hin_cbse_07_006 (मुख्य विषय और संदेश) दोहराएँ — विषय स्पष्ट होते ही मुख्य.',
          misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' वही होते हैं जो **पाठ में सबसे ज्यादा बार आए हों** (frequency) या जो **परीक्षा की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के मुख्य शब्द वे विशिष्ट शब्द होते हैं जिन्हें लेखक ने कथ्य के केंद्रभाव, विषय या',
                  options: ['पदावली के मुख्य शब्द वे विशिष्ट शब्द होते हैं जिन्हें लेखक ने कथ्य के केंद्रभाव, विषय या', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक'],
                  hint: 'यदि अटके तो c6_hin_cbse_07_006 (मुख्य विषय और संदेश) दोहराएँ — विषय स्पष्ट होते ही मुख्य शब्द स्वतः.',
                  misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' वही होते हैं जो **पाठ में सबसे ज्यादा बार आए हों** (frequency) या जो **परीक्षा की दृष्टि से \'महत्वपूर्ण\'.' }
          ],
            remediations: { 'frequency-exam-oriented': { steps: ['छात्र को पाठ का एक छोटा अंश (5-6 पंक्तियाँ) दें और कहें: "इन पंक्तियों से **सिर्फ तीन शब्द** चुनो जिन्हें हटाने से बात.', 'फिर पूछें: "इन तीन में से **सबसे ताकतवर कौन सा है?** क्यों?" — इससे \'आवृत्ति\' (frequency) का भ्रम टूटता है और \'प्रभाव\'.', 'अब उस शब्द का शब्दकोश अर्थ और प्रसंगिक अर्थ साथ-साथ लिखवाएँ, तुलना करवाएँ। 4.', 'अंत में, उसी अर्थ के दो पर्यायवाची देकर पूछें: "लेखक ने इन्हें क्यों नहीं लिखा?" — इससे सूक्ष्म अर्थ-भेद (nuance).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग (Language Use) से तात्पर्य है — किसी पाठ में लेखक द्वारा शब्दों.',
          hint: 'यदि अटके, तो **मुहावरे और लोकोक्ति की सूची** (पाठ्यपुस्तक के व्याकरण भाग से) दोहराएँ, और.',
          misconception: 'छात्र समझते हैं कि **"अच्छी भाषा" = "कठिन/तत्सम/शुद्ध हिंदी"**। उदाहरण: पाठ में लिखे "उसका दिल बैठ गया" को वे "गलत".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग (Language Use) से तात्पर्य है',
                  options: ['भाषा-प्रयोग (Language Use) से तात्पर्य है', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक'],
                  hint: 'यदि अटके, तो **मुहावरे और लोकोक्ति की सूची** (पाठ्यपुस्तक के व्याकरण भाग से) दोहराएँ, और.',
                  misconception: 'छात्र समझते हैं कि **"अच्छी भाषा" = "कठिन/तत्सम/शुद्ध हिंदी"**। उदाहरण: पाठ में लिखे "उसका दिल बैठ गया" को वे "गलत" मानते हैं क्योंकि "दिल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को दो वाक्य दिखाओ — "वह रोया" और "उसकी आँखों से आँसुओं की धार बह निकली" — पूछो: "कौन-सा वाक्य तुम्हें अधिक.', 'क्यों?" चरण 2: समझाओ: **शब्द केवल अर्थ नहीं ढोते, भाव भी ढोते हैं**। चरण 3: पाठ से एक मुहावरा उठाओ (जैसे "नौ दो ग्यारह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_07_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में स्पष्ट रूप.',
          hint: 'यदि अटके तो c6_hin_cbse_07_002 (कथानक) और c6_hin_cbse_07_006 (मुख्य विषय) दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'आशय-सूचक\' का अर्थ है \'अपनी मनमर्जी का उत्तर लिखना\'। वे \'क्यों\' वाले प्रश्न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, लेखन काल की', '**कथानक (Plot)** किसी कहानी में घटनाओं का **कारण-परिणाम (Cause-Effect) से बँधा हुआ', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में घटनाओं के घटित होने का **समय, स्थान, भौगोलिक'],
                  hint: 'यदि अटके तो c6_hin_cbse_07_002 (कथानक) और c6_hin_cbse_07_006 (मुख्य विषय) दोबारा पढ़ें — विशेष रूप.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'आशय-सूचक\' का अर्थ है \'अपनी मनमर्जी का उत्तर लिखना\'। वे \'क्यों\' वाले प्रश्न देखते ही अपने अनुभव या.' }
          ],
            remediations: { 'inference-imagination-textual-evidence': { steps: ['**पहचान चरण**: छात्र को 5-5 प्रश्नों की दो सूची दें — एक में केवल \'क्या/कौन/कब/कहाँ\' वाले प्रश्न, दूसरे में केवल.', '**अंतर स्पष्टीकरण**: समझाएँ: "वस्तुनिष्ठ = खोजो (Search); आशय-सूचक = जोड़ो (Connect the dots)।" 3.', '**अभ्यास**: एक छोटा गद्यांश देकर दोनों प्रकार के 3-3 प्रश्न बनाने को कहें और साथ में \'साक्ष्य शब्द\' भी लिखवाएँ। 4.', '**प्रतिक्रिया**: उसके बनाए प्रश्नों की जाँच करें — यदि आशय-सूचक प्रश्न का उत्तर पाठ में सीधे मिल जाए, तो उसे सुधारने को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
