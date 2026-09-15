import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch08_p1: SimDef = {
    id: 'v3_c12_eng_f_ch08_p1',
    title: 'Going Places · Part 1/3',
    subtitle: 'A boutique in the head, a biscuit factory at the gate',
    classLevel: 12, subject: 'eng_f', topic: 'Going Places · Part 1/3',
    chapters: ['c12_eng_f_ch08'],
    nodeIds: ['c12_eng_f_cbse_08_001', 'c12_eng_f_cbse_08_002', 'c12_eng_f_cbse_08_003', 'c12_eng_f_cbse_08_004', 'c12_eng_f_cbse_08_005', 'c12_eng_f_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Coming-of-age critic', intro: 'Sophie dreams in colour inside a grey industrial town. The distance between the two is the whole story.', goal: 'Distinguish adolescent fantasy from socio-economic reality in Going Places and unpack its double-edged title.' },
    discovery: {
        question: 'A student summarises Going Places as \'a girl who becomes a fashion designer and meets her footballer.\' What did they mistake for plot?',
        options: ['Sophie\'s fantasies — the boutique and Danny Casey are imagined constructions set against a biscuit-factory future, not events', 'Nothing — that\'s exactly what happens', 'Her real career plan', 'The sequel\'s plot'],
        answer: 'Sophie\'s fantasies — the boutique and Danny Casey are imagined constructions set against a biscuit-factory future, not events',
        hook: 'The title works twice: \'going places\' as ambition and as bitter irony — she\'s a working-class girl earmarked for a factory, unlikely to physically go anywhere. Confusing her daydreams with the story\'s facts is the exact trap the chapter sets.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: 'Context and background provide the essential framework — author\'s identity, historical period, socio-economic setting, and central thematic concerns — that a reader must grasp before engaging with.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map Sophie\'s dream-world against her street: weigh the boutique fantasies and hero worship against the steamy kitchen, grimy father and waiting canal — and decide how the title earns its irony.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are about to watch a film about a teenager who dreams of owning a luxury boutique while her family struggles to make ends meet in a small.',
            decisions: [{ prompt: 'Who is the author of "Going Places" and where does she currently live?', options: [
                { text: 'The author is A.R', outcome: 'The author is A.R. Barton, a modern writer who lives in Zurich.' },
                { text: 'About the Author', outcome: 'Not quite — Students often assume "Going Places" is set in India because it is in their English textbook,.', reveals: 'going-places-is-set-in' },
                { text: 'Going Places', outcome: 'Not quite — Students often assume "Going Places" is set in India because it is in their English textbook,.', reveals: 'going-places-is-set-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a movie where the main character keeps daydreaming, and you can\'t always tell what\'s real — that\'s exactly what A.R.',
            decisions: [{ prompt: 'What are the five stages of Freytag\'s pyramid, and which event in "Going Places" marks the climax?', options: [
                { text: 'The five stages are exposition, rising action, climax, falling action, and resolution', outcome: 'The five stages are exposition, rising action, climax, falling action, and resolution.' },
                { text: 'Going Places', outcome: 'Not quite — Students often believe the "plot" of "Going Places" is simply the sequence of things Sophie says.', reveals: 'the-plot-of-going-places' },
                { text: 'dramatic', outcome: 'Not quite — Students often believe the "plot" of "Going Places" is simply the sequence of things Sophie says.', reveals: 'the-plot-of-going-places' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you\'re Sophie standing in your steamy kitchen, staring at the "delicate bow" on your mother\'s apron while your father eats noisily — the setting feels.',
            decisions: [{ prompt: 'List the five distinct physical settings Sophie occupies or vividly imagines in the story, in chronological order of her experience.', options: [
                { text: 'The five settings are: (1) Sophie\'s home (kitchen/living area), (2) The street/arcade', outcome: 'The five settings are: (1) Sophie\'s home (kitchen/living area), (2) The street/arcade (Royce\'s.' },
                { text: 'merges the arcade and stadium, or omits Geoff\'s room', outcome: 'Not quite — Students often treat setting as a static backdrop ("the story happens in a poor house") rather than.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re asked in the board exam: "Sketch the character of Sophie in \'Going Places\'." Where do you begin?',
            decisions: [{ prompt: 'What is Sophie\'s most frequently stated dream in the opening conversation with Jansie?', options: [
                { text: 'Sophie says, "When I leave, I\'m going to have a boutique."', outcome: 'Sophie says, "When I leave, I\'m going to have a boutique." A wrong answer like "she wants to be.' },
                { text: 'When I leave, I\'m going to have a boutique', outcome: 'Not quite — Students often treat Sophie as a simple "daydreamer" and write generic answers like "She dreams big.', reveals: 'students-often-treat-sophie-as' },
                { text: 'she wants to be an actress', outcome: 'Not quite — Students often treat Sophie as a simple "daydreamer" and write generic answers like "She dreams big.', reveals: 'students-often-treat-sophie-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a movie where the main character has big dreams — who are the people around her that either pop her balloon or inflate it further?',
            decisions: [{ prompt: 'List the five major supporting characters in "Going Places" and state one defining trait for each with a brief textual reference.', options: [
                { text: 'The five major supporting characters are: (1) Jansie', outcome: 'The five major supporting characters are: (1) Jansie — practical/realistic ("Takes money, Soaf...' },
                { text: 'friend', outcome: 'Not quite — Students consistently treat Danny Casey as a "real character" who actually interacts with Sophie.', reveals: 'students-consistently-treat-danny-casey' },
                { text: 'talkative', outcome: 'Not quite — Students consistently treat Danny Casey as a "real character" who actually interacts with Sophie.', reveals: 'students-consistently-treat-danny-casey' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are scrolling through social media and see a classmate post about "meeting" a famous cricketer at a mall — but you know they were actually.',
            decisions: [{ prompt: 'What is the central message A.R. Barton conveys through Sophie\'s imagined encounter with Danny Casey?', options: [
                { text: 'The central message is that adolescent hero-worship creates a fragile sanctuary from a', outcome: 'The central message is that adolescent hero-worship creates a fragile sanctuary from a limiting.' },
                { text: 'Sophie lies about meeting a footballer', outcome: 'Not quite — Students often treat "theme" as a single-word label like "dreams" or "fantasy" and then hunt for.', reveals: 'students-often-treat-theme-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend from a struggling family talks of opening a boutique and \'meeting famous people\', spinning stories everyone half-believes. As her closest friend, you can choose how to respond.',
            decisions: [{ prompt: 'How do you handle her dreaming?', options: [
                { text: 'Respect the dream but ground it — talk honestly about money, training and next steps; \'Going Places\' shows fantasy becomes painful only when it substitutes for a plan.', outcome: 'Sophie\'s tragedy isn\'t ambition — it\'s that nothing connects the dream to the biscuit factory she\'s earmarked for.' },
                { text: 'Let the stories ride — dreaming costs nothing and planning is a buzzkill.', outcome: 'Sophie\'s Danny Casey fable shows untethered fantasy turns into self-deception and isolation.', reveals: 'fantasy-substitutes-plans' },
                { text: 'Tell her bluntly she\'ll end up at the factory and should stop embarrassing herself.', outcome: 'Mockery kills the aspiration without offering a path — the story critiques the trap, not the dreaming.', reveals: 'mockery-cures-dreaming' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hold a character\'s fantasy and her fate in the same frame — the double vision this story demands and every adolescent knows.',
            decisions: [{ prompt: 'What comes next? Going Places · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Going Places · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_001', difficulty: 'standard',
          question: 'Context and background provide the essential framework — author\'s identity.',
          hint: 'If stuck, review how to annotate a text\'s first page for setting clues (time, place.',
          misconception: 'Students often assume "Going Places" is set in India because it is in their English textbook, or they think Sophie\'s.',
          parts: [
                { id: 'a', prompt: 'Who is the author of "Going Places" and where does she currently live?', answer: 'The author is A.R',
                  options: ['The author is A.R', 'About the Author', 'Going Places', 'a different author or location'],
                  hint: 'If stuck, review how to annotate a text\'s first page for setting clues (time, place, class, mood).',
                  misconception: 'Students often assume "Going Places" is set in India because it is in their English textbook, or they think Sophie\'s meeting with Danny.' },
                { id: 'b', prompt: 'In your own words, explain the socio-economic background of Sophie\'s family as suggested by the pre-reading context.', answer: 'Sophie belongs to a working-class family in an industrial English city',
                  options: ['Sophie belongs to a working-class family in an industrial English city', 'Going Places', 'Sophie\'s meeting with Danny Casey actually happens'],
                  hint: 'If stuck, review how to annotate a text\'s first page for setting clues (time, place, class, mood).',
                  misconception: 'Students often assume "Going Places" is set in India because it is in their English textbook, or they think Sophie\'s meeting with Danny.' }
          ],
            remediations: { 'going-places-is-set-in': { steps: ['If a student cannot distinguish author from setting, or treats fantasies as facts: (1) Have them re-read only the.', '(2) Ask them to list three differences between Sophie\'s spoken dreams and the physical details of her home.', '(3) Have them explain orally why the title might be ironic.', '(4) Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume "Going Places" is set in India because it is in their English textbook, or they think Sophie\'s.',
          parts: [
                { id: 'a', prompt: 'Based on the context provided, evaluate whether the title "Going Places" is primarily ironic, aspirational, or both. Justify your judgment.', answer: 'The title operates on both levels: it is aspirational',
                  options: ['The title operates on both levels: it is aspirational', 'Going Places', 'Sophie\'s meeting with Danny Casey actually happens'],
                  hint: 'If stuck, review how to annotate a text\'s first page for setting clues (time, place, class, mood).',
                  misconception: 'Students often assume "Going Places" is set in India because it is in their English textbook, or they think Sophie\'s meeting with Danny.' }
          ],
            remediations: { 'going-places-is-set-in': { steps: ['If a student cannot distinguish author from setting, or treats fantasies as facts: (1) Have them re-read only the.', '(2) Ask them to list three differences between Sophie\'s spoken dreams and the physical details of her home.', '(3) Have them explain orally why the title might be ironic.', '(4) Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_002', difficulty: 'standard',
          question: 'Plot is the structured sequence of events in a narrative, organized through.',
          hint: 'Review c11_eng_h_cbse_01_002 (Plot and Narrative Structure basics) and.',
          misconception: 'Students often believe the "plot" of "Going Places" is simply the sequence of things Sophie says happened (meeting.',
          parts: [
                { id: 'a', prompt: 'Explain how the narrative perspective in "Going Places" differs from a first-person narration by Sophie, and why this matters for the story\'s effect.', answer: 'The story uses third-person limited perspective focused on Sophie',
                  options: ['The story uses third-person limited perspective focused on Sophie', 'it\'s first person', 'Going Places', 'dramatic'],
                  hint: 'Review c11_eng_h_cbse_01_002 (Plot and Narrative Structure basics) and c11_eng_h_cbse_08_002.',
                  misconception: 'Students often believe the "plot" of "Going Places" is simply the sequence of things Sophie says happened (meeting Danny, the date, the.' }
          ],
            remediations: { 'the-plot-of-going-places': { steps: ['If a student cannot separate fantasy from reality in the plot, have them create a two-column table: Column A = "Scenes.', 'Then ask: "In which column does Danny Casey actually speak?" Only the arcade scene (Column B) has his voice — and even.', 'Re-diagnose with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a story.',
          hint: 'If stuck on sensory-to-atmosphere mapping, revisit the "Atmosphere: Heat, Silence and.',
          misconception: 'Students often treat setting as a static backdrop ("the story happens in a poor house") rather than a dynamic.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the atmosphere in Sophie\'s home differs from the atmosphere in Geoff\'s bedroom, using two sensory details from each setting.', answer: 'Home: oppressive, steamy, cluttered',
                  options: ['Home: oppressive, steamy, cluttered', 'steamy from the stove', 'heavy-breathing man in his vest', 'dirty washing piled up'],
                  hint: 'If stuck on sensory-to-atmosphere mapping, revisit the "Atmosphere: Heat, Silence and Anticipation".',
                  misconception: 'Students often treat setting as a static backdrop ("the story happens in a poor house") rather than a dynamic atmospheric engine.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student reread only the kitchen scene (from "Sophie\'s father was scooping shepherd\'s pie" to "Sophie felt.', 'Ask: "Which three words create the *feeling* of being trapped?', 'Now find the sentence where the atmosphere shifts from physical discomfort to emotional panic." 3.', 'Revisit c11_eng_h_cbse_01_003 (Class 11 Setting and Atmosphere) for the foundational skill of tracking atmospheric.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'If stuck, review "indirect characterization" using the STEAL method (Speech, Thoughts.',
          misconception: 'Students often treat Sophie as a simple "daydreamer" and write generic answers like "She dreams big but does nothing.".',
          parts: [
                { id: 'a', prompt: 'What is Sophie\'s most frequently stated dream in the opening conversation with Jansie?', answer: 'Sophie says, "When I leave, I\'m going to have a boutique."',
                  options: ['Sophie says, "When I leave, I\'m going to have a boutique."', 'When I leave, I\'m going to have a boutique', 'she wants to be an actress'],
                  hint: 'If stuck, review "indirect characterization" using the STEAL method (Speech, Thoughts, Effect.',
                  misconception: 'Students often treat Sophie as a simple "daydreamer" and write generic answers like "She dreams big but does nothing." This misses the.' }
          ],
            remediations: { 'students-often-treat-sophie-as': { steps: ['Re-read the opening dialogue with Jansie — highlight every profession Sophie names.', 'List three physical details of her home (steamy room, shepherd\'s pie, father\'s vest) and connect each to a specific.', 'Trace the Danny Casey story across three tellings (to Geoff, to father, to Jansie) — note what changes.', 'Write one paragraph using the PEEL structure: Point (Sophie uses fantasy as control), Evidence (quote), Explanation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining the traits.',
          hint: 'If stuck, review the "foil" concept using Jansie-Sophie opening dialogue (Paragraphs.',
          misconception: 'Students consistently treat Danny Casey as a "real character" who actually interacts with Sophie, citing the arcade and.',
          parts: [
                { id: 'a', prompt: 'List the five major supporting characters in "Going Places" and state one defining trait for each with a brief textual reference.', answer: 'The five major supporting characters are: (1) Jansie',
                  options: ['The five major supporting characters are: (1) Jansie', 'friend', 'talkative', 'Danny Casey as a "friend" or Geoff as "talkative'],
                  hint: 'If stuck, review the "foil" concept using Jansie-Sophie opening dialogue (Paragraphs 1-10) and the.',
                  misconception: 'Students consistently treat Danny Casey as a "real character" who actually interacts with Sophie, citing the arcade and canal scenes.' }
          ],
            remediations: { 'students-consistently-treat-danny-casey': { steps: ['Re-read the three "fantasy sequences" (arcade meeting, promised date, canal wait) and mark every sentence that.', 'Create a two-column table: "Real Events" (match, family dinner, Jansie conversation) vs.', 'For each supporting character, write one sentence stating: "This character knows the truth about Sophie\'s fantasy.', 'Re-attempt Diagnostic Questions 2 and 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_006', difficulty: 'standard',
          question: 'The primary theme of "Going Places" is the adolescent tendency to escape into.',
          hint: 'If stuck, revisit c12_eng_f_cbse_08_002 (Plot and Narrative Structure) to map the.',
          misconception: 'Students often treat "theme" as a single-word label like "dreams" or "fantasy" and then hunt for quotes that contain.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "fantasy as refuge" to a new scenario: A Class 12 student from a small town dreams of becoming a viral content creator, edits videos late.', answer: 'Parallel: The talent-agency lie mirrors Sophie\'s Danny Casey story',
                  options: ['Parallel: The talent-agency lie mirrors Sophie\'s Danny Casey story', 'they\'re just lying for attention'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_08_002 (Plot and Narrative Structure) to map the fantasy-reality.',
                  misconception: 'Students often treat "theme" as a single-word label like "dreams" or "fantasy" and then hunt for quotes that contain those words.' }
          ],
            remediations: { 'students-often-treat-theme-as': { steps: ['If a student gives a one-word theme label: (1) Ask them to complete this sentence: "The story suggests that when.', '(3) Map each emotion to a specific earlier fantasy (boutique → hope; Danny → validation; waiting → despair).', '(4) Re-attempt the theme statement using the tension frame: "Barton shows that ______ but ______."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
