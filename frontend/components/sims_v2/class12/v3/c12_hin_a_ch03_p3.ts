import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch03_p3: SimDef = {
    id: 'v3_c12_hin_a_ch03_p3',
    title: 'यह दीप अकेला, मैंने देखा एक बूँद · Part 3/3',
    subtitle: 'The poet who went to jail wrote about a little bird',
    classLevel: 12, subject: 'hin_a', topic: 'यह दीप अकेला, मैंने देखा एक बूँद · Part 3/3',
    chapters: ['c12_hin_a_ch03'],
    nodeIds: ['c12_hin_a_cbse_03_013', 'c12_hin_a_cbse_03_014', 'c12_hin_a_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modern Hindi poetry reader', intro: 'A freedom fighter turned editor turned poet — each life sharpened the next. Two poems show the whole arc.', goal: 'Read Vajra\'s two poems through his biography — activism, editorial craft, and the shift from exhortation to observation.' },
    discovery: {
        question: 'A poet jailed in 1942 writes of a small, dear bird begging to be let into a heart — \'इसे भी दिल को दे दो.\' What makes the plea more than birdwatching?',
        options: ['Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness', 'He loved birds', 'It\'s a children\'s poem', 'Sentimentality'],
        answer: 'Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness',
        hook: 'Vajra\'s two poems mark an evolution: the early one exhorts the collective \'you\' to accept the fragile; the later one whispers \'I saw\' — private epiphany replacing public call. Radio editing and Sanskrit-English schooling sharpened the ear that compresses so much into so few words.',
    },
    teaching: [
        { title: 'यह दीप अकेला, मैंने देखा एक बूँद — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'आशय-स्पष्टीकरण\' का अर्थ है कविता की पंक्तियों के **गूढ़ भावार्थ** को सरल भाषा में खोलकर समझाना, जिसमें कवि के आशय, प्रसंग, प्रतीक-योजना और भाव-सौंदर्य को स्पष्ट किया जाता है; \'विश्लेषण अभ्यास\' का.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track a poet across two registers: weigh the jailed activist\'s communal plea against the solitary observer\'s small epiphany, and hear the refrain built for a listening audience.',
        labels: ['यह दीप अकेला, मैंने'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a personality-development workshop, the facilitator insists each student define themselves in one word for the badge. A friend who\'s a painter-cricketer-caregiver freezes: \'None of these fit. Something\'s wrong with me.\'',
            decisions: [{ prompt: 'What do Dangwal\'s poems in this chapter tell her?', options: [
                { text: 'Nothing\'s wrong — \'नहीं वोश्यक\' spends four stanzas piling metaphor on metaphor precisely because identity won\'t sit in one word; each new facet re-reads all the others, and the refrain keeps inviting the search rather than closing it.', outcome: 'The refrain-catalogue structure enacts the refusal to be pinned down — the badge exercise mistakes a list for a person, while the poem shows elusiveness is the truth of a self.' },
                { text: 'Pick the dominant word — everyone has one core trait, and finding it is the point of the exercise.', outcome: 'That\'s the single-label fallacy the poem resists: every metaphor presented as \'the answer\' is immediately reframed by the next, proving the \'one word\' can\'t hold the subject.', reveals: 'one-word-captures-self' },
                { text: 'Skip the badge — since identity can\'t be fixed, the exercise is pointless.', outcome: 'The poem doesn\'t abandon the search — the refrain is an invitation to keep looking, not a verdict that looking is futile; the point is the seeking, not the surrender.', reveals: 'unfixable-means-pointless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You can now read biography as a poetic instrument — and trace one poet\'s arc from barricades to the small bird at the window.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_013', difficulty: 'standard',
          question: '\'आशय-स्पष्टीकरण\' का अर्थ है कविता की पंक्तियों के **गूढ़ भावार्थ** को सरल भाषा.',
          hint: 'यदि अटके तो **c12_hin_a_cbse_03_006 (साहित्यिक युक्तियाँ: अलंकार)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र \'आशय-स्पष्टीकरण\' को **\'सरल भावार्थ\'** या **\'अनुवाद\'** समझ बैठते हैं और केवल शब्दार्थ लिखकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आशय-स्पष्टीकरण\' का अर्थ है कविता की पंक्तियों के **गूढ़ भावार्थ** को सरल भाषा में खोलकर',
                  options: ['\'आशय-स्पष्टीकरण\' का अर्थ है कविता की पंक्तियों के **गूढ़ भावार्थ** को सरल भाषा में खोलकर', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे'],
                  hint: 'यदि अटके तो **c12_hin_a_cbse_03_006 (साहित्यिक युक्तियाँ: अलंकार)** और **c12_hin_a_cbse_03_007.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र \'आशय-स्पष्टीकरण\' को **\'सरल भावार्थ\'** या **\'अनुवाद\'** समझ बैठते हैं और केवल शब्दार्थ लिखकर छोड़ देते हैं — जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** c12_hin_a_cbse_03_002 (पद्यांश-वार भाव) और c12_hin_a_cbse_03_006 (साहित्यिक युक्तियाँ) नोड्स दोहराओ.', '**दूसरा कदम:** किसी एक काव्यांश को लेकर **PEEL संरचना** में 3 बार उत्तर लिखो: Point (क्या कहना है), Evidence (कौन-सी.', '**तीसरा कदम:** अपने लिखे उत्तर की तुलना **मॉडल उत्तर** (c12_hin_a_cbse_03_014) से करो — अंतर चिह्नित करो। 4.', '**पुनः निदान:** DIAGNOSTIC_QUESTION_3 फिर से हल करो; यदि अब प्रसंग+भावार्थ+संबंध तीनों स्पष्ट हों, तो आगे बढ़ो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है NCERT पाठ्यक्रम के अनुसार निर्धारित.',
          hint: 'यदि PEEL संरचना समझ न आए तो c11_hin_a_cbse_13_014 (कक्षा ११ \'जाग तुझको दूर जाना\'.',
          misconception: 'छात्र समझते हैं कि \'हिंदी में उत्तर लिखना\' का अर्थ है \'सुंदर भाषा में बहुत कुछ लिख देना\'। वास्तव में CBSE मार्किंग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है NCERT पाठ्यक्रम के अनुसार निर्धारित शब्द-सीमा,',
                  options: ['परीक्षा-उत्तर लेखन कौशल का अर्थ है NCERT पाठ्यक्रम के अनुसार निर्धारित शब्द-सीमा,', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे'],
                  hint: 'यदि PEEL संरचना समझ न आए तो c11_hin_a_cbse_13_014 (कक्षा ११ \'जाग तुझको दूर जाना\' उत्तर-लेखन) पर.',
                  misconception: 'छात्र समझते हैं कि \'हिंदी में उत्तर लिखना\' का अर्थ है \'सुंदर भाषा में बहुत कुछ लिख देना\'। वास्तव में CBSE मार्किंग स्कीम **\'की-वर्ड\'.' }
          ],
            remediations: { 'cbse-key-word': { steps: ['चरण १: छात्र से कहो — "पिछले वर्ष के ३ प्रश्नपत्रों के ३-३ अंक वाले आशय-स्पष्टीकरण प्रश्न निकालो और उनके बोर्ड द्वारा.', 'चरण ३: यदि कोई घटक छूटा हो, तो उसे **c12_hin_a_cbse_03_013** (आशय-स्पष्टीकरण) नोड पर वापस भेजो — वहाँ प्रत्येक पद्यांश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_015', difficulty: 'standard',
          question: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है कविता को सामूहिक रूप से सस्वर पढ़ना.',
          hint: 'यदि छात्र चर्चा में मौन रहे या यांत्रिक उत्तर दे, तो c12_hin_a_cbse_03_005 (छंद और.',
          misconception: 'छात्र (और प्रायः शिक्षक भी) मानते हैं कि \'वाचन-पाठ\' = \'सस्वर पठन अभ्यास\' और \'चर्चा-बिंदु\' = \'तैयार उत्तरों की सूची\'।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है कविता को सामूहिक रूप से सस्वर पढ़ना (वाचन-पाठ) ताकि',
                  options: ['वाचन-पाठ और चर्चा-बिंदु का अर्थ है कविता को सामूहिक रूप से सस्वर पढ़ना (वाचन-पाठ) ताकि', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे'],
                  hint: 'यदि छात्र चर्चा में मौन रहे या यांत्रिक उत्तर दे, तो c12_hin_a_cbse_03_005 (छंद और लय-विधान) और.',
                  misconception: 'छात्र (और प्रायः शिक्षक भी) मानते हैं कि \'वाचन-पाठ\' = \'सस्वर पठन अभ्यास\' और \'चर्चा-बिंदु\' = \'तैयार उत्तरों की सूची\'। वास्तव में, वाचन-पाठ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को अकेले कविता की पहली चार पंक्तियाँ रिकॉर्ड करने को कहें — तीन बार: सामान्य, तेज़, धीमी गति से। 2.', 'तीनों रिकॉर्डिंग सुनकर उससे पूछें: "किसमें \'अकेलापन\' सबसे ज्यादा महसूस हुआ?', 'फिर उसे किसी एक साथी के साथ जोड़कर वही पंक्तियाँ पढ़वाएँ — एक \'दीपक\' बने, दूसरा \'साक्षी\'। 4.', 'अन्त में उससे कहें: "अब तुम चर्चा-बिंदु बनाओ — प्रश्न नहीं, दिशा दो।" यह क्रम यांत्रिकता → अनुभूति → संवाद → स्वायत्तता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
