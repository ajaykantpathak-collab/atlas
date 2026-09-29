import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch01_p2: SimDef = {
    id: 'v3_c12_eng_v_ch01_p2',
    title: 'The Third Level · Part 2/3',
    subtitle: 'Grand Central has two levels — Charley found a third',
    classLevel: 12, subject: 'eng_v', topic: 'The Third Level · Part 2/3',
    chapters: ['c12_eng_v_ch01'],
    nodeIds: ['c12_eng_v_cbse_01_007', 'c12_eng_v_cbse_01_008', 'c12_eng_v_cbse_01_009', 'c12_eng_v_cbse_01_010', 'c12_eng_v_cbse_01_011', 'c12_eng_v_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Speculative fiction reader', intro: 'An ordinary commuter takes a wrong turn in a station and ends up in 1894. Nobody believes him — and that disbelief is the story.', goal: 'Read The Third Level as the collision of modern anxiety and the fantasy of a gentler past.' },
    discovery: {
        question: 'Charley swears Grand Central has a hidden third level that opens onto 1894. His psychiatrist calls it \'waking-dream wish fulfillment.\' Is the diagnosis a dismissal — or the story\'s whole point?',
        options: ['The point — a world \'full of insecurity, fear, war, worry\' builds its own escape hatch; the third level is modern anxiety given an address', 'A dismissal — Charley is simply lying', 'Proof he\'s insane', 'Evidence of a real tunnel'],
        answer: 'The point — a world \'full of insecurity, fear, war, worry\' builds its own escape hatch; the third level is modern anxiety given an address',
        hook: 'Finney grounds the impossible in the mundane — a tan gabardine suit, a stamp collection, a wife to get home to — so fantasy borrows credibility. Even the stamps are contested ground: the psychiatrist calls them \'refuge,\' Charley calls them inheritance from a gentler era.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'The Third Level\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow Charley below the platforms: weigh the 1894 evidence — gaslights, Cleveland-era bills, a bought ticket — against the waking-dream diagnosis, and decide what Sam\'s letter proves.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'The Third Level\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Define "secondary theme" in your own words and give one example from any story you have read previously.', options: [
                { text: 'A secondary theme is a supporting idea that runs through a text alongside the main theme,', outcome: 'A secondary theme is a supporting idea that runs through a text alongside the main theme, adding.' },
                { text: 'it\'s just a minor topic', outcome: 'Not quite — Students often think "secondary theme" means "a theme that appears less often" or "a subplot.".', reveals: 'secondary-theme-means-a-theme' },
                { text: 'secondary', outcome: 'Not quite — Students often think "secondary theme" means "a theme that appears less often" or "a subplot.".', reveals: 'secondary-theme-means-a-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'The Third Level\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'What is the definition of imagery in literature, and which five senses does it typically appeal to?', options: [
                { text: 'Imagery is descriptive language that appeals to the five senses', outcome: 'Imagery is descriptive language that appeals to the five senses — sight, sound, smell, touch, and.' },
                { text: 'visual description', outcome: 'Not quite — Students often treat every descriptive detail as "imagery" and every comparison as "metaphor,".', reveals: 'students-often-treat-every-descriptive' },
                { text: 'symbolism', outcome: 'Not quite — Students often treat every descriptive detail as "imagery" and every comparison as "metaphor,".', reveals: 'students-often-treat-every-descriptive' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'The Third Level\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define situational irony and give one example from "The Third Level" where the outcome contradicts Charley\'s expectations.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is opposite to what was', outcome: 'Situational irony occurs when the actual outcome of a situation is opposite to what was expected.' },
                { text: 'Charley finding the third level is ironic', outcome: 'Not quite — Students conflate "irony" with "coincidence" or "unexpected event." In "The Third Level," they.', reveals: 'students-conflate-irony-with-coincidence' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'The Third Level\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Define "first-day cover" as used in "The Third Level" and state its precise role in the plot\'s resolution.', options: [
                { text: 'A first-day cover is an envelope bearing a new stamp postmarked on its first day of', outcome: 'A first-day cover is an envelope bearing a new stamp postmarked on its first day of issue, mailed.' },
                { text: 'any old envelope with a stamp', outcome: 'Not quite — Students believe "vocabulary in context" means *looking up dictionary definitions* of difficult.', reveals: 'vocabulary-in-context-means-looking' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means *looking up dictionary definitions* of difficult.', reveals: 'vocabulary-in-context-means-looking' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'The Third Level\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the tense of the verb phrase "had been" in the opening sentence: "The presidents ...', options: [
                { text: 'The verb phrase "I\'ve been" (I have been) is **present perfect tense**', outcome: 'The verb phrase "I\'ve been" (I have been) is **present perfect tense**.' },
                { text: 'simple past', outcome: 'Not quite — **Misconception:** "Grammar analysis means labeling every verb\'s tense and calling it a day." **Why.', reveals: 'misconception-grammar-analysis-means-labeling' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'The Third Level\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Define literal comprehension and give one literal question from "The Third Level" with its answer directly from the text.', options: [
                { text: 'Literal comprehension retrieves explicitly stated information', outcome: 'Literal comprehension retrieves explicitly stated information.' },
                { text: 'inference', outcome: 'Not quite — Students treat inferential questions as "guessing" and write opinions without textual evidence.', reveals: 'students-treat-inferential-questions-as' },
                { text: 'imagination', outcome: 'Not quite — Students treat inferential questions as "guessing" and write opinions without textual evidence.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate drowning in board-exam stress swears he found a forgotten stairwell in the old school block that opens into the town as it looked decades ago — gaslights, quiet streets, no exam timetables. Everyone laughs; he insists it\'s real and keeps trying to go back.',
            decisions: [{ prompt: 'How do you respond, having read \'The Third Level\'?', options: [
                { text: 'Neither mock him nor book a ticket — hear it the way the psychiatrist frames Charley\'s third level: a waking-dream wish fulfillment. Ask what he\'s escaping, because the vividness of the refuge is a map of the anxiety he\'s fleeing.', outcome: 'Finney grounds the fantasy in an ordinary man under \'insecurity, fear, war, worry\' — the experience is psychologically true even if the corridor isn\'t, so the useful move is listening to what the escape is escaping from.' },
                { text: 'Take his detailed description as proof and start searching for the stairwell yourself.', outcome: 'Vivid detail is exactly what makes wish fulfillment convincing — Charley\'s gaslights and derby hats felt real too; treating the description as evidence misses that the detail serves the longing, not the claim.', reveals: 'detail-equals-proof' },
                { text: 'Tell him plainly he\'s making it up and should get back to revision.', outcome: 'That repeats Louisa\'s anger and the friends\' disbelief — the story shows dismissal isolates the believer without touching the wish that produced the dream.', reveals: 'disbelief-fixes-fantasy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read escapism as diagnosis and desire at once — and see how realism smuggles the impossible past the reader\'s guard.',
            decisions: [{ prompt: 'What comes next? The Third Level · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Third Level · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_007', difficulty: 'standard',
          question: 'Secondary themes in \'The Third Level\' — the supporting ideas and motifs that.',
          hint: 'If stuck, review Class 11 Hornbill node c11_eng_h_cbse_01_007 (Theme: Secondary Themes).',
          misconception: 'Students often think "secondary theme" means "a theme that appears less often" or "a subplot." In "The Third Level,".',
          parts: [
                { id: 'a', prompt: 'Find two pieces of textual evidence that support the secondary theme "The past is idealized as a refuge from the present." Quote or paraphrase each and explain.', answer: 'Evidence 1: Charley describes 1894 Galesburg',
                  options: ['Evidence 1: Charley describes 1894 Galesburg', 'he bought tickets', 'secondary theme', 'a theme that appears less often'],
                  hint: 'If stuck, review Class 11 Hornbill node c11_eng_h_cbse_01_007 (Theme: Secondary Themes) for the.',
                  misconception: 'Students often think "secondary theme" means "a theme that appears less often" or "a subplot." In "The Third Level," they list "stamp.' }
          ],
            remediations: { 'secondary-theme-means-a-theme': { steps: ['Revisit node **c12_eng_v_cbse_01_006** (Primary Theme) — distinguish primary vs.', 'secondary using the "umbrella vs.', 'Re-read the text marking every reference to stamps, time, 1894 details, and Sam — cluster them into 3 groups.', 'For each cluster, write: "This shows that ________." The blank = secondary theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "secondary theme" means "a theme that appears less often" or "a subplot." In "The Third Level,".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The third level exists only in Charley\'s mind." Use Sam\'s letter and the first-day cover as evidence to defend or refute this claim.', answer: 'The statement is **refuted by the text\'s ambiguity**',
                  options: ['The statement is **refuted by the text\'s ambiguity**', 'imaginary', 'secondary theme', 'a theme that appears less often'],
                  hint: 'If stuck, review Class 11 Hornbill node c11_eng_h_cbse_01_007 (Theme: Secondary Themes) for the.',
                  misconception: 'Students often think "secondary theme" means "a theme that appears less often" or "a subplot." In "The Third Level," they list "stamp.' },
                { id: 'b', prompt: 'Write a 50-word micro-story where a character uses a mundane object (like a ticket, key, or photograph) to access an idealized past, mirroring the third.', answer: '*Maya pressed the dried jasmine flower between diary pages',
                  options: ['*Maya pressed the dried jasmine flower between diary pages', 'secondary theme', 'a theme that appears less often', 'a subplot'],
                  hint: 'If stuck, review Class 11 Hornbill node c11_eng_h_cbse_01_007 (Theme: Secondary Themes) for the.',
                  misconception: 'Students often think "secondary theme" means "a theme that appears less often" or "a subplot." In "The Third Level," they list "stamp.' }
          ],
            remediations: { 'secondary-theme-means-a-theme': { steps: ['Revisit node **c12_eng_v_cbse_01_006** (Primary Theme) — distinguish primary vs.', 'secondary using the "umbrella vs.', 'Re-read the text marking every reference to stamps, time, 1894 details, and Sam — cluster them into 3 groups.', 'For each cluster, write: "This shows that ________." The blank = secondary theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_008', difficulty: 'standard',
          question: 'Imagery in \'The Third Level\' — the vivid, sensory language that creates.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_008 worked examples on "The Portrait of a Lady".',
          misconception: 'Students often treat every descriptive detail as "imagery" and every comparison as "metaphor," missing that imagery.',
          parts: [
                { id: 'a', prompt: 'What is the definition of imagery in literature, and which five senses does it typically appeal to?', answer: 'Imagery is descriptive language that appeals to the five senses',
                  options: ['Imagery is descriptive language that appeals to the five senses', 'visual description', 'symbolism'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_008 worked examples on "The Portrait of a Lady" imagery and.',
                  misconception: 'Students often treat every descriptive detail as "imagery" and every comparison as "metaphor," missing that imagery must *appeal to.' },
                { id: 'b', prompt: 'The psychiatrist calls stamp collecting a "temporary refuge from reality." Identify the metaphor in this phrase, name the two things being compared, and.', answer: 'The metaphor compares stamp collecting to a "refuge" (a shelter/safe place)',
                  options: ['The metaphor compares stamp collecting to a "refuge" (a shelter/safe place)', 'simile', 'like/as', 'stamps = reality'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_008 worked examples on "The Portrait of a Lady" imagery and.',
                  misconception: 'Students often treat every descriptive detail as "imagery" and every comparison as "metaphor," missing that imagery must *appeal to.' }
          ],
            remediations: { 'students-often-treat-every-descriptive': { steps: ['Have the student re-read the third-level arrival scene (paragraphs 3-4 of the text) and highlight every word that.', 'For each highlight, write: "This appeals to [sense] by [specific word] and creates [effect]." 3.', 'Then list every "X is Y" or "X [verb] Y" construction in the story; test each: "Does Y give X a new quality?" If yes →.', 'Re-attempt DIAGNOSTIC_QUESTION_2 and 4 with this annotated text.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_009', difficulty: 'standard',
          question: 'Irony and paradox in \'The Third Level\' — where opposite things are both true.',
          hint: 'If unable to distinguish irony types, review the three-type framework.',
          misconception: 'Students conflate "irony" with "coincidence" or "unexpected event." In "The Third Level," they often label Charley\'s.',
          parts: [
                { id: 'a', prompt: 'Analyze how the physical details of the third level (gaslights, brass spittoons, derby hats, Currier & Ives locomotive) operate as a cluster of symbols.', answer: 'These details form a symbol cluster representing the constructed, idealized past',
                  options: ['These details form a symbol cluster representing the constructed, idealized past', 'summer evenings were twice as long', 'gaslights symbolize old times'],
                  hint: 'If unable to distinguish irony types, review the three-type framework (situational/dramatic/verbal).',
                  misconception: 'Students conflate "irony" with "coincidence" or "unexpected event." In "The Third Level," they often label Charley\'s discovery of the.' }
          ],
            remediations: { 'students-conflate-irony-with-coincidence': { steps: ['Revisit c12_eng_v_cbse_01_008 (Imagery and Metaphor) to refresh how physical details carry thematic weight.', 'Re-read the story\'s final three paragraphs (Sam\'s letter, the stamp shop revelation) and annotate every object.', 'For each object, write: "This literally is ____; symbolically it represents ____ because ____." 4.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_010', difficulty: 'standard',
          question: 'Key vocabulary of \'The Third Level\' — the words and phrases you must know.',
          hint: 'If unable to move beyond dictionary definitions, re-read paragraphs 3–4 and 5–6 with.',
          misconception: 'Students believe "vocabulary in context" means *looking up dictionary definitions* of difficult words in the story.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Finney describes Charley\'s clothing as "a tan gabardine suit and a straw hat with a fancy band" rather than simply "a suit and.', answer: 'The specific fabrics and details',
                  options: ['The specific fabrics and details', 'setting the scene', 'before', 'vocabulary in context'],
                  hint: 'If unable to move beyond dictionary definitions, re-read paragraphs 3–4 and 5–6 with a highlighter.',
                  misconception: 'Students believe "vocabulary in context" means *looking up dictionary definitions* of difficult words in the story.' },
                { id: 'b', prompt: 'Analyze how the cluster of period-specific nouns in paragraphs 3–4 (spittoons, derby hat, handlebar mustache, leg-of-mutton sleeves, Currier & Ives locomotive.', answer: 'The cluster creates a *dense sensory field*',
                  options: ['The cluster creates a *dense sensory field*', 'vocabulary in context'],
                  hint: 'If unable to move beyond dictionary definitions, re-read paragraphs 3–4 and 5–6 with a highlighter.',
                  misconception: 'Students believe "vocabulary in context" means *looking up dictionary definitions* of difficult words in the story.' }
          ],
            remediations: { 'vocabulary-in-context-means-looking': { steps: ['Return to the text and locate the target word in its *exact sentence*.', 'Read the two sentences before and after.', 'Ask: "What *specific* image, contrast, or idea does this word add that a simpler synonym would not?" 4.', 'Write a one-sentence answer *using the word* that explains its *function* (e.g., "Finney chooses \'gabardine\' over.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_011', difficulty: 'standard',
          question: 'Language and style in \'The Third Level\' — how the writer chose words, sentences.',
          hint: 'Review "Tense in Narrative" section in Class 11 Grammar node (c11_eng_h_cbse_01_011) and.',
          misconception: '**Misconception:** "Grammar analysis means labeling every verb\'s tense and calling it a day." **Why it\'s wrong:**.',
          parts: [
                { id: 'a', prompt: 'Identify the tense of the verb phrase "had been" in the opening sentence: "The presidents ... will swear on a stack of timetables that there are only two.', answer: 'The verb phrase "I\'ve been" (I have been) is **present perfect tense**',
                  options: ['The verb phrase "I\'ve been" (I have been) is **present perfect tense**', 'simple past'],
                  hint: 'Review "Tense in Narrative" section in Class 11 Grammar node (c11_eng_h_cbse_01_011) and practice.',
                  misconception: '**Misconception:** "Grammar analysis means labeling every verb\'s tense and calling it a day." **Why it\'s wrong:** Students list "past.' },
                { id: 'b', prompt: 'In the corridor scene ("The corridor I was in began angling left and slanting downward..."), Finney uses a cluster of past continuous verbs ("was angling,".', answer: 'Past continuous creates **ongoing, durative action**',
                  options: ['Past continuous creates **ongoing, durative action**', 'it\'s just past tense'],
                  hint: 'Review "Tense in Narrative" section in Class 11 Grammar node (c11_eng_h_cbse_01_011) and practice.',
                  misconception: '**Misconception:** "Grammar analysis means labeling every verb\'s tense and calling it a day." **Why it\'s wrong:** Students list "past.' },
                { id: 'c', prompt: 'Rewrite the clerk\'s direct speech — "That ain\'t money, mister," he said, "and if you\'re trying to skin me, you won\'t get very far" — into **indirect (reported).', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'to formal'],
                  hint: 'Review "Tense in Narrative" section in Class 11 Grammar node (c11_eng_h_cbse_01_011) and practice.',
                  misconception: '**Misconception:** "Grammar analysis means labeling every verb\'s tense and calling it a day." **Why it\'s wrong:** Students list "past.' },
                { id: 'd', prompt: 'Compare the **sentence structure** in two passages: (A) Modern scene: "I turned into Grand Central from Vanderbilt Avenue, and went down the steps to the first.', answer: 'Passage (A) uses **sequential compound predicates** ("turned',
                  options: ['Passage (A) uses **sequential compound predicates** ("turned', 'both use \'and\''],
                  hint: 'Review "Tense in Narrative" section in Class 11 Grammar node (c11_eng_h_cbse_01_011) and practice.',
                  misconception: '**Misconception:** "Grammar analysis means labeling every verb\'s tense and calling it a day." **Why it\'s wrong:** Students list "past.' }
          ],
            remediations: { 'misconception-grammar-analysis-means-labeling': { steps: ['Revisit **c11_eng_h_cbse_01_011** (Class 11 Grammar: Language Usage) — specifically the section on "Tense Shifts.', 'Do a **tense-mapping exercise**: Take the first 3 pages of the story, highlight every verb, label tense, and write *one.', 'Re-attempt **Diagnostic Questions 2 and 4** with this map.', 'If still stuck, watch the 10-min video "Grammar as Time Machine" (linked in class resources) which animates tense.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_01_012', difficulty: 'standard',
          question: 'Literal comprehension of \'The Third Level\' — questions answered straight from.',
          hint: 'If stuck on inferential questions, return to c12_eng_v_cbse_01_006 (Theme: Primary Theme).',
          misconception: 'Students treat inferential questions as "guessing" and write opinions without textual evidence.',
          parts: [
                { id: 'a', prompt: 'Define literal comprehension and give one literal question from "The Third Level" with its answer directly from the text.', answer: 'Literal comprehension retrieves explicitly stated information',
                  options: ['Literal comprehension retrieves explicitly stated information', 'inference', 'imagination'],
                  hint: 'If stuck on inferential questions, return to c12_eng_v_cbse_01_006 (Theme: Primary Theme) — every.',
                  misconception: 'Students treat inferential questions as "guessing" and write opinions without textual evidence.' },
                { id: 'b', prompt: 'Apply the PEEL structure to answer: "Why does Charley fail to buy tickets on his first visit to the third level?" Write a 40-word response.', answer: 'Point: Charley fails',
                  options: ['Point: Charley fails', 'inference', 'imagination'],
                  hint: 'If stuck on inferential questions, return to c12_eng_v_cbse_01_006 (Theme: Primary Theme) — every.',
                  misconception: 'Students treat inferential questions as "guessing" and write opinions without textual evidence.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Revisit c12_eng_v_cbse_01_002 (Plot) and c12_eng_v_cbse_01_004 (Protagonist) to rebuild event/character clarity.', 'Practice the "Evidence Hunt" drill: For each inferential question, highlight 2-3 exact phrases in the text before.', 'Use c11_eng_h_cbse_01_012 (Class 11 Comprehension) to relearn PEEL structure with simpler texts.', 'Re-attempt Diagnostic Questions 3 and 4 under timed conditions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
