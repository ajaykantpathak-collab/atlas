import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch07_p1: SimDef = {
    id: 'v3_c10_engl_ch07_p1',
    title: 'Madam Rides the Bus · Part 1/2',
    subtitle: 'Follow an eight-year-old\'s master plan for one bus ride',
    classLevel: 10, subject: 'engl', topic: 'Madam Rides the Bus · Part 1/2',
    chapters: ['c10_engl_ch07'],
    nodeIds: ['c10_engl_cbse_07_001', 'c10_engl_cbse_07_002', 'c10_engl_cbse_07_003', 'c10_engl_cbse_07_004', 'c10_engl_cbse_07_005', 'c10_engl_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biographer reconstructing how a child out-planned the adults', intro: 'Every day a bright bus roars past Valli\'s house toward a town she\'s never seen. Most kids would whine for a ride. Valli starts gathering intelligence instead.', goal: 'Show how the author builds character through indirect detail — observation, sacrifice, discretion — not just plot.' },
    discovery: {
        question: 'Eight-year-old Valli rides the bus to town and back — alone. She never does chores for cash, never asks the conductor directly. So how did she pull it off?',
        options: ['Months of resisting peppermints and toys to save sixty paise — plus fare and timing details lifted from eavesdropping', 'She saved gift money and boldly questioned the driver about the route', 'She snuck aboard while the conductor was distracted', 'Her mother secretly funded the trip as a surprise'],
        answer: 'Months of resisting peppermints and toys to save sixty paise — plus fare and timing details lifted from eavesdropping',
        hook: 'This isn\'t childish daydreaming — it\'s a project. Every coin refused, every adult conversation mined for clues. Valli planned her ride like a heist.',
    },
    teaching: [
        { title: 'Valli: An Eight-Year-Old\'s Curiosity About the Bus Journey', text: 'This node introduces Valli, an eight-year-old girl whose intense curiosity about the bus that passes her village daily becomes the driving force of the narrative.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Piece together Valli\'s intelligence operation — what she overheard, what she sacrificed, what she refused — then write the case for her \'tiny wish\' being iron will.',
        labels: ['Valli: An Eight-Year-Old\'s Curiosity', 'Valli\'s Planning: Saving Money', 'Valli\'s First Bus Ride', 'Valli\'s Encounter with', 'Valli\'s Refusal to Leave', 'Theme: Growing Up, Curiosity'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_07_001', title: 'Valli: An Eight-Year-Old\'s Curiosity About the Bus Journey',
          caseStudy: { intro: 'Imagine you are eight years old and every day at the same time, a bright colorful bus roars past your house — where does it go? Who sits inside?',
            decisions: [{ prompt: 'How old is Valli, and what is the one thing she does every day that shows her fascination with the bus?', options: [
                { text: 'Valli is eight years old', outcome: 'Valli is eight years old. Every day she stands at her front doorway and watches the bus that.' },
                { text: 'she plays near the bus stop', outcome: 'Not quite — Students consistently mistake Valli\'s curiosity for simple childish fascination — "she likes the.', reveals: 'students-consistently-mistake-valli-s' },
                { text: 'she asks her mother about the bus', outcome: 'Not quite — Students consistently mistake Valli\'s curiosity for simple childish fascination — "she likes the.', reveals: 'students-consistently-mistake-valli-s' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_07_002', title: 'Valli\'s Planning: Saving Money and Gathering Information About the Bus',
          caseStudy: { intro: 'Imagine you want to visit a nearby town fair but have only pocket money and no adult to guide you. What would you do first?',
            decisions: [{ prompt: 'What are the two main components of Valli\'s planning for her bus ride, as described in the story?', options: [
                { text: 'The two main components are saving money (by resisting temptations like peppermints,', outcome: 'The two main components are saving money (by resisting temptations like peppermints, toys, and the.' },
                { text: 'she asked her mother for money', outcome: 'Not quite — Students often believe Valli saved money by doing extra chores or receiving gifts, and that she.', reveals: 'valli-saved-money-by-doing' },
                { text: 'mentions only one component or adds unrelated details (e', outcome: 'Not quite — Students often believe Valli saved money by doing extra chores or receiving gifts, and that she.', reveals: 'valli-saved-money-by-doing' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_07_003', title: 'Valli\'s First Bus Ride: The Experience and the Conductor\'s Role',
          caseStudy: { intro: 'Imagine you\'re standing at a bus stop for the first time alone, heart pounding — what do you notice first?',
            decisions: [{ prompt: 'What is the conductor\'s first reaction when Valli tries to board the bus, and what does he call her?', options: [
                { text: 'The conductor initially jokes, "Oh, please don\'t be angry with me, madam," and helps her', outcome: 'The conductor initially jokes, "Oh, please don\'t be angry with me, madam," and helps her board.' },
                { text: 'he ignores her', outcome: 'Not quite — Students think the conductor\'s "madam" is only a joke because he smiles.', reveals: 'the-conductor-s-madam-is' },
                { text: 'he scolds her', outcome: 'Not quite — Students think the conductor\'s "madam" is only a joke because he smiles.', reveals: 'the-conductor-s-madam-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_07_004', title: 'Valli\'s Encounter with the Dead Cow: Understanding Death',
          caseStudy: { intro: 'Imagine you\'re Valli, eight years old, buzzing with the thrill of your first solo bus ride — you\'ve seen a live cow gallop alongside the bus, its tail high.',
            decisions: [{ prompt: 'What is the immediate difference in Valli\'s reaction when she sees the live cow on the onward journey versus the dead cow on the return.', options: [
                { text: 'On the onward journey, Valli claps her hands with glee and laughs aloud at the live cow', outcome: 'On the onward journey, Valli claps her hands with glee and laughs aloud at the live cow running.' },
                { text: 'she cries', outcome: 'Not quite — Students often treat the dead cow as just "a sad part" and write answers like "Valli felt bad.', reveals: 'students-often-treat-the-dead' },
                { text: 'she tells the conductor', outcome: 'Not quite — Students often treat the dead cow as just "a sad part" and write answers like "Valli felt bad.', reveals: 'students-often-treat-the-dead' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_07_005', title: 'Valli\'s Refusal to Leave the Bus: Independence and Determination',
          caseStudy: { intro: 'Imagine you are eight years old and have just completed a journey you planned meticulously — saved money, gathered information, and travelled alone.',
            decisions: [{ prompt: 'What is the exact reason Valli gives the conductor for not getting off the bus at the town?', options: [
                { text: 'Valli says, "I don\'t want to go anywhere', outcome: 'Valli says, "I don\'t want to go anywhere... I came only for the bus ride." A wrong answer (e.g.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often interpret Valli\'s refusal as fear of the unknown town or rudeness to the conductor.', reveals: 'students-often-interpret-valli-s' },
                { text: 'She had no money', outcome: 'Not quite — Students often interpret Valli\'s refusal as fear of the unknown town or rudeness to the conductor.', reveals: 'students-often-interpret-valli-s' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_07_006', title: 'Theme: Growing Up, Curiosity and the Loss of Innocence',
          caseStudy: { intro: 'Imagine you are eight years old and you see a bright bus passing your street every day — you wonder where it goes, what it feels like inside, and you.',
            decisions: [{ prompt: 'What is the central theme of *Madam Rides the Bus* as it relates to Valli’s character development?', options: [
                { text: 'The central theme is the loss of innocence through curiosity-driven experience', outcome: 'The central theme is the loss of innocence through curiosity-driven experience; Valli’s bus ride.' },
                { text: 'curiosity', outcome: 'Not quite — Students often treat “curiosity,” “growing up,” and “loss of innocence” as three separate themes.', reveals: 'students-often-treat-curiosity' },
                { text: 'growing up', outcome: 'Not quite — Students often treat “curiosity,” “growing up,” and “loss of innocence” as three separate themes.', reveals: 'students-often-treat-curiosity' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An eight-year-old neighbour girl has saved every coin for months, memorised bus timings from watching the stop, and can tell you the fare to town to the last paisa — all for a solo ride she has been quietly planning. Her mother laughs it off as \'naughty scheming.\'',
            decisions: [{ prompt: 'Reading Valli in \'Madam Rides the Bus\', how should we see this child\'s behaviour?', options: [
                { text: 'As intelligence at work, not mere disobedience — like Valli, the girl\'s \'overwhelming\' curiosity drove her to observe, ask questions, save resources and plan carefully. The same drive that adults call nosiness is what lets a child turn a wish into a workable plan.', outcome: 'The chapter portrays Valli\'s curiosity as a thinking faculty — she gathered details, calculated fares and waited for the right moment. Curiosity plus preparation is exactly how independent action becomes possible.' },
                { text: 'It is simply disobedience — a child plotting anything in secret is doing wrong and the savings should be confiscated.', outcome: 'The story complicates that verdict — Valli\'s secret trip showed planning, restraint (she refused treats to save her return fare) and self-reliance; the behaviour deserves guidance, not just blame.', reveals: 'curiosity-is-disobedience' },
                { text: 'It is harmless daydreaming — children who plan such things never actually carry them out.', outcome: 'Valli did carry hers out — she boarded the bus alone and managed the whole journey; underestimating a determined child is how adults get surprised.', reveals: 'kids-never-follow-through' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'The bus was never the point — the self-control was. An eight-year-old who can resist a hundred peppermints can get almost anywhere.',
            decisions: [{ prompt: 'What comes next? Madam Rides the Bus · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Madam Rides the Bus · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_07_001', difficulty: 'standard',
          question: 'This node introduces Valli, an eight-year-old girl whose intense curiosity.',
          hint: 'Review "Show, Don\'t Tell" in character writing (Class 6 Writing: Creative and Imaginative.',
          misconception: 'Students consistently mistake Valli\'s curiosity for simple childish fascination — "she likes the bus because it\'s big.',
          parts: [
                { id: 'a', prompt: 'How old is Valli, and what is the one thing she does every day that shows her fascination with the bus?', answer: 'Valli is eight years old',
                  options: ['Valli is eight years old', 'she plays near the bus stop', 'she asks her mother about the bus'],
                  hint: 'Review "Show, Don\'t Tell" in character writing (Class 6 Writing: Creative and Imaginative Writing.',
                  misconception: 'Students consistently mistake Valli\'s curiosity for simple childish fascination — "she likes the bus because it\'s big and colourful." They.' },
                { id: 'b', prompt: 'In your own words, explain why the bus journey fascinates Valli more than anything else in her daily life.', answer: 'The bus represents the unknown world beyond her village',
                  options: ['The bus represents the unknown world beyond her village', 'the bus is colourful', 'she likes vehicles'],
                  hint: 'Review "Show, Don\'t Tell" in character writing (Class 6 Writing: Creative and Imaginative Writing.',
                  misconception: 'Students consistently mistake Valli\'s curiosity for simple childish fascination — "she likes the bus because it\'s big and colourful." They.' }
          ],
            remediations: { 'students-consistently-mistake-valli-s': { steps: ['Re-read the first three paragraphs aloud.', 'Circle every verb associated with Valli (watched, stared, listened, calculated, planned, asked).', 'Sort these verbs into two columns: "Passive" (watched, stared) and "Active" (calculated, planned, asked).', 'Write one sentence: "Valli\'s curiosity is active because she ______." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently mistake Valli\'s curiosity for simple childish fascination — "she likes the bus because it\'s big.',
          parts: [
                { id: 'a', prompt: '"Valli\'s curiosity is a sign of intelligence, not just childish wonder." Defend or challenge this statement using two pieces of evidence from the text.', answer: 'Defend',
                  options: ['Defend', 'she really wanted to go', 'she was excited'],
                  hint: 'Review "Show, Don\'t Tell" in character writing (Class 6 Writing: Creative and Imaginative Writing.',
                  misconception: 'Students consistently mistake Valli\'s curiosity for simple childish fascination — "she likes the bus because it\'s big and colourful." They.' }
          ],
            remediations: { 'students-consistently-mistake-valli-s': { steps: ['Re-read the first three paragraphs aloud.', 'Circle every verb associated with Valli (watched, stared, listened, calculated, planned, asked).', 'Sort these verbs into two columns: "Passive" (watched, stared) and "Active" (calculated, planned, asked).', 'Write one sentence: "Valli\'s curiosity is active because she ______." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_07_002', difficulty: 'standard',
          question: 'Valli\'s planning refers to the deliberate, step-by-step process undertaken.',
          hint: 'Review "Character Analysis: Jahnavi" (c6_english_u1_002) and "Character Analysis: Suraj".',
          misconception: 'Students often believe Valli saved money by doing extra chores or receiving gifts, and that she gathered information.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Valli\'s planning refers to the deliberate, step-by-step process undertaken by the',
                  options: ['Valli\'s planning refers to the deliberate, step-by-step process undertaken by the', 'This node introduces Valli, an eight-year-old girl whose intense curiosity about the bus', 'This topic examines Valli\'s sensory and emotional journey during her first bus ride in', 'Valli\'s encounter with the dead cow is a pivotal narrative moment in "Madam Rides the'],
                  hint: 'Review "Character Analysis: Jahnavi" (c6_english_u1_002) and "Character Analysis: Suraj".',
                  misconception: 'Students often believe Valli saved money by doing extra chores or receiving gifts, and that she gathered information by boldly asking the.' }
          ],
            remediations: { 'valli-saved-money-by-doing': { steps: ['Re-read the paragraphs describing Valli\'s savings ("day after day she saved...") and her information gathering ("she.', 'Make a two-column table: left column "What she gave up", right column "What she learned".', 'Fill it with exact textual phrases.', 'Role-play: ask the student to pretend they are Valli and explain to a friend how they got the bus details without.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_07_003', difficulty: 'standard',
          question: 'This topic examines Valli\'s sensory and emotional journey during her first bus.',
          hint: 'Review c10_engl_cbse_07_002 for the 30-paise constraint and c9_engl_ch1_2 for the.',
          misconception: 'Students think the conductor\'s "madam" is only a joke because he smiles.',
          parts: [
                { id: 'a', prompt: 'Compare Valli\'s observation of the "green, green, green" landscape with her reaction to the dead cow later (node c10_engl_cbse_07_004).', answer: 'The initial "green" repetition shows childlike wonder and absorption in beauty',
                  options: ['The initial "green" repetition shows childlike wonder and absorption in beauty', 'the conductor\'s "madam" is only a joke'],
                  hint: 'Review c10_engl_cbse_07_002 for the 30-paise constraint and c9_engl_ch1_2 for the.',
                  misconception: 'Students think the conductor\'s "madam" is only a joke because he smiles.' }
          ],
            remediations: { 'the-conductor-s-madam-is': { steps: ['Re-read the boarding scene aloud, highlighting every "madam" with a different coloured pen for tone (playful →.', 'Write a 2-column table: Column A = Conductor\'s exact words; Column B = Valli\'s action triggering that line.', 'Orally explain to a peer: "He starts joking because she\'s a child acting adult; he ends respectful because she proves.', 'Attempt Diagnostic Question 3 again using the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_07_004', difficulty: 'standard',
          question: 'Valli\'s encounter with the dead cow is a pivotal narrative moment in "Madam.',
          hint: 'If stuck, re-read the two cow paragraphs in the NCERT text and complete the side-by-side.',
          misconception: 'Students often treat the dead cow as just "a sad part" and write answers like "Valli felt bad because the cow died.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Valli\'s encounter with the dead cow is a pivotal narrative moment in "Madam Rides the',
                  options: ['Valli\'s encounter with the dead cow is a pivotal narrative moment in "Madam Rides the', 'This node introduces Valli, an eight-year-old girl whose intense curiosity about the bus', 'Valli\'s planning refers to the deliberate, step-by-step process undertaken by the', 'This topic examines Valli\'s sensory and emotional journey during her first bus ride in'],
                  hint: 'If stuck, re-read the two cow paragraphs in the NCERT text and complete the side-by-side contrast.',
                  misconception: 'Students often treat the dead cow as just "a sad part" and write answers like "Valli felt bad because the cow died." This misses the.' }
          ],
            remediations: { 'students-often-treat-the-dead': { steps: ['Have the student re-read only the two cow paragraphs side-by-side (onward vs.', 'Ask: "What *exact* word changes? (frisky → sprawled, tail high → legs stiff, laughter → silence)"', 'Co-construct a PEEL paragraph together: Point (contrast shows loss of innocence), Evidence (two quotes), Explanation.', 'Student writes it alone with a different theme (e.g., "journey as teacher").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_07_005', difficulty: 'standard',
          question: 'Valli\'s refusal to leave the bus at the town terminus is a pivotal character.',
          hint: 'Review "Character Analysis: Valli as a Determined and Observant Child".',
          misconception: 'Students often interpret Valli\'s refusal as fear of the unknown town or rudeness to the conductor.',
          parts: [
                { id: 'a', prompt: 'What is the exact reason Valli gives the conductor for not getting off the bus at the town?', answer: 'Valli says, "I don\'t want to go anywhere',
                  options: ['Valli says, "I don\'t want to go anywhere', 'A wrong answer (e.g', 'She had no money'],
                  hint: 'Review "Character Analysis: Valli as a Determined and Observant Child" (c10_engl_cbse_07_007) for.',
                  misconception: 'Students often interpret Valli\'s refusal as fear of the unknown town or rudeness to the conductor.' },
                { id: 'b', prompt: 'Explain in your own words why Valli\'s refusal to explore the town is an act of independence rather than mere stubbornness.', answer: 'Independence means making a choice based on one\'s own purpose',
                  options: ['Independence means making a choice based on one\'s own purpose', 'stubborn', 'afraid'],
                  hint: 'Review "Character Analysis: Valli as a Determined and Observant Child" (c10_engl_cbse_07_007) for.',
                  misconception: 'Students often interpret Valli\'s refusal as fear of the unknown town or rudeness to the conductor.' }
          ],
            remediations: { 'students-often-interpret-valli-s': { steps: ['Re-read the town-terminus dialogue aloud, highlighting every word Valli speaks.', 'Ask: "What was Valli\'s goal before she left home?" (Answer: to ride the bus).', 'Match each of her lines to that goal.', 'Write one PEEL paragraph using only the highlighted lines as evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_07_006', difficulty: 'standard',
          question: 'The theme "Growing Up, Curiosity and the Loss of Innocence" in *Madam Rides the.',
          hint: 'If stuck, review c10_engl_cbse_07_004 (Valli\'s Encounter with the Dead Cow) and practice.',
          misconception: 'Students often treat “curiosity,” “growing up,” and “loss of innocence” as three separate themes and write three.',
          parts: [
                { id: 'a', prompt: 'What is the central theme of *Madam Rides the Bus* as it relates to Valli’s character development?', answer: 'The central theme is the loss of innocence through curiosity-driven experience',
                  options: ['The central theme is the loss of innocence through curiosity-driven experience', 'curiosity', 'growing up'],
                  hint: 'If stuck, review c10_engl_cbse_07_004 (Valli\'s Encounter with the Dead Cow) and practice PEEL with.',
                  misconception: 'Students often treat “curiosity,” “growing up,” and “loss of innocence” as three separate themes and write three disconnected paragraphs.' },
                { id: 'b', prompt: 'Compare Valli’s attitude at the start of the bus ride (looking out at the canal, trees, etc.) with her attitude on the return journey after seeing the dead.', answer: 'Initially Valli is exhilarated, calling the scenery “wonderful” and “beautiful”',
                  options: ['Initially Valli is exhilarated, calling the scenery “wonderful” and “beautiful”', 'she was happy then sad'],
                  hint: 'If stuck, review c10_engl_cbse_07_004 (Valli\'s Encounter with the Dead Cow) and practice PEEL with.',
                  misconception: 'Students often treat “curiosity,” “growing up,” and “loss of innocence” as three separate themes and write three disconnected paragraphs.' }
          ],
            remediations: { 'students-often-treat-curiosity': { steps: ['Draw a three‑box flowchart on paper: CURIOSITY (saving money, planning) → JOURNEY (bus ride, sights) → LOSS.', 'For each box, write one quote from the text.', 'Practice a PEEL paragraph that moves through all three boxes in order, using transition phrases like “This curiosity.', 'Have the student explain aloud how the flowchart proves the themes are one continuous arc.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
