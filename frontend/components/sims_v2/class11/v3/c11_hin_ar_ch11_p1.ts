import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch11_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch11_p1',
    title: 'èkeZohj Hkkjrh · Part 1/3',
    subtitle: 'Walk through a remembered home that slowly relocates inside the speaker.',
    classLevel: 11, subject: 'hin_ar', topic: 'èkeZohj Hkkjrh · Part 1/3',
    chapters: ['c11_hin_ar_ch11'],
    nodeIds: ['c11_hin_ar_cbse_11_001', 'c11_hin_ar_cbse_11_002', 'c11_hin_ar_cbse_11_003', 'c11_hin_ar_cbse_11_004', 'c11_hin_ar_cbse_11_005', 'c11_hin_ar_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an emigrant reconstructing a childhood home from memory', intro: 'A poet of the masses looks back at a mud-walled house — and finds the building was never the point.', goal: 'Analyse the poem\'s refrain-anchored structure and its movement from place to person to identity.' },
    discovery: {
        question: 'Bachchan\'s \'घर की याद\' keeps returning to the same refrain — is the repetition just decoration?',
        options: ['No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker', 'Yes — it\'s a leftover from oral tradition', 'Yes — poets repeat lines to fill stanzas', 'No — the refrain changes meaning each time, so it\'s three different lines'],
        answer: 'No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker',
        hook: 'The poem moves house → people → self: first walls and courtyards, then a father\'s voice and a mother\'s cooking, then the realization the home now lives inside the speaker.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a preparatory stage where students gather essential information about the poet, the literary period, the historical milieu, and the central thematic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split the poem into its three phases — physical house, human presence, internal landscape — and test what the circular ending gains.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are handed a letter written in a language you partially understand; you would first check the sender\'s name, the date, and the occasion to guess.',
            decisions: [{ prompt: 'Who is the poet of "?kj dh ;kn" and what is his most famous early work that brought him instant fame?', options: [
                { text: 'The poet is Harivansh Rai Bachchan (1913–2003)', outcome: 'The poet is Harivansh Rai Bachchan (1913–2003). His most famous early work is "Madhushala" (1935).' },
                { text: 'context', outcome: 'Not quite — Students often believe "context" means memorizing dates (birth, death, publication year) and.', reveals: 'context-means-memorizing-dates-birth' },
                { text: 'Nirala or Mahadevi Verma', outcome: 'Not quite — Students often believe "context" means memorizing dates (birth, death, publication year) and.', reveals: 'context-means-memorizing-dates-birth' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine listening to a grandmother\'s story where she repeats a chorus after every few lines — that chorus isn\'t decoration; it\'s the heartbeat holding the.',
            decisions: [{ prompt: 'What is the primary structural device that organizes the narrative progression in "Ghar ki Yaad," and how frequently does it appear in the.', options: [
                { text: 'The primary structural device is the refrain', outcome: 'The primary structural device is the refrain — the repeated couplet "ikuh fxj jgk gS / ?kj u"kj esa.' },
                { text: 'rhyme scheme', outcome: 'Not quite — Students believe "plot" only exists in stories with events (he did this, then that happened) and.', reveals: 'plot-only-exists-in-stories' },
                { text: 'metaphor', outcome: 'Not quite — Students believe "plot" only exists in stories with events (he did this, then that happened) and.', reveals: 'plot-only-exists-in-stories' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking into your grandmother\'s old house after ten years — the smell of damp walls, the creak of the floorboards, the way sunlight falls on the same.',
            decisions: [{ prompt: 'What is the primary physical setting of the poem "?kj dh ;kn" and what time period does it suggest?', options: [
                { text: 'The primary setting is an old ancestral house (described through cracked walls, leaky', outcome: 'The primary setting is an old ancestral house (described through cracked walls, leaky roof, broken.' },
                { text: 'a house', outcome: 'Not quite — Students often treat setting as a static backdrop — just listing physical details like "old house.', reveals: 'students-often-treat-setting-as' },
                { text: 'village', outcome: 'Not quite — Students often treat setting as a static backdrop — just listing physical details like "old house.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you receive a voice note from a childhood friend who moved abroad years ago — they describe their current apartment, then suddenly start recalling the.',
            decisions: [{ prompt: 'In the poem "Ghar Ki Yaad," who is the protagonist, and how is this established in the very first stanza?', options: [
                { text: 'The protagonist is the poetic persona (the speaker/narrator) who uses first-person', outcome: 'The protagonist is the poetic persona (the speaker/narrator) who uses first-person pronouns like.' },
                { text: 'the poet Hokhhu Prasad Vajpayee', outcome: 'Not quite — Students conflate the *poet* (Hokhhu Prasad Vajpayee, a historical figure who participated in the.', reveals: 'students-conflate-the-poet-hokhhu' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are looking at an old family photograph where only one person is in sharp focus — the father — but the blurred figures around him (his wife, his.',
            decisions: [{ prompt: 'In "?kj dh ;kn", which three supporting characters (or personified entities) appear most frequently across the stanzas, and what single.', options: [
                { text: 'The three most frequent supporting presences are: (1) the wife/mother, identified by', outcome: 'The three most frequent supporting presences are: (1) the wife/mother, identified by \'ek¡\' (mother).' },
                { text: 'supporting character analysis', outcome: 'Not quite — Students believe "supporting character analysis" means writing a mini-biography for each character.', reveals: 'supporting-character-analysis-means-writing' },
                { text: 'the father, the poet, or abstract concepts like \'memory\'', outcome: 'Not quite — Students believe "supporting character analysis" means writing a mini-biography for each character.', reveals: 'supporting-character-analysis-means-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a poetry recital rehearsal, a classmate prepares Bachchan\'s \'Ghar ki Yaad\' and announces: \'It\'s a descriptive poem — the poet lists the walls, rooms and courtyard of his old house. I\'ll read it flat, like an estate agent\'s inventory.\'',
            decisions: [{ prompt: 'What should the performance convey instead?', options: [
                { text: 'Rebuild the reading around the arc: the poem moves from physical description to emotional memory — the father\'s voice, the mother\'s silence, the joint family — to philosophical reflection; the \'events\' are mental acts: remembering, comparing, realising. The refrain isn\'t decoration but the anchor pulling wandering memory back to the core truth: home is not a building but a living presence within the speaker.', outcome: 'The recital shifts register: the house outside becomes the house inside — a consciousness-driven journey, not an inventory.' },
                { text: 'Keep the flat reading — it IS a list of rooms and walls; honesty over drama.', outcome: 'Description is the entry, not the destination: the poem\'s structure carries the speaker from architecture to identity — flat reading strands it at the door.', reveals: 'poem-is-house-inventory' },
                { text: 'Add dramatic events instead — act out family scenes so the audience \'sees\' a plot.', outcome: 'Staging external scenes invents what the poem deliberately does internally: the structure is a memory-journey anchored by refrain, not a family drama.', reveals: 'invent-events-for-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'The house that \'stood silent\' in stanza one ends \'living in me\' — the same line, transformed by twelve stanzas of remembering.',
            decisions: [{ prompt: 'What comes next? èkeZohj Hkkjrh · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — èkeZohj Hkkjrh · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a preparatory stage where students.',
          hint: 'Review Class 10 Hindi textbook chapter "Hindi Sahitya ka Itihas" focusing on the.',
          misconception: 'Students often believe "context" means memorizing dates (birth, death, publication year) and listing awards.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of "?kj dh ;kn" and what is his most famous early work that brought him instant fame?', answer: 'The poet is Harivansh Rai Bachchan (1913–2003)',
                  options: ['The poet is Harivansh Rai Bachchan (1913–2003)', 'context', 'Nirala or Mahadevi Verma'],
                  hint: 'Review Class 10 Hindi textbook chapter "Hindi Sahitya ka Itihas" focusing on the Chhayavaad period.',
                  misconception: 'Students often believe "context" means memorizing dates (birth, death, publication year) and listing awards.' }
          ],
            remediations: { 'context-means-memorizing-dates-birth': { steps: ['If a student reduces context to a fact-list: (1) Ask them to close the textbook and tell you *one thing* about.', '(2) Have them read the first two stanzas aloud and circle every word that signals "village/rural life" (e.g., aangan.', '(3) Connect each circled word to a biographical fact (father\'s transferable job, mother\'s domesticity).', '(4) Ask: "If the poet had been a city-born industrialist\'s son, which three images would vanish?" This forces active.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_002', difficulty: 'standard',
          question: 'Narrative structure in poetry refers to the organized sequence of stanzas.',
          hint: 'Review the concept of "lyric narrative" — poems that tell a story through emotional.',
          misconception: 'Students believe "plot" only exists in stories with events (he did this, then that happened) and therefore poems *lack*.',
          parts: [
                { id: 'a', prompt: 'What is the primary structural device that organizes the narrative progression in "Ghar ki Yaad," and how frequently does it appear in the poem?', answer: 'The primary structural device is the refrain',
                  options: ['The primary structural device is the refrain', 'rhyme scheme', 'metaphor', 'Ghar ki Yaad'],
                  hint: 'Review the concept of "lyric narrative" — poems that tell a story through emotional progression.',
                  misconception: 'Students believe "plot" only exists in stories with events (he did this, then that happened) and therefore poems *lack* narrative.' },
                { id: 'b', prompt: 'Map the poem\'s narrative progression by identifying the dominant focus of stanzas 1-4, 5-8, and 9-12. What shifts occur between these three phases?', answer: 'Phase 1 (stanzas 1-4): Physical house',
                  options: ['Phase 1 (stanzas 1-4): Physical house', 'Ghar ki Yaad', 'just descriptions'],
                  hint: 'Review the concept of "lyric narrative" — poems that tell a story through emotional progression.',
                  misconception: 'Students believe "plot" only exists in stories with events (he did this, then that happened) and therefore poems *lack* narrative.' },
                { id: 'c', prompt: 'Compare the narrative function of the father\'s voice (stanzas 5-6) and the speaker\'s own voice (stanzas 9-10).', answer: 'The father\'s voice represents *transmitted memory*',
                  options: ['The father\'s voice represents *transmitted memory*', 'characters', 'Ghar ki Yaad', 'just descriptions'],
                  hint: 'Review the concept of "lyric narrative" — poems that tell a story through emotional progression.',
                  misconception: 'Students believe "plot" only exists in stories with events (he did this, then that happened) and therefore poems *lack* narrative.' }
          ],
            remediations: { 'plot-only-exists-in-stories': { steps: ['Have the student read only the first and last stanza aloud side-by-side. Ask: "Same words — different feeling? Why?"', 'Give them 12 index cards, one per stanza. Ask them to sort into 3 piles of 4 by "what this stanza is *doing*."', 'Label piles together: "Outside → Inside → Beyond."', 'Trace the refrain cards — notice they sit at the *end* of piles 1 and 2, but *inside* pile 3\'s final card.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "plot" only exists in stories with events (he did this, then that happened) and therefore poems *lack*.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the poem\'s circular structure (ending with the refrain that opened it) strengthens or weakens its narrative impact.', answer: 'It strengthens impact',
                  options: ['It strengthens impact', 'repetitive', 'boring', 'Ghar ki Yaad'],
                  hint: 'Review the concept of "lyric narrative" — poems that tell a story through emotional progression.',
                  misconception: 'Students believe "plot" only exists in stories with events (he did this, then that happened) and therefore poems *lack* narrative.' }
          ],
            remediations: { 'plot-only-exists-in-stories': { steps: ['Have the student read only the first and last stanza aloud side-by-side. Ask: "Same words — different feeling? Why?"', 'Give them 12 index cards, one per stanza. Ask them to sort into 3 piles of 4 by "what this stanza is *doing*."', 'Label piles together: "Outside → Inside → Beyond."', 'Trace the refrain cards — notice they sit at the *end* of piles 1 and 2, but *inside* pile 3\'s final card.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_003', difficulty: 'standard',
          question: 'Setting refers to the physical, temporal, and social backdrop against which the.',
          hint: 'If stuck, review the poem\'s summary and context from node c11_hin_ar_cbse_11_001.',
          misconception: 'Students often treat setting as a static backdrop — just listing physical details like "old house, cracked walls, leaky.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting refers to the physical, temporal, and social backdrop against which the poem\'s',
                  options: ['Setting refers to the physical, temporal, and social backdrop against which the poem\'s', '"Before You Read: Context and Background" is a preparatory stage where students gather', 'Narrative structure in poetry refers to the organized sequence of stanzas, images, and', 'Character analysis of the protagonist in poetry involves examining the poetic persona'],
                  hint: 'If stuck, review the poem\'s summary and context from node c11_hin_ar_cbse_11_001, focusing on the.',
                  misconception: 'Students often treat setting as a static backdrop — just listing physical details like "old house, cracked walls, leaky roof" — and.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student pick ONE physical detail from the poem (e.g., "izk.k eu f?kjrk" — the leaking roof).', 'Ask: "What specific memory does the poet attach to this leak?" (Answer: monsoon nights, father\'s worry, family.', 'Ask: "If the roof weren\'t leaking, would that memory exist?" Guide them to see the leak CREATES the memory.', 'Repeat with two more details until they can articulate: "The setting detail and the emotion are the same thing in this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in poetry involves examining the poetic.',
          hint: 'Review the "author vs. persona" distinction using a simple comparison: read a diary entry.',
          misconception: 'Students conflate the *poet* (Hokhhu Prasad Vajpayee, a historical figure who participated in the freedom struggle and.',
          parts: [
                { id: 'a', prompt: 'Apply the PEEL structure to write a 4-sentence analysis of how the protagonist\'s description of the childhood home ("pkj HkkbZ pkj cfgusa") reveals their.', answer: '**Point:** The protagonist\'s enumeration of "four walls, four doors" reduces the',
                  options: ['**Point:** The protagonist\'s enumeration of "four walls, four doors" reduces the', 'the house had four walls and four doors'],
                  hint: 'Review the "author vs. persona" distinction using a simple comparison: read a diary entry vs.',
                  misconception: 'Students conflate the *poet* (Hokhhu Prasad Vajpayee, a historical figure who participated in the freedom struggle and edited newspapers).' },
                { id: 'b', prompt: 'Analyze the shift in the protagonist\'s self-portrayal between the middle stanzas (addressing the father) and the closing stanzas (declaring "eSa e"ks esa gw¡.', answer: 'In the middle stanzas, the protagonist defines themselves relationally',
                  options: ['In the middle stanzas, the protagonist defines themselves relationally', 'the speaker misses parents then feels confident'],
                  hint: 'Review the "author vs. persona" distinction using a simple comparison: read a diary entry vs.',
                  misconception: 'Students conflate the *poet* (Hokhhu Prasad Vajpayee, a historical figure who participated in the freedom struggle and edited newspapers).' }
          ],
            remediations: { 'students-conflate-the-poet-hokhhu': { steps: ['Have the student underline every first-person pronoun (main, mere, mujh, mujhe) in the poem — count them (there are.', 'Ask: "Does the poem tell us the speaker\'s name, caste, profession, or city? No. So who is \'main\'?"', 'Show two contrasting readings of stanza 3: (A) "The poet\'s father was bad" vs (B) "The speaker *chooses* to remember.', 'Assign a 3-sentence rewrite: "In this poem, the protagonist is not the poet but a voice that..." This forces the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_005', difficulty: 'standard',
          question: 'Supporting characters are secondary figures in a literary work who interact.',
          hint: 'Review c11_hin_ar_cbse_11_004\'s worked example on the father\'s "dual voice" (the.',
          misconception: 'Students believe "supporting character analysis" means writing a mini-biography for each character (age, personality.',
          parts: [
                { id: 'a', prompt: 'Compare the portrayal of the house in the opening refrain ("?kj u”kj esa frj jgk gS") with its portrayal in the closing stanzas ("foaQrq ;g cl cM+k cl gS / blh.', answer: 'Opening: the house is a concrete, sensory place',
                  options: ['Opening: the house is a concrete, sensory place', 'supporting character analysis'],
                  hint: 'Review c11_hin_ar_cbse_11_004\'s worked example on the father\'s "dual voice" (the remembering \'I\'.',
                  misconception: 'Students believe "supporting character analysis" means writing a mini-biography for each character (age, personality, likes/dislikes) as.' }
          ],
            remediations: { 'supporting-character-analysis-means-writing': { steps: ['Ask the student to list every noun/pronoun referring to someone other than "eSa" (I) in the poem.', 'For each, ask: "Does this figure speak? Act? Or only appear in the speaker\'s memory/imagination?"', 'Show how the text *constructs* the wife through three specific images (Stanza 2: "cfgu vkbZ cki osQ ?kj"; Stanza 3.', 'Practice writing one analytical sentence per figure using the template: "The poem constructs [figure].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, review the concept of "refrain as structural argument" from.',
          misconception: 'Students conflate *theme* with *subject* or *plot summary*, writing "The poem is about missing home" instead of "The.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is its central, unifying idea or insight about human',
                  options: ['The primary theme of a literary work is its central, unifying idea or insight about human', '"Before You Read: Context and Background" is a preparatory stage where students gather', 'Narrative structure in poetry refers to the organized sequence of stanzas, images, and', 'Setting refers to the physical, temporal, and social backdrop against which the poem\'s'],
                  hint: 'If stuck, review the concept of "refrain as structural argument" from c11_hin_ar_cbse_11_002 (Plot.',
                  misconception: 'Students conflate *theme* with *subject* or *plot summary*, writing "The poem is about missing home" instead of "The poem explores how.' }
          ],
            remediations: { 'students-conflate-theme-with-subject': { steps: ['**Re-anchor with the refrain**: Have the student write each variant of the refrain on a separate card and arrange them.', '**Map the "Four Walls"**: Draw a rectangle labeled "pkj HkkbZ pkj cfgusa".', 'Inside, place sticky notes for each memory (father\'s silence, mother\'s letter, childhood games).', 'Outside, write what *erodes* them (time, distance, death).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
