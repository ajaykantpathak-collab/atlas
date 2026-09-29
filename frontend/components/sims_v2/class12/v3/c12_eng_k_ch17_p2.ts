import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch17_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch17_p2: SimDef = {
    id: 'v3_c12_eng_k_ch17_p2',
    title: 'Why the Novel Matters (Non-fiction) · Part 2/3',
    subtitle: 'The saint gets the soul, the scientist the body — the novelist gets the whole hog',
    classLevel: 12, subject: 'eng_k', topic: 'Why the Novel Matters (Non-fiction) · Part 2/3',
    chapters: ['c12_eng_k_ch17'],
    nodeIds: ['c12_eng_k_cbse_17_007', 'c12_eng_k_cbse_17_008', 'c12_eng_k_cbse_17_009', 'c12_eng_k_cbse_17_010', 'c12_eng_k_cbse_17_011', 'c12_eng_k_cbse_17_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary manifesto reader', intro: 'A miner\'s son with a teacher\'s ambition inside him declares war on everything that chops a human into parts.', goal: 'Grasp Lawrence\'s claim that the novel alone serves the \'whole man alive\' and why aliveness outranks abstraction.' },
    discovery: {
        question: 'Saints feed the soul, scientists probe the body, philosophers sharpen the mind — yet Lawrence crowns the novelist above all of them. On what grounds?',
        options: ['Whole beats part — each specialist masters one fragment of a person; only the novel engages the \'whole man alive,\' body, senses and contradictions together', 'Novels are more popular', 'Novelists are better writers', 'Saints are useless'],
        answer: 'Whole beats part — each specialist masters one fragment of a person; only the novel engages the \'whole man alive,\' body, senses and contradictions together',
        hook: '\'Man alive\' isn\'t a casual phrase — it\'s Lawrence\'s term for the integrated, sensing, contradictory organism, opposed to the \'dead man in life\' who runs on fixed ideas. And books themselves are \'tremulations on the ether\': dead vibrations until a living reader quivers into response.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Why the Novel Matters\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_17_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Fight the fragmenters: pit the novel against soul, mind and mechanism, decode what \'tremulations on the ether\' means for every book you\'ll ever read, and test Lawrence\'s war on absolutes.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Why the Novel Matters\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'List three secondary themes discussed in D.H. Lawrence\'s essay "Why the Novel Matters" apart from the primary theme of the novel as the.', options: [
                { text: 'Correct answer: Any three of: (1) The unity of body and mind (rejecting dualism), (2) The', outcome: 'Correct answer: Any three of: (1) The unity of body and mind (rejecting dualism), (2) The critique.' },
                { text: 'characterization', outcome: 'Not quite — Students often confuse "secondary themes" with "subplots" or "literary devices." They list things.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'secondary themes', outcome: 'Not quite — Students often confuse "secondary themes" with "subplots" or "literary devices." They list things.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Why the Novel Matters\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Identify the tenor and vehicle in the metaphor: "The years drink up the wine, and at last throw the bottle away, the body, of course, being.', options: [
                { text: '**Tenor:** the human body / physical lifespan', outcome: '**Tenor:** the human body / physical lifespan. **Vehicle:** a bottle that once held wine.' },
                { text: 'tenor = wine, vehicle = bottle', outcome: 'Not quite — Students treat Lawrence\'s metaphors as *illustrations* of ideas already stated in plain prose.', reveals: 'students-treat-lawrence-s-metaphors' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Why the Novel Matters\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example of each from everyday life (not from the textbook).', options: [
                { text: 'Correct answer: Irony', outcome: 'Correct answer: Irony — a situation where the outcome is opposite to what was expected, e.g.,.' },
                { text: 'irony is just sarcasm', outcome: 'Not quite — Students often think irony in this essay is just Lawrence being "rude" or "sarcastic" about.', reveals: 'irony-in-this-essay-is' },
                { text: 'symbolism is just a metaphor', outcome: 'Not quite — Students often think irony in this essay is just Lawrence being "rude" or "sarcastic" about.', reveals: 'irony-in-this-essay-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Why the Novel Matters\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'List three non-English expressions used in the essay and identify their language of origin.', options: [
                { text: '"Mens sana in corpore sano" (Latin), "C\'est la vie!" (French), "Nirvana" (Sanskrit)', outcome: '"Mens sana in corpore sano" (Latin), "C\'est la vie!" (French), "Nirvana" (Sanskrit).' },
                { text: 'tremulations', outcome: 'Not quite — Students treat "tremulations on the ether" as a scientific term (radio waves) and miss Lawrence\'s.', reveals: 'students-treat-tremulations-on-the' },
                { text: 'cul-de-sac', outcome: 'Not quite — Students treat "tremulations on the ether" as a scientific term (radio waves) and miss Lawrence\'s.', reveals: 'students-treat-tremulations-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Why the Novel Matters\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Define an intransitive verb and give one example from the essay "Why the Novel Matters" (do not use the examples already explained in the.', options: [
                { text: 'An intransitive verb is a verb that does not take a direct object', outcome: 'An intransitive verb is a verb that does not take a direct object; it expresses an action or state.' },
                { text: 'The grass withers', outcome: 'Not quite — **The "Post-Verb Position = Adverb" Trap**: Students see a word/phrase after a verb and.', reveals: 'the-post-verb-position-adverb' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Why the Novel Matters\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Define literal comprehension in your own words and give one example of a literal question from "Why the Novel Matters."', options: [
                { text: 'Literal comprehension is the ability to identify information directly stated in the text', outcome: 'Literal comprehension is the ability to identify information directly stated in the text without.' },
                { text: 'Why does Lawrence think philosophers deny the body?', outcome: 'Not quite — Students believe inferential questions invite personal opinion ("I think Lawrence means...") and.', reveals: 'inferential-questions-invite-personal-opinion' },
                { text: 'I think Lawrence means', outcome: 'Not quite — Students believe inferential questions invite personal opinion ("I think Lawrence means...") and.', reveals: 'inferential-questions-invite-personal-opinion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A health app tells a student \'we know you better than you know yourself — your sleep score, glucose and screen time say who you are.\'',
            decisions: [{ prompt: 'What would Lawrence\'s \'man alive\' answer?', options: [
                { text: 'The metrics are parts — useful shadows of him, but the whole living, contradictory, changing person is greater than any dashboard; use the data without being reduced to it.', outcome: 'Lawrence\'s \'I am greater than my soul\' logic applies: the finger, the gland, the score are fragments of \'man alive\', never the sum.' },
                { text: 'True — the numbers are the person, finally measured.', outcome: 'That\'s exactly the reductionism Lawrence attacks: a part claiming to be the whole produces a \'man dead in life\'.', reveals: 'parts-equal-whole' },
                { text: 'Delete it — since no data can capture him, all metrics are worthless.', outcome: 'Anti-reductionism isn\'t anti-data; parts are still informative about the parts.', reveals: 'anti-reduction-is-anti-data' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend the novel as a philosophy of aliveness — not entertainment. Lawrence turns literary preference into an argument about what a human being is.',
            decisions: [{ prompt: 'What comes next? Why the Novel Matters (Non-fiction) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Why the Novel Matters (Non-fiction) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_007', difficulty: 'standard',
          question: 'Secondary themes in \'Why the Novel Matters\' — the supporting ideas and motifs.',
          hint: 'If stuck, re-read the essay\'s "Stop and Think" questions — they directly signal secondary.',
          misconception: 'Students often confuse "secondary themes" with "subplots" or "literary devices." They list things like "imagery.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words what Lawrence means by "man alive" and how it differs from the philosopher\'s "pure spirit" or the scientist\'s "body under microscope."', answer: 'Correct answer: "Man alive" is the integrated, living whole person',
                  options: ['Correct answer: "Man alive" is the integrated, living whole person', 'man alive', 'consciousness', 'secondary themes'],
                  hint: 'If stuck, re-read the essay\'s "Stop and Think" questions — they directly signal secondary themes.',
                  misconception: 'Students often confuse "secondary themes" with "subplots" or "literary devices." They list things like "imagery of hands" or "the analogy.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student lists devices instead of themes: (1) Ask: "What *idea* is Lawrence arguing for when he describes his hand.', '(4) Label each category — those are the secondary themes.', 'Revisit node c12_eng_k_cbse_17_006 (Primary Theme) to see how the main theme is stated as an idea, not a device.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_008', difficulty: 'standard',
          question: 'Imagery in \'Why the Novel Matters\' — the vivid, sensory language that creates.',
          hint: 'Review c11_eng_h_cbse_01_008 Worked Example 1 (tenor/vehicle mapping) and the imagery.',
          misconception: 'Students treat Lawrence\'s metaphors as *illustrations* of ideas already stated in plain prose, rather than as the.',
          parts: [
                { id: 'a', prompt: 'Identify the tenor and vehicle in the metaphor: "The years drink up the wine, and at last throw the bottle away, the body, of course, being the bottle."', answer: '**Tenor:** the human body / physical lifespan',
                  options: ['**Tenor:** the human body / physical lifespan', 'tenor = wine, vehicle = bottle'],
                  hint: 'Review c11_eng_h_cbse_01_008 Worked Example 1 (tenor/vehicle mapping) and the imagery.',
                  misconception: 'Students treat Lawrence\'s metaphors as *illustrations* of ideas already stated in plain prose, rather than as the *primary mode of his.' }
          ],
            remediations: { 'students-treat-lawrence-s-metaphors': { steps: ['Have the student read paragraphs 2-3 aloud, circling every verb attached to "my hand" (flickers, meets, learns, knows.', 'Ask: "If you remove these verbs, what happens to Lawrence\'s claim that the hand \'is just as much me\'?" 3.', 'Guide them to rewrite the claim using *only* those verbs as evidence.', 'Re-diagnose with Diagnostic Question 2 — the student must now cite specific verbs, not general statements.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat Lawrence\'s metaphors as *illustrations* of ideas already stated in plain prose, rather than as the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of Lawrence\'s metaphor "Like a pianoforte with half the notes mute" to describe modern humanity.', answer: 'The piano metaphor is more effective for the *closing* argument',
                  options: ['The piano metaphor is more effective for the *closing* argument', 'and become', 'A wrong answer that prefers the bottle because', 'easier to understand'],
                  hint: 'Review c11_eng_h_cbse_01_008 Worked Example 1 (tenor/vehicle mapping) and the imagery.',
                  misconception: 'Students treat Lawrence\'s metaphors as *illustrations* of ideas already stated in plain prose, rather than as the *primary mode of his.' }
          ],
            remediations: { 'students-treat-lawrence-s-metaphors': { steps: ['Have the student read paragraphs 2-3 aloud, circling every verb attached to "my hand" (flickers, meets, learns, knows.', 'Ask: "If you remove these verbs, what happens to Lawrence\'s claim that the hand \'is just as much me\'?" 3.', 'Guide them to rewrite the claim using *only* those verbs as evidence.', 'Re-diagnose with Diagnostic Question 2 — the student must now cite specific verbs, not general statements.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Why the Novel Matters\' — where opposite things are both.',
          hint: 'If stuck, return to c12_eng_k_cbse_17_008 (metaphor vs. symbolism) and.',
          misconception: 'Students often think irony in this essay is just Lawrence being "rude" or "sarcastic" about parsons/philosophers.',
          parts: [
                { id: 'a', prompt: 'Define irony and symbolism in your own words, giving one example of each from everyday life (not from the textbook).', answer: 'Correct answer: Irony',
                  options: ['Correct answer: Irony', 'irony is just sarcasm', 'symbolism is just a metaphor', 'sarcastic'],
                  hint: 'If stuck, return to c12_eng_k_cbse_17_008 (metaphor vs. symbolism) and c10_engl_cbse_01_007 (irony.',
                  misconception: 'Students often think irony in this essay is just Lawrence being "rude" or "sarcastic" about parsons/philosophers, missing that each ironic.' },
                { id: 'b', prompt: 'Identify ONE symbol in the essay (other than the hand) and explain: (a) its literal meaning in the text, (b) the abstract idea it represents, and (c) how.', answer: 'Correct answer example',
                  options: ['Correct answer example', 'grass means nature', 'sarcastic', 'hidden meanings'],
                  hint: 'If stuck, return to c12_eng_k_cbse_17_008 (metaphor vs. symbolism) and c10_engl_cbse_01_007 (irony.',
                  misconception: 'Students often think irony in this essay is just Lawrence being "rude" or "sarcastic" about parsons/philosophers, missing that each ironic.' },
                { id: 'c', prompt: 'Compare the function of irony and symbolism in the essay: How does Lawrence use irony to DECONSTRUCT opposing views (parsons, philosophers, scientists) and.', answer: 'Correct answer: Irony deconstructs by exposing contradictions',
                  options: ['Correct answer: Irony deconstructs by exposing contradictions', 'sarcastic', 'hidden meanings', 'man alive'],
                  hint: 'If stuck, return to c12_eng_k_cbse_17_008 (metaphor vs. symbolism) and c10_engl_cbse_01_007 (irony.',
                  misconception: 'Students often think irony in this essay is just Lawrence being "rude" or "sarcastic" about parsons/philosophers, missing that each ironic.' }
          ],
            remediations: { 'irony-in-this-essay-is': { steps: ['If the student cannot distinguish irony from sarcasm or symbols from metaphors: (1) Have them list every "opponent".', 'REALITY (what Lawrence shows) — this trains irony detection.', '(2) Give them the five recurring concrete images (hand, grass/flower, chameleon, pepper-pot, lamp-post) and ask: "What.', 'What ABSTRACT IDEA does it CARRY?" — this trains symbol tracking.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Why the Novel Matters\' — the words and phrases you must know.',
          hint: 'Review the "Vocabulary in Context" nodes from Class 11 Hornbill (e.g.',
          misconception: 'Students treat "tremulations on the ether" as a scientific term (radio waves) and miss Lawrence\'s philosophical.',
          parts: [
                { id: 'a', prompt: 'Using context clues from the paragraph beginning "Let us learn from the novel..." (p.', answer: 'Locate sentence: "A particular direction ends in a cul-de-sac."',
                  options: ['Locate sentence: "A particular direction ends in a cul-de-sac."', 'a curved road', 'I don\'t want to grow in one direction'],
                  hint: 'Review the "Vocabulary in Context" nodes from Class 11 Hornbill (e.g., c11_eng_h_cbse_01_010) for.',
                  misconception: 'Students treat "tremulations on the ether" as a scientific term (radio waves) and miss Lawrence\'s philosophical redefinition: he contrasts.' }
          ],
            remediations: { 'students-treat-tremulations-on-the': { steps: ['Have student re-read the two "tremulation" paragraphs (pp.', '167-168) and annotate: Source?', 'Re-read the "integrity" paragraph (p.', '170) and list what Lawrence says integrity is NOT (fixed idea, ego, pattern, corset).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_011', difficulty: 'standard',
          question: 'Language and style in \'Why the Novel Matters\' — how the writer chose words.',
          hint: 'Review Class 11 node c11_eng_h_cbse_01_011 exercises on "Identify the verb and its.',
          misconception: '**The "Post-Verb Position = Adverb" Trap**: Students see a word/phrase after a verb and automatically label it.',
          parts: [
                { id: 'a', prompt: 'Define an intransitive verb and give one example from the essay "Why the Novel Matters" (do not use the examples already explained in the textbook\'s Language.', answer: 'An intransitive verb is a verb that does not take a direct object',
                  options: ['An intransitive verb is a verb that does not take a direct object', 'The grass withers'],
                  hint: 'Review Class 11 node c11_eng_h_cbse_01_011 exercises on "Identify the verb and its complement".',
                  misconception: '**The "Post-Verb Position = Adverb" Trap**: Students see a word/phrase after a verb and automatically label it an adverb/adverbial.' },
                { id: 'b', prompt: 'Analyze the sentence "The Word becomes more and more boring" from the essay. Identify the verb class, the complement, and the complement\'s category.', answer: '**Step 1:** Identify the verb: "becomes"',
                  options: ['**Step 1:** Identify the verb: "becomes"', 'becomes'],
                  hint: 'Review Class 11 node c11_eng_h_cbse_01_011 exercises on "Identify the verb and its complement".',
                  misconception: '**The "Post-Verb Position = Adverb" Trap**: Students see a word/phrase after a verb and automatically label it an adverb/adverbial.' }
          ],
            remediations: { 'the-post-verb-position-adverb': { steps: ['** Have the student list the 3 most common linking verbs (be, become, seem) and memorize: *These NEVER take adverbial.', '** Give 5 sentences from the essay (mix of intransitive + PP, linking + NP, linking + AdjP).', '** Student explains aloud for ONE sentence: "I know it\'s linking because ___; the complement is ___ because ___." **', '** Re-attempt DIAGNOSTIC_QUESTION_5. If correct, move on; if not, repeat with new sentences from c12_eng_k_cbse_17_012.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Why the Novel Matters\' — questions answered straight.',
          hint: 'If stuck, re-read the essay with a highlighter: pink for literal facts (names.',
          misconception: 'Students believe inferential questions invite personal opinion ("I think Lawrence means...") and that any plausible.',
          parts: [
                { id: 'a', prompt: 'Read the lines: "If you\'re a parson, you talk about souls in heaven.', answer: 'Literal: What does the parson talk about?',
                  options: ['Literal: What does the parson talk about?', 'Lawrence hates religion', 'I think Lawrence means', 'Why should I look at my hand...?'],
                  hint: 'If stuck, re-read the essay with a highlighter: pink for literal facts (names, definitions, direct.',
                  misconception: 'Students believe inferential questions invite personal opinion ("I think Lawrence means...") and that any plausible guess earns marks.' },
                { id: 'b', prompt: 'Two students answer: "Why does Lawrence compare the philosopher to a rabbit making pills?" Student A: "Because philosophers think thinking is the only thing.', answer: 'Student B is stronger',
                  options: ['Student B is stronger', 'I think Lawrence means', 'Why should I look at my hand...?', 'inferential questions invite personal opinion ("I think Lawrence means'],
                  hint: 'If stuck, re-read the essay with a highlighter: pink for literal facts (names, definitions, direct.',
                  misconception: 'Students believe inferential questions invite personal opinion ("I think Lawrence means...") and that any plausible guess earns marks.' }
          ],
            remediations: { 'inferential-questions-invite-personal-opinion': { steps: ['Have the student annotate a 100-word passage: underline explicit facts (literal), circle implied meanings.', 'Practice the "Evidence Sandwich": For any inferential claim, write [Textual Evidence] → [Inference] → [Explanation.', 'Revisit c12_eng_k_cbse_17_010 (Vocabulary) and c12_eng_k_cbse_17_011 (Grammar) to strengthen close-reading stamina.', 'Re-diagnose using Diagnostic Questions 3 & 4 with a fresh excerpt.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
