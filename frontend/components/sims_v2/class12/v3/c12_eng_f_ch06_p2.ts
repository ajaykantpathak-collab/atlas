import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch06_p2: SimDef = {
    id: 'v3_c12_eng_f_ch06_p2',
    title: 'Poets and Pancakes · Part 2/3',
    subtitle: 'Truckloads of make-up and a poet nobody understood',
    classLevel: 12, subject: 'eng_f', topic: 'Poets and Pancakes · Part 2/3',
    chapters: ['c12_eng_f_ch06'],
    nodeIds: ['c12_eng_f_cbse_06_007', 'c12_eng_f_cbse_06_008', 'c12_eng_f_cbse_06_009', 'c12_eng_f_cbse_06_010', 'c12_eng_f_cbse_06_011', 'c12_eng_f_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cultural satirist', intro: 'A clerk files newspaper cuttings at India\'s biggest film studio — and quietly writes its sharpest satire.', goal: 'Situate Poets and Pancakes in its 1950s film-studio world and decode its irony-laden portrait of literary pretension.' },
    discovery: {
        question: 'Gemini Studios\' make-up room was run by a Bengali, a Maharashtrian, a Kannadiga, an Andhra, a Christian, an Anglo-Burmese and Tamils — \'national integration,\' the author says, in a department that turns people into \'hideous crimson monsters.\' What\'s the joke really doing?',
        options: ['Satirising idealism — unity achieved not by policy but inside a department whose job is disguise; the satire lands through the contrast', 'Praising the government\'s integration programmes', 'Just describing staff diversity factually', 'Mocking South Indian actors specifically'],
        answer: 'Satirising idealism — unity achieved not by policy but inside a department whose job is disguise; the satire lands through the contrast',
        hook: 'Every detail in this memoir is irony under a flat tone — a failed-actor office boy lecturing a real writer about \'wasted talent\', truckloads of Pancake, a visiting English poet nobody understood. Context turns confusion into comedy; miss the era and the jokes evaporate.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Poets and Pancakes\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Go behind the scenes of 1950s Gemini Studios: place the Pancake make-up, the MRA visit and the office boy\'s ambitions in their Congress-era, khadi-clad milieu — and read Asokamitran\'s straight-faced satire.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Poets and Pancakes\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Define "secondary theme" in the context of a prose narrative like "Poets and Pancakes." How does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subordinate but recurring idea that enriches the primary theme by', outcome: 'A secondary theme is a subordinate but recurring idea that enriches the primary theme by exploring.' },
                { text: 'the MRA visit', outcome: 'Not quite — Students often treat **every recurring topic** as a theme. For example, they list "make-up,".', reveals: 'students-often-treat-every-recurring' },
                { text: 'the manipulation of art for political ends', outcome: 'Not quite — Students often treat **every recurring topic** as a theme. For example, they list "make-up,".', reveals: 'students-often-treat-every-recurring' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Poets and Pancakes\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "organic imagery" and give one example from "Poets and Pancakes" where the narrator conveys an internal bodily sensation (hunger.', options: [
                { text: 'Organic imagery appeals to internal bodily sensations (thirst, hunger, fatigue, nausea,', outcome: 'Organic imagery appeals to internal bodily sensations (thirst, hunger, fatigue, nausea, heartbeat).' },
                { text: 'fiery misery', outcome: 'Not quite — Students often think "imagery = only visual description" and "metaphor = any comparison".', reveals: 'imagery-only-visual-description-and' },
                { text: 'imagery = only visual description', outcome: 'Not quite — Students often think "imagery = only visual description" and "metaphor = any comparison".', reveals: 'imagery-only-visual-description-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Poets and Pancakes\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define \'situational irony\' in your own words and give ONE example from "Poets and Pancakes" where the outcome is the opposite of what.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is starkly different from', outcome: 'Situational irony occurs when the actual outcome of a situation is starkly different from what was.' },
                { text: 'funny coincidence', outcome: 'Not quite — Students often confuse **symbolism** with **metaphor** and treat every descriptive detail as.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Poets and Pancakes\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'List the seven key expressions from "Poets and Pancakes" that the NCERT textbook asks you to infer from context.', options: [
                { text: 'The seven expressions are: **blew over, was struck dumb, catapulted into, a coat of mail,', outcome: 'The seven expressions are: **blew over, was struck dumb, catapulted into, a coat of mail, played.' },
                { text: 'incandescent', outcome: 'Not quite — **Students believe "inferring from context" means guessing a synonym that *could* fit, rather than.', reveals: 'students-believe-inferring-from-context' },
                { text: 'hierarchy', outcome: 'Not quite — **Students believe "inferring from context" means guessing a synonym that *could* fit, rather than.', reveals: 'students-believe-inferring-from-context' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Poets and Pancakes\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the grammatical structure of the parenthetical remark in this sentence from the text: "Seeing me sitting at my desk tearing.', options: [
                { text: 'Correct answer: It is a **parenthetical clause** (a complete independent clause inserted', outcome: 'Correct answer: It is a **parenthetical clause** (a complete independent clause inserted as.' },
                { text: 'subordinate clause', outcome: 'Not quite — Students treat "grammar in literature" as **error-spotting** (finding "mistakes" like sentence.', reveals: 'students-treat-grammar-in-literature' },
                { text: 'appositive', outcome: 'Not quite — Students treat "grammar in literature" as **error-spotting** (finding "mistakes" like sentence.', reveals: 'students-treat-grammar-in-literature' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Poets and Pancakes\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question in the CBSE Class 12.', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "What brand of', outcome: 'A literal question asks for information directly stated in the text (e.g., "What brand of make-up.' },
                { text: 'questions based on the text', outcome: 'Not quite — Students believe inferential questions are "opinion-based" and write personal feelings ("I think.', reveals: 'inferential-questions-are-opinion-based' },
                { text: 'opinion-based', outcome: 'Not quite — Students believe inferential questions are "opinion-based" and write personal feelings ("I think.', reveals: 'inferential-questions-are-opinion-based' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a film-set internship you watch one staffer quietly solve everyone\'s crises — scripts, schedules, egos — while credits and praise flow to others. As the team lead you can act.',
            decisions: [{ prompt: 'What\'s the fair call?', options: [
                { text: 'Name his contribution and formalise the role — Subbu at Gemini Studios in \'Poets and Pancakes\' shows how indispensable problem-solvers get consumed while staying invisible.', outcome: 'Asokamitran\'s satire lands here: institutions run on unacknowledged fixers, and fairness means making that labour seen.' },
                { text: 'Keep loading him — someone that useful doesn\'t need titles.', outcome: 'That\'s exactly how studios spent Subbu; usefulness without recognition is quiet exploitation.', reveals: 'utility-equals-value' },
                { text: 'Resent him — he must be angling for the boss\'s chair.', outcome: 'The office-poet jealousy in the story shows how suspicion of a capable colleague says more about the insecure observer.', reveals: 'competence-read-as-threat' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear the joke under the deadpan — context is the punchline. This chapter trains the rarest reading skill: detecting irony without a single wink.',
            decisions: [{ prompt: 'What comes next? Poets and Pancakes · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Poets and Pancakes · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_007', difficulty: 'standard',
          question: 'Secondary themes in \'Poets and Pancakes\' — the supporting ideas and motifs that.',
          hint: 'If stuck, re-read the "Understanding the text" questions in the NCERT (especially Q2.',
          misconception: 'Students often treat **every recurring topic** as a theme. For example, they list "make-up," "pancake," "the office.',
          parts: [
                { id: 'a', prompt: 'Analyze how the Stephen Spender episode functions as a secondary theme.', answer: 'The secondary theme is **the chasm between Western literary elitism and Indian',
                  options: ['The secondary theme is **the chasm between Western literary elitism and Indian', 'confusing', 'hierarchy', 'hierarchy in the studio privileges proximity to the Boss over talent'],
                  hint: 'If stuck, re-read the "Understanding the text" questions in the NCERT (especially Q2 on Subbu, Q3.',
                  misconception: 'Students often treat **every recurring topic** as a theme. For example, they list "make-up," "pancake," "the office boy," "Subbu," "the.' }
          ],
            remediations: { 'students-often-treat-every-recurring': { steps: ['If a student lists subjects instead of themes: 1.', 'Ask them to pick one subject (e.g., "Subbu").', 'Have them write three sentences: "Subbu is...', 'The author shows that Subbu represents..." 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat **every recurring topic** as a theme. For example, they list "make-up," "pancake," "the office.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s stance toward the "khadi-clad poets" at Gemini Studios who "worshipped Gandhiji but beyond that they had not the faintest appreciation.', answer: 'The portrayal is **critically sympathetic**',
                  options: ['The portrayal is **critically sympathetic**', 'the author admires them', 'he mocks them', 'hierarchy'],
                  hint: 'If stuck, re-read the "Understanding the text" questions in the NCERT (especially Q2 on Subbu, Q3.',
                  misconception: 'Students often treat **every recurring topic** as a theme. For example, they list "make-up," "pancake," "the office boy," "Subbu," "the.' }
          ],
            remediations: { 'students-often-treat-every-recurring': { steps: ['If a student lists subjects instead of themes: 1.', 'Ask them to pick one subject (e.g., "Subbu").', 'Have them write three sentences: "Subbu is...', 'The author shows that Subbu represents..." 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_008', difficulty: 'standard',
          question: 'Imagery in \'Poets and Pancakes\' — the vivid, sensory language that creates.',
          hint: 'Review "tenor-vehicle-ground" framework in c11_eng_h_cbse_01_008 and sensory.',
          misconception: 'Students often think "imagery = only visual description" and "metaphor = any comparison".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery in \'Poets and Pancakes\'',
                  options: ['Imagery in \'Poets and Pancakes\'', '\'Poets and Pancakes\' (Flamingo, ch', 'The plot/narrative arc of \'Poets and Pancakes\'', 'The setting of \'Poets and Pancakes\''],
                  hint: 'Review "tenor-vehicle-ground" framework in c11_eng_h_cbse_01_008 and sensory classification chart.',
                  misconception: 'Students often think "imagery = only visual description" and "metaphor = any comparison".' }
          ],
            remediations: { 'imagery-only-visual-description-and': { steps: ['Re-read the make-up room paragraph (para 2) and the MRA visit paragraph (para 7) with a highlighter: mark every word.', 'For each highlight, label the sense (V/A/T/O/G/K/Org).', 'Revisit c11_eng_h_cbse_01_008 (Class 11 Hornbill Ch1 Literary Devices) and c11_eng_h_cbse_02_008 (Ch2) — do their.', 'Re-attempt Diagnostic Q1 and Q3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Poets and Pancakes\' — where opposite things are both.',
          hint: 'If stuck, review the irony table in c10_engl_cbse_01_005 (Lencho) and the symbolism.',
          misconception: 'Students often confuse **symbolism** with **metaphor** and treat every descriptive detail as a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'Poets and Pancakes\'',
                  options: ['Irony and paradox in \'Poets and Pancakes\'', '\'Poets and Pancakes\' (Flamingo, ch', 'The plot/narrative arc of \'Poets and Pancakes\'', 'The setting of \'Poets and Pancakes\''],
                  hint: 'If stuck, review the irony table in c10_engl_cbse_01_005 (Lencho) and the symbolism analysis.',
                  misconception: 'Students often confuse **symbolism** with **metaphor** and treat every descriptive detail as a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['If the student cannot distinguish symbol from setting detail: (1) Re-read the three paragraphs where Pancake appears.', '(2) List all objects mentioned in the chapter; for each, ask "Does the author return to this object to make a larger.', '(3) For irony: create a two-column table for each episode — Column A: "What the character expects / says"; Column.', 'If Column A and B are not opposites, it\'s not irony.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Poets and Pancakes\' — the words and phrases you must know.',
          hint: 'If stuck, review **c11_eng_h_cbse_01_010** (Vocabulary in Context: Key Words).',
          misconception: '**Students believe "inferring from context" means guessing a synonym that *could* fit, rather than the *specific*.',
          parts: [
                { id: 'a', prompt: 'Compare how *blew over* and *played into their hands* function differently in the chapter.', answer: '**Blew over** (para 2, about the actress): "An extremely talented actress',
                  options: ['**Blew over** (para 2, about the actress): "An extremely talented actress', 'idioms meaning something bad happened', 'inferring from context', 'surprised'],
                  hint: 'If stuck, review **c11_eng_h_cbse_01_010** (Vocabulary in Context: Key Words) — specifically the.',
                  misconception: '**Students believe "inferring from context" means guessing a synonym that *could* fit, rather than the *specific* meaning the author.' }
          ],
            remediations: { 'students-believe-inferring-from-context': { steps: ['**Re-read the specific paragraph** for the target expression (use the NCERT page references in the textbook).', '**Highlight the expression** and **circle 5 words before and after it** — these are your evidence.', '**Classify the clue type** (definition/synonym/antonym/example/inference).', '**Write a one-sentence deduction**: "Because the text says X, the expression must mean Y." 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_011', difficulty: 'standard',
          question: 'Language and style in \'Poets and Pancakes\' — how the writer chose words.',
          hint: 'If stuck on clause types → review c6_english_u4_038 (Sentence Structure).',
          misconception: 'Students treat "grammar in literature" as **error-spotting** (finding "mistakes" like sentence fragments or tense.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language and style in \'Poets and Pancakes\'',
                  options: ['Language and style in \'Poets and Pancakes\'', '\'Poets and Pancakes\' (Flamingo, ch', 'The plot/narrative arc of \'Poets and Pancakes\'', 'The setting of \'Poets and Pancakes\''],
                  hint: 'If stuck on clause types → review c6_english_u4_038 (Sentence Structure).',
                  misconception: 'Students treat "grammar in literature" as **error-spotting** (finding "mistakes" like sentence fragments or tense shifts) rather than.' }
          ],
            remediations: { 'students-treat-grammar-in-literature': { steps: ['If a student cannot distinguish stylistic grammar from errors: (1) Give them two versions of a workplace anecdote — one.', '(2) Map each difference to a textual example from "Poets and Pancakes" (e.g., WhatsApp "they say" → text\'s "was.', '(3) Have them rewrite the formal report into WhatsApp style using *only* grammatical changes (no vocabulary swaps).', '(4) Re-diagnose with Diagnostic Question 3: if they still add features mechanically without rhythm, drill the *prosody*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_06_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Poets and Pancakes\' — questions answered straight.',
          hint: 'If stuck, re-read the "office boy," "Subbu," and "legal adviser" character sections.',
          misconception: 'Students believe inferential questions are "opinion-based" and write personal feelings ("I think the office boy was.',
          parts: [
                { id: 'a', prompt: 'The text states: "Subbu was the No. 2 at Gemini Studios. He couldn\'t have had a more encouraging opening in films than our grown-up make-up boy had." Based.', answer: 'The office boy perceived Subbu\'s success as unfair',
                  options: ['The office boy perceived Subbu\'s success as unfair', 'Subbu was more talented', 'opinion-based', 'I think the office boy was jealous'],
                  hint: 'If stuck, re-read the "office boy," "Subbu," and "legal adviser" character sections (nodes 004.',
                  misconception: 'Students believe inferential questions are "opinion-based" and write personal feelings ("I think the office boy was jealous") instead.' },
                { id: 'b', prompt: 'Analyze the following two questions from the NCERT \'Understanding the text\' section and classify each as literal (L) or inferential (I), justifying your.', answer: 'Q1 is Literal (L)',
                  options: ['Q1 is Literal (L)', 'listing multiple explicit points', 'deriving implicit meaning', 'opinion-based'],
                  hint: 'If stuck, re-read the "office boy," "Subbu," and "legal adviser" character sections (nodes 004.',
                  misconception: 'Students believe inferential questions are "opinion-based" and write personal feelings ("I think the office boy was jealous") instead.' }
          ],
            remediations: { 'inferential-questions-are-opinion-based': { steps: ['If a student cannot distinguish literal vs inferential or writes opinion-based inferences: 1.', 'Have them re-read the "office boy\'s frustration" passage (paragraphs 4-5) and highlight every explicit fact about the.', 'Ask: "Which of these highlighted facts explain WHY he was angry?', 'Which facts did you have to COMBINE to get the reason?" This makes the inference process visible.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
