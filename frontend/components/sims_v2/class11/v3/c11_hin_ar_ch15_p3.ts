import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch15_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch15_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch15_p3',
    title: 'पाठ 15 · Part 3/3',
    subtitle: 'Watch a poem dismantle your definitions before it offers its own.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 15 · Part 3/3',
    chapters: ['c11_hin_ar_ch15'],
    nodeIds: ['c11_hin_ar_cbse_15_013', 'c11_hin_ar_cbse_15_014', 'c11_hin_ar_cbse_15_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a hill journalist naming the cruelty inside ordinary leaving', intro: 'Men leave Garhwal for Delhi\'s scaffolds and it barely counts as news — the poem asks what \'small\' and \'cruel\' really mean.', goal: 'Analyse the negative-then-positive argumentative structure and the poem\'s migrant-labour context.' },
    discovery: {
        question: 'The poem opens by listing what cruelty is NOT — three whole stanzas of negatives. Cut them and lose nothing?',
        options: ['No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle', 'Yes — a poem should state its thesis upfront', 'Yes — negative definitions are logically empty', 'No — but only because the poem would be too short'],
        answer: 'No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle',
        hook: 'The refrain flips at the fourth stanza — \'not this\' becomes \'this is the most dangerous\' — and the imagery turns from home\'s warmth to a worker\'s weary feet.',
    },
    teaching: [
        { title: 'पाठ 15 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के तथ्यों, तर्कों, भाषा-प्रयोगों और संरचना को व्यवस्थित ढंग से परखकर, उनके परस्पर संबंध और निहितार्थ (implications) स्पष्ट करने की प्रक्रिया है; विश्लेषण.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_15_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the stanza where negation flips to assertion, then weigh the title\'s provocation — \'the smallest is not the smallest\' — against 1980s hill migration.',
        labels: ['पाठ 15 — आलोचनात्मक', 'पाठ 15 — लेखन', 'पाठ 15 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_15_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 15 · Part 3/3', spots: [
            { id: 's1', label: '15 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह विधि है जिसमें किसी साहित्यिक पाठ (गद्य/पद्य) के विशिष्ट अंशों.', answer: '15 -', options: ['15 -', '15 - -'] },
            { id: 's2', label: '15 - -', prompt: 'Which idea is this? — चर्चा-बिंदु वे पूर्व-निर्धारित विषय या प्रश्न होते हैं जो पाठ के वाचन-श्रवण के बाद.', answer: '15 - -', options: ['15 - -', '15 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a kavi sammelan themed on migration, someone offers \'Laguta Sabse Chhoti Nahin Hoti\' but introduces it as \'a gentle poem about how small people also matter — mothers\' love, fathers\' laps, childhood warmth.\'',
            decisions: [{ prompt: 'What is the poem actually arguing, and how is it built?', options: [
                { text: 'Read the title as provocation from a people\'s-advocate journalist of Tehri Garhwal who watched villages empty as men left for Delhi\'s construction sites: \'smallness\' is redefined as the erosion of dignity when survival fractures belonging. Structurally it argues by elimination — the first stanzas keep saying what cruelty is NOT before the positives arrive, climaxing in the weary worker\'s feet — dignity dying slowly in everyday struggle.', outcome: 'The introduction is corrected: it\'s not a warm affirmation of small lives but a reckoning with what migration does to human worth — built like a debate, not a lullaby.' },
                { text: 'Keep the gentle reading — the poem lists tender images of family, so it\'s about the dignity of simple lives.', outcome: 'The early stanzas are negatives — what cruelty is NOT — positioned to be stripped away; reading them as the thesis stops before the poem\'s real answer.', reveals: 'poem-is-gentle-affirmation' },
                { text: 'Present it as having no real structure — it\'s a mood piece on poverty, not an argument.', outcome: 'The argumentative architecture is precise: sequenced denials, a refrain as hinge, and a final image as verdict — structure performs the elimination.', reveals: 'poem-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_015', title: 'You made it',
          caseStudy: { intro: 'Written by a journalist who watched Tehri\'s villages empty to Delhi\'s construction sites — \'small\' was never about size; it\'s about what we\'re trained not to see.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के तथ्यों, तर्कों, भाषा-प्रयोगों और.',
          hint: 'यदि अटके तो **नोड 15_008 और 15_009** (बिंब/रूपक व विरोधाभास/प्रतीक) के कार्याभ्यास.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आलोचनात्मक चिंतन = पाठ में कमियाँ निकालना (fault-finding)" या "अपनी निजी राय लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के तथ्यों, तर्कों, भाषा-प्रयोगों और संरचना को',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के तथ्यों, तर्कों, भाषा-प्रयोगों और संरचना को', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें'],
                  hint: 'यदि अटके तो **नोड 15_008 और 15_009** (बिंब/रूपक व विरोधाभास/प्रतीक) के कार्याभ्यास (worked.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आलोचनात्मक चिंतन = पाठ में कमियाँ निकालना (fault-finding)" या "अपनी निजी राय लिख देना"।.' }
          ],
            remediations: { 'fault-finding': { steps: ['**पुनः परिभाषा स्पष्ट करें:** छात्र से कहें — "आलोचनात्मक चिंतन का अर्थ \'निंदा\' नहीं, \'विवेचन\' है। जैसे डॉक्टर रोगी की.', '**माइक्रो-अभ्यास कराएँ:** पाठ 15 का एक छोटा अंश (3-4 वाक्य) दें और केवल **एक** युक्ति (जैसे: अनुप्रास, विरोधाभास.', '**PEEL ढाँचा जबरन लागू करवाएँ:** हर उत्तर में चार वाक्य अनिवार्य करें — (Point) "लेखक ने X युक्ति प्रयुक्त की है".', '**सहकर्मी समीक्षा (peer review):** दो छात्रों के उत्तर बदलवाएँ और पूछें: "क्या तुम्हारे साथी ने **साक्ष्य से अर्थ तक की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह विधि है जिसमें किसी साहित्यिक पाठ (गद्य/पद्य) के.',
          hint: 'यदि फँसें तो c11_hin_ar_cbse_15_013 (आलोचनात्मक चिंतन) के "प्रश्न-प्रकार पहचानना" और.',
          misconception: 'विद्यार्थी समझते हैं कि **पाठ का सारांश (summary) लिख देना ही पाठ-आधारित उत्तर है**। वे प्रश्न के "कैसे/क्यों".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह विधि है जिसमें किसी साहित्यिक पाठ (गद्य/पद्य) के विशिष्ट अंशों,',
                  options: ['पाठ-आधारित लेखन कौशल वह विधि है जिसमें किसी साहित्यिक पाठ (गद्य/पद्य) के विशिष्ट अंशों,', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें'],
                  hint: 'यदि फँसें तो c11_hin_ar_cbse_15_013 (आलोचनात्मक चिंतन) के "प्रश्न-प्रकार पहचानना" और "प्रमाण-चयन".',
                  misconception: 'विद्यार्थी समझते हैं कि **पाठ का सारांश (summary) लिख देना ही पाठ-आधारित उत्तर है**। वे प्रश्न के "कैसे/क्यों" (how/why) को नज़रअंदाज़ करके.' }
          ],
            remediations: { 'summary-how-why-what-happened': { steps: ['**पहचान:** विद्यार्थी से कहो — "अपना उत्तर पढ़ो और हर वाक्य के आगे पूछो: *क्या यह पाठ से प्रमाण दे रहा है?', 'क्या यह बता रहा है कि प्रमाण मेरे कथन को कैसे सिद्ध करता है?*" 2.', '**रंग-कोडिंग:** दो रंगों के पेन से — **नीला** = Point/Link (अपने शब्द), **लाल** = Evidence (पाठ के शब्द), **हरा**.', '**माइक्रो-अभ्यास:** एक छोटे अंश (5-6 पंक्ति) पर केवल **Explanation** लिखने का अभ्यास कराओ — "यह पंक्ति दर्शाती है कि...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु वे पूर्व-निर्धारित विषय या प्रश्न होते हैं जो पाठ के वाचन-श्रवण के.',
          hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_15_006 (मुख्य विषय और संदेश) और.',
          misconception: 'छात्र अक्सर समझते हैं कि चर्चा-बिंदु का अर्थ है \'शिक्षक द्वारा पूछे गए प्रश्नों के सही उत्तर देना\'। वे चर्चा को एकतरफा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु वे पूर्व-निर्धारित विषय या प्रश्न होते हैं जो पाठ के वाचन-श्रवण के बाद',
                  options: ['चर्चा-बिंदु वे पूर्व-निर्धारित विषय या प्रश्न होते हैं जो पाठ के वाचन-श्रवण के बाद', '\'पृष्ठभूमि\' से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है जिसमें', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम संबंध से बँधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का **समग्र संदर्भ** है जिसमें'],
                  hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_15_006 (मुख्य विषय और संदेश) और c11_hin_ar_cbse_15_013.',
                  misconception: 'छात्र अक्सर समझते हैं कि चर्चा-बिंदु का अर्थ है \'शिक्षक द्वारा पूछे गए प्रश्नों के सही उत्तर देना\'। वे चर्चा को एकतरफा प्रश्नोत्तरी (quiz).' }
          ],
            remediations: { 'quiz-objective-questions-15': { steps: ['चरण 1: छात्र को स्पष्ट करें कि चर्चा-बिंदु का कोई \'एक सही उत्तर\' नहीं होता — यह एक **खुला आमंत्रण** है तर्क-वितर्क का।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
