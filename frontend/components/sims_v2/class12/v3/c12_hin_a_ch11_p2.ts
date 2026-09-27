import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch11_p2: SimDef = {
    id: 'v3_c12_hin_a_ch11_p2',
    title: 'सुमरिनिी के मनके · Part 2/3',
    subtitle: 'Three stories, one evolving conscience',
    classLevel: 12, subject: 'hin_a', topic: 'सुमरिनिी के मनके · Part 2/3',
    chapters: ['c12_hin_a_ch11'],
    nodeIds: ['c12_hin_a_cbse_11_007', 'c12_hin_a_cbse_11_008', 'c12_hin_a_cbse_11_009', 'c12_hin_a_cbse_11_010', 'c12_hin_a_cbse_11_011', 'c12_hin_a_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Premchand scholar', intro: 'A village schoolteacher who resigned for the nation wrote India\'s conscience in three registers — hope, grit and moral courage.', goal: 'Situate Lajwanti, Kafan and Maine Kaha Tha within Premchand\'s creative periods and nationalist arc.' },
    discovery: {
        question: 'One author writes \'Lajwanti,\' \'Kafan\' and \'Maine Kaha Tha\' — reformist hope in one, bitter disillusion in another. What changed between them?',
        options: ['His periods — the early didactic reformer of 1903 became, by the Madhuri years, a structurally critical writer who\'d resigned his post for the nationalist cause and saw deeper than individual failing', 'Different ghostwriters', 'He aged, nothing more', 'Stories vary randomly'],
        answer: 'His periods — the early didactic reformer of 1903 became, by the Madhuri years, a structurally critical writer who\'d resigned his post for the nationalist cause and saw deeper than individual failing',
        hook: 'Reading all three as \'social reform tales\' flattens his evolution — Kafan\'s Ghisu-Madhav aren\'t just poor, they\'re a verdict on a system. And his nine-language reach lives inside the prose: rustic village speech beside Sanskritised commentary is strategy, not inconsistency.',
    },
    teaching: [
        { title: 'सुमरिनिी के मनके — गौण विषय', text: 'गौण विषय वह आधारभूत विचार या संदेश है जो मुख्य विषय को सपोर्ट करता है, सीधे-केंद्रित नहीं बल्कि अप्रत्यक्ष रूप से पात्रों, घटनाओं या संवादों के माध्यम से उभरता है, और कहानी की गहराई और बहुआयामीता.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read Premchand across his own evolution: separate the reformer\'s hope from the disillusioned analyst, weigh resignation as authorial act, and test whether education alone transforms material life.',
        labels: ['सुमरिनिी के मनके —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school internship, a tribal scholarship boy refuses to recite the expected answers or name the textbook he was handed — he just says he belongs to the wild and slips away. The staff room has already filed him as \'difficult, unteachable.\'',
            decisions: [{ prompt: 'What does the story \'बालक बच गया\' read in his refusal?', options: [
                { text: 'A climax of self-keeping — the boy\'s defiant \'I am a wild one\' is the peak the questioning was building toward, and his \'Yaw\' and escape release it; the file on him reads defiance where the story reads a child refusing to be renamed by the institution.', outcome: 'The chapter\'s structural point: the struggle scenes rise toward the refusal, not the obedience — so \'unteachable\' records the school\'s failure to see what his refusal was protecting.' },
                { text: 'Side with the staff — he won\'t answer, so the verdict of \'unteachable\' is a fair label.', outcome: 'The story treats the interrogation itself as the problem: the adults\' questions measure him against a script he never agreed to, so his silence is evidence of the script\'s failure, not his.', reveals: 'noncompliance-equals-inability' },
                { text: 'Coach him to give the expected answers so he can get through and leave.', outcome: 'That\'s the assimilation route the story\'s climax rejects — his escape with identity intact is the \'bach gaya\' the title means; coaching him to recite would be the institution winning after all.', reveals: 'compliance-equals-survival' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now track a writer\'s changing lens across a career — and hear the difference between reforming a society and indicting it.',
            decisions: [{ prompt: 'What comes next? सुमरिनिी के मनके · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — सुमरिनिी के मनके · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_007', difficulty: 'standard',
          question: 'गौण विषय वह आधारभूत विचार या संदेश है जो मुख्य विषय को सपोर्ट करता है.',
          hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो, तो c12_hin_a_cbse_11_006 (मुख्य विषय और संदेश) नोड.',
          misconception: 'छात्र अक्सर गौण विषय को मुख्य विषय का \'उप-विषय\' या \'घटक\' मानते हैं, जैसे कि यदि मुख्य विषय \'संघर्ष\' है तो गौण विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय वह आधारभूत विचार या संदेश है जो मुख्य विषय को सपोर्ट करता है, सीधे-केंद्रित नहीं',
                  options: ['गौण विषय वह आधारभूत विचार या संदेश है जो मुख्य विषय को सपोर्ट करता है, सीधे-केंद्रित नहीं', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा'],
                  hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो, तो c12_hin_a_cbse_11_006 (मुख्य विषय और संदेश) नोड पर वापस.',
                  misconception: 'छात्र अक्सर गौण विषय को मुख्य विषय का \'उप-विषय\' या \'घटक\' मानते हैं, जैसे कि यदि मुख्य विषय \'संघर्ष\' है तो गौण विषय सिर्फ \'संघर्ष के प्रकार\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र गौण विषय को मुख्य विषय का mere subset मान रहे हैं, तो उन्हें इस अभ्यास से शुरू करवाइए: (1) पाठ से एक ऐसा क्षण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_008', difficulty: 'standard',
          question: 'बिंब वह शब्द या वाक्यांश है जो पाठ में किसी वस्तु, व्यक्ति या भावना की स्पष्ट.',
          hint: 'यदि फंसे तो Class 11 के अलंकार (बिंब और रूपक) के podstawिक definiions को दोहराएँ।',
          misconception: 'छात्र अक्सर मानते हैं कि बिंब और रूपक एक ही चीज़ हैं क्योंकि दोनों में "तुलना" या "चित्रण" शामिल होता है, और इसलिए वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब वह शब्द या वाक्यांश है जो पाठ में किसी वस्तु, व्यक्ति या भावना की स्पष्ट,',
                  options: ['बिंब वह शब्द या वाक्यांश है जो पाठ में किसी वस्तु, व्यक्ति या भावना की स्पष्ट,', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा'],
                  hint: 'यदि फंसे तो Class 11 के अलंकार (बिंब और रूपक) के podstawिक definiions को दोहराएँ।',
                  misconception: 'छात्र अक्सर मानते हैं कि बिंब और रूपक एक ही चीज़ हैं क्योंकि दोनों में "तुलना" या "चित्रण" शामिल होता है, और इसलिए वे किसी वाक्य में उपमा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो अलग-अलग वाक्य दीजिए: एक शुद्ध बिंब ("नील आकाश में चमकता सूरज") और एक शुद्ध रूपक ("वह सूरज है")। पहले उनसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_009', difficulty: 'standard',
          question: 'विरोधाभास वह साहित्यिक युक्ति है जिसमें शब्दों का प्रत्यक्ष अर्थ और निहित अर्थ.',
          hint: 'यदि फंस रहे हैं, तो c12_hin_a_cbse_11_008 (बिंब और रूपक) की समीक्षा करें, क्योंकि.',
          misconception: 'छात्र अक्सर विरोधाभास को केवल वाक्य के शब्दों के उल्टा अर्थ (जैसे "अच्छा" कहकर "बुरा" मतलब लेना) मान लेते हैं, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास वह साहित्यिक युक्ति है जिसमें शब्दों का प्रत्यक्ष अर्थ और निहित अर्थ एक-दूसरे',
                  options: ['विरोधाभास वह साहित्यिक युक्ति है जिसमें शब्दों का प्रत्यक्ष अर्थ और निहित अर्थ एक-दूसरे', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा'],
                  hint: 'यदि फंस रहे हैं, तो c12_hin_a_cbse_11_008 (बिंब और रूपक) की समीक्षा करें, क्योंकि विरोधाभास अक्सर.',
                  misconception: 'छात्र अक्सर विरोधाभास को केवल वाक्य के शब्दों के उल्टा अर्थ (जैसे "अच्छा" कहकर "बुरा" मतलब लेना) मान लेते हैं, जबकि सुमरिनिी के मनके में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहिए: "इस वाक्य को दो बार पढ़िए—एक बार सिर्फ शब्दों के अनुसार, दूसरी बार पात्र की आँखों, हाथों और surroundings.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द उन महत्वपूर्ण शब्दों को कहते हैं जो पाठ के केंद्रीय विषय.',
          hint: 'यदि फंसे तो पाठ के कथानक-संरचना (c12_hin_a_cbse_11_002) और प्रमुख पात्र-चित्रण.',
          misconception: 'छात्र अक्सर मुख्य शब्दों को केवल उनके शब्दकोश अर्थ तक सीमित रखते हैं और पाठ के संदर्भ में उनके भावात्मक, प्रतीकात्मक या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द उन महत्वपूर्ण शब्दों को कहते हैं जो पाठ के केंद्रीय विषय, भाव या संदेश',
                  options: ['पदावली: मुख्य शब्द उन महत्वपूर्ण शब्दों को कहते हैं जो पाठ के केंद्रीय विषय, भाव या संदेश', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा'],
                  hint: 'यदि फंसे तो पाठ के कथानक-संरचना (c12_hin_a_cbse_11_002) और प्रमुख पात्र-चित्रण.',
                  misconception: 'छात्र अक्सर मुख्य शब्दों को केवल उनके शब्दकोश अर्थ तक सीमित रखते हैं और पाठ के संदर्भ में उनके भावात्मक, प्रतीकात्मक या द्विआर्थी अर्थ को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ से एक वाक्य देकर पूछिए कि इस वाक्य में कौन सा शब्द भाव सबसे अधिक ले रहा है और क्यों; फिर शब्दकोश अर्थ और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग से तात्पर्य उस पाठ में प्रयुक्त हिन्दी व्याकरण के नियमों.',
          hint: 'यदि छात्र समास के प्रकारों की पहचान में भ्रमित है, तो वे c11_hin_a_cbse_11_011節を復習し、特に.',
          misconception: 'छात्र frecuentemente यह मानते हैं कि यदि दो शब्द एक साथ लिखे गए हैं (जैसे \'सुमरिनिी\'), तो उनका अवश्य कोई समास होगा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग से तात्पर्य उस पाठ में प्रयुक्त हिन्दी व्याकरण के नियमों, जैसे संधि,',
                  options: ['पाठ में भाषा-प्रयोग से तात्पर्य उस पाठ में प्रयुक्त हिन्दी व्याकरण के नियमों, जैसे संधि,', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा'],
                  hint: 'यदि छात्र समास के प्रकारों की पहचान में भ्रमित है, तो वे c11_hin_a_cbse_11_011節を復習し、特に तत्पुरुष और.',
                  misconception: 'छात्र frecuentemente यह मानते हैं कि यदि दो शब्द एक साथ लिखे गए हैं (जैसे \'सुमरिनिी\'), तो उनका अवश्य कोई समास होगा — जबकि वास्तव में, कुछ.' }
          ],
            remediations: { 'frecuentemente': { steps: ['छात्र को दिखाइए कि शब्दकोश में \'सुमरिनिी\' कैसे दिया गया है — यदि यह एक अटूट शब्द (अव्यय) के रूप में आता है, तो сначала.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ बोध-प्रश्न वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्टतः दिए गए तथ्यों.',
          hint: 'यदि प्रतीक-व्याख्या में अटके तो **c12_hin_a_cbse_11_008 (बिंब-रूपक) और.',
          misconception: '**विशिष्ट भ्रांति:** *"आशय-सूचक प्रश्न का उत्तर देने के लिए पाठ की पंक्तियाँ याद करके उद्धृत करना ही पर्याप्त है; अपनी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ बोध-प्रश्न वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्टतः दिए गए तथ्यों, घटनाओं,',
                  options: ['वस्तुनिष्ठ बोध-प्रश्न वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्टतः दिए गए तथ्यों, घटनाओं,', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा'],
                  hint: 'यदि प्रतीक-व्याख्या में अटके तो **c12_hin_a_cbse_11_008 (बिंब-रूपक) और c12_hin_a_cbse_11_009.',
                  misconception: '**विशिष्ट भ्रांति:** *"आशय-सूचक प्रश्न का उत्तर देने के लिए पाठ की पंक्तियाँ याद करके उद्धृत करना ही पर्याप्त है; अपनी व्याख्या लिखने की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें — "एक आशय-सूचक प्रश्न चुनो जिसका उत्तर तुमने केवल उद्धरण देकर दिया हो।" **चरण 2:** उससे पूछें.', 'यदि नहीं, तो c12_hin_a_cbse_11_008 (बिंब-रूपक) और c12_hin_a_cbse_11_009 (विरोधाभास-प्रतीक) दोबारा पढ़ें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
