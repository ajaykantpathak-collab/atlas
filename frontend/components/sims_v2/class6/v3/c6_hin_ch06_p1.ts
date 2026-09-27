import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch06_p1: SimDef = {
    id: 'v3_c6_hin_ch06_p1',
    title: 'पाठ 6 · Part 1/3',
    subtitle: 'This node covers identifying the author\'s biography, the historical/social setting of the.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 6 · Part 1/3',
    chapters: ['c6_hin_ch06'],
    nodeIds: ['c6_hin_cbse_06_001', 'c6_hin_cbse_06_002', 'c6_hin_cbse_06_003', 'c6_hin_cbse_06_004', 'c6_hin_cbse_06_005', 'c6_hin_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Think about your favorite movie—do you know who directed it or when it is set?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ का विवरण है, जबकि रचनाकार परिचय (Author Introduction) लेखक के जीवन, उनकी लेखन शैली, प्रमुख रचनाएँ और साहित्य.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — पृष्ठभूमि', 'पाठ 6 — कथानक', 'पाठ 6 — पाठ्य-परिवेश', 'पाठ 6 — पात्र-चित्रण', 'पाठ 6 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 1/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम.', answer: '6 -', options: ['6 -', '6 -'] },
            { id: 's2', label: '6 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ.', answer: '6 -', options: ['6 -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 6 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_001', difficulty: 'standard',
          question: 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और.',
          hint: 'If stuck, review "How to find the Main Idea and Key Details in a non-fiction text" (Class.',
          misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि\' केवल **भौगोलिक स्थान** (गाँव/शहर) और **समय** (साल/काल) तक सीमित है। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ',
                  options: ['पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)'],
                  hint: 'If stuck, review "How to find the Main Idea and Key Details in a non-fiction text" (Class 5 skill).',
                  misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि\' केवल **भौगोलिक स्थान** (गाँव/शहर) और **समय** (साल/काल) तक सीमित है। वे **सामाजिक-आर्थिक परिवेश**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पठन (Re-read):** छात्र को पाठ के पहले पृष्ठ पर दिए \'रचनाकार परिचय\' और कहानी के पहले दो अनुच्छेदों को पेंसिल से.', '**तालिका निर्माण (T-Chart):** एक शीट पर दो कॉलम बनवाएँ: बाएँ "रचनाकार के जीवन/विचार" और दाएँ "कहानी में झलक"। मिलान.', '**प्रश्न तकनीक (5 Ws):** उनसे पूछें: "कहानी *कहाँ* होती है?', 'लेखक *क्यों* प्रभावित हुए?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा.',
          hint: 'यदि अटका हुआ महसूस हो तो: **"किसी भी छोटी कहानी (पंचतंत्र/अकबर-बीरबल) को 5-6 वाक्यों में.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'उद्दीपन घटना (Inciting Incident)\'** और **\'चरमोत्कर्ष (Climax)\'** को एक ही समझ बैठते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम',
                  options: ['कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)'],
                  hint: 'यदि अटका हुआ महसूस हो तो: **"किसी भी छोटी कहानी (पंचतंत्र/अकबर-बीरबल) को 5-6 वाक्यों में लिखो और हर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'उद्दीपन घटना (Inciting Incident)\'** और **\'चरमोत्कर्ष (Climax)\'** को एक ही समझ बैठते हैं क्योंकि दोनों.' }
          ],
            remediations: { 'inciting-incident-climax-disruption': { steps: ['**लक्षित सुधार (Targeted Remediation):** 1.', '**दृश्य सहारा (Visual Anchor):** कक्षा में फ्रीटैग पिरामिड का बड़ा चित्र बनाएँ/दिखाएँ। पाँचों अवयवों को **सीढ़ियों**.', '**परिचित कहानी पर मैपिंग:** \'पंचतंत्र\' की \'शेर और चूहा\' कहानी लें। छात्र से पूछें: (अ) कौन-सी घटना कहानी **शुरू** करती.', '(शेर सो रहा, चूहा कूदा — उद्दीपन)। (ब) कौन-सी घटना **सबसे तनावपूर्ण** है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ.',
          hint: 'यदि कथानक संरचना (घटनाओं का क्रम, मोड़, चरम) स्पष्ट नहीं है, तो पहले c6_hin_cbse_06_002.',
          misconception: 'छात्र परिवेश को **स्थैतिक पृष्ठभूमि (static backdrop)** मानते हैं — जैसे स्टेज पर लगा पर्दा जो बदला नहीं जाता। वे नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,',
                  options: ['पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)'],
                  hint: 'यदि कथानक संरचना (घटनाओं का क्रम, मोड़, चरम) स्पष्ट नहीं है, तो पहले c6_hin_cbse_06_002 दोहराएँ.',
                  misconception: 'छात्र परिवेश को **स्थैतिक पृष्ठभूमि (static backdrop)** मानते हैं — जैसे स्टेज पर लगा पर्दा जो बदला नहीं जाता। वे नहीं समझते कि परिवेश.' }
          ],
            remediations: { 'static-backdrop-dynamic': { steps: ['**पहला कदम:** छात्र से कहो — "अपनी कक्षा की खिड़की से अभी जो दिख रहा है, उसे 5 इंद्रियों (देखो, सुनो, सूँघो, छुओ, महसूस.', 'यदि बरसात हो, तो क्या बदलेगा?', 'यदि परीक्षा चल रही हो, तो क्या बदलेगा?" → इससे परिवेश की **गतिशीलता** और **संदर्भ-निर्भरता** स्पष्ट होगी। 2.', '**दूसरा कदम:** एक परिचित कहानी (जैसे "पंच परमेश्वर") लें और परिवेश-परिवर्तन की समय-रेखा बनाएँ: चौपाल → खेत → पंचायत →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक कौशल है जिसमें कहानी के प्रमुख.',
          hint: 'यदि फँस जाएँ तो **कथानक-मानचित्र (plot map)** दोबारा बनाएँ: शुरुआत → मध्य → अंत, और हर.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि पात्र-चित्रण = **गुणों की सूची (list of adjectives)** + **कहानी का सारांश**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,'],
                  hint: 'यदि फँस जाएँ तो **कथानक-मानचित्र (plot map)** दोबारा बनाएँ: शुरुआत → मध्य → अंत, और हर मोड़ पर नायक.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि पात्र-चित्रण = **गुणों की सूची (list of adjectives)** + **कहानी का सारांश**। वे लिखते हैं: "नायक.' }
          ],
            remediations: { 'list-of-adjectives': { steps: ['**चरण 1**: छात्र से कहो — "एक गुण चुनो जो तुम्हें लगता है नायक में है। अब पाठ खोलो और **उँगली रखो** उस पंक्ति/पृष्ठ पर.', 'इनमें से कौन-सी क्रिया उस गुण को सिद्ध करती है?" **चरण 3**: उसे बोलकर समझाने दो, फिर लिखने को कहो: "नायक [गुण] है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो कहानी में नायक/प्रमुख पात्र के साथ बातचीत करके.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 004 (पात्र-चित्रण: नायक)** के \'पात्र-चित्रण के 5 आधार.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "सहायक पात्र = नायक का दोस्त/साइडकिक"। वे हर सहायक पात्र को \'मददगार दोस्त\' मान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो कहानी में नायक/प्रमुख पात्र के साथ बातचीत करके कथानक को',
                  options: ['सहायक पात्र वे पात्र होते हैं जो कहानी में नायक/प्रमुख पात्र के साथ बातचीत करके कथानक को', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 004 (पात्र-चित्रण: नायक)** के \'पात्र-चित्रण के 5 आधार: रूप, वचन.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "सहायक पात्र = नायक का दोस्त/साइडकिक"। वे हर सहायक पात्र को \'मददगार दोस्त\' मान लेते हैं, जबकि सहायक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**स्पष्ट करो:** "सहायक पात्र का अर्थ \'अच्छा दोस्त\' नहीं, \'कहानी में नायक के साथ काम करने वाला\' है — भले ही वह नायक को.', '**वर्गीकरण करवाओ:** छात्र से 4-5 जानी-मानी कहानियों/फिल्मों के सहायक पात्रों की सूची बनवाओ और प्रत्येक को.', '**पाठ से प्रमाण:** पाठ्यपुस्तक की किसी कहानी (जैसे \'वसंत\' की कोई कहानी) से 2 सहायक पात्र चुनवाओ और प्रत्येक के **2-2.', '**लिखित अभ्यास:** "एक सहायक पात्र का संवाद लिखो जो नायक की मदद **नहीं** कर रहा, फिर भी कथानक के लिए आवश्यक है।" — इससे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_006', difficulty: 'standard',
          question: 'मुख्य विषय वह केंद्रीय विचार या संदेश है जो लेखक अपनी कहानी के माध्यम से पाठकों.',
          hint: 'यदि फंसें तो पात्र-चित्रण (विशेषकर नोड c6_hin_cbse_06_004 और c6_hin_cbse_06_005) की.',
          misconception: 'छात्र अक्सर मुख्य विषय को कहानी के अंत में दिए गए स्पष्ट निष्कर्ष या सीख (जैसे "ईमानदारी सबसे अच्छी नीति है") से समान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय वह केंद्रीय विचार या संदेश है जो लेखक अपनी कहानी के माध्यम से पाठकों तक',
                  options: ['मुख्य विषय वह केंद्रीय विचार या संदेश है जो लेखक अपनी कहानी के माध्यम से पाठकों तक', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,'],
                  hint: 'यदि फंसें तो पात्र-चित्रण (विशेषकर नोड c6_hin_cbse_06_004 और c6_hin_cbse_06_005) की अवधारणा को.',
                  misconception: 'छात्र अक्सर मुख्य विषय को कहानी के अंत में दिए गए स्पष्ट निष्कर्ष या सीख (जैसे "ईमानदारी सबसे अच्छी नीति है") से समान मान लेते हैं, जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहिए: "क्या आपने कभी ऐसा महसूस किया कि कोई फिल्म देखी लेकिन उसका \'सीधा-सीधा संदेश\' नहीं बताया गया, फिर भी आपको.', 'इससे हमें क्या समझ में आया?" ऐसा करने से वे अप्रत्यक्ष अर्थ को समझना शुरू कर देंगे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
