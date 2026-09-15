import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch06_p1: SimDef = {
    id: 'v3_c11_eng_w_ch06_p1',
    title: 'The Third and Final Continent (Short Story) · Part 1/3',
    subtitle: 'See a moon landing become the handshake between an old Yankee and a new immigrant.',
    classLevel: 11, subject: 'eng_w', topic: 'The Third and Final Continent (Short Story) · Part 1/3',
    chapters: ['c11_eng_w_ch06'],
    nodeIds: ['c11_eng_w_cbse_06_001', 'c11_eng_w_cbse_06_002', 'c11_eng_w_cbse_06_003', 'c11_eng_w_cbse_06_004', 'c11_eng_w_cbse_06_005', 'c11_eng_w_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an immigrant measuring three continents of displacement', intro: 'Calcutta to a London boarding house to a Boston room with a centenarian landlady — the rent was inconceivable; so was staying.', goal: 'Read the three-continent structure as cumulative growth and evaluate the circular frame.' },
    discovery: {
        question: 'The story is set in 1969 — is the moon landing just a date stamp for flavour?',
        options: ['No — it\'s a structural engine: Mrs. Croft\'s nightly \'Splendid!\' ritual over the flag becomes the bridge between a 103-year-old widow and a new immigrant', 'Yes — it only fixes the year for exam purposes', 'No — but only because Lahiri herself watched it', 'Yes — it\'s a metaphor with no function in the plot'],
        answer: 'No — it\'s a structural engine: Mrs. Croft\'s nightly \'Splendid!\' ritual over the flag becomes the bridge between a 103-year-old widow and a new immigrant',
        hook: 'The narrator isn\'t Lahiri, and the moon isn\'t trivia — both are deliberate architecture: a flag on the moon lets two strangers share a country.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides the essential historical, cultural, biographical, and literary frameworks that enable a Class 11 student to interpret Jhumpa Lahiri\'s "The Third and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Order India, London and Boston as one continuous preparation — then place the climax where the narrator\'s two worlds finally meet over \'Splendid!\'',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are moving from a small town in Bihar to Delhi for Class 11 — new language on the streets, different food in the canteen, unfamiliar social codes.',
            decisions: [{ prompt: 'Identify the three continents referenced in the title "The Third and Final Continent" and the approximate years the narrator spends.', options: [
                { text: 'The three continents are: (1) Asia/India', outcome: 'The three continents are: (1) Asia/India — the narrator leaves in 1964 at age ~31; (2).' },
                { text: 'Australia', outcome: 'Not quite — Students treat "context" as a static list of facts (author birth date, historical events.', reveals: 'students-treat-context-as-a' },
                { text: 'Africa', outcome: 'Not quite — Students treat "context" as a static list of facts (author birth date, historical events.', reveals: 'students-treat-context-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are explaining this story to a friend who hasn\'t read it.',
            decisions: [{ prompt: 'What is the primary narrative perspective used in "The Third and Final Continent," and how does it limit or expand the reader\'s access.', options: [
                { text: 'The story uses first-person retrospective narration ("I left India in 1964...")', outcome: 'The story uses first-person retrospective narration ("I left India in 1964...").' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students often treat the "three continents" as three separate stories (India story, London story.', reveals: 'students-often-treat-the-three' },
                { text: 'first-person', outcome: 'Not quite — Students often treat the "three continents" as three separate stories (India story, London story.', reveals: 'students-often-treat-the-three' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you meet someone who has lived in three countries in ten years — India, UK, USA — and now calls a fourth place home.',
            decisions: [{ prompt: 'What is the narrator\'s profession and where does he work during his first six weeks in America?', options: [
                { text: 'The narrator works in the processing department of the Dewey Library at MIT', outcome: 'The narrator works in the processing department of the Dewey Library at MIT.' },
                { text: 'he works at Harvard', outcome: 'Not quite — Students often mistake the narrator\'s silence and passivity for lack of personality or agency.', reveals: 'students-often-mistake-the-narrator' },
                { text: 'he is a student', outcome: 'Not quite — Students often mistake the narrator\'s silence and passivity for lack of personality or agency.', reveals: 'students-often-mistake-the-narrator' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re asked in the board exam: "How does Mrs. Croft\'s eccentricity serve a larger purpose in the story?" Don\'t start by listing her odd habits.',
            decisions: [{ prompt: 'Identify the three supporting characters in "The Third and Final Continent" and state one defining trait for each that distinguishes them.', options: [
                { text: 'The three supporting characters are Mrs', outcome: 'The three supporting characters are Mrs. Croft (the 103-year-old landlady, defined by rigid ritual.' },
                { text: 'less page time', outcome: 'Not quite — Students treat supporting characters as "minor" and write descriptive summaries (Mrs.', reveals: 'students-treat-supporting-characters-as' },
                { text: 'less thematic weight', outcome: 'Not quite — Students treat supporting characters as "minor" and write descriptive summaries (Mrs.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are the narrator, stepping off a plane in Boston in 1969 with eight dollars, a borrowed coat, and a wife you barely know waiting in Calcutta.',
            decisions: [{ prompt: 'What is the primary theme of "The Third and Final Continent" as distinct from its secondary themes?', options: [
                { text: 'The primary theme is the quiet heroism of the immigrant experience', outcome: 'The primary theme is the quiet heroism of the immigrant experience — the resilience required.' },
                { text: 'the story is about an Indian man moving to America', outcome: 'Not quite — Students often identify "cultural conflict" or "arranged marriage" as the primary theme because.', reveals: 'students-often-identify-cultural-conflict' },
                { text: 'it\'s about arranged marriage', outcome: 'Not quite — Students often identify "cultural conflict" or "arranged marriage" as the primary theme because.', reveals: 'students-often-identify-cultural-conflict' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a \'migration narratives\' exhibit your class curates \'The Third and Final Continent\'. A volunteer writes the placard: \'A man moves from India to London to America — a travel story about three addresses, ending happily.\'',
            decisions: [{ prompt: 'What does the placard flatten?', options: [
                { text: 'The diasporic arc: 1969 anchors it — the same week a Bengali immigrant watches a century-old landlady\'s ordinary rigor while men walk on the moon; personal settlement and epochal change are deliberately interleaved. It\'s about learning to belong across three continents — arranged marriage ripening into love — not a checklist of cities.', outcome: 'Lahiri braids the mundane and the monumental; reading it as travelogue misses how small domestic rituals carry the weight of historic transition.' },
                { text: 'The placard is fine — the title literally counts continents, so it\'s a journey story.', outcome: 'The \'third and final\' is about settlement and belonging, not itinerary — the moon landing is juxtaposed to frame a private milestone as epochal.', reveals: 'continents-are-just-stops' },
                { text: 'It\'s mainly about the landlady\'s eccentricity — a comic character sketch.', outcome: 'Mrs Croft\'s stern rituals matter as the immigrant\'s first American curriculum — her eccentricity teaches belonging; she\'s instrument, not subject.', reveals: 'landlady-is-the-subject' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Three continents aren\'t three stories — each one trains him for the next, and the last frame drives his son past the street where America began for him.',
            decisions: [{ prompt: 'What comes next? The Third and Final Continent (Short Story) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Third and Final Continent (Short Story) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides the essential historical.',
          hint: 'Review c10_engl_cbse_02_001 (Mandela context) and c10_engl_cbse_04_001 (Anne Frank.',
          misconception: 'Students treat "context" as a static list of facts (author birth date, historical events, vocabulary definitions).',
          parts: [
                { id: 'a', prompt: 'Identify the three continents referenced in the title "The Third and Final Continent" and the approximate years the narrator spends on each, based on the.', answer: 'The three continents are: (1) Asia/India',
                  options: ['The three continents are: (1) Asia/India', 'Australia', 'Africa', 'Australia" or "Africa" or reversing the order'],
                  hint: 'Review c10_engl_cbse_02_001 (Mandela context) and c10_engl_cbse_04_001 (Anne Frank context).',
                  misconception: 'Students treat "context" as a static list of facts (author birth date, historical events, vocabulary definitions) rather than a dynamic.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['If a student cannot move beyond fact-listing: Step 1 — Give them a "Context Lens" template with four columns.', 'Step 2 — Model one row together: Fact = Moon landing July 1969; Evidence = Pilot announces it, Mrs Croft demands.', 'humanity, transient heroism vs.', 'Step 3 — Have them complete three rows independently (e.g., Immigration Act 1965, Bengali arranged marriage codes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "context" as a static list of facts (author birth date, historical events, vocabulary definitions).',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of using Mrs Croft\'s age (103, born 1866) as a historical anchor in the story.', answer: 'Mrs Croft functions as BOTH a credible historical witness AND a symbolic device',
                  options: ['Mrs Croft functions as BOTH a credible historical witness AND a symbolic device', 'she\'s just a symbol of America', 'she\'s just a real old lady'],
                  hint: 'Review c10_engl_cbse_02_001 (Mandela context) and c10_engl_cbse_04_001 (Anne Frank context).',
                  misconception: 'Students treat "context" as a static list of facts (author birth date, historical events, vocabulary definitions) rather than a dynamic.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['If a student cannot move beyond fact-listing: Step 1 — Give them a "Context Lens" template with four columns.', 'Step 2 — Model one row together: Fact = Moon landing July 1969; Evidence = Pilot announces it, Mrs Croft demands.', 'humanity, transient heroism vs.', 'Step 3 — Have them complete three rows independently (e.g., Immigration Act 1965, Bengali arranged marriage codes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_002', difficulty: 'standard',
          question: 'Plot is the sequence of causally linked events that form the narrative arc of.',
          hint: 'Review "The Thief\'s Story" (Class 10, c10_engl_cbse_11_001) focusing on how Hari Singh\'s.',
          misconception: 'Students often treat the "three continents" as three separate stories (India story, London story, America story) rather.',
          parts: [
                { id: 'a', prompt: 'What is the primary narrative perspective used in "The Third and Final Continent," and how does it limit or expand the reader\'s access to the plot events?', answer: 'The story uses first-person retrospective narration ("I left India in 1964...")',
                  options: ['The story uses first-person retrospective narration ("I left India in 1964...")', 'third-person omniscient', 'first-person'],
                  hint: 'Review "The Thief\'s Story" (Class 10, c10_engl_cbse_11_001) focusing on how Hari Singh\'s.',
                  misconception: 'Students often treat the "three continents" as three separate stories (India story, London story, America story) rather than one continuous.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['If a student separates the continents, guide them to list five specific habits/skills the narrator develops in London.', 'Use a two-column table: "London Learning" → "America Application." This makes the structural continuity visible.', 'Emphasize that Lahiri could have started in America but chose to include London to *show the making of the man* who can.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_003', difficulty: 'standard',
          question: 'Setting in literature refers to the time, place, and social environment.',
          hint: 'Review "Imagery of Nature" (c8_engl_ch4_7) and "Atmosphere: Heat, Silence and.',
          misconception: 'Students often treat setting as a static list of locations ("first he was in London, then Boston") rather than as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting in literature refers to the time, place, and social environment in',
                  options: ['Setting in literature refers to the time, place, and social environment in', '"Before You Read: Context and Background" provides the essential historical, cultural,', 'Plot is the sequence of causally linked events that form the narrative arc of a story,', 'Character analysis of the protagonist involves examining the narrator\'s personality'],
                  hint: 'Review "Imagery of Nature" (c8_engl_ch4_7) and "Atmosphere: Heat, Silence and Anticipation".',
                  misconception: 'Students often treat setting as a static list of locations ("first he was in London, then Boston") rather than as an *active emotional.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If a student cannot move beyond location-listing: (1) Give them a two-column table: Column A = Setting, Column.', '(2) Have them fill it for YMCA and Mrs.', 'Croft\'s house side-by-side.', '(3) Ask: "What does the *contrast* in Column B tell you about the narrator\'s inner journey?" (4) Model one PEEL.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the narrator\'s.',
          hint: 'Review c11_eng_w_cbse_06_002 for the timeline and c11_eng_w_cbse_06_001 for the meaning.',
          misconception: 'Students often mistake the narrator\'s silence and passivity for lack of personality or agency, writing "he just does.',
          parts: [
                { id: 'a', prompt: 'What is the narrator\'s profession and where does he work during his first six weeks in America?', answer: 'The narrator works in the processing department of the Dewey Library at MIT',
                  options: ['The narrator works in the processing department of the Dewey Library at MIT', 'he works at Harvard', 'he is a student', 'Harvard or Tech'],
                  hint: 'Review c11_eng_w_cbse_06_002 for the timeline and c11_eng_w_cbse_06_001 for the meaning.',
                  misconception: 'Students often mistake the narrator\'s silence and passivity for lack of personality or agency, writing "he just does what he\'s told.".' },
                { id: 'b', prompt: 'Explain in your own words why the narrator feels "mortified" when he learns Mrs. Croft is 103 years old.', answer: 'The narrator feels mortified',
                  options: ['The narrator feels mortified', 'she is very old'],
                  hint: 'Review c11_eng_w_cbse_06_002 for the timeline and c11_eng_w_cbse_06_001 for the meaning.',
                  misconception: 'Students often mistake the narrator\'s silence and passivity for lack of personality or agency, writing "he just does what he\'s told.".' }
          ],
            remediations: { 'students-often-mistake-the-narrator': { steps: ['If a student writes "the narrator is passive," ask: "List three things he *chooses* to do for Mrs.', 'Croft that he didn\'t have to." (1) Say "splendid" loudly.', '(2) Hand rent to her directly instead of leaving it on the piano.', '(3) Return to visit after moving out.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters examines how secondary figures.',
          hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_06_004) Worked Example 1 on the.',
          misconception: 'Students treat supporting characters as "minor" and write descriptive summaries (Mrs.',
          parts: [
                { id: 'a', prompt: 'Identify the three supporting characters in "The Third and Final Continent" and state one defining trait for each that distinguishes them from the narrator.', answer: 'The three supporting characters are Mrs',
                  options: ['The three supporting characters are Mrs', 'less page time', 'less thematic weight', 'lists only two characters or gives generic traits (e'],
                  hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_06_004) Worked Example 1 on the narrator\'s.',
                  misconception: 'Students treat supporting characters as "minor" and write descriptive summaries (Mrs.' },
                { id: 'b', prompt: 'Explain in your own words why the narrator initially finds Mrs.', answer: 'The narrator finds the demand insulting',
                  options: ['The narrator finds the demand insulting', 'less page time', 'less thematic weight'],
                  hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_06_004) Worked Example 1 on the narrator\'s.',
                  misconception: 'Students treat supporting characters as "minor" and write descriptive summaries (Mrs.' },
                { id: 'c', prompt: 'Apply the concept of "character as thematic mirror" to Helen. Using two specific textual details, show how her behavior contrasts with Mrs.', answer: 'Helen opens soup cans Mrs',
                  options: ['Helen opens soup cans Mrs', 'disrespectful', 'loving', 'less page time'],
                  hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_06_004) Worked Example 1 on the narrator\'s.',
                  misconception: 'Students treat supporting characters as "minor" and write descriptive summaries (Mrs.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['Have the student reread only the scenes where the narrator interacts with *one* supporting character (e.g., all Mrs.', 'For each scene, ask: "What does the narrator *do*?', 'What does the character *make him do*?', 'What changes in him after?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_06_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea — the.',
          hint: 'If stuck, review c11_eng_w_cbse_06_002 (Plot and Narrative Structure) to re-map the three.',
          misconception: 'Students often identify "cultural conflict" or "arranged marriage" as the primary theme because these are prominent.',
          parts: [
                { id: 'a', prompt: 'What is the primary theme of "The Third and Final Continent" as distinct from its secondary themes? State it in one precise sentence using literary terminology.', answer: 'The primary theme is the quiet heroism of the immigrant experience',
                  options: ['The primary theme is the quiet heroism of the immigrant experience', 'the story is about an Indian man moving to America', 'it\'s about arranged marriage'],
                  hint: 'If stuck, review c11_eng_w_cbse_06_002 (Plot and Narrative Structure) to re-map the three phases.',
                  misconception: 'Students often identify "cultural conflict" or "arranged marriage" as the primary theme because these are prominent plot elements.' }
          ],
            remediations: { 'students-often-identify-cultural-conflict': { steps: ['Ask the student to list the three major phases of the narrator\'s life in the story (India/England, YMCA/Mrs.', 'For each phase, identify ONE repeated action that signifies adaptation (e.g., egg curry in London, "splendid" ritual.', 'Croft, cornflakes/knitting with Mala).', 'Have the student complete this sentence frame: "The story suggests that belonging is built not by _____ but by _____.".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
