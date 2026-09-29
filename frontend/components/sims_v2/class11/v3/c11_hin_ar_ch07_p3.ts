import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch07_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch07_p3',
    title: 'पाठ 7 · Part 3/3',
    subtitle: 'Follow a simple request through an office where procedure eats its purpose.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 7 · Part 3/3',
    chapters: ['c11_hin_ar_ch07'],
    nodeIds: ['c11_hin_ar_cbse_07_013', 'c11_hin_ar_cbse_07_014', 'c11_hin_ar_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a citizen trapped in a paper corridor', intro: 'One lost child, three offices, zero responsibility — Renu turns a queue into a verdict on the system.', goal: 'Read bureaucratic satire and analyse how episodic structure builds the indictment.' },
    discovery: {
        question: 'A lost child at the station gets shuffled: report at Platform 3, stamp at the Superintendent\'s, return — by which time the child is gone. Just slapstick?',
        options: ['No — Renu\'s satire is that procedure has outlived its purpose: every stamp is correct and the outcome is cruelty', 'Yes — it\'s comedy with no bite', 'Yes — the child should have waited properly', 'No — it\'s actually a ghost story'],
        answer: 'No — Renu\'s satire is that procedure has outlived its purpose: every stamp is correct and the outcome is cruelty',
        hook: 'Anchalik fiction\'s trick: village dialect and folk detail aren\'t decoration — they\'re the machinery that makes the bureaucracy look absurd.',
    },
    teaching: [
        { title: 'पाठ 7 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'टेकु का इस्म+\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_07_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart the runaround office to office, identify where satire turns to indictment, and test whether the ending punishes the system or just exposes it.',
        labels: ['पाठ 7 — आलोचनात्मक', 'पाठ 7 — लेखन', 'पाठ 7 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_07_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 3/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — \'टेकु का इस्म+\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '7 -', options: ['7 -', '7 - -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — \'टेकु का इस्म+\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', answer: '7 - -', options: ['7 - -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a satire evening you pick Renu\'s story of a leopard cub passed between the Forest, Agriculture and Revenue departments while its mother waits. A classmate edits your script: \'Cut two of the three office refusals — they\'re repetitive — and make the climax the cub being rescued by officials.\'',
            decisions: [{ prompt: 'Why should you reject both edits?', options: [
                { text: 'Keep the pattern: the repeated refusals — forest guard, ranger, police, each citing rules and jurisdiction — ARE the structure; the circular paperwork mimics the bureaucracy being satirised. And the climax isn\'t the rescue outcome but the mother leopard bypassing the entire system: instinct achieves what the state couldn\'t, which is the satire\'s punch.', outcome: 'The script now bites as intended: repetition builds the indictment, and the resolution comes from circumventing bureaucracy, not satisfying it.' },
                { text: 'Accept the cuts — one refusal conveys the point; three is redundancy.', outcome: 'Repetition is the technique: a single refusal reads as one rude official; the pattern of identical refusals exposes a system, which is the satire\'s target.', reveals: 'repetition-is-redundancy' },
                { text: 'Let the officials save the cub — a competent government gives the story a hopeful close.', outcome: 'That reverses the satire: the story\'s logic demands the system fail while the animal\'s instinct succeeds — bureaucratic success would prove the system works.', reveals: 'officials-should-save-the-cub' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'Every official followed the rules — that\'s the horror: the machine ran perfectly and the point was lost.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_013', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि अटकें तो नोड 008 (बिंब/रूपक) और 009 (विरोधाभास/प्रतीक) पर लौटें — साहित्यिक युक्तियाँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना (Finding faults)** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेकु का इस्म+\' का आलोचनात्मक चिंतन',
                  options: ['\'टेकु का इस्म+\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटकें तो नोड 008 (बिंब/रूपक) और 009 (विरोधाभास/प्रतीक) पर लौटें — साहित्यिक युक्तियाँ ही.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना (Finding faults)** या **अपनी निजी राय देना.' }
          ],
            remediations: { 'finding-faults-personal-opinion-internal': { steps: ['**चरण 1:** छात्र से कहें: "आलोचना शब्द से \'नकारात्मक\' भाव हटाएँ। यहाँ आलोचना = **परीक्षण (Testing)**। जैसे वैज्ञानिक.', '\'अत्यधिक\' या \'काफ़ी\' क्यों नहीं?" — छात्र शब्द-चयन (Diction) पर ध्यान दे, यह विश्लेषण की पहली सीढ़ी है। **चरण 3:** PEEL.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_014', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'Review c11_hin_ar_cbse_07_006 (Theme: Primary Theme) and c11_hin_ar_cbse_07_013 (Critical.',
          misconception: 'छात्र अक्सर मानते हैं कि \'लेखन कौशल\' का अर्थ केवल \'सुंदर भाषा में लिखना\' या \'कहानी का सारांश लिखना\' है। वे PEEL संरचना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेकु का इस्म+\' पर पाठ-आधारित लेखन',
                  options: ['\'टेकु का इस्म+\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review c11_hin_ar_cbse_07_006 (Theme: Primary Theme) and c11_hin_ar_cbse_07_013 (Critical Thinking).',
                  misconception: 'छात्र अक्सर मानते हैं कि \'लेखन कौशल\' का अर्थ केवल \'सुंदर भाषा में लिखना\' या \'कहानी का सारांश लिखना\' है। वे PEEL संरचना को \'स्कूल का नियम\'.' }
          ],
            remediations: { 'peel': { steps: ['चरण 1: छात्र से कहें - "एक वाक्य में बताओ: यह कहानी किस बारे में है?" (अपेक्षित: "नौकरशाही की संवेदनहीनता के बारे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_015', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.',
          hint: 'यदि फँसें तो **c11_hin_ar_cbse_07_013 (आलोचनात्मक चिंतन)** के **"दावा-प्रमाण-वार्ता".',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **चर्चा-बिंदु = "अपनी राय बोलना"** है, इसलिए वे **तैयारी नहीं करते**, **पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेकु का इस्म+\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'टेकु का इस्म+\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **c11_hin_ar_cbse_07_013 (आलोचनात्मक चिंतन)** के **"दावा-प्रमाण-वार्ता".',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **चर्चा-बिंदु = "अपनी राय बोलना"** है, इसलिए वे **तैयारी नहीं करते**, **पाठ नहीं खोलते**, और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग (Modelling)**: शिक्षक स्वयं एक पाठ-अंश पढ़कर **LIVE PEEL बिंदु बनाएँ** — सोचते हुए बोलें: "मैं पंक्ति ३ देख.', 'यह **प्रतीक** हो सकता है...', 'मैं इसे Point बनाता हूँ..." 2.', '**संयुक्त अभ्यास (Guided Practice)**: कक्षा को **३ समूहों** में बाँटें; प्रत्येक को **एक ही पंक्ति** दें — **तीन अलग.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
