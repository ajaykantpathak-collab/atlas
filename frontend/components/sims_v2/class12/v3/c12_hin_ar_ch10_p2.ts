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
        { title: 'भक्तनि — गौण विषय', text: '\'आरोह भाग-2 — पाठ 10\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'See through the child-narrator\'s eyes: map the household\'s hierarchy before a word of plot, weigh dialect as dignity, and read a memory sketch as social evidence.',
        labels: ['भक्तनि — गौण विषय', 'भक्तनि — साहित्यिक युक्तियाँ', 'भक्तनि — पदावली: मुख्य', 'भक्तनि — व्याकरण: पाठ', 'भक्तनि — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_010', title: 'भक्तनि — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 10\' के मुख्य शब्द: आरोह-भाग-2-—-पाठ-10 — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'What is the primary strategy for determining the meaning of an unपरिचित word in a literary text like HkfDru?', options: [
                { text: 'The primary strategy is to analyze the surrounding context', outcome: 'The primary strategy is to analyze the surrounding context — including tone, imagery, character.' },
                { text: 'look it up in a dictionary first', outcome: 'Not quite — Students treat the \'kCn&Nfo (word-meanings) list as a definitive answer key, memorizing glosses.', reveals: 'students-treat-the-kcn-nfo' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_011', title: 'भक्तनि — व्याकरण: पाठ में भाषा-प्रयोग',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 10\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'Identify the specific verb ending used by भक्तिन in the text that replaces the standard Hindi \'है\' (hai) or \'हैं\' (hain), and give one.', options: [
                { text: 'The verb ending is \'थ\' (th) used for both singular and plural present tense (e.g., "गक', outcome: 'The verb ending is \'थ\' (th) used for both singular and plural present tense (e.g., "गक; गस" -> "गक.' },
                { text: '\'है\' or \'हो\'', outcome: 'Not quite — Students treat dialectal forms in "भक्तिन" as *errors* or *deviations* from "correct" Hindi that.', reveals: 'students-treat-dialectal-forms-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_012', title: 'भक्तनि — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 10\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'आरोह भाग-2।',
            decisions: [{ prompt: 'Define literal and inferential comprehension questions in your own words.', options: [
                { text: 'Literal questions ask for facts explicitly stated in the text (e.g., "What is HkfDru\'s', outcome: 'Literal questions ask for facts explicitly stated in the text (e.g., "What is HkfDru\'s age when she.' },
                { text: 'not directly stated', outcome: 'Not quite — Students treat inferential questions as "opinion questions" and answer from personal feeling (e.g.', reveals: 'students-treat-inferential-questions-as' },
                { text: 'not in the text at all', outcome: 'Not quite — Students treat inferential questions as "opinion questions" and answer from personal feeling (e.g.', reveals: 'students-treat-inferential-questions-as' }
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
          question: '\'आरोह भाग-2 — पाठ 10\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि मुख्य विषय स्पष्ट न हो तो c12_hin_ar_cbse_10_006 पर लौटें; यदि गौण विषय की मूल.',
          misconception: '**विशिष्ट भ्रांति**: *"गौण विषय का अर्थ है कहानी में आए छोटे-मोटे प्रसंग या पात्र, जिनका मुख्य कथानक से सीधा संबंध न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 10\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'आरोह भाग-2 — पाठ 10\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 10\' का कथानक — \'आरोह भाग-2 — पाठ 10\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि मुख्य विषय स्पष्ट न हो तो c12_hin_ar_cbse_10_006 पर लौटें; यदि गौण विषय की मूल अवधारणा कमजोर हो.',
                  misconception: '**विशिष्ट भ्रांति**: *"गौण विषय का अर्थ है कहानी में आए छोटे-मोटे प्रसंग या पात्र, जिनका मुख्य कथानक से सीधा संबंध न हो।"* **क्यों गलत.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ से 5 प्रसंग चुनो जहाँ मुख्य कथानक (भक्तनि की भक्ति यात्रा) रुककर कोई अन्य बात होती लगे — जैसे.', 'प्रत्येक प्रसंग के लिए पूछें: "यह प्रसंग कौन-सा *संदेश/विचार* दे रहा है?" — उत्तर में आए शब्द (छुआछूत, स्त्री विद्रोह.', 'अब प्रत्येक गौण विषय के लिए लिखवाएँ: "यह मुख्य विषय \'भक्ति-मुक्ति\' को कैसे मजबूत करता है?" — यह चरण \'विषय\' और \'प्रसंग\'.', 'पुनः डायग्नोस्टिक प्रश्न 2 और 3 हल करवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_008', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 10\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो **कक्षा 11 नोड c11_hin_ar_cbse_10_008** की **\'पहचान तालिका\' (Identification.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **हर तुलना रूपक ही होती है** और \'जैसे/सा\' वाले वाक्यों को भी रूपक लिख देते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 10\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'आरोह भाग-2 — पाठ 10\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 10\' का कथानक — \'आरोह भाग-2 — पाठ 10\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **कक्षा 11 नोड c11_hin_ar_cbse_10_008** की **\'पहचान तालिका\' (Identification Table)**.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **हर तुलना रूपक ही होती है** और \'जैसे/सा\' वाले वाक्यों को भी रूपक लिख देते हैं। *कारण:* कक्षा 9-10 में.' }
          ],
            remediations: { '9-10': { steps: ['छात्र को **कक्षा 11 के नोड c11_hin_ar_cbse_10_008** (भक्तिन — बिंब और रूपक) पर वापस भेजें: वहाँ दी गई **संरचनात्मक भेद.', '**पुनर्निदान (Re-diagnostic):** पाठ से 5 वाक्य निकालें — 3 बिंब, 2 रूपक — और छात्र से **केवल \'जैसे/सा\' छाँटने** को.', 'फिर **भाव-प्रभाव अभ्यास:** प्रत्येक युक्ति के लिए पूछें — "लेखिका ने *यहाँ* रूपक/बिंब क्यों चुना?" — उत्तर में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_009', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 10\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि \'रूपक बनाम प्रतीक\' का भेद स्पष्ट न हो, तो c11_hin_ar_cbse_10_008 (कक्षा 11, बिंब और.',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** और **विरोधाभासी पद-युग्म / ऑक्सीमोरॉन (Oxymoron)** को एक मान लेते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 10\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'आरोह भाग-2 — पाठ 10\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 10\' का कथानक — \'आरोह भाग-2 — पाठ 10\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि \'रूपक बनाम प्रतीक\' का भेद स्पष्ट न हो, तो c11_hin_ar_cbse_10_008 (कक्षा 11, बिंब और रूपक) के.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** और **विरोधाभासी पद-युग्म / ऑक्सीमोरॉन (Oxymoron)** को एक मान लेते हैं। **उदाहरण:** पाठ में.' }
          ],
            remediations: { 'paradox-oxymoron': { steps: ['**पुनः पढ़ो:** पाठ के वे अंश जहाँ कथन पहली बार \'गलत\' लगे (विरोधाभास) और जहाँ कोई वस्तु/क्रिया \'अधिक अर्थ\' देती लगे.', '**तालिका बनाओ:** दो कॉलम — "शाब्दिक अर्थ" और "प्रतीकात्मक/गहरा अर्थ"। पाठ के 5 उदाहरण भरो। 3.', '**परीक्षण करो:** प्रत्येक उदाहरण के लिए पूछो — "क्या यह ऑक्सीमोरॉन है या पूर्ण-वाक्य विरोधाभास?" "क्या यह तुलना (रूपक).', '**पुनः-निदान:** उपरोक्त डायग्नोस्टिक प्रश्न 1 और 2 फिर से हल करो। यदि अब सही आए, आगे बढ़ो; अन्यथा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_010', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 10\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, re-read the "Hkk"kk dh ckr" (Language Talk) section at the end of the chapter.',
          misconception: 'Students treat the \'kCn&Nfo (word-meanings) list as a definitive answer key, memorizing glosses like "vLi"V.',
          parts: [
                { id: 'a', prompt: 'What is the primary strategy for determining the meaning of an unपरिचित word in a literary text like HkfDru?', answer: 'The primary strategy is to analyze the surrounding context',
                  options: ['The primary strategy is to analyze the surrounding context', 'look it up in a dictionary first'],
                  hint: 'If stuck, re-read the "Hkk"kk dh ckr" (Language Talk) section at the end of the chapter — it is the.',
                  misconception: 'Students treat the \'kCn&Nfo (word-meanings) list as a definitive answer key, memorizing glosses like "vLi"V iqujko`fÙk;k¡ = clear.' },
                { id: 'b', prompt: 'In the sentence "gekjs ekyfdu rkS jkr&fnu fdrfc;u ek¡ xM+h jgrh gSa", the phrase "fdrfc;u ek¡" literally means "hands full of work", but what does.', answer: 'It conveys overwhelmed helplessness mixed with tender resignation',
                  options: ['It conveys overwhelmed helplessness mixed with tender resignation', 'she has a lot of work'],
                  hint: 'If stuck, re-read the "Hkk"kk dh ckr" (Language Talk) section at the end of the chapter — it is the.',
                  misconception: 'Students treat the \'kCn&Nfo (word-meanings) list as a definitive answer key, memorizing glosses like "vLi"V iqujko`fÙk;k¡ = clear.' }
          ],
            remediations: { 'students-treat-the-kcn-nfo': { steps: ['If a student cannot move beyond dictionary meanings: (1) Give them the sentence "HkfDru dh oaQtwlh osQ izk.k iawthHkwr.', '(2) Have them read the paragraph aloud in Braj rhythm, then in flat standard Hindi — hear the difference.', '(3) Assign: find 3 words where the glossary meaning feels "thin" and write 2 lines explaining the missing emotional.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_011', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 10\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck, review Class 11 Chapter 10 Grammar node (c11_hin_ar_cbse_10_011) — specifically.',
          misconception: 'Students treat dialectal forms in "भक्तिन" as *errors* or *deviations* from "correct" Hindi that the author "couldn\'t.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 10\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'आरोह भाग-2 — पाठ 10\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 10\' का कथानक — \'आरोह भाग-2 — पाठ 10\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review Class 11 Chapter 10 Grammar node (c11_hin_ar_cbse_10_011) — specifically the.',
                  misconception: 'Students treat dialectal forms in "भक्तिन" as *errors* or *deviations* from "correct" Hindi that the author "couldn\'t avoid" because the.' }
          ],
            remediations: { 'students-treat-dialectal-forms-in': { steps: ['If a student holds this misconception: Step 1 — Give them two sentences: one with a genuine performance error (e.g.', 'Ask: "Which follows a *system*?" Step 2 — Show the Braj grammar rule: present tense 3rd person singular ends in -th.', 'Step 3 — Have them find 5 consistent \'th\' endings in the text.', 'Step 4 — Ask: "If it were random errors, would it be this consistent?" Step 5 — Re-read the narrator\'s reaction: she.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_012', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 10\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck, review the chapter summary and character sketches from nodes.',
          misconception: 'Students treat inferential questions as "opinion questions" and answer from personal feeling (e.g., "I think she.',
          parts: [
                { id: 'a', prompt: 'Read the question: "What work does HkfDru do in the narrator\'s house?" Is this literal or inferential? Explain how you know.', answer: 'This is a literal question',
                  options: ['This is a literal question', 'detail-rich', 'implicit', 'not directly stated'],
                  hint: 'If stuck, review the chapter summary and character sketches from nodes c12_hin_ar_cbse_10_002 and.',
                  misconception: 'Students treat inferential questions as "opinion questions" and answer from personal feeling (e.g., "I think she is sad") instead.' },
                { id: 'b', prompt: 'Answer this literal question using the text: "What name does the narrator\'s mother give HkfDru, and why does she choose it?"', answer: 'Identify keywords: "mother", "give HkfDru", "name"',
                  options: ['Identify keywords: "mother", "give HkfDru", "name"', 'not directly stated', 'not in the text at all'],
                  hint: 'If stuck, review the chapter summary and character sketches from nodes c12_hin_ar_cbse_10_002 and.',
                  misconception: 'Students treat inferential questions as "opinion questions" and answer from personal feeling (e.g., "I think she is sad") instead.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Give the student a short paragraph from the chapter.', 'Ask them to write one literal and one inferential question about it.', 'Have them swap with a partner and answer each other\'s questions, highlighting the exact words used.', 'Debrief: for inferential answers, demand "Show me the two sentences that led you there." Repeat with three new.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat inferential questions as "opinion questions" and answer from personal feeling (e.g., "I think she.',
          parts: [
                { id: 'a', prompt: 'Evaluate: Which inference about HkfDru\'s silence on her name is better supported? (A) She forgot her name. (B) She protects her dignity by withholding it.', answer: '(B) is better supported',
                  options: ['(B) is better supported', 'not directly stated', 'not in the text at all'],
                  hint: 'If stuck, review the chapter summary and character sketches from nodes c12_hin_ar_cbse_10_002 and.',
                  misconception: 'Students treat inferential questions as "opinion questions" and answer from personal feeling (e.g., "I think she is sad") instead.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Give the student a short paragraph from the chapter.', 'Ask them to write one literal and one inferential question about it.', 'Have them swap with a partner and answer each other\'s questions, highlighting the exact words used.', 'Debrief: for inferential answers, demand "Show me the two sentences that led you there." Repeat with three new.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
