import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch01_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch01_p1',
    title: 'izsepan · Part 1/3',
    subtitle: 'Read a chess game as the diagnosis of a kingdom already lost.',
    classLevel: 11, subject: 'hin_ar', topic: 'izsepan · Part 1/3',
    chapters: ['c11_hin_ar_ch01'],
    nodeIds: ['c11_hin_ar_cbse_01_001', 'c11_hin_ar_cbse_01_002', 'c11_hin_ar_cbse_01_003', 'c11_hin_ar_cbse_01_004', 'c11_hin_ar_cbse_01_005', 'c11_hin_ar_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a kingdom fall one move at a time', intro: 'In 1856 Lucknow two nobles chase checkmate while the Company chases the crown — and Premchand refuses to tell you whom to blame.', goal: 'Analyse feudal decay as systemic, not personal, and evaluate Premchand\'s deliberate historical distortion.' },
    discovery: {
        question: 'Two nobles play chess while the British annex Awadh — are Mir and Roshan the villains of \'Shatranj ke Khiladi\'?',
        options: ['No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab', 'Yes — their chess obsession alone destroyed the kingdom', 'Yes — they are the story\'s clear antagonists', 'No — the British officer is the story\'s only villain'],
        answer: 'No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab',
        hook: 'Premchand wrote 1856 from inside 1924 — the \'polite\' annexation mirrors the reformist colonial rhetoric of his own time.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Context and Background" refers to the historical, social, biographical, and literary circumstances surrounding a text\'s creation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Hold the three timelines — 1856 Lucknow, 1924 India, today — and weigh whether shrinking Wajid Ali Shah to a caged bird is a historical error or an artistic necessity.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are watching a period film where two nobles play chess while their kingdom collapses outside.',
            decisions: [{ prompt: 'What is the specific historical event that forms the immediate political backdrop of "Shatranj ke Khiladi," and in what year did it occur?', options: [
                { text: 'The annexation of Awadh by the British East India Company under Lord Dalhousie\'s Doctrine', outcome: 'The annexation of Awadh by the British East India Company under Lord Dalhousie\'s Doctrine of Lapse.' },
                { text: 'the 1857 Revolt', outcome: 'Not quite — Students treat "context" as a static list of dates (Premchand born 1880, story published 1924.', reveals: 'students-treat-context-as-a' },
                { text: 'Battle of Plassey', outcome: 'Not quite — Students treat "context" as a static list of dates (Premchand born 1880, story published 1924.', reveals: 'students-treat-context-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Have you ever noticed how a good movie hooks you in the first few minutes, builds tension until you\'re on the edge of your seat, then releases it?',
            decisions: [{ prompt: 'What is the definition of \'exposition\' in the context of plot structure?', options: [
                { text: 'Exposition is the opening stage of a plot where the author introduces the setting, main', outcome: 'Exposition is the opening stage of a plot where the author introduces the setting, main characters.' },
                { text: 'the most exciting part', outcome: 'Not quite — Students often believe "plot" is just a synonym for "summary of what happens" and that "narrative.', reveals: 'plot-is-just-a-synonym' },
                { text: 'the ending', outcome: 'Not quite — Students often believe "plot" is just a synonym for "summary of what happens" and that "narrative.', reveals: 'plot-is-just-a-synonym' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking into a government office where the air feels heavy with unspoken rules, where every clerk seems afraid of the next, and where the building.',
            decisions: [{ prompt: 'What are the three components of setting in literature, and which one is most prominently developed in the opening pages of "Ued.', options: [
                { text: 'The three components are physical (place), temporal (time), and social', outcome: 'The three components are physical (place), temporal (time), and social (environment/hierarchy).' },
                { text: 'government office', outcome: 'Not quite — Students often treat setting as a static "where and when" label and atmosphere as a synonym for.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re a doctor today pressured to prescribe expensive branded medicines when cheaper generics work just as well - that\'s exactly आयुर्विज्ञान\'s.',
            decisions: [{ prompt: 'Identify the protagonist\'s full name and profession as explicitly stated in the opening paragraphs of "उद्देश का नक्षत्र".', options: [
                { text: 'The protagonist is आयुर्विज्ञान, an Ayurvedic physician (वैद्य) running a government', outcome: 'The protagonist is आयुर्विज्ञान, an Ayurvedic physician (वैद्य) running a government dispensary.' },
                { text: 'ओंकारनाथ', outcome: 'Not quite — Students treat आयुर्विज्ञान as merely "an honest man who loses his job" - a middle-school moral.', reveals: 'students-treat-as-merely-an' },
                { text: 'डॉक्टर', outcome: 'Not quite — Students treat आयुर्विज्ञान as merely "an honest man who loses his job" - a middle-school moral.', reveals: 'students-treat-as-merely-an' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Think about a cricket match: the captain (protagonist) gets attention, but the wicketkeeper, the bowler who creates pressure, and the fielder who takes.',
            decisions: [{ prompt: 'Name three supporting characters from "उद्देश्य नक्षत्र" and state one distinct personality trait for each, using only the story text.', options: [
                { text: 'Correct answer: (1) ओखलाल – practical/grounded (evidence: advises आइंस्टाइन to accept', outcome: 'Correct answer: (1) ओखलाल – practical/grounded (evidence: advises आइंस्टाइन to accept government.' },
                { text: 'confuses ओखलाल with फिरोज़ shows failure to distinguish character voices', outcome: 'Not quite — Students often treat supporting characters as "background information" – listing them like a cast.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are asked: "What is this story really about?" You might recall the plot—a teacher refuses a government job and goes to jail.',
            decisions: [{ prompt: 'What is the primary theme of "उद्देश्य का नक्षत्र" as expressed through the conflict between Vyaksihnhu and the government official?', options: [
                { text: 'The primary theme is the conflict between individual conscience and state authority,', outcome: 'The primary theme is the conflict between individual conscience and state authority, showing that.' },
                { text: 'It\'s about a teacher getting a job', outcome: 'Not quite — Students often think the primary theme is simply "patriotism" or "freedom struggle." They miss that.', reveals: 'the-primary-theme-is-simply' },
                { text: 'patriotism', outcome: 'Not quite — Students often think the primary theme is simply "patriotism" or "freedom struggle." They miss that.', reveals: 'the-primary-theme-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is staging a reading of Premchand\'s \'Shatranj ke Khiladi\'. The director wants to stage it as \'a comedy about two chess-obsessed nobles in old Lucknow — period fun, nothing more.\' You sense the 1856 setting is doing heavier work.',
            decisions: [{ prompt: 'What reading should the production take?', options: [
                { text: 'Stage it as national allegory: Premchand wrote in 1924 — Non-Cooperation rising, Jallianwala Bagh fresh — and chose 1856 Awadh deliberately. The chessboard is a structural device: while Mirza and Mir move pieces, the kingdom is annexed without a shot — aristocratic decadence mirroring the \'polite\' colonial takeover the audience of 1924 would recognise in their own moment.', outcome: 'The comedy turns sharp: context isn\'t backdrop, it\'s the prism that makes chess-playing during a collapse mean political paralysis.' },
                { text: 'Go with the comedy reading — the story\'s humour about chess addicts carries itself without history lessons.', outcome: 'Stripping the 1856/1924 double timeline reduces a critique of feudal and colonial complicity to costume farce.', reveals: 'chess-players-is-just-comedy' },
                { text: 'Present it as a moral tale — chess is a vice, so the nobles deserved to lose their kingdom.', outcome: 'The game is a metaphor for paralysis, not a sin being punished; Premchand indicts a system\'s decadence, not a hobby.', reveals: 'chess-is-the-vice' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'An older Premchand story gave vice and virtue clear names; here nobody is clean — which is exactly what systemic decay looks like.',
            decisions: [{ prompt: 'What comes next? izsepan · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — izsepan · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_001', difficulty: 'standard',
          question: '"Context and Background" refers to the historical, social, biographical, and.',
          hint: 'If stuck, review Class 10 Hindi textbook\'s "Premchand" introduction chapter (typically.',
          misconception: 'Students treat "context" as a static list of dates (Premchand born 1880, story published 1924, Awadh annexed 1856).',
          parts: [
                { id: 'a', prompt: 'Analyze the chess metaphor in the story\'s context: How does the *structure* of chess (rules, pieces, endgame) map onto the political structure of Awadh.', answer: 'Mapping 1: The *immobility of the king* (Wajid Ali Shah)',
                  options: ['Mapping 1: The *immobility of the king* (Wajid Ali Shah)', 'symbol of laziness'],
                  hint: 'If stuck, review Class 10 Hindi textbook\'s "Premchand" introduction chapter (typically in *Kshitij*.',
                  misconception: 'Students treat "context" as a static list of dates (Premchand born 1880, story published 1924, Awadh annexed 1856) rather than a *dynamic.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['Draw a three-column timeline on paper: Column A = 1856 events (annexation, Wajid Ali Shah exiled), Column B = 1924.', 'For each column, ask: "What is the *mood*? (1856: false calm; 1924: suppressed rage; Text: ironic detachment)."', 'Write one paragraph connecting the three moods using the chess metaphor as the bridge.', 'Verify with teacher — does the paragraph explain *why* the story ends with Mir killing Roshan, not the British arriving?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "context" as a static list of dates (Premchand born 1880, story published 1924, Awadh annexed 1856).',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Premchand\'s portrayal of Wajid Ali Shah in the story is historically inaccurate but artistically necessary." Defend your position using.', answer: 'Artistically necessary',
                  options: ['Artistically necessary', 'inaccuracy'],
                  hint: 'If stuck, review Class 10 Hindi textbook\'s "Premchand" introduction chapter (typically in *Kshitij*.',
                  misconception: 'Students treat "context" as a static list of dates (Premchand born 1880, story published 1924, Awadh annexed 1856) rather than a *dynamic.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['Draw a three-column timeline on paper: Column A = 1856 events (annexation, Wajid Ali Shah exiled), Column B = 1924.', 'For each column, ask: "What is the *mood*? (1856: false calm; 1924: suppressed rage; Text: ironic detachment)."', 'Write one paragraph connecting the three moods using the chess metaphor as the bridge.', 'Verify with teacher — does the paragraph explain *why* the story ends with Mir killing Roshan, not the British arriving?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_002', difficulty: 'standard',
          question: 'Plot is the structured sequence of events in a narrative, organized into five.',
          hint: 'If stuck, review the story summary focusing only on the station master\'s *decisions* (not.',
          misconception: 'Students often believe "plot" is just a synonym for "summary of what happens" and that "narrative structure" means only.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain how the first two pages of "उद्देश्य का नक्शा" function as exposition.', answer: 'The opening establishes the station master (IafMr vyksihnhu) as a principled,',
                  options: ['The opening establishes the station master (IafMr vyksihnhu) as a principled,', 'he wakes up, drinks tea, goes to work', 'means only'],
                  hint: 'If stuck, review the story summary focusing only on the station master\'s *decisions* (not.',
                  misconception: 'Students often believe "plot" is just a synonym for "summary of what happens" and that "narrative structure" means only "beginning, middle.' },
                { id: 'b', prompt: 'Identify three specific events from the story that belong to the \'rising action\' stage.', answer: '1) The railway inspector\'s surprise inspection and demand for bribes',
                  options: ['1) The railway inspector\'s surprise inspection and demand for bribes', 'the station master eats lunch', 'means only', 'picks random events (e'],
                  hint: 'If stuck, review the story summary focusing only on the station master\'s *decisions* (not.',
                  misconception: 'Students often believe "plot" is just a synonym for "summary of what happens" and that "narrative structure" means only "beginning, middle.' },
                { id: 'c', prompt: 'Compare the climax of "उद्देश्य का नक्शा" with a typical commercial short story climax.', answer: 'The climax is the station master submitting his resignation',
                  options: ['The climax is the station master submitting his resignation', 'climax', 'loudest moment', 'point of irreversible change for the protagonist'],
                  hint: 'If stuck, review the story summary focusing only on the station master\'s *decisions* (not.',
                  misconception: 'Students often believe "plot" is just a synonym for "summary of what happens" and that "narrative structure" means only "beginning, middle.' }
          ],
            remediations: { 'plot-is-just-a-synonym': { steps: ['If a student cannot map the plot stages: 1) Have them list 8-10 key events in chronological order on sticky notes.', '2) Ask them to physically arrange the notes on a Freytag\'s Pyramid diagram drawn on paper.', '3) For each event, ask: "Does this *introduce*, *complicate*, *turn*, *unwind*, or *conclude*?" 4) Finally, have them.', 'This tactile, function-focused method breaks the "summary habit".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a story.',
          hint: 'If stuck, review the historical context of British Indian bureaucracy (node.',
          misconception: 'Students often treat setting as a static "where and when" label and atmosphere as a synonym for "weather description.".',
          parts: [
                { id: 'a', prompt: 'What are the three components of setting in literature, and which one is most prominently developed in the opening pages of "Ued ka Nijkasxak"?', answer: 'The three components are physical (place), temporal (time), and social',
                  options: ['The three components are physical (place), temporal (time), and social', 'government office'],
                  hint: 'If stuck, review the historical context of British Indian bureaucracy (node c11_hin_ar_cbse_01_001).',
                  misconception: 'Students often treat setting as a static "where and when" label and atmosphere as a synonym for "weather description." They write: "The.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['1) Have the student reread the first two pages and highlight every noun that names a person, object, or space.', '2) Next to each, write: "What power does this hold?', 'Who controls it?" 3) Then list every adjective and verb describing the office environment.', 'Ask: "Does this word make me feel safe, watched, small, or angry?" 4) Finally, rewrite one paragraph replacing all.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves systematically examining the.',
          hint: 'If stuck, review node 001\'s section on "औपनिवेशिक चिकित्सा नीति" (colonial medical.',
          misconception: 'Students treat आयुर्विज्ञान as merely "an honest man who loses his job" - a middle-school moral reading.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why आयुर्विज्ञान refuses the inspector\'s order to use the new allopathic medicines, connecting his refusal to his professional.', answer: 'आयुर्विज्ञान refuses',
                  options: ['आयुर्विज्ञान refuses', 'stubbornness'],
                  hint: 'If stuck, review node 001\'s section on "औपनिवेशिक चिकित्सा नीति" (colonial medical policy).',
                  misconception: 'Students treat आयुर्विज्ञान as merely "an honest man who loses his job" - a middle-school moral reading.' }
          ],
            remediations: { 'students-treat-as-merely-an': { steps: ['Have the student re-read ONLY the clinic confrontation scene (pages 6-8) and highlight every word related.', 'Ask: "Who has *real* medical knowledge here - the inspector with his rules or आयुर्विज्ञान with his pulse diagnosis?" 3.', 'Map the binary: अनुभव vs नियम, गुरु-परंपरा vs सरकारी आदेश, आत्मा vs नौकरी.', 'Rewrite one paragraph explaining how आयुर्विज्ञान\'s body (seated, calm, pulse-reading) embodies traditional epistemic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_005', difficulty: 'standard',
          question: 'Supporting characters are fictional figures who interact with the protagonist.',
          hint: 'Re-read the protagonist analysis node (c11_hin_ar_cbse_01_004) and the plot structure.',
          misconception: 'Students often treat supporting characters as "background information" – listing them like a cast list – instead.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters are fictional figures who interact with the protagonist to advance',
                  options: ['Supporting characters are fictional figures who interact with the protagonist to advance', '"Context and Background" refers to the historical, social, biographical, and literary', 'Plot is the structured sequence of events in a narrative, organized into five stages:', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Re-read the protagonist analysis node (c11_hin_ar_cbse_01_004) and the plot structure node.',
                  misconception: 'Students often treat supporting characters as "background information" – listing them like a cast list – instead of analyzing them.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Give the student a two-column table: Column A = "What the character says/does" (quote 3 actions/dialogues), Column.', 'Model one row for ओखलाल together.', 'Student completes rows for फिरोज़ and मिर्ज़ा independently.', 'Student writes one paragraph synthesizing: "Through ओखलाल\'s practicality, फिरोज़\'s devotion, and मिर्ज़ा\'s skepticism.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_006', difficulty: 'standard',
          question: 'Primary theme is the central, unifying idea or message that the author conveys.',
          hint: 'If stuck, review the character analysis of Vyaksihnhu (node 004) and the plot structure.',
          misconception: 'Students often think the primary theme is simply "patriotism" or "freedom struggle." They miss that the story.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Vyaksihnhu refuses the government job offered by Oakh/J, and what this refusal reveals about the story\'s message.', answer: 'Vyaksihnhu refuses',
                  options: ['Vyaksihnhu refuses', 'patriotism', 'freedom struggle', 'the primary theme is simply "patriotism" or "freedom struggle'],
                  hint: 'If stuck, review the character analysis of Vyaksihnhu (node 004) and the plot structure (node 002).',
                  misconception: 'Students often think the primary theme is simply "patriotism" or "freedom struggle." They miss that the story is equally about what.' },
                { id: 'b', prompt: 'Analyze how the setting (colonial prison, government office) and the supporting character (Oakh/J) function together to sharpen the primary theme.', answer: 'The colonial setting embodies systemic oppression',
                  options: ['The colonial setting embodies systemic oppression', 'patriotism', 'freedom struggle', 'treats setting as mere backdrop misses its thematic role'],
                  hint: 'If stuck, review the character analysis of Vyaksihnhu (node 004) and the plot structure (node 002).',
                  misconception: 'Students often think the primary theme is simply "patriotism" or "freedom struggle." They miss that the story is equally about what.' }
          ],
            remediations: { 'the-primary-theme-is-simply': { steps: ['Re-read the epigraphs at the start of the chapter—they define education and literature\'s role.', 'Map each major scene to a question: "What does this scene teach about the cost of conscience?" 3.', 'Compare Vyaksihnhu and Oakh/J as foil characters representing two philosophies.', 'Write a one-sentence theme statement using the formula: "The story argues that [abstract idea] because [evidence]."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
