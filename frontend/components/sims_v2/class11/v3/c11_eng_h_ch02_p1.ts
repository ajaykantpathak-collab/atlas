import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch02_p1: SimDef = {
    id: 'v3_c11_eng_h_ch02_p1',
    title: 'We\'re Not Afraid to Die · Part 1/3',
    subtitle: 'Find the real climax of a survival story — and why the bravest line comes after it.',
    classLevel: 11, subject: 'eng_h', topic: 'We\'re Not Afraid to Die · Part 1/3',
    chapters: ['c11_eng_h_ch02'],
    nodeIds: ['c11_eng_h_cbse_02_001', 'c11_eng_h_cbse_02_002', 'c11_eng_h_cbse_02_003', 'c11_eng_h_cbse_02_004', 'c11_eng_h_cbse_02_005', 'c11_eng_h_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a narrator reconstructing a voyage that nearly killed everyone', intro: 'A businessman\'s family sets out to retrace Captain Cook\'s wake — and the Southern Ocean takes the dare.', goal: 'Analyse the narrative structure of a survival account and place its true climax.' },
    discovery: {
        question: 'Fifteen hours of pumping and repairs fill most of the survival account — so is that the climax?',
        options: ['No — the climax is the single moment the wave strikes; the pumping is falling action after the peak', 'Yes — the longest, most dangerous stretch is always the climax', 'No — the climax is reaching the island safely', 'Yes — duration and effort define dramatic peak'],
        answer: 'No — the climax is the single moment the wave strikes; the pumping is falling action after the peak',
        hook: 'Duration isn\'t intensity — the climax is the instant death became possible, not the long labour of surviving it.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'We\'re Not Afraid to Die\' (Hornbill, ch. 2) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map the three sections onto the five dramatic stages, then explain why the children\'s courage is saved for the falling action.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'We\'re Not Afraid to Die\', then the period, then the literary context — background turns a text from a puzzle into a story you can.',
            decisions: [{ prompt: 'What was the specific historical voyage that Gordon Cook\'s family attempted to duplicate, and in what year did the original voyage take.', options: [
                { text: 'The family aimed to duplicate Captain James Cook\'s round-the-world voyage made 200 years', outcome: 'The family aimed to duplicate Captain James Cook\'s round-the-world voyage made 200 years earlier.' },
                { text: 'Magellan\'s circumnavigation', outcome: 'Not quite — Students often treat "Before You Read" as optional background trivia rather than a comprehension.', reveals: 'students-often-treat-before-you' },
                { text: 'Darwin\'s Beagle voyage', outcome: 'Not quite — Students often treat "Before You Read" as optional background trivia rather than a comprehension.', reveals: 'students-often-treat-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'We\'re Not Afraid to Die\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What are the five stages of Freytag\'s pyramid in the correct order?', options: [
                { text: 'The five stages are: 1) Exposition, 2) Rising Action, 3) Climax, 4) Falling Action, 5)', outcome: 'The five stages are: 1) Exposition, 2) Rising Action, 3) Climax, 4) Falling Action, 5) Resolution.' },
                { text: 'Introduction, Conflict, Ending', outcome: 'Not quite — Students often believe the "climax" is the entire storm or the pumping ordeal because those are the.', reveals: 'the-climax-is-the-entire' },
                { text: 'climax', outcome: 'Not quite — Students often believe the "climax" is the entire storm or the pumping ordeal because those are the.', reveals: 'the-climax-is-the-entire' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'We\'re Not Afraid to Die\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What are the three main physical settings in "We\'re Not Afraid to Die" and the key atmospheric shift that occurs in each?', options: [
                { text: 'The three main physical settings are: (1) Plymouth/Cape Town/pleasant seas', outcome: 'The three main physical settings are: (1) Plymouth/Cape Town/pleasant seas — atmosphere.' },
                { text: 'the boat', outcome: 'Not quite — Students often treat setting as a static "where and when" backdrop and atmosphere as a separate.', reveals: 'students-often-treat-setting-as' },
                { text: 'the island', outcome: 'Not quite — Students often treat setting as a static "where and when" backdrop and atmosphere as a separate.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'We\'re Not Afraid to Die\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is the narrator\'s profession and how long had he prepared for this voyage?', options: [
                { text: 'The narrator is a 37-year-old businessman who, along with his wife, spent 16 years honing', outcome: 'The narrator is a 37-year-old businessman who, along with his wife, spent 16 years honing seafaring.' },
                { text: 'he was a professional sailor', outcome: 'Not quite — Students often treat the narrator as a flat "hero" figure, listing brave actions without analyzing.', reveals: 'students-often-treat-the-narrator' },
                { text: 'he had no experience', outcome: 'Not quite — Students often treat the narrator as a flat "hero" figure, listing brave actions without analyzing.', reveals: 'students-often-treat-the-narrator' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'We\'re Not Afraid to Die\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List the five supporting characters in "We\'re Not Afraid to Die" and state one specific action each takes during the crisis (January 2–6).', options: [
                { text: 'Mary: takes the wheel for crucial hours while the captain repairs the hull', outcome: 'Mary: takes the wheel for crucial hours while the captain repairs the hull; Jonathan (6): asks "Are.' },
                { text: 'they helped', outcome: 'Not quite — Students often treat supporting characters as functional plot devices (e.g., "Mary steers the.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'We\'re Not Afraid to Die\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the exact sentence Jon speaks on January 5 that crystallizes the primary theme of the narrative?', options: [
                { text: 'Jon says: "But, Daddy, we aren\'t afraid of dying if we can all be together', outcome: 'Jon says: "But, Daddy, we aren\'t afraid of dying if we can all be together — you and Mummy, Sue and.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students conflate "theme" with "topic" (e.g., writing "the theme is survival" or "the theme.', reveals: 'students-conflate-theme-with-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For the school magazine you\'re editing a survival narrative: an amateur sailor\'s family attempts a round-the-world voyage in 1976, departing Plymouth in July. A junior editor asks why the piece opens with Captain Cook\'s 1768 expedition and suggests cutting the \'history trivia\' to get to the storm faster.',
            decisions: [{ prompt: 'Keep or cut the Cook reference?', options: [
                { text: 'Keep it — it\'s the thematic frame, not trivia: the family deliberately set out \'in the wake\' of Cook\'s first voyage, matching the departure point and month roughly two centuries on. That parallel poses the story\'s real question — can modern amateurs with modern technology survive the same seas that tested 18th-century seamanship?', outcome: 'Without the Cook frame the opening reads as biography; with it, the whole ordeal becomes a structured test across 200 years.' },
                { text: 'Cut it — background paragraphs are decoration; readers only care about the wave.', outcome: 'Stripping the frame loses the story\'s wager: technology and amateur skill against a route that defeated professionals — the tension that makes the survival meaningful.', reveals: 'context-is-decoration' },
                { text: 'Keep it but describe the voyage as a professional Navy expedition — sailors don\'t take families.', outcome: 'That erases the stakes: they were a businessman-narrator and family, deliberately honing amateur skills to replicate a professional\'s route — amateurism is the point.', reveals: 'narrator-was-a-professional' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Placing \'we aren\'t afraid of dying if we can all be together\' after the wave turns a disaster log into a testament to family unity.',
            decisions: [{ prompt: 'What comes next? We\'re Not Afraid to Die · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — We\'re Not Afraid to Die · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_02_001', difficulty: 'standard',
          question: '\'We\'re Not Afraid to Die\' (Hornbill, ch. 2) — the context and background.',
          hint: 'Review Class 10 "Diary of Anne Frank" (c10_engl_cbse_04_001) for practice identifying.',
          misconception: 'Students often treat "Before You Read" as optional background trivia rather than a comprehension scaffold.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'We\'re Not Afraid to Die\' (Hornbill, ch',
                  options: ['\'We\'re Not Afraid to Die\' (Hornbill, ch', 'The plot/narrative arc of \'We\'re Not Afraid to Die\'', 'The setting of \'We\'re Not Afraid to Die\'', 'Character analysis in \'We\'re Not Afraid to Die\''],
                  hint: 'Review Class 10 "Diary of Anne Frank" (c10_engl_cbse_04_001) for practice identifying.',
                  misconception: 'Students often treat "Before You Read" as optional background trivia rather than a comprehension scaffold.' }
          ],
            remediations: { 'students-often-treat-before-you': { steps: ['Have the student re-read only the first paragraph and underline every proper noun and date.', 'Why July?" — guide them to calculate 1976–1768 = 208 years (≈200).', 'Show a map of Cook\'s first voyage route vs.', 'the family\'s planned route — identify the overlapping Southern Ocean leg.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_02_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'We\'re Not Afraid to Die\' — what happens, in what.',
          hint: 'Review Freytag\'s pyramid and first-person narrative using Class 10 node.',
          misconception: 'Students often believe the "climax" is the entire storm or the pumping ordeal because those are the longest, most.',
          parts: [
                { id: 'a', prompt: 'Map the five stages of Freytag\'s pyramid onto the three narrative sections of the text. Which stage spans across two sections?', answer: 'Exposition and Rising Action occur in Section 1 (preparation to wave strike)',
                  options: ['Exposition and Rising Action occur in Section 1 (preparation to wave strike)', 'climax'],
                  hint: 'Review Freytag\'s pyramid and first-person narrative using Class 10 node c10_engl_cbse_03_006 (The.',
                  misconception: 'Students often believe the "climax" is the entire storm or the pumping ordeal because those are the longest, most action-packed parts.' }
          ],
            remediations: { 'the-climax-is-the-entire': { steps: ['Draw Freytag\'s pyramid on paper.', 'Re-read only the first section (up to "____________") and mark the exact sentence where the wave hits ("A tremendous.', 'Label that point "Climax." 4.', 'Everything before it in Section 1 is Exposition/Rising Action.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_02_003', difficulty: 'standard',
          question: 'The setting of \'We\'re Not Afraid to Die\' — the place, time and atmosphere the.',
          hint: 'Review Class 7 "Atmosphere: Heat, Silence and Anticipation in the Jungle".',
          misconception: 'Students often treat setting as a static "where and when" backdrop and atmosphere as a separate "mood" label.',
          parts: [
                { id: 'a', prompt: 'What are the three main physical settings in "We\'re Not Afraid to Die" and the key atmospheric shift that occurs in each?', answer: 'The three main physical settings are: (1) Plymouth/Cape Town/pleasant seas',
                  options: ['The three main physical settings are: (1) Plymouth/Cape Town/pleasant seas', 'the boat', 'the island'],
                  hint: 'Review Class 7 "Atmosphere: Heat, Silence and Anticipation in the Jungle" (c7_engl_ch04_005) for.',
                  misconception: 'Students often treat setting as a static "where and when" backdrop and atmosphere as a separate "mood" label.' },
                { id: 'b', prompt: 'Compare the atmosphere inside the children\'s cabin (Jon and Sue\'s space) with the atmosphere on deck during the crisis.', answer: 'The cabin atmosphere is quiet, contained, and protective',
                  options: ['The cabin atmosphere is quiet, contained, and protective', 'inside vs outside'],
                  hint: 'Review Class 7 "Atmosphere: Heat, Silence and Anticipation in the Jungle" (c7_engl_ch04_005) for.',
                  misconception: 'Students often treat setting as a static "where and when" backdrop and atmosphere as a separate "mood" label.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student create a three-column table: Column 1 = Date/Time, Column 2 = Physical Setting Details (quotes).', 'Fill in: July 1976/Plymouth → "honing our seafaring skills," "pleasantly" → confident anticipation.', 'Fill in: Jan 2/6pm → "ominous silence," "growing roar," "vertical wave" → dread/terror.', 'Fill in: Jan 6/morning → "stark outline," "bleak volcanic rock" → relief/beauty.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat setting as a static "where and when" backdrop and atmosphere as a separate "mood" label.',
          parts: [
                { id: 'a', prompt: 'The narrator describes Ile Amsterdam as "only a bleak piece of volcanic rock, with little vegetation — the most beautiful island in the world!" Is this.', answer: 'It\'s a deliberate atmospheric technique',
                  options: ['It\'s a deliberate atmospheric technique', 'contradictory', 'confusing'],
                  hint: 'Review Class 7 "Atmosphere: Heat, Silence and Anticipation in the Jungle" (c7_engl_ch04_005) for.',
                  misconception: 'Students often treat setting as a static "where and when" backdrop and atmosphere as a separate "mood" label.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student create a three-column table: Column 1 = Date/Time, Column 2 = Physical Setting Details (quotes).', 'Fill in: July 1976/Plymouth → "honing our seafaring skills," "pleasantly" → confident anticipation.', 'Fill in: Jan 2/6pm → "ominous silence," "growing roar," "vertical wave" → dread/terror.', 'Fill in: Jan 6/morning → "stark outline," "bleak volcanic rock" → relief/beauty.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_02_004', difficulty: 'standard',
          question: 'Character analysis in \'We\'re Not Afraid to Die\' — the central figure(s), their.',
          hint: 'Review "Diary as a Literary Form" (c10_engl_cbse_04_007) to reinforce how first-person.',
          misconception: 'Students often treat the narrator as a flat "hero" figure, listing brave actions without analyzing his fear, doubt, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis in \'We\'re Not Afraid to Die\'',
                  options: ['Character analysis in \'We\'re Not Afraid to Die\'', '\'We\'re Not Afraid to Die\' (Hornbill, ch', 'The plot/narrative arc of \'We\'re Not Afraid to Die\'', 'The setting of \'We\'re Not Afraid to Die\''],
                  hint: 'Review "Diary as a Literary Form" (c10_engl_cbse_04_007) to reinforce how first-person narration.',
                  misconception: 'Students often treat the narrator as a flat "hero" figure, listing brave actions without analyzing his fear, doubt, and physical.' }
          ],
            remediations: { 'students-often-treat-the-narrator': { steps: ['Re-read the three sections where the narrator is physically injured (head smashed, ribs cracked, dozing off).', 'For each, ask: "What is he thinking/feeling here?" and find the exact sentence.', 'Create a two-column table: "External Action" vs "Internal State" for the whole ordeal.', 'Write one paragraph explaining how the contrast between columns deepens our respect for him.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_02_005', difficulty: 'standard',
          question: 'Supporting characters in \'We\'re Not Afraid to Die\' — the secondary figures who.',
          hint: 'If stuck, review the captain\'s character analysis (c11_eng_h_cbse_02_004) focusing on how.',
          misconception: 'Students often treat supporting characters as functional plot devices (e.g., "Mary steers the ship," "Larry pumps.',
          parts: [
                { id: 'a', prompt: 'List the five supporting characters in "We\'re Not Afraid to Die" and state one specific action each takes during the crisis (January 2–6).', answer: 'Mary: takes the wheel for crucial hours while the captain repairs the hull',
                  options: ['Mary: takes the wheel for crucial hours while the captain repairs the hull', 'they helped'],
                  hint: 'If stuck, review the captain\'s character analysis (c11_eng_h_cbse_02_004) focusing on how the.',
                  misconception: 'Students often treat supporting characters as functional plot devices (e.g., "Mary steers the ship," "Larry pumps water") rather than.' },
                { id: 'b', prompt: 'Compare the roles of the two crewmen (Larry and Herb) with the roles of the family members (Mary, Jonathan, Suzanne) in the survival effort.', answer: 'Larry and Herb provide technical labor: pumping, steering, maintaining equipment',
                  options: ['Larry and Herb provide technical labor: pumping, steering, maintaining equipment', 'togetherness'],
                  hint: 'If stuck, review the captain\'s character analysis (c11_eng_h_cbse_02_004) focusing on how the.',
                  misconception: 'Students often treat supporting characters as functional plot devices (e.g., "Mary steers the ship," "Larry pumps water") rather than.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Re-read the final three paragraphs (from "With land under my feet again...") where the narrator explicitly evaluates.', 'Create a two-column chart: Column A = specific adjective/adverb the narrator uses (e.g., "cheerful," "optimistic,".', 'For each character, write one sentence explaining how Column A changes the meaning of Column B.', 'Practice a 100-word PEEL paragraph on one character using this chart.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_02_006', difficulty: 'standard',
          question: 'The primary theme of \'We\'re Not Afraid to Die\' — the central idea the whole.',
          hint: 'If stuck, return to c11_eng_h_cbse_02_002 Step 3: "Identify the three narrative sections.',
          misconception: 'Students conflate "theme" with "topic" (e.g., writing "the theme is survival" or "the theme is adventure") because.',
          parts: [
                { id: 'a', prompt: 'What is the exact sentence Jon speaks on January 5 that crystallizes the primary theme of the narrative?', answer: 'Jon says: "But, Daddy, we aren\'t afraid of dying if we can all be together',
                  options: ['Jon says: "But, Daddy, we aren\'t afraid of dying if we can all be together', 'A wrong answer (e.g'],
                  hint: 'If stuck, return to c11_eng_h_cbse_02_002 Step 3: "Identify the three narrative sections and the.',
                  misconception: 'Students conflate "theme" with "topic" (e.g., writing "the theme is survival" or "the theme is adventure") because Class 10 questions often.' }
          ],
            remediations: { 'students-conflate-theme-with-topic': { steps: ['Ask the student: "If you removed the children from this story, would the father still survive?', 'Find three moments where his actions are explicitly motivated by them." 2.', 'Have them rewrite Jon\'s line as a conditional statement: "IF ______, THEN ______." 3.', 'Show how Sue\'s card and the "best captain" moment are the narrative\'s *answer* to that conditional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
