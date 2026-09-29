import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch05_p2: SimDef = {
    id: 'v3_c9_engl_ch05_p2',
    title: 'The World of Limitless Possibilities · Part 2/2',
    subtitle: 'One woman\'s medal, one movement\'s history',
    classLevel: 9, subject: 'engl', topic: 'The World of Limitless Possibilities · Part 2/2',
    chapters: ['c9_engl_ch05'],
    nodeIds: ['c9_engl_ch5_6', 'c9_engl_ch5_7', 'c9_engl_ch5_8', 'c9_engl_ch5_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sports journalist condensing a biography', intro: 'You\'ve got 120-150 words to tell both stories at once: how the Paralympics came to be AND how a paralyzed woman became India\'s first female Paralympic medallist. No fluff survives.', goal: 'Summarise the dual-thread text on the Paralympics and Deepa Malik — institutional history plus personal trajectory — with dates, chronology and a thematic close.' },
    discovery: {
        question: 'A student summarises Deepa Malik\'s story as \'tumor at 29, three surgeries, paralysis, then a silver medal at Rio 2016.\' What\'s missing that would cost exam marks?',
        options: ['The whole other half — the Paralympic movement\'s history (Rome 1960, India\'s debut 1968) that the text weaves around her journey', 'Nothing — her medal is the whole point', 'The name of her doctor', 'A list of every surgery detail'],
        answer: 'The whole other half — the Paralympic movement\'s history (Rome 1960, India\'s debut 1968) that the text weaves around her journey',
        hook: 'This text has two timelines braided together: the Paralympics\' institutional history and one woman\'s personal fight. Summarising only Deepa is like retelling half a braid — the chapter\'s title (\'The World of Limitless Possibilities\') is the knot that ties them.',
    },
    teaching: [
        { title: 'Historical Context: India\'s Paralympic Journey Since 1968', text: 'Historical Context: India\'s Paralympic Journey Since 1968 refers to the chronological evolution of India\'s participation, performance, and institutional support in the Paralympic Games from its debut.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch5_6', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Weave the two timelines into one summary: Paralympics born 1960 → India joins 1968 → Deepa\'s diagnosis → swimming then athletics → Arjuna Award 2012 → Rio silver 2016 → the closing line that ties it all to the title.',
        labels: ['Historical Context: India\'s Paralympic', 'Literary Device: Inspirational', 'Vocabulary in Context: Words', 'Values: Determination, Courage'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch5_6', title: 'Historical Context: India\'s Paralympic Journey Since 1968',
          caseStudy: { intro: 'Imagine you are asked: "India won 1 medal in 1968, 4 in 1984, then ZERO for three straight Games, and suddenly 19 in Tokyo 2020.',
            decisions: [{ prompt: 'In which year did India make its Paralympic debut, and how many athletes were sent?', options: [
                { text: 'India debuted at the 1968 Tel Aviv Paralympics with 10 athletes', outcome: 'India debuted at the 1968 Tel Aviv Paralympics with 10 athletes.' },
                { text: 'India\'s Paralympic journey has been a steady upward climb', outcome: 'Not quite — Students believe India\'s Paralympic journey has been a steady upward climb since 1968.', reveals: 'india-s-paralympic-journey-has' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch5_7', title: 'Literary Device: Inspirational and Motivational Language',
          caseStudy: { intro: 'Imagine you are about to take a difficult exam and feel like giving up. You read a quote from Dr.',
            decisions: [{ prompt: 'Define inspirational and motivational language in your own words, listing two rhetorical strategies it commonly employs.', options: [
                { text: 'Inspirational and motivational language is language designed to uplift and drive action,', outcome: 'Inspirational and motivational language is language designed to uplift and drive action, often.' },
                { text: 'positive words', outcome: 'Not quite — Students often believe inspirational language is simply "using positive words like brave, strong.', reveals: 'inspirational-language-is-simply-using' },
                { text: 'happy language', outcome: 'Not quite — Students often believe inspirational language is simply "using positive words like brave, strong.', reveals: 'inspirational-language-is-simply-using' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch5_8', title: 'Vocabulary in Context: Words Related to Sports and Disability',
          caseStudy: { intro: 'Imagine you are reading a newspaper article about the Paris 2024 Paralympics and see the phrase: *"The classifier verified her F53 category before the shot put.',
            decisions: [{ prompt: 'Define "person-first language" and give one example from the chapter where it is used (or should be used) when referring to Dr. Deepa Malik.', options: [
                { text: '**Correct Answer:** Person-first language puts the person before the disability (e.g.,', outcome: '**Correct Answer:** Person-first language puts the person before the disability (e.g., "athlete.' },
                { text: 'Deepa Malik is a disabled athlete', outcome: 'Not quite — Students treat "disability vocabulary" as a static list of **synonyms** (e.g., *handicapped.', reveals: 'students-treat-disability-vocabulary-as' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch5_9', title: 'Values: Determination, Courage and Breaking Stereotypes',
          caseStudy: { intro: 'Imagine watching a Paralympic sprinter with a prosthetic leg cross the finish line in under 11 seconds. What do you feel?',
            decisions: [{ prompt: 'Define "determination" in the context of the Paralympic movement and give one example from the text.', options: [
                { text: 'Determination in the Paralympic context is the will to train, compete, and excel despite', outcome: 'Determination in the Paralympic context is the will to train, compete, and excel despite physical.' },
                { text: 'determination means trying hard', outcome: 'Not quite — Students frame Paralympic athletes as "inspiring" for "overcoming their disability." The exact.', reveals: 'students-frame-paralympic-athletes-as' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch5_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising the chapter on the Paralympics and Dr. Deepa Malik, a student writes only: \'Deepa got a spinal tumour at 29, survived three surgeries paralysed waist-down, and won silver at Rio 2016.\'',
            decisions: [{ prompt: 'Why does this cost marks despite being accurate?', options: [
                { text: 'The text runs on two rails — the Paralympic movement\'s history (Rome 1960, India\'s 1968 debut) and Deepa\'s personal arc — and the summary must braid both, ending by linking her medal to the chapter\'s title about limitless possibilities; a person-only sketch drops the institutional half.', outcome: 'This mirrors the text\'s dual architecture — board summaries must condense the whole text, not just its hero.' },
                { text: 'It costs nothing — the Paralympic dates are background decoration, and Deepa\'s story is the real chapter.', outcome: 'The institutional history is the frame that gives her medal its meaning — first Indian woman on a Paralympic podium — and omitting it is omitting the text\'s design.', reveals: 'history-is-decoration' },
                { text: 'The fix is emotional language — \'bravely fought a tragic fate\' — since the facts are already there.', outcome: 'Board summaries want factual reporting — diagnosed at 29, three surgeries, Rio 2016 silver — not inspirational adjectives; feeling belongs to personal response.', reveals: 'add-emotion' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch5_9', title: 'You made it',
          caseStudy: { intro: 'This summary needs dates, not adjectives: \'diagnosed at 29\' beats \'she bravely fought.\' And it must end where the text ends — on the idea that physical limits get redefined by human will.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch5_6', difficulty: 'standard',
          question: 'Historical Context: India\'s Paralympic Journey Since 1968 refers to the.',
          hint: 'Review the "Historical Context: Kashmir Conflict" node (c8_engl_ch2_1) where the link.',
          misconception: 'Students believe India\'s Paralympic journey has been a steady upward climb since 1968.',
          parts: [
                { id: 'a', prompt: 'In which year did India make its Paralympic debut, and how many athletes were sent?', answer: 'India debuted at the 1968 Tel Aviv Paralympics with 10 athletes',
                  options: ['India debuted at the 1968 Tel Aviv Paralympics with 10 athletes', 'India\'s Paralympic journey has been a steady upward climb'],
                  hint: 'Review the "Historical Context: Kashmir Conflict" node (c8_engl_ch2_1) where the link between.',
                  misconception: 'Students believe India\'s Paralympic journey has been a steady upward climb since 1968.' },
                { id: 'b', prompt: 'Place these three administrative events in correct chronological order and explain the causal link between each: (A) Formation of PCI (1992), (B) Government.', answer: 'Correct order: A (1992) → B (2001) → C (2015)',
                  options: ['Correct order: A (1992) → B (2001) → C (2015)', 'India\'s Paralympic journey has been a steady upward climb'],
                  hint: 'Review the "Historical Context: Kashmir Conflict" node (c8_engl_ch2_1) where the link between.',
                  misconception: 'Students believe India\'s Paralympic journey has been a steady upward climb since 1968.' }
          ],
            remediations: { 'india-s-paralympic-journey-has': { steps: ['If a student draws a smooth upward curve: 1.', 'Give them a blank timeline with only years 1968-2024 marked.', 'Ask them to plot "Medals Won" and "PCI Status (Recognized/Not Recognized/Suspended)" as two parallel rows.', 'Have them shade the 1988-2000 period red and label it "Administrative Vacuum." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch5_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe India\'s Paralympic journey has been a steady upward climb since 1968.',
          parts: [
                { id: 'a', prompt: 'Create a 5-point "Turning Point Timeline" for India\'s Paralympic journey (1968-2024) where each point includes: Year, Event, and One Measurable Outcome (medal.', answer: 'Expected answer (any 5 valid turning points with measurable outcomes): 1',
                  options: ['Expected answer (any 5 valid turning points with measurable outcomes): 1', 'India\'s Paralympic journey has been a steady upward climb'],
                  hint: 'Review the "Historical Context: Kashmir Conflict" node (c8_engl_ch2_1) where the link between.',
                  misconception: 'Students believe India\'s Paralympic journey has been a steady upward climb since 1968.' }
          ],
            remediations: { 'india-s-paralympic-journey-has': { steps: ['If a student draws a smooth upward curve: 1.', 'Give them a blank timeline with only years 1968-2024 marked.', 'Ask them to plot "Medals Won" and "PCI Status (Recognized/Not Recognized/Suspended)" as two parallel rows.', 'Have them shade the 1988-2000 period red and label it "Administrative Vacuum." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch5_7', difficulty: 'standard',
          question: 'Inspirational and motivational language is a literary device that uses specific.',
          hint: 'Review "tone and mood analysis" from c8_engl_ch2_8 and "poetic devices: metaphor.',
          misconception: 'Students often believe inspirational language is simply "using positive words like brave, strong, success" or "speaking.',
          parts: [
                { id: 'a', prompt: 'Given the sentence: "Every fall teaches you how to rise stronger," rewrite it using repetition and direct address to make it more motivational for a peer who.', answer: 'Rewritten: "You fall, you learn',
                  options: ['Rewritten: "You fall, you learn', 'Don\'t worry, you\'ll do better!', 'using positive words like brave, strong, success', 'speaking in an enthusiastic tone'],
                  hint: 'Review "tone and mood analysis" from c8_engl_ch2_8 and "poetic devices: metaphor, imagery" from.',
                  misconception: 'Students often believe inspirational language is simply "using positive words like brave, strong, success" or "speaking in an enthusiastic.' },
                { id: 'b', prompt: 'Compare the motivational impact of these two passages from the chapter: (A) "I chose to focus on what I can do, not what I cannot." (B) "Focus on your.', answer: 'Passage (B) is more effective for a general audience',
                  options: ['Passage (B) is more effective for a general audience', 'it\'s her real story', 'using positive words like brave, strong, success', 'speaking in an enthusiastic tone'],
                  hint: 'Review "tone and mood analysis" from c8_engl_ch2_8 and "poetic devices: metaphor, imagery" from.',
                  misconception: 'Students often believe inspirational language is simply "using positive words like brave, strong, success" or "speaking in an enthusiastic.' }
          ],
            remediations: { 'inspirational-language-is-simply-using': { steps: ['Return to the interview text and annotate every sentence that made you feel motivated.', 'For each annotated sentence, name the device (e.g., "antithesis in \'not limitation but vehicle\'").', 'Create a two-column table: Device | Effect on Reader.', 'Practice converting three plain statements ("Don\'t give up," "Study hard," "Be confident") into motivational versions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch5_8', difficulty: 'standard',
          question: 'From \'English chapter c9_engl_ch5\': the skill or concept this node teaches.',
          hint: 'If stuck on connotation, review Class 8 "valour vs bravery" distinction (c8_engl_ch2_9).',
          misconception: 'Students treat "disability vocabulary" as a static list of **synonyms** (e.g., *handicapped = disabled.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'From \'English chapter c9_engl_ch5\': the skill or concept this node teaches, applied to',
                  options: ['From \'English chapter c9_engl_ch5\': the skill or concept this node teaches, applied to', 'A text summary is a concise, structured restatement of a non-fiction passage that', 'A structured discussion on inclusion and accessibility in sports examines how physical,', 'Resilience and Overcoming Adversity as a literary theme refers to the central message'],
                  hint: 'If stuck on connotation, review Class 8 "valour vs bravery" distinction (c8_engl_ch2_9) — same.',
                  misconception: 'Students treat "disability vocabulary" as a static list of **synonyms** (e.g., *handicapped = disabled = differently-abled = special.' }
          ],
            remediations: { 'students-treat-disability-vocabulary-as': { steps: ['**Isolate the error:** Show the student two sentences: *"The handicapped athlete won"* vs *"The para-athlete won."*.', 'Which sounds like a charity appeal?* 2.', '**Trace the source:** Have them highlight every disability-related word in the chapter text.', 'Make a 3-column table: **Word | Context Sentence | Why THIS word here?** (e.g., *classification | "ensures fair.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch5_9', difficulty: 'standard',
          question: 'Values of determination, courage, and breaking stereotypes as expressed in the.',
          hint: 'Revisit c9_engl_ch5_1 (Text Summary: Paralympic Movement) for the overall context, and.',
          misconception: 'Students frame Paralympic athletes as "inspiring" for "overcoming their disability." The exact error: this "inspiration.',
          parts: [
                { id: 'a', prompt: 'What stereotype about disability does the Paralympic movement challenge, and how does it challenge it?', answer: 'The stereotype is that disability means inability',
                  options: ['The stereotype is that disability means inability', 'it shows disabled people can play sports'],
                  hint: 'Revisit c9_engl_ch5_1 (Text Summary: Paralympic Movement) for the overall context, and review the.',
                  misconception: 'Students frame Paralympic athletes as "inspiring" for "overcoming their disability." The exact error: this "inspiration porn" framing.' },
                { id: 'b', prompt: 'Explain the difference between "courage" in the Paralympic context and "courage" in everyday life.', answer: 'In everyday life, courage often means facing physical danger or social risk',
                  options: ['In everyday life, courage often means facing physical danger or social risk', 'courage is the same everywhere'],
                  hint: 'Revisit c9_engl_ch5_1 (Text Summary: Paralympic Movement) for the overall context, and review the.',
                  misconception: 'Students frame Paralympic athletes as "inspiring" for "overcoming their disability." The exact error: this "inspiration porn" framing.' }
          ],
            remediations: { 'students-frame-paralympic-athletes-as': { steps: ['Show the student a video of a Paralympic race and an Olympic race.', 'Ask: "What is the difference?" (The answer should be: the athletes use different equipment or have different bodies.', 'Discuss: "Why do we call Paralympic athletes \'inspiring\' but not Olympic athletes?', 'What does this reveal about our assumptions?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
