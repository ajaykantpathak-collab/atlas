import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch15_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch15_p3: SimDef = {
    id: 'v3_c12_hin_a_ch15_p3',
    title: 'जहाँ कोई वापसी नहीं · Part 3/3',
    subtitle: 'The survey line was straight; the damage wasn\'t',
    classLevel: 12, subject: 'hin_a', topic: 'जहाँ कोई वापसी नहीं · Part 3/3',
    chapters: ['c12_hin_a_ch15'],
    nodeIds: ['c12_hin_a_cbse_15_013', 'c12_hin_a_cbse_15_014', 'c12_hin_a_cbse_15_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Displacement-narrative reader', intro: 'A dam was drawn on a map; a hundred villages learned they lived inside a line.', goal: 'Read Tedhi Lakeer through development-induced displacement and Renu\'s reportage-fiction method.' },
    discovery: {
        question: 'A surveyor draws a straight red line for a dam across tribal land — on the earth it becomes a crooked scar. Why did Renu name the story \'The Crooked Line\'?',
        options: ['The line is morally crooked — promises run straight, reality bends: the survey ignores contours, villages and consent; development\'s path is crooked because it refuses the land\'s truth', 'The terrain was hilly', 'Surveyors make mistakes', 'A meandering river'],
        answer: 'The line is morally crooked — promises run straight, reality bends: the survey ignores contours, villages and consent; development\'s path is crooked because it refuses the land\'s truth',
        hook: 'This is reportage-fiction about a real wound — the Koel-Karo project threatening 120+ villages. Renu captures the pre-movement moment: resistance raw and leaderless, dismissed as backwardness before it could become an Andolan. The deepest irony — the democratic state itself ran the displacement.',
    },
    teaching: [
        { title: 'जहाँ कोई वापसी नहीं — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'टेढ़ी लकीर\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_15_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the Chotanagpur hills before the dam: weigh whose \'development\' submerges whom, compare raw tribal refusal with organised protest, and decode the crooked line\'s triple meaning.',
        labels: ['जहाँ कोई वापसी नहीं'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_015', title: 'जहाँ कोई वापसी नहीं — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'टेढ़ी लकीर\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What are the two main discussion formats recommended by CBSE for the Assessment of Speaking and Listening (ASL) that can be applied to this.', options: [
                { text: 'The two main formats are Group Discussion (GD) and Debate', outcome: 'The two main formats are Group Discussion (GD) and Debate. A wrong answer (e.g., "speech and.' },
                { text: 'speech and interview', outcome: 'Not quite — Students think speaking and listening is just about talking fluently in Hindi.', reveals: 'speaking-and-listening-is-just' },
                { text: 'speaking and listening is just about talking fluently in Hindi', outcome: 'Not quite — Students think speaking and listening is just about talking fluently in Hindi.', reveals: 'speaking-and-listening-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing a piece on your hometown\'s transformation — the river now a drain, fields under a factory — your editor wants it chronological: \'village past, then highway, then industry, then today.\'',
            decisions: [{ prompt: 'What structure does Renu\'s \'जहाँ कोई वापसी नहीं\' use instead, and why?', options: [
                { text: 'Open in the damaged present, then break into flashes of the lost past with your own commentary between them — the fragmented telling enacts the severed bond between people and land, making the reader live the loss rather than read a progress report.', outcome: 'The chapter\'s point: a linear telling makes change look like neutral sequence; the non-linear juxtaposition of what is against what was is where the critique lives.' },
                { text: 'Go chronological — \'village → factory\' order keeps the article clear and fair to both sides.', outcome: 'Chronology launders the verdict into inevitability; the story opens with the polluted present precisely so the reader enters with the damage already done — \'fair\' sequencing is how loss gets normalised.', reveals: 'chronology-is-neutral' },
                { text: 'Skip the past entirely and report only today\'s conditions — nostalgia is bias.', outcome: 'Without the remembered village the present has no baseline; the story\'s commentary works because the reader holds both timeframes at once — past-only is romance, present-only is bookkeeping.', reveals: 'past-is-bias' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a dam story as an invoice for the city\'s electricity — paid in forests, rivers and a people\'s memory.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_013', difficulty: 'standard',
          question: '\'टेढ़ी लकीर\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि छात्र आलोचनात्मक चिंतन में कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_15_012.',
          misconception: 'छात्र अक्सर कविता के विश्लेषण में केवल शब्दों के शब्दार्थिक अर्थ पर ध्यान देते हैं और रूपक, उपमा, या प्रतीक जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेढ़ी लकीर\' का आलोचनात्मक चिंतन',
                  options: ['\'टेढ़ी लकीर\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेढ़ी लकीर\' का कथानक', '\'टेढ़ी लकीर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र आलोचनात्मक चिंतन में कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_15_012 (बोध-प्रश्न.',
                  misconception: 'छात्र अक्सर कविता के विश्लेषण में केवल शब्दों के शब्दार्थिक अर्थ पर ध्यान देते हैं और रूपक, उपमा, या प्रतीक जैसे साहित्यिक युक्तियों के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले एक सरल वाक्य दें जिसमें स्पष्ट रूपक हो (जैसे "वह शेर है") और पूछें: "यदि कोई वास्तविक शेर यहाँ नहीं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_014', difficulty: 'standard',
          question: '\'टेढ़ी लकीर\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि प्रमाण चुनने में अटकें: **c12_hin_a_cbse_15_008** (बिंब/रूपक) और.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर में पाठ की ज्यादा-से-ज्यादा पंक्तियाँ उद्धृत करने से अंक बढ़ते हैं।"*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेढ़ी लकीर\' पर पाठ-आधारित लेखन',
                  options: ['\'टेढ़ी लकीर\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेढ़ी लकीर\' का कथानक', '\'टेढ़ी लकीर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि प्रमाण चुनने में अटकें: **c12_hin_a_cbse_15_008** (बिंब/रूपक) और **c12_hin_a_cbse_15_009**.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर में पाठ की ज्यादा-से-ज्यादा पंक्तियाँ उद्धृत करने से अंक बढ़ते हैं।"* **वास्तविकता:** CBSE मार्किंग.' }
          ],
            remediations: { 'cbse-relevance-depth-of-explanation': { steps: ['**चरण 1:** छात्र से कहें: "अपना लिखा उत्तर पढ़ो और हर पैराग्राफ के आगे लिखो: P / E / E / L — कौन-सा चरण गायब है?" **चरण.', '\'क्यों\' और \'कैसे\' लिखो।" **चरण 3:** **पुनः अभ्यास:** वही प्रश्न, नया उद्धरण, केवल Explanation चरण लिखने को कहें — 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_015', difficulty: 'standard',
          question: '\'टेढ़ी लकीर\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.',
          hint: 'If stuck, revisit c12_hin_a_cbse_15_013 (Critical Thinking) to identify 3-4 core.',
          misconception: 'Students think speaking and listening is just about talking fluently in Hindi.',
          parts: [
                { id: 'a', prompt: 'What are the two main discussion formats recommended by CBSE for the Assessment of Speaking and Listening (ASL) that can be applied to this chapter?', answer: 'The two main formats are Group Discussion (GD) and Debate',
                  options: ['The two main formats are Group Discussion (GD) and Debate', 'speech and interview', 'speaking and listening is just about talking fluently in Hindi'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_15_013 (Critical Thinking) to identify 3-4 core arguments from the.',
                  misconception: 'Students think speaking and listening is just about talking fluently in Hindi.' },
                { id: 'b', prompt: 'Explain why the title "Tahan koi okil nahi" (There is no lawyer there) is an effective discussion starter for this chapter.', answer: 'The title is ironic',
                  options: ['The title is ironic', 'it tells us the setting', 'speaking and listening is just about talking fluently in Hindi'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_15_013 (Critical Thinking) to identify 3-4 core arguments from the.',
                  misconception: 'Students think speaking and listening is just about talking fluently in Hindi.' },
                { id: 'c', prompt: 'Compare the perspectives of the contractor and the tribal elder in the chapter. How would you structure a debate between them?', answer: 'Contractor: "Progress needs sacrifice',
                  options: ['Contractor: "Progress needs sacrifice', 'speaking and listening is just about talking fluently in Hindi'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_15_013 (Critical Thinking) to identify 3-4 core arguments from the.',
                  misconception: 'Students think speaking and listening is just about talking fluently in Hindi.' }
          ],
            remediations: { 'speaking-and-listening-is-just': { steps: ['If a student cannot anchor discussion in text: 1) Have them re-read the Critical Thinking node (c12_hin_a_cbse_15_013).', '2) Practice with a peer using a checklist: State claim → Quote 1 line from text → Explain in own words → Ask "Do you.', 'Repeat until both are yes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think speaking and listening is just about talking fluently in Hindi.',
          parts: [
                { id: 'a', prompt: 'Design a 2-minute podcast script introducing the chapter\'s central conflict to a new listener.', answer: '"Hello, I\'m [Name]',
                  options: ['"Hello, I\'m [Name]', 'speaking and listening is just about talking fluently in Hindi'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_15_013 (Critical Thinking) to identify 3-4 core arguments from the.',
                  misconception: 'Students think speaking and listening is just about talking fluently in Hindi.' }
          ],
            remediations: { 'speaking-and-listening-is-just': { steps: ['If a student cannot anchor discussion in text: 1) Have them re-read the Critical Thinking node (c12_hin_a_cbse_15_013).', '2) Practice with a peer using a checklist: State claim → Quote 1 line from text → Explain in own words → Ask "Do you.', 'Repeat until both are yes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
