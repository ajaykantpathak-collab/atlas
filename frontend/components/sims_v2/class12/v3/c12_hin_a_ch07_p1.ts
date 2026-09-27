import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch07_p1: SimDef = {
    id: 'v3_c12_hin_a_ch07_p1',
    title: 'बारहमासा · Part 1/3',
    subtitle: 'A walking song where hunger means two hungers',
    classLevel: 12, subject: 'hin_a', topic: 'बारहमासा · Part 1/3',
    chapters: ['c12_hin_a_ch07'],
    nodeIds: ['c12_hin_a_cbse_07_001', 'c12_hin_a_cbse_07_002', 'c12_hin_a_cbse_07_003', 'c12_hin_a_cbse_07_004', 'c12_hin_a_cbse_07_005', 'c12_hin_a_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Varkari-tradition reader', intro: 'On the road to Pandharpur, a saint-poet handed the poorest pilgrims a song — and a subtle verdict on orthodoxy.', goal: 'Read Eknath\'s Abhang through the Varkari tradition — folk form carrying devotion and social critique.' },
    discovery: {
        question: 'A pilgrim woman sings to Vitthal of hunger and thirst on the road to Pandharpur — why does an Abhang carry both at once?',
        options: ['Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together', 'Pilgrims just get hungry', 'Folk songs need simple themes', 'Fasting is the ritual'],
        answer: 'Two levels of longing — literal bodily need on the long walk, and spiritual thirst a caste-bound orthodoxy denies; the song is devotion and quiet critique together',
        hook: 'Eknath was a Brahmin who wrote for the marginalised — the Abhang\'s plain Marathi, folk rhythm and a woman\'s voice are the reform, not simplification. This is poetry made to be walked and sung, not recited from a throne.',
    },
    teaching: [
        { title: 'बारहमासा — कवि परिचय और पृष्ठभूमि', text: 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत से फाल्गुन तक) के माध्यम से नायिका के विरह-वेदना, श्रृंगार और प्रकृति-चित्रण को व्यक्त किया जाता है; केशवदास.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'March with the Varkaris: learn what makes an Abhang an Abhang, read hunger as both road and spirit, and hear how a saint smuggled equality into a song.',
        labels: ['बारहमासा — कवि परिचय', 'बारहमासा — पद्यांश-वार भावार्थ', 'बारहमासा — काव्य-संरचना और', 'बारहमासा — केंद्रीय भाव', 'बारहमासा — छंद और', 'बारहमासा — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_002', title: 'बारहमासा — पद्यांश-वार भावार्थ',
          caseStudy: { intro: 'You open your textbook to "बारहमासा" and see 12 stanzas — each named after a Hindu month (चैत, वैशाख, जेठ, etc.). Don\'t start by memorizing meanings.',
            decisions: [{ prompt: '"बारहमासा" के पहले पद्यांश (चैत मास) में सरसों के फूलों और कोकिला की कूक का **शाब्दिक अर्थ** क्या है? केवल शब्दार्थ लिखें, भावार्थ नहीं।', options: [
                { text: '**Correct answer:** सरसों के पीले फूल खिले हैं और कोयल मीठी आवाज़ में कूक रही है', outcome: '**Correct answer:** सरसों के पीले फूल खिले हैं और कोयल मीठी आवाज़ में कूक रही है — यह वसंत ऋतु का.' },
                { text: 'नायिका को विरह की पीड़ा हो रही है', outcome: 'Not quite — **Students treat each stanza as an independent "nature description" to be memorized separately.**.', reveals: 'students-treat-each-stanza-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a folk-style music video of a woman waiting through the night for someone who doesn\'t come. A teammate wants to cut the repeated shots — lamp, doorway, her face — because \'repetition is dead screen time.\'',
            decisions: [{ prompt: 'What does Mahadevi Verma\'s \'बारहमासा\'-style waiting poem say?', options: [
                { text: 'Keep the repeats — in the poem each stanza\'s return to lamp, night and call is the waiting itself; repetition isn\'t filler, it\'s the heartbeat, and each recurrence shifts from active seeking to inward endurance as the night deepens.', outcome: 'The chapter\'s point: in folk narrative the structure IS the emotion — time passing is the plot, and only the repeated images let the viewer feel its weight.' },
                { text: 'Cut them — montage it once and move on; viewers understand waiting from a single shot.', outcome: 'One shot conveys \'she waited\' as information; the poem\'s layered returns make the waiting an experience — the difference between being told a night passed and watching it refuse to pass.', reveals: 'repetition-is-filler' },
                { text: 'Keep one repeat at the end for rhythm but tighten the middle.', outcome: 'The poem needs the middle repetitions most — that\'s where \'the day passed, the night didn\'t\' stretches external time into her subjective endurance; trimming there trims the tension\'s source.', reveals: 'repeat-only-at-end' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a pilgrimage song as social reform in folk metre — Bhakti that walks, sings and quietly levels.',
            decisions: [{ prompt: 'What comes next? बारहमासा · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बारहमासा · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_001', difficulty: 'standard',
          question: 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह.',
          hint: 'यदि अटका हुआ महसूस हो तो c11_hin_a_cbse_13_004 (केंद्रीय भाव और रस — जाग तुझको दूर जाना).',
          misconception: 'छात्र अक्सर समझते हैं कि **बारहमासा = केवल १२ महीनों का मौसम-वर्णन** है। वे भूल जाते हैं कि केशवदास ने प्रत्येक महीने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत',
                  options: ['बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**', 'बारहमासा कविता का केंद्रीय भाव वह मुख्य भाव है जो सभी बारह महीनों के वर्णन से उत्पन्न'],
                  hint: 'यदि अटका हुआ महसूस हो तो c11_hin_a_cbse_13_004 (केंद्रीय भाव और रस — जाग तुझको दूर जाना) और.',
                  misconception: 'छात्र अक्सर समझते हैं कि **बारहमासा = केवल १२ महीनों का मौसम-वर्णन** है। वे भूल जाते हैं कि केशवदास ने प्रत्येक महीने को **नायिका के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: छात्र से कहें — "किसी एक महीने (जैसे सावन) का पद्य फिर से पढ़ो और तीन कॉलम बनाओ: (अ) मौसम/प्रकृति क्या है?', '(ब) नायिका क्या कर/कह रही है?', '(स) प्रिय कहाँ है?" चरण २: यदि कॉलम (स) खाली है या \'नहीं लिखा\' है, तो समझाएँ कि **यही बारहमासा का केंद्रीय तनाव है**।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_002', difficulty: 'standard',
          question: '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of.',
          hint: 'If stuck on separating literal vs implied meaning: Revisit **c11_hin_a_cbse_13_002 (जाग.',
          misconception: '**Students treat each stanza as an independent "nature description" to be memorized separately.** They make flashcards.',
          parts: [
                { id: 'a', prompt: '"बारहमासा" के पहले पद्यांश (चैत मास) में सरसों के फूलों और कोकिला की कूक का **शाब्दिक अर्थ** क्या है? केवल शब्दार्थ लिखें, भावार्थ नहीं।', answer: '**Correct answer:** सरसों के पीले फूल खिले हैं और कोयल मीठी आवाज़ में कूक रही है',
                  options: ['**Correct answer:** सरसों के पीले फूल खिले हैं और कोयल मीठी आवाज़ में कूक रही है', 'नायिका को विरह की पीड़ा हो रही है'],
                  hint: 'If stuck on separating literal vs implied meaning: Revisit **c11_hin_a_cbse_13_002 (जाग तुझको दूर.',
                  misconception: '**Students treat each stanza as an independent "nature description" to be memorized separately.** They make flashcards: "चैत = सरसों.' },
                { id: 'b', prompt: 'आषाढ़ मास के पद्यांश में "घन गरजत, बिजली चमकत" — इस बिंब का प्रयोग नायिका के किस मनोभाव को व्यक्त करने के लिए किया गया है? पद्यांश के आधार पर स्पष्ट करें।', answer: '**Correct answer:** बादलों की गर्जना और बिजली की चमक नायिका के **हृदय में उठती',
                  options: ['**Correct answer:** बादलों की गर्जना और बिजली की चमक नायिका के **हृदय में उठती', 'वर्षा ऋतु आ गई है'],
                  hint: 'If stuck on separating literal vs implied meaning: Revisit **c11_hin_a_cbse_13_002 (जाग तुझको दूर.',
                  misconception: '**Students treat each stanza as an independent "nature description" to be memorized separately.** They make flashcards: "चैत = सरसों.' },
                { id: 'c', prompt: 'क्वार (आश्विन) और कार्तिक मास के पद्यांशों में प्रकृति वर्णन में क्या **मूलभूत अंतर** है? यह अंतर नायिका की मनःस्थिति में किस परिवर्तन को दर्शाता है?', answer: '**Correct answer:** क्वार में "शशि शीतल, कमल खिले"',
                  options: ['**Correct answer:** क्वार में "शशि शीतल, कमल खिले"', 'शशि शीतल, कमल खिले', 'दीप मालिका, रजनी उज्ज्वल'],
                  hint: 'If stuck on separating literal vs implied meaning: Revisit **c11_hin_a_cbse_13_002 (जाग तुझको दूर.',
                  misconception: '**Students treat each stanza as an independent "nature description" to be memorized separately.** They make flashcards: "चैत = सरसों.' }
          ],
            remediations: { 'students-treat-each-stanza-as': { steps: ['** Take a blank A4 sheet. Draw a **timeline of 12 months** horizontally. **', '** For each month, write **only 2 things**: (a) One dominant nature image (e.g., चैत → सरसों/कोकिला), (b) One emotion.', '** Now draw **arrows between months** showing emotional shifts: चैत (आशा) → वैशाख (व्याकुलता) → जेठ (दाह) → आषाढ़.', '** Re-read **only the first and last stanza**. Ask: "What changed?" Write 3 sentences. **'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students treat each stanza as an independent "nature description" to be memorized separately.** They make flashcards.',
          parts: [
                { id: 'a', prompt: 'पौष मास के पद्यांश में "शिशिर व्याप्त, हिम गिरत" — कवि ने अत्यधिक शीत का वर्णन नायिका के विरह से जोड़ने के लिए **कौन-सी काव्य युक्ति** का प्रयोग किया है?', answer: '**Correct answer:** **उपमा अलंकार** (explicit simile)',
                  options: ['**Correct answer:** **उपमा अलंकार** (explicit simile)', 'हिम गिरत ज्यों विरह अग्नि तनु तपत', 'रूपक अलंकार', 'अनुप्रास'],
                  hint: 'If stuck on separating literal vs implied meaning: Revisit **c11_hin_a_cbse_13_002 (जाग तुझको दूर.',
                  misconception: '**Students treat each stanza as an independent "nature description" to be memorized separately.** They make flashcards: "चैत = सरसों.' }
          ],
            remediations: { 'students-treat-each-stanza-as': { steps: ['** Take a blank A4 sheet. Draw a **timeline of 12 months** horizontally. **', '** For each month, write **only 2 things**: (a) One dominant nature image (e.g., चैत → सरसों/कोकिला), (b) One emotion.', '** Now draw **arrows between months** showing emotional shifts: चैत (आशा) → वैशाख (व्याकुलता) → जेठ (दाह) → आषाढ़.', '** Re-read **only the first and last stanza**. Ask: "What changed?" Write 3 sentences. **'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_003', difficulty: 'standard',
          question: '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण** — पदों का.',
          hint: 'अगर अटके: c12_hin_a_cbse_07_002 दोहराओ + कक्षा 11 के c11_hin_a_cbse_13_003 (जाग तुझको दूर.',
          misconception: '**विशिष्ट भ्रम**: विद्यार्थी समझते हैं कि **"काव्य-संरचना = छंद नाम बताना"**। **वास्तविकता**: संरचना = **पद-योजना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**',
                  options: ['**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', 'बारहमासा कविता का केंद्रीय भाव वह मुख्य भाव है जो सभी बारह महीनों के वर्णन से उत्पन्न'],
                  hint: 'अगर अटके: c12_hin_a_cbse_07_002 दोहराओ + कक्षा 11 के c11_hin_a_cbse_13_003 (जाग तुझको दूर जाना.',
                  misconception: '**विशिष्ट भ्रम**: विद्यार्थी समझते हैं कि **"काव्य-संरचना = छंद नाम बताना"**। **वास्तविकता**: संरचना = **पद-योजना + भाव-क्रम.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: विद्यार्थी को **कविता जोर से पढ़वाओ** — 2 बार, लय पकड़ने तक। **चरण 2**: **कागज पर 12 खाने बनवाओ** — हर खाने.', 'अगर क्रम बदल दें तो क्या होगा?" — **यही संरचना-विश्लेषण है**। **पुनः निदान**: DIAGNOSTIC_QUESTION_2 और 5 फिर से पूछो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_004', difficulty: 'standard',
          question: 'बारहमासा कविता का केंद्रीय भाव वह मुख्य भाव है जो सभी बारह महीनों के वर्णन से.',
          hint: 'यदि छात्र केंद्रीय भाव और किसी एक महीने के भाव में अंतर नहीं कर पा रहा है, तो उसे.',
          misconception: 'छात्र अक्सर सोचते हैं कि बारहमासा कविता का केंद्रीय भाव वह भाव है जो किसी एक विशिष्ट महीने (जैसे श्रावण या कार्तिक) में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बारहमासा कविता का केंद्रीय भाव वह मुख्य भाव है जो सभी बारह महीनों के वर्णन से उत्पन्न',
                  options: ['बारहमासा कविता का केंद्रीय भाव वह मुख्य भाव है जो सभी बारह महीनों के वर्णन से उत्पन्न', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**'],
                  hint: 'यदि छात्र केंद्रीय भाव और किसी एक महीने के भाव में अंतर नहीं कर पा रहा है, तो उसे.',
                  misconception: 'छात्र अक्सर सोचते हैं कि बारहमासा कविता का केंद्रीय भाव वह भाव है जो किसी एक विशिष्ट महीने (जैसे श्रावण या कार्तिक) में सबसे अधिक तीव्रता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले बारहमासा कविता के सभी बारह महीनों की एक सूची बनवाई जाए, फिर प्रत्येक महीने के सामने वह भाव लिखने के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_005', difficulty: 'standard',
          question: 'बारहमासा में छंद और लय-विधान का अर्थ है कविता के प्रत्येक पद्य में akshar और.',
          hint: 'matra की गणना में कठिनाई होने पर, c11_hin_a_cbse_07_005 (Class 11 में बारहमासा का छंद) पर.',
          misconception: 'छात्र अक्सर मानते हैं कि बारहमासा का छंद akshar की संख्या से निर्धारित होता है क्योंकि वे शब्दों को पढ़ते समय matra की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बारहमासा में छंद और लय-विधान का अर्थ है कविता के प्रत्येक पद्य में akshar और matra की',
                  options: ['बारहमासा में छंद और लय-विधान का अर्थ है कविता के प्रत्येक पद्य में akshar और matra की', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**'],
                  hint: 'matra की गणना में कठिनाई होने पर, c11_hin_a_cbse_07_005 (Class 11 में बारहमासा का छंद) पर वापस जाकर.',
                  misconception: 'छात्र अक्सर मानते हैं कि बारहमासा का छंद akshar की संख्या से निर्धारित होता है क्योंकि वे शब्दों को पढ़ते समय matra की बजाय akshar देखते.' }
          ],
            remediations: { 'akshar-matra-akshar-2-akshar': { steps: ['छात्र को 먼저 एक सरल शब्द दें जैसे "घी" (घी = 2 matra) और पूछें कि इसे कैसे बोला जाता है; फिर धीरे-धीरे जटिल शब्द जैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_07_006', difficulty: 'standard',
          question: 'अलंकार (Alankar) काव्य में शब्दों या अर्थों की वह विशेष योजना है जो काव्य की.',
          hint: 'If stuck on identifying alankar type, revisit **upama vs rupak vs utpreksha decision.',
          misconception: 'Students memorise alankar definitions as isolated labels ("Anupras = repetition of varna") but **fail to see alankars.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार (Alankar) काव्य में शब्दों या अर्थों की वह विशेष योजना है जो काव्य की शोभा बढ़ाती',
                  options: ['अलंकार (Alankar) काव्य में शब्दों या अर्थों की वह विशेष योजना है जो काव्य की शोभा बढ़ाती', 'बारहमासा हिन्दी साहित्य की एक प्रसिद्ध काव्य-परम्परा है जिसमें वर्ष के बारह महीनों (चैत', '"पद्यांश-वार भावार्थ" means the **stanza-by-stanza detailed explanation** of a poem,', '**काव्य-संरचना** का अर्थ है कविता के **भीतरी ढाँचे का विश्लेषण**'],
                  hint: 'If stuck on identifying alankar type, revisit **upama vs rupak vs utpreksha decision tree**: (1).',
                  misconception: 'Students memorise alankar definitions as isolated labels ("Anupras = repetition of varna") but **fail to see alankars operating.' }
          ],
            remediations: { 'students-memorise-alankar-definitions-as': { steps: ['Re-read c12_hin_a_cbse_07_002 (पद्यांश-वार भावार्थ) for the *exact pada* where the alankar appears — meaning clarity.', 'Take one pada (e.g., शरद्), write each line on a separate slip, colour-code: **red = shabdalankar, blue = arthalankar.', 'For each coloured segment, speak aloud: "Name → Quote → Why this name → Effect on ras/imagery." 4.', 'Re-attempt Diagnostic Q4 & Q5; if still scoring < 3/5, revisit c11_hin_a_cbse_13_006 (जाग तुझको दूर जाना — अलंकार).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
