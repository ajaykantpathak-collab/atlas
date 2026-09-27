import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch06_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch06_p3',
    title: 'पाठ 6 · Part 3/3',
    subtitle: 'Watch a tuition room become the whole education system in miniature.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 6 · Part 3/3',
    chapters: ['c11_hin_ar_ch06'],
    nodeIds: ['c11_hin_ar_cbse_06_013', 'c11_hin_ar_cbse_06_014', 'c11_hin_ar_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a spectator trapped in one room with the exam machine', intro: 'A mother sweeping, a teacher collecting fees, a student drowning — and a one-act play that won\'t open a window.', goal: 'Analyse the one-act form\'s unity and compression as a critique of tuition culture.' },
    discovery: {
        question: 'Usha Priyamvada\'s one-act play ends with जटुह deciding to start a movement — no tidy solution. Is that a weak ending?',
        options: ['No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself', 'Yes — a play must resolve its conflict', 'Yes — starting a movement solves nothing for the boy', 'No — but only because sequels were planned'],
        answer: 'No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself',
        hook: 'One room, one act, no exits — the form itself is the argument: students and parents have nowhere to step out to.',
    },
    teaching: [
        { title: 'पाठ 6 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें किसी पाठ के घटकों (विषय, शिल्प, भाषा, संरचना) को **विश्लेषण** (Analysis) द्वारा अलग-अलग समझा जाता है और फिर **व्याख्या** (Interpretation).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the entrances and exits as French scenes, place the climax where the tuition teacher confronts the principal, and defend the unresolved close.',
        labels: ['पाठ 6 — आलोचनात्मक', 'पाठ 6 — लेखन', 'पाठ 6 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_06_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 3/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें दिए गए पाठ (गद्य या पद्य) का विश्लेषण करके.', answer: '6 -', options: ['6 -', '6 - -'] },
            { id: 's2', label: '6 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी पाठ को.', answer: '6 - -', options: ['6 - -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your drama club is rehearsing Usha Priyamvada\'s one-act play about a family fighting over a son\'s tuition fees. The student director plans to \'break it into three scenes for variety\' and end with an uplifting speech where the parents renounce tuition.',
            decisions: [{ prompt: 'Why do both changes betray the play\'s design?', options: [
                { text: 'Hold the form: it\'s a one-act play — a single continuous act where every entrance and exit (French scenes) turns the same screw tighter. Splitting it into \'scenes\' breaks the compression that mirrors the student\'s inescapable pressure. And the happy ending kills the point: the Nayi Kahani one-acter refuses easy solutions, forcing the audience to sit with a system that commodifies childhood.', outcome: 'The production keeps its claustrophobia: one unbroken space, one unbroken pressure — discomfort is the playwright\'s method, not a flaw to fix.' },
                { text: 'Allow the scene breaks — entrances and exits are just like act divisions anyway.', outcome: 'French scenes are character shifts inside one continuous act, not act breaks; treating them as divisions imports a multi-act logic the form deliberately refuses.', reveals: 'french-scenes-are-acts' },
                { text: 'Keep the uplifting finale — audiences prefer resolution, and it gives the play a message.', outcome: 'The resolution would lie: the play\'s power is making the tuition trap felt without an exit — solving it on stage lets the audience off the hook.', reveals: 'happy-ending-improves-it' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'The play compresses everything a novel would spread out — that\'s why the pressure on one student\'s homework feels inescapable.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें किसी पाठ के घटकों.',
          hint: 'यदि अटके तो **नोड 008 और 009** दोबारा पढ़ें: बिंब/रूपक/प्रतीक/विरोधाभास की परिभाषा और पाठ.',
          misconception: 'छात्र समझते हैं कि **\'विश्लेषण\' = \'लंबा उत्तर लिखना\'** और **\'व्याख्या\' = \'अपनी राय जोड़ना\'**। वास्तव में: विश्लेषण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें किसी पाठ के घटकों (विषय, शिल्प,',
                  options: ['आलोचनात्मक चिंतन एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें किसी पाठ के घटकों (विषय, शिल्प,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक'],
                  hint: 'यदि अटके तो **नोड 008 और 009** दोबारा पढ़ें: बिंब/रूपक/प्रतीक/विरोधाभास की परिभाषा और पाठ से एक-एक.',
                  misconception: 'छात्र समझते हैं कि **\'विश्लेषण\' = \'लंबा उत्तर लिखना\'** और **\'व्याख्या\' = \'अपनी राय जोड़ना\'**। वास्तव में: विश्लेषण = **पाठ-आधारित साक्ष्य.' }
          ],
            remediations: { 'textual-evidence-selection-logical-warranting': { steps: ['**साक्ष्य-चयन अभ्यास:** पाठ 6 के 5 वाक्य छांटें जिनमें कोई साहित्यिक युक्ति हो (बिंब/रूपक/प्रतीक)। प्रत्येक के आगे.', '**वारंट-लेखन:** प्रत्येक चयनित वाक्य के नीचे एक तीर खींचकर लिखें: "इसका अर्थ *X* है क्योंकि *Y* (संदर्भ/पूर्व प्रसंग)".', '**PEEL पैराग्राफ बनाएं:** Point (युक्ति का नाम) → Evidence (उद्धरण) → Explanation (वारंट) → Link (मुख्य विषय से संबंध)।.', '**स्व-जांच:** पूछें — "क्या मैंने पाठ से बाहर की बात कही?" यदि हाँ, तो हटाएं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें दिए गए पाठ (गद्य या पद्य) का.',
          hint: 'यदि छात्र साक्ष्य से अर्थ निकालने में कठिनाई महसूस कर रहा है, तो उसे साहित्यिक युक्तियों.',
          misconception: 'Class 11 के छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में लंबे उद्धरण डालने से उनका उत्तर अधिक मज़बूत हो जाता है, इसलिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें दिए गए पाठ (गद्य या पद्य) का विश्लेषण करके,',
                  options: ['पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें दिए गए पाठ (गद्य या पद्य) का विश्लेषण करके,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक'],
                  hint: 'यदि छात्र साक्ष्य से अर्थ निकालने में कठिनाई महसूस कर रहा है, तो उसे साहित्यिक युक्तियों: बिंब और.',
                  misconception: 'Class 11 के छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में लंबे उद्धरण डालने से उनका उत्तर अधिक मज़बूत हो जाता है, इसलिए वे पाठ के बड़े.' }
          ],
            remediations: { 'class-11': { steps: ['छात्र को दिखाइए कि दो उत्तर दिए गए हैं: उत्तर A: "लेखक ने कहा, \'जीवन एक कठिन संघर्ष है जिसमें हर दिन नई चुनौतियाँ आती.', 'फिर छात्र को अभ्यास कराइए कि वे एक लंबा उद्धरण लें, उससे केवल 4-5 शब्द चुनें (जैसे "नई चुनौतियाँ"), और उन शब्दों के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** पर लौटें.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **\'चर्चा-बिंदु\' = \'पाठ के महत्वपूर्ण प्रश्नों की सूची\'** जिसे याद करके परीक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी पाठ को',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी पाठ को', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या)** पर लौटें — वहाँ सीखे.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **\'चर्चा-बिंदु\' = \'पाठ के महत्वपूर्ण प्रश्नों की सूची\'** जिसे याद करके परीक्षा में लिख देना है।.' }
          ],
            remediations: { '6-10-15': { steps: ['**लक्षित सुधार (4 चरण)**: 1.', '**भेद स्पष्ट करें**: छात्र के सामने **दो सूची** रखें — (क) \'परीक्षा-प्रश्न\' (बंद/तथ्यात्मक/उत्तर-निर्धारित) और (ख).', '**\'क्यों/कैसे\' का अभ्यास**: पाठ 6 के किसी एक प्रसंग (जैसे नायक का निर्णय) पर **केवल \'क्यों\' और \'कैसे\' से शुरू होने वाले.', '**लाइव चर्चा में \'गलत उत्तर\' का उत्सव**: कक्षा में जानबूझकर एक **\'असामान्य/विवादास्पद\' व्याख्या** प्रस्तुत करें और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
