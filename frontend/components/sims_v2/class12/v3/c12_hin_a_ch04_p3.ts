import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch04_p3: SimDef = {
    id: 'v3_c12_hin_a_ch04_p3',
    title: 'बनारस, दशिा · Part 3/3',
    subtitle: 'Not the ghats — the lane where the city actually lives',
    classLevel: 12, subject: 'hin_a', topic: 'बनारस, दशिा · Part 3/3',
    chapters: ['c12_hin_a_ch04'],
    nodeIds: ['c12_hin_a_cbse_04_013', 'c12_hin_a_cbse_04_014', 'c12_hin_a_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist poetry reader', intro: 'A post-independence poet picks the narrowest space in the city and makes it speak.', goal: 'Read Banaras through Nayi Kavita\'s experimental lens — title as thesis, image over statement.' },
    discovery: {
        question: 'The poem is titled \'Banaras\' — not a highway or a plaza but a narrow lane, a cul-de-sac. What has the title already decided before line one?',
        options: ['The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre', 'Banaras is small', 'Lanes are pretty', 'Nothing — it\'s just a name'],
        answer: 'The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre',
        hook: 'A poet born in 1934 writes under Nayi Kavita\'s contract already broken — no fixed metre, image over statement, ambiguity as value. Where Bhakti verse transmits truth, this poetry enacts the search for it; context isn\'t a crutch, it\'s the knowledge the poem presupposes.',
    },
    teaching: [
        { title: 'बनारस, दशिा — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण काव्य-पंक्तियों के **गर्भित अर्थ, प्रतीकात्मक निहितार्थ, और रचनाकार के अभिप्राय** को तार्किक साक्ष्य सहित उद्घाटित करने की प्रक्रिया है; यह मात्र शब्दार्थ या अनुवाद नहीं, बल्कि.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the cul-de-sac of modernist verse: predict imagery from title and era, weigh ambiguity as method, and feel how the poem speaks from beneath the flyover, not from its span.',
        labels: ['बनारस, दशिा — आशय-स्पष्टीकरण', 'बनारस, दशिा — परीक्षा-उत्तर', 'बनारस, दशिा — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A short-film jury member rejects your submission about a child calling \'Papa — Papa\' toward a father who never comes, saying \'nothing happens — no climax, no arrival, no story.\'',
            decisions: [{ prompt: 'How does the structure of \'फ्नेक\' answer that verdict?', options: [
                { text: 'The climax is internal — the repeated \'पिता-पिता\' at widening intervals spirals the child\'s urgency upward while the father\'s absence grows more total; the non-arrival IS the event, and the final cry is the peak the film was building toward.', outcome: 'The chapter separates external event from structural peak: repetition placed at lengthening intervals propels time and loss forward — \'nothing happening\' is precisely what\'s happening.' },
                { text: 'The juror is right — a climax requires the awaited person to appear or definitively not appear on screen.', outcome: 'That demands an external resolution the poem refuses on purpose: the spiral structure makes absence itself the accumulating force, so an arrival would release the tension the film exists to hold.', reveals: 'climax-needs-arrival' },
                { text: 'Compromise — add a montage of the father elsewhere so the audience at least sees him.', outcome: 'Cutting away breaks the one-point perspective that makes the waiting legible; the poem never leaves the child\'s call because the structure\'s power is that we stay inside the unanswered side.', reveals: 'show-both-sides' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'You can now decode a title before the first line — and read Nayi Kavita\'s broken forms as the broken world\'s true shape.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण काव्य-पंक्तियों के **गर्भित अर्थ, प्रतीकात्मक निहितार्थ, और.',
          hint: 'यदि फँसें तो **c12_hin_a_cbse_04_007** (प्रतीक और बिंब) के \'प्रतीक विश्लेषण तालिका\'.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'आशय-स्पष्टीकरण\' को \'भावार्थ लिखना\' समझते हैं और पंक्तियों का हिंदी अनुवाद करके छोड़ देते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण काव्य-पंक्तियों के **गर्भित अर्थ, प्रतीकात्मक निहितार्थ, और रचनाकार के',
                  options: ['आशय-स्पष्टीकरण काव्य-पंक्तियों के **गर्भित अर्थ, प्रतीकात्मक निहितार्थ, और रचनाकार के', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'यदि फँसें तो **c12_hin_a_cbse_04_007** (प्रतीक और बिंब) के \'प्रतीक विश्लेषण तालिका\' अभ्यास को.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'आशय-स्पष्टीकरण\' को \'भावार्थ लिखना\' समझते हैं और पंक्तियों का हिंदी अनुवाद करके छोड़ देते हैं। **वास्तविकता:**.' }
          ],
            remediations: { '3-5': { steps: ['**चरण 1:** छात्र से कहें: *"पंक्ति पढ़ो और बताओ — कवि ने \'श्मशान\' शब्द क्यों चुना, \'कब्रिस्तान\' या \'मृत्युलोक\' क्यों.', '**चरण 2:** नोड **c12_hin_a_cbse_04_007** (प्रतीक और बिंब) पर वापस जाएँ — वहाँ दिए गए \'प्रतीक विश्लेषण तालिका\' का अभ्यास.', '**चरण 3:** एक ही पंक्ति के दो उत्तर लिखवाएँ: (क) भावार्थ, (ख) आशय — फिर दोनों की तुलना कराएँ। 4.', '**पुनः निदान:** उपरोक्त **DIAGNOSTIC_QUESTION_2** फिर से दें — अब छात्र \'सड़ना\' का प्रतीकात्मक विस्तार (नैतिक क्षय) बता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल वह प्रणालीगत विधि है जिसके द्वारा छात्र पाठ्यक्रम के.',
          hint: 'पाठ के भावार्थ और विश्लेषण (नोड 013) की समीक्षा कीजिए, जहाँ आपने stanza-wise अर्थ और.',
          misconception: 'छात्र अक्सर सोचते हैं कि परीक्षा के उत्तर में केवल प्रश्न का प्रत्यक्ष उत्तर देना पर्याप्त है, जैसे "कवि दुखी है" लिखकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल वह प्रणालीगत विधि है जिसके द्वारा छात्र पाठ्यक्रम के प्रश्नों के',
                  options: ['परीक्षा-उत्तर लेखन कौशल वह प्रणालीगत विधि है जिसके द्वारा छात्र पाठ्यक्रम के प्रश्नों के', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'पाठ के भावार्थ और विश्लेषण (नोड 013) की समीक्षा कीजिए, जहाँ आपने stanza-wise अर्थ और केंद्रीय भाव.',
                  misconception: 'छात्र अक्सर सोचते हैं कि परीक्षा के उत्तर में केवल प्रश्न का प्रत्यक्ष उत्तर देना पर्याप्त है, जैसे "कवि दुखी है" लिखकर पूरा कर देना, बिना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक बोर्ड प्रश्न का मूल्यांकन मानदंड कैसा दिखता है (उदाहरण: CBSE 2023 हिंदी पेपर, प्रश्न 5)। फिर एक.', 'इस प्रक्रिया को दोहराने से छात्र देखेगा कि प्रत्येक चरण कैसे अंक जोड़ता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_015', difficulty: 'standard',
          question: 'वाचन-पाठ (Reading Aloud) कविता को सही उच्चारण, विराम, लय और भाव के साथ जोर से.',
          hint: 'यदि बिंब/प्रतीक पहचानने में अटके तो **c12_hin_a_cbse_04_007 (प्रतीक और बिंब)** के कार्यित.',
          misconception: 'छात्र समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल \'जोर से पढ़ना\' है और \'चर्चा-बिंदु\' का अर्थ \'प्रश्न पूछना\' — जबकि वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ (Reading Aloud) कविता को सही उच्चारण, विराम, लय और भाव के साथ जोर से पढ़ने की',
                  options: ['वाचन-पाठ (Reading Aloud) कविता को सही उच्चारण, विराम, लय और भाव के साथ जोर से पढ़ने की', 'बनारस, दशिा कविता में कवि का परिचय और उसकी पृष्ठभूमि समझना मतलब है कि हम जानते हैं कि कवि', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश को पंक्ति-दर-पंक्ति समझकर उसका', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'यदि बिंब/प्रतीक पहचानने में अटके तो **c12_hin_a_cbse_04_007 (प्रतीक और बिंब)** के कार्यित उदाहरण.',
                  misconception: 'छात्र समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल \'जोर से पढ़ना\' है और \'चर्चा-बिंदु\' का अर्थ \'प्रश्न पूछना\' — जबकि वास्तव में वाचन-पाठ एक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता की पहली पंक्ति पाँच बार रिकॉर्ड करके सुनवाएँ — हर बार एक तत्व सुधारें: (क) उच्चारण, (ख) विराम, (ग) लय.', 'फिर छात्र से कहें: "कविता के किसी एक बिंब को चुनो और बताओ कि वाचन में तुमने उसे कैसे उभारा?" — यदि उत्तर न दे पाए, तो.', 'चर्चा-बिंदु बनाने में कठिनाई हो तो **c12_hin_a_cbse_04_008 (मुख्य भाव और संदेश)** और **c12_hin_a_cbse_04_013.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
