import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch09_p1: SimDef = {
    id: 'v3_c12_hin_a_ch09_p1',
    title: 'घनानंद · Part 1/3',
    subtitle: 'Cursed by his guru — he spent a life signing the guru\'s name',
    classLevel: 12, subject: 'hin_a', topic: 'घनानंद · Part 1/3',
    chapters: ['c12_hin_a_ch09'],
    nodeIds: ['c12_hin_a_cbse_09_001', 'c12_hin_a_cbse_09_002', 'c12_hin_a_cbse_09_003', 'c12_hin_a_cbse_09_004', 'c12_hin_a_cbse_09_005', 'c12_hin_a_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Braj Bhakti reader', intro: 'Court and guru both cast him out; he answered with a lifetime of poems that begin in longing and end in defiance.', goal: 'Read Ghananand\'s poems as guru-bhakti\'s two registers — virah\'s vigil and the public defence.' },
    discovery: {
        question: 'A court poet is exiled by his king and cursed by his own guru — then spends a lifetime signing the guru\'s name into his verses. What is that signature?',
        options: ['Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection', 'Pride disguised — signing the guru\'s name asserts his verses outrank the curse', 'A pen-name convention — court poets always published under a guru\'s seal', 'A public apology — the signature is the exile\'s lifelong plea for forgiveness'],
        answer: 'Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection',
        hook: 'The two poems are one argument in two moods — private virah counting sleepless nights, then a public challenge daring the world to fault the guru. And the folk words aren\'t weakness: refined Braj deliberately fused with raw speech is craft, not compromise.',
    },
    teaching: [
        { title: 'घनानंद — कवि परिचय और पृष्ठभूमि', text: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक परिस्थितियों, और साहित्यिक प्रभावों का अध्ययन जो उसकी रचना के विषय, शैली, और भावना को आकार देते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow the mendicant\'s nights: feel repetition stretch time in the longing poem, then stand in the marketplace challenge — and weigh a devotion that survives its own rejection.',
        labels: ['घनानंद — कवि परिचय', 'घनानंद — पद्यांश-वार भावार्थ', 'घनानंद — काव्य-संरचना और', 'घनानंद — केंद्रीय भाव', 'घनानंद — छंद और', 'घनानंद — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your team\'s short play about waiting for exam results ends on the protagonist\'s whispered plea, still unanswered. The director wants to add a closing scene where the result actually arrives \'so the climax is real.\'',
            decisions: [{ prompt: 'What does this chapter\'s treatment of unresolved longing say?', options: [
                { text: 'Resist the add-on — in the poem the beloved never appears and the climax is still the speaker\'s desperate plea; the peak is internal intensity, not external resolution, so the whispered plea already is the play\'s climax.', outcome: 'The chapter names this the open-ended narrative: emotional maximum without plot closure; tacking on the result would release the tension the play spent its length building.' },
                { text: 'Add the result scene — a climax requires something to be decided on stage.', outcome: 'That\'s the equation the chapter corrects — climax is the turning point of tension, not the delivery of news; the plea is where the character\'s need peaks, and the arrival would be denouement pretending to be climax.', reveals: 'climax-needs-outcome' },
                { text: 'Keep the open end but cut the final plea so the play stays evenly unresolved.', outcome: 'Removing the plea removes the peak — the poem builds toward that cry precisely so the silence after it lands as answer; flattening the ending flattens the whole arc.', reveals: 'unresolved-means-flat' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read guru-bhakti as both wound and banner — the poet who lost everything but the name he kept singing.',
            decisions: [{ prompt: 'What comes next? घनानंद · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — घनानंद · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_001', difficulty: 'standard',
          question: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ.',
          hint: 'यदि फंसे तो कक्षा 11 के किसी भी पाठ के \'पृष्ठभूमि और रचनाकार परिचय\' (जैसे.',
          misconception: 'छात्र अक्सर यह मान लेते हैं कि घनानंद की कविता का सामाजिक संदेश केवल इसलिए है क्योंकि उनका समय ऐसा था — अर्थात, वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक',
                  options: ['कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है', 'केंद्रीय भाव वह मुख्य विचार या संदेश है जो कविता के माध्यम से कवि व्यक्त करना चाहता है,'],
                  hint: 'यदि फंसे तो कक्षा 11 के किसी भी पाठ के \'पृष्ठभूमि और रचनाकार परिचय\' (जैसे c11_hin_a_cbse_01_001) को.',
                  misconception: 'छात्र अक्सर यह मान लेते हैं कि घनानंद की कविता का सामाजिक संदेश केवल इसलिए है क्योंकि उनका समय ऐसा था — अर्थात, वे सामाजिक सुधारक इसलिए बने.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस गलतफहमी को दूर करने के लिए, छात्र से कहिए कि वह घनानंद के जीवन की दो 구체िक घटनाएँ लिखे — जैसे: (1) उनका जन्म एक ऐसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के.',
          hint: 'यदि भावार्थ निकालते समय कठिनाई हो, तो कक्षा 11 के पद्यांश-वार भावार्थ.',
          misconception: 'छात्र अक्सर इस भूल में पड़ते हैं कि stanza-वार भावार्थ निकालते समय, वे कठिन शब्दों के अर्थ खोजकर या अलंकार की पहचान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है', 'केंद्रीय भाव वह मुख्य विचार या संदेश है जो कविता के माध्यम से कवि व्यक्त करना चाहता है,'],
                  hint: 'यदि भावार्थ निकालते समय कठिनाई हो, तो कक्षा 11 के पद्यांश-वार भावार्थ (c11_hin_a_cbse_09_002) के.',
                  misconception: 'छात्र अक्सर इस भूल में पड़ते हैं कि stanza-वार भावार्थ निकालते समय, वे कठिन शब्दों के अर्थ खोजकर या अलंकार की पहचान करके अपना काम पूरा मान.' }
          ],
            remediations: { 'stanza': { steps: ['यदि छात्र इस भूल में फँसता है, तो उसे इस प्रकार सुधारें: 1.', 'उसे एक सरल stanza दें जिसमें स्पष्ट भाव हो (जैसे "रात आई, मैं अकेला बैठा रो पड़ा") 2.', 'पूछें: "इस पंक्ति से तुम क्या महसूस करते हो?" और उसके उत्तर को लिखें 3.', 'फिर पूछें: "कवि ने \'अकेला बैठा\' क्यों कहा?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_003', difficulty: 'standard',
          question: 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है — स्ट्रोफों की संख्या, उनकी.',
          hint: 'यदि छात्र छंद की पहचान में फंसे हैं, तो उन्हें शब्द को धीरे-धीरे बोलकर अंतिम ध्वनि पर.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि दो शब्दों के अंत में समान अक्षर आ रहे हैं (जैसे \'빛\' और \'गति\' दोनों में \'ति\'), तो वे छंदित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है',
                  options: ['काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'केंद्रीय भाव वह मुख्य विचार या संदेश है जो कविता के माध्यम से कवि व्यक्त करना चाहता है,'],
                  hint: 'यदि छात्र छंद की पहचान में फंसे हैं, तो उन्हें शब्द को धीरे-धीरे बोलकर अंतिम ध्वनि पर ध्यान देना.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि दो शब्दों के अंत में समान अक्षर आ रहे हैं (जैसे \'빛\' और \'गति\' दोनों में \'ति\'), तो वे छंदित हैं — जबकि असल में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को देवनागरी लिपि में शब्दों को ध्वनिक इकाइयों में तोड़ने का अभ्यास करवाएँ — जैसे \'गति\' को ग+ति, \'빛\' को 빛 (एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_004', difficulty: 'standard',
          question: 'केंद्रीय भाव वह मुख्य विचार या संदेश है जो कविता के माध्यम से कवि व्यक्त करना.',
          hint: 'यदि छात्र केंद्रीय भाव और रस को अलग नहीं कर पा रहा है, तो पिछले नोड c12_hin_a_cbse_09_002.',
          misconception: 'छात्र अक्सर केंद्रीय भाव और रस को पर्यायवाची मान लेते हैं और परीक्षा में दोनों के लिए एक ही उत्तर लिख देते हैं, जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव वह मुख्य विचार या संदेश है जो कविता के माध्यम से कवि व्यक्त करना चाहता है,',
                  options: ['केंद्रीय भाव वह मुख्य विचार या संदेश है जो कविता के माध्यम से कवि व्यक्त करना चाहता है,', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है'],
                  hint: 'यदि छात्र केंद्रीय भाव और रस को अलग नहीं कर पा रहा है, तो पिछले नोड c12_hin_a_cbse_09_002.',
                  misconception: 'छात्र अक्सर केंद्रीय भाव और रस को पर्यायवाची मान लेते हैं और परीक्षा में दोनों के लिए एक ही उत्तर लिख देते हैं, जैसे शांत रस लिखते समय वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को बताइए कि केंद्रीय भाव वह \'क्या\' है (विषय-वस्तु) और रस वह \'कैसे महसूस होता है\' है (अनुभव)। एक stepwise अभ्यास.', '(यह केंद्रीय भाव है), (3) फिर पूछिए कि इस पंक्ति को पढ़कर आप कैसा महसूस करते हैं?', '(यह रस है), (4) तुलना करिए कि उत्तर अलग क्यों हैं, (5) उदाहरण दें - जैसे "भय से मुक्त ho जिव" से संदेश मिलता है मुक्ति.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_005', difficulty: 'standard',
          question: 'छंद कविता में स्वर-व्यंजनों की मात्रा (गुरु-लघु) का पूर्व निर्धारित क्रम है जो.',
          hint: 'Work step by step.',
          misconception: 'छात्र často छंद को केवल तुकबंदी से जोड़कर समझते हैं — जैसे यदि दो पंक्तियों में अंत में तुकबंदी है (जैसे "जाने" और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद कविता में स्वर-व्यंजनों की मात्रा (गुरु-लघु) का पूर्व निर्धारित क्रम है जो पंक्तियों',
                  options: ['छंद कविता में स्वर-व्यंजनों की मात्रा (गुरु-लघु) का पूर्व निर्धारित क्रम है जो पंक्तियों', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र často छंद को केवल तुकबंदी से जोड़कर समझते हैं — जैसे यदि दो पंक्तियों में अंत में तुकबंदी है (जैसे "जाने" और "अनझे"), तो वे मान लेते.' }
          ],
            remediations: { 'asto': { steps: ['यदि छात्र छंद को केवल तुकबंदी से जोड़कर समझ रहा है, तो उसे निम्नलिखित चरण-दर-चरण अभ्यास करवाइए: पहला कदम: किसी भी दो.', 'वह शायद कहेगा हाँ क्योंकि तुक है। तीसरा कदम: अब उसे प्रत्येक पंक्ति के हर अक्षर पर मात्रा निर्धारित करने के लिए कहिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_006', difficulty: 'standard',
          question: 'अलंकार वे साहित्यिक युक्तियाँ हैं जो भाषा में शब्दों के अर्थ, ध्वनि या व्यवस्था.',
          hint: 'यदि छात्र अलंकार के प्रकारों के बीच भ्रम में हो (जैसे रूपक और उपमा में अंतर नहीं कर पा.',
          misconception: 'छात्र अक्सर सोचते हैं कि अलंकार की पहचान करना पर्याप्त है — जैसे "यहाँ अनुप्रास है" या "यह रूपक है" लिख देना — और बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार वे साहित्यिक युक्तियाँ हैं जो भाषा में शब्दों के अर्थ, ध्वनि या व्यवस्था में',
                  options: ['अलंकार वे साहित्यिक युक्तियाँ हैं जो भाषा में शब्दों के अर्थ, ध्वनि या व्यवस्था में', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है'],
                  hint: 'यदि छात्र अलंकार के प्रकारों के बीच भ्रम में हो (जैसे रूपक और उपमा में अंतर नहीं कर पा रहा हो), तो.',
                  misconception: 'छात्र अक्सर सोचते हैं कि अलंकार की पहचान करना पर्याप्त है — जैसे "यहाँ अनुप्रास है" या "यह रूपक है" लिख देना — और बोर्ड परीक्षा में full.' }
          ],
            remediations: { 'full': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर कैसे मजबूत बनाया जाए। उदाहरण देकर बताइए: "कमजोर: इस पंक्ति में रूपक है।" "मजबूत: इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
