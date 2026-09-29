import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch04_p2: SimDef = {
    id: 'v3_c9_engl_ch04_p2',
    title: 'Vitamin-M · Part 2/2',
    subtitle: 'Losing memory without losing independence',
    classLevel: 9, subject: 'engl', topic: 'Vitamin-M · Part 2/2',
    chapters: ['c9_engl_ch04'],
    nodeIds: ['c9_engl_ch4_6', 'c9_engl_ch4_7', 'c9_engl_ch4_8', 'c9_engl_ch4_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a family navigating a loved one\'s forgetfulness', intro: 'When Grandpa starts forgetting names and routes, the family faces a brutal either/or: safety or self-respect. Follow the events that forced a third option.', goal: 'Summarise \'Vitamin-M\' (Grandpa\'s Memory Challenges) as a causal chain — inciting lapse, wandering crisis, care-home debate, the Vitamin-M intervention, restored autonomy — without opinion.' },
    discovery: {
        question: 'Grandpa forgets Ravi\'s name at breakfast, then wanders off and is brought home by a policeman. The family debates a care home — but the story\'s real engine is a different fight. Which one?',
        options: ['Grandpa\'s fierce wish for independence clashing with his family\'s fear for his safety', 'Grandpa vs his own forgetfulness, alone in his head', 'Ravi vs his mother over chores', 'The family vs modern medicine'],
        answer: 'Grandpa\'s fierce wish for independence clashing with his family\'s fear for his safety',
        hook: 'The medicine shelf is the story\'s mirror: it opens with Grandpa lost among unlabelled bottles and ends with him proudly rattling off the red jar for BP and the blue for sugar. \'Vitamin-M\' — labels, routines, dignity — is the compromise between care home and chaos.',
    },
    teaching: [
        { title: 'Conflict: Independence vs Family Care for the Elderly', text: 'In literature, **conflict** is the struggle between opposing forces that drives the narrative; in *Vitamin-M*, the central conflict is the tension between Grandpa\'s fierce desire to maintain his.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch4_6', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Rebuild the plot as a causal chain: forgotten name → wandering crisis → care-home debate → the Vitamin-M routine → the organised shelf. Then write a summary where every event visibly causes the next.',
        labels: ['Conflict: Independence vs Family', 'Literary Device: Humour', 'Vocabulary in Context: Words', 'Emotional Dynamics: Adjustment'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch4_6', title: 'Conflict: Independence vs Family Care for the Elderly',
          caseStudy: { intro: 'Imagine your own grandfather insists on climbing a ladder to fix a bulb while your mother rushes to stop him, saying, "Papa, you\'ll fall!" That everyday moment.',
            decisions: [{ prompt: 'Define "conflict" in the context of a short story and name the two opposing forces in the independence vs. care conflict in *Vitamin-M*.', options: [
                { text: 'Conflict is the central struggle between opposing forces that propels the plot', outcome: 'Conflict is the central struggle between opposing forces that propels the plot.' },
                { text: 'only says "Grandpa vs', outcome: 'Not quite — Students often treat the conflict as a simple "Grandpa is difficult / family is right" binary.', reveals: 'students-often-treat-the-conflict' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch4_8', title: 'Vocabulary in Context: Words Related to Aging and Care',
          caseStudy: { intro: 'Imagine you are reading a newspaper article about a new senior citizen center in your city and come across the phrase "The center promotes *autonomy* for.',
            decisions: [{ prompt: 'What is the primary strategy for determining the meaning of an unfamiliar word in a literary text without using a dictionary?', options: [
                { text: 'The primary strategy is using context clues', outcome: 'The primary strategy is using context clues — words, phrases, and sentences surrounding the unknown.' },
                { text: 'guessing from the first letter', outcome: 'Not quite — Students often believe "vocabulary in context" means finding a synonym in the same sentence (e.g.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'skipping the word', outcome: 'Not quite — Students often believe "vocabulary in context" means finding a synonym in the same sentence (e.g.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch4_9', title: 'Emotional Dynamics: Adjustment in a Joint Family',
          caseStudy: { intro: 'Imagine you live in a house where your grandfather forgets your name, your mother juggles work and caregiving, and you feel torn between homework and helping.',
            decisions: [{ prompt: 'Define "emotional adjustment" in the context of a joint family as portrayed in "Vitamin-M". Use one sentence.', options: [
                { text: 'Emotional adjustment is the conscious process by', outcome: 'Emotional adjustment is the conscious process by which family members modify their expectations and.' },
                { text: 'tolerance', outcome: 'Not quite — Students often confuse "adjustment" with "compromise" and write that characters "give up" their.', reveals: 'students-often-confuse-adjustment-with' },
                { text: 'adjustment', outcome: 'Not quite — Students often confuse "adjustment" with "compromise" and write that characters "give up" their.', reveals: 'students-often-confuse-adjustment-with' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch4_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising \'Grandpa\'s Memory Challenges,\' a student writes: \'Grandpa forgets Ravi\'s name. He wanders off. A policeman brings him home. Vidya cries. They buy labelled jars. Grandpa becomes happy.\'',
            decisions: [{ prompt: 'Why would examiners call this a list rather than a summary?', options: [
                { text: 'Because the events float loose of each other: the wandering is the crisis that triggers the care-home discussion, and the \'Vitamin-M\' routine — colour-coded jars, fixed walks — is the compromise that restores Grandpa\'s independence. The causal chain is the summary; bare events are just a travel log.', outcome: 'This supplies the cause-and-effect spine — conflict driving each event — which is what a board-level summary must demonstrate.' },
                { text: 'They would not — all the main events are present, and summary means writing what happened in order.', outcome: 'Events without linkage hide the story\'s engine: safety versus independence. Two sentences with \'as a result\' would show comprehension the list cannot.', reveals: 'list-is-summary' },
                { text: 'The draft only needs a moral ending like \'we must respect our elders\' to become a full summary.', outcome: 'A moral is interpretation, not plot; the missing piece is how each event causes the next, not a lesson pasted on top.', reveals: 'add-a-moral' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch4_9', title: 'You made it',
          caseStudy: { intro: 'A summary isn\'t a list — it\'s a chain of \'because of this, that happened.\' The wandering caused the care-home talk; the care-home talk caused Vitamin-M; Vitamin-M gave Grandpa his shelf — and his dignity — back.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch4_6', difficulty: 'standard',
          question: 'In literature, **conflict** is the struggle between opposing forces that drives.',
          hint: 'Review c9_engl_ch4_2 and c9_engl_ch4_3 — re-do the character motivation charts for.',
          misconception: 'Students often treat the conflict as a simple "Grandpa is difficult / family is right" binary, ignoring that *both*.',
          parts: [
                { id: 'a', prompt: 'Define "conflict" in the context of a short story and name the two opposing forces in the independence vs. care conflict in *Vitamin-M*.', answer: 'Conflict is the central struggle between opposing forces that propels the plot',
                  options: ['Conflict is the central struggle between opposing forces that propels the plot', 'only says "Grandpa vs'],
                  hint: 'Review c9_engl_ch4_2 and c9_engl_ch4_3 — re-do the character motivation charts for Grandpa and.',
                  misconception: 'Students often treat the conflict as a simple "Grandpa is difficult / family is right" binary, ignoring that *both* sides have valid.' },
                { id: 'b', prompt: 'In the scene where Vidya hides Grandpa\'s house keys, apply the concept of "external conflict" to explain how this action escalates the independence-care.', answer: 'Step 1: Identify the external conflict',
                  options: ['Step 1: Identify the external conflict', 'external conflict'],
                  hint: 'Review c9_engl_ch4_2 and c9_engl_ch4_3 — re-do the character motivation charts for Grandpa and.',
                  misconception: 'Students often treat the conflict as a simple "Grandpa is difficult / family is right" binary, ignoring that *both* sides have valid.' }
          ],
            remediations: { 'students-often-treat-the-conflict': { steps: ['Ask the student to list *only* Grandpa\'s actions that show independence (e.g., walking alone, refusing stick) and.', 'Have them write one sentence for each action explaining the *feeling* behind it (e.g., "He walks alone because he wants.', 'Guide them to pair each independence action with the care reaction that follows, using the sentence frame: "When.', 'Finally, ask: "Does the story say one feeling is wrong?" — leading them to see the conflict as a clash of legitimate.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch4_7', difficulty: 'standard',
          question: 'Humour in a narrative is the use of amusing situations, witty dialogue,.',
          hint: 'Review c9_engl_ch4_2 (Grandpa\'s character) and c8_engl_ch1_8 (humour in narrative).',
          misconception: 'Students often believe humour and pathos are mutually exclusive — that a scene cannot be both funny and sad — so they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Humour in a narrative is the use of amusing situations, witty dialogue, or comic',
                  options: ['Humour in a narrative is the use of amusing situations, witty dialogue, or comic', 'A story summary is a concise, objective retelling of a narrative\'s essential elements', 'Empathy, patience, and respect for the elderly are interconnected human values that', 'From \'English chapter c9_engl_ch4\': the skill or concept this node teaches, applied to'],
                  hint: 'Review c9_engl_ch4_2 (Grandpa\'s character) and c8_engl_ch1_8 (humour in narrative) to refresh how.',
                  misconception: 'Students often believe humour and pathos are mutually exclusive — that a scene cannot be both funny and sad — so they label moments.' }
          ],
            remediations: { 'humour-and-pathos-are-mutually': { steps: ['First, ask the student to re-read the "vitamin-M" scene and annotate: "What is funny?', 'Can both be true at once?" Second, model a think-aloud: "I laugh at the wordplay, but I also notice Grandpa avoids the.', 'Finally, guide them to write one PEEL paragraph using one row from the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch4_8', difficulty: 'standard',
          question: 'From \'English chapter c9_engl_ch4\': the skill or concept this node teaches.',
          hint: 'If stuck, review the "Context Clue Types" chart from Class 8 (c8_engl_ch1_9) and practice.',
          misconception: 'Students often believe "vocabulary in context" means finding a synonym in the same sentence (e.g., *frail = weak*.',
          parts: [
                { id: 'a', prompt: 'What is the primary strategy for determining the meaning of an unfamiliar word in a literary text without using a dictionary?', answer: 'The primary strategy is using context clues',
                  options: ['The primary strategy is using context clues', 'guessing from the first letter', 'skipping the word', 'vocabulary in context'],
                  hint: 'If stuck, review the "Context Clue Types" chart from Class 8 (c8_engl_ch1_9) and practice on.',
                  misconception: 'Students often believe "vocabulary in context" means finding a synonym in the same sentence (e.g., *frail = weak* because the text says.' },
                { id: 'b', prompt: 'The chapter describes a nurse as "a *caregiver* who balanced *clinical efficiency* with *gentle empathy*." Using context clues, explain what *clinical.', answer: 'Step 1: Identify the target phrase *clinical efficiency*',
                  options: ['Step 1: Identify the target phrase *clinical efficiency*', 'vocabulary in context', 'weak and frail', '"vocabulary in context" means finding a synonym in the same sentence (e'],
                  hint: 'If stuck, review the "Context Clue Types" chart from Class 8 (c8_engl_ch1_9) and practice on.',
                  misconception: 'Students often believe "vocabulary in context" means finding a synonym in the same sentence (e.g., *frail = weak* because the text says.' },
                { id: 'c', prompt: 'Compare the connotations of *senile* and *elderly* as they might be used in the chapter.', answer: '*Elderly* is a neutral, respectful term for advanced age',
                  options: ['*Elderly* is a neutral, respectful term for advanced age', 'vocabulary in context', 'weak and frail', '"vocabulary in context" means finding a synonym in the same sentence (e'],
                  hint: 'If stuck, review the "Context Clue Types" chart from Class 8 (c8_engl_ch1_9) and practice on.',
                  misconception: 'Students often believe "vocabulary in context" means finding a synonym in the same sentence (e.g., *frail = weak* because the text says.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['Give the student a two-column chart: Column A — target word with its sentence from the chapter; Column B — list four.', 'Model with *autonomy*: locate the sentence, then search three sentences before/after for clues (e.g., "He refused.', 'Have the student practice with two more words, verbalizing the clue type each time.', 'Finally, ask them to write a new sentence for each word that mirrors the chapter\'s connotation (e.g., *autonomy* used.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch4_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "vocabulary in context" means finding a synonym in the same sentence (e.g., *frail = weak*.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s inference: "In the line \'Grandpa cherished his *autonomy*,\' the word *autonomy* means \'living alone\' because the story says he lives.', answer: 'The inference is not fully justified',
                  options: ['The inference is not fully justified', 'vocabulary in context', 'weak and frail', '"vocabulary in context" means finding a synonym in the same sentence (e'],
                  hint: 'If stuck, review the "Context Clue Types" chart from Class 8 (c8_engl_ch1_9) and practice on.',
                  misconception: 'Students often believe "vocabulary in context" means finding a synonym in the same sentence (e.g., *frail = weak* because the text says.' },
                { id: 'b', prompt: 'Write a short paragraph (4-5 sentences) from Ravi\'s perspective describing Grandpa\'s *dignity* using at least three aging/care-related words from the chapter.', answer: 'A strong answer: "Grandpa\'s *frail* hands tremble as he holds his tea, yet his',
                  options: ['A strong answer: "Grandpa\'s *frail* hands tremble as he holds his tea, yet his', 'vocabulary in context', 'weak and frail', '"vocabulary in context" means finding a synonym in the same sentence (e'],
                  hint: 'If stuck, review the "Context Clue Types" chart from Class 8 (c8_engl_ch1_9) and practice on.',
                  misconception: 'Students often believe "vocabulary in context" means finding a synonym in the same sentence (e.g., *frail = weak* because the text says.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['Give the student a two-column chart: Column A — target word with its sentence from the chapter; Column B — list four.', 'Model with *autonomy*: locate the sentence, then search three sentences before/after for clues (e.g., "He refused.', 'Have the student practice with two more words, verbalizing the clue type each time.', 'Finally, ask them to write a new sentence for each word that mirrors the chapter\'s connotation (e.g., *autonomy* used.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch4_9', difficulty: 'standard',
          question: 'Emotional Dynamics: Adjustment in a Joint Family refers to the literary.',
          hint: 'If stuck, review c9_engl_ch4_3 (Character Analysis: Ravi and His Mother) to refresh the.',
          misconception: 'Students often confuse "adjustment" with "compromise" and write that characters "give up" their needs.',
          parts: [
                { id: 'a', prompt: 'Define "emotional adjustment" in the context of a joint family as portrayed in "Vitamin-M". Use one sentence.', answer: 'Emotional adjustment is the conscious process by',
                  options: ['Emotional adjustment is the conscious process by', 'tolerance', 'adjustment', 'compromise'],
                  hint: 'If stuck, review c9_engl_ch4_3 (Character Analysis: Ravi and His Mother) to refresh the baseline.',
                  misconception: 'Students often confuse "adjustment" with "compromise" and write that characters "give up" their needs.' },
                { id: 'b', prompt: 'Apply the concept of "emotional adjustment" to a new scene: Grandpa accidentally throws away Ravi\'s project.', answer: 'Immediate reaction: "How could he be so careless?',
                  options: ['Immediate reaction: "How could he be so careless?', 'adjustment', 'compromise', 'give up'],
                  hint: 'If stuck, review c9_engl_ch4_3 (Character Analysis: Ravi and His Mother) to refresh the baseline.',
                  misconception: 'Students often confuse "adjustment" with "compromise" and write that characters "give up" their needs.' }
          ],
            remediations: { 'students-often-confuse-adjustment-with': { steps: ['Ask the student to list every instance where a character *changes their plan* for Grandpa (e.g., Ravi skipping tuition.', 'For each, identify the emotion *before* the change (annoyance, guilt, fear) and the emotion *after* (resolve.', 'Have them write a two-column table: "Old Response" vs "Adjusted Response" to visualize the shift.', 'Finally, ask: "What new strength does each character discover?" This moves them from passive compromise to active.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
