import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch06_p2: SimDef = {
    id: 'v3_c12_hin_a_ch06_p2',
    title: 'तुलसीदास · Part 2/3',
    subtitle: 'A Muslim poet heard one verse — and walked to Braj',
    classLevel: 12, subject: 'hin_a', topic: 'तुलसीदास · Part 2/3',
    chapters: ['c12_hin_a_ch06'],
    nodeIds: ['c12_hin_a_cbse_06_007', 'c12_hin_a_cbse_06_008', 'c12_hin_a_cbse_06_009', 'c12_hin_a_cbse_06_010', 'c12_hin_a_cbse_06_011', 'c12_hin_a_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Bhakti-tradition scholar', intro: 'He was born into one faith and sang himself into another\'s heart — the Bhakti movement\'s boldest proof.', goal: 'Situate Raskhan in syncretic Bhakti and distinguish virah from vatsalya across the chapter\'s texts.' },
    discovery: {
        question: 'A 16th-century Muslim leaves court life for Vrindavan and writes Krishna-bhakti in Braj Bhasha. Why does Raskhan matter beyond his poems?',
        options: ['He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper', 'He converted religions', 'His poetry is prettier than Surdas\'s', 'Courts were boring'],
        answer: 'He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper',
        hook: 'One chapter holds two flavours of prem: Radha\'s virah — love through separation — and Yashoda\'s vatsalya — a mother\'s tenderness. Reading both as just \'love\' flattens Bhakti\'s emotional precision; each is a different road to the divine.',
    },
    teaching: [
        { title: 'तुलसीदास — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**बिंब (Imagery):** काव्य में प्रयुक्त वह शब्द-योजना जो पाठक के मन में इंद्रियगत अनुभूति (दृश्य, श्रव्य, घ्राण, स्पर्श, स्वाद) उत्पन्न करे, उसे बिंब कहते हैं। **प्रतीक (Symbol):** कोई वस्तु, व्यक्ति.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Braj through an outsider who became its own: trace Raskhan\'s turn from worldly life to Krishna, then weigh longing against maternal love as two bhakti grammars.',
        labels: ['तुलसीदास — साहित्यिक युक्तियाँ', 'तुलसीदास — मुख्य भाव', 'तुलसीदास — गौण भाव', 'तुलसीदास — पदावली: कठिन', 'तुलसीदास — व्याकरण: पद्य', 'तुलसीदास — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student society is profiling a beloved classical-music teacher who converted faiths midlife and then devoted himself to Krishna-bhakti poetry. A committee member wants his early Persian-Arabic training cut from the bio: \'it muddies the devotional image.\'',
            decisions: [{ prompt: 'How does the structure of the Raskhan sketch answer that edit?', options: [
                { text: 'Keep it exactly where the sketch keeps it — the biography deliberately establishes his Islamic scholarly background before the Gita Govinda turning point, so the devotion reads as a boundary crossed, not a brand polished; cutting the \'before\' guts the \'after\'.', outcome: 'The chapter shows those details are thematic scaffolding, not trivia: the juxtaposition is what proves divine love transcends religious identity — remove the contrast and Raskhan becomes a generic saint.' },
                { text: 'Cut it — the committee is right that a devotional profile should foreground only the devotional life.', outcome: 'That inverts the sketch\'s design: the earlier identity is what makes the transformation legible as transformation; without it, there\'s no crossing, only a career.', reveals: 'background-muddies-message' },
                { text: 'Keep the training but move it to a footnote so it doesn\'t interrupt the devotional arc.', outcome: 'Placement is the argument — the sketch sequences background before the turning point so readers feel the leap; demoting it to a footnote keeps the fact but kills the contrast that gives it meaning.', reveals: 'order-doesnt-matter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Bhakti as lived synthesis — and separate virah from vatsalya like the tradition itself does.',
            decisions: [{ prompt: 'What comes next? तुलसीदास · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तुलसीदास · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_007', difficulty: 'standard',
          question: '**बिंब (Imagery):** काव्य में प्रयुक्त वह शब्द-योजना जो पाठक के मन में.',
          hint: 'यदि फँस जाएँ, तो कक्षा 11 अंतरा के **किसी एक काव्य (जैसे: \'जाग तुझको दूर जाना\'.',
          misconception: '**विशिष्ट भ्रांति:** "तुलसीदास के काव्य में हर बिंब प्रतीक है, और हर प्रतीक बिंब है।" **वास्तविकता:** **बिंब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** काव्य में प्रयुक्त वह शब्द-योजना जो पाठक के मन में इंद्रियगत अनुभूति',
                  options: ['**बिंब (Imagery):** काव्य में प्रयुक्त वह शब्द-योजना जो पाठक के मन में इंद्रियगत अनुभूति', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है'],
                  hint: 'यदि फँस जाएँ, तो कक्षा 11 अंतरा के **किसी एक काव्य (जैसे: \'जाग तुझको दूर जाना\'.',
                  misconception: '**विशिष्ट भ्रांति:** "तुलसीदास के काव्य में हर बिंब प्रतीक है, और हर प्रतीक बिंब है।" **वास्तविकता:** **बिंब = इंद्रियगत चित्र (साधन).' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "पाठ के किन्हीं 5 पदों में केवल **संज्ञा/विशेषण** शब्द छाँटिए जो आँखों को चित्र दिखाएँ (जैसे.', '**चरण 2:** उन्हीं शब्दों में से पूछें: "इनमें से कौन-सा शब्द **केवल चित्र नहीं, कोई बड़ा संदेश भी देता है**?', '(संकेत: कमल, धनुष, वन, नाम, मणि)।" इन्हें **प्रतीक-शब्द** चिह्नित कराएँ। 3.', '**चरण 3:** एक तालिका बनवाएँ: **शब्द | बिंब प्रकार (दृश्य/श्रव्य...) | प्रतीक अर्थ (हाँ/नहीं + क्या)**। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_008', difficulty: 'standard',
          question: 'मुख्य भाव वह मूलभूत अनुभूति है जो तुलसीदास के समग्र पद संग्रह में बार-बार.',
          hint: 'यदि मुख्य भाव पहचानने में कठिनाई हो, तो तुलसीदास के पदों में दोहराए जाने वाले विचारों.',
          misconception: 'छात्र अक्सर तुलसीदास के पदों में आने वाले दोहराए जाने वाले शब्द (जैसे "राम", "नाम", "भक्ति") को खुद मुख्य भाव मान लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव वह मूलभूत अनुभूति है जो तुलसीदास के समग्र पद संग्रह में बार-बार व्यक्त होती है',
                  options: ['मुख्य भाव वह मूलभूत अनुभूति है जो तुलसीदास के समग्र पद संग्रह में बार-बार व्यक्त होती है', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है'],
                  hint: 'यदि मुख्य भाव पहचानने में कठिनाई हो, तो तुलसीदास के पदों में दोहराए जाने वाले विचारों, भावनाओं या.',
                  misconception: 'छात्र अक्सर तुलसीदास के पदों में आने वाले दोहराए जाने वाले शब्द (जैसे "राम", "नाम", "भक्ति") को खुद मुख्य भाव मान लेते हैं, बिना सोचे-समझे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले एक पद दिया जाना चाहिए जिसमें दोहराया गया शब्द स्पष्ट रूप से प्रतीक हो (जैसे "जहाँ दया तहाँ धर्म है".', 'यदि हम इसे हटा दें तो क्या अर्थ बदल जाता है?" फिर उन्हें पद का भाव बताने के लिए कहा जाना चाहिए - "यह पद हमें कैसा महसूस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_009', difficulty: 'standard',
          question: '**गौण भाव** (Subsidiary Sentiment) काव्य में वह द्वितीयक रस/भाव है जो मुख्य रस.',
          hint: 'यदि मुख्य भाव अस्पष्ट हो तो **c12_hin_a_cbse_06_008** पर लौटें; यदि पद्यांश समझ न आए तो.',
          misconception: '**सबसे घातक भ्रम**: *"गौण भाव = मुख्य भाव का कमजोर/छोटा संस्करण"* — छात्र भरत-प्रसंग को \'राम-भक्ति का हल्का रूप\' मान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**गौण भाव** (Subsidiary Sentiment) काव्य में वह द्वितीयक रस/भाव है जो मुख्य रस (यहाँ',
                  options: ['**गौण भाव** (Subsidiary Sentiment) काव्य में वह द्वितीयक रस/भाव है जो मुख्य रस (यहाँ', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है'],
                  hint: 'यदि मुख्य भाव अस्पष्ट हो तो **c12_hin_a_cbse_06_008** पर लौटें; यदि पद्यांश समझ न आए तो.',
                  misconception: '**सबसे घातक भ्रम**: *"गौण भाव = मुख्य भाव का कमजोर/छोटा संस्करण"* — छात्र भरत-प्रसंग को \'राम-भक्ति का हल्का रूप\' मान लेते हैं, जबकि भरत का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र को **c12_hin_a_cbse_06_008 (मुख्य भाव और संदेश)** दोबारा पढ़ने को कहें — मुख्य भाव (भक्ति/शान्त) को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_010', difficulty: 'standard',
          question: 'पदावली के अंतर्गत तुलसीदास के पदों में प्रयुक्त क्लिष्ट/तत्सम/देशज शब्दों के.',
          hint: 'यदि प्रसंगानुकूल अर्थ नहीं पकड़ पा रहे, तो **c12_hin_a_cbse_06_002 (पद्यांश-वार.',
          misconception: '**सबसे घातक भ्रांति:** "कठिन शब्द का अर्थ = शब्दकोश में दिया पहला अर्थ।" छात्र \'अनघ\', \'निर्मल\', \'अच्युत\' जैसे तत्सम.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के अंतर्गत तुलसीदास के पदों में प्रयुक्त क्लिष्ट/तत्सम/देशज शब्दों के प्रसंगानुकूल',
                  options: ['पदावली के अंतर्गत तुलसीदास के पदों में प्रयुक्त क्लिष्ट/तत्सम/देशज शब्दों के प्रसंगानुकूल', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है'],
                  hint: 'यदि प्रसंगानुकूल अर्थ नहीं पकड़ पा रहे, तो **c12_hin_a_cbse_06_002 (पद्यांश-वार भावार्थ)** के.',
                  misconception: '**सबसे घातक भ्रांति:** "कठिन शब्द का अर्थ = शब्दकोश में दिया पहला अर्थ।" छात्र \'अनघ\', \'निर्मल\', \'अच्युत\' जैसे तत्सम शब्दों का केवल एक अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** NCERT पाठ्यपुस्तक के \'पदावली\' खंड से 10 कठिन शब्द चुनकर उनकी **प्रसंगानुकूल अर्थ-सूची** बनाओ (शब्दकोश अर्थ.', '**चरण 2:** तुलसीदास के किन्हीं दो पदों में आए 3-3 मुहावरे निकालो और उनकी **तुलनात्मक सारणी** बनाओ (शाब्दिक.', '**चरण 3:** किसी एक मुहावरे (जैसे \'भवसागर\') पर 50 शब्दों का **मिनी-निबंध** लिखो: तुलसी के यहाँ अर्थ → सूफी काव्य में.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_3 और 4 फिर से हल करो। यदि अब भी प्रसंगानुकूल अर्थ नहीं पकड़ पा रहे हो, तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_011', difficulty: 'standard',
          question: 'तुलसीदास के पद्यों में भाषा-प्रयोग शब्दों के चयन, वाक्य विन्यास, अलंकारिक.',
          hint: 'यदि फंसे तो c12_hin_a_cbse_06_005 (छंद और लय-विधान) की दोबारा समीक्षा करें, विशेष रूप से.',
          misconception: 'छात्र अक्सर मानते हैं कि तुलसीदास के पद्यों में भाषा-प्रयोग का अर्थ केवल कठिन शब्दों के अर्थ जानना है, जबकि वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'तुलसीदास के पद्यों में भाषा-प्रयोग शब्दों के चयन, वाक्य विन्यास, अलंकारिक प्रयोग और छंदीय',
                  options: ['तुलसीदास के पद्यों में भाषा-प्रयोग शब्दों के चयन, वाक्य विन्यास, अलंकारिक प्रयोग और छंदीय', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है'],
                  hint: 'यदि फंसे तो c12_hin_a_cbse_06_005 (छंद और लय-विधान) की दोबारा समीक्षा करें, विशेष रूप से मात्रा और.',
                  misconception: 'छात्र अक्सर मानते हैं कि तुलसीदास के पद्यों में भाषा-प्रयोग का अर्थ केवल कठिन शब्दों के अर्थ जानना है, जबकि वास्तव में यह वाक्य विन्यास.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही पंक्ति में वाक्य विन्यास बदलने से अर्थ में परिवर्तन आता है (जैसे "राम जाते हैं" vs "जाते हैं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनमें तथ्यात्मक जानकारी जैसे शब्दार्थ, छंद.',
          hint: 'यदि छात्र शब्दार्थ में फंस रहा है तो c12_hin_a_cbse_06_010 (पदावली: कठिन शब्द और मुहावरे).',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों का उत्तर देते समय कविता की पंक्तियों को दोहराकर सोचते हैं कि वे भाव स्पष्ट कर रहे हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनमें तथ्यात्मक जानकारी जैसे शब्दार्थ, छंद, अलंकार पूछी',
                  options: ['वस्तुनिष्ठ प्रश्न वे होते हैं जिनमें तथ्यात्मक जानकारी जैसे शब्दार्थ, छंद, अलंकार पूछी', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है'],
                  hint: 'यदि छात्र शब्दार्थ में फंस रहा है तो c12_hin_a_cbse_06_010 (पदावली: कठिन शब्द और मुहावरे) को दोबारा.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों का उत्तर देते समय कविता की पंक्तियों को दोहराकर सोचते हैं कि वे भाव स्पष्ट कर रहे हैं, जैसे प्रश्न हो—"कवि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर कैसे मजबूत बनाया जाए। उदाहरण: कमजोर—"कवि कहता है कि प्रेम करें"। मजबूत—"कवि कहता है.', '(4) उत्तर में कारण जोड़ें—"क्योंकि" शब्द का प्रयोग करें। (5) संदर्भ से जोड़ें—कहाँ और कैसे प्रेम बताया गया है। इससे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
