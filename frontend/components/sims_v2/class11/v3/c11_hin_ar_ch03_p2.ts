import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch03_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch03_p2',
    title: 'पाठ 3 · Part 2/3',
    subtitle: 'Watch a first creative act survive its own terror — and its own comedy.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 3 · Part 2/3',
    chapters: ['c11_hin_ar_ch03'],
    nodeIds: ['c11_hin_ar_cbse_03_007', 'c11_hin_ar_cbse_03_008', 'c11_hin_ar_cbse_03_009', 'c11_hin_ar_cbse_03_010', 'c11_hin_ar_cbse_03_011', 'c11_hin_ar_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a first-time creator guarding a small bottle of ink', intro: 'An adult writer looks back at the day everything that could go wrong on a makeshift stage did — and the dream survived anyway.', goal: 'Read the ink bottle as a symbol of fragile creative courage and locate the play-night climax.' },
    discovery: {
        question: 'A story built around a tiny ink bottle — \'दाई साल\' of a first attempt. Just a prop on a desk?',
        options: ['No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins', 'Yes — objects in titles are always decorative', 'No — the ink is secretly magical', 'Yes — the real subject is the writing desk'],
        answer: 'No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins',
        hook: 'The Nayi Kahani writer makes the labour of writing itself the story — doubt, ghosts, landlords and all.',
    },
    teaching: [
        { title: 'पाठ 3 — गौण विषय', text: '\'वीं के साथ बिते लम्हे\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track a first creative attempt through its chaos — the stage, the mix-up of two actors as one \'भूत\' — and ask why the imperfection is the point.',
        labels: ['पाठ 3 — गौण', 'पाठ 3 — साहित्यिक', 'पाठ 3 — पदावली', 'पाठ 3 — व्याकरण', 'पाठ 3 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_009', title: 'पाठ 3 — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'वीं के साथ बिते लम्हे\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define situational irony and give a one-sentence example from daily life (not from the textbook).', options: [
                { text: 'Situational irony occurs when the outcome of a situation is the opposite of what was', outcome: 'Situational irony occurs when the outcome of a situation is the opposite of what was expected.' },
                { text: 'irony is when something funny happens', outcome: 'Not quite — Students often treat *any* unexpected event as irony, ignoring the necessity of a clear.', reveals: 'students-often-treat-any-unexpected' },
                { text: 'the pen *is like* a sword', outcome: 'Not quite — Students often treat *any* unexpected event as irony, ignoring the necessity of a clear.', reveals: 'students-often-treat-any-unexpected' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary magazine plans a feature on \'writers writing about writing.\' A junior editor suggests Ikappiya\'s story but calls it \'a plain autobiography of a struggling writer — Nayi Kahani is just a label to memorise for exams.\'',
            decisions: [{ prompt: 'How do you pitch the story properly?', options: [
                { text: 'Pitch it as the Nayi Kahani sensibility in action: written in 1955, in a newly independent nation redefining its voice, the story rejects romantic idealism for middle-class realism — a writer afraid to dip his pen, the tiny ink bottle as symbol of fragile creation. The retrospective adult narration adds reflection and dramatic irony; the meandering, episode-based structure is the movement\'s rejection of plot-driven storytelling.', outcome: 'The feature now explains why a 1955 story about fearing a blank page matters differently — context turns autobiography into a movement\'s manifesto.' },
                { text: 'Run it as autobiography — the author\'s own struggle told straight, no movement talk needed.', outcome: 'Dropping the Nayi Kahani frame misreads the structure: the episodic drift and reflective hindsight are deliberate craft, not diary habits.', reveals: 'story-is-plain-autobiography' },
                { text: 'Extract a moral instead — \'every writer should just start writing\' — for an inspirational box item.', outcome: 'The story isn\'t a productivity lesson; it\'s about the doubt and precarity of becoming a writer when the nation itself is finding its voice.', reveals: 'story-is-motivation-piece' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'The botched performance isn\'t failure — it\'s proof that art gets made by people who risk wasting their only ink.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_007', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो \'मुख्य विषय और संदेश\' (नोड 006) और \'पात्र-चित्रण\' (नोड 004, 005) दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "गौण विषय = उपकथानक (sub-plot)" और दोनों को समानार्थी समझकर उत्तर लिख देते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वीं के साथ बिते लम्हे\' के गौण विषय',
                  options: ['\'वीं के साथ बिते लम्हे\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वीं के साथ बिते लम्हे\' का कथानक', '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो \'मुख्य विषय और संदेश\' (नोड 006) और \'पात्र-चित्रण\' (नोड 004, 005) दोबारा पढ़ें — विशेष.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "गौण विषय = उपकथानक (sub-plot)" और दोनों को समानार्थी समझकर उत्तर लिख देते हैं। **गलत तर्क:**.' }
          ],
            remediations: { 'sub-plot-sub-plot': { steps: ['**स्पष्टीकरण (2 मिनट):** बोर्ड पर लिखें — "उपकथानक = *क्या होता है* (घटनाएँ); गौण विषय = *क्या अर्थ निकलता है*.', '**अभ्यास (5 मिनट):** पाठ 3 से 3 प्रसंग दें, छात्र से प्रत्येक के लिए लिखवाएं: (क) घटना/उपकथानक, (ख) उससे जुड़ा गौण.', '**उत्तर-लेखन (10 मिनट):** एक बोर्ड-शैली प्रश्न दें: "पाठ 3 में किन्हीं दो उपकथानकों के माध्यम से उभरे गौण विषयों की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_008', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटका हुआ महसूस हो तो **\'पाठ 3 — मुख्य विषय और संदेश\' (c11_hin_ar_cbse_03_006)**.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **हर तुलना रूपक होती है** और **बिंब केवल \'सुंदर वर्णन\' के लिए होते हैं**। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वीं के साथ बिते लम्हे\' में बिंब (imagery)',
                  options: ['\'वीं के साथ बिते लम्हे\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वीं के साथ बिते लम्हे\' का कथानक', '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'पाठ 3 — मुख्य विषय और संदेश\' (c11_hin_ar_cbse_03_006)** दोहराएं और.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **हर तुलना रूपक होती है** और **बिंब केवल \'सुंदर वर्णन\' के लिए होते हैं**। **गलत तर्क का उदाहरण**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पृथक्करण अभ्यास**: छात्र को 10 वाक्य दें (मिश्रित: उपमा, रूपक, केवल बिंब, साधारण कथन)। उससे कहें: *"केवल वही वाक्य.', '**इंद्रिय-मानचित्रण (Sensory Mapping)**: एक काव्यांश देकर कहें: *"हर पंक्ति के आगे लिखो: कौन-सी इंद्रिय जागी?', '(आँख/कान/नाक/त्वचा/जिह्वा)"* — इससे बिंब का **इंद्रिय-आधार** पक्का होगा। 3.', '**कार्य-प्रदर्शन (Function Demo)**: वही रूपक ("क्रोध भट्टी है") लेकर पूछें: *"अगर \'भट्टी\' की जगह \'आग\' रख दें तो क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_009', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'Revisit the plot-summary node (c11_hin_ar_cbse_03_002) for event order, and the.',
          misconception: 'Students often treat *any* unexpected event as irony, ignoring the necessity of a clear expectation-reality clash.',
          parts: [
                { id: 'a', prompt: 'Compare the irony in the pen-failure episode (opening) with the irony in the doll episode (middle).', answer: 'The opening uses situational irony (tool fails the professional)',
                  options: ['The opening uses situational irony (tool fails the professional)', 'situational', 'internal conflict', 'the pen *is like* a sword'],
                  hint: 'Revisit the plot-summary node (c11_hin_ar_cbse_03_002) for event order, and the imagery/metaphor.',
                  misconception: 'Students often treat *any* unexpected event as irony, ignoring the necessity of a clear expectation-reality clash.' }
          ],
            remediations: { 'students-often-treat-any-unexpected': { steps: ['**Isolate the expectation**: Have the student complete the sentence "The writer expected ______, but ______ happened".', '**Symbol hunt**: Give a list of 5 recurring objects (pen, doll, storm, portraits, lighthouse).', 'For each, ask: "If this object were a message, what would it say?" 3.', '**Type-sorting**: Provide 4 short scenarios (2 ironic, 2 coincidental).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat *any* unexpected event as irony, ignoring the necessity of a clear expectation-reality clash.',
          parts: [
                { id: 'a', prompt: 'Critique this student statement: "The pen is a symbol of writing, so the whole story is just about writing." Is this a sufficient symbolic reading? Justify.', answer: 'No, it is reductive',
                  options: ['No, it is reductive', 'the pen *is like* a sword'],
                  hint: 'Revisit the plot-summary node (c11_hin_ar_cbse_03_002) for event order, and the imagery/metaphor.',
                  misconception: 'Students often treat *any* unexpected event as irony, ignoring the necessity of a clear expectation-reality clash.' },
                { id: 'b', prompt: 'Write a 4-line micro-story that uses *both* situational irony and a symbol (choose any object) to convey the theme "unexpected help."', answer: 'Example: "The lighthouse keeper forgot to light the lamp',
                  options: ['Example: "The lighthouse keeper forgot to light the lamp', 'the pen *is like* a sword'],
                  hint: 'Revisit the plot-summary node (c11_hin_ar_cbse_03_002) for event order, and the imagery/metaphor.',
                  misconception: 'Students often treat *any* unexpected event as irony, ignoring the necessity of a clear expectation-reality clash.' }
          ],
            remediations: { 'students-often-treat-any-unexpected': { steps: ['**Isolate the expectation**: Have the student complete the sentence "The writer expected ______, but ______ happened".', '**Symbol hunt**: Give a list of 5 recurring objects (pen, doll, storm, portraits, lighthouse).', 'For each, ask: "If this object were a message, what would it say?" 3.', '**Type-sorting**: Provide 4 short scenarios (2 ironic, 2 coincidental).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_010', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी.',
          hint: 'If stuck, re-read pages 32-34 (the prelude to premiere) and 35-38 (the premiere night).',
          misconception: 'Students treat the \'kCn&Nfo\' list as a glossary to memorize (word → single Hindi meaning) rather than as textual.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वीं के साथ बिते लम्हे\' की पदावली',
                  options: ['\'वीं के साथ बिते लम्हे\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वीं के साथ बिते लम्हे\' का कथानक', '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, re-read pages 32-34 (the prelude to premiere) and 35-38 (the premiere night) - these.',
                  misconception: 'Students treat the \'kCn&Nfo\' list as a glossary to memorize (word → single Hindi meaning) rather than as textual anchors requiring.' }
          ],
            remediations: { 'students-treat-the-kcn-nfo': { steps: ['Have the student locate ONE word (e.g., \'unkjn\') in the text using Ctrl+F or manual scan.', 'Read 3 sentences before and after.', 'Ask: "What is the SPECIFIC situation? What does the word DO here - name, describe, judge, metaphorize?"', 'Compare with dictionary meaning.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_011', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_03_010 (पदावली: मुख्य शब्द) पर लौटकर.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल **शब्दों की सूची बनाना** (तत्सम, तद्भव, देशज गिनना) या **व्याकरण दोष.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वीं के साथ बिते लम्हे\' में भाषा-प्रयोग',
                  options: ['\'वीं के साथ बिते लम्हे\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वीं के साथ बिते लम्हे\' का कथानक', '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_03_010 (पदावली: मुख्य शब्द) पर लौटकर शब्द-वर्गीकरण का.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल **शब्दों की सूची बनाना** (तत्सम, तद्भव, देशज गिनना) या **व्याकरण दोष ढूँढ़ना** (वर्तनी, संधि).' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "पाठ 3 खोलो और पृष्ठ 12-13 पर नायक के दो संवाद ढूँढ़ो: एक जहाँ वह गुस्से में है, एक जहाँ वह उदास.', 'कोई मुहावरा है?" चरण 3: एक टेबल बनवाएँ — कॉलम: प्रसंग / क्रिया-रूप / वाक्य-लंबाई / मुहावरा / प्रभाव। चरण 4: छात्र खुद.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_012', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_03_006 (मुख्य विषय और संदेश)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"आशय-सूचक प्रश्न का उत्तर = पाठ का सारांश (summary)"**। वे सोचते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वीं के साथ बिते लम्हे\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'वीं के साथ बिते लम्हे\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वीं के साथ बिते लम्हे\' का कथानक', '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_03_006 (मुख्य विषय और संदेश)** और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"आशय-सूचक प्रश्न का उत्तर = पाठ का सारांश (summary)"**। वे सोचते हैं कि प्रसंग दोहराना ही.' }
          ],
            remediations: { 'summary-class-10-plot-retelling': { steps: ['**पहला कदम:** छात्र को एक ही प्रसंग पर **दो प्रश्न** दें — एक वस्तुनिष्ठ ("नायक ने दरवाजा कब बंद किया?"), एक आशय-सूचक.', '**दूसरा कदम:** दोनों उत्तरों की **तुलना** करवाएँ: पहले में \'कब/क्या\' (तथ्य), दूसरे में \'क्यों/क्या प्रतीक\' (व्याख्या.', '**तीसरा कदम:** छात्र से कहें कि वह आशय-सूचक उत्तर में **PEEL** चिह्नित करे — P (कथन), E (उद्धरण), E (व्याख्या), L (विषय.', '**चौथा कदम:** अगले 3 दिन तक रोज 1 आशय-सूचक प्रश्न का **PEEL-आधारित उत्तर** लिखने का अभ्यास करवाएँ; शिक्षक केवल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
