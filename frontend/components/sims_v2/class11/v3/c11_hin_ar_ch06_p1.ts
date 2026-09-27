import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch06_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch06_p1',
    title: 'पाठ 6 · Part 1/3',
    subtitle: 'Watch a tuition room become the whole education system in miniature.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 6 · Part 1/3',
    chapters: ['c11_hin_ar_ch06'],
    nodeIds: ['c11_hin_ar_cbse_06_001', 'c11_hin_ar_cbse_06_002', 'c11_hin_ar_cbse_06_003', 'c11_hin_ar_cbse_06_004', 'c11_hin_ar_cbse_06_005', 'c11_hin_ar_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a spectator trapped in one room with the exam machine', intro: 'A mother sweeping, a teacher collecting fees, a student drowning — and a one-act play that won\'t open a window.', goal: 'Analyse the one-act form\'s unity and compression as a critique of tuition culture.' },
    discovery: {
        question: 'Usha Priyamvada\'s one-act play ends with जटुह deciding to start a movement — no tidy solution. Is that a weak ending?',
        options: ['No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself', 'Yes — a play must resolve its conflict', 'Yes — starting a movement solves nothing for the boy', 'No — but only because sequels were planned'],
        answer: 'No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself',
        hook: 'One room, one act, no exits — the form itself is the argument: students and parents have nowhere to step out to.',
    },
    teaching: [
        { title: 'पाठ 6 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय, रचनाकाल की सामाजिक-सांस्कृतिक-राजनीतिक परिस्थितियों, वैचारिक पृष्ठभूमि तथा साहित्यिक प्रवृत्ति** का अध्ययन करके.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the entrances and exits as French scenes, place the climax where the tuition teacher confronts the principal, and defend the unresolved close.',
        labels: ['पाठ 6 — पृष्ठभूमि', 'पाठ 6 — कथानक', 'पाठ 6 — पाठ्य-परिवेश', 'पाठ 6 — पात्र-चित्रण', 'पाठ 6 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 1/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष.', answer: '6 -', options: ['6 -', '6 -'] },
            { id: 's2', label: '6 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक.', answer: '6 -', options: ['6 -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your drama club is rehearsing Usha Priyamvada\'s one-act play about a family fighting over a son\'s tuition fees. The student director plans to \'break it into three scenes for variety\' and end with an uplifting speech where the parents renounce tuition.',
            decisions: [{ prompt: 'Why do both changes betray the play\'s design?', options: [
                { text: 'Hold the form: it\'s a one-act play — a single continuous act where every entrance and exit (French scenes) turns the same screw tighter. Splitting it into \'scenes\' breaks the compression that mirrors the student\'s inescapable pressure. And the happy ending kills the point: the Nayi Kahani one-acter refuses easy solutions, forcing the audience to sit with a system that commodifies childhood.', outcome: 'The production keeps its claustrophobia: one unbroken space, one unbroken pressure — discomfort is the playwright\'s method, not a flaw to fix.' },
                { text: 'Allow the scene breaks — entrances and exits are just like act divisions anyway.', outcome: 'French scenes are character shifts inside one continuous act, not act breaks; treating them as divisions imports a multi-act logic the form deliberately refuses.', reveals: 'french-scenes-are-acts' },
                { text: 'Keep the uplifting finale — audiences prefer resolution, and it gives the play a message.', outcome: 'The resolution would lie: the play\'s power is making the tuition trap felt without an exit — solving it on stage lets the audience off the hook.', reveals: 'happy-ending-improves-it' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'The play compresses everything a novel would spread out — that\'s why the pressure on one student\'s homework feels inescapable.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के.',
          hint: 'यदि रचनाकार का नाम/प्रवृत्ति/काल याद न हो → **NCERT पाठ्यपुस्तक के \'रचनाकार परिचय\'.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — **लेखक की जन्मतिथि, मृत्युतिथि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,',
                  options: ['पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी/उपन्यास के'],
                  hint: 'यदि रचनाकार का नाम/प्रवृत्ति/काल याद न हो → **NCERT पाठ्यपुस्तक के \'रचनाकार परिचय\' बॉक्स** और **पाठ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — **लेखक की जन्मतिथि, मृत्युतिथि, पुरस्कारों की सूची, प्रसिद्ध.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — तथ्य से \'प्रश्न\' बनाना:** छात्र से कहें: "जो तीन तथ्य तुमने रटे हैं (जन्म, पुरस्कार, प्रवृत्ति), प्रत्येक से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष.',
          hint: 'यदि फँसें तो **\'कहानी बनाम कथानक\'** (E.M. फॉर्स्टर, *Aspects of the Novel*) और **फ्रेटैग.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'फ्लैशबैक\' को \'अरेखीय संरचना\' का पर्याय मान लेते हैं**, जबकि फ्लैशबैक एक **स्थानीय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष',
                  options: ['कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी/उपन्यास के'],
                  hint: 'यदि फँसें तो **\'कहानी बनाम कथानक\'** (E.M. फॉर्स्टर, *Aspects of the Novel*) और **फ्रेटैग पिरामिड**.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'फ्लैशबैक\' को \'अरेखीय संरचना\' का पर्याय मान लेते हैं**, जबकि फ्लैशबैक एक **स्थानीय युक्ति (local device)**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "किसी भी परिचित फिल्म (जैसे *दृश्यम*, *अंधाधुन*) की घटनाएँ कागज़ पर **कालानुक्रम में** लिखो.', '**चरण 2:** फिर पूछें: "फिल्म में घटनाएँ **किस क्रम में दिखाई गईं**?', 'तीर (→) से जोड़ो — यह \'आख्यान-संरचना\' है।" 3.', '**चरण 3:** दोनों की तुलना करवाएं: "कहाँ-कहाँ क्रम बदला?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और.',
          hint: 'यदि अटका लगे तो c11_hin_ar_cbse_06_002 के \'कथानक के सोपान\' खंड को दोबारा पढ़ें — देखें कि.',
          misconception: 'विद्यार्थी प्रायः समझते हैं कि \'वातावरण\' लेखक सीधे-सीधे विशेषणों (उदास, भयानक, सुंदर) से *बताता* है, जबकि वास्तव में वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी/उपन्यास के'],
                  hint: 'यदि अटका लगे तो c11_hin_ar_cbse_06_002 के \'कथानक के सोपान\' खंड को दोबारा पढ़ें — देखें कि परिवेश.',
                  misconception: 'विद्यार्थी प्रायः समझते हैं कि \'वातावरण\' लेखक सीधे-सीधे विशेषणों (उदास, भयानक, सुंदर) से *बताता* है, जबकि वास्तव में वह **ठोस ब्योरों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के किसी एक पैराग्राफ में केवल **संज्ञा-सर्वनाम-विशेषण** छाँटो जो इंद्रियों को संबोधित करते हों.', 'उन शब्दों को दो कॉलम में लिखवाएँ: बायाँ — \'परिवेश का ब्योरा\', दायाँ — \'मेरे मन पर असर\'। 3.', 'फिर पूछें: "बाएँ कॉलम के कौन-से तीन ब्योरे मिलकर दाएँ कॉलम का \'भय\' बना रहे हैं?" 4.', 'अंत में छात्र स्वयं एक वाक्य लिखे: "लेखक ने X, Y, Z ब्योरे चुनकर भय का वातावरण रचा।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें.',
          hint: 'यदि अटकें तो **c11_hin_ar_cbse_06_002 (कथानक और आख्यान-संरचना)** के \'चरमोत्कर्ष और.',
          misconception: '**भ्रांति:** *"पात्र-चित्रण = नायक के गुणों (ईमानदार, बहादुर, दयालु...) की लंबी सूची बनाना + प्रत्येक के आगे एक-एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी/उपन्यास के',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी/उपन्यास के', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक'],
                  hint: 'यदि अटकें तो **c11_hin_ar_cbse_06_002 (कथानक और आख्यान-संरचना)** के \'चरमोत्कर्ष और प्रतिउत्कर्ष\'.',
                  misconception: '**भ्रांति:** *"पात्र-चित्रण = नायक के गुणों (ईमानदार, बहादुर, दयालु...) की लंबी सूची बनाना + प्रत्येक के आगे एक-एक उद्धरण लगा देना।"*.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (3-चरण):** 1.', '**\'गुण-प्रसंग सारणी\' (Trait-Evidence Table) बनवाओ:** दो कॉलम — बाएँ \'गुण\', दाएँ \'प्रसंग+पंक्ति संख्या\'। छात्र से कहो.', '**\'क्यों-कैसे\' प्रश्न शृंखला चलाओ:** प्रत्येक प्रसंग के बाद पूछो — *"नायक ने यही क्यों किया?', 'दूसरा विकल्प क्यों नहीं चुना?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के साथ.',
          hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_06_004 के \'नायक विश्लेषण\' खंड को दोहराएं.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'सहायक पात्र = नायक का मित्र/परिवार वाला\' — जबकि सहायक पात्र **शत्रु, अजनबी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के साथ रहकर कथानक',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के साथ रहकर कथानक', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_06_004 के \'नायक विश्लेषण\' खंड को दोहराएं, विशेषकर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'सहायक पात्र = नायक का मित्र/परिवार वाला\' — जबकि सहायक पात्र **शत्रु, अजनबी, प्रकृति, पशु, या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "किसी फिल्म/सीरियल का एक दृश्य याद करो जहां हीरो अकेला है — अब सोचो, अगर उसका दोस्त/दुश्मन/मां वहां होता.', 'फिर कहानी से एक सहायक पात्र चुनकर **\'अनुपस्थिति परीक्षण\' (absence test)** करवाएं: "अगर यह पात्र न होता तो नायक क्या.', 'कथानक कैसे बदलता?" — लिखित में 3 बिंदु मांगें। 3.', 'फॉरस्टर के \'गोल/समतल पात्र\' (round/flat character) भेद को 2 उदाहरणों सहित समझाएं — इससे \'अस्तित्वहीन पात्र\' का भ्रम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_006', difficulty: 'standard',
          question: 'मुख्य विषय वह केंद्रीय विचार या अवधारणा है जिसे लेखक अपने लेखन के माध्यम से.',
          hint: 'यदि मुख्य विषय पहचानने में कठिनाई हो, तो पाठ में दोहराई जाने वाली स्थितियों, पात्रों के.',
          misconception: 'छात्र अक्सर मुख्य विषय को पाठ की स्पष्ट घटना या पात्र के एक विशिष्ट कार्य से जोड़ लेते हैं, मानकर चलते हैं कि अगर कोई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय वह केंद्रीय विचार या अवधारणा है जिसे लेखक अपने लेखन के माध्यम से दोहराता और',
                  options: ['मुख्य विषय वह केंद्रीय विचार या अवधारणा है जिसे लेखक अपने लेखन के माध्यम से दोहराता और', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के **जीवन-परिचय,', 'कथानक (Plot) घटनाओं का तार्किक और कारणात्मक क्रम है जो किसी रचना में संघर्ष, चरमोत्कर्ष', 'पाठ्य-परिवेश (Setting) किसी रचना का काल, स्थान, सामाजिक-आर्थिक यथार्थ और सांस्कृतिक'],
                  hint: 'यदि मुख्य विषय पहचानने में कठिनाई हो, तो पाठ में दोहराई जाने वाली स्थितियों, पात्रों के संघर्षों या.',
                  misconception: 'छात्र अक्सर मुख्य विषय को पाठ की स्पष्ट घटना या पात्र के एक विशिष्ट कार्य से जोड़ लेते हैं, मानकर चलते हैं कि अगर कोई पात्र ईमानदारी से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि वह पाठ में कौन सी स्थिति या संवाद दो या अधिक बार आता है — जैसे कि क्या कोई पात्र बार-बार चुनाव के.', 'फिर उन दोहराव वाली स्थितियों के परिणामों को तुलना कीजिए — क्या हर बार ईमानदारी बोलने पर inizialmente कठिनाई होती है.', 'इस पैटर्न को पहचानने पर कहिए कि यही दोहराव वाला विचार मुख्य विषय है — न कि कोई單一 घटना। इससे वे घटना से विचार की ओर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
