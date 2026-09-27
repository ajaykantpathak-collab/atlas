import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch11_p1: SimDef = {
    id: 'v3_c12_hin_a_ch11_p1',
    title: 'सुमरिनिी के मनके · Part 1/3',
    subtitle: 'Three stories, one evolving conscience',
    classLevel: 12, subject: 'hin_a', topic: 'सुमरिनिी के मनके · Part 1/3',
    chapters: ['c12_hin_a_ch11'],
    nodeIds: ['c12_hin_a_cbse_11_001', 'c12_hin_a_cbse_11_002', 'c12_hin_a_cbse_11_003', 'c12_hin_a_cbse_11_004', 'c12_hin_a_cbse_11_005', 'c12_hin_a_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Premchand scholar', intro: 'A village schoolteacher who resigned for the nation wrote India\'s conscience in three registers — hope, grit and moral courage.', goal: 'Situate Lajwanti, Kafan and Maine Kaha Tha within Premchand\'s creative periods and nationalist arc.' },
    discovery: {
        question: 'One author writes \'Lajwanti,\' \'Kafan\' and \'Maine Kaha Tha\' — reformist hope in one, bitter disillusion in another. What changed between them?',
        options: ['His periods — the early didactic reformer of 1903 became, by the Madhuri years, a structurally critical writer who\'d resigned his post for the nationalist cause and saw deeper than individual failing', 'Different ghostwriters', 'He aged, nothing more', 'Stories vary randomly'],
        answer: 'His periods — the early didactic reformer of 1903 became, by the Madhuri years, a structurally critical writer who\'d resigned his post for the nationalist cause and saw deeper than individual failing',
        hook: 'Reading all three as \'social reform tales\' flattens his evolution — Kafan\'s Ghisu-Madhav aren\'t just poor, they\'re a verdict on a system. And his nine-language reach lives inside the prose: rustic village speech beside Sanskritised commentary is strategy, not inconsistency.',
    },
    teaching: [
        { title: 'सुमरिनिी के मनके — पृष्ठभूमि और रचनाकार परिचय', text: '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास** है जो बुंदेलखंड के ग्रामीण जीवन, स्त्री-संघर्ष और लोक-संस्कृति को आत्मकथात्मक शैली में प्रस्तुत करता है.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read Premchand across his own evolution: separate the reformer\'s hope from the disillusioned analyst, weigh resignation as authorial act, and test whether education alone transforms material life.',
        labels: ['सुमरिनिी के मनके —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school internship, a tribal scholarship boy refuses to recite the expected answers or name the textbook he was handed — he just says he belongs to the wild and slips away. The staff room has already filed him as \'difficult, unteachable.\'',
            decisions: [{ prompt: 'What does the story \'बालक बच गया\' read in his refusal?', options: [
                { text: 'A climax of self-keeping — the boy\'s defiant \'I am a wild one\' is the peak the questioning was building toward, and his \'Yaw\' and escape release it; the file on him reads defiance where the story reads a child refusing to be renamed by the institution.', outcome: 'The chapter\'s structural point: the struggle scenes rise toward the refusal, not the obedience — so \'unteachable\' records the school\'s failure to see what his refusal was protecting.' },
                { text: 'Side with the staff — he won\'t answer, so the verdict of \'unteachable\' is a fair label.', outcome: 'The story treats the interrogation itself as the problem: the adults\' questions measure him against a script he never agreed to, so his silence is evidence of the script\'s failure, not his.', reveals: 'noncompliance-equals-inability' },
                { text: 'Coach him to give the expected answers so he can get through and leave.', outcome: 'That\'s the assimilation route the story\'s climax rejects — his escape with identity intact is the \'bach gaya\' the title means; coaching him to recite would be the institution winning after all.', reveals: 'compliance-equals-survival' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now track a writer\'s changing lens across a career — and hear the difference between reforming a society and indicting it.',
            decisions: [{ prompt: 'What comes next? सुमरिनिी के मनके · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — सुमरिनिी के मनके · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_001', difficulty: 'standard',
          question: '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक.',
          hint: 'यदि अंचलिक उपन्यास की अवधारणा अस्पष्ट है, तो कक्षा 11 के नोड **c11_hin_al_cbse_01_001**.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'सुमिरनी\' कोई पात्र (चरित्र) है जिसकी कहानी है — जबकि **\'सुमिरनी\' स्वयं रचनाकार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**',
                  options: ['\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा', 'नायक/प्रमुख पात्र वह मुख्य पात्र है जिसकी यात्रा, संघर्ष और विकास कहानी के केंद्रीय विषय'],
                  hint: 'यदि अंचलिक उपन्यास की अवधारणा अस्पष्ट है, तो कक्षा 11 के नोड **c11_hin_al_cbse_01_001** (हुसैन की.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'सुमिरनी\' कोई पात्र (चरित्र) है जिसकी कहानी है — जबकि **\'सुमिरनी\' स्वयं रचनाकार मैत्रेयी पुष्पा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "पाठ के पहले पृष्ठ (भूमिका/प्रस्तावना) को दोबारा पढ़ें और ढूंढें: \'मैं\' सर्वनाम कहाँ-कहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_002', difficulty: 'standard',
          question: '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि.',
          hint: 'यदि \'फ्लैशबैक\' और \'स्मृति-प्रवाह\' में अंतर अस्पष्ट हो तो c11_hin_a_cbse_11_002 के.',
          misconception: 'छात्र प्रायः \'कथानक\' और \'आख्यान-संरचना\' को पर्यायवाची मानते हैं और परीक्षा में दोनों के लिए एक ही उत्तर लिख देते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि',
                  options: ['\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा', 'नायक/प्रमुख पात्र वह मुख्य पात्र है जिसकी यात्रा, संघर्ष और विकास कहानी के केंद्रीय विषय'],
                  hint: 'यदि \'फ्लैशबैक\' और \'स्मृति-प्रवाह\' में अंतर अस्पष्ट हो तो c11_hin_a_cbse_11_002 के कार्य-उदाहरण 2 और.',
                  misconception: 'छात्र प्रायः \'कथानक\' और \'आख्यान-संरचना\' को पर्यायवाची मानते हैं और परीक्षा में दोनों के लिए एक ही उत्तर लिख देते हैं — \'कहानी में क्या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — \'पाठ को दो रंगों के पेन से पढ़ें: एक रंग से वर्तमान के वाक्य रेखांकित करें, दूसरे से अतीत/स्मृति.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई.',
          hint: 'यदि अवधारणा स्पष्ट नहीं हो रही है, तो Class 11 के पाठ 3 (c11_hin_a_cbse_03_003) में.',
          misconception: 'छात्र अक्सर पाठ्य-परिवेश और वातावरण को एक ही चीज़ मान लेते हैं, या यह सोचते हैं कि यदि पाठ्य-परिवेश कड़ा है (जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा',
                  options: ['पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'नायक/प्रमुख पात्र वह मुख्य पात्र है जिसकी यात्रा, संघर्ष और विकास कहानी के केंद्रीय विषय'],
                  hint: 'यदि अवधारणा स्पष्ट नहीं हो रही है, तो Class 11 के पाठ 3 (c11_hin_a_cbse_03_003) में पाठ्य-परिवेश और.',
                  misconception: 'छात्र अक्सर पाठ्य-परिवेश और वातावरण को एक ही चीज़ मान लेते हैं, या यह सोचते हैं कि यदि पाठ्य-परिवेश कड़ा है (जैसे गरीबी, सामाजिक असमानता).' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस भ्रम में फंसे हुए हैं कि कड़ा पाठ्य-परिवेश हमेशा निराशाजनक वातावरण उत्पन्न करता है, तो 다음과 같이 सुधार करें.', 'पाठ से दो विशिष्ट उदाहरण लें: एक जहाँ पात्र स्पष्ट रूप से आर्थिक तनाव में दिख रहा है (जैसे उधार लेने की चिंता), और.', 'पूछें: "इस पहले उदाहरण में क्या भावना dominant है?', 'इस दूसरे में?" जिससे वे देख सकें कि समान पाठ्य-परिवेश में भी वातावरण बदल सकता है। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_004', difficulty: 'standard',
          question: 'नायक/प्रमुख पात्र वह मुख्य पात्र है जिसकी यात्रा, संघर्ष और विकास कहानी के.',
          hint: 'यदि फंसें तो कक्षा 11 के नायक के चित्रण (c11_hin_a_cbse_01_004) की अवधारणा को फिर से.',
          misconception: 'छात्र अक्सर नायक के चित्रण को केवल उसके बाहरी गुणों (जैसे वेशभूषा, बोलने की शैली) तक सीमित रखते हैं, मानते हैं कि ये ही.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'नायक/प्रमुख पात्र वह मुख्य पात्र है जिसकी यात्रा, संघर्ष और विकास कहानी के केंद्रीय विषय',
                  options: ['नायक/प्रमुख पात्र वह मुख्य पात्र है जिसकी यात्रा, संघर्ष और विकास कहानी के केंद्रीय विषय', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा'],
                  hint: 'यदि फंसें तो कक्षा 11 के नायक के चित्रण (c11_hin_a_cbse_01_004) की अवधारणा को फिर से देखें, विशेष.',
                  misconception: 'छात्र अक्सर नायक के चित्रण को केवल उसके बाहरी गुणों (जैसे वेशभूषा, बोलने की शैली) तक सीमित रखते हैं, मानते हैं कि ये ही उसकी पहचान है; यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें कि वह किसी एक दृश्य को चुनें जहां नायक बोल रहा हो, फिर पूछें: "इस बोलने के पीछे क्या डर या आशा छिपी हो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_005', difficulty: 'standard',
          question: 'सहायक पात्र वे गौण चरित्र होते हैं जो मुख्य पात्र (सुमरिनी) के साथ संवाद.',
          hint: 'यदि फॉयल (foil) की अवधारणा स्पष्ट न हो — कक्षा 11 अंतरा पाठ 1/2/3 के सहायक पात्र नोड.',
          misconception: 'छात्र समझते हैं कि \'सहायक पात्र\' का अर्थ है \'कम महत्वपूर्ण पात्र\' — इसलिए वे माँ/सास के संवादों को रट लेते हैं लेकिन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे गौण चरित्र होते हैं जो मुख्य पात्र (सुमरिनी) के साथ संवाद, व्यवहार या',
                  options: ['सहायक पात्र वे गौण चरित्र होते हैं जो मुख्य पात्र (सुमरिनी) के साथ संवाद, व्यवहार या', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा'],
                  hint: 'यदि फॉयल (foil) की अवधारणा स्पष्ट न हो — कक्षा 11 अंतरा पाठ 1/2/3 के सहायक पात्र नोड.',
                  misconception: 'छात्र समझते हैं कि \'सहायक पात्र\' का अर्थ है \'कम महत्वपूर्ण पात्र\' — इसलिए वे माँ/सास के संवादों को रट लेते हैं लेकिन **उन संवादों के पीछे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['पाठ से माँ/सास/पड़ोसिन के **सटीक 3-3 संवाद** निकालकर अलग कागज़ पर लिखें। 2.', 'प्रत्येक संवाद के आगे लिखें: "यह संवाद पितृसत्ता के किस नियम को लागू करता है?" 3.', 'फिर पूछें: "सुमरिनी इस नियम को मानती है या तोड़ती है?" 4.', 'इस तालिका को नोड 004 (नायक चरित्र-चित्रण) के साथ मिलाकर देखें — कहाँ सुमरिनी सहायक पात्र की बात मानती है, कहाँ विद्रोह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरी रचना.',
          hint: 'यदि विषय पहचानने में अटके, तो c12_hin_a_cbse_11_002 (कथानक) के \'प्रमुख मोड़\' और.',
          misconception: 'छात्र अक्सर **\'कथानक के प्रमुख प्रसंग\' को \'मुख्य विषय\' मान लेते हैं** — जैसे \'सुमिरिनी का विधवा होना\', \'मनके टूटना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरी रचना बुनी जाती',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरी रचना बुनी जाती', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा'],
                  hint: 'यदि विषय पहचानने में अटके, तो c12_hin_a_cbse_11_002 (कथानक) के \'प्रमुख मोड़\' और.',
                  misconception: 'छात्र अक्सर **\'कथानक के प्रमुख प्रसंग\' को \'मुख्य विषय\' मान लेते हैं** — जैसे \'सुमिरिनी का विधवा होना\', \'मनके टूटना\', \'गाँव की गरीबी\' को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के तीन सबसे मार्मिक प्रसंग लिखो जहाँ तुम्हें कुछ \'चुभा\' हो।" 2.', 'फिर पूछें: "इन तीनों में कॉमन क्या है — घटना?', 'जब वे \'भाव\' (जैसे: बेबसी, उपेक्षा, टूटन) बताएँ, तब समझाएँ: "यही भाव जब पूरी रचना में व्याप्त हो, वही **मुख्य विषय**.', 'अंत में: "लेखक इस भाव को जगाकर तुमसे क्या करवाना चाहता है?" — वही **संदेश** है। पुनर्निदान हेतु: c12_hin_a_cbse_11_002.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
