import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch12_p1: SimDef = {
    id: 'v3_c9_hin_ga_ch12_p1',
    title: 'पाठ 12 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 12 के रचनाकार (श्री सियारामशरण गुप्त) के जीवन-परिचय, उनकी साहित्यिक.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 12 · Part 1/3',
    chapters: ['c9_hin_ga_ch12'],
    nodeIds: ['c9_hin_ga_cbse_12_001', 'c9_hin_ga_cbse_12_002', 'c9_hin_ga_cbse_12_003', 'c9_hin_ga_cbse_12_004', 'c9_hin_ga_cbse_12_005', 'c9_hin_ga_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'कल्पना करें आप एक नई फिल्म देखने जा रहे हैं — क्या आप बिना जाने देखेंगे कि निर्देशक कौन है, फिल्म किस दौर की.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ तथा रचनाकार के जीवन, विचारधारा, लेखन-शैली और साहित्यिक योगदान का संक्षिप्त विवेचन, जिससे पाठ की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — पृष्ठभूमि', 'पाठ 12 — कथानक', 'पाठ 12 — पाठ्य-परिवेश', 'पाठ 12 — पात्र-चित्रण', 'पाठ 12 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 1/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित क्रमबद्ध.', answer: '12 -', options: ['12 -', '12 -'] },
            { id: 's2', label: '12 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण किसी रचना में चित्रित वह समग्र पृष्ठभूमि है जिसमें भौगोलिक स्थान.', answer: '12 -', options: ['12 -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_12_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी रचना के लिखे जाने का ऐतिहासिक.',
          hint: 'अगर फँसें तो कक्षा 8 की हिंदी पुस्तक के किसी पाठ का \'लेखक परिचय\' निकालें और पूछें — "इस.',
          misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ केवल लेखक की जन्मतिथि, मृत्युतिथि, प्रमुख रचनाओं की सूची.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी रचना में चित्रित वह समग्र पृष्ठभूमि है जिसमें भौगोलिक स्थान,', 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के **भौतिक, मानसिक,'],
                  hint: 'अगर फँसें तो कक्षा 8 की हिंदी पुस्तक के किसी पाठ का \'लेखक परिचय\' निकालें और पूछें — "इस जानकारी से.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ केवल लेखक की जन्मतिथि, मृत्युतिथि, प्रमुख रचनाओं की सूची रटना है। वे यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "लेखक की जीवनी मत पढ़ो, उनकी **आँखों से** उस दौर को देखो।" चरण 2: एक समय-रेखा बनवाएँ: 1900-1940.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित.',
          hint: 'अगर कारण-परिणाम चेन बनाने में अटकें तो \'पंचतंत्र\' की किसी छोटी कथा (जैसे \'सिंह और चूहा\').',
          misconception: 'छात्र अक्सर मानते हैं कि \'कथानक\' केवल घटनाओं की सूची (List of Events) है और \'आख्यान-संरचना\' केवल \'शुरुआत-मध्य-अंत\' का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित क्रमबद्ध',
                  options: ['कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित क्रमबद्ध', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'पाठ्य-परिवेश और वातावरण किसी रचना में चित्रित वह समग्र पृष्ठभूमि है जिसमें भौगोलिक स्थान,', 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के **भौतिक, मानसिक,'],
                  hint: 'अगर कारण-परिणाम चेन बनाने में अटकें तो \'पंचतंत्र\' की किसी छोटी कथा (जैसे \'सिंह और चूहा\') को घटनाओं.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'कथानक\' केवल घटनाओं की सूची (List of Events) है और \'आख्यान-संरचना\' केवल \'शुरुआत-मध्य-अंत\' का लेबल है। वे यह नहीं.' }
          ],
            remediations: { 'list-of-events-causal-chain': { steps: ['छात्र को एक परिचित कहानी (जैसे \'पंचतंत्र\' की कोई कथा) दें और कहें: "हर घटना के आगे तीर खींचो → अगली घटना क्यों घटी?" जब.', 'फिर पूछो: "अगर लेखक घटनाओं का क्रम बदल दे (अंत पहले बता दे), तो तुम्हारी प्रतिक्रिया कैसे बदलेगी?" 3.', 'इसे \'कथानक\' (तीर वाली चेन) और \'संरचना\' (क्रम बदलने का असर) के दो कॉलम में लिखवाएँ। 4.', 'अंत में फ्रेटैग पिरामिड पर दोनों को मैप करवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण किसी रचना में चित्रित वह समग्र पृष्ठभूमि है जिसमें.',
          hint: 'यदि अटका हुआ महसूस हो तो c9_hin_ga_cbse_12_002 (कथानक और आख्यान-संरचना) के \'कारण-कार्य.',
          misconception: 'छात्र \'पाठ्य-परिवेश\' को केवल \'कहाँ और कब\' (स्थान और समय) तक सीमित समझते हैं, और \'वातावरण\' को केवल \'मौसम/प्रकृति वर्णन\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण किसी रचना में चित्रित वह समग्र पृष्ठभूमि है जिसमें भौगोलिक स्थान,',
                  options: ['पाठ्य-परिवेश और वातावरण किसी रचना में चित्रित वह समग्र पृष्ठभूमि है जिसमें भौगोलिक स्थान,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित क्रमबद्ध', 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के **भौतिक, मानसिक,'],
                  hint: 'यदि अटका हुआ महसूस हो तो c9_hin_ga_cbse_12_002 (कथानक और आख्यान-संरचना) के \'कारण-कार्य विश्लेषण\'.',
                  misconception: 'छात्र \'पाठ्य-परिवेश\' को केवल \'कहाँ और कब\' (स्थान और समय) तक सीमित समझते हैं, और \'वातावरण\' को केवल \'मौसम/प्रकृति वर्णन\' मानते हैं। वे यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 12 का एक छोटा अंश (5-6 पंक्तियाँ) दें जहाँ केवल संवाद/क्रिया हो, स्पष्ट परिवेश वर्णन न हो। पूछें: "यहाँ.', 'नायक यह क्यों नहीं कह पा रहा जो वह सोच रहा है?" 2.', 'उसे तीन कॉलम बनाने को कहें: (क) पाठ में दिख रहा व्यवहार, (ख) परिवेश का कौन सा तत्व इसे बाध्य/प्रेरित कर रहा है, (ग) यदि.', 'फिर बोर्ड-शैली प्रश्न दें: "पाठ 12 में परिवेश नायक की मौन अभिव्यक्ति को कैसे अर्थ देता है?" — उत्तर में \'मौन\' को परिवेश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_004', difficulty: 'standard',
          question: 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के **भौतिक.',
          hint: 'यदि अटके हों, तो **कथानक संरचना (c9_hin_ga_cbse_12_002)** के \'चरमोत्कर्ष\' और \'पतन क्रिया\'.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि नायक के **भौतिक विवरण** (लंबाई, रंग, कपड़े, उम्र) लिख देने से पात्र-चित्रण पूरा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के **भौतिक, मानसिक,',
                  options: ['पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें नायक/प्रमुख पात्र के **भौतिक, मानसिक,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी रचना में चित्रित वह समग्र पृष्ठभूमि है जिसमें भौगोलिक स्थान,'],
                  hint: 'यदि अटके हों, तो **कथानक संरचना (c9_hin_ga_cbse_12_002)** के \'चरमोत्कर्ष\' और \'पतन क्रिया\' (falling.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि नायक के **भौतिक विवरण** (लंबाई, रंग, कपड़े, उम्र) लिख देने से पात्र-चित्रण पूरा हो जाता है। **क्यों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पाठ से 3 संवाद चुनें** जहाँ नायक दबाव में हो; प्रत्येक के आगे लिखें: "यह उसकी **कौन-सी आंतरिक इच्छा/भय** दर्शाता है?".', '**दो विरोधाभासी कार्य** ढूँढें (जैसे: सिद्धांत की बात करना, लेकिन व्यावहारिकता में समझौता करना); दोनों के लिए **PEEL.', '**चरित्र-परिवर्तन का ग्राफ** बनाएँ: X-अक्ष = कहानी के प्रमुख मोड़, Y-अक्ष = नायक की परिपक्वता/मूल्य; बिंदु जोड़कर.', 'अंत में **एक पैराग्राफ** लिखें: "नायक का सबसे बड़ा परिवर्तन ___ है, जो ___ घटना से उत्प्रेरित हुआ, और इसका कथानक पर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के समानांतर या अधीन रहकर.',
          hint: 'यदि अटका हुआ महसूस हो तो नोड 004 (नायक का चरित्र-चित्रण) के \'अप्रत्यक्ष चित्रण\' (Indirect.',
          misconception: 'छात्र मानते हैं कि सहायक पात्र का चरित्र-चित्रण करते समय केवल उसका \'स्वभाव\' (Nature: अच्छा/बुरा, दयालु/क्रूर) लिखना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के समानांतर या अधीन रहकर कथानक के',
                  options: ['सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के समानांतर या अधीन रहकर कथानक के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी रचना में चित्रित वह समग्र पृष्ठभूमि है जिसमें भौगोलिक स्थान,'],
                  hint: 'यदि अटका हुआ महसूस हो तो नोड 004 (नायक का चरित्र-चित्रण) के \'अप्रत्यक्ष चित्रण\' (Indirect.',
                  misconception: 'छात्र मानते हैं कि सहायक पात्र का चरित्र-चित्रण करते समय केवल उसका \'स्वभाव\' (Nature: अच्छा/बुरा, दयालु/क्रूर) लिखना पर्याप्त है। वे भूल.' }
          ],
            remediations: { 'nature': { steps: ['चरण 1: छात्र को एक परिचित फिल्म (जैसे \'3 Idiots\') का उदाहरण दें: रैंचो (नायक) के चरित्र को समझने के लिए फरहान (जुनून.', '(ब) इसके बिना कहानी में क्या कमी रह जाती?', '(स) इसका एक संवाद/कृत्य खोजो जो नायक की कमज़ोरी/ताकत दिखाए। चरण 3: इन उत्तरों को PEEL संरचना (Point, Evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_12_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जिसे रचनाकार.',
          hint: 'यदि अटका महसूस हो तो c9_hin_ga_cbse_12_002 (कथानक) और c9_hin_ga_cbse_12_004 (नायक चित्रण).',
          misconception: '**विशिष्ट भ्रम:** छात्र **मुख्य विषय** को **कथानक का सारांश** या **नैतिक शिक्षा (मोरल)** मान लेते हैं। **उदाहरण:** पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जिसे रचनाकार पूरी रचना',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जिसे रचनाकार पूरी रचना', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी रचना में चित्रित वह समग्र पृष्ठभूमि है जिसमें भौगोलिक स्थान,'],
                  hint: 'यदि अटका महसूस हो तो c9_hin_ga_cbse_12_002 (कथानक) और c9_hin_ga_cbse_12_004 (नायक चित्रण) दोबारा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **मुख्य विषय** को **कथानक का सारांश** या **नैतिक शिक्षा (मोरल)** मान लेते हैं। **उदाहरण:** पाठ 12 में यदि नायक अंत.' }
          ],
            remediations: { '12': { steps: ['**पहला कदम:** छात्र से कहें — "पाठ की 5 प्रमुख घटनाएं लिखो, फिर प्रत्येक के आगे लिखो: \'इससे लेखक क्या दिखाना चाहता.', '**दूसरा कदम:** दो विरोधी घटनाएं ढूंढने को कहें (जैसे नायक एक जगह सच बोलता है, दूसरी जगह झूठ) — पूछें "दोनों में क्या.', '**तीसरा कदम:** छात्र को **थीम स्टेटमेंट** लिखने का अभ्यास कराएं: "यह पाठ ______ के बारे में है, जो दिखाता है कि.', '**चौथा कदम:** बोर्ड के पुराने प्रश्नपत्रों से 2-3 प्रश्न दें जहां विषय पूछे गए हों — उनके मॉडल उत्तर दिखाएं कि कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
