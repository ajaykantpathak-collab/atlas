import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch09_p3: SimDef = {
    id: 'v3_c10_hin_ks_ch09_p3',
    title: 'पाठ 9 · Part 3/3',
    subtitle: 'इस नोड में पद्यांश के आशय का स्पष्टीकरण करने की विधि सिखाई जाती है, जिसमें भाव, संदेश.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 9 · Part 3/3',
    chapters: ['c10_hin_ks_ch09'],
    nodeIds: ['c10_hin_ks_cbse_09_013', 'c10_hin_ks_cbse_09_014', 'c10_hin_ks_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए कि आपकी कक्षा में कोई नया छात्र आया है और वह आपसे पूछता है कि आज की कविता का क्या मतलब है — आप.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कविता के शब्दों, वाक्यों और छंदों के माध्यम से कवि के गहरे भाव, संदेश और केंद्रीय विचार को स्पष्ट रूप से समझाया जाता है, जिसमें शब्दार्थ के साथ भावार्थ का.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — आशय-स्पष्टीकरण', 'पाठ 9 — परीक्षा-उत्तर', 'पाठ 9 — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_09_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 3/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कविता के शब्दों, वाक्यों और छंदों के माध्यम से कवि.', answer: '9 -', options: ['9 -', '9 - -'] },
            { id: 's2', label: '9 - -', prompt: 'Which idea is this? — वाचन-पाठ का अर्थ है कविता को सही लय, उच्चारण और भाव के साथ声声 में पढ़ना, जबकि चर्चा-बिंदु.', answer: '9 - -', options: ['9 - -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 9 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कविता के शब्दों, वाक्यों और छंदों के.',
          hint: 'अलंकार की पहचान में कठिनाई हो तो c10_hin_ks_cbse_09_006 (साहित्यिक युक्तियाँ: अलंकार) की.',
          misconception: 'छात्र अक्सर मानते हैं कि आशय-स्पष्टीकरण में केवल कठिन शब्दों के अर्थ लिख देने से काम चल जाएगा, जैसे "विस्मयादिबोधक" का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कविता के शब्दों, वाक्यों और छंदों के माध्यम से कवि',
                  options: ['आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कविता के शब्दों, वाक्यों और छंदों के माध्यम से कवि', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व'],
                  hint: 'अलंकार की पहचान में कठिनाई हो तो c10_hin_ks_cbse_09_006 (साहित्यिक युक्तियाँ: अलंकार) की दोबारा.',
                  misconception: 'छात्र अक्सर मानते हैं कि आशय-स्पष्टीकरण में केवल कठिन शब्दों के अर्थ लिख देने से काम चल जाएगा, जैसे "विस्मयादिबोधक" का अर्थ "वाह!" लिख.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को बताइए कि आशय-स्पष्टीकरण एक जाँच की तरह है: (1) पहले पढ़िए कि क्या लिखा है (शब्दार्थ), (2) फिर पूछिए कि कवि.', '(भावार्थ — जैसे "पत्थर जैसे हृदय" से क्या भाव आता है?', '— निर्लaj, कठोरता), (3) फिर देखिए कि किस भाषा-युक्ति ने इस भाव को बनाया?', '(रूपक: हृदय को पत्थर से तुलना), (4) अंत में बताइए कि यह भाव कविता के मुख्य संदेश से कैसे जुड़ता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल वह विधि है जिसमें प्रश्न के अनुसार बिंदु, प्रमाण.',
          hint: 'यदि छात्र उत्तर लेखन में फंस रहा है, तो पहले c10_hin_ks_cbse_09_002 (पद्यांश-वार भावार्थ).',
          misconception: 'छात्र अक्सर मानते हैं कि बोध-प्रश्नों के उत्तर में सिर्फ पाठ से सीधी प्रतिलिपि (उद्धरण) देना पर्याप्त है, बिना किसी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल वह विधि है जिसमें प्रश्न के अनुसार बिंदु, प्रमाण, स्पष्टीकरण और',
                  options: ['परीक्षा-उत्तर लेखन कौशल वह विधि है जिसमें प्रश्न के अनुसार बिंदु, प्रमाण, स्पष्टीकरण और', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व'],
                  hint: 'यदि छात्र उत्तर लेखन में फंस रहा है, तो पहले c10_hin_ks_cbse_09_002 (पद्यांश-वार भावार्थ) और.',
                  misconception: 'छात्र अक्सर मानते हैं कि बोध-प्रश्नों के उत्तर में सिर्फ पाठ से सीधी प्रतिलिपि (उद्धरण) देना पर्याप्त है, बिना किसी स्पष्टीकरण या संबंध के।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही पंक्तियों के साथ दो उत्तर कैसे अलग-अलग अंक ला सकते हैं: उत्तर 1: "पाठ में कहा है \'वह रो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_09_015', difficulty: 'standard',
          question: 'वाचन-पाठ का अर्थ है कविता को सही लय, उच्चारण और भाव के साथ声声 में पढ़ना, जबकि.',
          hint: 'कविता के भाव और अलंकार (विशेषकर रूपक और उपमा) की अवधारणा की समीक्षा करें — नोड्स.',
          misconception: 'छात्र अक्सर मानते हैं कि कविता का वाचन सिर्फ शब्दों को सही उच्चारण के साथ पढ़ना है और चर्चा का अर्थ केवल कवि के बारे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ का अर्थ है कविता को सही लय, उच्चारण और भाव के साथ声声 में पढ़ना, जबकि चर्चा-बिंदु',
                  options: ['वाचन-पाठ का अर्थ है कविता को सही लय, उच्चारण और भाव के साथ声声 में पढ़ना, जबकि चर्चा-बिंदु', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन, काल, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद्यांश) का अलग-अलग भाव अर्थ', 'काव्य‑संरचना का अर्थ है कविता के रूप के तत्व'],
                  hint: 'कविता के भाव और अलंकार (विशेषकर रूपक और उपमा) की अवधारणा की समीक्षा करें — नोड्स.',
                  misconception: 'छात्र अक्सर मानते हैं कि कविता का वाचन सिर्फ शब्दों को सही उच्चारण के साथ पढ़ना है और चर्चा का अर्थ केवल कवि के बारे में तथ्य बताना है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "आज हम एकदम से नहीं, बल्कि भाव के साथ पढ़ेंगे — इस पंक्ति में क्या दुख है?', 'अब उसी भाव के साथ पढ़ो, जैसे आप किसी रो रहे मित्र को सांत्वना दे रहे हो।" फिर एक शब्द पर जोर देने के लिए इशारा करें.', 'क्या भाव बढ़ा?" — इस तरह भाव को पहले महसूस करवाया जाए, फिर वाचन तकनीक से जोड़ा जाए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
