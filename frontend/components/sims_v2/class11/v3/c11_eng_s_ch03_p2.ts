import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch03_p2: SimDef = {
    id: 'v3_c11_eng_s_ch03_p2',
    title: 'Mother\'s Day · Part 2/3',
    subtitle: 'Read a body-swap as enacted resolve, and an ending as negotiated truce.',
    classLevel: 11, subject: 'eng_s', topic: 'Mother\'s Day · Part 2/3',
    chapters: ['c11_eng_s_ch03'],
    nodeIds: ['c11_eng_s_cbse_03_007', 'c11_eng_s_cbse_03_008', 'c11_eng_s_cbse_03_009', 'c11_eng_s_cbse_03_010', 'c11_eng_s_cbse_03_011', 'c11_eng_s_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a dramatist watching a suburban mother revolt politely', intro: 'A meek mother starts smoking, insults her daughter\'s boyfriend and exposes \'Pompy-ompy Pearson\' — something has clearly swapped.', goal: 'Analyse the play\'s escalating confrontations and evaluate its comedic resolution.' },
    discovery: {
        question: 'Mrs. Pearson gets her family to play rummy and share the chores — is the mother\'s exploitation actually solved?',
        options: ['No — it\'s a comedic compromise; the family clusters round her again, the structure intact with slightly better manners', 'Yes — shared chores permanently fix the power imbalance', 'Yes — the spell changed the family for good', 'No — because the swap was never real'],
        answer: 'No — it\'s a comedic compromise; the family clusters round her again, the structure intact with slightly better manners',
        hook: 'The body-swap isn\'t magic solving a problem — it\'s the visible shape of a decision: \'this is where your foot goes down.\'',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the supporting ideas in a literary work that complement the primary theme by exploring specific aspects of human experience, social structures, or character dynamics;.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Rank the three confrontations — Doris, Cyril, George — on the rising curve, and judge whether the second swap earns the ending.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are directing a stage production of "Mother\'s Day". The script says Mrs. Pearson speaks in a "light, flurried sort of tone" while Mrs.',
            decisions: [{ prompt: 'Identify the **type of imagery** in the stage direction: "Mrs Fitzgerald is older, heavier and a strong and sinister personality.', options: [
                { text: '**Answer:** Visual imagery ("older, heavier"), tactile/kinesthetic implication', outcome: '**Answer:** Visual imagery ("older, heavier"), tactile/kinesthetic implication ("strong"), and.' },
                { text: 'visual', outcome: 'Not quite — **Misconception:** "Imagery is only descriptive writing that paints a picture; metaphor is only.', reveals: 'misconception-imagery-is-only-descriptive' },
                { text: 'smoking', outcome: 'Not quite — **Misconception:** "Imagery is only descriptive writing that paints a picture; metaphor is only.', reveals: 'misconception-imagery-is-only-descriptive' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading the play and encounter "sinister" describing Mrs.',
            decisions: [{ prompt: 'What is the primary purpose of analyzing vocabulary in context when studying a play like "Mother\'s Day"?', options: [
                { text: 'The primary purpose is to understand how word choices reveal character personality,', outcome: 'The primary purpose is to understand how word choices reveal character personality, social.' },
                { text: 'to memorize definitions for the exam', outcome: 'Not quite — Students believe "vocabulary in context" means guessing a word\'s dictionary definition from nearby.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means guessing a word\'s dictionary definition from nearby.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Think about how your tone changes when you ask a sibling for a favor versus when a teacher gives an instruction. In "Mother\'s Day," J.B.',
            decisions: [{ prompt: 'Identify the sentence type of Mrs Fitzgerald\'s line: "Put your foot down, once an\' for all, an\' be the mistress of your own house an\' the.', options: [
                { text: 'Imperative sentence (command)', outcome: 'Imperative sentence (command). A wrong answer (e.g., "declarative" or "interrogative") reveals the.' },
                { text: 'declarative', outcome: 'Not quite — Students treat "grammar in literature" as labeling parts of speech (noun, verb, adjective) rather.', reveals: 'students-treat-grammar-in-literature' },
                { text: 'interrogative', outcome: 'Not quite — Students treat "grammar in literature" as labeling parts of speech (noun, verb, adjective) rather.', reveals: 'students-treat-grammar-in-literature' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are asked: "Why does Mrs Pearson suddenly start smoking and playing cards?" A literal answer would quote the stage direction; an inferential answer.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question\'s answer is directly stated in the text (e.g., "What is Mrs Pearson', outcome: 'A literal question\'s answer is directly stated in the text (e.g., "What is Mrs Pearson doing when.' },
                { text: 'inferential questions are just opinions', outcome: 'Not quite — Students often think inferential questions have no "right" answer and that any personal opinion.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your drama society stages \'Mother\'s Day\' and a reviewer from the school paper writes: \'A timeless family comedy — the 1950s setting and Priestley\'s politics are irrelevant background; the play works identically in any era.\'',
            decisions: [{ prompt: 'Is the context really irrelevant?', options: [
                { text: 'No — the play is a pointed critique of 1950s suburban gender roles: Mrs Pearson\'s invisible labour (serving, ironing, never thanked) reflects the era\'s \'ideal\' housewife ideal, and Priestley\'s socialist concern for ordinary voices drives the satire. The one-act structure compresses the rebellion into one afternoon — genre, era and ideology are doing the work, not just the jokes.', outcome: 'Context here includes genre conventions and authorial stance — strip them and the play reads as quirky fantasy instead of social critique.' },
                { text: 'The reviewer is right — a good play transcends its setting; context is for historians.', outcome: 'Without 1950s gender norms the family\'s entitlement looks generic rather than systemic; the play\'s bite depends on recognising the \'ideal mother\' it\'s mocking.', reveals: 'context-is-optional' },
                { text: 'Context only means the playwright\'s birth year and the date of writing — the social conditions don\'t count.', outcome: 'Context is the living environment — wage roles, gender expectations, genre rules — that shapes every character\'s behaviour; dates alone illuminate nothing.', reveals: 'context-means-dates-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'The magic never fixed anything; it only let everyone watch what Mrs. Pearson\'s foot finally going down looks like.',
            decisions: [{ prompt: 'What comes next? Mother\'s Day · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mother\'s Day · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_007', difficulty: 'standard',
          question: 'Secondary themes are the supporting ideas in a literary work that complement.',
          hint: 'Review the primary theme node (c11_eng_s_cbse_03_006) and re-read the character analysis.',
          misconception: 'Students often treat any recurring topic (e.g., "smoking," "card games," "the club") as a secondary theme.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the supporting ideas in a literary work that complement the primary',
                  options: ['Secondary themes are the supporting ideas in a literary work that complement the primary', '"Before You Read: Context and Background" refers to the essential historical, social, and', 'Plot and narrative structure in drama refers to the organized sequence of events and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Review the primary theme node (c11_eng_s_cbse_03_006) and re-read the character analysis of Mrs.',
                  misconception: 'Students often treat any recurring topic (e.g., "smoking," "card games," "the club") as a secondary theme.' }
          ],
            remediations: { 'students-often-treat-any-recurring': { steps: ['Give the student a two-column table: Column A = Recurring Topics (smoking, cards, club, stout, ironing), Column.', 'Ask them to match each topic to an insight using the sentence frame: "The play suggests that [topic] represents.', 'Have them write one paragraph explaining how the matched insight supports the primary theme.', 'This moves them from noun-hunting to thematic reasoning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat any recurring topic (e.g., "smoking," "card games," "the club") as a secondary theme.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of using humor and a fantastical device (body swap) to convey the secondary theme of **the necessity of mutual respect.', answer: 'The comedy strengthens the message',
                  options: ['The comedy strengthens the message', 'it\'s just a comedy so the message doesn\'t matter'],
                  hint: 'Review the primary theme node (c11_eng_s_cbse_03_006) and re-read the character analysis of Mrs.',
                  misconception: 'Students often treat any recurring topic (e.g., "smoking," "card games," "the club") as a secondary theme.' }
          ],
            remediations: { 'students-often-treat-any-recurring': { steps: ['Give the student a two-column table: Column A = Recurring Topics (smoking, cards, club, stout, ironing), Column.', 'Ask them to match each topic to an insight using the sentence frame: "The play suggests that [topic] represents.', 'Have them write one paragraph explaining how the matched insight supports the primary theme.', 'This moves them from noun-hunting to thematic reasoning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck on metaphor mechanics, review **c10_engl_cbse_16_007** (The Necklace: "diamond.',
          misconception: '**Misconception:** "Imagery is only descriptive writing that paints a picture; metaphor is only a fancy comparison.',
          parts: [
                { id: 'a', prompt: 'Identify the **type of imagery** in the stage direction: "Mrs Fitzgerald is older, heavier and a strong and sinister personality. She is smoking."', answer: '**Answer:** Visual imagery ("older, heavier"), tactile/kinesthetic implication',
                  options: ['**Answer:** Visual imagery ("older, heavier"), tactile/kinesthetic implication', 'visual', 'smoking', 'strong'],
                  hint: 'If stuck on metaphor mechanics, review **c10_engl_cbse_16_007** (The Necklace: "diamond necklace".',
                  misconception: '**Misconception:** "Imagery is only descriptive writing that paints a picture; metaphor is only a fancy comparison.' },
                { id: 'b', prompt: 'Explain in your own words the **metaphor** in Mrs. Fitzgerald\'s line: "Who\'s the better for being spoilt — grown man, lad or girl? Nobody.', answer: '**Answer:** The metaphor compares Mrs',
                  options: ['**Answer:** The metaphor compares Mrs', 'she feels like a servant', '), missing that the text says'],
                  hint: 'If stuck on metaphor mechanics, review **c10_engl_cbse_16_007** (The Necklace: "diamond necklace".',
                  misconception: '**Misconception:** "Imagery is only descriptive writing that paints a picture; metaphor is only a fancy comparison.' },
                { id: 'c', prompt: '**Apply** your knowledge: In the body-swap scene, Mrs. Pearson (now with Mrs. Fitzgerald\'s personality) says: "Here — you don\'t want that.', answer: '**Answer:** 1',
                  options: ['**Answer:** 1', 'she smokes now'],
                  hint: 'If stuck on metaphor mechanics, review **c10_engl_cbse_16_007** (The Necklace: "diamond necklace".',
                  misconception: '**Misconception:** "Imagery is only descriptive writing that paints a picture; metaphor is only a fancy comparison.' },
                { id: 'd', prompt: '**Analyze** the metaphor in Mrs. Pearson\'s challenge to George: "Ever tried that at the club?', answer: '**Answer:** - **Domains:** Domestic sphere (George expecting tea) ↔',
                  options: ['**Answer:** - **Domains:** Domestic sphere (George expecting tea) ↔', 'she compares home to a club'],
                  hint: 'If stuck on metaphor mechanics, review **c10_engl_cbse_16_007** (The Necklace: "diamond necklace".',
                  misconception: '**Misconception:** "Imagery is only descriptive writing that paints a picture; metaphor is only a fancy comparison.' }
          ],
            remediations: { 'misconception-imagery-is-only-descriptive': { steps: ['**Re-teach device clustering:** Give the student the "servant" passage (lines 1–2 of Mrs.', 'Fitzgerald\'s first long speech).', 'Ask them to: (a) underline every sensory word, (b) circle the comparison, (c) draw an arrow from sensory words to the.', '**Model the "transfer" question:** "What does \'servant\' carry over?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contrast between expectation and.',
          hint: 'Review the definitions and Class 10/8 examples in c10_engl_cbse_01_007 and c8_engl_ch4_8.',
          misconception: 'Students often treat the body-swap as mere supernatural fantasy and therefore miss its function as *sustained dramatic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where there is a contrast between expectation and reality,',
                  options: ['Irony is a literary device where there is a contrast between expectation and reality,', '"Before You Read: Context and Background" refers to the essential historical, social, and', 'Plot and narrative structure in drama refers to the organized sequence of events and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Review the definitions and Class 10/8 examples in c10_engl_cbse_01_007 and c8_engl_ch4_8; practice.',
                  misconception: 'Students often treat the body-swap as mere supernatural fantasy and therefore miss its function as *sustained dramatic irony*: every scene.' }
          ],
            remediations: { 'students-often-treat-the-body': { steps: ['Re-read the swap scene (pp.', '17–18) and highlight every stage direction showing *both* women\'s physical reactions — this grounds the magic in bodily.', 'Make a two-column table: Column A = "What the family thinks is happening", Column B = "What the audience knows" — fill.', 'For symbols, use the "object → abstract idea → thematic function" template on three objects (cards, cigarettes, rummy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the precise meaning of words.',
          hint: 'Review c11_eng_s_cbse_03_004 and c11_eng_s_cbse_03_005 to recall each character\'s.',
          misconception: 'Students believe "vocabulary in context" means guessing a word\'s dictionary definition from nearby sentences.',
          parts: [
                { id: 'a', prompt: 'In the stage direction, Mrs. Fitzgerald is described as having a "deep voice, rather Irish perhaps." Later, after the body swap, Mrs. Pearson (with Mrs.', answer: '"Chuckles" implies a low, controlled, self-satisfied amusement that matches Mrs',
                  options: ['"Chuckles" implies a low, controlled, self-satisfied amusement that matches Mrs', 'they mean the same thing', 'vocabulary in context'],
                  hint: 'Review c11_eng_s_cbse_03_004 and c11_eng_s_cbse_03_005 to recall each character\'s baseline.',
                  misconception: 'Students believe "vocabulary in context" means guessing a word\'s dictionary definition from nearby sentences.' },
                { id: 'b', prompt: 'Apply the context-clue strategy to determine the meaning of "laconic" in this line: "Mrs Pearson: [laconic and sinister] Changes." Use the surrounding dialogue.', answer: 'Step 1: Locate the word',
                  options: ['Step 1: Locate the word', 'means funny', 'sinister', 'vocabulary in context'],
                  hint: 'Review c11_eng_s_cbse_03_004 and c11_eng_s_cbse_03_005 to recall each character\'s baseline.',
                  misconception: 'Students believe "vocabulary in context" means guessing a word\'s dictionary definition from nearby sentences.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['If a student cannot distinguish contextual meaning from dictionary meaning: 1) Have them create a three-column chart.', '2) For each word, ask: "How does the body-swap change what this word *does* in the scene?" 3) Practice with.', 'Pearson before swap) — same character, opposite stances.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_011', difficulty: 'standard',
          question: 'Language usage analysis examines how grammatical choices—sentence types, modal.',
          hint: 'Review Class 6-8 grammar: sentence types (c6_english_u4_038) and modal verbs.',
          misconception: 'Students treat "grammar in literature" as labeling parts of speech (noun, verb, adjective) rather than analyzing how.',
          parts: [
                { id: 'a', prompt: 'Identify the sentence type of Mrs Fitzgerald\'s line: "Put your foot down, once an\' for all, an\' be the mistress of your own house an\' the boss of your own.', answer: 'Imperative sentence (command)',
                  options: ['Imperative sentence (command)', 'declarative', 'interrogative'],
                  hint: 'Review Class 6-8 grammar: sentence types (c6_english_u4_038) and modal verbs (c6_english_u2_018.',
                  misconception: 'Students treat "grammar in literature" as labeling parts of speech (noun, verb, adjective) rather than analyzing how syntactic choices.' }
          ],
            remediations: { 'students-treat-grammar-in-literature': { steps: ['Give the student two columns: "Form" (grammatical structure) and "Force" (what it does in context).', 'Have them fill it for 5 key exchanges from the play (e.g., Doris\'s "Mum—you\'ll have to..." → Form: semi-modal.', 'Ask: "If we change Form X to Form Y, how does Force change?" (e.g., "You\'ll have to" → "Could you please").', 'Require them to rewrite one scene swapping all modality (can\'t→won\'t, must→might) and discuss the character.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, review the "Character Analysis: Protagonist" (node 004) and "Literary Devices.',
          misconception: 'Students often think inferential questions have no "right" answer and that any personal opinion counts.',
          parts: [
                { id: 'a', prompt: 'Analyze the following question: "How does the personality swap serve as a dramatic device to reveal the family\'s true dynamics?" Identify whether it is literal.', answer: 'It is inferential',
                  options: ['It is inferential', 'cannot cite specific scenes shows weak evidence-gathering', 'the theme is directly stated'],
                  hint: 'If stuck, review the "Character Analysis: Protagonist" (node 004) and "Literary Devices: Irony and.',
                  misconception: 'Students often think inferential questions have no "right" answer and that any personal opinion counts.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['If a student gives opinion-based answers: 1) Ask them to highlight the exact words in the play that support their idea.', '2) Show a model inferential answer broken into "Text clue 1 + Text clue 2 + Background knowledge = Inference." 3).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
