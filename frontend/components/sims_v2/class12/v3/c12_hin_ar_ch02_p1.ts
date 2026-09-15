import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch02_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch02_p1',
    title: 'd¡qoj ukjk;.k · Part 1/3',
    subtitle: 'A poem that mourns without ever complaining',
    classLevel: 12, subject: 'hin_ar', topic: 'd¡qoj ukjk;.k · Part 1/3',
    chapters: ['c12_hin_ar_ch02'],
    nodeIds: ['c12_hin_ar_cbse_02_001', 'c12_hin_ar_cbse_02_002', 'c12_hin_ar_cbse_02_003', 'c12_hin_ar_cbse_02_004', 'c12_hin_ar_cbse_02_005', 'c12_hin_ar_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Contemporary Hindi poetry reader', intro: 'A book-length poem built to hold a vanishing world — one precise image at a time.', goal: 'Read Patang inside Alok Dhanva\'s long poem — science-trained observation as elegy for a disappearing rural world.' },
    discovery: {
        question: 'A poet watches the village world of his childhood dissolve — yet never once writes in complaint. How does a poem protest without protesting?',
        options: ['Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique', 'By staying silent', 'By blaming politicians', 'It can\'t — complaint is required'],
        answer: 'Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique',
        hook: '\'No tone of complaint\' doesn\'t mean no criticism — the poet is also a science communicator, so the poem works like field notes: concrete, sensory, exact. It\'s one movement of a single book-length poem, an architecture of memory against erasure.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory section that provides essential biographical, historical, and literary context for the poem "irax" by vkyksd èkUok, enabling students.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the long poem as preservation work: follow childhood idyll into encroaching modernity, weigh what the three-part textbook split gains and costs, and hear critique inside pure description.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a film without knowing its director, genre, or historical setting — you would miss layers of meaning.',
            decisions: [{ prompt: 'Who is the poet of "irax", and what is the title of the single long poem (,dek=k laxzg) from which this poem is taken, along with its.', options: [
                { text: 'The poet is vkyksd èkUok (born 1948, Aligarh)', outcome: 'The poet is vkyksd èkUok (born 1948, Aligarh). The poem "irax" is an excerpt from his single long.' },
                { text: 'turk dk vkneh', outcome: 'Not quite — Students treat "Before You Read" as optional background reading — skimming it for names/dates.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you are scrolling through news photos of a war zone — rubble where homes stood, children playing hopscotch near a crater.',
            decisions: [{ prompt: 'What is the primary physical setting of the poem "इराक" as established in the opening lines, and which two sensory details does the poet.', options: [
                { text: 'The primary setting is a war-torn Iraqi street/neighbourhood where children play amid', outcome: 'The primary setting is a war-torn Iraqi street/neighbourhood where children play amid active.' },
                { text: 'a village in India', outcome: 'Not quite — Students treat "setting" and "atmosphere" as synonyms or sequential labels: "The setting is Iraq.', reveals: 'students-treat-setting-and-atmosphere' },
                { text: 'a peaceful park', outcome: 'Not quite — Students treat "setting" and "atmosphere" as synonyms or sequential labels: "The setting is Iraq.', reveals: 'students-treat-setting-and-atmosphere' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are watching a play where the main actor is a group of children playing in a village evening.',
            decisions: [{ prompt: 'Identify any two supporting characters/elements from the poem "irax" that are personified (given human qualities) and state the human.', options: [
                { text: 'Correct answer: The moon (\'kjn) is personified', outcome: 'Correct answer: The moon (\'kjn) is personified as it "takes the children to their dream world".' },
                { text: 'the moon shines', outcome: 'Not quite — Students often believe "supporting characters" in a poem must be human figures with names and.', reveals: 'supporting-characters-in-a-poem' },
                { text: 'supporting characters', outcome: 'Not quite — Students often believe "supporting characters" in a poem must be human figures with names and.', reveals: 'supporting-characters-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Curating a farewell exhibit, a teammate dismisses a photo essay of childhood monsoons — paper boats, wet gullies — as \'cute nostalgia with no real content.\' You think it\'s the strongest piece submitted.',
            decisions: [{ prompt: 'How does Kunwar Narain\'s poem structure defend the piece?', options: [
                { text: 'Point to the architecture — the poem moves from a concrete childhood scene to an adult meditation, showing memory isn\'t a discarded past but a layer still alive under the present; the essay\'s small wet moments are the vessel for a universal claim.', outcome: 'The poem proves that juxtaposing then and now is how memory actually works — the \'content\' is the endurance of childhood, not the boats themselves.' },
                { text: 'Concede — childhood images are sentimental raw material until they\'re processed into a serious argument.', outcome: 'That inverts the poem\'s method: the concrete scene is what earns the abstract reflection; stripping the sensory ground leaves the \'argument\' with nothing to stand on.', reveals: 'nostalgia-is-not-content' },
                { text: 'Defend it only as emotion — \'it feels true\' is enough without needing structure talk.', outcome: 'Feeling without structure undersells the piece: the chapter\'s point is that the arrangement — present tense scene widening into reflection — is what converts one person\'s memory into everyone\'s.', reveals: 'emotion-needs-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear a poem argue without ever accusing — the nayi kavita way of making images carry the whole weight.',
            decisions: [{ prompt: 'What comes next? d¡qoj ukjk;.k · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — d¡qoj ukjk;.k · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory section that.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_13_001 (Critical Thinking: Analysis and Interpretation).',
          misconception: 'Students treat "Before You Read" as optional background reading — skimming it for names/dates — rather than as.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of "irax", and what is the title of the single long poem (,dek=k laxzg) from which this poem is taken, along with its publication year?', answer: 'The poet is vkyksd èkUok (born 1948, Aligarh)',
                  options: ['The poet is vkyksd èkUok (born 1948, Aligarh)', 'turk dk vkneh'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_13_001 (Critical Thinking: Analysis and Interpretation) where you.',
                  misconception: 'Students treat "Before You Read" as optional background reading — skimming it for names/dates — rather than as a *critical lens* that.' },
                { id: 'b', prompt: 'Compare the thematic concern of "irax" (as signaled in the intro: "cky fØ;kdykiksa, izo`Qfr esa vk, ifjorZu") with the Class 11 poem "Aroh Chapter 1" (or any.', answer: 'Both introductions position the poet as a chronicler of a vanishing world',
                  options: ['Both introductions position the poet as a chronicler of a vanishing world', 'form-content unity'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_13_001 (Critical Thinking: Analysis and Interpretation) where you.',
                  misconception: 'Students treat "Before You Read" as optional background reading — skimming it for names/dates — rather than as a *critical lens* that.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Re-read the NCERT "Before You Read" box *aloud* in Hindi, underlining every claim about the poet\'s *method* (not just.', 'For each underlined phrase, write one specific textual feature you now *expect* in the poem (e.g., "no complaint" →.', 'Take Diagnostic Question 2 again — if you can now answer with the "elegy not polemic" distinction, proceed; else.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_002', difficulty: 'standard',
          question: 'Plot and narrative structure in a poem refer to the sequence of events, images.',
          hint: 'If stuck, review the Class 11 node c11_hin_ar_cbse_02_002\'s worked example on stanza-wise.',
          misconception: 'Students often think "plot" in a poem means a story with a beginning, middle, and end like a short story.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot and narrative structure in a poem refer to the sequence of events, images, or',
                  options: ['Plot and narrative structure in a poem refer to the sequence of events, images, or', '"Before You Read: Context and Background" is a preparatory section that provides', 'Setting in poetry refers to the time, place, and social environment where the poem\'s', 'Character analysis of the protagonist in poetry involves identifying the central figure'],
                  hint: 'If stuck, review the Class 11 node c11_hin_ar_cbse_02_002\'s worked example on stanza-wise mapping.',
                  misconception: 'Students often think "plot" in a poem means a story with a beginning, middle, and end like a short story.' }
          ],
            remediations: { 'plot-in-a-poem-means': { steps: ['Have the student re-read the poem silently, then aloud, marking only the verbs and their tenses in each stanza.', 'Ask: "What is the speaker DOING in stanza 1?', 'Guide them to see that stanza 1 shows children acting (making boats, running), while stanza 3 shows the speaker.', 'Use the prior node c11_hin_ar_cbse_02_002 (Class 11 Plot and Narrative Structure) to review the difference between.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "plot" in a poem means a story with a beginning, middle, and end like a short story.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the poem\'s non-linear structure (juxtaposing childhood play with adult reflection) compared to a straightforward chronological.', answer: 'The non-linear structure is more effective',
                  options: ['The non-linear structure is more effective', 'clarity'],
                  hint: 'If stuck, review the Class 11 node c11_hin_ar_cbse_02_002\'s worked example on stanza-wise mapping.',
                  misconception: 'Students often think "plot" in a poem means a story with a beginning, middle, and end like a short story.' }
          ],
            remediations: { 'plot-in-a-poem-means': { steps: ['Have the student re-read the poem silently, then aloud, marking only the verbs and their tenses in each stanza.', 'Ask: "What is the speaker DOING in stanza 1?', 'Guide them to see that stanza 1 shows children acting (making boats, running), while stanza 3 shows the speaker.', 'Use the prior node c11_hin_ar_cbse_02_002 (Class 11 Plot and Narrative Structure) to review the difference between.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the time, place, and social environment where the.',
          hint: 'If stuck, return to c11_hin_ar_cbse_02_003 and redo the "sensory highlighting" exercise.',
          misconception: 'Students treat "setting" and "atmosphere" as synonyms or sequential labels: "The setting is Iraq, the atmosphere.',
          parts: [
                { id: 'a', prompt: 'Apply the "setting → atmosphere → theme" chain to the stanza where "नरकटों की झुरमुट तक / मिसाइलें पहुँचती हैं" (missiles reach even the reed thickets).', answer: 'Setting detail: Missiles penetrating "नरकटों की झुरमुट" (reed thickets',
                  options: ['Setting detail: Missiles penetrating "नरकटों की झुरमुट" (reed thickets', 'atmosphere is fear', 'inescapable violation', 'says "atmosphere is fear" is too vague'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_02_003 and redo the "sensory highlighting" exercise on.',
                  misconception: 'Students treat "setting" and "atmosphere" as synonyms or sequential labels: "The setting is Iraq, the atmosphere is sad." They fail to see.' }
          ],
            remediations: { 'students-treat-setting-and-atmosphere': { steps: ['If a student cannot move beyond "setting = place, atmosphere = mood", do this 3-step remediation: (1) **Sensory.', 'They will *see* the multisensory density they missed.', '(2) **Atmosphere-Naming Ladder**: For each stanza, have them write: "The setting detail is ____.', 'It makes me feel ____ (precise word: not \'sad\' but \'haunted/claustrophobic/tender\').'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in poetry involves identifying the.',
          hint: 'If stuck on identifying the protagonist, review Class 11 Chapter 2 "Namak Ka Daroga".',
          misconception: 'Students believe the protagonist of a poem must be a **single, named individual** with a distinct personality (like.',
          parts: [
                { id: 'a', prompt: 'Apply the PEEL structure to analyze how the line "\'kjn vk;k iqyksa dks ikj djrs gq, viuh u;h pedhyh lkbfdy rs"k pykrs gq," reveals a specific trait of the.', answer: '**Point:** The protagonist (childhood) shoulders responsibility instinctively',
                  options: ['**Point:** The protagonist (childhood) shoulders responsibility instinctively', 'Explanation'],
                  hint: 'If stuck on identifying the protagonist, review Class 11 Chapter 2 "Namak Ka Daroga".',
                  misconception: 'Students believe the protagonist of a poem must be a **single, named individual** with a distinct personality (like a novel\'s hero).' }
          ],
            remediations: { 'the-protagonist-of-a-poem': { steps: ['**Revisit Class 11 Node c11_hin_ar_cbse_02_004** — review the distinction between "character in prose" and "subject.', '**Re-read "irax" with a highlighter** — mark every plural verb/form ("mM+kus", "pykrs", "cqykrs", "ykrs", "mM+ jgs".', 'Count them: 10+ plural forms.', 'This visual proof forces recognition of the collective protagonist.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_005', difficulty: 'standard',
          question: 'In poetry, supporting characters are the secondary figures, entities,.',
          hint: 'If stuck, review the definition and examples of personification in Class 11 poetry nodes.',
          misconception: 'Students often believe "supporting characters" in a poem must be human figures with names and dialogue.',
          parts: [
                { id: 'a', prompt: 'Identify any two supporting characters/elements from the poem "irax" that are personified (given human qualities) and state the human action each performs.', answer: 'Correct answer: The moon (\'kjn) is personified',
                  options: ['Correct answer: The moon (\'kjn) is personified', 'the moon shines', 'supporting characters', 'lists only non-human descriptions (e'],
                  hint: 'If stuck, review the definition and examples of personification in Class 11 poetry nodes (e.g.',
                  misconception: 'Students often believe "supporting characters" in a poem must be human figures with names and dialogue.' },
                { id: 'b', prompt: 'Explain in your own words how the farmers (Nr) function as supporting characters in the poem. What does their pausing of work suggest about the child\'s world?', answer: 'Correct answer: The farmers (Nr) stop their work (fxjus dk Hk',
                  options: ['Correct answer: The farmers (Nr) stop their work (fxjus dk Hk', 'farmers are just background', 'supporting characters', '"supporting characters" in a poem must be human figures with names and dialogue'],
                  hint: 'If stuck, review the definition and examples of personification in Class 11 poetry nodes (e.g.',
                  misconception: 'Students often believe "supporting characters" in a poem must be human figures with names and dialogue.' }
          ],
            remediations: { 'supporting-characters-in-a-poem': { steps: ['If a student cannot identify non-human supporting characters: (1) Have them re-read the poem and circle every noun that.', '(2) Ask: "Does this noun have a name?', 'No — but it *acts* like a person.', 'That is personification, and in poetry, personified elements *are* characters." (3) Practice with a simpler poem (e.g.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_006', difficulty: 'standard',
          question: 'The primary theme of a poem is its central, unifying idea or insight about.',
          hint: 'If stuck, revisit the "Theme vs. Subject" graphic organiser in c11_hin_ar_cbse_02_006 and.',
          misconception: 'Students often confuse the *primary theme* with the *most repeated image* or the *emotional tone*.',
          parts: [
                { id: 'a', prompt: 'In "irax", the poet describes children catching dragonflies (v¡èksjs) and chasing butterflies (mtkyk).', answer: 'These actions show children engaging with nature on nature\'s own terms',
                  options: ['These actions show children engaging with nature on nature\'s own terms', 'wholeness', 'self-contained joy'],
                  hint: 'If stuck, revisit the "Theme vs. Subject" graphic organiser in c11_hin_ar_cbse_02_006 and practise.',
                  misconception: 'Students often confuse the *primary theme* with the *most repeated image* or the *emotional tone*.' }
          ],
            remediations: { 'students-often-confuse-the-primary': { steps: ['If a student cannot distinguish theme from subject/tone: (1) Have them re-read c11_hin_ar_cbse_02_006 (Class 11 Theme.', '(2) Give them three one-sentence summaries of "irax" — one subject, one tone, one theme — and ask them to label each.', '(3) Then ask them to convert the subject sentence into a theme sentence by adding "the poet shows that..." and.', '(4) Re-attempt Diagnostic Question 2 with this scaffold.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
