import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch01_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch01_p3',
    title: 'आत्मपरचिय, एक गीत · Part 3/3',
    subtitle: '\'I am pulp\' — the intellectual who saw the machine from inside',
    classLevel: 12, subject: 'hin_ar', topic: 'आत्मपरचिय, एक गीत · Part 3/3',
    chapters: ['c12_hin_ar_ch01'],
    nodeIds: ['c12_hin_ar_cbse_01_013', 'c12_hin_ar_cbse_01_014', 'c12_hin_ar_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi modern-poetry reader', intro: 'A Progressive poet who served both university and ministry writes about being ground to pulp. Context is the key.', goal: 'Situate Muktibodh\'s Vartmaan in the Progressive movement and post-1947 disillusionment.' },
    discovery: {
        question: 'Freedom came in 1947 — yet by the 1950s a professor-poet wrote \'मैं लुगदी हूँ\' — I am pulp. What turned independence into existential dread?',
        options: ['The Progressive Writers\' disillusion — Nehruvian promises met unchanged feudal-capitalist reality, and the intellectual found himself commodified inside the system', 'The poet was personally ill', 'Romanticism just ended', 'Poetry was unfashionable'],
        answer: 'The Progressive Writers\' disillusion — Nehruvian promises met unchanged feudal-capitalist reality, and the intellectual found himself commodified inside the system',
        hook: 'Muktibodh wasn\'t a छायावादी dreamer — he was Progressive: class, institutions, the writer\'s complicity. As academic and state functionary both, his \'I\' is lived conflict — self-pity becomes a calculated indictment of the intellectual inside the machine.',
    },
    teaching: [
        { title: 'आत्मपरचिय, एक गीत — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'विराम चिह्न\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read \'वर्तमान\' inside its decade: map the छायावाद-to-प्रगतिवाद shift, weigh the intellectual\'s self-deception against his conscience, and hear what \'pulp\' means from a man who served the state.',
        labels: ['आत्मपरचिय, एक गीत —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your poem is accepted by the college magazine, but the editor returns it blood-red with corrections, insisting every comma and full stop sit exactly where the rulebook demands. Your gut says the rules are flattening the voice.',
            decisions: [{ prompt: 'What would Nirala\'s \'विराम चिह्न\' tell both sides?', options: [
                { text: 'Let the punctuation marks argue their case — but don\'t let them own the poem; Nirala personifies them, hears them out, then refuses to be their slave, and finally hands the judgment to the reader.', outcome: 'The poem\'s structure is the lesson: rules speak (rising action), the poet resists (climax), and the verdict is democratically opened (\'you decide\') — craft serves voice, not the reverse.' },
                { text: 'Delete every mark — if rules are tyranny, true freedom is a poem with no punctuation at all.', outcome: 'Nirala refuses slavery, not punctuation — the marks stay in the poem as characters with a hearing; abolishing them confuses liberation with vandalism.', reveals: 'freedom-means-no-rules' },
                { text: 'Accept every correction — punctuation exists to discipline expression, and the editor\'s word is final.', outcome: 'That\'s precisely the gulami the poet rejects at the climax; the poem stages the marks\' claims so the poet — and finally the reader — can overrule them.', reveals: 'rules-outrank-voice' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You can now place a poem in its movement — and hear post-independence disillusion speaking as first-person dread.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_013', difficulty: 'standard',
          question: '\'विराम चिह्न\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि अटके तो नोड 007 (प्रतीक और बिंब) के \'प्रतीक सारणी\' खंड को दोहराओ — प्रत्येक प्रतीक के.',
          misconception: 'छात्र समझते हैं कि आशय-स्पष्टीकरण का अर्थ है \'कठिन शब्दों के अर्थ लिखना\' या \'पंक्तियों का हिंदी अनुवाद करना\'। वे लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'विराम चिह्न\' का आलोचनात्मक चिंतन',
                  options: ['\'विराम चिह्न\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'विराम चिह्न\' का कथानक', '\'विराम चिह्न\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो नोड 007 (प्रतीक और बिंब) के \'प्रतीक सारणी\' खंड को दोहराओ — प्रत्येक प्रतीक के लिए.',
                  misconception: 'छात्र समझते हैं कि आशय-स्पष्टीकरण का अर्थ है \'कठिन शब्दों के अर्थ लिखना\' या \'पंक्तियों का हिंदी अनुवाद करना\'। वे लिखते हैं: "कवि कहता है वह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: नोड 002 (पद्यांश-वार भावार्थ) और 010 (पदावली) दोबारा पढ़ो — हर पंक्ति का प्रसंगानुकूल अर्थ लिखो। चरण 2: नोड 006.', 'यदि नहीं, तो चरण 2 पर वापस जाओ। यह 45 मिनट का लक्षित अभ्यास (Targeted Drill) तुम्हारी व्याख्या को \'अनुवाद\' से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_014', difficulty: 'standard',
          question: '\'विराम चिह्न\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि अटकें तो c12_hin_ar_cbse_01_013 के \'आशय-स्पष्टीकरण\' अभ्यास दोहराएँ — वहाँ.',
          misconception: 'छात्र समझते हैं कि \'अच्छा उत्तर\' = \'ज्यादा जानकारी/लंबा उत्तर\'। वे कविता का पूरा भावार्थ रटकर लिख देते हैं (जो उन्होंने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'विराम चिह्न\' पर पाठ-आधारित लेखन',
                  options: ['\'विराम चिह्न\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'विराम चिह्न\' का कथानक', '\'विराम चिह्न\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटकें तो c12_hin_ar_cbse_01_013 के \'आशय-स्पष्टीकरण\' अभ्यास दोहराएँ — वहाँ पंक्ति-दर-पंक्ति.',
                  misconception: 'छात्र समझते हैं कि \'अच्छा उत्तर\' = \'ज्यादा जानकारी/लंबा उत्तर\'। वे कविता का पूरा भावार्थ रटकर लिख देते हैं (जो उन्होंने.' }
          ],
            remediations: { 'c12-hin-ar-cbse-01': { steps: ['चरण 1: छात्र से कहें — "अपना पिछला 5-अंक का उत्तर निकालो और उस पर PEEL के चार रंगों से निशान लगाओ: Point (लाल).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_015', difficulty: 'standard',
          question: '\'विराम चिह्न\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.',
          hint: 'यदि अटके तो **c12_hin_ar_cbse_01_002 (पद्यांश-वार भावार्थ)** और **c12_hin_ar_cbse_01_004.',
          misconception: '**भ्रम:** "वाचन-पाठ = तेज़/साफ़ बोलना; चर्चा-बिंदु = प्रश्नोत्तरी के तैयार प्रश्न।" **वास्तविकता:** वाचन **अभिनय नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'विराम चिह्न\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'विराम चिह्न\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'विराम चिह्न\' का कथानक', '\'विराम चिह्न\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c12_hin_ar_cbse_01_002 (पद्यांश-वार भावार्थ)** और **c12_hin_ar_cbse_01_004 (केंद्रीय.',
                  misconception: '**भ्रम:** "वाचन-पाठ = तेज़/साफ़ बोलना; चर्चा-बिंदु = प्रश्नोत्तरी के तैयार प्रश्न।" **वास्तविकता:** वाचन **अभिनय नहीं, भावानुवाद.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**वाचन सुधार:** छात्र को **केवल एक पद** दें; कहें — "इसे तीन भावों में पढ़ो: (क) क्रोध, (ख) विषाद, (ग) विजय — रिकॉर्ड.', '**चर्चा-बिंदु निर्माण:** **\'प्रश्न-सीढ़ी\' (Question Ladder)** तकनीक सिखाएँ: तथ्यात्मक → व्याख्यात्मक → विश्लेषणात्मक →.', '**पुनः-निदान:** अगली कक्षा में वही पद देकर पूछें: "अब तुम कौन-सा नया प्रश्न पूछोगे जो कल नहीं पूछा था?" — यदि प्रश्न.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
