import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch01_p3: SimDef = {
    id: 'v3_c12_hin_a_ch01_p3',
    title: 'देवसेना का गीत, कार्नेलयिा का गीत · Part 3/3',
    subtitle: 'Same god, different century — context is the lens',
    classLevel: 12, subject: 'hin_a', topic: 'देवसेना का गीत, कार्नेलयिा का गीत · Part 3/3',
    chapters: ['c12_hin_a_ch01'],
    nodeIds: ['c12_hin_a_cbse_01_013', 'c12_hin_a_cbse_01_014', 'c12_hin_a_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi poetry scholar', intro: 'Before a single line of Tulsidas, there\'s a world to rebuild — the Bhakti age that made his poems possible.', goal: 'Use contextual reading — author, era, movement, language — to situate Tulsidas\'s poems in the Bhakti tradition.' },
    discovery: {
        question: 'Same poet Tulsidas, same devotion — but read him beside Nirala and the poems could be from different universes. What separates them?',
        options: ['Context — Bhakti-era Awadhi devotion for mass access versus Chhayavad\'s Khari Boli individualism; era, movement and language write the poem before the poet does', 'Just personal taste', 'Only the language differs', 'Nothing — poetry is timeless'],
        answer: 'Context — Bhakti-era Awadhi devotion for mass access versus Chhayavad\'s Khari Boli individualism; era, movement and language write the poem before the poet does',
        hook: '\'Before You Read\' isn\'t optional décor — without it, Tulsidas\'s Rama reads as just mythology instead of a personal god open to every caste. Three questions unlock any poem: whose life, which movement, what tongue.',
    },
    teaching: [
        { title: 'देवसेना का गीत, कार्नेलयिा का गीत — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें किसी पद्यांश के शब्दों के सतही अर्थ से आगे जाकर, कवि के गहरे भाव, संदेश, संदर्भ और अभिप्राय को समझाया और व्याख्या किया जाता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build the lens before the poem: reconstruct Tulsidas\'s Bhakti world — Mughal era, Awadhi, devotion for all — and test how context changes what a single word can mean.',
        labels: ['देवसेना का गीत, कार्नेलयिा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your batch wants a song for the annual day honouring the school\'s retiring matron. The lyricist drafts a literal timeline — joined in this year, served in that year — and it reads like a résumé set to music.',
            decisions: [{ prompt: 'How does Nirala\'s structuring of \'देवसेना का गीत\' and \'कानेसरिया का गीत\' suggest fixing it?', options: [
                { text: 'Rebuild it as an emotional arc, not a résumé — open inside one personal moment of hers, let the feeling turn from private memory to collective debt, and end on the batch\'s open pledge — the way the poems move from private grief to an appeal the listener must carry.', outcome: 'The chapter\'s insight is that a lyric\'s plot is the journey of the speaker\'s consciousness — emotional beats do the narrative work events do in prose.' },
                { text: 'Keep the timeline — a tribute should record the facts of her service accurately.', outcome: 'That\'s the event-plot assumption the chapter corrects: a list of dates documents a career but never becomes a song — without an emotional pivot the audience is informed, not moved.', reveals: 'facts-make-a-song' },
                { text: 'Make it fully abstract — drop her story and write only grand verses about service.', outcome: 'The poems earn their collective ending by starting inside a specific grief; pure abstraction skips the concrete wound that makes the final appeal land.', reveals: 'abstract-is-universal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You can now approach any Hindi text with the reader\'s toolkit — biography, movement and milieu as the keys that turn \'old verse\' into argument.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें किसी पद्यांश के शब्दों के सतही अर्थ से.',
          hint: 'यदि छात्र आशय और वर्णन में अंतर नहीं कर पा रहा है, तो उसे c12_hin_a_cbse_01_004 (केंद्रीय.',
          misconception: 'छात्र अक्सर मानते हैं कि आशय-स्पष्टीकरण का अर्थ है पद्यांश के शब्दों का सरल हिंदी में अनुवाद या सारांश देना—जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें किसी पद्यांश के शब्दों के सतही अर्थ से आगे जाकर,',
                  options: ['आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें किसी पद्यांश के शब्दों के सतही अर्थ से आगे जाकर,', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित'],
                  hint: 'यदि छात्र आशय और वर्णन में अंतर नहीं कर पा रहा है, तो उसे c12_hin_a_cbse_01_004 (केंद्रीय भाव और.',
                  misconception: 'छात्र अक्सर मानते हैं कि आशय-स्पष्टीकरण का अर्थ है पद्यांश के शब्दों का सरल हिंदी में अनुवाद या सारांश देना—जैसे "देवसेना ने युद्ध के लिए.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही पंक्ति दो तरीकों से कैसे समझी जा सकती है: (1) लिटरल: "वीर जवान सीमा पर गए" → केवल तथ्य। (2).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल वह प्रणालीबद्ध प्रक्रिया है जिसमें प्रश्न की मांग को.',
          hint: 'यदि छात्र उत्तर में साक्ष्य नहीं जोड़ पा रहा है, तो उसे देवसेना का गीत, कार्नेलयिा का गीत.',
          misconception: 'छात्र अक्सर मानते हैं कि परीक्षा उत्तर में लंबाई ही गुणवत्ता निर्धारित करती है — इसलिए वे अनावश्यक विस्तार, परिचय-भरे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल वह प्रणालीबद्ध प्रक्रिया है जिसमें प्रश्न की मांग को पहचानकर,',
                  options: ['परीक्षा-उत्तर लेखन कौशल वह प्रणालीबद्ध प्रक्रिया है जिसमें प्रश्न की मांग को पहचानकर,', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित'],
                  hint: 'यदि छात्र उत्तर में साक्ष्य नहीं जोड़ पा रहा है, तो उसे देवसेना का गीत, कार्नेलयिा का गीत — पदावली.',
                  misconception: 'छात्र अक्सर मानते हैं कि परीक्षा उत्तर में लंबाई ही गुणवत्ता निर्धारित करती है — इसलिए वे अनावश्यक विस्तार, परिचय-भरे पैराग्राफ या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस गलती को दोहराता है, तो उसे इस अभ्यास के माध्यम से सुधारा जाए: उसे एक प्रश्न दें (जैसे "देवसेना का गीत में.', 'क्या इसमें नया साक्ष्य या तर्क है?" जो वाक्य इन शर्तों को पूरा नहीं करते, उन्हें हटाएँ। इस प्रक्रिया को दोहराएँ तक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_015', difficulty: 'standard',
          question: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है कविता को सही लय, उच्चारण और भाव-भंगिमा के.',
          hint: 'यदि फंसे हों, तो देवसेना का गीत, कार्नेलयिा का गीत — केंद्रीय भाव और रस.',
          misconception: 'छात्र spesso मानते हैं कि वाचन-पाठ केवल सही उच्चारण और गति से पढ़ना है, और चर्चा-बिंदु केवल कविता के भावार्थ को दोहराना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है कविता को सही लय, उच्चारण और भाव-भंगिमा के साथ पढ़कर',
                  options: ['वाचन-पाठ और चर्चा-बिंदु का अर्थ है कविता को सही लय, उच्चारण और भाव-भंगिमा के साथ पढ़कर', 'कवि परिचय और पृष्ठभूमि का अर्थ है', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक छंद/पद्यांश का **स्वतंत्र अर्थ स्पष्ट', 'काव्य-संरचना पद्य के रूप, stanza वितरण, पंक्तियों की संख्या और उनके संबंध को संदर्भित'],
                  hint: 'यदि फंसे हों, तो देवसेना का गीत, कार्नेलयिा का गीत — केंद्रीय भाव और रस (c12_hin_a_cbse_01_004) को.',
                  misconception: 'छात्र spesso मानते हैं कि वाचन-पाठ केवल सही उच्चारण और गति से पढ़ना है, और चर्चा-बिंदु केवल कविता के भावार्थ को दोहराना है। वे यह नहीं समझ.' }
          ],
            remediations: { 'spesso': { steps: ['छात्र को पहले कविता की एक पंक्ति चुनकर उसे तीन अलग-अलग भावों (जैसे शोक, गर्व, निर्भीकता) के साथ पढ़ने के लिए कहें। फिर.', 'इससे भाव का अर्थ कैसे बदल गया?" इस अभ्यास के बाद, चर्चा-बिंदु पर जाएं और पूछें: "अगर इस पंक्ति को शोक के साथ पढ़ा जाए.', 'क्यों?" इससे छात्र को समझ आएगा कि वाचन अर्थ को आकार देता है, और चर्चा का उद्देश्य इस संबंध का विश्लेषण करना है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
