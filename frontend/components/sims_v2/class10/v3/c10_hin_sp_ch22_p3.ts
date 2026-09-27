import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch22_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch22_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch22_p3',
    title: 'आत्मत्राण · Part 3/3',
    subtitle: 'इस नोड में **आत्मत्राण** कविता के पद्यांशों पर आधारित आशय-स्पष्टीकरण और विश्लेषण लेखन की.',
    classLevel: 10, subject: 'hin_sp', topic: 'आत्मत्राण · Part 3/3',
    chapters: ['c10_hin_sp_ch22'],
    nodeIds: ['c10_hin_sp_cbse_22_013', 'c10_hin_sp_cbse_22_014', 'c10_hin_sp_cbse_22_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'बोर्ड परीक्षा में जब तुमसे पूछा जाए "निम्नलिखित पद्यांश का आशय स्पष्ट कीजिए", तो सबसे पहले **पंक्तियों को जोर.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'आत्मत्राण — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण का अर्थ है किसी पद्यांश या गद्यांश के **शब्दार्थ, भावार्थ, प्रसंग, केंद्रीय भाव, अलंकार/प्रतीक/बिंब की पहचान और उनका प्रभाव** को क्रमबद्ध ढंग से लिखना; विश्लेषण अभ्यास का अर्थ है रचना.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_22_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['आत्मत्राण — आशय-स्पष्टीकरण और', 'आत्मत्राण — परीक्षा-उत्तर लेखन', 'आत्मत्राण — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_22_015', title: 'You made it',
          caseStudy: { intro: 'You finished आत्मत्राण — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण का अर्थ है किसी पद्यांश या गद्यांश के **शब्दार्थ, भावार्थ.',
          hint: 'यदि फंसे हों, तो c10_hin_sp_cbse_22_002 (पद्यांश-वार भावार्थ) और c10_hin_sp_cbse_22_006.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आशय-स्पष्टीकरण में **पंक्तियों का अनुवाद (हिंदी अर्थ)** लिख देना पर्याप्त है। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण का अर्थ है किसी पद्यांश या गद्यांश के **शब्दार्थ, भावार्थ, प्रसंग,',
                  options: ['आशय-स्पष्टीकरण का अर्थ है किसी पद्यांश या गद्यांश के **शब्दार्थ, भावार्थ, प्रसंग,', '\'आत्मत्राण\' निराला जी की एक प्रसिद्ध मुक्तक कविता है जिसमें कवि ने व्यक्तिगत विषम', '"पद्यांश-वार भावार्थ" (Stanza-wise Literal Meaning) is the systematic process of decoding', 'काव्य-संरचना (Poetic Structure) refers to the deliberate architectural choices a poet'],
                  hint: 'यदि फंसे हों, तो c10_hin_sp_cbse_22_002 (पद्यांश-वार भावार्थ) और c10_hin_sp_cbse_22_006 (अलंकार).',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि आशय-स्पष्टीकरण में **पंक्तियों का अनुवाद (हिंदी अर्थ)** लिख देना पर्याप्त है। वे **प्रसंग** छोड़ देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**प्रसंग अभ्यास:** पिछले 5 वर्षों के CBSE प्रश्नपत्रों से 3 पद्यांश चुनें और केवल **प्रसंग** लिखने का अभ्यास करें — 2.', '**प्रभाव-लेखन ड्रिल:** प्रतिदिन 1 अलंकार/बिंब लें (जैसे: अनुप्रास, रूपक, दृश्य बिंब) और उसका **प्रभाव 2 वाक्यों में**.', '**संरचित टेम्पलेट:** A4 शीट पर 4 खाने बनाएं: प्रसंग | शब्दार्थ+भावार्थ | अलंकार/बिंब+प्रभाव | केंद्रीय भाव से संबंध। हर.', '**स्व-मूल्यांकन:** मार्किंग स्कीम से मिलान करें — किस खाने में अंक कटे?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है **CBSE बोर्ड परीक्षा के अंक-विभाजन (marking.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_22_012 (बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक)** दोहराएँ.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि **\'उत्तर लिखना = जानकारी उड़ेलना\' (data dumping)** है — वे पंक्तियाँ रटकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है **CBSE बोर्ड परीक्षा के अंक-विभाजन (marking scheme) के',
                  options: ['परीक्षा-उत्तर लेखन कौशल का अर्थ है **CBSE बोर्ड परीक्षा के अंक-विभाजन (marking scheme) के', '\'आत्मत्राण\' निराला जी की एक प्रसिद्ध मुक्तक कविता है जिसमें कवि ने व्यक्तिगत विषम', '"पद्यांश-वार भावार्थ" (Stanza-wise Literal Meaning) is the systematic process of decoding', 'काव्य-संरचना (Poetic Structure) refers to the deliberate architectural choices a poet'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_22_012 (बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक)** दोहराएँ — वहाँ.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि **\'उत्तर लिखना = जानकारी उड़ेलना\' (data dumping)** है — वे पंक्तियाँ रटकर, बिना प्रश्न की माँग.' }
          ],
            remediations: { 'data-dumping': { steps: ['**निर्देश-शब्द चार्ट बनाएँ:** \'स्पष्ट कीजिए/विश्लेषण कीजिए/तुलना कीजिए/समालोचना कीजिए\' के लिए **अलग-अलग उत्तर-संरचना**.', '**रंगीन हाइलाइटर अभ्यास:** पुराने प्रश्न-पत्रों के 5 प्रश्न लें — **निर्देश-शब्द को लाल, माँगे गए बिंदुओं को पीले.', '**PEEL टेम्पलेट पर 3 बार लिखें:** एक ही 3-अंकीय प्रश्न का उत्तर **तीन बार** लिखें — पहली बार केवल Point, दूसरी बार.', '**समयबद्ध मॉक:** 15 मिनट में 3 प्रश्न (3+3+5 अंक) हल करें; लिखने के बाद **\'अंक-मिलान चेकलिस्ट\'** (क्या हर अंक के लिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_22_015', difficulty: 'standard',
          question: 'वाचन-पाठ कविता को स्वर, लय, गति, विराम और भावाभिव्यक्ति के साथ सस्वर पढ़ने की.',
          hint: 'यदि अटके तो c10_hin_sp_cbse_22_005 (छंद-लय) और c10_hin_sp_cbse_22_007 (प्रतीक-बिंब).',
          misconception: 'विद्यार्थी समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल सही उच्चारण और गति से पढ़ना है, और \'चर्चा-बिंदु\' का अर्थ पाठ्यपुस्तक के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ कविता को स्वर, लय, गति, विराम और भावाभिव्यक्ति के साथ सस्वर पढ़ने की कला है',
                  options: ['वाचन-पाठ कविता को स्वर, लय, गति, विराम और भावाभिव्यक्ति के साथ सस्वर पढ़ने की कला है', '\'आत्मत्राण\' निराला जी की एक प्रसिद्ध मुक्तक कविता है जिसमें कवि ने व्यक्तिगत विषम', '"पद्यांश-वार भावार्थ" (Stanza-wise Literal Meaning) is the systematic process of decoding', 'काव्य-संरचना (Poetic Structure) refers to the deliberate architectural choices a poet'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_22_005 (छंद-लय) और c10_hin_sp_cbse_22_007 (प्रतीक-बिंब) दोहराएँ — ये.',
                  misconception: 'विद्यार्थी समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल सही उच्चारण और गति से पढ़ना है, और \'चर्चा-बिंदु\' का अर्थ पाठ्यपुस्तक के पीछे दिए प्रश्नों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को कविता का एक पद धीमे, अत्यधिक बलाघात और अतिशय विराम के साथ पढ़वाएँ — फिर सामान्य वाचन करवाएँ — दोनों में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
