import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch14_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch14_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch14_p3',
    title: 'पाठ 14 · Part 3/3',
    subtitle: 'Read the poems of a woman the palace tried to silence — and the canon tried to forget.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 14 · Part 3/3',
    chapters: ['c11_hin_ar_ch14'],
    nodeIds: ['c11_hin_ar_cbse_14_013', 'c11_hin_ar_cbse_14_014', 'c11_hin_ar_cbse_14_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader holding a locked diary that got out anyway', intro: 'Imprisoned for writing, released on conditions, betrayed, escaped — her biography isn\'t background; it\'s the poems\' skeleton.', goal: 'Read biography as the structural logic of the poems and evaluate their unresolved moral ending.' },
    discovery: {
        question: 'A queen imprisoned by her own king for writing poetry negotiates three conditions for release, he breaks them, she breaks out — what is this life to her poems?',
        options: ['The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice', 'Nothing — biography shouldn\'t colour literary analysis', 'It\'s background colour for a romantic reading', 'It proves the poems are only about palace politics'],
        answer: 'The poems ARE the escape — the knocking on the door re-enacts her flight, and the demand to enter claims public space and voice',
        hook: 'A Chhayavad-era woman wrote in Braj Bhasha so village women could read her — and the canon excluded her for decades for exactly that choice.',
    },
    teaching: [
        { title: 'पाठ 14 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन का अर्थ है किसी साहित्यिक पाठ को गहराई से तोड़कर इसके घटकों — विषय, भाव, भाषा, युक्तियाँ — का विश्लेषण करना और फिर इन घटकों के बीच के संबंधों को समझकर एक तर्कसंगत व्याख्या प्रस्तुत.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_14_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the two poems as a diptych — systemic oppression in one, a hunter\'s frozen moral crisis in the other — and judge the unresolved \'if I kill her\' ending.',
        labels: ['पाठ 14 — आलोचनात्मक', 'पाठ 14 — लेखन', 'पाठ 14 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_14_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 14 · Part 3/3', spots: [
            { id: 's1', label: '14 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह प्रक्रिया है जिसमें छात्र किसी दिए गए.', answer: '14 -', options: ['14 -', '14 - -'] },
            { id: 's2', label: '14 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक **संरचित शैक्षणिक प्रक्रिया** है जिसमें शिक्षार्थी पाठ का मौन.', answer: '14 - -', options: ['14 - -', '14 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary society is debating why a Chhayavad-era queen who wrote in Braj Bhasha — imprisoned by her own husband for writing — was left out of the canon for decades. A member says: \'Probably her poems were just weaker; canon committees judge merit, not politics.\'',
            decisions: [{ prompt: 'What does her case actually reveal?', options: [
                { text: 'Read exclusion as power, not merit: she wrote in Braj so village women could access her work — a choice the Khari Boli canon punished. And biography is structural logic: imprisoned for writing, she negotiated three release conditions, he broke them, and she broke out — so the second poem\'s knocking on the door is a political act, and the first\'s call for reform is a survivor\'s testimony, not abstract preaching.', outcome: 'The debate reframes: canon-making is a struggle over language, gender and authority — her life is the interpretive key, not an anecdote.' },
                { text: 'Accept the merit explanation — the canon reflects quality, and exclusion just means weaker verse.', outcome: 'That ignores the documented mechanism: her Braj Bhasha choice — made for accessibility — was itself the grounds for exclusion, a language-and-gender judgment dressed as taste.', reveals: 'canon-is-pure-merit' },
                { text: 'Separate the poems from her life — read them on their own without biography.', outcome: 'Here biography IS the structure: the diptych pairs systemic oppression (poem 1) with the individual moral crisis it produces (poem 2) — her imprisonment and escape are the logic, not decoration.', reveals: 'ignore-biography-read-text-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_14_015', title: 'You made it',
          caseStudy: { intro: 'The hunter\'s hand stays raised and the poem refuses to lower it — the reader must live inside the poor man\'s eternal dilemma.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन का अर्थ है किसी साहित्यिक पाठ को गहराई से तोड़कर इसके घटकों.',
          hint: 'यदि छात्र विश्लेषण में फंस जाए, तो उसे साहित्यिक युक्तियों की पहचान (नोड 008 और 009) और.',
          misconception: 'कविता के आलोचनात्मक विश्लेषण में छात्र अक्सर यह मान लेते हैं कि यदि वे एक साहित्यिक युक्ति (जैसे रूपक या प्रतीक) की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन का अर्थ है किसी साहित्यिक पाठ को गहराई से तोड़कर इसके घटकों',
                  options: ['आलोचनात्मक चिंतन का अर्थ है किसी साहित्यिक पाठ को गहराई से तोड़कर इसके घटकों', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,'],
                  hint: 'यदि छात्र विश्लेषण में फंस जाए, तो उसे साहित्यिक युक्तियों की पहचान (नोड 008 और 009) और विषय की समझ.',
                  misconception: 'कविता के आलोचनात्मक विश्लेषण में छात्र अक्सर यह मान लेते हैं कि यदि वे एक साहित्यिक युक्ति (जैसे रूपक या प्रतीक) की पहचान कर लेते हैं, तो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को बताइए कि साहित्यिक युक्ति की पहचान करना जैसे रसोई में मसाला पहचानना है — बस इसे नाम देना पर्याप्त नहीं है.', 'यदि मुस्कान एक फूल नहीं होती, तो कैसा अंतर पड़ता?" **चरण 3**: छात्र को उत्तर देने के लिए प्रेरित कीजिए — यदि वे फिसल.', 'क्या यह मुस्कान को नाजुक बनाता है?" **चरण 4**: अंत में, इन अवलोकनों को कविता के बड़े विषय (जैसे सुंदरता की अस्थायित्व.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह प्रक्रिया है जिसमें छात्र.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_ar_cbse_14_013 (आलोचनात्मक चिंतन: विश्लेषण और.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर लिखने का अर्थ है पाठ की कहानी/कविता को अपने शब्दों में दोहराना (Paraphrasing).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह प्रक्रिया है जिसमें छात्र किसी दिए गए',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह प्रक्रिया है जिसमें छात्र किसी दिए गए', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c11_hin_ar_cbse_14_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** पर.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर लिखने का अर्थ है पाठ की कहानी/कविता को अपने शब्दों में दोहराना (Paraphrasing), बस थोड़ा छोटा.' }
          ],
            remediations: { 'paraphrasing': { steps: ['**चरण 1 — भेद स्पष्ट करें (Clarify Distinction):** छात्र के सामने **एक ही प्रश्न के दो उत्तर** रखें: एक \'सारांश-शैली\'.', 'बाकी को क्यों छोड़ा?"* इससे **प्रासंगिकता (Relevance)** की समझ बनेगी। **चरण 3 — PEEL मचान (PEEL Scaffolding):** एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_14_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक **संरचित शैक्षणिक प्रक्रिया** है जिसमें शिक्षार्थी.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** पर लौटें और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'चर्चा-बिंदु\' का अर्थ है **पाठ से तथ्यात्मक प्रश्न पूछना** (जैसे: "नायक का नाम.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक **संरचित शैक्षणिक प्रक्रिया** है जिसमें शिक्षार्थी पाठ का मौन',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक **संरचित शैक्षणिक प्रक्रिया** है जिसमें शिक्षार्थी पाठ का मौन', '\'पृष्ठभूमि और रचनाकार परिचय\' वह साहित्यिक अवधारणा है जिसमें किसी रचना के लिखे जाने के', 'कथानक किसी कहानी की घटनाओं का क्रमिक विकास है जिसमें परिचय, संघर्ष, चरमोत्कर्ष और समावेश', 'पाठ्य-परिवेश और वातावरण (Textual Setting and Atmosphere) refers to the spatiotemporal,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** पर लौटें और वहां दिए.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'चर्चा-बिंदु\' का अर्थ है **पाठ से तथ्यात्मक प्रश्न पूछना** (जैसे: "नायक का नाम क्या है?", "घटना कब.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — भ्रांति उजागर करें**: छात्र से कहें: "पाठ 14 से एक \'सही उत्तर वाला प्रश्न\' और एक \'चर्चा-बिंदु\' लिखो; फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
