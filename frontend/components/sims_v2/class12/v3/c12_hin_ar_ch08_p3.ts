import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch08_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch08_p3',
    title: 'रुबाइयाँ · Part 3/3',
    subtitle: 'The village finally spoke — in its own voice',
    classLevel: 12, subject: 'hin_ar', topic: 'रुबाइयाँ · Part 3/3',
    chapters: ['c12_hin_ar_ch08'],
    nodeIds: ['c12_hin_ar_cbse_08_013', 'c12_hin_ar_cbse_08_014', 'c12_hin_ar_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-language poetry reader', intro: 'A freedom fighter from Araria refused to translate the village for the city. The dialect is the poem\'s argument.', goal: 'Read Renu\'s poem through lok-bhasha politics, body-as-knowing and post-Quit India longing.' },
    discovery: {
        question: 'Premchand wrote about villages in standard Hindi; Renu wrote from inside the village in its own folk speech. Why is the difference more than style?',
        options: ['Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature', 'Renu couldn\'t write proper Hindi', 'Dialect is just local colour', 'No real difference'],
        answer: 'Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature',
        hook: 'Renu\'s philosophy erased the body-mind split — mud on knees IS knowing the world. A Quit India prisoner writing children\'s free play isn\'t just nostalgic: that village is the autonomous world he fought for, reclaimed in folk speech.',
    },
    teaching: [
        { title: 'रुबाइयाँ — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें किसी पद्यांश के **शाब्दिक अर्थ**, **प्रसंग**, **काव्यगत विशेषताएँ** (अलंकार, छंद, प्रतीक) और **केंद्रीय भाव** को संयुक्त रूप से स्पष्ट किया जाता है ताकि कवि का.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hear a poem in lok-bhasha: weigh dialect as political choice, read bodily play as a way of knowing, and connect a freedom fighter\'s childhood to the freedom he couldn\'t finish.',
        labels: ['रुबाइयाँ — आशय-स्पष्टीकरण और', 'रुबाइयाँ — परीक्षा-उत्तर लेखन', 'रुबाइयाँ — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend selected for a national poetry fest wants to strip the dialect words from her village poems — \'real Hindi shouldn\'t smell of fields.\' The poems\' best lines are built from exactly those folk words and her grandmother\'s sayings.',
            decisions: [{ prompt: 'What does Renu\'s poem with the vine refrain say to her plan?', options: [
                { text: 'Keep the dialect — the poem builds from village scenes to the claim that script clings to language and language to life like a vine to a tree; cutting the folk idiom severs the very root the refrain keeps reaffirming.', outcome: 'The refrain isn\'t decoration: each stanza\'s memory ends by clinging back to the soil, so her \'impure\' words are the structural backbone of what makes the poems live.' },
                { text: 'Support the polish — standard literary Hindi is the tree; dialect is a creeper that needs pruning to grow upward.', outcome: 'The poem reverses that hierarchy — the vine survives because it clings; dialect isn\'t a parasite on standard language but the living connection that keeps the whole organism fed.', reveals: 'standard-above-dialect' },
                { text: 'Suggest writing two versions: a dialect draft for home and a cleaned-up one for the fest.', outcome: 'The poem\'s fourth stanza universalises the personal — the folk voice is the argument, not a first draft to be translated away; the split treats rootedness as a private habit to hide in public.', reveals: 'dialect-is-private-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'You can now hear regional speech as literature\'s politics — and read a child\'s muddy play as reclaimed freedom.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें किसी पद्यांश के **शाब्दिक अर्थ**.',
          hint: 'यदि **प्रतीक/अलंकार पहचान** में अटके → c12_hin_ar_cbse_08_006, 08_007 दोहराएँ; यदि.',
          misconception: '**सबसे घातक भ्रम:** *"आशय-स्पष्टीकरण = प्रत्येक पंक्ति का हिंदी अनुवाद (line-by-line translation)"*। छात्र सोचते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें किसी पद्यांश के **शाब्दिक अर्थ**, **प्रसंग**,',
                  options: ['आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें किसी पद्यांश के **शाब्दिक अर्थ**, **प्रसंग**,', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं'],
                  hint: 'यदि **प्रतीक/अलंकार पहचान** में अटके → c12_hin_ar_cbse_08_006, 08_007 दोहराएँ; यदि **केंद्रीय भाव**.',
                  misconception: '**सबसे घातक भ्रम:** *"आशय-स्पष्टीकरण = प्रत्येक पंक्ति का हिंदी अनुवाद (line-by-line translation)"*। छात्र सोचते हैं कि शब्दार्थ लिख देना.' }
          ],
            remediations: { 'line-by-line-translation': { steps: ['**पुनः पढ़ें:** c12_hin_ar_cbse_08_002 (पद्यांश-वार भावार्थ) और c12_hin_ar_cbse_08_004 (केंद्रीय भाव) — वहाँ से **एक.', '**तुलना करें:** अपने उत्तर को NCERT/मार्गदर्शिका के **आदर्श उत्तर** से मिलाएँ — कहाँ चूके?', '(प्रायः **काव्य-युक्ति का भाव-योगदान** छूटता है)। 3.', '**अभ्यास:** प्रतिदिन **एक अपरिचित रुबाई/दोहा** लें और 7 मिनट में आशय लिखें; फिर शिक्षक/सहपाठी से **फीडबैक** लें। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) वह संरचित प्रक्रिया है.',
          hint: 'यदि PEEL में Explanation लिखने में अटकें: c12_hin_ar_cbse_08_007 (प्रतीक और बिंब) दोहराएं.',
          misconception: 'छात्र समझते हैं कि \'उत्तर लेखन कौशल\' का अर्थ \'अच्छी हिंदी लिखना\' या \'कविता रटना\' है। वास्तव में यह **परीक्षक की अपेक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) वह संरचित प्रक्रिया है जिसमें छात्र',
                  options: ['परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) वह संरचित प्रक्रिया है जिसमें छात्र', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं'],
                  hint: 'यदि PEEL में Explanation लिखने में अटकें: c12_hin_ar_cbse_08_007 (प्रतीक और बिंब) दोहराएं.',
                  misconception: 'छात्र समझते हैं कि \'उत्तर लेखन कौशल\' का अर्थ \'अच्छी हिंदी लिखना\' या \'कविता रटना\' है। वास्तव में यह **परीक्षक की अपेक्षा को डिकोड करने की.' }
          ],
            remediations: { '5': { steps: ['चरण 1: छात्र से कहें — "पिछले बोर्ड पेपर का कोई 5-अंक का प्रश्न उठाओ और अपना उत्तर लिखो। फिर CBSE मार्किंग स्कीम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_015', difficulty: 'standard',
          question: '\'वाचन-पाठ और चर्चा-बिंदु\' काव्य-अध्ययन की वह संपूर्ण प्रक्रिया है जिसमें.',
          hint: 'यदि रुक्न पर ताल न बैठे → `c12_hin_ar_cbse_08_005` के \'रुक्न अभ्यास\' खंड पर लौटें; यदि.',
          misconception: '**विशिष्ट भ्रांति:** *"वाचन-पाठ का अर्थ है कविता को \'अच्छी तरह पढ़ना\' (fluency), और चर्चा-बिंदु का अर्थ है \'कठिन शब्दों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-पाठ और चर्चा-बिंदु\' काव्य-अध्ययन की वह संपूर्ण प्रक्रिया है जिसमें रुबाइयों को सही',
                  options: ['\'वाचन-पाठ और चर्चा-बिंदु\' काव्य-अध्ययन की वह संपूर्ण प्रक्रिया है जिसमें रुबाइयों को सही', 'रुबाई फ़ारसी साहित्य की एक छंद शैली है जिसमें चार पंक्तियाँ (चतुष्पदी) होती हैं, जिसका', 'पद्यांश-वार भावार्थ का अर्थ है प्रत्येक रुबाई (चार पंक्तियों का छंद) के शब्दार्थ,', 'रुबाई (Rubai) फारसी मूल का एक छंद-प्रकार है जिसमें **चार पंक्तियाँ (चतुष्पदी)** होती हैं'],
                  hint: 'यदि रुक्न पर ताल न बैठे → `c12_hin_ar_cbse_08_005` के \'रुक्न अभ्यास\' खंड पर लौटें; यदि प्रतीक अर्थ.',
                  misconception: '**विशिष्ट भ्रांति:** *"वाचन-पाठ का अर्थ है कविता को \'अच्छी तरह पढ़ना\' (fluency), और चर्चा-बिंदु का अर्थ है \'कठिन शब्दों के अर्थ पूछना\' या.' }
          ],
            remediations: { 'fluency': { steps: ['**छंद पकड़ें:** नोड `c12_hin_ar_cbse_08_005` (छंद और लय-विधान) पर लौटें। एक रुबाई लें, प्रत्येक पंक्ति को `मफऊलुन.', '**प्रतीक पुनः देखें:** नोड `c12_hin_ar_cbse_08_007` (प्रतीक और बिंब) से `दीया`, `हवा`, `रात`, `सहर` के **बहु-स्तरीय.', '**वाचन रिकॉर्ड करें:** मोबाइल पर अपना वाचन रिकॉर्ड करें, फिर किसी शिक्षक/सहपाठी के वाचन से तुलना करें — **बलाघात.', '**चर्चा-बिंदु पुनर्लेखन:** अपने पुराने चर्चा-बिंदु लें, प्रत्येक को **\'क्यों?\'** से जांचें — यदि उत्तर केवल भावार्थ दे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
