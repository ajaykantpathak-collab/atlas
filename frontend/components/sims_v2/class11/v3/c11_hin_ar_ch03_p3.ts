import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch03_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch03_p3',
    title: 'पाठ 3 · Part 3/3',
    subtitle: 'Watch a first creative act survive its own terror — and its own comedy.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 3 · Part 3/3',
    chapters: ['c11_hin_ar_ch03'],
    nodeIds: ['c11_hin_ar_cbse_03_013', 'c11_hin_ar_cbse_03_014', 'c11_hin_ar_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a first-time creator guarding a small bottle of ink', intro: 'An adult writer looks back at the day everything that could go wrong on a makeshift stage did — and the dream survived anyway.', goal: 'Read the ink bottle as a symbol of fragile creative courage and locate the play-night climax.' },
    discovery: {
        question: 'A story built around a tiny ink bottle — \'दाई साल\' of a first attempt. Just a prop on a desk?',
        options: ['No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins', 'Yes — objects in titles are always decorative', 'No — the ink is secretly magical', 'Yes — the real subject is the writing desk'],
        answer: 'No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins',
        hook: 'The Nayi Kahani writer makes the labour of writing itself the story — doubt, ghosts, landlords and all.',
    },
    teaching: [
        { title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के तत्वों — कथानक, पात्र, भाषा, शैली, बिंब, प्रतीक — को **विघटित (deconstruct)** करके उनके पारस्परिक संबंधों और रचनात्मक उद्देश्य की तार्किक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track a first creative attempt through its chaos — the stage, the mix-up of two actors as one \'भूत\' — and ask why the imperfection is the point.',
        labels: ['पाठ 3 — आलोचनात्मक', 'पाठ 3 — लेखन', 'पाठ 3 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_03_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 3/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है — निर्धारित पाठ (गद्य/पद्य) के **अंतर्वस्तु, शिल्प.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — **वाचन-श्रवण: चर्चा-बिंदु** एक सुनियोजित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी पाठ का.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary magazine plans a feature on \'writers writing about writing.\' A junior editor suggests Ikappiya\'s story but calls it \'a plain autobiography of a struggling writer — Nayi Kahani is just a label to memorise for exams.\'',
            decisions: [{ prompt: 'How do you pitch the story properly?', options: [
                { text: 'Pitch it as the Nayi Kahani sensibility in action: written in 1955, in a newly independent nation redefining its voice, the story rejects romantic idealism for middle-class realism — a writer afraid to dip his pen, the tiny ink bottle as symbol of fragile creation. The retrospective adult narration adds reflection and dramatic irony; the meandering, episode-based structure is the movement\'s rejection of plot-driven storytelling.', outcome: 'The feature now explains why a 1955 story about fearing a blank page matters differently — context turns autobiography into a movement\'s manifesto.' },
                { text: 'Run it as autobiography — the author\'s own struggle told straight, no movement talk needed.', outcome: 'Dropping the Nayi Kahani frame misreads the structure: the episodic drift and reflective hindsight are deliberate craft, not diary habits.', reveals: 'story-is-plain-autobiography' },
                { text: 'Extract a moral instead — \'every writer should just start writing\' — for an inspirational box item.', outcome: 'The story isn\'t a productivity lesson; it\'s about the doubt and precarity of becoming a writer when the nation itself is finding its voice.', reveals: 'story-is-motivation-piece' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'The botched performance isn\'t failure — it\'s proof that art gets made by people who risk wasting their only ink.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के तत्वों — कथानक.',
          hint: 'यदि फँसें, तो **c11_hin_ar_cbse_03_008 (बिंब और रूपक)** और **c11_hin_ar_cbse_03_009.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन = पाठ में कमियाँ निकालना (fault-finding) या अपनी निजी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के तत्वों',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के तत्वों', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the foundational', 'कथानक (Plot) कृति में घटित घटनाओं का कारण-परिणाम (Cause-Effect) पर आधारित तार्किक क्रम', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में वर्णित वह समग्र स्पेशियो-टेम्पोरल,'],
                  hint: 'यदि फँसें, तो **c11_hin_ar_cbse_03_008 (बिंब और रूपक)** और **c11_hin_ar_cbse_03_009 (विरोधाभास और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन = पाठ में कमियाँ निकालना (fault-finding) या अपनी निजी पसंद/नापसंद लिखना।" **गलत.' }
          ],
            remediations: { 'fault-finding': { steps: ['**चरण 1:** छात्र से कहें: "एक वाक्य में बताओ कि लेखक ने *यह विशेष शब्द/बिंब/प्रसंग* क्यों चुना होगा?" — इससे फोकस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है — निर्धारित पाठ (गद्य/पद्य) के **अंतर्वस्तु.',
          hint: 'यदि फँसे हों तो **नोड 013 (आलोचनात्मक चिंतन)** पर लौटें — वहाँ सीखी **विश्लेषण/मूल्यांकन.',
          misconception: '**विशिष्ट भ्रांति**: विद्यार्थी समझते हैं कि **पाठ-आधारित लेखन = पाठ का भावार्थ/सारांश लिखना**। वे **प्रश्न के संचालक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the foundational', 'कथानक (Plot) कृति में घटित घटनाओं का कारण-परिणाम (Cause-Effect) पर आधारित तार्किक क्रम', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में वर्णित वह समग्र स्पेशियो-टेम्पोरल,'],
                  hint: 'यदि फँसे हों तो **नोड 013 (आलोचनात्मक चिंतन)** पर लौटें — वहाँ सीखी **विश्लेषण/मूल्यांकन की.',
                  misconception: '**विशिष्ट भ्रांति**: विद्यार्थी समझते हैं कि **पाठ-आधारित लेखन = पाठ का भावार्थ/सारांश लिखना**। वे **प्रश्न के संचालक शब्द.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (चरणबद्ध)**: 1.', '**प्रश्न-विघटन अभ्यास**: 10 प्रश्नों के **संचालक शब्द** रेखांकित करवाएँ और प्रत्येक के लिए **अपेक्षित संज्ञानात्मक.', '**PEEL टेम्पलेट भरवाएँ**: एक ही पाठांश पर **Point, Evidence, Explanation, Link** के चार खाने अलग-अलग रंग से भरवाएँ.', '**साक्ष्य-छँटाई खेल**: पाठ से 10 वाक्य दें — विद्यार्थी **केवल 3 सबसे प्रासंगिक** चुनकर **कारण लिखे** प्रत्येक चयन का।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_015', difficulty: 'standard',
          question: '**वाचन-श्रवण: चर्चा-बिंदु** एक सुनियोजित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_03_013 (आलोचनात्मक चिंतन)** की **\'साक्ष्य-आधारित व्याख्या\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ पाठ पर \'अपनी राय देना\' या \'कहानी सुनाना\' है** — वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वाचन-श्रवण: चर्चा-बिंदु** एक सुनियोजित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी पाठ का',
                  options: ['**वाचन-श्रवण: चर्चा-बिंदु** एक सुनियोजित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी पाठ का', '"पृष्ठभूमि और रचनाकार परिचय" (Background and Author Introduction) is the foundational', 'कथानक (Plot) कृति में घटित घटनाओं का कारण-परिणाम (Cause-Effect) पर आधारित तार्किक क्रम', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में वर्णित वह समग्र स्पेशियो-टेम्पोरल,'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_03_013 (आलोचनात्मक चिंतन)** की **\'साक्ष्य-आधारित व्याख्या\' और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ पाठ पर \'अपनी राय देना\' या \'कहानी सुनाना\' है** — वे **\'विश्लेषण\'.' }
          ],
            remediations: { 'analysis-reaction-character-arc': { steps: ['**लक्षित उपचार (4 चरण):** 1.', '**मॉडलिंग:** शिक्षक पाठ 3 के **एक चर्चा-बिंदु पर \'कमजोर उत्तर\' और \'बलवान उत्तर\'** साथ रखकर दिखाएँ — अंतर **PEEL संरचना.', '**साक्ष्य-खोज अभ्यास:** छात्रों को **5 मिनट में पाठ से 3 साक्ष्य ढूँढ़ने** को कहें जो एक दिए गए थीसिस (जैसे: \'पात्र.', '**PEEL ड्रिल:** प्रत्येक साक्ष्य के लिए **Explanation और Link चरण मौखिक रूप से बोलने** को कहें — शिक्षक **\'कैसे?\' और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
