import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch01_p2: SimDef = {
    id: 'v3_c12_hin_a_ch01_p2',
    title: 'देवसेना का गीत, कार्नेलयिा का गीत · Part 2/3',
    subtitle: 'Same god, different century — context is the lens',
    classLevel: 12, subject: 'hin_a', topic: 'देवसेना का गीत, कार्नेलयिा का गीत · Part 2/3',
    chapters: ['c12_hin_a_ch01'],
    nodeIds: ['c12_hin_a_cbse_01_007', 'c12_hin_a_cbse_01_008', 'c12_hin_a_cbse_01_009', 'c12_hin_a_cbse_01_010', 'c12_hin_a_cbse_01_011', 'c12_hin_a_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi poetry scholar', intro: 'Before a single line of Tulsidas, there\'s a world to rebuild — the Bhakti age that made his poems possible.', goal: 'Use contextual reading — author, era, movement, language — to situate Tulsidas\'s poems in the Bhakti tradition.' },
    discovery: {
        question: 'Same poet Tulsidas, same devotion — but read him beside Nirala and the poems could be from different universes. What separates them?',
        options: ['Context — Bhakti-era Awadhi devotion for mass access versus Chhayavad\'s Khari Boli individualism; era, movement and language write the poem before the poet does', 'Just personal taste', 'Only the language differs', 'Nothing — poetry is timeless'],
        answer: 'Context — Bhakti-era Awadhi devotion for mass access versus Chhayavad\'s Khari Boli individualism; era, movement and language write the poem before the poet does',
        hook: '\'Before You Read\' isn\'t optional décor — without it, Tulsidas\'s Rama reads as just mythology instead of a personal god open to every caste. Three questions unlock any poem: whose life, which movement, what tongue.',
    },
    teaching: [
        { title: 'देवसेना का गीत, कार्नेलयिा का गीत — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'प्रतीक वह वस्तु, चित्र या विचार है जो अपने शब्दार्थ के अलावा एक गहरा, सार्वभौमिक अर्थ दर्शाता है (जैसे शांति के लिए कबूतर), जबकि बिंब वह 구체िक संवेदनात्मक विवरण है जो पाठक के मन में स्पष्ट चित्र बनाता.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build the lens before the poem: reconstruct Tulsidas\'s Bhakti world — Mughal era, Awadhi, devotion for all — and test how context changes what a single word can mean.',
        labels: ['देवसेना का गीत, कार्नेलयिा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your batch wants a song for the annual day honouring the school\'s retiring matron. The lyricist drafts a literal timeline — joined in this year, served in that year — and it reads like a résumé set to music.',
            decisions: [{ prompt: 'How does Nirala\'s structuring of \'देवसेना का गीत\' and \'कानेसरिया का गीत\' suggest fixing it?', options: [
                { text: 'Rebuild it as an emotional arc, not a résumé — open inside one personal moment of hers, let the feeling turn from private memory to collective debt, and end on the batch\'s open pledge — the way the poems move from private grief to an appeal the listener must carry.', outcome: 'The chapter\'s insight is that a lyric\'s plot is the journey of the speaker\'s consciousness — emotional beats do the narrative work events do in prose.' },
                { text: 'Keep the timeline — a tribute should record the facts of her service accurately.', outcome: 'That\'s the event-plot assumption the chapter corrects: a list of dates documents a career but never becomes a song — without an emotional pivot the audience is informed, not moved.', reveals: 'facts-make-a-song' },
                { text: 'Make it fully abstract — drop her story and write only grand verses about service.', outcome: 'The poems earn their collective ending by starting inside a specific grief; pure abstraction skips the concrete wound that makes the final appeal land.', reveals: 'abstract-is-universal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now approach any Hindi text with the reader\'s toolkit — biography, movement and milieu as the keys that turn \'old verse\' into argument.',
            decisions: [{ prompt: 'What comes next? देवसेना का गीत, कार्नेलयिा का गीत · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — देवसेना का गीत, कार्नेलयिा का गीत · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_007', difficulty: 'standard',
          question: 'प्रतीक वह वस्तु, चित्र या विचार है जो अपने शब्दार्थ के अलावा एक गहरा.',
          hint: 'यदि प्रतीक और बिंब के बीच अंतर समझ में नहीं आता है, तो class 11 के नोड.',
          misconception: 'छात्र अक्सर देवसेना के गीत में "पीलिया" या कार्नेलयिा के गीत में "स्मारिका" जैसे शब्दों को प्रतीक मान लेते हैं, जबकि ये.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रतीक वह वस्तु, चित्र या विचार है जो अपने शब्दार्थ के अलावा एक गहरा, सार्वभौमिक अर्थ',
                  options: ['प्रतीक वह वस्तु, चित्र या विचार है जो अपने शब्दार्थ के अलावा एक गहरा, सार्वभौमिक अर्थ', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित'],
                  hint: 'यदि प्रतीक और बिंब के बीच अंतर समझ में नहीं आता है, तो class 11 के नोड c11_hin_a_cbse_01_008 (बिंब.',
                  misconception: 'छात्र अक्सर देवसेना के गीत में "पीलिया" या कार्नेलयिा के गीत में "स्मारिका" जैसे शब्दों को प्रतीक मान लेते हैं, जबकि ये वास्तव में सिर्फ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस गलती को ठीक करने के लिए, छात्र को निम्नलिखित तीन-चरणीय अभ्यास करवाइए: (1) कविता की कोई एक पंक्ति चुनिए जिसमें एक.', '(2) अगर नहीं, तो उसी पंक्ति के आसपास के शब्द देखिए — क्या कोई क्रिया, विशेषण, या दोहराव है जो इस शब्द का अर्थ बदल रहा.', '(जैसे "पीलिया से तड़पता शरीर" में "तड़पता" भाव जोड़ रहा है) (3) फिर तय कीजिए: क्या अब ये संयोजन एक स्पष्ट चित्र (बिंब).', 'इस तरीके से वे सीखेंगे कि प्रतीक शब्द से नहीं, संदर्भ से जन्म लेता है — ये अभ्यास NCERT के बोध प्रश्न पैटर्न पर सीधा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_008', difficulty: 'standard',
          question: 'मुख्य भाव (Central Theme) refers to the core philosophical conflict.',
          hint: 'If stuck, revisit **काव्य-संरचना और पद्य-विन्यास** (c12_hin_a_cbse_01_003) — the poem\'s.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि देवसेना = \'पिछड़ी हुई स्त्री\' और कार्नेलिया = \'प्रगतिशील स्त्री\'। **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव (Central Theme) refers to the core philosophical conflict or ideological stance',
                  options: ['मुख्य भाव (Central Theme) refers to the core philosophical conflict or ideological stance', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित'],
                  hint: 'If stuck, revisit **काव्य-संरचना और पद्य-विन्यास** (c12_hin_a_cbse_01_003) — the poem\'s argument.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि देवसेना = \'पिछड़ी हुई स्त्री\' और कार्नेलिया = \'प्रगतिशील स्त्री\'। **वास्तविकता:** देवसेना एक **सुसंगत.' }
          ],
            remediations: { 'coherent-worldview': { steps: ['**पुनर्पाठ (Re-read):** छात्र को दोनों कविताएँ **मौन पाठ** (silent reading) नहीं, **सस्वर पाठ** (aloud reading) कराएँ.', '**वक्तव्य-मानचित्रण (Voice-mapping):** एक टेबल बनाएँ: कॉलम 1 = देवसेना के तर्क (यज्ञ, मन्त्र, व्यवस्था), कॉलम 2.', '**बिम्ब-विच्छेद (Image-dissection):** \'अग्नि\', \'पुरोहित\', \'यज्ञ\', \'ज्ञान\' — प्रत्येक बिम्ब के लिए लिखें: देवसेना के लिए.', '**पुनः-निदान (Re-diagnostic):** DIAGNOSTIC_QUESTION_3 और 4 दोहराएँ — अब छात्र संदर्भ-निर्भर अर्थ निकाल पाएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_009', difficulty: 'standard',
          question: 'गौण भाव वे सूक्ष्म,secondary भाव होते हैं जो कविता या गद्य के मुख्य भाव को.',
          hint: 'यदि फंसे तो मुख्य भाव और रस (c12_hin_a_cbse_01_008) दोबारा देखें कि मुख्य भाव कैसे पहचाना.',
          misconception: 'छात्र अक्सर गौण भाव को मुख्य भाव से अलग नहीं कर पाते हैं और कोई भी प्रधान भाव जिसे वे देखते हैं, उसे मुख्य भाव मान लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव वे सूक्ष्म,secondary भाव होते हैं जो कविता या गद्य के मुख्य भाव को समर्थन देते',
                  options: ['गौण भाव वे सूक्ष्म,secondary भाव होते हैं जो कविता या गद्य के मुख्य भाव को समर्थन देते', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित'],
                  hint: 'यदि फंसे तो मुख्य भाव और रस (c12_hin_a_cbse_01_008) दोबारा देखें कि मुख्य भाव कैसे पहचाना जाता है।',
                  misconception: 'छात्र अक्सर गौण भाव को मुख्य भाव से अलग नहीं कर पाते हैं और कोई भी प्रधान भाव जिसे वे देखते हैं, उसे मुख्य भाव मान लेते हैं। उदाहरण के लिए.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले देवसेना का गीत के दो पद्यांश दिए जाएँ और पूछा जाए: "कौन सा भाव पूरे कविता में दोहराया जा रहा है?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_010', difficulty: 'standard',
          question: 'पदावली (शब्दावली) का अर्थ है किसी रचना में प्रयुक्त विशिष्ट शब्दों, मुहावरों और.',
          hint: 'यदि संधि/समास/धातु पहचानने में अटकें → c11_hin_a_cbse_13_011 (व्याकरण: पद्य में.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "कठिन शब्दों के अर्थ रट लेने से" पदावली तैयार हो जाती है। **वास्तविकता:** बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (शब्दावली) का अर्थ है किसी रचना में प्रयुक्त विशिष्ट शब्दों, मुहावरों और',
                  options: ['पदावली (शब्दावली) का अर्थ है किसी रचना में प्रयुक्त विशिष्ट शब्दों, मुहावरों और', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित'],
                  hint: 'यदि संधि/समास/धातु पहचानने में अटकें → c11_hin_a_cbse_13_011 (व्याकरण: पद्य में भाषा-प्रयोग) के.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "कठिन शब्दों के अर्थ रट लेने से" पदावली तैयार हो जाती है। **वास्तविकता:** बोर्ड परीक्षा में पूछे जाते.' }
          ],
            remediations: { '1': { steps: ['**पुनः पढ़ें:** पाठ के उन 2-2 पद्यांशों को जोर से पढ़ें जहाँ कठिन शब्द आए हैं; ध्वनि और लय पर ध्यान दें। 2.', '**तालिका बनाएँ:** प्रत्येक शब्द के लिए 5-स्तंभ तालिका भरें — (शब्द, शब्दकोशीय अर्थ, संधि/व्युत्पत्ति, प्रसंगानुकूल.', '**तुलना करें:** उसी भाव को व्यक्त करने वाले 2 सरल शब्द लिखें और बताएँ कि कवि ने कठिन शब्द क्यों चुना (उदाहरण: "अनुराग".', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_3 और 4 को फिर से हल करें — यदि अब सही उत्तर दे पाते हैं, तो अगले नोड.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_011', difficulty: 'standard',
          question: 'छंद कविता की metrical संरचना है जो स्थिर आकार के पदों के पुनरावर्तन द्वारा बनती.',
          hint: 'यदि मात्रा गणना में कठिनाई हो तो c11_hin_a_cbse_03_011 पर वापस जाएँ — वहाँ शब्द के.',
          misconception: 'छात्र अक्सर छंद और लय-विधान को एक ही चीज़ मान लेते हैं, उदाहरण के लिए कहते हैं कि "देवसेना का गीत में लय lenta है इसलिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद कविता की metrical संरचना है जो स्थिर आकार के पदों के पुनरावर्तन द्वारा बनती है, जबकि',
                  options: ['छंद कविता की metrical संरचना है जो स्थिर आकार के पदों के पुनरावर्तन द्वारा बनती है, जबकि', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित'],
                  hint: 'यदि मात्रा गणना में कठिनाई हो तो c11_hin_a_cbse_03_011 पर वापस जाएँ — वहाँ शब्द के गुरु-लघu.',
                  misconception: 'छात्र अक्सर छंद और लय-विधान को एक ही चीज़ मान लेते हैं, उदाहरण के लिए कहते हैं कि "देवसेना का गीत में लय lenta है इसलिए यह Doha छंद है".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले एक Doha की पंक्ति दीजिए (जैसे "राम का नाम ले ले मनवा") और उसे बोलकर मात्राएँ गिनने को कहिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_012', difficulty: 'standard',
          question: 'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक का अर्थ है उन प्रश्नों को हल करने की कुशलता.',
          hint: 'अगर छात्र कविता के भाव को समझने में फंस जाए, तो उसे c12_hin_a_cbse_01_005 (छंद और.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में कविता की पंक्तियों को शब्दशः दोहरा देते हैं और मान लेते हैं कि यही भाव का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक का अर्थ है उन प्रश्नों को हल करने की कुशलता जिसमें एक',
                  options: ['बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक का अर्थ है उन प्रश्नों को हल करने की कुशलता जिसमें एक', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित'],
                  hint: 'अगर छात्र कविता के भाव को समझने में फंस जाए, तो उसे c12_hin_a_cbse_01_005 (छंद और लय-विधा) और.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में कविता की पंक्तियों को शब्दशः दोहरा देते हैं और मान लेते हैं कि यही भाव का स्पष्टीकरण है — जैसे.' }
          ],
            remediations: { 'rut-rut': { steps: ['छात्र को सबसे पहले कविता की एक पंक्ति दें और पूछें: "इस पंक्ति के शब्दों का अर्थ क्या है?" फिर पूछें: "इस पंक्ति को.', 'क्या वह गुस्सा दिखा रहा है, शांति, зов, या त्याग?" फिर उसे बताएं कि भाव का अर्थ हमेशा शब्दों के पीछे की भावना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
