import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch16_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch16_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch16_p2',
    title: 'साखी · Part 2/3',
    subtitle: 'इस नोड में हम साखी के दोहों में प्रयुक्त प्रतीक और बिंब के अंतर को समझेंगे और उनका.',
    classLevel: 10, subject: 'hin_sp', topic: 'साखी · Part 2/3',
    chapters: ['c10_hin_sp_ch16'],
    nodeIds: ['c10_hin_sp_cbse_16_007', 'c10_hin_sp_cbse_16_008', 'c10_hin_sp_cbse_16_009', 'c10_hin_sp_cbse_16_010', 'c10_hin_sp_cbse_16_011', 'c10_hin_sp_cbse_16_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप सड़क पर चल रहे हैं और एक टूटा हुआ घड़ी देखते हैं — यह बस एक घड़ी है (बिंब) लेकिन यह समय के.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'साखी — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'प्रतीक वह छिपा हुआ अर्थ है जो किसी वस्तु, क्रिया या चित्र द्वारा संकेतित होता है, जबकि बिंब वह प्रत्यक्ष रूप से अनुभव की जाने वाली संवेदनशील वस्तु या चित्र है जिसका उपयोग प्रतीक के रूप में किया जाता.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_16_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['साखी — साहित्यिक युक्तियाँ', 'साखी — मुख्य भाव', 'साखी — गौण भाव', 'साखी — पदावली: कठिन', 'साखी — व्याकरण: पद्य', 'साखी — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_16_009', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['मुख्य भाव से संबंध जोड़ें — कबीर कहते हैं: भक्ति तभी सच्ची.', 'गौण भाव सूत्रबद्ध करें: (क) गृहस्थ के लिए भक्ति का अर्थ.', 'पूछें — "कुटुंब समाय", "मैं भी भूखा न रहूं", "साधु न भूखा.', 'साखी को जोर से पढ़कर मुख्य वाक्य पहचानें — "साईं इतना.', 'बोर्ड उत्तर लिखें — "गौण भाव: गृहस्थ धर्म पालन, साधु-सेवा.'], answer: 'साखी को जोर से पढ़कर मुख्य वाक्य पहचानें — "साईं इतना. पूछें — "कुटुंब समाय", "मैं भी भूखा न रहूं", "साधु न भूखा. गौण भाव सूत्रबद्ध करें: (क) गृहस्थ के लिए भक्ति का अर्थ. मुख्य भाव से संबंध जोड़ें — कबीर कहते हैं: भक्ति तभी सच्ची. बोर्ड उत्तर लिखें — "गौण भाव: गृहस्थ धर्म पालन, साधु-सेवा.' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_16_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through साखी like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? साखी · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — साखी · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_007', difficulty: 'standard',
          question: 'प्रतीक वह छिपा हुआ अर्थ है जो किसी वस्तु, क्रिया या चित्र द्वारा संकेतित होता.',
          hint: 'यदि फंसें तो अलंकार (उदाहरण: उपमा, रूपक) की पिछली node c10_hin_sp_cbse_16_006 की समीक्षा.',
          misconception: 'छात्र अक्सर मान लेते हैं कि यदि किसी दोहा में कोई वस्तु का उल्लेख है तो वह अपने आप में प्रतीक है, जैसे \'मकर\' को सीधे ही.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रतीक वह छिपा हुआ अर्थ है जो किसी वस्तु, क्रिया या चित्र द्वारा संकेतित होता है, जबकि',
                  options: ['प्रतीक वह छिपा हुआ अर्थ है जो किसी वस्तु, क्रिया या चित्र द्वारा संकेतित होता है, जबकि', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem'],
                  hint: 'यदि फंसें तो अलंकार (उदाहरण: उपमा, रूपक) की पिछली node c10_hin_sp_cbse_16_006 की समीक्षा करें और.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि यदि किसी दोहा में कोई वस्तु का उल्लेख है तो वह अपने आप में प्रतीक है, जैसे \'मकर\' को सीधे ही बुराई का प्रतीक मान.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि वह \'मकर\' शब्द सुनकर क्या देखता है — यदि वह समुद्री जानवर का चित्र देखता है तो कहिए कि यह बिंब है। फिर.', 'फिर धीरे-धीरे इशारा करें कि शायद वह कपट या छल का संकेत दे रहा है, और इस तरह बिंब से प्रतीक तक पहुँचने की प्रक्रिया को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_008', difficulty: 'standard',
          question: 'मुख्य भाव किसी काव्य-रचना का वह केंद्रीय विचार या सार्वभौमिक सत्य होता है जिसे.',
          hint: 'अगर अटक जाएँ तो c10_hin_sp_cbse_16_007 (प्रतीक और बिंब) पर वापस जाएँ — प्रत्येक प्रतीक को.',
          misconception: 'छात्र \'मुख्य भाव\' को \'नैतिक शिक्षा\' या \'उपदेश\' समझकर एक वाक्य का सूत्रवाक्य लिख देते हैं (जैसे: \'झूठ नहीं बोलना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव किसी काव्य-रचना का वह केंद्रीय विचार या सार्वभौमिक सत्य होता है जिसे कवि अपनी',
                  options: ['मुख्य भाव किसी काव्य-रचना का वह केंद्रीय विचार या सार्वभौमिक सत्य होता है जिसे कवि अपनी', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem'],
                  hint: 'अगर अटक जाएँ तो c10_hin_sp_cbse_16_007 (प्रतीक और बिंब) पर वापस जाएँ — प्रत्येक प्रतीक को \'क्या.',
                  misconception: 'छात्र \'मुख्य भाव\' को \'नैतिक शिक्षा\' या \'उपदेश\' समझकर एक वाक्य का सूत्रवाक्य लिख देते हैं (जैसे: \'झूठ नहीं बोलना चाहिए\'), जबकि कबीर की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "जो तुमने लिखा (\'झूठ नहीं बोलना चाहिए\'), वह तो कोई भी कह सकता है; कबीर ने ऐसा **क्यों** और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_009', difficulty: 'standard',
          question: '\'गौण भाव\' साखी में व्यक्त वह द्वितीयक विषय या प्रसंग है जो केंद्रीय भक्ति-भावना.',
          hint: 'c10_hin_sp_cbse_16_008 (मुख्य भाव और संदेश) — यदि मुख्य भाव पहचानने में दिक्कत हो, तो इस.',
          misconception: 'छात्र समझते हैं कि \'विषयांतर\' का अर्थ है \'कबीर भटक गए\' या \'लय टूट गई\' — जबकि वास्तव में विषयांतर कबीर की **सचेत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'गौण भाव\' साखी में व्यक्त वह द्वितीयक विषय या प्रसंग है जो केंद्रीय भक्ति-भावना का पूरक',
                  options: ['\'गौण भाव\' साखी में व्यक्त वह द्वितीयक विषय या प्रसंग है जो केंद्रीय भक्ति-भावना का पूरक', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem'],
                  hint: 'c10_hin_sp_cbse_16_008 (मुख्य भाव और संदेश) — यदि मुख्य भाव पहचानने में दिक्कत हो, तो इस नोड पर.',
                  misconception: 'छात्र समझते हैं कि \'विषयांतर\' का अर्थ है \'कबीर भटक गए\' या \'लय टूट गई\' — जबकि वास्तव में विषयांतर कबीर की **सचेत रणनीति** है: वे भक्ति-चर्चा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को 3 साखियाँ दें (जैसे: गुरु कुम्हार, जाति न पूछो, पोथी पढ़ि पढ़ि) और कहें: "मुख्य वाक्य घेरो, फिर पूछो — \'इसके.', 'विषयांतर के लिए: "जहाँ कबीर \'राम/हरि/गोविंद\' छोड़कर \'पंडित/मुल्ला/जाति/नारी/धन\' पर बोलने लगें, वहाँ रुककर लिखो: \'यहाँ.', 'CBSE के गत वर्ष के 2-3 अंकों वाले प्रश्न दिखाएं जो गौण भाव/विषयांतर पर पूछे गए — छात्र देखे कि बोर्ड इन्हें \'गौण\' नहीं.', 'अंत में: "गौण भाव = कबीर का समाज-सुधारक रूप; विषयांतर = श्रोता की नींद तोड़ने का औजार" — यह सूत्र याद कराएं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_010', difficulty: 'standard',
          question: 'पदावली के अंतर्गत साखी में प्रयुक्त कठिन शब्दों के प्रसंगानुसार अर्थ, मुहावरों.',
          hint: 'यदि अटके तो c10_hin_sp_cbse_16_002 (पद्यांश-वार भावार्थ) दोबारा पढ़ें और प्रत्येक पद का.',
          misconception: 'छात्र समझते हैं कि कठिन शब्दों के अर्थ रट लेने से परीक्षा में पूरे अंक मिल जाएँगे। वास्तव में बोर्ड परीक्षा में पूछा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के अंतर्गत साखी में प्रयुक्त कठिन शब्दों के प्रसंगानुसार अर्थ, मुहावरों के',
                  options: ['पदावली के अंतर्गत साखी में प्रयुक्त कठिन शब्दों के प्रसंगानुसार अर्थ, मुहावरों के', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_16_002 (पद्यांश-वार भावार्थ) दोबारा पढ़ें और प्रत्येक पद का केंद्रीय.',
                  misconception: 'छात्र समझते हैं कि कठिन शब्दों के अर्थ रट लेने से परीक्षा में पूरे अंक मिल जाएँगे। वास्तव में बोर्ड परीक्षा में पूछा जाता है: "प्रसंगानुसार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: उस पद को दोबारा पढ़ें जहाँ शब्द आया है और पद का केंद्रीय भाव पहचानें। चरण 2: शब्द के 3 संभावित अर्थ लिखें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है — **काव्य-रचना में छंद, लय, संक्षिप्ति और.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_16_005 (छंद और लय-विधान)** दोहराएँ — विशेषकर **मात्रा-गणना.',
          misconception: '**सबसे गहरी भ्रांति:** छात्र मानते हैं कि **\'पद्य में भाषा-प्रयोग\' = \'अलंकार पहचानना\' या \'कठिन शब्दों के अर्थ लिखना\'**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_16_005 (छंद और लय-विधान)** दोहराएँ — विशेषकर **मात्रा-गणना और.',
                  misconception: '**सबसे गहरी भ्रांति:** छात्र मानते हैं कि **\'पद्य में भाषा-प्रयोग\' = \'अलंकार पहचानना\' या \'कठिन शब्दों के अर्थ लिखना\'**। **वास्तविकता:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहले साखी को \'गद्य\' में लिखवाएँ** — *"धीरे-धीरे रे मना..."* → *"मन, धीरे-धीरे सब कुछ होता है"* — फिर पूछो: **\'क्या खो.', '**दो पंक्तियों की मात्रा गिनती करवाएँ** — दिखाओ कि **\'रे\' (2 मात्रा) हटाने से छंद टूटता है** — इसलिए \'रे\' \'भराव\' नहीं.', '**एक मुहावरा (जैसे \'ढाई आखर\') लेकर** उसके **शाब्दिक अर्थ बनाम भावार्थ** पर चर्चा करो — दिखाओ कि **मुहावरा \'संक्षिप्ति.', 'अंत में **छात्र से एक वाक्य \'कबीर-शैली\' में रूपांतरित करवाओ** — तभी वह **भाषा-प्रयोग को \'नियम\' नहीं, \'कौशल\'** मानेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न (Objective Questions)** वे प्रश्न हैं जिनका उत्तर पाठ में.',
          hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_16_002 (पद्यांश-वार भावार्थ)** और.',
          misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **आशय-सूचक प्रश्न** का उत्तर **अपनी भाषा में भाव लिख देना** काफी है। वे लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न (Objective Questions)** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप',
                  options: ['**वस्तुनिष्ठ प्रश्न (Objective Questions)** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem'],
                  hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_16_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_16_007.',
                  misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **आशय-सूचक प्रश्न** का उत्तर **अपनी भाषा में भाव लिख देना** काफी है। वे लिखते हैं: *"कवि समझा रहे.' }
          ],
            remediations: { 'cbse-generalization': { steps: ['**चरण 1 — पहचान (Identify):** छात्र से कहो: *"प्रश्न में \'क्यों\', \'कैसे\', \'क्या प्रतीक है\', \'कवि का उद्देश्य\' जैसे शब्द.', 'यदि हाँ → आशय-सूचक।"* **चरण 2 — पाठ-लंगर (Text-Anchor):** छात्र को बोलो: *"उत्तर की पहली पंक्ति पाठ के शब्द/पंक्ति से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
