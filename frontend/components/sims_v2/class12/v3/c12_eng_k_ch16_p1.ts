import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch16_p1: SimDef = {
    id: 'v3_c12_eng_k_ch16_p1',
    title: 'Film-Making (Non-fiction) · Part 1/3',
    subtitle: 'The conjurer\'s secret: you sit in darkness 27 minutes an hour',
    classLevel: 12, subject: 'eng_k', topic: 'Film-Making (Non-fiction) · Part 1/3',
    chapters: ['c12_eng_k_ch16'],
    nodeIds: ['c12_eng_k_cbse_16_001', 'c12_eng_k_cbse_16_002', 'c12_eng_k_cbse_16_003', 'c12_eng_k_cbse_16_004', 'c12_eng_k_cbse_16_005', 'c12_eng_k_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Film-craft essayist', intro: 'The \'poet of the human face\' explains why a screenplay can never contain a film — and why that\'s the point.', goal: 'Understand Bergman\'s film-as-rhythm philosophy, the conjurer and cathedral metaphors, and the adaptation debate with Eco.' },
    discovery: {
        question: 'Bergman calls the film-maker a conjurer whose audience sits in total darkness 27 minutes of every hour. What\'s the deception?',
        options: ['Persistence of vision — 24 still frames per second with dark gaps between them read as continuous motion; cinema is an illusion that works on the eye', 'Film is fake — nothing moves', 'Audiences nap during films', 'Projectors steal time'],
        answer: 'Persistence of vision — 24 still frames per second with dark gaps between them read as continuous motion; cinema is an illusion that works on the eye',
        hook: 'Bergman insists film is closer to music than literature — it hits emotion through rhythm and montage, not intellect. That\'s why he calls the script \'a very imperfect technical basis\': dialogue survives translation, but a film\'s breathing — its moods, tones, tensions — never fits into words.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Film-Making\' (Kaleidoscope, ch. 16) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_16_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Argue film vs literature like Bergman: test the conjurer metaphor on a famous scene\'s editing rhythm, then cross-examine Eco\'s regret that an adaptation fixes \'how the reader must imagine.\'',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Film-Making\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is Ingmar Bergman and name two of his famous films mentioned in the text.', options: [
                { text: 'Ingmar Bergman (1918–2007) was a renowned Swedish film director known for stark', outcome: 'Ingmar Bergman (1918–2007) was a renowned Swedish film director known for stark black-and-white.' },
                { text: 'conjurer', outcome: 'Not quite — Students often believe Bergman completely opposes adapting books into films.', reveals: 'bergman-completely-opposes-adapting-books' },
                { text: 'Bergman completely opposes adapting books into films', outcome: 'Not quite — Students often believe Bergman completely opposes adapting books into films.', reveals: 'bergman-completely-opposes-adapting-books' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'Film-Making\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the opening anecdote of Bergman\'s essay, and what structural function does it serve in the overall narrative?', options: [
                { text: 'The essay opens with the cranes circling over the Dalarna landscape during the shooting', outcome: 'The essay opens with the cranes circling over the Dalarna landscape during the shooting of *The.' },
                { text: 'Bergman first saw cranes, then remembered childhood, then discussed rhythm', outcome: 'Not quite — Students treat Bergman\'s essay as a linear autobiography — listing childhood, then first projector.', reveals: 'students-treat-bergman-s-essay' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Film-Making\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'Identify the *first* physical setting described in Bergman\'s essay and state the exact time, temperature, and one sensory detail mentioned.', options: [
                { text: 'The first setting is the landscape of Dalarna during the shooting of *The Virgin Spring*:', outcome: 'The first setting is the landscape of Dalarna during the shooting of *The Virgin Spring*: early.' },
                { text: 'grey, rain-dimmed sky', outcome: 'Not quite — Students treat "setting" as mere location (Sweden, studio, vicarage) and "atmosphere" as a synonym.', reveals: 'students-treat-setting-as-mere' },
                { text: 'the grandmother\'s apartment', outcome: 'Not quite — Students treat "setting" as mere location (Sweden, studio, vicarage) and "atmosphere" as a synonym.', reveals: 'students-treat-setting-as-mere' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Film-Making\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What are the two childhood objects Bergman describes that first sparked his fascination with moving images, and what sensory details does.', options: [
                { text: 'The magic lantern (metal box, carbide lamp smell, coloured glass slides of Red Riding', outcome: 'The magic lantern (metal box, carbide lamp smell, coloured glass slides of Red Riding Hood where.' },
                { text: 'conjurer', outcome: 'Not quite — Students often treat Bergman\'s autobiographical narrator as a transparent window to the "real".', reveals: 'students-often-treat-bergman-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Film-Making\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List the seven supporting figures Bergman explicitly names in the essay (including the interview section) and state the one specific.', options: [
                { text: '**Correct answer:** 1', outcome: '**Correct answer:** 1. **Father & Mother** – Created a "strict middle-class home" Bergman rebelled.' },
                { text: 'the crane', outcome: 'Not quite — **Misconception:** "Supporting characters in non-fiction are just background info — less important.', reveals: 'misconception-supporting-characters-in-non' },
                { text: 'the magic lantern', outcome: 'Not quite — **Misconception:** "Supporting characters in non-fiction are just background info — less important.', reveals: 'misconception-supporting-characters-in-non' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Film-Making\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the central metaphor Bergman uses to describe his ideal role as a film-maker, and what does it imply about artistic identity?', options: [
                { text: 'The central metaphor is the **cathedral of Chartres**, where anonymous craftsmen', outcome: 'The central metaphor is the **cathedral of Chartres**, where anonymous craftsmen — master builders.' },
                { text: 'the conjurer', outcome: 'Not quite — Students treat the essay as **Bergman\'s biography** ("he had a magic lantern, then a projector.', reveals: 'students-treat-the-essay-as' },
                { text: 'the tightrope walker', outcome: 'Not quite — Students treat the essay as **Bergman\'s biography** ("he had a magic lantern, then a projector.', reveals: 'students-treat-the-essay-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A studio buys rights to a dense literary novel and instructs the director: \'translate it page-for-page — faithfulness is everything.\'',
            decisions: [{ prompt: 'Would Bergman sign off?', options: [
                { text: 'No — Bergman says film and literature are different languages; a literal translation wastes enormous effort for little fruit — reinvent the story in film\'s own terms or don\'t adapt it.', outcome: 'The conjurer works with rhythm and image on the nerves, not with sentences; fidelity to the letter can betray the spirit.' },
                { text: 'Yes — faithful means page-for-page, anything less betrays the book.', outcome: 'Bergman\'s warning is that the \'complicated adjustments\' of literal adaptation usually bear no fruit; faithfulness is to the experience, not the page order.', reveals: 'faithful-equals-literal' },
                { text: 'Adapt anything — a film is basically an illustrated book anyway.', outcome: 'That erases the medium\'s distinct address to emotion; film isn\'t literature with pictures.', reveals: 'film-is-illustrated-text' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend cinema as its own language — rhythm and illusion, not filmed prose. Bergman gives you a craftsman\'s manifesto for an entire art form.',
            decisions: [{ prompt: 'What comes next? Film-Making (Non-fiction) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Film-Making (Non-fiction) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_001', difficulty: 'standard',
          question: '\'Film-Making\' (Kaleidoscope, ch. 16) — the context and background to this text.',
          hint: 'If stuck, review c11_eng_h_cbse_01_001 (Before You Read for Hornbill Chapter 1) to see.',
          misconception: 'Students often believe Bergman completely opposes adapting books into films.',
          parts: [
                { id: 'a', prompt: 'Who is Ingmar Bergman and name two of his famous films mentioned in the text.', answer: 'Ingmar Bergman (1918–2007) was a renowned Swedish film director known for stark',
                  options: ['Ingmar Bergman (1918–2007) was a renowned Swedish film director known for stark', 'conjurer', 'Bergman completely opposes adapting books into films'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_001 (Before You Read for Hornbill Chapter 1) to see how context.',
                  misconception: 'Students often believe Bergman completely opposes adapting books into films.' },
                { id: 'b', prompt: 'Explain Bergman\'s metaphor of the film-maker as a conjurer. What does he mean by "deception of the human eye"?', answer: 'Bergman compares film-making to conjuring',
                  options: ['Bergman compares film-making to conjuring', 'conjurer', 'Bergman completely opposes adapting books into films'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_001 (Before You Read for Hornbill Chapter 1) to see how context.',
                  misconception: 'Students often believe Bergman completely opposes adapting books into films.' },
                { id: 'c', prompt: 'Using Bergman\'s idea that film is closer to music than literature, describe how a specific film scene uses rhythm and editing to evoke emotion without dialogue.', answer: 'Example: The shower scene in *Psycho* (Hitchcock)',
                  options: ['Example: The shower scene in *Psycho* (Hitchcock)', 'film as rhythm', 'conjurer', 'Bergman completely opposes adapting books into films'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_001 (Before You Read for Hornbill Chapter 1) to see how context.',
                  misconception: 'Students often believe Bergman completely opposes adapting books into films.' }
          ],
            remediations: { 'bergman-completely-opposes-adapting-books': { steps: ['If the student cannot identify Bergman\'s significance: have them watch the opening 5 minutes of *The Seventh Seal*.', 'Then re-attempt Diagnostic Question 1.', 'If the student conflates Bergman\'s and Eco\'s views: create a two-column table labeled "Bergman" and "Eco" with rows for.', 'Fill it using direct quotes from the text.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Bergman completely opposes adapting books into films.',
          parts: [
                { id: 'a', prompt: 'Write a short paragraph (50–60 words) from the perspective of a film director describing the "split second impression" that sparked the idea for a film, using.', answer: 'A single shaft of light cut through the dust in an abandoned library',
                  options: ['A single shaft of light cut through the dust in an abandoned library', 'conjurer', 'Bergman completely opposes adapting books into films'],
                  hint: 'If stuck, review c11_eng_h_cbse_01_001 (Before You Read for Hornbill Chapter 1) to see how context.',
                  misconception: 'Students often believe Bergman completely opposes adapting books into films.' }
          ],
            remediations: { 'bergman-completely-opposes-adapting-books': { steps: ['If the student cannot identify Bergman\'s significance: have them watch the opening 5 minutes of *The Seventh Seal*.', 'Then re-attempt Diagnostic Question 1.', 'If the student conflates Bergman\'s and Eco\'s views: create a two-column table labeled "Bergman" and "Eco" with rows for.', 'Fill it using direct quotes from the text.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Film-Making\' — what happens, in what order, and why.',
          hint: 'Review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" — Khushwant Singh uses.',
          misconception: 'Students treat Bergman\'s essay as a linear autobiography — listing childhood, then first projector, then mentors, then.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how Bergman\'s narrative structure differs from a conventional chronological autobiography.', answer: 'Bergman\'s structure is associative and thematic, not chronological',
                  options: ['Bergman\'s structure is associative and thematic, not chronological', 'Bergman first saw cranes, then remembered childhood, then discussed rhythm'],
                  hint: 'Review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" — Khushwant Singh uses associative.',
                  misconception: 'Students treat Bergman\'s essay as a linear autobiography — listing childhood, then first projector, then mentors, then industry struggles.' },
                { id: 'b', prompt: 'Apply the concept of "split-second impressions" to analyze the transition between the "Childhood Foretells Future" section and the "Split Second Impressions".', answer: 'The link is the "magic lantern" / "conjuring" motif',
                  options: ['The link is the "magic lantern" / "conjuring" motif', 'Bergman first saw cranes, then remembered childhood, then discussed rhythm'],
                  hint: 'Review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" — Khushwant Singh uses associative.',
                  misconception: 'Students treat Bergman\'s essay as a linear autobiography — listing childhood, then first projector, then mentors, then industry struggles.' },
                { id: 'c', prompt: 'Analyze how the "Rhythm of a Film" section structurally prepares the reader for the "Film and Written Literature" section. What conflict is being set up?', answer: 'The "Rhythm" section establishes film as a temporal, sensory, musical art',
                  options: ['The "Rhythm" section establishes film as a temporal, sensory, musical art', 'Bergman first saw cranes, then remembered childhood, then discussed rhythm'],
                  hint: 'Review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" — Khushwant Singh uses associative.',
                  misconception: 'Students treat Bergman\'s essay as a linear autobiography — listing childhood, then first projector, then mentors, then industry struggles.' }
          ],
            remediations: { 'students-treat-bergman-s-essay': { steps: ['Have the student physically cut the essay into 8 sections (by heading).', 'Ask them to rearrange in *chronological order of Bergman\'s life* — they\'ll see it\'s impossible (cathedral metaphor.', 'Then ask: "If not time, what logic connects Section 1 to Section 2?', 'Map the associative links on a whiteboard: cranes → thread from unconscious → conjuring → rhythm → music → literature.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_003', difficulty: 'standard',
          question: 'The setting of \'Film-Making\' — the place, time and atmosphere the text creates.',
          hint: 'If stuck, return to c11_eng_h_cbse_01_003 and practice the "Sensory Detail -> Atmosphere.',
          misconception: 'Students treat "setting" as mere location (Sweden, studio, vicarage) and "atmosphere" as a synonym for "mood.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'Film-Making\'',
                  options: ['The setting of \'Film-Making\'', '\'Film-Making\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Film-Making\'', 'Character analysis in \'Film-Making\''],
                  hint: 'If stuck, return to c11_eng_h_cbse_01_003 and practice the "Sensory Detail -> Atmosphere ->.',
                  misconception: 'Students treat "setting" as mere location (Sweden, studio, vicarage) and "atmosphere" as a synonym for "mood." In Bergman, setting.' }
          ],
            remediations: { 'students-treat-setting-as-mere': { steps: ['Re-read the opening paragraph (Dalarna) and the "Childhood Foretells Future" section.', 'Make a two-column table: Column A = Setting (quote phrase), Column B = What the setting *does* (e.g., "makes us drop.', 'For each row, name the atmosphere created (e.g., "reverent interruption," "childhood dread," "industrial suffocation").', 'Re-attempt Diagnostic Question 4 using this table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_004', difficulty: 'standard',
          question: 'Character analysis in \'Film-Making\' — the central figure(s), their traits, and.',
          hint: 'If stuck, review c11_eng_h_cbse_02_004 (Mandela\'s self-presentation in "Long Walk.',
          misconception: 'Students often treat Bergman\'s autobiographical narrator as a transparent window to the "real" Ingmar Bergman, listing.',
          parts: [
                { id: 'a', prompt: 'Apply Bergman\'s distinction between film and literature to analyze why he calls the screenplay "an almost impossible task." Your answer must reference the.', answer: 'Literature works through conscious intellect→imagination→emotion',
                  options: ['Literature works through conscious intellect→imagination→emotion', 'writing ability and perceptiveness', 'difficulty of writing'],
                  hint: 'If stuck, review c11_eng_h_cbse_02_004 (Mandela\'s self-presentation in "Long Walk to Freedom").',
                  misconception: 'Students often treat Bergman\'s autobiographical narrator as a transparent window to the "real" Ingmar Bergman, listing biographical facts.' }
          ],
            remediations: { 'students-often-treat-bergman-s': { steps: ['If a student falls into the biography trap: 1) Have them re-read the "Childhood Foretells Future" section and highlight.', '2) Assign a T-chart: left column "What the child experienced," right column "What the adult filmmaker *claims*.', '3) For the religion error: locate the "clergyman\'s son" paragraph and distinguish "religious emotion" (rejected) from.', '4) Re-diagnostic: Ask them to explain why Bergman *chooses* the Chartres story (anonymous builders) over a story about.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_005', difficulty: 'standard',
          question: 'Supporting characters in \'Film-Making\' — the secondary figures who move the.',
          hint: 'If stuck, review the difference between "character sketch" (descriptive) and "character.',
          misconception: '**Misconception:** "Supporting characters in non-fiction are just background info — less important than the.',
          parts: [
                { id: 'a', prompt: 'List the seven supporting figures Bergman explicitly names in the essay (including the interview section) and state the one specific contribution each made.', answer: '**Correct answer:** 1',
                  options: ['**Correct answer:** 1', 'the crane', 'the magic lantern'],
                  hint: 'If stuck, review the difference between "character sketch" (descriptive) and "character function".',
                  misconception: '**Misconception:** "Supporting characters in non-fiction are just background info — less important than the protagonist." **Why it\'s.' }
          ],
            remediations: { 'misconception-supporting-characters-in-non': { steps: ['**Remediation path (3 steps):** 1.', '**Re-read only the "Significant Persons" and "Interview" sections** with a two-column table: Column A = Name, Column.', 'Do not summarize — copy the *exact words* Bergman uses for each lesson.', '**Map each lesson to the "Cathedral" metaphor:** For each figure, complete the sentence: "This person laid the stone.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_006', difficulty: 'standard',
          question: 'The primary theme of \'Film-Making\' — the central idea the whole text returns to.',
          hint: 'If stuck, re-read "The Rhythm of a Film" and "Cathedral-building" side-by-side; list what.',
          misconception: 'Students treat the essay as **Bergman\'s biography** ("he had a magic lantern, then a projector, then became.',
          parts: [
                { id: 'a', prompt: 'What is the central metaphor Bergman uses to describe his ideal role as a film-maker, and what does it imply about artistic identity?', answer: 'The central metaphor is the **cathedral of Chartres**, where anonymous craftsmen',
                  options: ['The central metaphor is the **cathedral of Chartres**, where anonymous craftsmen', 'the conjurer', 'the tightrope walker', 'film-making'],
                  hint: 'If stuck, re-read "The Rhythm of a Film" and "Cathedral-building" side-by-side; list what film *is*.',
                  misconception: 'Students treat the essay as **Bergman\'s biography** ("he had a magic lantern, then a projector, then became a director") and miss that.' }
          ],
            remediations: { 'students-treat-the-essay-as': { steps: ['**Re-read only the "Cathedral-building" and "The Rhythm of a Film" sections.** 2.', '**List every metaphor** Bergman uses for himself: conjurer, tightrope walker, cathedral artisan.', '**Sort them:** Which describe the *mechanism* of film?', 'Which describe the *industry reality*?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
