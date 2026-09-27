import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch04_p2: SimDef = {
    id: 'v3_c12_hin_a_ch04_p2',
    title: 'बनारस, दशिा · Part 2/3',
    subtitle: 'Not the ghats — the lane where the city actually lives',
    classLevel: 12, subject: 'hin_a', topic: 'बनारस, दशिा · Part 2/3',
    chapters: ['c12_hin_a_ch04'],
    nodeIds: ['c12_hin_a_cbse_04_007', 'c12_hin_a_cbse_04_008', 'c12_hin_a_cbse_04_009', 'c12_hin_a_cbse_04_010', 'c12_hin_a_cbse_04_011', 'c12_hin_a_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist poetry reader', intro: 'A post-independence poet picks the narrowest space in the city and makes it speak.', goal: 'Read Banaras through Nayi Kavita\'s experimental lens — title as thesis, image over statement.' },
    discovery: {
        question: 'The poem is titled \'Banaras\' — not a highway or a plaza but a narrow lane, a cul-de-sac. What has the title already decided before line one?',
        options: ['The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre', 'Banaras is small', 'Lanes are pretty', 'Nothing — it\'s just a name'],
        answer: 'The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre',
        hook: 'A poet born in 1934 writes under Nayi Kavita\'s contract already broken — no fixed metre, image over statement, ambiguity as value. Where Bhakti verse transmits truth, this poetry enacts the search for it; context isn\'t a crutch, it\'s the knowledge the poem presupposes.',
    },
    teaching: [
        { title: 'बनारस, दशिा — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'प्रतीक वह वस्तु, पात्र या घटना है जो अपने प्रत्यक्ष अर्थ के अलावा किसी गहरे अमूर्त विचार (जैसे स्वतंत्रता, मृत्यु, आशा) को दर्शाती है; बिंब वह विशिष्ट, संवेदनात्मक विवरण है जो पाठक के मन में स्पष्ट.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the cul-de-sac of modernist verse: predict imagery from title and era, weigh ambiguity as method, and feel how the poem speaks from beneath the flyover, not from its span.',
        labels: ['बनारस, दशिा — साहित्यिक', 'बनारस, दशिा — मुख्य', 'बनारस, दशिा — गौण', 'बनारस, दशिा — पदावली', 'बनारस, दशिा — व्याकरण', 'बनारस, दशिा — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_009', title: 'बनारस, दशिा — गौण भाव और विषयांतर',
          caseStudy: { intro: 'You\'re sitting in the exam hall, staring at a 3-mark question: *"कविता में गौण भावों की भूमिका स्पष्ट कीजिए।"* Your mind goes blank — you know the main theme.',
            decisions: [{ prompt: 'कविता "बनारस, दशिा" में \'गौण भाव\' की परिभाषा अपने शब्दों में लिखिए और मुख्य भाव से इसका अंतर स्पष्ट कीजिए।', options: [
                { text: '**Correct answer**: गौण भाव कविता की वह द्वितीयक भावधारा है जो मुख्य भाव (बनारस की', outcome: '**Correct answer**: गौण भाव कविता की वह द्वितीयक भावधारा है जो मुख्य भाव (बनारस की शाश्वतता.' },
                { text: 'गौण भाव का अर्थ है छोटा भाव', outcome: 'Not quite — **Exact error**: Students treat **every descriptive stanza** as either गौण भाव or विषयांतर.', reveals: 'exact-error-students-treat-every' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A short-film jury member rejects your submission about a child calling \'Papa — Papa\' toward a father who never comes, saying \'nothing happens — no climax, no arrival, no story.\'',
            decisions: [{ prompt: 'How does the structure of \'फ्नेक\' answer that verdict?', options: [
                { text: 'The climax is internal — the repeated \'पिता-पिता\' at widening intervals spirals the child\'s urgency upward while the father\'s absence grows more total; the non-arrival IS the event, and the final cry is the peak the film was building toward.', outcome: 'The chapter separates external event from structural peak: repetition placed at lengthening intervals propels time and loss forward — \'nothing happening\' is precisely what\'s happening.' },
                { text: 'The juror is right — a climax requires the awaited person to appear or definitively not appear on screen.', outcome: 'That demands an external resolution the poem refuses on purpose: the spiral structure makes absence itself the accumulating force, so an arrival would release the tension the film exists to hold.', reveals: 'climax-needs-arrival' },
                { text: 'Compromise — add a montage of the father elsewhere so the audience at least sees him.', outcome: 'Cutting away breaks the one-point perspective that makes the waiting legible; the poem never leaves the child\'s call because the structure\'s power is that we stay inside the unanswered side.', reveals: 'show-both-sides' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now decode a title before the first line — and read Nayi Kavita\'s broken forms as the broken world\'s true shape.',
            decisions: [{ prompt: 'What comes next? बनारस, दशिा · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बनारस, दशिा · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_007', difficulty: 'standard',
          question: 'प्रतीक वह वस्तु, पात्र या घटना है जो अपने प्रत्यक्ष अर्थ के अलावा किसी गहरे.',
          hint: 'यदि फंसे हुए महसूस हो रहे हैं, तो c11_hin_a_cbse_01_008 पर वापस जाएँ जहाँ बिंब और रूपक का.',
          misconception: 'छात्र अक्सर प्रतीक और बिंब को पर्यायवाची समझते हैं और किसी भी संवेदनात्मक विवरण को प्रतीक कह देते हैं, जैसे "कविता में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रतीक वह वस्तु, पात्र या घटना है जो अपने प्रत्यक्ष अर्थ के अलावा किसी गहरे अमूर्त विचार',
                  options: ['प्रतीक वह वस्तु, पात्र या घटना है जो अपने प्रत्यक्ष अर्थ के अलावा किसी गहरे अमूर्त विचार', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'यदि फंसे हुए महसूस हो रहे हैं, तो c11_hin_a_cbse_01_008 पर वापस जाएँ जहाँ बिंब और रूपक का परिचय.',
                  misconception: 'छात्र अक्सर प्रतीक और बिंब को पर्यायवाची समझते हैं और किसी भी संवेदनात्मक विवरण को प्रतीक कह देते हैं, जैसे "कविता में लाल गुलाब आया है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता की एक पंक्ति दीजिए और पूछिए: "इसमें क्या देखा, सुना, या महसूस किया जा सकता है?" यदि उत्तर हाँ है, तो यह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_008', difficulty: 'standard',
          question: 'मुख्य भाव वह आधारभूत मनोदशा या भावना है जो कविता के पूरे पाठ में निरंतर बनी.',
          hint: 'प्रतीक और बिंब (c12_hin_a_cbse_04_007) की समीक्षा करें — विशेष रूप से वह हिस्सा जहाँ.',
          misconception: 'छात्र अक्सर मुख्य भाव और संदेश को synonymous मानते हैं और लिखते हैं कि "बनारस, दशिा का मुख्य भाव यह है कि बनारस पवित्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव वह आधारभूत मनोदशा या भावना है जो कविता के पूरे पाठ में निरंतर बनी रहती है, जबकि',
                  options: ['मुख्य भाव वह आधारभूत मनोदशा या भावना है जो कविता के पूरे पाठ में निरंतर बनी रहती है, जबकि', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'प्रतीक और बिंब (c12_hin_a_cbse_04_007) की समीक्षा करें — विशेष रूप से वह हिस्सा जहाँ कविता के.',
                  misconception: 'छात्र अक्सर मुख्य भाव और संदेश को synonymous मानते हैं और लिखते हैं कि "बनारस, दशिा का मुख्य भाव यह है कि बनारस पवित्र है" — जबकि भाव.' }
          ],
            remediations: { 'synonymous': { steps: ['छात्र से पूछिए: "क्या तुमने कभी किसी ऐसी जगह देखी है जो बाहर से सुंदर दिखती है लेकिन अंदर से खाली लगती है?" फिर कविता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_009', difficulty: 'standard',
          question: '**गौण भाव (Sub-theme)**: A secondary emotional or thematic current that runs.',
          hint: 'अगर मुख्य भाव अस्पष्ट है → तुरंत **c12_hin_a_cbse_04_004** (केंद्रीय भाव और रस) और.',
          misconception: '**Exact error**: Students treat **every descriptive stanza** as either गौण भाव or विषयांतर.',
          parts: [
                { id: 'a', prompt: 'नीचे दिए गए दो कथनों में से सही चुनिए और कारण बताइए: (क) "नाविक का \'बैठो बाबू, पार लगा दूँ\'" — यह गौण भाव है। (ख) "नाविक का \'बैठो बाबू, पार लगा दूँ\'" — यह.', answer: '**Correct answer**: (क) सही है। नाविक का वाक्य **गौण भाव** व्यक्त करता है',
                  options: ['**Correct answer**: (क) सही है। नाविक का वाक्य **गौण भाव** व्यक्त करता है', '**any character\'s speech = digression**'],
                  hint: 'अगर मुख्य भाव अस्पष्ट है → तुरंत **c12_hin_a_cbse_04_004** (केंद्रीय भाव और रस) और.',
                  misconception: '**Exact error**: Students treat **every descriptive stanza** as either गौण भाव or विषयांतर.' },
                { id: 'b', prompt: 'कविता में दो गौण भाव पहचानिए। प्रत्येक के लिए: (i) पद संख्या, (ii) साक्ष्य पंक्ति/अंश, (iii) वह मुख्य भाव को कैसे पुष्ट/विस्तारित करता है — लिखिए।', answer: '**Correct answer**: 1',
                  options: ['**Correct answer**: 1', 'नाविक बाँधता नाव / बैठो बाबू, पार लगा दूँ', 'गंगा की लहरें', 'मंदिर की घंटी'],
                  hint: 'अगर मुख्य भाव अस्पष्ट है → तुरंत **c12_hin_a_cbse_04_004** (केंद्रीय भाव और रस) और.',
                  misconception: '**Exact error**: Students treat **every descriptive stanza** as either गौण भाव or विषयांतर.' }
          ],
            remediations: { 'exact-error-students-treat-every': { steps: ['**Re-read the poem stanza-by-stanza** with a 3-column table: | Stanza | What happens (plot/image) | What feeling/idea.', '**Mark the मुख्य भाव** in column 3 for stanzas 1, 4, 8 (core).', 'The *other* feelings in column 3 = गौण भाव candidates.', '**Find the ONE stanza where the camera leaves the ghat** (stanza 7: kite/sky).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Exact error**: Students treat **every descriptive stanza** as either गौण भाव or विषयांतर.',
          parts: [
                { id: 'a', prompt: '"कविता में विषयांतर केवल सजावट के लिए होता है।" — इस कथन का मूल्यांकन "बनारस, दशिा" के संदर्भ में कीजिए। सहमत/असहमत कारण सहित लिखिए।', answer: '**Correct answer**: **असहमत**। पतंग प्रसंग (पद 7) मात्र सजावट नहीं',
                  options: ['**Correct answer**: **असहमत**। पतंग प्रसंग (पद 7) मात्र सजावट नहीं', 'फिर वही घाट, वही धुआँ', 'हाँ, कवि ने सुंदरता के लिए लिखा'],
                  hint: 'अगर मुख्य भाव अस्पष्ट है → तुरंत **c12_hin_a_cbse_04_004** (केंद्रीय भाव और रस) और.',
                  misconception: '**Exact error**: Students treat **every descriptive stanza** as either गौण भाव or विषयांतर.' }
          ],
            remediations: { 'exact-error-students-treat-every': { steps: ['**Re-read the poem stanza-by-stanza** with a 3-column table: | Stanza | What happens (plot/image) | What feeling/idea.', '**Mark the मुख्य भाव** in column 3 for stanzas 1, 4, 8 (core).', 'The *other* feelings in column 3 = गौण भाव candidates.', '**Find the ONE stanza where the camera leaves the ghat** (stanza 7: kite/sky).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_010', difficulty: 'standard',
          question: 'कठिन शब्द वे शब्द हैं जिनका अर्थ स्पष्ट नहीं होता और उन्हें समझने के लिए संदर्भ.',
          hint: 'यदि छात्र मुहावरों के अर्थ को शब्दार्थ से निकालने में गलती कर रहा है, तो उसे.',
          misconception: 'छात्र अक्सर मुहावरों के अर्थ को उनके शब्दों के अलग-अलग अर्थ जोड़कर निकालते हैं, जैसे "घुटना टेकना" को "घुटने पर टेकना".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कठिन शब्द वे शब्द हैं जिनका अर्थ स्पष्ट नहीं होता और उन्हें समझने के लिए संदर्भ या',
                  options: ['कठिन शब्द वे शब्द हैं जिनका अर्थ स्पष्ट नहीं होता और उन्हें समझने के लिए संदर्भ या', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'यदि छात्र मुहावरों के अर्थ को शब्दार्थ से निकालने में गलती कर रहा है, तो उसे c11_hin_a_cbse_01_010.',
                  misconception: 'छात्र अक्सर मुहावरों के अर्थ को उनके शब्दों के अलग-अलग अर्थ जोड़कर निकालते हैं, जैसे "घुटना टेकना" को "घुटने पर टेकना" मानकर शाब्दिक अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले उन मुहावरों की सूची दें जिनका शब्दार्थ और प्रयोगार्थ दोनों अलग हों (जैसे "हाथ धोना", "नाक में दम.', 'नहीं — इसलिए इसका अर्थ है "पाप से स्वयं को अलग करना"। इस प्रकार छात्र को शब्दार्थ से प्रयोगार्थ तक जाने की क्रिया करने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग से तात्पर्य कविता में शब्दों के चयन, वाक्य विन्यास, टोन और.',
          hint: 'यदि फंसे हों तो c12_hin_a_cbse_04_002 (पद्यांश-वार भावार्थ) की दोबारा समीक्षा करें—भाव की.',
          misconception: 'छात्र अक्सर मानते हैं कि कविता में भाषा-प्रयोग का अर्थ केवल कठिन या पुराने शब्दों का प्रयोग है—जैसे "अमर" के बजाय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग से तात्पर्य कविता में शब्दों के चयन, वाक्य विन्यास, टोन और शैली के',
                  options: ['पद्य में भाषा-प्रयोग से तात्पर्य कविता में शब्दों के चयन, वाक्य विन्यास, टोन और शैली के', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'यदि फंसे हों तो c12_hin_a_cbse_04_002 (पद्यांश-वार भावार्थ) की दोबारा समीक्षा करें—भाव की पहचान.',
                  misconception: 'छात्र अक्सर मानते हैं कि कविता में भाषा-प्रयोग का अर्थ केवल कठिन या पुराने शब्दों का प्रयोग है—जैसे "अमर" के बजाय "अमरावती" लिखना। वे भूल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि वह "शोर" शब्द की बजाय "अशांति की लहरें" क्यों नहीं लिख सकता—फिर दोनों वाक्यों के भावात्मक प्रभाव की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ बोध-प्रश्न वे होते हैं जिनके उत्तर सीधे पाठ में मौजूद तथ्यों पर.',
          hint: 'यदि छात्र आशय और भावार्थ में अंतर नहीं कर पा रहे हैं, तो उन्हें c12_hin_a_cbse_04_002.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में कविता के शब्दों के शाब्दिक अर्थ को दोहराते हैं और मानते हैं कि यदि उन्होंने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ बोध-प्रश्न वे होते हैं जिनके उत्तर सीधे पाठ में मौजूद तथ्यों पर आधारित होते',
                  options: ['वस्तुनिष्ठ बोध-प्रश्न वे होते हैं जिनके उत्तर सीधे पाठ में मौजूद तथ्यों पर आधारित होते', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'यदि छात्र आशय और भावार्थ में अंतर नहीं कर पा रहे हैं, तो उन्हें c12_hin_a_cbse_04_002 (पद्यांश-वार.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में कविता के शब्दों के शाब्दिक अर्थ को दोहराते हैं और मानते हैं कि यदि उन्होंने पंक्ति याद कर ली है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र शाब्दिक अर्थ को आशय के समान मान रहे हैं, तो उन्हें बताइए कि एक पंक्ति लें — जैसे "बनारस की गलियों में समय ठहर.', 'क्या लोग बूढ़े नहीं होते?" फिर स्पष्ट कीजिए कि यहाँ "समय ठहर गया" का अर्थ है कि बनारस में बदलाव की अनुभूति नहीं होती.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
