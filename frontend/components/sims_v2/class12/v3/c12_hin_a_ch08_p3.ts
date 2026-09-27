import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch08_p3: SimDef = {
    id: 'v3_c12_hin_a_ch08_p3',
    title: 'वद्यिापति · Part 3/3',
    subtitle: 'A weaver taught God to speak the market\'s language',
    classLevel: 12, subject: 'hin_a', topic: 'वद्यिापति · Part 3/3',
    chapters: ['c12_hin_a_ch08'],
    nodeIds: ['c12_hin_a_cbse_08_013', 'c12_hin_a_cbse_08_014', 'c12_hin_a_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Nirgun Bhakti reader', intro: 'In Kashi\'s weaving lanes, a poet stitched four tongues into one — and aimed it at both temples and mosques.', goal: 'Read Kabir through Nirgun Bhakti, Sadhukkari language and the weaver\'s world as spiritual metaphor.' },
    discovery: {
        question: 'A weaver from Kashi writes verses in Sadhukkari — a mongrel tongue mixing Braj, Avadhi, Persian and Arabic — while priests guarded Sanskrit. What was Kabir really refusing?',
        options: ['The gatekeeping itself — his mixed lingua franca spoke past Sanskrit and Persian elites straight to artisans and mystics; the language was the rebellion', 'Elite languages are hard', 'He only knew dialect', 'Nothing — language is neutral'],
        answer: 'The gatekeeping itself — his mixed lingua franca spoke past Sanskrit and Persian elites straight to artisans and mystics; the language was the rebellion',
        hook: 'Don\'t confuse simple words with simple thought — his loom, his market, his courtyard are dense metaphysics in a worker\'s vocabulary. Life is cloth on the loom of time; see the weaving before it\'s finished. The weaver\'s craft is the epistemology.',
    },
    teaching: [
        { title: 'वद्यिापति — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कोई पद्यांश या गद्यांश पढ़कर उसके शब्दशः अर्थ के साथ-साथ अंतर्निहित भाव, संदेश, लेखक के दृष्टिकोण और पाठ के व्यापक संदर्भ को समझकर स्पष्ट रूप से व्यक्त किया जाता.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sit at Kabir\'s loom: trace how a julaha\'s tools became metaphysical vocabulary, weigh Nirgun devotion against both orthodoxies, and hear a marketplace tongue carry the sublime.',
        labels: ['वद्यिापति — आशय-स्पष्टीकरण और', 'वद्यिापति — परीक्षा-उत्तर लेखन', 'वद्यिापति — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_08_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend\'s mother has been sinking into helpless waiting since her husband\'s posting abroad — she watches the gate all day and does nothing else. In the chapter\'s three-stanza poem, the separated woman ends by turning to the lamp and commanding it to stay lit so he can find his way home.',
            decisions: [{ prompt: 'What does that final stanza suggest your friend could offer her?', options: [
                { text: 'A ritual of agency — the poem\'s turn is from passive watching (the path) to doing something (keeping the lamp); helping her convert waiting into a nightly act — a lit lamp, a call scheduled, a task kept — changes despair into participation.', outcome: 'The stanza\'s climax is the moment she stops describing pain and acts on the world she can reach; the lamp becomes a collaborator, not just a symbol.' },
                { text: 'Reassure her that waiting itself is love enough — she shouldn\'t need to do anything.', outcome: 'The poem shows static watching is the anguish, not the answer — stanza 2 is exactly that passive night; the relief arrives only when she takes hold of a ritual.', reveals: 'waiting-is-enough' },
                { text: 'Distract her entirely — get her to stop thinking about him altogether.', outcome: 'The poem neither abandons the longing nor dissolves it in distraction — it channels it into a small commanded act; forgetting isn\'t the resolution, agency within the wait is.', reveals: 'distraction-equals-relief' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'You can now read Kabir\'s \'simple\' words as surgical philosophy — and see language choice as the heart of his defiance.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कोई पद्यांश या गद्यांश पढ़कर उसके शब्दशः.',
          hint: 'यदि छात्र कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_08_002 (पद्यांश-वार भावार्थ) और.',
          misconception: 'छात्र अक्सर आशय-स्पष्टीकरण को शब्दशः अनुवाद या पाठ का सारांश मान लेते हैं, जैसे कि "कवि ने कहा कि नदी बह रही है" को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कोई पद्यांश या गद्यांश पढ़कर उसके शब्दशः अर्थ के',
                  options: ['आशय-स्पष्टीकरण वह प्रक्रिया है जिसमें कोई पद्यांश या गद्यांश पढ़कर उसके शब्दशः अर्थ के', 'वद्यिापति — कवि परिचय और पृष्ठभूमि का अर्थ है मिथिला क्षेत्र के 14वीं शताब्दी के', 'पद्यांश-वार भावार्थ की प्रक्रिया में कविता के प्रत्येक खंड (पद्यांश) को ध्यान से पढ़कर', 'काव्य-संरचना का अर्थ है कविता के आंतरिक ढांचे का विश्लेषण'],
                  hint: 'यदि छात्र कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_08_002 (पद्यांश-वार भावार्थ) और.',
                  misconception: 'छात्र अक्सर आशय-स्पष्टीकरण को शब्दशः अनुवाद या पाठ का सारांश मान लेते हैं, जैसे कि "कवि ने कहा कि नदी बह रही है" को पर्याप्त उत्तर मान लेते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक सरल वाक्य दें: "वह रो रहा था।" पहले पूछें: "इसका शब्दशः अर्थ क्या है?" फिर पूछें: "इससे क्या भाव प्रकट हो.', 'इस स्थिति में कौन सी मानवीय दशा दिख सकती है?" इस प्रकार शब्दशः अर्थ से भाव और संदर्भ की ओर ले जाकर, उन्हें दिखाएँ कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल वह प्रक्रिया है जिसमें छात्र प्रश्न की मांग को समझते.',
          hint: 'यदि छात्र उत्तर में विश्लेषण नहीं जोड़ पा रहा है, तो उसे c12_hin_a_cbse_08_004 (केंद्रीय.',
          misconception: 'छात्र अक्सर मानते हैं कि परीक्षा में लंबा उत्तर लिखने से अधिक अंक मिलते हैं, इसलिए वे कविता की extraneous पंक्तियों को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल वह प्रक्रिया है जिसमें छात्र प्रश्न की मांग को समझते हैं, पाठ्य',
                  options: ['परीक्षा-उत्तर लेखन कौशल वह प्रक्रिया है जिसमें छात्र प्रश्न की मांग को समझते हैं, पाठ्य', 'वद्यिापति — कवि परिचय और पृष्ठभूमि का अर्थ है मिथिला क्षेत्र के 14वीं शताब्दी के', 'पद्यांश-वार भावार्थ की प्रक्रिया में कविता के प्रत्येक खंड (पद्यांश) को ध्यान से पढ़कर', 'काव्य-संरचना का अर्थ है कविता के आंतरिक ढांचे का विश्लेषण'],
                  hint: 'यदि छात्र उत्तर में विश्लेषण नहीं जोड़ पा रहा है, तो उसे c12_hin_a_cbse_08_004 (केंद्रीय भाव और रस).',
                  misconception: 'छात्र अक्सर मानते हैं कि परीक्षा में लंबा उत्तर लिखने से अधिक अंक मिलते हैं, इसलिए वे कविता की extraneous पंक्तियों को भर देते हैं या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाएँ कि एक लंबा लेकिन असंबंधित उत्तर और एक छोटा लेकिन PEEL-आधारित उत्तर में क्या अंतर है। पहले, एक सामान्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_015', difficulty: 'standard',
          question: 'वाचन-पाठ का अर्थ है कविता की पंक्तियों को उचित लय, ताल, विराम और भाव-भंगिमा के.',
          hint: 'यदि छात्र वाचन में जोर और ताल पहचानने में फंस जाए, तो वे c12_hin_a_cbse_08_003 (छंद और.',
          misconception: 'छात्र अक्सर सोचते हैं कि वाचन में केवल तेज़ या धीमी गति से पढ़ना महत्वपूर्ण है, जबकि वे लय (ताल), शब्द-जोर (बल), और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ का अर्थ है कविता की पंक्तियों को उचित लय, ताल, विराम और भाव-भंगिमा के साथ पढ़ना,',
                  options: ['वाचन-पाठ का अर्थ है कविता की पंक्तियों को उचित लय, ताल, विराम और भाव-भंगिमा के साथ पढ़ना,', 'वद्यिापति — कवि परिचय और पृष्ठभूमि का अर्थ है मिथिला क्षेत्र के 14वीं शताब्दी के', 'पद्यांश-वार भावार्थ की प्रक्रिया में कविता के प्रत्येक खंड (पद्यांश) को ध्यान से पढ़कर', 'काव्य-संरचना का अर्थ है कविता के आंतरिक ढांचे का विश्लेषण'],
                  hint: 'यदि छात्र वाचन में जोर और ताल पहचानने में फंस जाए, तो वे c12_hin_a_cbse_08_003 (छंद और लय-विधान).',
                  misconception: 'छात्र अक्सर सोचते हैं कि वाचन में केवल तेज़ या धीमी गति से पढ़ना महत्वपूर्ण है, जबकि वे लय (ताल), शब्द-जोर (बल), और विराम-sthan की अनदेखी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले कविता की एक पंक्ति (जैसे "मैं तो होइ महालिया") को तीन बार पढ़वाइए: पहली बार सामान्य गति से, दूसरी बार.', 'इससे उन्हें समझ आएगा कि जोर और लय, मात्र गति से अधिक महत्वपूर्ण हैं। फिर विराम का अभ्यास करवाइए — पंक्ति के बाद एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
