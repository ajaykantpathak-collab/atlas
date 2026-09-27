import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch05_p1: SimDef = {
    id: 'v3_c7_hin_ch05_p1',
    title: 'पाठ 5 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 5 के लेखक के जीवन परिचय, उनकी साहित्यिक विशेषताओं, रचनाकालीन पृष्ठभूमि.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 5 · Part 1/3',
    chapters: ['c7_hin_ch05'],
    nodeIds: ['c7_hin_cbse_05_001', 'c7_hin_cbse_05_002', 'c7_hin_cbse_05_003', 'c7_hin_cbse_05_004', 'c7_hin_cbse_05_005', 'c7_hin_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करें कि आपको एक पुराना पारिवारिक पत्र मिला है जिसे पढ़कर आप समझ नहीं पा रहे कि दादाजी इतना भावुक क्यों.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता, रचनाकाल की सामाजिक-सांस्कृतिक परिस्थितियों तथा उस कृति की रचना-प्रक्रिया एवं उद्देश्य का व्यवस्थित अध्ययन है.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — पृष्ठभूमि', 'पाठ 5 — कथानक', 'पाठ 5 — पाठ्य-परिवेश', 'पाठ 5 — पात्र-चित्रण', 'पाठ 5 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 1/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना.', answer: '5 -', options: ['5 -', '5 -'] },
            { id: 's2', label: '5 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और.', answer: '5 -', options: ['5 -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी.',
          hint: 'यदि छात्र अटका हो तो **\'युग प्रवृत्तियाँ\' (Trends of the Literary Period)** — जैसे.',
          misconception: '**विशिष्ट भ्रांति:** *"पृष्ठभूमि और रचनाकार परिचय केवल \'परीक्षा में आने वाले तथ्य\' (नाम, जन्मतिथि, रचनाएँ) हैं; पाठ के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और', 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख पात्र (नायक) के'],
                  hint: 'यदि छात्र अटका हो तो **\'युग प्रवृत्तियाँ\' (Trends of the Literary Period)** — जैसे प्रगतिवाद की.',
                  misconception: '**विशिष्ट भ्रांति:** *"पृष्ठभूमि और रचनाकार परिचय केवल \'परीक्षा में आने वाले तथ्य\' (नाम, जन्मतिथि, रचनाएँ) हैं; पाठ के \'असली अर्थ\' (कहानी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**\'क्यों\' का खेल खेलें (5 मिनट):** छात्र से पूछें: *"अगर प्रेमचंद अमीर जमींदार के बेटे होते, तो \'कफ़न\' की कहानी कैसे.', '**\'समय-रेखा\' बनवाएं (Timeline Activity):** एक चार्ट पर दो समानांतर रेखाएँ खींचें: ऊपर **\'लेखक के जीवन की घटनाएँ\'**.', '**\'पाठ का बीज\' ढूंढें:** पाठ 5 के किसी एक प्रमुख पात्र/प्रसंग को चुनें और पूछें: *"लेखक ने इसे कहाँ से पाया होगा?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_002', difficulty: 'standard',
          question: 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि.',
          hint: 'यदि छात्र क्रम और कारण-प्रभाव संबंध में उलझ रहा है, तो कक्षा 6 के इतिहास नोड.',
          misconception: 'छात्र अक्सर मानते हैं कि कथानक का अर्थ केवल कहानी में होने वाली मुख्य घटनाओं की सूची बनाना है, जैसे "राजा गया, युद्ध.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना',
                  options: ['कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और', 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख पात्र (नायक) के'],
                  hint: 'यदि छात्र क्रम और कारण-प्रभाव संबंध में उलझ रहा है, तो कक्षा 6 के इतिहास नोड c6_sst_cbse_03_002 की.',
                  misconception: 'छात्र अक्सर मानते हैं कि कथानक का अर्थ केवल कहानी में होने वाली मुख्य घटनाओं की सूची बनाना है, जैसे "राजा गया, युद्ध हुआ, जीता, वापस आया"।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो समान सेट घटनाएँ दीजिए लेकिन अलग क्रम में: सेट A: "राजा जंगल गया → शेर से मिला → युद्ध जीता → महल लौटा" और.', 'क्यों?" फिर स्पष्ट कीजिए कि कथानक सिर्फ क्या हुआ है, बल्कि घटनाओं के क्रम से उत्पन्न होने वाले अर्थ, तनाव और पात्र के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और.',
          hint: 'यदि अटक जाएँ तो **कक्षा 6 पाठ 3 (ग्रामीण परिवेश), पाठ 7 (शहरी परिवेश), पाठ 9 (ऐतिहासिक.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'परिवेश = स्थान + काल\'** बस, और वातावरण अलग से कोई \'सजावटी\' चीज़ है जो लेखक मूड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और',
                  options: ['पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख पात्र (नायक) के'],
                  hint: 'यदि अटक जाएँ तो **कक्षा 6 पाठ 3 (ग्रामीण परिवेश), पाठ 7 (शहरी परिवेश), पाठ 9 (ऐतिहासिक परिवेश)** के.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'परिवेश = स्थान + काल\'** बस, और वातावरण अलग से कोई \'सजावटी\' चीज़ है जो लेखक मूड के लिए डाल देता है।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**संवेदी जागरूकता अभ्यास:** छात्र को आँखें बंद कराकर कक्षा का वातावरण महसूस कराएँ — "क्या सुनाई दे रहा है?', 'तुम्हें कैसा लग रहा है?" — फिर लिखवाएँ: **विवरण → भावना** का तीर खींचें। 2.', '**तुलनात्मक विश्लेषण:** एक ही स्थान (स्कूल मैदान) के दो चित्र दिखाएँ — सुबह की प्रार्थना सभा बनाम रात का सन्नाटा।.', 'स्थान वही है, फिर वातावरण क्यों बदला?" → **काल + जनसंख्या + ध्वनि/रोशनी = वातावरण परिवर्तन** स्पष्ट करें। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_004', difficulty: 'standard',
          question: 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख पात्र (नायक).',
          hint: 'यदि फँस जाएँ तो: कक्षा 6 के पात्र-चित्रण नोड्स (c6_hin_cbse_XX_004) दोहराएँ — विशेष रूप.',
          misconception: 'छात्र समझते हैं कि पात्र-चित्रण का अर्थ है नायक के **गुणों की सूची बनाना** (kind, brave, honest) और उसमें **सबसे अधिक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख पात्र (नायक) के',
                  options: ['पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख पात्र (नायक) के', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और'],
                  hint: 'यदि फँस जाएँ तो: कक्षा 6 के पात्र-चित्रण नोड्स (c6_hin_cbse_XX_004) दोहराएँ — विशेष रूप से "साक्ष्य.',
                  misconception: 'छात्र समझते हैं कि पात्र-चित्रण का अर्थ है नायक के **गुणों की सूची बनाना** (kind, brave, honest) और उसमें **सबसे अधिक गुण** लिखना ही अच्छा.' }
          ],
            remediations: { 'kind': { steps: ['**साक्ष्य-खोज अभ्यास:** छात्र को एक छोटा अंश (5-6 पंक्तियाँ) दें और कहें — "यहाँ नायक के बारे में **कोई तीन बातें** पता.', '**विरोधाभास-तालिका:** दो कॉलम बनाएँ — "नायक ने क्या कहा/सोचा" vs "नायक ने क्या किया" — किसी एक दृश्य के लिए भरवाएँ।.', '**चरित्र-ग्राफ:** कागज़ पर X-अक्ष पर अध्याय/घटना, Y-अक्ष पर "साहस/ईमानदारी/दृढ़ता" जैसा गुण — छात्र बिंदु लगाकर रेखा.', 'अंत में: "अब इन्हीं साक्ष्यों से एक पैराग्राफ लिखो" — PEEL संरचना (Point, Evidence, Explanation, Link) का मॉडल दिखाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो कथा में नायक/प्रमुख पात्र के साथ रहकर कथानक को.',
          hint: 'यदि अटका हो तो कक्षा ६ के \'पात्र-चित्रण: सहायक पात्र\' (c6_hin_cbse_05_005) का \'प्रकार और.',
          misconception: 'छात्र समझते हैं कि \'सहायक पात्र\' का अर्थ केवल \'नायक का दोस्त जो मदद करे\' होता है, जबकि साहित्य में सहायक पात्र शत्रु.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो कथा में नायक/प्रमुख पात्र के साथ रहकर कथानक को आगे',
                  options: ['सहायक पात्र वे पात्र होते हैं जो कथा में नायक/प्रमुख पात्र के साथ रहकर कथानक को आगे', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और'],
                  hint: 'यदि अटका हो तो कक्षा ६ के \'पात्र-चित्रण: सहायक पात्र\' (c6_hin_cbse_05_005) का \'प्रकार और भूमिका\'.',
                  misconception: 'छात्र समझते हैं कि \'सहायक पात्र\' का अर्थ केवल \'नायक का दोस्त जो मदद करे\' होता है, जबकि साहित्य में सहायक पात्र शत्रु (शकुनी), व्यंग्यकार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: छात्र से पूछो — \'क्या शकुनी दुर्योधन का सहायक पात्र था?', 'क्यों?\' चरण २: यदि वह \'नहीं\' कहे, तो समझाओ: \'शकुनी दुर्योधन की बुराई बढ़ाता था, पर उसी के कारण दुर्योधन का चरित्र खुला.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_006', difficulty: 'standard',
          question: '**मुख्य विषय** वह केंद्रीय विचार (central idea) है जो पूरे पाठ में बार-बार.',
          hint: 'अगर फँस जाएँ तो **c7_hin_cbse_05_004 (नायक पात्र-चित्रण)** और **c7_hin_cbse_05_002 (कथानक.',
          misconception: '**सबसे गहरी भ्रांति:** छात्र **मुख्य विषय** को **एक वाक्य का नैतिक उपदेश (moral)** मान लेते हैं — जैसे "सच बोलना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय** वह केंद्रीय विचार (central idea) है जो पूरे पाठ में बार-बार उभरता है और',
                  options: ['**मुख्य विषय** वह केंद्रीय विचार (central idea) है जो पूरे पाठ में बार-बार उभरता है और', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और'],
                  hint: 'अगर फँस जाएँ तो **c7_hin_cbse_05_004 (नायक पात्र-चित्रण)** और **c7_hin_cbse_05_002 (कथानक संरचना)**.',
                  misconception: '**सबसे गहरी भ्रांति:** छात्र **मुख्य विषय** को **एक वाक्य का नैतिक उपदेश (moral)** मान लेते हैं — जैसे "सच बोलना चाहिए"। वे नहीं समझते कि.' }
          ],
            remediations: { 'moral-complex-human-tension': { steps: ['**चरण 1 — अंतर स्पष्ट करो:** छात्र के सामने दो वाक्य रखो: (क) "कहानी में राम ने सच बोला और जीत गया।" (ख) "सत्य निडरता.', '**चरण 2 — "क्यों?" की सीढ़ी चढ़ाओ:** छात्र के हर उत्तर पर पूछो "लेकिन *क्यों* महत्वपूर्ण है?" — जब तक वह घटना से विचार.', '**चरण 3 — तीन-स्तंभ तालिका बनवाओ:** | घटना (क्या हुआ) | पात्र की प्रतिक्रिया | बड़ा विचार (क्या उभरा) | — इसे 3.', '**चरण 4 — स्वयं का जीवन जोड़ो:** पूछो "तुम्हारे जीवन में ऐसा कब हुआ जब यह बड़ा विचार तुम्हारे सामने आया?" — यही संदेश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
