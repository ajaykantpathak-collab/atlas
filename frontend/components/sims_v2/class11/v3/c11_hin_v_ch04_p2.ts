import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch04_p2: SimDef = {
    id: 'v3_c11_hin_v_ch04_p2',
    title: 'पाठ 4 · Part 2/3',
    subtitle: 'Test the claim that the most local art travels the farthest.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 4 · Part 2/3',
    chapters: ['c11_hin_v_ch04'],
    nodeIds: ['c11_hin_v_cbse_04_007', 'c11_hin_v_cbse_04_008', 'c11_hin_v_cbse_04_009', 'c11_hin_v_cbse_04_010', 'c11_hin_v_cbse_04_011', 'c11_hin_v_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader mapping Indian art\'s hidden continuum', intro: 'Mandana on a mud wall in a village, Kathak in a Jaipur auditorium — the essay asks what these share, not what divides them.', goal: 'Analyse the folk-classical continuum and the essay\'s classification-driven structure.' },
    discovery: {
        question: '\'The more local an art is in its expression, the more universal it becomes\' — can that paradox actually hold?',
        options: ['Yes — Warli\'s rice-paste spirals use only circle, triangle and square: the most local cosmology drawn in the most universal shapes', 'No — local art stays local by definition', 'Yes — but only after foreigners validate it', 'No — universality requires abandoning the local'],
        answer: 'Yes — Warli\'s rice-paste spirals use only circle, triangle and square: the most local cosmology drawn in the most universal shapes',
        hook: 'Folk and classical aren\'t two boxes — Kathak grew out of kathavachaks and temple dances sank back into villages; the continuum never stops trading.',
    },
    teaching: [
        { title: 'पाठ 4 — गौण विषय', text: 'गौण विषय (Sub-theme) वह कथा-तत्व है जो मुख्य विषय के समानांतर चलता हुआ कथानक को विस्तार, गहराई और यथार्थपरकता प्रदान करता है, परन्तु कथा का केंद्रीय संवेदन या संदेश नहीं होता। यह मुख्य पात्रों के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace how the essay runs every art form through the same folk→classical→living-continuity arc, and judge what that repeated pattern proves.',
        labels: ['पाठ 4 — गौण', 'पाठ 4 — साहित्यिक', 'पाठ 4 — पदावली', 'पाठ 4 — व्याकरण', 'पाठ 4 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_v_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 2/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है — रचनाकार द्वारा प्रसंग, पात्र, भाव और उद्देश्य के अनुसार.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ बोध-प्रश्न पाठ में **स्पष्टतः लिखित तथ्यों, घटनाओं, पात्रों या आँकड़ों** की.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school exhibition on \'Indian Arts\', a student sorts every item into two rigid boxes — \'folk/tribal\' (Mandana, Warli, Madhubani) and \'classical\' (Kathak, Mughal miniatures) — insisting the categories never mix, \'like traditional vs modern.\'',
            decisions: [{ prompt: 'What does the chapter say about that border?', options: [
                { text: 'Show the continuum: the chapter argues folk and classical are endpoints in constant संवाद — folk forms get codified into classical (Kathak rising from the kathavachak tradition), classical forms dissolve back into folk (temple dance becoming village ritual), and both root in the Natya Shastra. Crucially, Indian arts were never museum objects — they lived inside births, harvests and worship.', outcome: 'The exhibition gets a third section — \'the dialogue\': Kathak\'s folk origins, Madhubani\'s codification — proving the categories are porous by design.' },
                { text: 'Keep the two boxes — separate categories make the exhibition clearer for visitors.', outcome: 'Clarity here falsifies: the text\'s central claim is fluidity, and a rigid folk/classical wall hides exactly the unity-in-diversity the chapter demonstrates.', reveals: 'folk-classical-are-fixed-boxes' },
                { text: 'Treat the art list as the structure — painting, then music, then dance is just a table of contents.', outcome: 'The sequence is argumentative: each art form follows the same folk→classical→modern trajectory to prove the thesis that arts are rooted in life.', reveals: 'structure-is-topic-list' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'Bhimbetka\'s cave lines, a Rajasthani wall at Diwali, a Tanjore court repertoire — one argument repeated until it becomes evidence.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह कथा-तत्व है जो मुख्य विषय के समानांतर चलता हुआ कथानक को.',
          hint: 'यदि मुख्य विषय अस्पष्ट हो, तो पहले नोड c11_hin_v_cbse_04_006 (मुख्य विषय और संदेश) की.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "गौण विषय = मुख्य विषय का उप-विषय (sub-topic) या कम महत्वपूर्ण विषय"। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह कथा-तत्व है जो मुख्य विषय के समानांतर चलता हुआ कथानक को विस्तार,',
                  options: ['गौण विषय (Sub-theme) वह कथा-तत्व है जो मुख्य विषय के समानांतर चलता हुआ कथानक को विस्तार,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त, रचनाकाल', '**कथानक (Plot)** घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित वह क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी साहित्यिक कृति में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि मुख्य विषय अस्पष्ट हो, तो पहले नोड c11_hin_v_cbse_04_006 (मुख्य विषय और संदेश) की \'वॉकथ्रू\' और.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "गौण विषय = मुख्य विषय का उप-विषय (sub-topic) या कम महत्वपूर्ण विषय"। **गलत तर्क का स्रोत**: \'गौण\'.' }
          ],
            remediations: { 'sub-topic': { steps: ['**शब्द-अर्थ स्पष्टीकरण**: छात्र से कहें — "दैनिक जीवन में \'गौण\' का अर्थ \'कम जरूरी\' है, पर साहित्य-शास्त्र में \'गौण.', '**पाठ-आधारित अभ्यास**: पाठ 4 के 3-4 पृष्ठ खोलकर पूछें — "यहाँ कौन-सा प्रसंग नायक (मुख्य पात्र) की अनुपस्थिति में घट रहा.', 'उसका अपना आरंभ-मध्य-अंत है?" — ऐसे 2 प्रसंग चिह्नित करवाएँ। 3.', '**तुलनात्मक सारणी बनवाएँ**: स्तंभ 1: मुख्य विषय का प्रसंग, स्तंभ 2: गौण विषय का प्रसंग, स्तंभ 3: दोनों का संबंध.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_008', difficulty: 'standard',
          question: 'बिंब वह शब्द या वाक्यांश है जो किसी वस्तु, क्रिया या अनुभव का सीधा मानसिक चित्र.',
          hint: 'यदि फंसे हों, तो c11_hin_v_cbse_04_003 (पाठ्य-परिवेश और वातावरण) के नोड को दोबारा.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द प्रकृति से संबंधित है (जैसे फूल, नदी, पर्वत) तो वह स्वतः बिंब है, या यदि कोई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब वह शब्द या वाक्यांश है जो किसी वस्तु, क्रिया या अनुभव का सीधा मानसिक चित्र बनाता है,',
                  options: ['बिंब वह शब्द या वाक्यांश है जो किसी वस्तु, क्रिया या अनुभव का सीधा मानसिक चित्र बनाता है,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त, रचनाकाल', '**कथानक (Plot)** घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित वह क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी साहित्यिक कृति में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फंसे हों, तो c11_hin_v_cbse_04_003 (पाठ्य-परिवेश और वातावरण) के नोड को दोबारा देखिए—वहाँ शब्दों.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द प्रकृति से संबंधित है (जैसे फूल, नदी, पर्वत) तो वह स्वतः बिंब है, या यदि कोई वाक्य दो चीज़ों की तुलना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि पहले वाक्य को पूरा पढ़कर समझिए कि क्या यह एक रूपक है (जैसे "X Y है") — यदि हाँ, तो रूपक के भीतर के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो प्रथम दृष्टया तर्क-विरुद्ध या.',
          hint: 'यदि अटके हों तो **c11_hin_v_cbse_04_008 (बिंब और रूपक)** के \'कार्य उदाहरण\' दोबारा करें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **हर विरोधी लगने वाला वाक्य विरोधाभास है** और **हर महत्वपूर्ण वस्तु प्रतीक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो प्रथम दृष्टया तर्क-विरुद्ध या असंगत लगता',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो प्रथम दृष्टया तर्क-विरुद्ध या असंगत लगता', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त, रचनाकाल', '**कथानक (Plot)** घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित वह क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी साहित्यिक कृति में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि अटके हों तो **c11_hin_v_cbse_04_008 (बिंब और रूपक)** के \'कार्य उदाहरण\' दोबारा करें — विशेषकर यह.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **हर विरोधी लगने वाला वाक्य विरोधाभास है** और **हर महत्वपूर्ण वस्तु प्रतीक है**। **गलत तर्क का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**विरोधाभास के लिए:** छात्र को तीन कॉलम की तालिका बनाने को कहें — (क) वाक्य, (ख) सतही विरोध (कौन-से दो तत्व लड़ रहे.', '**प्रतीक के लिए:** \'प्रतीक-परीक्षण चेकलिस्ट\' दें: (क) क्या वस्तु/पात्र 2+ बार आया?', '(ख) क्या उसका वर्णन असामान्य रूप से विस्तृत/सांकेतिक है?', '(ग) क्या वह पाठ के मुख्य विषय/पात्र-मनोविज्ञान से जुड़ता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द (Key Vocabulary) वे विशिष्ट शब्द/पद हैं जो पाठ की विषयवस्तु.',
          hint: 'यदि अटके तो **पाठ 4 के कथानक-सार** (Plot Summary) और **पात्र-चित्रण नोट्स** (Character.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "मुख्य शब्द" वे हैं जो **पाठ में सबसे अधिक बार आए हों** (High Frequency Words).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द (Key Vocabulary) वे विशिष्ट शब्द/पद हैं जो पाठ की विषयवस्तु,',
                  options: ['पदावली: मुख्य शब्द (Key Vocabulary) वे विशिष्ट शब्द/पद हैं जो पाठ की विषयवस्तु,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त, रचनाकाल', '**कथानक (Plot)** घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित वह क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी साहित्यिक कृति में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि अटके तो **पाठ 4 के कथानक-सार** (Plot Summary) और **पात्र-चित्रण नोट्स** (Character Sketch.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "मुख्य शब्द" वे हैं जो **पाठ में सबसे अधिक बार आए हों** (High Frequency Words) या जो **सबसे.' }
          ],
            remediations: { 'high-frequency-words-4': { steps: ['छात्र को पाठ 4 का **एक छोटा प्रसंग (5-6 पंक्तियाँ)** दें और कहें: "केवल **तीन** शब्द चुनो जिनको हटाने से प्रसंग का.', 'उन तीन शब्दों के लिए **शब्दकोश अर्थ** और **प्रसंग अर्थ** साथ-साथ लिखवाएँ — अंतर स्पष्ट करें। 3.', 'पूछें: "लेखक ने इस शब्द की जगह उसका पर्याय क्यों नहीं रखा?" — **ध्वनि, व्युत्पत्ति, सांस्कृतिक अंतर्धारा** पर बात करें।.', 'अंत में, छात्र से **एक पैराग्राफ** लिखवाएँ जहाँ वह चुने हुए शब्द का **थीमैटिक योगदान** (Thematic Contribution) समझाए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है — रचनाकार द्वारा प्रसंग, पात्र, भाव और उद्देश्य.',
          hint: 'यदि फँसें तो: पदावली नोड (c11_hin_v_cbse_04_010) के \'कार्यशाला\' खंड को दोहराएँ — विशेषकर.',
          misconception: 'छात्र समझते हैं कि \'पाठ में भाषा-प्रयोग\' का अर्थ है — \'त्रुटिहीन व्याकरण\', \'कठिन तत्सम शब्द\', \'अधिक अलंकार\'। वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त, रचनाकाल', '**कथानक (Plot)** घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित वह क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी साहित्यिक कृति में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फँसें तो: पदावली नोड (c11_hin_v_cbse_04_010) के \'कार्यशाला\' खंड को दोहराएँ — विशेषकर \'शब्द के.',
                  misconception: 'छात्र समझते हैं कि \'पाठ में भाषा-प्रयोग\' का अर्थ है — \'त्रुटिहीन व्याकरण\', \'कठिन तत्सम शब्द\', \'अधिक अलंकार\'। वास्तव में: श्रेष्ठ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — \'पाठ 4 का कोई एक पात्र चुनो, उसके 5 वाक्य लिखो।\' चरण 2: पूछें — \'ये वाक्य *यह पात्र* क्यों.', 'दूसरा पात्र क्यों नहीं?\' चरण 3: दिखाएँ — \'देखो, शब्द/संरचना/मुहावरा पात्र से निकल रहा है, नियम-पुस्तक से नहीं।\' चरण 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ बोध-प्रश्न पाठ में **स्पष्टतः लिखित तथ्यों, घटनाओं, पात्रों या.',
          hint: 'यदि फँसें तो **c11_hin_v_cbse_04_006 (मुख्य विषय और संदेश)** और.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'आशय-सूचक\' का अर्थ \'अपनी राय/कल्पना लिखना\' है** — वे सोचते हैं चूँकि उत्तर पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ बोध-प्रश्न पाठ में **स्पष्टतः लिखित तथ्यों, घटनाओं, पात्रों या आँकड़ों** की',
                  options: ['वस्तुनिष्ठ बोध-प्रश्न पाठ में **स्पष्टतः लिखित तथ्यों, घटनाओं, पात्रों या आँकड़ों** की', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त, रचनाकाल', '**कथानक (Plot)** घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित वह क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी साहित्यिक कृति में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फँसें तो **c11_hin_v_cbse_04_006 (मुख्य विषय और संदेश)** और **c11_hin_v_cbse_04_008-009.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'आशय-सूचक\' का अर्थ \'अपनी राय/कल्पना लिखना\' है** — वे सोचते हैं चूँकि उत्तर पाठ में सीधे नहीं है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग:** शिक्षक एक छोटा गद्यांश (3-4 वाक्य) ले और **सोच-ज़ोर (think-aloud)** करके दिखाए: "मैं देख रहा हूँ \'लोहे की.', '**संयुक्त अभ्यास:** छात्र को 3 आशय-सूचक प्रश्न दें जिनके **विकल्प-उत्तर** दिए हों (एक सही, दो भ्रामक — जैसे \'व्यक्तिगत.', '**स्वतंत्र लेखन:** अब छात्र स्वयं PEEL ढाँचे में उत्तर लिखे — शिक्षक केवल \'प्रमाण पाठ से है या नहीं?\' और \'तर्क आशय से.', '**फीडबैक लूप:** हर उत्तर पर टिप्पणी: "यहाँ आपने प्रमाण दिया लेकिन व्याख्या नहीं की" या "यहाँ आपने अपनी राय लिखी, पाठ का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
