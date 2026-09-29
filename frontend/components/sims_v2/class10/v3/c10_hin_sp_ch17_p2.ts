import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch17_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch17_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch17_p2',
    title: 'पद · Part 2/3',
    subtitle: 'यह नोड केवल \'पद\' काव्य में प्रयुक्त **बिंब (पाँचों इंद्रियों के)** और **प्रतीक.',
    classLevel: 10, subject: 'hin_sp', topic: 'पद · Part 2/3',
    chapters: ['c10_hin_sp_ch17'],
    nodeIds: ['c10_hin_sp_cbse_17_007', 'c10_hin_sp_cbse_17_008', 'c10_hin_sp_cbse_17_009', 'c10_hin_sp_cbse_17_010', 'c10_hin_sp_cbse_17_011', 'c10_hin_sp_cbse_17_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'स्पर्श भाग-2 — पाठ 17\' में स्पर्श-भाग-2-—-पाठ-17 जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पद — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'स्पर्श भाग-2 — पाठ 17\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_17_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पद — साहित्यिक युक्तियाँ', 'पद — मुख्य भाव', 'पद — गौण भाव', 'पद — पदावली: कठिन', 'पद — व्याकरण: पद्य', 'पद — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_17_010', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['सत्यापन — प्रत्येक अर्थ पद के केन्द्रीय भाव (बाल-ईर्ष्या से.', 'शब्द-चयन का कारण विश्लेषण: \'खिझायो\' ब्रजभाषा का जीवंत.', 'प्रसंगानुकूल अर्थ निकालें: \'खिझायो\' = चिढ़ाया/ईर्ष्या से.', 'शब्द छाँटें: \'खिझायो\' (तद्भव क्रिया), \'मोल\' (तत्सम संज्ञा).', 'पहचानें कि यह पद यशोदा के पास कृष्ण की शिकायत का है — बलराम.'], answer: 'पहचानें कि यह पद यशोदा के पास कृष्ण की शिकायत का है — बलराम. शब्द छाँटें: \'खिझायो\' (तद्भव क्रिया), \'मोल\' (तत्सम संज्ञा). प्रसंगानुकूल अर्थ निकालें: \'खिझायो\' = चिढ़ाया/ईर्ष्या से. शब्द-चयन का कारण विश्लेषण: \'खिझायो\' ब्रजभाषा का जीवंत. सत्यापन — प्रत्येक अर्थ पद के केन्द्रीय भाव (बाल-ईर्ष्या से.' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_17_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पद like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पद · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पद · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_007', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 17\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो **नोड 006 (अलंकार)** के \'रूपक और उपमा भेद\' तथा **नोड 002 (भावार्थ)** के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'हर सुंदर/गहरी लगने वाली उपमा या रूपक प्रतीक है\'** — उदाहरण के लिए, "जीवन एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 17\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'स्पर्श भाग-2 — पाठ 17\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रैदास का जीवन-वृत्त (पंद्रहवीं-सोलहवीं सदी, बनारस,', '\'स्पर्श भाग-2 — पाठ 17\' का कथानक — \'स्पर्श भाग-2 — पाठ 17\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो **नोड 006 (अलंकार)** के \'रूपक और उपमा भेद\' तथा **नोड 002 (भावार्थ)** के \'चदरिया प्रसंग\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'हर सुंदर/गहरी लगने वाली उपमा या रूपक प्रतीक है\'** — उदाहरण के लिए, "जीवन एक नदी है" में \'नदी\' को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**भेद स्पष्ट करें:** छात्र से कहें — "अलंकार में कवि *कहता है* \'यह वह है\' (तुलना/आरोप); प्रतीक में कवि *दिखाता है* \'यह.', '**अभ्यास दें:** दो वाक्य दें — (क) "वह शेर-सा बहादुर है" (उपमा/अलंकार) (ख) "मैदान में अकेला खड़ा वह, दहाड़ता नहीं, पर.', 'कहाँ कवि ने केवल चित्र खींचा?" 3.', '**कबीर के पद पर लागू करें:** "झीनी चदरिया" — पूछें: "क्या कबीर ने लिखा \'शरीर चादर के समान है\'?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_008', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 17\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो c10_hin_sp_cbse_17_007 (प्रतीक और बिंब) दोहराएँ — प्रतीक डिकोड न कर पाने के.',
          misconception: 'छात्र मानते हैं कि **मुख्य भाव = कविता का सारांश**। वे लिखते हैं: "मीरा विष पीती है, फिर नाचती है, कृष्ण से मिलना चाहती.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 17\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'स्पर्श भाग-2 — पाठ 17\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रैदास का जीवन-वृत्त (पंद्रहवीं-सोलहवीं सदी, बनारस,', '\'स्पर्श भाग-2 — पाठ 17\' का कथानक — \'स्पर्श भाग-2 — पाठ 17\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_17_007 (प्रतीक और बिंब) दोहराएँ — प्रतीक डिकोड न कर पाने के कारण ही.',
                  misconception: 'छात्र मानते हैं कि **मुख्य भाव = कविता का सारांश**। वे लिखते हैं: "मीरा विष पीती है, फिर नाचती है, कृष्ण से मिलना चाहती है — यही मुख्य भाव.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "कविता की 5 मुख्य घटनाएँ लिखो" (सारांश)। चरण 2: पूछें — "इन सबमें कौन-सी **एक बात** समान है जो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_009', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 17\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_17_008 (मुख्य भाव और संदेश)** और **c10_hin_sp_cbse_17_002.',
          misconception: '**विशिष्ट भ्रांति:** "गौण भाव का अर्थ है \'कम महत्व का भाव\' जिसे परीक्षा में छोड़ सकते हैं; विषयांतर का अर्थ है \'कवि भटक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 17\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'स्पर्श भाग-2 — पाठ 17\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रैदास का जीवन-वृत्त (पंद्रहवीं-सोलहवीं सदी, बनारस,', '\'स्पर्श भाग-2 — पाठ 17\' का कथानक — \'स्पर्श भाग-2 — पाठ 17\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_17_008 (मुख्य भाव और संदेश)** और **c10_hin_sp_cbse_17_002.',
                  misconception: '**विशिष्ट भ्रांति:** "गौण भाव का अर्थ है \'कम महत्व का भाव\' जिसे परीक्षा में छोड़ सकते हैं; विषयांतर का अर्थ है \'कवि भटक गया/भूल गया\'।".' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — अवधारणा स्पष्टीकरण:** छात्र को बैठाकर समझाएं — "गौण = गौण नहीं, **सहायक**; विषयांतर = भटकाव नहीं.', '**चरण 2 — पद संरचना मैपिंग:** किसी सरल पद (जैसे सूर का "मैया मोरी मैं नहिं माखन खायो") लें। छात्र से कहें — "हर पंक्ति.', '**चरण 3 — प्रयोजन अभ्यास:** 3-4 पदों के अंश दें जहां विषयांतर हो। छात्र को केवल **एक वाक्य** में प्रयोजन लिखना सिखाएं.', '**चरण 4 — विपरीत अभ्यास:** छात्र से कहें — "एक पद लिखो जिसमें गौण भाव न हो, फिर उसी में गौण भाव डालो। अंतर महसूस करो।".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_010', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 17\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी.',
          hint: 'If stuck, re-read node 002\'s worked examples for stanza 3 and 5 — they model exactly how.',
          misconception: 'Students treat \'कठिन शब्द\' and \'मुहावरे\' as separate lists to memorize: they write "मुरलीधर = बाँसुरी बजाने वाला".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 17\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'स्पर्श भाग-2 — पाठ 17\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रैदास का जीवन-वृत्त (पंद्रहवीं-सोलहवीं सदी, बनारस,', '\'स्पर्श भाग-2 — पाठ 17\' का कथानक — \'स्पर्श भाग-2 — पाठ 17\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'If stuck, re-read node 002\'s worked examples for stanza 3 and 5 — they model exactly how situation.',
                  misconception: 'Students treat \'कठिन शब्द\' and \'मुहावरे\' as separate lists to memorize: they write "मुरलीधर = बाँसुरी बजाने वाला" (dictionary meaning) and.' }
          ],
            remediations: { 'students-treat-and-as-separate': { steps: ['Pick ONE stanza the student finds hardest.', 'Together, list every word that feels "alien" — don\'t filter.', 'For each, ask: "Is this tatsam (Sanskrit root), tadbhav (Braj form), or idiom?" Label it.', 'Now read the stanza\'s situation aloud (e.g., "Yashoda is scolding Krishna but smiling").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_011', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 17\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_17_005 (छंद और लय-विधान)** पर वापस जाएँ.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि पद्य में आए **\'ने\', \'को\', \'से\', \'का/की/के\' जैसे कारक-चिह्नों का लोप** "बचकाना" या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 17\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'स्पर्श भाग-2 — पाठ 17\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रैदास का जीवन-वृत्त (पंद्रहवीं-सोलहवीं सदी, बनारस,', '\'स्पर्श भाग-2 — पाठ 17\' का कथानक — \'स्पर्श भाग-2 — पाठ 17\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_17_005 (छंद और लय-विधान)** पर वापस जाएँ — विशेषकर.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि पद्य में आए **\'ने\', \'को\', \'से\', \'का/की/के\' जैसे कारक-चिह्नों का लोप** "बचकाना" या "अपूर्ण वाक्य" है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहचान कराएँ**: छात्र को कोई एक दोहा/चौपाई दें — कहें: "हर उस शब्द पर गोला लगाओ जो रोज़ की बोलचाल में न आए।" 2.', '**वर्गीकरण सिखाएँ**: उन गोलों को तीन ढेर में बाँटें — (अ) शब्द-क्रम बदला (अनस्तुति), (आ) शब्द का रूप बदला.', '**गद्यानुवाद कराएँ**: प्रत्येक पंक्ति का **शुद्ध गद्य रूप** लिखवाएँ — लोपित कारक जोड़ें, क्रम सीधा करें, रूप शुद्ध.', '**कारण पूछें**: हर बदलाव के लिए पूछें — "कवि ने ऐसा **क्यों** किया?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_17_012', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 17\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँसें तो **c10_hin_sp_cbse_17_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_17_007.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **\'आशय-सूचक\' का अर्थ \'लंबा उत्तर\' (Long Answer)** होता है और **\'वस्तुनिष्ठ\' का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 17\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'स्पर्श भाग-2 — पाठ 17\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रैदास का जीवन-वृत्त (पंद्रहवीं-सोलहवीं सदी, बनारस,', '\'स्पर्श भाग-2 — पाठ 17\' का कथानक — \'स्पर्श भाग-2 — पाठ 17\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि फँसें तो **c10_hin_sp_cbse_17_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_17_007 (प्रतीक.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **\'आशय-सूचक\' का अर्थ \'लंबा उत्तर\' (Long Answer)** होता है और **\'वस्तुनिष्ठ\' का अर्थ \'छोटा उत्तर\'.' }
          ],
            remediations: { 'long-answer-short-answer-2': { steps: ['**लक्षित उपचार (Targeted Remediation)**: 1.', '**चरण 1 (अंतर स्पष्ट करो)**: छात्र को **एक ही पद्यांश** पर **दो प्रश्न** दो — एक वस्तुनिष्ठ (*"कवि ने किसे पुकारा?"*).', '**चरण 2 (की-वर्ड मैपिंग)**: **निर्देशक शब्दों (Directive Words)** की **चीट-शीट (Cheat Sheet)** बनवाओ — **वस्तुनिष्ठ**.', '**चरण 3 (PEEL ड्रिल)**: रोज़ **एक पंक्ति** देकर **5 मिनट** में **PEEL** लिखने का अभ्यास कराओ। **फीडबैक**: केवल **E.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
