import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch01_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch01_p3',
    title: 'izsepan · Part 3/3',
    subtitle: 'Read a chess game as the diagnosis of a kingdom already lost.',
    classLevel: 11, subject: 'hin_ar', topic: 'izsepan · Part 3/3',
    chapters: ['c11_hin_ar_ch01'],
    nodeIds: ['c11_hin_ar_cbse_01_013', 'c11_hin_ar_cbse_01_014', 'c11_hin_ar_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a kingdom fall one move at a time', intro: 'In 1856 Lucknow two nobles chase checkmate while the Company chases the crown — and Premchand refuses to tell you whom to blame.', goal: 'Analyse feudal decay as systemic, not personal, and evaluate Premchand\'s deliberate historical distortion.' },
    discovery: {
        question: 'Two nobles play chess while the British annex Awadh — are Mir and Roshan the villains of \'Shatranj ke Khiladi\'?',
        options: ['No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab', 'Yes — their chess obsession alone destroyed the kingdom', 'Yes — they are the story\'s clear antagonists', 'No — the British officer is the story\'s only villain'],
        answer: 'No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab',
        hook: 'Premchand wrote 1856 from inside 1924 — the \'polite\' annexation mirrors the reformist colonial rhetoric of his own time.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text beyond its literal meaning to evaluate the author\'s choices, underlying themes, character motivations, social commentary, and the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_01_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Hold the three timelines — 1856 Lucknow, 1924 India, today — and weigh whether shrinking Wajid Ali Shah to a caged bird is a historical error or an artistic necessity.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re reading a news report about a government hospital project where funds were misused.',
            decisions: [{ prompt: 'What is the central conflict in "Ud ka Nankshik" between Dr. Vyaksihnhu and the bureaucratic system represented by Aakhaji?', options: [
                { text: 'The central conflict is between Dr', outcome: 'The central conflict is between Dr. Vyaksihnhu\'s idealistic commitment to genuine service and the.' },
                { text: 'it\'s about building a hospital', outcome: 'Not quite — Students often think "critical analysis" means finding faults with the story or criticizing.', reveals: 'critical-analysis-means-finding-faults' },
                { text: 'they dislike each other', outcome: 'Not quite — Students often think "critical analysis" means finding faults with the story or criticizing.', reveals: 'critical-analysis-means-finding-faults' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you open your board exam paper and see: "व्याख्या कीजिए कि \'उद का नक्शा\' में व्याकुल व्यासिंह ने किस प्रकार औपनिवेशिक सत्ता का प्रतिरोध किया" - your.',
            decisions: [{ prompt: 'What does the \'P\' in PEEL stand for, and what is its specific function in a board exam answer for Hindi literature?', options: [
                { text: '\'P\' stands for **Point** - a clear, one-sentence thesis statement that directly answers', outcome: '\'P\' stands for **Point** - a clear, one-sentence thesis statement that directly answers the.' },
                { text: 'Point means the main idea of the story', outcome: 'Not quite — Students believe "good writing" in Hindi literature means using **difficult Sanskritised.', reveals: 'good-writing-in-hindi-literature' },
                { text: 'good writing', outcome: 'Not quite — Students believe "good writing" in Hindi literature means using **difficult Sanskritised.', reveals: 'good-writing-in-hindi-literature' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine your teacher announces a class discussion on whether the protagonist Vyaksihnhu\'s rebellion against the colonial education system was justified.',
            decisions: [{ prompt: 'What is the primary purpose of a \'discussion point\' in a Class 11 speaking and listening activity based on a literary text?', options: [
                { text: 'A discussion point is a focused, arguable claim about the text that', outcome: 'A discussion point is a focused, arguable claim about the text that a student prepares in advance.' },
                { text: 'It\'s just my opinion on the story', outcome: 'Not quite — Students believe a discussion is a series of isolated speeches where each person states their.', reveals: 'a-discussion-is-a-series' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is staging a reading of Premchand\'s \'Shatranj ke Khiladi\'. The director wants to stage it as \'a comedy about two chess-obsessed nobles in old Lucknow — period fun, nothing more.\' You sense the 1856 setting is doing heavier work.',
            decisions: [{ prompt: 'What reading should the production take?', options: [
                { text: 'Stage it as national allegory: Premchand wrote in 1924 — Non-Cooperation rising, Jallianwala Bagh fresh — and chose 1856 Awadh deliberately. The chessboard is a structural device: while Mirza and Mir move pieces, the kingdom is annexed without a shot — aristocratic decadence mirroring the \'polite\' colonial takeover the audience of 1924 would recognise in their own moment.', outcome: 'The comedy turns sharp: context isn\'t backdrop, it\'s the prism that makes chess-playing during a collapse mean political paralysis.' },
                { text: 'Go with the comedy reading — the story\'s humour about chess addicts carries itself without history lessons.', outcome: 'Stripping the 1856/1924 double timeline reduces a critique of feudal and colonial complicity to costume farce.', reveals: 'chess-players-is-just-comedy' },
                { text: 'Present it as a moral tale — chess is a vice, so the nobles deserved to lose their kingdom.', outcome: 'The game is a metaphor for paralysis, not a sin being punished; Premchand indicts a system\'s decadence, not a hobby.', reveals: 'chess-is-the-vice' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'An older Premchand story gave vice and virtue clear names; here nobody is clean — which is exactly what systemic decay looks like.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text beyond its.',
          hint: 'Review the distinction between "what the text says" vs "what the text means" using.',
          misconception: 'Students often think "critical analysis" means finding faults with the story or criticizing characters\' decisions.',
          parts: [
                { id: 'a', prompt: 'What is the central conflict in "Ud ka Nankshik" between Dr. Vyaksihnhu and the bureaucratic system represented by Aakhaji?', answer: 'The central conflict is between Dr',
                  options: ['The central conflict is between Dr', 'it\'s about building a hospital', 'they dislike each other', 'critical analysis'],
                  hint: 'Review the distinction between "what the text says" vs "what the text means" using a simple fable.',
                  misconception: 'Students often think "critical analysis" means finding faults with the story or criticizing characters\' decisions. They write "Dr.' }
          ],
            remediations: { 'critical-analysis-means-finding-faults': { steps: ['Clarify the meaning of "critical" in academic context—it means analytical, not negative.', 'Model the difference: Show a "criticism" ("I didn\'t like the ending") vs.', '"critical analysis" ("The ending serves to highlight the impossibility of integrity in a corrupt system").', 'Practice with a familiar text (e.g., a well-known movie scene)—ask "What is the filmmaker trying to say?" not "Was this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "critical analysis" means finding faults with the story or criticizing characters\' decisions.',
          parts: [
                { id: 'a', prompt: 'Critique the story\'s ending: Is Dr. Vyaksihnhu\'s resignation a moral victory or a practical failure? Defend your position with textual evidence.', answer: 'It is a moral victory',
                  options: ['It is a moral victory', 'critical analysis', 'critical', 'critical thinking'],
                  hint: 'Review the distinction between "what the text says" vs "what the text means" using a simple fable.',
                  misconception: 'Students often think "critical analysis" means finding faults with the story or criticizing characters\' decisions. They write "Dr.' }
          ],
            remediations: { 'critical-analysis-means-finding-faults': { steps: ['Clarify the meaning of "critical" in academic context—it means analytical, not negative.', 'Model the difference: Show a "criticism" ("I didn\'t like the ending") vs.', '"critical analysis" ("The ending serves to highlight the impossibility of integrity in a corrupt system").', 'Practice with a familiar text (e.g., a well-known movie scene)—ask "What is the filmmaker trying to say?" not "Was this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter "इजसेपन" refers to the ability to compose.',
          hint: 'If stuck, review c11_hin_ar_cbse_01_013 (Critical Thinking) to practice extracting.',
          misconception: 'Students believe "good writing" in Hindi literature means using **difficult Sanskritised vocabulary** (e.g., "प्रतिफल".',
          parts: [
                { id: 'a', prompt: 'Apply the PEEL framework to answer: "उद का नक्शा में व्याकुल व्यासिंह का चरित्र-चित्रण कीजिए।" Write only the **Point** and **Evidence** sentences for the.', answer: '**Point:** व्याकुल व्यासिंह का चरित्र निडरता और स्वाभिमान की प्रतिमूर्ति है।',
                  options: ['**Point:** व्याकुल व्यासिंह का चरित्र निडरता और स्वाभिमान की प्रतिमूर्ति है।', 'वह बहुत बहादुर थे', 'good writing', 'प्रतिफल'],
                  hint: 'If stuck, review c11_hin_ar_cbse_01_013 (Critical Thinking) to practice extracting analytical.',
                  misconception: 'Students believe "good writing" in Hindi literature means using **difficult Sanskritised vocabulary** (e.g., "प्रतिफल" instead of "परिणाम".' },
                { id: 'b', prompt: 'Compare these two Explanation sentences for the same evidence (Vyaksihnhu quitting job): (A) "इससे पता चलता है कि वे डरे नहीं।" (B) "नौकरी त्यागकर व्यासिंह ने.', answer: '**(B)** meets Class 11 depth',
                  options: ['**(B)** meets Class 11 depth', 'good writing', 'प्रतिफल', 'परिणाम'],
                  hint: 'If stuck, review c11_hin_ar_cbse_01_013 (Critical Thinking) to practice extracting analytical.',
                  misconception: 'Students believe "good writing" in Hindi literature means using **difficult Sanskritised vocabulary** (e.g., "प्रतिफल" instead of "परिणाम".' }
          ],
            remediations: { 'good-writing-in-hindi-literature': { steps: ['**Diagnose:** Ask the student to underline every "fancy word" in their last answer and replace each with the simplest.', 'If meaning stays intact, the fancy word was decorative, not analytical.', '**Retrain:** Give a 3-sentence weak answer loaded with Sanskritised words.', 'Have the student rewrite it using *only* words from the NCERT textbook glossary (शब्द-कोश) - this forces precision over.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review the \'Critical Thinking: Analysis and Interpretation\' node.',
          misconception: 'Students believe a discussion is a series of isolated speeches where each person states their opinion.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a \'discussion point\' in a Class 11 speaking and listening activity based on a literary text?', answer: 'A discussion point is a focused, arguable claim about the text that',
                  options: ['A discussion point is a focused, arguable claim about the text that', 'It\'s just my opinion on the story'],
                  hint: 'If stuck, review the \'Critical Thinking: Analysis and Interpretation\' node (c11_hin_ar_cbse_01_013).',
                  misconception: 'Students believe a discussion is a series of isolated speeches where each person states their opinion.' }
          ],
            remediations: { 'a-discussion-is-a-series': { steps: ['Model a 3-turn mini-discussion with a volunteer: You make a claim with evidence → Student responds by referencing your.', 'Give the student a \'Discussion Tracker\' sheet with columns: \'Peer\'s Point\', \'Evidence They Used\', \'My Response.', 'Practice with a low-stakes topic (e.g., "Should the village have supported Vyaksihnhu?") using the tracker.', 'Debrief: "Notice how your response changed when you had to write down their evidence first."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
