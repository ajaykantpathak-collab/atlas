import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch01_p2: SimDef = {
    id: 'v3_c8_hin_ch01_p2',
    title: 'पाठ 1 · Part 2/3',
    subtitle: 'इस नोड में **केवल गौण विषय की पहचान, वर्गीकरण, मुख्य विषय से संबंध, और उत्तर-लेखन कौशल**.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 1 · Part 2/3',
    chapters: ['c8_hin_ch01'],
    nodeIds: ['c8_hin_cbse_01_007', 'c8_hin_cbse_01_008', 'c8_hin_cbse_01_009', 'c8_hin_cbse_01_010', 'c8_hin_cbse_01_011', 'c8_hin_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'क्या तुमने कभी **\'दंगल\'** फिल्म देखी? मुख्य विषय है — *पहलवानी में बेटियों को विश्व-चैंपियन बनाना*। लेकिन साथ.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — गौण विषय', text: 'गौण विषय (Sub-theme) वह **द्वितीयक कथ्य** है जो रचना के **मुख्य विषय** के समानांतर चलता है, उसे **समृद्ध**, **विस्तारित** या **संदर्भित** करता है, परंतु रचना का **केंद्रीय उद्देश्य** नहीं होता।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        labels: ['पाठ 1 — गौण', 'पाठ 1 — साहित्यिक', 'पाठ 1 — पदावली', 'पाठ 1 — व्याकरण', 'पाठ 1 — बोध-प्रश्न'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 2/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचनाओं, काल, वाच्य, और अलंकारिक.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ से सीधे, एक ही सही तथ्य के रूप में.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह **द्वितीयक कथ्य** है जो रचना के **मुख्य विषय** के.',
          hint: 'यदि अटके तो **c8_hin_cbse_01_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — विशेष रूप से.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'गौण विषय\' = \'कम महत्वपूर्ण विषय\'** मानते हैं क्योंकि \'गौण\' शब्द का दैनिक अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह **द्वितीयक कथ्य** है जो रचना के **मुख्य विषय** के समानांतर चलता',
                  options: ['गौण विषय (Sub-theme) वह **द्वितीयक कथ्य** है जो रचना के **मुख्य विषय** के समानांतर चलता', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि अटके तो **c8_hin_cbse_01_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें — विशेष रूप से **\'मुख्य विषय.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'गौण विषय\' = \'कम महत्वपूर्ण विषय\'** मानते हैं क्योंकि \'गौण\' शब्द का दैनिक अर्थ \'द्वितीयक/कमतर\' होता है। **गलत.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को **\'गौण\' शब्द का भाषाई अर्थ** समझाओ — संस्कृत \'गौण\' = \'अनुगामी, सहायक\' (गौण = गौ + अनु = पीछे चलने.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_008', difficulty: 'standard',
          question: '**बिंब (Imagery):** शब्दों के माध्यम से पाँचों इंद्रियों (दृश्य, श्रवण, घ्राण.',
          hint: 'यदि फंसे: **कक्षा 7 के बिंब/रूपक पहचान अभ्यास (c7_hin_cbse_01_008 आदि) दोहराएं** — विशेष.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'रूपक\' और \'प्रतीक (Symbol)\' को एक मान लेते हैं**। उदाहरण: "कविता में \'दीपक\' आया है, यह रूपक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** शब्दों के माध्यम से पाँचों इंद्रियों (दृश्य, श्रवण, घ्राण, स्पर्श,',
                  options: ['**बिंब (Imagery):** शब्दों के माध्यम से पाँचों इंद्रियों (दृश्य, श्रवण, घ्राण, स्पर्श,', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि फंसे: **कक्षा 7 के बिंब/रूपक पहचान अभ्यास (c7_hin_cbse_01_008 आदि) दोहराएं** — विशेष रूप से.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'रूपक\' और \'प्रतीक (Symbol)\' को एक मान लेते हैं**। उदाहरण: "कविता में \'दीपक\' आया है, यह रूपक है ज्ञान का।".' }
          ],
            remediations: { 'symbol': { steps: ['**चरणबद्ध उपचार (3 दिन):** **दिन 1:** 5 वाक्य दें — कुछ रूपक, कुछ प्रतीक। छात्र से कहें: "हर वाक्य में पूछो: **क्या यह.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_009', difficulty: 'standard',
          question: '**विरोधाभास** एक साहित्यिक युक्ति है जहाँ दो परस्पर विरोधी बातें एक साथ रखी.',
          hint: 'अगर अटके तो **c8_hin_cbse_01_008 (बिंब और रूपक)** के कार्य उदाहरण दोहराएँ — विशेषकर.',
          misconception: 'छात्र अक्सर **विरोधाभास को केवल "विरोधी शब्दों का युग्म" (जैसे: दिन-रात, सुख-दुख) समझ लेते हैं** और प्रतीक को **"एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** एक साहित्यिक युक्ति है जहाँ दो परस्पर विरोधी बातें एक साथ रखी जाती हैं ताकि',
                  options: ['**विरोधाभास** एक साहित्यिक युक्ति है जहाँ दो परस्पर विरोधी बातें एक साथ रखी जाती हैं ताकि', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'अगर अटके तो **c8_hin_cbse_01_008 (बिंब और रूपक)** के कार्य उदाहरण दोहराएँ — विशेषकर "चित्र ढूँढ़ो →.',
                  misconception: 'छात्र अक्सर **विरोधाभास को केवल "विरोधी शब्दों का युग्म" (जैसे: दिन-रात, सुख-दुख) समझ लेते हैं** और प्रतीक को **"एक चीज़ दूसरी चीज़ के लिए.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**विरोधाभास के लिए**: छात्र से कहें — "पाठ का वह वाक्य ढूँढ़ो जहाँ तुम पढ़कर रुके और सोचा \'यह कैसे हो सकता है?\' — वही.', '**प्रतीक के लिए**: छात्र से कहें — "पाठ में कोई वस्तु/चित्र तीन बार आए तो उसे घेरो। हर बार उसके आसपास के भाव लिखो (पहली.', '**संयुक्त अभ्यास**: एक छोटा अनुच्छेद दें जिसमें दोनों हों; छात्र को **रंगीन पेंसिल** से विरोधाभास को लाल और प्रतीक को.', 'अंत में: छात्र से **एक वाक्य में** लिखवाएँ — "यह विरोधाभास/प्रतीक पाठ का कौन-सा राज़ खोलता है?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द वे चयनित शब्द हैं जो पाठ के केंद्रीय भाव, पात्रों की मनोदशा.',
          hint: 'अगर अटके तो c8_hin_cbse_01_006 (मुख्य विषय और संदेश) दोबारा पढ़ो — विषय पता होगा तो मुख्य.',
          misconception: 'छात्र मानते हैं कि **\'कठिन शब्द\' = \'मुख्य शब्द\'**। वे कोश खोलकर अर्थ रट लेते हैं, लेकिन पाठ में उस शब्द का **कथात्मक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द वे चयनित शब्द हैं जो पाठ के केंद्रीय भाव, पात्रों की मनोदशा, या कथानक',
                  options: ['पदावली: मुख्य शब्द वे चयनित शब्द हैं जो पाठ के केंद्रीय भाव, पात्रों की मनोदशा, या कथानक', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'अगर अटके तो c8_hin_cbse_01_006 (मुख्य विषय और संदेश) दोबारा पढ़ो — विषय पता होगा तो मुख्य शब्द.',
                  misconception: 'छात्र मानते हैं कि **\'कठिन शब्द\' = \'मुख्य शब्द\'**। वे कोश खोलकर अर्थ रट लेते हैं, लेकिन पाठ में उस शब्द का **कथात्मक कार्य** (क्या यह पात्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: \'पाठ 1 का वह प्रसंग पढ़ो जहाँ तुम्हें लगा "अब समझ आया!" — उस प्रसंग के **तीन शब्द** छाँटो।\' 2.', 'प्रत्येक शब्द के लिए पूछो: \'अगर यह शब्द हटा दूँ तो यह प्रसंग समझ में आएगा?\' — \'नहीं\' बोले तो वह मुख्य शब्द है। 3.', 'अब उस शब्द का अर्थ **केवल उस प्रसंग से** निकालो (कोश बंद रखो)। 4.', 'अंत में लिखो: \'यह शब्द **किस विषय/पात्र/संघर्ष** को खोलता है?\' — यह 4-चरणीय अभ्यास 2-3 बार कराओ, फिर छात्र स्वयं मुख्य.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचनाओं, काल, वाच्य, और.',
          hint: 'अगर अटका हुआ महसूस हो तो कक्षा 7 की व्याकरण पुस्तिका के \'वाच्य\' और \'काल\' अध्याय दोहराएँ.',
          misconception: 'छात्र समझते हैं कि \'व्याकरण: पाठ में भाषा-प्रयोग\' का अर्थ है पाठ में आए संज्ञा, सर्वनाम, क्रिया, विशेषण आदि पहचानना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचनाओं, काल, वाच्य, और अलंकारिक',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचनाओं, काल, वाच्य, और अलंकारिक', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'अगर अटका हुआ महसूस हो तो कक्षा 7 की व्याकरण पुस्तिका के \'वाच्य\' और \'काल\' अध्याय दोहराएँ — विशेष रूप.',
                  misconception: 'छात्र समझते हैं कि \'व्याकरण: पाठ में भाषा-प्रयोग\' का अर्थ है पाठ में आए संज्ञा, सर्वनाम, क्रिया, विशेषण आदि पहचानना (पद-परिचय)। असल में यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 1 के दो छोटे अंश (३-४ वाक्य प्रत्येक) दो: एक वर्णनात्मक, एक संवादात्मक। 2.', 'कहो: "दोनों में क्रियाएँ रेखांकित करो। बताओ: पहली में क्रियाएँ क्या बता रही हैं?', 'फिर पूछो: "अगर लेखक पहली अंश की क्रियाओं को दूसरी अंश में डाल दे तो क्या होगा?" (हास्य/विसंगति उत्पन्न होगी)। 4.', 'अंत में समझाओ: व्याकरण रूप नहीं, *कार्य* है। इस \'कार्य\' को देखने का अभ्यास कराओ — रोज़ एक अंश, एक व्याकरणिक विशेषता.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_01_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ से सीधे, एक ही सही तथ्य के.',
          hint: 'यदि फँसें तो **c7_hin_cbse_01_012 (कक्षा 7 का बोध-प्रश्न नोड)** दोहराएँ — विशेषकर PEEL के.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'क्या\' शब्द वाला हर प्रश्न वस्तुनिष्ठ होता है**। उदाहरण: *"पाठ का केंद्रीय भाव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ से सीधे, एक ही सही तथ्य के रूप में',
                  options: ['**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ से सीधे, एक ही सही तथ्य के रूप में', '\'पृष्ठभूमि और रचनाकार परिचय\' refers to the study of the historical, social, and cultural', 'कथानक (Plot) कहानी में घटित घटनाओं का कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना (Narrative', 'पाठ्य-परिवेश (Literary Context) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और'],
                  hint: 'यदि फँसें तो **c7_hin_cbse_01_012 (कक्षा 7 का बोध-प्रश्न नोड)** दोहराएँ — विशेषकर PEEL के चरण और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'क्या\' शब्द वाला हर प्रश्न वस्तुनिष्ठ होता है**। उदाहरण: *"पाठ का केंद्रीय भाव क्या है?"* — इसमें.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**की-वर्ड चार्ट बनवाएँ:** दो कॉलम — वस्तुनिष्ठ (क्या, कौन, कब, कहाँ, कितना) और आशय-सूचक (क्यों, कैसे, क्या आशय, क्या.', '**\'क्या\' का जाल तोड़ो:** 5 प्रश्न दें जिनमें \'क्या\' हो लेकिन प्रकार अलग हो (जैसे: "क्या हुआ?" बनाम "क्या भाव है?").', '**PEEL का माइक्रो-अभ्यास:** एक छोटा पैराग्राफ दें, केवल **E (Evidence) ढूँढने** का अभ्यास करवाएँ, फिर **E →.', '**सोच-बोलकर (think-aloud) मॉडलिंग:** आप स्वयं एक आशय-सूचक प्रश्न का PEEL उत्तर **बोलते हुए लिखें**, ताकि छात्र देखें कि.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
