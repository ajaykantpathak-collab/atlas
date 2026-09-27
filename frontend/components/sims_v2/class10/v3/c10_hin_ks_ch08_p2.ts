import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch08_p2: SimDef = {
    id: 'v3_c10_hin_ks_ch08_p2',
    title: 'पाठ 8 · Part 2/3',
    subtitle: 'यह नोड प्रतीक और बिंब की अवधारणा, उनकी पहचान, व्याख्या और कविता के संदेश से संबंध स्थापित.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 8 · Part 2/3',
    chapters: ['c10_hin_ks_ch08'],
    nodeIds: ['c10_hin_ks_cbse_08_007', 'c10_hin_ks_cbse_08_008', 'c10_hin_ks_cbse_08_009', 'c10_hin_ks_cbse_08_010', 'c10_hin_ks_cbse_08_011', 'c10_hin_ks_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप अपने दोस्त के साथ कोई फिल्म देख रहे हैं और फिल्म के हीरो के हाथ में एक टूटी हुई घड़ी देखते.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'प्रतीक वह वस्तु, चित्र या क्रिया है जो अपने bezpośred적인 अर्थ के अलावा किसी गहरे विचार, भावना या अवधारणा को संकेत करती है; बिंब वह संवेदनात्मक विवरण है जो पाठक के मन में स्पष्ट चित्र बनाता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — साहित्यिक', 'पाठ 8 — मुख्य', 'पाठ 8 — गौण', 'पाठ 8 — पदावली', 'पाठ 8 — व्याकरण', 'पाठ 8 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_08_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 2/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — पद्य में भाषा‑प्रयोग से तात्पर्य कविता में शब्दों, वाक्यों और व्याकरणिक तत्वों (संधि.', answer: '8 -', options: ['8 -', '8 - -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ (objective) प्रश्न वे हैं जिनका उत्तर पाठ/पद्यांश में **सीधे-सीधे लिखा होता.', answer: '8 - -', options: ['8 - -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 8 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_007', difficulty: 'standard',
          question: 'प्रतीक वह वस्तु, चित्र या क्रिया है जो अपने bezpośred적인 अर्थ के अलावा किसी गहरे.',
          hint: 'यदि समझ में कठिनाई हो तो "रूपक और बिंब में अंतर" नामक पूर्व पाठ (c10_hin_ks_cbse_08_006).',
          misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही समझ लेते हैं और किसी भी चित्रात्मक वर्णन को प्रतीक कहते हैं, जबकि बिंब केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रतीक वह वस्तु, चित्र या क्रिया है जो अपने bezpośred적인 अर्थ के अलावा किसी गहरे विचार,',
                  options: ['प्रतीक वह वस्तु, चित्र या क्रिया है जो अपने bezpośred적인 अर्थ के अलावा किसी गहरे विचार,', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के व्यक्तिगत जीवन, साहित्यिक युग, प्रमुख रचनाओं,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैन्जा) का भाव, विषय, उपयोग', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (छंदों की संख्या, पंक्तियों की'],
                  hint: 'यदि समझ में कठिनाई हो तो "रूपक और बिंब में अंतर" नामक पूर्व पाठ (c10_hin_ks_cbse_08_006) की रूपक.',
                  misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही समझ लेते हैं और किसी भी चित्रात्मक वर्णन को प्रतीक कहते हैं, जबकि बिंब केवल संवेदनात्मक विवरण है जो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही बिंब कई स्थितियों में अलग‑अलग प्रतीक हो सकता है: उदाहरण के लिए, "समुद्री लहर" को शांति का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_008', difficulty: 'standard',
          question: 'मुख्य भाव वह 중심 अनुभूति या मनःस्थिति है जो कवि कविता के माध्यम से व्यक्त करता.',
          hint: 'यदि मुख्य भाव और संदेश में भ्रम हो, तो c10_hin_ks_cbse_08_002 (पद्यांश‑वार भावार्थ) और.',
          misconception: 'छात्र अक्सर मुख्य भाव और संदेश को एक ही मान लेते हैं और लिखते हैं कि “कविता का मुख्य भाव है कि हमें मेहनत करनी चाहिए”.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव वह 중심 अनुभूति या मनःस्थिति है जो कवि कविता के माध्यम से व्यक्त करता है, जबकि',
                  options: ['मुख्य भाव वह 중심 अनुभूति या मनःस्थिति है जो कवि कविता के माध्यम से व्यक्त करता है, जबकि', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के व्यक्तिगत जीवन, साहित्यिक युग, प्रमुख रचनाओं,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैन्जा) का भाव, विषय, उपयोग', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (छंदों की संख्या, पंक्तियों की'],
                  hint: 'यदि मुख्य भाव और संदेश में भ्रम हो, तो c10_hin_ks_cbse_08_002 (पद्यांश‑वार भावार्थ) और.',
                  misconception: 'छात्र अक्सर मुख्य भाव और संदेश को एक ही मान लेते हैं और लिखते हैं कि “कविता का मुख्य भाव है कि हमें मेहनत करनी चाहिए”, जबकि वास्तव में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि कविता की दो पंक्तियों ले कर पहले पूछिए—“ये पंक्तियाँ कवि के मन में क्या भाव जगा रही हैं?” (उदाहरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_009', difficulty: 'standard',
          question: 'गौण भाव कविता में मुख्य rasa को समर्थन देने वाले सहायक भाव हैं (उदाहरण.',
          hint: 'यदि stuck हो तो नोड 004 (केंद्रीय भाव और रस) की समीक्षा करें ताकि मुख्य rasa की पहचान.',
          misconception: 'छात्र अक्सर गौण भाव को मुख्य भाव का ही पर्याय मान लेते हैं और किसी भी उल्लेखित भावना को मुख्य rasa के रूप में लिख देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव कविता में मुख्य rasa को समर्थन देने वाले सहायक भाव हैं (उदाहरण: शांतिप्रद मुख्य',
                  options: ['गौण भाव कविता में मुख्य rasa को समर्थन देने वाले सहायक भाव हैं (उदाहरण: शांतिप्रद मुख्य', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के व्यक्तिगत जीवन, साहित्यिक युग, प्रमुख रचनाओं,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैन्जा) का भाव, विषय, उपयोग', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (छंदों की संख्या, पंक्तियों की'],
                  hint: 'यदि stuck हो तो नोड 004 (केंद्रीय भाव और रस) की समीक्षा करें ताकि मुख्य rasa की पहचान मजबूत हो सके।',
                  misconception: 'छात्र अक्सर गौण भाव को मुख्य भाव का ही पर्याय मान लेते हैं और किसी भी उल्लेखित भावना को मुख्य rasa के रूप में लिख देते हैं, जबकि वास्तव में.' }
          ],
            remediations: { 'rasa': { steps: ['छात्र को सबसे पहले मुख्य rasa की पहचान करने के अभ्यास करवाएँ (उदाहरण: stanza पढ़कर पूछें कि “इसका predominant emotion.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_010', difficulty: 'standard',
          question: 'पदावली शब्दों का भंडार होता है, जिसमें कठिन शब्द (जिनके अर्थ तुरंत स्पष्ट नहीं.',
          hint: 'यदि कठिन शब्दों के अर्थ समझ में नहीं आते तो कक्षा 9 के \'शब्द भंडार\' नोड की समीक्षा करें।',
          misconception: 'छात्र अक्सर मुहावरों के प्रत्येक शब्द के शब्दशः अर्थ जोड़कर कुल अर्थ निकालने की कोशिश करते हैं, जैसे \'हाथ आजमाना\' को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली शब्दों का भंडार होता है, जिसमें कठिन शब्द (जिनके अर्थ तुरंत स्पष्ट नहीं होते) और',
                  options: ['पदावली शब्दों का भंडार होता है, जिसमें कठिन शब्द (जिनके अर्थ तुरंत स्पष्ट नहीं होते) और', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के व्यक्तिगत जीवन, साहित्यिक युग, प्रमुख रचनाओं,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैन्जा) का भाव, विषय, उपयोग', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (छंदों की संख्या, पंक्तियों की'],
                  hint: 'यदि कठिन शब्दों के अर्थ समझ में नहीं आते तो कक्षा 9 के \'शब्द भंडार\' नोड की समीक्षा करें।',
                  misconception: 'छात्र अक्सर मुहावरों के प्रत्येक शब्द के शब्दशः अर्थ जोड़कर कुल अर्थ निकालने की कोशिश करते हैं, जैसे \'हाथ आजमाना\' को \'हाथ से कुछ आजमाना\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['मुहावरे के भावार्थ को समझने के लिए निम्नलिखित चरण अपनाएँ: 1) वाक्य से मुहावरे की पहचान करें (जैसे शब्द समूह जो अजीब.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_011', difficulty: 'standard',
          question: 'पद्य में भाषा‑प्रयोग से तात्पर्य कविता में शब्दों, वाक्यों और व्याकरणिक तत्वों.',
          hint: 'यदि छात्र संधि या समास की पहचान में कठिनाई महसूस करे, तो उसे कक्षा 9 के Hindi Grammar.',
          misconception: 'छात्र अक्सर यह सोचते हैं कि कविता में भाषा‑प्रयोग पूरी तरह स्वच्छंद है और व्याकरण के नियमों को अनदेखा किया जा सकता है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा‑प्रयोग से तात्पर्य कविता में शब्दों, वाक्यों और व्याकरणिक तत्वों (संधि,',
                  options: ['पद्य में भाषा‑प्रयोग से तात्पर्य कविता में शब्दों, वाक्यों और व्याकरणिक तत्वों (संधि,', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के व्यक्तिगत जीवन, साहित्यिक युग, प्रमुख रचनाओं,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैन्जा) का भाव, विषय, उपयोग', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (छंदों की संख्या, पंक्तियों की'],
                  hint: 'यदि छात्र संधि या समास की पहचान में कठिनाई महसूस करे, तो उसे कक्षा 9 के Hindi Grammar chapters.',
                  misconception: 'छात्र अक्सर यह सोचते हैं कि कविता में भाषा‑प्रयोग पूरी तरह स्वच्छंद है और व्याकरण के नियमों को अनदेखा किया जा सकता है; वे मानते हैं कि किसी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस धारणा पर अडिग रहे, तो उसे निम्नलिखित चरणों द्वारा सुधारें: **चरण 1:** दिए गए पद्यांश को slowly aloud पढ़ने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ (objective) प्रश्न वे हैं जिनका उत्तर पाठ/पद्यांश में **सीधे-सीधे.',
          hint: 'If stuck, re-read the poem aloud with node 002 (भावार्थ) and list every factual detail.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आशय-सूचक प्रश्न का उत्तर = पाठ की पंक्तियाँ उद्धृत करना"। वे पंक्ति 3-4 उद्धृत कर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ (objective) प्रश्न वे हैं जिनका उत्तर पाठ/पद्यांश में **सीधे-सीधे लिखा होता',
                  options: ['वस्तुनिष्ठ (objective) प्रश्न वे हैं जिनका उत्तर पाठ/पद्यांश में **सीधे-सीधे लिखा होता', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के व्यक्तिगत जीवन, साहित्यिक युग, प्रमुख रचनाओं,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैन्जा) का भाव, विषय, उपयोग', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (छंदों की संख्या, पंक्तियों की'],
                  hint: 'If stuck, re-read the poem aloud with node 002 (भावार्थ) and list every factual detail (who, what.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आशय-सूचक प्रश्न का उत्तर = पाठ की पंक्तियाँ उद्धृत करना"। वे पंक्ति 3-4 उद्धृत कर लिख देते हैं.' }
          ],
            remediations: { '3-4-reasoning-bridge-3': { steps: ['**पहचान चरण:** छात्र से कहें: "प्रश्न में \'क्यों/कैसे/क्या संकेत\' शब्द हैं?" → हाँ = आशय-सूचक। 2.', '**साक्ष्य चयन:** कहें: "पाठ से **दो** पंक्तियाँ चुनो जो प्रश्न से संबंधित हों।" उन्हें हाइलाइट करवाएँ। 3.', '**तर्क-सेतु निर्माण:** पूछें: "ये पंक्तियाँ प्रश्न के शब्द (जैसे \'घमंडी\') से कैसे जुड़ती हैं?', 'एक वाक्य में बोलो।" — इसे लिखवाएँ। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
