import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch10_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch10_p2',
    title: 'भक्तनि · Part 2/3',
    subtitle: 'A poet wrote prose so a servant\'s life would count',
    classLevel: 12, subject: 'hin_ar', topic: 'भक्तनि · Part 2/3',
    chapters: ['c12_hin_ar_ch10'],
    nodeIds: ['c12_hin_ar_cbse_10_007', 'c12_hin_ar_cbse_10_008', 'c12_hin_ar_cbse_10_009', 'c12_hin_ar_cbse_10_010', 'c12_hin_ar_cbse_10_011', 'c12_hin_ar_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi sketch-reader', intro: 'From a collection of remembered lives, one woman steps forward — and a child\'s eye becomes the sharpest lens on inequality.', goal: 'Read the sketch through Mahadevi Verma\'s reformist lens — caste, gender and the child\'s innocent gaze.' },
    discovery: {
        question: 'A servant-woman, married at five, widowed young, speaks in village dialect inside a professor\'s household. Why did a poet famous for Chhayavad lyrics choose to record her?',
        options: ['Reformer\'s testimony — Mahadevi Verma ran a girls\' school; the sketch documents caste-gender oppression through a child\'s eyes to demand change', 'She needed a memoir chapter', 'Servants make easy characters', 'Poetry didn\'t sell'],
        answer: 'Reformer\'s testimony — Mahadevi Verma ran a girls\' school; the sketch documents caste-gender oppression through a child\'s eyes to demand change',
        hook: 'Don\'t read it as just a sad servant story — the context stages a power binary (master-servant, caste, literacy) that the child\'s innocent gaze both reveals and unsettles. The Avadhi dialect she speaks is authenticity itself: identity recorded with respect, not corrected.',
    },
    teaching: [
        { title: 'भक्तनि — गौण विषय', text: 'गौण विषय (Sub-themes) वे सहायक विषय-वस्तुएँ हैं जो पाठ के मुख्य विषय (Central Theme) को पुष्ट करती हैं, उसका विस्तार करती हैं या उसके विविध आयाम उजागर करती हैं; ये कथानक में समानांतर चलते हुए मुख्य.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'See through the child-narrator\'s eyes: map the household\'s hierarchy before a word of plot, weigh dialect as dignity, and read a memory sketch as social evidence.',
        labels: ['भक्तनि — गौण विषय', 'भक्तनि — साहित्यिक युक्तियाँ', 'भक्तनि — पदावली: मुख्य', 'भक्तनि — व्याकरण: पाठ', 'भक्तनि — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_010', title: 'भक्तनि — पदावली: मुख्य शब्द',
          caseStudy: { intro: 'Imagine you are writing a 5-mark answer on "भक्तनि का चरित्र-चित्रण" and you write "भक्तनि बहुत अच्छी थी" — the examiner gives 1 mark.',
            decisions: [{ prompt: 'पाठ \'भक्तनि\' की NCERT पदावली में दिए गए शब्द **\'लोकाचार\'** का *पाठगत अर्थ* (contextual meaning) लिखिए और बताइए कि यह शब्द भक्तनि के चरित्र.', options: [
                { text: '**Correct Answer:** \'लोकाचार\' का पाठगत अर्थ है', outcome: '**Correct Answer:** \'लोकाचार\' का पाठगत अर्थ है — \'समाज में प्रचलित मान्य परंपराएँ, रीति-रिवाज और.' },
                { text: 'लोगों का व्यवहार', outcome: 'Not quite — **"पदावली रटने के लिए है, समझने के लिए नहीं।"** Students treat the \'पदावली\' box as a **vocabulary.', reveals: 'wrong-idea' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a features-writing course, you\'re profiling the woman who\'s run your hostel kitchen for 30 years. Your editor wants a \'heartwarming\' ending where she cries as the final batch of students leaves — \'that\'s the emotional payoff.\'',
            decisions: [{ prompt: 'What would Mohan Rakesh\'s \'भक्तिन\' tell the editor?', options: [
                { text: 'Cut the tears — the story ends with the narrator noting Bhaktin\'s unbothered self-sufficiency at his own departure, and that refusal of sentimental closure IS the portrait; a lifetime of abandonment made her dignity non-negotiable, and dependency would betray her.', outcome: 'The chapter\'s lesson: the open, unsentimental ending honours her autonomy — the lack of payoff is the resolution, because her strength was never wired to anyone\'s leaving.' },
                { text: 'Add the crying scene — readers need emotional closure, and her reserve is just a detail to warm up.', outcome: 'That\'s the exact misreading: her composure isn\'t a gap in the story, it\'s the story — turning self-reliance into breakdown writes a different, lesser person.', reveals: 'tears-equal-depth' },
                { text: 'Reorder the piece chronologically — childhood, marriage, abandonment, kitchen — so her arc reads cleanly.', outcome: 'The story deliberately opens on her cooking now and folds the past in as flashback; the mundane present framing the hard past is what makes her endurance land — flattening the order flattens her.', reveals: 'chronology-equals-clarity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read an autobiographical sketch as a reformer\'s document — where one remembered woman exposes a whole system\'s quiet cruelties.',
            decisions: [{ prompt: 'What comes next? भक्तनि · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — भक्तनि · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-themes) वे सहायक विषय-वस्तुएँ हैं जो पाठ के मुख्य विषय (Central.',
          hint: 'यदि मुख्य विषय स्पष्ट न हो तो c12_hin_ar_cbse_10_006 पर लौटें; यदि गौण विषय की मूल.',
          misconception: '**विशिष्ट भ्रांति**: *"गौण विषय का अर्थ है कहानी में आए छोटे-मोटे प्रसंग या पात्र, जिनका मुख्य कथानक से सीधा संबंध न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-themes) वे सहायक विषय-वस्तुएँ हैं जो पाठ के मुख्य विषय (Central Theme) को',
                  options: ['गौण विषय (Sub-themes) वे सहायक विषय-वस्तुएँ हैं जो पाठ के मुख्य विषय (Central Theme) को', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि मुख्य विषय स्पष्ट न हो तो c12_hin_ar_cbse_10_006 पर लौटें; यदि गौण विषय की मूल अवधारणा कमजोर हो.',
                  misconception: '**विशिष्ट भ्रांति**: *"गौण विषय का अर्थ है कहानी में आए छोटे-मोटे प्रसंग या पात्र, जिनका मुख्य कथानक से सीधा संबंध न हो।"* **क्यों गलत.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ से 5 प्रसंग चुनो जहाँ मुख्य कथानक (भक्तनि की भक्ति यात्रा) रुककर कोई अन्य बात होती लगे — जैसे.', 'प्रत्येक प्रसंग के लिए पूछें: "यह प्रसंग कौन-सा *संदेश/विचार* दे रहा है?" — उत्तर में आए शब्द (छुआछूत, स्त्री विद्रोह.', 'अब प्रत्येक गौण विषय के लिए लिखवाएँ: "यह मुख्य विषय \'भक्ति-मुक्ति\' को कैसे मजबूत करता है?" — यह चरण \'विषय\' और \'प्रसंग\'.', 'पुनः डायग्नोस्टिक प्रश्न 2 और 3 हल करवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_008', difficulty: 'standard',
          question: '**बिंब (Imagery/Simile)** वह साहित्यिक युक्ति है जहाँ किन्हीं दो वस्तुओं/भावों.',
          hint: 'यदि अटके तो **कक्षा 11 नोड c11_hin_ar_cbse_10_008** की **\'पहचान तालिका\' (Identification.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **हर तुलना रूपक ही होती है** और \'जैसे/सा\' वाले वाक्यों को भी रूपक लिख देते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery/Simile)** वह साहित्यिक युक्ति है जहाँ किन्हीं दो वस्तुओं/भावों की समानता',
                  options: ['**बिंब (Imagery/Simile)** वह साहित्यिक युक्ति है जहाँ किन्हीं दो वस्तुओं/भावों की समानता', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि अटके तो **कक्षा 11 नोड c11_hin_ar_cbse_10_008** की **\'पहचान तालिका\' (Identification Table)**.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **हर तुलना रूपक ही होती है** और \'जैसे/सा\' वाले वाक्यों को भी रूपक लिख देते हैं। *कारण:* कक्षा 9-10 में.' }
          ],
            remediations: { '9-10': { steps: ['छात्र को **कक्षा 11 के नोड c11_hin_ar_cbse_10_008** (भक्तिन — बिंब और रूपक) पर वापस भेजें: वहाँ दी गई **संरचनात्मक भेद.', '**पुनर्निदान (Re-diagnostic):** पाठ से 5 वाक्य निकालें — 3 बिंब, 2 रूपक — और छात्र से **केवल \'जैसे/सा\' छाँटने** को.', 'फिर **भाव-प्रभाव अभ्यास:** प्रत्येक युक्ति के लिए पूछें — "लेखिका ने *यहाँ* रूपक/बिंब क्यों चुना?" — उत्तर में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में असंगत या.',
          hint: 'यदि \'रूपक बनाम प्रतीक\' का भेद स्पष्ट न हो, तो c11_hin_ar_cbse_10_008 (कक्षा 11, बिंब और.',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** और **विरोधाभासी पद-युग्म / ऑक्सीमोरॉन (Oxymoron)** को एक मान लेते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में असंगत या बेतुका लगता है,',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में असंगत या बेतुका लगता है,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि \'रूपक बनाम प्रतीक\' का भेद स्पष्ट न हो, तो c11_hin_ar_cbse_10_008 (कक्षा 11, बिंब और रूपक) के.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** और **विरोधाभासी पद-युग्म / ऑक्सीमोरॉन (Oxymoron)** को एक मान लेते हैं। **उदाहरण:** पाठ में.' }
          ],
            remediations: { 'paradox-oxymoron': { steps: ['**पुनः पढ़ो:** पाठ के वे अंश जहाँ कथन पहली बार \'गलत\' लगे (विरोधाभास) और जहाँ कोई वस्तु/क्रिया \'अधिक अर्थ\' देती लगे.', '**तालिका बनाओ:** दो कॉलम — "शाब्दिक अर्थ" और "प्रतीकात्मक/गहरा अर्थ"। पाठ के 5 उदाहरण भरो। 3.', '**परीक्षण करो:** प्रत्येक उदाहरण के लिए पूछो — "क्या यह ऑक्सीमोरॉन है या पूर्ण-वाक्य विरोधाभास?" "क्या यह तुलना (रूपक).', '**पुनः-निदान:** उपरोक्त डायग्नोस्टिक प्रश्न 1 और 2 फिर से हल करो। यदि अब सही आए, आगे बढ़ो; अन्यथा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_010', difficulty: 'standard',
          question: '"पदावली: मुख्य शब्द" refers to the curated glossary of high-frequency.',
          hint: 'If stuck on *contextual meaning*: Re-read the **specific paragraph** where the word.',
          misconception: '**"पदावली रटने के लिए है, समझने के लिए नहीं।"** Students treat the \'पदावली\' box as a **vocabulary list for MCQs**.',
          parts: [
                { id: 'a', prompt: 'पाठ \'भक्तनि\' की NCERT पदावली में दिए गए शब्द **\'लोकाचार\'** का *पाठगत अर्थ* (contextual meaning) लिखिए और बताइए कि यह शब्द भक्तनि के चरित्र की कौन-सी विशेषता.', answer: '**Correct Answer:** \'लोकाचार\' का पाठगत अर्थ है',
                  options: ['**Correct Answer:** \'लोकाचार\' का पाठगत अर्थ है', 'लोगों का व्यवहार'],
                  hint: 'If stuck on *contextual meaning*: Re-read the **specific paragraph** where the word appears (use.',
                  misconception: '**"पदावली रटने के लिए है, समझने के लिए नहीं।"** Students treat the \'पदावली\' box as a **vocabulary list for MCQs** (meaning.' }
          ],
            remediations: { 'wrong-idea': { steps: ['** Pick the **3 words you got wrong** in the diagnostics above. **', '** Open the NCERT text. **Find the exact paragraph** where each word appears (or is implied). Highlight the sentence. **', '** For each word, write **one PEEL paragraph** (4 lines) answering: "इस शब्द के बिना इस प्रसंग का अर्थ कैसे अधूरा.', '** Re-attempt **Diagnostic Q6** using *only* those 3 words. Compare with the criteria. **'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_011', difficulty: 'standard',
          question: '\'भक्तिन\' पाठ में भाषा-प्रयोग का तात्पर्य लेखक (महादेवी वर्मा) द्वारा कथानक.',
          hint: 'यदि अटको, तो **कक्षा 11 आरोह भाग-1, पाठ 1 (c11_hin_ar_cbse_01_011)** के \'व्याकरण: पाठ में.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'भाषा-प्रयोग\' प्रश्न का उत्तर **शब्दार्थ लिखना** या **अलंकार का नाम बताना** मात्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'भक्तिन\' पाठ में भाषा-प्रयोग का तात्पर्य लेखक (महादेवी वर्मा) द्वारा कथानक, पात्र-चित्रण,',
                  options: ['\'भक्तिन\' पाठ में भाषा-प्रयोग का तात्पर्य लेखक (महादेवी वर्मा) द्वारा कथानक, पात्र-चित्रण,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि अटको, तो **कक्षा 11 आरोह भाग-1, पाठ 1 (c11_hin_ar_cbse_01_011)** के \'व्याकरण: पाठ में.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'भाषा-प्रयोग\' प्रश्न का उत्तर **शब्दार्थ लिखना** या **अलंकार का नाम बताना** मात्र है। **वास्तविकता:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** पाठ के **पैराग्राफ 2, 5, 9** को फिर से पढ़ो — केवल **वाक्य-लंबाई गिनो** (शब्दों में) और नोट करो: कहाँ छोटे.', '**चरण 2:** प्रत्येक पैराग्राफ में **तीन तत्सम, तीन तद्भव, दो देशज शब्द** छाँटो। 3.', '**चरण 3:** एक-एक कर पूछो — "लेखक ने **यही** शब्द/वाक्य **यहाँ** क्यों चुना?" — उत्तर PEEL फॉर्मेट में लिखो। 4.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_4 को दोबारा हल करो — अब मुहावरों का **कार्यात्मक विश्लेषण** (सिर्फ अर्थ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ बोध-प्रश्न वे हैं जिनका उत्तर पाठ से सीधे तथ्य, घटना, पात्र या विवरण.',
          hint: 'यदि पात्र/प्रसंग/युक्ति याद न आए तो तुरंत **c12_hin_ar_cbse_10_004** (पात्र-चित्रण).',
          misconception: 'छात्र समझते हैं कि आशय-सूचक प्रश्न का उत्तर **\'अपनी राय\'** देना है — "मुझे लगता है भक्तिन बहुत अच्छी थी" — जबकि वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ बोध-प्रश्न वे हैं जिनका उत्तर पाठ से सीधे तथ्य, घटना, पात्र या विवरण के रूप',
                  options: ['वस्तुनिष्ठ बोध-प्रश्न वे हैं जिनका उत्तर पाठ से सीधे तथ्य, घटना, पात्र या विवरण के रूप', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि पात्र/प्रसंग/युक्ति याद न आए तो तुरंत **c12_hin_ar_cbse_10_004** (पात्र-चित्रण).',
                  misconception: 'छात्र समझते हैं कि आशय-सूचक प्रश्न का उत्तर **\'अपनी राय\'** देना है — "मुझे लगता है भक्तिन बहुत अच्छी थी" — जबकि वास्तव में उत्तर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: छात्र को एक ही गद्यांश पर ३ वस्तुनिष्ठ और ३ आशय-सूचक प्रश्न देकर **अंतर स्पष्ट करवाएँ** — वस्तुनिष्ठ के उत्तर एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
