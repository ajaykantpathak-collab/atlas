import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch04_p3: SimDef = {
    id: 'v3_c11_eng_w_ch04_p3',
    title: 'The Adventure of the Three Garridebs (Short Story) · Part 3/3',
    subtitle: 'See through the inheritance story to the press under the floorboards.',
    classLevel: 11, subject: 'eng_w', topic: 'The Adventure of the Three Garridebs (Short Story) · Part 3/3',
    chapters: ['c11_eng_w_ch04'],
    nodeIds: ['c11_eng_w_cbse_04_013', 'c11_eng_w_cbse_04_014', 'c11_eng_w_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Watson, narrating a case he misunderstood until the end', intro: 'An American lawyer, a name worth millions, a harmless recluse — Holmes hears the counterfeiters\' machinery already turning.', goal: 'Separate the decoy plot from the real one and map the story\'s structural beats.' },
    discovery: {
        question: 'Most of this Holmes story follows a hunt for a third man named Garrideb to claim millions. What is the plot actually about?',
        options: ['Luring a collector out of his room so a killer can reach the counterfeiting press buried beneath it', 'A genuine inheritance shared by three men with a rare surname', 'A legal dispute over an American estate', 'A missing-persons case solved by advertisement'],
        answer: 'Luring a collector out of his room so a killer can reach the counterfeiting press buried beneath it',
        hook: 'The story is a double helix — Watson chases the whimsical fake plot while Holmes reads the real one in an American spelling and a frayed coat.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Adventure of the Three Garridebs\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_04_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split the false inheritance trail from the true criminal plot, then place the inciting incident, the Birmingham trick and the cellar climax.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Adventure of the Three Garridebs\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'Define "dramatic irony" as it operates in the scene where John Garrideb (Killer Evans) presents the advertisement for Howard Garrideb.', options: [
                { text: 'Dramatic irony occurs when the audience possesses knowledge that a character lacks,', outcome: 'Dramatic irony occurs when the audience possesses knowledge that a character lacks, creating.' },
                { text: 'It\'s ironic because the ad has American spellings', outcome: 'Not quite — Students equate "critical analysis" with "finding faults" or "expressing personal opinions.".', reveals: 'students-equate-critical-analysis-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Adventure of the Three Garridebs\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'Define the PEEL structure for writing a literature answer and state the purpose of each component.', options: [
                { text: 'PEEL stands for Point (topic sentence answering the question), Evidence (textual', outcome: 'PEEL stands for Point (topic sentence answering the question), Evidence (textual detail/quote).' },
                { text: 'PEEL means writing a paragraph with a quote', outcome: 'Not quite — Students believe "writing a literature answer" means retelling the story in their own words.', reveals: 'writing-a-literature-answer-means' },
                { text: 'writing a literature answer', outcome: 'Not quite — Students believe "writing a literature answer" means retelling the story in their own words.', reveals: 'writing-a-literature-answer-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Adventure of the Three Garridebs\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'List the three discussion topics given in the NCERT textbook under "Talking About the Text" for "The Adventure of the Three Garridebs".', options: [
                { text: 'The three topics are: (1) The Holmes-Watson relationship as revealed by the "cold mask"', outcome: 'The three topics are: (1) The Holmes-Watson relationship as revealed by the "cold mask" quote, (2).' },
                { text: 'comprehension questions', outcome: 'Not quite — Students believe a literary discussion is a series of individual speeches where each person states.', reveals: 'a-literary-discussion-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your mystery-writing club studies \'The Adventure of the Three Garridebs\'. A member plots a knockoff where the detective just \'gets lucky and guesses the villain\', dismissing the story\'s real references — 1902 London addresses, the South African War, an American criminal — as \'period clutter we can delete\'.',
            decisions: [{ prompt: 'What do those \'clutter\' details actually do?', options: [
                { text: 'They\'re the realism engine of the genre: verifiable London geography, dated history (Boer War service) and the American underworld anchor Holmes\'s deductions in a checkable world, so readers feel the reasoning is earned, not authorial luck. Detective fiction\'s contract is that clues + context yield the solution — delete the anchors and deduction collapses into guessing.', outcome: 'The genre lives on the illusion that you could verify it all; real-world reference is load-bearing, not decorative.' },
                { text: 'The member is right — dates and street names are trivia; a detective can solve by pure intuition.', outcome: 'Holmes\'s method is contextual inference — era, place and record are the evidence; \'lucky guessing\' breaks the genre\'s promise of reproducible reasoning.', reveals: 'deduction-is-lucky-guessing' },
                { text: 'Swap 1902 London for a fantasy city — deductions work in invented worlds equally well.', outcome: 'Invented settings let authors cheat (any fact can be conjured); the Holmes contract requires a real, fixed world the reader could in principle audit.', reveals: 'realism-is-optional-in-mystery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'The absurdity was the bait — a \'whimsical\' will lowered a collector\'s guard better than any robbery could.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Adventure of the Three Garridebs\' — analysing the.',
          hint: 'If stuck, return to node c11_eng_w_cbse_04_012 and practice converting three inferential.',
          misconception: 'Students equate "critical analysis" with "finding faults" or "expressing personal opinions." In this story, they often.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'The Adventure of the Three Garridebs\'',
                  options: ['Critical thinking on \'The Adventure of the Three Garridebs\'', '\'The Adventure of the Three Garridebs\' (Woven Words, ch', 'The plot/narrative arc of \'The Adventure of the Three Garridebs\'', 'The setting of \'The Adventure of the Three Garridebs\''],
                  hint: 'If stuck, return to node c11_eng_w_cbse_04_012 and practice converting three inferential answers.',
                  misconception: 'Students equate "critical analysis" with "finding faults" or "expressing personal opinions." In this story, they often write: "Holmes was.' }
          ],
            remediations: { 'students-equate-critical-analysis-with': { steps: ['Have the student list three "opinions" they hold about the story (e.g., "Evans is evil," "Holmes is brilliant," "The.', 'For each, ask: "What specific textual pattern (repeated image, structural parallel, lexical choice) *forces* this.', 'Replace the opinion with a claim about *authorial construction*: "Conan Doyle characterizes Evans through..." 4.', 'Practice with a single paragraph: identify the technique, quote the evidence, explain the effect.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_014', difficulty: 'standard',
          question: 'Writing skills from \'The Adventure of the Three Garridebs\' — using the text.',
          hint: 'If stuck, review c11_eng_w_cbse_04_013 (Critical Thinking) to generate interpretive.',
          misconception: 'Students believe "writing a literature answer" means retelling the story in their own words.',
          parts: [
                { id: 'a', prompt: 'Define the PEEL structure for writing a literature answer and state the purpose of each component.', answer: 'PEEL stands for Point (topic sentence answering the question), Evidence (textual',
                  options: ['PEEL stands for Point (topic sentence answering the question), Evidence (textual', 'PEEL means writing a paragraph with a quote', 'writing a literature answer', '"writing a literature answer" means retelling the story in their own words'],
                  hint: 'If stuck, review c11_eng_w_cbse_04_013 (Critical Thinking) to generate interpretive claims, and.',
                  misconception: 'Students believe "writing a literature answer" means retelling the story in their own words.' },
                { id: 'b', prompt: 'Analyse how Conan Doyle uses Watson\'s first-person narration to build suspense in the cellar scene (from "We crouched closer..." to "two pistols were pointed.', answer: 'Watson\'s limited perspective ("we heard," "we crouched," "the head',
                  options: ['Watson\'s limited perspective ("we heard," "we crouched," "the head', 'Evans opened the floor and Holmes caught him', 'writing a literature answer', '"writing a literature answer" means retelling the story in their own words'],
                  hint: 'If stuck, review c11_eng_w_cbse_04_013 (Critical Thinking) to generate interpretive claims, and.',
                  misconception: 'Students believe "writing a literature answer" means retelling the story in their own words.' }
          ],
            remediations: { 'writing-a-literature-answer-means': { steps: ['Show the student a side-by-side comparison: a 2-mark narrative summary vs a 6-mark PEEL answer on the same question.', 'Highlight the four PEEL sentences in the strong answer with coloured pens (Point=blue, Evidence=green.', 'Give them a "PEEL checklist" bookmark: Does my first sentence answer the question?', 'Do I explain the quote\'s effect?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_015', difficulty: 'standard',
          question: 'Discussion points on \'The Adventure of the Three Garridebs\' — speaking and.',
          hint: 'Review the \'Critical Thinking: Analysis and Interpretation\' node (c11_eng_w_cbse_04_013).',
          misconception: 'Students believe a literary discussion is a series of individual speeches where each person states their opinion.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'The Adventure of the Three Garridebs\'',
                  options: ['Discussion points on \'The Adventure of the Three Garridebs\'', '\'The Adventure of the Three Garridebs\' (Woven Words, ch', 'The plot/narrative arc of \'The Adventure of the Three Garridebs\'', 'The setting of \'The Adventure of the Three Garridebs\''],
                  hint: 'Review the \'Critical Thinking: Analysis and Interpretation\' node (c11_eng_w_cbse_04_013) for.',
                  misconception: 'Students believe a literary discussion is a series of individual speeches where each person states their opinion.' }
          ],
            remediations: { 'a-literary-discussion-is-a': { steps: ['Conduct a 5-minute "fishbowl" demonstration with two strong students modeling paraphrase-then-respond using a simple.', 'Provide sentence stems: "I hear you saying ___; the text supports this with ___" and "Building on that, ___".', 'Have the stuck student practice with just one prompt using a graphic organizer with columns: Peer\'s Point, My Evidence.', 'Debrief: "Notice how the discussion deepened when you used the text as common ground."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
