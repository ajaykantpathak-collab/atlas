import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch03_p2: SimDef = {
    id: 'v3_c12_hin_a_ch03_p2',
    title: 'यह दीप अकेला, मैंने देखा एक बूँद · Part 2/3',
    subtitle: 'The poet who went to jail wrote about a little bird',
    classLevel: 12, subject: 'hin_a', topic: 'यह दीप अकेला, मैंने देखा एक बूँद · Part 2/3',
    chapters: ['c12_hin_a_ch03'],
    nodeIds: ['c12_hin_a_cbse_03_007', 'c12_hin_a_cbse_03_008', 'c12_hin_a_cbse_03_009', 'c12_hin_a_cbse_03_010', 'c12_hin_a_cbse_03_011', 'c12_hin_a_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modern Hindi poetry reader', intro: 'A freedom fighter turned editor turned poet — each life sharpened the next. Two poems show the whole arc.', goal: 'Read Vajra\'s two poems through his biography — activism, editorial craft, and the shift from exhortation to observation.' },
    discovery: {
        question: 'A poet jailed in 1942 writes of a small, dear bird begging to be let into a heart — \'इसे भी दिल को दे दो.\' What makes the plea more than birdwatching?',
        options: ['Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness', 'He loved birds', 'It\'s a children\'s poem', 'Sentimentality'],
        answer: 'Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness',
        hook: 'Vajra\'s two poems mark an evolution: the early one exhorts the collective \'you\' to accept the fragile; the later one whispers \'I saw\' — private epiphany replacing public call. Radio editing and Sanskrit-English schooling sharpened the ear that compresses so much into so few words.',
    },
    teaching: [
        { title: 'यह दीप अकेला, मैंने देखा एक बूँद — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'प्रतीक एक ऐसा चिह्न, वस्तु या पात्र है जो अपने प्रत्यक्ष अर्थ से परे जाकर किसी गहरे अमूर्त विचार या भावना को प्रतिनिधित्व करता है, जबकि बिंब एक स्पष्ट, संवेदनात्मक विवरण है जो पाठक के मन में एक जीवंत.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track a poet across two registers: weigh the jailed activist\'s communal plea against the solitary observer\'s small epiphany, and hear the refrain built for a listening audience.',
        labels: ['यह दीप अकेला, मैंने'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a personality-development workshop, the facilitator insists each student define themselves in one word for the badge. A friend who\'s a painter-cricketer-caregiver freezes: \'None of these fit. Something\'s wrong with me.\'',
            decisions: [{ prompt: 'What do Dangwal\'s poems in this chapter tell her?', options: [
                { text: 'Nothing\'s wrong — \'नहीं वोश्यक\' spends four stanzas piling metaphor on metaphor precisely because identity won\'t sit in one word; each new facet re-reads all the others, and the refrain keeps inviting the search rather than closing it.', outcome: 'The refrain-catalogue structure enacts the refusal to be pinned down — the badge exercise mistakes a list for a person, while the poem shows elusiveness is the truth of a self.' },
                { text: 'Pick the dominant word — everyone has one core trait, and finding it is the point of the exercise.', outcome: 'That\'s the single-label fallacy the poem resists: every metaphor presented as \'the answer\' is immediately reframed by the next, proving the \'one word\' can\'t hold the subject.', reveals: 'one-word-captures-self' },
                { text: 'Skip the badge — since identity can\'t be fixed, the exercise is pointless.', outcome: 'The poem doesn\'t abandon the search — the refrain is an invitation to keep looking, not a verdict that looking is futile; the point is the seeking, not the surrender.', reveals: 'unfixable-means-pointless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read biography as a poetic instrument — and trace one poet\'s arc from barricades to the small bird at the window.',
            decisions: [{ prompt: 'What comes next? यह दीप अकेला, मैंने देखा एक बूँद · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — यह दीप अकेला, मैंने देखा एक बूँद · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_007', difficulty: 'standard',
          question: 'प्रतीक एक ऐसा चिह्न, वस्तु या पात्र है जो अपने प्रत्यक्ष अर्थ से परे जाकर किसी.',
          hint: 'कक्षा 11 के साहित्यिक युक्तियाँ: बिंब और रूपक तथा विरोधाभास और प्रतीक नोड्स को दोबारा.',
          misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही मानते हैं, विशेष रूप से जब कोई वस्तु दोनों भूमिकाएँ निभा सके (जैसे दीपक जो प्रकाश.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रतीक एक ऐसा चिह्न, वस्तु या पात्र है जो अपने प्रत्यक्ष अर्थ से परे जाकर किसी गहरे',
                  options: ['प्रतीक एक ऐसा चिह्न, वस्तु या पात्र है जो अपने प्रत्यक्ष अर्थ से परे जाकर किसी गहरे', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे'],
                  hint: 'कक्षा 11 के साहित्यिक युक्तियाँ: बिंब और रूपक तथा विरोधाभास और प्रतीक नोड्स को दोबारा देखें, विशेष.',
                  misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही मानते हैं, विशेष रूप से जब कोई वस्तु दोनों भूमिकाएँ निभा सके (जैसे दीपक जो प्रकाश का प्रतीक भी है और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले कविता की पंक्तियों को दो बार पढ़ने के लिए कहें: पहली बार धीरे-धीरे शब्दों पर ध्यान देते हुए (बिंब के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_008', difficulty: 'standard',
          question: 'मुख्य भाव वह केंद्रीय भाव या भावना है जो कविता के माध्यम से दोहराई जाती है और.',
          hint: 'यदि फंसे हुए महसूस हों, तो कक्षा 11 के पाठ 6 के नोड c11_hin_a_cbse_03_006 (मुख्य विषय और.',
          misconception: 'छात्र अक्सर मानते हैं कि कविता का मुख्य भाव केवल \'एक दिया और एक बूँद देखना\' है — यानी वे कविता के शाब्दिक, दृश्य विवरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव वह केंद्रीय भाव या भावना है जो कविता के माध्यम से दोहराई जाती है और समग्र कविता',
                  options: ['मुख्य भाव वह केंद्रीय भाव या भावना है जो कविता के माध्यम से दोहराई जाती है और समग्र कविता', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे'],
                  hint: 'यदि फंसे हुए महसूस हों, तो कक्षा 11 के पाठ 6 के नोड c11_hin_a_cbse_03_006 (मुख्य विषय और संदेश) की.',
                  misconception: 'छात्र अक्सर मानते हैं कि कविता का मुख्य भाव केवल \'एक दिया और एक बूँद देखना\' है — यानी वे कविता के शाब्दिक, दृश्य विवरण को मुख्य भाव मान.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र मुख्य भाव को शाब्दिक रूप से समझ रहा है, तो उसे कविता के प्रत्येक stanza को आवाज़ में पढ़ने के लिए कहिए और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_009', difficulty: 'standard',
          question: 'गौण भाव (उप-थीम) वे सहायक विचार/भाव हैं जो कविता के केंद्रीय भाव को पुष्ट.',
          hint: 'अगर केंद्रीय भाव स्पष्ट न हो तो c12_hin_a_cbse_03_004 और c12_hin_a_cbse_03_008 पर लौटें.',
          misconception: 'छात्र अक्सर **\'विषयांतर\' को \'लेखक का भटकाव\' या \'अप्रासंगिक प्रसंग\' मान लेते हैं**, जबकि हिंदी काव्य-परंपरा (छायावाद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव (उप-थीम) वे सहायक विचार/भाव हैं जो कविता के केंद्रीय भाव को पुष्ट, विस्तारित या',
                  options: ['गौण भाव (उप-थीम) वे सहायक विचार/भाव हैं जो कविता के केंद्रीय भाव को पुष्ट, विस्तारित या', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे'],
                  hint: 'अगर केंद्रीय भाव स्पष्ट न हो तो c12_hin_a_cbse_03_004 और c12_hin_a_cbse_03_008 पर लौटें — वहाँ.',
                  misconception: 'छात्र अक्सर **\'विषयांतर\' को \'लेखक का भटकाव\' या \'अप्रासंगिक प्रसंग\' मान लेते हैं**, जबकि हिंदी काव्य-परंपरा (छायावाद विशेषकर) में विषयांतर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम**: छात्र से कहें — "कविता के 3 स्टैंज़ा चुनें जो आपको \'मुख्य बात से अलग\' लगें; प्रत्येक के लिए लिखें: (क) यह.', '(ख) क्या यह मुख्य भाव पर लौटता है?', '(ग) क्या यह मुख्य भाव को मजबूत करता है?" 2.', '**दूसरा कदम**: c12_hin_a_cbse_03_004 (केंद्रीय भाव) और c12_hin_a_cbse_03_008 (मुख्य भाव) दोबारा पढ़वाएँ — गौण/मुख्य का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_010', difficulty: 'standard',
          question: 'पदावली का अर्थ है कविता में प्रयुक्त कठिन शब्दों, मुहावरों और idiomatic.',
          hint: 'यदि शब्दों के शब्दकोश अर्थ याद नहीं आ रहे हैं तो कक्षा 11 के नोड c11_hin_a_cbse_03_010.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि वे किसी शब्द का शब्दकोश अर्थ जानते हैं तो वे उसकी भावात्मक व्याख्या भी सही कर सकते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली का अर्थ है कविता में प्रयुक्त कठिन शब्दों, मुहावरों और idiomatic expressions के',
                  options: ['पदावली का अर्थ है कविता में प्रयुक्त कठिन शब्दों, मुहावरों और idiomatic expressions के', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे'],
                  hint: 'यदि शब्दों के शब्दकोश अर्थ याद नहीं आ रहे हैं तो कक्षा 11 के नोड c11_hin_a_cbse_03_010 (पदावली.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि वे किसी शब्द का शब्दकोश अर्थ जानते हैं तो वे उसकी भावात्मक व्याख्या भी सही कर सकते हैं—जैसे वे "बूँद" का अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि कोई छात्र इस भ्रम में फंसा हुआ है तो उसे निम्नलिखित चरण-दर-चरण प्रक्रिया का पालन कराना चाहिए: (1) कविता की कोई एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है कविता में शब्दों के चयन, क्रम, पदबंध संरचना.',
          hint: 'यदि पदबंध पहचान में अटके तो c11_hin_a_cbse_13_011 के \'पदबंध विश्लेषण\' खंड को दोहराएँ; यदि.',
          misconception: 'छात्र समझते हैं कि पद्य में व्याकरण के नियम \'टूटते\' हैं या कवि \'गलती\' करता है; वास्तव में कवि \'काव्यात्मक छूट\' (Poetic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है कविता में शब्दों के चयन, क्रम, पदबंध संरचना, अलंकारिक',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है कविता में शब्दों के चयन, क्रम, पदबंध संरचना, अलंकारिक', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे'],
                  hint: 'यदि पदबंध पहचान में अटके तो c11_hin_a_cbse_13_011 के \'पदबंध विश्लेषण\' खंड को दोहराएँ; यदि.',
                  misconception: 'छात्र समझते हैं कि पद्य में व्याकरण के नियम \'टूटते\' हैं या कवि \'गलती\' करता है; वास्तव में कवि \'काव्यात्मक छूट\' (Poetic License) लेता है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को \'काव्यात्मक छूट\' की अवधारणा स्पष्ट करें: उदाहरण देकर दिखाएँ कि कैसे \'नील गगन\' (विशेषण-पद) और \'गगन नील\'.', 'उसे c11_hin_a_cbse_13_011 (जाग तुझको दूर जाना — व्याकरण: पद्य में भाषा-प्रयोग) और c11_hin_a_cbse_14_011 (बादल को घरिते.', 'पुनः निदान के लिए DIAGNOSTIC_QUESTION_2 और DIAGNOSTIC_QUESTION_6 फिर से हल करवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_012', difficulty: 'standard',
          question: 'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वह प्रश्न है जो पाठ के स्पष्ट तथ्य.',
          hint: 'यदि फंसें, तो कक्षा 11 के नोड c11_hin_a_cbse_03_012 में वस्तुनिष्ठ और आशय-सूचक प्रश्नों.',
          misconception: 'छात्र अक्सर वस्तुनिष्ठ और आशय-सूचक प्रश्नों के उत्तर को एक ही तरह लिखते हैं — जैसे कि "कवि ने एक दीप और एक बूँद देखी".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वह प्रश्न है जो पाठ के स्पष्ट तथ्य (वस्तुनिष्ठ) और',
                  options: ['बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वह प्रश्न है जो पाठ के स्पष्ट तथ्य (वस्तुनिष्ठ) और', '\'यह दीप अकेला\' अज्ञेय की प्रयोगवादी कविता है जो व्यक्तिगत नैतिक साहस और सामाजिक अंधेरे के', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टेन्जा) का शब्दशः और', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के आंतरिक ढांचे'],
                  hint: 'यदि फंसें, तो कक्षा 11 के नोड c11_hin_a_cbse_03_012 में वस्तुनिष्ठ और आशय-सूचक प्रश्नों के आधारभूत.',
                  misconception: 'छात्र अक्सर वस्तुनिष्ठ और आशय-सूचक प्रश्नों के उत्तर को एक ही तरह लिखते हैं — जैसे कि "कवि ने एक दीप और एक बूँद देखी" दोनों प्रकार के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि दो अलग-अलग प्रश्न लाइए: (1) "कवि ने क्या देखा?" — उत्तर में केवल "एक अकेला दिया और एक बूँद" लिखवाइए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
