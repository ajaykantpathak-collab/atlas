import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch09_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch09_p3',
    title: 'पाठ 9 · Part 3/3',
    subtitle: 'Hear a 15th-century weaver dismantle both temple and mosque in one couplet.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 9 · Part 3/3',
    chapters: ['c11_hin_ar_ch09'],
    nodeIds: ['c11_hin_ar_cbse_09_013', 'c11_hin_ar_cbse_09_014', 'c11_hin_ar_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a disciple watching the loom instead of the scripture', intro: 'A Muslim-weaver saint in Kashi, persecuted by priests of both religions — and his whole theology woven into cloth metaphors.', goal: 'Situate Kabir in the Nirguna Bhakti tradition and read his weaver identity as the engine of his imagery.' },
    discovery: {
        question: 'A student writes \'Kabir rejected all religion.\' Accurate?',
        options: ['No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality', 'Yes — he mocked both temple and mosque, so he rejected both faiths', 'Yes — a weaver couldn\'t be religious', 'No — he actually founded a new organised religion'],
        answer: 'No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality',
        hook: '\'Kabir was a weaver\' is not trivia — every metaphor in his verse is a loom: warp, weft, thread, dye, knot. His caste is his poetics.',
    },
    teaching: [
        { title: 'पाठ 9 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन विश्लेषण और व्याख्या की वह प्रक्रिया है जिसमें पाठक पाठ की सतही अर्थ-छवि से आगे जाकर उसकी अंतर्निहित मान्यताओं, तर्क-संरचना, साहित्यिक युक्तियों के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch Kabir teach disciples by silently weaving an odd pattern, then map why the lesson lands through action instead of explanation.',
        labels: ['पाठ 9 — आलोचनात्मक', 'पाठ 9 — लेखन', 'पाठ 9 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_09_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 3/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह दक्षता है जिसमें छात्र किसी साहित्यिक पाठ (गद्य/पद्य) के विशिष्ट.', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु refers to the integrated language skill of critically reading.', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is designing a Kabir exhibit. A teammate\'s panel reads: \'Kabir: 15th-century weaver from Kashi. Born c.1398, died 1518.\' He argues the weaver detail is just a biographical fact — \'the poetry is about God, not looms.\'',
            decisions: [{ prompt: 'Why is the weaver identity the key, not trivia?', options: [
                { text: 'Show the generative matrix: nearly every metaphor in Kabir — warp and weft, thread, dye, knot, unravelling — comes from the loom; \'untying the knot\' (granthi) is weaver\'s knowledge turned theology. Add the rest of the context: a low-caste julaha in Sadhukkadi speech challenging Brahmin and Qazi orthodoxy alike — the poetry\'s radicalism is inseparable from who spoke and in whose language.', outcome: 'The panel is rewritten: context stops being a fact-file and becomes the engine — weaving isn\'t Kabir\'s day job, it\'s his entire metaphor bank.' },
                { text: 'Keep the panel — dates and profession are background; the spiritual message stands alone.', outcome: 'Stripping the weaver identity leaves the images unexplained: the loom metaphors become decoration instead of embodied argument.', reveals: 'weaver-is-trivia' },
                { text: 'Reframe him as a social reformer first — the caste angle matters, the spiritual content is secondary.', outcome: 'That inverts without understanding: Kabir\'s social challenge works THROUGH spiritual metaphor — the poetry fuses the two, so splitting them flattens both.', reveals: 'kabir-is-only-reformer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'Neither Brahmin nor Qazi could claim him — the weaver\'s loom measured orthodoxy and found it hollow.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन विश्लेषण और व्याख्या की वह.',
          hint: 'यदि फँसें, तो **c11_hin_ar_cbse_09_006 (मुख्य विषय और संदेश)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि आलोचनात्मक चिंतन में **"छिपा हुआ अर्थ" (Hidden Meaning)** ढूँढ़ना होता है जो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन विश्लेषण और व्याख्या की वह प्रक्रिया है',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन विश्लेषण और व्याख्या की वह प्रक्रिया है', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि फँसें, तो **c11_hin_ar_cbse_09_006 (मुख्य विषय और संदेश)** और **c11_hin_ar_cbse_09_009.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि आलोचनात्मक चिंतन में **"छिपा हुआ अर्थ" (Hidden Meaning)** ढूँढ़ना होता है जो लेखक ने *जानबूझकर*.' }
          ],
            remediations: { 'hidden-meaning-fixed-entity': { steps: ['**चरण 1:** छात्र से कहें: "पाठ का कोई एक वाक्य चुनो जो तुम्हें \'अजीब\' या \'महत्वपूर्ण\' लगा — *नहीं* वह जो शिक्षक ने.', 'कौन-सा विषय कमजोर पड़ता है?" (यह **कार्यात्मक विश्लेषण / Functional Analysis** सिखाता है)। **चरण 3:** दो सहपाठियों की.', 'किसकी व्याख्या पाठ के *अन्य* भागों से टकराती नहीं?" (यह **साक्ष्य-भार (Evidence Weight)** और **संगतता (Coherence)**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह दक्षता है जिसमें छात्र किसी साहित्यिक पाठ (गद्य/पद्य).',
          hint: 'यदि फंसें तो **c11_hin_ar_cbse_09_013 (आलोचनात्मक चिंतन)** के \'विश्लेषण बनाम वर्णन\'.',
          misconception: '**विशिष्ट भ्रांति:** *"उत्तर में पाठ की अधिकतम पंक्तियाँ उद्धृत (quote) करने से अंक बढ़ते हैं।"* **गलत तर्क की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह दक्षता है जिसमें छात्र किसी साहित्यिक पाठ (गद्य/पद्य) के विशिष्ट',
                  options: ['पाठ-आधारित लेखन कौशल वह दक्षता है जिसमें छात्र किसी साहित्यिक पाठ (गद्य/पद्य) के विशिष्ट', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि फंसें तो **c11_hin_ar_cbse_09_013 (आलोचनात्मक चिंतन)** के \'विश्लेषण बनाम वर्णन\' अभ्यास को.',
                  misconception: '**विशिष्ट भ्रांति:** *"उत्तर में पाठ की अधिकतम पंक्तियाँ उद्धृत (quote) करने से अंक बढ़ते हैं।"* **गलत तर्क की प्रक्रिया:** छात्र \'साक्ष्य.' }
          ],
            remediations: { 'quote-evidence': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**\'हाइलाइटर अभ्यास\' करवाएं:** छात्र को पिछले वर्ष के प्रश्नपत्र का कोई 5 अंकों का उत्तर दें। कहें: **तीन रंगों से.', '**\'एक वाक्य साक्ष्य\' नियम लागू करें:** अगले 3 अभ्यासों के लिए नियम बनाएं: **"Evidence अधिकतम 1 वाक्य या 1 विशिष्ट.', '**\'क्यों/कैसे\' जांच (Why/How Audit):** छात्र द्वारा लिखे हर Evidence के बाद उससे पूछें: **"यह पंक्ति तुम्हारे Point को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु refers to the integrated language skill of critically.',
          hint: 'If stuck, review **node 013 (आलोचनात्मक चिंतन)** — specifically the.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "चर्चा-बिंदु" = "पाठ का सारांश + मेरी राय"। वे लिखते हैं: "पाठ 9 में नायक अच्छा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु refers to the integrated language skill of critically reading a',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु refers to the integrated language skill of critically reading a', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'If stuck, review **node 013 (आलोचनात्मक चिंतन)** — specifically the "दावा-साक्ष्य-व्याख्या".',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "चर्चा-बिंदु" = "पाठ का सारांश + मेरी राय"। वे लिखते हैं: "पाठ 9 में नायक अच्छा है, मुझे पसंद आया.' }
          ],
            remediations: { '9': { steps: ['**चरणबद्ध सुधार:** (1) छात्र से कहें: "अपना लिखा चर्चा-बिंदु पढ़ो। हर वाक्य के आगे पूछो: \'यह पाठ के किस वाक्य/शब्द से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
