import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch09_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch09_p3',
    title: 'छोटा मेरा खेत, बगुलों के पंख · Part 3/3',
    subtitle: 'She mapped a homeland that no longer existed',
    classLevel: 12, subject: 'hin_ar', topic: 'छोटा मेरा खेत, बगुलों के पंख · Part 3/3',
    chapters: ['c12_hin_ar_ch09'],
    nodeIds: ['c12_hin_ar_cbse_09_013', 'c12_hin_ar_cbse_09_014', 'c12_hin_ar_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Partition-poetry reader', intro: 'A woman who crossed a new border learned that memory needs maps — and paintings — to survive.', goal: 'Read Mekhala Thakur\'s Nakshe and Chitrakala through Partition displacement and modernist free verse.' },
    discovery: {
        question: 'A poet born in Lyallpur loses her homeland in 1947 — then writes two poems titled \'Map\' and \'Painting of Birds.\' What are the titles already saying?',
        options: ['Two modes of remembering — the map charts a territory that no longer exists; the painting freezes living things against erasure', 'She liked geography and art', 'Birds migrate like refugees — that\'s all', 'Titles are random'],
        answer: 'Two modes of remembering — the map charts a territory that no longer exists; the painting freezes living things against erasure',
        hook: 'Partition\'s shadow runs through her — she translated Hamsun\'s \'Hunger,\' and the refugee\'s starvation is spiritual: a hunger for the lost home. Free verse and everyday speech were her modernist break — \'new direction\' means new freedom to say loss plainly.',
    },
    teaching: [
        { title: 'छोटा मेरा खेत, बगुलों के पंख — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण किसी पद्यांश या गद्यांश के शब्दों के पीछे छिपे गहन अभिप्राय, प्रसंगानुकूल भाव, बिंब-प्रतीक की व्यंजना और कवि/लेखक की दृष्टि को तर्कसंगत ढंग से प्रकट करने की प्रक्रिया है — यह केवल.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read a refugee\'s double elegy: decode the titles as preservation strategies, weigh memory-mapping against image-freezing, and feel how plain speech carries unhealable loss.',
        labels: ['छोटा मेरा खेत, बगुलों'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A hackathon teammate wants to demo straight from the whiteboard sketch — \'the blueprint IS the product, let\'s just present the plan.\' You think the sketch needs to become something people can actually walk into.',
            decisions: [{ prompt: 'How does Jayashankar Prasad\'s \'नक्शे मेरे घर\' frame this?', options: [
                { text: 'The map is the draft, not the house — the poem moves from courtyard corner to bricks laid with imagination to walls that finally bear weight; a blueprint only proves itself when someone can live inside what it drew.', outcome: 'The poem\'s extended metaphor makes each stanza a construction stage — sketching is a real stage, but the poem\'s whole point is that plans must materialise into habitable form.' },
                { text: 'He\'s right — a clear plan is the creative act; execution is just mechanical labour.', outcome: 'The poem gives the labour stanzas of their own — the chains of imagination, the weight-bearing — treating construction as where creation happens, not as clerical follow-up to it.', reveals: 'plan-is-the-product' },
                { text: 'Skip the blueprint stage entirely — real builders improvise.', outcome: 'The poem honours the map as a provisional, evolving draft — the error is worshipping it, not drawing it; deleting the plan loses the poem\'s first structural move.', reveals: 'drafts-are-disposable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'You can now read Partition poetry as cartography of a vanished home — every title a survival plan for memory.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण किसी पद्यांश या गद्यांश के शब्दों के पीछे छिपे गहन अभिप्राय.',
          hint: 'अगर बिंब/प्रतीक में उलझे हो तो c12_hin_ar_cbse_09_006 (साहित्यिक युक्तियाँ) का \'बिंब बनाम.',
          misconception: 'छात्र समझते हैं कि आशय-स्पष्टीकरण में \'कठिन शब्दों के अर्थ\' लिखने से अंक मिलते हैं — इसलिए वे \'पदावली\' रटते हैं और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण किसी पद्यांश या गद्यांश के शब्दों के पीछे छिपे गहन अभिप्राय, प्रसंगानुकूल',
                  options: ['आशय-स्पष्टीकरण किसी पद्यांश या गद्यांश के शब्दों के पीछे छिपे गहन अभिप्राय, प्रसंगानुकूल', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,'],
                  hint: 'अगर बिंब/प्रतीक में उलझे हो तो c12_hin_ar_cbse_09_006 (साहित्यिक युक्तियाँ) का \'बिंब बनाम प्रतीक\'.',
                  misconception: 'छात्र समझते हैं कि आशय-स्पष्टीकरण में \'कठिन शब्दों के अर्थ\' लिखने से अंक मिलते हैं — इसलिए वे \'पदावली\' रटते हैं और परीक्षा में वही उगल देते.' }
          ],
            remediations: { 'cbse-2023-24-0': { steps: ['चरण 1: छात्र को c12_hin_ar_cbse_09_002 (पद्यांश-वार भावार्थ) और c12_hin_ar_cbse_09_006 (साहित्यिक युक्तियाँ) दोबारा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है: **पाठ्य-साक्ष्य (textual evidence) के साथ.',
          hint: 'यदि फँस जाएँ तो **c12_hin_ar_cbse_09_006 (साहित्यिक युक्तियाँ)** और.',
          misconception: 'विद्यार्थी समझते हैं कि **"अच्छा उत्तर = अधिक शब्द + सुंदर भाषा"** — इसलिए वे 3 अंक के प्रश्न में 200 शब्द लिख देते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है: **पाठ्य-साक्ष्य (textual evidence) के साथ तर्कसंगत,',
                  options: ['परीक्षा-उत्तर लेखन कौशल का अर्थ है: **पाठ्य-साक्ष्य (textual evidence) के साथ तर्कसंगत,', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,'],
                  hint: 'यदि फँस जाएँ तो **c12_hin_ar_cbse_09_006 (साहित्यिक युक्तियाँ)** और **c12_hin_ar_cbse_09_013.',
                  misconception: 'विद्यार्थी समझते हैं कि **"अच्छा उत्तर = अधिक शब्द + सुंदर भाषा"** — इसलिए वे 3 अंक के प्रश्न में 200 शब्द लिख देते हैं पर **Point नहीं.' }
          ],
            remediations: { '3-200-point': { steps: ['1) **निदान:** विद्यार्थी से 3 अंक का एक प्रश्न करवाओ और उसका उत्तर **PEEL रंग-कोड** (Point=लाल, Evidence=नीला.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_09_015', difficulty: 'standard',
          question: 'वाचन-पाठ और चर्चा-बिंदु (Reading and Discussion Points) refers to the.',
          hint: 'अगर अटके तो c12_hin_ar_cbse_09_002 (भावार्थ) और c12_hin_ar_cbse_09_006 (साहित्यिक.',
          misconception: 'छात्र अक्सर समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है कविता का सारांश (summary) बताना या \'अच्छी लगी/बुरी लगी\' कहना। वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ और चर्चा-बिंदु (Reading and Discussion Points) refers to the structured',
                  options: ['वाचन-पाठ और चर्चा-बिंदु (Reading and Discussion Points) refers to the structured', 'This node introduces the poet **Kedarnath Singh** (केदारनाथ सिंह), his literary lineage', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का स्वतंत्र रूप से', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (stanzas, line breaks,'],
                  hint: 'अगर अटके तो c12_hin_ar_cbse_09_002 (भावार्थ) और c12_hin_ar_cbse_09_006 (साहित्यिक युक्तियाँ) दोबारा.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है कविता का सारांश (summary) बताना या \'अच्छी लगी/बुरी लगी\' कहना। वास्तव में, चर्चा का अर्थ.' }
          ],
            remediations: { 'summary': { steps: ['चरण 1: छात्र से कहें — "कविता की कोई एक पंक्ति चुनो जो तुम्हें छुई। अब बताओ: उसमें कौन-सा शब्द सबसे ज़्यादा काम कर रहा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
