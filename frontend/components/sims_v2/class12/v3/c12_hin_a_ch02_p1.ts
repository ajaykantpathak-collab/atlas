import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch02_p1: SimDef = {
    id: 'v3_c12_hin_a_ch02_p1',
    title: 'lfPpnkuan ghjkuan okRL;k;u ^vKs; · Part 1/3',
    subtitle: 'He lost everything — and gained every register of the language',
    classLevel: 12, subject: 'hin_a', topic: 'lfPpnkuan ghjkuan okRL;k;u ^vKs; · Part 1/3',
    chapters: ['c12_hin_a_ch02'],
    nodeIds: ['c12_hin_a_cbse_02_001', 'c12_hin_a_cbse_02_002', 'c12_hin_a_cbse_02_003', 'c12_hin_a_cbse_02_004', 'c12_hin_a_cbse_02_005', 'c12_hin_a_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Poet\'s biographer', intro: 'Three tragedies before forty — and a poetic range no one else matched. The biography explains the voice.', goal: 'Connect Nirala\'s losses and editorial life to his stylistic range and evolution beyond Chhayavad.' },
    discovery: {
        question: 'Orphaned young, widowed early, alone in a Kolkata boarding house — yet Nirala\'s poems celebrate life\'s fleeting beauty. How does grief become craft?',
        options: ['Through deliberate transformation — editing magazines, mastering registers from Sanskritised epic to rustic satire, he converted private loss into universal voice', 'He suppressed the grief', 'Poetry was his therapy only', 'Luck and talent'],
        answer: 'Through deliberate transformation — editing magazines, mastering registers from Sanskritised epic to rustic satire, he converted private loss into universal voice',
        hook: 'Nirala outgrew Chhayavad\'s self-centred lyricism — from subjective romance to epic history, satire and metaphysical inquiry. His language had \'many forms and levels\': the same pen wrote high-Sanskrit prayer and village-cornfield satire. Grief was the fuel; craft was the engine.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory section that provides essential biographical, historical, and literary information about the author (फुज्क्यक/निराला) and the socio-cultural.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a poet\'s alchemy: follow the losses that forged him, map his leap beyond Chhayavad\'s bounds, and hear one voice speak in epic Sanskrit and village Avadhi both.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a film but the director gives you a 2-minute prelude: "This story was written by a man who lost his mother at 12, his father.',
            decisions: [{ prompt: 'Identify the three major personal losses फुज्क्यक suffered before age 40, and state the year his first published poem "तवघ्र की दह".', options: [
                { text: 'Correct answer: Mother\'s death (1918), father\'s death (shortly after), wife\'s death (year', outcome: 'Correct answer: Mother\'s death (1918), father\'s death (shortly after), wife\'s death (year not.' },
                { text: 'only mother died', outcome: 'Not quite — Students treat "Before You Read" as optional background reading rather than examinable content.', reveals: 'students-treat-before-you-read' },
                { text: 'first poem in 1922', outcome: 'Not quite — Students treat "Before You Read" as optional background reading rather than examinable content.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you open a family album and see a faded photograph of a young woman you never met. The photo sparks curiosity: Who was she? What happened?',
            decisions: [{ prompt: 'Define "plot" and "narrative structure" in the context of a narrative poem. How do they differ from a simple summary?', options: [
                { text: 'Plot is the causal sequence of events (what happens and why)', outcome: 'Plot is the causal sequence of events (what happens and why); narrative structure is the artistic.' },
                { text: 'structure', outcome: 'Not quite — Students often treat "plot" as a mere list of "what happens" and "structure" as synonymous with.', reveals: 'students-often-treat-plot-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into your grandmother\'s house at dusk — the smell of incense, the sound of a ticking clock, the soft light through the curtains — and you.',
            decisions: [{ prompt: 'What are the two main components of setting in a poem, and give one example of each from the first stanza of "ljkst Le`fr"?', options: [
                { text: 'The two main components are time and place', outcome: 'The two main components are time and place. In the first stanza, time is "evening" (fookg, vkewy.' },
                { text: 'characters and plot', outcome: 'Not quite — Students often treat setting as a static list of physical details (time: evening, place: riverbank).', reveals: 'students-often-treat-setting-as' },
                { text: 'the poet feels happy', outcome: 'Not quite — Students often treat setting as a static list of physical details (time: evening, place: riverbank).', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re describing your best friend to someone who\'s never met them — you\'d mention their habits, how they react in crises, and how they\'ve changed over.',
            decisions: [{ prompt: 'What is the literal meaning of the protagonist\'s name "लज्जा" and how does the poet use it ironically in the opening stanza?', options: [
                { text: '"लज्जा" literally means "shame" or "modesty/shyness"', outcome: '"लज्जा" literally means "shame" or "modesty/shyness". The poet uses it ironically because the name.' },
                { text: 'her name means beauty', outcome: 'Not quite — Students treat लज्जा as a static symbol of "Indian womanhood" rather than a dynamic character with.', reveals: 'students-treat-as-a-static' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and the question asks: "What is the central theme of \'ljkst Le`fr\' and how does the poet convey his message?" Most.',
            decisions: [{ prompt: 'What is the definition of \'primary theme\' in a poem, and how does it differ from a \'secondary theme\'?', options: [
                { text: 'The primary theme is the central, overarching idea that structures the entire poem', outcome: 'The primary theme is the central, overarching idea that structures the entire poem; secondary.' },
                { text: 'death, memory, duty', outcome: 'Not quite — Students often think the primary theme is simply "the poet misses his mother" or "death is sad.".', reveals: 'the-primary-theme-is-simply' },
                { text: 'the poet misses his mother', outcome: 'Not quite — Students often think the primary theme is simply "the poet misses his mother" or "death is sad.".', reveals: 'the-primary-theme-is-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re making a memorial film for a departed grandparent. The editor wants strict chronology — birth, childhood, marriage, death — \'so it\'s clear.\' Your best asset is a single fading photograph of her as a young woman.',
            decisions: [{ prompt: 'What does the structure of Agyeya\'s \'लज्जत लेखा\' advise?', options: [
                { text: 'Open on the photograph — let the frame\'s mystery pull the viewer back through fragments of her life and return to the portrait at the end; the non-linear circle enacts how memory actually holds the dead, and makes impermanence felt rather than stated.', outcome: 'The poem begins with a portrait because the trace is all that survives — starting there gives the viewer the poet\'s own shock of discovery; chronology would flatten the loss into a record.' },
                { text: 'Go chronological — clarity is respect, and audiences shouldn\'t have to piece a life together.', outcome: 'The chapter\'s counter is that order is meaning: the circular frame mimics the mind returning to a fixed image; a straight birth-to-death line dilutes the irony that only the image remains.', reveals: 'clarity-demands-chronology' },
                { text: 'Drop the photograph and structure the film around interviews with people who knew her.', outcome: 'That trades the anchor for testimony: the poem\'s power is the single surviving image holding a whole life — without it, the memories float unattached.', reveals: 'testimony-beats-image' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a life into its poetry — and see how Nirala turned personal catastrophe into the widest range in modern Hindi verse.',
            decisions: [{ prompt: 'What comes next? lfPpnkuan ghjkuan okRL;k;u ^vKs; · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — lfPpnkuan ghjkuan okRL;k;u ^vKs; · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory section that.',
          hint: 'If unable to list 5 facts from pp. 8–11 in 3 minutes, revisit Class 11 "Before You Read".',
          misconception: 'Students treat "Before You Read" as optional background reading rather than examinable content.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" is a preparatory section that provides',
                  options: ['"Before You Read: Context and Background" is a preparatory section that provides', 'Plot in a narrative poem refers to the sequence of events arranged by the poet to convey', 'Setting refers to the time, place, and physical environment in', 'Character analysis of the protagonist involves examining the central character\'s'],
                  hint: 'If unable to list 5 facts from pp. 8–11 in 3 minutes, revisit Class 11 "Before You Read".',
                  misconception: 'Students treat "Before You Read" as optional background reading rather than examinable content.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Re-read pp. 8–11 with a highlighter. Mark every date, place, person, and work title in three colours: LIFE (red).', 'Create a two-column table: LEFT column = biographical fact; RIGHT column = probable textual manifestation (e.g.', 'Orally explain the table to a peer/teacher without notes.', 'Attempt Diagnostic Questions 2 and 4 again — they test the life-work synthesis most students miss.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_002', difficulty: 'standard',
          question: 'Plot in a narrative poem refers to the sequence of events arranged by the poet.',
          hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_002 "Text: Plot and Narrative.',
          misconception: 'Students often treat "plot" as a mere list of "what happens" and "structure" as synonymous with "paragraphs".',
          parts: [
                { id: 'a', prompt: 'Define "plot" and "narrative structure" in the context of a narrative poem. How do they differ from a simple summary?', answer: 'Plot is the causal sequence of events (what happens and why)',
                  options: ['Plot is the causal sequence of events (what happens and why)', 'structure'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_002 "Text: Plot and Narrative Structure".',
                  misconception: 'Students often treat "plot" as a mere list of "what happens" and "structure" as synonymous with "paragraphs" or "stanzas".' },
                { id: 'b', prompt: 'The poem opens with the line "ns[kk fookg vkewy uoy" (I saw a portrait...).', answer: 'The portrait acts as a *frame*',
                  options: ['The portrait acts as a *frame*', 'to introduce the character'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_002 "Text: Plot and Narrative Structure".',
                  misconception: 'Students often treat "plot" as a mere list of "what happens" and "structure" as synonymous with "paragraphs" or "stanzas".' }
          ],
            remediations: { 'students-often-treat-plot-as': { steps: ['If a student cannot distinguish plot from structure: (1) Give them a 3-sentence story: "She died.', 'She lived." Ask: "Is this a plot?', 'Why/why not?" (2) Show the same events in chronological order vs the poem\'s order.', 'Ask: "What changes in how you feel?" (3) Have them draw a *story map* with arrows for time jumps, labeling each jump.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and physical environment in which a literary.',
          hint: 'Review the Class 11 node on imagery (c11_hin_ar_cbse_02_008) and practice identifying.',
          misconception: 'Students often treat setting as a static list of physical details (time: evening, place: riverbank) and atmosphere as.',
          parts: [
                { id: 'a', prompt: 'What are the two main components of setting in a poem, and give one example of each from the first stanza of "ljkst Le`fr"?', answer: 'The two main components are time and place',
                  options: ['The two main components are time and place', 'characters and plot', 'the poet feels happy', 'the setting creates a tranquil mood that reflects the poet\'s tenderness'],
                  hint: 'Review the Class 11 node on imagery (c11_hin_ar_cbse_02_008) and practice identifying sensory words.',
                  misconception: 'Students often treat setting as a static list of physical details (time: evening, place: riverbank) and atmosphere as a single adjective.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If the student cannot link setting to atmosphere: 1.', 'Have them reread one stanza and underline every sensory word (sight, sound, touch, smell).', 'For each underlined word, ask: "What does this make you feel?', 'Group the feelings into 2-3 dominant moods (e.g., protection, wonder, nostalgia).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat setting as a static list of physical details (time: evening, place: riverbank) and atmosphere as.',
          parts: [
                { id: 'a', prompt: 'The poem ends with the speaker praying: "bl iFk ij] esjs dk;Z ldy gksa Hkz"V \'khr osQ&ls \'krny!" (at this very point, may my work be finished, away from the.', answer: 'The evening setting is inherently transitional',
                  options: ['The evening setting is inherently transitional', 'the poet feels happy', 'the setting creates a tranquil mood that reflects the poet\'s tenderness', 'explain how setting creates atmosphere'],
                  hint: 'Review the Class 11 node on imagery (c11_hin_ar_cbse_02_008) and practice identifying sensory words.',
                  misconception: 'Students often treat setting as a static list of physical details (time: evening, place: riverbank) and atmosphere as a single adjective.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['If the student cannot link setting to atmosphere: 1.', 'Have them reread one stanza and underline every sensory word (sight, sound, touch, smell).', 'For each underlined word, ask: "What does this make you feel?', 'Group the feelings into 2-3 dominant moods (e.g., protection, wonder, nostalgia).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'If unable to write evidence-based claims, review "Show vs. Tell in Character Analysis".',
          misconception: 'Students treat लज्जा as a static symbol of "Indian womanhood" rather than a dynamic character with specific textual.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the protagonist\'s name "लज्जा" and how does the poet use it ironically in the opening stanza?', answer: '"लज्जा" literally means "shame" or "modesty/shyness"',
                  options: ['"लज्जा" literally means "shame" or "modesty/shyness"', 'her name means beauty'],
                  hint: 'If unable to write evidence-based claims, review "Show vs. Tell in Character Analysis" from.',
                  misconception: 'Students treat लज्जा as a static symbol of "Indian womanhood" rather than a dynamic character with specific textual turning points.' }
          ],
            remediations: { 'students-treat-as-a-static': { steps: ['Re-read the poem *only* for लज्जा\'s verbs (highlight every action verb: सकुचाई, सुनी, उठी, चली, मिलाती).', 'Create a 3-column table: Stanza | Verb/Action | What it reveals.', 'Rewrite one PEEL paragraph using *only* verb evidence.', 'Re-attempt Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters in a poem involves examining how.',
          hint: 'Review "indirect characterisation in poetry" from c11_hin_ar_cbse_02_005 — specifically.',
          misconception: 'Students often treat the daughter and mother as *flat symbols* (daughter = innocence, mother = suffering) rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of supporting characters in a poem involves examining how secondary',
                  options: ['Character analysis of supporting characters in a poem involves examining how secondary', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot in a narrative poem refers to the sequence of events arranged by the poet to convey', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Review "indirect characterisation in poetry" from c11_hin_ar_cbse_02_005 — specifically how.',
                  misconception: 'Students often treat the daughter and mother as *flat symbols* (daughter = innocence, mother = suffering) rather than *reconstructed.' }
          ],
            remediations: { 'students-often-treat-the-daughter': { steps: ['Re-read stanza 1-2 aloud, circling every sensory verb/noun tied to the daughter (e.g., "ककककक", "ककककक", "ककककक").', 'List them in two columns: \'Sound\' and \'Movement\'.', 'For each, ask: "What does this *specific* detail reveal that \'she was playful\' does not?" 4.', 'Repeat for mother in stanza 3 using "ककककक", "कककककक".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_02_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, revisit Class 11 node c11_hin_ar_cbse_01_006 (Theme: Primary Theme and Message).',
          misconception: 'Students often think the primary theme is simply "the poet misses his mother" or "death is sad." They treat the poem.',
          parts: [
                { id: 'a', prompt: 'Apply the \'identify–evidence–universalise\' method to the final stanza of "ljkst Le`fr" and write a two-sentence answer stating the poem\'s message.', answer: 'Step 1: Identify the concluding stance',
                  options: ['Step 1: Identify the concluding stance', 'the poet misses his mother', 'death is sad', 'the primary theme is simply "the poet misses his mother" or "death is sad'],
                  hint: 'If stuck, revisit Class 11 node c11_hin_ar_cbse_01_006 (Theme: Primary Theme and Message) and.',
                  misconception: 'Students often think the primary theme is simply "the poet misses his mother" or "death is sad." They treat the poem as a biographical.' }
          ],
            remediations: { 'the-primary-theme-is-simply': { steps: ['If a student cannot distinguish theme from subject, take them back to the poem\'s first and last stanzas.', 'Ask: "What changes between these two moments?" Guide them to note the shift from passive suffering ("ns[kk fookg vkewy.', 'Then have them list three concrete images that mark this shift.', 'Finally, co-construct a theme statement: "The poem argues that ______." Repeat with a different poem from Class 11.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
