import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch01_p1: SimDef = {
    id: 'v3_c11_eng_h_ch01_p1',
    title: 'The Portrait of a Lady · Part 1/3',
    subtitle: 'Read the grandmother as a vanishing world, not a quirky old woman.',
    classLevel: 11, subject: 'eng_h', topic: 'The Portrait of a Lady · Part 1/3',
    chapters: ['c11_eng_h_ch01'],
    nodeIds: ['c11_eng_h_cbse_01_001', 'c11_eng_h_cbse_01_002', 'c11_eng_h_cbse_01_003', 'c11_eng_h_cbse_01_004', 'c11_eng_h_cbse_01_005', 'c11_eng_h_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader tracing a relationship across two Indias', intro: 'Village temple school to English city classroom — watch a bond dissolve not in anger but in syllabi.', goal: 'Use context and narrative phases to interpret the grandmother\'s values and the story\'s ending.' },
    discovery: {
        question: 'The narrator\'s grandmother declares music \'the monopoly of harlots and beggars.\' Is this just one old woman\'s prejudice?',
        options: ['No — it encodes a broader class attitude of her era, when professional musicians came from communities respectable families shunned', 'Yes — a purely personal quirk with no cultural basis', 'No — she objected because music distracted from prayer, nothing more', 'Yes — she simply disliked the instrument the boy played'],
        answer: 'No — it encodes a broader class attitude of her era, when professional musicians came from communities respectable families shunned',
        hook: 'She isn\'t \'backward\' — she\'s a representative figure of a vanishing world, and her silences carry a whole generation\'s rules.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'The Portrait of a Lady\' (Hornbill, ch. 1) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_01_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split the narrative into its three phases of companionship, separation and loss — then defend why the story ends with silent sparrows, not a funeral.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'The Portrait of a Lady\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is the author of "The Portrait of a Lady," and what is the genre of this piece?', options: [
                { text: 'The author is Khushwant Singh, and the genre is autobiographical narrative (a personal', outcome: 'The author is Khushwant Singh, and the genre is autobiographical narrative (a personal.' },
                { text: 'context', outcome: 'Not quite — Students often think "context" means "summary of the story" or "list of difficult words." They.', reveals: 'context-means-summary-of-the' },
                { text: 'summary of the story', outcome: 'Not quite — Students often think "context" means "summary of the story" or "list of difficult words." They.', reveals: 'context-means-summary-of-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'The Portrait of a Lady\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What are the three distinct phases of the author\'s relationship with his grandmother as explicitly structured in the narrative?', options: [
                { text: 'The three phases are: (1) Childhood in the village, where they are constant companions', outcome: 'The three phases are: (1) Childhood in the village, where they are constant companions and she.' },
                { text: 'feeding dogs, feeding sparrows, spinning', outcome: 'Not quite — Students often believe the narrative is a simple linear timeline of events.', reveals: 'the-narrative-is-a-simple' },
                { text: 'lists events (e', outcome: 'Not quite — Students often believe the narrative is a simple linear timeline of events.', reveals: 'the-narrative-is-a-simple' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'The Portrait of a Lady\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What are the three distinct physical settings where the author-grandmother relationship unfolds in "The Portrait of a Lady"?', options: [
                { text: 'The three distinct physical settings are: (1) the village', outcome: 'The three distinct physical settings are: (1) the village — including the temple-attached school.' },
                { text: 'village and city', outcome: 'Not quite — Students confuse SETTING (where/when) with ATMOSPHERE (feeling/mood), treating them as synonyms.', reveals: 'students-confuse-setting-where-when' },
                { text: 'home and school', outcome: 'Not quite — Students confuse SETTING (where/when) with ATMOSPHERE (feeling/mood), treating them as synonyms.', reveals: 'students-confuse-setting-where-when' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'The Portrait of a Lady\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List three supporting characters from "The Portrait of a Lady" and state one specific action each performs in the text.', options: [
                { text: 'Correct answer: (1) Grandfather\'s portrait – hangs above mantelpiece, described as', outcome: 'Correct answer: (1) Grandfather\'s portrait – hangs above mantelpiece, described as wearing turban.' },
                { text: 'the narrator or grandmother', outcome: 'Not quite — Students often treat supporting characters as "minor" and therefore unimportant for exams, writing.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'The Portrait of a Lady\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of "The Portrait of a Lady" as distinct from its plot summary?', options: [
                { text: 'The primary theme is the **inevitability of change in human relationships contrasted with', outcome: 'The primary theme is the **inevitability of change in human relationships contrasted with the.' },
                { text: 'the story is about a boy and his grandmother', outcome: 'Not quite — Students often think the primary theme is **"the generation gap"** or **"the author\'s guilt about.', reveals: 'the-primary-theme-is-the' },
                { text: 'education', outcome: 'Not quite — Students often think the primary theme is **"the generation gap"** or **"the author\'s guilt about.', reveals: 'the-primary-theme-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your school\'s heritage club is collecting elders\' memories. After reading \'The Portrait of a Lady\', a member drafts an exhibit label: \'The grandmother was simply a backward old woman who hated music and English schools — a personal quirk, nothing more.\'',
            decisions: [{ prompt: 'What\'s missing from that label?', options: [
                { text: 'Context: born around the 1880s into a pre-independence Punjabi joint-family world, her views (music associated with \'harlots and beggars\', temple school versus English motor-bus school) are the values of a specific generation — not quirks. She represents a vanishing way of life where religion, routine and community were one fabric; her silence is a tragic defence of identity, not mere backwardness.', outcome: 'Reading her through her era\'s values turns \'old-fashioned\' into a portrait of a disappearing world — exactly what context work is for.' },
                { text: 'The label is accurate — context is just summary and difficult words; judge the character on her choices alone.', outcome: 'Context isn\'t trivia: each detail (temple school, spinning wheel, sparrows) is a cultural marker; stripping them makes her a caricature instead of a representative figure.', reveals: 'context-is-just-trivia' },
                { text: 'Fix it by judging her harshly — modern readers should condemn her refusal of music outright.', outcome: 'Presentism isn\'t analysis; the text invites you to understand why those beliefs existed, which makes her estrangement moving rather than merely wrong.', reveals: 'judge-by-todays-values' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'The sparrows refusing their crumbs say what the family couldn\'t — her world mourned her in its own tongue.',
            decisions: [{ prompt: 'What comes next? The Portrait of a Lady · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Portrait of a Lady · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_001', difficulty: 'standard',
          question: '\'The Portrait of a Lady\' (Hornbill, ch. 1) — the context and background to this.',
          hint: 'Review c9_engl_ch1_7 (First-Person Narrative Perspective) and c9_engl_ch1_1.',
          misconception: 'Students often think "context" means "summary of the story" or "list of difficult words." They treat the grandmother\'s.',
          parts: [
                { id: 'a', prompt: 'The narrator mentions learning "the law of gravity, Archimedes\' Principle, the world being round" at the city school.', answer: 'The city school teaches Western scientific rationalism (gravity, round earth)',
                  options: ['The city school teaches Western scientific rationalism (gravity, round earth)', 'she was uneducated', 'context', 'summary of the story'],
                  hint: 'Review c9_engl_ch1_7 (First-Person Narrative Perspective) and c9_engl_ch1_1 (Grandmother\'s literacy.',
                  misconception: 'Students often think "context" means "summary of the story" or "list of difficult words." They treat the grandmother\'s beliefs (music.' }
          ],
            remediations: { 'context-means-summary-of-the': { steps: ['If a student reduces context to summary or vocabulary: 1) Have them list every concrete detail in the first three.', '2) Ask: "Which of these would disappear if the story were set in 2024?" 3) Guide them to see each disappearing detail.', '4) Assign a 5-minute interview with a grandparent about their school routine—then compare the two "then vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "context" means "summary of the story" or "list of difficult words." They treat the grandmother\'s.',
          parts: [
                { id: 'a', prompt: 'Create a 3-sentence diary entry from the grandmother\'s perspective on the day the narrator leaves for university, using only details inferable from the text.', answer: '"Today the boy got his own room at university',
                  options: ['"Today the boy got his own room at university', 'context', 'summary of the story', 'list of difficult words'],
                  hint: 'Review c9_engl_ch1_7 (First-Person Narrative Perspective) and c9_engl_ch1_1 (Grandmother\'s literacy.',
                  misconception: 'Students often think "context" means "summary of the story" or "list of difficult words." They treat the grandmother\'s beliefs (music.' }
          ],
            remediations: { 'context-means-summary-of-the': { steps: ['If a student reduces context to summary or vocabulary: 1) Have them list every concrete detail in the first three.', '2) Ask: "Which of these would disappear if the story were set in 2024?" 3) Guide them to see each disappearing detail.', '4) Assign a 5-minute interview with a grandparent about their school routine—then compare the two "then vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'The Portrait of a Lady\' — what happens, in what.',
          hint: 'Review "narrative time vs. story time" using a simple fairy tale (e.g., Cinderella: story.',
          misconception: 'Students often believe the narrative is a simple linear timeline of events.',
          parts: [
                { id: 'a', prompt: 'Why does the author label the move to the city as "a turning-point in our friendship"? Explain in your own words.', answer: 'The move to the city is a turning-point',
                  options: ['The move to the city is a turning-point', 'she started feeding sparrows', 'the narrative is a simple linear timeline of events'],
                  hint: 'Review "narrative time vs. story time" using a simple fairy tale (e.g., Cinderella: story time.',
                  misconception: 'Students often believe the narrative is a simple linear timeline of events.' },
                { id: 'b', prompt: 'Map the narrative structure of the text onto Freytag\'s Pyramid (Exposition, Rising Action, Climax, Falling Action, Resolution).', answer: 'Exposition: Grandmother\'s description and village routine (Para 1-3)',
                  options: ['Exposition: Grandmother\'s description and village routine (Para 1-3)', 'the narrative is a simple linear timeline of events'],
                  hint: 'Review "narrative time vs. story time" using a simple fairy tale (e.g., Cinderella: story time.',
                  misconception: 'Students often believe the narrative is a simple linear timeline of events.' },
                { id: 'c', prompt: 'How does the chronological narrative structure mirror the growing emotional distance between the author and his grandmother?', answer: 'The structure mirrors emotional distance through: (1) Progressive time jumps',
                  options: ['The structure mirrors emotional distance through: (1) Progressive time jumps', 'the narrative is a simple linear timeline of events'],
                  hint: 'Review "narrative time vs. story time" using a simple fairy tale (e.g., Cinderella: story time.',
                  misconception: 'Students often believe the narrative is a simple linear timeline of events.' }
          ],
            remediations: { 'the-narrative-is-a-simple': { steps: ['If a student cannot identify the three phases, have them reread only the first sentence of each major paragraph (topic.', 'Then ask: "What changes in the *relationship* at each marker?" not "What happens next?" If they confuse plot with.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_003', difficulty: 'standard',
          question: 'The setting of \'The Portrait of a Lady\' — the place, time and atmosphere the.',
          hint: 'If stuck, review "Atmosphere: Heat, Silence and Anticipation in the Jungle".',
          misconception: 'Students confuse SETTING (where/when) with ATMOSPHERE (feeling/mood), treating them as synonyms.',
          parts: [
                { id: 'a', prompt: 'What are the three distinct physical settings where the author-grandmother relationship unfolds in "The Portrait of a Lady"?', answer: 'The three distinct physical settings are: (1) the village',
                  options: ['The three distinct physical settings are: (1) the village', 'village and city', 'home and school'],
                  hint: 'If stuck, review "Atmosphere: Heat, Silence and Anticipation in the Jungle" (c7_engl_ch04_005).',
                  misconception: 'Students confuse SETTING (where/when) with ATMOSPHERE (feeling/mood), treating them as synonyms.' },
                { id: 'b', prompt: 'Explain in your own words how the atmosphere of the village school setting differs from the city school setting, and what this difference reveals about the.', answer: 'The village school atmosphere is communal, rhythmic, and sacred',
                  options: ['The village school atmosphere is communal, rhythmic, and sacred', 'village had temple, city had English school'],
                  hint: 'If stuck, review "Atmosphere: Heat, Silence and Anticipation in the Jungle" (c7_engl_ch04_005).',
                  misconception: 'Students confuse SETTING (where/when) with ATMOSPHERE (feeling/mood), treating them as synonyms.' },
                { id: 'c', prompt: 'Apply the concept of "atmosphere created by sensory details" to the sparrow-feeding scene in the city courtyard.', answer: 'Three sensory details and their atmospheric effects: (1) VISUAL',
                  options: ['Three sensory details and their atmospheric effects: (1) VISUAL', 'birds, feeding, happy'],
                  hint: 'If stuck, review "Atmosphere: Heat, Silence and Anticipation in the Jungle" (c7_engl_ch04_005).',
                  misconception: 'Students confuse SETTING (where/when) with ATMOSPHERE (feeling/mood), treating them as synonyms.' },
                { id: 'd', prompt: 'Analyze how the railway station setting functions DIFFERENTLY in the departure scene (author leaving for abroad) versus the return scene (author returning.', answer: 'Departure scene atmosphere: solemn, prayerful, suspended',
                  options: ['Departure scene atmosphere: solemn, prayerful, suspended', 'both scenes are at the station, both are sad/happy'],
                  hint: 'If stuck, review "Atmosphere: Heat, Silence and Anticipation in the Jungle" (c7_engl_ch04_005).',
                  misconception: 'Students confuse SETTING (where/when) with ATMOSPHERE (feeling/mood), treating them as synonyms.' }
          ],
            remediations: { 'students-confuse-setting-where-when': { steps: ['If the student conflates setting and atmosphere: Step 1 — Have them draw a two-column table for ONE scene (e.g.', 'Column A: "Setting Details from Text" (temple, verandah, chorus singing, scriptures, dogs, chapattis).', 'Column B: "Atmosphere Created" (sacred, communal, rhythmic, nurturing).', 'Step 2 — Ask: "If we changed ONE detail (e.g., replace temple with factory), how would Column B change?" Step 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_004', difficulty: 'standard',
          question: 'Character analysis in \'The Portrait of a Lady\' — the central figure(s), their.',
          hint: 'Review Class 9 character analysis of Krishtakka (c9_engl_ch1_2) and practice PEEL.',
          misconception: 'Students often treat the grandmother as a static symbol of "tradition" or "religion," missing her agency and.',
          parts: [
                { id: 'a', prompt: 'List three specific actions from the text that demonstrate the grandmother\'s religious devotion, and for each, state what it reveals about her character.', answer: '1) Reciting morning prayers while bathing/dressing the author',
                  options: ['1) Reciting morning prayers while bathing/dressing the author', 'she was religious'],
                  hint: 'Review Class 9 character analysis of Krishtakka (c9_engl_ch1_2) and practice PEEL structure using.',
                  misconception: 'Students often treat the grandmother as a static symbol of "tradition" or "religion," missing her agency and adaptability.' }
          ],
            remediations: { 'students-often-treat-the-grandmother': { steps: ['Re-read the three phases (village, city, university) and create a two-column table: Column A = Grandmother\'s Action.', 'Highlight every sentence where the author describes her *without* using adjectives (e.g., "Her lips constantly moved.', 'Write one PEEL paragraph on "The grandmother\'s silence is her loudest expression of love" using only verbs from the.', 'Discuss with a peer: "If she were merely rigid, why does she celebrate his return with a drum and song?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_005', difficulty: 'standard',
          question: 'Supporting characters in \'The Portrait of a Lady\' — the secondary figures who.',
          hint: 'Review the "three phases" question from NCERT Understanding the Text (Q1) and the.',
          misconception: 'Students often treat supporting characters as "minor" and therefore unimportant for exams, writing one-line.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'The Portrait of a Lady\'',
                  options: ['Supporting characters in \'The Portrait of a Lady\'', '\'The Portrait of a Lady\' (Hornbill, ch', 'The plot/narrative arc of \'The Portrait of a Lady\'', 'The setting of \'The Portrait of a Lady\''],
                  hint: 'Review the "three phases" question from NCERT Understanding the Text (Q1) and the grandmother\'s key.',
                  misconception: 'Students often treat supporting characters as "minor" and therefore unimportant for exams, writing one-line descriptions like "the priest.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Re-read the text marking every scene where a non-grandmother, non-narrator figure appears.', 'For each, complete a 3-column table: Character | Action/Dialogue | What This Reveals About Grandmother/Theme.', 'Pick the two strongest rows and practice writing a PEEL paragraph for each.', 'Verify that the "Explanation" step connects the character\'s specific behavior to a thematic idea (tradition, change.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_01_006', difficulty: 'standard',
          question: 'The primary theme of \'The Portrait of a Lady\' — the central idea the whole text.',
          hint: 'If stuck, review **c11_eng_h_cbse_01_004 (Character Analysis: Protagonist)** and create.',
          misconception: 'Students often think the primary theme is **"the generation gap"** or **"the author\'s guilt about leaving his.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of \'The Portrait of a Lady\'',
                  options: ['The primary theme of \'The Portrait of a Lady\'', '\'The Portrait of a Lady\' (Hornbill, ch', 'The plot/narrative arc of \'The Portrait of a Lady\'', 'The setting of \'The Portrait of a Lady\''],
                  hint: 'If stuck, review **c11_eng_h_cbse_01_004 (Character Analysis: Protagonist)** and create.',
                  misconception: 'Students often think the primary theme is **"the generation gap"** or **"the author\'s guilt about leaving his grandmother."** This error.' }
          ],
            remediations: { 'the-primary-theme-is-the': { steps: ['**Re-read the last 3 paragraphs** (from "When I decided to go abroad...") with a highlighter: mark every action the.', '**Ask:** "Does she *react* to the author, or *act* from her own center?" — She acts.', 'The theme is *her* portrait, not his guilt.', '**Write one PEEL paragraph** using only *her* verbs as evidence: "She *accepted*, *sat*, *spun*, *recited*, *fed*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
