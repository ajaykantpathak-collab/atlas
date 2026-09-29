import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch04_p1: SimDef = {
    id: 'v3_c11_eng_h_ch04_p1',
    title: 'Landscape of the Soul · Part 1/3',
    subtitle: 'See why Chinese painters walked away from the single fixed viewpoint on purpose.',
    classLevel: 11, subject: 'eng_h', topic: 'Landscape of the Soul · Part 1/3',
    chapters: ['c11_eng_h_ch04'],
    nodeIds: ['c11_eng_h_cbse_04_001', 'c11_eng_h_cbse_04_002', 'c11_eng_h_cbse_04_003', 'c11_eng_h_cbse_04_004', 'c11_eng_h_cbse_04_005', 'c11_eng_h_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a curator comparing two wings of an art museum', intro: 'Misty mountains with tiny humans on one side, pin-sharp portraits on the other — decide what each culture was really painting.', goal: 'Contrast the Chinese and European landscape traditions and interpret \'landscape of the soul.\'' },
    discovery: {
        question: 'A common verdict: Chinese landscape painting looks \'less realistic\' because its painters never mastered perspective. What\'s wrong with that?',
        options: ['They knew perspective but rejected it — the goal was conceptual completeness across viewpoints, not one frozen optical illusion', 'Nothing — they genuinely lacked the technique until Europe arrived', 'They avoided perspective only because paper scrolls were too small', 'Realism was banned under imperial decree'],
        answer: 'They knew perspective but rejected it — the goal was conceptual completeness across viewpoints, not one frozen optical illusion',
        hook: 'Judging Shanshui by European realism is a rigged test — the European painter lends you his eyes; the Chinese painter invites you into his mind.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Landscape of the Soul\' (Hornbill, ch. 4) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Contrast single-viewpoint perspective with a scroll\'s travelling viewpoints, then test whether \'landscape of the soul\' implies a greener relationship to nature.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'Landscape of the Soul\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the primary function of the introduction in an argumentative essay like "The Ailing Planet"?', options: [
                { text: 'The introduction establishes the context (the Green Movement\'s rise), presents the', outcome: 'The introduction establishes the context (the Green Movement\'s rise), presents the central thesis.' },
                { text: 'it introduces the topic', outcome: 'Not quite — Students often believe "plot" and "narrative structure" only apply to stories with characters and.', reveals: 'plot-and-narrative-structure-only' },
                { text: 'narrative structure', outcome: 'Not quite — Students often believe "plot" and "narrative structure" only apply to stories with characters and.', reveals: 'plot-and-narrative-structure-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Landscape of the Soul\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the primary difference between the \'setting\' of a conventional story and the \'setting\' in "Landscape of the Soul"?', options: [
                { text: 'In a conventional story, setting is a physical time and place (e.g., a village in', outcome: 'In a conventional story, setting is a physical time and place (e.g., a village in 19th-century.' },
                { text: 'the setting is China and Europe', outcome: 'Not quite — Students often think \'setting\' in this chapter means the physical locations mentioned (China.', reveals: 'setting-in-this-chapter-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Landscape of the Soul\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'Define \'protagonist\' in literary terms and distinguish it from \'main character\' using a precise, board-exam appropriate definition.', options: [
                { text: 'A protagonist is the central character who drives the narrative action through their', outcome: 'A protagonist is the central character who drives the narrative action through their goals.' },
                { text: 'He is brave: \'he fought the tiger\'', outcome: 'Not quite — Students believe character analysis = listing traits with quotes ("He is brave: \'he fought the.', reveals: 'character-analysis-listing-traits-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Landscape of the Soul\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'List any three experts or authoritative voices cited by Nani Palkhivala in "The Ailing Planet" and state the specific claim each one.', options: [
                { text: 'Correct answer: (1) Lester R', outcome: 'Correct answer: (1) Lester R. Brown — supports the claim that four biological systems (fisheries.' },
                { text: 'life tenancy with a full repairing lease', outcome: 'Not quite — Students treat cited names in non-fiction as "name-dropping" to memorize for exams, rather than.', reveals: 'students-treat-cited-names-in' },
                { text: 'the author Nani Palkhivala or fictional characters', outcome: 'Not quite — Students treat cited names in non-fiction as "name-dropping" to memorize for exams, rather than.', reveals: 'students-treat-cited-names-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Landscape of the Soul\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the fundamental difference between the European and Chinese view of art as presented in the opening paragraphs of the chapter?', options: [
                { text: 'The European view aims for illusionistic likeness', outcome: 'The European view aims for illusionistic likeness — a perfect visual replica of the external world.' },
                { text: 'Chinese art is less skilled', outcome: 'Not quite — Students often believe the chapter argues that **Chinese art is "better" or "more advanced" than.', reveals: 'the-chapter-argues-that-chinese' },
                { text: 'European art is more beautiful', outcome: 'Not quite — Students often believe the chapter argues that **Chinese art is "better" or "more advanced" than.', reveals: 'the-chapter-argues-that-chinese' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Curating the school art show, you hang a Song-dynasty style scroll beside a Renaissance-style portrait. A visitor remarks: \'The Chinese painting is charming but primitive — those artists hadn\'t discovered perspective yet. European art was simply more advanced.\'',
            decisions: [{ prompt: 'Is \'hadn\'t discovered perspective\' a fair reading?', options: [
                { text: 'No — Chinese artists knew perspective (their architecture proves it) but deliberately used multiple viewpoints: the goal of Shanshui was conceptual completeness — letting the viewer spiritually enter the landscape and wander it — not an optical illusion for a single eye at a single moment. It\'s a choice of aim, not a lack of skill.', outcome: 'Judging one tradition by another\'s goal posts is the error: Wu Daozi\'s painting-as-doorway versus Metsys\'s fly-real-enough-to-swat are different ideas of what art is for.' },
                { text: 'Fair — realism measures progress; perspective is the technical peak of painting.', outcome: 'That\'s the Eurocentric assumption the chapter dismantles: \'one eye, one moment, one truth\' is the European aim; the Chinese aim was the Dao — a mountain has no single correct view.', reveals: 'perspective-equals-progress' },
                { text: 'The scroll is just decorative — landscapes can\'t carry philosophy.', outcome: 'Shanshui literally means mountain-water as a vision of complementary forces; the misty gaps are the Daoist void the viewer\'s imagination is meant to fill.', reveals: 'landscape-is-decoration' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'A European landscape is a window you look through; a Chinese one is a country you wander — the difference is a philosophy, not a skill gap.',
            decisions: [{ prompt: 'What comes next? Landscape of the Soul · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Landscape of the Soul · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_001', difficulty: 'standard',
          question: '\'Landscape of the Soul\' (Hornbill, ch. 4) — the context and background to this.',
          hint: 'If stuck, review Class 9 *Pankha* chapter (c9_engl_ch3_5, c9_engl_ch3_9) — how a simple.',
          misconception: 'Students often think \'Chinese art is less realistic because they lacked perspective techniques\' — a Eurocentric error.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'Landscape of the Soul\' (Hornbill, ch',
                  options: ['\'Landscape of the Soul\' (Hornbill, ch', 'The plot/narrative arc of \'Landscape of the Soul\'', 'The setting of \'Landscape of the Soul\'', 'Character analysis in \'Landscape of the Soul\''],
                  hint: 'If stuck, review Class 9 *Pankha* chapter (c9_engl_ch3_5, c9_engl_ch3_9) — how a simple hand fan.',
                  misconception: 'Students often think \'Chinese art is less realistic because they lacked perspective techniques\' — a Eurocentric error.' }
          ],
            remediations: { 'chinese-art-is-less-realistic': { steps: ['If a student holds this misconception: (1) Show a Chinese architectural drawing with accurate perspective — prove.', '(2) Display a Song dynasty scroll (e.g., *Along the River During Qingming Festival*) and ask: "How many viewpoints can.', '(3) Ask: "If they could do perspective, why didn\'t they use it in landscapes?" Lead to the answer: "Because a mountain.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Landscape of the Soul\' — what happens, in what.',
          hint: 'Review Class 10 "A Letter to God" (c10_engl_cbse_01_002) to practice identifying how.',
          misconception: 'Students often believe "plot" and "narrative structure" only apply to stories with characters and events, so they look.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'Landscape of the Soul\'',
                  options: ['The plot/narrative arc of \'Landscape of the Soul\'', '\'Landscape of the Soul\' (Hornbill, ch', 'The setting of \'Landscape of the Soul\'', 'Character analysis in \'Landscape of the Soul\''],
                  hint: 'Review Class 10 "A Letter to God" (c10_engl_cbse_01_002) to practice identifying how a single event.',
                  misconception: 'Students often believe "plot" and "narrative structure" only apply to stories with characters and events, so they look for a protagonist.' }
          ],
            remediations: { 'plot-and-narrative-structure-only': { steps: ['If a student cannot move beyond "beginning, middle, end," take a single paragraph (e.g., the Brandt Commission.', 'Then have the student replicate this for the next paragraph, gradually building a paragraph-by-paragraph map that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "plot" and "narrative structure" only apply to stories with characters and events, so they look.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the conclusion\'s use of two quotations (Margaret Thatcher\'s "life tenancy" and Lester Brown\'s "borrowed from our children").', answer: 'The dual quotation is more effective',
                  options: ['The dual quotation is more effective', 'narrative structure'],
                  hint: 'Review Class 10 "A Letter to God" (c10_engl_cbse_01_002) to practice identifying how a single event.',
                  misconception: 'Students often believe "plot" and "narrative structure" only apply to stories with characters and events, so they look for a protagonist.' }
          ],
            remediations: { 'plot-and-narrative-structure-only': { steps: ['If a student cannot move beyond "beginning, middle, end," take a single paragraph (e.g., the Brandt Commission.', 'Then have the student replicate this for the next paragraph, gradually building a paragraph-by-paragraph map that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_003', difficulty: 'standard',
          question: 'The setting of \'Landscape of the Soul\' — the place, time and atmosphere the.',
          hint: 'If stuck, review c11_eng_h_cbse_04_001\'s explanation of \'shanshui\' and \'illusionistic.',
          misconception: 'Students often think \'setting\' in this chapter means the physical locations mentioned (China, Europe, the Tang dynasty.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'Landscape of the Soul\'',
                  options: ['The setting of \'Landscape of the Soul\'', '\'Landscape of the Soul\' (Hornbill, ch', 'The plot/narrative arc of \'Landscape of the Soul\'', 'Character analysis in \'Landscape of the Soul\''],
                  hint: 'If stuck, review c11_eng_h_cbse_04_001\'s explanation of \'shanshui\' and \'illusionistic likeness\'.',
                  misconception: 'Students often think \'setting\' in this chapter means the physical locations mentioned (China, Europe, the Tang dynasty court, Flanders).' }
          ],
            remediations: { 'setting-in-this-chapter-means': { steps: ['If a student insists setting = physical place: (1) Ask them to locate \'the setting\' on a map — they\'ll point.', '(2) Ask: "Does the chapter describe Chinese weather, streets, or daily life in 8th-century Tang?" No.', '(3) Show the sentence: "The Chinese painter wants you to enter his mind." Ask: "Where is \'his mind\' located?" It\'s not.', '(4) Have them re-read the Wu Daozi paragraph and underline every word referring to physical place vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_004', difficulty: 'standard',
          question: 'Character analysis in \'Landscape of the Soul\' — the central figure(s), their.',
          hint: 'Review "Character vs. Characterization" distinction (Forster\'s flat/round.',
          misconception: 'Students believe character analysis = listing traits with quotes ("He is brave: \'he fought the tiger\'").',
          parts: [
                { id: 'a', prompt: 'Given this character action: "She placed the letter in the fire without reading it," identify TWO methods of indirect characterization at work and explain what.', answer: '1) Action: The deliberate destruction without reading shows suppression of',
                  options: ['1) Action: The deliberate destruction without reading shows suppression of', 'it shows she\'s secretive', 'the author shows she is brave', 'He is brave: \'he fought the tiger\''],
                  hint: 'Review "Character vs. Characterization" distinction (Forster\'s flat/round, static/dynamic) from.',
                  misconception: 'Students believe character analysis = listing traits with quotes ("He is brave: \'he fought the tiger\'").' }
          ],
            remediations: { 'character-analysis-listing-traits-with': { steps: ['Require every trait claim to follow the formula: "When [specific situation], the protagonist chooses [action] over.', 'Use the "Pressure Test": Give students 3 hypothetical high-stakes scenarios not in the text.', 'Ask: "What would the protagonist do?', 'Quote the textual evidence that predicts this." 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_005', difficulty: 'standard',
          question: 'Supporting characters in \'Landscape of the Soul\' — the secondary figures who.',
          hint: 'If stuck, review c11_eng_h_cbse_04_002 (Text: Plot and Narrative Structure) to map the.',
          misconception: 'Students treat cited names in non-fiction as "name-dropping" to memorize for exams, rather than as strategic rhetorical.',
          parts: [
                { id: 'a', prompt: 'List any three experts or authoritative voices cited by Nani Palkhivala in "The Ailing Planet" and state the specific claim each one supports.', answer: 'Correct answer: (1) Lester R',
                  options: ['Correct answer: (1) Lester R', 'life tenancy with a full repairing lease', 'the author Nani Palkhivala or fictional characters'],
                  hint: 'If stuck, review c11_eng_h_cbse_04_002 (Text: Plot and Narrative Structure) to map the essay\'s.',
                  misconception: 'Students treat cited names in non-fiction as "name-dropping" to memorize for exams, rather than as strategic rhetorical moves.' },
                { id: 'b', prompt: 'Explain in your own words why Palkhivala cites the Brandt Commission and specifically mentions Mr. L.K. Jha as an Indian member.', answer: 'Correct answer: The Brandt Commission (an international commission on',
                  options: ['Correct answer: The Brandt Commission (an international commission on', 'to show the commission had Indian members'],
                  hint: 'If stuck, review c11_eng_h_cbse_04_002 (Text: Plot and Narrative Structure) to map the essay\'s.',
                  misconception: 'Students treat cited names in non-fiction as "name-dropping" to memorize for exams, rather than as strategic rhetorical moves.' },
                { id: 'c', prompt: 'In the essay, Palkhivala writes: "In the zoo at Lusaka, Zambia, there is a cage where the notice reads, \'The world\'s most dangerous animal.\' Inside the cage.', answer: 'Correct answer: The Lusaka zoo mirror acts as a "silent witness"',
                  options: ['Correct answer: The Lusaka zoo mirror acts as a "silent witness"', 'from domination to partnership', 'it\'s just an interesting anecdote', 'it describes a zoo'],
                  hint: 'If stuck, review c11_eng_h_cbse_04_002 (Text: Plot and Narrative Structure) to map the essay\'s.',
                  misconception: 'Students treat cited names in non-fiction as "name-dropping" to memorize for exams, rather than as strategic rhetorical moves.' }
          ],
            remediations: { 'students-treat-cited-names-in': { steps: ['Have the student create a two-column table: Column A = Expert Name, Column B = Specific Claim They Support.', 'For each row, ask: "Could ANY expert make this claim? Why THIS one?" (e.g., Brown is an economist — why does.', 'Practice converting each row into a PEEL paragraph starter: "Palkhivala invokes [Expert] to establish that [Claim].'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_04_006', difficulty: 'standard',
          question: 'The primary theme of \'Landscape of the Soul\' — the central idea the whole text.',
          hint: 'If stuck, return to the two anecdotes and ask: "What does each painter *want* the viewer.',
          misconception: 'Students often believe the chapter argues that **Chinese art is "better" or "more advanced" than European art** because.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between the European and Chinese view of art as presented in the opening paragraphs of the chapter?', answer: 'The European view aims for illusionistic likeness',
                  options: ['The European view aims for illusionistic likeness', 'Chinese art is less skilled', 'European art is more beautiful', 'better'],
                  hint: 'If stuck, return to the two anecdotes and ask: "What does each painter *want* the viewer.',
                  misconception: 'Students often believe the chapter argues that **Chinese art is "better" or "more advanced" than European art** because the Wu Daozi story.' },
                { id: 'b', prompt: 'Apply the concept of \'shanshui\' (mountain-water) to explain why a Chinese landscape painting never has a single fixed viewpoint.', answer: 'Step 1: Recall the definition of shanshui',
                  options: ['Step 1: Recall the definition of shanshui', 'lack of perspective technique', 'better', 'more advanced'],
                  hint: 'If stuck, return to the two anecdotes and ask: "What does each painter *want* the viewer.',
                  misconception: 'Students often believe the chapter argues that **Chinese art is "better" or "more advanced" than European art** because the Wu Daozi story.' }
          ],
            remediations: { 'the-chapter-argues-that-chinese': { steps: ['**Re-read the two anecdotes side-by-side** (Wu Daozi vs.', 'Make a two-column table: Column A = What the painter *does*; Column B = What the viewer *experiences*.', '**Highlight every sentence** where the author uses contrastive markers: "whereas," "unlike," "on the other hand," "the.', '**Write one sentence** answering: "If the goal of art is *communication*, what is being communicated in each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
