import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch05_p2: SimDef = {
    id: 'v3_c6_hin_ch05_p2',
    title: 'पाठ 5 · Part 2/3',
    subtitle: 'यह नोड केवल गौण विषयों तक सीमित है — बिंब/अलंकार अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 5 · Part 2/3',
    chapters: ['c6_hin_ch05'],
    nodeIds: ['c6_hin_cbse_05_007', 'c6_hin_cbse_05_008', 'c6_hin_cbse_05_009', 'c6_hin_cbse_05_010', 'c6_hin_cbse_05_011', 'c6_hin_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'गौण-मानचित्र: प्रेम-नाज़ुकता (\'धागा\') → बुद्धि-बल (\'सुई\'-\'तरवारि\') → संसाधन-संरक्षण (\'पानी\') → वाणी-प्रबंधन.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — गौण विषय', text: 'गौण विषय — (1) प्रेम की नाज़ुकता (\'धागा प्रेम का\'); (2) बुद्धिमत्ता बनाम बल (\'सुई\' बनाम \'तरवारि\'); (3) संसाधन-संरक्षण (\'पानी रखिये\'); (4) वाणी का प्रबंधन (\'जिह्वा बावरी\'); (5) आशावादी दृष्टिकोण.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — गौण', 'पाठ 5 — साहित्यिक', 'पाठ 5 — पदावली', 'पाठ 5 — व्याकरण', 'पाठ 5 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 2/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — भाषा-प्रयोग — संस्कृत-अरबी मिश्रित लोक-हिंदी: दोहा-छंद (दो पंक्तियाँ, उल्टी-सीधी).', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न — तथ्य पाठ से सीधे: (1) कवि रहीम (अकबर का नवरत्न); (2) 7 दोहे; (3).', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_007', difficulty: 'standard',
          question: 'गौण विषय — (1) प्रेम की नाज़ुकता (\'धागा प्रेम का\'); (2) बुद्धिमत्ता बनाम बल.',
          hint: 'यदि अटका हुआ महसूस हो तो: मुख्य विषय लिखिए, फिर दो ऐसे दोहे जो अलग भाव देते हैं — वही गौण.',
          misconception: 'छात्र \'धागा\' को \'सूत\' या \'रस्सी\' मानते हैं — यह प्रेम-बंधन का प्रतीक है; टूटने पर फिर नहीं जुड़ता।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय — (1) प्रेम की नाज़ुकता (\'धागा प्रेम का\')',
                  options: ['गौण विषय — (1) प्रेम की नाज़ुकता (\'धागा प्रेम का\')', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे'],
                  hint: 'यदि अटका हुआ महसूस हो तो: मुख्य विषय लिखिए, फिर दो ऐसे दोहे जो अलग भाव देते हैं — वही गौण विषय।',
                  misconception: 'छात्र \'धागा\' को \'सूत\' या \'रस्सी\' मानते हैं — यह प्रेम-बंधन का प्रतीक है; टूटने पर फिर नहीं जुड़ता।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) मुख्य विषय से गौण विषय अलग करो। (2) \'धागा\' का प्रेम-प्रतीक समझाओ। (3) \'पानी रखिये\' का संसाधन-अर्थ दिखाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_008', difficulty: 'standard',
          question: 'बिंब — \'तरुवर फल नहिं खात हैं\' (पेड़-दृश्य), \'सरवर पीय न पान\' (तालाब-दृश्य).',
          hint: 'यदि अटका हुआ महसूस हो तो: एक दोहा पढ़िए, आँखें बंद करके देखिए — \'तरुवर\' या \'धागा\' का.',
          misconception: 'छात्र \'जिह्वा\' को \'केवल जीभ\' मानते हैं — \'बावरी\' के साथ वह अनियंत्रित वाणी का मानसिक-बिंब बन जाती है; दृश्य नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब — \'तरुवर फल नहिं खात हैं\' (पेड़-दृश्य), \'सरवर पीय न पान\' (तालाब-दृश्य), \'धागा प्रेम',
                  options: ['बिंब — \'तरुवर फल नहिं खात हैं\' (पेड़-दृश्य), \'सरवर पीय न पान\' (तालाब-दृश्य), \'धागा प्रेम', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक दोहा पढ़िए, आँखें बंद करके देखिए — \'तरुवर\' या \'धागा\' का दृश्य आएगा।',
                  misconception: 'छात्र \'जिह्वा\' को \'केवल जीभ\' मानते हैं — \'बावरी\' के साथ वह अनियंत्रित वाणी का मानसिक-बिंब बन जाती है; दृश्य नहीं, मानसिक।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) पाँच बिंब सूची बनवाओ — तरुवर, सरवर, धागा, सुई, जिह्वा। (2) हर बिंब की श्रेणी लिखो — दृश्य, बंधन, मानसिक।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_009', difficulty: 'standard',
          question: 'अलंकार/युक्तियाँ — रूपक (\'तरुवर\' = निस्वार्थ सेवक, \'धागा\' = प्रेम-बंधन, \'पानी\'.',
          hint: 'यदि अटका हुआ महसूस हो तो: तीन अलंकारों की परिभाषा लिखिए, फिर दोहों से उदाहरण खोजिए — \'सी\'.',
          misconception: 'छात्र \'तरुवर\' को \'केवल पेड़\' मानते हैं — यहाँ पेड़ निस्वार्थ सेवक का रूपक है; \'सी\' नहीं है इसलिए उपमा नहीं, रूपक।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार/युक्तियाँ',
                  options: ['अलंकार/युक्तियाँ', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे'],
                  hint: 'यदि अटका हुआ महसूस हो तो: तीन अलंकारों की परिभाषा लिखिए, फिर दोहों से उदाहरण खोजिए — \'सी\' नहीं है.',
                  misconception: 'छात्र \'तरुवर\' को \'केवल पेड़\' मानते हैं — यहाँ पेड़ निस्वार्थ सेवक का रूपक है; \'सी\' नहीं है इसलिए उपमा नहीं, रूपक।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) रूपक बनाम उपमा का अंतर — \'सी\' सूचक देखो। (2) \'तरुवर\' का रूपक-अर्थ बताओ — निस्वार्थ सेवक। (3).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_010', difficulty: 'standard',
          question: 'पदावली — मुख्य शब्द: बडेन (बड़े/महान), कसौटि (परीक्षण-पत्थर), लघु (छोटा), तरुवर.',
          hint: 'यदि अटका हुआ महसूस हो तो: शब्द को टुकड़ों में तोड़िए — \'कसौटि\' = कसौटी (परीक्षण); \'तरुवर\'.',
          misconception: 'छात्र \'घटित\' को \'घटना\' (घटना) समझते हैं — \'घटित\' = बिगड़ना/दूषित होना; \'घटित हो जाये\' = बिगड़ जाए।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली — मुख्य शब्द: बडेन (बड़े/महान), कसौटि (परीक्षण-पत्थर), लघु (छोटा), तरुवर (पेड़),',
                  options: ['पदावली — मुख्य शब्द: बडेन (बड़े/महान), कसौटि (परीक्षण-पत्थर), लघु (छोटा), तरुवर (पेड़),', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे'],
                  hint: 'यदि अटका हुआ महसूस हो तो: शब्द को टुकड़ों में तोड़िए — \'कसौटि\' = कसौटी (परीक्षण); \'तरुवर\' = तरु+वर.',
                  misconception: 'छात्र \'घटित\' को \'घटना\' (घटना) समझते हैं — \'घटित\' = बिगड़ना/दूषित होना; \'घटित हो जाये\' = बिगड़ जाए।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) कठिन शब्दों की सूची बनवाओ — बडेन, कसौटि, तरुवर, सरवर, जिह्वा, सगुन। (2) \'घटित\' बनाम \'घटना\' का अंतर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग — संस्कृत-अरबी मिश्रित लोक-हिंदी: दोहा-छंद (दो पंक्तियाँ.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक दोहा पढ़िए, ताली से लय बजाइए — \'रहिमन\' की गूँज सुनिए; भाषा.',
          misconception: 'छात्र \'करै\' को \'करता है\' की तरह वर्तमान मानते हैं — यह मध्ययुगीय क्रिया-रूप है; आज \'करे\' होता; युग-भाषा का ज्ञान ज़रूरी।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग — संस्कृत-अरबी मिश्रित लोक-हिंदी: दोहा-छंद (दो पंक्तियाँ, उल्टी-सीधी),',
                  options: ['भाषा-प्रयोग — संस्कृत-अरबी मिश्रित लोक-हिंदी: दोहा-छंद (दो पंक्तियाँ, उल्टी-सीधी),', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक दोहा पढ़िए, ताली से लय बजाइए — \'रहिमन\' की गूँज सुनिए; भाषा का लय.',
                  misconception: 'छात्र \'करै\' को \'करता है\' की तरह वर्तमान मानते हैं — यह मध्ययुगीय क्रिया-रूप है; आज \'करे\' होता; युग-भाषा का ज्ञान ज़रूरी।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) दोहा-छंद की संरचना दिखाओ — उल्टी-सीधी। (2) \'रहिमन\' का आत्म-संबोधन समझाओ। (3) \'करै\', \'जाये\' का मध्ययुगीय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न — तथ्य पाठ से सीधे: (1) कवि रहीम (अकबर का नवरत्न); (2) 7.',
          hint: 'यदि अटका हुआ महसूस हो तो: प्रश्न का मुख्य शब्द (जैसे \'जिह्वा\') पाठ में खोजिए — उत्तर वहीं.',
          misconception: 'छात्र \'घटित\' को \'घटना\' मानते हैं — \'घटित\' = बिगड़ना/दूषित होना; \'धागा घटित हो जाये\' = प्रेम-बंधन बिगड़ जाए।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न',
                  options: ['वस्तुनिष्ठ प्रश्न', 'रहीम दास (अब्दुर्रहीम खान-ए-खाना, 1556–1627)', 'दोहा-पाठ — 7 दोहे: (1) \'रहिमन देखि बडेन को, लघु कसौटि न करै\' — महान को परीक्षा न दो', 'पाठ्य-परिवेश — मध्ययुग का दरबारी और लोक-जीवन: अकबर का दरबार जहाँ रहीम नवरत्न थे'],
                  hint: 'यदि अटका हुआ महसूस हो तो: प्रश्न का मुख्य शब्द (जैसे \'जिह्वा\') पाठ में खोजिए — उत्तर वहीं है.',
                  misconception: 'छात्र \'घटित\' को \'घटना\' मानते हैं — \'घटित\' = बिगड़ना/दूषित होना; \'धागा घटित हो जाये\' = प्रेम-बंधन बिगड़ जाए।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) तथ्य-प्रश्न पाठ से निकलवाओ। (2) \'घटित\' = बिगड़ना बताओ। (3) \'बडेन\', \'कसौटि\', \'जिह्वा\' का अर्थ रटवाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
