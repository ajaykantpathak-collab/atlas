import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch03_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch03_p3',
    title: 'पाठ 3 · Part 3/3',
    subtitle: 'Watch a first creative act survive its own terror — and its own comedy.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 3 · Part 3/3',
    chapters: ['c11_hin_ar_ch03'],
    nodeIds: ['c11_hin_ar_cbse_03_013', 'c11_hin_ar_cbse_03_014', 'c11_hin_ar_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a first-time creator guarding a small bottle of ink', intro: 'An adult writer looks back at the day everything that could go wrong on a makeshift stage did — and the dream survived anyway.', goal: 'Read the ink bottle as a symbol of fragile creative courage and locate the play-night climax.' },
    discovery: {
        question: 'A story built around a tiny ink bottle — \'दाई साल\' of a first attempt. Just a prop on a desk?',
        options: ['No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins', 'Yes — objects in titles are always decorative', 'No — the ink is secretly magical', 'Yes — the real subject is the writing desk'],
        answer: 'No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins',
        hook: 'The Nayi Kahani writer makes the labour of writing itself the story — doubt, ghosts, landlords and all.',
    },
    teaching: [
        { title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'वीं के साथ बिते लम्हे\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track a first creative attempt through its chaos — the stage, the mix-up of two actors as one \'भूत\' — and ask why the imperfection is the point.',
        labels: ['पाठ 3 — आलोचनात्मक', 'पाठ 3 — लेखन', 'पाठ 3 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_015', title: 'पाठ 3 — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'वीं के साथ बिते लम्हे\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary objective of a \'discussion point\' activity in the CBSE ASL framework for a dramatic text like "viw osQ lkFk <kbZ lky"?', options: [
                { text: 'The primary objective is to assess', outcome: 'The primary objective is to assess a student\'s ability to orally analyze literary elements (theme.' },
                { text: 'to memorize dialogues', outcome: 'Not quite — Students treat "discussion points" as oral summaries — they retell the plot chronologically instead.', reveals: 'students-treat-discussion-points-as' },
                { text: 'to summarize the plot', outcome: 'Not quite — Students treat "discussion points" as oral summaries — they retell the plot chronologically instead.', reveals: 'students-treat-discussion-points-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary magazine plans a feature on \'writers writing about writing.\' A junior editor suggests Ikappiya\'s story but calls it \'a plain autobiography of a struggling writer — Nayi Kahani is just a label to memorise for exams.\'',
            decisions: [{ prompt: 'How do you pitch the story properly?', options: [
                { text: 'Pitch it as the Nayi Kahani sensibility in action: written in 1955, in a newly independent nation redefining its voice, the story rejects romantic idealism for middle-class realism — a writer afraid to dip his pen, the tiny ink bottle as symbol of fragile creation. The retrospective adult narration adds reflection and dramatic irony; the meandering, episode-based structure is the movement\'s rejection of plot-driven storytelling.', outcome: 'The feature now explains why a 1955 story about fearing a blank page matters differently — context turns autobiography into a movement\'s manifesto.' },
                { text: 'Run it as autobiography — the author\'s own struggle told straight, no movement talk needed.', outcome: 'Dropping the Nayi Kahani frame misreads the structure: the episodic drift and reflective hindsight are deliberate craft, not diary habits.', reveals: 'story-is-plain-autobiography' },
                { text: 'Extract a moral instead — \'every writer should just start writing\' — for an inspirational box item.', outcome: 'The story isn\'t a productivity lesson; it\'s about the doubt and precarity of becoming a writer when the nation itself is finding its voice.', reveals: 'story-is-motivation-piece' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'The botched performance isn\'t failure — it\'s proof that art gets made by people who risk wasting their only ink.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_013', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि फँसें, तो **c11_hin_ar_cbse_03_008 (बिंब और रूपक)** और **c11_hin_ar_cbse_03_009.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन = पाठ में कमियाँ निकालना (fault-finding) या अपनी निजी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वीं के साथ बिते लम्हे\' का आलोचनात्मक चिंतन',
                  options: ['\'वीं के साथ बिते लम्हे\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वीं के साथ बिते लम्हे\' का कथानक', '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें, तो **c11_hin_ar_cbse_03_008 (बिंब और रूपक)** और **c11_hin_ar_cbse_03_009 (विरोधाभास और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन = पाठ में कमियाँ निकालना (fault-finding) या अपनी निजी पसंद/नापसंद लिखना।" **गलत.' }
          ],
            remediations: { 'fault-finding': { steps: ['**चरण 1:** छात्र से कहें: "एक वाक्य में बताओ कि लेखक ने *यह विशेष शब्द/बिंब/प्रसंग* क्यों चुना होगा?" — इससे फोकस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_014', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि फँसे तो c11_hin_ar_cbse_03_013 (Critical Thinking) पर लौटें और \'थीम-ट्रैकिंग\' चार्ट.',
          misconception: 'विद्यार्थी समझते हैं कि \'पाठ पर आधारित लेखन कौशल\' का अर्थ है **पाठ का सारांश लिखना** या **पात्रों के नाम गिनाना**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वीं के साथ बिते लम्हे\' पर पाठ-आधारित लेखन',
                  options: ['\'वीं के साथ बिते लम्हे\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वीं के साथ बिते लम्हे\' का कथानक', '\'वीं के साथ बिते लम्हे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसे तो c11_hin_ar_cbse_03_013 (Critical Thinking) पर लौटें और \'थीम-ट्रैकिंग\' चार्ट बनाएँ.',
                  misconception: 'विद्यार्थी समझते हैं कि \'पाठ पर आधारित लेखन कौशल\' का अर्थ है **पाठ का सारांश लिखना** या **पात्रों के नाम गिनाना**। वे PEEL संरचना को \'कठिन\'.' }
          ],
            remediations: { 'peel': { steps: ['विद्यार्थी से कहें: "एक बोर्ड प्रश्न चुनो। उसका उत्तर **बिना पाठ देखे** लिखो। फिर अपने उत्तर में तीन रंगों से चिह्नित.', 'यदि कोई रंग गायब है, वही चरण अभ्यास हेतु चुना जाए। 3.', 'उस चरण का मॉडल उत्तर दिखाएं (ऊपर दिए गए कार्य-उदाहरणों से)। 4.', 'विद्यार्थी को उसी प्रश्न का उत्तर पुनः लिखने दें, इस बार लापता चरण पर ध्यान देकर। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_015', difficulty: 'standard',
          question: '\'वीं के साथ बिते लम्हे\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, review "Critical Thinking: Analysis and Interpretation".',
          misconception: 'Students treat "discussion points" as oral summaries — they retell the plot chronologically instead of analyzing.',
          parts: [
                { id: 'a', prompt: 'What is the primary objective of a \'discussion point\' activity in the CBSE ASL framework for a dramatic text like "viw osQ lkFk <kbZ lky"?', answer: 'The primary objective is to assess',
                  options: ['The primary objective is to assess', 'to memorize dialogues', 'to summarize the plot'],
                  hint: 'If stuck, review "Critical Thinking: Analysis and Interpretation" (c11_hin_ar_cbse_03_013).',
                  misconception: 'Students treat "discussion points" as oral summaries — they retell the plot chronologically instead of analyzing a focused theme, character.' },
                { id: 'b', prompt: 'Explain why the incident of the two different dogs playing "Hkwyks" (pages 36-37) is a more effective discussion starter than the playwright\'s description.', answer: 'The two-dog incident embodies dramatic irony, visual humor, and meta-theatrical',
                  options: ['The two-dog incident embodies dramatic irony, visual humor, and meta-theatrical', 'both are events in the story'],
                  hint: 'If stuck, review "Critical Thinking: Analysis and Interpretation" (c11_hin_ar_cbse_03_013).',
                  misconception: 'Students treat "discussion points" as oral summaries — they retell the plot chronologically instead of analyzing a focused theme, character.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['Model a 60-second "bad discussion" (plot retelling) vs.', '"good discussion" (theme + evidence + question) using the same scene (e.g., the rain disruption).', 'Give students a Discussion Template card: "Claim → Evidence (page/line) → Analysis → Link to Theme → Question for.', 'Practice with low-stakes topics (e.g., "Best/worst rehearsal moment") before literary themes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
