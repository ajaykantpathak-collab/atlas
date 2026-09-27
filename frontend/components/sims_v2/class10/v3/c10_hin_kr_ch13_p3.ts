import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_kr_ch13_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_kr_ch13_p3: SimDef = {
    id: 'v3_c10_hin_kr_ch13_p3',
    title: 'माता का अँचल · Part 3/3',
    subtitle: 'यह नोड माता के अँचल के विश्लेषण‑व्याख्या पर केंद्रित है; यह पाठ के सरल सारांश, शब्दार्थ.',
    classLevel: 10, subject: 'hin_kr', topic: 'माता का अँचल · Part 3/3',
    chapters: ['c10_hin_kr_ch13'],
    nodeIds: ['c10_hin_kr_cbse_13_013', 'c10_hin_kr_cbse_13_014', 'c10_hin_kr_cbse_13_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप अपने दोस्त को किसी फिल्म का रिव्यू दे रहे हैं – आप बस कहानी नहीं सुनाते, बल्कि बताते हैं कि.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: '\'माता का अँचल\' के दो विभिन्न पात्रों (जैसे माँ और बच्चे) के दृष्टिकोण की तुलना करते समय, चर्चा के लिए कौन से तीन बिंदु उभरकर आते हैं और ये बिंदु पाठ के मुख्य.',
        options: ['- बिंदु 1: माँ की त्याग की भावना और बच्चे की सुरक्षा की इच्छा', 'What is the name of the child?', 'Where did the mother go?'],
        answer: '- बिंदु 1: माँ की त्याग की भावना और बच्चे की सुरक्षा की इच्छा',
        hook: 'Students often think that discussion points for listening-speaking are merely asking factual recall questions like.',
    },
    teaching: [
        { title: 'माता का अँचल — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (critical thinking) वह प्रक्रिया है जिसमें पाठ के तथ्यों को तोड़कर उनके पीछे छिपे अर्थ, लेखक के उद्देश्य और सामाजिक‑सांस्कृतिक संदर्भ का विश्लेषण और व्याख्या किया जाता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_kr_cbse_13_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['माता का अँचल —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_13_015', title: 'माता का अँचल — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: 'कक्षा में कल्पना कीजिए कि आपका दोस्त आपको कोई नई गाना सुनाकर उसके बोलों के अर्थ पूछता है; आप पहले गाना ध्यान से सुनते हैं, फिर शब्दों के भाव, दोहराव वाली लाइन.',
            decisions: [{ prompt: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ क्या है?', options: [
                { text: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ वह बिंदु या विषय है जिस पर पाठ के पढ़ने और सुनने के दौरान', outcome: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ वह बिंदु या विषय है जिस पर पाठ के पढ़ने और सुनने के दौरान चर्चा की.' },
                { text: 'What is the name of the child?', outcome: 'Not quite — Students often think that discussion points for listening-speaking are merely asking factual recall.', reveals: 'discussion-points-for-listening-speaking' },
                { text: 'Where did the mother go?', outcome: 'Not quite — Students often think that discussion points for listening-speaking are merely asking factual recall.', reveals: 'discussion-points-for-listening-speaking' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_13_015', title: 'You made it',
          caseStudy: { intro: 'You finished माता का अँचल — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (critical thinking) वह प्रक्रिया है जिसमें पाठ के तथ्यों को.',
          hint: 'यदि विश्लेषण में कठिनाई हो तो ‘मुख्य विषय और संदेश’ (node 006) और ‘साहित्यिक युक्तियाँ.',
          misconception: 'छात्र अक्सर मानते हैं कि ‘विश्लेषण’ का मतलब केवल पाठ के eventos का क्रमबद्ध वर्णन करना है, अर्थात ‘क्या हुआ?’ का जवाब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (critical thinking) वह प्रक्रिया है जिसमें पाठ के तथ्यों को तोड़कर उनके',
                  options: ['आलोचनात्मक चिंतन (critical thinking) वह प्रक्रिया है जिसमें पाठ के तथ्यों को तोड़कर उनके', '**पृष्ठभूमि और रचनाकार परिचय** का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है जो संघर्ष (conflict) से आरंभ', 'पाठ्य-परिवेश और वातावरण से तात्पर्य उस भौतिक, सामाजिक, सांस्कृतिक और भावनात्मक पृष्ठभूमि'],
                  hint: 'यदि विश्लेषण में कठिनाई हो तो ‘मुख्य विषय और संदेश’ (node 006) और ‘साहित्यिक युक्तियाँ: बिंब और.',
                  misconception: 'छात्र अक्सर मानते हैं कि ‘विश्लेषण’ का मतलब केवल पाठ के eventos का क्रमबद्ध वर्णन करना है, अर्थात ‘क्या हुआ?’ का जवाब देना, जबकि वास्तव में.' }
          ],
            remediations: { 'eventos': { steps: ['छात्र को दिए गए वाक्य को दो भागों में बाँटने को कहें: (a) घटना (what) (b) उसके पीछे का कारण या प्रभाव (why).', 'फिर पूछें: “इस घटना से पाठ का कौन‑सा विषय या भाव जुड़ता है?” 3.', 'अंत में, छात्र को अपने उत्तर में एक साहित्यिक उपकरण (उदाहरण: रूपक, प्रतीक) का उल्लेख करने के लिए प्रेरित करें, जिससे वह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ‑आधारित का अर्थ है पाठ्य material से साक्ष्य चुनकर.',
          hint: 'यदि फंसे हों तो c10_hin_kr_cbse_13_012 (बोध‑प्रश्न: वस्तुनिष्ठ और आशय‑सूचक) पर वापस जाएं.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ‑आधारित उत्तर में बस प्रश्न के प्रश्नवाचक शब्द को दोहराना और कहानी की कोई भी पंक्ति लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ‑आधारित का अर्थ है पाठ्य material से साक्ष्य चुनकर,',
                  options: ['लेखन कौशल: पाठ‑आधारित का अर्थ है पाठ्य material से साक्ष्य चुनकर,', '**पृष्ठभूमि और रचनाकार परिचय** का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम वाला क्रम है जो संघर्ष (conflict) से आरंभ', 'पाठ्य-परिवेश और वातावरण से तात्पर्य उस भौतिक, सामाजिक, सांस्कृतिक और भावनात्मक पृष्ठभूमि'],
                  hint: 'यदि फंसे हों तो c10_hin_kr_cbse_13_012 (बोध‑प्रश्न: वस्तुनिष्ठ और आशय‑सूचक) पर वापस जाएं और पाठ से.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ‑आधारित उत्तर में बस प्रश्न के प्रश्नवाचक शब्द को दोहराना और कहानी की कोई भी पंक्ति लिख देना काफी है; वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले यह दिखाएँ कि एक कमजोर उत्तर क्या lacks है: एक सरल वाक्य लिखवाएँ, फिर पूछें कि इसमें क्याmissing है (बिंदु.', 'link?)। फिर PEEL के प्रत्येक चरण को रंग‑कोडेड उदाहरण से समझाएँ — जैसे बिंदु हरे, प्रमाण नीले, विवेचन गुलाबी, link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ वह विशिष्ट विषय, प्रश्न या अवलोकन है जिसे पाठ.',
          hint: 'Review the techniques of theme analysis and character sketch from nodes.',
          misconception: 'Students often think that discussion points for listening-speaking are merely asking factual recall questions like.',
          parts: [
                { id: 'a', prompt: '\'माता का अँचल\' के दो विभिन्न पात्रों (जैसे माँ और बच्चे) के दृष्टिकोण की तुलना करते समय, चर्चा के लिए कौन से तीन बिंदु उभरकर आते हैं और ये बिंदु पाठ के मुख्य.', answer: '- बिंदु 1: माँ की त्याग की भावना और बच्चे की सुरक्षा की इच्छा',
                  options: ['- बिंदु 1: माँ की त्याग की भावना और बच्चे की सुरक्षा की इच्छा', 'What is the name of the child?', 'Where did the mother go?'],
                  hint: 'Review the techniques of theme analysis and character sketch from nodes c10_hin_kr_cbse_13_006 and.',
                  misconception: 'Students often think that discussion points for listening-speaking are merely asking factual recall questions like "What is the name of the.' }
          ],
            remediations: { 'discussion-points-for-listening-speaking': { steps: ['To correct this, first show the student a weak factual question and a strong analytical question side by side.', 'Ask: "Which question makes you think deeper about the story and why?" Then guide them to rewrite a factual question.', 'Finally, have them practice creating three discussion points from a new passage, ensuring each point includes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
