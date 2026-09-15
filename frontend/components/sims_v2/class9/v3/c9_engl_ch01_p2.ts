import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch01_p2: SimDef = {
    id: 'v3_c9_engl_ch01_p2',
    title: 'How I Taught My Grandmother to Read · Part 2/2',
    subtitle: 'A grandmother, a deadline, and a role reversal',
    classLevel: 9, subject: 'engl', topic: 'How I Taught My Grandmother to Read · Part 2/2',
    chapters: ['c9_engl_ch01'],
    nodeIds: ['c9_engl_ch1_6', 'c9_engl_ch1_7', 'c9_engl_ch1_8', 'c9_engl_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a storyteller practising the two-minute version', intro: 'You have two minutes to tell someone the whole story of Krishtakka learning to read at 62. Every wasted word or sneaked-in opinion loses the plot — literally.', goal: 'Summarise \'How I Taught My Grandmother to Read\' — protagonist, setting, conflict, key events and resolution in order — distinguishing summary from analysis or opinion.' },
    discovery: {
        question: 'A 62-year-old grandmother touches her young granddaughter\'s feet — the oldest person bowing to the youngest. What flipped their roles?',
        options: ['Guru dakshina — the granddaughter taught Krishtakka to read, so the elder honoured the child as her teacher', 'The grandmother lost a bet', 'It\'s a village ritual with no story behind it', 'She was just being polite'],
        answer: 'Guru dakshina — the granddaughter taught Krishtakka to read, so the elder honoured the child as her teacher',
        hook: 'The story\'s hinge is a week of helplessness: when the granddaughter left for a wedding, Krishtakka couldn\'t read her beloved Kashi Yatre serial herself. And a summary traps that arc — events only, no \'this shows determination\' opinions.',
    },
    teaching: [
        { title: 'Cultural Context: Village Life in North Karnataka', text: 'Cultural context refers to the social, religious, and economic environment of a specific place and time that shapes the characters\' beliefs, actions, and the story\'s events.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch1_6', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Retell Krishtakka\'s journey in exactly the right shape: the Kashi Yatre dependence, the week alone, the Saraswati Puja deadline, the daily practice, and the guru dakshina bow — all in 100-150 words, zero opinions.',
        labels: ['Cultural Context: Village Life', 'Literary Device: First-Person Narrative', 'Vocabulary in Context: Key', 'Role of Kashi Yatre'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch1_6', title: 'Cultural Context: Village Life in North Karnataka',
          caseStudy: { intro: 'Imagine you are visiting your grandmother\'s village in North Karnataka.',
            decisions: [{ prompt: 'What is the name of the weekly magazine that the grandmother eagerly awaits in the story, and what serial does it publish?', options: [
                { text: 'The magazine is "Karmaveera" and the serial is "Kashi Yatre"', outcome: 'The magazine is "Karmaveera" and the serial is "Kashi Yatre". A wrong answer (e.g., naming.' },
                { text: 'background', outcome: 'Not quite — Students often think the cultural context is just "background" and not integral to the plot.', reveals: 'the-cultural-context-is-just' },
                { text: 'a different magazine or serial', outcome: 'Not quite — Students often think the cultural context is just "background" and not integral to the plot.', reveals: 'the-cultural-context-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch1_7', title: 'Literary Device: First-Person Narrative Perspective',
          caseStudy: { intro: 'Imagine you\'re reading a WhatsApp message from your best friend describing a family argument — you only get their side, their feelings, their interpretation.',
            decisions: [{ prompt: 'Identify the narrator of "How I Taught My Grandmother to Read" and quote the first sentence that confirms the first-person perspective.', options: [
                { text: 'The narrator is the granddaughter (Sudha Murty as a young girl)', outcome: 'The narrator is the granddaughter (Sudha Murty as a young girl).' },
                { text: 'the grandmother', outcome: 'Not quite — Students believe first-person narration means the narrator is "always honest" or "knows everything.', reveals: 'first-person-narration-means-the' },
                { text: 'an outside narrator', outcome: 'Not quite — Students believe first-person narration means the narrator is "always honest" or "knows everything.', reveals: 'first-person-narration-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch1_8', title: 'Vocabulary in Context: Key Words from the Story',
          caseStudy: { intro: 'Imagine you receive a voice note from your grandmother where she says, "My *Kashi Yatre* ritual is incomplete without you reading it aloud." You know "ritual".',
            decisions: [{ prompt: 'Define "vocabulary in context" and give one example of a word from the story whose meaning changes when you consider the grandmother\'s.', options: [
                { text: 'Vocabulary in context means understanding a word\'s specific meaning, tone, and', outcome: 'Vocabulary in context means understanding a word\'s specific meaning, tone, and implication within.' },
                { text: 'serial means a TV show', outcome: 'Not quite — Students believe "vocabulary in context" means finding the dictionary definition that fits the.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means finding the dictionary definition that fits the.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch1_9', title: 'Role of Kashi Yatre Serial in Motivating the Grandmother',
          caseStudy: { intro: 'Imagine you desperately want to watch the finale of your favourite TV series, but the power goes out right before the climax.',
            decisions: [{ prompt: 'What is the basic premise of the "Kashi Yatre" serial that the grandmother follows?', options: [
                { text: 'The serial revolves around an old woman\'s ardent desire to undertake a pilgrimage to', outcome: 'The serial revolves around an old woman\'s ardent desire to undertake a pilgrimage to Kashi.' },
                { text: 'It is a serial about a young girl\'s adventure', outcome: 'Not quite — Students often think the grandmother wanted to learn to read *because* she loved the.', reveals: 'the-grandmother-wanted-to-learn' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch1_6', title: 'Use it in the wild',
          caseStudy: { intro: 'For homework, a student must summarise \'How I Taught My Grandmother to Read\' in 120 words. His draft opens: \'This inspiring story proves education matters and everyone should respect elders.\'',
            decisions: [{ prompt: 'What does a proper summary need instead?', options: [
                { text: 'Plot, not praise: Krishtakka, a 62-year-old in a North Karnataka village, depended on her granddaughter for the weekly Kashi Yatre serial; left alone for a week, she resolved to learn, set a Saraswati Puja deadline, practised daily, read independently, and honoured her granddaughter with guru dakshina — in order, without opinion.', outcome: 'This supplies protagonist, conflict, sequenced events and resolution — exactly what a summary is, minus the moralising.' },
                { text: 'His opening is right — a summary\'s job is to state the lesson the story teaches, and \'inspiring\' earns marks for insight.', outcome: 'Opinion is not summary; examiners want the ordered events and resolution, and \'it is inspiring\' proves nothing was read.', reveals: 'summary-is-moral' },
                { text: 'A better summary lists every scene — the wedding, the meals, each practice day — so nothing the author wrote is left out.', outcome: 'Exhaustive retelling is not summary either; the skill is selecting only the events that carry the conflict to its resolution.', reveals: 'summary-is-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch1_9', title: 'You made it',
          caseStudy: { intro: 'A summary is the story\'s skeleton: who, where, what happened, how it ended — in order. The moment you say \'it was inspiring,\' you\'ve stopped summarising and started reviewing.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch1_6', difficulty: 'standard',
          question: 'Cultural context refers to the social, religious, and economic environment of.',
          hint: 'Review the story summary (c9_engl_ch1_1) and highlight every reference to village life.',
          misconception: 'Students often think the cultural context is just "background" and not integral to the plot.',
          parts: [
                { id: 'a', prompt: 'What is the name of the weekly magazine that the grandmother eagerly awaits in the story, and what serial does it publish?', answer: 'The magazine is "Karmaveera" and the serial is "Kashi Yatre"',
                  options: ['The magazine is "Karmaveera" and the serial is "Kashi Yatre"', 'background', 'a different magazine or serial', 'the cultural context is just "background" and not integral to the plot'],
                  hint: 'Review the story summary (c9_engl_ch1_1) and highlight every reference to village life, then.',
                  misconception: 'Students often think the cultural context is just "background" and not integral to the plot.' },
                { id: 'b', prompt: 'Explain why the grandmother identifies with the protagonist of "Kashi Yatre" and how this reflects the cultural context of the village.', answer: 'The grandmother identifies with the protagonist',
                  options: ['The grandmother identifies with the protagonist', 'background', 'the cultural context is just "background" and not integral to the plot'],
                  hint: 'Review the story summary (c9_engl_ch1_1) and highlight every reference to village life, then.',
                  misconception: 'Students often think the cultural context is just "background" and not integral to the plot.' },
                { id: 'c', prompt: 'The story mentions that the bus comes once a week to the village.', answer: 'The weekly bus brings the magazine',
                  options: ['The weekly bus brings the magazine', 'background', 'the cultural context is just "background" and not integral to the plot'],
                  hint: 'Review the story summary (c9_engl_ch1_1) and highlight every reference to village life, then.',
                  misconception: 'Students often think the cultural context is just "background" and not integral to the plot.' }
          ],
            remediations: { 'the-cultural-context-is-just': { steps: ['If a student holds this misconception, guide them to trace the cause-effect chain: (1) Identify the cultural practice.', '(2) Show how it creates the grandmother\'s desire (she wants to know the story but cannot read).', '(3) Show how it sets the timeline (she must learn before the next episode).', '(4) Conclude that without this specific cultural context, the grandmother\'s urgency and the granddaughter\'s teaching.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch1_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the cultural context is just "background" and not integral to the plot.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s choice to set the story in a North Karnataka village rather than a city.', answer: 'A village setting amplifies the theme',
                  options: ['A village setting amplifies the theme', 'background', 'the cultural context is just "background" and not integral to the plot'],
                  hint: 'Review the story summary (c9_engl_ch1_1) and highlight every reference to village life, then.',
                  misconception: 'Students often think the cultural context is just "background" and not integral to the plot.' }
          ],
            remediations: { 'the-cultural-context-is-just': { steps: ['If a student holds this misconception, guide them to trace the cause-effect chain: (1) Identify the cultural practice.', '(2) Show how it creates the grandmother\'s desire (she wants to know the story but cannot read).', '(3) Show how it sets the timeline (she must learn before the next episode).', '(4) Conclude that without this specific cultural context, the grandmother\'s urgency and the granddaughter\'s teaching.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch1_7', difficulty: 'standard',
          question: 'First-person narrative perspective is a point of view where the story is told.',
          hint: 'Review c7_engl_ch03_008 (First-Person Narration and Humour) for basic identification.',
          misconception: 'Students believe first-person narration means the narrator is "always honest" or "knows everything about the story.".',
          parts: [
                { id: 'a', prompt: 'Identify the narrator of "How I Taught My Grandmother to Read" and quote the first sentence that confirms the first-person perspective.', answer: 'The narrator is the granddaughter (Sudha Murty as a young girl)',
                  options: ['The narrator is the granddaughter (Sudha Murty as a young girl)', 'the grandmother', 'an outside narrator', 'always honest'],
                  hint: 'Review c7_engl_ch03_008 (First-Person Narration and Humour) for basic identification practice, then.',
                  misconception: 'Students believe first-person narration means the narrator is "always honest" or "knows everything about the story." In this text, they.' },
                { id: 'b', prompt: 'Explain in your own words why the granddaughter\'s statement "I never saw my grandmother cry" is significant given the first-person perspective.', answer: 'The statement reveals the narrator\'s limited knowledge',
                  options: ['The statement reveals the narrator\'s limited knowledge', 'the grandmother never cried', 'always honest', 'knows everything about the story'],
                  hint: 'Review c7_engl_ch03_008 (First-Person Narration and Humour) for basic identification practice, then.',
                  misconception: 'Students believe first-person narration means the narrator is "always honest" or "knows everything about the story." In this text, they.' },
                { id: 'c', prompt: 'Compare how the story would differ if told from Krishtakka\'s first-person perspective versus the granddaughter\'s.', answer: 'From Krishtakka\'s perspective: (1) The opening',
                  options: ['From Krishtakka\'s perspective: (1) The opening', 'always honest', 'knows everything about the story', 'helpless'],
                  hint: 'Review c7_engl_ch03_008 (First-Person Narration and Humour) for basic identification practice, then.',
                  misconception: 'Students believe first-person narration means the narrator is "always honest" or "knows everything about the story." In this text, they.' }
          ],
            remediations: { 'first-person-narration-means-the': { steps: ['Have the student reread the first two paragraphs and highlight every "I" statement.', 'Ask: "Does the narrator know Krishtakka\'s thoughts? How do you know?" Guide them to find evidence of the narrator.', 'Show the contrast — the moment Krishtakka speaks for herself ("I want to be independent").', 'Explain: "The author chose a narrator who *underestimates* the grandmother so we can discover her strength together.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch1_8', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the precise meaning.',
          hint: 'If stuck, review the story summary (c9_engl_ch1_1) and the Class 8 vocabulary in context.',
          misconception: 'Students believe "vocabulary in context" means finding the dictionary definition that fits the sentence.',
          parts: [
                { id: 'a', prompt: 'Define "vocabulary in context" and give one example of a word from the story whose meaning changes when you consider the grandmother\'s perspective.', answer: 'Vocabulary in context means understanding a word\'s specific meaning, tone, and',
                  options: ['Vocabulary in context means understanding a word\'s specific meaning, tone, and', 'serial means a TV show', 'vocabulary in context'],
                  hint: 'If stuck, review the story summary (c9_engl_ch1_1) and the Class 8 vocabulary in context nodes.',
                  misconception: 'Students believe "vocabulary in context" means finding the dictionary definition that fits the sentence.' },
                { id: 'b', prompt: 'In the story, the narrator says her grandmother was "illiterate" but not "uneducated." Explain the difference in connotation between these two words in the.', answer: '"Illiterate" specifically means unable to read or write, a factual condition',
                  options: ['"Illiterate" specifically means unable to read or write, a factual condition', 'vocabulary in context'],
                  hint: 'If stuck, review the story summary (c9_engl_ch1_1) and the Class 8 vocabulary in context nodes.',
                  misconception: 'Students believe "vocabulary in context" means finding the dictionary definition that fits the sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['If a student gives only dictionary meanings, do this: 1) Take the target word (e.g., "ritual") and write three synonyms.', '2) Have the student replace the word in the original sentence with each synonym.', '3) Ask: "Does the sentence feel the same?', 'What feeling is lost/gained?" 4) Guide them to articulate the unique emotional/cultural charge of the author\'s choice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch1_9', difficulty: 'standard',
          question: 'The "Kashi Yatre" serial acts as a powerful emotional catalyst in the story.',
          hint: 'Review the "Character Analysis: Grandmother" node (c9_engl_ch1_2) to recall her.',
          misconception: 'Students often think the grandmother wanted to learn to read *because* she loved the granddaughter\'s storytelling.',
          parts: [
                { id: 'a', prompt: 'Why does the grandmother identify so strongly with the protagonist of "Kashi Yatre"? Explain in your own words.', answer: 'The grandmother identifies with the protagonist',
                  options: ['The grandmother identifies with the protagonist', 'entertainment value', 'religious devotion'],
                  hint: 'Review the "Character Analysis: Grandmother" node (c9_engl_ch1_2) to recall her personality and the.',
                  misconception: 'Students often think the grandmother wanted to learn to read *because* she loved the granddaughter\'s storytelling voice.' }
          ],
            remediations: { 'the-grandmother-wanted-to-learn': { steps: ['Re-read the specific paragraphs where the grandmother describes her feelings when the magazine arrives in the.', 'Draw a two-column table: Column A = Protagonist of Kashi Yatre (Old woman, wants Kashi, faces obstacles).', 'Column B = Grandmother (Old woman, wants Kashi/knowledge, faces illiteracy).', 'Ask: "If the serial was about a young king fighting a war, would she still be motivated?" The answer (No) proves the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
