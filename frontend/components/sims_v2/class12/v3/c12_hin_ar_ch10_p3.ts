import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch10_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch10_p3',
    title: 'भक्तनि · Part 3/3',
    subtitle: 'A poet wrote prose so a servant\'s life would count',
    classLevel: 12, subject: 'hin_ar', topic: 'भक्तनि · Part 3/3',
    chapters: ['c12_hin_ar_ch10'],
    nodeIds: ['c12_hin_ar_cbse_10_013', 'c12_hin_ar_cbse_10_014', 'c12_hin_ar_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi sketch-reader', intro: 'From a collection of remembered lives, one woman steps forward — and a child\'s eye becomes the sharpest lens on inequality.', goal: 'Read the sketch through Mahadevi Verma\'s reformist lens — caste, gender and the child\'s innocent gaze.' },
    discovery: {
        question: 'A servant-woman, married at five, widowed young, speaks in village dialect inside a professor\'s household. Why did a poet famous for Chhayavad lyrics choose to record her?',
        options: ['Reformer\'s testimony — Mahadevi Verma ran a girls\' school; the sketch documents caste-gender oppression through a child\'s eyes to demand change', 'She needed a memoir chapter', 'Servants make easy characters', 'Poetry didn\'t sell'],
        answer: 'Reformer\'s testimony — Mahadevi Verma ran a girls\' school; the sketch documents caste-gender oppression through a child\'s eyes to demand change',
        hook: 'Don\'t read it as just a sad servant story — the context stages a power binary (master-servant, caste, literacy) that the child\'s innocent gaze both reveals and unsettles. The Avadhi dialect she speaks is authenticity itself: identity recorded with respect, not corrected.',
    },
    teaching: [
        { title: 'भक्तनि — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन विश्लेषण और व्याख्या की वह प्रक्रिया है जिसमें छात्र पाठ्य-सामग्री को तथ्यों, साक्ष्यों, साहित्यिक युक्तियों और प्रसंगिक संदर्भों के आधार पर.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'See through the child-narrator\'s eyes: map the household\'s hierarchy before a word of plot, weigh dialect as dignity, and read a memory sketch as social evidence.',
        labels: ['भक्तनि — आलोचनात्मक चिंतन', 'भक्तनि — लेखन कौशल', 'भक्तनि — वाचन-श्रवण: चर्चा-बिंदु'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a features-writing course, you\'re profiling the woman who\'s run your hostel kitchen for 30 years. Your editor wants a \'heartwarming\' ending where she cries as the final batch of students leaves — \'that\'s the emotional payoff.\'',
            decisions: [{ prompt: 'What would Mohan Rakesh\'s \'भक्तिन\' tell the editor?', options: [
                { text: 'Cut the tears — the story ends with the narrator noting Bhaktin\'s unbothered self-sufficiency at his own departure, and that refusal of sentimental closure IS the portrait; a lifetime of abandonment made her dignity non-negotiable, and dependency would betray her.', outcome: 'The chapter\'s lesson: the open, unsentimental ending honours her autonomy — the lack of payoff is the resolution, because her strength was never wired to anyone\'s leaving.' },
                { text: 'Add the crying scene — readers need emotional closure, and her reserve is just a detail to warm up.', outcome: 'That\'s the exact misreading: her composure isn\'t a gap in the story, it\'s the story — turning self-reliance into breakdown writes a different, lesser person.', reveals: 'tears-equal-depth' },
                { text: 'Reorder the piece chronologically — childhood, marriage, abandonment, kitchen — so her arc reads cleanly.', outcome: 'The story deliberately opens on her cooking now and folds the past in as flashback; the mundane present framing the hard past is what makes her endurance land — flattening the order flattens her.', reveals: 'chronology-equals-clarity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'You can now read an autobiographical sketch as a reformer\'s document — where one remembered woman exposes a whole system\'s quiet cruelties.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन विश्लेषण और व्याख्या की वह.',
          hint: 'यदि फँस जाएँ तो **c12_hin_ar_cbse_10_008 (बिंब/रूपक)** और **c12_hin_ar_cbse_10_009.',
          misconception: '**सबसे घातक भ्रांति:** *"आलोचनात्मक चिंतन का अर्थ है पाठ में कमियाँ निकालना (criticize = fault-finding)।"*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन विश्लेषण और व्याख्या की वह प्रक्रिया है',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन विश्लेषण और व्याख्या की वह प्रक्रिया है', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि फँस जाएँ तो **c12_hin_ar_cbse_10_008 (बिंब/रूपक)** और **c12_hin_ar_cbse_10_009.',
                  misconception: '**सबसे घातक भ्रांति:** *"आलोचनात्मक चिंतन का अर्थ है पाठ में कमियाँ निकालना (criticize = fault-finding)।"* **वास्तविकता:** क्रिटिकल थिंकिंग.' }
          ],
            remediations: { 'criticize-fault-finding': { steps: ['**चरणबद्ध उपचार (Remediation Path):** 1.', '**पुनर्निदान (Re-diagnostic):** छात्र से कहें — *"भक्तनि पाठ का कोई एक दृश्य चुनो और बताओ: यहाँ लेखक ने \'दिखाया\' (show).', 'अंतर स्पष्ट करो।"* — यदि वह \'बताया\' के उदाहरण दे (जैसे "लेखक ने लिखा भक्तनि दुखी थी"), तो **Show vs Tell** की अवधारणा.', '**माइक्रो-व्यायाम:** पाठ के 3 छोटे अंश (2-3 वाक्य) दें — प्रत्येक में **एक साहित्यिक युक्ति (बिंब/प्रतीक/विरोधाभास).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है — किसी साहित्यिक पाठ (यहाँ \'भक्तनि\') के कथ्य.',
          hint: 'यदि प्रमाण (Evidence) चुनने में अटकें → c12_hin_ar_cbse_10_012 (बोध-प्रश्न) दोहराएँ; यदि.',
          misconception: '**भ्रांति:** "पाठ-आधारित लेखन का अर्थ है पाठ की कहानी अपने शब्दों में दोहरा देना (paraphrasing)।" **वास्तविकता:** बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि प्रमाण (Evidence) चुनने में अटकें → c12_hin_ar_cbse_10_012 (बोध-प्रश्न) दोहराएँ; यदि व्याख्या.',
                  misconception: '**भ्रांति:** "पाठ-आधारित लेखन का अर्थ है पाठ की कहानी अपने शब्दों में दोहरा देना (paraphrasing)।" **वास्तविकता:** बोर्ड परीक्षा (CBSE/ICSE).' }
          ],
            remediations: { 'paraphrasing-cbse-icse-cuet-evidence': { steps: ['**चरणबद्ध उपचार (Remediation Path):** 1.', '**तत्काल निदान:** छात्र से कहें — "प्रश्न पढ़ो, फिर बताओ: तुमसे *क्या* माँगा जा रहा है — कहानी सुनाना या राय देना?".', '**मॉडलिंग:** ऊपर दिए गए WORKED_EXAMPLE_3 की तरह एक कमज़ोर उत्तर लें, कक्षा में मिलकर उसे PEEL में बदलें — प्रत्येक चरण.', '**सूक्ष्म-अभ्यास (Micro-drill):** केवल **Evidence ढूँढना** — पाठ से 5 प्रश्न दें, प्रत्येक के लिए मात्र **एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक सहयोगी शैक्षणिक प्रक्रिया है जिसमें शिक्षक और.',
          hint: 'यदि चर्चा में भाग लेने में झिझक हो, तो **c12_hin_ar_cbse_10_012 (बोध-प्रश्न)** के.',
          misconception: 'छात्र अक्सर मानते हैं कि **\'चर्चा-बिंदु\' का अर्थ है \'पाठ से प्रश्न बनाकर उनके उत्तर रटना\'**। वे चर्चा को **एकतरफा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक सहयोगी शैक्षणिक प्रक्रिया है जिसमें शिक्षक और विद्यार्थी मिलकर',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक सहयोगी शैक्षणिक प्रक्रिया है जिसमें शिक्षक और विद्यार्थी मिलकर', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि चर्चा में भाग लेने में झिझक हो, तो **c12_hin_ar_cbse_10_012 (बोध-प्रश्न)** के.',
                  misconception: 'छात्र अक्सर मानते हैं कि **\'चर्चा-बिंदु\' का अर्थ है \'पाठ से प्रश्न बनाकर उनके उत्तर रटना\'**। वे चर्चा को **एकतरफा सूचना-हस्तांतरण** समझते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** विद्यार्थी से पूछें — "अगर तुम्हें इस पाठ का कोई एक दृश्य बदलना हो, तो कौन-सा और क्यों?" — यह **व्यक्तिगत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
