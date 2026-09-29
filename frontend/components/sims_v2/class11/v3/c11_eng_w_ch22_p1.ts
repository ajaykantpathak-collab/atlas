import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch22_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch22_p1: SimDef = {
    id: 'v3_c11_eng_w_ch22_p1',
    title: 'Tribal Verse (Essay) · Part 1/3',
    subtitle: 'Defend a literature with no script, no author and centuries of memory.',
    classLevel: 11, subject: 'eng_w', topic: 'Tribal Verse (Essay) · Part 1/3',
    chapters: ['c11_eng_w_ch22'],
    nodeIds: ['c11_eng_w_cbse_22_001', 'c11_eng_w_cbse_22_002', 'c11_eng_w_cbse_22_003', 'c11_eng_w_cbse_22_004', 'c11_eng_w_cbse_22_005', 'c11_eng_w_cbse_22_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a literature student arguing orality counts', intro: 'A Munda song, a Kondh song, an Adi song — none ever written down, all carried for centuries. Decide if that disqualifies them.', goal: 'Evaluate orality as literature and analyse the essay\'s inductive structure.' },
    discovery: {
        question: '\'Tribal songs are just folklore — no fixed form, no real authorship, no depth.\' Devy\'s counterargument?',
        options: ['Oral literatures run on strict conventions passed through performance — and every written literature still carries layers of orality', 'Correct — without a script there can be no literature', 'Correct — anonymity means no aesthetic intent exists', 'Partly — they only gain depth once translated into print'],
        answer: 'Oral literatures run on strict conventions passed through performance — and every written literature still carries layers of orality',
        hook: 'The bias is print\'s, not the songs\' — a living library carried in voice and memory is still literature, just one our syllabus forgot.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'My Three Passions\' (Woven Words, ch. 22) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_22_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the three tribal songs as evidence, then the \'Painted Words\' theory — and explain why the argument puts examples before analysis.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'My Three Passions\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'What is the primary difference between an "intellectual autobiography" and a conventional chronological memoir?', options: [
                { text: 'An intellectual autobiography organizes narrative around the development of ideas,', outcome: 'An intellectual autobiography organizes narrative around the development of ideas, beliefs, and.' },
                { text: 'intellectual autobiography is written by smart people', outcome: 'Not quite — Students treat "Before You Read" as optional background trivia rather than the *interpretive lens*.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'My Three Passions\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the primary organizing principle of the narrative structure in "My Three Passions"?', options: [
                { text: 'The essay is organized thematically around three passions (love, knowledge, pity), not', outcome: 'The essay is organized thematically around three passions (love, knowledge, pity), not.' },
                { text: 'It follows Russell\'s life from childhood to old age', outcome: 'Not quite — Students often think "plot" only exists in fiction and therefore claim the essay "has no plot.".', reveals: 'plot-only-exists-in-fiction' },
                { text: 'only exists in fiction and therefore claim the essay', outcome: 'Not quite — Students often think "plot" only exists in fiction and therefore claim the essay "has no plot.".', reveals: 'plot-only-exists-in-fiction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'My Three Passions\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the primary metaphorical setting Russell establishes in the opening paragraph, and what single word best captures the atmosphere.', options: [
                { text: 'The primary metaphorical setting is a "deep ocean of anguish" with a "wayward course"', outcome: 'The primary metaphorical setting is a "deep ocean of anguish" with a "wayward course" driven.' },
                { text: 'a journey', outcome: 'Not quite — Students treat "setting" only as *where/when* a story happens (physical geography, historical.', reveals: 'students-treat-setting-only-as' },
                { text: 'sadness', outcome: 'Not quite — Students treat "setting" only as *where/when* a story happens (physical geography, historical.', reveals: 'students-treat-setting-only-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'My Three Passions\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'In "My Three Passions," which explicitly named historical or literary figures appear as supporting characters in Russell\'s narrative?', options: [
                { text: 'Correct answer: No explicitly named individuals appear as supporting characters', outcome: 'Correct answer: No explicitly named individuals appear as supporting characters.' },
                { text: 'Pythagoras', outcome: 'Not quite — Students consistently treat the suffering groups (famine children, torture victims, elderly).', reveals: 'students-consistently-treat-the-suffering' },
                { text: 'saints', outcome: 'Not quite — Students consistently treat the suffering groups (famine children, torture victims, elderly).', reveals: 'students-consistently-treat-the-suffering' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'My Three Passions\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What are the three passions Bertrand Russell explicitly names in the opening sentence of "My Three Passions"?', options: [
                { text: 'The three passions are: the longing for love, the search for knowledge, and unbearable', outcome: 'The three passions are: the longing for love, the search for knowledge, and unbearable pity for the.' },
                { text: 'freedom', outcome: 'Not quite — Students often treat the three passions as a simple list of hobbies or virtues (like "Russell liked.', reveals: 'students-often-treat-the-three' },
                { text: 'happiness', outcome: 'Not quite — Students often treat the three passions as a simple list of hobbies or virtues (like "Russell liked.', reveals: 'students-often-treat-the-three' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing your university personal statement, you open Russell\'s \'My Three Passions\' for a model. A friend skims it and says: \'Useless — he doesn\'t even tell his life story, just three abstract feelings. And ending with “I\'d live it again” is plain optimism.\'',
            decisions: [{ prompt: 'Why does Russell\'s structure actually work as a model?', options: [
                { text: 'Show the genre: it\'s an intellectual autobiography — a map of inner geography, not a chronological travelogue. Three passions (love, knowledge, pity) are \'great winds\' blowing him across an \'ocean of anguish\'; each gets a paragraph, and the circular ending mirrors the opening. And context hardens the close: a pacifist jailed in WWI who faced the abyss earned \'I would gladly live it again\' as a verdict, not a platitude.', outcome: 'Your friend sees the craft: select governing passions, unify them with metaphor, close the circle — exactly what a personal statement should do.' },
                { text: 'Agree it\'s a weak model — a real autobiography should narrate events year by year.', outcome: 'In reflective essays structure serves argument, not chronology; the \'plot\' is thesis → each passion → synthesis.', reveals: 'autobiography-must-be-chronological' },
                { text: 'Take the ending at face value — Russell was simply a cheerful optimist about life.', outcome: 'Without the context — prison for pacifism, activism, a logician\'s view of suffering — the verdict reads as optimism; with it, it\'s a hard-won existential choice.', reveals: 'russell-ending-is-platitude' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_22_006', title: 'The bigger picture',
          caseStudy: { intro: 'The songs come first so you meet the literature before you\'re allowed to theorise it — induction is the essay\'s politics.',
            decisions: [{ prompt: 'What comes next? Tribal Verse (Essay) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Tribal Verse (Essay) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_001', difficulty: 'standard',
          question: '\'My Three Passions\' (Woven Words, ch. 22) — the context and background to this.',
          hint: 'Review c9_engl_ch1_4 (Krishtakka\'s literacy journey) and identify the *governing idea*.',
          misconception: 'Students treat "Before You Read" as optional background trivia rather than the *interpretive lens* without which the.',
          parts: [
                { id: 'a', prompt: 'Analyze the phrase "mystic miniature" in the context of Russell\'s description of love: "in the union of love, I have seen, in a mystic miniature, the.', answer: '"Mystic" suggests the infinite, transcendent, and ineffable',
                  options: ['"Mystic" suggests the infinite, transcendent, and ineffable', 'mystic = religious'],
                  hint: 'Review c9_engl_ch1_4 (Krishtakka\'s literacy journey) and identify the *governing idea* (empowerment.',
                  misconception: 'Students treat "Before You Read" as optional background trivia rather than the *interpretive lens* without which the text remains opaque.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Show a 2-minute clip of Russell\'s 1959 "Face to Face" interview (available on YouTube) where he speaks about nuclear.', 'Give a 3-row table: Column A = Biographical Fact (e.g., "Imprisoned 1918 for anti-conscription article"), Column.', 'Ask: "If Russell had not been imprisoned, would the essay\'s tone change?', 'Re-read the opening paragraph aloud; students annotate where each biographical fact echoes in the language.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'My Three Passions\' — what happens, in what order.',
          hint: 'Review c10_engl_cbse_08_008 (parable structure) and c9_engl_ch1_7 (first-person.',
          misconception: 'Students often think "plot" only exists in fiction and therefore claim the essay "has no plot." They confuse plot.',
          parts: [
                { id: 'a', prompt: 'Analyze why Russell places "pity" last and gives it the final word before the concluding reflection, whereas love and knowledge "led upward toward the heavens."', answer: 'Pity is earth-bound and forces a return to reality',
                  options: ['Pity is earth-bound and forces a return to reality', 'pity is the most important', 'only exists in fiction and therefore claim the essay', '"plot" only exists in fiction and therefore claim the essay "has no plot'],
                  hint: 'Review c10_engl_cbse_08_008 (parable structure) and c9_engl_ch1_7 (first-person perspective) to see.',
                  misconception: 'Students often think "plot" only exists in fiction and therefore claim the essay "has no plot." They confuse plot (causal sequence.' }
          ],
            remediations: { 'plot-only-exists-in-fiction': { steps: ['Ask the student to list the three passions in order.', 'Have them draw a diagram: three boxes labeled Love, Knowledge, Pity, with arrows showing "upward" for first two.', 'Ask: "Why does Russell put the downward arrow last?" 4.', 'Guide them to see the structure as an argument: two uplifting forces, one grounding force, concluding with integration.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "plot" only exists in fiction and therefore claim the essay "has no plot." They confuse plot.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of Russell\'s circular structure (opening declaration → three passions → closing affirmation "I have found it worth living").', answer: 'The circular structure is more persuasive',
                  options: ['The circular structure is more persuasive', 'it\'s easier to follow', 'only exists in fiction and therefore claim the essay', '"plot" only exists in fiction and therefore claim the essay "has no plot'],
                  hint: 'Review c10_engl_cbse_08_008 (parable structure) and c9_engl_ch1_7 (first-person perspective) to see.',
                  misconception: 'Students often think "plot" only exists in fiction and therefore claim the essay "has no plot." They confuse plot (causal sequence.' }
          ],
            remediations: { 'plot-only-exists-in-fiction': { steps: ['Ask the student to list the three passions in order.', 'Have them draw a diagram: three boxes labeled Love, Knowledge, Pity, with arrows showing "upward" for first two.', 'Ask: "Why does Russell put the downward arrow last?" 4.', 'Guide them to see the structure as an argument: two uplifting forces, one grounding force, concluding with integration.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_003', difficulty: 'standard',
          question: 'The setting of \'My Three Passions\' — the place, time and atmosphere the text.',
          hint: 'Review "Metaphor vs. Simile" and "Extended Metaphor" from Class 10 (c10_engl_cbse_03_007.',
          misconception: 'Students treat "setting" only as *where/when* a story happens (physical geography, historical period).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'My Three Passions\'',
                  options: ['The setting of \'My Three Passions\'', '\'My Three Passions\' (Woven Words, ch', 'The plot/narrative arc of \'My Three Passions\'', 'Character analysis in \'My Three Passions\''],
                  hint: 'Review "Metaphor vs. Simile" and "Extended Metaphor" from Class 10 (c10_engl_cbse_03_007.',
                  misconception: 'Students treat "setting" only as *where/when* a story happens (physical geography, historical period).' }
          ],
            remediations: { 'students-treat-setting-only-as': { steps: ['**Re-teach the distinction:** Use a two-column table: "Physical Setting (Fiction)" vs.', '"Metaphorical Setting (Lyric Essay)." Fill it with examples from Class 10 (e.g., Lencho\'s farm vs.', 'the "house of hope" in "A Letter to God").', '**Close reading drill:** Give the student only the first paragraph with all metaphors bolded.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_004', difficulty: 'standard',
          question: 'Character analysis in \'My Three Passions\' — the central figure(s), their.',
          hint: 'If stuck, review the \'wind/ ocean/ abyss/ heaven/ earth\' imagery cluster.',
          misconception: 'Students often treat the three passions as a static list of personality traits (e.g., \'Russell was loving, curious, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis in \'My Three Passions\'',
                  options: ['Character analysis in \'My Three Passions\'', '\'My Three Passions\' (Woven Words, ch', 'The plot/narrative arc of \'My Three Passions\'', 'The setting of \'My Three Passions\''],
                  hint: 'If stuck, review the \'wind/ ocean/ abyss/ heaven/ earth\' imagery cluster in c11_eng_w_cbse_22_003.',
                  misconception: 'Students often treat the three passions as a static list of personality traits (e.g., \'Russell was loving, curious, and compassionate\').' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['If a student produces a trait-list answer: (1) Return them to the opening paragraph — have them circle the verbs.', '(2) Ask: "Does Russell *choose* these passions, or do they *choose* him?" (3) Have them draw a vertical axis on paper.', '(4) Require them to rewrite one PEEL paragraph using the spatial metaphor as the Point.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_005', difficulty: 'standard',
          question: 'Supporting characters in \'My Three Passions\' — the secondary figures who move.',
          hint: 'Review c11_eng_w_cbse_22_004 (Protagonist Analysis) focusing on how Russell constructs.',
          misconception: 'Students consistently treat the suffering groups (famine children, torture victims, elderly) as *narrative characters*.',
          parts: [
                { id: 'a', prompt: 'In "My Three Passions," which explicitly named historical or literary figures appear as supporting characters in Russell\'s narrative?', answer: 'Correct answer: No explicitly named individuals appear as supporting characters',
                  options: ['Correct answer: No explicitly named individuals appear as supporting characters', 'Pythagoras', 'saints'],
                  hint: 'Review c11_eng_w_cbse_22_004 (Protagonist Analysis) focusing on how Russell constructs *himself*.',
                  misconception: 'Students consistently treat the suffering groups (famine children, torture victims, elderly) as *narrative characters* with whom Russell.' }
          ],
            remediations: { 'students-consistently-treat-the-suffering': { steps: ['Have the student highlight every proper noun and human reference in the essay.', 'Categorize each as "named individual," "generic group," or "abstract allusion."', 'For each generic group, ask: "Does Russell describe *meeting* them, or *knowing of* them?"', 'Re-read the pity paragraph noting "Echoes of cries... reverberate in my heart"—emphasize *echoes* (mediated, not.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_22_006', difficulty: 'standard',
          question: 'The primary theme of \'My Three Passions\' — the central idea the whole text.',
          hint: 'Review the PEEL paragraph structure and theme-analysis modeling in c10_engl_cbse_01_006.',
          misconception: 'Students often treat the three passions as a simple list of hobbies or virtues (like "Russell liked love, learning, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of \'My Three Passions\'',
                  options: ['The primary theme of \'My Three Passions\'', '\'My Three Passions\' (Woven Words, ch', 'The plot/narrative arc of \'My Three Passions\'', 'The setting of \'My Three Passions\''],
                  hint: 'Review the PEEL paragraph structure and theme-analysis modeling in c10_engl_cbse_01_006 (Theme.',
                  misconception: 'Students often treat the three passions as a simple list of hobbies or virtues (like "Russell liked love, learning, and helping people").' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['Ask the student to re-read only the first paragraph and underline every adjective modifying "passions" (simple.', 'Have them draw a quick sketch: three labeled winds blowing a stick figure over a chasm labeled "anguish" toward a cliff.', 'Discuss: "If these were just hobbies, would they blow you to the verge of despair?" 4.', 'Guide them to rewrite their summary using the words "govern," "force," and "suffering."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
