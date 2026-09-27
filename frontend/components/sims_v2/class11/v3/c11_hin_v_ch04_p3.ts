import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch04_p3: SimDef = {
    id: 'v3_c11_hin_v_ch04_p3',
    title: 'पाठ 4 · Part 3/3',
    subtitle: 'Test the claim that the most local art travels the farthest.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 4 · Part 3/3',
    chapters: ['c11_hin_v_ch04'],
    nodeIds: ['c11_hin_v_cbse_04_013', 'c11_hin_v_cbse_04_014', 'c11_hin_v_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader mapping Indian art\'s hidden continuum', intro: 'Mandana on a mud wall in a village, Kathak in a Jaipur auditorium — the essay asks what these share, not what divides them.', goal: 'Analyse the folk-classical continuum and the essay\'s classification-driven structure.' },
    discovery: {
        question: '\'The more local an art is in its expression, the more universal it becomes\' — can that paradox actually hold?',
        options: ['Yes — Warli\'s rice-paste spirals use only circle, triangle and square: the most local cosmology drawn in the most universal shapes', 'No — local art stays local by definition', 'Yes — but only after foreigners validate it', 'No — universality requires abandoning the local'],
        answer: 'Yes — Warli\'s rice-paste spirals use only circle, triangle and square: the most local cosmology drawn in the most universal shapes',
        hook: 'Folk and classical aren\'t two boxes — Kathak grew out of kathavachaks and temple dances sank back into villages; the continuum never stops trading.',
    },
    teaching: [
        { title: 'पाठ 4 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के **तथ्यों, तर्कों, भाषा-प्रयोगों, संरचनात्मक युक्तियों और अंतर्निहित मान्यताओं** को प्रश्नांकित करके, उनकी परस्पर.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace how the essay runs every art form through the same folk→classical→living-continuity arc, and judge what that repeated pattern proves.',
        labels: ['पाठ 4 — आलोचनात्मक', 'पाठ 4 — लेखन', 'पाठ 4 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_v_cbse_04_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 3/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह दक्षता है जिसमें छात्र किसी दिए गए.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी विषय पर बोलने और सुनने के माध्यम से विचार साझा.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school exhibition on \'Indian Arts\', a student sorts every item into two rigid boxes — \'folk/tribal\' (Mandana, Warli, Madhubani) and \'classical\' (Kathak, Mughal miniatures) — insisting the categories never mix, \'like traditional vs modern.\'',
            decisions: [{ prompt: 'What does the chapter say about that border?', options: [
                { text: 'Show the continuum: the chapter argues folk and classical are endpoints in constant संवाद — folk forms get codified into classical (Kathak rising from the kathavachak tradition), classical forms dissolve back into folk (temple dance becoming village ritual), and both root in the Natya Shastra. Crucially, Indian arts were never museum objects — they lived inside births, harvests and worship.', outcome: 'The exhibition gets a third section — \'the dialogue\': Kathak\'s folk origins, Madhubani\'s codification — proving the categories are porous by design.' },
                { text: 'Keep the two boxes — separate categories make the exhibition clearer for visitors.', outcome: 'Clarity here falsifies: the text\'s central claim is fluidity, and a rigid folk/classical wall hides exactly the unity-in-diversity the chapter demonstrates.', reveals: 'folk-classical-are-fixed-boxes' },
                { text: 'Treat the art list as the structure — painting, then music, then dance is just a table of contents.', outcome: 'The sequence is argumentative: each art form follows the same folk→classical→modern trajectory to prove the thesis that arts are rooted in life.', reveals: 'structure-is-topic-list' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'Bhimbetka\'s cave lines, a Rajasthani wall at Diwali, a Tanjore court repertoire — one argument repeated until it becomes evidence.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें.',
          hint: 'यदि फँसें तो **नोड 008, 009 (साहित्यिक युक्तियाँ)** और **नोड 012 (बोध-प्रश्न)** दोहराएँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "आलोचनात्मक व्याख्या" का अर्थ है **पाठ में कमियाँ निकालना** (fault-finding) या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त, रचनाकाल', '**कथानक (Plot)** घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित वह क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी साहित्यिक कृति में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फँसें तो **नोड 008, 009 (साहित्यिक युक्तियाँ)** और **नोड 012 (बोध-प्रश्न)** दोहराएँ — विशेष रूप.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "आलोचनात्मक व्याख्या" का अर्थ है **पाठ में कमियाँ निकालना** (fault-finding) या **लेखक से असहमत.' }
          ],
            remediations: { 'fault-finding': { steps: ['**शब्द-भेद स्पष्ट करें:** "आलोचना" (criticism: निंदा) बनाम "आलोचनात्मक चिंतन" (critical thinking: विवेचनात्मक विश्लेषण).', '**मॉडलिंग दें:** पाठ 4 के एक छोटे अंश (4-5 पंक्तियाँ) लें; **गलत व्याख्या** (निंदा/व्यक्तिगत राय) और **सही व्याख्या**.', '**अभ्यास कराएँ:** उसी अंश पर छात्र से **केवल एक बिंदु** (जैसे: एक बिंब का कार्यात्मक प्रभाव) PEEL में लिखवाएँ; तत्काल.', 'Link विषय से जुड़ा क्या?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह दक्षता है जिसमें छात्र किसी.',
          hint: 'यदि अटके: **c11_hin_v_cbse_04_013 (आलोचनात्मक चिंतन)** पर वापस जाएँ — वहाँ से.',
          misconception: '**सबसे गहरी भ्रांति:** छात्र मानते हैं कि **"पाठ से लंबे-लंबे उद्धरण (Long Quotes) चिपका देने से उत्तर अच्छा बन जाता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह दक्षता है जिसमें छात्र किसी दिए गए',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) वह दक्षता है जिसमें छात्र किसी दिए गए', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त, रचनाकाल', '**कथानक (Plot)** घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित वह क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी साहित्यिक कृति में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि अटके: **c11_hin_v_cbse_04_013 (आलोचनात्मक चिंतन)** पर वापस जाएँ — वहाँ से \'साक्ष्य-आधारित तर्क\'.',
                  misconception: '**सबसे गहरी भ्रांति:** छात्र मानते हैं कि **"पाठ से लंबे-लंबे उद्धरण (Long Quotes) चिपका देने से उत्तर अच्छा बन जाता है।"** वास्तविकता.' }
          ],
            remediations: { 'long-quotes-evidence': { steps: ['**माइक्रो-ड्रिल (Micro-drill):** छात्र को एक पैराग्राफ दें और कहें: *"इससे केवल **एक वाक्य/वाक्यांश** चुनो जो दावे को.', '**रिवर्स इंजीनियरिंग (Reverse Engineering):** एक सशक्त PEEL उत्तर दें, उससे **Evidence वाक्य हटाकर** छात्र से पूछें.', 'पाठ से ढूँढ़ो।"* इससे चयन कौशल बनेगा। 3.', '**व्याख्या विस्तार (Explanation Expansion):** छात्र के कमज़ोर उत्तर का Explanation भाग लें, उस पर प्रश्न पूछें: *"यहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी विषय पर बोलने और सुनने के माध्यम से.',
          hint: 'यदि फंसें तो पाठ-आधारित लेखन (c11_hin_v_cbse_04_014) में दिए गए PEEL संरचना (बिंदु.',
          misconception: 'छात्र अक्सर मानते हैं कि वाचन-श्रवण में \'वाचन\' बोलने की fluency और शब्दों की संख्या पर निर्भर करता है, और \'श्रवण\' सिर्फ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी विषय पर बोलने और सुनने के माध्यम से विचार साझा',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी विषय पर बोलने और सुनने के माध्यम से विचार साझा', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें रचनाकार के जीवन-वृत्त, रचनाकाल', '**कथानक (Plot)** घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) पर आधारित वह क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी साहित्यिक कृति में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फंसें तो पाठ-आधारित लेखन (c11_hin_v_cbse_04_014) में दिए गए PEEL संरचना (बिंदु, प्रमाण.',
                  misconception: 'छात्र अक्सर मानते हैं कि वाचन-श्रवण में \'वाचन\' बोलने की fluency और शब्दों की संख्या पर निर्भर करता है, और \'श्रवण\' सिर्फ चुप रहना है। इस.' }
          ],
            remediations: { 'fluency': { steps: ['छात्र को बताइए कि प्रभावी चर्चा एक पक्की सड़क बनाने जैसी है: बोलनाmaterial जोड़ना है (जैसे ईंट रखना), और सुनना आधार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
