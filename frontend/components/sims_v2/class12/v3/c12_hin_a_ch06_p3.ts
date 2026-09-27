import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch06_p3: SimDef = {
    id: 'v3_c12_hin_a_ch06_p3',
    title: 'तुलसीदास · Part 3/3',
    subtitle: 'A Muslim poet heard one verse — and walked to Braj',
    classLevel: 12, subject: 'hin_a', topic: 'तुलसीदास · Part 3/3',
    chapters: ['c12_hin_a_ch06'],
    nodeIds: ['c12_hin_a_cbse_06_013', 'c12_hin_a_cbse_06_014', 'c12_hin_a_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Bhakti-tradition scholar', intro: 'He was born into one faith and sang himself into another\'s heart — the Bhakti movement\'s boldest proof.', goal: 'Situate Raskhan in syncretic Bhakti and distinguish virah from vatsalya across the chapter\'s texts.' },
    discovery: {
        question: 'A 16th-century Muslim leaves court life for Vrindavan and writes Krishna-bhakti in Braj Bhasha. Why does Raskhan matter beyond his poems?',
        options: ['He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper', 'He converted religions', 'His poetry is prettier than Surdas\'s', 'Courts were boring'],
        answer: 'He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper',
        hook: 'One chapter holds two flavours of prem: Radha\'s virah — love through separation — and Yashoda\'s vatsalya — a mother\'s tenderness. Reading both as just \'love\' flattens Bhakti\'s emotional precision; each is a different road to the divine.',
    },
    teaching: [
        { title: 'तुलसीदास — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कविता के शब्दों, वाक्यों और छंदों के शाब्दिक अर्थ से आगे बढ़कर कवि के भाव, संदेश, उद्देश्य और गहरे साहित्यिक अर्थ को समझाया और विश्लेषण किया जाता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Braj through an outsider who became its own: trace Raskhan\'s turn from worldly life to Krishna, then weigh longing against maternal love as two bhakti grammars.',
        labels: ['तुलसीदास — आशय-स्पष्टीकरण और', 'तुलसीदास — परीक्षा-उत्तर लेखन', 'तुलसीदास — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A student society is profiling a beloved classical-music teacher who converted faiths midlife and then devoted himself to Krishna-bhakti poetry. A committee member wants his early Persian-Arabic training cut from the bio: \'it muddies the devotional image.\'',
            decisions: [{ prompt: 'How does the structure of the Raskhan sketch answer that edit?', options: [
                { text: 'Keep it exactly where the sketch keeps it — the biography deliberately establishes his Islamic scholarly background before the Gita Govinda turning point, so the devotion reads as a boundary crossed, not a brand polished; cutting the \'before\' guts the \'after\'.', outcome: 'The chapter shows those details are thematic scaffolding, not trivia: the juxtaposition is what proves divine love transcends religious identity — remove the contrast and Raskhan becomes a generic saint.' },
                { text: 'Cut it — the committee is right that a devotional profile should foreground only the devotional life.', outcome: 'That inverts the sketch\'s design: the earlier identity is what makes the transformation legible as transformation; without it, there\'s no crossing, only a career.', reveals: 'background-muddies-message' },
                { text: 'Keep the training but move it to a footnote so it doesn\'t interrupt the devotional arc.', outcome: 'Placement is the argument — the sketch sequences background before the turning point so readers feel the leap; demoting it to a footnote keeps the fact but kills the contrast that gives it meaning.', reveals: 'order-doesnt-matter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'You can now read Bhakti as lived synthesis — and separate virah from vatsalya like the tradition itself does.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कविता के शब्दों, वाक्यों और छंदों के.',
          hint: 'यदि छात्र रूपक की पहचान तो कर लेता है लेकिन उसके भावार्थ को नहीं बता पाता, तो उसे.',
          misconception: 'छात्र अक्सर आशय-स्पष्टीकरण को केवल शब्दार्थ या भावार्थ स्पष्टीकरण समझ लेते हैं और कविता के साहित्यिक उपकरणों (अलंकार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कविता के शब्दों, वाक्यों और छंदों के शाब्दिक अर्थ',
                  options: ['आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कविता के शब्दों, वाक्यों और छंदों के शाब्दिक अर्थ', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है'],
                  hint: 'यदि छात्र रूपक की पहचान तो कर लेता है लेकिन उसके भावार्थ को नहीं बता पाता, तो उसे.',
                  misconception: 'छात्र अक्सर आशय-स्पष्टीकरण को केवल शब्दार्थ या भावार्थ स्पष्टीकरण समझ लेते हैं और कविता के साहित्यिक उपकरणों (अलंकार, प्रतीक, छंद) के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि किसी रूपक या प्रतीक की पहचान करने के बाद अगला कदम हमेशा यह पूछना है: "इसका क्या मतलब है?', 'यह कवि के भाव या संदेश से कैसे जुड़ा है?" फिर एक उदाहरण दें: "कमल" का अर्थ केवल सफेद फूल नहीं है—यह पानी में रहने के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल वह प्रणालीगत प्रक्रिया है जिसमें प्रश्न के 요구를 정확히.',
          hint: 'यदि छात्र PEEL में \'Link\' जोड़ने में कठिनाई महसूस कर रहा है, तो उसे केंद्रीय भाव और विषय.',
          misconception: 'छात्र अक्सर मानते हैं कि परीक्षा-उत्तर में "सत्रहवीं शताब्दी के कवि तुलसीदास ने कहा..." जैसे पृष्ठभूमि विवरण जोड़ने से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल वह प्रणालीगत प्रक्रिया है जिसमें प्रश्न के 요구를 정확히 समझकर, पाठ से',
                  options: ['परीक्षा-उत्तर लेखन कौशल वह प्रणालीगत प्रक्रिया है जिसमें प्रश्न के 요구를 정확히 समझकर, पाठ से', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है'],
                  hint: 'यदि छात्र PEEL में \'Link\' जोड़ने में कठिनाई महसूस कर रहा है, तो उसे केंद्रीय भाव और विषय (नोड 004).',
                  misconception: 'छात्र अक्सर मानते हैं कि परीक्षा-उत्तर में "सत्रहवीं शताब्दी के कवि तुलसीदास ने कहा..." जैसे पृष्ठभूमि विवरण जोड़ने से उत्तर मजबूत हो जाता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर (जैसे "तुलसीदास एक महान कवि थे। उन्होंने वैराग्य के बारे में लिखा।") कैसे PEEL संरचना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_015', difficulty: 'standard',
          question: 'वाचन-पाठ वह प्रक्रिया है जिसमें छात्र कविता या गद्यांश को सही उच्चारण, लय.',
          hint: 'यदि छात्र वाचन में लय-विधान को पहचानने में फंसे हुए हैं, तो उन्हें कक्षा 11 के किसी भी.',
          misconception: 'छात्र अक्सर मानते हैं कि वाचन-पाठ का अर्थ केवल शब्दों को सही से बोलना है, और चर्चा-बिंदुओं को वे केवल शब्दार्थी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ वह प्रक्रिया है जिसमें छात्र कविता या गद्यांश को सही उच्चारण, लय, विराम और',
                  options: ['वाचन-पाठ वह प्रक्रिया है जिसमें छात्र कविता या गद्यांश को सही उच्चारण, लय, विराम और', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है'],
                  hint: 'यदि छात्र वाचन में लय-विधान को पहचानने में फंसे हुए हैं, तो उन्हें कक्षा 11 के किसी भी पाठ के.',
                  misconception: 'छात्र अक्सर मानते हैं कि वाचन-पाठ का अर्थ केवल शब्दों को सही से बोलना है, और चर्चा-बिंदुओं को वे केवल शब्दार्थी प्रश्नों के उत्तर मानते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को أولاً एक पद्यांश धीरे-धीरे सुनने के लिए कहिए (आप पढ़कर सुनाइए या ऑडियो चलाइए), फिर उससे पूछिए: "इसमें कौन-से.', 'कहाँ आपकी आवाज़ naturale रूप से रुकती है?" इससे लय-विधान का अनुभव होगा। फिर, उन शब्दों पर ध्यान केंद्रित करते हुए.', 'क्या यह शांत है, उग्र है, या आशावादी?" इससे वे भाव को अनुभव करेंगे, न कि केवल अर्थ ढूँढेंगे। इस क्रम (ध्वनि → भाव →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
