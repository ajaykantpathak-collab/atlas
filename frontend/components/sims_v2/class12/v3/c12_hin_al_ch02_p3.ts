import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch02_p3: SimDef = {
    id: 'v3_c12_hin_al_ch02_p3',
    title: 'बस्किोहर की माटी · Part 3/3',
    subtitle: 'One clay bowl holding a whole childhood',
    classLevel: 12, subject: 'hin_al', topic: 'बस्किोहर की माटी · Part 3/3',
    chapters: ['c12_hin_al_ch02'],
    nodeIds: ['c12_hin_al_cbse_02_013', 'c12_hin_al_cbse_02_014', 'c12_hin_al_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi memoir reader', intro: 'A writer returns to his mother\'s wheel — where pots were shaped and so was he.', goal: 'Read Fulchand ki Ekawah as an autobiographical sketch — where genre turns memory into art.' },
    discovery: {
        question: 'Ashk remembers his potter mother shaping clay at dawn — one bowl, one breath, one life. Why does a short \'sketch\' hit harder than a full autobiography?',
        options: ['Selection and shaping — an आत्मकथात्मक रेखाचित्र distils one memory with artistic unity, where a chronological life-record would dilute it', 'It\'s shorter, so easier', 'Autobiographies are boring', 'Sketches are more factual'],
        answer: 'Selection and shaping — an आत्मकथात्मक रेखाचित्र distils one memory with artistic unity, where a chronological life-record would dilute it',
        hook: 'Don\'t read it as a diary — it\'s craft: the potter\'s wheel, the mother\'s hands, the smell of wet earth chosen to carry loss and a vanishing craft. Genre is the message; biography alone is just a record.',
    },
    teaching: [
        { title: 'बस्किोहर की माटी — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'फणीश्वरनाथ रेणु की\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Step into the potter\'s village at first light: weigh how genre shapes memory, trace the mother-child bond through small acts, and read the wheel as a disappearing world.',
        labels: ['बस्किोहर की माटी —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a college-magazine memoir about the writer\'s grandmother in a potters\' village. The draft is a flat factual list — born here, made pots, died there — and the writer insists \'it\'s autobiographical, so it must record everything exactly.\'',
            decisions: [{ prompt: 'What does the रेखाचित्र (sketch) genre of Ashk\'s \'फुलचंद की एकवह\' teach the edit?', options: [
                { text: 'Cut and shape — a रेखाचित्र selects one memory or figure and artistically intensifies it; the bond lives in sensory details like dawn on the potter\'s wheel and small acts of care, not in a complete chronology of facts.', outcome: 'The genre\'s power is selectivity: an autobiographical sketch is life transformed into art through emphasis, so \'record everything\' produces a register, not a remembrance.' },
                { text: 'Leave it — autobiography\'s contract with the reader is factual completeness, so selection would be dishonest.', outcome: 'That confuses the sketch with the full autobiography or a diary; the रेखाचित्र makes no such contract — its truth is thematic unity, and completeness is the wrong measure for it.', reveals: 'memoir-means-complete-facts' },
                { text: 'Improve it by adding the author\'s biography — more background facts will supply the missing depth.', outcome: 'That\'s the \'life equals text\' fallacy: the emotional force comes from craft — imagery and shaped memory — not from appending more verified biography.', reveals: 'biography-adds-depth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a sketch as deliberate art — one memory holding an entire childhood, a mother and a craft on the wheel.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_013', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'If stuck, re-read the opening paragraph of the NCERT text ("ikB ifjp;") which explicitly.',
          misconception: 'Students treat "fcLdksgj dh ekVh" as a straightforward nostalgic memoir where the author *recovers* her past.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' का आलोचनात्मक चिंतन',
                  options: ['\'फणीश्वरनाथ रेणु की\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, re-read the opening paragraph of the NCERT text ("ikB ifjp;") which explicitly states.',
                  misconception: 'Students treat "fcLdksgj dh ekVh" as a straightforward nostalgic memoir where the author *recovers* her past.' }
          ],
            remediations: { 'students-treat-fcldksgj-dh-ekvh': { steps: ['If a student cannot distinguish the narrator\'s construction from the character\'s reality: Step 1 — Have them highlight.', 'Step 2 — Ask: "Who knows Phuluk\'s mother\'s grief — the child or the adult?" (Answer: The adult imposes the.', 'Step 3 — Assign a micro-writing task: Rewrite the turmeric-mark episode *only* from the child\'s limited perspective (no.', 'Step 4 — Compare both versions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_014', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि छात्र साक्ष्य का चयन करने में कठिनाई महसूस कर रहा है, तो उसे c12_hin_al_cbse_02_002.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ आधारित उत्तर लिखने में लंबा लिखना ही गुणवत्ता का मापदंड है — वे अनावश्यक विवरण, दोहराव या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' पर पाठ-आधारित लेखन',
                  options: ['\'फणीश्वरनाथ रेणु की\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र साक्ष्य का चयन करने में कठिनाई महसूस कर रहा है, तो उसे c12_hin_al_cbse_02_002 (कथानक और.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ आधारित उत्तर लिखने में लंबा लिखना ही गुणवत्ता का मापदंड है — वे अनावश्यक विवरण, दोहराव या सामान्य ज्ञान की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र लंबाई को गुणवत्ता से जोड़ने की गलती कर रहा है, तो उसे इस प्रकार सुधारें: पहले उसे दो उत्तर दिखाएँ — एक लंबा.', 'संबंध?) के आधार पर काटे-छांटे और केवल आवश्यक तत्व रखे। इस प्रक्रिया को दोहराने से वह सीखेगा कि क्या रखना है और क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_015', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि पाठ का भाव स्पष्ट न हो, तो `c12_hin_al_cbse_02_002` (कथानक) और.',
          misconception: '**विशिष्ट भ्रांति:** *"वाचन-श्रवण गतिविधि में \'चर्चा-बिंदु\' का मतलब है — शिक्षक प्रश्न पूछे, छात्र एक-लाइन उत्तर दे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'फणीश्वरनाथ रेणु की\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि पाठ का भाव स्पष्ट न हो, तो `c12_hin_al_cbse_02_002` (कथानक) और `c12_hin_al_cbse_02_006` (मुख्य.',
                  misconception: '**विशिष्ट भ्रांति:** *"वाचन-श्रवण गतिविधि में \'चर्चा-बिंदु\' का मतलब है — शिक्षक प्रश्न पूछे, छात्र एक-लाइन उत्तर दे दे।"* **क्यों गलत है:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (3-चरणीय):** 1.', '**मॉडल वाचन सुनो:** शिक्षक/रिकॉर्डिंग से पाठ का 1 मिनट का अंश सुनो — **उच्चारण, बल, विराम, भाव** पर ध्यान दो। फिर स्वयं.', '**सक्रिय श्रवण अभ्यास:** साथी को पढ़ते सुनते समय **किनारे पर 3 प्रश्न लिखो** (क्या?', 'कैसे?) — फिर उससे पूछो। इससे श्रवण \'सक्रिय\' बनेगा। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
