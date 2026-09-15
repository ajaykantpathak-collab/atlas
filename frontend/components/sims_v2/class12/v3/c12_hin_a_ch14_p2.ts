import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch14_p2: SimDef = {
    id: 'v3_c12_hin_a_ch14_p2',
    title: 'vlxj otkgr · Part 2/3',
    subtitle: 'A lid on the well, a gag on the people',
    classLevel: 12, subject: 'hin_a', topic: 'vlxj otkgr · Part 2/3',
    chapters: ['c12_hin_a_ch14'],
    nodeIds: ['c12_hin_a_cbse_14_007', 'c12_hin_a_cbse_14_008', 'c12_hin_a_cbse_14_009', 'c12_hin_a_cbse_14_010', 'c12_hin_a_cbse_14_011', 'c12_hin_a_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Satire reader', intro: 'Four short stories from a journalist\'s pen — each one a different machine for how power eats the weak.', goal: 'Read the four stories as variations on power and resistance in Asghar Wajahat\'s satirical voice.' },
    discovery: {
        question: 'A kingdom covers a well\'s mouth so no voice escapes; a magician rules by fear; a fakir trades men\'s limbs; a servant outwits his master — four stories, one theme. Which?',
        options: ['Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose', 'Magic and fantasy', 'Village comedy', 'Random variety'],
        answer: 'Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose',
        hook: 'The journalist\'s craft is the giveaway — simple spoken language carrying sharp satire; even the glossary is a code: \'myaan\' (scabbard) hints at hidden violence, the fakir\'s words flag hypocrisy. The well\'s lid is the citizenry\'s gagged voice.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, messages, or concerns that run alongside the primary theme in a literary work.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the satire four ways: unmask the well\'s lid as silenced dissent, split state-scale from household-scale power, and read the vocabulary list as a map of the stories\' politics.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are watching a movie where the main plot is about a hero fighting a villain, but you also notice side stories about friendship, corruption in the.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature?', options: [
                { text: 'A secondary theme is a supporting idea or message that runs parallel to the primary', outcome: 'A secondary theme is a supporting idea or message that runs parallel to the primary theme, adding.' },
                { text: 'the main moral of the story', outcome: 'Not quite — Students often treat every recurring topic as a secondary theme.', reveals: 'students-often-treat-every-recurring' },
                { text: 'ghosts', outcome: 'Not quite — Students often treat every recurring topic as a secondary theme.', reveals: 'students-often-treat-every-recurring' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are describing a nightmare to a friend: you don\'t just say "it was scary"; you say "cold fingers brushed my neck" (tactile imagery) and "the.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, giving one example of each from daily life (not from the textbook).', options: [
                { text: 'Imagery: Language that creates sensory experiences (e.g., "the smell of wet earth after', outcome: 'Imagery: Language that creates sensory experiences (e.g., "the smell of wet earth after rain".' },
                { text: 'imagery is only visual description', outcome: 'Not quite — Students often think "imagery" means only *visual* description and "metaphor" means any comparison.', reveals: 'imagery-means-only-visual-description' },
                { text: 'metaphor uses \'like\' or \'as\'', outcome: 'Not quite — Students often think "imagery" means only *visual* description and "metaphor" means any comparison.', reveals: 'imagery-means-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading "ksj" (कस्ज) and encounter "ल्हक्स फुद्युक" — you might think it just means "worried," but the narrator says it while watching a crow\'s.',
            decisions: [{ prompt: 'What is the dictionary meaning of "म्क्क्ष्ह इ्ह्वुक" (MqXxh ihVuk) as a standalone phrase, without reference to the story "ksj"?', options: [
                { text: 'Dictionary meaning: "to warn loudly using a drum or similar instrument; to alert people', outcome: 'Dictionary meaning: "to warn loudly using a drum or similar instrument; to alert people publicly.".' },
                { text: 'to warn loudly using a drum or similar instrument', outcome: 'Not quite — Students treat the NCERT glossary meanings (e.g., "ल्हक्स फुद्युक = चिंतित होना") as fixed.', reveals: 'students-treat-the-ncert-glossary' },
                { text: 'to secretly warn someone', outcome: 'Not quite — Students treat the NCERT glossary meanings (e.g., "ल्हक्स फुद्युक = चिंतित होना") as fixed.', reveals: 'students-treat-the-ncert-glossary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading \'ksj and notice the narrator says "esjs flj ij lhax fudy jgs Fks" — why does the author choose the compound verb "fudy jgs Fks" instead.',
            decisions: [{ prompt: 'Identify the grammatical term for the construction "lhax fudyuk" as used in the opening line of \'ksj. Explain its formation in one sentence.', options: [
                { text: '"lhax fudyuk" is a compound verb (संयुक्त क्रिया) formed by combining the', outcome: '"lhax fudyuk" is a compound verb (संयुक्त क्रिया) formed by combining the adverbial/adjectival.' },
                { text: 'shabd roop', outcome: 'Not quite — Students often treat phrases like "lhax fudyuk", "MqXxh ihVuk", "fuokZ.k", "mYyw cukuk" as fixed.', reveals: 'students-often-treat-phrases-like' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your hostel reports a wobbly fan. Weeks later it\'s a \'case\' — the warden consulted the electrician, who consulted the engineer, who proposed a structural audit, who now wants a committee — while the fan still wobbles.',
            decisions: [{ prompt: 'Which of Asghar Wajahat\'s story structures is playing out?', options: [
                { text: '\'चार हाथ\' — the consultative chain where each expert inflates a simple problem into an elaborate procedure; the satire is that consultation replaces repair, so name the chain and fix the fan.', outcome: 'The story\'s bottom-up repetition exists to show bureaucracy compounding — every added opinion multiplies absurdity while the object stays broken; recognising the structure is the way out of it.' },
                { text: '\'शेर\' — the mystery story where appearances deceive, so the fan probably isn\'t the real issue.', outcome: 'That misapplies the chapter\'s suspense structure to a satire problem: nothing here is hidden or supernatural — the failure is fully visible, which is exactly what the consultative-chain story mocks.', reveals: 'every-mess-is-mystery' },
                { text: 'Wait it out — each consultation is a real step, so the process is working as designed.', outcome: 'The story\'s chain is \'working\' only in the sense that it keeps moving; the diagnosis it offers is that motion through offices is a substitute for — not a route to — the repair.', reveals: 'process-equals-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a satirist\'s quartet as one argument about power — and spot how a lid on a well is a lid on a people.',
            decisions: [{ prompt: 'What comes next? vlxj otkgr · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — vlxj otkgr · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, messages, or concerns that run.',
          hint: 'If stuck, review the difference between "topic" (e.g., ghost) and "theme" (e.g.',
          misconception: 'Students often treat every recurring topic as a secondary theme.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of secondary themes to a new context: If a story about a farmer struggling against drought also includes scenes of a money-lender cheating.', answer: 'Secondary theme: Economic exploitation of the vulnerable',
                  options: ['Secondary theme: Economic exploitation of the vulnerable', 'the theme is drought', 'ghosts', 'superstition born of fear'],
                  hint: 'If stuck, review the difference between "topic" (e.g., ghost) and "theme" (e.g., superstition).',
                  misconception: 'Students often treat every recurring topic as a secondary theme.' },
                { id: 'b', prompt: 'Compare the secondary themes of igpku and pkj gkFk. How do both stories use authority figures to critique systemic failure?', answer: 'In igpku, the king manipulates truth through propaganda to maintain control',
                  options: ['In igpku, the king manipulates truth through propaganda to maintain control', 'one is a king, the other is officers', 'ghosts', 'superstition born of fear'],
                  hint: 'If stuck, review the difference between "topic" (e.g., ghost) and "theme" (e.g., superstition).',
                  misconception: 'Students often treat every recurring topic as a secondary theme.' }
          ],
            remediations: { 'students-often-treat-every-recurring': { steps: ['Revisit node c12_hin_a_cbse_14_006 (Primary Theme) and list the primary theme in one sentence.', 'For each story, write one sentence answering: "Besides exploitation, what else is this story criticizing?" 3.', 'Match each answer to a label: superstition, propaganda, red tape, casteism.', 'Re-attempt Diagnostic Question 4 to practice comparative analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat every recurring topic as a secondary theme.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The secondary theme of caste discrimination in lk>k is more powerful than the theme of bureaucratic apathy in pkj gkFk because.', answer: 'Challenge: Both themes are powerful in different ways',
                  options: ['Challenge: Both themes are powerful in different ways', 'ghosts', 'superstition born of fear', 'simply agrees without analyzing the nature of violence in pkj gkFk (e'],
                  hint: 'If stuck, review the difference between "topic" (e.g., ghost) and "theme" (e.g., superstition).',
                  misconception: 'Students often treat every recurring topic as a secondary theme.' }
          ],
            remediations: { 'students-often-treat-every-recurring': { steps: ['Revisit node c12_hin_a_cbse_14_006 (Primary Theme) and list the primary theme in one sentence.', 'For each story, write one sentence answering: "Besides exploitation, what else is this story criticizing?" 3.', 'Match each answer to a label: superstition, propaganda, red tape, casteism.', 'Re-attempt Diagnostic Question 4 to practice comparative analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, review Class 9/10 Hindi grammar chapters on अलंकार (figures of speech) and.',
          misconception: 'Students often think "imagery" means only *visual* description and "metaphor" means any comparison.',
          parts: [
                { id: 'a', prompt: 'In \'ksj, the narrator sees the crow\'s beak first as a "wasp\'s nest" (gjh ?kkl dk eSnku), then as a "cremation ground of insects" (jks”kxkj dk nÝ+rj), then.', answer: 'First image: visual + tactile (papery nest texture)',
                  options: ['First image: visual + tactile (papery nest texture)', 'the beak becomes a nest', 'imagery', 'metaphor'],
                  hint: 'If stuck, review Class 9/10 Hindi grammar chapters on अलंकार (figures of speech) and practice.',
                  misconception: 'Students often think "imagery" means only *visual* description and "metaphor" means any comparison.' },
                { id: 'b', prompt: 'Apply the concept of "extended metaphor" to the king\'s orders in igpku: first covering eyes, then ears, then mouths.', answer: 'Tenor: authoritarian state control',
                  options: ['Tenor: authoritarian state control', 'imagery', 'metaphor', '"imagery" means only *visual* description and "metaphor" means any comparison'],
                  hint: 'If stuck, review Class 9/10 Hindi grammar chapters on अलंकार (figures of speech) and practice.',
                  misconception: 'Students often think "imagery" means only *visual* description and "metaphor" means any comparison.' },
                { id: 'c', prompt: 'Compare the use of tactile imagery in pkj gkFk (the doctor feeling the bed legs, the patient\'s legs becoming the bed legs) with the tactile imagery in lk>k.', answer: 'In pkj gkFk, touch is diagnostic and transformative',
                  options: ['In pkj gkFk, touch is diagnostic and transformative', 'both have touch', 'imagery', 'metaphor'],
                  hint: 'If stuck, review Class 9/10 Hindi grammar chapters on अलंकार (figures of speech) and practice.',
                  misconception: 'Students often think "imagery" means only *visual* description and "metaphor" means any comparison.' }
          ],
            remediations: { 'imagery-means-only-visual-description': { steps: ['Have the student close eyes and listen to you read the opening of \'ksj.', '*Feel*?" List senses on paper.', 'Give three sentences: "The beak is a nest." "The beak is a cremation ground." "The beak is pure." Ask: "What two things.', 'What quality moves from the second to the first?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck, review the definitions of verbal, situational, and dramatic irony.',
          misconception: 'Students often confuse symbolism with metaphor, thinking any comparison is a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where the intended meaning of words or events is opposite to',
                  options: ['Irony is a literary device where the intended meaning of words or events is opposite to', 'This node provides the essential biographical, historical, and literary context for the', 'Plot and Narrative Structure refers to the deliberate arrangement of events in a story', 'Setting and atmosphere refer to the time, place, physical environment, and emotional mood'],
                  hint: 'If stuck, review the definitions of verbal, situational, and dramatic irony.',
                  misconception: 'Students often confuse symbolism with metaphor, thinking any comparison is a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Revisit c11_hin_ar_cbse_14_009 (Class 11 Irony and Symbolism) and re-read the definitions of the three irony types with.', 'Create a three-column table: Device | Definition | Example from \'ksj\'/\'igpku\'/\'pkj gkFk\'/\'lk>k\'.', 'Fill it for all four stories.', 'Practice the PEEL structure on one symbol: Point (The beak symbolizes projected desire), Evidence (Old woman sees grain.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the precise meaning of words.',
          hint: 'If stuck, review "Character Analysis: Protagonist" (c12_hin_a_cbse_14_004) to refresh who.',
          misconception: 'Students treat the NCERT glossary meanings (e.g., "ल्हक्स फुद्युक = चिंतित होना") as fixed definitions applicable.',
          parts: [
                { id: 'a', prompt: 'In the opening of "ksj," the narrator says: "एमजे फ्लज इज ल्हक्स फुद्युक" (I was anxiously waiting).', answer: 'The phrase conveys paralyzing anticipation of inevitable loss',
                  options: ['The phrase conveys paralyzing anticipation of inevitable loss', 'he was nervous about an exam', 'म्ज ओस्क घ फुड्य ज्ग्स एफक'],
                  hint: 'If stuck, review "Character Analysis: Protagonist" (c12_hin_a_cbse_14_004) to refresh who.',
                  misconception: 'Students treat the NCERT glossary meanings (e.g., "ल्हक्स फुद्युक = चिंतित होना") as fixed definitions applicable everywhere.' },
                { id: 'b', prompt: 'Compare the use of "फुओक्ज.क" (fuokZ.k) in "ksj" (where the crow accepts its fate) with its use in "पक्ज ग्क्फ्क" (where the farmer\'s sons cannot escape their.', answer: 'In "ksj," "फुओक्ज.क" is quiet acceptance',
                  options: ['In "ksj," "फुओक्ज.क" is quiet acceptance', 'destiny'],
                  hint: 'If stuck, review "Character Analysis: Protagonist" (c12_hin_a_cbse_14_004) to refresh who.',
                  misconception: 'Students treat the NCERT glossary meanings (e.g., "ल्हक्स फुद्युक = चिंतित होना") as fixed definitions applicable everywhere.' }
          ],
            remediations: { 'students-treat-the-ncert-glossary': { steps: ['Have the student re-read the exact paragraph where each word appears (provide page/line references from NCERT).', 'Ask them to circle every sensory detail in that paragraph (sounds, sights, movements).', 'Have them rewrite the glossary meaning in their own words using ONLY those sensory details — e.g., for "म्क्क्ष्ह.', 'Then ask: "If this word were a color/sound/gesture in this scene, what would it be?" This forces context-bound.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the study of how grammatical.',
          hint: 'If stuck, revisit Class 10/11 Hindi grammar chapters on "Kriya ke bhed" and "Samas" using.',
          misconception: 'Students often treat phrases like "lhax fudyuk", "MqXxh ihVuk", "fuokZ.k", "mYyw cukuk" as fixed idioms (मुहावरे) to.',
          parts: [
                { id: 'a', prompt: 'Identify the grammatical term for the construction "lhax fudyuk" as used in the opening line of \'ksj. Explain its formation in one sentence.', answer: '"lhax fudyuk" is a compound verb (संयुक्त क्रिया) formed by combining the',
                  options: ['"lhax fudyuk" is a compound verb (संयुक्त क्रिया) formed by combining the', 'shabd roop'],
                  hint: 'If stuck, revisit Class 10/11 Hindi grammar chapters on "Kriya ke bhed" and "Samas" using NCERT.',
                  misconception: 'Students often treat phrases like "lhax fudyuk", "MqXxh ihVuk", "fuokZ.k", "mYyw cukuk" as fixed idioms (मुहावरे) to be memorized for.' }
          ],
            remediations: { 'students-often-treat-phrases-like': { steps: ['Have the student list the five phrases from the "kCnkFkZ vkSj fVIi.kh" section.', 'For each, identify the head verb and its modifiers (adverb, noun, prefix).', 'Drill morphological manipulation: change voice (active/passive), causation (simple/causative/double causative), aspect.', 'Ask the student to write two original sentences per phrase using different grammatical variants.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_012', difficulty: 'standard',
          question: 'Literal comprehension questions ask for information explicitly stated in the.',
          hint: 'If stuck, review story summaries in c12_hin_a_cbse_14_002 and vocabulary.',
          misconception: 'Students treat inferential questions as "opinion questions" and write personal feelings ("I think the king is cruel").',
          parts: [
                { id: 'a', prompt: 'Classify the following question as literal or inferential and explain your reasoning: "In \'pkj gkFk\', what three methods did the feathered old man try before.', answer: 'Literal',
                  options: ['Literal', 'inferential', 'remembering multiple steps'],
                  hint: 'If stuck, review story summaries in c12_hin_a_cbse_14_002 and vocabulary in c12_hin_a_cbse_14_010.',
                  misconception: 'Students treat inferential questions as "opinion questions" and write personal feelings ("I think the king is cruel") instead of text-based.' },
                { id: 'b', prompt: 'Answer this literal question using a direct quote or close paraphrase from \'ksj\': "What physical detail about the \'ksj\' (cactus) does the narrator notice.', answer: 'The narrator notices the cactus has a "dry, thorny head" (सूखा काँटेदार सिर)',
                  options: ['The narrator notices the cactus has a "dry, thorny head" (सूखा काँटेदार सिर)', 'it looked sad', 'it was struggling'],
                  hint: 'If stuck, review story summaries in c12_hin_a_cbse_14_002 and vocabulary in c12_hin_a_cbse_14_010.',
                  misconception: 'Students treat inferential questions as "opinion questions" and write personal feelings ("I think the king is cruel") instead of text-based.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Re-read one story with two highlighters: yellow for explicit facts (literal), green for implied ideas (inferential).', 'Take every yellow highlight and turn it into a literal question; take every green highlight and write the inference.', 'Revisit node c12_hin_a_cbse_14_010 (Vocabulary) — unknown words often block both literal retrieval and inference.', 'Practice writing PEEL paragraphs for three inferential questions from the textbook\'s exercise, then self-check: Does.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
