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
        { title: 'शरिीष के फूल — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'फकीर धुनी\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_14_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the flag as the nation\'s pulse: trace its arc from tryst-with-destiny to faded neglect, weigh reverence against ritual, and ask what a torn tricolor diagnoses.',
        labels: ['शरिीष के फूल —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_014', title: 'शरिीष के फूल — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'फकीर धुनी\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for **Point, Evidence, Explanation, Link**', outcome: 'PEEL stands for **Point, Evidence, Explanation, Link**. A wrong answer (e.g., "Plot, Event.' },
                { text: 'Plot, Event, Explanation, Lesson', outcome: 'Not quite — **Misconception:** *"Writing skills means writing a summary of the chapter in good Hindi."* **Why.', reveals: 'misconception-writing-skills-means-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_015', title: 'शरिीष के फूल — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'फकीर धुनी\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'Define the PEEL structure for oral literary discussion and name its four components in speaking order.', options: [
                { text: 'PEEL = Point (state your interpretive claim in one sentence), Evidence (cite a specific', outcome: 'PEEL = Point (state your interpretive claim in one sentence), Evidence (cite a specific textual.' },
                { text: 'Point, Example, Explain, Conclusion', outcome: 'Not quite — Students treat "discussion points" as a list of topics to memorize (e.g., "river pollution,".', reveals: 'students-treat-discussion-points-as' }
            ] }] } },
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
          question: '\'फकीर धुनी\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि अटके: c12_hin_ar_cbse_14_008 (बिंब और रूपक) पर लौटकर \'प्रतीक की बहु-स्तरीयता\'.',
          misconception: 'छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ है कहानी में **कमियाँ निकालना** (fault-finding) या लेखक से **असहमत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फकीर धुनी\' का आलोचनात्मक चिंतन',
                  options: ['\'फकीर धुनी\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फकीर धुनी\' का कथानक', '\'फकीर धुनी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: c12_hin_ar_cbse_14_008 (बिंब और रूपक) पर लौटकर \'प्रतीक की बहु-स्तरीयता\' (multivalence) का.',
                  misconception: 'छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ है कहानी में **कमियाँ निकालना** (fault-finding) या लेखक से **असहमत होना**। वास्तव में.' }
          ],
            remediations: { 'fault-finding': { steps: ['**चरण 1:** छात्र से कहो: "कहानी का कोई एक दृश्य चुनो (जैसे: नायक का शरीष के फूलों तले खड़ा होना) और केवल यह बताओ कि.', '*किस प्रभाव* के लिए?" — यह \'क्या\' से \'कैसे/क्यों\' की ओर ले जाता है। 2.', '**चरण 2:** उसे c12_hin_ar_cbse_14_008 (बिंब और रूपक) और c12_hin_ar_cbse_14_009 (विरोधाभास और प्रतीक) दोबारा पढ़ने को.', '**चरण 3:** एक छोटा अभ्यास: उसी दृश्य के तीन अलग-अलग व्याख्यात्मक कोण (psychological, sociological, symbolic) लिखवाओ और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_014', difficulty: 'standard',
          question: '\'फकीर धुनी\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, revisit `c12_hin_ar_cbse_14_006` (Theme) to re-anchor the thesis, and.',
          misconception: '**Misconception:** *"Writing skills means writing a summary of the chapter in good Hindi."* **Why it’s wrong:** Board.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for **Point, Evidence, Explanation, Link**',
                  options: ['PEEL stands for **Point, Evidence, Explanation, Link**', 'Plot, Event, Explanation, Lesson'],
                  hint: 'If stuck, revisit `c12_hin_ar_cbse_14_006` (Theme) to re-anchor the thesis, and.',
                  misconception: '**Misconception:** *"Writing skills means writing a summary of the chapter in good Hindi."* **Why it’s wrong:** Board marking schemes (CBSE.' }
          ],
            remediations: { 'misconception-writing-skills-means-writing': { steps: ['If a student cannot produce a PEEL paragraph after instruction: 1.', '**Deconstruct a model answer** (provide a 4-sentence PEEL paragraph on a परिचित topic, e.g., "Why is the fakir’s.', 'Color-code: Point (blue), Evidence (green), Explanation (orange), Link (purple).', '**Guided practice:** Give a new question ("फकीर का संवाद व्यंग्य कैसे है?") and a bank of 3 textual quotes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_015', difficulty: 'standard',
          question: '\'फकीर धुनी\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।',
          hint: 'If unable to trace the tonal arc: re-read the chapter marking only transition phrases.',
          misconception: 'Students treat "discussion points" as a list of topics to memorize (e.g., "river pollution," "cultural importance").',
          parts: [
                { id: 'a', prompt: 'A classmate says: "Muktibodh just describes rivers beautifully — there\'s no argument." Using the chapter\'s structure, explain why this reading misses the.', answer: 'The chapter moves from reverence (river as "voèkwr"',
                  options: ['The chapter moves from reverence (river as "voèkwr"', 'only description', 'dkfynkl dk vuklDr jguk', 'nqjar izk.kèkkjk vkSj loZO;kid dkykfXu'],
                  hint: 'If unable to trace the tonal arc: re-read the chapter marking only transition phrases ("blosQ ckn".',
                  misconception: 'Students treat "discussion points" as a list of topics to memorize (e.g., "river pollution," "cultural importance") rather than.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['If a student cannot anchor claims in textual specifics: (1) Assign "Three-Column Mapping": Column A = Chapter segment.', 'Complete for all 5 major segments.', '(2) Practice "Evidence-First Speaking": Partner gives a claim; student must supply the exact textual evidence before.', '(3) Revisit node c12_hin_ar_cbse_14_013 (Critical Thinking) to relearn how the chapter\'s structure builds its argument.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "discussion points" as a list of topics to memorize (e.g., "river pollution," "cultural importance").',
          parts: [
                { id: 'a', prompt: 'Evaluate this interpretation: "Muktibodh romanticizes the past; the \'dkfynkl\' represents a feudal order we should not mourn." Defend or refute using the.', answer: 'Refute',
                  options: ['Refute', 'critical thinking'],
                  hint: 'If unable to trace the tonal arc: re-read the chapter marking only transition phrases ("blosQ ckn".',
                  misconception: 'Students treat "discussion points" as a list of topics to memorize (e.g., "river pollution," "cultural importance") rather than.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['If a student cannot anchor claims in textual specifics: (1) Assign "Three-Column Mapping": Column A = Chapter segment.', 'Complete for all 5 major segments.', '(2) Practice "Evidence-First Speaking": Partner gives a claim; student must supply the exact textual evidence before.', '(3) Revisit node c12_hin_ar_cbse_14_013 (Critical Thinking) to relearn how the chapter\'s structure builds its argument.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
