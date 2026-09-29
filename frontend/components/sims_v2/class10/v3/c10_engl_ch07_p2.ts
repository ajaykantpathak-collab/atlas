import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch07_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch07_p2: SimDef = {
    id: 'v3_c10_engl_ch07_p2',
    title: 'Madam Rides the Bus · Part 2/2',
    subtitle: 'Follow an eight-year-old\'s master plan for one bus ride',
    classLevel: 10, subject: 'engl', topic: 'Madam Rides the Bus · Part 2/2',
    chapters: ['c10_engl_ch07'],
    nodeIds: ['c10_engl_cbse_07_007', 'c10_engl_cbse_07_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biographer reconstructing how a child out-planned the adults', intro: 'Every day a bright bus roars past Valli\'s house toward a town she\'s never seen. Most kids would whine for a ride. Valli starts gathering intelligence instead.', goal: 'Show how the author builds character through indirect detail — observation, sacrifice, discretion — not just plot.' },
    discovery: {
        question: 'Eight-year-old Valli rides the bus to town and back — alone. She never does chores for cash, never asks the conductor directly. So how did she pull it off?',
        options: ['Months of resisting peppermints and toys to save sixty paise — plus fare and timing details lifted from eavesdropping', 'She saved gift money and boldly questioned the driver about the route', 'She snuck aboard while the conductor was distracted', 'Her mother secretly funded the trip as a surprise'],
        answer: 'Months of resisting peppermints and toys to save sixty paise — plus fare and timing details lifted from eavesdropping',
        hook: 'This isn\'t childish daydreaming — it\'s a project. Every coin refused, every adult conversation mined for clues. Valli planned her ride like a heist.',
    },
    teaching: [
        { title: 'Character Analysis: Valli as a Determined and Observant Child', text: 'From \'English chapter c10_engl_cbse_07\': the skill or concept this node teaches, applied to the actual text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Piece together Valli\'s intelligence operation — what she overheard, what she sacrificed, what she refused — then write the case for her \'tiny wish\' being iron will.',
        labels: ['Character Analysis: Valli as', 'The Conductor\'s Role: Kindness'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_07_007', title: 'Character Analysis: Valli as a Determined and Observant Child',
          caseStudy: { intro: 'Imagine you are a detective trying to understand a person just by watching their choices — what they do, what they notice, and what they refuse to do.',
            decisions: [{ prompt: 'What is the definition of "character analysis" in the context of CBSE Class 10 English literature?', options: [
                { text: 'Character analysis is the examination of a character\'s personality traits, motivations,', outcome: 'Character analysis is the examination of a character\'s personality traits, motivations, and.' },
                { text: 'determination', outcome: 'Not quite — Students often think "determination" means simply "not giving up" and write generic statements like.', reveals: 'determination-means-simply-not-giving' },
                { text: 'not giving up', outcome: 'Not quite — Students often think "determination" means simply "not giving up" and write generic statements like.', reveals: 'determination-means-simply-not-giving' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_07_008', title: 'The Conductor\'s Role: Kindness and Humour in the Story',
          caseStudy: { intro: 'Imagine you are on a bus and a stranger treats you with unexpected respect and a joke that makes you smile – how would that change your journey?',
            decisions: [{ prompt: 'What are the two main character traits of the conductor highlighted in the story?', options: [
                { text: 'The two main traits are kindness and humour', outcome: 'The two main traits are kindness and humour. A wrong answer (e.g., “strictness and anger”) shows.' },
                { text: 'strictness and anger', outcome: 'Not quite — Students often think the conductor is merely a “funny side character” and write answers like “He.', reveals: 'the-conductor-is-merely-a' },
                { text: 'funny side character', outcome: 'Not quite — Students often think the conductor is merely a “funny side character” and write answers like “He.', reveals: 'the-conductor-is-merely-a' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An eight-year-old neighbour girl has saved every coin for months, memorised bus timings from watching the stop, and can tell you the fare to town to the last paisa — all for a solo ride she has been quietly planning. Her mother laughs it off as \'naughty scheming.\'',
            decisions: [{ prompt: 'Reading Valli in \'Madam Rides the Bus\', how should we see this child\'s behaviour?', options: [
                { text: 'As intelligence at work, not mere disobedience — like Valli, the girl\'s \'overwhelming\' curiosity drove her to observe, ask questions, save resources and plan carefully. The same drive that adults call nosiness is what lets a child turn a wish into a workable plan.', outcome: 'The chapter portrays Valli\'s curiosity as a thinking faculty — she gathered details, calculated fares and waited for the right moment. Curiosity plus preparation is exactly how independent action becomes possible.' },
                { text: 'It is simply disobedience — a child plotting anything in secret is doing wrong and the savings should be confiscated.', outcome: 'The story complicates that verdict — Valli\'s secret trip showed planning, restraint (she refused treats to save her return fare) and self-reliance; the behaviour deserves guidance, not just blame.', reveals: 'curiosity-is-disobedience' },
                { text: 'It is harmless daydreaming — children who plan such things never actually carry them out.', outcome: 'Valli did carry hers out — she boarded the bus alone and managed the whole journey; underestimating a determined child is how adults get surprised.', reveals: 'kids-never-follow-through' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_07_008', title: 'You made it',
          caseStudy: { intro: 'The bus was never the point — the self-control was. An eight-year-old who can resist a hundred peppermints can get almost anywhere.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_07_007', difficulty: 'standard',
          question: 'From \'English chapter c10_engl_cbse_07\': the skill or concept this node.',
          hint: 'Review the PEEL model from c9_engl_ch1_2 (Grandmother\'s character analysis) and re‑read.',
          misconception: 'Students often think "determination" means simply "not giving up" and write generic statements like "Valli was.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain how Valli\'s act of saving sixty paise demonstrates both determination and observation.', answer: 'Valli\'s saving shows determination',
                  options: ['Valli\'s saving shows determination', 'she saved money', 'she thriftily saved whatever stray coins came her way', 'determination'],
                  hint: 'Review the PEEL model from c9_engl_ch1_2 (Grandmother\'s character analysis) and re‑read the story.',
                  misconception: 'Students often think "determination" means simply "not giving up" and write generic statements like "Valli was determined because she took.' }
          ],
            remediations: { 'determination-means-simply-not-giving': { steps: ['If a student cannot cite specific evidence, guide them through a "text‑hunt" exercise: give them a photocopied page.', 'Then have them label each underline as "determination" or "observation." Finally, model turning one labeled underline.', 'Repeat until they can do it independently.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "determination" means simply "not giving up" and write generic statements like "Valli was.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Valli\'s refusal to get off the bus at the town shows stubbornness, not determination." Defend your judgment with two pieces.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'stubbornness', 'determination', 'not giving up'],
                  hint: 'Review the PEEL model from c9_engl_ch1_2 (Grandmother\'s character analysis) and re‑read the story.',
                  misconception: 'Students often think "determination" means simply "not giving up" and write generic statements like "Valli was determined because she took.' },
                { id: 'b', prompt: 'Create a diary entry from Valli\'s perspective on the night after her bus ride, incorporating at least three specific observations she made during the trip and.', answer: 'A strong entry will include observations like the "green fields," the "shop with',
                  options: ['A strong entry will include observations like the "green fields," the "shop with', 'determination', 'not giving up', 'Valli was determined'],
                  hint: 'Review the PEEL model from c9_engl_ch1_2 (Grandmother\'s character analysis) and re‑read the story.',
                  misconception: 'Students often think "determination" means simply "not giving up" and write generic statements like "Valli was determined because she took.' }
          ],
            remediations: { 'determination-means-simply-not-giving': { steps: ['If a student cannot cite specific evidence, guide them through a "text‑hunt" exercise: give them a photocopied page.', 'Then have them label each underline as "determination" or "observation." Finally, model turning one labeled underline.', 'Repeat until they can do it independently.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_07_008', difficulty: 'standard',
          question: 'The conductor in "Madam Rides the Bus" is a secondary character whose kindness.',
          hint: 'Review the PEEL paragraph structure from Class 9 (c9_engl_ch1_7) and the humour‑analysis.',
          misconception: 'Students often think the conductor is merely a “funny side character” and write answers like “He makes the story.',
          parts: [
                { id: 'a', prompt: 'What are the two main character traits of the conductor highlighted in the story?', answer: 'The two main traits are kindness and humour',
                  options: ['The two main traits are kindness and humour', 'strictness and anger', 'funny side character', 'He makes the story funny'],
                  hint: 'Review the PEEL paragraph structure from Class 9 (c9_engl_ch1_7) and the humour‑analysis table from.',
                  misconception: 'Students often think the conductor is merely a “funny side character” and write answers like “He makes the story funny.” They miss that his.' },
                { id: 'b', prompt: 'Compare the conductor’s attitude toward Valli with the elderly woman’s attitude. What does this contrast reveal about the story’s view of adulthood?', answer: 'The conductor treats Valli with respect and playfulness',
                  options: ['The conductor treats Valli with respect and playfulness', 'funny side character', 'He makes the story funny'],
                  hint: 'Review the PEEL paragraph structure from Class 9 (c9_engl_ch1_7) and the humour‑analysis table from.',
                  misconception: 'Students often think the conductor is merely a “funny side character” and write answers like “He makes the story funny.” They miss that his.' }
          ],
            remediations: { 'the-conductor-is-merely-a': { steps: ['Re‑read the conductor’s dialogues aloud, noting tone markers (exclamation marks, polite address).', 'Create a two‑column table: “Kindness” vs “Humour” – fill with exact quotes.', 'For each quote, write one sentence: “This shows ______ because ______.” 4.', 'Finally, draft a PEEL paragraph using the table: Point – The conductor bridges innocence and experience; Evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
