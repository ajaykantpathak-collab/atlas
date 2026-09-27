import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch10_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch10_p3',
    title: 'पाठ 10 · Part 3/3',
    subtitle: 'Read a devotional poem as a plot of the soul, not a description of love.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 10 · Part 3/3',
    chapters: ['c11_hin_ar_ch10'],
    nodeIds: ['c11_hin_ar_cbse_10_013', 'c11_hin_ar_cbse_10_014', 'c11_hin_ar_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sakhi listening to Meera narrate her undoing', intro: 'Eyes rolling in trance, love-fever, body wasting, ornaments off — a whole renunciation compressed into a few stanzas.', goal: 'Analyse the poem\'s internal narrative progression from devotion to total renunciation.' },
    discovery: {
        question: '\'Nothing happens in Meera\'s poem — she just says she loves Krishna.\' Is that a fair critique?',
        options: ['No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union', 'Yes — a poem needs visible action to have a plot', 'Yes — devotion is a state, not a story', 'No — because she physically dances in stanza two'],
        answer: 'No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union',
        hook: 'Bhakti verse plots the soul\'s trajectory, not the body\'s — \'discarding jewellery\' is the poem\'s rising action, abandonment is its climax.',
    },
    teaching: [
        { title: 'पाठ 10 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के आंतरिक तर्क, संरचना, भाषा-प्रयोग और अंतर्निहित मान्यताओं का व्यवस्थित विश्लेषण और व्याख्या करने की बौद्धिक प्रक्रिया है, जिसमें पाठ के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace Meera\'s stanzas from a mind fixed on Giridhar to the shedding of every social marker, and defend the poem\'s narrative arc against \'nothing happens.\'',
        labels: ['पाठ 10 — आलोचनात्मक', 'पाठ 10 — लेखन', 'पाठ 10 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_10_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 3/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश या काव्यांश के आधार.', answer: '10 -', options: ['10 -', '10 - -'] },
            { id: 's2', label: '10 - -', prompt: 'Which idea is this? — "वाचन-श्रवण: चर्चा-बिंदु" refers to the structured pedagogical process where students.', answer: '10 - -', options: ['10 - -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a poetry-analysis session, a student presents Meera\'s bhajan and concludes: \'Nothing happens — Meera just describes her feelings. No events, no plot, so there\'s no structure to analyse.\'',
            decisions: [{ prompt: 'How do you show the poem\'s narrative architecture?', options: [
                { text: 'Trace the soul\'s trajectory: the bhakti \'plot\' is internal progression — stanza 1 establishes the mind fixed on Giridhar, stanza 2 shows the enacted consequences (body wasting, ornaments discarded — a real social rupture, not description), stanza 3 climaxes in the direct plea to stop worldly questioning. Each stanza escalates the renunciation — structure as spiritual arc from devotion to surrender.', outcome: 'The poem gains its plot: discarding ornaments isn\'t imagery but an enacted climax — bhakti narrative maps the devotee\'s journey, not external events.' },
                { text: 'Concede the point — lyric poems express emotion, they don\'t tell stories, so skip structure.', outcome: 'Lyric isn\'t structureless: emotional escalation with deliberate ordering is a narrative arc — \'no events\' confuses external action with inner plot.', reveals: 'lyric-has-no-plot' },
                { text: 'Invent a plot instead — narrate Meera\'s biography (marriage, leaving the palace) as the poem\'s storyline.', outcome: 'That\'s biography, not this text\'s structure: the poem compresses a whole renunciation into inner beats; importing her life story replaces analysis with anecdote.', reveals: 'biography-is-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'The stanza that wastes the body and drops the ornaments *is* the plot — renunciation told as a sequence of irreversible acts.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के आंतरिक तर्क.',
          hint: 'यदि फँस जाएँ तो **\'साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक\' (c11_hin_ar_cbse_10_009)**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि आलोचनात्मक चिंतन का अर्थ है **"पाठ में कमियाँ निकालना"** (fault-finding) या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के आंतरिक तर्क, संरचना,',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति के आंतरिक तर्क, संरचना,', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and'],
                  hint: 'यदि फँस जाएँ तो **\'साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक\' (c11_hin_ar_cbse_10_009)** और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि आलोचनात्मक चिंतन का अर्थ है **"पाठ में कमियाँ निकालना"** (fault-finding) या **"अपनी राय देना"**.' }
          ],
            remediations: { 'fault-finding-giving-opinion': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**भाषा बदलें:** छात्र से कहें — "अब से \'अच्छी/बुरी\', \'पसंद/नापसंद\', \'सही/गलत\' शब्द **वर्जित** हैं। इनके स्थान पर प्रयोग.', '**साक्ष्य-आधारित अभ्यास:** एक छोटा अंश दें और कहें — "केवल **तीन भाषाई विशेषताएँ** (शब्द चयन, वाक्य विन्यास, बिंब.', '**\'क्यों\' की श्रृंखला:** छात्र के हर कथन पर पूछें — "पाठ में **कहाँ** लिखा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश या.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_10_013 (आलोचनात्मक चिंतन)** और **c11_hin_ar_cbse_10_006.',
          misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर में पाठ के **महत्वपूर्ण शब्द/वाक्य उद्धृत (Quote) कर देना ही पर्याप्त Evidence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश या काव्यांश के आधार',
                  options: ['पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें छात्र किसी दिए गए गद्यांश या काव्यांश के आधार', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_10_013 (आलोचनात्मक चिंतन)** और **c11_hin_ar_cbse_10_006 (मुख्य.',
                  misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर में पाठ के **महत्वपूर्ण शब्द/वाक्य उद्धृत (Quote) कर देना ही पर्याप्त Evidence है।**" **गलत तर्क:**.' }
          ],
            remediations: { 'quote-evidence': { steps: ['**चरण 1:** छात्र से कहें — "अपना लिखा उत्तर पढ़ो और हर वाक्य के आगे लिखो: यह Point है / Evidence है / Explanation है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_015', difficulty: 'standard',
          question: '"वाचन-श्रवण: चर्चा-बिंदु" refers to the structured pedagogical process where.',
          hint: 'Review c11_hin_ar_cbse_10_013\'s "Evidence vs. Interpretation" drill and.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "चर्चा-बिंदु" का उत्तर देने का अर्थ है पाठ में से *सही उत्तर ढूंढना* (finding.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"वाचन-श्रवण: चर्चा-बिंदु" refers to the structured pedagogical process where students',
                  options: ['"वाचन-श्रवण: चर्चा-बिंदु" refers to the structured pedagogical process where students', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (Cause-Effect) से बंधा तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश (Textual Environment) refers to the total physical, social, cultural, and'],
                  hint: 'Review c11_hin_ar_cbse_10_013\'s "Evidence vs. Interpretation" drill and c11_hin_ar_cbse_10_004\'s.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "चर्चा-बिंदु" का उत्तर देने का अर्थ है पाठ में से *सही उत्तर ढूंढना* (finding the right answer).' }
          ],
            remediations: { 'finding-the-right-answer': { steps: ['**चरणबद्ध उपचार:** 1) **पृथक्करण अभ्यास (Separation Drill):** छात्र को 5 वाक्य दें — 3 तथ्यात्मक (factual), 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
