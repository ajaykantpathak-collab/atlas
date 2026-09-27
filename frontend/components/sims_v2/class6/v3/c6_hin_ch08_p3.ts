import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch08_p3: SimDef = {
    id: 'v3_c6_hin_ch08_p3',
    title: 'पाठ 8 · Part 3/3',
    subtitle: 'इस नोड में कक्षा 6 स्तर पर **पाठ-आधारित तर्क निर्माण** (evidence-based reasoning) सिखाया.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 8 · Part 3/3',
    chapters: ['c6_hin_ch08'],
    nodeIds: ['c6_hin_cbse_08_013', 'c6_hin_cbse_08_014', 'c6_hin_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो तुमने एक विज्ञापन देखा: "यह साबुन ९९.९% कीटाणु मारता है।" तुम तुरंत मान लोगे या पूछोगे: "कौन-से.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के तथ्यों, तर्कों और साहित्यिक युक्तियों की जाँच करके **स्वतंत्र, तर्कसंगत व्याख्या** बनाने की प्रक्रिया है — न कि केवल लेखक की बात मान लेना।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — आलोचनात्मक', 'पाठ 8 — लेखन', 'पाठ 8 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_08_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 3/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन वह कौशल है जिसमें छात्र किसी दिए गए पाठ (गद्य/पद्य) से **प्रमाण.', answer: '8 -', options: ['8 -', '8 - -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — \'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगात्मक भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर.', answer: '8 - -', options: ['8 - -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 8 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के तथ्यों, तर्कों और साहित्यिक.',
          hint: 'अगर अटके तो **नोड ०१२ (बोध-प्रश्न)** के "आशय-सूचक प्रश्न" दोबारा हल करो — वे प्रमाण.',
          misconception: 'छात्र मानते हैं कि **"आलोचनात्मक चिंतन = नकारात्मक आलोचना (fault-finding)"**। उदाहरण: पढ़ते ही कहते हैं "लेखक गलत है".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के तथ्यों, तर्कों और साहित्यिक युक्तियों की जाँच',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के तथ्यों, तर्कों और साहित्यिक युक्तियों की जाँच', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),'],
                  hint: 'अगर अटके तो **नोड ०१२ (बोध-प्रश्न)** के "आशय-सूचक प्रश्न" दोबारा हल करो — वे प्रमाण ढूँढ़ने का.',
                  misconception: 'छात्र मानते हैं कि **"आलोचनात्मक चिंतन = नकारात्मक आलोचना (fault-finding)"**। उदाहरण: पढ़ते ही कहते हैं "लेखक गलत है" या "कहानी बेकार है".' }
          ],
            remediations: { 'fault-finding': { steps: ['छात्र से कहो: "चलो एक विज्ञापन लेते हैं — \'यह चॉकलेट खाने से तुम बुद्धिमान बन जाओगे।\' क्या तुम मान लोगे?', 'उसे **प्रश्न सूची** बनाने को कहो: "कौन कह रहा है?', 'अब पाठ पर लौटो: "लेखक ने क्या दावा किया?', 'उसके लिए कौन-से वाक्य प्रमाण हैं?" ४.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन वह कौशल है जिसमें छात्र किसी दिए गए पाठ (गद्य/पद्य) से **प्रमाण.',
          hint: 'यदि फँस जाएँ तो **c6_hin_cbse_08_012 (बोध-प्रश्न)** के \'आशय-सूचक प्रश्न\' दोबारा हल करें.',
          misconception: '**भ्रांति**: *"पाठ-आधारित लेखन का अर्थ है पाठ की पंक्तियाँ उठाकर जोड़ देना (copy-paste) और थोड़े अपने शब्द डाल देना।"*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन वह कौशल है जिसमें छात्र किसी दिए गए पाठ (गद्य/पद्य) से **प्रमाण',
                  options: ['पाठ-आधारित लेखन वह कौशल है जिसमें छात्र किसी दिए गए पाठ (गद्य/पद्य) से **प्रमाण', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),'],
                  hint: 'यदि फँस जाएँ तो **c6_hin_cbse_08_012 (बोध-प्रश्न)** के \'आशय-सूचक प्रश्न\' दोबारा हल करें — वही कौशल.',
                  misconception: '**भ्रांति**: *"पाठ-आधारित लेखन का अर्थ है पाठ की पंक्तियाँ उठाकर जोड़ देना (copy-paste) और थोड़े अपने शब्द डाल देना।"* **वास्तविकता**.' }
          ],
            remediations: { 'copy-paste-evidence': { steps: ['**चरण 1**: छात्र को एक **कमज़ोर उत्तर** और एक **मज़बूत उत्तर** साथ-साथ दिखाएँ (ऊपर वाला उदाहरण)। पूछें: *"दूसरे में ऐसा.', 'तीन संभावनाएँ लिखो।"* (उदाहरण: वह लापरवाह था / उसके पास छाता नहीं था / वह जानबूझकर भीगा)। **चरण 3**: **PEEL टेम्पलेट**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगात्मक भाषा कौशल है जिसमें छात्र किसी पाठ को.',
          hint: 'यदि अटके तो **\'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक\' (c6_hin_cbse_08_012)** के अभ्यास.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'चर्चा में अच्छा बोलने वाला वही है जो सबसे ज्यादा बोले, सबसे तेज बोले, या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगात्मक भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगात्मक भाषा कौशल है जिसमें छात्र किसी पाठ को पढ़कर', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),'],
                  hint: 'यदि अटके तो **\'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक\' (c6_hin_cbse_08_012)** के अभ्यास दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'चर्चा में अच्छा बोलने वाला वही है जो सबसे ज्यादा बोले, सबसे तेज बोले, या सबसे कठिन शब्दों का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (4 चरण):** 1.', '**मॉडलिंग (Modeling):** शिक्षक दो छात्रों के साथ मिलकर एक \'खराब चर्चा\' (बीच में काटना, विषय से भटकना, चिल्लाना) और फिर.', '**वाक्य-शुरुआत कार्ड (Sentence Starters):** कार्ड बाँटें जिन पर लिखा हो: "मैं तुम्हारी बात से सहमत हूँ क्योंकि...".', '**\'टॉकिंग टोकन\' (Talking Token):** छोटी गेंद या पेन दें। जिसके पास टोकन, वही बोले। बोलने के बाद टोकन किसी ऐसे को दे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
