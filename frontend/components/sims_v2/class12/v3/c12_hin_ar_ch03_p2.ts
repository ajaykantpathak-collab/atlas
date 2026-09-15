import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch03_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch03_p2',
    title: 'j?kqohj lgk; · Part 2/3',
    subtitle: 'Words as toys — and as traitors',
    classLevel: 12, subject: 'hin_ar', topic: 'j?kqohj lgk; · Part 2/3',
    chapters: ['c12_hin_ar_ch03'],
    nodeIds: ['c12_hin_ar_cbse_03_007', 'c12_hin_ar_cbse_03_008', 'c12_hin_ar_cbse_03_009', 'c12_hin_ar_cbse_03_010', 'c12_hin_ar_cbse_03_011', 'c12_hin_ar_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental poetry reader', intro: 'A post-independence generation decided poetry needed to stop singing and start thinking.', goal: 'Read the two poems through Nayi Kavita\'s break with Chhayavad — play, defamiliarisation and language\'s limits.' },
    discovery: {
        question: '\'Poetry is a house of fungus; poetry is a child\'s game.\' A generation raised on sacred verse reads this — and calls it rebellion. What\'s the real move?',
        options: ['Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped', 'An insult to poetry', 'A nursery rhyme', 'Random metaphors'],
        answer: 'Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped',
        hook: 'Nayi Kavita broke with Chhayavad\'s romantic music for intellectual rigour and colloquial language. The twin poems test language both ways — in one, words are playthings freely mixed; in the other, language stammers and fails the very experience it tries to hold. Play and failure are the same anxiety.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the subordinate ideas that run parallel to the primary theme in a literary work, enriching the text by adding layers of meaning, exploring related aspects of human experience.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Enter the experimental decade: watch words treated as toys and then as traitors, weigh whether the poem about failed speech itself succeeds, and feel where a generation broke with the old music.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are listening to a friend describe a poem they love — they don\'t just tell you the main message; they point out how the poem also talks about.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subordinate idea that supports, contrasts, or enriches the primary', outcome: 'A secondary theme is a subordinate idea that supports, contrasts, or enriches the primary theme;.' },
                { text: 'minor topics', outcome: 'Not quite — Students often think "secondary theme" means "less important theme" and therefore write.', reveals: 'secondary-theme-means-less-important' },
                { text: 'subplots', outcome: 'Not quite — Students often think "secondary theme" means "less important theme" and therefore write.', reveals: 'secondary-theme-means-less-important' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you\'re trying to explain the taste of *aam panna* to someone who\'s never had it — you\'d say "it\'s like a cool breeze on a 45°C Delhi afternoon.',
            decisions: [{ prompt: 'Define \'imagery\' (प्रतीकात्मक चित्रण) in poetry and name the five sensory types. Give one example from daily life for each type.', options: [
                { text: 'Imagery is language that appeals to the senses to create mental pictures', outcome: 'Imagery is language that appeals to the senses to create mental pictures.' },
                { text: 'Identify the figure of speech', outcome: 'Not quite — Students treat every comparison as a metaphor. In "कविता एक ममता है", they correctly spot metaphor.', reveals: 'students-treat-every-comparison-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re telling a friend "Great job!" after they spill chai all over your notes — you\'re using verbal irony to say the opposite of what you mean.',
            decisions: [{ prompt: 'In "dfork ds cgkus," the line "dfork ,d mM+ku gS fpfM+;k osQ cgkus" (Poetry is a house-building for the purpose of playing) contains what.', options: [
                { text: 'Correct answer: Situational irony', outcome: 'Correct answer: Situational irony — poetry is traditionally considered serious, elevated art (mM+ku.' },
                { text: 'verbal irony', outcome: 'Not quite — Students consistently confuse *verbal irony* (saying opposite of what you mean) with *situational.', reveals: 'students-consistently-confuse-verbal-irony' },
                { text: 'no irony, it\'s just a metaphor', outcome: 'Not quite — Students consistently confuse *verbal irony* (saying opposite of what you mean) with *situational.', reveals: 'students-consistently-confuse-verbal-irony' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading "ckr lh/h Fkh ij" and see the word **"Bksad"** (slap).',
            decisions: [{ prompt: 'What is the primary difference between a word\'s *dictionary meaning* (vk\'kq fyfi vFkZ) and its *contextual meaning* (lfgr vFkZ) in a poem?', options: [
                { text: '**Correct Answer:** Dictionary meaning is fixed, universal, and decontextualized', outcome: '**Correct Answer:** Dictionary meaning is fixed, universal, and decontextualized.' },
                { text: 'they are the same', outcome: 'Not quite — **The "Dictionary Trap":** Students believe "vocabulary in context" means *looking up the hard.', reveals: 'the-dictionary-trap-students-believe' },
                { text: 'contextual meaning is just a synonym', outcome: 'Not quite — **The "Dictionary Trap":** Students believe "vocabulary in context" means *looking up the hard.', reveals: 'the-dictionary-trap-students-believe' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading "dfork ds cgkus" aloud and notice the poem feels like a chant — each stanza begins with "dfork" followed by a defining verb.',
            decisions: [{ prompt: 'List two grammatical features prominently used in "dfork ds cgkus" that create its rhythmic, chant-like quality.', options: [
                { text: 'The two features are: (1) Anaphora', outcome: 'The two features are: (1) Anaphora — repetition of "dfork" at the start of each stanza\'s first.' },
                { text: 'rhyming words', outcome: 'Not quite — Students treat grammar analysis as mere part-of-speech tagging (e.g., "dfork is a noun, gS is.', reveals: 'students-treat-grammar-analysis-as' },
                { text: 'metaphors', outcome: 'Not quite — Students treat grammar analysis as mere part-of-speech tagging (e.g., "dfork is a noun, gS is.', reveals: 'students-treat-grammar-analysis-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are solving a board exam comprehension set and the first question asks, "कविता को \'मक्खन\' किसके लिए कहा गया है?" while the next asks, "कवि ने कविता.',
            decisions: [{ prompt: '**REMEMBER:** Define literal comprehension and inferential comprehension in your own words.', options: [
                { text: 'Literal comprehension: retrieving facts directly stated (e.g., "कविता एक मक्खन है फफूंदी', outcome: 'Literal comprehension: retrieving facts directly stated (e.g., "कविता एक मक्खन है फफूंदी के लिए".' },
                { text: 'swaps the definitions shows the student cannot distinguish explicit vs', outcome: 'Not quite — Students treat inferential questions as "guess what the teacher thinks" and write personal opinions.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a student copywriting gig, your teammate wrestles a slogan for hours — forcing synonyms, then rage-quitting: \'The perfect word exists; I just have to grab it and pin it down.\'',
            decisions: [{ prompt: 'What does Raghuvir Sahay\'s \'बात सीधी थी पर\' say about hunting words?', options: [
                { text: 'Stop pinning — the poem shows a word slipping out of language\'s grip and the poet chasing it like a mischievous child; it merges into living language on its own, and the poet\'s job is to receive and restore it, not capture it by force.', outcome: 'The climax is the word\'s assimilation, not its capture — poetry emerges from the friction between word and experience, so wrestling harder is exactly what doesn\'t work.' },
                { text: 'Push harder — discipline means refusing to stop until the word submits.', outcome: 'That\'s the misreading of the chase: the word escapes precisely when gripped; the poem ends not with conquest but with the poet gently returning it to where it lives.', reveals: 'force-catches-words' },
                { text: 'Give up entirely — if words escape by nature, writing is luck, not labour.', outcome: 'The poem is about the poet\'s engaged pursuit, not passivity — the chase matters; what\'s released is the fantasy of total control, not the effort.', reveals: 'writing-is-pure-luck' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read experimental poetry\'s double edge — language as both the only tool and the trap it can\'t escape.',
            decisions: [{ prompt: 'What comes next? j?kqohj lgk; · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — j?kqohj lgk; · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_007', difficulty: 'standard',
          question: 'Secondary themes are the subordinate ideas that run parallel to the primary.',
          hint: 'If stuck, review the PEEL answer structure from Class 11 Writing Skills.',
          misconception: 'Students often think "secondary theme" means "less important theme" and therefore write one-sentence identifications.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of secondary themes to the poem "ckr lh/h Fkh ij".', answer: 'Secondary theme: The elusiveness and living nature of language',
                  options: ['Secondary theme: The elusiveness and living nature of language', 'secondary theme', 'less important theme', 'Another theme is childhood'],
                  hint: 'If stuck, review the PEEL answer structure from Class 11 Writing Skills (c11_hin_ar_cbse_03_014).',
                  misconception: 'Students often think "secondary theme" means "less important theme" and therefore write one-sentence identifications like "Another theme.' }
          ],
            remediations: { 'secondary-theme-means-less-important': { steps: ['If a student cannot move beyond listing themes, do this 3-step remediation: (1) Have them re-read stanza 2 of "dfork.', '(2) Ask: "What does each verb *do* to the definition of poetry?" (3) Guide them to write a PEEL paragraph: Point — The.', 'Then re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "secondary theme" means "less important theme" and therefore write one-sentence identifications.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "The secondary themes in Ooj Ukh\'s poems are merely decorative; they do not change the reader\'s understanding of the primary.', answer: 'Refute',
                  options: ['Refute', 'secondary theme', 'less important theme', 'Another theme is childhood'],
                  hint: 'If stuck, review the PEEL answer structure from Class 11 Writing Skills (c11_hin_ar_cbse_03_014).',
                  misconception: 'Students often think "secondary theme" means "less important theme" and therefore write one-sentence identifications like "Another theme.' }
          ],
            remediations: { 'secondary-theme-means-less-important': { steps: ['If a student cannot move beyond listing themes, do this 3-step remediation: (1) Have them re-read stanza 2 of "dfork.', '(2) Ask: "What does each verb *do* to the definition of poetry?" (3) Guide them to write a PEEL paragraph: Point — The.', 'Then re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_008', difficulty: 'standard',
          question: 'Imagery (प्रतीकात्मक चित्रण) is the use of vivid, sensory language that appeals.',
          hint: 'If stuck on tenor/vehicle/ground, review c11_hin_ar_cbse_03_008 Worked Example 1 which.',
          misconception: 'Students treat every comparison as a metaphor. In "कविता एक ममता है", they correctly spot metaphor. But in "बात...',
          parts: [
                { id: 'a', prompt: 'Define \'imagery\' (प्रतीकात्मक चित्रण) in poetry and name the five sensory types. Give one example from daily life for each type.', answer: 'Imagery is language that appeals to the senses to create mental pictures',
                  options: ['Imagery is language that appeals to the senses to create mental pictures', 'Identify the figure of speech'],
                  hint: 'If stuck on tenor/vehicle/ground, review c11_hin_ar_cbse_03_008 Worked Example 1 which breaks down.',
                  misconception: 'Students treat every comparison as a metaphor. In "कविता एक ममता है", they correctly spot metaphor. But in "बात...' },
                { id: 'b', prompt: 'Find one visual image and one kinesthetic (movement) image from "बात लम्बी थी पर".', answer: 'Visual: "बात की पोती ej आ गई" (the small talk\'s fat belly came)',
                  options: ['Visual: "बात की पोती ej आ गई" (the small talk\'s fat belly came)', 'लम्बी बात', 'Identify the figure of speech'],
                  hint: 'If stuck on tenor/vehicle/ground, review c11_hin_ar_cbse_03_008 Worked Example 1 which breaks down.',
                  misconception: 'Students treat every comparison as a metaphor. In "कविता एक ममता है", they correctly spot metaphor. But in "बात...' }
          ],
            remediations: { 'students-treat-every-comparison-as': { steps: ['Give the student three mixed sentences from the poems (e.g., "कविता एक ममता है", "बात बच्चों की तरह खेल रही थी", "भाषा.', 'For each metaphor, have them fill a 3-column table: Tenor | Vehicle | Ground (shared quality).', 'Ask them to rewrite the simile as a metaphor and vice versa, then discuss how the *force* changes.', 'Re-attempt DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_4. If still stuck, revisit c11_hin_ar_cbse_03_008 (Class 11.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or situations.',
          hint: 'If stuck, review the "Irony Types" and "Symbol vs. Metaphor" tables in Class 11 Hindi.',
          misconception: 'Students consistently confuse *verbal irony* (saying opposite of what you mean) with *situational irony* (outcome.',
          parts: [
                { id: 'a', prompt: 'In "dfork ds cgkus," the line "dfork ,d mM+ku gS fpfM+;k osQ cgkus" (Poetry is a house-building for the purpose of playing) contains what type of irony?', answer: 'Correct answer: Situational irony',
                  options: ['Correct answer: Situational irony', 'verbal irony', 'no irony, it\'s just a metaphor'],
                  hint: 'If stuck, review the "Irony Types" and "Symbol vs. Metaphor" tables in Class 11 Hindi Aroh Chapter.',
                  misconception: 'Students consistently confuse *verbal irony* (saying opposite of what you mean) with *situational irony* (outcome contradicts expectation).' },
                { id: 'b', prompt: 'The poem "ckr lh/h Fkh ij" ends with the speaker throwing the speech (ckr) "like curd" (dhy dh rjg Bksad fn;k).', answer: 'Correct answer: Curd (dhy) symbolizes language that has *coagulated*',
                  options: ['Correct answer: Curd (dhy) symbolizes language that has *coagulated*', 'curd is white and pure', 'it\'s just a random comparison'],
                  hint: 'If stuck, review the "Irony Types" and "Symbol vs. Metaphor" tables in Class 11 Hindi Aroh Chapter.',
                  misconception: 'Students consistently confuse *verbal irony* (saying opposite of what you mean) with *situational irony* (outcome contradicts expectation).' },
                { id: 'c', prompt: 'Compare the symbolism of "ghar" (house) in "dfork ds cgkus" with "isap" (snake) in "ckr lh/h Fkh ij." Both are central symbols.', answer: 'Correct answer: The "ghar" (house) is a *constructive* symbol',
                  options: ['Correct answer: The "ghar" (house) is a *constructive* symbol', 'house has rooms, snake has fangs'],
                  hint: 'If stuck, review the "Irony Types" and "Symbol vs. Metaphor" tables in Class 11 Hindi Aroh Chapter.',
                  misconception: 'Students consistently confuse *verbal irony* (saying opposite of what you mean) with *situational irony* (outcome contradicts expectation).' }
          ],
            remediations: { 'students-consistently-confuse-verbal-irony': { steps: ['Have the student re-read both poems aloud, marking every comparison with a colored pen.', 'For each comparison, ask: "Is the speaker *saying* the opposite (verbal), is the *situation* contradictory.', 'For each concrete noun (ghar, isap, dhy, cPps, iwQy), ask: "What *action* does this noun perform in the poem?', 'Re-attempt Diagnostic Questions 2 and 4 using this verb-based symbol analysis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, return to the two poems and physically annotate: underline every noun/verb that.',
          misconception: '**The "Dictionary Trap":** Students believe "vocabulary in context" means *looking up the hard words* in the poem and.',
          parts: [
                { id: 'a', prompt: 'What is the primary difference between a word\'s *dictionary meaning* (vk\'kq fyfi vFkZ) and its *contextual meaning* (lfgr vFkZ) in a poem?', answer: '**Correct Answer:** Dictionary meaning is fixed, universal, and decontextualized',
                  options: ['**Correct Answer:** Dictionary meaning is fixed, universal, and decontextualized', 'they are the same', 'contextual meaning is just a synonym', 'Dictionary Trap'],
                  hint: 'If stuck, return to the two poems and physically annotate: underline every noun/verb that.',
                  misconception: '**The "Dictionary Trap":** Students believe "vocabulary in context" means *looking up the hard words* in the poem and memorizing their.' },
                { id: 'b', prompt: '**Apply:** In "ckr lh/h Fkh ij," the line **"ckr dh pwM+h ej xbZ / vkSj og Hkk"kk esa csdkj ?kweus yxh"** uses **"pwM+h"** (fat/heavy) and **"?kweus"**.', answer: '**Correct Answer with Steps:** 1',
                  options: ['**Correct Answer with Steps:** 1', 'both mean heavy', 'Dictionary Trap', 'vocabulary in context'],
                  hint: 'If stuck, return to the two poems and physically annotate: underline every noun/verb that.',
                  misconception: '**The "Dictionary Trap":** Students believe "vocabulary in context" means *looking up the hard words* in the poem and memorizing their.' }
          ],
            remediations: { 'the-dictionary-trap-students-believe': { steps: ['**Immediate:** Have the student re-read *only* the two poems aloud, circling every word that *feels* like it\'s doing.', '**Targeted:** For each circled word, complete a **3-Column Table**: Column A = Dictionary Meaning; Column B = What.', 'Do this for 5 words minimum.', '**Re-diagnostic:** Ask the student to explain *why* the poet chose *isap* over *maa* (from Diagnostic 5) without notes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic analysis.',
          hint: 'If stuck, review the "Grammar: Language Usage" node from Class 11 Chapter 3.',
          misconception: 'Students treat grammar analysis as mere part-of-speech tagging (e.g., "dfork is a noun, gS is a verb").',
          parts: [
                { id: 'a', prompt: 'List two grammatical features prominently used in "dfork ds cgkus" that create its rhythmic, chant-like quality.', answer: 'The two features are: (1) Anaphora',
                  options: ['The two features are: (1) Anaphora', 'rhyming words', 'metaphors'],
                  hint: 'If stuck, review the "Grammar: Language Usage" node from Class 11 Chapter 3.',
                  misconception: 'Students treat grammar analysis as mere part-of-speech tagging (e.g., "dfork is a noun, gS is a verb").' },
                { id: 'b', prompt: 'In the line "ckr dh pwM+h ej xbZ vkSj og Hkk"kk esa csdkj ?kweus yxh" from "ckr lh/h Fkh ij", identify the verb forms (aspect and voice) and explain how they.', answer: '"ej xbZ" is past perfective (completed action) in active voice',
                  options: ['"ej xbZ" is past perfective (completed action) in active voice', 'once upon a time'],
                  hint: 'If stuck, review the "Grammar: Language Usage" node from Class 11 Chapter 3.',
                  misconception: 'Students treat grammar analysis as mere part-of-speech tagging (e.g., "dfork is a noun, gS is a verb").' }
          ],
            remediations: { 'students-treat-grammar-analysis-as': { steps: ['Re-read both poems and highlight every verb form — note tense, aspect, voice.', 'Revisit node c12_hin_ar_cbse_03_010 (Vocabulary) to see how dialect words function grammatically.', 'Practice the "Identify → Quote → Explain Function → Connect to Theme" template on one stanza from each poem.', 'Re-attempt Diagnostic Questions 3 and 4 after this focused review.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving information explicitly.',
          hint: 'Review the literal/inferential classification exercise in Class 11 node.',
          misconception: 'Students treat inferential questions as "guess what the teacher thinks" and write personal opinions without anchoring.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** In the poem "कर", the line "भाषा के पंख नहीं होते" appears. Explain why this is an inferential statement and not a literal fact.', answer: 'The line is metaphorical',
                  options: ['The line is metaphorical', 'यह शाब्दिक है क्योंकि कवि ने लिखा है', 'भाषा के पंख न होने का क्या अर्थ है?'],
                  hint: 'Review the literal/inferential classification exercise in Class 11 node c11_hin_ar_cbse_01_012 and.',
                  misconception: 'Students treat inferential questions as "guess what the teacher thinks" and write personal opinions without anchoring in the poem.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Re-read both poems aloud, highlighting every concrete noun/verb (literal layer).', 'Convert each highlighted fact into a literal question (e.g., "कविता किसके लिए मक्खन है?").', 'For each metaphor (खेल, मक्खन, पतंग, डोर), ask "Why this comparison?" and write the answer using the "Evidence →.', 'Practice the textbook’s vH;kl questions 1-7, self-checking against the marking scheme: 1 mark for correct fact, 1 mark.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
