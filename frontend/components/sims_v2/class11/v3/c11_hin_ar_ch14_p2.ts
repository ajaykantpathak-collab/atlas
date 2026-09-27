import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch14_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch14_p2',
    title: 'पाठ 14 · Part 2/3',
    subtitle: 'Read the poems of a woman the palace tried to silence — and the canon tried to forget.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 14 · Part 2/3',
    chapters: ['c11_hin_ar_ch14'],
    nodeIds: ['c11_hin_ar_cbse_14_007', 'c11_hin_ar_cbse_14_008', 'c11_hin_ar_cbse_14_009', 'c11_hin_ar_cbse_14_010', 'c11_hin_ar_cbse_14_011', 'c11_hin_ar_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader holding a locked diary that got out anyway', intro: 'Imprisoned for writing, released on conditions, betrayed, escaped — her biography isn\'t background; it\'s the poems\' skeleton.', goal: 'Read biography as the structural logic of the poems and evaluate their unresolved moral ending.' },
    discovery: {
        question: 'A queen imprisoned by her own king for writing poetry negotiates three conditions for release, he breaks them, she breaks out — what is this life to her poems?',
        options: ['The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice', 'Nothing — biography shouldn\'t colour literary analysis', 'It\'s background colour for a romantic reading', 'It proves the poems are only about palace politics'],
        answer: 'The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice',
        hook: 'A Chhayavad-era woman wrote in Braj Bhasha so village women could read her — and the canon excluded her for decades for exactly that choice.',
    },
    teaching: [
        { title: 'पाठ 14 — गौण विषय', text: 'गौण विषय (Sub-theme/Sub-plot) कथा-साहित्य में मुख्य कथानक के समानांतर चलने वाली वह द्वितीयक कथा-धारा है जो मुख्य विषय को पुष्ट, विस्तारित या विरोधाभासी स्वर प्रदान करती है तथा पात्रों, परिवेश एवं.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the two poems as a diptych — systemic oppression in one, a hunter\'s frozen moral crisis in the other — and judge the unresolved \'if I kill her\' ending.',
        labels: ['पाठ 14 — गौण', 'पाठ 14 — साहित्यिक', 'पाठ 14 — पदावली', 'पाठ 14 — व्याकरण', 'पाठ 14 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_14_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 14 · Part 2/3', spots: [
            { id: 's1', label: '14 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग से तात्पर्य है — रचनाकार द्वारा **शब्द-चयन, वाक्य-संरचना, काल-प्रयोग.', answer: '14 -', options: ['14 -', '14 - -'] },
            { id: 's2', label: '14 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में **स्पष्टतः (Explicitly)** दिया.', answer: '14 - -', options: ['14 - -', '14 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary society is debating why a Chhayavad-era queen who wrote in Braj Bhasha — imprisoned by her own husband for writing — was left out of the canon for decades. A member says: \'Probably her poems were just weaker; canon committees judge merit, not politics.\'',
            decisions: [{ prompt: 'What does her case actually reveal?', options: [
                { text: 'Read exclusion as power, not merit: she wrote in Braj so village women could access her work — a choice the Khari Boli canon punished. And biography is structural logic: imprisoned for writing, she negotiated three release conditions, he broke them, and she broke out — so the second poem\'s knocking on the door is a political act, and the first\'s call for reform is a survivor\'s testimony, not abstract preaching.', outcome: 'The debate reframes: canon-making is a struggle over language, gender and authority — her life is the interpretive key, not an anecdote.' },
                { text: 'Accept the merit explanation — the canon reflects quality, and exclusion just means weaker verse.', outcome: 'That ignores the documented mechanism: her Braj Bhasha choice — made for accessibility — was itself the grounds for exclusion, a language-and-gender judgment dressed as taste.', reveals: 'canon-is-pure-merit' },
                { text: 'Separate the poems from her life — read them on their own without biography.', outcome: 'Here biography IS the structure: the diptych pairs systemic oppression (poem 1) with the individual moral crisis it produces (poem 2) — her imprisonment and escape are the logic, not decoration.', reveals: 'ignore-biography-read-text-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_012', title: 'The bigger picture',
          caseStudy: { intro: 'The hunter\'s hand stays raised and the poem refuses to lower it — the reader must live inside the poor man\'s eternal dilemma.',
            decisions: [{ prompt: 'What comes next? पाठ 14 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 14 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme/Sub-plot) कथा-साहित्य में मुख्य कथानक के समानांतर चलने वाली.',
          hint: 'यदि फंसे तो **नोड 006 (मुख्य विषय और संदेश)** पर लौटें — मुख्य विषय के \'की-वर्ड्स\' (जैसे.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर \'गौण विषय\' को \'गौण पात्र\' (minor characters) समझ लेते हैं और मानते हैं कि गौण पात्रों के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme/Sub-plot) कथा-साहित्य में मुख्य कथानक के समानांतर चलने वाली वह',
                  options: ['गौण विषय (Sub-theme/Sub-plot) कथा-साहित्य में मुख्य कथानक के समानांतर चलने वाली वह', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,'],
                  hint: 'यदि फंसे तो **नोड 006 (मुख्य विषय और संदेश)** पर लौटें — मुख्य विषय के \'की-वर्ड्स\' (जैसे.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर \'गौण विषय\' को \'गौण पात्र\' (minor characters) समझ लेते हैं और मानते हैं कि गौण पात्रों के प्रसंग ही गौण विषय.' }
          ],
            remediations: { 'minor-characters': { steps: ['**पुनर्परिभाषित करें:** छात्र से कहें — "गौण पात्र = व्यक्ति; गौण विषय = उस व्यक्ति के इर्द-गिर्द बुनी गई **कहानी की एक.', '**दृश्यीकरण कराएं:** एक कागज पर मुख्य विषय को मोटी रेखा (मेन हाईवे) और गौण विषय को पतली समानांतर रेखाओं (सर्विस रोड) के.', '**पाठगत अभ्यास:** पाठ 14 के 3-4 पन्ने देकर कहें — "हर पन्ने पर निशान लगाओ: यहाँ मुख्य विषय की बात हो रही है, यहाँ गौण.', '**मौखिक जांच:** पूछें — "अगर यह गौण विषय हटा दें तो मुख्य विषय पर क्या असर पड़ेगा?" यदि छात्र कहे \'कोई असर नहीं\', तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक.',
          hint: 'यदि फँस जाएँ तो **कक्षा 10 हिंदी पाठ्यपुस्तक (क्षितिज/कृतिका) के अलंकार संबंधी अध्याय**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **रूपक केवल \'सुंदरता/अलंकार\' के लिए होता है** — अर्थात् यह कथन को \'सजाता\' मात्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक की',
                  options: ['**बिंब (Imagery)** साहित्यिक युक्ति है जिसमें कवि/लेखक शब्दों के माध्यम से पाठक की', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,'],
                  hint: 'यदि फँस जाएँ तो **कक्षा 10 हिंदी पाठ्यपुस्तक (क्षितिज/कृतिका) के अलंकार संबंधी अध्याय** दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **रूपक केवल \'सुंदरता/अलंकार\' के लिए होता है** — अर्थात् यह कथन को \'सजाता\' मात्र है, अर्थ नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — इंद्रिय-सूची बनवाएँ:** छात्र को 5 कॉलम वाली शीट दें (दृश्य, श्रवण, घ्राण, स्पर्श, स्वाद)। किसी भी परिचित.', '**चरण 2 — रूपक शल्य-क्रिया (Metaphor Surgery):** एक सरल रूपक लें ("समय पैसा है")। बोर्ड पर दो कॉलम बनाएँ: उपमेय (समय).', 'फिर पूछें: "कौन सा गुण *नहीं* मिलता?" (पैसा भौतिक है, समय नहीं) — इससे रूपक = **चुनिंदा गुण-स्थानांतरण (Selective.', '**चरण 3 — मिश्रित अभ्यास:** एक छोटा गद्यांश दें जिसमें बिंब और रूपक दोनों हों। छात्र को पहले बिंब घेरने को कहें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली नज़र में असंगत या.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_14_008 (बिंब और रूपक)** के \'लक्षित अर्थ\' वाले खंड को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'विरोधाभास\' को केवल \'विरोधी विशेषणों वाला वाक्य\' मान लेते हैं** (जैसे: "वह गरीब अमीर था").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली नज़र में असंगत या आत्म-विरोधी लगता',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली नज़र में असंगत या आत्म-विरोधी लगता', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_14_008 (बिंब और रूपक)** के \'लक्षित अर्थ\' वाले खंड को दोहराएँ, विशेषकर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'विरोधाभास\' को केवल \'विरोधी विशेषणों वाला वाक्य\' मान लेते हैं** (जैसे: "वह गरीब अमीर था") और **\'प्रतीक\' को.' }
          ],
            remediations: { 'identify-label-intellectual-tension': { steps: ['**चरण 1 (विरोधाभास हेतु):** छात्र को एक साधारण वाक्य दें: *"वह रो रहा था पर आँखें सूखी थीं।"* पूछें: *"क्या यह केवल.', 'या रोने का कोई नया रूप (आंतरिक रुदन, असहायता) खुल रहा है?"* — इससे **\'अर्थ-निर्माण\' (Meaning-making)** पर फोकस आएगा।.', 'अंतिम पैरा में क्या हो गई?', 'लेखक ने कुर्सी का वर्णन नहीं बदला, फिर अर्थ कैसे बदला?"* — इससे **\'संदर्भ-निर्भरता\' (Context-dependency)** स्पष्ट होगी।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_010', difficulty: 'standard',
          question: 'पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द-युग्म या पद होते हैं जो पाठ के.',
          hint: 'यदि अटका हुआ महसूस हो तो \'पाठ 14 — मुख्य विषय और संदेश\' (c11_hin_ar_cbse_14_006) और \'पाठ.',
          misconception: 'छात्र अक्सर मान लेते हैं कि **\'मुख्य शब्द = कठिन शब्द / संस्कृतनिष्ठ शब्द / शब्दकोश में दिए गए अर्थ वाले शब्द\'**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द-युग्म या पद होते हैं जो पाठ के केंद्रीय',
                  options: ['पदावली के अंतर्गत \'मुख्य शब्द\' वे विशिष्ट शब्द-युग्म या पद होते हैं जो पाठ के केंद्रीय', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,'],
                  hint: 'यदि अटका हुआ महसूस हो तो \'पाठ 14 — मुख्य विषय और संदेश\' (c11_hin_ar_cbse_14_006) और \'पाठ 14.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि **\'मुख्य शब्द = कठिन शब्द / संस्कृतनिष्ठ शब्द / शब्दकोश में दिए गए अर्थ वाले शब्द\'**। उदाहरण के लिए, पाठ में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read) करें:** पाठ को केवल \'मुख्य शब्द खोजने\' के लिए पढ़ें — हर उस शब्द पर घेरा डालें जो आपको \'भारी\'.', '**तालिका बनाएँ:** तीन कॉलम बनाएँ — (क) शब्द, (ख) प्रसंग/पंक्ति संख्या, (ग) यह शब्द पाठ के किस विषय/भाव को आगे बढ़ाता है?', '**छंटनी करें:** 15-20 चुने शब्दों में से वे 5-7 शब्द रखें जो **(i)** पाठ के आरंभ-मध्य-अंत में किसी न किसी रूप में हों.', '**मौखिक परीक्षण:** प्रत्येक चुने शब्द को वाक्य में बोलें: "यह शब्द पाठ का X विषय व्यक्त करता है क्योंकि..." — यदि वाक्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग से तात्पर्य है — रचनाकार द्वारा **शब्द-चयन, वाक्य-संरचना.',
          hint: 'यदि अटके तो **कक्षा 9-10 के हिन्दी व्याकरण की पुस्तक से \'काल, कारक, सर्वनाम, समास.',
          misconception: 'छात्र समझते हैं कि **\'व्याकरण = शुद्धि के नियम\'** और **\'भाषा-प्रयोग = नियमों का पालन\'** मात्र है। इसलिए वे पाठ में आए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग से तात्पर्य है',
                  options: ['पाठ में भाषा-प्रयोग से तात्पर्य है', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,'],
                  hint: 'यदि अटके तो **कक्षा 9-10 के हिन्दी व्याकरण की पुस्तक से \'काल, कारक, सर्वनाम, समास, वाक्य-भेद.',
                  misconception: 'छात्र समझते हैं कि **\'व्याकरण = शुद्धि के नियम\'** और **\'भाषा-प्रयोग = नियमों का पालन\'** मात्र है। इसलिए वे पाठ में आए **\'ने\', \'को\', \'से\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मिनी-लेसन (5 मिनट):** छात्र को **एक ही मूल वाक्य के 4-5 काल/कारक/सर्वनाम रूप** लिखवाएँ (जैसे: *वह जाता है / गया.', '**माइक्रो-टास्क:** पाठ 14 से **5 वाक्य चुनवाएँ** जहाँ \'ने\', \'को\', \'से\', \'अपना\', कोई समास, कोई विराम-चिह्न आया हो।.', '**संवाद:** पूछें — *"क्या तुम्हें लगता है लेखक ने यह रूप **जान-बूझकर** चुना या **आदतन**?', 'पाठ के प्रसंग से अपने उत्तर का प्रमाण दो।"* 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में **स्पष्टतः.',
          hint: 'यदि **तथ्य याद न रहें** → **कथानक-सारांश (Plot Summary) नोट्स** दोबारा पढ़ें.',
          misconception: '**भ्रांति**: *"आशय-सूचक प्रश्नों के उत्तर में **पाठ की पंक्तियाँ जितनी अधिक उद्धृत (Quote) करेंगे, उतने अधिक अंक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में **स्पष्टतः (Explicitly)** दिया',
                  options: ['**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में **स्पष्टतः (Explicitly)** दिया', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,'],
                  hint: 'यदि **तथ्य याद न रहें** → **कथानक-सारांश (Plot Summary) नोट्स** दोबारा पढ़ें.',
                  misconception: '**भ्रांति**: *"आशय-सूचक प्रश्नों के उत्तर में **पाठ की पंक्तियाँ जितनी अधिक उद्धृत (Quote) करेंगे, उतने अधिक अंक मिलेंगे।"* **वास्तविकता**.' }
          ],
            remediations: { 'quote': { steps: ['**चरण १ — पहचान (Identify)**: छात्र से कहें — *"अपना लिखा उत्तर पढ़ो और बताओ: इसमें **तुम्हारे अपने शब्द (Your Own.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
