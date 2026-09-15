import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch01_p1: SimDef = {
    id: 'v3_c11_eng_w_ch01_p1',
    title: 'The Lament (Short Story) · Part 1/3',
    subtitle: 'Find the climax inside a grieving man, not in the loudest scene.',
    classLevel: 11, subject: 'eng_w', topic: 'The Lament (Short Story) · Part 1/3',
    chapters: ['c11_eng_w_ch01'],
    nodeIds: ['c11_eng_w_cbse_01_001', 'c11_eng_w_cbse_01_002', 'c11_eng_w_cbse_01_003', 'c11_eng_w_cbse_01_004', 'c11_eng_w_cbse_01_005', 'c11_eng_w_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener shadowing an invisible cabdriver', intro: 'Twilight snow, a phantom cabby, a son newly buried — everyone rides, nobody hears.', goal: 'Distinguish a story of character from a story of incident and locate its internal climax.' },
    discovery: {
        question: 'A cabdriver\'s son has died and he can\'t get a single passenger to listen. Where does Chekhov place the climax — the shouting drunks, or somewhere quieter?',
        options: ['The quiet turn inward — after the last fare leaves, his grief \'rends his heart with greater force\' and he sees the totality of his isolation', 'The brawl with the three young men — loudest scene equals climax', 'The officer\'s first call for a cab', 'The stable scene, because that\'s where the story ends'],
        answer: 'The quiet turn inward — after the last fare leaves, his grief \'rends his heart with greater force\' and he sees the totality of his isolation',
        hook: 'The rowdy passengers are noise on the way up — in a story of character, the climax is a realisation, not a collision.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is the preparatory literary analysis step where students examine the author\'s biography, historical period, cultural setting, literary movement, and key.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark each fare as a failed attempt to speak, find the internal climax, and decide whether the circular ending on the horse is stasis or release.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a foreign film without subtitles — you\'d want to know the country\'s history, the director\'s style, and key cultural references.',
            decisions: [{ prompt: 'Who was Anton Chekhov, and what two professions did he balance throughout his writing career?', options: [
                { text: 'Anton Chekhov (1860–1904) was a Russian playwright and short story writer who', outcome: 'Anton Chekhov (1860–1904) was a Russian playwright and short story writer who simultaneously.' },
                { text: 'he was a full-time writer', outcome: 'Not quite — Students often treat "context" as a list of memorizable facts (dates, birthplaces, definitions).', reveals: 'students-often-treat-context-as' },
                { text: 'he was a politician', outcome: 'Not quite — Students often treat "context" as a list of memorizable facts (dates, birthplaces, definitions).', reveals: 'students-often-treat-context-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are a detective arriving at a crime scene: you don\'t just see "a mess"—you look for the sequence of events that led to it.',
            decisions: [{ prompt: 'Identify the inciting incident in "The Lament" and state the exact textual moment it occurs.', options: [
                { text: 'The inciting incident is the officer\'s hail: "Cabby for Viborg Way!" (paragraph 4)', outcome: 'The inciting incident is the officer\'s hail: "Cabby for Viborg Way!" (paragraph 4).' },
                { text: 'Iona\'s son dying', outcome: 'Not quite — Students often equate "climax" with "the most dramatic or loudest scene" and therefore identify the.', reveals: 'students-often-equate-climax-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are waiting at a bus stop on a freezing, foggy December evening in Delhi after receiving devastating news.',
            decisions: [{ prompt: 'What are the three main elements of setting in a short story, and which element is most emphasized in the opening paragraph of "The Lament"?', options: [
                { text: 'The three main elements are time, place, and physical environment', outcome: 'The three main elements are time, place, and physical environment.' },
                { text: 'time and place', outcome: 'Not quite — Students often treat setting as a static "where and when" and atmosphere as a synonym for "theme.".', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'ve just had the worst day of your life — maybe you failed an exam you studied weeks for, or a close friend betrayed you.',
            decisions: [{ prompt: 'What is the primary theme of Anton Chekhov\'s "The Lament" as established by the pattern of Iona\'s interactions with his passengers?', options: [
                { text: 'The primary theme is the profound alienation and communication breakdown in modern urban', outcome: 'The primary theme is the profound alienation and communication breakdown in modern urban society.' },
                { text: 'death of a son', outcome: 'Not quite — Students consistently confuse the *subject* (a father grieving his son\'s death) with the *theme*.', reveals: 'students-consistently-confuse-the-subject' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your film club is adapting Chekhov\'s \'The Lament\' — a St. Petersburg cabdriver whose son just died tries to tell his passengers, who won\'t listen. The director wants to cut the snow-and-dusk opening and add a funeral flashback: \'Give the audience the sad event directly.\'',
            decisions: [{ prompt: 'Does the rewrite honour how Chekhov builds grief?', options: [
                { text: 'No — Chekhov\'s method is objective observation: the snow, the \'phantom\' cabdriver hunched motionless, the \'gingerbread horse\' mirror Iona\'s frozen grief and social invisibility in 1880s St. Petersburg. The power is that nobody listens — a flashback dramatising the death would kill the very silence the story is about; grief finally pours out to the horse because humans refuse it.', outcome: 'Context (cabdriver precarity, Chekhov\'s clinical restraint) is the lens that makes the opening atmosphere do the emotional work — not a flashback.' },
                { text: 'The rewrite works — audiences need the funeral scene to feel the loss.', outcome: 'That reverses the point: the story withholds the event so we watch grief fail to find a listener — showing the death directly turns lament into melodrama.', reveals: 'show-the-sad-event-directly' },
                { text: 'Cut the weather too — scenery is filler; get straight to the dialogue.', outcome: 'The weather IS the psychology — snow and twilight externalise Iona\'s buried sorrow and the city\'s indifference; stripping it leaves a bare anecdote.', reveals: 'setting-is-filler' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'He finally tells the whole story — to a horse. The circle closes, but the grief has moved from suppressed to spoken.',
            decisions: [{ prompt: 'What comes next? The Lament (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Lament (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is the preparatory literary analysis.',
          hint: 'Review Class 10 "The Necklace" (c10_engl_cbse_16_001) — analyze how Maupassant\'s civil.',
          misconception: 'Students often treat "context" as a list of memorizable facts (dates, birthplaces, definitions) rather than.',
          parts: [
                { id: 'a', prompt: 'Who was Anton Chekhov, and what two professions did he balance throughout his writing career?', answer: 'Anton Chekhov (1860–1904) was a Russian playwright and short story writer who',
                  options: ['Anton Chekhov (1860–1904) was a Russian playwright and short story writer who', 'he was a full-time writer', 'he was a politician', 'The Lament\'s'],
                  hint: 'Review Class 10 "The Necklace" (c10_engl_cbse_16_001) — analyze how Maupassant\'s civil service.',
                  misconception: 'Students often treat "context" as a list of memorizable facts (dates, birthplaces, definitions) rather than an interpretive lens.' },
                { id: 'b', prompt: 'In your own words, explain why understanding the social status of a "cabdriver" in 1880s St.', answer: 'Cabdrivers were among the urban poor',
                  options: ['Cabdrivers were among the urban poor', 'rudeness'],
                  hint: 'Review Class 10 "The Necklace" (c10_engl_cbse_16_001) — analyze how Maupassant\'s civil service.',
                  misconception: 'Students often treat "context" as a list of memorizable facts (dates, birthplaces, definitions) rather than an interpretive lens.' }
          ],
            remediations: { 'students-often-treat-context-as': { steps: ['Have the student create a two-column chart: LEFT column = contextual fact (e.g., "Chekhov was a doctor"), RIGHT column.', 'Ask: "If Chekhov were a lawyer, how would the hospital scene change?" 3.', 'Require them to rewrite one paragraph of the story inserting a contextual insight as a marginal gloss.', 'Debrief: "Context isn\'t what you know — it\'s what the text makes you see."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_002', difficulty: 'standard',
          question: 'Plot is the sequence of causally connected events that form the narrative arc.',
          hint: 'If stuck, review the "Introduction" section of the NCERT textbook (page 1-2) which.',
          misconception: 'Students often equate "climax" with "the most dramatic or loudest scene" and therefore identify the argument with the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot is the sequence of causally connected events that form the narrative arc of a story,',
                  options: ['Plot is the sequence of causally connected events that form the narrative arc of a story,', '"Before You Read: Context and Background" is the preparatory literary analysis step where', 'Setting refers to the time, place, and physical environment in', 'Character analysis of a protagonist involves examining the central character\'s physical'],
                  hint: 'If stuck, review the "Introduction" section of the NCERT textbook (page 1-2) which explicitly.',
                  misconception: 'Students often equate "climax" with "the most dramatic or loudest scene" and therefore identify the argument with the three young men.' }
          ],
            remediations: { 'students-often-equate-climax-with': { steps: ['Have the student re-read only the paragraphs from "Once more he is alone..." to "Iona sees a hall porter..." and.', 'Ask: "Which of these verbs marks the moment he stops *hoping* for a human listener and *acts* on his own?" (The tug.', 'Explain: That decision—triggered by the realization that *no one will listen*—is the structural climax.', 'The young men were the last *hope*; the hall porter is the *confirmation* of hopelessness.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment in which a story.',
          hint: 'Review descriptive writing techniques from Class 10 (node c10_engl_cbse_05_003 "Coorg.',
          misconception: 'Students often treat setting as a static "where and when" and atmosphere as a synonym for "theme." They write: "The.',
          parts: [
                { id: 'a', prompt: 'What are the three main elements of setting in a short story, and which element is most emphasized in the opening paragraph of "The Lament"?', answer: 'The three main elements are time, place, and physical environment',
                  options: ['The three main elements are time, place, and physical environment', 'time and place'],
                  hint: 'Review descriptive writing techniques from Class 10 (node c10_engl_cbse_05_003 "Coorg: The Coffee.',
                  misconception: 'Students often treat setting as a static "where and when" and atmosphere as a synonym for "theme." They write: "The setting is Russia.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student re-read only the first paragraph and underline every sensory word (visual, tactile, auditory).', 'Ask: "If you were filming this, what would the camera show?', 'What would the sound designer add?" 3.', 'Then ask: "How does each detail make you *feel*?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat setting as a static "where and when" and atmosphere as a synonym for "theme." They write: "The.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of Chekhov\'s decision to begin and end the story with the same setting description (Iona and his horse motionless in the snow).', answer: 'It strengthens the theme powerfully',
                  options: ['It strengthens the theme powerfully', 'repetitive', 'boring'],
                  hint: 'Review descriptive writing techniques from Class 10 (node c10_engl_cbse_05_003 "Coorg: The Coffee.',
                  misconception: 'Students often treat setting as a static "where and when" and atmosphere as a synonym for "theme." They write: "The setting is Russia.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student re-read only the first paragraph and underline every sensory word (visual, tactile, auditory).', 'Ask: "If you were filming this, what would the camera show?', 'What would the sound designer add?" 3.', 'Then ask: "How does each detail make you *feel*?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_004', difficulty: 'standard',
          question: 'Character analysis of a protagonist involves examining the central character\'s.',
          hint: 'If stuck, review *indirect characterization techniques* using the Class 9 node.',
          misconception: 'Students often treat Iona\'s grief as a *static condition* ("he is sad because his son died") rather than a *dynamic.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Chekhov describes Iona and his horse as "white like a phantom" and "like a gingerbread horse" in the opening paragraph.', answer: 'The "phantom" simile suggests Iona is already ghost-like',
                  options: ['The "phantom" simile suggests Iona is already ghost-like', 'it\'s snowing'],
                  hint: 'If stuck, review *indirect characterization techniques* using the Class 9 node c9_engl_ch1_2.',
                  misconception: 'Students often treat Iona\'s grief as a *static condition* ("he is sad because his son died") rather than a *dynamic process* that *changes*.' }
          ],
            remediations: { 'students-often-treat-iona-s': { steps: ['If a student writes a static character sketch, do this 3-step remediation: 1.', '**Timeline mapping**: Have them draw a 4-column timeline: Opening → Officer encounter → Young men encounter → Hall.', 'In each column, write: Physical posture, Speech attempt, Response received, Internal shift (quote evidence).', '**Language evolution chart**: List Iona\'s 6 utterances in order.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_005', difficulty: 'standard',
          question: 'Supporting characters in "The Lament" are the secondary figures (the officer.',
          hint: 'If stuck, re-read the three passenger encounters (officer, three young men, hall porter).',
          misconception: 'Students often treat supporting characters as "minor" and therefore unimportant, writing them off as plot devices.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the officer says "Hm! What did he die of?" and then closes his eyes, and what this reveals about his character.', answer: 'The officer asks perfunctorily out of social politeness, not genuine concern',
                  options: ['The officer asks perfunctorily out of social politeness, not genuine concern', 'he is tired', 'he is sympathetic'],
                  hint: 'If stuck, re-read the three passenger encounters (officer, three young men, hall porter) and note.',
                  misconception: 'Students often treat supporting characters as "minor" and therefore unimportant, writing them off as plot devices.' },
                { id: 'b', prompt: 'Analyze the structural function of the three encounters (officer, young men, hall porter) as a rising pattern of indifference.', answer: 'First encounter: officer listens briefly but shuts down (passive indifference)',
                  options: ['First encounter: officer listens briefly but shuts down (passive indifference)', 'similar', 'treats all three as "similar" misses the deliberate escalation Chekhov engineers'],
                  hint: 'If stuck, re-read the three passenger encounters (officer, three young men, hall porter) and note.',
                  misconception: 'Students often treat supporting characters as "minor" and therefore unimportant, writing them off as plot devices.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['If a student cannot distinguish the escalating pattern of indifference: 1) Have them create a three-column table.', '2) Ask them to rank the responses from "most human" to "least human." 3) Guide them to see the officer offers words but.', '4) Then ask: "Why does Chekhov order them this way?" This makes the structural intent visible.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, review the "episodic structure" in c11_eng_w_cbse_01_002 — specifically, map.',
          misconception: 'Students consistently confuse the *subject* (a father grieving his son\'s death) with the *theme* (societal alienation.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the story\'s ending — Iona telling his story to the horse — is the definitive proof of the primary theme, not just a sad.', answer: 'The horse becomes the only "listener"',
                  options: ['The horse becomes the only "listener"', 'it shows he loves his horse', 'he has gone mad'],
                  hint: 'If stuck, review the "episodic structure" in c11_eng_w_cbse_01_002 — specifically, map each fare.',
                  misconception: 'Students consistently confuse the *subject* (a father grieving his son\'s death) with the *theme* (societal alienation and communication.' }
          ],
            remediations: { 'students-consistently-confuse-the-subject': { steps: ['Ask the student to list every character Iona speaks to (5 humans + 1 horse) and write the *exact response* each gives.', 'Have them circle which responses show "listening" vs "silencing." 3.', 'Guide them to complete this sentence frame: "Chekhov shows that in this society, when a person tries to share ______.', 'Only then introduce the word "alienation" as the label for that pattern.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
