import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch25_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch25_p1: SimDef = {
    id: 'v3_c11_eng_w_ch25_p1',
    title: 'The Story (Essay) · Part 1/3',
    subtitle: 'Separate story\'s \'and then\' from plot\'s \'why\' — Forster\'s sharpest knife.',
    classLevel: 11, subject: 'eng_w', topic: 'The Story (Essay) · Part 1/3',
    chapters: ['c11_eng_w_ch25'],
    nodeIds: ['c11_eng_w_cbse_25_001', 'c11_eng_w_cbse_25_002', 'c11_eng_w_cbse_25_003', 'c11_eng_w_cbse_25_004', 'c11_eng_w_cbse_25_005', 'c11_eng_w_cbse_25_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a critic auditing what a novel cannot live without', intro: 'A lecture hall, 1927: a novelist insists the humble story — crude, chronological, ancient — is the backbone no novel escapes.', goal: 'Apply the story-plot distinction and evaluate time as the novel\'s inescapable fabric.' },
    discovery: {
        question: '\'The king died and then the queen died\' versus \'The king died and then the queen died of grief.\' Forster says only one is a plot — which?',
        options: ['The second — it adds causality; the first is merely a story, a tapeworm of time', 'The first — plot just means events in order', 'Both — plot and story are synonyms', 'Neither — both are only chronology'],
        answer: 'The second — it adds causality; the first is merely a story, a tapeworm of time',
        hook: 'A story only asks \'and then?\'; a plot makes you ask \'why?\' — the whole machinery of the novel hangs on that difference.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'books of the hour\' (Woven Words, ch. 25) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_25_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split \'life in time\' from \'life by values\' in real sentences, then test Forster\'s claim that no novelist — not Sterne, not Proust — can deny time.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'books of the hour\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'What is the primary distinction John Ruskin draws between "books of the hour" and "books of all time" in the opening paragraphs of the.', options: [
                { text: 'Ruskin distinguishes "books of the hour" as useful or pleasant talk printed for temporary', outcome: 'Ruskin distinguishes "books of the hour" as useful or pleasant talk printed for temporary.' },
                { text: 'books of the hour are bad books', outcome: 'Not quite — Students often believe "context and background" means memorising Ruskin\'s birth/death dates and.', reveals: 'context-and-background-means-memorising' },
                { text: 'context and background', outcome: 'Not quite — Students often believe "context and background" means memorising Ruskin\'s birth/death dates and.', reveals: 'context-and-background-means-memorising' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'books of the hour\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the primary metaphorical setting Ruskin constructs in the second half of the essay (paragraphs 5-8), and what intellectual activity.', options: [
                { text: 'The primary metaphorical setting is the gold mine', outcome: 'The primary metaphorical setting is the gold mine — specifically "little fissures in the earth".' },
                { text: 'the court of the Dead', outcome: 'Not quite — Students equate "setting" only with physical time/place in fiction (e.g., a village, a jungle,.', reveals: 'students-equate-setting-only-with' },
                { text: 'a library', outcome: 'Not quite — Students equate "setting" only with physical time/place in fiction (e.g., a village, a jungle,.', reveals: 'students-equate-setting-only-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'books of the hour\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is the primary role of the protagonist (Ruskin\'s persona) in the essay "What is a Good Book?"?', options: [
                { text: 'The protagonist acts as a moral and literary mentor who defines true reading, sets', outcome: 'The protagonist acts as a moral and literary mentor who defines true reading, sets criteria for.' },
                { text: 'He tells stories about books', outcome: 'Not quite — Students often confuse the historical John Ruskin with the essay\'s protagonist, treating every.', reveals: 'students-often-confuse-the-historical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'books of the hour\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'Name three allegorical figures Ruskin creates in the essay and state one intellectual virtue each figure represents.', options: [
                { text: 'The Guardian of Elysian Gates represents meritocratic judgement (admits only labour and', outcome: 'The Guardian of Elysian Gates represents meritocratic judgement (admits only labour and merit); the.' },
                { text: 'the housemaid', outcome: 'Not quite — Students treat the allegorical figures as mere decorative metaphors rather than *structural.', reveals: 'students-treat-the-allegorical-figures' },
                { text: 'the housemaid" as a virtue figure', outcome: 'Not quite — Students treat the allegorical figures as mere decorative metaphors rather than *structural.', reveals: 'students-treat-the-allegorical-figures' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'books of the hour\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'State the fundamental distinction Ruskin makes between a "book of the hour" and a "true book" in one sentence.', options: [
                { text: 'A "book of the hour" is a multiplied voice for temporary communication (like a letter or', outcome: 'A "book of the hour" is a multiplied voice for temporary communication (like a letter.' },
                { text: 'one is fiction, one is non-fiction', outcome: 'Not quite — Students conflate "theme" with "topic" or "subject." They write: "The theme of the essay is books".', reveals: 'students-conflate-theme-with-topic' },
                { text: 'one is short, one is long', outcome: 'Not quite — Students conflate "theme" with "topic" or "subject." They write: "The theme of the essay is books".', reveals: 'students-conflate-theme-with-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your reading club is debating a \'one book per month\' rule where members pick whatever is trending online. You invoke Ruskin\'s \'What is a Good Book?\' A member fires back: \'That Victorian essay is just a loose rant — old books good, newspapers bad, then something about gold mining and spelling.\'',
            decisions: [{ prompt: 'How do you show the essay is a tight argument, not a rant?', options: [
                { text: 'Walk them through the architecture: Distinction (books of the hour vs books of all time) → Definition of a true book → Urgency → the mining analogy (you must dig and smelt for the author\'s meaning as for gold) → Prescription (read letter by letter). Each move necessitates the next. And Ruskin\'s context explains the values: a critic of industrial capitalism prized permanence over multiplication, labour over conveyance.', outcome: 'The \'rant\' resolves into engineering: distinction creates the category, analogy explains the process, prescription hands over the tool — the club sees why \'trending\' is exactly Ruskin\'s \'book of the hour\'.' },
                { text: 'Concede the structure point but keep the conclusion — Ruskin liked old books, so just pick classics.', outcome: 'Keeping the conclusion while denying the argument misses his actual demand: not oldness but the disciplined, letter-by-letter labour a true book requires of its reader.', reveals: 'ruskin-just-means-old-books' },
                { text: 'Agree it\'s loose — Victorian prose is famously rambling, so mine it for a few quotes instead.', outcome: 'The sentence complexity hides the moves, it doesn\'t erase them; treating it as a quote-bag skips the argumentative arc that carries the reader from premise to conviction.', reveals: 'victorian-prose-is-formless' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_006', title: 'The bigger picture',
          caseStudy: { intro: 'Writers can hide the clock, flip it, or alter its hands — but the reader keeps rebuilding the time-line, which is exactly Forster\'s point.',
            decisions: [{ prompt: 'What comes next? The Story (Essay) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Story (Essay) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_001', difficulty: 'standard',
          question: '\'books of the hour\' (Woven Words, ch. 25) — the context and background to this.',
          hint: 'Review the concept of "public intellectual" in Victorian Britain (see.',
          misconception: 'Students often believe "context and background" means memorising Ruskin\'s birth/death dates and listing his other.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'books of the hour\' (Woven Words, ch',
                  options: ['\'books of the hour\' (Woven Words, ch', 'The plot/narrative arc of \'books of the hour\'', 'The setting of \'books of the hour\'', 'Character analysis in \'books of the hour\''],
                  hint: 'Review the concept of "public intellectual" in Victorian Britain (see c11_history_victorian_era).',
                  misconception: 'Students often believe "context and background" means memorising Ruskin\'s birth/death dates and listing his other works.' }
          ],
            remediations: { 'context-and-background-means-memorising': { steps: ['If a student reduces context to biography, pause and ask: "How does knowing Ruskin designed Gothic buildings change.', 'Then have them re-read the mining paragraph (para.', '177-178) and annotate every word that echoes craftsmanship (pickaxes, shovels, smelting, chiselling, fusing).', 'Finally, ask them to rewrite one sentence of the essay in their own words *using* that architectural vocabulary.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'books of the hour\' — what happens, in what order.',
          hint: 'Review "Expository Structure" (c9_engl_ch3_7) — practice outlining a newspaper editorial.',
          misconception: 'Students treat the essay as a **series of loosely connected opinions** ("Ruskin likes old books, dislikes newspapers.',
          parts: [
                { id: 'a', prompt: 'Apply Ruskin\'s "mining" analogy to a modern context: describe how a student preparing for a competitive exam (e.g., JEE/NEET) might "crush and smelt".', answer: '**Metal** = the core concept (e.g., Newton\'s Second Law)',
                  options: ['**Metal** = the core concept (e.g., Newton\'s Second Law)', 'highlighting and memorizing'],
                  hint: 'Review "Expository Structure" (c9_engl_ch3_7) — practice outlining a newspaper editorial into Claim.',
                  misconception: 'Students treat the essay as a **series of loosely connected opinions** ("Ruskin likes old books, dislikes newspapers, talks about gold.' }
          ],
            remediations: { 'students-treat-the-essay-as': { steps: ['**Paragraph-number the text** (1–12) and write a one-sentence "job description" for each paragraph (e.g., "Para 3.', '**Color-code** the jobs: *Distinction* (yellow), *Definition* (green), *Urgency/Invitation* (blue), *Analogy* (orange).', '**Draw arrows** between colors to show how each feeds the next (yellow→green→blue→orange→red).', '**Retell the argument aloud** using only the color labels: "First he distinguishes, then defines, then invites, then.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_003', difficulty: 'standard',
          question: 'The setting of \'books of the hour\' — the place, time and atmosphere the text.',
          hint: 'Review "extended metaphor as structural framework" from c11_eng_w_cbse_25_002 (Plot and.',
          misconception: 'Students equate "setting" only with physical time/place in fiction (e.g., a village, a jungle, a space station) and.',
          parts: [
                { id: 'a', prompt: 'What is the primary metaphorical setting Ruskin constructs in the second half of the essay (paragraphs 5-8), and what intellectual activity does it represent?', answer: 'The primary metaphorical setting is the gold mine',
                  options: ['The primary metaphorical setting is the gold mine', 'the court of the Dead', 'a library'],
                  hint: 'Review "extended metaphor as structural framework" from c11_eng_w_cbse_25_002 (Plot and Narrative.',
                  misconception: 'Students equate "setting" only with physical time/place in fiction (e.g., a village, a jungle, a space station) and "atmosphere" only with.' },
                { id: 'b', prompt: 'Explain in your own words how the "court of the Dead" setting differs from a living aristocracy, according to Ruskin, and why this difference matters for the.', answer: 'The "court of the Dead" is open only to "labour and merit"',
                  options: ['The "court of the Dead" is open only to "labour and merit"', 'kings and queens', 'great men'],
                  hint: 'Review "extended metaphor as structural framework" from c11_eng_w_cbse_25_002 (Plot and Narrative.',
                  misconception: 'Students equate "setting" only with physical time/place in fiction (e.g., a village, a jungle, a space station) and "atmosphere" only with.' }
          ],
            remediations: { 'students-equate-setting-only-with': { steps: ['Have the student list every *place-word* in the essay (court, gate, Faubourg St.', 'Germain, Elysian gates, mountain tops, fissures, rock, furnace).', 'Ask: "Which of these are real places?', 'Which are *thinking spaces*?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_004', difficulty: 'standard',
          question: 'Character analysis in \'books of the hour\' — the central figure(s), their.',
          hint: 'Review the distinction between narrator and author using Anne Frank\'s diary.',
          misconception: 'Students often confuse the historical John Ruskin with the essay\'s protagonist, treating every opinion as the author\'s.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "authorial persona" to this excerpt: "You must, in a word, love these people if you are to be among them. No ambition is of any use.', answer: 'Trait 1: Humility-demanding',
                  options: ['Trait 1: Humility-demanding', 'Trait 2: Relational/affective —', 'A wrong answer that lists traits without textual quotes or misattributes'],
                  hint: 'Review the distinction between narrator and author using Anne Frank\'s diary (c10_engl_cbse_04_002).',
                  misconception: 'Students often confuse the historical John Ruskin with the essay\'s protagonist, treating every opinion as the author\'s biography.' }
          ],
            remediations: { 'students-often-confuse-the-historical': { steps: ['Have the student highlight every first-person pronoun ("I", "we", "my") and second-person address ("you", "your").', 'Ask: "What does this \'I\' claim to know?', 'What does this \'you\' need to do?" 3.', 'Create a two-column chart: left column = persona\'s direct statements about himself; right column = what those.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_005', difficulty: 'standard',
          question: 'Supporting characters in \'books of the hour\' — the secondary figures who move.',
          hint: 'Review "Personification as Argument" in c8_engl_ch1_8 (Humour and Its Role in the.',
          misconception: 'Students treat the allegorical figures as mere decorative metaphors rather than *structural argumentative moves*: they.',
          parts: [
                { id: 'a', prompt: 'In the metaphor "your pickaxes are your own care, wit and learning; your smelting furnace is your own thoughtful soul," identify the tenor and vehicle for each.', answer: 'Tenor1 = care/wit/learning, Vehicle1 = pickaxes',
                  options: ['Tenor1 = care/wit/learning, Vehicle1 = pickaxes', 'the author gives you the pickaxe'],
                  hint: 'Review "Personification as Argument" in c8_engl_ch1_8 (Humour and Its Role in the Narrative) where.',
                  misconception: 'Students treat the allegorical figures as mere decorative metaphors rather than *structural argumentative moves*: they write "Ruskin uses.' }
          ],
            remediations: { 'students-treat-the-allegorical-figures': { steps: ['Ask the student to list every *action verb* associated with each figure (Guardian: tests, admits, refuses; Miner: digs.', 'Have them match each verb to a *reader\'s concrete practice* (e.g., "crushes rock" = close analysis of syntax; "smelts".', 'Require them to rewrite one paragraph of the essay *replacing the figure with the abstract noun* (e.g., "the Guardian".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_006', difficulty: 'standard',
          question: 'The primary theme of \'books of the hour\' — the central idea the whole text.',
          hint: 'Review "Text: Plot and Narrative Structure" (c11_eng_w_cbse_25_002) focusing on the.',
          misconception: 'Students conflate "theme" with "topic" or "subject." They write: "The theme of the essay is books" or "The theme.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Ruskin compares reading a great author to an Australian miner digging for gold.', answer: 'The "rock" represents the author\'s words/language',
                  options: ['The "rock" represents the author\'s words/language', 'the rock is the book and the gold is the story'],
                  hint: 'Review "Text: Plot and Narrative Structure" (c11_eng_w_cbse_25_002) focusing on the *argumentative*.',
                  misconception: 'Students conflate "theme" with "topic" or "subject." They write: "The theme of the essay is books" or "The theme is reading good books.".' }
          ],
            remediations: { 'students-conflate-theme-with-topic': { steps: ['Have the student create a two-column table: Column A = "Books of the Hour" traits (5 bullets from text); Column.', 'Ask: "What single principle explains *all* differences in Column A vs B?" Guide to: *Purpose: temporal utility vs.', 'Then map the mining metaphor onto this principle: "If true books are eternal preservations, why must they be \'mined\'?".', 'Finally, rewrite the theme as a complete sentence starting: "Ruskin argues that true books differ from ephemeral.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
