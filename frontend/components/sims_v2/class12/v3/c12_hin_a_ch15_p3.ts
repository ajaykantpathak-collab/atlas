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
        { title: 'जहाँ कोई वापसी नहीं — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें हम किसी पाठ के तथ्यों को केवल याद करने के बजाय उसके पीछे के अर्थ, लेखक के उद्देश्य, उपयोग की गई साहित्यिक युक्तियों, और पाठ के सामाजिक या ऐतिहासिक संदेश को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_15_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the Chotanagpur hills before the dam: weigh whose \'development\' submerges whom, compare raw tribal refusal with organised protest, and decode the crooked line\'s triple meaning.',
        labels: ['जहाँ कोई वापसी नहीं'],
            observePrompt: 'What did the flow interactive show you?' } },
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
          question: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें हम किसी पाठ के तथ्यों को केवल याद करने.',
          hint: 'यदि छात्र आलोचनात्मक चिंतन में कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_15_012.',
          misconception: 'छात्र अक्सर कविता के विश्लेषण में केवल शब्दों के शब्दार्थिक अर्थ पर ध्यान देते हैं और रूपक, उपमा, या प्रतीक जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें हम किसी पाठ के तथ्यों को केवल याद करने के बजाय',
                  options: ['आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें हम किसी पाठ के तथ्यों को केवल याद करने के बजाय', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी'],
                  hint: 'यदि छात्र आलोचनात्मक चिंतन में कठिनाई महसूस कर रहा है, तो उसे c12_hin_a_cbse_15_012 (बोध-प्रश्न.',
                  misconception: 'छात्र अक्सर कविता के विश्लेषण में केवल शब्दों के शब्दार्थिक अर्थ पर ध्यान देते हैं और रूपक, उपमा, या प्रतीक जैसे साहित्यिक युक्तियों के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले एक सरल वाक्य दें जिसमें स्पष्ट रूपक हो (जैसे "वह शेर है") और पूछें: "यदि कोई वास्तविक शेर यहाँ नहीं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र NCERT पाठ्यपुस्तक के किसी.',
          hint: 'यदि प्रमाण चुनने में अटकें: **c12_hin_a_cbse_15_008** (बिंब/रूपक) और.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर में पाठ की ज्यादा-से-ज्यादा पंक्तियाँ उद्धृत करने से अंक बढ़ते हैं।"*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र NCERT पाठ्यपुस्तक के किसी गद्य/पद्य अंश को',
                  options: ['पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र NCERT पाठ्यपुस्तक के किसी गद्य/पद्य अंश को', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी'],
                  hint: 'यदि प्रमाण चुनने में अटकें: **c12_hin_a_cbse_15_008** (बिंब/रूपक) और **c12_hin_a_cbse_15_009**.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ-आधारित उत्तर में पाठ की ज्यादा-से-ज्यादा पंक्तियाँ उद्धृत करने से अंक बढ़ते हैं।"* **वास्तविकता:** CBSE मार्किंग.' }
          ],
            remediations: { 'cbse-relevance-depth-of-explanation': { steps: ['**चरण 1:** छात्र से कहें: "अपना लिखा उत्तर पढ़ो और हर पैराग्राफ के आगे लिखो: P / E / E / L — कौन-सा चरण गायब है?" **चरण.', '\'क्यों\' और \'कैसे\' लिखो।" **चरण 3:** **पुनः अभ्यास:** वही प्रश्न, नया उद्धरण, केवल Explanation चरण लिखने को कहें — 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु वह कौशल है जिसमें छात्र पाठ को ध्यान से सुनते या पढ़ते.',
          hint: 'यदि फंसे हुए महसूस हो तो Class 11 के समान पाठों पर चर्चा-बिंदु बनाने की गतिविधि दोहराएँ.',
          misconception: 'छात्र अक्सर मानते हैं कि वाचन-श्रवण में चर्चा-बिंदु तैयार करना बस पाठ के किसी भी वाक्य को दोहराना या अपने व्यक्तिगत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु वह कौशल है जिसमें छात्र पाठ को ध्यान से सुनते या पढ़ते हैं, उसके',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु वह कौशल है जिसमें छात्र पाठ को ध्यान से सुनते या पढ़ते हैं, उसके', '\'जहाँ कोई वापसी नहीं\' के पृष्ठभूमि और रचनाकार परिचय में लेखक के व्यक्तिगत और व्यावसायिक', 'कथानक वह क्रमबद्ध घटनाओं का序列 है जो किसी कहानी में होती हैं, जबकि आख्यान-संरचना वह तरीका', 'पाठ्य-परिवेश वह सामाजिक, सांस्कृतिक, आर्थिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी'],
                  hint: 'यदि फंसे हुए महसूस हो तो Class 11 के समान पाठों पर चर्चा-बिंदु बनाने की गतिविधि दोहराएँ, जैसे.',
                  misconception: 'छात्र अक्सर मानते हैं कि वाचन-श्रवण में चर्चा-बिंदु तैयार करना बस पाठ के किसी भी वाक्य को दोहराना या अपने व्यक्तिगत भावना को बिना कारण बताए.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमज़ोर चर्चा-बिंदु (जैसे "पाठ बहुत भारी था") कैसे कमज़ोर है - क्योंकि यह केवल भावना है, कोई कारण.', 'किस पंक्ति या घटना के कारण?" जब वे किसी विशिष्ट पहलू (जैसे पात्र का अंतिम निर्णय) की ओर इशारा करें, तो कहिए: "अब इसी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
