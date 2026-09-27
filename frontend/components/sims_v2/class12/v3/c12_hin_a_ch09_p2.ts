import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch09_p2: SimDef = {
    id: 'v3_c12_hin_a_ch09_p2',
    title: 'घनानंद · Part 2/3',
    subtitle: 'Cursed by his guru — he spent a life signing the guru\'s name',
    classLevel: 12, subject: 'hin_a', topic: 'घनानंद · Part 2/3',
    chapters: ['c12_hin_a_ch09'],
    nodeIds: ['c12_hin_a_cbse_09_007', 'c12_hin_a_cbse_09_008', 'c12_hin_a_cbse_09_009', 'c12_hin_a_cbse_09_010', 'c12_hin_a_cbse_09_011', 'c12_hin_a_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Braj Bhakti reader', intro: 'Court and guru both cast him out; he answered with a lifetime of poems that begin in longing and end in defiance.', goal: 'Read Ghananand\'s poems as guru-bhakti\'s two registers — virah\'s vigil and the public defence.' },
    discovery: {
        question: 'A court poet is exiled by his king and cursed by his own guru — then spends a lifetime signing the guru\'s name into his verses. What is that signature?',
        options: ['Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection', 'Pride disguised — signing the guru\'s name asserts his verses outrank the curse', 'A pen-name convention — court poets always published under a guru\'s seal', 'A public apology — the signature is the exile\'s lifelong plea for forgiveness'],
        answer: 'Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection',
        hook: 'The two poems are one argument in two moods — private virah counting sleepless nights, then a public challenge daring the world to fault the guru. And the folk words aren\'t weakness: refined Braj deliberately fused with raw speech is craft, not compromise.',
    },
    teaching: [
        { title: 'घनानंद — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'प्रतीक (Symbol) वह शब्द/पद है जो अपने शाब्दिक अर्थ के साथ-साथ एक **व्यापक, अमूर्त भाव या विचार** को संकेतित करता है; बिंब (Imagery) वह भाषा-प्रयोग है जो **इंद्रियानुभूति** (दृश्य, श्रवण, स्पर्श.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow the mendicant\'s nights: feel repetition stretch time in the longing poem, then stand in the marketplace challenge — and weigh a devotion that survives its own rejection.',
        labels: ['घनानंद — साहित्यिक युक्तियाँ', 'घनानंद — मुख्य भाव', 'घनानंद — गौण भाव', 'घनानंद — पदावली: कठिन', 'घनानंद — व्याकरण: पद्य', 'घनानंद — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your team\'s short play about waiting for exam results ends on the protagonist\'s whispered plea, still unanswered. The director wants to add a closing scene where the result actually arrives \'so the climax is real.\'',
            decisions: [{ prompt: 'What does this chapter\'s treatment of unresolved longing say?', options: [
                { text: 'Resist the add-on — in the poem the beloved never appears and the climax is still the speaker\'s desperate plea; the peak is internal intensity, not external resolution, so the whispered plea already is the play\'s climax.', outcome: 'The chapter names this the open-ended narrative: emotional maximum without plot closure; tacking on the result would release the tension the play spent its length building.' },
                { text: 'Add the result scene — a climax requires something to be decided on stage.', outcome: 'That\'s the equation the chapter corrects — climax is the turning point of tension, not the delivery of news; the plea is where the character\'s need peaks, and the arrival would be denouement pretending to be climax.', reveals: 'climax-needs-outcome' },
                { text: 'Keep the open end but cut the final plea so the play stays evenly unresolved.', outcome: 'Removing the plea removes the peak — the poem builds toward that cry precisely so the silence after it lands as answer; flattening the ending flattens the whole arc.', reveals: 'unresolved-means-flat' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read guru-bhakti as both wound and banner — the poet who lost everything but the name he kept singing.',
            decisions: [{ prompt: 'What comes next? घनानंद · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — घनानंद · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_007', difficulty: 'standard',
          question: 'प्रतीक (Symbol) वह शब्द/पद है जो अपने शाब्दिक अर्थ के साथ-साथ एक **व्यापक.',
          hint: 'यदि फंसे हों तो **c11_hin_a_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) पर लौटें.',
          misconception: 'छात्र **प्रतीक** और **रूपक/उपमा** में भेद नहीं करते — वे "चंदन" को केवल उपमान (उपमा का हिस्सा) मान लेते हैं, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रतीक (Symbol) वह शब्द/पद है जो अपने शाब्दिक अर्थ के साथ-साथ एक **व्यापक, अमूर्त भाव या',
                  options: ['प्रतीक (Symbol) वह शब्द/पद है जो अपने शाब्दिक अर्थ के साथ-साथ एक **व्यापक, अमूर्त भाव या', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है'],
                  hint: 'यदि फंसे हों तो **c11_hin_a_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) पर लौटें — वहां.',
                  misconception: 'छात्र **प्रतीक** और **रूपक/उपमा** में भेद नहीं करते — वे "चंदन" को केवल उपमान (उपमा का हिस्सा) मान लेते हैं, जबकि प्रतीक **स्वतंत्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **एक पद** दें (जैसे "चंदन तनु लेपन...") और पूछें: "यहां चंदन केवल लकड़ी है या कुछ और कह रहा है?".', '**पांच इंद्रियों** के नाम लिखवाएं और प्रत्येक के लिए पद से एक-एक शब्द छांटने को कहें — **बिंब-वर्गीकरण** का अभ्यास.', '**c12_hin_a_cbse_09_006** (अलंकार) दोबारा पढ़वाएं: अलंकार = शाब्दिक सौंदर्य, प्रतीक = अर्थ-गहराई — **भेद-स्पष्टीकरण**.', 'पुनः डायग्नोस्टिक Q2, Q3 दें — सुधार न दिखे तो **c11_hin_a_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) पर लौटें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_008', difficulty: 'standard',
          question: '"मुख्य भाव" (Central Theme) is the core emotional and philosophical essence.',
          hint: 'यदि अटका हुआ महसूस हो तो: c12_hin_a_cbse_09_004 (केंद्रीय भाव और रस) पर लौटें — वहाँ.',
          misconception: '**विशिष्ट भ्रम:** छात्र घनानंद के \'सुजन\' (प्रेयसी) को केवल ऐतिहासिक/लौकिक स्त्री मान लेते हैं और राधा-कृष्ण प्रसंग को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"मुख्य भाव" (Central Theme) is the core emotional and philosophical essence that unifies',
                  options: ['"मुख्य भाव" (Central Theme) is the core emotional and philosophical essence that unifies', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है'],
                  hint: 'यदि अटका हुआ महसूस हो तो: c12_hin_a_cbse_09_004 (केंद्रीय भाव और रस) पर लौटें — वहाँ शृंगार रस की.',
                  misconception: '**विशिष्ट भ्रम:** छात्र घनानंद के \'सुजन\' (प्रेयसी) को केवल ऐतिहासिक/लौकिक स्त्री मान लेते हैं और राधा-कृष्ण प्रसंग को मात्र अलंकारिक समझते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्अध्ययन:** c12_hin_a_cbse_09_002 (पद्यांश-वार भावार्थ) से 3 पद चुनें और प्रत्येक में \'सुजन\' व \'राधा\' के प्रसंग.', '**तुलनात्मक अभ्यास:** c11_hin_a_cbse_13_008 (जाग तुझको दूर जाना — मुख्य भाव और संदेश) देखें — वहाँ भी \'प्रेम=मोक्ष\' है.', '**पुनर्निदान:** ऊपर दिए गए DIAGNOSTIC_QUESTION_4 को दोबारा हल करें, इस बार प्रत्येक उदाहरण में \'लोक-लाज\' और \'शास्त्र\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_009', difficulty: 'standard',
          question: 'गौण भाव वे छोटे, सहायक भाव होते हैं जो मुख्य भाव को सपोर्ट करते हैं, जबकि.',
          hint: 'यदि अवधारणा समझ नहीं आ रही है, तो "सूक्ष्म भाव" या "भाव की परतें" की अवधारणा को.',
          misconception: 'छात्र अक्सर गौण भाव को मुख्य भाव का \'विपरीत\' या \'बिना मतलब का सजावट\' मानते हैं, जैसे कि यदि मुख्य भाव दुख है तो गौण भाव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव वे छोटे, सहायक भाव होते हैं जो मुख्य भाव को सपोर्ट करते हैं, जबकि विषयांतर वह',
                  options: ['गौण भाव वे छोटे, सहायक भाव होते हैं जो मुख्य भाव को सपोर्ट करते हैं, जबकि विषयांतर वह', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है'],
                  hint: 'यदि अवधारणा समझ नहीं आ रही है, तो "सूक्ष्म भाव" या "भाव की परतें" की अवधारणा को.',
                  misconception: 'छात्र अक्सर गौण भाव को मुख्य भाव का \'विपरीत\' या \'बिना मतलब का सजावट\' मानते हैं, जैसे कि यदि मुख्य भाव दुख है तो गौण भाव खुशी होना चाहिए और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र गौण भाव को मुख्य भाव का विपरीत मान रहा है, तो उसे एक तालिका बनाने को कहिए जिसमें दो कॉलम हों: "मुख्य भाव" और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_010', difficulty: 'standard',
          question: 'पदावली के अंतर्गत घनानंद के पदों में प्रयुक्त कठिन ब्रजभाषा शब्दों, मुहावरों और.',
          hint: 'यदि पद-प्रसंग अस्पष्ट हो तो c12_hin_a_cbse_09_002 (पद्यांश-वार भावार्थ) पर लौटें.',
          misconception: 'छात्र समझते हैं कि "कठिन शब्द" का अर्थ केवल शब्दकोश से अर्थ ढूँढ़ना है — वे "साँची" को "सच्ची", "बाँकी" को "टेढ़ी".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के अंतर्गत घनानंद के पदों में प्रयुक्त कठिन ब्रजभाषा शब्दों, मुहावरों और',
                  options: ['पदावली के अंतर्गत घनानंद के पदों में प्रयुक्त कठिन ब्रजभाषा शब्दों, मुहावरों और', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है'],
                  hint: 'यदि पद-प्रसंग अस्पष्ट हो तो c12_hin_a_cbse_09_002 (पद्यांश-वार भावार्थ) पर लौटें — प्रत्येक पद का.',
                  misconception: 'छात्र समझते हैं कि "कठिन शब्द" का अर्थ केवल शब्दकोश से अर्थ ढूँढ़ना है — वे "साँची" को "सच्ची", "बाँकी" को "टेढ़ी", "मनभावन" को "मन को भाने.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: घनानंद के किसी एक पद को चुनकर उसके 5 कठिन शब्द घेरें। चरण 2: प्रत्येक शब्द के लिए चार कॉलम बनाएँ — शब्द |.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है कविता की संरचनागत माँगों (छंद, लय, गेयता.',
          hint: 'अगर अटके तो c12_hin_a_cbse_09_005 (छंद और लय-विधान) और c11_hin_a_cbse_13_011 (पद्य में.',
          misconception: '**सबसे गहरी भ्रांति:** "पद्य में व्याकरण के नियम ढीले होते हैं, कवि मनमानी करता है।" — **गलत।** घनानंद ब्रजभाषा के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है कविता की संरचनागत माँगों (छंद, लय, गेयता, अलंकार) को पूरा',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है कविता की संरचनागत माँगों (छंद, लय, गेयता, अलंकार) को पूरा', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है'],
                  hint: 'अगर अटके तो c12_hin_a_cbse_09_005 (छंद और लय-विधान) और c11_hin_a_cbse_13_011 (पद्य में भाषा-प्रयोग).',
                  misconception: '**सबसे गहरी भ्रांति:** "पद्य में व्याकरण के नियम ढीले होते हैं, कवि मनमानी करता है।" — **गलत।** घनानंद ब्रजभाषा के **कठोर छंद-नियमों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **ब्रजभाषा के मूल क्रिया-रूपों की तालिका** (गयो, करत, हरत, फिरत, कहत, सुनत) देकर खड़ी बोली रूपों (गया, करता.', 'एक पद लें (जैसे "श्याम सलोने, सखी, कहाँ तुम गयो?") और उसका **छंद-विश्लेषण (मात्रिक गणना)** करवाएँ — दिखाएँ कि \'गया\'.', 'फिर उसी पद का **गद्य रूपांतर** लिखवाएँ और पूछें: "क्या खो गया?" — छात्र स्वयं बोलेगा: "लय, मिठास, विरह की तड़प।" 4.', 'अंत में: **पुनः निदान प्रश्न 1 और 3** दें — अब छात्र सही उत्तर दे सकेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_012', difficulty: 'standard',
          question: 'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वे प्रश्न होते हैं जिनमें वस्तुनिष्ठ.',
          hint: 'यदि आशय समझने में कठिनाई हो, तो कविता के शब्दार्थ (नोड 010) और भावार्थ (नोड 002) की.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में केवल कविता की पंक्तियों को दोहरा देते हैं, बिना अपने शब्दों में अर्थ स्पष्ट.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वे प्रश्न होते हैं जिनमें वस्तुनिष्ठ (ticking-the-box)',
                  options: ['बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वे प्रश्न होते हैं जिनमें वस्तुनिष्ठ (ticking-the-box)', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है'],
                  hint: 'यदि आशय समझने में कठिनाई हो, तो कविता के शब्दार्थ (नोड 010) और भावार्थ (नोड 002) की दोबारा समीक्षा.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में केवल कविता की पंक्तियों को दोहरा देते हैं, बिना अपने शब्दों में अर्थ स्पष्ट किए—जैसे प्रश्न "कवि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें कि वह प्रश्न पढ़े और पहचान ले कि क्या něj "क्या", "क्यों" या "कैसे" जैसे शब्द हैं—ये आशय-सूचक संकेत हैं।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
