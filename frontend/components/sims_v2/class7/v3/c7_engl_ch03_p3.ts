import type { SimDef } from '../../engine/types';

/** v3 generated — c7_engl_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_engl_ch03_p3: SimDef = {
    id: 'v3_c7_engl_ch03_p3',
    title: 'Dreams and Discoveries: My Brother\'s Great Invention · Part 3/3',
    subtitle: 'This node covers identifying and analyzing alliteration, sibilance, and sound echoes.',
    classLevel: 7, subject: 'engl', topic: 'Dreams and Discoveries: My Brother\'s Great Invention · Part 3/3',
    chapters: ['c7_engl_ch03'],
    nodeIds: ['c7_engl_ch03_013', 'c7_engl_ch03_014', 'c7_engl_ch03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Have you ever noticed how tongue twisters like "she sells seashells" make your tongue trip over repeating.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A boy builds a burglar alarm that soaks his father and wakes the whole house — then starts sketching the next gadget before the floor is even dry. Is he a pest, or a budding engineer?',
        options: ['A budding inventor — relentless curiosity and resilience turn every disaster into fuel for the next experiment', 'A pest — anyone whose inventions fail is just careless', 'A dreamer — he should give up machines for something safer', 'A copycat — he is only repeating things he saw elsewhere'],
        answer: 'A budding inventor — relentless curiosity and resilience turn every disaster into fuel for the next experiment',
        hook: 'Failure is not foolishness. A room scattered with wires and half-built gadgets mirrors a mind that prioritizes creating over tidying — and real invention has always advanced by trial and error.',
    },
    teaching: [
        { title: 'Poem: Alliteration and Sound Devices in Paper Boats', text: 'Alliteration is a poetic sound device where the writer repeats the same initial consonant sound in neighbouring or closely connected words, creating a musical, rhythmic effect that enhances the mood.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_engl_ch03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Examine the evidence — the messy workshop, the soaked father, the immediate next plan — and write a character verdict on the young inventor that weighs both the chaos and the brilliance.',
        labels: ['Poem: Alliteration and Sound', 'Poem: Setting and Natural', 'Writing: How to Write'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_engl_ch03_014', title: 'Poem: Setting and Natural Imagery in the Poem',
          caseStudy: { intro: 'When you look out your window during a heavy monsoon downpour in Delhi or a quiet summer evening in a village, how does the weather or surroundings change your.',
            decisions: [{ prompt: 'What is natural imagery in a poem? Provide a one-sentence definition.', options: [
                { text: 'Natural imagery refers to descriptive language that appeals to our senses by using', outcome: 'Natural imagery refers to descriptive language that appeals to our senses by using elements of the.' },
                { text: 'it only means visual descriptions, ignoring sound, touch, or smell', outcome: 'Not quite — Students often believe that setting in a poem is just background decoration and that words like.', reveals: 'setting-in-a-poem-is' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch03_015', title: 'Writing: How to Write About Poetic Tone and Mood',
          caseStudy: { intro: 'Have you ever listened to a friend tell a story where their voice sounded excited, making you feel thrilled, or serious, making you feel quiet and thoughtful?',
            decisions: [{ prompt: 'What is the primary difference between poetic tone and poetic mood?', options: [
                { text: 'Tone is the author\'s or speaker\'s attitude toward the subject, whereas mood is the', outcome: 'Tone is the author\'s or speaker\'s attitude toward the subject, whereas mood is the emotional.' },
                { text: 'tone belongs to the reader and mood belongs to the author', outcome: 'Not quite — Students often confuse "tone" and "mood" as interchangeable terms, or they believe tone belongs.', reveals: 'students-often-confuse-tone-and' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate\'s science project has failed three times — the circuit fizzles, the model collapses, the demo won\'t start. She tears up the plans and says, \'Three failures mean I should stop. Inventors don\'t wreck things this often.\'',
            decisions: [{ prompt: 'What would Anand, the story\'s tireless inventor, make of her three failures?', options: [
                { text: 'That three failures are the job, not the verdict — Anand\'s inventions keep failing too, and he keeps building anyway, eyes sparkling at sparking wires while everyone shouts. His character is defined by persistence and curiosity; the flops are the steps. Stopping after three is the only outcome where the failures win.', outcome: 'The chapter presents resilience as the inventor\'s real trait — Anand\'s chaos and cheerfulness after disasters are what keep him, and the story, moving.' },
                { text: 'She is right — real inventors rarely fail, so three flops prove she is not cut out for it.', outcome: 'Anand fails constantly and keeps inventing — the story treats repeated failure as the inventor\'s normal life, not a disqualification.', reveals: 'three-failures-mean-quit' },
                { text: 'She should keep going but hide the failures — success is only meaningful if the flops stay secret.', outcome: 'Anand\'s failures are open and even funny — the chapter treats them as part of the work, not as shameful secrets to bury.', reveals: 'failures-must-be-hidden' }
            ] }] } },
        { type: 'case', nodeId: 'c7_engl_ch03_015', title: 'You made it',
          caseStudy: { intro: 'Every inventor has a trail of glorious disasters behind them. The mess is not the opposite of genius — it is the workshop of it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_engl_ch03_013', difficulty: 'standard',
          question: 'Alliteration is a poetic sound device where the writer repeats the same initial.',
          hint: 'Review basic consonant sounds and practice spotting words that start with the same letter.',
          misconception: 'Students often confuse alliteration with rhyme or general word repetition.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Alliteration is a poetic sound device where the writer repeats the same initial consonant',
                  options: ['Alliteration is a poetic sound device where the writer repeats the same initial consonant', 'Character analysis of Anand the Young Inventor involves examining his traits, actions,', 'Character analysis of Anita, the narrator and sister in "My Brother\'s Great Invention,"', 'The plot of a story refers to the sequence of events that make up the narrative,'],
                  hint: 'Review basic consonant sounds and practice spotting words that start with the same letter in.',
                  misconception: 'Students often confuse alliteration with rhyme or general word repetition.' }
          ],
            remediations: { 'students-often-confuse-alliteration-with': { steps: ['Say to the student: "Let\'s put our finger on the very first letter of each word.', 'Alliteration is like a drumbeat at the start of words, not the end.', 'If I say \'fast floating frogs,\' do \'fast,\' \'floating,\' and \'frogs\' start with the same sound?', 'Now look at your example and check only the first letter sound of each neighbouring word."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_014', difficulty: 'standard',
          question: 'The analysis of how a poet uses physical surroundings (setting) and elements.',
          hint: 'Review Class 6 concepts of imagery and metaphor in poetry before attempting Class 7.',
          misconception: 'Students often believe that setting in a poem is just background decoration and that words like "wind," "stars,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The analysis of how a poet uses physical surroundings (setting) and elements of the',
                  options: ['The analysis of how a poet uses physical surroundings (setting) and elements of the', 'Character analysis of Anand the Young Inventor involves examining his traits, actions,', 'Character analysis of Anita, the narrator and sister in "My Brother\'s Great Invention,"', 'The plot of a story refers to the sequence of events that make up the narrative,'],
                  hint: 'Review Class 6 concepts of imagery and metaphor in poetry before attempting Class 7 symbolic.',
                  misconception: 'Students often believe that setting in a poem is just background decoration and that words like "wind," "stars," or "rain" are chosen only.' }
          ],
            remediations: { 'setting-in-a-poem-is': { steps: ['When a student treats natural imagery as mere decoration, guide them with these steps: 1.', 'Ask them to point out all the nature words in the stanza.', 'Ask them how the character or speaker in the poem is feeling at that exact moment.', 'Ask them to draw a link between the weather/setting and that feeling (e.g., "If the sky is dark and stormy, how does.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_engl_ch03_015', difficulty: 'standard',
          question: 'Poetic tone refers to the speaker\'s or poet\'s attitude toward the subject.',
          hint: 'Review poetic devices and imagery from Class 6 before attempting tone and mood analysis.',
          misconception: 'Students often confuse "tone" and "mood" as interchangeable terms, or they believe tone belongs to the reader and mood.',
          parts: [
                { id: 'a', prompt: 'If a poem uses words like "giggles," "sunshine," and "bouncing," what is the most likely mood created in the reader?', answer: 'The mood is cheerful, lighthearted, or joyful',
                  options: ['The mood is cheerful, lighthearted, or joyful', 'gloomy', 'giggles', 'sunshine'],
                  hint: 'Review poetic devices and imagery from Class 6 before attempting tone and mood analysis.',
                  misconception: 'Students often confuse "tone" and "mood" as interchangeable terms, or they believe tone belongs to the reader and mood belongs to the.' }
          ],
            remediations: { 'students-often-confuse-tone-and': { steps: ['If a student confuses tone and mood, use the "Voice vs.', 'Room" analogy: Tone is the speaker\'s voice (are they shouting, whispering, joking, or serious?), while Mood is the.', 'Have the student highlight all speaker statements in one color (for tone) and all environmental imagery in another.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
