import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch14_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch14_p2',
    title: 'शरिीष के फूल · Part 2/3',
    subtitle: 'The flag was born in a struggle — then the nation stopped looking',
    classLevel: 12, subject: 'hin_ar', topic: 'शरिीष के फूल · Part 2/3',
    chapters: ['c12_hin_ar_ch14'],
    nodeIds: ['c12_hin_ar_cbse_14_007', 'c12_hin_ar_cbse_14_008', 'c12_hin_ar_cbse_14_009', 'c12_hin_ar_cbse_14_010', 'c12_hin_ar_cbse_14_011', 'c12_hin_ar_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Political-essay reader', intro: 'A scholar-activist watches the tricolor fade on a government school roof and reads a whole nation\'s fatigue in it.', goal: 'Read Jhande ki Phool/flag essay as a diagnosis of national morality — symbol versus substance.' },
    discovery: {
        question: 'A poet paints the tricolor with reverence — years later it\'s a torn rag on a rusted pole, used for mundane purposes. Why does the author call the flag a \'living being\'?',
        options: ['Because it has a life-cycle — born in the freedom struggle, aged by neglect; its physical condition is the nation\'s moral condition', 'Flags wear out naturally', 'Poetic exaggeration', 'It moves in wind'],
        answer: 'Because it has a life-cycle — born in the freedom struggle, aged by neglect; its physical condition is the nation\'s moral condition',
        hook: 'The state guards the flag\'s display rules; the author asks whether it still embodies justice — ritualistic patriotism versus ethical substance. For him no science, politics or religion outranks humanity; the flag is a moral contract, not a protocol object.',
    },
    teaching: [
        { title: 'शरिीष के फूल — गौण विषय', text: 'गौण विषय (Sub-theme) कथा साहित्य में वह सहायक विषय-वस्तु है जो मुख्य विषय के समानांतर चलती हुई उसे गहराई, विस्तार और विश्वसनीयता प्रदान करती है; यह स्वतंत्र कथानक नहीं होती बल्कि मुख्य कथानक के भीतर.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the flag as the nation\'s pulse: trace its arc from tryst-with-destiny to faded neglect, weigh reverence against ritual, and ask what a torn tricolor diagnoses.',
        labels: ['शरिीष के फूल —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college\'s broken hostel bench gets a fresh coat of paint for inspection day — splinters and all — and the warden declares the issue \'resolved.\' The repair request you filed months ago is still \'under process.\'',
            decisions: [{ prompt: 'What does \'फखरुद्दीन की खाट\' see in the painted bench?', options: [
                { text: 'The cot painted by the bureaucrat — surface performance standing in for repair; the story\'s unresolved ending, where the cot never reaches the museum, performs the same deferral your \'under process\' request is trapped in.', outcome: 'The chapter reads the paint as the critique: cosmetic attention is how the system answers demand without meeting it — the structure denies resolution because the institution does.' },
                { text: 'Accept it — at least something visible was done; half a fix beats none.', outcome: 'The story\'s whole satire depends on refusing that bargain: paint over rot is precisely the bureaucrat\'s move — it photographs as action while the object stays broken underneath.', reveals: 'cosmetic-counts-as-fix' },
                { text: 'Treat it as proof the system works — the request clearly reached someone who acted.', outcome: 'Action timed to inspection isn\'t the request being processed; the story distinguishes performance-for-audience from accountability — the file stays open because the gesture closed the matter.', reveals: 'inspection-response-equals-resolution' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a national symbol as a moral diagnostic — and tell display-patriotism from the justice the cloth was meant to carry.',
            decisions: [{ prompt: 'What comes next? शरिीष के फूल · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — शरिीष के फूल · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कथा साहित्य में वह सहायक विषय-वस्तु है जो मुख्य विषय के.',
          hint: 'यदि मुख्य विषय स्पष्ट न हो, तो c12_hin_ar_cbse_14_006 के \'मास्टरी क्राइटेरिया\' को दोहराएं.',
          misconception: 'छात्र समझते हैं कि \'गौण विषय\' = \'कम अंक वाला विषय\'। वास्तव में बोर्ड परीक्षा में 3-4 अंक के प्रश्न अक्सर गौण विषय पर ही.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कथा साहित्य में वह सहायक विषय-वस्तु है जो मुख्य विषय के समानांतर',
                  options: ['गौण विषय (Sub-theme) कथा साहित्य में वह सहायक विषय-वस्तु है जो मुख्य विषय के समानांतर', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि मुख्य विषय स्पष्ट न हो, तो c12_hin_ar_cbse_14_006 के \'मास्टरी क्राइटेरिया\' को दोहराएं — मुख्य.',
                  misconception: 'छात्र समझते हैं कि \'गौण विषय\' = \'कम अंक वाला विषय\'। वास्तव में बोर्ड परीक्षा में 3-4 अंक के प्रश्न अक्सर गौण विषय पर ही होते हैं क्योंकि वे.' }
          ],
            remediations: { '3-4': { steps: ['चरण 1: छात्र से कहें — "पाठ के 5 प्रमुख प्रसंग लिखो जहां मुख्य कथा रुकती है और कोई दूसरा मुद्दा उभरता है।" चरण 2.', '(जाति/स्त्री/प्रकृति/परंपरा)" चरण 3: उन विचारों को समूहित करें — वही गौण विषय हैं। चरण 4: प्रत्येक गौण विषय के लिए दो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_008', difficulty: 'standard',
          question: '**बिंब (Imagery):** साहित्य में शब्दों के माध्यम से इंद्रियों (दृष्टि, श्रवण.',
          hint: 'यदि अटके: **c11_hin_ar_cbse_14_008** (कक्षा 11 का समान नोड) के **WORKED_EXAMPLE_1,2**.',
          misconception: '**सबसे घातक भ्रम:** छात्र **बिंब = वर्णन (description)** और **रूपक = उपमा (simile)** मानते हैं। **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** साहित्य में शब्दों के माध्यम से इंद्रियों (दृष्टि, श्रवण, घ्राण,',
                  options: ['**बिंब (Imagery):** साहित्य में शब्दों के माध्यम से इंद्रियों (दृष्टि, श्रवण, घ्राण,', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि अटके: **c11_hin_ar_cbse_14_008** (कक्षा 11 का समान नोड) के **WORKED_EXAMPLE_1,2** दोहराओ — वहाँ.',
                  misconception: '**सबसे घातक भ्रम:** छात्र **बिंब = वर्णन (description)** और **रूपक = उपमा (simile)** मानते हैं। **वास्तविकता:** - **बिंब** वर्णन नहीं.' }
          ],
            remediations: { 'description-simile': { steps: ['**पुनः पढ़ो:** पाठ के पहले दो पैराग्राफ **धीरे-धीरे बोलकर** पढ़ो — हर वाक्य पर रुको और पूछो: "मेरी कौन-सी इंद्रिय.', '**तालिका बनाओ:** दो कॉलम — **बिंब पद** | **इंद्रिय श्रेणी**। कम से कम 5 प्रविष्टियाँ भरो। 3.', '**रूपक-शल्यक्रिया:** पाठ से 3 वाक्य चुनो जहाँ \'है/था/थी\' के बाद सीधे संज्ञा आए (जैसे "स्मृति शिरीष है")। प्रत्येक के.', '**परीक्षा-अभ्यास:** CBSE 2023-24 सैंपल पेपर के **\'आशय स्पष्ट कीजिए\'** प्रश्न (पाठ-आधारित) हल करो — उत्तर में बिंब/रूपक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी या.',
          hint: 'यदि फँसें तो: नोड 008 (बिंब और रूपक) के WORKED_EXAMPLE_1 व 2 को पुनः हल करें — विशेष रूप.',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** और **विरोधाभास अलंकार (Oxymoron)** को एक मान लेते हैं। Oxymoron = दो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी या असंगत',
                  options: ['**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी या असंगत', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि फँसें तो: नोड 008 (बिंब और रूपक) के WORKED_EXAMPLE_1 व 2 को पुनः हल करें — विशेष रूप से \'रूपक.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** और **विरोधाभास अलंकार (Oxymoron)** को एक मान लेते हैं। Oxymoron = दो विरोधी **शब्द** साथ.' }
          ],
            remediations: { 'paradox-oxymoron-oxymoron': { steps: ['**चरण 1 — अवधारणा स्पष्टीकरण (15 मिनट):** छात्र को दो कॉलम बनाने को कहें: Column A: Oxymoron (पद-युग्म), Column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_010', difficulty: 'standard',
          question: 'पदावली किसी पाठ के **चयनित मुख्य शब्दों** की वह सूची है जिसमें उनका **मूल.',
          hint: 'यदि **समास विच्छेद** या **प्रतीक/रूपक भेद** में अटके, तो तुरंत **c12_hin_ar_cbse_14_008**.',
          misconception: '**विशिष्ट भ्रांति:** *"पदावली का अर्थ है कठिन शब्दों के \'पर्यायवाची\' या \'विलोम\' रट लेना।"* **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली किसी पाठ के **चयनित मुख्य शब्दों** की वह सूची है जिसमें उनका **मूल अर्थ**,',
                  options: ['पदावली किसी पाठ के **चयनित मुख्य शब्दों** की वह सूची है जिसमें उनका **मूल अर्थ**,', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि **समास विच्छेद** या **प्रतीक/रूपक भेद** में अटके, तो तुरंत **c12_hin_ar_cbse_14_008** (बिंब और.',
                  misconception: '**विशिष्ट भ्रांति:** *"पदावली का अर्थ है कठिन शब्दों के \'पर्यायवाची\' या \'विलोम\' रट लेना।"* **वास्तविकता:** बोर्ड/प्रतियोगी परीक्षाएँ.' }
          ],
            remediations: { '6-11-lexical-12-contextual': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**चरण 1 (पुनः अवलोकन):** पाठ से **केवल 3 शब्द** चुनें (जैसे: शरिीष, वितान, अनुहार)। प्रत्येक के लिए **4-स्तरीय तालिका**.', '**चरण 2 (तुलनात्मक अभ्यास):** \'प्रतिध्वनि\' vs \'अनुनाद\', \'आलोक\' vs \'प्रकाश\' — ऐसे **शब्द-युग्मों (Word Pairs)** के.', '**चरण 3 (निदानात्मक परीक्षण):** उपरोक्त **DIAGNOSTIC_QUESTION_4** को पुनः हल करें — यदि अब भी भ्रम हो, तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है: रचनाकार द्वारा विषय, पात्र, प्रसंग और भाव के.',
          hint: 'यदि शब्द-भंडार वर्गीकरण या वाक्य-भेद पहचानने में अटकें, तो कक्षा 11 के.',
          misconception: '**विशिष्ट भ्रांति:** "भाषा-प्रयोग का विश्लेषण करने का अर्थ है पाठ से कठिन/सुंदर शब्द छाँटकर उनकी परिभाषा लिख देना।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है: रचनाकार द्वारा विषय, पात्र, प्रसंग और भाव के अनुरूप',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है: रचनाकार द्वारा विषय, पात्र, प्रसंग और भाव के अनुरूप', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि शब्द-भंडार वर्गीकरण या वाक्य-भेद पहचानने में अटकें, तो कक्षा 11 के c11_hin_ar_cbse_14_011.',
                  misconception: '**विशिष्ट भ्रांति:** "भाषा-प्रयोग का विश्लेषण करने का अर्थ है पाठ से कठिन/सुंदर शब्द छाँटकर उनकी परिभाषा लिख देना।" — **क्यों गलत है:**.' }
          ],
            remediations: { 'cuet-x-1-2-0': { steps: ['**चरण 1:** पाठ से **एक छोटा प्रसंग (4-5 वाक्य)** चुनें जहाँ भाव तीव्र हो (तनाव, स्मृति, ग्रामीण संवाद)। **चरण 2:** उस.', 'अगर *वह* शब्द होता तो क्या फर्क पड़ता?" — इसे **\'क्या-अगर\' (what-if) विश्लेषण** कहते हैं। **चरण 3:** अपने उत्तर को इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective questions) पाठ्य सामग्री से सीधे तथ्यात्मक जानकारी.',
          hint: 'यदि छात्र आशय-सूचक प्रश्न का \'साक्ष्य\' चरण नहीं कर पा रहा → c12_hin_ar_cbse_14_003.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "आशय-सूचक प्रश्न = लंबा उत्तर" और "वस्तुनिष्ठ प्रश्न = छोटा उत्तर"। इसलिए वे 2-अंक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective questions) पाठ्य सामग्री से सीधे तथ्यात्मक जानकारी मांगते',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective questions) पाठ्य सामग्री से सीधे तथ्यात्मक जानकारी मांगते', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि छात्र आशय-सूचक प्रश्न का \'साक्ष्य\' चरण नहीं कर पा रहा → c12_hin_ar_cbse_14_003 (पाठ्य-परिवेश).',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "आशय-सूचक प्रश्न = लंबा उत्तर" और "वस्तुनिष्ठ प्रश्न = छोटा उत्तर"। इसलिए वे 2-अंक के आशय-सूचक प्रश्न.' }
          ],
            remediations: { '2-10': { steps: ['**पहचान अभ्यास:** छात्र को "शरीष के फूल" के NCERT अभ्यास प्रश्न (पाठ्यपुस्तक अंत) दें। प्रत्येक प्रश्न के सामने \'V\'.', '**संरचना अभ्यास:** 2 आशय-सूचक प्रश्न चुनें। छात्र से कहें: "केवल PEEL के 4 चरणों के शीर्षक लिखो (बिंदु, साक्ष्य.', '**पुनः निदान:** c12_hin_ar_cbse_14_006 (मुख्य विषय) और c12_hin_ar_cbse_14_008 (बिंब/रूपक) दोबारा पढ़वाएं — क्योंकि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
