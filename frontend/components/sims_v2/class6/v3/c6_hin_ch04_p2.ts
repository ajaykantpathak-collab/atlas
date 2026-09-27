import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch04_p2: SimDef = {
    id: 'v3_c6_hin_ch04_p2',
    title: 'पाठ 4 · Part 2/3',
    subtitle: 'इस नोड में गौण विषय की पहचान, मुख्य विषय से उसका संबंध, और रचना-निर्माण में उसकी भूमिका.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 4 · Part 2/3',
    chapters: ['c6_hin_ch04'],
    nodeIds: ['c6_hin_cbse_04_007', 'c6_hin_cbse_04_008', 'c6_hin_cbse_04_009', 'c6_hin_cbse_04_010', 'c6_hin_cbse_04_011', 'c6_hin_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'क्या तुमने कभी गौर किया है कि तुम्हारी पसंदीदा कार्टून सीरीज़ में, हीरो के दुनिया बचाने के साथ-साथ, उसका अपने.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक विचार या कथानक है जो मुख्य विषय के समानांतर चलता है, उसे सहारा देता है, पात्रों के विभिन्न पहलू उजागर करता है और रचना में गहराई लाता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — गौण', 'पाठ 4 — साहित्यिक', 'पाठ 4 — पदावली', 'पाठ 4 — व्याकरण', 'पाठ 4 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 2/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — भाषा-प्रयोग (Language Usage) refers to the conscious selection of vocabulary (शब्दावली).', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न (Objective questions) test literal comprehension — the answer.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह सहायक विचार या कथानक है जो मुख्य विषय के समानांतर चलता.',
          hint: 'यदि अटका हुआ लगे तो c6_hin_cbse_04_006 (मुख्य विषय) और c6_hin_cbse_04_002 (कथानक) दोहराएँ।',
          misconception: '**विशिष्ट भ्रम**: छात्र गौण विषय को \'उपकथा\' (sub-plot) समझ लेते हैं और सोचते हैं कि हर उपकथा गौण विषय है। **गलत तर्क**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक विचार या कथानक है जो मुख्य विषय के समानांतर चलता है, उसे',
                  options: ['गौण विषय (Sub-theme) वह सहायक विचार या कथानक है जो मुख्य विषय के समानांतर चलता है, उसे', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),'],
                  hint: 'यदि अटका हुआ लगे तो c6_hin_cbse_04_006 (मुख्य विषय) और c6_hin_cbse_04_002 (कथानक) दोहराएँ।',
                  misconception: '**विशिष्ट भ्रम**: छात्र गौण विषय को \'उपकथा\' (sub-plot) समझ लेते हैं और सोचते हैं कि हर उपकथा गौण विषय है। **गलत तर्क**: "उपकथा = घटनाओं का.' }
          ],
            remediations: { 'sub-plot': { steps: ['1) छात्र से कहो: "पाठ 4 की कोई एक घटना चुनो जो मुख्य कहानी से अलग लगे।" 2) पूछो: "इस घटना से लेखक क्या **संदेश/विचार**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** शब्दों द्वारा पाठक की इंद्रियों (दृष्टि, श्रवण, स्पर्श, गंध.',
          hint: 'यदि अटके तो **उपमा के 5-6 सरल उदाहरण** लिखवाओ और प्रत्येक में "जैसे/वैसा" शब्द घेरवाओ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **उपमा (Simile) में "जैसे/वैसा" शब्द देखते ही उसे रूपक मान लेते हैं** यदि तुलना "गहरी" या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** शब्दों द्वारा पाठक की इंद्रियों (दृष्टि, श्रवण, स्पर्श, गंध, स्वाद) को',
                  options: ['**बिंब (Imagery)** शब्दों द्वारा पाठक की इंद्रियों (दृष्टि, श्रवण, स्पर्श, गंध, स्वाद) को', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),'],
                  hint: 'यदि अटके तो **उपमा के 5-6 सरल उदाहरण** लिखवाओ और प्रत्येक में "जैसे/वैसा" शब्द घेरवाओ; फिर वही.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **उपमा (Simile) में "जैसे/वैसा" शब्द देखते ही उसे रूपक मान लेते हैं** यदि तुलना "गहरी" या "असामान्य" लगे।.' }
          ],
            remediations: { 'simile-5': { steps: ['**चरण 1 — यांत्रिक अभ्यास (Mechanical Drill):** 10 वाक्य दो (मिश्रित उपमा/रूपक)। छात्र को केवल **"जैसे/वैसा/समान" शब्द.', '**चरण 2 — रूपांतरण अभ्यास:** उन्हीं 10 वाक्यों में से 5 उपमा वाले वाक्यों को रूपक में बदलवाओ (शब्द हटाकर "है" लगाकर)।.', '**चरण 3 — बिंब जोड़ो:** प्रत्येक रूपक वाक्य में एक **स्पर्श/श्रव्य/घ्राण बिंब** जोड़ने को कहो (उदाहरण: "वह सिंह है" →.', '**चरण 4 — मौखिक तर्क:** पूछो "अब बताओ, \'जैसे\' हटाने से तस्वीर कैसे बदली?" — छात्र स्वयं बोलेगा "सीधी/तेज/भारी लगी"। यही.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_009', difficulty: 'standard',
          question: 'विरोधाभास दो विपरीत बातों का एक साथ होना है जो सोचने पर मजबूर करता है, जबकि.',
          hint: 'यदि फंसें तो रूपक और बिंब (c6_hin_cbse_04_008) की पहचान करने की अभ्यास करें, जैसे कि.',
          misconception: 'छात्र अक्सर विरोधाभास को प्रतीक से मिला देते हैं और मानते हैं कि यदि कोई बात विपरीत लग रही है तो वह जरूर प्रतीक है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास दो विपरीत बातों का एक साथ होना है जो सोचने पर मजबूर करता है, जबकि प्रतीक कोई',
                  options: ['विरोधाभास दो विपरीत बातों का एक साथ होना है जो सोचने पर मजबूर करता है, जबकि प्रतीक कोई', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),'],
                  hint: 'यदि फंसें तो रूपक और बिंब (c6_hin_cbse_04_008) की पहचान करने की अभ्यास करें, जैसे कि "उसकी हँसी.',
                  misconception: 'छात्र अक्सर विरोधाभास को प्रतीक से मिला देते हैं और मानते हैं कि यदि कोई बात विपरीत लग रही है तो वह जरूर प्रतीक है। उदाहरण के लिए, वे सोचते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो अलग-अलग रंग के कार्ड दें: एक पर "विरोधाभास" लिखा हो, दूसरे पर "प्रतीक"। फिर उसे semplicी वाक्य दें जैसे "वह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द का अर्थ है किसी वाक्य, पद या पाठ में से उन **महत्वपूर्ण.',
          hint: 'If stuck, review **पद-परिचय (Parts of Speech)** using color-coded flashcards: red for.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"विशेषण (adjective) हमेशा मुख्य शब्द होता है"** — लेकिन वे भूल जाते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द का अर्थ है किसी वाक्य, पद या पाठ में से उन **महत्वपूर्ण शब्दों को',
                  options: ['पदावली: मुख्य शब्द का अर्थ है किसी वाक्य, पद या पाठ में से उन **महत्वपूर्ण शब्दों को', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),'],
                  hint: 'If stuck, review **पद-परिचय (Parts of Speech)** using color-coded flashcards: red for.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"विशेषण (adjective) हमेशा मुख्य शब्द होता है"** — लेकिन वे भूल जाते हैं कि **कारक चिह्न लगा विशेषण.' }
          ],
            remediations: { 'adjective-postpositional-adjective-phrase': { steps: ['**दृश्य सहारा (Visual scaffold):** वाक्य को कार्ड पर लिखें, प्रत्येक शब्द को अलग कार्ड पर काटें। छात्र से कहें: "केवल.', '— नहीं, \'लड़का\' चाहिए।" 2.', '**रंग-कोडिंग (Color coding):** मुख्य शब्द = लाल, सहायक = नीला। पहले 5 वाक्य शिक्षक करे, अगले 5 छात्र करे, फिर तुलना। 3.', '**मौखिक तर्क (Oral reasoning):** प्रत्येक चुने शब्द के लिए छात्र बोले: "यह मुख्य है क्योंकि यह बताता है ______।" — इससे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग (Language Usage) refers to the conscious selection of vocabulary.',
          hint: 'If stuck, review **पदावली: मुख्य शब्द (c6_hin_cbse_04_010)** and Class 5 grammar.',
          misconception: 'Students believe that **"Formal Hindi = Difficult Sanskrit words (तत्सम) and Informal Hindi = Easy Hindi words.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग (Language Usage) refers to the conscious selection of vocabulary (शब्दावली),',
                  options: ['भाषा-प्रयोग (Language Usage) refers to the conscious selection of vocabulary (शब्दावली),', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),'],
                  hint: 'If stuck, review **पदावली: मुख्य शब्द (c6_hin_cbse_04_010)** and Class 5 grammar on **सर्वनाम.',
                  misconception: 'Students believe that **"Formal Hindi = Difficult Sanskrit words (तत्सम) and Informal Hindi = Easy Hindi words (तद्भव)"**.' }
          ],
            remediations: { 'formal-hindi-difficult-sanskrit-words': { steps: ['** Take a **real-life audio clip** (1 min) — a news anchor (formal), a grandma telling a story (literary/colloquial).', '** Give **two versions of the same message** (e.g., "Come tomorrow at 10" — formal letter vs WhatsApp text).', '** **Role-play**: "You are the character from Ch 4. Talk to your friend (informal). Now talk to the Principal (formal).', '** Return to Ch 4 text — now student *hears* the shifts they couldn\'t *see* before.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective questions) test literal comprehension — the answer.',
          hint: 'यदि अटके तो c6_hin_cbse_04_002 (कथानक) और c6_hin_cbse_04_004 (नायक चरित्र) दोबारा पढ़ें.',
          misconception: 'विद्यार्थी समझते हैं कि "आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है और उसे ढूंढना पड़ता है" — जैसे कोई खजाना खोज.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective questions) test literal comprehension',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective questions) test literal comprehension', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),'],
                  hint: 'यदि अटके तो c6_hin_cbse_04_002 (कथानक) और c6_hin_cbse_04_004 (नायक चरित्र) दोबारा पढ़ें — घटनाक्रम.',
                  misconception: 'विद्यार्थी समझते हैं कि "आशय-सूचक प्रश्न का उत्तर पाठ में \'छिपा\' होता है और उसे ढूंढना पड़ता है" — जैसे कोई खजाना खोज रहे हों। वास्तव में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['विद्यार्थी के सामने एक छोटा पाठांश (4-5 वाक्य) रखें जिसमें पात्र की भावना स्पष्ट न लिखी हो, केवल कार्य/संवाद/विवरण हो।.', 'पूछें: "पात्र कैसा महसूस कर रहा है?" — जब विद्यार्थी उत्तर दे, तब पूछें: "पाठ में कौन सा शब्द यह बताता है?" — जब वह.', 'मिलकर उन वाक्यों को तीर (→) से जोड़कर निष्कर्ष तक पहुँचें। 4.', 'फिर विद्यार्थी से कहें: "अब तुम अपने शब्दों में लिखो: पहला सुराग यह, दूसरा सुराग यह, इसलिए निष्कर्ष यह।" — यही PEEL का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
