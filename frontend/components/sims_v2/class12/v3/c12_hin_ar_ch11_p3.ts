import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch11_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch11_p3',
    title: 'बाज़ार दर्शन · Part 3/3',
    subtitle: 'The blind man saw the truth; the sighted chose the well',
    classLevel: 12, subject: 'hin_ar', topic: 'बाज़ार दर्शन · Part 3/3',
    chapters: ['c12_hin_ar_ch11'],
    nodeIds: ['c12_hin_ar_cbse_11_013', 'c12_hin_ar_cbse_11_014', 'c12_hin_ar_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Psychoanalytic fiction reader', intro: 'A beggar who cannot see meets a society that refuses to. The story asks whose blindness is real.', goal: 'Read Bazar Darshan through psychoanalytic realism — blindness as epistemological and political condition.' },
    discovery: {
        question: 'A blind beggar is cheated because he can\'t see — but the story insists the real blindness belongs to everyone else. Blindness as what, then?',
        options: ['Wilful ignorance — the \'familiar well\' of habit and prejudice; society sees numbers and utility, never faces', 'Poor eyesight only', 'Fate\'s cruelty', 'A medical condition'],
        answer: 'Wilful ignorance — the \'familiar well\' of habit and prejudice; society sees numbers and utility, never faces',
        hook: 'This is the psychoanalytic turn in Hindi fiction — after Premchand\'s social realism came Jainendra\'s probe of the unconscious, where blindness is imposed by power and kept by utilitarian logic. The beggar isn\'t a pitiable character; he\'s the site where ideology does its violence.',
    },
    teaching: [
        { title: 'बाज़ार दर्शन — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक ऐसी विश्लेषणात्मक प्रक्रिया है जिसमें पाठ के घटकों (कथानक, पात्र, भाषा, शिल्प) को अलग-अलग करके उनके पारस्परिक संबंध, लेखकीय उद्देश्य, और पाठक पर पड़ने वाले.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_11_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Look past the beggar\'s eyes: decode the \'familiar well\' that traps the sighted, test utilitarian arguments against lived faces, and separate spiritual darkness from manufactured blindness.',
        labels: ['बाज़ार दर्शन — आलोचनात्मक', 'बाज़ार दर्शन — लेखन', 'बाज़ार दर्शन — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate pays a \'career guru\' who diagnoses his low marks as a family curse and prescribes an absurd regime — copying his ancestors\' names 500 times. He complied for a month, then quietly stopped going. He\'s still failing.',
            decisions: [{ prompt: 'What does Nirala\'s \'खुजली उखाड़ जासा\' read in this episode?', options: [
                { text: 'The story ends where it began — the patient flees still itching; walking away from a bogus authority returns you to the problem untouched. The satire is that individual escape doesn\'t cure a systemic absurdity — question the prescription, don\'t just flee the clinic.', outcome: 'The circular structure — opening and closing on the itch — exists to show the quest was futile; his problem survives the guru because it was never the itch being treated.' },
                { text: 'At least he escaped before worse harm — quietly quitting was the smart move.', outcome: 'Escape isn\'t the story\'s victory — the patient who runs is still scratching on the last page; leaving the fraud unexamined leaves both the itch and the marketplace of absurd cures intact.', reveals: 'escape-equals-solution' },
                { text: 'The guru\'s method was sound in principle — he just needed to persist longer for results.', outcome: 'That\'s the blind faith in authority the story skewers: the diagnosis was theatrical nonsense from the start, and more obedience only deepens the farce.', reveals: 'persist-with-absurdity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'You can now read blindness as a social instrument — and catch the moment a story stops being about a beggar and starts being about us.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक ऐसी विश्लेषणात्मक प्रक्रिया है जिसमें.',
          hint: 'यदि PEEL का **Explanation** चरण अटकता है (साक्ष्य मिल गया पर यह न बता पाएँ कि यह बिंदु.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आलोचनात्मक चिंतन" = "पाठ में कमियाँ निकालना" (fault-finding)। **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक ऐसी विश्लेषणात्मक प्रक्रिया है जिसमें पाठ के',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक ऐसी विश्लेषणात्मक प्रक्रिया है जिसमें पाठ के', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,'],
                  hint: 'यदि PEEL का **Explanation** चरण अटकता है (साक्ष्य मिल गया पर यह न बता पाएँ कि यह बिंदु कैसे सिद्ध.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आलोचनात्मक चिंतन" = "पाठ में कमियाँ निकालना" (fault-finding)। **वास्तविकता:** आलोचनात्मक चिंतन.' }
          ],
            remediations: { 'fault-finding': { steps: ['**पहला कदम:** छात्र से कहें — "पाठ का कोई **एक वाक्य** चुनो जो तुम्हें **महत्वपूर्ण** लगे। अब बताओ: **लेखक ने ठीक यहीं.', 'अगर हटा दें तो क्या बदलेगा?**" — यह **लेखकीय चयन (authorial choice)** पर ध्यान ले जाता है। 2.', '**दूसरा कदम:** उसी वाक्य पर **PEEL** लिखने को कहें — पहले मौखिक, फिर लिखित। शिक्षक साथ बैठकर **Explanation** और.', 'और यह पाठ के **बड़े संदेश** से कैसे जुड़ता है?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित का अर्थ है — \'बाज़ार दर्शन\' पाठ के कथ्य, पात्र, विषय.',
          hint: 'यदि PEEL संरचना में फँसें, तो c11_hin_ar_cbse_11_014 (कक्षा 11 का लेखन कौशल) के कार्य.',
          misconception: 'छात्र समझते हैं कि \'पाठ-आधारित लेखन\' का अर्थ है पाठ का भावानुवाद या सारांश लिख देना। वे PEEL के \'E\' और \'E\' (Evidence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित का अर्थ है',
                  options: ['लेखन कौशल: पाठ-आधारित का अर्थ है', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,'],
                  hint: 'यदि PEEL संरचना में फँसें, तो c11_hin_ar_cbse_11_014 (कक्षा 11 का लेखन कौशल) के कार्य उदाहरणों को.',
                  misconception: 'छात्र समझते हैं कि \'पाठ-आधारित लेखन\' का अर्थ है पाठ का भावानुवाद या सारांश लिख देना। वे PEEL के \'E\' और \'E\' (Evidence, Explanation) को.' }
          ],
            remediations: { 'peel-e-e-evidence': { steps: ['चरण 1: c12_hin_ar_cbse_11_012 (बोध-प्रश्न) के वस्तुनिष्ठ प्रश्नों को हल करें — वे साक्ष्य-चयन का अभ्यास कराते हैं। चरण.', 'क्या व्याख्या बिंदु से आगे जाती है?', 'चरण 3: किसी सहपाठी या शिक्षक से केवल \'E\' और \'E\' चरणों पर फीडबैक लें। चरण 4: दोबारा लिखें। यह चक्र तब तक दोहराएँ जब तक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक गतिविधि है जिसमें विद्यार्थी किसी.',
          hint: 'यदि फंसे हों, तो पहले नोड c12_hin_ar_cbse_11_006 (मुख्य विषय) और c12_hin_ar_cbse_11_013.',
          misconception: 'छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है पाठ पर अपनी \'राय\' (opinion) देना — जैसे "मुझे नायक पसंद नहीं आया" या "कहानी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक गतिविधि है जिसमें विद्यार्थी किसी साहित्यिक पाठ',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक संरचित शैक्षिक गतिविधि है जिसमें विद्यार्थी किसी साहित्यिक पाठ', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,'],
                  hint: 'यदि फंसे हों, तो पहले नोड c12_hin_ar_cbse_11_006 (मुख्य विषय) और c12_hin_ar_cbse_11_013 (आलोचनात्मक.',
                  misconception: 'छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है पाठ पर अपनी \'राय\' (opinion) देना — जैसे "मुझे नायक पसंद नहीं आया" या "कहानी दुखद है"। वे नहीं.' }
          ],
            remediations: { 'opinion-analytical-question-tensions': { steps: ['चरण 1: छात्र से कहें: "अपनी राय एक तरफ रखो। पाठ खोलो और वह वाक्य/संवाद ढूंढो जिसने तुम्हें यह राय दी। उसे पेंसिल से.', 'मनुष्यता से?" चरण 3: अब कहें: "इस विषय पर एक ऐसा प्रश्न बनाओ जिसका उत्तर \'हां/नहीं\' में न दिया जा सके, बल्कि जिसके लिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
