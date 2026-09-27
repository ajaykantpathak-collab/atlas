import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch10_p3: SimDef = {
    id: 'v3_c12_hin_a_ch10_p3',
    title: 'प्रेमघन की छाया-स्मृति · Part 3/3',
    subtitle: 'The dictionary was also a freedom struggle',
    classLevel: 12, subject: 'hin_a', topic: 'प्रेमघन की छाया-स्मृति · Part 3/3',
    chapters: ['c12_hin_a_ch10'],
    nodeIds: ['c12_hin_a_cbse_10_013', 'c12_hin_a_cbse_10_014', 'c12_hin_a_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary-historical reader', intro: 'A Chhayavad pillar writes a story where making a dictionary is an act of nation-making.', goal: 'Read Prasad\'s story through his linguistic mission — Hindi\'s professionalisation as cultural nationalism.' },
    discovery: {
        question: 'During Non-Cooperation, a lexicographer building a Hindi dictionary could seem a distraction from the freedom fight. Why did Prasad treat it as the fight?',
        options: ['Language is sovereignty — making Hindi fit for educated life was cultural nationalism running parallel to the political boycott', 'He was apolitical', 'Dictionaries were fashionable', 'Politics bored him'],
        answer: 'Language is sovereignty — making Hindi fit for educated life was cultural nationalism running parallel to the political boycott',
        hook: 'Prasad\'s story grows from lived ground — his father\'s salon hosted Bharatendu-era greats, but the new circle is journalists, editors and lexicographers earning livelihoods in Hindi: literature shifting from patronage to profession. Chhayavad\'s \'new form\' was engineered through the dictionary as much as through verse.',
    },
    teaching: [
        { title: 'प्रेमघन की छाया-स्मृति — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन पाठ का गहरा विश्लेषण करना है जिसमें विषय, पात्र-चित्रण, साहित्यिक युक्तियाँ, और लेखक के उद्देश्य की जाँच शामिल है, ताकि सतही अर्थ से आगे जाकर गहरे निहितार्थ समझे जा सकें।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the Prayagraj circle of the 1920s: weigh dictionary-making as nationalism, watch literary culture move from royal patrons to professional writers, and trace a life into a story.',
        labels: ['प्रेमघन की छाया-स्मृति —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c12_hin_a_cbse_10_014', title: 'Identify each idea',
          dissect: { specimen: 'प्रेमघन की छाया-स्मृति · Part 3/3', spots: [
            { id: 's1', label: '- -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें पाठ पढ़ने, उसके विश्लेषण करने, मुख्य बिंदुओं.', answer: '- -', options: ['- -', '- - -'] },
            { id: 's2', label: '- - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु वह कौशल है जिसमें पाठ को भावनात्मक स्वर, विराम, जोर और लय के साथ.', answer: '- - -', options: ['- - -', '- -'] }
          ] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college-application mentor tells you to write your \'how I became a writer\' essay as a clean chronology: class 8, class 9, class 10. Your actual formation is messier — a grandfather\'s bookshelf, one teacher, a literary evening that changed everything.',
            decisions: [{ prompt: 'What would the narrative architecture of Kaka Kalelkar\'s memoir chapter say?', options: [
                { text: 'Order it by meaning, not calendar — the chapter moves associatively, putting the defining meeting before the childhood roots so the reader grasps the destination\'s significance before the narrator did; thematic juxtaposition, not chronology, carries \'the making of a writer.\'', outcome: 'The memoir\'s non-linearity mimics how formation actually works — memory is thematic; the gap between life\'s order and the text\'s order is where the portrait lives.' },
                { text: 'Follow the mentor — admissions readers need a clear timeline, and fragments read as carelessness.', outcome: 'The chapter treats fragmentation as design, not disorder — the juxtapositions (classical father vs living literary circle) show formation as contrast and encounter, which a calendar march can\'t perform.', reveals: 'chronology-equals-clarity' },
                { text: 'Drop the formative anecdotes entirely and just state \'I became a writer through reading.\'', outcome: 'The memoir\'s anecdotes aren\'t decoration — the father\'s library and the unknowing visit to Dwivedi\'s house are the evidence the claim needs; assertion without them is a résumé line, not a formation story.', reveals: 'summary-beats-scene' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a lexicographer\'s tale as freedom work — and see how a language was built word by deliberate word.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन पाठ का गहरा विश्लेषण करना है जिसमें विषय, पात्र-चित्रण.',
          hint: 'यदि फंसे हुए महसूस हों, तो c12_hin_a_cbse_10_006 पर मुख्य विषय और संदेश की पहचान करने की.',
          misconception: 'छात्र अक्सर मानते हैं कि आलोचनात्मक चिंतन का अर्थ है पाठ में जो कुछ भी नकारात्मक या आलोचनीय लगता है उस पर टिप्पणी करना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन पाठ का गहरा विश्लेषण करना है जिसमें विषय, पात्र-चित्रण, साहित्यिक',
                  options: ['आलोचनात्मक चिंतन पाठ का गहरा विश्लेषण करना है जिसमें विषय, पात्र-चित्रण, साहित्यिक', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक'],
                  hint: 'यदि फंसे हुए महसूस हों, तो c12_hin_a_cbse_10_006 पर मुख्य विषय और संदेश की पहचान करने की अवधारणा को.',
                  misconception: 'छात्र अक्सर मानते हैं कि आलोचनात्मक चिंतन का अर्थ है पाठ में जो कुछ भी नकारात्मक या आलोचनीय लगता है उस पर टिप्पणी करना, जैसे पात्र की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को बताइए कि आलोचनात्मक चिंतन में "आलोचनात्मक" का अर्थ है विस्तृत जाँच, न कि निंदा। फिर एक परिचित उदाहरण दीजिए: जब.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें पाठ पढ़ने, उसके विश्लेषण करने.',
          hint: 'यदि छात्र फंस जाए तो पहले c12_hin_a_cbse_10_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या).',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में लंबे-चौड़े वाक्य और कठिन शब्दों का उपयोग करने से अंक बढ़ेंगे, जबकि वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें पाठ पढ़ने, उसके विश्लेषण करने, मुख्य बिंदुओं',
                  options: ['पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें पाठ पढ़ने, उसके विश्लेषण करने, मुख्य बिंदुओं', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक'],
                  hint: 'यदि छात्र फंस जाए तो पहले c12_hin_a_cbse_10_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या) पर फिर से.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में लंबे-चौड़े वाक्य और कठिन शब्दों का उपयोग करने से अंक बढ़ेंगे, जबकि वास्तव में बोर्ड परीक्षक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले एक सरल प्रश्न दें जैसे "नायक का मन क्या कर रहा है?" और उसे केवल पाठ से शब्द चुनकर उत्तर बनाने के लिए.', 'फिर उन शब्दों को एक वाक्य में बाँधें और पूछें कि यह क्या दर्शाता है। इससे उन्हें समझ आएगा कि सटीक भाषा और पाठ-आधारितता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_10_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु वह कौशल है जिसमें पाठ को भावनात्मक स्वर, विराम, जोर और.',
          hint: 'यदि फँसें तो कक्षा 11 के वाचन-श्रवण नोड (c11_hin_a_cbse_10_015) में दिए गए मूल अभ्यासों.',
          misconception: 'छात्र अक्सर मानते हैं कि वाचन-श्रवण में \'सही\' पढ़ना केवल उच्चारण की शुद्धता है — जैसे शब्दों को साफ-साफ बोलना — और वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु वह कौशल है जिसमें पाठ को भावनात्मक स्वर, विराम, जोर और लय के साथ',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु वह कौशल है जिसमें पाठ को भावनात्मक स्वर, विराम, जोर और लय के साथ', 'प्रेमघन की छाया-स्मृति में पृष्ठभूमि और रचनाकार परिचय का अर्थ है प्रेमचंद के व्यक्तिगत', '**कथानक (Plot):** कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम जो कारण-कार्य', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, ऐतिहासिक और आर्थिक पृष्ठभूमि है जिसमें कोई साहित्यिक'],
                  hint: 'यदि फँसें तो कक्षा 11 के वाचन-श्रवण नोड (c11_hin_a_cbse_10_015) में दिए गए मूल अभ्यासों को दोहराएँ.',
                  misconception: 'छात्र अक्सर मानते हैं कि वाचन-श्रवण में \'सही\' पढ़ना केवल उच्चारण की शुद्धता है — जैसे शब्दों को साफ-साफ बोलना — और वे भाव, विराम या जोर को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र कोまず एक छोटा अंश (जैसे श्यामा के जाने का वर्णन) चुनिए और उसे तीन बार पढ़वाइए: पहली बार सामान्य गति से, दूसरी बार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
