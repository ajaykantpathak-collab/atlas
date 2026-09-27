import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch05_p3: SimDef = {
    id: 'v3_c12_hin_a_ch05_p3',
    title: 'रघुवीर सहाय · Part 3/3',
    subtitle: 'When the wheel stops, a whole culture stops',
    classLevel: 12, subject: 'hin_a', topic: 'रघुवीर सहाय · Part 3/3',
    chapters: ['c12_hin_a_ch05'],
    nodeIds: ['c12_hin_a_cbse_05_013', 'c12_hin_a_cbse_05_014', 'c12_hin_a_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social-realist poetry reader', intro: 'A journalist-poet sets down his notebook and picks up the potter\'s vocabulary instead.', goal: 'Read the potter poems through Jagdish Lalak\'s journalistic eye — dialect as realism, craft as vanishing culture.' },
    discovery: {
        question: 'A journalist-poet writes about a Haryana potter in the potter\'s own dialect — \'fiQjdh\', \'uanu\' and all. Why not translate him into polished Hindi?',
        options: ['Dialect is realism and empathy — the village must sound like itself; polishing it would break the very world the poem honours', 'Dialect is just flavour', 'He lacked vocabulary', 'To test the reader'],
        answer: 'Dialect is realism and empathy — the village must sound like itself; polishing it would break the very world the poem honours',
        hook: 'The potter and his wheel are one system — body, skill and cyclical tradition; when the wheel stops, a culture stops. Journalism taught Lalak the colloquial register that reaches beyond Haryana — local speech, universal hearing.',
    },
    teaching: [
        { title: 'रघुवीर सहाय — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण वह लेखन-कौशल है जिसमें छात्र किसी पद्यांश या पंक्तियों का शाब्दिक अर्थ बताने के साथ-साथ कवि के निहितार्थ, भावनात्मक स्वर और प्रसंग को अपने शब्दों में स्पष्ट करता है। रघुवीर सहाय की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Listen at the potter\'s wheel: weigh dialect as documentary fidelity, read man and wheel as a single craft, and feel what\'s lost when such poems stop being written.',
        labels: ['रघुवीर सहाय — आशय-स्पष्टीकरण', 'रघुवीर सहाय — परीक्षा-उत्तर', 'रघुवीर सहाय — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a documentary assignment on the old woman who has carried loads at the mandi for fifty years, your partner wants to end on a sponsor\'s donation — \'give it a clean resolution so it doesn\'t feel unfinished.\'',
            decisions: [{ prompt: 'What does the ending of Nagarjun\'s poem about the old woman suggest?', options: [
                { text: 'End with the question, not the fix — the poem closes by turning from her story to a direct question at the reader, making society\'s neglect the unresolved fact; a sponsor\'s cheque would manufacture closure the reality hasn\'t earned.', outcome: 'The chapter calls this the modernist open resolution: the story hands responsibility to the audience instead of discharging it — your film should do the same.' },
                { text: 'Use the donation ending — leaving a documentary unresolved is weak storytelling.', outcome: 'That reads closure as craft; the poem shows the unanswered ending is the stronger structure because the neglect is real and continuing — a neat fix would lie.', reveals: 'endings-must-resolve' },
                { text: 'End on her statistics — years worked, loads carried — so the film closes with evidence, not sentiment.', outcome: 'Numbers summarise her but don\'t turn the gaze; the poem\'s final move is a question that conscripts the viewer — data can\'t perform that transfer of responsibility.', reveals: 'data-is-the-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You can now hear dialect as the poem\'s conscience — a vanishing world recorded in its own accent.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण वह लेखन-कौशल है जिसमें छात्र किसी पद्यांश या पंक्तियों का.',
          hint: 'यदि आशय-स्पष्टीकरण कठिन लगे तो पहले बोध-प्रश्नों के उत्तर-पैटर्न दोहराएँ।',
          misconception: 'छात्र मान लेते हैं कि आशय-स्पष्टीकरण का अर्थ है पंक्तियों का अनुवाद करना। सटीक गलत कदम: वे प्रतीकों और बोलचाल-भाषा के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण वह लेखन-कौशल है जिसमें छात्र किसी पद्यांश या पंक्तियों का शाब्दिक अर्थ',
                  options: ['आशय-स्पष्टीकरण वह लेखन-कौशल है जिसमें छात्र किसी पद्यांश या पंक्तियों का शाब्दिक अर्थ', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे'],
                  hint: 'यदि आशय-स्पष्टीकरण कठिन लगे तो पहले बोध-प्रश्नों के उत्तर-पैटर्न दोहराएँ।',
                  misconception: 'छात्र मान लेते हैं कि आशय-स्पष्टीकरण का अर्थ है पंक्तियों का अनुवाद करना। सटीक गलत कदम: वे प्रतीकों और बोलचाल-भाषा के निहितार्थ को न छूते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को तीन-चरण का सूत्र याद कराएँ: अर्थ → भाषा/प्रतीक → केंद्रीय भाव से संबंध। 2.', 'एक पंक्ति दें और पूछें \'कवि यह क्यों कह रहा है?\' — \'क्या कह रहा है\' नहीं। 3.', 'प्रतीक पहचानने का अभ्यास: पाँच वाक्य दें, प्रत्येक में शाब्दिक बनाम आशयात्मक अर्थ अलग करवाएँ। 4.', 'सही और गलत उत्तरों की जोड़ी दिखाकर अंतर स्पष्ट करें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है प्रश्न की मांग को पहचानकर, पाठ से संबंधित.',
          hint: 'यदि छात्र परीक्षा-उत्तर लेखन में फंस रहा है, तो उसे c12_hin_a_cbse_05_002 (पद्यांश-वार.',
          misconception: 'छात्र अक्सर मानते हैं कि परीक्षा-उत्तर में लंबा लिखना और जटिल शब्दों का उपयोग करना ही अच्छा उत्तर है, इसलिए वे पाठ से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है प्रश्न की मांग को पहचानकर, पाठ से संबंधित साक्ष्य',
                  options: ['परीक्षा-उत्तर लेखन कौशल का अर्थ है प्रश्न की मांग को पहचानकर, पाठ से संबंधित साक्ष्य', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे'],
                  hint: 'यदि छात्र परीक्षा-उत्तर लेखन में फंस रहा है, तो उसे c12_hin_a_cbse_05_002 (पद्यांश-वार भावार्थ) और.',
                  misconception: 'छात्र अक्सर मानते हैं कि परीक्षा-उत्तर में लंबा लिखना और जटिल शब्दों का उपयोग करना ही अच्छा उत्तर है, इसलिए वे पाठ से साक्ष्य देने के बजाय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस भ्रांति को दूर करने के लिए, छात्र को एक कमजोर उत्तर (जैसे केवल जटिल शब्दों वाला पैराग्राफ) दिखाइए और पूछिए: "इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_015', difficulty: 'standard',
          question: 'वाचन-पाठ और चर्चा-बिंदु वह प्रक्रिया है जिसमें कविता या गद्यांश को بصوت高声 से.',
          hint: 'यदि छात्र वाचन के दौरान लय या ध्वनि पर ध्यान नहीं दे पा रहा है, तो उसे.',
          misconception: 'छात्र अक्सर मानते हैं कि वाचन-पाठ केवल शब्दों के सही उच्चारण और गति पर निर्भर करता है, और चर्चा-बिंदु बनाने के लिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ और चर्चा-बिंदु वह प्रक्रिया है जिसमें कविता या गद्यांश को بصوت高声 से पढ़कर उसके',
                  options: ['वाचन-पाठ और चर्चा-बिंदु वह प्रक्रिया है जिसमें कविता या गद्यांश को بصوت高声 से पढ़कर उसके', 'रघुवीर सहाय (1929–1990) हिंदी के प्रमुख आधुनिक कवि, पत्रकार और संपादक हैं जिनकी रचनाएँ', 'पद्यांश-वार भावार्थ वह प्रक्रिया है जिसमें कविता के प्रत्येक अनुभाग (पद्यांश) को अलग-अलग', 'काव्य-संरचना और पद्य-विन्यास कविता के आंतरिक ढाँचे'],
                  hint: 'यदि छात्र वाचन के दौरान लय या ध्वनि पर ध्यान नहीं दे पा रहा है, तो उसे c12_hin_a_cbse_05_005 (छंद.',
                  misconception: 'छात्र अक्सर मानते हैं कि वाचन-पाठ केवल शब्दों के सही उच्चारण और गति पर निर्भर करता है, और चर्चा-बिंदु बनाने के लिए शब्दार्थ की टिप्पणी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले किसी सरल दो-पंक्तियों वाली कविता (जैसे कबीर का दोहा)声高声 से पढ़ने के लिए कहें, फिर पूछें: "इसकी ध्वनि.', 'कौन सा शब्द बार-बार आया और क्यों?" उसके बाद, उनसे दोहराव या विराम के प्रभाव पर चर्चा करवाएँ। इस अभ्यास को दोहराने से वे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
