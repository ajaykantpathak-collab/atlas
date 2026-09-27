import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch14_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch14_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch14_p3',
    title: 'शरिीष के फूल · Part 3/3',
    subtitle: 'The flag was born in a struggle — then the nation stopped looking',
    classLevel: 12, subject: 'hin_ar', topic: 'शरिीष के फूल · Part 3/3',
    chapters: ['c12_hin_ar_ch14'],
    nodeIds: ['c12_hin_ar_cbse_14_013', 'c12_hin_ar_cbse_14_014', 'c12_hin_ar_cbse_14_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Political-essay reader', intro: 'A scholar-activist watches the tricolor fade on a government school roof and reads a whole nation\'s fatigue in it.', goal: 'Read Jhande ki Phool/flag essay as a diagnosis of national morality — symbol versus substance.' },
    discovery: {
        question: 'A poet paints the tricolor with reverence — years later it\'s a torn rag on a rusted pole, used for mundane purposes. Why does the author call the flag a \'living being\'?',
        options: ['Because it has a life-cycle — born in the freedom struggle, aged by neglect; its physical condition is the nation\'s moral condition', 'Flags wear out naturally', 'Poetic exaggeration', 'It moves in wind'],
        answer: 'Because it has a life-cycle — born in the freedom struggle, aged by neglect; its physical condition is the nation\'s moral condition',
        hook: 'The state guards the flag\'s display rules; the author asks whether it still embodies justice — ritualistic patriotism versus ethical substance. For him no science, politics or religion outranks humanity; the flag is a moral contract, not a protocol object.',
    },
    teaching: [
        { title: 'शरिीष के फूल — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक बौद्धिक प्रक्रिया है जिसमें पाठ की सतही जानकारी से आगे जाकर उसके अंतर्निहित अर्थ, संरचनात्मक चुनाव, लेखकीय उद्देश्य, पूर्वाग्रहों और सामाजिक-सांस्कृतिक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_14_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the flag as the nation\'s pulse: trace its arc from tryst-with-destiny to faded neglect, weigh reverence against ritual, and ask what a torn tricolor diagnoses.',
        labels: ['शरिीष के फूल —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college\'s broken hostel bench gets a fresh coat of paint for inspection day — splinters and all — and the warden declares the issue \'resolved.\' The repair request you filed months ago is still \'under process.\'',
            decisions: [{ prompt: 'What does \'फखरुद्दीन की खाट\' see in the painted bench?', options: [
                { text: 'The cot painted by the bureaucrat — surface performance standing in for repair; the story\'s unresolved ending, where the cot never reaches the museum, performs the same deferral your \'under process\' request is trapped in.', outcome: 'The chapter reads the paint as the critique: cosmetic attention is how the system answers demand without meeting it — the structure denies resolution because the institution does.' },
                { text: 'Accept it — at least something visible was done; half a fix beats none.', outcome: 'The story\'s whole satire depends on refusing that bargain: paint over rot is precisely the bureaucrat\'s move — it photographs as action while the object stays broken underneath.', reveals: 'cosmetic-counts-as-fix' },
                { text: 'Treat it as proof the system works — the request clearly reached someone who acted.', outcome: 'Action timed to inspection isn\'t the request being processed; the story distinguishes performance-for-audience from accountability — the file stays open because the gesture closed the matter.', reveals: 'inspection-response-equals-resolution' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a national symbol as a moral diagnostic — and tell display-patriotism from the justice the cloth was meant to carry.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक बौद्धिक प्रक्रिया है जिसमें पाठ की सतही.',
          hint: 'यदि अटके: c12_hin_ar_cbse_14_008 (बिंब और रूपक) पर लौटकर \'प्रतीक की बहु-स्तरीयता\'.',
          misconception: 'छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ है कहानी में **कमियाँ निकालना** (fault-finding) या लेखक से **असहमत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक बौद्धिक प्रक्रिया है जिसमें पाठ की सतही जानकारी',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक बौद्धिक प्रक्रिया है जिसमें पाठ की सतही जानकारी', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि अटके: c12_hin_ar_cbse_14_008 (बिंब और रूपक) पर लौटकर \'प्रतीक की बहु-स्तरीयता\' (multivalence) का.',
                  misconception: 'छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ है कहानी में **कमियाँ निकालना** (fault-finding) या लेखक से **असहमत होना**। वास्तव में.' }
          ],
            remediations: { 'fault-finding': { steps: ['**चरण 1:** छात्र से कहो: "कहानी का कोई एक दृश्य चुनो (जैसे: नायक का शरीष के फूलों तले खड़ा होना) और केवल यह बताओ कि.', '*किस प्रभाव* के लिए?" — यह \'क्या\' से \'कैसे/क्यों\' की ओर ले जाता है। 2.', '**चरण 2:** उसे c12_hin_ar_cbse_14_008 (बिंब और रूपक) और c12_hin_ar_cbse_14_009 (विरोधाभास और प्रतीक) दोबारा पढ़ने को.', '**चरण 3:** एक छोटा अभ्यास: उसी दृश्य के तीन अलग-अलग व्याख्यात्मक कोण (psychological, sociological, symbolic) लिखवाओ और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) is the ability to construct.',
          hint: 'यदि अटके: **c12_hin_ar_cbse_14_006 (मुख्य विषय और संदेश)** और **c12_hin_ar_cbse_14_004.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"पाठ-आधारित उत्तर" का अर्थ है पाठ की कहानी अपने शब्दों में दोहराना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skill) is the ability to construct structured,',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skill) is the ability to construct structured,', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि अटके: **c12_hin_ar_cbse_14_006 (मुख्य विषय और संदेश)** और **c12_hin_ar_cbse_14_004 (नायक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"पाठ-आधारित उत्तर" का अर्थ है पाठ की कहानी अपने शब्दों में दोहराना (paraphrasing the plot)**।.' }
          ],
            remediations: { 'paraphrasing-the-plot-10-11': { steps: ['**पहचान:** छात्र से कहें — "अपना लिखा उत्तर पढ़ो और बताओ: क्या तुमने **कहानी सुनाई** है या **बात सिद्ध की** है?" 2.', '**मॉडलिंग:** वही प्रश्न लें, **कमजोर उत्तर** (कथानक सारांश) और **मजबूत उत्तर** (PEEL) साथ रखें। छात्र से पूछें: "कौन-सा.', '**अभ्यास:** एक 2-अंकीय प्रश्न दें (जैसे: "शरीष की एक विशेषता लिखिए साक्ष्य सहित")। छात्र को **केवल 3 वाक्य** में उत्तर.', '**पुनः निदान:** अगले दिन वही छात्र से एक 3-अंकीय प्रश्न करवाएँ — यदि PEEL दिखे, तो आगे बढ़ें; न दिखे, तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु वह शैक्षिक प्रक्रिया है जिसमें विद्यार्थी पाठ का सस्वर.',
          hint: 'यदि पाठ की गहरी समझ न हो तो **c12_hin_ar_cbse_14_006 (मुख्य विषय और संदेश)** और.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि \'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है — शिक्षक प्रश्न पूछे, छात्र उत्तर दे; या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु वह शैक्षिक प्रक्रिया है जिसमें विद्यार्थी पाठ का सस्वर वाचन करते',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु वह शैक्षिक प्रक्रिया है जिसमें विद्यार्थी पाठ का सस्वर वाचन करते', '\'शरीष के फूल\' कन्हैयालाल मिश्र \'प्रभाकर\' द्वारा रचित एक **संस्मरणात्मक निबंध** है जो', '**कथानक** क्रमबद्ध घटनाओं का वह ताना-बाना है जो कहानी का आधार बनता है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि पाठ की गहरी समझ न हो तो **c12_hin_ar_cbse_14_006 (मुख्य विषय और संदेश)** और.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि \'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है — शिक्षक प्रश्न पूछे, छात्र उत्तर दे; या फिर पाठ का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार:** (1) **पुनः वाचन अभ्यास:** पाठ के 3 विपरीत प्रसंग (बचपन, युवावस्था, वृद्धावस्था) चुनें; प्रत्येक को 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
