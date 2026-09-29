import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch03_p3: SimDef = {
    id: 'v3_c11_hin_v_ch03_p3',
    title: 'पाठ 3 · Part 3/3',
    subtitle: 'Watch a domestic worker cross the line from serving stories to writing one.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 3 · Part 3/3',
    chapters: ['c11_hin_v_ch03'],
    nodeIds: ['c11_hin_v_cbse_03_013', 'c11_hin_v_cbse_03_014', 'c11_hin_v_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader inside a Partition-displaced woman\'s first-person voice', intro: 'A widowed domestic worker in a lawyer\'s Delhi household gets a notebook — and the household\'s power arrangement quietly inverts.', goal: 'Analyse autobiographical fiction\'s blurred boundaries and the story\'s arc toward self-expression.' },
    discovery: {
        question: '\'Sobti wrote this to show how hard life was for poor women in the 1950s\' — what does that reading miss?',
        options: ['That autobiographical fiction is crafted, not documented — blurred author-narrator lines, fragmented memory, and tactical silence are the strategy', 'Nothing — it\'s plain social reporting', 'That she invented the suffering entirely', 'That domestic work was actually easy then'],
        answer: 'That autobiographical fiction is crafted, not documented — blurred author-narrator lines, fragmented memory, and tactical silence are the strategy',
        hook: 'The protagonist performs the \'good servant\' when it suits her and refuses questions when it doesn\'t — resistance here is tactical, not absolute.',
    },
    teaching: [
        { title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'वक़्स-वहाँ\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the inciting incident — the lawyer\'s wife handing over a notebook — and defend the climax where a servant reads her own story aloud.',
        labels: ['पाठ 3 — आलोचनात्मक', 'पाठ 3 — लेखन', 'पाठ 3 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_013', title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या',
          caseStudy: { intro: '\'वक़्स-वहाँ\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।',
            decisions: [{ prompt: 'Define "narrative unreliability" in first-person autobiographical fiction and give one example from "vkyks&vk¡èkkfj" where the.', options: [
                { text: 'Narrative unreliability occurs when a first-person narrator\'s account is compromised by', outcome: 'Narrative unreliability occurs when a first-person narrator\'s account is compromised by limited.' },
                { text: 'honest', outcome: 'Not quite — Students conflate *critical analysis* with *theme identification*—they list "women\'s empowerment,".', reveals: 'students-conflate-critical-analysis-with' },
                { text: 'simple', outcome: 'Not quite — Students conflate *critical analysis* with *theme identification*—they list "women\'s empowerment,".', reveals: 'students-conflate-critical-analysis-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your reading group discusses Krishna Sobti\'s \'व्यक्ति\' — a widowed domestic worker in a lawyer\'s household narrating her own life. A member says: \'It\'s a simple sad life story — husband left, children grew, mother died. Nothing literary about it.\'',
            decisions: [{ prompt: 'What makes the text a literary act, not just a sad story?', options: [
                { text: 'Locate the conditions of possibility: a Partition-displaced Punjabi woman writing first-person domestic labour in 1950s Hindi — when few women published such narratives — is itself the claim: voice claimed where the tradition erased working-class women. And the structure mirrors the theme: external events (gaining literacy, writing her story) run parallel to the internal arc of finding her voice — the first-person \'मैं\' is the point.', outcome: 'The group sees it: the \'simple\' plot is deliberately arranged so that learning to write IS the climax — testimony becoming literature.' },
                { text: 'Agree it\'s just a life story — summarise the events and move on.', outcome: 'Event-listing confuses story with plot: the husband\'s death is backstory, literacy is the causal spine — selection and arrangement are the authorial design.', reveals: 'just-a-sad-life-story' },
                { text: 'Call it autobiography — Sobti is describing her own life in a lawyer\'s house.', outcome: 'First-person voice isn\'t autobiography: Sobti constructs a persona — a domestic worker narrating — and the act of writing within the story dramatises that construction.', reveals: 'first-person-means-autobiography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'The notebook and pen turn a worker into an author — the climax isn\'t publication, it\'s being heard by the person who gave them.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_013', difficulty: 'standard',
          question: '\'वक़्स-वहाँ\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'If stuck, return to node 009 (Irony and Symbolism) and re-analyze the "keys" and "ink".',
          misconception: 'Students conflate *critical analysis* with *theme identification*—they list "women\'s empowerment," "education,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक़्स-वहाँ\' का आलोचनात्मक चिंतन',
                  options: ['\'वक़्स-वहाँ\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक़्स-वहाँ\' का कथानक', '\'वक़्स-वहाँ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, return to node 009 (Irony and Symbolism) and re-analyze the "keys" and "ink" motifs.',
                  misconception: 'Students conflate *critical analysis* with *theme identification*—they list "women\'s empowerment," "education," "exploitation" as if naming.' }
          ],
            remediations: { 'students-conflate-critical-analysis-with': { steps: ['Give the student a single paragraph from the text (e.g., pages 27-28 where she describes the "dejs esa rhu.', 'Have them map the *syntactic change* to the *psychological change*—shorter sentences = survival mode; complex sentences.', 'Assign a micro-task: "Rewrite the page 21 paragraph using page 28\'s sentence structures. What is lost? What is gained?"', 'Only after this formal exercise, return to the analytical question: "How does Chandrakanta use syntax to enact the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate *critical analysis* with *theme identification*—they list "women\'s empowerment," "education,".',
          parts: [
                { id: 'a', prompt: 'Evaluate the critical claim: "The protagonist\'s authorship at the novel\'s end represents genuine liberation, not co-optation." Defend or challenge using three.', answer: 'The claim is *partially defensible but incomplete*',
                  options: ['The claim is *partially defensible but incomplete*', 'yes she\'s free', 'no she\'s trapped'],
                  hint: 'If stuck, return to node 009 (Irony and Symbolism) and re-analyze the "keys" and "ink" motifs.',
                  misconception: 'Students conflate *critical analysis* with *theme identification*—they list "women\'s empowerment," "education," "exploitation" as if naming.' }
          ],
            remediations: { 'students-conflate-critical-analysis-with': { steps: ['Give the student a single paragraph from the text (e.g., pages 27-28 where she describes the "dejs esa rhu.', 'Have them map the *syntactic change* to the *psychological change*—shorter sentences = survival mode; complex sentences.', 'Assign a micro-task: "Rewrite the page 21 paragraph using page 28\'s sentence structures. What is lost? What is gained?"', 'Only after this formal exercise, return to the analytical question: "How does Chandrakanta use syntax to enact the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_014', difficulty: 'standard',
          question: '\'वक़्स-वहाँ\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि अटके तो c11_hin_v_cbse_03_012 (Comprehension) और c11_hin_v_cbse_03_008 (Literary.',
          misconception: 'छात्र मानते हैं कि \'पाठ पर आधारित लेखन\' का अर्थ पाठ का सारांश लिखना है। वे PEEL के \'Explanation\' चरण को छोड़ देते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक़्स-वहाँ\' पर पाठ-आधारित लेखन',
                  options: ['\'वक़्स-वहाँ\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक़्स-वहाँ\' का कथानक', '\'वक़्स-वहाँ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c11_hin_v_cbse_03_012 (Comprehension) और c11_hin_v_cbse_03_008 (Literary Devices).',
                  misconception: 'छात्र मानते हैं कि \'पाठ पर आधारित लेखन\' का अर्थ पाठ का सारांश लिखना है। वे PEEL के \'Explanation\' चरण को छोड़ देते हैं — साक्ष्य देते हैं.' }
          ],
            remediations: { 'peel-explanation': { steps: ['चरण 1: छात्र से एक कमजोर उत्तर लिखवाएँ (जानबूझकर केवल सारांश)। चरण 2: साथ मिलकर उसमें \'Explanation\' वाक्य डालें — हर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_03_015', difficulty: 'standard',
          question: '\'वक़्स-वहाँ\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.',
          hint: 'यदि चर्चा शुरू करने में कठिनाई हो, तो "राकेश द्वारा नोटबुक देना" प्रसंग पर लौटें—यह कहानी.',
          misconception: 'छात्र अक्सर मानते हैं कि "Speaking and Listening" का अर्थ केवल कहानी पर बोलना या प्रश्नों के उत्तर देना है। वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक़्स-वहाँ\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'वक़्स-वहाँ\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक़्स-वहाँ\' का कथानक', '\'वक़्स-वहाँ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि चर्चा शुरू करने में कठिनाई हो, तो "राकेश द्वारा नोटबुक देना" प्रसंग पर लौटें—यह कहानी का.',
                  misconception: 'छात्र अक्सर मानते हैं कि "Speaking and Listening" का अर्थ केवल कहानी पर बोलना या प्रश्नों के उत्तर देना है। वास्तव में, बोर्ड परीक्षा में.' }
          ],
            remediations: { 'speaking-and-listening': { steps: ['चरण 1: छात्र से कहें—"कहानी का एक प्रसंग चुनो जहाँ नायिका का कोई निर्णय उसके जीवन को बदलता हो।" चरण 2: उससे पूछें—"इस.', 'पाठ की दो पंक्तियाँ उद्धृत करो।" चरण 3: उससे कहें—"अब कल्पना करो उसने वह निर्णय न लिया होता। तब क्या होता?', 'कारण बताओ।" चरण 4: इस अभ्यास को 3-4 प्रसंगों (राकेश से मिलना, नोटबुक लेना, पहला चेक मिलना, घर खरीदना) पर दोहराएँ। इससे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
