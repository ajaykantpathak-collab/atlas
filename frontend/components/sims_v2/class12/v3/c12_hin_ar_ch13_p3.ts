import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch13_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch13_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch13_p3',
    title: 'पहलवान की ढोलक · Part 3/3',
    subtitle: 'The king knew his name; the new order didn\'t',
    classLevel: 12, subject: 'hin_ar', topic: 'पहलवान की ढोलक · Part 3/3',
    chapters: ['c12_hin_ar_ch13'],
    nodeIds: ['c12_hin_ar_cbse_13_013', 'c12_hin_ar_cbse_13_014', 'c12_hin_ar_cbse_13_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental-fiction reader', intro: 'A folk singer\'s world ran on patronage and memory. Then the rules changed — and rules don\'t remember anyone.', goal: 'Read Dwivedi\'s story as the collision of feudal patronage and institutional modernity through a folk artist\'s fate.' },
    discovery: {
        question: 'A folk singer thrives under a king\'s patronage — then a new system of laws arrives that recognises neither his art nor his claim. What actually changed?',
        options: ['Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority', 'Just the ruler changed', 'The singer lost his voice', 'Art became free'],
        answer: 'Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority',
        hook: 'Dwivedi pioneered experimental fiction in Hindi — folk speech, oral rhythm, the lives of common people rendered with documentary warmth. The story isn\'t nostalgia for kings; it stages the collision where \'the system\' replaced \'the sovereign\' — and nobody told the artist.',
    },
    teaching: [
        { title: 'पहलवान की ढोलक — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) इस पाठ में पाठ्य-सामग्री के पार जाकर लेखक के अंतर्निहित उद्देश्य, प्रतीकों की बहु-स्तरीय व्याख्या, पात्रों के मनोवैज्ञानिक द्वंद्व और सामाजिक यथार्थ की पड़ताल.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_13_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch a folk artist meet the new order: weigh the king\'s court against bureaucratic law, track how art becomes \'profession\' under pressure, and find where dignity survives the transition.',
        labels: ['पहलवान की ढोलक —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A folk singer from your district gets signed by a big label that drops her dialect, renames her, and reworks her songs into a commercial formula. Two years later she returns to perform in a hometown she barely recognises — and only family gathers to listen.',
            decisions: [{ prompt: 'How does \'युगुक की ढोलकी\' / the flautist\'s tale frame her trajectory?', options: [
                { text: 'As ironic return — the village flautist\'s music was the community\'s lifeblood until court patronage lifted him out; he comes back to a transformed village where his art survives only as a private act for grandchildren — the circle closes but the commons is gone.', outcome: 'The chapter\'s structural point is that the ending mirrors the opening with the centre shifted: patronage didn\'t just elevate the artist, it displaced the audience — her homecoming performance is the same image, emptied.' },
                { text: 'As a success story — she gained a platform the village could never give her, so the arc is upward.', outcome: 'That reads the rise and skips the resolution\'s irony: the flautist also \'rose\' to court, and the story counts what the rise cost — a village waking to sirens instead of music isn\'t the same audience at a new address.', reveals: 'platform-equals-progress' },
                { text: 'As proof she should never have left — artists who take patronage are sellouts.', outcome: 'The story doesn\'t damn the move; it mourns the structural change — the new order that renamed the village and industrialised its rhythm. The artist didn\'t sell the community; the ground under it was sold around both.', reveals: 'patronage-equals-betrayal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a period story as a study of systems changing — and spot the person caught between the old legitimacy and the new.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) इस पाठ में पाठ्य-सामग्री के पार जाकर लेखक.',
          hint: 'यदि प्रतीक व्याख्या में अटके: c12_hin_ar_cbse_13_008 (बिंब और रूपक) और.',
          misconception: 'छात्र अक्सर \'आलोचनात्मक चिंतन\' को \'नकारात्मक आलोचना\' (fault-finding) समझ बैठते हैं और पाठ में केवल कमियाँ गिनाने लगते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) इस पाठ में पाठ्य-सामग्री के पार जाकर लेखक के',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) इस पाठ में पाठ्य-सामग्री के पार जाकर लेखक के', '\'पहलवान की ढोलक\' फणीश्वरनाथ रेणु द्वारा लिखित एक मार्मिक कहानी है जो ग्रामीण बिहार के', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम वाला क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र संदर्भ है जिसमें'],
                  hint: 'यदि प्रतीक व्याख्या में अटके: c12_hin_ar_cbse_13_008 (बिंब और रूपक) और c12_hin_ar_cbse_13_009.',
                  misconception: 'छात्र अक्सर \'आलोचनात्मक चिंतन\' को \'नकारात्मक आलोचना\' (fault-finding) समझ बैठते हैं और पाठ में केवल कमियाँ गिनाने लगते हैं (जैसे: \'लेखक ने.' }
          ],
            remediations: { 'fault-finding': { steps: ['चरण 1: छात्र से कहें — "पाठ का कोई एक वाक्य चुनो जो तुम्हें \'अजीब\' या \'विरोधाभासी\' लगा हो (जैसे: बलवान पहलवान नाचता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_014', difficulty: 'standard',
          question: '"लेखन कौशल: पाठ-आधारित" का अर्थ है NCERT पाठ "पहलवान की ढोलक" के कथ्य, पात्र.',
          hint: 'यदि PEEL संरचना लागू करने में अटके → **c11_hin_ar_cbse_13_014** (कक्षा 11 का समान नोड) पर.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित लेखन का अर्थ है पाठ की बातें अपने शब्दों में दोहराना (paraphrasing)।"*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"लेखन कौशल: पाठ-आधारित" का अर्थ है NCERT पाठ "पहलवान की ढोलक" के कथ्य, पात्र, शिल्प,',
                  options: ['"लेखन कौशल: पाठ-आधारित" का अर्थ है NCERT पाठ "पहलवान की ढोलक" के कथ्य, पात्र, शिल्प,', '\'पहलवान की ढोलक\' फणीश्वरनाथ रेणु द्वारा लिखित एक मार्मिक कहानी है जो ग्रामीण बिहार के', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम वाला क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र संदर्भ है जिसमें'],
                  hint: 'यदि PEEL संरचना लागू करने में अटके → **c11_hin_ar_cbse_13_014** (कक्षा 11 का समान नोड) पर लौटें.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित लेखन का अर्थ है पाठ की बातें अपने शब्दों में दोहराना (paraphrasing)।"* **वास्तविकता:** बोर्ड/प्रतियोगी.' }
          ],
            remediations: { 'paraphrasing-1-2': { steps: ['**चरणबद्ध उपचार (यदि छात्र उपरोक्त भ्रांति में फँसा है):** 1.', '**पुनः पाठ पढ़ें — पर इस बार "पेंसिल से"**: हर उस वाक्य/शब्द को **अंडरलाइन/हाइलाइट** करें जो — (क) चरित्र-परिवर्तन.', '**एक प्रश्न चुनें** (जैसे: "शीर्षक की सार्थकता") और **केवल 3 साक्ष्य** ढूंढें — पूरा उत्तर न लिखें, केवल **साक्ष्य.', '**PEEL का केवल Point और Evidence लिखें** — Explanation और Link बाद में। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक सहयोगी शिक्षण प्रक्रिया है जिसमें विद्यार्थी पाठ का.',
          hint: 'यदि अटका महसूस हो तो c12_hin_ar_cbse_13_006 (मुख्य विषय) और c12_hin_ar_cbse_13_008.',
          misconception: 'विद्यार्थी समझते हैं कि "वाचन-श्रवण: चर्चा-बिंदु" का अर्थ है **शिक्षक द्वारा पूछे गए प्रश्नों के उत्तर रटना** या **पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक सहयोगी शिक्षण प्रक्रिया है जिसमें विद्यार्थी पाठ का सस्वर वाचन',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक सहयोगी शिक्षण प्रक्रिया है जिसमें विद्यार्थी पाठ का सस्वर वाचन', '\'पहलवान की ढोलक\' फणीश्वरनाथ रेणु द्वारा लिखित एक मार्मिक कहानी है जो ग्रामीण बिहार के', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कारण-परिणाम वाला क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण किसी रचना में कथानक के घटित होने का समग्र संदर्भ है जिसमें'],
                  hint: 'यदि अटका महसूस हो तो c12_hin_ar_cbse_13_006 (मुख्य विषय) और c12_hin_ar_cbse_13_008 (बिंब-रूपक) पर.',
                  misconception: 'विद्यार्थी समझते हैं कि "वाचन-श्रवण: चर्चा-बिंदु" का अर्थ है **शिक्षक द्वारा पूछे गए प्रश्नों के उत्तर रटना** या **पाठ का अनुवाद करना**।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['विद्यार्थी को पाठ के **तीन भाव-शिखर** (पहलवान का परिचय, ढोलक संग अकेलापन, अंतिम विदाई) चिह्नित कराकर प्रत्येक का.', 'कक्षा में **\'विचार-विनिमय वृत्त\' (थिंक-पेयर-शेयर)** चलाएँ: पहले अकेले सोचें, फिर जोड़ी में बाँटें, फिर पूरे समूह में.', 'पुनः निदान: पैरा 6 का वाचन कराकर पूछें "यहाँ पहलवान की आवाज़ में क्या सुनाई देता है — गर्व, पीड़ा, या दोनों?" — यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
