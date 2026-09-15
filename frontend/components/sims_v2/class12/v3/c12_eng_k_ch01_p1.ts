import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch01_p1: SimDef = {
    id: 'v3_c12_eng_k_ch01_p1',
    title: 'I Sell My Dreams (Short Story) · Part 1/3',
    subtitle: 'She paid the rent with prophecies — and a wave proved her right',
    classLevel: 12, subject: 'eng_k', topic: 'I Sell My Dreams (Short Story) · Part 1/3',
    chapters: ['c12_eng_k_ch01'],
    nodeIds: ['c12_eng_k_cbse_01_001', 'c12_eng_k_cbse_01_002', 'c12_eng_k_cbse_01_003', 'c12_eng_k_cbse_01_004', 'c12_eng_k_cbse_01_005', 'c12_eng_k_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Latin American literature reader', intro: 'A woman dreams, warns, survives — and nobody in the story finds it strange. Welcome to magical realism.', goal: 'Situate I Sell My Dreams in Marquez\'s magical realism and its dual settings, reading the dream-trade against history.' },
    discovery: {
        question: 'In post-war Vienna — a city of spies, refugees and black markets — a woman earns her living selling her dreams. Why does that setting make the trade plausible?',
        options: ['Chaos craves certainty — a city of displacement and espionage is exactly where prophecy becomes a sellable commodity', 'Dreams were currency back then', 'Vienna banned other jobs for women', 'It\'s a random backdrop'],
        answer: 'Chaos craves certainty — a city of displacement and espionage is exactly where prophecy becomes a sellable commodity',
        hook: 'Magical realism isn\'t fantasy — the impossible is told in a reporter\'s flat voice. Marquez was a journalist; the Havana disaster opens like a news dispatch, and Frau Frieda\'s prophetic dreams are treated as ordinary employment. Blur that register and you misread the whole story.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory section that provides essential information about the author, the literary movement, historical setting, and key concepts to help students.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Straddle two worlds — spy-ring Vienna and hurricane-hit Havana: map the frame narrative, weigh Neruda\'s rationality against Frau Frieda\'s gift, and decide whether her dreams are prophecy or survival strategy.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start by asking: "Have you ever had a dream that felt so real it changed your decision the next day?" Connect to the story\'s premise of a woman who sells her.',
            decisions: [{ prompt: 'Who is the author of "I Sell My Dreams," and what major literary prize did he win?', options: [
                { text: 'The author is Gabriel Garcia Marquez, a Colombian novelist, short-story writer, and', outcome: 'The author is Gabriel Garcia Marquez, a Colombian novelist, short-story writer, and journalist who.' },
                { text: 'Before You Read', outcome: 'Not quite — Students often think "Before You Read" is just a summary of the story.', reveals: 'before-you-read-is-just' },
                { text: 'another Latin American writer like Borges or Allende', outcome: 'Not quite — Students often think "Before You Read" is just a summary of the story.', reveals: 'before-you-read-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a mystery series where the first scene shows a dramatic car crash, then jumps to a conversation from 30 years earlier, then to a lunch.',
            decisions: [{ prompt: 'What is the framing device in "I Sell My Dreams," and which event serves as the outer frame that opens and closes the narrative?', options: [
                { text: 'The framing device is the Havana Riviera Hotel disaster', outcome: 'The framing device is the Havana Riviera Hotel disaster — a massive wave embedding a car in the.' },
                { text: 'the Vienna flashback', outcome: 'Not quite — Students often believe the story has three *separate* flashbacks (Vienna, Barcelona, Havana) all.', reveals: 'the-story-has-three-separate' },
                { text: 'the Barcelona meeting', outcome: 'Not quite — Students often believe the story has three *separate* flashbacks (Vienna, Barcelona, Havana) all.', reveals: 'the-story-has-three-separate' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are a detective trying to solve a mystery: is Frau Frieda a genuine mystic or a brilliant con artist?',
            decisions: [{ prompt: 'What is the literal meaning of the name "Frau Frieda" and why do the Latin American students in Vienna give her this name?', options: [
                { text: '"Frau Frieda" is a Germanic tongue-twister invented by the Latin American students', outcome: '"Frau Frieda" is a Germanic tongue-twister invented by the Latin American students because she.' },
                { text: 'it\'s her birth name', outcome: 'Not quite — Students often treat Frau Frieda as either a "real witch" or a "total fraud" — a binary that misses.', reveals: 'students-often-treat-frau-frieda' },
                { text: 'it means \'peaceful lady\'', outcome: 'Not quite — Students often treat Frau Frieda as either a "real witch" or a "total fraud" — a binary that misses.', reveals: 'students-often-treat-frau-frieda' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re telling a friend about a movie where a character claims to predict the future through dreams — you\'d naturally ask: "But did the dreams.',
            decisions: [{ prompt: 'What is the single most accurate statement of the primary theme of "I Sell My Dreams"?', options: [
                { text: 'Correct answer: The primary theme is the power of belief and superstition to shape human', outcome: 'Correct answer: The primary theme is the power of belief and superstition to shape human behaviour.' },
                { text: 'The story is about a woman who sells her dreams to make money', outcome: 'Not quite — Students often think "identifying the theme" means spotting a *topic* like "dreams".', reveals: 'identifying-the-theme-means-spotting' },
                { text: 'identifying the theme', outcome: 'Not quite — Students often think "identifying the theme" means spotting a *topic* like "dreams".', reveals: 'identifying-the-theme-means-spotting' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A colleague had a vivid dream about a train derailment and wants the whole team to cancel tomorrow\'s site visit. Márquez\'s dream-seller is suddenly the office\'s most quoted source.',
            decisions: [{ prompt: 'Cancel on a dream?', options: [
                { text: 'No — dreams are stories the mind tells, not evidence about the world; check the actual safety record and travel advisories, and treat the dream as a prompt to verify, not to obey.', outcome: 'Frau Frieda\'s dreams sell because they feel prophetic; real decisions still need checkable facts, not portents.' },
                { text: 'Cancel — dreams have predicted things before, so why risk it.', outcome: 'One uncanny hit among thousands of forgotten dreams is an anecdote, not a forecasting system.', reveals: 'anecdote-as-evidence' },
                { text: 'Ignore it entirely — feelings about a trip are irrational noise.', outcome: 'Dismissing the anxiety hides a legitimate prompt to double-check real risks; the dream is data about the dreamer.', reveals: 'dismiss-the-signal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the fantastic as fact and hear how a Nobel journalist-novelist fuses reportage with prophecy. Magical realism stops being a label and becomes a lens.',
            decisions: [{ prompt: 'What comes next? I Sell My Dreams (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — I Sell My Dreams (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory section that.',
          hint: 'Review "Before You Read" sections from Class 11 Hornbill (c11_eng_h_cbse_01_001).',
          misconception: 'Students often think "Before You Read" is just a summary of the story.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" is a preparatory section that provides',
                  options: ['"Before You Read: Context and Background" is a preparatory section that provides', 'Plot refers to the sequence of events as presented in the narrative, while narrative', 'Setting in "I Sell My Dreams" refers to the specific geographical locations (Havana,', 'Character analysis of the protagonist involves examining the central character\'s traits,'],
                  hint: 'Review "Before You Read" sections from Class 11 Hornbill (c11_eng_h_cbse_01_001) to practice.',
                  misconception: 'Students often think "Before You Read" is just a summary of the story.' }
          ],
            remediations: { 'before-you-read-is-just': { steps: ['If a student confuses context with summary, have them re-read the textbook\'s "Introduction" (pages 1-2) and highlight.', 'Then ask: "Which of these facts would help you understand why Frau Frieda is in Vienna?" Guide them to connect "black.', 'Revisit Class 11 Hornbill\'s "Before You Read" nodes (c11_eng_h_cbse_01_001) for practice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Before You Read" is just a summary of the story.',
          parts: [
                { id: 'a', prompt: 'Write a 3-sentence "Before You Read" blurb for a hypothetical story about a fortune-teller in modern-day Mumbai who uses tarot cards to guide stock market.', answer: 'A good answer includes: (1) author name and credentials, (2) Mumbai setting with',
                  options: ['A good answer includes: (1) author name and credentials, (2) Mumbai setting with', 'Before You Read', '"Before You Read" is just a summary of the story'],
                  hint: 'Review "Before You Read" sections from Class 11 Hornbill (c11_eng_h_cbse_01_001) to practice.',
                  misconception: 'Students often think "Before You Read" is just a summary of the story.' }
          ],
            remediations: { 'before-you-read-is-just': { steps: ['If a student confuses context with summary, have them re-read the textbook\'s "Introduction" (pages 1-2) and highlight.', 'Then ask: "Which of these facts would help you understand why Frau Frieda is in Vienna?" Guide them to connect "black.', 'Revisit Class 11 Hornbill\'s "Before You Read" nodes (c11_eng_h_cbse_01_001) for practice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_002', difficulty: 'standard',
          question: 'Plot refers to the sequence of events as presented in the narrative, while.',
          hint: 'Review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" (linear) vs.',
          misconception: 'Students often believe the story has three *separate* flashbacks (Vienna, Barcelona, Havana) all triggered from the.',
          parts: [
                { id: 'a', prompt: 'What is the framing device in "I Sell My Dreams," and which event serves as the outer frame that opens and closes the narrative?', answer: 'The framing device is the Havana Riviera Hotel disaster',
                  options: ['The framing device is the Havana Riviera Hotel disaster', 'the Vienna flashback', 'the Barcelona meeting', '(how it\'s told), writing'],
                  hint: 'Review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" (linear) vs.',
                  misconception: 'Students often believe the story has three *separate* flashbacks (Vienna, Barcelona, Havana) all triggered from the present, missing that.' },
                { id: 'b', prompt: 'The story contains two major flashbacks (Vienna and Barcelona).', answer: 'Structural hierarchy (narrative order): 1',
                  options: ['Structural hierarchy (narrative order): 1', '(how it\'s told), writing'],
                  hint: 'Review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" (linear) vs.',
                  misconception: 'Students often believe the story has three *separate* flashbacks (Vienna, Barcelona, Havana) all triggered from the present, missing that.' },
                { id: 'c', prompt: 'Analyze how the narrative structure controls the reader\'s knowledge about Frau Frieda\'s "dreams." Compare what we learn in the Vienna section versus the.', answer: 'In Vienna, we see Frau Frieda\'s dreams *from inside* the household',
                  options: ['In Vienna, we see Frau Frieda\'s dreams *from inside* the household', '(how it\'s told), writing'],
                  hint: 'Review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" (linear) vs.',
                  misconception: 'Students often believe the story has three *separate* flashbacks (Vienna, Barcelona, Havana) all triggered from the present, missing that.' }
          ],
            remediations: { 'the-story-has-three-separate': { steps: ['If a student cannot map the nested structure: 1.', 'Have them draw two parallel timelines on paper: one labeled "Chronological Time" (1920s→1970s), one labeled "Narrative.', 'Place 6 event cards (childhood dream, Vienna job, flight to Rome, Barcelona lunch, Havana wave, ambassador talk) on the.', 'Then move them to the narrative line in the order the story *presents* them.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_003', difficulty: 'standard',
          question: 'Setting in "I Sell My Dreams" refers to the specific geographical locations.',
          hint: 'If confused about timeline: draw a two-column chart — "Story Order" (Havana → Vienna →.',
          misconception: 'Students treat setting as "background" — a passive stage where events happen.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting in "I Sell My Dreams" refers to the specific geographical locations (Havana,',
                  options: ['Setting in "I Sell My Dreams" refers to the specific geographical locations (Havana,', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot refers to the sequence of events as presented in the narrative, while narrative', 'Character analysis of the protagonist involves examining the central character\'s traits,'],
                  hint: 'If confused about timeline: draw a two-column chart — "Story Order" (Havana → Vienna → Barcelona →.',
                  misconception: 'Students treat setting as "background" — a passive stage where events happen.' }
          ],
            remediations: { 'students-treat-setting-as-background': { steps: ['If the student cannot distinguish setting from atmosphere, or misses the magical realism blend: 1) Have them reread the.', '2) Ask: "Which of these could happen in real life?', 'Why does Marquez put them in the same sentence?" 3) Map the five settings on a timeline with atmosphere keywords for.', '4) Re-attempt Diagnostic Question 4 with this framework.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'If stuck on magical realism ambiguity, review c12_eng_k_cbse_01_001\'s explanation.',
          misconception: 'Students often treat Frau Frieda as either a "real witch" or a "total fraud" — a binary that misses Marquez\'s magical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of the protagonist involves examining the central character\'s traits,',
                  options: ['Character analysis of the protagonist involves examining the central character\'s traits,', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot refers to the sequence of events as presented in the narrative, while narrative', 'Setting in "I Sell My Dreams" refers to the specific geographical locations (Havana,'],
                  hint: 'If stuck on magical realism ambiguity, review c12_eng_k_cbse_01_001\'s explanation of Marquez\'s.',
                  misconception: 'Students often treat Frau Frieda as either a "real witch" or a "total fraud" — a binary that misses Marquez\'s magical realist core.' }
          ],
            remediations: { 'students-often-treat-frau-frieda': { steps: ['If a student writes a binary judgment, assign this 3-step fix: (1) Re-read the Barcelona section (pages 7-8) and.', '(2) Write a T-chart: left column "Evidence she\'s a fraud" (stratagem comment, Neruda\'s disbelief), right column.', '(3) Rewrite the character sketch\'s thesis statement to: "Frau Frieda\'s power derives not from supernatural gift.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_005', difficulty: 'standard',
          question: 'Supporting characters are secondary figures in a narrative who interact with.',
          hint: 'Review STEAL method using the Viennese family\'s breakfast scene: find one example each.',
          misconception: 'Students often treat Frau Frieda as either a genuine prophet or a conscious fraud.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the Viennese family continues to employ and obey Frau Frieda even after the master\'s death, despite the narrator\'s suspicion that.', answer: 'The family obeys Frau Frieda',
                  options: ['The family obeys Frau Frieda', 'religious and therefore inclined to archaic superstitions', 'delighted to take in Frau Frieda'],
                  hint: 'Review STEAL method using the Viennese family\'s breakfast scene: find one example each of Speech.',
                  misconception: 'Students often treat Frau Frieda as either a genuine prophet or a conscious fraud.' },
                { id: 'b', prompt: 'Apply the concept of "foil" to analyze how Pablo Neruda\'s character highlights Frau Frieda\'s traits. Provide two specific textual contrasts.', answer: 'Neruda foils Frau Frieda in two key ways: (1) Epistemological stance',
                  options: ['Neruda foils Frau Frieda in two key ways: (1) Epistemological stance', 'different'],
                  hint: 'Review STEAL method using the Viennese family\'s breakfast scene: find one example each of Speech.',
                  misconception: 'Students often treat Frau Frieda as either a genuine prophet or a conscious fraud.' },
                { id: 'c', prompt: 'Analyze the significance of the Portuguese ambassador\'s final statement: "In concrete terms... what did she do? \'Nothing,\' he said...', answer: 'The ambassador\'s "Nothing',
                  options: ['The ambassador\'s "Nothing', 'Nothing'],
                  hint: 'Review STEAL method using the Viennese family\'s breakfast scene: find one example each of Speech.',
                  misconception: 'Students often treat Frau Frieda as either a genuine prophet or a conscious fraud.' }
          ],
            remediations: { 'students-often-treat-frau-frieda': { steps: ['Re-read the Vienna tavern scene (NCERT pp.', '3-5) and underline every verb describing Frau Frieda\'s actions vs.', 'Create a two-column table: "What Frau Frieda Does" vs.', '"What the Family Believes She Does." 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_01_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If the student cannot formulate a thematic sentence, return to c11_eng_h_cbse_01_006.',
          misconception: 'Students often think "identifying the theme" means spotting a *topic* like "dreams" or "superstition" or "survival.".',
          parts: [
                { id: 'a', prompt: 'Analyze the structural role of the three encounters between the narrator and Frau Frieda (Vienna tavern, Barcelona bookshop, Havana newspaper).', answer: 'Correct answer: The three encounters form a dialectic: (1) Vienna',
                  options: ['Correct answer: The three encounters form a dialectic: (1) Vienna', 'identifying the theme', 'dreams', 'superstition'],
                  hint: 'If the student cannot formulate a thematic sentence, return to c11_eng_h_cbse_01_006 (Class 11.',
                  misconception: 'Students often think "identifying the theme" means spotting a *topic* like "dreams" or "superstition" or "survival." They write: "The theme.' }
          ],
            remediations: { 'identifying-the-theme-means-spotting': { steps: ['If a student cannot move from topic to thematic statement: (1) Have them complete this stem: "The story shows that.', '(3) Have them write one sentence connecting those actions: "When people treat dreams as authoritative, they surrender.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
