import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch01_p1: SimDef = {
    id: 'v3_c9_engl_ch01_p1',
    title: 'How I Taught My Grandmother to Read · Part 1/2',
    subtitle: 'A grandmother, a deadline, and a role reversal',
    classLevel: 9, subject: 'engl', topic: 'How I Taught My Grandmother to Read · Part 1/2',
    chapters: ['c9_engl_ch01'],
    nodeIds: ['c9_engl_ch1_1', 'c9_engl_ch1_10', 'c9_engl_ch1_2', 'c9_engl_ch1_3', 'c9_engl_ch1_4', 'c9_engl_ch1_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a storyteller practising the two-minute version', intro: 'You have two minutes to tell someone the whole story of Krishtakka learning to read at 62. Every wasted word or sneaked-in opinion loses the plot — literally.', goal: 'Summarise \'How I Taught My Grandmother to Read\' — protagonist, setting, conflict, key events and resolution in order — distinguishing summary from analysis or opinion.' },
    discovery: {
        question: 'A 62-year-old grandmother touches her young granddaughter\'s feet — the oldest person bowing to the youngest. What flipped their roles?',
        options: ['Guru dakshina — the granddaughter taught Krishtakka to read, so the elder honoured the child as her teacher', 'The grandmother lost a bet', 'It\'s a village ritual with no story behind it', 'She was just being polite'],
        answer: 'Guru dakshina — the granddaughter taught Krishtakka to read, so the elder honoured the child as her teacher',
        hook: 'The story\'s hinge is a week of helplessness: when the granddaughter left for a wedding, Krishtakka couldn\'t read her beloved Kashi Yatre serial herself. And a summary traps that arc — events only, no \'this shows determination\' opinions.',
    },
    teaching: [
        { title: 'Story Summary: Krishtakka\'s Journey to Literacy', text: 'A story summary is a concise, objective restatement of a narrative\'s main events, characters, setting, conflict, and resolution in the student\'s own words, preserving chronological order and omitting.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch1_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Retell Krishtakka\'s journey in exactly the right shape: the Kashi Yatre dependence, the week alone, the Saraswati Puja deadline, the daily practice, and the guru dakshina bow — all in 100-150 words, zero opinions.',
        labels: ['Story Summary: Krishtakka\'s Journey', 'Values: Respect for Elders', 'Character Analysis: The Grandmother', 'Character Analysis: The Granddaughter', 'Theme: Literacy as Empowerment', 'Theme: Determination and'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch1_1', title: 'Story Summary: Krishtakka\'s Journey to Literacy',
          caseStudy: { intro: 'Imagine you have two minutes to tell a younger sibling the entire story of "How I Taught My Grandmother to Read" — what would you say?',
            decisions: [{ prompt: 'Who is the protagonist of the story and what is her name?', options: [
                { text: 'The protagonist is the grandmother, named Krishtakka (also called Avva)', outcome: 'The protagonist is the grandmother, named Krishtakka (also called Avva).' },
                { text: 'the granddaughter', outcome: 'Not quite — Students confuse summary with retelling every detail or adding analysis.', reveals: 'students-confuse-summary-with-retelling' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch1_10', title: 'Values: Respect for Elders and Inter-Generational Learning',
          caseStudy: { intro: 'Imagine you are visiting your grandmother during summer holidays and she asks you to teach her how to use a smartphone so she can video-call her sister.',
            decisions: [{ prompt: 'Define "inter-generational learning" in the context of the story "How I Taught My Grandmother to Read" in one sentence.', options: [
                { text: 'Inter-generational learning in the story is the bidirectional exchange where the', outcome: 'Inter-generational learning in the story is the bidirectional exchange where the granddaughter.' },
                { text: 'young teaching old', outcome: 'Not quite — Students believe "respect for elders" in the story is shown only through traditional gestures.', reveals: 'respect-for-elders-in-the' },
                { text: 'respect for elders', outcome: 'Not quite — Students believe "respect for elders" in the story is shown only through traditional gestures.', reveals: 'respect-for-elders-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch1_2', title: 'Character Analysis: The Grandmother (Krishtakka)',
          caseStudy: { intro: 'Imagine you\'re in the board exam and the question asks: "Analyze the character of the grandmother in \'How I Taught My Grandmother to Read\' with reference.',
            decisions: [{ prompt: 'What is the grandmother\'s name in the story, and what specific event triggers her decision to learn to read?', options: [
                { text: 'The grandmother\'s name is Krishtakka (also referred to as Avva)', outcome: 'The grandmother\'s name is Krishtakka (also referred to as Avva).' },
                { text: 'the grandmother felt happy', outcome: 'Not quite — Students treat character analysis as listing personality adjectives (kind, determined, old) without.', reveals: 'students-treat-character-analysis-as' },
                { text: 'the narrator describes the grandmother\'s eyes shining with satisfaction', outcome: 'Not quite — Students treat character analysis as listing personality adjectives (kind, determined, old) without.', reveals: 'students-treat-character-analysis-as' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch1_3', title: 'Character Analysis: The Granddaughter as Narrator',
          caseStudy: { intro: 'Imagine you are writing a diary entry as the granddaughter the night Krishtakka touches your feet — what would you write about your own feelings?',
            decisions: [{ prompt: 'What is the narrative point of view used in "How I Taught My Grandmother to Read," and who is the narrator?', options: [
                { text: 'The story uses first-person narrative point of view, and the narrator is the', outcome: 'The story uses first-person narrative point of view, and the narrator is the granddaughter (the.' },
                { text: 'third person', outcome: 'Not quite — Students often confuse the *narrator\'s* character with the *author\'s* biography, assuming every.', reveals: 'students-often-confuse-the-narrator' },
                { text: 'the grandmother', outcome: 'Not quite — Students often confuse the *narrator\'s* character with the *author\'s* biography, assuming every.', reveals: 'students-often-confuse-the-narrator' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch1_4', title: 'Theme: Literacy as Empowerment in Later Life',
          caseStudy: { intro: 'Imagine your grandmother struggling to read the dosage on a medicine bottle or the number of the bus she needs to take.',
            decisions: [{ prompt: 'State the core idea of the theme "Literacy as Empowerment in Later Life" as it applies to the story "How I Taught My Grandmother to Read".', options: [
                { text: 'The theme means that learning to read in old age gives the grandmother independence,', outcome: 'The theme means that learning to read in old age gives the grandmother independence, confidence.' },
                { text: 'learning to read', outcome: 'Not quite — Students often equate "literacy as empowerment" with "learning to read" and cite only the.', reveals: 'students-often-equate-literacy-as' },
                { text: 'reading the serial', outcome: 'Not quite — Students often equate "literacy as empowerment" with "learning to read" and cite only the.', reveals: 'students-often-equate-literacy-as' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch1_5', title: 'Theme: Determination and the Will to Learn',
          caseStudy: { intro: 'Imagine you want to learn a new skill like coding or a musical instrument, but everyone says you\'re "too old" or "it\'s too late." The grandmother in this story.',
            decisions: [{ prompt: 'What is the specific deadline Krishtakka sets for herself to learn to read, and why is that date significant in the story?', options: [
                { text: 'Krishtakka sets the deadline of Saraswati Pooja day, which is significant', outcome: 'Krishtakka sets the deadline of Saraswati Pooja day, which is significant because it is the.' },
                { text: 'her birthday', outcome: 'Not quite — Students often think determination in this story is shown only by the grandmother\'s *decision*.', reveals: 'determination-in-this-story-is' },
                { text: 'the wedding date', outcome: 'Not quite — Students often think determination in this story is shown only by the grandmother\'s *decision*.', reveals: 'determination-in-this-story-is' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'For homework, a student must summarise \'How I Taught My Grandmother to Read\' in 120 words. His draft opens: \'This inspiring story proves education matters and everyone should respect elders.\'',
            decisions: [{ prompt: 'What does a proper summary need instead?', options: [
                { text: 'Plot, not praise: Krishtakka, a 62-year-old in a North Karnataka village, depended on her granddaughter for the weekly Kashi Yatre serial; left alone for a week, she resolved to learn, set a Saraswati Puja deadline, practised daily, read independently, and honoured her granddaughter with guru dakshina — in order, without opinion.', outcome: 'This supplies protagonist, conflict, sequenced events and resolution — exactly what a summary is, minus the moralising.' },
                { text: 'His opening is right — a summary\'s job is to state the lesson the story teaches, and \'inspiring\' earns marks for insight.', outcome: 'Opinion is not summary; examiners want the ordered events and resolution, and \'it is inspiring\' proves nothing was read.', reveals: 'summary-is-moral' },
                { text: 'A better summary lists every scene — the wedding, the meals, each practice day — so nothing the author wrote is left out.', outcome: 'Exhaustive retelling is not summary either; the skill is selecting only the events that carry the conflict to its resolution.', reveals: 'summary-is-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch1_5', title: 'The bigger picture',
          caseStudy: { intro: 'A summary is the story\'s skeleton: who, where, what happened, how it ended — in order. The moment you say \'it was inspiring,\' you\'ve stopped summarising and started reviewing.',
            decisions: [{ prompt: 'What comes next? How I Taught My Grandmother to Read · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — How I Taught My Grandmother to Read · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch1_1', difficulty: 'standard',
          question: 'A story summary is a concise, objective restatement of a narrative\'s main.',
          hint: 'Revisit c8_engl_ch1_1 (Story Summary at Class 8 level) to practice basic summary skills.',
          misconception: 'Students confuse summary with retelling every detail or adding analysis.',
          parts: [
                { id: 'a', prompt: 'Who is the protagonist of the story and what is her name?', answer: 'The protagonist is the grandmother, named Krishtakka (also called Avva)',
                  options: ['The protagonist is the grandmother, named Krishtakka (also called Avva)', 'the granddaughter'],
                  hint: 'Revisit c8_engl_ch1_1 (Story Summary at Class 8 level) to practice basic summary skills before.',
                  misconception: 'Students confuse summary with retelling every detail or adding analysis.' },
                { id: 'b', prompt: 'What is the significance of the Saraswati Puja deadline in the story?', answer: 'The Saraswati Puja deadline is the date by',
                  options: ['The Saraswati Puja deadline is the date by', 'it is just a festival'],
                  hint: 'Revisit c8_engl_ch1_1 (Story Summary at Class 8 level) to practice basic summary skills before.',
                  misconception: 'Students confuse summary with retelling every detail or adding analysis.' }
          ],
            remediations: { 'students-confuse-summary-with-retelling': { steps: ['Give the student a 200-word story (e.g., "The Thirsty Crow") and ask them to summarize it in exactly 3 sentences.', 'Check: does each sentence cover a story element?', '(Sentence 1: protagonist + setting, Sentence 2: conflict + key event, Sentence 3: resolution).', 'If they add opinions, cross them out and ask: "Is this what happened, or what you think about it?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse summary with retelling every detail or adding analysis.',
          parts: [
                { id: 'a', prompt: 'What is the guru dakshina moment and why is it significant to the plot?', answer: 'Guru dakshina is the traditional offering',
                  options: ['Guru dakshina is the traditional offering', 'it is a gift'],
                  hint: 'Revisit c8_engl_ch1_1 (Story Summary at Class 8 level) to practice basic summary skills before.',
                  misconception: 'Students confuse summary with retelling every detail or adding analysis.' }
          ],
            remediations: { 'students-confuse-summary-with-retelling': { steps: ['Give the student a 200-word story (e.g., "The Thirsty Crow") and ask them to summarize it in exactly 3 sentences.', 'Check: does each sentence cover a story element?', '(Sentence 1: protagonist + setting, Sentence 2: conflict + key event, Sentence 3: resolution).', 'If they add opinions, cross them out and ask: "Is this what happened, or what you think about it?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch1_10', difficulty: 'standard',
          question: 'Respect for elders and inter-generational learning refers to the reciprocal.',
          hint: 'If stuck, review c9_engl_ch1_2 and c9_engl_ch1_3 focusing on "actions revealing values".',
          misconception: 'Students believe "respect for elders" in the story is shown only through traditional gestures (touching feet, using.',
          parts: [
                { id: 'a', prompt: 'Define "inter-generational learning" in the context of the story "How I Taught My Grandmother to Read" in one sentence.', answer: 'Inter-generational learning in the story is the bidirectional exchange where the',
                  options: ['Inter-generational learning in the story is the bidirectional exchange where the', 'young teaching old', 'respect for elders', 'inter-generational learning'],
                  hint: 'If stuck, review c9_engl_ch1_2 and c9_engl_ch1_3 focusing on "actions revealing values".',
                  misconception: 'Students believe "respect for elders" in the story is shown only through traditional gestures (touching feet, using honorifics) and that.' },
                { id: 'b', prompt: 'Explain why the granddaughter touching her grandmother\'s feet *after* the grandmother learns to read is a more powerful demonstration of respect than touching.', answer: 'At the start, touching feet is a cultural ritual',
                  options: ['At the start, touching feet is a cultural ritual', 'Indian tradition', 'respect for elders', 'inter-generational learning'],
                  hint: 'If stuck, review c9_engl_ch1_2 and c9_engl_ch1_3 focusing on "actions revealing values".',
                  misconception: 'Students believe "respect for elders" in the story is shown only through traditional gestures (touching feet, using honorifics) and that.' },
                { id: 'c', prompt: 'Apply the concept of "respect for elders\' autonomy" to this scenario: The grandmother initially refuses to learn, saying "I am too old." The granddaughter does.', answer: 'Step 1: Grandmother refuses (autonomy respected)',
                  options: ['Step 1: Grandmother refuses (autonomy respected)', 'she respected her by teaching her', 'respect for elders', 'inter-generational learning'],
                  hint: 'If stuck, review c9_engl_ch1_2 and c9_engl_ch1_3 focusing on "actions revealing values".',
                  misconception: 'Students believe "respect for elders" in the story is shown only through traditional gestures (touching feet, using honorifics) and that.' },
                { id: 'd', prompt: 'Analyze how the grandmother\'s gift of frock material to the granddaughter functions as a symbol of inter-generational learning, not just gratitude.', answer: 'The gift represents the grandmother passing on the value of "giving back" and',
                  options: ['The gift represents the grandmother passing on the value of "giving back" and', 'a thank-you gift', 'respect for elders', 'inter-generational learning'],
                  hint: 'If stuck, review c9_engl_ch1_2 and c9_engl_ch1_3 focusing on "actions revealing values".',
                  misconception: 'Students believe "respect for elders" in the story is shown only through traditional gestures (touching feet, using honorifics) and that.' }
          ],
            remediations: { 'respect-for-elders-in-the': { steps: ['Ask the student to list every time the granddaughter speaks to or about her grandmother—highlight words like "Avva,".', 'Separate these into "ritual respect" (cultural norms) and "earned respect" (responding to grandmother\'s choices).', 'Have them find one piece of advice the grandmother gives that changes the granddaughter\'s perspective.', 'Rewrite their answer using the template: "The text shows [action] which proves [value] because [explanation linking.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch1_2', difficulty: 'standard',
          question: 'Character analysis is the systematic examination of a literary character\'s.',
          hint: 'If stuck, review c6_english_u4_032 (Suraj character analysis) — it models the exact.',
          misconception: 'Students treat character analysis as listing personality adjectives (kind, determined, old) without proving them from.',
          parts: [
                { id: 'a', prompt: 'What is the grandmother\'s name in the story, and what specific event triggers her decision to learn to read?', answer: 'The grandmother\'s name is Krishtakka (also referred to as Avva)',
                  options: ['The grandmother\'s name is Krishtakka (also referred to as Avva)', 'the grandmother felt happy', 'the narrator describes the grandmother\'s eyes shining with satisfaction', 'describe the character'],
                  hint: 'If stuck, review c6_english_u4_032 (Suraj character analysis) — it models the exact.',
                  misconception: 'Students treat character analysis as listing personality adjectives (kind, determined, old) without proving them from the text.' },
                { id: 'b', prompt: 'Explain in your own words why the grandmother chooses the narrator as her teacher instead of asking someone else in the village.', answer: 'The grandmother chooses the narrator',
                  options: ['The grandmother chooses the narrator', 'she lived in the same house', 'the grandmother felt happy', 'the narrator describes the grandmother\'s eyes shining with satisfaction'],
                  hint: 'If stuck, review c6_english_u4_032 (Suraj character analysis) — it models the exact.',
                  misconception: 'Students treat character analysis as listing personality adjectives (kind, determined, old) without proving them from the text.' },
                { id: 'c', prompt: 'Find two specific actions the grandmother takes during her learning process that demonstrate her determination.', answer: 'Action 1: She sets a deadline',
                  options: ['Action 1: She sets a deadline', 'she studied hard', 'the grandmother felt happy', 'the narrator describes the grandmother\'s eyes shining with satisfaction'],
                  hint: 'If stuck, review c6_english_u4_032 (Suraj character analysis) — it models the exact.',
                  misconception: 'Students treat character analysis as listing personality adjectives (kind, determined, old) without proving them from the text.' }
          ],
            remediations: { 'students-treat-character-analysis-as': { steps: ['Give the student a two-column table — left column: "Trait Claim," right column: "Textual Proof (page/line.', 'Have them fill three rows for Krishtakka using only actions/dialogue from the story.', 'Model converting one row into a PEEL paragraph: Point (trait), Evidence (quote/action), Explanation (what it reveals).', 'Practice with a different character (e.g., Suraj from Class 6\'s "The Tunnel" node c6_english_u4_032) to transfer the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch1_3', difficulty: 'standard',
          question: 'The granddaughter serves as the first-person narrator and protagonist who.',
          hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) and "Character Analysis: Anand".',
          misconception: 'Students often confuse the *narrator\'s* character with the *author\'s* biography, assuming every detail about the.',
          parts: [
                { id: 'a', prompt: 'What is the narrative point of view used in "How I Taught My Grandmother to Read," and who is the narrator?', answer: 'The story uses first-person narrative point of view, and the narrator is the',
                  options: ['The story uses first-person narrative point of view, and the narrator is the', 'third person', 'the grandmother'],
                  hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) and "Character Analysis: Anand".',
                  misconception: 'Students often confuse the *narrator\'s* character with the *author\'s* biography, assuming every detail about the granddaughter is factually.' },
                { id: 'b', prompt: 'Explain why the granddaughter\'s statement "I did not know what to say" when Krishtakka touches her feet is a turning point in her character development.', answer: 'This moment shows the granddaughter\'s humility and emotional maturity',
                  options: ['This moment shows the granddaughter\'s humility and emotional maturity', 'she was surprised'],
                  hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) and "Character Analysis: Anand".',
                  misconception: 'Students often confuse the *narrator\'s* character with the *author\'s* biography, assuming every detail about the granddaughter is factually.' },
                { id: 'c', prompt: 'Compare the granddaughter\'s attitude toward literacy at the beginning of the story (reading *Kashi Yatre* aloud) with her attitude at the end (gifting the.', answer: 'Initially, reading is a shared ritual and entertainment',
                  options: ['Initially, reading is a shared ritual and entertainment', 'she gave a book'],
                  hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) and "Character Analysis: Anand".',
                  misconception: 'Students often confuse the *narrator\'s* character with the *author\'s* biography, assuming every detail about the granddaughter is factually.' }
          ],
            remediations: { 'students-often-confuse-the-narrator': { steps: ['Ask the student to list five things the *character* does in the story (not the author).', 'For each action, ask "What does this action show about her personality?" forcing inference from text.', 'Have them rewrite one diary entry (Diagnostic Q6) using only story events, not outside knowledge.', 'Explicitly contrast "Sudha Murty the writer" vs. "the granddaughter character" using a Venn diagram — only the overlap.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch1_4', difficulty: 'standard',
          question: 'Literacy as Empowerment in Later Life is the theme that explores how acquiring.',
          hint: 'Review c9_engl_ch1_1 (Story Summary) and c9_engl_ch1_2 (Grandmother Character Analysis).',
          misconception: 'Students often equate "literacy as empowerment" with "learning to read" and cite only the grandmother\'s ability.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the grandmother\'s decision to touch her granddaughter\'s feet at the end of the story is a powerful symbol of empowerment through.', answer: 'In Indian tradition, touching feet shows respect to a guru',
                  options: ['In Indian tradition, touching feet shows respect to a guru', 'gratitude', 'respect for elders', 'determination'],
                  hint: 'Review c9_engl_ch1_1 (Story Summary) and c9_engl_ch1_2 (Grandmother Character Analysis) to rebuild.',
                  misconception: 'Students often equate "literacy as empowerment" with "learning to read" and cite only the grandmother\'s ability to decode the novel.' }
          ],
            remediations: { 'students-often-equate-literacy-as': { steps: ['If a student conflates literacy with empowerment or confuses this theme with determination: Step 1 — Have them re-read.', 'Step 2 — Create a three-column table: "Before Literacy," "After Literacy," "Dimension of Empowerment." Fill it using.', 'Step 3 — Ask: "Which changes are about *skill* and which are about *power*?" Guide them to see that reading the letter.', 'Step 4 — Assign a one-paragraph answer using the table, requiring the phrase "This shows empowerment because..." for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch1_5', difficulty: 'standard',
          question: 'Determination and the Will to Learn refers to the internal drive that compels.',
          hint: 'If stuck, review c6_english_u1_003 (Theme: Dreams and Determination) to recall how.',
          misconception: 'Students often think determination in this story is shown only by the grandmother\'s *decision* to learn (a single.',
          parts: [
                { id: 'a', prompt: 'What is the specific deadline Krishtakka sets for herself to learn to read, and why is that date significant in the story?', answer: 'Krishtakka sets the deadline of Saraswati Pooja day, which is significant',
                  options: ['Krishtakka sets the deadline of Saraswati Pooja day, which is significant', 'her birthday', 'the wedding date'],
                  hint: 'If stuck, review c6_english_u1_003 (Theme: Dreams and Determination) to recall how Jahnavi\'s.',
                  misconception: 'Students often think determination in this story is shown only by the grandmother\'s *decision* to learn (a single moment), rather than the.' },
                { id: 'b', prompt: 'Apply the concept of \'agency\' to analyze the grandmother\'s action of touching the granddaughter\'s feet after learning to read.', answer: 'By touching her granddaughter\'s feet',
                  options: ['By touching her granddaughter\'s feet', 'just a cultural habit'],
                  hint: 'If stuck, review c6_english_u1_003 (Theme: Dreams and Determination) to recall how Jahnavi\'s.',
                  misconception: 'Students often think determination in this story is shown only by the grandmother\'s *decision* to learn (a single moment), rather than the.' }
          ],
            remediations: { 'determination-in-this-story-is': { steps: ['If a student cannot identify the daily practices, guide them to reread the paragraphs describing the teaching sessions.', 'Step 3 — Ask: "Which of these shows she treats learning as a ritual, not a task?" Step 4 — Connect ritual.', 'This shifts focus from the *vow* to the *practice*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
