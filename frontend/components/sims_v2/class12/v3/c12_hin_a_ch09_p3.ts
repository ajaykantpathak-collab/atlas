import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch09_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch09_p3: SimDef = {
    id: 'v3_c12_hin_a_ch09_p3',
    title: 'घनानंद · Part 3/3',
    subtitle: 'Cursed by his guru — he spent a life signing the guru\'s name',
    classLevel: 12, subject: 'hin_a', topic: 'घनानंद · Part 3/3',
    chapters: ['c12_hin_a_ch09'],
    nodeIds: ['c12_hin_a_cbse_09_013', 'c12_hin_a_cbse_09_014', 'c12_hin_a_cbse_09_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Braj Bhakti reader', intro: 'Court and guru both cast him out; he answered with a lifetime of poems that begin in longing and end in defiance.', goal: 'Read Ghananand\'s poems as guru-bhakti\'s two registers — virah\'s vigil and the public defence.' },
    discovery: {
        question: 'A court poet is exiled by his king and cursed by his own guru — then spends a lifetime signing the guru\'s name into his verses. What is that signature?',
        options: ['Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection', 'Pride disguised — signing the guru\'s name asserts his verses outrank the curse', 'A pen-name convention — court poets always published under a guru\'s seal', 'A public apology — the signature is the exile\'s lifelong plea for forgiveness'],
        answer: 'Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection',
        hook: 'The two poems are one argument in two moods — private virah counting sleepless nights, then a public challenge daring the world to fault the guru. And the folk words aren\'t weakness: refined Braj deliberately fused with raw speech is craft, not compromise.',
    },
    teaching: [
        { title: 'घनानंद — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें किसी पद्यांश या गद्यांश के शब्दों के शाब्दिक अर्थ को पार करके लेखक के अंतर्निहित भाव, संदेश, संदर्भ और उद्देश्य को समझा और स्पष्ट किया जाता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_09_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow the mendicant\'s nights: feel repetition stretch time in the longing poem, then stand in the marketplace challenge — and weigh a devotion that survives its own rejection.',
        labels: ['घनानंद — आशय-स्पष्टीकरण और', 'घनानंद — परीक्षा-उत्तर लेखन', 'घनानंद — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your team\'s short play about waiting for exam results ends on the protagonist\'s whispered plea, still unanswered. The director wants to add a closing scene where the result actually arrives \'so the climax is real.\'',
            decisions: [{ prompt: 'What does this chapter\'s treatment of unresolved longing say?', options: [
                { text: 'Resist the add-on — in the poem the beloved never appears and the climax is still the speaker\'s desperate plea; the peak is internal intensity, not external resolution, so the whispered plea already is the play\'s climax.', outcome: 'The chapter names this the open-ended narrative: emotional maximum without plot closure; tacking on the result would release the tension the play spent its length building.' },
                { text: 'Add the result scene — a climax requires something to be decided on stage.', outcome: 'That\'s the equation the chapter corrects — climax is the turning point of tension, not the delivery of news; the plea is where the character\'s need peaks, and the arrival would be denouement pretending to be climax.', reveals: 'climax-needs-outcome' },
                { text: 'Keep the open end but cut the final plea so the play stays evenly unresolved.', outcome: 'Removing the plea removes the peak — the poem builds toward that cry precisely so the silence after it lands as answer; flattening the ending flattens the whole arc.', reveals: 'unresolved-means-flat' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_015', title: 'You made it',
          caseStudy: { intro: 'You can now read guru-bhakti as both wound and banner — the poet who lost everything but the name he kept singing.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें किसी पद्यांश या गद्यांश के शब्दों के.',
          hint: 'यदि छात्र आशय स्पष्टीकरण में कठिनाई महसूस कर रहा है, तो उसे पद्यांश-वार भावार्थ.',
          misconception: 'छात्र अक्सर आशय-स्पष्टीकरण को केवल पद्यांश के कठिन शब्दों के अर्थ लिखने या एक-एक वाक्य का शब्दार्थ अनुवाद करने तक सीमित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें किसी पद्यांश या गद्यांश के शब्दों के शाब्दिक अर्थ',
                  options: ['आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें किसी पद्यांश या गद्यांश के शब्दों के शाब्दिक अर्थ', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है'],
                  hint: 'यदि छात्र आशय स्पष्टीकरण में कठिनाई महसूस कर रहा है, तो उसे पद्यांश-वार भावार्थ.',
                  misconception: 'छात्र अक्सर आशय-स्पष्टीकरण को केवल पद्यांश के कठिन शब्दों के अर्थ लिखने या एक-एक वाक्य का शब्दार्थ अनुवाद करने तक सीमित मानते हैं, जैसे कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक पद्यांश लें (जैसे \'घनानंद\' का पहला पद्यांश) और उससे पहले केवल शब्दार्थ लिखने के बजाय, उनसे पूछिए.', 'कौन से शब्द या चित्र इस भावना को बनाते हैं?" फिर उन्हें मार्गदर्शन कीजिए कि वे भावना की पहचान करें, समर्थन करने वाले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है प्रश्न की मांग को समझकर, सटीक सामग्री चुनकर.',
          hint: 'यदि छात्र PEEL संरचना में फंस रहा है, तो उसे पहले c12_hin_a_cbse_09_013 (आशय-स्पष्टीकरण.',
          misconception: 'छात्र अक्सर मानते हैं कि अगर वे कविता का सही अर्थ जानते हैं, तो उत्तर लिखने का तरीका कोई फर्क नहीं पड़ता; वे लंबे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है प्रश्न की मांग को समझकर, सटीक सामग्री चुनकर, उसे PEEL',
                  options: ['परीक्षा-उत्तर लेखन कौशल का अर्थ है प्रश्न की मांग को समझकर, सटीक सामग्री चुनकर, उसे PEEL', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है'],
                  hint: 'यदि छात्र PEEL संरचना में फंस रहा है, तो उसे पहले c12_hin_a_cbse_09_013 (आशय-स्पष्टीकरण अभ्यास) पर.',
                  misconception: 'छात्र अक्सर मानते हैं कि अगर वे कविता का सही अर्थ जानते हैं, तो उत्तर लिखने का तरीका कोई फर्क नहीं पड़ता; वे लंबे पैराग्राफ लिख देते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर (जैसे केवल कविता का सारांश) और एक मजबूत उत्तर (PEEL संरचना में) कैसे अलग हैं। फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_015', difficulty: 'standard',
          question: 'वाचन-पाठ वह प्रक्रिया है जिसमें कविता या गद्यांश को सही उच्चारण, विराम, स्वर.',
          hint: 'यदि छात्र लय पहचान में कठिनाई महसूस कर रहा है, तो वर्ग 11 के वाचन-श्रवण मॉड्यूल.',
          misconception: 'छात्र अक्सर मानते हैं कि कविता के वाचन में केवल उच्चारण की शुद्धता मायने रखती है, और लय, ताल या भाव पर ध्यान नहीं देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ वह प्रक्रिया है जिसमें कविता या गद्यांश को सही उच्चारण, विराम, स्वर modulation',
                  options: ['वाचन-पाठ वह प्रक्रिया है जिसमें कविता या गद्यांश को सही उच्चारण, विराम, स्वर modulation', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के व्यक्तिगत जीवन, ऐतिहासिक संदर्भ, सामाजिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक stanza (पद) या पंक्तियों के समूह का', 'काव्य-संरचना कविता के समग्र रूप को संदर्भित करती है'],
                  hint: 'यदि छात्र लय पहचान में कठिनाई महसूस कर रहा है, तो वर्ग 11 के वाचन-श्रवण मॉड्यूल.',
                  misconception: 'छात्र अक्सर मानते हैं कि कविता के वाचन में केवल उच्चारण की शुद्धता मायने रखती है, और लय, ताल या भाव पर ध्यान नहीं देते — जैसे वे मानते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले एक सरल दोहा (जैसे संत की वाणी) देकर बोलें: "इस पंक्ति को अपने हाथ पर ताल रखकर पढ़िए — प्रत्येक ताल पर एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
