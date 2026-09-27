import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch29_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch29_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch29_p2',
    title: 'कारतूस · Part 2/3',
    subtitle: 'यह नोड \'कारतूस\' कहानी के गौण विषयों (जैसे: सामाजिक कुरीतियाँ, नारी अस्मिता, मानवीय.',
    classLevel: 10, subject: 'hin_sp', topic: 'कारतूस · Part 2/3',
    chapters: ['c10_hin_sp_ch29'],
    nodeIds: ['c10_hin_sp_cbse_29_007', 'c10_hin_sp_cbse_29_008', 'c10_hin_sp_cbse_29_009', 'c10_hin_sp_cbse_29_010', 'c10_hin_sp_cbse_29_011', 'c10_hin_sp_cbse_29_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'क्या आपने कभी ध्यान दिया है कि जब हम कोई कहानी पढ़ते हैं, तो हीरो के अलावा बाकी पात्रों की छोटी-छोटी कहानियाँ.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'कहानी के इस अंश में प्रयुक्त वाक्य का भेद पहचानिए और बताइए कि प्रेमचंद ने इस विशेष वाक्य-संरचना को क्यों चुना होगा: "वह गिरा। फिर नहीं उठा। सन्नाटा छा गया।"',
        options: ['तीनों सरल वाक्य (Simple Sentences) हैं', 'व्याकरण: पाठ में भाषा-प्रयोग', 'प्रेमचंद ने सरल भाषा लिखी है इसलिए व्याकरण कम है'],
        answer: 'तीनों सरल वाक्य (Simple Sentences) हैं',
        hook: 'Students believe "व्याकरण: पाठ में भाषा-प्रयोग" means finding *errors* in the text or memorizing definitions.',
    },
    teaching: [
        { title: 'कारतूस — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक विषय-वस्तु है जो कथा के मुख्य विषय (Central Theme) के समानांतर चलता हुआ उसे पुष्ट, विस्तारित या विरोधाभासी बनाता है तथा पात्रों और परिवेश को बहुआयामी स्वरूप प्रदान करता.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_29_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['कारतूस — गौण विषय', 'कारतूस — साहित्यिक युक्तियाँ', 'कारतूस — पदावली: मुख्य', 'कारतूस — व्याकरण: पाठ', 'कारतूस — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_29_011', title: 'कारतूस — व्याकरण: पाठ में भाषा-प्रयोग',
          caseStudy: { intro: 'Have you ever noticed how a news report sounds different from a WhatsApp forward, even when both describe the same event?',
            decisions: [{ prompt: '"कारतूस" के निम्नलिखित शब्दों में से किन्हीं तीन को तत्सम, तद्भव, देशज या विदेशी की श्रेणी में वर्गीकृत कीजिए और कारण बताइए: (क) करतूस (ख).', options: [
                { text: '(क) करतूस — विदेशी (अंग्रेजी \'cartridge\' से), (ख) आकाश — तत्सम (संस्कृत मूल रूप में', outcome: '(क) करतूस — विदेशी (अंग्रेजी \'cartridge\' से), (ख) आकाश — तत्सम (संस्कृत मूल रूप में समान), (ग).' },
                { text: 'व्याकरण: पाठ में भाषा-प्रयोग', outcome: 'Not quite — Students believe "व्याकरण: पाठ में भाषा-प्रयोग" means finding *errors* in the text or memorizing.', reveals: 'means-finding-errors-in-the' },
                { text: 'प्रेमचंद ने सरल भाषा लिखी है इसलिए व्याकरण कम है', outcome: 'Not quite — Students believe "व्याकरण: पाठ में भाषा-प्रयोग" means finding *errors* in the text or memorizing.', reveals: 'means-finding-errors-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_29_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through कारतूस like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? कारतूस · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कारतूस · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह सहायक विषय-वस्तु है जो कथा के मुख्य विषय (Central.',
          hint: 'यदि फँस जाएँ तो c10_hin_sp_cbse_29_006 (मुख्य विषय) और c10_hin_sp_cbse_29_005 (सहायक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'गौण विषय\' का अर्थ है — \'कहानी में आने वाले छोटे-मोटे प्रसंग\' या \'सहायक पात्रों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक विषय-वस्तु है जो कथा के मुख्य विषय (Central Theme) के',
                  options: ['गौण विषय (Sub-theme) वह सहायक विषय-वस्तु है जो कथा के मुख्य विषय (Central Theme) के', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,'],
                  hint: 'यदि फँस जाएँ तो c10_hin_sp_cbse_29_006 (मुख्य विषय) और c10_hin_sp_cbse_29_005 (सहायक पात्र) दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'गौण विषय\' का अर्थ है — \'कहानी में आने वाले छोटे-मोटे प्रसंग\' या \'सहायक पात्रों की कहानियाँ\'। वे.' }
          ],
            remediations: { 'plot-element': { steps: ['**चरण 1 — अवधारणा स्पष्ट करें:** छात्र से कहें — "विषय वह \'संदेश\' है जो लेखक समाज को देना चाहता है, न कि \'घटना\'। घटना.', '**चरण 2 — \'क्यों?\' का अभ्यास कराएँ:** कहानी की किसी भी घटना/संवाद पर पूछें — "लेखक ने यह *क्यों* लिखा?', 'कौन-सा बड़ा विचार इससे उभरता है?" इसे 5-6 प्रसंगों पर दोहराएँ। 3.', '**चरण 3 — तालिका बनवाएँ:** तीन कॉलम: प्रसंग | उभरता विचार (गौण विषय) | मुख्य विषय से संबंध। छात्र स्वयं भरें, आप केवल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_008', difficulty: 'standard',
          question: '**बिंब (Imagery):** शब्दों के माध्यम से पाठक की इंद्रियों (दृष्टि, श्रवण.',
          hint: 'यदि फँसें तो **कक्षा 9 हिंदी स्पर्श/क्षितिज के \'अलंकार\' अध्याय (विशेषकर रूपक, उपमा.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **रूपक केवल \'सुंदर भाषा\' के लिए** आता है, और बिंब केवल \'वर्णन सजाने\' के लिए। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** शब्दों के माध्यम से पाठक की इंद्रियों (दृष्टि, श्रवण, स्पर्श, गंध,',
                  options: ['**बिंब (Imagery):** शब्दों के माध्यम से पाठक की इंद्रियों (दृष्टि, श्रवण, स्पर्श, गंध,', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,'],
                  hint: 'यदि फँसें तो **कक्षा 9 हिंदी स्पर्श/क्षितिज के \'अलंकार\' अध्याय (विशेषकर रूपक, उपमा, बिंब)** दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **रूपक केवल \'सुंदर भाषा\' के लिए** आता है, और बिंब केवल \'वर्णन सजाने\' के लिए। वे \'कारतूस\' में रूपक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध सुधार:** (1) छात्र को कहानी के **तीन विशिष्ट अंश** दें: (क) कोठरी का वर्णन, (ख) कारतूस स्पर्श का प्रसंग, (ग).', 'आँख/कान/त्वचा/नाक/जिह्वा?" — यही बिंब पहचान है। (3) रूपक के लिए: वाक्यों में **\'है/था/हैं/थे\' क्रिया** वाले वाक्य.', 'नहीं, तो कौन-सा गुण आरोपित हुआ?" (4) अंत में: **तालिका बनवाएँ** — स्तंभ: अंश | बिंब प्रकार | इंद्री | रूपक (यदि हो) |.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जिसमें दो विरोधी तथ्य एक साथ.',
          hint: 'If stuck, review **c10_hin_sp_cbse_29_008 (बिंब और रूपक)** — specifically the worked.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'प्रतीक\' (Symbol)** और **\'रूपक\' (Metaphor)** को एक मान लेते हैं। वे लिखते हैं: *"कारतूस.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जिसमें दो विरोधी तथ्य एक साथ मौजूद होकर',
                  options: ['**विरोधाभास (Paradox)** एक ऐसा कथन या स्थिति है जिसमें दो विरोधी तथ्य एक साथ मौजूद होकर', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,'],
                  hint: 'If stuck, review **c10_hin_sp_cbse_29_008 (बिंब और रूपक)** — specifically the worked example where.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'प्रतीक\' (Symbol)** और **\'रूपक\' (Metaphor)** को एक मान लेते हैं। वे लिखते हैं: *"कारतूस क्रांति का रूपक है।"*.' }
          ],
            remediations: { 'symbol-metaphor': { steps: ['**चरण 1 (पृथक्करण):** छात्र से कहें — *"कहानी से 5 ठोस वस्तुएँ छाँटो (कारतूस, बंदूक, वर्दी, लालटेन, ध्वज)। अब प्रत्येक.', 'यदि उत्तर एक अमूर्त संज्ञा (स्वतंत्रता, भय, कर्तव्य) है → वह **प्रतीक** है। यदि उत्तर एक क्रिया/विशेषण है (जलना.', '**चरण 2 (विरोधाभास खोज):** *"अब कहानी के वे 3 वाक्य ढूंढो जहाँ \'नहीं/नहीं\' या \'लेकिन/फिर भी\' आए हों और अर्थ उल्टा लगे।.', '**चरण 3 (संयोजन):** *"एक पैराग्राफ लिखो जहाँ एक प्रतीक और एक विरोधाभास एक साथ आएँ (जैसे: कारतूस = प्रतीक; मृत्यु→जीवन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_010', difficulty: 'standard',
          question: 'पदावली (Vocabulary) का अर्थ है किसी पाठ विशेष में प्रयुक्त मुख्य शब्दों के.',
          hint: 'अगर फँस जाएँ तो: पाठ \'कारतूस\' की पृष्ठभूमि (नोड 001) और कथानक (नोड 002) दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पदावली\' का अर्थ केवल **शब्दकोश से कठिन शब्दों के अर्थ लिखकर रट लेना** है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (Vocabulary) का अर्थ है किसी पाठ विशेष में प्रयुक्त मुख्य शब्दों के प्रसंगानुकूल',
                  options: ['पदावली (Vocabulary) का अर्थ है किसी पाठ विशेष में प्रयुक्त मुख्य शब्दों के प्रसंगानुकूल', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,'],
                  hint: 'अगर फँस जाएँ तो: पाठ \'कारतूस\' की पृष्ठभूमि (नोड 001) और कथानक (नोड 002) दोबारा पढ़ें — शब्दों का.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पदावली\' का अर्थ केवल **शब्दकोश से कठिन शब्दों के अर्थ लिखकर रट लेना** है। **वास्तविकता:** बोर्ड.' }
          ],
            remediations: { '1-contextual-meaning': { steps: ['**चरण 1:** छात्र से कहें: "पाठ खोलो, उन 5 शब्दों पर घेरा लगाओ जिनके अर्थ तुम शब्दकोश में देखकर रटे थे।" **चरण 2:**.', 'वहाँ आसपास के वाक्य पढ़कर बताओ कि यहाँ इसका विशेष अर्थ क्या बनता है?" (प्रसंगानुकूल अर्थ निकालने का अभ्यास)। **चरण 3:**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_011', difficulty: 'standard',
          question: '"कारतूस" में भाषा-प्रयोग का अर्थ है प्रेमचंद द्वारा कहानी में प्रयुक्त.',
          hint: 'Review Class 9 Hindi Vyakaran chapter "शब्द-विचार: उत्पत्ति के आधार पर शब्द-भेद" and.',
          misconception: 'Students believe "व्याकरण: पाठ में भाषा-प्रयोग" means finding *errors* in the text or memorizing definitions.',
          parts: [
                { id: 'a', prompt: 'कहानी के इस अंश में प्रयुक्त वाक्य का भेद पहचानिए और बताइए कि प्रेमचंद ने इस विशेष वाक्य-संरचना को क्यों चुना होगा: "वह गिरा। फिर नहीं उठा। सन्नाटा छा गया।"', answer: 'तीनों सरल वाक्य (Simple Sentences) हैं',
                  options: ['तीनों सरल वाक्य (Simple Sentences) हैं', 'व्याकरण: पाठ में भाषा-प्रयोग', 'प्रेमचंद ने सरल भाषा लिखी है इसलिए व्याकरण कम है', 'यह तद्भव शब्द है'],
                  hint: 'Review Class 9 Hindi Vyakaran chapter "शब्द-विचार: उत्पत्ति के आधार पर शब्द-भेद" and "वाक्य-विचार.',
                  misconception: 'Students believe "व्याकरण: पाठ में भाषा-प्रयोग" means finding *errors* in the text or memorizing definitions of तत्सम/तद्भव.' },
                { id: 'b', prompt: 'निम्नलिखित वाक्य में क्रिया-रूप पहचानिए और बताइए कि इसका काल, पक्ष, वाच्य क्या है तथा इसका कथात्मक प्रभाव क्या है: "वहाँ लाशें पड़ी हुई थीं।"', answer: 'क्रिया: \'पड़ी हुई थीं\'',
                  options: ['क्रिया: \'पड़ी हुई थीं\'', 'व्याकरण: पाठ में भाषा-प्रयोग', 'प्रेमचंद ने सरल भाषा लिखी है इसलिए व्याकरण कम है', 'यह तद्भव शब्द है'],
                  hint: 'Review Class 9 Hindi Vyakaran chapter "शब्द-विचार: उत्पत्ति के आधार पर शब्द-भेद" and "वाक्य-विचार.',
                  misconception: 'Students believe "व्याकरण: पाठ में भाषा-प्रयोग" means finding *errors* in the text or memorizing definitions of तत्सम/तद्भव.' },
                { id: 'c', prompt: 'कहानी में दो प्रसंग चुनिए जहाँ प्रेमचंद ने संस्कृतनिष्ठ (तत्सम-प्रधान) भाषा का प्रयोग किया है और दो जहाँ लोकभाषा/तद्भव-प्रधान भाषा का। दोनों के प्रभाव की तुलना.', answer: 'उदाहरण: तत्सम-प्रधान',
                  options: ['उदाहरण: तत्सम-प्रधान', 'व्याकरण: पाठ में भाषा-प्रयोग', 'प्रेमचंद ने सरल भाषा लिखी है इसलिए व्याकरण कम है', 'यह तद्भव शब्द है'],
                  hint: 'Review Class 9 Hindi Vyakaran chapter "शब्द-विचार: उत्पत्ति के आधार पर शब्द-भेद" and "वाक्य-विचार.',
                  misconception: 'Students believe "व्याकरण: पाठ में भाषा-प्रयोग" means finding *errors* in the text or memorizing definitions of तत्सम/तद्भव.' }
          ],
            remediations: { 'means-finding-errors-in-the': { steps: ['Take one paragraph from "कारतूस" (e.g., the opening scene).', 'Highlight every noun and verb.', 'For each noun, trace its origin using the \'Sanskrit → Prakrit → Apabhramsha → Hindi\' chain (use a dictionary if needed).', 'For each verb, fill a 3-column table: Tense | Aspect | Voice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ बोध-प्रश्न वे हैं जिनका उत्तर एक शब्द, एक वाक्य या दिए गए विकल्पों.',
          hint: 'यदि फंसे हों, तो c10_hin_sp_cbse_29_002 (कथानक) और c10_hin_sp_cbse_29_006 (मुख्य विषय).',
          misconception: '**सबसे घातक भ्रांति:** "आशय-सूचक प्रश्न में पाठ की कहानी अपने शब्दों में दोहरा देना पर्याप्त है।" **वास्तविकता:** बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ बोध-प्रश्न वे हैं जिनका उत्तर एक शब्द, एक वाक्य या दिए गए विकल्पों में से',
                  options: ['वस्तुनिष्ठ बोध-प्रश्न वे हैं जिनका उत्तर एक शब्द, एक वाक्य या दिए गए विकल्पों में से', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,'],
                  hint: 'यदि फंसे हों, तो c10_hin_sp_cbse_29_002 (कथानक) और c10_hin_sp_cbse_29_006 (मुख्य विषय) दोबारा पढ़ें.',
                  misconception: '**सबसे घातक भ्रांति:** "आशय-सूचक प्रश्न में पाठ की कहानी अपने शब्दों में दोहरा देना पर्याप्त है।" **वास्तविकता:** बोर्ड परीक्षा में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहचान अभ्यास:** छात्र को 5 प्रश्न दें (मिश्रित: वस्तुनिष्ठ/आशय-सूचक) और केवल **प्रकार पहचानने** को कहें — उत्तर न.', '**PEEL टेम्पलेट:** आशय-सूचक के लिए 4-खाने वाला चार्ट दें (Point | Evidence | Explanation | Link) — पहले दो प्रश्नों में.', '**\'क्यों\' का खेल:** पाठ के किसी भी वाक्य पर पूछें — "लेखक ने यह **क्यों** लिखा?" — छात्र को 3 संभावित कारण लिखने होंगे.', '**स्व-मूल्यांकन:** छात्र अपना उत्तर खुद जांचे — क्या मैंने **साक्ष्य उद्धृत किया?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
