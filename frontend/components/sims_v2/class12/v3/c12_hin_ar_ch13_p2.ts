import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch13_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch13_p2',
    title: 'ckck lkgsc Hkhejko · Part 2/3',
    subtitle: 'The king knew his name; the new order didn\'t',
    classLevel: 12, subject: 'hin_ar', topic: 'ckck lkgsc Hkhejko · Part 2/3',
    chapters: ['c12_hin_ar_ch13'],
    nodeIds: ['c12_hin_ar_cbse_13_007', 'c12_hin_ar_cbse_13_008', 'c12_hin_ar_cbse_13_009', 'c12_hin_ar_cbse_13_010', 'c12_hin_ar_cbse_13_011', 'c12_hin_ar_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental-fiction reader', intro: 'A folk singer\'s world ran on patronage and memory. Then the rules changed — and rules don\'t remember anyone.', goal: 'Read Dwivedi\'s story as the collision of feudal patronage and institutional modernity through a folk artist\'s fate.' },
    discovery: {
        question: 'A folk singer thrives under a king\'s patronage — then a new system of laws arrives that recognises neither his art nor his claim. What actually changed?',
        options: ['Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority', 'Just the ruler changed', 'The singer lost his voice', 'Art became free'],
        answer: 'Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority',
        hook: 'Dwivedi pioneered experimental fiction in Hindi — folk speech, oral rhythm, the lives of common people rendered with documentary warmth. The story isn\'t nostalgia for kings; it stages the collision where \'the system\' replaced \'the sovereign\' — and nobody told the artist.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the supporting ideas, conflicts, or motifs that run parallel to the primary theme in a literary work, enriching the narrative by exploring related social, psychological,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_13_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Watch a folk artist meet the new order: weigh the king\'s court against bureaucratic law, track how art becomes \'profession\' under pressure, and find where dignity survives the transition.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are sitting in a crowded village fair (मेला) — you hear the loud, reedy blast of a shehnai (शहनाई) cutting through the noise, you smell frying.',
            decisions: [{ prompt: 'Define \'Imagery\' (चित्रात्मकता) in literature and list its five types corresponding to the five senses.', options: [
                { text: 'Imagery is the use of descriptive language that appeals to the senses to create mental', outcome: 'Imagery is the use of descriptive language that appeals to the senses to create mental pictures.' },
                { text: 'the fair was noisy', outcome: 'Not quite — **Misconception:** "Imagery is just \'beautiful description\' and Metaphor is just \'fancy comparison\'.', reveals: 'misconception-imagery-is-just-beautiful' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading "इग्योकु की क्षयद" and hit the word "क्षयद" in the very first sentence.',
            decisions: [{ prompt: 'What is the primary purpose of using context clues when encountering an unfamiliar word in a literary text?', options: [
                { text: 'The primary purpose is to infer the word\'s meaning from the surrounding text', outcome: 'The primary purpose is to infer the word\'s meaning from the surrounding text — such as synonyms.' },
                { text: 'to memorize the word for the exam', outcome: 'Not quite — Students often believe that **every unfamiliar word must be looked up in a dictionary.', reveals: 'every-unfamiliar-word-must-be' },
                { text: 'last resort', outcome: 'Not quite — Students often believe that **every unfamiliar word must be looked up in a dictionary.', reveals: 'every-unfamiliar-word-must-be' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading "Igyok ki Siddh" and notice the flute sounds written as "पँ–इक्क, फँ–इक्क" and the villagers\' speech full of words like "बाफ़र" and.',
            decisions: [{ prompt: 'Identify the term used in the NCERT textbook for words that are specific to a particular topic, region, or occasion (e.g., words related.', options: [
                { text: 'The term is **fof\'k"V \'kCn** (विशिष्ट शब्दावली / specialized vocabulary)', outcome: 'The term is **fof\'k"V \'kCn** (विशिष्ट शब्दावली / specialized vocabulary).' },
                { text: 'tatpurush samas', outcome: 'Not quite — Students treat "language usage" questions as **vocabulary listing exercises** — they copy dialect.', reveals: 'students-treat-language-usage-questions' },
                { text: 'kriya visheshan', outcome: 'Not quite — Students treat "language usage" questions as **vocabulary listing exercises** — they copy dialect.', reveals: 'students-treat-language-usage-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A folk singer from your district gets signed by a big label that drops her dialect, renames her, and reworks her songs into a commercial formula. Two years later she returns to perform in a hometown she barely recognises — and only family gathers to listen.',
            decisions: [{ prompt: 'How does \'युगुक की ढोलकी\' / the flautist\'s tale frame her trajectory?', options: [
                { text: 'As ironic return — the village flautist\'s music was the community\'s lifeblood until court patronage lifted him out; he comes back to a transformed village where his art survives only as a private act for grandchildren — the circle closes but the commons is gone.', outcome: 'The chapter\'s structural point is that the ending mirrors the opening with the centre shifted: patronage didn\'t just elevate the artist, it displaced the audience — her homecoming performance is the same image, emptied.' },
                { text: 'As a success story — she gained a platform the village could never give her, so the arc is upward.', outcome: 'That reads the rise and skips the resolution\'s irony: the flautist also \'rose\' to court, and the story counts what the rise cost — a village waking to sirens instead of music isn\'t the same audience at a new address.', reveals: 'platform-equals-progress' },
                { text: 'As proof she should never have left — artists who take patronage are sellouts.', outcome: 'The story doesn\'t damn the move; it mourns the structural change — the new order that renamed the village and industrialised its rhythm. The artist didn\'t sell the community; the ground under it was sold around both.', reveals: 'patronage-equals-betrayal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a period story as a study of systems changing — and spot the person caught between the old legitimacy and the new.',
            decisions: [{ prompt: 'What comes next? ckck lkgsc Hkhejko · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — ckck lkgsc Hkhejko · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_007', difficulty: 'standard',
          question: 'Secondary themes are the supporting ideas, conflicts, or motifs that run.',
          hint: 'If stuck, review node c12_hin_ar_cbse_13_006 (Primary Theme) and create a two-column.',
          misconception: 'Students treat secondary themes as "minor themes" — less important ideas that can be listed like inventory items.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "tradition vs. modernity" as a secondary theme to analyze the scene where Igyoku\'s sons learn music differently than he did.', answer: 'Igyoku learned through oral tradition, rigorous discipline, and lived immersion',
                  options: ['Igyoku learned through oral tradition, rigorous discipline, and lived immersion', 'old vs new teaching'],
                  hint: 'If stuck, review node c12_hin_ar_cbse_13_006 (Primary Theme) and create a two-column table: Column.',
                  misconception: 'Students treat secondary themes as "minor themes" — less important ideas that can be listed like inventory items.' },
                { id: 'b', prompt: 'Analyze how the secondary theme of "art as collective memory vs.', answer: 'In the opening, Igyoku\'s training serves the collective',
                  options: ['In the opening, Igyoku\'s training serves the collective', 'he teaches them differently'],
                  hint: 'If stuck, review node c12_hin_ar_cbse_13_006 (Primary Theme) and create a two-column table: Column.',
                  misconception: 'Students treat secondary themes as "minor themes" — less important ideas that can be listed like inventory items.' }
          ],
            remediations: { 'students-treat-secondary-themes-as': { steps: ['If a student lists themes statically: Step 1 — Have them reread only the three turning-point scenes (childhood.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat secondary themes as "minor themes" — less important ideas that can be listed like inventory items.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The secondary theme of \'folk art\'s resilience\' is more hopeful than the primary theme of \'artist vs.', answer: 'The claim is partially valid but incomplete',
                  options: ['The claim is partially valid but incomplete', 'purely hopeful'],
                  hint: 'If stuck, review node c12_hin_ar_cbse_13_006 (Primary Theme) and create a two-column table: Column.',
                  misconception: 'Students treat secondary themes as "minor themes" — less important ideas that can be listed like inventory items.' }
          ],
            remediations: { 'students-treat-secondary-themes-as': { steps: ['If a student lists themes statically: Step 1 — Have them reread only the three turning-point scenes (childhood.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_008', difficulty: 'standard',
          question: 'Imagery (चित्रात्मकता) refers to the use of vivid and descriptive language that.',
          hint: 'If stuck on tenor/vehicle/ground: Review Class 11 Hindi Aroh Chapter 13.',
          misconception: '**Misconception:** "Imagery is just \'beautiful description\' and Metaphor is just \'fancy comparison\' — both are.',
          parts: [
                { id: 'a', prompt: 'In the scene where Yaqub Ali plays at the circus (नैक्सी), the narrator describes: "नक्सी में शहनाई की वादन वादन... याकूब अली की शहनाई *बोल* उठी".', answer: 'Metaphor: "शहनाई बोल उठी" (the shehnai spoke)',
                  options: ['Metaphor: "शहनाई बोल उठी" (the shehnai spoke)', 'Yaqub Ali', 'the shehnai\'s sound'],
                  hint: 'If stuck on tenor/vehicle/ground: Review Class 11 Hindi Aroh Chapter 13 (c11_hin_ar_cbse_13_008).',
                  misconception: '**Misconception:** "Imagery is just \'beautiful description\' and Metaphor is just \'fancy comparison\' — both are decorative ornaments added.' }
          ],
            remediations: { 'misconception-imagery-is-just-beautiful': { steps: ['If a student cannot distinguish imagery types or identify tenor/vehicle/ground: 1.', '**Revisit Class 11 node c11_hin_ar_cbse_13_008** (Literary Devices: Imagery and Metaphor) — re-do the \'sensory mapping\'.', '**Use a 3-column table** for any passage: Column 1 = Quote, Column 2 = Sense triggered, Column 3 = Effect on reader.', 'Practice with the opening paragraph of "Igayoku ki <ksyd".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_009', difficulty: 'standard',
          question: 'Irony (व्यंग्य/विडंबना) is a literary device where the intended meaning.',
          hint: 'If unable to separate literal vs. symbolic level, practice with a familiar fable (e.g.',
          misconception: 'Students often confuse *symbolism* with *metaphor* (covered in previous node) and treat every object as a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony (व्यंग्य/विडंबना) is a literary device where the intended meaning of words or',
                  options: ['Irony (व्यंग्य/विडंबना) is a literary device where the intended meaning of words or', '"Before You Read: Context and Background" is a pre-reading section that provides', 'Plot and narrative structure refer to the sequence of events (plot) and the technique', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If unable to separate literal vs. symbolic level, practice with a familiar fable (e.g., "The Golden.',
                  misconception: 'Students often confuse *symbolism* with *metaphor* (covered in previous node) and treat every object as a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Revisit node **c12_hin_ar_cbse_13_008** (Imagery and Metaphor) to re-learn the distinction: metaphor = direct.', 'Re-read the three parrot scenes (gift, cage, escape) and complete a two-column table: Column A = literal event; Column.', 'Attempt Diagnostic Question 4 again with the table.', 'If still stuck, review Class 11 node **c11_hin_ar_cbse_13_009** for foundational irony/symbolism definitions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the meaning of unfamiliar.',
          hint: 'If stuck, revisit **c11_hin_ar_cbse_13_010** (Class 11 Vocabulary in Context) and re-do.',
          misconception: 'Students often believe that **every unfamiliar word must be looked up in a dictionary immediately**, and that context.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of using context clues when encountering an unfamiliar word in a literary text?', answer: 'The primary purpose is to infer the word\'s meaning from the surrounding text',
                  options: ['The primary purpose is to infer the word\'s meaning from the surrounding text', 'to memorize the word for the exam', 'last resort'],
                  hint: 'If stuck, revisit **c11_hin_ar_cbse_13_010** (Class 11 Vocabulary in Context) and re-do the three.',
                  misconception: 'Students often believe that **every unfamiliar word must be looked up in a dictionary immediately**, and that context clues are only.' }
          ],
            remediations: { 'every-unfamiliar-word-must-be': { steps: ['Have the student re-read the **first two pages of the chapter** and highlight every word they cannot define.', 'For each highlighted word, guide them to **write the two preceding and two following sentences** on a separate sheet.', 'Ask them to **circle any repeated nouns, adjectives, or contrast words** (e.g., "लेकिन", "परंतु", "जैसे") that relate.', 'Finally, have them **write a one-sentence hypothesis** for each word and only then check a dictionary.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic analysis of how.',
          hint: 'If stuck, revisit the concept of "register" (क्षेत्र/प्रसंगानुसार भाषा-प्रयोग) from Class.',
          misconception: 'Students treat "language usage" questions as **vocabulary listing exercises** — they copy dialect words from the text.',
          parts: [
                { id: 'a', prompt: 'Identify the term used in the NCERT textbook for words that are specific to a particular topic, region, or occasion (e.g., words related to agriculture.', answer: 'The term is **fof\'k"V \'kCn** (विशिष्ट शब्दावली / specialized vocabulary)',
                  options: ['The term is **fof\'k"V \'kCn** (विशिष्ट शब्दावली / specialized vocabulary)', 'tatpurush samas', 'kriya visheshan'],
                  hint: 'If stuck, revisit the concept of "register" (क्षेत्र/प्रसंगानुसार भाषा-प्रयोग) from Class 11.',
                  misconception: 'Students treat "language usage" questions as **vocabulary listing exercises** — they copy dialect words from the text and give dictionary.' }
          ],
            remediations: { 'students-treat-language-usage-questions': { steps: ['Take a single paragraph from the story (e.g., the fair scene).', 'Highlight every word/phrase that feels "non-textbook".', 'For each, ask: "What would standard Hindi use here?" 4.', 'Write the standard version beside it.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve information.',
          hint: 'If stuck, return to c11_hin_ar_cbse_01_012 and practice the "Highlight & Label" exercise.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कौन, क्या, कब, कहाँ" वाले प्रश्न हमेशा शाब्दिक होते हैं और "क्यों, कैसे" वाले.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Literal comprehension questions require students to retrieve information explicitly',
                  options: ['Literal comprehension questions require students to retrieve information explicitly', '"Before You Read: Context and Background" is a pre-reading section that provides', 'Plot and narrative structure refer to the sequence of events (plot) and the technique', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_01_012 and practice the "Highlight & Label" exercise: take any.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कौन, क्या, कब, कहाँ" वाले प्रश्न हमेशा शाब्दिक होते हैं और "क्यों, कैसे" वाले हमेशा निहितार्थ।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को पाठ के किसी भी अनुच्छेद से 3 शाब्दिक और 3 निहितार्थ प्रश्न स्वयं बनाने को कहें। **चरण 2:** प्रत्येक.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
