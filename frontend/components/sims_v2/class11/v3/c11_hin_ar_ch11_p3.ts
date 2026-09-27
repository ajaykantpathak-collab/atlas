import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch11_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch11_p3',
    title: 'पाठ 11 · Part 3/3',
    subtitle: 'Walk through a remembered home that slowly relocates inside the speaker.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 11 · Part 3/3',
    chapters: ['c11_hin_ar_ch11'],
    nodeIds: ['c11_hin_ar_cbse_11_013', 'c11_hin_ar_cbse_11_014', 'c11_hin_ar_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an emigrant reconstructing a childhood home from memory', intro: 'A poet of the masses looks back at a mud-walled house — and finds the building was never the point.', goal: 'Analyse the poem\'s refrain-anchored structure and its movement from place to person to identity.' },
    discovery: {
        question: 'Bachchan\'s \'घर की याद\' keeps returning to the same refrain — is the repetition just decoration?',
        options: ['No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker', 'Yes — it\'s a leftover from oral tradition', 'Yes — poets repeat lines to fill stanzas', 'No — the refrain changes meaning each time, so it\'s three different lines'],
        answer: 'No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker',
        hook: 'The poem moves house → people → self: first walls and courtyards, then a father\'s voice and a mother\'s cooking, then the realization the home now lives inside the speaker.',
    },
    teaching: [
        { title: 'पाठ 11 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के सतही अर्थ से आगे जाकर उसकी अंतर्निहित मान्यताओं, तार्किक संरचना, लेखकीय उद्देश्य और सामाजिक-सांस्कृतिक निहितार्थों की जांच-पड़ताल करने की बौद्धिक प्रक्रिया.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_11_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split the poem into its three phases — physical house, human presence, internal landscape — and test what the circular ending gains.',
        labels: ['पाठ 11 — आलोचनात्मक', 'पाठ 11 — लेखन', 'पाठ 11 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_11_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 3/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह विधि है जिसमें छात्र किसी दिए गए गद्य/पद्य अंश से साक्ष्य.', answer: '11 -', options: ['11 -', '11 - -'] },
            { id: 's2', label: '11 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक **सहयोगी अधिगम प्रक्रिया (collaborative learning process)** है.', answer: '11 - -', options: ['11 - -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a poetry recital rehearsal, a classmate prepares Bachchan\'s \'Ghar ki Yaad\' and announces: \'It\'s a descriptive poem — the poet lists the walls, rooms and courtyard of his old house. I\'ll read it flat, like an estate agent\'s inventory.\'',
            decisions: [{ prompt: 'What should the performance convey instead?', options: [
                { text: 'Rebuild the reading around the arc: the poem moves from physical description to emotional memory — the father\'s voice, the mother\'s silence, the joint family — to philosophical reflection; the \'events\' are mental acts: remembering, comparing, realising. The refrain isn\'t decoration but the anchor pulling wandering memory back to the core truth: home is not a building but a living presence within the speaker.', outcome: 'The recital shifts register: the house outside becomes the house inside — a consciousness-driven journey, not an inventory.' },
                { text: 'Keep the flat reading — it IS a list of rooms and walls; honesty over drama.', outcome: 'Description is the entry, not the destination: the poem\'s structure carries the speaker from architecture to identity — flat reading strands it at the door.', reveals: 'poem-is-house-inventory' },
                { text: 'Add dramatic events instead — act out family scenes so the audience \'sees\' a plot.', outcome: 'Staging external scenes invents what the poem deliberately does internally: the structure is a memory-journey anchored by refrain, not a family drama.', reveals: 'invent-events-for-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'The house that \'stood silent\' in stanza one ends \'living in me\' — the same line, transformed by twelve stanzas of remembering.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के सतही अर्थ से आगे जाकर उसकी.',
          hint: 'यदि अटके तो \'बिंब और रूपक\' (c11_hin_ar_cbse_11_008) तथा \'विरोधाभास और प्रतीक\'.',
          misconception: 'छात्र प्रायः मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है पाठ में \'कमियाँ निकालना\' या \'लेखक से असहमत होना\'। उदाहरण: पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के सतही अर्थ से आगे जाकर उसकी अंतर्निहित',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के सतही अर्थ से आगे जाकर उसकी अंतर्निहित', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि'],
                  hint: 'यदि अटके तो \'बिंब और रूपक\' (c11_hin_ar_cbse_11_008) तथा \'विरोधाभास और प्रतीक\'.',
                  misconception: 'छात्र प्रायः मानते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ है पाठ में \'कमियाँ निकालना\' या \'लेखक से असहमत होना\'। उदाहरण: पाठ 11 में यदि नायक चुप.' }
          ],
            remediations: { '11': { steps: ['छात्र से कहें: "पाठ का कोई एक वाक्य चुनो जो तुम्हें अटपटा लगे। उस वाक्य के शब्द-दर-शब्द विकल्प सोचो — लेखक ने यही शब्द.', 'फिर कहें: "इस वाक्य को हटा दो — पाठ का अर्थ कैसे बदलता है?" (यह \'संरचनात्मक अनिवार्यता\' दर्शाता है)। 3.', 'अंत में: "अब इस वाक्य को पाठ के आरंभिक/मध्य/अंतिम भाग से जोड़ो — कौन-सा पैटर्न उभरता है?" (यह \'समग्र व्याख्या\' की ओर ले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह विधि है जिसमें छात्र किसी दिए गए गद्य/पद्य अंश से.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_11_013 (आलोचनात्मक चिंतन)** के \'विश्लेषण चरण\' दोहराएँ — वही.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'पाठ-आधारित उत्तर\' = \'पाठ का सारांश (summary) + कुछ उद्धरण\'**। वे **विश्लेषण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह विधि है जिसमें छात्र किसी दिए गए गद्य/पद्य अंश से साक्ष्य',
                  options: ['पाठ-आधारित लेखन कौशल वह विधि है जिसमें छात्र किसी दिए गए गद्य/पद्य अंश से साक्ष्य', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_11_013 (आलोचनात्मक चिंतन)** के \'विश्लेषण चरण\' दोहराएँ — वही चिंतन.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'पाठ-आधारित उत्तर\' = \'पाठ का सारांश (summary) + कुछ उद्धरण\'**। वे **विश्लेषण (analysis)** को **वर्णन.' }
          ],
            remediations: { 'summary-analysis-description': { steps: ['**मॉडलिंग:** शिक्षक एक ही प्रश्न के दो उत्तर दिखाए — एक **वर्णनात्मक (C-ग्रेड)**, एक **विश्लेषणात्मक (A-ग्रेड)** — और.', '**संयुक्त अभ्यास:** कक्षा में छोटे अंश (3-4 पंक्ति) दें; छात्र **केवल एक बिंदु** पर PEEL लिखें; सहपाठी **रंगीन पेन से.', '**\'क्यों?\' खेल:** छात्र के हर वाक्य पर शिक्षक पूछे *"क्यों?"* या *"पाठ में कहाँ?"* — जब तक छात्र स्वयं **भाषिक साक्ष्य.', '**स्व-मूल्यांकन शीट:** प्रत्येक अभ्यास उत्तर के बाद छात्र भरे: *"मेरा प्वाइंट क्या था?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक **सहयोगी अधिगम प्रक्रिया (collaborative learning.',
          hint: 'यदि फँसें तो **c11_hin_ar_cbse_11_013 (आलोचनात्मक चिंतन)** के **\'तर्क-मानचित्र (argument.',
          misconception: '**"चर्चा में ज़्यादा बोलना = अच्छी भागीदारी"** — कक्षा 11 के 70% छात्र मानते हैं कि चर्चा-बिंदु में **अधिक समय तक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक **सहयोगी अधिगम प्रक्रिया (collaborative learning process)** है',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक **सहयोगी अधिगम प्रक्रिया (collaborative learning process)** है', '**पृष्ठभूमि** किसी रचना के सृजन के पीछे कार्यरत ऐतिहासिक, सामाजिक, सांस्कृतिक एवं', '**कथानक (Plot)** is the causal and logical sequence of events that constitute the story\'s', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में वर्णित वह समग्र पृष्ठभूमि'],
                  hint: 'यदि फँसें तो **c11_hin_ar_cbse_11_013 (आलोचनात्मक चिंतन)** के **\'तर्क-मानचित्र (argument.',
                  misconception: '**"चर्चा में ज़्यादा बोलना = अच्छी भागीदारी"** — कक्षा 11 के 70% छात्र मानते हैं कि चर्चा-बिंदु में **अधिक समय तक बोलना**, **तेज़ आवाज़**.' }
          ],
            remediations: { '11-70': { steps: ['**चरण 1:** छात्र को **\'मौन प्रोटोकॉल (silence protocol)\'** दें — अगली चर्चा में **पहले 5 मिनट केवल सुनना**, **नोट.', 'क्या मैं सही समझा?")। **चरण 3:** **\'साक्ष्य-पहले कार्ड (evidence-first card)\'** दें — बोलने के लिए खड़े होने से पहले.', 'मैंने कब मत बदला?" — यह **मेटाकॉग्निशन (metacognition)** विकसित करता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
