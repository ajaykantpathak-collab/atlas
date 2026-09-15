import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch02_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch02_p2',
    title: 'vejdkar · Part 2/3',
    subtitle: 'Watch a quiet cook defeat his master without ever raising his voice.',
    classLevel: 11, subject: 'hin_ar', topic: 'vejdkar · Part 2/3',
    chapters: ['c11_hin_ar_ch02'],
    nodeIds: ['c11_hin_ar_cbse_02_007', 'c11_hin_ar_cbse_02_008', 'c11_hin_ar_cbse_02_009', 'c11_hin_ar_cbse_02_010', 'c11_hin_ar_cbse_02_011', 'c11_hin_ar_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener piecing together a servant\'s hidden past', intro: 'Puris puff on the stove while a nickname — \'उल्हनिहु\' — opens a trapdoor into a whole colonial history.', goal: 'Analyse the story\'s flashback structure and read its silent ending as resistance.' },
    discovery: {
        question: 'The cook Phenku ends the story serving puris in silence — the narrator learned nothing, so the ending resolves nothing?',
        options: ['Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history', 'Right — an open ending is a narrative failure', 'Right — the colonial anecdote deserved a dramatic payoff', 'Wrong — he actually resigns at the end'],
        answer: 'Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history',
        hook: 'The story hides its oldest event two-thirds of the way in — a flashback that only lands because we met the dignified cook first.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are subsidiary central ideas that run parallel to the primary theme in a literary work, exploring related social, psychological, or philosophical issues to add depth, complexity, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Reorder the five scenes by narrative logic rather than chronology, and argue why the colonial-officer flashback lands where it does.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are reading a newspaper report about a 12-year-old girl working in a middle-class household, making flower garlands for temples, while the family\'s.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subsidiary central idea that supports and enriches the primary', outcome: 'A secondary theme is a subsidiary central idea that supports and enriches the primary theme.' },
                { text: 'flowers', outcome: 'Not quite — Students often believe any recurring topic (e.g., "flowers," "poverty," "temple") is automatically.', reveals: 'any-recurring-topic-e' },
                { text: 'poverty', outcome: 'Not quite — Students often believe any recurring topic (e.g., "flowers," "poverty," "temple") is automatically.', reveals: 'any-recurring-topic-e' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are describing your grandmother\'s hands to a friend.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one original example for each (not from the textbook).', options: [
                { text: '**Correct Answer:** Imagery: Descriptive language appealing to senses (e.g., "The monsoon', outcome: '**Correct Answer:** Imagery: Descriptive language appealing to senses (e.g., "The monsoon air.' },
                { text: 'Her smile was like sunshine', outcome: 'Not quite — **Misconception:** "Imagery is just \'descriptive writing\' or \'visual description,\' and metaphor.', reveals: 'misconception-imagery-is-just-descriptive' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re watching a master carpenter build exquisite furniture for wealthy clients while sitting on a broken stool himself - that\'s the living irony.',
            decisions: [{ prompt: 'Define situational irony and give one example from "फेंकू उल्हनिहु" where Phenku\'s words or situation create this effect.', options: [
                { text: 'Situational irony occurs when the outcome is opposite to what is expected or appropriate', outcome: 'Situational irony occurs when the outcome is opposite to what is expected or appropriate.' },
                { text: 'irony is when someone lies', outcome: 'Not quite — Students confuse Phenku\'s verbal irony with simplicity or ignorance, reading "रखे की रखी ही बड़ी.', reveals: 'students-confuse-phenku-s-verbal' },
                { text: 'रखे की रखी ही बड़ी फाँक होती है', outcome: 'Not quite — Students confuse Phenku\'s verbal irony with simplicity or ignorance, reading "रखे की रखी ही बड़ी.', reveals: 'students-confuse-phenku-s-verbal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading the conversation between Fe;k¡ ulh#íhu and the teacher in the story.',
            decisions: [{ prompt: 'What is the basic rule for changing a direct speech sentence in present tense to indirect speech when the reporting verb is in past tense?', options: [
                { text: 'The tense of the reported speech shifts one step back (e.g., present simple becomes past', outcome: 'The tense of the reported speech shifts one step back (e.g., present simple becomes past simple).' },
                { text: 'tense doesn\'t change', outcome: 'Not quite — Students often think that in Hindi indirect speech, the tense of the reported speech never changes.', reveals: 'in-hindi-indirect-speech' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are reading a social media post about a street vendor in your city: the post explicitly states their name, age, and what they sell (literal), but.',
            decisions: [{ prompt: 'Define literal comprehension and give one example of a literal question from the chapter "Fe;k¡ ulh#íhu".', options: [
                { text: 'Literal comprehension is the ability to identify information explicitly stated in the text', outcome: 'Literal comprehension is the ability to identify information explicitly stated in the text.' },
                { text: 'She is poor and struggles', outcome: 'Not quite — Students treat inferential questions as "guess what the author meant" and either: (a) quote.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a regional-literature seminar you present Renu\'s anchalik katha and Yashpal\'s \'Phenku\' story. A classmate objects: \'These dialect words and folk songs are local colour — decoration. And the Phenku story is simple: master questions cook, cook answers, done in order.\'',
            decisions: [{ prompt: 'What\'s the better analysis?', options: [
                { text: 'Show the machinery: in anchalik fiction the dialect, folk songs and agrarian rituals aren\'t colour — they carry the meaning and the tension between tradition and modernity. And Yashpal\'s structure is the argument: the colonial-officer anecdote arrives as a flashback two-thirds in, so we meet Phenku\'s present dignity BEFORE learning his past — the quiet \'simple\' cook becomes the moral centre while the talkative master shrinks.', outcome: 'Both corrections land: form is meaning — dialect is the story\'s engine, and narrative sequencing is how the servant outwits the master without raising his voice.' },
                { text: 'Agree dialect is decoration — translate it into standard Hindi so the \'real\' story shows clearly.', outcome: 'Removing the regional register removes the story: anchalik katha locates meaning in the specific soil, speech and ritual of the region.', reveals: 'dialect-is-decoration' },
                { text: 'Retell Phenku chronologically — put the officer anecdote first so events run in order.', outcome: 'Chronological retelling destroys the irony: the flashback\'s late placement is what lets present dignity precede past humiliation.', reveals: 'reorder-flashback-chronologically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'A servant who never raises his voice outwits everyone — the structure does the same to the reader.',
            decisions: [{ prompt: 'What comes next? vejdkar · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — vejdkar · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_007', difficulty: 'standard',
          question: 'Secondary themes are subsidiary central ideas that run parallel to the primary.',
          hint: 'If stuck, review the primary theme statement from node 006 and the character sketches.',
          misconception: 'Students often believe any recurring topic (e.g., "flowers," "poverty," "temple") is automatically a secondary theme.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are subsidiary central ideas that run parallel to the primary theme in a',
                  options: ['Secondary themes are subsidiary central ideas that run parallel to the primary theme in a', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot and Narrative Structure refers to the organized sequence of events (plot) and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck, review the primary theme statement from node 006 and the character sketches of Phulwari.',
                  misconception: 'Students often believe any recurring topic (e.g., "flowers," "poverty," "temple") is automatically a secondary theme.' }
          ],
            remediations: { 'any-recurring-topic-e': { steps: ['Ask the student to write "Flowers are..." and complete the sentence with what the story proves about flowers.', 'Have them do the same for "Education is...", "Religion is...", "Childhood is...".', 'Discard completions that are mere plot summaries; keep only those that express a judgment or insight.', 'Show how each surviving statement connects to the primary theme of exploitation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Re-read the chapter with a highlighter: **Yellow** for visual, **Blue** for.',
          misconception: '**Misconception:** "Imagery is just \'descriptive writing\' or \'visual description,\' and metaphor is just \'a fancy.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery is the use of vivid, sensory language that appeals to the five senses (sight,',
                  options: ['Imagery is the use of vivid, sensory language that appeals to the five senses (sight,', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot and Narrative Structure refers to the organized sequence of events (plot) and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Re-read the chapter with a highlighter: **Yellow** for visual, **Blue** for tactile/thermal.',
                  misconception: '**Misconception:** "Imagery is just \'descriptive writing\' or \'visual description,\' and metaphor is just \'a fancy comparison.\'" **Why.' }
          ],
            remediations: { 'misconception-imagery-is-just-descriptive': { steps: ['**Step 1 (Sensory Audit):** Give the student a 5-column table (Sight, Sound, Smell, Touch, Taste).', 'Assign: "Scan pages 22–28.', 'Put *every* sensory phrase in the correct column.', 'Find at least 3 per column." **Step 2 (Metaphor Surgery):** For the compound word on page 27, have them physically cut.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_009', difficulty: 'standard',
          question: 'Irony in "फेंकू उल्हनिहु" is the contrast between appearance and reality where.',
          hint: 'If stuck, review c11_hin_ar_cbse_02_004 (Character Analysis: Protagonist) for Phenku\'s.',
          misconception: 'Students confuse Phenku\'s verbal irony with simplicity or ignorance, reading "रखे की रखी ही बड़ी फाँक होती है" as naive.',
          parts: [
                { id: 'a', prompt: 'The narrator says: "फेंकू उल्हनिहु को टोकरी बनाने का बेढ़ा नहीं, कोई नई बारीक कला आ गई हो जैसे।" Explain why this observation contains dramatic irony.', answer: 'Dramatic irony exists',
                  options: ['Dramatic irony exists', 'narrator doesn\'t know Phenku is poor', 'रखे की रखी ही बड़ी फाँक होती है'],
                  hint: 'If stuck, review c11_hin_ar_cbse_02_004 (Character Analysis: Protagonist) for Phenku\'s material.',
                  misconception: 'Students confuse Phenku\'s verbal irony with simplicity or ignorance, reading "रखे की रखी ही बड़ी फाँक होती है" as naive folk wisdom rather.' },
                { id: 'b', prompt: 'Trace the symbol of the दउरा (large basket) through three scenes: (a) when Phenku makes it for the woodcutter, (b) when the narrator observes Phenku\'s own.', answer: 'when Phenku makes it for the woodcutter, (',
                  options: ['when Phenku makes it for the woodcutter, (', 'रखे की रखी ही बड़ी फाँक होती है'],
                  hint: 'If stuck, review c11_hin_ar_cbse_02_004 (Character Analysis: Protagonist) for Phenku\'s material.',
                  misconception: 'Students confuse Phenku\'s verbal irony with simplicity or ignorance, reading "रखे की रखी ही बड़ी फाँक होती है" as naive folk wisdom rather.' }
          ],
            remediations: { 'students-confuse-phenku-s-verbal': { steps: ['Have student re-read only the three dialogue scenes aloud, marking every instance where Phenku\'s words contradict his.', 'Create a two-column table: "What Phenku says/does" vs "What is actually true" - this makes situational/verbal irony.', 'Draw the basket three times - once whole (for woodcutter), once broken (Phenku\'s), once empty (ending) - labeling each.', 'Practice writing one analytical sentence using the template: "Verma uses [device] in [scene] to show that [theme].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse Phenku\'s verbal irony with simplicity or ignorance, reading "रखे की रखी ही बड़ी फाँक होती है" as naive.',
          parts: [
                { id: 'a', prompt: 'Evaluate this interpretation: "The story uses irony to make us pity Phenku, and symbolism to make us admire his craft." Defend or refute with textual evidence.', answer: 'Refute',
                  options: ['Refute', 'रखे की रखी ही बड़ी फाँक होती है'],
                  hint: 'If stuck, review c11_hin_ar_cbse_02_004 (Character Analysis: Protagonist) for Phenku\'s material.',
                  misconception: 'Students confuse Phenku\'s verbal irony with simplicity or ignorance, reading "रखे की रखी ही बड़ी फाँक होती है" as naive folk wisdom rather.' }
          ],
            remediations: { 'students-confuse-phenku-s-verbal': { steps: ['Have student re-read only the three dialogue scenes aloud, marking every instance where Phenku\'s words contradict his.', 'Create a two-column table: "What Phenku says/does" vs "What is actually true" - this makes situational/verbal irony.', 'Draw the basket three times - once whole (for woodcutter), once broken (Phenku\'s), once empty (ending) - labeling each.', 'Practice writing one analytical sentence using the template: "Verma uses [device] in [scene] to show that [theme].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the precise meaning.',
          hint: 'Re-read the \'Before You Read\' (c11_hin_ar_cbse_02_001) section on Nirmal Verma\'s focus.',
          misconception: 'Students treat the \'kCn&Nfo\' glossary as the *final authority* on word meaning.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context is the skill of determining the precise meaning, connotation, and',
                  options: ['Vocabulary in Context is the skill of determining the precise meaning, connotation, and', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot and Narrative Structure refers to the organized sequence of events (plot) and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Re-read the \'Before You Read\' (c11_hin_ar_cbse_02_001) section on Nirmal Verma\'s focus on urban.',
                  misconception: 'Students treat the \'kCn&Nfo\' glossary as the *final authority* on word meaning.' }
          ],
            remediations: { 'students-treat-the-kcn-nfo': { steps: ['Take the glossary word \'ukuckbZ\'.', 'Find its *every* occurrence in the story (pages 22, 24, 25).', 'For each, note: Speaker → Listener → Triggering Event → Emotional Charge.', 'Make a 3-column table: Dictionary Meaning | Contextual Meaning | Evidence Phrase.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the study of specific grammatical.',
          hint: 'Review Class 10 Hindi grammar chapters on "okD; foU;kl" (sentence structure) and "vuqowQy.',
          misconception: 'Students often think that in Hindi indirect speech, the tense of the reported speech never changes if the reporting.',
          parts: [
                { id: 'a', prompt: 'In the sentence "fe;k¡ ulh#íhu us iapg”kkjh vank”k ls flj fgyk;k", identify the perception verb and explain how its meaning differs from simple "ns[kuk".', answer: 'The perception verb is "flj fgyk;k" (looked angrily)',
                  options: ['The perception verb is "flj fgyk;k" (looked angrily)', 'ns[kuk'],
                  hint: 'Review Class 10 Hindi grammar chapters on "okD; foU;kl" (sentence structure) and "vuqowQy izlax".',
                  misconception: 'Students often think that in Hindi indirect speech, the tense of the reported speech never changes if the reporting verb is in past tense.' }
          ],
            remediations: { 'in-hindi-indirect-speech': { steps: ['If a student struggles, first isolate the reporting verb and reported speech in a simple sentence.', 'Practice tense backshifting with a table: present->past, past->past perfect, future->future in past.', 'For perception verbs, create a chart: verb + adverb = specific perception (e.g., flj ns[kuk = glare, lko ns[kuk = gaze).', 'For word order, take a standard SOV sentence and rearrange to OSV, VSO, etc., discussing emphasis shift each time.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_012', difficulty: 'standard',
          question: 'Literal comprehension involves understanding information directly stated in the.',
          hint: 'Review the chapter summary (node 002) and the protagonist\'s character profile (node 004).',
          misconception: 'Students treat inferential questions as "guess what the author meant" and either: (a) quote a single unrelated line.',
          parts: [
                { id: 'a', prompt: 'Read this hypothetical excerpt based on the chapter\'s style: "Her fingers flew over the bamboo strips, weaving a pattern her grandmother taught her, humming.', answer: 'This is an **inferential** question',
                  options: ['This is an **inferential** question', 'grandmother taught her'],
                  hint: 'Review the chapter summary (node 002) and the protagonist\'s character profile (node 004) to refresh.',
                  misconception: 'Students treat inferential questions as "guess what the author meant" and either: (a) quote a single unrelated line as "proof", or (b).' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['**Model the bridge**: Take a simple inferential question ("Why did the narrator feel shame?").', 'Write a 3-column table on board: **Clue 1** (Text: "vk¡[kksa osQ oaQps ge ij isQj fn,A") → **Clue 2** (Text: "esjk D;k.', '**Inference**: He realized his narrow definition of literacy failed against her lived wisdom.', '**Guided practice**: Give a familiar text (e.g., a Class 10 Hindi chapter).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
