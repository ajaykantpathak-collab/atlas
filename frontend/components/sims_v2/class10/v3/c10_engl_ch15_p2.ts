import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch15_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch15_p2: SimDef = {
    id: 'v3_c10_engl_ch15_p2',
    title: 'The Making of a Scientist · Part 2/2',
    subtitle: 'Trace how a butterfly hobby became real science',
    classLevel: 10, subject: 'engl', topic: 'The Making of a Scientist · Part 2/2',
    chapters: ['c10_engl_ch15'],
    nodeIds: ['c10_engl_cbse_15_007', 'c10_engl_cbse_15_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biographer reconstructing a scientist\'s childhood', intro: 'Before he published research on how cells work, Richard Ebright was a boy in a small town with jars of butterflies and a mother who refused to let him be bored.', goal: 'Show that scientific achievement grows from curiosity, discipline and mentorship — not from lone genius.' },
    discovery: {
        question: 'Richard Ebright started as a kid collecting butterflies in Pennsylvania — his mother got him \'The Travels of Monarch X,\' he tagged butterflies for research, and eventually his work helped explain how cells read DNA. What does his path reveal about how scientists are actually made?',
        options: ['Sustained curiosity plus real research habits — collecting, tagging, recording — matter more than sudden genius', 'He was simply born brilliant; the butterflies were a coincidence', 'Winning science fairs is the single event that creates scientists', 'A famous mentor discovered him and did the real work'],
        answer: 'Sustained curiosity plus real research habits — collecting, tagging, recording — matter more than sudden genius',
        hook: 'Ebright didn\'t start with a laboratory — he started with a net, a notebook and a mother who fed his curiosity. Scientists are trained by habits, not born with titles.',
    },
    teaching: [
        { title: 'Theme: Curiosity, Perseverance and the Making of a Scientist', text: 'The theme of "Curiosity, Perseverance and the Making of a Scientist" refers to the central idea that scientific achievement is driven not by innate genius alone, but by a sustained cycle of asking.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_15_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow a butterfly collector from childhood tagging projects to science-fair failures and finally to a real theory about cell life — and pinpoint the exact habits that carried him there.',
        labels: ['Theme: Curiosity, Perseverance', 'Character Analysis: Ebright\'s Driving'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_15_007', title: 'Theme: Curiosity, Perseverance and the Making of a Scientist',
          caseStudy: { intro: 'Imagine you are watching a time-lapse video of a seed pushing through concrete — that is the visual metaphor for this theme.',
            decisions: [{ prompt: 'Define the terms \'curiosity\' and \'perseverance\' specifically as they apply to Richard Ebright in this chapter.', options: [
                { text: 'Curiosity in Ebright is the *active pursuit of answers* to self-generated questions', outcome: 'Curiosity in Ebright is the *active pursuit of answers* to self-generated questions (e.g., "What.' },
                { text: 'liking butterflies', outcome: 'Not quite — Students treat "curiosity" and "perseverance" as separate checklists: they list butterfly.', reveals: 'students-treat-curiosity-and-perseverance' },
                { text: 'spending time in the lab', outcome: 'Not quite — Students treat "curiosity" and "perseverance" as separate checklists: they list butterfly.', reveals: 'students-treat-curiosity-and-perseverance' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_15_008', title: 'Character Analysis: Ebright\'s Driving Curiosity and Competitive Spirit',
          caseStudy: { intro: 'Imagine you are a detective investigating what makes a champion scientist — you wouldn\'t just list Ebright\'s awards; you\'d search for the *engine* behind them.',
            decisions: [{ prompt: 'What are the two defining character traits of Richard Ebright analyzed in this node, and which chapter do they come from?', options: [
                { text: 'The two defining traits are **driving curiosity** and **competitive spirit**, analyzed', outcome: 'The two defining traits are **driving curiosity** and **competitive spirit**, analyzed from the.' },
                { text: 'intelligence and hard work', outcome: 'Not quite — Students equate **"competitive spirit" with "wanting to win prizes"** and write answers like.', reveals: 'students-equate-competitive-spirit-with' },
                { text: 'perseverance and patience', outcome: 'Not quite — Students equate **"competitive spirit" with "wanting to win prizes"** and write answers like.', reveals: 'students-equate-competitive-spirit-with' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate loses at the zonal science fair — his neat butterfly display wins nothing — and announces he is \'obviously not a science person\' and will quit entering fairs.',
            decisions: [{ prompt: 'What would Ebright\'s story in \'The Making of a Scientist\' tell him?', options: [
                { text: 'That the loss is the lesson — Ebright also lost at his first county fair, realised a fancy display of slides was not real science, and responded by doing actual experiments, starting with why the monarch butterfly\'s gold spots mattered. Failing once showed him the difference between showing off and doing research; quitting is the one move that guarantees no discovery.', outcome: 'The chapter traces a scientist made, not born — curiosity plus the discipline to convert a defeat into real experiments is what produced his later work.' },
                { text: 'He is right to quit — losing a fair once is proof a person lacks scientific talent.', outcome: 'Ebright\'s own first fair ended in exactly that failure; the difference between him and a quitter was that he asked what real science required instead of walking away.', reveals: 'one-loss-means-no-talent' },
                { text: 'He should keep entering but with flashier posters and displays, since presentation is what wins science fairs.', outcome: 'The story holds the opposite — Ebright learned that real work, experiments answering real questions, beats impressive display; polish without inquiry is what lost him that first fair.', reveals: 'presentation-beats-experiment' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_15_008', title: 'You made it',
          caseStudy: { intro: 'The boy who chased monarchs learned the scientist\'s real secret: curiosity plus stubborn recording beats raw talent that never gets exercised.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_15_007', difficulty: 'standard',
          question: 'The theme of "Curiosity, Perseverance and the Making of a Scientist" refers.',
          hint: 'If stuck, re-read the science fair sequence (node 004) and the gold spots/hormone.',
          misconception: 'Students treat "curiosity" and "perseverance" as separate checklists: they list butterfly collecting under curiosity.',
          parts: [
                { id: 'a', prompt: 'Compare Ebright\'s curiosity-driven process with Anand\'s invention process in "My Brother\'s Great Invention" (Class 6).', answer: 'Anand\'s curiosity is *tinkering-based* ("What if I connect this wire?")',
                  options: ['Anand\'s curiosity is *tinkering-based* ("What if I connect this wire?")', 'both are curious kids'],
                  hint: 'If stuck, re-read the science fair sequence (node 004) and the gold spots/hormone sequence (nodes.',
                  misconception: 'Students treat "curiosity" and "perseverance" as separate checklists: they list butterfly collecting under curiosity and repeating.' }
          ],
            remediations: { 'students-treat-curiosity-and-perseverance': { steps: ['If the student separates the traits, do this 3-step fix: (1) Draw a circle diagram on paper: label four quadrants.', '(2) Walk through Ebright\'s timeline placing each event in the quadrant (e.g., Fair loss = Failure; Viceroy question.', '(3) Have them write one sentence: "Each discovery became the *next* curiosity because he *persevered* through the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_15_008', difficulty: 'standard',
          question: 'From \'English chapter c10_engl_cbse_15\': the skill or concept this node.',
          hint: 'If stuck, review **c10_engl_cbse_15_004 (county fair loss)** and **c10_engl_cbse_15_005.',
          misconception: 'Students equate **"competitive spirit" with "wanting to win prizes"** and write answers like "Ebright competed to get.',
          parts: [
                { id: 'a', prompt: 'Apply the PEEL structure to analyze Ebright\'s competitive spirit using the incident where he loses his first county science fair.', answer: '**Point:** Ebright\'s competitive spirit is revealed by his reaction to failure',
                  options: ['**Point:** Ebright\'s competitive spirit is revealed by his reaction to failure', 'A wrong answer (e.g'],
                  hint: 'If stuck, review **c10_engl_cbse_15_004 (county fair loss)** and **c10_engl_cbse_15_005 (gold spots.',
                  misconception: 'Students equate **"competitive spirit" with "wanting to win prizes"** and write answers like "Ebright competed to get medals." The text.' },
                { id: 'b', prompt: 'Compare how curiosity and competitive spirit operate differently in Ebright\'s **gold spots research** (curiosity-driven) versus his **DNA theory publication**.', answer: '**Gold spots (curiosity):** Motivated by *intrinsic wonder*',
                  options: ['**Gold spots (curiosity):** Motivated by *intrinsic wonder*', 'both show he wanted to win'],
                  hint: 'If stuck, review **c10_engl_cbse_15_004 (county fair loss)** and **c10_engl_cbse_15_005 (gold spots.',
                  misconception: 'Students equate **"competitive spirit" with "wanting to win prizes"** and write answers like "Ebright competed to get medals." The text.' }
          ],
            remediations: { 'students-equate-competitive-spirit-with': { steps: ['**Re-read the county fair incident** (c10_engl_cbse_15_004) and highlight the exact sentence where Ebright compares his.', '**Ask the student:** "Did he say \'I want to beat that boy\' or \'I need to do experiments\'?" — guide them to the.', '**Co-write a corrected Point:** "Ebright\'s competitive spirit is shown by his *analytical response to loss* —.', 'display) and *adopts the superior method*." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_15_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate **"competitive spirit" with "wanting to win prizes"** and write answers like "Ebright competed to get.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Ebright\'s competitive spirit was more important than his curiosity in making him a successful scientist." Defend or refute using two.', answer: '**Refute.** Both are interdependent',
                  options: ['**Refute.** Both are interdependent', 'evaluate'],
                  hint: 'If stuck, review **c10_engl_cbse_15_004 (county fair loss)** and **c10_engl_cbse_15_005 (gold spots.',
                  misconception: 'Students equate **"competitive spirit" with "wanting to win prizes"** and write answers like "Ebright competed to get medals." The text.' }
          ],
            remediations: { 'students-equate-competitive-spirit-with': { steps: ['**Re-read the county fair incident** (c10_engl_cbse_15_004) and highlight the exact sentence where Ebright compares his.', '**Ask the student:** "Did he say \'I want to beat that boy\' or \'I need to do experiments\'?" — guide them to the.', '**Co-write a corrected Point:** "Ebright\'s competitive spirit is shown by his *analytical response to loss* —.', 'display) and *adopts the superior method*." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
