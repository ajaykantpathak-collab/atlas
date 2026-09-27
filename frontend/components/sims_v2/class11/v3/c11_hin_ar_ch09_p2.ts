import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch09_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch09_p2',
    title: 'पाठ 9 · Part 2/3',
    subtitle: 'Hear a 15th-century weaver dismantle both temple and mosque in one couplet.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 9 · Part 2/3',
    chapters: ['c11_hin_ar_ch09'],
    nodeIds: ['c11_hin_ar_cbse_09_007', 'c11_hin_ar_cbse_09_008', 'c11_hin_ar_cbse_09_009', 'c11_hin_ar_cbse_09_010', 'c11_hin_ar_cbse_09_011', 'c11_hin_ar_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a disciple watching the loom instead of the scripture', intro: 'A Muslim-weaver saint in Kashi, persecuted by priests of both religions — and his whole theology woven into cloth metaphors.', goal: 'Situate Kabir in the Nirguna Bhakti tradition and read his weaver identity as the engine of his imagery.' },
    discovery: {
        question: 'A student writes \'Kabir rejected all religion.\' Accurate?',
        options: ['No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality', 'Yes — he mocked both temple and mosque, so he rejected both faiths', 'Yes — a weaver couldn\'t be religious', 'No — he actually founded a new organised religion'],
        answer: 'No — he rejected ritual, hierarchy and scripture-worship while using \'Ram\' and \'Allah\' interchangeably for the same formless reality',
        hook: '\'Kabir was a weaver\' is not trivia — every metaphor in his verse is a loom: warp, weft, thread, dye, knot. His caste is his poetics.',
    },
    teaching: [
        { title: 'पाठ 9 — गौण विषय', text: 'गौण विषय (Sub-theme) साहित्यिक कृति में वह **द्वितीयक केंद्रीय विचार या कथानक-धारा** है जो मुख्य विषय के समानांतर चलती हुई, उसे समृद्ध, विस्तृत और यथार्थपरक बनाती है; यह स्वतंत्र अस्तित्व रखते हुए.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch Kabir teach disciples by silently weaving an odd pattern, then map why the lesson lands through action instead of explanation.',
        labels: ['पाठ 9 — गौण', 'पाठ 9 — साहित्यिक', 'पाठ 9 — पदावली', 'पाठ 9 — व्याकरण', 'पाठ 9 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 2/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है — रचनाकार द्वारा प्रसंग, पात्र, भाव और उद्देश्य के अनुरूप.', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न** (Objective Questions) test literal comprehension by asking for.', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is designing a Kabir exhibit. A teammate\'s panel reads: \'Kabir: 15th-century weaver from Kashi. Born c.1398, died 1518.\' He argues the weaver detail is just a biographical fact — \'the poetry is about God, not looms.\'',
            decisions: [{ prompt: 'Why is the weaver identity the key, not trivia?', options: [
                { text: 'Show the generative matrix: nearly every metaphor in Kabir — warp and weft, thread, dye, knot, unravelling — comes from the loom; \'untying the knot\' (granthi) is weaver\'s knowledge turned theology. Add the rest of the context: a low-caste julaha in Sadhukkadi speech challenging Brahmin and Qazi orthodoxy alike — the poetry\'s radicalism is inseparable from who spoke and in whose language.', outcome: 'The panel is rewritten: context stops being a fact-file and becomes the engine — weaving isn\'t Kabir\'s day job, it\'s his entire metaphor bank.' },
                { text: 'Keep the panel — dates and profession are background; the spiritual message stands alone.', outcome: 'Stripping the weaver identity leaves the images unexplained: the loom metaphors become decoration instead of embodied argument.', reveals: 'weaver-is-trivia' },
                { text: 'Reframe him as a social reformer first — the caste angle matters, the spiritual content is secondary.', outcome: 'That inverts without understanding: Kabir\'s social challenge works THROUGH spiritual metaphor — the poetry fuses the two, so splitting them flattens both.', reveals: 'kabir-is-only-reformer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'Neither Brahmin nor Qazi could claim him — the weaver\'s loom measured orthodoxy and found it hollow.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) साहित्यिक कृति में वह **द्वितीयक केंद्रीय विचार या.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_09_006 (मुख्य विषय और संदेश)** और **c11_hin_ar_cbse_09_005.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "गौण विषय = मुख्य विषय का उदाहरण/दृष्टांत/उपकथानक"। **गलत तर्क:** वे सोचते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) साहित्यिक कृति में वह **द्वितीयक केंद्रीय विचार या कथानक-धारा** है',
                  options: ['गौण विषय (Sub-theme) साहित्यिक कृति में वह **द्वितीयक केंद्रीय विचार या कथानक-धारा** है', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_09_006 (मुख्य विषय और संदेश)** और **c11_hin_ar_cbse_09_005 (सहायक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "गौण विषय = मुख्य विषय का उदाहरण/दृष्टांत/उपकथानक"। **गलत तर्क:** वे सोचते हैं — "मुख्य विषय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पृथक्करण अभ्यास:** छात्र से कहें — "पाठ के 10 प्रमुख प्रसंग लिखें। प्रत्येक के आगे लिखें: यह किस पात्र का प्रसंग है?', 'मुख्य नायक से संबंध है या नहीं?" 2.', '**थीम-लेबलिंग:** अब प्रत्येक प्रसंग को एक **अमूर्त संज्ञा-वाक्यांश** दें (जैसे: \'आर्थिक शोषण\', \'स्त्री-शिक्षा\'.', '**स्वतंत्रता परीक्षण:** पूछें — "यदि मुख्य नायक इस प्रसंग से हटा दिया जाए, तो क्या प्रसंग अपना अर्थ रखेगा?" जिनका उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** भाषा का वह प्रयोग है जो पाठक की इंद्रियों को उद्दीप्त करके.',
          hint: 'यदि फँस जाएँ तो **\'बिंब के प्रकार\' (पाँच इंद्रियाँ)** और **\'रूपक बनाम उपमा\' (जैसे/वत् की.',
          misconception: 'छात्र प्रायः **बिंब को केवल \'दृश्य चित्रण\' (visual description) मान लेते हैं** और घ्राण/स्पर्श/स्वाद बिंबों की उपेक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** भाषा का वह प्रयोग है जो पाठक की इंद्रियों को उद्दीप्त करके मूर्त',
                  options: ['**बिंब (Imagery)** भाषा का वह प्रयोग है जो पाठक की इंद्रियों को उद्दीप्त करके मूर्त', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि फँस जाएँ तो **\'बिंब के प्रकार\' (पाँच इंद्रियाँ)** और **\'रूपक बनाम उपमा\' (जैसे/वत् की.',
                  misconception: 'छात्र प्रायः **बिंब को केवल \'दृश्य चित्रण\' (visual description) मान लेते हैं** और घ्राण/स्पर्श/स्वाद बिंबों की उपेक्षा करते हैं; साथ ही.' }
          ],
            remediations: { 'visual-description': { steps: ['छात्र को आँखें बंद करवाकर किसी जानी-पहचानी जगह (रसोई, बाज़ार, बारिश) का मानसिक दौरा कराओ — प्रत्येक इंद्रीय अनुभूति को.', 'दो वाक्य साथ रखो: "वह फूल *जैसे* कोमल है" और "वह फूल *कोमलता की पंखुड़ी* है" — छात्र से पूछो: "कहाँ \'जैसे\' है?', 'कहाँ सीधा तादात्म्य?" — इससे रूपक/उपमा भेद स्पष्ट होगा। 3.', 'पाठ से तीन रूपक छाँटकर उनके **उपमान (vehicle)** और **उपमेय (tenor)** को सारणी में भरवाओ — अभ्यास से पहचान पक्की होगी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें कथन पहली दृष्टि में.',
          hint: 'यदि अटके: **c11_hin_ar_cbse_09_008** के \'रूपक विश्लेषण चरण\' (Tenor-Vehicle-Ground) को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'विरोधाभास\' (Paradox)** को **\'विरोधाभासी अलंकार\' (Oxymoron)** समझ बैठते हैं और दोनों को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें कथन पहली दृष्टि में असंगत,',
                  options: ['**विरोधाभास (Paradox)** एक ऐसी साहित्यिक युक्ति है जिसमें कथन पहली दृष्टि में असंगत,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके: **c11_hin_ar_cbse_09_008** के \'रूपक विश्लेषण चरण\' (Tenor-Vehicle-Ground) को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'विरोधाभास\' (Paradox)** को **\'विरोधाभासी अलंकार\' (Oxymoron)** समझ बैठते हैं और दोनों को समान मानते हैं। **गलत.' }
          ],
            remediations: { 'paradox-oxymoron-oxymoron-paradox-1': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**भेद स्पष्ट करो:** बोर्ड पर दो कॉलम बनाओ — **Oxymoron (यमक/विरोधाभासी अलंकार)**: दो विपरीत पदों का संयोग, तात्कालिक.', '**माइक्रो-व्यायाम:** 5 वाक्य दो — छात्र से प्रत्येक को Oxymoron/Paradox/दोनों/कोई नहीं में वर्गीकृत कराओ और **कारण.', '**पाठ-आधारित अनुप्रयोग:** वर्तमान पाठ (अरोह पाठ 9) से एक विरोधाभास और एक ऑक्सीमोरॉन ढूँढ़वाओ — यदि ऑक्सीमोरॉन न मिले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_010', difficulty: 'standard',
          question: 'पदावली के मुख्य शब्द वे **चयनित शब्दावली (Select Vocabulary)** हैं जो किसी.',
          hint: 'यदि अटका हो तो **पाठ 9 के मुख्य विषय (नोड 006) व साहित्यिक युक्तियाँ (नोड 008, 009)**.',
          misconception: 'छात्र प्रायः मानते हैं कि **मुख्य शब्द = पाठ में आए कठिन/अपरिचित शब्द**। वे शब्दकोश खोलकर अर्थ रट लेते हैं और समझते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के मुख्य शब्द वे **चयनित शब्दावली (Select Vocabulary)** हैं जो किसी साहित्यिक कृति',
                  options: ['पदावली के मुख्य शब्द वे **चयनित शब्दावली (Select Vocabulary)** हैं जो किसी साहित्यिक कृति', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटका हो तो **पाठ 9 के मुख्य विषय (नोड 006) व साहित्यिक युक्तियाँ (नोड 008, 009)** दोहराएँ.',
                  misconception: 'छात्र प्रायः मानते हैं कि **मुख्य शब्द = पाठ में आए कठिन/अपरिचित शब्द**। वे शब्दकोश खोलकर अर्थ रट लेते हैं और समझते हैं कि कार्य पूर्ण हो.' }
          ],
            remediations: { 'frequency-difficulty': { steps: ['**पुनर्वाचन (Re-selection):** छात्र से कहें — "पाठ को दोबारा पढ़ो और केवल वे 5 शब्द छाँटो जिनके बिना तुम्हें लगता है.', '**प्रसंग-मानचित्रण (Context-Mapping):** प्रत्येक चयनित शब्द के लिए पूछें — "यह शब्द किस पन्ने, किस पैरा, किस पात्र के.', '**विषय-संयोजन (Theme-Linking):** अब पूछें — "यह शब्द पाठ के किस **मुख्य विषय (Central Theme)** — जैसे न्याय, अहंकार.', '**तुलनात्मक चर्चा:** कक्षा में दो छात्रों के चयनित शब्दों की तुलना करवाएँ — "तुम्हारा शब्द \'X\' और साथी का शब्द \'Y\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है — रचनाकार द्वारा प्रसंग, पात्र, भाव और उद्देश्य.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_09_010 (पदावली: मुख्य शब्द)** पर लौटें — विशेषकर.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ **\'कठिन/साहित्यिक/तत्सम शब्दों का अधिकाधिक प्रयोग\'** है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_09_010 (पदावली: मुख्य शब्द)** पर लौटें — विशेषकर \'सांस्कृतिक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ **\'कठिन/साहित्यिक/तत्सम शब्दों का अधिकाधिक प्रयोग\'** है। इसलिए वे विश्लेषण.' }
          ],
            remediations: { '9': { steps: ['**पहला कदम:** छात्र से कहें — "पाठ 9 का वह पृष्ठ खोलो जहाँ पात्र सबसे अधिक क्रोधित/भयभीत/नैतिक संकट में है। वहाँ के 10.', '**दूसरा कदम:** पूछें — "इन वाक्यों में से तत्सम शब्द हटाकर देशज/उर्दू शब्द डाल दो, या इसके विपरीत करो। अब पढ़ो — प्रभाव.', '**तीसरा कदम:** बोर्ड उत्तर का **मॉडल ढाँचा** दिखाएँ: **बिंदु → पाठ-साक्ष्य (उद्धरण/संदर्भ) → व्याख्या (क्यों/कैसे) →.', '**चौथा कदम:** अगली कक्षा में उसी प्रसंग पर **\'विपरीत शैली में पुनर्लेखन\'** करवाएँ (जैसे कर्मवाच्य को कर्तृवाच्य में) और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_09_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** (Objective Questions) test literal comprehension.',
          hint: 'Review Node 011 (भाषा-प्रयोग) focusing on how adjectives, metaphors, and verb forms.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर "अपनी राय" (personal opinion) देना है** — जैसे "मुझे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** (Objective Questions) test literal comprehension by asking for',
                  options: ['**वस्तुनिष्ठ प्रश्न** (Objective Questions) test literal comprehension by asking for', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के', '**कथानक (Plot)** कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम (cause-effect) संबंधों', 'पाठ्य-परिवेश (Textual Environment) किसी रचना में चित्रित भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'Review Node 011 (भाषा-प्रयोग) focusing on how adjectives, metaphors, and verb forms create tone.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर "अपनी राय" (personal opinion) देना है** — जैसे "मुझे लगता है लेखक दुखी था".' }
          ],
            remediations: { 'personal-opinion-wrong-reasoning-intent': { steps: ['**लक्षित उपचार (Targeted Remediation — 4 चरण):** 1.', '**भेद स्पष्ट करें:** छात्र को दो वाक्य दें — *"आकाश नीला है"* (तथ्य) और *"आकाश उदास लगता है"* (आशय/प्रक्षेपण)। पूछें.', '**साक्ष्य-आधारित अभ्यास:** पाठ 9 के 5 वाक्य दें; छात्र को प्रत्येक को **F (Fact)** या **I (Inference)** लेबल करना.', '**PEEL टेम्पलेट दें:** रफ कॉपी पर P-E-E-L कॉलम बनवाएँ; हर आशय-सूचक उत्तर पहले इसमें भरें, फिर फेयर करें। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
