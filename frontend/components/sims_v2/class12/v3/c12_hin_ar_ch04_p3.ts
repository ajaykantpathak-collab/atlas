import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch04_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch04_p3',
    title: 'कैमरे में बंद अपाहजि · Part 3/3',
    subtitle: 'He wrote in the people\'s tongue so the people could read it',
    classLevel: 12, subject: 'hin_ar', topic: 'कैमरे में बंद अपाहजि · Part 3/3',
    chapters: ['c12_hin_ar_ch04'],
    nodeIds: ['c12_hin_ar_cbse_04_013', 'c12_hin_ar_cbse_04_014', 'c12_hin_ar_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Progressive poetry reader', intro: 'A poet-journalist who wrote for the ignored decides the poem itself must speak like them.', goal: 'Read Nagarjun through the Progressive movement — Khari Boli as politics, the street performer as systemic critique.' },
    discovery: {
        question: 'Nagarjun chooses Khari Boli — the people\'s spoken tongue — over Sanskritised literary Hindi, for poems about peasants and street performers. What does the language choice itself declare?',
        options: ['Democratic intent — the poem must be readable by the very people it depicts; medium is the politics', 'Khari Boli is easier to write', 'Sanskrit was banned', 'Nothing — language is neutral'],
        answer: 'Democratic intent — the poem must be readable by the very people it depicts; medium is the politics',
        hook: 'Progressive poets like Nagarjun — journalist, trilingual, champion of the ignored — prove the micro reveals the macro: a street performer\'s day exposes the whole machinery of exploitation. Journalism trained the eye; poetry carried the indictment.',
    },
    teaching: [
        { title: 'कैमरे में बंद अपाहजि — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'दसेज में चाँद विकट\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk with the street performer: read rustic speech as deliberate politics, trace how one \'small\' life opens onto the entire structure that exploits it, and test why context turns description into critique.',
        labels: ['कैमरे में बंद अपाहजि'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_015', title: 'कैमरे में बंद अपाहजि — वाचन-पाठ और चर्चा-बिंदु',
          caseStudy: { intro: '\'दसेज में चाँद विकट\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary structural feature of the poem \'जय हो\' that distinguishes it from a monologue, and which two characters\' voices are.', options: [
                { text: 'The poem \'जय हो\' is structured as a **dialogue (संवाद शैली)** between a **contractor', outcome: 'The poem \'जय हो\' is structured as a **dialogue (संवाद शैली)** between a **contractor (ठेकेदार)**.' },
                { text: 'it\'s a description of a construction site', outcome: 'Not quite — **Misconception:** "Discussion points are just my personal opinions about the poem — I don\'t need.', reveals: 'misconception-discussion-points-are-just' },
                { text: 'the poet speaks throughout', outcome: 'Not quite — **Misconception:** "Discussion points are just my personal opinions about the poem — I don\'t need.', reveals: 'misconception-discussion-points-are-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'After a funds scandal in your student council, your group\'s protest poster is all slogans — \'We will shout for change!\' A senior suggests adding a line addressing each silent member by name, and clipping the actual audit report to the bottom.',
            decisions: [{ prompt: 'What does the structure of \'देश में चाँद विकृत\' say about the senior\'s edits?', options: [
                { text: 'Keep both — the poem\'s arc runs collective declaration (\'we\') → direct accusation (\'you\') → documentary proof; slogans alone rage at the air, but naming the complacent and ending with the audit clipping converts protest into verified indictment.', outcome: 'The poem performs its argument through structural stages, finishing with a newspaper report that turns poetic charge into documented fact — the senior is rebuilding exactly that engine.' },
                { text: 'Drop the audit — raw collective emotion is more powerful than paperwork.', outcome: 'The poem deliberately ends with reportage, not refrain: the clipping is the climax that proves \'vikrit\' isn\'t exaggeration but record; without it the poster stays an unfalsifiable mood.', reveals: 'rage-beats-record' },
                { text: 'Drop the \'you\' lines — naming members turns unity into blame.', outcome: 'The poem\'s middle stanzas are precisely the turn from \'we\' to \'you\' — the interrogation of the complacent is what makes the final evidence land; skipping it leaves only self-congratulation.', reveals: 'unity-means-no-accusation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'You can now hear a poem\'s language as its argument — and see how progressive literature makes the marginal the centre.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_013', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि \'कैमरा\' को रूपक (metaphor) न मान पा रहे हों, तो c12_hin_ar_cbse_04_007 (प्रतीक) के.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि कविता \'विकलांग व्यक्तियों की पीड़ा\' (suffering of disabled persons) पर केंद्रित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दसेज में चाँद विकट\' का आलोचनात्मक चिंतन',
                  options: ['\'दसेज में चाँद विकट\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'दसेज में चाँद विकट\' का कथानक', '\'दसेज में चाँद विकट\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि \'कैमरा\' को रूपक (metaphor) न मान पा रहे हों, तो c12_hin_ar_cbse_04_007 (प्रतीक) के \'कैमरा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि कविता \'विकलांग व्यक्तियों की पीड़ा\' (suffering of disabled persons) पर केंद्रित है, जबकि कविता का.' }
          ],
            remediations: { 'suffering-of-disabled-persons': { steps: ['**पुनः पढ़ें:** कविता को **तीन बार** पढ़ें — पहली बार: केवल ध्वनि/लय के लिए (कैमरे की \'क्लिक\' ध्वनि सुनें)। दूसरी बार.', '**तुलना करें:** c12_hin_ar_cbse_04_007 (प्रतीक) और c12_hin_ar_cbse_04_008 (मुख्य भाव) के नोट्स देखें — विशेष रूप से.', '**लिखें:** 50 शब्दों में उत्तर दें: "कवि अपाहिज पर नहीं, कैमरे पर क्यों व्यंग्य करता है?" — फिर अपने उत्तर की तुलना.', '**पुनः निदान:** DIAGNOSTIC_QUESTION_2 और 4 को दोबारा हल करें — इस बार \'विरोधाभास\' और \'प्रतीक-उलटफेर\' पर फोकस करें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_014', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, revisit c12_hin_ar_cbse_04_013 (Critical Thinking) to practice analysis, then.',
          misconception: 'विद्यार्थी मानते हैं कि \'अधिक लिखना = अधिक अंक\'। वे 5-अंकीय उत्तर में 300 शब्द लिख देते हैं पर PEEL संरचना नहीं रखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दसेज में चाँद विकट\' पर पाठ-आधारित लेखन',
                  options: ['\'दसेज में चाँद विकट\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'दसेज में चाँद विकट\' का कथानक', '\'दसेज में चाँद विकट\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_04_013 (Critical Thinking) to practice analysis, then.',
                  misconception: 'विद्यार्थी मानते हैं कि \'अधिक लिखना = अधिक अंक\'। वे 5-अंकीय उत्तर में 300 शब्द लिख देते हैं पर PEEL संरचना नहीं रखते, पाठ्य साक्ष्य नहीं.' }
          ],
            remediations: { '5-300-peel': { steps: ['विद्यार्थी से कहें: "एक साधारण विषय (जैसे \'गृहकार्य उपयोगी है\') पर PEEL पैराग्राफ लिखो — 5 वाक्य, कोई साहित्य नहीं।" 2.', 'फिर उसी संरचना को कविता के एक पद पर लागू करो: Point पहचानो, Evidence ढूंढो, Explanation जोड़ो, Link बनाओ। 3.', 'उसके बाद 3-अंकीय प्रश्न का उत्तर 50 शब्दों में लिखने का अभ्यास कराओ, समय सीमा 5 मिनट। 4.', 'स्वयं अंकन योजना से जाँच कराओ: क्या Point स्पष्ट है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_015', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, return to **c12_hin_ar_cbse_04_009 (Irony/Symbolism)** and.',
          misconception: '**Misconception:** "Discussion points are just my personal opinions about the poem — I don\'t need to quote lines.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दसेज में चाँद विकट\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'दसेज में चाँद विकट\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'दसेज में चाँद विकट\' का कथानक', '\'दसेज में चाँद विकट\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, return to **c12_hin_ar_cbse_04_009 (Irony/Symbolism)** and **c12_hin_ar_cbse_04_013.',
                  misconception: '**Misconception:** "Discussion points are just my personal opinions about the poem — I don\'t need to quote lines." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-discussion-points-are-just': { steps: ['**Remediation Path:** 1) Revisit **c12_hin_ar_cbse_04_002 (Plot/Narrative Structure)** to map the dialogue sequence.', '2) Re-read **c12_hin_ar_cbse_04_008 (Imagery/Metaphor)** and **009 (Irony/Symbolism)**; for each device, write one.', '4) Re-diagnostic: Attempt **DIAGNOSTIC_QUESTION_3** again — if the rebuttal still lacks a named metaphor + quoted line.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
