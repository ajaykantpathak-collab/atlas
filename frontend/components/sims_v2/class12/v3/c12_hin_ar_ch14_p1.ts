import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch14_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch14_p1',
    title: 'शरिीष के फूल · Part 1/3',
    subtitle: 'The flag was born in a struggle — then the nation stopped looking',
    classLevel: 12, subject: 'hin_ar', topic: 'शरिीष के फूल · Part 1/3',
    chapters: ['c12_hin_ar_ch14'],
    nodeIds: ['c12_hin_ar_cbse_14_001', 'c12_hin_ar_cbse_14_002', 'c12_hin_ar_cbse_14_003', 'c12_hin_ar_cbse_14_004', 'c12_hin_ar_cbse_14_005', 'c12_hin_ar_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Political-essay reader', intro: 'A scholar-activist watches the tricolor fade on a government school roof and reads a whole nation\'s fatigue in it.', goal: 'Read Jhande ki Phool/flag essay as a diagnosis of national morality — symbol versus substance.' },
    discovery: {
        question: 'A poet paints the tricolor with reverence — years later it\'s a torn rag on a rusted pole, used for mundane purposes. Why does the author call the flag a \'living being\'?',
        options: ['Because it has a life-cycle — born in the freedom struggle, aged by neglect; its physical condition is the nation\'s moral condition', 'Flags wear out naturally', 'Poetic exaggeration', 'It moves in wind'],
        answer: 'Because it has a life-cycle — born in the freedom struggle, aged by neglect; its physical condition is the nation\'s moral condition',
        hook: 'The state guards the flag\'s display rules; the author asks whether it still embodies justice — ritualistic patriotism versus ethical substance. For him no science, politics or religion outranks humanity; the flag is a moral contract, not a protocol object.',
    },
    teaching: [
        { title: 'शरिीष के फूल — पृष्ठभूमि और रचनाकार परिचय', text: '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो ग्रामीण भारतीय जीवन की सहजता, परंपराओं की गहराई और आधुनिकता के आघात से उत्पन्न विघटन को लेखक के व्यक्तिगत अनुभवों.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the flag as the nation\'s pulse: trace its arc from tryst-with-destiny to faded neglect, weigh reverence against ritual, and ask what a torn tricolor diagnoses.',
        labels: ['शरिीष के फूल —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college\'s broken hostel bench gets a fresh coat of paint for inspection day — splinters and all — and the warden declares the issue \'resolved.\' The repair request you filed months ago is still \'under process.\'',
            decisions: [{ prompt: 'What does \'फखरुद्दीन की खाट\' see in the painted bench?', options: [
                { text: 'The cot painted by the bureaucrat — surface performance standing in for repair; the story\'s unresolved ending, where the cot never reaches the museum, performs the same deferral your \'under process\' request is trapped in.', outcome: 'The chapter reads the paint as the critique: cosmetic attention is how the system answers demand without meeting it — the structure denies resolution because the institution does.' },
                { text: 'Accept it — at least something visible was done; half a fix beats none.', outcome: 'The story\'s whole satire depends on refusing that bargain: paint over rot is precisely the bureaucrat\'s move — it photographs as action while the object stays broken underneath.', reveals: 'cosmetic-counts-as-fix' },
                { text: 'Treat it as proof the system works — the request clearly reached someone who acted.', outcome: 'Action timed to inspection isn\'t the request being processed; the story distinguishes performance-for-audience from accountability — the file stays open because the gesture closed the matter.', reveals: 'inspection-response-equals-resolution' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a national symbol as a moral diagnostic — and tell display-patriotism from the justice the cloth was meant to carry.',
            decisions: [{ prompt: 'What comes next? शरिीष के फूल · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — शरिीष के फूल · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_001', difficulty: 'standard',
          question: '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध**.',
          hint: 'यदि विधा-भेद अस्पष्ट है, तो तुरंत **c11_hin_ar_cbse_01_001** और.',
          misconception: '**विशिष्ट भ्रांति:** *"शरीष के फूल एक कहानी (short story) है क्योंकि इसमें पात्र, संवाद और घटनाक्रम है।"* **क्यों गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो',
                  options: ['\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है', '\'शरीष के फूल\' कहानी का नायक **शरीष** एक संवेदनशील, स्वाभिमानी और अंतर्मुखी ग्रामीण युवक'],
                  hint: 'यदि विधा-भेद अस्पष्ट है, तो तुरंत **c11_hin_ar_cbse_01_001** और **c11_hin_ar_cbse_02_001** के.',
                  misconception: '**विशिष्ट भ्रांति:** *"शरीष के फूल एक कहानी (short story) है क्योंकि इसमें पात्र, संवाद और घटनाक्रम है।"* **क्यों गलत है:** छात्र.' }
          ],
            remediations: { 'short-story': { steps: ['छात्र को **c11_hin_ar_cbse_01_001** (कक्षा 11 आरोह पाठ 1 — पृष्ठभूमि और रचनाकार परिचय) पर ले जाएँ — वहाँ \'नमक का.', 'उनसे पूछें: *"कहानी में \'कथानक\' प्रधान होता है या \'विचार\'?', 'निबंध में क्या प्रधान होता है?"* — उत्तर लिखवाएँ। 3.', 'फिर \'शरीष के फूल\' का पहला पैराग्राफ पढ़वाएँ और पूछें: *"लेखक यहाँ क्या कर रहे हैं — कहानी सुना रहे हैं या अपना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_002', difficulty: 'standard',
          question: '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि.',
          hint: 'यदि फ्लैशबैक/पूर्वाभास अस्पष्ट हों तो कक्षा ११ के नोड **c11_hin_ar_cbse_14_002** के.',
          misconception: 'छात्र प्रायः समझते हैं कि **\'कथानक = घटनाओं का क्रम\' और \'आख्यान-संरचना = वही क्रम लिखना\'** — यानी दोनों पर्यायवाची हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि',
                  options: ['**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', 'पाठ्य-परिवेश और वातावरण का अर्थ है', '\'शरीष के फूल\' कहानी का नायक **शरीष** एक संवेदनशील, स्वाभिमानी और अंतर्मुखी ग्रामीण युवक'],
                  hint: 'यदि फ्लैशबैक/पूर्वाभास अस्पष्ट हों तो कक्षा ११ के नोड **c11_hin_ar_cbse_14_002** के \'साहित्यिक.',
                  misconception: 'छात्र प्रायः समझते हैं कि **\'कथानक = घटनाओं का क्रम\' और \'आख्यान-संरचना = वही क्रम लिखना\'** — यानी दोनों पर्यायवाची हैं। असल में \'शरीष के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: छात्र से कहें — "पाठ की **१० प्रमुख घटनाएँ** काग़ज़ पर **वास्तविक कालक्रम** (जैसे जीवन में घटीं) में लिखो।" चरण.', 'क्यों?" चरण ४: इस तुलना से निकले अंतर को ही **\'आख्यान-संरचना की युक्ति\'** नाम दें। यदि फिर न समझ आए तो **कक्षा ११ के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण का अर्थ है — कहानी/उपन्यास में वह स्थानिक, कालिक.',
          hint: 'यदि परिवेश के सामाजिक-आर्थिक आयाम पकड़ में न आएँ तो कक्षा 11 के नोड.',
          misconception: 'छात्र अक्सर \'परिवेश\' और \'वातावरण\' को समानार्थी मानकर केवल भौतिक परिवेश (पहाड़, नदी, मौसम) पर लिख देते हैं और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण का अर्थ है',
                  options: ['पाठ्य-परिवेश और वातावरण का अर्थ है', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', '\'शरीष के फूल\' कहानी का नायक **शरीष** एक संवेदनशील, स्वाभिमानी और अंतर्मुखी ग्रामीण युवक'],
                  hint: 'यदि परिवेश के सामाजिक-आर्थिक आयाम पकड़ में न आएँ तो कक्षा 11 के नोड c11_hin_ar_cbse_14_003.',
                  misconception: 'छात्र अक्सर \'परिवेश\' और \'वातावरण\' को समानार्थी मानकर केवल भौतिक परिवेश (पहाड़, नदी, मौसम) पर लिख देते हैं और सामाजिक-सांस्कृतिक-आर्थिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "उपन्यास के किन्हीं दो पन्ने खोलो जहाँ केवल प्रकृति वर्णन न हो, बल्कि लोग बात कर रहे हों, काम कर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_004', difficulty: 'standard',
          question: '\'शरीष के फूल\' कहानी का नायक **शरीष** एक संवेदनशील, स्वाभिमानी और अंतर्मुखी.',
          hint: 'यदि छात्र अटका हुआ है, तो वह **c11_hin_ar_cbse_14_004** के \'पात्र-चित्रण के चरण\' खंड को.',
          misconception: '**विशिष्ट भ्रांति:** "शरीष एक **निष्क्रिय (passive)** पात्र है क्योंकि वह ठाकुर के विरुद्ध खुला विद्रोह नहीं करता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'शरीष के फूल\' कहानी का नायक **शरीष** एक संवेदनशील, स्वाभिमानी और अंतर्मुखी ग्रामीण युवक',
                  options: ['\'शरीष के फूल\' कहानी का नायक **शरीष** एक संवेदनशील, स्वाभिमानी और अंतर्मुखी ग्रामीण युवक', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि छात्र अटका हुआ है, तो वह **c11_hin_ar_cbse_14_004** के \'पात्र-चित्रण के चरण\' खंड को दोहराए.',
                  misconception: '**विशिष्ट भ्रांति:** "शरीष एक **निष्क्रिय (passive)** पात्र है क्योंकि वह ठाकुर के विरुद्ध खुला विद्रोह नहीं करता, अदालत नहीं जाता, संगठन.' }
          ],
            remediations: { 'passive': { steps: ['**चरण 1:** छात्र को कहानी के **तीन प्रमुख प्रसंग** (मजदूरी न मिलना, फूल न तोड़ना, अंत में फूलों का खिलना) फिर से.', '**क्यों**?" **चरण 2:** एक **तुलनात्मक सारणी** बनवाएँ: स्तंभ 1 — ठाकुर का व्यवहार, स्तंभ 2 — शरीष की प्रतिक्रिया, स्तंभ.', 'वास्तव में क्या लिखा है?" — इस अंतर को स्वयं खोजने दें। **चरण 4:** पुनः निदान: DIAGNOSTIC_QUESTION_4 दुबारा पूछें; यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि नायक के गुण स्पष्ट न हों, तो **नोड 004 के WORKED_EXAMPLE_1** को दोहराएँ जहाँ नायक के.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "पात्र-चित्रण" का अर्थ है — पात्र का **नाम, जाति, पहनावा, बोली, स्वभाव** लिख देना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि नायक के गुण स्पष्ट न हों, तो **नोड 004 के WORKED_EXAMPLE_1** को दोहराएँ जहाँ नायक के गुणों को.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "पात्र-चित्रण" का अर्थ है — पात्र का **नाम, जाति, पहनावा, बोली, स्वभाव** लिख देना (जैसे: "मास्टर साहब.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़ें** — केवल उन पृष्ठों को जहाँ सहायक पात्र **बोलते या कार्य करते** हैं (नायक के वर्णन वाले अंश छोड़ें)। 2.', '**तालिका बनाएँ** — स्तंभ: पात्र | प्रसंग/पृष्ठ | संवाद/कार्य | नायक पर प्रभाव | प्रतीकात्मक अर्थ। 3.', '**नोड 004 (नायक चित्रण) दोहराएँ** — नायक के गुणों की सूची बनाएँ, फिर मिलाएँ कि कौन-सा सहायक पात्र कौन-सा गुण उभारता है।.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_4 को फिर से हल करें — अबकी बार **दोनों पात्रों को एक फ्रेम में** रखकर उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह **मूल विचार या केंद्रीय भाव** है जिसे रचनाकार.',
          hint: 'अगर अटके तो c12_hin_ar_cbse_14_004 (नायक पात्र-चित्रण) दोबारा पढ़ें — विशेषकर \'आंतरिक.',
          misconception: '**विषय = कथानक का निचोड़** — 70% छात्र यही लिखते हैं। वे सोचते हैं: *"कहानी क्या हुई, वही विषय हुआ।"* जबकि विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह **मूल विचार या केंद्रीय भाव** है जिसे रचनाकार पूरी रचना के',
                  options: ['मुख्य विषय (Central Theme) वह **मूल विचार या केंद्रीय भाव** है जिसे रचनाकार पूरी रचना के', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'अगर अटके तो c12_hin_ar_cbse_14_004 (नायक पात्र-चित्रण) दोबारा पढ़ें — विशेषकर \'आंतरिक द्वंद्व\' खंड',
                  misconception: '**विषय = कथानक का निचोड़** — 70% छात्र यही लिखते हैं। वे सोचते हैं: *"कहानी क्या हुई, वही विषय हुआ।"* जबकि विषय **अमूर्त, सार्वभौमिक.' }
          ],
            remediations: { '70': { steps: ['छात्र से कहें: **"कहानी भूल जाओ। केवल वह भाव बताओ जो पढ़ते समय तुम्हारे सीने में उठा।"** — उसे एक शब्द में लिखवाएं.', 'फिर पूछें: **"पाठ में वह भाव कहाँ-कहाँ दिखा?', 'तीन जगह पेंसिल से चिह्नित करो।"** 3.', 'अब कहें: **"उन तीनों जगहों में साझा क्या है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
