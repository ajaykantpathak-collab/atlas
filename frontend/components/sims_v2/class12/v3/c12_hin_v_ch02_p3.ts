import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch02_p3: SimDef = {
    id: 'v3_c12_hin_v_ch02_p3',
    title: 'जूझ · Part 3/3',
    subtitle: 'She stitched quilts on credit — so the goats could be someone else\'s',
    classLevel: 12, subject: 'hin_v', topic: 'जूझ · Part 3/3',
    chapters: ['c12_hin_v_ch02'],
    nodeIds: ['c12_hin_v_cbse_02_013', 'c12_hin_v_cbse_02_014', 'c12_hin_v_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Memoir reader', intro: 'A memoir of a boy who reached school late, ashamed — and the mother who calculated that it was worth it.', goal: 'Read the autobiographical sketch through education-as-liberation and the hidden machinery of class readiness.' },
    discovery: {
        question: 'A boy tends goats while other children walk to school — but his mother stitches quilts on credit for officials just to pay his fees. Why does she insist?',
        options: ['Education is the only asset that can\'t be seized — unlike land or livestock, it breaks the cycle of patron-client labour forever', 'Mother\'s love needs no reason', 'Schools were free then', 'To please the teacher'],
        answer: 'Education is the only asset that can\'t be seized — unlike land or livestock, it breaks the cycle of patron-client labour forever',
        hook: 'Read it as calculation, not just sentiment — and notice what the classroom reveals: the fluent classmate\'s ease is cultural capital, not talent. Even the teacher\'s method is real pedagogy — rhythm, repetition and emotion make poems survive decades in a student\'s memory.',
    },
    teaching: [
        { title: 'जूझ — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) in literary analysis is the disciplined process of actively examining a text\'s structural choices, linguistic devices, and thematic architecture to evaluate *how*.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow a goat-herd into a classroom: weigh a mother\'s economic logic, decode what separates the ready student from the late one, and ask what made one teacher\'s verse unforgettable.',
        labels: ['जूझ — आलोचनात्मक चिंतन', 'जूझ — लेखन कौशल', 'जूझ — वाचन-श्रवण: चर्चा-बिंदु'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Profiling a self-made poet for the alumni magazine, you compress his schooling into one line — \'attended village school\' — and spend the word count on his awards. Your subject objects: \'the whole story is in the teacher who stayed after class.\'',
            decisions: [{ prompt: 'What does the pacing of \'पाठशाला जाने के लिए मन तड़पता था\' confirm?', options: [
                { text: 'He\'s right — the memoir stretches thin on years of schooling and lingers on the teacher\'s poetry sessions because the structure enacts the theme: education-as-awakening gets the slow scenes, education-as-certification gets the summary.', outcome: 'The chapter\'s pacing rule: narrative time follows meaning, not duration — the moments that made him get the slow telling, so the profile should spend its lines where the formation happened.' },
                { text: 'Keep the awards-led structure — readers want the outcome, and the schooling is background.', outcome: 'The memoir\'s frame exists to show the outcome without the process is a résumé, not a story — the reader knows he became a poet; what the retrospective adds is how it felt to become one.', reveals: 'outcome-over-process' },
                { text: 'Balance it evenly — give every year of schooling equal lines so the profile is complete.', outcome: 'Equal coverage is the chronological fallacy the chapter corrects — a formative hour can outweigh a routine year; completeness measured by calendar is flatness measured by meaning.', reveals: 'even-pacing-is-fair' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a school memoir as a class document — where literacy is the one inheritance poverty cannot confiscate.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) in literary analysis is the disciplined.',
          hint: 'यदि फँसे हों, तो **c12_hin_v_cbse_02_008 (बिंब/रूपक)** और **c12_hin_v_cbse_02_009.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक विश्लेषण" = "पाठ की कमियाँ निकालना" या "अपनी निजी राय देना" (जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) in literary analysis is the disciplined process of',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) in literary analysis is the disciplined process of', '"पृष्ठभूमि और रचनाकार परिचय" किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', '\'जूझ\' का कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कथा में चित्रित वह समग्र भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फँसे हों, तो **c12_hin_v_cbse_02_008 (बिंब/रूपक)** और **c12_hin_v_cbse_02_009.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक विश्लेषण" = "पाठ की कमियाँ निकालना" या "अपनी निजी राय देना" (जैसे "मुझे अंत पसंद नहीं.' }
          ],
            remediations: { 'internal-logic': { steps: ['**चरण 1:** छात्र से कहें: "पाठ का कोई **एक वाक्य** चुनो जो तुम्हें \'महत्वपूर्ण\' लगा। अब बताओ: **लेखक ने यह वाक्य *यहाँ*.', 'अगर यह वाक्य हटा दें तो क्या खो जाएगा?" — यह **कथात्मक कार्य (narrative function)** सिखाता है। **चरण 2:** उन्हें **PEEL.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है: दिए गए पाठ (यहाँ \'जूझ\') के विशिष्ट अंशों.',
          hint: 'यदि फंसें तो: c12_hin_v_cbse_02_004 (पात्र-चित्रण) और c12_hin_v_cbse_02_006 (मुख्य विषय).',
          misconception: 'छात्र मानते हैं कि \'पाठ-आधारित लेखन\' का अर्थ है पाठ का सारांश लिखना या पात्र की जीवनी दोहराना। वे \'विश्लेषण\' और \'वर्णन\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है: दिए गए पाठ (यहाँ \'जूझ\') के विशिष्ट अंशों, संवादों,',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है: दिए गए पाठ (यहाँ \'जूझ\') के विशिष्ट अंशों, संवादों,', '"पृष्ठभूमि और रचनाकार परिचय" किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', '\'जूझ\' का कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कथा में चित्रित वह समग्र भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फंसें तो: c12_hin_v_cbse_02_004 (पात्र-चित्रण) और c12_hin_v_cbse_02_006 (मुख्य विषय) दोबारा.',
                  misconception: 'छात्र मानते हैं कि \'पाठ-आधारित लेखन\' का अर्थ है पाठ का सारांश लिखना या पात्र की जीवनी दोहराना। वे \'विश्लेषण\' और \'वर्णन\' का अंतर नहीं समझते।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को PEEL संरचना का एक खाका (template) दें: "बिंदु: ______, प्रमाण: \'पाठ से सटीक पंक्ति\', व्याख्या: \'यह प्रमाण.', '\'जूझ\' के 5 प्रमुख प्रसंग चुनें (जैसे: गाँव में रहना, शब्दकोश निर्माण, हिंदी आंदोलन, ग्रामीणों से सीखना, अंतिम दिन) और.', 'छात्र से कहें: "पहले केवल प्रमाण ढूंढो, फिर लिखो।" 4.', 'पुनः निदान: वही प्रश्न दें, देखें कि क्या अब प्रमाण + व्याख्या + जुड़ाव है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) are open-ended, text-anchored prompts designed.',
          hint: 'यदि छात्र चर्चा में मौन रह जाएँ या केवल व्यक्तिगत राय दें — तुरंत **c12_hin_v_cbse_02_013.',
          misconception: '**सबसे घातक भ्रम:** छात्र (और कई शिक्षक) मानते हैं कि चर्चा-बिंदु का उद्देश्य **\'सही उत्तर\' तक पहुँचना** है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु (Discussion Points) are open-ended, text-anchored prompts designed to',
                  options: ['चर्चा-बिंदु (Discussion Points) are open-ended, text-anchored prompts designed to', '"पृष्ठभूमि और रचनाकार परिचय" किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', '\'जूझ\' का कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कथा में चित्रित वह समग्र भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि छात्र चर्चा में मौन रह जाएँ या केवल व्यक्तिगत राय दें — तुरंत **c12_hin_v_cbse_02_013.',
                  misconception: '**सबसे घातक भ्रम:** छात्र (और कई शिक्षक) मानते हैं कि चर्चा-बिंदु का उद्देश्य **\'सही उत्तर\' तक पहुँचना** है। **वास्तविकता:** चर्चा-बिंदु का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (निदान):** छात्र से कहें: *"तुम्हारे अनुसार इस चर्चा-बिंदु का \'सही उत्तर\' क्या है?"* — यदि वे एक वाक्य में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
