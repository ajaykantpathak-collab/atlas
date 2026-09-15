import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch19_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch19_p1: SimDef = {
    id: 'v3_c12_eng_k_ch19_p1',
    title: 'On Science Fiction (Non-fiction) · Part 1/3',
    subtitle: 'Cowboys herding dolphins — science fiction, says Asimov',
    classLevel: 12, subject: 'eng_k', topic: 'On Science Fiction (Non-fiction) · Part 1/3',
    chapters: ['c12_eng_k_ch19'],
    nodeIds: ['c12_eng_k_cbse_19_001', 'c12_eng_k_cbse_19_002', 'c12_eng_k_cbse_19_003', 'c12_eng_k_cbse_19_004', 'c12_eng_k_cbse_19_005', 'c12_eng_k_cbse_19_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Genre theorist', intro: 'A biochemist who wrote hundreds of SF books draws the genre\'s true border — and it\'s not where you think.', goal: 'Apply Asimov\'s background-over-content definition and trace science fiction\'s birth to the Industrial Revolution.' },
    discovery: {
        question: 'A Western where cowboys herd dolphins on a water planet — Asimov says it\'s still science fiction. A baseball thriller aboard a space station? Also SF. What makes a story SF?',
        options: ['The background, not the content — any story set in a society transformed by science counts, whatever genre its plot belongs to', 'Spaceships and lasers', 'Aliens must appear', 'It must predict the future correctly'],
        answer: 'The background, not the content — any story set in a society transformed by science counts, whatever genre its plot belongs to',
        hook: 'Sci-fi couldn\'t exist before ~1800: only when the Industrial Revolution made change visible within one lifetime did \'the future\' become imaginable. The scientist is the priest\'s heir — both hold \'the secret of controlling the Universe\'; one through formulas, the other through laws.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'The "Before You Read: Context and Background" stage prepares students to engage with Isaac Asimov\'s essay "On Science Fiction" by establishing the author\'s authority, the historical emergence.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_19_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Draw Asimov\'s border yourself: separate prescientific wonder from scientific extrapolation, judge whether a fair-play mystery can survive alien rules, and reclassify the stories you thought you knew.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a sci-fi movie like "Interstellar" or "The Martian" — you know the science matters, but have you ever asked *when* stories.',
            decisions: [{ prompt: 'According to Asimov, what historical development made science fiction possible as a literary genre, and approximately when did it occur?', options: [
                { text: 'The Industrial Revolution (c', outcome: 'The Industrial Revolution (c. 1800) made science fiction possible because it was the first time the.' },
                { text: 'the invention of the printing press', outcome: 'Not quite — Students often think "science fiction = stories with advanced technology/space travel/aliens".', reveals: 'science-fiction-stories-with-advanced' },
                { text: 'the Space Age', outcome: 'Not quite — Students often think "science fiction = stories with advanced technology/space travel/aliens".', reveals: 'science-fiction-stories-with-advanced' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re reading a long WhatsApp forward that jumps between history, myth, and modern tech — you\'d lose the thread.',
            decisions: [{ prompt: 'What are the two main sections of Asimov\'s essay "On Science Fiction" and what is the primary function of each section in advancing his.', options: [
                { text: 'The two main sections are: (I) The Prescientific Universe', outcome: 'The two main sections are: (I) The Prescientific Universe — establishes myths/legends as emotional.' },
                { text: 'Section I is about Greek myths, Section II is about Asimov\'s books', outcome: 'Not quite — Students treat "Plot and Narrative Structure" as a universal template (exposition → climax →.', reveals: 'students-treat-plot-and-narrative' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re watching a science fiction movie — the setting isn\'t just the spaceship or alien planet; it\'s the *rules* of that universe (warp drive exists.',
            decisions: [{ prompt: 'In Asimov\'s essay, what constitutes the "setting" of Section I ("The Prescientific Universe") — is it a physical place, a time period, or.', options: [
                { text: 'The setting of Section I is a conceptual framework', outcome: 'The setting of Section I is a conceptual framework — the "prescientific universe" where nature.' },
                { text: 'ancient Greece', outcome: 'Not quite — Students treat "setting" in non-fiction as *physical/historical context* (e.g., "Asimov wrote this.', reveals: 'students-treat-setting-in-non' },
                { text: 'the Ice Age', outcome: 'Not quite — Students treat "setting" in non-fiction as *physical/historical context* (e.g., "Asimov wrote this.', reveals: 'students-treat-setting-in-non' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re reading a blog post by a famous scientist explaining why their field matters — you instantly wonder: *Who is speaking? Why should I trust them?',
            decisions: [{ prompt: 'What is the primary role Isaac Asimov adopts as the narrator-protagonist in the first section of the essay "On Science Fiction"?', options: [
                { text: 'Asimov adopts the role of a **historian of ideas** who traces the evolution of human', outcome: 'Asimov adopts the role of a **historian of ideas** who traces the evolution of human imagination.' },
                { text: 'He acts as a fictional character', outcome: 'Not quite — Students often **conflate the author Asimov with the narrator Asimov**, treating every "I".', reveals: 'students-often-conflate-the-author' },
                { text: 'He tells a personal story', outcome: 'Not quite — Students often **conflate the author Asimov with the narrator Asimov**, treating every "I".', reveals: 'students-often-conflate-the-author' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re debating a friend who says "Harry Potter is science fiction because it has invisible cloaks and flying brooms." You\'d instinctively reach for.',
            decisions: [{ prompt: 'List any three mythological creatures Asimov names in Section I and state the common principle he says underlies their creation.', options: [
                { text: 'Asimov names the Centaur (man-horse), Satyr (man-goat), Sphinx (woman-lion), Harpy', outcome: 'Asimov names the Centaur (man-horse), Satyr (man-goat), Sphinx (woman-lion), Harpy (woman-hawk).' },
                { text: 'they represent gods', outcome: 'Not quite — Students treat "supporting characters" in a non-fiction essay as if they were fictional characters.', reveals: 'students-treat-supporting-characters-in' },
                { text: 'they are aliens', outcome: 'Not quite — Students treat "supporting characters" in a non-fiction essay as if they were fictional characters.', reveals: 'students-treat-supporting-characters-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are explaining to a friend why "Interstellar" feels different from "Harry Potter" even though both have impossible things — one uses black holes.',
            decisions: [{ prompt: 'State the primary theme of Asimov\'s essay "On Science Fiction" in one sentence.', options: [
                { text: 'The primary theme is the fundamental distinction between pre-scientific imagination', outcome: 'The primary theme is the fundamental distinction between pre-scientific imagination (myths/legends.' },
                { text: 'Asimov defines science fiction', outcome: 'Not quite — Students often confuse "theme" with "topic" and write "The theme is science fiction" or "The theme.', reveals: 'students-often-confuse-theme-with' },
                { text: 'and write', outcome: 'Not quite — Students often confuse "theme" with "topic" and write "The theme is science fiction" or "The theme.', reveals: 'students-often-confuse-theme-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Marketing debates whether a quiet family drama aboard a generation ship \'counts\' as science fiction for the catalogue — \'there isn\'t a single ray gun in it.\'',
            decisions: [{ prompt: 'Is it science fiction?', options: [
                { text: 'Yes — Asimov\'s test is the background, not the props: a world running on different discovered rules makes it SF even if the plot is a domestic drama.', outcome: 'Spaceships and lasers are content; the genre marker is a society significantly transformed by science — which this has.' },
                { text: 'No — no gadgets, no aliens, no SF.', outcome: 'That\'s the marketing-trope definition Asimov dismantles; the background society is what does the classifying.', reveals: 'scifi-equals-gadgets' },
                { text: 'Yes — and anything set in the future or with magic like the Force is SF too.', outcome: 'Over-correcting breaks the other boundary: fantasy tropes in space costumes aren\'t SF because the laws of nature aren\'t the engine.', reveals: 'fantasy-equals-scifi' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_19_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now define a genre by its world, not its wardrobe — and you\'ll never call Star Wars hard SF again without a caveat.',
            decisions: [{ prompt: 'What comes next? On Science Fiction (Non-fiction) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — On Science Fiction (Non-fiction) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_001', difficulty: 'standard',
          question: 'The "Before You Read: Context and Background" stage prepares students to engage.',
          hint: 'If stuck on the background-vs-content concept, revisit Class 8 node c8_engl_ch5_5.',
          misconception: 'Students often think "science fiction = stories with advanced technology/space travel/aliens" (content-based.',
          parts: [
                { id: 'a', prompt: 'According to Asimov, what historical development made science fiction possible as a literary genre, and approximately when did it occur?', answer: 'The Industrial Revolution (c',
                  options: ['The Industrial Revolution (c', 'the invention of the printing press', 'the Space Age', 'science fiction = stories with advanced technology/space travel/aliens'],
                  hint: 'If stuck on the background-vs-content concept, revisit Class 8 node c8_engl_ch5_5 (Science Fiction.',
                  misconception: 'Students often think "science fiction = stories with advanced technology/space travel/aliens" (content-based definition).' },
                { id: 'b', prompt: 'Explain in your own words the parallel Asimov draws between the "priest, magician, wizard, shaman" of prescientific times and the "scientist" of today.', answer: 'Both are perceived as holders of the "secret of controlling the Universe"',
                  options: ['Both are perceived as holders of the "secret of controlling the Universe"', 'both are respected', 'both explain things', 'science fiction = stories with advanced technology/space travel/aliens'],
                  hint: 'If stuck on the background-vs-content concept, revisit Class 8 node c8_engl_ch5_5 (Science Fiction.',
                  misconception: 'Students often think "science fiction = stories with advanced technology/space travel/aliens" (content-based definition).' },
                { id: 'c', prompt: 'Asimov argues that science fiction is defined by its *background*, not its *content*.', answer: 'Yes, it is science fiction',
                  options: ['Yes, it is science fiction', 'science fiction = stories with advanced technology/space travel/aliens'],
                  hint: 'If stuck on the background-vs-content concept, revisit Class 8 node c8_engl_ch5_5 (Science Fiction.',
                  misconception: 'Students often think "science fiction = stories with advanced technology/space travel/aliens" (content-based definition).' }
          ],
            remediations: { 'science-fiction-stories-with-advanced': { steps: ['If the student cannot articulate the background-vs-content distinction after the walkthrough: (1) Have them list 3.', '(2) For each, ask: "Keep the *plot beats* identical, but move the setting to a generation ship where water is rationed.', 'Is it still a romance/heist/courtroom drama?', 'Is it *also* science fiction?" (3) Guide them to see that the *plot* (content) didn\'t change, but the *societal rules*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "science fiction = stories with advanced technology/space travel/aliens" (content-based.',
          parts: [
                { id: 'a', prompt: 'Asimov writes: "It would be wrong to throw out a style of literature that has tickled the human fancy for thousands of years for the trivial reason that it.', answer: 'No contradiction',
                  options: ['No contradiction', 'science fiction = stories with advanced technology/space travel/aliens'],
                  hint: 'If stuck on the background-vs-content concept, revisit Class 8 node c8_engl_ch5_5 (Science Fiction.',
                  misconception: 'Students often think "science fiction = stories with advanced technology/space travel/aliens" (content-based definition).' }
          ],
            remediations: { 'science-fiction-stories-with-advanced': { steps: ['If the student cannot articulate the background-vs-content distinction after the walkthrough: (1) Have them list 3.', '(2) For each, ask: "Keep the *plot beats* identical, but move the setting to a generation ship where water is rationed.', 'Is it still a romance/heist/courtroom drama?', 'Is it *also* science fiction?" (3) Guide them to see that the *plot* (content) didn\'t change, but the *societal rules*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_002', difficulty: 'standard',
          question: 'In non-fiction essays like Asimov\'s "On Science Fiction," narrative structure.',
          hint: 'If stuck, revisit Class 11 Woven Words essay nodes (c11_eng_w_cbse_02_002.',
          misconception: 'Students treat "Plot and Narrative Structure" as a universal template (exposition → climax → resolution) and force-fit.',
          parts: [
                { id: 'a', prompt: 'What are the two main sections of Asimov\'s essay "On Science Fiction" and what is the primary function of each section in advancing his central argument?', answer: 'The two main sections are: (I) The Prescientific Universe',
                  options: ['The two main sections are: (I) The Prescientific Universe', 'Section I is about Greek myths, Section II is about Asimov\'s books'],
                  hint: 'If stuck, revisit Class 11 Woven Words essay nodes (c11_eng_w_cbse_02_002, c11_eng_w_cbse_03_002).',
                  misconception: 'Students treat "Plot and Narrative Structure" as a universal template (exposition → climax → resolution) and force-fit it onto non-fiction.' },
                { id: 'b', prompt: 'Asimov writes: "Science fiction is a literary universe of no mean size because science fiction is what it is, not through its content but through its.', answer: '"Background" means the *governing rules of the fictional world*',
                  options: ['"Background" means the *governing rules of the fictional world*', 'background means setting like spaceships or planets'],
                  hint: 'If stuck, revisit Class 11 Woven Words essay nodes (c11_eng_w_cbse_02_002, c11_eng_w_cbse_03_002).',
                  misconception: 'Students treat "Plot and Narrative Structure" as a universal template (exposition → climax → resolution) and force-fit it onto non-fiction.' }
          ],
            remediations: { 'students-treat-plot-and-narrative': { steps: ['If the student imposes fictional plot terminology on the essay: (1) Give them a 2-column table: "Fictional Plot Terms".', '"Essay Rhetorical Moves" — have them match Asimov\'s paragraphs to the right column.', '(2) Ask: "Where is the \'conflict\' in this essay?', 'Who is the \'protagonist\'?" — the absurdity reveals the category error.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_003', difficulty: 'standard',
          question: 'Setting in a non-fiction essay refers to the conceptual or intellectual.',
          hint: 'If stuck, re-read the "Stop and Think" questions after Section I in the textbook — they.',
          misconception: 'Students treat "setting" in non-fiction as *physical/historical context* (e.g., "Asimov wrote this in the 20th century.',
          parts: [
                { id: 'a', prompt: 'In Asimov\'s essay, what constitutes the "setting" of Section I ("The Prescientific Universe") — is it a physical place, a time period, or a conceptual.', answer: 'The setting of Section I is a conceptual framework',
                  options: ['The setting of Section I is a conceptual framework', 'ancient Greece', 'the Ice Age', 'atmosphere'],
                  hint: 'If stuck, re-read the "Stop and Think" questions after Section I in the textbook — they explicitly.',
                  misconception: 'Students treat "setting" in non-fiction as *physical/historical context* (e.g., "Asimov wrote this in the 20th century, so the setting.' },
                { id: 'b', prompt: 'Asimov writes: "We needn\'t sneer. By the same principle, we continue to have faith in economists, sociologists, and meteorologists today..." What atmosphere.', answer: 'The sentence creates an atmosphere of humility and shared human fallibility',
                  options: ['The sentence creates an atmosphere of humility and shared human fallibility', 'it mocks ancient beliefs', 'it proves science is better', 'atmosphere'],
                  hint: 'If stuck, re-read the "Stop and Think" questions after Section I in the textbook — they explicitly.',
                  misconception: 'Students treat "setting" in non-fiction as *physical/historical context* (e.g., "Asimov wrote this in the 20th century, so the setting.' },
                { id: 'c', prompt: 'Compare the "rules" of the prescientific universe (gods, magical formulas, whimsical deities) with the "rules" of the science fiction universe (impersonal.', answer: 'Asimov contrasts the *source of authority* (gods vs',
                  options: ['Asimov contrasts the *source of authority* (gods vs', 'atmosphere', 'mood of the content', 'the atmosphere is scientific'],
                  hint: 'If stuck, re-read the "Stop and Think" questions after Section I in the textbook — they explicitly.',
                  misconception: 'Students treat "setting" in non-fiction as *physical/historical context* (e.g., "Asimov wrote this in the 20th century, so the setting.' }
          ],
            remediations: { 'students-treat-setting-in-non': { steps: ['Have the student re-read the first paragraph of Section I and Section II side-by-side.', 'Give them a 2-column table: Column A = Prescientific Universe rules; Column B = Science Fiction Universe rules.', 'For atmosphere, read aloud three passages: "Let\'s consider—", "We needn\'t sneer", "Modestly, I refer you..." Ask: "If.', 'Assign a micro-writing task: "Write 4 sentences explaining how a smartphone works, using Asimov\'s tone — talk *to*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a non-fiction essay involves examining.',
          hint: 'Review `c11_eng_h_cbse_01_004` (Class 11 Character Analysis: Protagonist) focusing on the.',
          misconception: 'Students often **conflate the author Asimov with the narrator Asimov**, treating every "I" as unmediated autobiography.',
          parts: [
                { id: 'a', prompt: 'In Section II, Asimov writes: "Modestly, I refer you to my own science fiction mysteries, *The Caves of Steel* and *The Naked Sun*..." Identify the rhetorical.', answer: '"Modestly" is **ironic self-awareness**',
                  options: ['"Modestly" is **ironic self-awareness**', 'I have evidence from my own practice, but I don\'t take myself too seriously', 'It shows he is humble', 'It\'s just a filler word'],
                  hint: 'Review `c11_eng_h_cbse_01_004` (Class 11 Character Analysis: Protagonist) focusing on the "author.',
                  misconception: 'Students often **conflate the author Asimov with the narrator Asimov**, treating every "I" as unmediated autobiography.' },
                { id: 'b', prompt: 'Compare Asimov\'s stance toward John Campbell in Section II with his stance toward the "priest, magician, wizard, shaman" in Section I.', answer: 'In Section I, Asimov *sympathetically* describes prescientific authorities',
                  options: ['In Section I, Asimov *sympathetically* describes prescientific authorities', 'criticism', 'praise'],
                  hint: 'Review `c11_eng_h_cbse_01_004` (Class 11 Character Analysis: Protagonist) focusing on the "author.',
                  misconception: 'Students often **conflate the author Asimov with the narrator Asimov**, treating every "I" as unmediated autobiography.' }
          ],
            remediations: { 'students-often-conflate-the-author': { steps: ['**Re-read Section I\'s opening paragraphs** (up to "Let\'s consider—") and highlight every first-person phrase ("I have.', 'Ask: *Why does he say "I" here?', 'What role is he playing?* 2.', '**Compare with a Class 11 non-fiction protagonist** (e.g., from *Hornbill* Chapter 1 or 2 — node.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_005', difficulty: 'standard',
          question: 'In a non-fiction essay like Asimov\'s "On Science Fiction," supporting.',
          hint: 'If stuck, re-read Section I paragraphs 4-6 (priest/shaman + mythological hybrids) and.',
          misconception: 'Students treat "supporting characters" in a non-fiction essay as if they were fictional characters with personalities.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In a non-fiction essay like Asimov\'s "On Science Fiction," supporting characters are the',
                  options: ['In a non-fiction essay like Asimov\'s "On Science Fiction," supporting characters are the', 'The "Before You Read: Context and Background" stage prepares students to engage with', 'In non-fiction essays like Asimov\'s "On Science Fiction," narrative structure refers to', 'Setting in a non-fiction essay refers to the conceptual or intellectual framework the'],
                  hint: 'If stuck, re-read Section I paragraphs 4-6 (priest/shaman + mythological hybrids) and Section.',
                  misconception: 'Students treat "supporting characters" in a non-fiction essay as if they were fictional characters with personalities, motives, and arcs.' }
          ],
            remediations: { 'students-treat-supporting-characters-in': { steps: ['If a student writes a personality-based analysis: (1) Stop them and ask: "Does Asimov give the priest a backstory?', 'Does the Sphinx have a childhood?" (2) Show the exact line: "again the name doesn\'t matter" and "the constant reference.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_19_006', difficulty: 'standard',
          question: 'The primary theme of a non-fiction essay is the central idea or argument the.',
          hint: 'If stuck, re-read the "Stop and Think" questions in the NCERT text after Section I — they.',
          misconception: 'Students often confuse "theme" with "topic" and write "The theme is science fiction" or "The theme is myths vs.',
          parts: [
                { id: 'a', prompt: 'Asimov writes: "In a narrow sense, only science fiction is valid for today since, as far as we can tell, the Universe does follow the dictates of the laws.', answer: 'The story\'s problem-solving mechanism relies on supernatural intervention',
                  options: ['The story\'s problem-solving mechanism relies on supernatural intervention', 'and write'],
                  hint: 'If stuck, re-read the "Stop and Think" questions in the NCERT text after Section I — they directly.',
                  misconception: 'Students often confuse "theme" with "topic" and write "The theme is science fiction" or "The theme is myths vs.' }
          ],
            remediations: { 'students-often-confuse-theme-with': { steps: ['If a student gives a topic instead of a theme, ask: "What is Asimov *arguing* about science fiction and myths?', 'Complete this sentence: \'Asimov believes that science fiction is _____ because _____.\'" If they miss his respect for.', '(\'narrow\' and \'haughty\') What does he explicitly say myths are equivalent to?" Have them re-read Section I\'s last two.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
