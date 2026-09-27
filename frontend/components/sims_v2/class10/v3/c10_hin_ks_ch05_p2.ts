import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch05_p2: SimDef = {
    id: 'v3_c10_hin_ks_ch05_p2',
    title: 'पाठ 5 · Part 2/3',
    subtitle: 'इस नोड में प्रतीक और बिंब की पहचान, उनके अर्थ का विश्लेषण और कविता के संदेश से संबंध.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 5 · Part 2/3',
    chapters: ['c10_hin_ks_ch05'],
    nodeIds: ['c10_hin_ks_cbse_05_007', 'c10_hin_ks_cbse_05_008', 'c10_hin_ks_cbse_05_009', 'c10_hin_ks_cbse_05_010', 'c10_hin_ks_cbse_05_011', 'c10_hin_ks_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप सड़क पर लाल बत्ती देखते हैं — तुरंत आपका मन रुकने का संकेत देता है, क्योंकि लाल बत्ती रुकने.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: 'प्रतीक (symbol) वह शब्द, वस्तु या क्रिया है जो अपने शाब्दिक अर्थ से परे कोई गहरा भाव या विचार दर्शाता है। बिंब (image) वह भाषा का प्रयोग है जो पाठक के किसी इंद्रिय (दृष्टि, श्रवण, स्पर्श, स्वाद, गंध).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — साहित्यिक', 'पाठ 5 — मुख्य', 'पाठ 5 — गौण', 'पाठ 5 — पदावली', 'पाठ 5 — व्याकरण', 'पाठ 5 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 2/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — पद्य में भाषा-प्रयोग से तात्पर्य कविता में व्याकरणिक नियमों के लचीले प्रयोग से है — जैसे.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ/कविता में स्पष्ट रूप से लिखा होता है.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_05_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_007', difficulty: 'standard',
          question: 'प्रतीक (symbol) वह शब्द, वस्तु या क्रिया है जो अपने शाब्दिक अर्थ से परे कोई.',
          hint: 'यदि किसी छात्र को प्रतीक और बिंब के बीच अंतर समझ में न आए तो वे नोड.',
          misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही चीज़ मान लेते हैं और किसी भी vivid वर्णन (जैसे “गुलाबी आकाश”) को प्रतीक लिख देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'प्रतीक (symbol) वह शब्द, वस्तु या क्रिया है जो अपने शाब्दिक अर्थ से परे कोई गहरा भाव या',
                  options: ['प्रतीक (symbol) वह शब्द, वस्तु या क्रिया है जो अपने शाब्दिक अर्थ से परे कोई गहरा भाव या', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक'],
                  hint: 'यदि किसी छात्र को प्रतीक और बिंब के बीच अंतर समझ में न आए तो वे नोड c10_hin_ks_cbse_05_006 (अलंकार).',
                  misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही चीज़ मान लेते हैं और किसी भी vivid वर्णन (जैसे “गुलाबी आकाश”) को प्रतीक लिख देते हैं, जबकि वास्तव में.' }
          ],
            remediations: { 'vivid': { steps: ['सबसे पहले छात्र से दो अलग‑अलग उदाहरण माँगिए: एक ऐसा जो सिर्फ़ इंद्रिय को स्पर्श करता है (बिंब, जैसे “बरसात की टप‑टप.', 'फिर उन्हें तीन‑चरणीय चेक‑लिस्ट सिखाइए: (1) क्या शब्द/वाक्य किसी इंद्रिय (दृष्टि, श्रवण आदि) को जगाता है?', 'यदि हाँ → बिंब। (2) क्या वही वस्तु/क्रिया अपने आप से परे कोईidea (शांति, संघर्ष, आशा) भी दर्शाता है?', 'यदि हाँ → प्रतीक। (3) यदि दोनों सत्य हों तो वह दोनों हो सकता है (जैसे “जलती मशाल” – दृष्टि‑बिंब + ज्ञान‑प्रतीक)। इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_008', difficulty: 'standard',
          question: '**मुख्य भाव** कविता का **केंद्रीय विचार** (central idea) है जो कवि संपूर्ण रचना.',
          hint: 'अगर अटके तो **c10_hin_ks_cbse_05_004 (केंद्रीय भाव और रस)** दोहराओ — वहाँ "भाव पहचानने के.',
          misconception: '**विशिष्ट भ्रम**: छात्र **मुख्य भाव** लिखते समय **कविता का सारांश (summary)** लिख देते हैं — जैसे *"कवि कहते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य भाव** कविता का **केंद्रीय विचार** (central idea) है जो कवि संपूर्ण रचना के माध्यम',
                  options: ['**मुख्य भाव** कविता का **केंद्रीय विचार** (central idea) है जो कवि संपूर्ण रचना के माध्यम', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक'],
                  hint: 'अगर अटके तो **c10_hin_ks_cbse_05_004 (केंद्रीय भाव और रस)** दोहराओ — वहाँ "भाव पहचानने के 3 चिह्न".',
                  misconception: '**विशिष्ट भ्रम**: छात्र **मुख्य भाव** लिखते समय **कविता का सारांश (summary)** लिख देते हैं — जैसे *"कवि कहते हैं कि उत्साह जरूरी है, बिना.' }
          ],
            remediations: { 'summary': { steps: ['**चरण 1**: छात्र से कहो — *"कविता को एक वाक्य में बताओ जैसे किसी को SMS कर रहे हो — 160 अक्षर में।"* **चरण 2**: उसका.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_009', difficulty: 'standard',
          question: 'गौण भाव वहsecondary feeling (secondary feeling) होता है जो कविता के मुख्य भाव.',
          hint: 'यदि गौण भाव की पहचान में कठिनाई हो तो पिछले नोड c10_hin_ks_cbse_05_004 (केंद्रीय भाव और.',
          misconception: 'छात्रしばしば गौण भाव को मुख्य भाव मान लेते हैं क्योंकि वे केवल भाव की तीव्रता देखते हैं और यह नहीं जाँचते कि वह भाव कविता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव वहsecondary feeling (secondary feeling) होता है जो कविता के मुख्य भाव को समर्थन',
                  options: ['गौण भाव वहsecondary feeling (secondary feeling) होता है जो कविता के मुख्य भाव को समर्थन', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक'],
                  hint: 'यदि गौण भाव की पहचान में कठिनाई हो तो पिछले नोड c10_hin_ks_cbse_05_004 (केंद्रीय भाव और रस) की.',
                  misconception: 'छात्रしばしば गौण भाव को मुख्य भाव मान लेते हैं क्योंकि वे केवल भाव की तीव्रता देखते हैं और यह नहीं जाँचते कि वह भाव कविता में कितनी बार या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र गौण भाव को मुख्य भाव मान रहे हों, तो निम्न चरण अपनाएँ: चरण 1: छात्र से कविता की कॉपी दें और उनसे प्रत्येक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_010', difficulty: 'standard',
          question: 'कठिन शब्द वे शब्द हैं जिनका अर्थ पाठ्यबुक में स्पष्ट नहीं होता और जिन्हें.',
          hint: 'यदि कठिन शब्दों का अर्थ नहीं समझ में आता, तो कक्षा 9 के ‘शब्दार्थ और पर्यायवाची’ अध्याय.',
          misconception: 'छात्र अक्सर मानते हैं कि मुहावरे का अर्थ उसके प्रत्येक शब्द के शब्दार्थ को जोड़कर निकाला जा सकता है, जैसे “हाथ धोना” को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कठिन शब्द वे शब्द हैं जिनका अर्थ पाठ्यबुक में स्पष्ट नहीं होता और जिन्हें शब्दकोश या',
                  options: ['कठिन शब्द वे शब्द हैं जिनका अर्थ पाठ्यबुक में स्पष्ट नहीं होता और जिन्हें शब्दकोश या', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक'],
                  hint: 'यदि कठिन शब्दों का अर्थ नहीं समझ में आता, तो कक्षा 9 के ‘शब्दार्थ और पर्यायवाची’ अध्याय की समीक्षा.',
                  misconception: 'छात्र अक्सर मानते हैं कि मुहावरे का अर्थ उसके प्रत्येक शब्द के शब्दार्थ को जोड़कर निकाला जा सकता है, जैसे “हाथ धोना” को literally हाथ धोने.' }
          ],
            remediations: { 'wrong-idea': { steps: ['उपरांत misconception को दूर करने के लिए निम्नलिखित चरण अपनाएँ: 1.', 'सबसे पहले मुहावरे के शब्दों को अलग‑अलग लिखिए और उनके शब्दार्थ बताइए (हाथ = हाथ, धोना = साफ करना)। 2.', 'फिर वाक्य में मुहावरे के प्रयोग वाले उदाहरण दिजिए और पूछिए: “इस वाक्य में क्या सच में हाथ धोए जा रहे हैं?” 3.', 'यदि छात्र कहता है “नहीं”, तो स्पष्ट कीजिए कि मुहावरे का अर्थ figurative होता है और यहाँ “जिम्मेदारी से मुक्त होना” है।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग से तात्पर्य कविता में व्याकरणिक नियमों के लचीले प्रयोग से.',
          hint: 'यदि अटके तो **कक्षा 9 हिंदी व्याकरण: वाक्य विचार (पदक्रम), संधि-लोप, अव्यय** दोहराएँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र पद्य में व्याकरणिक विचलन (जैसे "नहीं अट रही" के स्थान पर "अट नहीं रही") को **\'व्याकरण की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग से तात्पर्य कविता में व्याकरणिक नियमों के लचीले प्रयोग से है',
                  options: ['पद्य में भाषा-प्रयोग से तात्पर्य कविता में व्याकरणिक नियमों के लचीले प्रयोग से है', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक'],
                  hint: 'यदि अटके तो **कक्षा 9 हिंदी व्याकरण: वाक्य विचार (पदक्रम), संधि-लोप, अव्यय** दोहराएँ — विशेषकर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र पद्य में व्याकरणिक विचलन (जैसे "नहीं अट रही" के स्थान पर "अट नहीं रही") को **\'व्याकरण की गलती\' (Grammar Error)**.' }
          ],
            remediations: { 'grammar-error': { steps: ['**तुलना दिखाओ:** बोर्ड पर दो वाक्य लिखो — "वह नहीं आया" (गद्य) vs "नहीं आया वह" (पद्य)। पूछो: "दोनों का अर्थ समान है?', '**छंद से जोड़ो:** उसी पंक्ति की मात्रा गणना कराओ — दिखाओ कि "नहीं अट रही" (गुरु-लघु-गुरु) छंद में फिट बैठता है, "अट.', '**भाव-प्रभाव पूछो:** "कौन-सा वाक्य ज्यादा विवशता दिखाता है?" — छात्र स्वयं "नहीं अट रही" चुनेगा। 4.', '**नाम दो:** अब बताओ: "इस जानबूझकर किए गए बदलाव को **अनस्तुति/काव्य स्वतंत्रता** कहते हैं, गलती नहीं।" — यह अवधारणा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ/कविता में स्पष्ट रूप से.',
          hint: 'यदि छात्र अटके तो **नोड 002 (पद्यांश-वार भावार्थ)** और **नोड 010 (पदावली)** दोबारा पढ़े.',
          misconception: '**सटीक भ्रांति**: छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर देने के लिए कविता की पंक्ति **ज्यों-की-त्यों उद्धृत** कर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ/कविता में स्पष्ट रूप से लिखा होता है',
                  options: ['**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ/कविता में स्पष्ट रूप से लिखा होता है', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक'],
                  hint: 'यदि छात्र अटके तो **नोड 002 (पद्यांश-वार भावार्थ)** और **नोड 010 (पदावली)** दोबारा पढ़े; विशेषकर उन.',
                  misconception: '**सटीक भ्रांति**: छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर देने के लिए कविता की पंक्ति **ज्यों-की-त्यों उद्धृत** कर देना पर्याप्त है।".' }
          ],
            remediations: { '9-inferential-1': { steps: ['**चरण 1**: छात्र को 5 मिश्रित प्रश्न दो (3 वस्तुनिष्ठ, 2 आशय-सूचक) और कहो: "प्रश्न के अंतिम शब्द को गोला लगाओ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
