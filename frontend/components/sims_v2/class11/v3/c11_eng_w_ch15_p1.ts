import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch15_p1: SimDef = {
    id: 'v3_c11_eng_w_ch15_p1',
    title: 'Hawk Roosting (Poem) · Part 1/3',
    subtitle: 'Sit inside a predator\'s self-justifying logic and watch form become the cage.',
    classLevel: 11, subject: 'eng_w', topic: 'Hawk Roosting (Poem) · Part 1/3',
    chapters: ['c11_eng_w_ch15'],
    nodeIds: ['c11_eng_w_cbse_15_001', 'c11_eng_w_cbse_15_002', 'c11_eng_w_cbse_15_003', 'c11_eng_w_cbse_15_004', 'c11_eng_w_cbse_15_005', 'c11_eng_w_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader trapped in a tyrant\'s monologue', intro: 'A hawk roosts with eyes closed, rehearsing its absolute right over creation — and no poet interrupts to correct it.', goal: 'Read the dramatic monologue as ironic exposure and analyse its circular structure.' },
    discovery: {
        question: 'The hawk declares \'There is no sophistry in my body\' and \'I kill where all is mine.\' Is Hughes endorsing this voice?',
        options: ['No — the dramatic monologue lets the tyrant\'s logic indict itself: circular, self-serving, amorally clear', 'Yes — the hawk speaks the poet\'s own creed', 'Yes — nature writing always celebrates the predator', 'No — but only because hawks can\'t actually talk'],
        answer: 'No — the dramatic monologue lets the tyrant\'s logic indict itself: circular, self-serving, amorally clear',
        hook: 'No narrator mediates — you\'re locked inside a consciousness that feels no guilt, and that entrapment is the poem\'s point.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Hawk Roosting\' (Woven Words, ch. 15) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_15_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the stanza openings from \'I sit\' to \'Nothing has changed,\' and test whether the rigid quatrains are decoration or the cage the argument builds.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Hawk Roosting\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is Ted Hughes and what is he known for in his poetry?', options: [
                { text: 'Ted Hughes (1930–1998) was a British Poet Laureate known for his intense, often violent', outcome: 'Ted Hughes (1930–1998) was a British Poet Laureate known for his intense, often violent depictions.' },
                { text: 'He wrote romantic love poems', outcome: 'Not quite — Students often think the poem is simply a description of a hawk\'s life, missing that it is.', reveals: 'the-poem-is-simply-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'Hawk Roosting\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the primary structural difference between a narrative poem like "The Rime of the Ancient Mariner" and a dramatic monologue like.', options: [
                { text: 'A narrative poem tells a story with external events, characters, and a chronological plot', outcome: 'A narrative poem tells a story with external events, characters, and a chronological plot.' },
                { text: 'both have characters', outcome: 'Not quite — Students often treat the hawk\'s statements as the *poet\'s* beliefs, missing that the monologue form.', reveals: 'students-often-treat-the-hawk' },
                { text: 'no plot', outcome: 'Not quite — Students often treat the hawk\'s statements as the *poet\'s* beliefs, missing that the monologue form.', reveals: 'students-often-treat-the-hawk' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Hawk Roosting\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the physical setting described in the first stanza of "Hawk Roosting"?', options: [
                { text: 'The physical setting is the top of a wood (forest), where the hawk sits with eyes closed,', outcome: 'The physical setting is the top of a wood (forest), where the hawk sits with eyes closed, its feet.' },
                { text: 'the sky', outcome: 'Not quite — Students often think "setting" only means the physical location (the wood) and "atmosphere" only.', reveals: 'setting-only-means-the-physical' },
                { text: 'a nest', outcome: 'Not quite — Students often think "setting" only means the physical location (the wood) and "atmosphere" only.', reveals: 'setting-only-means-the-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Hawk Roosting\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is the narrative perspective of "Hawk Roosting" and who is the speaker?', options: [
                { text: 'The poem is written in first-person dramatic monologue from the perspective of a hawk', outcome: 'The poem is written in first-person dramatic monologue from the perspective of a hawk.' },
                { text: 'third-person narrator describing a hawk', outcome: 'Not quite — Students often treat the hawk as a simple "villain" or "nature red in tooth and claw" and write.', reveals: 'students-often-treat-the-hawk' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Hawk Roosting\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List three supporting characters or elements in "Hawk Roosting" that are not the hawk itself.', options: [
                { text: 'The sun, the air (air\'s buoyancy), the trees (high trees, rough bark), the earth (earth\'s', outcome: 'The sun, the air (air\'s buoyancy), the trees (high trees, rough bark), the earth (earth\'s face).' },
                { text: 'character', outcome: 'Not quite — Students often believe a dramatic monologue has *no* supporting characters because only one voice.', reveals: 'a-dramatic-monologue-has-no' },
                { text: 'speaker', outcome: 'Not quite — Students often believe a dramatic monologue has *no* supporting characters because only one voice.', reveals: 'a-dramatic-monologue-has-no' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Hawk Roosting\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the single most repeated grammatical subject in the poem, and what does its frequency immediately suggest about the poem\'s central.', options: [
                { text: 'The most repeated subject is "I" (appearing in every stanza)', outcome: 'The most repeated subject is "I" (appearing in every stanza). Its frequency signals that the poem.' },
                { text: 'the trees', outcome: 'Not quite — Students often confuse the *hawk\'s stated philosophy* ("I kill where I please because it is all.', reveals: 'students-often-confuse-the-hawk' },
                { text: 'Creation', outcome: 'Not quite — Students often confuse the *hawk\'s stated philosophy* ("I kill where I please because it is all.', reveals: 'students-often-confuse-the-hawk' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a seminar on \'power and persuasion\', a classmate offers Hughes\'s \'Hawk Roosting\' as a poem that \'shows how nature is cruel and how Hughes admires the strong.\' You\'re asked whether that reading holds.',
            decisions: [{ prompt: 'How do you steer the reading of the hawk\'s speech?', options: [
                { text: 'Point out the form: it\'s a dramatic monologue — the hawk speaks with no poet-narrator, so we inhabit a mind that feels no guilt, only certainty of dominance. The \'plot\' is the self-justifying logic tightening: \'I sit\' → \'My feet\' → \'There is no sophistry in my body\' → the world unchanged by its will. Hughes exposes the seductive reasoning of tyranny; he doesn\'t endorse it.', outcome: 'Form does the work: the monologue lets the hawk condemn itself out of its own mouth — the poem studies power, not ornithology.' },
                { text: 'Accept the classmate\'s reading — the hawk\'s confidence is impressive, so Hughes must admire strength.', outcome: 'That confuses the persona with the poet: the monologue ironically exposes the hawk\'s logic as circular and self-serving.', reveals: 'hughes-endorses-the-hawk' },
                { text: 'Argue the poem has no structure at all — nothing happens, a bird just sits there.', outcome: 'No external action isn\'t no structure: the argument is the plot — premise, evidence, conclusion, reassertion of absolute power.', reveals: 'monologue-means-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'The poem ends where it began — \'My eye has permitted no change\' — the form itself enacting a will that permits nothing.',
            decisions: [{ prompt: 'What comes next? Hawk Roosting (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Hawk Roosting (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_001', difficulty: 'standard',
          question: '\'Hawk Roosting\' (Woven Words, ch. 15) — the context and background to this.',
          hint: 'Review the PEEL method for poem analysis (c8_engl_ch1_17) and the concept of persona.',
          misconception: 'Students often think the poem is simply a description of a hawk\'s life, missing that it is a constructed persona.',
          parts: [
                { id: 'a', prompt: 'What is a dramatic monologue, and why is "Hawk Roosting" considered one?', answer: 'A dramatic monologue is a poem in',
                  options: ['A dramatic monologue is a poem in', 'It\'s a poem where the poet talks about a hawk'],
                  hint: 'Review the PEEL method for poem analysis (c8_engl_ch1_17) and the concept of persona in dramatic.',
                  misconception: 'Students often think the poem is simply a description of a hawk\'s life, missing that it is a constructed persona through which Hughes.' }
          ],
            remediations: { 'the-poem-is-simply-a': { steps: ['If a student holds this misconception, guide them to: 1) Identify the speaker (hawk, not Hughes).', '2) Note the absence of moral judgment in the poem.', '3) Compare with other Hughes poems (e.g., "The Jaguar") where animals are observed, not given voice.', '4) Discuss how dramatic monologue creates irony by letting a flawed speaker reveal themselves.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Hawk Roosting\' — what happens, in what order, and.',
          hint: 'Review c6_english_u1_006 (Narrative Poetry features) and c11_eng_w_cbse_15_001 (monologue.',
          misconception: 'Students often treat the hawk\'s statements as the *poet\'s* beliefs, missing that the monologue form *ironically*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'Hawk Roosting\'',
                  options: ['The plot/narrative arc of \'Hawk Roosting\'', '\'Hawk Roosting\' (Woven Words, ch', 'The setting of \'Hawk Roosting\'', 'Character analysis in \'Hawk Roosting\''],
                  hint: 'Review c6_english_u1_006 (Narrative Poetry features) and c11_eng_w_cbse_15_001 (monologue context).',
                  misconception: 'Students often treat the hawk\'s statements as the *poet\'s* beliefs, missing that the monologue form *ironically* exposes the hawk\'s logic.' }
          ],
            remediations: { 'students-often-treat-the-hawk': { steps: ['Have the student outline the poem as a *legal brief*: Statement of Position (stanza 1), Evidence (stanzas 2-3).', 'Ask: "If this were a courtroom, what is the hawk *trying to prove*?" 3.', 'Physically cut the poem into six strips; have them reorder and justify — they\'ll discover only one order makes logical.', 'Contrast with a Class 10 poem like "The Ball Poem" (loss → realization → acceptance) to show *both* have arcs, just.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the hawk\'s statements as the *poet\'s* beliefs, missing that the monologue form *ironically*.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The poem\'s six-stanza, four-line structure (quatrains) is merely a visual convenience; free verse would convey the same hawk-like.', answer: 'Refute',
                  options: ['Refute', 'no plot', 'no structure'],
                  hint: 'Review c6_english_u1_006 (Narrative Poetry features) and c11_eng_w_cbse_15_001 (monologue context).',
                  misconception: 'Students often treat the hawk\'s statements as the *poet\'s* beliefs, missing that the monologue form *ironically* exposes the hawk\'s logic.' }
          ],
            remediations: { 'students-often-treat-the-hawk': { steps: ['Have the student outline the poem as a *legal brief*: Statement of Position (stanza 1), Evidence (stanzas 2-3).', 'Ask: "If this were a courtroom, what is the hawk *trying to prove*?" 3.', 'Physically cut the poem into six strips; have them reorder and justify — they\'ll discover only one order makes logical.', 'Contrast with a Class 10 poem like "The Ball Poem" (loss → realization → acceptance) to show *both* have arcs, just.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_003', difficulty: 'standard',
          question: 'The setting of \'Hawk Roosting\' — the place, time and atmosphere the text.',
          hint: 'Review how to annotate a poem for sensory details and emotional tone (Class 10 poetry.',
          misconception: 'Students often think "setting" only means the physical location (the wood) and "atmosphere" only means weather.',
          parts: [
                { id: 'a', prompt: 'In the line "And the earth\'s face upward for my inspection," identify the setting element and explain how it shapes the atmosphere.', answer: 'The setting element is the earth viewed from above',
                  options: ['The setting element is the earth viewed from above', 'setting', 'atmosphere'],
                  hint: 'Review how to annotate a poem for sensory details and emotional tone (Class 10 poetry analysis.',
                  misconception: 'Students often think "setting" only means the physical location (the wood) and "atmosphere" only means weather.' }
          ],
            remediations: { 'setting-only-means-the-physical': { steps: ['If a student conflates setting and atmosphere, have them list every noun denoting place or natural element in the poem.', 'Then, next to each, write the adjective or verb that shows the hawk\'s attitude toward it (e.g., "convenience,".', 'This makes visible how setting is filtered through the hawk\'s ego to create atmosphere.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_004', difficulty: 'standard',
          question: 'Character analysis in \'Hawk Roosting\' — the central figure(s), their traits.',
          hint: 'If confused about dramatic monologue, review c11_eng_w_cbse_15_001 (Context) and.',
          misconception: 'Students often treat the hawk as a simple "villain" or "nature red in tooth and claw" and write a moralistic essay.',
          parts: [
                { id: 'a', prompt: 'Identify three physical features of the hawk mentioned in the poem and explain how each contributes to its characterization as a perfect predator.', answer: '1) "Hooked head and hooked feet"',
                  options: ['1) "Hooked head and hooked feet"', 'it has sharp claws'],
                  hint: 'If confused about dramatic monologue, review c11_eng_w_cbse_15_001 (Context) and.',
                  misconception: 'Students often treat the hawk as a simple "villain" or "nature red in tooth and claw" and write a moralistic essay condemning its cruelty.' },
                { id: 'b', prompt: 'Compare the hawk\'s view of "Creation" in stanza 2 ("Now I hold Creation in my foot") with its view in stanza 5 ("The sun is behind me / Nothing has changed.', answer: 'In stanza 2, the hawk possesses Creation as an object held in its foot',
                  options: ['In stanza 2, the hawk possesses Creation as an object held in its foot', 'power statements'],
                  hint: 'If confused about dramatic monologue, review c11_eng_w_cbse_15_001 (Context) and.',
                  misconception: 'Students often treat the hawk as a simple "villain" or "nature red in tooth and claw" and write a moralistic essay condemning its cruelty.' }
          ],
            remediations: { 'students-often-treat-the-hawk': { steps: ['1) Have the student re-read stanza 3 aloud, emphasizing "No arguments assert my right" — ask: "Does the hawk *defend*.', 'Or does it *not need* arguments?" 2) Contrast with Macbeth or a corrupt politician who *uses* sophistry (lies.', '3) Assign a 50-word micro-analysis: "Explain why \'My manners are tearing off heads\' is not a confession of bad manners.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_005', difficulty: 'standard',
          question: 'Supporting characters in \'Hawk Roosting\' — the secondary figures who move the.',
          hint: 'Review c11_eng_w_cbse_15_004 (protagonist analysis) and c11_eng_w_cbse_15_002 (monologue.',
          misconception: 'Students often believe a dramatic monologue has *no* supporting characters because only one voice speaks.',
          parts: [
                { id: 'a', prompt: 'Analyze how the phrase "bones of the living" transforms the prey from a generic victim into a supporting character that deepens the poem\'s horror.', answer: '"Bones of the living" gives the prey a visceral, structural presence',
                  options: ['"Bones of the living" gives the prey a visceral, structural presence', 'animals', 'character', 'speaker'],
                  hint: 'Review c11_eng_w_cbse_15_004 (protagonist analysis) and c11_eng_w_cbse_15_002 (monologue structure).',
                  misconception: 'Students often believe a dramatic monologue has *no* supporting characters because only one voice speaks.' }
          ],
            remediations: { 'a-dramatic-monologue-has-no': { steps: ['Have the student re-read the poem and highlight every noun that is not a body part of the hawk (sun, air, trees, earth.', 'For each highlighted word, ask: "If this thing could talk, what would it say about the hawk?" 3.', 'Guide them to write one sentence from that entity\'s perspective.', 'Connect each response to the hawk\'s arrogance — this builds the analytical link between supporting character and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_15_006', difficulty: 'standard',
          question: 'The primary theme of \'Hawk Roosting\' — the central idea the whole text returns.',
          hint: 'If stuck, review "Character Analysis: Protagonist" (c11_eng_w_cbse_15_004) and practice.',
          misconception: 'Students often confuse the *hawk\'s stated philosophy* ("I kill where I please because it is all mine") with the *poem\'s.',
          parts: [
                { id: 'a', prompt: 'What is the single most repeated grammatical subject in the poem, and what does its frequency immediately suggest about the poem\'s central focus?', answer: 'The most repeated subject is "I" (appearing in every stanza)',
                  options: ['The most repeated subject is "I" (appearing in every stanza)', 'the trees', 'Creation', 'I kill where I please'],
                  hint: 'If stuck, review "Character Analysis: Protagonist" (c11_eng_w_cbse_15_004) and practice the.',
                  misconception: 'Students often confuse the *hawk\'s stated philosophy* ("I kill where I please because it is all mine") with the *poem\'s theme*.' }
          ],
            remediations: { 'students-often-confuse-the-hawk': { steps: ['Have the student read the poem again, this time physically marking every "I" statement with a highlighter.', 'Ask: "If this hawk were a human dictator giving a speech, which lines would sound like propaganda?" 3.', 'Guide them to list three things the hawk *ignores* (e.g., death, other perspectives, time).', 'Co-write a thesis: "Hughes uses the hawk\'s arrogant monologue to expose how absolute power blinds the holder to its own.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
