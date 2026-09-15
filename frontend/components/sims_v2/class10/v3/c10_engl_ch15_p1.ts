import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch15_p1: SimDef = {
    id: 'v3_c10_engl_ch15_p1',
    title: 'The Making of a Scientist · Part 1/2',
    subtitle: 'Trace how a butterfly hobby became real science',
    classLevel: 10, subject: 'engl', topic: 'The Making of a Scientist · Part 1/2',
    chapters: ['c10_engl_ch15'],
    nodeIds: ['c10_engl_cbse_15_001', 'c10_engl_cbse_15_002', 'c10_engl_cbse_15_003', 'c10_engl_cbse_15_004', 'c10_engl_cbse_15_005', 'c10_engl_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biographer reconstructing a scientist\'s childhood', intro: 'Before he published research on how cells work, Richard Ebright was a boy in a small town with jars of butterflies and a mother who refused to let him be bored.', goal: 'Show that scientific achievement grows from curiosity, discipline and mentorship — not from lone genius.' },
    discovery: {
        question: 'Richard Ebright started as a kid collecting butterflies in Pennsylvania — his mother got him \'The Travels of Monarch X,\' he tagged butterflies for research, and eventually his work helped explain how cells read DNA. What does his path reveal about how scientists are actually made?',
        options: ['Sustained curiosity plus real research habits — collecting, tagging, recording — matter more than sudden genius', 'He was simply born brilliant; the butterflies were a coincidence', 'Winning science fairs is the single event that creates scientists', 'A famous mentor discovered him and did the real work'],
        answer: 'Sustained curiosity plus real research habits — collecting, tagging, recording — matter more than sudden genius',
        hook: 'Ebright didn\'t start with a laboratory — he started with a net, a notebook and a mother who fed his curiosity. Scientists are trained by habits, not born with titles.',
    },
    teaching: [
        { title: 'Richard Ebright: A Young Boy\'s Fascination with Butterflies', text: 'A biographical sketch is a concise narrative non-fiction text that highlights key events, traits, and influences in a real person\'s life to reveal their character and achievements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_15_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow a butterfly collector from childhood tagging projects to science-fair failures and finally to a real theory about cell life — and pinpoint the exact habits that carried him there.',
        labels: ['Richard Ebright: A Young', 'The Role of Ebright\'s', 'The Book \'The Travels', 'Ebright\'s Science Fair Projects', 'The Gold Spots', 'Ebright\'s Theory on How'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_15_001', title: 'Richard Ebright: A Young Boy\'s Fascination with Butterflies',
          caseStudy: { intro: 'Imagine you find an old notebook in your grandfather\'s attic filled with sketches of insects, dates, and locations — what would that tell you about him?',
            decisions: [{ prompt: 'What is the primary literary form of the opening section of "The Making of a Scientist," and what is its main purpose in introducing.', options: [
                { text: 'The primary form is biographical sketch (narrative non-fiction), and its purpose is to', outcome: 'The primary form is biographical sketch (narrative non-fiction), and its purpose is to establish.' },
                { text: 'it\'s a fictional story to entertain', outcome: 'Not quite — Students often think this section is just a "list of facts about butterflies" and memorize species.', reveals: 'this-section-is-just-a' },
                { text: 'list of facts about butterflies', outcome: 'Not quite — Students often think this section is just a "list of facts about butterflies" and memorize species.', reveals: 'this-section-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_15_002', title: 'The Role of Ebright\'s Mother: Encouragement and Equipment',
          caseStudy: { intro: 'Imagine you have a friend who loves building drones but has no money for parts and no one to guide them. What would they need most?',
            decisions: [{ prompt: 'List two pieces of equipment Ebright\'s mother bought for him and the specific experiment or project each was used for.', options: [
                { text: 'Correct answer: (1) Microscope', outcome: 'Correct answer: (1) Microscope — used to observe monarch butterfly wings and gold spots on pupae.' },
                { text: 'microscope and telescope', outcome: 'Not quite — Students consistently reduce the mother\'s role to "she bought him microscopes and books" — treating.', reveals: 'students-consistently-reduce-the-mother' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_15_003', title: 'The Book \'The Travels of Monarch X\': A Turning Point in Ebright\'s Life',
          caseStudy: { intro: 'Imagine you\'re browsing a library and pick up a book that completely changes what you want to do with your life — that\'s what happened to Richard Ebright.',
            decisions: [{ prompt: 'What specific activity did *The Travels of Monarch X* invite readers to participate in, which became Ebright\'s first real scientific.', options: [
                { text: 'The book invited readers to tag monarch butterflies for Dr', outcome: 'The book invited readers to tag monarch butterflies for Dr. Frederick A.' },
                { text: 'collect more butterflies', outcome: 'Not quite — Students often treat the book as just "a book he liked" or "a book that taught him facts." The.', reveals: 'students-often-treat-the-book' },
                { text: 'study their life cycle', outcome: 'Not quite — Students often treat the book as just "a book he liked" or "a book that taught him facts." The.', reveals: 'students-often-treat-the-book' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_15_005', title: 'The Gold Spots on Monarch Pupae: Ebright\'s Key Discovery',
          caseStudy: { intro: 'Imagine you are a young scientist observing something tiny and shiny on a butterfly pupa — would you ignore it or investigate?',
            decisions: [{ prompt: 'What were the gold spots on monarch pupae commonly believed to be before Ebright\'s experiment?', options: [
                { text: 'The gold spots were commonly believed to be merely ornamental or decorative, with no', outcome: 'The gold spots were commonly believed to be merely ornamental or decorative, with no functional.' },
                { text: 'they were thought to be eggs', outcome: 'Not quite — Students often think the gold spots were discovered to be "hormones" themselves, rather than organs.', reveals: 'the-gold-spots-were-discovered' },
                { text: 'they were thought to be poison', outcome: 'Not quite — Students often think the gold spots were discovered to be "hormones" themselves, rather than organs.', reveals: 'the-gold-spots-were-discovered' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_15_006', title: 'Ebright\'s Theory on How Cells Work: Published at Age 22',
          caseStudy: { intro: 'Imagine you are 22 years old and have just published a theory that changes how scientists understand the basic unit of life — the cell. How would you feel?',
            decisions: [{ prompt: 'What was the central idea of Ebright\'s theory on how cells work, as described in the chapter?', options: [
                { text: 'Ebright\'s theory proposed that cells read their DNA blueprint by copying it into RNA,', outcome: 'Ebright\'s theory proposed that cells read their DNA blueprint by copying it into RNA, which then.' },
                { text: 'he discovered the structure of DNA', outcome: 'Not quite — Students often think Ebright\'s theory *was* the discovery of DNA\'s role — but the chapter states.', reveals: 'ebright-s-theory-was-the' },
                { text: 'he proved cells divide', outcome: 'Not quite — Students often think Ebright\'s theory *was* the discovery of DNA\'s role — but the chapter states.', reveals: 'ebright-s-theory-was-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate loses at the zonal science fair — his neat butterfly display wins nothing — and announces he is \'obviously not a science person\' and will quit entering fairs.',
            decisions: [{ prompt: 'What would Ebright\'s story in \'The Making of a Scientist\' tell him?', options: [
                { text: 'That the loss is the lesson — Ebright also lost at his first county fair, realised a fancy display of slides was not real science, and responded by doing actual experiments, starting with why the monarch butterfly\'s gold spots mattered. Failing once showed him the difference between showing off and doing research; quitting is the one move that guarantees no discovery.', outcome: 'The chapter traces a scientist made, not born — curiosity plus the discipline to convert a defeat into real experiments is what produced his later work.' },
                { text: 'He is right to quit — losing a fair once is proof a person lacks scientific talent.', outcome: 'Ebright\'s own first fair ended in exactly that failure; the difference between him and a quitter was that he asked what real science required instead of walking away.', reveals: 'one-loss-means-no-talent' },
                { text: 'He should keep entering but with flashier posters and displays, since presentation is what wins science fairs.', outcome: 'The story holds the opposite — Ebright learned that real work, experiments answering real questions, beats impressive display; polish without inquiry is what lost him that first fair.', reveals: 'presentation-beats-experiment' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'The boy who chased monarchs learned the scientist\'s real secret: curiosity plus stubborn recording beats raw talent that never gets exercised.',
            decisions: [{ prompt: 'What comes next? The Making of a Scientist · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Making of a Scientist · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_15_001', difficulty: 'standard',
          question: 'A biographical sketch is a concise narrative non-fiction text that highlights.',
          hint: 'If stuck, review Class 9 character analysis (c9_engl_ch1_2) and theme tracing.',
          misconception: 'Students often think this section is just a "list of facts about butterflies" and memorize species names or tagging.',
          parts: [
                { id: 'a', prompt: 'The author writes that Ebright "collected all twenty-five species of butterflies found around his hometown." Explain in your own words why the author includes.', answer: 'The precise number "twenty-five" demonstrates Ebright\'s thoroughness, systematic',
                  options: ['The precise number "twenty-five" demonstrates Ebright\'s thoroughness, systematic', 'to make the story interesting', 'list of facts about butterflies'],
                  hint: 'If stuck, review Class 9 character analysis (c9_engl_ch1_2) and theme tracing (c9_engl_ch1_4).',
                  misconception: 'Students often think this section is just a "list of facts about butterflies" and memorize species names or tagging methods.' },
                { id: 'b', prompt: 'Using the PEEL structure, write a short paragraph (4-5 sentences) analyzing how the detail "he would tag the butterflies\' wings and let them go" reveals.', answer: 'Point: The tagging detail shows Ebright valued data over possession',
                  options: ['Point: The tagging detail shows Ebright valued data over possession', 'Explanation', 'steps, losing marks for analysis'],
                  hint: 'If stuck, review Class 9 character analysis (c9_engl_ch1_2) and theme tracing (c9_engl_ch1_4).',
                  misconception: 'Students often think this section is just a "list of facts about butterflies" and memorize species names or tagging methods.' }
          ],
            remediations: { 'this-section-is-just-a': { steps: ['Re-read the first three paragraphs with a highlighter: mark every verb that shows deliberate action (collected, tagged.', 'For each verb, write one inference: "Tagged → shows he wanted to track movement over time → scientific mindset." 3.', 'Practice converting each "action + inference" pair into a PEEL paragraph.', 'Check your answer against the marking scheme: does it have Point, Evidence, Explanation, Link?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think this section is just a "list of facts about butterflies" and memorize species names or tagging.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s choice to begin the biography with Ebright\'s butterfly collecting rather than his later Nobel-worthy work.', answer: 'Yes, it is effective',
                  options: ['Yes, it is effective', 'it\'s boring to start with childhood', 'list of facts about butterflies'],
                  hint: 'If stuck, review Class 9 character analysis (c9_engl_ch1_2) and theme tracing (c9_engl_ch1_4).',
                  misconception: 'Students often think this section is just a "list of facts about butterflies" and memorize species names or tagging methods.' }
          ],
            remediations: { 'this-section-is-just-a': { steps: ['Re-read the first three paragraphs with a highlighter: mark every verb that shows deliberate action (collected, tagged.', 'For each verb, write one inference: "Tagged → shows he wanted to track movement over time → scientific mindset." 3.', 'Practice converting each "action + inference" pair into a PEEL paragraph.', 'Check your answer against the marking scheme: does it have Point, Evidence, Explanation, Link?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_15_002', difficulty: 'standard',
          question: 'This topic examines how Ebright\'s mother acted as his primary encourager and.',
          hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) — practice tracing how.',
          misconception: 'Students consistently reduce the mother\'s role to "she bought him microscopes and books" — treating her as a *resource.',
          parts: [
                { id: 'a', prompt: 'List two pieces of equipment Ebright\'s mother bought for him and the specific experiment or project each was used for.', answer: 'Correct answer: (1) Microscope',
                  options: ['Correct answer: (1) Microscope', 'microscope and telescope'],
                  hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) — practice tracing how a character\'s.',
                  misconception: 'Students consistently reduce the mother\'s role to "she bought him microscopes and books" — treating her as a *resource provider* only.' },
                { id: 'b', prompt: 'Apply the concept of "active encouragement" to a new context: A Class 10 student wants to pursue robotics but has no lab access.', answer: 'Correct answer: (1) Learn basic coding alongside the student to debug together',
                  options: ['Correct answer: (1) Learn basic coding alongside the student to debug together', 'buy more kits', 'encourage them verbally'],
                  hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) — practice tracing how a character\'s.',
                  misconception: 'Students consistently reduce the mother\'s role to "she bought him microscopes and books" — treating her as a *resource provider* only.' }
          ],
            remediations: { 'students-consistently-reduce-the-mother': { steps: ['Re-read the first 3 paragraphs of the chapter with a highlighter: mark every *verb* attached to "mother" (e.g.', 'Group these verbs into three categories: Material (bought), Relational (took, wrote with), Intellectual (encouraged.', 'Write one PEEL paragraph using *only* the Relational+Intellectual verbs as evidence.', 'Compare with a peer\'s paragraph — does yours show *partnership*?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_15_003', difficulty: 'standard',
          question: 'A turning point in a narrative is a pivotal moment when a character\'s.',
          hint: 'Review "character baseline vs. turning point" using the Jahnavi example from Class 6.',
          misconception: 'Students often treat the book as just "a book he liked" or "a book that taught him facts." The board exam error.',
          parts: [
                { id: 'a', prompt: 'What specific activity did *The Travels of Monarch X* invite readers to participate in, which became Ebright\'s first real scientific project?', answer: 'The book invited readers to tag monarch butterflies for Dr',
                  options: ['The book invited readers to tag monarch butterflies for Dr', 'collect more butterflies', 'study their life cycle'],
                  hint: 'Review "character baseline vs. turning point" using the Jahnavi example from Class 6.',
                  misconception: 'Students often treat the book as just "a book he liked" or "a book that taught him facts." The board exam error: writing "The book gave him.' },
                { id: 'b', prompt: 'Explain in your own words why tagging butterflies was a turning point for Ebright, not just another collecting activity.', answer: 'Tagging was a turning point',
                  options: ['Tagging was a turning point', 'he learned more about butterflies'],
                  hint: 'Review "character baseline vs. turning point" using the Jahnavi example from Class 6.',
                  misconception: 'Students often treat the book as just "a book he liked" or "a book that taught him facts." The board exam error: writing "The book gave him.' }
          ],
            remediations: { 'students-often-treat-the-book': { steps: ['Ask the student to reread the paragraph where Ebright describes the book\'s invitation to tag butterflies.', 'Have them underline the words "write to Dr.', 'Urquhart" and "send him the tags." 3.', 'Ask: "What did he *do* that he never did before?" (Answer: contacted a scientist, contributed data).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_15_004', difficulty: 'standard',
          question: 'This topic traces the sequential development of Richard Ebright\'s science fair.',
          hint: 'If stuck, review the scientific method steps from Class 9 Science (experimental design).',
          misconception: 'Students often think Ebright\'s projects were separate, unrelated activities (rocks, then butterflies, then gold spots).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic traces the sequential development of Richard Ebright\'s science fair projects',
                  options: ['This topic traces the sequential development of Richard Ebright\'s science fair projects', 'A biographical sketch is a concise narrative non-fiction text that highlights key events,', 'This topic examines how Ebright\'s mother acted as his primary encourager and provider of', 'A turning point in a narrative is a pivotal moment when a character\'s trajectory changes'],
                  hint: 'If stuck, review the scientific method steps from Class 9 Science (experimental design) and the.',
                  misconception: 'Students often think Ebright\'s projects were separate, unrelated activities (rocks, then butterflies, then gold spots) rather than.' }
          ],
            remediations: { 'ebright-s-projects-were-separate': { steps: ['Have the student create a flowchart on paper: Project 1 (rocks) → Question raised → Project 2 (tagging) → Limitation.', 'For each arrow, write the specific question or limitation that drove the next step.', 'Practice writing a 3-sentence answer: \'Ebright\'s rock collection taught him classification.', 'The tagging project\'s low recovery rate made him seek a lab-based study, leading to the gold spots experiment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_15_005', difficulty: 'standard',
          question: 'This node covers the pivotal moment in Richard Ebright\'s scientific journey.',
          hint: 'Review the steps of the scientific method and the monarch life cycle from earlier nodes.',
          misconception: 'Students often think the gold spots were discovered to be "hormones" themselves, rather than organs that *produce*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node covers the pivotal moment in Richard Ebright\'s scientific journey when he',
                  options: ['This node covers the pivotal moment in Richard Ebright\'s scientific journey when he', 'A biographical sketch is a concise narrative non-fiction text that highlights key events,', 'This topic examines how Ebright\'s mother acted as his primary encourager and provider of', 'A turning point in a narrative is a pivotal moment when a character\'s trajectory changes'],
                  hint: 'Review the steps of the scientific method and the monarch life cycle from earlier nodes.',
                  misconception: 'Students often think the gold spots were discovered to be "hormones" themselves, rather than organs that *produce* a hormone.' }
          ],
            remediations: { 'the-gold-spots-were-discovered': { steps: ['Have the student draw a simple diagram: pupa with gold spots → label "gland" → arrow → "hormone" → arrow →.', 'Ask them to explain aloud: "The spot is the factory, the hormone is the product."', 'Give them a fill-in-the-blank: "The gold spots are ______ that secrete a ______."', 'Have them rewrite the incorrect sentence correctly. This concrete visual-verbal drill fixes the structure-function.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_15_006', difficulty: 'standard',
          question: 'This topic examines the pivotal moment in the narrative when Richard Ebright.',
          hint: 'Review the gold spots discovery (c10_engl_cbse_15_005) and identify the question.',
          misconception: 'Students often think Ebright\'s theory *was* the discovery of DNA\'s role — but the chapter states he built on *known*.',
          parts: [
                { id: 'a', prompt: 'Why was the publication of this theory at age 22 considered a remarkable achievement in the context of Ebright\'s journey?', answer: 'It was remarkable',
                  options: ['It was remarkable', 'he was young', 'gold spots hormone'],
                  hint: 'Review the gold spots discovery (c10_engl_cbse_15_005) and identify the question it raised about.',
                  misconception: 'Students often think Ebright\'s theory *was* the discovery of DNA\'s role — but the chapter states he built on *known* science (DNA.' }
          ],
            remediations: { 'ebright-s-theory-was-the': { steps: ['Re-read the two paragraphs describing the theory and its publication.', 'Highlight the words "DNA", "RNA", "protein", "blueprint".', 'Draw a flowchart: Gold spots → hormone → cell signalling → gene expression → theory.', 'Explain aloud: "The gold spots work *led to* the theory; they are not the same." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
