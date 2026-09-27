import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch01_p3: SimDef = {
    id: 'v3_c12_hin_v_ch01_p3',
    title: 'सल्विर वैडिंग · Part 3/3',
    subtitle: 'He built the home that would replace him',
    classLevel: 12, subject: 'hin_v', topic: 'सल्विर वैडिंग · Part 3/3',
    chapters: ['c12_hin_v_ch01'],
    nodeIds: ['c12_hin_v_cbse_01_013', 'c12_hin_v_cbse_01_014', 'c12_hin_v_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Domestic-fiction reader', intro: 'A story where nothing violent happens — except a father funding the place where he\'ll wait to be forgotten.', goal: 'Read Silver Wedding through the joint-to-nuclear transition — \'log kya kahenge\' versus the ethics of old age.' },
    discovery: {
        question: 'An old man builds a retirement home with his own hands — not for himself, but so his children\'s guilt never has to show. Passive victim, or something else?',
        options: ['Agency as sacrifice — he controls the story by choosing the terms of his own irrelevance; the tragedy is that his choices are moral, invisible to a transactional world', 'Passive — things happen to him', 'Cruel manipulation', 'Just retirement planning'],
        answer: 'Agency as sacrifice — he controls the story by choosing the terms of his own irrelevance; the tragedy is that his choices are moral, invisible to a transactional world',
        hook: 'The villain isn\'t poverty — it\'s prosperity: \'log kya kahenge\' replaces love with performance, and the silver wedding of marriage becomes a silver waiting room for the parents. Vanaprastha was chosen withdrawal; the retirement home is bureaucratic deposit — that\'s the modernity critique.',
    },
    teaching: [
        { title: 'सल्विर वैडिंग — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ की गहन जाँच-पड़ताल है जिसमें पाठ के स्पष्ट अर्थ (explicit meaning) से आगे जाकर उसके निहितार्थ (implicit meaning), अंतर्विरोध, लेखकीय उद्देश्य.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the silver wedding of abandonment: weigh \'log kya kahenge\' as a governing force, separate chosen renunciation from deposited old age, and read the quiet defiance inside \'jo hoga hoga.\'',
        labels: ['सल्विर वैडिंग — आलोचनात्मक', 'सल्विर वैडिंग — लेखन', 'सल्विर वैडिंग — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_v_cbse_01_014', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['प्रश्न का कीवर्ड पहचानें — "द्वंद्व" (conflict).', 'Point लिखें — "यशोधर का चरित्र परंपरागत मूल्यों और आधुनिक.', 'Evidence चुनें (2 विशिष्ट क्षण) — (अ) रजत जयंती की.', 'Explanation लिखें — (अ) उसकी चुप्पी परंपरा के भार तले.', 'Link लिखें — "यह द्वंद्व उपन्यास के केंद्रीय विषय \'पीढ़ीगत.'], answer: 'प्रश्न का कीवर्ड पहचानें — "द्वंद्व" (conflict). Point लिखें — "यशोधर का चरित्र परंपरागत मूल्यों और आधुनिक. Evidence चुनें (2 विशिष्ट क्षण) — (अ) रजत जयंती की. Explanation लिखें — (अ) उसकी चुप्पी परंपरा के भार तले. Link लिखें — "यह द्वंद्व उपन्यास के केंद्रीय विषय \'पीढ़ीगत.' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Volunteering at an old-age home, you find one resident, Shyam Lal, drifting mid-sentence into stories of his dead friend Phunkun whenever a train whistle sounds. The coordinator wants him \'redirected to the present\' every time.',
            decisions: [{ prompt: 'What does the story\'s dual-timeline structure say about that redirection?', options: [
                { text: 'Don\'t snap the thread — the story shows memory triggered by sound and sight is how he survives the present; the flashbacks aren\'t confusion but the architecture of a self, and dragging him \'back\' severs the only continuity he has.', outcome: 'The chapter\'s point: the non-linear present-past weave enacts memory-as-survival — what remains when everything else fades isn\'t the present but the friendship the present keeps summoning.' },
                { text: 'Support the redirection — dwelling in the past is unhealthy and the present is where he should live.', outcome: 'The story deliberately refuses that framing: the past isn\'t escape from his life, it IS the substance of it — the old-age home is bare precisely because the memories are full.', reveals: 'present-over-memory' },
                { text: 'Let him wander but treat the stories as symptoms of decline to be managed.', outcome: 'The chapter\'s ending is a spiral, not a circle — he returns to the same road and tree irreversibly changed; reading the returns as symptoms misses that each repetition carries accumulated meaning, not deterioration.', reveals: 'memory-is-symptom' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a family story as a verdict on prosperity — where the eldest generation builds the very institution that will erase it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ की गहन जाँच-पड़ताल है.',
          hint: 'अगर अटकें तो c12_hin_v_cbse_01_012 (बोध-प्रश्न) पर लौटें — वहाँ प्रमाण ढूँढ़ने का अभ्यास.',
          misconception: 'छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' = \'पाठ की कमियाँ निकालना\' या \'अपनी राय लिखना\'। असल में यह **पाठ-आधारित साक्ष्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ की गहन जाँच-पड़ताल है जिसमें पाठ',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ की गहन जाँच-पड़ताल है जिसमें पाठ', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के सृजन-काल की', '**कथानक** घटनाओं का तार्किक-कारणात्मक क्रम है (घटना अ → घटना ब → घटना स), जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना का भौगोलिक, ऐतिहासिक, सामाजिक-सांस्कृतिक और भावनात्मक'],
                  hint: 'अगर अटकें तो c12_hin_v_cbse_01_012 (बोध-प्रश्न) पर लौटें — वहाँ प्रमाण ढूँढ़ने का अभ्यास है।',
                  misconception: 'छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' = \'पाठ की कमियाँ निकालना\' या \'अपनी राय लिखना\'। असल में यह **पाठ-आधारित साक्ष्य (textual evidence) से.' }
          ],
            remediations: { 'textual-evidence': { steps: ['छात्र को पाठ का एक छोटा अंश (5-6 पंक्तियाँ) दें और कहें: "यहाँ लेखक ने **क्या** कहा, **कैसे** कहा, और **क्यों** ऐसा कहा.', 'फिर उससे पूछें: "अगर यहाँ \'और\' की जगह \'लेकिन\' होता तो अर्थ कैसे बदलता?" — यह **भाषा-चयन (diction)** की संवेदनशीलता.', 'अंत में उससे एक **दावा-प्रमाण-व्याख्या (Claim-Evidence-Explanation)** तालिका भरवाएँ जिसमें तीन कॉलम हों — इससे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_014', difficulty: 'standard',
          question: '"लेखन कौशल: पाठ-आधारित" is the competency of constructing structured.',
          hint: 'यदि PEEL संरचना समझ न आए: c11_hin_v_cbse_01_014 (कक्षा 11 वितान लेखन कौशल) के.',
          misconception: '**विशिष्ट भ्रांति:** "अच्छा उत्तर = पाठ की अधिक से अधिक जानकारी लिख देना।" **वास्तविकता:** CBSE बोर्ड परीक्षा में *अधिक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"लेखन कौशल: पाठ-आधारित" is the competency of constructing structured, evidence-backed',
                  options: ['"लेखन कौशल: पाठ-आधारित" is the competency of constructing structured, evidence-backed', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के सृजन-काल की', '**कथानक** घटनाओं का तार्किक-कारणात्मक क्रम है (घटना अ → घटना ब → घटना स), जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना का भौगोलिक, ऐतिहासिक, सामाजिक-सांस्कृतिक और भावनात्मक'],
                  hint: 'यदि PEEL संरचना समझ न आए: c11_hin_v_cbse_01_014 (कक्षा 11 वितान लेखन कौशल) के WORKED_EXAMPLE_1 को.',
                  misconception: '**विशिष्ट भ्रांति:** "अच्छा उत्तर = पाठ की अधिक से अधिक जानकारी लिख देना।" **वास्तविकता:** CBSE बोर्ड परीक्षा में *अधिक लिखने* पर अंक नहीं.' }
          ],
            remediations: { 'cbse': { steps: ['**निदान:** छात्र से एक पुराना उत्तर लें — PEEL लेबल (P, E, E, L) लगाने को कहें। यदि वे नहीं लगा पाते → संरचना समझ नहीं.', '**उपचार:** c12_hin_v_cbse_01_014 के WORKED_EXAMPLE_1 को साथ पढ़ें — प्रत्येक चरण पर रुकें, पूछें: "यहाँ Point कहाँ.', 'Evidence कहाँ शुरू होता है?" 3.', '**अभ्यास:** एक ही प्रश्न पर 3 उत्तर लिखवाएं: (अ) बिना PEEL, (ब) केवल P+E, (स) पूर्ण PEEL — फिर CBSE नमूना अंकन योजना से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी शिक्षण प्रक्रिया है जिसमें छात्र किसी.',
          hint: 'यदि अटका हुआ महसूस हो तो: c12_hin_v_cbse_01_013 (आलोचनात्मक चिंतन) पर लौटें — वहाँ दी गई.',
          misconception: 'छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है — पाठ से 5-10 प्रश्न तैयार कर लेना जिनके \'सही उत्तर\' शिक्षक को पता हों।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी शिक्षण प्रक्रिया है जिसमें छात्र किसी साहित्यिक पाठ',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहयोगी शिक्षण प्रक्रिया है जिसमें छात्र किसी साहित्यिक पाठ', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के सृजन-काल की', '**कथानक** घटनाओं का तार्किक-कारणात्मक क्रम है (घटना अ → घटना ब → घटना स), जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना का भौगोलिक, ऐतिहासिक, सामाजिक-सांस्कृतिक और भावनात्मक'],
                  hint: 'यदि अटका हुआ महसूस हो तो: c12_hin_v_cbse_01_013 (आलोचनात्मक चिंतन) पर लौटें — वहाँ दी गई.',
                  misconception: 'छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है — पाठ से 5-10 प्रश्न तैयार कर लेना जिनके \'सही उत्तर\' शिक्षक को पता हों। वास्तव में, चर्चा-बिंदु.' }
          ],
            remediations: { '5-10': { steps: ['छात्र को \'बंद प्रश्न\' (क्या, कब, कौन) और \'खुले चर्चा-बिंदु\' (कैसे, क्यों, क्या अर्थ) के 5-5 उदाहरण देकर अंतर स्पष्ट.', '\'सल्विर वैडिंग\' के किसी एक प्रसंग (जैसे अंतिम दृश्य) पर दोनों प्रकार के 3-3 प्रश्न लिखवाएँ। 3.', 'छात्र से पूछें: "कौन-सा प्रश्न तुम्हें अधिक सोचने पर मजबूर करता है?" — यही चर्चा-बिंदु की पहचान है। 4.', 'पुनः निदान: अगली कक्षा में छात्र द्वारा रचे गए चर्चा-बिंदु को कसौटी (पाठ-आधारित?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
