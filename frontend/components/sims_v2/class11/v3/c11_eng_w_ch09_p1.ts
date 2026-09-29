import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch09_p1: SimDef = {
    id: 'v3_c11_eng_w_ch09_p1',
    title: 'The Peacock (Poem) · Part 1/3',
    subtitle: 'Read a diaspora poem where distance is the subject, not the defect.',
    classLevel: 11, subject: 'eng_w', topic: 'The Peacock (Poem) · Part 1/3',
    chapters: ['c11_eng_w_ch09'],
    nodeIds: ['c11_eng_w_cbse_09_001', 'c11_eng_w_cbse_09_002', 'c11_eng_w_cbse_09_003', 'c11_eng_w_cbse_09_004', 'c11_eng_w_cbse_09_005', 'c11_eng_w_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader catching a blue shadow at the edge of a page', intro: 'A veranda, a book, a hush — the peacock is announced by everything except its own body.', goal: 'Evaluate diasporic perspective and read the poem\'s sensory progression as structure.' },
    discovery: {
        question: 'Sujata Bhatt writes India\'s national bird while living in Germany. A critic calls it \'a foreigner\'s exotic view — not an authentic Indian poem.\' Fair?',
        options: ['No — diaspora produces differently positioned truth; the poem\'s honesty about distance is its authenticity', 'Yes — only residents can write national symbols authentically', 'Yes — her Gujarati is too rusty to claim the subject', 'No — because peacocks also exist in European zoos'],
        answer: 'No — diaspora produces differently positioned truth; the poem\'s honesty about distance is its authenticity',
        hook: 'The poem doesn\'t pretend the peacock is in the room — it\'s a \'blue shadow\' falling on someone reading, glimpsed across a gap the poem refuses to hide.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'The Peacock\' (Woven Words, ch. 9) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Order the sensory signals that announce the bird — shadow, wind, silenced bees, stretching cat — then judge whether free verse mimics its darting.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'The Peacock\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'What is the title of the poetry collection from which "The Peacock" is taken, and in which year was it published?', options: [
                { text: 'The poem "The Peacock" is from Sujata Bhatt\'s collection "Brunizem," published in 1988', outcome: 'The poem "The Peacock" is from Sujata Bhatt\'s collection "Brunizem," published in 1988.' },
                { text: 'Monkey Shadows', outcome: 'Not quite — Students conflate "context" with "summary" – they think providing background means retelling what.', reveals: 'students-conflate-context-with-summary' },
                { text: 'The Stinking Rose', outcome: 'Not quite — Students conflate "context" with "summary" – they think providing background means retelling what.', reveals: 'students-conflate-context-with-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'The Peacock\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the initiating moment that sets the poem\'s narrative in motion, and where does it appear in the poem?', options: [
                { text: 'The initiating moment is the peacock\'s "loud sharp call" that "seems to come from', outcome: 'The initiating moment is the peacock\'s "loud sharp call" that "seems to come from nowhere" in the.' },
                { text: 'the blue shadow', outcome: 'Not quite — Students often think "narrative structure" in poetry means a story with characters, dialogue, and.', reveals: 'narrative-structure-in-poetry-means' },
                { text: 'reading a book', outcome: 'Not quite — Students often think "narrative structure" in poetry means a story with characters, dialogue, and.', reveals: 'narrative-structure-in-poetry-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'The Peacock\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'Define "setting" and "atmosphere" as literary terms in poetry, and give one example of each from the opening lines of "The Peacock."', options: [
                { text: 'Setting: the veranda where the speaker sits reading a book', outcome: 'Setting: the veranda where the speaker sits reading a book; the pipal tree where the peacock.' },
                { text: 'outside', outcome: 'Not quite — Students treat setting as a static "where" (veranda, tree) and atmosphere as a static "mood".', reveals: 'students-treat-setting-as-a' },
                { text: 'nature', outcome: 'Not quite — Students treat setting as a static "where" (veranda, tree) and atmosphere as a static "mood".', reveals: 'students-treat-setting-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'The Peacock\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is the protagonist of the poem "The Peacock," and how is it introduced in the first three lines?', options: [
                { text: 'The protagonist is the peacock, introduced through its "loud sharp call" that "seems to', outcome: 'The protagonist is the peacock, introduced through its "loud sharp call" that "seems to come from.' },
                { text: 'the speaker', outcome: 'Not quite — Students often treat the peacock as a static symbol of beauty or pride (due to the cultural cliché.', reveals: 'students-often-treat-the-peacock' },
                { text: 'the cat', outcome: 'Not quite — Students often treat the peacock as a static symbol of beauty or pride (due to the cultural cliché.', reveals: 'students-often-treat-the-peacock' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'The Peacock\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List the three supporting characters explicitly named or described in the poem "The Peacock" and quote the one verb associated with each.', options: [
                { text: 'The three supporting characters are: the cat ("will awaken and stretch"), the bees ("will', outcome: 'The three supporting characters are: the cat ("will awaken and stretch"), the bees ("will stop".' },
                { text: 'supporting character analysis', outcome: 'Not quite — Students believe "supporting character analysis" means writing a mini-biography for each character.', reveals: 'supporting-character-analysis-means-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'The Peacock\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of Sujata Bhatt\'s poem "The Peacock" as distinct from its subject matter?', options: [
                { text: 'The primary theme is the elusive, transient beauty of nature that reveals itself only to', outcome: 'The primary theme is the elusive, transient beauty of nature that reveals itself only to patient.' },
                { text: 'a peacock', outcome: 'Not quite — Students often believe the primary theme is "the beauty of the peacock" or "nature is beautiful".', reveals: 'the-primary-theme-is-the' },
                { text: 'nature\'s beauty', outcome: 'Not quite — Students often believe the primary theme is "the beauty of the peacock" or "nature is beautiful".', reveals: 'the-primary-theme-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At the school\'s World Poetry Day you introduce Sujata Bhatt\'s \'The Peacock\'. A co-host announces: \'It\'s a nature poem about India\'s national bird — pretty description of feathers and colours, by an Indian poet.\'',
            decisions: [{ prompt: 'What\'s the crucial context that changes how you hear it?', options: [
                { text: 'The diasporic lens: Bhatt writes from Germany — distance turns the familiar bird into concentrated memory and identity. Every detail (the colour flaring, the sudden disappearance, the tail\'s closure) works as recall made visible; the peacock is a cultural signifier of a homeland seen from afar, not an ornithology sketch.', outcome: 'Same bird, different charge: for the diaspora poet the peacock condenses longing — reading it as plain description misses the poem\'s ache.' },
                { text: 'The intro is right — national bird, national pride; read it as celebration of Indian wildlife.', outcome: 'Celebration isn\'t the register: the poem is steeped in remembering and loss — the bird\'s vanishing enacts how the homeland survives in flashes of memory.', reveals: 'peacock-is-wildlife-celebration' },
                { text: 'It\'s a mythological poem — the peacock stands for the gods, so read it as religious verse.', outcome: 'Myth and art enrich the symbol but the poem\'s engine is diasporic memory — the bird as homeland made luminous and then gone.', reveals: 'peacock-is-only-mythology' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'The poem\'s ragged lines move the way the bird does — appearing, vanishing, leaving only the very end of a tail.',
            decisions: [{ prompt: 'What comes next? The Peacock (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Peacock (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_001', difficulty: 'standard',
          question: '\'The Peacock\' (Woven Words, ch. 9) — the context and background to this text.',
          hint: 'Review PEEL method from c8_engl_ch1_17: practice writing one context paragraph on.',
          misconception: 'Students conflate "context" with "summary" – they think providing background means retelling what the poem *says*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'The Peacock\' (Woven Words, ch',
                  options: ['\'The Peacock\' (Woven Words, ch', 'The plot/narrative arc of \'The Peacock\'', 'The setting of \'The Peacock\'', 'Character analysis in \'The Peacock\''],
                  hint: 'Review PEEL method from c8_engl_ch1_17: practice writing one context paragraph on a familiar poem.',
                  misconception: 'Students conflate "context" with "summary" – they think providing background means retelling what the poem *says* (e.g., "the poem.' }
          ],
            remediations: { 'students-conflate-context-with-summary': { steps: ['If a student produces a summary instead of context: (1) Explicitly contrast: "Context = outside the poem (author\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "context" with "summary" – they think providing background means retelling what the poem *says*.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "Since Sujata Bhatt lives in Germany, \'The Peacock\' cannot be an authentic Indian poem – it\'s just a foreigner\'s exotic view.', answer: 'Refute',
                  options: ['Refute', 'The poem is about a peacock that visits when you read'],
                  hint: 'Review PEEL method from c8_engl_ch1_17: practice writing one context paragraph on a familiar poem.',
                  misconception: 'Students conflate "context" with "summary" – they think providing background means retelling what the poem *says* (e.g., "the poem.' }
          ],
            remediations: { 'students-conflate-context-with-summary': { steps: ['If a student produces a summary instead of context: (1) Explicitly contrast: "Context = outside the poem (author\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'The Peacock\' — what happens, in what order, and why.',
          hint: 'Review the difference between "plot" in prose (c10_engl_cbse_01_001-c10_engl_cbse_01_008).',
          misconception: 'Students often think "narrative structure" in poetry means a story with characters, dialogue, and a clear.',
          parts: [
                { id: 'a', prompt: 'The poem ends with "It is the tail that has to blink / For eyes that are always open." Analyze how this final metaphor resolves the narrative tension built.', answer: 'The poem builds tension through elusiveness',
                  options: ['The poem builds tension through elusiveness', 'narrative structure'],
                  hint: 'Review the difference between "plot" in prose (c10_engl_cbse_01_001-c10_engl_cbse_01_008) and.',
                  misconception: 'Students often think "narrative structure" in poetry means a story with characters, dialogue, and a clear problem-solution plot like.' }
          ],
            remediations: { 'narrative-structure-in-poetry-means': { steps: ['If a student imposes a prose plot template, guide them through this remediation: (1) Re-read the poem marking only.', '(2) Label each shift with a functional term: "initiating perception," "conditional preparation," "ecosystem response,".', '(4) Practice on a simpler narrative poem (e.g., "The Eagle" by Tennyson) to build the skill.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_003', difficulty: 'standard',
          question: 'The setting of \'The Peacock\' — the place, time and atmosphere the text creates.',
          hint: 'If stuck, review c7_engl_ch03_014 (Setting and Natural Imagery in the Poem) for the.',
          misconception: 'Students treat setting as a static "where" (veranda, tree) and atmosphere as a static "mood" (peaceful, tense), missing.',
          parts: [
                { id: 'a', prompt: 'Define "setting" and "atmosphere" as literary terms in poetry, and give one example of each from the opening lines of "The Peacock."', answer: 'Setting: the veranda where the speaker sits reading a book',
                  options: ['Setting: the veranda where the speaker sits reading a book', 'outside', 'nature'],
                  hint: 'If stuck, review c7_engl_ch03_014 (Setting and Natural Imagery in the Poem) for the poetry-specific.',
                  misconception: 'Students treat setting as a static "where" (veranda, tree) and atmosphere as a static "mood" (peaceful, tense), missing how Bhatt makes the.' },
                { id: 'b', prompt: 'ANALYZE: Compare the atmosphere in the first stanza (the peacock\'s call and flash) with the atmosphere in the second stanza (the veranda scene).', answer: 'Stanza 1 presents an external, fleeting observer perspective: "loud sharp call',
                  options: ['Stanza 1 presents an external, fleeting observer perspective: "loud sharp call', 'first stanza is outside, second is on veranda'],
                  hint: 'If stuck, review c7_engl_ch03_014 (Setting and Natural Imagery in the Poem) for the poetry-specific.',
                  misconception: 'Students treat setting as a static "where" (veranda, tree) and atmosphere as a static "mood" (peaceful, tense), missing how Bhatt makes the.' }
          ],
            remediations: { 'students-treat-setting-as-a': { steps: ['Have the student physically enact the poem: sit with a book, simulate "great concentration," then have a partner create.', 'Ask: "What did your body notice *before* you \'saw\' the peacock?" 3.', 'Map each bodily sensation to a line in stanza 2.', 'Finally, rewrite stanza 2 as a cause-effect chain: "Because I read with concentration → the bees stopped → the wind.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_004', difficulty: 'standard',
          question: 'Character analysis in \'The Peacock\' — the central figure(s), their traits, and.',
          hint: 'If stuck, review c10_engl_cbse_07_007 (Valli\'s character analysis) — it models how.',
          misconception: 'Students often treat the peacock as a static symbol of beauty or pride (due to the cultural cliché "proud as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis in \'The Peacock\'',
                  options: ['Character analysis in \'The Peacock\'', '\'The Peacock\' (Woven Words, ch', 'The plot/narrative arc of \'The Peacock\'', 'The setting of \'The Peacock\''],
                  hint: 'If stuck, review c10_engl_cbse_07_007 (Valli\'s character analysis) — it models how to build.',
                  misconception: 'Students often treat the peacock as a static symbol of beauty or pride (due to the cultural cliché "proud as a peacock") and list its.' }
          ],
            remediations: { 'students-often-treat-the-peacock': { steps: ['If the student defaults to "peacock = pride/beauty," do this: 1) Have them reread *only* the verbs associated with the.', '2) Ask: "Which direction dominates?" (Away).', '3) Then: "If a person did this — called loudly but ran when you looked — what would you call them?" (Shy, elusive.', '4) Finally: "So why does the poem *show* the tail\'s eyes blinking shut?" Guide them to: "Because the real eyes never.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_005', difficulty: 'standard',
          question: 'Supporting characters in \'The Peacock\' — the secondary figures who move the.',
          hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_09_004) to solidify the.',
          misconception: 'Students believe "supporting character analysis" means writing a mini-biography for each character (name, traits.',
          parts: [
                { id: 'a', prompt: 'Analyze how the peacock functions as a supporting character *to the speaker\'s experience* despite being the title figure.', answer: 'The peacock is the catalyst, not the protagonist',
                  options: ['The peacock is the catalyst, not the protagonist', 'supporting character analysis'],
                  hint: 'Review "Character Analysis: Protagonist" (c11_eng_w_cbse_09_004) to solidify the speaker\'s role.',
                  misconception: 'Students believe "supporting character analysis" means writing a mini-biography for each character (name, traits, backstory).' }
          ],
            remediations: { 'supporting-character-analysis-means-writing': { steps: ['Return to the text and highlight every verb attached to a non-"I" subject.', 'Make a two-column table: Column A = Character/Entity, Column B = Exact Verb Phrase.', 'For each row, complete the sentence: "This action functions to ______ the speaker\'s experience of the peacock." 4.', 'Discard any adjective not directly supported by a verb in the poem (e.g., "curious," "lazy").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_09_006', difficulty: 'standard',
          question: 'The primary theme of \'The Peacock\' — the central idea the whole text returns to.',
          hint: 'If stuck, return to node 002 and create a three-column table: Stanza | Action | Shift.',
          misconception: 'Students often believe the primary theme is "the beauty of the peacock" or "nature is beautiful" — generic statements.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of \'The Peacock\'',
                  options: ['The primary theme of \'The Peacock\'', '\'The Peacock\' (Woven Words, ch', 'The plot/narrative arc of \'The Peacock\'', 'The setting of \'The Peacock\''],
                  hint: 'If stuck, return to node 002 and create a three-column table: Stanza | Action | Shift in Agency.',
                  misconception: 'Students often believe the primary theme is "the beauty of the peacock" or "nature is beautiful" — generic statements that could apply.' }
          ],
            remediations: { 'the-primary-theme-is-the': { steps: ['Have the student re-read only the middle stanza (lines 9-18) and list every verb: "sit," "read," "begin to live," "will.', 'Ask: "Which verbs describe the speaker\'s *intentional* actions?', 'Which describe *involuntary* responses?" 3.', 'Guide them to see the shift from "you have to sit/read" (intentional) to "you begin to live inside" (unintentional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
