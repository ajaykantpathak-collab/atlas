import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch08_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch08_p2',
    title: 'mek\'kadj tks\'kh · Part 2/3',
    subtitle: 'The village finally spoke — in its own voice',
    classLevel: 12, subject: 'hin_ar', topic: 'mek\'kadj tks\'kh · Part 2/3',
    chapters: ['c12_hin_ar_ch08'],
    nodeIds: ['c12_hin_ar_cbse_08_007', 'c12_hin_ar_cbse_08_008', 'c12_hin_ar_cbse_08_009', 'c12_hin_ar_cbse_08_010', 'c12_hin_ar_cbse_08_011', 'c12_hin_ar_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-language poetry reader', intro: 'A freedom fighter from Araria refused to translate the village for the city. The dialect is the poem\'s argument.', goal: 'Read Renu\'s poem through lok-bhasha politics, body-as-knowing and post-Quit India longing.' },
    discovery: {
        question: 'Premchand wrote about villages in standard Hindi; Renu wrote from inside the village in its own folk speech. Why is the difference more than style?',
        options: ['Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature', 'Renu couldn\'t write proper Hindi', 'Dialect is just local colour', 'No real difference'],
        answer: 'Epistemic resistance — letting the village speak in its own tongue refuses the outsider-reformer\'s gaze and declares whose language counts as literature',
        hook: 'Renu\'s philosophy erased the body-mind split — mud on knees IS knowing the world. A Quit India prisoner writing children\'s free play isn\'t just nostalgic: that village is the autonomous world he fought for, reclaimed in folk speech.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, supporting ideas in a literary work that complement and enrich the primary theme, often revealing deeper social, emotional, or philosophical layers through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hear a poem in lok-bhasha: weigh dialect as political choice, read bodily play as a way of knowing, and connect a freedom fighter\'s childhood to the freedom he couldn\'t finish.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re listening to your grandmother sing a lullaby — you hear the surface melody (primary theme: mother\'s love), but underneath you notice references.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea that runs parallel to the primary theme, adding', outcome: 'A secondary theme is a supporting idea that runs parallel to the primary theme, adding depth and.' },
                { text: 'sub-plots', outcome: 'Not quite — Students often confuse "secondary theme" with "minor detail" — they list isolated images (chulha.', reveals: 'students-often-confuse-secondary-theme' },
                { text: 'minor characters', outcome: 'Not quite — Students often confuse "secondary theme" with "minor detail" — they list isolated images (chulha.', reveals: 'students-often-confuse-secondary-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are sitting in a Class 12 exam hall, the same wooden desk, the same ticking clock, the same knot in your stomach before the paper begins.',
            decisions: [{ prompt: '**REMEMBER**: Define "imagery" (बिंब) and "metaphor" (रूपक) in your own words, and give one example of each from the poem *without quoting.', options: [
                { text: '**Correct answer**: Imagery = sensory language creating mental pictures (e.g., visual:', outcome: '**Correct answer**: Imagery = sensory language creating mental pictures (e.g., visual: "pk¡n.' },
                { text: 'like a tree', outcome: 'Not quite — **Misconception**: "Imagery is just \'description of nature\' and metaphor is just \'a fancy.', reveals: 'misconception-imagery-is-just-description' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are watching children flying kites on a terrace — their laughter rings free, but you notice the terrace has no railing and the string cuts their.',
            decisions: [{ prompt: 'Define verbal irony and situational irony in your own words, giving one example from everyday life for each.', options: [
                { text: 'Verbal irony occurs when a speaker says the opposite of what they mean (e.g., saying', outcome: 'Verbal irony occurs when a speaker says the opposite of what they mean (e.g., saying "Great job!".' },
                { text: 'situational irony', outcome: 'Not quite — Students routinely confuse *symbolism* with *imagery* — they think any vivid description (e.g.', reveals: 'students-routinely-confuse-symbolism-with' },
                { text: 'the kite flew high', outcome: 'Not quite — Students routinely confuse *symbolism* with *imagery* — they think any vivid description (e.g.', reveals: 'students-routinely-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the poem and stumble upon "यकसू" or "फगुनाहट" – words not in your everyday vocabulary.',
            decisions: [{ prompt: 'What is the primary strategy for determining the meaning of an unfamiliar word in a poem when a dictionary is not available?', options: [
                { text: 'The primary strategy is to analyze the context: the surrounding lines, the imagery, the', outcome: 'The primary strategy is to analyze the context: the surrounding lines, the imagery, the tone, and.' },
                { text: 'guess randomly', outcome: 'Not quite — Students often think that vocabulary in context means memorizing dictionary definitions.', reveals: 'vocabulary-in-context-means-memorizing' },
                { text: 'skip the word', outcome: 'Not quite — Students often think that vocabulary in context means memorizing dictionary definitions.', reveals: 'vocabulary-in-context-means-memorizing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading a poem where the poet seamlessly blends Hindi, Urdu, and village dialect to paint a vivid picture of rural life.',
            decisions: [{ prompt: 'What is meant by \'feys&tqys iz;ksx\' (mixed usage) of Hindi, Urdu, and folk language in the context of this poem?', options: [
                { text: 'Mixed usage refers to the deliberate blending of words and grammatical forms from Hindi', outcome: 'Mixed usage refers to the deliberate blending of words and grammatical forms from Hindi.' },
                { text: '\'language usage\' only means identifying difficult words', outcome: 'Not quite — Students often think that \'language usage\' only means identifying difficult words.', reveals: 'language-usage-only-means-identifying' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend selected for a national poetry fest wants to strip the dialect words from her village poems — \'real Hindi shouldn\'t smell of fields.\' The poems\' best lines are built from exactly those folk words and her grandmother\'s sayings.',
            decisions: [{ prompt: 'What does Renu\'s poem with the vine refrain say to her plan?', options: [
                { text: 'Keep the dialect — the poem builds from village scenes to the claim that script clings to language and language to life like a vine to a tree; cutting the folk idiom severs the very root the refrain keeps reaffirming.', outcome: 'The refrain isn\'t decoration: each stanza\'s memory ends by clinging back to the soil, so her \'impure\' words are the structural backbone of what makes the poems live.' },
                { text: 'Support the polish — standard literary Hindi is the tree; dialect is a creeper that needs pruning to grow upward.', outcome: 'The poem reverses that hierarchy — the vine survives because it clings; dialect isn\'t a parasite on standard language but the living connection that keeps the whole organism fed.', reveals: 'standard-above-dialect' },
                { text: 'Suggest writing two versions: a dialect draft for home and a cleaned-up one for the fest.', outcome: 'The poem\'s fourth stanza universalises the personal — the folk voice is the argument, not a first draft to be translated away; the split treats rootedness as a private habit to hide in public.', reveals: 'dialect-is-private-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear regional speech as literature\'s politics — and read a child\'s muddy play as reclaimed freedom.',
            decisions: [{ prompt: 'What comes next? mek\'kadj tks\'kh · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — mek\'kadj tks\'kh · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, supporting ideas in a literary work that.',
          hint: 'If stuck, revisit Class 11 "Theme: Secondary Themes" nodes (especially.',
          misconception: 'Students often confuse "secondary theme" with "minor detail" — they list isolated images (chulha, roti, folk songs).',
          parts: [
                { id: 'a', prompt: 'In Phani Kumar\'s poem, the primary theme is maternal love and childhood innocence.', answer: 'The secondary theme is the invisibility of women\'s domestic labor',
                  options: ['The secondary theme is the invisibility of women\'s domestic labor', 'mother\'s hard work', 'secondary theme', 'minor detail'],
                  hint: 'If stuck, revisit Class 11 "Theme: Secondary Themes" nodes (especially c11_hin_ar_cbse_01_007 and.',
                  misconception: 'Students often confuse "secondary theme" with "minor detail" — they list isolated images (chulha, roti, folk songs) as separate themes.' }
          ],
            remediations: { 'students-often-confuse-secondary-theme': { steps: ['If a student cannot distinguish secondary themes from details: (1) Give them a 3-column table: Column A = textual.', '(2) Have them group Column C entries into 2-3 clusters — each cluster is a secondary theme.', '(3) Re-read the poem asking: "Which stanzas develop which cluster?" This moves them from listing to pattern-recognition.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "secondary theme" with "minor detail" — they list isolated images (chulha, roti, folk songs).',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "The secondary theme of poverty in the poem is shown only through the description of \'gbZ pk¡n\' (dry roti) and \'ueZ ned\' (salty.', answer: 'The claim is insufficient',
                  options: ['The claim is insufficient', 'secondary theme', 'minor detail'],
                  hint: 'If stuck, revisit Class 11 "Theme: Secondary Themes" nodes (especially c11_hin_ar_cbse_01_007 and.',
                  misconception: 'Students often confuse "secondary theme" with "minor detail" — they list isolated images (chulha, roti, folk songs) as separate themes.' }
          ],
            remediations: { 'students-often-confuse-secondary-theme': { steps: ['If a student cannot distinguish secondary themes from details: (1) Give them a 3-column table: Column A = textual.', '(2) Have them group Column C entries into 2-3 clusters — each cluster is a secondary theme.', '(3) Re-read the poem asking: "Which stanzas develop which cluster?" This moves them from listing to pattern-recognition.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_008', difficulty: 'standard',
          question: 'Imagery (बिंब/प्रतिबिंब) is the use of vivid, sensory language that appeals.',
          hint: 'If stuck on tenor/vehicle/ground, review **c11_hin_ar_cbse_08_008** Worked Example 2 (the.',
          misconception: '**Misconception**: "Imagery is just \'description of nature\' and metaphor is just \'a fancy comparison.\'" **Why students.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND**: The poem uses the metaphor "HkkbZ osQ ck¡èkrh pedrh jk[kh" (withered tree of fear in heart\'s courtyard).', answer: '**Correct answer**: A courtyard tree is (a) **rooted**',
                  options: ['**Correct answer**: A courtyard tree is (a) **rooted**', 'trees are scary', 'trees are big'],
                  hint: 'If stuck on tenor/vehicle/ground, review **c11_hin_ar_cbse_08_008** Worked Example 2 (the.',
                  misconception: '**Misconception**: "Imagery is just \'description of nature\' and metaphor is just \'a fancy comparison.\'" **Why students make this error**.' }
          ],
            remediations: { 'misconception-imagery-is-just-description': { steps: ['**Revisit Class 11 node c11_hin_ar_cbse_08_008** (Literary Devices: Imagery and Metaphor) — specifically the section.', '**Do a "sense-hunt"**: Take the poem photocopy.', 'Use 5 highlighters (one per sense).', 'If visual > 70%, you are missing tactile/olfactory/auditory — that\'s the gap.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or situations.',
          hint: 'If stuck, revisit c12_hin_ar_cbse_08_008 (Imagery and Metaphor) for image identification.',
          misconception: 'Students routinely confuse *symbolism* with *imagery* — they think any vivid description (e.g., "the kite flew high").',
          parts: [
                { id: 'a', prompt: 'The kite (पतंग) appears repeatedly in the poem. Identify whether it functions as a conventional symbol or a contextual symbol here, and explain what abstract.', answer: 'The kite is a *contextual symbol*',
                  options: ['The kite is a *contextual symbol*', 'conventional symbol of freedom', 'the kite flew high', 'any vivid description (e'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_08_008 (Imagery and Metaphor) for image identification practice.',
                  misconception: 'Students routinely confuse *symbolism* with *imagery* — they think any vivid description (e.g., "the kite flew high") is a symbol.' },
                { id: 'b', prompt: 'Compare the irony in the depiction of "बच्चों का खेल" (children\'s play) with the symbolism of "चमगादड़" (bats).', answer: 'The irony lies in calling the children\'s hazardous activities "खेल" (play)',
                  options: ['The irony lies in calling the children\'s hazardous activities "खेल" (play)', 'the kite flew high', 'any vivid description (e'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_08_008 (Imagery and Metaphor) for image identification practice.',
                  misconception: 'Students routinely confuse *symbolism* with *imagery* — they think any vivid description (e.g., "the kite flew high") is a symbol.' }
          ],
            remediations: { 'students-routinely-confuse-symbolism-with': { steps: ['If a student cannot distinguish imagery from symbolism: (1) Have them list 5 concrete images from the poem (kite.', '(2) For each, ask: "Does the poem *explicitly* or *implicitly* assign this object a meaning beyond itself?', 'Quote the line." (3) If no such line exists, it is imagery only.', 'For irony confusion: (1) Give them the template: "Expectation: ___ | Reality: ___ | Device: ___".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the meaning.',
          hint: 'If stuck, review the "Context Clues" strategy from Class 11 (c11_hin_ar_cbse_08_010) and.',
          misconception: 'Students often think that vocabulary in context means memorizing dictionary definitions of difficult words listed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context refers to the skill of determining the meaning of unfamiliar words',
                  options: ['Vocabulary in Context refers to the skill of determining the meaning of unfamiliar words', '"Before You Read: Context and Background" for Chapter 8 provides the essential', 'Plot and Narrative Structure in a narrative poem refers to the sequence of events,', 'Setting and Atmosphere refers to the time, place, physical environment, and'],
                  hint: 'If stuck, review the "Context Clues" strategy from Class 11 (c11_hin_ar_cbse_08_010) and practice.',
                  misconception: 'Students often think that vocabulary in context means memorizing dictionary definitions of difficult words listed at the end of the.' }
          ],
            remediations: { 'vocabulary-in-context-means-memorizing': { steps: ['If a student cannot move beyond dictionary definitions, guide them through a "context clue hunt": (1) Select a puzzling.', '(2) Have them read the entire stanza aloud.', '(3) Ask: "What is happening in this scene?', 'What nouns and verbs surround the word?" (4) Have them list all clues (e.g., for "यकसू": children, lane, laughter.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the study of how grammatical.',
          hint: 'Review Class 11 Hindi grammar node c11_hin_ar_cbse_08_011 for samasa and verb forms, and.',
          misconception: 'Students often think that \'language usage\' only means identifying difficult words.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Grammar: Language Usage in the Text refers to the study of how grammatical structures,',
                  options: ['Grammar: Language Usage in the Text refers to the study of how grammatical structures,', '"Before You Read: Context and Background" for Chapter 8 provides the essential', 'Plot and Narrative Structure in a narrative poem refers to the sequence of events,', 'Setting and Atmosphere refers to the time, place, physical environment, and'],
                  hint: 'Review Class 11 Hindi grammar node c11_hin_ar_cbse_08_011 for samasa and verb forms, and the.',
                  misconception: 'Students often think that \'language usage\' only means identifying difficult words.' }
          ],
            remediations: { 'language-usage-only-means-identifying': { steps: ['If a student cannot distinguish language layers, have them take three highlighters and mark every word in one stanza.', 'Then discuss why the poet chose each.', 'Next, have them rewrite the stanza in pure standard Hindi and compare the effect.', 'Finally, ask them to find one compound word and break it down using the samasa rules from Class 11.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_08_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, revisit c12_hin_ar_cbse_08_008 (Imagery) and c12_hin_ar_cbse_08_009 (Symbolism).',
          misconception: 'छात्र अक्सर समझते हैं कि "निष्कर्षात्मक प्रश्न" का उत्तर अपनी कल्पना से देना होता है, जबकि सही यह है कि निष्कर्ष *पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Literal comprehension questions require answers directly stated in the text (explicit',
                  options: ['Literal comprehension questions require answers directly stated in the text (explicit', '"Before You Read: Context and Background" for Chapter 8 provides the essential', 'Plot and Narrative Structure in a narrative poem refers to the sequence of events,', 'Setting and Atmosphere refers to the time, place, physical environment, and'],
                  hint: 'If stuck, revisit c12_hin_ar_cbse_08_008 (Imagery) and c12_hin_ar_cbse_08_009 (Symbolism).',
                  misconception: 'छात्र अक्सर समझते हैं कि "निष्कर्षात्मक प्रश्न" का उत्तर अपनी कल्पना से देना होता है, जबकि सही यह है कि निष्कर्ष *पाठ के साक्ष्यों से ही*.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता के किसी एक स्टैंज़ा को तीन बार पढ़ने को कहें: पहली बार केवल शाब्दिक अर्थ के लिए, दूसरी बार बिंबों.', 'फिर उसे एक T-चार्ट बनाने को कहें: बाएँ कॉलम में "पाठ में लिखा है" (साक्ष्य), दाएँ में "इसका निहित अर्थ" (निष्कर्ष)। हर.', 'अभ्यास के लिए c11_hin_ar_cbse_08_012 (कक्षा 11 का समान नोड) से 5 प्रश्न लें और इसी T-चार्ट विधि से हल करवाएँ। 4.', 'पुनः निदान: वही 6 डायग्नोस्टिक प्रश्न दोहराएँ; यदि अब भी 4/6 से कम सही हों, तो c12_hin_ar_cbse_08_008 (इमेजरी) और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
