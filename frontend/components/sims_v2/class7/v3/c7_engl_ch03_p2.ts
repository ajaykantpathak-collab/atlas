import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch03_p2: SimDef = {
    id: 'v3_c7_engl_ch03_p2',
    title: 'Dreams and Discoveries: My Brother\'s Great Invention · Part 2/3',
    subtitle: 'This node covers contextual vocabulary acquisition and usage for four specific.',
    classLevel: 7, subject: 'engl', topic: 'Dreams and Discoveries: My Brother\'s Great Invention · Part 2/3',
    chapters: ['c7_engl_ch03'],
    nodeIds: ['c7_engl_ch03_007', 'c7_engl_ch03_008', 'c7_engl_ch03_009', 'c7_engl_ch03_010', 'c7_engl_ch03_011', 'c7_engl_ch03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are walking past your older sibling\'s room and you hear wires snapping, metal clanking, and tools.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A boy builds a burglar alarm that soaks his father and wakes the whole house — then starts sketching the next gadget before the floor is even dry. Is he a pest, or a budding engineer?',
        options: ['A budding inventor — relentless curiosity and resilience turn every disaster into fuel for the next experiment', 'A pest — anyone whose inventions fail is just careless', 'A dreamer — he should give up machines for something safer', 'A copycat — he is only repeating things he saw elsewhere'],
        answer: 'A budding inventor — relentless curiosity and resilience turn every disaster into fuel for the next experiment',
        hook: 'Failure is not foolishness. A room scattered with wires and half-built gadgets mirrors a mind that prioritizes creating over tidying — and real invention has always advanced by trial and error.',
    },
    teaching: [
        { title: 'Vocabulary in Context: burglar alarm, dynamo, tinkering, rigging', text: 'Understanding and interpreting specific thematic vocabulary words from the story "My Brother\'s Great Invention"—specifically *burglar alarm*, *dynamo*, *tinkering*, and *rigging*—based on how they.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Examine the evidence — the messy workshop, the soaked father, the immediate next plan — and write a character verdict on the young inventor that weighs both the chaos and the brilliance.',
        labels: ['Vocabulary in Context: burglar', 'Literary Devices: First-Person Narration', 'Comprehension: Anand\'s Previous Failed', 'Critical Thinking: The Spirit', 'Poem: Paper Boats by', 'Poem: Theme of Imagination'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch03_008', title: 'Literary Devices: First-Person Narration and Humour',
          caseStudy: { intro: 'Have you ever listened to your sibling tell a funny story about something that went terribly wrong at home, making themselves look completely innocent while.',
            decisions: [{ prompt: 'Which pronouns signal that a story is written in first-person narration?', options: [
                { text: 'The correct pronouns are "I," "me," "my," "we," and "us."', outcome: 'The correct pronouns are "I," "me," "my," "we," and "us." A student who selects third-person.' },
                { text: 'A student who selects third-person pronouns like', outcome: 'Not quite — Students often confuse first-person narration with third-person narration when a character.', reveals: 'students-often-confuse-first-person' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch03_010', title: 'Critical Thinking: The Spirit of Perseverance in Invention',
          caseStudy: { intro: 'Have you ever built a model or tried to fix your bicycle chain, only for it to snap or fall apart on the very first try?',
            decisions: [{ prompt: 'What is the primary difference between blindly repeating a failed action and exercising perseverance through critical thinking during.', options: [
                { text: 'Blindly repeating a failed action involves trying the exact same method without examining', outcome: 'Blindly repeating a failed action involves trying the exact same method without examining the cause.' },
                { text: 'stubborn repetition', outcome: 'Not quite — Students often confuse "stubborn repetition" with "perseverance." For example, if a student reads.', reveals: 'students-often-confuse-stubborn-repetition' },
                { text: 'perseverance', outcome: 'Not quite — Students often confuse "stubborn repetition" with "perseverance." For example, if a student reads.', reveals: 'students-often-confuse-stubborn-repetition' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch03_011', title: 'Poem: Paper Boats by Rabindranath Tagore - Summary',
          caseStudy: { intro: 'Have you ever made a paper boat during the monsoon rains and floated it down a stream of water running along your street, wondering where it might eventually.',
            decisions: [{ prompt: 'What physical action does the child perform repeatedly in the opening stanzas of Rabindranath Tagore\'s poem "Paper Boats"?', options: [
                { text: 'The child floats paper boats down the running stream one by one', outcome: 'The child floats paper boats down the running stream one by one.' },
                { text: 'the child is building a bridge or sailing a real boat', outcome: 'Not quite — Students often summarize "Paper Boats" as a literal travelogue or diary entry about a child who.', reveals: 'students-often-summarize-paper-boats' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch03_012', title: 'Poem: Theme of Imagination and Childhood in Paper Boats',
          caseStudy: { intro: 'Have you ever folded a piece of paper into a boat, placed it in a rainwater puddle or a stream, and pretended it was sailing to faraway lands with real.',
            decisions: [{ prompt: 'What physical action does the child perform at the beginning of the poem to start their imaginative journey?', options: [
                { text: 'The child folds paper to make paper boats and floats them down the running stream', outcome: 'The child folds paper to make paper boats and floats them down the running stream.' },
                { text: 'Paper Boats', outcome: 'Not quite — Students often believe that the theme of "Paper Boats" is simply about the craft of making origami.', reveals: 'the-theme-of-paper-boats' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate\'s science project has failed three times — the circuit fizzles, the model collapses, the demo won\'t start. She tears up the plans and says, \'Three failures mean I should stop. Inventors don\'t wreck things this often.\'',
            decisions: [{ prompt: 'What would Anand, the story\'s tireless inventor, make of her three failures?', options: [
                { text: 'That three failures are the job, not the verdict — Anand\'s inventions keep failing too, and he keeps building anyway, eyes sparkling at sparking wires while everyone shouts. His character is defined by persistence and curiosity; the flops are the steps. Stopping after three is the only outcome where the failures win.', outcome: 'The chapter presents resilience as the inventor\'s real trait — Anand\'s chaos and cheerfulness after disasters are what keep him, and the story, moving.' },
                { text: 'She is right — real inventors rarely fail, so three flops prove she is not cut out for it.', outcome: 'Anand fails constantly and keeps inventing — the story treats repeated failure as the inventor\'s normal life, not a disqualification.', reveals: 'three-failures-mean-quit' },
                { text: 'She should keep going but hide the failures — success is only meaningful if the flops stay secret.', outcome: 'Anand\'s failures are open and even funny — the chapter treats them as part of the work, not as shameful secrets to bury.', reveals: 'failures-must-be-hidden' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch03_012', title: 'The bigger picture',
          caseStudy: { intro: 'Every inventor has a trail of glorious disasters behind them. The mess is not the opposite of genius — it is the workshop of it.',
            decisions: [{ prompt: 'What comes next? Dreams and Discoveries: My Brother\'s Great Invention · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Dreams and Discoveries: My Brother\'s Great Invention · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch03_007', difficulty: 'standard',
          question: 'Understanding and interpreting specific thematic vocabulary words from the.',
          hint: 'Review Class 6 vocabulary strategies focusing on how action verbs and nearby objects.',
          misconception: 'Students often confuse *tinkering* with *building* or *manufacturing* a finished product.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Understanding and interpreting specific thematic vocabulary words from the story "My',
                  options: ['Understanding and interpreting specific thematic vocabulary words from the story "My', 'From \'My Brother\': the skill or concept this node teaches, applied to the actual text', 'From \'My Brother\': the skill or concept this node teaches, applied to the actual text', 'The plot of a story refers to the sequence of events that make up the narrative,'],
                  hint: 'Review Class 6 vocabulary strategies focusing on how action verbs and nearby objects reveal what.',
                  misconception: 'Students often confuse *tinkering* with *building* or *manufacturing* a finished product.' }
          ],
            remediations: { 'students-often-confuse-tinkering-with': { steps: ['If a student misinterprets contextual vocabulary like *tinkering* or *rigging*, pause and direct their attention to the.', 'Ask: "What materials is the character holding?', 'Are they using brand-new tools or scraps?" Guide them to see that words describing young inventors usually emphasize.', 'Remind them to check surrounding action verbs before settling on a definition.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_008', difficulty: 'standard',
          question: 'First-person narration is a point of view where the story is told by.',
          hint: 'Review pronoun identification (I, me, my, we) and ask who is experiencing the events.',
          misconception: 'Students often confuse first-person narration with third-person narration when a character frequently talks about other.',
          parts: [
                { id: 'a', prompt: 'Which pronouns signal that a story is written in first-person narration?', answer: 'The correct pronouns are "I," "me," "my," "we," and "us."',
                  options: ['The correct pronouns are "I," "me," "my," "we," and "us."', 'A student who selects third-person pronouns like'],
                  hint: 'Review pronoun identification (I, me, my, we) and ask who is experiencing the events directly.',
                  misconception: 'Students often confuse first-person narration with third-person narration when a character frequently talks about other people.' }
          ],
            remediations: { 'students-often-confuse-first-person': { steps: ['If a student struggles to identify first-person narration, guide them to highlight every single instance of the words.', 'Ask them: "Who is speaking right now, and are they inside the story or watching from outside like a camera?" Explain.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_009', difficulty: 'standard',
          question: 'Comprehension of Anand\'s previous failed inventions involves analyzing the text.',
          hint: 'Review the opening paragraphs of the chapter where Anita lists Anand\'s earlier gadgets.',
          misconception: 'Students often think that Anand\'s previous failed inventions are just random silly pranks meant to annoy his sister.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comprehension of Anand\'s previous failed inventions involves analyzing the text to',
                  options: ['Comprehension of Anand\'s previous failed inventions involves analyzing the text to', 'From \'My Brother\': the skill or concept this node teaches, applied to the actual text', 'From \'My Brother\': the skill or concept this node teaches, applied to the actual text', 'The plot of a story refers to the sequence of events that make up the narrative,'],
                  hint: 'Review the opening paragraphs of the chapter where Anita lists Anand\'s earlier gadgets and.',
                  misconception: 'Students often think that Anand\'s previous failed inventions are just random silly pranks meant to annoy his sister Anita and Papa.' }
          ],
            remediations: { 'anand-s-previous-failed-inventions': { steps: ['When a student misinterprets Anand\'s intent as mischievous rather than inventive, guide them back to the text step.', '(2) Ask them how Papa and Anita react—do they punish him severely like a prankster, or sigh like parents dealing with.', '(3) Explain that true inventors make many mistakes before succeeding, and Anand\'s character represents the spirit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_010', difficulty: 'standard',
          question: 'From \'My Brother\': the skill or concept this node teaches, applied to the.',
          hint: 'Review c7_engl_ch03_009 to recall the specific details of Anand\'s previous failed gadgets.',
          misconception: 'Students often confuse "stubborn repetition" with "perseverance." For example, if a student reads about Anand fixing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'From \'My Brother\': the skill or concept this node teaches, applied to the actual text',
                  options: ['From \'My Brother\': the skill or concept this node teaches, applied to the actual text', 'The plot of a story refers to the sequence of events that make up the narrative,', 'This topic explores the overarching theme of curiosity, invention, and the scientific', 'The literary device of situational humour shown through Papa\'s exasperated, bemused, and'],
                  hint: 'Review c7_engl_ch03_009 to recall the specific details of Anand\'s previous failed gadgets before.',
                  misconception: 'Students often confuse "stubborn repetition" with "perseverance." For example, if a student reads about Anand fixing his wire connections.' }
          ],
            remediations: { 'students-often-confuse-stubborn-repetition': { steps: ['If a student thinks perseverance means doing the same thing repeatedly, guide them with these steps: 1.', 'Ask the student: "If you try to open a locked door by pushing it, and it doesn\'t open, do you push harder forever.', 'Show them that Anand changes his wires, adjusts his springs, and tinkers with different parts after each failure.', 'Explain that critical thinking means asking "Why did this fail?" before trying again.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "stubborn repetition" with "perseverance." For example, if a student reads about Anand fixing.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Anand\'s inventions are entirely useless because they always malfunction on the first try." Do you agree or disagree based on the.', answer: 'Disagree',
                  options: ['Disagree', 'stubborn repetition', 'perseverance', 'perseverance means doing the exact same thing ten times'],
                  hint: 'Review c7_engl_ch03_009 to recall the specific details of Anand\'s previous failed gadgets before.',
                  misconception: 'Students often confuse "stubborn repetition" with "perseverance." For example, if a student reads about Anand fixing his wire connections.' }
          ],
            remediations: { 'students-often-confuse-stubborn-repetition': { steps: ['If a student thinks perseverance means doing the same thing repeatedly, guide them with these steps: 1.', 'Ask the student: "If you try to open a locked door by pushing it, and it doesn\'t open, do you push harder forever.', 'Show them that Anand changes his wires, adjusts his springs, and tinkers with different parts after each failure.', 'Explain that critical thinking means asking "Why did this fail?" before trying again.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_011', difficulty: 'standard',
          question: 'This topic covers the overall summary, literal meaning, and allegorical depth.',
          hint: 'Review the basic plot points of the poem: what the child makes, what the child writes.',
          misconception: 'Students often summarize "Paper Boats" as a literal travelogue or diary entry about a child who actually visits foreign.',
          parts: [
                { id: 'a', prompt: 'What physical action does the child perform repeatedly in the opening stanzas of Rabindranath Tagore\'s poem "Paper Boats"?', answer: 'The child floats paper boats down the running stream one by one',
                  options: ['The child floats paper boats down the running stream one by one', 'the child is building a bridge or sailing a real boat'],
                  hint: 'Review the basic plot points of the poem: what the child makes, what the child writes, and what the.',
                  misconception: 'Students often summarize "Paper Boats" as a literal travelogue or diary entry about a child who actually visits foreign countries by mail.' }
          ],
            remediations: { 'students-often-summarize-paper-boats': { steps: ['If a student treats the poem like a geography lesson or literal travel story, ask them: "Does the child actually step.', 'Re-read the lines about night and sleep to show that the journey is a dream of hope.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_012', difficulty: 'standard',
          question: 'The exploration of how a child\'s imaginative mind transforms ordinary, everyday.',
          hint: 'Review node c7_engl_ch03_011 to ensure the literal plot and stanzas of Tagore\'s "Paper.',
          misconception: 'Students often believe that the theme of "Paper Boats" is simply about the craft of making origami or the physics.',
          parts: [
                { id: 'a', prompt: 'Why does the child write their name and the name of their village on the paper boats? Explain in your own words.', answer: 'The child writes their name and village',
                  options: ['The child writes their name and village', 'Paper Boats'],
                  hint: 'Review node c7_engl_ch03_011 to ensure the literal plot and stanzas of Tagore\'s "Paper Boats" are.',
                  misconception: 'Students often believe that the theme of "Paper Boats" is simply about the craft of making origami or the physics of how floating objects.' },
                { id: 'b', prompt: 'Read this hypothetical poetic line inspired by the theme: "I load my little ships with kash flowers from our garden, wishing them to land safely in the night.".', answer: '(1) Identify the natural item used (kash flowers from the garden)',
                  options: ['(1) Identify the natural item used (kash flowers from the garden)', 'Paper Boats'],
                  hint: 'Review node c7_engl_ch03_011 to ensure the literal plot and stanzas of Tagore\'s "Paper Boats" are.',
                  misconception: 'Students often believe that the theme of "Paper Boats" is simply about the craft of making origami or the physics of how floating objects.' },
                { id: 'c', prompt: 'Analyze how the child\'s imagination expands from their immediate surroundings in the courtyard to the vast outside world as the boats float away.', answer: '(1) Locate the starting point of the poem (the stream near the house)',
                  options: ['(1) Locate the starting point of the poem (the stream near the house)', 'Paper Boats'],
                  hint: 'Review node c7_engl_ch03_011 to ensure the literal plot and stanzas of Tagore\'s "Paper Boats" are.',
                  misconception: 'Students often believe that the theme of "Paper Boats" is simply about the craft of making origami or the physics of how floating objects.' }
          ],
            remediations: { 'the-theme-of-paper-boats': { steps: ['If a student treats the poem like a manual for craft-making, guide them back by asking: "Does the child care if the.', 'Explain that poetry uses physical objects (like paper boats) as symbols for invisible feelings (like dreams and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
