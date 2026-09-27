import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch01_p1: SimDef = {
    id: 'v3_c9_hin_ga_ch01_p1',
    title: 'पाठ 1 · Part 1/3',
    subtitle: 'इस नोड में कक्षा 9 के पाठ्यक्रम अनुसार निर्धारित पाठ 1 के लेखक का जीवन परिचय, उनकी प्रमुख.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 1 · Part 1/3',
    chapters: ['c9_hin_ga_ch01'],
    nodeIds: ['c9_hin_ga_cbse_01_001', 'c9_hin_ga_cbse_01_002', 'c9_hin_ga_cbse_01_003', 'c9_hin_ga_cbse_01_004', 'c9_hin_ga_cbse_01_005', 'c9_hin_ga_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'मान लीजिए आपके सामने एक बंद डिब्बा रखा है जिस पर कुछ लिखा नहीं है — क्या आप बता सकते हैं कि अंदर क्या है?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय, किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश तथा लेखक के व्यक्तित्व, विचारधारा एवं साहित्यिक योगदान का वह आधारभूत अध्ययन है जो पाठ के आशय, भावभूमि और शिल्प.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — पृष्ठभूमि', 'पाठ 1 — कथानक', 'पाठ 1 — पाठ्य-परिवेश', 'पाठ 1 — पात्र-चित्रण', 'पाठ 1 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_01_006', title: 'पाठ 1 — मुख्य विषय और संदेश',
          caseStudy: { intro: 'Think about the last time you argued with a friend and later realized the fight wasn\'t about the dirty dishes but about *feeling unheard* — the dishes were the.',
            decisions: [{ prompt: 'पाठ के \'मुख्य विषय\' (Central Theme) और \'कथानक\' (Plot) में मूलभूत अंतर क्या है? संक्षेप में स्पष्ट कीजिए।', options: [
                { text: '**Correct Answer:** कथानक घटनाओं का क्रमबद्ध विवरण है (\'क्या हुआ\'), जबकि मुख्य विषय उन', outcome: '**Correct Answer:** कथानक घटनाओं का क्रमबद्ध विवरण है (\'क्या हुआ\'), जबकि मुख्य विषय उन घटनाओं के.' },
                { text: 'Theme is the summary of the story', outcome: 'Not quite — **Specific Error:** Students identify a **topic word** (e.g., "गरीबी/Poverty", "सूखा/Drought".', reveals: 'specific-error-students-identify-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय, किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक.',
          hint: 'यदि फँसें तो **\'हिंदी साहित्य का इतिहास: प्रमुख प्रवृत्तियाँ और विशेषताएँ\'** (कक्षा 9/10.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि\' का अर्थ केवल **ऐतिहासिक तारीखें और घटनाएँ** रटना है (जैसे: 1880 में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय, किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश',
                  options: ['पृष्ठभूमि और रचनाकार परिचय, किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', '**कथानक** घटनाओं का तार्किक और कारण-कार्य संबंध से युक्त क्रमबद्ध विन्यास है जो रचना के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **काल (समय), स्थान (भूगोल),', 'नायक/प्रमुख पात्र वह केंद्रीय चरित्र है जिसके लक्ष्य, संघर्ष, निर्णय और परिवर्तन कथानक को'],
                  hint: 'यदि फँसें तो **\'हिंदी साहित्य का इतिहास: प्रमुख प्रवृत्तियाँ और विशेषताएँ\'** (कक्षा 9/10.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि\' का अर्थ केवल **ऐतिहासिक तारीखें और घटनाएँ** रटना है (जैसे: 1880 में जन्म, 1936 में.' }
          ],
            remediations: { '1880': { steps: ['**तुलनात्मक तालिका बनवाएँ:** दो स्तंभ — \'लेखक के जीवन का तथ्य\' (बायाँ) और \'पाठ पर प्रभाव\' (दायाँ)। उदाहरण: तथ्य.', '**\'क्यों?\' का अभ्यास:** हर तथ्य के बाद छात्र से पूछें — "तो क्या हुआ?', 'पाठ में इसका निशान कहाँ दिखता है?" जब तक वह 2-3 ठोस प्रमाण न दे दे, आगे न बढ़ें। 3.', '**लघु लेखन कार्य:** छात्र से कहें — "लेखक की नज़र से अपने गली/मोहल्ले का एक दृश्य 5 पंक्तियों में लिखो।" फिर चर्चा करें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_002', difficulty: 'standard',
          question: '**कथानक** घटनाओं का तार्किक और कारण-कार्य संबंध से युक्त क्रमबद्ध विन्यास है जो.',
          hint: 'यदि अटका हुआ लगे: "कहानी vs कथानक" का अंतर दोहराएं — उदाहरण: "राम ने रावण मारा" (कहानी).',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि **"चरमोत्कर्ष (Climax) = सबसे रोमांचक/एक्शन-भरा दृश्य"**। **गलत तर्क:** वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक** घटनाओं का तार्किक और कारण-कार्य संबंध से युक्त क्रमबद्ध विन्यास है जो रचना के',
                  options: ['**कथानक** घटनाओं का तार्किक और कारण-कार्य संबंध से युक्त क्रमबद्ध विन्यास है जो रचना के', 'पृष्ठभूमि और रचनाकार परिचय, किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **काल (समय), स्थान (भूगोल),', 'नायक/प्रमुख पात्र वह केंद्रीय चरित्र है जिसके लक्ष्य, संघर्ष, निर्णय और परिवर्तन कथानक को'],
                  hint: 'यदि अटका हुआ लगे: "कहानी vs कथानक" का अंतर दोहराएं — उदाहरण: "राम ने रावण मारा" (कहानी) vs "राम ने.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि **"चरमोत्कर्ष (Climax) = सबसे रोमांचक/एक्शन-भरा दृश्य"**। **गलत तर्क:** वे एक्शन, लड़ाई, या.' }
          ],
            remediations: { 'climax': { steps: ['**चरण 1:** विद्यार्थी से पूछें: "कहानी का वह कौन-सा क्षण है जिसके बाद **कुछ भी पहले जैसा नहीं रह सकता**?" — यही.', '**चरण 2:** पाठ से दो दृश्य चुनें — एक "रोमांचक" (जैसे झगड़ा), एक "निर्णायक" (जैसे संकल्प/फैसला) — और पूछें: "कौन-सा.', '**चरण 3:** फ्रेटैग पिरामिड पर दोनों को रखवाएं — रोमांचक दृश्य अक्सर **विकास** या **चरमोत्कर्ष से ठीक पहले** होता है.', '**चरण 4:** अभ्यास: 3 लघु कथाएँ दें, प्रत्येक में चरमोत्कर्ष पहचानने को कहें — तुरंत फीडबैक दें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **काल (समय), स्थान (भूगोल).',
          hint: 'अगर अटका हुआ महसूस करो तो: **"कथानक संरचना" (नोड 002) के \'घटना-स्थल\' कॉलम को फिर से देखो.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि **"परिवेश = स्थान + समय"** (केवल जहाँ और कब)। वे **सामाजिक परिवेश** (जाति, वर्ग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **काल (समय), स्थान (भूगोल),',
                  options: ['पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **काल (समय), स्थान (भूगोल),', 'पृष्ठभूमि और रचनाकार परिचय, किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', '**कथानक** घटनाओं का तार्किक और कारण-कार्य संबंध से युक्त क्रमबद्ध विन्यास है जो रचना के', 'नायक/प्रमुख पात्र वह केंद्रीय चरित्र है जिसके लक्ष्य, संघर्ष, निर्णय और परिवर्तन कथानक को'],
                  hint: 'अगर अटका हुआ महसूस करो तो: **"कथानक संरचना" (नोड 002) के \'घटना-स्थल\' कॉलम को फिर से देखो — हर घटना.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि **"परिवेश = स्थान + समय"** (केवल जहाँ और कब)। वे **सामाजिक परिवेश** (जाति, वर्ग, लिंग मानदंड.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — ठोस उदाहरण से शुरू करो**: छात्र को उसका अपना कमरा देखने को कहो — "क्या तुम्हारे कमरे में पड़े किताबों के ढेर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_004', difficulty: 'standard',
          question: 'नायक/प्रमुख पात्र वह केंद्रीय चरित्र है जिसके लक्ष्य, संघर्ष, निर्णय और.',
          hint: 'यदि \'निर्णायक क्षण\' न पहचान पा रहे हों तो **कथानक के उत्कर्ष (climax) बिंदु** पर लौटें.',
          misconception: '**विशिष्ट भ्रांति:** "नायक के गुणों की सूची बनाना (ईमानदार, बहादुर, दयालु) ही चरित्र-चित्रण है।" **गलत तर्क:** छात्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'नायक/प्रमुख पात्र वह केंद्रीय चरित्र है जिसके लक्ष्य, संघर्ष, निर्णय और परिवर्तन कथानक को',
                  options: ['नायक/प्रमुख पात्र वह केंद्रीय चरित्र है जिसके लक्ष्य, संघर्ष, निर्णय और परिवर्तन कथानक को', 'पृष्ठभूमि और रचनाकार परिचय, किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', '**कथानक** घटनाओं का तार्किक और कारण-कार्य संबंध से युक्त क्रमबद्ध विन्यास है जो रचना के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **काल (समय), स्थान (भूगोल),'],
                  hint: 'यदि \'निर्णायक क्षण\' न पहचान पा रहे हों तो **कथानक के उत्कर्ष (climax) बिंदु** पर लौटें — नायक का.',
                  misconception: '**विशिष्ट भ्रांति:** "नायक के गुणों की सूची बनाना (ईमानदार, बहादुर, दयालु) ही चरित्र-चित्रण है।" **गलत तर्क:** छात्र मध्य विद्यालय में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read) चरण:** छात्र से कहो — "पाठ के केवल वे अंश पढ़ो जहाँ नायक **बोलता** है या **निर्णय लेता** है; शेष.', '**रंग-कोडिंग (Color-coding):** तीन रंगों से चिह्नित कराओ — **नीला** (बाहरी विवरण), **लाल** (आंतरिक द्वंद्व/संवाद).', '**संवाद-आधारित चार्ट:** एक टेबल बनवाओ — स्तंभ: प्रसंग | संवाद/कार्य | द्वंद्व प्रकार | तत्काल परिणाम | दीर्घकालिक.', '**मौखिक रिहर्सल:** छात्र को 2 मिनट में नायक की यात्रा **कहानी की तरह** सुनाने को कहो — यदि वह \'फिर उसने यह किया, फिर वह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो कथा में नायक/प्रमुख पात्र.',
          hint: 'यदि अटका हुआ महसूस हो तो: नोड 004 के WORKED_EXAMPLE_1 को दोहराएँ — नायक के लिए PEEL लिखने.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "सहायक पात्र = नायक का मित्र/सहयोगी" और "विरोधी पात्र (antagonist) = खलनायक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो कथा में नायक/प्रमुख पात्र के साथ सीधे',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र हैं जो कथा में नायक/प्रमुख पात्र के साथ सीधे', 'पृष्ठभूमि और रचनाकार परिचय, किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', '**कथानक** घटनाओं का तार्किक और कारण-कार्य संबंध से युक्त क्रमबद्ध विन्यास है जो रचना के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **काल (समय), स्थान (भूगोल),'],
                  hint: 'यदि अटका हुआ महसूस हो तो: नोड 004 के WORKED_EXAMPLE_1 को दोहराएँ — नायक के लिए PEEL लिखने का अभ्यास.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "सहायक पात्र = नायक का मित्र/सहयोगी" और "विरोधी पात्र (antagonist) = खलनायक (villain)"। **गलत.' }
          ],
            remediations: { 'antagonist-villain-functional-role-moral': { steps: ['**पुनः पठन (Re-reading):** छात्र से कहें: "पाठ के उस अंश को फिर पढ़ें जहाँ यह पात्र नायक को सलाह/चेतावनी देता है। उसके.', '**द्वि-आयामी विश्लेषण (Two-axis analysis):** एक शीट पर दो अक्ष खींचें: X-अक्ष = **नायक के प्रति संबंध.', '**लेखकीय उद्देश्य (Authorial intent):** पूछें: "लेखक ने इस पात्र को *यही* सलाह देने के लिए क्यों गढ़ा?', 'यदि वह नायक का साथ देता तो कथानक/विषय कैसे बदल जाता?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_006', difficulty: 'standard',
          question: 'The \'मुख्य विषय\' (Central Theme) is the universal idea, insight, or message.',
          hint: 'Review \'Plot Structure\' (node 002) to map the climax/resolution, and \'Character Sketch\'.',
          misconception: '**Specific Error:** Students identify a **topic word** (e.g., "गरीबी/Poverty", "सूखा/Drought", "भाईचारा/Brotherhood").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The \'मुख्य विषय\' (Central Theme) is the universal idea, insight, or message about',
                  options: ['The \'मुख्य विषय\' (Central Theme) is the universal idea, insight, or message about', 'पृष्ठभूमि और रचनाकार परिचय, किसी साहित्यिक कृति के ऐतिहासिक, सामाजिक, सांस्कृतिक परिवेश', '**कथानक** घटनाओं का तार्किक और कारण-कार्य संबंध से युक्त क्रमबद्ध विन्यास है जो रचना के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **काल (समय), स्थान (भूगोल),'],
                  hint: 'Review \'Plot Structure\' (node 002) to map the climax/resolution, and \'Character Sketch\' (node 004).',
                  misconception: '**Specific Error:** Students identify a **topic word** (e.g., "गरीबी/Poverty", "सूखा/Drought", "भाईचारा/Brotherhood") and label it the.' }
          ],
            remediations: { 'specific-error-students-identify-a': { steps: ['**Step 1 - Topic vs Statement Drill:** Give the student 5 topic words from the chapter (e.g., सूखा, विश्वासघात, बलिदान.', 'Ask them to convert each into a **Thematic Statement** using the frame: "[Topic] reveals/ shows/ forces/ teaches that.', '**Step 2 - Evidence Mapping:** Take the *one* thematic statement they wrote best.', 'Ask: "Find **three** moments in the text (page/para ref) that *prove* this sentence." If they find only plot points.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
