import type { SimDef } from '../../engine/types';

/** v3 generated — c6_english_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_english_ch03_p1: SimDef = {
    id: 'v3_c6_english_ch03_p1',
    title: 'Dreams and Discoveries · Part 1/2',
    subtitle: 'This node covers the narrative structure of Anand’s inventions (the opening incident, the.',
    classLevel: 6, subject: 'english', topic: 'Dreams and Discoveries · Part 1/2',
    chapters: ['c6_english_ch03'],
    nodeIds: ['c6_english_u3_021', 'c6_english_u3_022', 'c6_english_u3_023', 'c6_english_u3_024', 'c6_english_u3_025', 'c6_english_u3_026'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever tried to fix a broken toy but made it worse instead?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A friend retells a story about a boy whose inventions keep failing — but skips the small early disasters and jumps straight to the biggest mess. The story falls flat. What went missing?',
        options: ['The build-up — each failed invention is bigger than the last, so the chain of disasters makes the finale funny', 'The character names — without them nothing makes sense', 'The jokes — every story needs jokes sprinkled in', 'Nothing — order never matters in a story'],
        answer: 'The build-up — each failed invention is bigger than the last, so the chain of disasters makes the finale funny',
        hook: 'Sequence is not just a list of events. It is a chain of causes and effects — build, fail, react — that teaches readers to expect the next disaster.',
    },
    teaching: [
        { title: 'Story: "My Brother\'s Great Invention" -- Plot and Sequence', text: 'From \'English chapter c6_english_u3\': the skill or concept this node teaches, applied to the actual text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_english_u3_021', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Rebuild the scrambled order of the disasters of a young inventor and show why each mess must grow bigger than the one before it.',
        labels: ['Story: "My Brother\'s Great', 'Poem: "Paper Boats" by', 'Poem: Poetic Devices --', 'Poetry Form: Free Verse'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_english_u3_022', title: 'Story: "My Brother\'s Great Invention" -- Character Analysis: Anand',
          caseStudy: { intro: 'Have you ever met someone who keeps trying to build something, even if it falls apart every time?',
            decisions: [{ prompt: 'What is one trait that describes Anand’s attitude toward his inventions?', options: [
                { text: 'Anand is curious or confident', outcome: 'Anand is curious or confident. A wrong answer like "he is a professional engineer" shows the.' },
                { text: 'he is a professional engineer', outcome: 'Not quite — Students often confuse "what a character does" with "who a character is." They might say "Anand.', reveals: 'students-often-confuse-what-a' },
                { text: 'what a character does', outcome: 'Not quite — Students often confuse "what a character does" with "who a character is." They might say "Anand.', reveals: 'students-often-confuse-what-a' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u3_023', title: 'Story: "My Brother\'s Great Invention" -- Theme: Curiosity and Innovation',
          caseStudy: { intro: 'Imagine you are trying to build a paper plane that flies across the entire classroom, but it crashes into the floor every time.',
            decisions: [{ prompt: 'What is the primary role of curiosity in the process of innovation?', options: [
                { text: 'Curiosity acts as the spark that encourages people to ask questions and seek new', outcome: 'Curiosity acts as the spark that encourages people to ask questions and seek new information.' },
                { text: 'being nosy', outcome: 'Not quite — Students often believe that "innovation" only refers to high-tech, expensive machines or gadgets.', reveals: 'innovation-only-refers-to-high' },
                { text: 'innovation', outcome: 'Not quite — Students often believe that "innovation" only refers to high-tech, expensive machines or gadgets.', reveals: 'innovation-only-refers-to-high' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u3_024', title: 'Poem: "Paper Boats" by Tagore -- Meaning and Imagery',
          caseStudy: { intro: 'Have you ever made a paper boat and watched it float away in a puddle or stream after the rain?',
            decisions: [{ prompt: 'What is an example of an image from the poem that describes what the child sees?', options: [
                { text: 'The child sees white paper boats floating on the stream', outcome: 'The child sees white paper boats floating on the stream. A wrong answer (e.g., naming a tree).' },
                { text: 'a tree', outcome: 'Not quite — Students often think a poem is only about what is physically happening (literal level).', reveals: 'a-poem-is-only-about' },
                { text: 'a poem is only about what is physically happening (literal level)', outcome: 'Not quite — Students often think a poem is only about what is physically happening (literal level).', reveals: 'a-poem-is-only-about' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u3_025', title: 'Poem: Poetic Devices -- Alliteration, Personification, Symbolism',
          caseStudy: { intro: 'Have you ever felt like your favorite tree was actually listening to your secrets?',
            decisions: [{ prompt: 'What do we call it when a poet repeats the same starting sound in words placed close together?', options: [
                { text: 'This is called alliteration', outcome: 'This is called alliteration. If a student answers "rhyme," they are confusing the sound of the.' },
                { text: 'Personification', outcome: 'Not quite — Students often confuse "Personification" with "Simile" (a comparison using \'like\' or \'as\').', reveals: 'students-often-confuse-personification-with' },
                { text: 'Simile', outcome: 'Not quite — Students often confuse "Personification" with "Simile" (a comparison using \'like\' or \'as\').', reveals: 'students-often-confuse-personification-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u3_026', title: 'Poetry Form: Free Verse and Its Characteristics',
          caseStudy: { intro: 'Have you ever tried to describe your favorite tree, like the Neem, but found that trying to make the sentences rhyme made them sound silly?',
            decisions: [{ prompt: 'What is the primary difference between a rhyming poem and a free verse poem?', options: [
                { text: 'A rhyming poem follows a specific pattern of sounds at the end of lines, while free verse', outcome: 'A rhyming poem follows a specific pattern of sounds at the end of lines, while free verse does not.' },
                { text: 'free verse has no rhythm at all', outcome: 'Not quite — Students often believe that if it doesn\'t rhyme, it isn\'t "really" a poem.', reveals: 'if-it-doesn-t-rhyme' },
                { text: 'really', outcome: 'Not quite — Students often believe that if it doesn\'t rhyme, it isn\'t "really" a poem.', reveals: 'if-it-doesn-t-rhyme' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u3_021', title: 'Use it in the wild',
          caseStudy: { intro: 'A student is writing her own \'crazy inventor\' story for the school magazine. She plans to save the invention\'s disastrous failure for the very last line, \'to surprise the reader.\'',
            decisions: [{ prompt: 'What does Anand\'s story suggest about where a comic disaster should go?', options: [
                { text: 'Early — the story soaks the father first, establishing a pattern: Anand\'s inventions always backfire, and each new scheme repeats the comedy. Showing the disaster early turns it into the story\'s engine — every later invention is funnier because readers already know how it will end. Saving one failure for the end would just be a surprise, not a pattern.', outcome: 'Comic sequence is the craft here — an early failure sets the rule of the world (inventions fail), and the reader\'s anticipation of the next flop is what drives the humour.' },
                { text: 'Her plan is right — a disaster works best as a final shock, so it should stay at the end.', outcome: 'A last-line failure is a twist, not a pattern — the story\'s comedy comes from watching failure repeat, which requires the first failure to happen early.', reveals: 'disaster-goes-last' },
                { text: 'She should cut the failure entirely — a perfect successful machine would make a stronger ending.', outcome: 'A perfect machine would break the story\'s whole comic purpose — the fun is that the inventions never work, and the pattern of flops is the plot.', reveals: 'success-is-funnier' }
            ] }] } },
        { type: 'case', nodeId: 'c6_english_u3_026', title: 'The bigger picture',
          caseStudy: { intro: 'A story is beads on a string, not beads in a bag. The order of events is what turns mishaps into comedy.',
            decisions: [{ prompt: 'What comes next? Dreams and Discoveries · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Dreams and Discoveries · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_english_u3_021', difficulty: 'standard',
          question: 'From \'English chapter c6_english_u3\': the skill or concept this node teaches.',
          hint: 'Review the concept of "Cause and Effect" before attempting to sequence a full plot.',
          misconception: 'Students often confuse "plot" (the full story) with "sequence" (the specific order of time).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'From \'English chapter c6_english_u3\': the skill or concept this node teaches, applied to',
                  options: ['From \'English chapter c6_english_u3\': the skill or concept this node teaches, applied to', 'The spirit of innovation is the drive to question, experiment, and persist despite failure', '"Paper Boats" is a poem that uses imagery—mental pictures created by words—to describe a', 'Poetic devices are tools used by poets to create deeper meaning and musical effects,'],
                  hint: 'Review the concept of "Cause and Effect" before attempting to sequence a full plot.',
                  misconception: 'Students often confuse "plot" (the full story) with "sequence" (the specific order of time).' }
          ],
            remediations: { 'students-often-confuse-plot-the': { steps: ['First, ask the student to draw a "story map" with three boxes: Start, Middle, and End.', 'Ask them to place one invention in each box.', 'If they struggle, ask: "What happened right after the water bag alarm?" guiding them to find the next chronological.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u3_022', difficulty: 'standard',
          question: 'From \'English chapter c6_english_u3\': the skill or concept this node teaches.',
          hint: 'Review the definitions of personality traits (e.g., curious, stubborn, confident).',
          misconception: 'Students often confuse "what a character does" with "who a character is." They might say "Anand is an inventor" instead.',
          parts: [
                { id: 'a', prompt: 'What is one trait that describes Anand’s attitude toward his inventions?', answer: 'Anand is curious or confident',
                  options: ['Anand is curious or confident', 'he is a professional engineer', 'what a character does', 'Anand is an inventor'],
                  hint: 'Review the definitions of personality traits (e.g., curious, stubborn, confident).',
                  misconception: 'Students often confuse "what a character does" with "who a character is." They might say "Anand is an inventor" instead of identifying the.' },
                { id: 'b', prompt: 'Why does the author describe Anand as "stubborn"?', answer: 'He is described as stubborn',
                  options: ['He is described as stubborn', 'because he listens to his sister', 'what a character does', 'Anand is an inventor'],
                  hint: 'Review the definitions of personality traits (e.g., curious, stubborn, confident).',
                  misconception: 'Students often confuse "what a character does" with "who a character is." They might say "Anand is an inventor" instead of identifying the.' }
          ],
            remediations: { 'students-often-confuse-what-a': { steps: ['Ask the student: "If an inventor stops after one try, are they still an inventor?" Guide them to describe the *feeling*.', 'Use the prompt: "What word describes a person who doesn\'t stop even when things are hard?" to lead them to "persistent".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u3_023', difficulty: 'standard',
          question: 'The spirit of innovation is the drive to question, experiment, and persist.',
          hint: 'Review the \'Let us think and reflect\' sections to practice asking questions about the.',
          misconception: 'Students often believe that "innovation" only refers to high-tech, expensive machines or gadgets.',
          parts: [
                { id: 'a', prompt: 'What is the primary role of curiosity in the process of innovation?', answer: 'Curiosity acts as the spark that encourages people to ask questions and seek new',
                  options: ['Curiosity acts as the spark that encourages people to ask questions and seek new', 'being nosy', 'innovation', '"innovation" only refers to high-tech, expensive machines or gadgets'],
                  hint: 'Review the \'Let us think and reflect\' sections to practice asking questions about the text.',
                  misconception: 'Students often believe that "innovation" only refers to high-tech, expensive machines or gadgets.' },
                { id: 'b', prompt: 'If an experiment fails to produce the desired result, why is it still considered a valuable part of the innovation process?', answer: 'A failed experiment provides evidence of what does not work',
                  options: ['A failed experiment provides evidence of what does not work', 'useless', 'innovation', '"innovation" only refers to high-tech, expensive machines or gadgets'],
                  hint: 'Review the \'Let us think and reflect\' sections to practice asking questions about the text.',
                  misconception: 'Students often believe that "innovation" only refers to high-tech, expensive machines or gadgets.' },
                { id: 'c', prompt: 'A student wants to fix a wobbly table. How can they apply the spirit of innovation to this task?', answer: 'Identify why it wobbles (the problem)',
                  options: ['Identify why it wobbles (the problem)', 'innovation', '"innovation" only refers to high-tech, expensive machines or gadgets'],
                  hint: 'Review the \'Let us think and reflect\' sections to practice asking questions about the text.',
                  misconception: 'Students often believe that "innovation" only refers to high-tech, expensive machines or gadgets.' }
          ],
            remediations: { 'innovation-only-refers-to-high': { steps: ['Ask the student to think of one thing they improved in their own life, like organizing their school bag or sharpening.', 'Point out that this small improvement is an "innovation." Explain that big inventions are just these small, repeated.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u3_024', difficulty: 'standard',
          question: '"Paper Boats" is a poem that uses imagery—mental pictures created by words—to.',
          hint: 'Review "Let us learn" sections regarding descriptive adjectives.',
          misconception: 'Students often think a poem is only about what is physically happening (literal level).',
          parts: [
                { id: 'a', prompt: 'What is an example of an image from the poem that describes what the child sees?', answer: 'The child sees white paper boats floating on the stream',
                  options: ['The child sees white paper boats floating on the stream', 'a tree', 'a poem is only about what is physically happening (literal level)'],
                  hint: 'Review "Let us learn" sections regarding descriptive adjectives.',
                  misconception: 'Students often think a poem is only about what is physically happening (literal level).' },
                { id: 'b', prompt: 'When the child loads the boats with flowers, why might they be doing this?', answer: 'The flowers represent gifts, hopes, or messages the child is sending away',
                  options: ['The flowers represent gifts, hopes, or messages the child is sending away', 'to clean the water', 'a poem is only about what is physically happening (literal level)'],
                  hint: 'Review "Let us learn" sections regarding descriptive adjectives.',
                  misconception: 'Students often think a poem is only about what is physically happening (literal level).' },
                { id: 'c', prompt: 'If you were writing a poem, what object would you use to represent a "dream" or "secret wish"?', answer: 'Identify a small, portable object (like a kite or a paper bird)',
                  options: ['Identify a small, portable object (like a kite or a paper bird)', 'a poem is only about what is physically happening (literal level)'],
                  hint: 'Review "Let us learn" sections regarding descriptive adjectives.',
                  misconception: 'Students often think a poem is only about what is physically happening (literal level).' },
                { id: 'd', prompt: 'How does the reflection of the clouds in the water change the "mood" of the poem?', answer: 'The reflection adds a sense of vastness and wonder, making the small stream feel',
                  options: ['The reflection adds a sense of vastness and wonder, making the small stream feel', 'imagery', 'a poem is only about what is physically happening (literal level)'],
                  hint: 'Review "Let us learn" sections regarding descriptive adjectives.',
                  misconception: 'Students often think a poem is only about what is physically happening (literal level).' }
          ],
            remediations: { 'a-poem-is-only-about': { steps: ['Ask the student to draw the boat as they imagine it.', 'Then, ask them to write one word on the boat that describes what they wish for.', 'This simple step helps them bridge the gap between a "toy" and a "symbolic messenger."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u3_024', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a poem is only about what is physically happening (literal level).',
          parts: [
                { id: 'a', prompt: 'Is the child\'s activity in the poem just a way to pass time, or is it something more meaningful?', answer: 'It is meaningful',
                  options: ['It is meaningful', 'a poem is only about what is physically happening (literal level)'],
                  hint: 'Review "Let us learn" sections regarding descriptive adjectives.',
                  misconception: 'Students often think a poem is only about what is physically happening (literal level).' }
          ],
            remediations: { 'a-poem-is-only-about': { steps: ['Ask the student to draw the boat as they imagine it.', 'Then, ask them to write one word on the boat that describes what they wish for.', 'This simple step helps them bridge the gap between a "toy" and a "symbolic messenger."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u3_025', difficulty: 'standard',
          question: 'Poetic devices are tools used by poets to create deeper meaning and musical.',
          hint: 'Review the difference between a literal statement ("The cat sat down") and a figurative.',
          misconception: 'Students often confuse "Personification" with "Simile" (a comparison using \'like\' or \'as\').',
          parts: [
                { id: 'a', prompt: 'What do we call it when a poet repeats the same starting sound in words placed close together?', answer: 'This is called alliteration',
                  options: ['This is called alliteration', 'Personification', 'Simile'],
                  hint: 'Review the difference between a literal statement ("The cat sat down") and a figurative one ("The.',
                  misconception: 'Students often confuse "Personification" with "Simile" (a comparison using \'like\' or \'as\').' },
                { id: 'b', prompt: 'In the sentence, "The angry wind howled at the window," why is this an example of personification?', answer: 'It is personification',
                  options: ['It is personification', 'howling', 'being angry', 'Personification'],
                  hint: 'Review the difference between a literal statement ("The cat sat down") and a figurative one ("The.',
                  misconception: 'Students often confuse "Personification" with "Simile" (a comparison using \'like\' or \'as\').' },
                { id: 'c', prompt: 'Read the phrase: "Seven silver stars shimmered." Analyze why this is alliteration and how it affects the reader.', answer: 'It is alliteration',
                  options: ['It is alliteration', 'Personification', 'Simile'],
                  hint: 'Review the difference between a literal statement ("The cat sat down") and a figurative one ("The.',
                  misconception: 'Students often confuse "Personification" with "Simile" (a comparison using \'like\' or \'as\').' }
          ],
            remediations: { 'students-often-confuse-personification-with': { steps: ['Ask the student to rewrite the sentence without using "like" or "as." If they wrote "The clouds are like fluffy sheep,".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_english_u3_026', difficulty: 'standard',
          question: 'Free verse is a style of poetry that does not use a set rhyme scheme or.',
          hint: 'Review the definitions of "lines" and "stanzas" in the previous chapter.',
          misconception: 'Students often believe that if it doesn\'t rhyme, it isn\'t "really" a poem.',
          parts: [
                { id: 'a', prompt: 'If a poem has no rhyme scheme, does that mean it is just a paragraph of writing broken into smaller chunks? Explain why or why not.', answer: 'No, it is not just broken prose',
                  options: ['No, it is not just broken prose', 'just cut-up prose', 'really', 'if it doesn\'t rhyme, it isn\'t "really" a poem'],
                  hint: 'Review the definitions of "lines" and "stanzas" in the previous chapter.',
                  misconception: 'Students often believe that if it doesn\'t rhyme, it isn\'t "really" a poem.' },
                { id: 'b', prompt: 'Analyze the following: A poem has lines of different lengths and no repeating end-sounds, but it clearly paints a picture of a bird flying. Is this free verse?', answer: 'Yes, it is free verse',
                  options: ['Yes, it is free verse', 'really', 'if it doesn\'t rhyme, it isn\'t "really" a poem'],
                  hint: 'Review the definitions of "lines" and "stanzas" in the previous chapter.',
                  misconception: 'Students often believe that if it doesn\'t rhyme, it isn\'t "really" a poem.' }
          ],
            remediations: { 'if-it-doesn-t-rhyme': { steps: ['If a student struggles, show them two texts: a nursery rhyme and a piece of high-quality free verse.', 'Ask them to read both aloud and note where they pause.', 'Explain that the "music" in the second one comes from the pauses and the ideas, not the sounds at the end, then have.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
