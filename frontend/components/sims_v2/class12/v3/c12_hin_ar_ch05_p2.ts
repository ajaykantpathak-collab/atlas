import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch05_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch05_p2',
    title: 'उषा · Part 2/3',
    subtitle: 'The poem is the plough — and inequality is the field',
    classLevel: 12, subject: 'hin_ar', topic: 'उषा · Part 2/3',
    chapters: ['c12_hin_ar_ch05'],
    nodeIds: ['c12_hin_ar_cbse_05_007', 'c12_hin_ar_cbse_05_008', 'c12_hin_ar_cbse_05_009', 'c12_hin_ar_cbse_05_010', 'c12_hin_ar_cbse_05_011', 'c12_hin_ar_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Symbolic poetry reader', intro: 'A folk tale about a cornfield becomes, in a symbolist\'s hands, a field report on inequality.', goal: 'Read Makka through Kedarnath Singh\'s post-1943 symbolic method — folk tale into social allegory.' },
    discovery: {
        question: 'Kedarnath Singh says the poet isn\'t a spectator of inequality but wants to touch it \'with the plough of poetry.\' What\'s being claimed about the poem itself?',
        options: ['The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield', 'Farmers should write poems', 'Poetry is hard labour literally', 'Agriculture needs poets'],
        answer: 'The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield',
        hook: 'After 1943 his images stopped describing and started symbolising — the maize field is a rural world, the dark night its weight, the plough the poet\'s intervention. \'Makka\' grows from a folk tale: read the field as a symbolic landscape, not a sketch.',
    },
    teaching: [
        { title: 'उषा — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**बिंब (Image):** काव्य में प्रयुक्त वह शब्द या पद जो इंद्रियों (दृश्य, श्रवण, स्पर्श, घ्राण, स्वाद) को सीधे संबोधित कर एक ठोस, संवेदनात्मक चित्र उपस्थित करता है। **प्रतीक (Symbol):** वह वस्तु.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Work the symbolic field: trace folk-tale roots into the poem\'s images, decode what maize, night and plough each stand for, and judge a poet who ploughs inequality rather than just watching it.',
        labels: ['उषा — साहित्यिक युक्तियाँ', 'उषा — मुख्य भाव', 'उषा — गौण भाव', 'उषा — पदावली: कठिन', 'उषा — व्याकरण: पद्य', 'उषा — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a photo-story assignment, your partner wants to scrap shots of a foggy winter field — \'nothing happens in them; we need drama.\' You suspect the quiet frames are the story.',
            decisions: [{ prompt: 'How does Nirala\'s \'मक्क\' settle the argument?', options: [
                { text: 'Keep them — the poem opens on a still, frost-covered morning and ends by realising the morning itself has become the poem; the ordinary observed fully is the subject, not the preface to one.', outcome: 'The structure — observation widening into realisation — is the claim: poetic weight isn\'t imported through drama but uncovered by attention, so \'nothing happens\' frames can carry the whole piece.' },
                { text: 'Scrap them — a subject must be dramatic for the art to be strong; description without event is filler.', outcome: 'That reads the poem\'s opening stanza as waiting-room material; the chapter shows the jump from scene to insight is the poem\'s spine — cutting the \'uneventful\' images cuts the argument.', reveals: 'drama-equals-subject' },
                { text: 'Keep them but add a dramatic climax shot so the essay has a proper arc.', outcome: 'That grafts a foreign arc onto the form: \'मक्क\' resolves by deepening the view, not by injecting an event — the epiphany is that nothing needed to happen.', reveals: 'arc-needs-a-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a poem\'s images as instruments of change — symbolism that works the soil instead of framing it.',
            decisions: [{ prompt: 'What comes next? उषा · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — उषा · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_007', difficulty: 'standard',
          question: '**बिंब (Image):** काव्य में प्रयुक्त वह शब्द या पद जो इंद्रियों (दृश्य, श्रवण.',
          hint: 'यदि फँसें तो c11_hin_a_cbse_13_007 (जाग तुझको दूर जाना — प्रतीक और बिंब) के कार्यित.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः हर **सुंदर वर्णन** को "प्रतीक" मान लेते हैं — जैसे "उषा की लाली" को प्रतीक बता देते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Image):** काव्य में प्रयुक्त वह शब्द या पद जो इंद्रियों (दृश्य, श्रवण, स्पर्श,',
                  options: ['**बिंब (Image):** काव्य में प्रयुक्त वह शब्द या पद जो इंद्रियों (दृश्य, श्रवण, स्पर्श,', 'उषा — कवि परिचय और पृष्ठभूमि का तात्पर्य कवियत्री उषा के व्यक्तिगत जीवन, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का स्वतंत्र अर्थ', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि फँसें तो c11_hin_a_cbse_13_007 (जाग तुझको दूर जाना — प्रतीक और बिंब) के कार्यित उदाहरण दोबारा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः हर **सुंदर वर्णन** को "प्रतीक" मान लेते हैं — जैसे "उषा की लाली" को प्रतीक बता देते हैं, जबकि वह केवल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **c11_hin_a_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) या **c11_hin_ar_cbse_16_007** (आओ, मलिकर बचाएँ.', 'एक साधारण वाक्य दें: "दीपक जल रहा है" — पूछें: "यहाँ दीपक बिंब है या प्रतीक?', 'क्यों?" फिर बदलें: "दीपक अज्ञान के अंधकार में ज्ञान का प्रतीक है" — अब अंतर स्पष्ट करें। 3.', 'पुनः "उषा" कविता के दो पद चुनकर **हाइलाइटर से बिंब (पीला) और प्रतीक (नीला)** अलग-अलग रंग से मार्क करवाएँ। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_008', difficulty: 'standard',
          question: '"उषा" में मुख्य भाव **\'तमसो मा ज्योतिर्गमय\' (अंधकार से प्रकाश की ओर)** की.',
          hint: 'यदि अटके, तो **c12_hin_ar_cbse_05_007** के \'प्रतीक-निर्माण की 3-चरणीय विधि\' (Object →.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर लिखते हैं — *"उषा कविता का मुख्य भाव है: \'अंधेरे के बाद उजाला आता है\' / \'निराशा के बाद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"उषा" में मुख्य भाव **\'तमसो मा ज्योतिर्गमय\' (अंधकार से प्रकाश की ओर)** की उपनिषद्‌ीय',
                  options: ['"उषा" में मुख्य भाव **\'तमसो मा ज्योतिर्गमय\' (अंधकार से प्रकाश की ओर)** की उपनिषद्‌ीय', 'उषा — कवि परिचय और पृष्ठभूमि का तात्पर्य कवियत्री उषा के व्यक्तिगत जीवन, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का स्वतंत्र अर्थ', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि अटके, तो **c12_hin_ar_cbse_05_007** के \'प्रतीक-निर्माण की 3-चरणीय विधि\' (Object → Association →.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर लिखते हैं — *"उषा कविता का मुख्य भाव है: \'अंधेरे के बाद उजाला आता है\' / \'निराशा के बाद आशा आती है\'।"* **यह.' }
          ],
            remediations: { 'natural-law-human-imperative': { steps: ['**पहला कदम:** छात्र से कहें — *"कविता की पहली और अंतिम पंक्ति साथ रखो। पूछो: \'पहली में कवि क्या देख रहा है?', 'अंतिम में क्या करने को कह रहा है?\'"* 2.', '**दूसरा कदम:** **क्रिया-श्रृंखला (Verb Chain)** बनवाएँ: सोना → उठना → जागना → चलना → गढ़ना → जलाना। पूछें: *"कौन-सी.', '**तीसरा कदम:** **पुनः निदान (Re-diagnostic):** DIAGNOSTIC_QUESTION_2 फिर से दें — अब प्रतीकों की \'मानसिक अवस्था\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_009', difficulty: 'standard',
          question: 'गौण भाव (Subsidiary Theme) कविता का वह सहायक भाव पक्ष है जो मुख्य भाव को पुष्ट.',
          hint: 'यदि अटके तो c11_hin_a_cbse_13_009 (जाग तुझको दूर जाना — गौण भाव और विषयांतर) दोबारा पढ़ें.',
          misconception: 'सबसे आम भ्रम: छात्र \'गौण भाव\' को \'अनावश्यक प्रसंग\' और \'विषयांतर\' को \'गलती/भटकाव\' समझते हैं। वे हर वर्णनात्मक पद को गौण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव (Subsidiary Theme) कविता का वह सहायक भाव पक्ष है जो मुख्य भाव को पुष्ट, विस्तृत',
                  options: ['गौण भाव (Subsidiary Theme) कविता का वह सहायक भाव पक्ष है जो मुख्य भाव को पुष्ट, विस्तृत', 'उषा — कवि परिचय और पृष्ठभूमि का तात्पर्य कवियत्री उषा के व्यक्तिगत जीवन, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का स्वतंत्र अर्थ', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_13_009 (जाग तुझको दूर जाना — गौण भाव और विषयांतर) दोबारा पढ़ें — वहाँ.',
                  misconception: 'सबसे आम भ्रम: छात्र \'गौण भाव\' को \'अनावश्यक प्रसंग\' और \'विषयांतर\' को \'गलती/भटकाव\' समझते हैं। वे हर वर्णनात्मक पद को गौण भाव और हर लंबे पद को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — उषा कविता के 3 पद चुनें और प्रत्येक के लिए लिखें: (क) यह मुख्य भाव को आगे बढ़ाता है / सहारा देता.', '(ख) अपने निर्णय का एक प्रमाण (पंक्ति/शब्द) दें। चरण 2: यदि वह \'विचलित करता है\' लिखे लेकिन प्रमाण वर्णनात्मक हो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_010', difficulty: 'standard',
          question: 'पदावली (शब्दावली) किसी रचना में प्रयुक्त विशिष्ट शब्दों, मुहावरों और.',
          hint: 'अगर किसी शब्द का प्रसंगानुसार अर्थ न पकड़ में आए, तो c12_hin_ar_cbse_05_007 (प्रतीक और.',
          misconception: 'छात्र समझते हैं कि "कठिन शब्द" का अर्थ केवल शब्दकोश खोलकर लिख देना है। वे नहीं देखते कि "तम" कविता में केवल \'अंधकार\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (शब्दावली) किसी रचना में प्रयुक्त विशिष्ट शब्दों, मुहावरों और लोकोक्तियों का वह',
                  options: ['पदावली (शब्दावली) किसी रचना में प्रयुक्त विशिष्ट शब्दों, मुहावरों और लोकोक्तियों का वह', 'उषा — कवि परिचय और पृष्ठभूमि का तात्पर्य कवियत्री उषा के व्यक्तिगत जीवन, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का स्वतंत्र अर्थ', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'अगर किसी शब्द का प्रसंगानुसार अर्थ न पकड़ में आए, तो c12_hin_ar_cbse_05_007 (प्रतीक और बिंब) के उस.',
                  misconception: 'छात्र समझते हैं कि "कठिन शब्द" का अर्थ केवल शब्दकोश खोलकर लिख देना है। वे नहीं देखते कि "तम" कविता में केवल \'अंधकार\' नहीं, \'अज्ञान-अवस्था\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: कविता का कोई एक पद्यांश लें (जैसे पहला पद)। चरण 2: 5 कठिन शब्द छाँटें। चरण 3: प्रत्येक के लिए — (क) शब्दकोशीय.', '— तीनों लिखें। चरण 4: c12_hin_ar_cbse_05_007 (प्रतीक और बिंब) दोबारा पढ़ें और देखें कि ये शब्द वहाँ चर्चित प्रतीकों से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है कवि द्वारा छंद, लय और भाव के अनुरूप शब्दों का.',
          hint: 'यदि अटका हुआ लगे: **c11_hin_a_cbse_13_011 (जाग तुझको दूर जाना — व्याकरण: पद्य में.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'कविता में भाषा-प्रयोग\' का अर्थ है **कठिन/तत्सम शब्दों का प्रयोग** (जैसे \'प्रभात\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है कवि द्वारा छंद, लय और भाव के अनुरूप शब्दों का चयन, उनके',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है कवि द्वारा छंद, लय और भाव के अनुरूप शब्दों का चयन, उनके', 'उषा — कवि परिचय और पृष्ठभूमि का तात्पर्य कवियत्री उषा के व्यक्तिगत जीवन, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का स्वतंत्र अर्थ', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि अटका हुआ लगे: **c11_hin_a_cbse_13_011 (जाग तुझको दूर जाना — व्याकरण: पद्य में भाषा-प्रयोग)** पर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'कविता में भाषा-प्रयोग\' का अर्थ है **कठिन/तत्सम शब्दों का प्रयोग** (जैसे \'प्रभात\' के बदले \'अरुणोदय\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read):** छात्र से कहें — कविता की केवल पहली दो पंक्तियाँ **तीन बार ज़ोर से पढ़ें**, हर बार अलग भाव से.', '**शब्द-चयन तालिका (Word-choice table):** एक शीट बनाएँ — बाएँ कॉलम में कवि के शब्द, दाएँ में उनके 3 सरल पर्याय। छात्र से.', '**वाक्य-क्रम परिवर्तन (Syntax swap):** मूल पंक्ति लें, उसका सीधा क्रम (SVO) लिखवाएँ, फिर दोनों पढ़कर **बल/भाव का अंतर**.', '**पुनर्निदान (Re-diagnostic):** DIAGNOSTIC_QUESTION_2 फिर से दें — अब छात्र \'बल/भाव\' शब्दों का प्रयोग करके उत्तर दे सके.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर **एकदम निश्चित.',
          hint: 'यदि **कीवर्ड पहचान** में अटके → **c12_hin_ar_cbse_05_002 (भावार्थ)** दोबारा पढ़ें; यदि.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर "अपनी राय" (opinion) होता है** — इसलिए वे लिख देते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर **एकदम निश्चित, तथ्य-आधारित और',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर **एकदम निश्चित, तथ्य-आधारित और', 'उषा — कवि परिचय और पृष्ठभूमि का तात्पर्य कवियत्री उषा के व्यक्तिगत जीवन, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का स्वतंत्र अर्थ', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि **कीवर्ड पहचान** में अटके → **c12_hin_ar_cbse_05_002 (भावार्थ)** दोबारा पढ़ें; यदि **PEEL.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर "अपनी राय" (opinion) होता है** — इसलिए वे लिख देते हैं: "मुझे लगता है कवि.' }
          ],
            remediations: { 'opinion-cbse-text-based-reasoning': { steps: ['**पुनरावृत्ति (Remediation Step 1):** छात्र को **c12_hin_ar_cbse_05_002 (पद्यांश-वार भावार्थ)** और.', '**अभ्यास (Step 2):** एक छोटा पद्यांश (4-5 पंक्तियाँ) दें — **पहले 3 वस्तुनिष्ठ प्रश्न बनवायें** (तथ्य-आधारित), फिर **2.', '**पुनः निदान (Re-diagnostic):** उसी पद्यांश पर **नया आशय-सूचक प्रश्न** दें — देखें कि क्या उत्तर में **PEEL.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
