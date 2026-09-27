import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch01_p1: SimDef = {
    id: 'v3_c8_hin_ch01_p1',
    title: 'पाठ 1 · Part 1/3',
    subtitle: 'This node covers *only* the background of the specific Chapter 1 text prescribed in the.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 1 · Part 1/3',
    chapters: ['c8_hin_ch01'],
    nodeIds: ['c8_hin_cbse_01_001', 'c8_hin_cbse_01_002', 'c8_hin_cbse_01_003', 'c8_hin_cbse_01_004', 'c8_hin_cbse_01_005', 'c8_hin_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'Have you ever wondered why a character in a story speaks a certain dialect or fears a specific thing?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural context (पृष्ठभूमि) in which a literary work was created, alongside the biographical details, literary style.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        labels: ['पाठ 1 — पृष्ठभूमि', 'पाठ 1 — कथानक', 'पाठ 1 — पाठ्य-परिवेश', 'पाठ 1 — पात्र-चित्रण', 'पाठ 1 — मुख्य'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 1/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative.', answer: '1 -', options: ['1 -', '1 -'] },
            { id: 's2', label: '1 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और.', answer: '1 -', options: ['1 -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and.',
          hint: 'यदि अटके: **\'रचनाकार की जीवनी के 3 निर्णायक मोड़\' (3 Turning Points in Author\'s.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि\' का अर्थ केवल **तारीखें, स्थान और ऐतिहासिक घटनाओं की सूची** याद करना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी के प्रमुख पात्र'],
                  hint: 'यदि अटके: **\'रचनाकार की जीवनी के 3 निर्णायक मोड़\' (3 Turning Points in Author\'s Biography)** और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि\' का अर्थ केवल **तारीखें, स्थान और ऐतिहासिक घटनाओं की सूची** याद करना है। वे यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (संबंध जोड़ो):** छात्र से पूछें: "अगर तुम आज एक कहानी लिखो \'मोबाइल फोन खो जाने पर\', तो तुम्हारी उम्र, तुम्हारा.', '**चरण 2 (रचनाकार पर लागू करो):** अब कहें: "रचनाकार [नाम] ने जब यह पाठ लिखा, उनकी \'आर्थिक/सामाजिक स्थिति\' [विवरण] थी।.', '**चरण 3 (साक्ष्य ढूंढो):** पाठ से **एक संवाद/वाक्य** छाँटने को कहें जो रचनाकार की उसी स्थिति की गवाही देता हो। 4.', '**चरण 4 (सामान्यीकरण):** समझाएँ: "पृष्ठभूमि याद रखने के लिए नहीं, **पाठ के \'क्यों\' (Why) को खोलने की चाबी** के लिए पढ़ी.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना.',
          hint: 'यदि अटका हुआ लगे: Class 7 की किसी कहानी (जैसे \'नटखट चूहा\' या पाठ्यपुस्तक की कहानी) का.',
          misconception: 'छात्र अक्सर मानते हैं कि **\'कथानक = आख्यान-संरचना\'** क्योंकि दोनों \'कहानी का क्रम\' लगते हैं। वे फ्लैशबैक को केवल \'पीछे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative',
                  options: ['कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी के प्रमुख पात्र'],
                  hint: 'यदि अटका हुआ लगे: Class 7 की किसी कहानी (जैसे \'नटखट चूहा\' या पाठ्यपुस्तक की कहानी) का घटनाक्रम.',
                  misconception: 'छात्र अक्सर मानते हैं कि **\'कथानक = आख्यान-संरचना\'** क्योंकि दोनों \'कहानी का क्रम\' लगते हैं। वे फ्लैशबैक को केवल \'पीछे जाना\' समझते हैं, न.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "कहानी की 5 बड़ी घटनाएँ कालानुक्रम में लिखो (1,2,3,4,5)। अब पाठ खोलो और देखो लेखक ने उन्हें किस क्रम में.', 'पूछें: "लेखक ने 3 से क्यों शुरू किया?', 'अगर 1 से शुरू करता तो क्या फर्क पड़ता?" — इससे संरचना का *उद्देश्य* स्पष्ट होता है। 3.', 'दो रंगों के पेन दें: एक से कथानक क्रम (समय), दूसरे से आख्यान क्रम (पाठ) अंकित करवाएँ। दृश्य अंतर (visual gap) गलतफहमी.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक.',
          hint: 'यदि अटका हुआ महसूस हो, तो **\'संवेदनात्मक ब्योरों की सूची बनाना\' (Sensory Details.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'परिवेश\' = कहानी का स्थान (Setting)** और **\'वातावरण\' = मौसम/मूड** — और दोनों को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और',
                  options: ['पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी के प्रमुख पात्र'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **\'संवेदनात्मक ब्योरों की सूची बनाना\' (Sensory Details Inventory)** का.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'परिवेश\' = कहानी का स्थान (Setting)** और **\'वातावरण\' = मौसम/मूड** — और दोनों को अलग-अलग डिब्बों में.' }
          ],
            remediations: { 'setting': { steps: ['**दृश्य-आधारित पुनर्प्रवेश:** छात्र को एक छोटा वीडियो क्लिप (बिना संवाद, केवल परिवेश ध्वनि/दृश्य) दिखाएँ — जैसे: गाँव.', 'किन आवाज़ों/रंगों/गंधों ने यह एहसास दिलाया?" → वातावरण के तत्व पहचानें। 2.', '**कारण खोज:** फिर पूछें: "यह मेला/अस्पताल ऐसा क्यों दिखता है?', 'इसके पीछे कौन-सा समाज, इतिहास, अर्थव्यवस्था काम कर रहा है?" → परिवेश से जोड़ें। 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी के प्रमुख.',
          hint: 'यदि छात्र अटके, तो **कक्षा 7 के पात्र-चित्रण नमूने (c7_hin_cbse_01_004)** की समीक्षा करें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण = पात्र के बारे में **सभी ज्ञात तथ्यों की सूची** (नाम, उम्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी के प्रमुख पात्र',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी के प्रमुख पात्र', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि छात्र अटके, तो **कक्षा 7 के पात्र-चित्रण नमूने (c7_hin_cbse_01_004)** की समीक्षा करें — विशेषकर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण = पात्र के बारे में **सभी ज्ञात तथ्यों की सूची** (नाम, उम्र, परिवार, शौक, कपड़े, बोली.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**साक्ष्य-गुण जोड़ी (Evidence-Trait Pairing) अभ्यास:** पाठ से 5 वाक्य छाँटें जहाँ नायक कुछ करता/कहता/सोचता है। प्रत्येक.', '**गुण-समूहन (Trait Clustering):** सभी जोड़ियों को 3-4 समूहों में बाँटें (जैसे: साहस, संवेदनशीलता, जिद)। प्रत्येक समूह.', '**विकास-रेखा (Arc Mapping):** समय-रेखा बनाएँ — कहानी के आरंभ, मध्य, अंत में नायक का प्रमुख गुण क्या था?', '**विषय-संबंध (Theme Link):** अंत में एक वाक्य लिखें: "नायक की यह यात्रा कहानी के विषय ______ को कैसे प्रमाणित करती है?".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटका लगे, तो c8_hin_cbse_01_004 के \'WORKED_EXAMPLE_1\' को दोहराएँ — वहाँ नायक के गुणों.',
          misconception: 'छात्र मानते हैं कि "सहायक पात्र = नायक का दोस्त/सहयोगी" — वे \'सहायक\' शब्द के दैनिक अर्थ (helper) को साहित्यिक अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटका लगे, तो c8_hin_cbse_01_004 के \'WORKED_EXAMPLE_1\' को दोहराएँ — वहाँ नायक के गुणों को.',
                  misconception: 'छात्र मानते हैं कि "सहायक पात्र = नायक का दोस्त/सहयोगी" — वे \'सहायक\' शब्द के दैनिक अर्थ (helper) को साहित्यिक अर्थ (characterization aid).' }
          ],
            remediations: { 'helper-characterization-aid': { steps: ['छात्र से पूछो: "अगर कहानी में नायक का कोई विरोधी न होता, तो नायक की बहादुरी कैसे पता चलती?" — जब वह सोचे, तब समझाओ.', 'एक परिचित फिल्म/कहानी (जैसे *तारे ज़मीन पर* का कला शिक्षक या *शोले* का गब्बर) लेकर पूछो: "यह पात्र नायक का दोस्त है या.', 'फिर भी यह नायक के बारे में क्या बताता है?" 3.', 'फिर पाठ से एक दृश्य चुनकर साथ में विश्लेषण करो: "यहाँ सहायक पात्र नायक से असहमत है — फिर भी यह नायक का कौन-सा गुण दिखा.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_006', difficulty: 'standard',
          question: '**मुख्य विषय (मूल भाव/Theme)** वह केंद्रीय विचार या सार्वभौमिक सत्य है जो.',
          hint: 'यदि अटके तो **c8_hin_cbse_01_004 (नायक पात्र-चित्रण)** दोहराओ — नायक के "गुण-दोष" नहीं.',
          misconception: '**विषय = कथानक का सारांश** — यह सबसे गहरी भ्रांति है। छात्र सोचते हैं "कहानी यह हुई, इसलिए विषय यह है"। वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (मूल भाव/Theme)** वह केंद्रीय विचार या सार्वभौमिक सत्य है जो संपूर्ण रचना',
                  options: ['**मुख्य विषय (मूल भाव/Theme)** वह केंद्रीय विचार या सार्वभौमिक सत्य है जो संपूर्ण रचना', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटके तो **c8_hin_cbse_01_004 (नायक पात्र-चित्रण)** दोहराओ — नायक के "गुण-दोष" नहीं, उसके.',
                  misconception: '**विषय = कथानक का सारांश** — यह सबसे गहरी भ्रांति है। छात्र सोचते हैं "कहानी यह हुई, इसलिए विषय यह है"। वास्तव में **कथानक वाहन (Vehicle).' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ो (Re-read):** पाठ के **तीन निर्णायक मोड़ (Turning points)** चिह्नित करो जहाँ पात्र ने **चुनाव (Choice)**.', '**पूछो "क्यों?":** प्रत्येक चुनाव के लिए — "पात्र ने X क्यों चुना, Y क्यों नहीं?" उत्तर में छिपा मूल्य (Value) लिखो। 3.', '**पैटर्न ढूँढो:** तीनों मूल्यों में **साझा शब्द (Common thread)** कौन-सा है?', '**PEEL लिखो:** एक पैराग्राफ में — Point (विषय), Evidence (तीनों प्रसंग), Explanation (कैसे प्रमाणित), Link (संदेश)। 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
