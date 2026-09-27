import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch01_p3: SimDef = {
    id: 'v3_c11_hin_v_ch01_p3',
    title: 'पाठ 1 · Part 3/3',
    subtitle: 'Watch theatre\'s grammar shift from the spoken word to the seen image.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 1 · Part 3/3',
    chapters: ['c11_hin_v_ch01'],
    nodeIds: ['c11_hin_v_cbse_01_013', 'c11_hin_v_cbse_01_014', 'c11_hin_v_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a theatre-goer learning to watch with new eyes', intro: 'Before the curtain: a voice from a machine, no face attached — Agyeya builds his whole argument about modern theatre from that disembodied sound.', goal: 'Distinguish literary and visual drama and analyse the essay\'s experiential-to-theoretical arc.' },
    discovery: {
        question: 'A play\'s power used to live in its words — then cinema made sound, light and silence do the talking. Did audiences\' eyes actually change?',
        options: ['Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted', 'No — an audience is an audience, whatever the medium', 'No — only critics changed, not viewers', 'Yes — but only because tickets got cheaper'],
        answer: 'Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted',
        hook: 'Agyeya opens by hearing a gramophone before seeing anything — a miniature of his thesis: modern theatre detached sound from sight and rewired the senses.',
    },
    teaching: [
        { title: 'पाठ 1 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के स्पष्ट अर्थ से आगे जाकर उसके अंतर्निहित अभिप्राय, संरचनात्मक युक्तियों, वैचारिक पूर्वाग्रहों और सौंदर्यात्मक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split classical Sanskrit, Parsi-folk and Mohan Rakesh\'s realism into their governing principles, then judge whether word-dominant and visual-dominant theatre can even be compared.',
        labels: ['पाठ 1 — आलोचनात्मक', 'पाठ 1 — लेखन', 'पाठ 1 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_v_cbse_01_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 3/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह प्रक्रिया है जिसमें छात्र पाठ्यपुस्तक.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी साहित्यिक.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your theatre club is adapting a stage play into a short film. A member says: \'Just film the play — theatre is literature, cinema is just literature with a camera. Agyeya\'s essay on Mohan Rakesh is basically a biography of a playwright.\'',
            decisions: [{ prompt: 'What does Agyeya\'s argument actually say?', options: [
                { text: 'Explain the grammar shift: the essay is a manifesto for रंगमंचीय/चित्रकाव्य as an independent art — a move from शब्द-प्रधान (word-dominant) to दृश्य-श्रव्य-प्रधान (audio-visual dominant) theatre. Silence, light, sound and pause have their own grammar that literary criticism ignores; Mohan Rakesh is the case study of a playwright who bridged both traditions, not merely the subject of a biography.', outcome: 'The adaptation rethink begins: film isn\'t filmed literature — it tells through image and sound, which is precisely the epistemological shift the essay maps.' },
                { text: 'Film the play as written — if the script is strong, the medium doesn\'t matter.', outcome: 'That\'s exactly the assumption the essay dismantles: visual drama has its own aesthetics; a pause on stage and a cut on screen do different work.', reveals: 'film-is-filmed-theatre' },
                { text: 'Treat the essay as Rakesh\'s life story — mine it for biographical details about the playwright.', outcome: 'Rakesh is the evidence, not the argument: the essay is about a shift in theatrical grammar, not a personality profile.', reveals: 'essay-is-playwright-biography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'Comparing classical and cinematic theatre is like comparing poetry to architecture — different substances, different rules, different eyes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें.',
          hint: 'यदि विश्लेषण शुरू न हो पा रहा हो, तो **\'तीन-स्तरीय पठन\'** (भाषिक → साहित्यिक → विषयगत) का.',
          misconception: 'छात्र समझते हैं कि **\'आलोचनात्मक\' का अर्थ \'नकारात्मक आलोचना\' (fault-finding) होता है** — इसलिए वे या तो पाठ की प्रशंसा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक'],
                  hint: 'यदि विश्लेषण शुरू न हो पा रहा हो, तो **\'तीन-स्तरीय पठन\'** (भाषिक → साहित्यिक → विषयगत) का अभ्यास.',
                  misconception: 'छात्र समझते हैं कि **\'आलोचनात्मक\' का अर्थ \'नकारात्मक आलोचना\' (fault-finding) होता है** — इसलिए वे या तो पाठ की प्रशंसा में डूब जाते हैं (यह.' }
          ],
            remediations: { 'fault-finding': { steps: ['**स्पष्ट करें:** "Critical = निंदा नहीं, विवेचन है।" बोर्ड परीक्षा के मार्किंग स्कीम में \'critical appreciation\' का.', '**अभ्यास दें:** पाठ 1 के दो विपरीत अंश दें (एक प्रशंसात्मक, एक आलोचनात्मक/संकेतात्मक) और पूछें: "दोनों को मिलाकर एक.', '**मॉडल दिखाएं:** एक कमजोर उत्तर (केवल प्रशंसा) और एक सशक्त उत्तर (साक्ष्य-आधारित विश्लेषण) साथ रखकर अंतर स्पष्ट करें। 4.', '**चेकलिस्ट दें:** "क्या मैंने पाठ से उद्धरण दिया?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह प्रक्रिया है जिसमें छात्र.',
          hint: 'If stuck, review **c11_hin_v_cbse_01_013 (आलोचनात्मक चिंतन)** to re-learn how to generate.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर लिखने का अर्थ है पाठ की पंक्तियों को ज्यों-का-त्यों कॉपी कर देना (Verbatim.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह प्रक्रिया है जिसमें छात्र पाठ्यपुस्तक',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह प्रक्रिया है जिसमें छात्र पाठ्यपुस्तक', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक'],
                  hint: 'If stuck, review **c11_hin_v_cbse_01_013 (आलोचनात्मक चिंतन)** to re-learn how to generate.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर लिखने का अर्थ है पाठ की पंक्तियों को ज्यों-का-त्यों कॉपी कर देना (Verbatim Copying) या पूरे.' }
          ],
            remediations: { 'verbatim-copying-text-based-quote': { steps: ['**लक्षित सुधार (Targeted Remediation):** 1.', '**\'हाइलाइट एंड टैग\' अभ्यास (Highlight & Tag Drill):** छात्र को पाठ का एक पृष्ठ देकर कहें: *"इसमें से केवल वही 3 वाक्य.', '**\'कॉपी-पेस्ट बनाम विश्लेषण\' तुलना तालिका:** बोर्ड के दो नमूना उत्तर दिखाएँ—एक जिसमें केवल उद्धरण हैं (0-1 अंक), दूसरा.', '**\'एक प्रमाण, तीन व्याख्या\' खेल:** एक ही उद्धरण देकर पूछें: *"इसे \'दृढ़ता\' सिद्ध करने के लिए कैसे लिखोगे?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी.',
          hint: 'यदि अटका महसूस हो तो **c11_hin_v_cbse_01_008 (बिंब और रूपक)** और **c11_hin_v_cbse_01_009.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि चर्चा-बिंदु का अर्थ है — "पाठ के बारे में अपने विचार (opinions) रखना" और इसके.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी साहित्यिक',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी साहित्यिक', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**कथानक** घटनाओं का कारण-कार्य संबंध (causal sequence) पर आधारित तार्किक क्रम है जो', 'पाठ्य-परिवेश (Setting) किसी रचना का वह **भौगोलिक, ऐतिहासिक, सामाजिक एवं सांस्कृतिक'],
                  hint: 'यदि अटका महसूस हो तो **c11_hin_v_cbse_01_008 (बिंब और रूपक)** और **c11_hin_v_cbse_01_009 (विरोधाभास.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि चर्चा-बिंदु का अर्थ है — "पाठ के बारे में अपने विचार (opinions) रखना" और इसके लिए पाठ खोलने की.' }
          ],
            remediations: { 'opinions': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**मॉडलिंग (Modelling):** शिक्षक पाठ 1 का एक छोटा अंश (3-4 पंक्तियाँ) पढ़कर दिखाए: "देखो, मैं इस पंक्ति पर रुकता हूँ.', '**संयुक्त अभ्यास (Guided Practice):** छात्रों को जोड़ियों में बाँटकर एक-एक \'साक्ष्य-पर्ची\' (evidence slip) दें जिस पर.', '**स्वतंत्र अभ्यास (Independent Practice):** गृहकार्य: "पाठ 1 से 3 साक्ष्य-पर्चियाँ खुद चुनो, प्रत्येक से एक चर्चा-बिंदु.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
