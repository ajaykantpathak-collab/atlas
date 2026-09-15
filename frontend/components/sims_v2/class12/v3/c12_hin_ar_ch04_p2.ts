import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch04_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch04_p2',
    title: '\'ke\'ksj cgknqj flag · Part 2/3',
    subtitle: 'He wrote in the people\'s tongue so the people could read it',
    classLevel: 12, subject: 'hin_ar', topic: '\'ke\'ksj cgknqj flag · Part 2/3',
    chapters: ['c12_hin_ar_ch04'],
    nodeIds: ['c12_hin_ar_cbse_04_007', 'c12_hin_ar_cbse_04_008', 'c12_hin_ar_cbse_04_009', 'c12_hin_ar_cbse_04_010', 'c12_hin_ar_cbse_04_011', 'c12_hin_ar_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Progressive poetry reader', intro: 'A poet-journalist who wrote for the ignored decides the poem itself must speak like them.', goal: 'Read Nagarjun through the Progressive movement — Khari Boli as politics, the street performer as systemic critique.' },
    discovery: {
        question: 'Nagarjun chooses Khari Boli — the people\'s spoken tongue — over Sanskritised literary Hindi, for poems about peasants and street performers. What does the language choice itself declare?',
        options: ['Democratic intent — the poem must be readable by the very people it depicts; medium is the politics', 'Khari Boli is easier to write', 'Sanskrit was banned', 'Nothing — language is neutral'],
        answer: 'Democratic intent — the poem must be readable by the very people it depicts; medium is the politics',
        hook: 'Progressive poets like Nagarjun — journalist, trilingual, champion of the ignored — prove the micro reveals the macro: a street performer\'s day exposes the whole machinery of exploitation. Journalism trained the eye; poetry carried the indictment.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are subsidiary ideas or motifs that run parallel to the primary theme, enriching the text by adding layers of meaning, presenting contrasting perspectives, or deepening the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk with the street performer: read rustic speech as deliberate politics, trace how one \'small\' life opens onto the entire structure that exploits it, and test why context turns description into critique.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are reading a newspaper editorial about a farmer\'s protest — the main headline says "Demand for MSP" (primary theme), but as you read, you notice.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literary analysis, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a recurring idea that supports, contrasts, or complicates the', outcome: 'A secondary theme is a recurring idea that supports, contrasts, or complicates the primary theme.' },
                { text: 'less important topics', outcome: 'Not quite — Students treat "secondary theme" as "any other topic mentioned in the text" (e.g., listing "moon,".', reveals: 'students-treat-secondary-theme-as' },
                { text: 'lists plot events reveals confusion between theme and narrative content', outcome: 'Not quite — Students treat "secondary theme" as "any other topic mentioned in the text" (e.g., listing "moon,".', reveals: 'students-treat-secondary-theme-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are reading a news report about child labor in a brick kiln: the facts are there, but you don\'t *feel* the heat, the dust, the weight of the.',
            decisions: [{ prompt: 'Define "imagery" (चित्रात्मकता) and "metaphor" (रूपक) in your own words, and give one example of each from the Chapter 4 poem without.', options: [
                { text: '**Correct answer:** Imagery = sensory language creating mental pictures (e.g., "भट्टी की', outcome: '**Correct answer:** Imagery = sensory language creating mental pictures (e.g., "भट्टी की आँच".' },
                { text: 'बच्चे ईंट *जैसे* हैं', outcome: 'Not quite — Students think "finding the metaphor" means spotting the *word* "रूपक" or a comparative structure.', reveals: 'finding-the-metaphor-means-spotting' },
                { text: 'finding the metaphor', outcome: 'Not quite — Students think "finding the metaphor" means spotting the *word* "रूपक" or a comparative structure.', reveals: 'finding-the-metaphor-means-spotting' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are sitting on a terrace and see a real bird flying alongside an airplane — one flaps wings with life, the other roars with engines.',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "can vikfgt" (लोहे का पक्षी) in the poem, and what is the ironic gap between this label and the.', options: [
                { text: 'The literal meaning is "a bird made of iron," referring to an airplane', outcome: 'The literal meaning is "a bird made of iron," referring to an airplane.' },
                { text: 'iron bird', outcome: 'Not quite — Students often think irony in this poem is simply "the airplane is not a real bird" — a factual.', reveals: 'irony-in-this-poem-is' },
                { text: 'airplane', outcome: 'Not quite — Students often think irony in this poem is simply "the airplane is not a real bird" — a factual.', reveals: 'irony-in-this-poem-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading a biography of a historical figure and notice the writer often says "He was awarded..." instead of "They awarded him..." — why does the.',
            decisions: [{ prompt: 'What is the primary tense used in the chapter "केसरी कुमार झा" for narrating past events, and why is it appropriate for a biography?', options: [
                { text: 'The primary tense is past perfect (पूर्ण भूतकाल) often combined with passive voice (e.g.,', outcome: 'The primary tense is past perfect (पूर्ण भूतकाल) often combined with passive voice (e.g., "नियुक्त.' },
                { text: 'simple past', outcome: 'Not quite — Students treat "grammar in the text" as a labeling exercise (e.g., "this is passive voice") and.', reveals: 'students-treat-grammar-in-the' },
                { text: 'present tense', outcome: 'Not quite — Students treat "grammar in the text" as a labeling exercise (e.g., "this is passive voice") and.', reveals: 'students-treat-grammar-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'After a funds scandal in your student council, your group\'s protest poster is all slogans — \'We will shout for change!\' A senior suggests adding a line addressing each silent member by name, and clipping the actual audit report to the bottom.',
            decisions: [{ prompt: 'What does the structure of \'देश में चाँद विकृत\' say about the senior\'s edits?', options: [
                { text: 'Keep both — the poem\'s arc runs collective declaration (\'we\') → direct accusation (\'you\') → documentary proof; slogans alone rage at the air, but naming the complacent and ending with the audit clipping converts protest into verified indictment.', outcome: 'The poem performs its argument through structural stages, finishing with a newspaper report that turns poetic charge into documented fact — the senior is rebuilding exactly that engine.' },
                { text: 'Drop the audit — raw collective emotion is more powerful than paperwork.', outcome: 'The poem deliberately ends with reportage, not refrain: the clipping is the climax that proves \'vikrit\' isn\'t exaggeration but record; without it the poster stays an unfalsifiable mood.', reveals: 'rage-beats-record' },
                { text: 'Drop the \'you\' lines — naming members turns unity into blame.', outcome: 'The poem\'s middle stanzas are precisely the turn from \'we\' to \'you\' — the interrogation of the complacent is what makes the final evidence land; skipping it leaves only self-congratulation.', reveals: 'unity-means-no-accusation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear a poem\'s language as its argument — and see how progressive literature makes the marginal the centre.',
            decisions: [{ prompt: 'What comes next? \'ke\'ksj cgknqj flag · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — \'ke\'ksj cgknqj flag · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_007', difficulty: 'standard',
          question: 'Secondary themes are subsidiary ideas or motifs that run parallel to the.',
          hint: 'If stuck, revisit node 006\'s worked example on converting "nation-building" (topic) into.',
          misconception: 'Students treat "secondary theme" as "any other topic mentioned in the text" (e.g., listing "moon," "office," "beggar,".',
          parts: [
                { id: 'a', prompt: 'Apply the concept of secondary themes to the prose passage about the pilot (आईयू/पायलट) who emergency-landed a fighter jet in 2006.', answer: 'Secondary theme: **Individual heroism within institutional neglect**',
                  options: ['Secondary theme: **Individual heroism within institutional neglect**', 'bravery is the theme', 'says "bravery is the theme" states a character trait, not a theme'],
                  hint: 'If stuck, revisit node 006\'s worked example on converting "nation-building" (topic) into.',
                  misconception: 'Students treat "secondary theme" as "any other topic mentioned in the text" (e.g., listing "moon," "office," "beggar," "pilot" as separate.' }
          ],
            remediations: { 'students-treat-secondary-theme-as': { steps: ['Have the student re-read node 006 (Primary Theme) and write the primary theme as a *complete sentence* (not a phrase).', 'Give them three textual segments (poem stanza 2, poem stanza 4, prose passage paragraph 2) and ask: "What *concern*.', 'Convert each concern into a "The text suggests that..." statement.', 'Verify each statement recurs in at least two places in the chapter. If not, it\'s a motif, not a theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "secondary theme" as "any other topic mentioned in the text" (e.g., listing "moon," "office," "beggar,".',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The secondary theme of bureaucratic apathy (कामचोरी/दफ्तरी सुस्ती) in the poem is more effectively conveyed than the secondary theme.', answer: 'The poem conveys bureaucratic apathy more effectively',
                  options: ['The poem conveys bureaucratic apathy more effectively', 'picks one without comparing *mode of conveyance* (satire vs'],
                  hint: 'If stuck, revisit node 006\'s worked example on converting "nation-building" (topic) into.',
                  misconception: 'Students treat "secondary theme" as "any other topic mentioned in the text" (e.g., listing "moon," "office," "beggar," "pilot" as separate.' }
          ],
            remediations: { 'students-treat-secondary-theme-as': { steps: ['Have the student re-read node 006 (Primary Theme) and write the primary theme as a *complete sentence* (not a phrase).', 'Give them three textual segments (poem stanza 2, poem stanza 4, prose passage paragraph 2) and ask: "What *concern*.', 'Convert each concern into a "The text suggests that..." statement.', 'Verify each statement recurs in at least two places in the chapter. If not, it\'s a motif, not a theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_008', difficulty: 'standard',
          question: 'Imagery (चित्रात्मकता) is the use of vivid, sensory language that appeals.',
          hint: 'If stuck on "what sense is this?", close your eyes and ask: "If I were there, what would.',
          misconception: 'Students think "finding the metaphor" means spotting the *word* "रूपक" or a comparative structure.',
          parts: [
                { id: 'a', prompt: 'The poem describes the kiln owner as "धुएँ का सौदागर" (merchant of smoke).', answer: '**Correct answer:** It is a metaphor',
                  options: ['**Correct answer:** It is a metaphor', 'it compares the owner to smoke', 'finding the metaphor'],
                  hint: 'If stuck on "what sense is this?", close your eyes and ask: "If I were there, what would.',
                  misconception: 'Students think "finding the metaphor" means spotting the *word* "रूपक" or a comparative structure.' },
                { id: 'b', prompt: 'Compare the metaphor "बच्चे कच्ची मिट्टी हैं" (children are raw clay) in Stanza 1 with "बच्चे पकी ईंटें बन गए" (children have become fired bricks) in Stanza 5.', answer: '**Correct answer:** The poem moves from *potentiality* (clay',
                  options: ['**Correct answer:** The poem moves from *potentiality* (clay', 'finding the metaphor'],
                  hint: 'If stuck on "what sense is this?", close your eyes and ask: "If I were there, what would.',
                  misconception: 'Students think "finding the metaphor" means spotting the *word* "रूपक" or a comparative structure.' }
          ],
            remediations: { 'finding-the-metaphor-means-spotting': { steps: ['**Revisit Class 11 Node c11_hin_ar_cbse_01_008** (or the specific Class 11 chapter where imagery/metaphor was taught).', '**Re-read the Chapter 4 poem with a 3-column table:** Column A = Line/phrase, Column B = Device (image type.', '**Write one PEEL paragraph** using your table: Point = "The poet uses tactile imagery to make exploitation physical.".', 'Explanation = connect sensation to dehumanization.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or situations.',
          hint: 'If stuck, review the Class 11 irony/symbolism node (c11_hin_ar_cbse_04_009) for.',
          misconception: 'Students often think irony in this poem is simply "the airplane is not a real bird" — a factual observation — and miss.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the phrase "can vikfgt" (लोहे का पक्षी) in the poem, and what is the ironic gap between this label and the reality of the object.', answer: 'The literal meaning is "a bird made of iron," referring to an airplane',
                  options: ['The literal meaning is "a bird made of iron," referring to an airplane', 'iron bird', 'airplane', 'the airplane is not a real bird'],
                  hint: 'If stuck, review the Class 11 irony/symbolism node (c11_hin_ar_cbse_04_009) for definitions, and.',
                  misconception: 'Students often think irony in this poem is simply "the airplane is not a real bird" — a factual observation — and miss that the irony.' },
                { id: 'b', prompt: 'In the dialogue, the child asks the iron bird: "vkidk vikfgtiu rks nq[k nsrk gksxk nsrk gS?" (Does your bird-ness give you pain?).', answer: 'The question is verbally ironic',
                  options: ['The question is verbally ironic', 'the airplane is not a real bird'],
                  hint: 'If stuck, review the Class 11 irony/symbolism node (c11_hin_ar_cbse_04_009) for definitions, and.',
                  misconception: 'Students often think irony in this poem is simply "the airplane is not a real bird" — a factual observation — and miss that the irony.' },
                { id: 'c', prompt: 'Apply the concept of symbolism: The poem describes the iron bird as having "cgqr cM+h rlohj" (very long wings) and "mlosQ gksaBksa ij ,d dlelkgV" (a pilot.', answer: 'The long wings symbolize technology\'s massive, imposed scale',
                  options: ['The long wings symbolize technology\'s massive, imposed scale', 'the airplane is not a real bird'],
                  hint: 'If stuck, review the Class 11 irony/symbolism node (c11_hin_ar_cbse_04_009) for definitions, and.',
                  misconception: 'Students often think irony in this poem is simply "the airplane is not a real bird" — a factual observation — and miss that the irony.' }
          ],
            remediations: { 'irony-in-this-poem-is': { steps: ['If the student cannot distinguish irony from mere contrast, return to the Class 11 node on irony.', 'situational irony with a simple Hindi example: "barish mein bheeGte hue kisi se puchna \'mazaa aa raha hai?\'" — the.', 'Then apply this to the poem: the child asks the airplane "do you feel cold?" knowing it cannot — that gap *is* the.', 'For symbolism, use the "nest" (घोंसला) as a concrete anchor: the real bird has one (symbol: home, continuity), the iron.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck on context-clue identification, revisit **c11_hin_ar_cbse_04_010 (Vocabulary.',
          misconception: '**Misconception:** "Vocabulary in context means finding the *one correct dictionary meaning* that fits the sentence.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context refers to the skill of determining the precise meaning,',
                  options: ['Vocabulary in Context refers to the skill of determining the precise meaning,', 'This node introduces the poet Nagarjun (नागार्जुन), his literary significance, the', 'Plot and Narrative Structure in poetry refers to the organized sequence of events,', 'Setting in poetry refers to the time, place, and social environment where the poem\'s'],
                  hint: 'If stuck on context-clue identification, revisit **c11_hin_ar_cbse_04_010 (Vocabulary in Context.',
                  misconception: '**Misconception:** "Vocabulary in context means finding the *one correct dictionary meaning* that fits the sentence." **Why students make.' }
          ],
            remediations: { 'misconception-vocabulary-in-context-means': { steps: ['**Remediation Path (3 sessions):** **Session 1 (Diagnose):** Give the student 5 sentences from Chapter 4 with target.', 'Ask: "Write the meaning *only from this sentence* — no dictionary." Mark each: ✓ if they use context clues (contrast.', '**Session 2 (Micro-skill drill):** Teach the **\'Clue-Hunt Table\'**: Column A: Target word | Column B: ±3 surrounding.', 'Practice with 10 words from the chapter.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic study of grammatical.',
          hint: 'Review Class 11 Hindi grammar node c11_hin_ar_cbse_04_011 for passive transformation.',
          misconception: 'Students treat "grammar in the text" as a labeling exercise (e.g., "this is passive voice") and stop there.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language Usage in the Text refers to the systematic study of grammatical structures,',
                  options: ['Language Usage in the Text refers to the systematic study of grammatical structures,', 'This node introduces the poet Nagarjun (नागार्जुन), his literary significance, the', 'Plot and Narrative Structure in poetry refers to the organized sequence of events,', 'Setting in poetry refers to the time, place, and social environment where the poem\'s'],
                  hint: 'Review Class 11 Hindi grammar node c11_hin_ar_cbse_04_011 for passive transformation drills and.',
                  misconception: 'Students treat "grammar in the text" as a labeling exercise (e.g., "this is passive voice") and stop there.' }
          ],
            remediations: { 'students-treat-grammar-in-the': { steps: ['Return to the chapter and highlight every verb phrase with a colored pen.', 'Sort them into a table: Tense × Voice × Subject.', 'For the top three patterns, write one sentence each: "The author uses [pattern] here to [effect]." 4.', 'Re-attempt Diagnostic Question 4 orally, explaining the *function* of subordination.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_012', difficulty: 'standard',
          question: 'Literal comprehension is the ability to extract explicitly stated facts.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_04_012 (कक्षा 11 अध्याय 4 की शाब्दिक/अनुमानित समझ) के.',
          misconception: 'छात्र समझते हैं कि \'शाब्दिक प्रश्न\' का उत्तर पाठ से शब्दशः नकल करना है और \'अनुमानित प्रश्न\' का उत्तर मनमाना अनुमान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Literal comprehension is the ability to extract explicitly stated facts, details, and',
                  options: ['Literal comprehension is the ability to extract explicitly stated facts, details, and', 'This node introduces the poet Nagarjun (नागार्जुन), his literary significance, the', 'Plot and Narrative Structure in poetry refers to the organized sequence of events,', 'Setting in poetry refers to the time, place, and social environment where the poem\'s'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_04_012 (कक्षा 11 अध्याय 4 की शाब्दिक/अनुमानित समझ) के कार्यपत्रक.',
                  misconception: 'छात्र समझते हैं कि \'शाब्दिक प्रश्न\' का उत्तर पाठ से शब्दशः नकल करना है और \'अनुमानित प्रश्न\' का उत्तर मनमाना अनुमान लगाना है। वास्तव में.' }
          ],
            remediations: { '1': { steps: ['चरण 1: छात्र को एक छोटा अनुच्छेद (5-6 पंक्तियाँ) दें और कहें: "हर वाक्य को \'तथ्य\' या \'अनुमान\' लेबल करो।" चरण 2: जहाँ वे.', 'ऊँगली रखो।" चरण 3: फिर कहें: "अब वाक्य को अपने शब्दों में लिखो बिना पाठ देखे।" — यह \'नकल\' की आदत तोड़ता है। चरण 4.', 'कौन-सा शब्द Y की ओर इशारा करता है?" — यह \'मनमाना अनुमान\' रोकता है। पुनर्निदान: c11_hin_ar_cbse_01_012 (कक्षा 11 की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
