import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch12_p3: SimDef = {
    id: 'v3_c12_hin_a_ch12_p3',
    title: 'संवदयिा · Part 3/3',
    subtitle: 'A union leader wrote the village in the village\'s own voice',
    classLevel: 12, subject: 'hin_a', topic: 'संवदयिा · Part 3/3',
    chapters: ['c12_hin_a_ch12'],
    nodeIds: ['c12_hin_a_cbse_12_013', 'c12_hin_a_cbse_12_014', 'c12_hin_a_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Socialist-fiction reader', intro: 'He fought the British, organised workers, then sat down to write the village as the village sounds.', goal: 'Read Renu\'s/Phanishwar Nath\'s story through socialist humanism — colloquial voice as the carrier of rural truth.' },
    discovery: {
        question: 'A Quit India activist and trade unionist writes a village story in the village\'s own tongue — why does the colloquial language matter as much as the plot?',
        options: ['Voice is the politics — a socialist eye sees suffering with human warmth, and only the village\'s own speech can carry that truth without the textbook\'s distance', 'Simple language for simple readers', 'Dialect is easier to write', 'Just realism for colour'],
        answer: 'Voice is the politics — a socialist eye sees suffering with human warmth, and only the village\'s own speech can carry that truth without the textbook\'s distance',
        hook: '\'Simple\' isn\'t \'artless\' — colloquial, descriptive, expressive prose immerses you in village life so hardship and tenderness land as lived, not reported. A socialist lens sees both the poverty AND the feeling; the story outlives its decade because the rural-urban divide still argues today.',
    },
    teaching: [
        { title: 'संवदयिा — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन पाठ के तत्वों (विषय, पात्र, भाषा, संरचना) को तोड़कर उनके बीच के संबंधों की जाँच करना और उनके अर्थ एवं प्रभाव का मूल्यांकन करना है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_12_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the village through its own speech: weigh a freedom fighter\'s lens on rural suffering, test why colloquiality is craft, and ask what a 1950s story still teaches a 2025 reader.',
        labels: ['संवदयिा — आलोचनात्मक चिंतन', 'संवदयिा — लेखन कौशल', 'संवदयिा — वाचन-श्रवण: चर्चा-बिंदु'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_12_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your family wants to shift the ageing grandmother — who has nursed half the village\'s children — into your city flat \'for her own good.\' She refuses flatly, and everyone calls it stubbornness.',
            decisions: [{ prompt: 'How does the climax of \'रेणु\' read her refusal?', options: [
                { text: 'As the story\'s peak of belonging — the nanny refuses the narrator\'s city offer with \'you are my mother, mother of the whole village\' echoing around her; she isn\'t refusing care, she\'s rooted where her care made her everyone\'s.', outcome: 'The story builds to that confrontation precisely so her staying reads as identity, not obstinacy — the village is her life\'s work, and removing her to \'safety\' removes her from herself.' },
                { text: 'Insist on the move — the city\'s facilities objectively outweigh a village attachment.', outcome: 'That\'s the narrator\'s own plan at the climax, and the story gives it no victory: her refusal stands because the measure of her good isn\'t amenities but the web of people who call her mother.', reveals: 'facilities-outweigh-roots' },
                { text: 'Let her stay but stop calling — if she chooses the village, she\'s chosen isolation.', outcome: 'The story\'s flashbacks exist to show she\'s the least alone person in it — the refusal closes the city plan, not the relationship; withdrawing contact punishes her for rootedness.', reveals: 'staying-equals-isolation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_12_015', title: 'You made it',
          caseStudy: { intro: 'You can now read voice as worldview — where the choice of dialect is itself a statement about whose reality counts.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन पाठ के तत्वों (विषय, पात्र, भाषा, संरचना) को तोड़कर उनके बीच.',
          hint: 'यदि विश्लेषण में कठिनाई हो, तो पहले पात्र-चित्रण (c12_hin_a_cbse_12_004/005) या विषय.',
          misconception: 'छात्र अक्सर मानते हैं कि आलोचनात्मक चिंतन का अर्थ है पाठ की निंदा करना या उसके दोष निकालना—जैसे कहना कि "लेखक का भाषा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन पाठ के तत्वों (विषय, पात्र, भाषा, संरचना) को तोड़कर उनके बीच के संबंधों',
                  options: ['आलोचनात्मक चिंतन पाठ के तत्वों (विषय, पात्र, भाषा, संरचना) को तोड़कर उनके बीच के संबंधों', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि विश्लेषण में कठिनाई हो, तो पहले पात्र-चित्रण (c12_hin_a_cbse_12_004/005) या विषय.',
                  misconception: 'छात्र अक्सर मानते हैं कि आलोचनात्मक चिंतन का अर्थ है पाठ की निंदा करना या उसके दोष निकालना—जैसे कहना कि "लेखक का भाषा उपयोग कमजोर है" या.' }
          ],
            remediations: { 'boring': { steps: ['छात्र से पूछिए कि वे अपने पसंदीदा फिल्म या गाने के बारे में क्या पसंद करते हैं—क्या यह सिर्फ इसलिए है क्योंकि यह.', 'फिर बताइए कि साहित्य में भी यही होता है: हम शब्दों, संरचना, चित्रों को नहीं इसलिए देखते हैं क्योंकि वे \'गलत\' हैं, बल्कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी दिए गए गद्य या पद्य पाठ पर आधारित.',
          hint: 'यदि छात्र उत्तर में प्रमाण देने या स्पष्टीकरण करने में फंस जाए, तो उसे.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में लंबा लिखना ही अधिक अंक लाता है, इसलिए वे अनावश्यक दोहराव या सामान्य कथानक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी दिए गए गद्य या पद्य पाठ पर आधारित प्रश्नों के उत्तर',
                  options: ['लेखन कौशल: पाठ-आधारित का अर्थ है किसी दिए गए गद्य या पद्य पाठ पर आधारित प्रश्नों के उत्तर', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि छात्र उत्तर में प्रमाण देने या स्पष्टीकरण करने में फंस जाए, तो उसे c12_hin_a_cbse_12_011 (पाठ.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में लंबा लिखना ही अधिक अंक लाता है, इसलिए वे अनावश्यक दोहराव या सामान्य कथानक का सारांश भर देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर (जैसे "नायक अच्छा था") कैसे PEEL में बदलता है — पहले बिंदु सुधारिए ("नायक का त्याग.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी विषय पर चर्चा करते समय attentively.',
          hint: 'यदि चर्चा में बोलते समय संरचना बनाने में कठिनाई हो, तो पहले कागज़ पर PEEL प्रारूप में.',
          misconception: 'छात्र अक्सर मानते हैं कि \'वाचन-श्रवण: चर्चा-बिंदु\' में केवल बोलने का कौशल महत्वपूर्ण है — वे सोचते हैं कि जितना अधिक और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी विषय पर चर्चा करते समय attentively सुनना',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी विषय पर चर्चा करते समय attentively सुनना', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि चर्चा में बोलते समय संरचना बनाने में कठिनाई हो, तो पहले कागज़ पर PEEL प्रारूप में नोट्स बनाइए.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'वाचन-श्रवण: चर्चा-बिंदु\' में केवल बोलने का कौशल महत्वपूर्ण है — वे सोचते हैं कि जितना अधिक और जितना ज़ोर से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस भ्रम में फंसे हैं, तो पहले उन्हें एक जोड़ी में बैठाइए और 2 मिनट का टाइमर लगाइए — एक व्यक्ति 60 सेकंड तक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
