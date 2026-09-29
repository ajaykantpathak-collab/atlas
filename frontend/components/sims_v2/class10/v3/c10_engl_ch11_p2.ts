import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch11_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch11_p2: SimDef = {
    id: 'v3_c10_engl_ch11_p2',
    title: 'The Thief\'s Story · Part 2/2',
    subtitle: 'Decide what a thief does when someone finally trusts him',
    classLevel: 10, subject: 'engl', topic: 'The Thief\'s Story · Part 2/2',
    chapters: ['c10_engl_ch11'],
    nodeIds: ['c10_engl_cbse_11_007', 'c10_engl_cbse_11_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young thief at a crossroads', intro: 'You are Hari Singh: charming, quick, and honest about only one thing — that you steal. Then you meet Anil, who hands you his money, his kitchen and his time without asking questions.', goal: 'Analyse how trust and education can reform where punishment cannot.' },
    discovery: {
        question: 'Hari Singh, a skilled 15-year-old thief, steals ₹600 from Anil — the one man who trusted him and was teaching him to read and write. Hours later he secretly returns the money. Why would a professional thief give back a successful theft?',
        options: ['He realised education and Anil\'s trust could change his life in ways stolen money never could', 'He was afraid the police had already been informed', 'The notes were wet and damaged, so they were worthless', 'He planned to steal a bigger amount later'],
        answer: 'He realised education and Anil\'s trust could change his life in ways stolen money never could',
        hook: 'The most valuable thing Anil gave Hari wasn\'t money — it was being treated as someone worth teaching. Stealing from a man who trusted him cost more than ₹600.',
    },
    teaching: [
        { title: 'Character Analysis: Hari\'s Conflict Between Habit and Conscience', text: 'From \'The Thief\': the skill or concept this node teaches, applied to the actual text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Step inside the mind of a boy who survives by lying: weigh the thrill of an easy theft against the slow reward of learning to write your own name, and decide what to do at the railway station.',
        labels: ['Character Analysis: Hari\'s Conflict', 'Narrative Technique: First-Person Confession'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_11_007', title: 'Character Analysis: Hari\'s Conflict Between Habit and Conscience',
          caseStudy: { intro: 'Think about a time you wanted to break a bad habit — like checking your phone during meals — but your hand reached for it automatically.',
            decisions: [{ prompt: 'What is the central internal conflict Hari Singh experiences in "The Thief\'s Story"?', options: [
                { text: 'Hari Singh\'s central internal conflict is between his deeply ingrained habit as a', outcome: 'Hari Singh\'s central internal conflict is between his deeply ingrained habit as a professional.' },
                { text: 'Hari conflicts with Anil', outcome: 'Not quite — Students believe Hari\'s transformation follows a linear "bad to good" arc: he was a thief, then.', reveals: 'hari-s-transformation-follows-a' },
                { text: 'Hari conflicts with the police', outcome: 'Not quite — Students believe Hari\'s transformation follows a linear "bad to good" arc: he was a thief, then.', reveals: 'hari-s-transformation-follows-a' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_11_008', title: 'Narrative Technique: First-Person Confession and Psychological Insight',
          caseStudy: { intro: 'Imagine you found a secret diary of someone you thought was a "bad person" — as you read, you realize they are scared, lonely, and trying to change.',
            decisions: [{ prompt: 'What is the primary effect of using a first-person confessional narrative in *The Thief\'s Story*?', options: [
                { text: 'The primary effect is intimate psychological access to Hari Singh’s inner conflict,', outcome: 'The primary effect is intimate psychological access to Hari Singh’s inner conflict, allowing.' },
                { text: 'It makes the story more exciting', outcome: 'Not quite — Students often think "first-person confession" simply means the narrator uses "I" and tells the.', reveals: 'first-person-confession-simply-means' },
                { text: 'It gives us Anil\'s perspective', outcome: 'Not quite — Students often think "first-person confession" simply means the narrator uses "I" and tells the.', reveals: 'first-person-confession-simply-means' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A neighbourhood teenager is caught shoplifting. Most residents want him banned from their doors; one shopkeeper instead offers him small paid errands and teaches him to keep accounts. People call the shopkeeper a fool for trusting a thief.',
            decisions: [{ prompt: 'In light of \'The Thief\', what is the wisest reading of the shopkeeper\'s gamble?', options: [
                { text: 'It is the Anil approach — Hari Singh stole from a man who trusted him, taught him to cook and write, and paid him with respect; it was precisely that trust, and the glimpse of what an educated life could bring, that pulled Hari back to return the money. Trust is not naivety here; it is the only thing in the story that changes anyone.', outcome: 'The chapter argues that reform comes from being treated as worth trusting — punishment alone would have made Hari merely a more careful thief.' },
                { text: 'The shopkeeper is indeed a fool — once a thief, always a thief, and trust just gives the boy easier targets.', outcome: 'Hari literally returned under the weight of the trust he was shown; writing off every young offender guarantees the prediction comes true.', reveals: 'once-a-thief-always' },
                { text: 'Trust only works if combined with a strict warning and watching his every move for months.', outcome: 'Anil never watched or warned — it was his deliberate, open-handed trust and the gift of education that did the work; surveillance would have taught the boy only to hide better.', reveals: 'trust-needs-surveillance' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_11_008', title: 'You made it',
          caseStudy: { intro: 'Trust turned out to be the thing Hari couldn\'t steal — he could only lose it or earn it. He chose to earn it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_11_007', difficulty: 'standard',
          question: 'From \'The Thief\': the skill or concept this node teaches, applied to the actual.',
          hint: 'Review "identifying internal monologue in first-person narration" from Class 9 character.',
          misconception: 'Students believe Hari\'s transformation follows a linear "bad to good" arc: he was a thief, then Anil taught him, then.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Hari\'s habit of stealing does not simply disappear when his conscience awakens.', answer: 'Habit is an automatic neural pathway strengthened by repetition',
                  options: ['Habit is an automatic neural pathway strengthened by repetition', 'Hari stops being a thief after meeting Anil', 'bad to good'],
                  hint: 'Review "identifying internal monologue in first-person narration" from Class 9 character analysis.',
                  misconception: 'Students believe Hari\'s transformation follows a linear "bad to good" arc: he was a thief, then Anil taught him, then he became honest.' },
                { id: 'b', prompt: 'Identify ONE sentence from the story where Hari\'s narration shows habit and conscience operating AT THE SAME TIME during the theft episode.', answer: 'Sentence: "I had the money',
                  options: ['Sentence: "I had the money', 'I stole the money', 'I came back', 'bad to good'],
                  hint: 'Review "identifying internal monologue in first-person narration" from Class 9 character analysis.',
                  misconception: 'Students believe Hari\'s transformation follows a linear "bad to good" arc: he was a thief, then Anil taught him, then he became honest.' },
                { id: 'c', prompt: 'Compare Hari\'s internal conflict in the theft scene (night of robbery) with his conflict at the railway station (moment of return).', answer: 'At the theft scene: Habit dominates (90%)',
                  options: ['At the theft scene: Habit dominates (90%)', 'first he was bad, then he became good', 'bad to good'],
                  hint: 'Review "identifying internal monologue in first-person narration" from Class 9 character analysis.',
                  misconception: 'Students believe Hari\'s transformation follows a linear "bad to good" arc: he was a thief, then Anil taught him, then he became honest.' }
          ],
            remediations: { 'hari-s-transformation-follows-a': { steps: ['Ask the student to reread ONLY the theft night paragraph and highlight every sentence where Hari describes his THOUGHTS.', 'Have them label each thought as "H" (habit/thief mindset) or "C" (conscience/moral awareness).', 'Show them that BOTH labels appear in the SAME paragraph — sometimes in the same sentence.', 'Practice writing one PEEL paragraph using this structure: "Point: Hari\'s conflict is simultaneous, not sequential.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Hari\'s transformation follows a linear "bad to good" arc: he was a thief, then Anil taught him, then.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Hari returns the money ONLY because he realizes he cannot read/write without Anil — it\'s pure self-interest, not conscience." Defend.', answer: 'Refute',
                  options: ['Refute', 'bad to good'],
                  hint: 'Review "identifying internal monologue in first-person narration" from Class 9 character analysis.',
                  misconception: 'Students believe Hari\'s transformation follows a linear "bad to good" arc: he was a thief, then Anil taught him, then he became honest.' },
                { id: 'b', prompt: 'Write a 4-sentence diary entry from Hari\'s perspective ON THE NIGHT HE STEALS THE MONEY, showing both habit and conscience speaking in his head.', answer: 'Sample answer: "My fingers found the notes under the mattress',
                  options: ['Sample answer: "My fingers found the notes under the mattress', 'bad to good'],
                  hint: 'Review "identifying internal monologue in first-person narration" from Class 9 character analysis.',
                  misconception: 'Students believe Hari\'s transformation follows a linear "bad to good" arc: he was a thief, then Anil taught him, then he became honest.' }
          ],
            remediations: { 'hari-s-transformation-follows-a': { steps: ['Ask the student to reread ONLY the theft night paragraph and highlight every sentence where Hari describes his THOUGHTS.', 'Have them label each thought as "H" (habit/thief mindset) or "C" (conscience/moral awareness).', 'Show them that BOTH labels appear in the SAME paragraph — sometimes in the same sentence.', 'Practice writing one PEEL paragraph using this structure: "Point: Hari\'s conflict is simultaneous, not sequential.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_11_008', difficulty: 'standard',
          question: 'First-person confession is a narrative technique where the protagonist narrates.',
          hint: 'Review c9_engl_ch1_7 (first-person narrative perspective) and re-read the story marking.',
          misconception: 'Students often think "first-person confession" simply means the narrator uses "I" and tells the truth.',
          parts: [
                { id: 'a', prompt: 'Choose a moment where Hari reveals his thought process during the theft (e.g., planning to steal the money).', answer: 'When Hari describes calculating how to steal the money',
                  options: ['When Hari describes calculating how to steal the money', 'He stole the money', 'first-person confession', '"first-person confession" simply means the narrator uses "I" and tells the truth'],
                  hint: 'Review c9_engl_ch1_7 (first-person narrative perspective) and re-read the story marking every "I.',
                  misconception: 'Students often think "first-person confession" simply means the narrator uses "I" and tells the truth.' }
          ],
            remediations: { 'first-person-confession-simply-means': { steps: ['Give the student two short extracts: one where Hari describes the theft clinically, one where he describes returning.', 'Ask them to underline every sensory/emotional word (sweat, heart, wet, cold).', 'Have them complete the sentence: "The change in language shows Hari\'s ______." 4.', 'Guide them to write a PEEL paragraph: Point (language shifts), Evidence (quoted words), Explanation (shift from.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
