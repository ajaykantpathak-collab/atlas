import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch24_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch24_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch24_p3',
    title: 'डायरी का एक पन्ना · Part 3/3',
    subtitle: 'यह नोड पाठ के **सारांश लेखन** या **पात्र-चित्रण** को कवर नहीं करता (वे पूर्ववर्ती नोड्स.',
    classLevel: 10, subject: 'hin_sp', topic: 'डायरी का एक पन्ना · Part 3/3',
    chapters: ['c10_hin_sp_ch24'],
    nodeIds: ['c10_hin_sp_cbse_24_013', 'c10_hin_sp_cbse_24_014', 'c10_hin_sp_cbse_24_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'डायरी का एक पन्ना\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'डायरी का एक पन्ना — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'डायरी का एक पन्ना\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_24_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['डायरी का एक पन्ना'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_24_015', title: 'You made it',
          caseStudy: { intro: 'You finished डायरी का एक पन्ना — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_013', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि अटकें तो **c10_hin_sp_cbse_24_008 (बिंब/रूपक)** और **c10_hin_sp_cbse_24_009.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आलोचनात्मक विश्लेषण\' का अर्थ है — पाठ की **कमियाँ निकालना** (criticize.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' का आलोचनात्मक चिंतन',
                  options: ['\'डायरी का एक पन्ना\' का आलोचनात्मक चिंतन', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटकें तो **c10_hin_sp_cbse_24_008 (बिंब/रूपक)** और **c10_hin_sp_cbse_24_009 (विरोधाभास)** के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आलोचनात्मक विश्लेषण\' का अर्थ है — पाठ की **कमियाँ निकालना** (criticize negatively) या केवल.' }
          ],
            remediations: { 'criticize-negatively-list-devices-function': { steps: ['**चरण 1:** छात्र से कहें — "पाठ का कोई एक वाक्य चुनो जो तुम्हें सबसे मार्मिक लगा। बताओ **क्यों**?" (यह \'युक्ति\' से.', '**चरण 2:** उस वाक्य में प्रयुक्त **एक युक्ति** (बिंब/विरोधाभास/अनुप्रास) पहचानने को कहें। 3.', '**चरण 3:** पूछें — "अगर लेखक यह युक्ति न प्रयोग करता, साधारण भाषा में कह देता — तो **क्या अंतर पड़ता**?" (यह.', '**चरण 4:** अब उसी तर्क को **दो अन्य अंशों** पर लागू करने का अभ्यास कराएँ। धीरे-धीरे छात्र \'सूची बनाने\' से \'व्याख्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_014', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि अटके तो **\'पात्र-चित्रण: नायक\' (c10_hin_sp_cbse_24_004)** दोबारा पढ़ें — विशेषकर लेखक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पाठ-आधारित डायरी लेखन\' का अर्थ है पाठ की घटनाओं का **सारांश (Summary)** लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' पर पाठ-आधारित लेखन',
                  options: ['\'डायरी का एक पन्ना\' पर पाठ-आधारित लेखन', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **\'पात्र-चित्रण: नायक\' (c10_hin_sp_cbse_24_004)** दोबारा पढ़ें — विशेषकर लेखक के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पाठ-आधारित डायरी लेखन\' का अर्थ है पाठ की घटनाओं का **सारांश (Summary)** लिख देना, वह भी **तीसरे.' }
          ],
            remediations: { 'summary': { steps: ['**प्रारूप अभ्यास:** छात्र से कहें — "केवल प्रारूप (तिथि, संबोधन, हस्ताक्षर) 5 बार लिखो, बिना कथ्य के।" इससे मांसपेशी.', '**दृष्टिकोण परिवर्तन:** पाठ का एक छोटा पैराग्राफ (3-4 पंक्तियाँ) दें और कहें — "इसे \'मैं\' (लेखक) बनकर दोबारा लिखो।".', '**भावना-मानचित्रण (Emotion Mapping):** पाठ की मुख्य घटना (माँ की बीमारी) लें; बोर्ड पर लिखें — घटना → विचार → भावना →.', '**समयबद्ध अभ्यास:** 10 मिनट का टाइमर लगाकर एक पूर्ण डायरी लिखवाएँ; फिर CBSE मार्किंग स्कीम (प्रारूप 2, कथ्य 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_015', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श.',
          hint: 'यदि अटके हों तो **c10_hin_sp_cbse_24_006 (मुख्य विषय और संदेश)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि चर्चा-बिंदु पर बोलने का अर्थ है **पाठ के उस भाग को \'याद करके सुना देना\'** (rote.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'डायरी का एक पन्ना\' पर वाचन-श्रवण और चर्चा-बिंदु', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके हों तो **c10_hin_sp_cbse_24_006 (मुख्य विषय और संदेश)** और **c10_hin_sp_cbse_24_004.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि चर्चा-बिंदु पर बोलने का अर्थ है **पाठ के उस भाग को \'याद करके सुना देना\'** (rote reproduction)। वे.' }
          ],
            remediations: { 'rote-reproduction-content-analysis-5': { steps: ['**चरणबद्ध उपचार:** 1) **मॉडलिंग:** शिक्षक स्वयं एक चर्चा-बिंदु (जैसे: "डायरी एक चिकित्सक है") ले और **सोचते हुए बोलें**.', 'यहाँ लिखा है \'लिखकर मन हल्का हुआ\'...', 'इसका अर्थ है डायरी दवा का काम करती है...', 'अब मैं यह तर्क बनाऊँगा।" 2) **निर्देशित अभ्यास:** छात्रों को **दो कॉलम** वाला वर्कशीट दें — बायाँ: **"पाठ का वाक्य"**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
