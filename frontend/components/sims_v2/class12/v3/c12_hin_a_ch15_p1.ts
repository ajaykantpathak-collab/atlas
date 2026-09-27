import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch15_p1: SimDef = {
    id: 'v3_c12_hin_a_ch15_p1',
    title: 'जहाँ कोई वापसी नहीं · Part 1/3',
    subtitle: 'The survey line was straight; the damage wasn\'t',
    classLevel: 12, subject: 'hin_a', topic: 'जहाँ कोई वापसी नहीं · Part 1/3',
    chapters: ['c12_hin_a_ch15'],
    nodeIds: ['c12_hin_a_cbse_15_001', 'c12_hin_a_cbse_15_002', 'c12_hin_a_cbse_15_003', 'c12_hin_a_cbse_15_004', 'c12_hin_a_cbse_15_005', 'c12_hin_a_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Displacement-narrative reader', intro: 'A dam was drawn on a map; a hundred villages learned they lived inside a line.', goal: 'Read Tedhi Lakeer through development-induced displacement and Renu\'s reportage-fiction method.' },
    discovery: {
        question: 'A surveyor draws a straight red line for a dam across tribal land — on the earth it becomes a crooked scar. Why did Renu name the story \'The Crooked Line\'?',
        options: ['The line is morally crooked — promises run straight, reality bends: the survey ignores contours, villages and consent; development\'s path is crooked because it refuses the land\'s truth', 'The terrain was hilly', 'Surveyors make mistakes', 'A meandering river'],
        answer: 'The line is morally crooked — promises run straight, reality bends: the survey ignores contours, villages and consent; development\'s path is crooked because it refuses the land\'s truth',
        hook: 'This is reportage-fiction about a real wound — the Koel-Karo project threatening 120+ villages. Renu captures the pre-movement moment: resistance raw and leaderless, dismissed as backwardness before it could become an Andolan. The deepest irony — the democratic state itself ran the displacement.',
    },
    teaching: [
        { title: 'जहाँ कोई वापसी नहीं — पृष्ठभूमि और रचनाकार परिचय', text: '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक जीवन, कहानी के लिखे जाने के ऐतिहासिक संदेश, सामाजिक परिस्थितियों और साहित्यिक उद्देश्यों का विस्तृत अध्ययन.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_15_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the Chotanagpur hills before the dam: weigh whose \'development\' submerges whom, compare raw tribal refusal with organised protest, and decode the crooked line\'s triple meaning.',
        labels: ['जहाँ कोई वापसी नहीं'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing a piece on your hometown\'s transformation — the river now a drain, fields under a factory — your editor wants it chronological: \'village past, then highway, then industry, then today.\'',
            decisions: [{ prompt: 'What structure does Renu\'s \'जहाँ कोई वापसी नहीं\' use instead, and why?', options: [
                { text: 'Open in the damaged present, then break into flashes of the lost past with your own commentary between them — the fragmented telling enacts the severed bond between people and land, making the reader live the loss rather than read a progress report.', outcome: 'The chapter\'s point: a linear telling makes change look like neutral sequence; the non-linear juxtaposition of what is against what was is where the critique lives.' },
                { text: 'Go chronological — \'village → factory\' order keeps the article clear and fair to both sides.', outcome: 'Chronology launders the verdict into inevitability; the story opens with the polluted present precisely so the reader enters with the damage already done — \'fair\' sequencing is how loss gets normalised.', reveals: 'chronology-is-neutral' },
                { text: 'Skip the past entirely and report only today\'s conditions — nostalgia is bias.', outcome: 'Without the remembered village the present has no baseline; the story\'s commentary works because the reader holds both timeframes at once — past-only is romance, present-only is bookkeeping.', reveals: 'past-is-bias' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a dam story as an invoice for the city\'s electricity — paid in forests, rivers and a people\'s memory.',
            decisions: [{ prompt: 'What comes next? जहाँ कोई वापसी नहीं · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — जहाँ कोई वापसी नहीं · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_001', difficulty: 'standard',
          question: '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और.',
          hint: 'यदि फंस रहे हों, तो Class 11 के किसी भी पाठ के \'पृष्ठभूमि और रचनाकार परिचय\' नोड (जैसे.',
          misconception: 'छात्र अक्सर सोचते हैं कि \'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में केवल लेखक के जन्म-तिथि, प्रकाशन वर्ष.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक',
                  options: ['\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी', 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक लक्षण, व्यवहार, विचार,'],
                  hint: 'यदि फंस रहे हों, तो Class 11 के किसी भी पाठ के \'पृष्ठभूमि और रचनाकार परिचय\' नोड (जैसे.',
                  misconception: 'छात्र अक्सर सोचते हैं कि \'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में केवल लेखक के जन्म-तिथि, प्रकाशन वर्ष और कुछ सामान्य वाक्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस गलती कर रहा हो, तो उसे बताइए कि पहले वह Krishna Sobti के जीवन की एक विशिष्ट घटना (जैसे उनका पाकिस्तान से.', 'इस 3-चरणीय प्रक्रिया से वह समझ जाएगा कि पृष्ठभूमि कहानी के अर्थ को सक्रिय रूप से आकार देती है, न कि केवल इसे सजाती है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_002', difficulty: 'standard',
          question: 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना.',
          hint: 'यदि छात्र कथानक के चरणों को पहचानने में फंस जाए, तो उसे c11_hin_a_cbse_01_002 पर वापस.',
          misconception: 'छात्र अक्सर कथानक को केवल कहानी में हुई घटनाओं की एक straight list मान लेते हैं, जैसे "पहले यह हुआ, फिर यह, फिर यह".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका',
                  options: ['कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी', 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक लक्षण, व्यवहार, विचार,'],
                  hint: 'यदि छात्र कथानक के चरणों को पहचानने में फंस जाए, तो उसे c11_hin_a_cbse_01_002 पर वापस जाना चाहिए.',
                  misconception: 'छात्र अक्सर कथानक को केवल कहानी में हुई घटनाओं की एक straight list मान लेते हैं, जैसे "पहले यह हुआ, फिर यह, फिर यह" — बिना यह समझे कि इन.' }
          ],
            remediations: { 'straight-list': { steps: ['छात्र से कहिए कि वह कोई एक घटना चुन ले (जैसे किसी पात्र का रोना)। फिर पूछिए: "यदि इस घटना को कहानी से हटा दिया जाए, तो.', 'यदि हाँ, तो कैसे और क्यों?" इस तरह वह देखेगा कि घटनाएँ बस घटित होने वाली बातें नहीं हैं, बल्कि कहानी के अर्थ को आकार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई.',
          hint: 'यदि फंस रहे हैं, तो कक्षा 11 के किसी भी पाठ में पाठ्य-परिवेश और वातावरण (जैसे.',
          misconception: 'छात्र अक्सर यह मान लेते हैं कि पाठ्य-परिवेश केवल कहानी में आने वाले भौतिक विवरणों (जैसे घर का रंग, नदी का नाम, मौसम) को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी',
                  options: ['पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक लक्षण, व्यवहार, विचार,'],
                  hint: 'यदि फंस रहे हैं, तो कक्षा 11 के किसी भी पाठ में पाठ्य-परिवेश और वातावरण (जैसे.',
                  misconception: 'छात्र अक्सर यह मान लेते हैं कि पाठ्य-परिवेश केवल कहानी में आने वाले भौतिक विवरणों (जैसे घर का रंग, नदी का नाम, मौसम) को शामिल करता है, जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि वह अपने own जीवन में एक ऐसी स्थिति याद करे जब वह किसी नए miejscu गया और वहां के अनौपचारिक नियमों को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_004', difficulty: 'standard',
          question: 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक लक्षण, व्यवहार.',
          hint: 'यदि पात्र के आंतरिक संघर्ष को समझने में कठिनाई हो तो c11_hin_a_cbse_04_004 (हुसैन की.',
          misconception: 'छात्र अक्सर सुरेंद्र के चरित्र को केवल उसके अंतिम कार्यों (जैसे पछताना या पकड़ा जाना) के आधार पर आंकते हैं, मानकर चलते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक लक्षण, व्यवहार, विचार,',
                  options: ['पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक लक्षण, व्यवहार, विचार,', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी'],
                  hint: 'यदि पात्र के आंतरिक संघर्ष को समझने में कठिनाई हो तो c11_hin_a_cbse_04_004 (हुसैन की कहानी अपनी.',
                  misconception: 'छात्र अक्सर सुरेंद्र के चरित्र को केवल उसके अंतिम कार्यों (जैसे पछताना या पकड़ा जाना) के आधार पर आंकते हैं, मानकर चलते हैं कि उसका पूरा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस गलती को दूर करने के लिए, छात्र को कहानी को समय-k्रम में विभक्त करने के लिए कहें: (1) सुरेंद्र का प्रारंभिक अवस्था.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो मुख्य नायक या नायिका के साथ कहानी को आगे.',
          hint: 'यदि फंसें तो पात्र-चित्रण: सहायक पात्र (c11_hin_a_cbse_01_005) की कक्षा 11 की आधारभूत समझ.',
          misconception: 'छात्र अक्सर सोचते हैं कि सहायक पात्र का अर्थ केवल \'दूसरे महत्व वाले पात्र\' से है, इसलिए वे उनके नाम, उपस्थिति, और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो मुख्य नायक या नायिका के साथ कहानी को आगे बढ़ाते हैं,',
                  options: ['सहायक पात्र वे पात्र होते हैं जो मुख्य नायक या नायिका के साथ कहानी को आगे बढ़ाते हैं,', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी'],
                  hint: 'यदि फंसें तो पात्र-चित्रण: सहायक पात्र (c11_hin_a_cbse_01_005) की कक्षा 11 की आधारभूत समझ को पुनः.',
                  misconception: 'छात्र अक्सर सोचते हैं कि सहायक पात्र का अर्थ केवल \'दूसरे महत्व वाले पात्र\' से है, इसलिए वे उनके नाम, उपस्थिति, और एक-два लक्षण बताकर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि कैसे एक वाक्य जैसे "रामदीन ईमानदार है" को विश्लेषणात्मक बनाया जाए: पहले उससे पूछिए कि "इस ईमानदारी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_006', difficulty: 'standard',
          question: 'कहानी का मुख्य विषय वह गहरा संदेश या सार्वभौमिक सत्य है जो पात्रों के संघर्ष.',
          hint: 'यदि मुख्य विषय पहचानने में कठिनाई हो तो कथानक संरचना (c12_hin_a_cbse_15_002) और.',
          misconception: 'छात्र अक्सर मुख्य विषय को कहानी के अंत में दिए गए स्पष्ट निष्कर्ष या लेखक के सीधे कथन के रूप में समझते हैं, जैसे कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कहानी का मुख्य विषय वह गहरा संदेश या सार्वभौमिक सत्य है जो पात्रों के संघर्ष, निर्णयों और',
                  options: ['कहानी का मुख्य विषय वह गहरा संदेश या सार्वभौमिक सत्य है जो पात्रों के संघर्ष, निर्णयों और', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी'],
                  hint: 'यदि मुख्य विषय पहचानने में कठिनाई हो तो कथानक संरचना (c12_hin_a_cbse_15_002) और पात्र-चित्रण.',
                  misconception: 'छात्र अक्सर मुख्य विषय को कहानी के अंत में दिए गए स्पष्ट निष्कर्ष या लेखक के सीधे कथन के रूप में समझते हैं, जैसे कि "लेखक ने कहा कि वापस.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कहानी के तीन अलग-अलग हिस्सों (आरंभ, मध्य, अंत) चुनने के लिए कहें जहाँ पात्र फंसे महसूस करते हैं। प्रत्येक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
