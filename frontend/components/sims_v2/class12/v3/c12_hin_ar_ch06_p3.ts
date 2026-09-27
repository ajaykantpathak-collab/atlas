import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch06_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch06_p3',
    title: 'बादल राग · Part 3/3',
    subtitle: 'Why Nirala chose the moment even Rama knelt',
    classLevel: 12, subject: 'hin_ar', topic: 'बादल राग · Part 3/3',
    chapters: ['c12_hin_ar_ch06'],
    nodeIds: ['c12_hin_ar_cbse_06_013', 'c12_hin_ar_cbse_06_014', 'c12_hin_ar_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Epic-poetry analyst', intro: 'A Chhayavad master builds an epic around the one scene where the perfect man admits he isn\'t enough.', goal: 'Read Ram Ki Shakti Puja as Chhayavad epic — personal struggle and national allegory inside a mythic frame.' },
    discovery: {
        question: 'Of every Ramayana moment — birth, exile, coronation — Nirala chose the instant Rama kneels to the Goddess before the final battle. Why that one?',
        options: ['It dramatises human vulnerability against impossible odds — the ideal man needing divine strength mirrors a poet\'s own wars with poverty and loss, and a nation\'s fight to be free', 'It\'s the most exciting scene', 'The battle needed a prayer', 'Random selection'],
        answer: 'It dramatises human vulnerability against impossible odds — the ideal man needing divine strength mirrors a poet\'s own wars with poverty and loss, and a nation\'s fight to be free',
        hook: 'Not a retelling — a re-visioning: an eleven-canto blank-verse epic that claims classical lineage for modern Hindi while encoding a freedom struggle and private grief inside Rama\'s helplessness. Chhayavad\'s interiority scaled to epic architecture.',
    },
    teaching: [
        { title: 'बादल राग — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण काव्य-पंक्तियों के **गूढ़ अर्थ, प्रसंग, भाव-भूमि, अलंकारिक सौंदर्य, और कवि के अभिप्राय** को तर्कसंगत ढंग से स्पष्ट करने की प्रक्रिया है जिसमें पंक्तियों के शाब्दिक अर्थ से आगे बढ़कर.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_06_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand beside Rama before Lanka: weigh why Shakti Puja was the chosen moment, compare epic structure with lyric intensity, and hunt the allegory running beneath the myth.',
        labels: ['बादल राग — आशय-स्पष्टीकरण', 'बादल राग — परीक्षा-उत्तर', 'बादल राग — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior is spiralling after a brutal internship rejection: \'This is who I am now — the guy who fails.\' You remember the Firaq poem where a tree loses its leaves to the season yet the final stanza returns to the same rooted presence.',
            decisions: [{ prompt: 'How do you use the poem\'s structure with him?', options: [
                { text: 'Point out the poem moves through noon shadow, wind, bare winter — then circles back to the rooted tree; a hard season is weather passing through, not the trunk. His rejection is a stanza, not the whole structure.', outcome: 'The poem\'s circular return exists to make exactly this claim: the ending echoes the opening image, but now carrying the endurance the middle proved — the tree that was always rooted.' },
                { text: 'Tell him the seasons prove everything changes, so this failure will soon be replaced by success — wait it out.', outcome: 'That reads only the seasonal half and skips the rootedness the poem insists on; passive waiting isn\'t the tree\'s endurance — the structure pairs change outside with continuity within.', reveals: 'time-heals-passively' },
                { text: 'Tell him to treat the rejection as the final stanza — some stories end bare, and that\'s honest.', outcome: 'That amputates the poem\'s actual resolution: the final stanza deliberately returns to rooted presence, so calling the bare season the ending misreads where the structure chooses to stop.', reveals: 'hard-season-is-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'You can now read an epic as both myth and mirror — where a god\'s prayer for strength speaks for a poet, and a people, beseeching power.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण काव्य-पंक्तियों के **गूढ़ अर्थ, प्रसंग, भाव-भूमि, अलंकारिक.',
          hint: 'यदि प्रसंग या केंद्रीय भाव स्पष्ट न हो तो **c12_hin_ar_cbse_06_002 (पद्यांश-वार.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि **आशय-स्पष्टीकरण = भावार्थ + अलंकारों की सूची**। वे पंक्तियों का भावार्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण काव्य-पंक्तियों के **गूढ़ अर्थ, प्रसंग, भाव-भूमि, अलंकारिक सौंदर्य, और कवि',
                  options: ['आशय-स्पष्टीकरण काव्य-पंक्तियों के **गूढ़ अर्थ, प्रसंग, भाव-भूमि, अलंकारिक सौंदर्य, और कवि', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,'],
                  hint: 'यदि प्रसंग या केंद्रीय भाव स्पष्ट न हो तो **c12_hin_ar_cbse_06_002 (पद्यांश-वार भावार्थ)** और.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि **आशय-स्पष्टीकरण = भावार्थ + अलंकारों की सूची**। वे पंक्तियों का भावार्थ लिखते हैं, फिर अलंकारों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** विद्यार्थी से कहें — "एक पद्यांश लो (जैसे \'तुम्हें नहीं भाता महलों का साज...\') और **केवल अलंकारों के नाम मत.', '**एक वाक्य में लिखो।**" **चरण 3:** अब **पूरा आशय-स्पष्टीकरण** चार पैराग्राफ में लिखवाएँ: प्रसंग → शाब्दिक+भावार्थ →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है: **पाठ्य-वस्तु (कविता/गद्य के भाव, प्रतीक.',
          hint: 'यदि **बिंब पहचानने में अटकें**, तो तुरंत **नोड c12_hin_ar_cbse_06_007 (साहित्यिक.',
          misconception: '**सबसे घातक भ्रम:** *"उत्तर जितना लंबा होगा, अंक उतने अधिक मिलेंगे।"* **वास्तविकता:** CBSE मार्किंग स्कीम.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है: **पाठ्य-वस्तु (कविता/गद्य के भाव, प्रतीक, अलंकार, छंद',
                  options: ['परीक्षा-उत्तर लेखन कौशल का अर्थ है: **पाठ्य-वस्तु (कविता/गद्य के भाव, प्रतीक, अलंकार, छंद', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,'],
                  hint: 'यदि **बिंब पहचानने में अटकें**, तो तुरंत **नोड c12_hin_ar_cbse_06_007 (साहित्यिक युक्तियाँ: प्रतीक.',
                  misconception: '**सबसे घातक भ्रम:** *"उत्तर जितना लंबा होगा, अंक उतने अधिक मिलेंगे।"* **वास्तविकता:** CBSE मार्किंग स्कीम **\'संक्षिप्तता + सटीकता\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (3-दिन का मिनी-प्लान):** **दिन 1:** छात्र से **पिछले वर्ष के 3 प्रश्न-पत्र** लेकर, प्रत्येक 6-अंकों.', '(ख) पाठ्य-साक्ष्य कहाँ है?', '(घ) केंद्रीय भाव से जुड़ाव कहाँ है?', '— जो न हो, उसे **\'लापता (missing)\'** लिखें। **दिन 2:** **\'केवल रूपरेखा (outline only)\' अभ्यास:** 5 नए प्रश्न दें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_06_015', difficulty: 'standard',
          question: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है कविता को सही उच्चारण, लय, गति और भाव के साथ.',
          hint: 'यदि अटका हुआ महसूस हो तो c12_hin_ar_cbse_06_002 (भावार्थ) और c12_hin_ar_cbse_06_007.',
          misconception: 'छात्र समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल \'जोर से पढ़ देना\' है और \'चर्चा\' का अर्थ \'कविता का सार बताना\'। वे भूल जाते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है कविता को सही उच्चारण, लय, गति और भाव के साथ जोर से',
                  options: ['वाचन-पाठ और चर्चा-बिंदु का अर्थ है कविता को सही उच्चारण, लय, गति और भाव के साथ जोर से', 'सूर्यकांत त्रिपाठी \'निराला\' (1897–1961) हिंदी साहित्य के छायावाद युग के चार स्तंभों में', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का **संदर्भ सहित', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के **पदों (stanzas) का क्रम, उनकी लंबाई,'],
                  hint: 'यदि अटका हुआ महसूस हो तो c12_hin_ar_cbse_06_002 (भावार्थ) और c12_hin_ar_cbse_06_007 (प्रतीक-बिंब).',
                  misconception: 'छात्र समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल \'जोर से पढ़ देना\' है और \'चर्चा\' का अर्थ \'कविता का सार बताना\'। वे भूल जाते हैं कि वाचन एक कला है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: कविता के पहले दो पद किसी रिकॉर्डिंग (शिक्षक/ऑडियो) से सुनें और साथ-साथ बोलें — केवल लय पकड़ने के लिए। चरण २: वही.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
