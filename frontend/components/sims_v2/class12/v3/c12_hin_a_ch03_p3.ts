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
        { title: 'यह दीप अकेला, मैंने देखा एक बूँद — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'मैंने देखा, एक चाँद\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track a poet across two registers: weigh the jailed activist\'s communal plea against the solitary observer\'s small epiphany, and hear the refrain built for a listening audience.',
        labels: ['यह दीप अकेला, मैंने'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_013', title: 'यह दीप अकेला, मैंने देखा एक बूँद — आशय-स्पष्टीकरण और विश्लेषण अभ्यास',
          caseStudy: { intro: '\'मैंने देखा, एक चाँद\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।',
            decisions: [{ prompt: 'What is the primary difference between a summary of "nhi vosQyk" and a critical analysis of the same poem?', options: [
                { text: 'A summary retells what the poem says (e.g., "The poet describes a small nose and asks for', outcome: 'A summary retells what the poem says (e.g., "The poet describes a small nose and asks for.' },
                { text: 'critical analysis', outcome: 'Not quite — Students believe "critical analysis" means listing poetic devices (metaphor, alliteration, refrain).', reveals: 'critical-analysis-means-listing-poetic' }
            ] }] } },
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
          question: '\'मैंने देखा, एक चाँद\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'If stuck, return to c12_hin_a_cbse_03_012 (comprehension) and re-do the inferential.',
          misconception: 'Students believe "critical analysis" means listing poetic devices (metaphor, alliteration, refrain) and defining them.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "refrain evolution" to analyze how the repeated line "ij bldks Hkh iafDr dks ns nks" changes in force across the five stanzas of "nhi.', answer: 'Step 1: Identify the refrain in each stanza (appears as last line in all five)',
                  options: ['Step 1: Identify the refrain in each stanza (appears as last line in all five)', 'critical analysis'],
                  hint: 'If stuck, return to c12_hin_a_cbse_03_012 (comprehension) and re-do the inferential questions; then.',
                  misconception: 'Students believe "critical analysis" means listing poetic devices (metaphor, alliteration, refrain) and defining them.' }
          ],
            remediations: { 'critical-analysis-means-listing-poetic': { steps: ['If a student cannot move beyond device identification: 1) Have them re-read the poem with one question: "What is the.', '3) Practice the "So what?" drill: for each device, write one sentence starting "This device shows that..." 4).', 'Revisit node c12_hin_a_cbse_03_008 (imagery) and c12_hin_a_cbse_03_009 (symbolism) to strengthen device-to-meaning.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical analysis" means listing poetic devices (metaphor, alliteration, refrain) and defining them.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The poem \'nhi vosQyk\' is ultimately a failure because it argues for dignity based on utility (the nose as writer, moral agent) rather.', answer: 'Refute',
                  options: ['Refute', 'critical analysis'],
                  hint: 'If stuck, return to c12_hin_a_cbse_03_012 (comprehension) and re-do the inferential questions; then.',
                  misconception: 'Students believe "critical analysis" means listing poetic devices (metaphor, alliteration, refrain) and defining them.' }
          ],
            remediations: { 'critical-analysis-means-listing-poetic': { steps: ['If a student cannot move beyond device identification: 1) Have them re-read the poem with one question: "What is the.', '3) Practice the "So what?" drill: for each device, write one sentence starting "This device shows that..." 4).', 'Revisit node c12_hin_a_cbse_03_008 (imagery) and c12_hin_a_cbse_03_009 (symbolism) to strengthen device-to-meaning.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_014', difficulty: 'standard',
          question: '\'मैंने देखा, एक चाँद\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि PEEL संरचना समझ न आए तो c11_hin_a_cbse_13_014 (कक्षा ११ \'जाग तुझको दूर जाना\'.',
          misconception: 'छात्र समझते हैं कि \'हिंदी में उत्तर लिखना\' का अर्थ है \'सुंदर भाषा में बहुत कुछ लिख देना\'। वास्तव में CBSE मार्किंग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैंने देखा, एक चाँद\' पर पाठ-आधारित लेखन',
                  options: ['\'मैंने देखा, एक चाँद\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'मैंने देखा, एक चाँद\' का कथानक', '\'मैंने देखा, एक चाँद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि PEEL संरचना समझ न आए तो c11_hin_a_cbse_13_014 (कक्षा ११ \'जाग तुझको दूर जाना\' उत्तर-लेखन) पर.',
                  misconception: 'छात्र समझते हैं कि \'हिंदी में उत्तर लिखना\' का अर्थ है \'सुंदर भाषा में बहुत कुछ लिख देना\'। वास्तव में CBSE मार्किंग स्कीम **\'की-वर्ड\'.' }
          ],
            remediations: { 'cbse-key-word': { steps: ['चरण १: छात्र से कहो — "पिछले वर्ष के ३ प्रश्नपत्रों के ३-३ अंक वाले आशय-स्पष्टीकरण प्रश्न निकालो और उनके बोर्ड द्वारा.', 'चरण ३: यदि कोई घटक छूटा हो, तो उसे **c12_hin_a_cbse_03_013** (आशय-स्पष्टीकरण) नोड पर वापस भेजो — वहाँ प्रत्येक पद्यांश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_015', difficulty: 'standard',
          question: '\'मैंने देखा, एक चाँद\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि छात्र चर्चा में मौन रहे या यांत्रिक उत्तर दे, तो c12_hin_a_cbse_03_005 (छंद और.',
          misconception: 'छात्र (और प्रायः शिक्षक भी) मानते हैं कि \'वाचन-पाठ\' = \'सस्वर पठन अभ्यास\' और \'चर्चा-बिंदु\' = \'तैयार उत्तरों की सूची\'।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैंने देखा, एक चाँद\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'मैंने देखा, एक चाँद\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'मैंने देखा, एक चाँद\' का कथानक', '\'मैंने देखा, एक चाँद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र चर्चा में मौन रहे या यांत्रिक उत्तर दे, तो c12_hin_a_cbse_03_005 (छंद और लय-विधान) और.',
                  misconception: 'छात्र (और प्रायः शिक्षक भी) मानते हैं कि \'वाचन-पाठ\' = \'सस्वर पठन अभ्यास\' और \'चर्चा-बिंदु\' = \'तैयार उत्तरों की सूची\'। वास्तव में, वाचन-पाठ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को अकेले कविता की पहली चार पंक्तियाँ रिकॉर्ड करने को कहें — तीन बार: सामान्य, तेज़, धीमी गति से। 2.', 'तीनों रिकॉर्डिंग सुनकर उससे पूछें: "किसमें \'अकेलापन\' सबसे ज्यादा महसूस हुआ?', 'फिर उसे किसी एक साथी के साथ जोड़कर वही पंक्तियाँ पढ़वाएँ — एक \'दीपक\' बने, दूसरा \'साक्षी\'। 4.', 'अन्त में उससे कहें: "अब तुम चर्चा-बिंदु बनाओ — प्रश्न नहीं, दिशा दो।" यह क्रम यांत्रिकता → अनुभूति → संवाद → स्वायत्तता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
