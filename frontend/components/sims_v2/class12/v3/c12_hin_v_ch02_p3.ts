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
        { title: 'जूझ — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'वितान भाग-2 — पाठ 2\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow a goat-herd into a classroom: weigh a mother\'s economic logic, decode what separates the ready student from the late one, and ask what made one teacher\'s verse unforgettable.',
        labels: ['जूझ — आलोचनात्मक चिंतन', 'जूझ — लेखन कौशल', 'जूझ — वाचन-श्रवण: चर्चा-बिंदु'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_02_015', title: 'जूझ — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'वितान भाग-2 — पाठ 2\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' in the CBSE Class 12 Hindi Speaking and Listening assessment for a prose chapter like.', options: [
                { text: 'The primary purpose is to evaluate the student\'s ability to orally analyze literary', outcome: 'The primary purpose is to evaluate the student\'s ability to orally analyze literary elements.' },
                { text: 'to check if the student read the story', outcome: 'Not quite — Students believe "Speaking and Listening" means *memorizing a speech* on the chapter.', reveals: 'speaking-and-listening-means-memorizing' },
                { text: 'Speaking and Listening', outcome: 'Not quite — Students believe "Speaking and Listening" means *memorizing a speech* on the chapter.', reveals: 'speaking-and-listening-means-memorizing' }
            ] }] } },
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
          question: '\'वितान भाग-2 — पाठ 2\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि फँसे हों, तो **c12_hin_v_cbse_02_008 (बिंब/रूपक)** और **c12_hin_v_cbse_02_009.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक विश्लेषण" = "पाठ की कमियाँ निकालना" या "अपनी निजी राय देना" (जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 2\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'वितान भाग-2 — पाठ 2\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 2\' का कथानक — \'वितान भाग-2 — पाठ 2\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसे हों, तो **c12_hin_v_cbse_02_008 (बिंब/रूपक)** और **c12_hin_v_cbse_02_009.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक विश्लेषण" = "पाठ की कमियाँ निकालना" या "अपनी निजी राय देना" (जैसे "मुझे अंत पसंद नहीं.' }
          ],
            remediations: { 'internal-logic': { steps: ['**चरण 1:** छात्र से कहें: "पाठ का कोई **एक वाक्य** चुनो जो तुम्हें \'महत्वपूर्ण\' लगा। अब बताओ: **लेखक ने यह वाक्य *यहाँ*.', 'अगर यह वाक्य हटा दें तो क्या खो जाएगा?" — यह **कथात्मक कार्य (narrative function)** सिखाता है। **चरण 2:** उन्हें **PEEL.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_014', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, revisit **c12_hin_v_cbse_02_013 (Critical Thinking)** — specifically the.',
          misconception: '**विशिष्ट भ्रांति:** "लेखन कौशल (Writing Skills) का अर्थ है पाठ का सारांश (summary) लिखना या पात्रों का वर्णन करना।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 2\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
                  options: ['\'वितान भाग-2 — पाठ 2\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 2\' का कथानक — \'वितान भाग-2 — पाठ 2\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, revisit **c12_hin_v_cbse_02_013 (Critical Thinking)** — specifically the.',
                  misconception: '**विशिष्ट भ्रांति:** "लेखन कौशल (Writing Skills) का अर्थ है पाठ का सारांश (summary) लिखना या पात्रों का वर्णन करना।" **क्यों गलत है:** CBSE.' }
          ],
            remediations: { 'writing-skills-summary-cbse-cuet': { steps: ['**चरण 1:** छात्र से कहें: "एक बोर्ड-शैली प्रश्न चुनो (उदाहरण: \'माँ के चरित्र का चित्रण कीजिए\') और 5 मिनट में **बिना.', '- ☐ Evidence: क्या पाठ से 2 सटीक संदर्भ/उद्धरण हैं?', '- ☐ Explanation: क्या प्रत्येक साक्ष्य का *अर्थ* समझाया गया है?', '- ☐ Link: क्या अंतिम वाक्य थीम/प्रश्न से जुड़ता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_015', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, return to c12_hin_v_cbse_02_013 and complete the "Critical Thinking: Analysis.',
          misconception: 'Students believe "Speaking and Listening" means *memorizing a speech* on the chapter.',
          parts: [
                { id: 'a', prompt: 'Analyze how the narrator\'s shifting address for Nanak Singh — from "nknk" (childhood) to "lkSanyxsdj ekLVj" (adulthood) — reflects the chapter\'s theme.', answer: 'The shift from the intimate, diminutive "nknk" (implying परिचितity and childish',
                  options: ['The shift from the intimate, diminutive "nknk" (implying परिचितity and childish', 'just respect', 'ckyqxM+h dh yky ekVh', 'Speaking and Listening'],
                  hint: 'If stuck, return to c12_hin_v_cbse_02_013 and complete the "Critical Thinking: Analysis and.',
                  misconception: 'Students believe "Speaking and Listening" means *memorizing a speech* on the chapter.' }
          ],
            remediations: { 'speaking-and-listening-means-memorizing': { steps: ['If a student freezes or recites a script: 1.', '**Interrupt gently:** "Ruko.', 'Ab mujhe batao: Nanak Singh ne tumhe sabse zyada kya diya — kavita ya aatmvishwas?" (Force spontaneous answer).', '**Model the framework:** Demonstrate Stance-Evidence-Counter-Synthesis for that exact question in 60 seconds.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Speaking and Listening" means *memorizing a speech* on the chapter.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The chapter ultimately validates the mother\'s coercion because the narrator becomes a poet." Defend or refute using at least two textual.', answer: 'Refute',
                  options: ['Refute', 'yes, because he succeeded', 'viuk [ksr gh vPNk gS', 'Speaking and Listening'],
                  hint: 'If stuck, return to c12_hin_v_cbse_02_013 and complete the "Critical Thinking: Analysis and.',
                  misconception: 'Students believe "Speaking and Listening" means *memorizing a speech* on the chapter.' }
          ],
            remediations: { 'speaking-and-listening-means-memorizing': { steps: ['If a student freezes or recites a script: 1.', '**Interrupt gently:** "Ruko.', 'Ab mujhe batao: Nanak Singh ne tumhe sabse zyada kya diya — kavita ya aatmvishwas?" (Force spontaneous answer).', '**Model the framework:** Demonstrate Stance-Evidence-Counter-Synthesis for that exact question in 60 seconds.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
