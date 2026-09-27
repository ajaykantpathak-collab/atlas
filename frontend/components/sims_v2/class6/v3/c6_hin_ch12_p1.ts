import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch12_p1: SimDef = {
    id: 'v3_c6_hin_ch12_p1',
    title: 'पाठ 12 · Part 1/3',
    subtitle: 'इस नोड में केवल पाठ 12 की पृष्ठभूमि (काल, समाज, परिवेश) और रचनाकार के व्यक्तित्व के उन.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 12 · Part 1/3',
    chapters: ['c6_hin_ch12'],
    nodeIds: ['c6_hin_cbse_12_001', 'c6_hin_cbse_12_002', 'c6_hin_cbse_12_003', 'c6_hin_cbse_12_004', 'c6_hin_cbse_12_005', 'c6_hin_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो कि तुम्हें किसी नए दोस्त का लिखा पत्र मिला है — तुम पहले जानना चाहोगे कि वह कौन है, कहाँ रहता है.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के जीवन-दर्शन की वह झलक है जो पाठ को समझने का आधार तैयार करती है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — पृष्ठभूमि', 'पाठ 12 — कथानक', 'पाठ 12 — पाठ्य-परिवेश', 'पाठ 12 — पात्र-चित्रण', 'पाठ 12 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 1/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा.', answer: '12 -', options: ['12 -', '12 -'] },
            { id: 's2', label: '12 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों.', answer: '12 -', options: ['12 -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 12 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 12 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 12 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ.',
          hint: 'अगर अटका लगे तो कक्षा 5 की हिंदी पाठ्यपुस्तक के किसी भी पाठ का \'रचनाकार परिचय\' खंड दोबारा.',
          misconception: 'विद्यार्थी समझते हैं कि \'रचनाकार परिचय\' का अर्थ केवल जन्म-तिथि, मृत्यु-तिथि, प्रसिद्ध कृतियों की सूची रटना है। वे यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी के नायक/प्रमुख'],
                  hint: 'अगर अटका लगे तो कक्षा 5 की हिंदी पाठ्यपुस्तक के किसी भी पाठ का \'रचनाकार परिचय\' खंड दोबारा पढ़ें और.',
                  misconception: 'विद्यार्थी समझते हैं कि \'रचनाकार परिचय\' का अर्थ केवल जन्म-तिथि, मृत्यु-तिथि, प्रसिद्ध कृतियों की सूची रटना है। वे यह नहीं देख पाते कि लेखक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: विद्यार्थी से पूछें — "पाठ का कौन-सा पात्र तुम्हें अपने आस-पास के किसी व्यक्ति जैसा लगा?', 'क्यों?" चरण 2: उस पात्र की एक हरकत/संवाद चुनें और पूछें — "लेखक ने यह हरकत कहाँ से सीखी होगी?" चरण 3: लेखक की जीवनी का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_002', difficulty: 'standard',
          question: 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में.',
          hint: 'अगर फँस जाएँ तो **"डोमिनो खेल"** खेलें: एक घटना लिखें, फिर "इसके कारण क्या हुआ?" पूछकर.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"कथानक के सोपान (Exposition, Rising Action, आदि) कहानी के पैराग्राफ या अध्याय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा',
                  options: ['कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी के नायक/प्रमुख'],
                  hint: 'अगर फँस जाएँ तो **"डोमिनो खेल"** खेलें: एक घटना लिखें, फिर "इसके कारण क्या हुआ?" पूछकर अगली लिखें।.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"कथानक के सोपान (Exposition, Rising Action, आदि) कहानी के पैराग्राफ या अध्याय संख्या से तय होते.' }
          ],
            remediations: { 'exposition': { steps: ['**दृश्य सहारा:** छात्र को एक छोटी कहानी (5-6 वाक्य) दें और कहें: "हर वाक्य के आगे तीर (→) लगाओ: इसके कारण क्या हुआ?" जब.', '**हाथ से गतिविधि:** 5 कार्ड बनाओ जिन पर सोपानों के नाम हों। कहानी पढ़ते हुए छात्र से कहो: "जब तुम्हें लगे \'अब संघर्ष.', '**स्पष्टीकरण:** "सोपान कहानी के **इंजन के पुर्जे** हैं, **ट्रेन के डिब्बों के नंबर** नहीं। पुर्जा जहाँ फिट होता है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक.',
          hint: 'यदि अटका हुआ लगे तो \'कथानक के पांच चरण\' (Five Plot Stages) में से पहले चरण \'आरंभ\' को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'वातावरण\' (Atmosphere/Mood) कहानी की **घटनाओं** (Events) से बनता है। उदाहरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों',
                  options: ['पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी के नायक/प्रमुख'],
                  hint: 'यदि अटका हुआ लगे तो \'कथानक के पांच चरण\' (Five Plot Stages) में से पहले चरण \'आरंभ\' को दोहराएँ और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'वातावरण\' (Atmosphere/Mood) कहानी की **घटनाओं** (Events) से बनता है। उदाहरण: "कहानी में भूत आया.' }
          ],
            remediations: { 'atmosphere-mood-events': { steps: ['**संवेदी सूची बनवाएँ:** छात्र को आँखें बंद करवाकर कक्षा का वर्तमान वातावरण बताने को कहें — "क्या दिख रहा?', 'स्पर्श कैसा है?" — बोर्ड पर 5 इंद्रियों के कॉलम बनवाएँ। 2.', '**\'वाक्य परिवर्तन\' खेल:** एक निष्पक्ष वाक्य दें: *"बारिश हो रही है।"* छात्रों से कहें: "इसे बदलो ताकि लगे — (क).', '**पाठ से \'मूड वर्ड्स\' छाँटना:** पाठ्यपुस्तक के किसी अंश से 10 शब्द (विशेषण/क्रिया/संज्ञा) चुनवाएँ जो वातावरण रच रहे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी के.',
          hint: 'यदि अटका हुआ महसूस हो तो: **कथानक की समयरेखा (timeline) बनाएँ** और हर बड़ी घटना के आगे.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "पात्र-चित्रण = पात्र का शारीरिक वर्णन + उसके किए कामों की सूची"। वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी के नायक/प्रमुख',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी के नायक/प्रमुख', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों'],
                  hint: 'यदि अटका हुआ महसूस हो तो: **कथानक की समयरेखा (timeline) बनाएँ** और हर बड़ी घटना के आगे लिखें: "नायक.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "पात्र-चित्रण = पात्र का शारीरिक वर्णन + उसके किए कामों की सूची"। वे लिखते हैं: "रामू लंबा था, काले.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहें: "कहानी बंद करो। आँखें बंद करके नायक को याद करो—वह कैसा *महसूस* कराता है?', 'वह \'फीलिंग\' (feeling) ही उसका प्रमुख गुण (dominant trait) है।" 2.', '**दूसरा कदम:** उस \'फीलिंग\' के 3 सबूत पाठ से ढूँढने को कहें: एक संवाद, एक कार्य, एक विचार/प्रतिक्रिया। 3.', '**तीसरा कदम:** PEEL शीट दें: Point (गुण का नाम), Evidence (पृष्ठ संख्या/पंक्ति), Explanation (यह गुण क्यों मायने रखता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो कथानक में नायक/प्रमुख पात्र के साथ रहकर कथानक.',
          hint: 'यदि अटका हुआ महसूस हो तो c6_hin_cbse_12_004 (नायक चित्रण) के \'पात्र-विश्लेषण चेकलिस्ट\'.',
          misconception: 'छात्र अक्सर मानते हैं कि \'सहायक पात्र\' का अर्थ \'कम महत्वपूर्ण पात्र\' होता है। वे सोचते हैं कि नायक ही सब कुछ करता है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो कथानक में नायक/प्रमुख पात्र के साथ रहकर कथानक को आगे',
                  options: ['सहायक पात्र वे पात्र होते हैं जो कथानक में नायक/प्रमुख पात्र के साथ रहकर कथानक को आगे', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों'],
                  hint: 'यदि अटका हुआ महसूस हो तो c6_hin_cbse_12_004 (नायक चित्रण) के \'पात्र-विश्लेषण चेकलिस्ट\'.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'सहायक पात्र\' का अर्थ \'कम महत्वपूर्ण पात्र\' होता है। वे सोचते हैं कि नायक ही सब कुछ करता है, सहायक तो बस \'भरने\' के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछें: "अगर इस पात्र को कहानी से हटा दें, तो क्या बदलेगा?" — यदि छात्र कहे "कुछ नहीं", तो उस दृश्य को साथ.', 'क्या पात्र के बिना वह वही फ़ैसला लेता?" 2.', 'एक सरल तालिका बनाएँ: स्तंभ 1—पात्र का नाम, स्तंभ 2—नायक से संबंध, स्तंभ 3—किया क्या, स्तंभ 4—नतीजा क्या हुआ। छात्र को.', 'अंत में पूछें: "कौन-सा स्तंभ सबसे ज़रूरी लगा?" — जब छात्र \'नतीजा\' बोले, तो समझाएँ: "वही सहायक पात्र का असली काम है।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) कहानी का वह केंद्रीय विचार या भाव है जो पूरी रचना.',
          hint: 'अगर अटके तो c6_hin_cbse_12_002 (कथानक संरचना) और c6_hin_cbse_12_004 (नायक चित्रण) दोबारा.',
          misconception: 'छात्र अक्सर **मुख्य विषय को "एक शब्द" (जैसे: प्रेम, देशभक्ति, ईमानदारी) में समेट देते हैं** — यह गलत है क्योंकि एक शब्द.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) कहानी का वह केंद्रीय विचार या भाव है जो पूरी रचना में सूत्र की',
                  options: ['मुख्य विषय (Central Theme) कहानी का वह केंद्रीय विचार या भाव है जो पूरी रचना में सूत्र की', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों'],
                  hint: 'अगर अटके तो c6_hin_cbse_12_002 (कथानक संरचना) और c6_hin_cbse_12_004 (नायक चित्रण) दोबारा देखें.',
                  misconception: 'छात्र अक्सर **मुख्य विषय को "एक शब्द" (जैसे: प्रेम, देशभक्ति, ईमानदारी) में समेट देते हैं** — यह गलत है क्योंकि एक शब्द केवल **विषय-क्षेत्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहें — "कहानी का नाम मत बताओ, यह बताओ कि कहानी *किस बारे में* कुछ *कहना चाहती है*।" 2.', '**दूसरा कदम:** एक जानी-पहचानी कहानी (जैसे "चींटी और टिड्डा") लें और बोर्ड पर लिखें: - विषय-क्षेत्र: परिश्रम - गलत विषय.', '**तीसरा कदम:** छात्र से कहें — "अब तुम अपनी कहानी के लिए ऐसा ही वाक्य बनाओ जिसमें **कारण-परिणाम (cause-effect)** या.', '**चौथा कदम:** जब तक वह एक-शब्दीय उत्तर से पूर्ण-वाक्य विषय पर न आ जाए, हर बार पूछें: "और?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
