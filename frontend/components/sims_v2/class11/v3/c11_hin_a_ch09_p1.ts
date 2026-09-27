import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch09_p1: SimDef = {
    id: 'v3_c11_hin_a_ch09_p1',
    title: 'पाठ 9 · Part 1/3',
    subtitle: 'यह नोड केवल रचनाकार के जीवन-परिचय, रचना-कालीन पृष्ठभूमि (ऐतिहासिक/सामाजिक/सांस्कृतिक), और.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 9 · Part 1/3',
    chapters: ['c11_hin_a_ch09'],
    nodeIds: ['c11_hin_a_cbse_09_001', 'c11_hin_a_cbse_09_002', 'c11_hin_a_cbse_09_003', 'c11_hin_a_cbse_09_004', 'c11_hin_a_cbse_09_005', 'c11_hin_a_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना कीजिए आप एक जासूस हैं जिसे एक पुराना ख़त मिला है — आप पहले खत पढ़ेंगे या यह पता करेंगे कि खत किसने.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक-सामाजिक संदर्भ (काल, परिस्थितियाँ, विचारधारा) और रचनाकार के जीवन-अनुभवों, साहित्यिक योगदान एवं शैलीगत विशेषताओं का वह विश्लेषणात्मक अध्ययन.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — पृष्ठभूमि', 'पाठ 9 — कथानक', 'पाठ 9 — पाठ्य-परिवेश', 'पाठ 9 — पात्र-चित्रण', 'पाठ 9 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 1/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि.', answer: '9 -', options: ['9 -', '9 -'] },
            { id: 's2', label: '9 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण का तात्पर्य रचना में चित्रित उस समग्र पृष्ठभूमि से है जिसमें.', answer: '9 -', options: ['9 -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक-सामाजिक संदर्भ.',
          hint: 'यदि अटका हुआ महसूस हो तो: कक्षा 10 की पाठ्यपुस्तक के किसी एक रचनाकार परिचय को दोबारा.',
          misconception: 'छात्र अक्सर रचनाकार परिचय को \'जीवनी के तथ्य रटना\' (जन्म-तिथि, शिक्षा, पुरस्कार) समझ लेते हैं और यह नहीं देख पाते कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक-सामाजिक संदर्भ (काल,',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक-सामाजिक संदर्भ (काल,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का तात्पर्य रचना में चित्रित उस समग्र पृष्ठभूमि से है जिसमें', 'पात्र-चित्रण (Characterization) एक साहित्यिक विश्लेषण प्रक्रिया है जिसमें कथा-नायक के'],
                  hint: 'यदि अटका हुआ महसूस हो तो: कक्षा 10 की पाठ्यपुस्तक के किसी एक रचनाकार परिचय को दोबारा पढ़ें और देखें.',
                  misconception: 'छात्र अक्सर रचनाकार परिचय को \'जीवनी के तथ्य रटना\' (जन्म-तिथि, शिक्षा, पुरस्कार) समझ लेते हैं और यह नहीं देख पाते कि **रचनाकार के जीवन की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "रचनाकार की जीवनी की 5 पंक्तियाँ लिखो।" फिर पूछें — "इनमें से कौन-सी एक बात आपको सबसे दिलचस्प.', 'क्यों?" चरण 2: पाठ के किसी एक प्रसंग (जैसे सरकारी फाइल की भाषा) को दिखाकर पूछें — "यह भाषा आपको कहाँ सुनी लगती है?', 'लेखक इसे कैसे जानता होगा?" चरण 3: बोर्ड पर दो कॉलम बनाएँ — बायाँ: \'रचनाकार का जीवन-अनुभव\', दायाँ: \'पाठ में उसकी छाप\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम.',
          hint: 'यदि फँसें तो: E.M. फॉर्स्टर के \'Aspects of the Novel\' (अध्याय 5: कथानक) का हिंदी अनुवाद.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'कथानक विश्लेषण\' का अर्थ केवल घटनाओं को क्रमवार सारांश (Summary) लिखना है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि',
                  options: ['कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक-सामाजिक संदर्भ (काल,', 'पाठ्य-परिवेश और वातावरण का तात्पर्य रचना में चित्रित उस समग्र पृष्ठभूमि से है जिसमें', 'पात्र-चित्रण (Characterization) एक साहित्यिक विश्लेषण प्रक्रिया है जिसमें कथा-नायक के'],
                  hint: 'यदि फँसें तो: E.M. फॉर्स्टर के \'Aspects of the Novel\' (अध्याय 5: कथानक) का हिंदी अनुवाद पढ़ें.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'कथानक विश्लेषण\' का अर्थ केवल घटनाओं को क्रमवार सारांश (Summary) लिखना है — "पहले यह हुआ, फिर वह.' }
          ],
            remediations: { 'summary': { steps: ['फॉर्स्टर का प्रसिद्ध उदाहरण लें — "राजा मरा, फिर रानी मरी" (कहानी/घटनाक्रम) बनाम "राजा मरा, फिर रानी शोक से मरी".', '**दृश्यीकरण (Visualization)**: किसी जानी-पहचानी कहानी (जैसे \'रामायण\' का एक प्रसंग) का **टाइमलाइन** बनवाएँ — दो समानांतर.', '**संरचना-लेबलिंग**: 4-5 लघु कथाओं के आरंभिक पैराग्राफ दें; छात्र पहचाने: रैखिक / फ्लैशबैक / इन मीडिया रेस (In Medias.', '**बोर्ड-शैली प्रश्न**: "कथानक और संरचना के भेद को उदाहरण सहित स्पष्ट कीजिए" — का मॉडल उत्तर संयुक्त रूप से लिखवाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण का तात्पर्य रचना में चित्रित उस समग्र पृष्ठभूमि से है.',
          hint: 'यदि अटका हुआ महसूस करें तो \'पृष्ठभूमि और रचनाकार परिचय\' (नोड 001) में रचनाकालीन.',
          misconception: 'छात्र अक्सर \'पाठ्य-परिवेश\' को केवल \'कहानी कहाँ घट रही है\' (भौगोलिक स्थान) या \'कब घट रही है\' (ऐतिहासिक काल) तक सीमित कर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण का तात्पर्य रचना में चित्रित उस समग्र पृष्ठभूमि से है जिसमें',
                  options: ['पाठ्य-परिवेश और वातावरण का तात्पर्य रचना में चित्रित उस समग्र पृष्ठभूमि से है जिसमें', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक-सामाजिक संदर्भ (काल,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पात्र-चित्रण (Characterization) एक साहित्यिक विश्लेषण प्रक्रिया है जिसमें कथा-नायक के'],
                  hint: 'यदि अटका हुआ महसूस करें तो \'पृष्ठभूमि और रचनाकार परिचय\' (नोड 001) में रचनाकालीन परिस्थितियों और.',
                  misconception: 'छात्र अक्सर \'पाठ्य-परिवेश\' को केवल \'कहानी कहाँ घट रही है\' (भौगोलिक स्थान) या \'कब घट रही है\' (ऐतिहासिक काल) तक सीमित कर देते हैं। वे यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें कि वह पाठ के किन्हीं पांच वाक्य छाँटे जो स्थान, समय, रीति-रिवाज, आर्थिक स्थिति या मनोदशा का संकेत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Characterization) एक साहित्यिक विश्लेषण प्रक्रिया है जिसमें.',
          hint: 'यदि अटका हुआ महसूस हो तो c11_hin_a_cbse_09_002 (कथानक और आख्यान-संरचना) के \'उत्कर्ष और.',
          misconception: 'छात्र अक्सर मानते हैं कि \'चरित्र-चित्रण\' का अर्थ नायक के **गुणों/अवगुणों की सूची (List of Traits)** बनाना है — जैसे "वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Characterization) एक साहित्यिक विश्लेषण प्रक्रिया है जिसमें कथा-नायक के',
                  options: ['पात्र-चित्रण (Characterization) एक साहित्यिक विश्लेषण प्रक्रिया है जिसमें कथा-नायक के', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक-सामाजिक संदर्भ (काल,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का तात्पर्य रचना में चित्रित उस समग्र पृष्ठभूमि से है जिसमें'],
                  hint: 'यदि अटका हुआ महसूस हो तो c11_hin_a_cbse_09_002 (कथानक और आख्यान-संरचना) के \'उत्कर्ष और परिवर्तन.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'चरित्र-चित्रण\' का अर्थ नायक के **गुणों/अवगुणों की सूची (List of Traits)** बनाना है — जैसे "वह साहसी, ईमानदार.' }
          ],
            remediations: { 'list-of-traits': { steps: ['छात्र से कहें: "एक गुण चुनो (जैसे साहस)। अब पाठ खोलकर वह **एक विशिष्ट पैराग्राफ/संवाद** ढूंढो जहाँ यह साहस *क्रिया* में.', 'फिर पूछें: "इस घटना से पहले नायक की मनःस्थिति क्या थी?', 'बाद में क्या बदली?" — यह \'पहले/बाद\' तुलना चरित्र-विकास (Character Arc) उजागर करती है। 3.', 'अंत में कहें: "अब अपना वाक्य फिर से लिखो: \'नायक साहसी है\' के बजाय \'अध्याय 4 में जब नायक ने जलते घर में घुसकर बच्चे को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 004 (पात्र-चित्रण: नायक)** के \'चरित्र-विकास यात्रा.',
          misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्रों को **\'प्रकार\' (Types: जैसे मित्र, भाई, नौकर)** में वर्गीकृत कर **संतुष्ट** हो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक-सामाजिक संदर्भ (काल,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का तात्पर्य रचना में चित्रित उस समग्र पृष्ठभूमि से है जिसमें'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 004 (पात्र-चित्रण: नायक)** के \'चरित्र-विकास यात्रा (Character Arc)\'.',
                  misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्रों को **\'प्रकार\' (Types: जैसे मित्र, भाई, नौकर)** में वर्गीकृत कर **संतुष्ट** हो जाते हैं और यह नहीं.' }
          ],
            remediations: { 'types': { steps: ['**चरण 1:** छात्र से कहें: *"पाठ से किन्हीं दो सहायक पात्रों के नाम बताओ जो नायक के \'मित्र\' हों।"* (सूची बनेगी)। 2.', '**चरण 2:** पूछें: *"रमेश के बिना नायक कैसा लगता?', 'सुरेश के बिना नायक कैसा लगता?', 'दोनों के बिना नायक में क्या अंतर आता?"* (कार्यात्मक भिन्नता उभरेगी)। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_09_006', difficulty: 'standard',
          question: '**मुख्य विषय (Main Theme)** रचना का वह **केंद्रीय विचार (Central Idea)** या.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_09_002 (कथानक संरचना)** और **c11_hin_a_cbse_09_004 (नायक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'मुख्य विषय\' = \'लेखक का व्यक्तिगत मत\' (Author\'s Personal Opinion)**। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (Main Theme)** रचना का वह **केंद्रीय विचार (Central Idea)** या **सार्वभौमिक',
                  options: ['**मुख्य विषय (Main Theme)** रचना का वह **केंद्रीय विचार (Central Idea)** या **सार्वभौमिक', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के ऐतिहासिक-सामाजिक संदर्भ (काल,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का तात्पर्य रचना में चित्रित उस समग्र पृष्ठभूमि से है जिसमें'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_09_002 (कथानक संरचना)** और **c11_hin_a_cbse_09_004 (नायक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'मुख्य विषय\' = \'लेखक का व्यक्तिगत मत\' (Author\'s Personal Opinion)**। **गलत तर्क:** *"लेखक ने यह.' }
          ],
            remediations: { 'author-s-personal-opinion': { steps: ['**पृथक्करण अभ्यास (Separation Drill):** छात्र से कहें — *"पाठ के 5 वाक्य छाँटो जो केवल घटना बताते हैं (कथानक), 5 जो.', '**\'क्यों?\' सीढ़ी (Why Ladder):** हर चिह्नित वाक्य पर पूछें — *"लेखक ने यह यहाँ क्यों रखा?', 'पाठक को क्या महसूस/सोचने पर मजबूर करता है?"* — 3 बार \'क्यों\' पूछने पर विषय तक पहुँचेंगे। 3.', '**प्रति-कथन लेखन (Counter-statement Writing):** छात्र से कहें — *"मुख्य विषय के विपरीत एक पैराग्राफ लिखो जो पाठ के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
